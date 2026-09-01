# GOAL: Enterprise Privacy + KVKK + Cookie Consent Audit, Remediation & Verification

Bu görevin amacı mevcut web sitesinin kişisel veri işleme, cookie/consent davranışı, analytics/marketing entegrasyonları ve kullanıcıya sunulan privacy kontrollerini teknik açıdan kapsamlı biçimde incelemek; uygulama seviyesindeki eksikleri güvenli şekilde düzeltmek ve sonuçları kanıtlamaktır.

Bu çalışma hukuki danışmanlığın yerine geçmez. Hukuki metinlerin içerik ve mevzuat uygunluğu hukuk uzmanı tarafından ayrıca doğrulanmalıdır. Bu audit'in görevi özellikle **uygulamanın beyan edilen privacy/consent davranışını teknik olarak gerçekten uygulayıp uygulamadığını** kontrol etmektir.

## Temel Çalışma Döngüsü

```text
DISCOVER DATA FLOWS
↓
CLASSIFY PROCESSING
↓
MAP COOKIES / STORAGE / THIRD PARTIES
↓
VERIFY CONSENT BEHAVIOR
↓
IDENTIFY GAPS
↓
REMEDIATE TECHNICAL ISSUES
↓
RE-TEST
↓
REGRESSION CHECK
↓
REPORT
```

---

# 0. Temel Kurallar

- Gerçek kullanıcı kişisel verilerini rapora kopyalama.
- Cookie/token/identifier değerlerini gerektiğinde `[REDACTED]` yap.
- Production üzerinde gerçek kullanıcı consent tercihlerini değiştirme.
- Hukuki yorum gerektiren noktaları kesin hüküm gibi sunma.
- “KVKK compliant” veya “GDPR compliant” gibi mutlak hukuki sonuçları yalnızca teknik scanner çıktısından üretme.
- Erişimin olmayan CMP, analytics, CRM veya backend storage davranışlarını doğrulanmış sayma.
- Uygulanmayan kontrolleri `N/A — reason`, doğrulanamayanları `NOT VERIFIED — reason` olarak raporla.
- Privacy iyileştirmesi uğruna kritik site fonksiyonlarını bozma.

---

# 1. Privacy Architecture Inventory

Önce uygulamanın privacy açısından mimarisini çıkar.

Belirle:

```text
Frontend
Backend/API
Database
Analytics
Tag Manager
Advertising/Marketing pixels
Session replay
Error tracking
Chat widgets
CRM
Email marketing
Forms
Authentication
Payment
CDN
Consent Management Platform
Customer support tools
Third-party embeds
Maps
Video providers
Captcha
A/B testing
Personalization
```

Her servis için mümkünse:

```text
Provider
Purpose
Data categories
Client/server
Cookie/storage usage
Consent dependency
Data destination
Retention if known
Configuration source
```

oluştur.

---

# 2. Personal Data Flow Mapping

Kullanıcıdan veya cihazdan alınabilecek verileri belirle.

Örnek kategoriler:

- ad/soyad
- email
- telefon
- IP address
- user/account ID
- device/browser information
- location if collected
- form content
- support messages
- authentication data
- payment-related metadata
- analytics identifiers
- advertising identifiers
- cookie IDs
- referral/UTM data
- uploaded files

Her veri için:

```text
SOURCE
↓
COLLECTION POINT
↓
PROCESSING
↓
STORAGE
↓
THIRD PARTY TRANSFER
↓
RETENTION / DELETION
```

akışını mümkün olduğunca çıkar.

---

# 3. Data Minimization

Her form/API/event için şu soruyu sor:

> Bu veri, ilgili işlev için gerçekten gerekli mi?

Tespit et:

- gereksiz form alanı
- gereksiz hidden field
- frontend'in kullanmadığı hassas API field
- analytics'e gereksiz PII gönderimi
- URL query string'e kişisel veri yazılması
- loglara kişisel veri sızması

Gereksiz teknik veri toplamayı güvenli şekilde azalt.

---

# 4. Cookie Inventory

Browser'da oluşan tüm cookie'leri envanterle.

Her cookie için:

```text
Name
Domain
Path
First/Third Party
Purpose
Category
Created by
Expiry
Secure
HttpOnly
SameSite
Before consent?
After reject?
```

Cookie değerlerini raporda gerektiğinde redact et.

---

# 5. Non-Cookie Browser Storage

Sadece cookie bakma.

İncele:

```text
localStorage
sessionStorage
IndexedDB
Cache Storage
service worker storage
URL parameters
fingerprinting-related storage if present
```

Consent gerektiren tracking'in cookie yerine localStorage ile çalışması sorunu çözmez.

---

# 6. Cookie Classification

Teknik kullanım amacına göre sınıflandır:

```text
Strictly necessary
Functional / preference
Analytics
Advertising / marketing
Other
```

Bir cookie'yi sadece adı nedeniyle sınıflandırma; hangi script'in oluşturduğunu ve nasıl kullanıldığını doğrula.

---

# 7. Pre-Consent Network Audit

Yeni kullanıcı / temiz profile ile siteyi aç.

Henüz herhangi bir consent seçimi yapılmadan önce Network tab üzerinden doğrula:

- analytics request var mı?
- marketing pixel var mı?
- ad network request var mı?
- session replay başlıyor mu?
- third-party tracking cookie oluşuyor mu?

Gerekli olmayan kategoriler için beklenen consent modeline aykırı pre-consent çalışmayı tespit et.

---

# 8. Consent Banner UI

Cookie/consent banner varsa kontrol et:

- görünür mü?
- ilk ziyaretçide gösteriliyor mu?
- Accept seçeneği
- Reject seçeneği
- Preferences/Manage seçeneği
- kategori açıklamaları
- privacy/cookie policy bağlantıları
- keyboard accessibility
- responsive behavior

Reject seçeneğini kullanıcı için kasıtlı olarak gizleyen veya ciddi biçimde zorlaştıran dark pattern'leri işaretle.

---

# 9. Accept All Behavior

`Accept All` seçildiğinde:

- izin verilen kategoriler aktifleşiyor mu?
- ilgili scripts gerçekten yükleniyor mu?
- consent state doğru persist ediliyor mu?
- refresh sonrası korunuyor mu?
- duplicate script load oluşuyor mu?

---

# 10. Reject All Behavior

`Reject All` seçildiğinde:

- strictly necessary dışındaki tracking engelleniyor mu?
- analytics/marketing request devam ediyor mu?
- third-party cookie yeniden oluşuyor mu?
- refresh sonrası reject tercihi korunuyor mu?

Reject state yalnızca UI üzerinde değil gerçek network/storage seviyesinde doğrulanmalı.

---

# 11. Granular Preferences

Kategori bazlı preference varsa kombinasyonları test et.

Örnek:

```text
Necessary = ON
Analytics = OFF
Marketing = OFF
Functional = ON
```

Her kombinasyonda beklenen script/request davranışını doğrula.

---

# 12. Consent Withdrawal

Kullanıcı tercihini sonradan değiştirebiliyor mu?

Kontrol:

- privacy settings link/button
- banner'ı yeniden açma
- consent withdrawal
- category update
- yeni tercihlerin network davranışına uygulanması

---

# 13. Consent Persistence

Consent state:

- ne kadar süre tutuluyor?
- cookie/localStorage nerede?
- domain/path doğru mu?
- locale değişiminde korunuyor mu?
- subdomain'lerde davranış ne?
- versioning var mı?

Policy/kategori yapısı önemli ölçüde değiştiğinde re-consent mekanizması değerlendirilmeli.

---

# 14. Consent Logging / Proof

Sistem consent record saklıyorsa:

- timestamp
- consent version
- selected categories
- anonymous/user identifier
- source

gibi alanları incele.

Ancak gereksiz kişisel veri toplayarak “consent proof” oluşturma.

---

# 15. Google Tag Manager / Tag Manager Audit

GTM veya başka tag manager varsa:

- tag firing conditions
- consent triggers
- default consent state
- delayed firing
- duplicate tags
- custom HTML tags
- hidden tracking

incele.

Preview/debug ortamı ile gerçek production container'ın karışmadığını doğrula.

---

# 16. Google Analytics / Measurement Consent

Analytics varsa:

- consent öncesi davranış
- reject sonrası davranış
- consent update
- duplicate GA initialization
- measurement ID
- PII leakage
- URL/query data

kontrol et.

Analytics event payload'ında email, telefon, isim gibi PII bulunmamalı.

---

# 17. Advertising / Marketing Pixels

Varsa:

- Meta Pixel
- Google Ads
- LinkedIn Insight
- TikTok Pixel
- diğer ad platformları

için consent gating'i ayrı ayrı doğrula.

Bir marketing pixel başka bir script tarafından dolaylı yükleniyor olabilir; Network üzerinden doğrula.

---

# 18. Session Replay / Heatmaps

Hotjar, Microsoft Clarity veya benzeri araçlar varsa:

- consent dependency
- masking
- form input capture
- sensitive pages
- user identifiers
- session recording

kontrol et.

Password, payment veya sensitive form verilerinin kayıt altına alınmadığını doğrula.

---

# 19. Error Tracking Privacy

Sentry veya benzeri monitoring için:

- user email/name capture
- request body
- headers
- cookies
- URL params
- breadcrumbs
- session replay

PII filtering/redaction ayarlarını kontrol et.

---

# 20. Forms + Privacy Notice

Kişisel veri toplayan formları belirle:

- contact
- newsletter
- demo request
- registration
- job application
- support
- quote request

Her formda kullanıcıya gerekli bilgilendirme bağlantısı/notice bulunuyor mu teknik olarak kontrol et.

Checkbox gerekiyorsa:

- default checked olmamalı
- hangi işlem için olduğu açık olmalı
- validation doğru olmalı

Farklı amaçları tek bir belirsiz checkbox altında birleştirme.

---

# 21. Marketing Consent Separation

Contact/service request ile marketing subscription aynı şey değildir.

Teknik olarak:

```text
service/contact request
≠
marketing consent
```

olduğunu doğrula.

Marketing izni gerekiyorsa ayrı state olarak tutulmalı.

---

# 22. Newsletter

Newsletter varsa:

- consent source
- unsubscribe
- unsubscribe URL
- suppression
- duplicate subscription
- confirmation flow varsa
- consent evidence

teknik davranışını kontrol et.

---

# 23. Privacy Policy Linkage

Privacy policy'nin:

- footer'da bulunması
- ilgili form/context'ten ulaşılabilir olması
- doğru production URL
- broken link olmaması
- locale varsa doğru locale

kontrol edilmeli.

Metnin hukuki doğruluğu ayrıca hukuk uzmanı tarafından gözden geçirilmelidir.

---

# 24. Cookie Policy

Cookie policy ile gerçek browser cookie inventory arasında teknik tutarlılık kontrolü yap.

Örneğin policy'de olmayan third-party tracking bulunursa finding oluştur.

Policy metnini kendiliğinden hukuki olarak yeniden yazma; teknik farkı raporla.

---

# 25. KVKK Aydınlatma Akışları

Türkiye odaklı site ise ilgili kişisel veri toplama noktalarında aydınlatma mekanizmasının teknik olarak görünür/erişilebilir olup olmadığını değerlendir.

Hukuki yeterlilik konusunda kesin hüküm verme.

---

# 26. Privacy by Default

Yeni kullanıcı için varsayılan state'i incele.

Kullanıcı explicit seçim yapmadan optional tracking'in otomatik ON olmasını işaretle.

---

# 27. Third-Party Embeds

Özellikle:

- YouTube
- maps
- social widgets
- chat
- CAPTCHA
- external forms

sayfa açılır açılmaz third-party request oluşturuyor mu?

Gerekiyorsa consent sonrası lazy activation yaklaşımını değerlendir.

---

# 28. Content Security / Privacy Interaction

Third-party script azaltma ve CSP politikasının privacy hedefleriyle uyumunu değerlendir.

Privacy için yapılan değişiklik security header'larını zayıflatmamalı.

---

# 29. Server-Side Tracking

Client-side cookie'ler temiz olsa bile server-side analytics/marketing mevcut olabilir.

Backend'ı incele:

- server-side GA
- conversion APIs
- CRM sync
- webhook
- logging

Consent state server-side işlemlere aktarılması gerekiyorsa doğru propagation var mı kontrol et.

---

# 30. Log Privacy

Backend/CDN/reverse proxy logs:

- query params
- request body
- authorization
- cookies
- email/phone
- form payload

gibi PII içerebilir.

Redaction/minimization/retention politikasını teknik açıdan incele.

---

# 31. URL Privacy

Kişisel/hassas veriyi URL'de taşımamaya çalış.

Özellikle:

```text
?email=
?phone=
?token=
?name=
```

kontrol et.

URL'ler browser history, analytics ve referrer üzerinden sızabilir.

---

# 32. Referrer Policy

`Referrer-Policy` ayarını privacy ve site fonksiyonu açısından değerlendir.

Third-party destination'lara gereksiz path/query bilgisi gönderilmesini azalt.

---

# 33. Authentication Privacy

Auth varsa:

- session cookie
- remember-me
- social login
- profile data
- account deletion/deactivation
- logout

akışlarında kişisel veri ve tracking davranışını incele.

---

# 34. User Data Deletion / Export Hooks

Uygulamada kullanıcı hesabı varsa ve ürün politikasında bu fonksiyonlar bulunuyorsa teknik olarak:

- delete request
- account deletion
- export
- anonymization

akışlarının çalışıp çalışmadığını doğrula.

Hukuken zorunlu olup olmadığına kesin karar verme.

---

# 35. Data Retention

Kod/config seviyesinde retention ayarları varsa:

- analytics
- logs
- deleted accounts
- backups
- form submissions
- support records

incele.

“Forever” retention görüldüğünde gerekçe olmadan otomatik değiştirme; risk olarak raporla.

---

# 36. Sensitive Data

Uygulama özel nitelikli veya yüksek hassasiyetli veri işliyorsa bunu P0/P1 seviyesinde ele al ve ilgili akışlarda daha sıkı teknik kontrol uygula.

---

# 37. Children / Age-Related Logic

Site çocuklara yönelik değilse gereksiz yaş doğrulama ekleme.

Yaş/çocuk kullanıcı akışı mevcutsa bunu ayrıca işaretle ve hukuk/policy review gerektirdiğini belirt.

---

# 38. International Privacy Considerations

Site farklı ülkelere hizmet veriyorsa region-specific consent/policy davranışı varsa doğrula.

Hukuki kapsamı varsayma.

---

# 39. Accessibility of Consent UI

Consent UI için:

- keyboard
- screen reader
- focus
- contrast
- zoom
- mobile

testleri uygula.

Privacy seçimi erişilebilir olmayan bir modal içinde tutulmamalı.

---

# 40. Performance of Consent Integration

CMP / tags:

- render-blocking
- duplicate script
- layout shift
- excessive network

yaratıyor mu?

Privacy düzeltmeleri ciddi performance regression oluşturmamalı.

---

# 41. Automated Tests

Mümkünse Playwright ile:

```text
fresh context → optional tracking absent
accept → allowed tags present
reject → optional tags absent
change preferences → state updated
refresh → consent persists
```

testleri ekle.

---

# 42. P0 / P1 / P2 / P3

## P0
Örnek:
- kullanıcı reject etmesine rağmen açıkça hassas/marketing tracking devam ediyor
- form PII'si analytics/ad platformuna sızıyor
- production'da hassas veri public veya üçüncü taraf payload'ına gidiyor

## P1
Ciddi consent/preference ihlali veya geniş privacy gap.

## P2
Orta seviye configuration/documentation mismatch.

## P3
Düşük etkili privacy hygiene iyileştirmesi.

---

# 43. Remediation

Her teknik finding için:

```text
Finding
Root Cause
Data/Privacy Impact
Fix
Build
Network/Storage Re-test
Regression Test
```

döngüsünü uygula.

---

# 44. Completion Checklist

```text
[ ] Privacy architecture mapped
[ ] Personal data flows inventoried
[ ] Data minimization reviewed
[ ] Cookies inventoried
[ ] localStorage/sessionStorage/IndexedDB reviewed
[ ] Cookies categorized
[ ] Pre-consent network tested
[ ] Accept All tested
[ ] Reject All tested
[ ] Granular preferences tested
[ ] Consent withdrawal tested
[ ] Consent persistence tested
[ ] GTM/tag manager reviewed if applicable
[ ] Analytics consent behavior reviewed
[ ] Marketing pixels reviewed
[ ] Session replay reviewed
[ ] Error tracking PII reviewed
[ ] Forms/privacy notices reviewed
[ ] Marketing consent separation reviewed
[ ] Newsletter flows reviewed if applicable
[ ] Privacy policy links checked
[ ] Cookie policy vs actual cookies compared
[ ] KVKK notice touchpoints reviewed technically
[ ] Third-party embeds reviewed
[ ] Server-side tracking reviewed
[ ] Logging privacy reviewed
[ ] URL privacy reviewed
[ ] Referrer policy reviewed
[ ] Authentication privacy reviewed if applicable
[ ] Retention configuration reviewed where available
[ ] Consent UI accessibility checked
[ ] Consent integration performance checked
[ ] Automated regression tests added where applicable
[ ] Final network/storage re-test completed
```

---

# FINAL REPORT

## 1. Executive Summary

## 2. Scope

## 3. Data Flow Inventory

## 4. Cookie & Storage Inventory

| Item | Provider | Category | Before Consent | After Reject | Notes |
|---|---|---|---|---|---|

## 5. Third-Party Processing Inventory

## 6. Consent Behavior Results

## 7. Findings Summary

| ID | Finding | Priority | Status |
|---|---|---|---|

## 8. Detailed Findings

```text
ID:
Area:
Priority:
Status:
Technical Behavior:
Privacy Impact:
Evidence:
Root Cause:
Fix:
Verification:
Legal Review Required?: Yes/No
```

## 9. Changes Implemented

## 10. Legal / Policy Review Required

Teknik olarak doğrulanamayan veya hukuk uzmanı kararı gerektiren noktaları ayrı listele.

## 11. Remaining Risks

## 12. Evidence

Network logs, browser storage screenshots, automated tests ve changed files.

## 13. Final Technical Verdict

Yalnızca:

```text
PASS
PASS WITH WARNINGS
FAIL
```

ve release açısından:

```text
GO
NO-GO
```

ver.

Bu verdict yalnızca **teknik privacy/consent implementation** içindir; mutlak hukuki uygunluk sertifikası değildir.
