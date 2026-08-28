import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { LOCALES } from "@/lib/i18n";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const categories = await db.category.findMany({
      orderBy: { sortOrder: "asc" },
      include: {
        translations: true,
        _count: { select: { products: true } },
      },
    });

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Error in GET categories:", error);
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
      icon = "Activity",
      sortOrder = 0,
      isActive = true,
      translations = [], // [{ locale, name, description }]
    } = body;

    if (!slug) {
      return NextResponse.json({ error: "Slug alanı zorunludur" }, { status: 400 });
    }

    const cleanSlug = slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-");

    const existing = await db.category.findUnique({ where: { slug: cleanSlug } });
    if (existing) {
      return NextResponse.json({ error: "Bu slug ile başka bir kategori zaten mevcut" }, { status: 400 });
    }

    // Default translations if missing
    const effectiveTranslations = translations.length > 0 ? translations : [
      { locale: "tr", name: cleanSlug, description: "" }
    ];

    const category = await db.category.create({
      data: {
        slug: cleanSlug,
        icon,
        sortOrder: Number(sortOrder) || 0,
        isActive: Boolean(isActive),
        translations: {
          create: effectiveTranslations.map((t: any) => ({
            locale: t.locale,
            name: t.name || cleanSlug,
            description: t.description || "",
          })),
        },
      },
      include: {
        translations: true,
        _count: { select: { products: true } },
      },
    });

    // Audit Log
    await db.auditLog.create({
      data: {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        action: "CATEGORY_CREATED",
        entityType: "Category",
        entityId: category.id,
        details: JSON.stringify({ slug: category.slug, name: category.translations[0]?.name }),
      },
    });

    return NextResponse.json({ success: true, category });
  } catch (error: any) {
    console.error("Error creating category:", error);
    return NextResponse.json({ error: error.message || "Kategori oluşturulamadı" }, { status: 500 });
  }
}
