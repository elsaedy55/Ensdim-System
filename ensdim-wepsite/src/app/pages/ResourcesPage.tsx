import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';
import { FAQSection } from '../components/FAQSection';
import { useResearchArticles, useBlogPosts, useCaseStudies } from '../../hooks/useContent';

/**
 * /resources/research and /resources/blog in the approved content brief
 * don't exist as routes — the real pages are /research and /blog.
 * Linked there instead to avoid 404s.
 */

type CardItem = {
  key: string;
  type: 'research' | 'insight' | 'case-study';
  title: string;
  href: string;
  date: string | null;
};

const tracks = [
  {
    slug: 'research',
    href: '/research',
    en: {
      num: '01', title: 'Research & Business Intelligence',
      desc: 'Research and analysis focused on business performance from the perspective of return, profitability, growth, customer behavior, management decisions, and the data that reveals improvement opportunities. This track does not treat technology as an isolated topic; it connects it to the core question of how technology affects business profitability and growth.',
      topics: ['Profitability and ROI analysis for digital transformation.', 'Growth, conversion, and customer value indicators.', 'Business intelligence and decision support for management.', 'Revenue improvement and waste reduction opportunities.', 'Customer behavior and its impact on sales and retention.', 'The effect of digital systems on operational performance.', 'ROI measurement models before and after solution delivery.'],
      cta: 'Read Research',
    },
    ar: {
      num: '01', title: 'Research & Business Intelligence',
      desc: 'أبحاث وتحليلات تركز على فهم أداء الأعمال من منظور العائد، الأرباح، النمو، سلوك العملاء، القرارات الإدارية، والبيانات التي تكشف فرص التحسين. هذا المسار لا يتعامل مع التقنية كموضوع منفصل، بل يربطها بالسؤال الأهم عن كيفية تأثيرها على ربحية العمل ونموه.',
      topics: ['تحليل الربحية والعائد من التحول الرقمي.', 'مؤشرات النمو، التحويل، وقيمة العميل.', 'ذكاء الأعمال ودعم القرار للإدارة.', 'تحليل فرص تحسين الإيراد وتقليل الهدر.', 'سلوك العملاء وتأثيره على المبيعات والاحتفاظ.', 'دراسات عن أثر الأنظمة الرقمية على الأداء التشغيلي.', 'نماذج قياس العائد قبل وبعد تنفيذ الحلول.'],
      cta: 'اقرأ الأبحاث',
    },
  },
  {
    slug: 'blog',
    href: '/blog',
    en: {
      num: '02', title: 'Growth, Challenges & Digital Solutions',
      desc: 'Articles and insights on modern business growth paths, the challenges companies face during scaling, and how these challenges can be converted into practical digital solutions that improve sales, follow-up, operations, and decision-making.',
      topics: ['Growth systems.', 'Scaling and operational challenges.', 'Improving follow-up and sales performance.', 'Turning operational chaos into systems.', 'Choosing the right digital solution for each stage.', 'New ideas that solve real business problems.'],
      cta: 'Explore Insights',
    },
    ar: {
      num: '02', title: 'Growth, Challenges & Digital Solutions',
      desc: 'مقالات ورؤى حول أحدث مسارات نمو الأعمال، التحديات التي تواجه الشركات أثناء التوسع، وكيف يمكن تحويل هذه التحديات إلى حلول رقمية عملية تساعد على تحسين المبيعات، المتابعة، التشغيل، واتخاذ القرار.',
      topics: ['أنظمة النمو Growth Systems.', 'تحديات التوسع والتشغيل.', 'تحسين المتابعة والمبيعات.', 'تحويل الفوضى التشغيلية إلى نظام.', 'اختيار الحل الرقمي المناسب لكل مرحلة.', 'الأفكار الجديدة التي تعالج مشاكل حقيقية داخل البزنس.'],
      cta: 'استكشف المقالات',
    },
  },
  {
    slug: 'case-studies',
    href: '/case-studies',
    en: {
      num: '03', title: 'Case Studies & Applied Outcomes',
      desc: 'Case studies showing how real challenges in customer experience, follow-up, operations, data, or automation were turned into usable and measurable digital solutions, with emphasis on what changed in performance after delivery.',
      topics: ['Before and after solution delivery.', 'Impact on follow-up and operations.', 'How data improved decision-making.', 'The role of UX in improving conversion.', 'Technology outcomes reflected in business performance.', 'Practical ROI measurement for digital solutions.'],
      cta: 'View Case Studies',
    },
    ar: {
      num: '03', title: 'Case Studies & Applied Outcomes',
      desc: 'دراسات حالة توضّح كيف تحولت تحديات حقيقية في تجربة العميل، المتابعة، التشغيل، البيانات، أو الأتمتة إلى حلول رقمية قابلة للاستخدام والقياس، مع التركيز على ما تغيّر في الأداء بعد التنفيذ.',
      topics: ['قبل وبعد تنفيذ الحل.', 'أثر النظام على المتابعة والتشغيل.', 'كيف ساعدت البيانات في تحسين القرار.', 'دور تجربة المستخدم في رفع التحويل.', 'نتائج تقنية انعكست على أداء البزنس.', 'قياس العائد العملي من الحلول الرقمية.'],
      cta: 'شاهد دراسات الحالة',
    },
  },
];

const knowledgeAreas = [
  { en: { title: 'Business Intelligence & Decision Support', desc: 'Data, performance indicators, dashboards, and turning scattered numbers into clearer management decisions.' }, ar: { title: 'Business Intelligence & Decision Support', desc: 'البيانات، مؤشرات الأداء، لوحات المتابعة، وتحويل الأرقام المتفرقة إلى رؤية تساعد الإدارة على اتخاذ قرارات أوضح.' } },
  { en: { title: 'Revenue, Profitability & ROI', desc: 'The relationship between digital solutions, revenue, profitability, operating cost, and return on investment.' }, ar: { title: 'Revenue, Profitability & ROI', desc: 'تحليل العلاقة بين الحلول الرقمية والإيراد، الربحية، تكلفة التشغيل، وقيمة العائد من الاستثمار.' } },
  { en: { title: 'Growth Systems & Business Scaling', desc: 'Growth paths, scaling challenges, operational pressure, and the shift from manual management to scalable systems.' }, ar: { title: 'Growth Systems & Business Scaling', desc: 'مسارات النمو، تحديات التوسع، ضغط العمليات، وتحوّل الشركات من إدارة يدوية إلى أنظمة قابلة للتوسع.' } },
  { en: { title: 'Customer Behavior & Conversion', desc: 'Customer behavior, hesitation points, friction, and conversion improvement across websites, apps, and request flows.' }, ar: { title: 'Customer Behavior & Conversion', desc: 'سلوك العملاء، أسباب التردد، نقاط الاحتكاك، وتحسين التحويل داخل المواقع، التطبيقات، ونماذج الطلب.' } },
  { en: { title: 'User Experience & Product Thinking', desc: 'User journeys, interface clarity, and how better experience affects trust and decision speed.' }, ar: { title: 'User Experience & Product Thinking', desc: 'تجربة المستخدم، تصميم الرحلات، وضوح الواجهات، وكيف تؤثر التجربة الجيدة على ثقة العميل وسرعة اتخاذ القرار.' } },
  { en: { title: 'Applied AI & Automation', desc: 'Practical AI and automation use cases in follow-up, classification, summarization, customer service, and operational analysis.' }, ar: { title: 'Applied AI & Automation', desc: 'الاستخدام العملي للذكاء الاصطناعي والأتمتة في المتابعة، التصنيف، التلخيص، خدمة العملاء، والتحليل التشغيلي.' } },
  { en: { title: 'Digital Operations & Internal Systems', desc: 'How internal systems, customer management, permissions, and workflows reduce confusion and improve team efficiency.' }, ar: { title: 'Digital Operations & Internal Systems', desc: 'كيف تساعد الأنظمة الداخلية، إدارة العملاء، الصلاحيات، وسير العمل في تقليل التشتت وتحسين كفاءة الفريق.' } },
  { en: { title: 'Technology Trends with Business Impact', desc: 'Modern technologies viewed through their business impact, whether they reduce cost, accelerate decisions, improve customer experience, or create growth opportunities.' }, ar: { title: 'Technology Trends with Business Impact', desc: 'التقنيات الحديثة من زاوية تأثيرها على البزنس، سواء كانت تقلل التكلفة، تسرّع القرار، تحسن تجربة العميل، أو تخلق فرصة نمو.' } },
];

const audienceList = [
  { en: 'Understand the relationship between technology and return.', ar: 'فهم العلاقة بين التقنية والعائد.' },
  { en: 'Analyze growth challenges before building a solution.', ar: 'تحليل تحديات النمو قبل بناء الحل.' },
  { en: 'Measure the impact of digital solutions on profitability and performance.', ar: 'قياس أثر الحلول الرقمية على الربحية والأداء.' },
  { en: 'Use data for better decision-making.', ar: 'استخدام البيانات في اتخاذ القرار.' },
  { en: 'Improve customer experience and conversion.', ar: 'تحسين تجربة العميل والتحويل.' },
  { en: 'Organize follow-up and operations.', ar: 'تنظيم المتابعة والتشغيل.' },
  { en: 'Understand how modern technologies affect business performance.', ar: 'معرفة كيف تؤثر التقنيات الحديثة على أداء البزنس.' },
];

const typeLabel = (t: CardItem['type'], ar: boolean) => {
  if (t === 'research') return ar ? 'بحث' : 'Research';
  if (t === 'case-study') return ar ? 'دراسة حالة' : 'Case Study';
  return ar ? 'رؤية' : 'Insight';
};

function TrackPreview({ ar, items }: { ar: boolean; items: CardItem[] }) {
  if (items.length === 0) return null;
  return (
    <div className="mt-5 pt-5 border-t border-[#E5E5E5] space-y-3">
      {items.map((item) => (
        <Link
          key={item.key}
          to={item.href}
          className="flex items-center justify-between gap-3 group"
        >
          <span className="text-xs text-[#4F555E] group-hover:text-[#6D5DF6] transition-colors line-clamp-1">{item.title}</span>
          <ArrowRight size={12} className="text-[#6D5DF6] flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      ))}
    </div>
  );
}

export function ResourcesPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  const { data: research = [] } = useResearchArticles();
  const { data: posts = [] } = useBlogPosts();
  const { data: cases = [] } = useCaseStudies();

  const researchPreview: CardItem[] = research.slice(0, 3).map((r) => ({
    key: r.id, type: 'research', title: ar ? r.title_ar : r.title_en, href: `/research/${r.slug}`, date: r.published_at,
  }));
  const casesPreview: CardItem[] = cases.slice(0, 3).map((c) => ({
    key: c.id, type: 'case-study', title: ar ? c.title_ar : c.title_en, href: `/case-studies/${c.slug}`, date: c.published_at,
  }));

  const latestAll: CardItem[] = [
    ...research.map((r) => ({ key: r.id, type: 'research' as const, title: ar ? r.title_ar : r.title_en, href: `/research/${r.slug}`, date: r.published_at })),
    ...posts.map((p) => ({ key: p.id, type: 'insight' as const, title: ar ? p.title_ar : p.title_en, href: `/blog/${p.slug}`, date: p.published_at })),
    ...cases.map((c) => ({ key: c.id, type: 'case-study' as const, title: ar ? c.title_ar : c.title_en, href: `/case-studies/${c.slug}`, date: c.published_at })),
  ]
    .filter((item) => item.date)
    .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime())
    .slice(0, 6);

  const featuredResearch = research[0];
  const featuredCase = cases[0];

  return (
    <>
      <SEO
        title={ar ? 'موارد إنسديم | رؤى عملية في ذكاء الأعمال والنمو وتجربة المستخدم' : 'Ensdim Resources | Practical Insights into Business Intelligence, Growth & UX'}
        description={ar
          ? 'مساحة معرفية نشارك فيها أبحاثًا، تحليلات، ودراسات حالة تربط بين سلوك العملاء، ذكاء الأعمال، تحديات النمو، وتجربة المستخدم.'
          : 'A knowledge space where we share research, analysis, and case studies that connect customer behavior, business intelligence, growth challenges, and user experience with business performance.'}
        canonical="/resources"
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
            <span className="text-white/70 font-medium">{ar ? 'الموارد' : 'Resources'}</span>
          </div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5 uppercase tracking-wider bg-[#6D5DF6]/15 border border-[#6D5DF6]/20 text-[#EEEAFE]/80">
            Ensdim Knowledge Hub
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight text-white">
            {ar ? 'رؤى عملية في ذكاء الأعمال، النمو، وتجربة المستخدم.' : 'Practical insights into business intelligence, growth, and user experience.'}
          </h1>
          <p className="text-base sm:text-lg max-w-2xl leading-relaxed mb-3 text-[#EEEAFE]/75">
            {ar
              ? 'موارد إنسديم ليست محتوى عامًا عن التقنية. هي مساحة معرفية نشارك فيها أبحاثًا، تحليلات، مقالات، ودراسات حالة تربط بين سلوك العملاء، ذكاء الأعمال، تحديات النمو، تجربة المستخدم، والأفكار التقنية الحديثة التي تنعكس على الأداء والعائد.'
              : 'Ensdim Resources is not generic technology content. It is a knowledge space where we share research, analysis, insights, and case studies that connect customer behavior, business intelligence, growth challenges, user experience, and modern technologies with measurable business performance and return.'}
          </p>
          <div className="flex flex-wrap gap-2">
            {'Business Intelligence. Growth Systems. User Experience. Business Impact.'
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
        </div>
      </section>

      {/* Why we build this hub */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-5 leading-tight">
              {ar ? 'لأن قرارات النمو تحتاج فهمًا أعمق من اختيار أداة.' : 'Because growth decisions need deeper thinking than choosing a tool.'}
            </h2>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-4">
              {ar
                ? 'كثير من الشركات تبدأ من سؤال حول الأداة التي تحتاجها، موقع، تطبيق، نظام متابعة، أو أتمتة. لكن السؤال الأهم هو ما الذي يحدث داخل العمل؟ أين يتوقف النمو؟ لماذا لا يتحول الاهتمام إلى مبيعات؟ ما الذي يضغط التشغيل؟ وما البيانات التي لا تظهر للإدارة؟'
                : 'Many companies start with the question of what tool they need, a website, an app, a follow-up system, or automation. But the more important question is what is really happening inside the business. Where does growth slow down? Why does interest fail to become sales? What creates operational pressure? What data is missing from management view?'}
            </p>
            <p className="text-sm text-[#4F555E] leading-relaxed">
              {ar
                ? 'في موارد إنسديم، نحلل هذه الأسئلة من زاوية عملية تجمع بين ذكاء الأعمال، النمو، تجربة المستخدم، التشغيل، البيانات، والتقنيات الحديثة؛ حتى يتحول المحتوى إلى معرفة تساعد أصحاب الأعمال على اتخاذ قرارات أوضح قبل الاستثمار في أي حل رقمي.'
                : 'Through Ensdim Resources, we analyze these questions from a practical angle that combines business intelligence, growth, user experience, operations, data, and modern technology. The goal is to turn content into knowledge that helps business leaders make clearer digital decisions before investing in any solution.'}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Three knowledge tracks */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="mb-10 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418]">
              {ar ? 'ثلاث مسارات لفهم الأعمال، التحديات، والنتائج.' : 'Three tracks for understanding business, challenges, and outcomes.'}
            </h2>
          </ScrollReveal>
          <div className="grid lg:grid-cols-3 gap-5">
            {tracks.map((track, i) => {
              const d = ar ? track.ar : track.en;
              const preview = track.slug === 'research' ? researchPreview : track.slug === 'case-studies' ? casesPreview : [];
              return (
                <ScrollReveal key={track.slug} delay={i * 0.08}>
                  <div className="bg-white rounded-2xl p-6 border border-[#E5E5E5] h-full flex flex-col">
                    <span className="text-[10px] font-bold text-[#6D5DF6] tracking-widest mb-3 block">{d.num}</span>
                    <h3 className="text-base font-bold text-[#101418] mb-3 leading-snug">{d.title}</h3>
                    <p className="text-xs text-[#4F555E] leading-relaxed mb-4">{d.desc}</p>
                    <ul className="space-y-1.5 mb-5">
                      {d.topics.map((t, ti) => (
                        <li key={ti} className="flex items-start gap-2 text-xs text-[#4F555E]">
                          <div className="w-1 h-1 rounded-full bg-[#6D5DF6] mt-1.5 flex-shrink-0" />
                          {t}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={track.href}
                      className="inline-flex items-center gap-1.5 text-sm text-[#6D5DF6] font-semibold hover:gap-2.5 transition-all mt-auto"
                    >
                      {d.cta} <ArrowRight size={13} />
                    </Link>
                    <TrackPreview ar={ar} items={preview} />
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Knowledge areas */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="mb-10 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418]">
              {ar ? 'محاور معرفية مرتبطة مباشرة بأداء الأعمال.' : 'Knowledge areas directly connected to business performance.'}
            </h2>
            <p className="text-sm text-[#4F555E] mt-3">
              {ar
                ? 'نختار موضوعاتنا بناءً على الأسئلة التي تواجه الشركات فعلًا عند النمو أو التحول الرقمي. كيف نزيد العائد؟ كيف نفهم العميل؟ كيف نحسن القرار؟ كيف نقلل الهدر؟ وكيف نستخدم التقنية دون أن تتحول إلى عبء؟'
                : 'We choose topics based on the questions companies actually face during growth or digital transformation. How do we increase return? How do we understand the customer? How do we improve decision-making? How do we reduce waste? How do we use technology without turning it into a burden?'}
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {knowledgeAreas.map((area, i) => (
              <ScrollReveal key={i} delay={Math.min(i * 0.05, 0.3)}>
                <div className="p-5 border border-[#E5E5E5] rounded-2xl h-full">
                  <h3 className="text-sm font-bold text-[#101418] mb-2 leading-snug">{ar ? area.ar.title : area.en.title}</h3>
                  <p className="text-xs text-[#4F555E] leading-relaxed">{ar ? area.ar.desc : area.en.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Who these resources are for */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-5 leading-tight">
              {ar ? 'للقادة والفرق التي تريد فهمًا أعمق قبل الاستثمار في التقنية.' : 'For leaders and teams who want deeper understanding before investing in technology.'}
            </h2>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-6">
              {ar
                ? 'هذه الموارد موجهة لأصحاب الأعمال، المديرين التنفيذيين، فرق النمو، المبيعات، التشغيل، التسويق، ومؤسسي المشاريع الذين يريدون اتخاذ قرارات رقمية مبنية على فهم واضح للتحدي، لا على اختيار أداة أو تقنية لمجرد أنها منتشرة.'
                : 'These resources are designed for business owners, executives, growth teams, sales teams, operations teams, marketing teams, and founders who want digital decisions based on a clear understanding of the challenge, not on choosing a tool simply because it is popular.'}
            </p>
            <ul className="space-y-2.5">
              {audienceList.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#4F555E]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6D5DF6] mt-1.5 flex-shrink-0" />
                  {ar ? item.ar : item.en}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* Latest resources */}
      {latestAll.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <ScrollReveal className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#101418]">
                {ar ? 'أحدث الرؤى والتحليلات' : 'Latest Insights & Analysis'}
              </h2>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {latestAll.map((item, i) => (
                <ScrollReveal key={item.key} delay={Math.min(i * 0.05, 0.3)}>
                  <Link
                    to={item.href}
                    className="group block h-full p-5 border border-[#E5E5E5] rounded-2xl hover:border-[#6D5DF6] hover:shadow-md active:scale-[0.98] active:border-[#6D5DF6] transition-all duration-200"
                  >
                    <span className="text-[10px] px-2.5 py-1 bg-[#EEEAFE] text-[#6D5DF6] rounded-full font-semibold mb-3 inline-block">
                      {typeLabel(item.type, ar)}
                    </span>
                    <h3 className="text-sm font-bold text-[#101418] mb-3 leading-snug line-clamp-2">{item.title}</h3>
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#6D5DF6] font-semibold group-hover:gap-2.5 transition-all">
                      {ar ? 'اقرأ المزيد' : 'Read More'} <ArrowRight size={12} />
                    </span>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured fixed content */}
      {(featuredResearch || featuredCase) && (
        <section className="py-16 bg-[#FAFAFA]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <ScrollReveal className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#101418]">
                {ar ? 'مختارات من إنسديم' : 'Selected by Ensdim'}
              </h2>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 gap-5">
              {featuredResearch && (
                <ScrollReveal>
                  <Link
                    to={`/research/${featuredResearch.slug}`}
                    className="group block h-full p-6 bg-white border border-[#E5E5E5] rounded-2xl hover:border-[#6D5DF6] hover:shadow-md active:scale-[0.98] active:border-[#6D5DF6] transition-all duration-200"
                  >
                    <span className="text-[10px] px-2.5 py-1 bg-[#EEEAFE] text-[#6D5DF6] rounded-full font-semibold mb-3 inline-block">
                      {ar ? 'بحث' : 'Research'}
                    </span>
                    <h3 className="text-base font-bold text-[#101418] mb-4 leading-snug">{ar ? featuredResearch.title_ar : featuredResearch.title_en}</h3>
                    <span className="inline-flex items-center gap-1.5 text-sm text-[#6D5DF6] font-semibold group-hover:gap-2.5 transition-all">
                      {ar ? 'اقرأ المورد' : 'Read Resource'} <ArrowRight size={13} />
                    </span>
                  </Link>
                </ScrollReveal>
              )}
              {featuredCase && (
                <ScrollReveal delay={0.06}>
                  <Link
                    to={`/case-studies/${featuredCase.slug}`}
                    className="group block h-full p-6 bg-white border border-[#E5E5E5] rounded-2xl hover:border-[#6D5DF6] hover:shadow-md active:scale-[0.98] active:border-[#6D5DF6] transition-all duration-200"
                  >
                    <span className="text-[10px] px-2.5 py-1 bg-[#EEEAFE] text-[#6D5DF6] rounded-full font-semibold mb-3 inline-block">
                      {ar ? 'دراسة حالة' : 'Case Study'}
                    </span>
                    <h3 className="text-base font-bold text-[#101418] mb-4 leading-snug">{ar ? featuredCase.title_ar : featuredCase.title_en}</h3>
                    <span className="inline-flex items-center gap-1.5 text-sm text-[#6D5DF6] font-semibold group-hover:gap-2.5 transition-all">
                      {ar ? 'شاهد الدراسة' : 'View Case Study'} <ArrowRight size={13} />
                    </span>
                  </Link>
                </ScrollReveal>
              )}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <FAQSection
        title={ar ? 'أسئلة شائعة حول موارد إنسديم' : 'Frequently Asked Questions About Ensdim Resources'}
        faqs={ar ? [
          { question: 'ما نوع الموارد التي تقدمها إنسديم؟', answer: 'نقدم أبحاثًا، مقالات تحليلية، ودراسات حالة تركز على ذكاء الأعمال، النمو، تجربة المستخدم، البيانات، الأتمتة، والأنظمة الرقمية المؤثرة في أداء الشركات.' },
          { question: 'هل موارد إنسديم تقنية فقط؟', answer: 'لا. نحن نكتب عن التقنية من زاوية تأثيرها على البزنس، من القرار والتشغيل إلى تجربة العميل، المبيعات، التكلفة، النمو، والعائد.' },
          { question: 'هل المحتوى مناسب لأصحاب الأعمال غير التقنيين؟', answer: 'نعم. نحرص على شرح المفاهيم بلغة عملية تساعد صاحب العمل أو المدير على فهم الأثر قبل الدخول في التفاصيل التقنية.' },
          { question: 'هل المحتوى متاح بالعربية والإنجليزية؟', answer: 'نهدف إلى تقديم الموارد الأساسية باللغتين العربية والإنجليزية، خصوصًا الموضوعات المرتبطة بخدمات إنسديم وحلولها ودراسات الحالة.' },
          { question: 'كيف تختلف موارد إنسديم عن المحتوى العام عن الذكاء الاصطناعي أو التقنية؟', answer: 'نحن لا نكتب عن التقنية كاتجاه عام فقط. نربط كل فكرة بسؤال عملي، فنوضح كيف تؤثر على العميل، الفريق، التشغيل، القرار، الربحية، أو العائد.' },
        ] : [
          { question: 'What type of resources does Ensdim provide?', answer: 'We provide research, analytical insights, and case studies focused on business intelligence, growth, user experience, data, automation, and digital systems that affect company performance.' },
          { question: 'Are Ensdim Resources only technical?', answer: 'No. We write about technology through its impact on business: decision-making, operations, customer experience, sales, cost, growth, and return.' },
          { question: 'Is the content suitable for non-technical business owners?', answer: 'Yes. We explain concepts in practical language that helps owners and managers understand the impact before going into technical detail.' },
          { question: 'Is the content available in Arabic and English?', answer: 'We aim to provide core resources in both Arabic and English, especially topics related to Ensdim services, solutions, and case studies.' },
          { question: 'How are Ensdim Resources different from general AI or technology content?', answer: 'We do not write about technology as a trend only. We connect every idea to a practical question, exploring how it affects the customer, team, operations, decision-making, profitability, or return.' },
        ]}
      />

      {/* Final CTA */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-[#EEEAFE] border border-[#DDD8FB] rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl font-bold text-[#101418] mb-3">
            {ar ? 'لديك تحدٍ يحتاج تحليلًا أعمق؟' : 'Do you have a challenge that needs deeper analysis?'}
          </h2>
          <p className="text-sm text-[#4F555E] mb-6 max-w-xl mx-auto">
            {ar
              ? 'إذا كان لديك تحدٍ في النمو، المتابعة، تجربة العميل، التشغيل، البيانات، أو استخدام التقنية داخل عملك، يمكننا مساعدتك على فهمه وتحويله إلى مسار رقمي أوضح.'
              : 'If you have a challenge in growth, follow-up, customer experience, operations, data, or the use of technology inside your business, we can help you understand it and turn it into a clearer digital path.'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] active:scale-[0.98] transition-all duration-200 text-sm font-semibold">
              {ar ? 'شارك تحدي عملك' : 'Share Your Business Challenge'} <ArrowRight size={15} />
            </Link>
            <Link to="/solutions" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[#6D5DF6]/30 text-[#3B2A78] hover:border-[#6D5DF6] hover:bg-white active:scale-[0.98] transition-all duration-200 text-sm font-semibold">
              {ar ? 'استكشف الحلول' : 'Explore Solutions'}
            </Link>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
