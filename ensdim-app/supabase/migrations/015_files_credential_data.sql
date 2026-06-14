-- ═══════════════════════════════════════════════════════════════════
-- ENSDIM — Support structured credential entries in the files table
--
-- The "credentials" file category was previously just an uploaded
-- file (e.g. a PDF/text doc with logins). Admins now need to enter
-- structured login data (url/email/username/password/notes) directly
-- without uploading a file, so storage_path/size/mime_type must be
-- nullable and we need a place to store that structured data.
--
-- Run this in the Supabase SQL Editor.
-- ═══════════════════════════════════════════════════════════════════

alter table files
  alter column storage_path drop not null,
  alter column size          drop not null,
  alter column mime_type     drop not null;

alter table files
  add column if not exists credential_data jsonb;

alter table files
  add constraint files_storage_or_credential_check
    check (storage_path is not null or credential_data is not null);
