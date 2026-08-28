import Link from "next/link";
import { notFound } from "next/navigation";
import { Search, Filter, Box, ArrowRight, FileText, CheckCircle2 } from "lucide-react";
import { Locale, isValidLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { getCategories, getProducts } from "@/lib/data";
import { ProductFilterBar } from "@/features/products/ProductFilterBar";
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
    title: dict.products.title,
    description: dict.products.subtitle,
  };
}

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ kategori?: string; durum?: string; q?: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const { kategori, durum, q } = await searchParams;
  const currentLocale = locale as Locale;
  const dict = getDictionary(currentLocale);

  const [categories, products] = await Promise.all([
    getCategories(currentLocale),
    getProducts(currentLocale, {
      categorySlug: kategori,
      condition: durum,
      search: q,
    }),
  ]);

  const activeCategory = categories.find((c) => c.slug === kategori);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-12">
      {/* Page Header */}
      <div className="max-w-3xl space-y-3">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-foreground">
          {activeCategory ? activeCategory.name : dict.products.title}
        </h1>
        <p className="text-base sm:text-lg text-foreground-muted leading-relaxed">
          {activeCategory ? activeCategory.description : dict.products.subtitle}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <ProductFilterBar
        categories={categories}
        dict={dict}
        totalCount={products.length}
        currentLocale={currentLocale}
      />

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group rounded-2xl bg-surface border border-border overflow-hidden hover:border-primary/50 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Product Image */}
                <div className="relative h-60 w-full overflow-hidden bg-white flex items-center justify-center p-3">
                  <img
                    src={product.images[0] || "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"}
                    alt={product.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-md ${
                        product.condition === "NEW"
                          ? "bg-primary text-white"
                          : "bg-amber-600 text-white"
                      }`}
                    >
                      {product.condition === "NEW" ? dict.products.new : dict.products.secondHand}
                    </span>
                  </div>
                </div>

                {/* Content */}
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

                  <div className="space-y-1 py-3 border-y border-border/60 text-xs text-foreground-muted">
                    <div className="flex justify-between">
                      <span>{dict.products.brand}:</span>
                      <span className="font-semibold text-foreground">{product.brand}</span>
                    </div>
                    {product.model && (
                      <div className="flex justify-between">
                        <span>{dict.products.model}:</span>
                        <span className="font-semibold text-foreground">{product.model}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0 flex items-center gap-2.5">
                <Link
                  href={`/${currentLocale}/urunler/${product.slug}`}
                  className="flex-1 py-2.5 rounded-xl bg-surface-2 hover:bg-surface border border-border text-center text-xs font-bold text-foreground transition-colors"
                >
                  {dict.products.viewDetails}
                </Link>
                <Link
                  href={`/${currentLocale}/teklif?urun=${encodeURIComponent(product.title)}`}
                  className="flex-1 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-sm transition-colors flex items-center justify-center gap-1.5 text-center whitespace-nowrap"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{dict.nav.requestQuote}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-surface rounded-3xl border border-border p-8 space-y-4">
          <Box className="w-12 h-12 text-foreground-muted mx-auto opacity-50" />
          <h3 className="text-lg font-bold text-foreground">{dict.products.noProducts}</h3>
          <p className="text-xs sm:text-sm text-foreground-muted max-w-md mx-auto">
            Farklı anahtar kelimelerle arama yapabilir veya filtreleri sıfırlayabilirsiniz.
          </p>
          <Link
            href={`/${currentLocale}/urunler`}
            className="inline-block px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold"
          >
            {dict.products.clearFilters}
          </Link>
        </div>
      )}
    </div>
  );
}
