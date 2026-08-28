import { notFound } from "next/navigation";
import { ShieldCheck, ChevronRight } from "lucide-react";
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
    title: `${dict.footer.privacy} | Cebeci Medikal`,
    description: "Cebeci Medikal Gizlilik Politikası ve Güvenlik İlkeleri.",
  };
}

export default async function PrivacyPage({
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
        <span className="text-foreground">{dict.footer.privacy}</span>
      </nav>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Veri Güvenliği</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
          {dict.footer.privacy}
        </h1>
        <div className="text-xs text-foreground-muted">
          Son Güncelleme: 01 Ocak 2026
        </div>
      </div>

      <div className="prose prose-invert max-w-none text-sm sm:text-base text-foreground-muted leading-relaxed space-y-6">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">1. Gizlilik Taahhüdümüz</h2>
          <p>
            Cebeci Medikal, ziyaretçilerinin ve müşterilerinin kişisel mahremiyetine ve veri güvenliğine en üst düzeyde önem vermektedir. Platformumuz, kullanıcı deneyimini iyileştirmek amacıyla yalnızca kanunen izin verilen ve açık rıza dahilinde toplanan verileri işlemektedir.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">2. Güvenlik Önlemleri</h2>
          <p>
            Web sitemiz SSL/TLS 256-bit şifreleme sertifikası ile korunmakta olup, iletilen form verileri güvenli veri tabanlarımızda saklanmaktadır. Veri tabanlarımıza yetkisiz erişimi engellemek için endüstri standardı güvenlik duvarları ve rol tabanlı erişim kısıtlamaları (RBAC) uygulanmaktadır.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">3. Üçüncü Taraf Hizmetler</h2>
          <p>
            Web sitemizde kullanılan birinci taraf analitik sistemi, kullanıcıları gizlice izlemek (fingerprinting vb.) yerine anonim ziyaret ve oturum metrikleri üretmek üzere tasarlanmıştır. Çerez tercihleriniz doğrultusunda analitik izleme dilediğiniz an durdurulabilir.
          </p>
        </section>
      </div>
    </div>
  );
}
