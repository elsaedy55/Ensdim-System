-- ═══════════════════════════════════════════════════════════════════
-- ENSDIM — Complete Database Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ═══════════════════════════════════════════════════════════════════

-- ─── Extensions ─────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ─── Helpers ────────────────────────────────────────────────────────

-- Auto-update updated_at trigger function
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ═══════════════════════════════════════════════════════════════════
-- TABLES
-- ═══════════════════════════════════════════════════════════════════

-- ─── Workspaces (agencies) ──────────────────────────────────────────
create table if not exists workspaces (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  logo_url    text,
  currency    text not null default 'USD',
  created_at  timestamptz not null default now()
);

-- ─── Profiles (extends auth.users) ─────────────────────────────────
create table if not exists profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  workspace_id uuid not null references workspaces(id) on delete cascade,
  name         text not null,
  phone        text,
  avatar_url   text,
  role         text not null default 'client'
                 check (role in ('admin','project_manager','developer','designer','accountant','client')),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

drop trigger if exists profiles_updated_at on profiles;
create trigger profiles_updated_at
  before update on profiles
  for each row execute function update_updated_at();

-- ─── Projects ────────────────────────────────────────────────────────
create table if not exists projects (
  id               uuid primary key default gen_random_uuid(),
  workspace_id     uuid not null references workspaces(id) on delete cascade,
  client_id        uuid not null references profiles(id) on delete restrict,
  name             text not null,
  description      text,
  status           text not null default 'planning'
                     check (status in ('planning','ui_ux','development','review','testing','delivery','maintenance','completed','on_hold')),
  health           text not null default 'on_track'
                     check (health in ('on_track','at_risk','delayed')),
  progress         integer not null default 0 check (progress between 0 and 100),
  start_date       date,
  target_delivery  date,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

drop trigger if exists projects_updated_at on projects;
create trigger projects_updated_at
  before update on projects
  for each row execute function update_updated_at();

-- Project team members (many-to-many)
create table if not exists project_members (
  project_id uuid not null references projects(id) on delete cascade,
  profile_id uuid not null references profiles(id) on delete cascade,
  primary key (project_id, profile_id)
);

-- ─── Milestones ───────────────────────────────────────────────────────
create table if not exists milestones (
  id           uuid primary key default gen_random_uuid(),
  project_id   uuid not null references projects(id) on delete cascade,
  name         text not null,
  description  text,
  status       text not null default 'pending'
                 check (status in ('pending','in_progress','review','approved','completed','delayed')),
  progress     integer not null default 0 check (progress between 0 and 100),
  due_date     date not null,
  start_date   date,
  completed_at timestamptz,
  "order"      integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

drop trigger if exists milestones_updated_at on milestones;
create trigger milestones_updated_at
  before update on milestones
  for each row execute function update_updated_at();

-- ─── Files ────────────────────────────────────────────────────────────
create table if not exists files (
  id           uuid primary key default gen_random_uuid(),
  project_id   uuid references projects(id) on delete cascade,
  milestone_id uuid references milestones(id) on delete set null,
  name         text not null,
  storage_path text not null,  -- path inside Supabase Storage bucket
  size         bigint not null,
  mime_type    text not null,
  category     text not null default 'general'
                 check (category in ('design','development','documentation','credentials','final_delivery','general')),
  uploaded_by  uuid not null references profiles(id) on delete restrict,
  created_at   timestamptz not null default now()
);

-- ─── Revisions ────────────────────────────────────────────────────────
create table if not exists revisions (
  id            uuid primary key default gen_random_uuid(),
  project_id    uuid not null references projects(id) on delete cascade,
  milestone_id  uuid references milestones(id) on delete set null,
  title         text not null,
  description   text not null,
  category      text not null
                  check (category in ('bug','revision','feature','question')),
  status        text not null default 'open'
                  check (status in ('open','in_review','in_progress','done','rejected')),
  priority      text not null default 'medium'
                  check (priority in ('high','medium','low')),
  submitted_by  uuid not null references profiles(id) on delete restrict,
  assigned_to   uuid references profiles(id) on delete set null,
  team_response text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

drop trigger if exists revisions_updated_at on revisions;
create trigger revisions_updated_at
  before update on revisions
  for each row execute function update_updated_at();

-- Revision attachments (files linked to revisions)
create table if not exists revision_attachments (
  id          uuid primary key default gen_random_uuid(),
  revision_id uuid not null references revisions(id) on delete cascade,
  file_id     uuid not null references files(id) on delete cascade,
  unique (revision_id, file_id)
);

-- ─── Invoices ─────────────────────────────────────────────────────────
create table if not exists invoices (
  id                  uuid primary key default gen_random_uuid(),
  project_id          uuid not null references projects(id) on delete cascade,
  invoice_number      text not null unique,
  client_id           uuid not null references profiles(id) on delete restrict,
  status              text not null default 'draft'
                        check (status in ('draft','sent','viewed','paid','overdue','cancelled')),
  subtotal            numeric(12,2) not null default 0,
  discount            numeric(12,2) not null default 0,
  vat_rate            numeric(5,2)  not null default 0,
  vat_amount          numeric(12,2) not null default 0,
  total               numeric(12,2) not null,
  currency            text not null default 'USD',
  issue_date          date not null,
  due_date            date not null,
  notes               text,
  payment_proof_url   text,  -- Supabase Storage path
  paid_at             timestamptz,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

drop trigger if exists invoices_updated_at on invoices;
create trigger invoices_updated_at
  before update on invoices
  for each row execute function update_updated_at();

-- Invoice line items
create table if not exists invoice_line_items (
  id          uuid primary key default gen_random_uuid(),
  invoice_id  uuid not null references invoices(id) on delete cascade,
  description text not null,
  quantity    integer not null default 1,
  unit_price  numeric(12,2) not null,
  total       numeric(12,2) not null
);

-- ─── Notifications ────────────────────────────────────────────────────
create table if not exists notifications (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references profiles(id) on delete cascade,
  type       text not null
               check (type in ('milestone_review','invoice_sent','file_uploaded','revision_submitted','revision_resolved','approval_complete','payment_received','system')),
  title      text not null,
  body       text not null,
  is_read    boolean not null default false,
  link       text,
  created_at timestamptz not null default now()
);

-- Notification preferences (one row per user)
create table if not exists notification_preferences (
  id                      uuid primary key default gen_random_uuid(),
  user_id                 uuid not null unique references profiles(id) on delete cascade,
  email_milestone_review  boolean not null default true,
  email_invoice_sent      boolean not null default true,
  email_file_uploaded     boolean not null default true,
  email_revision_updated  boolean not null default true,
  email_project_status    boolean not null default true,
  in_app_milestone_review boolean not null default true,
  in_app_invoice_sent     boolean not null default true,
  in_app_file_uploaded    boolean not null default true,
  in_app_revision_updated boolean not null default true
);

-- ─── Activity Logs ────────────────────────────────────────────────────
create table if not exists activity_logs (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid references projects(id) on delete cascade,
  user_id     uuid not null references profiles(id) on delete restrict,
  message     text not null,
  entity_type text,
  entity_id   uuid,
  created_at  timestamptz not null default now()
);

-- ═══════════════════════════════════════════════════════════════════
-- INDEXES (performance)
-- ═══════════════════════════════════════════════════════════════════

create index if not exists idx_profiles_workspace     on profiles(workspace_id);
create index if not exists idx_projects_workspace     on projects(workspace_id);
create index if not exists idx_projects_client        on projects(client_id);
create index if not exists idx_milestones_project     on milestones(project_id);
create index if not exists idx_milestones_order       on milestones(project_id, "order");
create index if not exists idx_files_project          on files(project_id);
create index if not exists idx_files_milestone        on files(milestone_id);
create index if not exists idx_revisions_project      on revisions(project_id);
create index if not exists idx_revisions_submitted_by on revisions(submitted_by);
create index if not exists idx_invoices_project       on invoices(project_id);
create index if not exists idx_invoices_client        on invoices(client_id);
create index if not exists idx_notifications_user     on notifications(user_id);
create index if not exists idx_notifications_unread   on notifications(user_id, is_read) where is_read = false;
create index if not exists idx_activity_project       on activity_logs(project_id);
create index if not exists idx_activity_created       on activity_logs(created_at desc);
