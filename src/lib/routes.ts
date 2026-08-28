import { Locale, DEFAULT_LOCALE } from "./i18n";

export interface RouteMapping {
  products: string;
  services: string;
  about: string;
  contact: string;
  quote: string;
  catalogs: string;
  references: string;
  secondHand: string;
}

export const LOCALIZED_ROUTES: Record<string, RouteMapping> = {
  tr: {
    products: "urunler",
    services: "hizmetler",
    about: "hakkimizda",
    contact: "iletisim",
    quote: "teklif",
    catalogs: "kataloglar",
    references: "referanslar",
    secondHand: "2-el-tibbi-cihazlar",
  },
  en: {
    products: "products",
    services: "services",
    about: "about",
    contact: "contact",
    quote: "quote",
    catalogs: "catalogs",
    references: "references",
    secondHand: "refurbished-equipment",
  },
  de: {
    products: "produkte",
    services: "dienstleistungen",
    about: "ueber-uns",
    contact: "kontakt",
    quote: "angebot",
    catalogs: "kataloge",
    references: "referenzen",
    secondHand: "gebrauchtgeraete",
  },
  ar: {
    products: "products",
    services: "services",
    about: "about",
    contact: "contact",
    quote: "quote",
    catalogs: "catalogs",
    references: "references",
    secondHand: "refurbished-equipment",
  },
  ja: {
    products: "products",
    services: "services",
    about: "about",
    contact: "contact",
    quote: "quote",
    catalogs: "catalogs",
    references: "references",
    secondHand: "refurbished-equipment",
  },
  zh: {
    products: "products",
    services: "services",
    about: "about",
    contact: "contact",
    quote: "quote",
    catalogs: "catalogs",
    references: "references",
    secondHand: "refurbished-equipment",
  },
};

// Map localized segments back to physical app directory names
export const REVERSE_ROUTE_MAP: Record<string, string> = {
  // English
  products: "urunler",
  services: "hizmetler",
  about: "hakkimizda",
  contact: "iletisim",
  quote: "teklif",
  catalogs: "kataloglar",
  references: "referanslar",
  "refurbished-equipment": "2-el-tibbi-cihazlar",

  // German
  produkte: "urunler",
  dienstleistungen: "hizmetler",
  "ueber-uns": "hakkimizda",
  kontakt: "iletisim",
  angebot: "teklif",
  kataloge: "kataloglar",
  referenzen: "referanslar",
  gebrauchtgeraete: "2-el-tibbi-cihazlar",

  // Turkish (identity)
  urunler: "urunler",
  hizmetler: "hizmetler",
  hakkimizda: "hakkimizda",
  iletisim: "iletisim",
  teklif: "teklif",
  kataloglar: "kataloglar",
  referanslar: "referanslar",
  "2-el-tibbi-cihazlar": "2-el-tibbi-cihazlar",
};

// Localized Service Slug Mapping
export const SERVICE_SLUG_MAP: Record<string, string> = {
  "technical-service": "teknik-servis",
  "preventive-maintenance": "periyodik-koruyucu-bakim",
  "installation-commissioning": "kurulum-devreye-alma",
  "biomedical-consulting": "teknik-danismanlik",

  "wartung-reparatur": "teknik-servis",
  "praeventive-wartung": "periyodik-koruyucu-bakim",
  "montage-inbetriebnahme": "kurulum-devreye-alma",
  "biomedizinische-beratung": "teknik-danismanlik",

  // Identity
  "teknik-servis": "teknik-servis",
  "periyodik-koruyucu-bakim": "periyodik-koruyucu-bakim",
  "kurulum-devreye-alma": "kurulum-devreye-alma",
  "teknik-danismanlik": "teknik-danismanlik",
};

export function getLocalizedHref(
  locale: string = DEFAULT_LOCALE,
  routeKey: keyof RouteMapping,
  slug?: string
): string {
  const routes = LOCALIZED_ROUTES[locale] || LOCALIZED_ROUTES.en;
  const segment = routes[routeKey] || routeKey;
  return slug ? `/${locale}/${segment}/${slug}` : `/${locale}/${segment}`;
}
