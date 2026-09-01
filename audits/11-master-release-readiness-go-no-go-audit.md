# GOAL: Master Enterprise Website Release Readiness Audit — Final GO / NO-GO Gate

Bu görev diğer auditlerin üzerinde çalışan **nihai production release gate**'idir.

Amaç tek tek optimizasyon yapmak değil; mevcut proje, final production build, deployment configuration ve önceki audit kanıtlarını birlikte değerlendirerek web sitesinin production'a çıkmaya hazır olup olmadığı konusunda disiplinli bir **GO / NO-GO** kararı vermektir.

Bu audit diğer auditlerin yerine geçmez.

Beklenen input auditleri:

```text
01 Performance
02 Security
03 SEO + GEO
04 Functional QA + E2E
05 Accessibility / WCAG
06 Responsive + Cross-Browser + Visual Regression
07 i18n / Localization
08 Infrastructure + Production Readiness
09 Privacy + KVKK + Cookie Consent
10 Analytics + Measurement
```

---

# 0. Temel Kural

Bir audit raporunda `PASS` yazıyor diye körlemesine kabul etme.

Mümkün olduğunca:

- raporu
- evidence'i
- final code/config'i
- final production build'i

çapraz doğrula.

Kanıtsız iddiaları:

```text
NOT VERIFIED
```

olarak değerlendir.

Nihai kararın amacı:

> Production'a çıkıldığında kullanıcı, şirket, veri, marka görünürlüğü ve operasyon açısından kabul edilemez risk kalmış mı?

sorusuna cevap vermektir.

---

# 1. Audit Artifact Inventory

Önce mevcut raporları bul.

Her audit için:

```text
Audit
Report path
Date/time
Target commit/build
Verdict
GO/NO-GO
Open P0
Open P1
Evidence available?
```

tablosu oluştur.

Bir rapor yoksa otomatik PASS verme.

---

# 2. Build Identity

Final release candidate'ın kimliğini belirle:

```text
Commit SHA
Branch
Release version
Build artifact
Environment
Build timestamp
```

Audit raporlarının aynı veya uyumlu release candidate üzerinde çalıştığını doğrula.

Eski commit üzerinde alınan PASS final build için otomatik geçerli değildir.

---

# 3. Clean Working Tree / Change Drift

Auditlerden sonra yeni kod değişiklikleri yapılmış mı?

Varsa hangi auditlerin yeniden çalıştırılması gerektiğini belirle.

Özellikle security/performance/i18n fix sonrasında başka auditlerde regression riski değerlendirilmelidir.

---

# 4. Production Build Gate

Final release candidate için:

```text
install
lint
typecheck
unit tests
integration tests
E2E
build
```

durumlarını doğrula.

Başarısız kritik build/test:

```text
NO-GO
```

---

# 5. Performance Gate

Performance raporunu doğrula.

Minimum kontrol:

- LCP
- CLS
- INP veya uygun gerçek/lab değerlendirmesi
- critical pages
- mobile
- desktop
- bundle/network
- final regression

Açık P0/P1 performance problemi release riskine göre değerlendirilir.

100 Lighthouse zorunlu değildir.

---

# 6. Security Gate

En katı release gate'lerden biridir.

Aşağıdakilerden biri açık ve doğrulanmışsa normal koşullarda:

```text
NO-GO
```

- authentication bypass
- authorization bypass
- exposed production secret
- RCE
- critical/high exploitable injection
- serious sensitive data exposure
- unrestricted dangerous upload
- critical SSRF
- public production DB
- admin takeover
- exploitable critical dependency

Security finding'in sadece “accepted risk” yazılarak kapatılmasına izin verme; risk owner ve gerekçe yoksa OPEN kabul et.

---

# 7. SEO + GEO Gate

Kontrol:

- production `noindex` yok
- robots yanlış engellemiyor
- sitemap doğru
- canonical production domain
- hreflang doğru
- major metadata/schema errors yok
- critical content crawlable
- OAI-SearchBot politikası site tercihiyle uyumlu
- staging URLs yok

Site-wide indexing blocker:

```text
NO-GO
```

---

# 8. Functional / E2E Gate

Kritik user journeys final build üzerinde PASS olmalı.

Özellikle:

- homepage
- navigation
- primary CTA
- contact/lead
- auth if applicable
- payment if applicable
- critical API
- 404/error handling

Kritik business flow kırık ise:

```text
NO-GO
```

---

# 9. Accessibility Gate

WCAG audit sonuçlarını değerlendir.

Mutlak “0 issue” şartı koyma; ancak kritik işlev:

- keyboard ile kullanılamıyor
- screen reader için inaccessible
- focus trap
- form tamamen kullanılamıyor

gibi P0/P1 accessibility blocker içeriyorsa release riskine göre NO-GO ver.

---

# 10. Responsive / Cross-Browser Gate

Minimum desteklenen browser/device matrix'ini belirle.

Yaygın hedeflerden birinde kritik işlev kullanılamıyorsa:

```text
NO-GO
```

Küçük pixel farkları release blocker yapma.

---

# 11. i18n / Localization Gate

Desteklenen tüm production locale'ler için:

- critical routes
- no raw translation keys
- no severe mixed-language
- metadata
- locale routing
- hreflang
- formatting

doğrulanmalı.

Bir locale'i destekliyoruz diye production'da expose edip yarım bırakma.

Hazır olmayan locale varsa ya release öncesi düzelt ya da bilinçli şekilde disable et.

---

# 12. Infrastructure Gate

Kontrol:

- production env doğru
- production DB/storage/API doğru
- DNS
- TLS
- deployment
- rollback
- monitoring
- backup
- restore readiness
- domain/certificate health
- staging leakage

Yanlış DB/API, broken TLS veya broken deployment:

```text
NO-GO
```

---

# 13. Privacy / Consent Gate

Kontrol:

- reject sonrası optional tracking
- PII leakage
- consent persistence
- analytics/marketing gating
- forms
- privacy links
- cookie inventory

P0 privacy leakage varsa:

```text
NO-GO
```

Hukuki metin review'u tamamlanmadıysa bunu ayrıca `LEGAL REVIEW REQUIRED` olarak işaretle.

---

# 14. Analytics Gate

Kontrol:

- production IDs
- page views
- critical conversions
- duplicate events
- consent
- PII
- measurement plan

Analytics'in tamamen eksik olması her site için release blocker değildir.

Ancak şirketin release success'ini ölçmek için business-critical ise P1 olarak değerlendir.

PII leak veya ciddi duplicate purchase/lead tracking daha yüksek önceliktedir.

---

# 15. Open Finding Consolidation

Tüm auditlerden açık finding'leri tek tabloda birleştir:

| ID | Source Audit | Finding | Priority | Status | Release Blocker? |
|---|---|---|---|---|---|

Duplicate finding'leri birleştir ama kaynağı koru.

---

# 16. Severity Normalization

Farklı auditlerde priority anlamı farklı olabilir.

Master seviyede normalize et:

## P0 — Release Blocker
Kabul edilemez security, data, functionality veya deployment riski.

## P1 — High
Normalde release öncesi çözülmeli. GO için açık risk owner + gerekçe gerekir.

## P2 — Medium
Post-release plan ile kabul edilebilir olabilir.

## P3 — Low
Release sonrası backlog'a bırakılabilir.

---

# 17. Risk Acceptance Policy

P1 veya bazı P2 riskler bilinçli kabul edilecekse kaydet:

```text
Finding
Risk
Business impact
Reason for acceptance
Risk owner
Mitigation
Target fix date/version
```

Bu bilgiler yoksa “accepted” sayma.

P0 riskleri normalde accept ederek GO verme.

---

# 18. Regression Matrix

Son değişikliklerin hangi alanları etkileyebileceğini değerlendir.

Örnek:

| Last Change | Required Re-Test |
|---|---|
| CSP updated | Security + Functional + Analytics |
| i18n refactor | i18n + SEO + Visual |
| image pipeline | Performance + Visual + SEO |
| consent changes | Privacy + Analytics + Functional |

Eksik re-test varsa final verdict'i düşür.

---

# 19. Production Config Scan

Final source/build/config'de tekrar ara:

```text
localhost
127.0.0.1
staging
dev.
test.
example.com
TODO
FIXME
DEBUG
console.log
mock
dummy
```

Her eşleşmeyi manuel değerlendir.

---

# 20. Secret Final Scan

Final repository/build artifact'ta secret scan yeniden çalıştır.

Gerçek secret değerlerini rapora yazma.

Confirmed production secret exposure:

```text
NO-GO
```

---

# 21. Public Artifact Hygiene

Public deploy içinde bulunmaması gerekenleri kontrol et:

- `.env`
- database dumps
- backups
- source archives
- debug files
- private documents
- unintended source maps
- credentials

---

# 22. DNS / HTTPS Final Check

Production hostname üzerinden:

- DNS resolution
- HTTPS
- certificate
- HTTP → HTTPS
- www/non-www

doğrula.

---

# 23. Production Smoke Test

Final deployment sonrası gerçek production domain üzerinde:

```text
Homepage
Critical landing page
Primary navigation
Primary CTA
Critical form
Auth if applicable
Critical API
404
robots.txt
sitemap.xml
favicon
analytics
error tracking
```

kontrol et.

---

# 24. Console / Network Final Check

Kritik sayfalarda:

- uncaught errors
- failed chunks
- 4xx/5xx
- CORS
- mixed content
- hydration
- missing fonts/images

kontrol et.

---

# 25. Monitoring Before Release

Release yapılmadan önce en az:

- uptime
- frontend/backend error tracking
- 5xx visibility
- critical API health

çalışır durumda olmalı.

Release sonrası sorun oluştuğunda fark edemeyeceksek operasyonel readiness eksiktir.

---

# 26. Rollback Gate

Şunu cevapla:

> Şu anki release production'ı bozarsa önceki stabil versiyona güvenli biçimde nasıl döneriz?

Cevap somut değilse:

```text
ROLLBACK NOT VERIFIED
```

P1 veya sistem kritikliğine göre P0 değerlendir.

---

# 27. Backup / Restore Gate

Data-bearing uygulamalarda:

- recent backup
- backup status
- restore path

kontrol et.

High-risk migration varsa backup/rollback doğrulanmadan GO verme.

---

# 28. Release Communication

Kurumsal süreç varsa kontrol et:

- release owner
- deployment owner
- rollback owner
- incident contact
- release notes
- maintenance announcement gerekiyorsa

---

# 29. Version / Changelog

Release version ve önemli değişikliklerin izlenebilir olup olmadığını değerlendir.

---

# 30. Known Issues

Release ile birlikte bilinen fakat kabul edilen sorunları ayrı listele.

Bunları findings tablosundan gizleme.

---

# 31. Post-Release Verification Plan

Release sonrası kısa smoke/monitor planı oluştur:

```text
Immediately after deploy
First error/uptime check
Conversion/form verification
Analytics verification
Search crawl/index checks where applicable
```

Bu audit background work yapmaz; yalnızca uygulanacak doğrulama planını tanımlar.

---

# 32. Final Scorecard

Aşağıdaki format zorunlu:

| Audit | Verdict | Open P0 | Open P1 | Evidence | Master Status |
|---|---|---:|---:|---|---|
| Performance | | | | | |
| Security | | | | | |
| SEO + GEO | | | | | |
| Functional + E2E | | | | | |
| Accessibility | | | | | |
| Responsive / Browser | | | | | |
| i18n | | | | | |
| Infrastructure | | | | | |
| Privacy / Consent | | | | | |
| Analytics | | | | | |

Master Status:

```text
PASS
PASS WITH ACCEPTED RISK
FAIL
NOT VERIFIED
```

---

# 33. GO / NO-GO Decision Rules

## GO

Yalnızca şu durumda:

```text
No open P0
Critical flows verified
Production build verified
Security blockers absent
Production configuration verified
Deployment + rollback acceptable
Required re-tests complete
```

## GO WITH ACCEPTED RISK

Sadece:

- P0 yoksa
- açık P1/P2 riskler açıkça belgelenmişse
- risk owner varsa
- mitigation varsa
- release açısından bilinçli kabul edilmişse

kullan.

## NO-GO

Aşağıdakilerden biri varsa:

- açık P0
- kritik audit yapılmamış
- critical flow kırık
- confirmed serious security issue
- production configuration bilinmiyor/yanlış
- destructive migration without recovery
- production secret exposure
- indexing site-wide blocker
- severe privacy/data leak

---

# 34. Kanıt Politikası

Aşağıdaki ifadeleri kanıtsız kabul etme:

```text
"all tests pass"
"security is fine"
"SEO complete"
"production ready"
"100% translated"
"rollback works"
```

Rapor, command output, screenshot, test result veya config evidence iste.

---

# 35. No False Precision

Master score olarak rastgele:

```text
97/100 production ready
```

gibi bilimsel temeli olmayan tek sayı üretme.

Kategori bazlı verdict ve açık riskler daha değerlidir.

---

# 36. Final Deliverables

Görev sonunda üret:

```text
MASTER-RELEASE-READINESS-REPORT.md
OPEN-RISKS.md
RELEASE-CHECKLIST.md
```

Eğer ajan yalnızca tek rapor üretebiliyorsa bu üç bölümü ana rapor içerisinde ayrı başlıklar olarak ver.

---

# FINAL MASTER REPORT

## 1. Executive Release Summary

Release candidate'ın genel durumu.

## 2. Release Candidate Identity

```text
Commit:
Version:
Environment:
Build:
Audit Date:
```

## 3. Audit Scorecard

10 audit'in tamamı.

## 4. Open Release Blockers

P0'lar.

## 5. Open High Risks

P1'ler.

## 6. Accepted Risks

Risk owner ve target fix ile.

## 7. Regression Verification

Hangi alanlar son değişikliklerden sonra tekrar test edildi?

## 8. Production Smoke Test

## 9. Infrastructure / Rollback / Backup Status

## 10. Monitoring Status

## 11. Manual Actions Required Before Release

## 12. Known Issues

## 13. Post-Release Verification Plan

## 14. FINAL DECISION

Tam olarak aşağıdakilerden birini yaz:

```text
GO
GO WITH ACCEPTED RISK
NO-GO
```

Ardından en fazla birkaç maddede kararın teknik gerekçesini açıkla.

---

# EN ÖNEMLİ KURAL

Amaç tüm checklist kutularını yeşile boyamak değildir.

Amaç:

> Production'a alınacak **tam olarak bu build'in**, şirketin kabul edemeyeceği teknik, güvenlik, veri, kullanıcı deneyimi veya operasyonel riski taşımadığını kanıtlamaktır.

Bir alan doğrulanmadıysa bunu gizleme.

Final release kararını kanıta dayandır.
