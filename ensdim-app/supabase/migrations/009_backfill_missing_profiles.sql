-- ═══════════════════════════════════════════════════════════════════
-- ENSDIM — Backfill missing profiles
--
-- Some auth.users rows (created before the single-workspace fix, or
-- seeded directly without going through handle_new_user()) have no
-- matching row in `profiles`. Because the `profiles_select` RLS policy
-- relies on get_my_workspace_id() = (select workspace_id from profiles
-- where id = auth.uid()), a user with no profile row gets NULL back
-- and sees ZERO rows everywhere — including the admin dashboard.
--
-- This backfills a profile (and notification_preferences row) for any
-- auth.users entry that's missing one, joining the single Ensdim
-- workspace and using the role/name from their auth metadata.
--
-- Run this in the Supabase SQL Editor.
-- ═══════════════════════════════════════════════════════════════════

do $$
declare
  v_workspace_id uuid;
begin
  select id into v_workspace_id from workspaces order by created_at asc limit 1;

  insert into profiles (id, workspace_id, name, role)
  select
    u.id,
    v_workspace_id,
    coalesce(u.raw_user_meta_data ->> 'name', split_part(u.email, '@', 1)),
    coalesce(u.raw_user_meta_data ->> 'role', 'client')
  from auth.users u
  left join profiles p on p.id = u.id
  where p.id is null;

  insert into notification_preferences (user_id)
  select u.id
  from auth.users u
  left join notification_preferences np on np.user_id = u.id
  where np.user_id is null
  on conflict (user_id) do nothing;
end $$;
