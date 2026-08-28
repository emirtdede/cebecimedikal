import { db } from "./db";

export interface TrackPageViewParams {
  visitorId: string;
  sessionId: string;
  path: string;
  title?: string;
  locale?: string;
  referrer?: string;
  userAgent?: string;
  ipAddress?: string;
}

export interface TrackEventParams {
  visitorId: string;
  sessionId?: string;
  eventName: string;
  eventCategory?: string;
  eventLabel?: string;
  eventValue?: string;
  path: string;
  metadata?: Record<string, any>;
}

// Approximate city resolver from IP / headers
export function estimateLocation(ip?: string | null): { country: string; city: string } {
  if (!ip || ip === "127.0.0.1" || ip === "::1") {
    return { country: "TR", city: "Ankara" };
  }

  // Consistent hash for local simulation
  const hash = ip.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const cities = ["Ankara", "İstanbul", "İzmir", "Konya", "Bursa", "Antalya", "Adana", "Gaziantep", "Kayseri", "Samsun"];
  const city = cities[hash % cities.length];

  return { country: "TR", city };
}

export async function trackPageView(params: TrackPageViewParams): Promise<{ isNewVisitor: boolean; isNewSession: boolean }> {
  try {
    const { visitorId, sessionId, path, title, locale = "tr", referrer, userAgent, ipAddress } = params;

    // Check if visitor has consented or if analytics is enabled
    const consent = await db.cookieConsent.findUnique({
      where: { visitorId },
    });

    if (consent && consent.analytics === false) {
      return { isNewVisitor: false, isNewSession: false };
    }

    const { country, city } = estimateLocation(ipAddress);
    const now = new Date();

    // 1. Visitor check / upsert
    let isNewVisitor = false;
    const existingVisitor = await db.analyticsVisitor.findUnique({
      where: { visitorId },
    });

    if (!existingVisitor) {
      isNewVisitor = true;
      await db.analyticsVisitor.create({
        data: {
          visitorId,
          userAgent: userAgent ? userAgent.substring(0, 255) : undefined,
          country,
          city,
          language: locale,
          firstSeenAt: now,
          lastSeenAt: now,
        },
      });
    } else {
      await db.analyticsVisitor.update({
        where: { visitorId },
        data: { lastSeenAt: now },
      });
    }

    // 2. Session check / upsert
    let isNewSession = false;
    const existingSession = await db.analyticsSession.findUnique({
      where: { sessionId },
    });

    if (!existingSession) {
      isNewSession = true;
      await db.analyticsSession.create({
        data: {
          sessionId,
          visitorId,
          entryPage: path,
          referrer: referrer ? referrer.substring(0, 255) : undefined,
          startedAt: now,
          lastActivityAt: now,
          pageViewsCount: 1,
        },
      });
    } else {
      // Check session expiry (30 mins inactivity)
      const diffMs = now.getTime() - new Date(existingSession.lastActivityAt).getTime();
      const diffMins = diffMs / (1000 * 60);

      if (diffMins > 30) {
        isNewSession = true; // New logical session
      }

      await db.analyticsSession.update({
        where: { sessionId },
        data: {
          lastActivityAt: now,
          exitPage: path,
          pageViewsCount: { increment: 1 },
          durationSeconds: Math.floor((now.getTime() - new Date(existingSession.startedAt).getTime()) / 1000),
        },
      });
    }

    // 3. Page View record
    await db.analyticsPageView.create({
      data: {
        visitorId,
        sessionId,
        path,
        title: title ? title.substring(0, 255) : undefined,
        locale,
        referrer: referrer ? referrer.substring(0, 255) : undefined,
      },
    });

    return { isNewVisitor, isNewSession };
  } catch (error) {
    console.error("Error tracking page view:", error);
    return { isNewVisitor: false, isNewSession: false };
  }
}

export async function trackEvent(params: TrackEventParams): Promise<void> {
  try {
    const { visitorId, sessionId, eventName, eventCategory, eventLabel, eventValue, path, metadata } = params;

    const consent = await db.cookieConsent.findUnique({
      where: { visitorId },
    });

    if (consent && consent.analytics === false) {
      return;
    }

    await db.analyticsEvent.create({
      data: {
        visitorId,
        sessionId,
        eventName,
        eventCategory,
        eventLabel,
        eventValue,
        path,
        metadata: metadata ? JSON.stringify(metadata) : undefined,
      },
    });
  } catch (error) {
    console.error("Error tracking event:", error);
  }
}
