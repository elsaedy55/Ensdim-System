# SPRINT 04 — P1 Events + Analytics Engine
# أحداث P1 + محرك التحليلات

---

## معلومات السبرينت

| المعلومة | التفاصيل |
|---|---|
| رقم السبرينت | 04 |
| المرحلة | Phase B — Event Coverage |
| تاريخ البدء | 2026-07-31 |
| تاريخ الانتهاء | 2026-08-13 |
| المدة | أسبوعان |
| التقدير الزمني | ~32 ساعة |
| عدد المهام | 25 مهمة |
| Story Points | 40 |

---

## هدف السبرينت

> بنهاية هذا السبرينت، كل الـ 10 أحداث P1 تعمل (scroll depth / time on page / blog / navigation)، ومحرك التجميع يُولِّد بيانات metrics_daily كل ساعة، وحسابات الـ funnels تعمل يوميًا. البيانات المُجمَّعة جاهزة ليبني عليها الـ Dashboards في السبرينتات القادمة.

---

## نتائج (Deliverables) السبرينت

- [ ] IntersectionObserver scroll tracker يعمل على كل الصفحات
- [ ] scroll_depth events تُرسَل عند 25/50/75/90%
- [ ] time_on_page heartbeat يعمل (كل 30 ثانية)
- [ ] 10 P1 events مُطبَّقة
- [ ] Hourly aggregation job يُولِّد metrics_daily
- [ ] Funnel calculation job يعمل يوميًا
- [ ] 3 pre-built funnels منشأة في الـ DB
- [ ] service_views و portfolio_views tables تُملأ

---

## معيار الإتمام (Definition of Done)

- [ ] scroll_depth events تظهر في events table لكل page type
- [ ] metrics_daily يُملأ كل ساعة بالبيانات الصحيحة
- [ ] funnel_results يُملأ يوميًا بـ step counts صحيحة
- [ ] Unit tests: aggregation calculations → Pass
- [ ] Unit tests: funnel step counts → Pass
- [ ] TypeScript 0 errors

---

## المهام التفصيلية

### EPIC 1: Scroll Depth Tracking
**الهدف:** قياس عمق القراءة على كل الصفحات

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A04-001 | IntersectionObserver scroll tracker utility (25/50/75/90% milestones) | 🔴 | 2h | ⬜ |
| A04-002 | scroll_depth — Generic لكل الصفحات | 🔴 | 1h | ⬜ |
| A04-003 | service_scroll_depth — Service pages فقط | 🔴 | 30m | ⬜ |
| A04-004 | portfolio_case_study_scroll — Case study pages | 🔴 | 30m | ⬜ |
| A04-005 | blog_scroll_depth — Blog posts | 🔴 | 30m | ⬜ |

**تفاصيل A04-001 — Scroll Tracker:**
```typescript
// src/lib/analytics/scroll-tracker.ts

function initScrollTracker(
  onMilestone: (depth: number, timeToDepth: number) => void
) {
  const milestones = [25, 50, 75, 90];
  const reached = new Set<number>();
  const startTime = Date.now();

  // يُضاف sentinel elements على % من طول الصفحة
  // IntersectionObserver يراقبهم
  // عند الوصول: يُرسَل الحدث مرة واحدة فقط (reached.has check)
}
```

**تفاصيل A04-002 — scroll_depth Properties:**
```json
{
  "event_name": "scroll_depth",
  "properties": {
    "page_path": "/services/web-development",
    "page_type": "service",
    "depth_percent": 75,
    "time_to_depth_seconds": 45
  }
}
```

---

### EPIC 2: Time & Engagement Tracking
**الهدف:** وقت المشاركة الحقيقي (يستثني الـ inactive time)

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A04-006 | time_on_page heartbeat (كل 30 ثانية، يتوقف عند blur) | 🔴 | 1h | ⬜ |
| A04-007 | Page focus/blur detection (إيقاف المؤقت عند تغيير الـ tab) | 🟠 | 1h | ⬜ |

**تفاصيل A04-006 — Time on Page:**
```typescript
// يُرسَل كل 30 ثانية طالما الـ tab نشط
// يتوقف عند: document.visibilityState === 'hidden'
// يستأنف عند: visibilitychange → visible
// Properties: { active_time_seconds: 90 }  ← الوقت التراكمي الفعلي
```

---

### EPIC 3: Content Events
**الهدف:** Blog ونتائج الـ filter والـ navigation مُتتبَّعة

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A04-008 | blog_post_view — route /blog/:slug detection | 🟠 | 1h | ⬜ |
| A04-009 | blog_cta_click — CTA handlers داخل المقالات | 🟠 | 1h | ⬜ |
| A04-010 | portfolio_filter_apply — filter click handlers في Portfolio page | 🟠 | 1h | ⬜ |
| A04-011 | navigation_click — header/footer navigation | 🟡 | 1h | ⬜ |

---

### EPIC 4: Analytics Engine — Aggregations
**الهدف:** محرك التجميع يُولِّد metrics_daily كل ساعة

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A04-012 | Analytics engine NestJS module setup | 🔴 | 1h | ⬜ |
| A04-013 | Hourly aggregation job — BullMQ cron ('0 * * * *') | 🔴 | 2h | ⬜ |
| A04-014 | metrics_daily upsert — sessions by source | 🔴 | 1h | ⬜ |
| A04-015 | metrics_daily upsert — sessions by country | 🔴 | 1h | ⬜ |
| A04-016 | metrics_daily upsert — sessions by device | 🔴 | 1h | ⬜ |
| A04-017 | metrics_daily upsert — sessions by page | 🔴 | 1h | ⬜ |
| A04-018 | metrics_daily upsert — conversions by type | 🔴 | 1h | ⬜ |
| A04-019 | Bounce rate calculation | 🔴 | 1h | ⬜ |
| A04-020 | Engagement rate calculation | 🔴 | 1h | ⬜ |

**تفاصيل A04-013 — Aggregation Logic:**
```
كل ساعة:
1. اجمع events من الـ hour الماضية
2. حوّلها إلى metrics_daily rows
3. UPSERT (ON CONFLICT DO UPDATE) في metrics_daily
4. احفظ في Redis cache لمدة 5 دقائق

metrics_daily schema:
(date, metric_type, dimension, dimension_value) → UNIQUE
مثال: ('2026-08-01', 'source', 'source_category', 'organic_search') → sessions: 150
```

**تفاصيل A04-019 — Bounce Rate:**
```
Bounce = session with:
  - page_count = 1
  - duration_seconds < 10

bounce_rate = bounced_sessions / total_sessions × 100
```

**تفاصيل A04-020 — Engagement Rate:**
```
Engaged session = session with:
  - duration_seconds >= 10
  - AND (event_count >= 2 OR converted = true)

engagement_rate = engaged_sessions / total_sessions × 100
```

---

### EPIC 5: Funnel Engine
**الهدف:** الـ funnels تُحسَب يوميًا

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A04-020 | Funnels CRUD API | 🔴 | 2h | ⬜ |
| A04-021 | Seed 3 pre-built funnels في الـ DB | 🟠 | 1h | ⬜ |
| A04-022 | Daily funnel calculation job | 🔴 | 2h | ⬜ |
| A04-023 | funnel_results upsert per funnel per day per step | 🔴 | 2h | ⬜ |

**تفاصيل A04-021 — Pre-built Funnels:**
```
Funnel 1: Quote Request Funnel
Steps:
  1. session_start (entry)
  2. service_detail_view OR portfolio_case_study_view
  3. contact_page_view
  4. quote_request_start
  5. quote_request_submit

Funnel 2: Portfolio-to-Contact
Steps:
  1. portfolio_page_view
  2. portfolio_case_study_view
  3. contact_page_view OR whatsapp_click OR phone_click

Funnel 3: Blog-to-Contact
Steps:
  1. blog_post_view
  2. service_page_view OR portfolio_page_view
  3. contact_page_view OR whatsapp_click
```

---

### EPIC 6: Specialized View Tables
**الهدف:** service_views و portfolio_views يُملآن من الأحداث

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A04-024 | service_views population من events | 🟠 | 1h | ⬜ |
| A04-025 | portfolio_views population من events | 🟠 | 1h | ⬜ |

---

## خطة التنفيذ اليومية

| اليوم | المهام |
|---|---|
| Day 1 (Mon) | A04-001 → A04-005 (Scroll Depth tracking) |
| Day 2 (Tue) | A04-006 → A04-011 (Time + Content events) |
| Day 3 (Wed) | A04-012 → A04-015 (Analytics Engine + Aggregations part 1) |
| Day 4 (Thu) | A04-016 → A04-020 (Aggregations part 2 + Bounce/Engagement) |
| Day 5 (Fri) | A04-021 → A04-023 (Funnel engine) |
| Day 6 (Mon) | A04-024 → A04-025 (Specialized tables) |
| Day 7 (Tue) | Testing: Aggregation results + Funnel calculations verification |

---

## المخاطر والتبعيات

| المخاطرة | الاحتمال | الحل |
|---|---|---|
| IntersectionObserver لا يعمل على iOS Safari بشكل صحيح | منخفض | Polyfill + fallback scroll event |
| Aggregation queries ثقيلة على الـ DB | متوسط | استخدام metrics_daily (pre-aggregated) — لا raw aggregation في runtime |
| Funnel calculation تحتاج data كافية للاختبار | منخفض | Seed test sessions في staging DB |

---

## قائمة التحقق (Sprint Review Checklist)

```
[ ] scroll_depth events في events table لكل page type
[ ] time_on_page heartbeat يُرسَل كل 30s مع active_time_seconds صحيح
[ ] blog_post_view يظهر عند قراءة مقال
[ ] portfolio_filter_apply يظهر عند تطبيق filter
[ ] metrics_daily يُملأ كل ساعة بالبيانات الصحيحة
[ ] bounce_rate محسوب صحيح في metrics_daily
[ ] engagement_rate محسوب صحيح
[ ] 3 funnels موجودة في DB
[ ] funnel_results يُملأ يوميًا
[ ] Unit tests: aggregation calculations → Pass
[ ] TypeScript 0 errors
```
