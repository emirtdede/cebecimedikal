"use client";

import { useState } from "react";
import {
  Search,
  FileText,
  Phone,
  Mail,
  MessageCircle,
  Check,
  Loader2,
  Trash2,
  Eye,
  X,
  Building,
  CheckCircle2,
} from "lucide-react";
import { useAdminLanguage } from "./AdminLanguageContext";
import { getAdminUi } from "@/lib/admin-translations";

export function AdminQuotesTable({ initialQuotes }: { initialQuotes: any[] }) {
  const { locale, dict } = useAdminLanguage();
  const [quotes, setQuotes] = useState(initialQuotes);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selectedQuote, setSelectedQuote] = useState<any | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/quotes/${id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setQuotes((prev) =>
          prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
        );
        if (selectedQuote && selectedQuote.id === id) {
          setSelectedQuote((prev: any) => ({ ...prev, status: newStatus }));
        }
        setSuccessMsg(`Status updated to "${newStatus}".`);
        setTimeout(() => setSuccessMsg(null), 3000);
      } else {
        alert("Operation failed.");
      }
    } catch {
      alert("Network error.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string, quoteNumber: string) => {
    if (!confirm(getAdminUi("confirmDelete", locale))) return;

    try {
      const res = await fetch(`/api/admin/quotes/${id}`, { method: "DELETE" });
      if (res.ok) {
        setQuotes((prev) => prev.filter((q) => q.id !== id));
        if (selectedQuote?.id === id) setSelectedQuote(null);
        setSuccessMsg("Deleted successfully.");
        setTimeout(() => setSuccessMsg(null), 3000);
      } else {
        alert("Operation failed.");
      }
    } catch {
      alert("Network error.");
    }
  };

  const filtered = quotes.filter((q) => {
    const term = search.toLowerCase().trim();
    const matchSearch =
      !term ||
      q.fullName.toLowerCase().includes(term) ||
      (q.company && q.company.toLowerCase().includes(term)) ||
      q.quoteNumber.toLowerCase().includes(term) ||
      (q.productName && q.productName.toLowerCase().includes(term)) ||
      (q.topic && q.topic.toLowerCase().includes(term)) ||
      (q.city && q.city.toLowerCase().includes(term)) ||
      (q.email && q.email.toLowerCase().includes(term)) ||
      (q.phone && q.phone.toLowerCase().includes(term));

    const matchStatus = statusFilter === "ALL" || q.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Action and Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-foreground-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={getAdminUi("searchPlaceholder", locale)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
          >
            <option value="ALL">{getAdminUi("allStatuses", locale)}</option>
            <option value="NEW">NEW</option>
            <option value="CONTACTED">CONTACTED</option>
            <option value="CONVERTED">CONVERTED</option>
            <option value="REJECTED">REJECTED</option>
          </select>
        </div>
      </div>

      {/* Quotes Table */}
      <div className="rounded-2xl border border-border overflow-hidden bg-surface shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-surface-2/40 text-left text-foreground-muted">
                <th className="p-4 font-semibold">{getAdminUi("quoteNumber", locale)}</th>
                <th className="p-4 font-semibold">{getAdminUi("customerCompany", locale)}</th>
                <th className="p-4 font-semibold">{getAdminUi("contact", locale)}</th>
                <th className="p-4 font-semibold">{getAdminUi("requestDetail", locale)}</th>
                <th className="p-4 font-semibold">{getAdminUi("channel", locale)}</th>
                <th className="p-4 font-semibold">{getAdminUi("condition", locale)}</th>
                <th className="p-4 font-semibold">{getAdminUi("date", locale)}</th>
                <th className="p-4 font-semibold text-right">{getAdminUi("actions", locale)}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length > 0 ? (
                filtered.map((q) => (
                  <tr key={q.id} className="hover:bg-surface-2/40 transition-colors">
                    <td className="p-4 font-mono font-bold text-primary">{q.quoteNumber}</td>
                    <td className="p-4">
                      <div className="font-bold text-foreground">{q.fullName}</div>
                      <div className="text-[11px] text-foreground-muted">
                        {q.company} • {q.city}
                      </div>
                    </td>
                    <td className="p-4 space-y-0.5">
                      <div className="font-medium text-foreground">{q.phone}</div>
                      <div className="text-foreground-muted text-[11px]">{q.email}</div>
                    </td>
                    <td className="p-4 max-w-xs">
                      <div className="font-semibold text-primary">{q.productName || q.topic}</div>
                      <div className="text-[11px] text-foreground-muted line-clamp-2">
                        {q.message}
                      </div>
                      {q.quantity > 1 && (
                        <div className="text-[10px] font-bold text-foreground">
                          Adet: {q.quantity}
                        </div>
                      )}
                    </td>
                    <td className="p-4 uppercase font-bold text-[10px] text-foreground-muted">
                      {q.preferredChannel}
                    </td>
                    <td className="p-4">
                      <select
                        disabled={updatingId === q.id}
                        value={q.status}
                        onChange={(e) => handleStatusChange(q.id, e.target.value)}
                        className={`px-2.5 py-1.5 rounded-lg border text-xs font-bold focus:outline-none ${
                          q.status === "NEW"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                            : q.status === "CONCLUDED"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : "bg-surface-2 text-foreground border-border"
                        }`}
                      >
                        <option value="NEW">Yeni</option>
                        <option value="IN_REVIEW">İnceleniyor</option>
                        <option value="QUOTE_PREPARED">Teklif Hazırlandı</option>
                        <option value="CONTACTED">İletişime Geçildi</option>
                        <option value="CONCLUDED">Sonuçlandı</option>
                        <option value="CLOSED">Kapatıldı</option>
                        <option value="SPAM">Spam</option>
                      </select>
                    </td>
                    <td className="p-4 text-foreground-muted whitespace-nowrap">
                      {new Date(q.createdAt).toLocaleDateString("tr-TR")}
                    </td>
                    <td className="p-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedQuote(q)}
                          className="p-1.5 rounded-lg bg-surface-2 hover:bg-primary/20 text-foreground-muted hover:text-primary transition-colors"
                          title="Detayları İncele"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(q.id, q.quoteNumber)}
                          className="p-1.5 rounded-lg bg-surface-2 hover:bg-red-500/20 text-foreground-muted hover:text-red-400 transition-colors"
                          title="Sil"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-foreground-muted">
                    Eşleşen teklif talebi bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quote Detail Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl bg-surface border border-border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-border pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-primary/20 text-primary font-mono">
                    {selectedQuote.quoteNumber}
                  </span>
                  <span className="text-xs text-foreground-muted">
                    {new Date(selectedQuote.createdAt).toLocaleString("tr-TR")}
                  </span>
                </div>
                <h2 className="font-serif text-xl font-bold text-foreground">
                  {selectedQuote.productName || selectedQuote.topic || "Teklif Talebi"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedQuote(null)}
                className="p-2 rounded-xl bg-surface-2 hover:bg-surface text-foreground-muted hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Customer info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-surface-2/60 border border-border text-xs">
              <div className="space-y-1">
                <span className="text-foreground-muted block">Müşteri / Kurum:</span>
                <span className="font-bold text-foreground text-sm block">{selectedQuote.fullName}</span>
                <span className="text-foreground-muted flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-primary" />
                  <span>{selectedQuote.company} ({selectedQuote.city})</span>
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-primary" />
                  <a href={`mailto:${selectedQuote.email}`} className="text-primary font-semibold hover:underline">
                    {selectedQuote.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-primary" />
                  <a href={`tel:${selectedQuote.phone}`} className="text-foreground font-semibold hover:underline">
                    {selectedQuote.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Quote details */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-foreground">Talep ve Açıklama:</label>
              <div className="p-4 rounded-2xl bg-surface-2 border border-border text-xs sm:text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                {selectedQuote.message || "Özel bir mesaj belirtilmedi."}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selectedQuote.email}?subject=Teklif: ${encodeURIComponent(
                    selectedQuote.quoteNumber
                  )} - Cebeci Medikal`}
                  className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>E-posta Gönder</span>
                </a>

                <a
                  href={`https://wa.me/${selectedQuote.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleStatusChange(selectedQuote.id, "QUOTE_PREPARED")}
                  className="px-3 py-2 rounded-xl bg-surface-2 hover:bg-surface text-xs font-semibold text-foreground border border-border"
                >
                  Teklif Hazırlandı Yap
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(selectedQuote.id, selectedQuote.quoteNumber)}
                  className="p-2 rounded-xl bg-surface-2 hover:bg-red-500/20 text-red-400 border border-border"
                  title="Sil"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
