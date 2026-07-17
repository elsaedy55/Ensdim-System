import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Clock, BookOpen } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';
import { type ResearchArticle } from '../../lib/supabase';
import { useResearchArticles } from '../../hooks/useContent';

const methodPoints = [
  { en: 'Define a research question linked to return, growth, or customer behavior.', ar: 'تحديد سؤال بحث مرتبط بالعائد أو النمو أو سلوك العميل.' },
  { en: 'Explain the business context in language non-technical readers can understand.', ar: 'توضيح السياق التجاري للموضوع بلغة يفهمها غير المتخصص.' },
  { en: 'Analyze causes and patterns instead of only describing the issue.', ar: 'تحليل الأسباب والأنماط بدل الاكتفاء بوصف المشكلة.' },
  { en: 'Use credible sources or available data when needed.', ar: 'الاستناد إلى مصادر موثوقة أو بيانات متاحة عند الحاجة.' },
  { en: 'Turn findings into practical points that can connect to services and solutions.', ar: 'تحويل الاستنتاجات إلى نقاط تطبيقية يمكن ربطها بالخدمات والحلول.' },
  { en: 'Clarify how impact can be measured after implementation.', ar: 'توضيح كيف يمكن قياس الأثر بعد تطبيق الحل.' },
];

const categoryFilters = [
  { en: 'All', ar: 'الكل' },
  { en: 'Profit & Growth', ar: 'الربح والنمو' },
  { en: 'Customer Behavior', ar: 'سلوك العملاء' },
  { en: 'User Experience', ar: 'تجربة الاستخدام' },
  { en: 'Business Intelligence', ar: 'ذكاء الأعمال' },
  { en: 'Follow-up Systems', ar: 'أنظمة المتابعة' },
  { en: 'Digital Operations', ar: 'التشغيل الرقمي' },
  { en: 'Automation & AI', ar: 'الأتمتة والذكاء الاصطناعي' },
  { en: 'Security & Trust', ar: 'الأمان والثقة' },
  { en: 'Market Analysis', ar: 'تحليلات السوق' },
];

const nextSteps = [
  { en: 'Explore the related solution.', ar: 'استكشف الحل المرتبط بالموضوع.' },
  { en: 'Read a similar case study.', ar: 'اقرأ دراسة حالة مشابهة.' },
  { en: 'Move to a service connected to the challenge.', ar: 'انتقل إلى خدمة مرتبطة بالتحدي.' },
  { en: 'Share the challenge if deeper analysis is needed.', ar: 'شاركنا التحدي إذا احتجت تحليلًا أعمق.' },
];

function ResearchCard({ article, ar, featured }: { article: ResearchArticle; ar: boolean; featured?: boolean }) {
  return (
    <Link
      to={`/research/${article.slug}`}
      className={`block border border-[#E5E5E5] rounded-2xl overflow-hidden hover:border-[#6D5DF6] hover:shadow-md active:scale-[0.99] active:border-[#6D5DF6] transition-all duration-200 ${featured ? 'bg-[#FAFAFA]' : 'bg-white'}`}
    >
      {article.image_url && (
        <img
          src={article.image_url}
          alt={ar ? article.title_ar : article.title_en}
          loading="lazy"
          decoding="async"
          className={`w-full object-cover ${featured ? 'h-56' : 'h-40'}`}
        />
      )}
      <div className={featured ? 'p-6 sm:p-8' : 'p-5'}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] px-2.5 py-1 bg-[#EEEAFE] text-[#6D5DF6] rounded-full font-semibold">
            {ar ? article.category_ar : article.category_en}
          </span>
          <span className="flex items-center gap-1 text-xs text-[#4F555E]">
            <Clock size={11} />
            {article.read_time} {ar ? 'دقائق قراءة' : 'min read'}
          </span>
        </div>
        <h3 className={`font-bold text-[#101418] mb-2 leading-snug ${featured ? 'text-xl' : 'text-base'}`}>
          {ar ? article.title_ar : article.title_en}
        </h3>
        <p className={`text-[#4F555E] leading-relaxed mb-4 ${featured ? 'text-sm' : 'text-xs line-clamp-2'}`}>
          {ar ? article.description_ar : article.description_en}
        </p>
        <span className="inline-flex items-center gap-1.5 text-[#6D5DF6] text-sm font-semibold">
          {ar ? 'اقرأ البحث' : 'Read Research'}
          <ArrowRight size={13} />
        </span>
      </div>
    </Link>
  );
}

export function ResearchPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  const { data: articles = [], isLoading: loading, error: queryError } = useResearchArticles();
  const error = queryError ? (queryError as Error).message : null;
  const [activeFilter, setActiveFilter] = useState('All');

  const featured = articles[0];
  const rest = articles.slice(1);

  const filteredRest = useMemo(() => {
    if (activeFilter === 'All') return rest;
    return rest.filter((a) => a.category_en === activeFilter);
  }, [rest, activeFilter]);

  return (
    <>
      <SEO
        title={ar ? 'أبحاث إنسديم | فهم الأعمال، سلوك العميل، والنمو' : 'Ensdim Research | Understanding Business, Customer Behavior & Growth'}
        description={ar
          ? 'نحلل التحديات التي تؤثر على أداء الشركات، من سلوك العميل والمتابعة إلى التحويل، البيانات، والتشغيل، لنقدم رؤى عملية تساعدك على اتخاذ قرارات أوضح.'
          : 'We analyze the challenges that affect business performance, from customer behavior and follow-up to conversion, data, and operations, to deliver practical insight for clearer decisions.'}
        canonical="/research"
        lang={ar ? 'ar' : 'en'}
      />

      {/* Hero */}
      <section className="pt-24 pb-14 sm:pt-32 sm:pb-20 relative overflow-hidden bg-logo-black text-white">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-6 text-xs text-white/50 flex items-center gap-1">
            <Link to="/" className="hover:text-white/80 transition-colors">{ar ? 'الرئيسية' : 'Home'}</Link>
            <span className="opacity-40">/</span>
            <Link to="/resources" className="hover:text-white/80 transition-colors">{ar ? 'الموارد' : 'Resources'}</Link>
            <span className="opacity-40">/</span>
            <span className="text-white/70 font-medium">{ar ? 'الأبحاث' : 'Research'}</span>
          </div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5 uppercase tracking-wider bg-[#6D5DF6]/15 border border-[#6D5DF6]/20 text-[#EEEAFE]/80">
            {ar ? 'أبحاث إنسديم' : 'Ensdim Research'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight text-white">
            {ar ? 'أبحاث تساعدك على فهم الأعمال، سلوك العميل، ومسارات الربح والنمو.' : 'Research that helps you understand business, customer behavior, and the paths to profit and growth.'}
          </h1>
          <p className="text-base sm:text-lg max-w-2xl leading-relaxed mb-3 text-[#EEEAFE]/75">
            {ar
              ? 'نحلل التحديات التي تؤثر على أداء الشركات، من كيف يفكر العميل وأين تتعطل المتابعة إلى لماذا لا تتحول الفرص إلى مبيعات، وكيف تؤثر تجربة المستخدم والبيانات والتشغيل على الربحية والنمو. الهدف ليس إنتاج محتوى نظري، بل تقديم رؤى عملية تساعدك على اتخاذ قرارات أوضح قبل بناء الحل الرقمي.'
              : 'We analyze the challenges that affect business performance, from how customers think and where follow-up breaks down to why opportunities fail to become sales, and how user experience, data, and operations influence profitability and growth. The goal is not theoretical content, but practical insight that helps you make clearer decisions before building a digital solution.'}
          </p>
          <div className="flex flex-wrap gap-2">
            {(ar ? 'فهم أعمق للأعمال. قراءة أوضح لسلوك العميل. قرارات أقرب للعائد.' : 'Deeper business understanding. Clearer customer insight. Decisions closer to return.')
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

      {/* Why we publish research */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-5 leading-tight">
              {ar ? 'لأن الحل الصحيح يبدأ من فهم ما يعطّل النمو.' : 'Because the right solution starts with understanding what blocks growth.'}
            </h2>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-4">
              {ar
                ? 'كثير من الشركات تبدأ من سؤال حول الأداة، موقع، تطبيق، نظام متابعة، أتمتة، أو لوحة بيانات. لكن السؤال الأهم هو ما الذي يمنع العمل من تحقيق نتيجة أفضل؟'
                : 'Many companies begin with the tool, whether a website, an app, a follow-up system, automation, or a dashboard. But the better question is what is preventing the business from achieving a better result.'}
            </p>
            <p className="text-sm text-[#4F555E] leading-relaxed">
              {ar
                ? 'أبحاث إنسديم تساعد أصحاب الأعمال والفرق على قراءة التحدي قبل الاستثمار في الحل. نربط بين سلوك العميل، الربحية، النمو، التشغيل، البيانات، وتجربة المستخدم؛ حتى يتحول البحث إلى خطوة عملية تساعد على فهم المشكلة، لا مجرد مقال معلوماتي.'
                : 'Ensdim Research helps business owners and teams examine the challenge before investing in a solution. We connect customer behavior, profitability, growth, operations, data, and user experience so that research becomes a practical step toward understanding the problem, not just another article.'}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Research method */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-5 leading-tight">
              {ar ? 'نبدأ من سؤال بزنس واضح، ثم نحلله من أكثر من زاوية.' : 'We start with a clear business question, then analyze it from multiple angles.'}
            </h2>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-7">
              {ar
                ? 'البحث داخل إنسديم لا يبدأ من التقنية، بل من أثرها على العمل. نبدأ بتحديد سؤال واقعي، مثل لماذا تضيع الفرص؟ لماذا لا يتحول الزائر إلى طلب؟ لماذا يزداد الضغط مع النمو؟ ثم نقرأ السؤال من زاوية العميل، التشغيل، البيانات، وتجربة الاستخدام.'
                : 'Research at Ensdim does not begin with technology. It begins with the effect technology should have on the business. We define a real question, such as why opportunities are being lost, why visitors do not turn into inquiries, or why growth creates operational pressure. Then we study the question through customer behavior, operations, data, and user experience.'}
            </p>
            <ul className="space-y-2.5">
              {methodPoints.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#4F555E]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6D5DF6] mt-1.5 flex-shrink-0" />
                  {ar ? p.ar : p.en}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* Category filters */}
      <section className="pt-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#101418]">
              {ar ? 'استكشف الأبحاث حسب مجال التحدي.' : 'Explore research by challenge area.'}
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
                      ? 'bg-[#3B2A78] border-[#3B2A78] text-white'
                      : 'bg-white border-[#E5E5E5] text-[#4F555E] hover:border-[#3B2A78] hover:text-[#3B2A78]'
                  }`}
                >
                  {ar ? f.ar : f.en}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured research */}
      {!loading && featured && (
        <section className="py-10 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <ScrollReveal className="mb-5">
              <h2 className="text-lg font-bold text-[#101418]">{ar ? 'بحث مختار' : 'Featured Research'}</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <ResearchCard article={featured} ar={ar} featured />
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Research library */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#101418]">{ar ? 'مكتبة الأبحاث' : 'Research Library'}</h2>
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
              <BookOpen size={40} className="mx-auto text-[#E5E5E5] mb-3" />
              <p className="text-sm text-[#4F555E]">
                {ar ? 'تعذر تحميل الأبحاث. حاول مجدداً لاحقاً.' : 'Could not load articles. Please try again later.'}
              </p>
            </div>
          )}

          {!loading && !error && articles.length === 0 && (
            <div className="text-center py-16">
              <BookOpen size={40} className="mx-auto text-[#E5E5E5] mb-3" />
              <p className="text-sm text-[#4F555E]">
                {ar ? 'لا توجد أبحاث منشورة بعد.' : 'No research articles published yet.'}
              </p>
            </div>
          )}

          {!loading && !error && articles.length > 0 && filteredRest.length === 0 && (
            <div className="text-center py-16">
              <p className="text-sm text-[#4F555E]">
                {ar ? 'لا توجد أبحاث في هذا التصنيف بعد.' : 'No research in this category yet.'}
              </p>
            </div>
          )}

          {!loading && !error && filteredRest.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRest.map((article, i) => (
                <ScrollReveal key={article.id} delay={Math.min(i * 0.06, 0.3)}>
                  <ResearchCard article={article} ar={ar} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How to use Ensdim research */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-5 leading-tight">
              {ar ? 'من القراءة إلى قرار أوضح.' : 'From reading to a clearer decision.'}
            </h2>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-6">
              {ar
                ? 'كل بحث في إنسديم مصمم ليساعدك على فهم تحدٍ محدد داخل العمل، ثم يوجهك إلى خطوة منطقية بعده، سواء استكشاف حل مناسب، قراءة دراسة حالة قريبة، أو التواصل معنا إذا كان التحدي موجودًا داخل شركتك.'
                : 'Each Ensdim research piece is designed to help readers understand a specific business challenge, then move to a logical next step, whether exploring a related solution, reading a relevant case study, or contacting us if the challenge exists inside their company.'}
            </p>
            <ul className="space-y-2.5">
              {nextSteps.map((s, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#4F555E]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6D5DF6] mt-1.5 flex-shrink-0" />
                  {ar ? s.ar : s.en}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-[#EEEAFE] border border-[#DDD8FB] rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl font-bold text-[#101418] mb-3">
            {ar ? 'لديك تحدٍ يحتاج تحليلًا قبل بناء الحل؟' : 'Have a challenge that needs analysis before building the solution?'}
          </h2>
          <p className="text-sm text-[#4F555E] mb-6 max-w-xl mx-auto">
            {ar
              ? 'شاركنا ما يحدث داخل عملك، وسنساعدك على فهم أين تتعطل الفرص، وما الخطوة الرقمية الأقرب لتحسين العائد والتشغيل.'
              : 'Share what is happening inside your business, and we will help you understand where opportunities are getting blocked and which digital step is closest to improving return and operations.'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] active:scale-[0.98] transition-all duration-200 text-sm font-semibold">
              {ar ? 'شارك تحدي عملك' : 'Share Your Challenge'} <ArrowRight size={15} />
            </Link>
            <Link to="/solutions" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[#6D5DF6]/30 text-[#3B2A78] hover:border-[#6D5DF6] hover:bg-white active:scale-[0.98] transition-all duration-200 text-sm font-semibold">
              {ar ? 'استكشف الحلول' : 'Explore Solutions'}
            </Link>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
