-- ═══════════════════════════════════════════════════════════════════
-- ENSDIM — Website Inquiries (Consultation bookings + Contact messages)
-- Run this in the Supabase SQL Editor.
-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS inquiries (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  type            TEXT        NOT NULL DEFAULT 'consultation' CHECK (type IN ('consultation', 'contact')),
  status          TEXT        NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),

  -- Required contact fields
  name            TEXT        NOT NULL,
  whatsapp        TEXT        NOT NULL,

  -- Optional contact fields
  email           TEXT,
  company         TEXT,
  role            TEXT,
  country         TEXT,

  -- Consultation-specific
  challenge       TEXT,
  budget          TEXT,
  details         TEXT,

  -- Contact-specific
  message         TEXT,

  -- Tracking — where the lead came from
  source_page     TEXT,
  interest_type   TEXT,
  clicked_item    TEXT,
  language        TEXT,

  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_inquiries_status     ON inquiries (status);
CREATE INDEX IF NOT EXISTS idx_inquiries_type       ON inquiries (type);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries (created_at DESC);

-- ─── RLS ──────────────────────────────────────────────────────────────────────

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- The public website submits inquiries anonymously
CREATE POLICY "Public can submit inquiries"
  ON inquiries FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated admin staff can read / manage inquiries
CREATE POLICY "Admin read inquiries"
  ON inquiries FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin update inquiries"
  ON inquiries FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin delete inquiries"
  ON inquiries FOR DELETE
  TO authenticated
  USING (true);
