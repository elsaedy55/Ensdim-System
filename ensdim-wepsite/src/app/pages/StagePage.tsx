import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHero } from '../components/PageHero';
import { ScrollReveal } from '../components/ScrollReveal';

const stageData = {
  build: {
    en: {
      title: 'Build the right digital foundation.',
      subtitle: 'For new businesses or early-stage projects that need a clear digital base before scaling.',
      whoFor: 'New businesses, early-stage startups, or established operations launching a new digital product.',
      problems: ['No website or weak digital presence', 'No system to capture leads', 'No clear customer journey', 'Unclear brand identity online'],
      modules: ['Website & Landing Page Design', 'Lead Capture Integration', 'Booking & Inquiry Flows', 'First CRM Layer', 'Analytics & Tracking Setup'],
      solutions: [
        { label: 'Digital Experiences', href: '/solutions/digital-experiences' },
        { label: 'Customer Journey Systems', href: '/solutions/customer-journey-systems' },
        { label: 'Follow-Up Systems', href: '/solutions/follow-up-systems' },
      ],
      services: [
        { label: 'Web Design & Digital Experience', href: '/services/web-design-digital-experience' },
        { label: 'CRM & Internal Systems', href: '/services/crm-internal-systems' },
      ],
    },
    ar: {
      title: 'ابنِ الأساس الرقمي الصحيح.',
      subtitle: 'للأعمال الجديدة أو المشاريع في بدايتها التي تحتاج إلى أساس رقمي واضح قبل التوسع.',
      whoFor: 'الأعمال الجديدة، الشركات الناشئة في مراحلها الأولى، أو العمليات القائمة التي تطلق منتجاً رقمياً جديداً.',
      problems: ['لا موقع أو حضور رقمي ضعيف', 'لا نظام لاستقبال العملاء المحتملين', 'لا رحلة عميل واضحة', 'هوية علامة تجارية غير واضحة عبر الإنترنت'],
      modules: ['تصميم الموقع وصفحة الهبوط', 'تكامل جمع العملاء المحتملين', 'مسارات الحجز والاستفسار', 'طبقة CRM الأولى', 'إعداد التحليلات والتتبع'],
      solutions: [
        { label: 'التجارب الرقمية', href: '/solutions/digital-experiences' },
        { label: 'أنظمة رحلة العميل', href: '/solutions/customer-journey-systems' },
        { label: 'أنظمة المتابعة', href: '/solutions/follow-up-systems' },
      ],
      services: [
        { label: 'تصميم الويب والتجربة الرقمية', href: '/services/web-design-digital-experience' },
        { label: 'CRM والأنظمة الداخلية', href: '/services/crm-internal-systems' },
      ],
    },
  },
  start: {
    en: {
      title: 'Organize operations before growth becomes harder.',
      subtitle: 'For existing businesses that already have customers but suffer from scattered follow-up and manual work.',
      whoFor: 'Businesses with active customers but no clear system. Things are working, but getting harder to manage.',
      problems: ['Follow-up is inconsistent', 'Team depends on WhatsApp and memory', 'No pipeline visibility', 'Manual tasks slow down the team'],
      modules: ['CRM Configuration', 'Follow-Up Workflow Automation', 'Team Task Assignment', 'Status Tracking Dashboard', 'Communication Integration'],
      solutions: [
        { label: 'Follow-Up Systems', href: '/solutions/follow-up-systems' },
        { label: 'Automation Layers', href: '/solutions/automation-layers' },
        { label: 'Visibility & Insights', href: '/solutions/visibility-insights' },
      ],
      services: [
        { label: 'CRM & Internal Systems', href: '/services/crm-internal-systems' },
        { label: 'AI Chatbots & Automation', href: '/services/ai-chatbots-automation' },
      ],
    },
    ar: {
      title: 'نظّم التشغيل قبل أن يصبح النمو أصعب.',
      subtitle: 'للأعمال القائمة التي لديها عملاء بالفعل لكنها تعاني من المتابعة المشتتة والعمل اليدوي.',
      whoFor: 'أعمال لديها عملاء نشطون لكن بدون نظام واضح. الأمور تسير، لكنها تصبح أصعب في الإدارة.',
      problems: ['المتابعة غير متسقة', 'الفريق يعتمد على واتساب والذاكرة', 'لا رؤية للمسار', 'المهام اليدوية تبطئ الفريق'],
      modules: ['تكوين CRM', 'أتمتة سير عمل المتابعة', 'توزيع مهام الفريق', 'لوحة متابعة الحالة', 'تكامل التواصل'],
      solutions: [
        { label: 'أنظمة المتابعة', href: '/solutions/follow-up-systems' },
        { label: 'طبقات الأتمتة', href: '/solutions/automation-layers' },
        { label: 'الرؤية والتحليلات', href: '/solutions/visibility-insights' },
      ],
      services: [
        { label: 'CRM والأنظمة الداخلية', href: '/services/crm-internal-systems' },
        { label: 'روبوتات الذكاء الاصطناعي والأتمتة', href: '/services/ai-chatbots-automation' },
      ],
    },
  },
  growth: {
    en: {
      title: 'Scale with visibility, intelligence, and control.',
      subtitle: 'For businesses ready to grow using data, dashboards, automation, and AI-supported decisions.',
      whoFor: 'Growing businesses that need better control over performance, leads, and operations at scale.',
      problems: ['No reliable performance data', 'Operations are hard to monitor', 'Decision-making is slow', 'Manual effort doesn\'t scale'],
      modules: ['Business Intelligence Dashboards', 'Predictive Lead Scoring', 'Automated Escalation Systems', 'AI-Assisted Follow-Up', 'Growth Analytics Layer'],
      solutions: [
        { label: 'Visibility & Insights', href: '/solutions/visibility-insights' },
        { label: 'AI for Practical Decisions', href: '/solutions/ai-practical-decisions' },
        { label: 'Automation Layers', href: '/solutions/automation-layers' },
      ],
      services: [
        { label: 'Data & Dashboards', href: '/services/data-dashboards' },
        { label: 'Growth & Marketing Systems', href: '/services/growth-marketing-systems' },
      ],
    },
    ar: {
      title: 'توسع بوضوح وذكاء وتحكم.',
      subtitle: 'للأعمال الجاهزة للنمو من خلال البيانات، لوحات المتابعة، الأتمتة، والقرارات المدعومة بالذكاء.',
      whoFor: 'الأعمال النامية التي تحتاج تحكماً أفضل في الأداء والعملاء المحتملين والعمليات على نطاق واسع.',
      problems: ['لا بيانات أداء موثوقة', 'العمليات يصعب مراقبتها', 'اتخاذ القرار بطيء', 'الجهد اليدوي لا يتوسع'],
      modules: ['لوحات ذكاء الأعمال', 'تسجيل نقاط العملاء التنبؤي', 'أنظمة تصعيد تلقائية', 'متابعة مدعومة بالذكاء', 'طبقة تحليلات النمو'],
      solutions: [
        { label: 'الرؤية والتحليلات', href: '/solutions/visibility-insights' },
        { label: 'الذكاء للقرارات العملية', href: '/solutions/ai-practical-decisions' },
        { label: 'طبقات الأتمتة', href: '/solutions/automation-layers' },
      ],
      services: [
        { label: 'البيانات ولوحات التحكم', href: '/services/data-dashboards' },
        { label: 'أنظمة النمو والتسويق', href: '/services/growth-marketing-systems' },
      ],
    },
  },
};

interface StagePageProps {
  stage: 'build' | 'start' | 'growth';
}

export function StagePage({ stage }: StagePageProps) {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const d = ar ? stageData[stage].ar : stageData[stage].en;

  return (
    <>
      <PageHero
        eyebrow={ar ? 'مرحلتك الآن' : 'Where you are now'}
        title={d.title}
        subtitle={d.subtitle}
        primaryCTA={{ label: ar ? 'احجز استشارة' : 'Book a Consultation', href: '/book-consultation' }}
        secondaryCTA={{ label: ar ? 'عرض جميع الحلول' : 'View all solutions', href: '/solutions' }}
        variant="light"
      />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
          <ScrollReveal>
            <h2 className="text-xl font-bold text-[#101418] mb-3">{ar ? 'لمن هذا؟' : 'Who this is for'}</h2>
            <p className="text-sm text-[#69717D] leading-relaxed">{d.whoFor}</p>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <h2 className="text-xl font-bold text-[#101418] mb-4">{ar ? 'مشكلات شائعة' : 'Common problems'}</h2>
            <ul className="space-y-2">
              {d.problems.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#69717D]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D63A3A] mt-1.5 flex-shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <h2 className="text-xl font-bold text-[#101418] mb-4">{ar ? 'ماذا نبني' : 'What we build'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {d.modules.map((m, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-[#6D5DF6] flex-shrink-0" />
                  <span className="text-sm text-[#101418]">{m}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.16}>
            <h2 className="text-xl font-bold text-[#101418] mb-4">{ar ? 'حلول مقترحة' : 'Suggested solutions'}</h2>
            <div className="flex flex-wrap gap-3">
              {d.solutions.map((s, i) => (
                <Link key={i} to={s.href} className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#EEEAFE] text-[#6D5DF6] rounded-lg text-sm font-medium hover:bg-[#6D5DF6] hover:text-white transition-colors">
                  {s.label} <ArrowRight size={13} />
                </Link>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <h2 className="text-xl font-bold text-[#101418] mb-4">{ar ? 'خدمات ذات صلة' : 'Related services'}</h2>
            <div className="flex flex-wrap gap-3">
              {d.services.map((s, i) => (
                <Link key={i} to={s.href} className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#E5E5E5] text-[#101418] rounded-lg text-sm hover:border-[#6D5DF6] hover:text-[#6D5DF6] transition-colors">
                  {s.label}
                </Link>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.24}>
            <div className="bg-[#0f0d19] rounded-2xl p-8 text-center">
              <h2 className="text-xl font-bold text-white mb-3">
                {ar ? 'جاهز للبدء؟' : 'Ready to get started?'}
              </h2>
              <p className="text-[#EEEAFE]/60 text-sm mb-5">
                {ar ? 'دعنا نفهم وضعك الحالي ونقترح المسار الصحيح.' : 'Let us understand where you are and suggest the right path forward.'}
              </p>
              <Link to="/book-consultation" className="inline-flex items-center gap-2 px-6 py-3 bg-[#6D5DF6] text-white rounded-xl hover:bg-[#5d4de6] transition-colors text-sm font-semibold">
                {ar ? 'احجز استشارة' : 'Book a Consultation'} <ArrowRight size={15} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
