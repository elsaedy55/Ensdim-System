-- Case studies manageable from the admin dashboard, published to ensdim.com/case-studies.

-- ─── Table ────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS case_studies (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT        UNIQUE NOT NULL,

  title_en    TEXT        NOT NULL,
  title_ar    TEXT        NOT NULL,
  sector_en   TEXT        NOT NULL DEFAULT '',
  sector_ar   TEXT        NOT NULL DEFAULT '',

  -- Summary shown on the case studies listing card
  card_problem_en  TEXT   NOT NULL DEFAULT '',
  card_problem_ar  TEXT   NOT NULL DEFAULT '',
  card_solution_en TEXT   NOT NULL DEFAULT '',
  card_solution_ar TEXT   NOT NULL DEFAULT '',
  card_impact_en   TEXT   NOT NULL DEFAULT '',
  card_impact_ar   TEXT   NOT NULL DEFAULT '',

  -- Detail page
  outcome_en   TEXT       NOT NULL DEFAULT '',
  outcome_ar   TEXT       NOT NULL DEFAULT '',
  situation_en TEXT       NOT NULL DEFAULT '',
  situation_ar TEXT       NOT NULL DEFAULT '',
  problem_en   TEXT       NOT NULL DEFAULT '',
  problem_ar   TEXT       NOT NULL DEFAULT '',
  built_en     TEXT[]     NOT NULL DEFAULT '{}',
  built_ar     TEXT[]     NOT NULL DEFAULT '{}',
  outcomes_en  TEXT[]     NOT NULL DEFAULT '{}',
  outcomes_ar  TEXT[]     NOT NULL DEFAULT '{}',

  -- Related links shown on the detail page
  solution_title_en     TEXT NOT NULL DEFAULT '',
  solution_title_ar     TEXT NOT NULL DEFAULT '',
  solution_slug         TEXT NOT NULL DEFAULT '',
  problem_page_title_en TEXT NOT NULL DEFAULT '',
  problem_page_title_ar TEXT NOT NULL DEFAULT '',
  problem_page_slug     TEXT NOT NULL DEFAULT '',

  image_url    TEXT,
  sort_order   INTEGER    NOT NULL DEFAULT 0,
  is_published BOOLEAN    NOT NULL DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_case_studies_published ON case_studies (is_published, sort_order);

-- ─── RLS ──────────────────────────────────────────────────────────────────────

ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

-- Public can read published case studies (for the website)
CREATE POLICY "Public read published case studies"
  ON case_studies FOR SELECT
  TO anon
  USING (is_published = true);

-- Authenticated users (admin) can read all case studies
CREATE POLICY "Admin read all case studies"
  ON case_studies FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can insert, update, delete
CREATE POLICY "Admin manage case studies"
  ON case_studies FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ─── Storage Bucket ───────────────────────────────────────────────────────────

INSERT INTO storage.buckets (id, name, public)
VALUES ('case-study-images', 'case-study-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public view case study images"  ON storage.objects;
DROP POLICY IF EXISTS "Admin upload case study images" ON storage.objects;
DROP POLICY IF EXISTS "Admin update case study images" ON storage.objects;
DROP POLICY IF EXISTS "Admin delete case study images" ON storage.objects;

CREATE POLICY "Public view case study images"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'case-study-images');

CREATE POLICY "Admin upload case study images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'case-study-images');

CREATE POLICY "Admin update case study images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING  (bucket_id = 'case-study-images')
  WITH CHECK (bucket_id = 'case-study-images');

CREATE POLICY "Admin delete case study images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'case-study-images');

-- ─── Seed: migrate the 5 case studies previously hardcoded on the website ──────

INSERT INTO case_studies (
  slug, title_en, title_ar, sector_en, sector_ar,
  card_problem_en, card_problem_ar, card_solution_en, card_solution_ar, card_impact_en, card_impact_ar,
  outcome_en, outcome_ar, situation_en, situation_ar, problem_en, problem_ar,
  built_en, built_ar, outcomes_en, outcomes_ar,
  solution_title_en, solution_title_ar, solution_slug,
  problem_page_title_en, problem_page_title_ar, problem_page_slug,
  sort_order, is_published, published_at
) VALUES
(
  'scattered-follow-up',
  'From scattered follow-up to a clearer operating system', 'من متابعة مشتتة إلى نظام تشغيلي أوضح',
  'Service Business', 'أعمال خدمية',
  'Manual follow-up', 'متابعة يدوية', 'CRM + dashboard', 'CRM + لوحة تحكم', 'Clearer visibility', 'وضوح أكبر',
  'A service business reduced missed leads by organizing follow-up into a structured CRM workflow.',
  'قلّل عمل خدمي العملاء الفائتين بتنظيم المتابعة في سير عمل CRM منظمة.',
  'A mid-size service business was receiving 60+ inquiries per week through WhatsApp, phone calls, and website forms. No one knew which leads were new, which needed follow-up, and which had converted.',
  'كان عمل خدمي متوسط الحجم يستقبل أكثر من 60 استفساراً أسبوعياً عبر واتساب، المكالمات، ونماذج الموقع. لم يكن أحد يعلم أي العملاء المحتملين جدد، أيهم يحتاج متابعة، وأيهم حوّل.',
  'Follow-up was inconsistent. High-potential leads went cold because no one followed up on time. The sales team didn''t have a shared view, and the owner had no visibility.',
  'كانت المتابعة غير متسقة. العملاء المحتملون ذوو الإمكانية العالية يبردون لأنه لا أحد يتابع في الوقت المناسب.',
  ARRAY['Unified CRM with lead pipeline', 'WhatsApp & form integration', 'Automated follow-up reminders', 'Status-based workflows', 'Weekly performance dashboard'],
  ARRAY['CRM موحد مع مسار العميل المحتمل', 'تكامل واتساب والنماذج', 'تذكيرات متابعة تلقائية', 'سير عمل قائمة على الحالة', 'لوحة أداء أسبوعية'],
  ARRAY['40% fewer missed leads', 'Follow-up response time reduced from 24h to under 2h', 'Team no longer relies on memory', 'Management has clear weekly view'],
  ARRAY['40% عملاء فائتون أقل', 'وقت استجابة المتابعة من 24 ساعة لأقل من ساعتين', 'الفريق لم يعد يعتمد على الذاكرة', 'الإدارة لديها رؤية أسبوعية واضحة'],
  'Follow-Up Systems', 'أنظمة المتابعة', 'follow-up-systems',
  'Leads get lost', 'العملاء المحتملون يضيعون', 'leads-get-lost',
  0, true, NOW()
),
(
  'faster-response',
  'Faster response for a service business', 'استجابة أسرع لعمل خدمي',
  'Healthcare', 'رعاية صحية',
  'Slow replies', 'بطء في الرد', 'Automation + follow-up flow', 'أتمتة + مسار متابعة', 'Faster response', 'استجابة أسرع',
  'An automation layer reduced first response time from hours to minutes.',
  'قلّلت طبقة الأتمتة وقت الاستجابة الأول من ساعات لدقائق.',
  'A healthcare services business was losing potential patients because response to inquiries was slow — sometimes 6–12 hours. Patients would contact multiple providers and choose whoever responded first.',
  'كان عمل خدمات صحية يخسر مرضى محتملين لأن الاستجابة للاستفسارات كانت بطيئة — أحياناً 6-12 ساعة. المرضى يتواصلون مع مزودين متعددين ويختارون من يرد أولاً.',
  'The front desk team manually read every WhatsApp message. Peak hours created a backlog. No system existed to route inquiries or send instant acknowledgments.',
  'كان فريق الاستقبال يقرأ كل رسالة واتساب يدوياً. ساعات الذروة خلقت تراكماً. لم يكن هناك نظام للتوجيه أو الردود الفورية.',
  ARRAY['Automated instant acknowledgment', 'Smart routing based on inquiry type', 'Escalation triggers for urgent requests', 'After-hours response handling', 'Response time tracking dashboard'],
  ARRAY['رد فوري تلقائي', 'توجيه ذكي حسب نوع الاستفسار', 'محفزات تصعيد للطلبات العاجلة', 'معالجة ما بعد ساعات العمل', 'لوحة تتبع وقت الاستجابة'],
  ARRAY['First response under 3 minutes', 'Patient loss to competitors reduced by 35%', 'Front desk load reduced significantly', 'SLA visibility for management'],
  ARRAY['الرد الأول في أقل من 3 دقائق', 'انخفاض خسارة المرضى للمنافسين 35%', 'انخفاض كبير في حمل الاستقبال', 'رؤية SLA للإدارة'],
  'Automation Layers', 'طبقات الأتمتة', 'automation-layers',
  'Customers wait too long', 'العملاء ينتظرون طويلاً', 'slow-response',
  1, true, NOW()
),
(
  'clearer-visibility',
  'Clearer dashboards for growing operations', 'لوحات تحكم أوضح للعمليات النامية',
  'Real Estate', 'عقارات',
  'No visibility', 'لا رؤية', 'Dashboards + reporting', 'لوحات تحكم + تقارير', 'Better management', 'إدارة أفضل',
  'A management team replaced spreadsheets and WhatsApp reports with live dashboards.',
  'استبدل فريق الإدارة جداول البيانات وتقارير واتساب بلوحات تحكم مباشرة.',
  'A growing real estate agency had 8 agents and 3 managers. Every Monday, someone spent hours pulling reports from different sources — often wrong and outdated by Tuesday.',
  'كانت وكالة عقارات نامية لديها 8 وكلاء و3 مدراء. كل إثنين، شخص ما يقضي ساعات يجمع تقارير من مصادر مختلفة — كثيراً ما تكون خاطئة وقديمة يوم الثلاثاء.',
  'No real-time data. Performance reviews were based on incomplete information. Management couldn''t see which agents were active, which leads were hot, or where bottlenecks were.',
  'لا بيانات فورية. مراجعات الأداء كانت مبنية على معلومات غير مكتملة. الإدارة لم تستطع رؤية أي الوكلاء نشطون أو أين نقاط الاختناق.',
  ARRAY['Live sales pipeline dashboard', 'Agent performance tracking', 'Lead status & activity reports', 'Conversion rate analytics', 'Automated weekly digest'],
  ARRAY['لوحة مسار المبيعات المباشرة', 'تتبع أداء الوكلاء', 'تقارير حالة ونشاط العملاء المحتملين', 'تحليلات معدل التحويل', 'ملخص أسبوعي تلقائي'],
  ARRAY['Weekly reporting time: 4 hours → 0', 'Management reviews improved with real data', 'Agents more accountable', 'Faster decisions on resource allocation'],
  ARRAY['وقت التقرير الأسبوعي: 4 ساعات → صفر', 'مراجعات الإدارة تحسّنت ببيانات حقيقية', 'الوكلاء أكثر مساءلة', 'قرارات أسرع في تخصيص الموارد'],
  'Visibility & Insights', 'الرؤية والتحليلات', 'visibility-insights',
  'Management lacks visibility', 'الإدارة تفتقر للرؤية', 'no-visibility',
  2, true, NOW()
),
(
  'reduced-manual-work',
  'Reducing repeated work with structured workflows', 'تقليل العمل المتكرر بسير عمل منظمة',
  'Professional Services', 'خدمات مهنية',
  'Repeated manual tasks', 'مهام يدوية متكررة', 'Workflow automation', 'أتمتة سير العمل', 'Less wasted time', 'وقت مهدر أقل',
  'Automating repetitive tasks freed 12+ team hours per week.',
  'أتمتة المهام المتكررة حرّرت أكثر من 12 ساعة من وقت الفريق أسبوعياً.',
  'A professional services firm had staff spending Monday entering weekend inquiry data, sending welcome messages, and assigning leads manually — repetitive and error-prone.',
  'كانت شركة خدمات مهنية لديها موظفون يقضون يوم الإثنين في إدخال بيانات، إرسال رسائل ترحيب يدوياً، وتوزيع العملاء — متكرر وعرضة للأخطاء.',
  'Three staff members spent 4+ hours each on tasks that should take 10 minutes. Data entry errors caused follow-up gaps. Team was frustrated.',
  'كان ثلاثة موظفين يقضون 4+ ساعات كل واحد في مهام يجب أن تستغرق 10 دقائق. أخطاء إدخال البيانات سببت فجوات في المتابعة.',
  ARRAY['Form-to-CRM automation', 'Automated welcome sequences', 'Auto-assignment by service type', 'Duplicate detection', 'Data validation workflows'],
  ARRAY['أتمتة النموذج إلى CRM', 'تسلسلات ترحيب تلقائية', 'توزيع تلقائي حسب نوع الخدمة', 'كشف التكرار', 'سير عمل التحقق من البيانات'],
  ARRAY['12+ hours of team time freed weekly', 'Data entry errors eliminated', 'First communication now instant', 'Team shifted to higher-value work'],
  ARRAY['أكثر من 12 ساعة محررة أسبوعياً', 'إلغاء أخطاء إدخال البيانات', 'التواصل الأول فوري الآن', 'تحوّل الفريق لعمل ذو قيمة أعلى'],
  'Automation Layers', 'طبقات الأتمتة', 'automation-layers',
  'Teams repeat the same work', 'الفرق تكرر نفس العمل', 'repeated-work',
  3, true, NOW()
),
(
  'scaling-with-control',
  'Scaling operations with better control', 'توسع العمليات بتحكم أفضل',
  'Operations', 'تشغيل',
  'Growth pressure', 'ضغط النمو', 'Operating system + insights', 'نظام تشغيل + تحليلات', 'Better control', 'تحكم أفضل',
  'A growing business added structure, dashboards, and AI signals to manage increased volume without chaos.',
  'أضاف عمل نامٍ هيكلاً ولوحات تحكم وإشارات ذكاء لإدارة الحجم المتزايد دون فوضى.',
  'An operations-heavy business tripled its client base in 18 months. What was manageable for 30 clients became unmanageable for 90. The team was overwhelmed and quality was slipping.',
  'ثلاثة أضعاف قاعدة عملاء عمل كثيف العمليات في 18 شهراً. ما كان قابلاً للإدارة لـ 30 عميلاً أصبح غير قابل للإدارة لـ 90.',
  'No system to prioritize urgent clients. No visibility into at-risk accounts. No documented processes for new hires.',
  'لا نظام لترتيب أولوية العملاء العاجلين. لا رؤية للعملاء المعرضين للخطر. لا توثيق للعمليات للموظفين الجدد.',
  ARRAY['AI lead prioritization model', 'At-risk client alerting system', 'Operations manual documentation', 'Team capacity dashboard', 'Automated escalation rules'],
  ARRAY['نموذج ترتيب أولوية العملاء بالذكاء', 'نظام تنبيه العملاء المعرضين للخطر', 'توثيق دليل العمليات', 'لوحة طاقة الفريق', 'قواعد تصعيد تلقائية'],
  ARRAY['Management regained control', 'At-risk client churn reduced by 28%', 'New team member onboarding 3x faster', 'Growth continued without operational collapse'],
  ARRAY['الإدارة استعادت السيطرة', 'تقليل إلغاء عملاء المخاطر 28%', 'تأهيل أعضاء الفريق الجدد أسرع 3 مرات', 'استمر النمو دون انهيار التشغيل'],
  'AI for Practical Decisions', 'الذكاء للقرارات العملية', 'ai-practical-decisions',
  'Growth creates pressure', 'النمو يخلق ضغطاً', 'growth-pressure',
  4, true, NOW()
)
ON CONFLICT (slug) DO NOTHING;
