import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHero } from '../components/PageHero';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';
import { FAQSection } from '../components/FAQSection';
import { QuickAnswer } from '../components/QuickAnswer';

export function CompanyPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  const whatWeBuild = ar
    ? ['تجارب رقمية', 'CRM', 'أتمتة', 'لوحات تحكم', 'طبقات ذكاء اصطناعي', 'مساحات عمل للعملاء']
    : ['Digital experiences', 'CRM', 'Automation', 'Dashboards', 'AI layers', 'Client workspaces'];

  const howWeWork = ar
    ? ['نفهم', 'نرسم', 'نبني', 'نحسّن']
    : ['Understand', 'Map', 'Build', 'Improve'];

  return (
    <>
      <SEO
        title="Company | ENSDIM - Business Operations Company Built Around People & Systems"
        description="ENSDIM is a behavior-led AI automation company. We help growing businesses in Egypt, Saudi Arabia, and UAE organize customer journeys, follow-up, data, and operations through intelligent digital systems."
        keywords="ENSDIM company, AI company Egypt, automation company Egypt, digital systems company Middle East, business operations technology"
        canonical="/company"
      />
      <PageHero
        title={ar
          ? 'شركة تشغيل ذكي مبنية حول الإنسان والنظام والنمو.'
          : 'A business operations company built around people, systems, and growth.'}
        subtitle={ar
          ? 'تساعد إنسديم الأعمال النامية على تنظيم رحلة العميل، المتابعة، البيانات، والتشغيل من خلال أنظمة رقمية ذكية.'
          : 'ENSDIM helps growing businesses organize customer journeys, follow-up, data, and operations through intelligent digital systems.'}
        breadcrumbs={[{ label: 'Company', labelAr: 'الشركة', href: '/company' }]}
        lang={ar ? 'ar' : 'en'}
      />

      <QuickAnswer
        question={ar ? 'ما هي شركة إنسديم؟' : 'What kind of company is ENSDIM?'}
        answer={ar
          ? 'إنسديم شركة تشغيل رقمي قائم على السلوك. تساعد الأعمال النامية في مصر والسعودية والإمارات على تنظيم رحلة العميل، المتابعة، البيانات، والتشغيل من خلال أنظمة ذكية. ليست شركة برمجيات عامة، ولا شركة تسويق، بل شركة تبني أنظمة تشغيل مبنية حول كيفية عمل العميل فعلياً.'
          : 'ENSDIM is a behavior-led digital operations company. It helps growing businesses in Egypt, Saudi Arabia, and UAE organize customer journeys, follow-up, data, and operations through intelligent systems. Not a generic software agency. Not a marketing company. A company that builds operating systems around how businesses and their customers actually behave.'}
      />

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-14">

          <ScrollReveal>
            <h2 className="text-xl font-bold text-[#101418] mb-4">{ar ? 'ما نؤمن به' : 'What we believe'}</h2>
            <p className="text-sm text-[#69717D] leading-relaxed max-w-2xl">
              {ar
                ? 'الأنظمة الأفضل تبدأ بفهم أعمق. قبل أن نبني أي شيء، نفهم كيف يفكر العملاء، أين تتعطل العمليات، وما الذي يعيق النمو فعلياً.'
                : 'Better systems start with better understanding. Before building anything, we understand how customers think, where operations break, and what is actually blocking growth.'}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <h2 className="text-xl font-bold text-[#101418] mb-4">{ar ? 'ما لسنا عليه' : 'What we are not'}</h2>
            <ul className="space-y-2 text-sm text-[#69717D]">
              {(ar ? [
                'لسنا شركة برمجيات عامة',
                'لسنا شركة مبالغة في الذكاء الاصطناعي',
                'لسنا مزود خدمات رخيصاً',
                'لسنا شركة مواقع فقط',
              ] : [
                'Not a generic software agency',
                'Not an AI hype company',
                'Not a cheap outsourcing provider',
                'Not a website-only company',
              ]).map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D63A3A] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="text-xl font-bold text-[#101418] mb-4">{ar ? 'ما نبنيه' : 'What we build'}</h2>
            <div className="flex flex-wrap gap-3">
              {whatWeBuild.map((item, i) => (
                <span key={i} className="px-4 py-2 bg-[#EEEAFE] text-[#6D5DF6] text-sm font-semibold rounded-full border border-[#6D5DF6]/15">
                  {item}
                </span>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <h2 className="text-xl font-bold text-[#101418] mb-4">{ar ? 'كيف نعمل' : 'How we work'}</h2>
            <div className="flex flex-wrap gap-3">
              {howWeWork.map((step, i) => (
                <div key={i} className="flex items-center gap-2.5 px-4 py-2.5 border border-[#E5E5E5] rounded-xl text-sm text-[#101418] font-medium">
                  <span className="w-5 h-5 rounded-full bg-[#6D5DF6] text-white text-[10px] font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  {step}
                </div>
              ))}
            </div>
          </ScrollReveal>

        </div>
      </section>

      <FAQSection
        title={ar ? 'أسئلة شائعة عن شركة إنسديم' : 'Frequently Asked Questions About ENSDIM Company'}
        faqs={ar ? [
          { question: 'ما هي شركة إنسديم؟', answer: 'إنسديم شركة تشغيل رقمي تبني أنظمة ذكية للأعمال النامية في مصر والسعودية والإمارات. تركيزنا على فهم سلوك العميل والعمليات التشغيلية قبل بناء أي تقنية.' },
          { question: 'ما الذي يميز إنسديم عن شركات البرمجيات الأخرى؟', answer: 'إنسديم ليست شركة برمجيات عامة. نحن نشخّص قبل أن نبني — نفهم كيف يفكر عملاؤك، أين تتعطل عملياتك، وما الذي يعيق نموك فعلاً، ثم نبني الحل المناسب.' },
          { question: 'ما القطاعات التي تخدمها إنسديم؟', answer: 'تخدم إنسديم العيادات والرعاية الصحية، العقارات، الأعمال الخدمية، التعليم والتدريب، والمقاولات والتشغيل — بشكل رئيسي في مصر والسعودية والإمارات.' },
          { question: 'أين يقع مقر إنسديم؟', answer: 'مقر إنسديم في مصر مع فريق موزع في دول الخليج. نعمل بنموذج عمل عن بُعد ونخدم عملاء في مصر والسعودية والإمارات والكويت وقطر والبحرين وعُمان.' },
        ] : [
          { question: 'What is ENSDIM company?', answer: 'ENSDIM is a behavior-led digital operations company that builds intelligent systems for growing businesses in Egypt, Saudi Arabia, and UAE. Our focus is understanding customer behavior and operational workflows before building any technology.' },
          { question: 'What makes ENSDIM different from other software companies?', answer: 'ENSDIM is not a generic software agency. We diagnose before we build — understanding how your customers think, where your operations break, and what is actually blocking your growth, then building the right system around those realities.' },
          { question: 'What sectors does ENSDIM serve?', answer: 'ENSDIM serves clinics and healthcare, real estate agencies, service businesses, education and training companies, and construction and operations firms — primarily in Egypt, Saudi Arabia, and UAE.' },
          { question: 'Where is ENSDIM headquartered?', answer: 'ENSDIM is headquartered in Egypt with a distributed team across Gulf countries. We operate remote-first and serve clients in Egypt, Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, and Oman.' },
          { question: 'Is ENSDIM a startup or an established company?', answer: 'ENSDIM was founded in 2026 and operates as a focused, growing agency. We are not a venture-backed startup chasing growth — we are a deliberate, systems-focused team building the right thing for the right businesses.' },
        ]}
      />

      <section className="py-14 bg-[#EEEAFE]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-[#101418] mb-3">
            {ar ? 'اعرف أكثر عن إنسديم' : 'Learn more about ENSDIM'}
          </h2>
          <div className="flex flex-wrap gap-3 justify-center mt-6">
            <Link to="/about" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#101418] text-white rounded-xl text-sm font-semibold hover:bg-[#1a1d24] transition-colors">
              {ar ? 'من نحن' : 'About ENSDIM'} <ArrowRight size={14} />
            </Link>
            <Link to="/team" className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#101418] text-[#101418] rounded-xl text-sm font-semibold hover:border-[#6D5DF6] hover:text-[#6D5DF6] transition-colors">
              {ar ? 'الفريق' : 'Our Team'} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
