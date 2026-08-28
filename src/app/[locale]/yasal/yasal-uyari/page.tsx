import { notFound } from "next/navigation";
import { AlertTriangle, ShieldAlert, Stethoscope, FileCheck, CheckCircle2 } from "lucide-react";
import { Locale, isValidLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { LegalLayout } from "@/components/legal/LegalLayout";
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
    title: `Yasal Uyarı & Tıbbi Mevzuat Bildirimi | Cebeci Medikal`,
    description:
      "T.C. Sağlık Bakanlığı TİTCK mevzuatı, Tıbbi Cihaz Satış ve Reklam Yönetmeliği, tıbbi tavsiye reddi ve sorumluluk sınırları bildirimi.",
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

  return (
    <LegalLayout
      locale={currentLocale}
      activeSlug="yasal-uyari"
      badge="Tıbbi Mevzuat & Yasal Sorumluluk Reddi"
      icon={AlertTriangle}
      title="Yasal Uyarı & Tıbbi Mevzuat"
      subtitle="T.C. Sağlık Bakanlığı, Türkiye İlaç ve Tıbbi Cihaz Kurumu (TİTCK) yönetmelikleri ve tıbbi cihaz sektörü sorumluluk sınırlarına ilişkin resmi bildirim."
      documentCode="CBM-MEV-2026.01"
      lastUpdated="01 Ocak 2026"
    >
      {/* Important Medical Warning Callout */}
      <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-foreground space-y-2">
        <div className="flex items-center gap-2 text-amber-500 font-bold text-sm">
          <ShieldAlert className="w-5 h-5 flex-shrink-0" />
          <span>Önemli Tıbbi ve Hukuki Hatırlatma</span>
        </div>
        <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
          Bu web sitesinde yer alan tüm içerikler, ürün teknik şartnameleri ve biyomedikal açıklamalar <strong>yalnızca sağlık kuruluşlarına ve profesyonellerine teknik bilgilendirme</strong> amacıyla sunulmaktadır. Sitedeki hiçbir bilgi tıbbi teşhis, reçete veya tedavi tavsiyesi niteliği taşımaz.
        </p>
      </div>

      {/* Section 1: TİTCK Mevzuatı ve Sağlık Profesyonelleri Kapsamı */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-surface-2 text-primary font-serif font-bold text-sm flex items-center justify-center border border-border">1</span>
          <span>TİTCK Tıbbi Cihaz Satış, Reklam ve Tanıtım Yönetmeliği</span>
        </h2>
        <p>
          T.C. Sağlık Bakanlığı Türkiye İlaç ve Tıbbi Cihaz Kurumu (&ldquo;TİTCK&rdquo;) tarafından yürürlüğe konulan <em>Tıbbi Cihaz Satış, Reklam ve Tanıtım Yönetmeliği</em> hükümleri gereğince; doğrudan halka satışı ve tanıtımı sınırlandırılan tıbbi cihazların (ventilatör, anestezi cihazı, defibrilatör vb.) tanıtımı yalnızca sağlık kurumları yetkililerine, biyomedikal uzmanlarına ve hekimlere yöneliktir.
        </p>
      </section>

      {/* Section 2: Tıbbi Tavsiye Niteliği Taşımaması */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-surface-2 text-primary font-serif font-bold text-sm flex items-center justify-center border border-border">2</span>
          <span>Tıbbi Teşhis ve Tedavi Tavsiyesi Reddi</span>
        </h2>
        <p>
          Cebeci Medikal, bir sağlık hizmeti sunucusu veya muayenehane değildir. Sitemizde yer alan cihaz açıklamaları donanımın teknik işleyişi ve mühendislik kabiliyetleri ile ilgilidir. Hastalar veya üçüncü şahıslar herhangi bir sağlık sorunu için mutlaka yetkili bir hekime veya sağlık kuruluşuna başvurmalıdır.
        </p>
      </section>

      {/* Section 3: 2. El Revize Cihazlar ve ÜTS Uyumluluğu */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-surface-2 text-primary font-serif font-bold text-sm flex items-center justify-center border border-border">3</span>
          <span>2. El Revize Cihazlar & Ürün Takip Sistemi (ÜTS)</span>
        </h2>
        <p>
          Şirketimiz tarafından tedarik edilen ve satışı yapılan 2. el ve yenilenmiş tıbbi cihazlar;
        </p>
        <ul className="space-y-2 pl-2 text-xs sm:text-sm">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <span>Sağlık Bakanlığı Ürün Takip Sistemi (&ldquo;ÜTS&rdquo;) kayıt ve transfer kurallarına tam uyumlu olarak sevk edilir.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <span>Biyomedikal mühendislerimizce uluslararası <strong>IEC 62353 Tıbbi Elektriksel Güvenlik</strong> ve performans kalibrasyon testlerine tabi tutularak raporlandırılır.</span>
          </li>
        </ul>
      </section>

      {/* Section 4: Üçüncü Taraf Marka Beyanı */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-surface-2 text-primary font-serif font-bold text-sm flex items-center justify-center border border-border">4</span>
          <span>Üçüncü Taraf Marka, Model ve Tescil Hakları</span>
        </h2>
        <p>
          Sitede veya kataloglarda adı geçen üçüncü taraf marka isimleri, logolar ve model numaraları (Philips, GE Healthcare, Mindray, Dräger, Siemens vb.) yalnızca cihazların uyumluluğunu, teknik özelliklerini ve yedek parça referanslarını tanımlamak amacıyla kullanılmıştır. İlgili tüm ticari marka hakları tescil sahiplerine aittir.
        </p>
      </section>
    </LegalLayout>
  );
}
