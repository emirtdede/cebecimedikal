"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, Settings, Check, X } from "lucide-react";
import { Dictionary } from "@/lib/dictionary";
import { getOrCreateVisitorId } from "@/features/analytics/AnalyticsTracker";

export function CookieBanner({ dict }: { dict: Dictionary }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    preferences: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem("cebeci_cookie_consent");
    if (!saved) {
      const timer = setTimeout(() => setIsVisible(true), 600);
      return () => clearTimeout(timer);
    } else {
      try {
        setPreferences(JSON.parse(saved));
      } catch {}
    }

    const openHandler = () => {
      setIsModalOpen(true);
    };
    window.addEventListener("open-cookie-settings", openHandler);
    return () => window.removeEventListener("open-cookie-settings", openHandler);
  }, []);

  const saveConsent = async (consentState: typeof preferences) => {
    localStorage.setItem("cebeci_cookie_consent", JSON.stringify(consentState));
    setIsVisible(false);
    setIsModalOpen(false);

    const visitorId = getOrCreateVisitorId();
    if (visitorId) {
      try {
        await fetch("/api/analytics/consent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            visitorId,
            ...consentState,
          }),
        });
      } catch {}
    }
  };

  const handleAcceptAll = () => {
    const all = {
      necessary: true,
      preferences: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(all);
    saveConsent(all);
  };

  const handleRejectNonEssential = () => {
    const essentialOnly = {
      necessary: true,
      preferences: false,
      analytics: false,
      marketing: false,
    };
    setPreferences(essentialOnly);
    saveConsent(essentialOnly);
  };

  const handleSaveCustom = () => {
    saveConsent(preferences);
  };

  return (
    <>
      {/* Bottom Center Solid Opaque Banner */}
      {isVisible && !isModalOpen && (
        <div
          className="fixed bottom-6 inset-x-0 mx-auto max-w-5xl px-4 z-50 pointer-events-none animate-slide-up"
          role="region"
          aria-label={dict.cookie.title}
        >
          <aside className="w-full bg-surface border-2 border-border rounded-2xl p-5 sm:p-6 shadow-2xl pointer-events-auto space-y-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-primary/15 text-primary flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="flex-1 space-y-0.5">
                <h2 className="text-sm sm:text-base font-bold text-foreground">
                  {dict.cookie.title}
                </h2>
                <p className="text-xs text-foreground-muted leading-relaxed">
                  {dict.cookie.description}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="w-full py-3 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold shadow-md transition-colors text-center flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>{dict.cookie.acceptAll}</span>
              </button>
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="w-full py-3 px-4 rounded-xl bg-surface-2 hover:bg-surface border border-border text-foreground text-xs sm:text-sm font-semibold transition-colors text-center flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                <span>{dict.cookie.rejectNonEssential}</span>
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full py-3 px-4 rounded-xl bg-surface-2 hover:bg-surface border border-border text-foreground-muted hover:text-foreground text-xs sm:text-sm font-semibold transition-colors text-center flex items-center justify-center gap-2"
              >
                <Settings className="w-4 h-4 text-primary" />
                <span>{dict.cookie.managePreferences}</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Preferences Detailed Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-surface border-2 border-border rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden animate-modal space-y-6"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/15 text-primary">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-foreground">
                  {dict.cookie.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl text-foreground-muted hover:text-foreground hover:bg-surface-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-1">
              {/* Necessary */}
              <div className="p-4 rounded-2xl bg-surface-2/60 border border-border">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-bold text-foreground flex items-center gap-2">
                    {dict.cookie.necessary}
                    <span className="text-[10px] uppercase px-2 py-0.5 rounded-md bg-primary/20 text-primary font-bold">
                      Zorunlu
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={true}
                    disabled={true}
                    className="w-4 h-4 rounded text-primary border-border cursor-not-allowed opacity-75"
                  />
                </div>
                <p className="text-xs text-foreground-muted leading-relaxed">{dict.cookie.necessaryDesc}</p>
              </div>

              {/* Preferences */}
              <div className="p-4 rounded-2xl bg-surface-2/60 border border-border">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-bold text-foreground">{dict.cookie.preferences}</span>
                  <input
                    type="checkbox"
                    checked={preferences.preferences}
                    onChange={(e) =>
                      setPreferences({ ...preferences, preferences: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-primary border-border cursor-pointer accent-primary"
                  />
                </div>
                <p className="text-xs text-foreground-muted leading-relaxed">{dict.cookie.preferencesDesc}</p>
              </div>

              {/* Analytics */}
              <div className="p-4 rounded-2xl bg-surface-2/60 border border-border">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-bold text-foreground">{dict.cookie.analytics}</span>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) =>
                      setPreferences({ ...preferences, analytics: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-primary border-border cursor-pointer accent-primary"
                  />
                </div>
                <p className="text-xs text-foreground-muted leading-relaxed">{dict.cookie.analyticsDesc}</p>
              </div>

              {/* Marketing */}
              <div className="p-4 rounded-2xl bg-surface-2/60 border border-border">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-bold text-foreground">{dict.cookie.marketing}</span>
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) =>
                      setPreferences({ ...preferences, marketing: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-primary border-border cursor-pointer accent-primary"
                  />
                </div>
                <p className="text-xs text-foreground-muted leading-relaxed">{dict.cookie.marketingDesc}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="w-full py-3 rounded-xl bg-surface-2 hover:bg-surface border border-border text-foreground text-xs font-semibold transition-colors"
              >
                {dict.cookie.rejectNonEssential}
              </button>
              <button
                type="button"
                onClick={handleSaveCustom}
                className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{dict.cookie.savePreferences}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
