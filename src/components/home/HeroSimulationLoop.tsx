"use client";

import { useState, useEffect, useRef } from "react";
import {
  Activity,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Cpu,
  RefreshCw,
  FileCheck2,
  Gauge,
} from "lucide-react";

interface DeviceScenario {
  id: string;
  name: string;
  category: {
    tr: string;
    en: string;
    de: string;
    ar: string;
    ja: string;
    zh: string;
  };
  serial: string;
  standard: string;
  metrics: {
    label: { tr: string; en: string; de: string; ar: string; ja: string; zh: string };
    value: string;
    unit: string;
    status: string;
    stepRequired: number;
  }[];
  telemetrySummary: string;
  stepLogs: {
    tr: string;
    en: string;
    de: string;
    ar: string;
    ja: string;
    zh: string;
  }[];
  certId: string;
}

const SIMULATION_DEVICES: DeviceScenario[] = [
  {
    id: "spacelabs-90369",
    name: "Spacelabs Ultraview 90369",
    category: {
      tr: "Kritik Hasta Başı Monitörü",
      en: "Critical Care Patient Monitor",
      de: "Intensiv-Patientenmonitor",
      ar: "شاشة مراقبة المرضى بالعناية المركزة",
      ja: "生体情報モニタシステム",
      zh: "重症监护多参数监护仪",
    },
    serial: "SN-SL369-2026",
    standard: "IEC 62353",
    metrics: [
      {
        label: {
          tr: "Tansiyon (NIBP)",
          en: "NIBP Blood Pressure",
          de: "NIBP-Blutdruck",
          ar: "ضغط الدم NIBP",
          ja: "NIBP 血圧測定",
          zh: "NIBP 无创血压",
        },
        value: "120/80",
        unit: "mmHg",
        status: "PASS",
        stepRequired: 1,
      },
      {
        label: {
          tr: "Toprak Direnci",
          en: "Ground Resistance",
          de: "Erdungswiderstand",
          ar: "مقاومة التأريض",
          ja: "接地抵抗値",
          zh: "接地电阻",
        },
        value: "0.06",
        unit: "Ω",
        status: "PASS",
        stepRequired: 2,
      },
      {
        label: {
          tr: "SpO2 Hassasiyeti",
          en: "SpO2 Accuracy",
          de: "SpO2-Genauigkeit",
          ar: "دقة الأكسجين SpO2",
          ja: "SpO2 測定精度",
          zh: "SpO2 血氧精度",
        },
        value: "99.9",
        unit: "%",
        status: "PASS",
        stepRequired: 2,
      },
      {
        label: {
          tr: "Alarm Tepki Süresi",
          en: "Alarm Latency",
          de: "Alarm-Reaktionszeit",
          ar: "استجابة الإنذار",
          ja: "アラーム応答速度",
          zh: "报警响应时间",
        },
        value: "0.14",
        unit: "sn",
        status: "OPTIMAL",
        stepRequired: 3,
      },
    ],
    telemetrySummary: "EKG: 72 bpm • SpO2: %99 • NIBP: 120/80 • Temp: 36.8°C",
    stepLogs: [
      {
        tr: "Donanım portları ve EKG/NIBP arayüzü taranıyor...",
        en: "Scanning hardware ports and ECG/NIBP interfaces...",
        de: "Hardware-Ports und EKG/NIBP-Schnittstellen werden gescannt...",
        ar: "جاري فحص منافذ الأجهزة وواجهة تخطيط القلب والضغط...",
        ja: "ハードウェアポートおよびECG/NIBPインターフェースをスキャン中...",
        zh: "正在扫描硬件端口及心电/血压接口...",
      },
      {
        tr: "NIBP basınç transdüseri ve SpO2 optik sensörü kalibre ediliyor...",
        en: "Calibrating NIBP pressure transducers and SpO2 optical sensor...",
        de: "NIBP-Drucksensor und optischer SpO2-Sensor werden kalibriert...",
        ar: "معايرة محولات ضغط NIBP ومستشعر SpO2 الضوئي...",
        ja: "NIBP圧力センサーおよびSpO2光学センサーを精密校正中...",
        zh: "正在校准无创血压压力传感器与血氧光学传感器...",
      },
      {
        tr: "IEC 62353: Gövde kaçak akımı 14µA ve izolasyon testi onaylandı.",
        en: "IEC 62353: Chassis leakage 14µA and insulation test verified.",
        de: "IEC 62353: Gehäuseableitstrom 14µA und Isolationstest bestätigt.",
        ar: "IEC 62353: تم التحقق من تيار التسرب 14µA واختبار العزل.",
        ja: "IEC 62353：漏れ電流14µAおよび絶縁試験を承認完了。",
        zh: "IEC 62353：机壳泄漏电流14µA与绝缘测试确认合格。",
      },
      {
        tr: "Kalibrasyon tamamlandı • TSE Standartlarında 1 Yıl Garanti Onaylandı.",
        en: "Calibration completed • 1-Year Certified Warranty Approved.",
        de: "Kalibrierung abgeschlossen • 1 Jahr Garantie bestätigt.",
        ar: "اكتملت المعايرة بنجاح • تم اعتماد الضمان لمدة عام كامل.",
        ja: "校正完了 • 1年間公的品質保証承認済。",
        zh: "计量校准全部完成 • 1年官方品质保障已生效。",
      },
    ],
    certId: "CM-CERT-2026-3690",
  },
  {
    id: "mindray-d6",
    name: "Mindray BeneHeart D6",
    category: {
      tr: "Bifazik Defibrilatör & Monitör",
      en: "Biphasic Defibrillator & Monitor",
      de: "Biphasischer Defibrillator & Monitor",
      ar: "جهاز إزالة الرجفان ومراقبة المريض",
      ja: "二相性除細動器＆生体情報モニタ",
      zh: "双相除颤监护仪",
    },
    serial: "SN-MD914-2026",
    standard: "IEC 62353",
    metrics: [
      {
        label: {
          tr: "12-Kanal EKG Doğruluğu",
          en: "12-Lead ECG Accuracy",
          de: "12-Kanal-EKG-Genauigkeit",
          ar: "دقة تخطيط القلب 12 مسرى",
          ja: "12誘導心電図精度",
          zh: "12导联心电精度",
        },
        value: "99.8",
        unit: "%",
        status: "PASS",
        stepRequired: 1,
      },
      {
        label: {
          tr: "Gövde Kaçak Akımı",
          en: "Chassis Leakage",
          de: "Gehäuseableitstrom",
          ar: "تيار تسرب الهيكل",
          ja: "外装漏れ電流",
          zh: "机壳泄漏电流",
        },
        value: "18.4",
        unit: "µA",
        status: "PASS",
        stepRequired: 2,
      },
      {
        label: {
          tr: "200J Deşarj Enerjisi",
          en: "200J Discharge Energy",
          de: "200J Energieabgabe",
          ar: "طاقة تفريغ 200 جول",
          ja: "200J 放電エネルギー",
          zh: "200J 放电能量",
        },
        value: "199.6",
        unit: "Joule",
        status: "PASS",
        stepRequired: 2,
      },
      {
        label: {
          tr: "Şok Senkronizasyonu",
          en: "Sync Discharge Delay",
          de: "Synchronisationsverzögerung",
          ar: "زمن مزامنة الصدمة",
          ja: "同期放電遅延時間",
          zh: "同步放电延迟",
        },
        value: "12",
        unit: "ms",
        status: "OPTIMAL",
        stepRequired: 3,
      },
    ],
    telemetrySummary: "EKG: 70 bpm • Joule: 199.6 J • SpO2: %99 • Empedans: 50 Ω",
    stepLogs: [
      {
        tr: "Defibrilasyon deşarj ünitesi ve EKG kartı başlatılıyor...",
        en: "Initializing defibrillation discharge unit and ECG board...",
        de: "Defibrillationseinheit und EKG-Platine werden initialisiert...",
        ar: "تهيئة وحدة تفريغ الصدمات ولوحة تخطيط القلب...",
        ja: "除細動放電ユニットおよびECGボードを初期化中...",
        zh: "正在初始化除颤放电单元与心电处理板...",
      },
      {
        tr: "12-Kanal EKG simülatörü ve R-dalgası algılama kalibre ediliyor...",
        en: "Calibrating 12-lead ECG simulator and R-wave detection...",
        de: "12-Kanal-EKG-Simulator und R-Wellen-Erkennung werden kalibriert...",
        ar: "معايرة محاكي تخطيط القلب والكشف عن موجة R...",
        ja: "12誘導心電図シミュレータおよびR波検出を校正中...",
        zh: "正在校准12导联心电模拟器与R波识别算法...",
      },
      {
        tr: "IEC 62353: Elektriksel güvenlik ve 200J enerji deşarjı doğrulandı.",
        en: "IEC 62353: Electrical safety and 200J discharge energy verified.",
        de: "IEC 62353: Elektrische Sicherheit und 200J Entladung verifiziert.",
        ar: "IEC 62353: تم تأكيد الأمان الكهربائي وتفريغ طاقة 200 جول.",
        ja: "IEC 62353：電気安全および200J放電エネルギーを検証完了。",
        zh: "IEC 62353：电气安全与200焦耳放电能量验证通过。",
      },
      {
        tr: "Biyomedikal Test Raporu oluşturuldu • 1 Yıl Garanti Onaylandı.",
        en: "Biomedical Test Report generated • 1-Year Warranty Approved.",
        de: "Biomedizinischer Prüfbericht erstellt • 1 Jahr Garantie bestätigt.",
        ar: "تم إصدار تقرير الفحص الطبي • تم اعتماد ضمان لمدة عام.",
        ja: "生体医工学試験レポート作成 • 1年品質保証承認。",
        zh: "生物医学检测报告已生成 • 1年质保正式生效。",
      },
    ],
    certId: "CM-CERT-2026-9842",
  },
  {
    id: "drager-primus",
    name: "Dräger Primus Infinity",
    category: {
      tr: "Anestezi & Solunum İstasyonu",
      en: "Anesthesia & Ventilation Workstation",
      de: "Anästhesie- & Beatmungsarbeitsplatz",
      ar: "محطة التخدير والتنفس الاصطناعي",
      ja: "麻酔器＆人工呼吸システム",
      zh: "麻醉呼吸工作站",
    },
    serial: "SN-DP448-2026",
    standard: "ISO 80601-2-13",
    metrics: [
      {
        label: {
          tr: "PEEP Basınç Kontrolü",
          en: "PEEP Pressure Control",
          de: "PEEP-Druckkontrolle",
          ar: "التحكم في ضغط PEEP",
          ja: "PEEP 圧力制御",
          zh: "PEEP 压力控制",
        },
        value: "24.8",
        unit: "mbar",
        status: "PASS",
        stepRequired: 1,
      },
      {
        label: {
          tr: "İzolasyon Direnci",
          en: "Insulation Resistance",
          de: "Isolationswiderstand",
          ar: "مقاومة العزل",
          ja: "絶縁抵抗値",
          zh: "绝缘电阻",
        },
        value: ">100",
        unit: "MΩ",
        status: "PASS",
        stepRequired: 2,
      },
      {
        label: {
          tr: "FiO2 Oksijen Mikseri",
          en: "FiO2 Oxygen Mixer",
          de: "FiO2-Sauerstoffmischer",
          ar: "خلط الأكسجين FiO2",
          ja: "FiO2 酸素ミキサー",
          zh: "FiO2 氧气混合",
        },
        value: "99.7",
        unit: "%",
        status: "PASS",
        stepRequired: 2,
      },
      {
        label: {
          tr: "Devre Sızdırmazlığı",
          en: "Circuit Tightness",
          de: "Kreis-Dichtigkeit",
          ar: "إحكام الدائرة",
          ja: "回路気密性",
          zh: "回路气密性",
        },
        value: "0.02",
        unit: "L/dk",
        status: "TIGHT",
        stepRequired: 3,
      },
    ],
    telemetrySummary: "Paw: 24.8 mbar • PEEP: 5.0 • Vt: 500 mL • FiO2: 99.7%",
    stepLogs: [
      {
        tr: "Gaz giriş valfleri, buharlaştırıcı ve pnömatik hatlar taranıyor...",
        en: "Scanning gas inlet valves, vaporizer, and pneumatic lines...",
        de: "Gaseinlassventile, Verdampfer und pneumatische Leitungen im Test...",
        ar: "فحص صمامات دخول الغاز والمبخر والخطوط الهوائية...",
        ja: "ガス供給バルブ、気化器および空圧ラインを診断中...",
        zh: "正在扫描进气阀门、蒸发器及气动管路...",
      },
      {
        tr: "Ultrasonik akış sensörleri ve PEEP regülasyonu kalibre ediliyor...",
        en: "Calibrating ultrasonic flow sensors and PEEP regulation...",
        de: "Ultraschall-Flowsensoren und PEEP-Regelung werden kalibriert...",
        ar: "معايرة مستشعرات التدفق وتنظيم ضغط PEEP...",
        ja: "超音波フローセンサーおよびPEEPレギュレーションを校正中...",
        zh: "正在校准超声波流量传感器与气道压力调节...",
      },
      {
        tr: "IEC 62353: Yüksek voltaj izolasyonu ve sızdırmazlık (0.02 L/dk) onaylandı.",
        en: "IEC 62353: High voltage insulation and circuit tightness verified.",
        de: "IEC 62353: Hochspannungsisolation und Dichtigkeit bestätigt.",
        ar: "IEC 62353: تم تأكيد العزل عالي الجهد وإحكام الدائرة التنفسية.",
        ja: "IEC 62353：高圧絶縁および気密保持性能（0.02 L/分）を承認。",
        zh: "IEC 62353：高压绝缘与回路气密性能（0.02 L/min）已通过。",
      },
      {
        tr: "TSE Kalibrasyon Sertifikası düzenlendi • Klinik Kullanıma Hazır.",
        en: "Certified Calibration Report issued • Ready for Clinical Use.",
        de: "Zertifizierter Prüfbericht erstellt • Klinisch einsatzbereit.",
        ar: "تم إصدار شهادة المعايرة المعتمدة • جاهز للاستخدام السريري.",
        ja: "認定校正レポート発行 • 臨床運用準備完了。",
        zh: "权威计量校准报告已出具 • 达到临床手术标准。",
      },
    ],
    certId: "CM-CERT-2026-4481",
  },
  {
    id: "hamilton-g5",
    name: "Hamilton G5 ICU Ventilator",
    category: {
      tr: "Yoğun Bakım Mekanik Ventilatör",
      en: "Intensive Care Mechanical Ventilator",
      de: "Intensivbeatmungsgerät",
      ar: "جهاز التنفس الاصطناعي للعناية المركزة",
      ja: "集中治療用人工呼吸器",
      zh: "重症监护呼吸机",
    },
    serial: "SN-HG512-2026",
    standard: "ISO 80601-2-12",
    metrics: [
      {
        label: {
          tr: "Tidal Hacim (Vt)",
          en: "Tidal Volume (Vt)",
          de: "Tidalvolumen (Vt)",
          ar: "الحجم المدي (Vt)",
          ja: "一回換気量 (Vt)",
          zh: "潮气量 (Vt)",
        },
        value: "498",
        unit: "mL",
        status: "PASS",
        stepRequired: 1,
      },
      {
        label: {
          tr: "Gövde Kaçak Akımı",
          en: "Chassis Leakage",
          de: "Gehäuseableitstrom",
          ar: "تيار تسرب الهيكل",
          ja: "外装漏れ電流",
          zh: "机壳泄漏电流",
        },
        value: "15.2",
        unit: "µA",
        status: "PASS",
        stepRequired: 2,
      },
      {
        label: {
          tr: "FiO2 Oksijen Hücresi",
          en: "FiO2 Oxygen Sensor",
          de: "FiO2-Sauerstoffzelle",
          ar: "حساس الأكسجين FiO2",
          ja: "FiO2 酸素セル",
          zh: "FiO2 氧电池校准",
        },
        value: "99.8",
        unit: "%",
        status: "PASS",
        stepRequired: 2,
      },
      {
        label: {
          tr: "Valf Yanıt Süresi",
          en: "Valve Response Time",
          de: "Ventil-Reaktionszeit",
          ar: "زمن استجابة الصمام",
          ja: "バルブ応答速度",
          zh: "阀门响应时间",
        },
        value: "8.0",
        unit: "ms",
        status: "OPTIMAL",
        stepRequired: 3,
      },
    ],
    telemetrySummary: "Vt: 498 mL • PEEP: 6.0 • FiO2: 99.8% • Akış: 45 L/dk",
    stepLogs: [
      {
        tr: "Pnömatik türbin ünitesi ve O2 sensör hücresi taranıyor...",
        en: "Scanning pneumatic turbine and O2 sensor cell...",
        de: "Pneumatikturbine und O2-Sensorzelle werden gescannt...",
        ar: "فحص التوربين الهوائي وخلية استشعار الأكسجين...",
        ja: "空圧タービンおよびO2センサーセルをスキャン中...",
        zh: "正在扫描气动涡轮与氧浓度传感单元...",
      },
      {
        tr: "Akış sensörü lineerliği ve tidal volüm hassasiyeti kalibre ediliyor...",
        en: "Calibrating flow sensor linearity and tidal volume accuracy...",
        de: "Flowsensor-Linearität und Tidalvolumengenauigkeit werden kalibriert...",
        ar: "معايرة خطية مستشعر التدفق ودقة الحجم المدي...",
        ja: "フローセンサー直線性および換気量精度を校正中...",
        zh: "正在校准流量传感器线性度与潮气量精度...",
      },
      {
        tr: "IEC 62353: Kaçak akım 15.2µA ve yüksek yalıtım testi tamamlandı.",
        en: "IEC 62353: Leakage current 15.2µA and dielectric test passed.",
        de: "IEC 62353: Ableitstrom 15,2µA und Isolationstest bestanden.",
        ar: "IEC 62353: تم اجتياز اختبار تيار التسرب والعزل الكهربائي.",
        ja: "IEC 62353：漏れ電流15.2µAおよび耐圧試験を合格確認。",
        zh: "IEC 62353：泄漏电流15.2µA与高压耐压测试全部通过。",
      },
      {
        tr: "Biyomedikal Kalibrasyon Sertifikası düzenlendi • 1 Yıl Garanti Tanımlandı.",
        en: "Biomedical Calibration Certificate issued • 1-Year Warranty Assigned.",
        de: "Biomedizinisches Kalibrierzertifikat ausgestellt • 1 Jahr Garantie.",
        ar: "تم إصدار شهادة المعايرة الطبية • تم تعيين الضمان لمدة عام.",
        ja: "生体医学校正証明書発行 • 1年品質保証付与。",
        zh: "生物医学计量校准证书已颁发 • 已绑定1年全保服务。",
      },
    ],
    certId: "CM-CERT-2026-5120",
  },
];

const STEP_DEFINITIONS = [
  {
    step: 0,
    title: {
      tr: "1. Donanım",
      en: "1. Hardware",
      de: "1. Hardware",
      ar: "1. العتاد",
      ja: "1. ハードウェア",
      zh: "1. 硬件",
    },
    icon: Cpu,
  },
  {
    step: 1,
    title: {
      tr: "2. Kalibrasyon",
      en: "2. Calibration",
      de: "2. Kalibrierung",
      ar: "2. المعايرة",
      ja: "2. 校正",
      zh: "2. 校准",
    },
    icon: Activity,
  },
  {
    step: 2,
    title: {
      tr: "3. Güvenlik",
      en: "3. Safety",
      de: "3. Sicherheit",
      ar: "3. الأمان",
      ja: "3. 安全試験",
      zh: "3. 安全测试",
    },
    icon: Zap,
  },
  {
    step: 3,
    title: {
      tr: "4. Sertifika",
      en: "4. Certified",
      de: "4. Zertifikat",
      ar: "4. الاعتماد",
      ja: "4. 合格承認",
      zh: "4. 认证签发",
    },
    icon: FileCheck2,
  },
];

export function HeroSimulationLoop({ locale = "tr" }: { locale?: string }) {
  const currentLang = (["tr", "en", "de", "ar", "ja", "zh"].includes(locale) ? locale : "tr") as
    | "tr"
    | "en"
    | "de"
    | "ar"
    | "ja"
    | "zh";

  const [deviceIndex, setDeviceIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const stepStartTimeRef = useRef<number>(0);

  const currentDevice = SIMULATION_DEVICES[deviceIndex];

  // Synchronized 4-Step State Machine Engine
  useEffect(() => {
    if (isPaused) return;

    let isSubscribed = true;

    const runStepEngine = () => {
      // 4 steps:
      // Step 0: 0 -> 25% (1400ms)
      // Step 1: 25 -> 55% (1500ms)
      // Step 2: 55 -> 85% (1500ms)
      // Step 3: 100% (Completed state held for 2600ms, then advance device)
      const STEP_DURATIONS = [1300, 1500, 1500, 2600];
      const STEP_TARGET_PROGRESS = [25, 55, 85, 100];

      const duration = STEP_DURATIONS[currentStep] || 1500;
      const startProg = currentStep === 0 ? 0 : STEP_TARGET_PROGRESS[currentStep - 1];
      const targetProg = STEP_TARGET_PROGRESS[currentStep];

      stepStartTimeRef.current = Date.now();

      const progressInterval = setInterval(() => {
        if (!isSubscribed) return;
        const elapsed = Date.now() - stepStartTimeRef.current;
        const ratio = Math.min(elapsed / duration, 1);
        const currentCalculated = Math.round(startProg + (targetProg - startProg) * ratio);
        setProgress(currentCalculated);

        if (ratio >= 1) {
          clearInterval(progressInterval);
        }
      }, 50);

      timerRef.current = setTimeout(() => {
        if (!isSubscribed) return;
        clearInterval(progressInterval);

        if (currentStep < 3) {
          setCurrentStep((prev) => prev + 1);
          setIsCompleted(false);
        } else {
          // Finished final step
          setIsCompleted(true);
          setProgress(100);

          timerRef.current = setTimeout(() => {
            if (!isSubscribed) return;
            setIsCompleted(false);
            setCurrentStep(0);
            setProgress(0);
            setDeviceIndex((prev) => (prev + 1) % SIMULATION_DEVICES.length);
          }, 2600);
        }
      }, duration);

      return () => {
        clearInterval(progressInterval);
      };
    };

    const cleanup = runStepEngine();

    return () => {
      isSubscribed = false;
      if (timerRef.current) clearTimeout(timerRef.current);
      if (cleanup) cleanup();
    };
  }, [currentStep, deviceIndex, isPaused]);

  return (
    <div
      className="w-full font-sans select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Clean, Premium Medical Diagnostic Console */}
      <div
        className={`relative rounded-3xl overflow-hidden glass-panel border transition-all duration-500 shadow-2xl p-5 sm:p-6 lg:p-7 flex flex-col justify-between min-h-[500px] lg:min-h-[520px] ${
          isCompleted
            ? "border-emerald-500/80 shadow-[0_0_50px_rgba(16,185,129,0.2)] bg-[#071915]/95"
            : "border-primary/40 hover:border-primary/70 bg-surface/95"
        }`}
      >
        {/* Ambient Top Glow */}
        <div
          className={`absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-32 rounded-full blur-3xl transition-colors duration-500 pointer-events-none ${
            isCompleted ? "bg-emerald-500/25" : "bg-primary/20"
          }`}
        />

        <div className="space-y-4">
          {/* 1. Header: Live Status + Serial (Clean 2-Column Layout) */}
          <div className="relative z-10 flex items-center justify-between pb-3 border-b border-border/80 h-9">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    isCompleted ? "bg-emerald-400" : "bg-primary"
                  }`}
                />
                <span
                  className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                    isCompleted ? "bg-emerald-500" : "bg-primary"
                  }`}
                />
              </span>

              <span className="text-[11px] font-bold uppercase tracking-wider text-primary flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>
                  {currentLang === "tr" && "CANLI KALİBRASYON"}
                  {currentLang === "en" && "LIVE CALIBRATION"}
                  {currentLang === "de" && "LIVE-KALIBRIERUNG"}
                  {currentLang === "ar" && "المعايرة المباشرة"}
                  {currentLang === "ja" && "リアルタイム校正"}
                  {currentLang === "zh" && "实时校准检测"}
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20 font-semibold">
                {currentDevice.standard}
              </span>
              <span className="text-[11px] font-mono text-foreground-muted bg-surface-2 px-2.5 py-0.5 rounded border border-border">
                {currentDevice.serial}
              </span>
            </div>
          </div>

          {/* 2. Device Name & Category Row */}
          <div className="relative z-10 flex items-center justify-between gap-3 h-14">
            <div className="min-w-0">
              <div className="text-[11px] font-semibold text-primary uppercase tracking-wide truncate">
                {currentDevice.category[currentLang]}
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-foreground flex items-center gap-2 truncate mt-0.5">
                <span className="truncate">{currentDevice.name}</span>
                <span
                  className={`inline-flex items-center gap-1 text-[10px] font-sans font-bold px-2 py-0.5 rounded-full border transition-opacity duration-300 flex-shrink-0 ${
                    isCompleted
                      ? "opacity-100 bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3" />
                  <span>PASS</span>
                </span>
              </h3>
            </div>

            <div className="text-right flex-shrink-0">
              <div className="text-sm font-bold text-foreground h-5 flex items-center justify-end font-mono">
                {currentStep < 3 ? (
                  <span className="text-primary flex items-center gap-1">
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    {progress}%
                  </span>
                ) : (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    100%
                  </span>
                )}
              </div>
              <div className="text-[10px] text-foreground-muted mt-0.5">
                {currentLang === "tr" && `Adım ${currentStep + 1} / 4`}
                {currentLang === "en" && `Step ${currentStep + 1} / 4`}
                {currentLang === "de" && `Schritt ${currentStep + 1} / 4`}
                {currentLang === "ar" && `الخطوة ${currentStep + 1} من 4`}
                {currentLang === "ja" && `ステップ ${currentStep + 1} / 4`}
                {currentLang === "zh" && `步骤 ${currentStep + 1} / 4`}
              </div>
            </div>
          </div>

          {/* 3. Progress Bar */}
          <div className="relative z-10 h-2">
            <div className="h-2 w-full bg-surface-2 rounded-full overflow-hidden p-0.5 border border-border/80">
              <div
                className={`h-full rounded-full transition-all duration-300 relative ${
                  isCompleted
                    ? "bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.8)]"
                    : "bg-gradient-to-r from-primary to-cyan-400 shadow-[0_0_12px_rgba(31,138,112,0.8)]"
                }`}
                style={{ width: `${Math.max(5, progress)}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-md animate-ping" />
              </div>
            </div>
          </div>

          {/* 4. 4 Spacious Step Buttons (No Ellipsis, No Truncation) */}
          <div className="relative z-10 grid grid-cols-4 gap-2">
            {STEP_DEFINITIONS.map((def, idx) => {
              const isStepDone = currentStep > idx || isCompleted;
              const isStepActive = currentStep === idx && !isCompleted;
              const StepIcon = def.icon;

              return (
                <div
                  key={def.step}
                  className={`h-[50px] px-2 py-1.5 rounded-xl text-center border transition-all duration-300 flex flex-col items-center justify-center gap-1 ${
                    isStepDone
                      ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
                      : isStepActive
                      ? "bg-primary/20 border-primary shadow-[0_0_15px_rgba(31,138,112,0.3)] text-foreground scale-[1.02]"
                      : "bg-surface-2/40 border-border/60 text-foreground-muted opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-center">
                    {isStepDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : isStepActive ? (
                      <StepIcon className="w-3.5 h-3.5 text-primary animate-pulse" />
                    ) : (
                      <StepIcon className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <span className="text-[10px] font-bold leading-none truncate w-full text-center">
                    {def.title[currentLang]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* 5. 4 Clean & Legible Metric Cards (No Technical Clutter) */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {currentDevice.metrics.map((metric, mIdx) => {
              const isEvaluated = currentStep >= metric.stepRequired || isCompleted;
              const isCurrentlyEvaluating = currentStep === metric.stepRequired - 1;

              return (
                <div
                  key={mIdx}
                  className={`h-[68px] px-4 py-2.5 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-2 overflow-hidden ${
                    isEvaluated
                      ? "bg-surface border-border/90 hover:border-primary/50 shadow-sm"
                      : isCurrentlyEvaluating
                      ? "bg-primary/5 border-primary/40 shadow-inner animate-pulse"
                      : "bg-surface-2/30 border-border/40 opacity-50"
                  }`}
                >
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div className="text-[11px] font-medium text-foreground-muted truncate">
                      {metric.label[currentLang]}
                    </div>
                    <div className="h-6 flex items-center">
                      {isEvaluated ? (
                        <span className="text-base sm:text-lg font-mono font-bold text-foreground truncate">
                          {metric.value}{" "}
                          <span className="text-xs text-foreground-muted font-normal">
                            {metric.unit}
                          </span>
                        </span>
                      ) : isCurrentlyEvaluating ? (
                        <span className="text-xs font-mono text-primary flex items-center gap-1">
                          <span className="truncate">
                            {currentLang === "tr" && "Ölçülüyor"}
                            {currentLang === "en" && "Measuring"}
                            {currentLang === "de" && "Messen"}
                            {currentLang === "ar" && "جاري القياس"}
                            {currentLang === "ja" && "測定中"}
                            {currentLang === "zh" && "正在测量"}
                          </span>
                          <span className="inline-flex items-center gap-0.5 ml-0.5">
                            <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                            <span className="w-1 h-1 rounded-full bg-primary animate-pulse [animation-delay:150ms]" />
                            <span className="w-1 h-1 rounded-full bg-primary animate-pulse [animation-delay:300ms]" />
                          </span>
                        </span>
                      ) : (
                        <span className="text-xs font-mono text-foreground-muted/60">
                          ---
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex-shrink-0 h-6 flex items-center">
                    {isEvaluated ? (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 whitespace-nowrap">
                        {metric.status}
                      </span>
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-border inline-block" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 6. Clean Realtime Medical Waveform Visualizer */}
          <div className="relative z-10 h-16 w-full bg-[#040C11] rounded-2xl overflow-hidden border border-border/80 flex flex-col justify-between p-2.5">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f8a7015_1px,transparent_1px),linear-gradient(to_bottom,#1f8a7015_1px,transparent_1px)] bg-[size:10px_10px]" />

            {/* Pulsing ECG Pattern */}
            <svg className="w-full h-7 relative z-10 overflow-visible" viewBox="0 0 400 30">
              <defs>
                <linearGradient id="waveGlowClean" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1F8A70" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#27A184" stopOpacity="1" />
                  <stop offset="100%" stopColor="#45B890" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              <path
                d="M 0 15 L 45 15 L 55 13 L 65 15 L 85 15 L 95 4 L 102 26 L 110 2 L 118 20 L 126 15 L 155 15 L 170 12 L 185 15 L 235 15 L 245 13 L 255 15 L 275 15 L 285 4 L 292 26 L 300 2 L 308 20 L 316 15 L 345 15 L 360 12 L 375 15 L 400 15"
                fill="none"
                stroke="url(#waveGlowClean)"
                strokeWidth="2.2"
                strokeLinecap="round"
                className="animate-pulse"
              />
            </svg>

            {/* Bottom Realtime Vital Sign Telemetry Bar */}
            <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-emerald-400/90 pt-0.5 border-t border-white/5">
              <span className="truncate">{currentDevice.telemetrySummary}</span>
              <span className="text-foreground-muted/70 text-[9px] flex-shrink-0">REALTIME</span>
            </div>
          </div>
        </div>

        {/* 7. Action Log Banner (Clean Single Line) */}
        <div className="relative z-10 mt-3 px-3.5 h-10 rounded-xl bg-surface-2/80 border border-border/80 flex items-center justify-between gap-3 text-xs overflow-hidden">
          <div className="flex items-center gap-1.5 min-w-0 text-foreground-muted">
            <span className="font-mono text-primary text-xs font-bold animate-pulse flex-shrink-0">&gt;</span>
            <span className="truncate text-[11px] sm:text-xs leading-tight font-medium">
              {currentDevice.stepLogs[currentStep]?.[currentLang] || currentDevice.stepLogs[0][currentLang]}
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="font-mono text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20 font-bold">
              {currentDevice.certId}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
