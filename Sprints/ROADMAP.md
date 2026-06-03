# ENSDIM — PROJECT ROADMAP
# خارطة طريق المشروع الكاملة

---

## نظرة عامة

| المعلومة | التفاصيل |
|---|---|
| اسم المشروع | Ensdim — Agency Operating System |
| نوع المنتج | B2B SaaS Platform |
| عدد التطبيقات | 2 (Client Portal + Admin Dashboard) |
| إجمالي السبرينتات | 7 سبرينتات |
| مدة السبرينت | أسبوعان لكل سبرينت |
| الإجمالي التقديري | 14 أسبوع |
| تاريخ البدء | 2026-06-01 |
| تاريخ الانتهاء المتوقع | 2026-09-07 |

---

## مراحل المشروع الكبرى

```
PHASE A — FOUNDATION
Sprint 01: Infrastructure + Design System
Sprint 02: Layout System + Authentication

PHASE B — CLIENT PORTAL
Sprint 03: Composite Components + Client Dashboard
Sprint 04: Client Portal Complete

PHASE C — ADMIN DASHBOARD
Sprint 05: Admin Core (Overview + Projects + Clients)
Sprint 06: Admin Secondary (Tasks + Team + Financial + Roles)

PHASE D — COMPLETION
Sprint 07: Onboarding + Global Polish + QA
```

---

## خريطة الجداول الزمنية

```
أسبوع  1–2  │ Sprint 01 │ Infrastructure + Design System Foundation
أسبوع  3–4  │ Sprint 02 │ Layout System + Authentication Pages
أسبوع  5–6  │ Sprint 03 │ Composite Components + Client Dashboard
أسبوع  7–8  │ Sprint 04 │ Client Portal — Complete
أسبوع  9–10 │ Sprint 05 │ Admin Dashboard — Core Modules
أسبوع 11–12 │ Sprint 06 │ Admin Dashboard — Secondary Modules
أسبوع 13–14 │ Sprint 07 │ Onboarding + Polish + QA
```

---

## ملخص السبرينتات

### Sprint 01 — Infrastructure + Design System
- **الهدف:** المشروع يعمل وكل الـ tokens والـ base components جاهزة
- **المخرجات:** Next.js setup + design system tokens + shadcn/ui base + icons
- **معيار الإتمام:** يمكن بناء أي component بالـ design system المحددة

### Sprint 02 — Layout System + Authentication
- **الهدف:** App shells جاهزة وصفحات الـ auth كاملة
- **المخرجات:** Sidebar + Header (Client & Admin) + كل صفحات Auth
- **معيار الإتمام:** المستخدم يستطيع التسجيل وتسجيل الدخول والوصول للـ dashboard

### Sprint 03 — Composite Components + Client Dashboard
- **الهدف:** كل الـ composite components جاهزة + Client Dashboard يعمل
- **المخرجات:** DataTable + Modals + Skeletons + Client Dashboard + Project Overview
- **معيار الإتمام:** العميل يرى dashboard حقيقية بـ states صحيحة

### Sprint 04 — Client Portal Complete
- **الهدف:** كل صفحات الـ client portal مكتملة
- **المخرجات:** Milestones + Demo Review + Revisions + Files + Payments + Notifications + Settings
- **معيار الإتمام:** العميل يستطيع اتمام كل العمليات الأساسية

### Sprint 05 — Admin Core
- **الهدف:** الـ admin يرى overview كامل ويدير المشاريع والعملاء
- **المخرجات:** Admin Overview + Projects (List/Create/Detail) + Clients (List/Profile)
- **معيار الإتمام:** PM يستطيع إنشاء مشروع وإدارة milestones وتعيين فريق

### Sprint 06 — Admin Secondary
- **الهدف:** Tasks + Team + Financial + Roles modules مكتملة
- **المخرجات:** Kanban Tasks + Team Management + Invoices + Permission Matrix
- **معيار الإتمام:** كل وحدات الـ admin الأساسية تعمل

### Sprint 07 — Polish + QA
- **الهدف:** منتج جاهز للإنتاج بالكامل
- **المخرجات:** Onboarding + Dark Mode + Responsive + Accessibility + Performance
- **معيار الإتمام:** Core Web Vitals ممتازة وكل الـ states محمية

## استراتيجية الترجمة

- الواجهة تدعم العربية والإنجليزية فقط.
- الـ routing يكون locale-based عبر `/ar` و`/en`.
- ملفات الترجمة تكون per feature / per page، وتبقى ملاصقة للمسؤول عن الشاشة أو الوحدة.
- الـ copy المشترك للمكونات العامة والـ shell يكون منفصلًا كطبقة system صغيرة، وليس ملف ترجمة ضخم واحد.
- الـ direction يتبدل تلقائيًا بين `rtl` و`ltr` حسب اللغة.
- أي feature جديدة تبدأ بترجمة خاصة بها من أول sprint الخاص بها، ثم تدخل في QA النهائي.

---

## MVP Scope Summary

### مشمول في MVP ✅

| الوحدة | Client Portal | Admin Dashboard |
|---|---|---|
| Authentication | ✅ | ✅ |
| Dashboard | ✅ | ✅ |
| Projects | ✅ (view) | ✅ (full CRUD) |
| Milestones | ✅ (approve/reject) | ✅ (full CRUD) |
| Demo Review | ✅ | ✅ (upload) |
| Revisions | ✅ (create/track) | ✅ (manage/assign) |
| Files | ✅ (download) | ✅ (upload/manage) |
| Invoices | ✅ (view/pay proof) | ✅ (create/send) |
| Notifications | ✅ | ✅ |
| Team Management | — | ✅ |
| Tasks / Kanban | — | ✅ |
| Clients / CRM | — | ✅ (basic) |
| Roles & Permissions | — | ✅ |
| Onboarding | ✅ | ✅ |
| Settings | ✅ | ✅ |

### خارج MVP ❌

| الوحدة | السبب |
|---|---|
| CMS (Blog, Portfolio, Services) | مستبعد صراحةً من MVP |
| Meetings Module | مستبعد صراحةً من MVP |
| Advanced Analytics | مستبعد صراحةً من MVP |
| Project Chat / Messaging | تعقيد تقني عالي — Post-MVP |
| Contracts / E-Signature | يتطلب integration خارجي |
| Financial Forecasting | Post-MVP |
| Expense Management | Post-MVP |
| AI Features | Future scope |
| WhatsApp Integration | Future scope |
| Mobile App | Future scope |
| Automation Builder | Future scope |

---

## Tech Stack

| الطبقة | التقنية |
|---|---|
| Framework | Next.js 15+ (App Router) |
| Language | TypeScript (strict mode) |
| Styling | TailwindCSS v4 |
| Components | shadcn/ui |
| Icons | Lucide React |
| State (Global) | Zustand |
| State (Server) | TanStack Query (React Query v5) |
| Forms | React Hook Form + Zod |
| Realtime | Supabase Realtime + Socket.IO |
| Storage | Supabase Storage |
| Notifications | BullMQ + Redis |
| Hosting | Vercel |

---

## معايير الجودة العامة

| المعيار | الهدف |
|---|---|
| Dashboard load time | < 2 ثانية |
| Login API response | < 800ms |
| Realtime propagation | < 2 ثانية |
| Lighthouse Performance | > 90 |
| Lighthouse Accessibility | > 90 |
| Mobile responsive | 390px → 1440px+ |
| Dark mode | مدعوم بالكامل |
| TypeScript coverage | 100% (no any) |
| Core Web Vitals | Green |

---

## تعريف "مكتمل" لكل مهمة

مهمة تعتبر مكتملة عندما:

- [ ] الـ UI يظهر بشكل صحيح على Desktop و Mobile
- [ ] جميع الـ states موجودة: Loading / Empty / Error / Success
- [ ] الـ TypeScript بدون أخطاء
- [ ] الـ component يعمل في Dark Mode
- [ ] الـ accessibility مقبول (keyboard nav + ARIA)
- [ ] لا توجد console errors
- [ ] التصميم يتطابق مع Design System المحددة

---

## الأدوار والمسؤوليات

| الدور | المسؤولية |
|---|---|
| Frontend Lead | Architecture + Code Review + Design System |
| Frontend Dev | Component implementation + Pages |
| Designer (Reference) | UI Rules من `ui-rouls.md` |
| PM | Sprint planning + acceptance criteria |

---

## روابط الوثائق

| الوثيقة | المسار |
|---|---|
| Full PRD | `Files/full PRD Ensdim.md` |
| Feature Breakdown | `Files/ENSDIM — COMPLETE FEATURE BREAKDOWN & PRODUCT SCOPE.md` |
| Client Dashboard PRD | `Files/PRD — Ensdim Dashboard ( Client ).md` |
| Admin Dashboard PRD | `Files/PRD — Ensdim Dashboard ( Admin Panel ).md` |
| Flow Diagrams | `Files/Flow Diagram.md` |
| Acceptance Criteria | `Files/Acceptance Criteria.md` |
| Product Backlog | `Files/Product Backlog.md` |
| User Stories | `Files/Ensdim-user-stories.md` |
| Tech Stack | `Files/ticknecal.md` |
| UI Rules | `Files/ui-rouls.md` |
| Full Backlog (Sprint Tasks) | `Sprints/BACKLOG.md` |
| Sprint 01 | `Sprints/Sprint-01.md` |
| Sprint 02 | `Sprints/Sprint-02.md` |
| Sprint 03 | `Sprints/Sprint-03.md` |
| Sprint 04 | `Sprints/Sprint-04.md` |
| Sprint 05 | `Sprints/Sprint-05.md` |
| Sprint 06 | `Sprints/Sprint-06.md` |
| Sprint 07 | `Sprints/Sprint-07.md` |
