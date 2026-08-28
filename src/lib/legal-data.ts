import { Locale, DEFAULT_LOCALE } from "./i18n";

export interface LegalSection {
  title: string;
  content: string;
  points?: string[];
  notice?: string;
}

export interface LegalDocument {
  slug: string;
  badge: string;
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  importantNotice?: string;
  sections: LegalSection[];
  effectiveDate: string;
}

export const LEGAL_DOCUMENTS: Record<string, Record<Locale, LegalDocument>> = {
  "kvkk-aydinlatma-metni": {
    tr: {
      slug: "kvkk-aydinlatma-metni",
      badge: "KVKK Kapsamı & Aydınlatma Yükümlülüğü",
      title: "Kişisel Verilerin Korunması (KVKK) Aydınlatma Metni",
      subtitle: "6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca veri işleme, saklama ve haklarınıza ilişkin resmi bildirim.",
      metaTitle: "KVKK Aydınlatma Metni | Cebeci Medikal",
      metaDescription: "6698 sayılı KVKK uyarınca veri işleme süreçleri ve ilgili kişi hakları aydınlatma metni.",
      effectiveDate: "01.01.2026",
      importantNotice: "Cebeci Tıbbi Cihazlar ve Medikal Hizmetleri Ltd. Şti. olarak hasta mahremiyetine, müşteri verilerine ve kurumsal bilgi güvenliğine en yüksek düzeyde hassasiyet göstermekteyiz.",
      sections: [
        {
          title: "1. Veri Sorumlusunun Kimliği",
          content: "6698 sayılı KVKK uyarınca veri sorumlusu Cebeci Tıbbi Cihazlar ve Medikal Hizmetleri Ltd. Şti.'dir.",
          points: [
            "Ticaret Unvanı: Cebeci Tıbbi Cihazlar ve Medikal Hizmetleri Ltd. Şti.",
            "Adres: Fevzi Çakmak Mah. Cumhuriyet Bulvarı No: 83/A, Sincan / Ankara",
            "İletişim E-Posta: cbcmedikal@gmail.com",
            "Müşteri Hizmetleri & WhatsApp: +90 506 606 15 40"
          ]
        },
        {
          title: "2. Kişisel Verilerin İşlenme Amaçları",
          content: "Toplanan kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:",
          points: [
            "Tıbbi cihaz teklif, satış, teslimat ve faturalandırma süreçlerinin yürütülmesi",
            "Biyomedikal teknik servis, bakım onarım ve periyodik kalibrasyon hizmetlerinin sağlanması",
            "T.C. Sağlık Bakanlığı ve TİTCK mevzuatına uyum ve yasal bildirim yükümlülükleri",
            "Müşteri ilişkileri yönetimi ve teknik destek taleplerinin takibi"
          ]
        },
        {
          title: "3. İlgili Kişinin Hakları (KVKK Madde 11)",
          content: "KVKK'nın 11. maddesi uyarınca veri sahipleri; verilerinin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, düzeltme, silme ve zararın giderilmesini talep etme haklarına sahiptir."
        }
      ]
    },
    en: {
      slug: "kvkk-aydinlatma-metni",
      badge: "Data Protection & Regulatory Compliance",
      title: "Data Protection & Privacy Notice (KVKK)",
      subtitle: "Official statutory statement regarding personal data processing, storage, and data subject rights under applicable data protection laws.",
      metaTitle: "Data Protection Notice (KVKK) | Cebeci Medikal",
      metaDescription: "Official notice regarding personal data processing, storage principles, and data subject rights under privacy legislation.",
      effectiveDate: "January 1, 2026",
      importantNotice: "At Cebeci Medikal, we apply the highest standards of data security, patient privacy, and clinical confidentiality.",
      sections: [
        {
          title: "1. Identity of the Data Controller",
          content: "Pursuant to applicable data protection regulations, the designated Data Controller is Cebeci Tıbbi Cihazlar ve Medikal Hizmetleri Ltd. Şti.",
          points: [
            "Corporate Title: Cebeci Tıbbi Cihazlar ve Medikal Hizmetleri Ltd. Şti.",
            "Address: Fevzi Cakmak Mah. Cumhuriyet Bulvari No: 83/A, Sincan / Ankara, Turkey",
            "Contact Email: cbcmedikal@gmail.com",
            "Technical Support & WhatsApp: +90 506 606 15 40"
          ]
        },
        {
          title: "2. Purposes of Personal Data Processing",
          content: "Personal data collected through inquiries and service forms is processed for the following purposes:",
          points: [
            "Facilitating medical equipment procurement, sales quotations, and logistics",
            "Delivering biomedical technical services, preventive maintenance, and calibration",
            "Compliance with Ministry of Health regulations and medical device safety tracking",
            "Coordinating technical customer support and inquiry follow-ups"
          ]
        },
        {
          title: "3. Statutory Data Subject Rights",
          content: "Data subjects hold statutory rights to access their data, request rectification or deletion, object to unlawful processing, and seek compensation where statutory violations occur."
        }
      ]
    },
    de: {
      slug: "kvkk-aydinlatma-metni",
      badge: "Datenschutz & Gesetzliche Konformität",
      title: "Datenschutz- & Informationspflicht (KVKK / DSGVO-Standard)",
      subtitle: "Gesetzliche Erklärung zur Verarbeitung, Speicherung und zu den Betroffenenrechten gemäß den geltenden Datenschutzbestimmungen.",
      metaTitle: "Datenschutzhinweis | Cebeci Medikal",
      metaDescription: "Gesetzliche Angaben zur Erhebung und Verarbeitung personenbezogener Daten im Rahmen medizintechnischer Dienstleistungen.",
      effectiveDate: "1. Januar 2026",
      importantNotice: "Cebeci Medikal verpflichtet sich zu höchsten Sicherheitsstandards beim Schutz von Kundendaten und klinischen Informationen.",
      sections: [
        {
          title: "1. Verantwortliche Stelle",
          content: "Verantwortlicher im Sinne der Datenschutzgesetze ist Cebeci Tıbbi Cihazlar ve Medikal Hizmetleri Ltd. Şti.",
          points: [
            "Unternehmensname: Cebeci Tıbbi Cihazlar ve Medikal Hizmetleri Ltd. Şti.",
            "Anschrift: Fevzi Cakmak Mah. Cumhuriyet Bulvari No: 83/A, Sincan / Ankara, Türkei",
            "E-Mail: cbcmedikal@gmail.com",
            "Kundendienst & WhatsApp: +90 506 606 15 40"
          ]
        },
        {
          title: "2. Zwecke der Datenverarbeitung",
          content: "Personenbezogene Daten werden zu folgenden Zwecken erhoben und verarbeitet:",
          points: [
            "Erstellung von Angeboten, Beschaffung und Auslieferung von Medizingeräten",
            "Durchführung von biomedizinischen Wartungs-, Kalibrier- und Reparaturarbeiten",
            "Erfüllung gesetzlicher Dokumentationspflichten im Gesundheitssektor",
            "Kundenbetreuung und Koordination von technischen Supportanfragen"
          ]
        },
        {
          title: "3. Rechte der betroffenen Personen",
          content: "Betroffene Personen haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung sowie Widerspruch gegen die Datenverarbeitung."
        }
      ]
    },
    ar: {
      slug: "kvkk-aydinlatma-metni",
      badge: "حماية البيانات والامتثال القانوني",
      title: "إشعار حماية البيانات والخصوصية القانونية (KVKK)",
      subtitle: "بيان رسمي يوضح سياسات معالجة البيانات الشخصية وتخزينها وحقوق أصحاب البيانات وفق اللوائح المعتمدة.",
      metaTitle: "إشعار حماية البيانات | جبيجي ميديكال",
      metaDescription: "معلومات رسمية حول حماية البيانات الشخصية والامتثال القانوني في تقديم الخدمات الطبية الحيوية.",
      effectiveDate: "1 يناير 2026",
      importantNotice: "تلتزم شركة جبيجي ميديكال بتطبيق أعلى معايير الأمان لحماية بيانات العملاء والسرية الطبية السريرية.",
      sections: [
        {
          title: "1. هوية مسؤول البيانات",
          content: "مسؤول البيانات المعتمد هو شركة Cebeci Tıbbi Cihazlar ve Medikal Hizmetleri Ltd. Şti.",
          points: [
            "الاسم التجاري: شركة جبيجي للأجهزة والخدمات الطبية المحدودة",
            "العنوان: شارع الجمهورية رقم 83/A، سنجان / أنقرة، تركيا",
            "البريد الإلكتروني: cbcmedikal@gmail.com",
            "الدعم الفني وواتساب: 905066061540+"
          ]
        },
        {
          title: "2. أغراض معالجة البيانات الشخصية",
          content: "تتم معالجة البيانات الشخصية للأغراض التالية:",
          points: [
            "إعداد عروض الأسعار وتوريد وتسليم الأجهزة الطبية الجراحية",
            "تقديم خدمات الصيانة الوقائية والمعايرة الفنية الطبية الحيوية",
            "الامتثال للوائح وزارة الصحة وتتبع سلامة الأجهزة الطبية",
            "إدارة خدمة العملاء ومتابعة طلبات الدعم التقني"
          ]
        },
        {
          title: "3. حقوق أصحاب البيانات القانونية",
          content: "يحق لأصحاب البيانات طلب الوصول إلى بياناتهم، وتصحيحها أو حذفها، والاعتراض على أي معالجة غير متوافقة مع القوانين."
        }
      ]
    },
    ja: {
      slug: "kvkk-aydinlatma-metni",
      badge: "個人情報保護方針および法的開示",
      title: "個人情報保護（KVKK/プライバシー）に関する公式通知",
      subtitle: "個人データの取得、利用目的、保管期間および開示請求権に関する法令に基づく公式方針。",
      metaTitle: "個人情報保護方針 | Cebeci Medikal",
      metaDescription: "医療機器調達および生体工学技術サービスにおける個人データ取り扱いに関する方針通知。",
      effectiveDate: "2026年1月1日",
      importantNotice: "Cebeci Medikalは、お客様のデータ機密性と臨床医療情報の厳格な保護に努めております。",
      sections: [
        {
          title: "1. 個人データ管理者の特定",
          content: "法令に基づくデータ管理者は、Cebeci Tıbbi Cihazlar ve Medikal Hizmetleri Ltd. Şti. です。",
          points: [
            "会社名: Cebeci Tıbbi Cihazlar ve Medikal Hizmetleri Ltd. Şti.",
            "所在地: Fevzi Cakmak Mah. Cumhuriyet Bulvari No: 83/A, Sincan / Ankara, Turkey",
            "連絡先メール: cbcmedikal@gmail.com",
            "技術サポート窓口: +90 506 606 15 40"
          ]
        },
        {
          title: "2. 個人データの利用目的",
          content: "収集した個人データは、以下の目的のために利用されます。",
          points: [
            "医療機器の見積作成、調達、納品および請求手続きの履行",
            "生体医工学保守点検、修理、校正サービスの提供",
            "保健当局規制および医療機器安全性管理への適合",
            "カスタマーサポートおよび技術相談対応の管理"
          ]
        },
        {
          title: "3. ご本人の権利",
          content: "ご本人は、自己の個人データに関する開示、訂正、利用停止、消去を請求する権利を有します。"
        }
      ]
    },
    zh: {
      slug: "kvkk-aydinlatma-metni",
      badge: "个人数据合规与隐私保护",
      title: "个人数据保护法（KVKK）法定告知书",
      subtitle: "依据相关数据保护法规，关于个人数据收集、处理目的及主体权利的官方声明。",
      metaTitle: "个人数据保护告知书 | 塞贝吉医疗",
      metaDescription: "关于医疗设备供应与生物医学工程服务中个人数据合规处理的法律告知书。",
      effectiveDate: "2026年1月1日",
      importantNotice: "塞贝吉医疗严格遵守国际与属地数据安全规范，对客户与临床数据实施最高等级保护。",
      sections: [
        {
          title: "1. 数据控制者身份信息",
          content: "依法认定的数据控制者为 Cebeci Tıbbi Cihazlar ve Medikal Hizmetleri Ltd. Şti.。",
          points: [
            "企业全称：Cebeci Tıbbi Cihazlar ve Medikal Hizmetleri Ltd. Şti.",
            "注册地址：Fevzi Cakmak Mah. Cumhuriyet Bulvari No: 83/A, Sincan / Ankara, Turkey",
            "联系邮箱：cbcmedikal@gmail.com",
            "技术支持专线：+90 506 606 15 40"
          ]
        },
        {
          title: "2. 个人数据处理目的",
          content: "收集的个人数据将严格用于以下业务场景：",
          points: [
            "医疗设备采购询价、合同订立、物流交付与财务结算",
            "生物医学工程技术维保、定期校准与故障抢修服务",
            "履行卫生主管机构医疗器械全生命周期追溯与合规报告义务",
            "客户技术咨询跟进与售后服务保障协调"
          ]
        },
        {
          title: "3. 数据主体法定权利",
          content: "数据主体依法享有查阅、更正、删除个人数据，以及撤回同意和依法提出异议的权利。"
        }
      ]
    }
  },
  "gizlilik-politikasi": {
    tr: {
      slug: "gizlilik-politikasi",
      badge: "Veri Güvenliği & Mahremiyet İlkeleri",
      title: "Gizlilik Politikası ve Bilgi Güvenliği",
      subtitle: "Web sitemizi ziyaret eden kullanıcıların ve kurumsal müşterilerimizin bilgi güvenliğini koruma ilkelerimiz.",
      metaTitle: "Gizlilik Politikası | Cebeci Medikal",
      metaDescription: "Cebeci Medikal kurumsal veri güvenliği, hasta mahremiyeti ve gizlilik politikası.",
      effectiveDate: "01.01.2026",
      sections: [
        {
          title: "1. Bilgi Güvenliği Taahhüdümüz",
          content: "Cebeci Medikal, ziyaretçilerinin dijital güvenliğini sağlamak amacıyla SSL/TLS şifreleme, güvenlik duvarları ve sıkı erişim kontrolleri uygular."
        },
        {
          title: "2. Toplanan Bilgiler",
          content: "Web sitemiz üzerinden yapılan teklif talepleri, teknik servis bildirimleri ve iletişim formlarında paylaşılan iletişim bilgileri güvenli sunucularda saklanır."
        },
        {
          title: "3. Üçüncü Taraflarla Paylaşım",
          content: "Verileriniz yasal zorunluluklar haricinde hiçbir şekilde üçüncü şahıs veya kurumlara ticari amaçla aktarılmaz ve satılmaz."
        }
      ]
    },
    en: {
      slug: "gizlilik-politikasi",
      badge: "Data Security & Confidentiality",
      title: "Corporate Privacy & Data Security Policy",
      subtitle: "Our rigorous principles for safeguarding visitor privacy, corporate data, and clinical confidentiality.",
      metaTitle: "Privacy Policy | Cebeci Medikal",
      metaDescription: "Comprehensive data security, privacy principles, and client information protection policy.",
      effectiveDate: "January 1, 2026",
      sections: [
        {
          title: "1. Information Security Commitment",
          content: "Cebeci Medikal employs SSL/TLS encryption, firewall protection, and strict role-based access controls to guarantee full digital security."
        },
        {
          title: "2. Information Collected",
          content: "Contact details provided via equipment quotation forms, technical service requests, and general contact forms are stored on secure servers."
        },
        {
          title: "3. Third-Party Sharing Prohibition",
          content: "Personal and institutional data is never sold, shared, or transferred to third parties for marketing purposes, except where required by law."
        }
      ]
    },
    de: {
      slug: "gizlilik-politikasi",
      badge: "Datensicherheit & Vertraulichkeit",
      title: "Datenschutzerklärung & IT-Sicherheitsrichtlinie",
      subtitle: "Unsere Grundsätze zum Schutz der Privatsphäre von Webseitenbesuchern und geschäftlichen Kontaktdaten.",
      metaTitle: "Datenschutzerklärung | Cebeci Medikal",
      metaDescription: "Grundsätze zur IT-Sicherheit, Vertraulichkeit und zum Schutz personenbezogener Daten.",
      effectiveDate: "1. Januar 2026",
      sections: [
        {
          title: "1. Sicherheitsverpflichtung",
          content: "Cebeci Medikal nutzt modernste SSL/TLS-Verschlüsselung und strenge Zugriffskontrollen zur Gewährleistung der digitalen Sicherheit."
        },
        {
          title: "2. Erhobene Daten",
          content: "Angaben aus Angebotsanfragen, Serviceformularen und Kontaktanfragen werden auf gesicherten Servern verarbeitet."
        },
        {
          title: "3. Keine Weitergabe an Dritte",
          content: "Eine Weitergabe oder ein Verkauf Ihrer Daten an Dritte zu Werbezwecken findet unter keinen Umständen statt."
        }
      ]
    },
    ar: {
      slug: "gizlilik-politikasi",
      badge: "أمان البيانات والسرية الطبية",
      title: "سياسة الخصوصية وأمان المعلومات",
      subtitle: "المبادئ المعتمدة لحماية خصوصية زوار موقعنا وعملائنا من المؤسسات الصحية والمستشفيات.",
      metaTitle: "سياسة الخصوصية | جبيجي ميديكال",
      metaDescription: "سياسة أمان وسرية البيانات والامتثال لأعلى معايير حماية المعلومات الطبية.",
      effectiveDate: "1 يناير 2026",
      sections: [
        {
          title: "1. الالتزام بأمان المعلومات",
          content: "تستخدم شركة جبيجي ميديكال بروتوكولات تشفير SSL/TLS متطورة وجدران حماية لضمان أعلى مستويات الأمان الرقمي."
        },
        {
          title: "2. المعلومات التي يتم جمعها",
          content: "يتم حفظ بيانات الاتصال والمعلومات الفنية المقدمة عبر نماذج عروض الأسعار والخدمات التقنية على خوادم آمنة."
        },
        {
          title: "3. عدم مشاركة البيانات مع أطراف ثالثة",
          content: "لا يتم بيع أو مشاركة بياناتكم مع أي أطراف ثالثة لأغراض تجارية إطلاقاً إلا وفقاً للمتطلبات القانونية الإلزامية."
        }
      ]
    },
    ja: {
      slug: "gizlilik-politikasi",
      badge: "データセキュリティおよび機密保持",
      title: "プライバシーポリシーおよび情報セキュリティ方針",
      subtitle: "ウェブサイト訪問者および取引先医療機関の情報を安全に保護するための基本方針。",
      metaTitle: "プライバシーポリシー | Cebeci Medikal",
      metaDescription: "情報セキュリティ、データ保護および機密保持に関する公式プライバシーポリシー。",
      effectiveDate: "2026年1月1日",
      sections: [
        {
          title: "1. 情報セキュリティへの取り組み",
          content: "当社はSSL/TLS暗号化通信および厳格なアクセス制御を導入し、最高水準の情報セキュリティを維持しています。"
        },
        {
          title: "2. 取得する情報",
          content: "見積依頼フォームや技術サービス申請を通じて提供された情報は、安全な保護環境下で管理されます。"
        },
        {
          title: "3. 第三者提供の制限",
          content: "法令に基づく場合を除き、取得した情報を本人の同意なく第三者に販売・提供することは一切ございません。"
        }
      ]
    },
    zh: {
      slug: "gizlilik-politikasi",
      badge: "数据安全与机密保护",
      title: "隐私政策与网络安全合规说明",
      subtitle: "关于保护网站访客与医疗机构客户个人隐私及商业信息安全的原则与措施。",
      metaTitle: "隐私政策 | 塞贝吉医疗",
      metaDescription: "塞贝吉医疗关于网络安全、数据机密性与客户隐私保护的官方政策声明。",
      effectiveDate: "2026年1月1日",
      sections: [
        {
          title: "1. 信息安全保障承诺",
          content: "塞贝吉医疗采用全站 SSL/TLS 高强度传输加密及防火墙体系，确保数据在传输与存储中的绝对安全。"
        },
        {
          title: "2. 信息的收集范围",
          content: "通过报价单、维修申请及在线表单提交的联系人与机构信息均存储于高安全级别的数据服务器中。"
        },
        {
          title: "3. 严禁向第三方泄露",
          content: "除法律法规强制要求外，本公司绝不将任何客户信息用于商业出售或向未经授权的第三方披露。"
        }
      ]
    }
  },
  "cerez-politikasi": {
    tr: {
      slug: "cerez-politikasi",
      badge: "Çerez Türleri & Tercih Yönetimi",
      title: "Çerez (Cookie) Politikası",
      subtitle: "Web sitemizde kullanıcı deneyimini artırmak ve performans analizleri yapmak amacıyla kullanılan çerezlere ilişkin bilgilendirme.",
      metaTitle: "Çerez Politikası | Cebeci Medikal",
      metaDescription: "Web sitemizde kullanılan zorunlu, analitik ve tercih çerezleri hakkında bilgilendirme.",
      effectiveDate: "01.01.2026",
      sections: [
        {
          title: "1. Çerez Nedir?",
          content: "Çerezler, web sitemizi ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza kaydedilen küçük metin dosyalarıdır."
        },
        {
          title: "2. Kullanılan Çerez Türleri",
          content: "Web sitemizde aşağıdaki çerezler kullanılmaktadır:",
          points: [
            "Zorunlu Çerezler: Sitenin temel fonksiyonlarının ve güvenliğinin çalışması için gereklidir.",
            "Tercih Çerezleri: Seçtiğiniz dil (TR, EN, DE, AR, JA, ZH) ve tema tercihlerini hatırlar.",
            "Analitik Çerezler: Ziyaretçi trafiğini ve sayfa gezinimlerini anonim olarak ölçümler."
          ]
        }
      ]
    },
    en: {
      slug: "cerez-politikasi",
      badge: "Cookie Categories & Preferences",
      title: "Cookie Policy",
      subtitle: "Information about the essential, analytical, and preference cookies used to optimize your browsing experience.",
      metaTitle: "Cookie Policy | Cebeci Medikal",
      metaDescription: "Overview of essential, analytical, and preference cookies used across our healthcare technology platform.",
      effectiveDate: "January 1, 2026",
      sections: [
        {
          title: "1. What Are Cookies?",
          content: "Cookies are small data files placed on your device by your web browser when visiting our website."
        },
        {
          title: "2. Types of Cookies We Use",
          content: "Our website utilizes the following categories of cookies:",
          points: [
            "Essential Cookies: Required for core website navigation, session management, and security.",
            "Preference Cookies: Remember your preferred language (TR, EN, DE, AR, JA, ZH) and color theme.",
            "Analytics Cookies: Anonymously measure website traffic and page interaction metrics."
          ]
        }
      ]
    },
    de: {
      slug: "cerez-politikasi",
      badge: "Cookie-Kategorien & Einstellungen",
      title: "Cookie-Richtlinie",
      subtitle: "Informationen über die Verwendung notwendiger und analytischer Cookies zur Optimierung des Nutzererlebnisses.",
      metaTitle: "Cookie-Richtlinie | Cebeci Medikal",
      metaDescription: "Transparente Übersicht über die auf unserer Plattform eingesetzten Cookie-Typen.",
      effectiveDate: "1. Januar 2026",
      sections: [
        {
          title: "1. Was sind Cookies?",
          content: "Cookies sind kleine Textdateien, die beim Besuch unserer Webseite auf Ihrem Endgerät gespeichert werden."
        },
        {
          title: "2. Eingesetzte Cookie-Arten",
          content: "Wir setzen folgende Kategorien von Cookies ein:",
          points: [
            "Notwendige Cookies: Erforderlich für den sicheren Betrieb und die Grundfunktionen der Webseite.",
            "Präferenz-Cookies: Speichern Ihre Sprachauswahl (DE, EN, TR, AR, JA, ZH) und Ihr Farbschema.",
            "Analyse-Cookies: Ermöglichen die anonyme Auswertung von Nutzerzugriffen zur Performanceverbesserung."
          ]
        }
      ]
    },
    ar: {
      slug: "cerez-politikasi",
      badge: "ملفات تعريف الارتباط والتفضيلات",
      title: "سياسة ملفات تعريف الارتباط (Cookies)",
      subtitle: "معلومات توضيحية حول ملفات تعريف الارتباط الأساسية والتحليلية المستخدمة لتحسين تجربة التصفح.",
      metaTitle: "سياسة ملفات تعريف الارتباط | جبيجي ميديكال",
      metaDescription: "تفاصيل ملفات تعريف الارتباط المستخدمة لإدارة تفضيلات اللغة والأمان على موقعنا.",
      effectiveDate: "1 يناير 2026",
      sections: [
        {
          title: "1. ما هي ملفات تعريف الارتباط؟",
          content: "ملفات تعريف الارتباط هي ملفات نصية صغيرة يتم حفظها على جهازكم عند تصفح الموقع لتحسين الأداء."
        },
        {
          title: "2. أنواع ملفات تعريف الارتباط المستخدمة",
          content: "نستخدم الفئات التالية من ملفات تعريف الارتباط:",
          points: [
            "الملفات الضرورية: لازمة لتشغيل الوظائف الأساسية وتأمين جلسة التصفح.",
            "ملفات التفضيلات: لحفظ لغتكم المفضلة (العربية، الإنجليزية، التركية، الألمانية، اليابانية، الصينية) وإعدادات المظهر.",
            "الملفات التحليلية: لقياس حركة الزوار وأداء الصفحات بشكل مجهول الهوية."
          ]
        }
      ]
    },
    ja: {
      slug: "cerez-politikasi",
      badge: "クッキーの種類および管理方針",
      title: "クッキー（Cookie）ポリシー",
      subtitle: "当ウェブサイトにおける利便性向上およびアクセス解析のためのクッキー使用方針に関するご説明。",
      metaTitle: "クッキーポリシー | Cebeci Medikal",
      metaDescription: "ウェブサイトの機能維持、言語設定保存および統計計測のためのクッキーポリシー。",
      effectiveDate: "2026年1月1日",
      sections: [
        {
          title: "1. クッキーとは",
          content: "クッキーとは、ウェブサイト訪問時にお客様のブラウザに保存される小さなテキストファイルです。"
        },
        {
          title: "2. 使用するクッキーの種類",
          content: "当社ウェブサイトでは以下のクッキーを使用しています。",
          points: [
            "必須クッキー: サイトの基本動作およびセキュリティ維持に不可欠なクッキーです。",
            "設定保存クッキー: 選択された言語設定（日本語、英語、トルコ語等）やテーマを保存します。",
            "解析クッキー: サイト利用状況を匿名で統計計測し、品質向上に役立てます。"
          ]
        }
      ]
    },
    zh: {
      slug: "cerez-politikasi",
      badge: "Cookie 类别与偏好管理",
      title: "Cookie 政策说明",
      subtitle: "关于本网站为优化浏览体验和开展匿名性能统计而使用 Cookie 的说明。",
      metaTitle: "Cookie 政策 | 塞贝吉医疗",
      metaDescription: "关于用于系统基础运行、多语言偏好记忆及匿名分析的 Cookie 政策。",
      effectiveDate: "2026年1月1日",
      sections: [
        {
          title: "1. 什么是 Cookie？",
          content: "Cookie 是您访问网站时由浏览器存储在计算机或移动设备上的小型文本文件。"
        },
        {
          title: "2. 我们使用的 Cookie 类型",
          content: "本平台主要使用以下几类 Cookie：",
          points: [
            "必要型 Cookie：维持网站核心功能正常运行及安全防护所必需。",
            "偏好型 Cookie：用于记忆您的首选语言（中文、英文、土耳其文等）及界面主题。",
            "分析型 Cookie：用于匿名统计访客流量分布，以持续优化产品与技术体验。"
          ]
        }
      ]
    }
  },
  "kullanim-kosullari": {
    tr: {
      slug: "kullanim-kosullari",
      badge: "Site Şartları & Hizmet Sözleşmesi",
      title: "Web Sitesi Kullanım Koşulları",
      subtitle: "Cebeci Medikal kurumsal web sitesine erişim, içerik kullanımı ve fikri mülkiyet haklarına ilişkin kurallar.",
      metaTitle: "Kullanım Koşulları | Cebeci Medikal",
      metaDescription: "Cebeci Medikal web sitesi kullanım şartları, fikri mülkiyet ve yasal sorumluluk sınırları.",
      effectiveDate: "01.01.2026",
      sections: [
        {
          title: "1. Koşulların Kabulü",
          content: "Bu web sitesini ziyaret eden tüm kullanıcılar, belirtilen kullanım koşullarını kabul etmiş sayılır."
        },
        {
          title: "2. Fikri Mülkiyet Hakları",
          content: "Sitede yer alan logo, tasarım, teknik şartname derlemeleri ve metinlerin tüm telif hakları Cebeci Medikal'e aittir. İzinsiz kopyalanamaz ve ticari amaçla çoğaltılamaz."
        }
      ]
    },
    en: {
      slug: "kullanim-kosullari",
      badge: "Website Terms & Clinical Service Agreement",
      title: "Website Terms of Service",
      subtitle: "Terms and conditions governing the access, content utilization, and intellectual property of the Cebeci Medikal platform.",
      metaTitle: "Terms of Service | Cebeci Medikal",
      metaDescription: "Terms of use, intellectual property protection, and conditions governing the Cebeci Medikal portal.",
      effectiveDate: "January 1, 2026",
      sections: [
        {
          title: "1. Acceptance of Terms",
          content: "By accessing and using this portal, healthcare professionals and users agree to be bound by these Terms of Service."
        },
        {
          title: "2. Intellectual Property Rights",
          content: "All trademarks, technical catalogs, device diagrams, and multimedia assets are the intellectual property of Cebeci Medikal."
        }
      ]
    },
    de: {
      slug: "kullanim-kosullari",
      badge: "Nutzungsbedingungen & Portalrichtlinien",
      title: "Allgemeine Nutzungsbedingungen",
      subtitle: "Bedingungen für den Zugriff auf die Inhalte und Dienstleistungen von Cebeci Medikal.",
      metaTitle: "Nutzungsbedingungen | Cebeci Medikal",
      metaDescription: "Rechtliche Bedingungen für die Nutzung der Medizintechnik-Plattform von Cebeci Medikal.",
      effectiveDate: "1. Januar 2026",
      sections: [
        {
          title: "1. Geltungsbereich und Zustimmung",
          content: "Mit dem Zugriff auf dieses Webportal erklärt sich der Nutzer mit diesen Bedingungen einverstanden."
        },
        {
          title: "2. Geistiges Eigentum",
          content: "Alle Inhalte, Logos, Produktkataloge und technischen Beschreibungen unterliegen dem Urheberrecht von Cebeci Medikal."
        }
      ]
    },
    ar: {
      slug: "kullanim-kosullari",
      badge: "شروط الاستخدام والاتفاقيات",
      title: "شروط وأحكام استخدام الموقع",
      subtitle: "الأحكام القانونية الحاكمة لتصفح الموقع وحقوق الملكية الفكرية للأجهزة والكتالوجات الطبية.",
      metaTitle: "شروط الاستخدام | جبيجي ميديكال",
      metaDescription: "الشروط القانونية وحقوق الملكية الفكرية لتصفح منصة جبيجي ميديكال للتقنيات الطبية.",
      effectiveDate: "1 يناير 2026",
      sections: [
        {
          title: "1. قبول الشروط",
          content: "يعد استخدام الموقع وقنوات الاتصال موافقة صريحة على الالتزام بكافة الشروط والأحكام الموضحة."
        },
        {
          title: "2. حقوق الملكية الفكرية",
          content: "كافة الشعارات، ومواصفات الأجهزة، والتصميمات، ومحتويات الكتالوجات محمية بموجب حقوق الملكية الفكرية لشركة جبيجي ميديكال."
        }
      ]
    },
    ja: {
      slug: "kullanim-kosullari",
      badge: "利用規約およびサービス約款",
      title: "ウェブサイト利用規約",
      subtitle: "Cebeci Medikalの医療機器情報プラットフォームへのアクセスおよび知的財産権に関する規約。",
      metaTitle: "利用規約 | Cebeci Medikal",
      metaDescription: "ウェブサイトの利用条件、免責事項および知的財産権に関する公式利用規約。",
      effectiveDate: "2026年1月1日",
      sections: [
        {
          title: "1. 規約への同意",
          content: "当サイトを利用することにより、ユーザーは本利用規約のすべての条項に同意したものとみなされます。"
        },
        {
          title: "2. 知的財産権の帰属",
          content: "サイト上のロゴ、製品仕様データ、カタログおよび掲載文書の著作権はすべてCebeci Medikalに帰属します。"
        }
      ]
    },
    zh: {
      slug: "kullanim-kosullari",
      badge: "使用条款与服务协议",
      title: "网站使用条款与协议",
      subtitle: "关于访问塞贝吉医疗数字化服务平台、技术内容使用及知识产权归属的规定。",
      metaTitle: "使用条款 | 塞贝吉医疗",
      metaDescription: "塞贝吉医疗官方网站使用条款、服务协议与知识产权保护声明。",
      effectiveDate: "2026年1月1日",
      sections: [
        {
          title: "1. 条款的接受",
          content: "访问或使用本网站即表明您已阅读、理解并同意接受本使用条款的所有约束。"
        },
        {
          title: "2. 知识产权保护",
          content: "网站内所有商标、产品技术说明、图纸与原创文档的版权均归塞贝吉医疗独家所有，严禁侵权复制。"
        }
      ]
    }
  },
  "yasal-uyari": {
    tr: {
      slug: "yasal-uyari",
      badge: "Tıbbi Mevzuat & Yasal Sorumluluk Reddi",
      title: "Yasal Uyarı & Tıbbi Mevzuat Bildirimi",
      subtitle: "T.C. Sağlık Bakanlığı, Türkiye İlaç ve Tıbbi Cihaz Kurumu (TİTCK) yönetmelikleri ve tıbbi cihaz sektörü sorumluluk sınırlarına ilişkin resmi bildirim.",
      metaTitle: "Yasal Uyarı & Mevzuat | Cebeci Medikal",
      metaDescription: "T.C. Sağlık Bakanlığı TİTCK tıbbi cihaz mevzuatı, profesyonel bilgilendirme ve yasal uyarı bildirimi.",
      effectiveDate: "01.01.2026",
      importantNotice: "Bu sitede yer alan teknik bilgiler yalnızca sağlık kurumlarına ve profesyonellerine yöneliktir. Hiçbir içerik tıbbi teşhis veya tedavi tavsiyesi niteliği taşımaz.",
      sections: [
        {
          title: "1. TİTCK Tıbbi Cihaz Satış ve Tanıtım Yönetmeliği",
          content: "T.C. Sağlık Bakanlığı TİTCK mevzuatı gereğince; ameliyathane, yoğun bakım ve anestezi sistemlerinin teknik tanıtımları sağlık kuruluşları yetkililerine ve biyomedikal uzmanlarına hitaben yapılmaktadır."
        },
        {
          title: "2. Tıbbi Tavsiye Sorumluluk Reddi",
          content: "Sitede sunulan cihaz parametreleri ve teknik açıklamalar mühendislik bilgilendirmesi olup, hekim kararı veya klinik teşhis yerine geçmez."
        }
      ]
    },
    en: {
      slug: "yasal-uyari",
      badge: "Medical Regulatory Compliance & Disclaimer",
      title: "Legal & Regulatory Medical Disclaimer",
      subtitle: "Official regulatory disclosure under Ministry of Health medical device promotion regulations and biomedical engineering guidelines.",
      metaTitle: "Regulatory Disclaimer | Cebeci Medikal",
      metaDescription: "Regulatory compliance notice under medical device advertising and technical dissemination standards.",
      effectiveDate: "January 1, 2026",
      importantNotice: "All technical specifications and clinical equipment details are intended exclusively for healthcare institutions and qualified clinical professionals. Nothing herein constitutes clinical medical advice.",
      sections: [
        {
          title: "1. Medical Device Promotion Regulations",
          content: "In compliance with statutory medical device regulations, presentations of critical surgical, ICU, and anesthesia devices are aimed strictly at healthcare buyers and biomedical specialists."
        },
        {
          title: "2. Medical Diagnosis Disclaimer",
          content: "All technical device parameters are provided for engineering and procurement purposes and do not replace licensed medical practitioner discretion."
        }
      ]
    },
    de: {
      slug: "yasal-uyari",
      badge: "Medizinrecht & Haftungsausschluss",
      title: "Rechtliche Hinweise & Medizinprodukte-Mevzuat",
      subtitle: "Offizielle Mitteilung zu den regulatorischen Bestimmungen für Medizinprodukte und Haftungsausschlüssen.",
      metaTitle: "Rechtliche Hinweise | Cebeci Medikal",
      metaDescription: "Rechtlicher Hinweis zu Medizinprodukte-Vorschriften und fachlicher Information für medizinisches Personal.",
      effectiveDate: "1. Januar 2026",
      importantNotice: "Die technischen Produktbeschreibungen richten sich ausschließlich an medizinisches Fachpersonal und Gesundheitseinrichtungen.",
      sections: [
        {
          title: "1. Bestimmungen für Medizinprodukte",
          content: "Die Bereitstellung technischer Daten zu Anästhesie-, Beatmungs- und OP-Systemen richtet sich an Fachkreise und Biomediziningenieure."
        },
        {
          title: "2. Ausschluss medizinischer Beratung",
          content: "Die Inhalte dienen rein technischen Informations- und Beschaffungszwecken und stellen keine medizinische Diagnose oder Therapieempfehlung dar."
        }
      ]
    },
    ar: {
      slug: "yasal-uyari",
      badge: "اللوائح الطبية وإخلاء المسؤولية",
      title: "إخلاء المسؤولية القانونية واللوائح التنظيمية للأجهزة الطبية",
      subtitle: "بيان رسمي بخصوص لوائح وزارة الصحة وهيئة الأجهزة الطبية وحدود المسؤولية القانونية.",
      metaTitle: "إخلاء المسؤولية الطبية | جبيجي ميديكال",
      metaDescription: "إشعار الامتثال التنظيمي للوائح الأجهزة الطبية الجراحية والعناية المركزة.",
      effectiveDate: "1 يناير 2026",
      importantNotice: "المعلومات الفنية الواردة في هذا الموقع موجهة حصراً للمؤسسات الصحية والمتخصصين في المجال الطبي ولا تعد بديلاً عن الاستشارة الطبية السريرية.",
      sections: [
        {
          title: "1. لوائح الترويج للأجهزة الطبية",
          content: "وفقاً للوائح التنظيمية الصحية، فإن العروض الفنية لأجهزة التخدير والعمليات والعناية المركزة مخصصة للكوادر الهندسية والطبية في المستشفيات."
        },
        {
          title: "2. إخلاء المسؤولية عن التشخيص الطبي",
          content: "المواصفات الفنية المنشورة هي معلومات هندسية وتقنية للمعدات، ولا تمثل تشخيصاً طبياً أو بروتوكولاً علاجياً."
        }
      ]
    },
    ja: {
      slug: "yasal-uyari",
      badge: "医療機器規制および法的免責事項",
      title: "法的免責事項および医療機器規制に関する告知",
      subtitle: "保健当局の医療機器規制、広告・情報提供ガイドラインおよび免責事項に関する公式通知。",
      metaTitle: "法的免責事項 | Cebeci Medikal",
      metaDescription: "医療機器規制基準および臨床専門職向け技術情報提供に関する免責告知。",
      effectiveDate: "2026年1月1日",
      importantNotice: "本サイトに掲載されている医療機器仕様情報は、医療機関および医療従事者を対象とした技術情報であり、医療診断や治療を意図したものではありません。",
      sections: [
        {
          title: "1. 医療機器の情報提供規制",
          content: "手術室機器、人工呼吸器、生体情報モニター等の仕様情報は、医療機関の調達担当者および生体工学技士向けに提供されています。"
        },
        {
          title: "2. 医療行為・診断に関する免責",
          content: "掲載されている機器パラメータおよび機能説明は工学的仕様であり、医師の診断や臨床判断に代わるものではありません。"
        }
      ]
    },
    zh: {
      slug: "yasal-uyari",
      badge: "医疗器械监管与法律免责",
      title: "法律免责声明与医疗器械合规公告",
      subtitle: "关于卫生部医疗器械推广法规、专业技术信息发布准则与法律责任边界的官方声明。",
      metaTitle: "法律免责声明 | 塞贝吉医疗",
      metaDescription: "关于手术室与重症生命支持设备合规展示及专业医疗免责的法律声明。",
      effectiveDate: "2026年1月1日",
      importantNotice: "本网站登载的技术参数与产品规格仅供医疗机构专业人员采购参考，不构成任何临床医疗诊断或处方建议。",
      sections: [
        {
          title: "1. 医疗器械专业推广规范",
          content: "依据医疗器械监督管理条例，麻醉机、呼吸机及手术室监护系统的技术参数展示严格面向医疗机构及生物医学工程师。"
        },
        {
          title: "2. 医疗诊断责任免除",
          content: "网站所载设备技术指标属于生物医学工程参数，不能替代执业医师的专业临床诊断与医疗决策。"
        }
      ]
    }
  },
  "erisilebilirlik-bildirimi": {
    tr: {
      slug: "erisilebilirlik-bildirimi",
      badge: "WCAG 2.1 AA Standartları & Uyumluluk",
      title: "Erişilebilirlik Bildirimi",
      subtitle: "Web sitemizin tüm kullanıcılar ve engelli bireyler için erişilebilir olmasını sağlama taahhüdümüz.",
      metaTitle: "Erişilebilirlik Bildirimi | Cebeci Medikal",
      metaDescription: "Web sitemizin WCAG 2.1 AA erişilebilirlik standartlarına uyumu hakkında bilgilendirme.",
      effectiveDate: "01.01.2026",
      sections: [
        {
          title: "1. Erişilebilirlik Standartları",
          content: "Sitemiz W3C Web İçeriği Erişilebilirlik Yönergeleri (WCAG 2.1) Seviye AA standartlarına uyumlu olarak tasarlanmıştır."
        },
        {
          title: "2. Uygulanan Özellikler",
          content: "Ekran okuyucu uyumluluğu, yüksek kontrast modu, klavye navigasyonu ve atlama linkleri aktiftir."
        }
      ]
    },
    en: {
      slug: "erisilebilirlik-bildirimi",
      badge: "WCAG 2.1 AA Standards & Compliance",
      title: "Web Accessibility Statement",
      subtitle: "Our commitment to providing an inclusive, barrier-free digital healthcare technology portal.",
      metaTitle: "Accessibility Statement | Cebeci Medikal",
      metaDescription: "Official commitment to W3C WCAG 2.1 AA digital accessibility standards.",
      effectiveDate: "January 1, 2026",
      sections: [
        {
          title: "1. Accessibility Standards",
          content: "Our portal conforms to the W3C Web Content Accessibility Guidelines (WCAG 2.1) Level AA requirements."
        },
        {
          title: "2. Key Implemented Features",
          content: "Screen reader support, high contrast color palettes, keyboard accessibility, and skip-to-content links are fully implemented."
        }
      ]
    },
    de: {
      slug: "erisilebilirlik-bildirimi",
      badge: "WCAG 2.1 AA Konformität",
      title: "Erklärung zur Barrierefreiheit",
      subtitle: "Unser Engagement für eine barrierefreie und für alle Nutzer zugängliche Webpräsenz.",
      metaTitle: "Erklärung zur Barrierefreiheit | Cebeci Medikal",
      metaDescription: "Angaben zur Einhaltung der Barrierefreiheitsstandards WCAG 2.1 AA.",
      effectiveDate: "1. Januar 2026",
      sections: [
        {
          title: "1. Standard der Barrierefreiheit",
          content: "Dieses Webportal entspricht den Richtlinien für barrierefreie Webinhalte (WCAG 2.1) auf Konformitätsstufe AA."
        },
        {
          title: "2. Barrierefreie Funktionen",
          content: "Optimierung für Screenreader, Tastaturbedienbarkeit, Kontrastmodi und Sprungmarken sind integriert."
        }
      ]
    },
    ar: {
      slug: "erisilebilirlik-bildirimi",
      badge: "معايير إمكانية الوصول العالمية WCAG 2.1 AA",
      title: "بيان إمكانية الوصول وسهولة الاستخدام",
      subtitle: "التزامنا بتوفير منصة رقمية شاملة وسهلة الوصول لكافة المستخدمين وذوي الاحتياجات الخاصة.",
      metaTitle: "بيان إمكانية الوصول | جبيجي ميديكال",
      metaDescription: "التزامنا بتطبيق معايير إمكانية الوصول الرقمية W3C WCAG 2.1 AA.",
      effectiveDate: "1 يناير 2026",
      sections: [
        {
          title: "1. معايير سهولة الوصول",
          content: "تم تصميم موقعنا بما يتوافق مع إرشادات إتاحة محتوى الويب W3C WCAG 2.1 المستوى AA."
        },
        {
          title: "2. الميزات المطبقة",
          content: "دعم قارئات الشاشة، والتباين اللوني العالي، والتنقل الكامل عبر لوحة المفاتيح."
        }
      ]
    },
    ja: {
      slug: "erisilebilirlik-bildirimi",
      badge: "WCAG 2.1 AA 国際アクセシビリティ準拠",
      title: "ウェブアクセシビリティ方針",
      subtitle: "すべての医療関係者および訪問者に対してバリアフリーな情報提供を実現するための公式方針。",
      metaTitle: "アクセシビリティ方針 | Cebeci Medikal",
      metaDescription: "W3C WCAG 2.1 AA基準に基づくウェブアクセシビリティ方針に関する告知。",
      effectiveDate: "2026年1月1日",
      sections: [
        {
          title: "1. 適合基準",
          content: "当サイトは、W3C Web Content Accessibility Guidelines (WCAG 2.1) レベルAAに準拠するよう設計されています。"
        },
        {
          title: "2. 主な実装機能",
          content: "スクリーンリーダー対応、高コントラスト設計、キーボード操作対応およびスキップリンクを実装しています。"
        }
      ]
    },
    zh: {
      slug: "erisilebilirlik-bildirimi",
      badge: "WCAG 2.1 AA 国际无障碍标准",
      title: "网站无障碍访问声明",
      subtitle: "致力于为所有用户及行动不便人士提供无障碍、包容的数字化医疗技术服务体验。",
      metaTitle: "无障碍访问声明 | 塞贝吉医疗",
      metaDescription: "符合 W3C WCAG 2.1 AA 标准的无障碍访问承诺与技术说明。",
      effectiveDate: "2026年1月1日",
      sections: [
        {
          title: "1. 无障碍合规标准",
          content: "本平台遵循万维网联盟 W3C Web 内容无障碍指南 (WCAG 2.1) AA 级标准进行开发与维护。"
        },
        {
          title: "2. 核心支持特性",
          content: "支持屏幕阅读器朗读、高对比度模式、全键盘无障碍导航及主要内容直达跳转功能。"
        }
      ]
    }
  }
};

export function getLegalDocument(slug: string, locale: string = DEFAULT_LOCALE): LegalDocument | null {
  const currentLocale = (locale as Locale) || DEFAULT_LOCALE;
  const doc = LEGAL_DOCUMENTS[slug];
  if (!doc) return null;
  return doc[currentLocale] || doc[DEFAULT_LOCALE] || doc.tr;
}
