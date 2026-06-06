# ENSDIM ANALYTICS — COMPLETE TASK BACKLOG
# القائمة الكاملة لكل مهام نظام التحليلات

---

## أولويات المهام

| الرمز | المعنى |
|---|---|
| 🔴 Critical | لا يمكن المتابعة بدونها |
| 🟠 High | مطلوبة في MVP |
| 🟡 Medium | مطلوبة لكن مرنة |
| 🔵 Low | تحسين — يمكن تأجيلها |

---

## تصنيف المهام

| النوع | المعنى |
|---|---|
| `[SETUP]` | إعداد وتهيئة |
| `[DB]` | قاعدة بيانات ومخطط |
| `[SDK]` | Tracking SDK |
| `[TRACK]` | Event Implementation في الموقع |
| `[API]` | API Endpoint |
| `[LOGIC]` | Business Logic / Worker |
| `[QUEUE]` | BullMQ Job / Cron |
| `[REAL]` | Real-Time / WebSocket |
| `[DASH]` | Dashboard UI |
| `[INT]` | Integration (GA4 / Clarity) |
| `[SEC]` | Security / GDPR |
| `[INFRA]` | Infrastructure / DevOps |
| `[PERF]` | Performance |
| `[TEST]` | Testing / QA |

---

# SPRINT 00 TASKS — Infrastructure + Database + Security Foundation

## Epic: Analytics Service Setup

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A00-001 | إنشاء analytics-api NestJS service scaffold | `[SETUP]` | 🔴 | 3h |
| A00-002 | تهيئة module structure (tracking / analytics / realtime / leads / reports) | `[SETUP]` | 🔴 | 2h |
| A00-003 | إعداد environment variables schema (Zod validation) | `[SETUP]` | 🔴 | 1h |
| A00-004 | إعداد ESLint + Prettier للـ analytics service | `[SETUP]` | 🟠 | 30m |
| A00-005 | إعداد path aliases في tsconfig.json | `[SETUP]` | 🔴 | 30m |

## Epic: Database Schema & Migration

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A00-006 | Prisma schema — جدول visitors | `[DB]` | 🔴 | 1h |
| A00-007 | Prisma schema — جدول sessions | `[DB]` | 🔴 | 1h |
| A00-008 | Prisma schema — جدول events (مع ملاحظات partitioning) | `[DB]` | 🔴 | 1h |
| A00-009 | Prisma schema — جدول leads (مع PII fields) | `[DB]` | 🔴 | 1h |
| A00-010 | Prisma schema — جدول conversions | `[DB]` | 🔴 | 1h |
| A00-011 | Prisma schema — جدول traffic_sources | `[DB]` | 🔴 | 30m |
| A00-012 | Prisma schema — جداول service_views + portfolio_views | `[DB]` | 🔴 | 1h |
| A00-013 | Prisma schema — جداول funnels + funnel_results | `[DB]` | 🔴 | 1h |
| A00-014 | Prisma schema — جداول campaigns + user_journeys + real_time_sessions | `[DB]` | 🔴 | 1h |
| A00-015 | Prisma schema — جداول metrics_daily + alerts + audit_logs | `[DB]` | 🔴 | 1h |
| A00-016 | تهيئة events table partitioning بالشهر | `[DB]` | 🟠 | 1h |
| A00-017 | تشغيل initial Prisma migration على staging | `[DB]` | 🔴 | 1h |
| A00-018 | seed database ببيانات تجريبية | `[DB]` | 🟠 | 1h |

## Epic: Redis + Queue Setup

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A00-019 | تهيئة Redis connection في NestJS | `[INFRA]` | 🔴 | 1h |
| A00-020 | إعداد BullMQ queues (events.queue / analytics.queue / reports.queue) | `[QUEUE]` | 🔴 | 1h |
| A00-021 | تثبيت Bull Board (queue dashboard) | `[INFRA]` | 🟡 | 30m |

## Epic: Infrastructure & CI/CD

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A00-022 | Docker Compose للـ local dev (Postgres + Redis) | `[INFRA]` | 🔴 | 2h |
| A00-023 | GitHub Actions CI pipeline | `[INFRA]` | 🟠 | 1h |
| A00-024 | إعداد staging environment | `[INFRA]` | 🔴 | 2h |
| A00-025 | تهيئة .env files لكل environment | `[INFRA]` | 🔴 | 30m |

## Epic: API Security Foundation

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A00-026 | API key middleware (write key للـ SDK / read key للـ dashboard) | `[SEC]` | 🔴 | 2h |
| A00-027 | CORS configuration (allowlist: website domain only) | `[SEC]` | 🔴 | 30m |
| A00-028 | Global rate limiting (Redis sliding window — 100 req/min per IP) | `[SEC]` | 🔴 | 2h |
| A00-029 | Helmet.js security headers | `[SEC]` | 🟠 | 30m |
| A00-030 | README — local dev setup documentation | `[SETUP]` | 🟠 | 1h |

---

# SPRINT 01 TASKS — Tracking SDK Core

## Epic: SDK Foundation

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A01-001 | إنشاء tracking SDK module في الموقع (src/lib/analytics/) | `[SDK]` | 🔴 | 1h |
| A01-002 | Anonymous ID generation (UUID v4) + localStorage persistence | `[SDK]` | 🔴 | 1h |
| A01-003 | Session ID generation + session lifecycle management | `[SDK]` | 🔴 | 2h |
| A01-004 | Session timeout logic (30 دقيقة inactivity) | `[SDK]` | 🔴 | 1h |
| A01-005 | Tab visibility detection (pauses time tracking when tab not focused) | `[SDK]` | 🟠 | 1h |

## Epic: Event System

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A01-006 | Event queue/batcher (debounce 2s / max 10 events per batch) | `[SDK]` | 🔴 | 2h |
| A01-007 | Event schema validation (TypeScript interfaces) | `[SDK]` | 🔴 | 1h |
| A01-008 | Event sequence number tracking (ترتيب الأحداث داخل الجلسة) | `[SDK]` | 🟠 | 30m |

## Epic: SDK API Client

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A01-009 | HTTP client لـ POST /track/events (fetch + retry logic) | `[SDK]` | 🔴 | 2h |
| A01-010 | navigator.sendBeacon fallback عند إغلاق الصفحة | `[SDK]` | 🔴 | 1h |
| A01-011 | Offline detection + event queue persistence في localStorage | `[SDK]` | 🟡 | 1h |

## Epic: Session Enrichment (Client-Side)

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A01-012 | UTM parameter parser من الـ URL | `[SDK]` | 🔴 | 1h |
| A01-013 | Referrer parser وتصنيف المصدر (organic/direct/social/paid/referral/email) | `[SDK]` | 🔴 | 1h |
| A01-014 | Browser/OS/device detection (client-side) | `[SDK]` | 🟠 | 1h |
| A01-015 | Screen resolution + viewport width capture | `[SDK]` | 🟠 | 30m |
| A01-016 | Language + timezone capture | `[SDK]` | 🟠 | 30m |

## Epic: Core Events

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A01-017 | session_start event — يُرسَل عند بداية جلسة جديدة مع كل الـ enrichment | `[SDK]` | 🔴 | 1h |
| A01-018 | page_view event — يُرسَل عند كل route change في React Router | `[SDK]` | 🔴 | 1h |
| A01-019 | session_end event — sendBeacon عند pagehide + timeout | `[SDK]` | 🔴 | 1h |

## Epic: Tracking API (NestJS Backend)

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A01-020 | POST /track/events endpoint — DTO + class-validator | `[API]` | 🔴 | 2h |
| A01-021 | Event batch processor — validate + transform + sanitize | `[API]` | 🔴 | 1h |
| A01-022 | BullMQ enqueue — events → events.queue | `[QUEUE]` | 🔴 | 1h |
| A01-023 | 202 Accepted response مع received count | `[API]` | 🔴 | 30m |

## Epic: Tracking Workers

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A01-024 | Tracking worker — يستهلك events من القائمة | `[QUEUE]` | 🔴 | 2h |
| A01-025 | Visitor upsert logic (إنشاء أو تحديث سجل الزائر) | `[LOGIC]` | 🔴 | 1h |
| A01-026 | Session create/update logic | `[LOGIC]` | 🔴 | 1h |
| A01-027 | Event INSERT في قاعدة البيانات | `[LOGIC]` | 🔴 | 1h |

## Epic: Website Integration

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A01-028 | تضمين SDK في الموقع (import في main.tsx + initialize) | `[SDK]` | 🔴 | 1h |
| A01-029 | React Router integration (useEffect على route change) | `[SDK]` | 🔴 | 1h |

---

# SPRINT 02 TASKS — P0 Events Implementation

## Epic: Event Enrichment (API Side)

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A02-001 | Geo enrichment service (ip-api.com integration) | `[API]` | 🔴 | 2h |
| A02-002 | User-agent parsing service (ua-parser-js) | `[API]` | 🔴 | 1h |
| A02-003 | Bot detection service (isbot library) | `[API]` | 🔴 | 1h |
| A02-004 | تطبيق الـ enrichment في الـ worker قبل INSERT | `[LOGIC]` | 🔴 | 1h |
| A02-005 | IP hashing (SHA-256 + salt) قبل التخزين | `[SEC]` | 🔴 | 1h |

## Epic: Service Events

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A02-006 | service_page_view — route /services detection | `[TRACK]` | 🔴 | 1h |
| A02-007 | service_detail_view — route /services/:slug detection | `[TRACK]` | 🔴 | 1h |
| A02-008 | إضافة data-event attributes لكل CTAs في صفحات الخدمات | `[TRACK]` | 🔴 | 2h |
| A02-009 | service_cta_click — click handler على كل service CTAs | `[TRACK]` | 🔴 | 1h |

## Epic: Portfolio Events

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A02-010 | portfolio_page_view — route detection | `[TRACK]` | 🔴 | 1h |
| A02-011 | portfolio_case_study_view — route /case-studies/:slug | `[TRACK]` | 🔴 | 1h |
| A02-012 | portfolio_cta_click — click handlers في portfolio pages | `[TRACK]` | 🔴 | 1h |

## Epic: Contact Events

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A02-013 | contact_page_view — route /contact detection | `[TRACK]` | 🔴 | 1h |
| A02-014 | hero_cta_click — Hero component CTA buttons | `[TRACK]` | 🔴 | 1h |

## Epic: Channel Contact Events

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A02-015 | whatsapp_click — كل wa.me links + WhatsApp float button | `[TRACK]` | 🔴 | 2h |
| A02-016 | phone_click — كل tel: links | `[TRACK]` | 🔴 | 1h |
| A02-017 | email_click — كل mailto: links | `[TRACK]` | 🔴 | 1h |
| A02-018 | company_profile_download — download link handler | `[TRACK]` | 🔴 | 1h |

## Epic: System Events (Server-Side)

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A02-019 | lead_created system event — server-side بعد معالجة الـ lead | `[LOGIC]` | 🔴 | 1h |
| A02-020 | conversion_completed system event — server-side | `[LOGIC]` | 🔴 | 1h |

## Epic: Data Model Population

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A02-021 | visitors table upsert logic — full enrichment (geo + device + source) | `[LOGIC]` | 🔴 | 2h |
| A02-022 | sessions table population — كل الـ fields بما فيها geo + device | `[LOGIC]` | 🔴 | 2h |
| A02-023 | traffic_sources table population من session data | `[LOGIC]` | 🔴 | 1h |

---

# SPRINT 03 TASKS — Lead & Conversion Pipeline

## Epic: Quote Form Event Tracking

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A03-001 | quote_request_start — first field focus handler في الـ form | `[TRACK]` | 🔴 | 1h |
| A03-002 | quote_request_field_complete — blur handler (field name فقط، بدون values) | `[TRACK]` | 🔴 | 1h |
| A03-003 | quote_request_submit — form success handler (API 200) | `[TRACK]` | 🔴 | 1h |
| A03-004 | quote_request_abandon — يُكتشف عند session_end إذا بدأت الـ form ولم تُكمَل | `[LOGIC]` | 🔴 | 2h |

## Epic: Consultation Events

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A03-005 | consultation_book_start — calendar/booking form open | `[TRACK]` | 🔴 | 1h |
| A03-006 | consultation_book_submit — booking confirmed | `[TRACK]` | 🔴 | 1h |

## Epic: Lead Creation Pipeline (NestJS)

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A03-007 | Lead creation service — trigger on quote_request_submit | `[LOGIC]` | 🔴 | 2h |
| A03-008 | Lead creation service — trigger on consultation_book_submit | `[LOGIC]` | 🔴 | 1h |
| A03-009 | Lead tier classification (hot / warm / interested) | `[LOGIC]` | 🔴 | 1h |
| A03-010 | Lead enrichment — session history (الصفحات المزورة والأحداث) | `[LOGIC]` | 🔴 | 2h |
| A03-011 | Lead enrichment — first-touch + last-touch attribution | `[LOGIC]` | 🔴 | 2h |
| A03-012 | PII encryption service (AES-256-GCM لـ email/phone/message) | `[SEC]` | 🔴 | 2h |
| A03-013 | Leads table INSERT مع الـ PII fields المشفرة | `[LOGIC]` | 🔴 | 1h |

## Epic: Conversion Tracking

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A03-014 | conversions table INSERT عند كل conversion event | `[LOGIC]` | 🔴 | 1h |
| A03-015 | Time-to-convert calculation (session_start → conversion) | `[LOGIC]` | 🔴 | 1h |
| A03-016 | Pages-before-conversion count | `[LOGIC]` | 🔴 | 30m |

## Epic: Notifications & ID Capture

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A03-017 | Lead notification — Redis PubSub publish عند إنشاء lead | `[LOGIC]` | 🔴 | 1h |
| A03-018 | Capture GA4 client_id من gtag cookie (_ga) | `[SDK]` | 🟠 | 1h |
| A03-019 | Capture Clarity session ID من clarity API | `[SDK]` | 🟠 | 1h |
| A03-020 | تضمين ga4_client_id + clarity_session_id في quote submit payload | `[SDK]` | 🟠 | 30m |

---

# SPRINT 04 TASKS — P1 Events + Analytics Engine

## Epic: Scroll Depth Tracking

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A04-001 | IntersectionObserver scroll tracker utility (25/50/75/90%) | `[SDK]` | 🔴 | 2h |
| A04-002 | scroll_depth — Generic implementation لكل الصفحات | `[TRACK]` | 🔴 | 1h |
| A04-003 | service_scroll_depth — Service pages | `[TRACK]` | 🔴 | 30m |
| A04-004 | portfolio_case_study_scroll — Case study pages | `[TRACK]` | 🔴 | 30m |
| A04-005 | blog_scroll_depth — Blog posts | `[TRACK]` | 🔴 | 30m |

## Epic: Time & Engagement Tracking

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A04-006 | time_on_page heartbeat (كل 30 ثانية، واعي بـ visibility) | `[TRACK]` | 🔴 | 1h |
| A04-007 | Page focus/blur detection (إيقاف المؤقت عند تغيير الـ tab) | `[SDK]` | 🟠 | 1h |

## Epic: Content Events

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A04-008 | blog_post_view — route detection | `[TRACK]` | 🟠 | 1h |
| A04-009 | blog_cta_click — CTA handlers في المقالات | `[TRACK]` | 🟠 | 1h |
| A04-010 | portfolio_filter_apply — filter click handlers | `[TRACK]` | 🟠 | 1h |
| A04-011 | navigation_click — header/footer nav handlers | `[TRACK]` | 🟡 | 1h |

## Epic: Analytics Engine — Aggregations

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A04-012 | Analytics engine NestJS module setup | `[LOGIC]` | 🔴 | 1h |
| A04-013 | Hourly aggregation job — BullMQ cron (كل ساعة) | `[QUEUE]` | 🔴 | 2h |
| A04-014 | metrics_daily upsert — sessions by source/country/device/page | `[LOGIC]` | 🔴 | 3h |
| A04-015 | metrics_daily upsert — conversions by type | `[LOGIC]` | 🔴 | 1h |
| A04-016 | metrics_daily upsert — leads by tier + source | `[LOGIC]` | 🔴 | 1h |
| A04-017 | Bounce rate calculation | `[LOGIC]` | 🔴 | 1h |
| A04-018 | Engagement rate calculation | `[LOGIC]` | 🔴 | 1h |
| A04-019 | Average session duration calculation | `[LOGIC]` | 🔴 | 30m |

## Epic: Funnel Engine

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A04-020 | Funnels CRUD API (create/read/update/delete funnel definitions) | `[API]` | 🔴 | 2h |
| A04-021 | Seed 3 pre-built funnels (Quote / Portfolio-to-Contact / Blog-to-Contact) | `[DB]` | 🟠 | 1h |
| A04-022 | Daily funnel calculation job (BullMQ cron) | `[QUEUE]` | 🔴 | 2h |
| A04-023 | funnel_results upsert per funnel per day per step | `[LOGIC]` | 🔴 | 2h |

## Epic: Specialized View Tables

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A04-024 | service_views population من events | `[LOGIC]` | 🟠 | 1h |
| A04-025 | portfolio_views population من events | `[LOGIC]` | 🟠 | 1h |

---

# SPRINT 05 TASKS — Real-Time Analytics System

## Epic: Redis Live State

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A05-001 | Live session service — HSET live:sessions:{id} عند كل event | `[LOGIC]` | 🔴 | 2h |
| A05-002 | Session TTL management (EXPIRE 30 دقيقة، refresh عند كل نشاط) | `[LOGIC]` | 🔴 | 1h |
| A05-003 | Live visitor counter — INCR/DECR عند session start/end | `[LOGIC]` | 🔴 | 1h |
| A05-004 | Live page distribution — HINCRBY live:pages عند page_view | `[LOGIC]` | 🔴 | 1h |
| A05-005 | Events-per-minute tracking — ZADD + ZCOUNT على الأحداث | `[LOGIC]` | 🔴 | 1h |
| A05-006 | Live events feed — LPUSH + LTRIM live:events_feed (آخر 50 حدث) | `[LOGIC]` | 🔴 | 1h |
| A05-007 | Stale session cleanup job (كل 5 دقائق) | `[QUEUE]` | 🔴 | 1h |

## Epic: Redis Pub/Sub

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A05-008 | Publisher — نشر على analytics:live channel عند كل event | `[LOGIC]` | 🔴 | 1h |
| A05-009 | Lead alert publisher — نشر على analytics:leads عند إنشاء lead | `[LOGIC]` | 🔴 | 1h |
| A05-010 | Subscriber service — استهلاك analytics:live في Real-Time module | `[LOGIC]` | 🔴 | 1h |

## Epic: Socket.IO Gateway

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A05-011 | NestJS Socket.IO gateway setup | `[REAL]` | 🔴 | 2h |
| A05-012 | analytics:room — authenticated dashboard connections | `[REAL]` | 🔴 | 1h |
| A05-013 | JWT authentication للـ WebSocket connections | `[SEC]` | 🔴 | 1h |
| A05-014 | emit live:visitor_count كل 5 ثواني | `[REAL]` | 🔴 | 1h |
| A05-015 | emit live:event عند كل حدث جديد | `[REAL]` | 🔴 | 1h |
| A05-016 | emit live:page_distribution كل 10 ثواني | `[REAL]` | 🔴 | 1h |
| A05-017 | emit live:lead_alert عند إنشاء lead جديد | `[REAL]` | 🔴 | 1h |
| A05-018 | emit live:country_distribution كل 30 ثانية | `[REAL]` | 🟠 | 1h |
| A05-019 | emit live:events_per_minute كل 60 ثانية | `[REAL]` | 🟠 | 1h |
| A05-020 | GET /analytics/realtime/current — initial state عند تحميل الـ dashboard | `[API]` | 🔴 | 1h |

## Epic: Real-Time Dashboard (Next.js)

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A05-021 | Real-Time Dashboard page layout | `[DASH]` | 🔴 | 2h |
| A05-022 | WebSocket client hook (socket.io-client + auto-reconnect) | `[DASH]` | 🔴 | 2h |
| A05-023 | Live visitor count widget (رقم كبير + pulse animation) | `[DASH]` | 🔴 | 1h |
| A05-024 | Live event feed component (scrolling list, آخر 50 حدث) | `[DASH]` | 🔴 | 2h |
| A05-025 | Live page distribution chart (horizontal bar، يتحدث تلقائيًا) | `[DASH]` | 🔴 | 2h |
| A05-026 | Live lead alert toast notification | `[DASH]` | 🔴 | 1h |
| A05-027 | Live country distribution (top 5 list) | `[DASH]` | 🟠 | 1h |
| A05-028 | Events per minute sparkline | `[DASH]` | 🟠 | 1h |
| A05-029 | SSE fallback إذا WebSocket محجوب | `[REAL]` | 🟠 | 2h |

---

# SPRINT 06 TASKS — Core Dashboards

## Epic: Dashboard APIs

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A06-001 | GET /analytics/executive/kpis?from=&to= | `[API]` | 🔴 | 2h |
| A06-002 | GET /analytics/executive/trends?from=&to= | `[API]` | 🔴 | 1h |
| A06-003 | GET /analytics/traffic/sources?from=&to= | `[API]` | 🔴 | 1h |
| A06-004 | GET /analytics/traffic/landing-pages?from=&to= | `[API]` | 🔴 | 1h |
| A06-005 | GET /analytics/traffic/geo?from=&to= | `[API]` | 🔴 | 1h |
| A06-006 | GET /analytics/traffic/devices?from=&to= | `[API]` | 🔴 | 1h |
| A06-007 | GET /analytics/services/ranking?from=&to= | `[API]` | 🔴 | 1h |
| A06-008 | GET /analytics/services/:slug/detail?from=&to= | `[API]` | 🟠 | 1h |
| A06-009 | GET /analytics/campaigns/performance?from=&to= | `[API]` | 🟠 | 1h |
| A06-010 | Redis cache layer لكل dashboard APIs (5-minute cache) | `[PERF]` | 🔴 | 2h |

## Epic: Dashboard Shell

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A06-011 | Analytics dashboard app scaffold | `[DASH]` | 🔴 | 2h |
| A06-012 | Dashboard sidebar navigation (كل الـ routes) | `[DASH]` | 🔴 | 2h |
| A06-013 | Date range picker component (reusable في كل الـ dashboards) | `[DASH]` | 🔴 | 2h |
| A06-014 | RBAC middleware للـ dashboard routes | `[SEC]` | 🔴 | 2h |
| A06-015 | Dashboard API client (axios + JWT) | `[DASH]` | 🔴 | 1h |

## Epic: Executive Dashboard

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A06-016 | Executive Dashboard page layout | `[DASH]` | 🔴 | 1h |
| A06-017 | KPI stat cards strip (5 cards: sessions/visitors/leads/CVR/top-source) | `[DASH]` | 🔴 | 2h |
| A06-018 | Sessions + Leads trend line chart (Recharts، 30 يوم) | `[DASH]` | 🔴 | 2h |
| A06-019 | Traffic source donut chart | `[DASH]` | 🔴 | 1h |
| A06-020 | Top services by conversion bar chart | `[DASH]` | 🔴 | 1h |
| A06-021 | Recent leads table (آخر 10) | `[DASH]` | 🔴 | 1h |
| A06-022 | Campaign performance table | `[DASH]` | 🟠 | 1h |

## Epic: Traffic Dashboard

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A06-023 | Traffic Dashboard page layout | `[DASH]` | 🔴 | 1h |
| A06-024 | Sessions by source stacked bar chart | `[DASH]` | 🔴 | 2h |
| A06-025 | New vs returning visitors line chart | `[DASH]` | 🔴 | 1h |
| A06-026 | Sessions by device donut chart | `[DASH]` | 🔴 | 1h |
| A06-027 | Top landing pages table | `[DASH]` | 🔴 | 2h |
| A06-028 | Top referrers table | `[DASH]` | 🟠 | 1h |
| A06-029 | Geographic top-10 bar chart | `[DASH]` | 🟠 | 1h |

## Epic: Service Dashboard

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A06-030 | Service Dashboard page layout | `[DASH]` | 🔴 | 1h |
| A06-031 | Services ranked by views horizontal bar | `[DASH]` | 🔴 | 1h |
| A06-032 | Services ranked by CTA click rate bar | `[DASH]` | 🔴 | 1h |
| A06-033 | Services ranked by scroll depth 75%+ bar | `[DASH]` | 🟠 | 1h |
| A06-034 | Service detail table (sortable) | `[DASH]` | 🔴 | 2h |

---

# SPRINT 07 TASKS — Lead + Conversion + Funnel + Portfolio Dashboards

## Epic: Lead Dashboard APIs

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A07-001 | GET /leads (paginated، filtered بـ tier/status/source/date) | `[API]` | 🔴 | 2h |
| A07-002 | GET /leads/:id (full detail مع decrypted PII — admin only) | `[API]` | 🔴 | 2h |
| A07-003 | GET /leads/:id/session-history | `[API]` | 🔴 | 1h |
| A07-004 | PATCH /leads/:id (status update) | `[API]` | 🔴 | 1h |
| A07-005 | GET /analytics/leads/trends?from=&to= | `[API]` | 🔴 | 1h |
| A07-006 | GET /leads/export (CSV download) | `[API]` | 🟠 | 1h |

## Epic: Lead Dashboard (Next.js)

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A07-007 | Lead Dashboard page layout | `[DASH]` | 🔴 | 1h |
| A07-008 | Lead tier stat cards (hot/warm/interested count) | `[DASH]` | 🔴 | 1h |
| A07-009 | Lead table (sortable, paginated, filterable) | `[DASH]` | 🔴 | 3h |
| A07-010 | Lead filter bar (tier/status/source/date) | `[DASH]` | 🔴 | 1h |
| A07-011 | Lead detail drawer (slide-in panel) | `[DASH]` | 🔴 | 3h |
| A07-012 | Session history timeline في الـ drawer | `[DASH]` | 🔴 | 2h |
| A07-013 | Clarity recording link button في الـ drawer | `[DASH]` | 🟠 | 30m |
| A07-014 | Lead status update (dropdown في الـ table أو الـ drawer) | `[DASH]` | 🔴 | 1h |
| A07-015 | Lead export CSV button | `[DASH]` | 🟠 | 1h |
| A07-016 | Lead source bar chart | `[DASH]` | 🟠 | 1h |

## Epic: Conversion Dashboard

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A07-017 | GET /analytics/conversions/summary?from=&to= | `[API]` | 🔴 | 1h |
| A07-018 | GET /analytics/conversions/by-type?from=&to= | `[API]` | 🔴 | 1h |
| A07-019 | GET /analytics/conversions/attribution?from=&to= | `[API]` | 🔴 | 1h |
| A07-020 | Conversion Dashboard page layout | `[DASH]` | 🔴 | 1h |
| A07-021 | Conversion rate trend line chart | `[DASH]` | 🔴 | 1h |
| A07-022 | Conversion by type donut chart | `[DASH]` | 🔴 | 1h |
| A07-023 | Attribution by source bar chart | `[DASH]` | 🔴 | 1h |
| A07-024 | Time to convert histogram | `[DASH]` | 🟠 | 2h |
| A07-025 | Pages before conversion bar chart | `[DASH]` | 🟠 | 1h |

## Epic: Funnel Dashboard

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A07-026 | GET /analytics/funnels/:id/results?from=&to= | `[API]` | 🔴 | 1h |
| A07-027 | Funnel visualization component (step-by-step drop-off) | `[DASH]` | 🔴 | 3h |
| A07-028 | Funnel selector dropdown (للتبديل بين الـ funnels) | `[DASH]` | 🟠 | 1h |
| A07-029 | Drop-off rate + count per step | `[DASH]` | 🔴 | 1h |

## Epic: Portfolio Dashboard

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A07-030 | GET /analytics/portfolio/ranking?from=&to= | `[API]` | 🔴 | 1h |
| A07-031 | GET /analytics/portfolio/:slug/detail?from=&to= | `[API]` | 🟠 | 1h |
| A07-032 | Portfolio Dashboard page layout | `[DASH]` | 🔴 | 1h |
| A07-033 | Top case studies by views bar chart | `[DASH]` | 🔴 | 1h |
| A07-034 | Top case studies by read completion bar chart | `[DASH]` | 🔴 | 1h |
| A07-035 | Case study detail table | `[DASH]` | 🟠 | 1h |

---

# SPRINT 08 TASKS — GA4 + Microsoft Clarity Integration

## Epic: GA4 SDK Integration

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A08-001 | تثبيت وتهيئة gtag.js في الموقع | `[INT]` | 🔴 | 1h |
| A08-002 | GA4 page_view على كل route change | `[INT]` | 🔴 | 1h |
| A08-003 | Mirror service_detail_view → GA4 view_item | `[INT]` | 🔴 | 1h |
| A08-004 | Mirror portfolio_case_study_view → GA4 select_content | `[INT]` | 🔴 | 1h |
| A08-005 | Mirror quote_request_start → GA4 begin_checkout | `[INT]` | 🔴 | 1h |
| A08-006 | Mirror quote_request_submit → GA4 purchase | `[INT]` | 🔴 | 1h |
| A08-007 | Mirror consultation_book_submit → GA4 generate_lead | `[INT]` | 🔴 | 1h |
| A08-008 | Mirror whatsapp_click → GA4 contact (method: whatsapp) | `[INT]` | 🔴 | 1h |
| A08-009 | Mirror phone_click → GA4 contact (method: phone) | `[INT]` | 🔴 | 1h |
| A08-010 | Mirror email_click → GA4 contact (method: email) | `[INT]` | 🔴 | 1h |
| A08-011 | Mirror company_profile_download → GA4 file_download | `[INT]` | 🔴 | 1h |
| A08-012 | إضافة custom dimension parameters لكل GA4 calls | `[INT]` | 🟠 | 2h |

## Epic: GA4 Admin Configuration

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A08-013 | GA4 Admin: إنشاء 7 custom dimensions | `[INT]` | 🔴 | 1h |
| A08-014 | GA4 Admin: تحديد 5 conversion events | `[INT]` | 🔴 | 1h |
| A08-015 | GA4 Admin: إنشاء 5 audiences | `[INT]` | 🟠 | 1h |
| A08-016 | GA4 Admin: Data retention → 14 months | `[INT]` | 🟠 | 15m |
| A08-017 | GA4 Admin: تفعيل Google Signals | `[INT]` | 🟠 | 15m |

## Epic: GA4 Consent Mode

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A08-018 | تطبيق GA4 Consent Mode v2 | `[INT]` | 🔴 | 2h |
| A08-019 | حجب GA4 initialization حتى يُعطى الـ analytics consent | `[INT]` | 🔴 | 1h |

## Epic: GA4 Validation

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A08-020 | GA4 DebugView validation — كل الـ P0 events موجودة | `[TEST]` | 🔴 | 2h |
| A08-021 | Parity check — internal sessions vs GA4 sessions (48h) | `[TEST]` | 🔴 | 1h |
| A08-022 | Parity check — internal conversions vs GA4 goals | `[TEST]` | 🔴 | 1h |

## Epic: Microsoft Clarity Installation

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A08-023 | تثبيت Clarity script في website <head> | `[INT]` | 🔴 | 1h |
| A08-024 | تطبيق data-clarity-mask على كل form fields | `[INT]` | 🔴 | 1h |
| A08-025 | تهيئة IP masking في Clarity admin | `[INT]` | 🔴 | 15m |
| A08-026 | حجب Clarity initialization حتى يُعطى الـ consent | `[INT]` | 🔴 | 1h |

## Epic: Clarity Custom Events & Linking

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A08-027 | clarity('set', 'sessionId', internalSessionId) | `[INT]` | 🟠 | 30m |
| A08-028 | clarity('set', 'visitorId', anonymousId) | `[INT]` | 🟠 | 30m |
| A08-029 | clarity('event', ...) لأهم الأحداث (QuoteFormStart, WhatsAppClick) | `[INT]` | 🟠 | 1h |
| A08-030 | التقاط clarity_session_id وتخزينه في lead record | `[INT]` | 🟠 | 1h |
| A08-031 | Clarity recording link في Lead Detail Drawer | `[DASH]` | 🟠 | 30m |

---

# SPRINT 09 TASKS — Reporting System + Alerts

## Epic: Report Service (NestJS)

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A09-001 | Report NestJS module setup | `[SETUP]` | 🔴 | 1h |
| A09-002 | Daily report data aggregator service | `[LOGIC]` | 🔴 | 2h |
| A09-003 | Weekly report data aggregator service | `[LOGIC]` | 🔴 | 2h |
| A09-004 | Monthly report data aggregator service | `[LOGIC]` | 🔴 | 2h |

## Epic: Email Reports

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A09-005 | SMTP configuration (@nestjs-modules/mailer) | `[SETUP]` | 🔴 | 1h |
| A09-006 | Daily report HTML email template | `[LOGIC]` | 🔴 | 2h |
| A09-007 | BullMQ cron — daily report ('0 8 * * *') | `[QUEUE]` | 🔴 | 1h |
| A09-008 | BullMQ cron — weekly report ('0 9 * * 1') | `[QUEUE]` | 🔴 | 1h |
| A09-009 | BullMQ cron — monthly report ('0 9 1 * *') | `[QUEUE]` | 🔴 | 1h |
| A09-010 | Report recipient management (env config) | `[LOGIC]` | 🟠 | 1h |

## Epic: PDF Report Generation

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A09-011 | تثبيت وتهيئة Puppeteer | `[SETUP]` | 🔴 | 1h |
| A09-012 | Weekly report HTML template (للـ PDF rendering) | `[LOGIC]` | 🔴 | 3h |
| A09-013 | PDF generation service (Puppeteer renderPDF) | `[LOGIC]` | 🔴 | 2h |
| A09-014 | PDF storage (حفظ في /reports directory) | `[LOGIC]` | 🔴 | 1h |
| A09-015 | reports table INSERT عند كل تقرير مُولَّد | `[LOGIC]` | 🔴 | 30m |

## Epic: Excel Report Generation

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A09-016 | تثبيت exceljs | `[SETUP]` | 🔴 | 30m |
| A09-017 | Monthly report Excel builder (multiple tabs: traffic/leads/conversions/services) | `[LOGIC]` | 🔴 | 3h |
| A09-018 | Excel file storage | `[LOGIC]` | 🔴 | 30m |

## Epic: Report APIs & Dashboard

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A09-019 | GET /reports — قائمة كل التقارير المُولَّدة | `[API]` | 🔴 | 1h |
| A09-020 | GET /reports/:id/download — stream file للـ client | `[API]` | 🔴 | 1h |
| A09-021 | POST /reports/generate — توليد تقرير يدويًا | `[API]` | 🟠 | 1h |
| A09-022 | Reports Dashboard page (library + download + generate) | `[DASH]` | 🔴 | 3h |

## Epic: Alert System

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A09-023 | Alert configuration CRUD API | `[API]` | 🔴 | 2h |
| A09-024 | Alert evaluation job — hourly BullMQ cron | `[QUEUE]` | 🔴 | 2h |
| A09-025 | Alert threshold evaluation logic (gt/lt/change_pct) | `[LOGIC]` | 🔴 | 2h |
| A09-026 | Alert notification — email على trigger | `[LOGIC]` | 🔴 | 1h |
| A09-027 | Alert notification — WebSocket push للـ dashboard | `[LOGIC]` | 🔴 | 1h |
| A09-028 | Alert management page في الـ dashboard | `[DASH]` | 🟠 | 2h |
| A09-029 | Alert badge في dashboard header | `[DASH]` | 🟠 | 1h |

---

# SPRINT 10 TASKS — Security + QA + Performance + Launch

## Epic: GDPR Compliance

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A10-001 | Cookie consent banner component (Accept/Reject/Customize) | `[SEC]` | 🔴 | 3h |
| A10-002 | Consent levels (Necessary / Analytics / Marketing) | `[SEC]` | 🔴 | 1h |
| A10-003 | SDK consent gate — لا أحداث تُرسَل قبل الـ consent | `[SDK]` | 🔴 | 1h |
| A10-004 | GA4 consent mode blocking | `[SEC]` | 🔴 | 1h |
| A10-005 | Clarity blocking حتى consent | `[SEC]` | 🔴 | 30m |
| A10-006 | Consent withdrawal — مسح cookies + إيقاف tracking | `[SEC]` | 🔴 | 1h |
| A10-007 | Data deletion API (GDPR request) | `[API]` | 🔴 | 2h |
| A10-008 | Data retention enforcement job (BullMQ monthly cron) | `[QUEUE]` | 🔴 | 2h |

## Epic: Security Hardening

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A10-009 | Rate limiting audit + hardening | `[SEC]` | 🔴 | 1h |
| A10-010 | CORS configuration final verification | `[SEC]` | 🔴 | 30m |
| A10-011 | Input validation audit — كل الـ DTOs | `[SEC]` | 🔴 | 2h |
| A10-012 | SQL injection test | `[TEST]` | 🔴 | 1h |
| A10-013 | XSS test — inject في event properties | `[TEST]` | 🔴 | 1h |
| A10-014 | Auth bypass test — dashboard بدون JWT | `[TEST]` | 🔴 | 1h |
| A10-015 | PII exposure test — لا raw PII في أي API response | `[TEST]` | 🔴 | 1h |

## Epic: Performance Optimization

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A10-016 | EXPLAIN ANALYZE على كل heavy dashboard queries | `[PERF]` | 🔴 | 2h |
| A10-017 | إضافة indexes مفقودة بناءً على query analysis | `[DB]` | 🔴 | 1h |
| A10-018 | Redis query cache لأكثر 5 APIs استدعاءً | `[PERF]` | 🔴 | 2h |
| A10-019 | Dashboard API response time verification (P95 < 2s) | `[PERF]` | 🔴 | 1h |

## Epic: Load Testing

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A10-020 | k6 load test — 500 events/s لمدة 10 دقائق | `[TEST]` | 🔴 | 2h |
| A10-021 | k6 WebSocket test — 50 concurrent connections | `[TEST]` | 🔴 | 1h |
| A10-022 | إصلاح bottlenecks من load test | `[PERF]` | 🔴 | 2h |

## Epic: Tracking QA

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A10-023 | اختبار يدوي لكل الـ 35 events على staging website | `[TEST]` | 🔴 | 3h |
| A10-024 | GA4 DebugView final verification | `[TEST]` | 🔴 | 1h |
| A10-025 | Clarity PII masking final verification | `[TEST]` | 🔴 | 30m |
| A10-026 | Cross-browser tracking test (Chrome/Firefox/Safari/Mobile) | `[TEST]` | 🔴 | 2h |
| A10-027 | Bot filtering test | `[TEST]` | 🔴 | 30m |
| A10-028 | Consent blocking test — لا events قبل الـ consent | `[TEST]` | 🔴 | 1h |

## Epic: Production Deployment

| ID | المهمة | النوع | الأولوية | الوقت |
|---|---|---|---|---|
| A10-029 | Production database migration | `[INFRA]` | 🔴 | 1h |
| A10-030 | Production environment configuration | `[INFRA]` | 🔴 | 1h |
| A10-031 | Deploy analytics API إلى production | `[INFRA]` | 🔴 | 1h |
| A10-032 | Production tracking SDK integration | `[INFRA]` | 🔴 | 30m |
| A10-033 | تهيئة monitoring (Sentry + uptime checks) | `[INFRA]` | 🟠 | 1h |
| A10-034 | Team runbook (how to debug tracking issues) | `[SETUP]` | 🟠 | 2h |

---

## إجمالي المهام

| السبرينت | عدد المهام | التقدير الزمني |
|---|---|---|
| Sprint 00 | 30 مهمة | ~30 ساعة |
| Sprint 01 | 29 مهمة | ~35 ساعة |
| Sprint 02 | 23 مهمة | ~28 ساعة |
| Sprint 03 | 20 مهمة | ~25 ساعة |
| Sprint 04 | 25 مهمة | ~32 ساعة |
| Sprint 05 | 29 مهمة | ~38 ساعة |
| Sprint 06 | 34 مهمة | ~42 ساعة |
| Sprint 07 | 35 مهمة | ~44 ساعة |
| Sprint 08 | 31 مهمة | ~32 ساعة |
| Sprint 09 | 29 مهمة | ~38 ساعة |
| Sprint 10 | 34 مهمة | ~38 ساعة |
| **الإجمالي** | **319 مهمة** | **~382 ساعة** |
