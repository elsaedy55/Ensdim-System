import { useParams, Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHero } from '../components/PageHero';
import { ScrollReveal } from '../components/ScrollReveal';
import { ConsultationForm } from '../components/ConsultationForm';
import { SEO } from '../components/SEO';

const caseStudies: Record<string, {
  en: { title: string; outcome: string; situation: string; problem: string; built: string[]; outcomes: string[]; solution: { title: string; slug: string }; problem_page: { title: string; slug: string } };
  ar: { title: string; outcome: string; situation: string; problem: string; built: string[]; outcomes: string[]; solution: { title: string; slug: string }; problem_page: { title: string; slug: string } };
}> = {
  'scattered-follow-up': {
    en: {
      title: 'From scattered follow-up to a clearer operating system',
      outcome: 'A service business reduced missed leads by organizing follow-up into a structured CRM workflow.',
      situation: 'A mid-size service business was receiving 60+ inquiries per week through WhatsApp, phone calls, and website forms. No one knew which leads were new, which needed follow-up, and which had converted.',
      problem: 'Follow-up was inconsistent. High-potential leads went cold because no one followed up on time. The sales team didn\'t have a shared view, and the owner had no visibility.',
      built: ['Unified CRM with lead pipeline', 'WhatsApp & form integration', 'Automated follow-up reminders', 'Status-based workflows', 'Weekly performance dashboard'],
      outcomes: ['40% fewer missed leads', 'Follow-up response time reduced from 24h to under 2h', 'Team no longer relies on memory', 'Management has clear weekly view'],
      solution: { title: 'Follow-Up Systems', slug: 'follow-up-systems' },
      problem_page: { title: 'Leads get lost', slug: 'leads-get-lost' },
    },
    ar: {
      title: 'من متابعة مشتتة إلى نظام تشغيلي أوضح',
      outcome: 'قلّل عمل خدمي العملاء الفائتين بتنظيم المتابعة في سير عمل CRM منظمة.',
      situation: 'كان عمل خدمي متوسط الحجم يستقبل أكثر من 60 استفساراً أسبوعياً عبر واتساب، المكالمات، ونماذج الموقع. لم يكن أحد يعلم أي العملاء المحتملين جدد، أيهم يحتاج متابعة، وأيهم حوّل.',
      problem: 'كانت المتابعة غير متسقة. العملاء المحتملون ذوو الإمكانية العالية يبردون لأنه لا أحد يتابع في الوقت المناسب.',
      built: ['CRM موحد مع مسار العميل المحتمل', 'تكامل واتساب والنماذج', 'تذكيرات متابعة تلقائية', 'سير عمل قائمة على الحالة', 'لوحة أداء أسبوعية'],
      outcomes: ['40% عملاء فائتون أقل', 'وقت استجابة المتابعة من 24 ساعة لأقل من ساعتين', 'الفريق لم يعد يعتمد على الذاكرة', 'الإدارة لديها رؤية أسبوعية واضحة'],
      solution: { title: 'أنظمة المتابعة', slug: 'follow-up-systems' },
      problem_page: { title: 'العملاء المحتملون يضيعون', slug: 'leads-get-lost' },
    },
  },
  'faster-response': {
    en: {
      title: 'Faster response for a service business',
      outcome: 'An automation layer reduced first response time from hours to minutes.',
      situation: 'A healthcare services business was losing potential patients because response to inquiries was slow — sometimes 6–12 hours. Patients would contact multiple providers and choose whoever responded first.',
      problem: 'The front desk team manually read every WhatsApp message. Peak hours created a backlog. No system existed to route inquiries or send instant acknowledgments.',
      built: ['Automated instant acknowledgment', 'Smart routing based on inquiry type', 'Escalation triggers for urgent requests', 'After-hours response handling', 'Response time tracking dashboard'],
      outcomes: ['First response under 3 minutes', 'Patient loss to competitors reduced by 35%', 'Front desk load reduced significantly', 'SLA visibility for management'],
      solution: { title: 'Automation Layers', slug: 'automation-layers' },
      problem_page: { title: 'Customers wait too long', slug: 'slow-response' },
    },
    ar: {
      title: 'استجابة أسرع لعمل خدمي',
      outcome: 'قلّلت طبقة الأتمتة وقت الاستجابة الأول من ساعات لدقائق.',
      situation: 'كان عمل خدمات صحية يخسر مرضى محتملين لأن الاستجابة للاستفسارات كانت بطيئة — أحياناً 6-12 ساعة. المرضى يتواصلون مع مزودين متعددين ويختارون من يرد أولاً.',
      problem: 'كان فريق الاستقبال يقرأ كل رسالة واتساب يدوياً. ساعات الذروة خلقت تراكماً. لم يكن هناك نظام للتوجيه أو الردود الفورية.',
      built: ['رد فوري تلقائي', 'توجيه ذكي حسب نوع الاستفسار', 'محفزات تصعيد للطلبات العاجلة', 'معالجة ما بعد ساعات العمل', 'لوحة تتبع وقت الاستجابة'],
      outcomes: ['الرد الأول في أقل من 3 دقائق', 'انخفاض خسارة المرضى للمنافسين 35%', 'انخفاض كبير في حمل الاستقبال', 'رؤية SLA للإدارة'],
      solution: { title: 'طبقات الأتمتة', slug: 'automation-layers' },
      problem_page: { title: 'العملاء ينتظرون طويلاً', slug: 'slow-response' },
    },
  },
  'clearer-visibility': {
    en: {
      title: 'Clearer dashboards for growing operations',
      outcome: 'A management team replaced spreadsheets and WhatsApp reports with live dashboards.',
      situation: 'A growing real estate agency had 8 agents and 3 managers. Every Monday, someone spent hours pulling reports from different sources — often wrong and outdated by Tuesday.',
      problem: 'No real-time data. Performance reviews were based on incomplete information. Management couldn\'t see which agents were active, which leads were hot, or where bottlenecks were.',
      built: ['Live sales pipeline dashboard', 'Agent performance tracking', 'Lead status & activity reports', 'Conversion rate analytics', 'Automated weekly digest'],
      outcomes: ['Weekly reporting time: 4 hours → 0', 'Management reviews improved with real data', 'Agents more accountable', 'Faster decisions on resource allocation'],
      solution: { title: 'Visibility & Insights', slug: 'visibility-insights' },
      problem_page: { title: 'Management lacks visibility', slug: 'no-visibility' },
    },
    ar: {
      title: 'لوحات تحكم أوضح للعمليات النامية',
      outcome: 'استبدل فريق الإدارة جداول البيانات وتقارير واتساب بلوحات تحكم مباشرة.',
      situation: 'كانت وكالة عقارات نامية لديها 8 وكلاء و3 مدراء. كل إثنين، شخص ما يقضي ساعات يجمع تقارير من مصادر مختلفة — كثيراً ما تكون خاطئة وقديمة يوم الثلاثاء.',
      problem: 'لا بيانات فورية. مراجعات الأداء كانت مبنية على معلومات غير مكتملة. الإدارة لم تستطع رؤية أي الوكلاء نشطون أو أين نقاط الاختناق.',
      built: ['لوحة مسار المبيعات المباشرة', 'تتبع أداء الوكلاء', 'تقارير حالة ونشاط العملاء المحتملين', 'تحليلات معدل التحويل', 'ملخص أسبوعي تلقائي'],
      outcomes: ['وقت التقرير الأسبوعي: 4 ساعات → صفر', 'مراجعات الإدارة تحسّنت ببيانات حقيقية', 'الوكلاء أكثر مساءلة', 'قرارات أسرع في تخصيص الموارد'],
      solution: { title: 'الرؤية والتحليلات', slug: 'visibility-insights' },
      problem_page: { title: 'الإدارة تفتقر للرؤية', slug: 'no-visibility' },
    },
  },
  'reduced-manual-work': {
    en: {
      title: 'Reducing repeated work with structured workflows',
      outcome: 'Automating repetitive tasks freed 12+ team hours per week.',
      situation: 'A professional services firm had staff spending Monday entering weekend inquiry data, sending welcome messages, and assigning leads manually — repetitive and error-prone.',
      problem: 'Three staff members spent 4+ hours each on tasks that should take 10 minutes. Data entry errors caused follow-up gaps. Team was frustrated.',
      built: ['Form-to-CRM automation', 'Automated welcome sequences', 'Auto-assignment by service type', 'Duplicate detection', 'Data validation workflows'],
      outcomes: ['12+ hours of team time freed weekly', 'Data entry errors eliminated', 'First communication now instant', 'Team shifted to higher-value work'],
      solution: { title: 'Automation Layers', slug: 'automation-layers' },
      problem_page: { title: 'Teams repeat the same work', slug: 'repeated-work' },
    },
    ar: {
      title: 'تقليل العمل المتكرر بسير عمل منظمة',
      outcome: 'أتمتة المهام المتكررة حرّرت أكثر من 12 ساعة من وقت الفريق أسبوعياً.',
      situation: 'كانت شركة خدمات مهنية لديها موظفون يقضون يوم الإثنين في إدخال بيانات، إرسال رسائل ترحيب يدوياً، وتوزيع العملاء — متكرر وعرضة للأخطاء.',
      problem: 'كان ثلاثة موظفين يقضون 4+ ساعات كل واحد في مهام يجب أن تستغرق 10 دقائق. أخطاء إدخال البيانات سببت فجوات في المتابعة.',
      built: ['أتمتة النموذج إلى CRM', 'تسلسلات ترحيب تلقائية', 'توزيع تلقائي حسب نوع الخدمة', 'كشف التكرار', 'سير عمل التحقق من البيانات'],
      outcomes: ['أكثر من 12 ساعة محررة أسبوعياً', 'إلغاء أخطاء إدخال البيانات', 'التواصل الأول فوري الآن', 'تحوّل الفريق لعمل ذو قيمة أعلى'],
      solution: { title: 'طبقات الأتمتة', slug: 'automation-layers' },
      problem_page: { title: 'الفرق تكرر نفس العمل', slug: 'repeated-work' },
    },
  },
  'scaling-with-control': {
    en: {
      title: 'Scaling operations with better control',
      outcome: 'A growing business added structure, dashboards, and AI signals to manage increased volume without chaos.',
      situation: 'An operations-heavy business tripled its client base in 18 months. What was manageable for 30 clients became unmanageable for 90. The team was overwhelmed and quality was slipping.',
      problem: 'No system to prioritize urgent clients. No visibility into at-risk accounts. No documented processes for new hires.',
      built: ['AI lead prioritization model', 'At-risk client alerting system', 'Operations manual documentation', 'Team capacity dashboard', 'Automated escalation rules'],
      outcomes: ['Management regained control', 'At-risk client churn reduced by 28%', 'New team member onboarding 3x faster', 'Growth continued without operational collapse'],
      solution: { title: 'AI for Practical Decisions', slug: 'ai-practical-decisions' },
      problem_page: { title: 'Growth creates pressure', slug: 'growth-pressure' },
    },
    ar: {
      title: 'توسع العمليات بتحكم أفضل',
      outcome: 'أضاف عمل نامٍ هيكلاً ولوحات تحكم وإشارات ذكاء لإدارة الحجم المتزايد دون فوضى.',
      situation: 'ثلاثة أضعاف قاعدة عملاء عمل كثيف العمليات في 18 شهراً. ما كان قابلاً للإدارة لـ 30 عميلاً أصبح غير قابل للإدارة لـ 90.',
      problem: 'لا نظام لترتيب أولوية العملاء العاجلين. لا رؤية للعملاء المعرضين للخطر. لا توثيق للعمليات للموظفين الجدد.',
      built: ['نموذج ترتيب أولوية العملاء بالذكاء', 'نظام تنبيه العملاء المعرضين للخطر', 'توثيق دليل العمليات', 'لوحة طاقة الفريق', 'قواعد تصعيد تلقائية'],
      outcomes: ['الإدارة استعادت السيطرة', 'تقليل إلغاء عملاء المخاطر 28%', 'تأهيل أعضاء الفريق الجدد أسرع 3 مرات', 'استمر النمو دون انهيار التشغيل'],
      solution: { title: 'الذكاء للقرارات العملية', slug: 'ai-practical-decisions' },
      problem_page: { title: 'النمو يخلق ضغطاً', slug: 'growth-pressure' },
    },
  },
};

export function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const ar = language === 'ar';
  const data = caseStudies[slug || ''];
  const d = data ? (ar ? data.ar : data.en) : null;

  if (!d) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#101418] mb-4">{ar ? 'دراسة الحالة غير موجودة' : 'Case study not found'}</h1>
          <Link to="/case-studies" className="text-[#6D5DF6] hover:underline">{ar ? 'عرض جميع دراسات الحالة' : 'View all case studies'}</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${d.title} | ENSDIM Case Study`}
        description={`${d.outcome} ${d.situation}`}
        keywords="AI automation case study Egypt, business transformation Middle East, CRM implementation results"
        canonical={`/case-studies/${slug}`}
        ogType="article"
      />
      <PageHero
        eyebrow={ar ? 'دراسة حالة' : 'Case Study'}
        title={d.title}
        subtitle={d.outcome}
        primaryCTA={{ label: ar ? 'ابنِ نظاماً مشابهاً' : 'Build a similar system', href: '/book-consultation' }}
        secondaryCTA={{ label: ar ? 'عرض جميع دراسات الحالة' : 'View all case studies', href: '/case-studies' }}
        breadcrumbs={[
          { label: 'Case Studies', labelAr: 'دراسات الحالة', href: '/case-studies' },
          { label: d.title, href: `/case-studies/${slug}` },
        ]}
        lang={ar ? 'ar' : 'en'}
      />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
          <ScrollReveal>
            <h2 className="text-xl font-bold text-[#101418] mb-3">{ar ? 'الوضع' : 'Situation'}</h2>
            <p className="text-sm text-[#69717D] leading-relaxed">{d.situation}</p>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <h2 className="text-xl font-bold text-[#101418] mb-3">{ar ? 'المشكلة' : 'Problem'}</h2>
            <p className="text-sm text-[#69717D] leading-relaxed">{d.problem}</p>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <h2 className="text-xl font-bold text-[#101418] mb-4">{ar ? 'ماذا بنت إنسديم' : 'What ENSDIM built'}</h2>
            <ul className="space-y-2">
              {d.built.map((b, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-[#69717D]">
                  <div className="w-2 h-2 rounded-full bg-[#6D5DF6] flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.16}>
            <h2 className="text-xl font-bold text-[#101418] mb-4">{ar ? 'النتيجة' : 'Outcome'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {d.outcomes.map((o, i) => (
                <div key={i} className="p-4 bg-[#EEEAFE] rounded-xl">
                  <p className="text-sm font-medium text-[#101418]">{o}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 border border-[#E5E5E5] rounded-2xl">
                <p className="text-xs text-[#69717D] uppercase tracking-wider mb-2">{ar ? 'الحل المرتبط' : 'Related solution'}</p>
                <p className="text-sm font-bold text-[#101418] mb-3">{d.solution.title}</p>
                <Link to={`/solutions/${d.solution.slug}`} className="inline-flex items-center gap-1.5 text-sm text-[#6D5DF6] hover:underline">
                  {ar ? 'استكشف الحل' : 'Explore solution'} <ArrowRight size={13} />
                </Link>
              </div>
              <div className="p-5 border border-[#E5E5E5] rounded-2xl">
                <p className="text-xs text-[#69717D] uppercase tracking-wider mb-2">{ar ? 'المشكلة المرتبطة' : 'Related problem'}</p>
                <p className="text-sm font-bold text-[#101418] mb-3">{d.problem_page.title}</p>
                <Link to={`/problems/${d.problem_page.slug}`} className="inline-flex items-center gap-1.5 text-sm text-[#6D5DF6] hover:underline">
                  {ar ? 'اعرف المشكلة' : 'Explore problem'} <ArrowRight size={13} />
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
              title={ar ? 'هل تريد نتيجة مشابهة؟' : 'Want a similar result?'}
              hiddenFields={{
                source_page: `/case-studies/${slug}`,
                clicked_case_study: d?.title || '',
                interest_type: 'case_study',
              }}
            />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
