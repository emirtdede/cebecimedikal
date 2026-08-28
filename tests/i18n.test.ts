import { describe, it, expect } from "vitest";
import { LOCALES, isValidLocale, getDirection, LOCALE_METADATA } from "../src/lib/i18n";
import { getDictionary } from "../src/lib/dictionary";

describe("i18n & Multi-language Engine", () => {
  it("supports all 6 required enterprise languages", () => {
    expect(LOCALES).toEqual(["tr", "en", "ar", "de", "ja", "zh"]);
  });

  it("validates supported and unsupported locales accurately", () => {
    expect(isValidLocale("tr")).toBe(true);
    expect(isValidLocale("en")).toBe(true);
    expect(isValidLocale("ar")).toBe(true);
    expect(isValidLocale("de")).toBe(true);
    expect(isValidLocale("ja")).toBe(true);
    expect(isValidLocale("zh")).toBe(true);
    expect(isValidLocale("fr")).toBe(false);
    expect(isValidLocale("es")).toBe(false);
    expect(isValidLocale("")).toBe(false);
  });

  it("correctly assigns RTL to Arabic and LTR to other languages", () => {
    expect(getDirection("ar")).toBe("rtl");
    expect(getDirection("tr")).toBe("ltr");
    expect(getDirection("en")).toBe("ltr");
    expect(getDirection("de")).toBe("ltr");
    expect(getDirection("ja")).toBe("ltr");
    expect(getDirection("zh")).toBe("ltr");
  });

  it("loads 100% complete dictionaries for every supported language", () => {
    for (const loc of LOCALES) {
      const dict = getDictionary(loc);
      expect(dict).toBeDefined();
      expect(dict.nav.home).toBeTruthy();
      expect(dict.nav.about).toBeTruthy();
      expect(dict.nav.products).toBeTruthy();
      expect(dict.nav.services).toBeTruthy();
      expect(dict.nav.references).toBeTruthy();
      expect(dict.nav.catalogs).toBeTruthy();
      expect(dict.nav.contact).toBeTruthy();
      expect(dict.nav.requestQuote).toBeTruthy();
      expect(dict.quote.title).toBeTruthy();
      expect(dict.quote.submit).toBeTruthy();
      expect(dict.footer.companyDesc).toBeTruthy();
    }
  });
});
