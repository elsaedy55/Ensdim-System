# SPRINT 09 — Reporting System + Alerts
# نظام التقارير والتنبيهات

---

## معلومات السبرينت

| المعلومة | التفاصيل |
|---|---|
| رقم السبرينت | 09 |
| المرحلة | Phase D — Integrations + Reporting |
| تاريخ البدء | 2026-10-09 |
| تاريخ الانتهاء | 2026-10-22 |
| المدة | أسبوعان |
| التقدير الزمني | ~38 ساعة |
| عدد المهام | 29 مهمة |
| Story Points | 40 |

---

## هدف السبرينت

> بنهاية هذا السبرينت، التقارير التلقائية تُرسَل يوميًا وأسبوعيًا وشهريًا على البريد الإلكتروني. القيادة تستيقظ كل صباح على ملخص أداء الموقع. نظام التنبيهات يُخطر الفريق فور حدوث أي شيء غير طبيعي.

---

## نتائج (Deliverables) السبرينت

- [ ] Daily email report يُرسَل تلقائيًا كل يوم 08:00
- [ ] Weekly PDF report يُرسَل كل اثنين 09:00
- [ ] Monthly Excel report يُرسَل أول كل شهر
- [ ] Reports يمكن تحميلها من الـ dashboard
- [ ] Alert system يقيّم التنبيهات كل ساعة
- [ ] Alert email يُرسَل عند تجاوز threshold
- [ ] Alert badge في الـ dashboard header

---

## معيار الإتمام (Definition of Done)

- [ ] 5 daily reports متتالية وصلت للـ recipients في الوقت المحدد
- [ ] PDF يفتح بشكل صحيح مع بيانات حقيقية
- [ ] Excel يحتوي على tabs متعددة بالبيانات الصحيحة
- [ ] Alert يُطلَق عند threshold = 0 خلال < ساعة
- [ ] TypeScript 0 errors

---

## المهام التفصيلية

### EPIC 1: Report Service (NestJS)
**الهدف:** خدمة التقارير تجمع البيانات وتُولِّد التقارير

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A09-001 | Report NestJS module setup | 🔴 | 1h | ⬜ |
| A09-002 | Daily report data aggregator (sessions/leads/conversions للأمس) | 🔴 | 2h | ⬜ |
| A09-003 | Weekly report data aggregator (7 days full data) | 🔴 | 2h | ⬜ |
| A09-004 | Monthly report data aggregator (full month data — all metrics) | 🔴 | 2h | ⬜ |

**تفاصيل A09-002 — Daily Report Data:**
```
بيانات التقرير اليومي:
- Sessions الأمس vs نفس اليوم الأسبوع الماضي
- Unique visitors الأمس
- Leads الأمس (breakdown بالـ tier)
- Conversions الأمس
- Top 3 landing pages
- Top traffic source
- أي alerts تم إطلاقها الأمس
```

---

### EPIC 2: Email Reports
**الهدف:** تقارير HTML بالبريد الإلكتروني

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A09-005 | SMTP configuration (@nestjs-modules/mailer) | 🔴 | 1h | ⬜ |
| A09-006 | Daily report HTML email template (inline CSS، بـ logo و KPI cards) | 🔴 | 2h | ⬜ |
| A09-007 | BullMQ cron — daily report job ('0 8 * * *') | 🔴 | 1h | ⬜ |
| A09-008 | BullMQ cron — weekly report job ('0 9 * * 1') | 🔴 | 1h | ⬜ |
| A09-009 | BullMQ cron — monthly report job ('0 9 1 * *') | 🔴 | 1h | ⬜ |
| A09-010 | Report recipients من .env (REPORT_RECIPIENTS=email1,email2) | 🟠 | 1h | ⬜ |

**تفاصيل A09-006 — Daily Email Template:**
```
Subject: 📊 Ensdim Analytics — Daily Report [2026-10-15]

┌─────────────────────────────────────────┐
│ [ENSDIM LOGO]    Daily Website Report   │
│ Thursday, October 15, 2026              │
├─────────────────────────────────────────┤
│ Yesterday's Performance                 │
├──────────┬──────────┬──────────┬────────┤
│ Sessions │ Visitors │  Leads   │  CVR   │
│   145    │   112    │    4     │  2.8%  │
│ ↑ 12%    │ ↑ 8%     │ ↑ 100%   │        │
├─────────────────────────────────────────┤
│ New Leads (Yesterday):                  │
│ 🔥 Ahmed M. — Web Dev — Organic         │
│ 🔥 Sara K. — Mobile App — LinkedIn      │
│ 🟡 Omar F. — WhatsApp Click             │
├─────────────────────────────────────────┤
│ Top Pages: /services/web-dev (45 views) │
└─────────────────────────────────────────┘
```

---

### EPIC 3: PDF Report Generation
**الهدف:** Weekly PDF report

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A09-011 | تثبيت وتهيئة Puppeteer | 🔴 | 1h | ⬜ |
| A09-012 | Weekly report HTML template (2-3 pages مع charts كـ images) | 🔴 | 3h | ⬜ |
| A09-013 | PDF generation service (Puppeteer page.pdf()) | 🔴 | 2h | ⬜ |
| A09-014 | PDF storage (حفظ في ./storage/reports/) | 🔴 | 1h | ⬜ |
| A09-015 | reports table INSERT عند كل report مُولَّد | 🔴 | 30m | ⬜ |

**تفاصيل A09-012 — Weekly Report Pages:**
```
Page 1: Executive Summary
  - KPIs (sessions/visitors/leads/CVR vs previous week)
  - Weekly trend chart (sessions + leads line chart)
  - Traffic source breakdown

Page 2: Lead Pipeline
  - Lead funnel (new/contacted/qualified/proposal)
  - Top lead sources
  - Lead list table (آخر أسبوع)

Page 3: Service & Portfolio Performance
  - Top services by views
  - Portfolio read rates
  - Conversion funnel summary
```

---

### EPIC 4: Excel Report Generation
**الهدف:** Monthly Excel report بـ tabs متعددة

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A09-016 | تثبيت exceljs | 🔴 | 30m | ⬜ |
| A09-017 | Monthly Excel builder (4 tabs: Traffic / Leads / Conversions / Services) | 🔴 | 3h | ⬜ |
| A09-018 | Excel file storage | 🔴 | 30m | ⬜ |

**تفاصيل A09-017 — Excel Tabs:**
```
Tab 1: Traffic
  - Daily sessions by source (30 rows × sources columns)
  - Device breakdown
  - Top 20 landing pages

Tab 2: Leads
  - Full lead list مع all fields (PII للـ admin فقط)
  - Lead by tier trend

Tab 3: Conversions
  - Conversion by type breakdown
  - Attribution analysis

Tab 4: Services
  - Service performance metrics
  - Portfolio metrics
```

---

### EPIC 5: Report APIs & Dashboard
**الهدف:** Dashboard يعرض ويُدير التقارير

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A09-019 | GET /reports (قائمة كل التقارير: type/date/status/download_url) | 🔴 | 1h | ⬜ |
| A09-020 | GET /reports/:id/download (stream file للـ client) | 🔴 | 1h | ⬜ |
| A09-021 | POST /reports/generate (توليد manual) | 🟠 | 1h | ⬜ |
| A09-022 | Reports Dashboard page (library + download + generate form) | 🔴 | 3h | ⬜ |

---

### EPIC 6: Alert System
**الهدف:** نظام تنبيهات يُطلَق عند تجاوز الـ thresholds

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A09-023 | Alert configuration CRUD API | 🔴 | 2h | ⬜ |
| A09-024 | Alert evaluation job — BullMQ cron (كل ساعة) | 🔴 | 2h | ⬜ |
| A09-025 | Alert threshold evaluation logic (gt / lt / change_pct) | 🔴 | 2h | ⬜ |
| A09-026 | Alert notification — email على trigger | 🔴 | 1h | ⬜ |
| A09-027 | Alert notification — WebSocket push live:alert_triggered | 🔴 | 1h | ⬜ |
| A09-028 | Alert management page في الـ dashboard (Admin only) | 🟠 | 2h | ⬜ |
| A09-029 | Alert badge في dashboard header (يعرض unacknowledged count) | 🟠 | 1h | ⬜ |

**تفاصيل A09-023 — Alert Examples:**
```
Alert 1: Zero Leads Day
  metric: daily_leads_count
  condition: lt (less than)
  threshold: 1
  severity: warning

Alert 2: Traffic Spike
  metric: hourly_sessions
  condition: change_pct (percentage change)
  threshold: 200 (200% increase)
  severity: info

Alert 3: High Bounce Rate
  metric: daily_bounce_rate
  condition: gt
  threshold: 80
  severity: warning
```

---

## خطة التنفيذ اليومية

| اليوم | المهام |
|---|---|
| Day 1 (Mon) | A09-001 → A09-004 (Report module + Data aggregators) |
| Day 2 (Tue) | A09-005 → A09-007 (SMTP + Daily email template + Daily cron) |
| Day 3 (Wed) | A09-008 → A09-010 (Weekly/Monthly crons + Recipients) |
| Day 4 (Thu) | A09-011 → A09-015 (PDF generation) |
| Day 5 (Fri) | A09-016 → A09-018 (Excel generation) |
| Day 6 (Mon) | A09-019 → A09-022 (Report APIs + Dashboard) |
| Day 7 (Tue) | A09-023 → A09-029 (Alert System) |

---

## المخاطر والتبعيات

| المخاطرة | الاحتمال | الحل |
|---|---|---|
| Puppeteer يستهلك ذاكرة كبيرة | متوسط | تشغيله في worker منفصل + إغلاق browser بعد كل PDF |
| Email spam filters تحجب التقارير | منخفض | استخدام SPF/DKIM صحيح + professional sender domain |
| PDF rendering يختلف بين OS environments | منخفض | اختبار على نفس OS الـ production (Linux) |

---

## قائمة التحقق (Sprint Review Checklist)

```
[ ] Daily email وصل الساعة 08:00 بالضبط
[ ] Email يحتوي بيانات أمس الصحيحة
[ ] PDF يُولَّد بدون أخطاء + يفتح بشكل صحيح
[ ] Excel يحتوي 4 tabs بيانات صحيحة
[ ] Report library في الـ dashboard يعرض كل التقارير
[ ] Download button ينزّل الملف الصحيح
[ ] Alert: threshold = 0 leads → email يصل خلال ساعة
[ ] Alert badge في header يعرض عدد التنبيهات غير المعترف بها
[ ] TypeScript 0 errors
```
