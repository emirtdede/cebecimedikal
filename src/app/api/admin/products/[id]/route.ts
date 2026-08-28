import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const product = await db.product.findUnique({
      where: { id },
      include: {
        category: true,
        translations: true,
      },
    });

    if (!product) return NextResponse.json({ error: "Ürün bulunamadı" }, { status: 404 });

    return NextResponse.json({ product });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await req.json();
    const {
      slug,
      categoryId,
      brand,
      model,
      sku,
      condition,
      status,
      featured,
      images,
      technicalSpecs,
      applications,
      translations,
    } = body;

    const existing = await db.product.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Ürün bulunamadı" }, { status: 404 });

    await db.product.update({
      where: { id },
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
      },
    });

    // Update translations
    if (translations && Array.isArray(translations)) {
      for (const t of translations) {
        await db.productTranslation.upsert({
          where: {
            productId_locale: {
              productId: id,
              locale: t.locale,
            },
          },
          update: {
            title: t.title,
            shortDescription: t.shortDescription || "",
            description: t.description || "",
            seoTitle: t.seoTitle || undefined,
            seoDescription: t.seoDescription || undefined,
          },
          create: {
            productId: id,
            locale: t.locale,
            title: t.title,
            shortDescription: t.shortDescription || "",
            description: t.description || "",
            seoTitle: t.seoTitle || undefined,
            seoDescription: t.seoDescription || undefined,
          },
        });
      }
    }

    await db.auditLog.create({
      data: {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        action: "PRODUCT_UPDATED",
        entityType: "Product",
        entityId: id,
        details: JSON.stringify({ slug }),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Ürün güncellenirken hata oluştu" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const existing = await db.product.findUnique({ where: { id } });

    if (!existing) return NextResponse.json({ error: "Ürün bulunamadı" }, { status: 404 });

    await db.product.delete({ where: { id } });

    await db.auditLog.create({
      data: {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        action: "PRODUCT_DELETED",
        entityType: "Product",
        entityId: id,
        details: JSON.stringify({ slug: existing.slug }),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Ürün silinirken hata oluştu" }, { status: 500 });
  }
}
