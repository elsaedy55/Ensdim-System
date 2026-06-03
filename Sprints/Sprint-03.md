# SPRINT 03 — Composite Components + Client Dashboard
# الـ Components المركبة + داشبورد العميل

---

## معلومات السبرينت

| المعلومة | التفاصيل |
|---|---|
| رقم السبرينت | 03 |
| المرحلة | Phase B — Client Portal |
| تاريخ البدء | 2026-06-29 |
| تاريخ الانتهاء | 2026-07-12 |
| المدة | أسبوعان (10 أيام عمل) |
| التقدير الزمني | ~64 ساعة |
| عدد المهام | 53 مهمة |
| التبعيات | Sprint 01 + 02 مكتملين ✅ |

---

## هدف السبرينت

> بنهاية هذا السبرينت تكون كل الـ composite UI components جاهزة (StatusBadge، ProgressBar، DataTable، Modals، Skeletons)، ويكون Client Dashboard حقيقي يعمل بـ data حقيقية أو mock. العميل يرى مشروعه بوضوح فور تسجيل الدخول.

---

## نتائج (Deliverables) السبرينت

- [x] جميع الـ composite components جاهزة وموثقة
- [x] DataTable مكتمل (sort + filter + pagination + empty + skeleton)
- [x] كل Modal patterns جاهزة
- [x] كل Skeleton patterns جاهزة
- [x] صفحة Client Dashboard (/dashboard) كاملة
- [x] صفحة Project Overview (/project) كاملة
- [x] React Query setup لكل الـ data fetching

---

## معيار الإتمام (Definition of Done)

- [ ] Client يرى dashboard حقيقية مع project status
- [ ] Pending actions تظهر بشكل صح
- [ ] Dashboard يتحمل خلال < 2 ثانية
- [ ] Loading skeletons تظهر أثناء fetch
- [ ] Empty states تظهر عند غياب البيانات
- [ ] كل components تعمل في Dark Mode
- [ ] Mobile layout صح على 390px

---

## المهام التفصيلية

### EPIC 1: Composite UI Components

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S03-001 | FormField | 🔴 | 1h | ⬜ |
| S03-002 | FormSection | 🟠 | 30m | ⬜ |
| S03-003 | StatusBadge (7 variants) | 🔴 | 1h | ⬜ |
| S03-004 | PriorityBadge (3 variants) | 🔴 | 30m | ⬜ |
| S03-005 | ProgressBar (custom) | 🔴 | 1h | ⬜ |
| S03-006 | CircularProgress | 🟠 | 1h | ⬜ |
| S03-007 | DueDateLabel (normal / warning / overdue) | 🟠 | 30m | ⬜ |
| S03-008 | EmptyState base | 🔴 | 1h | ⬜ |
| S03-009 | EmptyState — 10 variants | 🔴 | 2h | ⬜ |
| S03-010 | SearchInput | 🟠 | 30m | ⬜ |
| S03-011 | MultiSelect | 🟠 | 2h | ⬜ |
| S03-012 | DatePicker | 🟠 | 1h | ⬜ |
| S03-013 | FileUploadZone (drag & drop + file list) | 🔴 | 3h | ⬜ |
| S03-014 | CountBadge | 🟠 | 30m | ⬜ |

---

**تفاصيل S03-003 — StatusBadge:**

```typescript
type Status =
  | "pending"       → zinc background, gray text
  | "in_progress"   → indigo background, indigo text
  | "review"        → amber background, amber text
  | "approved"      → emerald background, emerald text
  | "completed"     → emerald background (darker), emerald text
  | "rejected"      → rose background, rose text
  | "delayed"       → rose background, rose text + ⚠ icon

// Sizes: sm (px-2 py-0.5 text-xs) | default (px-2.5 py-1 text-xs)
// Dot variant: small colored dot + label (for inline use)
```

**تفاصيل S03-005 — ProgressBar:**

```
Thin (project overview):  height: 6px, rounded-full, animated fill
Milestone card:           height: 4px, subtle
Dashboard hero:           height: 8px, with percentage label above

Animation: width transition 1s ease-in-out on mount
Color coding:
  0-30%:   rose-500
  31-60%:  amber-500
  61-89%:  indigo-500
  90-100%: emerald-500
```

**تفاصيل S03-013 — FileUploadZone:**

```
States:
  Default: dashed border (border-zinc-300) + CloudUpload icon + "Drop files here or click to browse"
  Drag-over: border-indigo-500 + bg-indigo-50 + "Release to upload"
  File selected: shows file list below zone
  Uploading: progress bar per file
  Error: rose border + error message

File list item:
  [FileIcon] [filename.ext]  [size]  [✓ or ✗ status]  [× remove]

Validations (configurable props):
  maxSize: number (default 10MB)
  accept: string[] (default all)
  maxFiles: number (default 10)
```

---

### EPIC 2: Data Components

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S03-015 | DataTable | 🔴 | 4h | ⬜ |
| S03-016 | TableRowActions | 🔴 | 1h | ⬜ |
| S03-017 | Pagination | 🔴 | 1h | ⬜ |
| S03-018 | FilterBar + FilterChip | 🟠 | 2h | ⬜ |
| S03-019 | BulkActionsBar | 🟡 | 1h | ⬜ |

**تفاصيل S03-015 — DataTable:**

```typescript
interface DataTableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  isLoading?: boolean          // shows skeleton rows
  isEmpty?: boolean            // shows EmptyState
  emptyState?: EmptyStateProps
  pagination?: PaginationState
  onPaginationChange?: (state: PaginationState) => void
  sorting?: SortingState
  onSortingChange?: (state: SortingState) => void
  rowSelection?: boolean       // enables checkboxes
  onRowClick?: (row: T) => void
}

// Features:
// - Click column header → sort (asc/desc/none cycle)
// - Hover row → subtle highlight
// - Loading → 5 skeleton rows (same height as real rows)
// - Empty → EmptyState component centered
// - Mobile → horizontal scroll wrapper
```

---

### EPIC 3: Loading + Error + Modal States

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S03-020 | SkeletonCard | 🔴 | 30m | ⬜ |
| S03-021 | SkeletonTableRow | 🔴 | 30m | ⬜ |
| S03-022 | SkeletonDashboard | 🔴 | 1h | ⬜ |
| S03-023 | SkeletonMilestone | 🟠 | 30m | ⬜ |
| S03-024 | SkeletonKPICard | 🟠 | 30m | ⬜ |
| S03-025 | ServerError page (500) | 🔴 | 1h | ⬜ |
| S03-026 | OfflineBanner | 🟠 | 1h | ⬜ |
| S03-027 | SessionExpiredModal | 🔴 | 1h | ⬜ |
| S03-028 | Toast patterns (4 types) | 🔴 | 1h | ⬜ |
| S03-029 | ConfirmDeleteDialog | 🔴 | 1h | ⬜ |
| S03-030 | ApproveDialog | 🔴 | 1h | ⬜ |
| S03-031 | FileUploadModal (wraps FileUploadZone) | 🔴 | 2h | ⬜ |
| S03-032 | RevisionRequestModal | 🔴 | 2h | ⬜ |

---

### EPIC 4: Client Portal — Shared Components

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S03-033 | ActivityFeedItem | 🔴 | 1h | ⬜ |
| S03-034 | ActivityFeed | 🔴 | 1h | ⬜ |
| S03-035 | NotificationItem | 🔴 | 1h | ⬜ |
| S03-036 | NotificationDropdown | 🔴 | 2h | ⬜ |
| S03-037 | TeamMemberChip | 🟠 | 30m | ⬜ |
| S03-038 | FileCard | 🔴 | 1h | ⬜ |
| S03-039 | FileGrid | 🔴 | 1h | ⬜ |
| S03-040 | FilePreviewModal | 🟠 | 2h | ⬜ |

**تفاصيل S03-033 — ActivityFeedItem:**

```
Layout:
  [Avatar 32px] [Content] [Timestamp]

Content variants:
  "PM uploaded 3 files to Phase 2"
  "Milestone 'UI Design' has been approved"
  "New invoice #007 sent to you"
  "Team member Ahmed added to project"

Timestamp: relative time (2h ago, Yesterday, Jan 15)
Hover: subtle bg highlight
Click: navigates to related resource
```

**تفاصيل S03-036 — NotificationDropdown:**

```
Trigger: Bell icon in Header (with count badge)
Panel: 380px wide, max-height 480px, scrollable
Header: "Notifications"  [Mark all as read link]

Notification Item:
  [Color dot] [Icon] [Title + body text] [Timestamp]
  Unread: slightly highlighted bg
  Read: normal bg

Footer: [View all notifications →] link

Categories displayed:
  • Milestone ready for review (flag icon, indigo dot)
  • Invoice sent (receipt icon, amber dot)
  • File uploaded (file icon, zinc dot)
  • Approval complete (check icon, emerald dot)
```

---

### EPIC 5: Dashboard-Specific Components

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S03-041 | ProjectStatusHeroCard | 🔴 | 2h | ⬜ |
| S03-042 | PendingActionCard | 🔴 | 1h | ⬜ |
| S03-043 | PendingActionsPanel | 🔴 | 1h | ⬜ |
| S03-044 | FinancialSummaryStrip | 🔴 | 1h | ⬜ |
| S03-045 | MilestoneCard (dashboard mini) | 🔴 | 2h | ⬜ |

**تفاصيل S03-041 — ProjectStatusHeroCard:**

```
Layout: full-width card, generous padding (32px)

Content:
  Top row:
    Left:  Project name (20px/600) + Client company tag
    Right: [Stage Badge] "Development" (indigo)

  Middle:
    "Phase 3 of 5 — Frontend Development"
    [ProgressBar — 68%]
    "68% Complete"

  Bottom row:
    Left:  📅 Started Jan 15, 2026
    Right: 🎯 Estimated delivery: Mar 30, 2026
           "3 weeks remaining" (in green if on track, red if delayed)

States:
  Loading: SkeletonCard (same dimensions)
  No project: EmptyState "Your project hasn't started yet"
  Delayed: red accent on delivery date + "Delayed" badge
```

**تفاصيل S03-042 — PendingActionCard:**

```
Used in: PendingActionsPanel grid

Variants:
  Milestone Review:
    Icon: Flag (indigo)
    Title: "Review Milestone"
    Body: "Phase 2: UI Design is ready for your approval"
    CTA: "Review Now →"
    Urgency: normal

  Invoice Due:
    Icon: CreditCard (amber)
    Title: "Payment Due"
    Body: "Invoice #007 — $2,400 due March 1"
    CTA: "View Invoice →"
    Urgency: warning (amber border)

  Overdue Invoice:
    Urgency: danger (rose border + rose icon)

Card: border, rounded-lg, p-4, hover shadow
CTA: ghost button → navigates to relevant page
```

---

### EPIC 6: Client Dashboard + Project Pages

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S03-046 | صفحة Client Dashboard (/dashboard) | 🔴 | 4h | ⬜ |
| S03-047 | Dashboard — React Query data fetching | 🔴 | 2h | ⬜ |
| S03-048 | Dashboard — mobile responsive layout | 🔴 | 2h | ⬜ |
| S03-049 | صفحة Project Overview (/project) | 🔴 | 3h | ⬜ |
| S03-050 | Project — tabs (Overview / Progress / Team) | 🔴 | 2h | ⬜ |

**تفاصيل S03-046 — Client Dashboard Layout:**

```
Desktop (xl):
  Row 1: ProjectStatusHeroCard (full width)
  Row 2: PendingActionsPanel (2-col grid, max 4 actions)
  Row 3: FinancialSummaryStrip (3 numbers: total/paid/remaining)
  Row 4: 2-column split:
    Left (60%): Milestones mini-list (last 5 milestones with status)
    Right (40%): ActivityFeed (last 8 activities)

Tablet (md):
  Same sections but all full-width, stacked

Mobile (xs/sm):
  Row 1: ProjectStatusHeroCard (compact, no sub-details)
  Row 2: PendingActions (horizontal scroll cards)
  Row 3: FinancialSummaryStrip (compact 3-col numbers)
  Row 4: Milestones (full width list, 3 items + "View all →")
  Row 5: ActivityFeed (3 items + "View all →")

Loading state:
  SkeletonDashboard covers all rows
  Loads progressively (React Query suspense)

Empty state (no project):
  Centered EmptyState with "Your project will appear here"
```

**React Query Setup:**

```typescript
// hooks/useDashboard.ts
export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: () => dashboardService.getOverview(),
    staleTime: 30_000,      // 30 seconds
    refetchOnWindowFocus: true,
  })
}

// Realtime: subscribe to project updates via Supabase
// On new event → invalidate dashboard query
```

---

### EPIC 7: i18n — Dashboard & Components Copy

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S03-051 | `messages/en/dashboard.json` — Client Dashboard + Project Overview copy | 🔴 | 1h | ⬜ |
| S03-052 | `messages/ar/dashboard.json` — Arabic translation | 🔴 | 1h | ⬜ |
| S03-053 | تطبيق `useTranslations()` على Client Dashboard page + Project Overview | 🔴 | 2h | ⬜ |

---

**هيكل dashboard.json:**

```json
{
  "hero": {
    "phaseOf": "Phase {n} of {total}",
    "complete": "{pct}% Complete",
    "started": "Started {date}",
    "estimatedDelivery": "Estimated delivery: {date}",
    "weeksRemaining": "{n} weeks remaining",
    "onTrack": "On Track",
    "delayed": "Delayed",
    "noProject": "Your project hasn't started yet"
  },
  "pendingActions": {
    "title": "Pending Actions",
    "reviewMilestone": "Review Milestone",
    "reviewNow": "Review Now →",
    "paymentDue": "Payment Due",
    "viewInvoice": "View Invoice →",
    "overdue": "Overdue",
    "empty": "No pending actions"
  },
  "financial": {
    "title": "Financial Summary",
    "totalValue": "Total Value",
    "paid": "Paid",
    "remaining": "Remaining"
  },
  "milestones": {
    "title": "Milestones",
    "viewAll": "View All Milestones →"
  },
  "activity": {
    "title": "Recent Activity",
    "viewAll": "View All Activity →"
  },
  "project": {
    "overviewTitle": "Project Overview",
    "tabs": {
      "overview": "Overview",
      "progress": "Progress",
      "team": "Team"
    }
  }
}
```

---

## خطة التنفيذ اليومية

| اليوم | المهام |
|---|---|
| Day 1 | S03-001 → S03-007 (Composite components 1) |
| Day 2 | S03-008 → S03-014 (EmptyState + FileUpload) |
| Day 3 | S03-015 → S03-019 (DataTable + Pagination) |
| Day 4 | S03-020 → S03-028 (Skeleton + Error + Toast) |
| Day 5 | S03-029 → S03-032 (All Modals) |
| Day 6 | S03-033 → S03-040 (Client shared components) |
| Day 7 | S03-041 → S03-045 (Dashboard components) |
| Day 8 | S03-046 → S03-048 (Dashboard page + React Query) + S03-051/052 (messages/dashboard en+ar) |
| Day 9 | S03-049 → S03-050 (Project Overview page) + S03-053 (apply translations) |
| Day 10 | Buffer + responsive fixes + dark mode audit + RTL layout check للعربية |

---

## قائمة التحقق (Sprint Review Checklist)

```
Components:
[ ] StatusBadge — 7 variants تظهر صح
[ ] ProgressBar — animation تعمل
[ ] DataTable — sorting يعمل
[ ] DataTable — loading skeleton يظهر
[ ] DataTable — empty state يظهر
[ ] FileUploadZone — drag & drop يعمل
[ ] ConfirmDeleteDialog — focus على Cancel
[ ] RevisionRequestModal — form validation يعمل
[ ] NotificationDropdown — bell + count badge
[ ] ActivityFeed — timestamps relative

Dashboard:
[ ] ProjectStatusHeroCard — project data يظهر
[ ] PendingActionCard — navigate يعمل
[ ] FinancialSummaryStrip — أرقام صح
[ ] Milestones mini-list — status badges صح
[ ] ActivityFeed — real activities تظهر
[ ] Mobile → horizontal scroll pending actions
[ ] Loading → SkeletonDashboard يظهر
[ ] Empty → EmptyState يظهر
[ ] Dark mode — كل sections صح

i18n:
[ ] messages/dashboard.json — en + ar مكتملين
[ ] Client Dashboard يعرض النصوص صح بالعربي والإنجليزي
[ ] Project Overview page مترجمة
[ ] RTL layout للداشبورد صح مع العربية (padding/margin/icons)
```
