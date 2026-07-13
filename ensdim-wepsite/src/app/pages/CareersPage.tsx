import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';
import { FAQSection } from '../components/FAQSection';

const mindset = [
  { en: 'Ability to understand the problem before suggesting the solution.', ar: 'قدرة على فهم المشكلة قبل اقتراح الحل.' },
  { en: 'Attention to detail without slowing execution.', ar: 'اهتمام بالتفاصيل دون تعطيل التنفيذ.' },
  { en: 'Curiosity about business and customer behavior.', ar: 'فضول تجاه البزنس وسلوك العميل.' },
  { en: 'Willingness to learn and improve continuously.', ar: 'قدرة على التعلم والتطوير المستمر.' },
  { en: 'Clear communication and commitment to timelines.', ar: 'وضوح في التواصل والالتزام بالمواعيد.' },
  { en: 'Respect for data, privacy, and quality of work.', ar: 'احترام البيانات، الخصوصية، وجودة العمل.' },
  { en: 'Ability to work with a multidisciplinary team.', ar: 'قدرة على العمل مع فريق متعدد التخصصات.' },
];

type Role = { en: { title: string; desc: string; mode: string }; ar: { title: string; desc: string; mode: string } };
type Track = { en: string; ar: string; roles: Role[] };

const tracks: Track[] = [
  {
    en: 'Research & User Understanding', ar: 'البحث وفهم المستخدم',
    roles: [
      { en: { title: 'UX Researcher', desc: 'Understands user behavior and turns observations into insights that improve experience and decision-making.', mode: 'Remote or flexible by project' }, ar: { title: 'باحث تجربة المستخدم', desc: 'يفهم سلوك المستخدمين ويحوّل الملاحظات إلى رؤى تساعد في تحسين التجربة والقرار.', mode: 'عن بُعد أو مرن حسب المشروع' } },
      { en: { title: 'User Behavior Researcher', desc: 'Studies user motivations and hesitation points across digital journeys and customer experiences.', mode: 'Flexible by role' }, ar: { title: 'باحث سلوك المستخدم', desc: 'يدرس دوافع المستخدمين ونقاط التردد داخل الرحلات الرقمية وتجارب العملاء.', mode: 'مرن حسب الدور' } },
      { en: { title: 'Behavioral Psychology Researcher', desc: 'Helps connect customer behavior with trust, persuasion, and decision-making inside digital experiences.', mode: 'Project-based' }, ar: { title: 'باحث في علم النفس السلوكي', desc: 'يساعد في قراءة سلوك العميل وربط القرارات الرقمية بعوامل الثقة والإقناع واتخاذ القرار.', mode: 'حسب المشروع' } },
      { en: { title: 'Market Research Specialist', desc: 'Analyzes markets, competitors, and customer needs to support product, solution, and growth decisions.', mode: 'Remote or project-based' }, ar: { title: 'متخصص أبحاث سوق', desc: 'يحلل السوق، المنافسين، واحتياجات العملاء لدعم قرارات المنتجات والحلول والنمو.', mode: 'عن بُعد أو حسب المشروع' } },
    ],
  },
  {
    en: 'Strategy, Growth & Relationships', ar: 'الاستراتيجية، النمو، والعلاقات',
    roles: [
      { en: { title: 'Sales Specialist', desc: 'Engages potential clients, understands their needs, and connects them with the most relevant solution or service.', mode: 'Flexible by role' }, ar: { title: 'متخصص مبيعات', desc: 'يتعامل مع العملاء المحتملين ويفهم احتياجاتهم لربطهم بالحل أو الخدمة الأنسب.', mode: 'مرن حسب الدور' } },
      { en: { title: 'Business Developer', desc: 'Builds relationships, partnerships, and collaboration opportunities that help Ensdim reach suitable markets and clients.', mode: 'Flexible by role' }, ar: { title: 'مطور أعمال', desc: 'يبني علاقات وشراكات وفرص تعاون تساعد إنسديم على الوصول لأسواق وعملاء مناسبين.', mode: 'مرن حسب الدور' } },
      { en: { title: 'Public Relations Specialist', desc: 'Helps build Ensdim’s presence inside professional communities, events, and strategic relationships.', mode: 'Partial presence when needed' }, ar: { title: 'متخصص علاقات عامة', desc: 'يساعد في بناء حضور إنسديم داخل المجتمعات المهنية والفعاليات والعلاقات المؤثرة.', mode: 'حضور جزئي عند الحاجة' } },
      { en: { title: 'Marketing Strategist', desc: 'Develops ideas and plans that improve visibility, messaging, and acquisition of suitable clients.', mode: 'Remote or flexible by project' }, ar: { title: 'استراتيجي تسويق', desc: 'يطوّر أفكارًا وخططًا تساعد على تحسين الظهور، الرسائل، وجذب العملاء المناسبين.', mode: 'عن بُعد أو مرن حسب المشروع' } },
    ],
  },
  {
    en: 'Product, Design & Experience', ar: 'المنتج، التصميم، والتجربة',
    roles: [
      { en: { title: 'UI/UX Designer', desc: 'Designs clear interfaces and experiences that help users understand and take the next step.', mode: 'Remote or flexible by project' }, ar: { title: 'مصمم UI/UX', desc: 'يصمم واجهات وتجارب واضحة تساعد المستخدم على الفهم واتخاذ الخطوة التالية.', mode: 'عن بُعد أو مرن حسب المشروع' } },
      { en: { title: 'Product Designer', desc: 'Connects user needs, business goals, and product experience to build easier-to-use solutions.', mode: 'Flexible by project' }, ar: { title: 'مصمم منتج', desc: 'يربط بين احتياج المستخدم، هدف البزنس، وتجربة المنتج لبناء حلول أسهل في الاستخدام.', mode: 'مرن حسب المشروع' } },
      { en: { title: 'Product Manager', desc: 'Prioritizes product needs, organizes requirements, and connects client needs with the technical team.', mode: 'Flexible by role' }, ar: { title: 'مدير منتج', desc: 'يحدد أولويات المنتج، ينظم المتطلبات، ويربط بين احتياج العميل والفريق التقني.', mode: 'مرن حسب الدور' } },
    ],
  },
  {
    en: 'Engineering, Data & AI', ar: 'الهندسة، البيانات، والذكاء الاصطناعي',
    roles: [
      { en: { title: 'Frontend Developer', desc: 'Builds fast, clear, responsive interfaces that reflect strong user experience.', mode: 'Remote or project-based' }, ar: { title: 'مطور واجهات أمامية', desc: 'يبني واجهات سريعة وواضحة ومتجاوبة تعكس تجربة استخدام قوية.', mode: 'عن بُعد أو حسب المشروع' } },
      { en: { title: 'Backend Developer', desc: 'Builds backend architecture, databases, and integrations that power systems and applications.', mode: 'Remote or project-based' }, ar: { title: 'مطور واجهات خلفية', desc: 'يبني البنية الخلفية، قواعد البيانات، والتكاملات التي تشغل الأنظمة والتطبيقات.', mode: 'عن بُعد أو حسب المشروع' } },
      { en: { title: 'DevOps Engineer', desc: 'Supports deployment, stability, monitoring, and operational readiness of systems.', mode: 'Project-based' }, ar: { title: 'مهندس DevOps', desc: 'يساعد في النشر، الاستقرار، مراقبة الأداء، وتحسين جاهزية الأنظمة للتشغيل.', mode: 'حسب المشروع' } },
      { en: { title: 'Security Engineer', desc: 'Reviews security, permissions, and data protection across systems and digital solutions.', mode: 'Project-based' }, ar: { title: 'مهندس أمن معلومات', desc: 'يراجع الأمان، الصلاحيات، وحماية البيانات داخل الأنظمة والحلول الرقمية.', mode: 'حسب المشروع' } },
      { en: { title: 'AI Engineer', desc: 'Builds intelligent solutions for classification, summarization, automation, and actionable data flows.', mode: 'Remote or project-based' }, ar: { title: 'مهندس ذكاء اصطناعي', desc: 'يبني حلولًا ذكية للتصنيف، التلخيص، الأتمتة، وتحويل البيانات إلى خطوات قابلة للتنفيذ.', mode: 'عن بُعد أو حسب المشروع' } },
      { en: { title: 'Machine Learning Engineer', desc: 'Develops machine learning models and applications for classification, prediction, and practical data analysis.', mode: 'Project-based' }, ar: { title: 'مهندس تعلم آلي', desc: 'يطوّر نماذج وتطبيقات تعلم آلي تساعد في التصنيف، التوقع، والتحليل العملي للبيانات.', mode: 'حسب المشروع' } },
      { en: { title: 'Automation Engineer', desc: 'Builds automation workflows that reduce manual work and connect tools and systems clearly.', mode: 'Remote or project-based' }, ar: { title: 'مهندس أتمتة', desc: 'يبني تدفقات أتمتة تقلل العمل اليدوي وتربط الأدوات والأنظمة بوضوح.', mode: 'عن بُعد أو حسب المشروع' } },
      { en: { title: 'Testing & Quality Engineer', desc: 'Reviews product quality, tests scenarios, and ensures the experience works correctly before launch.', mode: 'Remote or project-based' }, ar: { title: 'مهندس جودة واختبار', desc: 'يراجع جودة المنتج، يختبر السيناريوهات، ويضمن أن التجربة تعمل كما يجب قبل الإطلاق.', mode: 'عن بُعد أو حسب المشروع' } },
      { en: { title: 'Data Analyst', desc: 'Analyzes data and turns it into indicators and insights that help management make clearer decisions.', mode: 'Remote or project-based' }, ar: { title: 'محلل بيانات', desc: 'يحلل البيانات ويحوّلها إلى مؤشرات ورؤى تساعد الإدارة على اتخاذ قرارات أوضح.', mode: 'عن بُعد أو حسب المشروع' } },
      { en: { title: 'Data Engineer', desc: 'Organizes data sources and builds flows and dashboards that support decisions and operations.', mode: 'Project-based' }, ar: { title: 'مهندس بيانات', desc: 'ينظم مصادر البيانات ويبني تدفقات ولوحات متابعة تدعم القرار والتشغيل.', mode: 'حسب المشروع' } },
    ],
  },
  {
    en: 'Project Management & Delivery', ar: 'إدارة المشاريع والتسليم',
    roles: [
      { en: { title: 'Project Manager', desc: 'Manages project stages, priorities, communication, and execution follow-up to reach clear deliverables.', mode: 'Flexible by role' }, ar: { title: 'مدير مشروع', desc: 'يدير مراحل المشروع، الأولويات، التواصل، ومتابعة التنفيذ حتى يصل الفريق لمخرجات واضحة.', mode: 'مرن حسب الدور' } },
      { en: { title: 'Technical Project Coordinator', desc: 'Coordinates between the technical team, management, and client to keep tasks, timelines, and follow-up clear.', mode: 'Remote or flexible by project' }, ar: { title: 'منسق مشاريع تقنية', desc: 'ينسق بين الفريق التقني والإدارة والعميل لضمان وضوح المهام والمواعيد والمتابعة.', mode: 'عن بُعد أو مرن حسب المشروع' } },
      { en: { title: 'Delivery Manager', desc: 'Monitors delivery quality, output clarity, and client experience across execution stages.', mode: 'Flexible by role' }, ar: { title: 'مدير تسليم', desc: 'يتابع جودة التسليم، وضوح المخرجات، وتجربة العميل خلال مراحل التنفيذ.', mode: 'مرن حسب الدور' } },
    ],
  },
];

const selectionSteps = [
  { en: 'Review profile and experience.', ar: 'مراجعة البيانات والخبرة.' },
  { en: 'Initial conversation to understand fit.', ar: 'محادثة أولية لفهم التوافق.' },
  { en: 'Short task or practical discussion depending on the role.', ar: 'مهمة قصيرة أو نقاش عملي حسب الدور.' },
  { en: 'Clear agreement on collaboration terms.', ar: 'اتفاق واضح على طبيعة التعاون.' },
  { en: 'Structured trial or onboarding when accepted.', ar: 'بدء تجربة عمل منظمة عند القبول.' },
];

export function CareersPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  return (
    <>
      <SEO
        title={ar ? 'الوظائف | انضم إلى إنسديم' : 'Careers | Join Ensdim'}
        description={ar
          ? 'نبحث عن عقول تفهم المشكلة قبل أن تبني الحل. استعرض الفرص المتاحة في إنسديم.'
          : 'We look for minds that understand the problem before building the solution. Explore open roles at Ensdim.'}
        canonical="/careers"
        lang={ar ? 'ar' : 'en'}
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
            <span className="text-white/70 font-medium">{ar ? 'الوظائف' : 'Careers'}</span>
          </div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5 uppercase tracking-wider bg-[#6D5DF6]/15 border border-[#6D5DF6]/20 text-[#EEEAFE]/80">
            {ar ? 'انضم إلى إنسديم' : 'Join Ensdim'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight text-white">
            {ar ? 'نبحث عن عقول تفهم المشكلة قبل أن تبني الحل.' : 'We look for minds that understand the problem before building the solution.'}
          </h1>
          <p className="text-base sm:text-lg max-w-2xl leading-relaxed mb-3 text-[#EEEAFE]/75">
            {ar
              ? 'في إنسديم، لا نبحث عن مهارات تقنية فقط. نبحث عن أشخاص يفهمون سياق العمل، يهتمون بسلوك العميل، يحترمون البيانات، ويستطيعون تحويل الأفكار والتحديات إلى عمل منظم له أثر واضح على البزنس.'
              : 'At Ensdim, we do not look for technical skills alone. We look for people who understand business context, care about customer behavior, respect data, and can turn ideas and challenges into organized work with a clear business impact.'}
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {(ar ? 'تفكير عملي. تعلم مستمر. تنفيذ مسؤول.' : 'Practical thinking. Continuous learning. Responsible execution.')
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
              to="#roles"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
            >
              {ar ? 'استعرض الفرص المتاحة' : 'View Open Roles'} <ArrowRight size={15} />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-white/20 text-white/80 hover:border-white/40 hover:text-white active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
            >
              {ar ? 'تعرّف على إنسديم' : 'Learn About Ensdim'}
            </Link>
          </div>
        </div>
      </section>

      {/* How we see work */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-5 leading-tight">
              {ar ? 'لسنا مجرد فريق ينفذ مهام… نحن نبني حلولًا تفهم العمل والناس.' : 'We are not just a team that completes tasks. We build solutions that understand work and people.'}
            </h2>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-4">
              {ar
                ? 'كل دور داخل إنسديم مرتبط بفكرة أكبر من مجرد تسليم مهمة. سواء كنت تعمل في الهندسة، التصميم، البيانات، البحث، المبيعات، أو النمو، فالمطلوب هو فهم السياق: ما المشكلة؟ من المستخدم؟ ما أثر الحل؟ وكيف يمكن أن تصبح التكنولوجيا أوضح وأسهل وأكثر ارتباطًا بالعائد؟'
                : 'Every role at Ensdim connects to something larger than task delivery. Whether you work in engineering, design, data, research, sales, or growth, the goal is to understand context: What is the problem? Who is the user? What impact should the solution create? And how can technology become clearer, easier, and more connected to return?'}
            </p>
            <p className="text-sm text-[#4F555E] leading-relaxed">
              {ar
                ? 'نقدّر الأشخاص الذين يسألون قبل أن ينفذوا، يتعلمون بسرعة، ويستطيعون العمل داخل نظام واضح دون فقدان روح المبادرة.'
                : 'We value people who ask before they execute, learn quickly, and can work inside a clear system without losing initiative.'}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Mindset */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-xl sm:text-2xl font-bold text-[#101418] mb-6">
              {ar ? 'طريقة التفكير التي نبحث عنها' : 'The Mindset We Look For'}
            </h2>
            <ul className="space-y-2.5">
              {mindset.map((m, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#4F555E]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6D5DF6] mt-1.5 flex-shrink-0" />
                  {ar ? m.ar : m.en}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* Work model note */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-xl sm:text-2xl font-bold text-[#101418] mb-4">
              {ar ? 'طبيعة العمل تختلف حسب الدور والمشروع.' : 'The work model depends on the role and project.'}
            </h2>
            <p className="text-sm text-[#4F555E] leading-relaxed">
              {ar
                ? 'لا نفترض أن كل الأدوار تعمل بنفس الطريقة. بعض الوظائف يمكن تنفيذها عن بُعد، وبعضها قد يحتاج اجتماعات دورية، حضورًا جزئيًا، أو تعاونًا مباشرًا حسب طبيعة الدور، العميل، والمشروع.'
                : 'We do not assume all roles work in the same way. Some roles can be performed remotely, while others may require periodic meetings, partial presence, or direct collaboration depending on the role, client, and project.'}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Open roles */}
      <section id="roles" className="py-16 bg-[#FAFAFA] scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418]">
              {ar ? 'استكشف الفرص حسب المسار.' : 'Explore opportunities by track.'}
            </h2>
          </ScrollReveal>

          {tracks.map((track, ti) => (
            <div key={track.en} className="mb-12">
              <ScrollReveal>
                <h3 className="text-base font-bold text-[#101418] mb-4 pb-2 border-b border-[#E5E5E5]">
                  {ar ? track.ar : track.en}
                </h3>
              </ScrollReveal>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {track.roles.map((role, ri) => {
                  const d = ar ? role.ar : role.en;
                  return (
                    <ScrollReveal key={d.title} delay={Math.min((ti + ri) * 0.04, 0.3)}>
                      <Link
                        to={`/careers/apply?role=${encodeURIComponent(d.title)}`}
                        className="group flex flex-col h-full p-5 bg-white border border-[#E5E5E5] rounded-2xl hover:border-[#6D5DF6] hover:shadow-md active:scale-[0.98] active:border-[#6D5DF6] transition-all duration-200"
                      >
                        <h4 className="text-sm font-bold text-[#101418] mb-2 leading-snug">{d.title}</h4>
                        <p className="text-xs text-[#4F555E] leading-relaxed mb-3 flex-1">{d.desc}</p>
                        <p className="text-[11px] text-[#6D5DF6]/80 font-medium mb-3">{d.mode}</p>
                        <span className="inline-flex items-center gap-1.5 text-xs text-[#6D5DF6] font-semibold group-hover:gap-2.5 group-active:gap-2.5 transition-all mt-auto">
                          {ar ? 'تقديم' : 'Apply'} <ArrowRight size={12} />
                        </span>
                      </Link>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* No matching role */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <h2 className="text-xl sm:text-2xl font-bold text-[#101418] mb-3">
              {ar ? 'لا تجد الدور المناسب الآن؟' : 'Do Not See a Matching Role?'}
            </h2>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-6">
              {ar
                ? 'إذا كنت ترى أن لديك مهارة يمكن أن تضيف لإنسديم في البحث، التصميم، التطوير، البيانات، الذكاء الاصطناعي، المبيعات، العلاقات، أو إدارة المشاريع، يمكنك إرسال بياناتك حتى لو لم تكن هناك وظيفة مناسبة منشورة حاليًا.'
                : 'If you believe your skill can add value to Ensdim in research, design, development, data, AI, sales, relationships, or project management, you can send your profile even if there is no matching role currently listed.'}
            </p>
            <Link to="/careers/apply" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#3B2A78] text-white rounded-xl hover:bg-[#4a3690] transition-colors text-sm font-semibold">
              {ar ? 'أرسل بياناتك' : 'Send Your Profile'} <ArrowRight size={15} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* How we select people */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-xl sm:text-2xl font-bold text-[#101418] mb-2">
              {ar ? 'كيف نختار الأشخاص؟' : 'How We Select People'}
            </h2>
            <p className="text-sm font-medium text-[#101418] mb-5">
              {ar ? 'نبحث عن التوافق قبل التعيين.' : 'We look for fit before hiring.'}
            </p>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-6">
              {ar
                ? 'لا نعتمد على السيرة الذاتية فقط. نهتم بطريقة التفكير، وضوح التواصل، القدرة على التعلم، وفهم المتقدم لطبيعة العمل الذي سينضم إليه.'
                : 'We do not rely on CVs alone. We care about thinking style, communication clarity, ability to learn, and how well the candidate understands the nature of the role.'}
            </p>
            <ol className="space-y-2.5">
              {selectionSteps.map((s, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#4F555E]">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#EEEAFE] text-[#6D5DF6] text-[10px] font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                  {ar ? s.ar : s.en}
                </li>
              ))}
            </ol>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        title={ar ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
        faqs={ar ? [
          { question: 'هل كل وظائف إنسديم عن بُعد؟', answer: 'ليس بالضرورة. طبيعة العمل تختلف حسب الدور والمشروع. بعض الأدوار يمكن تنفيذها عن بُعد، وبعضها قد يحتاج تعاونًا مباشرًا، اجتماعات، أو حضورًا جزئيًا عند الحاجة.' },
          { question: 'ما المهارات التي تبحث عنها إنسديم؟', answer: 'نبحث عن مهارات في البحث، التصميم، الهندسة، البيانات، الذكاء الاصطناعي، الأمن، إدارة المشاريع، المبيعات، تطوير الأعمال، والعلاقات العامة. لكننا نهتم أيضًا بطريقة التفكير، الالتزام، التعلم، وفهم المشكلة قبل تنفيذ الحل.' },
          { question: 'هل تقبل إنسديم الخريجين الجدد أو الجونيور؟', answer: 'نعم، حسب الدور. بعض الفرص مناسبة للمتدربين أو الجونيور إذا كان لديهم جدية، قابلية للتعلم، التزام، وقدرة على تنفيذ مهام واضحة. بعض الأدوار المتخصصة أو الاستشارية تحتاج خبرة أكبر.' },
          { question: 'كيف أقدم على وظيفة في إنسديم؟', answer: 'يمكنك الضغط على كارت الدور المناسب أو السهم داخل الكارت للانتقال إلى فورم التقديم الثابت. وإذا لم تجد دورًا مناسبًا، يمكنك إرسال ملفك بشكل عام من نفس صفحة التقديم.' },
          { question: 'ما مراحل التوظيف في إنسديم؟', answer: 'عادة تبدأ بمراجعة البيانات، ثم محادثة أولية، ثم مهمة قصيرة أو نقاش عملي حسب الدور، وبعدها يتم الاتفاق على طبيعة التعاون، المسؤوليات، والمدة.' },
          { question: 'هل الخبرة في سوق الخليج مطلوبة؟', answer: 'ليست شرطًا في كل الأدوار، لكنها ميزة مهمة في أدوار المبيعات، تطوير الأعمال، العلاقات العامة، البحث السوقي، وبعض أدوار الاستراتيجية والنمو.' },
          { question: 'هل يمكن التعاون بنظام جزئي أو حسب المشروع؟', answer: 'نعم، بعض الأدوار يمكن أن تكون بدوام جزئي أو حسب المشروع، خصوصًا في الأدوار البحثية، الاستشارية، العلاقات، الأمن، وبعض التخصصات التقنية.' },
        ] : [
          { question: 'Are all Ensdim jobs remote?', answer: 'Not necessarily. The work model depends on the role and project. Some roles can be fully remote, while others may require direct collaboration, meetings, or partial presence when needed.' },
          { question: 'What skills does Ensdim look for?', answer: 'We look for skills in research, design, engineering, data, AI, security, project management, sales, business development, and public relations. We also care about mindset, commitment, learning ability, and understanding the problem before executing the solution.' },
          { question: 'Does Ensdim hire fresh graduates or junior candidates?', answer: 'Yes, depending on the role. Some opportunities are suitable for interns or junior candidates if they show seriousness, learning ability, commitment, and the ability to execute clear tasks. Specialized or advisory roles may require deeper experience.' },
          { question: 'How do I apply for a role at Ensdim?', answer: 'You can click the relevant role card or the arrow inside the card to go to the fixed application form. If you do not see a matching role, you can still send your profile through the same application page.' },
          { question: 'What is the hiring process at Ensdim?', answer: 'The process usually starts with profile review, followed by an initial conversation, then a short task or practical discussion depending on the role, and finally an agreement on responsibilities, collaboration model, and duration.' },
          { question: 'Is Gulf market experience required?', answer: 'It is not required for every role, but it is a strong advantage in sales, business development, public relations, market research, and some strategy and growth roles.' },
          { question: 'Can I work part-time or project-based with Ensdim?', answer: 'Yes. Some roles can be part-time or project-based, especially research, advisory, relationships, security, and some technical specializations.' },
        ]}
      />

      {/* Final CTA */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-[#EEEAFE] border border-[#DDD8FB] rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl font-bold text-[#101418] mb-3">
            {ar ? 'هل ترى نفسك مناسبًا لطريقة إنسديم في التفكير والعمل؟' : 'Do you see yourself as a fit for how Ensdim thinks and works?'}
          </h2>
          <p className="text-sm text-[#4F555E] mb-6 max-w-xl mx-auto">
            {ar
              ? 'إذا كنت تحب فهم المشكلة قبل تنفيذ الحل، وتبحث عن بيئة تتعلم فيها وتبني شيئًا له أثر حقيقي، أرسل لنا بياناتك أو اختر الدور الأقرب لك من الفرص المتاحة.'
              : 'If you like understanding the problem before executing the solution, and you are looking for an environment where you can learn and build something with real impact, send us your profile or choose the role closest to your experience from the open opportunities.'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/careers/apply" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] active:scale-[0.98] transition-all duration-200 text-sm font-semibold">
              {ar ? 'أرسل بياناتك' : 'Send Your Profile'} <ArrowRight size={15} />
            </Link>
            <Link to="/about" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[#6D5DF6]/30 text-[#3B2A78] hover:border-[#6D5DF6] hover:bg-white active:scale-[0.98] transition-all duration-200 text-sm font-semibold">
              {ar ? 'تعرّف على إنسديم' : 'Learn About Ensdim'}
            </Link>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
