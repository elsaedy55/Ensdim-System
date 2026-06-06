# SPRINT 01 — Tracking SDK Core
# بناء نواة الـ Tracking SDK

---

## معلومات السبرينت

| المعلومة | التفاصيل |
|---|---|
| رقم السبرينت | 01 |
| المرحلة | Phase A — Foundation |
| تاريخ البدء | 2026-06-19 |
| تاريخ الانتهاء | 2026-07-02 |
| المدة | أسبوعان |
| التقدير الزمني | ~35 ساعة |
| عدد المهام | 29 مهمة |
| Story Points | 40 |

---

## هدف السبرينت

> بنهاية هذا السبرينت، يكون الـ Tracking SDK جاهزًا ومُدمجًا في الموقع، ويلتقط ويرسل الأحداث الثلاثة الأساسية (session_start, page_view, session_end) إلى الـ API، وتصل هذه الأحداث إلى قاعدة البيانات صحيحة ومُعالجة خلال أقل من 500ms.

---

## نتائج (Deliverables) السبرينت

- [ ] Tracking SDK module منشأ في الموقع (src/lib/analytics/)
- [ ] Anonymous ID يُنشأ ويُخزَّن في localStorage
- [ ] Session lifecycle يعمل (start / active / end / timeout)
- [ ] Event batcher يجمع الأحداث ويرسلها كـ batch
- [ ] UTM parameters وReferrer يُلتقطان عند بداية الجلسة
- [ ] session_start / page_view / session_end تصل لقاعدة البيانات
- [ ] NestJS tracking worker يعالج الأحداث ويحفظها
- [ ] SDK مُدمج في الموقع (main.tsx)

---

## معيار الإتمام (Definition of Done)

- [ ] session_start يظهر في جدول sessions في الـ staging DB
- [ ] page_view يظهر في جدول events مع page_path صحيح
- [ ] session_end يُرسَل عند إغلاق الـ tab (sendBeacon)
- [ ] كل event batch يصل للـ API خلال < 500ms
- [ ] Unit tests للـ session lifecycle: Pass
- [ ] Integration test: Browser → API → Database: Pass
- [ ] TypeScript 0 errors

---

## المهام التفصيلية

### EPIC 1: SDK Foundation
**الهدف:** الهيكل الأساسي للـ SDK

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A01-001 | إنشاء tracking SDK module في الموقع (src/lib/analytics/) | 🔴 | 1h | ⬜ |
| A01-002 | Anonymous ID generation (UUID v4) + localStorage persistence | 🔴 | 1h | ⬜ |
| A01-003 | Session ID generation + session lifecycle management | 🔴 | 2h | ⬜ |
| A01-004 | Session timeout logic (30 دقيقة inactivity — reset على كل حدث) | 🔴 | 1h | ⬜ |
| A01-005 | Tab visibility detection (document.visibilityState) | 🟠 | 1h | ⬜ |

**تفاصيل A01-002 — Anonymous ID:**
```typescript
// src/lib/analytics/identity.ts
const ANON_ID_KEY = 'ensdim_anon_id';

function getOrCreateAnonId(): string {
  let id = localStorage.getItem(ANON_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(ANON_ID_KEY, id);
  }
  return id;
}
```

**تفاصيل A01-003 — Session Lifecycle:**
```
session_start  → on first event after 30min gap or new tab
session_active → on every user interaction (resets 30min timer)
session_end    → on pagehide event OR 30min inactivity
```

---

### EPIC 2: Event System
**الهدف:** نظام تجميع وإرسال الأحداث

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A01-006 | Event queue/batcher (debounce 2 ثواني، max 10 events per batch) | 🔴 | 2h | ⬜ |
| A01-007 | Event schema TypeScript interfaces | 🔴 | 1h | ⬜ |
| A01-008 | Event sequence number (ترتيب الأحداث داخل الجلسة) | 🟠 | 30m | ⬜ |

**تفاصيل A01-007 — Event Schema:**
```typescript
interface TrackingEvent {
  event_name: string;
  session_id: string;
  visitor_id: string;
  page_path: string;
  page_title: string;
  page_type: 'home' | 'service' | 'portfolio' | 'blog' | 'contact' | 'other';
  event_timestamp: string; // ISO 8601
  sequence_number: number;
  properties: Record<string, unknown>;
}

interface EventBatch {
  batch: TrackingEvent[];
  context: {
    sdk_version: string;
    user_agent: string;
    screen_resolution: string;
    viewport_width: number;
    language: string;
    timezone: string;
  };
}
```

---

### EPIC 3: SDK API Client
**الهدف:** إرسال الأحداث للـ API بشكل موثوق

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A01-009 | HTTP client لـ POST /track/events (fetch API + retry on failure) | 🔴 | 2h | ⬜ |
| A01-010 | navigator.sendBeacon لـ session_end عند pagehide | 🔴 | 1h | ⬜ |
| A01-011 | Offline detection + event queue persistence في localStorage | 🟡 | 1h | ⬜ |

**تفاصيل A01-009 — Retry Logic:**
```
Retry attempts: 3
Backoff: 1s → 2s → 4s (exponential)
On permanent failure: save to localStorage for next session
Max localStorage queue: 50 events
```

---

### EPIC 4: Session Enrichment (Client-Side)
**الهدف:** إثراء بيانات الجلسة من الـ browser

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A01-012 | UTM parameter parser من الـ URL عند بداية الجلسة | 🔴 | 1h | ⬜ |
| A01-013 | Referrer parser وتصنيف المصدر (organic/direct/social/paid/referral/email) | 🔴 | 1h | ⬜ |
| A01-014 | Browser/OS/device detection (client-side UA parsing) | 🟠 | 1h | ⬜ |
| A01-015 | Screen resolution + viewport width capture | 🟠 | 30m | ⬜ |
| A01-016 | Language + timezone capture | 🟠 | 30m | ⬜ |

**تفاصيل A01-012 — UTM Parser:**
```typescript
// يلتقط: utm_source, utm_medium, utm_campaign, utm_term, utm_content
// يُخزَّن في sessionStorage طوال الجلسة
// يُضاف لكل event payload

function parseUTMs(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') ?? '',
    utm_medium: params.get('utm_medium') ?? '',
    utm_campaign: params.get('utm_campaign') ?? '',
    utm_term: params.get('utm_term') ?? '',
    utm_content: params.get('utm_content') ?? '',
  };
}
```

**تفاصيل A01-013 — Referrer Categories:**
```
document.referrer contains 'google'    → organic_search
document.referrer contains 'bing'      → organic_search
document.referrer contains 'facebook'  → social
document.referrer contains 'linkedin'  → social
document.referrer contains 'instagram' → social
no referrer + no UTM                   → direct
utm_medium = 'email'                   → email
utm_medium = 'cpc' or 'paid'           → paid_search
any other referrer domain              → referral
```

---

### EPIC 5: Core Events
**الهدف:** الأحداث الثلاثة الأساسية تعمل

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A01-017 | session_start event — يُرسَل عند بداية جلسة جديدة مع كل الـ enrichment | 🔴 | 1h | ⬜ |
| A01-018 | page_view event — يُرسَل عند كل route change في React Router | 🔴 | 1h | ⬜ |
| A01-019 | session_end event — sendBeacon عند pagehide + timeout | 🔴 | 1h | ⬜ |

**تفاصيل A01-017 — session_start Properties:**
```json
{
  "event_name": "session_start",
  "properties": {
    "is_new_visitor": true,
    "utm_source": "google",
    "utm_medium": "organic",
    "utm_campaign": "",
    "referrer": "https://google.com",
    "referrer_domain": "google.com",
    "traffic_source": "organic_search"
  }
}
```

---

### EPIC 6: Tracking API (NestJS Backend)
**الهدف:** الـ API يستقبل الأحداث ويحولها للـ queue

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A01-020 | POST /track/events endpoint — DTO + class-validator validation | 🔴 | 2h | ⬜ |
| A01-021 | Event batch processor — validate + transform + sanitize | 🔴 | 1h | ⬜ |
| A01-022 | BullMQ enqueue — events batch → events.queue | 🔴 | 1h | ⬜ |
| A01-023 | 202 Accepted response: { received: N, queued: N } | 🔴 | 30m | ⬜ |

**Endpoint Spec:**
```
POST /track/events
Headers: X-API-Key: {write_key}, Content-Type: application/json
Body: EventBatch JSON
Response: 202 { "received": 5, "queued": 5 }
Max payload: 10KB
```

---

### EPIC 7: Tracking Workers
**الهدف:** معالجة الأحداث وحفظها في قاعدة البيانات

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A01-024 | Tracking worker — يستهلك events من events.queue | 🔴 | 2h | ⬜ |
| A01-025 | Visitor upsert logic (create إذا جديد، update last_seen_at إذا موجود) | 🔴 | 1h | ⬜ |
| A01-026 | Session create logic (INSERT على session_start، UPDATE على session_end) | 🔴 | 1h | ⬜ |
| A01-027 | Event INSERT في قاعدة البيانات (events table) | 🔴 | 1h | ⬜ |

---

### EPIC 8: Website Integration
**الهدف:** دمج الـ SDK في الموقع

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A01-028 | تضمين SDK في main.tsx (initialize عند تشغيل التطبيق) | 🔴 | 1h | ⬜ |
| A01-029 | React Router integration: useEffect على location.pathname | 🔴 | 1h | ⬜ |

**تفاصيل A01-028 — SDK Integration:**
```typescript
// src/main.tsx
import { initAnalytics } from './lib/analytics';

initAnalytics({
  apiUrl: import.meta.env.VITE_ANALYTICS_URL,
  writeKey: import.meta.env.VITE_ANALYTICS_WRITE_KEY,
  debug: import.meta.env.DEV,
});
```

---

## خطة التنفيذ اليومية

| اليوم | المهام |
|---|---|
| Day 1 (Mon) | A01-001 → A01-003 (SDK Foundation) |
| Day 2 (Tue) | A01-004 → A01-008 (Session timeout + Event system) |
| Day 3 (Wed) | A01-009 → A01-013 (API client + UTM/Referrer parser) |
| Day 4 (Thu) | A01-014 → A01-019 (Enrichment + Core events) |
| Day 5 (Fri) | A01-020 → A01-023 (NestJS API endpoint) |
| Day 6 (Mon) | A01-024 → A01-027 (Workers) |
| Day 7 (Tue) | A01-028 → A01-029 + End-to-end testing |

---

## المخاطر والتبعيات

| المخاطرة | الاحتمال | الحل |
|---|---|---|
| navigator.sendBeacon لا يُرسَل دائمًا عند إغلاق التاب | متوسط | إضافة keepalive fetch كـ fallback |
| sessionStorage يُمسح عند فتح tab جديد | مرتفع | تخزين UTMs في localStorage مع session_id key |
| Race condition بين session_start وأول page_view | منخفض | Queue-based event ordering بالـ sequence_number |
| يتطلب Sprint 00 مكتملًا | — | الـ API endpoint والـ DB tables لازمة |

---

## قائمة التحقق (Sprint Review Checklist)

```
[ ] SDK يُنشئ anonymous_id ويحتفظ به بين الـ page reloads
[ ] session_start يُرسَل عند أول زيارة مع UTMs صحيحة
[ ] page_view يُرسَل عند كل route change في الموقع
[ ] session_end يُرسَل عند إغلاق الـ tab (sendBeacon)
[ ] events تظهر في جدول events في staging DB
[ ] sessions تظهر في جدول sessions في staging DB
[ ] visitors تظهر في جدول visitors في staging DB
[ ] Event batch POST → 202 Accepted
[ ] TypeScript 0 errors في الـ SDK
[ ] Unit tests: Session lifecycle → Pass
```
