import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHero } from '../components/PageHero';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';
import { FAQSection } from '../components/FAQSection';
import { QuickAnswer } from '../components/QuickAnswer';

export function ResourcesPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  return (
    <>
      <SEO
        title="Resources | ENSDIM - Business Automation Guides, Research & Case Studies"
        description="ENSDIM resources hub: research articles, case studies, and blog posts on AI automation, CRM, customer behavior, and digital transformation for businesses in Egypt and the Gulf."
        keywords="AI automation resources Egypt, business automation guides, CRM learning Middle East, digital transformation articles"
        canonical="/resources"
      />
      <PageHero
        title={ar ? 'موارد لفهم التشغيل الذكي للأعمال.' : 'Resources for smarter business operations.'}
        subtitle={ar
          ? 'رؤى عملية حول سلوك العملاء، المتابعة، التشغيل، الأتمتة، والنمو.'
          : 'Practical thinking on customer behavior, follow-up, operations, automation, and growth.'}
        variant="light"
        breadcrumbs={[{ label: 'Resources', labelAr: 'الموارد', href: '/resources' }]}
        lang={ar ? 'ar' : 'en'}
      />

      <QuickAnswer
        question={ar ? 'ما الموارد التعليمية التي تقدمها إنسديم؟' : 'What learning resources does ENSDIM provide?'}
        answer={ar
          ? 'تقدم إنسديم مقالات بحثية حول سلوك العملاء والتحويل، دراسات حالة حقيقية من مشاريع منفذة، ومدونة عملية تغطي الأتمتة ونظام CRM والذكاء الاصطناعي التطبيقي للأعمال في مصر والسعودية والإمارات.'
          : 'ENSDIM provides research articles on customer behavior and conversion, real case studies from delivered projects, and a practical blog covering automation, CRM, and applied AI for businesses in Egypt, Saudi Arabia, and UAE.'}
      />

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <ScrollReveal>
              <div className="border border-[#E5E5E5] rounded-2xl p-8 hover:border-[#6D5DF6] hover:shadow-md transition-all duration-200 h-full flex flex-col">
                <div className="w-10 h-10 bg-[#EEEAFE] rounded-xl flex items-center justify-center mb-5">
                  <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 text-[#6D5DF6]">
                    <path d="M4 4h12M4 8h12M4 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#101418] mb-2">{ar ? 'الأبحاث' : 'Research'}</h3>
                <p className="text-sm text-[#4F555E] leading-relaxed flex-1 mb-6">
                  {ar ? 'رؤى وتحليلات عملية حول كيفية تحسين التحويل وسلوك العملاء.' : 'Practical insights and analysis on improving conversion and customer behavior.'}
                </p>
                <Link
                  to="/research"
                  className="inline-flex items-center gap-2 text-[#6D5DF6] text-sm font-semibold hover:gap-3 transition-all"
                >
                  {ar ? 'اقرأ الأبحاث' : 'Read Research'}
                  <ArrowRight size={14} />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="border border-[#E5E5E5] rounded-2xl p-8 hover:border-[#6D5DF6] hover:shadow-md transition-all duration-200 h-full flex flex-col">
                <div className="w-10 h-10 bg-[#EEEAFE] rounded-xl flex items-center justify-center mb-5">
                  <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 text-[#6D5DF6]">
                    <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                    <rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                    <rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                    <rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#101418] mb-2">{ar ? 'دراسات الحالة' : 'Case Studies'}</h3>
                <p className="text-sm text-[#4F555E] leading-relaxed flex-1 mb-6">
                  {ar ? 'أمثلة حقيقية لكيف تحسّن الأنظمة أداء الأعمال.' : 'Real examples of how better systems improve business performance.'}
                </p>
                <Link
                  to="/case-studies"
                  className="inline-flex items-center gap-2 text-[#6D5DF6] text-sm font-semibold hover:gap-3 transition-all"
                >
                  {ar ? 'عرض دراسات الحالة' : 'View Case Studies'}
                  <ArrowRight size={14} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <FAQSection
        title={ar ? 'أسئلة شائعة حول موارد إنسديم' : 'Frequently Asked Questions About ENSDIM Resources'}
        faqs={ar ? [
          { question: 'ما الموارد التي تقدمها إنسديم؟', answer: 'تقدم إنسديم: أبحاث عملية حول سلوك العميل والتحويل، دراسات حالة من مشاريع حقيقية منفذة، ومدونة تغطي الأتمتة وCRM والذكاء الاصطناعي التطبيقي.' },
          { question: 'هل موارد إنسديم مجانية؟', answer: 'نعم. جميع الأبحاث والمقالات ودراسات الحالة على موقع إنسديم متاحة مجاناً بدون اشتراك.' },
          { question: 'هل المحتوى متوفر باللغة العربية؟', answer: 'نعم. محتوى إنسديم متوفر باللغتين العربية والإنجليزية — يمكنك تغيير اللغة من أعلى الصفحة.' },
        ] : [
          { question: 'What resources does ENSDIM provide?', answer: 'ENSDIM provides: practical research on customer behavior and conversion, case studies from real delivered projects, and a blog covering automation, CRM, and applied AI for Middle East businesses.' },
          { question: 'Are ENSDIM resources free?', answer: 'Yes. All ENSDIM research articles, case studies, and blog posts are freely available — no subscription or registration required.' },
          { question: 'Is the content available in Arabic?', answer: 'Yes. ENSDIM content is available in both Arabic and English. Use the language toggle at the top of any page to switch.' },
          { question: 'How is ENSDIM research different from generic AI content?', answer: 'ENSDIM research is grounded in real business operations — drawn from actual client projects in Egypt, Saudi Arabia, and UAE. It focuses on practical outcomes: how to improve follow-up, reduce manual work, and increase visibility in real service businesses.' },
        ]}
      />
    </>
  );
}
