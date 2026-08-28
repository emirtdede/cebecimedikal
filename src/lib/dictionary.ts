import { Locale, DEFAULT_LOCALE, isValidLocale } from "./i18n";
import tr from "../locales/tr.json";
import en from "../locales/en.json";
import ar from "../locales/ar.json";
import de from "../locales/de.json";
import ja from "../locales/ja.json";
import zh from "../locales/zh.json";

export type Dictionary = typeof tr;

const dictionaries: Record<Locale, Dictionary> = {
  tr,
  en,
  ar,
  de,
  ja,
  zh,
};

export function getDictionary(locale: string): Dictionary {
  if (isValidLocale(locale)) {
    return dictionaries[locale];
  }
  return dictionaries[DEFAULT_LOCALE];
}
