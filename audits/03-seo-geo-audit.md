# GOAL: Enterprise SEO + GEO / Generative Search Optimization Audit, Remediation & Verification

Amaç mevcut web sitesini klasik SEO ve modern generative search / AI search visibility açısından kapsamlı şekilde analiz etmek, eksikleri tespit etmek, güvenli optimizasyonları uygulamak ve kanıtlarla doğrulamaktır.

GEO'yu SEO'dan bağımsız, kanıtlanmamış “AI hack” teknikleri olarak ele alma.

Temel amaç:

```text
CRAWLABLE
↓
INDEXABLE
↓
UNDERSTANDABLE
↓
AUTHORITATIVE
↓
RETRIEVABLE
↓
CITABLE
↓
USEFUL
```

bir web sitesi oluşturmaktır.

## 0. Temel Çalışma Kuralı

AUDIT → IDENTIFY → ROOT CAUSE → PRIORITIZE → FIX → BUILD → CRAWL AGAIN → VALIDATE → REGRESSION → REPORT.

Yapma:
- keyword stuffing
- hidden text
- doorway pages
- spam content
- artificial backlinks
- fake citations/mentions
- AI manipulation
- yüzlerce near-duplicate page

## 1. Proje ve Site Yapısını Anla

Belirle:
Framework, rendering (SSR/SSG/CSR), routing, locales, CMS, API, metadata generation, sitemap, robots, structured data, canonical/hreflang, image pipeline, content sources, blog/resources, products/services, organization info.

## 2. URL Inventory

Her public URL için mümkün olduğunca:
URL, HTTP Status, Indexability, Canonical, Title, Description, H1, Language, hreflang, robots, structured data, purpose, internal in/out links.

Kategoriler:
Indexable, intentionally non-indexable, redirect, 404, soft-404, duplicate, canonicalized, orphan, problematic.

## 3. Technical SEO Audit

HTTP 200/301/302/404/410/5xx; soft 404, redirect chain/loop, broken URL.

## 4. robots.txt

Kontrol:
- accidental `Disallow: /`
- important assets/pages blocked
- staging rules
- sitemap reference
- unnecessary crawler blocks

Robots.txt ile noindex'i karıştırma.

## 5. AI Crawler Access

OpenAI açısından `OAI-SearchBot` erişimini robots/WAF/CDN/bot protection seviyesinde kontrol et.

`OAI-SearchBot != GPTBot`.

Training crawler politikalarını site sahibi tercihi olmadan değiştirme.

## 6. WAF / CDN / Bot Protection

Meşru crawler'lar 403/429 alıyor mu kontrol et.

## 7. XML Sitemap

Kontrol:
- valid sitemap/index
- canonical URLs only
- no 404/redirect/noindex
- no staging/localhost
- correct protocol/locales
- truthful `lastmod`

## 8. IndexNow

Site için uygunsa değerlendir. Submission indexing garantisi değildir.

## 9. Canonicalization

Her indexable page:
- absolute
- production
- HTTPS
- correct locale
- correct destination

Ara: missing self canonical, cross-page error, staging/http canonical, chain, duplicates.

## 10. www/non-www/http/https

Tek canonical host'a redirect.

## 11. International SEO / hreflang

lang, hreflang, canonical, URL, title, description, language.

Hreflang reciprocal, canonical, valid language/region; gerekiyorsa x-default.

## 12. Title Tags

Missing, duplicate, generic, overlong, stuffing, wrong locale/brand.

## 13. Meta Description

Missing, duplicate, meaningless, wrong language, stuffing.

## 14. Heading Architecture

Anlamlı H1/H2/H3. Heading'leri görsel stil için kullanma.

## 15. Content Quality

Unique, Useful, Specific, Accurate, Complete, Current, First-hand where possible, Expert-led where appropriate, Non-commodity.

Özgün:
- uzmanlık
- deneyim
- ürün bilgisi
- metodoloji
- süreç
- vaka
- veri
- araştırma
- teknik bilgi
- görüş

uydurma yapmadan kullan.

## 16. Search Intent

Informational, Commercial, Transactional, Navigational, Local, Support.

Keyword yerine kullanıcı ihtiyacının gerçekten karşılanmasına odaklan.

## 17. Topical Architecture

Ana entity/topic yapısını çıkar. Rastgele blog yerine konu kümeleri.

## 18. Internal Linking

Orphan, weakly linked, excessive links, broken links, generic anchors, irrelevant links.

## 19. Entity Optimization

Organization identity:
official/company/brand name, logo, description, website, address/contact/social, products/services, uygun lider bilgileri.

## 20. Structured Data

Uygun olduğunda:
Organization, WebSite, WebPage, BreadcrumbList, Article, BlogPosting, Product, SoftwareApplication, LocalBusiness, Person, VideoObject, JobPosting, Event.

Sadece sayfada gerçek içerikle eşleşen schema kullan.

## 21. Deprecated Structured Data

Eski SEO checklist'lerini körlemesine uygulama. Schema.org validity ile Google feature desteğini ayır.

## 22. GEO / Generative Search Content Audit

Önemli sayfalar net cevap vermeli:
- şirket ne yapıyor?
- ürün nedir?
- kim için?
- hangi problemi çözüyor?
- nasıl çalışıyor?
- farkı ne?
- teknoloji?
- ne zaman tercih edilir?
- sınırlamalar?
- iletişim?

AI için yapay Q&A spam üretme.

## 23. Answerability

Açık headings, net tanımlar, tablolar, karşılaştırmalar, adımlar, teknik özellikler, tarihler, birimler, tutarlı terminoloji.

## 24. Citability

Güçlü kaynak türleri:
Original research/data, benchmarks, case studies, technical docs, methodologies, definitions, expert explanations, first-party product information, detailed comparisons, versioned docs.

## 25. E-E-A-T Signals

Organization info, author/expertise, editorial responsibility, contact/about/privacy/legal, dates, references, primary sources, correction policy gerektiğinde.

## 26. Source Quality

Primary source → official docs → peer-reviewed/authoritative → reputable secondary.

## 27. Information Gain

Her önemli içerik için:
“Bu sayfa internette zaten bulunan sonuçlara hangi yeni değeri ekliyor?”

## 28. Keyword Research

Primary/secondary queries, semantic concepts, entities, user questions, commercial/informational queries.

Keyword density hedefleme.

## 29. Query Fan-Out Awareness

Ana topic'in doğal alt sorularını değerlendir; doorway page üretme.

## 30. Local SEO

Fiziksel/lokal hizmet varsa:
Google Business Profile, NAP consistency, location pages, hours, phone, address, maps, LocalBusiness schema, service areas.

Sahte şehir landing page üretme.

## 31. Image SEO + AI Visibility

Filename, alt, context, dimensions, crawlability, canonical image URL, lazy load, OG, structured data image fields.

## 32. Video SEO

Thumbnail, title, description, transcript, VideoObject, dedicated page/sitemap gerekiyorsa.

## 33. JavaScript SEO

İlk HTML/rendered HTML, app shell, JS failure, hydration, metadata/canonical/schema client-only mı, gerçek `<a href>` linkleri.

## 34. SSR/SSG/Prerender

Gerçek crawl/render problemi varsa optimize et; sırf SEO için gereksiz mimari rewrite yapma.

## 35. Core Web Vitals

LCP, INP, CLS değerlendirmesi.

## 36. Mobile

Mobile içerik/link/schema/title/meta/navigation paritesi.

## 37. Duplicate / Thin Content

Duplicate landing/translations/params/tags/archive/filters/copied descriptions/empty/placeholder/thin.

Kısa içerik otomatik kötü değildir.

## 38. Programmatic SEO

Template spam, keyword-swapped, city-swapped, AI near-duplicates, doorway pages.

## 39. AI-Generated Content

Accuracy, hallucination, duplicate/generic content, fake expertise/stats/quotes/citations, outdated info.

## 40. llms.txt

Google görünürlüğü için zorunlu kabul etme. Sırf “GEO için gerekli” diye ekleme.

## 41. AI-Specific Markup Hacks

Uygulama:
- AI schema
- GEO schema
- hidden AI summaries
- LLM keywords
- AI-only content
- invisible prompt
- crawler prompt injection

yasaktır.

## 42. Structured Content

Semantic HTML: article, main, nav, section, header, footer, time, table, figure, figcaption.

## 43. Brand Consistency

İsim, slogan, tarih, adres, ürün tanımı tutarlılığı.

## 44. Product / Service Definitions

Name, Category, Purpose, Target user, Problem solved, Features, Benefits, Limitations, Compatibility, Security/privacy, Pricing/availability if public, Documentation.

## 45. About / Organization Page

Identity, what company does, expertise, products/services, history, relevant people, location, contact, profiles.

## 46. Content Freshness

Statistics, prices, versions, legislation, integrations, availability, docs güncel mi?

Fake “Updated today” yapma.

## 47. Content Ownership

Gerektiğinde author, reviewer, publication date, last modified.

## 48. Social / Open Graph

og:title, og:description, og:image, og:url, og:type, twitter card.

## 49. Breadcrumbs

UI breadcrumb ile BreadcrumbList tutarlı.

## 50. Search Console

Erişim varsa indexed/excluded/crawl/impressions/clicks/CTR/position/queries/pages/countries/devices.

Yoksa `NOT VERIFIED — Search Console access unavailable`.

## 51. Bing Webmaster Tools

Erişim varsa indexing/crawl/sitemap/IndexNow/performance.

## 52. ChatGPT Search Discoverability

OAI-SearchBot robots access, WAF/CDN access, HTTP response, indexable content, canonicals, titles, content quality.

Varsa chatgpt referral traffic analiz et.

## 53. Other Generative Search Systems

Perplexity, Gemini, Bing/Copilot vb. için resmi doküman doğrulaması yap. Resmi doğrulama yoksa `NOT OFFICIALLY VERIFIED`.

## 54. Generative Search Manual Test

Gerçek sorgular:
brand nedir, product nedir, service ne işe yarar, best category, product vs competitor, problem için hangi çözüm?

Her test:
Query, Platform, Date, Observed Result, Mentioned?, Cited?, Citation URL, Notes.

Tek sorgudan GEO score üretme.

## 55. Competitor Gap Analysis

Topic coverage, depth, original information, structured data, internal linking, technical SEO, authority signals.

Rakip içeriğini kopyalama.

## 56. Backlink / Off-Site

Veri varsa analiz et. Link buying, PBN, spam, fake directory, automated guest post yapma.

## 57. Brand Mentions

Gerçek/organik mention değerlendirmesi; sahte forum/mention üretme.

## 58. Crawl Depth

Önemli sayfaların click depth'ini analiz et.

## 59. Orphan Pages

Keep/link, Merge, Redirect, Noindex, Remove kararı.

## 60. Broken Links

404, 5xx, redirect chains, HTTP links, wrong locale links.

## 61. Final SEO Crawl

Tüm değişikliklerden sonra yeniden crawl et.

## 62. SEO Regression

Responsive, i18n, canonical, sitemap, schema, analytics, performance, accessibility bozulmadı mı?

## 63. Priority Model

P0: production noindex, Disallow:/, wrong canonical domain, site-wide 5xx, critical rendering/indexing.
P1/P2/P3 diğer önem seviyeleri.

## 64. Kanıt Zorunluluğu

“SEO optimized”, “GEO optimized”, “AI ready”, “100% optimized” kanıtsız kabul edilmez.

Kanıt:
crawl report, HTML, HTTP, robots, sitemap, schema validation, Search Console, Bing, crawler response, before/after.

## 65. Do Not Fabricate Metrics

Erişim yoksa `unknown` / `NOT VERIFIED`.

## 66. Completion Checklist

Site architecture, URL inventory, crawl, HTTP, robots, sitemap, canonicals, redirects, hreflang, titles, descriptions, headings, content quality, search intent, internal links, orphan pages, schema, entities, organization, images, video, JS SEO, mobile, duplicate/thin, programmatic SEO, AI content, OAI-SearchBot, WAF/CDN, answerability, citability, information gain, llms.txt, IndexNow, Search Console/Bing if available, changes, build, final crawl, regression, report.

# FINAL REPORT

## 1. Executive Summary
## 2. Initial SEO Health
## 3. Critical Findings
## 4. Technical SEO Findings
## 5. Content Findings
## 6. Entity & Structured Data
## 7. GEO / Generative Search Findings
## 8. AI Crawler Status
## 9. Changes Implemented
## 10. Before vs After
## 11. Remaining Opportunities
## 12. Manual Actions Required
## 13. Evidence
## 14. Final Verdict

Yalnızca:
`PASS`, `PASS WITH WARNINGS`, `FAIL`

ve:
`GO`, `NO-GO`

Öncelik:
TECHNICAL ACCESSIBILITY → INDEXABILITY → CONTENT QUALITY → SEARCH INTENT → ENTITY CLARITY → INFORMATION GAIN → CITABILITY → GENERATIVE SEARCH DISCOVERABILITY → MEASUREMENT.
