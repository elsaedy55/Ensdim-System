-- ═══════════════════════════════════════════════════════════════════
-- ENSDIM — Allow Windows executables/installers in the project-files
-- bucket.
--
-- Browsers report .exe files with MIME types like
-- "application/x-msdownload" or "application/x-dosexec" rather than
-- the "application/octet-stream" catch-all added in 016, so uploads
-- of .exe (and similar) files were rejected with 415 "mime type ...
-- is not supported".
--
-- Run this in the Supabase SQL Editor.
-- ═══════════════════════════════════════════════════════════════════

update storage.buckets
set allowed_mime_types = array_cat(allowed_mime_types, array[
      'application/x-msdownload','application/x-dosexec','application/x-msdos-program',
      'application/x-ms-installer','application/vnd.microsoft.portable-executable'
    ])
where id = 'project-files'
  and not (allowed_mime_types @> array['application/x-msdownload']);
