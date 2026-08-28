import Link from "next/link";
import { notFound } from "next/navigation";
import { Wrench, ShieldCheck, Cpu, Briefcase, ArrowRight, CheckCircle2, FileText } from "lucide-react";
import { Locale, isValidLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { getServices } from "@/lib/data";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = isValidLocale(locale) ? (locale as Locale) : "tr";
  const dict = getDictionary(currentLocale);

  return {
    title: dict.services.title,
    description: dict.services.subtitle,
  };
}

const SERVICE_ICONS: Record<string, any> = {
  "teknik-servis": Wrench,
  "periyodik-koruyucu-bakim": ShieldCheck,
  "kurulum-devreye-alma": Cpu,
  "teknik-danismanlik": Briefcase,
};

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const currentLocale = locale as Locale;
  const dict = getDictionary(currentLocale);
  const services = await getServices(currentLocale);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-16">
      {/* Page Header */}
      <div className="max-w-3xl space-y-3">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-foreground">
          {dict.services.heroTitle || dict.services.title}
        </h1>
        <p className="text-base sm:text-lg text-foreground-muted leading-relaxed">
          {dict.services.subtitle}
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service) => {
          const IconComp = SERVICE_ICONS[service.slug] || Wrench;
          return (
            <div
              key={service.id}
              className="p-8 rounded-3xl bg-surface border border-border hover:border-primary/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors flex items-center justify-center">
                  <IconComp className="w-7 h-7" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </h2>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {service.description}
                </p>

                {/* Features Pill list */}
                {service.details?.features && service.details.features.length > 0 && (
                  <div className="pt-2 space-y-2">
                    {service.details.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-border flex items-center justify-between">
                <Link
                  href={`/${currentLocale}/hizmetler/${service.slug}`}
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1.5"
                >
                  <span>{dict.services.learnMore}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href={`/${currentLocale}/teklif?konu=${encodeURIComponent(service.title)}`}
                  className="px-4 py-2 rounded-xl bg-surface-2 hover:bg-primary hover:text-white text-xs font-bold text-foreground border border-border transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{dict.services.requestService || "Servis Talebi"}</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
