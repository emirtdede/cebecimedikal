"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAdminLanguage } from "./AdminLanguageContext";
import { LOCALES, LOCALE_METADATA, Locale } from "@/lib/i18n";
import { Languages, ChevronDown, Check } from "lucide-react";

export function AdminLanguageSwitcher() {
  const { locale, setLocale, meta } = useAdminLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-2 hover:bg-surface border border-border text-xs font-semibold text-foreground transition-colors cursor-pointer"
        title="Panel Dilini Değiştir"
      >
        <span className="text-sm">{meta.flag}</span>
        <span className="uppercase text-[11px] font-bold">{locale}</span>
        <ChevronDown className={`w-3 h-3 text-foreground-muted transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-surface border border-border shadow-2xl py-1.5 z-50 animate-dropdown">
          <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-foreground-muted tracking-wider border-b border-border mb-1">
            Panel Dili / Language
          </div>
          {LOCALES.map((loc) => {
            const m = LOCALE_METADATA[loc];
            const isSelected = loc === locale;
            return (
              <button
                key={loc}
                type="button"
                onClick={() => {
                  setLocale(loc);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors hover:bg-surface-2 text-left cursor-pointer ${
                  isSelected ? "text-primary font-bold bg-primary/5" : "text-foreground"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{m.flag}</span>
                  <span>{m.name}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-primary" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
