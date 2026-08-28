"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, Loader2, X } from "lucide-react";
import { Dictionary } from "@/lib/dictionary";

interface CategoryOption {
  id: string;
  slug: string;
  name: string;
}

export function ProductFilterBar({
  categories,
  dict,
  totalCount,
  currentLocale,
}: {
  categories: CategoryOption[];
  dict: Dictionary;
  totalCount: number;
  currentLocale: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentQ = searchParams.get("q") || "";
  const currentKategori = searchParams.get("kategori") || "";
  const currentDurum = searchParams.get("durum") || "ALL";

  const [searchValue, setSearchValue] = useState(currentQ);
  const [selectedCategory, setSelectedCategory] = useState(currentKategori);
  const [selectedCondition, setSelectedCondition] = useState(currentDurum);

  useEffect(() => {
    setSearchValue(currentQ);
    setSelectedCategory(currentKategori);
    setSelectedCondition(currentDurum);
  }, [currentQ, currentKategori, currentDurum]);

  const applyFilters = (newQ?: string, newCat?: string, newDurum?: string) => {
    const q = newQ !== undefined ? newQ : searchValue;
    const cat = newCat !== undefined ? newCat : selectedCategory;
    const durum = newDurum !== undefined ? newDurum : selectedCondition;

    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (cat && cat !== "") params.set("kategori", cat);
    if (durum && durum !== "ALL") params.set("durum", durum);

    const queryString = params.toString();
    startTransition(() => {
      router.push(`${pathname}${queryString ? `?${queryString}` : ""}`);
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedCategory(val);
    applyFilters(undefined, val, undefined);
  };

  const handleConditionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedCondition(val);
    applyFilters(undefined, undefined, val);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  const hasActiveFilters = Boolean(currentKategori || (currentDurum && currentDurum !== "ALL") || currentQ);

  return (
    <div className="p-6 rounded-2xl bg-surface border border-border shadow-sm space-y-4">
      <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        {/* Search Input */}
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-primary absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            name="q"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                applyFilters(searchValue);
              }
            }}
            placeholder={dict.products.searchPlaceholder}
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-primary"
          />
          {searchValue && (
            <button
              type="button"
              onClick={() => {
                setSearchValue("");
                applyFilters("");
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="sm:col-span-3">
          <select
            name="kategori"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-foreground focus:outline-none focus:border-primary cursor-pointer"
          >
            <option value="">{dict.categories.title}</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Condition Filter */}
        <div className="sm:col-span-3">
          <select
            name="durum"
            value={selectedCondition}
            onChange={handleConditionChange}
            className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-foreground focus:outline-none focus:border-primary cursor-pointer"
          >
            <option value="ALL">{dict.products.allConditions}</option>
            <option value="NEW">{dict.products.new}</option>
            <option value="SECOND_HAND">{dict.products.secondHand}</option>
          </select>
        </div>

        {/* Bottom Bar: Counts & Actions */}
        <div className="sm:col-span-12 flex items-center justify-between pt-2 border-t border-border/60">
          <div className="flex items-center gap-2">
            <span className="text-xs text-foreground-muted font-medium">
              <span className="font-bold text-foreground">{totalCount}</span> {dict.categories.productsCount}
            </span>
            {isPending && <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" />}
          </div>

          <div className="flex items-center gap-3">
            {hasActiveFilters && (
              <Link
                href={`/${currentLocale}/urunler`}
                onClick={() => {
                  setSearchValue("");
                  setSelectedCategory("");
                  setSelectedCondition("ALL");
                }}
                className="text-xs text-foreground-muted hover:text-primary transition-colors"
              >
                {dict.products.clearFilters}
              </Link>
            )}
            <button
              type="submit"
              disabled={isPending}
              className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5 focus:outline-none disabled:opacity-70"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>{dict.common.loading}</span>
                </>
              ) : (
                <span>{dict.common.filter}</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
