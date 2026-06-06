import { Link } from 'react-router';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHero } from '../components/PageHero';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';
import { FAQSection } from '../components/FAQSection';
import { QuickAnswer } from '../components/QuickAnswer';

const aboutWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': 'https://ensdim.com/about#webpage',
  name: 'About ENSDIM | AI Automation Agency',
  description: 'ENSDIM is a behavior-led AI automation agency. We understand your customers and operations before building technology.',
  url: 'https://ensdim.com/about',
  isPartOf: { '@id': 'https://ensdim.com/#website' },
  about: { '@id': 'https://ensdim.com/#organization' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ensdim.com/' },
      { '@type': 'ListItem', position: 2, name: 'About', item: 'https://ensdim.com/about' },
    ],
  },
};

const trustSignals = [
  { en: 'Remote-first team across Egypt and Gulf', ar: 'فريق عمل عن بُعد في مصر والخليج' },
  { en: 'English and Arabic delivery', ar: 'تسليم باللغتين العربية والإنجليزية' },
  { en: 'Outcome-focused, not hours-focused', ar: 'التركيز على النتائج، لا الساعات' },
  { en: 'Diagnose before building — always', ar: 'التشخيص قبل البناء — دائمًا' },
  { en: 'Clear client workspace for every project', ar: 'مساحة عمل واضحة لكل عميل في كل مشروع' },
  { en: 'Serving Egypt, Saudi Arabia, UAE and Gulf', ar: 'خدمة مصر والسعودية والإمارات والخليج' },
];

export function AboutPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  const outcomes = ar
    ? ['تحويل أعلى', 'رضا عملاء أفضل', 'فرص مبيعات أكثر', 'إدارة أسهل']
    : ['Higher conversion', 'Better satisfaction', 'More sales opportunities', 'Easier management'];

  const beliefs = ar ? [
    { title: 'فلسفتنا', body: 'نفهم العملاء والفرق والعمليات قبل بناء أي تقنية. الفهم أولاً، ثم الحل.' },
    { title: 'الذكاء المتمحور حول الإنسان', body: 'يجب أن تدعم التقنية الإنسان، لا أن تربكه. نبني أنظمة تنسجم مع طريقة عمل الناس.' },
    { title: 'الأنظمة التي تستمع', body: 'نبني أنظمة تستمع إلى إشارات العملاء والفرق والبيانات والعمليات، وتستجيب بذكاء.' },
  ] : [
    { title: 'Our philosophy', body: 'We understand customers, teams, and operations before building technology. Understanding first, then the solution.' },
    { title: 'Human-centered intelligence', body: 'Technology should support people, not confuse them. We build systems that fit the way people actually work.' },
    { title: 'Listening systems', body: 'We build systems that listen to signals from customers, teams, data, and operations — and respond intelligently.' },
  ];

  const methodology = ar ? [
    { step: '01', title: 'تشخيص', body: 'نفهم عمليات نشاطك الحالية، ورحلة العميل، والفجوات التشغيلية.' },
    { step: '02', title: 'رسم الخريطة', body: 'نرسم رحلة العميل الكاملة ونحدد أين تحدث نقاط الاحتكاك والضياع.' },
    { step: '03', title: 'تصميم', body: 'نصمم الحل المناسب — موقع أو نظام أو أتمتة أو لوحة تحكم.' },
    { step: '04', title: 'بناء', body: 'نطور النظام باستخدام أفضل التقنيات لحجم وطبيعة نشاطك.' },
    { step: '05', title: 'أتمتة', body: 'نضيف طبقات الأتمتة والذكاء لتقليل العمل اليدوي.' },
    { step: '06', title: 'تحسين', body: 'نقيس ونحسن بعد الإطلاق بناءً على البيانات الحقيقية.' },
  ] : [
    { step: '01', title: 'Diagnose', body: 'We understand your current business operations, customer journey, and operational gaps.' },
    { step: '02', title: 'Map', body: 'We map the full customer journey and identify where friction, loss, and delay occur.' },
    { step: '03', title: 'Design', body: 'We design the right solution — website, system, automation, or dashboard.' },
    { step: '04', title: 'Build', body: 'We develop the system using the best technologies for your business size and nature.' },
    { step: '05', title: 'Automate', body: 'We add automation and AI layers to reduce manual work and speed up response.' },
    { step: '06', title: 'Improve', body: 'We measure and improve after launch based on real performance data.' },
  ];

  const aboutFaqs = ar ? [
    { question: 'ما هي إنسديم؟', answer: 'إنسديم هي وكالة أتمتة الذكاء الاصطناعي تبني أنظمة رقمية قائمة على السلوك للأعمال في مصر والسعودية والإمارات ومنطقة الخليج. نبني وكلاء الذكاء الاصطناعي وأنظمة الأتمتة ومنصات CRM ومنتجات SaaS وحلول التحول الرقمي.' },
    { question: 'متى تأسست إنسديم؟', answer: 'تأسست إنسديم عام 2026 بهدف مساعدة الأعمال على تحسين التحويل وتجربة العملاء والوضوح التشغيلي من خلال الأنظمة الرقمية القائمة على سلوك العميل.' },
    { question: 'أين تعمل إنسديم؟', answer: 'مقر إنسديم في مصر، ونخدم عملاء في السعودية والإمارات والكويت وقطر والبحرين وعُمان، كما نعمل مع عملاء دوليين عن بُعد.' },
    { question: 'ما الذي يميز إنسديم عن وكالات البرمجيات الأخرى؟', answer: 'إنسديم تشخّص قبل أن تبني. معظم الوكالات تأخذ متطلباتك وتبني. إنسديم تدرس رحلة عميلك وعملياتك أولاً، ثم تصمم النظام المناسب حول ما يحتاج فعلاً للتغيير.' },
  ] : [
    { question: 'What is ENSDIM?', answer: 'ENSDIM is an AI automation agency that builds behavior-led digital systems for businesses in Egypt, Saudi Arabia, UAE, and the Gulf region. We build AI agents, automation systems, CRM platforms, SaaS products, and digital transformation solutions.' },
    { question: 'When was ENSDIM founded?', answer: 'ENSDIM was founded in 2026 with the goal of helping businesses improve conversion, customer experience, and operational clarity through behavior-led digital systems.' },
    { question: 'Where does ENSDIM operate?', answer: 'ENSDIM is headquartered in Egypt and serves clients in Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, and Oman. We also work with international clients remotely.' },
    { question: 'What makes ENSDIM different from other software agencies?', answer: 'ENSDIM diagnoses before building. Most agencies take requirements and build. ENSDIM studies your customer journey and operations first, then designs the right system around what actually needs to change.' },
    { question: 'What is ENSDIM\'s founding principle?', answer: 'Strategy first. Technology around people. ENSDIM was built on the belief that better digital systems start with better understanding of how customers think, decide, and behave.' },
    { question: 'Does ENSDIM provide ongoing support?', answer: 'Yes. Every project includes an Improve phase — measuring results, optimizing workflows, and updating systems based on real performance data after launch.' },
  ];

  return (
    <>
      <SEO
        title="About ENSDIM | AI Automation Agency - Strategy First, Technology Around People"
        description="ENSDIM is a behavior-led AI automation agency founded in Egypt. We understand your customers and operations before building technology. Serving Egypt, Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, and Oman."
        keywords="about ENSDIM, AI agency Egypt, AI automation company Egypt, digital transformation agency Cairo, about AI agency Middle East, ENSDIM founded"
        canonical="/about"
        jsonLd={aboutWebPageSchema}
      />
      <PageHero
        title={ar ? 'لماذا إنسديم؟' : 'Why ENSDIM?'}
        subtitle={ar
          ? 'لأن الأنظمة الأفضل تبدأ بفهم أعمق.'
          : 'Because better systems start with better understanding.'}
        breadcrumbs={[{ label: 'About', labelAr: 'من نحن', href: '/about' }]}
        lang={ar ? 'ar' : 'en'}
      />

      {/* AEO Quick Answer */}
      <QuickAnswer
        question={ar ? 'ما هي إنسديم؟' : 'What is ENSDIM?'}
        answer={ar
          ? 'إنسديم هي وكالة أتمتة ذكاء اصطناعي مقرها مصر، تبني أنظمة رقمية قائمة على سلوك العميل للأعمال في مصر والسعودية والإمارات ومنطقة الخليج. تأسست إنسديم عام 2026 بمبدأ: الاستراتيجية أولاً، والتكنولوجيا حول الإنسان.'
          : 'ENSDIM is an AI automation agency headquartered in Egypt that builds behavior-led digital systems for businesses in Egypt, Saudi Arabia, UAE, and the Gulf region. Founded in 2026 with the principle: Strategy first. Technology around people.'}
      />

      {/* Core Beliefs */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-14">
          {beliefs.map((b, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <h2 className="text-xl font-bold text-[#101418] mb-3">{b.title}</h2>
              <p className="text-sm text-[#69717D] leading-relaxed max-w-2xl">{b.body}</p>
            </ScrollReveal>
          ))}

          <ScrollReveal delay={0.25}>
            <h2 className="text-xl font-bold text-[#101418] mb-5">
              {ar ? 'النتائج التجارية' : 'Business outcomes'}
            </h2>
            <div className="flex flex-wrap gap-3">
              {outcomes.map((o, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-[#EEEAFE] text-[#6D5DF6] text-sm font-semibold rounded-full border border-[#6D5DF6]/15"
                >
                  {o}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Methodology — E-E-A-T: demonstrates experience */}
      <section className="py-16 sm:py-20 bg-[#FAFAFA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-[#101418] mb-2">
              {ar ? 'كيف تعمل إنسديم؟' : 'How ENSDIM works'}
            </h2>
            <p className="text-sm text-[#69717D] mb-10 max-w-2xl leading-relaxed">
              {ar
                ? 'منهجيتنا الستة خطوات تضمن أننا نفهم قبل أن نبني.'
                : 'Our 6-step methodology ensures we understand before we build.'}
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {methodology.map((m, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="bg-white rounded-xl border border-[#E5E5E5] p-5">
                  <span className="text-[10px] font-bold text-[#6D5DF6] tracking-widest mb-2 block">
                    {m.step}
                  </span>
                  <h3 className="text-base font-bold text-[#101418] mb-2">{m.title}</h3>
                  <p className="text-sm text-[#69717D] leading-relaxed">{m.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals — E-E-A-T */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-xl font-bold text-[#101418] mb-6">
              {ar ? 'لماذا تختار إنسديم؟' : 'Why choose ENSDIM?'}
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-3">
            {trustSignals.map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-[#6D5DF6] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[#3a3a4a] leading-relaxed">
                    {ar ? s.ar : s.en}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section — visible for AEO */}
      <FAQSection
        title={ar ? 'أسئلة شائعة حول إنسديم' : 'Frequently Asked Questions About ENSDIM'}
        faqs={aboutFaqs}
      />

      <section className="py-14 bg-[#0f0d19] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold mb-6">
            {ar ? 'احجز استشارة' : 'Book a Consultation'}
          </h2>
          <p className="text-sm text-[#EEEAFE]/60 mb-6 max-w-xl mx-auto">
            {ar
              ? 'جلسة مركزة نفهم فيها عملك، رحلة عميلك، والفجوات التشغيلية — ثم نحدد ما تحتاجه فعلاً.'
              : 'A focused session where we understand your business, customer journey, and operating gaps — then identify exactly what you need.'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/book-consultation"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] transition-colors text-sm font-semibold"
            >
              {ar ? 'ابدأ المحادثة' : 'Start the conversation'}
              <ArrowRight size={15} />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-white/20 text-white/80 rounded-xl hover:border-white/40 hover:text-white transition-colors text-sm font-semibold"
            >
              {ar ? 'استكشف الخدمات' : 'Explore Services'}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
