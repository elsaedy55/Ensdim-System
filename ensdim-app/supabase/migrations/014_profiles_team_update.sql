-- ═══════════════════════════════════════════════════════════════════
-- ENSDIM — Allow team members to update client profiles
--
-- profiles only had a "profiles_update_own" policy (id = auth.uid()),
-- so admins/team members could not edit a client's name/phone/company
-- (or even change their pipeline client_status) from the dashboard —
-- those updates were silently rejected by RLS.
--
-- Run this in the Supabase SQL Editor.
-- ═══════════════════════════════════════════════════════════════════

create policy "profiles_update_team" on profiles
  for update
  using      (workspace_id = get_my_workspace_id() and is_team_member())
  with check (workspace_id = get_my_workspace_id() and is_team_member());
