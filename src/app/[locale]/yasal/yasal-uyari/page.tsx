import { notFound } from "next/navigation";
import { AlertTriangle, ChevronRight, ShieldCheck } from "lucide-react";
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
    title: `${dict.footer.disclaimer} | Cebeci Medikal`,
    description: "Cebeci Medikal Tıbbi Sorumluluk Reddi ve Yasal Uyarı Bildirimi.",
  };
}

export default async function DisclaimerPage({
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
        <span className="text-foreground">{dict.footer.disclaimer}</span>
      </nav>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Yasal Bildirim</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
          {dict.footer.disclaimer}
        </h1>
        <div className="text-xs text-foreground-muted">
          Son Güncelleme: 01 Ocak 2026
        </div>
      </div>

      <div className="prose prose-invert max-w-none text-sm sm:text-base text-foreground-muted leading-relaxed space-y-6">
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs leading-relaxed">
          <strong>Önemli Tıbbi Uyarı:</strong> Bu sitede yer alan içerikler, medikal cihaz ve teknik servis tanıtımı amaçlıdır. Tıbbi teşhis, tanı veya tedavi tavsiyesi niteliği taşımamaktadır.
        </div>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">1. Tıbbi Tavsiye Niteliği Taşımaması</h2>
          <p>
            Cebeci Medikal web sitesinde yayınlanan ürün açıklamaları, teknik parametreler ve biyomedikal bilgiler sağlık profesyonellerine (hekimler, hastane yöneticileri, biyomedikal mühendisler) yönelik donanım bilgilendirmesi amacı taşır. Herhangi bir tıbbi teşhis koymaz, tedavi yöntemi önermez ve klinik bir sonucu garanti etmez.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">2. Teknik Özellikler ve Değişiklik Hakkı</h2>
          <p>
            Ürünlerin teknik parametreleri ve konfigürasyonları üretici firmaların geliştirmelerine bağlı olarak güncellenebilir. Kesin teknik şartname uygunluğu resmi tekliflendirme sürecinde teyit edilmelidir.
          </p>
        </section>
      </div>
    </div>
  );
}
