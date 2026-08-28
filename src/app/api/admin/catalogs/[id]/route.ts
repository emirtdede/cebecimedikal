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
    const catalog = await db.catalog.findUnique({ where: { id } });

    if (!catalog) return NextResponse.json({ error: "Katalog bulunamadı" }, { status: 404 });

    return NextResponse.json({ catalog });
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
      title,
      category,
      description,
      fileUrl,
      thumbnailUrl,
      fileSize,
      version,
      sortOrder,
      isActive,
    } = body;

    const existing = await db.catalog.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Katalog bulunamadı" }, { status: 404 });

    const updated = await db.catalog.update({
      where: { id },
      data: {
        title: title !== undefined ? title : existing.title,
        category: category !== undefined ? category : existing.category,
        description: description !== undefined ? description : existing.description,
        fileUrl: fileUrl !== undefined ? fileUrl : existing.fileUrl,
        thumbnailUrl: thumbnailUrl !== undefined ? thumbnailUrl : existing.thumbnailUrl,
        fileSize: fileSize !== undefined ? fileSize : existing.fileSize,
        version: version !== undefined ? version : existing.version,
        sortOrder: sortOrder !== undefined ? Number(sortOrder) : existing.sortOrder,
        isActive: isActive !== undefined ? Boolean(isActive) : existing.isActive,
      },
    });

    // Audit Log
    await db.auditLog.create({
      data: {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        action: "CATALOG_UPDATED",
        entityType: "Catalog",
        entityId: id,
        details: JSON.stringify({ title: updated.title }),
      },
    });

    return NextResponse.json({ success: true, catalog: updated });
  } catch (error: any) {
    console.error("Error updating catalog:", error);
    return NextResponse.json({ error: error.message || "Katalog güncellenemedi" }, { status: 500 });
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
    const catalog = await db.catalog.findUnique({ where: { id } });

    if (!catalog) return NextResponse.json({ error: "Katalog bulunamadı" }, { status: 404 });

    await db.catalog.delete({ where: { id } });

    // Audit Log
    await db.auditLog.create({
      data: {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        action: "CATALOG_DELETED",
        entityType: "Catalog",
        entityId: id,
        details: JSON.stringify({ title: catalog.title }),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting catalog:", error);
    return NextResponse.json({ error: "Katalog silinemedi" }, { status: 500 });
  }
}
