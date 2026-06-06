import { useParams, Link } from 'react-router';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHero } from '../components/PageHero';
import { ScrollReveal } from '../components/ScrollReveal';
import { ConsultationForm } from '../components/ConsultationForm';
import { SEO } from '../components/SEO';

const solutionData: Record<string, {
  en: { title: string; promise: string; problem: string; approach: string; modules: string[]; relatedProblem: string; relatedProblemSlug: string; relatedCaseStudy: string; relatedCaseStudySlug: string };
  ar: { title: string; promise: string; problem: string; approach: string; modules: string[]; relatedProblem: string; relatedProblemSlug: string; relatedCaseStudy: string; relatedCaseStudySlug: string };
}> = {
  'customer-journey-systems': {
    en: {
      title: 'Customer Journey Systems',
      promise: 'Map how customers move, hesitate, decide, and return.',
      problem: 'Most businesses don\'t know where customers drop off. They guess instead of measuring, and fix the wrong things.',
      approach: 'We map the full journey — from first awareness to post-sale — identifying friction points and designing structured flows that guide customers toward the next step.',
      modules: ['Journey Mapping & Audit', 'Touchpoint Design', 'Lead Flow Architecture', 'Conversion Checkpoints', 'Customer Return Triggers', 'Journey Analytics'],
      relatedProblem: 'Leads get lost', relatedProblemSlug: 'leads-get-lost',
      relatedCaseStudy: 'From scattered follow-up to a clearer operating system', relatedCaseStudySlug: 'scattered-follow-up',
    },
    ar: {
      title: 'أنظمة رحلة العميل',
      promise: 'رسّم كيف يتحرك العملاء، يترددون، يقررون، ويعودون.',
      problem: 'معظم الأعمال لا تعرف أين يتوقف العملاء. تخمّن بدل أن تقيس، وتصلح الأشياء الخاطئة.',
      approach: 'نرسم الرحلة الكاملة — من أول وعي حتى ما بعد البيع — نحدد نقاط الاحتكاك ونصمم مسارات منظمة تقود العملاء للخطوة التالية.',
      modules: ['رسم الرحلة والمراجعة', 'تصميم نقاط التواصل', 'هندسة تدفق العملاء', 'نقاط تحقق التحويل', 'محفزات عودة العملاء', 'تحليلات الرحلة'],
      relatedProblem: 'العملاء المحتملون يضيعون', relatedProblemSlug: 'leads-get-lost',
      relatedCaseStudy: 'من متابعة مشتتة إلى نظام تشغيلي أوضح', relatedCaseStudySlug: 'scattered-follow-up',
    },
  },
  'digital-experiences': {
    en: {
      title: 'Digital Experiences',
      promise: 'Websites and flows designed to guide users toward action.',
      problem: 'Generic websites don\'t convert. Visitors leave without clear next steps, and businesses lose leads before the conversation even starts.',
      approach: 'We design digital experiences around real customer behavior — what they read, where they hesitate, and what makes them act. Every page has a purpose.',
      modules: ['Conversion-Led Website Design', 'Landing Page Architecture', 'Lead Capture Flows', 'Mobile-First UX', 'Speed & Performance Optimization', 'A/B Testing Frameworks'],
      relatedProblem: 'Leads get lost', relatedProblemSlug: 'leads-get-lost',
      relatedCaseStudy: 'From scattered follow-up to a clearer operating system', relatedCaseStudySlug: 'scattered-follow-up',
    },
    ar: {
      title: 'التجارب الرقمية',
      promise: 'مواقع ومسارات مصممة لتوجيه المستخدمين نحو الفعل.',
      problem: 'المواقع العادية لا تحوّل. الزوار يغادرون دون خطوات واضحة، والأعمال تخسر عملاء محتملين قبل أن تبدأ المحادثة.',
      approach: 'نصمم تجارب رقمية حول سلوك العميل الحقيقي — ما يقرؤه، أين يتردد، وما يجعله يتصرف. كل صفحة لها هدف.',
      modules: ['تصميم موقع يحقق تحويل', 'هندسة صفحة الهبوط', 'مسارات جمع العملاء المحتملين', 'تجربة مستخدم للجوال أولاً', 'تحسين السرعة والأداء', 'أطر اختبار A/B'],
      relatedProblem: 'العملاء المحتملون يضيعون', relatedProblemSlug: 'leads-get-lost',
      relatedCaseStudy: 'من متابعة مشتتة إلى نظام تشغيلي أوضح', relatedCaseStudySlug: 'scattered-follow-up',
    },
  },
  'follow-up-systems': {
    en: {
      title: 'Follow-Up Systems',
      promise: 'Organize leads, reminders, communication, and customer status.',
      problem: 'Businesses lose clients not because of bad products, but because follow-up is manual, inconsistent, and forgotten. No system means no recovery.',
      approach: 'We build structured follow-up workflows — organized by status, priority, and timing — so every lead has a clear next action, and no customer falls through the cracks.',
      modules: ['CRM Setup & Configuration', 'Lead Status Pipelines', 'Automated Reminders', 'WhatsApp & SMS Integration', 'Follow-Up Templates', 'Escalation Logic'],
      relatedProblem: 'Follow-up depends on memory', relatedProblemSlug: 'follow-up-memory',
      relatedCaseStudy: 'From scattered follow-up to a clearer operating system', relatedCaseStudySlug: 'scattered-follow-up',
    },
    ar: {
      title: 'أنظمة المتابعة',
      promise: 'نظّم العملاء المحتملين، التذكيرات، التواصل، وحالة العميل.',
      problem: 'الأعمال تخسر عملاء ليس بسبب منتجات سيئة، بل لأن المتابعة يدوية وغير متسقة ومنسية. لا نظام يعني لا استرداد.',
      approach: 'نبني سير عمل متابعة منظمة — مصنفة حسب الحالة والأولوية والتوقيت — بحيث يكون لكل عميل محتمل إجراء واضح، ولا يضيع عميل.',
      modules: ['إعداد وتكوين CRM', 'مسارات حالة العميل المحتمل', 'تذكيرات تلقائية', 'تكامل واتساب و SMS', 'قوالب المتابعة', 'منطق التصعيد'],
      relatedProblem: 'المتابعة تعتمد على الذاكرة', relatedProblemSlug: 'follow-up-memory',
      relatedCaseStudy: 'من متابعة مشتتة إلى نظام تشغيلي أوضح', relatedCaseStudySlug: 'scattered-follow-up',
    },
  },
  'visibility-insights': {
    en: {
      title: 'Visibility & Insights',
      promise: 'Dashboards and signals that show what needs action.',
      problem: 'Management decisions are made on gut feel because real data is scattered, delayed, or never visible. What you can\'t see, you can\'t improve.',
      approach: 'We build live dashboards and reporting systems that surface what matters — leads, performance, operations, and customer satisfaction — in a single clear view.',
      modules: ['Business Dashboards', 'Lead & Sales Reports', 'Operations Monitoring', 'Customer Satisfaction Tracking', 'KPI Frameworks', 'Automated Reporting'],
      relatedProblem: 'Management lacks visibility', relatedProblemSlug: 'no-visibility',
      relatedCaseStudy: 'Clearer dashboards for growing operations', relatedCaseStudySlug: 'clearer-visibility',
    },
    ar: {
      title: 'الرؤية والتحليلات',
      promise: 'لوحات تحكم وإشارات تظهر ما يحتاج إجراءً.',
      problem: 'قرارات الإدارة تُتخذ بالحدس لأن البيانات الحقيقية مشتتة أو متأخرة أو غير مرئية. ما لا تراه، لا تستطيع تحسينه.',
      approach: 'نبني لوحات تحكم حية وأنظمة تقارير تُظهر ما يهم — العملاء المحتملون، الأداء، التشغيل، رضا العميل — في عرض واضح واحد.',
      modules: ['لوحات تحكم الأعمال', 'تقارير العملاء المحتملين والمبيعات', 'مراقبة التشغيل', 'تتبع رضا العملاء', 'أطر KPI', 'تقارير تلقائية'],
      relatedProblem: 'الإدارة تفتقر للرؤية', relatedProblemSlug: 'no-visibility',
      relatedCaseStudy: 'لوحات تحكم أوضح للعمليات النامية', relatedCaseStudySlug: 'clearer-visibility',
    },
  },
  'automation-layers': {
    en: {
      title: 'Automation Layers',
      promise: 'Reduce repetitive work and speed up response times.',
      problem: 'Teams spend hours on tasks that should happen automatically. Slow response, repeated data entry, and missed triggers waste time and damage customer experience.',
      approach: 'We identify which tasks are repetitive, design automation logic around them, and connect systems so information flows without manual work.',
      modules: ['Workflow Automation Design', 'Trigger-Based Actions', 'Form & Lead Routing', 'Notification Systems', 'Cross-Platform Integrations', 'Response Time Optimization'],
      relatedProblem: 'Teams repeat the same work', relatedProblemSlug: 'repeated-work',
      relatedCaseStudy: 'Reducing repeated work with structured workflows', relatedCaseStudySlug: 'reduced-manual-work',
    },
    ar: {
      title: 'طبقات الأتمتة',
      promise: 'قلّل العمل المتكرر وسرّع أوقات الاستجابة.',
      problem: 'الفرق تقضي ساعات في مهام يجب أن تحدث تلقائياً. الاستجابة البطيئة، إدخال البيانات المتكرر، والمحفزات الفائتة تضيع الوقت وتضر تجربة العميل.',
      approach: 'نحدد المهام المتكررة، نصمم منطق الأتمتة حولها، ونربط الأنظمة لتتدفق المعلومات دون عمل يدوي.',
      modules: ['تصميم أتمتة سير العمل', 'إجراءات قائمة على المحفزات', 'توجيه النماذج والعملاء المحتملين', 'أنظمة الإشعارات', 'تكاملات متعددة المنصات', 'تحسين وقت الاستجابة'],
      relatedProblem: 'الفرق تكرر نفس العمل', relatedProblemSlug: 'repeated-work',
      relatedCaseStudy: 'تقليل العمل المتكرر بسير عمل منظمة', relatedCaseStudySlug: 'reduced-manual-work',
    },
  },
  'ai-practical-decisions': {
    en: {
      title: 'AI for Practical Decisions',
      promise: 'Use intelligence to improve follow-up, insights, and performance.',
      problem: 'AI without a business context is noise. Most businesses don\'t need more data — they need smarter signals that help them act faster and better.',
      approach: 'We layer practical AI into existing workflows — lead scoring, smart follow-up suggestions, behavioral analysis, and decision support — built around your real operations.',
      modules: ['Lead Scoring & Prioritization', 'AI-Powered Follow-Up Suggestions', 'Behavioral Pattern Analysis', 'Decision Support Systems', 'Natural Language Reporting', 'Smart Alert Systems'],
      relatedProblem: 'Growth creates pressure', relatedProblemSlug: 'growth-pressure',
      relatedCaseStudy: 'Scaling operations with better control', relatedCaseStudySlug: 'scaling-with-control',
    },
    ar: {
      title: 'الذكاء للقرارات العملية',
      promise: 'استخدم الذكاء لتحسين المتابعة والتحليلات والأداء.',
      problem: 'الذكاء الاصطناعي بدون سياق أعمال ضجيج. معظم الأعمال لا تحتاج مزيداً من البيانات — تحتاج إشارات أذكى تساعدها على التصرف بسرعة وأفضل.',
      approach: 'نضيف طبقة ذكاء اصطناعي عملي على سير العمل القائمة — تسجيل نقاط العملاء، اقتراحات متابعة ذكية، تحليل سلوكي، ودعم القرار — مبنياً حول عملياتك الفعلية.',
      modules: ['تسجيل وترتيب أولوية العملاء المحتملين', 'اقتراحات متابعة مدعومة بالذكاء', 'تحليل الأنماط السلوكية', 'أنظمة دعم القرار', 'تقارير اللغة الطبيعية', 'أنظمة تنبيه ذكية'],
      relatedProblem: 'النمو يخلق ضغطاً', relatedProblemSlug: 'growth-pressure',
      relatedCaseStudy: 'توسع العمليات بتحكم أفضل', relatedCaseStudySlug: 'scaling-with-control',
    },
  },
};

const outcomes = {
  en: ['Better conversion', 'Faster response', 'Clearer visibility', 'Easier management', 'Less manual work'],
  ar: ['تحويل أفضل', 'استجابة أسرع', 'رؤية أوضح', 'إدارة أسهل', 'عمل يدوي أقل'],
};

export function SolutionDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const ar = language === 'ar';
  const data = solutionData[slug || ''];
  const d = data ? (ar ? data.ar : data.en) : null;

  if (!d) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#101418] mb-4">{ar ? 'الصفحة غير موجودة' : 'Solution not found'}</h1>
          <Link to="/solutions" className="text-[#6D5DF6] hover:underline">{ar ? 'عرض جميع الحلول' : 'View all solutions'}</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${d.title} | ENSDIM Solutions`}
        description={`${d.promise} ${d.problem}`}
        keywords={`${d.title} Egypt, business solutions Saudi Arabia, ${d.title} UAE, ENSDIM solutions`}
        canonical={`/solutions/${slug}`}
      />
      <PageHero
        eyebrow={ar ? 'حلول إنسديم' : 'ENSDIM Solutions'}
        title={d.title}
        subtitle={d.promise}
        primaryCTA={{ label: ar ? 'احجز استشارة' : 'Book a Consultation', href: '/book-consultation' }}
        secondaryCTA={{ label: ar ? 'عرض جميع الحلول' : 'View all solutions', href: '/solutions' }}
        breadcrumbs={[
          { label: 'Solutions', labelAr: 'الحلول', href: '/solutions' },
          { label: d.title, href: `/solutions/${slug}` },
        ]}
        lang={ar ? 'ar' : 'en'}
      />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-14">

          <ScrollReveal>
            <h2 className="text-xl font-bold text-[#101418] mb-3">{ar ? 'ما الذي تحله' : 'What it solves'}</h2>
            <p className="text-[#69717D] text-sm leading-relaxed">{d.problem}</p>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <h2 className="text-xl font-bold text-[#101418] mb-3">{ar ? 'كيف تتعامل معه إنسديم' : 'How ENSDIM approaches it'}</h2>
            <p className="text-[#69717D] text-sm leading-relaxed">{d.approach}</p>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <h2 className="text-xl font-bold text-[#101418] mb-5">{ar ? 'ماذا نبني' : 'What we build'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {d.modules.map((m, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl">
                  <CheckCircle2 size={16} className="text-[#6D5DF6] flex-shrink-0" />
                  <span className="text-sm text-[#101418]">{m}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.16}>
            <h2 className="text-xl font-bold text-[#101418] mb-4">{ar ? 'نتائج الأعمال' : 'Business outcomes'}</h2>
            <div className="flex flex-wrap gap-2">
              {(ar ? outcomes.ar : outcomes.en).map((o, i) => (
                <span key={i} className="px-3 py-1.5 bg-[#6D5DF6]/10 text-[#6D5DF6] text-sm rounded-full font-medium">{o}</span>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 border border-[#E5E5E5] rounded-2xl bg-[#FAFAFA]">
                <p className="text-xs text-[#69717D] uppercase tracking-wider mb-2">{ar ? 'مشكلة ذات صلة' : 'Related problem'}</p>
                <p className="text-sm font-semibold text-[#101418] mb-3">{d.relatedProblem}</p>
                <Link to={`/problems/${d.relatedProblemSlug}`} className="text-[#6D5DF6] text-sm hover:underline inline-flex items-center gap-1">
                  {ar ? 'اعرف المشكلة' : 'Explore problem'} <ArrowRight size={13} />
                </Link>
              </div>
              <div className="p-5 border border-[#E5E5E5] rounded-2xl bg-[#FAFAFA]">
                <p className="text-xs text-[#69717D] uppercase tracking-wider mb-2">{ar ? 'دراسة حالة ذات صلة' : 'Related case study'}</p>
                <p className="text-sm font-semibold text-[#101418] mb-3">{d.relatedCaseStudy}</p>
                <Link to={`/case-studies/${d.relatedCaseStudySlug}`} className="text-[#6D5DF6] text-sm hover:underline inline-flex items-center gap-1">
                  {ar ? 'عرض دراسة الحالة' : 'View case study'} <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <ConsultationForm
              title={ar ? 'ابنِ هذا الحل لعملك.' : 'Build this solution for your business.'}
              hiddenFields={{
                source_page: `/solutions/${slug}`,
                clicked_solution: d?.title || '',
                interest_type: 'solution',
              }}
            />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
