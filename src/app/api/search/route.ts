import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q")?.trim() || "";
    const locale = searchParams.get("locale") || DEFAULT_LOCALE;

    if (!query || query.length < 2) {
      return NextResponse.json({
        products: [],
        services: [],
        pages: [],
      });
    }

    const qLower = query.toLowerCase();

    // 1. Search Products
    const products = await db.product.findMany({
      where: {
        status: "PUBLISHED",
        OR: [
          { brand: { contains: query } },
          { model: { contains: query } },
          { sku: { contains: query } },
          {
            translations: {
              some: {
                OR: [
                  { title: { contains: query } },
                  { description: { contains: query } },
                  { shortDescription: { contains: query } },
                ],
              },
            },
          },
        ],
      },
      include: {
        category: { include: { translations: true } },
        translations: true,
      },
      take: 6,
    });

    const formattedProducts = products.map((p) => {
      const translation =
        p.translations.find((t) => t.locale === locale) ||
        p.translations.find((t) => t.locale === DEFAULT_LOCALE) ||
        p.translations[0];

      const catTranslation =
        p.category.translations.find((t) => t.locale === locale) ||
        p.category.translations.find((t) => t.locale === DEFAULT_LOCALE) ||
        p.category.translations[0];

      return {
        id: p.id,
        slug: p.slug,
        title: translation?.title || p.slug,
        description: translation?.shortDescription || "",
        brand: p.brand,
        model: p.model,
        condition: p.condition,
        image: p.images ? JSON.parse(p.images)[0] : null,
        category: catTranslation?.name || "",
        categorySlug: p.category.slug,
        url: `/${locale}/urunler/${p.slug}`,
      };
    });

    // 2. Search Catalogs
    const catalogs = await db.catalog.findMany({
      where: {
        isActive: true,
        OR: [
          { title: { contains: query } },
          { description: { contains: query } },
          { category: { contains: query } },
        ],
      },
      take: 4,
    });

    const formattedCatalogs = catalogs.map((c) => ({
      id: c.id,
      title: c.title,
      description: c.description || "",
      category: c.category,
      fileSize: c.fileSize,
      fileUrl: c.fileUrl,
      url: `/${locale}/kataloglar`,
    }));

    // 2. Search Services
    const services = await db.service.findMany({
      where: {
        isActive: true,
        translations: {
          some: {
            OR: [
              { title: { contains: query } },
              { shortDescription: { contains: query } },
              { description: { contains: query } },
            ],
          },
        },
      },
      include: {
        translations: true,
      },
      take: 4,
    });

    const formattedServices = services.map((s) => {
      const translation =
        s.translations.find((t) => t.locale === locale) ||
        s.translations.find((t) => t.locale === DEFAULT_LOCALE) ||
        s.translations[0];

      return {
        id: s.id,
        slug: s.slug,
        title: translation?.title || s.slug,
        description: translation?.shortDescription || "",
        url: `/${locale}/hizmetler/${s.slug}`,
      };
    });

    // 3. Search Static / Core Pages
    const dict = getDictionary(locale);
    const staticPages = [
      { title: dict.nav.about, url: `/${locale}/hakkimizda`, desc: dict.brand.shortDescription },
      { title: dict.nav.contact, url: `/${locale}/iletisim`, desc: dict.contact.subtitle },
      { title: dict.nav.requestQuote, url: `/${locale}/teklif`, desc: dict.quote.subtitle },
      { title: dict.nav.secondHand, url: `/${locale}/urunler?durum=SECOND_HAND`, desc: dict.products.secondHand },
      { title: dict.nav.references, url: `/${locale}/referanslar`, desc: dict.nav.references },
      { title: dict.nav.catalogs, url: `/${locale}/kataloglar`, desc: dict.nav.catalogs },
      { title: dict.footer.kvkk, url: `/${locale}/yasal/kvkk-aydinlatma-metni`, desc: dict.footer.kvkk },
      { title: dict.footer.privacy, url: `/${locale}/yasal/gizlilik-politikasi`, desc: dict.footer.privacy },
      { title: dict.footer.cookiePolicy, url: `/${locale}/yasal/cerez-politikasi`, desc: dict.footer.cookiePolicy },
    ];

    const matchedPages = staticPages.filter(
      (p) => p.title.toLowerCase().includes(qLower) || p.desc.toLowerCase().includes(qLower)
    );

    // 4. Log search query for analytics
    const totalResults =
      formattedProducts.length +
      formattedServices.length +
      formattedCatalogs.length +
      matchedPages.length;
    await db.searchQuery
      .create({
        data: {
          query,
          locale,
          resultsCount: totalResults,
        },
      })
      .catch(() => {});

    return NextResponse.json({
      products: formattedProducts,
      services: formattedServices,
      catalogs: formattedCatalogs,
      pages: matchedPages,
    });
  } catch (error) {
    console.error("API error in search:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
