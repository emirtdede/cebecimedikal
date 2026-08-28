export const LOCALES = ["tr", "en", "ar", "de", "ja", "zh"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "tr";

export const LOCALE_METADATA: Record<
  Locale,
  { name: string; nativeName: string; dir: "ltr" | "rtl"; flag: string }
> = {
  tr: { name: "Turkish", nativeName: "Türkçe", dir: "ltr", flag: "TR" },
  en: { name: "English", nativeName: "English", dir: "ltr", flag: "EN" },
  ar: { name: "Arabic", nativeName: "العربية", dir: "rtl", flag: "AR" },
  de: { name: "German", nativeName: "Deutsch", dir: "ltr", flag: "DE" },
  ja: { name: "Japanese", nativeName: "日本語", dir: "ltr", flag: "JA" },
  zh: { name: "Chinese", nativeName: "中文", dir: "ltr", flag: "ZH" },
};

export function isValidLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale);
}

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return LOCALE_METADATA[locale]?.dir || "ltr";
}
