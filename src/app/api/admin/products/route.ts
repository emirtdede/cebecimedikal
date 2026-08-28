import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const products = await db.product.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        category: { include: { translations: true } },
        translations: true,
      },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error in GET products:", error);
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
      categoryId,
      brand = "Cebeci Medikal",
      model,
      sku,
      condition = "NEW",
      status = "PUBLISHED",
      featured = false,
      images = [],
      technicalSpecs = {},
      applications = [],
      translations = [], // Array of { locale, title, shortDescription, description }
    } = body;

    if (!slug || !categoryId || translations.length === 0) {
      return NextResponse.json({ error: "Eksik zorunlu alanlar" }, { status: 400 });
    }

    const product = await db.product.create({
      data: {
        slug,
        categoryId,
        brand,
        model,
        sku,
        condition,
        status,
        featured,
        images: JSON.stringify(images),
        technicalSpecs: JSON.stringify(technicalSpecs),
        applications: JSON.stringify(applications),
        translations: {
          create: translations.map((t: any) => ({
            locale: t.locale,
            title: t.title,
            shortDescription: t.shortDescription || "",
            description: t.description || "",
            seoTitle: t.seoTitle || undefined,
            seoDescription: t.seoDescription || undefined,
          })),
        },
      },
    });

    // Audit Log
    await db.auditLog.create({
      data: {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        action: "PRODUCT_CREATED",
        entityType: "Product",
        entityId: product.id,
        details: JSON.stringify({ slug: product.slug, title: translations[0]?.title }),
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    console.error("Error creating product:", error);
    if (error.code === "P2002") {
      return NextResponse.json({ error: "Bu slug (URL adresi) zaten kullanılıyor." }, { status: 400 });
    }
    return NextResponse.json({ error: "Ürün eklenirken bir hata oluştu" }, { status: 500 });
  }
}
