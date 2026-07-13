import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';
import { FAQSection } from '../components/FAQSection';

const servicesFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the difference between a website and user experience?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A website is what the customer sees and interacts with. User experience is how that interaction is structured: what they see first, where they click, when they trust, and when they submit a request or take action.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between CRM and an internal system?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CRM focuses on customers, opportunities, sales, and follow-up. Internal systems focus on how the company operates internally, such as tasks, requests, approvals, employees, inventory, branches, and workflows.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you use AI in every project?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. We use AI when it creates clear value, such as summarizing conversations, classifying customers, supporting smart replies, extracting indicators from data, or reducing repetitive tasks.',
      },
    },
  ],
};

const services = [
  {
    slug: 'ux-conversion-development',
    en: { title: 'UX & Conversion Development', tags: 'Customer Journey · Friction Points · Higher Conversion', desc: 'We study how customers understand your offer, where they hesitate, and what stops them from taking action. Then we rebuild the experience to make interest easier to turn into a clear request.' },
    ar: { title: 'تطوير تجربة المستخدم والتحويل', tags: 'رحلة العميل · نقاط التردد · تحويل أعلى', desc: 'نحلل كيف يرى العميل خدمتك، كيف يتحرك داخل الموقع أو النظام، وأين يتوقف قبل اتخاذ القرار؛ ثم نعيد بناء التجربة لتصبح أوضح، أسهل، وأكثر قدرة على تحويل الاهتمام إلى طلب.' },
  },
  {
    slug: 'web-design-digital-experience',
    en: { title: 'Web Design & Development', tags: 'Professional Websites · Conversion Pages · Faster Trust', desc: 'We build websites and landing pages that do more than present a company. They help visitors understand the offer, trust the business, and submit requests your team can track and follow up.' },
    ar: { title: 'تصميم وتطوير المواقع', tags: 'مواقع احترافية · صفحات تحويل · ثقة أسرع', desc: 'نبني مواقع وصفحات هبوط لا تكتفي بعرض الشركة، بل تساعد الزائر على فهم العرض، الثقة فيك، وترك طلب واضح يمكن متابعته وقياسه.' },
  },
  {
    slug: 'mobile-web-applications',
    en: { title: 'Mobile Applications', tags: 'Continuous Experience · Easier Access · Closer Service', desc: 'We develop mobile applications that help customers or teams complete key tasks: booking, ordering, follow-up, field operations, service management, or ongoing access from the phone.' },
    ar: { title: 'تطبيقات الموبايل', tags: 'تجربة مستمرة · وصول أسهل · خدمة أقرب', desc: 'نطوّر تطبيقات موبايل تساعد العملاء أو فرق العمل على تنفيذ المهام بسهولة: حجز، طلب، متابعة، تشغيل ميداني، إدارة خدمة، أو تجربة مستمرة من الهاتف.' },
  },
  {
    slug: 'crm-internal-systems',
    en: { title: 'CRM & Follow-up Systems', tags: 'Customer Management · Opportunity Follow-up · Sales Pipeline', desc: 'We build custom CRM systems that organize customers, opportunities, stages, and follow-ups so every team member can see each customer status and the next required action.' },
    ar: { title: 'أنظمة CRM والمتابعة', tags: 'إدارة العملاء · متابعة الفرص · مسار مبيعات', desc: 'نبني أنظمة CRM مخصصة تنظّم العملاء والفرص والمراحل والمتابعات، حتى يعرف الفريق حالة كل عميل والخطوة التالية بدل ضياع الفرص بين واتساب والمكالمات والملفات.' },
  },
  {
    slug: 'internal-systems-operations',
    en: { title: 'Internal Systems & Operations', tags: 'Organized Operations · Clearer Tasks · Better Control', desc: 'We build internal systems that organize requests, tasks, approvals, employees, inventory, branches, operational accounts, or any repeated workflow that needs clearer control.' },
    ar: { title: 'الأنظمة الداخلية وإدارة التشغيل', tags: 'تشغيل منظم · مهام أوضح · تحكم أعلى', desc: 'نبني أنظمة داخلية تنظّم الطلبات، المهام، الموافقات، الموظفين، المخزون، الفروع، الحسابات التشغيلية، أو أي تدفق عمل متكرر يحتاج وضوحًا ومتابعة.' },
  },
  {
    slug: 'data-dashboards',
    en: { title: 'Data & Dashboards', tags: 'Dashboards · KPIs · Faster Decisions', desc: 'We turn scattered data into dashboards that help management see performance, compare results, track indicators, and detect what needs action at the right time.' },
    ar: { title: 'البيانات ولوحات المتابعة', tags: 'لوحات متابعة · مؤشرات أداء · قرار أسرع', desc: 'نحوّل البيانات المتفرقة إلى لوحات متابعة تساعد الإدارة على رؤية الأداء، مقارنة النتائج، متابعة المؤشرات، واكتشاف ما يحتاج تدخلًا في الوقت المناسب.' },
  },
  {
    slug: 'ai-chatbots-automation',
    en: { title: 'AI Chatbots & Automation', tags: 'Faster Response · Task Automation · Smarter Follow-up', desc: 'We build chatbots and automation flows that support response, classification, reminders, follow-up, repetitive task reduction, and connection with business systems when needed.' },
    ar: { title: 'روبوتات الدردشة والأتمتة', tags: 'رد أسرع · أتمتة المهام · متابعة أذكى', desc: 'نبني روبوتات دردشة وتدفقات أتمتة تساعد على الرد، التصنيف، التذكيرات، المتابعة، تقليل المهام المتكررة، وربط التواصل بأنظمة العمل عند الحاجة.' },
  },
  {
    slug: 'growth-marketing-systems',
    en: { title: 'Marketing & Growth Strategy', tags: 'Research · Marketing Plans · Growth Campaigns', desc: 'We help build clearer marketing direction through market research, audience understanding, messaging, content, marketing plans, and advertising campaigns connected to tracking and follow-up.' },
    ar: { title: 'استراتيجيات التسويق والنمو', tags: 'أبحاث · خطط تسويقية · حملات نمو', desc: 'نساعدك على بناء اتجاه تسويقي أوضح من خلال أبحاث السوق، فهم الجمهور، الرسائل، المحتوى، الخطط التسويقية، والحملات الإعلانية؛ مع ربط التسويق بالتتبع والمتابعة.' },
  },
];

const deliverySteps = [
  { en: { title: 'Understand the business', desc: 'We review your workflow, audience, communication channels, team, and the result you want to improve.' }, ar: { title: 'نفهم العمل', desc: 'نراجع طريقة عملك، جمهورك، قنوات التواصل، الفريق، والنتيجة التي تريد تحسينها.' } },
  { en: { title: 'Design the logic and experience', desc: 'We define pages, screens, flows, permissions, and business rules before full execution.' }, ar: { title: 'نصمم المنطق والتجربة', desc: 'نحدد الصفحات، الشاشات، التدفقات، الصلاحيات، وقواعد العمل قبل التنفيذ الكامل.' } },
  { en: { title: 'Build and connect', desc: 'We develop the service and connect it with what it needs: website, WhatsApp, forms, CRM, databases, payment gateways, or dashboards.' }, ar: { title: 'نبني ونربط', desc: 'ننفذ الخدمة ونربطها بما تحتاجه: موقع، واتساب، نماذج، CRM، قواعد بيانات، بوابات دفع، أو لوحات متابعة.' } },
  { en: { title: 'Launch and improve', desc: 'After launch, we review performance, usage, and feedback, then improve the service based on reality, not assumptions.' }, ar: { title: 'نطلق ونحسن', desc: 'نراجع الأداء والاستخدام والملاحظات بعد الإطلاق، ثم نطور الخدمة حسب الواقع لا الافتراضات.' } },
];

const traits = [
  { en: { title: 'Built around real usage', desc: 'We do not build beautiful screens only; we build experiences customers can understand and teams can use clearly.' }, ar: { title: 'مبنية حول الاستخدام الحقيقي', desc: 'لا نبني شاشات جميلة فقط؛ نبني تجربة يستطيع العميل فهمها، ويستطيع الفريق استخدامها بوضوح.' } },
  { en: { title: 'Connected to operations', desc: 'We connect the service with what happens inside the company every day: requests, follow-ups, tasks, data, and permissions.' }, ar: { title: 'متصلة بالتشغيل', desc: 'نربط الخدمة بما يحدث داخل الشركة يوميًا: الطلبات، المتابعة، المهام، البيانات، والصلاحيات.' } },
  { en: { title: 'Built to scale', desc: 'We design the service to support larger stages later, whether the number of customers, team members, branches, or data increases.' }, ar: { title: 'قابلة للتوسع', desc: 'نصمم الخدمة لتتحمل مراحل أكبر لاحقًا، سواء زاد عدد العملاء أو الفريق أو الفروع أو البيانات.' } },
  { en: { title: 'Built to be measured', desc: 'We define clear indicators that help you know whether the service improved conversion, follow-up, operations, or decision-making.' }, ar: { title: 'قابلة للقياس', desc: 'نضع مؤشرات واضحة تساعدك على معرفة هل الخدمة حسّنت التحويل، المتابعة، التشغيل، أو القرار.' } },
];

const scopeSteps = [
  { en: { title: 'Diagnostic consultation', desc: 'We understand the required service and its role inside the business.' }, ar: { title: 'استشارة تشخيصية', desc: 'نفهم الخدمة المطلوبة وهدفها داخل العمل.' } },
  { en: { title: 'Scope definition', desc: 'We define core features, priorities, and what should be delivered in the first stage.' }, ar: { title: 'تحديد النطاق', desc: 'نحدد الخصائص الأساسية، الأولويات، وما سيتم تنفيذه في المرحلة الأولى.' } },
  { en: { title: 'Usage vision', desc: 'We clarify how the customer or team will use the service step by step.' }, ar: { title: 'تصور الاستخدام', desc: 'نوضح كيف سيتعامل العميل أو الفريق مع الخدمة خطوة بخطوة.' } },
  { en: { title: 'Execution plan', desc: 'We arrange the stages of design, development, integration, testing, and launch.' }, ar: { title: 'خطة التنفيذ', desc: 'نرتب مراحل التصميم، التطوير، الربط، الاختبار، والإطلاق.' } },
];

export function ServicesPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <SEO
        title={ar ? 'خدمات إنسديم | مواقع، تطبيقات، CRM، أتمتة وبيانات' : 'Ensdim Services | Websites, Apps, CRM, Automation & Data'}
        description={ar
          ? 'خدمات رقمية تجعل البيع أوضح، والتشغيل أذكى، والنمو أسهل: مواقع، تطبيقات، CRM، أنظمة داخلية، لوحات متابعة، أتمتة، وتسويق.'
          : 'Digital services that make sales clearer, operations smarter, and growth easier: websites, apps, CRM, internal systems, dashboards, automation, and marketing.'}
        canonical="/services"
        lang={ar ? 'ar' : 'en'}
        jsonLd={servicesFaqSchema}
      />

      {/* Hero */}
      <section className="pt-24 pb-14 sm:pt-32 sm:pb-20 relative overflow-hidden bg-logo-black text-white">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 30% 50%, rgba(59,42,120,0.22) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-6 text-xs text-white/50 flex items-center gap-1">
            <Link to="/" className="hover:text-white/80 transition-colors">{ar ? 'الرئيسية' : 'Home'}</Link>
            <span className="opacity-40">/</span>
            <span className="text-white/70 font-medium">{ar ? 'الخدمات' : 'Services'}</span>
          </div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5 uppercase tracking-wider bg-[#6D5DF6]/15 border border-[#6D5DF6]/20 text-[#EEEAFE]/80">
            {ar ? 'خدمات إنسديم' : 'Ensdim Services'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight text-white">
            {ar ? 'خدمات رقمية تجعل البيع أوضح، والتشغيل أذكى، والنمو أسهل.' : 'Digital services that make sales clearer, operations smarter, and growth easier.'}
          </h1>
          <p className="text-base sm:text-lg max-w-2xl leading-relaxed mb-3 text-[#EEEAFE]/75">
            {ar
              ? 'في إنسديم، لا نتعامل مع الموقع أو التطبيق أو الـ CRM كمنتج منفصل. نربط كل خدمة برحلة العميل، طريقة عمل الفريق، البيانات، والمتابعة؛ حتى تتحول الخدمة من واجهة أو أداة إلى جزء فعلي يساعد شركتك على جذب فرص أفضل، تنظيم العمل، واتخاذ قرارات أوضح.'
              : 'At Ensdim, we do not treat a website, application, or CRM as a separate product. We connect every service to the customer journey, the team workflow, data, and follow-up, so it becomes more than an interface or tool: it becomes a real part of how your company attracts better opportunities, organizes work, and makes clearer decisions.'}
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {(ar ? 'تجربة عميل أوضح. تشغيل أذكى. نمو قابل للقياس.' : 'Clearer customer experience. Smarter operations. Measurable growth.')
              .split('.')
              .map((tag) => tag.trim())
              .filter(Boolean)
              .map((tag, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-[#EEEAFE]/70"
                >
                  <span className="w-1 h-1 rounded-full bg-[#6D5DF6]" />
                  {tag}
                </span>
              ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/book-consultation"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
            >
              {ar ? 'احجز استشارة مجانية' : 'Book a Free Consultation'} <ArrowRight size={15} />
            </Link>
            <button
              type="button"
              onClick={() => scrollTo('services-grid')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-white/20 text-white/80 hover:border-white/40 hover:text-white active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
            >
              {ar ? 'اختر الخدمة المناسبة' : 'Choose the Right Service'}
            </button>
          </div>
        </div>
      </section>

      {/* Choose the service intro */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-xs font-semibold text-[#6D5DF6] uppercase tracking-wider mb-3">{ar ? 'خدماتنا' : 'Our Services'}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-5 leading-tight">
              {ar
                ? 'اختر الخدمة التي تحرّك عملك خطوة أوضح نحو البيع، التنظيم، أو النمو.'
                : 'Choose the service that moves your business one clear step toward sales, organization, or growth.'}
            </h2>
            <p className="text-sm text-[#4F555E] leading-relaxed">
              {ar
                ? 'قد تجد كثيرًا من الشركات تقدم مواقع، تطبيقات، CRM، أنظمة داخلية للتشغيل، أو أتمتة. الفرق الحقيقي ليس في اسم الخدمة، بل في طريقة بنائها: هل تفهم رحلة العميل؟ هل تتصل بالتشغيل؟ هل تقلل العمل اليدوي؟ هل تعطي الإدارة رؤية أوضح؟ وهل يمكن قياس أثرها بعد الإطلاق؟ خدمات إنسديم تُبنى لتحقق عائدًا واضحًا وملموسًا.'
                : 'Many companies can offer websites, apps, CRM systems, internal operational systems, or automation. The real difference is not in the service name, but in how it is built: does it understand the customer journey, connect with operations, reduce manual work, give management clearer visibility, and create measurable impact after launch? Ensdim services are built to create a clear, tangible return.'}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services grid */}
      <section id="services-grid" className="py-4 pb-16 bg-white scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <ScrollReveal key={s.slug} delay={Math.min(i * 0.05, 0.3)}>
                <Link
                  to={`/services/${s.slug}`}
                  className="group border border-[#E5E5E5] rounded-2xl p-6 hover:border-[#6D5DF6] hover:shadow-md active:scale-[0.98] active:border-[#6D5DF6] transition-all duration-200 h-full flex flex-col"
                >
                  <span className="text-xs font-bold text-[#6D5DF6] mb-2">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-base font-bold text-[#101418] mb-2 leading-snug">
                    {ar ? s.ar.title : s.en.title}
                  </h3>
                  <p className="text-[11px] text-[#6D5DF6] font-medium mb-3">
                    {ar ? s.ar.tags : s.en.tags}
                  </p>
                  <p className="text-sm text-[#4F555E] leading-relaxed flex-1">
                    {ar ? s.ar.desc : s.en.desc}
                  </p>
                  <span className="inline-flex items-center gap-1.5 mt-4 text-[#6D5DF6] text-xs font-semibold group-hover:gap-2.5 group-active:gap-2.5 transition-all">
                    {ar ? 'عرض تفاصيل الخدمة' : 'View service details'}
                    <ArrowRight size={13} />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="text-center mt-12 p-8 bg-[#FAFAFA] border border-[#E5E5E5] rounded-2xl">
            <h3 className="text-lg font-bold text-[#101418] mb-2">
              {ar ? 'لا تعرف أي خدمة تناسب وضعك الحالي؟' : 'Not sure which service fits your current stage?'}
            </h3>
            <p className="text-sm text-[#4F555E] mb-5">
              {ar
                ? 'احجز استشارة مجانية وسنساعدك على تحديد الخدمة الأنسب لمرحلة عملك.'
                : 'Book a free consultation and we will help you identify the most relevant service for your business stage.'}
            </p>
            <Link to="/book-consultation" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#6D5DF6] text-white rounded-xl hover:bg-[#5d4de6] transition-colors text-sm font-semibold">
              {ar ? 'احجز استشارة مجانية' : 'Book a Free Consultation'} <ArrowRight size={15} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* How Ensdim delivers its services */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-3">
              {ar ? 'كيف تنفذ إنسديم خدماتها؟' : 'How Ensdim Delivers Its Services'}
            </h2>
            <p className="text-sm text-[#4F555E] max-w-2xl mx-auto">
              {ar
                ? 'نحوّل الخدمة من فكرة إلى منتج رقمي قابل للاستخدام والتطوير. قوة الخدمة لا تظهر في شكلها النهائي فقط، بل في طريقة بنائها: كيف تم فهم الاحتياج، كيف تم تصميم التجربة، كيف تم بناء النظام، وكيف سيتم قياسه وتحسينه بعد الإطلاق.'
                : 'We turn the service from an idea into a digital product that can be used, improved, and scaled. The strength of a digital service is not only in its final appearance — it is in how the need is understood, how the experience is designed, how the system is built, and how it will be measured and improved after launch.'}
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {deliverySteps.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="p-5 bg-white border border-[#E5E5E5] rounded-2xl h-full">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#EEEAFE] text-[#6D5DF6] text-xs font-bold mb-3">{i + 1}</span>
                  <h3 className="text-sm font-bold text-[#101418] mb-2">{ar ? step.ar.title : step.en.title}</h3>
                  <p className="text-xs text-[#4F555E] leading-relaxed">{ar ? step.ar.desc : step.en.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ensdim's way of building services */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-3">
              {ar ? 'نبني الخدمة كأصل رقمي يخدم البيع، التشغيل، والقرار.' : 'We build each service as a digital asset that supports sales, operations, and decision-making.'}
            </h2>
            <p className="text-sm text-[#4F555E] max-w-2xl mx-auto">
              {ar
                ? 'الفرق لا يظهر في اسم الخدمة، بل في ما يحدث بعدها. هل أصبح العميل أقرب للطلب؟ هل أصبح الفريق أكثر تنظيمًا؟ هل أصبحت الإدارة ترى الأرقام أسرع؟ وهل يمكن تطوير الخدمة مع نمو العمل؟ هذه هي الأسئلة التي تحدد طريقة بناء كل خدمة داخل إنسديم.'
                : 'The difference does not appear in the service name, but in what happens after it is launched. Is the customer closer to making a request? Is the team more organized? Can management see the numbers faster? Can the service evolve as the business grows? These are the questions that shape how every Ensdim service is built.'}
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {traits.map((trait, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="p-5 border border-[#E5E5E5] rounded-2xl h-full hover:border-[#6D5DF6]/50 hover:shadow-md transition-all duration-200">
                  <h3 className="text-sm font-bold text-[#101418] mb-2">{ar ? trait.ar.title : trait.en.title}</h3>
                  <p className="text-xs text-[#4F555E] leading-relaxed">{ar ? trait.ar.desc : trait.en.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Client Workspace */}
      <section id="client-workspace" className="py-16 bg-logo-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              {ar ? 'تابع مشروعك بوضوح من أول خطوة حتى الإطلاق.' : 'Follow your project clearly from the first step to launch.'}
            </h2>
            <p className="text-sm text-[#EEEAFE]/75 leading-relaxed mb-6 max-w-2xl">
              {ar
                ? 'نوفر لعملائنا مساحة واضحة لمتابعة تقدم المشروع، المراحل الحالية، الملفات، الملاحظات، المدفوعات، وطلبات التعديل؛ حتى تكون تجربة العمل معنا منظمة ومرئية، وليست مجرد تواصل متفرق عبر الرسائل.'
                : 'We provide clients with a clear workspace to track project progress, current stages, files, notes, payments, and change requests, so working with us feels organized and visible, not scattered across separate messages.'}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {(ar
                ? ['تقدم المشروع', 'الملفات والعقود', 'الملاحظات', 'المدفوعات', 'طلبات التعديل']
                : ['Project progress', 'Files and contracts', 'Notes', 'Payments', 'Change requests']
              ).map((item, i) => (
                <span key={i} className="text-xs px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[#EEEAFE]/85">{item}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://app.ensdim.com/login"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#6D5DF6] text-white rounded-xl hover:bg-[#5d4de6] transition-colors text-sm font-semibold"
              >
                {ar ? 'دخول مساحة العميل' : 'Client Workspace Login'} <ArrowRight size={15} />
              </a>
              <Link
                to="/book-consultation"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-white/20 text-white/80 hover:border-white/40 hover:text-white transition-colors text-sm font-semibold"
              >
                {ar ? 'اطلب تفعيل مساحة العميل لمشروعك' : 'Request workspace activation for your project'}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* From service selection to execution plan */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-3">
              {ar ? 'نحوّل الخدمة المطلوبة إلى نطاق واضح قبل البناء.' : 'We turn the required service into a clear scope before building.'}
            </h2>
            <p className="text-sm text-[#4F555E] max-w-2xl mx-auto">
              {ar
                ? 'حتى لا يبدأ المشروع كقائمة خصائص طويلة وغير مترابطة، نحدد أولًا ما الذي يجب تنفيذه الآن، وما الذي يمكن تأجيله، وما المخرجات التي يجب أن تظهر في كل مرحلة.'
                : 'To avoid starting with a long and disconnected feature list, we first define what should be built now, what can be delayed, and what outcomes should appear in each stage.'}
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {scopeSteps.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="p-5 bg-[#FAFAFA] border border-[#E5E5E5] rounded-2xl h-full">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#EEEAFE] text-[#6D5DF6] text-xs font-bold mb-3">{i + 1}</span>
                  <h3 className="text-sm font-bold text-[#101418] mb-2">{ar ? step.ar.title : step.en.title}</h3>
                  <p className="text-xs text-[#4F555E] leading-relaxed">{ar ? step.ar.desc : step.en.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <FAQSection
        title={ar ? 'الأسئلة الشائعة حول خدمات إنسديم' : 'Frequently Asked Questions About Ensdim Services'}
        faqs={ar ? [
          { question: 'ما الفرق بين الموقع وتجربة المستخدم؟', answer: 'الموقع هو ما يراه العميل ويتفاعل معه. تجربة المستخدم هي طريقة تنظيم هذا التفاعل: ماذا يرى أولًا؟ أين يضغط؟ متى يثق؟ ومتى يترك بياناته أو يطلب الخدمة؟' },
          { question: 'ما الفرق بين CRM والنظام الداخلي؟', answer: 'CRM يركز على العملاء، الفرص، المبيعات، والمتابعة. النظام الداخلي يركز على تشغيل الشركة من الداخل مثل المهام، الطلبات، الموافقات، الموظفين، المخزون، الفروع، وتدفقات العمل.' },
          { question: 'كم يستغرق تنفيذ خدمة مثل موقع أو CRM أو أتمتة؟', answer: 'يعتمد على حجم الخدمة ونطاقها. موقع بسيط أو صفحة هبوط يختلف عن CRM مخصص أو نظام داخلي متكامل. لذلك نحدد المدة بعد فهم المطلوب، الخصائص الأساسية، وما إذا كان المشروع يحتاج ربطًا بأنظمة أو أدوات أخرى.' },
          { question: 'هل تستخدمون الذكاء الاصطناعي في كل مشروع؟', answer: 'لا. نستخدم الذكاء الاصطناعي عندما يضيف قيمة واضحة، مثل تلخيص المحادثات، تصنيف العملاء، الردود الذكية، استخراج مؤشرات من البيانات، أو تقليل المهام المتكررة. لا نضيفه كاستعراض فقط.' },
          { question: 'ماذا يحدث بعد إطلاق الخدمة؟', answer: 'يمكن أن يشمل ما بعد الإطلاق دعمًا تقنيًا، تحسينات، إصلاحات، تطوير خصائص جديدة، أو متابعة أداء حسب نطاق المشروع وخطة الدعم المتفق عليها.' },
        ] : [
          { question: 'What is the difference between a website and user experience?', answer: 'A website is what the customer sees and interacts with. User experience is how that interaction is structured: what they see first, where they click, when they trust, and when they submit a request or take action.' },
          { question: 'What is the difference between CRM and an internal system?', answer: 'CRM focuses on customers, opportunities, sales, and follow-up. Internal systems focus on how the company operates internally, such as tasks, requests, approvals, employees, inventory, branches, and workflows.' },
          { question: 'How long does it take to build a website, CRM, or automation service?', answer: 'It depends on scope. A simple landing page is different from a custom CRM or a full internal system. We define the timeline after understanding the required features, priority, and whether integrations are needed.' },
          { question: 'Do you use AI in every project?', answer: 'No. We use AI when it creates clear value, such as summarizing conversations, classifying customers, supporting smart replies, extracting indicators from data, or reducing repetitive tasks. We do not add AI for show.' },
          { question: 'What happens after the service is launched?', answer: 'Post-launch can include technical support, improvements, fixes, new feature development, or performance review depending on the project scope and agreed support plan.' },
        ]}
      />

      {/* Final CTA */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-[#EEEAFE] border border-[#DDD8FB] rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl font-bold text-[#101418] mb-3">
            {ar ? 'ابدأ الآن بالخدمة التي تحقق أثرًا واضحًا في عملك.' : 'Start now with the service that can create clear impact inside your business.'}
          </h2>
          <p className="text-sm text-[#4F555E] mb-6 max-w-xl mx-auto">
            {ar
              ? 'ليس المطلوب أن تبدأ بمشروع كبير، بل أن تختار أول خطوة ذكية: خدمة تحسّن البيع، تنظّم المتابعة، تقلل الضغط التشغيلي، أو تجعل القرار أوضح. احجز استشارة مجانية، وسنراجع وضعك الحالي ونحدد معك الخدمة الأنسب ونطاق التنفيذ الأقرب للعائد.'
              : 'You do not need to begin with a large project. You need to choose the smartest first step: a service that improves sales, organizes follow-up, reduces operational pressure, or makes decisions clearer. Book a free consultation, and we will review your current situation, identify the most relevant service, and define the execution scope closest to return.'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/book-consultation"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
            >
              {ar ? 'احجز استشارة مجانية' : 'Book a Free Consultation'} <ArrowRight size={15} />
            </Link>
            <Link
              to="/solutions"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[#6D5DF6]/30 text-[#3B2A78] hover:border-[#6D5DF6] hover:bg-white active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
            >
              {ar ? 'استكشف الحلول' : 'Explore Solutions'}
            </Link>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[#6D5DF6]/30 text-[#3B2A78] hover:border-[#6D5DF6] hover:bg-white active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
            >
              {ar ? 'شاهد مشاريع سابقة' : 'View Previous Projects'}
            </Link>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
