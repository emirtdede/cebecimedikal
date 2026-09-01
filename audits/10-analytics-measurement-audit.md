# GOAL: Enterprise Analytics + Measurement + Conversion Tracking Audit

Bu görevin amacı web sitesindeki analytics, measurement ve conversion tracking altyapısının doğru, güvenilir, privacy-aware ve karar vermeye uygun veri ürettiğini doğrulamaktır.

Sadece GA script'inin sayfada bulunmasına bakıp “analytics çalışıyor” deme.

Amaç:

```text
USER ACTION
↓
WELL-DEFINED EVENT
↓
CORRECT PAYLOAD
↓
SINGLE DELIVERY
↓
CONSENT-AWARE PROCESSING
↓
VALID DESTINATION
↓
TRUSTWORTHY REPORTING
```

zincirini doğrulamaktır.

---

# 0. Temel Kurallar

- Gerçek kullanıcı PII'sini analytics payload'ına ekleme.
- Production verisini test event'leriyle gereksiz kirletme.
- Mümkünse debug/test property veya controlled identifiers kullan.
- Aynı event'i tekrar tekrar tetikleyerek production ölçümlerini bozma.
- Erişimin olmayan GA4/GTM/CRM dashboard sonuçlarını uydurma.
- `NOT VERIFIED — access unavailable` kullan.
- Event isimlerini rastgele değiştirmeden önce mevcut reporting/dashboard bağımlılıklarını incele.

---

# 1. Measurement Architecture

Belirle:

```text
GA4
Google Tag Manager
Server-side GTM
Google Ads
Meta
LinkedIn
TikTok
CRM
Product analytics
Session replay
Internal analytics
Data warehouse
Consent platform
```

Her entegrasyon için:

```text
Provider
Container/Property ID
Client/Server
Purpose
Consent category
Primary events
Destination
```

envanter oluştur.

---

# 2. Production IDs

Kontrol:

- production GA measurement ID
- production GTM container
- ad conversion IDs
- analytics project IDs
- staging/test ID kalıntısı
- duplicate container

Production'ın staging property'ye veri göndermediğini doğrula.

---

# 3. Tag Duplication

Aynı analytics library birden fazla yoldan yükleniyor mu?

Örnek:

```text
hard-coded gtag
+
GTM
+
framework analytics plugin
```

Duplicate pageview/event riskini kontrol et.

---

# 4. Event Taxonomy

Mevcut event'leri çıkar.

Örnek:

```text
page_view
cta_click
contact_form_start
contact_form_submit
phone_click
email_click
download
search
language_change
signup
login
purchase
generate_lead
```

Her event için tanımla:

```text
Event name
Business purpose
Trigger
Required parameters
Optional parameters
Consent requirement
Conversion?
Destination
```

---

# 5. Naming Convention

Event isimleri tutarlı olmalı.

Kaçın:

```text
ContactClick
contact-click
contact click
clickContact
```

aynı kavram için farklı isimlerden.

Mevcut reporting'i bozacak rename'leri migration planı olmadan uygulama.

---

# 6. Page View Tracking

MPA/SPA farkını dikkate al.

Test et:

- initial page load
- client-side route change
- browser back/forward
- redirect
- locale switch

Her gerçek page view beklenen sayıda gönderilmeli.

SPA'da route change kaybolmamalı; duplicate pageview da oluşmamalı.

---

# 7. Page Metadata

Page view payload'ında doğru:

- page_location
- page_path
- page_title
- locale
- hostname

gibi alanların gerektiği gibi oluştuğunu doğrula.

PII içeren query parametrelerini göndermemeye dikkat et.

---

# 8. CTA Tracking

Önemli CTA'ları envanterle.

Her CTA için:

- click event
- CTA name
- location/section
- target
- page context

gibi anlamlı parametreleri değerlendir.

Her sıradan linki event'e dönüştürüp gereksiz veri gürültüsü yaratma.

---

# 9. Form Funnel

Kritik formlarda gerektiğinde:

```text
form_view
form_start
form_error
form_submit
form_success
```

funnel'ını değerlendir.

`submit button click` ile gerçek başarılı lead'i aynı event kabul etme.

Conversion tercihen **backend/gerçek success state** ile uyumlu olmalı.

---

# 10. Contact Form Conversion

Kontrol:

- validation başarısızken conversion gitmiyor
- API başarısızken conversion gitmiyor
- API success olduğunda tek event gidiyor
- double click duplicate conversion oluşturmuyor

---

# 11. Phone / Email Click

Kurumsal site için gerekiyorsa:

- `tel:`
- `mailto:`

click'lerini ölç.

Ancak email adresini event parameter olarak PII biçiminde göndermemeye dikkat et.

---

# 12. Download Tracking

PDF/catalog/software/download linkleri varsa:

- file name/type
- page context
- success/intent

measurement stratejisini değerlendir.

---

# 13. Search Tracking

Site içi arama varsa:

- search term
- result count
- no-result

ölçümü değerlendir.

Search term kullanıcı tarafından kişisel/hassas veri içerebilir; raw term gönderiminin privacy riskini incele.

---

# 14. Ecommerce

Ecommerce varsa standard event semantics'i doğrula.

Örnek:

```text
view_item
add_to_cart
begin_checkout
purchase
refund
```

Kontrol:
- transaction ID
- currency
- value
- items
- duplicate purchase
- refresh sonrası duplicate conversion

Purchase event özellikle idempotent olmalı.

---

# 15. Authentication Events

Ürün analitiği gerekiyorsa:

- signup
- login
- onboarding

event'lerini değerlendir.

Password/email gibi hassas alanları payload'a koyma.

---

# 16. Locale / Language Tracking

Çok-dilli sitede:

- locale
- language_change

ölçümü gerekiyorsa tutarlı yap.

Locale parameter cardinality kontrollü olmalı.

---

# 17. Custom Dimensions / Parameters

Her custom parameter için:

- gerçek iş ihtiyacı
- naming
- type
- cardinality
- privacy

kontrol et.

High-cardinality gereksiz değerler reporting kalitesini düşürebilir.

---

# 18. PII Audit

Analytics/tag payload'larında ara:

```text
email
phone
full name
address
password
tokens
form free-text
user message
```

URL, page title, custom dimension ve event parameter'larını da kontrol et.

PII tespit edilirse P0/P1 olarak değerlendir.

---

# 19. Consent Integration

Analytics event'leri privacy/consent policy ile uyumlu mu?

Test:

```text
fresh visitor
accept analytics
reject analytics
change preference
refresh
```

Consent Audit dokümanı ile tutarlı sonuç üret.

---

# 20. GTM Data Layer

GTM varsa `dataLayer` yapısını incele.

Kontrol:

- deterministic schema
- event names
- stale values
- duplicate push
- PII
- race conditions
- route navigation

Bir event önceki event'in değerlerini yanlışlıkla miras almamalı.

---

# 21. Trigger Logic

GTM trigger'larını incele:

- all pages
- DOM ready
- window loaded
- custom event
- click
- history change
- consent initialization

Yanlış trigger nedeniyle duplicate veya eksik measurement var mı?

---

# 22. Tag Sequencing

Bağımlı tag'lerde initialization sırası doğru mu?

Consent/default state belirlenmeden tracking tag'i ateşlenmemeli.

---

# 23. Debug Mode Verification

GTM Preview / GA DebugView veya eşdeğer araç varsa kontrollü test gerçekleştir.

Access yoksa browser Network üzerinden request'leri doğrula.

---

# 24. Network Verification

Analytics request'lerini gerçek network seviyesinde incele.

Doğrula:

- destination
- event name
- parameters
- consent state
- request count

Sadece frontend `console.log("event sent")` kanıt değildir.

---

# 25. Duplicate Event Detection

Kritik event'lerde hızlı şekilde:

- bir interaction → kaç request?
- route transition → kaç pageview?
- form success → kaç conversion?

kontrol et.

Duplicate tracking analytics sistemlerinin en yaygın veri kalitesi sorunlarından biridir.

---

# 26. Missing Event Detection

Business-critical user journeys için measurement coverage map oluştur.

Her kritik journey:

```text
Entry
↓
Engagement
↓
Intent
↓
Conversion
```

aşamalarında gerekli visibility var mı?

---

# 27. Event Ordering

Funnel event'lerinin mantıksal sırasını kontrol et.

Örnek:

```text
form_success
```

event'i `form_start` olmadan sürekli oluşuyorsa instrumentation sorunu olabilir.

---

# 28. Conversion Definition

Her conversion için:

- gerçek business outcome mu?
- yalnızca button click mi?
- repeatable mı?
- duplicate olabilir mi?
- backend success ile eşleşiyor mu?

sorularını cevapla.

---

# 29. Conversion Configuration

GA4/Ads vb. erişimi varsa conversion/key event configuration'ını doğrula.

Access yoksa frontend event'in gönderildiğini doğrula fakat dashboard conversion setup'ını `NOT VERIFIED` olarak yaz.

---

# 30. Attribution Parameters

UTM parametrelerini test et.

Kontrol:

- route change sırasında kayboluyor mu?
- form conversion context'e taşınıyor mu?
- internal links UTM ile attribution'ı bozuyor mu?

Internal navigation için gereksiz UTM kullanma.

---

# 31. Referrer Handling

External/internal referrer davranışını değerlendir.

Payment/auth provider dönüşleri self-referral oluşturuyor mu?

---

# 32. Cross-Domain Tracking

Gerçekten birden fazla domain arasında journey varsa cross-domain measurement gereksinimini değerlendir.

Her domain'i otomatik linker listesine ekleme.

---

# 33. Subdomain Tracking

Subdomain'ler varsa session/user attribution bölünüyor mu kontrol et.

Privacy/cookie domain etkisini de düşün.

---

# 34. Internal Traffic

Company/team trafiğinin production analytics'i ciddi biçimde kirletmesini engellemek için mevcut internal traffic strategy'yi incele.

IP hardcode gibi kırılgan yaklaşımları bağlama göre değerlendir.

---

# 35. Bot Traffic

Bot/crawler trafiğinin raporlara etkisini incele.

Analytics data'sını “gerçek kullanıcı” kabul etmeden önce filtreleme/platform davranışını değerlendir.

---

# 36. Error Analytics

Gerekliyse:

- form errors
- API failures
- JS errors

ürün analitiği perspektifinden ölçülebilir mi değerlendir.

Error tracking sistemiyle analytics'i gereksiz duplicate etme.

---

# 37. Performance Impact

Analytics/tag manager:

- main-thread
- network
- render blocking
- third-party JS

maliyeti yaratıyor mu?

Measurement kapsamını koruyarak gereksiz tag'leri kaldır/optimize et.

---

# 38. Analytics Script Loading

`async`, `defer`, consent sonrası initialization gibi yaklaşımları mevcut provider guidance ile değerlendir.

---

# 39. Data Quality

Tespit et:

- `(not set)`
- undefined
- null
- wrong types
- inconsistent currency
- inconsistent locale
- random event names
- duplicate transaction IDs

---

# 40. Environment Metadata

Event'lerde production/staging ayrımı gerekiyorsa doğru property/container veya environment dimension kullanıldığını doğrula.

---

# 41. Release / Version Correlation

Gerekiyorsa analytics/error monitoring'e release version veya experiment version ilişkilendirme stratejisini değerlendir.

---

# 42. Experiment / A-B Testing

Experiment varsa:

- assignment
- exposure event
- variant name
- duplicate exposure
- consent

doğruluğunu kontrol et.

---

# 43. CRM / Lead Integration

Lead event CRM'e gidiyorsa:

- frontend success
- backend lead creation
- analytics conversion

üçünün tutarlılığını mümkün olduğunca doğrula.

---

# 44. Server-Side Events

Server-side conversion/event varsa:

- duplicate client + server event
- deduplication ID
- consent propagation
- timestamp
- transaction/lead ID

kontrol et.

---

# 45. Offline Conversion Hooks

Varsa upload/import süreçlerinin doğru identifiers kullandığını değerlendir.

Gerçek müşteri verisini test için kullanma.

---

# 46. Dashboard / Reporting Validation

Dashboard erişimi varsa birkaç kontrollü test event'in beklenen rapora ulaştığını doğrula.

Realtime/debug görünmesi ile standard reporting gecikmesini birbirine karıştırma.

---

# 47. Measurement Plan

Audit sonunda canonical measurement specification üret:

| Event | Trigger | Parameters | Conversion | Consent | Owner |
|---|---|---|---|---|---|

Bu tablo gelecekte instrumentation drift'i azaltmalıdır.

---

# 48. Automated Analytics Tests

Mümkünse E2E testlerde event interception yap.

Örnek:

```text
CTA click → one expected event
failed form → no conversion
successful form → one conversion
locale switch → expected event
```

Third-party endpoint'e gerçek data göndermek yerine mümkünse request interception/test mode kullan.

---

# 49. P0 / P1 / P2 / P3

## P0
Örnek:
- PII analytics/ad platformuna gönderiliyor
- purchase/lead conversion ciddi biçimde duplicate
- analytics tamamen yanlış production property'ye gidiyor

## P1
Ciddi measurement/data quality veya consent entegrasyon problemi.

## P2
Eksik event, naming, attribution veya reporting sorunu.

## P3
Düşük etkili telemetry hygiene.

---

# 50. Completion Checklist

```text
[ ] Measurement architecture mapped
[ ] Production IDs verified
[ ] Duplicate analytics libraries checked
[ ] Event taxonomy inventoried
[ ] Naming consistency checked
[ ] Initial page_view tested
[ ] SPA route page_view tested if applicable
[ ] CTA tracking tested
[ ] Form funnel tested
[ ] Conversion success semantics tested
[ ] Phone/email tracking checked if applicable
[ ] Download tracking checked if applicable
[ ] Search tracking reviewed if applicable
[ ] Ecommerce events reviewed if applicable
[ ] Auth events reviewed if applicable
[ ] Locale measurement reviewed
[ ] Custom dimensions reviewed
[ ] PII leakage tested
[ ] Consent behavior tested
[ ] dataLayer reviewed if applicable
[ ] GTM triggers reviewed if applicable
[ ] Tag sequencing reviewed
[ ] Network requests validated
[ ] Duplicate event test completed
[ ] Missing event coverage reviewed
[ ] Conversion definitions reviewed
[ ] UTM/attribution behavior reviewed
[ ] Cross-domain/subdomain reviewed if applicable
[ ] Internal traffic strategy reviewed
[ ] Performance impact reviewed
[ ] Server-side events reviewed if applicable
[ ] CRM integration reviewed if applicable
[ ] Reporting/debug verification performed where access exists
[ ] Measurement plan generated
[ ] Automated regression coverage added where possible
```

---

# FINAL REPORT

## 1. Executive Summary

## 2. Measurement Architecture

## 3. Event Inventory

## 4. Conversion Inventory

## 5. Findings Summary

| ID | Finding | Priority | Status |
|---|---|---|---|

## 6. Detailed Findings

```text
ID:
Event/Integration:
Priority:
Status:
Expected:
Observed:
Business Impact:
Root Cause:
Fix:
Verification:
```

## 7. PII / Privacy Results

## 8. Consent Integration Results

## 9. Duplicate / Missing Event Results

## 10. Attribution Results

## 11. Changes Implemented

## 12. Measurement Plan

## 13. Dashboard Checks

## 14. Remaining Risks

## 15. Evidence

## 16. Final Verdict

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

“Event kodu var” ile “measurement doğru çalışıyor” ifadelerini birbirine karıştırma.
