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
    const quote = await db.quoteRequest.findUnique({ where: { id } });

    if (!quote) return NextResponse.json({ error: "Teklif talebi bulunamadı" }, { status: 404 });

    return NextResponse.json({ quote });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
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
    const quote = await db.quoteRequest.findUnique({ where: { id } });

    if (!quote) return NextResponse.json({ error: "Teklif talebi bulunamadı" }, { status: 404 });

    await db.quoteRequest.delete({ where: { id } });

    // Audit Log
    await db.auditLog.create({
      data: {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        action: "QUOTE_DELETED",
        entityType: "QuoteRequest",
        entityId: id,
        details: JSON.stringify({ quoteNumber: quote.quoteNumber }),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting quote:", error);
    return NextResponse.json({ error: "Teklif talebi silinemedi" }, { status: 500 });
  }
}
