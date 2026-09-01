# GOAL: Enterprise Functional QA + E2E Audit, Remediation & Verification

Bu görevin amacı mevcut web sitesini gerçek kullanıcı davranışları üzerinden uçtan uca doğrulamak, kırık veya hatalı akışları tespit etmek, güvenli şekilde düzeltmek, otomatik regression testleri eklemek ve final sonuçları kanıtlamaktır.

Sadece “siteyi gezdim, çalışıyor” şeklinde rapor üretme.

Aşağıdaki döngüyü uygula:

```text
DISCOVER
↓
MAP USER FLOWS
↓
TEST
↓
IDENTIFY FAILURE
↓
FIND ROOT CAUSE
↓
FIX
↓
BUILD
↓
RE-TEST
↓
ADD REGRESSION COVERAGE
↓
VERIFY
```

## 0. Temel Kurallar

- Mevcut ürün davranışını anlamadan kod değiştirme.
- Var olan tasarım, SEO, accessibility, i18n, analytics ve performans davranışını bozma.
- Gerçek kullanıcı verisini silme veya değiştirme.
- Production üzerinde destructive test yapma.
- Test verisi gerekiyorsa kontrollü test verisi kullan.
- Test edilmeyen bir şeyi “PASS” olarak işaretleme.
- Bir kontrol teknik olarak uygulanamıyorsa `NOT VERIFIED — reason` yaz.
- Uygulamaya uygun olmayan maddeleri `N/A — reason` olarak işaretle.
- Sadece bulguları listeleme; güvenli şekilde düzeltilebilen P0/P1/P2 sorunları düzelt ve yeniden doğrula.

---

# 1. Proje ve Uygulama Haritası

Kod değiştirmeden önce belirle:

- Framework ve runtime
- Routing sistemi
- SSR / SSG / CSR yapısı
- Backend / API
- Authentication
- Authorization / role sistemi
- Database
- Storage
- CMS
- i18n
- Forms
- Search
- Payment varsa ödeme akışları
- Third-party integrations
- Analytics
- Error tracking
- Feature flags
- Admin panel
- Kullanıcı rolleri

Tüm public ve protected route'ları envanterle.

Her route için mümkünse:

```text
Route
Page purpose
Auth requirement
Role requirement
Criticality
Primary CTA
Forms
API dependencies
Expected success state
Expected error state
```

---

# 2. Kritik Kullanıcı Akışlarını Çıkar

Uygulamanın gerçek yapısına göre kritik user journey'leri belirle.

Örnekler:

- Homepage → service/product → CTA → contact
- Navigation → target page
- Contact form → validation → submit → success
- Language switch → route preservation
- Login → authenticated area
- Logout
- Register
- Password reset
- Search → result → detail
- Filter/sort → result state
- Upload/download
- Checkout/payment
- Account/profile update
- Admin workflow
- Newsletter
- Booking/demo request

Her kritik flow için:

```text
Precondition
Steps
Expected result
Failure conditions
Required test data
```

oluştur.

---

# 3. Route Coverage

Tüm önemli route'ları test et.

Kontrol et:

- Sayfa gerçekten render oluyor mu?
- Beklenen HTTP status dönüyor mu?
- Runtime exception var mı?
- Console error var mı?
- Failed network request var mı?
- İçerik eksik mi?
- Route yanlış sayfaya mı gidiyor?
- Dynamic params doğru işleniyor mu?
- Invalid param doğru hata durumuna gidiyor mu?
- Refresh sonrası aynı route çalışıyor mu?
- Deep-link doğrudan açılıyor mu?

Özellikle SPA projelerinde doğrudan URL erişimini test et.

---

# 4. Navigation Audit

Kontrol et:

- Logo/home navigation
- Header links
- Footer links
- Dropdown
- Mega menu
- Mobile menu
- Breadcrumb
- Tabs
- Pagination
- Back/forward browser navigation
- In-page anchor
- External links
- Download links

Tespit et:

- 404
- yanlış route
- boş `href`
- `#` placeholder
- broken external link
- yeni sekme gereksinimi
- nested interactive element
- history/state problemi

---

# 5. CTA Audit

Tüm önemli CTA'ları envanterle.

Örnek:

```text
Get Started
Contact
Request Demo
Buy
Download
Learn More
Apply
Subscribe
Sign In
Create Account
```

Her CTA için:

- görünür mü?
- tıklanabilir mi?
- doğru route/action?
- disabled state doğru mu?
- loading state var mı?
- double click duplicate action oluşturuyor mu?
- başarısızlık halinde anlamlı feedback var mı?

---

# 6. Form Audit

Her formu ayrı test et.

Kontrol:

- required fields
- optional fields
- min/max length
- email
- phone
- number
- date
- select
- checkbox
- radio
- textarea
- file upload
- client validation
- server validation
- sanitization
- loading
- success
- failure
- retry
- duplicate submit
- keyboard submission
- browser autofill

Test senaryoları:

```text
Empty
Valid
Invalid
Boundary
Very long input
Unicode
Whitespace
Duplicate submission
Slow network
API error
Timeout
```

Client validation geçilse bile backend'in invalid veriyi kabul etmediğini doğrula.

---

# 7. API Functional Audit

Frontend'in kullandığı önemli API endpoint'lerini incele.

Her endpoint için:

- expected method
- expected request
- expected response
- auth requirement
- error response
- empty response
- timeout behavior
- invalid payload
- duplicate request
- retries
- loading state

UI'ın API başarısız olduğunda tamamen çökmediğini doğrula.

---

# 8. Authentication Flows

Varsa test et:

- Login
- Invalid login
- Logout
- Session expiry
- Remember me
- Register
- Email verification
- Password reset
- Expired reset link
- Already-used reset link
- OAuth callback
- Protected route
- Return URL

Logout sonrası protected route'a erişilememeli.

Session expiry kullanıcıyı belirsiz state'te bırakmamalı.

---

# 9. Authorization Functional QA

Her role için beklenen görünüm ve aksiyonları test et.

Örnek:

```text
Guest
User
Editor
Manager
Admin
```

Kontrol:

- doğru menü
- doğru route
- doğru action
- forbidden state
- unauthorized UI
- backend response

Frontend'de butonun görünmemesi yeterli değildir; protected action'ın backend tarafından da reddedildiğini doğrula.

---

# 10. State Management

Kontrol et:

- refresh
- back/forward
- multi-tab
- query params
- URL state
- filters
- search
- cart/state
- auth state
- locale state
- theme state

Kullanıcının state'i beklenmedik biçimde kayboluyor veya bozuluyor mu?

---

# 11. Loading / Empty / Error States

Her önemli async bileşen için üç state'i doğrula:

```text
Loading
Empty
Error
```

Şunlar olmamalı:

- sonsuz spinner
- blank screen
- stale content
- broken skeleton
- teknik stack trace
- kullanıcıya anlamsız raw API error

---

# 12. Error Pages

Test et:

- 404
- 403
- 429
- 500
- 502
- 503
- network offline
- API timeout

404 gerçekten 404 dönmeli.

Error page kullanıcıya:

- ne olduğunu
- ne yapabileceğini
- güvenli navigation seçeneğini

sunmalı.

---

# 13. Search Audit

Search varsa:

- exact match
- partial match
- no result
- typo
- special characters
- Turkish characters
- case-insensitive behavior
- pagination
- filter
- sort
- URL state
- refresh

kontrol et.

---

# 14. Filter / Sort / Pagination

Kontrol:

- filter combination
- clear filters
- zero result
- pagination boundaries
- previous/next
- direct page URL
- sort persistence
- URL query synchronization

---

# 15. Upload / Download

Varsa test et:

- valid file
- invalid type
- oversized file
- empty file
- duplicate
- interrupted upload
- failed upload
- successful download
- missing file
- expired URL

---

# 16. Email / Notification Triggerleri

Bir form veya aksiyon email/notification gönderiyorsa UI success state ile gerçek backend sonucu tutarlı olmalı.

Kontrol:

- trigger gerçekleşiyor mu?
- doğru recipient?
- duplicate notification?
- failure UI'a doğru yansıyor mu?

Gerçek üretim email adreslerine spam test gönderme; mümkünse staging/test recipient kullan.

---

# 17. Third-Party Integration QA

Varsa:

- maps
- payment
- captcha
- CRM
- analytics
- chat
- scheduling
- external APIs

için success + failure davranışını test et.

Third-party servis kapalı olduğunda uygulama kontrollü degrade olmalı.

---

# 18. Browser Console ve Network

Test sırasında:

```text
console.error
uncaught exception
unhandled rejection
failed request
CORS error
hydration error
mixed content
```

bulgularını kaydet.

Console warning'leri de incele; fakat hepsini otomatik bug kabul etme.

---

# 19. Mobile Functional QA

Mobil görünümde sadece layout değil işlevleri de test et:

- mobile menu
- forms
- keyboard
- sticky CTA
- modal
- dropdown
- touch interactions
- orientation changes
- back navigation

---

# 20. Slow Network / Offline

Kritik user flow'larda kontrollü network throttling uygula.

Test et:

- slow API
- slow image
- timeout
- offline
- reconnect

Amaç uygulamanın belirsiz veya bozuk state'e düşmediğini doğrulamaktır.

---

# 21. Double Action / Idempotency

Önemli state-changing aksiyonlarda:

- çift tıklama
- hızlı tekrar
- refresh
- back/forward
- retry

sonucunda duplicate işlem oluşuyor mu kontrol et.

Özellikle:

- form submit
- payment
- booking
- account creation
- invitation
- purchase
- destructive action

---

# 22. Data Integrity

Test akışları sırasında:

- yanlış record güncelleniyor mu?
- stale UI oluşuyor mu?
- save sonrası doğru veri gösteriliyor mu?
- optimistic update failure durumunda rollback doğru mu?
- timezone/date conversion doğru mu?

---

# 23. Date / Time / Locale Edge Cases

Varsa test et:

- timezone
- locale formatting
- daylight saving
- date boundaries
- midnight
- month/year boundary
- leap day
- 12/24h formatting

---

# 24. Playwright E2E Suite

Projede mevcut E2E altyapısı varsa onu kullan.

Yoksa projeye uygunsa Playwright ile minimal fakat güçlü bir E2E suite kur.

En az:

```text
smoke
critical navigation
critical forms
critical user journeys
auth flows if applicable
error paths
```

testlerini otomatikleştir.

Testler:

- deterministic
- isolated
- repeatable
- production-like environment compatible

olmalı.

Flaky test üretme.

---

# 25. Test Selector Kalitesi

UI testlerinde mümkün olduğunda:

```text
role
label
accessible name
data-testid (gerektiğinde)
```

kullan.

CSS class veya DOM sırasına gereksiz bağımlı testler yazma.

---

# 26. Regression Test Policy

Bulduğun önemli her bug için mümkünse aynı bug'ın tekrar oluşmasını engelleyen test ekle.

Örnek:

```text
BUG: Contact form duplicate submit
FIX: submit lock
REGRESSION TEST: rapid double click → one request
```

---

# 27. Test Data ve Cleanup

E2E testleri gerçek production verisini kirletmemeli.

- test account
- test namespace
- generated deterministic identifiers
- cleanup

stratejisi kullan.

---

# 28. P0 / P1 / P2 / P3

Bulguları sınıflandır.

## P0
Release blocker.

Örnek:

- ana sayfa açılmıyor
- kritik form çalışmıyor
- checkout/login çökmüş
- data corruption
- tüm navigation bozuk

## P1
Ciddi kullanıcı akışı problemi.

## P2
Orta seviye işlevsel hata.

## P3
Kozmetik veya düşük etkili fonksiyon problemi.

---

# 29. Remediation

Her hata için:

```text
Finding
Root Cause
Fix
Build
Re-test
Regression test
```

uygula.

Sadece semptomu gizleme.

---

# 30. Final Smoke Test

Final build üzerinde en az:

```text
Homepage
Header
Footer
Navigation
Primary CTA
Critical form
404
Language switch
Auth if applicable
Critical API flow
```

yeniden test edilmeli.

---

# 31. Kanıt Zorunluluğu

“Her şey çalışıyor” kabul edilmez.

Mümkün olduğunda sun:

- Playwright test result
- screenshots
- videos/traces
- network evidence
- console evidence
- test report
- changed files
- before/after bug reproduction

---

# 32. Completion Checklist

```text
[ ] Application architecture mapped
[ ] Public routes inventoried
[ ] Protected routes inventoried
[ ] Critical user journeys defined
[ ] Navigation tested
[ ] CTAs tested
[ ] Forms tested
[ ] API states tested
[ ] Loading states tested
[ ] Empty states tested
[ ] Error states tested
[ ] 404/403/429/5xx tested where applicable
[ ] Auth flows tested
[ ] Authorization behavior tested
[ ] Search tested if applicable
[ ] Filters/sort/pagination tested if applicable
[ ] Upload/download tested if applicable
[ ] Third-party integrations checked
[ ] Browser console reviewed
[ ] Network errors reviewed
[ ] Mobile flows tested
[ ] Slow network behavior tested
[ ] Double-submit/idempotency checked
[ ] Critical bugs fixed
[ ] Regression tests added
[ ] Production build passed
[ ] Final smoke test passed
```

---

# FINAL REPORT

## 1. Executive Summary

## 2. Scope

## 3. Route Inventory

## 4. Critical User Journeys

## 5. Findings Summary

| ID | Finding | Priority | Status |
|---|---|---|---|

## 6. Detailed Findings

```text
ID:
Route/Flow:
Priority:
Status:
Description:
Steps to Reproduce:
Expected:
Actual:
Root Cause:
Fix:
Verification:
Regression Coverage:
```

## 7. Automated Test Coverage

## 8. Changes Implemented

## 9. Remaining Risks

## 10. Evidence

## 11. Final Verdict

Yalnızca:

```text
PASS
PASS WITH WARNINGS
FAIL
```

ve release kararı:

```text
GO
NO-GO
```

ver.

Test etmediğin hiçbir alanı PASS olarak işaretleme.
