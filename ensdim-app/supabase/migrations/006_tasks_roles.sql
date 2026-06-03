-- ═══════════════════════════════════════════════════════════════
-- ENSDIM — Tasks + Roles tables
-- Run in Supabase SQL Editor after 005_client_status.sql
-- ═══════════════════════════════════════════════════════════════

-- ─── Tasks ───────────────────────────────────────────────────────

create table if not exists tasks (
  id            uuid primary key default gen_random_uuid(),
  workspace_id  uuid not null references workspaces(id) on delete cascade,
  project_id    uuid references projects(id) on delete cascade,
  milestone_id  uuid references milestones(id) on delete set null,
  title         text not null,
  description   text,
  type          text not null default 'other'
                  check (type in ('bug','feature','design','review','other')),
  status        text not null default 'todo'
                  check (status in ('todo','in_progress','review','done','blocked')),
  priority      text not null default 'medium'
                  check (priority in ('high','medium','low')),
  assignee_id   uuid references profiles(id) on delete set null,
  due_date      date,
  "order"       integer not null default 0,
  created_by    uuid not null references profiles(id) on delete restrict,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

drop trigger if exists tasks_updated_at on tasks;
create trigger tasks_updated_at
  before update on tasks
  for each row execute function update_updated_at();

create index if not exists idx_tasks_workspace  on tasks(workspace_id);
create index if not exists idx_tasks_project    on tasks(project_id);
create index if not exists idx_tasks_status     on tasks(workspace_id, status);
create index if not exists idx_tasks_assignee   on tasks(assignee_id);

-- RLS for tasks
alter table tasks enable row level security;

drop policy if exists "tasks_select"  on tasks;
drop policy if exists "tasks_insert"  on tasks;
drop policy if exists "tasks_update"  on tasks;
drop policy if exists "tasks_delete"  on tasks;

create policy "tasks_select" on tasks
  for select using (workspace_id = get_my_workspace_id() and is_team_member());

create policy "tasks_insert" on tasks
  for insert with check (workspace_id = get_my_workspace_id() and is_team_member() and created_by = auth.uid());

create policy "tasks_update" on tasks
  for update using (workspace_id = get_my_workspace_id() and is_team_member());

create policy "tasks_delete" on tasks
  for delete using (workspace_id = get_my_workspace_id() and is_team_member());

-- ─── Roles ───────────────────────────────────────────────────────

create table if not exists roles (
  id           uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  name         text not null,
  description  text,
  is_system    boolean not null default false,
  permissions  jsonb not null default '{}',
  created_at   timestamptz not null default now(),
  unique (workspace_id, name)
);

create index if not exists idx_roles_workspace on roles(workspace_id);

-- RLS for roles
alter table roles enable row level security;

drop policy if exists "roles_select"  on roles;
drop policy if exists "roles_write"   on roles;

create policy "roles_select" on roles
  for select using (workspace_id = get_my_workspace_id());

create policy "roles_write" on roles
  for all using (workspace_id = get_my_workspace_id() and get_my_role() = 'admin');

-- Insert system roles when workspace is created
-- (can be called manually or via trigger on workspace insert)
create or replace function seed_default_roles(p_workspace_id uuid)
returns void language plpgsql security definer as $$
begin
  insert into roles (workspace_id, name, description, is_system, permissions)
  values
    (p_workspace_id, 'Admin', 'Full access to all features', true,
     '{"dashboard":{"view":true,"manage":true},"projects":{"view":true,"create":true,"edit":true,"delete":true,"approve":true,"export":true,"manage":true},"milestones":{"view":true,"create":true,"edit":true,"delete":true,"approve":true},"revisions":{"view":true,"create":true,"edit":true,"delete":true},"files":{"view":true,"create":true,"delete":true},"invoices":{"view":true,"create":true,"edit":true,"delete":true,"approve":true,"export":true},"financial":{"view":true,"manage":true},"team":{"view":true,"create":true,"edit":true,"delete":true,"manage":true},"clients":{"view":true,"create":true,"edit":true,"delete":true},"roles":{"view":true,"manage":true},"settings":{"view":true,"manage":true}}'::jsonb),
    (p_workspace_id, 'Project Manager', 'Manage projects and milestones', false,
     '{"dashboard":{"view":true},"projects":{"view":true,"create":true,"edit":true,"approve":true},"milestones":{"view":true,"create":true,"edit":true,"approve":true},"revisions":{"view":true,"edit":true},"files":{"view":true,"create":true},"invoices":{"view":true,"create":true},"team":{"view":true},"clients":{"view":true}}'::jsonb),
    (p_workspace_id, 'Developer', 'Work on tasks and milestones', false,
     '{"dashboard":{"view":true},"projects":{"view":true},"milestones":{"view":true,"edit":true},"revisions":{"view":true,"edit":true},"files":{"view":true,"create":true},"team":{"view":true}}'::jsonb),
    (p_workspace_id, 'Designer', 'Design and creative work', false,
     '{"dashboard":{"view":true},"projects":{"view":true},"milestones":{"view":true,"edit":true},"files":{"view":true,"create":true}}'::jsonb),
    (p_workspace_id, 'Accountant', 'Manage financial records', false,
     '{"dashboard":{"view":true},"invoices":{"view":true,"create":true,"edit":true,"approve":true,"export":true},"financial":{"view":true,"manage":true},"clients":{"view":true}}'::jsonb),
    (p_workspace_id, 'Client', 'Client portal access only', true,
     '{"dashboard":{"view":true},"projects":{"view":true},"milestones":{"view":true,"approve":true},"revisions":{"view":true,"create":true},"files":{"view":true},"invoices":{"view":true}}'::jsonb)
  on conflict (workspace_id, name) do nothing;
end;
$$;

-- Seed roles for existing workspaces
do $$
declare
  r record;
begin
  for r in select id from workspaces loop
    perform seed_default_roles(r.id);
  end loop;
end;
$$;
