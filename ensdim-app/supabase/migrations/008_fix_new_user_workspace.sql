-- ═══════════════════════════════════════════════════════════════════
-- ENSDIM — Fix new user → workspace assignment
--
-- Ensdim is a single-company system, not multi-tenant SaaS: every user
-- (client or team member) belongs to the SAME Ensdim workspace.
--
-- Previously, public client signups (role = 'client', no workspace_id
-- in metadata) ended up with profiles.workspace_id = NULL because the
-- "create workspace" branch only ran for role = 'admin'. This orphaned
-- every self-registered client from the company workspace.
--
-- Run this in the Supabase SQL Editor.
-- ═══════════════════════════════════════════════════════════════════

create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_workspace_id uuid;
  v_role         text;
  v_name         text;
begin
  v_name         := new.raw_user_meta_data ->> 'name';
  v_role         := coalesce(new.raw_user_meta_data ->> 'role', 'client');
  v_workspace_id := (new.raw_user_meta_data ->> 'workspace_id')::uuid;

  -- No workspace_id provided (public signup) → join Ensdim's single workspace.
  if v_workspace_id is null then
    select id into v_workspace_id from workspaces order by created_at asc limit 1;

    -- Bootstrap: no workspace exists yet (very first user ever) → create it.
    if v_workspace_id is null then
      insert into workspaces (name)
      values (coalesce(new.raw_user_meta_data ->> 'workspace_name', 'Ensdim'))
      returning id into v_workspace_id;
    end if;
  end if;

  -- Create the profile
  insert into profiles (id, workspace_id, name, role)
  values (new.id, v_workspace_id, coalesce(v_name, split_part(new.email, '@', 1)), v_role);

  -- Create default notification preferences
  insert into notification_preferences (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;
