-- ═══════════════════════════════════════════════════════════════════
-- ENSDIM — Allow APK/AAB, code files and other dev artifacts in
-- the project-files bucket, and raise the per-file size limit.
--
-- The bucket's allowed_mime_types list (set in 003_storage.sql) only
-- covered images/pdf/zip/video/office docs, so Android builds (.apk,
-- .aab), other app/installer formats and most source/code files
-- (.js, .ts, .json, .py, etc.) were rejected. This expands the
-- allowlist to cover those, using application/octet-stream as a
-- catch-all for binary/unknown types (which is what browsers report
-- for .apk/.aab and many code files with no registered mime type).
--
-- NOTE: Supabase also enforces a project-wide "Max upload file size"
-- (Dashboard → Project Settings → Storage), which caps uploads at the
-- LOWER of that value and this bucket's file_size_limit. Raise that
-- setting too if you need files larger than it allows.
--
-- Run this in the Supabase SQL Editor.
-- ═══════════════════════════════════════════════════════════════════

update storage.buckets
set allowed_mime_types = array[
      -- images
      'image/jpeg','image/png','image/gif','image/webp','image/svg+xml','image/x-icon',
      -- documents
      'application/pdf','text/plain','text/csv','text/markdown',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      -- archives
      'application/zip','application/x-zip-compressed','application/x-rar-compressed',
      'application/x-7z-compressed','application/x-tar','application/gzip',
      -- video / audio
      'video/mp4','video/mov','video/quicktime','video/webm','video/x-msvideo',
      'audio/mpeg','audio/wav','audio/ogg',
      -- code / markup / config (mime type as reported by browsers, when set)
      'text/javascript','application/javascript','application/typescript',
      'application/json','application/xml','text/xml','text/html','text/css',
      'application/x-yaml','text/yaml','text/x-python','text/x-java-source',
      'text/x-c','text/x-csrc','text/x-chdr','application/sql',
      -- mobile / app builds + generic binaries (apk, aab, exe, dmg, code files, etc.)
      'application/vnd.android.package-archive','application/octet-stream'
    ],
    file_size_limit = 209715200 -- 200 MB
where id = 'project-files';
