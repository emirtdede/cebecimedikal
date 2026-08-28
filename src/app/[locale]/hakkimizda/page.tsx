import Link from "next/link";
import { notFound } from "next/navigation";
import { Award, ShieldCheck, HeartPulse, CheckCircle2, ArrowRight } from "lucide-react";
import { Locale, isValidLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
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
    title: dict.nav.about,
    description: dict.brand.shortDescription,
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const currentLocale = locale as Locale;
  const dict = getDictionary(currentLocale);
  const currentYear = new Date().getFullYear();
  const experienceYears = Math.max(10, currentYear - 2015);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-20">
      {/* Page Header */}
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
          <Award className="w-3.5 h-3.5" />
          <span>{dict.about.badge}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-foreground">
          {dict.about.title}
        </h1>
        <p className="text-base sm:text-lg text-foreground-muted leading-relaxed">
          {dict.about.subtitle}
        </p>
      </div>

      {/* Main Corporate Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6 text-sm sm:text-base text-foreground-muted leading-relaxed">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
            {dict.about.storyTitle}
          </h2>
          <p>
            {dict.about.storyP1}
          </p>
          <p>
            {dict.about.storyP2}
          </p>
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Link
              href={`/${currentLocale}/teklif`}
              className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-bold shadow-md transition-colors"
            >
              {dict.nav.requestQuote}
            </Link>
            <Link
              href={`/${currentLocale}/iletisim`}
              className="px-6 py-3 rounded-xl bg-surface-2 hover:bg-surface border border-border text-foreground text-sm font-semibold transition-colors"
            >
              {dict.nav.contact}
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <div className="rounded-3xl overflow-hidden glass-panel border border-border p-2 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80"
              alt="Cebeci Medikal Kurumsal"
              className="w-full h-[360px] sm:h-[420px] object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-surface border border-border shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <HeartPulse className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-foreground">
            {dict.about.missionTitle}
          </h2>
          <p className="text-sm text-foreground-muted leading-relaxed">
            {dict.about.missionDesc}
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-surface border border-border shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-foreground">
            {dict.about.visionTitle}
          </h2>
          <p className="text-sm text-foreground-muted leading-relaxed">
            {dict.about.visionDesc}
          </p>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="p-8 sm:p-12 rounded-3xl bg-surface-2/40 border border-border space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
            {dict.about.timelineTitle}
          </h2>
          <p className="text-xs sm:text-sm text-foreground-muted">
            {dict.about.timelineSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          <div className="p-6 rounded-2xl bg-surface border border-border space-y-2">
            <div className="text-2xl font-bold font-serif text-primary">2015</div>
            <div className="text-sm font-bold text-foreground">{dict.about.t2015Title}</div>
            <p className="text-xs text-foreground-muted leading-relaxed">
              {dict.about.t2015Desc}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-border space-y-2">
            <div className="text-2xl font-bold font-serif text-primary">2021</div>
            <div className="text-sm font-bold text-foreground">{dict.about.t2021Title}</div>
            <p className="text-xs text-foreground-muted leading-relaxed">
              {dict.about.t2021Desc}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-border space-y-2">
            <div className="text-2xl font-bold font-serif text-primary">2026+</div>
            <div className="text-sm font-bold text-foreground">{dict.about.tTodayTitle}</div>
            <p className="text-xs text-foreground-muted leading-relaxed">
              {dict.about.tTodayDesc}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-border space-y-2">
            <div className="text-2xl font-bold font-serif text-primary">Future</div>
            <div className="text-sm font-bold text-foreground">{dict.about.tFutureTitle}</div>
            <p className="text-xs text-foreground-muted leading-relaxed">
              {dict.about.tFutureDesc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
