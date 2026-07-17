import { useRef } from 'react';
import { Link } from 'react-router';
import { ArrowRight, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from '../components/ScrollReveal';
import { StackCard } from '../components/StackCard';
import { SEO } from '../components/SEO';
import { FAQSection } from '../components/FAQSection';
import { IconDiagnose, IconMap, IconDesign, IconBuild, IconImprove } from '../components/EnsdimIcons';

const aboutWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': 'https://ensdim.com/about#webpage',
  name: 'About Ensdim',
  description: 'We build intelligent digital systems that help businesses grow, streamline operations, and make better decisions.',
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

const coreElements = [
  { en: 'Customers', ar: 'العميل' },
  { en: 'Operations', ar: 'التشغيل' },
  { en: 'Data', ar: 'البيانات' },
  { en: 'Technology', ar: 'التكنولوجيا' },
];

const whatWeBuildBullets = [
  { en: 'Attract customers and improve conversion.', ar: 'جذب العملاء وتحسين التحويل.' },
  { en: 'Organize follow-up and manage relationships.', ar: 'تنظيم المتابعة وإدارة العلاقات.' },
  { en: 'Automate everyday tasks and reduce manual work.', ar: 'أتمتة المهام اليومية وتقليل العمل اليدوي.' },
  { en: 'Build clearer operating systems.', ar: 'بناء أنظمة تشغيل أكثر وضوحًا.' },
  { en: 'Turn data into indicators that support decisions.', ar: 'تحويل البيانات إلى مؤشرات تساعد على اتخاذ القرار.' },
  { en: 'Add artificial intelligence where it creates real value.', ar: 'إضافة الذكاء الاصطناعي عندما يحقق قيمة حقيقية.' },
];

const serviceCards = [
  { slug: 'ux-conversion-development', en: { title: 'UX & Conversion Development', desc: 'We study how customers understand your offer and rebuild the experience to turn interest into a clear request.' }, ar: { title: 'تطوير تجربة المستخدم والتحويل', desc: 'نحلل كيف يرى العميل خدمتك، ونعيد بناء التجربة لتحويل الاهتمام إلى طلب واضح.' } },
  { slug: 'web-design-digital-experience', en: { title: 'Web Design & Development', desc: 'Websites and landing pages that help visitors understand the offer, trust the business, and submit trackable requests.' }, ar: { title: 'تصميم وتطوير المواقع', desc: 'مواقع وصفحات هبوط تساعد الزائر على فهم العرض والثقة فيك وترك طلب واضح يمكن متابعته.' } },
  { slug: 'mobile-web-applications', en: { title: 'Mobile Applications', desc: 'Mobile apps that help customers or teams complete key tasks, from booking to field operations and ongoing access.' }, ar: { title: 'تطبيقات الموبايل', desc: 'تطبيقات موبايل تساعد العملاء أو الفريق على تنفيذ المهام من الحجز والطلب إلى المتابعة والتشغيل الميداني.' } },
  { slug: 'crm-internal-systems', en: { title: 'CRM & Follow-up Systems', desc: 'Custom CRM systems that organize customers, opportunities, and follow-ups so no lead gets lost.' }, ar: { title: 'أنظمة CRM والمتابعة', desc: 'أنظمة CRM مخصصة تنظّم العملاء والفرص والمتابعات حتى لا تضيع فرصة بين الرسائل والمكالمات.' } },
  { slug: 'internal-systems-operations', en: { title: 'Internal Systems & Operations', desc: 'Internal systems that organize requests, tasks, approvals, inventory, and any repeated workflow.' }, ar: { title: 'الأنظمة الداخلية وإدارة التشغيل', desc: 'أنظمة داخلية تنظّم الطلبات والمهام والموافقات والمخزون وأي تدفق عمل متكرر.' } },
  { slug: 'data-dashboards', en: { title: 'Data & Dashboards', desc: 'Dashboards that turn scattered data into indicators management can act on at the right time.' }, ar: { title: 'البيانات ولوحات المتابعة', desc: 'لوحات متابعة تحوّل البيانات المتفرقة إلى مؤشرات تساعد الإدارة على التحرك في الوقت المناسب.' } },
  { slug: 'ai-chatbots-automation', en: { title: 'AI Chatbots & Automation', desc: 'Chatbots and automation flows that support response, classification, reminders, and follow-up.' }, ar: { title: 'روبوتات الدردشة والأتمتة', desc: 'روبوتات دردشة وتدفقات أتمتة تساعد على الرد، التصنيف، التذكيرات، والمتابعة.' } },
  { slug: 'growth-marketing-systems', en: { title: 'Marketing & Growth Strategy', desc: 'Clearer marketing direction through research, messaging, content, and campaigns connected to tracking.' }, ar: { title: 'استراتيجيات التسويق والنمو', desc: 'اتجاه تسويقي أوضح من خلال الأبحاث والرسائل والمحتوى والحملات المرتبطة بالتتبع.' } },
];

const howWeBuildSteps = [
  { Icon: IconDiagnose, en: { title: 'We understand', desc: 'We study how the business works, the customer journey, and everyday challenges.' }, ar: { title: 'نفهم', desc: 'ندرس طريقة العمل، رحلة العميل، والتحديات اليومية.' } },
  { Icon: IconMap, en: { title: 'We prioritize', desc: 'We identify the point of impact that creates the greatest value.' }, ar: { title: 'نحدد الأولويات', desc: 'نحدد نقطة الأثر التي تحقق أكبر قيمة.' } },
  { Icon: IconDesign, en: { title: 'We design', desc: 'We build the user experience, workflow, and data.' }, ar: { title: 'نصمم', desc: 'نبني تجربة المستخدم، وتدفق العمل، والبيانات.' } },
  { Icon: IconBuild, en: { title: 'We build', desc: 'We develop the solution in stages that deliver immediate value.' }, ar: { title: 'ننفذ', desc: 'نطور الحل على مراحل تحقق قيمة مباشرة.' } },
  { Icon: IconImprove, en: { title: 'We improve', desc: 'We measure results and continue improving.' }, ar: { title: 'نطور', desc: 'نقيس النتائج ونستمر في التحسين.' } },
];

const team = [
  { name: 'Shenouda Z Zaki', en: 'CEO', ar: 'الرئيس التنفيذي', image: '/team/shenouda-zaki.jpg' },
  { name: 'Ahmed Elsayed', en: 'Project Manager', ar: 'مدير مشروع', image: '/team/ahmed-elsayed.jpg' },
  { name: 'Ahmed Omran', en: 'Business Developer', ar: 'مطور أعمال', image: '/team/ahmed-omran.jpg' },
  { name: 'Radwa Mustafa', en: 'Marketing', ar: 'تسويق', image: '/team/radwa-mustafa.jpg' },
  { name: 'Fouad Mamdouh', en: 'Data Engineer', ar: 'مهندس بيانات', image: '/team/fouad-mamdouh.jpg' },
  { name: 'Eng. Mina Magdy', en: 'Cyber Security', ar: 'أمن سيبراني', image: '/team/mina-magdy.jpg' },
  { name: 'Mahmoud Khater', en: 'AI Engineer', ar: 'مهندس ذكاء اصطناعي', image: '/team/mahmoud-khater.jpg' },
  { name: 'Beshoy Ashref', en: 'AI Automation Specialist', ar: 'متخصص أتمتة بالذكاء الاصطناعي', image: '/team/beshoy-ashref.jpg' },
  { name: 'Abdullah Badawy', en: 'Backend', ar: 'باك إند', image: '/team/abdullah-badawy.jpg' },
  { name: 'Aya Nour', en: 'Frontend', ar: 'فرونت إند', image: '/team/aya-nour.png' },
  { name: 'Maya Al-Hussein', en: 'Flutter', ar: 'Flutter', image: '/team/maya-alhussein.jpg' },
  { name: 'Ziad Salah', en: 'Flutter', ar: 'Flutter', image: '/team/ziad-salah.jpg' },
  { name: 'Shaimaa Elsayed', en: 'UI/UX', ar: 'UI/UX', image: '/team/shaimaa-elsayed.jpg' },
  { name: 'Ahmed Ragab', en: 'UI/UX', ar: 'UI/UX', image: '/team/ahmed-ragab.jpg' },
];

export function AboutPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  const teamScrollRef = useRef<HTMLDivElement>(null);
  const servicesScrollRef = useRef<HTMLDivElement>(null);

  const scrollTeam = (direction: 1 | -1) => {
    const el = teamScrollRef.current;
    if (!el) return;
    const rtlFlip = ar ? -1 : 1;
    el.scrollBy({ left: el.clientWidth * 0.8 * direction * rtlFlip, behavior: 'smooth' });
  };

  const scrollServices = (direction: 1 | -1) => {
    const el = servicesScrollRef.current;
    if (!el) return;
    const rtlFlip = ar ? -1 : 1;
    el.scrollBy({ left: el.clientWidth * 0.8 * direction * rtlFlip, behavior: 'smooth' });
  };

  return (
    <>
      <SEO
        title={ar ? 'عن إنسديم | فلسفتنا، رؤيتنا، وطريقة تفكيرنا' : 'About Ensdim | Our Philosophy, Vision, and Way of Thinking'}
        description={ar
          ? 'نبني أنظمة رقمية ذكية تساعد الأعمال على النمو، تنظيم التشغيل، واتخاذ قرارات أفضل.'
          : 'We build intelligent digital systems that help businesses grow, streamline operations, and make better decisions.'}
        canonical="/about"
        lang={ar ? 'ar' : 'en'}
        jsonLd={aboutWebPageSchema}
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
            <Link to="/company" className="hover:text-white/80 transition-colors">{ar ? 'الشركة' : 'Company'}</Link>
            <span className="opacity-40">/</span>
            <span className="text-white/70 font-medium">{ar ? 'عن إنسديم' : 'About Ensdim'}</span>
          </div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5 uppercase tracking-wider bg-[#6D5DF6]/15 border border-[#6D5DF6]/20 text-[#EEEAFE]/80">
            {ar ? 'عن إنسديم' : 'About Ensdim'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight text-white">
            {ar
              ? 'نبني أنظمة رقمية ذكية تساعد الأعمال على النمو، تنظيم التشغيل، واتخاذ قرارات أفضل.'
              : 'We build intelligent digital systems that help businesses grow, streamline operations, and make better decisions.'}
          </h1>
          <p className="text-base sm:text-lg max-w-2xl leading-relaxed mb-1.5 text-[#EEEAFE]/75">
            {ar
              ? 'في إنسديم، لا نبدأ بالكود أو قائمة الخدمات، بل نبدأ بفهم النشاط نفسه، كيف يعمل الفريق، كيف يتحرك العميل، وأين تتعطل العمليات اليومية.'
              : 'At Ensdim, we do not begin with code or a list of services. We begin by understanding the business itself: how the team works, how customers move through their journey, and where day-to-day operations break down.'}
          </p>
          <p className="text-base sm:text-lg max-w-2xl leading-relaxed mb-3 text-[#EEEAFE]/75">
            {ar
              ? 'ومن هذا الفهم نبني مواقع، تطبيقات، أنظمة تشغيل، ولوحات بيانات، وحلولًا تعتمد على الذكاء الاصطناعي تساعد الشركات على العمل بكفاءة أعلى ونمو أكثر وضوحًا.'
              : 'From that understanding, we design and build websites, applications, operating systems, dashboards, and AI-powered solutions that help businesses work more efficiently and grow with greater clarity.'}
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
              to="#how-we-work"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
            >
              {ar ? 'اكتشف كيف نعمل' : 'Discover How We Work'} <ArrowRight size={15} />
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

      {/* Who We Are */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-base sm:text-lg font-bold text-[#3B2A78] uppercase tracking-wider mb-3">{ar ? 'من نحن؟' : 'Who We Are'}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-5 leading-tight">
              {ar ? 'نفهم الأعمال قبل أن نبني التكنولوجيا.' : 'We understand the business before we build the technology.'}
            </h2>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-4">
              {ar
                ? 'إنسديم ليست شركة برمجيات تقليدية. نحن شريك تقني يساعد الشركات على تحويل التحديات اليومية إلى أنظمة رقمية أكثر تنظيمًا وقابلية للتوسع.'
                : 'Ensdim is not a conventional software company. We are a technology partner that helps businesses turn day-to-day challenges into more organized, scalable digital systems.'}
            </p>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-6">
              {ar
                ? 'نعمل من خلال فريق يجمع بين فهم الأعمال، وتجربة المستخدم، والهندسة، والبيانات، والأمن السيبراني، والذكاء الاصطناعي، حتى نفهم المشكلة من أكثر من زاوية، ثم نبني الحل المناسب لها.'
                : 'Our team brings together business insight, user experience, engineering, data, cybersecurity, and artificial intelligence. This allows us to examine each problem from multiple angles before building the solution that fits it best.'}
            </p>
            <p className="text-xs font-semibold text-[#101418] uppercase tracking-wider mb-3">
              {ar ? 'نربط بين أربعة عناصر رئيسية' : 'We connect four core elements'}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {coreElements.map((item, i) => (
                <span key={i} className="text-xs px-3 py-1.5 bg-[#EEEAFE] text-[#6D5DF6] rounded-full font-medium">
                  {ar ? item.ar : item.en}
                </span>
              ))}
            </div>
            <p className="text-sm text-[#4F555E] leading-relaxed">
              {ar
                ? 'حتى تصبح التكنولوجيا جزءًا من طريقة العمل، لا مجرد برنامج جديد.'
                : 'So technology becomes part of how the business operates, not simply another piece of software.'}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* What We Build */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="max-w-3xl mb-10">
            <p className="text-base sm:text-lg font-bold text-[#3B2A78] uppercase tracking-wider mb-3">{ar ? 'ماذا نبني؟' : 'What We Build'}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-5 leading-tight">
              {ar ? 'حلول تخدم الأعمال، لا مجرد أدوات تقنية.' : 'Solutions that serve the business, not technology for its own sake.'}
            </h2>
            <p className="text-sm font-semibold text-[#101418] mb-3">{ar ? 'نساعد الشركات على' : 'We help businesses:'}</p>
            <ul className="space-y-2.5">
              {whatWeBuildBullets.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#4F555E]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6D5DF6] mt-1.5 flex-shrink-0" />
                  {ar ? item.ar : item.en}
                </li>
              ))}
            </ul>
          </ScrollReveal>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollServices(-1)}
              aria-label={ar ? 'السابق' : 'Previous'}
              className="hidden sm:flex flex-shrink-0 w-9 h-9 rounded-full bg-white border border-[#E5E5E5] shadow-sm items-center justify-center text-[#101418] hover:border-[#6D5DF6] hover:text-[#6D5DF6] transition-colors duration-200"
            >
              <ChevronLeft size={18} />
            </button>

            <div
              ref={servicesScrollRef}
              className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {serviceCards.map((s, i) => {
                const d = ar ? s.ar : s.en;
                return (
                  <ScrollReveal key={s.slug} delay={Math.min(i * 0.05, 0.3)} className="snap-start flex-shrink-0 w-64">
                    <Link
                      to={`/services/${s.slug}`}
                      className="group flex flex-col h-full p-5 bg-white border border-[#E5E5E5] rounded-2xl hover:border-[#6D5DF6] hover:shadow-md active:scale-[0.98] active:border-[#6D5DF6] transition-all duration-200"
                    >
                      <h3 className="text-sm font-bold text-[#101418] mb-2">{d.title}</h3>
                      <p className="text-xs text-[#4F555E] leading-relaxed flex-1">{d.desc}</p>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => scrollServices(1)}
              aria-label={ar ? 'التالي' : 'Next'}
              className="hidden sm:flex flex-shrink-0 w-9 h-9 rounded-full bg-white border border-[#E5E5E5] shadow-sm items-center justify-center text-[#101418] hover:border-[#6D5DF6] hover:text-[#6D5DF6] transition-colors duration-200"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Why Ensdim Is Different */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-base sm:text-lg font-bold text-[#3B2A78] uppercase tracking-wider mb-3">{ar ? 'لماذا تختلف إنسديم؟' : 'Why Ensdim Is Different'}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-5 leading-tight">
              {ar ? 'لا نبدأ بالسؤال: ماذا تريد أن نبني؟' : 'We do not begin by asking, "What do you want us to build?"'}
            </h2>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-4">
              {ar
                ? 'معظم شركات التقنية تبدأ بالسؤال: ما الذي تريد بناءه؟ أما نحن فنبدأ بسؤال مختلف: ما الذي يعطل العمل اليوم؟'
                : 'Most technology companies start with the question: "What do you want to build?" We begin with a different question: "What is holding the business back today?"'}
            </p>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-4">
              {ar
                ? 'بعد فهم المشكلة، نحدد التكنولوجيا المناسبة، سواء كانت موقعًا، تطبيقًا، نظام تشغيل، لوحة بيانات، أو طبقة ذكاء اصطناعي.'
                : 'Once we understand the problem, we identify the right technology, whether that is a website, an application, an operating system, a dashboard, or an AI layer.'}
            </p>
            <p className="text-sm text-[#4F555E] leading-relaxed font-medium">
              {ar
                ? 'لأننا لا نبيع أدوات تقنية، بل نبني حلولًا تحقق أثرًا حقيقيًا داخل العمل.'
                : 'Because we do not sell technology tools. We build solutions that create meaningful impact inside the business.'}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* How We Build Solutions */}
      <section id="how-we-work" className="py-16 bg-[#FAFAFA] scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="mb-10 max-w-3xl">
            <p className="text-base sm:text-lg font-bold text-[#3B2A78] uppercase tracking-wider mb-3">{ar ? 'كيف نبني الحلول؟' : 'How We Build Solutions'}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418]">{ar ? 'من الفهم إلى الأثر.' : 'From understanding to impact.'}</h2>
          </ScrollReveal>
          {/* Tablet / desktop grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {howWeBuildSteps.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="p-5 bg-white border border-[#E5E5E5] rounded-2xl h-full">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#EEEAFE] text-[#6D5DF6] text-xs font-bold mb-3">{i + 1}</span>
                  <h3 className="text-sm font-bold text-[#101418] mb-2">{ar ? step.ar.title : step.en.title}</h3>
                  <p className="text-xs text-[#4F555E] leading-relaxed">{ar ? step.ar.desc : step.en.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Mobile: cards stack on top of each other while scrolling */}
          <div className="sm:hidden">
            {howWeBuildSteps.map((step, i) => (
              <StackCard
                key={i}
                index={i}
                total={howWeBuildSteps.length}
                Icon={step.Icon}
                title={ar ? step.ar.title : step.en.title}
                description={ar ? step.ar.desc : step.en.desc}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How We See Business */}
      <section className="py-16 bg-logo-black text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-base sm:text-lg font-bold text-[#B8A6FF] uppercase tracking-wider mb-3">{ar ? 'كيف نرى الأعمال؟' : 'How We See Business'}</p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 leading-tight">
              {ar
                ? 'الأعمال الناجحة لا تُبنى على التكنولوجيا وحدها، بل على فهم الإنسان الذي يستخدمها.'
                : 'Successful businesses are not built on technology alone. They are built on understanding the people who use it.'}
            </h2>

            <h3 className="text-lg font-bold mb-3">{ar ? 'العلاقات' : 'Relationships'}</h3>
            <p className="text-sm text-[#EEEAFE]/75 leading-relaxed mb-6">
              {ar
                ? 'نؤمن في إنسديم أن البزنس في جوهره علاقات: علاقة بين الشركة وعملائها، بين الإدارة والفريق، وبين الإنسان والنظام الذي يستخدمه كل يوم. عندما تصبح هذه العلاقات أوضح، يصبح العمل أكثر استقرارًا وقدرة على النمو.'
                : 'At Ensdim, we believe business is fundamentally about relationships: between a company and its customers, between management and the team, and between people and the systems they use every day. When those relationships become clearer, the business becomes more stable and better positioned to grow.'}
            </p>

            <h3 className="text-lg font-bold mb-3">{ar ? 'التكنولوجيا' : 'Technology'}</h3>
            <p className="text-sm text-[#EEEAFE]/75 leading-relaxed mb-6">
              {ar
                ? 'لا نرى التكنولوجيا كبديل للإنسان، بل كأداة يجب أن تُبنى حوله؛ تفهم سلوكه، تقلل الجهد اليومي، تنظم العمل، وتساعد كل فرد على أداء أفضل، دون أن تضيف تعقيدًا جديدًا إلى طريقة العمل.'
                : 'We do not see technology as a replacement for people. It should be built around them, understanding behavior, reducing daily effort, organizing work, and helping every person perform better without adding unnecessary complexity.'}
            </p>

            <h3 className="text-lg font-bold mb-3">{ar ? 'مهمتنا' : 'Our Mission'}</h3>
            <p className="text-sm text-[#EEEAFE]/75 leading-relaxed mb-4">
              {ar
                ? 'مهمتنا هي أن نبني حلولًا رقمية تجعل العلاقة بين الإنسان والتكنولوجيا أكثر بساطة ووضوحًا؛ حلول تساعد العميل على اتخاذ خطوة بثقة، وتساعد الفريق على العمل بضغط أقل، وتساعد الإدارة على رؤية أوضح وقرارات أفضل.'
                : 'Our mission is to build digital solutions that make the relationship between people and technology simpler and clearer: solutions that help customers take the next step with confidence, enable teams to work under less pressure, and give management greater visibility and better decision-making.'}
            </p>
            <p className="text-sm text-[#EEEAFE]/75 leading-relaxed mb-4">
              {ar
                ? 'يتماشى هذا التفكير مع الاتجاه العالمي نحو التكنولوجيا المتمحورة حول الإنسان، كما توضّح المفوضية الأوروبية في مفهوم Industry 5.0، الذي يضع الإنسان والاستدامة والمرونة في قلب التطور الصناعي.'
                : 'This perspective aligns with the global shift toward human-centered technology, as reflected in the European Commission’s Industry 5.0 framework, which places people, sustainability, and resilience at the heart of industrial development.'}
            </p>
            <p className="text-sm text-[#EEEAFE]/90 leading-relaxed font-medium">
              {ar
                ? 'في إنسديم، نترجم هذا المبدأ داخل البزنس: تكنولوجيا تفهم الناس، تسهّل التشغيل، وتحسّن العائد.'
                : 'At Ensdim, we translate that principle into business practice: technology that understands people, simplifies operations, and improves return.'}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Why We Believe in What We Build */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-base sm:text-lg font-bold text-[#3B2A78] uppercase tracking-wider mb-3">
              {ar ? 'لماذا نؤمن بما نبنيه؟' : 'Why We Believe in What We Build'}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-5 leading-tight">
              {ar ? 'لأن أغلب مشاكل الأعمال ليست تقنية فقط، بل سلوكية وتشغيلية أيضًا.' : 'Most business challenges are not purely technical. They are behavioral and operational as well.'}
            </h2>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-4">
              {ar
                ? 'قد تبدو المشكلة في ظاهرها موقعًا ضعيفًا، أو متابعة غير منظمة، أو بيانات متفرقة، أو فريقًا مضغوطًا. لكن خلف ذلك غالبًا توجد مشكلة أعمق؛ عميل لا يفهم العرض بسرعة، فريق لا يرى الخطوة التالية، إدارة لا تمتلك مؤشرات واضحة، أو نظام لا يتناسب مع طريقة العمل اليومية.'
                : 'A problem may appear to be a weak website, inconsistent follow-up, fragmented data, or an overwhelmed team. But beneath it is often a deeper issue: customers who do not understand the offer quickly, teams that cannot see the next step, management without clear indicators, or systems that do not fit the way the business actually operates.'}
            </p>
            <p className="text-sm text-[#4F555E] leading-relaxed">
              {ar
                ? 'هنا يظهر دور إنسديم. نحن لا نفصل بين تجربة العميل، وتشغيل الشركة، والبيانات، بل نراها منظومة واحدة. إذا تحسنت تجربة العميل أصبحت المتابعة أوضح، وإذا تحسنت المتابعة أصبح التشغيل أكثر تنظيمًا، وإذا أصبحت البيانات أوضح، أصبح القرار أسرع.'
                : 'This is where Ensdim creates value. We do not separate customer experience, operations, and data. We see them as one connected system. When customer experience improves, follow-up becomes clearer. When follow-up improves, operations become more organized. And when data becomes clearer, decisions become faster.'}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* The Meaning Behind Ensdim */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-base sm:text-lg font-bold text-[#3B2A78] uppercase tracking-wider mb-3">{ar ? 'معنى إنسديم' : 'The Meaning of Ensdim'}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-5 leading-tight">
              {ar ? 'اسمنا يبدأ من الاستماع، وطريقتنا تبدأ من الفهم.' : 'Our name begins with listening. Our approach begins with understanding.'}
            </h2>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-4">
              {ar
                ? 'اسم إنسديم مستوحى من الجذر المصري القديم Sdm، المرتبط بمعنى السماع أو الإنصات، ويحمل روحًا قريبة من إحدى أقدم الوصايا المصرية المرتبطة بالحكمة، كما يظهر في بردية بولاق 4 المرتبطة بالكاتب المصري القديم آني، والتي ذُكر فيها معنى عميق وهو الإنصات إلى الآخرين.'
                : 'The name Ensdim is inspired by the ancient Egyptian root Sdm, associated with hearing and listening. It carries the spirit of one of the earliest Egyptian teachings on wisdom, reflected in Papyrus Boulaq 4 and associated with the ancient Egyptian scribe Ani, which conveys a powerful idea: listen to others.'}
            </p>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-4">
              {ar
                ? 'بالنسبة لنا، لم يكن الاسم اختيارًا لغويًا فقط، بل فلسفة عمل. نؤمن أن التكنولوجيا الجيدة لا تبدأ بالكود، بل بالاستماع:'
                : 'For us, the name is more than a linguistic reference. It represents a way of working. We believe good technology does not begin with code. It begins with listening:'}
            </p>
            <ul className="space-y-2 mb-4">
              {(ar
                ? ['للعميل.', 'لسلوك المستخدم.', 'لطريقة عمل الفريق.', 'وللبيانات التي تكشف ما يحدث داخل النشاط.']
                : ['To the customer.', 'To user behavior.', 'To how the team works.', 'To the data that reveals what is happening inside the business.']
              ).map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#4F555E]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6D5DF6] mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm text-[#4F555E] leading-relaxed">
              {ar
                ? 'لهذا نهتم ببناء تقنيات تعتمد على فهم السلوك قبل بناء الحل، لأن فهم طريقة تفكير الإنسان هو ما يجعل التكنولوجيا أكثر فاعلية، وأكثر ارتباطًا بالنتائج.'
                : 'That is why we build technology around behavioral understanding. Understanding how people think is what makes technology more effective and more closely connected to real outcomes.'}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* The Ensdim Story */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-base sm:text-lg font-bold text-[#3B2A78] uppercase tracking-wider mb-3">{ar ? 'قصة إنسديم' : 'The Ensdim Story'}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-5 leading-tight">
              {ar ? 'بدأت إنسديم من فكرة بسيطة: التكنولوجيا يجب أن تستمع.' : 'Ensdim began with a simple idea. Technology should listen.'}
            </h2>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-4">
              {ar
                ? 'لم تُبن إنسديم كشركة برمجيات تقليدية، بل كطريقة مختلفة لفهم العلاقة بين الأعمال والتكنولوجيا.'
                : 'Ensdim was not built as a conventional software company, but as a different way of understanding the relationship between business and technology.'}
            </p>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-4">
              {ar
                ? 'رأينا أن كثيرًا من الحلول الرقمية لا تفشل لأنها ضعيفة تقنيًا، بل لأنها لا تستمع بما يكفي؛ لا تستمع للعميل، ولا لطريقة عمل الفريق، ولا للبيانات التي تكشف أين يتعطل النمو.'
                : 'We saw that many digital solutions fail not because the technology is weak, but because they do not listen closely enough, to customers, to the way teams work, or to the data that reveals where growth is being blocked.'}
            </p>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-4">
              {ar
                ? 'لهذا لا نرى التكنولوجيا كشيء يجب أن يُبنى أولًا، بل نرى أن الفهم يسبق التنفيذ.'
                : 'That is why we do not believe technology should be built first. Understanding must come before execution.'}
            </p>
            <p className="text-sm text-[#4F555E] leading-relaxed">
              {ar
                ? 'ومن هنا جاءت إنسديم؛ شركة تستمع أولًا، ثم تفهم، ثم تبني حلولًا أكثر وضوحًا، وأسهل استخدامًا، وأكثر ارتباطًا بالإنسان، والتشغيل، والعائد.'
                : 'This is how Ensdim began: a company that listens first, understands next, and then builds solutions that are clearer, easier to use, and more closely connected to people, operations, and business return.'}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-16 bg-[#FAFAFA] scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="max-w-3xl mb-10">
            <p className="text-base sm:text-lg font-bold text-[#3B2A78] uppercase tracking-wider mb-3">{ar ? 'فريق إنسديم' : 'Ensdim Team'}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-5 leading-tight">
              {ar ? 'هيكل منظم وخبرات تعمل ضمن مسار واحد.' : 'A structured team of specialists working through one coordinated process.'}
            </h2>
            <p className="text-sm text-[#4F555E] leading-relaxed">
              {ar
                ? 'يعتمد عمل إنسديم على هيكل منظم يربط بين إدارة الأعمال والمشروعات، وتجربة المستخدم، والتصميم والتطوير، والبيانات والذكاء الاصطناعي، والأمن والجودة. وتُحدد تركيبة الفريق لكل مشروع وفقًا لطبيعته وأهدافه، مع الاستعانة بمستشارين ومتخصصين عند الحاجة؛ حتى تكون المسؤوليات واضحة، وتعمل جميع الخبرات ضمن مسار واحد يبدأ بالفهم وينتهي بالتنفيذ والتحسين.'
                : 'ENSDIM operates through a clear structure that connects business and project management, user experience, design and development, data and artificial intelligence, cybersecurity, and quality. The team setup for each project is defined according to its nature and goals, with specialist advisors and experts brought in when needed. This keeps responsibilities clear and ensures every discipline moves through one connected process, from understanding to delivery and continuous improvement.'}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.05} className="mb-6">
            <h3 className="text-lg font-bold text-[#101418] mb-2">{ar ? 'جزء من فريق إنسديم' : 'Part of the Ensdim Team'}</h3>
            <p className="text-sm text-[#4F555E] leading-relaxed max-w-2xl">
              {ar
                ? 'يعرض هذا الجزء عددًا من أعضاء فريق إنسديم الحالي، بينما تضم منظومة العمل خبرات وأدوارًا أخرى تشارك بحسب احتياج كل مشروع ومرحلته.'
                : 'This section introduces selected members of the current Ensdim team. Our broader delivery structure includes additional specialists and roles that participate according to each project’s needs and stage.'}
            </p>
          </ScrollReveal>

          <div className="flex items-center gap-3 mb-6">
            <button
              type="button"
              onClick={() => scrollTeam(-1)}
              aria-label={ar ? 'السابق' : 'Previous'}
              className="hidden sm:flex flex-shrink-0 w-9 h-9 rounded-full bg-white border border-[#E5E5E5] shadow-sm items-center justify-center text-[#101418] hover:border-[#6D5DF6] hover:text-[#6D5DF6] transition-colors duration-200"
            >
              <ChevronLeft size={18} />
            </button>

            <div
              ref={teamScrollRef}
              className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {team.map((member, i) => (
                <ScrollReveal key={member.name} delay={Math.min(i * 0.03, 0.3)} className="snap-start flex-shrink-0 w-32">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#E5E5E5] hover:border-[#6D5DF6] hover:shadow-md transition-all duration-200">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 p-2.5 text-center">
                      <p className="text-[11px] font-semibold text-white leading-tight truncate">{member.name}</p>
                      <p className="text-[10px] text-white/80 leading-tight truncate">{ar ? member.ar : member.en}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollTeam(1)}
              aria-label={ar ? 'التالي' : 'Next'}
              className="hidden sm:flex flex-shrink-0 w-9 h-9 rounded-full bg-white border border-[#E5E5E5] shadow-sm items-center justify-center text-[#101418] hover:border-[#6D5DF6] hover:text-[#6D5DF6] transition-colors duration-200"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#3B2A78] text-white rounded-xl hover:bg-[#4a3690] transition-colors text-sm font-semibold">
            {ar ? 'تواصل مع فريق إنسديم' : 'Contact the Ensdim Team'} <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Company Profile download */}
      <section className="py-16 bg-logo-black text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <h2 className="text-xl font-bold mb-2">{ar ? 'بروفايل الشركة' : 'Company Profile'}</h2>
            <p className="text-sm font-medium text-[#EEEAFE]/90 mb-3">
              {ar ? 'تعرّف على إنسديم في ملف واحد.' : 'Understand Ensdim in one place.'}
            </p>
            <p className="text-sm text-[#EEEAFE]/75 leading-relaxed mb-6 max-w-xl mx-auto">
              {ar
                ? 'حمّل بروفايل إنسديم للتعرف على منهجنا، وخدماتنا، وحلولنا، وطريقة عملنا، ومجموعة من المشاريع التي توضح كيف نحول مشاكل الأعمال إلى حلول رقمية قابلة للقياس.'
                : 'Download the Ensdim Company Profile to explore our approach, services, solutions, way of working, and selected projects that show how we turn business challenges into measurable digital solutions.'}
            </p>
            <a
              href="/downloads/ensdim-company-profile.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#3B2A78] text-white rounded-xl hover:bg-[#4a3690] transition-colors text-sm font-semibold"
            >
              {ar ? 'تحميل بروفايل الشركة' : 'Download Company Profile'} <Download size={14} />
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        title={ar ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
        faqs={ar ? [
          { question: 'ما الذي تفعله إنسديم بالضبط؟', answer: 'تساعد إنسديم الشركات على فهم التحديات المرتبطة بالعملاء، والمتابعة، والتشغيل، والبيانات، ثم اختيار أو بناء الحل الرقمي الأنسب لها. وقد يكون الحل موقعًا، تطبيقًا، نظام إدارة ومتابعة، لوحة بيانات، أتمتة، منتجًا قابلًا للتخصيص، أو مزيجًا من أكثر من عنصر.' },
          { question: 'كيف أعرف أن إنسديم مناسبة لشركتي؟', answer: 'تكون إنسديم مناسبة عندما تواجه شركتك تحديًا واضحًا، مثل فقد العملاء، ضعف المتابعة، كثرة العمل اليدوي، تشتت البيانات، ضغط الفريق، أو الحاجة إلى نظام يساعدها على النمو والتوسع. لا يشترط أن تكون المشكلة تقنية؛ فنحن نبدأ بفهم ما يحدث داخل العمل، ثم نحدد كيف يمكن للتكنولوجيا أن تساعد.' },
          { question: 'هل يجب أن أعرف النظام الذي أحتاجه قبل التواصل معكم؟', answer: 'لا. لا تحتاج إلى تحديد نوع النظام أو إعداد متطلبات تقنية كاملة قبل التواصل. يكفي أن تشرح لنا التحدي الحالي، وما الذي يسبب الضغط أو يعطل العمل، وسنساعدك على تحليل المشكلة وتحديد المسار الأقرب للحل.' },
          { question: 'هل تبنون حلولًا مخصصة أم تقدمون منتجات قابلة للتخصيص؟', answer: 'نقدم الطريقتين. قد يحتاج المشروع إلى نظام مخصص بالكامل، أو منتج جاهز قابل للتخصيص، أو مزيج يجمع بين الاثنين. نحدد الاختيار الأنسب وفقًا لطبيعة العمل، والأهداف، والوقت، والميزانية، ومدى الحاجة إلى التوسع مستقبلًا.' },
          { question: 'ماذا يحدث بعد التواصل مع إنسديم؟', answer: 'نبدأ بجلسة استكشاف لفهم التحدي الحالي، وطريقة العمل، والأهداف التي تريد الشركة تحقيقها. بعد ذلك نراجع الاحتياج، ونحدد المسار المناسب، ثم نقدم تصورًا أوليًا للحل، ونطاق العمل، ومراحل التنفيذ، والخطوات التالية.' },
        ] : [
          { question: 'What exactly does Ensdim do?', answer: 'Ensdim helps businesses understand challenges across customer experience, follow-up, operations, and data, then select or build the most appropriate digital solution. That solution may be a website, an application, a customer management and follow-up system, a dashboard, automation, a configurable product, or a combination of several components.' },
          { question: 'How do I know whether Ensdim is right for my business?', answer: 'Ensdim is a strong fit when your business faces a clear challenge such as lost opportunities, weak follow-up, excessive manual work, fragmented data, team pressure, or the need for a system that supports growth and expansion. The challenge does not have to be technical. We start by understanding what is happening inside the business, then determine how technology can help.' },
          { question: 'Do I need to know what system I need before contacting you?', answer: 'No. You do not need to define the system or prepare detailed technical requirements before getting in touch. You only need to explain the current challenge and what is creating pressure or slowing the business down. We will help analyze the problem and identify the most appropriate path forward.' },
          { question: 'Do you build custom solutions or provide configurable products?', answer: 'We offer both. A project may require a fully custom system, a ready product that can be configured around the business, or a combination of the two. We determine the best approach based on the nature of the business, its goals, timeline, budget, and future scalability needs.' },
          { question: 'What happens after I contact Ensdim?', answer: 'We begin with a discovery session to understand the current challenge, how the business operates, and the outcomes it wants to achieve. We then review the need, identify the right direction, and present an initial solution concept, scope of work, delivery stages, and next steps.' },
        ]}
      />

      {/* Final CTA */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-[#EEEAFE] border border-[#DDD8FB] rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl font-bold text-[#101418] mb-3">
            {ar ? 'لنبدأ بفهم التحدي، ثم نبني الحل المناسب.' : 'Let us understand the challenge first, then build the right solution.'}
          </h2>
          <p className="text-sm text-[#4F555E] mb-6 max-w-xl mx-auto">
            {ar
              ? 'إذا كنت تواجه تحديات في التشغيل، أو المتابعة، أو تنظيم البيانات، فسنبدأ أولًا بفهم طريقة عملك، ثم نقترح التكنولوجيا التي تحقق أثرًا حقيقيًا داخل نشاطك.'
              : 'If your business is facing challenges in operations, follow-up, or organizing data, we start by understanding how you work, then recommend the technology that can create meaningful impact inside your business.'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] active:scale-[0.98] transition-all duration-200 text-sm font-semibold">
              {ar ? 'احجز جلسة استكشاف' : 'Book a Discovery Session'} <ArrowRight size={15} />
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
