import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { LOCALES } from "@/lib/i18n";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const faqs = await db.faq.findMany({
      orderBy: { sortOrder: "asc" },
      include: { translations: true },
    });

    return NextResponse.json({ faqs });
  } catch (error) {
    console.error("Error in GET faqs:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const {
      category = "Genel",
      sortOrder = 0,
      isActive = true,
      translations = [],
    } = body;

    const effectiveTranslations = translations.length > 0 ? translations : [
      { locale: "tr", question: "Örnek Soru", answer: "Örnek Cevap" }
    ];

    const faq = await db.faq.create({
      data: {
        category,
        sortOrder: Number(sortOrder) || 0,
        isActive: Boolean(isActive),
        translations: {
          create: effectiveTranslations.map((t: any) => ({
            locale: t.locale,
            question: t.question || "Soru",
            answer: t.answer || "Cevap",
          })),
        },
      },
      include: { translations: true },
    });

    // Audit Log
    await db.auditLog.create({
      data: {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        action: "FAQ_CREATED",
        entityType: "Faq",
        entityId: faq.id,
        details: JSON.stringify({ question: faq.translations[0]?.question }),
      },
    });

    return NextResponse.json({ success: true, faq });
  } catch (error: any) {
    console.error("Error creating faq:", error);
    return NextResponse.json({ error: error.message || "SSS oluşturulamadı" }, { status: 500 });
  }
}
