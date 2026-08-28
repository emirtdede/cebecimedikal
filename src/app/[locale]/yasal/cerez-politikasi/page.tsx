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
    title: `${dict.footer.cookiePolicy} | Cebeci Medikal`,
    description: "Cebeci Medikal Çerez (Cookie) Kullanım Politikası ve Tercih Yönetimi.",
  };
}

export default async function CookiePolicyPage({
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
        <span className="text-foreground">{dict.footer.cookiePolicy}</span>
      </nav>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Çerez Aydınlatması</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
          {dict.footer.cookiePolicy}
        </h1>
        <div className="text-xs text-foreground-muted">
          Son Güncelleme: 01 Ocak 2026
        </div>
      </div>

      <div className="prose prose-invert max-w-none text-sm sm:text-base text-foreground-muted leading-relaxed space-y-6">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">1. Çerez Nedir?</h2>
          <p>
            Çerezler (cookies), web sitelerinin ziyaretçilerin tarayıcılarına yerleştirdiği küçük metin dosyalarıdır. Temel site işlevselliği, oturum sürekliliği, dil ve tema tercihlerinin hatırlanması için kullanılır.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">2. Sitemizde Kullanılan Çerez Türleri</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-surface border border-border">
              <h3 className="text-sm font-bold text-foreground mb-1">Zorunlu Çerezler (Strictly Necessary)</h3>
              <p className="text-xs text-foreground-muted">
                Web sitemizin güvenli bir şekilde çalışması, oturum yönetimi ve form güvenliği için zorunludur. Devre dışı bırakılamaz.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-surface border border-border">
              <h3 className="text-sm font-bold text-foreground mb-1">Tercih Çerezleri (Preferences)</h3>
              <p className="text-xs text-foreground-muted">
                Seçmiş olduğunuz dil ({currentLocale.toUpperCase()}) ve tema (Lacivert, Beyaz, Siyah, Yeşil) ayarlarının sonraki ziyaretlerinizde hatırlanmasını sağlar.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-surface border border-border">
              <h3 className="text-sm font-bold text-foreground mb-1">Analitik Çerezler (Analytics)</h3>
              <p className="text-xs text-foreground-muted">
                Ziyaretçi trafiğini, en çok incelenen medikal cihazları ve arama sorgularını anonim olarak ölçerek site deneyimini geliştirmemize yardımcı olur.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">3. Çerez Tercihlerini Değiştirme</h2>
          <p>
            Sitemizin alt bilgi (footer) alanında yer alan &ldquo;Çerez Ayarları&rdquo; butonuna tıklayarak çerez izinlerinizi dilediğiniz zaman güncelleyebilir veya iptal edebilirsiniz.
          </p>
        </section>
      </div>
    </div>
  );
}
