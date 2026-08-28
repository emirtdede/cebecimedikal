import { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { LOCALES } from "@/lib/i18n";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cebecimedikal.com";

  const staticRoutes = [
    "",
    "/hakkimizda",
    "/urunler",
    "/2-el-tibbi-cihazlar",
    "/hizmetler",
    "/referanslar",
    "/kataloglar",
    "/teklif",
    "/iletisim",
    "/yasal/kvkk-aydinlatma-metni",
    "/yasal/gizlilik-politikasi",
    "/yasal/cerez-politikasi",
    "/yasal/kullanim-kosullari",
    "/yasal/yasal-uyari",
    "/yasal/erisilebilirlik-bildirimi",
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate localized entries for static routes
  for (const route of staticRoutes) {
    for (const locale of LOCALES) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "daily" : "weekly",
        priority: route === "" ? 1.0 : route.startsWith("/urunler") || route.startsWith("/teklif") ? 0.9 : 0.7,
      });
    }
  }

  // Dynamic Product Pages
  const products = await db.product.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true, updatedAt: true },
  });

  for (const prod of products) {
    for (const locale of LOCALES) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/urunler/${prod.slug}`,
        lastModified: prod.updatedAt,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  // Dynamic Service Pages
  const services = await db.service.findMany({
    select: { slug: true, updatedAt: true },
  });

  for (const srv of services) {
    for (const locale of LOCALES) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/hizmetler/${srv.slug}`,
        lastModified: srv.updatedAt,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return sitemapEntries;
}
