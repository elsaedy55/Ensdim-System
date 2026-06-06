-- Run this in your Supabase SQL Editor to set up the research articles system.

-- ─── Table ────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS research_articles (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en     TEXT        NOT NULL,
  title_ar     TEXT        NOT NULL,
  slug         TEXT        UNIQUE NOT NULL,
  category_en  TEXT        NOT NULL DEFAULT 'Research',
  category_ar  TEXT        NOT NULL DEFAULT 'أبحاث',
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

ALTER TABLE research_articles ENABLE ROW LEVEL SECURITY;

-- Public can read published articles (for the website)
CREATE POLICY "Public read published research"
  ON research_articles FOR SELECT
  TO anon
  USING (is_published = true);

-- Authenticated users (admin) can read all articles
CREATE POLICY "Admin read all research"
  ON research_articles FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can insert, update, delete
CREATE POLICY "Admin manage research"
  ON research_articles FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ─── Storage Bucket ───────────────────────────────────────────────────────────

INSERT INTO storage.buckets (id, name, public)
VALUES ('research-images', 'research-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Drop first to avoid conflicts on re-run
DROP POLICY IF EXISTS "Public view research images"  ON storage.objects;
DROP POLICY IF EXISTS "Admin upload research images" ON storage.objects;
DROP POLICY IF EXISTS "Admin update research images" ON storage.objects;
DROP POLICY IF EXISTS "Admin delete research images" ON storage.objects;

CREATE POLICY "Public view research images"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'research-images');

CREATE POLICY "Admin upload research images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'research-images');

CREATE POLICY "Admin update research images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING  (bucket_id = 'research-images')
  WITH CHECK (bucket_id = 'research-images');

CREATE POLICY "Admin delete research images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'research-images');

-- ─── Seed: existing article from the website ──────────────────────────────────

INSERT INTO research_articles (
  title_en, title_ar, slug, category_en, category_ar,
  description_en, description_ar,
  content_en, content_ar,
  read_time, is_published, published_at
) VALUES (
  'Why businesses lose leads even when demand exists',
  'لماذا تخسر بعض الأعمال العملاء المحتملين رغم وجود الطلب',
  'why-businesses-lose-leads',
  'Conversion', 'التحويل',
  'Weak follow-up, scattered workflows, and unclear customer journeys reduce conversion even when marketing is working.',
  'تؤدي المتابعة الضعيفة وتشتت سير العمل ورحلات العملاء غير الواضحة إلى انخفاض التحويل حتى عندما يعمل التسويق بشكل جيد.',
  E'## Introduction\n\nMany businesses operate in markets with genuine, sufficient demand. Ads work. Inquiries arrive. But conversion rates stay mysteriously low. The reason, in most cases, is not marketing — it is what happens after the first inquiry.\n\n## The hidden problem\n\nThe hidden problem is the follow-up gap. Most businesses respond to the first inquiry reasonably fast. But what happens next? In most cases: nothing structured.\n\n## Why follow-up breaks\n\n- Reliance on memory and goodwill instead of structured systems.\n- No unified database collecting all leads.\n- A busy team with no time for consistent manual follow-up.\n- No notifications, no reminders, no clear accountability.\n\n## The WhatsApp dependency issue\n\nWhatsApp is an excellent communication tool. But it is not a follow-up system. When used as a customer database, it becomes chaotic beyond twenty active conversations. Messages get buried, history is lost, and the team loses context.\n\n## What better systems change\n\nBetter systems ensure no lead slips through, give management real-time visibility, automate routine outreach, and improve the close rate through consistent follow-up.\n\n## Practical takeaway\n\nIf you have inquiries but low conversion, the problem is likely not marketing. Start by reviewing what happens after the first message. Identify the follow-up gaps. Then build a system that closes those gaps automatically.',
  E'## المقدمة\n\nكثير من الأعمال التجارية تعمل في أسواق بها طلب حقيقي وكافٍ. الإعلانات تعمل. الاستفسارات تأتي. لكن معدلات التحويل تبقى منخفضة بشكل محير. السبب في أغلب الأحيان ليس التسويق — إنه ما يحدث بعد الاستفسار الأول.\n\n## المشكلة الخفية\n\nالمشكلة الخفية هي فجوة المتابعة. معظم الأعمال تستجيب للاستفسار الأول بسرعة معقولة. لكن ماذا يحدث بعد ذلك؟ في أغلب الحالات: لا شيء منظم.\n\n## لماذا تنهار المتابعة\n\n- الاعتماد على الذاكرة والنوايا الحسنة بدلاً من أنظمة منظمة.\n- غياب قاعدة بيانات موحدة تجمع كل العملاء المحتملين.\n- فريق مشغول لا وقت لديه للمتابعة اليدوية المنتظمة.\n- لا إشعارات، لا تذكيرات، لا مسؤولية واضحة.\n\n## مشكلة الاعتماد على الواتساب\n\nالواتساب أداة تواصل ممتازة. لكنه ليس نظام متابعة. حين يُستخدم كقاعدة بيانات للعملاء، يصبح فوضوياً بعد عشرين محادثة نشطة.\n\n## الخلاصة العملية\n\nإذا كانت لديك استفسارات لكن معدل التحويل منخفض، المشكلة على الأرجح ليست في التسويق. ابدأ بمراجعة ما يحدث بعد أول رسالة. حدد الفجوات في المتابعة. ثم ابنِ نظاماً يسد هذه الفجوات تلقائياً.',
  6, true, NOW()
) ON CONFLICT (slug) DO NOTHING;
