import { useParams, Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHero } from '../components/PageHero';
import { ScrollReveal } from '../components/ScrollReveal';
import { ConsultationForm } from '../components/ConsultationForm';

const problemData: Record<string, {
  en: { title: string; impact: string; situation: string; whyMatters: string[]; solution: { title: string; slug: string }; modules: string[]; caseStudy: { title: string; slug: string } };
  ar: { title: string; impact: string; situation: string; whyMatters: string[]; solution: { title: string; slug: string }; modules: string[]; caseStudy: { title: string; slug: string } };
}> = {
  'leads-get-lost': {
    en: {
      title: 'Leads get lost',
      impact: 'Businesses lose revenue before the first conversation even starts.',
      situation: 'Inquiries arrive through WhatsApp, phone calls, Instagram DMs, and website forms. There\'s no central inbox, no tracking, and no way to know which leads were followed up or which were missed.',
      whyMatters: ['Lost leads = lost revenue', 'First response time is critical for conversion', 'No tracking means no recovery or improvement', 'Scattered channels create team confusion'],
      solution: { title: 'Follow-Up Systems', slug: 'follow-up-systems' },
      modules: ['Unified Lead Inbox', 'Source Tracking', 'Lead Status Pipeline', 'Automated First Response', 'Follow-Up Reminders', 'Missed Lead Alerts'],
      caseStudy: { title: 'From scattered follow-up to a clearer operating system', slug: 'scattered-follow-up' },
    },
    ar: {
      title: 'العملاء المحتملون يضيعون',
      impact: 'الأعمال تخسر إيرادات قبل أن تبدأ المحادثة الأولى.',
      situation: 'تصل الاستفسارات عبر واتساب، المكالمات الهاتفية، إنستغرام، ونماذج الموقع. لا صندوق بريد مركزي، لا تتبع، ولا طريقة لمعرفة العملاء الذين تمت متابعتهم أو الفائتين.',
      whyMatters: ['العملاء الضائعون = إيراد ضائع', 'وقت الرد الأول حاسم للتحويل', 'عدم التتبع يعني عدم التعافي أو التحسين', 'القنوات المشتتة تخلق ارتباكاً للفريق'],
      solution: { title: 'أنظمة المتابعة', slug: 'follow-up-systems' },
      modules: ['صندوق بريد موحد للعملاء المحتملين', 'تتبع المصدر', 'مسار حالة العميل المحتمل', 'رد أول تلقائي', 'تذكيرات المتابعة', 'تنبيهات العملاء الفائتين'],
      caseStudy: { title: 'من متابعة مشتتة إلى نظام تشغيلي أوضح', slug: 'scattered-follow-up' },
    },
  },
  'follow-up-memory': {
    en: {
      title: 'Follow-up depends on memory',
      impact: 'Sales and relationships are lost because the system is a person\'s head.',
      situation: 'The team knows they need to follow up, but there\'s no structured reminder. It happens when someone remembers, which means it often doesn\'t happen at all — especially when the team is busy.',
      whyMatters: ['Manual follow-up breaks under pressure', 'Customers feel forgotten and go elsewhere', 'No consistency means no predictable conversion', 'Team energy goes to remembering, not selling'],
      solution: { title: 'Follow-Up Systems', slug: 'follow-up-systems' },
      modules: ['Reminder System', 'Follow-Up Templates', 'Automated Nudges', 'Overdue Task Alerts', 'Status-Based Sequences', 'Team Accountability View'],
      caseStudy: { title: 'From scattered follow-up to a clearer operating system', slug: 'scattered-follow-up' },
    },
    ar: {
      title: 'المتابعة تعتمد على الذاكرة',
      impact: 'تضيع المبيعات والعلاقات لأن النظام موجود في رأس شخص ما.',
      situation: 'الفريق يعلم أنه يحتاج للمتابعة، لكن لا يوجد تذكير منظم. يحدث عندما يتذكر أحد، مما يعني أنه كثيراً ما لا يحدث أصلاً — خاصة عندما يكون الفريق مشغولاً.',
      whyMatters: ['المتابعة اليدوية تنهار تحت الضغط', 'العملاء يشعرون بالنسيان ويذهبون لمكان آخر', 'عدم الاتساق يعني عدم وجود تحويل متوقع', 'طاقة الفريق تذهب للتذكر، لا للبيع'],
      solution: { title: 'أنظمة المتابعة', slug: 'follow-up-systems' },
      modules: ['نظام التذكير', 'قوالب المتابعة', 'تنبيهات تلقائية', 'تنبيهات المهام المتأخرة', 'تسلسلات قائمة على الحالة', 'عرض مساءلة الفريق'],
      caseStudy: { title: 'من متابعة مشتتة إلى نظام تشغيلي أوضح', slug: 'scattered-follow-up' },
    },
  },
  'slow-response': {
    en: {
      title: 'Customers wait too long',
      impact: 'Slow response is one of the top reasons businesses lose customers to competitors.',
      situation: 'When a potential customer reaches out, they\'re comparing options. If the first response takes hours or days, they\'ve already decided. Slow reply = lost deal.',
      whyMatters: ['First response speed is the #1 conversion factor in service businesses', 'Customers associate slow reply with poor service', 'Competitors who respond faster win the deal', 'Every hour of delay reduces conversion probability'],
      solution: { title: 'Automation Layers', slug: 'automation-layers' },
      modules: ['Automated Instant Response', 'Smart Routing to Right Person', 'SLA Monitoring & Alerts', 'Response Time Dashboard', 'Escalation Triggers', 'After-Hours Handling'],
      caseStudy: { title: 'Faster response for a service business', slug: 'faster-response' },
    },
    ar: {
      title: 'العملاء ينتظرون طويلاً',
      impact: 'بطء الاستجابة من أبرز أسباب خسارة الأعمال لعملائها للمنافسين.',
      situation: 'عندما يتواصل عميل محتمل، فهو يقارن خياراته. إذا استغرق الرد الأول ساعات أو أيام، فقد قرر بالفعل. الرد البطيء = صفقة مفقودة.',
      whyMatters: ['سرعة الرد الأول هي عامل التحويل الأول في أعمال الخدمات', 'العملاء يربطون الرد البطيء بضعف الخدمة', 'المنافسون الذين يردون أسرع يفوزون بالصفقة', 'كل ساعة تأخير تقلل احتمالية التحويل'],
      solution: { title: 'طبقات الأتمتة', slug: 'automation-layers' },
      modules: ['رد فوري تلقائي', 'توجيه ذكي للشخص المناسب', 'مراقبة وتنبيهات SLA', 'لوحة وقت الاستجابة', 'محفزات التصعيد', 'معالجة ما بعد ساعات العمل'],
      caseStudy: { title: 'استجابة أسرع لعمل خدمي', slug: 'faster-response' },
    },
  },
  'no-visibility': {
    en: {
      title: 'Management lacks visibility',
      impact: 'Decisions made without data are expensive guesses.',
      situation: 'The manager asks: how many leads do we have? Who followed up? What\'s the conversion rate? Nobody knows. The data exists — in WhatsApp chats, spreadsheets, and team heads — but it\'s not usable.',
      whyMatters: ['You can\'t improve what you can\'t see', 'Operational problems go undetected until they\'re crises', 'Resource allocation is guesswork', 'Growth plans are built on assumptions'],
      solution: { title: 'Visibility & Insights', slug: 'visibility-insights' },
      modules: ['Live Operations Dashboard', 'Lead Pipeline View', 'Team Performance Tracking', 'Conversion Rate Analytics', 'Customer Satisfaction Signals', 'Weekly Management Reports'],
      caseStudy: { title: 'Clearer dashboards for growing operations', slug: 'clearer-visibility' },
    },
    ar: {
      title: 'الإدارة تفتقر للرؤية',
      impact: 'القرارات المتخذة بدون بيانات تخمينات مكلفة.',
      situation: 'يسأل المدير: كم عميل محتمل لدينا؟ من تابع؟ ما معدل التحويل؟ لا أحد يعلم. البيانات موجودة — في محادثات واتساب، جداول البيانات، رؤوس الفريق — لكنها غير قابلة للاستخدام.',
      whyMatters: ['لا يمكنك تحسين ما لا تراه', 'مشاكل التشغيل لا تُكتشف حتى تصبح أزمات', 'تخصيص الموارد تخمين', 'خطط النمو مبنية على افتراضات'],
      solution: { title: 'الرؤية والتحليلات', slug: 'visibility-insights' },
      modules: ['لوحة عمليات مباشرة', 'عرض مسار العملاء المحتملين', 'تتبع أداء الفريق', 'تحليلات معدل التحويل', 'إشارات رضا العملاء', 'تقارير إدارية أسبوعية'],
      caseStudy: { title: 'لوحات تحكم أوضح للعمليات النامية', slug: 'clearer-visibility' },
    },
  },
  'repeated-work': {
    en: {
      title: 'Teams repeat the same work',
      impact: 'Every hour spent on manual repetition is an hour not spent on customers.',
      situation: 'The team enters the same data in multiple places, sends the same message manually every time, copies information from one tool to another, and rebuilds the same documents again and again.',
      whyMatters: ['Manual work creates errors', 'Repetitive tasks lower team morale', 'Scaling becomes impossible without automation', 'Response time suffers when team is occupied with admin'],
      solution: { title: 'Automation Layers', slug: 'automation-layers' },
      modules: ['Data Sync Between Systems', 'Template-Based Communication', 'Auto-Assignment of Tasks', 'Form-to-CRM Automation', 'Recurring Task Automation', 'Document Generation'],
      caseStudy: { title: 'Reducing repeated work with structured workflows', slug: 'reduced-manual-work' },
    },
    ar: {
      title: 'الفرق تكرر نفس العمل',
      impact: 'كل ساعة تُصرف في تكرار يدوي هي ساعة لم تُصرف على العملاء.',
      situation: 'الفريق يدخل نفس البيانات في أماكن متعددة، يرسل نفس الرسالة يدوياً في كل مرة، ينسخ المعلومات من أداة لأخرى، ويعيد بناء نفس الوثائق مرة بعد مرة.',
      whyMatters: ['العمل اليدوي يخلق أخطاء', 'المهام المتكررة تخفض معنويات الفريق', 'التوسع يصبح مستحيلاً بدون أتمتة', 'وقت الاستجابة يعاني عندما يكون الفريق مشغولاً بالإدارة'],
      solution: { title: 'طبقات الأتمتة', slug: 'automation-layers' },
      modules: ['مزامنة البيانات بين الأنظمة', 'تواصل قائم على القوالب', 'توزيع تلقائي للمهام', 'أتمتة نماذج إلى CRM', 'أتمتة المهام المتكررة', 'إنشاء الوثائق'],
      caseStudy: { title: 'تقليل العمل المتكرر بسير عمل منظمة', slug: 'reduced-manual-work' },
    },
  },
  'growth-pressure': {
    en: {
      title: 'Growth creates pressure',
      impact: 'A business that can\'t manage growth is a business that will stop growing.',
      situation: 'When the team was small, everything worked. Now there are more customers, more inquiries, more team members — and everything is harder. The system that worked at 10 customers doesn\'t work at 100.',
      whyMatters: ['Growth without structure creates chaos', 'New team members have no clear processes to follow', 'Management loses oversight as volume increases', 'Customer experience deteriorates under pressure'],
      solution: { title: 'Visibility & Insights + AI for Practical Decisions', slug: 'visibility-insights' },
      modules: ['Scalable CRM Architecture', 'Team Process Documentation', 'AI-Assisted Lead Prioritization', 'Performance Dashboards', 'Capacity Planning Tools', 'Automated Escalation Paths'],
      caseStudy: { title: 'Scaling operations with better control', slug: 'scaling-with-control' },
    },
    ar: {
      title: 'النمو يخلق ضغطاً',
      impact: 'عمل لا يستطيع إدارة النمو هو عمل سيتوقف عن النمو.',
      situation: 'عندما كان الفريق صغيراً، كل شيء عمل. الآن هناك المزيد من العملاء، الاستفسارات، أعضاء الفريق — وكل شيء أصعب. النظام الذي نجح مع 10 عملاء لا ينجح مع 100.',
      whyMatters: ['النمو بدون هيكل يخلق فوضى', 'أعضاء الفريق الجدد ليس لديهم عمليات واضحة للاتباع', 'الإدارة تفقد الإشراف مع زيادة الحجم', 'تجربة العميل تتدهور تحت الضغط'],
      solution: { title: 'الرؤية والتحليلات + الذكاء للقرارات العملية', slug: 'visibility-insights' },
      modules: ['هندسة CRM قابلة للتوسع', 'توثيق عمليات الفريق', 'ترتيب أولوية العملاء بمساعدة الذكاء', 'لوحات الأداء', 'أدوات تخطيط الطاقة', 'مسارات تصعيد تلقائية'],
      caseStudy: { title: 'توسع العمليات بتحكم أفضل', slug: 'scaling-with-control' },
    },
  },
};

export function ProblemDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const ar = language === 'ar';
  const data = problemData[slug || ''];
  const d = data ? (ar ? data.ar : data.en) : null;

  if (!d) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#101418] mb-4">{ar ? 'الصفحة غير موجودة' : 'Problem not found'}</h1>
          <Link to="/solutions/problems" className="text-[#6D5DF6] hover:underline">{ar ? 'عرض جميع المشكلات' : 'View all problems'}</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHero
        eyebrow={ar ? 'مشكلة شائعة' : 'Common Business Problem'}
        title={d.title}
        subtitle={d.impact}
        primaryCTA={{ label: ar ? 'اعرض الحل الموصى به' : 'See recommended solution', href: `/solutions/${d.solution.slug}` }}
        secondaryCTA={{ label: ar ? 'احجز استشارة' : 'Book a Consultation', href: '/book-consultation' }}
      />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
          <ScrollReveal>
            <h2 className="text-xl font-bold text-[#101418] mb-3">{ar ? 'ما الذي يحدث؟' : 'What is happening?'}</h2>
            <p className="text-sm text-[#69717D] leading-relaxed">{d.situation}</p>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <h2 className="text-xl font-bold text-[#101418] mb-4">{ar ? 'لماذا يهم' : 'Why it matters'}</h2>
            <ul className="space-y-2.5">
              {d.whyMatters.map((w, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#69717D]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D63A3A] mt-1.5 flex-shrink-0" />
                  {w}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <div className="bg-[#EEEAFE] rounded-2xl p-6">
              <p className="text-xs font-semibold text-[#6D5DF6] uppercase tracking-wider mb-2">{ar ? 'الحل الموصى به' : 'ENSDIM recommended solution'}</p>
              <h3 className="text-lg font-bold text-[#101418] mb-3">{d.solution.title}</h3>
              <Link to={`/solutions/${d.solution.slug}`} className="inline-flex items-center gap-1.5 text-sm text-[#6D5DF6] font-medium hover:gap-2.5 transition-all">
                {ar ? 'اعرض هذا الحل' : 'Explore this solution'} <ArrowRight size={13} />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.16}>
            <h2 className="text-xl font-bold text-[#101418] mb-4">{ar ? 'وحدات النظام المقترحة' : 'Suggested system modules'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {d.modules.map((m, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-[#6D5DF6] flex-shrink-0" />
                  <span className="text-sm text-[#101418]">{m}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="border border-[#E5E5E5] rounded-2xl p-6">
              <p className="text-xs text-[#69717D] uppercase tracking-wider mb-2">{ar ? 'دراسة حالة ذات صلة' : 'Related case study'}</p>
              <h3 className="text-base font-bold text-[#101418] mb-3">{d.caseStudy.title}</h3>
              <Link to={`/case-studies/${d.caseStudy.slug}`} className="inline-flex items-center gap-1.5 text-sm text-[#6D5DF6] font-medium hover:gap-2.5 transition-all">
                {ar ? 'عرض دراسة الحالة' : 'View Case Study'} <ArrowRight size={13} />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.24}>
            <ConsultationForm
              title={ar ? 'لنحل هذه المشكلة.' : "Let's solve this problem."}
              hiddenFields={{
                source_page: `/problems/${slug}`,
                clicked_problem: d.title,
                interest_type: 'problem_solution',
              }}
            />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
