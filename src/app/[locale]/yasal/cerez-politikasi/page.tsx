import { notFound } from "next/navigation";
import { Cookie, CheckCircle2, Sliders, Shield, Laptop, RefreshCw } from "lucide-react";
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
    title: `Çerez (Cookie) Politikası & Tercih Yönetimi | Cebeci Medikal`,
    description:
      "Cebeci Medikal web platformunda kullanılan çerez türleri, kullanım amaçları, saklama süreleri ve çerez tercih yönetimi rehberi.",
  };
}

export default async function CookiePolicyPage({
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
      activeSlug="cerez-politikasi"
      badge="Çerez Yönetimi & Şeffaflık"
      icon={Cookie}
      title="Çerez (Cookie) Politikası"
      subtitle="Web sitemizi ziyaret ettiğinizde kullanılan çerezlerin (cookies) türleri, işlevleri, saklama süreleri ve tarayıcı bazlı kontrol yöntemleri hakkında bilgilendirme."
      documentCode="CBM-CRZ-2026.01"
      lastUpdated="01 Ocak 2026"
    >
      {/* Intro Box */}
      <div className="p-5 rounded-2xl bg-surface-2 border border-border space-y-2">
        <div className="flex items-center gap-2 text-foreground font-bold text-sm">
          <Cookie className="w-4 h-4 text-primary" />
          <span>Şeffaf ve Gizlilik Öncelikli Çerez Yaklaşımı</span>
        </div>
        <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
          Cebeci Medikal olarak, web sitemiz (<strong>cebecimedikal.com</strong>) üzerindeki kullanıcı deneyiminizi zenginleştirmek, güvenliği sağlamak ve sistem performansını optimize etmek amacıyla birinci taraf çerezler kullanmaktayız. Sitemizde izinsiz kişisel veri toplayan 3. taraf reklam çerezleri kullanılmamaktadır.
        </p>
      </div>

      {/* Section 1: Çerez Nedir? */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-surface-2 text-primary font-serif font-bold text-sm flex items-center justify-center border border-border">1</span>
          <span>Çerez (Cookie) Nedir ve Neden Kullanılır?</span>
        </h2>
        <p>
          Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza (bilgisayar, tablet, akıllı telefon) kaydedilen küçük metin dosyalarıdır. Çerezler, web sitesinin düzgün çalışmasını sağlamak, tercihlerinizi (dil, tema vb.) hatırlamak ve gezinme deneyiminizi daha hızlı ve güvenli hale getirmek amacıyla kullanılır.
        </p>
      </section>

      {/* Section 2: Çerez Türleri */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-surface-2 text-primary font-serif font-bold text-sm flex items-center justify-center border border-border">2</span>
          <span>Sitemizde Kullanılan Çerez Kategorileri</span>
        </h2>
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-surface-2/40 border border-border space-y-1.5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span>A. Zorunlu ve Teknik Çerezler (Strictly Necessary)</span>
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">Zorunlu</span>
            </div>
            <p className="text-xs text-foreground-muted">
              Web sitemizin temel fonksiyonlarının (sayfa navigasyonu, CSRF form güvenliği, oturum devamlılığı) çalışması için zorunludur. Bu çerezler devre dışı bırakılamaz.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-2/40 border border-border space-y-1.5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
                <Sliders className="w-4 h-4 text-primary" />
                <span>B. İşlevsellik ve Tercih Çerezleri (Preferences)</span>
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary border border-primary/20">İsteğe Bağlı</span>
            </div>
            <p className="text-xs text-foreground-muted">
              Seçtiğiniz arayüz temasının (Navy, White, Black, Green) ve dil tercihinizin (Türkçe, İngilizce vb.) sonraki ziyaretlerinizde otomatik olarak yüklenmesini sağlar.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-2/40 border border-border space-y-1.5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
                <Laptop className="w-4 h-4 text-sky-500" />
                <span>C. Performans ve Birinci Taraf Analitik Çerezleri</span>
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/10 text-sky-500 border border-sky-500/20">Anonim</span>
            </div>
            <p className="text-xs text-foreground-muted">
              Web sitemizin hızını, hangi tıbbi cihaz kategorilerinin daha sık ziyaret edildiğini ve hata sayfalarını anonim metrikler halinde ölçmemize yardımcı olur.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Çerez Envanteri Tablosu */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-surface-2 text-primary font-serif font-bold text-sm flex items-center justify-center border border-border">3</span>
          <span>Kullanılan Çerezler Envanter Tablosu</span>
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-2 text-foreground font-bold border-b border-border">
              <tr>
                <th className="p-3">Çerez Adı</th>
                <th className="p-3">Kategori</th>
                <th className="p-3">Kullanım Amacı</th>
                <th className="p-3">Saklama Süresi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-foreground-muted">
              <tr>
                <td className="p-3 font-mono font-bold text-foreground">cbm_theme</td>
                <td className="p-3">İşlevsellik</td>
                <td className="p-3">Kullanıcının seçtiği renk temasını saklar</td>
                <td className="p-3">1 Yıl</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-foreground">cbm_locale</td>
                <td className="p-3">İşlevsellik</td>
                <td className="p-3">Seçilen arayüz dil tercihini hatırlar</td>
                <td className="p-3">1 Yıl</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-foreground">cbm_cookie_consent</td>
                <td className="p-3">Zorunlu</td>
                <td className="p-3">Çerez izin onay tercihinizi kaydeder</td>
                <td className="p-3">1 Yıl</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-foreground">cbm_session</td>
                <td className="p-3">Zorunlu</td>
                <td className="p-3">Güvenli form oturumu ve CSRF koruması</td>
                <td className="p-3">Oturum Süresince</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: Çerezleri Yönetme ve Devre Dışı Bırakma */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-surface-2 text-primary font-serif font-bold text-sm flex items-center justify-center border border-border">4</span>
          <span>Tarayıcı Ayarları ile Çerez Kontrolü</span>
        </h2>
        <p>
          Çerezleri dilediğiniz zaman tarayıcınızın ayarlar menüsünden silebilir, engelleyebilir veya bildirim alacak şekilde yapılandırabilirsiniz:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          <div className="p-3 rounded-xl bg-surface-2/50 border border-border">
            <strong>Google Chrome:</strong> Ayarlar &gt; Gizlilik ve Güvenlik &gt; Çerezler ve Diğer Site Verileri
          </div>
          <div className="p-3 rounded-xl bg-surface-2/50 border border-border">
            <strong>Mozilla Firefox:</strong> Seçenekler &gt; Gizlilik ve Güvenlik &gt; Çerezler ve Site Verileri
          </div>
          <div className="p-3 rounded-xl bg-surface-2/50 border border-border">
            <strong>Apple Safari:</strong> Tercihler &gt; Gizlilik &gt; Tüm Çerezleri Engelle / Yönet
          </div>
          <div className="p-3 rounded-xl bg-surface-2/50 border border-border">
            <strong>Microsoft Edge:</strong> Ayarlar &gt; Site İzinleri &gt; Çerezler ve Depolanan Veriler
          </div>
        </div>
      </section>
    </LegalLayout>
  );
}
