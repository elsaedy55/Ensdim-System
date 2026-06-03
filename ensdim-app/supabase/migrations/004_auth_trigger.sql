-- ═══════════════════════════════════════════════════════════════════
-- ENSDIM — Auth Trigger
-- Auto-creates a profile row when a new user signs up.
-- user_metadata must contain: { name, role, workspace_id }
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

  -- If no workspace_id provided (first admin signup), create a new workspace
  if v_workspace_id is null and v_role = 'admin' then
    insert into workspaces (name)
    values (coalesce(new.raw_user_meta_data ->> 'workspace_name', 'My Agency'))
    returning id into v_workspace_id;
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

-- Trigger fires after every new user is created in auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();
