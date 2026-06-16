import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHero } from '../components/PageHero';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';
import { FAQSection, FAQItem } from '../components/FAQSection';
import { QuickAnswer } from '../components/QuickAnswer';

const servicesFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What AI automation services does ENSDIM offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ENSDIM offers AI chatbot development, workflow automation, CRM integration, data dashboards, web design, mobile applications, and growth marketing systems — all built around your business operations.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does ENSDIM build custom CRM systems?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. ENSDIM builds custom CRM systems designed around your lead management, sales pipeline, customer follow-up, and operational workflows — not generic off-the-shelf software.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take ENSDIM to build an automation system?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Timelines depend on project complexity. A basic automation flow takes 2-4 weeks. A full CRM + automation system typically takes 6-12 weeks. ENSDIM follows a Diagnose → Map → Design → Build → Automate → Improve methodology.',
      },
    },
  ],
};

const services = [
  { slug: 'web-design-digital-experience', en: { title: 'Web Design & Digital Experience', desc: 'High-conversion websites, landing pages, booking flows, and client portals.', outcome: 'Higher conversion' }, ar: { title: 'تصميم الويب والتجربة الرقمية', desc: 'مواقع عالية التحويل، صفحات هبوط، مسارات حجز، وبوابات عملاء.', outcome: 'تحويل أعلى' } },
  { slug: 'crm-internal-systems', en: { title: 'CRM & Internal Systems', desc: 'Custom systems for leads, sales, customers, operations, and internal workflows.', outcome: 'Better follow-up' }, ar: { title: 'CRM والأنظمة الداخلية', desc: 'أنظمة مخصصة للعملاء المحتملين والمبيعات والتشغيل وسير العمل الداخلي.', outcome: 'متابعة أفضل' } },
  { slug: 'ai-chatbots-automation', en: { title: 'AI Chatbots & Automation', desc: 'Automated replies, reminders, follow-up flows, and repetitive task reduction.', outcome: 'Faster response' }, ar: { title: 'روبوتات الدردشة والأتمتة', desc: 'ردود تلقائية، تذكيرات، مسارات متابعة، وتقليل المهام المتكررة.', outcome: 'استجابة أسرع' } },
  { slug: 'data-dashboards', en: { title: 'Data & Dashboards', desc: 'Real-time dashboards, business visibility, reporting, and decision support.', outcome: 'Clearer visibility' }, ar: { title: 'البيانات ولوحات المتابعة', desc: 'لوحات تحكم فورية، رؤية تشغيلية، تقارير، ودعم القرار.', outcome: 'وضوح أكبر' } },
  { slug: 'mobile-web-applications', en: { title: 'Mobile & Web Applications', desc: 'Applications designed around real users, operations, and business goals.', outcome: 'Easier management' }, ar: { title: 'تطبيقات الموبايل والويب', desc: 'تطبيقات مصممة حول المستخدمين الحقيقيين وأهداف العمل.', outcome: 'إدارة أسهل' } },
  { slug: 'growth-marketing-systems', en: { title: 'Growth & Marketing Systems', desc: 'Campaign flows, tracking, customer journeys, and conversion improvement.', outcome: 'Less manual work' }, ar: { title: 'أنظمة النمو والتسويق', desc: 'مسارات الحملات، التتبع، رحلات العملاء، وتحسين التحويل.', outcome: 'عمل يدوي أقل' } },
];

export function ServicesPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  return (
    <>
      <SEO
        title="Services | ENSDIM - AI Automation, CRM & SaaS Development"
        description="ENSDIM services: AI chatbots, CRM development, web design, data dashboards, mobile apps, and automation systems for businesses in Egypt, Saudi Arabia, and UAE."
        keywords="AI automation services Egypt, CRM development Egypt, SaaS development Saudi Arabia, AI chatbot UAE, web design Cairo, automation agency Middle East"
        canonical="/services"
        jsonLd={servicesFaqSchema}
      />
      <PageHero
        title={ar ? 'خدمات تحول رحلة العميل إلى نظام تشغيل واضح.' : 'Services that turn customer journeys into operating systems.'}
        subtitle={ar
          ? 'من المواقع وCRM إلى الأتمتة ولوحات المتابعة وطبقات الذكاء — نبني حول طريقة عمل نشاطك فعليًا.'
          : 'From websites and CRM to automation, dashboards, and AI layers — we build around how your business really works.'}
        primaryCTA={{ label: ar ? 'احجز استشارة' : 'Book a Consultation', href: '/book-consultation' }}
        breadcrumbs={[{ label: 'Services', labelAr: 'الخدمات', href: '/services' }]}
        lang={ar ? 'ar' : 'en'}
      />
      <QuickAnswer
        question={ar ? 'ما الخدمات التي تقدمها إنسديم؟' : 'What services does ENSDIM provide?'}
        answer={ar
          ? 'تقدم إنسديم ستة خدمات رئيسية: تصميم الويب والتجربة الرقمية، CRM والأنظمة الداخلية، روبوتات الذكاء الاصطناعي والأتمتة، البيانات ولوحات المتابعة، تطبيقات الموبايل والويب، وأنظمة النمو والتسويق. كل خدمة مبنية حول طريقة عمل عملك فعليًا.'
          : 'ENSDIM provides six core services: Web Design & Digital Experience, CRM & Internal Systems, AI Chatbots & Automation, Data & Dashboards, Mobile & Web Applications, and Growth & Marketing Systems. Every service is built around how your business actually operates, not just installed as generic software.'}
      />

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <Link to={`/services/${s.slug}`} className="block border border-[#E5E5E5] rounded-2xl p-6 hover:border-[#6D5DF6] hover:shadow-md transition-all duration-200 h-full flex-col">
                  <span className="text-[10px] px-2.5 py-1 bg-[#EEEAFE] text-[#6D5DF6] rounded-full font-semibold self-start mb-4">
                    {ar ? s.ar.outcome : s.en.outcome}
                  </span>
                  <h3 className="text-base font-bold text-[#101418] mb-2 leading-snug">
                    {ar ? s.ar.title : s.en.title}
                  </h3>
                  <p className="text-sm text-[#69717D] leading-relaxed flex-1">
                    {ar ? s.ar.desc : s.en.desc}
                  </p>
                  <span className="inline-flex items-center gap-1.5 mt-4 text-[#6D5DF6] text-xs font-semibold group-hover:gap-2.5 transition-all">
                    {ar ? 'استكشف هذه الخدمة' : 'Explore this service'}
                    <ArrowRight size={13} />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <FAQSection
        title={ar ? 'أسئلة شائعة حول خدمات إنسديم' : 'Frequently Asked Questions About ENSDIM Services'}
        faqs={ar ? [
          { question: 'ما الخدمات التي تقدمها إنسديم؟', answer: 'تقدم إنسديم: تصميم الويب، CRM، الأتمتة، روبوتات الذكاء الاصطناعي، لوحات البيانات، تطبيقات الموبايل، وأنظمة النمو — كل ذلك مبني حول طريقة عمل نشاطك الفعلي.' },
          { question: 'كم يستغرق بناء نظام أتمتة؟', answer: 'يعتمد على التعقيد. مسار أتمتة بسيط يستغرق 2-4 أسابيع. نظام CRM كامل مع الأتمتة يستغرق عادةً 6-12 أسبوعًا.' },
          { question: 'هل تبني إنسديم أنظمة CRM مخصصة؟', answer: 'نعم. نبني أنظمة CRM مصممة حول إدارة العملاء المحتملين، مسار المبيعات، متابعة العملاء، وسير العمل التشغيلي — لا برمجيات جاهزة.' },
          { question: 'هل تعمل إنسديم مع الشركات خارج مصر؟', answer: 'نعم. نخدم عملاء في السعودية، الإمارات، الكويت، قطر، البحرين، عُمان، ومصر، ونعمل مع عملاء دوليين عن بُعد.' },
          { question: 'كيف تتعامل إنسديم مع مشاريع الذكاء الاصطناعي؟', answer: 'نبدأ بتشخيص عملياتك وفهم سلوك عملائك قبل بناء أي تقنية. هذا النهج يضمن أن الأتمتة تحل المشكلة الحقيقية.' },
          { question: 'ما أنواع الأعمال التي تخدمها إنسديم؟', answer: 'نخدم العيادات والرعاية الصحية، العقارات، شركات الخدمات، التعليم والتدريب، والمقاولات والعمليات.' },
        ] : [
          { question: 'What services does ENSDIM offer?', answer: 'ENSDIM provides: Web Design, CRM, Automation, AI Chatbots, Data Dashboards, Mobile & Web Applications, and Growth Marketing Systems — all built around how your business actually operates.' },
          { question: 'How long does it take to build an automation system?', answer: 'It depends on complexity. A basic automation flow takes 2-4 weeks. A full CRM and automation system typically takes 6-12 weeks. ENSDIM follows a Diagnose → Map → Design → Build → Automate → Improve methodology.' },
          { question: 'Does ENSDIM build custom CRM systems?', answer: 'Yes. ENSDIM builds custom CRM systems designed around your lead management, sales pipeline, customer follow-up, and operational workflows — not generic off-the-shelf software.' },
          { question: 'Does ENSDIM work with businesses outside Egypt?', answer: 'Yes. ENSDIM serves clients in Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, Oman, and Egypt, and works with international clients remotely.' },
          { question: 'How does ENSDIM handle AI projects?', answer: 'ENSDIM starts by diagnosing your operations and understanding customer behavior before building any technology. This behavior-first approach ensures the AI or automation actually solves the real problem.' },
          { question: 'What types of businesses does ENSDIM serve?', answer: 'ENSDIM works with clinics and healthcare, real estate agencies, service businesses, education and training companies, and construction and operations firms — primarily in Egypt, Saudi Arabia, and UAE.' },
          { question: 'What is the difference between ENSDIM and a regular software agency?', answer: 'ENSDIM diagnoses before building. Most software agencies take your requirements and build. ENSDIM studies your customer journey and operations first, then designs the right system around what actually needs to change.' },
          { question: 'Does ENSDIM provide ongoing support after launch?', answer: 'Yes. ENSDIM follows the Improve phase after launch — measuring results, optimizing workflows, and updating systems based on real performance data.' },
        ]}
      />

      <section className="py-14 bg-[#0f0d19] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold mb-3">
            {ar ? 'ما الخدمة المناسبة لعملك؟' : 'Not sure which service fits?'}
          </h2>
          <p className="text-sm text-[#EEEAFE]/60 mb-6">
            {ar ? 'احجز استشارة ونساعدك في تحديد ما تحتاجه فعلاً.' : 'Book a consultation and we will help you identify exactly what you need.'}
          </p>
          <Link
            to="/book-consultation"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] transition-colors text-sm font-semibold"
          >
            {ar ? 'احجز استشارة' : 'Book a Consultation'}
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
