import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.toLowerCase().trim();
    const status = searchParams.get("status");
    const isRead = searchParams.get("isRead");

    const where: any = {};

    if (status && status !== "ALL") {
      where.status = status;
    }

    if (isRead !== null && isRead !== undefined && isRead !== "ALL") {
      where.isRead = isRead === "true";
    }

    if (q) {
      where.OR = [
        { fullName: { contains: q } },
        { company: { contains: q } },
        { email: { contains: q } },
        { phone: { contains: q } },
        { subject: { contains: q } },
        { message: { contains: q } },
      ];
    }

    const messages = await db.contactMessage.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Error in GET messages:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
