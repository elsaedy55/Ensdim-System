# SPRINT 05 — Admin Dashboard Core
# الـ Admin Dashboard — الوحدات الأساسية

---

## معلومات السبرينت

| المعلومة | التفاصيل |
|---|---|
| رقم السبرينت | 05 |
| المرحلة | Phase C — Admin Dashboard |
| تاريخ البدء | 2026-07-27 |
| تاريخ الانتهاء | 2026-08-09 |
| المدة | أسبوعان (10 أيام عمل) |
| التقدير الزمني | ~66 ساعة |
| عدد المهام | 50 مهمة |
| التبعيات | Sprint 01-04 مكتملين ✅ |

---

## هدف السبرينت

> بنهاية هذا السبرينت، يكون الـ Admin Dashboard يعمل بالكامل في أهم وحداته. المسؤول (Admin/PM) يستطيع رؤية overview شامل، إنشاء وإدارة المشاريع بكل تفاصيلها، وإدارة العملاء. هذا هو قلب نظام تشغيل الوكالة.

---

## نتائج (Deliverables) السبرينت

- [x] Admin Overview Dashboard مع KPIs حقيقية
- [x] Projects List مع بحث وفلترة
- [x] Create Project (3-step wizard)
- [x] Project Detail (7 tabs: Overview/Milestones/Team/Files/Revisions/Activity/Settings)
- [x] MilestoneManager (CRUD كامل)
- [x] Clients List (Pipeline + Table views)
- [x] Client Profile (5 tabs)

---

## معيار الإتمام (Definition of Done)

- [ ] Admin يرى KPIs حقيقية للـ overview
- [ ] PM يستطيع إنشاء مشروع وربطه بعميل
- [ ] PM يستطيع إنشاء وإدارة milestones
- [ ] PM يستطيع upload deliverables لكل milestone
- [ ] PM يستطيع mark milestone كـ "Ready for Client Review"
- [ ] Client list shows pipeline stages
- [ ] كل Project Detail tabs تعمل
- [ ] RBAC: PM لا يرى مشاريع خارج صلاحياته

---

## المهام التفصيلية

### EPIC 1: Admin Shared Components

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S05-001 | KPICard | 🔴 | 2h | ⬜ |
| S05-002 | KPICardSkeleton | 🔴 | 30m | ⬜ |
| S05-003 | ProjectDetailHeader | 🔴 | 2h | ⬜ |
| S05-004 | ProjectHealthBadge | 🟠 | 1h | ⬜ |
| S05-005 | QuickActionsStrip | 🔴 | 1h | ⬜ |
| S05-006 | TeamAssignmentPicker | 🔴 | 2h | ⬜ |

---

**تفاصيل S05-001 — KPICard:**

```typescript
interface KPICardProps {
  label: string               // "Active Projects"
  value: string | number      // "12"
  icon: LucideIcon            // Folder
  change?: {
    value: number             // +3 or -1
    period: string            // "vs last month"
    direction: "up" | "down" | "neutral"
  }
  variant?: "default" | "warning" | "danger" | "success"
  isLoading?: boolean
}

// Layout:
// ┌────────────────────────────┐
// │ [Icon]        Active       │
// │                Projects    │
// │ 12                         │
// │ ↑ +3 vs last month        │
// └────────────────────────────┘

// Variants:
// warning: amber left border (Delayed Projects)
// danger:  rose left border (Overdue Invoices)
// success: emerald (Completed this month)
// default: zinc
```

**تفاصيل S05-006 — TeamAssignmentPicker:**

```
A multi-user selector dropdown for assigning team members

Trigger: "Assign team members" button
Opens: Popover with searchable list

List item:
  [Avatar] [Name]    [Role]    [✓ checkbox if selected]

Selected state: shows selected members as AvatarGroup
Remove: click × on avatar chip

Usage:
  - Step 3 of Create Project
  - Project Detail → Team tab → Add member
```

---

### EPIC 2: Admin Overview Dashboard

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S05-007 | صفحة Admin Overview (/admin) | 🔴 | 4h | ⬜ |
| S05-008 | KPI cards row (5 cards) | 🔴 | 1h | ⬜ |
| S05-009 | Projects health table | 🔴 | 2h | ⬜ |
| S05-010 | Recent Activity feed | 🔴 | 1h | ⬜ |
| S05-011 | Quick Actions strip | 🔴 | 1h | ⬜ |
| S05-012 | Overview API integration | 🔴 | 2h | ⬜ |
| S05-013 | Overview loading skeleton | 🔴 | 1h | ⬜ |

---

**تفاصيل S05-007 — Admin Overview Layout:**

```
Desktop Layout:

Row 1 — KPI Cards (5 cards, equal width):
  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
  │ 12       │ │ 8        │ │ $48,200  │ │ 3        │ │ 5        │
  │ Active   │ │ Active   │ │ Monthly  │ │ Delayed  │ │ New      │
  │ Projects │ │ Clients  │ │ Revenue  │ │ Projects │ │ Leads    │
  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘
  (default)    (default)    (success)     (warning)    (indigo)

Row 2 — Quick Actions Strip:
  [+ New Project] [+ Add Client] [+ Create Invoice]

Row 3 — 2-column split:
  Left (65%):  Projects Health Table
  Right (35%): Recent Activity Feed

Projects Health Table columns:
  Project Name | Client | Stage | Progress | Health | Due Date | Actions

Stage badges: Planning/UI-UX/Development/Review/Testing/Delivery/Maintenance
Health: ✅ On Track | ⚠️ At Risk | 🔴 Delayed
Actions: [...] dropdown → View / Edit / Archive

Recent Activity items:
  • "Client approved Phase 2 milestone"         2h ago
  • "Ahmed uploaded 3 design files"             5h ago
  • "Invoice #007 sent to TechCorp"             Yesterday
  • "New revision request from Mohamed"         Yesterday
  • "Project 'E-Commerce App' created"          Jan 25
```

---

### EPIC 3: Projects Module

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S05-014 | صفحة Projects List | 🔴 | 3h | ⬜ |
| S05-015 | Projects — search + filter + sort | 🔴 | 2h | ⬜ |
| S05-016 | Projects — data table | 🔴 | 2h | ⬜ |
| S05-017 | Projects — row actions | 🔴 | 1h | ⬜ |
| S05-018 | Create Project — Step 1: Basic Info | 🔴 | 2h | ⬜ |
| S05-019 | Create Project — Step 2: Timeline | 🔴 | 1h | ⬜ |
| S05-020 | Create Project — Step 3: Team Assignment | 🔴 | 2h | ⬜ |
| S05-021 | Create Project — validation + submit | 🔴 | 1h | ⬜ |
| S05-022 | Project Detail — shell + tabs + header | 🔴 | 2h | ⬜ |
| S05-023 | Project Detail — Overview Tab | 🔴 | 2h | ⬜ |
| S05-024 | Project Detail — Milestones Tab | 🔴 | 3h | ⬜ |
| S05-025 | MilestoneManager | 🔴 | 3h | ⬜ |
| S05-026 | MilestoneStatusUpdater | 🔴 | 1h | ⬜ |
| S05-027 | MilestoneDeliverableUploader | 🔴 | 2h | ⬜ |
| S05-028 | Project Detail — Team Tab | 🔴 | 2h | ⬜ |
| S05-029 | Project Detail — Files Tab | 🔴 | 2h | ⬜ |
| S05-030 | Project Detail — Revisions Tab | 🔴 | 2h | ⬜ |
| S05-031 | RevisionResponsePanel | 🔴 | 2h | ⬜ |
| S05-032 | Project Detail — Activity Tab | 🟠 | 1h | ⬜ |
| S05-033 | Project Detail — Settings Tab | 🟠 | 1h | ⬜ |
| S05-034 | Projects API integration (CRUD) | 🔴 | 3h | ⬜ |
| S05-035 | Milestones API integration | 🔴 | 2h | ⬜ |

---

**تفاصيل S05-018-021 — Create Project Wizard:**

```
Step indicator: [1. Info] — [2. Timeline] — [3. Team]

Step 1: Basic Information
  Project Name*        (text input)
  Client*              (select — from clients list)
  Project Type         (select: Website / Mobile App / CRM / Custom)
  Description          (textarea, optional)
  [Next Step →]

Step 2: Timeline
  Start Date*          (DatePicker)
  Target Delivery*     (DatePicker, must be after start)
  Project Stages:      (optional — select which stages apply)
    [x] Planning  [x] UI/UX  [x] Development  [x] Testing  [ ] Review  [x] Delivery
  [← Back] [Next Step →]

Step 3: Team Assignment
  Project Manager*     (single select from team)
  Developers           (multi-select — TeamAssignmentPicker)
  Designers            (multi-select — TeamAssignmentPicker)
  [← Back] [Create Project ✓]

After submit:
  Navigate to /admin/projects/[new-id]
  Show success toast: "Project created successfully"
  System auto-creates: default milestone template (optional)
  Notifications sent to assigned team members
```

**تفاصيل S05-025 — MilestoneManager:**

```
Used in: Project Detail → Milestones Tab

Layout:
  [+ Add Milestone button]
  [Milestone list — vertically stacked cards]

Each Milestone Card (admin view):
  ┌─────────────────────────────────────────────────────┐
  │ Phase 2: UI/UX Design              [In Progress ▼] │
  │ Due: Feb 5, 2026                   [Progress: 75%] │
  │ ─────────────────────────────────────────────────   │
  │ [Edit] [Upload Files] [Mark as Ready] [Delete]      │
  └─────────────────────────────────────────────────────┘

Inline Edit (click Edit → inline form):
  - Name field
  - Description textarea
  - Due date picker
  - Save | Cancel

Status dropdown options:
  Pending → In Progress → Review → Approved → Completed

"Mark as Ready for Client Review":
  Changes status to "Review"
  Sends notification to client
  Shows in client portal as awaiting approval

"Upload Files" → FileUploadModal
  Files linked to this milestone
  Visible to client in their milestone detail view

Delete milestone:
  ConfirmDeleteDialog
  Warning if milestone has linked files or revisions
```

**تفاصيل S05-031 — RevisionResponsePanel:**

```
Used in: Project Detail → Revisions Tab → Revision item expanded

Revision header:
  [Type badge] Title                     [Status badge]
  Submitted by: Mohamed | Feb 5, 2026

Description:
  "The login button doesn't respond on iOS Safari..."

Attachments: [image1.png] [screenshot.jpg]

Team Response section:
  Assignee: [TeamAssignmentPicker — single user]
  [Status Update dropdown]: Open → In Review → In Progress → Done
  [Internal Notes textarea]
  [Save Response button]

Client-visible response:
  "Our team is working on this. Expected fix: Feb 10"
  [Send to Client button]

Status change history:
  Feb 5: Opened by client
  Feb 5: Assigned to Ahmed
  Feb 6: Status → In Progress
```

---

### EPIC 4: Clients / CRM Module

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S05-036 | ClientCard | 🔴 | 1h | ⬜ |
| S05-037 | ClientPipelineView | 🔴 | 3h | ⬜ |
| S05-038 | صفحة Clients List | 🔴 | 3h | ⬜ |
| S05-039 | Clients — Pipeline + Table view toggle | 🔴 | 2h | ⬜ |
| S05-040 | Add Client modal | 🔴 | 1h | ⬜ |
| S05-041 | صفحة Client Profile (/admin/clients/[id]) | 🔴 | 3h | ⬜ |
| S05-042 | Client Profile — Contact Tab | 🔴 | 1h | ⬜ |
| S05-043 | Client Profile — Projects Tab | 🔴 | 1h | ⬜ |
| S05-044 | Client Profile — Invoices Tab | 🔴 | 1h | ⬜ |
| S05-045 | Client Profile — Activity Tab | 🟠 | 1h | ⬜ |
| S05-046 | Client Profile — Notes Tab | 🟠 | 1h | ⬜ |
| S05-047 | Clients API integration | 🔴 | 2h | ⬜ |

---

**تفاصيل S05-037 — ClientPipelineView:**

```
Horizontal pipeline (like a CRM board):

[Lead] → [Interested] → [Proposal Sent] → [Negotiation] → [Active] → [Completed] → [Lost]

Each column:
  Column header: Stage name + count
  Client cards stacked vertically in column

ClientCard (in pipeline):
  Company name
  Contact name
  Last activity date
  Project count (if active)

Drag & drop: drag card between columns → updates status

Table view (toggle):
  Standard DataTable with all columns visible
  Status shown as badge
  Quick action: change status dropdown per row
```

**تفاصيل S05-040 — Add Client Modal:**

```
Fields:
  Company Name*
  Contact Name*
  Email*
  Phone
  Initial Status: (Lead / Interested / Proposal Sent)
  Notes (optional)

[Cancel] [Add Client]

After add:
  Client appears in pipeline
  Navigate to client profile option
```

---

### EPIC 5: i18n — Admin Core Pages Copy

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S05-048 | `messages/en/admin/overview.json` + `messages/en/admin/projects.json` | 🔴 | 1.5h | ⬜ |
| S05-049 | `messages/en/admin/clients.json` | 🔴 | 1h | ⬜ |
| S05-050 | `messages/ar/admin/` — Arabic translation لـ overview + projects + clients | 🔴 | 2h | ⬜ |
| S05-051 | تطبيق `useTranslations()` على Admin Overview + Projects + Clients pages | 🔴 | 2h | ⬜ |

---

**مثال على هيكل admin/projects.json:**

```json
{
  "list": {
    "title": "Projects",
    "searchPlaceholder": "Search projects...",
    "newProject": "+ New Project",
    "filterAll": "All",
    "filterActive": "Active",
    "filterDelayed": "Delayed",
    "filterCompleted": "Completed"
  },
  "create": {
    "title": "Create New Project",
    "step1": "Basic Information",
    "step2": "Timeline",
    "step3": "Team Assignment",
    "projectName": "Project Name",
    "client": "Client",
    "projectType": "Project Type",
    "description": "Description",
    "startDate": "Start Date",
    "targetDelivery": "Target Delivery",
    "projectManager": "Project Manager",
    "developers": "Developers",
    "designers": "Designers",
    "next": "Next Step →",
    "back": "← Back",
    "submit": "Create Project ✓",
    "success": "Project created successfully"
  },
  "detail": {
    "tabs": {
      "overview": "Overview",
      "milestones": "Milestones",
      "team": "Team",
      "files": "Files",
      "revisions": "Revisions",
      "activity": "Activity",
      "settings": "Settings"
    }
  }
}
```

---

## خطة التنفيذ اليومية

| اليوم | المهام |
|---|---|
| Day 1 | S05-001-006 Admin shared components |
| Day 2 | S05-007-011 Overview page layout |
| Day 3 | S05-012/013 Overview API + skeleton |
| Day 4 | S05-014-017 Projects List |
| Day 5 | S05-018-021 Create Project wizard |
| Day 6 | S05-022-024 Project Detail shell + Overview + Milestones tab |
| Day 7 | S05-025-027 MilestoneManager complete |
| Day 8 | S05-028-031 Team/Files/Revisions tabs + RevisionResponsePanel |
| Day 9 | S05-032-035 Activity/Settings tabs + API integration + S05-048/049 messages en |
| Day 10 | S05-036-047 Clients module complete + S05-050/051 messages ar + apply translations |

---

## قائمة التحقق (Sprint Review Checklist)

```
Admin Overview:
[ ] 5 KPI cards show real data
[ ] Projects health table sortable
[ ] Recent activity feed live
[ ] Quick actions navigate correctly

Projects:
[ ] Projects list — search works
[ ] Projects list — status filter works
[ ] Create Project — 3 steps + validation
[ ] Create Project — team assignment
[ ] Project Detail — all 7 tabs switch correctly
[ ] MilestoneManager — CRUD works
[ ] Milestone status update → client notified
[ ] File upload to milestone → visible in client portal
[ ] RevisionResponsePanel — assign + status update + send to client

Clients:
[ ] Pipeline view — stages visible
[ ] Drag card → status updates
[ ] Table view toggle
[ ] Add Client modal
[ ] Client Profile — 5 tabs work
[ ] Client projects tab — links to project detail

RBAC:
[ ] PM cannot see projects outside their assignment
[ ] Developer cannot create projects

i18n:
[ ] admin/overview.json + admin/projects.json + admin/clients.json — en + ar مكتملين
[ ] Admin Overview page — النصوص صح بالعربي والإنجليزي
[ ] Create Project wizard — كل steps مترجمة
[ ] Admin Sidebar labels مترجمة حسب locale
[ ] RTL layout صح على Admin pages مع العربية
```
