import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const catalogs = await db.catalog.findMany({
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json({ catalogs });
  } catch (error) {
    console.error("Error in GET catalogs:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const {
      title,
      category = "Genel",
      description = "",
      fileUrl,
      thumbnailUrl = "",
      fileSize = "2.4 MB",
      version = "1.0",
      sortOrder = 0,
      isActive = true,
    } = body;

    if (!title || !fileUrl) {
      return NextResponse.json({ error: "Katalog başlığı ve dosya URL'si zorunludur" }, { status: 400 });
    }

    const catalog = await db.catalog.create({
      data: {
        title,
        category,
        description,
        fileUrl,
        thumbnailUrl: thumbnailUrl || null,
        fileSize,
        version,
        sortOrder: Number(sortOrder) || 0,
        isActive: Boolean(isActive),
      },
    });

    // Audit Log
    await db.auditLog.create({
      data: {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        action: "CATALOG_CREATED",
        entityType: "Catalog",
        entityId: catalog.id,
        details: JSON.stringify({ title: catalog.title, fileUrl: catalog.fileUrl }),
      },
    });

    return NextResponse.json({ success: true, catalog });
  } catch (error: any) {
    console.error("Error creating catalog:", error);
    return NextResponse.json({ error: error.message || "Katalog oluşturulamadı" }, { status: 500 });
  }
}
