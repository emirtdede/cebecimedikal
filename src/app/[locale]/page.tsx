import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ShieldCheck,
  Award,
  ArrowRight,
  Phone,
  FileText,
  Activity,
  CheckCircle2,
  Clock,
  Sparkles,
  Download,
  MapPin,
  ExternalLink,
  ChevronRight,
  HeartPulse,
  FlaskConical,
  Eye,
  Gauge,
  Dumbbell,
  Layers,
  RefreshCw,
  Wrench,
  Cpu,
  Briefcase,
  Star,
} from "lucide-react";
import { Locale, isValidLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { getLocalizedHref } from "@/lib/routes";
import { HeroImageSlider } from "@/components/home/HeroImageSlider";
import {
  getCategories,
  getProducts,
  getProductsCount,
  getServices,
  getReferences,
  getCatalogs,
  getFaqs,
  getSiteSettings,
  LocalizedCategory,
  LocalizedProduct,
  LocalizedService,
  LocalizedReference,
} from "@/lib/data";

const CATEGORY_ICONS: Record<string, any> = {
  "ameliyathane-cihazlari": ShieldCheck,
  "yogun-bakim-yasam-destek": HeartPulse,
  "fizyolojik-sinyal-izleyiciler": Activity,
  "laboratuvar-cihazlari": FlaskConical,
  "endovizyon-sistemleri": Eye,
  "medikal-gaz-sistemleri": Gauge,
  "fizik-tedavi-cihazlari": Dumbbell,
  "sarf-malzemeler": Layers,
};

const SERVICE_ICONS: Record<string, any> = {
  "teknik-servis": Wrench,
  "periyodik-koruyucu-bakim": ShieldCheck,
  "kurulum-devreye-alma": Cpu,
  "teknik-danismanlik": Briefcase,
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const currentLocale = locale as Locale;
  const dict = getDictionary(currentLocale);

  const [
    categories,
    featuredProducts,
    services,
    references,
    catalogs,
    faqs,
    settings,
    productsCount,
  ]: [
    LocalizedCategory[],
    LocalizedProduct[],
    LocalizedService[],
    LocalizedReference[],
    any[],
    any[],
    Record<string, string>,
    number
  ] = await Promise.all([
    getCategories(currentLocale),
    getProducts(currentLocale, { featured: true, limit: 4 }),
    getServices(currentLocale),
    getReferences(currentLocale),
    getCatalogs(currentLocale),
    getFaqs(currentLocale),
    getSiteSettings(),
    getProductsCount(),
  ]);

  const primaryPhone = settings.phone_primary || "+90 506 606 15 40";
  const whatsappNum = settings.whatsapp || "905066061540";
  const address = settings.address || "Fevzi Çakmak Mahallesi, Cumhuriyet Bulvarı No: 83/A, Sincan / Ankara";
  const mapsEmbed = settings.google_maps_embed || "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1527.9390696789906!2d32.5200753!3d40.0111695!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d32fe1ff03044d%3A0x95404729878581f0!2sCebeci%20Medikal!5e0!3m2!1str!2str!4v1787872118602!5m2!1str!2str";

  const currentYear = new Date().getFullYear();
  const experienceYears = Math.max(10, currentYear - 2015);

  return (
    <div className="space-y-24 sm:space-y-32 pb-20">
      {/* 1. HERO SECTION WITH PARALLAX DEPTH */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden border-b border-border bg-gradient-to-b from-surface via-bg to-bg">
        {/* Decorative Parallax Ambient Glow Orb & Medical Grid */}
        <div
          data-parallax-speed="-0.15"
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[140px] pointer-events-none"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#24404b12_1px,transparent_1px),linear-gradient(to_bottom,#24404b12_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.15] tracking-tight">
                {dict.hero.titlePrefix}{" "}
                <span className="text-primary block mt-1">
                  {dict.hero.titleHighlight}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-foreground-muted max-w-2xl leading-relaxed">
                {dict.hero.description}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href={`/${currentLocale}/teklif`}
                  className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>{dict.hero.ctaQuote}</span>
                </Link>

                <Link
                  href={`/${currentLocale}/urunler`}
                  className="px-6 py-3.5 rounded-xl bg-surface-2 hover:bg-surface border border-border text-foreground text-sm font-semibold transition-all flex items-center gap-2"
                >
                  <span>{dict.hero.ctaExplore}</span>
                  <ArrowRight className="w-4 h-4 text-primary" />
                </Link>
              </div>

              {/* Trust Indicators Row */}
              <div className="pt-8 border-t border-border/80 grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-primary">
                    {experienceYears}+
                  </div>
                  <div className="text-xs text-foreground-muted font-medium mt-0.5">
                    {dict.hero.experience}
                  </div>
                </div>
                <div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                    {productsCount > 0 ? `${productsCount}+` : "40+"}
                  </div>
                  <div className="text-xs text-foreground-muted font-medium mt-0.5">
                    {dict.hero.devices}
                  </div>
                </div>
                <div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                    100+
                  </div>
                  <div className="text-xs text-foreground-muted font-medium mt-0.5">
                    {dict.hero.servicePoints}
                  </div>
                </div>
                <div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-primary">
                    7/24
                  </div>
                  <div className="text-xs text-foreground-muted font-medium mt-0.5">
                    {dict.hero.activeSupport}
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Card with Slideshow & External Bottom Caption */}
            <div
              data-parallax-speed="0.1"
              className="lg:col-span-5 relative"
            >
              <HeroImageSlider locale={currentLocale} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT CATEGORIES SECTION (REVEAL ON SCROLL) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 reveal-on-scroll">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              <span>{dict.products.featured}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
              {dict.categories.title}
            </h2>
            <p className="text-sm sm:text-base text-foreground-muted mt-2 max-w-xl">
              {dict.categories.subtitle}
            </p>
          </div>
          <Link
            href={`/${currentLocale}/urunler`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-hover transition-colors"
          >
            <span>{dict.categories.viewAll}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat: LocalizedCategory) => {
            const IconComp = CATEGORY_ICONS[cat.slug] || Activity;
            return (
              <Link
                key={cat.id}
                href={`/${currentLocale}/urunler?kategori=${cat.slug}`}
                className="group p-6 rounded-2xl bg-surface border border-border hover:border-primary/50 hover:bg-surface-2 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-3.5">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <IconComp className="w-5.5 h-5.5" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {cat.name}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-foreground-muted group-hover:text-primary transition-colors">
                  <span>{cat.productsCount || "Çeşitli"} {dict.categories.productsCount}</span>
                  <div className="flex items-center gap-1">
                    <span>{dict.products.viewDetails}</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS SHOWCASE */}
      {featuredProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 reveal-on-scroll">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Yüksek Standartlı Ekipmanlar</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
                {dict.products.featured}
              </h2>
              <p className="text-sm sm:text-base text-foreground-muted mt-2 max-w-xl">
                {dict.products.subtitle}
              </p>
            </div>
            <Link
              href={`/${currentLocale}/urunler`}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-hover transition-colors"
            >
              <span>{dict.common.viewAll}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group rounded-2xl bg-surface border border-border overflow-hidden hover:border-primary/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-52 w-full overflow-hidden bg-white flex items-center justify-center p-3">
                    <img
                      src={product.images[0] || "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"}
                      alt={product.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-full shadow-md ${
                        product.condition === "NEW"
                          ? "bg-primary text-white"
                          : "bg-amber-600 text-white"
                      }`}>
                        {product.condition === "NEW" ? dict.products.new : dict.products.secondHand}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="text-[11px] font-semibold text-primary uppercase tracking-wide mb-1">
                      {product.category.name}
                    </div>
                    <Link
                      href={`/${currentLocale}/urunler/${product.slug}`}
                      className="block text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2"
                    >
                      {product.title}
                    </Link>
                    <p className="text-xs text-foreground-muted line-clamp-2 mb-4 leading-relaxed">
                      {product.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-5 pt-0 flex items-center gap-2">
                  <Link
                    href={`/${currentLocale}/urunler/${product.slug}`}
                    className="flex-1 py-2 rounded-lg bg-surface-2 hover:bg-surface border border-border text-center text-xs font-semibold text-foreground transition-colors"
                  >
                    {dict.products.viewDetails}
                  </Link>
                  <Link
                    href={`/${currentLocale}/teklif?urun=${encodeURIComponent(product.title)}`}
                    className="flex-1 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-colors text-center justify-center flex items-center gap-1"
                    title={dict.products.requestQuote}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{dict.nav.requestQuote}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. SERVICES SHOWCASE SECTION */}
      <section className="bg-surface-2/40 border-y border-border py-20 reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2 flex items-center justify-center gap-1.5">
              <Wrench className="w-3.5 h-3.5" />
              <span>Teknik & Biyomedikal Uzmanlık</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
              {dict.services.title}
            </h2>
            <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
              {dict.services.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => {
              const IconComp = SERVICE_ICONS[service.slug] || Wrench;
              return (
                <div
                  key={service.id}
                  className="p-6 rounded-2xl bg-surface border border-border hover:border-primary/40 transition-all duration-300 shadow-sm flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors flex items-center justify-center flex-shrink-0 shadow-sm">
                        <IconComp className="w-5.5 h-5.5" />
                      </div>
                      <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed mb-6">
                      {service.shortDescription}
                    </p>
                  </div>

                  <Link
                    href={getLocalizedHref(currentLocale, "services", service.slug)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline mt-auto"
                  >
                    <span>{dict.services.learnMore}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. WHY US & PROCESS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 reveal-on-scroll">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Why Us Left */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
                {dict.whyUs.title}
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
                {dict.whyUs.subtitle}
              </h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary flex-shrink-0 mt-0.5">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">{dict.whyUs.item1Title}</h3>
                  <p className="text-xs sm:text-sm text-foreground-muted mt-1 leading-relaxed">
                    {dict.whyUs.item1Desc}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary flex-shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">{dict.whyUs.item2Title}</h3>
                  <p className="text-xs sm:text-sm text-foreground-muted mt-1 leading-relaxed">
                    {dict.whyUs.item2Desc}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary flex-shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">{dict.whyUs.item3Title}</h3>
                  <p className="text-xs sm:text-sm text-foreground-muted mt-1 leading-relaxed">
                    {dict.whyUs.item3Desc}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">{dict.whyUs.item4Title}</h3>
                  <p className="text-xs sm:text-sm text-foreground-muted mt-1 leading-relaxed">
                    {dict.whyUs.item4Desc}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Process Timeline Right */}
          <div className="lg:col-span-6 p-8 rounded-3xl bg-surface border border-border shadow-xl">
            <div className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
              {dict.process.title}
            </div>
            <h3 className="text-xl font-bold text-foreground mb-8">
              {dict.process.subtitle}
            </h3>

            <div className="space-y-6 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-border">
              <div className="relative flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0 z-10">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">{dict.process.step1}</h4>
                  <p className="text-xs text-foreground-muted mt-0.5 leading-relaxed">{dict.process.step1Desc}</p>
                </div>
              </div>

              <div className="relative flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0 z-10">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">{dict.process.step2}</h4>
                  <p className="text-xs text-foreground-muted mt-0.5 leading-relaxed">{dict.process.step2Desc}</p>
                </div>
              </div>

              <div className="relative flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0 z-10">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">{dict.process.step3}</h4>
                  <p className="text-xs text-foreground-muted mt-0.5 leading-relaxed">{dict.process.step3Desc}</p>
                </div>
              </div>

              <div className="relative flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0 z-10">
                  4
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">{dict.process.step4}</h4>
                  <p className="text-xs text-foreground-muted mt-0.5 leading-relaxed">{dict.process.step4Desc}</p>
                </div>
              </div>

              <div className="relative flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0 z-10">
                  5
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">{dict.process.step5}</h4>
                  <p className="text-xs text-foreground-muted mt-0.5 leading-relaxed">{dict.process.step5Desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INSTITUTIONAL REFERENCES (INFINITE LEFT MARQUEE) */}
      {references.length > 0 && (
        <section className="bg-surface-2/40 border-y border-border py-20 overflow-hidden reveal-on-scroll">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
            <div className="text-center max-w-2xl mx-auto">
              <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{dict.nav.references}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
                {dict.references.pageTitle}
              </h2>
              <p className="text-xs sm:text-sm text-foreground-muted mt-2">
                {dict.references.pageSubtitle}
              </p>
            </div>
          </div>

          {/* Infinite Marquee Left Track with Edge Fade */}
          <div className="relative w-full overflow-hidden mask-marquee py-3">
            <div className="animate-marquee-left flex items-stretch gap-6">
              {/* Set 1 */}
              {references.map((ref) => (
                <div
                  key={`ref-1-${ref.id}`}
                  className="w-[340px] sm:w-[400px] p-6 rounded-2xl bg-surface border border-border hover:border-primary/40 shadow-sm hover:shadow-lg flex-shrink-0 flex flex-col justify-between transition-all"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(ref.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-foreground-muted italic leading-relaxed line-clamp-4">
                      &ldquo;{ref.quote}&rdquo;
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-border/80">
                    <div className="text-sm font-bold text-foreground">
                      {ref.companyName}
                    </div>
                    <div className="text-xs text-primary font-medium mt-0.5">
                      {ref.serviceScope}
                    </div>
                    <div className="text-[11px] text-foreground-muted mt-0.5">
                      {ref.sector} • {ref.city}
                    </div>
                  </div>
                </div>
              ))}

              {/* Set 2 (Duplicated for Seamless Loop) */}
              {references.map((ref) => (
                <div
                  key={`ref-2-${ref.id}`}
                  className="w-[340px] sm:w-[400px] p-6 rounded-2xl bg-surface border border-border hover:border-primary/40 shadow-sm hover:shadow-lg flex-shrink-0 flex flex-col justify-between transition-all"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(ref.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-foreground-muted italic leading-relaxed line-clamp-4">
                      &ldquo;{ref.quote}&rdquo;
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-border/80">
                    <div className="text-sm font-bold text-foreground">
                      {ref.companyName}
                    </div>
                    <div className="text-xs text-primary font-medium mt-0.5">
                      {ref.serviceScope}
                    </div>
                    <div className="text-[11px] text-foreground-muted mt-0.5">
                      {ref.sector} • {ref.city}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. CATALOGS SECTION (REVEAL ON SCROLL) */}
      {catalogs.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 reveal-on-scroll">
          <div className="p-8 sm:p-12 rounded-3xl bg-surface border border-border shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-left">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                {dict.nav.catalogs}
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                {dict.catalogs.pageTitle}
              </h2>
              <p className="text-xs sm:text-sm text-foreground-muted max-w-xl leading-relaxed">
                {dict.catalogs.pageSubtitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 flex-shrink-0">
              <Link
                href={`/${currentLocale}/kataloglar`}
                className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-bold shadow-md transition-all flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>{dict.catalogs.viewPdf}</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 8. FREQUENTLY ASKED QUESTIONS (DYNAMIC FROM DB / ADMIN) */}
      {faqs.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 reveal-on-scroll">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2 flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Sıkça Sorulan Sorular</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
              Merak Edilen Sorular & Cevaplar
            </h2>
            <p className="text-xs sm:text-sm text-foreground-muted mt-2">
              Tıbbi cihaz tedariki, garanti ve biyomedikal teknik servis süreçlerimiz hakkında bilgiler.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="p-6 rounded-2xl bg-surface border border-border hover:border-primary/40 shadow-sm transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-bold text-sm sm:text-base text-foreground leading-snug">
                    {faq.question}
                  </h3>
                  <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-bold text-[10px] tracking-wide uppercase whitespace-nowrap">
                    {faq.category}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 9. CONVERSION QUOTE CTA BANNER (REVEAL ON SCROLL) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 reveal-on-scroll">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary via-[#176B59] to-[#0D202B] p-8 sm:p-14 text-white shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
              {dict.quote.subtitle}
            </h2>
            <p className="text-sm sm:text-base text-white/85 leading-relaxed">
              {dict.brand.shortDescription}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href={`/${currentLocale}/teklif`}
                className="px-6 py-3.5 rounded-xl bg-white text-primary hover:bg-white/90 text-sm font-bold shadow-lg transition-all"
              >
                {dict.quote.title}
              </Link>
              <a
                href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent("Merhaba, Cebeci Medikal hakkında bilgi ve teklif almak istiyorum.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 text-white text-sm font-semibold transition-all flex items-center gap-2"
              >
                <span>{dict.common.writeWhatsapp}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CONTACT & MAP EMBED SECTION (REVEAL ON SCROLL) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 reveal-on-scroll">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
                {dict.nav.contact}
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
                {dict.contact.infoTitle}
              </h2>
              <p className="text-xs sm:text-sm text-foreground-muted mt-2">
                {dict.contact.subtitle}
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-surface border border-border flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-foreground">{dict.contact.address}</div>
                  <div className="text-foreground-muted mt-0.5">{address}</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-border flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-foreground">{dict.contact.phoneLabel}</div>
                  <a href={`tel:${primaryPhone.replace(/\s+/g, "")}`} className="text-primary font-semibold block mt-0.5">
                    {primaryPhone}
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-border flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-foreground">{dict.contact.hours}</div>
                  <div className="text-foreground-muted mt-0.5">{dict.contact.hoursText}</div>
                </div>
              </div>
            </div>

            <Link
              href={`/${currentLocale}/iletisim`}
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
            >
              <span>{dict.contact.formTitle}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Map Embed Frame */}
          <div className="lg:col-span-7 h-[360px] sm:h-[420px] rounded-3xl overflow-hidden border border-border shadow-xl bg-surface-2">
            <iframe
              src={mapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Cebeci Medikal Google Maps Harita Konumu"
              className="theme-map-iframe"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
