import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Clock, FileText } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';
import { getPublishedBlogPosts, type BlogPost } from '../../lib/supabase';

/**
 * /resources/research in the approved content brief doesn't exist as a
 * route — the real research page is /research. Linked there instead.
 */

const contentAreas = [
  { en: { title: 'Operations & Follow-up', desc: 'Content that explains how follow-up, task distribution, workflow clarity, and customer systems reduce operational noise and improve sales opportunities and customer service.' }, ar: { title: 'التشغيل والمتابعة', desc: 'محتوى يشرح كيف تؤثر المتابعة، توزيع المهام، وضوح سير العمل، وأنظمة العملاء على تقليل الفوضى وتحسين فرص البيع وخدمة العميل.' } },
  { en: { title: 'Customer Experience & Conversion', desc: 'Articles that explain how customers see your website or service, where they hesitate, and why they may leave before contacting you or submitting a request.' }, ar: { title: 'تجربة العميل والتحويل', desc: 'مقالات تشرح كيف يرى العميل موقعك أو خدمتك، أين يتردد، ولماذا قد يغادر قبل أن يتواصل أو يطلب.' } },
  { en: { title: 'Practical Automation & AI', desc: 'Simple explanations of how automation and AI can be used inside the business: summarizing conversations, classifying requests, reducing manual work, and connecting tools with systems.' }, ar: { title: 'الأتمتة والذكاء الاصطناعي العملي', desc: 'شرح مبسط لكيفية استخدام الأتمتة والذكاء الاصطناعي داخل العمل: تلخيص المحادثات، تصنيف الطلبات، تقليل العمل اليدوي، وربط الأدوات بالأنظمة.' } },
  { en: { title: 'Data & Business Intelligence', desc: 'Content that helps you understand metrics, reports, dashboards, and how daily data can become clearer insight for management decisions.' }, ar: { title: 'البيانات وذكاء الأعمال', desc: 'محتوى يساعدك على فهم المؤشرات، التقارير، ولوحات المتابعة، وكيف تتحول البيانات اليومية إلى رؤية تساعد الإدارة على القرار.' } },
  { en: { title: 'Growth & Digital Solutions', desc: 'Practical thinking around growth, scaling, choosing the first digital step, and avoiding tools that teams do not use or that do not serve the business goal.' }, ar: { title: 'النمو والحلول الرقمية', desc: 'أفكار عملية حول النمو، التوسع، اختيار أول خطوة رقمية، وتجنب بناء أدوات لا يستخدمها الفريق أو لا تخدم الهدف التجاري.' } },
];

const categoryFilters = [
  { en: 'All', ar: 'الكل' },
  { en: 'Operations & Follow-up', ar: 'التشغيل والمتابعة' },
  { en: 'Customer Experience', ar: 'تجربة العميل' },
  { en: 'Conversion & Sales', ar: 'التحويل والمبيعات' },
  { en: 'Automation & AI', ar: 'الأتمتة والذكاء الاصطناعي' },
  { en: 'Data & Business Intelligence', ar: 'البيانات وذكاء الأعمال' },
  { en: 'Growth & Digital Solutions', ar: 'النمو والحلول الرقمية' },
  { en: 'Tools & Technologies', ar: 'الأدوات والتقنيات' },
  { en: 'Trust & Security', ar: 'الثقة والأمان' },
];

const nextSteps = [
  { href: '/research', en: { title: 'Understand the problem more deeply', desc: 'If the article opened a bigger question about growth, customer behavior, follow-up, operations, or data, move to Research for a deeper and more structured analysis.', cta: 'Research' }, ar: { title: 'افهم المشكلة بشكل أعمق', desc: 'إذا كان المقال فتح أمامك سؤالًا أكبر حول النمو، سلوك العميل، المتابعة، التشغيل، أو البيانات، انتقل إلى الأبحاث لقراءة تحليل أعمق ومنظم.', cta: 'الأبحاث' } },
  { href: '/case-studies', en: { title: 'See how an idea becomes a result', desc: 'If you want to see real examples from projects and implementation experiences, visit Case Studies to see how challenges become measurable digital solutions.', cta: 'Case Studies' }, ar: { title: 'شاهد كيف تتحول الفكرة إلى نتيجة', desc: 'إذا كنت تريد رؤية أمثلة من مشاريع وتجارب واقعية، انتقل إلى دراسات الحالة لمعرفة كيف تتحول التحديات إلى حلول قابلة للقياس.', cta: 'دراسات الحالة' } },
  { href: '/solutions', en: { title: 'Explore the right solution for your business stage', desc: 'If you know there is a challenge but do not know where to start, explore ENSDIM solutions by business stage: Build, Start, or Grow.', cta: 'Solutions' }, ar: { title: 'استكشف الحل المناسب لمرحلة عملك', desc: 'إذا كنت تعرف أن لديك تحديًا لكنك لا تعرف من أين تبدأ، استكشف حلول إنسديم حسب مرحلة العمل: بناء، انطلاق، أو نمو.', cta: 'الحلول' } },
  { href: '/services', en: { title: 'Find the service closest to execution', desc: 'If the problem is clearer and you want to know which service fits it, explore services such as UX, websites, applications, follow-up systems, data, automation, and internal systems.', cta: 'Services' }, ar: { title: 'اعرف الخدمة الأقرب للتنفيذ', desc: 'إذا أصبحت المشكلة أوضح وتريد معرفة نوع الخدمة المناسبة لها، انتقل إلى الخدمات: تجربة المستخدم، المواقع، التطبيقات، أنظمة المتابعة، البيانات، الأتمتة، أو الأنظمة الداخلية.', cta: 'الخدمات' } },
  { href: '/contact', en: { title: 'Share your challenge with ENSDIM', desc: 'If the challenge already exists inside your business and you need help identifying the first step, share what is happening and we will help you understand the path closest to return.', cta: 'Contact' }, ar: { title: 'شارك تحديك مع إنسديم', desc: 'إذا كان التحدي موجودًا بالفعل داخل عملك وتحتاج من يساعدك على تحديد أول خطوة، شاركنا ما يحدث وسنساعدك على فهم المسار الأقرب للعائد.', cta: 'تواصل معنا' } },
];

function BlogCard({ post, ar, featured }: { post: BlogPost; ar: boolean; featured?: boolean }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className={`block border border-[#E5E5E5] rounded-2xl overflow-hidden hover:border-[#6D5DF6] hover:shadow-md active:scale-[0.99] active:border-[#6D5DF6] transition-all duration-200 ${featured ? 'bg-[#FAFAFA]' : 'bg-white'}`}
    >
      {post.image_url && (
        <img
          src={post.image_url}
          alt={ar ? post.title_ar : post.title_en}
          className={`w-full object-cover ${featured ? 'h-56' : 'h-40'}`}
        />
      )}
      <div className={featured ? 'p-6 sm:p-8' : 'p-5'}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] px-2.5 py-1 bg-[#EEEAFE] text-[#6D5DF6] rounded-full font-semibold">
            {ar ? post.category_ar : post.category_en}
          </span>
          <span className="flex items-center gap-1 text-xs text-[#4F555E]">
            <Clock size={11} />
            {post.read_time} {ar ? 'دقائق قراءة' : 'min read'}
          </span>
        </div>
        <h3 className={`font-bold text-[#101418] mb-2 leading-snug ${featured ? 'text-xl' : 'text-base'}`}>
          {ar ? post.title_ar : post.title_en}
        </h3>
        {(ar ? post.description_ar : post.description_en) && (
          <p className={`text-[#4F555E] leading-relaxed mb-4 ${featured ? 'text-sm' : 'text-xs line-clamp-2'}`}>
            {ar ? post.description_ar : post.description_en}
          </p>
        )}
        <span className="inline-flex items-center gap-1.5 text-[#6D5DF6] text-sm font-semibold">
          {ar ? 'اقرأ المقال' : 'Read article'}
          <ArrowRight size={13} />
        </span>
      </div>
    </Link>
  );
}

export function BlogPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    getPublishedBlogPosts()
      .then(setPosts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const featured = posts[0];
  const rest = posts.slice(1);

  const filteredRest = useMemo(() => {
    if (activeFilter === 'All') return rest;
    return rest.filter((p) => p.category_en === activeFilter);
  }, [rest, activeFilter]);

  return (
    <>
      <SEO
        title={ar ? 'رؤى عملية من إنسديم | مركز معلومات لفهم تحديات الأعمال' : 'ENSDIM Practical Insights | A Knowledge Hub for Business Challenges'}
        description={ar
          ? 'محتوى مختصر وعملي يساعد أصحاب الأعمال والفرق على فهم ما يحدث داخل العمل: المتابعة، تجربة العميل، الأتمتة، البيانات، والنمو الرقمي.'
          : 'Concise, practical content that helps business owners and teams understand what is happening inside their operations: follow-up, customer experience, automation, data, and digital growth.'}
        canonical="/blog"
        lang={ar ? 'ar' : 'en'}
      />

      {/* Hero */}
      <section className="pt-24 pb-14 sm:pt-32 sm:pb-20 relative overflow-hidden bg-[#0f0d19] text-white">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 30% 50%, rgba(59,42,120,0.22) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-6 text-xs text-white/50 flex items-center gap-1">
            <Link to="/" className="hover:text-white/80 transition-colors">{ar ? 'الرئيسية' : 'Home'}</Link>
            <span className="opacity-40">/</span>
            <Link to="/resources" className="hover:text-white/80 transition-colors">{ar ? 'الموارد' : 'Resources'}</Link>
            <span className="opacity-40">/</span>
            <span className="text-white/70 font-medium">{ar ? 'مركز المعلومات' : 'Practical Insights'}</span>
          </div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5 uppercase tracking-wider bg-[#6D5DF6]/15 border border-[#6D5DF6]/20 text-[#EEEAFE]/80">
            {ar ? 'رؤى عملية من إنسديم' : 'ENSDIM Practical Insights'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight text-white">
            {ar ? 'مركز معلومات عملي لفهم تحديات الأعمال والحلول الرقمية القابلة للتطبيق.' : 'A practical knowledge hub for understanding business challenges and digital solutions.'}
          </h1>
          <p className="text-base sm:text-lg max-w-2xl leading-relaxed mb-3 text-[#EEEAFE]/75">
            {ar
              ? 'هنا ننشر محتوى مختصرًا وعمليًا يساعد أصحاب الأعمال والفرق على فهم ما يحدث داخل العمل: لماذا تضيع الفرص؟ كيف تتعطل المتابعة؟ متى تحتاج إلى أتمتة؟ كيف تؤثر تجربة العميل على التحويل؟ وكيف يمكن للتكنولوجيا أن تتحول من أداة إضافية إلى جزء يخدم التشغيل والنمو والعائد.'
              : 'Here, we publish concise and practical content that helps business owners and teams understand what is happening inside their operations: why opportunities are lost, why follow-up breaks down, when automation is useful, how customer experience affects conversion, and how technology can become part of operations, growth, and return.'}
          </p>
          <div className="flex flex-wrap gap-2">
            {(ar ? 'أفكار واضحة. تطبيق عملي. ربط مباشر بنتائج الأعمال.' : 'Clear ideas. Practical application. Direct connection to business results.')
              .split('.')
              .map((tag) => tag.trim())
              .filter(Boolean)
              .map((tag, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-[#EEEAFE]/70"
                >
                  <span className="w-1 h-1 rounded-full bg-[#6D5DF6]" />
                  {tag}
                </span>
              ))}
          </div>
        </div>
      </section>

      {/* Why we write these articles */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-5 leading-tight">
              {ar ? 'نشرح التقنية من زاوية ما يحدث داخل العمل.' : 'We explain technology through what happens inside the business.'}
            </h2>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-4">
              {ar
                ? 'لا نكتب عن الأدوات والاتجاهات كعناوين منفصلة عن الواقع. كل مقال يحاول الإجابة عن سؤال عملي: كيف تؤثر هذه الفكرة على المتابعة؟ على تجربة العميل؟ على التشغيل؟ على القرار؟ أو على العائد؟'
                : 'We do not write about tools and trends as separate topics detached from reality. Every article aims to answer a practical question: how does this idea affect follow-up, customer experience, operations, decision-making, or return?'}
            </p>
            <p className="text-sm text-[#4F555E] leading-relaxed">
              {ar
                ? 'نكتب للعميل غير المتخصص بلغة واضحة، وللفريق المتخصص بمنطق عملي يربط التقنية بنتائج البزنس. الهدف أن يخرج القارئ بفهم يساعده على اتخاذ خطوة أوضح، لا بمجرد معرفة مصطلح جديد.'
                : 'We write in clear language for non-technical readers, while giving specialists a practical structure that connects technology to business outcomes. The goal is for the reader to leave with a clearer next step, not just a new term.'}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* What you will find here */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="mb-10 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418]">
              {ar ? 'مقالات قصيرة تساعدك على رؤية التحدي من زاوية أوضح.' : 'Short articles that help you see the challenge more clearly.'}
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {contentAreas.map((area, i) => (
              <ScrollReveal key={i} delay={Math.min(i * 0.06, 0.3)}>
                <div className="p-5 bg-white border border-[#E5E5E5] rounded-2xl h-full">
                  <h3 className="text-sm font-bold text-[#101418] mb-2 leading-snug">{ar ? area.ar.title : area.en.title}</h3>
                  <p className="text-xs text-[#4F555E] leading-relaxed">{ar ? area.ar.desc : area.en.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Category filters */}
      <section className="pt-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#101418]">
              {ar ? 'استكشف المقالات حسب الموضوع.' : 'Explore articles by topic.'}
            </h2>
          </ScrollReveal>
          <div className="flex flex-wrap gap-2 mb-2">
            {categoryFilters.map((f) => {
              const active = activeFilter === f.en;
              return (
                <button
                  key={f.en}
                  type="button"
                  onClick={() => setActiveFilter(f.en)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                    active
                      ? 'bg-[#6D5DF6] border-[#6D5DF6] text-white'
                      : 'bg-white border-[#E5E5E5] text-[#4F555E] hover:border-[#6D5DF6] hover:text-[#6D5DF6]'
                  }`}
                >
                  {ar ? f.ar : f.en}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured article */}
      {!loading && featured && (
        <section className="py-10 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <ScrollReveal className="mb-5">
              <h2 className="text-lg font-bold text-[#101418]">{ar ? 'مقال مختار' : 'Featured Article'}</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <BlogCard post={featured} ar={ar} featured />
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Article library */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#101418]">{ar ? 'مكتبة المقالات' : 'Article Library'}</h2>
          </ScrollReveal>

          {loading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="border border-[#E5E5E5] rounded-2xl p-5 animate-pulse">
                  <div className="h-5 w-20 bg-[#EEEAFE] rounded-full mb-3" />
                  <div className="h-5 w-3/4 bg-gray-200 rounded-lg mb-2" />
                  <div className="h-4 w-full bg-gray-100 rounded mb-1" />
                </div>
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="text-center py-16">
              <FileText size={40} className="mx-auto text-[#E5E5E5] mb-3" />
              <p className="text-sm text-[#4F555E]">
                {ar ? 'تعذر تحميل المقالات. حاول مجدداً لاحقاً.' : 'Could not load blog posts. Please try again later.'}
              </p>
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="text-center py-16">
              <FileText size={40} className="mx-auto text-[#E5E5E5] mb-3" />
              <p className="text-sm text-[#4F555E]">
                {ar ? 'لا توجد مقالات منشورة بعد.' : 'No articles published yet.'}
              </p>
            </div>
          )}

          {!loading && !error && posts.length > 0 && filteredRest.length === 0 && (
            <div className="text-center py-16">
              <p className="text-sm text-[#4F555E]">
                {ar ? 'لا توجد مقالات في هذا التصنيف بعد.' : 'No articles in this category yet.'}
              </p>
            </div>
          )}

          {!loading && !error && filteredRest.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRest.map((post, i) => (
                <ScrollReveal key={post.id} delay={Math.min(i * 0.06, 0.3)}>
                  <BlogCard post={post} ar={ar} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* After reading - next step cards */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="mb-10 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-3">
              {ar ? 'حوّل الفكرة إلى خطوة أوضح داخل عملك.' : 'Turn the idea into a clearer step inside your business.'}
            </h2>
            <p className="text-sm text-[#4F555E]">
              {ar
                ? 'المقال يساعدك على فهم فكرة أو مشكلة، لكن الخطوة التالية تعتمد على ما تحتاجه الآن: هل تريد فهم المشكلة بعمق؟ رؤية أمثلة واقعية؟ استكشاف نوع الحل المناسب؟ أم مشاركة تحديك معنا؟'
                : 'An article helps you understand an idea or a problem, but the next step depends on what you need now: do you want to understand the issue more deeply, see real examples, explore the right solution type, or share your challenge with us?'}
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {nextSteps.map((step, i) => {
              const d = ar ? step.ar : step.en;
              return (
                <ScrollReveal key={step.href} delay={Math.min(i * 0.06, 0.3)}>
                  <Link
                    to={step.href}
                    className="group flex flex-col h-full p-5 bg-white border border-[#E5E5E5] rounded-2xl hover:border-[#6D5DF6] hover:shadow-md active:scale-[0.98] active:border-[#6D5DF6] transition-all duration-200"
                  >
                    <h3 className="text-sm font-bold text-[#101418] mb-2 leading-snug">{d.title}</h3>
                    <p className="text-xs text-[#4F555E] leading-relaxed mb-4 flex-1">{d.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#6D5DF6] font-semibold group-hover:gap-2.5 group-active:gap-2.5 transition-all">
                      {d.cta} <ArrowRight size={12} />
                    </span>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-[#EEEAFE] border border-[#DDD8FB] rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl font-bold text-[#101418] mb-3">
            {ar ? 'حوّل ما قرأته إلى خطوة أوضح داخل عملك.' : 'Turn what you read into a clearer step inside your business.'}
          </h2>
          <p className="text-sm text-[#4F555E] mb-6 max-w-xl mx-auto">
            {ar
              ? 'إذا وجدت في المقال فكرة تشبه تحديًا يحدث داخل شركتك، شاركنا ما يحدث. سنساعدك على فهم السبب، تحديد الأولوية، واختيار المسار الرقمي الأقرب للعائد.'
              : 'If an idea in the article reflects a challenge happening inside your company, share what is happening with us. We will help you understand the cause, define the priority, and choose the digital path closest to return.'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] active:scale-[0.98] transition-all duration-200 text-sm font-semibold">
              {ar ? 'شارك تحدي عملك' : 'Share your business challenge'} <ArrowRight size={15} />
            </Link>
            <Link to="/solutions" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[#6D5DF6]/30 text-[#3B2A78] hover:border-[#6D5DF6] hover:bg-white active:scale-[0.98] transition-all duration-200 text-sm font-semibold">
              {ar ? 'استكشف الحلول' : 'Explore solutions'}
            </Link>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
