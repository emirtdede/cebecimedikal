import Link from "next/link";
import { notFound } from "next/navigation";
import { RefreshCw, ShieldCheck, Award, FileText, CheckCircle2, ArrowRight } from "lucide-react";
import { Locale, isValidLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { getProducts } from "@/lib/data";
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
    title: `${dict.nav.secondHand} | Cebeci Medikal`,
    description: "Biyomedikal testleri tamamlanmış, parça ve servis garantili 2. el revizyonlu tıbbi cihaz kataloğu.",
  };
}

export default async function SecondHandPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const currentLocale = locale as Locale;
  const dict = getDictionary(currentLocale);
  const products = await getProducts(currentLocale, { condition: "SECOND_HAND" });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-16">
      {/* Page Header */}
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Garantili Revizyonlu Ekipmanlar</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-foreground">
          {dict.nav.secondHand}
        </h1>
        <p className="text-base sm:text-lg text-foreground-muted leading-relaxed">
          Cebeci Medikal laboratuvarlarında tüm elektriksel güvenlik testleri, kalibrasyonları ve fonksiyonel kontrolleri yapılmış, 1 yıl tam teknik servis garantili 2. el tıbbi cihazlar.
        </p>
      </div>

      {/* Assurance Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-surface border border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-foreground">1 Yıl Tam Garanti</h2>
          </div>
          <p className="text-xs text-foreground-muted leading-relaxed">
            Satışa sunulan tüm revizyonlu cihazlarımız 1 yıl boyunca Cebeci Medikal parça ve servis garantisi altındadır.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-surface border border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-foreground">Kalibrasyon & Güvenlik</h2>
          </div>
          <p className="text-xs text-foreground-muted leading-relaxed">
            IEC 62353 elektriksel güvenlik testleri ve üretici parametrelerine uygun kalibrasyon raporları hazırlanır.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-surface border border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-foreground">%50+ Bütçe Avantajı</h2>
          </div>
          <p className="text-xs text-foreground-muted leading-relaxed">
            Klinik ve hastane bütçenizi zorlamadan, sıfır cihaz kalitesinde güvenilir medikal teknolojiye erişim.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
            Mevcut 2. El Cihaz Envanteri ({products.length})
          </h2>
          <Link
            href={`/${currentLocale}/teklif?konu=2el`}
            className="text-xs sm:text-sm font-bold text-primary hover:underline flex items-center gap-1"
          >
            <span>Özel Cihaz Talebinde Bulun</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group rounded-2xl bg-surface border border-border overflow-hidden hover:border-primary/50 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-60 w-full overflow-hidden bg-surface-2">
                  <img
                    src={product.images[0] || "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-md bg-amber-600 text-white">
                      {dict.products.secondHand}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
                    {product.category.name}
                  </div>
                  <Link
                    href={`/${currentLocale}/urunler/${product.slug}`}
                    className="block text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2"
                  >
                    {product.title}
                  </Link>
                  <p className="text-xs sm:text-sm text-foreground-muted line-clamp-2 mb-4 leading-relaxed">
                    {product.shortDescription}
                  </p>

                  <div className="p-3 rounded-xl bg-surface-2/60 border border-border/60 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-foreground-muted">Marka & Model:</span>
                      <span className="font-semibold text-foreground">{product.brand} {product.model || ""}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground-muted">Garanti Durumu:</span>
                      <span className="font-semibold text-primary">1 Yıl Tam Garanti</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center gap-3">
                <Link
                  href={`/${currentLocale}/urunler/${product.slug}`}
                  className="flex-1 py-2.5 rounded-xl bg-surface-2 hover:bg-surface border border-border text-center text-xs font-bold text-foreground transition-colors"
                >
                  {dict.products.viewDetails}
                </Link>
                <Link
                  href={`/${currentLocale}/teklif?urun=${encodeURIComponent(product.title)}`}
                  className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{dict.nav.requestQuote}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
