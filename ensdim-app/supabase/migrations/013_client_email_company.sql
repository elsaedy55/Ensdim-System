-- ═══════════════════════════════════════════════════════════════════
-- ENSDIM — Add email & company to client profiles
--
-- The admin "Add Client" form already collects an email and company
-- name, but neither was persisted on the profile, so the admin
-- dashboard couldn't display them. This denormalizes auth.users.email
-- and adds a company column, populated on signup/invite and backfilled
-- for existing users.
--
-- Run this in the Supabase SQL Editor.
-- ═══════════════════════════════════════════════════════════════════

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email   TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS company TEXT;

-- Backfill email for existing profiles from auth.users
UPDATE profiles p
SET email = u.email
FROM auth.users u
WHERE p.id = u.id AND p.email IS NULL;

-- Recreate the new-user trigger to also store email & company
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
  v_company      text;
begin
  v_name         := new.raw_user_meta_data ->> 'name';
  v_role         := coalesce(new.raw_user_meta_data ->> 'role', 'client');
  v_workspace_id := (new.raw_user_meta_data ->> 'workspace_id')::uuid;
  v_company      := new.raw_user_meta_data ->> 'company';

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
  insert into profiles (id, workspace_id, name, role, email, company)
  values (new.id, v_workspace_id, coalesce(v_name, split_part(new.email, '@', 1)), v_role, new.email, v_company);

  -- Create default notification preferences
  insert into notification_preferences (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;
