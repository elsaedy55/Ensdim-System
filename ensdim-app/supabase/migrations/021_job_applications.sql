-- ═══════════════════════════════════════════════════════════════════
-- ENSDIM — Job Applications (Careers page submissions)
-- Run this in the Supabase SQL Editor.
-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS job_applications (
  id                   UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  status               TEXT        NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'shortlisted', 'rejected', 'hired')),

  -- Personal information
  full_name            TEXT        NOT NULL,
  email                TEXT        NOT NULL,
  whatsapp             TEXT        NOT NULL,
  country              TEXT        NOT NULL,
  city                 TEXT,

  -- Role information
  position             TEXT        NOT NULL,
  career_category       TEXT,
  experience_level      TEXT        NOT NULL,

  -- Experience
  current_job_title     TEXT,
  previous_job_title    TEXT,
  years_of_experience   TEXT        NOT NULL,
  previous_companies    TEXT,
  key_projects          TEXT,
  tools_skills          TEXT        NOT NULL,
  portfolio_url         TEXT,

  -- Work preferences
  availability          TEXT        NOT NULL,
  work_type_preference  TEXT        NOT NULL,

  -- Files (private storage paths, resolved to signed URLs on read)
  cv_path               TEXT        NOT NULL,
  portfolio_file_path   TEXT,

  -- Questions
  why_ensdim             TEXT        NOT NULL,
  strongest_experience   TEXT        NOT NULL,
  preferred_project_type TEXT,

  -- Tracking — where the application came from
  source_page          TEXT,
  career_role          TEXT,
  interest_type        TEXT,
  language             TEXT,

  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_job_applications_status     ON job_applications (status);
CREATE INDEX IF NOT EXISTS idx_job_applications_created_at ON job_applications (created_at DESC);

-- ─── RLS ──────────────────────────────────────────────────────────────────────

ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- The public website submits applications anonymously
CREATE POLICY "Public can submit job applications"
  ON job_applications FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated admin staff can read / manage applications
CREATE POLICY "Admin read job applications"
  ON job_applications FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin update job applications"
  ON job_applications FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin delete job applications"
  ON job_applications FOR DELETE
  TO authenticated
  USING (true);

-- ─── Storage bucket for CVs / portfolios ─────────────────────────────────────

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'job-applications', 'job-applications', false, 20971520, -- 20 MB
  ARRAY['application/pdf','application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/zip','application/x-zip-compressed','application/x-rar-compressed']
) ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "job_applications_files_insert" ON storage.objects;
DROP POLICY IF EXISTS "job_applications_files_read"   ON storage.objects;
DROP POLICY IF EXISTS "job_applications_files_delete" ON storage.objects;

-- job-applications: anyone (anonymous applicants) can upload
CREATE POLICY "job_applications_files_insert" ON storage.objects
  FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'job-applications');

-- job-applications: only admin staff can read (signed URLs are generated server/client-side by authenticated admins)
CREATE POLICY "job_applications_files_read" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'job-applications');

-- job-applications: only admin staff can delete
CREATE POLICY "job_applications_files_delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'job-applications');
