import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { trackEvent } from "@/lib/analytics";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { catalogId, visitorId, sessionId } = body;

    if (!catalogId) {
      return NextResponse.json({ error: "Missing catalogId" }, { status: 400 });
    }

    const catalog = await db.catalog.update({
      where: { id: catalogId },
      data: {
        downloadCount: { increment: 1 },
      },
    });

    if (visitorId) {
      await trackEvent({
        visitorId,
        sessionId,
        eventName: "catalog_download",
        eventCategory: "Engagement",
        eventLabel: catalog.title,
        path: "/kataloglar",
      });
    }

    return NextResponse.json({ success: true, downloadCount: catalog.downloadCount });
  } catch (error) {
    console.error("Error in catalog download tracker:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
