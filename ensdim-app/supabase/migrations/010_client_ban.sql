-- ═══════════════════════════════════════════════════════════════════
-- ENSDIM — Client ban support
--
-- Adds `banned_until` to profiles so the admin dashboard can display a
-- client's ban status (the actual login block is enforced by Supabase
-- Auth via auth.admin.updateUserById ban_duration, set from the
-- /api/admin/clients/[id] route).
--
-- Run this in the Supabase SQL Editor.
-- ═══════════════════════════════════════════════════════════════════

alter table profiles add column if not exists banned_until timestamptz;
