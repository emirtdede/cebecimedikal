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
    const service = await db.service.findUnique({
      where: { id },
      include: { translations: true },
    });

    if (!service) return NextResponse.json({ error: "Hizmet bulunamadı" }, { status: 404 });

    return NextResponse.json({ service });
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

    const existing = await db.service.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Hizmet bulunamadı" }, { status: 404 });

    const cleanSlug = slug ? slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-") : existing.slug;

    await db.service.update({
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
        await db.serviceTranslation.upsert({
          where: {
            serviceId_locale: {
              serviceId: id,
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
            serviceId: id,
            locale: t.locale,
            title: t.title || cleanSlug,
            shortDescription: t.shortDescription || "",
            description: t.description || "",
            seoTitle: t.seoTitle || undefined,
            seoDescription: t.seoDescription || undefined,
          },
        });
      }
    }

    const updated = await db.service.findUnique({
      where: { id },
      include: { translations: true },
    });

    // Audit Log
    await db.auditLog.create({
      data: {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        action: "SERVICE_UPDATED",
        entityType: "Service",
        entityId: id,
        details: JSON.stringify({ slug: cleanSlug }),
      },
    });

    return NextResponse.json({ success: true, service: updated });
  } catch (error: any) {
    console.error("Error updating service:", error);
    return NextResponse.json({ error: error.message || "Hizmet güncellenemedi" }, { status: 500 });
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
    const service = await db.service.findUnique({ where: { id } });

    if (!service) return NextResponse.json({ error: "Hizmet bulunamadı" }, { status: 404 });

    await db.service.delete({ where: { id } });

    // Audit Log
    await db.auditLog.create({
      data: {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        action: "SERVICE_DELETED",
        entityType: "Service",
        entityId: id,
        details: JSON.stringify({ slug: service.slug }),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json({ error: "Hizmet silinemedi" }, { status: 500 });
  }
}
