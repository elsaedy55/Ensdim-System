# Ensdim — Agency Operating System

> A complete B2B SaaS platform for software agencies to manage projects, clients, milestones, revisions, invoices, and team — all in one place.

---

## Overview

Ensdim is a full-stack agency management platform built for software agencies. It provides two separate portals:

- **Client Portal** — Clients track their project progress, review milestones, submit revision requests, view invoices, and download deliverables.
- **Admin Dashboard** — Agency team manages projects, tasks, clients, invoices, team members, roles, and permissions.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router) + TypeScript |
| Styling | TailwindCSS v4 + shadcn/ui |
| State (Server) | TanStack Query (React Query v5) |
| State (Global) | Zustand |
| Forms | React Hook Form + Zod |
| Backend | Supabase (Auth + PostgreSQL + Storage + Realtime) |
| Drag & Drop | dnd-kit |
| Dark Mode | next-themes |
| i18n | next-intl v4 (Arabic + English, RTL/LTR) |
| Hosting | Vercel (recommended) |

---

## Features

### Client Portal
- **Dashboard** — Project status, pending actions, financial summary, milestone timeline
- **Milestones** — Visual timeline, approve/reject phases, view deliverables
- **Revisions** — Submit bug reports, feature requests, and change requests
- **Files** — Browse and download project files by category
- **Payments** — View invoices, upload payment proof
- **Notifications** — Real-time updates via Supabase Realtime
- **Settings** — Profile, password, notification preferences

### Admin Dashboard
- **Overview** — KPI cards, project health table, activity feed
- **Projects** — Full CRUD, 7-tab detail (Milestones, Team, Files, Revisions, Invoices, Activity)
- **Milestones** — Add/edit/delete, upload deliverables, mark as "Ready for Review"
- **Tasks** — Kanban board with drag & drop (Todo → In Progress → Review → Done → Blocked)
- **Clients** — Pipeline view (CRM) + table view, client profiles
- **Invoices** — Create with dynamic line items, send to client, mark as paid
- **Team** — Invite members by email, assign roles
- **Roles & Permissions** — Permission matrix builder per module/action
- **Settings** — Workspace info, security, profile

### Platform
- **Bilingual** — Full Arabic & English support with RTL/LTR switching
- **Dark Mode** — System-aware theme toggle
- **Onboarding** — 3-step wizard for new users
- **Real-time** — Live notifications via Supabase Realtime
- **Responsive** — Mobile-first, works on 390px → 1440px+

---

## Project Structure

```
Ensdim-System/
├── ensdim-app/              ← Next.js application
│   ├── src/
│   │   ├── app/
│   │   │   ├── (admin)/     ← Admin dashboard routes
│   │   │   ├── (auth)/      ← Login, Register, etc.
│   │   │   ├── (client)/    ← Client portal routes
│   │   │   └── api/         ← API routes
│   │   ├── components/
│   │   │   ├── admin/       ← Admin-specific components
│   │   │   ├── client/      ← Client-specific components
│   │   │   ├── common/      ← Shared (Sidebar, Header, etc.)
│   │   │   └── ui/          ← Design system components
│   │   ├── hooks/           ← React Query hooks
│   │   ├── lib/
│   │   │   ├── services/    ← Supabase data services
│   │   │   └── supabase/    ← Supabase client setup
│   │   ├── messages/        ← i18n translations (ar + en)
│   │   └── store/           ← Zustand stores
│   └── supabase/
│       └── migrations/      ← SQL migrations (run in order)
├── Files/                   ← PRD + design docs
└── Sprints/                 ← Sprint planning docs (01–07)
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- A [Supabase](https://supabase.com) account (free tier works)

### 1. Clone the repository

```bash
git clone https://github.com/elsaedy55/Ensdim-System.git
cd Ensdim-System/ensdim-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create Supabase project

1. Go to [supabase.com](https://supabase.com) → **New Project**
2. From **Project Settings → API**, copy:
   - Project URL
   - anon public key
   - service_role key

### 4. Configure environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

### 5. Run SQL migrations

In **Supabase Dashboard → SQL Editor**, run each file in order:

```
supabase/migrations/001_schema.sql      ← All tables + indexes
supabase/migrations/002_rls.sql         ← Row Level Security policies
supabase/migrations/003_storage.sql     ← Storage buckets
supabase/migrations/004_auth_trigger.sql ← Auto-create profile on signup
supabase/migrations/005_client_status.sql ← Client pipeline status
supabase/migrations/006_tasks_roles.sql   ← Tasks + Roles tables
```

### 6. Add redirect URL in Supabase

Go to **Authentication → URL Configuration → Redirect URLs**, add:
```
http://localhost:3000/accept-invite
```

### 7. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## First-time Setup

1. Go to `/register` and create your **agency admin account**
2. Enter your agency name and complete the onboarding wizard
3. You'll be redirected to the **Admin Dashboard**

### Load demo data (optional)

With the dev server running, call:

```bash
# Creates demo admin + client with full project data
curl -X POST http://localhost:3000/api/dev/seed-admin
```

This creates:
| Account | Email | Password |
|---|---|---|
| Admin | `admin@demo.ensdim.com` | `Admin@123456` |
| Client | `client@demo.ensdim.com` | `Client@123456` |

---

## Database Schema

| Table | Purpose |
|---|---|
| `workspaces` | Agency workspaces (multi-tenant) |
| `profiles` | Users extended from `auth.users` |
| `projects` | Client projects |
| `milestones` | Project phases |
| `files` | Project deliverables (Supabase Storage) |
| `revisions` | Client change/bug requests |
| `revision_attachments` | Files linked to revisions |
| `invoices` | Client invoices |
| `invoice_line_items` | Invoice line items |
| `notifications` | User notifications |
| `notification_preferences` | Per-user notification settings |
| `tasks` | Team tasks (Kanban) |
| `roles` | Custom permission roles |
| `activity_logs` | Project activity timeline |

---

## Authentication Flow

```
Register → Email Verification → Onboarding Wizard → Dashboard
         ↓
Invite (admin only) → Accept Invite → Set Password → Dashboard
```

Supabase Auth handles sessions via cookies. The middleware checks:
1. Session valid → proceed
2. `onboarding_complete: false` → redirect to `/onboarding`
3. `role: client` → Client Portal (`/dashboard`)
4. `role: admin|pm|...` → Admin Dashboard (`/admin`)

---

## i18n

- **Languages**: Arabic (default) + English
- **Locale switching**: Cookie-based (`NEXT_LOCALE`), no URL prefix
- **Direction**: RTL for Arabic, LTR for English (auto-switches on `<html>`)
- **Namespaces**: 12 feature-based JSON files per language

To switch language, use the globe icon in the header.

---

## Key Scripts

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run type-check   # TypeScript check (0 errors target)
```

---

## Deployment

### Vercel (recommended)

1. Push to GitHub (done ✓)
2. Connect repo to [vercel.com](https://vercel.com)
3. Add environment variables (same as `.env.local`)
4. Add production URL to Supabase redirect URLs

---

## License

Private — All rights reserved © 2026 Ensdim
