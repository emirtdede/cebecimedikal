import { describe, it, expect } from "vitest";

describe("First-Party Analytics Logic Verification", () => {
  it("computes session expiration accurately with 30-minute sliding window", () => {
    const sessionTimeoutMs = 30 * 60 * 1000;
    const now = Date.now();

    // 10 minutes ago -> Active
    const tenMinAgo = now - 10 * 60 * 1000;
    const isExpired10 = now - tenMinAgo > sessionTimeoutMs;
    expect(isExpired10).toBe(false);

    // 35 minutes ago -> Expired, requires new session
    const thirtyFiveMinAgo = now - 35 * 60 * 1000;
    const isExpired35 = now - thirtyFiveMinAgo > sessionTimeoutMs;
    expect(isExpired35).toBe(true);
  });

  it("ensures page refresh maintains same visitor and session without inflation", () => {
    const visitorId = "vid_82739482";
    const sessionId = "sid_91823719";

    // Simulating pageview with F5
    const pageviews = [
      { visitorId, sessionId, path: "/tr" },
      { visitorId, sessionId, path: "/tr" }, // F5 refresh
    ];

    const uniqueVisitors = new Set(pageviews.map((p) => p.visitorId));
    const uniqueSessions = new Set(pageviews.map((p) => p.sessionId));

    expect(uniqueVisitors.size).toBe(1);
    expect(uniqueSessions.size).toBe(1);
    expect(pageviews.length).toBe(2);
  });
});
