import { useParams, Link } from 'react-router';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHero } from '../components/PageHero';
import { ScrollReveal } from '../components/ScrollReveal';
import { ConsultationForm } from '../components/ConsultationForm';
import { SEO } from '../components/SEO';

const serviceData: Record<string, {
  en: { title: string; promise: string; forWho: string; problem: string; deliverables: string[]; relatedSolution: { title: string; slug: string }; relatedCaseStudy: { title: string; slug: string } };
  ar: { title: string; promise: string; forWho: string; problem: string; deliverables: string[]; relatedSolution: { title: string; slug: string }; relatedCaseStudy: { title: string; slug: string } };
}> = {
  'web-design-digital-experience': {
    en: {
      title: 'Web Design & Digital Experience',
      promise: 'Websites and digital flows designed around conversion and customer behavior.',
      forWho: 'Businesses that need a digital presence that actually works — generates leads, guides customers, and reflects the brand.',
      problem: 'Most websites look good but don\'t convert. Visitors leave without taking action because there\'s no clear path, no urgency, and no connection to what the customer actually needs.',
      deliverables: ['Strategy-first website design', 'Conversion-optimized landing pages', 'Mobile-first responsive layouts', 'Lead capture integration', 'Performance optimization', 'Analytics setup'],
      relatedSolution: { title: 'Digital Experiences', slug: 'digital-experiences' },
      relatedCaseStudy: { title: 'From scattered follow-up to a clearer operating system', slug: 'scattered-follow-up' },
    },
    ar: {
      title: 'تصميم الويب والتجربة الرقمية',
      promise: 'مواقع وتدفقات رقمية مصممة حول التحويل وسلوك العميل.',
      forWho: 'الأعمال التي تحتاج حضوراً رقمياً يعمل فعلاً — يولد عملاء محتملين، يوجه العملاء، ويعكس العلامة التجارية.',
      problem: 'معظم المواقع تبدو جيدة لكن لا تحوّل. الزوار يغادرون دون اتخاذ إجراء لأنه لا مسار واضح، لا إلحاح، ولا ارتباط بما يحتاجه العميل.',
      deliverables: ['تصميم موقع يبدأ من الاستراتيجية', 'صفحات هبوط محسّنة للتحويل', 'تصميمات متجاوبة تبدأ من الجوال', 'تكامل جمع العملاء المحتملين', 'تحسين الأداء', 'إعداد التحليلات'],
      relatedSolution: { title: 'التجارب الرقمية', slug: 'digital-experiences' },
      relatedCaseStudy: { title: 'من متابعة مشتتة إلى نظام تشغيلي أوضح', slug: 'scattered-follow-up' },
    },
  },
  'crm-internal-systems': {
    en: {
      title: 'CRM & Internal Systems',
      promise: 'Build the internal backbone that keeps your team organized and your customers followed up.',
      forWho: 'Service businesses that manage clients, leads, and team tasks — and need a single system to see and control it all.',
      problem: 'Without a proper CRM, businesses run on WhatsApp groups, spreadsheets, and memory. Nothing is trackable, nothing is transferable, and nothing scales.',
      deliverables: ['CRM selection & setup', 'Lead pipeline configuration', 'Team workflow setup', 'Integration with forms & messaging', 'Training & documentation', 'Dashboard setup'],
      relatedSolution: { title: 'Follow-Up Systems', slug: 'follow-up-systems' },
      relatedCaseStudy: { title: 'From scattered follow-up to a clearer operating system', slug: 'scattered-follow-up' },
    },
    ar: {
      title: 'CRM والأنظمة الداخلية',
      promise: 'بناء العمود الفقري الداخلي الذي يبقي فريقك منظماً وعملاءك متابَعين.',
      forWho: 'أعمال الخدمات التي تدير العملاء، العملاء المحتملين، ومهام الفريق — وتحتاج نظاماً واحداً لرؤية كل شيء والتحكم فيه.',
      problem: 'بدون CRM مناسب، الأعمال تعمل على مجموعات واتساب، جداول البيانات، والذاكرة. لا شيء قابل للتتبع، لا شيء قابل للنقل، ولا شيء يتوسع.',
      deliverables: ['اختيار وإعداد CRM', 'تكوين مسار العملاء المحتملين', 'إعداد سير عمل الفريق', 'التكامل مع النماذج والمراسلة', 'التدريب والتوثيق', 'إعداد لوحة التحكم'],
      relatedSolution: { title: 'أنظمة المتابعة', slug: 'follow-up-systems' },
      relatedCaseStudy: { title: 'من متابعة مشتتة إلى نظام تشغيلي أوضح', slug: 'scattered-follow-up' },
    },
  },
  'ai-chatbots-automation': {
    en: {
      title: 'AI Chatbots & Automation',
      promise: 'Respond faster, reduce manual work, and keep operations moving without adding staff.',
      forWho: 'Businesses that need to respond to customers 24/7, automate repetitive tasks, and free team time for high-value work.',
      problem: 'Teams are bottlenecks. Manual responses, manual data entry, and manual task assignment are too slow and inconsistent to support growth.',
      deliverables: ['AI chatbot for inquiry handling', 'WhatsApp automation flows', 'Trigger-based response sequences', 'Form-to-CRM automation', 'Notification & escalation systems', 'Human handoff logic'],
      relatedSolution: { title: 'Automation Layers', slug: 'automation-layers' },
      relatedCaseStudy: { title: 'Faster response for a service business', slug: 'faster-response' },
    },
    ar: {
      title: 'روبوتات الذكاء الاصطناعي والأتمتة',
      promise: 'استجب أسرع، قلل العمل اليدوي، وأبق العمليات تسير دون إضافة موظفين.',
      forWho: 'الأعمال التي تحتاج للرد على العملاء 24/7، أتمتة المهام المتكررة، وتحرير وقت الفريق للعمل ذي القيمة العالية.',
      problem: 'الفرق عقبات. الردود اليدوية، إدخال البيانات اليدوي، وتوزيع المهام اليدوي بطيئة وغير متسقة لدعم النمو.',
      deliverables: ['روبوت محادثة لمعالجة الاستفسارات', 'مسارات أتمتة واتساب', 'تسلسلات استجابة قائمة على المحفزات', 'أتمتة النموذج إلى CRM', 'أنظمة الإشعارات والتصعيد', 'منطق التسليم للإنسان'],
      relatedSolution: { title: 'طبقات الأتمتة', slug: 'automation-layers' },
      relatedCaseStudy: { title: 'استجابة أسرع لعمل خدمي', slug: 'faster-response' },
    },
  },
  'data-dashboards': {
    en: {
      title: 'Data & Dashboards',
      promise: 'See what\'s actually happening in your business — in real time.',
      forWho: 'Growing businesses that rely on data to manage performance, track leads, and make better decisions.',
      problem: 'Most businesses have data but no visibility. Reports are manual, delayed, or non-existent. Decisions are made on gut feel.',
      deliverables: ['Business performance dashboards', 'Lead & sales reporting', 'Operations monitoring view', 'Team KPI tracking', 'Customer satisfaction metrics', 'Automated report delivery'],
      relatedSolution: { title: 'Visibility & Insights', slug: 'visibility-insights' },
      relatedCaseStudy: { title: 'Clearer dashboards for growing operations', slug: 'clearer-visibility' },
    },
    ar: {
      title: 'البيانات ولوحات التحكم',
      promise: 'اعرف ما يحدث فعلاً في عملك — في الوقت الفعلي.',
      forWho: 'الأعمال النامية التي تعتمد على البيانات لإدارة الأداء، تتبع العملاء المحتملين، واتخاذ قرارات أفضل.',
      problem: 'معظم الأعمال لديها بيانات لكن بدون رؤية. التقارير يدوية، متأخرة، أو غير موجودة. القرارات تُتخذ بالحدس.',
      deliverables: ['لوحات أداء الأعمال', 'تقارير العملاء المحتملين والمبيعات', 'عرض مراقبة العمليات', 'تتبع KPI الفريق', 'مقاييس رضا العملاء', 'تسليم تقارير تلقائي'],
      relatedSolution: { title: 'الرؤية والتحليلات', slug: 'visibility-insights' },
      relatedCaseStudy: { title: 'لوحات تحكم أوضح للعمليات النامية', slug: 'clearer-visibility' },
    },
  },
  'mobile-web-applications': {
    en: {
      title: 'Mobile & Web Applications',
      promise: 'Custom applications built around real business workflows.',
      forWho: 'Businesses that need purpose-built tools — not generic software — to manage customers, operations, or internal processes.',
      problem: 'Off-the-shelf software doesn\'t fit real workflows. Teams work around limitations, creating inefficiency and frustration.',
      deliverables: ['Custom web application development', 'Mobile app development', 'Internal tools & portals', 'Client-facing apps', 'API integrations', 'Ongoing support'],
      relatedSolution: { title: 'Customer Journey Systems', slug: 'customer-journey-systems' },
      relatedCaseStudy: { title: 'Scaling operations with better control', slug: 'scaling-with-control' },
    },
    ar: {
      title: 'تطبيقات الجوال والويب',
      promise: 'تطبيقات مخصصة مبنية حول سير العمل التجاري الحقيقي.',
      forWho: 'الأعمال التي تحتاج أدوات مبنية بهدف محدد — لا برامج عامة — لإدارة العملاء، العمليات، أو العمليات الداخلية.',
      problem: 'البرامج الجاهزة لا تناسب سير العمل الحقيقي. الفرق تعمل حول القيود، مما يخلق عدم كفاءة وإحباطاً.',
      deliverables: ['تطوير تطبيق ويب مخصص', 'تطوير تطبيق جوال', 'أدوات وبوابات داخلية', 'تطبيقات للعملاء', 'تكاملات API', 'دعم مستمر'],
      relatedSolution: { title: 'أنظمة رحلة العميل', slug: 'customer-journey-systems' },
      relatedCaseStudy: { title: 'توسع العمليات بتحكم أفضل', slug: 'scaling-with-control' },
    },
  },
  'growth-marketing-systems': {
    en: {
      title: 'Growth & Marketing Systems',
      promise: 'Build the infrastructure that makes growth predictable and repeatable.',
      forWho: 'Businesses ready to invest in structured growth — not random campaigns, but systems that generate, capture, and convert leads consistently.',
      problem: 'Marketing spend without a proper system to capture and convert leads is wasted. Traffic without follow-up doesn\'t turn into revenue.',
      deliverables: ['Lead generation infrastructure', 'Email & SMS nurture sequences', 'Funnel design & optimization', 'Attribution tracking', 'Campaign-to-CRM pipelines', 'Growth analytics'],
      relatedSolution: { title: 'AI for Practical Decisions', slug: 'ai-practical-decisions' },
      relatedCaseStudy: { title: 'Scaling operations with better control', slug: 'scaling-with-control' },
    },
    ar: {
      title: 'أنظمة النمو والتسويق',
      promise: 'بناء البنية التحتية التي تجعل النمو متوقعاً وقابلاً للتكرار.',
      forWho: 'الأعمال الجاهزة للاستثمار في نمو منظم — لا حملات عشوائية، بل أنظمة تولّد وتلتقط وتحوّل العملاء المحتملين باستمرار.',
      problem: 'الإنفاق التسويقي بدون نظام مناسب لالتقاط العملاء المحتملين وتحويلهم مهدر. الحركة بدون متابعة لا تتحول لإيراد.',
      deliverables: ['بنية تحتية لتوليد العملاء المحتملين', 'تسلسلات تغذية البريد الإلكتروني و SMS', 'تصميم وتحسين القمع', 'تتبع الإسناد', 'مسارات الحملة إلى CRM', 'تحليلات النمو'],
      relatedSolution: { title: 'الذكاء للقرارات العملية', slug: 'ai-practical-decisions' },
      relatedCaseStudy: { title: 'توسع العمليات بتحكم أفضل', slug: 'scaling-with-control' },
    },
  },
};

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const ar = language === 'ar';
  const data = serviceData[slug || ''];
  const d = data ? (ar ? data.ar : data.en) : null;

  if (!d) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#101418] mb-4">{ar ? 'الخدمة غير موجودة' : 'Service not found'}</h1>
          <Link to="/services" className="text-[#6D5DF6] hover:underline">{ar ? 'عرض جميع الخدمات' : 'View all services'}</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${d.title} | ENSDIM Services`}
        description={`${d.promise} ${d.forWho}`}
        keywords={`${d.title} Egypt, ${d.title} Saudi Arabia, ${d.title} UAE, ENSDIM services, AI automation`}
        canonical={`/services/${slug}`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: d.title,
          description: d.promise,
          provider: { '@type': 'Organization', name: 'ENSDIM', url: 'https://ensdim.com' },
          areaServed: ['Egypt', 'Saudi Arabia', 'United Arab Emirates'],
          url: `https://ensdim.com/services/${slug}`,
        }}
      />
      <PageHero
        eyebrow={ar ? 'خدمات إنسديم' : 'ENSDIM Services'}
        title={d.title}
        subtitle={d.promise}
        primaryCTA={{ label: ar ? 'احجز استشارة' : 'Book a Consultation', href: '/book-consultation' }}
        secondaryCTA={{ label: ar ? 'عرض جميع الخدمات' : 'View all services', href: '/services' }}
        variant="light"
        breadcrumbs={[
          { label: 'Services', labelAr: 'الخدمات', href: '/services' },
          { label: d.title, href: `/services/${slug}` },
        ]}
        lang={ar ? 'ar' : 'en'}
      />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
          <ScrollReveal>
            <h2 className="text-xl font-bold text-[#101418] mb-3">{ar ? 'لمن هذا؟' : 'Who it\'s for'}</h2>
            <p className="text-sm text-[#69717D] leading-relaxed">{d.forWho}</p>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <h2 className="text-xl font-bold text-[#101418] mb-3">{ar ? 'المشكلة التي تحلها' : 'The problem it solves'}</h2>
            <p className="text-sm text-[#69717D] leading-relaxed">{d.problem}</p>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <h2 className="text-xl font-bold text-[#101418] mb-4">{ar ? 'ماذا نبني' : 'What we deliver'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {d.deliverables.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl">
                  <CheckCircle2 size={15} className="text-[#6D5DF6] flex-shrink-0" />
                  <span className="text-sm text-[#101418]">{item}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.16}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 border border-[#E5E5E5] rounded-2xl">
                <p className="text-xs text-[#69717D] uppercase tracking-wider mb-2">{ar ? 'حل مرتبط' : 'Related solution'}</p>
                <p className="text-sm font-bold text-[#101418] mb-3">{d.relatedSolution.title}</p>
                <Link to={`/solutions/${d.relatedSolution.slug}`} className="inline-flex items-center gap-1.5 text-sm text-[#6D5DF6] hover:underline">
                  {ar ? 'استكشف الحل' : 'Explore solution'} <ArrowRight size={13} />
                </Link>
              </div>
              <div className="p-5 border border-[#E5E5E5] rounded-2xl">
                <p className="text-xs text-[#69717D] uppercase tracking-wider mb-2">{ar ? 'دراسة حالة ذات صلة' : 'Related case study'}</p>
                <p className="text-sm font-bold text-[#101418] mb-3">{d.relatedCaseStudy.title}</p>
                <Link to={`/case-studies/${d.relatedCaseStudy.slug}`} className="inline-flex items-center gap-1.5 text-sm text-[#6D5DF6] hover:underline">
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
              title={ar ? 'اطلب هذه الخدمة لعملك.' : 'Request this service for your business.'}
              hiddenFields={{
                source_page: `/services/${slug}`,
                clicked_service: d?.title || '',
                interest_type: 'service',
              }}
            />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
