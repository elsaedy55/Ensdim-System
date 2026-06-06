# SPRINT 00 — Infrastructure + Database + Security Foundation
# البنية التحتية + قاعدة البيانات + أساس الأمان

---

## معلومات السبرينت

| المعلومة | التفاصيل |
|---|---|
| رقم السبرينت | 00 |
| المرحلة | Phase A — Foundation |
| تاريخ البدء | 2026-06-05 |
| تاريخ الانتهاء | 2026-06-18 |
| المدة | أسبوعان (10 أيام عمل) |
| التقدير الزمني | ~30 ساعة |
| عدد المهام | 30 مهمة |
| Story Points | 34 |

---

## هدف السبرينت

> بنهاية هذا السبرينت، تكون كل البنية التحتية جاهزة تمامًا: Analytics API يعمل محليًا وعلى الـ staging، قاعدة البيانات بكل الـ 13 جدول منشأة، Redis وBullMQ مُهيأن، وكل طبقة الأمان الأساسية مطبقة. يستطيع أي developer يبدأ بناء الـ tracking SDK والـ workers فورًا.

---

## نتائج (Deliverables) السبرينت

- [ ] analytics-api NestJS service يعمل على localhost
- [ ] كل الـ 13 جدول منشأة في staging PostgreSQL
- [ ] events table مُعدَّة للـ partitioning الشهري
- [ ] Redis connection يعمل
- [ ] BullMQ queues مُهيأة (events.queue / analytics.queue / reports.queue)
- [ ] API key middleware يعمل (write key / read key)
- [ ] Rate limiting مُطبَّق
- [ ] Docker Compose للـ local dev يعمل
- [ ] CI/CD pipeline يعمل على GitHub Actions
- [ ] Staging environment جاهز

---

## معيار الإتمام (Definition of Done)

السبرينت مكتمل عندما:
- [ ] `pnpm dev` يشغّل الـ analytics API على localhost:4000 بدون أخطاء
- [ ] `pnpm run migration:run` ينجح على الـ staging database
- [ ] كل الـ 13 جدول موجودة بالـ columns والـ indexes الصحيحة
- [ ] POST /track/events بـ write key يعيد 202 Accepted
- [ ] POST /track/events بدون key أو بـ wrong key يعيد 401
- [ ] 200 request/minute+ يُوجد rate limiting response
- [ ] `docker-compose up` يشغّل Postgres + Redis محليًا

---

## المهام التفصيلية

### EPIC 1: Analytics Service Setup
**الهدف:** scaffold الـ NestJS service بالبنية الصحيحة

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A00-001 | إنشاء analytics-api NestJS service scaffold | 🔴 | 3h | ⬜ |
| A00-002 | تهيئة module structure: TrackingModule / AnalyticsModule / RealtimeModule / LeadsModule / ReportsModule | 🔴 | 2h | ⬜ |
| A00-003 | إعداد environment variables schema (Zod validation) | 🔴 | 1h | ⬜ |
| A00-004 | إعداد ESLint + Prettier | 🟠 | 30m | ⬜ |
| A00-005 | إعداد path aliases في tsconfig.json | 🔴 | 30m | ⬜ |

**تفاصيل A00-002 — Module Structure:**
```
src/
├── modules/
│   ├── tracking/          → TrackingController, TrackingService, TrackingWorker
│   ├── analytics/         → AnalyticsService, AggregationWorker, FunnelWorker
│   ├── realtime/          → RealtimeGateway, LiveSessionService
│   ├── leads/             → LeadsService, LeadsController
│   └── reports/           → ReportsService, ReportsCron
├── shared/
│   ├── redis/             → RedisModule, RedisService
│   ├── encryption/        → EncryptionService (AES-256-GCM)
│   ├── geo/               → GeoService (ip-api.com)
│   └── guards/            → ApiKeyGuard, JwtGuard
├── config/                → configuration.ts (Zod schema)
└── main.ts
```

---

### EPIC 2: Database Schema & Migration
**الهدف:** كل الـ 13 جدول منشأة بالـ indexes والـ constraints الصحيحة

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A00-006 | Prisma schema — جدول visitors | 🔴 | 1h | ⬜ |
| A00-007 | Prisma schema — جدول sessions | 🔴 | 1h | ⬜ |
| A00-008 | Prisma schema — جدول events | 🔴 | 1h | ⬜ |
| A00-009 | Prisma schema — جدول leads (PII fields مُحددة للتشفير) | 🔴 | 1h | ⬜ |
| A00-010 | Prisma schema — جدول conversions | 🔴 | 1h | ⬜ |
| A00-011 | Prisma schema — جدول traffic_sources | 🔴 | 30m | ⬜ |
| A00-012 | Prisma schema — جداول service_views + portfolio_views | 🔴 | 1h | ⬜ |
| A00-013 | Prisma schema — جداول funnels + funnel_results | 🔴 | 1h | ⬜ |
| A00-014 | Prisma schema — campaigns + user_journeys + real_time_sessions | 🔴 | 1h | ⬜ |
| A00-015 | Prisma schema — metrics_daily + alerts + audit_logs | 🔴 | 1h | ⬜ |
| A00-016 | تهيئة events table partitioning بالشهر (PostgreSQL RANGE) | 🟠 | 1h | ⬜ |
| A00-017 | تشغيل initial Prisma migration على staging | 🔴 | 1h | ⬜ |
| A00-018 | Seed database ببيانات تجريبية (visitors + sessions + events) | 🟠 | 1h | ⬜ |

**تفاصيل A00-016 — Events Table Partitioning:**
```sql
-- events table partitioned by month on event_timestamp
-- Prisma لا يدعم partitioning مباشرة — يُنشأ بـ raw SQL migration

CREATE TABLE events (
  id UUID NOT NULL,
  event_timestamp TIMESTAMPTZ NOT NULL,
  ...
) PARTITION BY RANGE (event_timestamp);

CREATE TABLE events_2026_06 PARTITION OF events
  FOR VALUES FROM ('2026-06-01') TO ('2026-07-01');

-- إنشاء partition جديد كل شهر بـ cron job
```

---

### EPIC 3: Redis + Queue Setup
**الهدف:** Redis وBullMQ جاهزان للاستخدام

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A00-019 | تهيئة Redis connection في NestJS (ioredis) | 🔴 | 1h | ⬜ |
| A00-020 | إعداد BullMQ queues: events.queue / analytics.queue / reports.queue | 🔴 | 1h | ⬜ |
| A00-021 | تثبيت Bull Board (monitoring dashboard للـ queues) | 🟡 | 30m | ⬜ |

**Queue Configuration:**
```
events.queue:
  - concurrency: 20
  - attempts: 3
  - backoff: exponential (1s, 2s, 4s)

analytics.queue:
  - concurrency: 5
  - attempts: 2

reports.queue:
  - concurrency: 2
  - attempts: 1
```

---

### EPIC 4: Infrastructure & CI/CD
**الهدف:** بيئة تطوير محلية وstaging يعملان

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A00-022 | Docker Compose للـ local dev (PostgreSQL 16 + Redis 7) | 🔴 | 2h | ⬜ |
| A00-023 | GitHub Actions CI pipeline (lint + typecheck + test) | 🟠 | 1h | ⬜ |
| A00-024 | إعداد staging environment (DigitalOcean Droplet أو AWS EC2) | 🔴 | 2h | ⬜ |
| A00-025 | تهيئة .env files لكل environment (dev / staging / prod) | 🔴 | 30m | ⬜ |

**تفاصيل A00-022 — Docker Compose:**
```yaml
services:
  postgres:
    image: postgres:16-alpine
    ports: ["5433:5432"]
    environment:
      POSTGRES_DB: ensdim_analytics
      POSTGRES_USER: analytics
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports: ["6380:6379"]
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
```

---

### EPIC 5: API Security Foundation
**الهدف:** كل طبقة الأمان الأساسية جاهزة

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A00-026 | API key middleware: write key (للـ SDK) / read key (للـ dashboard) | 🔴 | 2h | ⬜ |
| A00-027 | CORS configuration: allowlist domain الموقع فقط | 🔴 | 30m | ⬜ |
| A00-028 | Global rate limiting: 100 requests/minute per IP (Redis sliding window) | 🔴 | 2h | ⬜ |
| A00-029 | Helmet.js security headers | 🟠 | 30m | ⬜ |
| A00-030 | README — local dev setup documentation | 🟠 | 1h | ⬜ |

**API Keys Strategy:**
```
ANALYTICS_WRITE_KEY → Used by tracking SDK (public — in website JS)
  - Can only POST /track/*
  - Rate limited: 100 req/min per IP
  
ANALYTICS_READ_KEY → Used by dashboard (private — server-side only)
  - Can GET /analytics/*
  - Can GET /leads/*
  - Rate limited: 1000 req/min per IP

ANALYTICS_ADMIN_KEY → Used for admin operations
  - Can DELETE, manage alerts, generate reports
```

---

## خطة التنفيذ اليومية

| اليوم | المهام |
|---|---|
| Day 1 (Mon) | A00-001 → A00-005 (Service scaffold + modules) |
| Day 2 (Tue) | A00-006 → A00-010 (Database schema: visitors/sessions/events/leads/conversions) |
| Day 3 (Wed) | A00-011 → A00-015 (Database schema: traffic/views/funnels/metrics/alerts) |
| Day 4 (Thu) | A00-016 → A00-018 (Partitioning + migration + seed) |
| Day 5 (Fri) | A00-019 → A00-021 (Redis + BullMQ) |
| Day 6 (Mon) | A00-022 → A00-025 (Docker + CI + Infra) |
| Day 7 (Tue) | A00-026 → A00-030 (Security + README) |

---

## المخاطر والتبعيات

| المخاطرة | الاحتمال | الحل |
|---|---|---|
| تأخر الـ staging environment provisioning | متوسط | البدء بـ Docker locally + migrate to staging بعدها |
| PostgreSQL partitioning غير مدعوم بـ Prisma مباشرة | مرتفع | استخدام raw SQL migrations لإنشاء partitions |
| Redis connection issues في الـ staging | منخفض | التأكد من firewall rules + connection string صحيح |

---

## قائمة التحقق (Sprint Review Checklist)

```
[ ] pnpm dev → analytics API يعمل على localhost:4000
[ ] كل 13 جدول موجود في staging DB
[ ] POST /track/events → 202 Accepted مع valid write key
[ ] POST /track/events → 401 بدون key
[ ] 200 req/min → يبدأ rate limiting
[ ] docker-compose up → Postgres + Redis يعملان
[ ] GitHub Actions CI → يعمل على كل push
[ ] Staging environment accessible
[ ] TypeScript 0 errors
```
