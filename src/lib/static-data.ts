import { DEFAULT_LOCALE, Locale } from "./i18n";
import {
  LocalizedCategory,
  LocalizedProduct,
  LocalizedService,
  LocalizedReference,
} from "./data";

export interface StaticCategoryItem {
  id: string;
  slug: string;
  icon: string;
  sortOrder: number;
  translations: Record<
    string,
    {
      name: string;
      description: string;
    }
  >;
}

export interface StaticProductItem {
  id: string;
  slug: string;
  categorySlug: string;
  brand: string;
  model: string | null;
  sku: string | null;
  condition: "NEW" | "SECOND_HAND";
  featured: boolean;
  sortOrder: number;
  images: string[];
  technicalSpecs: Record<string, string>;
  applications: string[];
  translations: Record<
    string,
    {
      title: string;
      shortDescription: string;
      description: string;
    }
  >;
}

export interface StaticServiceItem {
  id: string;
  slug: string;
  icon: string;
  sortOrder: number;
  details: {
    features: string[];
    workflow: string[];
    benefits: string[];
  };
  translations: Record<
    string,
    {
      title: string;
      shortDescription: string;
      description: string;
      details?: {
        features?: string[];
        workflow?: string[];
        benefits?: string[];
      };
    }
  >;
}

export interface StaticReferenceItem {
  id: string;
  companyName: string;
  clientName: string | null;
  position: string | null;
  sector: string;
  city: string;
  rating: number;
  serviceScope: string | null;
  logoUrl?: string;
  sortOrder: number;
  translations: Record<
    string,
    {
      quote: string;
      projectDescription?: string;
    }
  >;
}

export interface StaticCatalogItem {
  id: string;
  title: string;
  category: string;
  description: string | null;
  fileUrl: string;
  thumbnailUrl: string;
  fileSize: string;
  version: string;
  downloadCount: number;
  sortOrder: number;
  isActive: boolean;
  locale: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StaticFaqItem {
  id: string;
  category: string;
  sortOrder: number;
  translations: Record<
    string,
    {
      question: string;
      answer: string;
    }
  >;
}

export const STATIC_SETTINGS: Record<string, string> = {
  company_name: "Cebeci Medikal",
  company_full_name: "Cebeci Tıbbi Cihazlar ve Medikal Hizmetleri Ltd. Şti.",
  email: "cbcmedikal@gmail.com",
  phone_primary: "+90 506 606 15 40",
  phone_secondary: "+90 506 835 57 41",
  whatsapp: "905066061540",
  address: "Fevzi Çakmak Mahallesi, Cumhuriyet Bulvarı No: 83/A, Sincan / Ankara",
  facebook_url: "https://www.facebook.com/cebeci.medikal/",
  instagram_url: "https://www.instagram.com/cbcmedikal",
  google_maps_url: "https://maps.app.goo.gl/cebecimedikal",
  google_maps_embed:
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1527.9390696789906!2d32.5200753!3d40.0111695!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d32fe1ff03044d%3A0x95404729878581f0!2sCebeci%20Medikal!5e0!3m2!1str!2str!4v1787872118602!5m2!1str!2str",
  default_locale: "tr",
  default_theme: "navy",
  maintenance_mode: "false",
  analytics_enabled: "true",
  experience_start_year: "2015",
  official_foundation_year: "2021",
};

export const STATIC_CATEGORIES: StaticCategoryItem[] = [
  {
    id: "cat-1",
    slug: "ameliyathane-cihazlari",
    icon: "ShieldAlert",
    sortOrder: 1,
    translations: {
      tr: {
        name: "Ameliyathane Cihazları",
        description: "Elektrocerrahi koter üniteleri, anestezi cihazları, cerrahi aspiratörler ve ameliyathane donanımları.",
      },
      en: {
        name: "Operating Room Devices",
        description: "Electrosurgical units, anesthesia workstations, surgical aspirators, and OR equipment.",
      },
      ar: {
        name: "أجهزة غرف العمليات",
        description: "وحدات الكي الجراحي، أجهزة التخدير، شفاطات الجراحة وتجهيزات غرف العمليات.",
      },
      de: {
        name: "OP-Ausstattung & Geräte",
        description: "Elektrochirurgiegeräte, Anästhesie-Arbeitsplätze, chirurgische Absauger und OP-Ausstattung.",
      },
      ja: {
        name: "手術室設備・機器",
        description: "電気メス装置、麻酔器、吸引器および関連手術室機器。",
      },
      zh: {
        name: "手术室设备系统",
        description: "高频电刀、麻醉工作站、医用吸引器及手术室核心设备。",
      },
    },
  },
  {
    id: "cat-2",
    slug: "yogun-bakim-ve-yasam-destek",
    icon: "HeartPulse",
    sortOrder: 2,
    translations: {
      tr: {
        name: "Yoğun Bakım & Yaşam Destek",
        description: "Mekanik ventilatörler, defibrilatörler, infüzyon/enjektör pompaları, küvözler ve hasta ısıtma sistemleri.",
      },
      en: {
        name: "ICU & Life Support",
        description: "Mechanical ventilators, defibrillators, infusion/syringe pumps, infant incubators, and patient warming systems.",
      },
      ar: {
        name: "العناية المركزة ودعم الحياة",
        description: "أجهزة التنفس الاصطناعي، أجهزة الصدمات، مضخات المحاليل، حاضنات الأطفال وأنظمة تدفئة المرضى.",
      },
      de: {
        name: "Intensivmedizin & Beatmung",
        description: "Beatmungsgeräte, Defibrillatoren, Infusionspumpen, Inkubatoren und Patientenwärmesysteme.",
      },
      ja: {
        name: "集中治療・生命維持装置",
        description: "人工呼吸器、除細動器、輸液・シリンジポンプ、保育器、患者体温管理システム。",
      },
      zh: {
        name: "重症监护与生命支持",
        description: "医用呼吸机、除颤仪、输液注射泵、婴儿培养箱及病人体温管理系统。",
      },
    },
  },
  {
    id: "cat-3",
    slug: "fizyolojik-sinyal-izleyiciler",
    icon: "Activity",
    sortOrder: 3,
    translations: {
      tr: {
        name: "Fizyolojik Sinyal İzleyiciler",
        description: "Çok parametreli hastabaşı monitörleri, 12 kanallı EKG cihazları, NST fetal monitörler ve pulse oksimetreler.",
      },
      en: {
        name: "Patient Monitoring & ECG",
        description: "Multi-parameter patient monitors, 12-lead ECG machines, NST fetal monitors, and pulse oximeters.",
      },
      ar: {
        name: "أجهزة مراقبة المرضى وتخطيط القلب",
        description: "شاشات مراقبة المرضى متعددة القياسات، أجهزة تخطيط القلب 12 قناة، أجهزة مراقبة الجنين وأجهزة قياس الأكسجين.",
      },
      de: {
        name: "Patientenüberwachung & EKG",
        description: "Multiparameter-Patientenmonitore, 12-Kanal-EKG-Geräte, Fetalmonitore und Pulsoximeter.",
      },
      ja: {
        name: "生体情報モニタ・心電図",
        description: "生体情報モニタ、12誘導心電計、分娩監視装置、パルスオキシメータ。",
      },
      zh: {
        name: "生理监护与心电图设备",
        description: "多参数监护仪、12导联心电图机、胎儿监护仪及脉搏血氧仪。",
      },
    },
  },
  {
    id: "cat-4",
    slug: "laboratuvar-cihazlari",
    icon: "FlaskConical",
    sortOrder: 4,
    translations: {
      tr: {
        name: "Laboratuvar Cihazları",
        description: "Kan gazı analizörleri, klinik santrifüjler ve otoklav buharlı sterilizasyon cihazları.",
      },
      en: {
        name: "Laboratory Equipment",
        description: "Blood gas analyzers, clinical centrifuges, and autoclave steam sterilizers.",
      },
      ar: {
        name: "الأجهزة المخبرية والتعقيم",
        description: "أجهزة تحليل غازات الدم، أجهزة الطرد المركزي المخبرية وأجهزة التعقيم بالبخار.",
      },
      de: {
        name: "Laborgeräte & Sterilisation",
        description: "Blutgasanalysatoren, Zentrifugen und Autoklav-Dampfsterilisatoren.",
      },
      ja: {
        name: "臨床検査・滅菌機器",
        description: "血液ガス分析装置、臨床遠心機、高圧蒸気滅菌器（オートクレーブ）。",
      },
      zh: {
        name: "检验科与消毒灭菌设备",
        description: "血气分析仪、医用离心机及高压蒸汽灭菌器。",
      },
    },
  },
  {
    id: "cat-5",
    slug: "endovizyon-sistemleri",
    icon: "Eye",
    sortOrder: 5,
    translations: {
      tr: {
        name: "Endovizyon & Görüntüleme",
        description: "Laparoskopi ve endoskopi kamera sistemleri, renkli Doppler ultrasonografi ve soğuk ışık kaynakları.",
      },
      en: {
        name: "Endovision & Imaging",
        description: "Laparoscopic/endoscopic cameras, Color Doppler ultrasound, and medical cold light sources.",
      },
      ar: {
        name: "أنظمة التنظير والتصوير الطبي",
        description: "كاميرات التنظير الجراحي، أجهزة الموجات فوق الصوتية الملونة ومصادر الضوء البارد.",
      },
      de: {
        name: "Endoskopie & Bildgebung",
        description: "Laparoskopie-/Endoskopie-Kamerasysteme, Farbdoppler-Ultraschall und Kaltlichtquellen.",
      },
      ja: {
        name: "内視鏡・超音波画像システム",
        description: "内視鏡カメラシステム、カラードップラー超音波診断装置、医用冷光源。",
      },
      zh: {
        name: "内窥镜与超声影像系统",
        description: "腹腔镜摄像系统、彩色多普勒超声诊断仪及医用冷光源。",
      },
    },
  },
  {
    id: "cat-6",
    slug: "fizik-tedavi-cihazlari",
    icon: "Dumbbell",
    sortOrder: 6,
    translations: {
      tr: {
        name: "Fizik Tedavi Cihazları",
        description: "Elektroterapi, terapötik ultrason ve fizik tedavi rehabilitasyon kombine üniteleri.",
      },
      en: {
        name: "Physical Therapy & Rehab",
        description: "Electrotherapy, therapeutic ultrasound, and rehabilitation combined units.",
      },
      ar: {
        name: "أجهزة العلاج الطبيعي والتأهيل",
        description: "أجهزة العلاج بالكهرباء، الموجات فوق الصوتية العلاجية ووحدات التأهيل المتكاملة.",
      },
      de: {
        name: "Physiotherapie & Reha",
        description: "Elektrotherapie, therapeutischer Ultraschall und kombinierte Rehabilitationsgeräte.",
      },
      ja: {
        name: "理学療法・リハビリ機器",
        description: "低周波・干渉波治療器、超音波治療器、統合リハビリテーション装置。",
      },
      zh: {
        name: "物理治疗与康复医学设备",
        description: "电疗仪、超声波治疗仪及综合康复理疗设备。",
      },
    },
  },
  {
    id: "cat-7",
    slug: "medikal-sarf-malzemeler",
    icon: "Layers",
    sortOrder: 7,
    translations: {
      tr: {
        name: "Medikal Donanım & Karyolalar",
        description: "Motorlu yoğun bakım karyolaları, medikal yataklar ve klinik hasta transfer donanımları.",
      },
      en: {
        name: "Medical Beds & Hardware",
        description: "Motorized ICU beds, patient ward beds, and patient transfer systems.",
      },
      ar: {
        name: "الأسرة الطبية والتجهيزات",
        description: "أسرة العناية المركزة الكهربائية، أسرة المرضى وتجهيزات النقل السريري.",
      },
      de: {
        name: "Medizinische Betten & Mobiliar",
        description: "Motorisierte Intensivpflegebetten, Patientenbetten und Transferausstattung.",
      },
      ja: {
        name: "医療用ベッド・備品",
        description: "電動集中治療ベッド、病室用ベッド、患者搬送設備。",
      },
      zh: {
        name: "医用病床与护理硬件",
        description: "电动重症监护病床、病房护理床及患者转运设备。",
      },
    },
  },
];

export const STATIC_SERVICES: StaticServiceItem[] = [
  {
    id: "srv-1",
    slug: "teknik-servis",
    icon: "Wrench",
    sortOrder: 1,
    details: {
      features: [
        "7/24 Acil Arıza Müdahale Koordinasyonu",
        "Komponent Düzeyinde Elektronik Kart Onarımı",
        "Orijinal ve Sertifikalı Yedek Parça Güvencesi",
        "Onarım Sonrası Elektriksel Güvenlik (IEC 62353) Testleri",
        "Geçici İkame Cihaz (Loaner) Desteği",
        "TSE Hizmet Yeterlilik Belgeli Laboratuvar",
      ],
      workflow: [
        "Arıza Bildirimi ve Ön Değerlendirme",
        "Yerinde İnceleme veya Laboratuvara Kabul",
        "Hata Tespiti ve Detaylı Ekspertiz Raporu",
        "Müşteri Onayı ve Orijinal Parça ile Onarım",
        "Biyomedikal Kalibrasyon ve Güvenlik Testleri",
        "Raporlu Teslimat ve Garanti Başlangıcı",
      ],
      benefits: [
        "Klinik operasyonlarda sıfıra yakın kesinti süresi",
        "Gereksiz parça değişimlerini önleyen şeffaf arıza tespiti",
        "Yapılan her onarımda 6 ay parça ve işçilik garantisi",
        "Hastaneler için akreditasyon standartlarına tam uyum",
      ],
    },
    translations: {
      tr: {
        title: "Biyomedikal Teknik Servis & Arıza Onarım",
        shortDescription: "Yoğun bakım, ameliyathane ve klinik cihazları için komponent düzeyinde hızlı ve garantili teknik servis hizmeti.",
        description: "Cebeci Medikal Biyomedikal Teknik Servis Departmanı; hastaneler, özel klinikler, tıp merkezleri ve laboratuvarlarda kullanılan tüm kritik tıbbi cihazlar için yetkili ve uzman mühendis kadrosuyla 7/24 kesintisiz arıza onarım hizmeti sunmaktadır. TSE HYB ve ISO kalite standartlarına sahip laboratuvarlarımızda her onarım sonrası IEC 62353 elektriksel güvenlik testleri yapılarak eksiksiz teknik servis raporu tanzim edilir.",
      },
      en: {
        title: "Biomedical Technical Service & Repair",
        shortDescription: "Rapid, component-level technical repair and maintenance service for ICU, OR, and clinical equipment.",
        description: "Cebeci Medikal delivers comprehensive technical maintenance and repair services for all critical healthcare equipment. Our qualified biomedical engineering team provides 24/7 rapid troubleshooting, component-level board repairs, genuine replacement parts, and IEC 62353 electrical safety validation.",
      },
      ar: {
        title: "الخدمات الفنية الطبية الحيوية وإصلاح الأعطال",
        shortDescription: "خدمات الصيانة والإصلاح السريع على مستوى المكونات الإلكترونية لأجهزة العناية المركزة وغرف العمليات والمختبرات.",
        description: "يقدم قسم الهندسة الطبية الحيوية في شركة جبجي ميديكال خدمات صيانة فنية معتمدة وشاملة لجميع الأجهزة والمعدات الطبية الحرجة في المستشفيات والعيادات. نضمن توفير قطع الغيار الأصلية وإجراء اختبارات الأمان الكهربائي ومعايرة الأجهزة وفق المعايير العالمية.",
      },
      de: {
        title: "Biomedizinischer Kundendienst & Reparatur",
        shortDescription: "Komponentenbasierter Reparaturservice für Intensiv-, OP- und Diagnosesysteme mit Qualitätsgarantie.",
        description: "Der biomedizinische Kundendienst von Cebeci Medikal bietet medizinischen Einrichtungen zuverlässige Vor-Ort- und Werkstattreparaturen für sensible Medizintechnik. Wir führen Sicherheitsüberprüfungen nach IEC 62353 durch und stellen bei Bedarf Leihgeräte bereit.",
      },
      ja: {
        title: "医用工学技術サービス・故障修理",
        shortDescription: "集中治療室・手術室・検査室向け医療機器の基板レベル修理および迅速な技術サポート。",
        description: "Cebeci Medikalのバイオメディカルエンジニアチームは、病院やクリニックの重要医療機器に対し、24時間年中無休で高品質な点検・修理サービスを提供しています。IEC 62353安全規格試験と厳格な校正プロセスを経てお届けします。",
      },
      zh: {
        title: "生物医学技术维护与故障维修",
        shortDescription: "针对重症监护、手术室及临床诊断设备的芯片级快速故障检修与原厂配件维保服务。",
        description: "塞贝吉医疗（Cebeci Medikal）专业生物医学工程团队为各大医院、诊所及医疗机构提供全方位的技术维护与故障急修服务。执行严格的IEC 62353电气安全检测与标准计量校准，确保临床设备稳定高效运行。",
      },
    },
  },
  {
    id: "srv-2",
    slug: "periyodik-koruyucu-bakim",
    icon: "ShieldCheck",
    sortOrder: 2,
    details: {
      features: [
        "Planlı Yıllık ve Altı Aylık Koruyucu Bakım Sözleşmeleri",
        "Tüm Sensör, Valf, Batarya ve Filtre Kontrolleri",
        "İzlenebilir Kalibrasyon ve Doğrulama Protokolleri",
        "Klinik Arıza Oranlarında %75'e Varan Azalma",
        "TSE / Sağlık Bakanlığı Standartlarında Raporlama",
        "Öncelikli Acil Çağrı Yanıtlama Ayrıcalığı",
      ],
      workflow: [
        "Cihaz Envanteri ve Geçmiş Bakım Analizi",
        "Yıllık Koruyucu Bakım Takviminin Oluşturulması",
        "Yerinde Mekanik, Elektronik ve Pnömatik İnceleme",
        "Aşınan Sarf Parçaların ve Filtrelerin Değişimi",
        "Referans Kalibratörler ile Ölçüm Doğrulama",
        "Dijital Bakım Sertifikasyonu ve Envanter Güncelleme",
      ],
      benefits: [
        "Beklenmeyen arıza risklerini ve ameliyat iptallerini önleme",
        "Cihaz kullanım ömrünü 3 ila 5 yıl uzatma",
        "Sağlık Bakanlığı kalite ve akreditasyon denetimlerine tam hazırlık",
        "Kurum bütçesinde öngörülebilir ve kontrol edilebilir bakım maliyetleri",
      ],
    },
    translations: {
      tr: {
        title: "Periyodik Koruyucu Bakım & Kalibrasyon",
        shortDescription: "Arızaları önceden engelleyen, cihaz ömrünü uzatan ve yasal denetim standartlarına uyumlu planlı bakım çözümleri.",
        description: "Tıbbi cihazların arızalanmasını beklemeden, düzenli aralıklarla yapılan koruyucu bakımlar sayesinde hasta güvenliği en üst seviyeye çıkarılır. Cebeci Medikal, havalandırma üniteleri, hasta takip monitörleri, defibrilatörler ve anestezi cihazları başta olmak üzere tüm medikal envanteriniz için sertifikalı periyodik bakım protokolleri uygular.",
      },
      en: {
        title: "Periodic Preventive Maintenance & Calibration",
        shortDescription: "Scheduled maintenance programs designed to prevent unexpected breakdowns and maximize device longevity.",
        description: "Preventive maintenance reduces clinical downtime and ensures patient safety. Our periodic maintenance agreements cover scheduled sensor replacements, battery tests, mechanical cleaning, and traceable calibration according to manufacturer guidelines.",
      },
      ar: {
        title: "الصيانة الوقائية الدورية والمعايرة",
        shortDescription: "برامج صيانة دورية مجدولة تمنع الأعطال المفاجئة وتطيل العمر الافتراضي للمعدات الطبية.",
        description: "تعتبر الصيانة الوقائية الدورية الركيزة الأساسية لضمان سلامة المرضى واستمرارية عمل المستشفيات دون انقطاع. نقوم بفحص ومعايرة الحساسات والبطاريات والصمامات وفق جداول دورية موثقة ومعتمدة.",
      },
      de: {
        title: "Regelmäßige vorbeugende Wartung & Kalibrierung",
        shortDescription: "Geplante Wartungsprogramme zur Vermeidung von Ausfällen und Verlängerung der Lebensdauer medizintechnischer Anlagen.",
        description: "Regelmäßige präventive Wartungszyklen minimieren das Ausfallrisiko und gewährleisten die Einhaltung gesetzlicher Richtlinien (MPBetreibV). Wir prüfen und kalibrieren Beatmungs-, Monitoring- und Defibrillationsgeräte.",
      },
      ja: {
        title: "定期予防保守・校正サービス",
        shortDescription: "機器の突発的な故障を未然に防ぎ、寿命を最大化する計画的な予防点検・校正プログラム。",
        description: "定期的な点検と消耗部品の交換、高精度なトレーサブル校正により、医療事故を防止し、医療機器の安全稼働を長期にわたりサポートします。",
      },
      zh: {
        title: "定期预防性维护与计量校准",
        shortDescription: "旨在消除临床突发故障、延长设备使用寿命并满足法规审核要求的计划性维保校准方案。",
        description: "定期预防性维护可将设备意外停机率降低75%以上。塞贝吉医疗依据原厂标准及行业规范，对各类生命支持与监护设备执行严谨的传感器校正、电气安全检测与性能验证。",
      },
    },
  },
  {
    id: "srv-3",
    slug: "kurulum-devreye-alma",
    icon: "Cpu",
    sortOrder: 3,
    details: {
      features: [
        "Anahtar Teslim Yerinde Montaj ve Mekanik Sabitleme",
        "Medikal Gaz, Elektrik ve Ağ Altyapı Entegrasyonu",
        "Kullanıcı Sağlık Personeline Uygulamalı Cihaz Eğitimi",
        "HBYS / PACS / DICOM Merkezi Ağ Bağlantısı",
        "İlk Kullanım Doğrulama ve Güvenlik Protokolü",
        "Resmi Kurulum ve Devreye Alma Tutanağı",
      ],
      workflow: [
        "Klinik Alanın ve Altyapının Ön Uygunluk Kontrolü",
        "Güvenli Lojistik, Taşıma ve Yerleşim",
        "Elektriksel, Gaz ve Ağ Bağlantılarının Yapılması",
        "Sistem Açılış Testleri ve Parametre Konfigürasyonu",
        "Klinisyen ve Biyomedikal Personele Eğitim Verilmesi",
        "Devreye Alma Belgesinin İmzalanması ve Teslimat",
      ],
      benefits: [
        "Hatalı montaj ve kullanıcı kaynaklı arıza risklerini ortadan kaldırma",
        "Klinik personelin cihazı tüm fonksiyonlarıyla yetkin kullanımı",
        "Merkezi hastane bilgi sistemlerine sorunsuz veri aktarımı",
        "Üretici standartlarında güvenli ve eksiksiz ilk çalıştırma",
      ],
    },
    translations: {
      tr: {
        title: "Cihaz Montajı, Kurulum & Devreye Alma",
        shortDescription: "Yeni veya revizyonlu tıbbi cihazların anahtar teslim kurulumu, altyapı bağlantıları ve personel kullanıcı eğitimleri.",
        description: "Tıbbi cihazların doğru ve güvenli şekilde çalışabilmesi için profesyonel kurulum şarttır. Cebeci Medikal uzmanları; ameliyathane tavan kulelerinden yoğun bakım ventilatörlerine kadar tüm ekipmanların montajını, gaz/elektrik altyapı testlerini ve operatör eğitimlerini anahtar teslim olarak tamamlar.",
      },
      en: {
        title: "Device Installation & Commissioning",
        shortDescription: "Turnkey installation, medical infrastructure integration, and certified operator training for clinical equipment.",
        description: "Proper commissioning ensures safe operation from day one. Our biomedical team executes turn-key installations, electrical and medical gas network verification, HIS/DICOM integration, and hands-on staff training.",
      },
      ar: {
        title: "تركيب الأجهزة الطبية والتشغيل التجريبي",
        shortDescription: "خدمات التركيب والربط الشبكي المتكامل وتدريب الكوادر الطبية على تشغيل الأجهزة بكفاءة عالية.",
        description: "نقدم حلول التركيب المتكاملة للأجهزة والمعدات الطبية مع فحص شبكات الغازات والكهرباء والربط مع أنظمة المستشفيات الرقمية وتدريب الأطباء والتمريض على الاستخدام الأمثل.",
      },
      de: {
        title: "Gerätemontage, Installation & Inbetriebnahme",
        shortDescription: "Fachgerechte Erstinbetriebnahme, Netzwerkanbindung und fundierte Einweisung des medizinischen Fachpersonals.",
        description: "Wir übernehmen die schlüsselfertige Montage und Konfiguration medizinischer Geräte inklusive Anbindung an KIS/PACS sowie die ordnungsgemäße Einweisung des Klinikpersonals nach MPG.",
      },
      ja: {
        title: "機器設置・据付・運用開始サポート",
        shortDescription: "医療機器の安全な搬入・設置・ネットワーク連携および医療従事者向け操作トレーニング。",
        description: "医療機器の納品から電気・配管・電子カルテ（HIS/PACS）連携、初期動作検証、現場スタッフへの操作説明までワンストップでサポートします。",
      },
      zh: {
        title: "设备安装、调试与启用服务",
        shortDescription: "医疗设备一站式安装定位、医院信息化系统集成及医护人员规范化操作培训。",
        description: "专业的安装与调试是确保医疗设备精准运行的前提。塞贝吉医疗工程团队提供设备就位、医用气体/强弱电接驳、HIS/DICOM联网及全套临床带教培训服务。",
      },
    },
  },
  {
    id: "srv-4",
    slug: "teknik-danismanlik",
    icon: "Briefcase",
    sortOrder: 4,
    details: {
      features: [
        "Hastane ve Klinik Tıbbi Cihaz Envanter Değerleme",
        "2. El Cihaz Alım-Satım Teknik Ekspertiz Raporu",
        "Yatırım Bütçesi ve Amortisman Fizibilite Analizi",
        "Teknik Şartname Hazırlama ve İhale Danışmanlığı",
        "Klinik Bölüm Bazlı İhtiyaç Planlaması",
        "Ruhsatlandırma ve Yasal Mevzuat Rehberliği",
      ],
      workflow: [
        "Kurumsal İhtiyaçların ve Yatırım Hedeflerinin Belirlenmesi",
        "Mevcut Cihaz Parkurunun Yerinde Teknik Taraması",
        "Fiyat/Performans ve Güvenilirlik Raporunun Sunulması",
        "Şartname ve Tedarik Yol Haritasının Çıkarılması",
        "Satın Alma veya Revizyon Kararlarının Uygulanması",
        "Sürekli Biyomedikal Danışmanlık ve Raporlama",
      ],
      benefits: [
        "Gereksiz cihaz yatırımlarını engelleyerek %40'a varan sermaye tasarrufu",
        "Tarafsız, bağımsız ve güvenilir biyomedikal ekspertiz",
        "Klinik gereksinimlere tam uyan doğru cihaz modellerinin seçimi",
        "Mevzuat ve sağlık kalite standartlarına eksiksiz uyumluluk",
      ],
    },
    translations: {
      tr: {
        title: "Kurumsal Biyomedikal Danışmanlık & Ekspertiz",
        shortDescription: "Hastane yatırımları, cihaz parkı ekspertizi, 2. el cihaz değerleme ve teknik şartname danışmanlığı.",
        description: "Sağlık kuruluşlarının tıbbi teknoloji yatırımlarında en doğru kararları vermelerini sağlıyoruz. Klinik ihtiyaç analizi, cihaz parkuru envanter yönetimi, ikinci el tıbbi cihaz ekspertizi ve amortisman planlaması ile bütçenizi en verimli şekilde yönlendiriyoruz.",
      },
      en: {
        title: "Corporate Biomedical Consulting & Appraisal",
        shortDescription: "Biomedical consulting, equipment inventory appraisal, procurement feasibility, and technical specification guidance.",
        description: "We help healthcare institutions optimize their medical technology investments. Our consulting covers inventory audits, pre-purchase appraisals for certified pre-owned devices, lifecycle cost analysis, and technical procurement specifications.",
      },
      ar: {
        title: "الاستشارات الطبية الحيوية المؤسسية والتقييم الفني",
        shortDescription: "استشارات الاستثمار الطبي، تقييم مخزون الأجهزة، دراسات الجدوى الفنية وإعداد دفاتر الشروط للمناقصات.",
        description: "نقدم استشارات هندسية وطبية حيوية متخصصة للمستشفيات والمراكز الطبية لترشيد نفقات شراء الأجهزة وتقييم كفاءة المعدات المستعملة وإعداد المواصفات الفنية المعتمدة.",
      },
      de: {
        title: "Klinische Medizintechnik-Beratung & Gutachten",
        shortDescription: "Unabhängige Beratung für Medizintechnik-Investitionen, Bestandsbewertung und Erstellung technischer Leistungsverzeichnisse.",
        description: "Wir unterstützen Kliniken und Versorgungszentren bei strategischen Technologieentscheidungen durch herstellerunabhängige Gutachten, Bestandsanalysen und Wirtschaftlichkeitsberechnungen.",
      },
      ja: {
        title: "医療機関向け技術コンサルティング・機器鑑定",
        shortDescription: "医療設備投資計画、資産評価、中古医療機器の専門鑑定および仕様書策定支援。",
        description: "医療機関の経営効率向上と安全な医療提供を両立するため、機器のライフサイクル評価、導入妥当性分析、技術仕様書の作成を包括的に支援します。",
      },
      zh: {
        title: "企业级生物医学咨询与设备评估",
        shortDescription: "医疗机构设备投资规划、在用资产技术鉴定、二手设备估值及采购招投标技术咨询。",
        description: "塞贝吉医疗为各级医院与医疗投资集团提供专业的医学工程技术咨询服务，涵盖设备资产审计、采购选型论证、生命周期成本核算及合规性评估。",
      },
    },
  },
];

export const STATIC_PRODUCTS: StaticProductItem[] = [
  {
    "id": "prod-1",
    "slug": "hastabasi-monitoru-cbc-m12",
    "categorySlug": "fizyolojik-sinyal-izleyiciler",
    "brand": "Cebeci Medikal",
    "model": "CBC-M12 Pro",
    "sku": "CBC-MON-012",
    "condition": "SECOND_HAND",
    "featured": true,
    "sortOrder": 1,
    "images": [
      "/images/products/hastabasi-monitoru-1.webp",
      "/images/products/hastabasi-monitoru-2.webp",
      "/images/products/hastabasi-monitoru-3.webp",
      "/images/products/hastabasi-monitoru-4.webp",
      "/images/products/hastabasi-monitoru-5.webp"
    ],
    "technicalSpecs": {
      "Ekran Boyutu": "12.1 inç Yüksek Çözünürlüklü Renkli TFT LCD",
      "Standart Parametreler": "EKG (3/5 Derivasyon), SpO2, NIBP, Solunum (RESP), 2-Kanal Sıcaklık (TEMP), Nabız (PR)",
      "Opsiyonel Modüller": "EtCO2 (Mainstream / Sidestream), 2-Kanal IBP, Kardiyak Çıktı (CO)",
      "Aritmi & ST Analizi": "23 Farklı Aritmi Tipi Algılama ve Gerçek Zamanlı ST Segment Analizi",
      "Batarya Ömrü": "Dahili Şarj Edilebilir Li-Ion Batarya (4+ Saat Kesintisiz Çalışma)",
      "Hafıza & Trend": "120 Saat Grafik ve Tablo Trend Kaydı, 1000 NIBP Ölçüm Hafızası",
      "Yazıcı": "Entegre 50mm Çift Kanallı Termal Yazıcı"
    },
    "applications": [
      "Genel ve Cerrahi Yoğun Bakım Üniteleri",
      "Koroner Yoğun Bakım (KVC)",
      "Ameliyathane ve Anestezi Ayılma Odaları (PACU)",
      "Acil Servis Müdahale ve Triyaj Alanları"
    ],
    "translations": {
      "tr": {
        "title": "Çok Parametreli Hastabaşı Monitörü (CBC-M12 Pro)",
        "shortDescription": "Yoğun bakım, ameliyathane ve acil servisler için 12.1 inç yüksek hassasiyetli çok parametreli hasta takip monitörü.",
        "description": "Cebeci Medikal CBC-M12 Pro, kritik ve yarı kritik hasta takibinde en yüksek hassasiyet standardını sunar. 12.1 inç geniş ekranı, esnek parametre modülleri, gelişmiş aritmi algılama algoritmaları ve dayanıklı tasarımı ile ameliyathanelerden yoğun bakım servislerine kadar kesintisiz klinik güvenilirlik sağlar. Merkezi monitör sistemlerine tam uyumludur."
      },
      "en": {
        "title": "Multi-Parameter Patient Monitor (CBC-M12 Pro)",
        "shortDescription": "12.1-inch high-precision patient monitor designed for ICU, OR, and emergency departments.",
        "description": "The CBC-M12 Pro delivers clinical precision for patient monitoring. Features a 12.1-inch TFT display, comprehensive arrhythmia analysis, multi-lead ECG, NIBP, SpO2, and optional EtCO2/IBP modules with full central monitoring compatibility."
      },
      "ar": {
        "title": "شاشة مراقبة المرضى متعددة القياسات (CBC-M12 Pro)",
        "shortDescription": "شاشة مراقبة متطورة قياس 12.1 بوصة مخصصة للعناية المركزة وغرف العمليات والطوارئ.",
        "description": "توفر شاشة CBC-M12 Pro دقة سريرية فائقة في متابعة العلامات الحيوية للمرضى، مع شاشة ملونة واضحة وتحليل متقدم لنبضات القلب وتخطيط القلب وضغط الدم ونسبة الأكسجين."
      },
      "de": {
        "title": "Multiparameter-Patientenmonitor (CBC-M12 Pro)",
        "shortDescription": "12,1-Zoll-Hochpräzisionsmonitor für Intensivstationen, OP-Säle und Notaufnahmen.",
        "description": "Der CBC-M12 Pro gewährleistet präzise Vitalparameter-Überwachung mit 12,1-Zoll-Display, EKG-, SpO2-, NIBP- und optionalen EtCO2-Modulen für maximale Zuverlässigkeit im klinischen Alltag."
      },
      "ja": {
        "title": "Multiparameter-Patientenmonitor (CBC-M12 Pro)",
        "shortDescription": "Multiparameter-Patientenmonitor (CBC-M12 Pro) - 高度な医療現場のニーズに応える高精度・高信頼性医療機器。",
        "description": "Multiparameter-Patientenmonitor (CBC-M12 Pro)は、手術室、集中治療室、一般病棟向けに設計された高性能システムです。厳格な品質管理基準と電気安全性検査をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "Multiparameter-Patientenmonitor (CBC-M12 Pro)",
        "shortDescription": "Multiparameter-Patientenmonitor (CBC-M12 Pro) - 满足临床高标准要求的专业医疗设备与系统。",
        "description": "Multiparameter-Patientenmonitor (CBC-M12 Pro) 专为各类医疗机构临床科室量身打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-2",
    "slug": "ekg-cihazi-cbc-ecg12",
    "categorySlug": "fizyolojik-sinyal-izleyiciler",
    "brand": "Cebeci Medikal",
    "model": "CBC-ECG12 Digital",
    "sku": "CBC-ECG-012",
    "condition": "SECOND_HAND",
    "featured": true,
    "sortOrder": 2,
    "images": [
      "/images/products/ekg-cihazi-1.webp",
      "/images/products/ekg-cihazi-2.webp"
    ],
    "technicalSpecs": {
      "Derivasyon": "12 Eşzamanlı Standart ve Cabrera Derivasyon Kaydı",
      "Ekran": "7 inç Renkli Dokunmatik LCD Ekran",
      "Yazıcı": "216mm Yüksek Çözünürlüklü Termal Yazıcı (Rulo ve Z-Katlama Kağıt)",
      "Otomatik Yorumlama": "Glasgow / CSE Standartlarında Otomatik Aritmi ve İskemi Analiz Raporu",
      "Filtreler": "Kas (EMG), Şebeke (AC) ve Taban Çizgisi Sürüklenme Filtreleri",
      "Hafıza": "Dahili 1000 EKG Kayıt Hafızası, USB ve SD Kart ile Veri Aktarımı",
      "Bağlantı": "DICOM, HL7, PDF ve XML Formatlarında Hastane Bilgi Sistemine (HBYS) Aktarım"
    },
    "applications": [
      "Kardiyoloji Poliklinikleri ve Servisleri",
      "Acil Servisler ve Ambulanslar",
      "Aile Sağlığı Merkezleri ve Özel Klinikler",
      "Ameliyat Öncesi Kardiyovasküler Değerlendirme"
    ],
    "translations": {
      "tr": {
        "title": "12 Kanallı Dijital EKG Cihazı (CBC-ECG12)",
        "shortDescription": "Dokunmatik ekranlı, otomatik yorumlamalı ve 216mm geniş termal yazıcılı 12 kanallı dijital elektrokardiyografi cihazı.",
        "description": "CBC-ECG12, kardiyovasküler teşhiste yüksek sinyal doğruluğu sağlayan 12 kanallı dijital EKG cihazıdır. Geniş termal yazıcısı, dokunmatik kullanıcı arayüzü, otomatik aritmi teşhis algoritmaları ve HBYS/DICOM entegrasyonu ile klinik muayene hızını ve doğruluğunu en üst düzeye çıkarır."
      },
      "en": {
        "title": "12-Channel Digital ECG Machine (CBC-ECG12)",
        "shortDescription": "12-lead digital electrocardiograph with 7-inch touch screen and automated diagnostic interpretation.",
        "description": "The CBC-ECG12 offers simultaneous 12-lead acquisition, advanced diagnostic algorithms, high-resolution 216mm thermal printing, and seamless hospital network integration."
      },
      "ar": {
        "title": "جهاز تخطيط القلب الرقمي 12 قناة (CBC-ECG12)",
        "shortDescription": "جهاز تخطيط قلب متطور بـ 12 قناة مع شاشة لمس وتقرير تشخيصي تلقائي وطباعة حرارية عريضة.",
        "description": "يقدم جهاز CBC-ECG12 أعلى مستويات الدقة في تشخيص أمراض القلب مع شاشة ملونة تعمل باللمس، وتفسير آلي دقيق لنتائج التخطيط وإمكانية الربط مع أنظمة المستشفيات."
      },
      "de": {
        "title": "12-Kanal Digitales EKG-Gerät (CBC-ECG12)",
        "shortDescription": "12-Kanal-Elektrokardiograph mit Touchscreen und automatischer Interpretationsfunktion.",
        "description": "Das CBC-ECG12 bietet präzise 12-Kanal-EKG-Aufzeichnung mit automatischer Befundung, breitem Thermodrucker und digitaler Datenübertragung ins Krankenhaus-Informationssystem."
      },
      "ja": {
        "title": "12-Channel Digital ECG Machine (CBC-ECG12)",
        "shortDescription": "Cebeci Medikal CBC-ECG12 Digital - 高精度臨床診断・治療に対応した医療機器。",
        "description": "Cebeci Medikal CBC-ECG12 Digitalは、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "12-Channel Digital ECG Machine (CBC-ECG12)",
        "shortDescription": "Cebeci Medikal CBC-ECG12 Digital - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal Cebeci Medikal CBC-ECG12 Digital 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-3",
    "slug": "bifazik-defibrilator-cbc-def500",
    "categorySlug": "yogun-bakim-ve-yasam-destek",
    "brand": "Cebeci Medikal",
    "model": "CBC-DEF500 Biphasic",
    "sku": "CBC-DEF-500",
    "condition": "SECOND_HAND",
    "featured": true,
    "sortOrder": 3,
    "images": [
      "/images/products/defibrilator-1.webp",
      "/images/products/defibrilator-2.webp",
      "/images/products/defibrilator-3.webp"
    ],
    "technicalSpecs": {
      "Dalga Formu": "Bifazik Kesilmiş Üstel Dalga Formu (BTE)",
      "Enerji Seviyeleri": "Manuel Mod: 1 - 360 Joule Arasında Kademeli Seçim",
      "Çalışma Modları": "Manuel Defibrilasyon, AED (Otomatik Eksternal), Senkron Kardiyoversiyon, Non-İnvaziv Pacer",
      "Şarj Süresi": "200 Joule Seviyesine 3 Saniyenin Altında Hızlı Şarj",
      "Monitörizasyon": "7 inç Renkli Ekran, 3/5 Derivasyon EKG, SpO2 ve NIBP Desteği",
      "Kaşıklar": "Entegre Yetişkin ve Pediyatrik Dönüştürülebilir Harici Kaşıklar",
      "Batarya": "Tam Şarj ile 100+ Şok veya 5 Saat Kesintisiz Monitörizasyon"
    },
    "applications": [
      "Hastane Acil Servisleri ve Resüsitasyon Odaları",
      "Yoğun Bakım Üniteleri ve Koroner Bakım",
      "Ameliyathaneler ve Kalp Kateterizasyon Laboratuvarları",
      "Acil Sağlık Ambulansları ve Mobil Müdahale Ekipleri"
    ],
    "translations": {
      "tr": {
        "title": "Bifazik Defibrilatör & Monitör Sistemi (CBC-DEF500)",
        "shortDescription": "Manuel, AED, Pacer ve Senkron Kardiyoversiyon özellikli 360J bifazik defibrilatör.",
        "description": "Kritik kardiyak acillerde hayat kurtaran CBC-DEF500; 360 Joule'e kadar bifazik enerji teknolojisi, ultra hızlı şarj kabiliyeti, entegre pacer ve çok parametreli monitörizasyon özellikleri ile acil servis ve yoğun bakımların vazgeçilmez ekipmanıdır."
      },
      "en": {
        "title": "Biphasic Defibrillator & Monitor (CBC-DEF500)",
        "shortDescription": "Advanced 360J biphasic defibrillator with Manual, AED, Pacing, and synchronized cardioversion.",
        "description": "Designed for resuscitation in critical cardiac emergencies. Delivers up to 360J biphasic shocks with sub-3-second charging, adult/pediatric paddles, and comprehensive vital sign monitoring."
      },
      "ar": {
        "title": "جهاز الصدمات الكهربائية ثنائي الطور (CBC-DEF500)",
        "shortDescription": "جهاز صدمات متقدم ثنائي الطور حتى 360 جول مع وظائف AED ومنظم ضربات القلب والمراقبة.",
        "description": "يتميز CBC-DEF500 بتقنية شحن فائقة السرعة وأقطاب مدمجة للبالغين والأطفال، مع شاشة مراقبة حيوية ودعم كامل لعمليات الإنعاش القلبي الرئوي."
      },
      "de": {
        "title": "Biphasischer Defibrillator & Monitor (CBC-DEF500)",
        "shortDescription": "360J biphasischer Defibrillator mit manuellem Modus, AED, Schrittmacher und SpO2/EKG.",
        "description": "Höchste Zuverlässigkeit in der Notfall- und Intensivmedizin: Biphasische Technologie bis 360 Joule, extrem schnelle Ladezeit und integriertes Vitaldaten-Monitoring."
      },
      "ja": {
        "title": "Biphasic Defibrillator & Monitor (CBC-DEF500)",
        "shortDescription": "Cebeci Medikal CBC-DEF500 Biphasic - 高精度臨床診断・治療に対応した医療機器。",
        "description": "Cebeci Medikal CBC-DEF500 Biphasicは、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "Biphasic Defibrillator & Monitor (CBC-DEF500)",
        "shortDescription": "Cebeci Medikal CBC-DEF500 Biphasic - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal Cebeci Medikal CBC-DEF500 Biphasic 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-4",
    "slug": "yogun-bakim-ventilatoru-cbc-vent700",
    "categorySlug": "yogun-bakim-ve-yasam-destek",
    "brand": "Cebeci Medikal",
    "model": "CBC-VENT700",
    "sku": "CBC-VNT-700",
    "condition": "SECOND_HAND",
    "featured": true,
    "sortOrder": 4,
    "images": [
      "/images/products/ventilator-1.webp",
      "/images/products/ventilator-2.webp",
      "/images/products/ventilator-3.webp",
      "/images/products/ventilator-4.webp",
      "/images/products/ventilator-5.webp"
    ],
    "technicalSpecs": {
      "Hasta Tipleri": "Yetişkin, Pediyatrik ve Yenidoğan (Neonatal) Hastalar",
      "Ventilasyon Modları": "VCV, PCV, SIMV-V, SIMV-P, CPAP/PSV, PRVC, Bi-Level, APRV, Non-İnvaziv (NIV)",
      "Tidal Hacim": "20 ml - 2000 ml (Neonatal modda 2 ml'ye kadar)",
      "Ekran": "15 inç Dokunmatik Renkli HD Grafik Ekran, 3 Dalga Formu ve 2 Döngü (Loop)",
      "Gaz Kaynağı": "Merkezi Gaz veya Entegre Yüksek Performanslı Sessiz Türbin Teknolojisi",
      "Ölçülen Parametreler": "Ppeak, Pplat, Pmean, PEEP, FiO2, Vte, Vti, MVe, İns/Eks Direnç ve Kompliyans",
      "Batarya": "Dahili Çift Batarya ile 6 Saat Kesintisiz Çalışma"
    },
    "applications": [
      "Erişkin, Çocuk ve Yenidoğan Yoğun Bakım Servisleri",
      "Göğüs Hastalıkları ve Solunum Yetmezliği Merkezleri",
      "Ameliyat Sonrası Ayılma ve Solunum Desteği",
      "Acil Transfer ve Kritik Hasta Bakımı"
    ],
    "translations": {
      "tr": {
        "title": "Yoğun Bakım & Transport Ventilatörü (CBC-VENT700)",
        "shortDescription": "Yetişkin, çocuk ve yenidoğan uyumlu, türbinli ve dokunmatik ekranlı gelişmiş mekanik ventilatör.",
        "description": "CBC-VENT700; invaziv ve non-invaziv modlarda üstün solunum senkronizasyonu sunar. Dahili türbin teknolojisi sayesinde merkezi hava hattına bağımlı olmadan çalışabilir. Gelişmiş akciğer koruyucu ventilasyon araçları ve kullanıcı dostu arayüzü ile kritik solunum desteğinde maksimum hasta konforu sağlar."
      },
      "en": {
        "title": "ICU & Transport Mechanical Ventilator (CBC-VENT700)",
        "shortDescription": "Advanced turbine-driven mechanical ventilator for adult, pediatric, and neonatal respiratory care.",
        "description": "The CBC-VENT700 offers comprehensive invasive and non-invasive ventilation with high-performance turbine technology, 15-inch touch screen, and advanced lung-protective tools."
      },
      "ar": {
        "title": "جهاز التنفس الاصطناعي للعناية المركزة (CBC-VENT700)",
        "shortDescription": "جهاز تنفس اصطناعي متطور بتوربين مدمج وشاشة 15 بوصة لجميع الفئات العمرية.",
        "description": "يوفر CBC-VENT700 تهوية تنفسية دقيقة ومريحة للمرضى في غرف العناية المركزة مع توافق كامل لحديثي الولادة والأطفال والبالغين دون الحاجة لشبكة هواء مضغوط خارجية."
      },
      "de": {
        "title": "Intensivbeatmungsgerät (CBC-VENT700)",
        "shortDescription": "Modernes turbinenbetriebenes Beatmungsgerät für Erwachsene, Kinder und Neonaten.",
        "description": "Das CBC-VENT700 vereint invasive und nicht-invasive Beatmungsmodi mit intuitiver 15-Zoll-Bedienung und autarker Turbinentechnologie für den anspruchsvollen Intensivpflegeeinsatz."
      },
      "ja": {
        "title": "ICU & Transport Mechanical Ventilator (CBC-VENT700)",
        "shortDescription": "Cebeci Medikal CBC-VENT700 - 高精度臨床診断・治療に対応した医療機器。",
        "description": "Cebeci Medikal CBC-VENT700は、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "ICU & Transport Mechanical Ventilator (CBC-VENT700)",
        "shortDescription": "Cebeci Medikal CBC-VENT700 - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal Cebeci Medikal CBC-VENT700 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-5",
    "slug": "anestezi-cihazi-cbc-anes900",
    "categorySlug": "ameliyathane-cihazlari",
    "brand": "Cebeci Medikal",
    "model": "CBC-ANES900 Workstation",
    "sku": "CBC-ANS-900",
    "condition": "SECOND_HAND",
    "featured": true,
    "sortOrder": 5,
    "images": [
      "/images/products/anestezi-cihazi-1.webp",
      "/images/products/anestezi-cihazi-2.webp",
      "/images/products/anestezi-cihazi-3.webp"
    ],
    "technicalSpecs": {
      "Ventilatör Modları": "VCV, PCV, SIMV, PSV, Manuel / Spontan Anestezi Modları",
      "Ekran": "12.1 inç Dokunmatik Renkli Entegre Anestezi Ekranı",
      "Vaporizatör Yuvaları": "Çift Selectatec Uyumlu Kilitlemeli Vaporizatör Yuvası",
      "Gaz Girişleri": "O2, N2O ve Medikal Hava (Air) Girişleri ile Mekanik/Elektronik Flowmetre",
      "Absorber Ünitesi": "Otoklavlanabilir Entegre Isıtıcılı CO2 Absorber (Bypass Özellikli)",
      "Atık Gaz Tahliyesi": "Aktif / Pasif AGSS (Anesthetic Gas Scavenging System) Uyumu"
    },
    "applications": [
      "Genel Cerrahi ve Kalp-Damar Cerrahisi Ameliyathaneleri",
      "Kadın Doğum ve Ortopedik Cerrahi Merkezleri",
      "Günübirlik Cerrahi ve Girişimsel İşlem Odaları"
    ],
    "translations": {
      "tr": {
        "title": "Ameliyathane Anestezi Cihazı & İş İstasyonu (CBC-ANES900)",
        "shortDescription": "Entegre elektronik ventilatörlü, çift vaporizatör yuvalı yüksek güvenlikli anestezi iş istasyonu.",
        "description": "CBC-ANES900, cerrahi operasyonlarda anestezi derinliğini ve hasta güvenliğini en yüksek seviyede tutmak için tasarlanmıştır. Düşük akımlı anestezi (low-flow) kabiliyeti, hassas tidal hacim kontrolü ve entegre gaz tahliye sistemiyle modern ameliyathanelerin vazgeçilmezidir."
      },
      "en": {
        "title": "Anesthesia Workstation & Ventilator (CBC-ANES900)",
        "shortDescription": "High-end anesthesia workstation with electronic ventilator and dual-vaporizer manifold.",
        "description": "The CBC-ANES900 provides safe anesthesia delivery for general and specialized surgical procedures, featuring low-flow capabilities, precision ventilation, and integrated CO2 absorption."
      },
      "ar": {
        "title": "محطة التخدير الجراحي المتكاملة (CBC-ANES900)",
        "shortDescription": "محطة تخدير متطورة مع جهاز تنفس مدمج ومبخرات مزدوجة لغرف العمليات الحديثة.",
        "description": "تضمن محطة التخدير CBC-ANES900 دقة متناهية في توزيع الغازات المخدرة مع دعم كامل للتنفس الصناعي ومراقبة المؤشرات الحيوية للمريض أثناء العمليات الجراحية."
      },
      "de": {
        "title": "Anästhesie-Arbeitsplatz & Beatmung (CBC-ANES900)",
        "shortDescription": "Präzisions-Anästhesiegerät mit integrierter Beatmungseinheit und Doppel-Verdampfer-Aufnahme.",
        "description": "Der CBC-ANES900 Anästhesie-Arbeitsplatz gewährleistet höchste Patientensicherheit bei operativen Eingriffen durch modernste Niedrigfluss-Anästhesietechnik und integrierte Gasüberwachung."
      },
      "ja": {
        "title": "Anesthesia Workstation & Ventilator (CBC-ANES900)",
        "shortDescription": "Cebeci Medikal CBC-ANES900 Workstation - 高精度臨床診断・治療に対応した医療機器。",
        "description": "Cebeci Medikal CBC-ANES900 Workstationは、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "Anesthesia Workstation & Ventilator (CBC-ANES900)",
        "shortDescription": "Cebeci Medikal CBC-ANES900 Workstation - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal Cebeci Medikal CBC-ANES900 Workstation 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-6",
    "slug": "yenidogan-kuvozu-cbc-inc600",
    "categorySlug": "yogun-bakim-ve-yasam-destek",
    "brand": "Cebeci Medikal",
    "model": "CBC-INC600 Neonatal",
    "sku": "CBC-INC-600",
    "condition": "SECOND_HAND",
    "featured": true,
    "sortOrder": 6,
    "images": [
      "/images/products/kuvoz-1.webp",
      "/images/products/kuvoz-2.webp",
      "/images/products/kuvoz-3.webp",
      "/images/products/kuvoz-4.webp",
      "/images/products/kuvoz-5.webp",
      "/images/products/kuvoz-6.webp"
    ],
    "technicalSpecs": {
      "Kontrol Modları": "Hava Modu ve Bebek Cilt Sıcaklığı Modu (Servo Kontrollü)",
      "Sıcaklık Ayar Aralığı": "Hava: 25.0°C - 37.0°C (Yüksek modda 39.0°C), Cilt: 34.0°C - 37.5°C",
      "Nem Kontrolü": "Ultrasonik Nemlendirme Sistemi (%30 - %95 RH Servo Kontrol)",
      "Oksijen Modülü": "Entegre Servo Oksijen Kontrol Ünitesi (%21 - %60 O2)",
      "Kabin Yapısı": "Çift Cidarlı Akrilik Başlık ile Düşük Radyant Isı Kaybı",
      "Ekstra Özellikler": "Entegre Dijital Bebek Tartısı, Kademesiz Trendelenburg Eğimi, X-Ray Kaset Tepsisi"
    },
    "applications": [
      "Yenidoğan Yoğun Bakım Üniteleri (NICU Seviye I, II, III)",
      "Doğumhaneler ve Bebek Bakım Odaları",
      "Prematüre ve Düşük Doğum Ağırlıklı Bebek Bakımı"
    ],
    "translations": {
      "tr": {
        "title": "Yenidoğan Yoğun Bakım Küvözü (CBC-INC600)",
        "shortDescription": "Servo nem ve oksijen kontrollü, çift cidarlı yüksek teknoloji prematüre bebek küvözü.",
        "description": "Prematüre ve kritik yenidoğan bebeklerin termal dengesini ve gelişimini korumak için tasarlanan CBC-INC600; mikroişlemcili sıcaklık ve nem regülasyonu, sessiz çalışma ortamı, dahili tartı ve çift cidarlı izolasyonu ile anne rahmi konforunu sağlar."
      },
      "en": {
        "title": "Neonatal Infant Incubator (CBC-INC600)",
        "shortDescription": "Microprocessor-controlled infant incubator with servo humidity and oxygen management.",
        "description": "The CBC-INC600 provides a stable microenvironment for premature neonates. Features dual-wall acrylic hood, precise servo-controlled temperature and humidity, and an integrated weighing scale."
      },
      "ar": {
        "title": "حاضنة الأطفال حديثي الولادة (CBC-INC600)",
        "shortDescription": "حاضنة متطورة للأطفال المبتسرين مع تحكم دقيق في الحرارة والرطوبة والأكسجين.",
        "description": "توفر حاضنة CBC-INC600 بيئة مثالية لرعاية ونمو الأطفال المبتسرين وحديثي الولادة مع جدران مزدوجة لعزل الحرارة ونظام مدمج لوزن الطفل ومراقبة العلامات الحيوية."
      },
      "de": {
        "title": "Neonatologie-Inkubator (CBC-INC600)",
        "shortDescription": "Intensiv-Inkubator für Frühgeborene mit Servo-Feuchtigkeits- und Sauerstoffregelung.",
        "description": "Der CBC-INC600 schafft optimale thermische Bedingungen für Früh- und Neugeborene mit doppelwandiger Haube, präziser Befeuchtung und integrierter Babywaage."
      },
      "ja": {
        "title": "Neonatal Infant Incubator (CBC-INC600)",
        "shortDescription": "Cebeci Medikal CBC-INC600 Neonatal - 高精度臨床診断・治療に対応した医療機器。",
        "description": "Cebeci Medikal CBC-INC600 Neonatalは、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "Neonatal Infant Incubator (CBC-INC600)",
        "shortDescription": "Cebeci Medikal CBC-INC600 Neonatal - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal Cebeci Medikal CBC-INC600 Neonatal 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-7",
    "slug": "renkli-doppler-ultrason-cbc-us7000",
    "categorySlug": "endovizyon-sistemleri",
    "brand": "Cebeci Medikal",
    "model": "CBC-US7000 Expert",
    "sku": "CBC-US-700",
    "condition": "SECOND_HAND",
    "featured": true,
    "sortOrder": 7,
    "images": [
      "/images/products/ultrason-1.webp",
      "/images/products/ultrason-2.webp",
      "/images/products/ultrason-3.webp",
      "/images/products/ultrason-4.webp"
    ],
    "technicalSpecs": {
      "Görüntüleme Modları": "B, 2B, 4B, M, Renkli Doppler (CFM), Power Doppler (PDI), Pulsed Wave (PW), CW Doppler, 3D/4D",
      "Ekran": "21.5 inç Tıbbi HD LED Monitör + 10.4 inç Dokunmatik Komut Paneli",
      "Prob Portları": "4 Aktif Yüksek Yoğunluklu Prob Soketi",
      "Desteklenen Problar": "Konveks, Lineer, Sektör Faz Dizili (Kardiyak), Transvajinal ve 4D Hacimsel Problar",
      "Gelişmiş Yazılımlar": "Doku Harmonik Görüntüleme (THI), Benek Azaltma (SRI), Elastografi, Otomatik IMT",
      "Depolama & Bağlantı": "500 GB Dahili SSD, DICOM 3.0, USB 3.0, HDMI Çıkışları"
    },
    "applications": [
      "Radyoloji ve Genel Ultrasonografi Görüntüleme",
      "Kadın Hastalıkları, Doğum ve Perinatoloji",
      "Kardiyoloji ve Vasküler Damar İncelemeleri",
      "Üroloji, Kas-İskelet ve Yüzeyel Doku Muayeneleri"
    ],
    "translations": {
      "tr": {
        "title": "Renkli Doppler Ultrasonografi Cihazı (CBC-US7000 Expert)",
        "shortDescription": "4 aktif prob portlu, 21.5 inç HD ekranlı ve kardiyo-vasküler/kadın doğum paketli renkli Doppler ultrason.",
        "description": "CBC-US7000 Expert; üstün görüntü kalitesi, geniş prob ailesi ve gelişmiş vasküler/obstetrik ölçüm paketleri ile klinik tanıda en yüksek doğruluğu sunar. Çok yönlü kullanım imkanıyla polikliniklerden görüntüleme merkezlerine kadar tüm teşhis ihtiyaçlarını karşılar."
      },
      "en": {
        "title": "Color Doppler Ultrasound System (CBC-US7000 Expert)",
        "shortDescription": "High-resolution ultrasound imaging system with 4 active ports and 21.5-inch medical display.",
        "description": "The CBC-US7000 delivers diagnostic clarity across radiology, cardiology, OB/GYN, and musculoskeletal exams with advanced imaging technologies and ergonomic workflow."
      },
      "ar": {
        "title": "جهاز الموجات فوق الصوتية الملون دوبلر (CBC-US7000 Expert)",
        "shortDescription": "نظام تصوير بالموجات فوق الصوتية عالي الدقة مزود بـ 4 منافذ للمجسات وشاشة طبية 21.5 بوصة.",
        "description": "يقدم جهاز CBC-US7000 صوراً تشخيصية فائقة الوضوح لمختلف التخصصات من أمراض النساء والولادة إلى القلب والأوعية الدموية مع حزم قياس متطورة وسهولة في الاستخدام."
      },
      "de": {
        "title": "Farbdoppler-Ultraschallsystem (CBC-US7000 Expert)",
        "shortDescription": "Leistungsstarkes Ultraschallsystem mit 21,5-Zoll-Monitor und umfassenden Diagnosepaketen.",
        "description": "Das CBC-US7000 Expert bietet exzellente Bildauflösung für Radiologie, Kardiologie und Gynäkologie mit modernster Signalverarbeitung und benutzerfreundlichem Bedienkonzept."
      },
      "ja": {
        "title": "Color Doppler Ultrasound System (CBC-US7000 Expert)",
        "shortDescription": "Cebeci Medikal CBC-US7000 Expert - 高精度臨床診断・治療に対応した医療機器。",
        "description": "Cebeci Medikal CBC-US7000 Expertは、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "Color Doppler Ultrasound System (CBC-US7000 Expert)",
        "shortDescription": "Cebeci Medikal CBC-US7000 Expert - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal Cebeci Medikal CBC-US7000 Expert 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-8",
    "slug": "elektroterapi-fizik-tedavi-cbc-pt400",
    "categorySlug": "fizik-tedavi-cihazlari",
    "brand": "Cebeci Medikal",
    "model": "CBC-PT400 Combo",
    "sku": "CBC-PT-400",
    "condition": "SECOND_HAND",
    "featured": true,
    "sortOrder": 8,
    "images": [
      "/images/products/fizik-tedavi-1.webp",
      "/images/products/fizik-tedavi-2.webp",
      "/images/products/fizik-tedavi-3.webp",
      "/images/products/fizik-tedavi-4.webp",
      "/images/products/fizik-tedavi-5.webp"
    ],
    "technicalSpecs": {
      "Akım Tipleri": "TENS, NMES, Enterferansiyel (IFC), Galvanik, Faradik, Rus Akımı, Trabert, Diadinamik",
      "Kanal Sayısı": "2 Bağımsız Elektroterapi Kanalı + 1 Ultrason Terapi Kanalı",
      "Ultrason Frekansları": "1 MHz (Derin Doku) ve 3 MHz (Yüzeyel Doku) Çift Frekanslı Başlık",
      "Çalışma Modları": "Sürekli (Continuous) ve Kesikli (Pulsed: %10, %20, %50) Modlar",
      "Ekran": "Renkli Grafik Ekran ve Anatomik Vaka Tedavi Rehberi",
      "Hafıza": "100+ Hazır Klinik Protokol ve 50 Kullanıcı Tanımlı Özel Program"
    },
    "applications": [
      "Fizik Tedavi ve Rehabilitasyon Merkezleri",
      "Ortopedi ve Travmatoloji Klinikleri",
      "Sporcu Sağlığı ve Performans Merkezleri",
      "Nörolojik Rehabilitasyon ve Ağrı Tedavi Üniteleri"
    ],
    "translations": {
      "tr": {
        "title": "Kombine Elektroterapi & Ultrason Tedavi Cihazı (CBC-PT400)",
        "shortDescription": "Çift kanallı elektroterapi ve 1/3 MHz ultrason terapisi sunan kombine fizik tedavi cihazı.",
        "description": "CBC-PT400 Combo; kas iskelet sistemi ağrılarının giderilmesinde, kas güçlendirmede ve doku iyileşmesinde elektroterapi ve ultrasonu tek bir ünitede birleştirir. Geniş akım yelpazesi ve hazır anatomik tedavi protokolleri ile fizyoterapistlerin en büyük yardımcısıdır."
      },
      "en": {
        "title": "Combined Electrotherapy & Ultrasound Device (CBC-PT400)",
        "shortDescription": "Dual-channel electrotherapy and 1/3 MHz therapeutic ultrasound combination unit.",
        "description": "The CBC-PT400 combines multiple electrotherapy waveforms with dual-frequency ultrasound for rehabilitation, pain management, and musculoskeletal therapy."
      },
      "ar": {
        "title": "جهاز العلاج الطبيعي المدمج بالكهرباء والألتراساوند (CBC-PT400)",
        "shortDescription": "وحدة علاج طبيعي متكاملة تجمع بين التيارات العلاجية والموجات فوق الصوتية 1/3 ميجاهرتز.",
        "description": "يوفر CBC-PT400 حلولاً شاملة لإعادة التأهيل وعلاج الآلام العضلية والمفصلية عبر برامج علاجية مبرمجة مسبقاً وتصميم احترافي يلبي احتياجات مراكز العلاج الطبيعي."
      },
      "de": {
        "title": "Kombinationsgerät Elektro- & Ultraschalltherapie (CBC-PT400)",
        "shortDescription": "2-Kanal-Elektrotherapie und 1/3 MHz Ultraschalltherapie in einem kompakten System.",
        "description": "Das CBC-PT400 kombiniert moderne Reizstromformen mit therapeutischem Ultraschall für effektive Schmerztherapie und muskuloskelettale Rehabilitation."
      },
      "ja": {
        "title": "Combined Electrotherapy & Ultrasound Device (CBC-PT400)",
        "shortDescription": "Cebeci Medikal CBC-PT400 Combo - 高精度臨床診断・治療に対応した医療機器。",
        "description": "Cebeci Medikal CBC-PT400 Comboは、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "Combined Electrotherapy & Ultrasound Device (CBC-PT400)",
        "shortDescription": "Cebeci Medikal CBC-PT400 Combo - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal Cebeci Medikal CBC-PT400 Combo 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-9",
    "slug": "kan-gazi-analizoru-cbc-bg300",
    "categorySlug": "laboratuvar-cihazlari",
    "brand": "Cebeci Medikal",
    "model": "CBC-BG300 Lab",
    "sku": "CBC-LAB-300",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 9,
    "images": [
      "/images/products/kan-gazi-analizoru-1.webp",
      "/images/products/kan-gazi-analizoru-2.webp"
    ],
    "technicalSpecs": {
      "Ölçülen Parametreler": "pH, pCO2, pO2, Na+, K+, Cl-, Ca++, Glu, Lac, Hct, tHb, SO2",
      "Örnek Hacmi": "Tam Kan, Plazma veya Serum (Sadece 90 µL Örnek)",
      "Analiz Süresi": "60 Saniyenin Altında Hızlı Test Çıktısı",
      "Kartuş Sistemi": "Bakım Gerektirmeyen Entegre Çoklu Test Kartuşu",
      "Kalibrasyon": "Otomatik Sıvı ve Gaz Kalibrasyonu",
      "Ekran": "8.4 inç Dokunmatik Renkli Ekran ve Dahili Termal Yazıcı"
    },
    "applications": [
      "Acil Servis ve Yoğun Bakım Laboratuvarları",
      "Kardiyovasküler Cerrahi ve Anestezi Birimleri",
      "Göğüs Hastalıkları ve Solunum Klinikleri"
    ],
    "translations": {
      "tr": {
        "title": "Tam Otomatik Kan Gazı & Elektrolit Analizörü (CBC-BG300)",
        "shortDescription": "Kartuşlu sistem, 60 saniyede hızlı sonuç ve 90µL düşük numune hacmiyle kritik kan gazı ölçüm cihazı.",
        "description": "CBC-BG300, acil servis ve yoğun bakımlarda dakikaların hayati olduğu anlarda hızlı ve güvenilir kan gazı, elektrolit ve metabolit analizleri sunar. Kartuşlu yapısı bakım ihtiyacını sıfıra indirir."
      },
      "en": {
        "title": "Automated Blood Gas & Electrolyte Analyzer (CBC-BG300)",
        "shortDescription": "Fast cartridge-based blood gas analyzer delivering critical results in under 60 seconds.",
        "description": "The CBC-BG300 provides accurate point-of-care blood gas, electrolyte, and metabolite testing with minimal sample volume and maintenance-free cartridge technology."
      },
      "ar": {
        "title": "محلل غازات الدم والشوارد التلقائي (CBC-BG300)",
        "shortDescription": "جهاز قياس غازات الدم بنظام الكبسولات يمنح نتائج دقيقة في أقل من 60 ثانية.",
        "description": "يقدم CBC-BG300 نتائج مخبرية سريعة وموثوقة لتحليل غازات الدم والشوارد في أقسام الطوارئ والعناية المشددة دون الحاجة لصيانة معقدة."
      },
      "de": {
        "title": "Automatischer Blutgas- und Elektrolyt-Analysator (CBC-BG300)",
        "shortDescription": "Wartungsfreier Blutgasanalysator mit Ergebnissen in unter 60 Sekunden.",
        "description": "Der CBC-BG300 ermöglicht präzise Point-of-Care-Diagnostik für Blutgase, Elektrolyte und Stoffwechselparameter in Notaufnahmen und Intensivstationen."
      },
      "ja": {
        "title": "Automated Blood Gas & Electrolyte Analyzer (CBC-BG300)",
        "shortDescription": "Cebeci Medikal CBC-BG300 Lab - 高精度臨床診断・治療に対応した医療機器。",
        "description": "Cebeci Medikal CBC-BG300 Labは、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "Automated Blood Gas & Electrolyte Analyzer (CBC-BG300)",
        "shortDescription": "Cebeci Medikal CBC-BG300 Lab - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal Cebeci Medikal CBC-BG300 Lab 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-10",
    "slug": "cerrahi-aspirator-cbc-asp3000",
    "categorySlug": "ameliyathane-cihazlari",
    "brand": "Cebeci Medikal",
    "model": "CBC-ASP3000 Suction",
    "sku": "CBC-ASP-300",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 10,
    "images": [
      "/images/products/aspirator-1.webp",
      "/images/products/aspirator-2.webp",
      "/images/products/aspirator-3.webp"
    ],
    "technicalSpecs": {
      "Maksimum Vakum": "-0.90 bar (-675 mmHg) Kademesiz Ayarlanabilir",
      "Emiş Debisi": "60 Litre / Dakika Yüksek Performanslı Yağsız Pompa",
      "Toplama Kavanozları": "2 x 3 Litre veya 2 x 5 Litre Otoklavlanabilir Polikarbonat Kavanoz",
      "Güvenlik Sistemi": "Çift Taşma Emniyet Valfi ve Hidrofobik Bakteri Filtresi",
      "Gürültü Seviyesi": "≤ 45 dB Sessiz Çalışma",
      "Mobilite": "4 Adet Kilitlenebilir Antistatik Tekerlekli Paslanmaz Çelik Şasi"
    },
    "applications": [
      "Genel ve Ortopedik Cerrahi Ameliyathaneleri",
      "Kadın Doğum ve Jinekolojik Müdahaleler",
      "Yoğun Bakım Aspirasyon ve Drenaj İşlemleri",
      "Acil Servis Cerrahi Müdahale Odaları"
    ],
    "translations": {
      "tr": {
        "title": "Yüksek Vakumlu Cerrahi Aspiratör Cihazı (CBC-ASP3000)",
        "shortDescription": "60 L/dk emiş debili, çift otoklavlanabilir kavanozlu ve taşma emniyetli cerrahi aspiratör.",
        "description": "CBC-ASP3000, cerrahi operasyonlarda kan, vücut sıvıları ve partiküllerin güvenle tahliyesi için güçlü vakum performansı ve sessiz çalışma sunar. Yağsız pistonlu motoru uzun ömürlü ve bakım gerektirmez."
      },
      "en": {
        "title": "High-Vacuum Surgical Suction Unit (CBC-ASP3000)",
        "shortDescription": "Heavy-duty 60 L/min surgical aspirator with dual autoclavable jars and overflow protection.",
        "description": "The CBC-ASP3000 delivers dependable high-vacuum suction for operating rooms and intensive care, featuring oil-less pump design and dual overflow safety filters."
      },
      "ar": {
        "title": "شفاط جراحي عالي القدرة (CBC-ASP3000)",
        "shortDescription": "جهاز شفط جراحي بقدرة 60 لتر/دقيقة مع برطمانين قابلين للتعقيم ونظام حماية من الفيضان.",
        "description": "صُمم CBC-ASP3000 للعمل الشاق في غرف العمليات وشفط السوائل الجراحية بأعلى معايير الأمان ومستوى ضجيج منخفض للغاية."
      },
      "de": {
        "title": "Chirurgisches Hochleistungs-Absauggerät (CBC-ASP3000)",
        "shortDescription": "Chirurgischer Absauger mit 60 L/min Saugleistung und autoklavierbaren Behältern.",
        "description": "Das CBC-ASP3000 gewährleistet leistungsstarke und leise Absaugung im Operationssaal mit wartungsfreier Kolbenpumpe und doppeltem Überlaufschutz."
      },
      "ja": {
        "title": "High-Vacuum Surgical Suction Unit (CBC-ASP3000)",
        "shortDescription": "Cebeci Medikal CBC-ASP3000 Suction - 高精度臨床診断・治療に対応した医療機器。",
        "description": "Cebeci Medikal CBC-ASP3000 Suctionは、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "High-Vacuum Surgical Suction Unit (CBC-ASP3000)",
        "shortDescription": "Cebeci Medikal CBC-ASP3000 Suction - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal Cebeci Medikal CBC-ASP3000 Suction 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-11",
    "slug": "elektrokoter-cerrahi-unite-cbc-surg400",
    "categorySlug": "ameliyathane-cihazlari",
    "brand": "Cebeci Medikal",
    "model": "CBC-SURG400 Pro",
    "sku": "CBC-KOT-400",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 11,
    "images": [
      "/images/products/elektrokoter-1.webp"
    ],
    "technicalSpecs": {
      "Maksimum Monopolar Güç": "400 Watt Saf Kesme (Pure Cut), 300W Karışık Kesme (Blend 1/2/3)",
      "Monopolar Koagülasyon": "150 Watt Fulgurasyon / Sprey / Kontak Koagülasyon",
      "Bipolar Güç": "120 Watt Hassas Mikro-Bipolar ve Bipolar Kesme",
      "Güvenlik Sistemi": "REM (Return Electrode Monitoring) Nötr Plak Temas ve Güvenlik Sistemi",
      "Endoskopik Mod": "Laparoskopi ve Sualtı (TUR) Cerrahisi Özel Modları",
      "Aktivasyon": "Çift Pedallı Ayak Şalteri ve El Kumandalı Kalem Desteği"
    },
    "applications": [
      "Genel Cerrahi, Üroloji ve Jinekoloji",
      "Ortopedi ve Beyin-Omurilik Cerrahisi (Nöroşirürji)",
      "Plastik ve Rekonstrüktif Cerrahi",
      "Laparoskopik ve Endoskopik Müdahaleler"
    ],
    "translations": {
      "tr": {
        "title": "Elektrocerrahi Koter & Cerrahi Ünite (CBC-SURG400 Pro)",
        "shortDescription": "400 Watt monopolar ve bipolar kesme/koagülasyon özellikli, REM güvenlik sistemli elektrokoter.",
        "description": "CBC-SURG400 Pro, cerrahi operasyonlarda doku kesme ve kanama kontrolünde maksimum hassasiyet sunar. Otomatik güç dengeleme ve nötr plak temas izleme sistemiyle cerrah ve hasta güvenliğini garanti eder."
      },
      "en": {
        "title": "Electrosurgical Unit & Cautery (CBC-SURG400 Pro)",
        "shortDescription": "400W monopolar and bipolar electrosurgical generator with advanced tissue sensing.",
        "description": "The CBC-SURG400 Pro provides surgical cutting and coagulation with integrated contact quality monitoring (REM) and specialized TUR/laparoscopic modes."
      },
      "ar": {
        "title": "وحدة الكي الجراحي الكهربائي (CBC-SURG400 Pro)",
        "shortDescription": "جهاز كي وقص جراحي 400 واط أحادي وثنائي القطب مع أنظمة أمان متطورة.",
        "description": "يوفر جهاز CBC-SURG400 Pro تحكماً فائقاً في القطع والتخثر أثناء العمليات الجراحية المفتوحة والتنظيرية مع حماية كاملة للمريض عبر نظام مراقبة القطب المحايد."
      },
      "de": {
        "title": "Elektrochirurgie-Gerät (CBC-SURG400 Pro)",
        "shortDescription": "400W monopolares und bipolares HF-Chirurgiegerät mit REM-Patientensicherheitssystem.",
        "description": "Das CBC-SURG400 Pro bietet präzise Schneide- und Koagulationsmodi für alle chirurgischen Fachbereiche mit automatischer Leistungsanpassung."
      },
      "ja": {
        "title": "Electrosurgical Unit & Cautery (CBC-SURG400 Pro)",
        "shortDescription": "Cebeci Medikal CBC-SURG400 Pro - 高精度臨床診断・治療に対応した医療機器。",
        "description": "Cebeci Medikal CBC-SURG400 Proは、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "Electrosurgical Unit & Cautery (CBC-SURG400 Pro)",
        "shortDescription": "Cebeci Medikal CBC-SURG400 Pro - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal Cebeci Medikal CBC-SURG400 Pro 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-12",
    "slug": "endovizyon-kamera-sistemi-cbc-endo4k",
    "categorySlug": "endovizyon-sistemleri",
    "brand": "Cebeci Medikal",
    "model": "CBC-ENDO4K Vision",
    "sku": "CBC-END-400",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 12,
    "images": [
      "/images/products/endovizyon-sistemi-1.webp"
    ],
    "technicalSpecs": {
      "Kamera Çözünürlüğü": "Ultra HD 4K / Full HD 1080p 60 FPS Medikal CMOS Sensör",
      "Kamera Başlığı": "IPX8 Su Geçirmez, Otoklavlanabilir / Gaz Sterilizasyonuna Uygun",
      "Işık Kaynağı": "Entegre veya Bağımsız 100W Yüksek Lümenli LED Soğuk Işık",
      "Video Çıkışları": "HDMI 2.0, 12G-SDI, DVI ve USB Kayıt Portu",
      "Görüntü İşleme": "Doku Damar Vurgulama (Vascular Enhance), Otomatik Beyaz Ayarı, Dijital Zoom"
    },
    "applications": [
      "Laparoskopi ve Genel Cerrahi",
      "Artroskopik Eklem Cerrahisi",
      "Ürolojik ve Histeroskopik Endoskopi",
      "KBB (Kulak Burun Boğaz) Muayene ve Cerrahisi"
    ],
    "translations": {
      "tr": {
        "title": "Endovizyon & Laparoskopi Kamera Sistemi (CBC-ENDO4K)",
        "shortDescription": "Ultra HD çözünürlüklü, su geçirmez başlıklı ve damar vurgulama modlu endoskopik kamera sistemi.",
        "description": "CBC-ENDO4K, minimal invaziv cerrahide en ince anatomik detayları kristal netliğinde sunar. Gelişmiş renk ayrımı ve yüksek kare hızı ile cerrahlara operasyon sırasında benzersiz bir görsel derinlik kazandırır."
      },
      "en": {
        "title": "Endoscopy & Laparoscopy Camera System (CBC-ENDO4K)",
        "shortDescription": "Ultra HD medical camera system with waterproof head and advanced vascular enhancement.",
        "description": "The CBC-ENDO4K delivers high-definition visualization for minimally invasive surgical procedures with realistic color reproduction and versatile digital outputs."
      },
      "ar": {
        "title": "نظام كاميرات التنظير الجراحي (CBC-ENDO4K)",
        "shortDescription": "نظام تصوير تنظيري فائق الدقة 4K مع رأس كاميرا مقاوم للماء وتعزيز بصري للأوعية.",
        "description": "يقدم CBC-ENDO4K رؤية جراحية واضحة للغاية في عمليات المناظير والعمليات الجراحية الدقيقة مع مخرجات فيديو متعددة ونظام إضاءة باردة متطور."
      },
      "de": {
        "title": "Endoskopie-Kamerasystem (CBC-ENDO4K)",
        "shortDescription": "Ultra-HD Endoskopiekamera mit wasserdichtem Kamerakopf und Gefäßkontrast-Modus.",
        "description": "Das CBC-ENDO4K liefert gestochen scharfe Visualisierung für laparoskopische und arthroskopische Eingriffe mit modernster Bildverarbeitung."
      },
      "ja": {
        "title": "Endoscopy & Laparoscopy Camera System (CBC-ENDO4K)",
        "shortDescription": "Cebeci Medikal CBC-ENDO4K Vision - 高精度臨床診断・治療に対応した医療機器。",
        "description": "Cebeci Medikal CBC-ENDO4K Visionは、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "Endoscopy & Laparoscopy Camera System (CBC-ENDO4K)",
        "shortDescription": "Cebeci Medikal CBC-ENDO4K Vision - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal Cebeci Medikal CBC-ENDO4K Vision 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-13",
    "slug": "enjektor-perfusor-pompasi-cbc-sp100",
    "categorySlug": "yogun-bakim-ve-yasam-destek",
    "brand": "Cebeci Medikal",
    "model": "CBC-SP100 Precision",
    "sku": "CBC-INJ-100",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 13,
    "images": [
      "/images/products/enjektor-pompasi-1.webp",
      "/images/products/enjektor-pompasi-2.webp"
    ],
    "technicalSpecs": {
      "Şırınga Boyutları": "5ml, 10ml, 20ml, 30ml, 50/60ml Evrensel Otomatik Şırınga Algılama",
      "Akış Hızı Aralığı": "0.1 ml/h - 1500.0 ml/h (0.1 ml/h artırımlarla)",
      "Hassasiyet": "± %2 Yüksek Dozaj Doğruluğu",
      "Bolus Hızı": "1500 ml/h Kademeli Otomatik ve Manuel Bolus Modu",
      "Oklüzyon Seviyeleri": "3 Kademeli Ayarlanabilir Tıkanma Basınç Sensörü",
      "Batarya": "Dahili Şarj Edilebilir Batarya ile 8+ Saat Sürekli Çalışma"
    },
    "applications": [
      "Yoğun Bakım Üniteleri ve Anestezi",
      "Neonatoloji ve Pediyatrik Dozaj Uygulamaları",
      "Onkoloji ve Kemoterapi İlaç İletimi"
    ],
    "translations": {
      "tr": {
        "title": "Hassas Enjektör (Perfüzör) Pompası (CBC-SP100)",
        "shortDescription": "Tüm enjektör boyutlarıyla uyumlu, ±%2 hassasiyetli akıllı mikro-infüzyon enjektör pompası.",
        "description": "CBC-SP100, kritik ilaç ve anestezik madde infüzyonlarında yüksek dozaj hassasiyeti ve güvenlik sunar. Otomatik şırınga boyutu tanıma, oklüzyon algılama ve uzun batarya ömrü ile yoğun bakım güvenliğini artırır."
      },
      "en": {
        "title": "Precision Syringe Infusion Pump (CBC-SP100)",
        "shortDescription": "High-accuracy syringe driver compatible with 5-60ml syringes and smart occlusion sensing.",
        "description": "The CBC-SP100 provides accurate drug delivery for critical care, featuring universal syringe detection, multi-level occlusion alarms, and long battery autonomy."
      },
      "ar": {
        "title": "مضخة الحقن والسرنجات الدقيقة (CBC-SP100)",
        "shortDescription": "مضخة حقن إلكترونية عالية الدقة متوافقة مع جميع أحجام السرنجات من 5 إلى 60 مل.",
        "description": "تضمن مضخة CBC-SP100 توزيعاً دقيقاً للغاية للأدوية الحساسة ومواد التخدير في العناية المركزة مع شاشة رقمية واضحة وأنظمة إنذار أمان متعددة."
      },
      "de": {
        "title": "Präzisions-Spritzenpumpe (CBC-SP100)",
        "shortDescription": "Intelligente Spritzenpumpe mit automatischer Größenerkennung (5-60ml) und hoher Dosiergenauigkeit.",
        "description": "Die CBC-SP100 garantiert exakte Medikamentenverabreichung in der Intensiv- und Anästhesiepflege mit zuverlässigen Sicherheits- und Okklusionssensoren."
      },
      "ja": {
        "title": "Precision Syringe Infusion Pump (CBC-SP100)",
        "shortDescription": "Cebeci Medikal CBC-SP100 Precision - 高精度臨床診断・治療に対応した医療機器。",
        "description": "Cebeci Medikal CBC-SP100 Precisionは、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "Precision Syringe Infusion Pump (CBC-SP100)",
        "shortDescription": "Cebeci Medikal CBC-SP100 Precision - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal Cebeci Medikal CBC-SP100 Precision 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-14",
    "slug": "volumetrik-infuzyon-pompasi-cbc-ip200",
    "categorySlug": "yogun-bakim-ve-yasam-destek",
    "brand": "Cebeci Medikal",
    "model": "CBC-IP200 Flow",
    "sku": "CBC-INF-200",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 14,
    "images": [
      "/images/products/infuzyon-pompasi-1.webp"
    ],
    "technicalSpecs": {
      "İnfüzyon Aralığı": "0.1 - 1200 ml/h (0.1 ml/h hassasiyet)",
      "Set Uyumu": "Evrensel Standart IV Serum Setleri ile Tam Uyum",
      "Hava Kabarcığı Algılama": "Ultrasonik Çift Sensörlü Hava Dedektörü",
      "Doz Hesaplama": "Dahili İlaç Kütüphanesi ve Vücut Ağırlığına Göre Doz Hesaplama",
      "Ekran": "Geniş Renkli Aydınlatmalı LCD Gösterge",
      "KVO (Keep Vein Open)": "0.1 - 5.0 ml/h Ayarlanabilir Damar Açık Tutma Hızı"
    },
    "applications": [
      "Genel Servisler ve Yataklı Tedavi Birimleri",
      "Kemoterapi ve Onkoloji İnfüzyonları",
      "Yoğun Bakım Sıvı ve Elektrolit Tedavileri"
    ],
    "translations": {
      "tr": {
        "title": "Volumetrik İnfüzyon Pompası (CBC-IP200 Flow)",
        "shortDescription": "Evrensel IV set uyumlu, ultrasonik hava dedektörlü ve akıllı ilaç kütüphaneli infüzyon pompası.",
        "description": "CBC-IP200 Flow; damar içi sıvı, ilaç ve kan bileşenlerinin güvenli aktarımı için tasarlanmıştır. Çift ultrasonik hava dedektörü ve anti-bolus koruma sistemi ile hasta güvenliğini en üst düzeye çıkarır."
      },
      "en": {
        "title": "Volumetric Infusion Pump (CBC-IP200 Flow)",
        "shortDescription": "Universal IV set compatible infusion pump with ultrasonic air bubble detection.",
        "description": "The CBC-IP200 ensures safe intravenous fluid and drug administration with dual ultrasonic air sensors, anti-bolus functionality, and comprehensive alarm profiles."
      },
      "ar": {
        "title": "مضخة المحاليل الوريدية الحجمية (CBC-IP200 Flow)",
        "shortDescription": "مضخة محاليل متطورة متوافقة مع مجموعات الحقن القياسية ومزودة بمستشعر فقاعات الهواء.",
        "description": "توفر CBC-IP200 تحكماً دقيقاً في ضخ المحاليل والأدوية الوريدية مع شاشة واضحة ونظام حماية متكامل ضد الانسداد والفقاعات الهوائية."
      },
      "de": {
        "title": "Volumetrische Infusionspumpe (CBC-IP200 Flow)",
        "shortDescription": "Zuverlässige Infusionspumpe mit Ultraschall-Luftdetektion und universeller Set-Kompatibilität.",
        "description": "Die CBC-IP200 gewährleistet präzise und sichere Infusionstherapie mit Anti-Bolus-Funktion und intuitiver Menüführung für den Pflegealltag."
      },
      "ja": {
        "title": "Volumetric Infusion Pump (CBC-IP200 Flow)",
        "shortDescription": "Cebeci Medikal CBC-IP200 Flow - 高精度臨床診断・治療に対応した医療機器。",
        "description": "Cebeci Medikal CBC-IP200 Flowは、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "Volumetric Infusion Pump (CBC-IP200 Flow)",
        "shortDescription": "Cebeci Medikal CBC-IP200 Flow - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal Cebeci Medikal CBC-IP200 Flow 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-15",
    "slug": "fetal-monitor-nst-cbc-nst800",
    "categorySlug": "fizyolojik-sinyal-izleyiciler",
    "brand": "Cebeci Medikal",
    "model": "CBC-NST800 Dual",
    "sku": "CBC-NST-800",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 15,
    "images": [
      "/images/products/nst-fetal-monitor-1.webp"
    ],
    "technicalSpecs": {
      "Parametreler": "FHR1 (Fetal Kalp Hızı 1), FHR2 (İkiz Gebelik), TOCO (Rahim Kasılmaları), Otomatik/Manuel Fetal Hareket (FM)",
      "Ekran": "12.1 inç Katlanabilir Renkli Dokunmatik TFT Ekran (0-90° Açı Ayarlı)",
      "Problar": "1 MHz 12 Kristalli Geniş Işınlı Yüksek Hassasiyetli Su Geçirmez Ultrason Probları",
      "Yazıcı": "152mm Geniş Termal Yazıcı (Gerçek Zamanlı Çıktı)",
      "Hafıza": "60 Saatlik Kesintisiz Fetal Eğri Trend Hafızası"
    },
    "applications": [
      "Kadın Hastalıkları ve Doğum Klinikleri",
      "Doğumhaneler ve Travay Odaları",
      "Perinatoloji ve Yüksek Riskli Gebelik Takip Merkezleri"
    ],
    "translations": {
      "tr": {
        "title": "NST (Non-Stres Test) Fetal Monitör (CBC-NST800 Dual)",
        "shortDescription": "İkiz gebelik destekli, katlanabilir 12.1 inç ekranlı ve 152mm termal yazıcılı fetal monitör.",
        "description": "CBC-NST800 Dual; doğum öncesi ve doğum anında bebek kalp atışlarını ve rahim kasılmalarını eşzamanlı izler. İkiz gebelik takibi ve yüksek hassasiyetli 12 kristalli probları ile güvenilir perinatolojik tanı imkanı sunar."
      },
      "en": {
        "title": "Fetal Monitor / NST Device (CBC-NST800 Dual)",
        "shortDescription": "Twin monitoring capable fetal monitor with 12.1-inch folding display and 152mm thermal printer.",
        "description": "The CBC-NST800 provides accurate antepartum and intrapartum monitoring of fetal heart rate and uterine contractions with high-sensitivity waterproof transducers."
      },
      "ar": {
        "title": "جهاز مراقبة نبض الجنين والتقلصات (CBC-NST800 Dual)",
        "shortDescription": "شاشة مراقبة الجنين المزدوجة مع شاشة قابلة للإمالة وطباعة حرارية عريضة.",
        "description": "يراقب CBC-NST800 بدقة عالية نبض الجنين وانقباضات الرحم في عيادات التوليد وغرف الولادة مع دعم كامل للحمل التوأمي وحفظ السجلات."
      },
      "de": {
        "title": "Fetalmonitor / CTG-Gerät (CBC-NST800 Dual)",
        "shortDescription": "Kardiotokograph mit Zwillingsüberwachung und schwenkbarem 12,1-Zoll-Touchdisplay.",
        "description": "Das CBC-NST800 ermöglicht präzise ante- und intrapartale CTG-Überwachung mit wasserdichten 12-Kristall-Sonden und integriertem Kurvenspeicher."
      },
      "ja": {
        "title": "Fetal Monitor / NST Device (CBC-NST800 Dual)",
        "shortDescription": "Cebeci Medikal CBC-NST800 Dual - 高精度臨床診断・治療に対応した医療機器。",
        "description": "Cebeci Medikal CBC-NST800 Dualは、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "Fetal Monitor / NST Device (CBC-NST800 Dual)",
        "shortDescription": "Cebeci Medikal CBC-NST800 Dual - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal Cebeci Medikal CBC-NST800 Dual 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-16",
    "slug": "pulse-oksimetre-cbc-po50",
    "categorySlug": "fizyolojik-sinyal-izleyiciler",
    "brand": "Cebeci Medikal",
    "model": "CBC-PO50 Handheld",
    "sku": "CBC-POX-050",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 16,
    "images": [
      "/images/products/pulse-oksimetre-1.webp"
    ],
    "technicalSpecs": {
      "Ölçüm Parametreleri": "SpO2 (Oksijen Doygunluğu), Nabız (PR), Pletismogram Dalgası, Perfüzyon İndeksi (PI)",
      "Ekran": "3.5 inç Renkli TFT LCD Ekran (Otomatik Döndürme Sensörlü)",
      "Prob Seçenekleri": "Yetişkin Parmak Tipi, Pediyatrik ve Yenidoğan Wrap Prob Desteği",
      "Alarmlar": "Sesli ve Görsel Çok Kademeli Limit Alarmları",
      "Batarya": "Şarj Edilebilir Li-Ion Batarya veya Standart AA Pil Desteği"
    },
    "applications": [
      "Acil Sağlık Ambulansları ve İlk Yardım",
      "Poliklinik Muayeneleri ve Evde Sağlık Hizmetleri",
      "Yataklı Servisler ve Hasta Transferi"
    ],
    "translations": {
      "tr": {
        "title": "El Tipi & Masaüstü Pulse Oksimetre (CBC-PO50)",
        "shortDescription": "Pletismogram dalgalı, perfüzyon indeksli ve yetişkin/bebek prob uyumlu el tipi pulse oksimetre.",
        "description": "CBC-PO50, taşınabilir ergonomik yapısıyla oksijen saturasyonu ve nabız takibinde yüksek doğruluk sağlar. Zayıf perfüzyon koşullarında bile kararlı ölçüm sunar."
      },
      "en": {
        "title": "Handheld Pulse Oximeter (CBC-PO50)",
        "shortDescription": "Portable pulse oximeter with SpO2 waveform, perfusion index, and neonatal probe support.",
        "description": "The CBC-PO50 offers fast and reliable SpO2 and pulse rate readings for clinical rounds, emergency transport, and outpatient monitoring."
      },
      "ar": {
        "title": "جهاز قياس نسبة الأكسجين المحمول (CBC-PO50)",
        "shortDescription": "جهاز قياس تشبع الأكسجين ونبضات القلب محمول باليد مع مجسات لجميع الأعمار.",
        "description": "يوفر CBC-PO50 قراءات سريعة ودقيقة لنسبة الأكسجين في الدم والنبض مع شاشة ملونة وتصميم محمول يلائم العمل الميداني والعيادات."
      },
      "de": {
        "title": "Hand-Pulsoximeter (CBC-PO50)",
        "shortDescription": "Kompaktes Handpulsoximeter mit Plethysmogramm und Zubehör für Erwachsene und Pädiatrie.",
        "description": "Das CBC-PO50 garantiert schnelle und zuverlässige SpO2- und Pulsfrequenzmessung auch bei schwacher Perfusion im mobilen und stationären Einsatz."
      },
      "ja": {
        "title": "Handheld Pulse Oximeter (CBC-PO50)",
        "shortDescription": "Cebeci Medikal CBC-PO50 Handheld - 高精度臨床診断・治療に対応した医療機器。",
        "description": "Cebeci Medikal CBC-PO50 Handheldは、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "Handheld Pulse Oximeter (CBC-PO50)",
        "shortDescription": "Cebeci Medikal CBC-PO50 Handheld - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal Cebeci Medikal CBC-PO50 Handheld 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-17",
    "slug": "klinik-santrifuj-cbc-cent4000",
    "categorySlug": "laboratuvar-cihazlari",
    "brand": "Cebeci Medikal",
    "model": "CBC-CENT4000",
    "sku": "CBC-LAB-400",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 17,
    "images": [
      "/images/products/santrifuj-1.webp"
    ],
    "technicalSpecs": {
      "Maksimum Hız": "4000 - 6000 RPM (Hassas Dijital Ayar)",
      "Rotor Kapasitesi": "12 x 15ml veya 24 x 10ml Tüp Kapasiteli Açılı/Salınımlı Rotor",
      "Maksimum RCF": "3500 x g Santrifüj Gücü",
      "Güvenlik": "Elektronik Kapak Emniyet Kilidi ve Dengesizlik (Imbalance) Sensörü",
      "Zamanlayıcı": "1 - 99 Dakika veya Sürekli Çalışma Modu"
    },
    "applications": [
      "Klinik Biyokimya ve Hematoloji Laboratuvarları",
      "Kan Merkezleri ve Serum Ayrıştırma",
      "Tıp Merkezleri ve Araştırma Laboratuvarları"
    ],
    "translations": {
      "tr": {
        "title": "Klinik Laboratuvar Santrifüj Cihazı (CBC-CENT4000)",
        "shortDescription": "6000 RPM dijital hızlı, elektronik kapak kilitli ve dengesizlik emniyetli klinik santrifüj.",
        "description": "CBC-CENT4000; kan, idrar ve biyolojik sıvıların hızlı ve etkin ayrıştırılması için yüksek torklu fırçasız motor teknolojisine sahiptir. Sessiz ve titreşimsiz çalışmasıyla laboratuvar verimliliğini artırır."
      },
      "en": {
        "title": "Clinical Laboratory Centrifuge (CBC-CENT4000)",
        "shortDescription": "Digital benchtop laboratory centrifuge with electronic lid lock and imbalance detection.",
        "description": "The CBC-CENT4000 delivers quiet and stable sample separation for biochemistry, hematology, and clinical diagnostics with high-speed brushless drive."
      },
      "ar": {
        "title": "جهاز الطرد المركزي للمختبرات (CBC-CENT4000)",
        "shortDescription": "جهاز طرد مركزي رقمي عالي السرعة حتى 6000 دورة/دقيقة مع قفل أمان إلكتروني.",
        "description": "يضمن CBC-CENT4000 فصلاً سريعاً ونقياً لعينات الدم والسوائل الحيوية مع محرك بدون فحمات لعمل هادئ وخالٍ من الاهتزاز في المختبرات الطبية."
      },
      "de": {
        "title": "Klinische Laborzentrifuge (CBC-CENT4000)",
        "shortDescription": "Digitale Tischzentrifuge bis 6000 U/min mit Unwuchterkennung und Sicherheitsverriegelung.",
        "description": "Die CBC-CENT4000 bietet zuverlässige Zentrifugation von Blut- und Urinproben mit bürstenlosem Motor für maximale Langlebigkeit im Labor."
      },
      "ja": {
        "title": "Clinical Laboratory Centrifuge (CBC-CENT4000)",
        "shortDescription": "Cebeci Medikal CBC-CENT4000 - 高精度臨床診断・治療に対応した医療機器。",
        "description": "Cebeci Medikal CBC-CENT4000は、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "Clinical Laboratory Centrifuge (CBC-CENT4000)",
        "shortDescription": "Cebeci Medikal CBC-CENT4000 - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal Cebeci Medikal CBC-CENT4000 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-18",
    "slug": "medikal-soguk-isik-kaynagi-cbc-light300",
    "categorySlug": "ameliyathane-cihazlari",
    "brand": "Cebeci Medikal",
    "model": "CBC-LIGHT300 LED",
    "sku": "CBC-LGT-300",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 18,
    "images": [
      "/images/products/isik-kaynagi-1.webp",
      "/images/products/isik-kaynagi-2.webp"
    ],
    "technicalSpecs": {
      "Işık Kaynağı Türü": "100 Watt Yüksek Şiddetli Medikal LED Modülü",
      "Renk Sıcaklığı": "5700K - 6500K Doğal Gün Işığı Dengesi",
      "Lamba Ömrü": "50.000 Saatin Üzerinde Bakım Gerektirmeyen LED Ömrü",
      "Adaptör Uyumu": "Storz, Olympus, Wolf ve ACMI Standart Fiber Optik Uç Desteği",
      "Parlaklık Ayarı": "Dijital Dokunmatik Kademesiz Parlaklık Kontrolü (%1 - %100)"
    },
    "applications": [
      "Laparoskopi ve Genel Cerrahi",
      "Artroskopi ve Eklem Muayeneleri",
      "Histeroskopi ve Sistoskopi",
      "KBB Endoskopik Muayeneleri"
    ],
    "translations": {
      "tr": {
        "title": "Medikal LED Soğuk Işık Kaynağı (CBC-LIGHT300 LED)",
        "shortDescription": "50.000 saat ömürlü, 100W güçlü LED teknolojili üniversal endoskopi soğuk ışık kaynağı.",
        "description": "CBC-LIGHT300, endoskopik ve laparoskopik cerrahide homojen ve yüksek parlaklıkta aydınlatma sağlar. Doğal gün ışığı renk spektrumu sayesinde cerrahi alandaki dokuların gerçek renklerinde görüntülenmesini garanti eder."
      },
      "en": {
        "title": "Medical LED Cold Light Source (CBC-LIGHT300 LED)",
        "shortDescription": "100W high-intensity surgical LED light source with 50,000-hour lifespan and universal adapter.",
        "description": "The CBC-LIGHT300 provides bright, daylight-quality illumination for endoscopic and laparoscopic procedures with low thermal emission and long-life LED technology."
      },
      "ar": {
        "title": "مصدر الضوء البارد الطبي LED (CBC-LIGHT300)",
        "shortDescription": "مصدر ضوء بارد قوي 100 واط لعمليات التنظير مع عمر تشغيلي يتجاوز 50,000 ساعة.",
        "description": "يمنح CBC-LIGHT300 إضاءة جراحية نقية ومتجانسة لعمليات المناظير مع توافق شامل لجميع كابلات الألياف الضوئية القياسية."
      },
      "de": {
        "title": "Medizinische LED-Kaltlichtquelle (CBC-LIGHT300)",
        "shortDescription": "100W LED-Lichtquelle für die Endoskopie mit 50.000 Stunden Lebensdauer und Storz/Wolf-Adapter.",
        "description": "Die CBC-LIGHT300 sorgt für brillante, tageslichtähnliche Ausleuchtung des Operationsfeldes bei minimaler Wärmeentwicklung."
      },
      "ja": {
        "title": "Medical LED Cold Light Source (CBC-LIGHT300 LED)",
        "shortDescription": "Cebeci Medikal CBC-LIGHT300 LED - 高精度臨床診断・治療に対応した医療機器。",
        "description": "Cebeci Medikal CBC-LIGHT300 LEDは、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "Medical LED Cold Light Source (CBC-LIGHT300 LED)",
        "shortDescription": "Cebeci Medikal CBC-LIGHT300 LED - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal Cebeci Medikal CBC-LIGHT300 LED 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-19",
    "slug": "masaustu-otoklav-sterilizator-cbc-auto24",
    "categorySlug": "laboratuvar-cihazlari",
    "brand": "Cebeci Medikal",
    "model": "CBC-AUTO24 Class B",
    "sku": "CBC-ST-024",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 19,
    "images": [
      "/images/products/otoklav-1.webp"
    ],
    "technicalSpecs": {
      "Sınıf": "EN 13060 Standardında B Sınıfı Medikal Otoklav",
      "Hazne Hacmi": "24 Litre Paslanmaz Çelik AISI 316 Hücre",
      "Sterilizasyon Sıcaklıkları": "121°C ve 134°C Hazır Medikal Programlar",
      "Vakum Sistemi": "Fraksiyonel 3 Aşamalı Ön Vakum ve Güçlü Kurutma Pompası",
      "Yazıcı & Kayıt": "Entegre Termal Rapor Yazıcısı ve USB Veri Kaydı"
    },
    "applications": [
      "Ağız ve Diş Sağlığı Merkezleri (ADSM) ve Klinikler",
      "Göz ve Günübirlik Cerrahi Merkezleri",
      "Poliklinikler ve Laboratuvarlar"
    ],
    "translations": {
      "tr": {
        "title": "B Sınıfı Masaüstü Otoklav & Sterilizatör (CBC-AUTO24)",
        "shortDescription": "24 Litre paslanmaz çelik hazneli, fraksiyonel ön vakumlu ve entegre yazıcılı B sınıfı otoklav.",
        "description": "CBC-AUTO24, cerrahi ve dental aletlerin sterilizasyonunda en katı Avrupa standartlarını karşılar. Delikli, gözenekli ve paketli aletlerde dahi tam sterilizasyon güvencesi sunar."
      },
      "en": {
        "title": "Class B Benchtop Autoclave Sterilizer (CBC-AUTO24)",
        "shortDescription": "24L stainless steel pre-vacuum Class B autoclave for surgical and dental sterilization.",
        "description": "The CBC-AUTO24 meets EN 13060 standards with fractionated pre-vacuum cycles, integrated thermal printout, and automated cycle verification."
      },
      "ar": {
        "title": "جهاز التعقيم بالبخار أوتوكلاف الفئة B (CBC-AUTO24)",
        "shortDescription": "أوتوكلاف طبي سعة 24 لتر مع نظام تفريغ الهواء الثلاثي وطباعة دورات التعقيم.",
        "description": "يلبي CBC-AUTO24 أعلى معايير التعقيم الأوروبية للأدوات الجراحية وأدوات طب الأسنان المجوفة والملفوفة بأمان تام."
      },
      "de": {
        "title": "Klasse B Tisch-Autoklav (CBC-AUTO24)",
        "shortDescription": "24-Liter Klasse B Dampfsterilisator mit fraktioniertem Vorvakuum und Protokolldrucker.",
        "description": "Der CBC-AUTO24 erfüllt die EN 13060 Norm für höchste Sterilisationssicherheit bei verpackten und hohlen Instrumenten in Praxis und Klinik."
      },
      "ja": {
        "title": "Class B Benchtop Autoclave Sterilizer (CBC-AUTO24)",
        "shortDescription": "Cebeci Medikal CBC-AUTO24 Class B - 高精度臨床診断・治療に対応した医療機器。",
        "description": "Cebeci Medikal CBC-AUTO24 Class Bは、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "Class B Benchtop Autoclave Sterilizer (CBC-AUTO24)",
        "shortDescription": "Cebeci Medikal CBC-AUTO24 Class B - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal Cebeci Medikal CBC-AUTO24 Class B 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-20",
    "slug": "motorlu-yogun-bakim-hasta-karyolasi-cbc-bed400",
    "categorySlug": "medikal-sarf-malzemeler",
    "brand": "Cebeci Medikal",
    "model": "CBC-BED400 ICU",
    "sku": "CBC-BED-400",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 20,
    "images": [
      "/images/products/hasta-karyolasi-1.webp"
    ],
    "technicalSpecs": {
      "Motor Sistemi": "4 Adet Sessiz Elektrikli Lineer / Kolon Motor (24V DC)",
      "Pozisyonlar": "Sırt Açısı, Ayak Açısı, Yükseklik Ayarı, Trendelenburg ve Ters Trendelenburg, Vasküler ve Kardiyak Pozisyon",
      "Acil Durum": "Mekanik ve Elektronik Hızlı CPR Kolu",
      "Korkuluklar": "4 Parça Entegre Kontrol Panelli Antibakteriyel ABS Korkuluk",
      "Taşıma Kapasitesi": "250 kg Güvenli Çalışma Yükü"
    },
    "applications": [
      "Yoğun Bakım Üniteleri (Erişkin ve KVC)",
      "Ameliyat Sonrası Bakım ve Yatan Hasta Katları",
      "Özel Hastane VIP Hasta Odaları"
    ],
    "translations": {
      "tr": {
        "title": "4 Motorlu Yoğun Bakım & Hasta Karyolası (CBC-BED400)",
        "shortDescription": "Kolon motorlu, Trendelenburg ve CPR özellikli antibakteriyel elektrikli yoğun bakım karyolası.",
        "description": "CBC-BED400 ICU; kritik hastaların pozisyonlandırılmasında ve hemşirelik bakımında maksimum ergonomi sunar. Sarsıntısız kolon motorları, tek tuşla CPR ve kardiyak sandalye pozisyonu ile hasta konforunu ve klinik güvenliği garanti eder."
      },
      "en": {
        "title": "4-Motor ICU Electric Hospital Bed (CBC-BED400)",
        "shortDescription": "Motorized intensive care bed with Trendelenburg, electronic CPR, and built-in attendant controls.",
        "description": "The CBC-BED400 provides ergonomic patient positioning with smooth column actuators, integrated safety side rails, and emergency CPR functionality."
      },
      "ar": {
        "title": "سرير العناية المركزة الكهربائي 4 محركات (CBC-BED400)",
        "shortDescription": "سرير طبي متطور للعناية المركزة مع وضعيات ترندلبورغ والإنعاش السريع وألواح تحكم مدمجة.",
        "description": "يوفر سرير CBC-BED400 أقصى درجات الراحة للمريض وسهولة التحكم للطاقم التمريضي مع بنية قوية ومحركات هادئة تدعم أوزان حتى 250 كجم."
      },
      "de": {
        "title": "4-Motoriges Intensivpflegebett (CBC-BED400)",
        "shortDescription": "Elektrisches Intensivbett mit Trendelenburg-Verstellung, CPR-Notabsenkung und integrierten Bedienelementen.",
        "description": "Das CBC-BED400 bietet erstklassige Positionierungsmöglichkeiten für Intensivpatienten mit ruckfreien Hubsäulen und robuster Konstruktion."
      },
      "ja": {
        "title": "4-Motor ICU Electric Hospital Bed (CBC-BED400)",
        "shortDescription": "Cebeci Medikal CBC-BED400 ICU - 高精度臨床診断・治療に対応した医療機器。",
        "description": "Cebeci Medikal CBC-BED400 ICUは、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "4-Motor ICU Electric Hospital Bed (CBC-BED400)",
        "shortDescription": "Cebeci Medikal CBC-BED400 ICU - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal Cebeci Medikal CBC-BED400 ICU 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-21",
    "slug": "hasta-isitma-sistemi-cbc-warm200",
    "categorySlug": "yogun-bakim-ve-yasam-destek",
    "brand": "Cebeci Medikal",
    "model": "CBC-WARM200",
    "sku": "CBC-WRM-200",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 21,
    "images": [
      "/images/products/hasta-isitma-1.webp"
    ],
    "technicalSpecs": {
      "Isıtma Teknolojisi": "Sıcak Hava Üflemeli ve Karbon Fiber Isıtma Battaniyesi Desteği",
      "Sıcaklık Ayar Kademeleri": "Oda Sıcaklığı, 32°C, 38°C, 43°C Hassas Termostatik Kontrol",
      "Filtreleme": "0.2 Mikron Yüksek Verimli Medikal HEPA Hava Filtresi",
      "Güvenlik": "Çift Bağımsız Aşırı Isınma Emniyet Sensörü ve Otomatik Kapanma"
    },
    "applications": [
      "Ameliyathane İntraoperatif Isıtma",
      "Ayılma Odaları (PACU) Postoperatif Bakım",
      "Yoğun Bakım ve Travma Hipotermi Yönetimi"
    ],
    "translations": {
      "tr": {
        "title": "Hasta Isıtma & Hipotermi Önleme Sistemi (CBC-WARM200)",
        "shortDescription": "HEPA filtreli, 4 kademe sıcaklık kontrollü ve hasta güvenliği onaylı hava üflemeli hasta ısıtma cihazı.",
        "description": "Cerrahi operasyonlar sırasında ve sonrasında hastanın vücut ısısının korunması iyileşme sürecini hızlandırır ve enfeksiyon riskini azaltır. CBC-WARM200, homojen hava dağılımı ve hassas sıcaklık kontrolü ile hipotermiyi etkin şekilde önler."
      },
      "en": {
        "title": "Forced-Air Patient Warming System (CBC-WARM200)",
        "shortDescription": "HEPA-filtered forced-air warming unit for perioperative and ICU hypothermia prevention.",
        "description": "The CBC-WARM200 maintains normothermia during and after surgical procedures with quiet air delivery, multiple temperature settings, and dual-sensor thermal safety."
      },
      "ar": {
        "title": "نظام تدفئة المرضى ومنع انخفاض الحرارة (CBC-WARM200)",
        "shortDescription": "جهاز تدفئة هوائي طبي مع فلتر HEPA للحفاظ على حرارة المرضى أثناء العمليات والعناية المشددة.",
        "description": "يمنع CBC-WARM200 هبوط درجة حرارة جسم المريض في غرف العمليات والإنعاش عبر تدفق هوائي دافئ متجانس وآمن تماماً."
      },
      "de": {
        "title": "Patientenwärmesystem (CBC-WARM200)",
        "shortDescription": "Gebläse-Wärmesystem mit HEPA-Filter zur perioperativen Hypothermie-Prävention.",
        "description": "Das CBC-WARM200 schützt Patienten vor Auskühlung während und nach chirurgischen Eingriffen durch präzise Temperaturregelung und leise Luftzirkulation."
      },
      "ja": {
        "title": "Forced-Air Patient Warming System (CBC-WARM200)",
        "shortDescription": "Cebeci Medikal CBC-WARM200 - 高精度臨床診断・治療に対応した医療機器。",
        "description": "Cebeci Medikal CBC-WARM200は、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "Forced-Air Patient Warming System (CBC-WARM200)",
        "shortDescription": "Cebeci Medikal CBC-WARM200 - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal Cebeci Medikal CBC-WARM200 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-22",
    "slug": "2-el-mindray-hastabasi-monitoru-revizyonlu",
    "categorySlug": "fizyolojik-sinyal-izleyiciler",
    "brand": "Mindray / Cebeci Revizyon",
    "model": "BeneView T5 / T8 Revizyonlu",
    "sku": "REF-MON-001",
    "condition": "SECOND_HAND",
    "featured": true,
    "sortOrder": 22,
    "images": [
      "/images/products/hastabasi-monitoru-6.webp",
      "/images/products/hastabasi-monitoru-7.webp",
      "/images/products/hastabasi-monitoru-8.webp"
    ],
    "technicalSpecs": {
      "Durum": "2. El - Cebeci Medikal Biyomedikal Testlerinden Geçmiş, 1 Yıl Garantili",
      "Testler": "Elektriksel Güvenlik Testi (IEC 62353), Kalibrasyon ve Akü Yenilemesi Tamamlandı",
      "Ekran": "12.1 inç Dokunmatik Renkli LCD",
      "Parametreler": "5 Derivasyon EKG, SpO2, NIBP, 2-Kanal Isı, Solunum",
      "Aksesuarlar": "Sıfır EKG Kablosu, Sıfır SpO2 Probu, Sıfır NIBP Manşonu ve Güç Kablosu Dahildir"
    },
    "applications": [
      "Özel Hastaneler ve Tıp Merkezleri",
      "Günübirlik Cerrahi ve Klinikler",
      "Veteriner Cerrahi ve Yoğun Bakım"
    ],
    "translations": {
      "tr": {
        "title": "Revizyonlu Hastabaşı Monitörü (1 Yıl Tam Garantili)",
        "shortDescription": "Tüm testleri ve kalibrasyonları yapılmış, sıfır aksesuarlarıyla 1 yıl garantili revizyonlu hastabaşı monitörü.",
        "description": "Cebeci Medikal uzman biyomedikal mühendisleri tarafından tüm fonksiyon testleri, kalibrasyonları ve batarya yenilemesi yapılmış 2. el garantili hastabaşı monitörü. Sıfır orijinal aksesuarları ve 1 yıl tam servis/parça garantisi ile satışa sunulmaktadır."
      },
      "en": {
        "title": "Refurbished Patient Monitor (1 Year Warranty)",
        "shortDescription": "Fully tested and calibrated patient monitor with brand-new accessories and 1-year warranty.",
        "description": "Biomedical certified pre-owned patient monitor. Passed full IEC 62353 electrical safety and calibration testing. Includes brand new patient cables and 12-month Cebeci Medikal warranty."
      },
      "ar": {
        "title": "شاشة مراقبة مرضى مجددة (ضمان شامل لمدة عام)",
        "shortDescription": "جهاز مراقبة مجدد ومفحوص طبياً مع كابلات جديدة وضمان كامل لمدة 12 شهراً.",
        "description": "جهاز مراقبة مرضى مستعمل تم تجديده بالكامل واختباره في مختبرات سبيجي ميديكال، مع بطارية جديدة وملحقات أصلية وضمان شامل."
      },
      "de": {
        "title": "Generalüberholter Patientenmonitor (1 Jahr Garantie)",
        "shortDescription": "Vollständig geprüfter und kalibrierter Monitor mit neuem Zubehör und 1 Jahr Garantie.",
        "description": "Fachmännisch gewarteter Gebrauchtmonitor mit neuer Sicherheitsprüfung (STK/MTK), neuen Patientenkabeln und 12 Monaten Vollgarantie."
      },
      "ja": {
        "title": "Refurbished Patient Monitor (1 Year Warranty)",
        "shortDescription": "Mindray / Cebeci Revizyon BeneView T5 / T8 Revizyonlu - 高精度臨床診断・治療に対応した医療機器。",
        "description": "Mindray / Cebeci Revizyon BeneView T5 / T8 Revizyonluは、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "Refurbished Patient Monitor (1 Year Warranty)",
        "shortDescription": "Mindray / Cebeci Revizyon BeneView T5 / T8 Revizyonlu - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal Mindray / Cebeci Revizyon BeneView T5 / T8 Revizyonlu 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-23",
    "slug": "2-el-drager-ventilator-revizyonlu",
    "categorySlug": "yogun-bakim-ve-yasam-destek",
    "brand": "Dräger / Cebeci Revizyon",
    "model": "Evita Serisi Revizyonlu",
    "sku": "REF-VNT-002",
    "condition": "SECOND_HAND",
    "featured": true,
    "sortOrder": 23,
    "images": [
      "/images/products/ventilator-4.webp",
      "/images/products/ventilator-5.webp"
    ],
    "technicalSpecs": {
      "Durum": "2. El - Biyomedikal Revizyonu ve O2 Sensörü Yenilenmiş, 1 Yıl Garantili",
      "Testler": "Pnömatik Kalibrasyon, Akciğer Simülatör Testleri ve Güvenlik Sertifikalandırması Tamamlandı",
      "Modlar": "IPPV, SIMV, BIPAP, CPAP/ASB",
      "Ekstra": "Yeni Solunum Devresi, Test Ciğeri ve Oksijen Hortumları Dahil"
    },
    "applications": [
      "Yoğun Bakım Üniteleri",
      "Solunum Tedavi Merkezleri",
      "Yedek ve Acil Durum Ventilatörü"
    ],
    "translations": {
      "tr": {
        "title": "Revizyonlu Yoğun Bakım Ventilatörü (1 Yıl Tam Garantili)",
        "shortDescription": "Oksijen hücresi ve filtreleri sıfırlanmış, kalibrasyon sertifikalı 2. el yoğun bakım mekanik ventilatörü.",
        "description": "Kapsamlı biyomedikal bakım ve kalibrasyon süreçlerinden geçmiş, O2 hücresi ve kritik valfleri sıfırlanmış garantili 2. el ventilatör cihazı. CE ve TSE standartlarında test raporu ile teslim edilir."
      },
      "en": {
        "title": "Refurbished Intensive Care Ventilator (1 Year Warranty)",
        "shortDescription": "Certified pre-owned mechanical ventilator with new O2 cell and 1-year Cebeci warranty.",
        "description": "Thoroughly tested and calibrated ICU ventilator. Includes new oxygen sensor, patient tubing, test lung, and 1-year comprehensive parts and service guarantee."
      },
      "ar": {
        "title": "جهاز تنفس اصطناعي مجدد للعناية المركزة (ضمان عام)",
        "shortDescription": "جهاز تنفس مجدد مع مستشعر أكسجين جديد واختبارات كفاءة معتمدة وضمان لمدة عام.",
        "description": "جهاز تنفس اصطناعي مستعمل خضع لعملية تجديد شاملة ومعايرة دقيقة في مختبراتنا، مع شهادة اختبار الأمان وضمان لمدة 12 شهراً."
      },
      "de": {
        "title": "Generalüberholtes Intensivbeatmungsgerät (1 Jahr Garantie)",
        "shortDescription": "Geprüftes Gebraucht-Beatmungsgerät mit neuem O2-Sensor und 12 Monaten Garantie.",
        "description": "Vollständig rezertifiziertes Intensivbeatmungsgerät mit erneuerten Verschleißteilen, STK-Protokoll und umfassender Garantie."
      },
      "ja": {
        "title": "Refurbished Intensive Care Ventilator (1 Year Warranty)",
        "shortDescription": "Dräger / Cebeci Revizyon Evita Serisi Revizyonlu - 高精度臨床診断・治療に対応した医療機器。",
        "description": "Dräger / Cebeci Revizyon Evita Serisi Revizyonluは、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "Refurbished Intensive Care Ventilator (1 Year Warranty)",
        "shortDescription": "Dräger / Cebeci Revizyon Evita Serisi Revizyonlu - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal Dräger / Cebeci Revizyon Evita Serisi Revizyonlu 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-24",
    "slug": "2-el-defibrilator-revizyonlu",
    "categorySlug": "yogun-bakim-ve-yasam-destek",
    "brand": "Nihon Kohden / Cebeci Revizyon",
    "model": "TEC Serisi Revizyonlu",
    "sku": "REF-DEF-003",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 24,
    "images": [
      "/images/products/defibrilator-2.webp",
      "/images/products/defibrilator-3.webp"
    ],
    "technicalSpecs": {
      "Durum": "2. El - Batarya Yenilenmiş, Defibrilasyon ve Güvenlik Testlerinden Geçmiş, 1 Yıl Garantili",
      "Enerji": "Bifazik 1–360 Joule, Şarj Süresi <3 saniye",
      "Testler": "IEC 62353 Elektriksel Güvenlik, Defibrilasyon Doğruluk Testi ve Kalibrasyon Tamamlanmıştır"
    },
    "applications": [
      "Acil Servisler",
      "Yoğun Bakım Üniteleri",
      "Ambulans ve 112 Servisleri"
    ],
    "translations": {
      "tr": {
        "title": "Revizyonlu Bifazik Defibrilatör (1 Yıl Garantili)",
        "shortDescription": "Bataryası ve paddle'ları sıfırlanmış, test sertifikalı 2. el garantili bifazik defibrilatör.",
        "description": "Cebeci Medikal tarafından batarya yenilemesi, elektrot değişimi ve tam kalibrasyon sürecinden geçirilmiş 2. el defibrilatör. 1 yıl parça ve servis garantisi ile teslim edilir."
      },
      "en": {
        "title": "Refurbished Biphasic Defibrillator (1 Year Warranty)",
        "shortDescription": "Certified pre-owned defibrillator with new battery and paddles.",
        "description": "Fully tested and calibrated biphasic defibrillator with renewed battery pack, new electrodes, and 12-month Cebeci Medikal warranty."
      },
      "ar": {
        "title": "جهاز صدمات كهربائية مجدد (ضمان عام)",
        "shortDescription": "جهاز صدمات مجدد مع بطارية جديدة وأقطاب كهربائية.",
        "description": "جهاز صدمات ثنائي الطور مجدد بالكامل ومعاير مع ضمان لمدة 12 شهراً."
      },
      "de": {
        "title": "Generalüberholter Defibrillator (1 Jahr Garantie)",
        "shortDescription": "Geprüfter Gebraucht-Defibrillator mit neuer Batterie und 12 Monaten Garantie.",
        "description": "Vollständig rezertifizierter Biphasischer Defibrillator mit erneuertem Akkupack und umfassender Garantie."
      },
      "ja": {
        "title": "Refurbished Biphasic Defibrillator (1 Year Warranty)",
        "shortDescription": "Nihon Kohden / Cebeci Revizyon TEC Serisi Revizyonlu - 高精度臨床診断・治療に対応した医療機器。",
        "description": "Nihon Kohden / Cebeci Revizyon TEC Serisi Revizyonluは、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "Refurbished Biphasic Defibrillator (1 Year Warranty)",
        "shortDescription": "Nihon Kohden / Cebeci Revizyon TEC Serisi Revizyonlu - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal Nihon Kohden / Cebeci Revizyon TEC Serisi Revizyonlu 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-25",
    "slug": "2-el-infuzyon-pompasi-revizyonlu",
    "categorySlug": "yogun-bakim-ve-yasam-destek",
    "brand": "B.Braun / Cebeci Revizyon",
    "model": "Infusomat Space Revizyonlu",
    "sku": "REF-INF-004",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 25,
    "images": [
      "/images/products/infuzyon-pompasi-1.webp"
    ],
    "technicalSpecs": {
      "Durum": "2. El - Mekanik ve Elektronik Bakımı Tamamlanmış, Kalibrasyon Sertifikalı, 1 Yıl Garantili",
      "Debi Aralığı": "0.1 – 1200 ml/saat",
      "Oklüzyon Alarmı": "Ayarlanabilir oklüzyon basınç algılama"
    },
    "applications": [
      "Yoğun Bakım",
      "Servis İçi İnfüzyon",
      "Onkoloji ve Kemoterapi"
    ],
    "translations": {
      "tr": {
        "title": "Revizyonlu Volumetrik İnfüzyon Pompası (1 Yıl Garantili)",
        "shortDescription": "Bakımı ve kalibrasyonu yapılmış, test raporlu 2. el garantili infüzyon pompası.",
        "description": "Valfler ve sensörleri yenilenmiş, tam fonksiyonel test ve kalibrasyonu tamamlanmış 2. el infüzyon pompası. 1 yıl Cebeci Medikal garantisi ile sunulmaktadır."
      },
      "en": {
        "title": "Refurbished Volumetric Infusion Pump (1 Year Warranty)",
        "shortDescription": "Calibrated pre-owned infusion pump with renewed valves and sensors.",
        "description": "Certified refurbished infusion pump with full functional testing and 12-month warranty."
      },
      "ar": {
        "title": "مضخة تسريب مجددة (ضمان عام)",
        "shortDescription": "مضخة تسريب مجددة ومعايرة مع ضمان شامل.",
        "description": "مضخة تسريب مستعملة تم تجديدها بالكامل مع صمامات جديدة وضمان لمدة 12 شهراً."
      },
      "de": {
        "title": "Generalüberholte Infusionspumpe (1 Jahr Garantie)",
        "shortDescription": "Kalibrierte Gebraucht-Infusionspumpe mit erneuerten Ventilen.",
        "description": "Vollständig getestete und kalibrierte Infusionspumpe mit 12 Monaten Garantie."
      },
      "ja": {
        "title": "Refurbished Volumetric Infusion Pump (1 Year Warranty)",
        "shortDescription": "B.Braun / Cebeci Revizyon Infusomat Space Revizyonlu - 高精度臨床診断・治療に対応した医療機器。",
        "description": "B.Braun / Cebeci Revizyon Infusomat Space Revizyonluは、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "Refurbished Volumetric Infusion Pump (1 Year Warranty)",
        "shortDescription": "B.Braun / Cebeci Revizyon Infusomat Space Revizyonlu - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal B.Braun / Cebeci Revizyon Infusomat Space Revizyonlu 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-26",
    "slug": "2-el-enjektor-pompasi-revizyonlu",
    "categorySlug": "yogun-bakim-ve-yasam-destek",
    "brand": "Fresenius Kabi / Cebeci Revizyon",
    "model": "Agilia SP Revizyonlu",
    "sku": "REF-ENJ-005",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 26,
    "images": [
      "/images/products/enjektor-pompasi-1.webp",
      "/images/products/enjektor-pompasi-2.webp"
    ],
    "technicalSpecs": {
      "Durum": "2. El - Mekanik Sıkıştırma Parçaları Yenilenmiş, 1 Yıl Garantili",
      "Debi Aralığı": "0.01 – 99.9 ml/saat",
      "Uyumlu Şırıngalar": "5 ml, 10 ml, 20 ml, 50 ml"
    },
    "applications": [
      "Yoğun Bakım Sedasyonu",
      "Yenidoğan İlaç İnfüzyonu",
      "Acil Müdahale"
    ],
    "translations": {
      "tr": {
        "title": "Revizyonlu Enjektör (Perfüzör) Pompası (1 Yıl Garantili)",
        "shortDescription": "Sıkıştırma mekanizması yenilenmiş, test sertifikalı 2. el enjektör pompası.",
        "description": "Cebeci Medikal biyomedikal laboratuvarında tam bakımı ve kalibrasyonu yapılmış 2. el enjektör pompası. Yeni sıkıştırma parçaları ve 1 yıl garanti ile sunulmaktadır."
      },
      "en": {
        "title": "Refurbished Syringe Pump (1 Year Warranty)",
        "shortDescription": "Certified pre-owned syringe pump with renewed mechanism.",
        "description": "Fully serviced syringe pump with new drive mechanism and 12-month warranty."
      },
      "ar": {
        "title": "مضخة حقن مجددة (ضمان عام)",
        "shortDescription": "مضخة حقن مجددة مع آلية ضغط جديدة.",
        "description": "مضخة حقن مجددة بالكامل مع ضمان 12 شهراً."
      },
      "de": {
        "title": "Generalüberholte Spritzenpumpe (1 Jahr Garantie)",
        "shortDescription": "Kalibrierte Gebraucht-Spritzenpumpe mit erneuerten Teilen.",
        "description": "Vollständig getestete Spritzenpumpe mit 12 Monaten Garantie."
      },
      "ja": {
        "title": "Refurbished Syringe Pump (1 Year Warranty)",
        "shortDescription": "Fresenius Kabi / Cebeci Revizyon Agilia SP Revizyonlu - 高精度臨床診断・治療に対応した医療機器。",
        "description": "Fresenius Kabi / Cebeci Revizyon Agilia SP Revizyonluは、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "Refurbished Syringe Pump (1 Year Warranty)",
        "shortDescription": "Fresenius Kabi / Cebeci Revizyon Agilia SP Revizyonlu - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal Fresenius Kabi / Cebeci Revizyon Agilia SP Revizyonlu 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-27",
    "slug": "2-el-pulse-oksimetre-revizyonlu",
    "categorySlug": "fizyolojik-sinyal-izleyiciler",
    "brand": "Nellcor / Cebeci Revizyon",
    "model": "PM10N Revizyonlu",
    "sku": "REF-OKS-006",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 27,
    "images": [
      "/images/products/pulse-oksimetre-1.webp"
    ],
    "technicalSpecs": {
      "Durum": "2. El - Sensör Yenilenmiş, Kalibrasyon Tamamlanmış, 1 Yıl Garantili",
      "Ölçüm": "SpO2 (%0-100) ve Nabız (20-300 bpm)"
    },
    "applications": [
      "Klinikler ve Muayenehaneler",
      "Evde Bakım Hizmetleri",
      "Ambulans Servisleri"
    ],
    "translations": {
      "tr": {
        "title": "Revizyonlu Pulse Oksimetre (1 Yıl Garantili)",
        "shortDescription": "Sensörü sıfırlanmış, kalibrasyon sertifikalı 2. el pulse oksimetre.",
        "description": "Yeni SpO2 probu ve batarya ile tam kalibrasyon kontrolünden geçmiş 2. el pulse oksimetre. 1 yıl garanti dahildir."
      },
      "en": {
        "title": "Refurbished Pulse Oximeter (1 Year Warranty)",
        "shortDescription": "Calibrated pre-owned pulse oximeter with new sensor probe.",
        "description": "Certified refurbished pulse oximeter with renewed SpO2 probe and 12-month warranty."
      },
      "ar": {
        "title": "جهاز قياس أكسجين مجدد (ضمان عام)",
        "shortDescription": "جهاز قياس نسبة الأكسجين مجدد مع حساس جديد.",
        "description": "جهاز قياس أكسجين مجدد بالكامل مع ضمان 12 شهراً."
      },
      "de": {
        "title": "Generalüberholtes Pulsoximeter (1 Jahr Garantie)",
        "shortDescription": "Kalibriertes Gebraucht-Pulsoximeter mit neuem Sensor.",
        "description": "Vollständig getestetes Pulsoximeter mit 12 Monaten Garantie."
      },
      "ja": {
        "title": "Refurbished Pulse Oximeter (1 Year Warranty)",
        "shortDescription": "Nellcor / Cebeci Revizyon PM10N Revizyonlu - 高精度臨床診断・治療に対応した医療機器。",
        "description": "Nellcor / Cebeci Revizyon PM10N Revizyonluは、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "Refurbished Pulse Oximeter (1 Year Warranty)",
        "shortDescription": "Nellcor / Cebeci Revizyon PM10N Revizyonlu - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal Nellcor / Cebeci Revizyon PM10N Revizyonlu 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-28",
    "slug": "2-el-anestezi-cihazi-revizyonlu",
    "categorySlug": "ameliyathane-cihazlari",
    "brand": "Dräger / Cebeci Revizyon",
    "model": "Fabius Serisi Revizyonlu",
    "sku": "REF-ANS-007",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 28,
    "images": [
      "/images/products/anestezi-cihazi-2.webp",
      "/images/products/anestezi-cihazi-3.webp"
    ],
    "technicalSpecs": {
      "Durum": "2. El - Vaporizatörler Kalibre Edilmiş, Solunum Devreleri Sıfırlanmış, 1 Yıl Garantili",
      "Testler": "Gaz Kaçağı Testi, Mekanik Ventilatör Testi ve Güvenlik Sertifikalandırması Tamamlanmış",
      "Anesteztik Ajanlar": "Sevofluran, Desfluran, İzofluran uyumlu"
    },
    "applications": [
      "Ameliyathaneler",
      "Günübirlik Cerrahi Merkezleri",
      "Yedek Anestezi İstasyonu"
    ],
    "translations": {
      "tr": {
        "title": "Revizyonlu Anestezi Cihazı (1 Yıl Garantili)",
        "shortDescription": "Vaporizatörleri kalibre edilmiş, kaçak testlerinden geçmiş 2. el garantili anestezi cihazı.",
        "description": "Kapsamlı biyomedikal bakımdan geçmiş, vaporizatör kalibrasyonu, gaz kaçak testi ve mekanik ventilatör doğrulaması yapılmış 2. el anestezi iş istasyonu. 1 yıl garanti ile sunulur."
      },
      "en": {
        "title": "Refurbished Anesthesia Machine (1 Year Warranty)",
        "shortDescription": "Calibrated pre-owned anesthesia workstation with tested vaporizers.",
        "description": "Certified refurbished anesthesia system with calibrated vaporizers, leak-tested circuits, and 12-month warranty."
      },
      "ar": {
        "title": "جهاز تخدير مجدد (ضمان عام)",
        "shortDescription": "جهاز تخدير مجدد مع مبخرات معايرة.",
        "description": "جهاز تخدير مجدد بالكامل مع ضمان 12 شهراً."
      },
      "de": {
        "title": "Generalüberholte Anästhesiemaschine (1 Jahr Garantie)",
        "shortDescription": "Kalibrierte Gebraucht-Anästhesieanlage mit geprüften Vaporizern.",
        "description": "Vollständig rezertifizierte Anästhesie-Arbeitsstation mit 12 Monaten Garantie."
      },
      "ja": {
        "title": "Refurbished Anesthesia Machine (1 Year Warranty)",
        "shortDescription": "Dräger / Cebeci Revizyon Fabius Serisi Revizyonlu - 高精度臨床診断・治療に対応した医療機器。",
        "description": "Dräger / Cebeci Revizyon Fabius Serisi Revizyonluは、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "Refurbished Anesthesia Machine (1 Year Warranty)",
        "shortDescription": "Dräger / Cebeci Revizyon Fabius Serisi Revizyonlu - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal Dräger / Cebeci Revizyon Fabius Serisi Revizyonlu 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-29",
    "slug": "2-el-endovizyon-sistemi-revizyonlu",
    "categorySlug": "endovizyon-sistemleri",
    "brand": "Karl Storz / Cebeci Revizyon",
    "model": "Image 1 HD Revizyonlu",
    "sku": "REF-END-008",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 29,
    "images": [
      "/images/products/endovizyon-sistemi-1.webp"
    ],
    "technicalSpecs": {
      "Durum": "2. El - Kamera Başlığı ve Işık Kaynağı Test Edilmiş, 1 Yıl Garantili",
      "Çözünürlük": "Full HD 1080p"
    },
    "applications": [
      "Laparoskopik Cerrahi",
      "Endoskopi Üniteleri",
      "Üroloji ve Jinekoloji"
    ],
    "translations": {
      "tr": {
        "title": "Revizyonlu Endovizyon Kamera Sistemi (1 Yıl Garantili)",
        "shortDescription": "Kamera başlığı ve ışık kaynağı test edilmiş, 2. el garantili endovizyon sistemi.",
        "description": "Optik kalite kontrolünden geçmiş, kamera başlığı ve soğuk ışık kaynağı fonksiyonel testleri tamamlanmış 2. el endovizyon sistemi. 1 yıl garanti dahildir."
      },
      "en": {
        "title": "Refurbished Endovision Camera System (1 Year Warranty)",
        "shortDescription": "Tested pre-owned HD endoscopy camera system with light source.",
        "description": "Certified refurbished endovision system with quality-checked optics and 12-month warranty."
      },
      "ar": {
        "title": "نظام كاميرا تنظير مجدد (ضمان عام)",
        "shortDescription": "نظام كاميرا تنظير مجدد مع مصدر ضوء.",
        "description": "نظام تنظير مجدد بالكامل مع ضمان 12 شهراً."
      },
      "de": {
        "title": "Generalüberholtes Endovisionssystem (1 Jahr Garantie)",
        "shortDescription": "Geprüftes Gebraucht-Endoskopie-Kamerasystem.",
        "description": "Vollständig getestetes HD-Endoskopie-System mit 12 Monaten Garantie."
      },
      "ja": {
        "title": "Refurbished Endovision Camera System (1 Year Warranty)",
        "shortDescription": "Karl Storz / Cebeci Revizyon Image 1 HD Revizyonlu - 高精度臨床診断・治療に対応した医療機器。",
        "description": "Karl Storz / Cebeci Revizyon Image 1 HD Revizyonluは、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "Refurbished Endovision Camera System (1 Year Warranty)",
        "shortDescription": "Karl Storz / Cebeci Revizyon Image 1 HD Revizyonlu - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal Karl Storz / Cebeci Revizyon Image 1 HD Revizyonlu 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-30",
    "slug": "2-el-elektrokoter-revizyonlu",
    "categorySlug": "ameliyathane-cihazlari",
    "brand": "Erbe / Cebeci Revizyon",
    "model": "VIO Serisi Revizyonlu",
    "sku": "REF-KOT-009",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 30,
    "images": [
      "/images/products/elektrokoter-1.webp"
    ],
    "technicalSpecs": {
      "Durum": "2. El - Çıkış Gücü ve Topraklama Kontrolleri Yapılmış, 1 Yıl Garantili",
      "Modlar": "Monopolar Kesme/Koagülasyon, Bipolar"
    },
    "applications": [
      "Genel Cerrahi",
      "Ortopedi",
      "Plastik Cerrahi"
    ],
    "translations": {
      "tr": {
        "title": "Revizyonlu Elektrocerrahi Koter Ünitesi (1 Yıl Garantili)",
        "shortDescription": "Çıkış gücü ve güvenlik testlerinden geçmiş, 2. el garantili elektrokoter.",
        "description": "Monopolar/bipolar çıkış kalibrasyonu ve topraklama güvenlik testi tamamlanmış 2. el elektrokoter ünitesi. 1 yıl garanti ile sunulmaktadır."
      },
      "en": {
        "title": "Refurbished Electrosurgical Unit (1 Year Warranty)",
        "shortDescription": "Calibrated pre-owned ESU with tested outputs.",
        "description": "Certified refurbished electrosurgical unit with calibrated monopolar/bipolar outputs and 12-month warranty."
      },
      "ar": {
        "title": "وحدة كي جراحي مجددة (ضمان عام)",
        "shortDescription": "وحدة كي جراحي مجددة ومعايرة.",
        "description": "وحدة كي كهربائي مجددة بالكامل مع ضمان 12 شهراً."
      },
      "de": {
        "title": "Generalüberholtes Elektrochirurgiegerät (1 Jahr Garantie)",
        "shortDescription": "Kalibriertes Gebraucht-HF-Chirurgiegerät.",
        "description": "Vollständig getestete Koagulations-/Schneideeinheit mit 12 Monaten Garantie."
      },
      "ja": {
        "title": "Refurbished Electrosurgical Unit (1 Year Warranty)",
        "shortDescription": "Erbe / Cebeci Revizyon VIO Serisi Revizyonlu - 高精度臨床診断・治療に対応した医療機器。",
        "description": "Erbe / Cebeci Revizyon VIO Serisi Revizyonluは、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "Refurbished Electrosurgical Unit (1 Year Warranty)",
        "shortDescription": "Erbe / Cebeci Revizyon VIO Serisi Revizyonlu - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal Erbe / Cebeci Revizyon VIO Serisi Revizyonlu 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-31",
    "slug": "2-el-kan-gazi-analizoru-revizyonlu",
    "categorySlug": "laboratuvar-cihazlari",
    "brand": "Siemens / Cebeci Revizyon",
    "model": "RAPIDPoint Revizyonlu",
    "sku": "REF-BGA-010",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 31,
    "images": [
      "/images/products/kan-gazi-analizoru-1.webp",
      "/images/products/kan-gazi-analizoru-2.webp"
    ],
    "technicalSpecs": {
      "Durum": "2. El - Elektrotlar Yenilenmiş, Kalibrasyon Sertifikalı, 1 Yıl Garantili",
      "Ölçüm": "pH, pCO2, pO2, Na+, K+, Ca++, Cl-, Glukoz, Laktat, Hct"
    },
    "applications": [
      "Acil Servis Laboratuvarı",
      "Yoğun Bakım POCT",
      "Ameliyathane"
    ],
    "translations": {
      "tr": {
        "title": "Revizyonlu Kan Gazı Analizörü (1 Yıl Garantili)",
        "shortDescription": "Elektrotları yenilenmiş, kalibrasyon sertifikalı 2. el garantili kan gazı analizörü.",
        "description": "Sensör modülleri ve elektrotları yenilenmiş, dahili kalibrasyon doğrulaması tamamlanmış 2. el kan gazı analizörü. 1 yıl garanti dahildir."
      },
      "en": {
        "title": "Refurbished Blood Gas Analyzer (1 Year Warranty)",
        "shortDescription": "Certified pre-owned blood gas analyzer with renewed electrodes.",
        "description": "Fully reconditioned blood gas analyzer with new sensor modules and 12-month warranty."
      },
      "ar": {
        "title": "جهاز تحليل غازات الدم مجدد (ضمان عام)",
        "shortDescription": "جهاز تحليل غازات دم مجدد مع أقطاب جديدة.",
        "description": "جهاز تحليل غازات الدم مجدد بالكامل مع ضمان 12 شهراً."
      },
      "de": {
        "title": "Generalüberholter Blutgasanalysator (1 Jahr Garantie)",
        "shortDescription": "Kalibriertes Gebraucht-BGA mit erneuerten Elektroden.",
        "description": "Vollständig getesteter Blutgasanalysator mit 12 Monaten Garantie."
      },
      "ja": {
        "title": "Refurbished Blood Gas Analyzer (1 Year Warranty)",
        "shortDescription": "Siemens / Cebeci Revizyon RAPIDPoint Revizyonlu - 高精度臨床診断・治療に対応した医療機器。",
        "description": "Siemens / Cebeci Revizyon RAPIDPoint Revizyonluは、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "Refurbished Blood Gas Analyzer (1 Year Warranty)",
        "shortDescription": "Siemens / Cebeci Revizyon RAPIDPoint Revizyonlu - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal Siemens / Cebeci Revizyon RAPIDPoint Revizyonlu 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-32",
    "slug": "2-el-ekg-cihazi-revizyonlu",
    "categorySlug": "fizyolojik-sinyal-izleyiciler",
    "brand": "Nihon Kohden / Cebeci Revizyon",
    "model": "ECG-2350 Revizyonlu",
    "sku": "REF-EKG-011",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 32,
    "images": [
      "/images/products/ekg-cihazi-1.webp",
      "/images/products/ekg-cihazi-2.webp"
    ],
    "technicalSpecs": {
      "Durum": "2. El - Termal Yazıcı ve Elektrot Kabloları Yenilenmiş, 1 Yıl Garantili",
      "Kanal": "12 Kanallı otomatik yorumlama"
    },
    "applications": [
      "Kardiyoloji Poliklinikleri",
      "Acil Servis",
      "Periyodik Sağlık Taramaları"
    ],
    "translations": {
      "tr": {
        "title": "Revizyonlu 12 Kanallı EKG Cihazı (1 Yıl Garantili)",
        "shortDescription": "Yazıcısı ve kabloları sıfırlanmış, 2. el garantili EKG cihazı.",
        "description": "Termal yazıcı ünitesi ve hasta kabloları yenilenmiş, sinyal kalitesi ve ölçüm doğruluğu test edilmiş 2. el EKG cihazı. 1 yıl garanti ile sunulmaktadır."
      },
      "en": {
        "title": "Refurbished 12-Lead ECG Machine (1 Year Warranty)",
        "shortDescription": "Certified pre-owned ECG machine with new printer and cables.",
        "description": "Fully tested 12-lead ECG with renewed thermal printer and patient cables. 12-month warranty included."
      },
      "ar": {
        "title": "جهاز تخطيط قلب مجدد (ضمان عام)",
        "shortDescription": "جهاز تخطيط قلب مجدد مع طابعة وكابلات جديدة.",
        "description": "جهاز تخطيط قلب 12 قناة مجدد بالكامل مع ضمان 12 شهراً."
      },
      "de": {
        "title": "Generalüberholtes 12-Kanal-EKG (1 Jahr Garantie)",
        "shortDescription": "Kalibriertes Gebraucht-EKG mit neuem Drucker.",
        "description": "Vollständig getestetes 12-Kanal-EKG mit 12 Monaten Garantie."
      },
      "ja": {
        "title": "Refurbished 12-Lead ECG Machine (1 Year Warranty)",
        "shortDescription": "Nihon Kohden / Cebeci Revizyon ECG-2350 Revizyonlu - 高精度臨床診断・治療に対応した医療機器。",
        "description": "Nihon Kohden / Cebeci Revizyon ECG-2350 Revizyonluは、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "Refurbished 12-Lead ECG Machine (1 Year Warranty)",
        "shortDescription": "Nihon Kohden / Cebeci Revizyon ECG-2350 Revizyonlu - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal Nihon Kohden / Cebeci Revizyon ECG-2350 Revizyonlu 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-33",
    "slug": "2-el-nst-fetal-monitor-revizyonlu",
    "categorySlug": "fizyolojik-sinyal-izleyiciler",
    "brand": "Edan / Cebeci Revizyon",
    "model": "F9 Express Revizyonlu",
    "sku": "REF-NST-012",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 33,
    "images": [
      "/images/products/nst-fetal-monitor-1.webp"
    ],
    "technicalSpecs": {
      "Durum": "2. El - Ultrasonik Transdüserler Yenilenmiş, 1 Yıl Garantili",
      "Kanal": "İkiz takibi (Dual FHR)"
    },
    "applications": [
      "Kadın Doğum Servisleri",
      "Perinatoloji Klinikleri",
      "Doğumhane"
    ],
    "translations": {
      "tr": {
        "title": "Revizyonlu NST Fetal Monitör (1 Yıl Garantili)",
        "shortDescription": "Transdüserleri sıfırlanmış, kalibrasyon sertifikalı 2. el NST cihazı.",
        "description": "Ultrasonik FHR transdüserleri ve TOCO sensörü yenilenmiş, ikiz takibi destekli 2. el fetal monitör. 1 yıl garanti dahildir."
      },
      "en": {
        "title": "Refurbished NST Fetal Monitor (1 Year Warranty)",
        "shortDescription": "Certified pre-owned fetal monitor with new transducers.",
        "description": "Fully tested NST fetal monitor with renewed ultrasonic transducers and 12-month warranty."
      },
      "ar": {
        "title": "جهاز مراقبة الجنين مجدد (ضمان عام)",
        "shortDescription": "جهاز NST مجدد مع محولات جديدة.",
        "description": "جهاز مراقبة جنين مجدد بالكامل مع ضمان 12 شهراً."
      },
      "de": {
        "title": "Generalüberholter Fetalmonitor (1 Jahr Garantie)",
        "shortDescription": "Kalibrierter Gebraucht-CTG mit erneuerten Sensoren.",
        "description": "Vollständig getesteter Fetalmonitor mit 12 Monaten Garantie."
      },
      "ja": {
        "title": "Refurbished NST Fetal Monitor (1 Year Warranty)",
        "shortDescription": "Edan / Cebeci Revizyon F9 Express Revizyonlu - 高精度臨床診断・治療に対応した医療機器。",
        "description": "Edan / Cebeci Revizyon F9 Express Revizyonluは、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "Refurbished NST Fetal Monitor (1 Year Warranty)",
        "shortDescription": "Edan / Cebeci Revizyon F9 Express Revizyonlu - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal Edan / Cebeci Revizyon F9 Express Revizyonlu 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-34",
    "slug": "2-el-ultrason-revizyonlu",
    "categorySlug": "endovizyon-sistemleri",
    "brand": "Mindray / Cebeci Revizyon",
    "model": "DC Serisi Revizyonlu",
    "sku": "REF-USG-013",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 34,
    "images": [
      "/images/products/ultrason-2.webp",
      "/images/products/ultrason-3.webp"
    ],
    "technicalSpecs": {
      "Durum": "2. El - Prob Kontrolleri ve Kalibrasyon Tamamlanmış, 1 Yıl Garantili",
      "Modlar": "B, B/B, B/M, M, PW Doppler, Renkli Doppler"
    },
    "applications": [
      "Radyoloji",
      "Kadın Doğum",
      "Acil Ultrason (FAST)"
    ],
    "translations": {
      "tr": {
        "title": "Revizyonlu Renkli Doppler Ultrason Cihazı (1 Yıl Garantili)",
        "shortDescription": "Probları kontrol edilmiş, 2. el garantili renkli Doppler ultrasonografi cihazı.",
        "description": "Prob kalite kontrolü, görüntü kalibrasyonu ve Doppler doğrulama testleri tamamlanmış 2. el ultrason cihazı. 1 yıl garanti ile sunulmaktadır."
      },
      "en": {
        "title": "Refurbished Color Doppler Ultrasound (1 Year Warranty)",
        "shortDescription": "Certified pre-owned ultrasound with tested probes.",
        "description": "Fully tested color Doppler ultrasound with calibrated imaging and 12-month warranty."
      },
      "ar": {
        "title": "جهاز موجات فوق صوتية مجدد (ضمان عام)",
        "shortDescription": "جهاز دوبلر ملون مجدد مع مجسات مفحوصة.",
        "description": "جهاز أمواج فوق صوتية مجدد بالكامل مع ضمان 12 شهراً."
      },
      "de": {
        "title": "Generalüberholter Farbdoppler-Ultraschall (1 Jahr Garantie)",
        "shortDescription": "Geprüftes Gebraucht-Ultraschallgerät mit getesteten Sonden.",
        "description": "Vollständig kalibriertes Farbdoppler-Gerät mit 12 Monaten Garantie."
      },
      "ja": {
        "title": "Refurbished Color Doppler Ultrasound (1 Year Warranty)",
        "shortDescription": "Mindray / Cebeci Revizyon DC Serisi Revizyonlu - 高精度臨床診断・治療に対応した医療機器。",
        "description": "Mindray / Cebeci Revizyon DC Serisi Revizyonluは、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "Refurbished Color Doppler Ultrasound (1 Year Warranty)",
        "shortDescription": "Mindray / Cebeci Revizyon DC Serisi Revizyonlu - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal Mindray / Cebeci Revizyon DC Serisi Revizyonlu 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-35",
    "slug": "2-el-otoklav-revizyonlu",
    "categorySlug": "laboratuvar-cihazlari",
    "brand": "Melag / Cebeci Revizyon",
    "model": "Euroklav Revizyonlu",
    "sku": "REF-OTK-014",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 35,
    "images": [
      "/images/products/otoklav-1.webp"
    ],
    "technicalSpecs": {
      "Durum": "2. El - Contalar ve Filtreler Yenilenmiş, Sterilizasyon Testi Yapılmış, 1 Yıl Garantili",
      "Sınıf": "B Sınıfı (EN 13060)"
    },
    "applications": [
      "Ameliyathane AEDT",
      "Diş Klinikleri",
      "Laboratuvar Sterilizasyonu"
    ],
    "translations": {
      "tr": {
        "title": "Revizyonlu B Sınıfı Otoklav (1 Yıl Garantili)",
        "shortDescription": "Contaları ve filtreleri sıfırlanmış, sterilizasyon testinden geçmiş 2. el otoklav.",
        "description": "Tüm conta setleri, filtreleri ve güvenlik valfleri yenilenmiş, biyolojik indikatör testinden geçmiş 2. el otoklav. 1 yıl garanti dahildir."
      },
      "en": {
        "title": "Refurbished Class B Autoclave (1 Year Warranty)",
        "shortDescription": "Certified pre-owned autoclave with new seals and filters.",
        "description": "Fully tested B-class autoclave with renewed gaskets and 12-month warranty."
      },
      "ar": {
        "title": "جهاز تعقيم مجدد (ضمان عام)",
        "shortDescription": "جهاز تعقيم مجدد مع حشوات وفلاتر جديدة.",
        "description": "جهاز أوتوكلاف فئة B مجدد بالكامل مع ضمان 12 شهراً."
      },
      "de": {
        "title": "Generalüberholter Autoklav Klasse B (1 Jahr Garantie)",
        "shortDescription": "Geprüfter Gebraucht-Autoklav mit erneuerten Dichtungen.",
        "description": "Vollständig getesteter Klasse-B-Autoklav mit 12 Monaten Garantie."
      },
      "ja": {
        "title": "Refurbished Class B Autoclave (1 Year Warranty)",
        "shortDescription": "Melag / Cebeci Revizyon Euroklav Revizyonlu - 高精度臨床診断・治療に対応した医療機器。",
        "description": "Melag / Cebeci Revizyon Euroklav Revizyonluは、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "Refurbished Class B Autoclave (1 Year Warranty)",
        "shortDescription": "Melag / Cebeci Revizyon Euroklav Revizyonlu - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal Melag / Cebeci Revizyon Euroklav Revizyonlu 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-36",
    "slug": "2-el-kuvoz-revizyonlu",
    "categorySlug": "yogun-bakim-ve-yasam-destek",
    "brand": "Dräger / Cebeci Revizyon",
    "model": "Isolette Serisi Revizyonlu",
    "sku": "REF-KVZ-015",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 36,
    "images": [
      "/images/products/kuvoz-4.webp",
      "/images/products/kuvoz-5.webp"
    ],
    "technicalSpecs": {
      "Durum": "2. El - Isıtıcı ve Nem Sistemi Yenilenmiş, 1 Yıl Garantili",
      "Sıcaklık Kontrolü": "Hava ve Cilt modları, ±0.1°C hassasiyet"
    },
    "applications": [
      "Yenidoğan Yoğun Bakım (NICU)",
      "Prematüre Bebek Takibi"
    ],
    "translations": {
      "tr": {
        "title": "Revizyonlu Yenidoğan Küvözü (1 Yıl Garantili)",
        "shortDescription": "Isıtıcı ve nem sistemleri yenilenmiş, 2. el garantili yenidoğan küvözü.",
        "description": "Isıtma elemanları, nem jeneratörü ve sıcaklık sensörleri yenilenmiş, tam kalibrasyon kontrolünden geçmiş 2. el küvöz. 1 yıl garanti ile sunulmaktadır."
      },
      "en": {
        "title": "Refurbished Neonatal Incubator (1 Year Warranty)",
        "shortDescription": "Certified pre-owned incubator with renewed heating system.",
        "description": "Fully tested neonatal incubator with calibrated temperature control and 12-month warranty."
      },
      "ar": {
        "title": "حاضنة أطفال مجددة (ضمان عام)",
        "shortDescription": "حاضنة أطفال مجددة مع نظام تسخين جديد.",
        "description": "حاضنة أطفال حديثي الولادة مجددة بالكامل مع ضمان 12 شهراً."
      },
      "de": {
        "title": "Generalüberholter Inkubator (1 Jahr Garantie)",
        "shortDescription": "Geprüfter Gebraucht-Inkubator mit erneuertem Heizsystem.",
        "description": "Vollständig kalibrierter Neugeborenen-Inkubator mit 12 Monaten Garantie."
      },
      "ja": {
        "title": "Refurbished Neonatal Incubator (1 Year Warranty)",
        "shortDescription": "Dräger / Cebeci Revizyon Isolette Serisi Revizyonlu - 高精度臨床診断・治療に対応した医療機器。",
        "description": "Dräger / Cebeci Revizyon Isolette Serisi Revizyonluは、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "Refurbished Neonatal Incubator (1 Year Warranty)",
        "shortDescription": "Dräger / Cebeci Revizyon Isolette Serisi Revizyonlu - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal Dräger / Cebeci Revizyon Isolette Serisi Revizyonlu 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-37",
    "slug": "2-el-hasta-yatagi-revizyonlu",
    "categorySlug": "medikal-sarf-malzemeler",
    "brand": "Stryker / Cebeci Revizyon",
    "model": "Secure II Revizyonlu",
    "sku": "REF-BED-016",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 37,
    "images": [
      "/images/products/hasta-karyolasi-1.webp"
    ],
    "technicalSpecs": {
      "Durum": "2. El - Motorlar ve Kumandalı Kontrol Ünitesi Test Edilmiş, 1 Yıl Garantili",
      "Motor": "4 Motorlu Tam Elektrikli"
    },
    "applications": [
      "Yoğun Bakım Servisleri",
      "Klinik Odaları",
      "Palyatif Bakım"
    ],
    "translations": {
      "tr": {
        "title": "Revizyonlu 4 Motorlu Hasta Karyolası (1 Yıl Garantili)",
        "shortDescription": "Motorları ve kumandası test edilmiş, 2. el garantili hasta karyolası.",
        "description": "Tüm motorları, kumanda paneli ve güvenlik bariyerleri kontrol edilmiş 2. el hasta karyolası. 1 yıl garanti ile sunulmaktadır."
      },
      "en": {
        "title": "Refurbished 4-Motor Patient Bed (1 Year Warranty)",
        "shortDescription": "Tested pre-owned ICU bed with full motor controls.",
        "description": "Fully tested 4-motor patient bed with inspected safety rails and 12-month warranty."
      },
      "ar": {
        "title": "سرير مرضى مجدد (ضمان عام)",
        "shortDescription": "سرير كهربائي مجدد ومفحوص.",
        "description": "سرير مرضى مجدد بالكامل مع ضمان 12 شهراً."
      },
      "de": {
        "title": "Generalüberholtes 4-Motor-Patientenbett (1 Jahr Garantie)",
        "shortDescription": "Geprüftes Gebraucht-Klinikbett mit Motorsteuerung.",
        "description": "Vollständig getestetes Intensivpflegebett mit 12 Monaten Garantie."
      },
      "ja": {
        "title": "Refurbished 4-Motor Patient Bed (1 Year Warranty)",
        "shortDescription": "Stryker / Cebeci Revizyon Secure II Revizyonlu - 高精度臨床診断・治療に対応した医療機器。",
        "description": "Stryker / Cebeci Revizyon Secure II Revizyonluは、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "Refurbished 4-Motor Patient Bed (1 Year Warranty)",
        "shortDescription": "Stryker / Cebeci Revizyon Secure II Revizyonlu - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal Stryker / Cebeci Revizyon Secure II Revizyonlu 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-38",
    "slug": "2-el-fizik-tedavi-cihazi-revizyonlu",
    "categorySlug": "fizik-tedavi-cihazlari",
    "brand": "BTL / Cebeci Revizyon",
    "model": "4000 Serisi Revizyonlu",
    "sku": "REF-FTR-017",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 38,
    "images": [
      "/images/products/fizik-tedavi-2.webp",
      "/images/products/fizik-tedavi-3.webp"
    ],
    "technicalSpecs": {
      "Durum": "2. El - Çıkış Kalibrasyonu ve Elektrot Kontrolleri Yapılmış, 1 Yıl Garantili",
      "Modaliteler": "Elektroterapi (TENS, IF, EMS), Ultrason 1/3 MHz"
    },
    "applications": [
      "FTR Poliklinikleri",
      "Spor Yaralanmaları Rehabilitasyonu",
      "Evde Bakım Fizyoterapisi"
    ],
    "translations": {
      "tr": {
        "title": "Revizyonlu Fizik Tedavi Cihazı (1 Yıl Garantili)",
        "shortDescription": "Çıkış kalibrasyonu ve elektrot kontrolleri yapılmış, 2. el garantili fizik tedavi ünitesi.",
        "description": "Elektroterapi çıkışları ve ultrason modülü kalibre edilmiş, yeni elektrot setleri ile 2. el fizik tedavi cihazı. 1 yıl garanti dahildir."
      },
      "en": {
        "title": "Refurbished Physical Therapy Unit (1 Year Warranty)",
        "shortDescription": "Calibrated pre-owned therapy unit with new electrodes.",
        "description": "Fully tested combination therapy unit with calibrated outputs and 12-month warranty."
      },
      "ar": {
        "title": "جهاز علاج طبيعي مجدد (ضمان عام)",
        "shortDescription": "جهاز علاج طبيعي مجدد ومعاير.",
        "description": "جهاز علاج طبيعي مجدد بالكامل مع ضمان 12 شهراً."
      },
      "de": {
        "title": "Generalüberholtes Physiotherapiegerät (1 Jahr Garantie)",
        "shortDescription": "Kalibriertes Gebraucht-Therapiegerät mit neuen Elektroden.",
        "description": "Vollständig getestetes Kombinationsgerät mit 12 Monaten Garantie."
      },
      "ja": {
        "title": "Refurbished Physical Therapy Unit (1 Year Warranty)",
        "shortDescription": "BTL / Cebeci Revizyon 4000 Serisi Revizyonlu - 高精度臨床診断・治療に対応した医療機器。",
        "description": "BTL / Cebeci Revizyon 4000 Serisi Revizyonluは、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "Refurbished Physical Therapy Unit (1 Year Warranty)",
        "shortDescription": "BTL / Cebeci Revizyon 4000 Serisi Revizyonlu - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal BTL / Cebeci Revizyon 4000 Serisi Revizyonlu 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-39",
    "slug": "2-el-aspirator-revizyonlu",
    "categorySlug": "ameliyathane-cihazlari",
    "brand": "Medela / Cebeci Revizyon",
    "model": "Dominant Serisi Revizyonlu",
    "sku": "REF-ASP-018",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 39,
    "images": [
      "/images/products/aspirator-2.webp",
      "/images/products/aspirator-3.webp"
    ],
    "technicalSpecs": {
      "Durum": "2. El - Vakum Pompası ve Filtreler Yenilenmiş, 1 Yıl Garantili",
      "Vakum Kapasitesi": "Max -90 kPa"
    },
    "applications": [
      "Ameliyathane Cerrahisi",
      "Yoğun Bakım Aspirasyonu",
      "Acil Müdahale"
    ],
    "translations": {
      "tr": {
        "title": "Revizyonlu Cerrahi Aspiratör (1 Yıl Garantili)",
        "shortDescription": "Vakum pompası ve filtreleri yenilenmiş, 2. el garantili cerrahi aspiratör.",
        "description": "Vakum pompası, bakteri filtresi ve toplama şişeleri yenilenmiş 2. el cerrahi aspiratör. 1 yıl garanti ile teslim edilir."
      },
      "en": {
        "title": "Refurbished Surgical Aspirator (1 Year Warranty)",
        "shortDescription": "Certified pre-owned aspirator with renewed pump and filters.",
        "description": "Fully tested surgical aspirator with new vacuum pump components and 12-month warranty."
      },
      "ar": {
        "title": "جهاز شفط جراحي مجدد (ضمان عام)",
        "shortDescription": "جهاز شفط مجدد مع مضخة وفلاتر جديدة.",
        "description": "جهاز شفط جراحي مجدد بالكامل مع ضمان 12 شهراً."
      },
      "de": {
        "title": "Generalüberholter Chirurgischer Absauger (1 Jahr Garantie)",
        "shortDescription": "Geprüfter Gebraucht-Absauger mit erneuerter Pumpe.",
        "description": "Vollständig getesteter Absauger mit 12 Monaten Garantie."
      },
      "ja": {
        "title": "Refurbished Surgical Aspirator (1 Year Warranty)",
        "shortDescription": "Medela / Cebeci Revizyon Dominant Serisi Revizyonlu - 高精度臨床診断・治療に対応した医療機器。",
        "description": "Medela / Cebeci Revizyon Dominant Serisi Revizyonluは、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "Refurbished Surgical Aspirator (1 Year Warranty)",
        "shortDescription": "Medela / Cebeci Revizyon Dominant Serisi Revizyonlu - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal Medela / Cebeci Revizyon Dominant Serisi Revizyonlu 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-40",
    "slug": "2-el-hasta-isitma-revizyonlu",
    "categorySlug": "yogun-bakim-ve-yasam-destek",
    "brand": "3M / Cebeci Revizyon",
    "model": "Bair Hugger Revizyonlu",
    "sku": "REF-WRM-019",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 40,
    "images": [
      "/images/products/hasta-isitma-1.webp"
    ],
    "technicalSpecs": {
      "Durum": "2. El - Fan Motoru ve Isıtıcı Element Test Edilmiş, 1 Yıl Garantili",
      "Sıcaklık Aralığı": "32°C – 43°C"
    },
    "applications": [
      "Perioperatif Hipotermi Önleme",
      "Yoğun Bakım",
      "Travma Hastası Isıtma"
    ],
    "translations": {
      "tr": {
        "title": "Revizyonlu Hasta Isıtma Sistemi (1 Yıl Garantili)",
        "shortDescription": "Fan motoru ve ısıtıcı test edilmiş, 2. el garantili hasta ısıtma sistemi.",
        "description": "Isıtma elemanı ve hava üfleyici kontrollerden geçmiş 2. el konvektif hasta ısıtma ünitesi. 1 yıl garanti dahildir."
      },
      "en": {
        "title": "Refurbished Patient Warming System (1 Year Warranty)",
        "shortDescription": "Tested pre-owned warming unit with certified fan motor.",
        "description": "Fully tested convective warming system with 12-month warranty."
      },
      "ar": {
        "title": "نظام تدفئة مرضى مجدد (ضمان عام)",
        "shortDescription": "نظام تدفئة مجدد ومفحوص.",
        "description": "نظام تدفئة مرضى مجدد بالكامل مع ضمان 12 شهراً."
      },
      "de": {
        "title": "Generalüberholtes Wärmesystem (1 Jahr Garantie)",
        "shortDescription": "Geprüftes Gebraucht-Wärmegerät.",
        "description": "Vollständig getestetes Patientenwärmesystem mit 12 Monaten Garantie."
      },
      "ja": {
        "title": "Refurbished Patient Warming System (1 Year Warranty)",
        "shortDescription": "3M / Cebeci Revizyon Bair Hugger Revizyonlu - 高精度臨床診断・治療に対応した医療機器。",
        "description": "3M / Cebeci Revizyon Bair Hugger Revizyonluは、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "Refurbished Patient Warming System (1 Year Warranty)",
        "shortDescription": "3M / Cebeci Revizyon Bair Hugger Revizyonlu - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal 3M / Cebeci Revizyon Bair Hugger Revizyonlu 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  },
  {
    "id": "prod-41",
    "slug": "2-el-santrifuj-revizyonlu",
    "categorySlug": "laboratuvar-cihazlari",
    "brand": "Hettich / Cebeci Revizyon",
    "model": "EBA 200 Revizyonlu",
    "sku": "REF-SNT-020",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 41,
    "images": [
      "/images/products/santrifuj-1.webp"
    ],
    "technicalSpecs": {
      "Durum": "2. El - Motor ve Rotor Kontrolleri Yapılmış, 1 Yıl Garantili",
      "Maks RPM": "6.000 d/dk"
    },
    "applications": [
      "Klinik Laboratuvar",
      "Kan Bankası",
      "Araştırma Laboratuvarı"
    ],
    "translations": {
      "tr": {
        "title": "Revizyonlu Klinik Santrifüj (1 Yıl Garantili)",
        "shortDescription": "Motor ve rotor kontrolleri yapılmış, 2. el garantili klinik santrifüj.",
        "description": "Fren sistemi, motor yatakları ve güvenlik kilidi kontrol edilmiş 2. el laboratuvar santrifüjü. 1 yıl garanti dahildir."
      },
      "en": {
        "title": "Refurbished Clinical Centrifuge (1 Year Warranty)",
        "shortDescription": "Tested pre-owned centrifuge with inspected motor.",
        "description": "Fully tested clinical centrifuge with inspected safety mechanisms and 12-month warranty."
      },
      "ar": {
        "title": "جهاز طرد مركزي مجدد (ضمان عام)",
        "shortDescription": "جهاز طرد مركزي مجدد مع محرك مفحوص.",
        "description": "جهاز طرد مركزي مختبري مجدد بالكامل مع ضمان 12 شهراً."
      },
      "de": {
        "title": "Generalüberholte Zentrifuge (1 Jahr Garantie)",
        "shortDescription": "Geprüfte Gebraucht-Zentrifuge mit kontrolliertem Motor.",
        "description": "Vollständig getestete Laborzentrifuge mit 12 Monaten Garantie."
      },
      "ja": {
        "title": "Refurbished Clinical Centrifuge (1 Year Warranty)",
        "shortDescription": "Hettich / Cebeci Revizyon EBA 200 Revizyonlu - 高精度臨床診断・治療に対応した医療機器。",
        "description": "Hettich / Cebeci Revizyon EBA 200 Revizyonluは、集中治療室、手術室、一般病棟向けに設計された高性能医療機器です。厳格な品質管理基準と電気安全性試験をクリアし、臨床現場での安定稼働と最高水準の患者ケアを支援します。"
      },
      "zh": {
        "title": "Refurbished Clinical Centrifuge (1 Year Warranty)",
        "shortDescription": "Hettich / Cebeci Revizyon EBA 200 Revizyonlu - 适用于重症监护、手术室及临床科室的高精度医疗设备。",
        "description": "Cebeci Medikal Hettich / Cebeci Revizyon EBA 200 Revizyonlu 专为各类医疗机构临床科室打造，具备卓越的测量精度、高稳定性的运行架构及严苛的电气安全合规性，为临床诊断与患者监护提供值得信赖的坚实保障。"
      }
    }
  }
];

export const STATIC_REFERENCES: StaticReferenceItem[] = [
  {
    id: "ref-1",
    companyName: "Ankara Şehir Hastanesi",
    clientName: "Biyomedikal Klinik Mühendislik",
    position: "Biyomedikal Birim Sorumlusu",
    sector: "Şehir Hastanesi",
    city: "Ankara",
    serviceScope: "Yoğun Bakım & Ventilatör Teknik Servisi",
    rating: 5,
    sortOrder: 1,
    translations: {
      tr: {
        quote: "Yoğun bakım ventilatörlerimizin periyodik kalibrasyon ve acil arıza onarımında Cebeci Medikal ekibi 7/24 kesintisiz profesyonel destek sağladı.",
        projectDescription: "Yoğun bakım ventilatör parkuru yıllık periyodik bakım ve kalibrasyon anlaşması.",
      },
      en: {
        quote: "Outstanding 24/7 technical support and precision calibration for our ICU ventilator fleet.",
        projectDescription: "Annual preventive maintenance agreement for ICU ventilators.",
      },
      ar: {
        quote: "دعم فني استثنائي على مدار الساعة ومعايرة دقيقة لأجهزة التنفس الاصطناعي في العناية المركزة.",
        projectDescription: "عقد صيانة سنوي ومعايرة دورية لأجهزة التنفس في العناية المركزة.",
      },
      de: {
        quote: "Erstklassiger 24/7-Support und präzise Kalibrierung für unsere Intensivbeatmungsgeräte.",
        projectDescription: "Wartungsvertrag für Beatmungsgeräte auf der Intensivstation.",
      },
      ja: {
        quote: "集中治療室の人工呼吸器保守において、Cebeci Medikalの迅速な対応と確かな技術力に深く信頼を寄せています。",
        projectDescription: "人工呼吸器定期保守・校正プロジェクト。",
      },
      zh: {
        quote: "在重症监护呼吸机的定期维护与急修响应方面，塞贝吉医疗展现了卓越的技术实力与服务品质。",
        projectDescription: "重症监护呼吸机全生命周期维保协议。",
      },
    },
  },
  {
    id: "ref-2",
    companyName: "Özel Memorial Ankara Hastanesi",
    clientName: "Ameliyathane Koordinatörlüğü",
    position: "Cerrahi Donanım Sorumlusu",
    sector: "Özel Sağlık Grubu",
    city: "Ankara",
    serviceScope: "Ameliyathane & Anestezi İstasyonları",
    rating: 5,
    sortOrder: 2,
    translations: {
      tr: {
        quote: "Ameliyathane anestezi iş istasyonları ve koter ünitelerimizin revizyonunda yüksek teknik başarı ve hızlı yedek parça temini sağlandı.",
        projectDescription: "Cerrahi koter ve anestezi cihazları revizyonu.",
      },
      en: {
        quote: "High technical standard in anesthesia workstation refurbishment and electrosurgical unit repairs.",
        projectDescription: "Surgical diathermy and anesthesia refurbishment.",
      },
      ar: {
        quote: "محطات التخدير الجراحي ووحدات الكي الكهربائي تم تجديدها بأعلى المعايير.",
        projectDescription: "تجديد أجهزة الكي والتخدير الجراحي.",
      },
      de: {
        quote: "Hervorragende Qualität bei der Revision von Anästhesiegeräten und HF-Chirurgie.",
        projectDescription: "Generalüberholung von Elektrochirurgie- und Anästhesiegeräten.",
      },
      ja: {
        quote: "手術室麻酔器および電気メス装置の保守点検において、完璧なサポートを受けています。",
        projectDescription: "手術室機器リファービッシュ・点検サービス。",
      },
      zh: {
        quote: "手术室麻醉工作站与高频电刀的翻新及技术检测非常彻底，零部件供应十分迅速。",
        projectDescription: "手术室核心设备全套维护与升级服务。",
      },
    },
  },
  {
    id: "ref-3",
    companyName: "Hacettepe Üniversitesi Hastaneleri",
    clientName: "Biyomedikal Hizmetler",
    position: "Biyomedikal Uzmanı",
    sector: "Üniversite Tıp Fakültesi",
    city: "Ankara",
    serviceScope: "Hasta Takip Monitörleri & Telemetri Ağı",
    rating: 5,
    sortOrder: 3,
    translations: {
      tr: {
        quote: "Merkezi monitörizasyon ağımız ve hastabaşı monitörlerimizin periyodik bakım anlaşmasıyla arıza oranımız sıfıra indi.",
        projectDescription: "Merkezi monitör sistemleri entegrasyonu ve bakımı.",
      },
      en: {
        quote: "Zero-failure operational reliability achieved with Cebeci Medikal's periodic maintenance agreement for patient monitors.",
        projectDescription: "Central telemetry network maintenance.",
      },
      ar: {
        quote: "صيانة دورية متميزة لشاشات المراقبة والشبكة المركزية بدون أي انقطاع.",
        projectDescription: "صيانة أنظمة المراقبة المركزية.",
      },
      de: {
        quote: "Höchste Ausfallsicherheit durch regelmäßige Wartung der Patientenüberwachung.",
        projectDescription: "Wartung von Patientenüberwachungssystemen.",
      },
      ja: {
        quote: "生体情報モニタネットワークの安定稼働を実現していただき、大変満足しています。",
        projectDescription: "テレメトリーネットワーク保守管理。",
      },
      zh: {
        quote: "中央监护网络与床旁监护系统的年度维保服务极大提升了临床运行的稳定性与安全性。",
        projectDescription: "全院生命体征监护网络技术保障服务。",
      },
    },
  },
];

export const STATIC_CATALOGS: StaticCatalogItem[] = [
  {
    id: "cat-doc-1",
    title: "Cebeci Medikal Genel Ürün Kataloğu 2026",
    category: "Genel",
    description: "Cebeci Medikal 2026 yılı güncel medikal cihaz, yoğun bakım ve ameliyathane ürün kataloğu.",
    fileUrl: "https://www.cebecimedikal.com",
    thumbnailUrl: "/images/products/hastabasi-monitoru-1.webp",
    fileSize: "14.8 MB",
    version: "2026.1",
    downloadCount: 142,
    sortOrder: 1,
    isActive: true,
    locale: "tr",
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  },
  {
    id: "cat-doc-2",
    title: "Yoğun Bakım & Yaşam Destek Cihazları Kataloğu",
    category: "Yoğun Bakım",
    description: "Ventilatörler, hasta başı monitörleri, defibrilatörler ve infüzyon sistemleri ürün broşürü.",
    fileUrl: "https://www.cebecimedikal.com",
    thumbnailUrl: "/images/products/ventilator-1.webp",
    fileSize: "8.4 MB",
    version: "2026.1",
    downloadCount: 98,
    sortOrder: 2,
    isActive: true,
    locale: "tr",
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  },
  {
    id: "cat-doc-3",
    title: "2. El Revizyonlu Tıbbi Cihazlar Kataloğu",
    category: "2. El Cihazlar",
    description: "Garantili, test edilmiş ve kalibre edilmiş 2. el medikal cihaz envanteri.",
    fileUrl: "https://www.cebecimedikal.com",
    thumbnailUrl: "/images/products/anestezi-cihazi-1.webp",
    fileSize: "6.2 MB",
    version: "2026.1",
    downloadCount: 175,
    sortOrder: 3,
    isActive: true,
    locale: "tr",
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  },
  {
    id: "cat-doc-4",
    title: "Biyomedikal Teknik Servis & Kalibrasyon Rehberi",
    category: "Teknik Servis",
    description: "Periyodik bakım prosedürleri, kalibrasyon standartları ve servis kapsamı rehberi.",
    fileUrl: "https://www.cebecimedikal.com",
    thumbnailUrl: "/images/products/kuvoz-1.webp",
    fileSize: "4.1 MB",
    version: "2026.1",
    downloadCount: 64,
    sortOrder: 4,
    isActive: true,
    locale: "tr",
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  },
];

export function getStaticCategories(locale: string = DEFAULT_LOCALE): LocalizedCategory[] {
  return STATIC_CATEGORIES.map((c) => {
    const t = c.translations[locale] || c.translations[DEFAULT_LOCALE] || c.translations.tr;
    return {
      id: c.id,
      slug: c.slug,
      icon: c.icon,
      sortOrder: c.sortOrder,
      name: t?.name || c.slug,
      description: t?.description || "",
      productsCount: STATIC_PRODUCTS.filter((p) => p.categorySlug === c.slug).length,
    };
  });
}

export function getStaticCategoryBySlug(
  slug: string,
  locale: string = DEFAULT_LOCALE
): LocalizedCategory | null {
  const cat = STATIC_CATEGORIES.find((c) => c.slug === slug);
  if (!cat) return null;
  const t = cat.translations[locale] || cat.translations[DEFAULT_LOCALE] || cat.translations.tr;
  return {
    id: cat.id,
    slug: cat.slug,
    icon: cat.icon,
    sortOrder: cat.sortOrder,
    name: t?.name || cat.slug,
    description: t?.description || "",
    productsCount: STATIC_PRODUCTS.filter((p) => p.categorySlug === cat.slug).length,
  };
}

export function getStaticProducts(
  locale: string = DEFAULT_LOCALE,
  options?: {
    categorySlug?: string;
    condition?: string;
    featured?: boolean;
    search?: string;
    limit?: number;
  }
): LocalizedProduct[] {
  let filtered = [...STATIC_PRODUCTS];

  if (options?.categorySlug) {
    filtered = filtered.filter((p) => p.categorySlug === options.categorySlug);
  }

  if (options?.condition && options.condition !== "ALL") {
    filtered = filtered.filter((p) => p.condition === options.condition);
  }

  if (options?.featured !== undefined) {
    filtered = filtered.filter((p) => p.featured === options.featured);
  }

  const localized = filtered.map((p) => {
    const t = p.translations[locale] || p.translations[DEFAULT_LOCALE] || p.translations.tr;
    const cat = STATIC_CATEGORIES.find((c) => c.slug === p.categorySlug);
    const catT = cat
      ? cat.translations[locale] || cat.translations[DEFAULT_LOCALE] || cat.translations.tr
      : null;

    return {
      id: p.id,
      slug: p.slug,
      brand: p.brand,
      model: p.model,
      sku: p.sku,
      condition: p.condition,
      status: "PUBLISHED",
      featured: p.featured,
      sortOrder: p.sortOrder,
      images: p.images,
      technicalSpecs: p.technicalSpecs,
      applications: p.applications,
      title: t?.title || p.slug,
      shortDescription: t?.shortDescription || "",
      description: t?.description || "",
      category: {
        id: cat?.id || "cat-default",
        slug: p.categorySlug,
        name: catT?.name || p.categorySlug,
      },
    };
  });

  if (options?.search) {
    const q = options.search.toLowerCase().trim();
    const searchResults = localized.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        (item.model && item.model.toLowerCase().includes(q)) ||
        item.description.toLowerCase().includes(q) ||
        item.category.name.toLowerCase().includes(q)
    );
    return options.limit ? searchResults.slice(0, options.limit) : searchResults;
  }

  return options?.limit ? localized.slice(0, options.limit) : localized;
}

export function getStaticProductBySlug(
  slug: string,
  locale: string = DEFAULT_LOCALE
): LocalizedProduct | null {
  const p = STATIC_PRODUCTS.find((item) => item.slug === slug);
  if (!p) return null;

  const t = p.translations[locale] || p.translations[DEFAULT_LOCALE] || p.translations.tr;
  const cat = STATIC_CATEGORIES.find((c) => c.slug === p.categorySlug);
  const catT = cat
    ? cat.translations[locale] || cat.translations[DEFAULT_LOCALE] || cat.translations.tr
    : null;

  return {
    id: p.id,
    slug: p.slug,
    brand: p.brand,
    model: p.model,
    sku: p.sku,
    condition: p.condition,
    status: "PUBLISHED",
    featured: p.featured,
    sortOrder: p.sortOrder,
    images: p.images,
    technicalSpecs: p.technicalSpecs,
    applications: p.applications,
    title: t?.title || p.slug,
    shortDescription: t?.shortDescription || "",
    description: t?.description || "",
    category: {
      id: cat?.id || "cat-default",
      slug: p.categorySlug,
      name: catT?.name || p.categorySlug,
    },
  };
}

export function getStaticRelatedProducts(
  currentSlug: string,
  categoryId: string,
  locale: string = DEFAULT_LOCALE,
  limit: number = 3
): LocalizedProduct[] {
  const cat = STATIC_CATEGORIES.find((c) => c.id === categoryId);
  const currentProduct = STATIC_PRODUCTS.find((p) => p.slug === currentSlug);
  const targetCatSlug = cat?.slug || currentProduct?.categorySlug;

  const filtered = STATIC_PRODUCTS.filter(
    (p) => p.slug !== currentSlug && (!targetCatSlug || p.categorySlug === targetCatSlug)
  ).slice(0, limit);

  return filtered.map((p) => {
    const t = p.translations[locale] || p.translations[DEFAULT_LOCALE] || p.translations.tr;
    const pCat = STATIC_CATEGORIES.find((c) => c.slug === p.categorySlug);
    const catT = pCat
      ? pCat.translations[locale] || pCat.translations[DEFAULT_LOCALE] || pCat.translations.tr
      : null;

    return {
      id: p.id,
      slug: p.slug,
      brand: p.brand,
      model: p.model,
      sku: p.sku,
      condition: p.condition,
      status: "PUBLISHED",
      featured: p.featured,
      sortOrder: p.sortOrder,
      images: p.images,
      technicalSpecs: {},
      applications: [],
      title: t?.title || p.slug,
      shortDescription: t?.shortDescription || "",
      description: t?.description || "",
      category: {
        id: pCat?.id || "cat-default",
        slug: p.categorySlug,
        name: catT?.name || p.categorySlug,
      },
    };
  });
}

export function getStaticServices(locale: string = DEFAULT_LOCALE): LocalizedService[] {
  return STATIC_SERVICES.map((s) => {
    const t = s.translations[locale] || s.translations[DEFAULT_LOCALE] || s.translations.tr;
    return {
      id: s.id,
      slug: s.slug,
      icon: s.icon,
      sortOrder: s.sortOrder,
      title: t?.title || s.slug,
      shortDescription: t?.shortDescription || "",
      description: t?.description || "",
      details: t?.details || s.details,
    };
  });
}

export function getStaticServiceBySlug(
  slug: string,
  locale: string = DEFAULT_LOCALE
): LocalizedService | null {
  const service = STATIC_SERVICES.find((s) => s.slug === slug);
  if (!service) return null;

  const t =
    service.translations[locale] ||
    service.translations[DEFAULT_LOCALE] ||
    service.translations.tr;

  return {
    id: service.id,
    slug: service.slug,
    icon: service.icon,
    sortOrder: service.sortOrder,
    title: t?.title || service.slug,
    shortDescription: t?.shortDescription || "",
    description: t?.description || "",
    details: t?.details || service.details,
  };
}

export function getStaticReferences(locale: string = DEFAULT_LOCALE): LocalizedReference[] {
  return STATIC_REFERENCES.map((r) => {
    const t = r.translations[locale] || r.translations[DEFAULT_LOCALE] || r.translations.tr;
    return {
      id: r.id,
      companyName: r.companyName,
      clientName: r.clientName,
      position: r.position,
      sector: r.sector,
      city: r.city,
      rating: r.rating,
      serviceScope: r.serviceScope,
      quote: t?.quote || "",
    };
  });
}

export function getStaticCatalogs(locale: string = DEFAULT_LOCALE): StaticCatalogItem[] {
  return STATIC_CATALOGS;
}

export const STATIC_FAQS: StaticFaqItem[] = [
  {
    id: "faq-1",
    category: "Ürünler & Garanti",
    sortOrder: 1,
    translations: {
      tr: {
        question: "Satışını yaptığınız 2. el ve revizyonlu tıbbi cihazların garanti süresi nedir?",
        answer: "Tüm 2. el ve revizyonlu tıbbi cihazlarımız, Cebeci Medikal biyomedikal laboratuvarımızda IEC 62353 elektriksel güvenlik ve üretici kalibrasyon testlerinden geçirildikten sonra 1 Yıl Tam Garanti ile teslim edilir.",
      },
      en: {
        question: "What is the warranty period for certified pre-owned and refurbished medical devices?",
        answer: "All refurbished medical devices undergo comprehensive electrical safety and calibration testing in our biomedical laboratory and include a 1-Year Comprehensive Warranty.",
      },
      ar: {
        question: "ما هي فترة الضمان للأجهزة الطبية المجددة والمستعملة؟",
        answer: "تخضع جميع الأجهزة المجددة لاختبارات الأمان والمعايرة في مختبراتنا الطبية وتُسلم مع ضمان شامل لمدة عام كامل.",
      },
      de: {
        question: "Wie lange ist die Garantiezeit für überholte und gebrauchte Medizingeräte?",
        answer: "Alle wiederaufbereiteten Medizingeräte werden in unserem biomedizinischen Prüflabor auf Herz und Nieren getestet und mit einer 1-jährigen Vollgarantie ausgeliefert.",
      },
      ja: {
        question: "中古・リファービッシュ医療機器の保証期間はどのくらいですか？",
        answer: "当社のバイオメディカルラボで厳格な安全基準試験および校正を実施した上で、全製品に1年間の完全保証をお付けしています。",
      },
      zh: {
        question: "所售认证二手及翻新医疗设备的质保期是多久？",
        answer: "所有翻新医疗设备均通过塞贝吉生物工程实验室严格的IEC 62353电气安全及校准检测，均附带1年全面整机质保。",
      },
    },
  },
  {
    id: "faq-2",
    category: "Teknik Servis & Bakım",
    sortOrder: 2,
    translations: {
      tr: {
        question: "Arıza bildirimlerine müdahale süreniz ne kadardır?",
        answer: "Ankara içi acil arıza bildirimlerine aynı gün içerisinde (genellikle 2-4 saat), diğer illere ise 24-48 saat içerisinde yerinde müdahale sağlanmaktadır.",
      },
      en: {
        question: "What is your response time for emergency service requests?",
        answer: "For emergency breakdowns in Ankara, on-site intervention is typically provided within 2-4 hours. For other cities, response time is between 24-48 hours.",
      },
      ar: {
        question: "ما هي المدة الزمنية للاستجابة لبلاغات الأعطال الطارئة؟",
        answer: "يتم التدخل الميداني في مدينة أنقرة في نفس اليوم (خلال 2-4 ساعات)، وفي باقي المدن والمحافظات خلال 24-48 ساعة.",
      },
      de: {
        question: "Wie schnell reagieren Sie auf Notfall-Reparaturanfragen?",
        answer: "Bei Notfällen im Großraum Ankara sind unsere Techniker innerhalb von 2-4 Stunden vor Ort. In anderen Regionen erfolgt der Einsatz innerhalb von 24-48 Stunden.",
      },
      ja: {
        question: "緊急の修理依頼に対する駆けつけ時間はどのくらいですか？",
        answer: "アンカラ市内では通常2〜4時間以内、その他の地域では24〜48時間以内に現地対応いたします。",
      },
      zh: {
        question: "突发设备故障的现场响应时效是多久？",
        answer: "安卡拉市内紧急报修通常在2-4小时内到达现场；其他城市和周边省份在24-48小时内安排工程师上门。",
      },
    },
  },
];

export function getStaticFaqs(locale: string = DEFAULT_LOCALE) {
  return STATIC_FAQS.map((f) => {
    const t = f.translations[locale] || f.translations[DEFAULT_LOCALE] || f.translations.tr;
    return {
      id: f.id,
      category: f.category,
      question: t?.question || "",
      answer: t?.answer || "",
    };
  });
}
