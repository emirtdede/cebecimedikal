import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { Locale, isValidLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { getSiteSettings } from "@/lib/data";
import { ContactForm } from "@/features/contact/ContactForm";
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
    title: dict.contact.title,
    description: dict.contact.subtitle,
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const currentLocale = locale as Locale;
  const dict = getDictionary(currentLocale);
  const settings = await getSiteSettings();

  const primaryPhone = settings.phone_primary || "+90 506 606 15 40";
  const secondaryPhone = settings.phone_secondary || "+90 506 835 57 41";
  const email = settings.email || "cbcmedikal@gmail.com";
  const address = settings.address || "Fevzi Çakmak Mahallesi, Cumhuriyet Bulvarı No: 83/A, Sincan / Ankara";
  const mapsUrl = settings.google_maps_url || "https://maps.app.goo.gl/cebecimedikal";
  const whatsappNum = settings.whatsapp || "905066061540";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-16">
      {/* Page Header */}
      <div className="max-w-3xl space-y-3">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-foreground">
          {dict.contact.title}
        </h1>
        <p className="text-base sm:text-lg text-foreground-muted leading-relaxed">
          {dict.contact.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        {/* Left: Contact Form Card */}
        <div className="lg:col-span-7 h-full flex flex-col">
          <ContactForm dict={dict} />
        </div>

        {/* Right: Corporate Details Card */}
        <div className="lg:col-span-5 h-full flex flex-col">
          <div className="p-8 rounded-3xl bg-surface border border-border shadow-xl space-y-6 h-full flex flex-col justify-between">
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-foreground">
                {dict.contact.infoTitle}
              </h2>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-surface-2 border border-border">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold text-foreground">{dict.contact.address}</div>
                  <div className="text-foreground-muted leading-relaxed">{address}</div>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline pt-1"
                  >
                    <span>{dict.contact.openInMaps}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-surface-2 border border-border">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold text-foreground">{dict.contact.phoneLabel}</div>
                  <div className="flex flex-col gap-0.5">
                    <a href={`tel:${primaryPhone.replace(/\s+/g, "")}`} className="font-semibold text-foreground hover:text-primary transition-colors">
                      {primaryPhone} {(dict.contact as any)?.switchboardSales || "(Santral / Satış)"}
                    </a>
                    <a href={`tel:${secondaryPhone.replace(/\s+/g, "")}`} className="font-medium text-foreground-muted hover:text-primary transition-colors">
                      {secondaryPhone} {(dict.contact as any)?.techService || "(Teknik Servis)"}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-surface-2 border border-border">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold text-foreground">{dict.contact.emailLabel}</div>
                  <a href={`mailto:${email}`} className="text-foreground hover:text-primary transition-colors font-medium">
                    {email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-surface-2 border border-border">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold text-foreground">{dict.contact.hours}</div>
                  <div className="text-foreground-muted">{(dict.contact as any)?.workingHoursValue || dict.contact.hoursText}</div>
                </div>
              </div>
            </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent((dict as any).whatsapp?.defaultMessage || (dict.contact as any)?.whatsappMessage || "Merhaba, Cebeci Medikal hakkında bilgi almak istiyorum.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{dict.common.writeWhatsapp}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
