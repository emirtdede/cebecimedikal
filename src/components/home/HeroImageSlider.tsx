"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Activity,
  Wrench,
  HeartPulse,
  RefreshCw,
} from "lucide-react";

interface SlideItem {
  image: string;
  badge: string;
  title: string;
  description: string;
  icon: any;
}

const HERO_SLIDES_BY_LOCALE: Record<string, SlideItem[]> = {
  tr: [
    {
      image: "/images/products/anestezi-cihazi-1.webp",
      badge: "Tıbbi Teknoloji & Cerrahi",
      title: "Ameliyathane & Yoğun Bakım Sistemleri",
      description: "Cebeci Medikal Güvencesiyle anahtar teslim kurulum ve tedarik",
      icon: ShieldCheck,
    },
    {
      image: "/images/products/otoklav-1.webp",
      badge: "7/24 Biyomedikal Destek",
      title: "TSE Belgeli Teknik Servis & Bakım",
      description: "Periyodik koruyucu bakım, kalibrasyon ve orijinal yedek parça",
      icon: Wrench,
    },
    {
      image: "/images/products/hastabasi-monitoru-1.webp",
      badge: "Kritik Yaşam Desteği",
      title: "Hasta Başı Monitörizasyon & EKG",
      description: "Yüksek hassasiyetli tanı ve kesintisiz hasta izleme çözümleri",
      icon: HeartPulse,
    },
    {
      image: "/images/products/ventilator-1.webp",
      badge: "Ekonomik & Güvenilir",
      title: "1 Yıl Garantili 2. El Revizyonlu Cihazlar",
      description: "Tüm elektriksel güvenlik testleri tamamlanmış medikal ekipman",
      icon: RefreshCw,
    },
  ],
  en: [
    {
      image: "/images/products/anestezi-cihazi-1.webp",
      badge: "Medical Tech & Surgery",
      title: "Operating Room & ICU Systems",
      description: "Turnkey delivery and supply backed by Cebeci Medikal guarantee",
      icon: ShieldCheck,
    },
    {
      image: "/images/products/otoklav-1.webp",
      badge: "24/7 Biomedical Support",
      title: "Certified Technical Service & Maintenance",
      description: "Periodic preventive maintenance, calibration, and genuine spare parts",
      icon: Wrench,
    },
    {
      image: "/images/products/hastabasi-monitoru-1.webp",
      badge: "Critical Life Support",
      title: "Patient Monitoring & ECG Systems",
      description: "High-precision diagnostic and continuous vital sign tracking",
      icon: HeartPulse,
    },
    {
      image: "/images/products/ventilator-1.webp",
      badge: "Cost-Effective & Trusted",
      title: "Refurbished Equipment with 1-Year Warranty",
      description: "Full electrical safety testing and verified biomedical standards",
      icon: RefreshCw,
    },
  ],
  de: [
    {
      image: "/images/products/anestezi-cihazi-1.webp",
      badge: "Medizintechnik & Chirurgie",
      title: "OP- & Intensivpflegesysteme",
      description: "Schlüsselfertige Lieferung und Ausstattung mit Cebeci-Garantie",
      icon: ShieldCheck,
    },
    {
      image: "/images/products/otoklav-1.webp",
      badge: "24/7 Technischer Support",
      title: "Zertifizierter Kundendienst & Wartung",
      description: "Periodische Instandhaltung, Kalibrierung und Originalersatzteile",
      icon: Wrench,
    },
    {
      image: "/images/products/hastabasi-monitoru-1.webp",
      badge: "Lebenserhaltende Systeme",
      title: "Patientenüberwachung & EKG-Diagnostik",
      description: "Hochpräzise Diagnostik und unterbrechungsfreie Vitalüberwachung",
      icon: HeartPulse,
    },
    {
      image: "/images/products/ventilator-1.webp",
      badge: "Wirtschaftlich & Geprüft",
      title: "Generalüberholte Geräte mit 1 Jahr Garantie",
      description: "Vollständige elektrische Sicherheitsprüfung und Qualitätskontrolle",
      icon: RefreshCw,
    },
  ],
  ar: [
    {
      image: "/images/products/anestezi-cihazi-1.webp",
      badge: "التكنولوجيا الطبية والجراحية",
      title: "أنظمة غرف العمليات والعناية المركزة",
      description: "توريد وتركيب متكامل بضمان سبيجي ميديكال المعتمد",
      icon: ShieldCheck,
    },
    {
      image: "/images/products/otoklav-1.webp",
      badge: "دعم طبي حيوي على مدار الساعة",
      title: "خدمات الصيانة والمعايرة المعتمدة",
      description: "صيانة وقائية دورية ومعايرة وقطع غيار أصلية",
      icon: Wrench,
    },
    {
      image: "/images/products/hastabasi-monitoru-1.webp",
      badge: "دعم الحياة الحرج",
      title: "شاشات مراقبة المرضى وتخطيط القلب",
      description: "دقة تشخيصية عالية ومتابعة مستمرة للعلامات الحيوية",
      icon: HeartPulse,
    },
    {
      image: "/images/products/ventilator-1.webp",
      badge: "اقتصادي وموثوق",
      title: "أجهزة مجددة مع ضمان لمدة عام كامل",
      description: "فحص شامل للأمان الكهربائي ومطابقة للمواصفات الطبية",
      icon: RefreshCw,
    },
  ],
  ja: [
    {
      image: "/images/products/anestezi-cihazi-1.webp",
      badge: "医療技術＆外科手術",
      title: "手術室および集中治療（ICU）システム",
      description: "Cebeci Medikalの品質保証に基づくワンストップ導入支援",
      icon: ShieldCheck,
    },
    {
      image: "/images/products/otoklav-1.webp",
      badge: "24時間技術サポート",
      title: "認定生体医工学保守・校正サービス",
      description: "定期予防保守点検、安全試験、純正スペアパーツ供給",
      icon: Wrench,
    },
    {
      image: "/images/products/hastabasi-monitoru-1.webp",
      badge: "生命維持管理",
      title: "生体情報モニタリング＆心電計",
      description: "高精度診断と途切れのないバイタルサイン監視ソリューション",
      icon: HeartPulse,
    },
    {
      image: "/images/products/ventilator-1.webp",
      badge: "高信頼・認定リファービッシュ",
      title: "1年間保証付き認定再生医療機器",
      description: "全電気安全試験および性能校正済みの安心機器",
      icon: RefreshCw,
    },
  ],
  zh: [
    {
      image: "/images/products/anestezi-cihazi-1.webp",
      badge: "医疗科技与外科手术",
      title: "手术室与重症监护（ICU）系统",
      description: "塞贝吉医疗正品保障，提供一站式装机与供应链支持",
      icon: ShieldCheck,
    },
    {
      image: "/images/products/otoklav-1.webp",
      badge: "全天候生物医学技术支持",
      title: "权威认证工程维护与计量校准",
      description: "定期预防性维保、电气安全检测与原厂配件直供",
      icon: Wrench,
    },
    {
      image: "/images/products/hastabasi-monitoru-1.webp",
      badge: "关键生命支持",
      title: "患者多参数监护与心电图诊断系统",
      description: "高精度临床诊断与连续生命体征监护解决方案",
      icon: HeartPulse,
    },
    {
      image: "/images/products/ventilator-1.webp",
      badge: "高性价比与品质保障",
      title: "认证翻新医疗设备享1年保修",
      description: "全面通过电气安全耐压测试与生物医学计量校准",
      icon: RefreshCw,
    },
  ],
};

export function HeroImageSlider({ locale = "tr" }: { locale?: string }) {
  const slides = HERO_SLIDES_BY_LOCALE[locale] || HERO_SLIDES_BY_LOCALE.tr;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  const activeSlide = slides[currentSlide];
  const IconComp = activeSlide.icon;

  return (
    <div
      className="space-y-4 w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. Image Slider Container */}
      <div className="relative rounded-2xl overflow-hidden glass-panel border border-border/80 p-2 shadow-2xl group">
        <div className="relative h-[320px] sm:h-[400px] rounded-xl overflow-hidden bg-white flex items-center justify-center p-3">
          {slides.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={slide.title}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out flex items-center justify-center p-3 ${
                  isActive ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105 pointer-events-none"
                } transition-transform duration-1000`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-contain object-center"
                />
              </div>
            );
          })}

          {/* Slider Prev / Next Controls on Hover */}
          <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex items-center justify-between z-20 pointer-events-none">
            <button
              type="button"
              onClick={prevSlide}
              className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm border border-white/20 transition-all opacity-0 group-hover:opacity-100 pointer-events-auto shadow-lg hover:scale-105"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm border border-white/20 transition-all opacity-0 group-hover:opacity-100 pointer-events-auto shadow-lg hover:scale-105"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Slide Progress Dots (Inside bottom of image) */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide
                    ? "w-6 bg-primary"
                    : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 2. Text Box - OUTSIDE AND BELOW THE IMAGE */}
      <div className="p-4 rounded-2xl bg-surface border border-border shadow-md transition-all duration-300">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                {activeSlide.badge}
              </span>
            </div>
            <h3 className="font-serif text-base sm:text-lg font-bold text-foreground truncate">
              {activeSlide.title}
            </h3>
            <p className="text-xs text-foreground-muted line-clamp-1">
              {activeSlide.description}
            </p>
          </div>

          {/* Icon Badge */}
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
            <IconComp className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
