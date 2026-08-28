"use client";

import Link from "next/link";
import { useRouter, usePathname, useParams } from "next/navigation";
import {
  Home,
  ArrowLeft,
  RotateCcw,
  Phone,
  AlertTriangle,
  ShieldAlert,
  ServerCrash,
  Clock,
  HelpCircle,
  ChevronRight,
  Activity,
  Layers,
  FileText,
} from "lucide-react";
import { DEFAULT_LOCALE, isValidLocale } from "@/lib/i18n";

export interface CorporateErrorProps {
  statusCode: 400 | 401 | 403 | 404 | 500 | 503;
  locale?: string;
  customTitle?: string;
  customDescription?: string;
  errorDigest?: string;
  onRetry?: () => void;
}

interface ErrorContent {
  badge: string;
  title: string;
  description: string;
}

interface ErrorLocaleDict {
  400: ErrorContent;
  401: ErrorContent;
  403: ErrorContent;
  404: ErrorContent;
  500: ErrorContent;
  503: ErrorContent;
  retry: string;
  backHome: string;
  prevPage: string;
  support: string;
  quickLinksTitle: string;
  devicesCardTitle: string;
  devicesCardDesc: string;
  secondHandCardTitle: string;
  secondHandCardDesc: string;
  serviceCardTitle: string;
  serviceCardDesc: string;
  incidentPrefix: string;
  incidentSuffix: string;
}

const ERROR_TRANSLATIONS: Record<string, ErrorLocaleDict> = {
  tr: {
    400: {
      badge: "Geçersiz İstek / Bad Request",
      title: "İstek Formatı Doğrulanamadı",
      description:
        "Gönderilen parametreler veya form verileri sistemimiz tarafından işlenemedi. Lütfen bilgilerinizi kontrol edip tekrar deneyin.",
    },
    401: {
      badge: "Yetkilendirme Gerekli / Unauthorized",
      title: "Oturum Doğrulaması Gerekli",
      description:
        "Bu sayfaya veya yönetim paneline erişmek için yetkili kullanıcı girişi yapmanız gerekmektedir.",
    },
    403: {
      badge: "Erişim Kısıtlandı / 403 Forbidden",
      title: "Bu Alana Erişim Yetkiniz Bulunmuyor",
      description:
        "Güvenlik politikalarımız gereği talep ettiğiniz kaynağa erişim engellendi. Yetkiniz olduğunu düşünüyorsanız sistem yöneticisiyle iletişime geçin.",
    },
    404: {
      badge: "Sayfa Kaydı Bulunamadı / 404 Not Found",
      title: "Aradığınız Sayfa Mevcut Değil",
      description:
        "Ulaşmaya çalıştığınız sayfa taşınmış, adı güncellenmiş veya yayından kaldırılmış olabilir. Aşağıdaki hızlı bağlantılardan aradığınız bölüme ulaşabilirsiniz.",
    },
    500: {
      badge: "Kritik Sunucu Hatası / 500 Server Error",
      title: "Biyomedikal Sistem Yanıt Vermedi",
      description:
        "İşleminiz gerçekleştirilirken sunucu tarafında beklenmeyen bir kesinti meydana geldi. Teknik ekibimiz otomatik olarak bilgilendirildi.",
    },
    503: {
      badge: "Planlı Bakım & Güncelleme / 503 Maintenance",
      title: "Sistemlerimiz Şu Anda Bakımda",
      description:
        "Daha yüksek güvenlik ve kesintisiz performans sağlamak amacıyla planlı altyapı iyileştirmesi yapılmaktadır. Kısa süre içinde tekrar yayında olacağız.",
    },
    retry: "Yeniden Dene",
    backHome: "Ana Sayfaya Dön",
    prevPage: "Önceki Sayfa",
    support: "Teknik Destek",
    quickLinksTitle: "Popüler ve Hızlı Erişim Bölümleri",
    devicesCardTitle: "Tıbbi Cihazlar",
    devicesCardDesc: "Ürün Kataloğu",
    secondHandCardTitle: "2. El Ekipman",
    secondHandCardDesc: "Garantili Revizyon",
    serviceCardTitle: "Teknik Servis",
    serviceCardDesc: "Arıza & Bakım",
    incidentPrefix: "Hata Olay Kimliği:",
    incidentSuffix: "Cebeci Medikal Biyomedikal Güvenlik Protokolü",
  },
  en: {
    400: {
      badge: "Bad Request",
      title: "Invalid Request Format",
      description:
        "The submitted parameters or form data could not be processed. Please verify your information and try again.",
    },
    401: {
      badge: "Unauthorized Access",
      title: "Authentication Required",
      description:
        "You must be signed in with an authorized administrator account to access this section.",
    },
    403: {
      badge: "Access Forbidden",
      title: "Access Restricted",
      description:
        "Access to the requested resource is denied based on medical security policies.",
    },
    404: {
      badge: "Page Not Found",
      title: "The Page You Requested Does Not Exist",
      description:
        "The page you are looking for might have been moved, renamed, or is temporarily unavailable. You can explore our catalog or get in touch with our team.",
    },
    500: {
      badge: "Internal Server Error",
      title: "Biomedical Server Unresponsive",
      description:
        "An unexpected system error occurred while processing your request. Our technical team has been notified.",
    },
    503: {
      badge: "Scheduled Maintenance",
      title: "System Currently Under Maintenance",
      description:
        "We are performing scheduled maintenance and performance upgrades. We will be back online shortly.",
    },
    retry: "Retry Again",
    backHome: "Back to Home",
    prevPage: "Previous Page",
    support: "Technical Support",
    quickLinksTitle: "Quick Navigation & Popular Sections",
    devicesCardTitle: "Medical Devices",
    devicesCardDesc: "Product Catalog",
    secondHandCardTitle: "Refurbished Equipment",
    secondHandCardDesc: "Certified & Tested",
    serviceCardTitle: "Technical Service",
    serviceCardDesc: "Maintenance & Repair",
    incidentPrefix: "Incident Reference:",
    incidentSuffix: "Cebeci Medikal Biomedical Protocol",
  },
  de: {
    400: {
      badge: "Ungültige Anfrage",
      title: "Anfrageformat konnte nicht verifiziert werden",
      description:
        "Die übermittelten Parameter konnten nicht verarbeitet werden. Bitte prüfen Sie Ihre Angaben.",
    },
    401: {
      badge: "Authentifizierung Erforderlich",
      title: "Anmeldung Erforderlich",
      description:
        "Für den Zugriff auf diesen Bereich ist eine autorisierte Anmeldung erforderlich.",
    },
    403: {
      badge: "Zugriff Verweigert",
      title: "Zugriff auf diesen Bereich eingeschränkt",
      description:
        "Aus Sicherheitsgründen wurde der Zugriff auf die angeforderte Ressource blockiert.",
    },
    404: {
      badge: "Seite Nicht Gefunden",
      title: "Die gewünschte Seite existiert nicht",
      description:
        "Die aufgerufene Seite wurde verschoben, umbenannt oder entfernt. Nutzen Sie die folgenden Links zur Navigation.",
    },
    500: {
      badge: "Interner Serverfehler",
      title: "Biomedizinisches System antwortet nicht",
      description:
        "Ein unerwarteter Serverfehler ist aufgetreten. Unser Technik-Team wurde automatisch benachrichtigt.",
    },
    503: {
      badge: "Geplante Wartung",
      title: "System befindet sich in Wartung",
      description:
        "Wir führen geplante Infrastrukturverbesserungen durch. Die Plattform steht in Kürze wieder zur Verfügung.",
    },
    retry: "Erneut Versuchen",
    backHome: "Zur Startseite",
    prevPage: "Vorherige Seite",
    support: "Technischer Support",
    quickLinksTitle: "Beliebte Bereiche & Schnellzugriff",
    devicesCardTitle: "Medizingeräte",
    devicesCardDesc: "Produktkatalog",
    secondHandCardTitle: "Gebrauchtgeräte",
    secondHandCardDesc: "Geprüft & Zertifiziert",
    serviceCardTitle: "Technischer Service",
    serviceCardDesc: "Wartung & Reparatur",
    incidentPrefix: "Fehler-ID:",
    incidentSuffix: "Cebeci Medikal Sicherheitsprotokoll",
  },
  ar: {
    400: {
      badge: "طلب غير صالح",
      title: "تعذر التحقق من تنسيق الطلب",
      description:
        "تعذر على النظام معالجة البيانات المدخلة. يرجى التحقق من صحة المعلومات وإعادة المحاولة.",
    },
    401: {
      badge: "مطلوب مصادقة",
      title: "تسجيل الدخول مطلوب",
      description:
        "يجب تسجيل الدخول بحساب معتمد للوصول إلى هذه الصفحة أو لوحة التحكم.",
    },
    403: {
      badge: "تم رفض الوصول",
      title: "لا تملك الصلاحية للدخول",
      description:
        "تم حظر الوصول إلى المورد المطلوب وفقاً لسياسات الأمان الطبية المعتمدة.",
    },
    404: {
      badge: "الصفحة غير موجودة",
      title: "الصفحة المطلوبة غير متوفرة",
      description:
        "ربما تم نقل الصفحة أو تغيير اسمها أو إزالتها. يمكنك استخدام الروابط السريعة أدناه للوصول إلى أقسام الموقع.",
    },
    500: {
      badge: "خطأ خادم داخلي",
      title: "النظام الطبي الحيوي لا يستجيب",
      description:
        "حدث خطأ غير متوقع أثناء معالجة طلبك. تم إخطار فريقنا الهندسي والتقني تلقائياً.",
    },
    503: {
      badge: "صيانة مجدولة",
      title: "الأنظمة تخضع للصيانة حالياً",
      description:
        "نقوم بإجراء تحسينات مجدولة على البنية التحتية لتحسين الأداء والأمان. سنعود للعمل قريباً.",
    },
    retry: "إعادة المحاولة",
    backHome: "العودة للرئيسية",
    prevPage: "الصفحة السابقة",
    support: "الدعم الفني",
    quickLinksTitle: "الأقسام الشائعة والوصول السريع",
    devicesCardTitle: "الأجهزة الطبية",
    devicesCardDesc: "كتالوج المنتجات",
    secondHandCardTitle: "المعدات المجددة",
    secondHandCardDesc: "فحص وضمان شامل",
    serviceCardTitle: "الخدمات الفنية",
    serviceCardDesc: "الصيانة والإصلاح",
    incidentPrefix: "معرف الحادثة:",
    incidentSuffix: "بروتوكول الأمان الطبي لشركة جبجي ميديكال",
  },
  ja: {
    400: {
      badge: "無効なリクエスト",
      title: "リクエスト形式を検証できませんでした",
      description:
        "送信されたパラメータを処理できませんでした。入力内容をご確認の上、再度お試しください。",
    },
    401: {
      badge: "認証が必要",
      title: "ログインが必要です",
      description:
        "このページにアクセスするには、管理者権限によるログインが必要です。",
    },
    403: {
      badge: "アクセス拒否",
      title: "アクセス権限がありません",
      description:
        "セキュリティポリシーに基づき、要求されたリソースへのアクセスが制限されています。",
    },
    404: {
      badge: "ページが見つかりません",
      title: "お探しのページは存在しません",
      description:
        "アクセスしようとしたページは移動または削除された可能性があります。以下のリンクから各ページへアクセスしてください。",
    },
    500: {
      badge: "サーバーエラー",
      title: "バイオメディカルシステムが応答しません",
      description:
        "処理中に予期しないエラーが発生しました。技術チームに自動的に通知されました。",
    },
    503: {
      badge: "定期メンテナンス",
      title: "現在システムメンテナンス中です",
      description:
        "システムの安定性とセキュリティ向上のため、定期メンテナンスを実施しています。まもなく再開いたします。",
    },
    retry: "再試行",
    backHome: "ホームに戻る",
    prevPage: "前のページ",
    support: "技術サポート",
    quickLinksTitle: "主要セクション",
    devicesCardTitle: "医療機器一覧",
    devicesCardDesc: "製品カタログ",
    secondHandCardTitle: "認定中古機器",
    secondHandCardDesc: "オーバーホール・点検済",
    serviceCardTitle: "技術サービス",
    serviceCardDesc: "修理・定期保守",
    incidentPrefix: "インシデントID:",
    incidentSuffix: "Cebeci Medikal セキュリティプロトコル",
  },
  zh: {
    400: {
      badge: "无效请求",
      title: "请求数据验证失败",
      description:
        "提交的参数或表单数据无法被系统正确处理，请核对信息后重试。",
    },
    401: {
      badge: "需要身份认证",
      title: "需要登录验证",
      description:
        "访问此管理区域或功能页面需要具备相应权限的用户登录。",
    },
    403: {
      badge: "拒绝访问",
      title: "无权访问此页面",
      description:
        "根据医疗系统安全策略，您请求的资源访问已被限制。",
    },
    404: {
      badge: "页面不存在",
      title: "您访问的页面不存在",
      description:
        "您访问的页面可能已被移动、更名或下线。您可以通过下方快速导航浏览其他专区。",
    },
    500: {
      badge: "服务器内部错误",
      title: "系统服务器未响应",
      description:
        "处理您的请求时发生意外中断，技术工程师团队已收到自动通知。",
    },
    503: {
      badge: "计划维护中",
      title: "系统正在进行升级维护",
      description:
        "为了提供更安全可靠的医疗数字化服务，系统正在进行升级维护，稍后将恢复运行。",
    },
    retry: "重试",
    backHome: "返回首页",
    prevPage: "上一页",
    support: "技术支持",
    quickLinksTitle: "常用快捷导航",
    devicesCardTitle: "医疗设备",
    devicesCardDesc: "全系列产品目录",
    secondHandCardTitle: "翻新二手设备",
    secondHandCardDesc: "官方认证与质保",
    serviceCardTitle: "技术服务",
    serviceCardDesc: "维保与抢修",
    incidentPrefix: "故障事件编号:",
    incidentSuffix: "塞贝吉医疗工程安全协议",
  },
};

const ERROR_VISUALS: Record<
  number,
  {
    icon: any;
    colorClass: string;
    bgGlow: string;
  }
> = {
  400: { icon: AlertTriangle, colorClass: "text-amber-500", bgGlow: "bg-amber-500/10" },
  401: { icon: ShieldAlert, colorClass: "text-amber-500", bgGlow: "bg-amber-500/10" },
  403: { icon: ShieldAlert, colorClass: "text-rose-500", bgGlow: "bg-rose-500/10" },
  404: { icon: HelpCircle, colorClass: "text-primary", bgGlow: "bg-primary/10" },
  500: { icon: ServerCrash, colorClass: "text-rose-500", bgGlow: "bg-rose-500/10" },
  503: { icon: Clock, colorClass: "text-primary", bgGlow: "bg-primary/10" },
};

export function CorporateErrorView({
  statusCode,
  locale,
  customTitle,
  customDescription,
  errorDigest,
  onRetry,
}: CorporateErrorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  // Determine active locale with fallbacks
  let activeLocale = locale;
  if (!activeLocale && params?.locale && typeof params.locale === "string") {
    activeLocale = params.locale;
  }
  if (!activeLocale && pathname) {
    const segment = pathname.split("/")[1];
    if (isValidLocale(segment)) {
      activeLocale = segment;
    }
  }
  if (!activeLocale || !isValidLocale(activeLocale)) {
    activeLocale = DEFAULT_LOCALE;
  }

  const t = ERROR_TRANSLATIONS[activeLocale] || ERROR_TRANSLATIONS.tr;
  const statusContent = t[statusCode] || t[500];
  const visual = ERROR_VISUALS[statusCode] || ERROR_VISUALS[500];
  const IconComponent = visual.icon;
  const incidentRef = errorDigest || `REF-${statusCode}-${Date.now().toString(36).toUpperCase()}`;

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 sm:py-24 relative overflow-hidden">
      {/* Background Decorative Ambient Glow & Medical Grid */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] ${visual.bgGlow} rounded-full blur-[140px] pointer-events-none`}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#24404b10_1px,transparent_1px),linear-gradient(to_bottom,#24404b10_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl w-full text-center space-y-8 animate-modal">
        {/* Error Code & Medical Pulse Badge */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-border text-foreground-muted text-xs font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <IconComponent className={`w-3.5 h-3.5 ${visual.colorClass}`} />
            <span>{statusContent.badge}</span>
          </div>

          <div className="font-serif text-6xl sm:text-8xl font-black text-foreground tracking-tight select-none">
            {statusCode}
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground max-w-xl mx-auto leading-tight">
            {customTitle || statusContent.title}
          </h1>

          <p className="text-sm sm:text-base text-foreground-muted max-w-lg mx-auto leading-relaxed">
            {customDescription || statusContent.description}
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
              <span>{t.retry}</span>
            </button>
          ) : (
            <Link
              href={`/${activeLocale}`}
              className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>{t.backHome}</span>
            </Link>
          )}

          <button
            type="button"
            onClick={() => router.back()}
            className="px-5 py-3 rounded-xl bg-surface hover:bg-surface-2 border border-border text-foreground text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-foreground-muted" />
            <span>{t.prevPage}</span>
          </button>

          <Link
            href={`/${activeLocale}/iletisim`}
            className="px-5 py-3 rounded-xl bg-surface hover:bg-surface-2 border border-border text-foreground text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-sm"
          >
            <Phone className="w-4 h-4 text-primary" />
            <span>{t.support}</span>
          </Link>
        </div>

        {/* Helpful Shortcut Cards */}
        <div className="pt-6 border-t border-border/80">
          <div className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-4">
            {t.quickLinksTitle}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            <Link
              href={`/${activeLocale}/urunler`}
              className="p-3.5 rounded-xl bg-surface border border-border hover:border-primary/40 transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                    {t.devicesCardTitle}
                  </div>
                  <div className="text-[10px] text-foreground-muted">{t.devicesCardDesc}</div>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-foreground-muted group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href={`/${activeLocale}/urunler?durum=SECOND_HAND`}
              className="p-3.5 rounded-xl bg-surface border border-border hover:border-primary/40 transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                    {t.secondHandCardTitle}
                  </div>
                  <div className="text-[10px] text-foreground-muted">{t.secondHandCardDesc}</div>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-foreground-muted group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href={`/${activeLocale}/hizmetler/teknik-servis`}
              className="p-3.5 rounded-xl bg-surface border border-border hover:border-primary/40 transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                    {t.serviceCardTitle}
                  </div>
                  <div className="text-[10px] text-foreground-muted">{t.serviceCardDesc}</div>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-foreground-muted group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Technical Incident Reference Footer */}
        <div className="text-[11px] text-foreground-muted font-mono pt-2">
          {t.incidentPrefix} <span className="text-foreground select-all font-bold">{incidentRef}</span> • {t.incidentSuffix}
        </div>
      </div>
    </div>
  );
}
