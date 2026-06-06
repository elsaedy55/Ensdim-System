# SPRINT 08 — Google Analytics 4 + Microsoft Clarity Integration
# تكامل Google Analytics 4 و Microsoft Clarity

---

## معلومات السبرينت

| المعلومة | التفاصيل |
|---|---|
| رقم السبرينت | 08 |
| المرحلة | Phase D — Integrations |
| تاريخ البدء | 2026-09-25 |
| تاريخ الانتهاء | 2026-10-08 |
| المدة | أسبوعان |
| التقدير الزمني | ~32 ساعة |
| عدد المهام | 31 مهمة |
| Story Points | 35 |

---

## هدف السبرينت

> بنهاية هذا السبرينت، كل P0 events تُرسَل بالتوازي لـ GA4 وللـ Internal API. Microsoft Clarity مثبت ومُهيأ مع حماية كاملة للـ PII. Clarity session IDs مرتبطة بـ leads records. الفارق بين الـ internal counts وGA4 أقل من 5%.

---

## نتائج (Deliverables) السبرينت

- [ ] gtag.js مُثبَّت ومُهيأ في الموقع
- [ ] 11 P0 events مُرسَلة لـ GA4 بالتوازي
- [ ] GA4 Consent Mode v2 مُطبَّق
- [ ] 7 custom dimensions مُنشأة في GA4 Admin
- [ ] 5 conversion events مُحددة في GA4
- [ ] 5 audiences مُنشأة في GA4
- [ ] Clarity script مُثبَّت مع PII masking
- [ ] clarity_session_id مُخزَّن في leads table
- [ ] Clarity recording link يعمل في Lead Dashboard
- [ ] < 5% variance بين internal وGA4 session counts

---

## معيار الإتمام (Definition of Done)

- [ ] GA4 DebugView يعرض كل P0 events بشكل صحيح
- [ ] Variance check: internal sessions vs GA4 sessions (48h data) < 5%
- [ ] GA4 conversions تُسجَّل في GA4 dashboard
- [ ] Clarity recordings تظهر في Clarity dashboard
- [ ] No PII في Clarity recordings (form fields masked)
- [ ] لا gtag أو Clarity تُشغَّل قبل analytics consent

---

## المهام التفصيلية

### EPIC 1: GA4 SDK Integration
**الهدف:** كل P0 events تُرسَل لـ GA4 بالتوازي مع الـ internal SDK

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A08-001 | تثبيت وتهيئة gtag.js (Measurement ID في .env) | 🔴 | 1h | ⬜ |
| A08-002 | GA4 page_view على كل route change | 🔴 | 1h | ⬜ |
| A08-003 | service_detail_view → gtag('event', 'view_item', {...}) | 🔴 | 1h | ⬜ |
| A08-004 | portfolio_case_study_view → gtag('event', 'select_content', {...}) | 🔴 | 1h | ⬜ |
| A08-005 | quote_request_start → gtag('event', 'begin_checkout', {...}) | 🔴 | 1h | ⬜ |
| A08-006 | quote_request_submit → gtag('event', 'purchase', {...}) | 🔴 | 1h | ⬜ |
| A08-007 | consultation_book_submit → gtag('event', 'generate_lead', {...}) | 🔴 | 1h | ⬜ |
| A08-008 | whatsapp_click → gtag('event', 'contact', { method: 'whatsapp' }) | 🔴 | 1h | ⬜ |
| A08-009 | phone_click → gtag('event', 'contact', { method: 'phone' }) | 🔴 | 1h | ⬜ |
| A08-010 | email_click → gtag('event', 'contact', { method: 'email' }) | 🔴 | 1h | ⬜ |
| A08-011 | company_profile_download → gtag('event', 'file_download', {...}) | 🔴 | 1h | ⬜ |
| A08-012 | إضافة custom dimension parameters لكل GA4 calls | 🟠 | 2h | ⬜ |

**تفاصيل A08-006 — Quote Submit GA4 Event:**
```javascript
gtag('event', 'purchase', {
  transaction_id: lead_id,   // internal lead ID كـ transaction ID
  value: 1,                  // symbolic value
  currency: 'EGP',
  items: [{
    item_id: service_interest,
    item_name: service_interest,
  }]
});
```

**تفاصيل A08-012 — Custom Dimensions:**
```javascript
// يُضاف لكل GA4 event call
gtag('set', 'user_properties', {
  visitor_id: anonymousId,           // Custom Dimension 1
  visitor_type: isNewVisitor ? 'new' : 'returning',  // CD 2
});

// Per-event dimensions
gtag('event', 'service_detail_view', {
  session_id: sessionId,             // Custom Dimension 3
  page_type: 'service',              // Custom Dimension 4
  service_category: 'development',   // Custom Dimension 5
});
```

---

### EPIC 2: GA4 Admin Configuration
**الهدف:** إعداد GA4 property بشكل صحيح

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A08-013 | GA4 Admin: إنشاء 7 custom dimensions (visitor_id, session_id, visitor_type, lead_tier, service_category, page_type, device_category) | 🔴 | 1h | ⬜ |
| A08-014 | GA4 Admin: تحديد 5 conversions (purchase, generate_lead, contact×3, file_download) | 🔴 | 1h | ⬜ |
| A08-015 | GA4 Admin: إنشاء 5 audiences (Service Intent / Portfolio Viewer / High Intent No Convert / Form Abandoners / Converted) | 🟠 | 1h | ⬜ |
| A08-016 | GA4 Admin: Data retention → 14 months | 🟠 | 15m | ⬜ |
| A08-017 | GA4 Admin: تفعيل Google Signals + Enhanced Measurement | 🟠 | 15m | ⬜ |

**GA4 Conversion Events:**
```
purchase          → quote_request_submit  (Primary)
generate_lead     → consultation_book     (Primary)
contact_whatsapp  → whatsapp_click        (Secondary)
contact_phone     → phone_click           (Secondary)
file_download     → profile_download      (Tertiary)
```

---

### EPIC 3: GA4 Consent Mode
**الهدف:** GA4 لا يعمل قبل الـ consent

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A08-018 | تطبيق GA4 Consent Mode v2 (gtag consent update) | 🔴 | 2h | ⬜ |
| A08-019 | حجب GA4 initialization حتى analytics consent = granted | 🔴 | 1h | ⬜ |

**تفاصيل A08-018 — Consent Mode:**
```javascript
// Default state (قبل الـ consent)
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  functionality_storage: 'denied',
});

// بعد منح الـ consent
gtag('consent', 'update', {
  analytics_storage: 'granted',
});
```

---

### EPIC 4: GA4 Validation
**الهدف:** التحقق من صحة الـ data parity

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A08-020 | GA4 DebugView validation — كل P0 events موجودة بـ properties صحيحة | 🔴 | 2h | ⬜ |
| A08-021 | Parity check — internal sessions vs GA4 sessions (48h data) | 🔴 | 1h | ⬜ |
| A08-022 | Parity check — internal conversions vs GA4 goal completions | 🔴 | 1h | ⬜ |

**Parity Acceptance Criteria:**
```
Sessions: < 5% variance (طبيعي بسبب bot filtering وadblockers)
Conversions: < 5% variance
Page views: < 10% variance
```

---

### EPIC 5: Microsoft Clarity Installation
**الهدف:** Clarity مثبت مع حماية كاملة للـ PII

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A08-023 | تثبيت Clarity script في website <head> | 🔴 | 1h | ⬜ |
| A08-024 | تطبيق data-clarity-mask على كل form fields وحقول الإدخال | 🔴 | 1h | ⬜ |
| A08-025 | تهيئة IP masking في Clarity admin | 🔴 | 15m | ⬜ |
| A08-026 | حجب Clarity initialization حتى analytics consent | 🔴 | 1h | ⬜ |

**تفاصيل A08-024 — PII Masking:**
```html
<!-- كل input وtextarea في الموقع يجب أن يحمل هذه الـ attribute -->
<input
  type="email"
  name="email"
  data-clarity-mask="true"
  placeholder="بريدك الإلكتروني"
/>

<!-- يمكن أيضًا masking عبر Clarity settings
     لكن data-clarity-mask أضمن -->
```

---

### EPIC 6: Clarity Custom Events & Session Linking
**الهدف:** Clarity sessions مرتبطة بـ leads

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| A08-027 | clarity('set', 'sessionId', internalSessionId) | 🟠 | 30m | ⬜ |
| A08-028 | clarity('set', 'visitorId', anonymousId) | 🟠 | 30m | ⬜ |
| A08-029 | clarity('event', 'QuoteFormStart') + clarity('event', 'WhatsAppClick') | 🟠 | 1h | ⬜ |
| A08-030 | التقاط clarity_session_id من window.clarity('identify') وتخزينه | 🟠 | 1h | ⬜ |
| A08-031 | Clarity recording link في Lead Detail Drawer | 🟠 | 30m | ⬜ |

**تفاصيل A08-030 — Clarity Session ID Capture:**
```javascript
// يُشغَّل بعد تحميل Clarity بثانيتين
setTimeout(() => {
  if (window.clarity) {
    // الـ session ID متاح عبر cookie _clsk
    const clsk = getCookie('_clsk');
    if (clsk) {
      sdkContext.claritySessionId = clsk.split('|')[0];
    }
  }
}, 2000);
```

**تفاصيل A08-031 — Clarity Recording Link:**
```
رابط التسجيل:
https://clarity.microsoft.com/projects/{PROJECT_ID}/recordings/details/{CLARITY_SESSION_ID}

يُفتَح في tab جديد من الـ Lead Detail Drawer
```

---

## خطة التنفيذ اليومية

| اليوم | المهام |
|---|---|
| Day 1 (Mon) | A08-001 → A08-006 (GA4: basic setup + core conversions) |
| Day 2 (Tue) | A08-007 → A08-012 (GA4: remaining events + custom dimensions) |
| Day 3 (Wed) | A08-013 → A08-017 (GA4 Admin configuration) |
| Day 4 (Thu) | A08-018 → A08-022 (Consent Mode + Validation) |
| Day 5 (Fri) | A08-023 → A08-026 (Clarity installation + masking + consent) |
| Day 6 (Mon) | A08-027 → A08-031 (Clarity custom events + session linking) |
| Day 7 (Tue) | Validation: GA4 DebugView + Parity check + Clarity recordings |

---

## المخاطر والتبعيات

| المخاطرة | الاحتمال | الحل |
|---|---|---|
| Ad blockers تمنع GA4 → variance > 5% | متوسط | طبيعي — نُوثِّق هذا في notes |
| Clarity PII masking غير كامل | متوسط | مراجعة يدوية لكل recordings + الاعتماد على data-clarity-mask |
| GA4 custom dimensions لها حد (50 dimensions) | منخفض | الالتزام بـ 7 dimensions فقط |

---

## قائمة التحقق (Sprint Review Checklist)

```
[ ] GA4 DebugView: كل P0 events موجودة
[ ] GA4 DebugView: custom dimensions موجودة في events
[ ] GA4 conversions: تُسجَّل عند quote submit وconsultation book
[ ] Parity: internal sessions vs GA4 sessions (48h) < 5%
[ ] Clarity: recordings تظهر في Clarity dashboard
[ ] Clarity: form fields masked في recordings (لا PII مرئي)
[ ] Clarity link في Lead Drawer: يفتح التسجيل الصحيح
[ ] لا GA4/Clarity تُشغَّل قبل consent (اختبار بـ incognito)
[ ] TypeScript 0 errors
```
