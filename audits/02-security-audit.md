# GOAL: Enterprise Web Application Security Audit, Hardening & Verification

Amaç mevcut web sitesi, backend, API ve ilgili altyapıyı production-grade application security seviyesine ulaştırmaktır.

Sadece rapor çıkarma. Analiz et, attack surface'i belirle, açıkları tespit et, root cause'u bul, güvenli şekilde düzelt, test et, regression kontrolü yap ve tekrar doğrula.

## 0. Yetki ve Güvenli Test Sınırları

Bu çalışma yalnızca proje sahibinin yetkilendirdiği sistemlere yöneliktir.

Yapma:
- üçüncü taraf sistemlere saldırı
- gerçek kullanıcı verisini indirme/değiştirme
- persistence/backdoor
- malware
- DoS/DDoS
- production hizmetini kesintiye sokacak yük
- gerçek secret/token'ı rapora kopyalama
- destructive test

Mümkünse local → test → staging → production-safe verification sırasını kullan.

## 1. Security Baseline

Güncel referanslar:
- OWASP Top 10
- OWASP ASVS
- OWASP Web Security Testing Guide
- OWASP Cheat Sheet Series
- Framework/runtime/cloud resmi security guidance

Checklist'i körlemesine uygulama; önce threat model oluştur.

## 2. Mimariyi Anla

Belirle:
Frontend, Backend, API, Database, Authentication, Authorization, File/Object storage, CDN, DNS, Hosting, Reverse proxy, Email, Third-party API, Analytics, Payment, CMS, Admin panel, CI/CD, Secrets management.

## 3. Attack Surface Inventory

Listele:
- public/auth/admin routes
- API endpoints
- uploads/downloads
- forms
- login/reset/verification
- OAuth callbacks
- webhooks
- search
- redirects
- GraphQL/WebSocket
- debug/health/metrics

Her biri için method, auth, authorization, params, data sensitivity, rate limits.

## 4. Threat Model

Assets, trust boundaries ve threat actors çıkar.

## 5. Source Code Security Review

Özellikle ara:
- `dangerouslySetInnerHTML`
- `innerHTML`
- `eval`
- `new Function`
- `exec/spawn`
- raw/dynamic SQL
- unsafe deserialization
- dynamic redirects
- filesystem operations
- URL fetching
- XML parsing
- JWT/cookie/crypto/password handling
- authorization/admin checks
- CORS

Data flow:
SOURCE → TRANSFORMATION → VALIDATION → AUTHORIZATION → SINK

## 6. Secret Scanning

Repository ve mümkünse Git history:
- API keys
- tokens
- JWT secrets
- DB credentials
- private keys
- cloud credentials
- SMTP passwords
- OAuth/webhook secrets
- `.env`

Secret değerlerini `[REDACTED]` yap. Commit edilmiş secret için revoke/rotate/history cleanup gereksinimini belirt.

## 7. Dependency / Supply Chain

Kontrol:
- known vulnerabilities
- outdated/abandoned package
- malicious/suspicious package
- duplicates/unnecessary deps
- unpinned deps
- confusion/typosquatting
- install/postinstall scripts
- registry config
- lock integrity

Scanner sonucunu otomatik gerçek vulnerability kabul etme.

## 8. Authentication Security

Login/logout/register/reset/email verification/MFA/OAuth/remember-me/recovery.

Password:
- plaintext/reversible encryption yok
- güvenli hashing/salt
- reset token güvenli, süreli, single-use

Enumeration ve brute-force korumalarını düşük hacimli kontrollü testle doğrula.

## 9. Authorization / Access Control — Kritik

Test:
- horizontal/vertical privilege escalation
- IDOR/BOLA
- role bypass
- admin access
- tenant/org isolation
- object ownership

Client-side gizleme authorization değildir; backend enforcement zorunlu.

## 10. Session Management

Secure, HttpOnly, SameSite, Domain, Path, Expiry, Rotation, Invalidation.

Session fixation ve logout/password-change davranışlarını kontrol et.

## 11. JWT / Token Security

Algorithm, signature, issuer, audience, expiry, nbf, key management, refresh token, revocation.

JWT payload'a hassas veri koyma.

## 12. Input Validation

URL/query/body/headers/cookies/filenames/uploads/webhooks.

Allow-list, type, length, range, format, schema validation.

Server-side validation zorunlu.

## 13. Injection

SQL, NoSQL, command, template, LDAP, XPath, header, CRLF, log injection.

Parameterized query/prepared statement kullan.

## 14. XSS

Reflected, stored, DOM XSS.

Risk alanları:
innerHTML, Markdown/WYSIWYG, URL params, search, profile/CMS content.

CSP defense-in-depth; XSS fix yerine geçmez.

## 15. CSRF

Cookie-auth state-changing işlemler:
CSRF token, SameSite, Origin/Referer değerlendirmesi, unsafe GET.

## 16. CORS

Wildcard, credentials, dynamic reflection, weak regex, localhost/staging, allowed methods/headers.

CORS auth sistemi değildir.

## 17. SSRF

URL preview, image fetch, webhook, import-by-URL, proxy, PDF generator, connector.

Allowed protocols, allow-list, redirects, internal IP, loopback, cloud metadata, DNS davranışı.

## 18. Open Redirect

`returnUrl`, `redirect`, `next`, `continue`.

Relative URL veya explicit allow-list tercih et.

## 19. File Upload

MIME, extension, magic bytes, size/count, filename sanitization, traversal, executable content, SVG/HTML/archive, storage, random filename, ACL.

## 20. Path Traversal

`../`, absolute path, encoded traversal, user-controlled filename/download/template/localization yolları.

## 21. Sensitive File Exposure

Kontrol:
`.env`, `.git`, backups, DB dumps, source maps, logs, configs, private keys, temp, old builds, zip/sql/bak.

Brute-force enumeration yapma.

## 22. Error Handling / Info Disclosure

Kullanıcıya stack trace, SQL, filesystem path, secret, API key, internal hostname, env göstermeme.

## 23. Security Headers

Değerlendir:
- CSP
- HSTS
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy
- frame-ancestors

Header yalnızca var/yok değil, policy kalitesiyle değerlendirilmeli.

## 24. CSP

default-src, script-src, style-src, img-src, connect-src, font-src, frame-src, object-src, base-uri, form-action, frame-ancestors.

`*`, `unsafe-inline`, `unsafe-eval` gereksiz kullanımlarını incele.

## 25. TLS / HTTPS

HTTP→HTTPS, valid certificate, chain, hostname, modern TLS, mixed content.

HSTS preload gibi geri dönüşü zor ayarları otomatik açma.

## 26. Cryptography

Custom crypto, deprecated alg, weak hashing, hard-coded key, static IV/nonce, insecure random, key storage/rotation.

## 27. Randomness

Security token'larında cryptographically secure RNG kullan; `Math.random()` kullanma.

## 28. API Security

Auth, authorization, object-level authorization, input/schema validation, mass assignment, excessive data exposure, pagination, rate limits, resource consumption, errors, methods.

## 29. Mass Assignment

`request.body → database.update()` benzeri kontrolsüz mapping engellenmeli.

Role/isAdmin/permissions/ownerId/balance/verified/status gibi alanlar explicit allow-list olmalı.

## 30. Rate Limiting / Abuse

Login, register, reset, OTP, resend, contact, search, expensive API, upload, public API.

Destructive load test yapma.

## 31. Business Logic

Workflow bypass, duplicate operation, pricing/discount abuse, approval bypass, ownership transfer, invitation abuse, race condition.

## 32. Race Conditions

Payment, inventory, coupon, quota, invitation, ownership, balance, permissions.

Kod/transaction/locking üzerinden değerlendir.

## 33. Webhook Security

Signature, timestamp, replay, secret management, source validation, idempotency, payload validation.

## 34. OAuth / OIDC

state, PKCE, redirect URI, nonce, token validation, issuer, audience, callback, account linking.

## 35. Database Security

Minimum privilege, public exposure, TLS, backup, credentials, RLS, tenant isolation, migrations.

## 36. Cloud / Storage

Public bucket, ACL, signed URL, expiry, upload perms, overwrite, enumeration, sensitive files.

## 37. Admin Panel

Auth, MFA mümkünse, authorization, role separation, sensitive actions, audit logs, sessions.

## 38. Debug / Development

Debug mode, test endpoints, mocks, toolbars, dev credentials, Swagger/OpenAPI exposure, GraphQL introspection, source maps, verbose logging.

Bağlama göre değerlendir.

## 39. Environment Variables

Browser bundle'a giren `VITE_*`, `NEXT_PUBLIC_*`, `PUBLIC_*` değerlerinde secret olmadığını doğrula.

## 40. Logging Security

Password, token, cookie, Authorization header, kart verisi, private key, API secret loglanmamalı.

Security olayları yeterli ölçüde loglanmalı.

## 41. Privacy / Data Minimization

Gereksiz kişisel veri, excessive API response, private fields, browser storage ve analytics payload'larını incele.

## 42. Browser Storage

localStorage, sessionStorage, IndexedDB, cookies, Cache Storage.

Token/hassas veri stratejisini XSS threat model'ıyla birlikte değerlendir.

## 43. Client-Side Source Review

Production bundle'da secret, internal hostname, source map, debug config, commented credential ara.

## 44. DNS / Domain Security

Dangling DNS, abandoned subdomain, staging subdomain, old deployment, takeover risk, CAA değerlendirmesi.

## 45. CI/CD Security

Secrets, token permissions, untrusted PR, third-party actions, pinned versions, artifact exposure, prod permissions, env separation.

## 46. Container / Deployment Security

Root user, unnecessary packages, exposed ports, baked-in secrets, outdated base image, writable FS, build context, `.dockerignore`.

## 47. Automated Security Tools

SAST, SCA, secret scanning, container/config scanning, header analysis, controlled DAST.

Scanner findings manually validate.

## 48. False Positive Policy

Her finding:
Finding, Affected component, Prerequisite, Evidence, Impact, Likelihood, Severity, Root cause, Fix, Verification status.

Doğrulanmayan risk: `Potential / Requires Verification`.

## 49. Severity Model

CRITICAL / HIGH / MEDIUM / LOW / INFORMATIONAL.

Exploitability, impact, privileges, user interaction, exposure, business context, mitigations birlikte değerlendir.

## 50. Remediation

Finding → Root Cause → Fix → Build → Security Re-test → Functional Regression.

## 51. Security Regression

Auth, authorization, forms, API, uploads, navigation, i18n, SEO, analytics, accessibility, responsive, tests, build.

## 52. Security Tests Ekle

Önemli fix'ler için regression test:
- unauthorized access → 403
- invalid ownership → denied
- malicious input → safely rejected/encoded
- expired token → rejected
- invalid webhook signature → rejected

## 53. No Security Theater

“HTTPS var”, “JWT var”, “ORM var”, “Cloudflare var”, “audit temiz” gibi ifadeleri tek başına güvenlik kanıtı kabul etme.

## 54. Release Blockers

Doğrulanmış ciddi:
- auth bypass
- authorization bypass
- exposed secret
- critical/high injection
- RCE
- serious stored XSS
- unrestricted upload
- critical SSRF
- sensitive data exposure
- admin compromise
- public prod DB
- exploitable critical dependency

varsa `NO-GO`.

## 55. Final Verification

Fix sonrası ilgili attack surface'i tekrar değerlendir.

## 56. Completion Checklist

Architecture, attack surface, threat model, source review, secrets, history, deps, auth, authorization, session, JWT, input, injection, XSS, CSRF, CORS, SSRF, redirects, uploads, traversal, sensitive files, headers, CSP, TLS, crypto, randomness, API, mass assignment, rate limit, business logic, race, webhooks, OAuth, DB, storage, admin, debug, env, bundle, logging, browser storage, CI/CD, deployment/container, scanners, validation, remediation, regression, final re-test.

Uygulanmayan: `N/A — reason`.
Doğrulanamayan: `NOT VERIFIED — reason`.

# FINAL SECURITY REPORT

## 1. Executive Summary
## 2. Scope
## 3. Architecture
## 4. Attack Surface
## 5. Findings Summary
## 6. Detailed Findings
## 7. Changes Implemented
## 8. Dependency Findings
## 9. Security Headers
## 10. Authentication & Authorization
## 11. Secrets
## 12. Remaining Risks
## 13. Automated Test Evidence
## 14. Final Re-test
## 15. Final Verdict

Yalnızca:
`PASS`, `PASS WITH WARNINGS`, `FAIL`

ve:
`GO`, `NO-GO`

Hiçbir güvenlik sonucunu uydurma.
