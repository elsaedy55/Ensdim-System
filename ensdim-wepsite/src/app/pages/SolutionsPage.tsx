import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHero } from '../components/PageHero';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';
import { FAQSection } from '../components/FAQSection';
import { QuickAnswer } from '../components/QuickAnswer';

const solutionCards = [
  { slug: 'customer-journey-systems', en: { title: 'Customer Journey Systems', desc: 'Map how customers move from interest to decision and remove friction from every step.' }, ar: { title: 'أنظمة رحلة العميل', desc: 'نرسم كيف ينتقل العميل من الاهتمام إلى القرار ونزيل نقاط التردد.' }, outcome: { en: 'Higher conversion', ar: 'تحويل أعلى' } },
  { slug: 'digital-experiences', en: { title: 'Digital Experiences', desc: 'Websites, landing pages, and flows designed to guide users toward action.' }, ar: { title: 'التجارب الرقمية', desc: 'مواقع وصفحات هبوط ومسارات مصممة لتوجيه المستخدم نحو القرار.' }, outcome: { en: 'Better engagement', ar: 'تفاعل أفضل' } },
  { slug: 'follow-up-systems', en: { title: 'Follow-Up Systems', desc: 'Organize leads, reminders, communication, and customer status.' }, ar: { title: 'أنظمة المتابعة', desc: 'ننظم العملاء المحتملين والتذكيرات والتواصل وحالة العميل.' }, outcome: { en: 'Better follow-up', ar: 'متابعة أفضل' } },
  { slug: 'visibility-insights', en: { title: 'Visibility & Insights', desc: 'Dashboards and signals that show what needs action.' }, ar: { title: 'الرؤية والتحليلات', desc: 'لوحات تحكم وإشارات تظهر ما يحتاج إجراءً.' }, outcome: { en: 'Clearer visibility', ar: 'وضوح أكبر' } },
  { slug: 'automation-layers', en: { title: 'Automation Layers', desc: 'Reduce repetitive work and speed up response times.' }, ar: { title: 'طبقات الأتمتة', desc: 'نقلل العمل المتكرر ونسرّع الاستجابة.' }, outcome: { en: 'Less manual work', ar: 'عمل يدوي أقل' } },
  { slug: 'ai-practical-decisions', en: { title: 'AI for Practical Decisions', desc: 'Use intelligence to improve follow-up, insights, and performance.' }, ar: { title: 'الذكاء للقرارات العملية', desc: 'نستخدم الذكاء لتحسين المتابعة والرؤى والأداء.' }, outcome: { en: 'Smarter operations', ar: 'تشغيل أذكى' } },
];

const stages = [
  { slug: 'build', en: { title: 'Build', desc: 'New businesses that need a digital foundation.' }, ar: { title: 'بناء', desc: 'أعمال جديدة تحتاج أساساً رقمياً.' } },
  { slug: 'start', en: { title: 'Start', desc: 'Existing businesses organizing scattered operations.' }, ar: { title: 'انطلاق', desc: 'أعمال قائمة تنظّم عملياتها المشتتة.' } },
  { slug: 'growth', en: { title: 'Growth', desc: 'Growing businesses scaling with control.' }, ar: { title: 'نمو', desc: 'أعمال نامية تتوسع بوضوح وتحكم.' } },
];

export function SolutionsPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  return (
    <>
      <SEO
        title="Solutions | ENSDIM - Behavior-Led Business Systems"
        description="ENSDIM solutions: customer journey systems, intelligent follow-up, automation layers, AI-driven decisions, and operational visibility for businesses in Egypt, Saudi Arabia, and UAE."
        keywords="business automation solutions Egypt, customer journey optimization, AI solutions Middle East, CRM solutions Saudi Arabia, follow-up automation UAE"
        canonical="/solutions"
      />
      <PageHero
        eyebrow={ar ? 'حلول إنسديم' : 'ENSDIM Solutions'}
        title={ar ? 'حلول مبنية حول السلوك والتشغيل والنمو.' : 'Solutions built around behavior, operations, and growth.'}
        subtitle={ar
          ? 'نربط رحلة العميل، المتابعة، البيانات، الأتمتة، والتجارب الرقمية داخل أنظمة تجعل إدارة العمل أوضح وأسهل.'
          : 'We connect customer journeys, follow-up, data, automation, and digital experiences into systems that make business easier to manage.'}
        primaryCTA={{ label: ar ? 'احجز استشارة' : 'Book a Consultation', href: '/book-consultation' }}
        secondaryCTA={{ label: ar ? 'استكشف المشكلات' : 'Explore Problems', href: '/solutions/problems' }}
        breadcrumbs={[{ label: 'Solutions', labelAr: 'الحلول', href: '/solutions' }]}
        lang={ar ? 'ar' : 'en'}
      />

      <QuickAnswer
        question={ar ? 'ما الحلول التي تقدمها إنسديم؟' : 'What solutions does ENSDIM provide?'}
        answer={ar
          ? 'تقدم إنسديم ستة أنواع من الحلول: أنظمة رحلة العميل، التجارب الرقمية، أنظمة المتابعة، الرؤية والتحليلات، طبقات الأتمتة، والذكاء للقرارات العملية. كل حل مصمم حول طريقة عمل نشاطك الفعلي وليس كبرمجيات جاهزة.'
          : 'ENSDIM provides six solution types: Customer Journey Systems, Digital Experiences, Follow-Up Systems, Visibility & Insights, Automation Layers, and AI for Practical Decisions. Every solution is designed around how your business actually works, not installed as generic software.'}
      />

      {/* Solutions grid */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-2">{ar ? 'ماذا نبني' : 'What we build'}</h2>
            <p className="text-sm text-[#69717D]">{ar ? 'ستة محاور حل مترابطة تعمل معاً.' : 'Six interconnected solution areas that work together.'}</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {solutionCards.map((s, i) => (
              <ScrollReveal key={s.slug} delay={i * 0.06}>
                <Link to={`/solutions/${s.slug}`} className="block border border-[#E5E5E5] rounded-2xl p-6 hover:border-[#6D5DF6] hover:shadow-md transition-all duration-200 group h-full">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] px-2.5 py-1 bg-[#EEEAFE] text-[#6D5DF6] rounded-full font-semibold">
                      {ar ? s.outcome.ar : s.outcome.en}
                    </span>
                    <ArrowRight size={13} className="text-[#6D5DF6] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-base font-bold text-[#101418] mb-2 leading-snug">{ar ? s.ar.title : s.en.title}</h3>
                  <p className="text-sm text-[#69717D] leading-relaxed">{ar ? s.ar.desc : s.en.desc}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Where is your business now? */}
      <section className="py-16 bg-[#EEEAFE]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-2">{ar ? 'أين عملك الآن؟' : 'Where is your business now?'}</h2>
            <p className="text-sm text-[#69717D]">{ar ? 'اختر المرحلة التي تناسب وضعك.' : 'Choose the stage that fits where you are.'}</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-5">
            {stages.map((st, i) => (
              <ScrollReveal key={st.slug} delay={i * 0.08}>
                <Link to={`/solutions/${st.slug}`} className="block bg-white rounded-2xl p-6 border border-[#E5E5E5] hover:border-[#6D5DF6] hover:shadow-md transition-all duration-200 group">
                  <h3 className="text-lg font-bold text-[#101418] mb-2">{ar ? st.ar.title : st.en.title}</h3>
                  <p className="text-sm text-[#69717D] mb-4">{ar ? st.ar.desc : st.en.desc}</p>
                  <span className="inline-flex items-center gap-1 text-sm text-[#6D5DF6] font-medium group-hover:gap-2 transition-all">
                    {ar ? 'اعرف أكثر' : 'Learn more'} <ArrowRight size={13} />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Problems Library CTA */}
      <section className="py-14 bg-white border-y border-[#E5E5E5]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-[#101418] mb-3">{ar ? 'مشكلات نحلها' : 'Problems we solve'}</h2>
            <p className="text-sm text-[#69717D] mb-6">{ar ? 'تعرّف على المشكلات التشغيلية الشائعة وكيف نتعامل معها.' : 'Explore common operating problems and how we approach them.'}</p>
            <Link to="/solutions/problems" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#6D5DF6] text-white rounded-xl hover:bg-[#5d4de6] transition-colors text-sm font-semibold">
              {ar ? 'استكشف مكتبة المشكلات' : 'Explore Problems Library'} <ArrowRight size={15} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <FAQSection
        title={ar ? 'أسئلة شائعة حول حلول إنسديم' : 'Frequently Asked Questions About ENSDIM Solutions'}
        faqs={ar ? [
          { question: 'ما الفرق بين خدمات إنسديم وحلولها؟', answer: 'الخدمات تصف ما نبنيه تقنيًا (مثل CRM أو موقع ويب). الحلول تصف المشكلة التي نحلها (مثل تحسين متابعة العملاء أو زيادة وضوح التشغيل). الحلول هي المنظور، والخدمات هي الأداة.' },
          { question: 'هل أنظمة رحلة العميل مناسبة لجميع الأعمال؟', answer: 'نعم. كل عمل لديه عملاء ينتقلون من التعرف إلى القرار. أنظمة رحلة العميل تحلل وتُحسّن هذا المسار لزيادة التحويل وتقليل نسبة الفاقد.' },
          { question: 'كيف تعمل طبقات الأتمتة في إنسديم؟', answer: 'نبني أتمتة تستجيب لإشارات العميل والعمليات — مثل الرد التلقائي على الاستفسارات، تذكير العملاء المحتملين، تصنيف الطلبات، والتنبيه بالمهام المتأخرة.' },
          { question: 'هل يمكنني طلب حل واحد فقط أم يجب الاشتراك في الحزمة الكاملة؟', answer: 'يمكنك البدء بحل واحد. كثير من عملاء إنسديم يبدأون بنظام المتابعة أو لوحة التحكم، ثم يضيفون طبقات الأتمتة والذكاء الاصطناعي تدريجيًا بعد رؤية النتائج الأولى.' },
        ] : [
          { question: 'What is the difference between ENSDIM services and solutions?', answer: 'Services describe what we build technically (e.g., CRM, website). Solutions describe the problem we are solving (e.g., better follow-up, operational visibility). Solutions are the lens; services are the tool.' },
          { question: 'Are customer journey systems suitable for all businesses?', answer: 'Yes. Every business has customers moving from awareness to decision. Customer journey systems analyze and improve that path to increase conversion and reduce drop-off at each stage.' },
          { question: 'How do ENSDIM automation layers work?', answer: 'We build automation that responds to customer and operational signals — such as automatically replying to inquiries, reminding leads, classifying requests, and alerting on delayed tasks.' },
          { question: 'Can I start with just one solution or do I need the full package?', answer: 'You can start with one solution. Many ENSDIM clients start with follow-up systems or dashboards, then add automation and AI layers gradually after seeing initial results.' },
          { question: 'Does ENSDIM measure outcomes after implementation?', answer: 'Yes. Every ENSDIM project includes an Improve phase — we measure performance data after launch, optimize workflows, and refine the system based on real usage and results.' },
        ]}
      />

      {/* Final CTA */}
      <section className="py-14 bg-[#0f0d19] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold mb-3">{ar ? 'جاهز لحل مشكلة التشغيل الحقيقية؟' : 'Ready to solve the real operating problem?'}</h2>
          <p className="text-sm text-[#EEEAFE]/60 mb-6">{ar ? 'أخبرنا أين تتعطل رحلة العميل.' : 'Tell us where your customer journey breaks.'}</p>
          <Link to="/book-consultation" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] transition-colors text-sm font-semibold">
            {ar ? 'احجز استشارة' : 'Book a Consultation'} <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
