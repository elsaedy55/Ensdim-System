# SPRINT 06 — Core Dashboards
# لوحات القيادة الأساسية (Executive + Traffic + Service)

---

## معلومات السبرينت

| المعلومة | التفاصيل |
|---|---|
| رقم السبرينت | 06 |
| المرحلة | Phase C — Dashboards |
| تاريخ البدء | 2026-08-28 |
| تاريخ الانتهاء | 2026-09-10 |
| المدة | أسبوعان |
| التقدير الزمني | ~42 ساعة |
| عدد المهام | 34 مهمة |
| Story Points | 40 |

---

## هدف السبرينت

> بنهاية هذا السبرينت، ثلاث لوحات قيادة مكتملة: Executive Dashboard للقيادة، Traffic Dashboard للـ Marketing، وService Dashboard لمعرفة أداء صفحات الخدمات. كل لوحة تعمل بيانات حقيقية من الـ metrics_daily مع فلتر التاريخ.

---

## نتائج (Deliverables) السبرينت

- [ ] Dashboard shell جاهز (sidebar + layout)
- [ ] Date range picker component جاهز ويعمل
- [ ] RBAC للـ dashboard routes جاهز
- [ ] Redis cache للـ dashboard APIs جاهز
- [ ] 10 dashboard API endpoints جاهزة
- [ ] Executive Dashboard مكتملة بكل الـ widgets
- [ ] Traffic Dashboard مكتملة
- [ ] Service Dashboard مكتملة

---

## معيار الإتمام (Definition of Done)

- [ ] كل الـ charts تعرض بيانات حقيقية صحيحة
- [ ] Date range filter يغير البيانات في كل الـ charts
- [ ] Dashboard API response P95 < 2 ثانية
- [ ] RBAC: Viewer يرى Executive فقط، Analyst يرى كل شيء
- [ ] TypeScript 0 errors

---

## المهام التفصيلية

### EPIC 1: Dashboard APIs
**الهدف:** كل الـ API endpoints جاهزة

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A06-001 | GET /analytics/executive/kpis?from=&to= | 🔴 | 2h | ⬜ |
| A06-002 | GET /analytics/executive/trends?from=&to= (daily 30d) | 🔴 | 1h | ⬜ |
| A06-003 | GET /analytics/traffic/sources?from=&to= | 🔴 | 1h | ⬜ |
| A06-004 | GET /analytics/traffic/landing-pages?from=&to= | 🔴 | 1h | ⬜ |
| A06-005 | GET /analytics/traffic/geo?from=&to= | 🔴 | 1h | ⬜ |
| A06-006 | GET /analytics/traffic/devices?from=&to= | 🔴 | 1h | ⬜ |
| A06-007 | GET /analytics/services/ranking?from=&to= | 🔴 | 1h | ⬜ |
| A06-008 | GET /analytics/services/:slug/detail?from=&to= | 🟠 | 1h | ⬜ |
| A06-009 | GET /analytics/campaigns/performance?from=&to= | 🟠 | 1h | ⬜ |
| A06-010 | Redis cache layer لكل dashboard APIs (5-minute TTL) | 🔴 | 2h | ⬜ |

**تفاصيل A06-001 — Executive KPIs Response:**
```json
{
  "period": { "from": "2026-08-01", "to": "2026-08-28" },
  "kpis": {
    "sessions": { "value": 1250, "change_pct": 12.5 },
    "unique_visitors": { "value": 980, "change_pct": 8.3 },
    "leads": { "value": 37, "change_pct": 23.4 },
    "lead_conversion_rate": { "value": 2.96, "change_pct": 0.8 },
    "top_source": { "value": "organic_search", "sessions": 520 }
  }
}
```

---

### EPIC 2: Dashboard Shell (Next.js)
**الهدف:** الهيكل الأساسي للـ dashboards

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A06-011 | Analytics dashboard scaffold (route group /analytics) | 🔴 | 2h | ⬜ |
| A06-012 | Dashboard sidebar navigation (كل الـ routes) | 🔴 | 2h | ⬜ |
| A06-013 | Date range picker component (7d / 30d / 90d / custom) | 🔴 | 2h | ⬜ |
| A06-014 | RBAC middleware للـ dashboard routes | 🔴 | 2h | ⬜ |
| A06-015 | Dashboard API client (axios + JWT bearer token) | 🔴 | 1h | ⬜ |

**Dashboard Routes:**
```
/analytics                → Executive Dashboard (Viewer+)
/analytics/traffic        → Traffic Dashboard (Analyst+)
/analytics/leads          → Lead Dashboard (Sales+)
/analytics/conversions    → Conversion Dashboard (Analyst+)
/analytics/services       → Service Dashboard (Analyst+)
/analytics/portfolio      → Portfolio Dashboard (Analyst+)
/analytics/realtime       → Real-Time Dashboard (Analyst+)
/analytics/reports        → Reports Dashboard (Analyst+)
/analytics/settings       → Settings (Admin only)
```

---

### EPIC 3: Executive Dashboard
**الهدف:** لوحة القيادة التنفيذية للقيادة العليا

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A06-016 | Executive Dashboard page layout | 🔴 | 1h | ⬜ |
| A06-017 | KPI stat cards strip (5 cards مع trend arrows) | 🔴 | 2h | ⬜ |
| A06-018 | Sessions + Leads trend line chart (Recharts، 30 يوم) | 🔴 | 2h | ⬜ |
| A06-019 | Traffic source donut chart | 🔴 | 1h | ⬜ |
| A06-020 | Top services by conversion horizontal bar chart | 🔴 | 1h | ⬜ |
| A06-021 | Recent leads table (آخر 10: tier + source + date) | 🔴 | 1h | ⬜ |
| A06-022 | Campaign performance table | 🟠 | 1h | ⬜ |

**تفاصيل A06-017 — KPI Card:**
```
┌─────────────────────────┐
│ 📊 Total Sessions        │
│ 1,250                   │
│ ↑ 12.5% vs last period  │
└─────────────────────────┘
```

---

### EPIC 4: Traffic Dashboard
**الهدف:** تحليل عميق لمصادر الزيارات

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A06-023 | Traffic Dashboard page layout | 🔴 | 1h | ⬜ |
| A06-024 | Sessions by source stacked bar chart (Recharts) | 🔴 | 2h | ⬜ |
| A06-025 | New vs returning visitors dual-line chart | 🔴 | 1h | ⬜ |
| A06-026 | Sessions by device donut chart | 🔴 | 1h | ⬜ |
| A06-027 | Top landing pages table (page + sessions + bounce_rate + cvr) | 🔴 | 2h | ⬜ |
| A06-028 | Top referrer domains table | 🟠 | 1h | ⬜ |
| A06-029 | Geographic distribution top-10 bar chart | 🟠 | 1h | ⬜ |

---

### EPIC 5: Service Dashboard
**الهدف:** قياس أداء صفحات الخدمات كأداة تحويل

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A06-030 | Service Dashboard page layout | 🔴 | 1h | ⬜ |
| A06-031 | Services ranked by views (horizontal bar) | 🔴 | 1h | ⬜ |
| A06-032 | Services ranked by CTA click rate (bar) | 🔴 | 1h | ⬜ |
| A06-033 | Services ranked by scroll 75%+ rate (bar) | 🟠 | 1h | ⬜ |
| A06-034 | Service detail table (sortable بكل الـ metrics) | 🔴 | 2h | ⬜ |

**تفاصيل A06-034 — Service Detail Table Columns:**
```
| Service Name | Views | Avg Time | Scroll 75%+ | CTA Clicks | CTA Rate | Leads |
|---|---|---|---|---|---|---|
| Web Dev      | 450   | 2m 30s   | 35%         | 38         | 8.4%     | 12    |
| Mobile App   | 310   | 1m 55s   | 28%         | 22         | 7.1%     | 8     |
```

---

## خطة التنفيذ اليومية

| اليوم | المهام |
|---|---|
| Day 1 (Mon) | A06-001 → A06-005 (API: KPIs + Trends + Sources + Pages + Geo) |
| Day 2 (Tue) | A06-006 → A06-010 (API: Devices + Services + Redis cache) |
| Day 3 (Wed) | A06-011 → A06-015 (Dashboard Shell) |
| Day 4 (Thu) | A06-016 → A06-019 (Executive Dashboard: layout + KPIs + chart) |
| Day 5 (Fri) | A06-020 → A06-022 (Executive Dashboard: remaining widgets) |
| Day 6 (Mon) | A06-023 → A06-029 (Traffic Dashboard) |
| Day 7 (Tue) | A06-030 → A06-034 (Service Dashboard) + testing |

---

## المخاطر والتبعيات

| المخاطرة | الاحتمال | الحل |
|---|---|---|
| Dashboard queries بطيئة إذا لم تكن metrics_daily مكتملة | متوسط | التأكد من Sprint 04 مكتمل + Redis cache |
| Recharts customization يستغرق وقت أكثر من المتوقع | متوسط | استخدام الـ default styles أولًا ثم التحسين |

---

## قائمة التحقق (Sprint Review Checklist)

```
[ ] Executive Dashboard: 5 KPI cards تعرض أرقام صحيحة
[ ] Executive Dashboard: Line chart يعرض sessions + leads لآخر 30 يوم
[ ] Date range filter يغير البيانات في كل الـ charts
[ ] Traffic Dashboard: Top landing pages table مع bounce rate
[ ] Service Dashboard: Services مرتبة بعدد الـ views
[ ] Dashboard API P95 < 2 ثانية
[ ] RBAC: Viewer يرى Executive فقط
[ ] RBAC: Sales لا يرى Traffic/Service
[ ] TypeScript 0 errors
```
