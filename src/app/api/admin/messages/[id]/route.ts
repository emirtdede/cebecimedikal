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
    const message = await db.contactMessage.findUnique({ where: { id } });

    if (!message) return NextResponse.json({ error: "Mesaj bulunamadı" }, { status: 404 });

    return NextResponse.json({ message });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await req.json();
    const { isRead, status } = body;

    const data: any = {};
    if (isRead !== undefined) data.isRead = Boolean(isRead);
    if (status !== undefined) data.status = status;

    const updated = await db.contactMessage.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, message: updated });
  } catch (error: any) {
    console.error("Error updating message:", error);
    return NextResponse.json({ error: "Mesaj güncellenemedi" }, { status: 500 });
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

    await db.contactMessage.delete({ where: { id } });

    // Audit Log
    await db.auditLog.create({
      data: {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        action: "CONTACT_MESSAGE_DELETED",
        entityType: "ContactMessage",
        entityId: id,
        details: JSON.stringify({ messageId: id }),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json({ error: "Mesaj silinemedi" }, { status: 500 });
  }
}
