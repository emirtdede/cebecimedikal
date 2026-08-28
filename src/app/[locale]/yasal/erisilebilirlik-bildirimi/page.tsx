import { notFound } from "next/navigation";
import { ShieldCheck, ChevronRight } from "lucide-react";
import Link from "next/link";
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
    title: `${dict.footer.accessibility} | Cebeci Medikal`,
    description: "Cebeci Medikal Dijital Erişilebilirlik ve WCAG 2.2 AA Uyumluluk Bildirimi.",
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
  const dict = getDictionary(currentLocale);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-10">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-foreground-muted flex-wrap">
        <Link href={`/${currentLocale}`} className="hover:text-primary transition-colors">
          {dict.nav.home}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground">{dict.footer.accessibility}</span>
      </nav>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Erişilebilirlik Standartları</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
          {dict.footer.accessibility}
        </h1>
        <div className="text-xs text-foreground-muted">
          Hedef Standart: W3C WCAG 2.2 AA Seviyesi
        </div>
      </div>

      <div className="prose prose-invert max-w-none text-sm sm:text-base text-foreground-muted leading-relaxed space-y-6">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">1. Erişilebilirlik Taahhüdümüz</h2>
          <p>
            Cebeci Medikal, dijital içeriklerinin engelli bireyler de dahil olmak üzere tüm kullanıcılar tarafından rahatça erişilebilir ve kullanılabilir olmasını sağlamayı taahhüt eder.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">2. Uygulanan Başlıca Önlemler</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Klavye Navigasyonu:</strong> Tüm menüler, arama modalı ve formlar klavye (Tab, Enter, ESC, Ok tuşları) ile tam uyumlu çalışmaktadır.</li>
            <li><strong>Kontrast Oranları:</strong> Metin ve arka plan renk kombinasyonları WCAG AA kontrast kriterlerini (en az 4.5:1) sağlamaktadır.</li>
            <li><strong>Ekran Okuyucu Desteği:</strong> Anlamlı HTML5 semantik etiketleri, ARIA nitelikleri ve görsel alternatif metinleri (alt text) eksiksiz tanımlanmıştır.</li>
            <li><strong>Hareket Azaltma:</strong> Sistem tercihlerinde &ldquo;prefers-reduced-motion&rdquo; aktif olan kullanıcılar için animasyonlar otomatik olarak devre dışı bırakılmaktadır.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
