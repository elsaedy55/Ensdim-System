# ENSDIM WEBSITE — ANALYTICS & BI SYSTEM ROADMAP
# خارطة طريق نظام التحليلات والذكاء التجاري

---

## نظرة عامة

| المعلومة | التفاصيل |
|---|---|
| اسم المشروع | Ensdim Website Analytics & BI System |
| نوع المشروع | Internal Analytics + Business Intelligence |
| الموقع المستهدف | ensdim-wepsite (React + Vite) |
| إجمالي السبرينتات | 11 سبرينت (Sprint 00 → Sprint 10) |
| مدة السبرينت | أسبوعان لكل سبرينت |
| الإجمالي التقديري | 22 أسبوع (~5.5 شهر) |
| تاريخ البدء | 2026-06-05 |
| تاريخ الانتهاء المتوقع | 2026-11-15 |

---

## مراحل المشروع الكبرى

```
PHASE A — FOUNDATION (Sprint 00–01)
Sprint 00: Infrastructure + Database + Security Foundation
Sprint 01: Tracking SDK Core

PHASE B — EVENT COVERAGE (Sprint 02–04)
Sprint 02: P0 Events Implementation
Sprint 03: Lead & Conversion Pipeline
Sprint 04: P1 Events + Analytics Engine

PHASE C — REAL-TIME + DASHBOARDS (Sprint 05–07)
Sprint 05: Real-Time Analytics System
Sprint 06: Core Dashboards (Executive + Traffic + Service)
Sprint 07: Lead, Conversion, Funnel & Portfolio Dashboards

PHASE D — INTEGRATIONS + REPORTING (Sprint 08–09)
Sprint 08: Google Analytics 4 + Microsoft Clarity Integration
Sprint 09: Reporting System + Alerts

PHASE E — LAUNCH (Sprint 10)
Sprint 10: Security, QA, Performance & Production Launch
```

---

## خريطة الجداول الزمنية

```
أسبوع  1–2  │ Sprint 00 │ Infrastructure + DB + Security Foundation
أسبوع  3–4  │ Sprint 01 │ Tracking SDK Core
أسبوع  5–6  │ Sprint 02 │ P0 Events (18 events)
أسبوع  7–8  │ Sprint 03 │ Lead & Conversion Pipeline
أسبوع  9–10 │ Sprint 04 │ P1 Events + Analytics Engine
أسبوع 11–12 │ Sprint 05 │ Real-Time Analytics System
أسبوع 13–14 │ Sprint 06 │ Core Dashboards
أسبوع 15–16 │ Sprint 07 │ Lead + Conversion + Funnel + Portfolio Dashboards
أسبوع 17–18 │ Sprint 08 │ GA4 + Microsoft Clarity Integration
أسبوع 19–20 │ Sprint 09 │ Reporting System + Alerts
أسبوع 21–22 │ Sprint 10 │ Security + QA + Performance + Production Launch
```

---

## ملخص السبرينتات

### Sprint 00 — Infrastructure & Setup
- **الهدف:** كل البنية التحتية جاهزة ويستطيع الفريق يبدأ البناء فورًا
- **المخرجات:** NestJS analytics service + PostgreSQL (13 tables) + Redis + BullMQ + CI/CD
- **معيار الإتمام:** `pnpm dev` يشغّل الـ analytics API محليًا، كل الجداول موجودة في staging

### Sprint 01 — Tracking SDK Core
- **الهدف:** SDK يلتقط الجلسات ويرسل الأحداث الأساسية للـ API
- **المخرجات:** Tracking SDK + Anonymous ID + Session lifecycle + Core 3 events working
- **معيار الإتمام:** session_start / page_view / session_end موجودة في قاعدة البيانات

### Sprint 02 — P0 Events Implementation
- **الهدف:** كل الـ 18 أحداث الحرجة (P0) تعمل
- **المخرجات:** Service/Portfolio/Contact/Channel events + Geo enrichment + Bot detection
- **معيار الإتمام:** كل P0 events اتحققت يدويًا في staging database

### Sprint 03 — Lead & Conversion Pipeline
- **الهدف:** كل lead يُخلق مع كامل بيانات الجلسة والإسناد
- **المخرجات:** Quote form events + Lead creation service + Conversions table + Lead notifications
- **معيار الإتمام:** Submit quote form → lead record in DB with full session history

### Sprint 04 — P1 Events + Analytics Engine
- **الهدف:** كل الـ 10 أحداث P1 تعمل + محرك التجميع يعمل
- **المخرجات:** Scroll depth + Time on page + Hourly aggregations + Funnel calculations
- **معيار الإتمام:** metrics_daily مملوء بيانات صحيحة + funnel results محسوبة

### Sprint 05 — Real-Time Analytics System
- **الهدف:** Real-Time Dashboard يعرض بيانات حية بأقل من 5 ثواني
- **المخرجات:** Redis live state + Socket.IO gateway + Real-Time Dashboard UI
- **معيار الإتمام:** Event في المتصفح → يظهر في Live Feed في ≤ 5 ثواني

### Sprint 06 — Core Dashboards
- **الهدف:** Executive + Traffic + Service Dashboards تعمل بيانات حقيقية
- **المخرجات:** 3 dashboards كاملة + Date range filter + RBAC
- **معيار الإتمام:** كل الـ charts تعرض بيانات صحيحة وتستجيب لـ date filter

### Sprint 07 — Lead + Conversion + Funnel + Portfolio Dashboards
- **الهدف:** Sales team وMarketing team لهم dashboards مخصصة
- **المخرجات:** Lead Dashboard (with full drawer) + Conversion + Funnel + Portfolio dashboards
- **معيار الإتمام:** Sales يفتح lead detail ويشوف كامل journey + Funnel drop-off صحيح

### Sprint 08 — GA4 + Microsoft Clarity Integration
- **الهدف:** كل P0 events متزامنة مع GA4، Clarity مثبت ومهيأ
- **المخرجات:** All events mirrored to GA4 + Custom dimensions + Clarity installation + Session linking
- **معيار الإتمام:** GA4 DebugView يعرض كل الأحداث + < 5% variance من internal counts

### Sprint 09 — Reporting System + Alerts
- **الهدف:** تقارير تلقائية يومية/أسبوعية/شهرية + نظام تنبيهات
- **المخرجات:** Email reports + PDF/Excel generation + Alert system + Reports dashboard
- **معيار الإتمام:** 5 تقارير يومية متتالية وصلت للـ recipients في الوقت المحدد

### Sprint 10 — Security, QA, Performance & Launch
- **الهدف:** الموافقة على GDPR + اجتياز Security audit + Launch في Production
- **المخرجات:** Cookie consent + Data retention + Load test passed + Production deployed
- **معيار الإتمام:** كل 35 event تعمل في Production + Load test 500 events/s ناجح

---

## MVP Scope

### الـ MVP يُطلق بعد Sprint 03 (~أسبوع 8)

| الوحدة | مشمول في MVP |
|---|---|
| Session & Visitor Tracking | ✅ |
| P0 Events (18 events) | ✅ |
| Lead Creation Pipeline | ✅ |
| Basic Lead List (simple table) | ✅ |
| GA4 Basic Events | ✅ |
| Real-Time Dashboard | ❌ (Sprint 05) |
| Full Dashboards | ❌ (Sprint 06–07) |
| Reporting System | ❌ (Sprint 09) |
| GDPR Compliance | ❌ (Sprint 10) |

---

## Tech Stack

| الطبقة | التقنية |
|---|---|
| Website | React + Vite (ensdim-wepsite) |
| Tracking SDK | Custom TypeScript module |
| Analytics API | NestJS + TypeScript |
| Database | PostgreSQL 16 + Prisma ORM |
| Queue | BullMQ + Redis |
| Real-Time | Socket.IO + Redis Pub/Sub |
| Cache | Redis 7 |
| Dashboard | Next.js (integrated in Ensdim admin or standalone) |
| Charts | Recharts |
| PDF Reports | Puppeteer |
| Excel Reports | exceljs |
| Geo Enrichment | ip-api.com → MaxMind GeoLite2 (at scale) |
| GA4 | gtag.js |
| MS Clarity | clarity.js snippet |

---

## معايير الجودة

| المعيار | الهدف |
|---|---|
| Event capture rate | ≥ 99.5% |
| Data pipeline latency | < 500ms |
| Real-Time dashboard freshness | < 5 ثواني |
| Dashboard query response | P95 < 2 ثانية |
| Load test throughput | 500 events/s بدون degradation |
| GA4 parity | ± 5% من internal counts |
| Report delivery | 100% on schedule |

---

## تعريف "مكتمل" لكل مهمة

مهمة تعتبر مكتملة عندما:

- [ ] الـ unit tests عدد 0 failures
- [ ] الـ event يظهر في قاعدة البيانات بالـ properties الصحيحة
- [ ] الـ TypeScript بدون أخطاء
- [ ] لا توجد console errors
- [ ] لا يوجد PII (IP/Email/Phone) بدون تشفير أو hashing
- [ ] الـ API response time < 2 ثانية

---

## روابط الوثائق

| الوثيقة | المسار |
|---|---|
| System Design Full Plan | محادثة Claude Code (2026-06-05) |
| BACKLOG | `Analytics-Sprints/BACKLOG.md` |
| Sprint 00 | `Analytics-Sprints/Sprint-00.md` |
| Sprint 01 | `Analytics-Sprints/Sprint-01.md` |
| Sprint 02 | `Analytics-Sprints/Sprint-02.md` |
| Sprint 03 | `Analytics-Sprints/Sprint-03.md` |
| Sprint 04 | `Analytics-Sprints/Sprint-04.md` |
| Sprint 05 | `Analytics-Sprints/Sprint-05.md` |
| Sprint 06 | `Analytics-Sprints/Sprint-06.md` |
| Sprint 07 | `Analytics-Sprints/Sprint-07.md` |
| Sprint 08 | `Analytics-Sprints/Sprint-08.md` |
| Sprint 09 | `Analytics-Sprints/Sprint-09.md` |
| Sprint 10 | `Analytics-Sprints/Sprint-10.md` |
