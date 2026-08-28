"use client";

import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Sliders,
} from "lucide-react";
import { Locale } from "@/lib/i18n";
import { Dictionary } from "@/lib/dictionary";
import { getLocalizedHref } from "@/lib/routes";
import { BrandLogo } from "./BrandLogo";
import { VelliumLogo } from "./VelliumLogo";

export function Footer({
  locale,
  dict,
  settings,
}: {
  locale: Locale;
  dict: Dictionary;
  settings?: Record<string, string>;
}) {
  const primaryPhone = settings?.phone_primary || "+90 506 606 15 40";
  const secondaryPhone = settings?.phone_secondary || "+90 506 835 57 41";
  const email = settings?.email || "cbcmedikal@gmail.com";
  const address = settings?.address || "Fevzi Çakmak Mah. Cumhuriyet Bulv. No: 83/A, Sincan / Ankara";
  const facebookUrl = settings?.social_facebook || settings?.facebook_url || "https://www.facebook.com/cebeci.medikal/";
  const instagramUrl = settings?.social_instagram || settings?.instagram_url || "https://www.instagram.com/cbcmedikal";
  const mapsUrl = settings?.google_maps_url || "https://maps.app.goo.gl/cebecimedikal";
  const whatsappNum = settings?.whatsapp || "905066061540";

  const handleOpenCookieSettings = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-cookie-settings"));
    }
  };

  const productsHref = getLocalizedHref(locale, "products");
  const servicesHref = getLocalizedHref(locale, "services");
  const aboutHref = getLocalizedHref(locale, "about");
  const contactHref = getLocalizedHref(locale, "contact");
  const quoteHref = getLocalizedHref(locale, "quote");
  const catalogsHref = getLocalizedHref(locale, "catalogs");
  const referencesHref = getLocalizedHref(locale, "references");

  return (
    <footer className="bg-surface border-t border-border mt-auto pt-16 pb-10 text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Col 1: Brand Info & Social Media (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href={`/${locale}`} className="inline-block group focus:outline-none" aria-label="Cebeci Medikal Ana Sayfa">
              <BrandLogo
                showSubtitle
                subtitleText={dict.brand.tagline || "Biyomedikal Teknolojileri"}
                height={36}
                className="group-hover:opacity-90 transition-opacity"
              />
            </Link>

            <p className="text-xs text-foreground-muted leading-relaxed max-w-sm">
              {dict.footer.companyDesc}
            </p>

            {/* Social Icons */}
            <div className="pt-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-foreground-muted mb-2.5">
                {dict.contact.title} & WhatsApp
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-lg bg-surface-2 hover:bg-primary text-foreground-muted hover:text-white border border-border hover:border-primary transition-all flex items-center justify-center shadow-sm"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-lg bg-surface-2 hover:bg-primary text-foreground-muted hover:text-white border border-border hover:border-primary transition-all flex items-center justify-center shadow-sm"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent((dict as any).whatsapp?.defaultMessage || (dict.contact as any)?.whatsappMessage || "Merhaba, Cebeci Medikal hakkında bilgi almak istiyorum.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-8 h-8 rounded-lg bg-surface-2 hover:bg-[#25D366] text-foreground-muted hover:text-white border border-border hover:border-[#25D366] transition-all flex items-center justify-center shadow-sm"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Kurumsal (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground whitespace-nowrap">
              {dict.nav.corporate}
            </h4>
            <ul className="space-y-2.5 text-xs text-foreground-muted">
              <li>
                <Link href={aboutHref} className="hover:text-primary transition-colors block whitespace-nowrap">
                  {dict.nav.about}
                </Link>
              </li>
              <li>
                <Link href={referencesHref} className="hover:text-primary transition-colors block whitespace-nowrap">
                  {dict.nav.references}
                </Link>
              </li>
              <li>
                <Link href={catalogsHref} className="hover:text-primary transition-colors block whitespace-nowrap">
                  {dict.nav.catalogs}
                </Link>
              </li>
              <li>
                <Link href={quoteHref} className="hover:text-primary transition-colors block whitespace-nowrap">
                  {dict.nav.requestQuote}
                </Link>
              </li>
              <li>
                <Link href={contactHref} className="hover:text-primary transition-colors block whitespace-nowrap">
                  {dict.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Ürünler & Hizmetler (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground whitespace-nowrap">
              {dict.nav.products} & {dict.nav.services}
            </h4>
            <ul className="space-y-2.5 text-xs text-foreground-muted">
              <li>
                <Link href={catalogsHref} className="hover:text-primary transition-colors block whitespace-nowrap">
                  {dict.products.title}
                </Link>
              </li>
              <li>
                <Link href={productsHref} className="hover:text-primary transition-colors block whitespace-nowrap">
                  {dict.nav.products}
                </Link>
              </li>
              <li>
                <Link href={`${servicesHref}/teknik-servis`} className="hover:text-primary transition-colors block whitespace-nowrap">
                  {dict.nav.technicalService}
                </Link>
              </li>
              <li>
                <Link href={`${servicesHref}/periyodik-koruyucu-bakim`} className="hover:text-primary transition-colors block whitespace-nowrap">
                  {dict.nav.maintenance}
                </Link>
              </li>
              <li>
                <Link href={`${servicesHref}/kurulum-devreye-alma`} className="hover:text-primary transition-colors block whitespace-nowrap">
                  {dict.nav.installation}
                </Link>
              </li>
              <li>
                <Link href={`${servicesHref}/teknik-danismanlik`} className="hover:text-primary transition-colors block whitespace-nowrap">
                  {dict.nav.consulting}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: İletişim Bilgileri (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground whitespace-nowrap">
              {dict.nav.contact}
            </h4>

            <div className="space-y-2.5 text-xs text-foreground-muted">
              {/* 1. Telefon */}
              <div className="flex items-center gap-2.5 whitespace-nowrap">
                <Phone className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <div className="flex items-center gap-1.5">
                  <a href={`tel:${primaryPhone.replace(/\s+/g, "")}`} className="hover:text-primary transition-colors">
                    {primaryPhone}
                  </a>
                  <span className="text-foreground-muted/40">/</span>
                  <a href={`tel:${secondaryPhone.replace(/\s+/g, "")}`} className="hover:text-primary transition-colors">
                    {secondaryPhone}
                  </a>
                </div>
              </div>

              {/* 2. E-posta */}
              <div className="flex items-center gap-2.5 whitespace-nowrap">
                <Mail className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-primary transition-colors">
                  {email}
                </a>
              </div>

              {/* 3. Çalışma Saatleri */}
              <div className="flex items-center gap-2.5 whitespace-nowrap">
                <Clock className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <span>{dict.contact.hoursText || "Pzt - Cmt: 08:30 - 18:30"}</span>
              </div>

              {/* 4. Adres */}
              <div className="flex items-start gap-2.5 pt-1">
                <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors leading-relaxed"
                >
                  {address}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-foreground-muted">
          <div className="unified-shimmer-wrapper">
            {/* Base Layer */}
            <div className="unified-shimmer-base flex flex-wrap items-center gap-x-2.5 gap-y-1 text-center sm:text-left">
              <span>
                © {new Date().getFullYear()} Cebeci Medikal. {dict.footer.rights}
              </span>
              <span className="hidden sm:inline text-border">•</span>
              <a
                href="https://vellium.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-opacity group cursor-pointer"
                title="Designed & Developed by Vellium"
              >
                <VelliumLogo className="w-5 h-4.5 flex-shrink-0" />
                <span className="text-xs">
                  Designed &amp; Developed by <strong className="font-bold">Vellium</strong>
                </span>
              </a>
            </div>

            {/* Seamless In-Letter & In-Logo Single-Pass Light Wave Overlay */}
            <div
              className="unified-shimmer-shine flex flex-wrap items-center gap-x-2.5 gap-y-1 text-center sm:text-left"
              aria-hidden="true"
            >
              <span>
                © {new Date().getFullYear()} Cebeci Medikal. {dict.footer.rights}
              </span>
              <span className="hidden sm:inline opacity-40">•</span>
              <span className="inline-flex items-center gap-2">
                <VelliumLogo className="w-5 h-4.5 flex-shrink-0" />
                <span className="text-xs">
                  Designed &amp; Developed by <strong className="font-bold">Vellium</strong>
                </span>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <Link href={`/${locale}/yasal/kvkk-aydinlatma-metni`} className="hover:text-primary transition-colors">
              {dict.footer.kvkk}
            </Link>
            <span className="text-border">•</span>
            <Link href={`/${locale}/yasal/gizlilik-politikasi`} className="hover:text-primary transition-colors">
              {dict.footer.privacy}
            </Link>
            <span className="text-border">•</span>
            <Link href={`/${locale}/yasal/cerez-politikasi`} className="hover:text-primary transition-colors">
              {dict.footer.cookiePolicy}
            </Link>
            <span className="text-border">•</span>
            <Link href={`/${locale}/yasal/kullanim-kosullari`} className="hover:text-primary transition-colors">
              {dict.footer.terms}
            </Link>
            <span className="text-border">•</span>
            <button
              type="button"
              onClick={handleOpenCookieSettings}
              className="hover:text-primary transition-colors flex items-center gap-1 text-primary/90 font-medium"
            >
              <Sliders className="w-3 h-3" />
              <span>{dict.footer.cookieSettings}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
