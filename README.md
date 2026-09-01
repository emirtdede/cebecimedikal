<div align="center">

# 🏥 Cebeci Medikal — Biyomedikal Sistemler & Kurumsal Web Platformu

</div>

---

<div align="center">

[![](https://img.shields.io/badge/Language-English-blue?style=for-the-badge&logo=google-translate)](#english-version)
&nbsp;&nbsp;&nbsp;&nbsp;
[![](https://img.shields.io/badge/Dil-T%C3%BCrk%C3%A7e-red?style=for-the-badge&logo=google-translate)](#turkish-version)

</div>

---

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.1.7-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6.4-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![SQLite](https://img.shields.io/badge/Database-SQLite%20%2F%20Postgres-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![Jose JWT](https://img.shields.io/badge/Security-Jose%20JWT-blueviolet?style=for-the-badge&logo=jsonwebtokens)
![i18n](https://img.shields.io/badge/Localization-6%20Languages-00C853?style=for-the-badge&logo=google-translate)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

</div>

---

<a id="english-version"></a>
# English Version

<div align="center">
  <img src="public/favicon.svg" alt="Cebeci Medikal Logo" width="120" height="120" />
  <h3>Cebeci Medikal — Biomedical Systems & Enterprise Web Platform</h3>
  <p><em>Enterprise-Grade Medical Devices Catalog, Technical Services, Quotation Engine & 6-Language Dynamic CMS</em></p>
  <p><strong>Developed & Maintained for <a href="https://cebecimedikal.com">Cebeci Medikal</a></strong></p>
</div>

<br>

## 💻 Project Overview

**Cebeci Medikal** is an enterprise-grade digital platform engineered for medical equipment procurement, biomedical calibration, technical maintenance, hospital supply chains, and clinical healthcare engineering. Built on **Next.js 15 (App Router)**, **React 19**, **TypeScript**, and **Prisma ORM**, the platform delivers a high-performance, fully localized experience across **6 global languages** (`TR`, `EN`, `DE`, `AR`, `JA`, `ZH`), coupled with a custom-built **Administrative Management Suite (Admin CMS)**.

The entire platform is **100% database-driven** with zero hardcoded product or service records. It features real-time search, live clinical device simulation loops, dynamic experience calculations, multi-step interactive quotation generation, automated translation fallback cascading, immutable security audit logging, and search query telemetry.

---

## 🚀 Key Features

- **Full 6-Language Multi-Region Localization (i18n)**: Native App Router localization across Turkish (`tr`), English (`en`), German (`de`), Arabic (`ar` with native RTL layout support), Japanese (`ja`), and Chinese (`zh`) with dynamic metadata, hreflang tags, and SEO optimization.
- **Smart Translation Fallback Engine**: Flexible data architecture where non-primary translations are optional. If a translation is missing for a target locale, the system cascades gracefully (`Requested` $\rightarrow$ `TR` $\rightarrow$ `EN` $\rightarrow$ `Available Record`) without throwing errors.
- **Live Biomedical Product Loop Simulation**: Dynamic hero section featuring synchronized state-machine simulations of real clinical systems (Mindray BeneHeart D6, Dräger Primus, Spacelabs Ultraview 90369, Hamilton G5 ICU Ventilator) with real-time ECG oscilloscope waveforms and tolerance checks.
- **Dynamic Experience & Inventory Engine**: Automated anniversary calculations (`Year - 2015`) and live published product counters reflecting exact database numbers without hardcoded figures.
- **Interactive Quotation Builder (`/teklif`)**: Multi-step medical quotation builder with automatic quotation code generation, customer data validation, and direct WhatsApp / Email dispatch integrations.
- **Biomedical Technical Services Hub (`/hizmetler`)**: Dynamic maintenance, calibration, installation, and periodic biomedical technical service management with slug-based routing.
- **Custom Admin Management Suite (`/admin`)**:
  - **Product Management**: Full CRUD operations, multi-language tabbed forms, image galleries, technical specs editor, and status toggling (`PUBLISHED`, `DRAFT`, `REVIEW`).
  - **Category & Service Management**: Real-time search, status filtering, Lucide icon selectors, and relational integrity locks.
  - **Catalog Management**: PDF brochure upload tracking, versioning, file-size indicators, and live download analytics.
  - **Reference & Testimonial Manager**: Hospital ratings (1-5 stars), city/sector tags, and localized reviews.
  - **Contact & Quote Inboxes**: Live message viewer, quick status transitions (`NEW`, `REPLIED`, `ARCHIVED`), and instant WhatsApp/Email response shortcuts.
  - **Media Library**: Dynamic file system explorer with instant image search, format filtering (WebP, PNG, SVG), clipboard URL copying, and resolution inspection.
  - **Security & Audit Logs**: Immutable recording of administrative actions, user timestamps, entity IDs, and IP tracking.
  - **Search Telemetry & Analytics**: Real-time logging of user search terms, language distribution, and zero-result opportunity tracking.
- **High-Performance Architecture**: WebP optimized graphics, dynamic SVG favicons, glassmorphism dark-mode UI, and sub-100ms response times.

---

## 🛠️ Tech Stack

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js_15.1-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript_5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma_6.4-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Jose JWT](https://img.shields.io/badge/Jose_JWT_Auth-blueviolet?style=for-the-badge)
![Lucide](https://img.shields.io/badge/Lucide_Icons-orange?style=for-the-badge)

</div>

### Framework & Frontend (Next.js & React 19)
- **Next.js 15.1.7**: App Router architecture, Server Components, Server Actions & Route Handlers
- **React 19 & TypeScript 5.7**: Component-driven reactive UI with strict static typing
- **TailwindCSS 3.4.17**: Custom HSL color design tokens, glassmorphism panel styles & responsive layouts
- **Lucide React 0.475**: Modern, lightweight SVG iconography
- **Google Fonts**: Inter, DM Serif Display, Noto Sans Arabic, Noto Sans JP, and Noto Sans SC

### Backend, Database & Security
- **Prisma ORM 6.4.1**: Type-safe query builder and database migrations (SQLite dev, PostgreSQL prod)
- **Jose 6.0.8 & Bcrypt.js 3.0.2**: Stateless JWT authentication with secure HTTP-only session cookies
- **Zod 3.24.2**: Runtime schema validation for forms, APIs, and administrative mutations
- **Vitest 3.0.5**: Unit and integration test runner

---

## 📁 Project Structure

```tree
cebecimedikal/
├── prisma/                         # Database schema, seed datasets & SQLite migrations
│   ├── dev.db                      # Local development SQLite database
│   ├── schema.prisma               # Prisma data models & relations
│   └── seed.ts                     # Initial biomedical products & multilingual seed data
├── public/                         # Public static assets, WebP images & brand icons
│   ├── favicon.svg                 # White 'C' logo icon
│   ├── Logo/                       # Brand SVG vectors & medical symbols
│   └── images/products/            # Optimized WebP medical device images
├── src/
│   ├── app/                        # Next.js 15 App Router architecture
│   │   ├── [locale]/               # Public multilingual routing ([locale] = tr, en, de, ar, ja, zh)
│   │   │   ├── page.tsx            # Full-viewport hero with live biomedical simulation loop
│   │   │   ├── hakkimizda/         # Corporate about page with dynamic experience counters
│   │   │   ├── urunler/            # Medical catalog directory & product detail pages
│   │   │   ├── hizmetler/          # Biomedical services directory & dynamic detail pages
│   │   │   ├── referanslar/        # Hospital references & client reviews
│   │   │   ├── kataloglar/         # PDF product brochures & download center
│   │   │   ├── iletisim/           # Interactive contact form & Google Maps location
│   │   │   └── teklif/             # Multi-step medical quotation builder
│   │   ├── admin/                  # Custom Admin CMS Suite
│   │   │   ├── login/              # Secure administrator authentication screen
│   │   │   ├── products/           # Product CRUD & inventory management
│   │   │   ├── categories/         # Category CRUD & icon management
│   │   │   ├── services/           # Technical service CRUD & translation manager
│   │   │   ├── references/         # Client reviews & hospital ratings manager
│   │   │   ├── catalogs/           # PDF catalog uploads & download metrics
│   │   │   ├── faqs/               # FAQ CRUD & categorization
│   │   │   ├── messages/           # Customer contact messages inbox & reply manager
│   │   │   ├── quotes/             # Quotation requests manager & status workflow
│   │   │   ├── media/              # Media library & file manager
│   │   │   ├── audit-logs/         # Security audit trails & action logs
│   │   │   └── search-analytics/   # Search telemetry & query analytics
│   │   ├── api/                    # Secure Next.js REST API routes
│   │   │   ├── admin/              # Protected management APIs with JWT validation
│   │   │   ├── contact/            # Public contact submission endpoint
│   │   │   └── quotes/             # Public quote request intake endpoint
│   │   ├── icon.tsx                # Dynamic browser tab icon (white 'C')
│   │   └── layout.tsx              # Root HTML, font variables & viewport layout
│   ├── components/                 # Reusable UI & layout components
│   │   ├── layout/                 # BrandLogo, Header, Footer, Language Switcher & Quick Contact
│   │   ├── home/                   # HeroSimulationLoop, Trust Stats, Category Grid
│   │   └── ui/                     # Form controls, Modals, Badges, Buttons
│   ├── features/admin/             # Interactive client-side admin management tables
│   │   ├── AdminProductsTable.tsx
│   │   ├── AdminCategoriesManager.tsx
│   │   ├── AdminServicesManager.tsx
│   │   ├── AdminReferencesManager.tsx
│   │   ├── AdminCatalogsManager.tsx
│   │   ├── AdminFaqsManager.tsx
│   │   ├── AdminMessagesManager.tsx
│   │   ├── AdminQuotesTable.tsx
│   │   ├── AdminMediaManager.tsx
│   │   ├── AdminAuditLogsManager.tsx
│   │   └── AdminSearchAnalyticsManager.tsx
│   ├── lib/                        # Core utilities, database client, i18n & auth
│   │   ├── auth.ts                 # JWT token creation, verification & user context
│   │   ├── data.ts                 # Database queries with intelligent fallback caching
│   │   ├── db.ts                   # Prisma client singleton
│   │   ├── dictionary.ts           # Dictionary cache and locale string resolution
│   │   └── i18n.ts                 # 6-Language configuration & dictionary loaders
│   ├── locales/                    # JSON dictionary translation files (tr, en, de, ar, ja, zh)
│   └── middleware.ts               # Route protection & locale redirection middleware
├── package.json                    # Node dependencies & npm scripts
├── tsconfig.json                   # TypeScript compiler configuration
└── README.md                       # Master Documentation
```

---

## 💾 Database Schema

| Table Name | Description | Key Columns |
| :--- | :--- | :--- |
| `User` | Administrator and staff accounts | `id`, `email`, `passwordHash`, `name`, `role`, `isActive` |
| `Category` | Master biomedical device categories | `id`, `slug`, `icon`, `sortOrder`, `isActive` |
| `CategoryTranslation` | Multilingual category names & descriptions | `id`, `categoryId`, `locale`, `name`, `description` |
| `Product` | Medical devices and technical catalog items | `id`, `slug`, `categoryId`, `brand`, `model`, `sku`, `condition`, `status`, `images`, `technicalSpecs` |
| `ProductTranslation` | 6-language product titles, summaries & SEO | `id`, `productId`, `locale`, `title`, `shortDescription`, `description` |
| `Service` | Biomedical services (Calibration, Repair, Setup) | `id`, `slug`, `icon`, `sortOrder`, `isActive` |
| `ServiceTranslation` | Localized service descriptions & workflows | `id`, `serviceId`, `locale`, `title`, `shortDescription`, `description` |
| `Reference` | Hospital and clinic client reviews | `id`, `companyName`, `clientName`, `rating`, `sector`, `city`, `serviceScope` |
| `ReferenceTranslation` | Localized testimonials and reviews | `id`, `referenceId`, `locale`, `quote`, `projectDescription` |
| `Catalog` | PDF brochures and documentation | `id`, `title`, `category`, `fileUrl`, `fileSize`, `version`, `downloadCount` |
| `Faq` | Frequently asked questions | `id`, `category`, `sortOrder`, `isActive` |
| `FaqTranslation` | Localized question and answer pairs | `id`, `faqId`, `locale`, `question`, `answer` |
| `QuoteRequest` | Incoming hospital quotation requests | `id`, `quoteNumber`, `fullName`, `company`, `email`, `phone`, `status`, `preferredChannel` |
| `ContactMessage` | Inbound contact submissions | `id`, `fullName`, `company`, `email`, `phone`, `subject`, `message`, `isRead`, `status` |
| `AuditLog` | Security audit trail for all admin operations | `id`, `userId`, `userName`, `action`, `entityType`, `entityId`, `details`, `ipAddress` |
| `SearchQuery` | Search telemetry and keyword logs | `id`, `query`, `locale`, `resultsCount`, `ipAddress` |

---

## ⚙️ Installation & Setup

### Prerequisites
- **Node.js**: Version 20.0.0 or higher
- **npm** or **yarn** package manager

### Step-by-Step Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/emirtdede/cebecimedikal.git
   cd cebecimedikal
   ```

2. **Install Node Dependencies:**
   ```bash
   npm install
   ```

3. **Initialize Database & Seed Data:**
   ```bash
   npx prisma generate
   npx prisma db push
   npm run seed
   ```

4. **Verify TypeScript & Production Build:**
   ```bash
   npx tsc --noEmit
   npm run build
   ```

5. **Start Local Development Server:**
   ```bash
   npm run dev
   ```
   *Open your browser at:* `http://localhost:3000`

6. **Admin Portal Access:**
   - **Login URL**: `http://localhost:3000/admin/login`
   - *Credentials are configured securely in `.env`.*

---

## ⚖️ License

Distributed under the **MIT License**. See `LICENSE` for more information.

**Official Website**: [Cebeci Medikal](https://cebecimedikal.com)

---

<br>

---

<a id="turkish-version"></a>
# Türkçe Versiyon

<div align="center">
  <img src="public/favicon.svg" alt="Cebeci Medikal Logo" width="120" height="120" />
  <h3>Cebeci Medikal — Biyomedikal Sistemler & Kurumsal Web Platformu</h3>
  <p><em>Kurumsal Düzeyde Tıbbi Cihaz Kataloğu, Biyomedikal Teknik Servis, Teklif Motoru & 6 Dilde Dinamik CMS</em></p>
  <p><strong>Geliştirici ve Yayıncı: <a href="https://cebecimedikal.com">Cebeci Medikal</a></strong></p>
</div>

<br>

## 💻 Project Overview (Proje Genel Bakışı)

**Cebeci Medikal**, tıbbi cihaz tedariki, biyomedikal kalibrasyon, teknik bakım-onarım, hastane donanımları ve kurumsal sağlık mühendisliği çözümleri için özel olarak geliştirilmiş kurumsal düzeyde bir dijital web platformudur. **Next.js 15 (App Router)**, **React 19**, **TypeScript** ve **Prisma ORM** mimarisiyle inşa edilen platform; **6 global dilde** (`TR`, `EN`, `DE`, `AR`, `JA`, `ZH`) tam dinamik yerelleştirilmiş kullanıcı deneyimini, gelişmiş bir **Özel Yönetim Paneli (Admin CMS)** ile bir arada sunar.

Sistemdeki hiçbir ürün veya hizmet verisi statik kodlanmamış olup **%100 veritabanı üzerinden dinamik** olarak yönetilir. Gerçek zamanlı canlı arama, canlı biyomedikal cihaz simülasyonu, dinamik deneyim hesaplayıcısı, çok adımlı teklif formu, akıllı çeviri fallback mekanizması ve güvenlik denetim kayıtları içerir.

---

## 🚀 Key Features (Önemli Özellikler)

- **6 Dilde %100 Tam Yerelleştirme (i18n)**: Türkçe (`tr`), İngilizce (`en`), Almanca (`de`), Arapça (`ar` - tam RTL sağdan sola yerleşim desteği), Japonca (`ja`) ve Çince (`zh`) dillerinde dinamik rota desteği, çeviriler ve SEO optimizasyonu.
- **Akıllı Çeviri Fallback Sistemi**: Admin panelinden içerik girilirken 6 dili birden doldurma zorunluluğu yoktur. Boş bırakılan diller sistem tarafından otomatik olarak kademeli biçimde (`İstenen Dil` $\rightarrow$ `TR` $\rightarrow$ `EN` $\rightarrow$ `Mevcut Çeviri`) devralınır; sayfada hiçbir kırılma veya hata oluşmaz.
- **Canlı Biyomedikal Ürün Simülasyonu (Live Product Loop)**: Hero alanında gerçek klinik cihazların (Mindray BeneHeart D6, Dräger Primus, Spacelabs Ultraview 90369, Hamilton G5) test ve kalibrasyon süreçlerini birebir taklit eden, gerçek zamanlı EKG osiloskop dalga formlu canlı simülasyon konsolu.
- **Dinamik Deneyim ve Envanter Sayacı**: Kuruluş yılından (`2015`) güncel yıla göre otomatik hesaplanan tecrübe süresi (`11+ Yıllık Deneyim`) ve yayındaki gerçek ürün sayısını yansıtan canlı sayaçlar.
- **İnteraktif Teklif Oluşturucu (`/teklif`)**: Otomatik teklif numarası oluşturan, müşteri doğrulama ve WhatsApp/E-posta ile doğrudan iletim sağlayan çok adımlı teklif motoru.
- **Biyomedikal Teknik Servis Portalı (`/hizmetler`)**: Periyodik bakım, kalibrasyon, arıza onarım ve montaj süreçlerinin 6 dilde detaylı yönetimi.
- **Gelişmiş Özel Yönetim Paneli (`/admin`)**:
  - **Ürün Yönetimi**: Tam CRUD desteği, 6 dilli sekme formu, görsel galerisi, teknik özellik tablosu ve yayın durumu kontrolü (`PUBLISHED`, `DRAFT`, `REVIEW`).
  - **Kategori & Hizmet Yönetimi**: Canlı arama, durum filtreleme, Lucide ikon seçicisi ve veri bütünlüğü koruma kilitleri.
  - **Katalog Yönetimi**: PDF katalog yükleme, sürüm ve dosya boyutu takibi, canlı indirme istatistikleri.
  - **Referans Yönetimi**: Hastane müşteri değerlendirmeleri (1-5 yıldız), şehir/sektör filtreleme ve çok dilli yorumlar.
  - **İletişim & Teklif Gelen Kutusu**: Gelen mesajları inceleme, otomatik okundu takibi, tek tıkla e-posta/WhatsApp ile yanıtlama.
  - **Medya Kütüphanesi**: Canlı dosya sistemi tarayıcısı, anlık görsel arama, format filtreleme (WebP, PNG, SVG), pano link kopyalama.
  - **Audit Log (Denetim Kayıtları)**: Tüm yönetici işlemlerinin, kullanıcı kimliklerinin, IP adreslerinin ve JSON detaylarının değişmez kaydı.
  - **Arama Analitiği**: Kullanıcıların sitede arattığı kelimeler, dil dağılımları ve 0 sonuç veren arama fırsatlarının canlı takibi.
- **Yüksek Performans & Güvenlik**: Optimize WebP görseller, dinamik beyaz 'C' favicon, modern cam efektli (glassmorphism) karanlık tema ve JWT oturum yönetimi.

---

## 🛠️ Tech Stack (Teknoloji Yığını)

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js_15.1-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript_5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma_6.4-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Jose JWT](https://img.shields.io/badge/Jose_JWT_Auth-blueviolet?style=for-the-badge)
![Lucide](https://img.shields.io/badge/Lucide_Icons-orange?style=for-the-badge)

</div>

### Çatı & Ön Yüz (Next.js & React 19)
- **Next.js 15.1.7**: App Router mimarisi, Server Components, Server Actions & API Route Handlers
- **React 19 & TypeScript 5.7**: Bileşen odaklı, statik tipli reaktif kullanıcı arayüzü
- **TailwindCSS 3.4.17**: Özel HSL renk sistemi, cam efektleri (glassmorphism) ve duyarlı arayüz düzenleri
- **Lucide React 0.475**: Modern ve tutarlı SVG ikon kütüphanesi
- **Tipografi**: Inter, DM Serif Display, Noto Sans Arabic, Noto Sans JP ve Noto Sans SC

### Arka Uç, Veritabanı ve Güvenlik
- **Prisma ORM 6.4.1**: Tip güvenli veritabanı sorgu motoru ve şema yönetimi (Geliştirme için SQLite, canlı için PostgreSQL)
- **Jose 6.0.8 & Bcrypt.js 3.0.2**: Durumsuz JWT oturum güvenliği ve HTTP-only çerez koruması
- **Zod 3.24.2**: Form ve API girdileri için çalışma zamanı şema doğrulaması
- **Vitest 3.0.5**: Birim ve entegrasyon test motoru

---

## 📁 Project Structure (Proje Klasör Yapısı)

```tree
cebecimedikal/
├── prisma/                         # Veritabanı şeması, tohum verileri ve SQLite migrasyonları
│   ├── dev.db                      # Yerel geliştirme SQLite veritabanı
│   ├── schema.prisma               # Prisma veri modelleri ve ilişkiler
│   └── seed.ts                     # Tıbbi cihazlar ve çok dilli başlangıç verileri
├── public/                         # Statik dosyalar, WebP görselleri, kataloglar ve SVG ikonlar
│   ├── favicon.svg                 # Düz beyaz 'C' marka ikonu
│   ├── Logo/                       # Vektörel SVG logolar ve medikal semboller
│   └── images/products/            # Optimize edilmiş WebP medikal cihaz görselleri
├── src/
│   ├── app/                        # Next.js 15 App Router mimarisi
│   │   ├── [locale]/               # 6 dilde halka açık sayfalar ([locale] = tr, en, de, ar, ja, zh)
│   │   │   ├── page.tsx            # Canlı biyomedikal simülasyon konsollu ana sayfa
│   │   │   ├── hakkimizda/         # Dinamik deneyim sayaçlı kurumsal sayfa
│   │   │   ├── urunler/            # Tıbbi cihaz kataloğu ve ürün detay sayfaları
│   │   │   ├── hizmetler/          # Biyomedikal servis listesi ve detay sayfaları
│   │   │   ├── referanslar/        # Hastane referansları ve müşteri yorumları
│   │   │   ├── kataloglar/         # PDF ürün katalogları indirme merkezi
│   │   │   ├── iletisim/           # İletişim formu ve harita
│   │   │   └── teklif/             # Çok adımlı tıbbi cihaz teklif formu
│   │   ├── admin/                  # Özel Yönetim Paneli (Admin CMS)
│   │   │   ├── login/              # Güvenli yönetici giriş ekranı
│   │   │   ├── products/           # Ürün yönetimi CRUD ve filtreleme
│   │   │   ├── categories/         # Kategori yönetimi CRUD ve ikon seçimi
│   │   │   ├── services/           # Teknik servis yönetimi CRUD ve çok dilli çeviri
│   │   │   ├── references/         # Hastane referansları ve puan yönetimi
│   │   │   ├── catalogs/           # PDF katalog yönetimi ve indirme sayaçları
│   │   │   ├── faqs/               # Sıkça sorulan sorular CRUD
│   │   │   ├── messages/           # Müşteri mesajları gelen kutusu ve yanıtlama
│   │   │   ├── quotes/             # Teklif talepleri yönetimi ve durum akışı
│   │   │   ├── media/              # Medya kütüphanesi ve dosya yöneticisi
│   │   │   ├── audit-logs/         # Güvenlik denetim kayıtları ve JSON inceleyici
│   │   │   └── search-analytics/   # Arama analitiği ve sorgu takibi
│   │   ├── api/                    # Güvenli REST API rotaları
│   │   │   ├── admin/              # JWT korumalı yönetim uç noktaları
│   │   │   ├── contact/            # İletişim formu veri alım ucu
│   │   │   └── quotes/             # Teklif talebi kayıt ucu
│   │   ├── icon.tsx                # Dinamik sekme simgesi (Beyaz 'C')
│   │   └── layout.tsx              # Kök HTML, font değişkenleri ve metaveri düzeni
│   ├── components/                 # Yeniden kullanılabilir arayüz bileşenleri
│   │   ├── layout/                 # BrandLogo, Header, Footer, Dil Seçici ve Hızlı İletişim
│   │   ├── home/                   # HeroSimulationLoop, Güven Göstergeleri, Kategori Kartları
│   │   └── ui/                     # Form elemanları, Modallar, Rozetler, Butonlar
│   ├── features/admin/             # İstemci taraflı interaktif yönetim bileşenleri
│   │   ├── AdminProductsTable.tsx
│   │   ├── AdminCategoriesManager.tsx
│   │   ├── AdminServicesManager.tsx
│   │   ├── AdminReferencesManager.tsx
│   │   ├── AdminCatalogsManager.tsx
│   │   ├── AdminFaqsManager.tsx
│   │   ├── AdminMessagesManager.tsx
│   │   ├── AdminQuotesTable.tsx
│   │   ├── AdminMediaManager.tsx
│   │   ├── AdminAuditLogsManager.tsx
│   │   └── AdminSearchAnalyticsManager.tsx
│   ├── lib/                        # Çekirdek servisler, veritabanı, i18n ve kimlik doğrulama
│   │   ├── auth.ts                 # JWT token üretimi, doğrulama ve kullanıcı oturumu
│   │   ├── data.ts                 # Akıllı fallback destekli veritabanı sorguları
│   │   ├── db.ts                   # Prisma client tekil örneği (singleton)
│   │   ├── dictionary.ts           # Sözlük önbelleği ve dize çözücü
│   │   └── i18n.ts                 # 6 dil yapılandırması ve sözlük yükleyicisi
│   ├── locales/                    # JSON dil çeviri dosyaları (tr, en, de, ar, ja, zh)
│   └── middleware.ts               # Rota güvenliği ve dil yönlendirme ara yazılımı
├── package.json                    # Bağımlılıklar ve proje scriptleri
├── tsconfig.json                   # TypeScript derleme ayarları
└── README.md                       # Ana Dokümantasyon
```

---

## 💾 Database Schema (Veritabanı Şeması)

| Tablo Adı | Açıklama | Temel Sütunlar |
| :--- | :--- | :--- |
| `User` | Yönetici ve personel hesapları | `id`, `email`, `passwordHash`, `name`, `role`, `isActive` |
| `Category` | Tıbbi cihaz ana kategorileri | `id`, `slug`, `icon`, `sortOrder`, `isActive` |
| `CategoryTranslation` | 6 dilde kategori isimleri ve açıklamaları | `id`, `categoryId`, `locale`, `name`, `description` |
| `Product` | Medikal cihazlar ve katalog ürünleri | `id`, `slug`, `categoryId`, `brand`, `model`, `sku`, `condition`, `status`, `images`, `technicalSpecs` |
| `ProductTranslation` | 6 dilde ürün başlıkları, özetleri ve SEO | `id`, `productId`, `locale`, `title`, `shortDescription`, `description` |
| `Service` | Biyomedikal teknik servisler (Kalibrasyon, Onarım vb.) | `id`, `slug`, `icon`, `sortOrder`, `isActive` |
| `ServiceTranslation` | 6 dilde hizmet açıklamaları ve süreçler | `id`, `serviceId`, `locale`, `title`, `shortDescription`, `description` |
| `Reference` | Hastane ve klinik referans değerlendirmeleri | `id`, `companyName`, `clientName`, `rating`, `sector`, `city`, `serviceScope` |
| `ReferenceTranslation` | 6 dilde müşteri yorumları | `id`, `referenceId`, `locale`, `quote`, `projectDescription` |
| `Catalog` | PDF ürün ve servis katalogları | `id`, `title`, `category`, `fileUrl`, `fileSize`, `version`, `downloadCount` |
| `Faq` | Sıkça sorulan sorular | `id`, `category`, `sortOrder`, `isActive` |
| `FaqTranslation` | 6 dilde soru ve cevap metinleri | `id`, `faqId`, `locale`, `question`, `answer` |
| `QuoteRequest` | Gelen tıbbi cihaz teklif talepleri | `id`, `quoteNumber`, `fullName`, `company`, `email`, `phone`, `status`, `preferredChannel` |
| `ContactMessage` | Gelen iletişim formu mesajları | `id`, `fullName`, `company`, `email`, `phone`, `subject`, `message`, `isRead`, `status` |
| `AuditLog` | Değişmez güvenlik ve yönetici işlem geçmişi | `id`, `userId`, `userName`, `action`, `entityType`, `entityId`, `details`, `ipAddress` |
| `SearchQuery` | Kullanıcı arama sorguları ve telemetri logları | `id`, `query`, `locale`, `resultsCount`, `ipAddress` |

---

## ⚙️ Installation & Setup (Kurulum ve Kullanım)

### Gereksinimler
- **Node.js**: Sürüm 20.0.0 veya üzeri
- **npm** veya **yarn** paket yöneticisi

### Adım Adım Kurulum

1. **Depoyu Klonlayın:**
   ```bash
   git clone https://github.com/emirtdede/cebecimedikal.git
   cd cebecimedikal
   ```

2. **Bağımlılıkları Yükleyin:**
   ```bash
   npm install
   ```

3. **Veritabanını Hazırlayın ve Başlangıç Verilerini Yükleyin:**
   ```bash
   npx prisma generate
   npx prisma db push
   npm run seed
   ```

4. **Statik Tip Doğrulamasını ve Derlemeyi Kontrol Edin:**
   ```bash
   npx tsc --noEmit
   npm run build
   ```

5. **Geliştirme Sunucusunu Başlatın:**
   ```bash
   npm run dev
   ```
   *Tarayıcınızda açın:* `http://localhost:3000`

6. **Yönetici Giriş ve Yetkilendirme:**
   - **Yönetici Giriş Portalı**: `http://localhost:3000/admin/login`
   - *Not: Yönetici ve personel giriş bilgileri `.env` (veya `.env.example`) ortam değişkenleri üzerinden güvenli şekilde yapılandırılmaktadır.*

---

## ⚖️ License (Lisans)

Bu proje **MIT Lisansı** ile lisanslanmıştır. Detaylar için `LICENSE` dosyasına başvurabilirsiniz.

**Resmi Web Sitesi**: [Cebeci Medikal](https://cebecimedikal.com)
