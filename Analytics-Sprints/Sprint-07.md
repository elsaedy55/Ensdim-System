# SPRINT 07 — Lead + Conversion + Funnel + Portfolio Dashboards
# لوحات Leads والتحويلات والـ Funnels والبورتفوليو

---

## معلومات السبرينت

| المعلومة | التفاصيل |
|---|---|
| رقم السبرينت | 07 |
| المرحلة | Phase C — Dashboards |
| تاريخ البدء | 2026-09-11 |
| تاريخ الانتهاء | 2026-09-24 |
| المدة | أسبوعان |
| التقدير الزمني | ~44 ساعة |
| عدد المهام | 35 مهمة |
| Story Points | 40 |

---

## هدف السبرينت

> بنهاية هذا السبرينت، فريق المبيعات لديه Lead Dashboard كامل يرى فيه كل تفاصيل الـ lead وتاريخ جلسته، وفريق الـ Marketing يرى Conversion Dashboard وFunnel Drop-off وPortfolio Analytics.

---

## نتائج (Deliverables) السبرينت

- [ ] Lead Dashboard مكتملة بكل الـ widgets + Detail Drawer
- [ ] Session history timeline في الـ drawer
- [ ] Lead export CSV يعمل
- [ ] Conversion Dashboard مكتملة
- [ ] Funnel visualization component يعمل
- [ ] Portfolio Dashboard مكتملة

---

## معيار الإتمام (Definition of Done)

- [ ] Sales user يفتح lead → يرى كل الصفحات المزورة والأحداث
- [ ] Clarity recording link في الـ drawer يفتح التسجيل المناسب
- [ ] Funnel drop-off percentages صحيحة (تحقق يدوي)
- [ ] Lead export CSV يحتوي على البيانات الصحيحة
- [ ] TypeScript 0 errors

---

## المهام التفصيلية

### EPIC 1: Lead Dashboard APIs
**الهدف:** APIs لكل احتياجات الـ Lead Dashboard

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A07-001 | GET /leads?tier=&status=&source=&from=&to=&page=&limit= | 🔴 | 2h | ⬜ |
| A07-002 | GET /leads/:id (full detail — PII مُفكَّكة للـ Admin/Sales) | 🔴 | 2h | ⬜ |
| A07-003 | GET /leads/:id/session-history | 🔴 | 1h | ⬜ |
| A07-004 | PATCH /leads/:id { status: 'contacted' \| 'qualified' \| ... } | 🔴 | 1h | ⬜ |
| A07-005 | GET /analytics/leads/trends?from=&to= | 🔴 | 1h | ⬜ |
| A07-006 | GET /leads/export?format=csv&...filters | 🟠 | 1h | ⬜ |

**تفاصيل A07-002 — Lead Detail Response:**
```json
{
  "id": "uuid",
  "tier": "hot",
  "status": "new",
  "name": "Ahmed Mohamed",
  "email": "ahmed@company.com",   ← مُفكَّكة هنا فقط
  "phone": "+201234567890",       ← مُفكَّكة هنا فقط
  "service_interest": "web-development",
  "source": "organic_search",
  "utm_campaign": null,
  "device_type": "desktop",
  "country": "EG",
  "city": "Cairo",
  "ga4_client_id": "GA1.1.xxx",
  "clarity_session_id": "xxx",
  "created_at": "2026-09-12T10:30:00Z",
  "attribution_first": { ... },
  "attribution_last": { ... }
}
```

---

### EPIC 2: Lead Dashboard (Next.js)
**الهدف:** لوحة المبيعات الكاملة

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A07-007 | Lead Dashboard page layout | 🔴 | 1h | ⬜ |
| A07-008 | Lead tier stat cards (Hot / Warm / Interested counts) | 🔴 | 1h | ⬜ |
| A07-009 | Lead table (sortable / paginated / filterable) | 🔴 | 3h | ⬜ |
| A07-010 | Lead filter bar (tier / status / source / date range) | 🔴 | 1h | ⬜ |
| A07-011 | Lead detail drawer (Sheet component — يفتح من يسار) | 🔴 | 3h | ⬜ |
| A07-012 | Session history timeline داخل الـ drawer | 🔴 | 2h | ⬜ |
| A07-013 | Clarity recording link button (يفتح Clarity في tab جديد) | 🟠 | 30m | ⬜ |
| A07-014 | Lead status update dropdown في الـ drawer | 🔴 | 1h | ⬜ |
| A07-015 | Lead export CSV button | 🟠 | 1h | ⬜ |
| A07-016 | Lead source bar chart | 🟠 | 1h | ⬜ |

**تفاصيل A07-009 — Lead Table Columns:**
```
| Tier | Name | Service Interest | Source | Sessions | Last Seen | Status | Actions |
|------|------|-----------------|--------|----------|-----------|--------|---------|
| 🔥 Hot | Ahmed M. | Web Dev | Organic | 3 | 2h ago | New | ··· |
| 🟡 Warm | Sara K. | Mobile App | LinkedIn | 1 | 5h ago | Contacted | ··· |
```

**تفاصيل A07-012 — Session History Timeline:**
```
Session 1 (2026-09-10 | Organic Search | Desktop)
  └─ Home → Services → Web Development [8 min]

Session 2 (2026-09-11 | Direct | Mobile)
  └─ Web Development → Portfolio → [Exit] [3 min]

Session 3 (2026-09-12 | Direct | Desktop) ← Converted
  └─ Home → Contact → [Quote Form Submit] [12 min]
```

---

### EPIC 3: Conversion Dashboard
**الهدف:** تحليل التحويلات ومسارها

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A07-017 | GET /analytics/conversions/summary?from=&to= | 🔴 | 1h | ⬜ |
| A07-018 | GET /analytics/conversions/by-type?from=&to= | 🔴 | 1h | ⬜ |
| A07-019 | GET /analytics/conversions/attribution?from=&to= | 🔴 | 1h | ⬜ |
| A07-020 | Conversion Dashboard page layout | 🔴 | 1h | ⬜ |
| A07-021 | Conversion rate trend line chart | 🔴 | 1h | ⬜ |
| A07-022 | Conversion by type donut chart | 🔴 | 1h | ⬜ |
| A07-023 | Attribution by source bar chart | 🔴 | 1h | ⬜ |
| A07-024 | Time to convert histogram | 🟠 | 2h | ⬜ |
| A07-025 | Pages before conversion bar chart | 🟠 | 1h | ⬜ |

---

### EPIC 4: Funnel Dashboard
**الهدف:** تصور drop-off في كل مرحلة من مراحل الـ funnel

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A07-026 | GET /analytics/funnels/:id/results?from=&to= | 🔴 | 1h | ⬜ |
| A07-027 | Funnel visualization component (step-by-step drop-off bars) | 🔴 | 3h | ⬜ |
| A07-028 | Funnel selector dropdown (تبديل بين الـ 3 funnels) | 🟠 | 1h | ⬜ |
| A07-029 | Drop-off rate + count per step (يظهر تحت كل خطوة) | 🔴 | 1h | ⬜ |

**تفاصيل A07-027 — Funnel Visualization:**
```
Quote Request Funnel — Last 30 Days

Step 1: Session Start          1,250  ████████████████████  100%
Step 2: Service/Portfolio View   680  █████████████▌        54.4%  ↓ 45.6%
Step 3: Contact Page View        195  ████▌                 15.6%  ↓ 71.3%
Step 4: Form Start                82  ██                     6.6%  ↓ 57.9%
Step 5: Form Submit               37  █                      3.0%  ↓ 54.9%
```

---

### EPIC 5: Portfolio Dashboard
**الهدف:** قياس فعالية البورتفوليو كأداة مبيعات

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A07-030 | GET /analytics/portfolio/ranking?from=&to= | 🔴 | 1h | ⬜ |
| A07-031 | GET /analytics/portfolio/:slug/detail?from=&to= | 🟠 | 1h | ⬜ |
| A07-032 | Portfolio Dashboard page layout | 🔴 | 1h | ⬜ |
| A07-033 | Top case studies by views bar chart | 🔴 | 1h | ⬜ |
| A07-034 | Top case studies by read completion (scroll 75%+) bar | 🔴 | 1h | ⬜ |
| A07-035 | Case study detail table | 🟠 | 1h | ⬜ |

---

## خطة التنفيذ اليومية

| اليوم | المهام |
|---|---|
| Day 1 (Mon) | A07-001 → A07-006 (Lead APIs) |
| Day 2 (Tue) | A07-007 → A07-010 (Lead Dashboard: layout + table + filters) |
| Day 3 (Wed) | A07-011 → A07-013 (Lead detail drawer + session history) |
| Day 4 (Thu) | A07-014 → A07-016 + A07-017 → A07-019 (Lead actions + Conversion APIs) |
| Day 5 (Fri) | A07-020 → A07-025 (Conversion Dashboard) |
| Day 6 (Mon) | A07-026 → A07-029 (Funnel Dashboard) |
| Day 7 (Tue) | A07-030 → A07-035 (Portfolio Dashboard) + Testing |

---

## المخاطر والتبعيات

| المخاطرة | الاحتمال | الحل |
|---|---|---|
| PII decryption performance في Lead list | منخفض | Decrypt فقط في lead detail — الـ list يعرض name فقط |
| Funnel visualization UX معقد | متوسط | استخدام Recharts BarChart مع custom shape |

---

## قائمة التحقق (Sprint Review Checklist)

```
[ ] Lead table: 10 leads تظهر صحيحة مع filter بـ tier
[ ] Lead detail drawer: يفتح ويعرض PII + session history
[ ] Clarity link في الـ drawer: يفتح Clarity recording
[ ] Lead export: CSV يُنزَّل بالبيانات الصحيحة
[ ] Funnel chart: drop-off percentages صحيحة
[ ] Funnel selector: التبديل بين 3 funnels يعمل
[ ] Conversion Dashboard: donut chart يعرض breakdown صحيح
[ ] Portfolio Dashboard: case studies مرتبة بالـ views
[ ] RBAC: Sales يرى Lead Dashboard ولكن لا يرى email/phone من غير permission خاص
[ ] TypeScript 0 errors
```
