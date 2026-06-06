# SPRINT 03 — Lead & Conversion Pipeline
# خط أنابيب الـ Leads والتحويلات

---

## معلومات السبرينت

| المعلومة | التفاصيل |
|---|---|
| رقم السبرينت | 03 |
| المرحلة | Phase B — Event Coverage |
| تاريخ البدء | 2026-07-17 |
| تاريخ الانتهاء | 2026-07-30 |
| المدة | أسبوعان |
| التقدير الزمني | ~25 ساعة |
| عدد المهام | 20 مهمة |
| Story Points | 39 |
| 🎯 MVP Milestone | الـ MVP يُطلق بعد هذا السبرينت |

---

## هدف السبرينت

> بنهاية هذا السبرينت، كل lead يُنشأ تلقائيًا في قاعدة البيانات مع كامل تاريخ جلسته وبيانات الإسناد. فريق المبيعات يرى الـ leads فورًا مع معرفة ما شاهده الزائر قبل التواصل. هذا السبرينت يُنجز الـ MVP.

---

## نتائج (Deliverables) السبرينت

- [ ] quote_request_start / field_complete / submit / abandon تعمل
- [ ] consultation_book_start / submit تعملان
- [ ] Lead creation service يعمل (quote + consultation)
- [ ] Lead tier classification (hot / warm / interested)
- [ ] Lead enrichment (session history + attribution)
- [ ] PII encryption (email / phone / message) يعمل
- [ ] conversions table يُملأ عند كل primary conversion
- [ ] Lead notifications تُرسَل عبر Redis PubSub

---

## معيار الإتمام (Definition of Done)

- [ ] Submit quote form → lead record في leads table خلال < 2 ثانية
- [ ] Lead يحتوي على tier + source + session history + attribution
- [ ] email وphone وmessage مُشفَّرة في الـ DB (AES-256)
- [ ] conversions table يُملأ مع time_to_convert صحيح
- [ ] Form abandon يُكتشف صحيح (يُرسَل عند session_end إذا form بدأت)
- [ ] Redis PubSub يُنشر عند كل lead جديد
- [ ] Unit tests: Lead tier classification → Pass

---

## المهام التفصيلية

### EPIC 1: Quote Form Event Tracking
**الهدف:** كل خطوة في فورم طلب الاقتباس مُتتبَّعة

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A03-001 | quote_request_start — أول focus على أي field في الفورم | 🔴 | 1h | ⬜ |
| A03-002 | quote_request_field_complete — blur handler (field name فقط، لا values) | 🔴 | 1h | ⬜ |
| A03-003 | quote_request_submit — form success handler بعد API 200 | 🔴 | 1h | ⬜ |
| A03-004 | quote_request_abandon — يُكتشف عند session_end | 🔴 | 2h | ⬜ |

**تفاصيل A03-001 — quote_request_start:**
```json
{
  "event_name": "quote_request_start",
  "properties": {
    "form_id": "quote_form_contact",
    "first_field_name": "name"
  }
}
```

**تفاصيل A03-002 — قاعدة مهمة:**
```
❌ ممنوع: { "email": "user@example.com" }
✅ صحيح:  { "field_name": "email", "field_index": 2 }

لا نُخزِّن قيم الـ fields أبدًا في الـ events
نُخزِّن اسم الـ field ومؤشره فقط
```

**تفاصيل A03-004 — Form Abandon Detection:**
```
Logic في session_end:
1. هل session تحتوي على quote_request_start؟
2. هل session لا تحتوي على quote_request_submit؟
3. إذا نعم → إنشاء quote_request_abandon event
4. Properties: last_field_touched, fields_completed_count, time_spent_on_form_seconds
```

---

### EPIC 2: Consultation Events
**الهدف:** حجز الاستشارات مُتتبَّع

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A03-005 | consultation_book_start — calendar/booking form يُفتَح | 🔴 | 1h | ⬜ |
| A03-006 | consultation_book_submit — booking confirmed (API 200) | 🔴 | 1h | ⬜ |

---

### EPIC 3: Lead Creation Pipeline (NestJS)
**الهدف:** الـ leads تُنشأ تلقائيًا مع كامل البيانات

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A03-007 | Lead creation service — trigger on quote_request_submit | 🔴 | 2h | ⬜ |
| A03-008 | Lead creation service — trigger on consultation_book_submit | 🔴 | 1h | ⬜ |
| A03-009 | Lead tier classification logic | 🔴 | 1h | ⬜ |
| A03-010 | Lead enrichment — session history (كل الصفحات والأحداث في الجلسة) | 🔴 | 2h | ⬜ |
| A03-011 | Lead enrichment — first-touch + last-touch attribution | 🔴 | 2h | ⬜ |
| A03-012 | PII encryption service (AES-256-GCM) | 🔴 | 2h | ⬜ |
| A03-013 | Leads table INSERT مع الـ PII fields المشفرة | 🔴 | 1h | ⬜ |

**تفاصيل A03-009 — Lead Tier Classification:**
```
Tier 1 (Hot):
  trigger_event IN ('quote_request_submit', 'consultation_book_submit')

Tier 2 (Warm):
  trigger_event IN ('whatsapp_click', 'phone_click', 'email_click')

Tier 3 (Interested):
  trigger_event IN ('company_profile_download', 'contact_page_view')
  AND session.max_scroll_depth >= 75
```

**تفاصيل A03-010 — Session History Structure:**
```json
{
  "session_history": [
    {
      "session_id": "...",
      "started_at": "2026-07-15T10:00:00Z",
      "duration_seconds": 245,
      "pages_visited": ["/", "/services/web-development", "/contact"],
      "events_count": 12,
      "traffic_source": "organic_search"
    }
  ]
}
```

**تفاصيل A03-011 — Attribution:**
```json
{
  "attribution_first": {
    "source": "organic_search",
    "referrer": "google.com",
    "utm_campaign": null,
    "first_page": "/",
    "first_seen_at": "2026-07-10T08:00:00Z"
  },
  "attribution_last": {
    "source": "direct",
    "utm_campaign": null,
    "last_page": "/contact",
    "session_number": 3
  }
}
```

**تفاصيل A03-012 — PII Encryption:**
```typescript
// EncryptionService
// Algorithm: AES-256-GCM
// Key: stored in environment variable (ENCRYPTION_KEY)
// IV: random 12 bytes per encryption (stored with ciphertext)
// Fields encrypted: email, phone, message

encrypt(plaintext: string): string {
  // returns: `${iv_hex}:${tag_hex}:${ciphertext_hex}`
}

decrypt(encrypted: string): string {
  // parses iv:tag:ciphertext and decrypts
}
```

---

### EPIC 4: Conversion Tracking
**الهدف:** كل primary conversion مُسجَّل في conversions table

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A03-014 | conversions table INSERT عند كل primary conversion | 🔴 | 1h | ⬜ |
| A03-015 | Time-to-convert calculation (session_start → conversion) | 🔴 | 1h | ⬜ |
| A03-016 | Pages-before-conversion count | 🔴 | 30m | ⬜ |

---

### EPIC 5: Notifications & External IDs
**الهدف:** Lead notifications تعمل + IDs الخارجية مُلتقَطة

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A03-017 | Lead notification — Redis PubSub publish على analytics:leads | 🔴 | 1h | ⬜ |
| A03-018 | Capture GA4 client_id من gtag cookie (_ga) | 🟠 | 1h | ⬜ |
| A03-019 | Capture Clarity session ID | 🟠 | 1h | ⬜ |
| A03-020 | تضمين ga4_client_id + clarity_session_id في quote submit payload | 🟠 | 30m | ⬜ |

---

## خطة التنفيذ اليومية

| اليوم | المهام |
|---|---|
| Day 1 (Mon) | A03-001 → A03-004 (Quote form events) |
| Day 2 (Tue) | A03-005 → A03-006 + A03-007 → A03-008 (Consultation + Lead service start) |
| Day 3 (Wed) | A03-009 → A03-011 (Tier classification + Enrichment + Attribution) |
| Day 4 (Thu) | A03-012 → A03-013 (PII Encryption + Lead INSERT) |
| Day 5 (Fri) | A03-014 → A03-016 (Conversions table) |
| Day 6 (Mon) | A03-017 → A03-020 (Notifications + External IDs) |
| Day 7 (Tue) | End-to-end testing: submit form → verify lead in DB with all data |

---

## المخاطر والتبعيات

| المخاطرة | الاحتمال | الحل |
|---|---|---|
| Form abandon detection معقدة — session_end قد لا يُرسَل | متوسط | إضافة server-side timeout check (cron كل 5 دقائق) |
| AES encryption key management | عالي | استخدام environment variable فقط — لا تخزين في DB |
| Clarity session ID قد لا يكون متاحًا فورًا | منخفض | Lazy capture بعد 2 ثانية من تحميل الصفحة |

---

## قائمة التحقق (Sprint Review Checklist)

```
[ ] Submit quote form → lead في leads table خلال < 2s
[ ] lead.tier = 'hot' لـ quote submit
[ ] lead.email مشفر في الـ DB (لا plain text)
[ ] lead.session_history يحتوي على الصفحات المزورة
[ ] lead.attribution_first و last موجودان وصحيحان
[ ] conversions table: row موجود مع time_to_convert صحيح
[ ] Form abandon: يُكتشف عند session_end بدون submit
[ ] Redis PubSub: analytics:leads يُنشر عند كل lead جديد
[ ] Unit test: Lead tier classification → Pass
[ ] TypeScript 0 errors
```

---

## 🎯 MVP Release بعد Sprint 03

بعد اكتمال هذا السبرينت، يمكن إطلاق الـ MVP الذي يشمل:
- ✅ Session & Visitor tracking
- ✅ 18 P0 events
- ✅ Lead creation pipeline
- ✅ GA4 basic events (ضرورية قبل الإطلاق — تُنفَّذ في Sprint 08 لكن الـ basic setup يُضاف هنا)
