# SPRINT 02 — P0 Events Implementation
# تطبيق الأحداث الحرجة (18 حدث P0)

---

## معلومات السبرينت

| المعلومة | التفاصيل |
|---|---|
| رقم السبرينت | 02 |
| المرحلة | Phase B — Event Coverage |
| تاريخ البدء | 2026-07-03 |
| تاريخ الانتهاء | 2026-07-16 |
| المدة | أسبوعان |
| التقدير الزمني | ~28 ساعة |
| عدد المهام | 23 مهمة |
| Story Points | 38 |

---

## هدف السبرينت

> بنهاية هذا السبرينت، كل الـ 18 حدث P0 (الحرجة) تعمل وتُسجَّل في قاعدة البيانات مع كامل بيانات الإثراء (الموقع الجغرافي، نوع الجهاز، كشف البوتات). كل زيارة لصفحات الخدمات والبورتفوليو والتواصل + كل نقرة على WhatsApp/Phone/Email/Download محفوظة.

---

## نتائج (Deliverables) السبرينت

- [ ] كل الـ 18 حدث P0 مُطبَّقة في الموقع
- [ ] Geo enrichment يعمل (ip-api.com)
- [ ] Bot detection يعمل (isbot)
- [ ] User-agent parsing يعمل
- [ ] visitors table يُملأ بكامل البيانات
- [ ] sessions table يُملأ بكامل البيانات (geo + device + source)
- [ ] traffic_sources table يُملأ

---

## معيار الإتمام (Definition of Done)

- [ ] كل 18 حدث P0 مرئية في Network tab عند الاختبار اليدوي
- [ ] كل حدث يُحفظ في جدول events بالـ properties الصحيحة
- [ ] sessions table يحتوي على country + city + device_type
- [ ] Bot user-agent → is_bot = true في sessions
- [ ] IP hash موجود في sessions (لا raw IP)
- [ ] traffic_sources table يُملأ عند كل جلسة جديدة

---

## المهام التفصيلية

### EPIC 1: Event Enrichment (API Side)
**الهدف:** كل حدث يصل للـ API يُثرى بالجغرافيا والجهاز

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A02-001 | Geo enrichment service (ip-api.com: country, city, region, timezone) | 🔴 | 2h | ⬜ |
| A02-002 | User-agent parsing service (ua-parser-js: browser, OS, device type) | 🔴 | 1h | ⬜ |
| A02-003 | Bot detection service (isbot library — يكشف الـ crawlers والـ bots) | 🔴 | 1h | ⬜ |
| A02-004 | تطبيق الـ enrichment في الـ tracking worker قبل INSERT | 🔴 | 1h | ⬜ |
| A02-005 | IP hashing (SHA-256 + salt) قبل تخزين أي IP | 🔴 | 1h | ⬜ |

**تفاصيل A02-001 — Geo Enrichment:**
```
API: http://ip-api.com/json/{ip}?fields=country,countryCode,city,region,timezone
Response: { country: 'Egypt', countryCode: 'EG', city: 'Cairo', ... }
Cache: Redis لمدة 24 ساعة لكل IP hash (لتجنب تكرار الطلبات)
Async: يُنفَّذ في الـ worker بشكل async — لا يوقف معالجة الحدث
```

---

### EPIC 2: Service Events
**الهدف:** كل تفاعل على صفحات الخدمات مُتتبَّع

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A02-006 | service_page_view — route /services detection عند page_view | 🔴 | 1h | ⬜ |
| A02-007 | service_detail_view — route /services/:slug detection | 🔴 | 1h | ⬜ |
| A02-008 | إضافة data-event="service_cta" لكل CTAs في صفحات الخدمات | 🔴 | 2h | ⬜ |
| A02-009 | service_cta_click — click handler على كل service CTAs | 🔴 | 1h | ⬜ |

**تفاصيل A02-007 — service_detail_view Properties:**
```json
{
  "event_name": "service_detail_view",
  "properties": {
    "service_slug": "web-development",
    "service_name": "Web Development",
    "service_category": "development",
    "referrer_page": "/services"
  }
}
```

**تفاصيل A02-008 — CTA Data Attributes:**
```html
<!-- إضافة لكل CTA button في صفحات الخدمات -->
<button
  data-event="service_cta"
  data-cta-text="احصل على عرض سعر"
  data-cta-position="hero"
  data-service-slug="web-development"
>
  احصل على عرض سعر
</button>
```

---

### EPIC 3: Portfolio Events
**الهدف:** كل تفاعل على البورتفوليو مُتتبَّع

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A02-010 | portfolio_page_view — route /portfolio أو /case-studies | 🔴 | 1h | ⬜ |
| A02-011 | portfolio_case_study_view — route /case-studies/:slug | 🔴 | 1h | ⬜ |
| A02-012 | portfolio_cta_click — click handler بـ data-event="portfolio_cta" | 🔴 | 1h | ⬜ |

**تفاصيل A02-011 — portfolio_case_study_view Properties:**
```json
{
  "event_name": "portfolio_case_study_view",
  "properties": {
    "case_study_slug": "fintech-mobile-app",
    "case_study_title": "FinTech Mobile App",
    "industry": "fintech",
    "technology_stack": ["React Native", "Node.js"],
    "referrer_page": "/portfolio"
  }
}
```

---

### EPIC 4: Contact Events
**الهدف:** صفحة التواصل والـ Hero CTAs مُتتبَّعة

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A02-013 | contact_page_view — route /contact | 🔴 | 1h | ⬜ |
| A02-014 | hero_cta_click — Hero component CTA buttons | 🔴 | 1h | ⬜ |

---

### EPIC 5: Channel Contact Events
**الهدف:** كل قنوات التواصل مُتتبَّعة

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A02-015 | whatsapp_click — كل wa.me links + WhatsApp float button | 🔴 | 2h | ⬜ |
| A02-016 | phone_click — كل tel: links في الموقع | 🔴 | 1h | ⬜ |
| A02-017 | email_click — كل mailto: links | 🔴 | 1h | ⬜ |
| A02-018 | company_profile_download — download link handler | 🔴 | 1h | ⬜ |

**تفاصيل A02-015 — whatsapp_click Properties:**
```json
{
  "event_name": "whatsapp_click",
  "properties": {
    "cta_location": "float_button",
    "page_path": "/services/web-development"
  }
}
```

**قيم cta_location الممكنة:**
```
float_button   → الزر العائم على الجانب
header         → في الـ header
contact_page   → في صفحة التواصل
service_page   → في صفحة خدمة معينة
footer         → في الـ footer
```

---

### EPIC 6: System Events (Server-Side)
**الهدف:** أحداث النظام تُنشأ على الـ server

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A02-019 | lead_created system event — server-side بعد معالجة الـ lead | 🔴 | 1h | ⬜ |
| A02-020 | conversion_completed system event — server-side | 🔴 | 1h | ⬜ |

---

### EPIC 7: Data Model Population
**الهدف:** الجداول الثلاثة الأساسية تُملأ بكامل البيانات

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A02-021 | visitors table upsert logic — كامل الـ enrichment | 🔴 | 2h | ⬜ |
| A02-022 | sessions table population — geo + device + source + UTMs | 🔴 | 2h | ⬜ |
| A02-023 | traffic_sources table population من session data | 🔴 | 1h | ⬜ |

---

## خطة التنفيذ اليومية

| اليوم | المهام |
|---|---|
| Day 1 (Mon) | A02-001 → A02-005 (API Enrichment) |
| Day 2 (Tue) | A02-006 → A02-009 (Service Events) |
| Day 3 (Wed) | A02-010 → A02-014 (Portfolio + Contact Events) |
| Day 4 (Thu) | A02-015 → A02-018 (Channel Events) |
| Day 5 (Fri) | A02-019 → A02-020 (System Events) |
| Day 6 (Mon) | A02-021 → A02-023 (Data Model) |
| Day 7 (Tue) | Manual testing كل الـ 18 events + fixes |

---

## المخاطر والتبعيات

| المخاطرة | الاحتمال | الحل |
|---|---|---|
| ip-api.com rate limiting (45 req/min free tier) | متوسط | Cache نتائج الـ geo في Redis لمدة 24h |
| إضافة data-event attributes تتطلب تعديل كثير من components | متوسط | استخدام event delegation على الـ document level |
| bot detection يكشف بعض المستخدمين الحقيقيين خطأً | منخفض | إضافة override mechanism في الـ SDK |

---

## قائمة التحقق (Sprint Review Checklist)

```
[ ] service_detail_view → يظهر في events table لكل صفحة خدمة
[ ] portfolio_case_study_view → يظهر مع industry وtechnology_stack
[ ] contact_page_view → يُرسَل عند زيارة صفحة التواصل
[ ] whatsapp_click → يُسجَّل مع cta_location صحيح
[ ] phone_click → يُسجَّل
[ ] email_click → يُسجَّل
[ ] company_profile_download → يُسجَّل عند التحميل
[ ] hero_cta_click → يُسجَّل مع cta_text
[ ] sessions.country → مملوء (مثلًا: EG)
[ ] sessions.city → مملوء
[ ] sessions.device_type → desktop / mobile / tablet
[ ] sessions.is_bot → true للـ bot user-agents
[ ] sessions.ip_hash → موجود (لا raw IP)
[ ] traffic_sources table → يُملأ لكل جلسة جديدة
```
