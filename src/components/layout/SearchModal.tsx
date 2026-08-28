"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import {
  Search,
  X,
  Box,
  Wrench,
  FileText,
  ArrowRight,
  Loader2,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Layers,
  CornerDownLeft,
  RefreshCw,
} from "lucide-react";
import { Dictionary, getDictionary } from "@/lib/dictionary";
import { Locale, isValidLocale, DEFAULT_LOCALE } from "@/lib/i18n";
import { trackClientEvent } from "@/features/analytics/AnalyticsTracker";

interface SearchProduct {
  id: string;
  slug: string;
  title: string;
  description: string;
  brand: string;
  model: string | null;
  condition?: "NEW" | "SECOND_HAND";
  category: string;
  categorySlug?: string;
  url: string;
}

interface SearchService {
  id: string;
  slug: string;
  title: string;
  description: string;
  url: string;
}

interface SearchCatalog {
  id: string;
  title: string;
  description: string;
  category: string;
  fileSize: string;
  url: string;
}

interface SearchPage {
  title: string;
  url: string;
  desc: string;
}

interface SearchResults {
  products: SearchProduct[];
  services: SearchService[];
  catalogs?: SearchCatalog[];
  pages: SearchPage[];
}

type FilterCategory = "all" | "products" | "secondhand" | "services" | "catalogs" | "pages";

export function SearchModal({
  isOpen,
  onClose,
  locale,
  dict,
}: {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
  dict: Dictionary;
}) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const [results, setResults] = useState<SearchResults>({
    products: [],
    services: [],
    catalogs: [],
    pages: [],
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  // Resolve current active locale dynamically
  let activeLocale = locale;
  if (params?.locale && typeof params.locale === "string" && isValidLocale(params.locale)) {
    activeLocale = params.locale as Locale;
  } else if (pathname) {
    const firstSeg = pathname.split("/")[1];
    if (isValidLocale(firstSeg)) {
      activeLocale = firstSeg as Locale;
    }
  }
  if (!activeLocale || !isValidLocale(activeLocale)) {
    activeLocale = DEFAULT_LOCALE;
  }

  const currentDict = getDictionary(activeLocale) || dict;
  const s = currentDict.search;

  // Reset & autofocus on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setShowAdvanced(false);
      setActiveFilter("all");
      setResults({ products: [], services: [], catalogs: [], pages: [] });
    }
  }, [isOpen]);

  // Debounced search query
  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults({ products: [], services: [], catalogs: [], pages: [] });
      setLoading(false);
      return;
    }

    setLoading(true);
    const handler = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(query)}&locale=${activeLocale}`
        );
        if (res.ok) {
          const data = await res.json();
          setResults({
            products: data.products || [],
            services: data.services || [],
            catalogs: data.catalogs || [],
            pages: data.pages || [],
          });
          setSelectedIndex(0);
          trackClientEvent("search", { label: query });
        }
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(handler);
  }, [query, activeLocale]);

  // Filtered items based on active filter
  const filteredProducts = useMemo(() => {
    if (activeFilter === "secondhand") {
      return results.products.filter((p) => p.condition === "SECOND_HAND");
    }
    if (activeFilter === "products" || activeFilter === "all") {
      return results.products;
    }
    return [];
  }, [results.products, activeFilter]);

  const filteredServices = useMemo(() => {
    return activeFilter === "all" || activeFilter === "services"
      ? results.services
      : [];
  }, [results.services, activeFilter]);

  const filteredCatalogs = useMemo(() => {
    return activeFilter === "all" || activeFilter === "catalogs"
      ? results.catalogs || []
      : [];
  }, [results.catalogs, activeFilter]);

  const filteredPages = useMemo(() => {
    return activeFilter === "all" || activeFilter === "pages"
      ? results.pages
      : [];
  }, [results.pages, activeFilter]);

  const allItems = useMemo(() => {
    return [
      ...filteredProducts.map((p) => ({ ...p, type: "product" })),
      ...filteredServices.map((s) => ({ ...s, type: "service" })),
      ...filteredCatalogs.map((c) => ({ ...c, type: "catalog" })),
      ...filteredPages.map((pg) => ({ ...pg, type: "page" })),
    ];
  }, [filteredProducts, filteredServices, filteredCatalogs, filteredPages]);

  const handleSelect = (url: string) => {
    onClose();
    router.push(url);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < allItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : allItems.length - 1));
    } else if (e.key === "Enter" && allItems[selectedIndex]) {
      e.preventDefault();
      handleSelect(allItems[selectedIndex].url);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-all duration-200 animate-fade-in"
      onClick={onClose}
      onKeyDown={handleKeyDown}
    >
      <div
        className="w-full max-w-2xl bg-surface border border-border rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden animate-modal flex flex-col max-h-[82vh] relative"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={s.title || "Arama Paneli"}
      >
        {/* 1. Clean Input Bar with ESC Button on Top Right */}
        <div className="relative flex items-center px-4 sm:px-5 py-4 border-b border-border bg-surface-2/30">
          <Search className="w-5 h-5 text-primary mr-3.5 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={s.placeholder || "Cihaz, model, hizmet veya sayfa ara..."}
            className="w-full bg-transparent text-foreground placeholder:text-foreground-muted text-base sm:text-lg focus:outline-none"
          />

          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
            {loading && <Loader2 className="w-4 h-4 text-primary animate-spin" />}

            {query ? (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                className="p-1 rounded-md text-foreground-muted hover:text-foreground hover:bg-surface-2 transition-colors"
                title={s.clear || "Temizle"}
              >
                <X className="w-4 h-4" />
              </button>
            ) : null}

            {/* ESC Close Button in Top Right */}
            <button
              type="button"
              onClick={onClose}
              className="px-2.5 py-1 rounded-lg bg-surface hover:bg-surface-2 border border-border hover:border-primary/40 text-foreground text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm group"
              title={s.pressEsc || "Kapat (ESC)"}
            >
              <span className="font-mono text-[11px] text-foreground-muted group-hover:text-primary transition-colors">
                ESC
              </span>
              <X className="w-3.5 h-3.5 text-foreground-muted group-hover:text-primary transition-colors" />
            </button>
          </div>
        </div>

        {/* 2. Wide Advanced Search Toggle Button Under Search Input */}
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`w-full px-4 sm:px-5 py-2.5 flex items-center justify-between text-xs font-semibold border-b border-border/80 transition-all ${
            showAdvanced || activeFilter !== "all"
              ? "bg-primary/10 text-primary border-primary/30"
              : "bg-surface-2/40 text-foreground-muted hover:bg-surface-2 hover:text-foreground"
          }`}
        >
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-primary" />
            <span>{s.advancedFilters || "Gelişmiş Arama & Kategori Filtreleri"}</span>
            {activeFilter !== "all" && (
              <span className="px-2 py-0.5 rounded-full bg-primary text-white text-[10px] font-bold shadow-sm">
                {s.activeFilter || "Aktif Filtre"}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <span>
              {showAdvanced
                ? s.closeFilters || "Filtreleri Kapat"
                : s.openFilters || "Filtreleri Aç"}
            </span>
            {showAdvanced ? (
              <ChevronUp className="w-3.5 h-3.5 text-primary" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </div>
        </button>

        {/* 3. Smooth Collapsible Filter Chips Panel */}
        {showAdvanced && (
          <div className="px-4 sm:px-5 py-3 border-b border-border/70 bg-surface-2/50 flex items-center gap-2 overflow-x-auto text-xs animate-dropdown">
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-1 rounded-full font-semibold transition-colors flex items-center gap-1.5 flex-shrink-0 ${
                activeFilter === "all"
                  ? "bg-primary text-white shadow-sm"
                  : "bg-surface text-foreground-muted hover:text-foreground hover:bg-surface-2"
              }`}
            >
              <span>{s.all || "Tümü"}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("products")}
              className={`px-3 py-1 rounded-full font-semibold transition-colors flex items-center gap-1.5 flex-shrink-0 ${
                activeFilter === "products"
                  ? "bg-primary text-white shadow-sm"
                  : "bg-surface text-foreground-muted hover:text-foreground hover:bg-surface-2"
              }`}
            >
              <Box className="w-3 h-3" />
              <span>{s.products || "Tıbbi Cihazlar"}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("secondhand")}
              className={`px-3 py-1 rounded-full font-semibold transition-colors flex items-center gap-1.5 flex-shrink-0 ${
                activeFilter === "secondhand"
                  ? "bg-primary text-white shadow-sm"
                  : "bg-surface text-foreground-muted hover:text-foreground hover:bg-surface-2"
              }`}
            >
              <RefreshCw className="w-3 h-3" />
              <span>{s.secondHand || "2. El Cihazlar"}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("services")}
              className={`px-3 py-1 rounded-full font-semibold transition-colors flex items-center gap-1.5 flex-shrink-0 ${
                activeFilter === "services"
                  ? "bg-primary text-white shadow-sm"
                  : "bg-surface text-foreground-muted hover:text-foreground hover:bg-surface-2"
              }`}
            >
              <Wrench className="w-3 h-3" />
              <span>{s.services || "Hizmetler"}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("catalogs")}
              className={`px-3 py-1 rounded-full font-semibold transition-colors flex items-center gap-1.5 flex-shrink-0 ${
                activeFilter === "catalogs"
                  ? "bg-primary text-white shadow-sm"
                  : "bg-surface text-foreground-muted hover:text-foreground hover:bg-surface-2"
              }`}
            >
              <FileText className="w-3 h-3" />
              <span>{s.catalogs || "Kataloglar"}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("pages")}
              className={`px-3 py-1 rounded-full font-semibold transition-colors flex items-center gap-1.5 flex-shrink-0 ${
                activeFilter === "pages"
                  ? "bg-primary text-white shadow-sm"
                  : "bg-surface text-foreground-muted hover:text-foreground hover:bg-surface-2"
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>{s.pages || "Sayfalar"}</span>
            </button>
          </div>
        )}

        {/* 4. Results List Body with Increased Bottom Padding */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 pb-8 space-y-4 min-h-[140px]">
          {/* Empty / Idle State */}
          {query.trim().length < 2 && (
            <div className="text-center py-6 text-foreground-muted text-xs sm:text-sm">
              <p>{s.idleHint || "Aramak istediğiniz cihaz adı, marka, model veya hizmeti yazın."}</p>
            </div>
          )}

          {/* No Results */}
          {query.trim().length >= 2 && allItems.length === 0 && !loading && (
            <div className="text-center py-10 text-foreground-muted text-sm space-y-1">
              <p className="font-semibold text-foreground">
                &ldquo;{query}&rdquo; {s.noResultsTitle || "ile eşleşen sonuç bulunamadı."}
              </p>
              <p className="text-xs text-foreground-muted">
                {s.noResultsHint || "Lütfen farklı bir arama terimi deneyin."}
              </p>
            </div>
          )}

          {/* Products Section */}
          {filteredProducts.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-primary px-2 py-1 flex items-center gap-1.5">
                <Box className="w-3.5 h-3.5" />
                <span>
                  {s.products || "Tıbbi Cihazlar"} ({filteredProducts.length})
                </span>
              </div>
              <div className="space-y-1 mt-1">
                {filteredProducts.map((product, idx) => {
                  const itemIndex = idx;
                  const isSelected = selectedIndex === itemIndex;
                  return (
                    <div
                      key={product.id}
                      onClick={() => handleSelect(product.url)}
                      onMouseEnter={() => setSelectedIndex(itemIndex)}
                      className={`px-3.5 py-2.5 rounded-xl cursor-pointer flex items-center justify-between transition-colors ${
                        isSelected
                          ? "bg-primary/15 border border-primary/30 text-foreground"
                          : "hover:bg-surface-2 text-foreground"
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <div className="text-sm font-semibold flex items-center gap-2 flex-wrap">
                          <span>{product.title}</span>
                          {product.brand && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-surface-2 border border-border text-foreground-muted">
                              {product.brand}
                            </span>
                          )}
                          {product.condition === "SECOND_HAND" && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/15 border border-amber-500/30 text-amber-500 font-semibold">
                              {s.secondHandBadge || "2. El"}
                            </span>
                          )}
                        </div>
                        {product.description && (
                          <div className="text-xs text-foreground-muted line-clamp-1 mt-0.5">
                            {product.description}
                          </div>
                        )}
                      </div>
                      <ArrowRight className="w-4 h-4 text-primary opacity-70 flex-shrink-0" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Services Section */}
          {filteredServices.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-primary px-2 py-1 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5" />
                <span>
                  {s.services || "Hizmetler"} ({filteredServices.length})
                </span>
              </div>
              <div className="space-y-1 mt-1">
                {filteredServices.map((service, idx) => {
                  const itemIndex = filteredProducts.length + idx;
                  const isSelected = selectedIndex === itemIndex;
                  return (
                    <div
                      key={service.id}
                      onClick={() => handleSelect(service.url)}
                      onMouseEnter={() => setSelectedIndex(itemIndex)}
                      className={`px-3.5 py-2.5 rounded-xl cursor-pointer flex items-center justify-between transition-colors ${
                        isSelected
                          ? "bg-primary/15 border border-primary/30 text-foreground"
                          : "hover:bg-surface-2 text-foreground"
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <div className="text-sm font-semibold">{service.title}</div>
                        {service.description && (
                          <div className="text-xs text-foreground-muted line-clamp-1 mt-0.5">
                            {service.description}
                          </div>
                        )}
                      </div>
                      <ArrowRight className="w-4 h-4 text-primary opacity-70 flex-shrink-0" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Catalogs Section */}
          {filteredCatalogs.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-primary px-2 py-1 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>
                  {s.catalogs || "Kataloglar"} ({filteredCatalogs.length})
                </span>
              </div>
              <div className="space-y-1 mt-1">
                {filteredCatalogs.map((catalog, idx) => {
                  const itemIndex =
                    filteredProducts.length + filteredServices.length + idx;
                  const isSelected = selectedIndex === itemIndex;
                  return (
                    <div
                      key={catalog.id}
                      onClick={() => handleSelect(catalog.url)}
                      onMouseEnter={() => setSelectedIndex(itemIndex)}
                      className={`px-3.5 py-2.5 rounded-xl cursor-pointer flex items-center justify-between transition-colors ${
                        isSelected
                          ? "bg-primary/15 border border-primary/30 text-foreground"
                          : "hover:bg-surface-2 text-foreground"
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <div className="text-sm font-semibold flex items-center gap-2">
                          <span>{catalog.title}</span>
                          {catalog.fileSize && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-surface-2 text-foreground-muted">
                              {catalog.fileSize}
                            </span>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-primary opacity-70 flex-shrink-0" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Pages Section */}
          {filteredPages.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-primary px-2 py-1 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>
                  {s.pages || "Sayfalar"} ({filteredPages.length})
                </span>
              </div>
              <div className="space-y-1 mt-1">
                {filteredPages.map((page, idx) => {
                  const itemIndex =
                    filteredProducts.length +
                    filteredServices.length +
                    filteredCatalogs.length +
                    idx;
                  const isSelected = selectedIndex === itemIndex;
                  return (
                    <div
                      key={page.url}
                      onClick={() => handleSelect(page.url)}
                      onMouseEnter={() => setSelectedIndex(itemIndex)}
                      className={`px-3.5 py-2.5 rounded-xl cursor-pointer flex items-center justify-between transition-colors ${
                        isSelected
                          ? "bg-primary/15 border border-primary/30 text-foreground"
                          : "hover:bg-surface-2 text-foreground"
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <div className="text-sm font-semibold">{page.title}</div>
                        <div className="text-xs text-foreground-muted line-clamp-1 mt-0.5">
                          {page.desc}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-primary opacity-70 flex-shrink-0" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 5. Spacious Command Footer */}
        <div className="px-5 py-3 border-t border-border bg-surface-2/40 flex items-center justify-between text-xs text-foreground-muted">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-surface border border-border rounded text-[10px] font-bold">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-surface border border-border rounded text-[10px] font-bold">↓</kbd>
              <span className="ml-0.5">{s.navigate || "Gezin"}</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-surface border border-border rounded text-[10px] font-bold flex items-center gap-0.5">
                <CornerDownLeft className="w-2.5 h-2.5" /> ENTER
              </kbd>
              <span className="ml-0.5">{s.select || "Seç"}</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-surface border border-border rounded text-[10px] font-bold">ESC</kbd>
              <span className="ml-0.5">{s.close || "Kapat"}</span>
            </span>
          </div>

          <span className="text-[11px] font-medium hidden sm:inline">
            {query.length >= 2
              ? `${allItems.length} ${s.resultsCount || "sonuç"}`
              : s.brandTag || "Cebeci Medikal Hızlı Arama"}
          </span>
        </div>
      </div>
    </div>
  );
}
