# SPRINT 04 — Client Portal Complete
# إتمام الـ Client Portal بالكامل

---

## معلومات السبرينت

| المعلومة | التفاصيل |
|---|---|
| رقم السبرينت | 04 |
| المرحلة | Phase B — Client Portal |
| تاريخ البدء | 2026-07-13 |
| تاريخ الانتهاء | 2026-07-26 |
| المدة | أسبوعان (10 أيام عمل) |
| التقدير الزمني | ~56 ساعة |
| عدد المهام | 44 مهمة |
| التبعيات | Sprint 01-03 مكتملين ✅ |

---

## هدف السبرينت

> بنهاية هذا السبرينت، يكون الـ Client Portal مكتمل 100%. العميل يستطيع تنفيذ كل عملية أساسية: مراجعة وقبول الـ milestones، إرسال طلبات التعديل، تحميل الملفات، مشاهدة الفواتير، وإدارة إعداداته. كل صفحة جاهزة بـ states كاملة.

---

## نتائج (Deliverables) السبرينت

- [x] Milestones List + Detail + Approve/Reject
- [x] Revisions List + Create + Detail
- [x] Files & Deliverables page
- [x] Payments + Invoice Detail
- [x] Notifications page
- [x] Settings page (Profile + Password + Notifications)
- [x] كل Client Portal pages على mobile تعمل صح

---

## معيار الإتمام (Definition of Done)

- [ ] العميل يستطيع approve milestone في أقل من 3 clicks
- [ ] العميل يستطيع إنشاء revision request مع file upload
- [ ] العميل يستطيع تحميل أي ملف
- [ ] العميل يرى invoice بـ breakdown كامل
- [ ] كل صفحة على mobile (390px) تعمل صح
- [ ] كل states (loading/empty/error/success) موجودة

---

## المهام التفصيلية

### EPIC 1: Milestones Module

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S04-001 | MilestoneCard (full detail version) | 🔴 | 2h | ⬜ |
| S04-002 | MilestoneTimeline (visual timeline) | 🔴 | 3h | ⬜ |
| S04-003 | صفحة Milestones List (/milestones) | 🔴 | 2h | ⬜ |
| S04-004 | Milestones — status filter tabs | 🔴 | 1h | ⬜ |
| S04-005 | صفحة Milestone Detail (/milestones/[id]) | 🔴 | 3h | ⬜ |
| S04-006 | Milestone Detail — Deliverables section | 🔴 | 2h | ⬜ |
| S04-007 | Milestone Detail — Approve / Reject actions | 🔴 | 2h | ⬜ |
| S04-008 | Milestone Detail — Activity log | 🟠 | 1h | ⬜ |
| S04-009 | Milestones API integration | 🔴 | 1h | ⬜ |

---

**تفاصيل S04-001 — MilestoneCard (full):**

```
Card layout (list item on /milestones page):

  [Status Badge] ─────────────────── [Due: Feb 5]
  Phase 2: UI/UX Design
  ─────────────────────────────────────────────
  [ProgressBar 100%]
  ─────────────────────────────────────────────
  [Deliverables: 3 files] [Team: Ahmed, Sarah]
  [View Details →]

Status variants:
  Pending:    zinc badge + lock icon (client can't act yet)
  In Progress: indigo badge + progress bar visible
  Review:     amber badge + "Awaiting your review" + [Review Now] CTA (prominent)
  Approved:   emerald badge + "Approved ✓" + date
  Completed:  emerald badge + "Completed" + date

"Review" state CTA:
  [Review Now →] — indigo button, full-width at bottom of card
```

**تفاصيل S04-002 — MilestoneTimeline:**

```
Horizontal timeline showing all phases:

  [●]─────[●]─────[◐]─────[○]─────[○]
  Phase 1  Phase 2  Phase 3  Phase 4  Phase 5
  Done     Done     Active   Pending  Pending
  Jan 15   Feb 5    Feb 20   Mar 10   Mar 30

Legend:
  ● filled emerald = completed/approved
  ◐ half indigo    = in progress
  ○ empty zinc     = pending

Clicking a node scrolls to that milestone card

Mobile: vertical stepper (not horizontal)
```

**تفاصيل S04-005 — Milestone Detail Page:**

```
URL: /milestones/[id]

Layout:
  [Breadcrumb: Dashboard > Milestones > Phase 2]
  [Page Title: "Phase 2: UI/UX Design"]    [Status Badge]

  Section 1: Summary Card
    Started: Jan 20 | Due: Feb 5 | Status: Ready for Review
    [ProgressBar: 100%]

  Section 2: Description
    "We have completed the full UI/UX design for your platform..."

  Section 3: Deliverables
    ┌─────────────────────────────────────────┐
    │ 📎 Figma Design File       [Preview] [Download] │
    │ 📎 Component Library       [Preview] [Download] │
    │ 🎥 Walkthrough Video       [Watch]              │
    └─────────────────────────────────────────┘

  Section 4: Review Actions (ONLY if status = "Review")
    ┌──────────────────────┐  ┌──────────────────────┐
    │  ✓ Approve Phase     │  │  ✗ Request Changes   │
    │  (primary, emerald)  │  │  (secondary)         │
    └──────────────────────┘  └──────────────────────┘

    [Approve] → ApproveDialog → confirm → API → success toast
    [Request Changes] → RevisionRequestModal → submit

  Section 5: Activity Log
    Feb 5: PM marked as Ready for Review
    Feb 2: 3 files uploaded
    Jan 20: Phase started
```

---

### EPIC 2: Revisions Module

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S04-010 | RevisionCard (list item) | 🔴 | 1h | ⬜ |
| S04-011 | RevisionStatusStepper | 🟠 | 1h | ⬜ |
| S04-012 | صفحة Revisions List (/revisions) | 🔴 | 2h | ⬜ |
| S04-013 | Revisions — status filter tabs | 🔴 | 1h | ⬜ |
| S04-014 | صفحة Create Revision (/revisions/new) | 🔴 | 3h | ⬜ |
| S04-015 | Create Revision — full form | 🔴 | 2h | ⬜ |
| S04-016 | صفحة Revision Detail (/revisions/[id]) | 🔴 | 2h | ⬜ |
| S04-017 | Revision Detail — team response section | 🟠 | 1h | ⬜ |
| S04-018 | Revisions API integration | 🔴 | 2h | ⬜ |

---

**تفاصيل S04-010 — RevisionCard:**

```
  ┌────────────────────────────────────────────────────┐
  │  [Bug]  #012  In Progress                    Feb 5 │
  │  Login button not responding on iOS Safari         │
  │  Linked to: Phase 2 UI/UX Design                  │
  │  Assigned to: Ahmed (Developer)                    │
  └────────────────────────────────────────────────────┘

Category color coding:
  Bug:          rose badge
  Revision:     amber badge
  Feature:      indigo badge
  Question:     zinc badge
```

**تفاصيل S04-014/015 — Create Revision Form:**

```
URL: /revisions/new

Form fields:
  1. Category (radio/segmented):
     [Bug] [Revision] [New Feature] [Question]

  2. Title (required, max 120 chars)
     placeholder: "Brief description of the issue..."

  3. Description (required, textarea, min 20 chars)
     placeholder: "Describe the issue in detail. Include steps to reproduce if it's a bug..."

  4. Priority (select):
     [High] [Medium] [Low]

  5. Linked Milestone (optional select):
     Shows list of current project milestones

  6. Attachments (FileUploadZone):
     "Add screenshots, videos, or files"
     Max 5 files, 10MB each
     Accepted: images, videos, PDFs, docs

  7. [Cancel] [Submit Request]

Validation:
  - Category required
  - Title 5-120 chars
  - Description 20+ chars
  - File type + size check

After submit:
  - Success toast: "Request submitted. The team will respond soon."
  - Navigate to /revisions/[new-id]
```

---

### EPIC 3: Files Module

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S04-019 | صفحة Files (/files) | 🔴 | 3h | ⬜ |
| S04-020 | Files — category tabs | 🔴 | 1h | ⬜ |
| S04-021 | File download (signed URL) | 🔴 | 1h | ⬜ |
| S04-022 | File preview (image/PDF inline) | 🟠 | 2h | ⬜ |
| S04-023 | Files API integration | 🔴 | 1h | ⬜ |

---

**تفاصيل S04-019 — Files Page:**

```
URL: /files

Header: "Files & Deliverables"  [View: Grid | List toggle]

Category Tabs:
  [All Files] [Design] [Development] [Documentation] [Credentials] [Final Delivery]

File Grid (default view):
  ┌──────────┐  ┌──────────┐  ┌──────────┐
  │  📷      │  │  📄      │  │  🎨      │
  │          │  │          │  │          │
  │ design   │  │ docs.pdf │  │ figma    │
  │ v2.zip   │  │          │  │ ui.fig   │
  │ 24.5 MB  │  │ 2.1 MB   │  │ 85 MB    │
  │ Jan 20   │  │ Jan 18   │  │ Jan 15   │
  └──────────┘  └──────────┘  └──────────┘

File list (toggle view):
  [icon] filename.ext    [size]    [uploaded by]  [date]  [⬇ Download]

File types + icons:
  .fig / .xd / .sketch → design icon
  .pdf → PDF icon
  .zip / .rar → archive icon
  .jpg / .png / .gif → image icon
  .mp4 / .mov → video icon
  .doc / .docx / .txt → document icon
  Other → generic file icon

Preview:
  Images: opens in FilePreviewModal (full-size)
  PDF: opens in FilePreviewModal (embed PDF viewer)
  Video: opens in FilePreviewModal (video player)
  Other: download only

Credentials category:
  ⚠ Sensitive data warning banner at top
  Files are blurred until user clicks "Show"
```

---

### EPIC 4: Payments Module

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S04-024 | InvoiceSummaryStrip | 🔴 | 1h | ⬜ |
| S04-025 | InvoiceCard (list item) | 🔴 | 1h | ⬜ |
| S04-026 | صفحة Payments (/payments) | 🔴 | 2h | ⬜ |
| S04-027 | Payments — filter + list | 🔴 | 1h | ⬜ |
| S04-028 | صفحة Invoice Detail (/payments/[id]) | 🔴 | 2h | ⬜ |
| S04-029 | Invoice Detail — line items table | 🔴 | 1h | ⬜ |
| S04-030 | PaymentProofUploader | 🔴 | 2h | ⬜ |
| S04-031 | Invoice PDF download | 🟠 | 1h | ⬜ |
| S04-032 | Invoices API integration | 🔴 | 1h | ⬜ |

---

**تفاصيل S04-026 — Payments Page:**

```
URL: /payments

Section 1: InvoiceSummaryStrip
  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
  │ Total Value  │  │   Paid       │  │  Remaining   │
  │  $12,000     │  │   $8,000     │  │   $4,000     │
  └──────────────┘  └──────────────┘  └──────────────┘

Section 2: Next Due Alert (if any pending)
  ⚠ Invoice #008 — $2,000 due in 3 days
  [View Invoice →]

Section 3: Invoice List
  Filter: [All] [Pending] [Paid] [Overdue]

  ┌────────────────────────────────────────────────┐
  │ Invoice #005      [Paid ✓]         Jan 15      │
  │ Phase 1 Payment                    $3,000       │
  └────────────────────────────────────────────────┘
  ┌────────────────────────────────────────────────┐
  │ Invoice #007      [Pending]        Due Mar 1   │
  │ Phase 3 Payment                    $2,400       │
  │                              [View Invoice →]  │
  └────────────────────────────────────────────────┘
```

**تفاصيل S04-028 — Invoice Detail:**

```
URL: /payments/[id]

Header:
  Invoice #007                        [Download PDF ⬇]
  Issued: Feb 10, 2026  |  Due: Mar 1, 2026
  Status: [Pending Payment]

Bill To:
  Mohamed Hassan
  TechStartup Co.
  mohamed@techstartup.com

Line Items Table:
  Description                    Qty    Rate      Total
  ─────────────────────────────────────────────────────
  Frontend Development Phase 3    1    $2,000    $2,000
  UI Testing & QA                 1      $400      $400
  ─────────────────────────────────────────────────────
  Subtotal                                        $2,400
  VAT (0%)                                            $0
  TOTAL                                           $2,400

Payment Instructions:
  [Bank transfer / payment method details]

Upload Payment Proof: (if status = Pending)
  [PaymentProofUploader component]
  "Upload your bank receipt or payment confirmation"
  Accepted: PDF, JPG, PNG (max 5MB)
  [Upload Proof button]

After upload:
  Success message: "Proof uploaded. We'll confirm within 24 hours."
  Status changes to: "Proof Submitted" badge
```

---

### EPIC 5: Notifications + Settings

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S04-033 | صفحة Notifications (/notifications) | 🔴 | 2h | ⬜ |
| S04-034 | Notifications — sections (unread/read) | 🔴 | 1h | ⬜ |
| S04-035 | Mark all as read | 🟠 | 30m | ⬜ |
| S04-036 | Realtime subscription (Supabase) | 🔴 | 2h | ⬜ |
| S04-037 | صفحة Settings (/settings) | 🔴 | 2h | ⬜ |
| S04-038 | Settings — Profile tab | 🔴 | 1h | ⬜ |
| S04-039 | Settings — Password & Security tab | 🔴 | 1h | ⬜ |
| S04-040 | Settings — Notification Preferences tab | 🔴 | 1h | ⬜ |
| S04-041 | Avatar upload (Supabase Storage) | 🟠 | 1h | ⬜ |

---

**تفاصيل S04-040 — Notification Preferences:**

```
Email Notifications:
  [Switch] Milestone ready for review
  [Switch] New invoice sent
  [Switch] Team message received
  [Switch] File uploaded to project
  [Switch] Revision status updated
  [Switch] Project status changed

In-App Notifications:
  [Switch] Milestone ready for review
  [Switch] New invoice
  [Switch] File uploads
  [Switch] Revision updates

[Save Preferences button]
```

---

### EPIC 6: i18n — Client Portal Pages Copy

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S04-042 | `messages/en/milestones.json` + `messages/en/revisions.json` + `messages/en/files.json` | 🔴 | 1.5h | ⬜ |
| S04-043 | `messages/en/payments.json` + `messages/en/notifications.json` + `messages/en/settings.json` | 🔴 | 1.5h | ⬜ |
| S04-044 | `messages/ar/` — Arabic translation لكل ملفات EPIC 6 | 🔴 | 2h | ⬜ |
| S04-045 | تطبيق `useTranslations()` على كل صفحات Client Portal | 🔴 | 2h | ⬜ |

---

**مثال على هيكل milestones.json:**

```json
{
  "list": {
    "title": "Milestones",
    "filterAll": "All",
    "filterPending": "Pending",
    "filterInProgress": "In Progress",
    "filterReview": "Awaiting Review",
    "filterCompleted": "Completed",
    "empty": "No milestones yet"
  },
  "detail": {
    "summary": "Summary",
    "description": "Description",
    "deliverables": "Deliverables",
    "reviewActions": "Review Actions",
    "approvePhase": "Approve Phase",
    "requestChanges": "Request Changes",
    "activityLog": "Activity Log"
  },
  "approveDialog": {
    "title": "Approve this milestone?",
    "body": "You're confirming that Phase {name} meets all requirements.",
    "confirm": "Yes, Approve",
    "cancel": "Cancel"
  }
}
```

---

## خطة التنفيذ اليومية

| اليوم | المهام |
|---|---|
| Day 1 | S04-001/002 MilestoneCard + Timeline |
| Day 2 | S04-003/004 Milestones List page |
| Day 3 | S04-005/006 Milestone Detail + Deliverables |
| Day 4 | S04-007/009 Review actions + API |
| Day 5 | S04-010-018 Revisions module complete |
| Day 6 | S04-019-023 Files module complete |
| Day 7 | S04-024-032 Payments module complete |
| Day 8 | S04-033-036 Notifications page + realtime + S04-042/043 messages en |
| Day 9 | S04-037-041 Settings page complete + S04-044 messages ar |
| Day 10 | Mobile audit + S04-045 apply translations + i18n QA + buffer |

---

## قائمة التحقق (Sprint Review Checklist)

```
Milestones:
[ ] MilestoneTimeline — visual + horizontal (desktop)
[ ] MilestoneTimeline — vertical stepper (mobile)
[ ] Milestone "Review" state — CTA prominently visible
[ ] Approve → ApproveDialog → success → status changes to Approved
[ ] Request revision → RevisionRequestModal → linked to milestone
[ ] Milestone Detail — files preview/download work

Revisions:
[ ] Create form — all fields + validation
[ ] File upload in form → works
[ ] Revision created → appears in list
[ ] Revision detail — team response visible

Files:
[ ] Category tabs filter correctly
[ ] File download via signed URL
[ ] Image preview opens in modal
[ ] Credentials category has blur + show toggle

Payments:
[ ] InvoiceSummaryStrip — correct totals
[ ] Invoice list — status filter works
[ ] Invoice Detail — line items + total correct
[ ] Upload payment proof → success feedback

Settings:
[ ] Avatar upload works
[ ] Password change form validates
[ ] Notification preferences saved

General:
[ ] All pages — mobile (390px) looks correct
[ ] All pages — dark mode looks correct
[ ] All pages — loading states visible
[ ] All pages — empty states visible

i18n:
[ ] milestones.json + revisions.json + files.json — en + ar مكتملين
[ ] payments.json + notifications.json + settings.json — en + ar مكتملين
[ ] كل صفحات Client Portal تعرض النصوص صح بالعربي والإنجليزي
[ ] ApproveDialog + ConfirmDeleteDialog مترجمة
[ ] Form validation messages بالعربي والإنجليزي
[ ] RTL layout صح على كل الصفحات مع العربية
```
