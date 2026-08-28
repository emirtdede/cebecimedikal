import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FileText,
  Download,
  ShieldCheck,
  Activity,
  Wrench,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Layers,
  ArrowRight,
} from "lucide-react";
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
    title: `${dict.catalogs.pageTitle} | Cebeci Medikal`,
    description: dict.catalogs.pageSubtitle,
  };
}

const CATEGORY_ICONS: Record<string, any> = {
  "Genel": FileText,
  "Genel Katalog": FileText,
  "Yoğun Bakım": Activity,
  "2. El Cihazlar": ShieldCheck,
  "2. El Revizyonlu": ShieldCheck,
  "Teknik Servis": Wrench,
};

const CATALOG_FEATURES: Record<number, string[]> = {
  1: [
    "54 Farklı Medikal Cihaz & Model Detayları",
    "Klinik Uygulama Alanları & Konfigürasyon Kodları",
    "TSE HYB & IEC 62353 Kalite Güvence Standartları",
  ],
  2: [
    "Ventilatör, Monitör, Küvöz ve Defibrilatör Modelleri",
    "Doğrulanmış Ventilasyon Modları ve Sensör Parametreleri",
    "Yoğun Bakım Üniteleri İçin Anahtar Teslim Donanım Listesi",
  ],
  3: [
    "Revizyonu Yapılmış ve Kalibre Edilmiş 2. El Cihaz Parkuru",
    "1 Yıl Cebeci Medikal Tam Garanti Kapsamı",
    "Ekonomik Fiyatlandırma ve Bütçe Planlama Rehberi",
  ],
  4: [
    "Periyodik Koruyucu Bakım & STK/MTK Protokolleri",
    "Komponent Düzeyinde Elektronik Kart Onarım Süreçleri",
    "7/24 Acil Arıza Müdahale ve Servis Sözleşmesi Şartnamesi",
  ],
};

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
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
          <BookOpen className="w-4 h-4 flex-shrink-0" />
          <span>{dict.nav.catalogs || "Doküman & Katalog Merkezi"}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-foreground tracking-tight">
          {dict.catalogs.pageTitle || "Tıbbi Cihaz & Hizmet Katalogları"}
        </h1>
        <p className="text-base sm:text-lg text-foreground-muted leading-relaxed">
          {dict.catalogs.pageSubtitle ||
            "Cebeci Medikal'in sıfır ve revizyonlu tıbbi cihaz envanterini, teknik şartnamelerini ve biyomedikal servis rehberlerini yüksek çözünürlüklü PDF formatında inceleyin veya indirin."}
        </p>
      </div>

      {/* Catalogs Clean Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {catalogs.map((cat, index) => {
          const IconComp = CATEGORY_ICONS[cat.category] || FileText;
          const features = CATALOG_FEATURES[cat.sortOrder || index + 1] || [
            "Detaylı Cihaz Parametreleri & Aksesuarları",
            "Doğrulanmış Biyomedikal Teknik Şartnameler",
            "TSE HYB Onaylı Test & Garanti Koşulları",
          ];

          return (
            <div
              key={cat.id}
              className="group p-7 sm:p-8 rounded-3xl bg-surface border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Category & Meta Header Row */}
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider">
                    <IconComp className="w-4 h-4 flex-shrink-0" />
                    <span>{cat.category}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-foreground-muted">
                      Boyut: <strong className="text-foreground">{cat.fileSize}</strong>
                    </span>
                    {cat.downloadCount > 0 && (
                      <span className="text-[11px] font-semibold text-foreground-muted px-2.5 py-0.5 rounded-lg bg-surface-2 border border-border">
                        {cat.downloadCount.toLocaleString()}+ İndirme
                      </span>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h2 className="font-serif text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                  {cat.title}
                </h2>

                {/* Description */}
                <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                  {cat.description ||
                    "Kapsamlı ürün teknik parametreleri, opsiyonel donanımlar ve standart aksesuarları içeren resmi dokümandır."}
                </p>

                {/* Highlights List */}
                <div className="pt-2 space-y-2">
                  {features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-6 border-t border-border flex items-center justify-between gap-4">
                <span className="text-xs text-foreground-muted flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-primary" />
                  <span>Resmi Ürün Dokümanı</span>
                </span>

                <CatalogDownloadButton
                  catalogId={cat.id}
                  fileUrl={cat.fileUrl}
                  title={cat.title}
                  initialCount={cat.downloadCount}
                  btnText="PDF İncele & İndir"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Request Custom Specification CTA */}
      <div className="p-8 sm:p-12 rounded-3xl bg-surface-2/50 border border-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="font-serif text-2xl font-bold text-foreground">
            Özel Teknik Şartname veya İhale Dokümanı mı Gerekiyor?
          </h3>
          <p className="text-xs sm:text-sm text-foreground-muted max-w-xl leading-relaxed">
            Hastaneler, klinikler ve kamu/özel sağlık ihaleleri için kurumunuza özel biyomedikal teknik şartname ve cihaz listesi hazırlıyoruz.
          </p>
        </div>
        <Link
          href={`/${currentLocale}/teklif?konu=${encodeURIComponent("Özel Şartname Talebi")}`}
          className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold shadow-md shadow-primary/20 transition-all flex items-center gap-2 flex-shrink-0"
        >
          <span>Şartname Talebi Oluştur</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
