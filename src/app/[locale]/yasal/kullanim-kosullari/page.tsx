import { notFound } from "next/navigation";
import { ShieldCheck, ChevronRight, FileText } from "lucide-react";
import Link from "next/link";
import { Locale, isValidLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
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
    title: `${dict.footer.terms} | Cebeci Medikal`,
    description: "Cebeci Medikal Web Platformu Kullanım Koşulları.",
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const currentLocale = locale as Locale;
  const dict = getDictionary(currentLocale);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-10">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-foreground-muted flex-wrap">
        <Link href={`/${currentLocale}`} className="hover:text-primary transition-colors">
          {dict.nav.home}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground">{dict.footer.terms}</span>
      </nav>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
          <FileText className="w-3.5 h-3.5" />
          <span>Şartlar & Koşullar</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
          {dict.footer.terms}
        </h1>
        <div className="text-xs text-foreground-muted">
          Son Güncelleme: 01 Ocak 2026
        </div>
      </div>

      <div className="prose prose-invert max-w-none text-sm sm:text-base text-foreground-muted leading-relaxed space-y-6">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">1. Platformun Amacı ve Kapsamı</h2>
          <p>
            Cebeci Medikal web sitesi bir e-ticaret platformu değildir. Sitemizdeki ürün ve hizmet sunumları kurumsal tanıtım, teknik bilgilendirme ve teklif talep süreçlerini kolaylaştırmak amacıyla hazırlanmıştır. Çevrim içi doğrudan ödeme veya sepet sistemi bulunmamaktadır.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">2. Fikri Mülkiyet Hakları</h2>
          <p>
            Sitede yer alan tüm ticari unvanlar, logolar, ürün görselleri, teknik açıklamalar ve yazılım kodları Cebeci Medikal&apos;e ve/veya lisans sahiplerine aittir. İzinsiz kopyalanamaz, çoğaltılamaz ve ticari amaçla kullanılamaz.
          </p>
        </section>
      </div>
    </div>
  );
}
