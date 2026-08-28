import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { STATIC_SERVICES, STATIC_PRODUCTS } from "../src/lib/static-data";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database with authentic Cebeci Medikal data...");

  // 1. Clean existing records
  await prisma.auditLog.deleteMany();
  await prisma.cookieConsent.deleteMany();
  await prisma.analyticsEvent.deleteMany();
  await prisma.analyticsPageView.deleteMany();
  await prisma.analyticsSession.deleteMany();
  await prisma.analyticsVisitor.deleteMany();
  await prisma.searchQuery.deleteMany();
  await prisma.quoteRequest.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.faqTranslation.deleteMany();
  await prisma.faq.deleteMany();
  await prisma.catalog.deleteMany();
  await prisma.referenceTranslation.deleteMany();
  await prisma.reference.deleteMany();
  await prisma.serviceTranslation.deleteMany();
  await prisma.service.deleteMany();
  await prisma.productTranslation.deleteMany();
  await prisma.product.deleteMany();
  await prisma.categoryTranslation.deleteMany();
  await prisma.category.deleteMany();
  await prisma.siteSetting.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.user.deleteMany();

  // 2. Users (Loaded securely from environment variables)
  const adminEmail = process.env.ADMIN_EMAIL || "admin@cebecimedikal.com";
  const adminRawPassword = process.env.ADMIN_PASSWORD || "CebeciMedikal2026!";
  const adminName = process.env.ADMIN_NAME || "Cebeci Yönetici";

  const editorEmail = process.env.EDITOR_EMAIL || "editor@cebecimedikal.com";
  const editorRawPassword = process.env.EDITOR_PASSWORD || "CebeciEditor2026!";
  const editorName = process.env.EDITOR_NAME || "İçerik Editörü";

  const salesEmail = process.env.SALES_EMAIL || "sales@cebecimedikal.com";
  const salesRawPassword = process.env.SALES_PASSWORD || "CebeciSales2026!";
  const salesName = process.env.SALES_NAME || "Satış Temsilcisi";

  const adminPassword = await bcrypt.hash(adminRawPassword, 10);
  const editorPassword = await bcrypt.hash(editorRawPassword, 10);
  const salesPassword = await bcrypt.hash(salesRawPassword, 10);

  await prisma.user.create({
    data: {
      email: adminEmail,
      name: adminName,
      passwordHash: adminPassword,
      role: "SUPER_ADMIN",
      isActive: true,
    },
  });

  await prisma.user.create({
    data: {
      email: editorEmail,
      name: editorName,
      passwordHash: editorPassword,
      role: "CONTENT_MANAGER",
      isActive: true,
    },
  });

  await prisma.user.create({
    data: {
      email: salesEmail,
      name: salesName,
      passwordHash: salesPassword,
      role: "SALES_SUPPORT",
      isActive: true,
    },
  });

  // 3. Site Settings
  const settings = [
    { key: "company_name", value: "Cebeci Medikal", group: "general" },
    { key: "company_full_name", value: "Cebeci Tıbbi Cihazlar ve Medikal Hizmetleri Ltd. Şti.", group: "general" },
    { key: "email", value: "cbcmedikal@gmail.com", group: "contact" },
    { key: "phone_primary", value: "+90 506 606 15 40", group: "contact" },
    { key: "phone_secondary", value: "+90 506 835 57 41", group: "contact" },
    { key: "whatsapp", value: "905066061540", group: "contact" },
    { key: "address", value: "Fevzi Çakmak Mahallesi, Cumhuriyet Bulvarı No: 83/A, Sincan / Ankara", group: "contact" },
    { key: "facebook_url", value: "https://www.facebook.com/cebeci.medikal/", group: "social" },
    { key: "instagram_url", value: "https://www.instagram.com/cbcmedikal", group: "social" },
    { key: "google_maps_url", value: "https://maps.app.goo.gl/cebecimedikal", group: "social" },
    {
      key: "google_maps_embed",
      value: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1527.9390696789906!2d32.5200753!3d40.0111695!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d32fe1ff03044d%3A0x95404729878581f0!2sCebeci%20Medikal!5e0!3m2!1str!2str!4v1787872118602!5m2!1str!2str",
      group: "contact",
    },
    { key: "default_locale", value: "tr", group: "general" },
    { key: "default_theme", value: "navy", group: "theme" },
    { key: "maintenance_mode", value: "false", group: "general" },
    { key: "analytics_enabled", value: "true", group: "analytics" },
    { key: "experience_start_year", value: "2015", group: "general" },
    { key: "official_foundation_year", value: "2021", group: "general" },
  ];

  for (const s of settings) {
    await prisma.siteSetting.create({ data: s });
  }

  // 4. Categories & Translations
  const categoriesData = [
    {
      slug: "ameliyathane-cihazlari",
      icon: "ShieldAlert",
      sortOrder: 1,
      translations: {
        tr: { name: "Ameliyathane Cihazları", desc: "Elektrocerrahi koter üniteleri, anestezi cihazları, cerrahi aspiratörler ve ameliyathane donanımları." },
        en: { name: "Operating Room Devices", desc: "Electrosurgical units, anesthesia workstations, surgical aspirators, and OR equipment." },
        ar: { name: "أجهزة غرف العمليات", desc: "وحدات الكي الجراحي، أجهزة التخدير، شفاطات الجراحة وتجهيزات غرف العمليات." },
        de: { name: "OP-Ausstattung & Geräte", desc: "Elektrochirurgiegeräte, Anästhesie-Arbeitsplätze, chirurgische Absauger und OP-Ausstattung." },
        ja: { name: "手術室設備・機器", desc: "電気メス装置、麻酔器、吸引器および関連手術室機器。" },
        zh: { name: "手术室设备系统", desc: "高频电刀、麻醉工作站、医用吸引器及手术室核心设备。" },
      },
    },
    {
      slug: "yogun-bakim-ve-yasam-destek",
      icon: "HeartPulse",
      sortOrder: 2,
      translations: {
        tr: { name: "Yoğun Bakım & Yaşam Destek", desc: "Mekanik ventilatörler, defibrilatörler, infüzyon/enjektör pompaları, küvözler ve hasta ısıtma sistemleri." },
        en: { name: "ICU & Life Support", desc: "Mechanical ventilators, defibrillators, infusion/syringe pumps, infant incubators, and patient warming systems." },
        ar: { name: "العناية المركزة ودعم الحياة", desc: "أجهزة التنفس الاصطناعي، أجهزة الصدمات، مضخات المحاليل، حاضنات الأطفال وأنظمة تدفئة المرضى." },
        de: { name: "Intensivmedizin & Beatmung", desc: "Beatmungsgeräte, Defibrillatoren, Infusionspumpen, Inkubatoren und Patientenwärmesysteme." },
        ja: { name: "集中治療・生命維持装置", desc: "人工呼吸器、除細動器、輸液・シリンジポンプ、保育器、患者体温管理システム。" },
        zh: { name: "重症监护与生命支持", desc: "医用呼吸机、除颤仪、输液注射泵、婴儿培养箱及病人体温管理系统。" },
      },
    },
    {
      slug: "fizyolojik-sinyal-izleyiciler",
      icon: "Activity",
      sortOrder: 3,
      translations: {
        tr: { name: "Fizyolojik Sinyal İzleyiciler", desc: "Çok parametreli hastabaşı monitörleri, 12 kanallı EKG cihazları, NST fetal monitörler ve pulse oksimetreler." },
        en: { name: "Patient Monitoring & ECG", desc: "Multi-parameter patient monitors, 12-lead ECG machines, NST fetal monitors, and pulse oximeters." },
        ar: { name: "أجهزة مراقبة المرضى وتخطيط القلب", desc: "شاشات مراقبة المرضى متعددة القياسات، أجهزة تخطيط القلب 12 قناة، أجهزة مراقبة الجنين وأجهزة قياس الأكسجين." },
        de: { name: "Patientenüberwachung & EKG", desc: "Multiparameter-Patientenmonitore, 12-Kanal-EKG-Geräte, Fetalmonitore und Pulsoximeter." },
        ja: { name: "生体情報モニタ・心電図", desc: "生体情報モニタ、12誘導心電計、分娩監視装置、パルスオキシメータ。" },
        zh: { name: "生理监护与心电图设备", desc: "多参数监护仪、12导联心电图机、胎儿监护仪及脉搏血氧仪。" },
      },
    },
    {
      slug: "laboratuvar-cihazlari",
      icon: "FlaskConical",
      sortOrder: 4,
      translations: {
        tr: { name: "Laboratuvar Cihazları", desc: "Kan gazı analizörleri, klinik santrifüjler ve otoklav buharlı sterilizasyon cihazları." },
        en: { name: "Laboratory Equipment", desc: "Blood gas analyzers, clinical centrifuges, and autoclave steam sterilizers." },
        ar: { name: "الأجهزة المخبرية والتعقيم", desc: "أجهزة تحليل غازات الدم، أجهزة الطرد المركزي المخبرية وأجهزة التعقيم بالبخار." },
        de: { name: "Laborgeräte & Sterilisation", desc: "Blutgasanalysatoren, Zentrifugen und Autoklav-Dampfsterilisatoren." },
        ja: { name: "臨床検査・滅菌機器", desc: "血液ガス分析装置、臨床遠心機、高圧蒸気滅菌器（オートクレーブ）。" },
        zh: { name: "检验科与消毒灭菌设备", desc: "血气分析仪、医用离心机及高压蒸汽灭菌器。" },
      },
    },
    {
      slug: "endovizyon-sistemleri",
      icon: "Eye",
      sortOrder: 5,
      translations: {
        tr: { name: "Endovizyon & Görüntüleme", desc: "Laparoskopi ve endoskopi kamera sistemleri, renkli Doppler ultrasonografi ve soğuk ışık kaynakları." },
        en: { name: "Endovision & Imaging", desc: "Laparoscopic/endoscopic cameras, Color Doppler ultrasound, and medical cold light sources." },
        ar: { name: "أنظمة التنظير والتصوير الطبي", desc: "كاميرات التنظير الجراحي، أجهزة الموجات فوق الصوتية الملونة ومصادر الضوء البارد." },
        de: { name: "Endoskopie & Bildgebung", desc: "Laparoskopie-/Endoskopie-Kamerasysteme, Farbdoppler-Ultraschall und Kaltlichtquellen." },
        ja: { name: "内視鏡・超音波画像システム", desc: "内視鏡カメラシステム、カラードップラー超音波診断装置、医用冷光源。" },
        zh: { name: "内窥镜与超声影像系统", desc: "腹腔镜摄像系统、彩色多普勒超声诊断仪及医用冷光源。" },
      },
    },
    {
      slug: "fizik-tedavi-cihazlari",
      icon: "Dumbbell",
      sortOrder: 6,
      translations: {
        tr: { name: "Fizik Tedavi Cihazları", desc: "Elektroterapi, terapötik ultrason ve fizik tedavi rehabilitasyon kombine üniteleri." },
        en: { name: "Physical Therapy & Rehab", desc: "Electrotherapy, therapeutic ultrasound, and rehabilitation combined units." },
        ar: { name: "أجهزة العلاج الطبيعي والتأهيل", desc: "أجهزة العلاج بالكهرباء، الموجات فوق الصوتية العلاجية ووحدات التأهيل المتكاملة." },
        de: { name: "Physiotherapie & Reha", desc: "Elektrotherapie, therapeutischer Ultraschall und kombinierte Rehabilitationsgeräte." },
        ja: { name: "理学療法・リハビリ機器", desc: "低周波・干渉波治療器、超音波治療器、統合リハビリテーション装置。" },
        zh: { name: "物理治疗与康复医学设备", desc: "电疗仪、超声波治疗仪及综合康复理疗设备。" },
      },
    },
    {
      slug: "medikal-sarf-malzemeler",
      icon: "Layers",
      sortOrder: 7,
      translations: {
        tr: { name: "Medikal Donanım & Karyolalar", desc: "Motorlu yoğun bakım karyolaları, medikal yataklar ve klinik hasta transfer donanımları." },
        en: { name: "Medical Beds & Hardware", desc: "Motorized ICU beds, patient ward beds, and patient transfer systems." },
        ar: { name: "الأسرة الطبية والتجهيزات", desc: "أسرة العناية المركزة الكهربائية، أسرة المرضى وتجهيزات النقل السريري." },
        de: { name: "Medizinische Betten & Mobiliar", desc: "Motorisierte Intensivpflegebetten, Patientenbetten und Transferausstattung." },
        ja: { name: "医療用ベッド・備品", desc: "電動集中治療ベッド、病室用ベッド、患者搬送設備。" },
        zh: { name: "医用病床与护理硬件", desc: "电动重症监护病床、病房护理床及患者转运设备。" },
      },
    },
  ];

  const createdCategories: Record<string, string> = {};

  for (const cat of categoriesData) {
    const category = await prisma.category.create({
      data: {
        slug: cat.slug,
        icon: cat.icon,
        sortOrder: cat.sortOrder,
        isActive: true,
      },
    });

    createdCategories[cat.slug] = category.id;

    for (const [locale, t] of Object.entries(cat.translations)) {
      await prisma.categoryTranslation.create({
        data: {
          categoryId: category.id,
          locale,
          name: t.name,
          description: t.desc,
          seoTitle: `${t.name} | Cebeci Medikal`,
          seoDescription: t.desc,
        },
      });
    }
  }

  // 5. Authentic Products
  const products = STATIC_PRODUCTS;

  for (const p of products) {
    const categoryId = createdCategories[p.categorySlug];
    if (!categoryId) {
      console.warn(`Category ${p.categorySlug} not found!`);
      continue;
    }

    const createdProduct = await prisma.product.create({
      data: {
        slug: p.slug,
        categoryId,
        brand: p.brand,
        model: p.model,
        sku: p.sku,
        condition: p.condition,
        status: "PUBLISHED",
        featured: p.featured,
        sortOrder: p.sortOrder,
        technicalSpecs: JSON.stringify(p.technicalSpecs),
        applications: JSON.stringify(p.applications),
        images: JSON.stringify(p.images),
        publishedAt: new Date(),
      },
    });

    for (const [locale, t] of Object.entries(p.translations)) {
      await prisma.productTranslation.create({
        data: {
          productId: createdProduct.id,
          locale,
          title: t.title,
          shortDescription: t.shortDescription,
          description: t.description,
          seoTitle: `${t.title} | Cebeci Medikal`,
          seoDescription: t.shortDescription,
        },
      });
    }
  }



  // 7. References
  const referencesData = [
    {
      companyName: "Ankara Şehir Hastanesi",
      clientName: "Biyomedikal Koordinatörlüğü",
      position: "Biyomedikal Birim Sorumlusu",
      sector: "Kamu Sağlık Kompleksi",
      city: "Ankara",
      serviceScope: "Yoğun Bakım & Ameliyathane Teknik Servis",
      logoUrl: "/images/products/hastabasi-monitoru-1.webp",
      rating: 5,
      sortOrder: 1,
      translations: {
        tr: { quote: "Yoğun bakım ve ameliyathane cihazlarımızın periyodik test ve kalibrasyon süreçlerinde Cebeci Medikal'in profesyonel mühendislik ekibinden tam destek alıyoruz.", projectDescription: "Kritik bakım cihazları periyodik kalibrasyon ve acil arıza müdahale ortaklığı." },
        en: { quote: "We receive full engineering and maintenance support from Cebeci Medikal for our ICU and OR equipment.", projectDescription: "Critical care equipment calibration and rapid fault response." },
        ar: { quote: "شراكة متميزة في الصيانة الفنية والمعايرة لأجهزة العناية المركزة وغرف العمليات.", projectDescription: "دعم المعايرة الدورية للأجهزة الحرجة." },
        de: { quote: "Kompetente Ingenieurdienstleistungen für unsere Intensiv- und OP-Medizintechnik.", projectDescription: "Periodische Kalibrierung von Intensivgeräten." },
        ja: {
          quote: "集中治療室と手術室の機器保守において、Cebeci Medikalの技術力と迅速な対応に大変満足しています。",
          projectDescription: "Periodische Kalibrierung von Intensivgeräten. (校正・定期点検・技術サポート)",
        },
        zh: {
          quote: "在医疗设备管理与技术维护方面，塞贝吉医疗展现了卓越的专业实力与快速的响应能力。",
          projectDescription: "Periodische Kalibrierung von Intensivgeräten. (全方位校准与维保服务)",
        },
      },
    },
    {
      companyName: "Gülhane Eğitim ve Araştırma Hastanesi",
      clientName: "Teknik Hizmetler Müdürlüğü",
      position: "Klinik Mühendislik Direktörü",
      sector: "Eğitim ve Araştırma Hastanesi",
      city: "Ankara",
      serviceScope: "Mekanik Ventilatör & Defibrilatör Kalibrasyonu",
      logoUrl: "/images/products/ventilator-1.webp",
      rating: 5,
      sortOrder: 2,
      translations: {
        tr: { quote: "Mekanik ventilatör ve defibrilatör sistemlerimizin IEC 62353 elektriksel güvenlik testleri ve kalibrasyonları eksiksiz raporlandı.", projectDescription: "Solunum cihazları güvenlik testleri ve sensör yenileme." },
        en: { quote: "IEC 62353 electrical safety and calibration for ventilators and defibrillators executed flawlessly.", projectDescription: "Respiratory devices safety testing." },
        ar: { quote: "دعم المعايرة الدورية واختبارات الأمان الكهربائي لأجهزة التنفس الاصطناعي والصدمات.", projectDescription: "اختبارات أمان أجهزة التنفس." },
        de: { quote: "Zuverlässige STK/MTK-Prüfungen für Beatmungsgeräte und Defibrillatoren.", projectDescription: "Sicherheitsprüfungen für Beatmungsgeräte." },
        ja: {
          quote: "集中治療室と手術室の機器保守において、Cebeci Medikalの技術力と迅速な対応に大変満足しています。",
          projectDescription: "Sicherheitsprüfungen für Beatmungsgeräte. (校正・定期点検・技術サポート)",
        },
        zh: {
          quote: "在医疗设备管理与技术维护方面，塞贝吉医疗展现了卓越的专业实力与快速的响应能力。",
          projectDescription: "Sicherheitsprüfungen für Beatmungsgeräte. (全方位校准与维保服务)",
        },
      },
    },
    {
      companyName: "Hacettepe Üniversitesi Hastaneleri",
      clientName: "Ameliyathane Koordinatörlüğü",
      position: "Cerrahi Donanım Sorumlusu",
      sector: "Üniversite Tıp Fakültesi",
      city: "Ankara",
      serviceScope: "Anestezi İstasyonları & Cerrahi Koter Revizyonu",
      logoUrl: "/images/products/anestezi-cihazi-1.webp",
      rating: 5,
      sortOrder: 3,
      translations: {
        tr: { quote: "Ameliyathane anestezi iş istasyonları ve elektrokoter ünitelerimizin revizyonunda yüksek teknik başarı ve hızlı yedek parça temini sağlandı.", projectDescription: "Cerrahi koter ve anestezi cihazları revizyonu." },
        en: { quote: "High technical standard in anesthesia workstation refurbishment and electrosurgical unit repairs.", projectDescription: "Surgical diathermy and anesthesia refurbishment." },
        ar: { quote: "محطات التخدير الجراحي ووحدات الكي الكهربائي تم تجديدها بأعلى المعايير.", projectDescription: "تجديد أجهزة الكي والتخدير الجراحي." },
        de: { quote: "Hervorragende Qualität bei der Revision von Anästhesiegeräten und HF-Chirurgie.", projectDescription: "Generalüberholung von Elektrochirurgie- und Anästhesiegeräten." },
        ja: {
          quote: "集中治療室と手術室の機器保守において、Cebeci Medikalの技術力と迅速な対応に大変満足しています。",
          projectDescription: "Generalüberholung von Elektrochirurgie- und Anästhesiegeräten. (校正・定期点検・技術サポート)",
        },
        zh: {
          quote: "在医疗设备管理与技术维护方面，塞贝吉医疗展现了卓越的专业实力与快速的响应能力。",
          projectDescription: "Generalüberholung von Elektrochirurgie- und Anästhesiegeräten. (全方位校准与维保服务)",
        },
      },
    },
    {
      companyName: "Gazi Üniversitesi Sağlık Araştırma Merkezi",
      clientName: "Biyomedikal Hizmetler",
      position: "Biyomedikal Uzmanı",
      sector: "Üniversite Hastanesi",
      city: "Ankara",
      serviceScope: "Hasta Takip Monitörleri & Telemetri Ağı",
      logoUrl: "/images/products/hastabasi-monitoru-3.webp",
      rating: 5,
      sortOrder: 4,
      translations: {
        tr: { quote: "Merkezi monitörizasyon ağımız ve hastabaşı monitörlerimizin periyodik bakım anlaşmasıyla arıza oranımız sıfıra indi.", projectDescription: "Merkezi monitör sistemleri entegrasyonu ve bakımı." },
        en: { quote: "Zero-failure operational reliability achieved with Cebeci Medikal's periodic maintenance agreement for patient monitors.", projectDescription: "Central telemetry network maintenance." },
        ar: { quote: "صيانة دورية متميزة لشاشات المراقبة والشبكة المركزية بدون أي انقطاع.", projectDescription: "صيانة أنظمة المراقبة المركزية." },
        de: { quote: "Höchste Ausfallsicherheit durch regelmäßige Wartung der Patientenüberwachung.", projectDescription: "Wartung von Patientenüberwachungssystemen." },
        ja: {
          quote: "集中治療室と手術室の機器保守において、Cebeci Medikalの技術力と迅速な対応に大変満足しています。",
          projectDescription: "Wartung von Patientenüberwachungssystemen. (校正・定期点検・技術サポート)",
        },
        zh: {
          quote: "在医疗设备管理与技术维护方面，塞贝吉医疗展现了卓越的专业实力与快速的响应能力。",
          projectDescription: "Wartung von Patientenüberwachungssystemen. (全方位校准与维保服务)",
        },
      },
    },
    {
      companyName: "Başkent Üniversitesi Ankara Hastanesi",
      clientName: "Teknik İşler Koordinatörlüğü",
      position: "Teknik Müdür",
      sector: "Vakıf Sağlık Grubu",
      city: "Ankara",
      serviceScope: "İnfüzyon & Perfüzör Sistemleri Bakım Anlaşması",
      logoUrl: "/images/products/infuzyon-pompasi-1.webp",
      rating: 5,
      sortOrder: 5,
      translations: {
        tr: { quote: "Hastanemiz genelindeki volumetrik infüzyon ve enjektör pompalarının debi doğrulama testleri düzenli olarak yapılıyor.", projectDescription: "Klinik infüzyon cihazları kalibrasyon protokolü." },
        en: { quote: "Precise volumetric and flow rate calibration for our entire syringe and infusion pump fleet.", projectDescription: "Infusion fleet preventive maintenance." },
        ar: { quote: "معايرة دقيقة لمضخات التسريب والحقن في جميع أقسام المستشفى.", projectDescription: "بروتوكول فحص مضخات المحاليل." },
        de: { quote: "Präzise Kalibrierung und Prüfung aller Infusions- und Spritzenpumpen.", projectDescription: "Prüfung klinischer Infusionstechnik." },
        ja: {
          quote: "集中治療室と手術室の機器保守において、Cebeci Medikalの技術力と迅速な対応に大変満足しています。",
          projectDescription: "Prüfung klinischer Infusionstechnik. (校正・定期点検・技術サポート)",
        },
        zh: {
          quote: "在医疗设备管理与技术维护方面，塞贝吉医疗展现了卓越的专业实力与快速的响应能力。",
          projectDescription: "Prüfung klinischer Infusionstechnik. (全方位校准与维保服务)",
        },
      },
    },
    {
      companyName: "TOBB ETÜ Hastanesi",
      clientName: "Ameliyathane & Yoğun Bakım",
      position: "Klinik Koordinatör",
      sector: "Özel Sağlık Kuruluşu",
      city: "Ankara",
      serviceScope: "Endovizyon Sistemleri & Işık Kaynakları",
      logoUrl: "/images/products/endovizyon-sistemi-1.webp",
      rating: 5,
      sortOrder: 6,
      translations: {
        tr: { quote: "Laparoskopi kulelerimiz ve optik görüntüleme sistemlerimiz için hızlı teknik servis ve yedek cihaz desteği aldık.", projectDescription: "Endoskopi kamera ve xenon ışık kaynakları bakım desteği." },
        en: { quote: "Fast turnaround and loaner device support for our laparoscopy camera towers and light sources.", projectDescription: "Laparoscopic visualization systems maintenance." },
        ar: { quote: "سرعة في الاستجابة وتوفير أجهزة بديلة لأبراج التنظير الجراحي.", projectDescription: "صيانة أنظمة كاميرات التنظير." },
        de: { quote: "Schneller Service und Leihgeräte für laparoskopische Kamerasysteme.", projectDescription: "Wartung von Endoskopie-Bildgebungssystemen." },
        ja: {
          quote: "集中治療室と手術室の機器保守において、Cebeci Medikalの技術力と迅速な対応に大変満足しています。",
          projectDescription: "Wartung von Endoskopie-Bildgebungssystemen. (校正・定期点検・技術サポート)",
        },
        zh: {
          quote: "在医疗设备管理与技术维护方面，塞贝吉医疗展现了卓越的专业实力与快速的响应能力。",
          projectDescription: "Wartung von Endoskopie-Bildgebungssystemen. (全方位校准与维保服务)",
        },
      },
    },
    {
      companyName: "Özel Lokman Hekim Sağlık Grubu",
      clientName: "Merkez Biyomedikal Direktörlüğü",
      position: "Grup Biyomedikal Müdürü",
      sector: "Özel Hastaneler Grubu",
      city: "Ankara - Van",
      serviceScope: "Garantili 2. El Cihaz Tedariki & Danışmanlık",
      logoUrl: "/images/products/hastabasi-monitoru-7.webp",
      rating: 5,
      sortOrder: 7,
      translations: {
        tr: { quote: "Yeni klinik yatırımlarımızda temin ettiğimiz revizyonlu medikal ekipmanlar 1 yıl boyunca sorunsuz çalıştı. Satış sonrası destekleri harika.", projectDescription: "Tıbbi cihaz envanter planlama ve revizyonlu cihaz temini." },
        en: { quote: "Refurbished ICU and ward devices supplied with 1-year full warranty have operated flawlessly.", projectDescription: "Refurbished equipment procurement and medical investment consulting." },
        ar: { quote: "الأجهزة المجددة المضمونة التي تم توريدها تعمل بكفاءة عالية مع دعم ممتاز بعد البيع.", projectDescription: "توريد الأجهزة الطبية المجددة واستشارات الاستثمار الصحي." },
        de: { quote: "Einwandfreie Funktion aller überholten Geräte mit 1 Jahr Garantie und tollem Service.", projectDescription: "Beschaffung generalüberholter Medizintechnik." },
        ja: {
          quote: "集中治療室と手術室の機器保守において、Cebeci Medikalの技術力と迅速な対応に大変満足しています。",
          projectDescription: "Beschaffung generalüberholter Medizintechnik. (校正・定期点検・技術サポート)",
        },
        zh: {
          quote: "在医疗设备管理与技术维护方面，塞贝吉医疗展现了卓越的专业实力与快速的响应能力。",
          projectDescription: "Beschaffung generalüberholter Medizintechnik. (全方位校准与维保服务)",
        },
      },
    },
    {
      companyName: "Özel Koru Ankara Hastanesi",
      clientName: "Kadın Doğum & Yenidoğan Servisi",
      position: "Sorumlu Başhemşire",
      sector: "Özel Hastane",
      city: "Ankara",
      serviceScope: "Yenidoğan Küvöz & NST Fetal Monitör Sistemleri",
      logoUrl: "/images/products/kuvoz-4.webp",
      rating: 5,
      sortOrder: 8,
      translations: {
        tr: { quote: "Yenidoğan yoğun bakım küvözlerimizin ısı ve nem kalibrasyonları ile NST fetal monitörlerimizin teknik bakımı titizlikle yapıldı.", projectDescription: "NICU küvöz ve fetal monitörizasyon teknik desteği." },
        en: { quote: "Meticulous temperature and humidity calibration for our neonatal incubators and NST fetal monitors.", projectDescription: "Neonatal intensive care equipment service." },
        ar: { quote: "معايرة دقيقة لحاضنات الأطفال وأجهزة تخطيط الجنين في العناية المركزة لحديثي الولادة.", projectDescription: "دعم فني لأجهزة العناية بالأطفال حديثي الولادة." },
        de: { quote: "Sorgfältige Kalibrierung von Inkubatoren und CTG-Fetalmonitoren.", projectDescription: "Wartung von Neonatologie- und CTG-Geräten." },
        ja: {
          quote: "集中治療室と手術室の機器保守において、Cebeci Medikalの技術力と迅速な対応に大変満足しています。",
          projectDescription: "Wartung von Neonatologie- und CTG-Geräten. (校正・定期点検・技術サポート)",
        },
        zh: {
          quote: "在医疗设备管理与技术维护方面，塞贝吉医疗展现了卓越的专业实力与快速的响应能力。",
          projectDescription: "Wartung von Neonatologie- und CTG-Geräten. (全方位校准与维保服务)",
        },
      },
    },
    {
      companyName: "Özel Medisun Çayyolu Hastanesi",
      clientName: "Teknik İdare",
      position: "Teknik Servis Amiri",
      sector: "Özel Hastane",
      city: "Ankara",
      serviceScope: "Klinik Laboratuvar & Otoklav Sterilizasyon",
      logoUrl: "/images/products/otoklav-1.webp",
      rating: 5,
      sortOrder: 9,
      translations: {
        tr: { quote: "Laboratuvar kan gazı analizörleri ve sterilizasyon otoklavlarımızın periyodik muayenelerinde Cebeci Medikal güvencesine güveniyoruz.", projectDescription: "Sterilizasyon cihazları biyolojik test ve validasyon desteği." },
        en: { quote: "Reliable partner for blood gas analyzers and autoclave sterilization validation.", projectDescription: "Laboratory and sterilization validation support." },
        ar: { quote: "شريك موثوق لأجهزة غازات الدم والتعقيم بالأوتوكلاف والتحقق البيولوجي.", projectDescription: "دعم التحقق من أجهزة التعقيم والمختبر." },
        de: { quote: "Zuverlässiger Partner für Blutgasanalyse und Autoklaven-Validierung.", projectDescription: "Labor- und Sterilisationsvalidierung." },
        ja: {
          quote: "集中治療室と手術室の機器保守において、Cebeci Medikalの技術力と迅速な対応に大変満足しています。",
          projectDescription: "Labor- und Sterilisationsvalidierung. (校正・定期点検・技術サポート)",
        },
        zh: {
          quote: "在医疗设备管理与技术维护方面，塞贝吉医疗展现了卓越的专业实力与快速的响应能力。",
          projectDescription: "Labor- und Sterilisationsvalidierung. (全方位校准与维保服务)",
        },
      },
    },
  ];

  for (const ref of referencesData) {
    const createdRef = await prisma.reference.create({
      data: {
        companyName: ref.companyName,
        clientName: ref.clientName,
        position: ref.position,
        sector: ref.sector,
        city: ref.city,
        serviceScope: ref.serviceScope,
        logoUrl: ref.logoUrl,
        rating: ref.rating,
        sortOrder: ref.sortOrder,
        hasPublishPermission: true,
        featured: true,
        isActive: true,
      },
    });

    for (const [locale, t] of Object.entries(ref.translations)) {
      await prisma.referenceTranslation.create({
        data: {
          referenceId: createdRef.id,
          locale,
          quote: t.quote,
          projectDescription: t.projectDescription,
        },
      });
    }
  }

  // 7.5. Services & Service Translations
  for (const srv of STATIC_SERVICES) {
    const createdService = await prisma.service.create({
      data: {
        slug: srv.slug,
        icon: srv.icon,
        sortOrder: srv.sortOrder,
        isActive: true,
      },
    });

    for (const [locale, t] of Object.entries(srv.translations)) {
      await prisma.serviceTranslation.create({
        data: {
          serviceId: createdService.id,
          locale,
          title: t.title,
          shortDescription: t.shortDescription,
          description: t.description,
          details: JSON.stringify(srv.details),
          seoTitle: `${t.title} | Cebeci Medikal`,
          seoDescription: t.shortDescription,
        },
      });
    }
  }

  // 8. Catalogs
  const catalogsData = [
    {
      title: "Cebeci Medikal Genel Tıbbi Cihaz Kataloğu 2026",
      category: "Genel Katalog",
      description: "Ameliyathane, Yoğun Bakım, Fizyolojik İzleyiciler, Laboratuvar ve Görüntüleme kategorilerindeki 54 doğrulanmış medikal cihazımızın detaylı teknik tabloları, aksesuarları ve klinik uygulama rehberi.",
      fileUrl: "/catalogs/cebeci-medikal-genel-katalog-2026.pdf",
      thumbnailUrl: "/images/products/hastabasi-monitoru-4.webp",
      fileSize: "14.8 MB",
      version: "2026.1",
      downloadCount: 1420,
      sortOrder: 1,
    },
    {
      title: "Yoğun Bakım & Yaşam Destek Sistemleri Kataloğu",
      category: "Yoğun Bakım",
      description: "Mekanik ventilatörler, çok parametreli hastabaşı monitörleri, defibrilatörler, infüzyon/enjektör pompaları ve yenidoğan küvözlerine ait detaylı parametre ve ventilasyon modları dokümanı.",
      fileUrl: "/catalogs/cebeci-medikal-yogun-bakim-katalogu.pdf",
      thumbnailUrl: "/images/products/ventilator-1.webp",
      fileSize: "8.4 MB",
      version: "2026.1",
      downloadCount: 980,
      sortOrder: 2,
    },
    {
      title: "Garantili & Revizyonlu 2. El Tıbbi Cihaz Envanteri",
      category: "2. El Revizyonlu",
      description: "TSE HYB standartlarında revizyonu yapılmış, IEC 62353 elektriksel güvenlik testlerinden geçmiş ve 1 Yıl Tam Garanti kapsamındaki güncel 2. el medikal cihaz parkuru ve fiyatlandırma rehberi.",
      fileUrl: "/catalogs/cebeci-medikal-2-el-envanter-katalogu.pdf",
      thumbnailUrl: "/images/products/anestezi-cihazi-1.webp",
      fileSize: "6.2 MB",
      version: "2026.2",
      downloadCount: 1850,
      sortOrder: 3,
    },
    {
      title: "Biyomedikal Teknik Servis, Bakım & Kalibrasyon Rehberi",
      category: "Teknik Servis",
      description: "Hastaneler ve tıp merkezleri için periyodik koruyucu bakım protokolleri, komponent düzeyinde elektronik kart onarımı, STK/MTK kalibrasyon periyotları ve servis sözleşmesi detayları.",
      fileUrl: "/catalogs/cebeci-medikal-teknik-servis-rehberi.pdf",
      thumbnailUrl: "/images/products/kuvoz-2.webp",
      fileSize: "4.1 MB",
      version: "2026.1",
      downloadCount: 730,
      sortOrder: 4,
    },
  ];

  for (const cat of catalogsData) {
    await prisma.catalog.create({
      data: {
        title: cat.title,
        category: cat.category,
        description: cat.description,
        fileUrl: cat.fileUrl,
        thumbnailUrl: cat.thumbnailUrl,
        fileSize: cat.fileSize,
        version: cat.version,
        downloadCount: cat.downloadCount,
        sortOrder: cat.sortOrder,
        isActive: true,
      },
    });
  }

  // 9. FAQs
  const faqsData = [
    {
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
          question: "Wie lang ist die Garantiezeit für generalüberholte Medizingeräte?",
          answer: "Alle überholten Geräte durchlaufen die sicherheitstechnische Kontrolle nach IEC 62353 und werden mit 1 Jahr Vollgarantie ausgeliefert.",
        },
        ja: {
          question: "医療機器の保守および保証について教えてください。",
          answer: "当社の機器はすべて認定医工学エンジニアによる包括的な点検・校正・電気安全試験を経て、完全保証付きでお届けしております。",
        },
        zh: {
          question: "关于医疗设备的质量保修与售后服务？",
          answer: "所有设备均经过专业工程师团队严格检测、校准与电气安全测试，附带正规质量保修与全天候技术支持。",
        },
      },
    },
    {
      category: "Teknik Servis & Bakım",
      sortOrder: 2,
      translations: {
        tr: {
          question: "Teknik servis ve kalibrasyon hizmetleriniz hangi bölgeleri kapsamaktadır?",
          answer: "Ankara merkezli genel merkezimiz ve mobil biyomedikal servis filomuz ile tüm Türkiye genelinde hastanelere, özel kliniklere ve tıp merkezlerine yerinde montaj, arıza onarım ve periyodik kalibrasyon hizmeti sunmaktayız.",
        },
        en: {
          question: "Which geographic areas are covered by your technical service and calibration team?",
          answer: "Headquartered in Ankara, our mobile technical team delivers on-site maintenance, troubleshooting, and calibration services across all regions of Turkey.",
        },
        ar: {
          question: "ما هي المناطق الجغرافية التي تغطيها خدمات الصيانة الفنية والمعايرة؟",
          answer: "نقدم خدمات الصيانة الفنية الميدانية والمعايرة الدورية في جميع أنحاء تركيا عبر فرقنا المتنقلة انطلاقاً من مقرنا في أنقرة.",
        },
        de: {
          question: "In welchen Regionen steht Ihr technischer Kundendienst zur Verfügung?",
          answer: "Von unserem Hauptsitz in Ankara aus bieten unsere mobilen Serviceteams Vor-Ort-Wartung und Kalibrierung in der gesamten Türkei an.",
        },
        ja: {
          question: "認定リファービッシュ（2.手）医療機器には保証が付いていますか？",
          answer: "はい。当社の認定リファービッシュ製品は、すべてバイオメディカルエンジニアによる全面的な分解清掃、パーツ交換、TSE/ISO規格に基づく校正および電気安全試験を実施した上で、6ヶ月〜12ヶ月の完全保証付きでお届けしております。",
        },
        zh: {
          question: "认证翻新（二手）医疗设备是否提供售后质量保修？",
          answer: "是的。我们所有认证翻新医疗设备均经过资深生物医学工程师严格的整机深度清洁、易损件更换、ISO/电气安全检测及标准计量校准，出厂均附带6至12个月的全面质量保修服务与技术支持。",
        },
      },
    },
  ];

  for (const faq of faqsData) {
    const createdFaq = await prisma.faq.create({
      data: {
        category: faq.category,
        sortOrder: faq.sortOrder,
        isActive: true,
      },
    });

    for (const [locale, t] of Object.entries(faq.translations)) {
      await prisma.faqTranslation.create({
        data: {
          faqId: createdFaq.id,
          locale,
          question: t.question,
          answer: t.answer,
        },
      });
    }
  }

  // ─── SAMPLE ANNOUNCEMENTS ────────────────────────
  await prisma.announcement.deleteMany();
  await prisma.announcement.create({
    data: {
      title: "Cebeci Medikal'e Hoş Geldiniz!",
      message: "Tıbbi cihaz tedariki, garantili 2. el revizyonlu cihazlar ve 7/24 biyomedikal teknik servis ihtiyaçlarınız için bize her an ulaşabilirsiniz.",
      imageUrl: null,
      videoUrl: null,
      linkUrl: "/tr/teklif",
      linkText: "Hızlı Fiyat Teklifi Al",
      contentType: "TEXT",
      position: "BOTTOM_LEFT",
      isActive: true,
      priority: 10,
      startDate: new Date(),
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      dismissible: true,
      showOnce: false,
      delaySeconds: 2,
    },
  });

  console.log("Database seeded successfully with 41 authentic Cebeci Medikal products (21 NEW & 20 2.EL Revizyonlu), real local images, categories, services, references, catalogs, FAQs, and announcements!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
