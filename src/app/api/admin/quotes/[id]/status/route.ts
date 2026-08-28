import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const { status, notes } = await req.json();

    const quote = await db.quoteRequest.update({
      where: { id },
      data: {
        status,
        notes: notes !== undefined ? notes : undefined,
      },
    });

    await db.auditLog.create({
      data: {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        action: "QUOTE_STATUS_CHANGED",
        entityType: "QuoteRequest",
        entityId: id,
        details: JSON.stringify({ quoteNumber: quote.quoteNumber, newStatus: status }),
      },
    });

    return NextResponse.json({ success: true, quote });
  } catch (error) {
    console.error("Error updating quote status:", error);
    return NextResponse.json({ error: "Durum güncellenirken hata oluştu" }, { status: 500 });
  }
}
