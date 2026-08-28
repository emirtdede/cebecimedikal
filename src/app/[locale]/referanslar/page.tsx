import Link from "next/link";
import { notFound } from "next/navigation";
import { Award, Star, ShieldCheck, FileText, ArrowRight } from "lucide-react";
import { Locale, isValidLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { getReferences } from "@/lib/data";
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
    title: dict.references.pageTitle,
    description: dict.references.pageSubtitle,
  };
}

export default async function ReferencesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const currentLocale = locale as Locale;
  const dict = getDictionary(currentLocale);
  const references = await getReferences(currentLocale);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-16">
      {/* Page Header */}
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
          <Award className="w-3.5 h-3.5" />
          <span>{dict.nav.references}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-foreground">
          {dict.references.pageTitle}
        </h1>
        <p className="text-base sm:text-lg text-foreground-muted leading-relaxed">
          {dict.references.pageSubtitle}
        </p>
      </div>

      {/* References Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {references.map((ref) => (
          <div
            key={ref.id}
            className="p-8 rounded-3xl bg-surface border border-border hover:border-primary/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(ref.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-foreground-muted italic leading-relaxed">
                &ldquo;{ref.quote}&rdquo;
              </p>
            </div>

            <div className="pt-6 border-t border-border space-y-1">
              <div className="text-base font-bold text-foreground">
                {ref.companyName}
              </div>
              {ref.clientName && (
                <div className="text-xs text-foreground font-medium">
                  {ref.clientName} {ref.position ? `— ${ref.position}` : ""}
                </div>
              )}
              {ref.serviceScope && (
                <div className="text-xs font-semibold text-primary">
                  {ref.serviceScope}
                </div>
              )}
              <div className="text-[11px] text-foreground-muted">
                {ref.sector} • {ref.city}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="p-8 sm:p-12 rounded-3xl bg-surface-2/60 border border-border text-center max-w-3xl mx-auto space-y-4">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
          {dict.references.ctaTitle}
        </h2>
        <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
          {dict.references.ctaSubtitle}
        </p>
        <div className="pt-2">
          <Link
            href={`/${currentLocale}/teklif`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-bold shadow-md transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>{dict.nav.requestQuote}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
