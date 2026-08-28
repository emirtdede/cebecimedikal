import { notFound } from "next/navigation";
import { ShieldCheck, FileText, ChevronRight } from "lucide-react";
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
    title: `${dict.footer.kvkk} | Cebeci Medikal`,
    description: "6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca aydınlatma metni.",
  };
}

export default async function KvkkPage({
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
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-foreground-muted flex-wrap">
        <Link href={`/${currentLocale}`} className="hover:text-primary transition-colors">
          {dict.nav.home}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground">{dict.footer.kvkk}</span>
      </nav>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>KVKK Kapsamı</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
          {dict.footer.kvkk}
        </h1>
        <div className="text-xs text-foreground-muted">
          Son Güncelleme: 01 Ocak 2026 | Veri Sorumlusu: Cebeci Tıbbi Cihazlar ve Medikal Hizmetleri Ltd. Şti.
        </div>
      </div>

      <div className="prose prose-invert max-w-none text-sm sm:text-base text-foreground-muted leading-relaxed space-y-6">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">1. Veri Sorumlusunun Kimliği</h2>
          <p>
            6698 sayılı Kişisel Verilerin Korunması Kanunu (&ldquo;KVKK&rdquo;) uyarınca, <strong>Cebeci Tıbbi Cihazlar ve Medikal Hizmetleri Ltd. Şti.</strong> (&ldquo;Cebeci Medikal&rdquo;) olarak, veri sorumlusu sıfatıyla, kişisel verilerinizi aşağıda açıklanan amaçlar kapsamında hukuka ve dürüstlük kurallarına uygun şekilde işleyebilmekteyiz.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">2. İşlenen Kişisel Veriler ve İşleme Amaçları</h2>
          <p>
            Web sitemizdeki Teklif Talep ve İletişim formları aracılığıyla toplanan Ad-Soyad, Kurum Adı, E-posta Adresi, Telefon Numarası, İl/Lokasyon bilgileri ve mesaj içeriğiniz;
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Talep ettiğiniz tıbbi cihaz ve biyomedikal teknik servis tekliflerinin hazırlanması ve tarafınıza iletilmesi,</li>
            <li>İletişim taleplerinizin yanıtlanması ve satış sonrası teknik destek koordinasyonunun sağlanması,</li>
            <li>Yasal ve idari yükümlülüklerin yerine getirilmesi amaçlarıyla sınırlı olarak işlenmektedir.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">3. Kişisel Verilerin Aktarılması</h2>
          <p>
            Toplanan kişisel verileriniz, üçüncü şahıslara ticari amaçla satılmamakta veya pazarlama amacıyla paylaşılmamaktadır. Yalnızca yasal zorunluluk halinde yetkili adli veya idari mercilerle paylaşılabilir.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">4. KVKK Madde 11 Kapsamındaki Haklarınız</h2>
          <p>
            Veri sahibi olarak Cebeci Medikal&apos;e başvurarak; verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işlenme amacına uygun kullanılıp kullanılmadığını öğrenme ve silinmesini/düzeltilmesini talep etme haklarına sahipsiniz.
          </p>
          <p className="pt-2">
            Başvurularınızı <strong>cbcmedikal@gmail.com</strong> adresine e-posta göndererek iletebilirsiniz.
          </p>
        </section>
      </div>
    </div>
  );
}
