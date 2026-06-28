import { Link } from 'react-router';
import { ArrowRight, Download, Users, Workflow, BarChart3 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';
import { FAQSection } from '../components/FAQSection';

/**
 * /company/team in the approved content brief doesn't exist as a route —
 * the team page lives at /team. Linked there instead to avoid a 404.
 */

const aboutWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': 'https://ensdim.com/about#webpage',
  name: 'About ENSDIM',
  description: 'ENSDIM exists to build technology that understands people before it serves systems.',
  url: 'https://ensdim.com/about',
  isPartOf: { '@id': 'https://ensdim.com/#website' },
  about: { '@id': 'https://ensdim.com/#organization' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ensdim.com/' },
      { '@type': 'ListItem', position: 2, name: 'Company', item: 'https://ensdim.com/company' },
      { '@type': 'ListItem', position: 3, name: 'About', item: 'https://ensdim.com/about' },
    ],
  },
};

const lenses = [
  {
    Icon: Users,
    accent: '#6D5DF6',
    en: { title: 'How We See the Customer', lead: 'Customers do not only need a new tool. They need an experience that leads them to a decision.', body: 'Every customer moves through a journey before they trust, request, book, buy, or continue. That journey can break because of unclear messaging, crowded pages, delayed responses, weak follow-up, or an experience that does not create enough confidence.\n\nThat is why we build digital solutions around customer behavior: what they see first, when they understand the offer, where they hesitate, what makes them submit their information, and how the team can follow up in an organized way afterwards.', outcome: 'The outcome we aim for: turning the digital experience from a company-facing interface into a path that helps the customer take a clear next step.' },
    ar: { title: 'كيف نرى العميل؟', lead: 'العميل لا يحتاج أداة جديدة فقط… يحتاج تجربة تقوده للقرار.', body: 'كل عميل يمر برحلة قبل أن يثق، يطلب، يحجز، يشتري، أو يستمر. هذه الرحلة قد تتعطل بسبب رسالة غير واضحة، صفحة مزدحمة، رد متأخر، متابعة ضعيفة، أو تجربة لا تطمئنه بما يكفي.\n\nلذلك نبني الحلول الرقمية حول سلوك العميل: ماذا يرى أولًا؟ متى يفهم العرض؟ أين يتردد؟ ما الذي يجعله يترك بياناته؟ وكيف يمكن للفريق متابعته بطريقة منظمة بعد ذلك؟', outcome: 'النتيجة التي نبحث عنها: أن تتحول التجربة الرقمية من واجهة تعرض الشركة إلى مسار يساعد العميل على اتخاذ خطوة واضحة.' },
  },
  {
    Icon: Workflow,
    accent: '#D63A3A',
    en: { title: 'How We See Operations', lead: 'Good operations do not depend on memory. They depend on clear systems.', body: 'In many companies, the problem is not lack of effort. It is too much unorganized effort: too many messages, follow-up files, scattered tasks, undocumented requests, and delayed decisions because the full picture is not visible.\n\nWe build technology to reduce that pressure: organizing requests, customer follow-up, task distribution, stage documentation, data visibility, and connecting each team member to what they need to see at the right time.', outcome: 'The outcome we aim for: daily work that is clearer, less dependent on memory, and easier to track and improve.' },
    ar: { title: 'كيف نرى التشغيل؟', lead: 'التشغيل الجيد لا يعتمد على الذاكرة… بل على نظام واضح.', body: 'في كثير من الشركات، لا تكون المشكلة في نقص المجهود، بل في كثرة المجهود غير المنظم. رسائل كثيرة، ملفات متابعة، مهام متفرقة، طلبات غير موثقة، وقرارات تحتاج وقتًا لأن الصورة غير مكتملة.\n\nنحن نبني التكنولوجيا لتقلل هذا الضغط: تنظيم الطلبات، متابعة العملاء، توزيع المهام، توثيق المراحل، إظهار البيانات، وربط الفريق بما يحتاج أن يراه في الوقت المناسب.', outcome: 'النتيجة التي نبحث عنها: أن يصبح العمل اليومي أوضح، أقل اعتمادًا على التذكر، وأكثر قابلية للمتابعة والتطوير.' },
  },
  {
    Icon: BarChart3,
    accent: '#3B2A78',
    en: { title: 'How We See Data', lead: 'Data is not enough unless it becomes a decision.', body: 'Every company has data in one form or another: customers, visits, requests, conversations, sales, campaigns, or daily operations. The real value appears when that data becomes indicators that help management understand what is happening and act at the right time.\n\nWe do not treat data as numbers only. We treat it as signals: where opportunities come from, where they get blocked, which service performs best, which team needs support, and what decision needs to be made now.', outcome: 'The outcome we aim for: clearer visibility that helps management act early instead of waiting until the problem becomes obvious too late.' },
    ar: { title: 'كيف نرى البيانات؟', lead: 'البيانات لا تكفي إذا لم تتحول إلى قرار.', body: 'كل شركة تمتلك بيانات بشكل أو بآخر: عملاء، زيارات، طلبات، محادثات، مبيعات، حملات، أو تشغيل يومي. لكن القيمة الحقيقية تظهر عندما تتحول هذه البيانات إلى مؤشرات تساعد الإدارة على فهم ما يحدث واتخاذ القرار في الوقت المناسب.\n\nلذلك لا نتعامل مع البيانات كأرقام فقط، بل كإشارات: أين تأتي الفرص؟ أين تتعطل؟ ما الخدمة الأفضل أداءً؟ ما الفريق الذي يحتاج دعمًا؟ وما القرار الذي يجب اتخاذه الآن؟', outcome: 'النتيجة التي نبحث عنها: رؤية أوضح تساعد الإدارة على التحرك مبكرًا بدل الانتظار حتى تظهر المشكلة متأخرة.' },
  },
];

const buildPrinciples = [
  { en: 'Understanding before execution.', ar: 'الفهم قبل التنفيذ.' },
  { en: 'People before interfaces.', ar: 'الإنسان قبل الواجهة.' },
  { en: 'Operations before feature lists.', ar: 'التشغيل قبل الخصائص.' },
  { en: 'Return before show.', ar: 'العائد قبل الاستعراض.' },
  { en: 'Improvement after launch.', ar: 'التحسين بعد الإطلاق.' },
];

const howWeWork = [
  { en: { title: 'We listen and understand', desc: 'We understand the current workflow, customer journey, friction points, and team pressure.' }, ar: { title: 'نسمع ونفهم', desc: 'نفهم طريقة العمل الحالية، رحلة العميل، نقاط التعطل، وضغط الفريق.' } },
  { en: { title: 'We define the point of impact', desc: 'We identify the first area worth improving now: conversion, follow-up, operations, data, or growth.' }, ar: { title: 'نحدد نقطة الأثر', desc: 'نختار أول نقطة تستحق التحسين الآن: تحويل، متابعة، تشغيل، بيانات، أو نمو.' } },
  { en: { title: 'We design the path', desc: 'We map the customer experience, workflow, permissions, and required data.' }, ar: { title: 'نصمم المسار', desc: 'نرسم تجربة العميل وتدفق العمل والصلاحيات والبيانات المطلوبة.' } },
  { en: { title: 'We build in stages', desc: 'We deliver what creates clear value first, then expand the solution based on real usage.' }, ar: { title: 'نبني على مراحل', desc: 'ننفذ ما يحقق قيمة واضحة أولًا، ثم نوسع الحل حسب الاستخدام الحقيقي.' } },
  { en: { title: 'We measure and improve', desc: 'We review performance after launch and improve based on results and feedback.' }, ar: { title: 'نقيس ونطوّر', desc: 'نراجع الأداء بعد الإطلاق ونحسن بناءً على النتائج والملاحظات.' } },
];

const partnerTraits = [
  { en: 'Strategic thinking before execution.', ar: 'تفكير استراتيجي قبل التنفيذ.' },
  { en: 'Behavior-led experience design.', ar: 'تصميم تجربة مبني على السلوك.' },
  { en: 'Scalable technical build.', ar: 'بناء تقني قابل للتوسع.' },
  { en: 'A clear connection between solution and operations.', ar: 'ربط بين الحل والتشغيل.' },
  { en: 'Transparent follow-up during the project.', ar: 'وضوح في المتابعة أثناء المشروع.' },
  { en: 'Continuous improvement after launch.', ar: 'تحسين مستمر بعد الإطلاق.' },
];

export function AboutPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  return (
    <>
      <SEO
        title={ar ? 'عن إنسديم | فلسفتنا، رؤيتنا، وطريقة تفكيرنا' : 'About ENSDIM | Our Philosophy, Vision, and Way of Thinking'}
        description={ar
          ? 'إنسديم وُجدت لتبني تكنولوجيا تفهم الإنسان قبل أن تخدم النظام. تعرّف على قصتنا، معنى الاسم، ورؤيتنا.'
          : 'ENSDIM exists to build technology that understands people before it serves systems. Discover our story, the meaning behind our name, and our vision.'}
        canonical="/about"
        lang={ar ? 'ar' : 'en'}
        jsonLd={aboutWebPageSchema}
      />

      {/* Hero */}
      <section className="pt-24 pb-14 sm:pt-32 sm:pb-20 relative overflow-hidden bg-[#0f0d19] text-white">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 30% 50%, rgba(59,42,120,0.22) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-6 text-xs text-white/50 flex items-center gap-1">
            <Link to="/" className="hover:text-white/80 transition-colors">{ar ? 'الرئيسية' : 'Home'}</Link>
            <span className="opacity-40">/</span>
            <Link to="/company" className="hover:text-white/80 transition-colors">{ar ? 'الشركة' : 'Company'}</Link>
            <span className="opacity-40">/</span>
            <span className="text-white/70 font-medium">{ar ? 'عن إنسديم' : 'About ENSDIM'}</span>
          </div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5 uppercase tracking-wider bg-[#6D5DF6]/15 border border-[#6D5DF6]/20 text-[#EEEAFE]/80">
            {ar ? 'عن إنسديم' : 'About ENSDIM'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight text-white">
            {ar ? 'إنسديم وُجدت لتبني تكنولوجيا تفهم الإنسان قبل أن تخدم النظام.' : 'ENSDIM exists to build technology that understands people before it serves systems.'}
          </h1>
          <p className="text-base sm:text-lg max-w-2xl leading-relaxed mb-3 text-[#EEEAFE]/75">
            {ar
              ? 'نحن نؤمن أن أفضل الحلول الرقمية لا تبدأ من الكود، بل من فهم السلوك: كيف يفكر العميل، أين يتردد، كيف يعمل الفريق، وما الذي تحتاجه الإدارة حتى ترى الصورة بوضوح. من هذا الفهم نبني تكنولوجيا تساعد الأعمال على البيع بشكل أوضح، التشغيل بضغط أقل، والنمو بثقة أكبر.'
              : 'We believe the strongest digital solutions do not begin with code. They begin with understanding behavior: how customers think, where they hesitate, how teams operate, and what management needs to see clearly. From that understanding, we build technology that helps businesses sell with more clarity, operate with less pressure, and grow with more confidence.'}
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {'Listen to data. Understand business. Build solutions.'
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
              to="#vision"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
            >
              {ar ? 'استكشف رؤيتنا' : 'Explore Our Vision'} <ArrowRight size={15} />
            </Link>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-white/20 text-white/80 hover:border-white/40 hover:text-white active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
            >
              {ar ? 'شاهد مشاريعنا' : 'View Our Work'}
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-xs font-semibold text-[#6D5DF6] uppercase tracking-wider mb-3">{ar ? 'قصة إنسديم' : 'Our Story'}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-5 leading-tight">
              {ar ? 'بدأت إنسديم من فكرة بسيطة: التكنولوجيا يجب أن تستمع.' : 'ENSDIM began with a simple belief: technology should listen.'}
            </h2>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-4">
              {ar
                ? 'لم تُبنَ إنسديم كفكرة شركة برمجة تقليدية، بل كطريقة مختلفة في فهم علاقة البزنس بالتكنولوجيا. رأينا أن كثيرًا من الحلول الرقمية تفشل ليس لأنها ضعيفة تقنيًا فقط، بل لأنها لا تستمع بما يكفي: لا تستمع للعميل، ولا لطريقة عمل الفريق، ولا للبيانات التي تكشف أين يتعطل النمو.'
                : 'ENSDIM was not created as a traditional software company. It was built around a different way of understanding the relationship between business and technology. Many digital solutions fail not only because they are technically weak, but because they do not listen enough: to customers, to how teams actually work, or to the data that shows where growth is blocked.'}
            </p>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-4">
              {ar
                ? 'لذلك نرى التكنولوجيا كشيء يجب أن يُبنى حول طبيعة كل عمل. كل شركة لها رحلة عميل مختلفة، ضغط تشغيلي مختلف، ونقاط تعطل مختلفة. ودور إنسديم هو فهم هذه التفاصيل وتحويلها إلى حلول رقمية أوضح، أسهل في الاستخدام، وأكثر ارتباطًا بالعائد.'
                : 'That is why we believe technology should be shaped around the reality of each business. Every company has a different customer journey, a different operational pressure, and different points of friction. ENSDIM’s role is to understand those details and turn them into digital solutions that are clearer, easier to use, and more connected to business return.'}
            </p>
            <p className="text-sm text-[#4F555E] leading-relaxed">
              {ar
                ? 'نحن لا نبني فقط ما يطلبه العميل، بل نحاول فهم ما يحتاجه العمل فعلًا.'
                : 'We do not only build what the client asks for. We work to understand what the business actually needs.'}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* The Meaning Behind ENSDIM */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-xs font-semibold text-[#6D5DF6] uppercase tracking-wider mb-3">{ar ? 'معنى إنسديم' : 'The Meaning Behind ENSDIM'}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-5 leading-tight">
              {ar ? 'اسمنا يبدأ من الاستماع… وطريقتنا تبدأ من الفهم.' : 'Our name starts with listening. Our method starts with understanding.'}
            </h2>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-4">
              {ar
                ? 'اسم إنسديم مستلهم من الجذر المصري القديم Sdm، المرتبط بمعنى السماع أو الاستماع. ويحمل الاسم روحًا قريبة من واحدة من أقدم الوصايا المصرية المرتبطة بالحكمة، كما تظهر في بردية بولاق 4 المرتبطة بالكاتب آني، وفيها معنى عميق يدعو إلى: أنصت لكلمات الناس.'
                : 'The name ENSDIM is inspired by the ancient Egyptian root Sdm, associated with hearing or listening. The name carries a spirit close to one of the ancient Egyptian wisdom traditions, as reflected in Bulaq Papyrus 4 and linked to the scribe Ani: listen to the words of people.'}
            </p>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-4">
              {ar
                ? 'بالنسبة لنا، لم يكن الاسم اختيارًا لغويًا فقط، بل فلسفة عمل. نحن نؤمن أن التكنولوجيا الجيدة لا تبدأ بالكود، بل بالاستماع: الاستماع للعميل، لسلوك المستخدم، لضغط الفريق، للبيانات، ولما يحدث داخل العمل قبل اقتراح أي حل.'
                : 'For us, the name is not only a linguistic reference. It is a working philosophy. Good technology does not begin with code; it begins with listening: to the client, to user behavior, to team pressure, to data, and to what is happening inside the business before any solution is proposed.'}
            </p>
            <p className="text-sm text-[#4F555E] leading-relaxed">
              {ar
                ? 'من هنا جاءت إنسديم: شركة تبني تكنولوجيا تستمع أولًا، ثم تفهم، ثم تحوّل هذا الفهم إلى حلول أوضح وأكثر ارتباطًا بالإنسان والتشغيل والعائد.'
                : 'This is where ENSDIM begins: technology that listens first, understands second, and then turns that understanding into clearer solutions connected to people, operations, and measurable return.'}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Why We Believe in What We Build */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-xs font-semibold text-[#6D5DF6] uppercase tracking-wider mb-3">
              {ar ? 'لماذا نؤمن بما نبنيه؟' : 'Why We Believe in What We Build'}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-5 leading-tight">
              {ar ? 'لأن أغلب مشاكل البزنس ليست تقنية فقط… بل سلوكية وتشغيلية أيضًا.' : 'Most business problems are not only technical. They are behavioral and operational too.'}
            </h2>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-4">
              {ar
                ? 'قد تبدو المشكلة في ظاهرها موقعًا ضعيفًا، أو متابعة غير منظمة، أو بيانات متفرقة، أو فريقًا مضغوطًا. لكن خلف ذلك غالبًا توجد مشكلة أعمق: عميل لا يفهم العرض بسرعة، فريق لا يرى الخطوة التالية، إدارة لا تمتلك مؤشرات واضحة، أو نظام لا يتناسب مع طريقة العمل اليومية.'
                : 'A problem may appear as a weak website, unorganized follow-up, scattered data, or an overwhelmed team. But behind it there is often a deeper issue: customers who do not understand the offer quickly, teams that cannot see the next step, management without clear indicators, or systems that do not fit daily operations.'}
            </p>
            <p className="text-sm text-[#4F555E] leading-relaxed">
              {ar
                ? 'هنا يظهر دور إنسديم. نحن لا نفصل بين تجربة العميل وتشغيل الشركة والبيانات. نرى الثلاثة كمنظومة واحدة: إذا تحسنت تجربة العميل، أصبحت المتابعة أوضح. وإذا تحسنت المتابعة، أصبح التشغيل أكثر تنظيمًا. وإذا أصبحت البيانات أوضح، أصبح القرار أسرع.'
                : 'This is where ENSDIM adds value. We do not separate customer experience, operations, and data. We see them as one connected system: when the customer experience improves, follow-up becomes clearer. When follow-up improves, operations become more organized. When data becomes clearer, decisions become faster.'}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Vision */}
      <section id="vision" className="py-16 bg-[#0f0d19] text-white scroll-mt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-xs font-semibold text-[#EEEAFE]/60 uppercase tracking-wider mb-3">{ar ? 'رؤيتنا' : 'Our Vision'}</p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-5 leading-tight">
              {ar ? 'تكنولوجيا حول الإنسان، لا فوقه.' : 'Technology around people, not above them.'}
            </h2>
            <p className="text-sm text-[#EEEAFE]/75 leading-relaxed mb-4">
              {ar
                ? 'نؤمن في إنسديم أن البزنس في جوهره علاقات: علاقة بين الشركة وعملائها، بين الإدارة والفريق، وبين الإنسان والنظام الذي يستخدمه كل يوم.'
                : 'At ENSDIM, we believe business is built on relationships: between companies and customers, between management and teams, and between people and the systems they use every day.'}
            </p>
            <p className="text-sm text-[#EEEAFE]/75 leading-relaxed mb-4">
              {ar
                ? 'لذلك لا نرى التكنولوجيا كبديل للإنسان، بل كأداة يجب أن تُبنى حوله: تفهم سلوكه، تقلل جهده، تنظّم عمله، وتساعده على أداء أفضل.'
                : 'That is why we do not see technology as a replacement for people, but as a tool that should be built around them: understanding behavior, reducing effort, organizing work, and helping people perform better.'}
            </p>
            <p className="text-sm text-[#EEEAFE]/75 leading-relaxed mb-4">
              {ar
                ? 'رؤيتنا هي أن نبني حلولًا رقمية تجعل العلاقة بين الإنسان والتكنولوجيا أكثر بساطة ووضوحًا؛ حلول تساعد العميل على اتخاذ خطوة بثقة، وتساعد الفريق على العمل بضغط أقل، وتساعد الإدارة على رؤية أوضح وقرارات أفضل.'
                : 'Our vision is to build digital solutions that make the relationship between people and technology simpler and clearer; solutions that help customers take action with confidence, help teams work with less pressure, and help management see more clearly and make better decisions.'}
            </p>
            <p className="text-sm text-[#EEEAFE]/75 leading-relaxed mb-4">
              {ar
                ? 'يتماشى هذا التفكير مع الاتجاه العالمي نحو التكنولوجيا المتمحورة حول الإنسان، كما توضّح المفوضية الأوروبية في مفهوم Industry 5.0، الذي يضع الإنسان والاستدامة والمرونة في قلب التطور الصناعي.'
                : 'This thinking aligns with the global shift toward human-centric technology, as reflected by the European Commission in the concept of Industry 5.0, which places people, sustainability, and resilience at the heart of industrial development.'}
            </p>
            <p className="text-sm text-[#EEEAFE]/75 leading-relaxed">
              {ar
                ? 'في إنسديم، نترجم هذا المبدأ داخل البزنس: تكنولوجيا تفهم الناس، تسهّل التشغيل، وتحسّن العائد.'
                : 'At ENSDIM, we translate this principle into business practice: technology that understands people, simplifies operations, and improves return.'}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Build Philosophy */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-xs font-semibold text-[#6D5DF6] uppercase tracking-wider mb-3">{ar ? 'فلسفتنا في البناء' : 'Our Build Philosophy'}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-5 leading-tight">
              {ar ? 'نبدأ من الفهم، ثم نبني التكنولوجيا المناسبة.' : 'We start with understanding, then build the right technology.'}
            </h2>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-4">
              {ar
                ? 'في إنسديم، لا نبدأ بسؤال: "ما الذي تريد بناءه؟" فقط. نبدأ بسؤال أعمق: "ما الذي يعطّل العمل الآن؟"'
                : 'At ENSDIM, we do not begin only by asking: "What do you want to build?" We begin with a deeper question: "What is blocking the business right now?"'}
            </p>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-4">
              {ar
                ? 'هل العملاء يضيعون قبل المتابعة؟ هل الفريق يعمل يدويًا أكثر من اللازم؟ هل البيانات موجودة لكنها لا تساعد على القرار؟ هل النمو أصبح يسبب ضغطًا أكثر من العائد؟'
                : 'Are leads being lost before follow-up? Is the team spending too much time on manual work? Does the business have data that still does not support decisions? Has growth started to create more pressure than return?'}
            </p>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-7">
              {ar
                ? 'بعد فهم هذه النقطة، نحدد التكنولوجيا المناسبة: موقع، تطبيق، نظام متابعة للعملاء، نظام تشغيل داخلي، لوحة بيانات، أتمتة، أو طبقة ذكاء عملية.'
                : 'Once we understand the friction point, we define the right technology: a website, application, customer follow-up system, internal operating system, dashboard, automation, or practical AI layer.'}
            </p>
            <ul className="space-y-2.5">
              {buildPrinciples.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#4F555E]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6D5DF6] mt-1.5 flex-shrink-0" />
                  {ar ? p.ar : p.en}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* Three lenses: Customer / Operations / Data */}
      {lenses.map((lens, idx) => {
        const d = ar ? lens.ar : lens.en;
        const { Icon, accent } = lens;
        return (
          <section key={idx} className={`py-16 ${idx % 2 === 0 ? 'bg-[#FAFAFA]' : 'bg-white'}`}>
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${accent}1A` }}
                  >
                    <Icon size={20} style={{ color: accent }} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>
                    {String(idx + 1).padStart(2, '0')} / 03
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-3 leading-tight">{d.title}</h2>
                <p className="text-sm font-medium text-[#101418] mb-4">{d.lead}</p>
                {d.body.split('\n\n').map((para, i) => (
                  <p key={i} className="text-sm text-[#4F555E] leading-relaxed mb-4">{para}</p>
                ))}
                <div className="border-s-[3px] ps-4 mt-2" style={{ borderColor: accent }}>
                  <p className="text-sm text-[#101418] leading-relaxed font-medium">{d.outcome}</p>
                </div>
              </ScrollReveal>
            </div>
          </section>
        );
      })}

      {/* How We Work */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="mb-10 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-3">{ar ? 'كيف نعمل؟' : 'How We Work'}</h2>
            <p className="text-sm text-[#4F555E]">{ar ? 'من الفهم إلى البناء… ثم التحسين.' : 'From understanding to building, then improvement.'}</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {howWeWork.map((step, i) => (
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

      {/* Why ENSDIM is the right partner */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-xs font-semibold text-[#6D5DF6] uppercase tracking-wider mb-3">
              {ar ? 'ما الذي يجعل إنسديم شريكًا مناسبًا؟' : 'Why ENSDIM Is the Right Partner'}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-5 leading-tight">
              {ar ? 'لأننا لا نبيع تقنية فقط… بل نبني وضوحًا داخل العمل.' : 'We do not only sell technology. We build clarity inside the business.'}
            </h2>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-4">
              {ar
                ? 'إنسديم مناسبة للشركات التي تريد شريكًا يفهم البزنس، العميل، التشغيل، والنمو. شريك يستطيع ترجمة المشكلة إلى نظام، والفكرة إلى منتج، والبيانات إلى قرار، والتجربة الرقمية إلى عائد.'
                : 'ENSDIM is built for companies that need a partner who understands business, customers, operations, and growth. A partner who can translate a problem into a system, an idea into a product, data into decisions, and a digital experience into measurable return.'}
            </p>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-7">
              {ar
                ? 'نحن نعمل مع الشركات التي لا تبحث عن منفذ تقني فقط، بل عن جهة تساعدها على فهم ما يجب بناؤه، ولماذا، وكيف يمكن أن يخدم العمل بعد الإطلاق.'
                : 'We work with companies that are not looking for a technical vendor only, but for a team that helps them understand what should be built, why it should be built, and how it can serve the business after launch.'}
            </p>
            <ul className="space-y-2.5">
              {partnerTraits.map((t, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#4F555E]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6D5DF6] mt-1.5 flex-shrink-0" />
                  {ar ? t.ar : t.en}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* Company Profile download */}
      <section className="py-16 bg-[#0f0d19] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <h2 className="text-xl font-bold mb-2">{ar ? 'بروفايل الشركة' : 'Company Profile'}</h2>
            <p className="text-sm font-medium text-[#EEEAFE]/90 mb-3">
              {ar ? 'تعرّف على إنسديم في ملف واحد مختصر.' : 'Understand ENSDIM in one concise profile.'}
            </p>
            <p className="text-sm text-[#EEEAFE]/75 leading-relaxed mb-6 max-w-xl mx-auto">
              {ar
                ? 'حمّل بروفايل إنسديم للتعرف على رؤيتنا، طريقة عملنا، الخدمات والحلول، ومجموعة من المشاريع التي توضّح كيف نحول مشاكل البزنس إلى حلول رقمية قابلة للقياس.'
                : 'Download the ENSDIM Company Profile to explore our vision, way of work, services, solutions, and selected projects that show how we turn business problems into measurable digital solutions.'}
            </p>
            <a
              href="/downloads/ensdim-company-profile.pdf"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#6D5DF6] text-white rounded-xl hover:bg-[#5d4de6] transition-colors text-sm font-semibold"
            >
              {ar ? 'تحميل بروفايل الشركة' : 'Download Company Profile'} <Download size={14} />
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Continue exploring ENSDIM */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="mb-10 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-3">
              {ar ? 'تعمّق أكثر في إنسديم' : 'Continue Exploring ENSDIM'}
            </h2>
            <p className="text-sm text-[#4F555E]">
              {ar ? 'اختر المسار الأقرب لما تريد معرفته الآن.' : 'Choose the next path based on what you want to understand now.'}
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: '/company', en: { title: 'Company Page', desc: 'A broader overview of ENSDIM as a company: what we do, why we are different, and where to explore next.', cta: 'Back to Company' }, ar: { title: 'صفحة Company', desc: 'نظرة عامة على إنسديم كشركة: ماذا تفعل، لماذا تختلف، وما الصفحات المرتبطة بها.', cta: 'العودة إلى صفحة Company' } },
              { href: '/team', en: { title: 'Our Team', desc: 'Meet the people and expertise behind strategy, experience design, engineering, data, and delivery.', cta: 'Meet the Team' }, ar: { title: 'الفريق', desc: 'تعرّف على الأشخاص والخبرات التي تقف خلف التفكير، التصميم، الهندسة، البيانات، والتنفيذ.', cta: 'تعرّف على الفريق' } },
              { href: '/case-studies', en: { title: 'Case Studies', desc: 'View selected projects that show how we connect the problem, the solution, and the business return.', cta: 'View Our Work' }, ar: { title: 'المشاريع', desc: 'شاهد نماذج من مشاريع توضّح كيف نربط المشكلة بالحل والعائد.', cta: 'شاهد مشاريعنا' } },
              { href: '/contact', en: { title: 'Contact ENSDIM', desc: 'Tell us what is happening inside your business and we will help you identify the right direction.', cta: 'Contact Us' }, ar: { title: 'تواصل معنا', desc: 'شاركنا ما يحدث داخل عملك، وسنساعدك على تحديد المسار الأنسب.', cta: 'تواصل معنا' } },
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

      {/* FAQ */}
      <FAQSection
        title={ar ? 'أسئلة شائعة عن إنسديم' : 'Frequently Asked Questions About ENSDIM'}
        faqs={ar ? [
          { question: 'ماذا تعني إنسديم؟', answer: 'إنسديم مستلهمة من الجذر المصري القديم Sdm، المرتبط بالسماع أو الاستماع، وهو جزء من فلسفة الشركة: أن تبدأ التكنولوجيا من فهم الإنسان والعمل والبيانات قبل بناء الحل.' },
          { question: 'هل إنسديم شركة برمجة؟', answer: 'إنسديم تبني حلولًا تكنولوجية، لكن البرمجة ليست نقطة البداية الوحيدة. نبدأ بفهم المشكلة والتشغيل وسلوك العميل، ثم نحدد التكنولوجيا المناسبة.' },
          { question: 'هل تقدم إنسديم مواقع وتطبيقات فقط؟', answer: 'لا. نبني مواقع، تطبيقات، أنظمة متابعة للعملاء، أنظمة تشغيل داخلية، لوحات بيانات، أتمتة، وطبقات ذكاء عملية حسب احتياج العمل.' },
          { question: 'ما الذي يجعل إنسديم مختلفة؟', answer: 'إنسديم تربط التكنولوجيا بالعائد: تحويل أعلى، متابعة أوضح، تشغيل أسهل، قرارات أسرع، وتجربة أفضل للعميل.' },
          { question: 'كيف أبدأ العمل مع إنسديم؟', answer: 'شاركنا تحدي عملك الحالي، وسنساعدك على تحديد هل تحتاج تحسين تجربة العميل، تنظيم المتابعة، بناء نظام، أتمتة، أو رؤية أوضح للبيانات.' },
        ] : [
          { question: 'What does ENSDIM mean?', answer: 'ENSDIM is inspired by the ancient Egyptian root Sdm, associated with hearing or listening. It reflects the company’s belief that technology should begin by understanding people, work, and data before building the solution.' },
          { question: 'Is ENSDIM a software company?', answer: 'ENSDIM builds technology solutions, but software execution is not the only starting point. We start by understanding the problem, operations, and customer behavior, then define the right technology.' },
          { question: 'Does ENSDIM only build websites and applications?', answer: 'No. We build websites, applications, customer follow-up systems, internal operating systems, dashboards, automation, and practical AI layers depending on the business need.' },
          { question: 'What makes ENSDIM different?', answer: 'ENSDIM connects technology to business return: higher conversion, clearer follow-up, easier operations, faster decisions, and a better customer experience.' },
          { question: 'How do I start working with ENSDIM?', answer: 'Share your current business challenge with us, and we will help define whether you need customer experience improvement, follow-up organization, system building, automation, or clearer data visibility.' },
        ]}
      />

      {/* Final CTA */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-[#EEEAFE] border border-[#DDD8FB] rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl font-bold text-[#101418] mb-3">
            {ar ? 'شاركنا ما يحدث داخل عملك… وسنساعدك على بناء التكنولوجيا المناسبة.' : 'Tell us what is happening inside your business, and we will help you build the right technology.'}
          </h2>
          <p className="text-sm text-[#4F555E] mb-6 max-w-xl mx-auto">
            {ar
              ? 'سواء كانت المشكلة في جذب العملاء، المتابعة، التشغيل، البيانات، أو النمو، نبدأ بفهم التحدي ثم نحدد المسار الأنسب للحل.'
              : 'Whether the challenge is customer acquisition, follow-up, operations, data, or growth, we begin by understanding the situation and defining the closest path forward.'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] active:scale-[0.98] transition-all duration-200 text-sm font-semibold">
              {ar ? 'شارك تحدي عملك' : 'Share Your Business Challenge'} <ArrowRight size={15} />
            </Link>
            <Link to="/case-studies" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[#6D5DF6]/30 text-[#3B2A78] hover:border-[#6D5DF6] hover:bg-white active:scale-[0.98] transition-all duration-200 text-sm font-semibold">
              {ar ? 'شاهد مشاريعنا' : 'View Our Work'}
            </Link>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
