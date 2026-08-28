"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Phone,
  FileText,
  Activity,
  ShieldAlert,
  HeartPulse,
  FlaskConical,
  Eye,
  Gauge,
  Dumbbell,
  Layers,
  RefreshCw,
  Wrench,
  ShieldCheck,
  Cpu,
  Briefcase,
} from "lucide-react";
import { Locale, LOCALE_METADATA } from "@/lib/i18n";
import { Dictionary } from "@/lib/dictionary";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSelector } from "./LanguageSelector";
import { SearchModal } from "./SearchModal";
import { LocalizedCategory } from "@/lib/data";
import { getLocalizedHref } from "@/lib/routes";

const CATEGORY_ICONS: Record<string, any> = {
  "ameliyathane-cihazlari": ShieldAlert,
  "yogun-bakim-yasam-destek": HeartPulse,
  "fizyolojik-sinyal-izleyiciler": Activity,
  "laboratuvar-cihazlari": FlaskConical,
  "endovizyon-sistemleri": Eye,
  "medikal-gaz-sistemleri": Gauge,
  "fizik-tedavi-cihazlari": Dumbbell,
  "sarf-malzemeler": Layers,
};

export function Header({
  locale,
  dict,
  categories = [],
  primaryPhone = "+90 506 606 15 40",
}: {
  locale: Locale;
  dict: Dictionary;
  categories: LocalizedCategory[];
  primaryPhone?: string;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Keyboard shortcut Ctrl+K or / to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (
        e.key === "/" &&
        !["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement).tagName)
      ) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Header background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const handleMouseEnterDropdown = (menu: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeaveDropdown = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const productsHref = getLocalizedHref(locale, "products");
  const servicesHref = getLocalizedHref(locale, "services");
  const aboutHref = getLocalizedHref(locale, "about");
  const contactHref = getLocalizedHref(locale, "contact");
  const quoteHref = getLocalizedHref(locale, "quote");
  const catalogsHref = getLocalizedHref(locale, "catalogs");
  const referencesHref = getLocalizedHref(locale, "references");

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-surface/95 backdrop-blur-md shadow-md border-b border-border"
            : "bg-surface border-b border-border/60"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 sm:gap-3 group focus:outline-none flex-shrink-0"
            aria-label="Cebeci Medikal Ana Sayfa"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-primary flex items-center justify-center text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform flex-shrink-0">
              <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-black text-lg sm:text-2xl text-foreground tracking-tight group-hover:text-primary transition-colors leading-none">
                CEBECİ
                <span className="text-primary ml-1">MEDİKAL</span>
              </span>
              <span className="text-[10px] text-foreground-muted tracking-wider uppercase font-semibold mt-0.5 hidden xs:block">
                Biyomedikal Teknolojileri
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs xl:text-sm font-medium text-foreground flex-shrink-0">
            <Link
              href={`/${locale}`}
              className={`px-2 xl:px-3 py-2 rounded-md hover:text-primary hover:bg-surface-2 transition-colors whitespace-nowrap flex-shrink-0 ${
                pathname === `/${locale}` ? "text-primary font-semibold" : ""
              }`}
            >
              {dict.nav.home}
            </Link>

            {/* Corporate Dropdown */}
            <div
              className="relative flex-shrink-0"
              onMouseEnter={() => handleMouseEnterDropdown("corporate")}
              onMouseLeave={handleMouseLeaveDropdown}
            >
              <button
                type="button"
                className={`px-2 xl:px-3 py-2 rounded-md flex items-center gap-1 hover:text-primary hover:bg-surface-2 transition-colors whitespace-nowrap flex-shrink-0 ${
                  pathname.includes("/hakkimizda") ||
                  pathname.includes("/about") ||
                  pathname.includes("/referanslar") ||
                  pathname.includes("/references") ||
                  pathname.includes("/kataloglar") ||
                  pathname.includes("/catalogs")
                    ? "text-primary font-semibold"
                    : ""
                }`}
              >
                <span>{dict.nav.corporate}</span>
                <ChevronDown className="w-3.5 h-3.5 text-foreground-muted" />
              </button>

              {activeDropdown === "corporate" && (
                <div className="absolute left-0 top-full pt-1.5 z-50 animate-dropdown">
                  <div className="w-56 rounded-xl shadow-2xl bg-surface border border-border py-2 whitespace-normal">
                    <Link
                      href={aboutHref}
                      className="block px-4 py-2.5 hover:bg-surface-2 hover:text-primary text-sm transition-colors"
                    >
                      {dict.nav.about}
                    </Link>
                    <Link
                      href={referencesHref}
                      className="block px-4 py-2.5 hover:bg-surface-2 hover:text-primary text-sm transition-colors"
                    >
                      {dict.nav.references}
                    </Link>
                    <Link
                      href={catalogsHref}
                      className="block px-4 py-2.5 hover:bg-surface-2 hover:text-primary text-sm transition-colors"
                    >
                      {dict.nav.catalogs}
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Products Mega Dropdown */}
            <div
              className="relative flex-shrink-0"
              onMouseEnter={() => handleMouseEnterDropdown("products")}
              onMouseLeave={handleMouseLeaveDropdown}
            >
              <Link
                href={productsHref}
                className={`px-2 xl:px-3 py-2 rounded-md flex items-center gap-1 hover:text-primary hover:bg-surface-2 transition-colors whitespace-nowrap flex-shrink-0 ${
                  pathname.includes("/urunler") || pathname.includes("/products") || pathname.includes("/produkte")
                    ? "text-primary font-semibold"
                    : ""
                }`}
              >
                <span>{dict.nav.products}</span>
                <ChevronDown className="w-3.5 h-3.5 text-foreground-muted" />
              </Link>

              {activeDropdown === "products" && (
                <div className="absolute left-0 top-full pt-1.5 z-50 animate-dropdown">
                  <div className="w-[760px] max-w-[92vw] rounded-2xl shadow-2xl bg-surface border border-border p-5 whitespace-normal">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-border">
                      <span className="text-xs font-bold uppercase tracking-wider text-primary">
                        {dict.categories.title}
                      </span>
                      <Link
                        href={productsHref}
                        className="text-xs font-semibold text-foreground-muted hover:text-primary transition-colors"
                      >
                        {dict.categories.viewAll} →
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {categories.map((cat) => {
                        const IconComp = CATEGORY_ICONS[cat.slug] || Activity;
                        return (
                          <Link
                            key={cat.id}
                            href={`${productsHref}?kategori=${cat.slug}`}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-surface-2 transition-colors group min-w-0"
                          >
                            <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors flex-shrink-0 mt-0.5">
                              <IconComp className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                                {cat.name}
                              </div>
                              <div className="text-xs text-foreground-muted truncate mt-0.5">
                                {cat.description}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="mt-4 pt-3 border-t border-border flex items-center justify-between bg-surface-2/40 -mx-5 -mb-5 p-4 rounded-b-2xl">
                      <Link
                        href={`${productsHref}?durum=SECOND_HAND`}
                        className="text-xs font-bold text-primary flex items-center gap-1.5 hover:underline"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>{dict.nav.secondHand} Kataloğu</span>
                      </Link>
                      <Link
                        href={quoteHref}
                        className="text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors shadow-sm"
                      >
                        {dict.nav.requestQuote}
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div
              className="relative flex-shrink-0"
              onMouseEnter={() => handleMouseEnterDropdown("services")}
              onMouseLeave={handleMouseLeaveDropdown}
            >
              <Link
                href={servicesHref}
                className={`px-2 xl:px-3 py-2 rounded-md flex items-center gap-1 hover:text-primary hover:bg-surface-2 transition-colors whitespace-nowrap flex-shrink-0 ${
                  pathname.includes("/hizmetler") || pathname.includes("/services") || pathname.includes("/dienstleistungen")
                    ? "text-primary font-semibold"
                    : ""
                }`}
              >
                <span>{dict.nav.services}</span>
                <ChevronDown className="w-3.5 h-3.5 text-foreground-muted" />
              </Link>

              {activeDropdown === "services" && (
                <div className="absolute left-0 top-full pt-1.5 z-50 animate-dropdown">
                  <div className="w-64 rounded-xl shadow-2xl bg-surface border border-border py-2 whitespace-normal">
                    <Link
                      href={`${servicesHref}/teknik-servis`}
                      className="flex items-center gap-2 px-4 py-2.5 hover:bg-surface-2 hover:text-primary text-sm transition-colors"
                    >
                      <Wrench className="w-4 h-4 text-primary" />
                      <span>{dict.nav.technicalService}</span>
                    </Link>
                    <Link
                      href={`${servicesHref}/periyodik-koruyucu-bakim`}
                      className="flex items-center gap-2 px-4 py-2.5 hover:bg-surface-2 hover:text-primary text-sm transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4 text-primary" />
                      <span>{dict.nav.maintenance}</span>
                    </Link>
                    <Link
                      href={`${servicesHref}/kurulum-devreye-alma`}
                      className="flex items-center gap-2 px-4 py-2.5 hover:bg-surface-2 hover:text-primary text-sm transition-colors"
                    >
                      <Cpu className="w-4 h-4 text-primary" />
                      <span>{dict.nav.installation}</span>
                    </Link>
                    <Link
                      href={`${servicesHref}/teknik-danismanlik`}
                      className="flex items-center gap-2 px-4 py-2.5 hover:bg-surface-2 hover:text-primary text-sm transition-colors"
                    >
                      <Briefcase className="w-4 h-4 text-primary" />
                      <span>{dict.nav.consulting}</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href={contactHref}
              className={`px-2 xl:px-3 py-2 rounded-md hover:text-primary hover:bg-surface-2 transition-colors whitespace-nowrap flex-shrink-0 ${
                pathname.includes("/iletisim") || pathname.includes("/contact") || pathname.includes("/kontakt")
                  ? "text-primary font-semibold"
                  : ""
              }`}
            >
              {dict.nav.contact}
            </Link>
          </nav>

          {/* Right Action Icons & CTA */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0 flex-nowrap whitespace-nowrap">
            {/* Search Trigger Button */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg hover:bg-surface-2 text-foreground-muted hover:text-primary transition-colors focus:outline-none flex items-center justify-center flex-shrink-0"
              aria-label={dict.nav.search}
              title={dict.nav.search}
            >
              <Search className="w-4 h-4 text-primary" />
            </button>

            {/* Language & Theme Selectors */}
            <LanguageSelector currentLocale={locale} dict={dict} />
            <ThemeToggle dict={dict} />

            {/* Request Quote CTA Button */}
            <Link
              href={quoteHref}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 xl:px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md hover:shadow-primary/25 transition-all whitespace-nowrap flex-shrink-0"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{dict.nav.requestQuote}</span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-surface-2 border border-border text-foreground focus:outline-none flex-shrink-0"
              aria-label={mobileMenuOpen ? dict.nav.close : dict.nav.menu}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-surface px-4 py-6 space-y-4 animate-dropdown">
            <nav className="flex flex-col space-y-2 text-sm font-semibold">
              <Link
                href={`/${locale}`}
                className="px-3 py-2.5 rounded-lg hover:bg-surface-2 transition-colors text-foreground"
              >
                {dict.nav.home}
              </Link>
              <Link
                href={aboutHref}
                className="px-3 py-2.5 rounded-lg hover:bg-surface-2 transition-colors text-foreground"
              >
                {dict.nav.about}
              </Link>
              <Link
                href={productsHref}
                className="px-3 py-2.5 rounded-lg hover:bg-surface-2 transition-colors text-foreground"
              >
                {dict.nav.products}
              </Link>
              <Link
                href={servicesHref}
                className="px-3 py-2.5 rounded-lg hover:bg-surface-2 transition-colors text-foreground"
              >
                {dict.nav.services}
              </Link>
              <Link
                href={referencesHref}
                className="px-3 py-2.5 rounded-lg hover:bg-surface-2 transition-colors text-foreground"
              >
                {dict.nav.references}
              </Link>
              <Link
                href={catalogsHref}
                className="px-3 py-2.5 rounded-lg hover:bg-surface-2 transition-colors text-foreground"
              >
                {dict.nav.catalogs}
              </Link>
              <Link
                href={contactHref}
                className="px-3 py-2.5 rounded-lg hover:bg-surface-2 transition-colors text-foreground"
              >
                {dict.nav.contact}
              </Link>
            </nav>

            <div className="pt-4 border-t border-border flex flex-col gap-3">
              <Link
                href={quoteHref}
                className="w-full py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-center text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>{dict.nav.requestQuote}</span>
              </Link>
              <a
                href={`tel:${primaryPhone.replace(/\s+/g, "")}`}
                className="w-full py-2 rounded-lg bg-surface-2 border border-border text-center text-xs font-semibold text-foreground flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span>{primaryPhone}</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Global Command Palette Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        locale={locale}
        dict={dict}
      />
    </>
  );
}
