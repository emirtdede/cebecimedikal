# GOAL: Enterprise Responsive + Cross-Browser + Visual Regression Audit

Bu görevin amacı web sitesinin farklı ekran boyutları, tarayıcı motorları ve gerçek kullanıcı etkileşimleri altında görsel ve fonksiyonel olarak tutarlı çalıştığını doğrulamak, layout kırılmalarını düzeltmek ve mümkün olduğunda otomatik visual regression coverage oluşturmaktır.

Sadece birkaç screenshot alıp “responsive” deme.

## 0. Temel Kurallar

- Tasarımı yeniden tasarlama; mevcut design intent'i koru.
- Fonksiyonları kaldırarak responsive sorun çözme.
- Pixel-perfect takıntısıyla accessibility veya responsive esnekliği bozma.
- Test edilmeyen viewport/browser için PASS yazma.
- Browser erişimi yoksa `NOT VERIFIED — reason`.
- Bulduğun P0/P1/P2 sorunları güvenli şekilde düzelt ve yeniden test et.

---

# 1. Breakpoint Envanteri

Projede kullanılan:

- CSS media queries
- Tailwind breakpoints
- design tokens
- container widths
- max-width/min-width
- responsive component logic

değerlerini çıkar.

Hard-coded breakpoint çakışmalarını tespit et.

---

# 2. Viewport Matrix

En az aşağıdaki genişliklerde kritik sayfaları test et:

```text
320
360
375
390
414
480
768
820
1024
1280
1366
1440
1536
1920
```

İçerik yapısına göre ara breakpoint'ler de ekle.

Sadece preset cihazlara güvenme; breakpoint aralarında layout kırılması olup olmadığını da kontrol et.

---

# 3. Height Variations

Sadece width değil farklı viewport yüksekliklerini de değerlendir.

Özellikle:

- kısa laptop ekranı
- mobil browser chrome
- landscape phone
- tablet landscape
- modal/dialog

---

# 4. Browser Matrix

Mümkün olduğu ölçüde:

```text
Chrome / Chromium
Edge
Firefox
Safari / WebKit
iOS Safari
Android Chrome
```

test et.

Playwright kullanıyorsan Chromium + Firefox + WebKit projeleri oluştur.

Gerçek iOS/Android erişimi yoksa emulation ile gerçek cihaz testini aynı şey gibi raporlama.

---

# 5. Critical Pages

En az:

- Homepage
- Header/navigation yoğun sayfa
- En uzun içerikli sayfa
- En fazla görselli sayfa
- Form sayfası
- Product/service detail
- Search/listing
- 404
- Auth pages varsa
- Admin/user dashboard varsa

test edilmeli.

---

# 6. Horizontal Overflow

Her viewport'ta:

- `documentElement.scrollWidth`
- viewport width

karşılaştır.

Horizontal overflow tespit et.

Root cause örnekleri:

- fixed width
- long word
- code block
- table
- absolute positioned element
- image
- SVG
- transform
- negative margin

---

# 7. Text Overflow

Kontrol:

- heading
- buttons
- nav items
- cards
- badges
- form labels
- validation messages
- localization text
- long URLs
- email addresses

Text:

- kesiliyor mu
- üst üste biniyor mu
- container dışına taşıyor mu
- yanlış ellipsis kullanıyor mu

---

# 8. Images / Media

Kontrol:

- aspect ratio
- object-fit
- responsive width
- max-width
- art direction
- high-DPI
- crop
- lazy-loaded placeholder
- video/embed

Görsel kullanıcı için önemli bir alanı yanlış crop'lamamalı.

---

# 9. Header / Navigation

Her breakpoint'te:

- logo
- desktop nav
- mobile nav
- hamburger
- dropdown
- sticky behavior
- scroll behavior
- focus
- z-index

test et.

Header içerik üzerine binmemeli.

---

# 10. Mobile Menu

Kontrol:

- açılma/kapanma
- scroll lock
- background
- safe area
- focus
- nested menu
- Escape/close
- route değişimi sonrası kapanma
- back button

---

# 11. Grid / Cards

Test:

- 1 column
- 2 column
- 3+ column
- uneven content heights
- long titles
- missing images
- dynamic content

Grid kırılmalarını düzelt.

---

# 12. Forms

Mobil ve desktop'ta:

- input width
- labels
- keyboard
- validation
- submit button
- select
- date picker
- file upload

kontrol et.

iOS zoom sorunlarına neden olabilecek aşırı küçük input fontlarını değerlendir.

---

# 13. Modals / Dialogs / Drawers

Kontrol:

- viewport dışına taşıyor mu
- max-height
- internal scroll
- close button erişilebilir mi
- mobile safe-area
- keyboard
- background scroll

---

# 14. Tables

Wide table varsa:

- responsive strategy
- horizontal scroll gerekiyorsa kontrollü
- sticky header/column
- readability

değerlendir.

Table'ı anlamsız kartlara dönüştürerek veri ilişkiselliğini bozma.

---

# 15. Carousels / Sliders

Kontrol:

- slide width
- clipping
- arrows
- dots
- touch swipe
- keyboard
- autoplay
- responsive count

---

# 16. Fixed / Sticky Elements

Özellikle:

- cookie banner
- chat widget
- sticky CTA
- bottom navigation
- header
- floating button

birbirinin üstüne biniyor mu?

Mobil safe-area inset'lerini kontrol et.

---

# 17. CSS Feature Compatibility

Browser compatibility açısından kullanılan özellikleri incele:

- `dvh/svh/lvh`
- `backdrop-filter`
- container queries
- subgrid
- sticky
- aspect-ratio
- modern selectors

Gerekli fallback olup olmadığını değerlendir.

---

# 18. Typography Cross-Browser

Kontrol:

- font loading
- fallback font
- line-height
- letter spacing
- wrapping
- variable font
- synthetic weights

Safari/Firefox'ta layout kayması oluşuyor mu?

---

# 19. Scroll Behavior

Kontrol:

- body scroll
- nested scroll
- smooth scroll
- sticky anchors
- scroll restoration
- fixed header offset

Anchor link hedefi header arkasında kalmamalı.

---

# 20. Orientation

Mobil/tablet:

- portrait
- landscape

test et.

Orientation değişiminde layout ve modal state bozuluyor mu?

---

# 21. Touch / Pointer

Touch cihazlarda:

- hover-only interactions
- tiny target
- dropdown
- tooltip
- drag
- swipe

kontrol et.

Hover olmadan fonksiyon erişilebilir olmalı.

---

# 22. Visual Regression Baseline

Projeye uygunsa Playwright screenshot baseline oluştur.

Kritik kombinasyonlar için:

```text
page × viewport × theme × locale
```

matrisi belirle.

Her şeyi screenshot'a almak yerine yüksek değerli sayfaları seç.

---

# 23. Stable Screenshot Strategy

Visual testlerde flaky sonuçları azalt:

- animation disable
- deterministic data
- fixed time gerekiyorsa
- stable fonts
- wait for network/font
- dynamic ads/chat excluded where justified

Mask kullanıyorsan nedenini raporla; gerçek regression'ları saklama.

---

# 24. Pixel Diff Policy

Her küçük anti-aliasing farkını bug kabul etme.

Farkları kategorize et:

```text
Expected rendering variance
Cosmetic regression
Layout regression
Functional visual break
```

---

# 25. Dark/Light Theme

Site theme destekliyorsa her ikisini test et.

Kontrol:

- contrast
- images
- logo
- shadows
- borders
- form controls
- system theme
- persistence

---

# 26. Localization Stress

En uzun metin üreten locale'lerde responsive QA yap.

Özellikle:

- navigation
- buttons
- cards
- forms
- dialogs

---

# 27. Accessibility Regression

Responsive fix sonrası:

- focus order
- DOM order
- hidden elements
- aria-hidden
- screen reader

bozulmadığını kontrol et.

CSS `order` ile visual order ve DOM order arasında tehlikeli fark yaratma.

---

# 28. Performance Regression

Responsive çözüm uğruna:

- duplicate desktop+mobile DOM
- gereksiz büyük image
- iki ayrı video
- hidden heavy component

yükleme gibi performans problemleri yaratma.

---

# 29. P0/P1/P2/P3

## P0
Sayfa veya kritik işlev belirli yaygın viewport/browser'da kullanılamıyor.

## P1
Ciddi layout/interaction kırılması.

## P2
Orta seviye responsive uyumsuzluk.

## P3
Kozmetik fark.

---

# 30. Completion Checklist

```text
[ ] Breakpoints inventoried
[ ] 320 tested
[ ] 360 tested
[ ] 375 tested
[ ] 390 tested
[ ] 414 tested
[ ] 768 tested
[ ] 1024 tested
[ ] 1280 tested
[ ] 1366 tested
[ ] 1440 tested
[ ] 1920 tested
[ ] Intermediate breakpoints sampled
[ ] Chromium tested
[ ] Firefox tested
[ ] WebKit/Safari tested where available
[ ] iOS behavior evaluated
[ ] Android behavior evaluated
[ ] Horizontal overflow checked
[ ] Text overflow checked
[ ] Images checked
[ ] Header/nav checked
[ ] Mobile menu checked
[ ] Forms checked
[ ] Dialogs checked
[ ] Tables checked if applicable
[ ] Sticky/fixed UI checked
[ ] Portrait/landscape checked
[ ] Touch interactions checked
[ ] Light/dark themes checked if applicable
[ ] Localization stress tested
[ ] Visual regression baseline created where applicable
[ ] Critical regressions fixed
[ ] Final screenshots generated
```

---

# FINAL REPORT

## 1. Executive Summary

## 2. Test Matrix

## 3. Findings Summary

| ID | Page | Browser | Viewport | Priority | Status |
|---|---|---|---:|---|---|

## 4. Detailed Findings

```text
ID:
Page:
Browser:
Viewport:
Priority:
Description:
Expected:
Actual:
Root Cause:
Fix:
Verification:
```

## 5. Visual Regression Results

## 6. Browser-Specific Issues

## 7. Changes Implemented

## 8. Remaining Risks

## 9. Evidence

Screenshot/trace/report path'lerini ver.

## 10. Final Verdict

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
