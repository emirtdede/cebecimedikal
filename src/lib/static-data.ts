import { localizeSpecKey, localizeSpecValue, localizeApplication } from "./medical-translations";
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
  translations?: Record<
    string,
    {
      title: string;
      category: string;
      description: string;
    }
  >;
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
        details: {
          features: [
            "Troubleshooting and repair for operating theater, ICU, and surgical devices",
            "IEC 62353 certified electrical safety and biomedical leakage tests",
            "Original or OEM certified clinical spare parts replacement",
            "Comprehensive service report with calibrated measurement results"
          ],
          workflow: [
            "Defect Notification & Rapid Onsite Assessment",
            "Advanced Biomedical Troubleshooting & Diagnostics",
            "Component-Level Repair & Original Parts Replacement",
            "Electrical Safety Testing & Formal Calibration Verification",
            "Clinical Delivery & Technical Service Sign-off"
          ],
          benefits: [
            "Guaranteed rapid onsite intervention in Ankara and neighboring provinces",
            "Minimizes clinical downtime for critical life-support systems",
            "Full technical warranty on all replaced components and labor"
          ]
        }
      },
      ar: {
        title: "الخدمات الفنية الطبية الحيوية وإصلاح الأعطال",
        shortDescription: "خدمات الصيانة والإصلاح السريع على مستوى المكونات الإلكترونية لأجهزة العناية المركزة وغرف العمليات والمختبرات.",
        description: "يقدم قسم الهندسة الطبية الحيوية في شركة جبجي ميديكال خدمات صيانة فنية معتمدة وشاملة لجميع الأجهزة والمعدات الطبية الحرجة في المستشفيات والعيادات. نضمن توفير قطع الغيار الأصلية وإجراء اختبارات الأمان الكهربائي ومعايرة الأجهزة وفق المعايير العالمية.",
        details: {
          features: [
            "تشخيص وإصلاح أعطال أجهزة غرف العمليات والعناية المركزة",
            "اختبارات الأمان الكهربائي ومعايير التسريب الحيوي وفق IEC 62353",
            "استبدال قطع الغيار بقطع أصلية معتمدة ومطابقة للمواصفات",
            "تقرير فني شامل يوثق كافة قياسات المعايرة والاختبارات"
          ],
          workflow: [
            "استلام البلاغ والتقييم الميداني الفوري",
            "الفحص الهندسي الطبي الحيوي وتحديد الأعطال",
            "الإصلاح المتخصص وتركيب القطع الأصلية",
            "إجراء اختبارات السلامة الكهربائية والمعايرة الدقيقة",
            "التسليم السريري والتشغيل التجريبي المعتمد"
          ],
          benefits: [
            "استجابة طارئة سريعة وخدمة دعم فني متواصلة",
            "تقليل فترات توقف الأجهزة الحرجة لضمان سلامة المرضى",
            "ضمان فني شامل على كافة قطع الغيار وخدمات الصيانة"
          ]
        }
      },
      de: {
        title: "Biomedizinischer Kundendienst & Reparatur",
        shortDescription: "Komponentenbasierter Reparaturservice für Intensiv-, OP- und Diagnosesysteme mit Qualitätsgarantie.",
        description: "Der biomedizinische Kundendienst von Cebeci Medikal bietet medizinischen Einrichtungen zuverlässige Vor-Ort- und Werkstattreparaturen für sensible Medizintechnik. Wir führen Sicherheitsüberprüfungen nach IEC 62353 durch und stellen bei Bedarf Leihgeräte bereit.",
        details: {
          features: [
            "Fehlerdiagnose und Reparatur von OP-, Intensiv- und Chirurgiegeräten",
            "Sicherheitsprüfungen und Ableitstrommessungen nach IEC 62353",
            "Einsatz von Original- und zertifizierten medizinischen Ersatzteilen",
            "Detaillierter Prüfbericht mit lückenloser Messwertdokumentation"
          ],
          workflow: [
            "Störungsmeldung & Schnelle Vor-Ort-Erstprüfung",
            "Biomedizinische Fehleranalyse & Messtechnische Diagnose",
            "Fachgerechte Reparatur & Austausch defekter Komponenten",
            "Elektrische Sicherheitsprüfung & Kalibrierkontrolle",
            "Klinische Übergabe & Abnahme durch autorisierte Techniker"
          ],
          benefits: [
            "Schnellste Reaktionszeiten und Notfall-Einsatzbereitschaft",
            "Vermeidung teurer Ausfallzeiten lebenswichtiger Medizingeräte",
            "Umfassende Gewährleistung auf alle Reparaturen und Ersatzteile"
          ]
        }
      },
      ja: {
        title: "医用工学技術サービス・故障修理",
        shortDescription: "集中治療室・手術室・検査室向け医療機器の基板レベル修理および迅速な技術サポート。",
        description: "Cebeci Medikalのバイオメディカルエンジニアチームは、病院やクリニックの重要医療機器に対し、24時間年中無休で高品質な点検・修理サービスを提供しています。IEC 62353安全規格試験と厳格な校正プロセスを経てお届けします。",
        details: {
          features: [
            "手術室機器、ICU生命維持装置および外科システムの故障診断・修理",
            "IEC 62353規格に準拠した電気安全試験および漏れ電流測定",
            "純正および認証済み医療機器スペアパーツによる精密交換",
            "校正計測データを網羅した公式テクニカルサービス報告書の発行"
          ],
          workflow: [
            "障害発生連絡受付と迅速な初期評価",
            "生体医工学専門診断および精密計測テスト",
            "基板レベル修理と純正交換部品の組み込み",
            "電気安全耐圧試験および最終校正検証",
            "臨床引き渡しおよび動作確認サインオフ"
          ],
          benefits: [
            "迅速なオンサイト対応と緊急トラブルシューティング体制",
            "重要生命維持管理機器のダウンタイムを最小化",
            "すべての修理箇所および交換部品に対する安心の保証"
          ]
        }
      },
      zh: {
        title: "生物医学技术维护与故障维修",
        shortDescription: "针对重症监护、手术室及临床诊断设备的芯片级快速故障检修与原厂配件维保服务。",
        description: "塞贝吉医疗（Cebeci Medikal）专业生物医学工程团队为各大医院、诊所及医疗机构提供全方位的技术维护与故障急修服务。执行严格的IEC 62353电气安全检测与标准计量校准，确保临床设备稳定高效运行。",
        details: {
          features: [
            "手术室设备、重症监护监护仪及麻醉机系统精密故障诊断与抢修",
            "符合 IEC 62353 国际标准的电气安全检测与微弱漏电流测量",
            "严选原厂及官方认证医用级高可靠性配件更换",
            "出具完整附带校准与计量参数的官方技术服务验收报告"
          ],
          workflow: [
            "报修响应与工程师现场快速勘验评估",
            "高级生物医学工程故障检测与性能分析",
            "专业芯片级维修与原厂精密配件替换",
            "电气安全综合测试与计量校准终检",
            "临床科室交付、试运行及验收签字"
          ],
          benefits: [
            "全天候快速响应机制与应急上门服务",
            "大幅降低重症医疗设备的停机停诊风险",
            "所有维修工序及更换部件均享受完整质保支持"
          ]
        }
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
    "id": "prod-anestezi-drager-julian-plus",
    "slug": "drager-julian-plus-anestezi-cihazi",
    "categorySlug": "ameliyathane-cihazlari",
    "brand": "Dräger",
    "model": "Julian Plus",
    "sku": "DRG-JUL-001",
    "condition": "SECOND_HAND",
    "featured": true,
    "sortOrder": 1,
    "images": [
      "/images/products/anestezi-cihazi-1.webp"
    ],
    "technicalSpecs": {
      "Ventilasyon Modları": "IPPV, SIMV, PCV, Manüel / Spontan",
      "Tidal Hacim": "20 - 1400 mL",
      "Frekans (Solunum Sayısı)": "6 - 60 bpm",
      "I:E Oranı": "1:4 ile 3:1",
      "Gaz Girişleri": "O2, N2O, Air (Hava)",
      "Vaporizatör Yuvası": "Dräger Selectatec Çift Yuva",
      "Ekran": "Entegre Monitör ve Solunum Parametreleri Takibi",
      "Garanti Durumu": "Revizyonlu & Kalibrasyonlu, 1 Yıl Cebeci Medikal Garantili"
    },
    "applications": [
      "Genel Cerrahi Ameliyathaneleri",
      "Kardiyovasküler Cerrahi",
      "Kadın Doğum ve Jinekoloji",
      "Ortopedi ve Travmatoloji",
      "Günübirlik Cerrahi Merkezleri"
    ],
    "translations": {
      "tr": {
        "title": "Dräger Julian Plus Anestezi Cihazı",
        "shortDescription": "Hassas solutma performansı ve entegre hasta monitörizasyonuna sahip, revizyonlu Dräger anestezi iş istasyonu.",
        "description": ""
      },
      "en": {
        "title": "Dräger Julian Plus Anesthesia Workstation",
        "shortDescription": "Refurbished Dräger anesthesia workstation with high-precision ventilation and integrated patient monitoring.",
        "description": "The Dräger Julian Plus is a proven and reliable anesthesia workstation suitable for adult and pediatric surgical procedures. Equipped with an electronically controlled ventilator, precision gas mixer, and integrated monitoring interface. Fully refurbished, calibrated, and backed by a 1-year Cebeci Medikal warranty."
      },
      "de": {
        "title": "Dräger Julian Plus Cihazı (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Dräger mit 1 Jahr Garantie.",
        "description": "The Dräger Julian Plus is a proven and reliable anesthesia workstation suitable for adult and pediatric surgical procedures. Equipped with an electronically controlled ventilator, precision gas mixer, and integrated monitoring interface. Fully refurbished, calibrated, and backed by a 1-year Cebeci Medikal warranty. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Dräger Julian Plus (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Dräger مع ضمان لمدة عام كامل.",
        "description": " تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Dräger Julian Plus リファービッシュ医療機器",
        "shortDescription": "Dräger製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "The Dräger Julian Plus is a proven and reliable anesthesia workstation suitable for adult and pediatric surgical procedures. Equipped with an electronically controlled ventilator, precision gas mixer, and integrated monitoring interface. Fully refurbished, calibrated, and backed by a 1-year Cebeci Medikal warranty. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Dräger Julian Plus 翻新医疗设备",
        "shortDescription": "Dräger 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "The Dräger Julian Plus is a proven and reliable anesthesia workstation suitable for adult and pediatric surgical procedures. Equipped with an electronically controlled ventilator, precision gas mixer, and integrated monitoring interface. Fully refurbished, calibrated, and backed by a 1-year Cebeci Medikal warranty. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-anestezi-atese-ans200",
    "slug": "atese-ans200-anestezi-cihazi",
    "categorySlug": "ameliyathane-cihazlari",
    "brand": "Ateşe",
    "model": "ANS200",
    "sku": "ATS-ANS-002",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 2,
    "images": [
      "/images/products/anestezi-cihazi-2.webp"
    ],
    "technicalSpecs": {
      "Kullanım Alanı": "Yetişkin ve Pediatrik Ameliyathaneler",
      "Gaz Sistemi": "O2, N2O, Basınçlı Medikal Hava",
      "Ventilatör Tipi": "Pnömatik Tahrikli, Elektronik Kontrollü",
      "Vaporizatör Bağlantısı": "Standart Selectatec Uyumlu",
      "Güvenlik Sistemi": "Hipoksik Koruma, O2 Kesilme Alarmı, Emniyet Valfi",
      "Durum": "Test Edilmiş, Revizyonlu 2. El Medikal Cihaz (1 Yıl Garantili)"
    },
    "applications": [
      "Genel Ameliyathane",
      "Plastik ve Rekonstrüktif Cerrahi",
      "Göz ve KBB Klinik Operasyonları",
      "Hayvan Hastaneleri ve Veteriner Cerrahi Merkezleri"
    ],
    "translations": {
      "tr": {
        "title": "Ateşe ANS200 Anestezi Cihazı",
        "shortDescription": "Yerli cerrahi operasyon standartlarına uygun, güvenilir ve ekonomik revizyonlu anestezi cihazı.",
        "description": "Ateşe ANS200, kliniklerde ve cerrahi merkezlerde genel anestezi uygulamaları için geliştirilmiş sağlam gövdeli anestezi cihazıdır. Mekanik ve pnömatik tüm aksamları Cebeci Medikal biyomedikal laboratuvarlarında test edilmiş, gaz sızdırmazlık kontrolleri yapılmış olup kullanıma hazır durumdadır."
      },
      "en": {
        "title": "Ateşe ANS200 Anesthesia Machine",
        "shortDescription": "Durable and reliable refurbished anesthesia machine designed for clinical and surgical operations.",
        "description": "The Ateşe ANS200 is a robust anesthesia unit engineered for safe delivery of inhalational anesthetics during surgery. Inspected, pneumatic-leak tested, calibrated, and provided with full warranty."
      },
      "de": {
        "title": "Ateşe ANS200 Cihazı (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Ateşe mit 1 Jahr Garantie.",
        "description": "The Ateşe ANS200 is a robust anesthesia unit engineered for safe delivery of inhalational anesthetics during surgery. Inspected, pneumatic-leak tested, calibrated, and provided with full warranty. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Ateşe ANS200 (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Ateşe مع ضمان لمدة عام كامل.",
        "description": "Ateşe ANS200, kliniklerde ve cerrahi merkezlerde genel anestezi uygulamaları için geliştirilmiş sağlam gövdeli anestezi cihazıdır. Mekanik ve pnömatik tüm aksamları Cebeci Medikal biyomedikal laboratuvarlarında test edilmiş, gaz sızdırmazlık kontrolleri yapılmış olup kullanıma hazır durumdadır. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Ateşe ANS200 リファービッシュ医療機器",
        "shortDescription": "Ateşe製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "The Ateşe ANS200 is a robust anesthesia unit engineered for safe delivery of inhalational anesthetics during surgery. Inspected, pneumatic-leak tested, calibrated, and provided with full warranty. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Ateşe ANS200 翻新医疗设备",
        "shortDescription": "Ateşe 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "The Ateşe ANS200 is a robust anesthesia unit engineered for safe delivery of inhalational anesthetics during surgery. Inspected, pneumatic-leak tested, calibrated, and provided with full warranty. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-anestezi-ams-200",
    "slug": "ams-200-anestezi-cihazi",
    "categorySlug": "ameliyathane-cihazlari",
    "brand": "AMS",
    "model": "200",
    "sku": "AMS-200-003",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 3,
    "images": [
      "/images/products/anestezi-cihazi-3.webp"
    ],
    "technicalSpecs": {
      "Tip": "Kompakt Ameliyathane Anestezi Ünitesi",
      "Akış Ölçer": "Yüksek Hassasiyetli Rotametre Bloğu",
      "Solunum Devresi": "Otomatik ve Manuel Solutma Anahtarlamalı",
      "Gaz Giriş Basıncı": "280 - 600 kPa",
      "Garanti": "1 Yıl Tam Teknik Servis Garantisi"
    },
    "applications": [
      "Ameliyathaneler",
      "Küçük Cerrahi Müdahale Odaları",
      "Tıp Merkezleri"
    ],
    "translations": {
      "tr": {
        "title": "AMS 200 Anestezi Cihazı",
        "shortDescription": "Kompakt yapılı, stabil akış ölçerli ve revizyonlu 2. el cerrahi anestezi ünitesi.",
        "description": "AMS 200 anestezi cihazı, pratik kullanım ve güvenilir gaz dağıtım sistemi sunan bir ameliyathane cihazıdır. Periyodik bakımı yapılmış, emniyet valfleri test edilmiş ve garantili olarak teslim edilmektedir."
      },
      "en": {
        "title": "AMS 200 Anesthesia Unit",
        "shortDescription": "Compact, reliable refurbished anesthesia device for general surgical interventions.",
        "description": "AMS 200 delivers stable gas flow and ventilation control for surgical operating rooms. Fully checked and verified by biomedical engineers."
      },
      "de": {
        "title": "AMS 200 Cihazı (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von AMS mit 1 Jahr Garantie.",
        "description": "AMS 200 delivers stable gas flow and ventilation control for surgical operating rooms. Fully checked and verified by biomedical engineers. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "AMS 200 (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة AMS مع ضمان لمدة عام كامل.",
        "description": "AMS 200 anestezi cihazı, pratik kullanım ve güvenilir gaz dağıtım sistemi sunan bir ameliyathane cihazıdır. Periyodik bakımı yapılmış, emniyet valfleri test edilmiş ve garantili olarak teslim edilmektedir. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "AMS 200 リファービッシュ医療機器",
        "shortDescription": "AMS製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "AMS 200 delivers stable gas flow and ventilation control for surgical operating rooms. Fully checked and verified by biomedical engineers. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "AMS 200 翻新医疗设备",
        "shortDescription": "AMS 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "AMS 200 delivers stable gas flow and ventilation control for surgical operating rooms. Fully checked and verified by biomedical engineers. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-aspirator-atmos-c161",
    "slug": "atmos-c161-cerrahi-aspirator",
    "categorySlug": "ameliyathane-cihazlari",
    "brand": "Atmos",
    "model": "C 161",
    "sku": "ATM-C161-004",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 4,
    "images": [
      "/images/products/aspirator-1.webp"
    ],
    "technicalSpecs": {
      "Emiş Kapasitesi": "16 L/dakika",
      "Maksimum Vakum Gücü": "-80 kPa (-800 mbar)",
      "Kavanoz Sistemi": "Otoseptik & Taşma Korumalı Çift Kavanoz",
      "Çalışma Prensibi": "Yağsız Membran Pompa, Sürekli Çalışmaya Uygun",
      "Ses Seviyesi": "Sessiz Çalışma (< 48 dB)",
      "Garanti": "1 Yıl Cebeci Medikal Garantisi"
    },
    "applications": [
      "Ameliyathane ve Cerrahi Müdahale",
      "Kulak Burun Boğaz (KBB) Poliklinikleri",
      "Endoskopi ve Bronkoskopi Odaları",
      "Acil Servis ve Yoğun Bakım"
    ],
    "translations": {
      "tr": {
        "title": "Atmos C 161 Cerrahi Aspiratör",
        "shortDescription": "Alman Atmos mühendisliği ile üretilmiş yüksek vakum hassasiyetli revizyonlu cerrahi aspiratör.",
        "description": "Atmos C 161, cerrahi girişimler ve poliklinik aspirasyon ihtiyaçları için tasarlanmış yüksek performanslı aspiratördür. Yağsız pompa mekanizması, hidrostatik taşma emniyeti ve sessiz motoru ile klinik standartları eksiksiz karşılar."
      },
      "en": {
        "title": "Atmos C 161 Surgical Suction Unit",
        "shortDescription": "German engineered, high-precision refurbished surgical aspirator for clinical suctioning.",
        "description": "The Atmos C 161 provides powerful, low-noise suction with overflow safety mechanisms for surgical theaters and outpatient clinics."
      },
      "de": {
        "title": "Atmos C 161 Aspiratör (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Atmos mit 1 Jahr Garantie.",
        "description": "The Atmos C 161 provides powerful, low-noise suction with overflow safety mechanisms for surgical theaters and outpatient clinics. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Atmos C 161 (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Atmos مع ضمان لمدة عام كامل.",
        "description": "Atmos C 161, cerrahi girişimler ve poliklinik aspirasyon ihtiyaçları için tasarlanmış yüksek performanslı aspiratördür. Yağsız pompa mekanizması, hidrostatik taşma emniyeti ve sessiz motoru ile klinik standartları eksiksiz karşılar. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Atmos C 161 リファービッシュ医療機器",
        "shortDescription": "Atmos製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "The Atmos C 161 provides powerful, low-noise suction with overflow safety mechanisms for surgical theaters and outpatient clinics. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Atmos C 161 翻新医疗设备",
        "shortDescription": "Atmos 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "The Atmos C 161 provides powerful, low-noise suction with overflow safety mechanisms for surgical theaters and outpatient clinics. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-aspirator-bicakcilar",
    "slug": "bicakcilar-cerrahi-aspirator",
    "categorySlug": "ameliyathane-cihazlari",
    "brand": "Bıçakçılar",
    "model": "Surgiline Cerrahi Aspiratör",
    "sku": "BCK-ASP-005",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 5,
    "images": [
      "/images/products/aspirator-2.webp"
    ],
    "technicalSpecs": {
      "Emiş Debisi": "Yüksek Debi / Yüksek Vakum (50 - 60 L/dk)",
      "Vakum Aralığı": "0 ile -0.9 bar ayarlanabilir",
      "Toplama Kavanozları": "2 x 3000 mL veya 2 x 5000 mL Polikarbonat Otoklavlanabilir",
      "Tekerlek Sistemi": "Kilitlenebilir Antistatik Döner Tekerlekler",
      "Kondisyon": "Revizyonlu, Pompa ve Filtre Bakımları Yapılmış"
    },
    "applications": [
      "Genel Cerrahi ve Kadın Doğum Ameliyathaneleri",
      "Liposuction ve Plastik Cerrahi",
      "Yoğun Bakım Üniteleri",
      "Acil Servisler"
    ],
    "translations": {
      "tr": {
        "title": "Bıçakçılar Cerrahi Aspiratör Cihazı",
        "shortDescription": "Ağır cerrahi ameliyatlar için tasarlanmış, çift kavanozlu yüksek emiş güçlü revizyonlu aspiratör.",
        "description": "Bıçakçılar cerrahi aspiratör sistemi, ameliyathane ortamında kan, sıvı ve partiküllerin hızla uzaklaştırılmasını sağlayan dayanıklı ve güçlü bir cihazdır. Pompa contaları, vakum göstergeleri ve filtre sistemleri tamamen yenilenmiştir."
      },
      "en": {
        "title": "Bıçakçılar Surgical Suction Aspirator",
        "shortDescription": "Heavy-duty dual-jar medical aspirator for operating rooms and surgical suction.",
        "description": "Designed for maximum surgical reliability with high vacuum capacity, autoclavable jars, and mobile trolley construction."
      },
      "de": {
        "title": "Bıçakçılar Surgiline Cerrahi Aspiratör Cihazı (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Bıçakçılar mit 1 Jahr Garantie.",
        "description": "Designed for maximum surgical reliability with high vacuum capacity, autoclavable jars, and mobile trolley construction. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Bıçakçılar Surgiline Cerrahi Aspiratör (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Bıçakçılar مع ضمان لمدة عام كامل.",
        "description": "Bıçakçılar cerrahi aspiratör sistemi, ameliyathane ortamında kan, sıvı ve partiküllerin hızla uzaklaştırılmasını sağlayan dayanıklı ve güçlü bir cihazdır. Pompa contaları, vakum göstergeleri ve filtre sistemleri tamamen yenilenmiştir. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Bıçakçılar Surgiline Cerrahi Aspiratör リファービッシュ医療機器",
        "shortDescription": "Bıçakçılar製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Designed for maximum surgical reliability with high vacuum capacity, autoclavable jars, and mobile trolley construction. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Bıçakçılar Surgiline Cerrahi Aspiratör 翻新医疗设备",
        "shortDescription": "Bıçakçılar 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Designed for maximum surgical reliability with high vacuum capacity, autoclavable jars, and mobile trolley construction. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-aspirator-uzumcu-pa2",
    "slug": "uzumcu-pa2-cerrahi-aspirator",
    "categorySlug": "ameliyathane-cihazlari",
    "brand": "Üzümcü",
    "model": "PA-2",
    "sku": "UZM-PA2-006",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 6,
    "images": [
      "/images/products/aspirator-3.webp"
    ],
    "technicalSpecs": {
      "Vakum Kapasitesi": "60 L/dakika",
      "Maksimum Vakum": "-0.90 bar (-675 mmHg)",
      "Kavanozlar": "2 x 5 Litre Polikarbonat, Taşma Valfli",
      "Pedal Kontrolü": "Var (Ayak Pedalı ile Açma/Kapama)",
      "Gövde": "Paslanmaz Çelik ve Dayanıklı ABS",
      "Garanti": "1 Yıl Cebeci Medikal Garantili"
    },
    "applications": [
      "Ameliyathane Operasyonları",
      "Acil Travma Merkezleri",
      "Klinik Cerrahi Birimleri"
    ],
    "translations": {
      "tr": {
        "title": "Üzümcü PA-2 Cerrahi Aspiratör",
        "shortDescription": "Yüksek emiş debili, ayak pedallı ve çift kavanozlu profesyonel cerrahi aspiratör.",
        "description": "Üzümcü PA-2, cerrahi müdahalelerde kesintisiz vakum gücü sağlayan yerli standartların öncü aspiratör modelidir. Cebeci Medikal tarafından tüm testleri yapılmış, emiş hortumları ve filtreleri yenilenmiştir."
      },
      "en": {
        "title": "Üzümcü PA-2 Surgical Aspirator",
        "shortDescription": "Professional high-flow surgical suction unit with foot switch and dual 5L collection jars.",
        "description": "Reliable mobile surgical aspirator offering up to 60 L/min flow rate, hydrostatic protection, and robust construction."
      },
      "de": {
        "title": "Üzümcü PA-2 Aspiratör (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Üzümcü mit 1 Jahr Garantie.",
        "description": "Reliable mobile surgical aspirator offering up to 60 L/min flow rate, hydrostatic protection, and robust construction. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Üzümcü PA-2 (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Üzümcü مع ضمان لمدة عام كامل.",
        "description": "Üzümcü PA-2, cerrahi müdahalelerde kesintisiz vakum gücü sağlayan yerli standartların öncü aspiratör modelidir. Cebeci Medikal tarafından tüm testleri yapılmış, emiş hortumları ve filtreleri yenilenmiştir. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Üzümcü PA-2 リファービッシュ医療機器",
        "shortDescription": "Üzümcü製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Reliable mobile surgical aspirator offering up to 60 L/min flow rate, hydrostatic protection, and robust construction. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Üzümcü PA-2 翻新医疗设备",
        "shortDescription": "Üzümcü 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Reliable mobile surgical aspirator offering up to 60 L/min flow rate, hydrostatic protection, and robust construction. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-defibrilator-nihon-kohden-tec7631k",
    "slug": "nihon-kohden-cardiolife-tec-7631k-defibrilator",
    "categorySlug": "yogun-bakim-ve-yasam-destek",
    "brand": "Nihon Kohden",
    "model": "Cardiolife TEC-7631K",
    "sku": "NHK-TEC-007",
    "condition": "SECOND_HAND",
    "featured": true,
    "sortOrder": 7,
    "images": [
      "/images/products/defibrilator-1.webp"
    ],
    "technicalSpecs": {
      "Dalga Formu": "ActiBiphasic (Bifazik Dalga Teknolojisi)",
      "Enerji Seçenekleri": "2J ile 270J arası hassas dozlama",
      "Çalışma Modları": "Manuel Defibrilasyon, AED, Senkronize Kardiyoversiyon, Harici Pacer",
      "Ekran": "Renkli TFT LCD Monitör (EKG, SpO2, Kalp Tepe Atımı)",
      "Yazıcı": "Entegre Yüksek Hızlı Termal EKG Yazıcısı",
      "Batarya": "Yeni Bataryalı, Mobil Kullanıma Uygun",
      "Garanti": "1 Yıl Cebeci Medikal Güvencesi"
    },
    "applications": [
      "Acil Servis & Resüsitasyon (Kırmızı Alan)",
      "Koroner ve Genel Yoğun Bakım",
      "Ameliyathane ve Anestezi Sonrası Bakım (PACU)",
      "Ambulans ve Hasta Nakil Ekipleri"
    ],
    "translations": {
      "tr": {
        "title": "Nihon Kohden Cardiolife TEC-7631K Defibrilatör",
        "shortDescription": "ActiBiphasic teknolojili, renkli ekranlı ve pacer özellikli Japon teknolojisi profesyonel defibrilatör.",
        "description": "Nihon Kohden TEC-7631K Cardiolife serisi, kritik kardiyak resüsitasyon anlarında en hızlı şarj süresi (3 saniyede 200J) ve yüksek doğruluklu bifazik deşarj sağlayan üst segment defibrilatördür. Kaşık elektrotları, hasta kabloları ve yeni bataryası ile tam çalışır durumdadır."
      },
      "en": {
        "title": "Nihon Kohden Cardiolife TEC-7631K Defibrillator",
        "shortDescription": "Biphasic multi-parameter defibrillator/monitor with external pacing and fast energy charge.",
        "description": "Engineered with Nihon Kohden's proprietary ActiBiphasic waveform technology, ensuring rapid and safe defibrillation in emergency cardiac scenarios."
      },
      "de": {
        "title": "Nihon Kohden Cardiolife TEC-7631K Defibrilatör (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Nihon Kohden mit 1 Jahr Garantie.",
        "description": "Engineered with Nihon Kohden's proprietary ActiBiphasic waveform technology, ensuring rapid and safe defibrillation in emergency cardiac scenarios. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Nihon Kohden Cardiolife TEC-7631K (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Nihon Kohden مع ضمان لمدة عام كامل.",
        "description": "Nihon Kohden TEC-7631K Cardiolife serisi, kritik kardiyak resüsitasyon anlarında en hızlı şarj süresi (3 saniyede 200J) ve yüksek doğruluklu bifazik deşarj sağlayan üst segment defibrilatördür. Kaşık elektrotları, hasta kabloları ve yeni bataryası ile tam çalışır durumdadır. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Nihon Kohden Cardiolife TEC-7631K リファービッシュ医療機器",
        "shortDescription": "Nihon Kohden製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Engineered with Nihon Kohden's proprietary ActiBiphasic waveform technology, ensuring rapid and safe defibrillation in emergency cardiac scenarios. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Nihon Kohden Cardiolife TEC-7631K 翻新医疗设备",
        "shortDescription": "Nihon Kohden 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Engineered with Nihon Kohden's proprietary ActiBiphasic waveform technology, ensuring rapid and safe defibrillation in emergency cardiac scenarios. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-defibrilator-cardioline-ep700",
    "slug": "cardioline-ep700-defibrilator-monitor",
    "categorySlug": "yogun-bakim-ve-yasam-destek",
    "brand": "Cardioline",
    "model": "EP700",
    "sku": "CDL-EP7-008",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 8,
    "images": [
      "/images/products/defibrilator-2.webp"
    ],
    "technicalSpecs": {
      "Cihaz Tipi": "Klinik Defibrilatör ve EKG Monitörizasyon Sistemi",
      "Enerji Çıkışı": "Ayarlanabilir Enerji Kademeleri",
      "Monitör": "Dahili EKG Dalga Formu Ekranı",
      "Kaşık Tipi": "Yetişkin ve Pediatrik Entegre Kaşıklar",
      "Durum": "Test Edilmiş & Revizyonlu, 1 Yıl Garantili"
    },
    "applications": [
      "Kardiyoloji Poliklinikleri",
      "Acil Müdahale Odaları",
      "Tıp Merkezleri ve Özel Hastaneler"
    ],
    "translations": {
      "tr": {
        "title": "Cardioline EP700 Defibrilatör & Monitör",
        "shortDescription": "İtalyan Cardioline üretimi, stabil EKG takipli ve revizyonlu klinik defibrilatör.",
        "description": "Cardioline EP700, kardiyak ritim analizi ve acil defibrilasyon gereksinimlerini tek cihazda birleştiren dayanıklı bir medikal cihazdır. Enerji deşarj testleri ve elektriksel güvenlik kalibrasyonları yapılmıştır."
      },
      "en": {
        "title": "Cardioline EP700 Defibrillator & Monitor",
        "shortDescription": "Reliable Italian defibrillator with built-in ECG monitoring screen and paddle electrodes.",
        "description": "Cardioline EP700 offers straightforward operation, accurate energy delivery, and clear ECG wave presentation."
      },
      "de": {
        "title": "Cardioline EP700 Monitör (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Cardioline mit 1 Jahr Garantie.",
        "description": "Cardioline EP700 offers straightforward operation, accurate energy delivery, and clear ECG wave presentation. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Cardioline EP700 (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Cardioline مع ضمان لمدة عام كامل.",
        "description": "Cardioline EP700, kardiyak ritim analizi ve acil defibrilasyon gereksinimlerini tek cihazda birleştiren dayanıklı bir medikal cihazdır. Enerji deşarj testleri ve elektriksel güvenlik kalibrasyonları yapılmıştır. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Cardioline EP700 リファービッシュ医療機器",
        "shortDescription": "Cardioline製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Cardioline EP700 offers straightforward operation, accurate energy delivery, and clear ECG wave presentation. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Cardioline EP700 翻新医疗设备",
        "shortDescription": "Cardioline 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Cardioline EP700 offers straightforward operation, accurate energy delivery, and clear ECG wave presentation. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-defibrilator-primedic-dm3",
    "slug": "primedic-defi-monitor-dm3-defibrilator",
    "categorySlug": "yogun-bakim-ve-yasam-destek",
    "brand": "Primedic",
    "model": "Defi-Monitor DM3",
    "sku": "PRM-DM3-009",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 9,
    "images": [
      "/images/products/defibrilator-3.webp"
    ],
    "technicalSpecs": {
      "Menşei": "Almanya (Metrax GmbH)",
      "Dalga Tipi": "Akım Kontrollü Bifazik CCD (Current Controlled Defibrillation)",
      "Enerji": "5J - 360J Geniş Enerji Skalası",
      "Modlar": "Manuel, Senkron Kardiyoversiyon, EKG Monitör",
      "Ekran": "Yüksek Kontrastlı Aydınlatmalı LCD",
      "Yazıcı": "Entegre Termal Rapor Yazıcısı"
    },
    "applications": [
      "Acil Yardım ve Ambulans",
      "Yoğun Bakım Üniteleri",
      "Cerrahi Servisler ve Klinikler"
    ],
    "translations": {
      "tr": {
        "title": "Primedic Defi-Monitor DM3 Defibrilatör",
        "shortDescription": "Alman kalitesiyle üretilmiş, CCD akım kontrollü bifazik deşarja sahip revizyonlu defibrilatör.",
        "description": "Primedic Defi-Monitor DM3, hasta empedansına göre akımı otomatik ayarlayan CCD teknolojisi sayesinde miyokardiyal dokuyu koruyarak etkin defibrilasyon sağlar. Cebeci Medikal güvencesiyle 1 yıl garantilidir."
      },
      "en": {
        "title": "Primedic Defi-Monitor DM3 Biphasic Defibrillator",
        "shortDescription": "German Metrax engineered defibrillator featuring Current Controlled Defibrillation (CCD).",
        "description": "Primedic DM3 combines rugged hospital/transport build with intelligent biphasic pulse delivery and thermal documentation."
      },
      "de": {
        "title": "Primedic Defi-Monitor DM3 Defibrilatör (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Primedic mit 1 Jahr Garantie.",
        "description": "Primedic DM3 combines rugged hospital/transport build with intelligent biphasic pulse delivery and thermal documentation. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Primedic Defi-Monitor DM3 (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Primedic مع ضمان لمدة عام كامل.",
        "description": "Primedic Defi-Monitor DM3, hasta empedansına göre akımı otomatik ayarlayan CCD teknolojisi sayesinde miyokardiyal dokuyu koruyarak etkin defibrilasyon sağlar. Cebeci Medikal güvencesiyle 1 yıl garantilidir. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Primedic Defi-Monitor DM3 リファービッシュ医療機器",
        "shortDescription": "Primedic製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Primedic DM3 combines rugged hospital/transport build with intelligent biphasic pulse delivery and thermal documentation. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Primedic Defi-Monitor DM3 翻新医疗设备",
        "shortDescription": "Primedic 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Primedic DM3 combines rugged hospital/transport build with intelligent biphasic pulse delivery and thermal documentation. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-ekg-cardioline-ar600adv",
    "slug": "cardioline-ar600adv-ekg-cihazi",
    "categorySlug": "fizyolojik-sinyal-izleyiciler",
    "brand": "Cardioline",
    "model": "ar600adv",
    "sku": "CDL-AR6-010",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 10,
    "images": [
      "/images/products/ekg-cihazi-1.webp"
    ],
    "technicalSpecs": {
      "Kanal Sayısı": "3 Kanallı Eşzamanlı Kayıt ve Baskı",
      "Derivasyon": "12 Standart EKG Derivasyonu",
      "Yazıcı": "60 mm Termal Rulo Yazıcı",
      "Çalışma Modu": "Manuel, Otomatik, Zaman Ayarlı",
      "Batarya": "Şarj Edilebilir Dahili Batarya",
      "Garanti": "1 Yıl Tam Garanti"
    },
    "applications": [
      "Aile Hekimlikleri ve Sağlık Ocakları",
      "Poliklinik Muayene Odaları",
      "İşyeri Hekimliği",
      "Evde Sağlık Hizmetleri"
    ],
    "translations": {
      "tr": {
        "title": "Cardioline ar600adv 3 Kanallı EKG Cihazı",
        "shortDescription": "Taşınabilir, hafif ve yüksek baskı kalitesine sahip İtalyan üretimi 3 kanallı EKG.",
        "description": "Cardioline ar600adv, kompakt boyutu ve pratik arayüzü ile rutin EKG çekimlerinde hızlı ve güvenilir teşhis imkanı sunar. Hasta kablosu, mandalları ve elektrotları ile eksiksiz teslim edilir."
      },
      "en": {
        "title": "Cardioline ar600adv 3-Channel ECG Machine",
        "shortDescription": "Portable, lightweight 3-channel electrocardiograph with high-resolution thermal printer.",
        "description": "The Cardioline ar600adv offers reliable 12-lead ECG acquisition with automatic/manual recording modes for outpatient and primary care practices."
      },
      "de": {
        "title": "Cardioline ar600adv Cihazı (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Cardioline mit 1 Jahr Garantie.",
        "description": "The Cardioline ar600adv offers reliable 12-lead ECG acquisition with automatic/manual recording modes for outpatient and primary care practices. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Cardioline ar600adv (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Cardioline مع ضمان لمدة عام كامل.",
        "description": "Cardioline ar600adv, kompakt boyutu ve pratik arayüzü ile rutin EKG çekimlerinde hızlı ve güvenilir teşhis imkanı sunar. Hasta kablosu, mandalları ve elektrotları ile eksiksiz teslim edilir. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Cardioline ar600adv リファービッシュ医療機器",
        "shortDescription": "Cardioline製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "The Cardioline ar600adv offers reliable 12-lead ECG acquisition with automatic/manual recording modes for outpatient and primary care practices. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Cardioline ar600adv 翻新医疗设备",
        "shortDescription": "Cardioline 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "The Cardioline ar600adv offers reliable 12-lead ECG acquisition with automatic/manual recording modes for outpatient and primary care practices. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-ekg-plusmed-pmecg1200b",
    "slug": "plusmed-pmecg1200b-12-kanalli-ekg-cihazi",
    "categorySlug": "fizyolojik-sinyal-izleyiciler",
    "brand": "Plusmed",
    "model": "pmECG1200B",
    "sku": "PLS-ECG-011",
    "condition": "SECOND_HAND",
    "featured": true,
    "sortOrder": 11,
    "images": [
      "/images/products/ekg-cihazi-2.webp"
    ],
    "technicalSpecs": {
      "Kanal Sayısı": "12 Kanallı Eşzamanlı Kayıt ve Görüntüleme",
      "Ekran": "Geniş Renkli Dokunmatik LCD Ekran",
      "Analiz": "Otomatik EKG Ölçüm ve Yorumlama Algoritması",
      "Yazıcı": "210 mm / 216 mm Geniş Termal Kağıt Baskısı",
      "Filtreler": "AC, EMG, Taban Çizgisi Drift Filtreleri",
      "Hafıza": "Dahili Hasta Kayıt Belleği ve USB Dışa Aktarım"
    },
    "applications": [
      "Kardiyoloji Servisleri",
      "Hastaneler ve Tıp Merkezleri",
      "Check-up ve Efor Öncesi Değerlendirme Merkezleri"
    ],
    "translations": {
      "tr": {
        "title": "Plusmed pmECG1200B 12 Kanallı EKG Cihazı",
        "shortDescription": "Geniş ekranlı, otomatik aritmi tespit ve yorumlamalı 12 kanallı dijital elektrokardiyograf.",
        "description": "Plusmed pmECG1200B, 12 kanal eşzamanlı çekim ve A4 formatına yakın geniş kağıt baskısı ile kardiyolojik detayları net şekilde raporlar. Tüm filtreleme ve derivasyon kalibrasyonları yapılmıştır."
      },
      "en": {
        "title": "Plusmed pmECG1200B 12-Channel ECG Machine",
        "shortDescription": "High-end 12-channel digital ECG with touchscreen display and automatic diagnostic interpretation.",
        "description": "Provides simultaneous 12-lead acquisition, broad paper printouts, and digital storage capabilities for clinical cardiology."
      },
      "de": {
        "title": "Plusmed pmECG1200B Cihazı (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Plusmed mit 1 Jahr Garantie.",
        "description": "Provides simultaneous 12-lead acquisition, broad paper printouts, and digital storage capabilities for clinical cardiology. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Plusmed pmECG1200B (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Plusmed مع ضمان لمدة عام كامل.",
        "description": "Plusmed pmECG1200B, 12 kanal eşzamanlı çekim ve A4 formatına yakın geniş kağıt baskısı ile kardiyolojik detayları net şekilde raporlar. Tüm filtreleme ve derivasyon kalibrasyonları yapılmıştır. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Plusmed pmECG1200B リファービッシュ医療機器",
        "shortDescription": "Plusmed製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Provides simultaneous 12-lead acquisition, broad paper printouts, and digital storage capabilities for clinical cardiology. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Plusmed pmECG1200B 翻新医疗设备",
        "shortDescription": "Plusmed 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Provides simultaneous 12-lead acquisition, broad paper printouts, and digital storage capabilities for clinical cardiology. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-koter-petas-petkot-500s",
    "slug": "petas-petkot-500s-elektrokoter-cihazi",
    "categorySlug": "ameliyathane-cihazlari",
    "brand": "Petaş",
    "model": "Petkot 500S",
    "sku": "PTS-500S-012",
    "condition": "SECOND_HAND",
    "featured": true,
    "sortOrder": 12,
    "images": [
      "/images/products/elektrokoter-1.webp"
    ],
    "technicalSpecs": {
      "Maksimum Çıkış Gücü": "400W - 500W Cerrahi Kesme & Koagülasyon",
      "Modlar": "Monopolar Kesme (Pure/Blend), Monopolar Koagülasyon (Fulguration/Spray), Bipolar Koagülasyon",
      "Güvenlik Sistemi": "REM (Hasta Plakası Temas Güvenlik Sistemi)",
      "Pedal ve El Kumandası": "Çift Pedallı Ayak Anahtarı ve Kalemden Aktivasyon",
      "Garanti": "1 Yıl Tam Teknik Servis Garantili"
    },
    "applications": [
      "Genel Cerrahi ve Laparoskopi",
      "Beyin ve Sinir Cerrahisi (Nöroşirürji)",
      "Üroloji ve Jinekoloji",
      "Ortopedi ve Plastik Cerrahi"
    ],
    "translations": {
      "tr": {
        "title": "Petaş Petkot 500S Elektrokoter Cihazı",
        "shortDescription": "Yüksek frekanslı monopolar ve bipolar cerrahi kesme-koagülasyon ünitesi.",
        "description": "Petaş Petkot 500S, geniş cerrahi yelpazede doku kesme ve kanama durdurma (hemostaz) işlemlerini yüksek hassasiyetle gerçekleştiren güçlü bir elektrocerrahi ünitesidir. Biyomedikal güç çıkış testleri ve hasta plakası güvenlik devreleri eksiksiz doğrulanmıştır."
      },
      "en": {
        "title": "Petaş Petkot 500S Electrosurgical Unit",
        "shortDescription": "High-frequency monopolar and bipolar electrosurgical generator with REM plate safety monitoring.",
        "description": "The Petkot 500S delivers precise cutting and coagulation across diverse surgical specialties with proven reliability."
      },
      "de": {
        "title": "Petaş Petkot 500S Cihazı (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Petaş mit 1 Jahr Garantie.",
        "description": "The Petkot 500S delivers precise cutting and coagulation across diverse surgical specialties with proven reliability. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Petaş Petkot 500S (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Petaş مع ضمان لمدة عام كامل.",
        "description": "Petaş Petkot 500S, geniş cerrahi yelpazede doku kesme ve kanama durdurma (hemostaz) işlemlerini yüksek hassasiyetle gerçekleştiren güçlü bir elektrocerrahi ünitesidir. Biyomedikal güç çıkış testleri ve hasta plakası güvenlik devreleri eksiksiz doğrulanmıştır. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Petaş Petkot 500S リファービッシュ医療機器",
        "shortDescription": "Petaş製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "The Petkot 500S delivers precise cutting and coagulation across diverse surgical specialties with proven reliability. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Petaş Petkot 500S 翻新医疗设备",
        "shortDescription": "Petaş 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "The Petkot 500S delivers precise cutting and coagulation across diverse surgical specialties with proven reliability. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-endovizyon-sistemi",
    "slug": "endovizyon-kamera-ve-goruntuleme-sistemi",
    "categorySlug": "endovizyon-sistemleri",
    "brand": "Cebeci Medikal",
    "model": "EV-System",
    "sku": "CBC-EVS-013",
    "condition": "SECOND_HAND",
    "featured": true,
    "sortOrder": 13,
    "images": [
      "/images/products/endovizyon-sistemi-1.webp"
    ],
    "technicalSpecs": {
      "Sistem Bileşenleri": "Medikal HD Kamera Kontrol Ünitesi, Kamera Kafası, Soğuk Işık Kaynağı, Medikal Monitör ve Taşıma Kulesi",
      "Kamera Çözünürlüğü": "Full HD Medikal Görüntüleme",
      "Işık Kaynağı": "Yüksek Lümen Güçlü Işık Çıkışı",
      "Kule": "Kilitlenebilir Tekerlekli, Ayarlanabilir Raflı ve Çoklu Prizli Medikal Taşıma Arabası",
      "Durum": "Kombine Revizyonlu Sistem, 1 Yıl Garantili"
    },
    "applications": [
      "Laparoskopik Cerrahi",
      "Artroskopi ve Ortopedi",
      "Sistoskopi ve Histeroskopi",
      "KBB Endoskopik Girişimler"
    ],
    "translations": {
      "tr": {
        "title": "Endovizyon Kamera ve Görüntüleme Sistemi",
        "shortDescription": "Laparoskopi, artroskopi ve minimal invaziv cerrahiler için komple revizyonlu endovizyon kulesi.",
        "description": "Komple endovizyon sistemi; medikal monitör, Full HD endoskopi kamerası, soğuk ışık kaynağı ve ergonomik taşıma kulesiyle anahtar teslim cerrahi görüntüleme çözümü sunar. Tüm optik ve elektronik bağlantıları test edilmiştir."
      },
      "en": {
        "title": "Endovision Surgical Camera & Tower System",
        "shortDescription": "Complete refurbished endoscopy tower system for laparoscopic and minimally invasive procedures.",
        "description": "Includes high-definition medical camera unit, fiberoptic light source, medical display, and mobile equipment trolley."
      },
      "de": {
        "title": "Cebeci Medikal EV-System Sistemi (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Cebeci Medikal mit 1 Jahr Garantie.",
        "description": "Includes high-definition medical camera unit, fiberoptic light source, medical display, and mobile equipment trolley. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Cebeci Medikal EV-System (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Cebeci Medikal مع ضمان لمدة عام كامل.",
        "description": "Komple endovizyon sistemi; medikal monitör, Full HD endoskopi kamerası, soğuk ışık kaynağı ve ergonomik taşıma kulesiyle anahtar teslim cerrahi görüntüleme çözümü sunar. Tüm optik ve elektronik bağlantıları test edilmiştir. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Cebeci Medikal EV-System リファービッシュ医療機器",
        "shortDescription": "Cebeci Medikal製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Includes high-definition medical camera unit, fiberoptic light source, medical display, and mobile equipment trolley. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Cebeci Medikal EV-System 翻新医疗设备",
        "shortDescription": "Cebeci Medikal 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Includes high-definition medical camera unit, fiberoptic light source, medical display, and mobile equipment trolley. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-isik-karl-storz-powerled175",
    "slug": "karl-storz-powerled-175-isik-kaynagi",
    "categorySlug": "endovizyon-sistemleri",
    "brand": "Karl Storz",
    "model": "SCB PowerLED 175",
    "sku": "KS-LED-014",
    "condition": "SECOND_HAND",
    "featured": true,
    "sortOrder": 14,
    "images": [
      "/images/products/otoklav-1.webp"
    ],
    "technicalSpecs": {
      "Işık Tipi": "Yüksek Yoğunluklu Soğuk LED Teknolojisi",
      "Renk Sıcaklığı": "6400K (Gün Işığı Spektrumu)",
      "LED Ömrü": "> 30.000 Saat",
      "İletişim Portu": "KARL STORZ SCB (System Communication Bus)",
      "Işık Şiddeti Ayarı": "Kademesiz Dijital Kontrol",
      "Garanti": "1 Yıl Cebeci Medikal Garantisi"
    },
    "applications": [
      "Laparoskopi ve Genel Endoskopi",
      "Artroskopi",
      "KBB ve Bronkoskopi",
      "Ürolojik Cerrahi"
    ],
    "translations": {
      "tr": {
        "title": "Karl Storz SCB PowerLED 175 Soğuk Işık Kaynağı",
        "shortDescription": "Üstün Alman Karl Storz kalitesinde, uzun ömürlü ve yüksek lümenli LED endoskopi ışık kaynağı.",
        "description": "Karl Storz PowerLED 175, cerrahi kavitelerde gerçeğe en yakın renk doku ayrımını sağlayan 6400K gün ışığı spektrumuna sahip profesyonel LED ışık kaynağıdır. Ampul değişim derdi olmadan on binlerce saat stabil aydınlatma sunar."
      },
      "en": {
        "title": "Karl Storz SCB PowerLED 175 Cold Light Source",
        "shortDescription": "Premium German cold LED endoscopy light source delivering daylight spectrum illumination.",
        "description": "Features high-performance LED technology with 30,000+ hour lifespan, continuous digital intensity adjustment, and SCB bus integration."
      },
      "de": {
        "title": "Karl Storz SCB PowerLED 175 Kaynağı (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Karl Storz mit 1 Jahr Garantie.",
        "description": "Features high-performance LED technology with 30,000+ hour lifespan, continuous digital intensity adjustment, and SCB bus integration. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Karl Storz SCB PowerLED 175 (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Karl Storz مع ضمان لمدة عام كامل.",
        "description": "Karl Storz PowerLED 175, cerrahi kavitelerde gerçeğe en yakın renk doku ayrımını sağlayan 6400K gün ışığı spektrumuna sahip profesyonel LED ışık kaynağıdır. Ampul değişim derdi olmadan on binlerce saat stabil aydınlatma sunar. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Karl Storz SCB PowerLED 175 リファービッシュ医療機器",
        "shortDescription": "Karl Storz製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Features high-performance LED technology with 30,000+ hour lifespan, continuous digital intensity adjustment, and SCB bus integration. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Karl Storz SCB PowerLED 175 翻新医疗设备",
        "shortDescription": "Karl Storz 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Features high-performance LED technology with 30,000+ hour lifespan, continuous digital intensity adjustment, and SCB bus integration. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-isik-dyonics-xenon",
    "slug": "dyonics-xenon-endoskopik-isik-kaynagi",
    "categorySlug": "endovizyon-sistemleri",
    "brand": "Smith & Nephew Dyonics",
    "model": "Xenon Light Source",
    "sku": "DYN-XEN-015",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 15,
    "images": [
      "/images/products/isik-kaynagi-1.webp"
    ],
    "technicalSpecs": {
      "Ampul Tipi": "300W Yüksek Parlaklıklı Xenon Ark Lambası",
      "Renk Sıcaklığı": "5600K - 6000K",
      "Optik Çıkış": "Evrensel Fiberoptik Kablo Tareti (Storz, Wolf, Olympus uyumlu)",
      "Soğutma": "Düşük Ses Seviyeli Akıllı Fan Sistemi",
      "Durum": "Yeni Lamba ve Biyomedikal Test Onaylı"
    },
    "applications": [
      "Artroskopik Eklem Cerrahisi",
      "Laparoskopi",
      "Omurga Cerrahisi (Spine)"
    ],
    "translations": {
      "tr": {
        "title": "Dyonics Xenon Endoskopik Işık Kaynağı",
        "shortDescription": "Smith & Nephew Dyonics 300W Xenon lambalı, yoğun cerrahi aydınlatma sağlayan ışık kaynağı.",
        "description": "Dyonics Xenon Işık Kaynağı, artroskopi ve laparoskopik cerrahilerde yüksek ışık geçirgenliği ve berrak görüntüleme için 300 Watt saf beyaz ışık üretir. Lamba ömrü ve optik yansıtıcı kontrolleri tamamlanmıştır."
      },
      "en": {
        "title": "Smith & Nephew Dyonics Xenon Light Source",
        "shortDescription": "High-intensity 300W Xenon surgical light source for arthroscopy and laparoscopy.",
        "description": "Produces brilliant white illumination with universal turret connections for standard medical fiberoptic cables."
      },
      "de": {
        "title": "Smith & Nephew Dyonics Xenon Light Source Kaynağı (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Smith & Nephew Dyonics mit 1 Jahr Garantie.",
        "description": "Produces brilliant white illumination with universal turret connections for standard medical fiberoptic cables. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Smith & Nephew Dyonics Xenon Light Source (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Smith & Nephew Dyonics مع ضمان لمدة عام كامل.",
        "description": "Dyonics Xenon Işık Kaynağı, artroskopi ve laparoskopik cerrahilerde yüksek ışık geçirgenliği ve berrak görüntüleme için 300 Watt saf beyaz ışık üretir. Lamba ömrü ve optik yansıtıcı kontrolleri tamamlanmıştır. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Smith & Nephew Dyonics Xenon Light Source リファービッシュ医療機器",
        "shortDescription": "Smith & Nephew Dyonics製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Produces brilliant white illumination with universal turret connections for standard medical fiberoptic cables. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Smith & Nephew Dyonics Xenon Light Source 翻新医疗设备",
        "shortDescription": "Smith & Nephew Dyonics 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Produces brilliant white illumination with universal turret connections for standard medical fiberoptic cables. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-isik-olympus-clk4",
    "slug": "olympus-clk-4-halojen-isik-kaynagi",
    "categorySlug": "endovizyon-sistemleri",
    "brand": "Olympus",
    "model": "CLK-4",
    "sku": "OLY-CLK-016",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 16,
    "images": [
      "/images/products/isik-kaynagi-2.webp"
    ],
    "technicalSpecs": {
      "Lamba Tipi": "150W Halojen Reflektörlü Lamba",
      "Yedek Lamba Sistemi": "Entegre Acil Durum Manuel Yedek Lamba Kolu",
      "Hava Pompası": "Dahili Endoskopik Hava/Su Pompası",
      "Garanti": "1 Yıl Cebeci Medikal Garantili"
    },
    "applications": [
      "Gastroskopi ve Kolonoskopi",
      "KBB Rijit ve Fleksibl Muayeneleri",
      "Klinik Endoskopi Odaları"
    ],
    "translations": {
      "tr": {
        "title": "Olympus CLK-4 Halojen Endoskopi Işık Kaynağı",
        "shortDescription": "Olympus kalitesinde, dahili hava pompalı ve yedek ampul mekanizmalı halojen ışık kaynağı.",
        "description": "Olympus CLK-4, fleksibl ve rijit endoskopi uygulamalarında güvenilir ışık ve hava beslemesi sağlayan kompakt ışık kaynağıdır. Yedek lamba sistemi sayesinde cerrahi sırasında kesinti yaşanmaz."
      },
      "en": {
        "title": "Olympus CLK-4 Halogen Light Source",
        "shortDescription": "Compact Olympus halogen light source with integrated air pump and emergency backup lamp.",
        "description": "Dependable lighting unit designed for diagnostic endoscopy suites, clinics, and flexible endoscopy procedures."
      },
      "de": {
        "title": "Olympus CLK-4 Kaynağı (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Olympus mit 1 Jahr Garantie.",
        "description": "Dependable lighting unit designed for diagnostic endoscopy suites, clinics, and flexible endoscopy procedures. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Olympus CLK-4 (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Olympus مع ضمان لمدة عام كامل.",
        "description": "Olympus CLK-4, fleksibl ve rijit endoskopi uygulamalarında güvenilir ışık ve hava beslemesi sağlayan kompakt ışık kaynağıdır. Yedek lamba sistemi sayesinde cerrahi sırasında kesinti yaşanmaz. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Olympus CLK-4 リファービッシュ医療機器",
        "shortDescription": "Olympus製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Dependable lighting unit designed for diagnostic endoscopy suites, clinics, and flexible endoscopy procedures. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Olympus CLK-4 翻新医疗设备",
        "shortDescription": "Olympus 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Dependable lighting unit designed for diagnostic endoscopy suites, clinics, and flexible endoscopy procedures. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-pompa-bbraun-perfusor-space",
    "slug": "b-braun-perfusor-space-enjektor-pompasi",
    "categorySlug": "yogun-bakim-ve-yasam-destek",
    "brand": "B. Braun",
    "model": "Perfusor Space",
    "sku": "BBR-SPC-017",
    "condition": "SECOND_HAND",
    "featured": true,
    "sortOrder": 17,
    "images": [
      "/images/products/enjektor-pompasi-1.webp"
    ],
    "technicalSpecs": {
      "Akış Hızı Aralığı": "0.01 - 999.9 mL/saat",
      "Şırınga Uyumluluğu": "2, 5, 10, 20, 30, 50/60 mL (Otomatik Şırınga Tanıma)",
      "Bolus Hızı": "1 - 1800 mL/saat ayarlanabilir",
      "Hassasiyet": "±%2 hacimsel doğruluk",
      "Oklüzyon Basıncı": "9 seviyeli ayarlanabilir basınç limiti",
      "Tasarım": "İstiflenebilir Space İstasyon Uyumlu Modüler Yapı"
    },
    "applications": [
      "Yoğun Bakım ve Anestezi",
      "Onkoloji ve Kemoterapi İnfüzyonları",
      "Neonatoloji (Yenidoğan) ve Pediatri",
      "Kardiyovasküler İlaç Tedavileri"
    ],
    "translations": {
      "tr": {
        "title": "B. Braun Perfusor Space Enjektör Pompası",
        "shortDescription": "Dünya standartlarında hassasiyete sahip, kompakt ve modüler Space serisi enjektör pompası.",
        "description": "B. Braun Perfusor Space, kritik ilaçların mikro düzeyde hassas verilmesi için geliştirilmiş ultra kompakt enjektör pompasıdır. Otomatik enjektör boyutu algılama ve gelişmiş oklüzyon güvenliği sunar. Debimetre testleri ve mekanik kalibrasyonu yapılmıştır."
      },
      "en": {
        "title": "B. Braun Perfusor Space Syringe Pump",
        "shortDescription": "Ultra-compact, highly precise syringe infusion pump with modular stackable design.",
        "description": "Engineered for demanding intensive care, anesthesia, and neonatal drug delivery with comprehensive safety profiles."
      },
      "de": {
        "title": "B. Braun Perfusor Space Pompası (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von B. Braun mit 1 Jahr Garantie.",
        "description": "Engineered for demanding intensive care, anesthesia, and neonatal drug delivery with comprehensive safety profiles. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "B. Braun Perfusor Space (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة B. Braun مع ضمان لمدة عام كامل.",
        "description": "B. Braun Perfusor Space, kritik ilaçların mikro düzeyde hassas verilmesi için geliştirilmiş ultra kompakt enjektör pompasıdır. Otomatik enjektör boyutu algılama ve gelişmiş oklüzyon güvenliği sunar. Debimetre testleri ve mekanik kalibrasyonu yapılmıştır. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "B. Braun Perfusor Space リファービッシュ医療機器",
        "shortDescription": "B. Braun製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Engineered for demanding intensive care, anesthesia, and neonatal drug delivery with comprehensive safety profiles. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "B. Braun Perfusor Space 翻新医疗设备",
        "shortDescription": "B. Braun 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Engineered for demanding intensive care, anesthesia, and neonatal drug delivery with comprehensive safety profiles. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-pompa-bbraun-perfusor-compact",
    "slug": "b-braun-perfusor-compact-enjektor-pompasi",
    "categorySlug": "yogun-bakim-ve-yasam-destek",
    "brand": "B. Braun",
    "model": "Perfusor Compact",
    "sku": "BBR-CMP-018",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 18,
    "images": [
      "/images/products/enjektor-pompasi-2.webp"
    ],
    "technicalSpecs": {
      "Akış Hızı": "0.1 - 99.9 mL/saat",
      "Şırınga Desteği": "20 mL ve 50/60 mL Orijinal Perfusor Şırıngaları",
      "Batarya Süresi": "Standart piller veya dahili akü ile 80 saat üzeri çalışma",
      "Taşınabilirlik": "Hafif, sağlam ve taşıma kulplu gövde",
      "Garanti": "1 Yıl Cebeci Medikal Garantisi"
    },
    "applications": [
      "Yataklı Tedavi Servisleri",
      "Ambulans ve Hasta Nakli",
      "Acil Müdahale Odaları"
    ],
    "translations": {
      "tr": {
        "title": "B. Braun Perfusor Compact Enjektör Pompası",
        "shortDescription": "Kullanımı kolay, sağlam ve uzun batarya ömrüne sahip klasik B. Braun enjektör pompası.",
        "description": "B. Braun Perfusor Compact, sadeliği ve güvenilirliğiyle hastanelerin en çok tercih ettiği enjektör pompalarından biridir. İlaç infüzyonunda istikrarlı akış sağlar. Revizyonlu ve test onaylıdır."
      },
      "en": {
        "title": "B. Braun Perfusor Compact Infusion Syringe Pump",
        "shortDescription": "Robust, easy-to-operate syringe pump with long battery autonomy for wards and transport.",
        "description": "A medical benchmark for daily syringe infusion, offering durable mechanical drive and dependable alarm monitoring."
      },
      "de": {
        "title": "B. Braun Perfusor Compact Pompası (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von B. Braun mit 1 Jahr Garantie.",
        "description": "A medical benchmark for daily syringe infusion, offering durable mechanical drive and dependable alarm monitoring. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "B. Braun Perfusor Compact (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة B. Braun مع ضمان لمدة عام كامل.",
        "description": "B. Braun Perfusor Compact, sadeliği ve güvenilirliğiyle hastanelerin en çok tercih ettiği enjektör pompalarından biridir. İlaç infüzyonunda istikrarlı akış sağlar. Revizyonlu ve test onaylıdır. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "B. Braun Perfusor Compact リファービッシュ医療機器",
        "shortDescription": "B. Braun製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "A medical benchmark for daily syringe infusion, offering durable mechanical drive and dependable alarm monitoring. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "B. Braun Perfusor Compact 翻新医疗设备",
        "shortDescription": "B. Braun 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "A medical benchmark for daily syringe infusion, offering durable mechanical drive and dependable alarm monitoring. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-pompa-argus-414",
    "slug": "argus-414-volumetrik-infuzyon-pompasi",
    "categorySlug": "yogun-bakim-ve-yasam-destek",
    "brand": "Argus (Schiller)",
    "model": "414 Green Stream",
    "sku": "ARG-414-019",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 19,
    "images": [
      "/images/products/infuzyon-pompasi-1.webp"
    ],
    "technicalSpecs": {
      "Pompa Tipi": "Volumetrik Damar İçi (IV) İnfüzyon Pompası",
      "Akış Aralığı": "0.1 - 999.9 mL/saat",
      "Hava Dedektörü": "Ultrasonik Hava Kabarcığı Algılama",
      "Damla Sayacı": "Optik Damla Kontrol Sensörü",
      "Garanti": "1 Yıl Tam Garanti"
    },
    "applications": [
      "Genel Hastane Servisleri",
      "Yoğun Bakım Üniteleri",
      "Ameliyathane Sıvı Tedavileri"
    ],
    "translations": {
      "tr": {
        "title": "Argus 414 Volumetrik İnfüzyon Pompası",
        "shortDescription": "İsviçre üretimi, hassas serum ve sıvı infüzyonu sağlayan volumetrik damar içi infüzyon pompası.",
        "description": "Argus 414 Green Stream, standart IV infüzyon setleriyle yüksek doğrulukta çalışan dayanıklı bir infüzyon cihazıdır. Hava kabarcığı ve tıkanma sensörleri kalibre edilmiştir."
      },
      "en": {
        "title": "Argus 414 Volumetric Infusion Pump",
        "shortDescription": "Swiss precision IV volumetric infusion pump with ultrasonic air bubble detection.",
        "description": "Designed for standard infusion therapy across hospital departments, ensuring accurate continuous flow rates."
      },
      "de": {
        "title": "Argus (Schiller) 414 Green Stream Pompası (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Argus (Schiller) mit 1 Jahr Garantie.",
        "description": "Designed for standard infusion therapy across hospital departments, ensuring accurate continuous flow rates. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Argus (Schiller) 414 Green Stream (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Argus (Schiller) مع ضمان لمدة عام كامل.",
        "description": "Argus 414 Green Stream, standart IV infüzyon setleriyle yüksek doğrulukta çalışan dayanıklı bir infüzyon cihazıdır. Hava kabarcığı ve tıkanma sensörleri kalibre edilmiştir. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Argus (Schiller) 414 Green Stream リファービッシュ医療機器",
        "shortDescription": "Argus (Schiller)製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Designed for standard infusion therapy across hospital departments, ensuring accurate continuous flow rates. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Argus (Schiller) 414 Green Stream 翻新医疗设备",
        "shortDescription": "Argus (Schiller) 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Designed for standard infusion therapy across hospital departments, ensuring accurate continuous flow rates. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-ftr-estetic-italia-eswt",
    "slug": "estetic-italia-eswt-sok-dalga-cihazi",
    "categorySlug": "fizik-tedavi-cihazlari",
    "brand": "Estetic Italia",
    "model": "ESWT Radial Shockwave",
    "sku": "EST-ESW-020",
    "condition": "SECOND_HAND",
    "featured": true,
    "sortOrder": 20,
    "images": [
      "/images/products/fizik-tedavi-1.webp"
    ],
    "technicalSpecs": {
      "Tedavi Prensibi": "Radyal Şok Dalga Terapisi (ESWT)",
      "Basınç Gücü": "1.0 - 4.0 Bar ayarlanabilir enerji",
      "Frekans": "1 - 16 Hz darbe frekansı",
      "Aplikatör": "Farklı Derinlikler İçin Değiştirilebilir Başlık Seti",
      "Ekran": "Dijital Parametre ve Protokol Kontrol Paneli",
      "Garanti": "1 Yıl Cebeci Medikal Garantili"
    },
    "applications": [
      "Fizik Tedavi ve Rehabilitasyon Merkezleri",
      "Ortopedi ve Spor Hekimliği",
      "Topuk Dikeni ve Plantar Fasiit Tedavisi",
      "Tenisçi / Golfçü Dirseği ve Kronik Tendinopatiler"
    ],
    "translations": {
      "tr": {
        "title": "Estetic Italia ESWT Şok Dalga Terapi Cihazı",
        "shortDescription": "Kas-iskelet sistemi ağrıları ve kronik tendinopatiler için İtalyan üretimi radyal ESWT cihazı.",
        "description": "Estetic Italia ESWT, ortopedik ve fizik tedavi rahatsızlıklarında doku rejenerasyonunu tetikleyen invaziv olmayan güçlü bir şok dalga terapi cihazıdır. Kompresör basınç değerleri ve tabanca aplikatörü yenilenmiştir."
      },
      "en": {
        "title": "Estetic Italia Radial ESWT Shockwave Therapy Unit",
        "shortDescription": "Italian manufactured radial shockwave device for orthopedic and physical therapy rehabilitation.",
        "description": "Effective non-invasive solution for musculoskeletal disorders, tendinopathy, and plantar fasciitis."
      },
      "de": {
        "title": "Estetic Italia ESWT Radial Shockwave Cihazı (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Estetic Italia mit 1 Jahr Garantie.",
        "description": "Effective non-invasive solution for musculoskeletal disorders, tendinopathy, and plantar fasciitis. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Estetic Italia ESWT Radial Shockwave (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Estetic Italia مع ضمان لمدة عام كامل.",
        "description": "Estetic Italia ESWT, ortopedik ve fizik tedavi rahatsızlıklarında doku rejenerasyonunu tetikleyen invaziv olmayan güçlü bir şok dalga terapi cihazıdır. Kompresör basınç değerleri ve tabanca aplikatörü yenilenmiştir. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Estetic Italia ESWT Radial Shockwave リファービッシュ医療機器",
        "shortDescription": "Estetic Italia製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Effective non-invasive solution for musculoskeletal disorders, tendinopathy, and plantar fasciitis. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Estetic Italia ESWT Radial Shockwave 翻新医疗设备",
        "shortDescription": "Estetic Italia 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Effective non-invasive solution for musculoskeletal disorders, tendinopathy, and plantar fasciitis. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-ftr-fizik-tedavi-masasi",
    "slug": "motorlu-fizik-tedavi-ve-rehabilitasyon-masasi",
    "categorySlug": "fizik-tedavi-cihazlari",
    "brand": "Cebeci Medikal",
    "model": "FTR-Pro Bed",
    "sku": "CBC-FTR-021",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 21,
    "images": [
      "/images/products/fizik-tedavi-2.webp",
      "/images/products/fizik-tedavi-3.webp",
      "/images/products/fizik-tedavi-4.webp",
      "/images/products/fizik-tedavi-5.webp"
    ],
    "technicalSpecs": {
      "Yatak Bölümleri": "Çok Parçalı (Baş, Gövde, Bacak Açı Ayarlı)",
      "Yükseklik Ayarı": "Elektrikli Motorlu Yükseklik ve Pozisyon Kontrolü",
      "Döşeme": "Antibakteriyel, Silinebilir ve Sıvı Geçirmez Medikal Vinleks",
      "Taşıma Kapasitesi": "220 kg Güvenli Çalışma Yükü",
      "Aksesuarlar": "Yüz Boşluğu Deliği ve Kol Destekleri",
      "Görsel Sayısı": "4 Farklı Açıdan Fotoğraflanmış Tek Ürün"
    },
    "applications": [
      "Fizik Tedavi ve Rehabilitasyon Klinikleri",
      "Manuel Terapi ve Kayropraktik Merkezleri",
      "Nörolojik Rehabilitasyon Salonları",
      "Spor Kulübü Sağlık Odaları"
    ],
    "translations": {
      "tr": {
        "title": "Motorlu Fizik Tedavi ve Rehabilitasyon Masası",
        "shortDescription": "Çok parçalı, motorlu yükseklik ve eğim kontrollü, ergonomik fizik tedavi yatağı (4 farklı açı görseli mevcuttur).",
        "description": "Fizik tedavi ve manuel terapi seansları için tasarlanmış profesyonel muayene ve tedavi masasıdır. Elektrikli motorları, el/ayak kumandası ve sünger döşemesi tamamen kontrol edilmiş ve mükemmel kondisyondadır."
      },
      "en": {
        "title": "Motorized Physical Therapy & Rehabilitation Table",
        "shortDescription": "Multi-section motorized physical therapy examination and treatment bed with adjustable sections.",
        "description": "Robust and hygienic rehabilitation couch providing smooth height adjustments and flexible positioning for manual therapists."
      },
      "de": {
        "title": "Cebeci Medikal FTR-Pro Bed Masası (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Cebeci Medikal mit 1 Jahr Garantie.",
        "description": "Robust and hygienic rehabilitation couch providing smooth height adjustments and flexible positioning for manual therapists. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Cebeci Medikal FTR-Pro Bed (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Cebeci Medikal مع ضمان لمدة عام كامل.",
        "description": "Fizik tedavi ve manuel terapi seansları için tasarlanmış profesyonel muayene ve tedavi masasıdır. Elektrikli motorları, el/ayak kumandası ve sünger döşemesi tamamen kontrol edilmiş ve mükemmel kondisyondadır. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Cebeci Medikal FTR-Pro Bed リファービッシュ医療機器",
        "shortDescription": "Cebeci Medikal製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Robust and hygienic rehabilitation couch providing smooth height adjustments and flexible positioning for manual therapists. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Cebeci Medikal FTR-Pro Bed 翻新医疗设备",
        "shortDescription": "Cebeci Medikal 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Robust and hygienic rehabilitation couch providing smooth height adjustments and flexible positioning for manual therapists. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-hasta-isitma-takip-unitesi",
    "slug": "klinik-hasta-isitma-ve-akıs-takip-unitesi",
    "categorySlug": "yogun-bakim-ve-yasam-destek",
    "brand": "Medikal Klinik Sistem",
    "model": "WarmFlow 300",
    "sku": "MKS-WF3-022",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 22,
    "images": [
      "/images/products/hasta-isitma-1.webp"
    ],
    "technicalSpecs": {
      "Fonksiyon": "Cerrahi ve Yoğun Bakım Hasta Isıtma / Parametrik Akış Takibi",
      "Sıcaklık Kademeleri": "Ortam Sıcaklığı, 38°C, 40°C, 43°C Güvenlik Limitli",
      "Hava Akışı": "HEPA Filtreli Temiz Sıcak Hava Sirkülasyonu",
      "Alarm": "Aşırı Sıcaklık Koruması ve Sensör Hatası Uyarısı",
      "Garanti": "1 Yıl Cebeci Medikal Garantili"
    },
    "applications": [
      "Ameliyathane Hipotermi Önleme",
      "Post-Op Uyandırma Odaları (PACU)",
      "Yoğun Bakım Üniteleri"
    ],
    "translations": {
      "tr": {
        "title": "Klinik Hasta Isıtma ve Akış Takip Ünitesi",
        "shortDescription": "Ameliyat esnasında ve sonrasında hipotermiyi önleyen üflemeli hasta ısıtma sistemi.",
        "description": "Cerrahi operasyonlarda hastanın vücut ısısını stabil tutarak enfeksiyon ve kanama riskini azaltan medikal hasta ısıtma cihazıdır. Isıtıcı rezistansı, hava debisi ve termal güvenlik sensörleri test edilmiştir."
      },
      "en": {
        "title": "Clinical Patient Warming & Flow Management Unit",
        "shortDescription": "Forced-air patient warming device preventing perioperative hypothermia in surgical patients.",
        "description": "Maintains normothermia during surgeries with precise temperature regulation and HEPA filtered air flow."
      },
      "de": {
        "title": "Medikal Klinik Sistem WarmFlow 300 Ünitesi (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Medikal Klinik Sistem mit 1 Jahr Garantie.",
        "description": "Maintains normothermia during surgeries with precise temperature regulation and HEPA filtered air flow. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Medikal Klinik Sistem WarmFlow 300 (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Medikal Klinik Sistem مع ضمان لمدة عام كامل.",
        "description": "Cerrahi operasyonlarda hastanın vücut ısısını stabil tutarak enfeksiyon ve kanama riskini azaltan medikal hasta ısıtma cihazıdır. Isıtıcı rezistansı, hava debisi ve termal güvenlik sensörleri test edilmiştir. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Medikal Klinik Sistem WarmFlow 300 リファービッシュ医療機器",
        "shortDescription": "Medikal Klinik Sistem製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Maintains normothermia during surgeries with precise temperature regulation and HEPA filtered air flow. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Medikal Klinik Sistem WarmFlow 300 翻新医疗设备",
        "shortDescription": "Medikal Klinik Sistem 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Maintains normothermia during surgeries with precise temperature regulation and HEPA filtered air flow. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-karyola-yogun-bakim",
    "slug": "cok-fonksiyonlu-motorlu-yogun-bakim-karyolasi",
    "categorySlug": "yogun-bakim-ve-yasam-destek",
    "brand": "Medikal Donanım",
    "model": "ICU-Bed 4M",
    "sku": "MDK-ICU-023",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 23,
    "images": [
      "/images/products/hasta-karyolasi-1.webp"
    ],
    "technicalSpecs": {
      "Motor Sayısı": "4 Bağımsız Elektrikli Lineer Motor",
      "Pozisyonlar": "Trendelenburg, Ters Trendelenburg, Sırt, Ayak ve Yükseklik Ayarı, CPR Konumu",
      "Korkuluklar": "Dahili Açılı Göstergeli Katlanabilir ABS Korkuluklar",
      "Tekerlekler": "Merkezi Kilitli Antistatik Tekerlek Sistemi",
      "Yatak Platformu": "X-Ray Geçirgen Sırt Bölümü"
    },
    "applications": [
      "Genel ve Koroner Yoğun Bakım",
      "Ameliyathane Sonrası Derlenme",
      "Özel Klinik ve VIP Hasta Odaları"
    ],
    "translations": {
      "tr": {
        "title": "Çok Fonksiyonlu Motorlu Yoğun Bakım Karyolası",
        "shortDescription": "4 motorlu, Trendelenburg ve CPR özellikli, tam donanımlı yoğun bakım hasta yatağı.",
        "description": "Kritik hasta takibinde maksimum konfor ve kolay hemşire erişimi sağlayan 4 motorlu elektrikli yoğun bakım karyolasıdır. Motor sürücüleri, batarya yedeklemesi ve mekanik mafsalları revize edilmiştir."
      },
      "en": {
        "title": "Multi-Functional 4-Motor ICU Hospital Bed",
        "shortDescription": "Full electric ICU bed with Trendelenburg, reverse Trendelenburg, and emergency CPR release.",
        "description": "Engineered for optimal intensive care patient management with motorized positioning and central braking."
      },
      "de": {
        "title": "Medikal Donanım ICU-Bed 4M Karyolası (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Medikal Donanım mit 1 Jahr Garantie.",
        "description": "Engineered for optimal intensive care patient management with motorized positioning and central braking. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Medikal Donanım ICU-Bed 4M (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Medikal Donanım مع ضمان لمدة عام كامل.",
        "description": "Kritik hasta takibinde maksimum konfor ve kolay hemşire erişimi sağlayan 4 motorlu elektrikli yoğun bakım karyolasıdır. Motor sürücüleri, batarya yedeklemesi ve mekanik mafsalları revize edilmiştir. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Medikal Donanım ICU-Bed 4M リファービッシュ医療機器",
        "shortDescription": "Medikal Donanım製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Engineered for optimal intensive care patient management with motorized positioning and central braking. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Medikal Donanım ICU-Bed 4M 翻新医疗设备",
        "shortDescription": "Medikal Donanım 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Engineered for optimal intensive care patient management with motorized positioning and central braking. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-mon-spacelabs-90369",
    "slug": "spacelabs-90369-hastabasi-monitoru",
    "categorySlug": "fizyolojik-sinyal-izleyiciler",
    "brand": "Spacelabs Healthcare",
    "model": "90369 Ultraview",
    "sku": "SPC-903-024",
    "condition": "SECOND_HAND",
    "featured": true,
    "sortOrder": 24,
    "images": [
      "/images/products/hastabasi-monitoru-1.webp"
    ],
    "technicalSpecs": {
      "Ekran": "10.4 inç Yüksek Çözünürlüklü Renkli Dokunmatik Ekran",
      "Standart Parametreler": "EKG, SpO2, NIBP (Non-İnvaziv Tansiyon), Solunum (RESP), Çift Kanal Sıcaklık (TEMP)",
      "Aritmi Analizi": "Çok Kanallı Gelişmiş Aritmi ve ST Segment Değerlendirmesi",
      "Ağ Bağlantısı": "Merkezi Monitör (Central Station) Entegrasyonu",
      "Garanti": "1 Yıl Cebeci Medikal Garantili"
    },
    "applications": [
      "Yoğun Bakım Üniteleri (ICU / CCU)",
      "Ameliyathane ve Anestezi Takibi",
      "Acil Müdahale ve Travma Odaları"
    ],
    "translations": {
      "tr": {
        "title": "Spacelabs 90369 Çok Parametreli Hastabaşı Monitörü",
        "shortDescription": "Amerikan Spacelabs güvencesiyle dokunmatik ekranlı, modüler klinik hasta monitörü.",
        "description": "Spacelabs 90369 Ultraview serisi, yoğun bakım ve ameliyathanelerde vital parametrelerin kesintisiz ve hassas izlenmesi için tasarlanmış yüksek sınıf bir monitördür. Tüm sensör kabloları ve EKG simülatör testleri yapılmıştır."
      },
      "en": {
        "title": "Spacelabs 90369 Multi-Parameter Patient Monitor",
        "shortDescription": "Touchscreen clinical patient monitor with comprehensive vital sign tracking and arrhythmia analysis.",
        "description": "The Spacelabs 90369 delivers dependable bedside monitoring for ICU and OR environments with intuitive navigation."
      },
      "de": {
        "title": "Spacelabs Healthcare 90369 Ultraview Monitörü (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Spacelabs Healthcare mit 1 Jahr Garantie.",
        "description": "The Spacelabs 90369 delivers dependable bedside monitoring for ICU and OR environments with intuitive navigation. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Spacelabs Healthcare 90369 Ultraview (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Spacelabs Healthcare مع ضمان لمدة عام كامل.",
        "description": "Spacelabs 90369 Ultraview serisi, yoğun bakım ve ameliyathanelerde vital parametrelerin kesintisiz ve hassas izlenmesi için tasarlanmış yüksek sınıf bir monitördür. Tüm sensör kabloları ve EKG simülatör testleri yapılmıştır. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Spacelabs Healthcare 90369 Ultraview リファービッシュ医療機器",
        "shortDescription": "Spacelabs Healthcare製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "The Spacelabs 90369 delivers dependable bedside monitoring for ICU and OR environments with intuitive navigation. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Spacelabs Healthcare 90369 Ultraview 翻新医疗设备",
        "shortDescription": "Spacelabs Healthcare 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "The Spacelabs 90369 delivers dependable bedside monitoring for ICU and OR environments with intuitive navigation. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-mon-uzumcu-visio",
    "slug": "uzumcu-visio-hastabasi-monitoru",
    "categorySlug": "fizyolojik-sinyal-izleyiciler",
    "brand": "Üzümcü",
    "model": "Visio",
    "sku": "UZM-VIS-025",
    "condition": "SECOND_HAND",
    "featured": true,
    "sortOrder": 25,
    "images": [
      "/images/products/hastabasi-monitoru-2.webp"
    ],
    "technicalSpecs": {
      "Ekran Boyutu": "12.1 inç Parlak TFT Renkli Ekran",
      "Parametreler": "EKG (3/5 Derivasyon), SpO2, NIBP, Solunum, 2 x Sıcaklık, Opsiyonel IBP / EtCO2",
      "Trend Hafızası": "96 Saatlik Grafik ve Tablo Trend Kaydı",
      "Batarya": "Dahili Şarj Edilebilir Lityum-İyon Batarya (Mobil Kullanım)",
      "Kondisyon": "Test Edilmiş, Revizyonlu 2. El Medikal Cihaz"
    },
    "applications": [
      "Genel Yoğun Bakım ve Koroner Yoğun Bakım",
      "Cerrahi Servisler ve Uyandırma Odaları",
      "Acil Servisler"
    ],
    "translations": {
      "tr": {
        "title": "Üzümcü Visio Hastabaşı Monitörü",
        "shortDescription": "12.1 inç geniş ekranlı, çok parametreli ve stabil ölçüm kabiliyetli revizyonlu hastabaşı monitörü.",
        "description": "Üzümcü Visio, hastanelerin yataklı servislerinde ve yoğun bakımlarında hasta hayati bulgularının anlık takibi için ideal bir monitördür. NIBP pompası, SpO2 probu ve EKG kablosu sıfırlanmış olarak teslim edilir."
      },
      "en": {
        "title": "Üzümcü Visio Multi-Parameter Bedside Monitor",
        "shortDescription": "12.1-inch color TFT patient monitor with comprehensive trend memory and reliable alarms.",
        "description": "Provides accurate multi-lead ECG, pulse oximetry, and non-invasive blood pressure tracking across hospital departments."
      },
      "de": {
        "title": "Üzümcü Visio Monitörü (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Üzümcü mit 1 Jahr Garantie.",
        "description": "Provides accurate multi-lead ECG, pulse oximetry, and non-invasive blood pressure tracking across hospital departments. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Üzümcü Visio (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Üzümcü مع ضمان لمدة عام كامل.",
        "description": "Üzümcü Visio, hastanelerin yataklı servislerinde ve yoğun bakımlarında hasta hayati bulgularının anlık takibi için ideal bir monitördür. NIBP pompası, SpO2 probu ve EKG kablosu sıfırlanmış olarak teslim edilir. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Üzümcü Visio リファービッシュ医療機器",
        "shortDescription": "Üzümcü製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Provides accurate multi-lead ECG, pulse oximetry, and non-invasive blood pressure tracking across hospital departments. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Üzümcü Visio 翻新医疗设备",
        "shortDescription": "Üzümcü 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Provides accurate multi-lead ECG, pulse oximetry, and non-invasive blood pressure tracking across hospital departments. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-mon-schiller-physicgard-910",
    "slug": "schiller-physicgard-tm-910-hastabasi-monitoru",
    "categorySlug": "fizyolojik-sinyal-izleyiciler",
    "brand": "Schiller",
    "model": "Physicgard TM 910",
    "sku": "SCH-910-026",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 26,
    "images": [
      "/images/products/hastabasi-monitoru-3.webp"
    ],
    "technicalSpecs": {
      "Menşei": "İsviçre (Schiller AG)",
      "Ölçüm Parametreleri": "EKG, Nabız, SpO2, NIBP, Isı Takibi",
      "Ekran": "Yüksek Kontrastlı Medikal CRT / LCD Monitör",
      "Garanti": "1 Yıl Cebeci Medikal Garantili"
    },
    "applications": [
      "Kardiyoloji Klinikleri",
      "Yoğun Bakım ve Acil Servis",
      "Ameliyathane"
    ],
    "translations": {
      "tr": {
        "title": "Schiller Physicgard TM 910 Hastabaşı Monitörü",
        "shortDescription": "İsviçre Schiller kalitesinde, kardiyak ritim ve vital bulgu takibi sunan dayanıklı monitör.",
        "description": "Schiller Physicgard TM 910, İsviçre mühendisliğinin hassas kardiyak sinyal işleme teknolojisini yansıtan sağlam bir hastabaşı monitörüdür. Biyomedikal elektriksel güvenlik kontrolleri yapılmıştır."
      },
      "en": {
        "title": "Schiller Physicgard TM 910 Patient Monitor",
        "shortDescription": "Swiss engineered bedside monitor providing accurate ECG and vital signs telemetry.",
        "description": "Durable clinical monitor ensuring precise cardiac wave visualization and physiological parameter logging."
      },
      "de": {
        "title": "Schiller Physicgard TM 910 Monitörü (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Schiller mit 1 Jahr Garantie.",
        "description": "Durable clinical monitor ensuring precise cardiac wave visualization and physiological parameter logging. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Schiller Physicgard TM 910 (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Schiller مع ضمان لمدة عام كامل.",
        "description": "Schiller Physicgard TM 910, İsviçre mühendisliğinin hassas kardiyak sinyal işleme teknolojisini yansıtan sağlam bir hastabaşı monitörüdür. Biyomedikal elektriksel güvenlik kontrolleri yapılmıştır. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Schiller Physicgard TM 910 リファービッシュ医療機器",
        "shortDescription": "Schiller製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Durable clinical monitor ensuring precise cardiac wave visualization and physiological parameter logging. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Schiller Physicgard TM 910 翻新医疗设备",
        "shortDescription": "Schiller 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Durable clinical monitor ensuring precise cardiac wave visualization and physiological parameter logging. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-mon-philips-intellivue-mp20",
    "slug": "philips-intellivue-mp20-hastabasi-monitoru",
    "categorySlug": "fizyolojik-sinyal-izleyiciler",
    "brand": "Philips",
    "model": "IntelliVue MP20",
    "sku": "PHL-MP2-027",
    "condition": "SECOND_HAND",
    "featured": true,
    "sortOrder": 27,
    "images": [
      "/images/products/hastabasi-monitoru-4.webp"
    ],
    "technicalSpecs": {
      "Ekran": "10.4 inç SVGA Renkli Dokunmatik Ekran",
      "Modülerlik": "Philips Çoklu Ölçüm Sunucusu (MMS) Uyumlu",
      "Parametreler": "EKG, FAST-SpO2, NIBP, İnvaziv Basınç (IBP), Sıcaklık, CO2",
      "Taşınabilirlik": "Kompakt Gövde, Entegre Taşıma Kulpu, Uzun Batarya Süresi",
      "Ağ Desteği": "Philips IntelliVue Bilgi Ağı ve Merkezi İstasyon Entegrasyonu",
      "Garanti": "1 Yıl Cebeci Medikal Garantili"
    },
    "applications": [
      "Yoğun Bakım Üniteleri",
      "Hasta Nakli ve Transport Monitörizasyon",
      "Ameliyathane ve Cerrahi Servisler"
    ],
    "translations": {
      "tr": {
        "title": "Philips IntelliVue MP20 Hastabaşı Monitörü",
        "shortDescription": "Dünya lideri Philips IntelliVue teknolojisiyle hem sabit hem transport amaçlı kullanılabilen modüler monitör.",
        "description": "Philips IntelliVue MP20, kompakt tasarımda üst düzey klinik takip performansı sunar. Hızlı dokunmatik arayüzü ve Philips FAST-SpO2 teknolojisiyle en zorlu hasta şartlarında bile doğru ölçüm sağlar."
      },
      "en": {
        "title": "Philips IntelliVue MP20 Patient Monitor",
        "shortDescription": "Flexible and portable patient monitor with touchscreen display and Philips Multi-Measurement Server support.",
        "description": "Combines high-performance bedside monitoring with seamless intra-hospital transport capability for critical patients."
      },
      "de": {
        "title": "Philips IntelliVue MP20 Monitörü (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Philips mit 1 Jahr Garantie.",
        "description": "Combines high-performance bedside monitoring with seamless intra-hospital transport capability for critical patients. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Philips IntelliVue MP20 (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Philips مع ضمان لمدة عام كامل.",
        "description": "Philips IntelliVue MP20, kompakt tasarımda üst düzey klinik takip performansı sunar. Hızlı dokunmatik arayüzü ve Philips FAST-SpO2 teknolojisiyle en zorlu hasta şartlarında bile doğru ölçüm sağlar. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Philips IntelliVue MP20 リファービッシュ医療機器",
        "shortDescription": "Philips製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Combines high-performance bedside monitoring with seamless intra-hospital transport capability for critical patients. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Philips IntelliVue MP20 翻新医疗设备",
        "shortDescription": "Philips 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Combines high-performance bedside monitoring with seamless intra-hospital transport capability for critical patients. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-mon-blt-m9000a",
    "slug": "blt-m9000a-cok-parametreli-hastabasi-monitoru",
    "categorySlug": "fizyolojik-sinyal-izleyiciler",
    "brand": "Biolight (BLT)",
    "model": "M9000A",
    "sku": "BLT-M90-028",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 28,
    "images": [
      "/images/products/hastabasi-monitoru-5.webp"
    ],
    "technicalSpecs": {
      "Ekran": "12.1 inç Renkli TFT LCD Ekran",
      "Parametreler": "3/5 Derivasyon EKG, NIBP, SpO2, Solunum, 2 x Sıcaklık",
      "Aritmi / ST Analizi": "Var (Gerçek Zamanlı)",
      "Depolama": "Geniş Alarm Olayı ve Dalga Formu Geri Çağırma Hafızası",
      "Garanti": "1 Yıl Cebeci Medikal Güvencesi"
    },
    "applications": [
      "Genel Servisler",
      "Yoğun Bakım",
      "Ameliyat Sonrası Takip"
    ],
    "translations": {
      "tr": {
        "title": "BLT M9000A Çok Parametreli Hastabaşı Monitörü",
        "shortDescription": "Geniş 12.1 inç ekranlı, kullanıcı dostu arayüze sahip revizyonlu hastabaşı monitörü.",
        "description": "Biolight M9000A, temel ve ileri seviye vital bulguların net şekilde görüntülenmesini sağlayan stabil bir monitördür. Testleri yapılmış, tüm kablo aksesuarları eksiksiz tamamlanmıştır."
      },
      "en": {
        "title": "Biolight BLT M9000A Multi-Parameter Monitor",
        "shortDescription": "12.1-inch color display patient monitor with full standard parameter set and arrhythmia detection.",
        "description": "Reliable clinical monitor for continuous surveillance of adult, pediatric, and neonatal patients."
      },
      "de": {
        "title": "Biolight (BLT) M9000A Monitörü (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Biolight (BLT) mit 1 Jahr Garantie.",
        "description": "Reliable clinical monitor for continuous surveillance of adult, pediatric, and neonatal patients. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Biolight (BLT) M9000A (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Biolight (BLT) مع ضمان لمدة عام كامل.",
        "description": "Biolight M9000A, temel ve ileri seviye vital bulguların net şekilde görüntülenmesini sağlayan stabil bir monitördür. Testleri yapılmış, tüm kablo aksesuarları eksiksiz tamamlanmıştır. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Biolight (BLT) M9000A リファービッシュ医療機器",
        "shortDescription": "Biolight (BLT)製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Reliable clinical monitor for continuous surveillance of adult, pediatric, and neonatal patients. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Biolight (BLT) M9000A 翻新医疗设备",
        "shortDescription": "Biolight (BLT) 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Reliable clinical monitor for continuous surveillance of adult, pediatric, and neonatal patients. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-mon-contec-cms8000",
    "slug": "contec-cms-8000-hastabasi-monitoru",
    "categorySlug": "fizyolojik-sinyal-izleyiciler",
    "brand": "Contec",
    "model": "CMS 8000",
    "sku": "CTC-CMS-029",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 29,
    "images": [
      "/images/products/hastabasi-monitoru-6.webp"
    ],
    "technicalSpecs": {
      "Ekran": "12.1 inç Renkli TFT Ekran",
      "Standart Yapılandırma": "EKG, RESP, NIBP, SpO2, 2-TEMP, PR",
      "Batarya": "Şarj Edilebilir Dahili Akü",
      "Kullanım Tipi": "Yetişkin, Pediatrik ve Yenidoğan Seçilebilir Modlar",
      "Garanti": "1 Yıl Tam Garanti"
    },
    "applications": [
      "Özel Klinikler ve Tıp Merkezleri",
      "Yataklı Hasta Servisleri",
      "Acil Gözlem Odaları"
    ],
    "translations": {
      "tr": {
        "title": "Contec CMS 8000 Hastabaşı Monitörü",
        "shortDescription": "Çok yönlü parametre takibi ve pratik kullanımıyla ekonomik revizyonlu hasta monitörü.",
        "description": "Contec CMS 8000, 12.1 inç yüksek çözünürlüklü ekranında EKG, tansiyon, oksijen saturasyonu ve solunum değerlerini eşzamanlı gösterir. Kliniğiniz için test edilmiş garantili çözümdür."
      },
      "en": {
        "title": "Contec CMS 8000 Bedside Patient Monitor",
        "shortDescription": "Versatile 12.1-inch multi-parameter vital signs monitor with built-in rechargeable battery.",
        "description": "Delivers real-time monitoring of ECG, NIBP, SpO2, and respiration for everyday hospital workflow."
      },
      "de": {
        "title": "Contec CMS 8000 Monitörü (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Contec mit 1 Jahr Garantie.",
        "description": "Delivers real-time monitoring of ECG, NIBP, SpO2, and respiration for everyday hospital workflow. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Contec CMS 8000 (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Contec مع ضمان لمدة عام كامل.",
        "description": "Contec CMS 8000, 12.1 inç yüksek çözünürlüklü ekranında EKG, tansiyon, oksijen saturasyonu ve solunum değerlerini eşzamanlı gösterir. Kliniğiniz için test edilmiş garantili çözümdür. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Contec CMS 8000 リファービッシュ医療機器",
        "shortDescription": "Contec製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Delivers real-time monitoring of ECG, NIBP, SpO2, and respiration for everyday hospital workflow. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Contec CMS 8000 翻新医疗设备",
        "shortDescription": "Contec 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Delivers real-time monitoring of ECG, NIBP, SpO2, and respiration for everyday hospital workflow. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-mon-blt-anyview-a5",
    "slug": "blt-anyview-a5-moduler-hastabasi-monitoru",
    "categorySlug": "fizyolojik-sinyal-izleyiciler",
    "brand": "Biolight (BLT)",
    "model": "AnyView A5",
    "sku": "BLT-A5-030",
    "condition": "SECOND_HAND",
    "featured": true,
    "sortOrder": 30,
    "images": [
      "/images/products/hastabasi-monitoru-7.webp"
    ],
    "technicalSpecs": {
      "Ekran": "12.1 inç Dokunmatik Yüksek Çözünürlüklü LED Ekran",
      "Mimari": "Modüler Tak-Çıkar Parametre Yuvası",
      "Gelişmiş Özellikler": "OxyCRG (Yenidoğan Solunum Grafiği), İlaç Doz Hesaplama, Hemodinamik Hesaplamalar",
      "Gövde": "Fansız Sessiz Soğutma Tasarımı (Tozsuz ve Hijyenik)",
      "Garanti": "1 Yıl Cebeci Medikal Garantili"
    },
    "applications": [
      "Yoğun Bakım Üniteleri",
      "Yenidoğan Yoğun Bakım (NICU)",
      "Ameliyathane ve Kardiyoloji"
    ],
    "translations": {
      "tr": {
        "title": "Biolight BLT AnyView A5 Modüler Hastabaşı Monitörü",
        "shortDescription": "Fansız hijyenik gövdeli, dokunmatik ekranlı ve modüler mimarili üst segment hasta monitörü.",
        "description": "BLT AnyView A5, modüler tak-çıkar parametre mimarisi ve sessiz fansız tasarımıyla yoğun bakım ortamlarında çapraz enfeksiyon riskini azaltırken maksimum izleme performansı sunar."
      },
      "en": {
        "title": "Biolight BLT AnyView A5 Modular Patient Monitor",
        "shortDescription": "Advanced modular patient monitor with fanless cooling, touchscreen display, and transport capability.",
        "description": "The AnyView A5 features flexible plug-and-play parameter modules, hemodynamic calculations, and comprehensive alarm management."
      },
      "de": {
        "title": "Biolight (BLT) AnyView A5 Monitörü (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Biolight (BLT) mit 1 Jahr Garantie.",
        "description": "The AnyView A5 features flexible plug-and-play parameter modules, hemodynamic calculations, and comprehensive alarm management. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Biolight (BLT) AnyView A5 (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Biolight (BLT) مع ضمان لمدة عام كامل.",
        "description": "BLT AnyView A5, modüler tak-çıkar parametre mimarisi ve sessiz fansız tasarımıyla yoğun bakım ortamlarında çapraz enfeksiyon riskini azaltırken maksimum izleme performansı sunar. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Biolight (BLT) AnyView A5 リファービッシュ医療機器",
        "shortDescription": "Biolight (BLT)製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "The AnyView A5 features flexible plug-and-play parameter modules, hemodynamic calculations, and comprehensive alarm management. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Biolight (BLT) AnyView A5 翻新医疗设备",
        "shortDescription": "Biolight (BLT) 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "The AnyView A5 features flexible plug-and-play parameter modules, hemodynamic calculations, and comprehensive alarm management. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-mon-philips-intellivue-mp5",
    "slug": "philips-intellivue-mp5-kompakt-hastabasi-monitoru",
    "categorySlug": "fizyolojik-sinyal-izleyiciler",
    "brand": "Philips",
    "model": "IntelliVue MP5",
    "sku": "PHL-MP5-031",
    "condition": "SECOND_HAND",
    "featured": true,
    "sortOrder": 31,
    "images": [
      "/images/products/hastabasi-monitoru-8.webp"
    ],
    "technicalSpecs": {
      "Ekran": "8.4 inç SVGA Renkli Dokunmatik Ekran",
      "Parametreler": "Entegre EKG, SpO2, NIBP, Opsiyonel IBP / CO2",
      "Ağırlık": "Hafif ve Taşınabilir (< 4 kg)",
      "Ağ Bağlantısı": "Kablosuz ve Kablolu LAN Desteği",
      "Durum": "Orijinal Philips Güvencesiyle Revizyonlu, 1 Yıl Garantili"
    },
    "applications": [
      "Ameliyat Sonrası Derlenme (PACU)",
      "Acil Servis ve Triyaj",
      "Hastane İçi Hasta Nakli",
      "Günübirlik Cerrahi Merkezleri"
    ],
    "translations": {
      "tr": {
        "title": "Philips IntelliVue MP5 Kompakt Hastabaşı Monitörü",
        "shortDescription": "Kompakt, taşınabilir dokunmatik ekranlı ve yüksek hassasiyetli Philips transport hasta monitörü.",
        "description": "Philips IntelliVue MP5, küçük boyutuna rağmen eksiksiz bir yoğun bakım monitörünün tüm gücünü sunar. Taşınabilir yapısı sayesinde hastane içinde hasta nakil süreçlerinde vital takibi kesintisiz sürdürür."
      },
      "en": {
        "title": "Philips IntelliVue MP5 Compact Patient Monitor",
        "shortDescription": "Lightweight, highly portable touchscreen monitor delivering Philips IntelliVue monitoring standards.",
        "description": "Ideal for intermediate care, ambulatory surgery, emergency triage, and seamless patient transport."
      },
      "de": {
        "title": "Philips IntelliVue MP5 Monitörü (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Philips mit 1 Jahr Garantie.",
        "description": "Ideal for intermediate care, ambulatory surgery, emergency triage, and seamless patient transport. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Philips IntelliVue MP5 (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Philips مع ضمان لمدة عام كامل.",
        "description": "Philips IntelliVue MP5, küçük boyutuna rağmen eksiksiz bir yoğun bakım monitörünün tüm gücünü sunar. Taşınabilir yapısı sayesinde hastane içinde hasta nakil süreçlerinde vital takibi kesintisiz sürdürür. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Philips IntelliVue MP5 リファービッシュ医療機器",
        "shortDescription": "Philips製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Ideal for intermediate care, ambulatory surgery, emergency triage, and seamless patient transport. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Philips IntelliVue MP5 翻新医疗设备",
        "shortDescription": "Philips 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Ideal for intermediate care, ambulatory surgery, emergency triage, and seamless patient transport. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-mon-mesa-ms100",
    "slug": "mesa-ms100-hastabasi-monitoru",
    "categorySlug": "fizyolojik-sinyal-izleyiciler",
    "brand": "Mesa",
    "model": "MS100",
    "sku": "MSA-100-032",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 32,
    "images": [
      "/images/products/hastabasi-monitoru-9.webp"
    ],
    "technicalSpecs": {
      "Ölçümler": "EKG, NIBP, SpO2, Nabız, Sıcaklık",
      "Ekran": "Renkli TFT Ekran",
      "Alarm": "Görsel ve Sesli Çok Kademeli Uyarı Sistemi",
      "Garanti": "1 Yıl Cebeci Medikal Garantili"
    },
    "applications": [
      "Klinik Gözlem Odaları",
      "Hasta Servisleri",
      "Tıp Merkezleri"
    ],
    "translations": {
      "tr": {
        "title": "Mesa MS100 Hastabaşı Monitörü",
        "shortDescription": "Klinik vital bulguların güvenilir takibi için revizyonlu kompakt hastabaşı monitörü.",
        "description": "Mesa MS100, kliniklerde rutin hasta izlemi için tasarlanmış dayanıklı ve ekonomik bir monitördür. Tüm sensör fonksiyonları ve batarya performansı test edilmiştir."
      },
      "en": {
        "title": "Mesa MS100 Bedside Patient Monitor",
        "shortDescription": "Compact patient monitor offering dependable physiological parameter telemetry.",
        "description": "Provides solid routine monitoring of vital parameters with audible and visual safety alarms."
      },
      "de": {
        "title": "Mesa MS100 Monitörü (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Mesa mit 1 Jahr Garantie.",
        "description": "Provides solid routine monitoring of vital parameters with audible and visual safety alarms. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Mesa MS100 (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Mesa مع ضمان لمدة عام كامل.",
        "description": "Mesa MS100, kliniklerde rutin hasta izlemi için tasarlanmış dayanıklı ve ekonomik bir monitördür. Tüm sensör fonksiyonları ve batarya performansı test edilmiştir. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Mesa MS100 リファービッシュ医療機器",
        "shortDescription": "Mesa製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Provides solid routine monitoring of vital parameters with audible and visual safety alarms. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Mesa MS100 翻新医疗设备",
        "shortDescription": "Mesa 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Provides solid routine monitoring of vital parameters with audible and visual safety alarms. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-mon-guoteng-gt9003f",
    "slug": "guoteng-gt9003f-hastabasi-monitoru",
    "categorySlug": "fizyolojik-sinyal-izleyiciler",
    "brand": "Guoteng",
    "model": "GT9003F",
    "sku": "GTG-900-033",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 33,
    "images": [
      "/images/products/hastabasi-monitoru-10.webp"
    ],
    "technicalSpecs": {
      "Ekran": "12.1 inç Renkli LCD Ekran",
      "Parametreler": "EKG, SpO2, NIBP, RESP, TEMP",
      "Trend": "72 Saatlik Grafik Trend İncelemesi",
      "Garanti": "1 Yıl Tam Garanti"
    },
    "applications": [
      "Genel Hastane Yataklı Servisleri",
      "Acil Müdahale",
      "Klinikler"
    ],
    "translations": {
      "tr": {
        "title": "Guoteng GT9003F Çok Parametreli Monitör",
        "shortDescription": "Renkli geniş ekranlı, çok parametreli ve revizyonlu genel amaçlı hasta monitörü.",
        "description": "Guoteng GT9003F, hasta takibinde temel yaşamsal parametreleri tek ekranda toplayan ekonomik bir çözümdür. Periyodik bakımı ve kalibrasyonları tamamlanmıştır."
      },
      "en": {
        "title": "Guoteng GT9003F Multi-Parameter Patient Monitor",
        "shortDescription": "Full-featured 12.1-inch patient monitor for ward monitoring and clinical vital checks.",
        "description": "Cost-effective multi-parameter monitor with reliable alarm handling and trend memory."
      },
      "de": {
        "title": "Guoteng GT9003F Monitör (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Guoteng mit 1 Jahr Garantie.",
        "description": "Cost-effective multi-parameter monitor with reliable alarm handling and trend memory. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Guoteng GT9003F (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Guoteng مع ضمان لمدة عام كامل.",
        "description": "Guoteng GT9003F, hasta takibinde temel yaşamsal parametreleri tek ekranda toplayan ekonomik bir çözümdür. Periyodik bakımı ve kalibrasyonları tamamlanmıştır. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Guoteng GT9003F リファービッシュ医療機器",
        "shortDescription": "Guoteng製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Cost-effective multi-parameter monitor with reliable alarm handling and trend memory. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Guoteng GT9003F 翻新医疗设备",
        "shortDescription": "Guoteng 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Cost-effective multi-parameter monitor with reliable alarm handling and trend memory. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-mon-datascope-passport-xg",
    "slug": "datascope-passport-xg-hastabasi-monitoru",
    "categorySlug": "fizyolojik-sinyal-izleyiciler",
    "brand": "Datascope (Mindray)",
    "model": "Passport XG",
    "sku": "DSC-PXG-034",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 34,
    "images": [
      "/images/products/hastabasi-monitoru-11.webp"
    ],
    "technicalSpecs": {
      "Menşei": "ABD (Datascope Corp.)",
      "Ekran": "Renkli Yüksek Kontrastlı Ekran",
      "Parametreler": "3/5 Derivasyon EKG, Masimo / Nellcor SpO2, NIBP, Sıcaklık",
      "Dahili Yazıcı": "Entegre İki Kanallı Termal Kaydedici",
      "Garanti": "1 Yıl Cebeci Medikal Garantisi"
    },
    "applications": [
      "Ameliyathane ve Sedasyon Odaları",
      "Endoskopi ve Kolonoskopi Takip Alanları",
      "Yoğun Bakım ve PACU"
    ],
    "translations": {
      "tr": {
        "title": "Datascope Passport XG Hastabaşı Monitörü",
        "shortDescription": "Amerikan Datascope kalitesinde, entegre yazıcılı ve yüksek doğruluklu anestezi/yoğun bakım monitörü.",
        "description": "Datascope Passport XG, cerrahi ve anestezi takiplerinde dünya genelinde yaygın kullanılan efsanevi bir modeldir. Güçlü NIBP algoritması ve net dalga formu sunumu ile güven verir."
      },
      "en": {
        "title": "Datascope Passport XG Patient Monitor",
        "shortDescription": "Renowned American clinical monitor with integrated thermal recorder and vital sign precision.",
        "description": "Built for durable operating room and sedation monitoring with clear ECG filtering and rapid NIBP acquisition."
      },
      "de": {
        "title": "Datascope (Mindray) Passport XG Monitörü (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Datascope (Mindray) mit 1 Jahr Garantie.",
        "description": "Built for durable operating room and sedation monitoring with clear ECG filtering and rapid NIBP acquisition. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Datascope (Mindray) Passport XG (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Datascope (Mindray) مع ضمان لمدة عام كامل.",
        "description": "Datascope Passport XG, cerrahi ve anestezi takiplerinde dünya genelinde yaygın kullanılan efsanevi bir modeldir. Güçlü NIBP algoritması ve net dalga formu sunumu ile güven verir. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Datascope (Mindray) Passport XG リファービッシュ医療機器",
        "shortDescription": "Datascope (Mindray)製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Built for durable operating room and sedation monitoring with clear ECG filtering and rapid NIBP acquisition. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Datascope (Mindray) Passport XG 翻新医疗设备",
        "shortDescription": "Datascope (Mindray) 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Built for durable operating room and sedation monitoring with clear ECG filtering and rapid NIBP acquisition. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-kangazi-osmetech-opti",
    "slug": "osmetech-opti-cca-kan-gazi-analizoru",
    "categorySlug": "laboratuvar-cihazlari",
    "brand": "Osmetech (OPTI Medical)",
    "model": "OPTI CCA / OPTI Lion",
    "sku": "OSM-OPT-035",
    "condition": "SECOND_HAND",
    "featured": true,
    "sortOrder": 35,
    "images": [
      "/images/products/kan-gazi-analizoru-1.webp"
    ],
    "technicalSpecs": {
      "Ölçüm Teknolojisi": "Optik Floresans Sensör Kaseti (Elektrot Bakımı Gerektirmez)",
      "Ölçülen Parametreler": "pH, PCO2, PO2, Na+, K+, Ca++, Cl-, Glukoz, Laktat, Hematokrit (Hct), tHb",
      "Örnek Tipi": "Tam Kan (Arteryel, Venöz, Kılcal)",
      "Örnek Hacmi": "Yalnızca 125 µL mikro örnekleme",
      "Sonuç Süresi": "< 120 saniyede tam sonuç",
      "Garanti": "1 Yıl Cebeci Medikal Garantili"
    },
    "applications": [
      "Yoğun Bakım Üniteleri (ICU / NICU)",
      "Acil Servisler ve Kırmızı Alan",
      "Kardiyovasküler Cerrahi ve Perfüzyon",
      "Göğüs Hastalıkları ve Solunum Laboratuvarları"
    ],
    "translations": {
      "tr": {
        "title": "Osmetech OPTI CCA Taşınabilir Kan Gazı Analizörü",
        "shortDescription": "Optik kaset teknolojili, sıvı reaktif ve elektrot bakımı gerektirmeyen taşınabilir kan gazı analizörü.",
        "description": "Osmetech OPTI CCA, kritik hasta başında birkaç dakika içinde hassas kan gazı, elektrolit ve laktat ölçümü sağlayan kompakt analizördür. Optik teknolojisi sayesinde bekleme maliyeti oluşturmaz. Revizyonlu ve test onaylıdır."
      },
      "en": {
        "title": "Osmetech OPTI CCA Portable Blood Gas Analyzer",
        "shortDescription": "Point-of-care optical fluorescence blood gas and electrolyte analyzer with maintenance-free cassettes.",
        "description": "Delivers fast, lab-quality pH, blood gas, electrolyte, and metabolite results in less than 2 minutes using single-use optical cassettes."
      },
      "de": {
        "title": "Osmetech (OPTI Medical) OPTI CCA / OPTI Lion Analizörü (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Osmetech (OPTI Medical) mit 1 Jahr Garantie.",
        "description": "Delivers fast, lab-quality pH, blood gas, electrolyte, and metabolite results in less than 2 minutes using single-use optical cassettes. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Osmetech (OPTI Medical) OPTI CCA / OPTI Lion (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Osmetech (OPTI Medical) مع ضمان لمدة عام كامل.",
        "description": "Osmetech OPTI CCA, kritik hasta başında birkaç dakika içinde hassas kan gazı, elektrolit ve laktat ölçümü sağlayan kompakt analizördür. Optik teknolojisi sayesinde bekleme maliyeti oluşturmaz. Revizyonlu ve test onaylıdır. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Osmetech (OPTI Medical) OPTI CCA / OPTI Lion リファービッシュ医療機器",
        "shortDescription": "Osmetech (OPTI Medical)製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Delivers fast, lab-quality pH, blood gas, electrolyte, and metabolite results in less than 2 minutes using single-use optical cassettes. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Osmetech (OPTI Medical) OPTI CCA / OPTI Lion 翻新医疗设备",
        "shortDescription": "Osmetech (OPTI Medical) 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Delivers fast, lab-quality pH, blood gas, electrolyte, and metabolite results in less than 2 minutes using single-use optical cassettes. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-kangazi-irma-trupoint",
    "slug": "itc-irma-trupoint-kan-gazi-analizoru",
    "categorySlug": "laboratuvar-cihazlari",
    "brand": "ITC (LifeHealth)",
    "model": "IRMA TRUPOINT",
    "sku": "ITC-TRU-036",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 36,
    "images": [
      "/images/products/kan-gazi-analizoru-2.webp"
    ],
    "technicalSpecs": {
      "Ölçüm Prensipi": "Point-of-Care Tek Kullanımlık Kartuş Sistemi",
      "Parametreler": "pH, pCO2, pO2, Na+, K+, Ca++, Hct, Glukoz, BUN",
      "Ekran": "Entegre Dokunmatik Ekran ve Dahili Termal Yazıcı",
      "Kalibrasyon": "Her Kartuşta Otomatik Dahili Kalibrasyon",
      "Garanti": "1 Yıl Tam Garanti"
    },
    "applications": [
      "Acil Servis Laboratuvarı",
      "Ameliyathane ve Yoğun Bakım",
      "Klinik Laboratuvarlar"
    ],
    "translations": {
      "tr": {
        "title": "ITC IRMA TRUPOINT Kan Gazı ve Elektrolit Analizörü",
        "shortDescription": "Hasta başında saniyeler içinde kan gazı ve elektrolit tayini yapan pratik kartuşlu analizör.",
        "description": "IRMA TRUPOINT, hasta başı testlerinde (POCT) güvenilir sonuç veren taşınabilir kan gazı analiz cihazıdır. Kartuş okuma optikleri, termal yazıcısı ve bataryası test edilmiştir."
      },
      "en": {
        "title": "ITC IRMA TRUPOINT Blood Gas & Electrolyte Analyzer",
        "shortDescription": "Self-calibrating point-of-care blood gas system with single-use test cartridges.",
        "description": "Provides rapid bedside diagnostic results with minimal blood volume and immediate thermal printing."
      },
      "de": {
        "title": "ITC (LifeHealth) IRMA TRUPOINT Analizörü (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von ITC (LifeHealth) mit 1 Jahr Garantie.",
        "description": "Provides rapid bedside diagnostic results with minimal blood volume and immediate thermal printing. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "ITC (LifeHealth) IRMA TRUPOINT (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة ITC (LifeHealth) مع ضمان لمدة عام كامل.",
        "description": "IRMA TRUPOINT, hasta başı testlerinde (POCT) güvenilir sonuç veren taşınabilir kan gazı analiz cihazıdır. Kartuş okuma optikleri, termal yazıcısı ve bataryası test edilmiştir. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "ITC (LifeHealth) IRMA TRUPOINT リファービッシュ医療機器",
        "shortDescription": "ITC (LifeHealth)製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Provides rapid bedside diagnostic results with minimal blood volume and immediate thermal printing. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "ITC (LifeHealth) IRMA TRUPOINT 翻新医疗设备",
        "shortDescription": "ITC (LifeHealth) 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Provides rapid bedside diagnostic results with minimal blood volume and immediate thermal printing. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-kuvoz-fanem-vision-2186",
    "slug": "fanem-vision-2186-yenidogan-kuvozu",
    "categorySlug": "yogun-bakim-ve-yasam-destek",
    "brand": "Fanem",
    "model": "Vision 2186",
    "sku": "FNM-218-037",
    "condition": "SECOND_HAND",
    "featured": true,
    "sortOrder": 37,
    "images": [
      "/images/products/kuvoz-1.webp"
    ],
    "technicalSpecs": {
      "Kontrol Modları": "Hava Sıcaklığı Modu, Bebek (Cilt) Sıcaklığı Servomodu",
      "Nem Kontrolü": "Entegre Aktif Servo Nemlendirme Sistemi",
      "Oksijen Kontrolü": "Hassas Servo O2 Kontrol Modülü",
      "Kabin": "Çift Cidarlı Isı Kaybını Önleyen Akrilik Fanus",
      "Yatak": "Sıfır Derece ve Trendelenburg Kademesiz Pozisyonlandırma",
      "Garanti": "1 Yıl Cebeci Medikal Garantili"
    },
    "applications": [
      "Yenidoğan Yoğun Bakım Üniteleri (NICU - Seviye II ve III)",
      "Prematüre Bebek Bakımı",
      "Doğumhaneler ve Kadın Doğum Hastaneleri"
    ],
    "translations": {
      "tr": {
        "title": "Fanem Vision 2186 Yenidoğan Yoğun Bakım Küvözü",
        "shortDescription": "Servo nem ve oksijen kontrollü, çift cidarlı akrilik fanuslu profesyonel yenidoğan küvözü.",
        "description": "Fanem Vision 2186, prematüre ve kritik yenidoğanların mikroçevre şartlarını mükemmel sıcaklık, nem ve oksijen dengesiyle koruyan ileri teknoloji bir inkübatördür. Sensör kalibrasyonları ve ısıtıcı filtreleri yenilenmiştir."
      },
      "en": {
        "title": "Fanem Vision 2186 Neonatal Intensive Care Incubator",
        "shortDescription": "Advanced double-wall neonatal incubator with servo humidity and oxygen management.",
        "description": "Creates an optimal thermal and acoustic microenvironment for premature infants with precise servo skin temperature control."
      },
      "de": {
        "title": "Fanem Vision 2186 Küvözü (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Fanem mit 1 Jahr Garantie.",
        "description": "Creates an optimal thermal and acoustic microenvironment for premature infants with precise servo skin temperature control. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Fanem Vision 2186 (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Fanem مع ضمان لمدة عام كامل.",
        "description": "Fanem Vision 2186, prematüre ve kritik yenidoğanların mikroçevre şartlarını mükemmel sıcaklık, nem ve oksijen dengesiyle koruyan ileri teknoloji bir inkübatördür. Sensör kalibrasyonları ve ısıtıcı filtreleri yenilenmiştir. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Fanem Vision 2186 リファービッシュ医療機器",
        "shortDescription": "Fanem製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Creates an optimal thermal and acoustic microenvironment for premature infants with precise servo skin temperature control. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Fanem Vision 2186 翻新医疗设备",
        "shortDescription": "Fanem 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Creates an optimal thermal and acoustic microenvironment for premature infants with precise servo skin temperature control. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-kuvoz-ertunc-ozcan-babynest-ic700",
    "slug": "ertunc-ozcan-babynest-ic700-kuvoz",
    "categorySlug": "yogun-bakim-ve-yasam-destek",
    "brand": "Ertunç Özcan",
    "model": "BabyNest IC700",
    "sku": "EOZ-IC7-038",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 38,
    "images": [
      "/images/products/kuvoz-2.webp"
    ],
    "technicalSpecs": {
      "Kontrol Tipi": "Mikroişlemci Kontrollü Cilt ve Hava Isıtma",
      "Fanus": "Çift Cidarlı Şeffaf Başlık ve 6 Giriş Portu",
      "Yükseklik Ayarı": "Elektrikli Motorlu Kolay Yükseklik Ayarı",
      "Alarmlar": "Sıcaklık Sapması, Sensör Hatası, Fan Arızası ve Elektrik Kesintisi",
      "Garanti": "1 Yıl Cebeci Medikal Güvencesi"
    },
    "applications": [
      "Yenidoğan Yoğun Bakım",
      "Pediatrik Klinikler",
      "Kadın Doğum Merkezleri"
    ],
    "translations": {
      "tr": {
        "title": "Ertunç Özcan BabyNest IC700 Yoğun Bakım Küvözü",
        "shortDescription": "Yerli standartların öncüsü Ertunç Özcan güvencesiyle revizyonlu mikroişlemcili bebek küvözü.",
        "description": "BabyNest IC700, yenidoğan bakımında stabil sıcaklık dağılımı ve kolay klinik müdahale imkanı sunan bir küvöz modelidir. Fan motoru, ısıtıcı rezistansı ve cilt probları yenilenmiştir."
      },
      "en": {
        "title": "Ertunç Özcan BabyNest IC700 Infant Incubator",
        "shortDescription": "Microprocessor controlled neonatal incubator designed for steady temperature and humidity control.",
        "description": "Features double-walled hood, motorized height adjustment, and dependable alarm safety architecture."
      },
      "de": {
        "title": "Ertunç Özcan BabyNest IC700 Küvözü (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Ertunç Özcan mit 1 Jahr Garantie.",
        "description": "Features double-walled hood, motorized height adjustment, and dependable alarm safety architecture. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Ertunç Özcan BabyNest IC700 (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Ertunç Özcan مع ضمان لمدة عام كامل.",
        "description": "BabyNest IC700, yenidoğan bakımında stabil sıcaklık dağılımı ve kolay klinik müdahale imkanı sunan bir küvöz modelidir. Fan motoru, ısıtıcı rezistansı ve cilt probları yenilenmiştir. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Ertunç Özcan BabyNest IC700 リファービッシュ医療機器",
        "shortDescription": "Ertunç Özcan製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Features double-walled hood, motorized height adjustment, and dependable alarm safety architecture. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Ertunç Özcan BabyNest IC700 翻新医疗设备",
        "shortDescription": "Ertunç Özcan 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Features double-walled hood, motorized height adjustment, and dependable alarm safety architecture. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-kuvoz-drager-caleo-isolette",
    "slug": "drager-caleo-isolette-yenidogan-kuvozu",
    "categorySlug": "yogun-bakim-ve-yasam-destek",
    "brand": "Dräger",
    "model": "Caleo / Isolette",
    "sku": "DRG-CAL-039",
    "condition": "SECOND_HAND",
    "featured": true,
    "sortOrder": 39,
    "images": [
      "/images/products/kuvoz-3.webp"
    ],
    "technicalSpecs": {
      "Mikroçevre": "Gelişmiş Çift Hava Perdesi (Fanus Kapakları Açıldığında Isı Kaybını Önler)",
      "Servo Kontrol": "Hassas Cilt Sıcaklığı, Hava Sıcaklığı, Nem ve O2",
      "Dahili Terazi": "Opsiyonel Yatak İçi Entegre Tartı Sistemi",
      "Akustik Seviye": "Ultra Düşük Gürültü Seviyesi (< 47 dBA)",
      "Garanti": "1 Yıl Tam Teknik Servis Garantili"
    },
    "applications": [
      "3. Seviye Yenidoğan Yoğun Bakım (NICU)",
      "Aşırı Düşük Doğum Ağırlıklı (ELBW) Bebek Tedavisi",
      "Üniversite ve Şehir Hastaneleri"
    ],
    "translations": {
      "tr": {
        "title": "Dräger Caleo / Isolette Yenidoğan Küvözü",
        "shortDescription": "Dünya standartlarında Alman Dräger mikroçevre teknolojisiyle üretilmiş üst segment yenidoğan küvözü.",
        "description": "Dräger Caleo, fanus kapağı açıldığında bile bebeğin vücut ısısını koruyan çift hava perdesi teknolojisine sahip altın standart bir küvözdür. Tüm sensör ve hava akış kalibrasyonları yapılmıştır."
      },
      "en": {
        "title": "Dräger Caleo / Isolette Neonatal Incubator",
        "shortDescription": "Gold standard German engineered neonatal incubator with double air curtain technology.",
        "description": "Delivers superior developmental care for micro-preemies with whisper-quiet operation and sophisticated climate control."
      },
      "de": {
        "title": "Dräger Caleo / Isolette Küvözü (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Dräger mit 1 Jahr Garantie.",
        "description": "Delivers superior developmental care for micro-preemies with whisper-quiet operation and sophisticated climate control. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Dräger Caleo / Isolette (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Dräger مع ضمان لمدة عام كامل.",
        "description": "Dräger Caleo, fanus kapağı açıldığında bile bebeğin vücut ısısını koruyan çift hava perdesi teknolojisine sahip altın standart bir küvözdür. Tüm sensör ve hava akış kalibrasyonları yapılmıştır. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Dräger Caleo / Isolette リファービッシュ医療機器",
        "shortDescription": "Dräger製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Delivers superior developmental care for micro-preemies with whisper-quiet operation and sophisticated climate control. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Dräger Caleo / Isolette 翻新医疗设备",
        "shortDescription": "Dräger 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Delivers superior developmental care for micro-preemies with whisper-quiet operation and sophisticated climate control. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-kuvoz-david-yp2000",
    "slug": "david-yp-2000-yenidogan-kuvozu",
    "categorySlug": "yogun-bakim-ve-yasam-destek",
    "brand": "David Medical",
    "model": "YP-2000",
    "sku": "DVD-YP2-040",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 40,
    "images": [
      "/images/products/kuvoz-4.webp"
    ],
    "technicalSpecs": {
      "Ekran": "Geniş LCD Bilgi Ekranı",
      "Kontrol": "Servo Nem, Cilt ve Hava Sıcaklığı",
      "Yatak Eğimi": "Kademesiz Ayarlanabilir Bebek Yatağı",
      "Çift Cidar": "Var (Isı Yalıtımlı Akrilik Gövde)",
      "Garanti": "1 Yıl Cebeci Medikal Garantili"
    },
    "applications": [
      "Yenidoğan Servisleri",
      "Doğumhaneler",
      "Özel Hastaneler"
    ],
    "translations": {
      "tr": {
        "title": "David YP-2000 Yenidoğan Yoğun Bakım Küvözü",
        "shortDescription": "Güvenilir servo nem ve sıcaklık kontrollü, geniş kabinli revizyonlu küvöz.",
        "description": "David YP-2000, prematüre bebeklerin bakımı için stabil termal şartlar oluşturan modern bir küvözdür. Biyomedikal testleri tamamlanmış olup 1 yıl garantilidir."
      },
      "en": {
        "title": "David YP-2000 Infant Incubator",
        "shortDescription": "Modern neonatal incubator with servo humidity, skin temperature tracking, and dual-wall hood.",
        "description": "Provides safe thermal regulation and easy clinical access for routine and intensive neonatal therapy."
      },
      "de": {
        "title": "David Medical YP-2000 Küvözü (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von David Medical mit 1 Jahr Garantie.",
        "description": "Provides safe thermal regulation and easy clinical access for routine and intensive neonatal therapy. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "David Medical YP-2000 (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة David Medical مع ضمان لمدة عام كامل.",
        "description": "David YP-2000, prematüre bebeklerin bakımı için stabil termal şartlar oluşturan modern bir küvözdür. Biyomedikal testleri tamamlanmış olup 1 yıl garantilidir. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "David Medical YP-2000 リファービッシュ医療機器",
        "shortDescription": "David Medical製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Provides safe thermal regulation and easy clinical access for routine and intensive neonatal therapy. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "David Medical YP-2000 翻新医疗设备",
        "shortDescription": "David Medical 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Provides safe thermal regulation and easy clinical access for routine and intensive neonatal therapy. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-kuvoz-isolette-c100",
    "slug": "air-shields-isolette-c100-bebek-kuvozu",
    "categorySlug": "yogun-bakim-ve-yasam-destek",
    "brand": "Hill-Rom Air-Shields",
    "model": "Isolette C100",
    "sku": "HIL-C10-041",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 41,
    "images": [
      "/images/products/kuvoz-5.webp"
    ],
    "technicalSpecs": {
      "Marka": "Air-Shields Isolette (Hill-Rom)",
      "Klasik Model": "Klinik Olarak Kanıtlanmış Sıcaklık Kararlılığı",
      "Hava Akışı": "Düşük Hızlı Laminar Hava Dağıtımı",
      "Erişim": "Çoklu El Giriş Portları ve Ön Açılır Kapak",
      "Garanti": "1 Yıl Tam Garanti"
    },
    "applications": [
      "Yenidoğan Servisleri",
      "Pediatri Klinikleri",
      "Bebek Bakım Odaları"
    ],
    "translations": {
      "tr": {
        "title": "Air-Shields Isolette C100 Bebek Küvözü",
        "shortDescription": "Dayanıklı tasarımı ve istikrarlı sıcaklık dağılımıyla bilinen klasik Air-Shields küvöz.",
        "description": "Isolette C100, yenidoğan bakımında uzun yıllardır güvenle kullanılan sağlam gövdeli bir inkübatördür. Termostat devreleri ve fan rulmanları yenilenmiştir."
      },
      "en": {
        "title": "Air-Shields Isolette C100 Infant Incubator",
        "shortDescription": "Classic, proven neonatal incubator providing uniform air temperature and durable mechanics.",
        "description": "Manufactured by Air-Shields / Hill-Rom, fully serviced and calibrated for continuous infant warming."
      },
      "de": {
        "title": "Hill-Rom Air-Shields Isolette C100 Küvözü (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Hill-Rom Air-Shields mit 1 Jahr Garantie.",
        "description": "Manufactured by Air-Shields / Hill-Rom, fully serviced and calibrated for continuous infant warming. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Hill-Rom Air-Shields Isolette C100 (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Hill-Rom Air-Shields مع ضمان لمدة عام كامل.",
        "description": "Isolette C100, yenidoğan bakımında uzun yıllardır güvenle kullanılan sağlam gövdeli bir inkübatördür. Termostat devreleri ve fan rulmanları yenilenmiştir. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Hill-Rom Air-Shields Isolette C100 リファービッシュ医療機器",
        "shortDescription": "Hill-Rom Air-Shields製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Manufactured by Air-Shields / Hill-Rom, fully serviced and calibrated for continuous infant warming. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Hill-Rom Air-Shields Isolette C100 翻新医疗设备",
        "shortDescription": "Hill-Rom Air-Shields 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Manufactured by Air-Shields / Hill-Rom, fully serviced and calibrated for continuous infant warming. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-kuvoz-atom-v85",
    "slug": "atom-medical-v-85-yenidogan-kuvozu",
    "categorySlug": "yogun-bakim-ve-yasam-destek",
    "brand": "Atom Medical",
    "model": "V-85",
    "sku": "ATM-V85-042",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 42,
    "images": [
      "/images/products/kuvoz-6.webp"
    ],
    "technicalSpecs": {
      "Menşei": "Japonya (Atom Medical Corp.)",
      "Kontrol Prensibi": "Servo Cilt & Hava Sıcaklığı",
      "Fanus Yapısı": "Yüksek Şeffaflıkta Çift Cidarlı Başlık",
      "Kompakt Tasarım": "Yüksek Manevra Kabiliyetli Şasi",
      "Garanti": "1 Yıl Cebeci Medikal Garantisi"
    },
    "applications": [
      "Yenidoğan Yoğun Bakım",
      "Doğum Klinikleri",
      "Tıp Merkezleri"
    ],
    "translations": {
      "tr": {
        "title": "Atom Medical V-85 Yenidoğan Küvözü",
        "shortDescription": "Japon Atom Medical üretimi, hassas sıcaklık dengeli ve ergonomik revizyonlu küvöz.",
        "description": "Atom Medical V-85, kompakt boyutları ve Japon mekanik kalitesiyle yenidoğan ünitelerinde güvenilir bakım ortamı sağlar. Elektriksel güvenlik ve sıcaklık doğrulamaları yapılmıştır."
      },
      "en": {
        "title": "Atom Medical V-85 Infant Incubator",
        "shortDescription": "Japanese precision neonatal incubator with servo skin heating and ergonomic frame.",
        "description": "Atom V-85 offers reliable thermal control and comfortable nursing access for neonatal care."
      },
      "de": {
        "title": "Atom Medical V-85 Küvözü (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Atom Medical mit 1 Jahr Garantie.",
        "description": "Atom V-85 offers reliable thermal control and comfortable nursing access for neonatal care. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Atom Medical V-85 (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Atom Medical مع ضمان لمدة عام كامل.",
        "description": "Atom Medical V-85, kompakt boyutları ve Japon mekanik kalitesiyle yenidoğan ünitelerinde güvenilir bakım ortamı sağlar. Elektriksel güvenlik ve sıcaklık doğrulamaları yapılmıştır. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Atom Medical V-85 リファービッシュ医療機器",
        "shortDescription": "Atom Medical製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Atom V-85 offers reliable thermal control and comfortable nursing access for neonatal care. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Atom Medical V-85 翻新医疗设备",
        "shortDescription": "Atom Medical 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Atom V-85 offers reliable thermal control and comfortable nursing access for neonatal care. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-nst-ge-corometrics-170",
    "slug": "ge-corometrics-170-nst-fetal-monitor",
    "categorySlug": "fizyolojik-sinyal-izleyiciler",
    "brand": "GE Healthcare",
    "model": "Corometrics 170 Series",
    "sku": "GE-COR-043",
    "condition": "SECOND_HAND",
    "featured": true,
    "sortOrder": 43,
    "images": [
      "/images/products/nst-fetal-monitor-1.webp"
    ],
    "technicalSpecs": {
      "Problar": "9 Kristalleri Yüksek Hassasiyetli Fetal Kalp Hızı (FHR) Probu ve TOCO (Uterus Kasılma) Probu",
      "İkiz Gebelik Desteği": "Opsiyonel Çift FHR Probu ile İkiz Kalp Atımı Takibi",
      "Yazıcı": "Geniş Termal Çizici (Z-Fold EKG/NST Kağıdı)",
      "Fetal Hareket": "Otomatik Fetal Hareket Algılama ve Manuel İşaretleme Butonu",
      "Garanti": "1 Yıl Cebeci Medikal Garantili"
    },
    "applications": [
      "Kadın Hastalıkları ve Doğum Poliklinikleri",
      "Doğumhaneler ve Antenatal Takip Odaları",
      "Perinatoloji Merkezleri"
    ],
    "translations": {
      "tr": {
        "title": "GE Corometrics 170 Serisi NST Fetal Monitör",
        "shortDescription": "General Electric kalitesinde, yüksek hassasiyetli FHR ve TOCO problu non-stres test (NST) cihazı.",
        "description": "GE Corometrics 170 serisi, doğum öncesi ve doğum anında bebek kalp atışlarını (FHR) ve anne kasılmalarını (TOCO) kesintisiz kaydeden lider NST cihazıdır. Ultrasonik probları ve mekanik kaydedicisi eksiksiz test edilmiştir."
      },
      "en": {
        "title": "GE Corometrics 170 Series Fetal Monitor (NST)",
        "shortDescription": "Gold standard antepartum/intrapartum fetal monitor with high-sensitivity 9-crystal ultrasound probes.",
        "description": "GE Corometrics 170 ensures accurate fetal heart rate and uterine activity documentation for obstetrical clinics."
      },
      "de": {
        "title": "GE Healthcare Corometrics 170 Series Monitör (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von GE Healthcare mit 1 Jahr Garantie.",
        "description": "GE Corometrics 170 ensures accurate fetal heart rate and uterine activity documentation for obstetrical clinics. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "GE Healthcare Corometrics 170 Series (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة GE Healthcare مع ضمان لمدة عام كامل.",
        "description": "GE Corometrics 170 serisi, doğum öncesi ve doğum anında bebek kalp atışlarını (FHR) ve anne kasılmalarını (TOCO) kesintisiz kaydeden lider NST cihazıdır. Ultrasonik probları ve mekanik kaydedicisi eksiksiz test edilmiştir. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "GE Healthcare Corometrics 170 Series リファービッシュ医療機器",
        "shortDescription": "GE Healthcare製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "GE Corometrics 170 ensures accurate fetal heart rate and uterine activity documentation for obstetrical clinics. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "GE Healthcare Corometrics 170 Series 翻新医疗设备",
        "shortDescription": "GE Healthcare 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "GE Corometrics 170 ensures accurate fetal heart rate and uterine activity documentation for obstetrical clinics. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-pulse-nonin-7500",
    "slug": "nonin-7500-masaustu-pulse-oksimetre",
    "categorySlug": "fizyolojik-sinyal-izleyiciler",
    "brand": "Nonin Medical",
    "model": "7500",
    "sku": "NON-750-044",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 44,
    "images": [
      "/images/products/pulse-oksimetre-1.webp"
    ],
    "technicalSpecs": {
      "Teknoloji": "Nonin PureSAT® Akıllı Pulse Oksimetre Algoritması",
      "Ölçümler": "SpO2 (Oksijen Doygunluğu) ve Nabız Sayısı (Pulse Rate)",
      "Ekran": "Geniş LED Gösterge ve Nabız Çubuk Grafiği",
      "Batarya": "Dahili Akü ile 16 Saat Kesintisiz Çalışma",
      "Hafıza": "70 Saatlik Veri Kaydı",
      "Garanti": "1 Yıl Cebeci Medikal Güvencesi"
    },
    "applications": [
      "Uyku Laboratuvarları ve Solunum Klinikleri",
      "Ameliyathane Sonrası Derlenme",
      "Yenidoğan ve Pediatrik Oksijen Takibi",
      "Evde Mekanik Ventilasyonlu Hasta İzlemi"
    ],
    "translations": {
      "tr": {
        "title": "Nonin 7500 Masaüstü Dijital Pulse Oksimetre",
        "shortDescription": "Düşük perfüzyon ve hareketli hastalarda PureSAT® teknolojisiyle hassas oksijen ölçümü yapan masaüstü pulseoksimetre.",
        "description": "Nonin 7500, klinik hassasiyeti kanıtlanmış masaüstü pulse oksimetredir. Zorlu perfüzyon koşullarında bile doğru SpO2 ve nabız değerleri verir. Yetişkin/pediatrik sensörleri ile teslim edilir."
      },
      "en": {
        "title": "Nonin 7500 Tabletop Digital Pulse Oximeter",
        "shortDescription": "PureSAT® signal processing tabletop pulse oximeter for versatile clinical and home monitoring.",
        "description": "Engineered for reliable SpO2 measurements in motion and low perfusion environments across all age groups."
      },
      "de": {
        "title": "Nonin Medical 7500 Oksimetre (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Nonin Medical mit 1 Jahr Garantie.",
        "description": "Engineered for reliable SpO2 measurements in motion and low perfusion environments across all age groups. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Nonin Medical 7500 (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Nonin Medical مع ضمان لمدة عام كامل.",
        "description": "Nonin 7500, klinik hassasiyeti kanıtlanmış masaüstü pulse oksimetredir. Zorlu perfüzyon koşullarında bile doğru SpO2 ve nabız değerleri verir. Yetişkin/pediatrik sensörleri ile teslim edilir. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Nonin Medical 7500 リファービッシュ医療機器",
        "shortDescription": "Nonin Medical製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Engineered for reliable SpO2 measurements in motion and low perfusion environments across all age groups. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Nonin Medical 7500 翻新医疗设备",
        "shortDescription": "Nonin Medical 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Engineered for reliable SpO2 measurements in motion and low perfusion environments across all age groups. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-santrifuj-berkhun-m5000",
    "slug": "berkhun-m-5000-masaustu-santrifuj",
    "categorySlug": "laboratuvar-cihazlari",
    "brand": "Berkhun",
    "model": "M-5000",
    "sku": "BKH-M50-045",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 45,
    "images": [
      "/images/products/santrifuj-1.webp"
    ],
    "technicalSpecs": {
      "Maksimum Hız": "5000 RPM (Devir / Dakika)",
      "Rotor Tipi": "Açılı Klinik Tüp Rotoru",
      "Zamanlayıcı": "Dijital Zaman ve Hız Kontrolü",
      "Güvenlik": "Kapak Kilit Emniyeti ve Dengesizlik Sensörü",
      "Garanti": "1 Yıl Tam Garanti"
    },
    "applications": [
      "Biyokimya ve Hematoloji Laboratuvarları",
      "PRP ve Santrifüj Uygulama Klinikleri",
      "Tıp Merkezleri ve Poliklinikler"
    ],
    "translations": {
      "tr": {
        "title": "Berkhun M-5000 Masaüstü Klinik Santrifüj",
        "shortDescription": "5000 RPM dijital kontrollü, sessiz motorlu ve kapak kilit emniyetli klinik laboratuvar santrifüjü.",
        "description": "Berkhun M-5000, kan, serum ve idrar örneklerinin ayrıştırılmasında güvenilir devir kararlılığı sunan kompakt bir laboratuvar cihazıdır. Motor fırçaları ve rotor dengesi revize edilmiştir."
      },
      "en": {
        "title": "Berkhun M-5000 Benchtop Clinical Centrifuge",
        "shortDescription": "5000 RPM digital clinical centrifuge with safety lid-lock for serum and blood separation.",
        "description": "Provides smooth acceleration, quiet brushless motor drive, and precise timer regulation for medical labs."
      },
      "de": {
        "title": "Berkhun M-5000 Santrifüj (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Berkhun mit 1 Jahr Garantie.",
        "description": "Provides smooth acceleration, quiet brushless motor drive, and precise timer regulation for medical labs. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Berkhun M-5000 (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Berkhun مع ضمان لمدة عام كامل.",
        "description": "Berkhun M-5000, kan, serum ve idrar örneklerinin ayrıştırılmasında güvenilir devir kararlılığı sunan kompakt bir laboratuvar cihazıdır. Motor fırçaları ve rotor dengesi revize edilmiştir. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Berkhun M-5000 リファービッシュ医療機器",
        "shortDescription": "Berkhun製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Provides smooth acceleration, quiet brushless motor drive, and precise timer regulation for medical labs. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Berkhun M-5000 翻新医疗设备",
        "shortDescription": "Berkhun 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Provides smooth acceleration, quiet brushless motor drive, and precise timer regulation for medical labs. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-usg-philips-hdi-4000",
    "slug": "philips-hdi-4000-renkli-doppler-ultrason",
    "categorySlug": "endovizyon-sistemleri",
    "brand": "Philips",
    "model": "HDI 4000",
    "sku": "PHL-HDI-046",
    "condition": "SECOND_HAND",
    "featured": true,
    "sortOrder": 46,
    "images": [
      "/images/products/ultrason-1.webp"
    ],
    "technicalSpecs": {
      "Görüntüleme Modları": "B-Mod, M-Mod, Renkli Doppler (Color Doppler), Power Doppler, Pulsed Wave (PW) Spectral Doppler",
      "Ekran": "Yüksek Çözünürlüklü Medikal Monitör",
      "Prob Girişleri": "3 Aktif Prob Portu",
      "Uygulama Paketleri": "Abdomen, OB/GYN (Kadın Doğum), Vasküler, Küçük Organlar, Kardiyoloji",
      "Garanti": "1 Yıl Cebeci Medikal Garantili"
    },
    "applications": [
      "Radyoloji ve Görüntüleme Merkezleri",
      "Kadın Hastalıkları ve Doğum Poliklinikleri",
      "Genel Cerrahi ve Dahiliye Muayenehaneleri"
    ],
    "translations": {
      "tr": {
        "title": "Philips HDI 4000 Renkli Doppler Ultrason Cihazı",
        "shortDescription": "Çok yönlü klinik uygulamalar için yüksek görüntü berraklığına sahip Philips renkli Doppler ultrason.",
        "description": "Philips HDI 4000, vasküler akımlardan derin abdominal organlara kadar üstün akustik netlik sağlayan kanıtlanmış bir ultrasonografi sistemidir. Prob bağlantıları, akustik kalibrasyonu ve yazılım fonksiyonları test edilmiştir."
      },
      "en": {
        "title": "Philips HDI 4000 Color Doppler Ultrasound System",
        "shortDescription": "Versatile color Doppler ultrasound platform delivering proven acoustic clarity and diagnostic reliability.",
        "description": "Equipped with advanced broadband beamforming and specialized OB/GYN, abdominal, and vascular calculation packages."
      },
      "de": {
        "title": "Philips HDI 4000 Cihazı (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Philips mit 1 Jahr Garantie.",
        "description": "Equipped with advanced broadband beamforming and specialized OB/GYN, abdominal, and vascular calculation packages. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Philips HDI 4000 (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Philips مع ضمان لمدة عام كامل.",
        "description": "Philips HDI 4000, vasküler akımlardan derin abdominal organlara kadar üstün akustik netlik sağlayan kanıtlanmış bir ultrasonografi sistemidir. Prob bağlantıları, akustik kalibrasyonu ve yazılım fonksiyonları test edilmiştir. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Philips HDI 4000 リファービッシュ医療機器",
        "shortDescription": "Philips製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Equipped with advanced broadband beamforming and specialized OB/GYN, abdominal, and vascular calculation packages. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Philips HDI 4000 翻新医疗设备",
        "shortDescription": "Philips 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Equipped with advanced broadband beamforming and specialized OB/GYN, abdominal, and vascular calculation packages. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-usg-mitsubishi-p93",
    "slug": "mitsubishi-p93-termal-ultrason-yazicisi",
    "categorySlug": "endovizyon-sistemleri",
    "brand": "Mitsubishi Electric",
    "model": "P93",
    "sku": "MIT-P93-047",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 47,
    "images": [
      "/images/products/ultrason-2.webp"
    ],
    "technicalSpecs": {
      "Baskı Teknolojisi": "Yüksek Çözünürlüklü Termal Baskı (325 DPI)",
      "Baskı Hızı": "Yaklaşık 3.3 saniye / sayfa",
      "Kağıt Tipi": "110 mm Termal Rulo Kağıt (Standart / High Glossy)",
      "Giriş": "Standart BNC Kompozit Video Girişi",
      "Garanti": "1 Yıl Tam Garanti"
    },
    "applications": [
      "Ultrasonografi Görüntü Baskısı",
      "Mikroskopi ve Endoskopi Raporlama",
      "Kardiyoloji Kateterizasyon Laboratuvarları"
    ],
    "translations": {
      "tr": {
        "title": "Mitsubishi P93 Termal Ultrason Video Yazıcısı",
        "shortDescription": "Ultrason cihazları için endüstri standardı yüksek çözünürlüklü siyah-beyaz termal video printer.",
        "description": "Mitsubishi P93, ultrason görüntülerinin yüksek kontrast ve gri tonlama kalitesiyle anında kağıda basılmasını sağlar. Termal kafa temizliği ve mekanik testleri yapılmıştır."
      },
      "en": {
        "title": "Mitsubishi P93 Thermal Ultrasound Video Printer",
        "shortDescription": "Industry-standard monochrome thermal video printer for ultrasound diagnostic hardcopies.",
        "description": "Features 325 dpi high-density print head delivering fast, razor-sharp hardcopy medical records."
      },
      "de": {
        "title": "Mitsubishi Electric P93 Yazıcısı (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Mitsubishi Electric mit 1 Jahr Garantie.",
        "description": "Features 325 dpi high-density print head delivering fast, razor-sharp hardcopy medical records. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Mitsubishi Electric P93 (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Mitsubishi Electric مع ضمان لمدة عام كامل.",
        "description": "Mitsubishi P93, ultrason görüntülerinin yüksek kontrast ve gri tonlama kalitesiyle anında kağıda basılmasını sağlar. Termal kafa temizliği ve mekanik testleri yapılmıştır. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Mitsubishi Electric P93 リファービッシュ医療機器",
        "shortDescription": "Mitsubishi Electric製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Features 325 dpi high-density print head delivering fast, razor-sharp hardcopy medical records. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Mitsubishi Electric P93 翻新医疗设备",
        "shortDescription": "Mitsubishi Electric 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Features 325 dpi high-density print head delivering fast, razor-sharp hardcopy medical records. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-usg-sony-up21md",
    "slug": "sony-up-21md-renkli-medikal-video-yazici",
    "categorySlug": "endovizyon-sistemleri",
    "brand": "Sony",
    "model": "UP-21MD",
    "sku": "SNY-UP2-048",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 48,
    "images": [
      "/images/products/ultrason-3.webp"
    ],
    "technicalSpecs": {
      "Baskı Metodu": "Boya Süblimasyonlu Renkli Termal Baskı (Dye-Sublimation)",
      "Çözünürlük": "403 DPI Fotoğraf Kalitesinde Medikal Baskı",
      "Girişler": "S-Video (Y/C), Kompozit Video (BNC), RGB Girişi",
      "Baskı Boyutu": "A6 Formatı Renkli Medikal Fotoğraf",
      "Garanti": "1 Yıl Cebeci Medikal Güvencesi"
    },
    "applications": [
      "Endoskopi ve Laparoskopi Renkli Raporlama",
      "Renkli Doppler Ultrason Çıktıları",
      "Cerrahi Mikroskopi"
    ],
    "translations": {
      "tr": {
        "title": "Sony UP-21MD Renkli Medikal Video Yazıcı",
        "shortDescription": "Endoskopi ve ultrason cihazları için fotoğraf kalitesinde renkli süblimasyon video printer.",
        "description": "Sony UP-21MD, cerrahi ve endoskopik müdahalelerin gerçeğe yakın renklerde fotoğraflanmasını sağlayan profesyonel bir medikal yazıcıdır. Mekanik tepsisi ve transfer kafası revize edilmiştir."
      },
      "en": {
        "title": "Sony UP-21MD Color Medical Video Printer",
        "shortDescription": "A6 dye-sublimation color video printer for endoscopy and surgical documentation.",
        "description": "Delivers photo-realistic 403 dpi color prints from composite, S-video, or RGB analog surgical video sources."
      },
      "de": {
        "title": "Sony UP-21MD Yazıcı (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Sony mit 1 Jahr Garantie.",
        "description": "Delivers photo-realistic 403 dpi color prints from composite, S-video, or RGB analog surgical video sources. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Sony UP-21MD (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Sony مع ضمان لمدة عام كامل.",
        "description": "Sony UP-21MD, cerrahi ve endoskopik müdahalelerin gerçeğe yakın renklerde fotoğraflanmasını sağlayan profesyonel bir medikal yazıcıdır. Mekanik tepsisi ve transfer kafası revize edilmiştir. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Sony UP-21MD リファービッシュ医療機器",
        "shortDescription": "Sony製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Delivers photo-realistic 403 dpi color prints from composite, S-video, or RGB analog surgical video sources. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Sony UP-21MD 翻新医疗设备",
        "shortDescription": "Sony 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Delivers photo-realistic 403 dpi color prints from composite, S-video, or RGB analog surgical video sources. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-usg-mitsubishi-p91",
    "slug": "mitsubishi-p91-medikal-termal-yazici",
    "categorySlug": "endovizyon-sistemleri",
    "brand": "Mitsubishi Electric",
    "model": "P91",
    "sku": "MIT-P91-049",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 49,
    "images": [
      "/images/products/ultrason-4.webp"
    ],
    "technicalSpecs": {
      "Baskı Çözünürlüğü": "260 DPI Termal Çizici Kafa",
      "Uyumluluk": "Tüm Analog Video Çıkışlı Ultrason Sistemleri",
      "Kontrol": "Ön Panelden Kontrast, Parlaklık ve Boyut Ayarı",
      "Garanti": "1 Yıl Cebeci Medikal Garantili"
    },
    "applications": [
      "Ultrason Muayenehaneleri",
      "Poliklinik Görüntüleme",
      "Veterinerlik Ultrason Cihazları"
    ],
    "translations": {
      "tr": {
        "title": "Mitsubishi P91 Medikal Termal Ultrason Yazıcısı",
        "shortDescription": "Güvenilir, kompakt ve hızlı siyah-beyaz ultrason termal video kaydedici.",
        "description": "Mitsubishi P91, ultrasonografi çıktılarının net ve ekonomik şekilde alınması için üretilmiş sağlam bir yazıcıdır. Tüm termal elemanları ve besleme mekanizması test edilmiştir."
      },
      "en": {
        "title": "Mitsubishi P91 Monochrome Medical Printer",
        "shortDescription": "Compact monochrome thermal printer for analog ultrasound video printouts.",
        "description": "Proven medical imaging printer offering quick image capture and robust operation."
      },
      "de": {
        "title": "Mitsubishi Electric P91 Yazıcısı (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Mitsubishi Electric mit 1 Jahr Garantie.",
        "description": "Proven medical imaging printer offering quick image capture and robust operation. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Mitsubishi Electric P91 (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Mitsubishi Electric مع ضمان لمدة عام كامل.",
        "description": "Mitsubishi P91, ultrasonografi çıktılarının net ve ekonomik şekilde alınması için üretilmiş sağlam bir yazıcıdır. Tüm termal elemanları ve besleme mekanizması test edilmiştir. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Mitsubishi Electric P91 リファービッシュ医療機器",
        "shortDescription": "Mitsubishi Electric製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Proven medical imaging printer offering quick image capture and robust operation. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Mitsubishi Electric P91 翻新医疗设备",
        "shortDescription": "Mitsubishi Electric 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Proven medical imaging printer offering quick image capture and robust operation. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-vent-oricare-v8800",
    "slug": "oricare-v8800-yogun-bakim-ventilatoru",
    "categorySlug": "yogun-bakim-ve-yasam-destek",
    "brand": "Oricare",
    "model": "V8800",
    "sku": "ORI-V88-050",
    "condition": "SECOND_HAND",
    "featured": true,
    "sortOrder": 50,
    "images": [
      "/images/products/ventilator-1.webp"
    ],
    "technicalSpecs": {
      "Hasta Grubu": "Yetişkin, Pediatrik ve Yenidoğan (Opsiyonel)",
      "Solunum Modları": "VCV, PCV, SIMV-V, SIMV-P, PSV, CPAP/BiPAP, APRV, PRVC",
      "Ekran": "15 inç Renkli Dokunmatik TFT Ekran",
      "Ekşülasyon Valfi": "Otoklavlanabilir Entegre Isıtmalı Ekspirasyon Valfi",
      "Tidal Hacim": "20 - 2000 mL",
      "Gaz Girişi": "Merkezi O2 ve Medikal Hava Desteği",
      "Garanti": "1 Yıl Cebeci Medikal Tam Teknik Servis Garantili"
    },
    "applications": [
      "Genel ve Cerrahi Yoğun Bakım Üniteleri",
      "Koroner ve KVC Yoğun Bakım",
      "Solunum Yetmezliği ve ARDS Tedavisi"
    ],
    "translations": {
      "tr": {
        "title": "Oricare V8800 Yoğun Bakım Ventilatörü",
        "shortDescription": "15 inç dokunmatik ekranlı, gelişmiş invaziv ve non-invaziv modlara sahip yoğun bakım mekanik ventilatörü.",
        "description": "Oricare V8800, kritik solunum yetmezliği yaşayan yetişkin ve çocuk hastalarda fizyolojik solunumu en hassas şekilde destekleyen üst segment bir ventilatördür. Akış sensörü kalibrasyonu, O2 hücresi ve sızdırmazlık testleri yapılmıştır."
      },
      "en": {
        "title": "Oricare V8800 Intensive Care Ventilator",
        "shortDescription": "Premium 15-inch touchscreen ICU ventilator offering comprehensive invasive and non-invasive ventilation modes.",
"description": "Engineered for complex respiratory conditions with advanced lung recruitment tools, PRVC, and autoclavable exhalation assembly."
      },
      "de": {
        "title": "Oricare V8800 Ventilatörü (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Oricare mit 1 Jahr Garantie.",
        "description": "Engineered for complex respiratory conditions with advanced lung recruitment tools, PRVC, and autoclavable exhalation assembly. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Oricare V8800 (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Oricare مع ضمان لمدة عام كامل.",
        "description": "Oricare V8800, kritik solunum yetmezliği yaşayan yetişkin ve çocuk hastalarda fizyolojik solunumu en hassas şekilde destekleyen üst segment bir ventilatördür. Akış sensörü kalibrasyonu, O2 hücresi ve sızdırmazlık testleri yapılmıştır. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Oricare V8800 リファービッシュ医療機器",
        "shortDescription": "Oricare製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Engineered for complex respiratory conditions with advanced lung recruitment tools, PRVC, and autoclavable exhalation assembly. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Oricare V8800 翻新医疗设备",
        "shortDescription": "Oricare 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Engineered for complex respiratory conditions with advanced lung recruitment tools, PRVC, and autoclavable exhalation assembly. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-vent-newport-e500",
    "slug": "newport-e500-yogun-bakim-ventilatoru",
    "categorySlug": "yogun-bakim-ve-yasam-destek",
    "brand": "Newport Medical (Medtronic)",
    "model": "E500 Wave",
    "sku": "NWP-E50-051",
    "condition": "SECOND_HAND",
    "featured": true,
    "sortOrder": 51,
    "images": [
      "/images/products/ventilator-2.webp"
    ],
    "technicalSpecs": {
      "Hasta Kategorisi": "Pediatrik ve Yetişkin Hastalar",
      "Öne Çıkan Modlar": "V-A/C, P-A/C, V-SIMV, P-SIMV, SPONT (CPAP/PSV), BIFLEX Çift Seviyeli Basınç",
      "Tasarım": "Kompakt ve Dayanıklı Newport Dalga Formu Ekranı",
      "Tidal Hacim Aralığı": "20 - 2000 mL",
      "Garanti": "1 Yıl Tam Garanti"
    },
    "applications": [
      "Yoğun Bakım Üniteleri",
      "Kronik Solunum Bakım Merkezleri",
      "Hastaneler ve Tıp Fakülteleri"
    ],
    "translations": {
      "tr": {
        "title": "Newport E500 Yoğun Bakım Ventilatörü",
        "shortDescription": "Amerikan Newport (Medtronic) güvencesiyle kanıtlanmış güvenilirlikte revizyonlu mekanik ventilatör.",
        "description": "Newport E500 Wave, invaziv ve non-invaziv ventilasyon modları ile yoğun bakım ortamlarında stabil solunum desteği sunan kendini kanıtlamış bir cihazdır. Pnömatik valfleri ve debi sensörleri test edilmiştir."
      },
      "en": {
        "title": "Newport E500 Wave Critical Care Ventilator",
        "shortDescription": "Proven American ICU mechanical ventilator supporting pediatric to adult critical respiratory therapy.",
        "description": "Manufactured by Newport Medical (Medtronic), featuring dual-mode ventilation and comprehensive graphic monitoring."
      },
      "de": {
        "title": "Newport Medical (Medtronic) E500 Wave Ventilatörü (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Newport Medical (Medtronic) mit 1 Jahr Garantie.",
        "description": "Manufactured by Newport Medical (Medtronic), featuring dual-mode ventilation and comprehensive graphic monitoring. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Newport Medical (Medtronic) E500 Wave (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Newport Medical (Medtronic) مع ضمان لمدة عام كامل.",
        "description": "Newport E500 Wave, invaziv ve non-invaziv ventilasyon modları ile yoğun bakım ortamlarında stabil solunum desteği sunan kendini kanıtlamış bir cihazdır. Pnömatik valfleri ve debi sensörleri test edilmiştir. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Newport Medical (Medtronic) E500 Wave リファービッシュ医療機器",
        "shortDescription": "Newport Medical (Medtronic)製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Manufactured by Newport Medical (Medtronic), featuring dual-mode ventilation and comprehensive graphic monitoring. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Newport Medical (Medtronic) E500 Wave 翻新医疗设备",
        "shortDescription": "Newport Medical (Medtronic) 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Manufactured by Newport Medical (Medtronic), featuring dual-mode ventilation and comprehensive graphic monitoring. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-vent-oxivent-oxi4plus",
    "slug": "oxivent-oxi4plus-transport-ventilator",
    "categorySlug": "yogun-bakim-ve-yasam-destek",
    "brand": "Oxivent",
    "model": "Oxi4Plus",
    "sku": "OXI-4PL-052",
    "condition": "SECOND_HAND",
    "featured": true,
    "sortOrder": 52,
    "images": [
      "/images/products/ventilator-3.webp"
    ],
    "technicalSpecs": {
      "Cihaz Sınıfı": "Acil ve Transport Mekanik Ventilatörü",
      "Modlar": "IPPV (CMV), SIMV, CPAP, Manuel",
      "Ekran": "Basınç ve Solunum Parametreleri Göstergesi",
      "Güç": "Dahili Şarj Edilebilir Batarya ve Harici 12V DC / 220V AC",
      "Taşınabilirlik": "Hafif Gövde, Askı Aparatı ve Taşıma Çantası",
      "Garanti": "1 Yıl Cebeci Medikal Garantili"
    },
    "applications": [
      "Ambulanslar ve 112 Acil Yardım",
      "Hastane İçi ve Dışı Hasta Nakli",
      "Acil Servis Triyaj ve Resüsitasyon",
      "Afet ve Sahra Hastaneleri"
    ],
    "translations": {
      "tr": {
        "title": "Oxivent Oxi4Plus Transport Ventilatör",
        "shortDescription": "Acil tıp ve ambulans nakil süreçleri için kompakt, hafif ve dayanıklı transport mekanik ventilatör.",
        "description": "Oxivent Oxi4Plus, acil hasta transportunda kesintisiz mekanik solunum desteği sağlayan sağlam gövdeli bir acil ventilatörüdür. Gaz tüketimi optimizasyonu ve basınç valf kontrolleri tamamlanmıştır."
      },
      "en": {
        "title": "Oxivent Oxi4Plus Emergency & Transport Ventilator",
        "shortDescription": "Rugged, portable emergency ventilator designed for ambulances, intra-hospital transport, and rescue teams.",
        "description": "Provides intuitive controls, low oxygen consumption, and dependable ventilation during patient transfers."
      },
      "de": {
        "title": "Oxivent Oxi4Plus Ventilatör (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Oxivent mit 1 Jahr Garantie.",
        "description": "Provides intuitive controls, low oxygen consumption, and dependable ventilation during patient transfers. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Oxivent Oxi4Plus (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Oxivent مع ضمان لمدة عام كامل.",
        "description": "Oxivent Oxi4Plus, acil hasta transportunda kesintisiz mekanik solunum desteği sağlayan sağlam gövdeli bir acil ventilatörüdür. Gaz tüketimi optimizasyonu ve basınç valf kontrolleri tamamlanmıştır. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Oxivent Oxi4Plus リファービッシュ医療機器",
        "shortDescription": "Oxivent製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Provides intuitive controls, low oxygen consumption, and dependable ventilation during patient transfers. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Oxivent Oxi4Plus 翻新医疗设备",
        "shortDescription": "Oxivent 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Provides intuitive controls, low oxygen consumption, and dependable ventilation during patient transfers. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-vent-osiris-mekanik",
    "slug": "air-liquide-osiris-transport-ventilator",
    "categorySlug": "yogun-bakim-ve-yasam-destek",
    "brand": "Air Liquide Medical Systems",
    "model": "Osiris",
    "sku": "ALM-OSI-053",
    "condition": "SECOND_HAND",
    "featured": false,
    "sortOrder": 53,
    "images": [
      "/images/products/ventilator-4.webp"
    ],
    "technicalSpecs": {
      "Menşei": "Fransa (Air Liquide Medical Systems)",
      "Pnömatik Prensip": "O2 Tahrikli Yüksek Verimli Pnömatik Sürücü",
      "Solunum Modları": "CMV (Kontrollü), ACMV (Asiste-Kontrollü), VS-PEP (Spontan + PEEP)",
      "Dayanıklılık": "Düşmeye ve Titreşime Dayanıklı Şok Korumalı Şasi",
      "Garanti": "1 Yıl Tam Garanti"
    },
    "applications": [
      "Hava ve Kara Ambulansları",
      "Acil Servisler",
      "Kritik Hasta Nakli"
    ],
    "translations": {
      "tr": {
        "title": "Air Liquide Osiris Transport Ventilatör",
        "shortDescription": "Fransız Air Liquide üretimi, zorlu saha ve ambulans koşulları için tasarlanmış transport ventilatör.",
        "description": "Air Liquide Osiris, acil solunum desteğinde yüksek güvenilirlik sunan kompakt transport ventilatörüdür. Düşük gaz tüketimi ve basit arayüzü ile kritik anlarda hekime hız kazandırır. Kalibrasyonları yapılmıştır."
      },
      "en": {
        "title": "Air Liquide Osiris Transport Ventilator",
        "shortDescription": "French manufactured rugged transport ventilator for emergency response and tactical ambulances.",
        "description": "Engineered by Air Liquide Medical Systems for extreme field reliability and seamless respiratory support."
      },
      "de": {
        "title": "Air Liquide Medical Systems Osiris Ventilatör (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Air Liquide Medical Systems mit 1 Jahr Garantie.",
        "description": "Engineered by Air Liquide Medical Systems for extreme field reliability and seamless respiratory support. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Air Liquide Medical Systems Osiris (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Air Liquide Medical Systems مع ضمان لمدة عام كامل.",
        "description": "Air Liquide Osiris, acil solunum desteğinde yüksek güvenilirlik sunan kompakt transport ventilatörüdür. Düşük gaz tüketimi ve basit arayüzü ile kritik anlarda hekime hız kazandırır. Kalibrasyonları yapılmıştır. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Air Liquide Medical Systems Osiris リファービッシュ医療機器",
        "shortDescription": "Air Liquide Medical Systems製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Engineered by Air Liquide Medical Systems for extreme field reliability and seamless respiratory support. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Air Liquide Medical Systems Osiris 翻新医疗设备",
        "shortDescription": "Air Liquide Medical Systems 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Engineered by Air Liquide Medical Systems for extreme field reliability and seamless respiratory support. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  },
  {
    "id": "prod-vent-sechrist-millennium",
    "slug": "sechrist-millennium-yenidogan-ventilatoru",
    "categorySlug": "yogun-bakim-ve-yasam-destek",
    "brand": "Sechrist",
    "model": "Millennium",
    "sku": "SCH-MIL-054",
    "condition": "SECOND_HAND",
    "featured": true,
    "sortOrder": 54,
    "images": [
      "/images/products/ventilator-5.webp"
    ],
    "technicalSpecs": {
      "Hedef Hasta Grubu": "Yenidoğan (Neonatal) ve Pediatrik Bebekler",
      "Ventilasyon Tipi": "Zaman Döngülü, Basınç Sınırlı Sürekli Akışlı Ventilatör",
      "Dalga Formu Ekranı": "Grafik Basınç ve Akış Dalga Formu Takibi",
      "Tidal Hacim": "2 mL kadar düşük hassas mikro hacimler",
      "Solunum Frekansı": "1 - 150 bpm yüksek frekans desteği",
      "Garanti": "1 Yıl Cebeci Medikal Güvencesi"
    },
    "applications": [
      "Yenidoğan Yoğun Bakım Üniteleri (NICU)",
      "Prematüre Bebek Solunum Tedavisi",
      "Çocuk Cerrahisi ve Pediatrik Yoğun Bakım"
    ],
    "translations": {
      "tr": {
        "title": "Sechrist Millennium Yenidoğan & Pediatrik Ventilatör",
        "shortDescription": "Yenidoğan yoğun bakımda prematüre bebekler için özel mikro solutma hassasiyetine sahip ventilatör.",
        "description": "Sechrist Millennium, yenidoğan bebeklerin hassas akciğer dinamiklerine uygun sürekli akışlı ve basınç sınırlı solunum desteği sağlayan lider bir neonatal ventilatördür. Hassas akış valfleri ve basınç sensörleri tamamen kalibre edilmiştir."
      },
      "en": {
        "title": "Sechrist Millennium Neonatal & Infant Ventilator",
        "shortDescription": "Specialized infant and neonatal ICU ventilator providing micro-volume continuous flow ventilation.",
        "description": "Dedicated to fragile premature infants with time-cycled pressure-limited modes and graphic waveform monitoring."
      },
      "de": {
        "title": "Sechrist Millennium Ventilatör (Generalüberholt)",
        "shortDescription": "Generalüberholtes medizinisches Gerät von Sechrist mit 1 Jahr Garantie.",
        "description": "Dedicated to fragile premature infants with time-cycled pressure-limited modes and graphic waveform monitoring. Vollständig gewartet, nach IEC 62353 sicherheitsgeprüft und mit 1 Jahr Cebeci Medikal Garantie."
      },
      "ar": {
        "title": "Sechrist Millennium (جهاز طبي مجدد)",
        "shortDescription": "جهاز طبي مجدد ومضمون من شركة Sechrist مع ضمان لمدة عام كامل.",
        "description": "Sechrist Millennium, yenidoğan bebeklerin hassas akciğer dinamiklerine uygun sürekli akışlı ve basınç sınırlı solunum desteği sağlayan lider bir neonatal ventilatördür. Hassas akış valfleri ve basınç sensörleri tamamen kalibre edilmiştir. تم فحص الجهاز ومعايرته بالكامل وفق معايير السلامة الحيوية مع ضمان لمدة عام."
      },
      "ja": {
        "title": "Sechrist Millennium リファービッシュ医療機器",
        "shortDescription": "Sechrist製 認定リファービッシュ医療機器（1年保証付き）。",
        "description": "Dedicated to fragile premature infants with time-cycled pressure-limited modes and graphic waveform monitoring. 電気安全規格IEC 62353適合検査済み、1年間のフルテクニカル保証付き。"
      },
      "zh": {
        "title": "Sechrist Millennium 翻新医疗设备",
        "shortDescription": "Sechrist 经过严格技术检测与校准的官方认证翻新医疗设备（提供1年质保）。",
        "description": "Dedicated to fragile premature infants with time-cycled pressure-limited modes and graphic waveform monitoring. 已通过严格电气安全与生物医学工程校准测试，附带Cebeci Medikal 1年完整技术服务保修。"
      }
    }
  }
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

    const targetLocale = (locale as Locale) || DEFAULT_LOCALE;
    const localizedSpecs: Record<string, string> = {};
    for (const [k, v] of Object.entries(p.technicalSpecs || {})) {
      localizedSpecs[localizeSpecKey(k, targetLocale)] = localizeSpecValue(String(v), targetLocale);
    }
    const localizedApps = (p.applications || []).map((app) => localizeApplication(app, targetLocale));

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
      technicalSpecs: localizedSpecs,
      applications: localizedApps,
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

  const targetLocale = (locale as Locale) || DEFAULT_LOCALE;
  const localizedSpecs: Record<string, string> = {};
  for (const [k, v] of Object.entries(p.technicalSpecs || {})) {
    localizedSpecs[localizeSpecKey(k, targetLocale)] = localizeSpecValue(String(v), targetLocale);
  }
  const localizedApps = (p.applications || []).map((app) => localizeApplication(app, targetLocale));

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
    technicalSpecs: localizedSpecs,
    applications: localizedApps,
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

export const STATIC_REFERENCES: StaticReferenceItem[] = [
  {
    id: "ref-1",
    companyName: "Özel Ankara Şehir Hastaneleri Grubu",
    clientName: "Op. Dr. Mehmet Yılmaz",
    position: "Başhekim Yardımcısı & Cerrahi Direktör",
    sector: "Özel Hastane",
    city: "Ankara",
    rating: 5,
    sortOrder: 1,
    serviceScope: "Ameliyathane & Anestezi Cihazları Periyodik Bakımı",
    translations: {
      tr: {
        quote: "Ameliyathane ve yoğun bakım cihazlarımızın yıllık periyodik bakım ve kalibrasyon süreçlerinde Cebeci Medikal'in TSE HYB belgeli uzman mühendis kadrosuyla çalışmaktan son derece memnunuz. Hızlı müdahale ve güvenilir yedek parça temini operasyonlarımızın aksamamasını sağlıyor.",
        projectDescription: "Özel Hastane"
      },
      en: {
        quote: "We are extremely satisfied working with Cebeci Medikal's certified engineering team for the annual preventive maintenance and calibration of our operating theatre and ICU equipment. Fast response and authentic parts ensure zero surgical disruption.",
        projectDescription: "Private Hospital"
      },
      de: {
        quote: "Wir sind äußerst zufrieden mit der Zusammenarbeit mit dem zertifizierten Ingenieurteam von Cebeci Medikal für die jährliche vorbeugende Wartung und Kalibrierung unserer OP- und Intensivstationen.",
        projectDescription: "Privatklinik"
      },
      ar: {
        quote: "نحن راضون للغاية عن العمل مع الفريق الهندسي المعتمد لشركة جبيجي ميديكال في الصيانة الوقائية السنوية ومعايرة أجهزة غرف العمليات والعناية المركزة.",
        projectDescription: "مستشفى خاص"
      },
      ja: {
        quote: "手術室およびICU機器の年次定期保守と校正において、Cebeci Medikalの認定エンジニアチームとの協力に大変満足しています。迅速な対応と純正部品の供給により手術に遅延が生じません。",
        projectDescription: "民間総合病院"
      },
      zh: {
        quote: "我们在手术室和重症监护设备的年度预防性维护和校准方面与Cebeci Medikal的认证工程师团队合作非常满意，响应迅速且配件原厂可靠。",
        projectDescription: "大型私立医院"
      }
    }
  },
  {
    id: "ref-2",
    companyName: "Başkent Kardiyoloji & Tıp Merkezi",
    clientName: "Biyomedikal Müh. Zeynep Kaya",
    position: "Klinik Mühendislik Sorumlusu",
    sector: "Tıp Merkezi",
    city: "Ankara",
    rating: 5,
    sortOrder: 2,
    serviceScope: "EKG & Defibrilatör Revizyonu ve Kalibrasyon",
    translations: {
      tr: {
        quote: "Kardiyoloji birimimizin defibrilatör ve EKG cihazlarının 2. el revizyon ve kalibrasyon testleri IEC 62353 standartlarına tam uygun olarak tamamlandı. Raporlama ve teknik dokümantasyon kalitesi takdire şayan.",
        projectDescription: "Tıp Merkezi"
      },
      en: {
        quote: "Refurbishment and calibration testing of our cardiology unit's defibrillators and ECG devices were completed in full compliance with IEC 62353 standards. Reporting quality is outstanding.",
        projectDescription: "Cardiology Medical Center"
      },
      de: {
        quote: "Die Überholung und Kalibrierungsprüfung der Defibrillatoren und EKG-Geräte unserer kardiologischen Abteilung wurden in voller Übereinstimmung mit den IEC 62353-Standards abgeschlossen.",
        projectDescription: "Medizinisches Zentrum"
      },
      ar: {
        quote: "تم الانتهاء من تجديد واختبار معايرة أجهزة إزالة الرجفان وأجهزة تخطيط القلب في وحدة أمراض القلب لدينا بما يتوافق تمامًا مع معايير IEC 62353.",
        projectDescription: "مركز طبي متخصص"
      },
      ja: {
        quote: "当院の循環器科の除細動器および心電計のオーバーホールと校正試験は、IEC 62353規格に完全準拠して完了しました。報告書の精度も極めて高いです。",
        projectDescription: "心臓病メディカルセンター"
      },
      zh: {
        quote: "我们心脏中心的心脏除颤器和心电图设备的翻新和校准测试完全符合IEC 62353标准，技术报告与数据追溯极具专业水准。",
        projectDescription: "专科医疗中心"
      }
    }
  },
  {
    id: "ref-3",
    companyName: "Anadolu Doğum & Çocuk Sağlığı Kliniği",
    clientName: "Uzm. Dr. Burak Demir",
    position: "Klinik Direktörü",
    sector: "Doğum & Pediyatri",
    city: "Eskişehir",
    rating: 5,
    sortOrder: 3,
    serviceScope: "Küvöz & Fototerapi Cihazları Kurulum ve Devreye Alma",
    translations: {
      tr: {
        quote: "Yenidoğan yoğun bakım ünitemize kazandırdığımız küvöz ve fototerapi sistemlerinin kurulum, montaj ve kullanıcı eğitimleri kusursuz şekilde yürütüldü. Satış sonrası 7/24 teknik destekleri bize büyük güven veriyor.",
        projectDescription: "Doğum & Pediyatri Kliniği"
      },
      en: {
        quote: "Installation, commissioning, and clinical user training of incubator and phototherapy systems for our neonatal ICU were carried out flawlessly. 24/7 support gives immense confidence.",
        projectDescription: "Maternity & Pediatric Clinic"
      },
      de: {
        quote: "Installation, Inbetriebnahme und Benutzerschulung der Inkubator- und Phototherapiesysteme für unsere neonatale Intensivstation wurden einwandfrei durchgeführt.",
        projectDescription: "Geburts- & Kinderklinik"
      },
      ar: {
        quote: "تم تنفيذ تركيب وتشغيل وتدريب المستخدمين على أنظمة الحاضنات والعلاج الضوئي لوحدة العناية المركزة لحديثي الولادة لدينا بشكل لا تشوبه شائبة.",
        projectDescription: "عيادة التوليد وطب الأطفال"
      },
      ja: {
        quote: "新生児集中治療室向けの保育器および光線治療システムの設置、立ち上げ、ユーザー教育が滞りなく実施されました。24時間サポートが心強いです。",
        projectDescription: "産科・小児科専門クリニック"
      },
      zh: {
        quote: "我们新生儿重症监护室的婴儿保温箱和光疗系统的安装、调试和医护人员培训均圆满交付，全天候技术保障令人安心。",
        projectDescription: "妇产与儿科专科医院"
      }
    }
  }
];

export function getStaticReferences(locale: string = DEFAULT_LOCALE): LocalizedReference[] {
  const sectorMap: Record<string, Record<string, string>> = {
    "Özel Hastane": {
      tr: "Özel Hastane",
      en: "Private Hospital",
      de: "Privatklinik",
      ar: "مستشفى خاص",
      ja: "民間総合病院",
      zh: "大型私立医院",
    },
    "Tıp Merkezi": {
      tr: "Tıp Merkezi",
      en: "Medical Center",
      de: "Medizinisches Versorgungszentrum",
      ar: "مركز طبي متخصص",
      ja: "メディカルセンター",
      zh: "专科医疗中心",
    },
    "Doğum & Pediyatri": {
      tr: "Doğum & Pediyatri Kliniği",
      en: "Maternity & Pediatric Clinic",
      de: "Geburts- & Kinderklinik",
      ar: "عيادة التوليد وطب الأطفال",
      ja: "産科・小児科クリニック",
      zh: "妇产与儿科诊所",
    },
  };

  const scopeMap: Record<string, Record<string, string>> = {
    "Ameliyathane & Anestezi Cihazları Periyodik Bakımı": {
      tr: "Ameliyathane & Anestezi Cihazları Periyodik Bakımı",
      en: "Operating Theater & Anesthesia Devices Preventive Maintenance",
      de: "Periodische Wartung für OP- und Anästhesiegeräte",
      ar: "الصيانة الوقائية لأجهزة غرف العمليات والتخدير",
      ja: "手術室および麻酔器の定期予防保守点検",
      zh: "手术室与麻醉设备周期性预防性维保",
    },
    "EKG & Defibrilatör Revizyonu ve Kalibrasyon": {
      tr: "EKG & Defibrilatör Revizyonu ve Kalibrasyon",
      en: "ECG & Defibrillator Overhaul and Precision Calibration",
      de: "Überholung und Präzisionskalibrierung für EKG und Defibrillatoren",
      ar: "تجديد ومعايرة أجهزة تخطيط القلب ومزيلات الرجفان",
      ja: "心電計および除細動器のオーバーホールと精密校正",
      zh: "心电图机与除颤监护仪深度翻新及高精度计量校准",
    },
    "Küvöz & Fototerapi Cihazları Kurulum ve Devreye Alma": {
      tr: "Küvöz & Fototerapi Cihazları Kurulum ve Devreye Alma",
      en: "Incubator & Phototherapy Equipment Installation and Commissioning",
      de: "Montage und Inbetriebnahme von Inkubatoren und Phototherapiegeräten",
      ar: "تركيب وتشغيل حاضنات الأطفال وأجهزة العلاج الضوئي",
      ja: "保育器および光線治療器の据付・初期立ち上げ",
      zh: "婴儿保温箱与光疗设备专业装机与调试交付",
    },
  };

  return STATIC_REFERENCES.map((r) => {
    const t = r.translations[locale] || r.translations[DEFAULT_LOCALE] || r.translations.tr;
    const localizedSector = sectorMap[r.sector]?.[locale] || r.sector;
    const localizedScope = r.serviceScope ? (scopeMap[r.serviceScope]?.[locale] || r.serviceScope) : null;
    return {
      id: r.id,
      companyName: r.companyName,
      clientName: r.clientName,
      position: r.position,
      sector: localizedSector,
      city: r.city,
      rating: r.rating,
      serviceScope: localizedScope,
      quote: t?.quote || "",
    };
  });
}

export const STATIC_CATALOGS: StaticCatalogItem[] = [
  {
    id: "cat-1",
    title: "Cebeci Medikal Genel Ürün & Tıbbi Cihaz Kataloğu 2026",
    category: "Genel Katalog",
    description: "Ventilatörler, anestezi cihazları, defibrilatörler, hasta başı monitörleri ve cerrahi sistemleri kapsayan kapsamlı ürün kataloğu.",
    fileUrl: "/catalogs/cebeci-medikal-genel-katalog-2026.pdf",
    thumbnailUrl: "/catalogs/thumb-genel.jpg",
    fileSize: "14.2 MB",
    version: "2026.1",
    downloadCount: 342,
    sortOrder: 1,
    isActive: true,
    locale: "tr",
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
    translations: {
      tr: {
        title: "Cebeci Medikal Genel Ürün & Tıbbi Cihaz Kataloğu 2026",
        category: "Genel Katalog",
        description: "Ventilatörler, anestezi cihazları, defibrilatörler, hasta başı monitörleri ve cerrahi sistemleri kapsayan kapsamlı ürün kataloğu."
      },
      en: {
        title: "Cebeci Medikal Comprehensive Medical Devices Catalog 2026",
        category: "General Catalog",
        description: "Comprehensive medical catalog featuring ventilators, anesthesia workstations, defibrillators, patient monitors, and surgical systems."
      },
      de: {
        title: "Cebeci Medikal Gesamtkatalog für Medizintechnik 2026",
        category: "Hauptkatalog",
        description: "Umfassender Produktkatalog für Beatmungsgeräte, Anästhesie-Arbeitsplätze, Defibrillatoren, Patientenmonitore und Chirurgiesysteme."
      },
      ar: {
        title: "كتالوج جبيجي ميديكال الشامل للأجهزة الطبية 2026",
        category: "الكتالوج العام",
        description: "كتالوج المنتجات الشامل الذي يغطي أجهزة التنفس الاصطناعي، ومحطات التخدير، وأجهزة الصدمات الكهربائية، وشاشات مراقبة المرضى."
      },
      ja: {
        title: "Cebeci Medikal 総合医療機器製品カタログ 2026",
        category: "総合カタログ",
        description: "人工呼吸器、麻酔器、除細動器、生体情報モニターおよび手術室システムを網羅した公式製品カタログ。"
      },
      zh: {
        title: "塞贝吉医疗 2026 年度医疗设备全系列综合产品目录",
        category: "综合目录",
        description: "全面涵盖呼吸机、麻醉工作站、除颤监护仪、多参数病人监护仪及外科手术系统的高清技术产品画册。"
      }
    }
  },
  {
    id: "cat-2",
    title: "Yoğun Bakım & Anestezi Çözümleri Kataloğu",
    category: "Yoğun Bakım & Anestezi",
    description: "Ventilatör, anestezi cihazları, hasta monitörleri ve infüzyon/enjektör pompa sistemleri teknik şartname ve ürün kataloğu.",
    fileUrl: "/catalogs/cebeci-medikal-yogun-bakim-anestezi.pdf",
    thumbnailUrl: "/catalogs/thumb-icu.jpg",
    fileSize: "9.8 MB",
    version: "2026.1",
    downloadCount: 218,
    sortOrder: 2,
    isActive: true,
    locale: "tr",
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
    translations: {
      tr: {
        title: "Yoğun Bakım & Anestezi Çözümleri Kataloğu",
        category: "Yoğun Bakım & Anestezi",
        description: "Ventilatör, anestezi cihazları, hasta monitörleri ve infüzyon/enjektör pompa sistemleri teknik şartname ve ürün kataloğu."
      },
      en: {
        title: "ICU & Anesthesia Solutions Technical Catalog",
        category: "ICU & Anesthesia",
        description: "Technical specifications and clinical brochure for ventilators, anesthesia units, patient vital sign monitors, and infusion pumps."
      },
      de: {
        title: "Intensivpflege- & Anästhesielösungen Katalog",
        category: "Intensivpflege & Anästhesie",
        description: "Technische Spezifikationen und Produktkatalog für Beatmungsgeräte, Anästhesiesysteme, Vitalmonitore und Infusionspumpen."
      },
      ar: {
        title: "كتالوج حلول العناية المركزة والتخدير الجراحي",
        category: "العناية المركزة والتخدير",
        description: "المواصفات الفنية وكتالوج أجهزة التنفس الاصطناعي وأجهزة التخدير وشاشات العلامات الحيوية ومضخات الحقن الوريدي."
      },
      ja: {
        title: "集中治療（ICU）＆麻酔ソリューション 技術カタログ",
        category: "ICU＆麻酔機器",
        description: "人工呼吸器、麻酔ワークステーション、生体情報モニターおよびシリンジポンプの仕様解説カタログ。"
      },
      zh: {
        title: "重症监护 (ICU) 与麻醉手术系统技术选型目录",
        category: "重症与麻醉专区",
        description: "包含有创/无创呼吸机、精密麻醉工作站、高灵敏监护仪与微量输液泵系统的详细规格选型指南。"
      }
    }
  },
  {
    id: "cat-3",
    title: "Biyomedikal Teknik Servis & Periyodik Bakım Kılavuzu",
    category: "Teknik Servis",
    description: "TSE HYB standartlarında periyodik koruyucu bakım, IEC 62353 elektriksel güvenlik testleri ve kalibrasyon hizmet kapsamı.",
    fileUrl: "/catalogs/cebeci-medikal-teknik-servis-kilavuzu.pdf",
    thumbnailUrl: "/catalogs/thumb-service.jpg",
    fileSize: "6.4 MB",
    version: "2026.1",
    downloadCount: 185,
    sortOrder: 3,
    isActive: true,
    locale: "tr",
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
    translations: {
      tr: {
        title: "Biyomedikal Teknik Servis & Periyodik Bakım Kılavuzu",
        category: "Teknik Servis",
        description: "TSE HYB standartlarında periyodik koruyucu bakım, IEC 62353 elektriksel güvenlik testleri ve kalibrasyon hizmet kapsamı."
      },
      en: {
        title: "Biomedical Technical Service & Preventive Maintenance Guide",
        category: "Technical Services",
        description: "Certified preventive maintenance protocols, IEC 62353 electrical safety test procedures, and biomedical calibration scope."
      },
      de: {
        title: "Biomedizinischer Kundendienst & Instandhaltungsleitfaden",
        category: "Technischer Kundendienst",
        description: "Zertifizierte periodische Wartungsprotokolle, elektrische Sicherheitsprüfungen nach IEC 62353 und Kalibrierumfang."
      },
      ar: {
        title: "دليل الخدمات الفنية الطبية الحيوية والصيانة الدورية",
        category: "الخدمات الفنية",
        description: "بروتوكولات الصيانة الوقائية الدورية، واختبارات الأمان الكهربائي IEC 62353، ونطاق خدمات المعايرة المعتمدة."
      },
      ja: {
        title: "生体医工学テクニカルサービス＆定期保守ガイドブック",
        category: "技術サービス",
        description: "IEC 62353規格準拠の電気安全試験、定期予防保守点検手順および精密校正サービス案内。"
      },
      zh: {
        title: "生物医学工程技术维保与定期计量校准服务指南",
        category: "技术工程服务",
        description: "符合 TSE HYB 标准及 IEC 62353 国际电气安全检测规范的医院设备周期性维保与计量检定说明。"
      }
    }
  },
  {
    id: "cat-4",
    title: "Revizyonlu (2. El) Tıbbi Cihazlar & Garanti Kataloğu",
    category: "2. El Cihazlar",
    description: "Ekspertizi ve revizyonu yapılmış, 1 yıl tam garantili 2. el tıbbi cihaz envanteri ve sertifikasyon detayları.",
    fileUrl: "/catalogs/cebeci-medikal-2-el-envanter.pdf",
    thumbnailUrl: "/catalogs/thumb-secondhand.jpg",
    fileSize: "8.1 MB",
    version: "2026.1",
    downloadCount: 290,
    sortOrder: 4,
    isActive: true,
    locale: "tr",
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
    translations: {
      tr: {
        title: "Revizyonlu (2. El) Tıbbi Cihazlar & Garanti Kataloğu",
        category: "2. El Cihazlar",
        description: "Ekspertizi ve revizyonu yapılmış, 1 yıl tam garantili 2. el tıbbi cihaz envanteri ve sertifikasyon detayları."
      },
      en: {
        title: "Certified Pre-Owned & Refurbished Medical Equipment Inventory",
        category: "Refurbished Equipment",
        description: "Inspection-verified and fully refurbished medical equipment inventory backed by an unconditional 1-year warranty."
      },
      de: {
        title: "Zertifizierte Gebraucht- & Refurbished-Medizingeräte Katalog",
        category: "Gebrauchtgeräte",
        description: "Werkstattgeprüftes und vollständig überholtes Inventar gebrauchter Medizintechnik mit 1 Jahr voller Garantie."
      },
      ar: {
        title: "كتالوج الأجهزة الطبية المجددة والمستعملة المعتمدة مع الضمان",
        category: "الأجهزة المجددة",
        description: "قائمة الأجهزة الطبية المفحوصة والمجددة بالكامل والمعتمدة مخبرياً مع ضمان فني شامل لمدة عام كامل."
      },
      ja: {
        title: "認定リファービッシュ（高品質中古）医療機器在庫カタログ",
        category: "認定中古機器",
        description: "完全整備・校正試験済みで1年間のフル保証が付帯する認定再生医療機器の最新在庫一覧。"
      },
      zh: {
        title: "官方认证翻新再制造（二手）医疗设备现货与质保画册",
        category: "翻新认证专区",
        description: "经过严格深度翻新、全项安全测试与出厂校准，附带1年整机质保的高性价比医疗设备现货清单。"
      }
    }
  }
];

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
