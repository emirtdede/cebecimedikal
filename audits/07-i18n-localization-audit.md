# GOAL: Enterprise i18n / Localization Completeness Audit, Remediation & Verification

Bu görevin amacı web sitesindeki tüm locale'lerin gerçek anlamda eksiksiz, tutarlı ve production-ready olduğunu doğrulamak; hard-coded metinleri, missing translation'ları, locale routing/meta problemlerini ve görsel taşmaları tespit edip düzeltmek; route × locale matrisi üzerinden kanıtlamaktır.

Sadece translation dosyalarındaki key sayısını karşılaştırıp “%100 çevrildi” deme.

## 0. Temel Kurallar

- Gerçek kullanıcıya görünen hiçbir metni gözden kaçırma.
- Seçili locale dışında başka dilden görünür metin kalmamalı; marka, özel isim, teknik terim gibi bilinçli istisnaları ayrıca belirt.
- Kod içindeki hard-coded UI metinlerini tespit et.
- Çeviri key'lerini uydurma veya yanlış anlam üretme.
- Mevcut i18n mimarisini gereksiz yere yeniden yazma.
- SEO metadata ve accessibility text de localization kapsamındadır.
- Test etmediğin locale/route için PASS verme.

---

# 1. i18n Mimarisini Anla

Belirle:

- i18n library/framework
- locale detection
- default locale
- fallback locale
- routing strategy
- translation file format
- namespaces
- server/client translation loading
- metadata localization
- date/number/currency formatting
- pluralization
- RTL support
- locale persistence

---

# 2. Locale Envanteri

Tüm desteklenen locale'leri çıkar.

Her locale için:

```text
Locale code
Language
Region if applicable
Direction LTR/RTL
Translation source
Enabled routes
Fallback
```

Invalid veya inconsistent locale code'larını tespit et.

---

# 3. Route × Locale Matrix

Tüm public route'ları tüm locale'lerle çaprazla.

Örnek:

| Route | tr | en | de | fr |
|---|---|---|---|---|
| / | PASS | PASS | ... | ... |
| /about | ... | ... | ... | ... |

Bu matrix audit'in ana kanıtıdır.

---

# 4. Translation Key Completeness

Her namespace/file için:

- missing key
- extra/unused key
- duplicate key
- malformed key
- empty translation
- same-as-source şüpheli değer
- placeholder mismatch

tespit et.

Ama sadece key parity yeterli değildir.

---

# 5. Runtime Missing Translation

Uygulamayı her locale'de çalıştır ve runtime'da şunları ara:

```text
translation key shown to user
undefined
null
missing translation
fallback language
```

Console'daki i18n warning'leri de incele.

---

# 6. Hard-Coded UI Text

Kaynak kodu tara.

Özellikle:

- JSX/TSX/HTML
- buttons
- headings
- labels
- placeholders
- tooltips
- aria-label
- alt
- toast
- modal
- validation
- error pages
- loading states
- empty states
- tables
- filters
- search

Hard-coded user-facing text varsa i18n sistemine taşı.

Marka/ürün adlarını gereksiz yere çevirmeye çalışma.

---

# 7. Navigation

Her locale'de:

- header
- footer
- mobile menu
- dropdown
- breadcrumbs

tam çevrilmiş mi?

URL ve active state doğru mu?

---

# 8. Forms

Her locale'de:

- labels
- placeholders
- help text
- required text
- validation messages
- success messages
- error messages

kontrol et.

Backend'den gelen raw İngilizce error kullanıcıya sızmamalı.

---

# 9. Dynamic Content

API/CMS içeriği locale-aware ise kontrol et:

- doğru locale field
- fallback
- missing content
- mixed language
- stale translation

CMS içeriğinin i18n dosyasından bağımsız olduğunu unutma.

---

# 10. Metadata Localization

Her locale/route için:

- title
- meta description
- Open Graph title
- Open Graph description
- image alt
- social metadata
- structured data text fields

doğru dilde mi?

---

# 11. HTML Lang

Her locale'de:

```html
<html lang="...">
```

doğru olmalı.

Gerekirse `dir="rtl"` doğru uygulanmalı.

---

# 12. Hreflang / Canonical

Locale URL yapısı SEO ile tutarlı olmalı.

Kontrol:

- self canonical
- localized canonical
- reciprocal hreflang
- x-default gerekiyorsa
- invalid locale URL
- redirect/404 hreflang

---

# 13. Locale Switching

Dil değiştirici için:

- mevcut sayfanın locale karşılığına gidiyor mu?
- query params korunuyor mu?
- hash korunuyor mu?
- auth/state bozuluyor mu?
- unsupported route fallback mantıklı mı?
- refresh sonrası locale korunuyor mu?

---

# 14. Formatting

Locale-aware formatları kontrol et:

```text
Date
Time
Number
Decimal
Thousands separator
Currency
Percentage
Relative time
Units
```

Hard-coded format kullanma.

Örnek:

```text
1,234.56
1.234,56
₺1.000
1.000 ₺
```

locale kurallarına göre değişebilir.

---

# 15. Pluralization

Plural kurallarını kontrol et.

Sadece:

```text
count === 1 ? singular : plural
```

yaklaşımı tüm diller için doğru değildir.

i18n library'nin ICU/plural mekanizmasını kullan.

---

# 16. Interpolation / Placeholders

Translation placeholder'larında:

- placeholder adı
- sayısı
- escaping
- grammar
- ordering

kontrol et.

Bir locale'de eksik placeholder runtime bug oluşturmamalı.

---

# 17. Rich Text Translations

HTML/React node içeren çevirilerde:

- güvenlik
- grammar
- element ordering
- link semantics

kontrol et.

String concatenation ile dilbilgisi bozan yapıları azalt.

---

# 18. RTL

RTL locale varsa özel test et:

- layout direction
- icons
- arrows
- breadcrumbs
- carousels
- forms
- text alignment
- margins/padding
- logical CSS properties

Sadece `text-align:right` yeterli değildir.

---

# 19. Typography / Font Coverage

Her dilin gerekli glyph'lerini font destekliyor mu?

Kontrol:

- Türkçe
- Latin Extended
- Cyrillic
- Arabic
- CJK
- diacritics

Eksik glyph fallback'i layout'u bozuyor mu?

---

# 20. Long Text Stress

Uzun metin üreten dillerle test yap.

Özellikle:

- buttons
- nav
- tabs
- cards
- modal
- table headers
- forms

Tespit:

- overflow
- truncation
- overlap
- unintended wrapping

---

# 21. Short Text / CJK Stress

Çok kısa veya word-break davranışı farklı dillerde layout sorunlarını kontrol et.

---

# 22. Search / Sorting Localization

Search varsa:

- accent/diacritic
- Turkish İ/i/I/ı
- case rules
- collation
- alphabetical sort

kontrol et.

---

# 23. Slugs / URLs

Localized slug varsa:

- encoding
- canonical
- redirect
- old slug migration
- duplicate slug

kontrol et.

Slug'ları otomatik değiştirerek mevcut SEO URL'lerini bozma.

---

# 24. 404 / Error Pages

Her locale'de:

- 404
- 403
- 500
- offline
- maintenance

mesajları doğru dilde mi?

---

# 25. Cookie / Privacy UI

Cookie banner, privacy controls ve consent text'leri locale kapsamına dahil et.

---

# 26. Accessibility Text

Şunları da çeviri kapsamına al:

- aria-label
- aria-description
- screen-reader-only text
- image alt
- form labels
- status messages

---

# 27. Screenshot Verification

Her locale için kritik sayfalardan screenshot al.

Ajan screenshot'ı görsel olarak incelemeli.

Seçili locale dışında şüpheli metin görürse:

```text
DETECT
↓
TRACE SOURCE
↓
FIX
↓
REBUILD
↓
RE-SCREENSHOT
```

döngüsünü uygula.

---

# 28. Automated Locale Crawl

Mümkünse Playwright ile:

```text
for each locale
  for each critical route
    open
    assert no runtime error
    assert expected lang
    capture screenshot
```

şeklinde otomasyon oluştur.

---

# 29. Wrong-Language Detection

Bir locale'de başka dilden kelime bulunması otomatik olarak hata değildir.

İstisnalar:

- brand
- product
- proper noun
- technical term

olabilir.

Bu nedenle heuristics + visual/manual verification kullan.

---

# 30. Translation Quality

Makine çevirisi varsa:

- anlamsız
- bağlam dışı
- terminoloji hatası
- UI bağlamına uymayan fiil
- bozuk grammar

örneklerini işaretle.

Dil uzmanı erişimi yoksa “native-quality verified” iddiasında bulunma.

---

# 31. Terminology Consistency

Ürün ve şirket terminolojisi için glossary oluştur veya mevcut glossary'yi kullan.

Aynı kavram farklı sayfalarda rastgele farklı çevrilmemeli.

---

# 32. Fallback Policy

Missing translation olduğunda davranış bilinçli olmalı.

Kontrol:

- fallback language sızıntısı
- blank text
- raw key
- runtime crash

Production'da raw key gösterilmemeli.

---

# 33. Build-Time Validation

Mümkünse CI'a:

- missing keys
- placeholder mismatch
- invalid JSON/YAML
- duplicate key
- locale schema

kontrolleri ekle.

---

# 34. P0/P1/P2/P3

## P0
Ana locale/route kullanılamıyor veya ciddi mixed-language.

## P1
Önemli UI/SEO metadata eksik/yanlış dil.

## P2
Orta seviye metin/layout/terminoloji sorunu.

## P3
Kozmetik veya düşük etkili localization farkı.

---

# 35. Completion Checklist

```text
[ ] i18n architecture mapped
[ ] All locales inventoried
[ ] All public routes inventoried
[ ] Route × locale matrix created
[ ] Translation keys compared
[ ] Missing keys checked
[ ] Empty values checked
[ ] Hard-coded UI text scanned
[ ] Runtime missing translations checked
[ ] Header/footer checked
[ ] Forms checked
[ ] Dynamic content checked
[ ] Metadata checked
[ ] HTML lang checked
[ ] hreflang/canonical checked
[ ] Locale switch checked
[ ] Dates checked
[ ] Numbers checked
[ ] Currency checked
[ ] Pluralization checked
[ ] Interpolation checked
[ ] RTL checked if applicable
[ ] Font coverage checked
[ ] Long-text stress tested
[ ] 404/errors checked
[ ] Cookie/privacy UI checked
[ ] Accessibility strings checked
[ ] Screenshots captured
[ ] Visual language verification completed
[ ] Critical issues fixed
[ ] Final route × locale verification passed
```

---

# FINAL REPORT

## 1. Executive Summary

## 2. Locale Inventory

## 3. Route × Locale Matrix

## 4. Findings Summary

| ID | Locale | Route | Finding | Priority | Status |
|---|---|---|---|---|---|

## 5. Missing/Hard-Coded Translation Findings

## 6. SEO Localization Findings

## 7. Formatting Findings

## 8. RTL Findings

## 9. Visual Verification

Screenshot path'lerini ver.

## 10. Changes Implemented

## 11. Remaining Risks

## 12. Final Verdict

```text
PASS
PASS WITH WARNINGS
FAIL
```

ve:

```text
GO
NO-GO
```

“%100 translated” demek için route × locale + runtime + screenshot kanıtı sunmak zorundasın.
