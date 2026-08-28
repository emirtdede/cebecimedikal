import { notFound } from "next/navigation";
import { ShieldCheck, CheckCircle2, AlertCircle, FileCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
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
    title: `KVKK Aydınlatma Metni | Cebeci Medikal`,
    description:
      "6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca veri işleme, saklama ve veri sahibi haklarına ilişkin resmi aydınlatma metni.",
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

  return (
    <LegalLayout
      locale={currentLocale}
      activeSlug="kvkk-aydinlatma-metni"
      badge="KVKK Kapsamı & Aydınlatma Yükümlülüğü"
      icon={ShieldCheck}
      title="KVKK Aydınlatma Metni"
      subtitle="6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca kişisel verilerinizin işlenme amaçları, hukuki sebepleri, toplanma yöntemleri ve yasal haklarınız hakkında detaylı bilgilendirme."
      documentCode="CBM-KVKK-2026.01"
      lastUpdated="01 Ocak 2026"
    >
      {/* Intro Note */}
      <div className="p-5 rounded-2xl bg-primary/10 border border-primary/20 text-foreground flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm leading-relaxed">
          <strong>Cebeci Tıbbi Cihazlar ve Medikal Hizmetleri Ltd. Şti.</strong> (&ldquo;Cebeci Medikal&rdquo;) olarak; hastaneler, klinikler, sağlık profesyonelleri ve web sitemizi ziyaret eden tüm paydaşlarımızın kişisel verilerinin gizliliğine, güvenliğine ve kanuna uygun işlenmesine en üst düzeyde hassasiyet göstermekteyiz.
        </div>
      </div>

      {/* Section 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-surface-2 text-primary font-serif font-bold text-sm flex items-center justify-center border border-border">1</span>
          <span>Veri Sorumlusunun Kimliği</span>
        </h2>
        <p>
          6698 sayılı Kişisel Verilerin Korunması Kanunu (&ldquo;KVKK&rdquo;) ve ikincil mevzuat uyarınca, <strong>Cebeci Tıbbi Cihazlar ve Medikal Hizmetleri Ltd. Şti.</strong> (&ldquo;Cebeci Medikal&rdquo;), Veri Sorumlusu sıfatına haizdir.
        </p>
        <div className="p-4 rounded-xl bg-surface-2/60 border border-border space-y-1.5 text-xs sm:text-sm">
          <div><strong>Ticaret Unvanı:</strong> Cebeci Tıbbi Cihazlar ve Medikal Hizmetleri Ltd. Şti.</div>
          <div><strong>Adres:</strong> Fevzi Çakmak Mah. Cumhuriyet Bulvarı No: 83/A, Sincan / Ankara</div>
          <div><strong>İletişim E-Posta:</strong> cbcmedikal@gmail.com</div>
          <div><strong>Müşteri Hizmetleri:</strong> +90 506 606 15 40 / +90 506 835 57 41</div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-surface-2 text-primary font-serif font-bold text-sm flex items-center justify-center border border-border">2</span>
          <span>İşlenen Kişisel Veri Kategorileri</span>
        </h2>
        <p>
          Tıbbi cihaz satışı, 2. el revizyon, periyodik bakım, onarım, kalibrasyon ve web sitemiz üzerindeki teklif formları süreçlerinde işlenen kişisel veriler şunlardır:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          <div className="p-3.5 rounded-xl bg-surface-2/50 border border-border/80 space-y-1">
            <div className="font-bold text-foreground text-xs uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
              <span>Kimlik & İletişim Bilgileri</span>
            </div>
            <p className="text-xs text-foreground-muted">Ad, soyad, kurum/hastane/klinik unvanı, görev/unvan, telefon numarası, kurumsal e-posta adresi, fatura ve sevk adresi.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-surface-2/50 border border-border/80 space-y-1">
            <div className="font-bold text-foreground text-xs uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
              <span>Müşteri & Servis İşlem Verisi</span>
            </div>
            <p className="text-xs text-foreground-muted">Teklif talepleri, cihaz marka/model/seri numarası envanter bilgileri, servis ve arıza geçmişi kayıtları, bakım sözleşmeleri.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-surface-2/50 border border-border/80 space-y-1">
            <div className="font-bold text-foreground text-xs uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
              <span>Finansal & Muhasebe Verileri</span>
            </div>
            <p className="text-xs text-foreground-muted">Fatura bilgileri, vergi dairesi ve numarası, banka hesap/IBAN bilgileri, cari hesap hareketleri ve ödeme kayıtları.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-surface-2/50 border border-border/80 space-y-1">
            <div className="font-bold text-foreground text-xs uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
              <span>İşlem Güvenliği & Ağ Logları</span>
            </div>
            <p className="text-xs text-foreground-muted">Web sitesi IP adresleri, sunucu erişim log kayıtları, oturum çerezleri, gezinme ve form gönderim zaman damgaları.</p>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-surface-2 text-primary font-serif font-bold text-sm flex items-center justify-center border border-border">3</span>
          <span>Kişisel Verilerin İşlenme Amaçları</span>
        </h2>
        <p>
          Toplanan kişisel verileriniz, KVKK&apos;nın 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları dahilinde aşağıdaki amaçlarla sınırlı olarak işlenmektedir:
        </p>
        <ul className="space-y-2 pl-2">
          <li className="flex items-start gap-2 text-xs sm:text-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <span>Tıbbi cihaz, sarf malzeme ve teknik servis fiyat tekliflerinin hazırlanması ve tarafınıza iletilmesi,</span>
          </li>
          <li className="flex items-start gap-2 text-xs sm:text-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <span>Sağlık Bakanlığı TİTCK ve Ürün Takip Sistemi (ÜTS) mevzuatı gereği cihaz sevk, bildirim ve teknik servis takip işlemlerinin yürütülmesi,</span>
          </li>
          <li className="flex items-start gap-2 text-xs sm:text-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <span>Periyodik koruyucu bakım, onarım, parça değişimi ve kalibrasyon faaliyetlerinin icrası,</span>
          </li>
          <li className="flex items-start gap-2 text-xs sm:text-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <span>Finans, muhasebe, faturalama ve mutabakat süreçlerinin yasal standartlara uygun olarak yönetilmesi,</span>
          </li>
          <li className="flex items-start gap-2 text-xs sm:text-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <span>Müşteri memnuniyeti, teknik destek operasyonları ve yetkili servis koordinasyonunun sağlanması.</span>
          </li>
        </ul>
      </section>

      {/* Section 4 */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-surface-2 text-primary font-serif font-bold text-sm flex items-center justify-center border border-border">4</span>
          <span>Veri İşlemenin Hukuki Sebepleri</span>
        </h2>
        <p>
          Kişisel verileriniz, KVKK Madde 5/2 kapsamında aşağıdaki hukuki gerekçelere dayanılarak işlenmektedir:
        </p>
        <div className="space-y-2 text-xs sm:text-sm">
          <div className="p-3 rounded-xl bg-surface-2/40 border border-border">
            <strong>Madde 5/2-c:</strong> Bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması (Teklif sunumu, bakım sözleşmeleri, cihaz satışı).
          </div>
          <div className="p-3 rounded-xl bg-surface-2/40 border border-border">
            <strong>Madde 5/2-ç:</strong> Veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi için zorunlu olması (TİTCK ÜTS kayıtları, Vergi Usul Kanunu, Türk Ticaret Kanunu).
          </div>
          <div className="p-3 rounded-xl bg-surface-2/40 border border-border">
            <strong>Madde 5/2-f:</strong> İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla, veri sorumlusunun meşru menfaatleri için veri işlenmesinin zorunlu olması.
          </div>
        </div>
      </section>

      {/* Section 5 */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-surface-2 text-primary font-serif font-bold text-sm flex items-center justify-center border border-border">5</span>
          <span>Kişisel Verilerin Aktarılması</span>
        </h2>
        <p>
          Kişisel verileriniz hiçbir şekilde üçüncü kişilere ticari veya pazarlama amacıyla satılmaz. Ancak yasal zorunluluklar ve hizmet ifası gereği:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
          <li>Yetkili kamu kurum ve kuruluşları (Sağlık Bakanlığı, Gelir İdaresi Başkanlığı, TİTCK, Adli Merciler),</li>
          <li>Cihaz teslimatı ve lojistik süreçlerini yürüten anlaşmalı kargo/nakliye firmaları,</li>
          <li>Mali müşavirlik, bağımsız denetim, bilişim altyapı ve hukuki danışmanlık hizmeti aldığımız iş ortaklarımız ile kanuni sınırlar çerçevesinde paylaşılabilmektedir.</li>
        </ul>
      </section>

      {/* Section 6 */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-surface-2 text-primary font-serif font-bold text-sm flex items-center justify-center border border-border">6</span>
          <span>KVKK Madde 11 Kapsamındaki Haklarınız</span>
        </h2>
        <p>
          Veri sahibi olarak Şirketimize başvurarak aşağıdaki haklarınızı her zaman kullanabilirsiniz:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs sm:text-sm">
          <div className="p-3 rounded-xl bg-surface-2/40 border border-border flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <span>Kişisel verilerinizin işlenip işlenmediğini öğrenme</span>
          </div>
          <div className="p-3 rounded-xl bg-surface-2/40 border border-border flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <span>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</span>
          </div>
          <div className="p-3 rounded-xl bg-surface-2/40 border border-border flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <span>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</span>
          </div>
          <div className="p-3 rounded-xl bg-surface-2/40 border border-border flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <span>Yurt içinde veya yurt dışında verilerin aktarıldığı 3. kişileri bilme</span>
          </div>
          <div className="p-3 rounded-xl bg-surface-2/40 border border-border flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <span>Eksik veya yanlış işlenmişse düzeltilmesini isteme</span>
          </div>
          <div className="p-3 rounded-xl bg-surface-2/40 border border-border flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <span>KVKK Madde 7 uyarınca silinmesini veya yok edilmesini talep etme</span>
          </div>
        </div>
      </section>
    </LegalLayout>
  );
}
