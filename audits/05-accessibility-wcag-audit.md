# GOAL: Enterprise Accessibility / WCAG 2.2 AA Audit, Remediation & Verification

Bu görevin amacı web sitesini erişilebilirlik açısından kapsamlı biçimde incelemek, WCAG 2.2 Level AA hedefi doğrultusunda gerçek kullanıcı engellerini tespit etmek, güvenli düzeltmeleri uygulamak ve otomatik + manuel doğrulama ile kanıtlamaktır.

Sadece Lighthouse veya axe çalıştırıp “accessibility iyi” deme.

Aşağıdaki döngüyü uygula:

```text
AUDIT
↓
MANUAL VERIFY
↓
IDENTIFY USER IMPACT
↓
FIX ROOT CAUSE
↓
RE-TEST
↓
REGRESSION CHECK
```

## 0. Temel Kurallar

- Hedef: WCAG 2.2 Level AA.
- Otomatik scanner sonucu tek başına yeterli değildir.
- ARIA kullanmak erişilebilirlik garantisi değildir.
- Native HTML mümkünken gereksiz ARIA kullanma.
- Tasarımı gereksiz yere bozma; erişilebilirliği tasarım sistemiyle uyumlu çöz.
- Klavye, screen reader ve zoom/reflow manuel testleri zorunludur.
- Uygulanamayan maddeleri `N/A — reason`, doğrulanamayanları `NOT VERIFIED — reason` olarak raporla.

---

# 1. Erişilebilirlik Envanteri

Tüm önemli component'leri çıkar:

- Header
- Navigation
- Mobile menu
- Dropdown
- Buttons
- Links
- Forms
- Inputs
- Selects
- Checkboxes
- Radio
- Tabs
- Accordions
- Modal/dialog
- Toast
- Carousel
- Table
- Tooltip
- Search
- Pagination
- Media
- Upload
- Date picker
- Custom controls

Her component için keyboard + semantics + screen reader davranışını değerlendir.

---

# 2. Semantic HTML

Kontrol et:

- `header`
- `nav`
- `main`
- `footer`
- `section`
- `article`
- `aside`
- `button`
- `a`
- `form`
- `label`
- `table`
- `ul/ol/li`

Gereksiz:

```html
<div onclick="...">
<span role="button">
```

kullanımlarını tespit et.

Native element mümkünse native element kullan.

---

# 3. Document Structure

Kontrol:

- sayfada anlamlı `<title>`
- tek ana `main`
- heading hiyerarşisi
- landmark'lar
- içerik sırası
- DOM order ile visual order tutarlılığı

Heading seviyelerini sadece font boyutu için seçme.

---

# 4. Keyboard Navigation

Tüm siteyi mouse kullanmadan test et.

Kontrol:

- Tab
- Shift+Tab
- Enter
- Space
- Escape
- Arrow keys gereken widget'larda
- Home/End gereken widget'larda

Tespit et:

- keyboard trap
- erişilemeyen control
- yanlış tab order
- görünmeyen elemente focus
- focus kaybı
- gereksiz `tabindex`
- positive tabindex

---

# 5. Focus Visibility

Her interaktif elementte visible focus indicator olmalı.

Kontrol:

- light background
- dark background
- buttons
- links
- form fields
- cards
- custom controls

Focus state yalnızca çok ince veya fark edilemeyen bir değişiklik olmamalı.

---

# 6. Focus Management

Özellikle modal/dialog/menu/drawer için:

- açıldığında mantıklı focus
- focus trap gerekiyorsa doğru
- Escape ile kapanma
- kapanınca tetikleyici elemana focus dönüşü
- background interaction engeli
- screen reader context

kontrol et.

---

# 7. Skip Link

Uzun navigation olan sitelerde “skip to main content” mekanizmasını değerlendir.

Keyboard kullanıcısı header/navigation'ı her sayfada tekrar geçmek zorunda kalmamalı.

---

# 8. Forms

Her input için:

- programmatic label
- visible label gereken yerde
- required state
- instructions
- error association
- help text association
- autocomplete
- input purpose
- fieldset/legend gereken yerde

kontrol et.

Placeholder'ı label yerine kullanma.

---

# 9. Form Errors

Error mesajları:

- sadece renkle belirtilmemeli
- input ile programmatically ilişkilendirilmeli
- anlaşılır olmalı
- focus yönetimi mantıklı olmalı
- summary gerekiyorsa değerlendirilmeli

Form submit sonrası kullanıcı ilk hatayı bulabilmeli.

---

# 10. Color Contrast

Text, icons ve önemli UI elemanlarında kontrastı ölç.

WCAG AA hedeflerini dikkate al.

Özellikle:

- normal text
- large text
- button text
- placeholder
- disabled state
- focus indicator
- form border
- icons
- links

kontrol et.

Renk değerlerini tahmin etme; hesapla.

---

# 11. Color-Only Information

Bilgi yalnızca renk ile aktarılmamalı.

Örnek:

- validation
- chart legend
- success/error
- selected state
- status

İkon, metin, pattern veya başka bir sinyal ekle.

---

# 12. Images / Alt Text

Her image'i kategorize et:

```text
Informative
Decorative
Functional
Complex
```

Buna göre alt stratejisi uygula.

- Decorative → boş alt veya uygun presentation semantics
- Functional → aksiyonu açıkla
- Informative → görselin anlamını açıkla
- Complex → gerektiğinde ek açıklama

Dosya adını alt text olarak kullanma.

---

# 13. SVG / Icon Accessibility

Kontrol:

- dekoratif icon screen reader'dan gizli mi
- icon-only button accessible name taşıyor mu
- SVG title/aria kullanımı doğru mu

---

# 14. Links

Link text anlamlı olmalı.

Kaçın:

```text
Click here
Read more
More
```

Bağlama göre programmatic isim yeterliyse değerlendir.

Aynı isimli linkler farklı hedeflere gidiyorsa screen reader deneyimini kontrol et.

---

# 15. Buttons

Button'lar:

- gerçek button mı
- accessible name var mı
- disabled state doğru mu
- toggle ise `aria-pressed` vb. semantics doğru mu
- loading state erişilebilir mi

---

# 16. Navigation / Menus

Desktop ve mobile navigation'ı ayrı test et.

Kontrol:

- expanded/collapsed state
- `aria-expanded`
- `aria-controls` gerekiyorsa
- keyboard behavior
- focus management
- submenu semantics

---

# 17. Tabs

Tabs custom ise WAI-ARIA pattern'e uygun davranışı değerlendir:

- tablist
- tab
- tabpanel
- selected state
- keyboard arrows
- focus
- relationship

---

# 18. Accordions

Kontrol:

- button semantics
- expanded state
- controlled region
- keyboard
- heading relationship

---

# 19. Dialog / Modal

Kontrol:

- dialog semantics
- accessible name
- initial focus
- trap
- Escape
- return focus
- background inert behavior

---

# 20. Toast / Status Messages

Dinamik mesajların screen reader tarafından algılanmasını kontrol et.

Uygun durumda:

- status
- alert
- live region

kullan.

Her değişikliği agresif `aria-live="assertive"` yapma.

---

# 21. Tables

Data table varsa:

- `<table>`
- header cells
- scope
- caption gerekiyorsa
- complex header association
- responsive davranış

kontrol et.

Layout amacıyla table kullanma.

---

# 22. Carousels

Kontrol:

- keyboard
- pause/stop
- focus
- accessible labels
- autoplay
- hidden slide semantics
- screen reader verbosity

Autoplay kullanıcı kontrolü olmadan sorun yaratmamalı.

---

# 23. Motion / Animation

`prefers-reduced-motion` desteğini değerlendir.

Vestibular risk oluşturabilecek:

- parallax
- large movement
- auto animation
- scroll animation

davranışlarını azaltılmış hareket tercihinde sadeleştir.

---

# 24. Zoom / Reflow

Test et:

- 200% zoom
- 400% zoom/reflow gereken koşullar
- narrow viewport

Kontrol:

- horizontal scrolling zorunlu hale geliyor mu
- içerik kesiliyor mu
- modal erişilemiyor mu
- fixed element içerik kapatıyor mu

---

# 25. Text Spacing

Kullanıcı text spacing artırdığında içerik bozuluyor mu kontrol et.

Özellikle:

- line-height
- paragraph spacing
- letter spacing
- word spacing

---

# 26. Target Size

Touch/click target boyutlarını WCAG 2.2 bağlamında değerlendir.

Küçük:

- icon buttons
- close buttons
- pagination
- inline controls

özellikle kontrol edilmeli.

---

# 27. Dragging Movements

Drag ile yapılan işlemlerde pointer dragging'e alternatif var mı değerlendir.

Örnek:

- slider
- sortable list
- drag/drop

---

# 28. Consistent Help / Navigation

Benzer sayfalarda yardım/contact/navigation bileşenlerinin tutarlı konum ve davranışını değerlendir.

---

# 29. Accessible Authentication

Authentication varsa:

- CAPTCHA
- cognitive test
- password paste engeli
- password manager uyumu
- one-time code
- MFA

akışlarını erişilebilirlik açısından kontrol et.

Şifre yöneticisi/paste'i gereksiz engelleme.

---

# 30. Language Metadata

Kontrol:

```html
<html lang="...">
```

doğru mu?

Sayfa içinde farklı dil parçası varsa gerektiğinde `lang` kullan.

---

# 31. Screen Reader Manual Test

En az bir yaygın screen reader kombinasyonuyla kritik sayfaları test et.

Örnek ortamlar:

- NVDA + Chrome/Firefox (Windows)
- VoiceOver + Safari (macOS/iOS) erişim varsa

Kontrol:

- landmark navigation
- headings
- link list
- forms
- menus
- dialog
- error messages
- dynamic updates

Araç erişimi yoksa `NOT VERIFIED` olarak belirt.

---

# 32. Automated Tools

Projeye uygunsa:

- axe-core
- Playwright accessibility checks
- Lighthouse
- eslint accessibility rules

kullan.

Ancak otomatik testin bulamadığı:

- anlamlı alt text
- focus order
- screen reader UX
- cognitive clarity

gibi konuları manuel doğrula.

---

# 33. Accessibility Regression Tests

Bulunan önemli sorunlar için test ekle.

Örnek:

```text
modal opens → focus inside
modal closes → focus returns
form invalid → errors linked
mobile menu → keyboard usable
```

---

# 34. P0/P1/P2/P3

## P0
Kritik işlev erişilemez.

## P1
Önemli kullanıcı grubunu ciddi biçimde engelliyor.

## P2
Önemli fakat workaround var.

## P3
Düşük etkili iyileştirme.

---

# 35. Completion Checklist

```text
[ ] Semantic HTML audited
[ ] Landmarks audited
[ ] Heading structure audited
[ ] Keyboard-only navigation tested
[ ] Focus visibility tested
[ ] Focus management tested
[ ] Forms audited
[ ] Error messaging audited
[ ] Contrast measured
[ ] Color-only communication audited
[ ] Images/alt text audited
[ ] Icons audited
[ ] Links audited
[ ] Buttons audited
[ ] Menus audited
[ ] Tabs audited if applicable
[ ] Accordions audited if applicable
[ ] Dialogs audited
[ ] Live regions audited
[ ] Tables audited if applicable
[ ] Carousels audited if applicable
[ ] Reduced motion audited
[ ] Zoom/reflow tested
[ ] Text spacing tested
[ ] Target sizes audited
[ ] Dragging alternatives audited if applicable
[ ] Language metadata audited
[ ] Screen reader tested if tools available
[ ] Automated scanners executed
[ ] Findings manually validated
[ ] Critical issues remediated
[ ] Regression tests added
[ ] Final re-test completed
```

---

# FINAL REPORT

## 1. Executive Summary

## 2. WCAG Target and Scope

## 3. Findings Summary

| ID | Criterion/Area | Finding | Priority | Status |
|---|---|---|---|---|

## 4. Detailed Findings

```text
ID:
Page/Component:
User Impact:
WCAG Area:
Priority:
Status:
Evidence:
Root Cause:
Fix:
Verification:
```

## 5. Keyboard Test Results

## 6. Screen Reader Results

## 7. Automated Scan Results

## 8. Changes Implemented

## 9. Remaining Risks

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

Otomatik skorları “WCAG compliant” kanıtı olarak tek başına kullanma.
