"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function getOrCreateVisitorId(): string {
  if (typeof window === "undefined") return "";
  let vid = localStorage.getItem("cebeci_vid");
  if (!vid) {
    vid = "v_" + Math.random().toString(36).substring(2, 15) + "_" + Date.now().toString(36);
    localStorage.setItem("cebeci_vid", vid);
  }
  return vid;
}

export function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  const now = Date.now();
  let sid = sessionStorage.getItem("cebeci_sid");
  const lastActiveStr = sessionStorage.getItem("cebeci_last_active");

  if (!sid || !lastActiveStr || now - parseInt(lastActiveStr, 10) > 30 * 60 * 1000) {
    sid = "s_" + Math.random().toString(36).substring(2, 15) + "_" + now.toString(36);
    sessionStorage.setItem("cebeci_sid", sid);
  }

  sessionStorage.setItem("cebeci_last_active", now.toString());
  return sid;
}

export async function trackClientEvent(
  eventName: string,
  params?: {
    category?: string;
    label?: string;
    value?: string;
    metadata?: Record<string, any>;
  }
) {
  if (typeof window === "undefined") return;
  const visitorId = getOrCreateVisitorId();
  const sessionId = getOrCreateSessionId();

  try {
    await fetch("/api/analytics/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visitorId,
        sessionId,
        eventName,
        eventCategory: params?.category,
        eventLabel: params?.label,
        eventValue: params?.value,
        path: window.location.pathname,
        metadata: params?.metadata,
      }),
    });
  } catch (err) {
    // Ignore client analytics errors silently
  }
}

import { Suspense } from "react";

function AnalyticsTrackerInner({ locale }: { locale: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const visitorId = getOrCreateVisitorId();
    const sessionId = getOrCreateSessionId();

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    fetch("/api/analytics/pageview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visitorId,
        sessionId,
        path: url,
        title: typeof document !== "undefined" ? document.title : "",
        locale,
        referrer: typeof document !== "undefined" ? document.referrer : "",
      }),
    }).catch(() => {});
  }, [pathname, searchParams, locale]);

  return null;
}

export function AnalyticsTracker({ locale }: { locale: string }) {
  return (
    <Suspense fallback={null}>
      <AnalyticsTrackerInner locale={locale} />
    </Suspense>
  );
}
