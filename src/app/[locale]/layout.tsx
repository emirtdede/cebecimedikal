import { notFound } from "next/navigation";
import { Suspense } from "react";
import { LOCALES, Locale, isValidLocale, getDirection } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { getCategories, getSiteSettings } from "@/lib/data";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { AnnouncementPopup } from "@/components/layout/AnnouncementPopup";
import { RouteTransitionLoader } from "@/components/common/RouteTransitionLoader";
import { ScrollObserver } from "@/components/common/ScrollObserver";
import { AnalyticsTracker } from "@/features/analytics/AnalyticsTracker";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = isValidLocale(locale) ? (locale as Locale) : "tr";
  const dict = getDictionary(currentLocale);

  return {
    title: {
      template: `%s | ${dict.brand.name}`,
      default: `${dict.brand.name} | ${dict.brand.tagline}`,
    },
    description: dict.brand.shortDescription,
    alternates: {
      canonical: `/${currentLocale}`,
      languages: {
        tr: "/tr",
        en: "/en",
        ar: "/ar",
        de: "/de",
        ja: "/ja",
        zh: "/zh",
      },
    },
    openGraph: {
      title: `${dict.brand.name} | ${dict.brand.tagline}`,
      description: dict.brand.shortDescription,
      url: `https://cebecimedikal.com/${currentLocale}`,
      siteName: dict.brand.name,
      locale: currentLocale === "tr" ? "tr_TR" : currentLocale === "en" ? "en_US" : currentLocale,
      type: "website",
      images: [
        {
          url: "https://cebecimedikal.com/Logo/CBC_Medikal_Symbol_White.svg",
          width: 512,
          height: 512,
          alt: "Cebeci Medikal Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${dict.brand.name} | ${dict.brand.tagline}`,
      description: dict.brand.shortDescription,
      images: ["https://cebecimedikal.com/Logo/CBC_Medikal_Symbol_White.svg"],
    },
    other: {
      "geo.region": "TR-06",
      "geo.placename": "Sincan, Ankara, Türkiye",
      "geo.position": "40.011170;32.520075",
      ICBM: "40.011170, 32.520075",
      "format-detection": "telephone=no",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  const dict = getDictionary(currentLocale);
  const categories = await getCategories(currentLocale);
  const settings = await getSiteSettings();
  const dir = getDirection(currentLocale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Cebeci Medikal - Tıbbi Cihazlar ve Biyomedikal Hizmetleri",
    alternateName: "Cebeci Medikal",
    url: "https://cebecimedikal.com",
    logo: "https://cebecimedikal.com/Logo/CBC_Medikal_Symbol_White.svg",
    image: "https://cebecimedikal.com/Logo/CBC_Medikal_Symbol_White.svg",
    description: dict.brand.shortDescription,
    telephone: ["+90 506 606 15 40", "+90 506 835 57 41"],
    email: "cbcmedikal@gmail.com",
    priceRange: "₺₺",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Fevzi Çakmak Mahallesi, Cumhuriyet Bulvarı No: 83/A",
      addressLocality: "Sincan",
      addressRegion: "Ankara",
      postalCode: "06930",
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.01117,
      longitude: 32.520075,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:30",
        closes: "18:30",
      },
    ],
    sameAs: [
      "https://maps.app.goo.gl/cebecimedikal",
      "https://wa.me/905066061540",
    ],
    areaServed: {
      "@type": "Country",
      name: "Turkey",
    },
  };

  const whatsappMessage = currentLocale === "tr"
    ? "Merhaba, Cebeci Medikal hakkında bilgi ve teklif almak istiyorum."
    : "Hello, I would like to get information and quotation about Cebeci Medical services.";

  return (
    <div dir={dir} lang={currentLocale} className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={null}>
        <RouteTransitionLoader />
      </Suspense>
      <ScrollObserver />
      <SkipLink text={dict.common.details} />
      <Header
        locale={currentLocale}
        dict={dict}
        categories={categories}
        primaryPhone={settings.phone_primary || "+90 506 606 15 40"}
      />
      <main id="main-content" className="flex-1 focus:outline-none">
        {children}
      </main>
      <Footer locale={currentLocale} dict={dict} settings={settings} />
      <AnnouncementPopup />
      <CookieBanner dict={dict} />
      <WhatsAppButton
        phoneNumber={settings.whatsapp || "905066061540"}
        message={whatsappMessage}
        label={dict.common.writeWhatsapp}
      />
      <AnalyticsTracker locale={currentLocale} />
    </div>
  );
}
