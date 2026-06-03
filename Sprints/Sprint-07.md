# SPRINT 07 — Onboarding + Polish + QA
# الـ Onboarding + التلميع النهائي + ضمان الجودة

---

## معلومات السبرينت

| المعلومة | التفاصيل |
|---|---|
| رقم السبرينت | 07 |
| المرحلة | Phase D — Completion |
| تاريخ البدء | 2026-08-24 |
| تاريخ الانتهاء | 2026-09-07 |
| المدة | أسبوعان (10 أيام عمل) |
| التقدير الزمني | ~61 ساعة |
| عدد المهام | 44 مهمة |
| التبعيات | Sprint 01-06 مكتملين ✅ |

---

## هدف السبرينت

> هذا السبرينت لا يضيف features جديدة. هدفه الوحيد هو إيصال المنتج لمستوى **Production-Ready**. Onboarding flow يعمل، Dark mode مثالي، كل الـ breakpoints صح، Accessibility مقبول، وكل الـ states (loading/empty/error) موجودة في كل صفحة. Core Web Vitals خضراء.

---

## نتائج (Deliverables) السبرينت

- [x] Onboarding Wizard يعمل (2-3 steps)
- [x] Dark mode مثالي على كل الصفحات
- [x] Responsive على كل breakpoints (390px → 1440px+)
- [x] Accessibility audit passed (keyboard + ARIA)
- [x] Performance: Lighthouse > 90 على الصفحات الرئيسية
- [x] كل loading/empty/error states موجودة
- [x] Zero TypeScript errors
- [x] Zero console errors على كل الصفحات الرئيسية
- [x] End-to-end flows تعمل (Client + Admin)
- [x] Arabic/English coverage على كل الصفحات الرئيسية
- [x] RTL/LTR switching وlocale persistence يعملان

---

## معيار الإتمام (Definition of Done للمشروع كله)

هذا هو المعيار النهائي لإتمام المشروع بالكامل:

```
Client Portal:
[ ] Login → Dashboard ✓
[ ] Dashboard → Milestone Review → Approve ✓
[ ] Dashboard → Milestone Review → Request Revision ✓
[ ] Revision submitted → appears in list ✓
[ ] Files → Download file ✓
[ ] Payments → View invoice → Upload proof ✓
[ ] Notifications → real-time updates ✓
[ ] Settings → Update profile ✓

Admin Dashboard:
[ ] Login → Admin Overview ✓
[ ] Create Project → with team → milestone auto-created ✓
[ ] Upload deliverable to milestone ✓
[ ] Mark milestone "Ready for Review" → client notified ✓
[ ] Respond to revision → update status ✓
[ ] Create Invoice → Send to client ✓
[ ] Mark invoice as Paid → client notified ✓
[ ] Add team member → assign role ✓
[ ] Create custom role → permission matrix ✓

Quality:
[ ] Mobile 390px → all pages usable
[ ] Tablet 768px → all pages usable
[ ] Desktop 1280px → all pages correct
[ ] Dark mode → all pages correct
[ ] Keyboard navigation → all interactive elements reachable
[ ] Lighthouse performance > 90 on all key pages
[ ] Build succeeds: npm run build → 0 errors
[ ] TypeScript: 0 errors
[ ] Console: 0 errors on key pages
```

---

## المهام التفصيلية

### EPIC 1: Onboarding Flow

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S07-001 | Onboarding layout (step progress indicator) | 🔴 | 1h | ⬜ |
| S07-002 | Onboarding Step 1 — Company Name | 🔴 | 1h | ⬜ |
| S07-003 | Onboarding Step 2 — Role Selection | 🔴 | 1h | ⬜ |
| S07-004 | Onboarding Step 3 — Workspace Created (success) | 🔴 | 1h | ⬜ |
| S07-005 | Onboarding API integration | 🔴 | 1h | ⬜ |
| S07-006 | Onboarding skip prevention | 🔴 | 30m | ⬜ |

---

**تفاصيل S07-001-004 — Onboarding Flow:**

```
URL: /onboarding

Layout:
  Clean centered card (no sidebar)
  Step indicator at top: [1] — [2] — [3]
  Progress: 0% → 33% → 66% → 100%

Step 1: Company Information
  ┌────────────────────────────────────────┐
  │  👋 Welcome to Ensdim                  │
  │  Let's set up your workspace           │
  │                                        │
  │  Company Name*                         │
  │  [___________________________]         │
  │                                        │
  │  Industry                              │
  │  [Software Agency         ▼]          │
  │                                        │
  │              [Get Started →]           │
  └────────────────────────────────────────┘

Step 2: Your Role
  ┌────────────────────────────────────────┐
  │  What's your role?                     │
  │                                        │
  │  ┌──────────────┐  ┌──────────────┐   │
  │  │   👤 Client  │  │  🏢 Agency   │   │
  │  │  I'm a client│  │  I manage an │   │
  │  │  tracking my │  │  agency and  │   │
  │  │  project     │  │  my team     │   │
  │  └──────────────┘  └──────────────┘   │
  │                                        │
  │  [← Back]         [Continue →]        │
  └────────────────────────────────────────┘

Step 3: Success
  ┌────────────────────────────────────────┐
  │      ✅ (animated checkmark)           │
  │  Your workspace is ready!              │
  │                                        │
  │  Here's what you can do now:          │
  │  • Track your projects                 │
  │  • Review milestones                   │
  │  • Manage your team                    │
  │                                        │
  │         [Go to Dashboard →]           │
  └────────────────────────────────────────┘

Skip Prevention:
  Middleware checks: if user has no workspace → redirect to /onboarding
  Cannot access /dashboard or /admin without completing onboarding
```

---

### EPIC 2: Dark Mode Complete Audit

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S07-007 | Dark mode theme provider + toggle setup | 🔴 | 1h | ⬜ |
| S07-008 | Dark mode toggle (Settings + Header menu) | 🔴 | 1h | ⬜ |
| S07-009 | Dark mode audit — Auth pages | 🔴 | 1h | ⬜ |
| S07-010 | Dark mode audit — Client Portal pages | 🔴 | 3h | ⬜ |
| S07-011 | Dark mode audit — Admin Dashboard pages | 🔴 | 3h | ⬜ |
| S07-012 | Dark mode fixes (contrast, borders, etc.) | 🔴 | 3h | ⬜ |

---

**Dark Mode Requirements:**

```
Backgrounds:
  bg-base:     zinc-950 (#09090b)
  bg-surface:  zinc-900 (#18181b)
  bg-muted:    zinc-800 (#27272a)
  bg-hover:    zinc-800/60

Borders:
  border:      zinc-700/50 (#3f3f46 at 50% opacity)
  border-subtle: zinc-800

Text:
  primary:     zinc-50 (#fafafa)
  secondary:   zinc-400 (#a1a1aa)
  muted:       zinc-600 (#52525b)

Cards:
  background:  zinc-900
  border:      zinc-700/30

Charts/Progress:
  Track color: zinc-700
  Fill:        indigo-500 (same as light)

Common dark mode issues to check:
  [ ] White backgrounds not flipping to zinc-900
  [ ] Hardcoded text colors not using CSS vars
  [ ] Image backgrounds not adjusting
  [ ] Status badges with white text on light bg
  [ ] Input focus ring color correct
  [ ] Modal overlay (backdrop) correct
  [ ] Skeleton animation color correct
  [ ] Sidebar borders visible but subtle
```

---

### EPIC 3: Responsive QA

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S07-013 | Mobile audit — Auth pages (390px) | 🔴 | 1h | ⬜ |
| S07-014 | Mobile audit — Client Portal (390px) | 🔴 | 3h | ⬜ |
| S07-015 | Mobile audit — Admin Dashboard (390px) | 🔴 | 3h | ⬜ |
| S07-016 | Tablet audit — all pages (768px) | 🔴 | 2h | ⬜ |
| S07-017 | Fix: tables → card view on mobile | 🔴 | 2h | ⬜ |
| S07-018 | Fix: kanban → single column view on mobile | 🔴 | 2h | ⬜ |
| S07-019 | Fix: permission matrix → accordion on mobile | 🔴 | 2h | ⬜ |

---

**Mobile Responsive Checklist:**

```
Auth pages (390px):
  [ ] Login card — full width with padding
  [ ] Register — single column
  [ ] OTP input — large touch targets (min 44px)

Client Portal (390px):
  [ ] Bottom navigation bar — 5 items visible + tappable
  [ ] Dashboard — horizontal scroll for pending actions
  [ ] Milestones — vertical stepper (not horizontal)
  [ ] Milestone Detail — approve/reject as sticky bottom bar
  [ ] Files — 2-column grid (not 4)
  [ ] Create Revision form — single column
  [ ] Invoice detail — table scrollable
  [ ] Settings — full width tabs

Admin Dashboard (390px):
  [ ] Sidebar → hamburger + drawer
  [ ] Admin Overview — KPIs in 2×3 grid
  [ ] Projects list → card list (not table)
  [ ] Create Project → full-screen wizard
  [ ] Project Detail tabs → horizontal scroll
  [ ] Milestones list → cards
  [ ] Kanban → single column with tab switcher
  [ ] Permission Matrix → accordion per module
  [ ] Team → 1-column grid
  [ ] Invoice form → single column

Touch targets:
  [ ] All buttons min 44px height
  [ ] All links min 44px hit area
  [ ] Navigation items min 48px height
```

---

### EPIC 4: Accessibility

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S07-020 | Keyboard navigation audit | 🔴 | 3h | ⬜ |
| S07-021 | Focus rings — all interactive elements | 🔴 | 1h | ⬜ |
| S07-022 | ARIA labels audit | 🔴 | 2h | ⬜ |
| S07-023 | Screen reader basic test | 🟠 | 2h | ⬜ |
| S07-024 | Color contrast audit (WCAG AA) | 🔴 | 1h | ⬜ |

---

**Accessibility Requirements:**

```
Keyboard Navigation:
  [ ] Tab order is logical on all pages
  [ ] Modal: Tab trapped inside while open
  [ ] Modal: Escape closes modal
  [ ] Dropdown: Arrow keys navigate items
  [ ] Dropdown: Escape closes
  [ ] Sidebar: all links reachable via Tab
  [ ] Tables: row actions reachable
  [ ] Forms: all fields reachable in order
  [ ] Kanban: cards focusable (keyboard drag optional)

ARIA Requirements:
  [ ] All icon-only buttons have aria-label
  [ ] Modal has role="dialog" + aria-labelledby
  [ ] Form errors have aria-describedby
  [ ] Tables have proper th scope
  [ ] Loading states have aria-busy="true"
  [ ] Status changes announced via aria-live
  [ ] Notification bell: aria-label="Notifications, {N} unread"

Focus Rings:
  focus-visible:ring-2 focus-visible:ring-indigo-500
  Applied to: buttons, links, inputs, selects, checkboxes

Color Contrast (WCAG AA minimum = 4.5:1):
  [ ] Primary text on white bg
  [ ] Secondary text on white bg
  [ ] Badge text on colored bg
  [ ] Link text
  [ ] Button text on indigo-500 bg
  [ ] Disabled text (note: AA doesn't require for disabled)
```

---

### EPIC 5: Performance

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S07-025 | React Query: cache + stale time tuning | 🔴 | 2h | ⬜ |
| S07-026 | next/image for all images | 🔴 | 1h | ⬜ |
| S07-027 | Route-level code splitting review | 🟠 | 1h | ⬜ |
| S07-028 | Bundle analysis (next-bundle-analyzer) | 🟠 | 1h | ⬜ |
| S07-029 | Lighthouse audit — all key pages | 🔴 | 2h | ⬜ |
| S07-030 | Core Web Vitals fixes | 🔴 | 3h | ⬜ |

---

**React Query Cache Strategy:**

```typescript
// Stale times by data type:
const CACHE = {
  dashboard:     30_000,    // 30s — refreshes often
  project:       60_000,    // 1min — moderate updates
  milestones:    60_000,    // 1min
  notifications: 10_000,    // 10s — needs to be fresh
  invoices:      120_000,   // 2min — slower updates
  team:          300_000,   // 5min — rarely changes
  roles:         600_000,   // 10min — almost never changes
  files:         120_000,   // 2min
}

// Realtime override:
// Supabase subscription → invalidate specific query on event
// No polling needed — event-driven invalidation
```

**Lighthouse Targets:**

```
Key pages to audit:
  /dashboard (Client)     → target: 90+ Performance, 90+ A11y
  /admin                  → target: 90+ Performance, 90+ A11y
  /login                  → target: 95+ Performance, 95+ A11y
  /admin/projects/[id]    → target: 85+ Performance, 90+ A11y
  /milestones/[id]        → target: 90+ Performance, 90+ A11y

Common issues to fix:
  LCP (Largest Contentful Paint):
    - Preload hero fonts
    - Use next/image with priority on above-fold images

  CLS (Cumulative Layout Shift):
    - Reserve space for skeleton loaders (same height as real content)
    - Avatar with width/height set
    - no dynamic class injection after hydration

  FID / INP (Interaction to Next Paint):
    - Avoid heavy computations in render
    - Virtualize long lists (if > 50 items)
    - Debounce search inputs
```

---

### EPIC 6: Final QA

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S07-031 | Empty state coverage review | 🔴 | 1h | ⬜ |
| S07-032 | Loading state coverage review | 🔴 | 1h | ⬜ |
| S07-033 | Error state coverage review | 🔴 | 1h | ⬜ |
| S07-034 | Auth flow E2E test | 🔴 | 1h | ⬜ |
| S07-035 | Client portal E2E test | 🔴 | 2h | ⬜ |
| S07-036 | Admin portal E2E test | 🔴 | 2h | ⬜ |
| S07-037 | TypeScript build → 0 errors | 🔴 | 30m | ⬜ |
| S07-038 | Console errors → 0 on key pages | 🔴 | 1h | ⬜ |

---

**State Coverage Matrix:**

| صفحة | Loading | Empty | Error |
|---|---|---|---|
| Client Dashboard | SkeletonDashboard | EmptyState: no project | ServerError |
| Milestones List | SkeletonMilestone ×3 | EmptyState: no milestones | ServerError |
| Milestone Detail | SkeletonCard | N/A | ServerError |
| Revisions List | SkeletonCard ×3 | EmptyState: no revisions | ServerError |
| Create Revision | Button loading | N/A | Form error messages |
| Files | SkeletonCard ×6 | EmptyState: no files | ServerError |
| Payments | SkeletonCard ×3 | EmptyState: no invoices | ServerError |
| Notifications | Skeleton ×5 | EmptyState: all caught up | ServerError |
| Admin Overview | SkeletonDashboard | EmptyState: no projects | ServerError |
| Projects List | SkeletonTable ×5 | EmptyState: no projects | ServerError |
| Project Detail | SkeletonCard | EmptyState per tab | ServerError |
| Clients List | SkeletonTable ×5 | EmptyState: no clients | ServerError |
| Tasks Board | SkeletonCard per col | EmptyState per column | ServerError |
| Team | SkeletonCard ×6 | EmptyState: no members | ServerError |
| Invoices List | SkeletonTable ×5 | EmptyState: no invoices | ServerError |
| Roles List | SkeletonCard ×3 | N/A (always has system roles) | ServerError |

---

**E2E Test Scenarios:**

```
Auth Flow:
  1. New user registers
  2. Receives verify email (mock)
  3. Verifies email → redirected to onboarding
  4. Completes onboarding → workspace created
  5. Redirected to correct dashboard (client/admin)

Client Flow:
  1. Client logs in → sees dashboard with project
  2. Sees "Review Milestone" pending action → clicks
  3. Views milestone detail with deliverables
  4. Clicks "Request Changes" → fills revision form → submits
  5. Goes to Revisions list → sees new revision
  6. Goes to Payments → sees pending invoice
  7. Views invoice detail → uploads payment proof
  8. Goes to Files → downloads a file
  9. Goes to Settings → changes notification preferences

Admin Flow:
  1. Admin logs in → sees overview with KPIs
  2. Clicks "New Project" → completes 3-step wizard
  3. Goes to new project → creates a milestone
  4. Uploads files to milestone
  5. Marks milestone "Ready for Review"
  6. Goes to Tasks → creates a task for developer
  7. Goes to Clients → adds a new client
  8. Goes to Financial → creates invoice → sends to client
  9. Goes to Team → invites new member
 10. Goes to Roles → creates "Content Editor" role with limited permissions
```

---

### EPIC 7: i18n Final Audit — Arabic/English Coverage

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S07-039 | i18n coverage audit — بحث عن hardcoded strings في كل الصفحات (grep + visual) | 🔴 | 2h | ⬜ |
| S07-040 | RTL layout audit — Client Portal على العربية (كل الصفحات) | 🔴 | 2h | ⬜ |
| S07-041 | RTL layout audit — Admin Dashboard على العربية (كل الصفحات) | 🔴 | 2h | ⬜ |
| S07-042 | RTL layout fixes (margins, padding, icons direction, text-align, flex direction) | 🔴 | 2h | ⬜ |
| S07-043 | locale persistence audit — cookie يستمر بعد reload + logout + login | 🔴 | 1h | ⬜ |
| S07-044 | Arabic font rendering audit — Cairo يُحمّل صح + لا يوجد FOUT | 🟠 | 30m | ⬜ |

---

**RTL Audit Checklist لكل صفحة:**

```
Layout Direction:
  [ ] Sidebar على اليمين مع العربية (RTL)
  [ ] Sidebar على اليسار مع الإنجليزية (LTR)
  [ ] Breadcrumbs تقرأ من اليمين لليسار
  [ ] Form fields — label alignment صح
  [ ] Icons الاتجاهية (arrows, chevrons) تنعكس مع RTL
  [ ] Dropdown menus تفتح في الاتجاه الصحيح
  [ ] DataTable columns مرتبة صح
  [ ] Toast notifications تظهر في الجهة الصحيحة
  [ ] Avatar + username ترتيب صح في Header

Typography:
  [ ] Arabic text يستخدم Cairo font
  [ ] English text يستخدم Geist font
  [ ] Mixed content (Arabic + English numbers) يُعرض صح
  [ ] أرقام الـ currency تبقى LTR داخل النص RTL
```

**i18n Coverage Final Check:**

```
Hardcoded strings لازم تُزال:
  [ ] لا يوجد English text hardcoded في Client Portal pages
  [ ] لا يوجد English text hardcoded في Admin Dashboard pages
  [ ] كل Error messages مترجمة
  [ ] كل Empty state messages مترجمة
  [ ] كل Toast notifications مترجمة
  [ ] كل Dialog/Modal content مترجم
  [ ] كل Form labels + placeholders مترجمة
  [ ] كل Button labels مترجمة
  [ ] كل Page titles مترجمة
  [ ] Date/Time formatting حسب locale (ar vs en)
```

---

## خطة التنفيذ اليومية

| اليوم | المهام |
|---|---|
| Day 1 | S07-001-006 Onboarding flow complete |
| Day 2 | S07-007/008 Dark mode setup + S07-009 Auth pages dark |
| Day 3 | S07-010 Client Portal dark mode audit + fixes |
| Day 4 | S07-011/012 Admin dark mode audit + fixes |
| Day 5 | S07-013-016 Mobile + Tablet responsive audit |
| Day 6 | S07-017-019 Responsive fixes (tables/kanban/matrix) |
| Day 7 | S07-020-024 Accessibility audit + fixes + S07-039 i18n coverage audit (hardcoded strings) |
| Day 8 | S07-025-030 Performance audit + Core Web Vitals + S07-040/041 RTL layout audit |
| Day 9 | S07-031-033 State coverage + S07-042 RTL fixes + S07-043/044 locale persistence + font audit |
| Day 10 | S07-034-036 E2E tests + S07-037/038 Build check + i18n final sign-off |

---

## قائمة التحقق النهائية (Final Project Sign-off)

```
Onboarding:
[ ] New user → onboarding → workspace → dashboard
[ ] Cannot skip onboarding
[ ] Role selection determines portal

Dark Mode:
[ ] Toggle works (persists in localStorage)
[ ] All Auth pages
[ ] All Client Portal pages
[ ] All Admin Dashboard pages
[ ] No white flashes on page load

Responsive:
[ ] 390px — all pages usable (no horizontal scroll on content)
[ ] 768px — sidebar works as drawer
[ ] 1024px — collapsible sidebar works
[ ] 1280px — full layout correct
[ ] 1440px — extra space handled gracefully

Accessibility:
[ ] Tab through Login page → all fields + submit reachable
[ ] Tab through modals → focus trapped
[ ] Escape closes all dialogs/drawers
[ ] All icon buttons have tooltips/labels
[ ] Form errors programmatically associated

Performance:
[ ] Client Dashboard LCP < 2.5s
[ ] Admin Overview LCP < 2.5s
[ ] Login page score > 95
[ ] No CLS > 0.1 on any key page

State Coverage:
[ ] Every list page has empty state
[ ] Every async operation has loading state
[ ] Every fetch has error state

i18n Final Sign-off:
[ ] كل الصفحات — zero hardcoded English strings في Client Portal
[ ] كل الصفحات — zero hardcoded English strings في Admin Dashboard
[ ] LanguageSwitcher يعمل على كل الصفحات
[ ] تبديل اللغة → lang + dir يتحدثان فورًا على <html>
[ ] locale يستمر بعد reload + logout + login
[ ] Cairo font يُحمّل للعربية (no FOUT / layout shift)
[ ] RTL layout صح — Client Portal (Sidebar يمين، arrows معكوسة، text-align)
[ ] RTL layout صح — Admin Dashboard (كل الصفحات)
[ ] Mixed content (أرقام + عملة داخل نص عربي) يُعرض صح
[ ] Empty states + Toast notifications مترجمة بالعربي والإنجليزي
[ ] Locale switch updates `lang` and `dir` correctly
[ ] Form validation errors تظهر باللغة الحالية

Build:
[ ] npm run build → exit 0
[ ] npm run type-check → 0 errors
[ ] 0 console.error on key pages
[ ] 0 hydration errors in browser
```
