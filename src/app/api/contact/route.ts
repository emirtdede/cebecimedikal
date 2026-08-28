import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { trackEvent } from "@/lib/analytics";

const contactSchema = z.object({
  fullName: z.string().min(2, "İsim en az 2 karakter olmalıdır"),
  company: z.string().optional(),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  phone: z.string().min(8, "Geçerli bir telefon numarası giriniz"),
  subject: z.string().min(2, "Lütfen bir konu belirtiniz"),
  message: z.string().min(5, "Lütfen mesajınızı yazınız"),
  honeypot: z.string().optional(),
  visitorId: z.string().optional(),
  sessionId: z.string().optional(),
});

// Simple in-memory rate limiter per IP (5 submissions per 10 min)
const ipRateMap = new Map<string, { count: number; firstAttempt: number }>();

export async function POST(req: NextRequest) {
  try {
    const ipAddress =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const now = Date.now();
    const windowMs = 10 * 60 * 1000;
    const clientHistory = ipRateMap.get(ipAddress) || { count: 0, firstAttempt: now };

    if (now - clientHistory.firstAttempt > windowMs) {
      clientHistory.count = 1;
      clientHistory.firstAttempt = now;
    } else {
      clientHistory.count += 1;
    }
    ipRateMap.set(ipAddress, clientHistory);

    if (clientHistory.count > 5) {
      return NextResponse.json(
        { error: "Çok fazla mesaj gönderildi. Lütfen birkaç dakika sonra tekrar deneyiniz." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Form alanlarında geçersiz veri", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Check honeypot
    if (data.honeypot && data.honeypot.trim().length > 0) {
      console.warn("Spam detected via honeypot in contact form from IP:", ipAddress);
      return NextResponse.json({ success: true });
    }

    await db.contactMessage.create({
      data: {
        fullName: data.fullName,
        company: data.company || undefined,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        status: "NEW",
        ipAddress,
      },
    });

    if (data.visitorId) {
      await trackEvent({
        visitorId: data.visitorId,
        sessionId: data.sessionId,
        eventName: "contact_submit",
        eventCategory: "Conversion",
        eventLabel: data.subject,
        path: "/iletisim",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Mesajınız başarıyla iletildi.",
    });
  } catch (error) {
    console.error("Error creating contact message:", error);
    return NextResponse.json({ error: "Sunucu hatası oluştu. Lütfen tekrar deneyiniz." }, { status: 500 });
  }
}
