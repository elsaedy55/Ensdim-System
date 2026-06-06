# SPRINT 10 — Security + QA + Performance + Production Launch
# الأمان + ضمان الجودة + الأداء + الإطلاق في الإنتاج

---

## معلومات السبرينت

| المعلومة | التفاصيل |
|---|---|
| رقم السبرينت | 10 |
| المرحلة | Phase E — Launch |
| تاريخ البدء | 2026-10-23 |
| تاريخ الانتهاء | 2026-11-05 |
| المدة | أسبوعان |
| التقدير الزمني | ~38 ساعة |
| عدد المهام | 34 مهمة |
| Story Points | 40 |
| 🚀 Production Launch | نهاية هذا السبرينت |

---

## هدف السبرينت

> بنهاية هذا السبرينت، النظام مُطلَق في الإنتاج بشكل كامل. GDPR Cookie Consent يعمل، كل 35 حدث تُسجَّل في قاعدة بيانات الإنتاج، load test 500 events/s ناجح، وكل ثغرات الأمان مُغلَقة.

---

## نتائج (Deliverables) السبرينت

- [ ] Cookie consent banner يعمل في الموقع
- [ ] SDK لا يُرسَل أي event قبل الـ consent
- [ ] Data retention enforcement job يعمل
- [ ] Security audit: صفر ثغرات High/Critical
- [ ] Load test: 500 events/s لـ 10 دقائق بدون degradation
- [ ] كل 35 event تعمل في Production
- [ ] Production deployment مكتمل
- [ ] Monitoring وAlerts مُهيَّأة في Production

---

## معيار الإتمام (Definition of Done)

- [ ] كل 35 event verified في Production database
- [ ] Load test: 500 events/s × 10 min < 1% error rate
- [ ] Security: Zero High/Critical findings
- [ ] Cookie consent: لا events قبل consent (verified في incognito)
- [ ] RBAC: كل الأدوار تعمل صحيح في Production
- [ ] GA4 parity < 5% في Production data
- [ ] Monitoring alerts مُهيَّأة وتعمل

---

## المهام التفصيلية

### EPIC 1: GDPR Compliance
**الهدف:** النظام متوافق مع GDPR بالكامل

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A10-001 | Cookie consent banner component (Accept All / Reject All / Customize) | 🔴 | 3h | ⬜ |
| A10-002 | Consent levels: Necessary (always on) / Analytics (optional) / Marketing (optional) | 🔴 | 1h | ⬜ |
| A10-003 | SDK consent gate — event queue frozen حتى analytics consent = granted | 🔴 | 1h | ⬜ |
| A10-004 | GA4 consent mode: analytics_storage = denied حتى consent | 🔴 | 1h | ⬜ |
| A10-005 | Clarity: لا تُشغَّل حتى consent | 🔴 | 30m | ⬜ |
| A10-006 | Consent withdrawal: مسح analytics cookies + إيقاف tracking | 🔴 | 1h | ⬜ |
| A10-007 | Privacy policy link في consent banner | 🟠 | 30m | ⬜ |
| A10-008 | Data deletion API: DELETE /visitors/{anonymous_id} (GDPR request) | 🔴 | 2h | ⬜ |
| A10-009 | Data retention job: BullMQ monthly cron — يحذف records الأقدم من 24 شهر | 🔴 | 2h | ⬜ |

**تفاصيل A10-001 — Cookie Consent Banner:**
```
┌─────────────────────────────────────────────────────┐
│ 🍪 نستخدم الكوكيز لتحليل الزيارات وتحسين الموقع   │
│                                                     │
│ [قبول الكل]  [رفض غير الضروري]  [الإعدادات ▾]     │
│                          [سياسة الخصوصية]           │
└─────────────────────────────────────────────────────┘
```

**تفاصيل A10-003 — SDK Consent Gate:**
```typescript
// events تُخزَّن في queue مؤقتة
// عند: consent → granted
//   flush queue → ترسل للـ API
// عند: consent → denied
//   clear queue → لا ترسل شيء
// عند: consent withdrawal
//   stop SDK + clear all analytics cookies
```

**تفاصيل A10-009 — Data Retention:**
```
Cron: '0 3 1 * *' (أول كل شهر الساعة 03:00)
Actions:
  DELETE FROM events WHERE event_timestamp < NOW() - INTERVAL '24 months'
  DELETE FROM sessions WHERE started_at < NOW() - INTERVAL '24 months'
  UPDATE visitors SET fingerprint_hash = NULL
    WHERE last_seen_at < NOW() - INTERVAL '36 months'
  DELETE FROM audit_logs WHERE created_at < NOW() - INTERVAL '12 months'
```

---

### EPIC 2: Security Hardening
**الهدف:** كل طبقات الأمان مُختبَرة ومُصلَحة

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A10-010 | Rate limiting audit + hardening (جميع endpoints) | 🔴 | 1h | ⬜ |
| A10-011 | CORS configuration verification في Production | 🔴 | 30m | ⬜ |
| A10-012 | Input validation audit — كل DTOs ضد XSS وSQL injection payloads | 🔴 | 2h | ⬜ |
| A10-013 | SQL injection test (automated: sqlmap على non-prod) | 🔴 | 1h | ⬜ |
| A10-014 | XSS test — inject script في event properties → verify sanitization | 🔴 | 1h | ⬜ |
| A10-015 | Auth bypass test — dashboard routes بدون JWT → 401 | 🔴 | 1h | ⬜ |
| A10-016 | PII exposure test — inspect كل API responses لعدم وجود raw PII | 🔴 | 1h | ⬜ |

---

### EPIC 3: Performance Optimization
**الهدف:** Dashboard queries سريعة، API يتحمل الضغط

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A10-017 | EXPLAIN ANALYZE على كل heavy dashboard queries | 🔴 | 2h | ⬜ |
| A10-018 | إضافة indexes مفقودة بناءً على query plans | 🔴 | 1h | ⬜ |
| A10-019 | Redis cache لأكثر 5 dashboard APIs استدعاءً (5-min TTL) | 🔴 | 2h | ⬜ |
| A10-020 | Dashboard API response verification: P95 < 2 ثانية | 🔴 | 1h | ⬜ |

---

### EPIC 4: Load Testing
**الهدف:** النظام يتحمل 500 events/s

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A10-021 | k6 load test script — 500 events/s لمدة 10 دقائق | 🔴 | 2h | ⬜ |
| A10-022 | k6 WebSocket test — 50 concurrent dashboard connections | 🔴 | 1h | ⬜ |
| A10-023 | تحليل load test results وإصلاح bottlenecks | 🔴 | 2h | ⬜ |

**تفاصيل A10-021 — Load Test Targets:**
```
Test 1: Normal Traffic
  VUs: 10, Rate: 50 events/s, Duration: 5 min
  Target: < 0.1% errors, P95 latency < 500ms

Test 2: Campaign Spike
  VUs: 50, Rate: 500 events/s, Duration: 10 min
  Target: < 1% errors, P95 latency < 1s

Test 3: WebSocket Connections
  Concurrent WS: 50 for 10 minutes
  Target: Zero disconnections, all events received
```

---

### EPIC 5: Tracking QA (35 Events Verification)
**الهدف:** اختبار يدوي شامل لكل الـ 35 events

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A10-024 | Manual test checklist — كل الـ 35 events على staging | 🔴 | 3h | ⬜ |
| A10-025 | GA4 DebugView final verification في staging | 🔴 | 1h | ⬜ |
| A10-026 | Clarity PII masking verification (visual check في recordings) | 🔴 | 30m | ⬜ |
| A10-027 | Cross-browser test: Chrome / Firefox / Safari / Mobile Chrome / Mobile Safari | 🔴 | 2h | ⬜ |
| A10-028 | Bot filtering test: Googlebot user-agent → is_bot = true | 🔴 | 30m | ⬜ |
| A10-029 | Consent blocking test: incognito → reject consent → verify no events | 🔴 | 1h | ⬜ |

**تفاصيل A10-024 — 35 Events Test Checklist:**
```
Navigation Events (P0):
[ ] session_start         → DB: sessions table
[ ] page_view             → DB: events table
[ ] session_end           → DB: sessions.duration_seconds صحيح

Service Events (P0):
[ ] service_page_view     → /services
[ ] service_detail_view   → /services/:slug
[ ] service_cta_click     → click CTA button

Portfolio Events (P0):
[ ] portfolio_page_view   → /portfolio
[ ] portfolio_case_study_view → /case-studies/:slug
[ ] portfolio_cta_click   → click portfolio CTA

Contact Events (P0):
[ ] contact_page_view     → /contact
[ ] hero_cta_click        → click hero button

Channel Events (P0):
[ ] whatsapp_click        → click float + contact page
[ ] phone_click           → click tel: link
[ ] email_click           → click mailto: link
[ ] company_profile_download → click download link

Conversion Events (P0):
[ ] quote_request_start   → focus form field
[ ] quote_request_field_complete → blur field
[ ] quote_request_submit  → submit form
[ ] quote_request_abandon → start + navigate away
[ ] consultation_book_start
[ ] consultation_book_submit

P1 Events:
[ ] scroll_depth 25/50/75/90%
[ ] service_scroll_depth
[ ] portfolio_case_study_scroll
[ ] blog_scroll_depth
[ ] time_on_page heartbeat
[ ] blog_post_view
[ ] blog_cta_click
[ ] portfolio_filter_apply
[ ] navigation_click

System Events:
[ ] lead_created           → leads table
[ ] conversion_completed   → conversions table
[ ] error_page_view        → 404 page
```

---

### EPIC 6: Production Deployment
**الهدف:** النظام يعمل في الإنتاج

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A10-030 | Production database migration (all 13 tables + partitioning) | 🔴 | 1h | ⬜ |
| A10-031 | Production environment configuration (.env.production) | 🔴 | 1h | ⬜ |
| A10-032 | Deploy analytics API إلى production server | 🔴 | 1h | ⬜ |
| A10-033 | Production tracking SDK: تحديث VITE_ANALYTICS_URL في website | 🔴 | 30m | ⬜ |
| A10-034 | تهيئة Sentry error monitoring للـ analytics API | 🟠 | 1h | ⬜ |
| A10-035 | تهيئة uptime monitoring (UptimeRobot أو Better Uptime) | 🟠 | 30m | ⬜ |
| A10-036 | تهيئة production alert thresholds (zero leads alert، etc.) | 🟠 | 1h | ⬜ |
| A10-037 | Team runbook — كيفية debugging tracking issues | 🟠 | 2h | ⬜ |

**Production Deployment Checklist:**
```
Infrastructure:
[ ] PostgreSQL 16 على production server
[ ] Redis 7 على production server
[ ] NestJS analytics-api deployed + running
[ ] Process manager (PM2) configured + auto-restart
[ ] SSL/TLS certificate valid
[ ] Firewall rules: DB port closed to public

Application:
[ ] All environment variables set correctly
[ ] Prisma migrations applied
[ ] BullMQ queues initialized
[ ] Socket.IO gateway accepting connections

Verification:
[ ] POST /track/events → 202 Accepted (from production website)
[ ] GET /analytics/executive/kpis → 200 with data
[ ] WebSocket connection established from dashboard
[ ] First production event in DB
```

---

## خطة التنفيذ اليومية

| اليوم | المهام |
|---|---|
| Day 1 (Mon) | A10-001 → A10-005 (GDPR: Consent banner + SDK gate + Third-party blocks) |
| Day 2 (Tue) | A10-006 → A10-009 (GDPR: Withdrawal + Data deletion + Retention) |
| Day 3 (Wed) | A10-010 → A10-016 (Security hardening + Testing) |
| Day 4 (Thu) | A10-017 → A10-020 (Performance optimization) |
| Day 5 (Fri) | A10-021 → A10-023 (Load testing + Fixes) |
| Day 6 (Mon) | A10-024 → A10-029 (35 events QA + Cross-browser) |
| Day 7 (Tue) | A10-030 → A10-037 (Production deployment + Monitoring) 🚀 |

---

## المخاطر والتبعيات

| المخاطرة | الاحتمال | الحل |
|---|---|---|
| Load test يكشف bottleneck في الـ DB | متوسط | يوم buffer للـ fixes (يمكن نقل Day 7 ليصبح Day 8) |
| Production DB migration يفشل | منخفض | Backup قبل migration + rollback plan جاهز |
| Consent banner تعارض مع design الموقع | منخفض | Coordinate مع Design قبل البناء |

---

## 🚀 Production Launch Announcement

```
بعد اكتمال Sprint 10:

✅ System is LIVE in Production
✅ 35 events tracked
✅ 8 dashboards operational
✅ Automated reports running
✅ GDPR compliant
✅ GA4 + Clarity integrated
✅ Real-time dashboard operational
✅ Lead alerts active
```

---

## قائمة التحقق (Sprint Review Checklist)

```
[ ] Consent banner: يظهر في أول زيارة incognito
[ ] Consent banner: Reject → لا events تُرسَل (verified في Network tab)
[ ] Consent banner: Accept → events تُرسَل طبيعي
[ ] Data deletion API: DELETE → visitor records تُحذف من DB
[ ] Security: Zero High/Critical findings
[ ] Load test: 500 events/s × 10 min < 1% errors
[ ] WS test: 50 connections × 10 min → zero disconnections
[ ] 35 events: كلهم verified في Production DB
[ ] Cross-browser: Chrome / Firefox / Safari / Mobile → Pass
[ ] Bot filtering: Googlebot → is_bot = true في Production
[ ] GA4: events تظهر في GA4 Realtime في Production
[ ] Clarity: recordings تظهر في Production
[ ] Monitoring: Sentry + Uptime configured
[ ] Team runbook: كامل ومراجع من الفريق
[ ] TypeScript 0 errors
[ ] 🚀 PRODUCTION IS LIVE
```
