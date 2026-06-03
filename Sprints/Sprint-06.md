# SPRINT 06 — Admin Secondary Modules
# الـ Admin Dashboard — الوحدات الثانوية

---

## معلومات السبرينت

| المعلومة | التفاصيل |
|---|---|
| رقم السبرينت | 06 |
| المرحلة | Phase C — Admin Dashboard |
| تاريخ البدء | 2026-08-10 |
| تاريخ الانتهاء | 2026-08-23 |
| المدة | أسبوعان (10 أيام عمل) |
| التقدير الزمني | ~71 ساعة |
| عدد المهام | 54 مهمة |
| التبعيات | Sprint 01-05 مكتملين ✅ |

---

## هدف السبرينت

> بنهاية هذا السبرينت، يكون الـ Admin Dashboard مكتملًا بكل وحداته الثانوية: Tasks Kanban، Team Management، Financial + Invoice Management، و Roles & Permissions (Permission Matrix). هذا يكمل النظام الداخلي للوكالة بالكامل.

---

## نتائج (Deliverables) السبرينت

- [x] Tasks Kanban Board مع Drag & Drop
- [x] Team Management مع Invite system
- [x] Financial Overview + Invoice Management (CRUD)
- [x] Roles & Permissions + Permission Matrix builder
- [x] Admin Notifications page
- [x] Admin Settings (Workspace + Security + Profile)
- [x] RBAC enforcement (hide items by role)

---

## معيار الإتمام (Definition of Done)

- [ ] Kanban board drag & drop يعمل
- [ ] Invoice create → send → client receives notification
- [ ] Permission Matrix saves correctly
- [ ] RBAC: forbidden nav items hidden per role
- [ ] RBAC: forbidden buttons hidden per role
- [ ] Team invite flow يعمل
- [ ] كل الـ pages على mobile تعمل

---

## المهام التفصيلية

### EPIC 1: Tasks / Kanban Board

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S06-001 | TaskCard | 🔴 | 2h | ⬜ |
| S06-002 | KanbanColumn | 🔴 | 1h | ⬜ |
| S06-003 | KanbanBoard (5 columns, dnd-kit) | 🔴 | 4h | ⬜ |
| S06-004 | TaskDetailDrawer | 🔴 | 3h | ⬜ |
| S06-005 | CreateTaskModal | 🔴 | 2h | ⬜ |
| S06-006 | صفحة Tasks — Board View | 🔴 | 3h | ⬜ |
| S06-007 | Tasks — List View tab | 🟠 | 2h | ⬜ |
| S06-008 | Tasks — My Tasks filter | 🟠 | 1h | ⬜ |
| S06-009 | Drag & Drop (dnd-kit) integration | 🔴 | 3h | ⬜ |
| S06-010 | Tasks API integration | 🔴 | 2h | ⬜ |

---

**تفاصيل S06-001 — TaskCard:**

```
Kanban card layout (280px column):

  ┌────────────────────────────────────────┐
  │ [Bug] Fix login on Safari               │
  │ ─────────────────────────────────────  │
  │ 📂 E-Commerce App  >  Phase 2          │
  │ ─────────────────────────────────────  │
  │ [High]  Due Feb 10   [Ahmed's avatar]  │
  └────────────────────────────────────────┘

Priority indicator: colored left border
  High:   rose border
  Medium: amber border
  Low:    zinc border

Hover: shadow-md + subtle lift (translateY -1px)
Click: opens TaskDetailDrawer
Drag handle: visible on hover (grip dots icon — left edge)
```

**تفاصيل S06-003 — KanbanBoard:**

```
Columns (left to right):
  [Todo] [In Progress] [Review] [Done] [Blocked]

Column header:
  Column name (600 weight)  [count badge]  [+ add task]

Drag behavior (dnd-kit):
  - Drag card within same column → reorder
  - Drag card to different column → change status
  - Drag over column header → auto-scroll
  - While dragging: card becomes semi-transparent, drop zone highlighted

Column footer:
  [+ Add Task] button (ghost, full width)

Loading: skeleton cards per column
Empty column: EmptyState small variant "No tasks here"

Scrolling:
  Desktop: horizontal scroll for all columns
  Mobile: show ONE column at a time, switch via chip tabs
```

**تفاصيل S06-004 — TaskDetailDrawer:**

```
Opens as right-side drawer (Sheet, 480px wide)

Content:
  [Type badge]  Title (editable inline)  [Status dropdown]

  Section: Details
    Linked Project:  [Project name + link]
    Linked Milestone: [Milestone + link]
    Assignee:        [TeamAssignmentPicker — single]
    Priority:        [select: High/Medium/Low]
    Due Date:        [DatePicker]

  Section: Description
    [Textarea — editable, auto-save on blur]

  Section: Attachments
    [File list + FileUploadZone]

  Section: Comments
    [Comment list]
    [Comment input + Submit]

  Footer:
    [Archive Task] (ghost/danger) | [Close]

Status dropdown options:
  Todo → In Progress → Review → Done → Blocked
  (changing status moves card on board)
```

**تفاصيل S06-005 — CreateTaskModal:**

```
Fields:
  Task Type:       [Bug] [Feature] [Design] [Review] [Other]
  Title*:          text input
  Description:     textarea
  Project:         select (required)
  Milestone:       select (filtered by project)
  Assignee:        TeamAssignmentPicker
  Priority:        High / Medium / Low
  Due Date:        DatePicker

[Cancel] [Create Task]

After create:
  Card appears in "Todo" column
  Assignee notified
  Activity logged
```

---

### EPIC 2: Team Management

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S06-011 | MemberCard | 🔴 | 1h | ⬜ |
| S06-012 | InviteMemberModal | 🔴 | 2h | ⬜ |
| S06-013 | AssignRoleModal | 🔴 | 1h | ⬜ |
| S06-014 | صفحة Team (/admin/team) | 🔴 | 2h | ⬜ |
| S06-015 | Team — member grid + invite | 🔴 | 1h | ⬜ |
| S06-016 | Team — member profile drawer | 🟠 | 2h | ⬜ |
| S06-017 | Team API integration | 🔴 | 1h | ⬜ |

---

**تفاصيل S06-014 — Team Page:**

```
Header: "Team Members"  [Invite Member button — primary]

Member Grid (3 cols on desktop, 2 on tablet, 1 on mobile):
  ┌────────────────────────────────┐
  │       [Avatar — 56px]          │
  │       Ahmed Hassan             │
  │       Project Manager          │
  │   2 active projects            │
  │   [···] actions                │
  └────────────────────────────────┘

Member card hover: subtle border highlight
Member card actions (···):
  Edit Profile
  Change Role
  Remove from Workspace

Member status indicator:
  Active: green dot
  Pending invite: amber dot + "Invite pending" label
```

**تفاصيل S06-012 — InviteMemberModal:**

```
Title: "Invite Team Member"

Fields:
  Email address*
  Full Name
  Role:  [select from existing custom roles]
  Message: (optional, sent in invite email)

[Cancel] [Send Invitation]

After send:
  Invite email sent to address
  Member appears in team list as "Pending"
  Invite expires in 48 hours (shown to admin)
```

---

### EPIC 3: Financial Module

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S06-018 | FinancialOverviewCards | 🔴 | 1h | ⬜ |
| S06-019 | InvoiceStatusBadge | 🔴 | 30m | ⬜ |
| S06-020 | InvoiceForm | 🔴 | 3h | ⬜ |
| S06-021 | InvoiceLineItem | 🔴 | 1h | ⬜ |
| S06-022 | صفحة Financial Overview (/admin/financial) | 🔴 | 2h | ⬜ |
| S06-023 | صفحة Invoices List | 🔴 | 2h | ⬜ |
| S06-024 | Invoices — filter + search | 🔴 | 1h | ⬜ |
| S06-025 | صفحة Create Invoice | 🔴 | 3h | ⬜ |
| S06-026 | Create Invoice — dynamic line items | 🔴 | 2h | ⬜ |
| S06-027 | Create Invoice — auto total calculation | 🔴 | 1h | ⬜ |
| S06-028 | صفحة Invoice Detail (Admin) | 🔴 | 2h | ⬜ |
| S06-029 | Invoice Detail — Mark as Paid action | 🔴 | 1h | ⬜ |
| S06-030 | Invoice Detail — client payment proof view | 🔴 | 1h | ⬜ |
| S06-031 | Invoices API integration | 🔴 | 2h | ⬜ |

---

**تفاصيل S06-022 — Financial Overview Page:**

```
Summary Cards Row:
  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
  │ Total Revenue    │  │ Collected        │  │ Outstanding      │
  │ $48,200          │  │ $36,800          │  │ $11,400          │
  │ This month       │  │ This month       │  │ Across 4 invoices│
  └──────────────────┘  └──────────────────┘  └──────────────────┘

Overdue Alert (if any):
  ⚠️ 2 invoices overdue — Total $5,200
  [View Overdue →]

Quick Links:
  [+ Create Invoice] [View All Invoices]

Recent Invoices Table:
  Invoice # | Client | Project | Amount | Due Date | Status | Actions
```

**تفاصيل S06-025/026 — Create Invoice Form:**

```
URL: /admin/financial/invoices/new

Section 1: Invoice Details
  Client*:          [select]
  Project*:         [select — filtered by client]
  Invoice Number:   [auto-generated, editable]
  Issue Date*:      [DatePicker — today default]
  Due Date*:        [DatePicker]

Section 2: Line Items
  [Dynamic rows — can add/remove]

  Each row:
  Description*          |  Qty  |  Unit Price  |  Total (auto)
  ─────────────────────────────────────────────────────────────
  Frontend Development  |   1   |    $2,000    |    $2,000
  UI Testing & QA       |   1   |      $400    |      $400
  [+ Add Item]

Section 3: Summary (right-aligned)
  Subtotal:     $2,400
  Discount:     [optional % or fixed]
  VAT (%):      [input — 0 default]
  TOTAL:        $2,400  (bold, large, emerald)

Section 4: Notes
  [Textarea — sent to client with invoice]

Footer Actions:
  [Save as Draft]    [Preview PDF]    [Send to Client →]

"Send to Client":
  Invoice status → "Sent"
  Client receives email notification
  Client portal shows new invoice with "Pending" status
```

**تفاصيل S06-028/029 — Invoice Detail (Admin):**

```
Header:
  Invoice #007                              [Edit] [···]
  TechCorp — E-Commerce App
  Issued: Feb 10 | Due: Mar 1 | Status: [Pending]

Client Info + Line Items (same as client view but with edit capability)

Payment Proof Section (appears when client uploads):
  ┌─────────────────────────────────────────────┐
  │ 💳 Payment Proof Submitted                  │
  │ receipt.pdf — 1.2MB — Feb 28, 2026         │
  │ [View Document]                             │
  │                                             │
  │ [Mark as Paid ✓]   [Reject — Request Retry]│
  └─────────────────────────────────────────────┘

"Mark as Paid":
  MarkPaidModal → confirms → API → status → "Paid"
  Client receives "Payment Confirmed" notification
  Receipt can be auto-generated
```

---

### EPIC 4: Roles & Permissions

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S06-032 | PermissionToggle | 🔴 | 30m | ⬜ |
| S06-033 | PermissionRow | 🔴 | 1h | ⬜ |
| S06-034 | PermissionMatrix | 🔴 | 4h | ⬜ |
| S06-035 | RoleCard | 🔴 | 1h | ⬜ |
| S06-036 | صفحة Roles List | 🔴 | 2h | ⬜ |
| S06-037 | صفحة Create Role | 🔴 | 3h | ⬜ |
| S06-038 | صفحة Edit Role | 🔴 | 1h | ⬜ |
| S06-039 | Role delete with reassignment flow | 🔴 | 2h | ⬜ |
| S06-040 | RBAC: hide forbidden nav items | 🔴 | 2h | ⬜ |
| S06-041 | RBAC: hide forbidden action buttons | 🔴 | 2h | ⬜ |
| S06-042 | usePermissions hook | 🔴 | 1h | ⬜ |
| S06-043 | Roles API integration | 🔴 | 2h | ⬜ |

---

**تفاصيل S06-034 — PermissionMatrix:**

```
Table: Module rows × Action columns

Actions (columns):
  View | Create | Edit | Delete | Approve | Export | Manage

Modules (rows):
  Dashboard
  Projects
  Milestones
  Revisions
  Files
  Contracts
  Invoices
  Financial
  Team
  Analytics
  Clients/CRM
  Roles
  Settings

Each cell: PermissionToggle (Switch component)
  ON:  indigo switch, ✓ checkmark
  OFF: gray switch, — dash

Row header (module name):
  Bold
  "Select All" mini-link per row

Column header (action):
  Bold, centered
  "Select All" per column (top)

Special indicators:
  Locked cells: 🔒 icon (system-enforced, cannot change)
    Example: Admin → all permissions always ON + locked
    Example: Client → View only on certain modules, rest locked OFF

Footer:
  [Cancel] [Save Role]

Mobile behavior: Accordion per module, each module expands to show action toggles
```

**تفاصيل S06-040-042 — RBAC Enforcement:**

```typescript
// hooks/usePermissions.ts
interface Permissions {
  can: (action: string, resource: string) => boolean
  cannot: (action: string, resource: string) => boolean
  role: UserRole
}

export function usePermissions(): Permissions {
  const { role, permissions } = useAuthStore()

  return {
    can: (action, resource) => permissions[resource]?.[action] === true,
    cannot: (action, resource) => !permissions[resource]?.[action],
    role,
  }
}

// Usage in components:
const { can } = usePermissions()

// Hide entire nav section:
{can('view', 'financial') && <SidebarNavItem href="/admin/financial" />}

// Hide action button:
{can('create', 'projects') && <Button>New Project</Button>}

// Disable row action:
<DropdownMenuItem disabled={!can('delete', 'projects')}>
  Delete
</DropdownMenuItem>
```

---

### EPIC 5: Admin Notifications + Settings

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S06-044 | صفحة Admin Notifications | 🔴 | 2h | ⬜ |
| S06-045 | Notifications — type filter | 🟠 | 1h | ⬜ |
| S06-046 | Realtime subscription — Admin | 🔴 | 2h | ⬜ |
| S06-047 | صفحة Admin Settings | 🔴 | 2h | ⬜ |
| S06-048 | Settings — Workspace Tab | 🔴 | 2h | ⬜ |
| S06-049 | Settings — Security Tab (audit log) | 🟠 | 2h | ⬜ |
| S06-050 | Settings — My Profile Tab | 🔴 | 1h | ⬜ |
| S06-051 | AuditLogEntry component | 🟡 | 1h | ⬜ |

---

**تفاصيل S06-048 — Workspace Settings Tab:**

```
Agency Information:
  Agency Name*:        [text input]
  Agency Logo:         [image uploader — shows preview]
  Website URL:         [text input]
  Industry:            [select]

Preferences:
  Timezone:            [select — searchable]
  Default Language:    [select: English / Arabic]
  Date Format:         [select: DD/MM/YYYY / MM/DD/YYYY]
  Currency:            [select: USD / EGP / EUR / SAR]

[Save Changes button]
```

**تفاصيل S06-049 — Security + Audit Log:**

```
Security Settings:
  Session Timeout:     [select: 1h / 4h / 8h / 24h / Never]
  [Save]

Audit Log Table:
  Action | User | IP | Date
  ─────────────────────────────────────────────────
  Role "Developer" created  | Admin    | 192.x | Jan 25
  User Ahmed invited        | Admin    | 192.x | Jan 24
  Invoice #007 sent         | PM       | 192.x | Feb 10
  Project deleted           | Admin    | 192.x | Jan 20

Filter: by action type, by user, by date range
Export: [Export CSV]
```

---

### EPIC 6: i18n — Admin Secondary Pages Copy

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S06-052 | `messages/en/admin/tasks.json` + `messages/en/admin/team.json` | 🔴 | 1.5h | ⬜ |
| S06-053 | `messages/en/admin/financial.json` + `messages/en/admin/roles.json` + `messages/en/admin/settings.json` | 🔴 | 1.5h | ⬜ |
| S06-054 | `messages/ar/admin/` — Arabic translation لكل ملفات EPIC 6 | 🔴 | 2h | ⬜ |
| S06-055 | تطبيق `useTranslations()` على Admin Secondary modules | 🔴 | 2h | ⬜ |

---

**نقاط مهمة لـ i18n في هذا السبرينت:**

```
Kanban Board:
  - Column names: Todo / In Progress / Review / Done / Blocked
  - Task types: Bug / Feature / Design / Review / Other
  - Priority labels: High / Medium / Low

Permission Matrix:
  - Module names (rows): Dashboard, Projects, Milestones, Revisions...
  - Action names (columns): View, Create, Edit, Delete, Approve, Export, Manage
  - يجب ترجمة المحتوى مع الحفاظ على المصطلحات التقنية الواضحة

Workspace Settings:
  - Default Language dropdown يغير فعليًا الـ NEXT_LOCALE cookie
  - عند الحفظ → locale يتحدث فورًا + html lang/dir يتغيران

Invoice Form:
  - Currency labels مرتبطة بـ Workspace Currency setting
  - Line item labels مترجمة بالكامل
```

---

## خطة التنفيذ اليومية

| اليوم | المهام |
|---|---|
| Day 1 | S06-001/002 TaskCard + KanbanColumn |
| Day 2 | S06-003/009 KanbanBoard + dnd-kit |
| Day 3 | S06-004/005 TaskDetailDrawer + CreateTaskModal |
| Day 4 | S06-006-010 Tasks pages + API |
| Day 5 | S06-011-017 Team Management complete |
| Day 6 | S06-018-024 Financial Overview + Invoices List |
| Day 7 | S06-025-027 Create Invoice + line items |
| Day 8 | S06-028-031 Invoice Detail + API |
| Day 9 | S06-032-039 Roles + PermissionMatrix + delete flow + S06-052/053 messages en |
| Day 10 | S06-040-051 RBAC enforcement + Notifications + Settings + S06-054/055 messages ar + translations |

---

## قائمة التحقق (Sprint Review Checklist)

```
Tasks:
[ ] Kanban board — 5 columns visible
[ ] Drag card → column changes → status updates
[ ] CreateTaskModal — all fields + validation
[ ] TaskDetailDrawer — opens + edits save
[ ] Mobile — single column view with chip tabs

Team:
[ ] Member grid shows all members
[ ] InviteMemberModal — email sent
[ ] AssignRoleModal — role changes
[ ] Pending invite badge visible

Financial:
[ ] Financial Overview — correct totals
[ ] Invoices List — filter works
[ ] Create Invoice — line items dynamic (add/remove)
[ ] Create Invoice — total auto-calculates
[ ] Send Invoice → client notification → client sees invoice
[ ] Mark as Paid → status updates on both sides

Roles:
[ ] Roles list shows system + custom roles
[ ] System roles (Admin, Client) are locked
[ ] Create Role → PermissionMatrix → save
[ ] Permission Matrix — all toggles work
[ ] Delete role with users → reassignment prompt
[ ] RBAC — PM doesn't see Financial in sidebar
[ ] RBAC — Developer doesn't see Create Project button
[ ] RBAC — Client route guard blocks internal users

Settings:
[ ] Workspace logo upload works
[ ] Timezone + currency save
[ ] Audit log shows recent actions
[ ] Profile update saves

i18n:
[ ] admin/tasks.json + admin/team.json — en + ar مكتملين
[ ] admin/financial.json + admin/roles.json + admin/settings.json — en + ar مكتملين
[ ] Kanban column names + task types مترجمة
[ ] Permission Matrix modules + actions مترجمة
[ ] Invoice form labels + line items مترجمة
[ ] Workspace Settings → Default Language فعّال ويغير locale حقيقي
[ ] RTL layout صح على Admin Secondary pages
```
