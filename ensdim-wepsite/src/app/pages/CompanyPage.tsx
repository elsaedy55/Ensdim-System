import { Link } from 'react-router';
import { ArrowRight, Download } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';
import { FAQSection } from '../components/FAQSection';

/**
 * Four of the eight service links in the approved content brief use slugs
 * that differ from the ones already implemented on /services
 * (web-design-development, mobile-applications, customer-follow-up-systems,
 * marketing-growth-strategy). They are mapped here to the real, existing
 * service pages instead, to avoid broken links:
 *   web-design-development        -> web-design-digital-experience
 *   mobile-applications            -> mobile-web-applications
 *   customer-follow-up-systems     -> crm-internal-systems
 *   marketing-growth-strategy      -> growth-marketing-systems
 */
const technologyLinks = [
  { en: 'UX & Conversion Development', ar: 'تطوير تجربة المستخدم والتحويل', slug: 'ux-conversion-development' },
  { en: 'Web Design & Development', ar: 'تصميم وتطوير المواقع', slug: 'web-design-digital-experience' },
  { en: 'Mobile Applications', ar: 'تطبيقات الموبايل', slug: 'mobile-web-applications' },
  { en: 'Customer Follow-up Systems', ar: 'أنظمة متابعة العملاء', slug: 'crm-internal-systems' },
  { en: 'Internal Systems & Operations', ar: 'الأنظمة الداخلية وإدارة التشغيل', slug: 'internal-systems-operations' },
  { en: 'Data & Dashboards', ar: 'البيانات ولوحات المتابعة', slug: 'data-dashboards' },
  { en: 'AI Chatbots & Automation', ar: 'روبوتات الدردشة والأتمتة', slug: 'ai-chatbots-automation' },
  { en: 'Marketing & Growth Strategy', ar: 'استراتيجيات التسويق والنمو', slug: 'growth-marketing-systems' },
];

const stages = [
  {
    slug: 'build',
    en: { title: 'Build', desc: 'For new ideas, startups, or businesses that need a clear digital foundation from the beginning. We build what helps the idea or service appear, be tested, and convert: a website, landing page, user experience, booking flow, or an initial digital product that can evolve later.', cta: 'Explore Build Stage' },
    ar: { title: 'بناء', desc: 'للأفكار الجديدة، الشركات الناشئة، أو الأعمال التي تحتاج أساسًا رقميًا واضحًا من البداية. نبني ما يجعل الفكرة أو الخدمة قابلة للظهور، الاختبار، والتحويل: موقع، صفحة هبوط، تجربة استخدام، مسار حجز، أو منتج رقمي أولي قابل للتطوير.', cta: 'استكشف مرحلة البناء' },
  },
  {
    slug: 'start',
    en: { title: 'Start', desc: 'For existing businesses that already have customers but feel that follow-up is scattered, the experience is incomplete, and channels do not work together clearly. We connect the customer journey, request forms, follow-up systems, booking, messaging, and data into a more organized experience.', cta: 'Explore Start Stage' },
    ar: { title: 'انطلاق', desc: 'للأعمال القائمة التي لديها عملاء بالفعل، لكنها تشعر أن المتابعة مشتتة، التجربة غير مكتملة، والقنوات لا تعمل معًا بوضوح. نربط رحلة العميل، نماذج الطلب، أنظمة المتابعة، الحجز، الرسائل، والبيانات داخل تجربة أكثر تنظيمًا.', cta: 'استكشف مرحلة الانطلاق' },
  },
  {
    slug: 'growth',
    en: { title: 'Grow', desc: 'For businesses that are expanding but growth now brings higher cost, more team pressure, scattered data, and harder decisions. We build data layers, automation, practical intelligence, dashboards, and manageable operations so growth becomes more controlled.', cta: 'Explore Growth Stage' },
    ar: { title: 'نمو', desc: 'للأعمال التي بدأت تتوسع، لكن النمو أصبح يجلب تكلفة أعلى، ضغطًا أكبر على الفريق، بيانات متفرقة، وقرارات أصعب. نبني طبقات بيانات، أتمتة، ذكاء عملي، لوحات متابعة، وتشغيلًا قابلًا للإدارة حتى يتحول النمو من ضغط إلى سيطرة.', cta: 'استكشف مرحلة النمو' },
  },
];

const howWeWork = [
  { en: { title: 'Understand the current reality', desc: 'How customers enter, where follow-up breaks, what consumes team time, and what management cannot see clearly.' }, ar: { title: 'نفهم الواقع', desc: 'كيف يدخل العميل؟ أين تتعطل المتابعة؟ ما الذي يستهلك وقت الفريق؟ وما الذي لا تراه الإدارة بوضوح؟' } },
  { en: { title: 'Define the impact point', desc: 'Conversion, follow-up, manual work, data visibility, or growth support.' }, ar: { title: 'نحدد نقطة الأثر', desc: 'هل الأولوية لرفع التحويل، تنظيم المتابعة، تقليل العمل اليدوي، قراءة البيانات، أم دعم النمو؟' } },
  { en: { title: 'Design the flow', desc: 'Customer journey, workflow, permissions, data, alerts, and required interfaces.' }, ar: { title: 'نصمم المسار', desc: 'نحدد رحلة العميل، تدفق العمل، الصلاحيات، البيانات، التنبيهات، والواجهات المطلوبة.' } },
  { en: { title: 'Build in stages', desc: 'Start with what creates a clear impact now, then improve based on real usage.' }, ar: { title: 'نبني على مراحل', desc: 'نبدأ بما يحقق أثرًا واضحًا الآن، ثم نطوّر بناءً على الاستخدام الحقيقي.' } },
  { en: { title: 'Measure and improve', desc: 'Review performance after launch and develop based on reality, not assumptions.' }, ar: { title: 'نقيس ونحسن', desc: 'نراجع الأداء بعد الإطلاق ونطوّر الحل حسب الواقع، لا الافتراضات.' } },
];

export function CompanyPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  return (
    <>
      <SEO
        title={ar ? 'شركة إنسديم | تكنولوجيا تفهم الإنسان وتخدم نمو الأعمال' : 'ENSDIM Company | Technology Built Around People and Business Growth'}
        description={ar
          ? 'إنسديم تساعد الشركات على تحويل التحديات اليومية في جذب العملاء، المتابعة، التشغيل، البيانات، والنمو إلى حلول تكنولوجية أوضح.'
          : 'ENSDIM helps businesses turn everyday challenges in customer acquisition, follow-up, operations, data, and growth into clearer technology solutions.'}
        canonical="/company"
        lang={ar ? 'ar' : 'en'}
      />

      {/* 1. Hero */}
      <section className="pt-24 pb-14 sm:pt-32 sm:pb-20 relative overflow-hidden bg-[#0f0d19] text-white">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 30% 50%, rgba(59,42,120,0.22) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-6 text-xs text-white/50 flex items-center gap-1">
            <Link to="/" className="hover:text-white/80 transition-colors">{ar ? 'الرئيسية' : 'Home'}</Link>
            <span className="opacity-40">/</span>
            <span className="text-white/70 font-medium">{ar ? 'الشركة' : 'Company'}</span>
          </div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5 uppercase tracking-wider bg-[#6D5DF6]/15 border border-[#6D5DF6]/20 text-[#EEEAFE]/80">
            {ar ? 'شركة إنسديم' : 'ENSDIM Company'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight text-white">
            {ar ? 'نبني تكنولوجيا تفهم الإنسان وتخدم نمو الأعمال.' : 'Technology built around people, operations, and business growth.'}
          </h1>
          <p className="text-base sm:text-lg max-w-2xl leading-relaxed mb-3 text-[#EEEAFE]/75">
            {ar
              ? 'إنسديم تساعد الشركات على تحويل التحديات اليومية في جذب العملاء، المتابعة، التشغيل، البيانات، والنمو إلى حلول تكنولوجية أوضح. لا نبدأ من الكود أو اسم الخدمة، بل من فهم كيف يعمل البزنس فعليًا: كيف يفكر العميل، أين تتعطل المتابعة، ما الذي يستهلك وقت الفريق، وما الذي تحتاجه الإدارة لاتخاذ قرار أفضل.'
              : 'ENSDIM helps businesses turn everyday challenges in customer acquisition, follow-up, operations, data, and growth into clearer technology solutions. We do not start with code or a service name. We start by understanding how the business actually works: how customers think, where follow-up breaks, what consumes the team’s time, and what management needs to see in order to make better decisions.'}
          </p>
          <p className="text-sm text-[#EEEAFE]/55 mb-8">
            {ar ? 'نفهم السلوك. ننظم التشغيل. نبني تكنولوجيا قابلة للقياس.' : 'Understand behavior. Organize operations. Build measurable technology.'}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
            >
              {ar ? 'تعرّف على إنسديم' : 'Learn About ENSDIM'} <ArrowRight size={15} />
            </Link>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-white/20 text-white/80 hover:border-white/40 hover:text-white active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
            >
              {ar ? 'شاهد مشاريعنا' : 'View Case Studies'}
            </Link>
            <a
              href="/downloads/ensdim-company-profile.pdf"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-white/20 text-white/80 hover:border-white/40 hover:text-white active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
            >
              {ar ? 'تحميل بروفايل الشركة' : 'Download Company Profile'} <Download size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* 2. What makes ENSDIM different */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-5 leading-tight">
              {ar ? 'نبدأ من فهم ما يعطّل النمو… ثم نبني التكنولوجيا المناسبة.' : 'We start by understanding what is blocking growth, then build the right technology around it.'}
            </h2>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-4">
              {ar
                ? 'إنسديم وُجدت لأن كثيرًا من الشركات لا ينقصها موقع آخر أو أداة جديدة فقط، بل ينقصها نظام يفهم كيف يعمل البزنس فعليًا: كيف يصل العميل، أين يتردد، أين تضيع المتابعة، ما الذي يضغط الفريق، وما البيانات التي تحتاجها الإدارة لاتخاذ قرار أوضح.'
                : 'ENSDIM exists because many companies do not simply need another website or another tool. They need a system that understands how the business actually works: how customers arrive, where they hesitate, where follow-up gets lost, what pressures the team, and what management needs to see to make clearer decisions.'}
            </p>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-6">
              {ar
                ? 'لذلك لا نتعامل مع التكنولوجيا كتنفيذ منفصل، بل كجزء من طريقة عمل الشركة. نبني مواقع، تطبيقات، أنظمة متابعة للعملاء، أنظمة تشغيل داخلية، لوحات بيانات، أتمتة، وطبقات ذكاء عملية، لكن كل ذلك يبدأ من سؤال واحد: ما الأثر الذي يجب أن يحدث داخل العمل؟'
                : 'That is why we do not treat technology as separate execution. We build it as part of the way the company operates. We build websites, applications, customer follow-up systems, internal operating systems, dashboards, automation, and practical intelligence layers, but everything starts with one question: what impact should this create inside the business?'}
            </p>
            <ul className="space-y-2.5 mb-7">
              {(ar ? [
                'نفهم سلوك العميل قبل بناء التجربة.',
                'نربط الحل بالتشغيل اليومي للفريق.',
                'نحوّل المتابعة والبيانات إلى رؤية أوضح للإدارة.',
                'نبني التكنولوجيا كأصل يخدم العائد، لا كواجهة منفصلة عن البزنس.',
              ] : [
                'We understand customer behavior before building the experience.',
                'We connect the solution to the team’s daily operations.',
                'We turn follow-up and data into clearer visibility for management.',
                'We build technology as a business asset, not as an isolated interface.',
              ]).map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#4F555E]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6D5DF6] mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Link to="/solutions" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6D5DF6] text-white rounded-xl hover:bg-[#5d4de6] transition-colors text-sm font-semibold">
                {ar ? 'استكشف حلول إنسديم' : 'Explore ENSDIM Solutions'} <ArrowRight size={14} />
              </Link>
              <Link to="/case-studies" className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#E5E5E5] text-[#101418] rounded-xl hover:border-[#6D5DF6] hover:text-[#6D5DF6] transition-colors text-sm font-semibold">
                {ar ? 'شاهد مشاريعنا' : 'View Our Work'}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. Our vision */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-xs font-semibold text-[#6D5DF6] uppercase tracking-wider mb-3">{ar ? 'رؤيتنا' : 'Our Vision'}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-5 leading-tight">
              {ar ? 'التكنولوجيا الأفضل هي التي تجعل العلاقة بين الإنسان والعمل أكثر وضوحًا.' : 'The best technology makes the relationship between people and work clearer.'}
            </h2>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-4">
              {ar
                ? 'نؤمن في إنسديم أن البزنس في جوهره علاقات: علاقة بين الشركة وعملائها، بين الإدارة والفريق، وبين الإنسان والنظام الذي يستخدمه كل يوم.'
                : 'At ENSDIM, we believe business is built on relationships: between companies and customers, between management and teams, and between people and the systems they use every day.'}
            </p>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-4">
              {ar
                ? 'لذلك لا نرى التكنولوجيا كبديل للإنسان، بل كأداة يجب أن تُبنى حوله: تفهم سلوكه، تقلل جهده، تنظّم عمله، وتساعده على أداء أفضل.'
                : 'We do not see technology as a replacement for people. We see it as a tool that should be built around them: understanding behavior, reducing effort, organizing work, and helping people perform better.'}
            </p>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-4">
              {ar
                ? 'رؤيتنا هي أن نبني تكنولوجيات تجعل هذه العلاقة أبسط وأكثر وضوحًا: تساعد العميل على اتخاذ خطوة بثقة، وتساعد الفريق على العمل بضغط أقل، وتساعد الإدارة على رؤية أوضح وقرارات أفضل.'
                : 'Our vision is to build technologies that make this relationship simpler and clearer: helping customers take action with confidence, helping teams work with less pressure, and helping management see more clearly and make better decisions.'}
            </p>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-6">
              {ar
                ? 'في إنسديم، التكنولوجيا ليست الهدف. الهدف هو عمل أوضح، تجربة أفضل، وعائد قابل للتحسين.'
                : 'For ENSDIM, technology is not the goal. The goal is clearer work, better experience, and a return that can be improved.'}
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 text-[#6D5DF6] text-sm font-semibold hover:underline">
              {ar ? 'اقرأ قصة إنسديم كاملة' : 'Read the ENSDIM Story'} <ArrowRight size={14} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. How ENSDIM thinks about solutions */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="mb-10 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-3">
              {ar ? 'نرافق البزنس عبر ثلاث مراحل: بناء، انطلاق، نمو.' : 'We support the business lifecycle through three stages: Build, Start, and Grow.'}
            </h2>
            <p className="text-sm text-[#4F555E] leading-relaxed">
              {ar
                ? 'ليس كل عمل يحتاج نفس الحل، وليس كل شركة تقف عند نفس المرحلة. بعض الأعمال تحتاج تأسيسًا رقميًا واضحًا، وبعضها يحتاج تنظيم المتابعة والتشغيل، وبعضها بدأ ينمو لكنه يحتاج بيانات وأتمتة وسيطرة أفضل. لذلك نفكر في الحلول عبر دورة حياة البزنس، حتى يبدأ العميل من المرحلة الأقرب لوضعه الحالي.'
                : 'Not every business needs the same solution, and not every company is at the same stage. Some need a clear digital foundation. Others need more organized follow-up and operations. Others are growing and need data, automation, and better control. That is why we think about solutions across the business lifecycle, so the client can begin from the stage closest to their current reality.'}
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-5">
            {stages.map((st, i) => {
              const d = ar ? st.ar : st.en;
              return (
                <ScrollReveal key={st.slug} delay={i * 0.08}>
                  <Link
                    to={`/solutions#${st.slug}`}
                    className="block bg-[#FAFAFA] rounded-2xl p-6 border border-[#E5E5E5] hover:border-[#6D5DF6] hover:shadow-md active:scale-[0.98] active:border-[#6D5DF6] transition-all duration-200 group h-full"
                  >
                    <h3 className="text-lg font-bold text-[#101418] mb-2">{d.title}</h3>
                    <p className="text-sm text-[#4F555E] mb-4 leading-relaxed">{d.desc}</p>
                    <span className="inline-flex items-center gap-1 text-sm text-[#6D5DF6] font-medium group-hover:gap-2 group-active:gap-2 transition-all">
                      {d.cta} <ArrowRight size={13} />
                    </span>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Depth built on research and behavior */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-3 leading-tight">
              {ar ? 'عمق مبني على البحث والسلوك' : 'Depth Built on Research and Behavior'}
            </h2>
            <p className="text-sm font-medium text-[#101418] mb-4">
              {ar ? 'لا نبني بناءً على الانطباع فقط… بل على السلوك، البيانات، والتشغيل الحقيقي.' : 'We do not build from assumptions alone. We build from behavior, data, and real operations.'}
            </p>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-6">
              {ar
                ? 'قبل أن نكتب سطر كود أو نرسم واجهة، ندرس ما يحدث فعليًا داخل العمل: كيف يصل العميل؟ أين يتردد؟ أين تضيع المتابعة؟ ما الذي يضغط الفريق؟ أين توجد البيانات؟ وما أول رقم يجب تحسينه؟ هذا العمق يجعل الحل أقرب للواقع، وأسهل في الاستخدام، وأكثر قدرة على تحقيق أثر بعد الإطلاق.'
                : 'Before writing code or designing an interface, we study what is actually happening inside the business: how customers arrive, where they hesitate, where follow-up is lost, what pressures the team, where data lives, and which number should improve first. This depth makes the solution closer to reality, easier to use, and more capable of creating measurable impact after launch.'}
            </p>
            <ul className="space-y-2.5 mb-7">
              {(ar ? [
                'رحلة العميل من أول اهتمام حتى الطلب أو الحجز.',
                'نقاط التردد أو الخروج من التجربة.',
                'مسار المتابعة بين الفريق والعميل.',
                'المهام اليدوية المتكررة التي تستهلك الوقت.',
                'البيانات التي تحتاجها الإدارة لاتخاذ قرار.',
                'أول عائد يجب أن يظهر من الحل.',
              ] : [
                'The customer journey from first interest to request or booking.',
                'Hesitation or drop-off points inside the experience.',
                'Follow-up flow between the team and the customer.',
                'Repeated manual tasks that consume time.',
                'The data management needs to make decisions.',
                'The first return the solution should create.',
              ]).map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#4F555E]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6D5DF6] mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/research" className="inline-flex items-center gap-2 text-[#6D5DF6] text-sm font-semibold hover:underline">
              {ar ? 'استكشف الأبحاث والرؤى' : 'Explore Research & Insights'} <ArrowRight size={14} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* 6. How ENSDIM works */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="mb-10 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-3">{ar ? 'كيف تعمل إنسديم؟' : 'How ENSDIM Works'}</h2>
            <p className="text-sm text-[#4F555E] leading-relaxed">
              {ar
                ? 'من فهم الواقع إلى بناء تكنولوجيا قابلة للاستخدام والتطوير. طريقة عملنا ليست قائمة مهام تقنية فقط. هي مسار واضح يبدأ بفهم الواقع، ثم تحديد الأولوية، ثم تصميم التجربة والتدفق، ثم البناء، ثم القياس والتحسين.'
                : 'From understanding the reality to building technology that can be used and improved. Our process is not just a technical task list. It is a clear path that begins with understanding the current reality, then defining the priority, designing the experience and flow, building, measuring, and improving.'}
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {howWeWork.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="p-5 border border-[#E5E5E5] rounded-2xl h-full">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#EEEAFE] text-[#6D5DF6] text-xs font-bold mb-3">{i + 1}</span>
                  <h3 className="text-sm font-bold text-[#101418] mb-2">{ar ? step.ar.title : step.en.title}</h3>
                  <p className="text-xs text-[#4F555E] leading-relaxed">{ar ? step.ar.desc : step.en.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Technology we build */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="mb-10 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-3">{ar ? 'التكنولوجيا التي نبنيها' : 'Technology We Build'}</h2>
            <p className="text-sm text-[#4F555E] leading-relaxed">
              {ar
                ? 'كل تكنولوجيا نبنيها يجب أن تخدم مرحلة واضحة داخل البزنس. بعد تحديد المرحلة والهدف، نختار التكنولوجيا المناسبة: واجهة تظهر الشركة، نظام ينظم المتابعة، تطبيق يقرّب الخدمة من العميل، لوحة بيانات تكشف الأداء، أو أتمتة تقلل الضغط على الفريق.'
                : 'After defining the stage and goal, we choose the right technology: an interface that presents the company, a system that organizes follow-up, an app that brings the service closer to customers, a dashboard that reveals performance, or automation that reduces team pressure.'}
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {technologyLinks.map((s, i) => (
              <ScrollReveal key={s.slug} delay={Math.min(i * 0.05, 0.3)}>
                <Link
                  to={`/services/${s.slug}`}
                  className="group flex items-center justify-between gap-3 px-5 py-4 bg-white border border-[#E5E5E5] rounded-xl hover:border-[#6D5DF6] hover:shadow-md active:scale-[0.98] active:border-[#6D5DF6] transition-all duration-200"
                >
                  <span className="text-sm font-semibold text-[#101418]">{ar ? s.ar : s.en}</span>
                  <ArrowRight size={14} className="text-[#6D5DF6] flex-shrink-0 group-hover:translate-x-0.5 group-active:translate-x-0.5 transition-transform" />
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. A smart team with cross-market experience */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-xs font-semibold text-[#6D5DF6] uppercase tracking-wider mb-3">
              {ar ? 'فريق عبقري بخبرة عابرة للحدود' : 'A Smart Team with Cross-Market Experience'}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-5 leading-tight">
              {ar ? 'فريق من مصر… بعقلية قادرة على خدمة أسواق مختلفة.' : 'A team operating from Egypt with the mindset to serve different markets.'}
            </h2>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-4">
              {ar
                ? 'تعمل إنسديم من مصر، مع فريق وخبرات تمتد عبر تخصصات وأسواق مختلفة، وتجارب مع عملاء في أكثر من دولة. هذا يمنح العملاء توازنًا مهمًا: فهم قريب للسوق، تكلفة أذكى، تنوعًا في الخبرات، وتنفيذًا منظمًا لا يعتمد على العشوائية أو التواصل المتفرق.'
                : 'ENSDIM operates from Egypt, with expertise across disciplines, markets, and client contexts in more than one country. This gives clients an important balance: practical market understanding, smarter cost, diverse expertise, and organized execution that does not depend on scattered communication.'}
            </p>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-6">
              {ar
                ? 'نحن لا نقدم تنفيذًا عن بعد كبديل أقل تكلفة فقط، بل نقدم نموذج تعاون واضح: نطاق محدد، مراحل مرئية، تواصل منظم، مساحة عميل، ومخرجات يمكن مراجعتها وتطويرها.'
                : 'We do not present remote execution as a cheaper alternative. We offer a structured collaboration model: clear scope, visible stages, organized communication, a client workspace, and deliverables that can be reviewed and improved.'}
            </p>
            <ul className="space-y-2.5 mb-6">
              {(ar ? [
                'خبرات متعددة دون تضخيم تكلفة التشغيل.',
                'قدرة على خدمة أسواق مختلفة من مركز تشغيل مرن.',
                'تنظيم واضح للمراحل والملفات والملاحظات.',
                'تواصل ومتابعة من خلال مساحة عميل واضحة.',
                'قابلية للتوسع حسب حجم المشروع واحتياجه.',
              ] : [
                'Multi-disciplinary expertise without inflated operating cost.',
                'Ability to serve different markets from a flexible operating center.',
                'Clear organization for stages, files, and feedback.',
                'Communication and follow-up through a visible client workspace.',
                'Scalable engagement according to project size and need.',
              ]).map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#4F555E]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6D5DF6] mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-6 italic">
              {ar
                ? 'الميزة ليست في مكان الفريق فقط، بل في طريقة إدارة العمل ووضوح التجربة للعميل.'
                : 'The advantage is not only where the team is located. It is how the work is managed and how clear the experience feels for the client.'}
            </p>
            <Link to="/team" className="inline-flex items-center gap-2 text-[#6D5DF6] text-sm font-semibold hover:underline">
              {ar ? 'تعرّف على الفريق' : 'Meet the Team'} <ArrowRight size={14} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* 9. Client Workspace */}
      <section className="py-16 bg-[#0f0d19] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">{ar ? 'مساحة العميل' : 'Client Workspace'}</h2>
            <p className="text-sm font-medium text-[#EEEAFE]/90 mb-4">
              {ar ? 'نؤمن أن الوضوح أثناء المشروع جزء من جودة الحل نفسه.' : 'We believe project clarity is part of the quality of the solution itself.'}
            </p>
            <p className="text-sm text-[#EEEAFE]/75 leading-relaxed mb-6 max-w-2xl">
              {ar
                ? 'نوفر لعملائنا مساحة متابعة واضحة تساعدهم على رؤية تقدم المشروع، المراحل، الملفات، الملاحظات، المدفوعات، العقود، ونسبة الإنجاز. هذه ليست ميزة شكلية، بل جزء من فلسفة إنسديم: الوضوح يبني الثقة، ويقلل القلق، ويسرّع القرار.'
                : 'We provide clients with a clear workspace to track project progress, stages, files, notes, payments, contracts, and completion percentage. This is not a cosmetic feature. It reflects ENSDIM’s belief that clarity builds trust, reduces anxiety, and speeds up decisions.'}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {(ar
                ? ['تقدم المشروع', 'المراحل', 'الملفات', 'الملاحظات', 'المدفوعات', 'العقود', 'طلبات التعديل']
                : ['Project progress', 'Stages', 'Files', 'Notes', 'Payments', 'Contracts', 'Change requests']
              ).map((item, i) => (
                <span key={i} className="text-xs px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[#EEEAFE]/85">{item}</span>
              ))}
            </div>
            <Link to="/client-workspace" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#6D5DF6] text-white rounded-xl hover:bg-[#5d4de6] transition-colors text-sm font-semibold">
              {ar ? 'تعرّف على مساحة العميل' : 'Learn About Client Workspace'} <ArrowRight size={15} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* 10. Explore ENSDIM from the inside */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="mb-10 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-3">
              {ar ? 'تعرّف على إنسديم من الداخل' : 'Explore ENSDIM from the Inside'}
            </h2>
            <p className="text-sm text-[#4F555E]">
              {ar ? 'من الرؤية إلى الفريق… اختر الخطوة التالية للتعرّف علينا.' : 'From vision to team, choose the next step to know us better.'}
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: '/about', en: { title: 'About ENSDIM', desc: 'Read the ENSDIM story, the meaning behind the name, the vision, and the philosophy behind building technology that listens to people and business reality.', cta: 'Go to About ENSDIM' }, ar: { title: 'About ENSDIM', desc: 'تعرّف على قصة إنسديم، معنى الاسم، الرؤية، والفلسفة التي تقف خلف بناء تكنولوجيا تستمع للإنسان والعمل.', cta: 'انتقل إلى About' } },
              { href: '/team', en: { title: 'Our Team', desc: 'Meet the team and expertise behind strategy, user experience, engineering, data, and execution.', cta: 'Meet the Team' }, ar: { title: 'Our Team', desc: 'تعرّف على الفريق والخبرات التي تجمع بين التفكير الاستراتيجي، تجربة المستخدم، الهندسة، البيانات، والتنفيذ.', cta: 'تعرّف على الفريق' } },
              { href: '/downloads/ensdim-company-profile.pdf', en: { title: 'Company Profile', desc: 'Download the company profile for a concise view of ENSDIM, its vision, services, working model, and selected projects.', cta: 'Download Company Profile' }, ar: { title: 'Company Profile', desc: 'حمّل بروفايل الشركة لعرض مختصر ومنظم عن إنسديم، رؤيتها، خدماتها، طريقة عملها، ومشاريعها المختارة.', cta: 'تحميل بروفايل الشركة' } },
              { href: '/contact', en: { title: 'Contact ENSDIM', desc: 'Share the challenge happening inside your business, and we will help identify the closest path forward.', cta: 'Contact ENSDIM' }, ar: { title: 'Contact ENSDIM', desc: 'شاركنا التحدي الذي يحدث داخل عملك الآن، وسنساعدك على تحديد المسار الأقرب للحل.', cta: 'تواصل معنا' } },
            ].map((card, i) => {
              const d = ar ? card.ar : card.en;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <Link
                    to={card.href}
                    className="group flex flex-col h-full p-5 border border-[#E5E5E5] rounded-2xl hover:border-[#6D5DF6] hover:shadow-md active:scale-[0.98] active:border-[#6D5DF6] transition-all duration-200"
                  >
                    <h3 className="text-sm font-bold text-[#101418] mb-2">{d.title}</h3>
                    <p className="text-xs text-[#4F555E] leading-relaxed mb-4 flex-1">{d.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#6D5DF6] font-semibold group-hover:gap-2.5 group-active:gap-2.5 transition-all">
                      {d.cta} <ArrowRight size={12} />
                    </span>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. FAQ */}
      <FAQSection
        title={ar ? 'أسئلة شائعة عن إنسديم' : 'Frequently Asked Questions About ENSDIM'}
        faqs={ar ? [
          { question: 'ما هي إنسديم؟', answer: 'إنسديم شركة تكنولوجيا وحلول تشغيل ذكي تبني مواقع، تطبيقات، أنظمة، لوحات بيانات، أتمتة، وطبقات ذكاء حول سلوك العميل ومشاكل البزنس الحقيقية.' },
          { question: 'هل إنسديم شركة برمجة فقط؟', answer: 'لا. البرمجة جزء من التنفيذ، لكن العمل يبدأ قبل ذلك بفهم رحلة العميل، التشغيل، البيانات، ونقطة الأثر التي يجب تحسينها.' },
          { question: 'ما الذي يجعل إنسديم مختلفة؟', answer: 'إنسديم لا تبدأ من اسم الخدمة، بل من طريقة عملك: كيف يدخل العميل، أين تتعطل المتابعة، ما الذي يضغط الفريق، وما الذي تحتاج الإدارة إلى رؤيته.' },
          { question: 'هل تعمل إنسديم مع شركات خارج مصر؟', answer: 'نعم. تعمل إنسديم من مصر وتخدم عملاء في أسواق مختلفة، مع نموذج تعاون واضح يعتمد على مراحل تنفيذ، تواصل منظم، ومساحة متابعة للعميل.' },
          { question: 'كيف أبدأ مع إنسديم؟', answer: 'ابدأ بمشاركة التحدي الحالي داخل عملك، وسنساعدك على تحديد ما إذا كنت تحتاج تحسين تجربة العميل، تنظيم التشغيل، بناء منتج رقمي، أتمتة، أو رؤية أوضح للبيانات.' },
        ] : [
          { question: 'What is ENSDIM?', answer: 'ENSDIM is a technology and intelligent operations company that builds websites, applications, systems, dashboards, automation, and intelligence layers around customer behavior and real business challenges.' },
          { question: 'Is ENSDIM only a software company?', answer: 'No. Software development is part of execution, but the work begins earlier with understanding customer journeys, operations, data, and the impact point that needs improvement.' },
          { question: 'What makes ENSDIM different?', answer: 'ENSDIM does not start from a service name. It starts from how your business works: how customers enter, where follow-up breaks, what pressures the team, and what management needs to see.' },
          { question: 'Does ENSDIM work with companies outside Egypt?', answer: 'Yes. ENSDIM operates from Egypt and serves clients in different markets through a clear collaboration model built around implementation stages, organized communication, and a visible client workspace.' },
          { question: 'How do we start with ENSDIM?', answer: 'Start by sharing the current business challenge. We will help identify whether the right path is improving customer experience, organizing operations, building a digital product, adding automation, or gaining clearer visibility from data.' },
        ]}
      />

      {/* 12. Final CTA */}
      <section className="py-14 bg-[#0f0d19] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold mb-3">
            {ar ? 'ابدأ بفهم ما يحتاجه عملك فعلًا… ثم ابنِ التكنولوجيا المناسبة.' : 'Start by understanding what your business really needs, then build the right technology.'}
          </h2>
          <p className="text-sm text-[#EEEAFE]/75 mb-6 max-w-xl mx-auto">
            {ar
              ? 'ليس المطلوب أن تبدأ بمشروع كبير، بل أن تبدأ من نقطة واضحة: عميل يضيع، متابعة تتأخر، تشغيل مرهق، بيانات غير مستغلة، أو نمو يحتاج تنظيمًا. شاركنا تحدي عملك، وسنساعدك على تحويله إلى مسار تنفيذ واضح.'
              : 'You do not need to begin with a large project. Begin with a clear point of impact: lost customers, delayed follow-up, heavy operations, underused data, or growth that needs structure. Share your business challenge, and we will help turn it into a clear execution path.'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] transition-colors text-sm font-semibold">
              {ar ? 'شارك تحدي عملك' : 'Share Your Business Challenge'} <ArrowRight size={15} />
            </Link>
            <Link to="/services" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-white/20 text-white/80 hover:border-white/40 hover:text-white transition-colors text-sm font-semibold">
              {ar ? 'استكشف خدماتنا' : 'Explore Services'}
            </Link>
            <Link to="/team" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-white/20 text-white/80 hover:border-white/40 hover:text-white transition-colors text-sm font-semibold">
              {ar ? 'تعرّف على الفريق' : 'Meet the Team'}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
