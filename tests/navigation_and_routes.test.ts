import { describe, it, expect } from "vitest";
import { LOCALES, DEFAULT_LOCALE, isValidLocale, getDirection } from "@/lib/i18n";
import { REVERSE_ROUTE_MAP, SERVICE_SLUG_MAP } from "@/lib/routes";
import {
  getStaticCategories,
  getStaticProducts,
  getStaticServices,
  getStaticReferences,
  getStaticCatalogs,
  getStaticFaqs,
} from "@/lib/static-data";

describe("Routing & Localization Map", () => {
  it("should have all 6 supported locales configured", () => {
    expect(LOCALES).toEqual(["tr", "en", "ar", "de", "ja", "zh"]);
    expect(DEFAULT_LOCALE).toBe("tr");
  });

  it("should correctly identify valid locales and RTL directions", () => {
    expect(isValidLocale("tr")).toBe(true);
    expect(isValidLocale("ar")).toBe(true);
    expect(isValidLocale("fr")).toBe(false);

    expect(getDirection("ar")).toBe("rtl");
    expect(getDirection("tr")).toBe("ltr");
    expect(getDirection("en")).toBe("ltr");
  });

  it("should contain bidirectional mappings for localized service and product routes", () => {
    expect(REVERSE_ROUTE_MAP["products"]).toBe("urunler");
    expect(REVERSE_ROUTE_MAP["services"]).toBe("hizmetler");
    expect(REVERSE_ROUTE_MAP["about"]).toBe("hakkimizda");
    expect(REVERSE_ROUTE_MAP["contact"]).toBe("iletisim");
    expect(REVERSE_ROUTE_MAP["quote"]).toBe("teklif");

    expect(SERVICE_SLUG_MAP["technical-service"]).toBe("teknik-servis");
    expect(SERVICE_SLUG_MAP["periodic-preventive-maintenance"]).toBe("periyodik-koruyucu-bakim");
  });
});

describe("Static Data & Inventory Integrity", () => {
  it("should load categories across all locales with complete metadata", () => {
    for (const locale of LOCALES) {
      const categories = getStaticCategories(locale);
      expect(categories.length).toBeGreaterThan(0);
      for (const cat of categories) {
        expect(cat.id).toBeDefined();
        expect(cat.slug).toBeDefined();
        expect(cat.name.length).toBeGreaterThan(0);
      }
    }
  });

  it("should load published products with valid image paths and technical specs", () => {
    const products = getStaticProducts("tr");
    expect(products.length).toBeGreaterThan(0);
    for (const prod of products) {
      expect(prod.slug).toBeDefined();
      expect(prod.brand.length).toBeGreaterThan(0);
      expect(prod.images.length).toBeGreaterThan(0);
    }
  });

  it("should load services, references, catalogs, and FAQs reliably", () => {
    expect(getStaticServices("tr").length).toBeGreaterThan(0);
    expect(getStaticReferences("tr").length).toBeGreaterThan(0);
    expect(getStaticCatalogs("tr").length).toBeGreaterThan(0);
    expect(getStaticFaqs("tr").length).toBeGreaterThan(0);
  });
});
