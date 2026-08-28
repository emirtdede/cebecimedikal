"use client";

import { useEffect, useState } from "react";
import { Palette, Check } from "lucide-react";
import { Dictionary } from "@/lib/dictionary";
import { trackClientEvent } from "@/features/analytics/AnalyticsTracker";

export type ThemeName = "navy" | "white" | "black" | "green";

const THEMES: { id: ThemeName; color: string }[] = [
  { id: "navy", color: "#07141C" },
  { id: "white", color: "#F7F9FA" },
  { id: "black", color: "#050607" },
  { id: "green", color: "#061612" },
];

export function ThemeToggle({ dict }: { dict: Dictionary }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>("navy");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem("cebeci_theme") as ThemeName) || "navy";
    setCurrentTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const changeTheme = (theme: ThemeName) => {
    setCurrentTheme(theme);
    localStorage.setItem("cebeci_theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    setIsOpen(false);
    trackClientEvent("theme_change", { label: theme });
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-surface-2 text-foreground-muted hover:text-primary transition-colors flex items-center justify-center focus:outline-none"
        aria-label={dict.nav.theme}
        title={dict.nav.theme}
      >
        <Palette className="w-4 h-4 text-primary" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-xl bg-surface border border-border py-1.5 z-50 animate-dropdown">
            <div className="px-3 py-1.5 text-xs font-semibold text-foreground-muted border-b border-border">
              {dict.nav.theme}
            </div>
            {THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => changeTheme(t.id)}
                className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:bg-surface-2 transition-colors ${
                  currentTheme === t.id ? "text-primary font-semibold" : "text-foreground"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-border inline-block shadow-sm"
                    style={{ backgroundColor: t.color }}
                  />
                  <span>{dict.theme[t.id]}</span>
                </div>
                {currentTheme === t.id && <Check className="w-4 h-4 text-primary" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
