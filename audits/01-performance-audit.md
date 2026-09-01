# GOAL: Enterprise Website Performance Audit & Optimization

Bu görevin amacı mevcut web sitesini production-grade performans standartlarına ulaştırmaktır.

Sadece analiz yapma veya öneri listesi çıkarma. Projeyi gerçekten incele, ölç, darboğazları tespit et, güvenli optimizasyonları uygula, tekrar ölç ve sonuçları kanıtla.

## Temel Kural

Mevcut tasarımı, görsel kaliteyi, responsive davranışı, işlevleri, animasyonları, SEO'yu, accessibility davranışını, analytics/tracking sistemlerini ve i18n sistemini bozarak performans skoru yükseltme.

Bir özelliği kaldırmak performans optimizasyonu değildir. Görsel kaliteyi fark edilir şekilde düşürme.

## 1. Önce Mevcut Durumu Ölç

Herhangi bir değişiklik yapmadan önce production build oluştur ve başlangıç performansını kaydet.

En az şu sayfaları test et:
- Homepage
- En ağır içerikli sayfa
- En fazla görsel kullanılan sayfa
- En fazla JavaScript kullanan sayfa
- Önemli ürün/hizmet sayfası
- Contact sayfası
- Varsa dinamik içerik bulunan önemli route'lar

Hem Mobile hem Desktop profillerinde test et.

Mümkün araçlar:
- Chrome Lighthouse
- Chrome DevTools Performance
- Chrome DevTools Network
- PageSpeed Insights
- WebPageTest
- Framework bundle analyzer
- Coverage
- Performance traces

Tek bir Lighthouse koşusuna güvenme. Mümkünse birden fazla kez çalıştır ve anomalileri ayır.

## 2. Core Web Vitals

### LCP
Hedef: <= 2.5 s

LCP elementini kesin olarak tespit et. Şunları araştır:
- LCP image geç mi yükleniyor?
- preload gerekli mi?
- `fetchpriority="high"` gerekli mi?
- yanlışlıkla lazy-load edilmiş mi?
- image boyutu gereğinden büyük mü?
- render-blocking CSS/JS var mı?
- server response gecikiyor mu?
- font nedeniyle gecikme var mı?

### INP
Hedef: <= 200 ms

İncele:
- uzun JavaScript task'ları
- event handler maliyetleri
- hydration
- gereksiz re-render
- main-thread blocking
- synchronous computation
- third-party script'ler

### CLS
Hedef: <= 0.1

Kontrol:
- width/height tanımsız görseller
- font swap
- geç yüklenen banner
- dinamik component
- cookie banner
- slider/carousel
- iframe/embed
- skeleton/loading state
- navbar değişimleri

CLS'yi görsel olarak da doğrula.

## 3. İlk Yükleme Performansı

İncele:
- FCP
- Speed Index
- TTFB
- TBT
- DOM Content Loaded
- Load Event
- main-thread work
- network payload
- request count

Her kötü metriğin root cause'unu kaynak seviyesinde belirle.

## 4. Network Audit

Waterfall üzerinden tespit et:
- gereksiz request
- duplicate request
- büyük JS/CSS/image/font
- gereksiz JSON
- gereksiz API çağrısı
- render-blocking resource
- redirect
- cache problemi
- waterfall dependency
- third-party bottleneck

## 5. JavaScript Bundle Audit

Kontrol:
- bundle/chunk boyutları
- unused JS
- duplicate dependency
- ağır dependency
- yanlış import
- tree-shaking problemi
- route bazında gereksiz JS
- client render maliyeti

Gerekirse:
- dynamic import
- code splitting
- route splitting
- lazy loading
- tree shaking
- dependency replacement

uygula.

## 6. React / Frontend Render Audit

React/benzeri ise:
- gereksiz re-render
- unstable props
- context kaynaklı toplu render
- ağır component
- büyük client component
- gereksiz state
- hydration maliyeti
- repeated computation
- büyük DOM tree

Profiler kullan. `useMemo`, `useCallback`, `memo` gibi yapıları körlemesine ekleme.

## 7. Görsel Optimizasyonu

Analiz et:
- format
- gerçek kullanım boyutu
- dosya boyutu
- responsive image
- DPR
- lazy loading
- preload
- LCP image
- duplicate/unused image

Uygun durumda WebP/AVIF, `srcset`, `sizes` kullan. LCP görselini lazy-load etme.

## 8. Font Audit

Kontrol:
- font family sayısı
- weight sayısı
- unused weight
- WOFF2
- preload
- font-display
- duplicate request
- external font dependency

Gerekirse subset/self-hosting uygula.

## 9. CSS Audit

Kontrol:
- unused CSS
- duplicate CSS
- render-blocking CSS
- büyük stylesheet
- gereksiz component CSS
- animation maliyetleri
- expensive selectors

## 10. Third-Party Script Audit

Analytics, tag manager, chat, maps, video embeds, social widgets, captcha, monitoring, marketing araçlarının:
- download
- parse/execute
- main-thread
- network

etkisini ölç.

Gerekirse defer/async/lazy initialization/interaction sonrası initialization uygula.

## 11. API / Backend Performance

Kontrol:
- duplicate API request
- waterfall request
- gereksiz request
- büyük payload
- gereksiz field
- sequential request
- cache edilebilir response
- yavaş endpoint

Bağımsız request'leri uygun olduğunda paralelleştir.

## 12. Caching

Browser/CDN/server/API cache stratejisini incele.

Hashed static asset'lerde uygun durumda:
`Cache-Control: public, max-age=31536000, immutable`

HTML/API/private içerikte körlemesine uzun cache kullanma.

## 13. Compression

Brotli/Gzip durumunu HTML/CSS/JS/JSON/SVG için doğrula.

## 14. DOM Complexity

Aşırı DOM node, gereksiz wrapper, derin nesting, görünmeyen büyük DOM içeriklerini azalt.

## 15. Animasyon Performansı

Layout/paint/composite maliyetlerini incele. Mümkün olduğunda transform/opacity gibi compositor-friendly özellikleri kullan.

## 16. Memory ve Runtime

Kontrol:
- memory leak
- uncleared timer
- stale event listener
- gereksiz observer
- detached DOM
- background işlem
- animation loop

## 17. Build Sistemi

Production build üzerinde:
- dev dependency
- source map policy
- minification
- tree shaking
- chunking
- dead-code elimination
- compression
- environment mode

kontrol et.

## 18. Önceliklendirme

P0 Critical, P1 High, P2 Medium, P3 Low şeklinde sınıflandır.

Önce en yüksek ROI sağlayan darboğazlara odaklan.

## 19. Optimizasyonları Uygula

Her önemli değişiklik için:
1. Sorunu tanımla
2. Root cause belirle
3. Değişikliği uygula
4. Production build al
5. Test et
6. Yeniden ölç
7. Regression olmadığını doğrula

## 20. Regression Kontrolü

Kontrol:
- visual
- responsive
- broken images
- navigation
- forms
- animation
- accessibility
- SEO
- i18n
- analytics
- console/network errors

## 21. Son Test

Başlangıçta test edilen aynı URL ve koşullarda final benchmark al.

| Metric | Before | After | Difference |
|---|---:|---:|---:|
| Lighthouse Performance | | | |
| LCP | | | |
| CLS | | | |
| INP / uygun lab proxy metriği | | | |
| TBT | | | |
| FCP | | | |
| Speed Index | | | |
| TTFB | | | |
| JS transferred | | | |
| CSS transferred | | | |
| Images transferred | | | |
| Total transferred | | | |
| Request count | | | |

Mobile ve Desktop ayrı göster.

Lab ortamında gerçek kullanıcı INP ölçülemiyorsa açıkça belirt; TBT'yi INP gibi sunma.

## 22. Kanıt Zorunluluğu

Mümkün olduğunca sun:
- Lighthouse report
- performance trace
- network waterfall
- bundle analysis
- before/after screenshots
- metric comparison
- değiştirilen dosyalar

## 23. Lighthouse Hakkında Kural

Amaç 100/100 değildir. Skoru manipüle etmek için içerik/animasyon/analytics/özellik kaldırma veya kalite düşürme yasaktır.

## 24. Hedefler

Core Web Vitals:
- LCP <= 2.5s
- CLS <= 0.1
- INP <= 200ms

Lighthouse hedef:
- Performance >= 90
- Accessibility >= 95
- Best Practices >= 95
- SEO >= 95

Teknik olarak ulaşılamayan hedefleri saklama; nedenini kanıtla.

## 25. Completion Checklist

- [ ] Initial benchmark
- [ ] Mobile/Desktop benchmark
- [ ] Core Web Vitals
- [ ] LCP element
- [ ] JS bundle
- [ ] Images
- [ ] Fonts
- [ ] CSS
- [ ] Network waterfall
- [ ] Third-party
- [ ] API
- [ ] Caching
- [ ] Compression
- [ ] Rendering
- [ ] Main bottlenecks fixed
- [ ] Production build
- [ ] Console errors
- [ ] Regression
- [ ] Final benchmark
- [ ] Before/After report

# FINAL REPORT

## 1. Executive Summary
## 2. Initial Performance
## 3. Root Causes
## 4. Changes Implemented
## 5. Final Performance
## 6. Before vs After
## 7. Remaining Issues
## 8. Evidence
## 9. Final Verdict

Yalnızca:
`PASS`, `PASS WITH WARNINGS`, `FAIL`

Çalışma döngüsü:

```text
MEASURE
↓
IDENTIFY BOTTLENECK
↓
FIND ROOT CAUSE
↓
OPTIMIZE
↓
BUILD
↓
TEST
↓
MEASURE AGAIN
↓
COMPARE
↓
REGRESSION CHECK
```

Hiçbir metriği veya sonucu tahmin etme.
