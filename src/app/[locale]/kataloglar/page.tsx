import Link from "next/link";
import { notFound } from "next/navigation";
import { FileText, Download, ShieldCheck, ArrowRight } from "lucide-react";
import { Locale, isValidLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { getCatalogs } from "@/lib/data";
import { CatalogDownloadButton } from "@/features/catalogs/CatalogDownloadButton";
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
    title: dict.catalogs.pageTitle,
    description: dict.catalogs.pageSubtitle,
  };
}

export default async function CatalogsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const currentLocale = locale as Locale;
  const dict = getDictionary(currentLocale);
  const catalogs = await getCatalogs(currentLocale);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-16">
      {/* Page Header */}
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
          <FileText className="w-3.5 h-3.5" />
          <span>{dict.nav.catalogs}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-foreground">
          {dict.catalogs.pageTitle}
        </h1>
        <p className="text-base sm:text-lg text-foreground-muted leading-relaxed">
          {dict.catalogs.pageSubtitle}
        </p>
      </div>

      {/* Catalogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {catalogs.map((cat) => (
          <div
            key={cat.id}
            className="p-8 rounded-3xl bg-surface border border-border hover:border-primary/40 transition-all duration-300 shadow-sm flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  {cat.category}
                </span>
                <span className="text-xs font-medium text-foreground-muted">
                  Boyut: {cat.fileSize}
                </span>
              </div>

              <h2 className="font-serif text-2xl font-bold text-foreground">
                {cat.title}
              </h2>

              <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                {cat.description}
              </p>
            </div>

            <div className="pt-6 border-t border-border">
              <CatalogDownloadButton
                catalogId={cat.id}
                fileUrl={cat.fileUrl}
                title={cat.title}
                initialCount={cat.downloadCount}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
