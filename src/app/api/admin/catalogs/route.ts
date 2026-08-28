import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser, hasPermission } from "@/lib/auth";
import { z } from "zod";

const catalogSchema = z.object({
  title: z.string().min(2, "Katalog başlığı zorunludur"),
  category: z.string().default("Genel"),
  description: z.string().optional().nullable(),
  fileUrl: z.string().min(1, "Dosya URL'si zorunludur"),
  thumbnailUrl: z.string().optional().nullable(),
  fileSize: z.string().default("2.4 MB"),
  version: z.string().default("1.0"),
  sortOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

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
    if (!hasPermission(user.role, "CONTENT_MANAGER")) {
      return NextResponse.json({ error: "Bu işlem için yetkiniz bulunmamaktadır." }, { status: 403 });
    }

    const body = await req.json();
    const parsed = catalogSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Geçersiz katalog verisi", details: parsed.error.format() }, { status: 400 });
    }

    const data = parsed.data;

    const catalog = await db.catalog.create({
      data: {
        title: data.title,
        category: data.category,
        description: data.description || null,
        fileUrl: data.fileUrl,
        thumbnailUrl: data.thumbnailUrl || null,
        fileSize: data.fileSize,
        version: data.version,
        sortOrder: data.sortOrder,
        isActive: data.isActive,
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
