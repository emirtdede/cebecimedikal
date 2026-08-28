"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe, Check } from "lucide-react";
import { LOCALES, Locale, LOCALE_METADATA } from "@/lib/i18n";
import { Dictionary } from "@/lib/dictionary";
import { trackClientEvent } from "@/features/analytics/AnalyticsTracker";

export function LanguageSelector({
  currentLocale,
  dict,
}: {
  currentLocale: Locale;
  dict: Dictionary;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (newLocale: Locale) => {
    if (newLocale === currentLocale) {
      setIsOpen(false);
      return;
    }

    trackClientEvent("language_change", { label: newLocale });

    const segments = pathname.split("/");
    // pathname usually starts with /locale/...
    if (LOCALES.includes(segments[1] as Locale)) {
      segments[1] = newLocale;
    } else {
      segments.unshift("", newLocale);
    }

    const newPath = segments.join("/") || `/${newLocale}`;
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-surface-2 text-foreground-muted hover:text-primary transition-colors flex items-center justify-center focus:outline-none"
        aria-label={dict.nav.language}
        title={dict.nav.language}
      >
        <Globe className="w-4 h-4 text-primary" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-44 rounded-lg shadow-xl bg-surface border border-border py-1.5 z-50 animate-dropdown">
            <div className="px-3 py-1.5 text-xs font-semibold text-foreground-muted border-b border-border">
              {dict.nav.language}
            </div>
            {LOCALES.map((loc) => {
              const meta = LOCALE_METADATA[loc];
              const isSelected = loc === currentLocale;
              return (
                <button
                  key={loc}
                  type="button"
                  onClick={() => handleLanguageChange(loc)}
                  className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:bg-surface-2 transition-colors ${
                    isSelected ? "text-primary font-semibold" : "text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-surface-2 text-foreground-muted">
                      {meta.flag}
                    </span>
                    <span>{meta.nativeName}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-primary" />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
