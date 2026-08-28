import { db } from "@/lib/db";
import { LOCALES, LOCALE_METADATA } from "@/lib/i18n";
import { Languages, CheckCircle2, AlertCircle } from "lucide-react";

export default async function AdminTranslationsPage() {
  const [
    productsCount,
    categoriesCount,
    servicesCount,
    referencesCount,
    faqsCount,
    productTranslations,
    categoryTranslations,
    serviceTranslations,
    referenceTranslations,
    faqTranslations,
  ] = await Promise.all([
    db.product.count(),
    db.category.count(),
    db.service.count(),
    db.reference.count(),
    db.faq.count(),
    db.productTranslation.groupBy({ by: ["locale"], _count: true }),
    db.categoryTranslation.groupBy({ by: ["locale"], _count: true }),
    db.serviceTranslation.groupBy({ by: ["locale"], _count: true }),
    db.referenceTranslation.groupBy({ by: ["locale"], _count: true }),
    db.faqTranslation.groupBy({ by: ["locale"], _count: true }),
  ]);

  const totalEntities = productsCount + categoriesCount + servicesCount + referencesCount + faqsCount;

  const statsPerLocale = LOCALES.map((loc) => {
    const prodCount = productTranslations.find((t) => t.locale === loc)?._count || 0;
    const catCount = categoryTranslations.find((t) => t.locale === loc)?._count || 0;
    const srvCount = serviceTranslations.find((t) => t.locale === loc)?._count || 0;
    const refCount = referenceTranslations.find((t) => t.locale === loc)?._count || 0;
    const faqCount = faqTranslations.find((t) => t.locale === loc)?._count || 0;

    const totalTranslated = prodCount + catCount + srvCount + refCount + faqCount;
    const percentage = totalEntities > 0 ? Math.round((totalTranslated / totalEntities) * 100) : 100;

    return {
      locale: loc,
      meta: LOCALE_METADATA[loc],
      prodCount,
      catCount,
      srvCount,
      refCount,
      faqCount,
      totalTranslated,
      percentage,
    };
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
          Çeviri Tamlığı & Çoklu Dil Durumu
        </h1>
        <p className="text-xs sm:text-sm text-foreground-muted mt-1">
          Tüm veritabanı varlıklarının 6 dildeki (TR, EN, AR, DE, JA, ZH) çeviri kapsam oranları.
        </p>
      </div>

      {/* Language Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsPerLocale.map((stat) => (
          <div
            key={stat.locale}
            className="p-6 rounded-3xl bg-surface border border-border space-y-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{stat.meta.flag}</span>
                <div>
                  <div className="font-bold text-sm text-foreground">{stat.meta.name}</div>
                  <div className="text-[11px] uppercase font-bold text-primary">{stat.locale} {stat.meta.dir === "rtl" ? "(RTL)" : ""}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-serif font-bold text-foreground">{stat.percentage}%</div>
                <div className="text-[10px] text-foreground-muted">Tamamlandı</div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2.5 rounded-full bg-surface-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  stat.percentage === 100 ? "bg-emerald-500" : "bg-primary"
                }`}
                style={{ width: `${stat.percentage}%` }}
              />
            </div>

            {/* Detailed item counts */}
            <div className="pt-2 grid grid-cols-2 gap-2 text-xs border-t border-border">
              <div className="text-foreground-muted">
                Ürünler: <span className="font-bold text-foreground">{stat.prodCount}/{productsCount}</span>
              </div>
              <div className="text-foreground-muted">
                Kategoriler: <span className="font-bold text-foreground">{stat.catCount}/{categoriesCount}</span>
              </div>
              <div className="text-foreground-muted">
                Hizmetler: <span className="font-bold text-foreground">{stat.srvCount}/{servicesCount}</span>
              </div>
              <div className="text-foreground-muted">
                Referanslar: <span className="font-bold text-foreground">{stat.refCount}/{referencesCount}</span>
              </div>
              <div className="text-foreground-muted">
                SSS: <span className="font-bold text-foreground">{stat.faqCount}/{faqsCount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
