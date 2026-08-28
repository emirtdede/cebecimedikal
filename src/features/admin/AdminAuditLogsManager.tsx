"use client";

import { useState } from "react";
import {
  Search,
  History,
  ShieldCheck,
  User,
  Filter,
  Eye,
  X,
  Code2,
} from "lucide-react";

export function AdminAuditLogsManager({ initialLogs }: { initialLogs: any[] }) {
  const [logs, setLogs] = useState(initialLogs);
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("ALL");
  const [entityFilter, setEntityFilter] = useState("ALL");

  const [selectedLog, setSelectedLog] = useState<any | null>(null);

  // Distinct action types & entities
  const actionList = Array.from(new Set(logs.map((l) => l.action).filter(Boolean)));
  const entityList = Array.from(new Set(logs.map((l) => l.entityType).filter(Boolean)));

  const filtered = logs.filter((log) => {
    const q = search.toLowerCase().trim();
    const matchSearch =
      !q ||
      log.action.toLowerCase().includes(q) ||
      (log.userName && log.userName.toLowerCase().includes(q)) ||
      (log.userEmail && log.userEmail.toLowerCase().includes(q)) ||
      (log.entityType && log.entityType.toLowerCase().includes(q)) ||
      (log.ipAddress && log.ipAddress.toLowerCase().includes(q)) ||
      (log.details && log.details.toLowerCase().includes(q));

    const matchAction = actionFilter === "ALL" || log.action === actionFilter;
    const matchEntity = entityFilter === "ALL" || log.entityType === entityFilter;

    return matchSearch && matchAction && matchEntity;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative flex-1 min-w-[220px] max-w-md">
            <Search className="w-4 h-4 text-foreground-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="İşlem türü, kullanıcı, IP veya detaylarda ara..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary"
            />
          </div>

          {actionList.length > 0 && (
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
            >
              <option value="ALL">Tüm İşlemler ({logs.length})</option>
              {actionList.map((act) => (
                <option key={act} value={act}>
                  {act}
                </option>
              ))}
            </select>
          )}

          {entityList.length > 0 && (
            <select
              value={entityFilter}
              onChange={(e) => setEntityFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
            >
              <option value="ALL">Tüm Varlıklar</option>
              {entityList.map((ent) => (
                <option key={ent} value={ent}>
                  {ent}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border overflow-hidden bg-surface shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-surface-2/40 text-left text-foreground-muted">
                <th className="p-4 font-semibold">İşlem (Action)</th>
                <th className="p-4 font-semibold">Kullanıcı</th>
                <th className="p-4 font-semibold">Varlık / Tür</th>
                <th className="p-4 font-semibold">Detaylar</th>
                <th className="p-4 font-semibold">IP Adresi</th>
                <th className="p-4 font-semibold">Tarih</th>
                <th className="p-4 font-semibold text-right">İncele</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length > 0 ? (
                filtered.map((log) => (
                  <tr key={log.id} className="hover:bg-surface-2/40 transition-colors">
                    <td className="p-4 font-mono font-bold text-primary">{log.action}</td>
                    <td className="p-4">
                      <div className="font-semibold text-foreground">
                        {log.userName || log.userEmail || "Sistem"}
                      </div>
                      {log.userEmail && log.userName && (
                        <div className="text-[11px] text-foreground-muted">{log.userEmail}</div>
                      )}
                    </td>
                    <td className="p-4 text-foreground font-semibold">
                      <span className="px-2 py-0.5 rounded bg-surface-2 border border-border text-[11px]">
                        {log.entityType || "-"}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-[11px] text-foreground-muted max-w-xs truncate">
                      {log.details || "-"}
                    </td>
                    <td className="p-4 font-mono text-foreground-muted">{log.ipAddress || "-"}</td>
                    <td className="p-4 text-foreground-muted whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString("tr-TR")}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedLog(log)}
                        className="p-1.5 rounded-lg bg-surface-2 hover:bg-primary/20 text-foreground-muted hover:text-primary transition-colors"
                        title="Detayı Görüntüle"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-foreground-muted">
                    Arama kriterlerinize uygun denetim kaydı bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Details Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl bg-surface border border-border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-primary/20 text-primary font-mono">
                  {selectedLog.action}
                </span>
                <h2 className="font-serif text-lg font-bold text-foreground mt-1">
                  Denetim Kaydı Detayı
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLog(null)}
                className="p-2 rounded-xl bg-surface-2 hover:bg-surface text-foreground-muted hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-surface-2/60 border border-border">
                <div>
                  <span className="text-foreground-muted block">İşlemi Yapan:</span>
                  <span className="font-bold text-foreground">{selectedLog.userName || "Bilinmiyor"}</span>
                </div>
                <div>
                  <span className="text-foreground-muted block">E-posta:</span>
                  <span className="font-semibold text-foreground">{selectedLog.userEmail || "-"}</span>
                </div>
                <div>
                  <span className="text-foreground-muted block">Varlık Türü:</span>
                  <span className="font-semibold text-foreground">{selectedLog.entityType || "-"}</span>
                </div>
                <div>
                  <span className="text-foreground-muted block">Varlık ID:</span>
                  <span className="font-mono text-foreground">{selectedLog.entityId || "-"}</span>
                </div>
                <div>
                  <span className="text-foreground-muted block">IP Adresi:</span>
                  <span className="font-mono text-foreground">{selectedLog.ipAddress || "-"}</span>
                </div>
                <div>
                  <span className="text-foreground-muted block">Zaman:</span>
                  <span className="font-semibold text-foreground">
                    {new Date(selectedLog.createdAt).toLocaleString("tr-TR")}
                  </span>
                </div>
              </div>

              {selectedLog.details && (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-foreground">
                    <Code2 className="w-3.5 h-3.5 text-primary" />
                    <span>Kayıt Detayları (JSON / Veri)</span>
                  </div>
                  <pre className="p-4 rounded-2xl bg-surface-2 border border-border text-[11px] font-mono text-primary overflow-x-auto whitespace-pre-wrap">
                    {(() => {
                      try {
                        return JSON.stringify(JSON.parse(selectedLog.details), null, 2);
                      } catch {
                        return selectedLog.details;
                      }
                    })()}
                  </pre>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4 border-t border-border">
              <button
                type="button"
                onClick={() => setSelectedLog(null)}
                className="px-5 py-2 rounded-xl bg-surface-2 hover:bg-surface border border-border text-xs font-semibold text-foreground"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
