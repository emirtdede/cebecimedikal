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
    const category = await db.category.findUnique({
      where: { id },
      include: {
        translations: true,
        _count: { select: { products: true } },
      },
    });

    if (!category) return NextResponse.json({ error: "Kategori bulunamadı" }, { status: 404 });

    return NextResponse.json({ category });
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
    const { slug, icon, sortOrder, isActive, translations } = body;

    const existing = await db.category.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Kategori bulunamadı" }, { status: 404 });

    const cleanSlug = slug ? slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-") : existing.slug;

    await db.category.update({
      where: { id },
      data: {
        slug: cleanSlug,
        icon: icon !== undefined ? icon : existing.icon,
        sortOrder: sortOrder !== undefined ? Number(sortOrder) : existing.sortOrder,
        isActive: isActive !== undefined ? Boolean(isActive) : existing.isActive,
      },
    });

    // Update translations
    if (translations && Array.isArray(translations)) {
      for (const t of translations) {
        if (!t.locale) continue;
        await db.categoryTranslation.upsert({
          where: {
            categoryId_locale: {
              categoryId: id,
              locale: t.locale,
            },
          },
          update: {
            name: t.name,
            description: t.description || "",
            seoTitle: t.seoTitle || undefined,
            seoDescription: t.seoDescription || undefined,
          },
          create: {
            categoryId: id,
            locale: t.locale,
            name: t.name || cleanSlug,
            description: t.description || "",
            seoTitle: t.seoTitle || undefined,
            seoDescription: t.seoDescription || undefined,
          },
        });
      }
    }

    const updatedCategory = await db.category.findUnique({
      where: { id },
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
        action: "CATEGORY_UPDATED",
        entityType: "Category",
        entityId: id,
        details: JSON.stringify({ slug: cleanSlug }),
      },
    });

    return NextResponse.json({ success: true, category: updatedCategory });
  } catch (error: any) {
    console.error("Error updating category:", error);
    return NextResponse.json({ error: error.message || "Kategori güncellenemedi" }, { status: 500 });
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

    // Check if category has associated products
    const productCount = await db.product.count({ where: { categoryId: id } });
    if (productCount > 0) {
      return NextResponse.json({
        error: `Bu kategoriye bağlı ${productCount} adet ürün bulunmaktadır. Önce bu ürünlerin kategorisini değiştirin veya ürünleri silin.`,
      }, { status: 400 });
    }

    const category = await db.category.findUnique({ where: { id } });
    if (!category) return NextResponse.json({ error: "Kategori bulunamadı" }, { status: 404 });

    await db.category.delete({ where: { id } });

    // Audit Log
    await db.auditLog.create({
      data: {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        action: "CATEGORY_DELETED",
        entityType: "Category",
        entityId: id,
        details: JSON.stringify({ slug: category.slug }),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json({ error: "Kategori silinemedi" }, { status: 500 });
  }
}
