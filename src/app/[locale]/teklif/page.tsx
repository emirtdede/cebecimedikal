import Link from "next/link";
import { notFound } from "next/navigation";
import { FileText, Phone, Mail, Clock, ShieldCheck } from "lucide-react";
import { Locale, isValidLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { getSiteSettings, getServices, getProducts } from "@/lib/data";
import { QuoteForm } from "@/features/quotes/QuoteForm";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = isValidLocale(locale) ? (locale as Locale) : "tr";
  const dict = getDictionary(currentLocale);

  return {
    title: dict.quote.title,
    description: dict.quote.subtitle,
  };
}

export default async function QuotePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    urun?: string;
    product?: string;
    konu?: string;
    topic?: string;
    hizmet?: string;
    service?: string;
    baslik?: string;
  }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const currentLocale = locale as Locale;
  const dict = getDictionary(currentLocale);

  const [settings, services, products] = await Promise.all([
    getSiteSettings(),
    getServices(currentLocale),
    getProducts(currentLocale),
  ]);

  const { urun, product, konu, topic, hizmet, service, baslik } =
    await searchParams;

  const targetServiceSlug = hizmet || service;
  const matchedService = services.find(
    (s) =>
      s.slug === targetServiceSlug ||
      s.title.toLowerCase() === (baslik || "").toLowerCase() ||
      s.title.toLowerCase() === (konu || "").toLowerCase()
  );

  let initialTopic = dict.quote.topicDevice;
  let initialProduct = urun || product || "";

  if (matchedService) {
    initialTopic = dict.quote.topicService;
    initialProduct = matchedService.title;
  } else if (targetServiceSlug) {
    initialTopic = dict.quote.topicService;
  } else if (konu === "2el" || konu === "secondhand") {
    initialTopic = dict.quote.topicSecondHand;
  } else if (konu === "danismanlik" || konu === "consulting") {
    initialTopic = dict.quote.topicConsulting;
  } else if (konu === "servis" || konu === "service") {
    initialTopic = dict.quote.topicService;
  } else if (konu || topic) {
    initialTopic = konu || topic || dict.quote.topicDevice;
  } else if (baslik) {
    initialProduct = baslik;
  }

  const primaryPhone = settings.phone_primary || "+90 506 606 15 40";
  const email = settings.email || "cbcmedikal@gmail.com";
  const whatsappNum = settings.whatsapp || "905066061540";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-16">
      {/* Page Header */}
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
          <FileText className="w-3.5 h-3.5" />
          <span>{dict.nav.requestQuote}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-foreground">
          {dict.quote.title}
        </h1>
        <p className="text-base sm:text-lg text-foreground-muted leading-relaxed">
          {dict.quote.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Form Component */}
        <div className="lg:col-span-8">
          <QuoteForm
            dict={dict}
            services={services}
            products={products}
            initialProduct={initialProduct}
            initialTopic={initialTopic}
            whatsappNum={whatsappNum}
          />
        </div>

        {/* Right: Quick Contact & Assurances Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-8 rounded-3xl bg-surface border border-border shadow-xl space-y-6">
            <h2 className="text-base font-bold text-foreground">{dict.quote?.processTitle || "Teklif Süreci Nasıl İşler?"}</h2>
            
            <div className="space-y-4 text-xs sm:text-sm text-foreground-muted">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <div className="font-bold text-foreground">{dict.quote?.step1Title || "Formun İncelenmesi"}</div>
                  <div className="text-xs mt-0.5">{dict.quote?.step1Desc || "Talebiniz uzman biyomedikal mühendisimize yönlendirilir."}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <div className="font-bold text-foreground">{dict.quote?.step2Title || "Şartname ve Fiyatlandırma"}</div>
                  <div className="text-xs mt-0.5">{dict.quote?.step2Desc || "Kurumunuza özel bütçe ve konfigürasyon çalışması yapılır."}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <div className="font-bold text-foreground">{dict.quote?.step3Title || "24 Saat İçinde Dönüş"}</div>
                  <div className="text-xs mt-0.5">{dict.quote?.step3Desc || "Resmi teklif dosyanız e-posta veya telefonla iletilir."}</div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border space-y-3">
              <div className="text-xs font-bold uppercase text-foreground">{dict.quote?.directContact || "Doğrudan İletişim"}</div>
              <a
                href={`tel:${primaryPhone.replace(/\s+/g, "")}`}
                className="flex items-center gap-2.5 text-xs text-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span className="font-semibold">{primaryPhone}</span>
              </a>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2.5 text-xs text-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4 text-primary" />
                <span>{email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
