import { db } from "@/lib/db";
import { BarChart3, MapPin, Eye, Users, Activity, TrendingUp, Filter } from "lucide-react";

export default async function AdminAnalyticsPage() {
  const [
    totalVisitors,
    totalSessions,
    totalPageViews,
    visitors,
    pageviews,
    events,
  ] = await Promise.all([
    db.analyticsVisitor.count(),
    db.analyticsSession.count(),
    db.analyticsPageView.count(),
    db.analyticsVisitor.findMany({
      orderBy: { lastSeenAt: "desc" },
      take: 20,
    }),
    db.analyticsPageView.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    db.analyticsEvent.findMany({
      orderBy: { createdAt: "desc" },
      take: 30,
    }),
  ]);

  // City Aggregation
  const cityMap = new Map<string, { city: string; country: string; count: number }>();
  for (const v of visitors) {
    const key = `${v.city || "Ankara"}-${v.country || "TR"}`;
    const curr = cityMap.get(key) || { city: v.city || "Ankara", country: v.country || "TR", count: 0 };
    curr.count += 1;
    cityMap.set(key, curr);
  }
  const cityStats = Array.from(cityMap.values()).sort((a, b) => b.count - a.count);

  // Top visited paths
  const pathMap = new Map<string, number>();
  for (const pv of pageviews) {
    const p = pv.path || "/";
    pathMap.set(p, (pathMap.get(p) || 0) + 1);
  }
  const topPaths = Array.from(pathMap.entries())
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
          Ziyaretçi & Trafik Analitiği
        </h1>
        <p className="text-xs sm:text-sm text-foreground-muted mt-1">
          KVKK ve gizlilik dostu birinci taraf analitik metrikleri (F5 manipülasyonu engellenmiş model).
        </p>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-surface border border-border space-y-2">
          <div className="text-xs font-bold text-foreground-muted uppercase">Benzersiz Ziyaretçi</div>
          <div className="text-3xl font-serif font-bold text-primary">{totalVisitors}</div>
          <div className="text-xs text-foreground-muted">Anonim UUID bazlı tekil cihazlar</div>
        </div>

        <div className="p-6 rounded-2xl bg-surface border border-border space-y-2">
          <div className="text-xs font-bold text-foreground-muted uppercase">Toplam Oturum</div>
          <div className="text-3xl font-serif font-bold text-foreground">{totalSessions}</div>
          <div className="text-xs text-foreground-muted">30 dk inaktivite süresi</div>
        </div>

        <div className="p-6 rounded-2xl bg-surface border border-border space-y-2">
          <div className="text-xs font-bold text-foreground-muted uppercase">Sayfa Görüntüleme</div>
          <div className="text-3xl font-serif font-bold text-foreground">{totalPageViews}</div>
          <div className="text-xs text-foreground-muted">F5 sadece görüntülemeyi artırır</div>
        </div>
      </div>

      {/* Analytics Grid: Cities & Top Visited Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* City Distribution (PRD Section 19.4) */}
        <div className="p-6 rounded-3xl bg-surface border border-border space-y-4">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span>Şehir ve Ülke Dağılımı (Yaklaşık Konum)</span>
          </h2>
          <div className="divide-y divide-border text-xs">
            {cityStats.length > 0 ? (
              cityStats.map((cs, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between">
                  <div className="font-semibold text-foreground">{cs.city} ({cs.country})</div>
                  <div className="font-mono text-primary font-bold">{cs.count} Ziyaretçi</div>
                </div>
              ))
            ) : (
              <div className="py-6 text-center text-foreground-muted">Henüz veri yok</div>
            )}
          </div>
        </div>

        {/* Top Pages */}
        <div className="p-6 rounded-3xl bg-surface border border-border space-y-4">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Eye className="w-4 h-4 text-primary" />
            <span>En Çok İncelenen Sayfalar</span>
          </h2>
          <div className="divide-y divide-border text-xs">
            {topPaths.length > 0 ? (
              topPaths.map((tp, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between">
                  <div className="font-mono text-foreground truncate max-w-sm">{tp.path}</div>
                  <div className="font-semibold text-primary">{tp.count} Görüntüleme</div>
                </div>
              ))
            ) : (
              <div className="py-6 text-center text-foreground-muted">Henüz veri yok</div>
            )}
          </div>
        </div>
      </div>

      {/* Conversion Events Table */}
      <div className="p-6 rounded-3xl bg-surface border border-border space-y-4">
        <h2 className="text-base font-bold text-foreground flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span>Son Tetiklenen Dönüşüm Olayları</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border text-left text-foreground-muted">
                <th className="pb-3 font-semibold">Olay Adı</th>
                <th className="pb-3 font-semibold">Etiket</th>
                <th className="pb-3 font-semibold">Sayfa</th>
                <th className="pb-3 font-semibold">Tarih</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {events.length > 0 ? (
                events.map((ev) => (
                  <tr key={ev.id} className="hover:bg-surface-2/50">
                    <td className="py-3 font-mono font-bold text-primary">{ev.eventName}</td>
                    <td className="py-3 text-foreground">{ev.eventLabel || "-"}</td>
                    <td className="py-3 font-mono text-foreground-muted">{ev.path}</td>
                    <td className="py-3 text-foreground-muted">
                      {new Date(ev.createdAt).toLocaleString("tr-TR")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-foreground-muted">
                    Henüz olay kaydı bulunmuyor.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
