import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Briefcase } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHero } from '../components/PageHero';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';
import { FAQSection } from '../components/FAQSection';
import { QuickAnswer } from '../components/QuickAnswer';
import { getPublishedCaseStudies, type CaseStudy } from '../../lib/supabase';

export function CaseStudiesPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  const [cases, setCases]     = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    getPublishedCaseStudies()
      .then(setCases)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SEO
        title="Case Studies | ENSDIM - Real Business Transformations in Egypt & Gulf"
        description="See how ENSDIM helped businesses in Egypt, Saudi Arabia, and UAE replace scattered follow-up with CRM systems, automate operations, and gain real-time visibility through dashboards and AI."
        keywords="AI automation case studies Egypt, CRM case study Saudi Arabia, business automation results UAE, digital transformation examples Middle East"
        canonical="/case-studies"
      />
      <PageHero
        eyebrow={ar ? 'دراسات الحالة' : 'Case Studies'}
        title={ar ? 'أمثلة حقيقية. نتائج قابلة للقياس.' : 'Real examples. Measurable outcomes.'}
        subtitle={ar ? 'أمثلة عملية لكيفية تحسين الأداء من خلال أنظمة أوضح.' : 'Examples of how clearer systems improve business performance.'}
        variant="light"
        breadcrumbs={[{ label: 'Case Studies', labelAr: 'دراسات الحالة', href: '/case-studies' }]}
        lang={ar ? 'ar' : 'en'}
      />

      <QuickAnswer
        question={ar ? 'ما نوع المشاريع التي تنفذها إنسديم؟' : 'What types of projects has ENSDIM delivered?'}
        answer={ar
          ? 'نفذت إنسديم مشاريع للأعمال الخدمية والرعاية الصحية والعقارات والخدمات المهنية والتشغيل. تشمل النتائج النموذجية: استجابة أسرع للعملاء المحتملين، رؤية تشغيلية أوضح من خلال لوحات التحكم، وتقليل المهام اليدوية المتكررة.'
          : 'ENSDIM has delivered projects for service businesses, healthcare, real estate, professional services, and operations. Typical outcomes include faster lead response, clearer operational visibility through dashboards, and reduced repetitive manual work.'}
      />

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-5">
          {loading && (
            <div className="space-y-5">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="border border-[#E5E5E5] rounded-2xl p-6 sm:p-8 animate-pulse">
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

          {!loading && !error && cases.length === 0 && (
            <div className="text-center py-16">
              <Briefcase size={40} className="mx-auto text-[#E5E5E5] mb-3" />
              <p className="text-sm text-[#4F555E]">
                {ar ? 'لا توجد دراسات حالة منشورة بعد.' : 'No case studies published yet.'}
              </p>
            </div>
          )}

          {!loading && !error && cases.map((c, i) => (
            <ScrollReveal key={c.slug} delay={i * 0.07}>
              <Link
                to={`/case-studies/${c.slug}`}
                className="group block border border-[#E5E5E5] rounded-2xl overflow-hidden hover:border-[#6D5DF6] hover:shadow-md active:scale-[0.99] active:border-[#6D5DF6] transition-all duration-200"
              >
                {c.image_url && (
                  <img
                    src={c.image_url}
                    alt={ar ? c.title_ar : c.title_en}
                    className="w-full h-44 object-cover"
                  />
                )}
                <div className="p-6 sm:p-8">
                  <span className="text-[10px] px-2.5 py-1 bg-[#EEEAFE] text-[#6D5DF6] rounded-full font-semibold mb-3 inline-block">
                    {ar ? c.sector_ar : c.sector_en}
                  </span>
                  <h3 className="text-lg font-bold text-[#101418] mb-4 leading-snug">
                    {ar ? c.title_ar : c.title_en}
                  </h3>
                  <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-[#F0F0F0]">
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
                  <span className="inline-flex items-center gap-1.5 text-[#6D5DF6] text-sm font-semibold group-hover:gap-2.5 transition-all">
                    {ar ? 'عرض دراسة الحالة' : 'View Case Study'} <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
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
    </>
  );
}
