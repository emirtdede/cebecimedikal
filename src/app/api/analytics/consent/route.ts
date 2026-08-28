import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { visitorId, necessary = true, preferences = false, analytics = false, marketing = false } = body;

    if (!visitorId) {
      return NextResponse.json({ error: "Missing visitorId" }, { status: 400 });
    }

    const ipAddress =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const consent = await db.cookieConsent.upsert({
      where: { visitorId },
      update: {
        necessary,
        preferences,
        analytics,
        marketing,
        ipAddress,
      },
      create: {
        visitorId,
        necessary,
        preferences,
        analytics,
        marketing,
        ipAddress,
      },
    });

    return NextResponse.json({ success: true, consent });
  } catch (error) {
    console.error("API error in cookie consent:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
