import { NextRequest, NextResponse } from "next/server";
import { trackPageView } from "@/lib/analytics";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { visitorId, sessionId, path, title, locale, referrer } = body;

    if (!visitorId || !sessionId || !path) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const ipAddress =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || undefined;

    const result = await trackPageView({
      visitorId,
      sessionId,
      path,
      title,
      locale,
      referrer,
      userAgent,
      ipAddress,
    });

    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error("API error in trackPageView:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
