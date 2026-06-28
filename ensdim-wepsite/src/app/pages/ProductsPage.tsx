import { Link } from 'react-router';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';
import { FAQSection } from '../components/FAQSection';

const products = [
  {
    slug: 'agricultural-operations-workspace',
    en: {
      title: 'Agricultural Operations Workspace',
      status: 'Available for implementation and customization',
      bestFor: 'Agricultural maintenance companies, garden maintenance providers, palm care companies, agricultural contracting teams, and similar field-service businesses.',
      desc: 'A system that helps companies manage contracts, customers, visits, supervisors, workers, payments, and reports from one place.',
      organize: ['Contracts and customers', 'Field visits', 'Supervisor app or interface', 'Customer app or interface', 'Execution documentation with photos and location', 'Online payment collection', 'Management dashboard', 'Clearer operational reports'],
      impact: [
        'Clearer follow-up for the team and customers, faster access to data, online payment collection, and real-time visibility into work progress.',
        'More accurate execution of visits and tasks, stronger customer retention, less manual operating time, and easier team management.',
      ],
      buttons: [
        { label: 'View Product', href: '/products/agricultural-operations-workspace' },
        { label: 'View a Successful Case Study', href: '/case-studies/bustan-amari-operations-system' },
      ],
    },
    ar: {
      title: 'منظومة تشغيل شركات الصيانة والمقاولات الزراعية',
      status: 'متاح للتنفيذ والتخصيص',
      bestFor: 'شركات الصيانة الزراعية، صيانة الحدائق، النخيل، المقاولات الزراعية، والخدمات الميدانية المشابهة.',
      desc: 'نظام يساعد الشركات على إدارة العقود، العملاء، الزيارات، المشرفين، العمالة، المدفوعات، والتقارير من مكان واحد.',
      organize: ['إدارة العقود والعملاء', 'متابعة الزيارات الميدانية', 'تطبيق أو واجهة للمشرفين', 'تطبيق أو واجهة للعملاء', 'توثيق التنفيذ بالصور والموقع', 'استقبال المدفوعات إلكترونيًا', 'Dashboard للإدارة', 'تقارير تشغيلية أوضح'],
      impact: [
        'متابعة أوضح للفريق والعميل، مع وصول أسرع للبيانات، استقبال مدفوعات إلكترونيًا، ورؤية لحظية لسير العمل.',
        'تنفيذ أدق للزيارات والمهام، احتفاظ أفضل بالعملاء، وقت أقل في التشغيل اليدوي، وإدارة أسهل للفريق.',
      ],
      buttons: [
        { label: 'عرض المنتج', href: '/products/agricultural-operations-workspace' },
        { label: 'شاهد دراسة حالة ناجحة', href: '/case-studies/bustan-amari-operations-system' },
      ],
    },
  },
  {
    slug: 'real-estate-follow-up-ai',
    en: {
      title: 'Real Estate Follow-up AI',
      status: 'Under study / Available as a custom model on request',
      bestFor: 'Real estate companies, developers, and teams handling a high volume of leads and inquiries.',
      desc: 'A product that helps follow up with customers, classify inquiries, summarize conversations, and connect communication to a clearer sales pipeline.',
      organize: ['Leads', 'Inquiry sources', 'Conversation summaries', 'Customer intent classification', 'Follow-up priorities', 'Opportunity status inside the sales pipeline'],
      impact: [
        'Reduces lost leads and helps the sales team follow up on every opportunity with more clarity.',
        'Supports faster response, better conversion, and clearer visibility into the sales pipeline.',
      ],
      buttons: [
        { label: 'View Product', href: '/products/real-estate-follow-up-ai' },
        { label: 'Tell Us About Your Need', href: '/products/find-fit?product=real-estate-follow-up-ai' },
      ],
    },
    ar: {
      title: 'Real Estate Follow-up AI',
      status: 'تحت الدراسة / متاح كنموذج مخصص حسب الطلب',
      bestFor: 'شركات العقارات، التطوير العقاري، والفرق التي تتعامل مع عدد كبير من العملاء والاستفسارات.',
      desc: 'منتج يساعد على متابعة العملاء، تصنيف الاستفسارات، تلخيص المحادثات، وربط التواصل بمسار مبيعات أوضح.',
      organize: ['العملاء المحتملين', 'مصادر الاستفسارات', 'ملخصات المحادثات', 'تصنيف نية العميل', 'أولويات المتابعة', 'حالة كل فرصة داخل مسار البيع'],
      impact: [
        'يقلل ضياع العملاء المحتملين ويساعد فريق المبيعات على متابعة كل فرصة بوضوح.',
        'يدعم سرعة الرد، تحسين التحويل، ورؤية أوضح لمسار البيع.',
      ],
      buttons: [
        { label: 'عرض المنتج', href: '/products/real-estate-follow-up-ai' },
        { label: 'أخبرنا باحتياجك', href: '/products/find-fit?product=real-estate-follow-up-ai' },
      ],
    },
  },
  {
    slug: 'clinics-workspace',
    en: {
      title: 'Clinics Workspace',
      status: 'Under study',
      bestFor: 'Clinics and medical centers that need better appointment management, follow-up, and patient experience.',
      desc: 'A product that helps clinics manage appointments, patient reminders, automatic patient file creation inside the system, case follow-up, and management visibility.',
      organize: ['Appointments', 'Patient files', 'Reminders', 'Post-visit follow-up', 'Customer data', 'Team workflow', 'Reports'],
      impact: [
        'Reduces reception pressure and organizes patient data, appointments, and follow-up.',
        'Helps reduce missed appointments, improve patient experience, and give management clearer visibility into performance.',
      ],
      buttons: [
        { label: 'View Product', href: '/products/clinics-workspace' },
        { label: 'Tell Us About Your Need', href: '/products/find-fit?product=clinics-workspace' },
      ],
    },
    ar: {
      title: 'Clinics Workspace',
      status: 'تحت الدراسة',
      bestFor: 'العيادات والمراكز الطبية التي تحتاج تنظيم الحجز، المتابعة، وتجربة المريض.',
      desc: 'منتج يساعد العيادات على إدارة المواعيد، تذكير المرضى، إنشاء ملف تلقائي لكل مريض داخل النظام، متابعة الحالات، وتنظيم رؤية الإدارة للأداء.',
      organize: ['الحجوزات', 'ملفات المرضى', 'التذكيرات', 'المتابعة بعد الزيارة', 'بيانات العملاء', 'الفريق', 'التقارير'],
      impact: [
        'يقلل ضغط الاستقبال وينظم بيانات المرضى والحجوزات والمتابعة.',
        'يساعد على تقليل المواعيد المفقودة وتحسين تجربة المريض ورؤية الإدارة للأداء.',
      ],
      buttons: [
        { label: 'عرض المنتج', href: '/products/clinics-workspace' },
        { label: 'أخبرنا باحتياجك', href: '/products/find-fit?product=clinics-workspace' },
      ],
    },
  },
];

const thinkingPoints = {
  en: ['We start from a recurring business problem.', 'We reduce the time needed to reach a working solution.', 'We customize the product around real operations.', 'We connect the product to business return, not just the interface.'],
  ar: ['نبدأ من مشكلة بزنس متكررة.', 'نختصر وقت الوصول للحل.', 'نخصص المنتج حسب التشغيل الحقيقي.', 'نربط المنتج بالعائد، لا بالواجهة فقط.'],
};

const fitChecklist = {
  en: [
    'A problem that repeats daily or weekly inside operations.',
    'Customer, visit, or booking follow-up handled manually.',
    'Heavy reliance on WhatsApp, spreadsheets, paper, or team memory.',
    'Scattered data that is hard to access when decisions are needed.',
    'A team that needs clearer task and status visibility.',
    'Customers who need clearer visibility into requests, contracts, visits, or services.',
    'Management that needs real-time reports instead of random follow-up.',
    'A need for a faster start instead of building a full system from scratch.',
  ],
  ar: [
    'مشكلة تتكرر يوميًا أو أسبوعيًا داخل التشغيل.',
    'متابعة عملاء أو زيارات أو حجوزات تتم يدويًا.',
    'اعتماد كبير على واتساب، إكسيل، الورق، أو ذاكرة الفريق.',
    'بيانات متفرقة يصعب الوصول إليها وقت القرار.',
    'فريق يحتاج طريقة أوضح لمعرفة المهام والحالات.',
    'عميل يحتاج متابعة أوضح لحالة الطلب، العقد، الزيارة، أو الخدمة.',
    'إدارة تحتاج تقارير ورؤية لحظية بدل المتابعة العشوائية.',
    'رغبة في بداية أسرع بدل بناء نظام كامل من الصفر.',
  ],
};

const successSteps = {
  en: [
    { title: 'Understanding current operations', desc: 'We review workflows, team structure, customers, data, and the main pressure point.' },
    { title: 'Defining what needs configuration', desc: 'We compare the product structure with your company’s reality to identify what needs to be adjusted or added.' },
    { title: 'Configuring workflows and permissions', desc: 'We configure statuses, roles, reports, notifications, and data according to your way of working.' },
    { title: 'Testing the product with the team', desc: 'We test usage with the team and review journey clarity before full adoption.' },
    { title: 'Launch and improvement', desc: 'We launch the product and continue improving it based on real usage and visible results.' },
  ],
  ar: [
    { title: 'فهم التشغيل الحالي', desc: 'نراجع طريقة العمل، الفريق، العملاء، البيانات، ونقطة الضغط الأساسية.' },
    { title: 'تحديد ما يحتاج إلى تهيئة', desc: 'نقارن بين بنية المنتج وواقع شركتك لتحديد ما يجب تعديله أو إضافته.' },
    { title: 'ضبط التدفقات والصلاحيات', desc: 'نهيئ الحالات، الأدوار، التقارير، التنبيهات، والبيانات حسب طريقة عملك.' },
    { title: 'تجربة المنتج مع الفريق', desc: 'نختبر الاستخدام مع الفريق، ونراجع وضوح الرحلة قبل الاعتماد الكامل.' },
    { title: 'الإطلاق والتحسين', desc: 'نطلق المنتج ثم نتابع التحسين بناءً على الاستخدام الحقيقي والنتائج التي تظهر.' },
  ],
};

const chooseProduct = {
  en: ['You want a faster start.', 'You need a practical solution for a recurring problem.', 'You want customization without starting from zero.', 'You want to reduce implementation time and risk.'],
  ar: ['تريد بداية أسرع.', 'تحتاج حلًا عمليًا لمشكلة متكررة.', 'تريد تخصيصًا دون البدء من الصفر.', 'تبحث عن تقليل وقت التنفيذ والمخاطرة.'],
};

const chooseCustom = {
  en: ['You need a fully unique experience.', 'You have complex workflows or integrations.', 'You want to build a platform or system from scratch.', 'You need a deeper discovery and analysis phase.'],
  ar: ['تحتاج تجربة مختلفة بالكامل.', 'لديك تكاملات أو عمليات معقدة.', 'تريد بناء منصة أو نظام خاص من البداية.', 'تحتاج مرحلة اكتشاف وتحليل أعمق.'],
};

export function ProductsPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  return (
    <>
      <SEO
        title={ar ? 'منتجات إنسديم | منتجات رقمية جاهزة لمشاكل تشغيل ونمو متكررة' : 'Products | ENSDIM - Digital Products for Recurring Operations & Growth Challenges'}
        description={ar
          ? 'منتجات رقمية قابلة للتخصيص تحل مشاكل المتابعة، التشغيل، البيانات، وخدمة العملاء المتكررة في الشركات.'
          : 'Customizable digital products that solve recurring follow-up, operations, data, and customer experience challenges inside companies.'}
        keywords="ENSDIM products, business automation products Middle East, operations workspace Egypt, real estate AI Saudi Arabia, clinic management UAE"
        canonical="/products"
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
            <span className="text-white/70 font-medium">{ar ? 'المنتجات' : 'Products'}</span>
          </div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5 uppercase tracking-wider bg-[#6D5DF6]/15 border border-[#6D5DF6]/20 text-[#EEEAFE]/80">
            {ar ? 'منتجات إنسديم' : 'ENSDIM Products'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight text-white">
            {ar ? 'منتجات رقمية جاهزة لمشاكل تشغيل ونمو متكررة.' : 'Digital products built for recurring operations and growth challenges.'}
          </h1>
          <p className="text-base sm:text-lg max-w-2xl leading-relaxed mb-3 text-[#EEEAFE]/75">
            {ar
              ? 'نحوّل التحديات المتكررة في المتابعة، التشغيل، البيانات، وخدمة العملاء إلى منتجات رقمية قابلة للتخصيص، تساعد الشركات على العمل بوضوح أكبر، تقليل الوقت المهدور، وتحسين العائد من التشغيل والنمو.'
              : 'We turn recurring challenges in follow-up, operations, data, and customer experience into customizable digital products that help companies work with more clarity, reduce wasted time, and improve the return from operations and growth.'}
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {(ar ? 'بداية أسرع. تخصيص أوضح. عائد قابل للقياس.' : 'Faster start. Clearer customization. Measurable return.')
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
              to="/products/find-fit"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
            >
              {ar ? 'اعرف المنتج الأنسب لتشغيل شركتك' : 'Find the best product for your operations'} <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. How ENSDIM thinks about products */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-xl sm:text-2xl font-bold text-[#101418] mb-5 leading-snug">
              {ar ? 'ليست قوالب جاهزة… وليست بناءً من الصفر في كل مرة.' : 'Not fixed templates... and not built from scratch every time.'}
            </h2>
            <p className="text-sm sm:text-base text-[#4F555E] leading-relaxed mb-4">
              {ar
                ? 'بعض مشاكل البزنس تتكرر بين شركات كثيرة: متابعة تضيع، بيانات غير واضحة، فريق يعمل يدويًا، عملاء لا يتم التواصل معهم في الوقت المناسب، أو إدارة لا ترى الصورة كاملة.'
                : 'Some business problems repeat across many companies: lost follow-ups, unclear data, manual work, customers not being contacted at the right time, or management teams unable to see the full picture.'}
            </p>
            <p className="text-sm sm:text-base text-[#4F555E] leading-relaxed mb-8">
              {ar
                ? 'منتجات إنسديم تُبنى حول هذه المشاكل المتكررة. نبدأ من حل له منطق جاهز وتجربة قابلة للتطبيق، ثم نخصصه حسب الواقع الفعلي داخل شركتك.'
                : 'Ensdim products are built around these recurring problems. We start from a solution with a ready logic and a practical experience, then customize it according to the real operating reality inside your company.'}
            </p>
            <ul className="grid sm:grid-cols-2 gap-3">
              {thinkingPoints[ar ? 'ar' : 'en'].map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#101418] font-medium bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl px-4 py-3">
                  <CheckCircle2 size={16} className="text-[#6D5DF6] flex-shrink-0 mt-0.5" />
                  {p}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. ENSDIM products library */}
      <section id="products-library" className="py-16 sm:py-20 bg-[#FAFAFA] border-t border-[#E5E5E5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-4">{ar ? 'منتجات إنسديم' : 'ENSDIM Products'}</h2>
            <p className="text-sm sm:text-base text-[#4F555E] leading-relaxed">
              {ar
                ? 'منتجات إنسديم مبنية حول مشاكل تشغيل ونمو تتكرر داخل الشركات: متابعة العملاء، تنظيم الفريق، وضوح البيانات، تقليل العمل اليدوي، وتحسين تجربة العميل. كل منتج يبدأ من منطق جاهز قابل للتطبيق، ثم يتم تهيئته حسب واقع الشركة وطريقة تشغيلها.'
                : 'Ensdim products are built around recurring operations and growth problems inside companies: customer follow-up, team organization, data clarity, reducing manual work, and improving customer experience. Each product starts from a practical ready logic, then gets configured around the company’s real operations.'}
            </p>
          </ScrollReveal>

          <div className="space-y-6">
            {products.map((p, i) => {
              const d = ar ? p.ar : p.en;
              return (
                <ScrollReveal key={p.slug} delay={i * 0.08}>
                  <div className="bg-white border border-[#E5E5E5] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="text-lg sm:text-xl font-bold text-[#101418]">{d.title}</h3>
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#EEEAFE] text-[#6D5DF6]">
                        {d.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#4F555E] mb-3"><span className="font-semibold text-[#101418]">{ar ? 'لمن يناسب؟ ' : 'Best for: '}</span>{d.bestFor}</p>
                    <p className="text-sm text-[#4F555E] leading-relaxed mb-5">{d.desc}</p>

                    <div className="grid sm:grid-cols-2 gap-8 mb-6">
                      <div>
                        <p className="text-xs font-semibold text-[#101418] mb-3 uppercase tracking-wider">{ar ? 'ما الذي يساعدك على تنظيمه؟' : 'What it helps you organize'}</p>
                        <ul className="space-y-2">
                          {d.organize.map((o, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm text-[#4F555E]">
                              <CheckCircle2 size={14} className="text-[#6D5DF6] flex-shrink-0 mt-0.5" />
                              {o}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[#101418] mb-3 uppercase tracking-wider">{ar ? 'الأثر على البزنس' : 'Business impact'}</p>
                        <ul className="space-y-3">
                          {d.impact.map((o, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm text-[#4F555E] leading-relaxed">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#D63A3A] mt-1.5 flex-shrink-0" />
                              {o}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Link
                        to={d.buttons[0].href}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#101418] text-white rounded-xl hover:bg-[#1a1d24] transition-colors text-sm font-semibold"
                      >
                        {d.buttons[0].label}
                        <ArrowRight size={14} />
                      </Link>
                      <Link
                        to={d.buttons[1].href}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#E5E5E5] text-[#101418] hover:border-[#6D5DF6] hover:text-[#6D5DF6] transition-colors text-sm font-semibold"
                      >
                        {d.buttons[1].label}
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Fit checklist */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-xl sm:text-2xl font-bold text-[#101418] mb-5 leading-snug">
              {ar ? 'كيف تعرف أن المنتج مناسب لطريقة عمل شركتك؟' : 'How Do You Know If a Product Fits the Way Your Company Works?'}
            </h2>
            <p className="text-sm sm:text-base text-[#4F555E] leading-relaxed mb-8">
              {ar
                ? 'المنتج المناسب لا يُقاس بعدد المزايا، بل بقدرته على حل نقطة ضغط حقيقية داخل التشغيل. لذلك قبل اختيار المنتج، انظر إلى طريقة عمل شركتك: أين تضيع المتابعة؟ أين يتكرر العمل اليدوي؟ وأين تحتاج الإدارة إلى رؤية أوضح؟'
                : 'The right product is not measured by the number of features it has, but by its ability to solve a real operational pressure point. Before choosing a product, look at how your company works: where follow-up gets lost, where manual work keeps repeating, and where management needs clearer visibility.'}
            </p>
            <p className="text-sm font-semibold text-[#101418] mb-4">
              {ar ? 'قد يكون المنتج مناسبًا لك إذا كان لديك:' : 'A product may fit your company if you have:'}
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 mb-8">
              {fitChecklist[ar ? 'ar' : 'en'].map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#4F555E] bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl px-4 py-3">
                  <CheckCircle2 size={16} className="text-[#6D5DF6] flex-shrink-0 mt-0.5" />
                  {p}
                </li>
              ))}
            </ul>
            <p className="text-sm text-[#4F555E] leading-relaxed">
              {ar
                ? 'إذا وجدت أكثر من عنصر ينطبق على شركتك، فغالبًا يوجد منتج يمكن تهيئته ليخدم طريقة تشغيلك.'
                : 'If more than one of these applies to your company, there is likely a product that can be configured to support the way you operate.'}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. Success process */}
      <section className="py-16 sm:py-20 bg-[#FAFAFA] border-t border-[#E5E5E5]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-xl sm:text-2xl font-bold text-[#101418] mb-5 leading-snug">
              {ar ? 'كيف نضمن أن المنتج ينجح داخل شركتك؟' : 'How We Help the Product Succeed Inside Your Company'}
            </h2>
            <p className="text-sm sm:text-base text-[#4F555E] leading-relaxed mb-10">
              {ar
                ? 'نجاح المنتج لا يحدث لأنه يحتوي على مزايا كثيرة، بل لأنه يتم ضبطه على طريقة عمل شركتك. لذلك نبدأ من فهم التشغيل الحالي، ثم نهيئ المنتج على البيانات، الصلاحيات، التدفقات، والتقارير التي يحتاجها فريقك فعليًا.'
                : 'A product succeeds when it is adjusted to how your company actually works. That is why we start by understanding current operations, then configure the product around the data, permissions, workflows, and reports your team truly needs.'}
            </p>
            <div className="space-y-5">
              {successSteps[ar ? 'ar' : 'en'].map((s, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#6D5DF6] text-white text-sm font-bold flex items-center justify-center">{i + 1}</span>
                  <div>
                    <p className="text-sm font-semibold text-[#101418] mb-1">{s.title}</p>
                    <p className="text-sm text-[#4F555E] leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 6. Product vs custom service */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#101418] mb-3 leading-snug">
              {ar ? 'منتج قابل للتخصيص أم حل مخصص بالكامل؟' : 'Customizable Product or Fully Custom Solution?'}
            </h2>
            <p className="text-sm font-semibold text-[#6D5DF6] mb-4">
              {ar ? 'اختر المسار الأقرب لطريقة عملك والعائد المطلوب.' : 'Choose the path closest to how your company works and the return you want to achieve.'}
            </p>
            <p className="text-sm sm:text-base text-[#4F555E] leading-relaxed mb-10">
              {ar
                ? 'بعض الشركات تحتاج بداية أسرع من خلال منتج قابل للتخصيص، وبعضها يحتاج حلًا مخصصًا يبدأ من تحليل أعمق. الاختيار لا يعتمد على اسم الخدمة، بل على طبيعة المشكلة، درجة تعقيد التشغيل، والنتيجة التي تريد الوصول إليها.'
                : 'Some companies need a faster start through a customizable product. Others need a custom solution that starts with deeper analysis. The choice does not depend on the service name, but on the nature of the problem, the complexity of operations, and the result you want to reach.'}
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-6">
            <ScrollReveal className="border border-[#E5E5E5] rounded-2xl p-6">
              <p className="text-sm font-bold text-[#101418] mb-4">{ar ? 'اختر المنتج عندما:' : 'Choose a product when:'}</p>
              <ul className="space-y-2.5">
                {chooseProduct[ar ? 'ar' : 'en'].map((p, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[#4F555E]">
                    <CheckCircle2 size={14} className="text-[#6D5DF6] flex-shrink-0 mt-0.5" />
                    {p}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
            <ScrollReveal delay={0.08} className="border border-[#E5E5E5] rounded-2xl p-6">
              <p className="text-sm font-bold text-[#101418] mb-4">{ar ? 'اختر الخدمة المخصصة عندما:' : 'Choose a custom service when:'}</p>
              <ul className="space-y-2.5">
                {chooseCustom[ar ? 'ar' : 'en'].map((p, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[#4F555E]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D63A3A] mt-1.5 flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.15} className="flex flex-wrap justify-center gap-3 mt-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[#E5E5E5] text-[#101418] hover:border-[#6D5DF6] hover:text-[#6D5DF6] transition-colors text-sm font-semibold"
            >
              {ar ? 'استكشف الخدمات المخصصة' : 'Explore Custom Services'}
            </Link>
            <Link
              to="/products/find-fit"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#6D5DF6] text-white rounded-xl hover:bg-[#5d4de6] active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
            >
              {ar ? 'اعرف المنتج الأنسب لتشغيل شركتك' : 'Find the best product for your operations'}
              <ArrowRight size={14} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* 7. FAQ */}
      <FAQSection
        title={ar ? 'أسئلة شائعة' : 'Frequently Asked Questions'}
        faqs={ar ? [
          { question: 'ما الفرق بين منتجات إنسديم والخدمات المخصصة؟', answer: 'منتجات إنسديم تبدأ من بنية جاهزة لمشكلة متكررة، ثم يتم تخصيصها حسب تشغيل الشركة. أما الخدمات المخصصة فتبدأ من تحليل أعمق وبناء حل من الصفر حسب احتياج خاص.' },
          { question: 'هل منتجات إنسديم جاهزة كما هي أم يتم تهيئتها حسب الشركة؟', answer: 'منتجات إنسديم تبدأ من بنية جاهزة لمشكلة متكررة، لكنها لا تُستخدم كقالب ثابت. يتم تهيئة البيانات، الصلاحيات، التدفقات، التقارير، وطريقة الاستخدام حسب واقع كل شركة وطريقة تشغيلها.' },
          { question: 'هل يمكن تخصيص المنتج حسب شركتي؟', answer: 'نعم. يتم تخصيص البيانات، الصلاحيات، التدفقات، التقارير، الحالات، والتنبيهات حسب طريقة عمل الشركة.' },
          { question: 'كيف أعرف أن المنتج مناسب لي؟', answer: 'إذا كانت لديك مشكلة متكررة في المتابعة، التشغيل، البيانات، أو تجربة العميل، يمكننا مراجعة احتياجك وتحديد هل المنتج مناسب أم تحتاج حلًا مخصصًا.' },
          { question: 'ماذا لو كان احتياجي قريبًا من المنتج لكن يحتاج إضافات؟', answer: 'نراجع الإضافات المطلوبة ونحدد هل يمكن تخصيصها داخل المنتج الحالي، أم أن الأفضل بناء حل مخصص حسب طبيعة احتياجك.' },
        ] : [
          { question: 'What is the difference between Ensdim products and custom services?', answer: 'Ensdim products start from a ready structure built for a recurring problem, then they are customized according to the company’s operations. Custom services start with deeper analysis and a solution built from scratch for a specific need.' },
          { question: 'Are Ensdim products ready as they are, or configured for each company?', answer: 'Ensdim products start from a ready structure built around a recurring problem, but they are not used as fixed templates. Data, permissions, workflows, reports, and usage flows are configured around each company’s real operations.' },
          { question: 'Can the product be customized for my company?', answer: 'Yes. Data, permissions, workflows, reports, statuses, and notifications can be customized according to your company’s way of working.' },
          { question: 'How do I know if a product is right for me?', answer: 'If you have a recurring problem in follow-up, operations, data, or customer experience, we can review your need and determine whether a product fits or whether you need a custom solution.' },
          { question: 'What if my need is close to a product but requires extra additions?', answer: 'We review the required additions and determine whether they can be customized inside the current product, or whether a custom solution would be better for your need.' },
        ]}
      />

      {/* 8. Final CTA */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="bg-[#EEEAFE] border border-[#DDD8FB] rounded-3xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl font-bold text-[#101418] mb-3">
              {ar ? 'تريد مناقشة احتياج شركتك مباشرة؟' : 'Want to discuss your company’s need directly?'}
            </h2>
            <p className="text-sm text-[#4F555E] mb-6 max-w-xl mx-auto">
              {ar
                ? 'إذا كانت لديك مشكلة واضحة في التشغيل، المتابعة، البيانات، أو تجربة العميل، تواصل معنا وسنساعدك على فهم المسار الأقرب: منتج قابل للتخصيص أم حل مخصص بالكامل.'
                : 'If you have a clear problem in operations, follow-up, data, or customer experience, contact us and we will help you understand the closest path: a customizable product or a fully custom solution.'}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
              >
                {ar ? 'تواصل مع إنسديم' : 'Contact Ensdim'} <ArrowRight size={15} />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[#6D5DF6]/30 text-[#3B2A78] hover:border-[#6D5DF6] hover:bg-white active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
              >
                {ar ? 'استكشف الخدمات المخصصة' : 'Explore Custom Services'}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
