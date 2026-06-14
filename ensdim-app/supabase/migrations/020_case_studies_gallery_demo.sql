-- Add an optional image gallery and demo link to case studies.

ALTER TABLE case_studies
  ADD COLUMN IF NOT EXISTS gallery_images TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS demo_url       TEXT;
