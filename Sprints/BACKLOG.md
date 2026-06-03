# ENSDIM — COMPLETE TASK BACKLOG
# القائمة الكاملة لكل المهام

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
| `[TOKEN]` | Design tokens |
| `[COMP]` | Component |
| `[LAYOUT]` | Layout component |
| `[PAGE]` | صفحة كاملة |
| `[LOGIC]` | Business logic / State |
| `[API]` | API integration |
| `[TEST]` | Testing / QA |
| `[PERF]` | Performance |
| `[A11Y]` | Accessibility |

---

# SPRINT 01 TASKS — Infrastructure + Design System

## Epic: Project Setup

| ID | المهمة | النوع | الأولوية | الوقت التقديري |
|---|---|---|---|---|
| S01-001 | تهيئة Next.js 15 مع TypeScript و App Router | `[SETUP]` | 🔴 | 2h |
| S01-002 | تثبيت وإعداد TailwindCSS v4 | `[SETUP]` | 🔴 | 1h |
| S01-003 | تثبيت وإعداد shadcn/ui (components.json) | `[SETUP]` | 🔴 | 1h |
| S01-004 | إعداد هيكل المجلدات الكامل | `[SETUP]` | 🔴 | 1h |
| S01-005 | إعداد path aliases في tsconfig.json | `[SETUP]` | 🔴 | 30m |
| S01-006 | إعداد ESLint + Prettier | `[SETUP]` | 🟠 | 30m |
| S01-007 | إعداد environment variables schema (Zod) | `[SETUP]` | 🟠 | 1h |
| S01-008 | إعداد Inter font عبر next/font | `[SETUP]` | 🟠 | 30m |
| S01-009 | إنشاء globals.css مع كل Design Tokens | `[TOKEN]` | 🔴 | 3h |

## Epic: Design Tokens

| ID | المهمة | النوع | الأولوية | الوقت التقديري |
|---|---|---|---|---|
| S01-010 | Color tokens — Light Mode (zinc, indigo, emerald, amber, rose) | `[TOKEN]` | 🔴 | 1h |
| S01-011 | Color tokens — Dark Mode | `[TOKEN]` | 🔴 | 1h |
| S01-012 | Typography scale (display → caption) | `[TOKEN]` | 🔴 | 30m |
| S01-013 | Spacing tokens (8pt grid: 4→96) | `[TOKEN]` | 🔴 | 30m |
| S01-014 | Border radius tokens (sm/md/lg/xl) | `[TOKEN]` | 🔴 | 15m |
| S01-015 | Shadow tokens (sm/card/dropdown/modal) | `[TOKEN]` | 🔴 | 30m |
| S01-016 | Z-index scale | `[TOKEN]` | 🟠 | 15m |
| S01-017 | Animation + transition tokens (150ms/250ms ease) | `[TOKEN]` | 🟠 | 15m |

## Epic: Base UI Components (shadcn/ui install + style override)

| ID | المهمة | النوع | الأولوية | الوقت التقديري |
|---|---|---|---|---|
| S01-018 | Button (primary / secondary / destructive / ghost / link) | `[COMP]` | 🔴 | 1h |
| S01-019 | Input | `[COMP]` | 🔴 | 30m |
| S01-020 | Textarea | `[COMP]` | 🔴 | 30m |
| S01-021 | Select | `[COMP]` | 🔴 | 30m |
| S01-022 | Checkbox | `[COMP]` | 🔴 | 30m |
| S01-023 | RadioGroup | `[COMP]` | 🟠 | 30m |
| S01-024 | Switch | `[COMP]` | 🟠 | 30m |
| S01-025 | Label | `[COMP]` | 🔴 | 15m |
| S01-026 | Badge (base) | `[COMP]` | 🔴 | 30m |
| S01-027 | Avatar + AvatarGroup | `[COMP]` | 🔴 | 30m |
| S01-028 | Separator | `[COMP]` | 🟠 | 15m |
| S01-029 | Skeleton (base component) | `[COMP]` | 🔴 | 30m |
| S01-030 | Progress (base) | `[COMP]` | 🔴 | 30m |
| S01-031 | ScrollArea | `[COMP]` | 🟠 | 30m |
| S01-032 | Tooltip | `[COMP]` | 🟠 | 30m |
| S01-033 | Popover | `[COMP]` | 🟠 | 30m |
| S01-034 | DropdownMenu | `[COMP]` | 🔴 | 30m |
| S01-035 | Dialog / AlertDialog | `[COMP]` | 🔴 | 1h |
| S01-036 | Sheet / Drawer | `[COMP]` | 🔴 | 30m |
| S01-037 | Tabs | `[COMP]` | 🔴 | 30m |
| S01-038 | Accordion | `[COMP]` | 🟡 | 30m |
| S01-039 | Toast / Sonner setup | `[COMP]` | 🔴 | 30m |
| S01-040 | Card (base container) | `[COMP]` | 🔴 | 30m |
| S01-041 | Command (⌘K global search base) | `[COMP]` | 🟠 | 1h |

## Epic: Icon System

| ID | المهمة | النوع | الأولوية | الوقت التقديري |
|---|---|---|---|---|
| S01-042 | تثبيت lucide-react | `[SETUP]` | 🔴 | 15m |
| S01-043 | إنشاء Icon wrapper component (size/color/stroke standards) | `[COMP]` | 🟠 | 30m |
| S01-044 | توثيق Icon inventory (entity → icon mapping) | `[SETUP]` | 🟡 | 1h |

---

# SPRINT 02 TASKS — Layout System + Authentication

## Epic: Layout System

| ID | المهمة | النوع | الأولوية | الوقت التقديري |
|---|---|---|---|---|
| S02-001 | AuthLayout (centered card, no sidebar) | `[LAYOUT]` | 🔴 | 1h |
| S02-002 | ClientAppShell (root layout for client portal) | `[LAYOUT]` | 🔴 | 2h |
| S02-003 | AdminAppShell (root layout for admin dashboard) | `[LAYOUT]` | 🔴 | 2h |
| S02-004 | Sidebar — Client Variant (nav items, user section) | `[LAYOUT]` | 🔴 | 3h |
| S02-005 | Sidebar — Admin Variant (workspace switcher, extended nav) | `[LAYOUT]` | 🔴 | 3h |
| S02-006 | Sidebar — Collapsed state (icon-only, 64px) | `[LAYOUT]` | 🟠 | 1h |
| S02-007 | Sidebar — Mobile drawer (md breakpoint) | `[LAYOUT]` | 🟠 | 2h |
| S02-008 | Header — Client Variant | `[LAYOUT]` | 🔴 | 2h |
| S02-009 | Header — Admin Variant | `[LAYOUT]` | 🔴 | 2h |
| S02-010 | PageHeader component (title + subtitle + actions) | `[LAYOUT]` | 🔴 | 1h |
| S02-011 | PageContainer (max-width + padding wrapper) | `[LAYOUT]` | 🔴 | 30m |
| S02-012 | Breadcrumbs component | `[LAYOUT]` | 🟠 | 1h |
| S02-013 | Bottom Navigation Bar (mobile — client portal) | `[LAYOUT]` | 🟠 | 2h |
| S02-014 | Bottom Navigation Bar (mobile — admin) | `[LAYOUT]` | 🟠 | 1h |

## Epic: Routing + Middleware

| ID | المهمة | النوع | الأولوية | الوقت التقديري |
|---|---|---|---|---|
| S02-015 | Next.js middleware (auth check + role-based routing) | `[LOGIC]` | 🔴 | 2h |
| S02-016 | Route guard: redirect Client → /dashboard | `[LOGIC]` | 🔴 | 1h |
| S02-017 | Route guard: redirect Admin/PM → /admin | `[LOGIC]` | 🔴 | 1h |
| S02-018 | Route guard: redirect unauthenticated → /login | `[LOGIC]` | 🔴 | 30m |
| S02-019 | 403 Access Denied page | `[PAGE]` | 🔴 | 1h |
| S02-020 | 404 Not Found page | `[PAGE]` | 🔴 | 1h |

## Epic: Auth State Management

| ID | المهمة | النوع | الأولوية | الوقت التقديري |
|---|---|---|---|---|
| S02-021 | إنشاء auth.store.ts (Zustand) | `[LOGIC]` | 🔴 | 1h |
| S02-022 | إنشاء workspace.store.ts (Zustand) | `[LOGIC]` | 🔴 | 1h |
| S02-023 | إنشاء api.ts (base fetch/axios client) | `[API]` | 🔴 | 1h |
| S02-024 | إنشاء auth.service.ts (login/register/refresh/logout) | `[API]` | 🔴 | 2h |
| S02-025 | JWT token refresh logic (interceptor) | `[LOGIC]` | 🔴 | 2h |
| S02-026 | Session expired modal trigger | `[COMP]` | 🔴 | 1h |

## Epic: Authentication Pages

| ID | المهمة | النوع | الأولوية | الوقت التقديري |
|---|---|---|---|---|
| S02-027 | صفحة Login (/login) | `[PAGE]` | 🔴 | 3h |
| S02-028 | صفحة Register (/register) | `[PAGE]` | 🔴 | 2h |
| S02-029 | صفحة Email Verification (/verify-email) | `[PAGE]` | 🔴 | 2h |
| S02-030 | صفحة Forgot Password (/forgot-password) | `[PAGE]` | 🔴 | 1h |
| S02-031 | صفحة Reset Password (/reset-password) | `[PAGE]` | 🔴 | 2h |
| S02-032 | Form validation (React Hook Form + Zod schemas) | `[LOGIC]` | 🔴 | 2h |
| S02-033 | Error handling (401/403/500 on auth) | `[LOGIC]` | 🔴 | 1h |
| S02-034 | Rate limit feedback UI (account locked state) | `[COMP]` | 🟠 | 1h |

## Epic: Internationalization Foundation (Arabic/English)

| ID | المهمة | النوع | الأولوية | الوقت التقديري |
|---|---|---|---|---|
| S02-035 | Locale routing + `<html lang>` / `dir` switching | `[LOGIC]` | 🔴 | 2h |
| S02-036 | Language switcher component (header + mobile nav) | `[COMP]` | 🟠 | 1h |
| S02-037 | System copy layer for shell/auth/common UI | `[SETUP]` | 🔴 | 2h |
| S02-038 | Feature/page translation convention + colocated files template | `[SETUP]` | 🔴 | 1h |

**مبدأ التنظيم:**

- الـ shell والـ UI المشترك له طبقة system صغيرة.
- أي نص خاص بصفحة أو feature يبقى بجوار الصفحة أو داخل feature owner نفسه.
- ممنوع الاعتماد على ملف ترجمة عالمي واحد لكل المشروع.

---

# SPRINT 03 TASKS — Composite Components + Client Dashboard

## Epic: Composite UI Components

| ID | المهمة | النوع | الأولوية | الوقت التقديري |
|---|---|---|---|---|
| S03-001 | FormField (Label + Input + Error message) | `[COMP]` | 🔴 | 1h |
| S03-002 | FormSection (grouped fields with title) | `[COMP]` | 🟠 | 30m |
| S03-003 | StatusBadge (Pending/In Progress/Review/Approved/Done/Rejected/Delayed) | `[COMP]` | 🔴 | 1h |
| S03-004 | PriorityBadge (High/Medium/Low) | `[COMP]` | 🔴 | 30m |
| S03-005 | ProgressBar (custom: thin, animated, indigo) | `[COMP]` | 🔴 | 1h |
| S03-006 | CircularProgress | `[COMP]` | 🟠 | 1h |
| S03-007 | DueDateLabel (with overdue state) | `[COMP]` | 🟠 | 30m |
| S03-008 | EmptyState (base: icon + title + description + CTA) | `[COMP]` | 🔴 | 1h |
| S03-009 | EmptyState — كل الـ variants (10 حالات) | `[COMP]` | 🔴 | 2h |
| S03-010 | SearchInput (Input + Search icon) | `[COMP]` | 🟠 | 30m |
| S03-011 | MultiSelect | `[COMP]` | 🟠 | 2h |
| S03-012 | DatePicker | `[COMP]` | 🟠 | 1h |
| S03-013 | FileUploadZone (drag & drop) | `[COMP]` | 🔴 | 3h |
| S03-014 | CountBadge (notification count) | `[COMP]` | 🟠 | 30m |

## Epic: Data Components

| ID | المهمة | النوع | الأولوية | الوقت التقديري |
|---|---|---|---|---|
| S03-015 | DataTable (sorting + filtering + pagination + empty + loading) | `[COMP]` | 🔴 | 4h |
| S03-016 | TableRowActions (dropdown per row) | `[COMP]` | 🔴 | 1h |
| S03-017 | Pagination | `[COMP]` | 🔴 | 1h |
| S03-018 | FilterBar + FilterChip | `[COMP]` | 🟠 | 2h |
| S03-019 | BulkActionsBar | `[COMP]` | 🟡 | 1h |

## Epic: Loading + Error + Modal States

| ID | المهمة | النوع | الأولوية | الوقت التقديري |
|---|---|---|---|---|
| S03-020 | SkeletonCard | `[COMP]` | 🔴 | 30m |
| S03-021 | SkeletonTableRow | `[COMP]` | 🔴 | 30m |
| S03-022 | SkeletonDashboard (full dashboard skeleton) | `[COMP]` | 🔴 | 1h |
| S03-023 | SkeletonMilestone | `[COMP]` | 🟠 | 30m |
| S03-024 | SkeletonKPICard | `[COMP]` | 🟠 | 30m |
| S03-025 | ServerError page (500) | `[PAGE]` | 🔴 | 1h |
| S03-026 | OfflineBanner | `[COMP]` | 🟠 | 1h |
| S03-027 | SessionExpiredModal | `[COMP]` | 🔴 | 1h |
| S03-028 | Toast patterns (Success/Error/Warning/Info) | `[COMP]` | 🔴 | 1h |
| S03-029 | ConfirmDeleteDialog | `[COMP]` | 🔴 | 1h |
| S03-030 | ApproveDialog | `[COMP]` | 🔴 | 1h |
| S03-031 | FileUploadModal | `[COMP]` | 🔴 | 2h |
| S03-032 | RevisionRequestModal | `[COMP]` | 🔴 | 2h |

## Epic: Client Portal — Shared Components

| ID | المهمة | النوع | الأولوية | الوقت التقديري |
|---|---|---|---|---|
| S03-033 | ActivityFeedItem | `[COMP]` | 🔴 | 1h |
| S03-034 | ActivityFeed (list with loading state) | `[COMP]` | 🔴 | 1h |
| S03-035 | NotificationItem | `[COMP]` | 🔴 | 1h |
| S03-036 | NotificationDropdown (bell → panel) | `[COMP]` | 🔴 | 2h |
| S03-037 | TeamMemberChip | `[COMP]` | 🟠 | 30m |
| S03-038 | FileCard (name, type, size, date, actions) | `[COMP]` | 🔴 | 1h |
| S03-039 | FileGrid | `[COMP]` | 🔴 | 1h |
| S03-040 | FilePreviewModal | `[COMP]` | 🟠 | 2h |

## Epic: Client Portal — Dashboard Components

| ID | المهمة | النوع | الأولوية | الوقت التقديري |
|---|---|---|---|---|
| S03-041 | ProjectStatusHeroCard | `[COMP]` | 🔴 | 2h |
| S03-042 | PendingActionCard | `[COMP]` | 🔴 | 1h |
| S03-043 | PendingActionsPanel (2-col grid) | `[COMP]` | 🔴 | 1h |
| S03-044 | FinancialSummaryStrip | `[COMP]` | 🔴 | 1h |
| S03-045 | MilestoneCard (dashboard mini version) | `[COMP]` | 🔴 | 2h |

## Epic: Client Dashboard Page

| ID | المهمة | النوع | الأولوية | الوقت التقديري |
|---|---|---|---|---|
| S03-046 | صفحة Client Dashboard (/dashboard) — full layout | `[PAGE]` | 🔴 | 4h |
| S03-047 | Client Dashboard — server state (React Query) | `[LOGIC]` | 🔴 | 2h |
| S03-048 | Client Dashboard — responsive (mobile layout) | `[PAGE]` | 🔴 | 2h |
| S03-049 | صفحة Project Overview (/project) | `[PAGE]` | 🔴 | 3h |
| S03-050 | Project Overview — tabs (Overview / Progress / Team) | `[PAGE]` | 🔴 | 2h |

---

# SPRINT 04 TASKS — Client Portal Complete

## Epic: Milestones

| ID | المهمة | النوع | الأولوية | الوقت التقديري |
|---|---|---|---|---|
| S04-001 | MilestoneCard (full detail version) | `[COMP]` | 🔴 | 2h |
| S04-002 | MilestoneTimeline (visual horizontal timeline) | `[COMP]` | 🔴 | 3h |
| S04-003 | صفحة Milestones List (/milestones) | `[PAGE]` | 🔴 | 2h |
| S04-004 | Milestones List — status filter tabs | `[PAGE]` | 🔴 | 1h |
| S04-005 | صفحة Milestone Detail (/milestones/[id]) | `[PAGE]` | 🔴 | 3h |
| S04-006 | Milestone Detail — Deliverables section | `[PAGE]` | 🔴 | 2h |
| S04-007 | Milestone Detail — Review Actions (Approve / Request Revision) | `[PAGE]` | 🔴 | 2h |
| S04-008 | Milestone Detail — Activity log | `[PAGE]` | 🟠 | 1h |
| S04-009 | Milestone approval API integration | `[API]` | 🔴 | 1h |

## Epic: Revisions

| ID | المهمة | النوع | الأولوية | الوقت التقديري |
|---|---|---|---|---|
| S04-010 | RevisionCard (list item) | `[COMP]` | 🔴 | 1h |
| S04-011 | RevisionStatusStepper | `[COMP]` | 🟠 | 1h |
| S04-012 | صفحة Revisions List (/revisions) | `[PAGE]` | 🔴 | 2h |
| S04-013 | Revisions List — status filter tabs | `[PAGE]` | 🔴 | 1h |
| S04-014 | صفحة Create Revision (/revisions/new) | `[PAGE]` | 🔴 | 3h |
| S04-015 | Create Revision — category / priority / file upload | `[PAGE]` | 🔴 | 2h |
| S04-016 | صفحة Revision Detail (/revisions/[id]) | `[PAGE]` | 🔴 | 2h |
| S04-017 | Revision Detail — team response / status timeline | `[PAGE]` | 🟠 | 1h |
| S04-018 | Revision API integration (create + fetch) | `[API]` | 🔴 | 2h |

## Epic: Files & Deliverables

| ID | المهمة | النوع | الأولوية | الوقت التقديري |
|---|---|---|---|---|
| S04-019 | صفحة Files (/files) | `[PAGE]` | 🔴 | 3h |
| S04-020 | Files page — category tabs (Design / Dev / Docs / Credentials / Final) | `[PAGE]` | 🔴 | 1h |
| S04-021 | File download (signed URL) | `[LOGIC]` | 🔴 | 1h |
| S04-022 | File preview (image/PDF inline) | `[LOGIC]` | 🟠 | 2h |
| S04-023 | Files API integration | `[API]` | 🔴 | 1h |

## Epic: Payments & Invoices

| ID | المهمة | النوع | الأولوية | الوقت التقديري |
|---|---|---|---|---|
| S04-024 | InvoiceSummaryStrip (total/paid/remaining) | `[COMP]` | 🔴 | 1h |
| S04-025 | InvoiceCard (list item) | `[COMP]` | 🔴 | 1h |
| S04-026 | صفحة Payments (/payments) | `[PAGE]` | 🔴 | 2h |
| S04-027 | Payments — invoice list + status filter | `[PAGE]` | 🔴 | 1h |
| S04-028 | صفحة Invoice Detail (/payments/[id]) | `[PAGE]` | 🔴 | 2h |
| S04-029 | Invoice Detail — line items + totals | `[PAGE]` | 🔴 | 1h |
| S04-030 | PaymentProofUploader | `[COMP]` | 🔴 | 2h |
| S04-031 | Invoice PDF download | `[LOGIC]` | 🟠 | 1h |
| S04-032 | Invoices API integration | `[API]` | 🔴 | 1h |

## Epic: Notifications Page + Settings

| ID | المهمة | النوع | الأولوية | الوقت التقديري |
|---|---|---|---|---|
| S04-033 | صفحة Notifications (/notifications) | `[PAGE]` | 🔴 | 2h |
| S04-034 | Notifications — unread / read sections | `[PAGE]` | 🔴 | 1h |
| S04-035 | Mark all as read action | `[LOGIC]` | 🟠 | 30m |
| S04-036 | Realtime notification subscription (Supabase) | `[API]` | 🔴 | 2h |
| S04-037 | صفحة Settings — Client (/settings) | `[PAGE]` | 🔴 | 2h |
| S04-038 | Settings — Profile tab (name, email, avatar) | `[PAGE]` | 🔴 | 1h |
| S04-039 | Settings — Password & Security tab | `[PAGE]` | 🔴 | 1h |
| S04-040 | Settings — Notification Preferences tab | `[PAGE]` | 🔴 | 1h |
| S04-041 | Avatar upload (Supabase Storage) | `[LOGIC]` | 🟠 | 1h |

---

# SPRINT 05 TASKS — Admin Core

## Epic: Admin KPI + Shared Components

| ID | المهمة | النوع | الأولوية | الوقت التقديري |
|---|---|---|---|---|
| S05-001 | KPICard (value / label / change indicator / icon) | `[COMP]` | 🔴 | 2h |
| S05-002 | KPICardSkeleton | `[COMP]` | 🔴 | 30m |
| S05-003 | ProjectDetailHeader | `[COMP]` | 🔴 | 2h |
| S05-004 | ProjectHealthBadge | `[COMP]` | 🟠 | 1h |
| S05-005 | QuickActionsStrip | `[COMP]` | 🔴 | 1h |
| S05-006 | TeamAssignmentPicker (multi-user selector) | `[COMP]` | 🔴 | 2h |

## Epic: Admin Overview Dashboard

| ID | المهمة | النوع | الأولوية | الوقت التقديري |
|---|---|---|---|---|
| S05-007 | صفحة Admin Overview (/admin) | `[PAGE]` | 🔴 | 4h |
| S05-008 | Admin Overview — KPI cards row (5 KPIs) | `[PAGE]` | 🔴 | 1h |
| S05-009 | Admin Overview — Projects health table | `[PAGE]` | 🔴 | 2h |
| S05-010 | Admin Overview — Recent Activity feed | `[PAGE]` | 🔴 | 1h |
| S05-011 | Admin Overview — Quick Actions strip | `[PAGE]` | 🔴 | 1h |
| S05-012 | Admin Overview — API integration | `[API]` | 🔴 | 2h |
| S05-013 | Admin Overview — skeleton loading state | `[PAGE]` | 🔴 | 1h |

## Epic: Projects Module

| ID | المهمة | النوع | الأولوية | الوقت التقديري |
|---|---|---|---|---|
| S05-014 | صفحة Projects List (/admin/projects) | `[PAGE]` | 🔴 | 3h |
| S05-015 | Projects List — search + status filter + sort | `[PAGE]` | 🔴 | 2h |
| S05-016 | Projects List — data table (name/client/stage/progress/PM/due) | `[PAGE]` | 🔴 | 2h |
| S05-017 | Projects List — row actions (view/edit/delete) | `[PAGE]` | 🔴 | 1h |
| S05-018 | صفحة Create Project (/admin/projects/new) — Step 1: Basic Info | `[PAGE]` | 🔴 | 2h |
| S05-019 | Create Project — Step 2: Timeline | `[PAGE]` | 🔴 | 1h |
| S05-020 | Create Project — Step 3: Team Assignment | `[PAGE]` | 🔴 | 2h |
| S05-021 | Create Project — validation + submit | `[LOGIC]` | 🔴 | 1h |
| S05-022 | صفحة Project Detail (/admin/projects/[id]) — shell + header | `[PAGE]` | 🔴 | 2h |
| S05-023 | Project Detail — Overview Tab | `[PAGE]` | 🔴 | 2h |
| S05-024 | Project Detail — Milestones Tab | `[PAGE]` | 🔴 | 3h |
| S05-025 | MilestoneManager component (CRUD inline) | `[COMP]` | 🔴 | 3h |
| S05-026 | MilestoneStatusUpdater | `[COMP]` | 🔴 | 1h |
| S05-027 | MilestoneDeliverableUploader | `[COMP]` | 🔴 | 2h |
| S05-028 | Project Detail — Team Tab | `[PAGE]` | 🔴 | 2h |
| S05-029 | Project Detail — Files Tab | `[PAGE]` | 🔴 | 2h |
| S05-030 | Project Detail — Revisions Tab | `[PAGE]` | 🔴 | 2h |
| S05-031 | RevisionResponsePanel (assign + respond + status) | `[COMP]` | 🔴 | 2h |
| S05-032 | Project Detail — Activity Tab | `[PAGE]` | 🟠 | 1h |
| S05-033 | Project Detail — Settings Tab | `[PAGE]` | 🟠 | 1h |
| S05-034 | Projects API integration (CRUD) | `[API]` | 🔴 | 3h |
| S05-035 | Milestones API integration (CRUD + status) | `[API]` | 🔴 | 2h |

## Epic: Clients / CRM Module

| ID | المهمة | النوع | الأولوية | الوقت التقديري |
|---|---|---|---|---|
| S05-036 | ClientCard | `[COMP]` | 🔴 | 1h |
| S05-037 | ClientPipelineView (horizontal status pipeline) | `[COMP]` | 🔴 | 3h |
| S05-038 | صفحة Clients List (/admin/clients) | `[PAGE]` | 🔴 | 3h |
| S05-039 | Clients List — pipeline view + table view toggle | `[PAGE]` | 🔴 | 2h |
| S05-040 | Clients List — Add Client modal | `[PAGE]` | 🔴 | 1h |
| S05-041 | صفحة Client Profile (/admin/clients/[id]) | `[PAGE]` | 🔴 | 3h |
| S05-042 | Client Profile — Contact Tab | `[PAGE]` | 🔴 | 1h |
| S05-043 | Client Profile — Projects Tab | `[PAGE]` | 🔴 | 1h |
| S05-044 | Client Profile — Invoices Tab | `[PAGE]` | 🔴 | 1h |
| S05-045 | Client Profile — Activity Tab | `[PAGE]` | 🟠 | 1h |
| S05-046 | Client Profile — Notes Tab | `[PAGE]` | 🟠 | 1h |
| S05-047 | Clients API integration | `[API]` | 🔴 | 2h |

---

# SPRINT 06 TASKS — Admin Secondary Modules

## Epic: Tasks / Kanban

| ID | المهمة | النوع | الأولوية | الوقت التقديري |
|---|---|---|---|---|
| S06-001 | TaskCard (kanban card) | `[COMP]` | 🔴 | 2h |
| S06-002 | KanbanColumn | `[COMP]` | 🔴 | 1h |
| S06-003 | KanbanBoard (5 columns, drag & drop) | `[COMP]` | 🔴 | 4h |
| S06-004 | TaskDetailDrawer (side drawer) | `[COMP]` | 🔴 | 3h |
| S06-005 | CreateTaskModal | `[COMP]` | 🔴 | 2h |
| S06-006 | صفحة Tasks (/admin/tasks) — board view | `[PAGE]` | 🔴 | 3h |
| S06-007 | Tasks — list view tab | `[PAGE]` | 🟠 | 2h |
| S06-008 | Tasks — My Tasks filter | `[PAGE]` | 🟠 | 1h |
| S06-009 | Drag & drop (dnd-kit) integration | `[LOGIC]` | 🔴 | 3h |
| S06-010 | Tasks API integration | `[API]` | 🔴 | 2h |

## Epic: Team Management

| ID | المهمة | النوع | الأولوية | الوقت التقديري |
|---|---|---|---|---|
| S06-011 | MemberCard | `[COMP]` | 🔴 | 1h |
| S06-012 | InviteMemberModal | `[COMP]` | 🔴 | 2h |
| S06-013 | AssignRoleModal | `[COMP]` | 🔴 | 1h |
| S06-014 | صفحة Team (/admin/team) | `[PAGE]` | 🔴 | 2h |
| S06-015 | Team — member grid + invite button | `[PAGE]` | 🔴 | 1h |
| S06-016 | Team — member profile drawer | `[PAGE]` | 🟠 | 2h |
| S06-017 | Team API integration | `[API]` | 🔴 | 1h |

## Epic: Financial Module

| ID | المهمة | النوع | الأولوية | الوقت التقديري |
|---|---|---|---|---|
| S06-018 | FinancialOverviewCards | `[COMP]` | 🔴 | 1h |
| S06-019 | InvoiceStatusBadge | `[COMP]` | 🔴 | 30m |
| S06-020 | InvoiceForm | `[COMP]` | 🔴 | 3h |
| S06-021 | InvoiceLineItem (row in form) | `[COMP]` | 🔴 | 1h |
| S06-022 | صفحة Financial Overview (/admin/financial) | `[PAGE]` | 🔴 | 2h |
| S06-023 | صفحة Invoices List (/admin/financial/invoices) | `[PAGE]` | 🔴 | 2h |
| S06-024 | Invoices List — status filter + search | `[PAGE]` | 🔴 | 1h |
| S06-025 | صفحة Create Invoice (/admin/financial/invoices/new) | `[PAGE]` | 🔴 | 3h |
| S06-026 | Create Invoice — dynamic line items (add/remove rows) | `[PAGE]` | 🔴 | 2h |
| S06-027 | Create Invoice — total calculation (auto) | `[LOGIC]` | 🔴 | 1h |
| S06-028 | صفحة Invoice Detail (/admin/financial/invoices/[id]) | `[PAGE]` | 🔴 | 2h |
| S06-029 | Invoice Detail — Mark as Paid action | `[PAGE]` | 🔴 | 1h |
| S06-030 | Invoice Detail — view client payment proof | `[PAGE]` | 🔴 | 1h |
| S06-031 | Invoices API integration (create/send/mark paid) | `[API]` | 🔴 | 2h |

## Epic: Roles & Permissions

| ID | المهمة | النوع | الأولوية | الوقت التقديري |
|---|---|---|---|---|
| S06-032 | PermissionToggle (single permission checkbox cell) | `[COMP]` | 🔴 | 30m |
| S06-033 | PermissionRow (module row in matrix) | `[COMP]` | 🔴 | 1h |
| S06-034 | PermissionMatrix (full grid: modules × actions) | `[COMP]` | 🔴 | 4h |
| S06-035 | RoleCard | `[COMP]` | 🔴 | 1h |
| S06-036 | صفحة Roles List (/admin/roles) | `[PAGE]` | 🔴 | 2h |
| S06-037 | صفحة Create Role (/admin/roles/new) | `[PAGE]` | 🔴 | 3h |
| S06-038 | صفحة Edit Role (/admin/roles/[id]) | `[PAGE]` | 🔴 | 1h |
| S06-039 | Role — delete with reassignment flow | `[LOGIC]` | 🔴 | 2h |
| S06-040 | RBAC: hide forbidden nav items per role | `[LOGIC]` | 🔴 | 2h |
| S06-041 | RBAC: hide forbidden action buttons per role | `[LOGIC]` | 🔴 | 2h |
| S06-042 | RBAC: usePermissions hook | `[LOGIC]` | 🔴 | 1h |
| S06-043 | Roles API integration | `[API]` | 🔴 | 2h |

## Epic: Admin Notifications + Settings

| ID | المهمة | النوع | الأولوية | الوقت التقديري |
|---|---|---|---|---|
| S06-044 | صفحة Admin Notifications (/admin/notifications) | `[PAGE]` | 🔴 | 2h |
| S06-045 | Admin Notifications — type filter | `[PAGE]` | 🟠 | 1h |
| S06-046 | Realtime notification subscription — Admin | `[API]` | 🔴 | 2h |
| S06-047 | صفحة Admin Settings (/admin/settings) | `[PAGE]` | 🔴 | 2h |
| S06-048 | Settings — Workspace Tab | `[PAGE]` | 🔴 | 2h |
| S06-049 | Settings — Security Tab (audit log viewer) | `[PAGE]` | 🟠 | 2h |
| S06-050 | Settings — My Profile Tab | `[PAGE]` | 🔴 | 1h |
| S06-051 | AuditLogEntry component | `[COMP]` | 🟡 | 1h |

---

# SPRINT 07 TASKS — Onboarding + Polish

## Epic: Onboarding Flow

| ID | المهمة | النوع | الأولوية | الوقت التقديري |
|---|---|---|---|---|
| S07-001 | Onboarding layout (step indicator + progress) | `[LAYOUT]` | 🔴 | 1h |
| S07-002 | Onboarding Step 1 — Company name | `[PAGE]` | 🔴 | 1h |
| S07-003 | Onboarding Step 2 — Role selection (Client / Admin) | `[PAGE]` | 🔴 | 1h |
| S07-004 | Onboarding Step 3 — Workspace created (success) | `[PAGE]` | 🔴 | 1h |
| S07-005 | Onboarding API integration (create workspace) | `[API]` | 🔴 | 1h |
| S07-006 | Onboarding — skip prevention (access restriction) | `[LOGIC]` | 🔴 | 30m |

## Epic: Dark Mode

| ID | المهمة | النوع | الأولوية | الوقت التقديري |
|---|---|---|---|---|
| S07-007 | Dark mode theme provider setup | `[LOGIC]` | 🔴 | 1h |
| S07-008 | Dark mode toggle (in Settings + Header) | `[COMP]` | 🔴 | 1h |
| S07-009 | Dark mode audit — all client portal pages | `[TEST]` | 🔴 | 3h |
| S07-010 | Dark mode audit — all admin pages | `[TEST]` | 🔴 | 3h |
| S07-011 | Dark mode fixes (contrast issues, borders, etc.) | `[PERF]` | 🔴 | 3h |

## Epic: Responsive QA

| ID | المهمة | النوع | الأولوية | الوقت التقديري |
|---|---|---|---|---|
| S07-012 | Mobile responsive audit — Auth pages | `[TEST]` | 🔴 | 1h |
| S07-013 | Mobile responsive audit — Client Portal | `[TEST]` | 🔴 | 3h |
| S07-014 | Mobile responsive audit — Admin Dashboard | `[TEST]` | 🔴 | 3h |
| S07-015 | Tablet responsive audit — all pages | `[TEST]` | 🔴 | 2h |
| S07-016 | Responsive fixes — tables on mobile (card view) | `[COMP]` | 🔴 | 2h |
| S07-017 | Responsive fixes — kanban on mobile (single column) | `[COMP]` | 🔴 | 2h |
| S07-018 | Responsive fixes — permission matrix (accordion on mobile) | `[COMP]` | 🔴 | 2h |

## Epic: Accessibility

| ID | المهمة | النوع | الأولوية | الوقت التقديري |
|---|---|---|---|---|
| S07-019 | Keyboard navigation audit (Tab/Enter/Escape/Arrow) | `[A11Y]` | 🔴 | 3h |
| S07-020 | Focus rings visible on all interactive elements | `[A11Y]` | 🔴 | 1h |
| S07-021 | ARIA labels audit (buttons, icons, modals) | `[A11Y]` | 🔴 | 2h |
| S07-022 | Screen reader test (basic pass) | `[A11Y]` | 🟠 | 2h |
| S07-023 | Color contrast audit (WCAG AA minimum) | `[A11Y]` | 🔴 | 1h |

## Epic: Performance

| ID | المهمة | النوع | الأولوية | الوقت التقديري |
|---|---|---|---|---|
| S07-024 | React Query cache + stale time optimization | `[PERF]` | 🔴 | 2h |
| S07-025 | Image optimization (next/image for all images) | `[PERF]` | 🔴 | 1h |
| S07-026 | Route-level code splitting audit | `[PERF]` | 🟠 | 1h |
| S07-027 | Bundle size analysis (next-bundle-analyzer) | `[PERF]` | 🟠 | 1h |
| S07-028 | Lighthouse audit — all key pages (target > 90) | `[PERF]` | 🔴 | 2h |
| S07-029 | Core Web Vitals fixes (LCP/CLS/FID) | `[PERF]` | 🔴 | 3h |

## Epic: Final QA

| ID | المهمة | النوع | الأولوية | الوقت التقديري |
|---|---|---|---|---|
| S07-030 | Empty state coverage review (all 10 variants present) | `[TEST]` | 🔴 | 1h |
| S07-031 | Loading state coverage review | `[TEST]` | 🔴 | 1h |
| S07-032 | Error state coverage review | `[TEST]` | 🔴 | 1h |
| S07-033 | Auth flow end-to-end test | `[TEST]` | 🔴 | 1h |
| S07-034 | Client portal end-to-end test (login → approve milestone) | `[TEST]` | 🔴 | 2h |
| S07-035 | Admin portal end-to-end test (create project → send invoice) | `[TEST]` | 🔴 | 2h |
| S07-036 | TypeScript build — zero errors validation | `[TEST]` | 🔴 | 30m |
| S07-037 | Console errors — zero in all key pages | `[TEST]` | 🔴 | 1h |
| S07-038 | Cross-browser test (Chrome / Safari / Firefox) | `[TEST]` | 🟠 | 2h |

---

## إجمالي المهام

| السبرينت | عدد المهام | التقدير الزمني |
|---|---|---|
| Sprint 01 | 44 مهمة | ~40 ساعة |
| Sprint 02 | 34 مهمة | ~44 ساعة |
| Sprint 03 | 50 مهمة | ~60 ساعة |
| Sprint 04 | 41 مهمة | ~50 ساعة |
| Sprint 05 | 47 مهمة | ~60 ساعة |
| Sprint 06 | 51 مهمة | ~65 ساعة |
| Sprint 07 | 38 مهمة | ~55 ساعة |
| **الإجمالي** | **305 مهمة** | **~374 ساعة** |
