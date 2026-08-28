"use client";

import { useState } from "react";
import { Search, Globe, Clock, BarChart3, TrendingUp, AlertTriangle } from "lucide-react";

export function AdminSearchAnalyticsManager({ initialQueries }: { initialQueries: any[] }) {
  const [queries, setQueries] = useState(initialQueries);
  const [search, setSearch] = useState("");
  const [localeFilter, setLocaleFilter] = useState("ALL");
  const [resultsFilter, setResultsFilter] = useState("ALL");

  const filtered = queries.filter((sq) => {
    const q = search.toLowerCase().trim();
    const matchSearch = !q || sq.query.toLowerCase().includes(q) || sq.locale.toLowerCase().includes(q);
    const matchLocale = localeFilter === "ALL" || sq.locale.toLowerCase() === localeFilter.toLowerCase();
    const matchResults =
      resultsFilter === "ALL"
        ? true
        : resultsFilter === "ZERO"
        ? sq.resultsCount === 0
        : sq.resultsCount > 0;

    return matchSearch && matchLocale && matchResults;
  });

  const zeroResultsCount = queries.filter((q) => q.resultsCount === 0).length;

  return (
    <div className="space-y-6">
      {/* Top metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-surface border border-border">
          <div className="text-xs text-foreground-muted mb-1 flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-primary" />
            <span>Toplam Arama Kaydı</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{queries.length}</div>
        </div>

        <div className="p-5 rounded-2xl bg-surface border border-border">
          <div className="text-xs text-foreground-muted mb-1 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sonuç Bulunan Aramalar</span>
          </div>
          <div className="text-2xl font-bold text-emerald-400">
            {queries.filter((q) => q.resultsCount > 0).length}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-surface border border-border">
          <div className="text-xs text-foreground-muted mb-1 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Sonuçsuz Aramalar (Fırsat)</span>
          </div>
          <div className="text-2xl font-bold text-amber-400">{zeroResultsCount}</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative flex-1 min-w-[220px] max-w-md">
            <Search className="w-4 h-4 text-foreground-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Arama terimi veya dilde ara..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary"
            />
          </div>

          <select
            value={localeFilter}
            onChange={(e) => setLocaleFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none uppercase"
          >
            <option value="ALL">Tüm Diller</option>
            <option value="tr">TR (Türkçe)</option>
            <option value="en">EN (İngilizce)</option>
            <option value="de">DE (Almanca)</option>
            <option value="ar">AR (Arapça)</option>
            <option value="ja">JA (Japonca)</option>
            <option value="zh">ZH (Çince)</option>
          </select>

          <select
            value={resultsFilter}
            onChange={(e) => setResultsFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
          >
            <option value="ALL">Tüm Sonuç Durumları</option>
            <option value="FOUND">Sonuç Bulunanlar ({">"}0)</option>
            <option value="ZERO">Sonuçsuz Aramalar (0)</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border overflow-hidden bg-surface shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-surface-2/40 text-left text-foreground-muted">
                <th className="p-4 font-semibold">Arama Terimi</th>
                <th className="p-4 font-semibold">Dil</th>
                <th className="p-4 font-semibold">Bulunan Sonuç</th>
                <th className="p-4 font-semibold">Durum</th>
                <th className="p-4 font-semibold text-right">Tarih</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length > 0 ? (
                filtered.map((sq) => (
                  <tr key={sq.id} className="hover:bg-surface-2/40 transition-colors">
                    <td className="p-4 font-bold text-foreground text-sm">
                      &ldquo;{sq.query}&rdquo;
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-surface-2 border border-border text-[10px] font-bold uppercase text-primary font-mono">
                        {sq.locale}
                      </span>
                    </td>
                    <td className="p-4 font-mono font-bold text-foreground">
                      {sq.resultsCount} Sonuç
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          sq.resultsCount > 0
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-amber-500/20 text-amber-400"
                        }`}
                      >
                        {sq.resultsCount > 0 ? "Eşleşti" : "Sonuç Yok"}
                      </span>
                    </td>
                    <td className="p-4 text-foreground-muted text-right whitespace-nowrap">
                      {new Date(sq.createdAt).toLocaleString("tr-TR")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-foreground-muted">
                    Arama kriterlerinize uygun sorgu bulunamadı.
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
