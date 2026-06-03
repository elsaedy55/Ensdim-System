-- ═══════════════════════════════════════════════════════════════════
-- ENSDIM — Supabase Storage Buckets + Policies (idempotent)
-- Run AFTER 002_rls.sql
-- ═══════════════════════════════════════════════════════════════════

-- ─── Buckets (on conflict do nothing = safe to re-run) ────────────

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'project-files', 'project-files', false, 52428800,
  array['image/jpeg','image/png','image/gif','image/webp','image/svg+xml',
        'application/pdf','application/zip','application/x-rar-compressed',
        'video/mp4','video/mov','video/quicktime',
        'text/plain','application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/octet-stream']
) on conflict (id) do nothing;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'avatars', 'avatars', true, 2097152,
  array['image/jpeg','image/png','image/webp']
) on conflict (id) do nothing;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'payment-proofs', 'payment-proofs', false, 5242880,
  array['image/jpeg','image/png','application/pdf']
) on conflict (id) do nothing;

-- ─── Drop existing storage policies (idempotent) ─────────────────

drop policy if exists "project_files_read"   on storage.objects;
drop policy if exists "project_files_insert" on storage.objects;
drop policy if exists "project_files_delete" on storage.objects;
drop policy if exists "avatars_read"         on storage.objects;
drop policy if exists "avatars_insert"       on storage.objects;
drop policy if exists "avatars_update"       on storage.objects;
drop policy if exists "payment_proofs_read"  on storage.objects;
drop policy if exists "payment_proofs_insert" on storage.objects;

-- ─── Storage Policies ────────────────────────────────────────────

-- project-files: authenticated users can read
create policy "project_files_read" on storage.objects
  for select using (
    bucket_id = 'project-files' and auth.role() = 'authenticated'
  );

-- project-files: authenticated users can upload
create policy "project_files_insert" on storage.objects
  for insert with check (
    bucket_id = 'project-files' and auth.role() = 'authenticated'
  );

-- project-files: users can delete their own files
create policy "project_files_delete" on storage.objects
  for delete using (
    bucket_id = 'project-files'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- avatars: public read (public bucket)
create policy "avatars_read" on storage.objects
  for select using (bucket_id = 'avatars');

-- avatars: users can upload their own avatar
create policy "avatars_insert" on storage.objects
  for insert with check (
    bucket_id = 'avatars'
    and auth.role() = 'authenticated'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- avatars: users can update their own avatar
create policy "avatars_update" on storage.objects
  for update using (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- payment-proofs: authenticated users can read
create policy "payment_proofs_read" on storage.objects
  for select using (
    bucket_id = 'payment-proofs' and auth.role() = 'authenticated'
  );

-- payment-proofs: authenticated users can upload
create policy "payment_proofs_insert" on storage.objects
  for insert with check (
    bucket_id = 'payment-proofs' and auth.role() = 'authenticated'
  );
