import { NextRequest, NextResponse } from "next/server";
import { trackEvent } from "@/lib/analytics";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { visitorId, sessionId, eventName, eventCategory, eventLabel, eventValue, path, metadata } = body;

    if (!visitorId || !eventName || !path) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await trackEvent({
      visitorId,
      sessionId,
      eventName,
      eventCategory,
      eventLabel,
      eventValue,
      path,
      metadata,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error in trackEvent:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
