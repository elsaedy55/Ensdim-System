# SPRINT 02 — Layout System + Authentication
# نظام الـ Layout + صفحات المصادقة

---

## معلومات السبرينت

| المعلومة | التفاصيل |
|---|---|
| رقم السبرينت | 02 |
| المرحلة | Phase A — Foundation |
| تاريخ البدء | 2026-06-15 |
| تاريخ الانتهاء | 2026-06-28 |
| المدة | أسبوعان (10 أيام عمل) |
| التقدير الزمني | ~52 ساعة |
| عدد المهام | 45 مهمة |
| التبعيات | Sprint 01 مكتمل ✅ |

---

## هدف السبرينت

> بنهاية هذا السبرينت، يكون الـ app shell لكلا التطبيقين (Client Portal + Admin Dashboard) جاهزًا بالكامل، والمستخدم يستطيع التسجيل وتسجيل الدخول والوصول إلى الـ dashboard الصحيح بناءً على دوره. نظام الـ routing والـ auth guards يعمل بالكامل، ومعه الأساس الخاص بالعربية/الإنجليزية بحيث تكون الترجمة مقسمة per feature / per page وليس في ملف موحد واحد.

---

## نتائج (Deliverables) السبرينت

- [x] Client App Shell (Sidebar + Header) جاهز ومتجاوب
- [x] Admin App Shell (Sidebar + Header) جاهز ومتجاوب
- [x] Auth middleware يوجه المستخدمين حسب الدور
- [x] صفحة Login كاملة (validation + error handling)
- [x] صفحة Register كاملة
- [x] صفحة Email Verification كاملة
- [x] صفحة Forgot + Reset Password كاملة
- [x] Auth state management (Zustand) يعمل
- [x] JWT refresh token interceptor يعمل
- [x] صفحات 403 و 404 جاهزة
- [x] Locale routing و`lang`/`dir` foundation جاهزين
- [x] System copy layer للمكونات العامة وصفحات auth جاهز

---

## معيار الإتمام (Definition of Done)

- [ ] المستخدم يستطيع التسجيل وتلقي تأكيد البريد
- [ ] المستخدم يستطيع تسجيل الدخول والوصول للـ dashboard
- [ ] Client role → /dashboard (Client Portal)
- [ ] Admin/PM role → /admin (Admin Dashboard)
- [ ] Unauthenticated → /login
- [ ] Sidebar تنهار على mobile وتعمل كـ drawer
- [ ] Header تعمل على كل breakpoints
- [ ] Session expired → modal يظهر ويعيد للـ login

---

## المهام التفصيلية

### EPIC 1: Layout System

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S02-001 | AuthLayout | 🔴 | 1h | ⬜ |
| S02-002 | ClientAppShell | 🔴 | 2h | ⬜ |
| S02-003 | AdminAppShell | 🔴 | 2h | ⬜ |
| S02-004 | Sidebar — Client Variant | 🔴 | 3h | ⬜ |
| S02-005 | Sidebar — Admin Variant | 🔴 | 3h | ⬜ |
| S02-006 | Sidebar — Collapsed state (icon-only, 64px) | 🟠 | 1h | ⬜ |
| S02-007 | Sidebar — Mobile drawer | 🟠 | 2h | ⬜ |
| S02-008 | Header — Client Variant | 🔴 | 2h | ⬜ |
| S02-009 | Header — Admin Variant | 🔴 | 2h | ⬜ |
| S02-010 | PageHeader component | 🔴 | 1h | ⬜ |
| S02-011 | PageContainer | 🔴 | 30m | ⬜ |
| S02-012 | Breadcrumbs | 🟠 | 1h | ⬜ |
| S02-013 | Bottom Navigation Bar — Client (mobile) | 🟠 | 2h | ⬜ |
| S02-014 | Bottom Navigation Bar — Admin (mobile) | 🟠 | 1h | ⬜ |

---

**تفاصيل S02-004 — Client Sidebar:**

```
Navigation Items:
  ├── Dashboard          (LayoutDashboard icon)
  ├── Project            (Folder icon)
  ├── Milestones         (Flag icon)
  ├── Revisions          (MessageSquare icon)
  ├── Files              (FileText icon)
  ├── Payments           (CreditCard icon)
  └── Notifications      (Bell icon + count badge)

Bottom Section:
  ├── Settings           (Settings icon)
  └── User Menu          (Avatar + name + logout)

Width: 240px expanded / 64px collapsed
Active state: bg-indigo-50 + left border 2px indigo-500
```

**تفاصيل S02-005 — Admin Sidebar:**

```
Top Section:
  └── Workspace Switcher (Logo + workspace name + chevron)

Navigation Groups:
  MAIN
  ├── Overview           (LayoutDashboard)
  ├── Projects           (Folder)
  ├── Clients            (UserCheck)
  ├── Tasks              (CheckSquare)

  TEAM & FINANCE
  ├── Team               (Users)
  ├── Financial          (CreditCard)

  SYSTEM
  ├── Notifications      (Bell + badge)
  ├── Roles              (ShieldCheck)
  └── Settings           (Settings)

Bottom Section:
  └── User Menu (Avatar + name + role badge + logout)
```

**تفاصيل S02-008/009 — Header:**

```
Height: 64px
Border: 1px solid border (bottom only)
Background: bg-surface / backdrop-blur (on scroll)

Left:   Page title (dynamic) | optional breadcrumbs
Center: SearchInput (desktop only — triggers ⌘K)
Right:  [Quick Action Button?] [Bell+Badge] [Divider] [Avatar Dropdown]

User Avatar Dropdown:
  ├── User name + email
  ├── separator
  ├── Profile Settings
  ├── separator
  └── Logout
```

---

### EPIC 2: Routing + Middleware

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S02-015 | middleware.ts (auth check + role routing) | 🔴 | 2h | ⬜ |
| S02-016 | Route guard → Client Portal | 🔴 | 1h | ⬜ |
| S02-017 | Route guard → Admin Dashboard | 🔴 | 1h | ⬜ |
| S02-018 | Route guard → Unauthenticated redirect | 🔴 | 30m | ⬜ |
| S02-019 | 403 Access Denied page | 🔴 | 1h | ⬜ |
| S02-020 | 404 Not Found page | 🔴 | 1h | ⬜ |

**تفاصيل middleware.ts:**

```typescript
// Logic:
// 1. Check for access token in cookies
// 2. If no token → redirect to /login
// 3. If token → decode role
// 4. If role = "client" → allow /dashboard routes, block /admin routes
// 5. If role = "admin/pm/dev/..." → allow /admin routes, block /dashboard routes
// 6. /login /register /verify-email → allow without auth
// 7. Token expired → redirect to /login?expired=true
```

---

### EPIC 3: Auth State Management

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S02-021 | auth.store.ts (Zustand) | 🔴 | 1h | ⬜ |
| S02-022 | workspace.store.ts (Zustand) | 🔴 | 1h | ⬜ |
| S02-023 | api.ts (axios base client + interceptors) | 🔴 | 1h | ⬜ |
| S02-024 | auth.service.ts | 🔴 | 2h | ⬜ |
| S02-025 | JWT refresh interceptor | 🔴 | 2h | ⬜ |
| S02-026 | SessionExpiredModal | 🔴 | 1h | ⬜ |

**تفاصيل S02-021 — auth.store.ts:**

```typescript
interface AuthState {
  user: User | null
  accessToken: string | null
  workspaceId: string | null
  role: UserRole | null
  isAuthenticated: boolean
  isLoading: boolean

  // Actions
  setUser: (user: User, token: string) => void
  clearAuth: () => void
  setLoading: (v: boolean) => void
}
```

**تفاصيل S02-024 — auth.service.ts:**

```typescript
// Methods:
login(email, password) → { user, accessToken, refreshToken }
register(name, email, password) → { message }
verifyEmail(token) → { success }
forgotPassword(email) → { message }
resetPassword(token, newPassword) → { success }
refreshToken(refreshToken) → { accessToken }
logout() → void
logoutAllDevices() → void
```

---

### EPIC 4: Authentication Pages

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S02-027 | صفحة Login (/login) | 🔴 | 3h | ⬜ |
| S02-028 | صفحة Register (/register) | 🔴 | 2h | ⬜ |
| S02-029 | صفحة Email Verification (/verify-email) | 🔴 | 2h | ⬜ |
| S02-030 | صفحة Forgot Password (/forgot-password) | 🔴 | 1h | ⬜ |
| S02-031 | صفحة Reset Password (/reset-password) | 🔴 | 2h | ⬜ |
| S02-032 | Form validation schemas (Zod) | 🔴 | 2h | ⬜ |
| S02-033 | Error handling (401/403/500 responses) | 🔴 | 1h | ⬜ |
| S02-034 | Account locked state UI | 🟠 | 1h | ⬜ |

---

**تفاصيل S02-027 — Login Page:**

```
Layout: AuthLayout (centered card, 440px max-width)

Content:
  [Logo / Brand mark — centered top]
  [Title: "Welcome back"]
  [Subtitle: "Sign in to your workspace"]
  [Form:]
    Email field
    Password field (show/hide toggle)
    [Forgot password? link — right aligned]
  [Sign In button — full width, primary]
  [Divider]
  [Don't have an account? Register link]

States:
  Default → form ready
  Loading → button spinner, fields disabled
  Error (wrong password) → inline error below form
  Error (account locked) → lock icon + lockout duration
  Error (unverified) → blue info banner + resend email link
  Success → redirect to workspace

Validation (Zod):
  email: z.string().email()
  password: z.string().min(8)
```

**تفاصيل S02-028 — Register Page:**

```
Content:
  [Logo]
  [Title: "Create your account"]
  [Form:]
    Full name
    Email
    Password (strength indicator)
    Confirm password
  [Create Account button — full width]
  [Terms & Privacy disclaimer text]
  [Already have account? Login link]

Password strength indicator:
  Weak:   1/4 bar — rose
  Fair:   2/4 bar — amber
  Good:   3/4 bar — indigo
  Strong: 4/4 bar — emerald
```

**تفاصيل S02-029 — Email Verification Page:**

```
Content:
  [Email icon — large, indigo]
  [Title: "Check your email"]
  [Body: "We sent a verification link to {email}"]
  [OTP Input: 6 boxes] OR [Click link in email message]
  [Verify button]
  [Divider]
  [Didn't receive it? Resend (with 60s cooldown timer)]
  [Wrong email? Go back link]

States:
  Pending → waiting
  Verified → success animation → redirect to onboarding/dashboard
  Invalid OTP → error message
  Expired → resend prompt
```

---

### EPIC 5: i18n Foundation — Arabic/English

| ID | المهمة | الأولوية | الوقت | الحالة |
|---|---|---|---|---|
| S02-035 | تثبيت وإعداد `next-intl` (App Router compatible) | 🔴 | 30m | ⬜ |
| S02-036 | `src/i18n/common.ts` — locale config + TypeScript types | 🔴 | 30m | ⬜ |
| S02-037 | `src/i18n/request.ts` — server-side locale detection من cookie | 🔴 | 30m | ⬜ |
| S02-038 | `next.config.ts` — إضافة next-intl plugin | 🔴 | 15m | ⬜ |
| S02-039 | Root layout — `NextIntlClientProvider` + dynamic `lang`/`dir` على `<html>` | 🔴 | 1h | ⬜ |
| S02-040 | `messages/en/common.json` — English copy (nav, actions, status, validation, feedback) | 🔴 | 1h | ⬜ |
| S02-041 | `messages/ar/common.json` — Arabic translation كاملة | 🔴 | 1h | ⬜ |
| S02-042 | `messages/en/auth.json` + `messages/ar/auth.json` | 🔴 | 1h | ⬜ |
| S02-043 | Cairo font للعربية — conditional loading حسب locale | 🟠 | 30m | ⬜ |
| S02-044 | `LanguageSwitcher` component — toggle في Header + Settings | 🔴 | 1h | ⬜ |
| S02-045 | تطبيق `useTranslations()` على Auth pages (Login, Register, Verify, Forgot, Reset) | 🔴 | 1h | ⬜ |

---

**تفاصيل S02-036 — i18n Config & Types:**

```typescript
// src/i18n/common.ts

export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ar';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
};

export const localeDir: Record<Locale, 'ltr' | 'rtl'> = {
  en: 'ltr',
  ar: 'rtl',
};
```

**هيكل messages/ (per-feature, per-page):**

```
src/messages/
  en/
    common.json          ← nav labels, actions, status, validation, feedback, pagination
    auth.json            ← login, register, verify-email, forgot, reset-password
    dashboard.json       ← client dashboard page
    milestones.json      ← milestones pages
    revisions.json       ← revisions pages
    files.json           ← files page
    payments.json        ← payments + invoice detail
    notifications.json   ← notifications page
    settings.json        ← client settings
    admin/
      overview.json      ← admin overview dashboard
      projects.json      ← projects module
      clients.json       ← clients/CRM module
      team.json          ← team management
      financial.json     ← financial + invoices
      roles.json         ← roles & permissions
      settings.json      ← admin settings
  ar/
    (نفس الهيكل بالترجمة العربية الكاملة)
```

**تفاصيل S02-044 — LanguageSwitcher:**

```
الشكل:
  [🌐 English]   ← عندما locale = ar (يعرض اللغة المتاحة للتبديل إليها)
  [🌐 العربية]   ← عندما locale = en

مكان الظهور:
  - Header → Right side (بجوار Bell + Avatar)
  - Settings page → Language & Region section

الآلية:
  - Click → set cookie "NEXT_LOCALE" → router.refresh()
  - html lang + dir يتحدثان فورًا بدون page reload
  - Locale يستمر عبر sessions من الـ cookie
```

---

## خطة التنفيذ اليومية

| اليوم | المهام |
|---|---|
| Day 1 (Mon) | S02-035-038 i18n setup (next-intl + config + request + next.config) + S02-001 AuthLayout + S02-002/003 App Shells |
| Day 2 (Tue) | S02-004/005 Sidebars (Client + Admin) |
| Day 3 (Wed) | S02-006/007 Collapsed + Mobile Sidebar |
| Day 4 (Thu) | S02-008/009 Headers + S02-010/011 PageHeader/Container + S02-039 NextIntlClientProvider في Layout |
| Day 5 (Fri) | S02-012-014 Breadcrumbs + Mobile Nav |
| Day 6 (Mon) | S02-015-018 Middleware + Route Guards |
| Day 7 (Tue) | S02-019/020 Error Pages + S02-021-026 Auth State |
| Day 8 (Wed) | S02-027 Login page (complete) + S02-040/041 messages/common (en + ar) |
| Day 9 (Thu) | S02-028/029 Register + Email Verify + S02-042/043 messages/auth (en + ar) + Cairo font |
| Day 10 (Fri) | S02-030-034 Forgot/Reset Password + S02-044/045 LanguageSwitcher + Auth translations + i18n QA |

---

## المخاطر والتبعيات

| المخاطرة | الاحتمال | الحل |
|---|---|---|
| Backend Auth API غير جاهز | عالٍ | استخدام mock data + MSW في الـ development |
| JWT handling في Next.js App Router | متوسط | استخدام cookies (httpOnly) عبر server actions |
| Supabase Auth integration complexity | متوسط | استخدام Supabase client SDK مباشرة |

---

## قائمة التحقق (Sprint Review Checklist)

```
Layout:
[ ] Client Sidebar — تعمل navigation على كل السكشنات
[ ] Admin Sidebar — workspace switcher يعمل
[ ] Sidebar — collapsed state (icon only) يعمل
[ ] Sidebar — mobile drawer يفتح ويغلق
[ ] Header — User menu dropdown يعمل
[ ] Header — Bell notification badge يظهر
[ ] Dark mode — Sidebar + Header تعمل صح

Auth:
[ ] Login → success → redirect حسب الدور
[ ] Login → wrong password → error message
[ ] Login → unverified → verification prompt
[ ] Login → account locked → locked message
[ ] Register → success → verification email
[ ] Email verify → OTP → success
[ ] Forgot password → email sent
[ ] Reset password → new password → redirect login
[ ] Middleware → client route → admin blocked
[ ] Middleware → admin route → client blocked
[ ] Middleware → unauthenticated → /login
[ ] Token expired → SessionExpiredModal → redirect
i18n Foundation:
[ ] next-intl مثبت ومعد صح مع App Router
[ ] locale تُقرأ من cookie "NEXT_LOCALE" (default: ar)
[ ] lang + dir يتحدثان على <html> tag عند تبديل اللغة
[ ] LanguageSwitcher يعمل في Header (بدون page reload)
[ ] Cairo font يُحمّل عند التبديل للعربية / Geist للإنجليزية
[ ] messages/en/common.json + messages/ar/common.json موجودين ومكتملين
[ ] messages/en/auth.json + messages/ar/auth.json موجودين ومكتملين
[ ] Auth pages (Login/Register/Verify/Forgot/Reset) مترجمة 100% بالعربية والإنجليزية
[ ] locale يستمر بعد page reload + تسجيل خروج ودخول
[ ] هيكل messages/ مقسم per-feature (مش ملف واحد)
```
