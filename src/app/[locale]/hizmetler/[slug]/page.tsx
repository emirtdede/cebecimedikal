import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Wrench,
  ShieldCheck,
  Cpu,
  Briefcase,
  ChevronRight,
  CheckCircle2,
  Phone,
  FileText,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Locale, LOCALES, isValidLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { getServiceBySlug, getServices, getSiteSettings } from "@/lib/data";
import { SERVICE_SLUG_MAP } from "@/lib/routes";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const services = await getServices();
  const params: { locale: string; slug: string }[] = [];
  for (const locale of LOCALES) {
    for (const service of services) {
      params.push({ locale, slug: service.slug });
    }
    // Also include English/international alias slugs for 100% route coverage
    params.push({ locale, slug: "technical-service" });
    params.push({ locale, slug: "preventive-maintenance" });
    params.push({ locale, slug: "installation-commissioning" });
    params.push({ locale, slug: "biomedical-consulting" });
    params.push({ locale, slug: "wartung-reparatur" });
    params.push({ locale, slug: "praeventive-wartung" });
    params.push({ locale, slug: "montage-inbetriebnahme" });
    params.push({ locale, slug: "biomedizinische-beratung" });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const currentLocale = isValidLocale(locale) ? (locale as Locale) : "tr";
  const canonicalSlug = SERVICE_SLUG_MAP[slug] || slug;
  const service = await getServiceBySlug(canonicalSlug, currentLocale);

  if (!service) {
    return { title: "Hizmet Bulunamadı | Cebeci Medikal" };
  }

  return {
    title: service.title,
    description: service.shortDescription,
  };
}

const SERVICE_ICONS: Record<string, any> = {
  "teknik-servis": Wrench,
  "periyodik-koruyucu-bakim": ShieldCheck,
  "kurulum-devreye-alma": Cpu,
  "teknik-danismanlik": Briefcase,
};

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

  const currentLocale = locale as Locale;
  const dict = getDictionary(currentLocale);
  const canonicalSlug = SERVICE_SLUG_MAP[slug] || slug;
  const [service, settings] = await Promise.all([
    getServiceBySlug(canonicalSlug, currentLocale),
    getSiteSettings(),
  ]);

  if (!service) notFound();

  const IconComp = SERVICE_ICONS[service.slug] || Wrench;
  const primaryPhone = settings.phone_primary || "+90 506 606 15 40";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-16">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-foreground-muted flex-wrap">
        <Link href={`/${currentLocale}`} className="hover:text-primary transition-colors">
          {dict.nav.home}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/${currentLocale}/hizmetler`} className="hover:text-primary transition-colors">
          {dict.nav.services}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground-muted truncate max-w-xs">{service.title}</span>
      </nav>

      {/* Service Hero Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-8 space-y-6">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-foreground leading-tight">
            {service.title}
          </h1>

          <p className="text-base sm:text-lg text-foreground-muted leading-relaxed">
            {service.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href={`/${currentLocale}/teklif?hizmet=${encodeURIComponent(service.slug)}&baslik=${encodeURIComponent(service.title)}`}
              className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-bold shadow-lg shadow-primary/25 transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>{dict.services.requestService || "Servis Talebi Oluştur"}</span>
            </Link>

            <a
              href={`tel:${primaryPhone.replace(/\s+/g, "")}`}
              className="px-6 py-3.5 rounded-xl bg-surface-2 hover:bg-surface border border-border text-foreground text-sm font-semibold transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-primary" />
              <span>{primaryPhone}</span>
            </a>
          </div>
        </div>

        {/* Right Info Box */}
        <div className="lg:col-span-4 p-8 rounded-3xl bg-surface border border-border shadow-xl space-y-6">
          <h2 className="text-base font-bold text-foreground">
            {dict.services.supportBadge || "7/24 Biyomedikal Destek"}
          </h2>
          <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
            {dict.services.supportDesc || "Hastaneler ve kritik sağlık birimlerindeki arıza bildirimleri için acil teknik ekibimiz hızlı müdahale sağlamaktadır."}
          </p>
          <div className="p-4 rounded-xl bg-surface-2 border border-border space-y-2 text-xs">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <Clock className="w-4 h-4 text-primary" />
              <span>{dict.services.responseTimeTitle || "Hızlı Müdahale Süresi"}</span>
            </div>
            <div className="text-foreground-muted">
              {dict.services.responseTimeDesc || "Ankara içi aynı gün yerinde inceleme ve arıza tespiti."}
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      {service.details?.features && service.details.features.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-border">
          <h2 className="font-serif text-2xl font-bold text-foreground">
            {dict.services.scopeTitle || "Hizmet Kapsamı ve Öne Çıkan Özellikler"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.details.features.map((feat, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-surface border border-border space-y-3">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                <div className="text-sm font-bold text-foreground">{feat}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Workflow Process */}
      {service.details?.workflow && service.details.workflow.length > 0 && (
        <div className="p-8 sm:p-12 rounded-3xl bg-surface-2/40 border border-border space-y-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground text-center">
            {dict.services.workflowTitle || "Adım Adım Süreç İşleyişi"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 pt-4">
            {service.details.workflow.map((step, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-surface border border-border space-y-3 relative">
                <div className="w-8 h-8 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </div>
                <div className="text-sm font-bold text-foreground">{step}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
