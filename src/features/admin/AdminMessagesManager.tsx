"use client";

import { useState } from "react";
import {
  Search,
  MessageSquare,
  Mail,
  Phone,
  Clock,
  Trash2,
  CheckCircle2,
  Eye,
  AlertCircle,
  X,
  ExternalLink,
  MessageCircle,
  Building,
  User,
  Filter,
} from "lucide-react";

export function AdminMessagesManager({ initialMessages }: { initialMessages: any[] }) {
  const [messages, setMessages] = useState(initialMessages);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [readFilter, setReadFilter] = useState("ALL");

  // Modal
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
  const [loadingAction, setLoadingAction] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const openMessageModal = async (msg: any) => {
    setSelectedMessage(msg);

    // Auto mark as read if not already read
    if (!msg.isRead) {
      try {
        const res = await fetch(`/api/admin/messages/${msg.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isRead: true }),
        });
        if (res.ok) {
          setMessages((prev) =>
            prev.map((m) => (m.id === msg.id ? { ...m, isRead: true } : m))
          );
        }
      } catch (err) {
        console.error("Error marking message as read:", err);
      }
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setLoadingAction(true);
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, isRead: true }),
      });

      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === id ? { ...m, status: newStatus, isRead: true } : m
          )
        );
        if (selectedMessage && selectedMessage.id === id) {
          setSelectedMessage((prev: any) => ({ ...prev, status: newStatus, isRead: true }));
        }
        setSuccessMsg(`Mesaj durumu "${newStatus}" olarak güncellendi.`);
        setTimeout(() => setSuccessMsg(null), 3000);
      }
    } catch (err) {
      alert("Durum güncellenemedi.");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDelete = async (id: string, senderName: string) => {
    if (!confirm(`"${senderName}" adlı kişiden gelen mesajı silmek istediğinize emin misiniz?`)) return;

    try {
      const res = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (selectedMessage?.id === id) setSelectedMessage(null);
        setSuccessMsg("Mesaj başarıyla silindi.");
        setTimeout(() => setSuccessMsg(null), 3000);
      } else {
        alert("Mesaj silinemedi.");
      }
    } catch {
      alert("Bağlantı hatası.");
    }
  };

  // Filtering
  const filtered = messages.filter((m) => {
    const q = search.toLowerCase().trim();
    const matchSearch =
      !q ||
      m.fullName.toLowerCase().includes(q) ||
      (m.company && m.company.toLowerCase().includes(q)) ||
      m.email.toLowerCase().includes(q) ||
      m.phone.toLowerCase().includes(q) ||
      m.subject.toLowerCase().includes(q) ||
      m.message.toLowerCase().includes(q);

    const matchStatus = statusFilter === "ALL" || m.status === statusFilter;
    const matchRead =
      readFilter === "ALL"
        ? true
        : readFilter === "UNREAD"
        ? !m.isRead
        : m.isRead;

    return matchSearch && matchStatus && matchRead;
  });

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="space-y-6">
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative flex-1 min-w-[220px] max-w-md">
            <Search className="w-4 h-4 text-foreground-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="İsim, kurum, e-posta, telefon veya mesajda ara..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
          >
            <option value="ALL">Tüm Durumlar</option>
            <option value="NEW">Yeni (NEW)</option>
            <option value="REPLIED">Cevaplandı (REPLIED)</option>
            <option value="ARCHIVED">Arşivlendi (ARCHIVED)</option>
            <option value="SPAM">Spam</option>
          </select>

          <select
            value={readFilter}
            onChange={(e) => setReadFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
          >
            <option value="ALL">Okunma Durumu (Tümü)</option>
            <option value="UNREAD">Sadece Okunmamışlar ({unreadCount})</option>
            <option value="READ">Okunmuşlar</option>
          </select>
        </div>

        {unreadCount > 0 && (
          <div className="px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{unreadCount} Okunmamış Mesaj</span>
          </div>
        )}
      </div>

      {/* Messages Table */}
      <div className="rounded-2xl border border-border overflow-hidden bg-surface shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-surface-2/40 text-left text-foreground-muted">
                <th className="p-4 font-semibold">Durum</th>
                <th className="p-4 font-semibold">Gönderen</th>
                <th className="p-4 font-semibold">İletişim</th>
                <th className="p-4 font-semibold">Konu & Önizleme</th>
                <th className="p-4 font-semibold">Tarih</th>
                <th className="p-4 font-semibold text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length > 0 ? (
                filtered.map((m) => {
                  return (
                    <tr
                      key={m.id}
                      className={`hover:bg-surface-2/40 transition-colors ${
                        !m.isRead ? "bg-primary/5 font-medium" : ""
                      }`}
                    >
                      <td className="p-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          {!m.isRead && (
                            <span className="w-2 h-2 rounded-full bg-primary" title="Okunmamış" />
                          )}
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              m.status === "NEW"
                                ? "bg-amber-500/20 text-amber-400"
                                : m.status === "REPLIED"
                                ? "bg-emerald-500/20 text-emerald-400"
                                : m.status === "ARCHIVED"
                                ? "bg-surface-2 text-foreground-muted"
                                : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {m.status}
                          </span>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="font-bold text-foreground">{m.fullName}</div>
                        {m.company && (
                          <div className="text-[11px] text-foreground-muted flex items-center gap-1 mt-0.5">
                            <Building className="w-3 h-3 text-primary/70" />
                            <span>{m.company}</span>
                          </div>
                        )}
                      </td>

                      <td className="p-4 space-y-0.5">
                        <a
                          href={`mailto:${m.email}`}
                          className="text-primary hover:underline block truncate max-w-[180px]"
                        >
                          {m.email}
                        </a>
                        <a
                          href={`tel:${m.phone.replace(/\s+/g, "")}`}
                          className="text-foreground-muted hover:text-foreground block"
                        >
                          {m.phone}
                        </a>
                      </td>

                      <td className="p-4 max-w-sm">
                        <div className="font-bold text-foreground mb-0.5 truncate">
                          {m.subject}
                        </div>
                        <div className="text-foreground-muted line-clamp-2 leading-relaxed">
                          {m.message}
                        </div>
                      </td>

                      <td className="p-4 text-foreground-muted whitespace-nowrap">
                        {new Date(m.createdAt).toLocaleString("tr-TR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>

                      <td className="p-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => openMessageModal(m)}
                            className="p-1.5 rounded-lg bg-surface-2 hover:bg-primary/20 text-foreground-muted hover:text-primary transition-colors"
                            title="Mesajı Oku"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(m.id, m.fullName)}
                            className="p-1.5 rounded-lg bg-surface-2 hover:bg-red-500/20 text-foreground-muted hover:text-red-400 transition-colors"
                            title="Sil"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-foreground-muted">
                    {messages.length === 0
                      ? "Henüz kayıtlı iletişim mesajı bulunmuyor."
                      : "Arama ve filtre kriterlerinize uygun mesaj bulunamadı."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl bg-surface border border-border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-border pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                      selectedMessage.status === "NEW"
                        ? "bg-amber-500/20 text-amber-400"
                        : selectedMessage.status === "REPLIED"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-surface-2 text-foreground-muted"
                    }`}
                  >
                    {selectedMessage.status}
                  </span>
                  <span className="text-xs text-foreground-muted">
                    {new Date(selectedMessage.createdAt).toLocaleString("tr-TR")}
                  </span>
                </div>
                <h2 className="font-serif text-xl font-bold text-foreground">
                  {selectedMessage.subject}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="p-2 rounded-xl bg-surface-2 hover:bg-surface text-foreground-muted hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sender Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-surface-2/60 border border-border text-xs">
              <div className="space-y-1">
                <div className="text-foreground-muted flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-primary" />
                  <span>Gönderen</span>
                </div>
                <div className="font-bold text-foreground text-sm">{selectedMessage.fullName}</div>
                {selectedMessage.company && (
                  <div className="text-foreground-muted">{selectedMessage.company}</div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-primary" />
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="text-primary font-semibold hover:underline"
                  >
                    {selectedMessage.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-primary" />
                  <a
                    href={`tel:${selectedMessage.phone.replace(/\s+/g, "")}`}
                    className="text-foreground font-semibold hover:underline"
                  >
                    {selectedMessage.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Message Body */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-foreground">Mesaj İçeriği:</label>
              <div className="p-4 rounded-2xl bg-surface-2 border border-border text-xs sm:text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </div>
            </div>

            {/* Quick Actions Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                    selectedMessage.subject
                  )}`}
                  className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>E-posta ile Yanıtla</span>
                </a>

                <a
                  href={`https://wa.me/${selectedMessage.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Status Update Options */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={loadingAction}
                  onClick={() => handleUpdateStatus(selectedMessage.id, "REPLIED")}
                  className="px-3 py-2 rounded-xl bg-surface-2 hover:bg-emerald-500/20 text-xs font-semibold text-emerald-400 border border-border transition-colors"
                >
                  Cevaplandı
                </button>
                <button
                  type="button"
                  disabled={loadingAction}
                  onClick={() => handleUpdateStatus(selectedMessage.id, "ARCHIVED")}
                  className="px-3 py-2 rounded-xl bg-surface-2 hover:bg-surface text-xs font-semibold text-foreground-muted border border-border transition-colors"
                >
                  Arşive Kaldır
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(selectedMessage.id, selectedMessage.fullName)}
                  className="p-2 rounded-xl bg-surface-2 hover:bg-red-500/20 text-red-400 border border-border transition-colors"
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
