import Link from "next/link";
import {
  Users,
  Eye,
  FileText,
  MessageSquare,
  MessageCircle,
  Activity,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { db } from "@/lib/db";

export default async function AdminDashboardPage() {
  // Aggregate real stats from database
  const [
    totalVisitors,
    totalSessions,
    totalPageViews,
    totalQuotes,
    newQuotesCount,
    totalMessages,
    whatsappEventsCount,
    recentQuotes,
    recentMessages,
    productsCount,
  ] = await Promise.all([
    db.analyticsVisitor.count(),
    db.analyticsSession.count(),
    db.analyticsPageView.count(),
    db.quoteRequest.count(),
    db.quoteRequest.count({ where: { status: "NEW" } }),
    db.contactMessage.count(),
    db.analyticsEvent.count({ where: { eventName: "whatsapp_click" } }),
    db.quoteRequest.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    db.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    db.product.count({ where: { status: "PUBLISHED" } }),
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
            Sistem Genel Bakış
          </h1>
          <p className="text-xs sm:text-sm text-foreground-muted mt-1">
            Gerçek zamanlı ziyaretçi analitiği, ticari dönüşümler ve içerik durumu.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/quotes"
            className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Teklifleri İncele ({newQuotesCount} Yeni)</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Visitors */}
        <div className="p-5 rounded-2xl bg-surface border border-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-foreground-muted uppercase">Ziyaretçi</span>
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-serif text-foreground">
            {totalVisitors}
          </div>
          <div className="text-[11px] text-foreground-muted flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-primary" />
            <span>Tekil Anonim UUID</span>
          </div>
        </div>

        {/* Sessions */}
        <div className="p-5 rounded-2xl bg-surface border border-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-foreground-muted uppercase">Oturumlar</span>
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-serif text-foreground">
            {totalSessions}
          </div>
          <div className="text-[11px] text-foreground-muted">
            30 dk inaktivite aşımı
          </div>
        </div>

        {/* Page Views */}
        <div className="p-5 rounded-2xl bg-surface border border-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-foreground-muted uppercase">Görüntüleme</span>
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-serif text-foreground">
            {totalPageViews}
          </div>
          <div className="text-[11px] text-foreground-muted">
            Toplam sayfa ziyareti
          </div>
        </div>

        {/* Quotes */}
        <div className="p-5 rounded-2xl bg-surface border border-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-foreground-muted uppercase">Teklif Talebi</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-serif text-foreground">
            {totalQuotes}
          </div>
          <div className="text-[11px] text-amber-500 font-semibold">
            {newQuotesCount} onay bekleyen
          </div>
        </div>

        {/* Messages */}
        <div className="p-5 rounded-2xl bg-surface border border-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-foreground-muted uppercase">Mesajlar</span>
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-serif text-foreground">
            {totalMessages}
          </div>
          <div className="text-[11px] text-foreground-muted">
            İletişim formları
          </div>
        </div>

        {/* WhatsApp Events */}
        <div className="p-5 rounded-2xl bg-surface border border-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-foreground-muted uppercase">WhatsApp CTA</span>
            <div className="p-2 rounded-lg bg-[#25D366]/10 text-[#25D366]">
              <MessageCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-serif text-foreground">
            {whatsappEventsCount}
          </div>
          <div className="text-[11px] text-foreground-muted">
            Dönüşüm tıklaması
          </div>
        </div>
      </div>

      {/* Tables Grid: Recent Quotes & Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Quotes */}
        <div className="p-6 rounded-3xl bg-surface border border-border space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <span>Son Gelen Teklif Talepleri</span>
            </h2>
            <Link href="/admin/quotes" className="text-xs font-bold text-primary hover:underline">
              Tümünü Gör →
            </Link>
          </div>

          <div className="divide-y divide-border">
            {recentQuotes.length > 0 ? (
              recentQuotes.map((q) => (
                <div key={q.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <div className="font-bold text-foreground flex items-center gap-2">
                      <span>{q.fullName}</span>
                      <span className="font-mono text-[10px] text-foreground-muted">({q.quoteNumber})</span>
                    </div>
                    <div className="text-foreground-muted">{q.company} • {q.city}</div>
                    <div className="text-primary font-medium truncate max-w-xs">{q.productName || q.topic}</div>
                  </div>
                  <div className="text-right space-y-1">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                      q.status === "NEW" ? "bg-amber-500/20 text-amber-400" : "bg-primary/20 text-primary"
                    }`}>
                      {q.status}
                    </span>
                    <div className="text-[10px] text-foreground-muted">
                      {new Date(q.createdAt).toLocaleDateString("tr-TR")}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-xs text-foreground-muted">
                Henüz teklif talebi bulunmuyor.
              </div>
            )}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="p-6 rounded-3xl bg-surface border border-border space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span>Son İletişim Mesajları</span>
            </h2>
            <Link href="/admin/messages" className="text-xs font-bold text-primary hover:underline">
              Tümünü Gör →
            </Link>
          </div>

          <div className="divide-y divide-border">
            {recentMessages.length > 0 ? (
              recentMessages.map((msg) => (
                <div key={msg.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <div className="font-bold text-foreground">{msg.fullName}</div>
                    <div className="text-foreground-muted">{msg.email} • {msg.phone}</div>
                    <div className="text-foreground font-medium truncate max-w-xs">{msg.subject}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-foreground-muted">
                      {new Date(msg.createdAt).toLocaleDateString("tr-TR")}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-xs text-foreground-muted">
                Henüz iletişim mesajı bulunmuyor.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
