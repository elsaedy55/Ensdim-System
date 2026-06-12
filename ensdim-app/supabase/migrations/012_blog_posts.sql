-- Blog posts manageable from the admin dashboard, published to ensdim.com/blog.

-- ─── Table ────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS blog_posts (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en     TEXT        NOT NULL,
  title_ar     TEXT        NOT NULL,
  slug         TEXT        UNIQUE NOT NULL,
  category_en  TEXT        NOT NULL DEFAULT 'General',
  category_ar  TEXT        NOT NULL DEFAULT 'عام',
  description_en TEXT      NOT NULL DEFAULT '',
  description_ar TEXT      NOT NULL DEFAULT '',
  content_en   TEXT        NOT NULL DEFAULT '',
  content_ar   TEXT        NOT NULL DEFAULT '',
  read_time    INTEGER     NOT NULL DEFAULT 5,
  image_url    TEXT,
  is_published BOOLEAN     NOT NULL DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── RLS ──────────────────────────────────────────────────────────────────────

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public can read published posts (for the website)
CREATE POLICY "Public read published blog posts"
  ON blog_posts FOR SELECT
  TO anon
  USING (is_published = true);

-- Authenticated users (admin) can read all posts
CREATE POLICY "Admin read all blog posts"
  ON blog_posts FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can insert, update, delete
CREATE POLICY "Admin manage blog posts"
  ON blog_posts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ─── Storage Bucket ───────────────────────────────────────────────────────────

INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public view blog images"  ON storage.objects;
DROP POLICY IF EXISTS "Admin upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Admin update blog images" ON storage.objects;
DROP POLICY IF EXISTS "Admin delete blog images" ON storage.objects;

CREATE POLICY "Public view blog images"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'blog-images');

CREATE POLICY "Admin upload blog images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'blog-images');

CREATE POLICY "Admin update blog images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING  (bucket_id = 'blog-images')
  WITH CHECK (bucket_id = 'blog-images');

CREATE POLICY "Admin delete blog images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'blog-images');
