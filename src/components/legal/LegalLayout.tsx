import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Cookie,
  Scale,
  AlertTriangle,
  Eye,
  ChevronRight,
  FileText,
  Building2,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";

export interface LegalLayoutProps {
  locale: Locale;
  activeSlug:
    | "kvkk-aydinlatma-metni"
    | "gizlilik-politikasi"
    | "cerez-politikasi"
    | "kullanim-kosullari"
    | "yasal-uyari"
    | "erisilebilirlik-bildirimi";
  title: string;
  subtitle: string;
  badge: string;
  icon: any;
  documentCode?: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

export function LegalLayout({
  locale,
  activeSlug,
  title,
  subtitle,
  badge,
  icon: IconComponent,
  documentCode = "CBM-LGL-2026.01",
  lastUpdated = "2026",
  children,
}: LegalLayoutProps) {
  const dict = getDictionary(locale);

  const LEGAL_NAV = [
    {
      slug: "kvkk-aydinlatma-metni",
      title: dict.legal?.kvkkTitle || "KVKK Aydınlatma Metni",
      desc: dict.legal?.kvkkDesc || "Kişisel Verilerin Korunması",
      icon: ShieldCheck,
    },
    {
      slug: "gizlilik-politikasi",
      title: dict.legal?.privacyTitle || "Gizlilik Politikası",
      desc: dict.legal?.privacyDesc || "Veri Güvenliği İlkeleri",
      icon: Lock,
    },
    {
      slug: "cerez-politikasi",
      title: dict.legal?.cookieTitle || "Çerez (Cookie) Politikası",
      desc: dict.legal?.cookieDesc || "Çerez Türleri & Yönetimi",
      icon: Cookie,
    },
    {
      slug: "kullanim-kosullari",
      title: dict.legal?.termsTitle || "Kullanım Koşulları",
      desc: dict.legal?.termsDesc || "Site Şartları & Sözleşme",
      icon: Scale,
    },
    {
      slug: "yasal-uyari",
      title: dict.legal?.disclaimerTitle || "Yasal Uyarı & Mevzuat",
      desc: dict.legal?.disclaimerDesc || "TİTCK & Tıbbi Cihaz Sorumlulukları",
      icon: AlertTriangle,
    },
    {
      slug: "erisilebilirlik-bildirimi",
      title: dict.legal?.accessibilityTitle || "Erişilebilirlik Bildirimi",
      desc: dict.legal?.accessibilityDesc || "WCAG 2.1 AA Standartları",
      icon: Eye,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-foreground-muted flex-wrap">
        <Link href={`/${locale}`} className="hover:text-primary transition-colors">
          {dict.nav.home}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
        <span className="text-foreground-muted">{dict.footer?.legal || "Yasal"}</span>
        <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
        <span className="text-primary font-medium">{title}</span>
      </nav>

      {/* Hero Header */}
      <div className="p-8 sm:p-10 rounded-3xl bg-surface border border-border relative overflow-hidden shadow-sm">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <IconComponent className="w-4 h-4 flex-shrink-0" />
            <span>{badge}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-foreground tracking-tight">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
            {subtitle}
          </p>

          {/* Meta Badges */}
          <div className="pt-3 flex flex-wrap items-center gap-3 text-xs text-foreground-muted">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-2 border border-border">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <span>{dict.legal?.effectiveDate || "Yürürlük:"} <strong className="text-foreground">{lastUpdated}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-2 border border-border">
              <FileText className="w-3.5 h-3.5 text-primary" />
              <span>Code: <strong className="text-foreground">{documentCode}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{dict.legal?.officialBadge || "Resmi & Güncel"}</span>
            </div>
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Grid: Sidebar + Document Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Sidebar Navigation */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          <div className="p-5 rounded-2xl bg-surface border border-border space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-foreground px-2">
              {dict.legal?.sidebarTitle || "Yasal Dokümanlar & Sözleşmeler"}
            </div>
            <div className="space-y-1">
              {LEGAL_NAV.map((navItem) => {
                const isActive = navItem.slug === activeSlug;
                const ItemIcon = navItem.icon;
                return (
                  <Link
                    key={navItem.slug}
                    href={`/${locale}/yasal/${navItem.slug}`}
                    className={`p-3 rounded-xl flex items-start gap-3 transition-all duration-200 ${
                      isActive
                        ? "bg-primary/10 text-primary border border-primary/30 font-semibold shadow-xs"
                        : "hover:bg-surface-2 text-foreground-muted hover:text-foreground border border-transparent"
                    }`}
                  >
                    <ItemIcon
                      className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                        isActive ? "text-primary" : "text-foreground-muted"
                      }`}
                    />
                    <div className="min-w-0">
                      <div className={`text-xs font-bold ${isActive ? "text-primary" : "text-foreground"}`}>
                        {navItem.title}
                      </div>
                      <div className="text-[11px] text-foreground-muted truncate">
                        {navItem.desc}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Data Controller Verified Box */}
          <div className="p-5 rounded-2xl bg-surface-2/60 border border-border space-y-3.5 text-xs text-foreground-muted">
            <div className="flex items-center gap-2 text-foreground font-bold text-xs uppercase tracking-wider">
              <Building2 className="w-4 h-4 text-primary" />
              <span>{dict.legal?.dataControllerTitle || "Veri Sorumlusu & Şirket Bilgileri"}</span>
            </div>
            <div className="space-y-2">
              <div>
                <div className="font-bold text-foreground">
                  Cebeci Tıbbi Cihazlar ve Medikal Hizmetleri Ltd. Şti.
                </div>
                <div className="text-[11px] text-primary">{dict.legal?.regulatoryBadge || "TSE HYB & TİTCK Kayıtlı"}</div>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                <span>{dict.contact?.addressText || "Fevzi Çakmak Mah. Cumhuriyet Bulvarı No: 83/A Sincan / Ankara"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <a href="mailto:cbcmedikal@gmail.com" className="hover:text-primary transition-colors">
                  cbcmedikal@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <span>+90 506 606 15 40 / +90 506 835 57 41</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-8 p-6 sm:p-10 rounded-3xl bg-surface border border-border shadow-sm space-y-8 text-foreground-muted text-sm sm:text-base leading-relaxed">
          {children}

          {/* Official Formal Application / Contact Footer Box */}
          <div className="p-6 rounded-2xl bg-surface-2/70 border border-border/80 space-y-3 mt-10">
            <h4 className="font-bold text-foreground text-sm sm:text-base flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>{dict.legal?.requestTitle || "Yasal Başvuru ve Bilgi Talebi"}</span>
            </h4>
            <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
              {dict.legal?.requestDesc || "Yasal haklarınızı kullanmak ve başvuru yapmak için cbcmedikal@gmail.com adresine iletebilirsiniz."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
