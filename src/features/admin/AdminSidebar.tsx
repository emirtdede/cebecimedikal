"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  ExternalLink,
  History,
} from "lucide-react";
import { useAdminLanguage } from "./AdminLanguageContext";
import { AdminLanguageSwitcher } from "./AdminLanguageSwitcher";
import { AdminLogoutButton } from "./AdminLogoutButton";

export function AdminSidebar({ user }: { user: any }) {
  const pathname = usePathname();
  const { dict, locale } = useAdminLanguage();
  const a = dict.admin || {};

  const isActive = (path: string) => {
    if (path === "/admin") return pathname === "/admin";
    return pathname.startsWith(path);
  };

  return (
    <aside className="w-64 border-r border-border bg-surface flex flex-col justify-between flex-shrink-0 hidden md:flex">
      <div className="p-5 space-y-6 overflow-y-auto">
        {/* Brand & Language */}
        <div className="flex items-center justify-between">
          <Link href="/admin" className="block space-y-0.5">
            <div className="font-serif text-lg font-bold tracking-wide text-foreground">
              CEBECİ MEDİKAL
            </div>
            <div className="text-[10px] uppercase font-bold text-primary tracking-widest">
              {a.title || "Yönetim Paneli"}
            </div>
          </Link>
          <AdminLanguageSwitcher />
        </div>

        {/* Navigation Links */}
        <nav className="space-y-6 text-xs font-medium">
          {/* Overview */}
          <div>
            <Link
              href="/admin"
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors font-semibold ${
                isActive("/admin")
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-surface-2 hover:text-primary"
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-primary" />
              <span>{a.dashboard || "Dashboard"}</span>
            </Link>
          </div>

          {/* Commercial */}
          <div className="space-y-1">
            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-foreground-muted">
              {a.commercial || "Ticari & Ürünler"}
            </div>
            <Link
              href="/admin/products"
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors ${
                isActive("/admin/products")
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-foreground hover:bg-surface-2 hover:text-primary"
              }`}
            >
              <Box className="w-4 h-4 text-foreground-muted" />
              <span>{a.productManagement || "Ürün Yönetimi"}</span>
            </Link>
            <Link
              href="/admin/categories"
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors ${
                isActive("/admin/categories")
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-foreground hover:bg-surface-2 hover:text-primary"
              }`}
            >
              <Tags className="w-4 h-4 text-foreground-muted" />
              <span>{a.categoryManagement || "Kategori Yönetimi"}</span>
            </Link>
            <Link
              href="/admin/services"
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors ${
                isActive("/admin/services")
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-foreground hover:bg-surface-2 hover:text-primary"
              }`}
            >
              <Wrench className="w-4 h-4 text-foreground-muted" />
              <span>{a.serviceManagement || "Hizmet Yönetimi"}</span>
            </Link>
          </div>

          {/* Operations & CRM */}
          <div className="space-y-1">
            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-foreground-muted">
              {a.operations || "Operasyon & Müşteri"}
            </div>
            <Link
              href="/admin/quotes"
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors ${
                isActive("/admin/quotes")
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-foreground hover:bg-surface-2 hover:text-primary"
              }`}
            >
              <FileText className="w-4 h-4 text-foreground-muted" />
              <span>{a.quoteRequests || "Teklif Talepleri"}</span>
            </Link>
            <Link
              href="/admin/messages"
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors ${
                isActive("/admin/messages")
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-foreground hover:bg-surface-2 hover:text-primary"
              }`}
            >
              <MessageSquare className="w-4 h-4 text-foreground-muted" />
              <span>{a.contactMessages || "İletişim Mesajları"}</span>
            </Link>
            <Link
              href="/admin/references"
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors ${
                isActive("/admin/references")
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-foreground hover:bg-surface-2 hover:text-primary"
              }`}
            >
              <Award className="w-4 h-4 text-foreground-muted" />
              <span>{a.references || "Referans Yönetimi"}</span>
            </Link>
            <Link
              href="/admin/catalogs"
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors ${
                isActive("/admin/catalogs")
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-foreground hover:bg-surface-2 hover:text-primary"
              }`}
            >
              <FileDown className="w-4 h-4 text-foreground-muted" />
              <span>{a.catalogs || "Katalog & Şartnameler"}</span>
            </Link>
          </div>

          {/* Content & System */}
          <div className="space-y-1">
            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-foreground-muted">
              {a.contentSettings || "İçerik & Ayarlar"}
            </div>
            <Link
              href="/admin/faqs"
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors ${
                isActive("/admin/faqs")
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-foreground hover:bg-surface-2 hover:text-primary"
              }`}
            >
              <HelpCircle className="w-4 h-4 text-foreground-muted" />
              <span>{a.faqs || "Sıkça Sorulan Sorular"}</span>
            </Link>
            <Link
              href="/admin/media"
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors ${
                isActive("/admin/media")
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-foreground hover:bg-surface-2 hover:text-primary"
              }`}
            >
              <Image className="w-4 h-4 text-foreground-muted" />
              <span>{a.media || "Medya Kütüphanesi"}</span>
            </Link>
            <Link
              href="/admin/analytics"
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors ${
                isActive("/admin/analytics")
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-foreground hover:bg-surface-2 hover:text-primary"
              }`}
            >
              <BarChart3 className="w-4 h-4 text-foreground-muted" />
              <span>{a.analytics || "Ziyaretçi Analitiği"}</span>
            </Link>
            <Link
              href="/admin/search-analytics"
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors ${
                isActive("/admin/search-analytics")
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-foreground hover:bg-surface-2 hover:text-primary"
              }`}
            >
              <Search className="w-4 h-4 text-foreground-muted" />
              <span>{a.searchAnalytics || "Arama Analitiği"}</span>
            </Link>
            <Link
              href="/admin/translations"
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors ${
                isActive("/admin/translations")
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-foreground hover:bg-surface-2 hover:text-primary"
              }`}
            >
              <Languages className="w-4 h-4 text-foreground-muted" />
              <span>{a.translations || "Çoklu Dil Durumu"}</span>
            </Link>
            <Link
              href="/admin/audit-logs"
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors ${
                isActive("/admin/audit-logs")
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-foreground hover:bg-surface-2 hover:text-primary"
              }`}
            >
              <History className="w-4 h-4 text-foreground-muted" />
              <span>{a.auditLogs || "Denetim & İşlem Günlüğü"}</span>
            </Link>
            <Link
              href="/admin/settings"
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors ${
                isActive("/admin/settings")
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-foreground hover:bg-surface-2 hover:text-primary"
              }`}
            >
              <Settings className="w-4 h-4 text-foreground-muted" />
              <span>{a.settings || "Sistem Ayarları"}</span>
            </Link>
          </div>
        </nav>
      </div>

      {/* User Footer */}
      <div className="p-4 border-t border-border bg-surface-2/30 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
              {user.name?.[0] || user.email[0].toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-semibold text-foreground truncate">
                {user.name || "Yönetici"}
              </div>
              <div className="text-[10px] text-foreground-muted truncate">
                {user.email}
              </div>
            </div>
          </div>
          <AdminLogoutButton />
        </div>

        <Link
          href={`/${locale}`}
          target="_blank"
          className="flex items-center justify-center gap-1.5 w-full py-1.5 rounded-lg bg-surface hover:bg-surface-2 border border-border text-[11px] font-medium text-foreground-muted hover:text-foreground transition-colors"
        >
          <span>Web Sitesini Görüntüle</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </aside>
  );
}
