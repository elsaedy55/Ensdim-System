import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Briefcase, Search, Repeat, BarChart3, Users, Gauge } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';
import { FAQSection } from '../components/FAQSection';
import { QuickAnswer } from '../components/QuickAnswer';
import { getPublishedCaseStudies, type CaseStudy } from '../../lib/supabase';

const whatWeMeasure = [
  { Icon: Search, en: { title: 'The starting problem', desc: 'What was breaking down before any system existed — lost leads, slow response, or unclear operations.' }, ar: { title: 'المشكلة في البداية', desc: 'ما كان يتعطل قبل بناء أي نظام — عملاء ضائعون، رد متأخر، أو تشغيل غير واضح.' } },
  { Icon: Repeat, en: { title: 'The solution we built', desc: 'The exact system, workflow, or layer we implemented to close the gap.' }, ar: { title: 'الحل الذي بنيناه', desc: 'النظام أو المسار أو الطبقة التي نفذناها لإغلاق الفجوة.' } },
  { Icon: BarChart3, en: { title: 'Measurable business impact', desc: 'Conversion, response time, and operational visibility after the system went live.' }, ar: { title: 'الأثر التجاري القابل للقياس', desc: 'التحويل، سرعة الاستجابة، والرؤية التشغيلية بعد تشغيل النظام.' } },
  { Icon: Users, en: { title: 'Team and customer experience', desc: 'How daily work changed for the team, and how the experience improved for the customer.' }, ar: { title: 'تجربة الفريق والعميل', desc: 'كيف تغيّر العمل اليومي للفريق، وكيف تحسّنت تجربة العميل.' } },
  { Icon: Gauge, en: { title: 'Readiness to scale', desc: 'Whether the system can absorb more customers, branches, or volume without breaking down again.' }, ar: { title: 'الجاهزية للتوسع', desc: 'هل يستطيع النظام استيعاب عملاء أو فروع أو حجم عمل أكبر دون أن يتعطل من جديد.' } },
];

function CaseStudyCard({ c, ar, featured = false }: { c: CaseStudy; ar: boolean; featured?: boolean }) {
  return (
    <Link
      to={`/case-studies/${c.slug}`}
      className={`group flex flex-col border border-[#E5E5E5] rounded-2xl overflow-hidden bg-white hover:border-[#6D5DF6] hover:shadow-md active:scale-[0.98] active:border-[#6D5DF6] transition-all duration-200 h-full ${featured ? 'lg:flex-row' : ''}`}
    >
      {c.image_url && (
        <div className={`flex-shrink-0 bg-[#F4F2FF] flex items-center justify-center overflow-hidden ${featured ? 'w-full lg:w-[42%] h-56 lg:h-auto p-4 lg:p-6' : 'w-full h-48 p-3'}`}>
          <img
            src={c.image_url}
            alt={ar ? c.title_ar : c.title_en}
            className="w-full h-full object-contain rounded-lg shadow-[0_4px_20px_rgba(109,93,246,0.12)]"
          />
        </div>
      )}
      <div className={`p-6 flex flex-col flex-1 ${featured ? 'justify-center' : ''}`}>
        <span className="text-[10px] px-2.5 py-1 bg-[#EEEAFE] text-[#6D5DF6] rounded-full font-semibold mb-3 inline-block w-fit">
          {ar ? c.sector_ar : c.sector_en}
        </span>
        <h3 className={`font-bold text-[#101418] mb-2 leading-snug ${featured ? 'text-xl sm:text-2xl' : 'text-base'}`}>
          {ar ? c.title_ar : c.title_en}
        </h3>
        <p className="text-sm text-[#4F555E] leading-relaxed mb-4 line-clamp-2">
          {ar ? c.outcome_ar : c.outcome_en}
        </p>
        <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-[#F0F0F0] mt-auto">
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

  const [cases, setCases]     = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    getPublishedCaseStudies()
      .then(setCases)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filterOptions = useMemo(() => {
    const seen = new Map<string, string>();
    cases.forEach((c) => {
      const key = c.sector_en;
      if (!seen.has(key)) seen.set(key, ar ? c.sector_ar : c.sector_en);
    });
    return Array.from(seen, ([key, label]) => ({ key, label }));
  }, [cases, ar]);

  const filteredCases = activeFilter ? cases.filter((c) => c.sector_en === activeFilter) : cases;
  const [featuredCase, ...restCases] = filteredCases;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <SEO
        title="Case Studies | ENSDIM - Real Business Transformations in Egypt & Gulf"
        description="See how ENSDIM helped businesses in Egypt, Saudi Arabia, and UAE replace scattered follow-up with CRM systems, automate operations, and gain real-time visibility through dashboards and AI."
        keywords="AI automation case studies Egypt, CRM case study Saudi Arabia, business automation results UAE, digital transformation examples Middle East"
        canonical="/case-studies"
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
            <span className="text-white/70 font-medium">{ar ? 'دراسات الحالة' : 'Case Studies'}</span>
          </div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5 uppercase tracking-wider bg-[#6D5DF6]/15 border border-[#6D5DF6]/20 text-[#EEEAFE]/80">
            {ar ? 'دراسات الحالة' : 'Case Studies'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight text-white">
            {ar ? 'أمثلة حقيقية. نتائج قابلة للقياس.' : 'Real examples. Measurable outcomes.'}
          </h1>
          <p className="text-base sm:text-lg max-w-2xl leading-relaxed mb-8 text-[#EEEAFE]/75">
            {ar ? 'أمثلة عملية لكيفية تحسين الأداء من خلال أنظمة أوضح، مبنية على مشاريع حقيقية نفذتها إنسديم.' : 'Examples of how clearer systems improve business performance, built on real projects ENSDIM has delivered.'}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/book-consultation"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
            >
              {ar ? 'احجز استشارة مجانية' : 'Book a Free Consultation'} <ArrowRight size={15} />
            </Link>
            <button
              type="button"
              onClick={() => scrollTo('case-studies-grid')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-white/20 text-white/80 hover:border-white/40 hover:text-white active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
            >
              {ar ? 'استعرض دراسات الحالة' : 'Browse Case Studies'}
            </button>
          </div>
        </div>
      </section>

      <QuickAnswer
        question={ar ? 'ما نوع المشاريع التي تنفذها إنسديم؟' : 'What types of projects has ENSDIM delivered?'}
        answer={ar
          ? 'نفذت إنسديم مشاريع للأعمال الخدمية والرعاية الصحية والعقارات والخدمات المهنية والتشغيل. تشمل النتائج النموذجية: استجابة أسرع للعملاء المحتملين، رؤية تشغيلية أوضح من خلال لوحات التحكم، وتقليل المهام اليدوية المتكررة.'
          : 'ENSDIM has delivered projects for service businesses, healthcare, real estate, professional services, and operations. Typical outcomes include faster lead response, clearer operational visibility through dashboards, and reduced repetitive manual work.'}
      />

      {/* From problem to impact */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-xs font-semibold text-[#6D5DF6] uppercase tracking-wider mb-3">{ar ? 'دراسات الحالة' : 'Case Studies'}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-5 leading-tight">
              {ar ? 'من المشكلة إلى الأثر القابل للقياس.' : 'From the problem to a measurable impact.'}
            </h2>
            <p className="text-sm text-[#4F555E] leading-relaxed">
              {ar
                ? 'كل دراسة حالة هنا تبدأ من تحدٍّ تشغيلي حقيقي — متابعة ضائعة، حجز يدوي، أو تشغيل بلا رؤية — وتنتهي بنظام واضح يمكن قياس أثره على العمل. لا نعرض شاشات جميلة فقط، بل نوضح ما تغيّر فعليًا في التحويل، سرعة الاستجابة، والرؤية التشغيلية.'
                : 'Every case study here starts from a real operating challenge — lost follow-up, manual booking, or operations without visibility — and ends with a clear system whose business impact can be measured. We do not just show good-looking screens; we show what actually changed in conversion, response speed, and operational visibility.'}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section id="case-studies-grid" className="py-4 pb-16 bg-white scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Filter Bar */}
          {!loading && !error && filterOptions.length > 1 && (
            <ScrollReveal className="mb-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-[#4F555E] me-1">
                  {ar ? 'فلترة حسب نوع التحدي:' : 'Filter by challenge type:'}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveFilter(null)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 active:scale-95 ${
                    activeFilter === null
                      ? 'bg-[#6D5DF6] text-white border-[#6D5DF6]'
                      : 'bg-white text-[#101418] border-[#E5E5E5] hover:border-[#6D5DF6]'
                  }`}
                >
                  {ar ? 'الكل' : 'All'}
                </button>
                {filterOptions.map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setActiveFilter(f.key)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 active:scale-95 ${
                      activeFilter === f.key
                        ? 'bg-[#6D5DF6] text-white border-[#6D5DF6]'
                        : 'bg-white text-[#101418] border-[#E5E5E5] hover:border-[#6D5DF6]'
                    }`}
                  >
                    {f.label}
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

          {!loading && !error && filteredCases.length > 0 && (
            <ScrollReveal className="text-center mt-12 p-8 bg-[#FAFAFA] border border-[#E5E5E5] rounded-2xl">
              <h3 className="text-lg font-bold text-[#101418] mb-2">
                {ar ? 'هل تواجه تحديًا مشابهًا؟' : 'Facing a similar challenge?'}
              </h3>
              <p className="text-sm text-[#4F555E] mb-5">
                {ar
                  ? 'احجز استشارة مجانية وسنساعدك على تحديد المسار الأقرب لبناء نظام أوضح.'
                  : 'Book a free consultation and we will help you identify the closest path to building a clearer system.'}
              </p>
              <Link to="/book-consultation" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#6D5DF6] text-white rounded-xl hover:bg-[#5d4de6] active:scale-[0.98] transition-all duration-200 text-sm font-semibold">
                {ar ? 'احجز استشارة مجانية' : 'Book a Free Consultation'} <ArrowRight size={15} />
              </Link>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* What We Measure */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-3">
              {ar ? 'ما الذي نقيسه في كل دراسة حالة' : 'What we measure in every case study'}
            </h2>
            <p className="text-sm text-[#4F555E] max-w-2xl mx-auto">
              {ar
                ? 'كل دراسة حالة تتبع نفس الإطار، حتى تستطيع مقارنة الوضع قبل وبعد الحل بوضوح.'
                : 'Every case study follows the same framework, so you can clearly compare before and after.'}
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {whatWeMeasure.map(({ Icon, en, ar: arContent }, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="p-5 bg-white border border-[#E5E5E5] rounded-2xl h-full hover:border-[#6D5DF6]/40 hover:shadow-md transition-all duration-200">
                  <div className="w-9 h-9 bg-[#EEEAFE] rounded-xl flex items-center justify-center mb-3">
                    <Icon size={16} className="text-[#6D5DF6]" />
                  </div>
                  <h3 className="text-sm font-bold text-[#101418] mb-2">{ar ? arContent.title : en.title}</h3>
                  <p className="text-xs text-[#4F555E] leading-relaxed">{ar ? arContent.desc : en.desc}</p>
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
          { question: 'ما النتائج الشائعة لمشاريع إنسديم؟', answer: 'تشمل النتائج الشائعة: استجابة أسرع للعملاء المحتملين، رؤية تشغيلية أوضح، تقليل العمل اليدوي، متابعة عملاء محسّنة، وتحويل أعلى من نقاط التواصل الرقمية.' },
        ] : [
          { question: 'Are ENSDIM case studies based on real projects?', answer: 'Yes. Every case study is built on a real project we delivered. We maintain client confidentiality unless explicit permission is given for disclosure.' },
          { question: 'What sectors does ENSDIM serve?', answer: 'ENSDIM serves clinics and healthcare, real estate agencies, service businesses, education and training, and construction and operations — primarily in Egypt, Saudi Arabia, and UAE.' },
          { question: 'What are common outcomes from ENSDIM projects?', answer: 'Common outcomes include: faster lead response, clearer operational visibility through dashboards, reduced manual work, improved customer follow-up, and higher conversion from digital touchpoints.' },
          { question: 'How long do ENSDIM projects typically take?', answer: 'Project timelines vary by scope. A focused automation or follow-up system takes 2-4 weeks. A full CRM and operational platform typically takes 6-12 weeks, including the Diagnose and Map phases before any build begins.' },
        ]}
      />

      {/* Final CTA */}
      <section className="py-14 bg-[#0f0d19] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold mb-3">
            {ar ? 'هل تواجه تحديًا مشابهًا داخل عملك؟' : 'Facing a similar challenge inside your business?'}
          </h2>
          <p className="text-sm text-[#EEEAFE]/75 mb-6 max-w-xl mx-auto">
            {ar
              ? 'شاركنا كيف تتم إدارة العملاء، الحجز، أو التشغيل داخل شركتك الآن، وسنساعدك على تحديد المسار الأقرب لبناء نظام أوضح يحقق نتائج مشابهة.'
              : 'Tell us how customers, booking, or operations are currently managed inside your business, and we will help you identify the closest path to building a clearer system with similar results.'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/book-consultation"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
            >
              {ar ? 'احجز استشارة مجانية' : 'Book a Free Consultation'} <ArrowRight size={15} />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-white/20 text-white/80 hover:border-white/40 hover:text-white active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
            >
              {ar ? 'استكشف الخدمات' : 'Explore Services'}
            </Link>
            <Link
              to="/solutions"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-white/20 text-white/80 hover:border-white/40 hover:text-white active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
            >
              {ar ? 'استكشف الحلول' : 'Explore Solutions'}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
