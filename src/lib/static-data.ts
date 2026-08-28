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
    id: "prod-1",
    slug: "hastabasi-monitoru-cbc-m12",
    categorySlug: "fizyolojik-sinyal-izleyiciler",
    brand: "Cebeci Medikal",
    model: "CBC-M12 Pro",
    sku: "CBC-MON-012",
    condition: "SECOND_HAND",
    featured: true,
    sortOrder: 1,
    images: [
      "/images/products/hastabasi-monitoru-1.webp",
      "/images/products/hastabasi-monitoru-2.webp",
      "/images/products/hastabasi-monitoru-3.webp",
      "/images/products/hastabasi-monitoru-4.webp",
      "/images/products/hastabasi-monitoru-5.webp",
    ],
    technicalSpecs: {
      "Ekran Boyutu": "12.1 inç Yüksek Çözünürlüklü Renkli TFT LCD",
      "Standart Parametreler": "EKG (3/5 Derivasyon), SpO2, NIBP, Solunum (RESP), 2-Kanal Sıcaklık (TEMP), Nabız (PR)",
      "Opsiyonel Modüller": "EtCO2 (Mainstream / Sidestream), 2-Kanal IBP, Kardiyak Çıktı (CO)",
      "Aritmi & ST Analizi": "23 Farklı Aritmi Tipi Algılama ve Gerçek Zamanlı ST Segment Analizi",
      "Batarya Ömrü": "Dahili Şarj Edilebilir Li-Ion Batarya (4+ Saat Kesintisiz Çalışma)",
      "Hafıza & Trend": "120 Saat Grafik ve Tablo Trend Kaydı, 1000 NIBP Ölçüm Hafızası",
      "Yazıcı": "Entegre 50mm Çift Kanallı Termal Yazıcı",
    },
    applications: [
      "Genel ve Cerrahi Yoğun Bakım Üniteleri",
      "Koroner Yoğun Bakım (KVC)",
      "Ameliyathane ve Anestezi Ayılma Odaları (PACU)",
      "Acil Servis Müdahale ve Triyaj Alanları",
    ],
    translations: {
      tr: {
        title: "Çok Parametreli Hastabaşı Monitörü (CBC-M12 Pro)",
        shortDescription: "Yoğun bakım, ameliyathane ve acil servisler için 12.1 inç yüksek hassasiyetli çok parametreli hasta takip monitörü.",
        description: "Cebeci Medikal CBC-M12 Pro, kritik ve yarı kritik hasta takibinde en yüksek hassasiyet standardını sunar. 12.1 inç geniş ekranı, esnek parametre modülleri, gelişmiş aritmi algılama algoritmaları ve dayanıklı tasarımı ile ameliyathanelerden yoğun bakım servislerine kadar kesintisiz klinik güvenilirlik sağlar. Merkezi monitör sistemlerine tam uyumludur.",
      },
      en: {
        title: "Multi-Parameter Patient Monitor (CBC-M12 Pro)",
        shortDescription: "12.1-inch high-precision patient monitor designed for ICU, OR, and emergency departments.",
        description: "The CBC-M12 Pro delivers clinical precision for patient monitoring. Features a 12.1-inch TFT display, comprehensive arrhythmia analysis, multi-lead ECG, NIBP, SpO2, and optional EtCO2/IBP modules with full central monitoring compatibility.",
      },
      ar: {
        title: "شاشة مراقبة المرضى متعددة القياسات (CBC-M12 Pro)",
        shortDescription: "شاشة مراقبة متطورة قياس 12.1 بوصة مخصصة للعناية المركزة وغرف العمليات والطوارئ.",
        description: "توفر شاشة CBC-M12 Pro دقة سريرية فائقة في متابعة العلامات الحيوية للمرضى، مع شاشة ملونة واضحة وتحليل متقدم لنبضات القلب وتخطيط القلب وضغط الدم ونسبة الأكسجين.",
      },
      de: {
        title: "Multiparameter-Patientenmonitor (CBC-M12 Pro)",
        shortDescription: "12,1-Zoll-Hochpräzisionsmonitor für Intensivstationen, OP-Säle und Notaufnahmen.",
        description: "Der CBC-M12 Pro gewährleistet präzise Vitalparameter-Überwachung mit 12,1-Zoll-Display, EKG-, SpO2-, NIBP- und optionalen EtCO2-Modulen für maximale Zuverlässigkeit im klinischen Alltag.",
      },
      ja: {
        title: "生体情報モニタ (CBC-M12 Pro)",
        shortDescription: "ICU、手術室、救急部門向け12.1インチ高精度マルチパラメータ患者監視モニタ。",
        description: "CBC-M12 Proは、高精度な生体情報測定と不整脈解析機能を搭載し、集中治療室から一般病棟まで安全な患者管理をサポートします。",
      },
      zh: {
        title: "多参数病人监护仪 (CBC-M12 Pro)",
        shortDescription: "专为重症监护、手术室及急诊科设计的12.1英寸高精度多参数监护系统。",
        description: "CBC-M12 Pro 具备卓越的抗干扰能力与精确的生命体征测量技术，支持心电、血氧、无创血压及呼末二氧化碳等全方位监护。",
      },
    },
  },
  {
    id: "prod-2",
    slug: "ekg-cihazi-cbc-ecg12",
    categorySlug: "fizyolojik-sinyal-izleyiciler",
    brand: "Cebeci Medikal",
    model: "CBC-ECG12 Digital",
    sku: "CBC-ECG-012",
    condition: "SECOND_HAND",
    featured: true,
    sortOrder: 2,
    images: [
      "/images/products/ekg-cihazi-1.webp",
      "/images/products/ekg-cihazi-2.webp",
    ],
    technicalSpecs: {
      "Derivasyon": "12 Eşzamanlı Standart ve Cabrera Derivasyon Kaydı",
      "Ekran": "7 inç Renkli Dokunmatik LCD Ekran",
      "Yazıcı": "216mm Yüksek Çözünürlüklü Termal Yazıcı (Rulo ve Z-Katlama Kağıt)",
      "Otomatik Yorumlama": "Glasgow / CSE Standartlarında Otomatik Aritmi ve İskemi Analiz Raporu",
      "Filtreler": "Kas (EMG), Şebeke (AC) ve Taban Çizgisi Sürüklenme Filtreleri",
      "Hafıza": "Dahili 1000 EKG Kayıt Hafızası, USB ve SD Kart ile Veri Aktarımı",
      "Bağlantı": "DICOM, HL7, PDF ve XML Formatlarında Hastane Bilgi Sistemine (HBYS) Aktarım",
    },
    applications: [
      "Kardiyoloji Poliklinikleri ve Servisleri",
      "Acil Servisler ve Ambulanslar",
      "Aile Sağlığı Merkezleri ve Özel Klinikler",
      "Ameliyat Öncesi Kardiyovasküler Değerlendirme",
    ],
    translations: {
      tr: {
        title: "12 Kanallı Dijital EKG Cihazı (CBC-ECG12)",
        shortDescription: "Dokunmatik ekranlı, otomatik yorumlamalı ve 216mm geniş termal yazıcılı 12 kanallı dijital elektrokardiyografi cihazı.",
        description: "CBC-ECG12, kardiyovasküler teşhiste yüksek sinyal doğruluğu sağlayan 12 kanallı dijital EKG cihazıdır. Geniş termal yazıcısı, dokunmatik kullanıcı arayüzü, otomatik aritmi teşhis algoritmaları ve HBYS/DICOM entegrasyonu ile klinik muayene hızını ve doğruluğunu en üst düzeye çıkarır.",
      },
      en: {
        title: "12-Channel Digital ECG Machine (CBC-ECG12)",
        shortDescription: "12-lead digital electrocardiograph with 7-inch touch screen and automated diagnostic interpretation.",
        description: "The CBC-ECG12 offers simultaneous 12-lead acquisition, advanced diagnostic algorithms, high-resolution 216mm thermal printing, and seamless hospital network integration.",
      },
      ar: {
        title: "جهاز تخطيط القلب الرقمي 12 قناة (CBC-ECG12)",
        shortDescription: "جهاز تخطيط قلب متطور بـ 12 قناة مع شاشة لمس وتقرير تشخيصي تلقائي وطباعة حرارية عريضة.",
        description: "يقدم جهاز CBC-ECG12 أعلى مستويات الدقة في تشخيص أمراض القلب مع شاشة ملونة تعمل باللمس، وتفسير آلي دقيق لنتائج التخطيط وإمكانية الربط مع أنظمة المستشفيات.",
      },
      de: {
        title: "12-Kanal Digitales EKG-Gerät (CBC-ECG12)",
        shortDescription: "12-Kanal-Elektrokardiograph mit Touchscreen und automatischer Interpretationsfunktion.",
        description: "Das CBC-ECG12 bietet präzise 12-Kanal-EKG-Aufzeichnung mit automatischer Befundung, breitem Thermodrucker und digitaler Datenübertragung ins Krankenhaus-Informationssystem.",
      },
      ja: {
        title: "12誘導デジタル心電計 (CBC-ECG12)",
        shortDescription: "タッチパネル搭載・自動解析機能付き12誘導デジタル心電計。",
        description: "高精度な波形サンプリングと自動診断アルゴリズムにより、循環器外来から病棟までスピーディーで確実な検査を実現します。",
      },
      zh: {
        title: "12导联数字心电图机 (CBC-ECG12)",
        shortDescription: "配置7英寸触摸屏与自动分析诊断算法的专业12导联心电图工作站。",
        description: "CBC-ECG12 支持12导联同步采集，配备宽幅热敏打印机，支持DICOM/HL7格式无缝对接医院信息管理系统。",
      },
    },
  },
  {
    id: "prod-3",
    slug: "bifazik-defibrilator-cbc-def500",
    categorySlug: "yogun-bakim-ve-yasam-destek",
    brand: "Cebeci Medikal",
    model: "CBC-DEF500 Biphasic",
    sku: "CBC-DEF-500",
    condition: "SECOND_HAND",
    featured: true,
    sortOrder: 3,
    images: [
      "/images/products/defibrilator-1.webp",
      "/images/products/defibrilator-2.webp",
      "/images/products/defibrilator-3.webp",
    ],
    technicalSpecs: {
      "Dalga Formu": "Bifazik Kesilmiş Üstel Dalga Formu (BTE)",
      "Enerji Seviyeleri": "Manuel Mod: 1 - 360 Joule Arasında Kademeli Seçim",
      "Çalışma Modları": "Manuel Defibrilasyon, AED (Otomatik Eksternal), Senkron Kardiyoversiyon, Non-İnvaziv Pacer",
      "Şarj Süresi": "200 Joule Seviyesine 3 Saniyenin Altında Hızlı Şarj",
      "Monitörizasyon": "7 inç Renkli Ekran, 3/5 Derivasyon EKG, SpO2 ve NIBP Desteği",
      "Kaşıklar": "Entegre Yetişkin ve Pediyatrik Dönüştürülebilir Harici Kaşıklar",
      "Batarya": "Tam Şarj ile 100+ Şok veya 5 Saat Kesintisiz Monitörizasyon",
    },
    applications: [
      "Hastane Acil Servisleri ve Resüsitasyon Odaları",
      "Yoğun Bakım Üniteleri ve Koroner Bakım",
      "Ameliyathaneler ve Kalp Kateterizasyon Laboratuvarları",
      "Acil Sağlık Ambulansları ve Mobil Müdahale Ekipleri",
    ],
    translations: {
      tr: {
        title: "Bifazik Defibrilatör & Monitör Sistemi (CBC-DEF500)",
        shortDescription: "Manuel, AED, Pacer ve Senkron Kardiyoversiyon özellikli 360J bifazik defibrilatör.",
        description: "Kritik kardiyak acillerde hayat kurtaran CBC-DEF500; 360 Joule'e kadar bifazik enerji teknolojisi, ultra hızlı şarj kabiliyeti, entegre pacer ve çok parametreli monitörizasyon özellikleri ile acil servis ve yoğun bakımların vazgeçilmez ekipmanıdır.",
      },
      en: {
        title: "Biphasic Defibrillator & Monitor (CBC-DEF500)",
        shortDescription: "Advanced 360J biphasic defibrillator with Manual, AED, Pacing, and synchronized cardioversion.",
        description: "Designed for resuscitation in critical cardiac emergencies. Delivers up to 360J biphasic shocks with sub-3-second charging, adult/pediatric paddles, and comprehensive vital sign monitoring.",
      },
      ar: {
        title: "جهاز الصدمات الكهربائية ثنائي الطور (CBC-DEF500)",
        shortDescription: "جهاز صدمات متقدم ثنائي الطور حتى 360 جول مع وظائف AED ومنظم ضربات القلب والمراقبة.",
        description: "يتميز CBC-DEF500 بتقنية شحن فائقة السرعة وأقطاب مدمجة للبالغين والأطفال، مع شاشة مراقبة حيوية ودعم كامل لعمليات الإنعاش القلبي الرئوي.",
      },
      de: {
        title: "Biphasischer Defibrillator & Monitor (CBC-DEF500)",
        shortDescription: "360J biphasischer Defibrillator mit manuellem Modus, AED, Schrittmacher und SpO2/EKG.",
        description: "Höchste Zuverlässigkeit in der Notfall- und Intensivmedizin: Biphasische Technologie bis 360 Joule, extrem schnelle Ladezeit und integriertes Vitaldaten-Monitoring.",
      },
      ja: {
        title: "二相性除細動器・モニタシステム (CBC-DEF500)",
        shortDescription: "マニュアル、AED、ペーシング、同期カルディオバージョン対応360J除細動器。",
        description: "緊急蘇生現場で求められる超高速充電と確実な二相性ショックエネルギー出力、多機能モニタリング性能を備えています。",
      },
      zh: {
        title: "双相波除颤监护仪 (CBC-DEF500)",
        shortDescription: "具备手动除颤、AED、起搏及同步电复律功能的360焦耳双相除颤监护系统。",
        description: "CBC-DEF500 专为急救与重症复苏打造，具备3秒极速充电性能与成人/儿童一体化除颤电极板，性能坚固稳定。",
      },
    },
  },
  {
    id: "prod-4",
    slug: "yogun-bakim-ventilatoru-cbc-vent700",
    categorySlug: "yogun-bakim-ve-yasam-destek",
    brand: "Cebeci Medikal",
    model: "CBC-VENT700",
    sku: "CBC-VNT-700",
    condition: "SECOND_HAND",
    featured: true,
    sortOrder: 4,
    images: [
      "/images/products/ventilator-1.webp",
      "/images/products/ventilator-2.webp",
      "/images/products/ventilator-3.webp",
      "/images/products/ventilator-4.webp",
      "/images/products/ventilator-5.webp",
    ],
    technicalSpecs: {
      "Hasta Tipleri": "Yetişkin, Pediyatrik ve Yenidoğan (Neonatal) Hastalar",
      "Ventilasyon Modları": "VCV, PCV, SIMV-V, SIMV-P, CPAP/PSV, PRVC, Bi-Level, APRV, Non-İnvaziv (NIV)",
      "Tidal Hacim": "20 ml - 2000 ml (Neonatal modda 2 ml'ye kadar)",
      "Ekran": "15 inç Dokunmatik Renkli HD Grafik Ekran, 3 Dalga Formu ve 2 Döngü (Loop)",
      "Gaz Kaynağı": "Merkezi Gaz veya Entegre Yüksek Performanslı Sessiz Türbin Teknolojisi",
      "Ölçülen Parametreler": "Ppeak, Pplat, Pmean, PEEP, FiO2, Vte, Vti, MVe, İns/Eks Direnç ve Kompliyans",
      "Batarya": "Dahili Çift Batarya ile 6 Saat Kesintisiz Çalışma",
    },
    applications: [
      "Erişkin, Çocuk ve Yenidoğan Yoğun Bakım Servisleri",
      "Göğüs Hastalıkları ve Solunum Yetmezliği Merkezleri",
      "Ameliyat Sonrası Ayılma ve Solunum Desteği",
      "Acil Transfer ve Kritik Hasta Bakımı",
    ],
    translations: {
      tr: {
        title: "Yoğun Bakım & Transport Ventilatörü (CBC-VENT700)",
        shortDescription: "Yetişkin, çocuk ve yenidoğan uyumlu, türbinli ve dokunmatik ekranlı gelişmiş mekanik ventilatör.",
        description: "CBC-VENT700; invaziv ve non-invaziv modlarda üstün solunum senkronizasyonu sunar. Dahili türbin teknolojisi sayesinde merkezi hava hattına bağımlı olmadan çalışabilir. Gelişmiş akciğer koruyucu ventilasyon araçları ve kullanıcı dostu arayüzü ile kritik solunum desteğinde maksimum hasta konforu sağlar.",
      },
      en: {
        title: "ICU & Transport Mechanical Ventilator (CBC-VENT700)",
        shortDescription: "Advanced turbine-driven mechanical ventilator for adult, pediatric, and neonatal respiratory care.",
        description: "The CBC-VENT700 offers comprehensive invasive and non-invasive ventilation with high-performance turbine technology, 15-inch touch screen, and advanced lung-protective tools.",
      },
      ar: {
        title: "جهاز التنفس الاصطناعي للعناية المركزة (CBC-VENT700)",
        shortDescription: "جهاز تنفس اصطناعي متطور بتوربين مدمج وشاشة 15 بوصة لجميع الفئات العمرية.",
        description: "يوفر CBC-VENT700 تهوية تنفسية دقيقة ومريحة للمرضى في غرف العناية المركزة مع توافق كامل لحديثي الولادة والأطفال والبالغين دون الحاجة لشبكة هواء مضغوط خارجية.",
      },
      de: {
        title: "Intensivbeatmungsgerät (CBC-VENT700)",
        shortDescription: "Modernes turbinenbetriebenes Beatmungsgerät für Erwachsene, Kinder und Neonaten.",
        description: "Das CBC-VENT700 vereint invasive und nicht-invasive Beatmungsmodi mit intuitiver 15-Zoll-Bedienung und autarker Turbinentechnologie für den anspruchsvollen Intensivpflegeeinsatz.",
      },
      ja: {
        title: "集中治療・輸送用人工呼吸器 (CBC-VENT700)",
        shortDescription: "成人・小児・新生児対応、高性能タービン駆動タッチスクリーン人工呼吸器。",
        description: "侵襲・非侵襲換気モードを網羅し、肺保護換気ツールと優れた患者同調性により、集中治療現場の高度な要求に応えます。",
      },
      zh: {
        title: "重症监护与转运呼吸机 (CBC-VENT700)",
        shortDescription: "全年龄段适用（成人/儿童/新生儿）的高性能内置涡轮有创/无创呼吸机。",
        description: "CBC-VENT700 具备出色的气道同步性与肺保护性通气工具，内置高性能静音涡轮，无需外接压缩空气管路即可自主运行。",
      },
    },
  },
  {
    id: "prod-5",
    slug: "anestezi-cihazi-cbc-anes900",
    categorySlug: "ameliyathane-cihazlari",
    brand: "Cebeci Medikal",
    model: "CBC-ANES900 Workstation",
    sku: "CBC-ANS-900",
    condition: "SECOND_HAND",
    featured: true,
    sortOrder: 5,
    images: [
      "/images/products/anestezi-cihazi-1.webp",
      "/images/products/anestezi-cihazi-2.webp",
      "/images/products/anestezi-cihazi-3.webp",
    ],
    technicalSpecs: {
      "Ventilatör Modları": "VCV, PCV, SIMV, PSV, Manuel / Spontan Anestezi Modları",
      "Ekran": "12.1 inç Dokunmatik Renkli Entegre Anestezi Ekranı",
      "Vaporizatör Yuvaları": "Çift Selectatec Uyumlu Kilitlemeli Vaporizatör Yuvası",
      "Gaz Girişleri": "O2, N2O ve Medikal Hava (Air) Girişleri ile Mekanik/Elektronik Flowmetre",
      "Absorber Ünitesi": "Otoklavlanabilir Entegre Isıtıcılı CO2 Absorber (Bypass Özellikli)",
      "Atık Gaz Tahliyesi": "Aktif / Pasif AGSS (Anesthetic Gas Scavenging System) Uyumu",
    },
    applications: [
      "Genel Cerrahi ve Kalp-Damar Cerrahisi Ameliyathaneleri",
      "Kadın Doğum ve Ortopedik Cerrahi Merkezleri",
      "Günübirlik Cerrahi ve Girişimsel İşlem Odaları",
    ],
    translations: {
      tr: {
        title: "Ameliyathane Anestezi Cihazı & İş İstasyonu (CBC-ANES900)",
        shortDescription: "Entegre elektronik ventilatörlü, çift vaporizatör yuvalı yüksek güvenlikli anestezi iş istasyonu.",
        description: "CBC-ANES900, cerrahi operasyonlarda anestezi derinliğini ve hasta güvenliğini en yüksek seviyede tutmak için tasarlanmıştır. Düşük akımlı anestezi (low-flow) kabiliyeti, hassas tidal hacim kontrolü ve entegre gaz tahliye sistemiyle modern ameliyathanelerin vazgeçilmezidir.",
      },
      en: {
        title: "Anesthesia Workstation & Ventilator (CBC-ANES900)",
        shortDescription: "High-end anesthesia workstation with electronic ventilator and dual-vaporizer manifold.",
        description: "The CBC-ANES900 provides safe anesthesia delivery for general and specialized surgical procedures, featuring low-flow capabilities, precision ventilation, and integrated CO2 absorption.",
      },
      ar: {
        title: "محطة التخدير الجراحي المتكاملة (CBC-ANES900)",
        shortDescription: "محطة تخدير متطورة مع جهاز تنفس مدمج ومبخرات مزدوجة لغرف العمليات الحديثة.",
        description: "تضمن محطة التخدير CBC-ANES900 دقة متناهية في توزيع الغازات المخدرة مع دعم كامل للتنفس الصناعي ومراقبة المؤشرات الحيوية للمريض أثناء العمليات الجراحية.",
      },
      de: {
        title: "Anästhesie-Arbeitsplatz & Beatmung (CBC-ANES900)",
        shortDescription: "Präzisions-Anästhesiegerät mit integrierter Beatmungseinheit und Doppel-Verdampfer-Aufnahme.",
        description: "Der CBC-ANES900 Anästhesie-Arbeitsplatz gewährleistet höchste Patientensicherheit bei operativen Eingriffen durch modernste Niedrigfluss-Anästhesietechnik und integrierte Gasüberwachung.",
      },
      ja: {
        title: "麻酔器・ワークステーション (CBC-ANES900)",
        shortDescription: "高精度電子ベンチレータ内蔵、デュアル気化器スロット搭載麻酔システム。",
        description: "低流量麻酔（Low-Flow）に最適化され、精緻な呼吸管理と信頼性の高いガス供給システムで手術室の安全を支えます。",
      },
      zh: {
        title: "麻醉机工作站系统 (CBC-ANES900)",
        shortDescription: "配备一体化电子呼吸机与双蒸发器接口的高端麻醉工作站。",
        description: "CBC-ANES900 具备出色的低流量麻醉控制精度与智能呼吸回路加热技术，全方位保障手术过程中的麻醉深度与患者安全。",
      },
    },
  },
  {
    id: "prod-6",
    slug: "yenidogan-kuvozu-cbc-inc600",
    categorySlug: "yogun-bakim-ve-yasam-destek",
    brand: "Cebeci Medikal",
    model: "CBC-INC600 Neonatal",
    sku: "CBC-INC-600",
    condition: "SECOND_HAND",
    featured: true,
    sortOrder: 6,
    images: [
      "/images/products/kuvoz-1.webp",
      "/images/products/kuvoz-2.webp",
      "/images/products/kuvoz-3.webp",
      "/images/products/kuvoz-4.webp",
      "/images/products/kuvoz-5.webp",
      "/images/products/kuvoz-6.webp",
    ],
    technicalSpecs: {
      "Kontrol Modları": "Hava Modu ve Bebek Cilt Sıcaklığı Modu (Servo Kontrollü)",
      "Sıcaklık Ayar Aralığı": "Hava: 25.0°C - 37.0°C (Yüksek modda 39.0°C), Cilt: 34.0°C - 37.5°C",
      "Nem Kontrolü": "Ultrasonik Nemlendirme Sistemi (%30 - %95 RH Servo Kontrol)",
      "Oksijen Modülü": "Entegre Servo Oksijen Kontrol Ünitesi (%21 - %60 O2)",
      "Kabin Yapısı": "Çift Cidarlı Akrilik Başlık ile Düşük Radyant Isı Kaybı",
      "Ekstra Özellikler": "Entegre Dijital Bebek Tartısı, Kademesiz Trendelenburg Eğimi, X-Ray Kaset Tepsisi",
    },
    applications: [
      "Yenidoğan Yoğun Bakım Üniteleri (NICU Seviye I, II, III)",
      "Doğumhaneler ve Bebek Bakım Odaları",
      "Prematüre ve Düşük Doğum Ağırlıklı Bebek Bakımı",
    ],
    translations: {
      tr: {
        title: "Yenidoğan Yoğun Bakım Küvözü (CBC-INC600)",
        shortDescription: "Servo nem ve oksijen kontrollü, çift cidarlı yüksek teknoloji prematüre bebek küvözü.",
        description: "Prematüre ve kritik yenidoğan bebeklerin termal dengesini ve gelişimini korumak için tasarlanan CBC-INC600; mikroişlemcili sıcaklık ve nem regülasyonu, sessiz çalışma ortamı, dahili tartı ve çift cidarlı izolasyonu ile anne rahmi konforunu sağlar.",
      },
      en: {
        title: "Neonatal Infant Incubator (CBC-INC600)",
        shortDescription: "Microprocessor-controlled infant incubator with servo humidity and oxygen management.",
        description: "The CBC-INC600 provides a stable microenvironment for premature neonates. Features dual-wall acrylic hood, precise servo-controlled temperature and humidity, and an integrated weighing scale.",
      },
      ar: {
        title: "حاضنة الأطفال حديثي الولادة (CBC-INC600)",
        shortDescription: "حاضنة متطورة للأطفال المبتسرين مع تحكم دقيق في الحرارة والرطوبة والأكسجين.",
        description: "توفر حاضنة CBC-INC600 بيئة مثالية لرعاية ونمو الأطفال المبتسرين وحديثي الولادة مع جدران مزدوجة لعزل الحرارة ونظام مدمج لوزن الطفل ومراقبة العلامات الحيوية.",
      },
      de: {
        title: "Neonatologie-Inkubator (CBC-INC600)",
        shortDescription: "Intensiv-Inkubator für Frühgeborene mit Servo-Feuchtigkeits- und Sauerstoffregelung.",
        description: "Der CBC-INC600 schafft optimale thermische Bedingungen für Früh- und Neugeborene mit doppelwandiger Haube, präziser Befeuchtung und integrierter Babywaage.",
      },
      ja: {
        title: "新生児集中治療用保育器 (CBC-INC600)",
        shortDescription: "サーボ湿度・酸素制御機能付き二重壁構造の高性能未熟児保育器。",
        description: "未熟児の体温管理と発育環境を最適に保つため、低騒音設計と精密な温湿度・酸素管理を実現した新生児用インキュベータです。",
      },
      zh: {
        title: "新生儿重症监护培养箱 (CBC-INC600)",
        shortDescription: "具备伺服温湿度与氧浓度精准控制的双壁恒温婴儿培养箱。",
        description: "CBC-INC600 为早产儿与低体重儿提供母体般的温湿度微环境，集成数字称重与低噪音降噪系统，呵护新生生命。",
      },
    },
  },
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
