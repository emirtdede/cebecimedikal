import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { LOCALES } from "@/lib/i18n";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const references = await db.reference.findMany({
      orderBy: { sortOrder: "asc" },
      include: { translations: true },
    });

    return NextResponse.json({ references });
  } catch (error) {
    console.error("Error in GET references:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const {
      companyName,
      clientName = "",
      position = "",
      rating = 5,
      serviceScope = "Biyomedikal Bakım & Servis",
      sector = "Özel Hastane",
      city = "Ankara",
      logoUrl = "",
      sortOrder = 0,
      isActive = true,
      translations = [],
    } = body;

    if (!companyName) {
      return NextResponse.json({ error: "Kurum adı zorunludur" }, { status: 400 });
    }

    const effectiveTranslations = translations.length > 0 ? translations : [
      { locale: "tr", quote: "Cebeci Medikal ile çalışmaktan son derece memnunuz.", projectDescription: "" }
    ];

    const reference = await db.reference.create({
      data: {
        companyName,
        clientName,
        position,
        rating: Number(rating) || 5,
        serviceScope,
        sector,
        city,
        logoUrl: logoUrl || null,
        sortOrder: Number(sortOrder) || 0,
        isActive: Boolean(isActive),
        translations: {
          create: effectiveTranslations.map((t: any) => ({
            locale: t.locale,
            quote: t.quote || "Cebeci Medikal hizmet kalitesinden memnunuz.",
            projectDescription: t.projectDescription || t.projectDesc || "",
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
        action: "REFERENCE_CREATED",
        entityType: "Reference",
        entityId: reference.id,
        details: JSON.stringify({ companyName: reference.companyName }),
      },
    });

    return NextResponse.json({ success: true, reference });
  } catch (error: any) {
    console.error("Error creating reference:", error);
    return NextResponse.json({ error: error.message || "Referans oluşturulamadı" }, { status: 500 });
  }
}
