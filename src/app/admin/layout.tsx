import { redirect } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Box,
  Tags,
  Wrench,
  Award,
  HelpCircle,
  FileText,
  MessageSquare,
  FileDown,
  Image,
  BarChart3,
  Search,
  Users,
  Languages,
  Settings,
  ShieldAlert,
  LogOut,
  ExternalLink,
  History,
} from "lucide-react";
import { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth";
import { AdminLogoutButton } from "@/features/admin/AdminLogoutButton";

export const metadata: Metadata = {
  title: "Yönetim Paneli | Cebeci Medikal",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "none",
      "max-snippet": -1,
    },
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  // If not logged in (e.g. on /admin/login), render children directly. Middleware protects other admin routes.
  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex bg-bg text-foreground">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-surface flex flex-col justify-between flex-shrink-0 hidden md:flex">
        <div className="p-5 space-y-6 overflow-y-auto">
          {/* Brand */}
          <Link href="/admin" className="block space-y-0.5">
            <div className="font-serif text-lg font-bold tracking-wide text-foreground">
              CEBECİ MEDİKAL
            </div>
            <div className="text-[10px] uppercase font-bold text-primary tracking-widest">
              Yönetim Paneli
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-6 text-xs font-medium">
            {/* Overview */}
            <div>
              <Link
                href="/admin"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-foreground hover:bg-surface-2 hover:text-primary transition-colors font-semibold"
              >
                <LayoutDashboard className="w-4 h-4 text-primary" />
                <span>Dashboard</span>
              </Link>
            </div>

            {/* Commercial */}
            <div className="space-y-1">
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-foreground-muted">
                Ticari & Ürünler
              </div>
              <Link
                href="/admin/products"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-foreground hover:bg-surface-2 hover:text-primary transition-colors"
              >
                <Box className="w-4 h-4 text-foreground-muted" />
                <span>Ürün Yönetimi</span>
              </Link>
              <Link
                href="/admin/categories"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-foreground hover:bg-surface-2 hover:text-primary transition-colors"
              >
                <Tags className="w-4 h-4 text-foreground-muted" />
                <span>Kategoriler</span>
              </Link>
              <Link
                href="/admin/quotes"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-foreground hover:bg-surface-2 hover:text-primary transition-colors"
              >
                <FileText className="w-4 h-4 text-foreground-muted" />
                <span>Teklif Talepleri</span>
              </Link>
              <Link
                href="/admin/messages"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-foreground hover:bg-surface-2 hover:text-primary transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-foreground-muted" />
                <span>İletişim Mesajları</span>
              </Link>
              <Link
                href="/admin/catalogs"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-foreground hover:bg-surface-2 hover:text-primary transition-colors"
              >
                <FileDown className="w-4 h-4 text-foreground-muted" />
                <span>Kataloglar</span>
              </Link>
            </div>

            {/* Content */}
            <div className="space-y-1">
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-foreground-muted">
                İçerik Yönetimi
              </div>
              <Link
                href="/admin/services"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-foreground hover:bg-surface-2 hover:text-primary transition-colors"
              >
                <Wrench className="w-4 h-4 text-foreground-muted" />
                <span>Hizmetler</span>
              </Link>
              <Link
                href="/admin/references"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-foreground hover:bg-surface-2 hover:text-primary transition-colors"
              >
                <Award className="w-4 h-4 text-foreground-muted" />
                <span>Referanslar</span>
              </Link>
              <Link
                href="/admin/faqs"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-foreground hover:bg-surface-2 hover:text-primary transition-colors"
              >
                <HelpCircle className="w-4 h-4 text-foreground-muted" />
                <span>SSS Yönetimi</span>
              </Link>
              <Link
                href="/admin/media"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-foreground hover:bg-surface-2 hover:text-primary transition-colors"
              >
                <Image className="w-4 h-4 text-foreground-muted" />
                <span>Medya Kütüphanesi</span>
              </Link>
            </div>

            {/* Analytics */}
            <div className="space-y-1">
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-foreground-muted">
                Analitik & Rapor
              </div>
              <Link
                href="/admin/analytics"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-foreground hover:bg-surface-2 hover:text-primary transition-colors"
              >
                <BarChart3 className="w-4 h-4 text-foreground-muted" />
                <span>Ziyaretçi & Trafik</span>
              </Link>
              <Link
                href="/admin/search-analytics"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-foreground hover:bg-surface-2 hover:text-primary transition-colors"
              >
                <Search className="w-4 h-4 text-foreground-muted" />
                <span>Arama Analitiği</span>
              </Link>
            </div>

            {/* System */}
            <div className="space-y-1">
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-foreground-muted">
                Sistem & Güvenlik
              </div>
              <Link
                href="/admin/translations"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-foreground hover:bg-surface-2 hover:text-primary transition-colors"
              >
                <Languages className="w-4 h-4 text-foreground-muted" />
                <span>Çeviri Tamlığı</span>
              </Link>
              <Link
                href="/admin/audit-logs"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-foreground hover:bg-surface-2 hover:text-primary transition-colors"
              >
                <History className="w-4 h-4 text-foreground-muted" />
                <span>Audit Log</span>
              </Link>
              <Link
                href="/admin/settings"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-foreground hover:bg-surface-2 hover:text-primary transition-colors"
              >
                <Settings className="w-4 h-4 text-foreground-muted" />
                <span>Site Ayarları</span>
              </Link>
            </div>
          </nav>
        </div>

        {/* User profile and logout */}
        <div className="p-4 border-t border-border bg-surface-2/40 space-y-3">
          <div className="flex items-center justify-between">
            <div className="truncate">
              <div className="text-xs font-bold text-foreground truncate">{user.name}</div>
              <div className="text-[10px] text-primary font-semibold uppercase tracking-wide">
                {user.role}
              </div>
            </div>
            <AdminLogoutButton />
          </div>
          <Link
            href="/tr"
            target="_blank"
            className="w-full py-1.5 rounded-lg bg-surface hover:bg-surface-2 border border-border text-[11px] font-medium text-foreground flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Siteyi Görüntüle</span>
            <ExternalLink className="w-3 h-3 text-primary" />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top bar for mobile */}
        <header className="md:hidden border-b border-border bg-surface px-4 py-3 flex items-center justify-between">
          <Link href="/admin" className="font-serif text-base font-bold text-foreground">
            CEBECİ YÖNETİM
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/tr" target="_blank" className="p-2 text-foreground-muted hover:text-foreground">
              <ExternalLink className="w-4 h-4" />
            </Link>
            <AdminLogoutButton />
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
}
