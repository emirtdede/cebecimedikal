# GOAL: Enterprise Infrastructure + Deployment + Production Readiness Audit

Bu görevin amacı web sitesinin production altyapısını, build/deployment sürecini, environment yapılandırmasını, DNS/TLS/CDN/cache/logging/rollback/backup/monitoring hazırlığını kapsamlı şekilde doğrulamak; güvenli düzeltmeleri uygulamak ve release için GO/NO-GO kararı üretmektir.

Bu audit yalnızca “build başarılı” kontrolü değildir.

## 0. Temel Kurallar

- Production secret'ları rapora açık şekilde yazma.
- Destructive infrastructure değişikliği yapma.
- DNS/TLS/CDN gibi yüksek etkili ayarlarda erişim veya doğrulama yoksa tahmin etme.
- Test edilemeyen alan için `NOT VERIFIED — reason`.
- Uygulanmayan alan için `N/A — reason`.
- Kod ve config seviyesinde güvenli şekilde düzeltilebilen sorunları düzelt.
- Production üzerinde riskli migration, restart veya traffic-impacting değişikliği otomatik uygulama.
- Release blocker'ları açıkça belirt.

---

# 1. Architecture Inventory

Belirle:

```text
Frontend hosting
Backend hosting
Runtime
Database
Object storage
CDN
DNS provider
TLS termination
Reverse proxy
WAF
Cache
Email provider
Secrets manager
CI/CD
Monitoring
Logging
Error tracking
Backup
Queue/worker if applicable
Third-party services
```

Mimarinin gerçek dependency graph'ını çıkar.

---

# 2. Environment Separation

Kontrol:

- local
- development
- test
- staging
- production

environment'ları ayrılmış mı?

Production:

- test database kullanıyor mu?
- staging API kullanıyor mu?
- dev auth provider kullanıyor mu?
- test storage bucket kullanıyor mu?
- test email recipient kalmış mı?

---

# 3. Environment Variables

Tüm env kullanımını incele.

Ara:

```text
localhost
127.0.0.1
staging
dev.
test.
example.com
dummy
TODO
FIXME
DEBUG
```

Frontend bundle'a giren public env değişkenleri ile secret env değişkenlerini ayır.

Secret'ları output'a yazma.

---

# 4. Production Build

Gerçek production build al.

Kontrol:

- build success
- typecheck
- lint
- tests
- warnings
- minification
- tree shaking
- sourcemap policy
- environment mode

Development server'ı production deployment olarak kabul etme.

---

# 5. Repository Hygiene

Production açısından tara:

- `.env`
- credentials
- backup files
- dumps
- test artifacts
- large temp files
- old builds
- debug configs

`.gitignore` / equivalent doğru mu?

---

# 6. Dependency Locking

Kontrol:

- lock file mevcut
- CI lock file kullanıyor
- deterministic install
- package manager version
- unexpected lock drift

---

# 7. CI/CD Pipeline

Pipeline'ı incele.

Beklenen aşamalar:

```text
install
lint
typecheck
test
build
security checks where applicable
deploy
smoke test
```

Build/test başarısızsa deploy devam etmemeli.

---

# 8. Branch / Release Controls

Kontrol:

- production branch protection
- review requirement
- environment protection
- deploy permission
- release tags/versioning
- audit trail

---

# 9. Deployment Strategy

Belirle:

- static deploy
- rolling
- blue-green
- canary
- container replacement
- server restart

Riskleri değerlendir.

---

# 10. Rollback

En kritik kontrollerden biri.

Cevapla:

> Son deployment production'ı bozarsa önceki stabil sürüme deterministik biçimde dönebilir miyiz?

Kontrol:

- previous artifact retained
- versioned deployment
- rollback command/process
- DB migration compatibility
- config compatibility

Rollback prosedürü kanıtlanmamışsa PASS verme.

---

# 11. Database Migrations

Varsa:

- migration order
- backward compatibility
- destructive migration
- lock risk
- rollback/roll-forward strategy
- backup before risky migration

kontrol et.

Production verisine destructive test uygulama.

---

# 12. DNS

Erişim varsa:

- A
- AAAA
- CNAME
- apex
- www
- stale records
- staging subdomain
- dangling record

kontrol et.

TTL stratejisini değerlendir.

---

# 13. Domain Canonicalization

Aşağıdakileri test et:

```text
http://domain
https://domain
http://www.domain
https://www.domain
```

Tek canonical host'a kontrollü redirect olmalı.

---

# 14. TLS / Certificates

Kontrol:

- valid certificate
- hostname
- chain
- expiration
- auto-renewal
- HTTPS redirect
- mixed content

Certificate expiry monitoring var mı?

---

# 15. CDN

Varsa:

- origin protection
- cache rules
- HTML cache
- static asset cache
- purge/invalidation
- compression
- image optimization
- stale behavior

değerlendir.

Yanlış cache ile kullanıcıya özel veri paylaşımı oluşmamalı.

---

# 16. Cache Headers

Kaynak tipine göre cache stratejisini kontrol et.

Özellikle hashed static asset için uzun cache uygundur.

HTML/API/private response için körlemesine immutable cache verme.

---

# 17. Compression

Kontrol:

- Brotli
- gzip
- HTML
- CSS
- JS
- JSON
- SVG

Compression gerçekten response üzerinde uygulanıyor mu doğrula.

---

# 18. HTTP Protocol / Connection

Mümkünse HTTP/2 veya HTTP/3 desteğini ve connection behavior'ı değerlendir.

Sırf yeni diye mimari değiştirme.

---

# 19. Reverse Proxy / Server

Nginx/Apache/IIS/platform config varsa:

- host rules
- redirects
- body size
- timeout
- proxy headers
- static cache
- compression
- error pages

kontrol et.

---

# 20. Ports / Exposure

Production'da gereksiz servis/port public mi?

Örnek:

- database
- Redis
- admin dashboard
- dev server
- metrics endpoint

Erişim yoksa config üzerinden doğrula.

---

# 21. Storage

Object storage varsa:

- correct bucket
- public/private policy
- CORS
- lifecycle
- versioning gerekiyorsa
- backup
- CDN origin

kontrol et.

---

# 22. Database Production Readiness

Kontrol:

- production instance
- connection pool
- TLS
- backups
- storage capacity
- monitoring
- max connections
- timeout
- migration policy

---

# 23. Email Infrastructure

Site email gönderiyorsa:

- production sender
- SPF
- DKIM
- DMARC
- reply-to
- bounce handling
- rate limits

kontrol et.

Test recipient kullanarak delivery smoke test yapılabiliyorsa yap.

---

# 24. Logging

Kontrol:

- frontend logs
- backend logs
- structured logging
- timestamps
- environment
- request correlation
- retention
- PII/secrets leakage

Production log'ları debug gürültüsüyle dolmamalı.

---

# 25. Error Tracking

Sentry vb. varsa:

- DSN/environment doğru
- release version
- sourcemap policy
- alerting
- sample event
- privacy filtering

kontrol et.

---

# 26. Uptime Monitoring

En az kritik endpoint'ler için:

- homepage
- API health
- auth/critical service gerekiyorsa

uptime monitor mevcut mu?

---

# 27. Health Checks

Backend varsa health endpoint:

- sadece process alive mı?
- dependency readiness?
- sensitive info expose ediyor mu?

değerlendir.

Liveness/readiness kavramlarını karıştırma.

---

# 28. Alerting

Şunlar için alarm politikasını değerlendir:

```text
5xx spike
uptime failure
latency
database saturation
disk/storage
queue backlog
TLS expiry
domain expiry
backup failure
```

Alarm olmayan monitoring pasif gözlemden ibarettir.

---

# 29. Backup

Kontrol:

- database backup
- media/storage backup
- config backup gerekiyorsa
- schedule
- retention
- encryption
- geographic redundancy gerekiyorsa

---

# 30. Restore Test

“Backup var” tek başına yeterli değildir.

Mümkünse güvenli test ortamında:

```text
backup
↓
restore
↓
application verification
```

yap.

Production'a overwrite etme.

Restore test edilemiyorsa açık risk olarak raporla.

---

# 31. RPO / RTO

İş ihtiyacına göre mevcut:

- RPO
- RTO

hedefleri tanımlı mı değerlendir.

Tanımlı değilse karar gerektiren risk olarak raporla.

---

# 32. Resource Limits

Container/serverless/server varsa:

- memory
- CPU
- timeout
- concurrency
- max request size
- autoscaling

ayarlarını değerlendir.

---

# 33. Capacity / Load Assumptions

Destructive load test yapma.

Ama mevcut trafik ve altyapıya göre:

- obvious bottleneck
- hard limit
- connection limit
- provider quota

risklerini tespit et.

---

# 34. Scheduled Jobs / Workers

Varsa:

- cron
- queue worker
- cleanup job
- email job

production config doğru mu?

Duplicate execution riski var mı?

---

# 35. Feature Flags

Production'da:

- debug flag
- experimental feature
- unfinished feature
- stale flag

var mı?

Default davranışı kontrol et.

---

# 36. Staging Leakage

Production output/config'de ara:

```text
staging domain
test API
dev analytics ID
test email
mock data
debug endpoint
preview URL
```

---

# 37. Analytics Production Config

Analytics:

- production property
- correct domain
- consent integration
- duplicate script
- staging contamination

kontrol et.

---

# 38. Robots / Sitemap Production Config

Infrastructure audit içerisinde final production URL üzerinden:

- `/robots.txt`
- `/sitemap.xml`

erişim ve doğru host kontrolü yap.

---

# 39. Static Asset Integrity

Kontrol:

- missing chunk
- stale HTML referencing deleted chunk
- cache invalidation
- asset 404
- CDN propagation

Deployment sonrası chunk mismatch kritik olabilir.

---

# 40. SPA Fallback / Rewrites

SPA ise deep link:

```text
/some/nested/route
```

doğrudan açıldığında çalışmalı.

Server rewrite config'i doğrula.

---

# 41. Error Pages at Edge

CDN/proxy kaynaklı:

- 404
- 502
- 503

sayfalarının kullanıcıya anlamsız provider page göstermediğini değerlendir.

---

# 42. Maintenance Strategy

Planned maintenance gerekiyorsa:

- maintenance page
- status communication
- retry behavior

stratejisini değerlendir.

---

# 43. Status Page

Kritik kurumsal hizmetlerde public/internal status page gereksinimini değerlendir.

---

# 44. Domain Expiration

Domain auto-renew/monitoring erişimin varsa doğrula.

Erişim yoksa manual action olarak raporla.

---

# 45. Third-Party Quotas

Kritik servislerde:

- email quota
- API quota
- storage
- build minutes
- serverless invocations
- database limits

risklerini değerlendir.

---

# 46. Time / Timezone

Server ve uygulama timezone davranışını kontrol et.

Logs ve scheduled jobs için UTC/internal strategy ile user-facing locale davranışı tutarlı mı?

---

# 47. Secrets Rotation Readiness

Secret değiştiğinde downtime olmadan veya kontrollü şekilde rotate edilebiliyor mu?

Bilinmeyen secret değerlerini rapora yazma.

---

# 48. Production Smoke Test

Deploy edilmiş gerçek production URL üzerinde:

```text
Homepage
Critical route
Static assets
API
Form
Auth if applicable
404
robots.txt
sitemap.xml
analytics
error tracking
```

kontrol et.

---

# 49. Release Artifact

Deployment artifact'ının hangi commit/version'a ait olduğu izlenebilir olmalı.

Önerilen:

```text
commit SHA
release version
build timestamp
environment
```

---

# 50. P0/P1/P2/P3

## P0
Release blocker.

Örnek:

- yanlış production DB
- invalid TLS
- secrets exposure
- broken deploy
- no rollback + high-risk migration
- critical route 5xx
- production staging backend'e bağlı

## P1
Ciddi reliability/deployment riski.

## P2
Önemli iyileştirme.

## P3
Düşük riskli operasyonel iyileştirme.

---

# 51. Completion Checklist

```text
[ ] Architecture inventoried
[ ] Environments separated
[ ] Production env reviewed
[ ] localhost/staging/test leakage scanned
[ ] Production build passed
[ ] Typecheck/lint/tests reviewed
[ ] Repository hygiene checked
[ ] Lock file checked
[ ] CI/CD reviewed
[ ] Release controls reviewed
[ ] Deployment strategy reviewed
[ ] Rollback verified
[ ] DB migration strategy reviewed if applicable
[ ] DNS reviewed
[ ] Canonical host redirects checked
[ ] TLS checked
[ ] Certificate renewal checked
[ ] CDN checked
[ ] Cache headers checked
[ ] Compression checked
[ ] Reverse proxy/server config reviewed
[ ] Public exposure reviewed
[ ] Storage reviewed
[ ] Database readiness reviewed
[ ] Email infrastructure reviewed if applicable
[ ] Logging reviewed
[ ] Error tracking reviewed
[ ] Uptime monitoring reviewed
[ ] Health checks reviewed
[ ] Alerting reviewed
[ ] Backup reviewed
[ ] Restore test performed if possible
[ ] RPO/RTO evaluated
[ ] Resource limits evaluated
[ ] Scheduled jobs reviewed if applicable
[ ] Feature flags reviewed
[ ] Analytics production config reviewed
[ ] robots/sitemap production access checked
[ ] Static asset deployment consistency checked
[ ] SPA rewrites checked if applicable
[ ] Domain expiry monitoring evaluated
[ ] Third-party quotas evaluated
[ ] Final production smoke test passed
```

---

# FINAL REPORT

## 1. Executive Summary

## 2. Architecture

## 3. Environment Matrix

## 4. Findings Summary

| ID | Area | Finding | Priority | Status |
|---|---|---|---|---|

## 5. Deployment / CI-CD

## 6. DNS / TLS / CDN

## 7. Data / Storage / Backup

## 8. Monitoring / Logging / Alerting

## 9. Rollback Readiness

Açıkça:

```text
VERIFIED
NOT VERIFIED
FAILED
```

durumlarından birini ver.

## 10. Changes Implemented

## 11. Manual Actions Required

## 12. Remaining Risks

## 13. Evidence

## 14. Final Release Verdict

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

Bir release'i GO yapmak için P0 açık kalmamalı. P1 varsa gerekçeli risk kabulü olmadan GO verme.
