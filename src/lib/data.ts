import { db } from "./db";
import { Locale, DEFAULT_LOCALE } from "./i18n";

export interface LocalizedCategory {
  id: string;
  slug: string;
  icon: string;
  sortOrder: number;
  name: string;
  description: string;
  productsCount?: number;
}

export interface LocalizedProduct {
  id: string;
  slug: string;
  brand: string;
  model: string | null;
  sku: string | null;
  condition: string;
  status: string;
  featured: boolean;
  sortOrder: number;
  images: string[];
  technicalSpecs: Record<string, string>;
  applications: string[];
  title: string;
  shortDescription: string;
  description: string;
  seoTitle?: string;
  seoDescription?: string;
  category: {
    id: string;
    slug: string;
    name: string;
  };
}

export interface LocalizedService {
  id: string;
  slug: string;
  icon: string;
  sortOrder: number;
  title: string;
  shortDescription: string;
  description: string;
  details: {
    features?: string[];
    workflow?: string[];
    benefits?: string[];
  };
}

export interface LocalizedReference {
  id: string;
  companyName: string;
  clientName: string | null;
  position: string | null;
  sector: string;
  city: string;
  rating: number;
  serviceScope: string | null;
  quote: string;
}

export async function getSiteSettings(): Promise<Record<string, string>> {
  try {
    const settings = await db.siteSetting.findMany();
    const map: Record<string, string> = {};
    for (const s of settings) {
      map[s.key] = s.value;
    }
    return map;
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return {};
  }
}

export async function getCategories(locale: string = DEFAULT_LOCALE): Promise<LocalizedCategory[]> {
  try {
    const categories = await db.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      include: {
        translations: true,
        _count: {
          select: { products: { where: { status: "PUBLISHED" } } },
        },
      },
    });

    return categories.map((c) => {
      const translation =
        c.translations.find((t) => t.locale === locale) ||
        c.translations.find((t) => t.locale === DEFAULT_LOCALE) ||
        c.translations[0];

      return {
        id: c.id,
        slug: c.slug,
        icon: c.icon,
        sortOrder: c.sortOrder,
        name: translation?.name || c.slug,
        description: translation?.description || "",
        productsCount: c._count.products,
      };
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getCategoryBySlug(slug: string, locale: string = DEFAULT_LOCALE): Promise<LocalizedCategory | null> {
  try {
    const category = await db.category.findUnique({
      where: { slug, isActive: true },
      include: {
        translations: true,
        _count: {
          select: { products: { where: { status: "PUBLISHED" } } },
        },
      },
    });

    if (!category) return null;

    const translation =
      category.translations.find((t) => t.locale === locale) ||
      category.translations.find((t) => t.locale === DEFAULT_LOCALE) ||
      category.translations[0];

    return {
      id: category.id,
      slug: category.slug,
      icon: category.icon,
      sortOrder: category.sortOrder,
      name: translation?.name || category.slug,
      description: translation?.description || "",
      productsCount: category._count.products,
    };
  } catch (error) {
    console.error("Error fetching category by slug:", error);
    return null;
  }
}

export async function getProducts(
  locale: string = DEFAULT_LOCALE,
  options?: {
    categorySlug?: string;
    condition?: string;
    featured?: boolean;
    search?: string;
    limit?: number;
  }
): Promise<LocalizedProduct[]> {
  try {
    const whereClause: any = {
      status: "PUBLISHED",
    };

    if (options?.categorySlug) {
      whereClause.category = { slug: options.categorySlug };
    }

    if (options?.condition && options.condition !== "ALL") {
      whereClause.condition = options.condition;
    }

    if (options?.featured !== undefined) {
      whereClause.featured = options.featured;
    }

    const products = await db.product.findMany({
      where: whereClause,
      orderBy: { sortOrder: "asc" },
      take: options?.limit,
      include: {
        category: {
          include: {
            translations: true,
          },
        },
        translations: true,
      },
    });

    const parsed = products.map((p) => {
      const translation =
        p.translations.find((t) => t.locale === locale) ||
        p.translations.find((t) => t.locale === DEFAULT_LOCALE) ||
        p.translations[0];

      const catTranslation =
        p.category.translations.find((t) => t.locale === locale) ||
        p.category.translations.find((t) => t.locale === DEFAULT_LOCALE) ||
        p.category.translations[0];

      let images: string[] = [];
      try {
        images = JSON.parse(p.images);
      } catch {
        images = [p.images];
      }

      let technicalSpecs: Record<string, string> = {};
      try {
        if (p.technicalSpecs) technicalSpecs = JSON.parse(p.technicalSpecs);
      } catch {}

      let applications: string[] = [];
      try {
        if (p.applications) applications = JSON.parse(p.applications);
      } catch {}

      return {
        id: p.id,
        slug: p.slug,
        brand: p.brand,
        model: p.model,
        sku: p.sku,
        condition: p.condition,
        status: p.status,
        featured: p.featured,
        sortOrder: p.sortOrder,
        images,
        technicalSpecs,
        applications,
        title: translation?.title || p.slug,
        shortDescription: translation?.shortDescription || "",
        description: translation?.description || "",
        seoTitle: translation?.seoTitle || undefined,
        seoDescription: translation?.seoDescription || undefined,
        category: {
          id: p.category.id,
          slug: p.category.slug,
          name: catTranslation?.name || p.category.slug,
        },
      };
    });

    if (options?.search) {
      const q = options.search.toLowerCase().trim();
      return parsed.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.brand.toLowerCase().includes(q) ||
          (item.model && item.model.toLowerCase().includes(q)) ||
          item.description.toLowerCase().includes(q) ||
          item.category.name.toLowerCase().includes(q)
      );
    }

    return parsed;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductsCount(): Promise<number> {
  try {
    return await db.product.count({
      where: { status: "PUBLISHED" },
    });
  } catch (error) {
    console.error("Error counting products:", error);
    return 0;
  }
}

export async function getProductBySlug(slug: string, locale: string = DEFAULT_LOCALE): Promise<LocalizedProduct | null> {
  try {
    const product = await db.product.findUnique({
      where: { slug, status: "PUBLISHED" },
      include: {
        category: {
          include: {
            translations: true,
          },
        },
        translations: true,
      },
    });

    if (!product) return null;

    const translation =
      product.translations.find((t) => t.locale === locale) ||
      product.translations.find((t) => t.locale === DEFAULT_LOCALE) ||
      product.translations[0];

    const catTranslation =
      product.category.translations.find((t) => t.locale === locale) ||
      product.category.translations.find((t) => t.locale === DEFAULT_LOCALE) ||
      product.category.translations[0];

    let images: string[] = [];
    try {
      images = JSON.parse(product.images);
    } catch {
      images = [product.images];
    }

    let technicalSpecs: Record<string, string> = {};
    try {
      if (product.technicalSpecs) technicalSpecs = JSON.parse(product.technicalSpecs);
    } catch {}

    let applications: string[] = [];
    try {
      if (product.applications) applications = JSON.parse(product.applications);
    } catch {}

    return {
      id: product.id,
      slug: product.slug,
      brand: product.brand,
      model: product.model,
      sku: product.sku,
      condition: product.condition,
      status: product.status,
      featured: product.featured,
      sortOrder: product.sortOrder,
      images,
      technicalSpecs,
      applications,
      title: translation?.title || product.slug,
      shortDescription: translation?.shortDescription || "",
      description: translation?.description || "",
      seoTitle: translation?.seoTitle || undefined,
      seoDescription: translation?.seoDescription || undefined,
      category: {
        id: product.category.id,
        slug: product.category.slug,
        name: catTranslation?.name || product.category.slug,
      },
    };
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
}

export async function getRelatedProducts(
  currentSlug: string,
  categoryId: string,
  locale: string = DEFAULT_LOCALE,
  limit: number = 3
): Promise<LocalizedProduct[]> {
  try {
    const products = await db.product.findMany({
      where: {
        categoryId,
        status: "PUBLISHED",
        slug: { not: currentSlug },
      },
      take: limit,
      include: {
        category: {
          include: {
            translations: true,
          },
        },
        translations: true,
      },
    });

    return products.map((p) => {
      const translation =
        p.translations.find((t) => t.locale === locale) ||
        p.translations.find((t) => t.locale === DEFAULT_LOCALE) ||
        p.translations[0];

      const catTranslation =
        p.category.translations.find((t) => t.locale === locale) ||
        p.category.translations.find((t) => t.locale === DEFAULT_LOCALE) ||
        p.category.translations[0];

      let images: string[] = [];
      try {
        images = JSON.parse(p.images);
      } catch {
        images = [p.images];
      }

      return {
        id: p.id,
        slug: p.slug,
        brand: p.brand,
        model: p.model,
        sku: p.sku,
        condition: p.condition,
        status: p.status,
        featured: p.featured,
        sortOrder: p.sortOrder,
        images,
        technicalSpecs: {},
        applications: [],
        title: translation?.title || p.slug,
        shortDescription: translation?.shortDescription || "",
        description: translation?.description || "",
        category: {
          id: p.category.id,
          slug: p.category.slug,
          name: catTranslation?.name || p.category.slug,
        },
      };
    });
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
}

export async function getServices(locale: string = DEFAULT_LOCALE): Promise<LocalizedService[]> {
  try {
    const services = await db.service.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      include: {
        translations: true,
      },
    });

    return services.map((s) => {
      const translation =
        s.translations.find((t) => t.locale === locale) ||
        s.translations.find((t) => t.locale === DEFAULT_LOCALE) ||
        s.translations[0];

      let details: any = {};
      try {
        if (translation?.details) details = JSON.parse(translation.details);
      } catch {}

      return {
        id: s.id,
        slug: s.slug,
        icon: s.icon,
        sortOrder: s.sortOrder,
        title: translation?.title || s.slug,
        shortDescription: translation?.shortDescription || "",
        description: translation?.description || "",
        details,
      };
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export async function getServiceBySlug(slug: string, locale: string = DEFAULT_LOCALE): Promise<LocalizedService | null> {
  try {
    const service = await db.service.findUnique({
      where: { slug, isActive: true },
      include: {
        translations: true,
      },
    });

    if (!service) return null;

    const translation =
      service.translations.find((t) => t.locale === locale) ||
      service.translations.find((t) => t.locale === DEFAULT_LOCALE) ||
      service.translations[0];

    let details: any = {};
    try {
      if (translation?.details) details = JSON.parse(translation.details);
    } catch {}

    return {
      id: service.id,
      slug: service.slug,
      icon: service.icon,
      sortOrder: service.sortOrder,
      title: translation?.title || service.slug,
      shortDescription: translation?.shortDescription || "",
      description: translation?.description || "",
      details,
    };
  } catch (error) {
    console.error("Error fetching service by slug:", error);
    return null;
  }
}

export async function getReferences(locale: string = DEFAULT_LOCALE): Promise<LocalizedReference[]> {
  try {
    const references = await db.reference.findMany({
      where: { isActive: true, hasPublishPermission: true },
      orderBy: { sortOrder: "asc" },
      include: {
        translations: true,
      },
    });

    return references.map((r) => {
      const translation =
        r.translations.find((t) => t.locale === locale) ||
        r.translations.find((t) => t.locale === DEFAULT_LOCALE) ||
        r.translations[0];

      return {
        id: r.id,
        companyName: r.companyName,
        clientName: r.clientName,
        position: r.position,
        sector: r.sector,
        city: r.city,
        rating: r.rating,
        serviceScope: r.serviceScope,
        quote: translation?.quote || "",
      };
    });
  } catch (error) {
    console.error("Error fetching references:", error);
    return [];
  }
}

export async function getCatalogs(locale: string = DEFAULT_LOCALE) {
  try {
    return await db.catalog.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
  } catch (error) {
    console.error("Error fetching catalogs:", error);
    return [];
  }
}

export async function getFaqs(locale: string = DEFAULT_LOCALE) {
  try {
    const faqs = await db.faq.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      include: {
        translations: true,
      },
    });

    return faqs.map((f) => {
      const translation =
        f.translations.find((t) => t.locale === locale) ||
        f.translations.find((t) => t.locale === DEFAULT_LOCALE) ||
        f.translations[0];

      return {
        id: f.id,
        category: f.category,
        question: translation?.question || "",
        answer: translation?.answer || "",
      };
    });
  } catch (error) {
    console.error("Error fetching faqs:", error);
    return [];
  }
}
