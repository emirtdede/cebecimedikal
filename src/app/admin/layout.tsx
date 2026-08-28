import { redirect } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth";
import { AdminLanguageProvider } from "@/features/admin/AdminLanguageContext";
import { AdminSidebar } from "@/features/admin/AdminSidebar";
import { AdminLanguageSwitcher } from "@/features/admin/AdminLanguageSwitcher";
import { AdminLogoutButton } from "@/features/admin/AdminLogoutButton";
import { ToastProvider } from "@/components/ui/Toast";
import { ExternalLink } from "lucide-react";

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
    return (
      <AdminLanguageProvider>
        <ToastProvider>{children}</ToastProvider>
      </AdminLanguageProvider>
    );
  }

  return (
    <AdminLanguageProvider>
      <ToastProvider>
        <div className="min-h-screen flex bg-bg text-foreground">
        {/* Dynamic Multi-Language Sidebar */}
        <AdminSidebar user={user} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top bar for mobile and quick language switch */}
          <header className="border-b border-border bg-surface px-4 py-3 flex items-center justify-between">
            <Link href="/admin" className="font-serif text-base font-bold text-foreground md:hidden">
              CEBECİ YÖNETİM
            </Link>
            <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-foreground-muted">
              <span>Cebeci Medikal Biyomedikal Yönetim Sistemi</span>
            </div>
            <div className="flex items-center gap-3">
              <AdminLanguageSwitcher />
              <Link href="/tr" target="_blank" className="p-1.5 rounded-lg border border-border bg-surface hover:bg-surface-2 text-foreground-muted hover:text-foreground text-xs font-semibold flex items-center gap-1">
                <span className="hidden sm:inline">Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <div className="md:hidden">
                <AdminLogoutButton />
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
            {children}
          </main>
        </div>
      </div>
      </ToastProvider>
    </AdminLanguageProvider>
  );
}
