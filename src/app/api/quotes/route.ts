import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { trackEvent } from "@/lib/analytics";

const quoteSchema = z.object({
  fullName: z.string().min(2, "İsim en az 2 karakter olmalıdır"),
  company: z.string().min(2, "Kurum adı gereklidir"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  phone: z.string().min(8, "Geçerli bir telefon numarası giriniz"),
  city: z.string().min(2, "Şehir bilgisi gereklidir"),
  topic: z.string().min(2, "Talep konusu seçiniz"),
  productName: z.string().optional().nullable(),
  quantity: z.number().int().min(1).default(1),
  message: z.string().min(5, "Lütfen talebinizle ilgili kısa bir açıklama yazınız"),
  preferredChannel: z.enum(["phone", "email", "whatsapp"]).default("phone"),
  kvkkConsent: z.boolean().refine((val) => val === true, "KVKK onayı zorunludur"),
  // Honeypot field for spam prevention
  honeypot: z.string().optional(),
  visitorId: z.string().optional(),
  sessionId: z.string().optional(),
});

// In-memory rate limiter per IP with automatic TTL cleanup (prevents memory leak)
const ipRateMap = new Map<string, { count: number; firstAttempt: number }>();
const MAX_RATE_LIMIT_ENTRIES = 2000;

function cleanupExpiredIpRecords(windowMs: number) {
  const now = Date.now();
  for (const [ip, record] of ipRateMap.entries()) {
    if (now - record.firstAttempt > windowMs) {
      ipRateMap.delete(ip);
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const ipAddress =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || undefined;

    // Rate limit check
    const now = Date.now();
    const windowMs = 10 * 60 * 1000;

    if (ipRateMap.size > MAX_RATE_LIMIT_ENTRIES) {
      cleanupExpiredIpRecords(windowMs);
    }

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
        { error: "Çok fazla istek gönderildi. Lütfen birkaç dakika sonra tekrar deneyiniz." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = quoteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Form alanlarında geçersiz veri", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Check honeypot
    if (data.honeypot && data.honeypot.trim().length > 0) {
      console.warn("Spam detected via honeypot from IP:", ipAddress);
      return NextResponse.json({ success: true, quoteNumber: "CBC-SPAM-BLOCKED" });
    }

    // Generate unique quote number: CBC-YYYY-RANDOM
    const quoteNumber = `CBC-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    const quoteRecord = await db.quoteRequest.create({
      data: {
        quoteNumber,
        fullName: data.fullName,
        company: data.company,
        email: data.email,
        phone: data.phone,
        city: data.city,
        topic: data.topic,
        productName: data.productName || undefined,
        quantity: data.quantity,
        message: data.message,
        preferredChannel: data.preferredChannel,
        status: "NEW",
        ipAddress,
        userAgent,
      },
    });

    if (data.visitorId) {
      await trackEvent({
        visitorId: data.visitorId,
        sessionId: data.sessionId,
        eventName: "quote_submit",
        eventCategory: "Conversion",
        eventLabel: quoteNumber,
        path: "/teklif",
      });
    }

    return NextResponse.json({
      success: true,
      quoteNumber: quoteRecord.quoteNumber,
      message: "Teklif talebiniz başarıyla alındı.",
    });
  } catch (error) {
    console.error("Error creating quote request:", error);
    return NextResponse.json({ error: "Sunucu hatası oluştu. Lütfen tekrar deneyiniz." }, { status: 500 });
  }
}
