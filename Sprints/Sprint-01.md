# SPRINT 01 — Infrastructure + Design System Foundation
# البنية التحتية + أساس نظام التصميم

---

## معلومات السبرينت

| المعلومة | التفاصيل |
|---|---|
| رقم السبرينت | 01 |
| المرحلة | Phase A — Foundation |

 ```
 - [x] npm run build → 0 errors
 - [ ] npm run dev → يعمل على localhost:3000
 - [x] TypeScript strict → 0 errors
 - [ ] Button — كل 5 variants تظهر صح
 - [ ] Input — focus state بـ indigo ring
 - [ ] Dark mode — كل components تتغير صح
 - [ ] Design tokens — لا يوجد hardcoded colors
 - [ ] Folder structure — مكتملة كما هو مخطط
| تاريخ البدء | 2026-06-01 |
| تاريخ الانتهاء | 2026-06-14 |
| المدة | أسبوعان (10 أيام عمل) |
| التقدير الزمني | ~40 ساعة |
| عدد المهام | 44 مهمة |

---

## هدف السبرينت

> بنهاية هذا السبرينت، يكون المشروع مُعدًّا بالكامل، ونظام التصميم جاهز، وكل الـ base components مثبتة ومُعدَّلة لتتوافق مع الـ design tokens المحددة. يجب أن يستطيع أي developer بناء أي component جديد باستخدام الـ design system بدون الحاجة للاجتهاد.

---

## نتائج (Deliverables) السبرينت

- [x] مشروع Next.js 15 يعمل بشكل كامل
- [x] هيكل المجلدات مُنشأ بالكامل
- [x] Design Tokens كاملة في globals.css
- [x] جميع shadcn/ui base components مثبتة ومُعدَّلة
- [x] نظام الألوان (Light + Dark) جاهز
- [x] نظام التايبوغرافي جاهز
- [x] Icon system جاهز

---

## معيار الإتمام (Definition of Done)

السبرينت مكتمل عندما:
- [ ] `npm run build` ينجح بدون أخطاء
- [ ] `npm run type-check` بدون أخطاء TypeScript
- [ ] كل الـ base components تظهر بشكل صحيح في Light و Dark mode
- [ ] Design tokens مُطبَّقة على كل component
- [ ] لا يوجد `any` في TypeScript

---

## المهام التفصيلية

### EPIC 1: Project Setup
**الهدف:** إعداد المشروع من الصفر

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S01-001 | تهيئة Next.js 15 مع TypeScript strict + App Router | 🔴 | 2h | ✅ |
| S01-002 | تثبيت وإعداد TailwindCSS v4 | 🔴 | 1h | ✅ |
| S01-003 | تثبيت وإعداد shadcn/ui (components.json) | 🔴 | 1h | ⬜ |
| S01-004 | إنشاء هيكل المجلدات الكامل | 🔴 | 1h | ⬜ |
| S01-005 | إعداد path aliases في tsconfig.json (`@/*`) | 🔴 | 30m | ✅ |
| S01-006 | إعداد ESLint + Prettier | 🟠 | 30m | ✅ |
| S01-007 | إعداد environment variables schema (Zod validation) | 🟠 | 1h | ✅ |
| S01-008 | إعداد Inter font عبر next/font | 🟠 | 30m | ⬜ |

**تفاصيل S01-004 — هيكل المجلدات:**
```
src/
├── app/
│   ├── (auth)/
│   ├── (client)/
│   ├── (admin)/
│   ├── onboarding/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── not-found.tsx
│   └── error.tsx
├── components/
│   ├── ui/
│   ├── common/
│   ├── client/
│   └── admin/
├── features/
├── hooks/
├── services/
├── store/
├── types/
├── constants/
├── lib/
└── styles/
```

---

### EPIC 2: Design Tokens
**الهدف:** globals.css يحتوي على كل متغيرات التصميم

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S01-009 | globals.css — هيكل أساسي + Tailwind imports | 🔴 | 30m | ✅ |
| S01-010 | Color tokens — Light Mode | 🔴 | 1h | ✅ |
| S01-011 | Color tokens — Dark Mode (under .dark class) | 🔴 | 1h | ✅ |
| S01-012 | Typography scale tokens | 🔴 | 30m | ✅ |
| S01-013 | Spacing tokens (8pt grid) | 🔴 | 30m | ✅ |
| S01-014 | Border radius tokens | 🔴 | 15m | ✅ |
| S01-015 | Shadow tokens | 🔴 | 30m | ✅ |
| S01-016 | Z-index scale tokens | 🟠 | 15m | ✅ |
| S01-017 | Animation + transition tokens | 🟠 | 15m | ✅ |

**تفاصيل S01-010 — Color Tokens:**
```css
:root {
  /* Backgrounds */
  --bg-base: #fafafa;           /* zinc-50 */
  --bg-surface: #ffffff;
  --bg-muted: #f4f4f5;          /* zinc-100 */
  --bg-hover: #f1f1f3;

  /* Borders */
  --border: #e4e4e7;            /* zinc-200 */
  --border-subtle: #f1f1f3;

  /* Text */
  --text-primary: #09090b;      /* zinc-950 */
  --text-secondary: #52525b;    /* zinc-600 */
  --text-muted: #a1a1aa;        /* zinc-400 */
  --text-disabled: #d4d4d8;

  /* Accent */
  --accent: #6366f1;            /* indigo-500 */
  --accent-hover: #4f46e5;
  --accent-subtle: #eef2ff;
  --accent-foreground: #ffffff;

  /* Semantic */
  --success: #10b981;           /* emerald-500 */
  --success-subtle: #ecfdf5;
  --warning: #f59e0b;           /* amber-500 */
  --warning-subtle: #fffbeb;
  --danger: #f43f5e;            /* rose-500 */
  --danger-subtle: #fff1f2;
  --info: #6366f1;
}
```

---

### EPIC 3: Base UI Components
**الهدف:** كل shadcn/ui components مثبتة ومُعدَّلة لتتوافق مع design system

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S01-018 | Button (5 variants: primary/secondary/destructive/ghost/link) | 🔴 | 1h | ✅ |
| S01-019 | Input | 🔴 | 30m | ✅ |
| S01-020 | Textarea | 🔴 | 30m | ✅ |
| S01-021 | Select | 🔴 | 30m | ✅ |
| S01-022 | Checkbox | 🔴 | 30m | ✅ |
| S01-023 | RadioGroup | 🟠 | 30m | ✅ |
| S01-024 | Switch | 🟠 | 30m | ✅ |
| S01-025 | Label | 🔴 | 15m | ✅ |
| S01-026 | Badge (base — no semantic colors yet) | 🔴 | 30m | ✅ |
| S01-027 | Avatar + AvatarGroup | 🔴 | 30m | ✅ |
| S01-028 | Separator | 🟠 | 15m | ✅ |
| S01-029 | Skeleton (base) | 🔴 | 30m | ✅ |
| S01-030 | Progress (base) | 🔴 | 30m | ✅ |
| S01-031 | ScrollArea | 🟠 | 30m | ✅ |
| S01-032 | Tooltip | 🟠 | 30m | ✅ |
| S01-033 | Popover | 🟠 | 30m | ✅ |
| S01-034 | DropdownMenu | 🔴 | 30m | ✅ |
| S01-035 | Dialog + AlertDialog | 🔴 | 1h | ✅ |
| S01-036 | Sheet / Drawer | 🔴 | 30m | ✅ |
| S01-037 | Tabs | 🔴 | 30m | ✅ |
| S01-038 | Accordion | 🟡 | 30m | ✅ |
| S01-039 | Toast / Sonner (setup + theming) | 🔴 | 30m | ✅ |
| S01-040 | Card (base container) | 🔴 | 30m | ✅ |
| S01-041 | Command / CommandMenu (⌘K base) | 🟠 | 1h | ✅ |

**معايير Button:**
```
Primary:     bg-indigo-500 text-white hover:bg-indigo-600 h-9 px-4 rounded-md
Secondary:   bg-zinc-100 text-zinc-900 hover:bg-zinc-200
Destructive: bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100
Ghost:       transparent hover:bg-zinc-100
Link:        text-indigo-500 underline-offset-4 hover:underline
Size sm:     h-8 px-3 text-sm
Size lg:     h-11 px-6
Loading:     spinner icon + disabled state
```

---

### EPIC 4: Icon System

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S01-042 | تثبيت lucide-react | 🔴 | 15m | ✅ |
| S01-043 | Icon wrapper component | 🟠 | 30m | ✅ |
| S01-044 | توثيق Icon inventory | 🟡 | 1h | ✅ |

**Icon Size Scale:**
```
xs  = 12px  (inline text icons)
sm  = 14px  (small UI elements)
md  = 16px  (default, most usage)
lg  = 20px  (sidebar nav, headers)
xl  = 24px  (page actions, empty states)
2xl = 32px
3xl = 48px  (empty state illustrations)
```

**Entity → Icon Mapping (أهم الأيقونات):**
```
Dashboard      → LayoutDashboard
Projects       → Folder / FolderOpen
Milestones     → Flag / Milestone
Revisions      → MessageSquare / RotateCcw
Files          → FileText / Paperclip
Payments       → CreditCard / Receipt
Invoices       → FileText
Notifications  → Bell
Settings       → Settings
Team           → Users
Clients        → UserCheck
Tasks          → CheckSquare
Roles          → ShieldCheck
Analytics      → BarChart3
Approve        → CheckCircle
Reject         → XCircle
Upload         → Upload / CloudUpload
Download       → Download
Delete         → Trash2
Edit           → Pencil
Add            → Plus
Search         → Search
Filter         → Filter
Sort           → ArrowUpDown
More actions   → MoreHorizontal
Close          → X
Back           → ChevronLeft
External link  → ExternalLink
```

---

## خطة التنفيذ اليومية

| اليوم | المهام |
|---|---|
| Day 1 (Mon) | S01-001 → S01-005 (Project Setup) |
| Day 2 (Tue) | S01-006 → S01-008 + S01-009 → S01-013 (Tokens start) |
| Day 3 (Wed) | S01-014 → S01-017 (Tokens complete) + S01-018 → S01-022 (Buttons/Inputs) |
| Day 4 (Thu) | S01-023 → S01-031 (More base components) |
| Day 5 (Fri) | S01-032 → S01-041 (Complex components) |
| Day 6 (Mon) | S01-042 → S01-044 (Icons) + Review + fixes |
| Day 7 (Tue) | Buffer + dark mode verification + final build test |

---

## المخاطر والتبعيات

| المخاطرة | الاحتمال | الحل |
|---|---|---|
| TailwindCSS v4 breaking changes | متوسط | الرجوع للـ documentation الرسمي |
| shadcn/ui لا يتوافق مع Next.js 15 | منخفض | استخدام الـ canary version |
| تعارض CSS variables مع Tailwind | متوسط | اختبار مبكر + استخدام `@layer` |

---

## قائمة التحقق (Sprint Review Checklist)

```
[ ] npm run build → 0 errors
[ ] npm run dev → يعمل على localhost:3000
[ ] TypeScript strict → 0 errors
[ ] Button — كل 5 variants تظهر صح
[ ] Input — focus state بـ indigo ring
[ ] Dark mode — كل components تتغير صح
[ ] Design tokens — لا يوجد hardcoded colors
[ ] Folder structure — مكتملة كما هو مخطط
```
