import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ShieldCheck,
  Award,
  FileText,
  MessageCircle,
  ChevronRight,
  CheckCircle2,
  Share2,
  Box,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Locale, LOCALES, isValidLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { getProductBySlug, getProducts, getRelatedProducts, getSiteSettings } from "@/lib/data";
import { ProductGallery } from "@/features/products/ProductGallery";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const products = await getProducts();
  const params: { locale: string; slug: string }[] = [];
  for (const locale of LOCALES) {
    for (const product of products) {
      params.push({ locale, slug: product.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const currentLocale = isValidLocale(locale) ? (locale as Locale) : "tr";
  const product = await getProductBySlug(slug, currentLocale);

  if (!product) {
    return { title: "Ürün Bulunamadı | Cebeci Medikal" };
  }

  return {
    title: product.seoTitle || product.title,
    description: product.seoDescription || product.shortDescription,
    alternates: {
      canonical: `https://cebecimedikal.com/${currentLocale}/urunler/${slug}`,
      languages: {
        tr: `https://cebecimedikal.com/tr/urunler/${slug}`,
        en: `https://cebecimedikal.com/en/urunler/${slug}`,
        de: `https://cebecimedikal.com/de/urunler/${slug}`,
        ar: `https://cebecimedikal.com/ar/urunler/${slug}`,
        ja: `https://cebecimedikal.com/ja/urunler/${slug}`,
        zh: `https://cebecimedikal.com/zh/urunler/${slug}`,
        "x-default": `https://cebecimedikal.com/tr/urunler/${slug}`,
      },
    },
    openGraph: {
      title: product.title,
      description: product.shortDescription,
      url: `https://cebecimedikal.com/${currentLocale}/urunler/${slug}`,
      locale: currentLocale === "tr" ? "tr_TR" : currentLocale === "en" ? "en_US" : currentLocale,
      images: product.images.length > 0 ? [product.images[0]] : [],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

  const currentLocale = locale as Locale;
  const dict = getDictionary(currentLocale);
  const [product, settings] = await Promise.all([
    getProductBySlug(slug, currentLocale),
    getSiteSettings(),
  ]);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.slug, product.category.id, currentLocale, 3);
  const whatsappNum = settings.whatsapp || "905066061540";
  const dynamicWhatsappMessage = `Merhaba, ${product.title} (${product.brand} - ${product.model || ""}) hakkında fiyat teklifi ve teknik bilgi almak istiyorum.`;

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.images,
    description: product.shortDescription,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    sku: product.sku || product.slug,
    category: product.category.name,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "TRY",
      price: "0",
      seller: {
        "@type": "Organization",
        name: "Cebeci Medikal",
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10 space-y-12">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation with Back Button */}
      <div className="flex items-center gap-3 flex-wrap">
        <Link
          href={`/${currentLocale}/urunler`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface hover:bg-surface-2 border border-border text-foreground hover:text-primary transition-all text-xs font-semibold shadow-sm group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform rtl:rotate-180" />
          <span>{dict.common?.back || "Geri Dön"}</span>
        </Link>

        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-foreground-muted flex-wrap">
          <Link href={`/${currentLocale}`} className="hover:text-primary transition-colors">
            {dict.nav.home}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-foreground-muted/60 rtl:rotate-180" />
          <Link href={`/${currentLocale}/urunler`} className="hover:text-primary transition-colors">
            {dict.nav.products}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-foreground-muted/60 rtl:rotate-180" />
          <Link
            href={`/${currentLocale}/urunler?kategori=${product.category.slug}`}
            className="hover:text-primary transition-colors font-medium text-foreground"
          >
            {product.category.name}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-foreground-muted/60 rtl:rotate-180" />
          <span className="text-foreground-muted truncate max-w-xs">{product.title}</span>
        </nav>
      </div>

      {/* Main Product Presentation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Multi-image Gallery */}
        <div className="lg:col-span-7">
          <ProductGallery
            images={product.images}
            title={product.title}
            zoomHint={dict.products.zoomHint}
            imageAlt={dict.products.imageAlt}
          />
        </div>

        {/* Right: Product Details & CTAs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20">
                {product.category.name}
              </span>
              <span
                className={`text-[11px] font-bold px-2.5 py-1 rounded-md ${
                  product.condition === "NEW"
                    ? "bg-primary/15 text-primary border border-primary/30"
                    : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                }`}
              >
                {product.condition === "NEW" ? dict.products.new : dict.products.secondHand}
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-foreground leading-tight">
              {product.title}
            </h1>

            <p className="text-sm text-foreground-muted leading-relaxed">
              {product.shortDescription}
            </p>
          </div>

          {/* Key Specs Highlights Box */}
          <div className="p-4 rounded-xl bg-surface border border-border space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-border/50">
              <span className="text-foreground-muted">{dict.products.brand}:</span>
              <span className="font-semibold text-foreground">{product.brand}</span>
            </div>
            {product.model && (
              <div className="flex justify-between py-1 border-b border-border/50">
                <span className="text-foreground-muted">{dict.products.model}:</span>
                <span className="font-semibold text-foreground">{product.model}</span>
              </div>
            )}
            {product.sku && (
              <div className="flex justify-between py-1 border-b border-border/50">
                <span className="text-foreground-muted">{dict.products.sku}:</span>
                <span className="font-mono text-foreground">{product.sku}</span>
              </div>
            )}
            <div className="flex justify-between py-1">
              <span className="text-foreground-muted">{(dict.products as any)?.warrantyAndSupport || "Garanti & Destek"}:</span>
              <span className="font-semibold text-primary">{(dict.products as any)?.serviceGuarantee || "Cebeci Medikal Servis Güvencesi"}</span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-3 pt-2">
            <Link
              href={`/${currentLocale}/teklif?urun=${encodeURIComponent(product.title)}`}
              className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>{dict.products?.requestQuoteForProduct || dict.products.requestQuote}</span>
            </Link>

            <a
              href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent(dynamicWhatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>{dict.products?.whatsappQuickPrice || "WhatsApp ile Hızlı Fiyat Al"}</span>
            </a>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-4 border-t border-border grid grid-cols-2 gap-3 text-xs text-foreground-muted">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
              <span>{dict.products?.biomedicalCalibrationApproved || "Biyomedikal Kalibrasyon Onaylı"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-primary flex-shrink-0" />
              <span>{dict.products?.onsiteInstallationTraining || "Yerinde Kurulum ve Eğitim"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specifications & Detailed Description */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-border">
        <div className="lg:col-span-7 space-y-8">
          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
              {dict.products.description || "Ürün Açıklaması"}
            </h2>
            <div className="text-sm sm:text-base text-foreground-muted leading-relaxed space-y-4">
              <p>{product.description}</p>
            </div>
          </div>

          {/* Applications Area */}
          {product.applications.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-foreground">
                {dict.products.applications}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.applications.map((app, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-surface border border-border flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-foreground font-medium">{app}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Technical Specs Table */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="font-serif text-2xl font-bold text-foreground">
            {dict.products.specs}
          </h2>
          <div className="rounded-2xl border border-border overflow-hidden bg-surface shadow-sm">
            <table className="w-full text-xs sm:text-sm">
              <tbody className="divide-y divide-border">
                {Object.entries(product.technicalSpecs).map(([key, val], idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-surface" : "bg-surface-2/40"}>
                    <td className="px-4 py-3 font-semibold text-foreground w-2/5 border-r border-border/40">
                      {key}
                    </td>
                    <td className="px-4 py-3 text-foreground-muted">
                      {val}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-border space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              {dict.products.relatedProducts}
            </h2>
            <Link
              href={`/${currentLocale}/urunler?kategori=${product.category.slug}`}
              className="text-xs sm:text-sm font-bold text-primary hover:underline flex items-center gap-1"
            >
              <span>{dict.products?.seeMore || "Daha Fazlasını Gör"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <Link
                key={rel.id}
                href={`/${currentLocale}/urunler/${rel.slug}`}
                className="group rounded-2xl bg-surface border border-border p-4 hover:border-primary/40 hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 rounded-xl overflow-hidden bg-white mb-3 p-2 flex items-center justify-center">
                    <img
                      src={rel.images[0] || "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"}
                      alt={rel.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-[11px] font-semibold text-primary uppercase">
                    {rel.category.name}
                  </div>
                  <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1 mt-1">
                    {rel.title}
                  </h3>
                </div>
                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
                  <span>{dict.products.viewDetails}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
