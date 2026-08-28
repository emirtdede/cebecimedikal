import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser, hasPermission } from "@/lib/auth";
import { z } from "zod";

const announcementSchema = z.object({
  title: z.string().nullable().optional(),
  message: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  videoUrl: z.string().nullable().optional(),
  linkUrl: z.string().nullable().optional(),
  linkText: z.string().nullable().optional(),
  contentType: z.enum(["TEXT", "IMAGE", "VIDEO", "IMAGE_TEXT", "VIDEO_TEXT"]).default("TEXT"),
  position: z.enum(["BOTTOM_LEFT", "BOTTOM_RIGHT", "TOP_BANNER", "MODAL_CENTER"]).default("BOTTOM_LEFT"),
  isActive: z.boolean().default(true),
  priority: z.number().int().default(0),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  dismissible: z.boolean().default(true),
  showOnce: z.boolean().default(false),
  delaySeconds: z.number().int().min(0).default(3),
});

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const announcements = await db.announcement.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ announcements });
  } catch (error) {
    console.error("Error in GET announcements:", error);
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
    const parsed = announcementSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Geçersiz form verisi", details: parsed.error.format() }, { status: 400 });
    }

    const data = parsed.data;
    const announcement = await db.announcement.create({
      data: {
        title: data.title || null,
        message: data.message || null,
        imageUrl: data.imageUrl || null,
        videoUrl: data.videoUrl || null,
        linkUrl: data.linkUrl || null,
        linkText: data.linkText || null,
        contentType: data.contentType,
        position: data.position,
        isActive: data.isActive,
        priority: data.priority,
        startDate: data.startDate ? new Date(data.startDate) : new Date(),
        endDate: data.endDate ? new Date(data.endDate) : null,
        dismissible: data.dismissible,
        showOnce: data.showOnce,
        delaySeconds: data.delaySeconds,
      },
    });

    return NextResponse.json({ announcement }, { status: 201 });
  } catch (error) {
    console.error("Error creating announcement:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();

    if (!body.id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const announcement = await db.announcement.update({
      where: { id: body.id },
      data: {
        ...(body.title !== undefined && { title: body.title }),
        ...(body.message !== undefined && { message: body.message }),
        ...(body.imageUrl !== undefined && { imageUrl: body.imageUrl }),
        ...(body.videoUrl !== undefined && { videoUrl: body.videoUrl }),
        ...(body.linkUrl !== undefined && { linkUrl: body.linkUrl }),
        ...(body.linkText !== undefined && { linkText: body.linkText }),
        ...(body.contentType !== undefined && { contentType: body.contentType }),
        ...(body.position !== undefined && { position: body.position }),
        ...(body.isActive !== undefined && { isActive: body.isActive }),
        ...(body.priority !== undefined && { priority: body.priority }),
        ...(body.startDate !== undefined && { startDate: new Date(body.startDate) }),
        ...(body.endDate !== undefined && { endDate: body.endDate ? new Date(body.endDate) : null }),
        ...(body.dismissible !== undefined && { dismissible: body.dismissible }),
        ...(body.showOnce !== undefined && { showOnce: body.showOnce }),
        ...(body.delaySeconds !== undefined && { delaySeconds: body.delaySeconds }),
      },
    });

    return NextResponse.json({ announcement });
  } catch (error) {
    console.error("Error updating announcement:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await db.announcement.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting announcement:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
