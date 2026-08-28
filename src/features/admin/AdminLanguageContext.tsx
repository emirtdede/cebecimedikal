"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Locale, LOCALES, LOCALE_METADATA } from "@/lib/i18n";
import trDict from "@/locales/tr.json";
import enDict from "@/locales/en.json";
import deDict from "@/locales/de.json";
import arDict from "@/locales/ar.json";
import jaDict from "@/locales/ja.json";
import zhDict from "@/locales/zh.json";

const dictionaries: Record<string, any> = {
  tr: trDict,
  en: enDict,
  de: deDict,
  ar: arDict,
  ja: jaDict,
  zh: zhDict,
};

interface AdminLanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dict: any;
  meta: any;
}

const AdminLanguageContext = createContext<AdminLanguageContextType>({
  locale: "tr",
  setLocale: () => {},
  dict: trDict,
  meta: LOCALE_METADATA.tr,
});

export function AdminLanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("tr");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cebeci_admin_locale") as Locale;
      if (saved && LOCALES.includes(saved)) {
        setLocaleState(saved);
        if (saved === "ar") {
          document.documentElement.dir = "rtl";
        } else {
          document.documentElement.dir = "ltr";
        }
      }
    } catch {
      // Ignore localStorage error
    }
  }, []);

  const setLocale = (newLoc: Locale) => {
    setLocaleState(newLoc);
    try {
      localStorage.setItem("cebeci_admin_locale", newLoc);
      if (newLoc === "ar") {
        document.documentElement.dir = "rtl";
      } else {
        document.documentElement.dir = "ltr";
      }
    } catch {
      // Ignore
    }
  };

  const dict = dictionaries[locale] || trDict;
  const meta = LOCALE_METADATA[locale] || LOCALE_METADATA.tr;

  return (
    <AdminLanguageContext.Provider value={{ locale, setLocale, dict, meta }}>
      {children}
    </AdminLanguageContext.Provider>
  );
}

export function useAdminLanguage() {
  return useContext(AdminLanguageContext);
}
