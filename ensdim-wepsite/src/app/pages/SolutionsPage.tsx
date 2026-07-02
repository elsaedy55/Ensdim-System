import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHero } from '../components/PageHero';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';
import { FAQSection } from '../components/FAQSection';
import { useCaseStudies } from '../../hooks/useContent';

/**
 * Solution cards link to the closest existing solution page until the
 * official slugs are finalized (see solution renaming notes in
 * SolutionDetailPage.tsx). Two problems referenced in the brief
 * ("Visitors are not turning into clear requests" and "The data exists,
 * but it is not helping you make decisions") have no page yet and are
 * intentionally omitted from the problem list below.
 */

const solutionCards = [
  { slug: 'follow-up-systems', en: { title: 'Follow-up that prevents lost opportunities', condition: 'You need this if you still rely on WhatsApp, Excel, or team memory to capture customers and follow up on opportunities.', roi: 'Main return: fewer lost leads, faster follow-up, and better conversion from inquiry to request.' }, ar: { title: 'متابعة تمنع ضياع الفرص', condition: 'تحتاجه إذا كنت ما زلت تعتمد على واتساب أو اكسيل أو ذاكرة الموظفين في تسجيل العملاء ومتابعة الفرص.', roi: 'العائد الأساسي: تقليل العملاء الضائعين، تحسين سرعة المتابعة، ورفع التحويل من استفسار إلى طلب.' } },
  { slug: 'digital-experiences', en: { title: 'Visits that turn into clear requests', condition: 'You need this if your website, campaigns, or landing pages bring visitors but do not clearly turn them into requests or bookings.', roi: 'Main return: higher conversion, clearer customer journeys, and better return on marketing spend.' }, ar: { title: 'زيارات تتحول إلى طلبات', condition: 'تحتاجه إذا كان لديك موقع أو حملات أو صفحات هبوط تجلب زيارات، لكن لا تتحول بوضوح إلى طلبات أو حجوزات.', roi: 'العائد الأساسي: رفع التحويل، تحسين وضوح رحلة العميل، وزيادة العائد من الإنفاق التسويقي.' } },
  { slug: 'visibility-insights', en: { title: 'Faster decisions instead of guessing', condition: 'You need this if you have sales, branches, campaigns, or daily data but cannot see the full picture at the right time.', roi: 'Main return: faster decisions, clearer performance visibility, and less dependence on delayed reports.' }, ar: { title: 'قرار أسرع بدل التخمين', condition: 'تحتاجه إذا كان لديك مبيعات، فروع، حملات، أو بيانات يومية، لكن لا ترى الصورة الكاملة في الوقت المناسب.', roi: 'العائد الأساسي: قرارات أسرع، رؤية أوضح للأداء، وتقليل الاعتماد على التقارير المتأخرة.' } },
  { slug: 'automation-layers', en: { title: 'Lower cost and less pressure', condition: 'You need this if your team spends too much time on repeated tasks that could be organized or automated.', roi: 'Main return: less waste, lower team pressure, and less need to hire more people every time the business grows.' }, ar: { title: 'تكلفة أقل وضغط أقل', condition: 'تحتاجه إذا كان فريقك يستهلك وقتًا كبيرًا في مهام متكررة كان يمكن تنظيمها أو أتمتتها.', roi: 'العائد الأساسي: تقليل الهدر، تخفيف ضغط الفريق، وخفض الحاجة للتوظيف الزائد مع كل نمو.' } },
  { slug: 'customer-journey-systems', en: { title: 'Scalable operations', condition: 'You need this if your business is growing, but operations still depend heavily on people, and every increase in demand creates more chaos.', roi: 'Main return: clear operating flows that can handle more customers, team members, branches, and requests.' }, ar: { title: 'تشغيل قابل للتوسع', condition: 'تحتاجه إذا بدأ نشاطك يكبر، لكن التشغيل لا يزال يعتمد على الأشخاص فقط، وكل زيادة في العملاء تضيف فوضى أكبر.', roi: 'العائد الأساسي: تحويل التشغيل إلى مسارات واضحة تستطيع تحمل زيادة العملاء والفريق والفروع.' } },
  { slug: 'ai-practical-decisions', en: { title: 'Smart visibility that detects opportunities early', condition: 'You need this if you want your data to turn into practical signals that reveal drops and opportunities before it is too late.', roi: 'Main return: earlier discovery of opportunities, clearer management alerts, and better decisions based on real signals.' }, ar: { title: 'رؤية ذكية تكشف الفرص مبكرًا', condition: 'تحتاجه إذا كنت تريد أن تتحول البيانات إلى إشارات عملية تكشف الانخفاضات والفرص قبل فوات الوقت.', roi: 'العائد الأساسي: اكتشاف فرص التحسين مبكرًا، تنبيه الإدارة، وتوجيه القرار بناءً على إشارات واضحة.' } },
];

const stages = [
  { slug: 'build', en: { title: 'Build', desc: 'You have a new idea or business and need a clear digital foundation that presents your offer, receives requests, and turns early interest into real opportunities.' }, ar: { title: 'بناء', desc: 'لديك فكرة أو نشاط جديد وتحتاج أساسًا رقميًا واضحًا يساعدك على الظهور، شرح عرضك، استقبال الطلبات، وتحويل الاهتمام الأول إلى فرص حقيقية.' } },
  { slug: 'start', en: { title: 'Start', desc: 'You already have an operating business, but follow-up and operations are scattered across WhatsApp, Excel, and team memory. You need organization that reduces loss and pressure.' }, ar: { title: 'انطلاق', desc: 'لديك عمل قائم بالفعل، لكن المتابعة والتشغيل أصبحا موزعين بين واتساب والاكسيل وذاكرة الفريق. هنا تحتاج تنظيمًا يقلل الضياع والضغط.' } },
  { slug: 'growth', en: { title: 'Growth', desc: 'You have customers, data, a larger team, or multiple branches, but growth is creating more pressure. You need clearer visibility and smarter automation.' }, ar: { title: 'نمو', desc: 'لديك عملاء وبيانات وفريق أو فروع أكبر، لكن النمو بدأ يخلق ضغطًا أعلى. هنا تحتاج رؤية أوضح، أتمتة أذكى، وتحكمًا يساعدك على التوسع.' } },
];

const problemSlugs: { en: string; ar: string; slug: string | null }[] = [
  { en: 'Customers and opportunities are lost before they turn into sales', ar: 'العملاء والفرص تضيع قبل ما تتحول لمبيعات', slug: 'leads-get-lost' },
  { en: 'Visitors are not turning into clear requests', ar: 'الزوار لا يتحولون إلى طلبات واضحة', slug: 'visitors-not-converting' },
  { en: 'Manual operations drain the team and increase costs', ar: 'التشغيل اليدوي يستهلك الفريق ويرفع التكلفة', slug: 'repeated-work' },
  { en: 'Slow response reduces trust and loses ready-to-buy customers', ar: 'الرد المتأخر يقلل الثقة ويخسر عملاء جاهزين', slug: 'slow-response' },
  { en: 'Management cannot see the full picture in time', ar: 'الإدارة لا ترى الصورة كاملة في الوقت المناسب', slug: 'no-visibility' },
  { en: 'The data exists, but it is not helping you make decisions', ar: 'البيانات موجودة… لكنها لا تساعدك على القرار', slug: 'data-not-helping-decisions' },
];

const howWeChoose = [
  { en: { title: 'Understand the workflow', desc: 'How does the customer enter? Who responds? Where is data stored? Who follows up?' }, ar: { title: 'نفهم طريقة العمل', desc: 'كيف يدخل العميل؟ من يرد؟ أين تسجل البيانات؟ ومن يتابع؟' } },
  { en: { title: 'Identify the loss point', desc: 'Is the loss happening in response, follow-up, conversion, operations, or decision-making?' }, ar: { title: 'نحدد نقطة الخسارة', desc: 'هل الخسارة في الرد، المتابعة، التحويل، التشغيل، أو القرار؟' } },
  { en: { title: 'Design the solution path', desc: 'We define what your business actually needs: follow-up, conversion, dashboards, automation, or scalable operations.' }, ar: { title: 'نصمم مسار الحل', desc: 'نحدد ما يحتاجه نشاطك فعليًا: متابعة، تحويل، لوحة بيانات، أتمتة، أو تشغيل قابل للتوسع.' } },
  { en: { title: 'Build and connect', desc: 'We connect the solution with your website, WhatsApp, forms, data, or current systems when needed.' }, ar: { title: 'نبني ونربط', desc: 'نربط الحل مع الموقع، واتساب، النماذج، البيانات، أو أنظمة العمل الحالية حسب الحاجة.' } },
  { en: { title: 'Measure the return', desc: 'We measure improvement in conversion, response speed, reduced waste, management visibility, or team pressure.' }, ar: { title: 'نقيس العائد', desc: 'نقيس التحسن في التحويل، سرعة الرد، تقليل الهدر، وضوح الإدارة، أو ضغط الفريق.' } },
];

function RelatedCaseStudies({ ar }: { ar: boolean }) {
  const { data: allStudies = [] } = useCaseStudies();
  const studies = allStudies.slice(0, 4);

  if (studies.length === 0) return null;

  return (
    <section className="py-16 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#101418]">{ar ? 'دراسات حالة مرتبطة' : 'Related case studies'}</h2>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {studies.map((s, i) => (
            <ScrollReveal key={s.slug} delay={i * 0.06}>
              <Link
                to={`/case-studies/${s.slug}`}
                className="group block h-full border border-[#E5E5E5] rounded-2xl p-5 bg-white hover:border-[#6D5DF6] hover:shadow-md active:scale-[0.98] active:border-[#6D5DF6] transition-all duration-200"
              >
                <span className="text-[10px] px-2.5 py-1 bg-[#EEEAFE] text-[#6D5DF6] rounded-full font-semibold mb-3 inline-block">
                  {ar ? s.sector_ar : s.sector_en}
                </span>
                <h3 className="text-sm font-bold text-[#101418] mb-3 leading-snug">{ar ? s.title_ar : s.title_en}</h3>
                <span className="inline-flex items-center gap-1.5 text-xs text-[#6D5DF6] font-medium group-hover:gap-2.5 transition-all">
                  {ar ? 'عرض دراسة الحالة' : 'View case study'} <ArrowRight size={12} />
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SolutionsPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <SEO
        title={ar ? 'حلول تشغيل ونمو ذكية | إنسديم' : 'Smart operations and growth solutions | ENSDIM'}
        description={ar
          ? 'نربط رحلة العميل، المتابعة، التشغيل، البيانات، والأتمتة داخل حلول تساعدك على تقليل ضياع الفرص، رفع التحويل، وتسهيل إدارة العمل.'
          : 'We connect the customer journey, follow-up, operations, data, and automation inside solutions that help you reduce lost opportunities and improve conversion.'}
        canonical="/solutions"
        lang={ar ? 'ar' : 'en'}
      />
      <PageHero
        eyebrow={ar ? 'حلول إنسديم' : 'Ensdim Solutions'}
        title={ar ? 'حلول تشغيل ونمو ذكية للأعمال التي تريد وضوحًا وتحويلًا أفضل.' : 'Smart operations and growth solutions for businesses that need clearer control and better conversion.'}
        subtitle={ar
          ? 'نربط رحلة العميل، المتابعة، التشغيل، البيانات، والأتمتة داخل حلول تساعدك على تقليل ضياع الفرص، رفع التحويل، وتسهيل إدارة العمل دون إضافة ضغط جديد على فريقك.'
          : 'We connect the customer journey, follow-up, operations, data, and automation inside solutions that help you reduce lost opportunities, improve conversion, and manage work more clearly without adding more pressure to your team.'}
        breadcrumbs={[{ label: 'Solutions', labelAr: 'الحلول', href: '/solutions' }]}
        lang={ar ? 'ar' : 'en'}
      />

      {/* Secondary hero CTA scrolls within this page */}
      <div className="bg-[#0f0d19] pt-2 pb-10 sm:pb-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => scrollTo('problems')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white/80 hover:border-white/40 hover:text-white active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
          >
            {ar ? 'ابدأ من المشكلة' : 'Start from the problem'}
          </button>
        </div>
      </div>

      {/* What does Ensdim offer? */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-5">{ar ? 'ما الذي تقدمه إنسديم؟' : 'What does Ensdim offer?'}</h2>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-4">
              {ar
                ? 'لا نقدم أدوات منفصلة أو خدمات تقنية متفرقة. نبني حلولًا تربط بين جذب العميل، المتابعة، التشغيل، البيانات، والأتمتة، بحيث تتحول طريقة عملك من مجهود يدوي متفرق إلى نظام أوضح يمكن قياسه وتحسينه.'
                : 'We do not offer disconnected tools or scattered technical services. We build solutions that connect customer acquisition, follow-up, operations, data, and automation, so your work moves from scattered manual effort to a clearer system that can be measured and improved.'}
            </p>
            <p className="text-sm text-[#4F555E] leading-relaxed">
              {ar
                ? 'كل حل يتم تصميمه حول طريقة عمل نشاطك الفعلية: كيف يدخل العميل، أين تضيع المتابعة، ما الذي يستهلك وقت الفريق، وما الرقم الذي تريد تحسينه.'
                : 'Each solution is designed around how your business actually works: how customers enter, where follow-up is lost, what consumes your team’s time, and which number you want to improve.'}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Where is your business now? */}
      <section id="where-now" className="py-16 bg-[#EEEAFE] scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-2">{ar ? 'أين عملك الآن؟' : 'Where is your business now?'}</h2>
            <p className="text-sm text-[#4F555E] max-w-2xl">
              {ar
                ? 'اختر المرحلة الأقرب لوضع عملك الآن. كل مرحلة تقودك إلى نوع الحلول التي تناسب احتياجك الحقيقي بدل أن تبدأ من اسم خدمة أو تقنية.'
                : 'Choose the stage that best reflects where your business is today. Each stage leads to the type of solutions that fit your real need instead of starting from a service or technology name.'}
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-5">
            {stages.map((st, i) => (
              <ScrollReveal key={st.slug} delay={i * 0.08}>
                <Link id={st.slug} to={`/solutions/${st.slug}`} className="block bg-white rounded-2xl p-6 border border-[#E5E5E5] hover:border-[#6D5DF6] hover:shadow-md active:scale-[0.98] active:border-[#6D5DF6] transition-all duration-200 group h-full scroll-mt-32">
                  <h3 className="text-lg font-bold text-[#101418] mb-2">{ar ? st.ar.title : st.en.title}</h3>
                  <p className="text-sm text-[#4F555E] mb-4">{ar ? st.ar.desc : st.en.desc}</p>
                  <span className="inline-flex items-center gap-1 text-sm text-[#6D5DF6] font-medium group-hover:gap-2 group-active:gap-2 transition-all">
                    {ar ? 'اعرف أكثر' : 'Learn more'} <ArrowRight size={13} />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions based on your business need */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-2">{ar ? 'الحلول المناسبة حسب احتياج عملك' : 'Solutions based on your business need'}</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {solutionCards.map((s, i) => (
              <ScrollReveal key={s.slug} delay={i * 0.06}>
                <Link to={`/solutions/${s.slug}`} className="group border border-[#E5E5E5] rounded-2xl p-6 hover:border-[#6D5DF6] hover:shadow-md active:scale-[0.98] active:border-[#6D5DF6] transition-all duration-200 h-full flex flex-col">
                  <h3 className="text-base font-bold text-[#101418] mb-3 leading-snug">{ar ? s.ar.title : s.en.title}</h3>
                  <p className="text-sm text-[#4F555E] leading-relaxed mb-3">{ar ? s.ar.condition : s.en.condition}</p>
                  <p className="text-xs text-[#6D5DF6] font-medium mb-4">{ar ? s.ar.roi : s.en.roi}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm text-[#6D5DF6] font-semibold mt-auto group-hover:gap-2.5 group-active:gap-2.5 transition-all">
                    {ar ? 'اعرف الحل' : 'Explore this solution'} <ArrowRight size={13} />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Start from the problem */}
      <section id="problems" className="py-16 bg-[#FAFAFA] scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-2">{ar ? 'ابدأ من المشكلة التي تواجهك' : 'Start from the problem you face'}</h2>
            <p className="text-sm text-[#4F555E]">
              {ar
                ? 'إذا لم تكن متأكدًا من الحل المناسب، ابدأ من المشكلة الأقرب لما يحدث داخل عملك. كل مشكلة تفتح صفحة مستقلة تشرح الأثر، الحل المقترح، ودراسة الحالة المرتبطة.'
                : 'If you are not sure which solution fits your business, start from the problem closest to what happens in your daily work. Each problem opens a dedicated page explaining the impact, recommended solution, and related case study.'}
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {problemSlugs.filter((p) => p.slug).map((p, i) => (
              <ScrollReveal key={p.slug} delay={i * 0.05}>
                <Link
                  to={`/problems/${p.slug}`}
                  className="group flex items-center justify-between gap-3 px-5 py-4 bg-white border border-[#E5E5E5] rounded-xl hover:border-[#6D5DF6] hover:shadow-md active:scale-[0.98] active:border-[#6D5DF6] transition-all duration-200"
                >
                  <span className="text-sm font-medium text-[#101418]">{ar ? p.ar : p.en}</span>
                  <ArrowRight size={14} className="text-[#6D5DF6] flex-shrink-0 group-hover:translate-x-0.5 group-active:translate-x-0.5 transition-transform" />
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <Link to="/solutions/problems" className="inline-flex items-center gap-2 text-[#6D5DF6] text-sm font-semibold hover:underline">
              {ar ? 'اختر المشكلة الأقرب لعملك' : 'Choose the problem closest to your business'} <ArrowRight size={13} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* How we choose the right solution */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-2">{ar ? 'كيف نختار الحل المناسب لك؟' : 'How do we choose the right solution for you?'}</h2>
            <p className="text-sm text-[#4F555E] max-w-3xl">
              {ar
                ? 'لا نبدأ من اسم الحل. نبدأ من طريقة عملك الحالية، ثم نحدد أين يحدث الهدر، وأين تضيع الفرص، وما المسار الأقرب لتحسين العائد.'
                : 'We do not start from the solution name. We start from how your business currently works, then identify where waste happens, where opportunities are lost, and which path is most likely to improve return.'}
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {howWeChoose.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="p-6 border border-[#E5E5E5] rounded-2xl h-full hover:border-[#6D5DF6]/40 hover:shadow-[0_8px_24px_rgba(109,93,246,0.08)] transition-all duration-300">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#EEEAFE] text-[#6D5DF6] text-sm font-bold mb-4">{i + 1}</span>
                  <h3 className="text-sm font-bold text-[#101418] mb-2">{ar ? step.ar.title : step.en.title}</h3>
                  <p className="text-xs text-[#4F555E] leading-relaxed">{ar ? step.ar.desc : step.en.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <RelatedCaseStudies ar={ar} />

      <FAQSection
        title={ar ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
        faqs={ar ? [
          { question: 'هل أحتاج حلًا كاملًا أم يمكن البدء بمشكلة واحدة؟', answer: 'يمكن البدء بمشكلة واحدة واضحة، مثل المتابعة أو التحويل أو الرؤية، ثم توسيع الحل تدريجيًا حسب النتائج.' },
          { question: 'هل هذه الحلول مناسبة للشركات الصغيرة والمتوسطة؟', answer: 'نعم، صممت هذه الحلول للشركات التي لديها عملاء فعليين وتشعر بضغط في المتابعة أو التشغيل أو النمو.' },
          { question: 'كيف أعرف أن الحل سيحقق عائدًا؟', answer: 'نحدد قبل البناء الرقم الذي نريد تحسينه: التحويل، سرعة الرد، تقليل الهدر، وضوح البيانات، أو ضغط الفريق، ثم نقيس التحسن بعد التنفيذ.' },
          { question: 'هل أحتاج تغيير كل طريقة عملي الحالية؟', answer: 'ليس بالضرورة. الهدف هو تنظيم وربط ما يعمل بالفعل، ثم تقليل الفوضى والهدر خطوة بخطوة.' },
        ] : [
          { question: 'Do I need a full solution, or can we start with one problem?', answer: 'You can start with one clear problem, such as follow-up, conversion, visibility, or operations, then expand the solution gradually based on results.' },
          { question: 'Are these solutions suitable for small and medium businesses?', answer: 'Yes. These solutions are designed for businesses that already have customers and feel pressure in follow-up, operations, or growth.' },
          { question: 'How do I know the solution will create a return?', answer: 'Before building, we define the number we want to improve: conversion, response speed, reduced waste, data visibility, or team pressure. Then we measure the improvement after implementation.' },
          { question: 'Do I need to change my entire way of working?', answer: 'Not necessarily. The goal is to organize and connect what already works, then reduce chaos and waste step by step.' },
        ]}
      />

      {/* Final CTA */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-[#EEEAFE] border border-[#DDD8FB] rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl font-bold text-[#101418] mb-3">{ar ? 'لست متأكدًا من الحل المناسب؟' : 'Not sure which solution fits your business?'}</h2>
          <p className="text-sm text-[#4F555E] mb-6 max-w-xl mx-auto">
            {ar
              ? 'شاركنا كيف يدخل العميل إلى نشاطك، وكيف تتم المتابعة، وما الذي يستهلك وقت فريقك — وسنساعدك على تحديد الحل الأقرب لتحقيق عائد واضح.'
              : 'Tell us how customers enter your business, how follow-up happens, and what consumes your team’s time — and we will help you identify the closest solution to create a clear return.'}
          </p>
          <Link to="/book-consultation" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] active:scale-[0.98] transition-all duration-200 text-sm font-semibold">
            {ar ? 'احجز استشارة تشخيصية' : 'Book a diagnostic consultation'} <ArrowRight size={15} />
          </Link>
        </div>
        </div>
      </section>
    </>
  );
}
