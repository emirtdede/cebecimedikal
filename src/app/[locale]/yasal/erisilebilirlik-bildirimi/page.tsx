import { notFound } from "next/navigation";
import { Eye, CheckCircle2, Keyboard, Contrast, Volume2, Sparkles } from "lucide-react";
import { Locale, isValidLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { LegalLayout } from "@/components/legal/LegalLayout";
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
    title: `Erişilebilirlik Bildirimi & WCAG Standartları | Cebeci Medikal`,
    description:
      "Cebeci Medikal dijital erişilebilirlik politikası, W3C WCAG 2.2 AA uyumluluk kriterleri ve klavye/ekran okuyucu destek rehberi.",
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

  return (
    <LegalLayout
      locale={currentLocale}
      activeSlug="erisilebilirlik-bildirimi"
      badge="Dijital Kapsayıcılık & W3C WCAG 2.2 AA"
      icon={Eye}
      title="Erişilebilirlik Bildirimi"
      subtitle="Web platformumuzun engelli bireyler dahil olmak üzere tüm kullanıcılar için engelsiz, erişilebilir ve kapsayıcı bir dijital deneyim sunmasına yönelik taahhütlerimiz."
      documentCode="CBM-ERS-2026.01"
      lastUpdated="01 Ocak 2026"
    >
      {/* Intro Box */}
      <div className="p-5 rounded-2xl bg-surface-2 border border-border space-y-2">
        <div className="flex items-center gap-2 text-foreground font-bold text-sm">
          <Eye className="w-4 h-4 text-primary" />
          <span>Evrensel Tasarım ve Engelsiz Web İlkemiz</span>
        </div>
        <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
          Cebeci Medikal olarak, sağlık teknolojileri alanındaki çözümlerimize herkesin eşit şartlarda erişebilmesini savunuyoruz. Web sitemiz W3C (World Wide Web Consortium) tarafından belirlenen <strong>Web İçeriği Erişilebilirlik Kılavuzları (WCAG 2.2 AA Seviyesi)</strong> kriterlerine uygun olarak geliştirilmektedir.
        </p>
      </div>

      {/* Section 1: Uygulanan Temel Erişilebilirlik Standartları */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-surface-2 text-primary font-serif font-bold text-sm flex items-center justify-center border border-border">1</span>
          <span>Platformda Uygulanan Erişilebilirlik Özellikleri</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-surface-2/40 border border-border space-y-1.5">
            <div className="flex items-center gap-2 text-foreground font-bold text-xs uppercase tracking-wider">
              <Keyboard className="w-4 h-4 text-primary" />
              <span>Tam Klavye Navigasyonu</span>
            </div>
            <p className="text-xs text-foreground-muted">
              Fare kullanmadan tüm menülere, ürün kataloglarına, arama modalına ve formlara <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-[10px]">Tab</kbd>, <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-[10px]">Enter</kbd> ve <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-[10px]">ESC</kbd> tuşlarıyla eksiksiz erişilebilir.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-2/40 border border-border space-y-1.5">
            <div className="flex items-center gap-2 text-foreground font-bold text-xs uppercase tracking-wider">
              <Contrast className="w-4 h-4 text-primary" />
              <span>Yüksek Kontrast & Tema Desteği</span>
            </div>
            <p className="text-xs text-foreground-muted">
              4 farklı arayüz temamız (Navy, White, Black OLED, Medical Green) görme yetisi farklı kullanıcılar için minimum 4.5:1 kontrast oranını eksiksiz sağlar.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-2/40 border border-border space-y-1.5">
            <div className="flex items-center gap-2 text-foreground font-bold text-xs uppercase tracking-wider">
              <Volume2 className="w-4 h-4 text-primary" />
              <span>Ekran Okuyucu (Screen Reader) Uyumu</span>
            </div>
            <p className="text-xs text-foreground-muted">
              NVDA, JAWS ve VoiceOver ekran okuyucuları için anlamlı HTML5 semantik etiketleri, ARIA nitelikleri ve görsel alternatif metinleri (alt text) tanımlıdır.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-2/40 border border-border space-y-1.5">
            <div className="flex items-center gap-2 text-foreground font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Hareket Azaltma (Reduced Motion)</span>
            </div>
            <p className="text-xs text-foreground-muted">
              Vestibüler bozuklukları olan kullanıcılar için sistem hareket azaltma tercihi açık olduğunda arayüz animasyonları otomatik olarak durdurulur.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Geri Bildirim ve İyileştirme */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-surface-2 text-primary font-serif font-bold text-sm flex items-center justify-center border border-border">2</span>
          <span>Erişilebilirlik Geri Bildirimi</span>
        </h2>
        <p>
          Web sitemizi kullanırken herhangi bir erişilebilirlik engeliyle karşılaşırsanız veya geliştirme öneriniz olursa, lütfen <strong>cbcmedikal@gmail.com</strong> adresinden veya <strong>+90 506 606 15 40</strong> numaralı destek hattımızdan bize iletiniz. Teknik ekibimiz en kısa sürede gerekli düzenlemeyi yapacaktır.
        </p>
      </section>
    </LegalLayout>
  );
}
