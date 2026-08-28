import { notFound } from "next/navigation";
import { Scale, CheckCircle2, AlertTriangle, FileText, Gavel, ShieldCheck } from "lucide-react";
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
    title: `Kullanım Koşulları & Hizmet Sözleşmesi | Cebeci Medikal`,
    description:
      "Cebeci Medikal web platformu kullanım şartları, fikri mülkiyet hakları, tıbbi cihaz teklif koşulları ve uyuşmazlık çözüm kuralları.",
  };
}

export default async function TermsPage({
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
      activeSlug="kullanim-kosullari"
      badge="Hukuki Şartlar & Kullanım Kuralları"
      icon={Scale}
      title="Kullanım Koşulları"
      subtitle="Cebeci Medikal dijital platformuna erişim, teknik içeriklerin kullanımı, teklif talepleri ve kurumsal biyomedikal hizmet şartlarına dair yasal çerçeve."
      documentCode="CBM-KOS-2026.01"
      lastUpdated="01 Ocak 2026"
    >
      {/* Intro Box */}
      <div className="p-5 rounded-2xl bg-surface-2 border border-border space-y-2">
        <div className="flex items-center gap-2 text-foreground font-bold text-sm">
          <Scale className="w-4 h-4 text-primary" />
          <span>Genel Kabul ve Bağlayıcılık</span>
        </div>
        <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
          <strong>cebecimedikal.com</strong> web sitesini ziyaret eden, katalog indiren veya teklif talep formu dolduran tüm kullanıcılar ve kurumlar, bu sayfada belirtilen kullanım koşullarını peşinen kabul etmiş sayılır.
        </p>
      </div>

      {/* Section 1: Platformun Mahiyeti */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-surface-2 text-primary font-serif font-bold text-sm flex items-center justify-center border border-border">1</span>
          <span>Platformun Mahiyeti ve Ticari Kapsam</span>
        </h2>
        <p>
          Cebeci Medikal web sitesi doğrudan çevrim içi kartla ödeme alınan bir tüketici e-ticaret sitesi değildir. Platform; hastanelere, kliniklere, veteriner tıp merkezlerine ve yetkili sağlık kurumlarına yönelik kurumsal tıbbi cihaz tanıtımı, 2. el revize cihaz envanteri, teknik servis çözümleri ve resmi teklif talep süreçlerini yönetmek üzere tasarlanmıştır.
        </p>
      </section>

      {/* Section 2: Fikri ve Sınai Mülkiyet Hakları */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-surface-2 text-primary font-serif font-bold text-sm flex items-center justify-center border border-border">2</span>
          <span>Fikri ve Sınai Mülkiyet Hakları</span>
        </h2>
        <p>
          Web sitemizde yer alan tüm marka logoları, tasarımlar, ürün katalogları, teknik şartname derlemeleri, yazılım kodları, arayüz bileşenleri ve metin içerikleri <strong>Cebeci Tıbbi Cihazlar ve Medikal Hizmetleri Ltd. Şti.</strong>&apos;ye ve/veya ilgili lisansörlerine aittir.
        </p>
        <div className="p-4 rounded-xl bg-surface-2/40 border border-border text-xs sm:text-sm space-y-1">
          <div className="font-bold text-foreground">Yasaklanan Eylemler:</div>
          <ul className="list-disc pl-5 space-y-1 text-foreground-muted">
            <li>Sitedeki ürün görsellerinin ve katalog içeriklerinin izinsiz ticari amaçla kopyalanması veya dağıtılması,</li>
            <li>Sitenin kaynak kodlarının tersine mühendislik (reverse engineering) veya botlarla kazıma (scraping) yöntemleriyle çekilmesi.</li>
          </ul>
        </div>
      </section>

      {/* Section 3: Teklif Talepleri ve Fiyatlandırma */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-surface-2 text-primary font-serif font-bold text-sm flex items-center justify-center border border-border">3</span>
          <span>Teklif Talepleri ve Fiyat Bağlayıcılığı</span>
        </h2>
        <p>
          Web sitesinde sunulan teknik özellikler, kataloglar ve formlar üzerinden iletilen talepler bir &ldquo;icap&rdquo; (kesin satış vaadi) niteliğinde olmayıp, &ldquo;icaba davet&rdquo; niteliğindedir. Kesin fiyat, teslim süresi, döviz kuru, garanti kapsamı ve ödeme şartları, şirketimiz tarafından yetkili kaşe-imza ile hazırlanan resmi teklif mektubu ile yürürlüğe girer.
        </p>
      </section>

      {/* Section 4: Teknik Servis ve Garanti Koşulları */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-surface-2 text-primary font-serif font-bold text-sm flex items-center justify-center border border-border">4</span>
          <span>Teknik Servis ve Revizyon Standartları</span>
        </h2>
        <p>
          Tarafımızca bakım ve onarımı yapılan veya 2. el olarak revize edilen tüm tıbbi cihazlar, <strong>TSE Hizmet Yeterlilik Belgesi (TSE HYB)</strong> ve <strong>IEC 62353 Tıbbi Elektriksel Güvenlik</strong> standartlarına uygunluk testlerinden geçirilir. Cihazlara uygulanan parça ve işçilik garanti süreleri, düzenlenen resmi servis formunda açıkça belirtilmektedir.
        </p>
      </section>

      {/* Section 5: Uyuşmazlıkların Çözümü ve Yetkili Yargı */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-surface-2 text-primary font-serif font-bold text-sm flex items-center justify-center border border-border">5</span>
          <span>Uyuşmazlıkların Çözümü & Yetkili Mahkemeler</span>
        </h2>
        <p>
          Bu Kullanım Koşulları Türkiye Cumhuriyeti kanunlarına tabidir. Web sitesinin kullanımından veya sunulan hizmetlerden doğabilecek her türlü hukuki ihtilafın çözümünde <strong>Ankara Mahkemeleri ve İcra Daireleri</strong> münhasıran yetkilidir.
        </p>
      </section>
    </LegalLayout>
  );
}
