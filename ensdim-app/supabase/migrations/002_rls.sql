-- ═══════════════════════════════════════════════════════════════════
-- ENSDIM — Row Level Security Policies (idempotent)
-- Run AFTER 001_schema.sql
-- ═══════════════════════════════════════════════════════════════════

-- ─── Helper functions ─────────────────────────────────────────────

create or replace function get_my_workspace_id()
returns uuid language sql security definer stable as $$
  select workspace_id from profiles where id = auth.uid();
$$;

create or replace function get_my_role()
returns text language sql security definer stable as $$
  select role from profiles where id = auth.uid();
$$;

create or replace function is_team_member()
returns boolean language sql security definer stable as $$
  select coalesce((select role <> 'client' from profiles where id = auth.uid()), false);
$$;

-- ═══════════════════════════════════════════════════════════════════
-- ENABLE RLS ON ALL TABLES
-- ═══════════════════════════════════════════════════════════════════

alter table workspaces                enable row level security;
alter table profiles                  enable row level security;
alter table projects                  enable row level security;
alter table project_members           enable row level security;
alter table milestones                enable row level security;
alter table files                     enable row level security;
alter table revisions                 enable row level security;
alter table revision_attachments      enable row level security;
alter table invoices                  enable row level security;
alter table invoice_line_items        enable row level security;
alter table notifications             enable row level security;
alter table notification_preferences  enable row level security;
alter table activity_logs             enable row level security;

-- ═══════════════════════════════════════════════════════════════════
-- DROP EXISTING POLICIES (idempotent re-run safety)
-- ═══════════════════════════════════════════════════════════════════

drop policy if exists "workspace_select"              on workspaces;
drop policy if exists "workspace_update"              on workspaces;
drop policy if exists "profiles_select"               on profiles;
drop policy if exists "profiles_update_own"           on profiles;
drop policy if exists "profiles_insert"               on profiles;
drop policy if exists "projects_select"               on projects;
drop policy if exists "projects_write"                on projects;
drop policy if exists "project_members_select"        on project_members;
drop policy if exists "project_members_write"         on project_members;
drop policy if exists "milestones_select"             on milestones;
drop policy if exists "milestones_write"              on milestones;
drop policy if exists "milestones_client_approve"     on milestones;
drop policy if exists "files_select"                  on files;
drop policy if exists "files_insert"                  on files;
drop policy if exists "files_delete"                  on files;
drop policy if exists "revisions_select"              on revisions;
drop policy if exists "revisions_client_insert"       on revisions;
drop policy if exists "revisions_team_update"         on revisions;
drop policy if exists "revision_attachments_select"   on revision_attachments;
drop policy if exists "revision_attachments_insert"   on revision_attachments;
drop policy if exists "invoices_select"               on invoices;
drop policy if exists "invoices_team_write"           on invoices;
drop policy if exists "invoices_client_proof"         on invoices;
drop policy if exists "line_items_select"             on invoice_line_items;
drop policy if exists "line_items_write"              on invoice_line_items;
drop policy if exists "notifications_select"          on notifications;
drop policy if exists "notifications_update"          on notifications;
drop policy if exists "notifications_insert"          on notifications;
drop policy if exists "notif_prefs_own"               on notification_preferences;
drop policy if exists "activity_select"               on activity_logs;
drop policy if exists "activity_insert"               on activity_logs;

-- ═══════════════════════════════════════════════════════════════════
-- WORKSPACES
-- ═══════════════════════════════════════════════════════════════════

create policy "workspace_select" on workspaces
  for select using (id = get_my_workspace_id());

create policy "workspace_update" on workspaces
  for update using (id = get_my_workspace_id() and get_my_role() = 'admin');

-- ═══════════════════════════════════════════════════════════════════
-- PROFILES
-- ═══════════════════════════════════════════════════════════════════

create policy "profiles_select" on profiles
  for select using (workspace_id = get_my_workspace_id());

create policy "profiles_update_own" on profiles
  for update using (id = auth.uid());

create policy "profiles_insert" on profiles
  for insert with check (id = auth.uid());

-- ═══════════════════════════════════════════════════════════════════
-- PROJECTS
-- ═══════════════════════════════════════════════════════════════════

create policy "projects_select" on projects
  for select using (
    workspace_id = get_my_workspace_id()
    and (is_team_member() or client_id = auth.uid())
  );

create policy "projects_write" on projects
  for all using (workspace_id = get_my_workspace_id() and is_team_member());

-- ═══════════════════════════════════════════════════════════════════
-- PROJECT MEMBERS
-- ═══════════════════════════════════════════════════════════════════

create policy "project_members_select" on project_members
  for select using (
    exists (
      select 1 from projects p
      where p.id = project_id
        and p.workspace_id = get_my_workspace_id()
        and (is_team_member() or p.client_id = auth.uid())
    )
  );

create policy "project_members_write" on project_members
  for all using (
    exists (
      select 1 from projects p
      where p.id = project_id
        and p.workspace_id = get_my_workspace_id()
        and is_team_member()
    )
  );

-- ═══════════════════════════════════════════════════════════════════
-- MILESTONES
-- ═══════════════════════════════════════════════════════════════════

create policy "milestones_select" on milestones
  for select using (
    exists (
      select 1 from projects p
      where p.id = project_id
        and p.workspace_id = get_my_workspace_id()
        and (is_team_member() or p.client_id = auth.uid())
    )
  );

create policy "milestones_write" on milestones
  for all using (
    exists (
      select 1 from projects p
      where p.id = project_id
        and p.workspace_id = get_my_workspace_id()
        and is_team_member()
    )
  );

create policy "milestones_client_approve" on milestones
  for update using (
    exists (select 1 from projects p where p.id = project_id and p.client_id = auth.uid())
  ) with check (status in ('approved'));

-- ═══════════════════════════════════════════════════════════════════
-- FILES
-- ═══════════════════════════════════════════════════════════════════

create policy "files_select" on files
  for select using (
    exists (
      select 1 from projects p
      where p.id = project_id
        and p.workspace_id = get_my_workspace_id()
        and (is_team_member() or p.client_id = auth.uid())
    )
  );

create policy "files_insert" on files
  for insert with check (
    exists (
      select 1 from projects p
      where p.id = project_id and p.workspace_id = get_my_workspace_id()
    )
    and uploaded_by = auth.uid()
  );

create policy "files_delete" on files
  for delete using (uploaded_by = auth.uid() or is_team_member());

-- ═══════════════════════════════════════════════════════════════════
-- REVISIONS
-- ═══════════════════════════════════════════════════════════════════

create policy "revisions_select" on revisions
  for select using (
    exists (
      select 1 from projects p
      where p.id = project_id
        and p.workspace_id = get_my_workspace_id()
        and (is_team_member() or p.client_id = auth.uid())
    )
  );

create policy "revisions_client_insert" on revisions
  for insert with check (
    exists (select 1 from projects p where p.id = project_id and p.client_id = auth.uid())
    and submitted_by = auth.uid()
  );

create policy "revisions_team_update" on revisions
  for update using (
    exists (
      select 1 from projects p
      where p.id = project_id
        and p.workspace_id = get_my_workspace_id()
        and is_team_member()
    )
  );

-- ═══════════════════════════════════════════════════════════════════
-- REVISION ATTACHMENTS
-- ═══════════════════════════════════════════════════════════════════

create policy "revision_attachments_select" on revision_attachments
  for select using (
    exists (
      select 1 from revisions r
      join projects p on p.id = r.project_id
      where r.id = revision_id
        and p.workspace_id = get_my_workspace_id()
        and (is_team_member() or p.client_id = auth.uid())
    )
  );

create policy "revision_attachments_insert" on revision_attachments
  for insert with check (
    exists (
      select 1 from revisions r
      join projects p on p.id = r.project_id
      where r.id = revision_id
        and (is_team_member() or p.client_id = auth.uid())
    )
  );

-- ═══════════════════════════════════════════════════════════════════
-- INVOICES
-- ═══════════════════════════════════════════════════════════════════

create policy "invoices_select" on invoices
  for select using (
    exists (
      select 1 from projects p
      where p.id = project_id
        and p.workspace_id = get_my_workspace_id()
        and (is_team_member() or p.client_id = auth.uid())
    )
  );

create policy "invoices_team_write" on invoices
  for all using (
    exists (
      select 1 from projects p
      where p.id = project_id
        and p.workspace_id = get_my_workspace_id()
        and is_team_member()
    )
  );

create policy "invoices_client_proof" on invoices
  for update using (client_id = auth.uid())
  with check (client_id = auth.uid());

-- ═══════════════════════════════════════════════════════════════════
-- INVOICE LINE ITEMS
-- ═══════════════════════════════════════════════════════════════════

create policy "line_items_select" on invoice_line_items
  for select using (
    exists (
      select 1 from invoices i
      join projects p on p.id = i.project_id
      where i.id = invoice_id
        and p.workspace_id = get_my_workspace_id()
        and (is_team_member() or i.client_id = auth.uid())
    )
  );

create policy "line_items_write" on invoice_line_items
  for all using (
    exists (
      select 1 from invoices i
      join projects p on p.id = i.project_id
      where i.id = invoice_id
        and p.workspace_id = get_my_workspace_id()
        and is_team_member()
    )
  );

-- ═══════════════════════════════════════════════════════════════════
-- NOTIFICATIONS
-- ═══════════════════════════════════════════════════════════════════

create policy "notifications_select" on notifications
  for select using (user_id = auth.uid());

create policy "notifications_update" on notifications
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "notifications_insert" on notifications
  for insert with check (
    exists (
      select 1 from profiles
      where id = user_id and workspace_id = get_my_workspace_id()
    )
  );

-- ═══════════════════════════════════════════════════════════════════
-- NOTIFICATION PREFERENCES
-- ═══════════════════════════════════════════════════════════════════

create policy "notif_prefs_own" on notification_preferences
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ═══════════════════════════════════════════════════════════════════
-- ACTIVITY LOGS
-- ═══════════════════════════════════════════════════════════════════

create policy "activity_select" on activity_logs
  for select using (
    exists (
      select 1 from projects p
      where p.id = project_id
        and p.workspace_id = get_my_workspace_id()
        and (is_team_member() or p.client_id = auth.uid())
    )
  );

create policy "activity_insert" on activity_logs
  for insert with check (user_id = auth.uid());
