import { notFound } from "next/navigation";
import { Lock, ShieldCheck, Server, KeyRound, Cpu, CheckCircle2 } from "lucide-react";
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
    title: `Gizlilik Politikası & Güvenlik İlkeleri | Cebeci Medikal`,
    description:
      "Cebeci Medikal kurumsal veri güvenliği, SSL/TLS şifreleme standartları, biyomedikal cihaz veri mahremiyeti ve gizlilik ilkeleri.",
  };
}

export default async function PrivacyPolicyPage({
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
      activeSlug="gizlilik-politikasi"
      badge="Kurumsal Veri Güvenliği & Mahremiyet"
      icon={Lock}
      title="Gizlilik Politikası"
      subtitle="Cebeci Medikal olarak ziyaretçilerimizin, hastane yöneticilerinin ve sağlık çalışanlarının dijital güvenliğini koruma taahhüdümüz ve veri koruma standartlarımız."
      documentCode="CBM-GZL-2026.01"
      lastUpdated="01 Ocak 2026"
    >
      {/* Intro Box */}
      <div className="p-5 rounded-2xl bg-surface-2 border border-border space-y-2">
        <div className="flex items-center gap-2 text-foreground font-bold text-sm">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span>Veri Mahremiyeti ve Güvenlik Taahhüdümüz</span>
        </div>
        <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
          Bu Gizlilik Politikası, Cebeci Medikal web sitesi (<strong>cebecimedikal.com</strong>) ve sunduğumuz biyomedikal mühendislik hizmetleri aracılığıyla toplanan, işlenen ve saklanan tüm verilerin güvenliğini teminat altına alan ilkeleri düzenlemektedir.
        </p>
      </div>

      {/* Section 1: Altyapı ve Şifreleme */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-surface-2 text-primary font-serif font-bold text-sm flex items-center justify-center border border-border">1</span>
          <span>Ağ ve İletişim Güvenliği (SSL/TLS Standartları)</span>
        </h2>
        <p>
          Platformumuz üzerinden iletilen tüm veriler (teklif talepleri, iletişim mesajları, cihaz envanter formları), endüstri standardı <strong>256-Bit SSL/TLS 1.3</strong> şifreleme protokolleri ile güvence altına alınmıştır.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="p-3 rounded-xl bg-surface-2/40 border border-border text-center space-y-1">
            <KeyRound className="w-5 h-5 text-primary mx-auto" />
            <div className="font-bold text-foreground text-xs">Uçtan Uca Şifreleme</div>
            <div className="text-[11px] text-foreground-muted">256-bit TLS şifreli veri tüneli</div>
          </div>
          <div className="p-3 rounded-xl bg-surface-2/40 border border-border text-center space-y-1">
            <Server className="w-5 h-5 text-primary mx-auto" />
            <div className="font-bold text-foreground text-xs">Güvenli Sunucu Mimarisi</div>
            <div className="text-[11px] text-foreground-muted">WAF & DDoS korumalı altyapı</div>
          </div>
          <div className="p-3 rounded-xl bg-surface-2/40 border border-border text-center space-y-1">
            <Cpu className="w-5 h-5 text-primary mx-auto" />
            <div className="font-bold text-foreground text-xs">Rol Tabanlı Yetkilendirme</div>
            <div className="text-[11px] text-foreground-muted">Sıkı RBAC erişim protokolleri</div>
          </div>
        </div>
      </section>

      {/* Section 2: Biyomedikal Cihazlarda Hasta Verisi Güvenliği */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-surface-2 text-primary font-serif font-bold text-sm flex items-center justify-center border border-border">2</span>
          <span>Tıbbi Cihaz Servisinde Hasta Verisi Mahremiyeti</span>
        </h2>
        <p>
          Teknik servis, 2. el revizyon, periyodik bakım veya kalibrasyon amacıyla atölyemize kabul edilen hasta başı monitörleri, EKG, ultrason ve ventilatör gibi dahili hafızaya sahip tıbbi cihazlarda:
        </p>
        <ul className="space-y-2 pl-2 text-xs sm:text-sm">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span>Cihaz hafızasında yer alabilecek geçmiş hasta kayıtları ve log verileri kesinlikle üçüncü şahıslara aktarılmaz ve ticari amaçla işlenmez.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span>2. El cihaz satış ve revizyon süreçlerinde cihaz üzerindeki tüm geçmiş hasta/kurum verileri uluslararası <strong>veri sanitizasyonu (Data Sanitization)</strong> standartlarına uygun olarak güvenli biçimde sıfırlanır.</span>
          </li>
        </ul>
      </section>

      {/* Section 3: Birinci Taraf Analitik ve Gizlilik */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-surface-2 text-primary font-serif font-bold text-sm flex items-center justify-center border border-border">3</span>
          <span>Gizlilik Odaklı Birinci Taraf Analitik</span>
        </h2>
        <p>
          Cebeci Medikal, kullanıcıların internetteki gezinme geçmişlerini izleyen harici reklam takipçileri (cross-site tracking) ve veri simsarları ile çalışmaz. Sitemizde kullanılan analiz sistemi:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
          <li>IP adreslerini anonimleştirerek kaydeder,</li>
          <li>Kişisel kimlik tespiti (fingerprinting) yapmaz,</li>
          <li>Toplanan trafik verilerini yalnızca site performansını optimize etmek amacıyla kendi korumalı sunucularımızda depolar.</li>
        </ul>
      </section>

      {/* Section 4: Uluslararası Ziyaretçiler & GDPR Uyumu */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-surface-2 text-primary font-serif font-bold text-sm flex items-center justify-center border border-border">4</span>
          <span>Uluslararası Standartlar & GDPR Uyumluluğu</span>
        </h2>
        <p>
          Avrupa Birliği (GDPR) ve diğer uluslararası bölgelerden web sitemizi ziyaret eden kullanıcılarımızın veri mahremiyeti hakları, &ldquo;Privacy by Design&rdquo; (Tasarımda Gizlilik) prensiplerimiz doğrultusunda korunmaktadır. Dilediğiniz an verilerinizin güncellenmesini, silinmesini veya işlenmesinin durdurulmasını talep edebilirsiniz.
        </p>
      </section>
    </LegalLayout>
  );
}
