# SPRINT 05 — Real-Time Analytics System
# نظام التحليلات اللحظية

---

## معلومات السبرينت

| المعلومة | التفاصيل |
|---|---|
| رقم السبرينت | 05 |
| المرحلة | Phase C — Real-Time + Dashboards |
| تاريخ البدء | 2026-08-14 |
| تاريخ الانتهاء | 2026-08-27 |
| المدة | أسبوعان |
| التقدير الزمني | ~38 ساعة |
| عدد المهام | 29 مهمة |
| Story Points | 40 |

---

## هدف السبرينت

> بنهاية هذا السبرينت، الـ Real-Time Dashboard يعمل بالكامل. كل حدث يُرسَله زائر في الموقع يظهر في الـ Live Feed خلال 5 ثواني. عند إنشاء lead جديد، ينبثق تنبيه فوري في الـ dashboard.

---

## نتائج (Deliverables) السبرينت

- [ ] Redis live session state يعمل
- [ ] Live visitor counter يتحدث
- [ ] Live page distribution يتحدث
- [ ] Socket.IO gateway يعمل مع JWT authentication
- [ ] كل 7 WebSocket events مُنفَّذة
- [ ] Real-Time Dashboard page في Next.js مكتملة
- [ ] Lead alert toast يظهر في < 3 ثواني من submit الفورم
- [ ] SSE fallback موجود

---

## معيار الإتمام (Definition of Done)

- [ ] Event في المتصفح → يظهر في Live Feed في ≤ 5 ثواني
- [ ] Lead alert toast يظهر في < 3 ثواني
- [ ] WebSocket يُعيد الاتصال تلقائيًا بعد انقطاع الشبكة
- [ ] Load test: 50 concurrent WebSocket connections مستقرة 10 دقائق
- [ ] Redis memory usage < 500MB في staging
- [ ] TypeScript 0 errors

---

## المهام التفصيلية

### EPIC 1: Redis Live State
**الهدف:** Redis يُخزِّن حالة الجلسات الحية

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A05-001 | Live session service — HSET live:sessions:{id} عند كل event | 🔴 | 2h | ⬜ |
| A05-002 | Session TTL management (EXPIRE 1800s، يُجدَّد على كل نشاط) | 🔴 | 1h | ⬜ |
| A05-003 | Live visitor counter (INCR عند session_start، DECR عند انتهاء TTL) | 🔴 | 1h | ⬜ |
| A05-004 | Live page distribution (HINCRBY live:pages:{page} عند page_view) | 🔴 | 1h | ⬜ |
| A05-005 | Events-per-minute (ZADD + ZCOUNT sliding window) | 🔴 | 1h | ⬜ |
| A05-006 | Live events feed (LPUSH + LTRIM live:events_feed، آخر 50 حدث) | 🔴 | 1h | ⬜ |
| A05-007 | Stale session cleanup job (BullMQ cron كل 5 دقائق) | 🔴 | 1h | ⬜ |

**تفاصيل A05-001 — Live Session Hash:**
```
Key: live:sessions:{session_id}
TTL: 1800 seconds (30 minutes)
Fields:
  visitor_id, current_page, current_page_title,
  started_at, last_event_at, event_count,
  device_type, country, city, traffic_source

يُحدَّث عند كل event من نفس الجلسة
```

**تفاصيل A05-004 — Page Distribution:**
```
عند page_view:
  HINCRBY live:pages "/services/web-development" 1

عند session_end أو TTL expiry:
  HINCRBY live:pages {exit_page} -1

Result: map من page_path → active_visitors_count
```

---

### EPIC 2: Redis Pub/Sub
**الهدف:** الأحداث تنتقل من Worker إلى Real-Time Gateway

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A05-008 | Publisher — PUBLISH analytics:live بعد كل event يُعالَج | 🔴 | 1h | ⬜ |
| A05-009 | Lead alert publisher — PUBLISH analytics:leads عند lead_created | 🔴 | 1h | ⬜ |
| A05-010 | Subscriber service — SUBSCRIBE analytics:live في RealtimeModule | 🔴 | 1h | ⬜ |

**Pub/Sub Message Format:**
```json
// analytics:live channel
{
  "type": "event",
  "event_name": "service_detail_view",
  "page_path": "/services/web-development",
  "visitor_country": "EG",
  "device_type": "mobile",
  "timestamp": "2026-08-15T10:30:00Z"
}

// analytics:leads channel
{
  "type": "lead_alert",
  "lead_id": "uuid",
  "tier": "hot",
  "trigger_event": "quote_request_submit",
  "source": "organic_search"
}
```

---

### EPIC 3: Socket.IO Gateway
**الهدف:** Real-Time WebSocket gateway للـ dashboard

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A05-011 | NestJS Socket.IO gateway setup (@WebSocketGateway) | 🔴 | 2h | ⬜ |
| A05-012 | analytics:room — dashboard connections room | 🔴 | 1h | ⬜ |
| A05-013 | JWT authentication للـ WebSocket connections | 🔴 | 1h | ⬜ |
| A05-014 | emit live:visitor_count — كل 5 ثواني (interval timer) | 🔴 | 1h | ⬜ |
| A05-015 | emit live:event — عند كل حدث جديد من Pub/Sub | 🔴 | 1h | ⬜ |
| A05-016 | emit live:page_distribution — كل 10 ثواني | 🔴 | 1h | ⬜ |
| A05-017 | emit live:lead_alert — عند lead_created من Pub/Sub | 🔴 | 1h | ⬜ |
| A05-018 | emit live:country_distribution — كل 30 ثانية | 🟠 | 1h | ⬜ |
| A05-019 | emit live:events_per_minute — كل 60 ثانية | 🟠 | 1h | ⬜ |
| A05-020 | GET /analytics/realtime/current — initial state endpoint | 🔴 | 1h | ⬜ |

---

### EPIC 4: Real-Time Dashboard (Next.js)
**الهدف:** Real-Time Dashboard UI كاملة

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A05-021 | Real-Time Dashboard page layout | 🔴 | 2h | ⬜ |
| A05-022 | WebSocket client hook (socket.io-client + auto-reconnect + SSE fallback detection) | 🔴 | 2h | ⬜ |
| A05-023 | Live visitor count widget (رقم كبير مع pulse animation) | 🔴 | 1h | ⬜ |
| A05-024 | Live event feed (scrolling list، آخر 50 حدث، fade-in animation) | 🔴 | 2h | ⬜ |
| A05-025 | Live page distribution (horizontal bar chart، auto-refresh) | 🔴 | 2h | ⬜ |
| A05-026 | Live lead alert toast (يظهر عند كل lead جديد، tier + source) | 🔴 | 1h | ⬜ |
| A05-027 | Live country distribution (top 5 list) | 🟠 | 1h | ⬜ |
| A05-028 | Events per minute sparkline (Recharts، آخر 10 دقائق) | 🟠 | 1h | ⬜ |
| A05-029 | SSE fallback implementation (إذا WebSocket محجوب) | 🟠 | 2h | ⬜ |

**تفاصيل A05-024 — Live Event Feed Item:**
```
[🇪🇬 Cairo] [Mobile] service_detail_view → /services/web-development    2s ago
[🇸🇦 Riyadh] [Desktop] portfolio_case_study_view → /case-studies/app    5s ago
[🇦🇪 Dubai] [Mobile] whatsapp_click ← 🔥 Lead!                         8s ago
```

---

## خطة التنفيذ اليومية

| اليوم | المهام |
|---|---|
| Day 1 (Mon) | A05-001 → A05-004 (Redis: sessions + counter + pages) |
| Day 2 (Tue) | A05-005 → A05-007 (Redis: events/min + feed + cleanup) |
| Day 3 (Wed) | A05-008 → A05-010 (Pub/Sub publisher + subscriber) |
| Day 4 (Thu) | A05-011 → A05-015 (Socket.IO gateway + core emitters) |
| Day 5 (Fri) | A05-016 → A05-020 (Remaining emitters + REST endpoint) |
| Day 6 (Mon) | A05-021 → A05-026 (Dashboard core components) |
| Day 7 (Tue) | A05-027 → A05-029 + End-to-end testing |

---

## المخاطر والتبعيات

| المخاطرة | الاحتمال | الحل |
|---|---|---|
| WebSocket محجوب في بعض الشبكات أو proxies | متوسط | SSE fallback مُطبَّق (A05-029) |
| Redis memory يتراكم إذا لم تُمسح الجلسات | منخفض | TTL على كل key + cleanup job (A05-007) |
| Socket.IO scaling مع multiple server instances | منخفض | Redis adapter لـ Socket.IO |

---

## قائمة التحقق (Sprint Review Checklist)

```
[ ] End-to-end: Event في المتصفح → Live Feed في ≤ 5s
[ ] Lead submit في tab 1 → Lead alert toast في dashboard في ≤ 3s
[ ] Live visitor count يتغير عند فتح/إغلاق جلسة
[ ] Live page distribution يتحدث عند التنقل بين الصفحات
[ ] WebSocket يُعيد الاتصال بعد قطع الإنترنت 30 ثانية
[ ] Load test: 50 concurrent WS connections → مستقرة 10 دقائق
[ ] JWT authentication: connection بدون token → rejected
[ ] TypeScript 0 errors
```
