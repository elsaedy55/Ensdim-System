import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Briefcase } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';
import { FAQSection } from '../components/FAQSection';
import { type CaseStudy } from '../../data/caseStudies';
import { parseSector } from '../../lib/caseStudySector';
import { useCaseStudies } from '../../hooks/useContent';

const resultsStrip = [
  { en: { stat: '+6,000 contracts', desc: 'Moved from manual tracking into a clearer digital operations system.' }, ar: { stat: '+6,000 عقد', desc: 'تحولت من متابعة يدوية إلى منظومة تشغيل رقمية أوضح.' } },
  { en: { stat: 'Faster decisions', desc: 'Scattered data turned into dashboards and a management data assistant.' }, ar: { stat: 'قرار أسرع', desc: 'تحويل بيانات متفرقة إلى Dashboard ومساعد بيانات للإدارة.' } },
  { en: { stat: 'Higher trust', desc: 'Security review focused on protecting user accounts and data.' }, ar: { stat: 'ثقة أعلى', desc: 'مراجعة أمنية لحماية الحسابات وبيانات المستخدمين.' } },
  { en: { stat: 'Clearer follow-up', desc: 'Communication channels connected to customer records and sales flow.' }, ar: { stat: 'متابعة أوضح', desc: 'ربط قنوات التواصل بملف العميل ومسار المبيعات.' } },
];

const provenTraits = [
  { en: { title: 'We understand business before the solution', desc: 'We do not start from the tool; we start from the problem blocking growth or operations.' }, ar: { title: 'نفهم البزنس قبل الحل', desc: 'لا نبدأ من الأداة، بل من المشكلة التي تعطل النمو أو التشغيل.' } },
  { en: { title: 'We connect technology to return', desc: 'Every solution should serve sales, follow-up, decisions, experience, or efficiency.' }, ar: { title: 'نربط التقنية بالعائد', desc: 'كل حل يجب أن يخدم مبيعات، متابعة، قرار، تجربة، أو كفاءة.' } },
  { en: { title: 'We design around customer behavior', desc: 'We look at where customers hesitate, where opportunities are lost, and what helps them decide.' }, ar: { title: 'نصمم حول سلوك العميل', desc: 'ننظر إلى أين يتردد العميل، وأين تضيع الفرصة، وما الذي يساعده على القرار.' } },
  { en: { title: 'We build for scale and trust', desc: 'Systems must handle growth, data, permissions, and security.' }, ar: { title: 'نبني للتوسع والثقة', desc: 'الأنظمة يجب أن تتحمل النمو، البيانات، الصلاحيات، والأمان.' } },
];

function CaseStudyCard({ c, ar, featured = false }: { c: CaseStudy; ar: boolean; featured?: boolean }) {
  const { tags, caseType } = parseSector(ar ? c.sector_ar : c.sector_en);
  return (
    <Link
      to={`/case-studies/${c.slug}`}
      className={`group flex flex-col border border-[#E5E5E5] rounded-2xl overflow-hidden bg-white hover:border-[#6D5DF6] hover:shadow-md active:scale-[0.98] active:border-[#6D5DF6] transition-all duration-200 h-full ${featured ? 'lg:flex-row lg:items-center' : ''}`}
    >
      {c.image_url && (
        <div className={`flex-shrink-0 bg-[#F4F2FF] overflow-hidden ${featured ? 'w-full aspect-[16/9] lg:w-[42%]' : 'w-full aspect-[16/9]'}`}>
          <img
            src={c.image_url}
            alt={ar ? c.title_ar : c.title_en}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className={`p-6 flex flex-col flex-1 ${featured ? 'justify-center' : ''}`}>
        <h3 className={`font-bold text-[#101418] mb-2 leading-snug ${featured ? 'text-xl sm:text-2xl' : 'text-base'}`}>
          {ar ? c.title_ar : c.title_en}
        </h3>
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="text-[10px] text-[#4F555E] font-medium">{tags}</span>
          {caseType && (
            <span className="text-[10px] px-2 py-0.5 bg-[#EEEAFE] text-[#6D5DF6] rounded-full font-semibold">
              {caseType}
            </span>
          )}
        </div>
        <p className="text-sm text-[#4F555E] leading-relaxed mb-4 line-clamp-2">
          {ar ? c.outcome_ar : c.outcome_en}
        </p>
        <div className="grid grid-cols-1 gap-3 mb-4 pb-4 border-b border-[#F0F0F0] mt-auto">
          {[
            { label: ar ? 'المشكلة' : 'Problem', value: ar ? c.card_problem_ar : c.card_problem_en },
            { label: ar ? 'الحل' : 'Solution', value: ar ? c.card_solution_ar : c.card_solution_en },
            { label: ar ? 'الأثر' : 'Impact', value: ar ? c.card_impact_ar : c.card_impact_en },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-[10px] text-[#4F555E] uppercase tracking-wide mb-1">{item.label}</p>
              <p className="text-xs font-semibold text-[#101418]">{item.value}</p>
            </div>
          ))}
        </div>
        <span className="inline-flex items-center gap-1.5 text-[#6D5DF6] text-xs font-semibold group-hover:gap-2.5 group-active:gap-2.5 transition-all">
          {ar ? 'عرض دراسة الحالة' : 'View Case Study'} <ArrowRight size={13} />
        </span>
      </div>
    </Link>
  );
}

export function CaseStudiesPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  const { data: cases = [], isLoading: loading, error: queryError } = useCaseStudies();
  const error = queryError ? (queryError as Error).message : null;
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filterOptions = useMemo(() => {
    const seen = new Set<string>();
    cases.forEach((c) => seen.add(parseSector(ar ? c.sector_ar : c.sector_en).filterCategory));
    return Array.from(seen);
  }, [cases, ar]);

  const filteredCases = activeFilter
    ? cases.filter((c) => parseSector(ar ? c.sector_ar : c.sector_en).filterCategory === activeFilter)
    : cases;
  const [featuredCase, ...restCases] = filteredCases;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <SEO
        title="Case Studies | Ensdim - Real Business Transformations in Egypt & Gulf"
        description="See how Ensdim helped businesses turn business problems into measurable return across operations, growth, sales, data, security, and customer experience."
        keywords="AI automation case studies Egypt, CRM case study Saudi Arabia, business automation results UAE, digital transformation examples Middle East"
        canonical="/case-studies"
      />

      {/* 1. Hero */}
      <section className="pt-24 pb-14 sm:pt-32 sm:pb-20 relative overflow-hidden bg-logo-black text-white">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-6 text-xs text-white/50 flex items-center gap-1">
            <Link to="/" className="hover:text-white/80 transition-colors">{ar ? 'الرئيسية' : 'Home'}</Link>
            <span className="opacity-40">/</span>
            <span className="text-white/70 font-medium">{ar ? 'دراسات الحالة' : 'Case Studies'}</span>
          </div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5 uppercase tracking-wider bg-[#6D5DF6]/15 border border-[#6D5DF6]/20 text-[#EEEAFE]/80">
            {ar ? 'دراسات حالة إنسديم' : 'Ensdim Case Studies'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight text-white">
            {ar
              ? 'دراسات حالة تثبت كيف نحول مشاكل البزنس إلى عائد قابل للقياس.'
              : 'Case studies that show how we turn business problems into measurable return.'}
          </h1>
          <p className="text-base sm:text-lg max-w-2xl leading-relaxed mb-3 text-[#EEEAFE]/75">
            {ar
              ? 'نعرض هنا كيف ساعدت إنسديم شركات في التشغيل، النمو، المبيعات، البيانات، الأمان، وتجربة العميل على تحويل التحديات اليومية إلى حلول رقمية أوضح، قرارات أسرع، ومكاسب عملية يمكن قياسها.'
              : 'Explore how Ensdim helped companies across operations, growth, sales, data, security, and customer experience turn daily business challenges into clearer digital systems, faster decisions, and measurable business gains.'}
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {(ar ? 'مشاكل أوضح. حلول أذكى. عائد أقرب.' : 'Clearer problems. Smarter solutions. Closer return.')
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
          <div className="flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
            >
              {ar ? 'شارك تحدي عملك' : 'Share your business challenge'} <ArrowRight size={15} />
            </Link>
            <Link
              to="/solutions"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-white/20 text-white/80 hover:border-white/40 hover:text-white active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
            >
              {ar ? 'استكشف الحلول' : 'Explore solutions'}
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Results that prove value */}
      <section className="py-14 bg-white border-b border-[#F0F0F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-[#101418]">
              {ar ? 'نتائج من حالات حقيقية ونماذج عملية.' : 'Outcomes from real cases and applied models.'}
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {resultsStrip.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="text-center p-4 h-full">
                  <p className="text-lg sm:text-xl font-bold text-[#6D5DF6] mb-1">{ar ? item.ar.stat : item.en.stat}</p>
                  <p className="text-xs text-[#4F555E] leading-relaxed">{ar ? item.ar.desc : item.en.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. From problem to return */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-xs font-semibold text-[#6D5DF6] uppercase tracking-wider mb-3">{ar ? 'دراسات الحالة' : 'Case Studies'}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-5 leading-tight">
              {ar ? 'نقرأ كل دراسة حالة من زاوية البزنس، لا من زاوية التنفيذ فقط.' : 'We read every case through the business lens, not only delivery.'}
            </h2>
            <p className="text-sm text-[#4F555E] leading-relaxed">
              {ar
                ? 'كل حالة داخل هذه الصفحة توضح ثلاث نقاط، المشكلة التي كانت تعطل النمو أو التشغيل، ما الذي تم بناؤه أو تنظيمه لمعالجة المشكلة، ثم العائد الذي ظهر على العميل، الفريق، القرار، أو المبيعات.'
                : 'Each case clarifies three points, the problem blocking growth or operations, what was built or organized to solve it, and the return that appeared across customers, teams, decisions, or sales.'}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 4 & 5 & 6. Filters + Featured + Grid */}
      <section id="case-studies-grid" className="py-4 pb-16 bg-white scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {!loading && !error && filterOptions.length > 1 && (
            <ScrollReveal className="mb-10">
              <p className="text-xs font-semibold text-[#4F555E] mb-3">
                {ar ? 'استكشف حسب نوع التحدي' : 'Explore by challenge type'}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveFilter(null)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 active:scale-95 ${
                    activeFilter === null
                      ? 'bg-[#3B2A78] text-white border-[#3B2A78]'
                      : 'bg-white text-[#101418] border-[#E5E5E5] hover:border-[#3B2A78]'
                  }`}
                >
                  {ar ? 'الكل' : 'All'}
                </button>
                {filterOptions.map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setActiveFilter(label)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 active:scale-95 ${
                      activeFilter === label
                        ? 'bg-[#3B2A78] text-white border-[#3B2A78]'
                        : 'bg-white text-[#101418] border-[#E5E5E5] hover:border-[#3B2A78]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </ScrollReveal>
          )}

          {loading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="border border-[#E5E5E5] rounded-2xl p-6 bg-white animate-pulse">
                  <div className="h-5 w-24 bg-[#EEEAFE] rounded-full mb-4" />
                  <div className="h-5 w-3/4 bg-gray-200 rounded-lg mb-4" />
                  <div className="h-12 w-full bg-gray-100 rounded mb-4" />
                  <div className="h-4 w-32 bg-gray-100 rounded" />
                </div>
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="text-center py-16">
              <Briefcase size={40} className="mx-auto text-[#E5E5E5] mb-3" />
              <p className="text-sm text-[#4F555E]">
                {ar ? 'تعذر تحميل دراسات الحالة. حاول مجدداً لاحقاً.' : 'Could not load case studies. Please try again later.'}
              </p>
            </div>
          )}

          {!loading && !error && filteredCases.length === 0 && (
            <div className="text-center py-16">
              <Briefcase size={40} className="mx-auto text-[#E5E5E5] mb-3" />
              <p className="text-sm text-[#4F555E]">
                {ar ? 'لا توجد دراسات حالة منشورة بعد.' : 'No case studies published yet.'}
              </p>
            </div>
          )}

          {/* Featured Case Study */}
          {!loading && !error && featuredCase && (
            <ScrollReveal className="mb-8">
              <CaseStudyCard c={featuredCase} ar={ar} featured />
            </ScrollReveal>
          )}

          {/* Grid */}
          {!loading && !error && restCases.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {restCases.map((c, i) => (
                <ScrollReveal key={c.slug} delay={Math.min(i * 0.06, 0.24)}>
                  <CaseStudyCard c={c} ar={ar} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 7. What do these cases prove about Ensdim */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-3 max-w-3xl mx-auto">
              {ar ? 'ما الذي تثبته هذه الحالات عن إنسديم؟' : 'What do these cases prove about Ensdim?'}
            </h2>
            <p className="text-sm text-[#4F555E] max-w-2xl mx-auto leading-relaxed">
              {ar
                ? 'هذه الحالات لا تعرض مشاريع منفذة فقط، بل تكشف طريقة إنسديم في التفكير. فنحن نبدأ من فهم المشكلة، نقرأ سلوك العميل أو التشغيل، نحدد أين يضيع العائد، ثم نبني حلًا رقميًا يخدم قرارًا أوضح، متابعة أفضل، وتجربة أكثر قابلية للنمو.'
                : 'These cases do not only show delivered projects. They reveal Ensdim’s way of thinking. We start by understanding the problem, read customer behavior or operations, identify where return is lost, then build a digital solution that supports clearer decisions, better follow-up, and more scalable experiences.'}
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {provenTraits.map((trait, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="p-5 bg-white border border-[#E5E5E5] rounded-2xl h-full hover:border-[#6D5DF6]/40 hover:shadow-md transition-all duration-200">
                  <h3 className="text-sm font-bold text-[#101418] mb-2">{ar ? trait.ar.title : trait.en.title}</h3>
                  <p className="text-xs text-[#4F555E] leading-relaxed">{ar ? trait.ar.desc : trait.en.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <FAQSection
        title={ar ? 'أسئلة شائعة حول دراسات الحالة' : 'Frequently Asked Questions About Case Studies'}
        faqs={ar ? [
          { question: 'هل دراسات حالة إنسديم حقيقية؟', answer: 'نعم. كل دراسة حالة مبنية على مشروع حقيقي نفذناه. نحافظ على سرية هوية العميل ما لم يمنح إذنًا صريحًا بالإفصاح.' },
          { question: 'ما القطاعات التي تخدمها إنسديم؟', answer: 'تخدم إنسديم العيادات والرعاية الصحية، العقارات، الأعمال الخدمية، التعليم والتدريب، والمقاولات والعمليات — بشكل رئيسي في مصر والسعودية والإمارات.' },
          { question: 'ما النتائج الشائعة لمشاريع إنسديم؟', answer: 'تشمل النتائج الشائعة استجابة أسرع للعملاء المحتملين، رؤية تشغيلية أوضح، تقليل العمل اليدوي، متابعة عملاء محسّنة، وتحويل أعلى من نقاط التواصل الرقمية.' },
        ] : [
          { question: 'Are Ensdim case studies based on real projects?', answer: 'Yes. Every case study is built on a real project we delivered. We maintain client confidentiality unless explicit permission is given for disclosure.' },
          { question: 'What sectors does Ensdim serve?', answer: 'Ensdim serves clinics and healthcare, real estate agencies, service businesses, education and training, and construction and operations — primarily in Egypt, Saudi Arabia, and UAE.' },
          { question: 'What are common outcomes from Ensdim projects?', answer: 'Common outcomes include faster lead response, clearer operational visibility through dashboards, reduced manual work, improved customer follow-up, and higher conversion from digital touchpoints.' },
          { question: 'How long do Ensdim projects typically take?', answer: 'Project timelines vary by scope. A focused automation or follow-up system takes 2-4 weeks. A full CRM and operational platform typically takes 6-12 weeks, including the Diagnose and Map phases before any build begins.' },
        ]}
      />

      {/* 8. Final CTA */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-[#EEEAFE] border border-[#DDD8FB] rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl font-bold text-[#101418] mb-3">
            {ar ? 'هل تريد تحويل تحدي شركتك إلى نتيجة قابلة للقياس؟' : 'Do you want to turn your company’s challenge into a measurable result?'}
          </h2>
          <p className="text-sm text-[#4F555E] mb-6 max-w-xl mx-auto">
            {ar
              ? 'سواء كانت المشكلة في المبيعات، التشغيل، المتابعة، البيانات، تجربة العميل، أو الأمان، نساعدك على فهم أين يتعطل العائد، ثم نبني المسار الرقمي الأقرب لتحسينه.'
              : 'Whether the problem is sales, operations, follow-up, data, customer experience, or security, we help you understand where return is blocked, then build the digital path most likely to improve it.'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
            >
              {ar ? 'شارك تحدي عملك' : 'Share your business challenge'} <ArrowRight size={15} />
            </Link>
            <Link
              to="/solutions"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[#6D5DF6]/30 text-[#3B2A78] hover:border-[#6D5DF6] hover:bg-white active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
            >
              {ar ? 'استكشف الحلول' : 'Explore solutions'}
            </Link>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
