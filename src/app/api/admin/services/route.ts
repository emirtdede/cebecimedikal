import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { LOCALES } from "@/lib/i18n";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const services = await db.service.findMany({
      orderBy: { sortOrder: "asc" },
      include: { translations: true },
    });

    return NextResponse.json({ services });
  } catch (error) {
    console.error("Error in GET services:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const {
      slug,
      icon = "Wrench",
      sortOrder = 0,
      isActive = true,
      translations = [],
    } = body;

    if (!slug) {
      return NextResponse.json({ error: "Slug alanı zorunludur" }, { status: 400 });
    }

    const cleanSlug = slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-");

    const existing = await db.service.findUnique({ where: { slug: cleanSlug } });
    if (existing) {
      return NextResponse.json({ error: "Bu slug ile başka bir hizmet zaten mevcut" }, { status: 400 });
    }

    const effectiveTranslations = translations.length > 0 ? translations : [
      { locale: "tr", title: cleanSlug, shortDescription: "", description: "" }
    ];

    const service = await db.service.create({
      data: {
        slug: cleanSlug,
        icon,
        sortOrder: Number(sortOrder) || 0,
        isActive: Boolean(isActive),
        translations: {
          create: effectiveTranslations.map((t: any) => ({
            locale: t.locale,
            title: t.title || cleanSlug,
            shortDescription: t.shortDescription || "",
            description: t.description || "",
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
        action: "SERVICE_CREATED",
        entityType: "Service",
        entityId: service.id,
        details: JSON.stringify({ slug: service.slug, title: service.translations[0]?.title }),
      },
    });

    return NextResponse.json({ success: true, service });
  } catch (error: any) {
    console.error("Error creating service:", error);
    return NextResponse.json({ error: error.message || "Hizmet oluşturulamadı" }, { status: 500 });
  }
}
