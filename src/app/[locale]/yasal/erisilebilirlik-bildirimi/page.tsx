import { notFound } from "next/navigation";
import { Eye, CheckCircle2, AlertCircle } from "lucide-react";
import { Locale, isValidLocale } from "@/lib/i18n";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { getLegalDocument } from "@/lib/legal-data";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = isValidLocale(locale) ? (locale as Locale) : "tr";
  const doc = getLegalDocument("erisilebilirlik-bildirimi", currentLocale);

  return {
    title: doc?.metaTitle || "Erişilebilirlik Bildirimi | Cebeci Medikal",
    description: doc?.metaDescription || "Cebeci Medikal erişilebilirlik bildirimi.",
  };
}

export default async function AccessibilityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const currentLocale = locale as Locale;
  const doc = getLegalDocument("erisilebilirlik-bildirimi", currentLocale);

  if (!doc) notFound();

  return (
    <LegalLayout
      locale={currentLocale}
      activeSlug="erisilebilirlik-bildirimi"
      badge={doc.badge}
      icon={Eye}
      title={doc.title}
      subtitle={doc.subtitle}
      documentCode="CBM-ACC-2026.01"
      lastUpdated={doc.effectiveDate}
    >
      {doc.importantNotice && (
        <div className="p-5 rounded-2xl bg-primary/10 border border-primary/20 text-foreground flex items-start gap-3">
          <Eye className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm leading-relaxed">
            {doc.importantNotice}
          </div>
        </div>
      )}

      {doc.sections.map((section, idx) => (
        <section key={idx} className="space-y-3">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-surface-2 text-primary font-serif font-bold text-sm flex items-center justify-center border border-border">
              {idx + 1}
            </span>
            <span>{section.title}</span>
          </h2>
          <p>{section.content}</p>
          {section.points && (
            <ul className="space-y-2 mt-3 list-none pl-0">
              {section.points.map((pt, pIdx) => (
                <li key={pIdx} className="flex items-start gap-2 text-xs sm:text-sm bg-surface-2/40 p-3 rounded-xl border border-border/60">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          )}
          {section.notice && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{section.notice}</span>
            </div>
          )}
        </section>
      ))}
    </LegalLayout>
  );
}
