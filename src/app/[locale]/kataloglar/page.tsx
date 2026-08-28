import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FileText,
  Download,
  ShieldCheck,
  Activity,
  Wrench,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Layers,
  ArrowRight,
} from "lucide-react";
import { Locale, isValidLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { getCatalogs } from "@/lib/data";
import { CatalogDownloadButton } from "@/features/catalogs/CatalogDownloadButton";
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
    title: `${dict.catalogs.pageTitle} | Cebeci Medikal`,
    description: dict.catalogs.pageSubtitle,
  };
}

const CATEGORY_ICONS: Record<string, any> = {
  "Genel": FileText,
  "Genel Katalog": FileText,
  "Yoğun Bakım": Activity,
  "2. El Cihazlar": ShieldCheck,
  "2. El Revizyonlu": ShieldCheck,
  "Teknik Servis": Wrench,
};

const CATALOG_FEATURES_BY_LOCALE: Record<string, Record<number, string[]>> = {
  tr: {
    1: [
      "54 Farklı Medikal Cihaz & Model Detayları",
      "Klinik Uygulama Alanları & Konfigürasyon Kodları",
      "TSE HYB & IEC 62353 Kalite Güvence Standartları",
    ],
    2: [
      "Ventilatör, Monitör, Küvöz ve Defibrilatör Modelleri",
      "Doğrulanmış Ventilasyon Modları ve Sensör Parametreleri",
      "Yoğun Bakım Üniteleri İçin Anahtar Teslim Donanım Listesi",
    ],
    3: [
      "Periyodik Koruyucu Bakım & STK/MTK Protokolleri",
      "Komponent Düzeyinde Elektronik Kart Onarım Süreçleri",
      "7/24 Acil Arıza Müdahale ve Servis Sözleşmesi Şartnamesi",
    ],
    4: [
      "Revizyonu Yapılmış ve Kalibre Edilmiş 2. El Cihaz Parkuru",
      "1 Yıl Cebeci Medikal Tam Garanti Kapsamı",
      "Ekonomik Fiyatlandırma ve Bütçe Planlama Rehberi",
    ],
  },
  en: {
    1: [
      "54 Advanced Medical Devices & Clinical Models",
      "Clinical Applications & Configuration Codes",
      "Certified to TSE HYB & IEC 62353 Standards",
    ],
    2: [
      "Ventilators, Monitors, Incubators & Defibrillators",
      "Verified Ventilation Modes & Sensor Parameter Matrix",
      "Turnkey ICU Equipment Inventory Specification",
    ],
    3: [
      "Preventive Maintenance & Safety Test Protocols",
      "Component-Level PCB Diagnostics & Repair Workflows",
      "24/7 Emergency Support & Technical Service SLA",
    ],
    4: [
      "Fully Refurbished & Calibrated Pre-Owned Equipment",
      "Comprehensive 1-Year Cebeci Medikal Warranty",
      "Cost-Efficient Procurement & Budget Guide",
    ],
  },
  de: {
    1: [
      "54 Medizingeräte & Modellkonfigurationen",
      "Klinische Anwendungsbereiche & Spezifikationen",
      "Zertifiziert nach TSE HYB & IEC 62353",
    ],
    2: [
      "Beatmung, Monitoring, Inkubatoren & Defibrillatoren",
      "Geprüfte Beatmungsmodi & Sensorparameter",
      "Schlüsselfertige OP- & Intensivpflege-Ausstattung",
    ],
    3: [
      "Präventive Instandhaltung & STK-Prüfprotokolle",
      "Elektronik- & Platinenreparatur auf Bauteilebene",
      "24/7 Notfall-Support & Serviceverträge",
    ],
    4: [
      "Generalüberholte & kalibrierte Gebrauchtgeräte",
      "1 Jahr Cebeci Medikal Vollgarantie",
      "Wirtschaftliche Beschaffungs- & Budgetplanung",
    ],
  },
  ar: {
    1: [
      "تفاصيل أكثر من 54 جهازاً ونموذجاً طبياً جراحياً",
      "مجالات الاستخدام السريري وأكواد التكوين الفني",
      "معايير الجودة المعتمدة وفق TSE HYB و IEC 62353",
    ],
    2: [
      "أجهزة التنفس، المراقبة، الحاضنات وأجهزة الصدمات",
      "أنماط تهوية معتمدة ومعايير حساسات دقيقة",
      "قائمة تجهيزات متكاملة لوحدات العناية المركزة",
    ],
    3: [
      "بروتوكولات الصيانة الوقائية واختبارات الأمان",
      "إصلاح الدوائر الإلكترونية على مستوى المكونات",
      "دعم طوارئ على مدار الساعة وعقود صيانة معتمدة",
    ],
    4: [
      "أسطول أجهزة مستعملة مجددة ومعايرة بالكامل",
      "ضمان فني شامل لمدة عام كامل من جبيجي ميديكال",
      "دليل التخطيط المالي وتوفير الميزانية",
    ],
  },
  ja: {
    1: [
      "54機種の医療機器・システム詳細仕様",
      "臨床適用分野および構成コンフィギュレーション",
      "TSE HYBおよびIEC 62353国際安全基準準拠",
    ],
    2: [
      "人工呼吸器、生体モニター、保育器、除細動器",
      "検証済み換気モードおよびセンサー測定パラメータ",
      "集中治療室（ICU）向けワンストップ導入仕様",
    ],
    3: [
      "定期予防保守点検および電気安全試験手順",
      "基板レベルの電子回路精密診断と修理工程",
      "24時間緊急障害対応および年間保守契約仕様",
    ],
    4: [
      "オーバーホールおよび精密校正済み認定中古機器",
      "1年間のCebeci Medikal完全動作保証",
      "高コストパフォーマンス調達・予算策定ガイド",
    ],
  },
  zh: {
    1: [
      "54款临床高精尖医疗设备与配置参数详单",
      "适用科室分类、临床应用场景与配置代码",
      "全面符合 TSE HYB 及 IEC 62353 质量安全标准",
    ],
    2: [
      "呼吸机、监护仪、婴儿培养箱及除颤仪全系列",
      "经临床验证的精密通气模式与传感器参数矩阵",
      "重症监护中心 (ICU) 一站式装机选型方案",
    ],
    3: [
      "周期性预防性维保与电气安全质控检测规程",
      "精密芯片级主板维修与原厂配件维保流程",
      "全天候紧急故障抢修响应与维保合约条款",
    ],
    4: [
      "官方深度翻新与计量检定合格认证设备现货",
      "享受 Cebeci Medikal 官方 1 年完整整机质保",
      "高性价比医疗设备采购与预算编制指导手册",
    ],
  },
};

export default async function CatalogsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const currentLocale = locale as Locale;
  const dict = getDictionary(currentLocale);
  const catalogs = await getCatalogs(currentLocale);
  const localeFeatures = CATALOG_FEATURES_BY_LOCALE[currentLocale] || CATALOG_FEATURES_BY_LOCALE.tr;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-16">
      {/* Page Header */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
          <BookOpen className="w-4 h-4 flex-shrink-0" />
          <span>{dict.nav.catalogs || "Kataloglar"}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-foreground tracking-tight">
          {dict.catalogs.pageTitle || "Tıbbi Cihaz & Hizmet Katalogları"}
        </h1>
        <p className="text-base sm:text-lg text-foreground-muted leading-relaxed">
          {dict.catalogs.pageSubtitle ||
            "Cebeci Medikal'in sıfır ve revizyonlu tıbbi cihaz envanterini, teknik şartnamelerini ve biyomedikal servis rehberlerini yüksek çözünürlüklü PDF formatında inceleyin veya indirin."}
        </p>
      </div>

      {/* Catalogs Clean Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {catalogs.map((cat, index) => {
          const IconComp = CATEGORY_ICONS[cat.category] || FileText;
          const features = localeFeatures[cat.sortOrder || index + 1] || localeFeatures[1];

          return (
            <div
              key={cat.id}
              className="group p-7 sm:p-8 rounded-3xl bg-surface border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Category & Meta Header Row */}
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider">
                    <IconComp className="w-4 h-4 flex-shrink-0" />
                    <span>{cat.category}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-foreground-muted">
                      {dict.catalogs.size || "Boyut"}: <strong className="text-foreground">{cat.fileSize}</strong>
                    </span>
                    {cat.downloadCount > 0 && (
                      <span className="text-[11px] font-semibold text-foreground-muted px-2.5 py-0.5 rounded-lg bg-surface-2 border border-border">
                        {cat.downloadCount.toLocaleString()}+ {dict.catalogs?.opened || "İndirme"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h2 className="font-serif text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                  {cat.title}
                </h2>

                {/* Description */}
                <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                  {cat.description}
                </p>

                {/* Highlights List */}
                <div className="pt-2 space-y-2">
                  {features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-6 border-t border-border flex items-center justify-between gap-4">
                <span className="text-xs text-foreground-muted flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-primary" />
                  <span>{dict.catalogs.officialDoc || "Resmi Ürün Dokümanı"}</span>
                </span>

                <CatalogDownloadButton
                  catalogId={cat.id}
                  fileUrl={cat.fileUrl}
                  title={cat.title}
                  initialCount={cat.downloadCount}
                  btnText={dict.catalogs.viewAndDownload || "PDF İncele & İndir"}
                  openedText={dict.catalogs.openedAndDownloaded || "Açıldı & İndirildi"}
                  directDownloadText={dict.catalogs.directDownload || "Doğrudan İndir"}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Request Custom Specification CTA */}
      <div className="p-8 sm:p-12 rounded-3xl bg-surface-2/50 border border-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="font-serif text-2xl font-bold text-foreground">
            {dict.references?.ctaTitle || "Özel Teknik Şartname veya İhale Dokümanı mı Gerekiyor?"}
          </h3>
          <p className="text-xs sm:text-sm text-foreground-muted max-w-xl leading-relaxed">
            {dict.references?.ctaSubtitle || "Hastaneler ve sağlık kuruluşları için kurumunuza özel medikal şartname ve ekipman listesi hazırlıyoruz."}
          </p>
        </div>
        <Link
          href={`/${currentLocale}/teklif?konu=${encodeURIComponent(dict.quote?.topicService || "Şartname Talebi")}`}
          className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold shadow-md shadow-primary/20 transition-all flex items-center gap-2 flex-shrink-0"
        >
          <span>{dict.hero?.ctaQuote || "Teklif İste"}</span>
          <ArrowRight className="w-4 h-4 rtl:rotate-180" />
        </Link>
      </div>
    </div>
  );
}
