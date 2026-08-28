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
    const reference = await db.reference.findUnique({
      where: { id },
      include: { translations: true },
    });

    if (!reference) return NextResponse.json({ error: "Referans bulunamadı" }, { status: 404 });

    return NextResponse.json({ reference });
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
      companyName,
      clientName,
      position,
      rating,
      serviceScope,
      sector,
      city,
      logoUrl,
      sortOrder,
      isActive,
      translations,
    } = body;

    const existing = await db.reference.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Referans bulunamadı" }, { status: 404 });

    await db.reference.update({
      where: { id },
      data: {
        companyName: companyName !== undefined ? companyName : existing.companyName,
        clientName: clientName !== undefined ? clientName : existing.clientName,
        position: position !== undefined ? position : existing.position,
        rating: rating !== undefined ? Number(rating) : existing.rating,
        serviceScope: serviceScope !== undefined ? serviceScope : existing.serviceScope,
        sector: sector !== undefined ? sector : existing.sector,
        city: city !== undefined ? city : existing.city,
        logoUrl: logoUrl !== undefined ? logoUrl : existing.logoUrl,
        sortOrder: sortOrder !== undefined ? Number(sortOrder) : existing.sortOrder,
        isActive: isActive !== undefined ? Boolean(isActive) : existing.isActive,
      },
    });

    // Update translations
    if (translations && Array.isArray(translations)) {
      for (const t of translations) {
        if (!t.locale) continue;
        await db.referenceTranslation.upsert({
          where: {
            referenceId_locale: {
              referenceId: id,
              locale: t.locale,
            },
          },
          update: {
            quote: t.quote || "",
            projectDescription: t.projectDescription || t.projectDesc || "",
          },
          create: {
            referenceId: id,
            locale: t.locale,
            quote: t.quote || "",
            projectDescription: t.projectDescription || t.projectDesc || "",
          },
        });
      }
    }

    const updated = await db.reference.findUnique({
      where: { id },
      include: { translations: true },
    });

    // Audit Log
    await db.auditLog.create({
      data: {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        action: "REFERENCE_UPDATED",
        entityType: "Reference",
        entityId: id,
        details: JSON.stringify({ companyName: updated?.companyName }),
      },
    });

    return NextResponse.json({ success: true, reference: updated });
  } catch (error: any) {
    console.error("Error updating reference:", error);
    return NextResponse.json({ error: error.message || "Referans güncellenemedi" }, { status: 500 });
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
    const reference = await db.reference.findUnique({ where: { id } });

    if (!reference) return NextResponse.json({ error: "Referans bulunamadı" }, { status: 404 });

    await db.reference.delete({ where: { id } });

    // Audit Log
    await db.auditLog.create({
      data: {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        action: "REFERENCE_DELETED",
        entityType: "Reference",
        entityId: id,
        details: JSON.stringify({ companyName: reference.companyName }),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting reference:", error);
    return NextResponse.json({ error: "Referans silinemedi" }, { status: 500 });
  }
}
