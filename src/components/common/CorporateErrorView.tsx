"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Home,
  ArrowLeft,
  RotateCcw,
  Search,
  Phone,
  MessageCircle,
  FileText,
  AlertTriangle,
  ShieldAlert,
  ServerCrash,
  Clock,
  HelpCircle,
  ChevronRight,
  Activity,
  Layers,
} from "lucide-react";

export interface CorporateErrorProps {
  statusCode: 400 | 401 | 403 | 404 | 500 | 503;
  locale?: string;
  customTitle?: string;
  customDescription?: string;
  errorDigest?: string;
  onRetry?: () => void;
}

const ERROR_CONFIG: Record<
  number,
  {
    badge: string;
    title: string;
    description: string;
    icon: any;
    colorClass: string;
    bgGlow: string;
  }
> = {
  400: {
    badge: "Geçersiz İstek / Bad Request",
    title: "İstek Formatı Doğrulanamadı",
    description:
      "Gönderilen parametreler veya form verileri sistemimiz tarafından işlenemedi. Lütfen bilgilerinizi kontrol edip tekrar deneyin.",
    icon: AlertTriangle,
    colorClass: "text-amber-500",
    bgGlow: "bg-amber-500/10",
  },
  401: {
    badge: "Yetkilendirme Gerekli / Unauthorized",
    title: "Oturum Doğrulaması Gerekli",
    description:
      "Bu sayfaya veya yönetim paneline erişmek için yetkili kullanıcı girişi yapmanız gerekmektedir.",
    icon: ShieldAlert,
    colorClass: "text-amber-500",
    bgGlow: "bg-amber-500/10",
  },
  403: {
    badge: "Erişim Kısıtlandı / 403 Forbidden",
    title: "Bu Alana Erişim Yetkiniz Bulunmuyor",
    description:
      "Güvenlik politikalarımız gereği talep ettiğiniz kaynağa erişim engellendi. Yetkiniz olduğunu düşünüyorsanız sistem yöneticisiyle iletişime geçin.",
    icon: ShieldAlert,
    colorClass: "text-rose-500",
    bgGlow: "bg-rose-500/10",
  },
  404: {
    badge: "Sayfa Kaydı Bulunamadı / 404 Not Found",
    title: "Aradığınız Sayfa Mevcut Değil",
    description:
      "Ulaşmaya çalıştığınız sayfa taşınmış, adı güncellenmiş veya yayından kaldırılmış olabilir. Aşağıdaki hızlı bağlantılardan aradığınız bölüme ulaşabilirsiniz.",
    icon: HelpCircle,
    colorClass: "text-primary",
    bgGlow: "bg-primary/10",
  },
  500: {
    badge: "Kritik Sunucu Hatası / 500 Server Error",
    title: "Biyomedikal Sistem Yanıt Vermedi",
    description:
      "İşleminiz gerçekleştirilirken sunucu tarafında beklenmeyen bir kesinti meydana geldi. Teknik ekibimiz otomatik olarak bilgilendirildi.",
    icon: ServerCrash,
    colorClass: "text-rose-500",
    bgGlow: "bg-rose-500/10",
  },
  503: {
    badge: "Planlı Bakım & Güncelleme / 503 Maintenance",
    title: "Sistemlerimiz Şu Anda Bakımda",
    description:
      "Daha yüksek güvenlik ve kesintisiz performans sağlamak amacıyla planlı altyapı iyileştirmesi yapılmaktadır. Kısa süre içinde tekrar yayında olacağız.",
    icon: Clock,
    colorClass: "text-primary",
    bgGlow: "bg-primary/10",
  },
};

export function CorporateErrorView({
  statusCode,
  locale = "tr",
  customTitle,
  customDescription,
  errorDigest,
  onRetry,
}: CorporateErrorProps) {
  const router = useRouter();
  const config = ERROR_CONFIG[statusCode] || ERROR_CONFIG[500];
  const IconComponent = config.icon;
  const incidentRef = errorDigest || `REF-${statusCode}-${Date.now().toString(36).toUpperCase()}`;

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 sm:py-24 relative overflow-hidden">
      {/* Background Decorative Ambient Glow & Medical Grid */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] ${config.bgGlow} rounded-full blur-[140px] pointer-events-none`}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#24404b10_1px,transparent_1px),linear-gradient(to_bottom,#24404b10_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl w-full text-center space-y-8 animate-modal">
        {/* Error Code & Medical Pulse Badge */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-border text-foreground-muted text-xs font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <IconComponent className={`w-3.5 h-3.5 ${config.colorClass}`} />
            <span>{config.badge}</span>
          </div>

          <div className="font-serif text-6xl sm:text-8xl font-black text-foreground tracking-tight select-none">
            {statusCode}
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground max-w-xl mx-auto leading-tight">
            {customTitle || config.title}
          </h1>

          <p className="text-sm sm:text-base text-foreground-muted max-w-lg mx-auto leading-relaxed">
            {customDescription || config.description}
          </p>
        </div>

        {/* Action Buttons Hub */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {onRetry ? (
            <button
              type="button"
              onClick={onRetry}
              className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Yeniden Dene</span>
            </button>
          ) : (
            <Link
              href={`/${locale}`}
              className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Ana Sayfaya Dön</span>
            </Link>
          )}

          <button
            type="button"
            onClick={() => router.back()}
            className="px-5 py-3 rounded-xl bg-surface hover:bg-surface-2 border border-border text-foreground text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-foreground-muted" />
            <span>Önceki Sayfa</span>
          </button>

          <Link
            href={`/${locale}/iletisim`}
            className="px-5 py-3 rounded-xl bg-surface hover:bg-surface-2 border border-border text-foreground text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-sm"
          >
            <Phone className="w-4 h-4 text-primary" />
            <span>Teknik Destek</span>
          </Link>
        </div>

        {/* Helpful Shortcut Cards */}
        <div className="pt-6 border-t border-border/80">
          <div className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-4">
            Popüler ve Hızlı Erişim Bölümleri
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            <Link
              href={`/${locale}/urunler`}
              className="p-3.5 rounded-xl bg-surface border border-border hover:border-primary/40 transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                    Tıbbi Cihazlar
                  </div>
                  <div className="text-[10px] text-foreground-muted">Ürün Kataloğu</div>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-foreground-muted group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href={`/${locale}/urunler?durum=SECOND_HAND`}
              className="p-3.5 rounded-xl bg-surface border border-border hover:border-primary/40 transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                    2. El Ekipman
                  </div>
                  <div className="text-[10px] text-foreground-muted">Garantili Revizyon</div>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-foreground-muted group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href={`/${locale}/hizmetler/teknik-servis`}
              className="p-3.5 rounded-xl bg-surface border border-border hover:border-primary/40 transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                    Teknik Servis
                  </div>
                  <div className="text-[10px] text-foreground-muted">Arıza & Bakım</div>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-foreground-muted group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Technical Incident Reference Footer */}
        <div className="text-[11px] text-foreground-muted font-mono pt-2">
          Hata Olay Kimliği: <span className="text-foreground select-all font-bold">{incidentRef}</span> • Cebeci Medikal Biyomedikal Güvenlik Protokolü
        </div>
      </div>
    </div>
  );
}
