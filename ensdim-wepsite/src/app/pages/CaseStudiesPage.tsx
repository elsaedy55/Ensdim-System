import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHero } from '../components/PageHero';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';
import { FAQSection } from '../components/FAQSection';
import { QuickAnswer } from '../components/QuickAnswer';

const cases = [
  {
    slug: 'scattered-follow-up',
    en: { title: 'From scattered follow-up to a clearer operating system', problem: 'Manual follow-up', solution: 'CRM + dashboard', impact: 'Clearer visibility', sector: 'Service Business' },
    ar: { title: 'من متابعة مشتتة إلى نظام تشغيلي أوضح', problem: 'متابعة يدوية', solution: 'CRM + لوحة تحكم', impact: 'وضوح أكبر', sector: 'أعمال خدمية' },
  },
  {
    slug: 'faster-response',
    en: { title: 'Faster response for a service business', problem: 'Slow replies', solution: 'Automation + follow-up flow', impact: 'Faster response', sector: 'Healthcare' },
    ar: { title: 'استجابة أسرع لعمل خدمي', problem: 'بطء في الرد', solution: 'أتمتة + مسار متابعة', impact: 'استجابة أسرع', sector: 'رعاية صحية' },
  },
  {
    slug: 'clearer-visibility',
    en: { title: 'Clearer dashboards for growing operations', problem: 'No visibility', solution: 'Dashboards + reporting', impact: 'Better management', sector: 'Real Estate' },
    ar: { title: 'لوحات تحكم أوضح للعمليات النامية', problem: 'لا رؤية', solution: 'لوحات تحكم + تقارير', impact: 'إدارة أفضل', sector: 'عقارات' },
  },
  {
    slug: 'reduced-manual-work',
    en: { title: 'Reducing repeated work with structured workflows', problem: 'Repeated manual tasks', solution: 'Workflow automation', impact: 'Less wasted time', sector: 'Professional Services' },
    ar: { title: 'تقليل العمل المتكرر بسير عمل منظمة', problem: 'مهام يدوية متكررة', solution: 'أتمتة سير العمل', impact: 'وقت مهدر أقل', sector: 'خدمات مهنية' },
  },
  {
    slug: 'scaling-with-control',
    en: { title: 'Scaling operations with better control', problem: 'Growth pressure', solution: 'Operating system + insights', impact: 'Better control', sector: 'Operations' },
    ar: { title: 'توسع العمليات بتحكم أفضل', problem: 'ضغط النمو', solution: 'نظام تشغيل + تحليلات', impact: 'تحكم أفضل', sector: 'تشغيل' },
  },
];

export function CaseStudiesPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';

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
          {cases.map((c, i) => (
            <ScrollReveal key={c.slug} delay={i * 0.07}>
              <div className="border border-[#E5E5E5] rounded-2xl p-6 sm:p-8 hover:border-[#6D5DF6] hover:shadow-md transition-all duration-200">
                <span className="text-[10px] px-2.5 py-1 bg-[#EEEAFE] text-[#6D5DF6] rounded-full font-semibold mb-3 inline-block">
                  {ar ? c.ar.sector : c.en.sector}
                </span>
                <h3 className="text-lg font-bold text-[#101418] mb-4 leading-snug">
                  {ar ? c.ar.title : c.en.title}
                </h3>
                <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-[#F0F0F0]">
                  {[
                    { label: ar ? 'المشكلة' : 'Problem', value: ar ? c.ar.problem : c.en.problem },
                    { label: ar ? 'الحل' : 'Solution', value: ar ? c.ar.solution : c.en.solution },
                    { label: ar ? 'الأثر' : 'Impact', value: ar ? c.ar.impact : c.en.impact },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-[10px] text-[#69717D] uppercase tracking-wide mb-1">{item.label}</p>
                      <p className="text-xs font-semibold text-[#101418]">{item.value}</p>
                    </div>
                  ))}
                </div>
                <Link to={`/case-studies/${c.slug}`} className="inline-flex items-center gap-1.5 text-[#6D5DF6] text-sm font-semibold hover:gap-2.5 transition-all">
                  {ar ? 'عرض دراسة الحالة' : 'View Case Study'} <ArrowRight size={13} />
                </Link>
              </div>
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
