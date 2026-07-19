/**
 * Case study content lives here as static data rather than in Supabase, so it
 * ships with the site and can be edited directly in this file.
 *
 * A few short strings were not provided in the original Arabic brief and were
 * translated here to keep both languages complete (flagged inline with a
 * "translated, not in original brief" comment): the Arabic CTA for Triboo,
 * Lemera Clinic, and the real-estate case. Everything else is copied
 * verbatim from the brief.
 */

export interface CaseStudySnapshotItem {
  label_en: string;
  label_ar: string;
  value_en: string;
  value_ar: string;
}

export interface CaseStudyBuiltSection {
  title_en: string;
  title_ar: string;
  lead_en: string;
  lead_ar: string;
  items_en: string[];
  items_ar: string[];
  closing_en?: string;
  closing_ar?: string;
}

export interface CaseStudyRelatedSolution {
  title_en: string;
  title_ar: string;
  desc_en: string;
  desc_ar: string;
  /** Link target, e.g. '/solutions/automation-layers'. Omit to render a non-linked card. */
  href?: string;
}

export interface CaseStudyCta {
  title_en: string;
  title_ar: string;
  desc_en: string;
  desc_ar: string;
  button_en: string;
  button_ar: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  is_published: boolean;
  sort_order: number;
  published_at: string;
  updated_at: string;

  // Listing card + featured strip
  title_en: string;
  title_ar: string;
  sector_en: string;
  sector_ar: string;
  card_problem_en: string;
  card_problem_ar: string;
  card_solution_en: string;
  card_solution_ar: string;
  card_impact_en: string;
  card_impact_ar: string;
  outcome_en: string;
  outcome_ar: string;
  image_url: string | null;
  gallery_images: string[];
  demo_url: string | null;
  /** Overrides the default "Case Study" / "دراسة حالة" hero badge, e.g. for demo/concept cases. */
  badge_en?: string;
  badge_ar?: string;
  /** Link to a downloadable technical report (e.g. a security review PDF). Renders a download CTA on the detail page. */
  report_url?: string | null;

  // Detail page
  snapshot: CaseStudySnapshotItem[];
  situation_en: string;
  situation_ar: string;
  challengeIntro_en: string;
  challengeIntro_ar: string;
  challengeItems_en: string[];
  challengeItems_ar: string[];
  builtIntro_en: string;
  builtIntro_ar: string;
  builtSections: CaseStudyBuiltSection[];
  impactIntro_en: string;
  impactIntro_ar: string;
  impactItems_en: string[];
  impactItems_ar: string[];
  whyMatters_en: string;
  whyMatters_ar: string;
  relatedSolutions: CaseStudyRelatedSolution[];
  cta: CaseStudyCta;
}

export const caseStudies: CaseStudy[] = [
  {
    id: '1',
    slug: 'bustan-amari-operations-system',
    is_published: true,
    sort_order: 0,
    published_at: '2026-07-08T00:00:00.000Z',
    updated_at: '2026-07-08T00:00:00.000Z',

    title_en: 'Bustan Amari: Turning 6,000+ contracts into a clearer operating system',
    title_ar: 'بستان أماري: تحويل تشغيل 6,000+ عقد إلى منظومة إدارة واضحة',
    sector_en: 'Kuwait, Garden & Palm Maintenance|Dashboard + Supervisor App + Customer App|Operations',
    sector_ar: 'الكويت، صيانة الحدائق والنخيل|داشبورد + تطبيق مشرفين + تطبيق عملاء|التشغيل',
    card_problem_en: 'Paper & Excel tracking',
    card_problem_ar: 'متابعة ورقية وإكسيل',
    card_solution_en: 'Dashboard + supervisor & customer apps',
    card_solution_ar: 'داشبورد + تطبيقا مشرفين وعملاء',
    card_impact_en: '6,000+ contracts organized',
    card_impact_ar: 'تنظيم أكثر من 6,000 عقد',
    outcome_en: 'How we helped a Kuwait-based garden and palm maintenance company move from paper records and Excel sheets to an integrated operating system for contracts, supervisors, workers, visits, customers, and payments.',
    outcome_ar: 'كيف ساعدنا شركة كويتية راسخة في صيانة الحدائق والنخيل على الانتقال من التسجيل الورقي والإكسيل إلى نظام تشغيل متكامل لإدارة العقود، المشرفين، العمالة، الزيارات، العملاء، والمدفوعات.',
    image_url: '/case-studies/bustan-amari/bustan-amari-dashboard.jpg',
    gallery_images: [
      '/case-studies/bustan-amari/bustan-amari-contracts.jpg',
      '/case-studies/bustan-amari/bustan-amari-supervisors.jpg',
      '/case-studies/bustan-amari/bustan-amari-apps.jpg',
    ],
    demo_url: null,

    snapshot: [
      { label_en: 'Client', label_ar: 'العميل', value_en: 'Bustan Amari', value_ar: 'بستان أماري' },
      { label_en: 'Country', label_ar: 'الدولة', value_en: 'Kuwait', value_ar: 'الكويت' },
      { label_en: 'Industry', label_ar: 'القطاع', value_en: 'Garden and palm maintenance', value_ar: 'صيانة الحدائق والنخيل' },
      { label_en: 'Established', label_ar: 'منذ', value_en: '2004', value_ar: '2004' },
      { label_en: 'Operational Scale', label_ar: 'حجم التشغيل', value_en: '6,000+ contracts', value_ar: 'أكثر من 6,000 عقد' },
      { label_en: 'Solution Type', label_ar: 'نوع الحل', value_en: 'Dashboard System + Supervisor App + Customer App + Payment Gateway', value_ar: 'Dashboard System + App + Payment Gateway' },
      { label_en: 'Goal', label_ar: 'الهدف', value_en: 'Organize operations, manage contracts, track visits, and improve customer experience.', value_ar: 'تنظيم التشغيل، متابعة العقود، إدارة الزيارات، وتحسين تجربة العميل.' },
    ],

    situation_en: 'Bustan Amari is a Kuwait-based company operating since 2004 in garden and palm maintenance, with a large customer base across the country and strong expertise in palm care. As the number of contracts and customers grew, daily operations became harder to manage. The company relied on paper records and Excel sheets to store customer data, contracts, visits, workers, and supervisors. This made it difficult to quickly access customer information, understand contract status, assign tasks, and track field execution across teams.',
    situation_ar: 'بستان أماري شركة كويتية تعمل منذ عام 2004 في مجال صيانة الحدائق والنخيل، ولديها قاعدة عملاء كبيرة في مختلف مناطق الكويت، مع تميز واضح في خدمات النخيل. مع توسع عدد العقود والعملاء، أصبحت المتابعة اليومية أكثر تعقيدًا. كانت الشركة تعتمد على التسجيل الورقي وملفات الإكسيل في حفظ بيانات العملاء، العقود، الزيارات، العمالة، والمشرفين. هذا جعل الوصول إلى بيانات العميل أو معرفة حالة عقده يحتاج وقتًا وجهدًا، كما زاد من صعوبة توزيع المهام على المشرفين والعمالة ومتابعة جودة التنفيذ في كل زيارة.',

    challengeIntro_en: 'The real challenge was not the lack of data. It was that the data was scattered across tools and processes instead of being managed through one operating layer.',
    challengeIntro_ar: 'المشكلة لم تكن في وجود بيانات فقط، بل في أن البيانات لم تكن داخل منظومة تشغيل واحدة يمكن إدارتها بسهولة.',
    challengeItems_en: [
      'Difficulty accessing customer and contract data quickly.',
      'Managing more than 6,000 contracts through paper and Excel.',
      'Difficulty assigning contracts and tasks to supervisors.',
      'Limited visibility into supervisor and worker performance.',
      'Difficulty tracking field visits and verifying completion.',
      'No clear customer-facing experience for tracking contracts, visits, and payments.',
      'Difficulty generating reports and operational insights for management decisions.',
    ],
    challengeItems_ar: [
      'صعوبة الوصول السريع إلى بيانات العملاء والعقود.',
      'الاعتماد على الورق والإكسيل في إدارة أكثر من 6,000 عقد.',
      'صعوبة توزيع العقود والمهام على المشرفين.',
      'غياب رؤية لحظية لأداء المشرفين والعمالة.',
      'صعوبة متابعة الزيارات الميدانية والتأكد من تنفيذها.',
      'عدم وجود قناة واضحة للعميل لمتابعة عقده، زياراته، ومدفوعاته.',
      'صعوبة استخراج الإحصائيات والتقارير التي تساعد الإدارة على اتخاذ القرار.',
    ],

    builtIntro_en: 'We built an integrated operating system that connects management, supervisors, workers, customers, contracts, visits, payments, and company resources in one structured environment.',
    builtIntro_ar: 'قمنا ببناء منظومة تشغيل متكاملة تربط الإدارة، المشرفين، العمالة، العملاء، العقود، الزيارات، المدفوعات، وموارد الشركة في نظام واحد.',
    builtSections: [
      {
        title_en: '1. Management Dashboard',
        title_ar: '1. Dashboard للإدارة',
        lead_en: 'A dashboard that helps management monitor daily operations from one place.',
        lead_ar: 'لوحة تحكم تساعد الإدارة على متابعة التشغيل اليومي من مكان واحد.',
        items_en: [
          'Customer data management.',
          'Contract management and status tracking.',
          'Supervisor assignment by routes and areas.',
          'Linking supervisors to specific contracts.',
          'Worker and task management.',
          'Company accounts management.',
          'Fleet and resource tracking.',
          'Operational reporting and statistics.',
          'More organized and secure company data storage.',
        ],
        items_ar: [
          'إدارة بيانات العملاء.',
          'إدارة العقود وحالاتها.',
          'تعيين المشرفين على الخطوط والمناطق.',
          'ربط كل مشرف بعقود محددة.',
          'متابعة العمالة والمهام.',
          'إدارة حسابات الشركة.',
          'متابعة أسطول السيارات والموارد.',
          'استخراج بيانات وإحصائيات تشغيلية بسهولة.',
          'حفظ بيانات الشركة في مكان أكثر تنظيمًا وأمانًا.',
        ],
      },
      {
        title_en: '2. Supervisor Application',
        title_ar: '2. تطبيق للمشرفين',
        lead_en: 'We created a dedicated application for supervisors to manage their daily tasks and assigned contracts.',
        lead_ar: 'أنشأنا تطبيقًا خاصًا بالمشرفين لمساعدتهم على متابعة المهام اليومية والعقود المسؤولين عنها.',
        items_en: [
          'View assigned tasks.',
          'Access contract details.',
          'Track visit schedules.',
          'Start a visit on arrival.',
          'Confirm location when the visit is completed.',
          'Upload photos of completed work.',
          'Send clear visit status updates to management.',
        ],
        items_ar: [
          'رؤية المهام المطلوبة منه.',
          'معرفة العقود المسؤول عنها.',
          'الاطلاع على تفاصيل كل زيارة.',
          'متابعة تواريخ الزيارات.',
          'تفعيل الزيارة عند الوصول.',
          'تأكيد الموقع عند انتهاء المهمة.',
          'رفع صور لما تم إنجازه.',
          'إرسال حالة الزيارة للإدارة بشكل واضح.',
        ],
        closing_en: 'This gave management better visibility over field execution without relying only on calls or delayed manual reports.',
        closing_ar: 'هذا جعل الإدارة قادرة على متابعة التنفيذ الميداني باستمرار، بدل الاعتماد على الاتصال اليدوي أو التقارير المتأخرة.',
      },
      {
        title_en: '3. Customer Application',
        title_ar: '3. تطبيق للعميل',
        lead_en: 'We connected the operating system to a customer application that gives clients a clearer way to follow their contracts and services.',
        lead_ar: 'ربطنا المنظومة بتطبيق للعميل حتى يستطيع متابعة عقده وخدماته بسهولة.',
        items_en: [
          'View contract details.',
          'Track visit schedules.',
          'See visit results.',
          'Follow payment status.',
          'Access their data more easily.',
          'Pay through an integrated payment gateway.',
        ],
        items_ar: [
          'متابعة تفاصيل العقد.',
          'معرفة مواعيد الزيارات.',
          'الاطلاع على نتائج الزيارة.',
          'متابعة المدفوعات.',
          'معرفة حالة الخدمة.',
          'الوصول إلى بياناته بشكل أسهل.',
          'الدفع من خلال بوابة دفع مدمجة.',
        ],
        closing_en: 'This improved customer comfort and transparency by allowing clients to follow what is happening without waiting for manual communication.',
        closing_ar: 'هذا أعطى العميل تجربة أكثر وضوحًا وراحة، لأنه أصبح قادرًا على متابعة ما يحدث لحظيًا بدل انتظار التواصل اليدوي.',
      },
    ],

    impactIntro_en: 'The solution helped Bustan Amari move from paper and Excel-based operations to a clearer and more manageable digital operating system.',
    impactIntro_ar: 'ساعد الحل بستان أماري على الانتقال من تشغيل يعتمد على الورق والإكسيل إلى منظومة تشغيل رقمية أوضح وأكثر قابلية للإدارة.',
    impactItems_en: [
      'More than 6,000 contracts organized in one system.',
      'Easier access to customer and contract status.',
      'Clearer task assignment for supervisors and workers.',
      'Better real-time visibility over field visits.',
      'Visit verification through location confirmation and photos.',
      'Better operational visibility for management.',
      'Better customer experience for tracking contracts, visits, and payments.',
      'Less pressure caused by manual follow-up.',
      'Stronger ability to scale operations sustainably.',
      'Higher customer confidence through a clearer and more professional experience.',
    ],
    impactItems_ar: [
      'تنظيم أكثر من 6,000 عقد داخل نظام واحد.',
      'سهولة استخراج بيانات العميل وحالة عقده.',
      'توزيع أوضح للمهام على المشرفين والعمالة.',
      'متابعة لحظية للزيارات الميدانية.',
      'توثيق الزيارات بالصور وتأكيد الموقع.',
      'رؤية أفضل للإدارة حول التشغيل اليومي.',
      'تجربة أفضل للعميل في متابعة العقد والزيارات والمدفوعات.',
      'تقليل الضغط الناتج عن المتابعة اليدوية.',
      'دعم قدرة الشركة على النمو والاستدامة.',
      'تحسين ثقة العملاء ورفع فرص التحويل من خلال تجربة أكثر وضوحًا واحترافية.',
    ],

    whyMatters_en: 'Bustan Amari did not only need an application. It needed a complete operating layer that connects management, field teams, and customers. This case shows how a service business with a large customer base can move from scattered traditional management to an operating system that improves control, follow-up, and customer experience.',
    whyMatters_ar: 'بستان أماري كانت مثالًا واضحًا لشركة خدمية ناجحة توسعت بسرعة، لكن أدوات المتابعة التقليدية لم تعد كافية لحجم التشغيل. أهمية هذه الدراسة أنها توضّح كيف يمكن تحويل العقود، الزيارات، الفرق الميدانية، المدفوعات، وطلبات العملاء من ملفات متفرقة ومتابعة يدوية إلى منظومة تشغيل واحدة تعطي الإدارة وضوحًا أكبر، وتمنح العميل تجربة أكثر راحة واحترافية. بهذا الشكل، الدراسة لا تعرض تطبيقًا فقط، بل تعرض كيف يمكن للتقنية أن تصبح طبقة تحكم ونمو داخل شركة خدمية كبيرة.',

    relatedSolutions: [
      { title_en: 'Faster Decisions Without Guesswork', title_ar: 'قرار أسرع بدل التخمين', desc_en: 'Connecting operational data into a clearer dashboard for faster management decisions.', desc_ar: 'ربط بيانات العقود، الزيارات، الحسابات، والعملاء داخل لوحة واحدة تساعد الإدارة على اتخاذ قرارات أوضح.', href: '/solutions/visibility-insights' },
      { title_en: 'Lower Cost and Less Team Pressure', title_ar: 'تكلفة أقل وضغط أقل', desc_en: 'Reducing manual follow-up and scattered work through a structured operating layer.', desc_ar: 'تقليل الاعتماد على الورق والإكسيل والمتابعة اليدوية من خلال نظام تشغيل منظم.', href: '/solutions/automation-layers' },
      { title_en: 'Follow-up That Prevents Lost Opportunities', title_ar: 'متابعة تمنع ضياع الفرص', desc_en: 'Managing contracts, visits, and client status in a clear follow-up path.', desc_ar: 'إدارة العقود والزيارات وحالات العملاء داخل مسار متابعة واضح.', href: '/solutions/follow-up-systems' },
    ],

    cta: {
      title_en: 'Do you manage recurring operations that are hard to track?',
      title_ar: 'هل لديك تشغيل متكرر يصعب متابعته؟',
      desc_en: 'Tell us how you manage customers, contracts, teams, or visits inside your business — and we will help you identify the closest path to a clearer operating system.',
      desc_ar: 'شاركنا كيف تتم إدارة العملاء، العقود، الفرق، أو الزيارات داخل شركتك — وسنساعدك على تحديد المسار الأقرب لبناء نظام تشغيل أوضح.',
      button_en: 'Share Your Business Challenge',
      button_ar: 'شارك تحدي عملك',
    },
  },
  {
    id: '2',
    slug: 'lemera-clinic-booking-crm',
    is_published: true,
    sort_order: 1,
    published_at: '2026-07-07T00:00:00.000Z',
    updated_at: '2026-07-07T00:00:00.000Z',

    title_en: 'Lemera Clinic: Smarter booking and clearer follow-up for a better visitor experience',
    title_ar: 'عياده تجميل الامارات حجز أذكى ومتابعة أوضح لتجربة زائر أفضل',
    sector_en: 'UAE, Aesthetic Clinic|Booking Chatbot + CRM Dashboard|Customer Experience',
    sector_ar: 'الإمارات، عيادات التجميل|تشات بوت حجز + CRM|تجربة العميل',
    card_problem_en: 'WhatsApp & phone booking',
    card_problem_ar: 'حجز عبر واتساب ومكالمات',
    card_solution_en: 'Booking chatbot + CRM dashboard',
    card_solution_ar: 'تشات بوت حجز + داشبورد CRM',
    card_impact_en: 'Higher capacity & conversions',
    card_impact_ar: 'استيعاب وتحويلات أعلى',
    outcome_en: 'How we helped an aesthetic clinic in the UAE move from manual WhatsApp and phone booking to an organized booking experience, automated follow-up, and a CRM dashboard that helps the team manage visitors and cases more clearly.',
    outcome_ar: 'كيف ساعدنا عيادة تجميل في الإمارات على الانتقال من الحجز اليدوي عبر الواتساب والمكالمات إلى تجربة حجز منظمة، متابعة تلقائية، وداشبورد CRM يساعد الفريق على إدارة الزائرات والحالات بوضوح أكبر.',
    image_url: null,
    gallery_images: [],
    demo_url: null,

    snapshot: [
      { label_en: 'Client', label_ar: 'العميل', value_en: 'Limera Aesthetic Clinic', value_ar: 'عياده تجميل الامارات' },
      { label_en: 'Country', label_ar: 'الدولة', value_en: 'UAE', value_ar: 'الإمارات' },
      { label_en: 'Industry', label_ar: 'القطاع', value_en: 'Aesthetic Clinic', value_ar: 'عيادات التجميل' },
      { label_en: 'Solution Type', label_ar: 'نوع الحل', value_en: 'Website + Booking Chatbot + CRM Dashboard + AI Follow-up Layer', value_ar: 'موقع + تشات بوت حجز + CRM + طبقة متابعة ذكية' },
      { label_en: 'Goal', label_ar: 'الهدف', value_en: 'Organize booking, reduce follow-up pressure, improve visitor experience, and increase operational efficiency inside the clinic.', value_ar: 'تنظيم الحجز، تقليل ضغط المتابعة، تحسين تجربة الزائرات، ورفع كفاءة التشغيل داخل العيادة.' },
    ],

    situation_en: 'Limera Clinic relied heavily on WhatsApp and phone calls to receive bookings and inquiries. As demand increased, the front desk team spent a large amount of time replying, coordinating appointments, confirming attendance, and following up after the first session. Some visitors arrived too early, some appointments were canceled or delayed without proper follow-up, and this created pressure on the clinic schedule, longer waiting times, and a direct impact on visitor satisfaction and revenue. The clinic also did not have a clear visitor file that allowed the team and doctor to track cases, previous visits, notes, and follow-up plans.',
    situation_ar: 'كانت عيادة تجميل الامارات تعتمد بشكل أساسي على الواتساب والمكالمات الهاتفية لاستقبال الحجوزات والاستفسارات. ومع زيادة الطلب، أصبح فريق الاستقبال يستهلك وقتًا كبيرًا في الرد، تنسيق المواعيد، تأكيد الحضور، والمتابعة بعد الجلسة الأولى. بعض الزائرات كنّ يصلن قبل الموعد بوقت طويل، وبعض الحجوزات يتم إلغاؤها أو تأجيلها دون متابعة كافية، مما كان يسبب ضغطًا على جدول العيادة ووقت انتظار أطول. كما لم يكن لدى العيادة ملف واضح لكل زائرة يساعد الفريق والطبيب على تتبع الحالة والزيارات السابقة والمتابعة.',

    challengeIntro_en: 'The clinic needed a clearer way to manage booking, follow-up, and visitor experience without increasing pressure on the front desk team.',
    challengeIntro_ar: 'كانت العيادة بحاجة إلى طريقة أوضح لإدارة الحجز والمتابعة وتجربة الزائرة، دون زيادة الضغط على فريق الاستقبال.',
    challengeItems_en: [
      'Heavy dependency on WhatsApp and phone calls.',
      'Repeated questions consuming team time.',
      'Difficulty managing available days and appointment times accurately.',
      'Long waiting times due to unorganized scheduling.',
      'Weak follow-up after the first session.',
      'No clear file for each visitor to track case history and follow-up.',
      'Direct impact on satisfaction, conversions, and revenue.',
    ],
    challengeItems_ar: [
      'اعتماد كبير على الواتساب والمكالمات في الحجز.',
      'استهلاك وقت الفريق في الرد على الأسئلة المتكررة.',
      'صعوبة معرفة الأوقات المتاحة وتنظيم جدول الزيارات بدقة.',
      'انتظار طويل داخل العيادة بسبب عدم انتظام المواعيد.',
      'ضعف المتابعة بعد الجلسة الأولى.',
      'عدم وجود ملف واضح لكل زائرة لتتبع الحالة والمتابعة.',
      'تأثير مباشر على رضا الزائرات، التحويلات، والإيرادات.',
    ],

    builtIntro_en: 'We built an integrated booking and follow-up experience that connects the website, chatbot, front desk team, doctor, and CRM dashboard into one clearer flow.',
    builtIntro_ar: 'قمنا ببناء تجربة حجز ومتابعة متكاملة تربط الموقع، التشات بوت، فريق الاستقبال، الطبيب، والداشبورد في مسار واحد أكثر وضوحًا.',
    builtSections: [
      {
        title_en: '1. Professional Clinic Website',
        title_ar: '1. موقع احترافي للعيادة',
        lead_en: 'We created a professional website that helps visitors understand the clinic services, choose the right service, and start booking clearly instead of relying only on WhatsApp and phone calls.',
        lead_ar: 'أنشأنا موقعًا احترافيًا يساعد الزائرات على فهم خدمات العيادة، اختيار الخدمة المناسبة، وبدء الحجز بطريقة واضحة بدل الاعتماد الكامل على الواتساب والمكالمات.',
        items_en: [],
        items_ar: [],
      },
      {
        title_en: '2. Automated Booking Chatbot',
        title_ar: '2. تشات بوت للحجز التلقائي',
        lead_en: 'We connected the website to a booking chatbot that helps visitors choose the right day and time based on available slots.',
        lead_ar: 'ربطنا الموقع بتشات بوت للحجز يساعد الزائرات على اختيار اليوم والوقت المناسب حسب المواعيد المتاحة.',
        items_en: [
          'Choose the required service.',
          'View available days and times.',
          'Select an exact appointment time.',
          'Enter basic information.',
          'Receive initial booking confirmation.',
          'Receive automated follow-up before the visit to confirm attendance.',
        ],
        items_ar: [
          'اختيار الخدمة المطلوبة.',
          'معرفة الأيام والأوقات المتاحة.',
          'تحديد موعد الزيارة بدقة.',
          'تسجيل البيانات الأساسية.',
          'الحصول على تأكيد أولي للحجز.',
          'تلقي متابعة تلقائية قبل الزيارة لتأكيد الحضور.',
        ],
        closing_en: 'This helped reduce long waiting lists and improved the flow of visitors inside the clinic.',
      },
      {
        title_en: '3. CRM Dashboard for the Clinic',
        title_ar: '3. CRM Dashboard للعيادة',
        lead_en: 'We built a CRM dashboard for the clinic team, where booking and visitor data are automatically stored instead of being scattered across conversations.',
        lead_ar: 'قمنا ببناء داشبورد CRM لفريق العيادة، بحيث يتم تسجيل بيانات الحجز والزائرات تلقائيًا داخل النظام بدل الاعتماد على المحادثات المتفرقة.',
        items_en: [
          'View daily bookings.',
          'Access visitor details.',
          'Track booking status.',
          'Organize visit schedules.',
          'Follow up with cases that need confirmation or action.',
          'Reduce data loss between WhatsApp and phone calls.',
        ],
        items_ar: [
          'رؤية حجوزات كل يوم.',
          'متابعة بيانات كل زائرة.',
          'معرفة حالة الحجز.',
          'تنظيم مواعيد الزيارات.',
          'متابعة الحالات التي تحتاج تأكيدًا أو تواصلًا.',
          'تقليل ضياع البيانات بين الواتساب والمكالمات.',
        ],
      },
      {
        title_en: '4. Automatic Visitor File',
        title_ar: '4. ملف تلقائي لكل زائرة',
        lead_en: 'On the first visit, the system creates a dedicated visitor file inside the dashboard. The doctor or team can add case details, notes, and session information.',
        lead_ar: 'عند أول زيارة، يقوم النظام بإنشاء ملف خاص للزائرة داخل الداشبورد. يستطيع الطبيب أو الفريق إضافة بيانات الحالة، الملاحظات، وتفاصيل الجلسة.',
        items_en: [],
        items_ar: [],
        closing_en: 'This allowed the clinic to track visit history, understand each case better, and build long-term follow-up instead of treating each visit as separate.',
      },
      {
        title_en: '5. Automated Follow-up After the Visit',
        title_ar: '5. متابعة تلقائية بعد الزيارة',
        lead_en: 'We added an automated follow-up layer that helps the clinic communicate after the session depending on the case or service type.',
        lead_ar: 'أضفنا طبقة متابعة تلقائية تساعد العيادة على التواصل بعد الجلسة حسب نوع الحالة أو الخدمة.',
        items_en: [
          'Sending reminders or post-visit instructions.',
          'Following up on visitor satisfaction.',
          'Organizing the next visit.',
          'Improving retention.',
          'Reducing front desk pressure.',
        ],
        items_ar: [],
      },
    ],

    impactIntro_en: 'The solution helped Limera Clinic move from scattered manual follow-up to a clearer and more organized booking and operating experience.',
    impactIntro_ar: 'ساعد الحل عيادة تجميل الامارات على الانتقال من متابعة يدوية متفرقة إلى تجربة حجز وتشغيل أكثر وضوحًا وتنظيمًا.',
    impactItems_en: [
      'Easier booking through the website and chatbot.',
      'Less pressure on the front desk team.',
      'Better appointment organization.',
      'Shorter waiting times inside the clinic.',
      'Clearer follow-up before and after the visit.',
      'Organized visitor files that help track cases over time.',
      'Higher daily visitor capacity after organizing booking and follow-up.',
      'Higher satisfaction through a calmer and clearer experience.',
      'Higher conversions from interested visitors through faster response and easier booking.',
      'Stronger revenue potential through a more organized and professional experience.',
    ],
    impactItems_ar: [
      'حجز أسهل من خلال الموقع والتشات بوت.',
      'تقليل الضغط على فريق الاستقبال.',
      'تنظيم أفضل لمواعيد الزيارات.',
      'تقليل وقت الانتظار داخل العيادة.',
      'متابعة أوضح قبل وبعد الزيارة.',
      'ملف منظم لكل زائرة يساعد في فهم الحالة بمرور الوقت.',
      'استيعاب أكبر لعدد الزائرات يوميًا بعد تنظيم الحجز والمتابعة.',
      'رضا أعلى نتيجة تجربة أكثر وضوحًا وهدوءًا.',
      'تحويلات أعلى من الزائرات المهتمات بسبب سرعة الرد وسهولة الحجز.',
      'دعم نمو الإيرادات من خلال تجربة أكثر تنظيمًا واحترافية.',
    ],

    whyMatters_en: 'Limera Clinic did not only need a chatbot. It needed a complete operating experience that starts from the first visitor interaction, continues through booking and visit management, and extends into follow-up and retention. This case shows how an aesthetic clinic can move from scattered conversations and daily team pressure to a system that organizes visits, improves satisfaction, and increases capacity without operational chaos. In this case, technology was not just an automated reply tool. It became part of the visitor experience and the clinic\'s growth system.',
    whyMatters_ar: 'عيادة تجميل الامارات لم تكن بحاجة إلى تشات بوت فقط، بل إلى تجربة تشغيل كاملة تبدأ من أول تواصل مع الزائرة، مرورًا بالحجز، الزيارة، المتابعة، ثم الاحتفاظ بها على المدى الطويل. أهمية هذه الدراسة أنها توضّح كيف يمكن لعيادة تجميل أن تحوّل الحجز والمتابعة من محادثات متفرقة وضغط يومي على الفريق إلى نظام يساعد على تنظيم الزيارات، تحسين الرضا، وزيادة القدرة على استقبال عدد أكبر من الزائرات دون فوضى تشغيلية.',

    relatedSolutions: [
      { title_en: 'Visits Turned into Trackable Requests', title_ar: 'زيارات تتحول إلى طلبات', desc_en: 'Improving the website and booking experience so digital visits turn into clear requests that can be followed up.', desc_ar: 'تحسين الموقع وتجربة الحجز حتى تتحول الزيارات الرقمية إلى طلبات واضحة قابلة للمتابعة.', href: '/solutions/digital-experiences' },
      { title_en: 'Follow-up That Prevents Lost Opportunities', title_ar: 'متابعة تمنع ضياع الفرص', desc_en: 'Organizing visitor data and booking status inside a clear follow-up flow instead of relying on scattered conversations.', desc_ar: 'تنظيم بيانات الزائرات وحالة كل حجز داخل مسار متابعة واضح بدل الاعتماد على المحادثات المتفرقة.', href: '/solutions/follow-up-systems' },
      { title_en: 'Intelligence That Reveals Opportunities Early', title_ar: 'ذكاء يكشف الفرص مبكرًا', desc_en: 'Using an intelligence layer to prioritize follow-up, understand cases, and improve communication after the visit.', desc_ar: 'استخدام طبقة ذكاء تساعد على ترتيب المتابعة، فهم الحالات، وتحسين التواصل بعد الزيارة.', href: '/solutions/ai-practical-decisions' },
      { title_en: 'Lower Cost and Less Team Pressure', title_ar: 'تكلفة أقل وضغط أقل', desc_en: 'Reducing repetitive work on the front desk team through automated booking, reminders, and structured follow-up.', desc_ar: 'تقليل المهام المتكررة على فريق الاستقبال من خلال الحجز التلقائي، التذكيرات، والمتابعة المنظمة.', href: '/solutions/automation-layers' },
    ],

    cta: {
      title_en: 'Does your clinic still rely on WhatsApp and phone calls for booking?',
      // Arabic CTA translated here, not in original brief (only the English CTA was given for this case).
      title_ar: 'هل ما زالت عيادتك تعتمد على الواتساب والمكالمات في الحجز؟',
      desc_en: 'Tell us how booking and follow-up currently work inside your clinic — and we will help you identify the closest path to a clearer booking experience and more organized follow-up.',
      desc_ar: 'شاركنا كيف يتم الحجز والمتابعة داخل عيادتك حاليًا — وسنساعدك على تحديد المسار الأقرب لتجربة حجز أوضح ومتابعة أكثر تنظيمًا.',
      button_en: 'Share Your Business Challenge',
      button_ar: 'شارك تحدي عملك',
    },
  },
  {
    id: '3',
    slug: 'triboo-travel-mvp',
    is_published: true,
    sort_order: 2,
    published_at: '2026-07-06T00:00:00.000Z',
    updated_at: '2026-07-06T00:00:00.000Z',

    title_en: 'Triboo: From startup idea to a market-testable travel booking platform',
    title_ar: 'ترايبوو: من فكرة ناشئة إلى منصة حجز رحلات جاهزة لاختبار السوق',
    sector_en: 'Egypt, Intercity Travel|MVP + Booking Platform|Startups & MVPs',
    sector_ar: 'مصر، السفر بين المحافظات|MVP + منصة حجز|شركات ناشئة',
    card_problem_en: 'Scattered bus schedules & prices',
    card_problem_ar: 'تشتت مواعيد وأسعار الرحلات',
    card_solution_en: 'Business roadmap + booking MVP',
    card_solution_ar: 'خريطة طريق + MVP للحجز',
    card_impact_en: 'Market-testable MVP launched',
    card_impact_ar: 'إطلاق MVP قابل للاختبار',
    outcome_en: 'How we helped an Egyptian startup study the idea of aggregating intercity bus trips, then build an MVP that helps travelers compare trips, choose the right option, and book from one place.',
    outcome_ar: 'كيف ساعدنا شركة ناشئة في مصر على دراسة فكرة منصة تجمع رحلات الأتوبيسات بين المحافظات، ثم بناء MVP يسهّل على المسافرين مقارنة الرحلات، اختيار الأنسب، والحجز من مكان واحد.',
    image_url: null,
    gallery_images: [],
    demo_url: null,

    snapshot: [
      { label_en: 'Client', label_ar: 'العميل', value_en: 'Triboo', value_ar: 'ترايبوو' },
      { label_en: 'Country', label_ar: 'الدولة', value_en: 'Egypt', value_ar: 'مصر' },
      { label_en: 'Industry', label_ar: 'القطاع', value_en: 'Intercity travel and transportation', value_ar: 'السفر والنقل بين المحافظات' },
      { label_en: 'Project Stage', label_ar: 'مرحلة المشروع', value_en: 'Build / Startup', value_ar: 'Build / شركة ناشئة' },
      { label_en: 'Solution Type', label_ar: 'نوع الحل', value_en: 'Business Consultation + Product Roadmap + MVP + Booking Platform + Admin Dashboard', value_ar: 'Business Consultation + Product Roadmap + MVP + Booking Platform + Admin Dashboard' },
      { label_en: 'Goal', label_ar: 'الهدف', value_en: 'Turn an early startup idea into a testable product that brings bus trips together and makes comparison and booking easier for travelers.', value_ar: 'تحويل فكرة ناشئة إلى منتج قابل للاختبار في السوق، يجمع رحلات الأتوبيسات ويسهّل المقارنة والحجز للمسافرين.' },
    ],

    situation_en: "Triboo started with a real problem faced by travelers moving between cities in Egypt. A traveler looking for the right bus trip often needs to search across several transportation companies, each with its own website, application, booking method, schedules, and prices. This makes choosing the right trip exhausting. The traveler needs to move between different sources to understand availability, timing, price, comfort level, and sometimes reviews or trip quality. The idea was to bring bus trips into one place, letting travelers search, compare, choose the right trip, and book more easily through a website or application.",
    situation_ar: 'كانت فكرة ترايبوو تستهدف حل مشكلة حقيقية يواجهها المسافرون بين المحافظات في مصر. المسافر الذي يريد حجز رحلة أتوبيس مناسبة غالبًا يحتاج إلى البحث بين أكثر من شركة، وكل شركة لديها موقع أو تطبيق أو وسيلة حجز مختلفة، بمواعيد وأسعار وتجارب متفاوتة. هذا يجعل اختيار الرحلة المناسبة عملية مرهقة؛ لأن المسافر يحتاج إلى التنقل بين أكثر من مصدر لمعرفة المواعيد، الأسعار، مستوى الراحة، وتقييمات الرحلات أو الشركات. كانت الفكرة الأساسية تجميع رحلات الأتوبيسات في مكان واحد، بحيث يستطيع المسافر البحث، المقارنة، اختيار الرحلة الأنسب، والحجز بسهولة من خلال الموقع أو التطبيق.',

    challengeIntro_en: 'The challenge was not only technical. The project was at an early stage and needed to turn the idea into a clear business model, user journey, and MVP that could be tested in the market.',
    challengeIntro_ar: 'التحدي لم يكن تقنيًا فقط. كان المشروع في مرحلة مبكرة، وكان يحتاج إلى تحويل الفكرة إلى نموذج عمل واضح، رحلة مستخدم مفهومة، ومنتج أولي يمكن اختباره في السوق.',
    challengeItems_en: [
      'Difficulty for travelers to compare between transportation companies.',
      'Scattered schedules and prices across multiple platforms.',
      'Limited visibility into trip reviews and bus comfort levels.',
      'The startup needed to study the idea before execution.',
      'The product needed a clear roadmap.',
      'The business model had to connect transportation companies with travelers.',
      'The MVP had to test the idea without building a large product too early.',
    ],
    challengeItems_ar: [
      'صعوبة المسافر في المقارنة بين شركات النقل المختلفة.',
      'تشتت مواعيد الرحلات والأسعار بين أكثر من منصة.',
      'غياب رؤية واضحة لتقييمات الرحلات ومستوى راحة الأتوبيسات.',
      'حاجة الشركة الناشئة إلى دراسة الفكرة قبل التنفيذ.',
      'الحاجة إلى خريطة طريق واضحة للمنتج.',
      'بناء نموذج عمل يساعد على ربط شركات النقل بالمسافرين.',
      'تنفيذ MVP قابل للاختبار دون الدخول في منتج ضخم قبل التحقق من السوق.',
    ],

    builtIntro_en: 'We worked with Triboo across two stages, from strategic product thinking to MVP execution.',
    builtIntro_ar: 'عملنا مع فريق ترايبوو على مرحلتين، من التفكير والبناء الاستراتيجي إلى تنفيذ المنتج الأولي.',
    builtSections: [
      {
        title_en: '1. Idea Study and Product Roadmap',
        title_ar: '1. دراسة الفكرة وبناء خريطة الطريق',
        lead_en: 'Before writing code, we helped the team organize the idea and understand the problem from the user and market perspective.',
        lead_ar: 'قبل كتابة الكود، ساعدنا الفريق على ترتيب الفكرة وفهم المشكلة من زاوية المستخدم والسوق.',
        items_en: [
          "Analyzing the traveler's problem.",
          "Defining the platform's core value.",
          'Mapping the user journey from search to booking.',
          'Defining the essential features for the first version.',
          'Building a clear MVP roadmap.',
          'Discussing the business model and how to connect bus companies with travelers.',
          'Identifying what should launch first and what can be delayed.',
        ],
        items_ar: [
          'تحليل المشكلة التي يواجهها المسافر.',
          'تحديد القيمة الأساسية للمنصة.',
          'رسم رحلة المستخدم من البحث إلى الحجز.',
          'تحديد الوظائف الأساسية لأول نسخة.',
          'بناء خريطة طريق واضحة للـ MVP.',
          'مناقشة نموذج العمل وكيفية ربط شركات النقل بالمسافرين.',
          'تحديد ما يجب إطلاقه أولًا وما يمكن تأجيله لاحقًا.',
        ],
      },
      {
        title_en: '2. MVP Development',
        title_ar: '2. بناء MVP للمنصة',
        lead_en: 'We built an initial testable version that helps users search for trips, compare options, and choose the most suitable ride.',
        lead_ar: 'قمنا ببناء نسخة أولية قابلة للاختبار تساعد المستخدم على البحث عن الرحلات ومقارنتها واختيار الأنسب.',
        items_en: [
          'User interface for trip search.',
          'Displaying available trips between cities.',
          'Comparing times and options.',
          'Showing trip and transportation company details.',
          'Selecting the right trip.',
          'Initial booking experience.',
          'A user experience designed to help travelers make decisions more easily.',
        ],
        items_ar: [
          'واجهة للمستخدم للبحث عن الرحلات.',
          'عرض الرحلات المتاحة بين المحافظات.',
          'مقارنة المواعيد والاختيارات.',
          'عرض بيانات الرحلة وشركة النقل.',
          'إمكانية اختيار الرحلة المناسبة.',
          'تجربة حجز أولية قابلة للتطوير.',
          'تصميم تجربة استخدام تساعد المسافر على اتخاذ القرار بسهولة.',
        ],
      },
      {
        title_en: '3. Admin Dashboard',
        title_ar: '3. Dashboard لإدارة المنصة',
        lead_en: 'We built a dashboard that helps the Triboo team manage platform data internally.',
        lead_ar: 'قمنا بتنفيذ داشبورد يساعد فريق ترايبوو على إدارة البيانات ومتابعة المنصة من الداخل.',
        items_en: [
          'Manage transportation companies.',
          'Manage trip data.',
          'Track bookings.',
          'Organize customer data.',
          'Monitor platform activity.',
          'Prepare the platform to scale with more companies and more routes later.',
        ],
        items_ar: [
          'إدارة شركات النقل.',
          'إدارة بيانات الرحلات.',
          'متابعة الحجوزات.',
          'تنظيم بيانات العملاء.',
          'مراقبة حركة المنصة.',
          'تجهيز المنصة للتوسع وإضافة شركات ورحلات أكثر لاحقًا.',
        ],
      },
    ],

    impactIntro_en: 'Ensdim helped Triboo move from startup idea to a clear MVP that can be tested in the market.',
    impactIntro_ar: 'ساعدت إنسديم ترايبوو على الانتقال من فكرة ناشئة إلى منتج أولي واضح يمكن اختباره في السوق.',
    impactItems_en: [
      'Turning the idea into an executable roadmap.',
      'Clarifying the business model before building the product.',
      'Building an MVP to test the solution with users.',
      'Reducing the risk of building a large product before market validation.',
      'Creating an easier booking experience for travelers.',
      'Helping users compare trips instead of moving between multiple companies.',
      'Providing the company with a dashboard to manage trips, customers, and data.',
      'Preparing the project for the next development stage based on first trial results.',
    ],
    impactItems_ar: [
      'تحويل الفكرة إلى خريطة طريق قابلة للتنفيذ.',
      'توضيح نموذج العمل قبل بناء المنتج.',
      'بناء MVP يساعد على اختبار الحل مع المستخدمين.',
      'تقليل مخاطرة بناء منتج كبير قبل التأكد من السوق.',
      'إنشاء تجربة حجز أسهل للمسافرين.',
      'تمكين المستخدم من المقارنة بين الرحلات بدل التنقل بين أكثر من شركة.',
      'توفير داشبورد للشركة لإدارة الرحلات والعملاء والبيانات.',
      'تجهيز المشروع لمرحلة التطوير التالية بناءً على نتائج التجربة الأولى.',
    ],

    whyMatters_en: 'Triboo is a clear example of a startup that did not only need technical execution. It needed a partner to help turn an idea into a testable product. This case shows how an early-stage team can start from a real market problem, then move through understanding, analysis, business model structuring, and MVP development instead of jumping directly into a full product build. In this case, Ensdim\'s role was not only to build a website or application. It was to help shape the idea from the beginning and turn it into a measurable, testable digital experience.',
    whyMatters_ar: 'ترايبوو كانت مثالًا واضحًا على شركة ناشئة لا تحتاج إلى تنفيذ تقني فقط، بل تحتاج إلى شريك يساعدها على تحويل الفكرة إلى منتج قابل للاختبار. أهمية هذه الدراسة أنها توضّح كيف يمكن لفريق ناشئ أن يبدأ من مشكلة حقيقية في السوق، ثم يمر بمرحلة فهم، تحليل، ترتيب نموذج العمل، وبناء MVP بدل القفز مباشرة إلى تنفيذ منتج كامل. بهذا الشكل، لم يكن دور إنسديم هو بناء موقع أو تطبيق فقط، بل المشاركة في بناء الفكرة من البداية وتحويلها إلى تجربة رقمية قابلة للقياس والتطوير.',

    relatedSolutions: [
      { title_en: 'Visits Turned into Trackable Requests', title_ar: 'زيارات تتحول إلى طلبات', desc_en: 'Designing a digital experience that helps visitors search, compare, and take a clear booking action.', desc_ar: 'تصميم تجربة رقمية تساعد الزائر على البحث، المقارنة، واتخاذ قرار الحجز بسهولة.', href: '/solutions/digital-experiences' },
      { title_en: 'Clearer Journey. Higher Conversion.', title_ar: 'رحلة أوضح، تحويل أعلى', desc_en: 'Improving the user journey from the first search to choosing the right trip and completing the booking.', desc_ar: 'تحسين رحلة المستخدم من أول بحث عن رحلة حتى اختيار الرحلة المناسبة والحجز.' },
      { title_en: 'Startup Products / Build Stage', title_ar: 'منتجات الشركات الناشئة / Build Stage', desc_en: 'Turning early-stage ideas into clear MVPs that can be tested before building the full product.', desc_ar: 'تحويل الأفكار الناشئة إلى MVP واضح قابل للاختبار قبل التوسع في بناء المنتج الكامل.', href: '/solutions/build' },
    ],

    cta: {
      title_en: 'Do you have a startup idea that needs to become a testable product?',
      // Arabic CTA translated here, not in original brief (only the English CTA was given for this case).
      title_ar: 'هل لديك فكرة شركة ناشئة تحتاج إلى منتج قابل للاختبار؟',
      desc_en: 'Tell us about your idea, the problem you are solving, and the audience you want to serve — and we will help you define the closest roadmap for building your first testable version.',
      desc_ar: 'شاركنا فكرتك، والمشكلة التي تحلها، والجمهور الذي تستهدفه — وسنساعدك على تحديد أقرب خريطة طريق لبناء أول نسخة قابلة للاختبار.',
      button_en: 'Share Your Business Challenge',
      button_ar: 'شارك تحدي عملك',
    },
  },
  {
    id: '4',
    slug: 'real-estate-sales-crm-saudi',
    is_published: true,
    sort_order: 3,
    published_at: '2026-07-05T00:00:00.000Z',
    updated_at: '2026-07-05T00:00:00.000Z',

    title_en: 'From traditional follow-up to a clearer sales pipeline for a contracting and real estate company',
    title_ar: 'من متابعة تقليدية إلى نظام مبيعات أوضح لشركة مقاولات وتطوير عقاري',
    sector_en: 'Saudi Arabia, Contracting & Real Estate Development|Website + Chatbot + Sales CRM|Sales & Growth',
    sector_ar: 'السعودية، المقاولات والتطوير العقاري|موقع + تشات بوت + CRM مبيعات|المبيعات والنمو',
    card_problem_en: 'Leads scattered across WhatsApp & Excel',
    card_problem_ar: 'عملاء متفرقون بين واتساب وإكسيل',
    card_solution_en: 'Landing pages + chatbot + sales CRM',
    card_solution_ar: 'صفحات مشاريع + تشات بوت + CRM مبيعات',
    card_impact_en: 'Higher conversion, clearer pipeline',
    card_impact_ar: 'تحويل أعلى وقمع مبيعات أوضح',
    outcome_en: 'How we helped a contracting and real estate development company in Saudi Arabia improve project presentation, organize client requests, automate responses, and build a dashboard that helps management track sales performance and make clearer decisions.',
    outcome_ar: 'كيف ساعدنا شركة مقاولات وتطوير عقاري في السعودية على تحسين عرض مشاريعها، تنظيم طلبات العملاء، أتمتة الردود، وبناء داشبورد يساعد الإدارة على متابعة فريق المبيعات واتخاذ قرارات أوضح.',
    image_url: null,
    gallery_images: [],
    demo_url: null,

    snapshot: [
      { label_en: 'Client', label_ar: 'العميل', value_en: 'Contracting & Real Estate Development Company', value_ar: 'شركة مقاولات وتطوير عقاري' },
      { label_en: 'Country', label_ar: 'الدولة', value_en: 'Saudi Arabia', value_ar: 'السعودية' },
      { label_en: 'Industry', label_ar: 'القطاع', value_en: 'Contracting and Real Estate Development', value_ar: 'المقاولات والتطوير العقاري' },
      { label_en: 'Solution Type', label_ar: 'نوع الحل', value_en: 'Website + Project Landing Pages + Chatbot + Sales CRM Dashboard', value_ar: 'Website + Project Landing Pages + Chatbot + Sales CRM Dashboard' },
      { label_en: 'Goal', label_ar: 'الهدف', value_en: 'Improve campaign conversion, organize client data, increase sales team efficiency, and reduce dependency on manual follow-up.', value_ar: 'تحسين التحويل من الحملات، تنظيم بيانات العملاء، رفع كفاءة فريق المبيعات، وتقليل الاعتماد على المتابعة اليدوية.' },
    ],

    situation_en: "The company used a traditional way of receiving clients and following up on quotation requests. The team relied heavily on WhatsApp, calls, Excel files, and manual distribution of client numbers to sales representatives. As campaigns increased and the company aimed to scale, the problem became clearer, since every client had a different status, every request needed follow-up, and every project had many details that needed to be explained before a client could move forward. This made follow-up exhausting, reduced visibility for management, and made it harder to know the status of each client or request at the right time. The company wanted to expand and reach a wider audience, but the old workflow meant that every increase in demand required more sales hiring just to handle replies, explanations, follow-up, and data entry.",
    situation_ar: 'كانت الشركة تعمل بالطريقة التقليدية في استقبال العملاء ومتابعة طلبات الأسعار. الاعتماد كان كبيرًا على الواتساب، المكالمات، ملفات الإكسيل، وتوزيع أرقام العملاء يدويًا على فريق المبيعات. مع زيادة الحملات والرغبة في التوسع، بدأت المشكلة تظهر بوضوح، فكل عميل له حالة مختلفة، كل طلب يحتاج متابعة، وكل مشروع له تفاصيل كثيرة يجب توضيحها للعميل قبل التواصل. هذا جعل المتابعة مرهقة، والصورة غير واضحة للإدارة، وصعّب معرفة حالة كل عميل أو طلب في الوقت المناسب. الشركة كانت تحتاج إلى توسيع أعمالها والوصول إلى شريحة أكبر من العملاء، لكنها كانت تواجه تحديًا مهمًا، إذ كلما زاد حجم الطلب، احتاجت إلى توظيف مزيد من موظفي المبيعات لمجرد الرد، الشرح، المتابعة، وتسجيل البيانات.',

    challengeIntro_en: "The challenge was not only getting more leads. The real issue was that the company's lead handling and follow-up process was not scalable enough.",
    challengeIntro_ar: 'التحدي لم يكن في نقص العملاء فقط، بل في أن نظام استقبال العملاء ومتابعتهم لم يكن قابلًا للتوسع بنفس سرعة نمو الشركة.',
    challengeItems_en: [
      'Heavy dependency on WhatsApp and Excel.',
      'Difficulty knowing the status of each client or quotation request.',
      'Client data and conversation details getting lost.',
      'Sales time wasted explaining the same project details repeatedly.',
      'Constant need for more sales hiring as demand increased.',
      'Limited visibility into sales team performance.',
      'Difficulty assigning tasks and opportunities across the team.',
      'No clear conversation summary or next step inside the sales pipeline.',
    ],
    challengeItems_ar: [
      'الاعتماد على الواتساب والإكسيل في متابعة العملاء.',
      'صعوبة معرفة حالة كل عميل أو طلب عرض سعر.',
      'ضياع بعض بيانات العملاء أو تفاصيل المحادثات.',
      'استهلاك وقت فريق المبيعات في شرح نفس تفاصيل المشاريع.',
      'الحاجة المستمرة لتوظيف سيلز أكثر مع كل توسع.',
      'ضعف رؤية الإدارة لأداء الفريق ونتائج المتابعة.',
      'صعوبة توزيع المهام والفرص بين موظفي المبيعات.',
      'عدم وجود ملخص واضح لكل محادثة أو مرحلة داخل قمع المبيعات.',
    ],

    builtIntro_en: 'We built a digital sales and follow-up system that helps the company present its projects professionally, receive clients more clearly, and manage follow-up inside one dashboard.',
    builtIntro_ar: 'قمنا ببناء منظومة رقمية تساعد الشركة على عرض مشاريعها باحترافية، استقبال العملاء بشكل أوضح، وتنظيم المتابعة داخل داشبورد واحد.',
    builtSections: [
      {
        title_en: '1. Professional Company Website',
        title_ar: '1. موقع احترافي للشركة',
        lead_en: 'We built a website that presents the company profile, services, and projects professionally, helping clients understand the company before contacting the sales team.',
        lead_ar: 'قمنا ببناء موقع يعرض هوية الشركة، خدماتها، ومشاريعها بطريقة احترافية تساعد العميل على فهم قوة الشركة قبل التواصل.',
        items_en: [
          'Presenting the company profile more clearly.',
          'Showcasing services and projects.',
          'Building initial trust with clients.',
          'Reducing repeated questions before contact.',
          'Supporting advertising campaigns with a more professional digital destination.',
        ],
        items_ar: [],
      },
      {
        title_en: '2. Landing Pages for Active Projects',
        title_ar: '2. Landing Pages للمشاريع النشطة',
        lead_en: 'We designed landing pages inside the website for active projects, giving each project a clear page where clients can find details before submitting their information.',
        lead_ar: 'صممنا صفحات هبوط داخل الموقع للمشاريع النشطة، بحيث يجد العميل تفاصيل المشروع كاملة في صفحة واضحة بدل الاعتماد على الشرح اليدوي المتكرر.',
        items_en: [
          'Project details.',
          'Key features.',
          'Project location or scope.',
          'Available visual or marketing material.',
          'Contact or quotation request options.',
          'Clear call-to-action.',
        ],
        items_ar: [],
        closing_en: 'This helped improve campaign performance because clients coming from ads could understand the project before leaving their information.',
      },
      {
        title_en: '3. Chatbot for Client Inquiries and Qualification',
        title_ar: '3. Chatbot لاستقبال الاستفسارات وتأهيل العملاء',
        lead_en: 'We connected the website to a chatbot that answers inquiries, guides visitors to the right project, and collects client data smoothly.',
        lead_ar: 'ربطنا الموقع بتشات بوت يساعد على الرد على استفسارات العملاء، توجيههم للمشروع المناسب، وسحب بياناتهم بطريقة سلسة دون أن يشعر العميل بتعقيد.',
        items_en: [
          'Answering repeated questions.',
          'Guiding clients based on their interests.',
          'Collecting basic client information.',
          'Recording requests inside the dashboard.',
          'Starting follow-up before manual intervention is needed.',
        ],
        items_ar: [],
        closing_en: 'This reduced first-contact effort and helped the sales team receive more qualified leads.',
      },
      {
        title_en: '4. Sales CRM Dashboard',
        title_ar: '4. Sales CRM Dashboard للإدارة والفريق',
        lead_en: 'We built a sales dashboard that helps management see the sales pipeline, distribute opportunities, and track team performance.',
        lead_ar: 'قمنا ببناء داشبورد للمبيعات يساعد الإدارة على رؤية قمع المبيعات، توزيع الفرص، ومتابعة أداء الفريق.',
        items_en: [
          'View new clients from the website and chatbot.',
          'Track each client inside the sales pipeline.',
          'Assign clients and tasks to sales representatives.',
          'Record conversation summaries.',
          'Define the next step for each client.',
          'Track sales performance by team member.',
          'Support commission review and distribution.',
          'Reduce reliance on sheets and paper for client management.',
        ],
        items_ar: [
          'رؤية العملاء الجدد من الموقع والتشات بوت.',
          'متابعة حالة كل عميل داخل قمع المبيعات.',
          'توزيع العملاء والمهام على فريق السيلز.',
          'تسجيل ملخص المحادثات.',
          'متابعة الخطوات التالية لكل عميل.',
          'معرفة أداء كل موظف مبيعات.',
          'تسهيل حساب ومراجعة العمولات.',
          'تقليل الاعتماد على الشيتات والورق في إدارة العملاء.',
        ],
      },
    ],

    impactIntro_en: 'The solution helped the company move from scattered manual follow-up to a clearer, more scalable sales workflow.',
    impactIntro_ar: 'ساعد الحل الشركة على الانتقال من متابعة يدوية متفرقة إلى منظومة مبيعات أوضح وأكثر قابلية للتوسع.',
    impactItems_en: [
      'More professional presentation of services and projects.',
      'Better campaign performance through dedicated project landing pages.',
      'Less repeated explanation time for the sales team.',
      'More organized client data collection.',
      'Clearer follow-up for each client inside the sales pipeline.',
      'Less risk of losing client data or conversation details.',
      'Better visibility into sales team performance.',
      'Easier assignment of tasks and opportunities.',
      'Higher team comfort through clearer responsibilities.',
      'Better management decisions based on clearer data.',
      'Lower need for random hiring with every growth stage.',
      'Higher conversion and sales opportunities through a clearer client journey.',
    ],
    impactItems_ar: [
      'عرض المشاريع والخدمات بصورة أكثر احترافية.',
      'تحسين أداء الحملات من خلال صفحات مشاريع مخصصة.',
      'تقليل وقت الشرح المتكرر مع العملاء.',
      'جمع بيانات العملاء بطريقة أكثر تنظيمًا.',
      'متابعة أوضح لكل عميل داخل قمع المبيعات.',
      'تقليل ضياع بيانات العملاء أو تفاصيل المحادثات.',
      'رؤية أفضل لأداء فريق المبيعات.',
      'توزيع أسهل للمهام والفرص داخل الفريق.',
      'تحسين رضا الفريق بسبب وضوح المهام والمتابعة.',
      'دعم الإدارة في اتخاذ قرارات أسرع بناءً على بيانات أوضح.',
      'تقليل الحاجة إلى التوظيف العشوائي مع كل توسع.',
      'رفع فرص التحويل والمبيعات من خلال رحلة أوضح للعميل.',
    ],

    whyMatters_en: 'This case shows that contracting and real estate development companies do not only need more advertising or a larger sales team. They need a clearer path that turns client interest into a trackable sales opportunity. The value of this case is that it connects digital presence, project landing pages, chatbot qualification, and sales pipeline management inside one operating flow. Instead of keeping each client as a WhatsApp number or a row in a sheet, every client now has a status, owner, conversation summary, and next step. In this case, the website was not just a company profile. It became part of a sales and operating system that helps the company scale with more clarity and control.',
    whyMatters_ar: 'هذه الدراسة توضّح أن شركات المقاولات والتطوير العقاري لا تحتاج فقط إلى إعلانات أكثر أو فريق مبيعات أكبر، بل تحتاج إلى مسار أوضح يحوّل اهتمام العميل إلى فرصة قابلة للمتابعة. أهمية هذه الدراسة أنها تربط بين الظهور الرقمي، صفحات المشاريع، التشات بوت، وقمع المبيعات داخل منظومة واحدة. بدل أن يبقى العميل مجرد رقم على واتساب أو صف في شيت، أصبح لكل عميل حالة واضحة، مسؤول متابعة، ملخص محادثة، وخطوة تالية. بهذا الشكل، لم يكن الموقع مجرد واجهة تعريفية، بل أصبح جزءًا من نظام مبيعات وتشغيل يساعد الشركة على التوسع بوضوح وتحكم أكبر.',

    relatedSolutions: [
      { title_en: 'Visits Turned into Trackable Requests', title_ar: 'زيارات تتحول إلى طلبات', desc_en: 'Turning website and campaign visits into clear, followable requests through project landing pages and structured contact flows.', desc_ar: 'تحويل زيارات الموقع والحملات إلى طلبات واضحة قابلة للمتابعة من خلال صفحات مشاريع ونماذج تواصل أكثر تنظيمًا.', href: '/solutions/digital-experiences' },
      { title_en: 'Follow-up That Prevents Lost Opportunities', title_ar: 'متابعة تمنع ضياع الفرص', desc_en: 'Organizing client data and opportunity status inside a clear sales pipeline instead of relying on WhatsApp and Excel.', desc_ar: 'تنظيم بيانات العملاء وحالة كل فرصة داخل قمع مبيعات واضح بدل الاعتماد على الواتساب والإكسيل.', href: '/solutions/follow-up-systems' },
      { title_en: 'Faster Decisions Without Guesswork', title_ar: 'قرار أسرع بدل التخمين', desc_en: 'Giving management better visibility into client status, sales team performance, and opportunities inside the pipeline.', desc_ar: 'إعطاء الإدارة رؤية أوضح لحالة العملاء، أداء فريق المبيعات، والفرص داخل قمع المبيعات.', href: '/solutions/visibility-insights' },
      { title_en: 'Lower Cost and Less Team Pressure', title_ar: 'تكلفة أقل وضغط أقل', desc_en: 'Reducing wasted time in repeated explanations, manual follow-up, and client distribution through automation and organization.', desc_ar: 'تقليل الوقت الضائع في الشرح، المتابعة اليدوية، وتوزيع العملاء من خلال الأتمتة والتنظيم.', href: '/solutions/automation-layers' },
    ],

    cta: {
      title_en: 'Does your company still rely on WhatsApp and Excel for client follow-up?',
      // Arabic CTA translated here, not in original brief (only the English CTA was given for this case).
      title_ar: 'هل شركتك ما زالت تعتمد على الواتساب والإكسيل في متابعة العملاء؟',
      desc_en: 'Tell us how you receive clients, distribute them to your sales team, and follow up on quotation requests — and we will help you identify the closest path to a clearer sales pipeline.',
      desc_ar: 'شاركنا كيف تستقبل العملاء، توزعهم على فريق المبيعات، وتتابع طلبات الأسعار — وسنساعدك على تحديد المسار الأقرب لقمع مبيعات أوضح.',
      button_en: 'Share Your Business Challenge',
      button_ar: 'شارك تحدي عملك',
    },
  },
  {
    id: '5',
    slug: 'digital-education-platform',
    is_published: true,
    sort_order: 4,
    published_at: '2026-07-04T00:00:00.000Z',
    updated_at: '2026-07-04T00:00:00.000Z',

    title_en: 'From education idea to a market-ready learning platform',
    title_ar: 'من فكرة تعليمية إلى منصة تشغيلية قابلة للبيع والنمو',
    sector_en: 'Digital Education Platform|Web Platform + Wallet + Marketplace|Education Technology',
    sector_ar: 'منصة تعليمية رقمية|منصة ويب + محفظة + ماركت بليس|التعليم الرقمي',
    card_problem_en: 'Scattered content, no operating system',
    card_problem_ar: 'محتوى مبعثر بلا نظام تشغيل',
    card_solution_en: 'Student/teacher apps + wallet + dashboard',
    card_solution_ar: 'تجارب طلاب ومدرسين + محفظة + داشبورد',
    card_impact_en: 'Sellable platform from day one',
    card_impact_ar: 'منصة قابلة للبيع من اليوم الأول',
    outcome_en: 'How we helped turn an education platform idea into a web-based operating system that connects students, teachers, training centers, academies, content, wallets, purchases, and management dashboards.',
    outcome_ar: 'كيف ساعدنا في تحويل فكرة منصة تعليمية إلى تجربة تربط الطلاب بالمدرسين والسناتر والأكاديميات، وتدير المحتوى، المحافظ، المشتريات، والمبيعات من خلال لوحة إدارة واضحة.',
    image_url: '/case-studies/digital-education-platform/education-platform-home.jpg',
    gallery_images: [
      '/case-studies/digital-education-platform/education-platform-course.jpg',
      '/case-studies/digital-education-platform/education-platform-dashboard.jpg',
    ],
    demo_url: null,

    snapshot: [
      { label_en: 'Industry', label_ar: 'القطاع', value_en: 'Digital Education', value_ar: 'التعليم الرقمي' },
      { label_en: 'Solution Type', label_ar: 'نوع الحل', value_en: 'Web Platform + Student Wallet + Content Marketplace + Admin Dashboard', value_ar: 'Web Platform + Student Wallet + Content Marketplace + Admin Dashboard' },
      { label_en: 'Users', label_ar: 'المستخدمون', value_en: 'Students, teachers, trainers, centers, academies, and platform management', value_ar: 'الطلاب، المدرسون، المدربون، السناتر، الأكاديميات، وإدارة المنصة' },
      { label_en: 'Stage', label_ar: 'المرحلة', value_en: 'Build / First operational version', value_ar: 'Build / منصة قابلة للإطلاق الأول' },
      { label_en: 'Goal', label_ar: 'الهدف', value_en: 'Build a working platform that supports content sales, user management, payments, and future growth.', value_ar: 'بناء نسخة تشغيلية تساعد على بيع المحتوى التعليمي، إدارة المستخدمين، متابعة المدفوعات، وتجهيز المنصة للنمو.' },
    ],

    situation_en: 'The project aimed to create a digital education platform that brings students, teachers, trainers, centers, and academies into one place. The challenge was not only displaying videos. The platform needed a complete operating experience, letting students find the right content based on grade, subject, and learning stage, letting teachers and centers present content, sell it, and track performance, while giving platform management visibility over accounts, videos, wallets, payments, and sales from one clear dashboard. Without this structure, operating the platform could become complex as the number of students, teachers, and videos grows, making it harder to track purchases, manage wallets, measure content performance, or make clear growth decisions.',
    situation_ar: 'كانت الفكرة تستهدف إنشاء منصة تعليمية رقمية تجمع بين الطلاب، المدرسين، المدربين، السناتر، والأكاديميات في مكان واحد. المشكلة لم تكن في عرض المحتوى فقط، بل في بناء تجربة تشغيلية متكاملة تسمح للطالب بالوصول إلى المحتوى المناسب حسب المرحلة والصف والمادة، وتسمح للمدرس أو السنتر بعرض المحتوى وبيعه ومتابعة أدائه، بينما تستطيع إدارة المنصة متابعة الحسابات، الفيديوهات، المحافظ، المدفوعات، والمبيعات من لوحة واحدة واضحة. بدون هذا الهيكل، كان من الممكن أن يصبح تشغيل المنصة معقدًا مع زيادة عدد الطلاب والمدرسين والفيديوهات، وأن يصعب تتبع المشتريات، إدارة المحافظ، قياس أداء المحتوى، أو اتخاذ قرارات واضحة حول النمو.',

    challengeIntro_en: 'The challenge was to build a first version that is simple enough to launch, but structured enough to scale later.',
    challengeIntro_ar: 'التحدي كان بناء منصة تعليمية تبدأ خفيفة وقابلة للتشغيل، لكنها في نفس الوقت جاهزة للتوسع لاحقًا.',
    challengeItems_en: [
      'Managing different user types inside one platform.',
      'Creating a clear student journey from registration to content purchase and viewing.',
      'Allowing teachers and centers to upload content and define prices.',
      'Building an internal wallet for student purchases.',
      'Protecting educational content inside the platform.',
      'Giving management clear visibility over accounts, content, payments, and reports.',
      'Launching a first operational version without adding unnecessary complexity.',
      'Preparing the product for future features like mobile apps, quizzes, chat, live streaming, and AI.',
    ],
    challengeItems_ar: [
      'تنظيم أكثر من نوع مستخدم داخل المنصة.',
      'توفير رحلة واضحة للطالب من التسجيل حتى شراء ومشاهدة المحتوى.',
      'تمكين المدرسين والسناتر من رفع الفيديوهات وتحديد الأسعار.',
      'بناء محفظة داخلية للطالب لإدارة الرصيد والمشتريات.',
      'حماية المحتوى التعليمي داخل المنصة وتقليل الوصول غير المصرح.',
      'توفير لوحة إدارة تساعد على متابعة الحسابات، المحتوى، المدفوعات، والتقارير.',
      'إطلاق نسخة أولى قابلة للتشغيل بدون تضخيم الخصائص من البداية.',
      'تجهيز المنصة لمراحل تطوير مستقبلية مثل التطبيقات، الاختبارات، الشات، والبث المباشر.',
    ],

    builtIntro_en: 'We designed a real operational education platform structure that connects student experience, teacher tools, center accounts, the internal wallet, content sales, and management controls in one scalable system.',
    builtIntro_ar: 'قمنا بتصميم هيكل منصة تعليمية قابلة للتشغيل الفعلي، بحيث تربط بين تجربة الطالب، أدوات المدرس، حساب السنتر، المحفظة الداخلية، بيع المحتوى، ولوحة الإدارة في نظام واحد قابل للنمو.',
    builtSections: [
      {
        title_en: '1. Student Experience',
        title_ar: '1. تجربة الطالب',
        lead_en: 'We created a clear student journey that starts with account creation, educational stage selection, grade selection, and subject interests, then moves into browsing teachers, centers, and relevant videos.',
        lead_ar: 'تم بناء رحلة طالب واضحة تبدأ من إنشاء الحساب، اختيار المرحلة الدراسية والصف والمواد المهتم بها، ثم تصفح المدرسين والسناتر والفيديوهات المناسبة.',
        items_en: [
          'Create an account and add learning details.',
          'Choose stage, grade, and subjects.',
          'Browse teachers, trainers, and centers.',
          'Open teacher or center profiles.',
          'Purchase videos through an internal wallet.',
          'Watch content inside the platform.',
          'Track wallet balance and transaction history.',
        ],
        items_ar: [
          'إنشاء حساب وإضافة بياناته التعليمية.',
          'اختيار المرحلة والصف والمواد.',
          'تصفح المدرسين والمدربين والسناتر.',
          'الدخول إلى صفحة المدرس أو السنتر.',
          'شراء فيديو تعليمي من خلال المحفظة.',
          'مشاهدة المحتوى داخل المنصة.',
          'متابعة رصيده وسجل عملياته.',
        ],
      },
      {
        title_en: '2. Teacher or Trainer Account',
        title_ar: '2. حساب المدرس أو المدرب',
        lead_en: 'We created a dedicated experience for teachers to present their expertise and content in an organized way.',
        lead_ar: 'تم توفير تجربة مخصصة للمدرس تساعده على عرض خبرته ومحتواه بطريقة منظمة.',
        items_en: [
          'Create a teacher or trainer account.',
          'Add professional details and specialization.',
          'Upload educational videos.',
          'Add title, description, price, subject, and target stage.',
          'Track views and purchases.',
          'Understand content performance through a simple dashboard.',
        ],
        items_ar: [
          'إنشاء حساب كمدرس أو مدرب.',
          'إضافة بياناته المهنية والتخصص.',
          'رفع فيديوهات تعليمية.',
          'تحديد عنوان الفيديو ووصفه وسعره.',
          'ربط الفيديو بالمادة والمرحلة المناسبة.',
          'متابعة المشاهدات والمبيعات.',
          'معرفة أداء المحتوى من خلال لوحة مبسطة.',
        ],
      },
      {
        title_en: '3. Center or Academy Account',
        title_ar: '3. حساب السنتر أو الأكاديمية',
        lead_en: 'We designed independent accounts for centers and academies so they can appear as educational entities inside the platform.',
        lead_ar: 'تم تصميم حساب مستقل للسناتر والأكاديميات حتى تظهر ككيانات تعليمية داخل المنصة.',
        items_en: [
          'Create their own profile page.',
          'Add logo, description, and served educational stages.',
          'Upload videos and set prices.',
          'Display content inside their page.',
          'Track performance and sales through a simple dashboard.',
        ],
        items_ar: [
          'إنشاء صفحة تعريفية خاصة.',
          'إضافة اللوجو والوصف والمراحل التعليمية.',
          'رفع الفيديوهات وتحديد الأسعار.',
          'عرض المحتوى التعليمي داخل صفحة السنتر.',
          'متابعة الأداء والمبيعات من خلال لوحة مبسطة.',
        ],
      },
      {
        title_en: '4. Internal Student Wallet',
        title_ar: '4. نظام المحفظة الداخلية',
        lead_en: 'We designed an internal wallet for each student to make content purchases more organized.',
        lead_ar: 'تم تصميم محفظة داخلية لكل طالب لتسهيل شراء المحتوى داخل المنصة.',
        items_en: [
          'Current balance.',
          'Balance top-up.',
          'Video purchases.',
          'Automatic balance deduction.',
          'Transaction history.',
          'Remaining balance after each purchase.',
        ],
        items_ar: [
          'عرض الرصيد الحالي.',
          'شحن الرصيد.',
          'شراء الفيديوهات.',
          'خصم قيمة الفيديو من الرصيد.',
          'متابعة سجل العمليات.',
          'عرض الرصيد المتبقي بعد كل عملية.',
        ],
        closing_en: 'This made the purchase flow more organized and reduced manual handling of each transaction.',
        closing_ar: 'هذا النظام جعل الشراء داخل المنصة أكثر تنظيمًا، وقلل الحاجة إلى إدارة كل عملية شراء يدويًا.',
      },
      {
        title_en: '5. Points and Rewards System',
        title_ar: '5. نظام النقاط والمكافآت',
        lead_en: 'We added a simple points system to encourage student engagement.',
        lead_ar: 'تم إضافة نظام نقاط بسيط لتحفيز الطلاب على التفاعل مع المنصة.',
        items_en: [
          'Buying a lesson.',
          'Watching a lesson.',
          'Completing a video.',
          'Continued platform interaction.',
        ],
        items_ar: [
          'شراء درس.',
          'مشاهدة درس.',
          'إكمال فيديو.',
          'التفاعل المستمر داخل المنصة.',
        ],
        closing_en: 'This helps increase engagement and retention, with future potential for discounts, rewards, or special offers.',
        closing_ar: 'هذا النظام يساعد على زيادة التفاعل والاحتفاظ بالطلاب، مع إمكانية تطويره لاحقًا إلى خصومات أو مكافآت أو عروض خاصة.',
      },
      {
        title_en: '6. Content Protection',
        title_ar: '6. حماية المحتوى التعليمي',
        lead_en: 'We designed content viewing inside the platform without direct video download for students.',
        lead_ar: 'تم تصميم طريقة عرض الفيديوهات داخل المنصة دون توفير تحميل مباشر للطلاب.',
        items_en: [
          'Connecting video access to student accounts.',
          'Managing viewing permissions.',
          'Reducing direct access to video files.',
          'Preparing for advanced protection such as DRM in later stages.',
        ],
        items_ar: [
          'ربط مشاهدة الفيديو بحساب الطالب.',
          'تنظيم صلاحيات الوصول.',
          'تقليل الوصول المباشر إلى ملفات الفيديو.',
          'تجهيز المنصة لإضافة حماية أكثر تقدمًا لاحقًا مثل DRM عند الحاجة.',
        ],
      },
      {
        title_en: '7. Management Dashboard',
        title_ar: '7. لوحة تحكم الإدارة',
        lead_en: 'We built a dashboard that helps platform management operate and monitor daily activity.',
        lead_ar: 'تم بناء لوحة إدارة تساعد على تشغيل المنصة ومراقبة النشاط اليومي.',
        items_en: [
          'Students, teachers, trainers, centers, and academies.',
          'New, active, and suspended accounts.',
          'Uploaded videos and their status.',
          'Views and purchases.',
          'Wallets and top-up requests.',
          'Purchase records and payment activity.',
          'Most viewed and best-selling videos.',
          'Support issues and complaints.',
        ],
        items_ar: [
          'حسابات الطلاب والمدرسين والسناتر.',
          'الحسابات الجديدة والمفعلة والموقوفة.',
          'الفيديوهات المرفوعة وحالتها.',
          'المشاهدات والمشتريات.',
          'المحافظ وطلبات الشحن.',
          'عمليات الشراء وسجل المدفوعات.',
          'أكثر الفيديوهات مشاهدة ومبيعًا.',
          'المشاكل والشكاوى وخدمة العملاء.',
        ],
      },
    ],

    impactIntro_en: 'The solution helped turn the idea into an education platform that can sell, operate, and be tracked from day one.',
    impactIntro_ar: 'ساعد الحل على تحويل الفكرة إلى منصة تعليمية قابلة للبيع، التشغيل، والمتابعة من اليوم الأول.',
    impactItems_en: [
      'Launching a first version ready for real use and market testing.',
      'Turning educational content into a sellable product inside the platform.',
      'Enabling students to purchase and watch content through a clear, organized experience.',
      'Creating a revenue stream from selling videos and educational content.',
      'Giving teachers and centers tools to upload content, set prices, and track performance.',
      'Reducing manual work in managing purchases, top-ups, videos, and accounts.',
      'Organizing the relationship between students, teachers, centers, and platform management in one system.',
      'Giving management clearer visibility over sales, wallets, users, and content.',
      'Helping management understand top-viewed and best-selling videos, as well as teacher and center performance.',
      'Improving student retention potential through points and rewards.',
      'Reducing launch risk by starting with a focused first version before expanding the product too early.',
      'Building a scalable foundation for mobile apps, quizzes, chat, live streaming, advanced video protection, and AI layers later.',
    ],
    impactItems_ar: [
      'إطلاق نسخة أولى قابلة للاستخدام الفعلي واختبار السوق.',
      'تحويل المحتوى التعليمي إلى منتج قابل للبيع داخل المنصة.',
      'تمكين الطلاب من الشراء والمشاهدة من خلال تجربة واضحة ومنظمة.',
      'إنشاء مصدر دخل للمنصة من بيع الفيديوهات والمحتوى التعليمي.',
      'تمكين المدرسين والسناتر من رفع المحتوى وتحديد الأسعار ومتابعة الأداء.',
      'تقليل التشغيل اليدوي في إدارة عمليات الشراء، الشحن، الفيديوهات، والحسابات.',
      'تنظيم العلاقة بين الطلاب، المدرسين، السناتر، وإدارة المنصة داخل نظام واحد.',
      'منح الإدارة رؤية أوضح على المبيعات، المحافظ، المستخدمين، والمحتوى.',
      'مساعدة الإدارة على معرفة أكثر الفيديوهات مشاهدة ومبيعًا، وأداء المدرسين والسناتر.',
      'تحسين قابلية الاحتفاظ بالطلاب من خلال نظام النقاط والمكافآت.',
      'تقليل مخاطر البداية من خلال إطلاق نسخة أولى مركزة بدل تضخيم المنتج قبل اختبار السوق.',
      'بناء أساس قابل للتوسع لاحقًا بإضافة تطبيقات موبايل، اختبارات، شات، بث مباشر، حماية فيديو متقدمة، وطبقات ذكاء اصطناعي.',
    ],

    whyMatters_en: 'This case shows that a successful education platform is not only about uploading videos. It requires a system that connects content, purchase, viewing, wallets, teachers, centers, and management. The value of this case started with a clear business goal, a platform able to receive students, sell content, track teacher and center performance, and manage financial and operational activity from one place. This made the idea testable in the market, able to generate early revenue indicators, and ready to evolve later based on real usage and the behavior of students and teachers inside the platform.',
    whyMatters_ar: 'هذه الدراسة توضّح أن بناء منصة تعليمية ناجحة لا يعتمد على رفع الفيديوهات فقط، بل على بناء نظام يربط بين المحتوى، الشراء، المشاهدة، المحافظ، المدرسين، السناتر، والإدارة. أهمية هذه الحالة أنها بدأت من هدف تجاري واضح، هو منصة يمكنها استقبال الطلاب، بيع المحتوى، متابعة أداء المدرسين والسناتر، وإدارة العمليات المالية والتشغيلية من مكان واحد. بهذا الشكل، أصبحت الفكرة قابلة للاختبار في السوق، وقادرة على تحقيق أول مؤشرات الإيراد، ثم التطور لاحقًا بناءً على الاستخدام الحقيقي وسلوك الطلاب والمدرسين داخل المنصة.',

    relatedSolutions: [
      { title_en: 'Clearer Journey. Higher Conversion.', title_ar: 'رحلة أوضح، تحويل أعلى', desc_en: 'Designing a clear student journey from registration to purchase and content viewing.', desc_ar: 'تصميم رحلة طالب واضحة من التسجيل حتى شراء ومشاهدة المحتوى.' },
      { title_en: 'Visits Turned into Trackable Requests', title_ar: 'زيارات تتحول إلى طلبات', desc_en: 'Turning platform visits into registrations and trackable purchases.', desc_ar: 'تحويل زيارات المنصة إلى تسجيلات وعمليات شراء قابلة للمتابعة.', href: '/solutions/digital-experiences' },
      { title_en: 'Faster Decisions Without Guesswork', title_ar: 'قرار أسرع بدل التخمين', desc_en: 'Giving management a dashboard to track users, content, payments, and sales.', desc_ar: 'توفير لوحة إدارة تساعد على متابعة المستخدمين، المحتوى، المدفوعات، والمبيعات.', href: '/solutions/visibility-insights' },
      { title_en: 'Startup Products / Build Stage', title_ar: 'منتجات الشركات الناشئة / Build Stage', desc_en: 'Turning an education idea into a first launchable product.', desc_ar: 'تحويل فكرة تعليمية إلى نسخة أولى قابلة للإطلاق والتطوير.', href: '/solutions/build' },
    ],

    cta: {
      title_en: 'Do you have an education platform idea that needs to be tested?',
      title_ar: 'هل لديك فكرة منصة تعليمية وتريد اختبارها في السوق؟',
      desc_en: 'Tell us about your content, target audience, and current operating model — and we will help you define the closest path to building a launchable education product.',
      desc_ar: 'شاركنا نوع المحتوى، الجمهور المستهدف، وطريقة التشغيل الحالية — وسنساعدك على تحديد أقرب مسار لبناء نسخة تعليمية قابلة للإطلاق والنمو.',
      button_en: 'Share Your Business Challenge',
      button_ar: 'شارك تحدي عملك',
    },
  },
  {
    id: '6',
    slug: 'multi-branch-retail-ecommerce-saudi',
    is_published: true,
    sort_order: 5,
    published_at: '2026-07-03T00:00:00.000Z',
    updated_at: '2026-07-03T00:00:00.000Z',

    title_en: 'From traditional branch sales to an online store and unified operating dashboard',
    title_ar: 'من بيع تقليدي داخل الفروع إلى متجر إلكتروني ولوحة تشغيل موحدة',
    sector_en: 'Saudi Arabia, Multi-Branch Retail|E-commerce + Inventory Dashboard|Sales & Growth',
    sector_ar: 'السعودية، تجزئة متعددة الفروع|متجر إلكتروني + داشبورد مخزون|المبيعات والنمو',
    card_problem_en: 'No online sales channel',
    card_problem_ar: 'لا توجد قناة بيع أونلاين',
    card_solution_en: 'E-commerce + inventory & branch dashboard',
    card_solution_ar: 'متجر إلكتروني + داشبورد مخزون وفروع',
    card_impact_en: 'New online channel, clearer reports',
    card_impact_ar: 'قناة أونلاين جديدة وتقارير أوضح',
    outcome_en: 'How we helped a multi-branch retail store in Saudi Arabia start its digital transformation through an e-commerce website, connected branches and inventory, operational reports, and digital campaigns that support sales.',
    outcome_ar: 'كيف ساعدنا متجرًا متعدد الفروع في السعودية على بدء التحول الرقمي من خلال متجر إلكتروني، ربط الفروع والمخزون، تقارير تشغيلية، وحملات رقمية تدعم المبيعات.',
    image_url: null,
    gallery_images: [],
    demo_url: null,

    snapshot: [
      { label_en: 'Client', label_ar: 'العميل', value_en: 'Multi-branch retail store', value_ar: 'متجر متعدد الفروع' },
      { label_en: 'Country', label_ar: 'الدولة', value_en: 'Saudi Arabia', value_ar: 'السعودية' },
      { label_en: 'Industry', label_ar: 'القطاع', value_en: 'Retail / Multi-branch store', value_ar: 'Retail / متجر متعدد الفروع' },
      { label_en: 'Stage', label_ar: 'المرحلة', value_en: 'Start / Digital Transformation', value_ar: 'Start / التحول الرقمي' },
      { label_en: 'Solution Type', label_ar: 'نوع الحل', value_en: 'E-commerce Website + Inventory Dashboard + Branch Management + Reporting + Digital Identity + Ad Campaigns', value_ar: 'E-commerce Website + Inventory Dashboard + Branch Management + Reporting + Digital Identity + Ad Campaigns' },
      { label_en: 'Goal', label_ar: 'الهدف', value_en: 'Launch an online sales channel, organize inventory, connect branches, and improve daily and monthly sales visibility.', value_ar: 'فتح قناة بيع أونلاين، تنظيم المخزون، ربط الفروع، وتحسين وضوح المبيعات والتقارير اليومية والشهرية.' },
    ],

    situation_en: 'The client managed several branches in a traditional way, with sales mainly depending on customers visiting the physical stores. The business did not have an online sales channel that could help it reach customers beyond branch locations. As branches increased and the owner wanted to expand, inventory tracking, best-selling product visibility, and daily and monthly sales reviews became harder to manage manually.',
    situation_ar: 'كان المتجر يدير عدة فروع بالطريقة التقليدية، وكانت المبيعات تعتمد بشكل أساسي على زيارة العملاء للفروع. لم يكن لدى المتجر قناة بيع أونلاين تساعده على الوصول إلى عملاء خارج نطاق الفروع. ومع زيادة الفروع والرغبة في التوسع، أصبحت متابعة المخزون، معرفة المنتجات الأكثر طلبًا، ومراجعة المبيعات اليومية والشهرية تحتاج إلى وقت وجهد كبير.',

    challengeIntro_en: 'The challenge was not only to create an online store. It was to start a digital transformation that connects sales, inventory, branches, delivery, reporting, and marketing.',
    challengeIntro_ar: 'التحدي لم يكن إنشاء متجر إلكتروني فقط، بل بناء بداية تحول رقمي تربط بين البيع، المخزون، الفروع، التوصيل، التقارير، والتسويق.',
    challengeItems_en: [
      'No online sales channel.',
      'Sales depended mainly on branch visitors.',
      'Difficulty managing inventory across multiple branches.',
      'No clear daily and monthly reports.',
      'Limited visibility into best-selling products.',
      'Need to connect online orders with delivery.',
      'Weak digital presence before identity and campaigns.',
    ],
    challengeItems_ar: [
      'عدم وجود قناة بيع أونلاين.',
      'اعتماد المبيعات على زيارات الفروع فقط.',
      'صعوبة إدارة المخزون بين أكثر من فرع.',
      'غياب تقارير يومية وشهرية واضحة.',
      'عدم وضوح المنتجات الأكثر طلبًا.',
      'الحاجة إلى ربط الطلبات بخدمة توصيل.',
      'ضعف الحضور الرقمي قبل بناء الهوية والحملات.',
    ],

    builtIntro_en: 'We built a digital system that helps the store start selling online, organize branches, monitor inventory, and read results from one place.',
    builtIntro_ar: 'قمنا ببناء منظومة رقمية تساعد المتجر على بدء البيع أونلاين، تنظيم الفروع، متابعة المخزون، وقراءة النتائج من مكان واحد.',
    builtSections: [
      {
        title_en: '1. E-commerce Website',
        title_ar: '1. متجر إلكتروني على الويب',
        lead_en: 'We created an online store that presents products clearly and allows customers to browse products, add them to cart, and place delivery orders.',
        lead_ar: 'أنشأنا متجرًا إلكترونيًا يعرض المنتجات بطريقة واضحة، ويسمح للعملاء بتصفح المنتجات، إضافتها إلى السلة، وطلبها للتوصيل.',
        items_en: [],
        items_ar: [],
        closing_en: 'This opened a new sales channel and helped the store reach customers beyond branch locations.',
        closing_ar: 'هذا فتح قناة بيع جديدة للمتجر، وساعده على الوصول إلى عملاء خارج حدود الفروع.',
      },
      {
        title_en: '2. Delivery Service Connection',
        title_ar: '2. ربط الطلبات بخدمة التوصيل',
        lead_en: 'We helped the client contract with a delivery company to ship products to customers, making the buying experience complete from order to delivery.',
        lead_ar: 'ساعدنا العميل على التعاقد مع شركة توصيل لشحن المنتجات للعملاء، حتى تصبح تجربة الشراء مكتملة من الطلب حتى الاستلام.',
        items_en: [],
        items_ar: [],
        closing_en: 'This expanded geographic sales reach and reduced dependency on in-branch visits.',
        closing_ar: 'هذا ساعد على توسيع نطاق البيع جغرافيًا وتقليل الاعتماد على حضور العميل للفرع.',
      },
      {
        title_en: '3. Inventory and Branch Management Dashboard',
        title_ar: '3. Dashboard لإدارة المخزون والفروع',
        lead_en: 'We designed a dashboard that helps management track products, inventory, branches, accounts, and workers from one place.',
        lead_ar: 'صممنا داشبورد تساعد الإدارة على متابعة المنتجات، المخزون، الفروع، الحسابات، والعمالة من مكان واحد.',
        items_en: [],
        items_ar: [],
        closing_en: 'Management can now see current inventory, low-stock products, sales movement, and online orders more clearly.',
        closing_ar: 'أصبحت الإدارة قادرة على معرفة المخزون الحالي، المنتجات الناقصة، حركة البيع، والطلبات الأونلاين بشكل أوضح.',
      },
      {
        title_en: '4. Reporting Page for Management',
        title_ar: '4. صفحة تقارير للإدارة',
        lead_en: 'We created a reporting page that shows daily and monthly sales, best-selling products, current inventory, and products reduced during the day.',
        lead_ar: 'أنشأنا صفحة تقارير تعرض المبيعات اليومية والشهرية، المنتجات الأكثر طلبًا، حجم المخزون الحالي، وما نقص خلال اليوم.',
        items_en: [],
        items_ar: [],
        closing_en: 'These reports help management make faster decisions around purchasing, supply, and offers.',
        closing_ar: 'هذه التقارير ساعدت الإدارة على اتخاذ قرارات أسرع حول الشراء، التوريد، والعروض.',
      },
      {
        title_en: '5. Digital Identity and Advertising Campaigns',
        title_ar: '5. هوية رقمية وحملات إعلانية',
        lead_en: "We prepared the store's digital presence and launched advertising campaigns on social media platforms and Google to support the online store and increase orders.",
        lead_ar: 'قمنا بتجهيز حضور رقمي للمتجر وتنفيذ حملات إعلانية على منصات التواصل الاجتماعي وجوجل لدعم المتجر الإلكتروني وزيادة الطلبات.',
        items_en: [],
        items_ar: [],
        closing_en: 'This helped attract targeted visits and turn them into purchase orders.',
        closing_ar: 'هذا ساعد على جذب زيارات مستهدفة وتحويلها إلى طلبات شراء.',
      },
    ],

    impactIntro_en: 'The solution helped the store move from traditional branch-based selling to the beginning of a clearer and more scalable digital transformation.',
    impactIntro_ar: 'ساعد الحل المتجر على الانتقال من بيع تقليدي يعتمد على الفروع فقط إلى بداية تحول رقمي أكثر وضوحًا وقابلية للتوسع.',
    impactItems_en: [
      'Launching a new online sales channel.',
      'Reaching a wider customer segment.',
      'Increasing sales opportunities through the store and campaigns.',
      'Making product ordering and delivery easier.',
      'Organizing inventory and connecting branches inside one system.',
      'Clearer daily and monthly sales visibility.',
      'Identifying best-selling products to support purchasing and offers.',
      'Reducing dependency on manual tracking.',
      "Improving management's ability to track branches and workers.",
      'Building a stronger digital presence for the store.',
    ],
    impactItems_ar: [
      'فتح قناة بيع أونلاين جديدة.',
      'الوصول إلى شريحة أوسع من العملاء.',
      'رفع فرص المبيعات من خلال المتجر والحملات.',
      'تسهيل طلب المنتجات والتوصيل.',
      'تنظيم المخزون وربط الفروع داخل نظام واحد.',
      'وضوح أكبر في المبيعات اليومية والشهرية.',
      'معرفة المنتجات الأكثر طلبًا لدعم قرارات الشراء والعروض.',
      'تقليل الاعتماد على المتابعة اليدوية.',
      'تحسين قدرة الإدارة على متابعة الفروع والعمالة.',
      'بناء حضور رقمي أقوى للمتجر.',
    ],

    whyMatters_en: 'This case shows that digital transformation for retail stores does not start only with an e-commerce website. It starts with connecting products, orders, inventory, branches, delivery, reporting, and marketing. The value of this case is that it moved the store from branch-limited sales to a more organized model that supports online selling, performance visibility, and better decisions based on daily and monthly data.',
    whyMatters_ar: 'هذه الدراسة توضّح أن التحول الرقمي للمتاجر لا يبدأ فقط بإنشاء متجر إلكتروني، بل ببناء منظومة تربط بين المنتجات، الطلبات، المخزون، الفروع، التوصيل، التقارير، والتسويق. أهمية هذه الحالة أنها نقلت المتجر من بيع محدود داخل الفروع إلى نموذج أكثر تنظيمًا، يسمح بالبيع أونلاين، قراءة الأداء، واتخاذ قرارات أفضل بناءً على بيانات يومية وشهرية.',

    relatedSolutions: [
      { title_en: 'Visits Turned into Trackable Requests', title_ar: 'زيارات تتحول إلى طلبات', desc_en: 'Turning online store and campaign visits into clear purchase orders that can be tracked.', desc_ar: 'تحويل زيارات المتجر الإلكتروني والحملات إلى طلبات شراء واضحة قابلة للمتابعة.', href: '/solutions/digital-experiences' },
      { title_en: 'Faster Decisions Without Guesswork', title_ar: 'قرار أسرع بدل التخمين', desc_en: 'Providing daily and monthly reports that help management track sales, inventory, and best-selling products.', desc_ar: 'توفير تقارير يومية وشهرية تساعد الإدارة على متابعة المبيعات، المخزون، والمنتجات الأكثر طلبًا.', href: '/solutions/visibility-insights' },
      { title_en: 'Start Stage / Digital Transformation', title_ar: 'Start Stage / Digital Transformation', desc_en: 'Digitizing an existing store and moving it from traditional operations to a more organized digital sales and operating model.', desc_ar: 'رقمنة متجر قائم وتحويله من تشغيل تقليدي إلى بيع وتشغيل رقمي أكثر تنظيمًا.', href: '/solutions/start' },
    ],

    cta: {
      title_en: 'Do you have branches and want to start selling online?',
      title_ar: 'هل لديك فروع وتريد بدء البيع أونلاين؟',
      desc_en: 'Tell us how you currently manage sales, inventory, branches, and delivery — and we will help you identify the closest path to a clearer sales and operating system.',
      desc_ar: 'شاركنا كيف تدير المبيعات، المخزون، الفروع، والتوصيل حاليًا — وسنساعدك على تحديد المسار الأقرب لبناء منظومة بيع وتشغيل أوضح.',
      button_en: 'Share Your Business Challenge',
      button_ar: 'شارك تحدي عملك',
    },
  },
  {
    id: '7',
    slug: 'ai-communication-follow-up-layer',
    is_published: true,
    sort_order: 6,
    published_at: '2026-07-02T00:00:00.000Z',
    updated_at: '2026-07-02T00:00:00.000Z',

    title_en: 'From scattered communication to intelligent follow-up that drives sales and decisions',
    title_ar: 'من تواصل مشتت إلى متابعة ذكية تقود المبيعات والقرار',
    sector_en: 'AI Automation Demo|AI Communication Layer|AI & Automation',
    sector_ar: 'ديمو أتمتة بالذكاء الاصطناعي|طبقة ذكاء للتواصل|الذكاء الاصطناعي والأتمتة',
    badge_en: 'Demo Case Study',
    badge_ar: 'Demo Case Study',
    card_problem_en: 'Scattered customer communication',
    card_problem_ar: 'تواصل عملاء مشتت',
    card_solution_en: 'AI layer over your existing system',
    card_solution_ar: 'طبقة ذكاء فوق نظامك الحالي',
    card_impact_en: 'Smarter, faster follow-up',
    card_impact_ar: 'متابعة أذكى وأسرع',
    outcome_en: 'A demo solution built around a repeated market problem, where companies receive customers through websites, WhatsApp, and calls, but follow-up is scattered between employees and does not always turn into clear data or accurate decisions. We designed an AI layer that connects with the current system and communication channels to update each customer file, organize follow-up, and improve management visibility.',
    outcome_ar: 'نسخة تجريبية لحل مبني على مشكلة متكررة في السوق، حيث تستقبل الشركات العملاء من الموقع، الواتساب، والمكالمات، لكن المتابعة تتوزع بين الموظفين ولا تتحول دائمًا إلى بيانات واضحة أو قرارات دقيقة. صممنا طبقة ذكاء اصطناعي ترتبط بالنظام الحالي وقنوات التواصل لتحديث ملف كل عميل، تنظيم المتابعة، ورفع وضوح الإدارة.',
    image_url: null,
    gallery_images: [],
    demo_url: null,

    snapshot: [
      { label_en: 'Case Type', label_ar: 'نوع الحالة', value_en: 'Demo based on a repeated market problem', value_ar: 'Demo مبني على مشكلة متكررة في السوق' },
      { label_en: 'Suitable Sectors', label_ar: 'القطاعات المناسبة', value_en: 'Clinics, appointment-based services, service companies, real estate, and sales-driven businesses', value_ar: 'العيادات، مراكز الحجز، شركات الخدمات، العقارات، وشركات تعتمد في البيع على التواصل المباشر مع العملاء' },
      { label_en: 'Stage', label_ar: 'المرحلة', value_en: 'Growth / AI Automation Layer', value_ar: 'Growth / AI Automation Layer' },
      { label_en: 'Goal', label_ar: 'الهدف', value_en: "Build an AI layer on top of the company's current system to receive customers from the website, WhatsApp, and company numbers, update customer status, summarize communication, organize follow-up, and turn communication data into clearer reports and management suggestions.", value_ar: 'بناء طبقة ذكاء اصطناعي فوق النظام الحالي للشركة، تساعد على استقبال العملاء من الموقع والواتساب وأرقام الشركة، تحديث حالة كل عميل، تلخيص التواصل، تنظيم المتابعة، وتحويل بيانات التواصل إلى تقارير واقتراحات أوضح للإدارة.' },
    ],

    situation_en: 'Many customer-facing companies face the same problem, with customers arriving through phone calls, WhatsApp, or website chat while their data and follow-up stay scattered between employees, conversations, manual notes, and spreadsheets. After every interaction, an employee usually needs to write a summary, update the customer stage, define the next follow-up date, and report updates to management. As the number of customers grows, details start to get lost, whether it is a customer who is not followed up, an interaction that is not summarized, an opportunity that does not move to the next stage, or management seeing the full picture too late. The issue is not only the number of communication channels. It is the lack of an intelligent layer that connects those channels to one follow-up system.',
    situation_ar: 'كثير من الشركات التي تعتمد على التواصل مع العملاء تعاني من نفس المشكلة، فالعميل قد يأتي من مكالمة، رسالة واتساب، أو تشات على الموقع، لكن بياناته ومتابعته تتوزع بين الموظفين، المحادثات، الملاحظات اليدوية، والشيتات. الموظف يحتاج بعد كل تواصل أن يكتب ملخصًا لما حدث، يحدد مرحلة العميل، يسجل موعد المتابعة، ويبلغ الإدارة بالتحديثات. ومع زيادة عدد العملاء، تبدأ التفاصيل في الضياع، سواء عميل لم تتم متابعته، تفاعل لم يتم تلخيصه، فرصة لم تنتقل للمرحلة التالية، أو إدارة لا ترى الصورة كاملة إلا بعد فوات الوقت. المشكلة هنا ليست في وجود قنوات تواصل فقط، بل في غياب طبقة ذكية تربط هذه القنوات بنظام متابعة واحد.',

    challengeIntro_en: 'The company does not only need a chatbot or CRM. The real challenge is to build an intelligent layer that understands customer communication, updates customer status, and helps teams and management make faster decisions.',
    challengeIntro_ar: 'الشركة لا تحتاج فقط إلى Chatbot أو CRM. التحدي الحقيقي هو بناء طبقة ذكية تستطيع فهم التواصل مع العميل، تحديث حالته، ومساعدة الفريق والإدارة على اتخاذ قرارات أسرع.',
    challengeItems_en: [
      'Customers scattered across calls, WhatsApp, and website chat.',
      'Employees manually entering notes after every interaction.',
      'Difficulty knowing the current stage of each customer.',
      'Weak automated follow-up based on customer status.',
      'Limited visibility into sales or customer service performance.',
      'Lack of summarized reports for management.',
      'Lost opportunities due to delayed replies or missed follow-up.',
      'Difficulty turning communication data into useful decisions.',
    ],
    challengeItems_ar: [
      'تشتت العملاء بين المكالمات، الواتساب، وتشات الموقع.',
      'اعتماد الموظفين على إدخال الملاحظات يدويًا بعد كل تواصل.',
      'صعوبة معرفة المرحلة الحالية لكل عميل.',
      'ضعف المتابعة التلقائية حسب حالة العميل.',
      'عدم وضوح أداء فريق المبيعات أو خدمة العملاء.',
      'غياب تقارير مختصرة ودقيقة للإدارة.',
      'فقد فرص بسبب تأخر الرد أو نسيان المتابعة.',
      'صعوبة تحويل بيانات التواصل إلى قرارات عملية.',
    ],

    builtIntro_en: "We built a demo model for an AI layer that can sit on top of a company's current system and connect with key communication channels such as the website, WhatsApp, and company numbers.",
    builtIntro_ar: 'قمنا ببناء نموذج ديمو لطبقة ذكاء اصطناعي يمكن تركيبها فوق النظام الحالي للشركة، وربطها بقنوات التواصل الأساسية مثل الموقع، الواتساب، وأرقام الشركة.',
    builtSections: [
      {
        title_en: '1. Intelligent Website Assistant',
        title_ar: '1. مساعد ذكي على الموقع',
        lead_en: 'We built an intelligent assistant inside the website that receives customer inquiries, understands customer needs, and classifies requests by service type or stage.',
        lead_ar: 'تم بناء مساعد ذكي داخل الموقع يستطيع استقبال استفسارات العملاء، فهم احتياجهم، وتصنيف الطلب حسب نوع الخدمة أو المرحلة.',
        items_en: [
          'Responding to website inquiries.',
          'Collecting basic customer data smoothly.',
          'Identifying customer intent or request type.',
          'Registering the customer inside the system.',
          'Moving the customer to the right follow-up stage.',
          'Reducing pressure on reception or sales teams.',
        ],
        items_ar: [
          'الرد على استفسارات العملاء من الموقع.',
          'جمع البيانات الأساسية بطريقة سلسة.',
          'تحديد نية العميل أو نوع الطلب.',
          'تسجيل العميل داخل النظام.',
          'نقل العميل إلى المرحلة المناسبة داخل قمع المتابعة.',
          'تقليل الضغط على فريق الاستقبال أو المبيعات.',
        ],
      },
      {
        title_en: '2. WhatsApp Follow-up Integration',
        title_ar: '2. ربط بالواتساب للرد والمتابعة',
        lead_en: 'We designed a follow-up layer connected to WhatsApp so communication is not left as scattered conversations, but becomes part of a structured follow-up flow.',
        lead_ar: 'تم تصميم طبقة متابعة مرتبطة بالواتساب، بحيث لا يظل التواصل مجرد محادثات منفصلة، بل يتحول إلى مسار متابعة منظم.',
        items_en: [
          'Faster first responses.',
          'Following up based on customer stage.',
          'Sending reminders or follow-up messages automatically.',
          'Updating customer status inside the system.',
          'Reducing missed follow-up.',
          'Keeping communication organized instead of relying on memory or scattered chats.',
        ],
        items_ar: [
          'إرسال ردود أولية أسرع.',
          'متابعة العملاء حسب مرحلتهم الحالية.',
          'إرسال تذكيرات أو رسائل متابعة تلقائية.',
          'تحديث حالة العميل داخل النظام.',
          'تقليل نسيان المتابعة.',
          'إبقاء التواصل منظمًا بدل الاعتماد على الذاكرة أو المحادثات المتفرقة.',
        ],
      },
      {
        title_en: '3. Company Number and Communication Integration',
        title_ar: '3. ربط بأرقام الشركة وقنوات الاتصال',
        lead_en: 'The solution can connect with company numbers and communication channels, turning customer interactions into part of the customer file inside the system. The goal is not only to receive calls, but to turn communication into understandable and trackable data.',
        lead_ar: 'يمكن ربط الحل بقنوات الاتصال وأرقام الشركة، بحيث تصبح تفاعلات العملاء جزءًا من ملف العميل داخل النظام. الغرض ليس مجرد استقبال المكالمات، بل تحويل التواصل إلى بيانات قابلة للفهم والمتابعة.',
        items_en: [
          'Linking each interaction to the customer file.',
          'Creating a clear communication summary.',
          'Updating the customer stage automatically based on the interaction.',
          'Suggesting the next step.',
          'Identifying whether the customer needs follow-up, quotation, booking, or management attention.',
          'Reducing the need for employees to manually enter every detail.',
        ],
        items_ar: [
          'ربط كل تواصل بملف العميل.',
          'تسجيل ملخص واضح بعد التواصل.',
          'تحديث مرحلة العميل تلقائيًا حسب ما حدث.',
          'تحديد الخطوة التالية المقترحة.',
          'معرفة هل العميل يحتاج متابعة، عرض سعر، حجز، أو تدخل من الإدارة.',
          'تقليل الاعتماد على إدخال الموظف لكل التفاصيل يدويًا.',
        ],
      },
      {
        title_en: '4. Voice Response Model',
        title_ar: '4. نموذج صوتي للرد على العملاء',
        lead_en: 'We designed a concept for an intelligent voice model that can handle initial calls or repeated inquiries based on company rules.',
        lead_ar: 'تم تصميم تصور لنموذج صوتي ذكي يمكنه التعامل مع المكالمات الأولية أو الاستفسارات المتكررة حسب قواعد الشركة.',
        items_en: [
          'Answering common inquiries.',
          'Routing customers to the right service or team.',
          'Reducing waiting time.',
          'Collecting initial customer needs.',
          'Escalating important cases to the right team.',
          'Supporting companies that receive a high number of calls daily.',
        ],
        items_ar: [
          'الرد على بعض الاستفسارات الشائعة.',
          'توجيه العميل للقسم أو الخدمة المناسبة.',
          'تقليل وقت الانتظار.',
          'تسجيل بيانات أولية عن احتياج العميل.',
          'تصعيد الحالات المهمة للفريق المختص.',
          'دعم الشركات التي تستقبل عددًا كبيرًا من المكالمات يوميًا.',
        ],
      },
      {
        title_en: '5. Automatically Updated Customer File',
        title_ar: '5. ملف عميل يتم تحديثه تلقائيًا',
        lead_en: 'Instead of relying on employees to manually write every interaction summary, the system updates the customer file automatically based on communication.',
        lead_ar: 'بدل أن يدخل الموظف بعد كل تواصل ليكتب ملخصًا يدويًا، يقوم النظام بتحديث ملف العميل تلقائيًا بناءً على التفاعل.',
        items_en: [
          'Basic customer details.',
          'Communication source.',
          'Request type.',
          'Last interaction.',
          'Interaction summary.',
          'Current follow-up stage.',
          'Next follow-up date.',
          'Suggested next action.',
        ],
        items_ar: [
          'بيانات العميل الأساسية.',
          'مصدر التواصل.',
          'نوع الطلب أو الخدمة المطلوبة.',
          'آخر تواصل تم.',
          'ملخص التفاعل.',
          'المرحلة الحالية داخل قمع المتابعة.',
          'موعد المتابعة القادم.',
          'الإجراء المقترح للفريق.',
        ],
      },
      {
        title_en: '6. Automated Follow-up Based on Customer Stage',
        title_ar: '6. متابعة تلقائية حسب مرحلة العميل',
        lead_en: "The AI layer does not follow up with every customer in the same way. It adapts follow-up based on the customer's current stage.",
        lead_ar: 'طبقة الذكاء الاصطناعي لا تتابع كل العملاء بنفس الطريقة، بل تعتمد على مرحلة العميل الحالية.',
        items_en: [
          'A new customer needs a welcome message and data collection.',
          'An interested customer needs a relevant follow-up.',
          'A quotation request needs reminder or sales action.',
          'A booked customer needs appointment confirmation.',
          'An inactive customer needs a different follow-up sequence.',
        ],
        items_ar: [
          'عميل جديد يحتاج رسالة ترحيب وجمع بيانات.',
          'عميل مهتم يحتاج متابعة وعرض مناسب.',
          'عميل طلب عرض سعر يحتاج تذكيرًا أو اتصالًا من السيلز.',
          'عميل حجز موعد يحتاج تأكيدًا قبل الموعد.',
          'عميل لم يرد يحتاج متابعة لاحقة بطريقة مختلفة.',
        ],
        closing_en: 'This makes follow-up more intelligent, not random.',
        closing_ar: 'بهذا الشكل، تصبح المتابعة أكثر ذكاءً، وليست رسائل عشوائية.',
      },
      {
        title_en: '7. Team Performance and Management Reports',
        title_ar: '7. تقييم أداء الفريق وتقارير للإدارة',
        lead_en: 'Because the solution is connected to communication channels and the follow-up system, it helps management see follow-up quality and team performance more clearly.',
        lead_ar: 'لأن الحل مرتبط بقنوات التواصل ونظام المتابعة، يستطيع مساعدة الإدارة على رؤية جودة المتابعة وأداء الفريق بصورة أوضح.',
        items_en: [
          'Number of new customers.',
          'Customer sources.',
          'Status of each opportunity.',
          'Response speed.',
          'Follow-up rates.',
          'Customers delayed in follow-up.',
          'Sales or customer service performance.',
          'Management summaries.',
          'Data-based suggestions to improve follow-up and conversion.',
        ],
        items_ar: [
          'عدد العملاء الجدد.',
          'مصادر العملاء.',
          'حالة كل فرصة.',
          'سرعة الاستجابة.',
          'معدلات المتابعة.',
          'العملاء المتأخرين في المتابعة.',
          'أداء موظفي المبيعات أو خدمة العملاء.',
          'ملخصات دورية للإدارة.',
          'اقتراحات مبنية على البيانات لتحسين المتابعة والتحويل.',
        ],
        closing_en: 'The goal is not negative employee monitoring. The goal is to help management improve performance, identify bottlenecks, and guide the team more accurately.',
        closing_ar: 'الغرض هنا ليس مراقبة الموظف بشكل سلبي، بل مساعدة الإدارة على تحسين الأداء، معرفة الاختناقات، وتوجيه الفريق بشكل أدق.',
      },
    ],

    impactIntro_en: 'This demo shows how companies that rely on direct customer communication can move from scattered follow-up to a more intelligent and visible operating flow.',
    impactIntro_ar: 'هذا الديمو يوضح كيف يمكن للشركات التي تعتمد على التواصل المباشر مع العملاء أن تتحول من متابعة متفرقة إلى نظام أكثر ذكاءً ووضوحًا.',
    impactItems_en: [
      'Less customer loss between calls, WhatsApp, and website chat.',
      'Customer files updated automatically instead of fully manual entry.',
      'Faster follow-up based on customer stage.',
      'Better management visibility into each opportunity.',
      'Less follow-up pressure on sales or customer service teams.',
      'Faster customer response.',
      'Higher conversion potential through more consistent follow-up.',
      'More accurate reports on team performance and communication channels.',
      'Practical management suggestions based on real data.',
      'Adding AI on top of the current system without rebuilding everything from scratch.',
    ],
    impactItems_ar: [
      'تقليل ضياع العملاء بين المكالمات والواتساب وتشات الموقع.',
      'تحديث ملف العميل تلقائيًا بدل الاعتماد الكامل على الإدخال اليدوي.',
      'متابعة أسرع حسب مرحلة العميل الحالية.',
      'وضوح أكبر للإدارة حول حالة كل فرصة.',
      'تقليل ضغط المتابعة على فريق المبيعات أو خدمة العملاء.',
      'تحسين سرعة الرد على العملاء.',
      'رفع فرص التحويل من خلال متابعة أكثر انتظامًا.',
      'تقارير أدق عن أداء الفريق وقنوات التواصل.',
      'اقتراحات عملية للإدارة مبنية على بيانات فعلية.',
      'بناء طبقة ذكاء اصطناعي فوق النظام الحالي دون الحاجة لإعادة بناء كل شيء من الصفر.',
    ],

    whyMatters_en: "This case matters because it shows a practical direction for using AI inside companies, treating it not as a separate tool or a technical showpiece but as an operating layer on top of the existing system. Companies that rely on calls, WhatsApp, websites, and sales teams often have a lot of customer data, but it does not turn into clear follow-up or accurate decisions. This demo shows how daily customer communication can become updated customer files, clear stages, automated follow-up, and reports that help management improve performance. In this case, AI becomes part of the company's growth and follow-up system — not just a bot that answers questions.",
    whyMatters_ar: 'هذه الدراسة مهمة لأنها تعرض اتجاهًا عمليًا لاستخدام الذكاء الاصطناعي داخل الشركات، بحيث لا يكون أداة منفصلة أو استعراضًا تقنيًا، بل طبقة تشغيل فوق النظام الحالي. الشركات التي تعتمد على المكالمات، الواتساب، الموقع، وفريق المبيعات غالبًا تمتلك بيانات كثيرة، لكنها لا تتحول إلى متابعة واضحة أو قرارات دقيقة. هذا الديمو يوضح كيف يمكن تحويل التواصل اليومي مع العملاء إلى ملفات محدثة، مراحل واضحة، متابعة تلقائية، وتقارير تساعد الإدارة على تحسين الأداء. بهذا الشكل، يصبح الذكاء الاصطناعي جزءًا من نظام النمو والمتابعة، وليس مجرد بوت يرد على الأسئلة.',

    relatedSolutions: [
      { title_en: 'Follow-up That Prevents Lost Opportunities', title_ar: 'متابعة تمنع ضياع الفرص', desc_en: 'Organizing customer communication and turning each interaction into a clear stage inside the follow-up flow.', desc_ar: 'تنظيم التواصل مع العملاء وتحويل كل تفاعل إلى مرحلة واضحة داخل مسار المتابعة.', href: '/solutions/follow-up-systems' },
      { title_en: 'Intelligence That Reveals Opportunities Early', title_ar: 'ذكاء يكشف الفرص مبكرًا', desc_en: 'Using an intelligence layer to understand customer status, prioritize follow-up, and suggest the next best action.', desc_ar: 'استخدام طبقة ذكاء تساعد على فهم حالة العميل، ترتيب الأولويات، واقتراح الخطوة التالية.', href: '/solutions/ai-practical-decisions' },
      { title_en: 'Faster Decisions Without Guesswork', title_ar: 'قرار أسرع بدل التخمين', desc_en: 'Providing accurate summaries and reports for management around customers, team performance, and communication channels.', desc_ar: 'توفير تقارير وملخصات دقيقة للإدارة حول العملاء، أداء الفريق، وقنوات التواصل.', href: '/solutions/visibility-insights' },
      { title_en: 'Lower Cost and Less Team Pressure', title_ar: 'تكلفة أقل وضغط أقل', desc_en: 'Reducing manual entry and repetitive follow-up through intelligent automation connected to the current system.', desc_ar: 'تقليل الإدخال اليدوي والمتابعة المتكررة من خلال أتمتة ذكية مرتبطة بالنظام الحالي.', href: '/solutions/automation-layers' },
    ],

    cta: {
      title_en: 'Is your customer communication scattered between calls, WhatsApp, and your website?',
      title_ar: 'هل تواصلك مع العملاء موزع بين المكالمات والواتساب والموقع؟',
      desc_en: 'Tell us how your team currently receives and follows up with customers — and we will help you identify the closest path to building an AI layer on top of your current system.',
      desc_ar: 'شاركنا كيف يستقبل فريقك العملاء ويتابعهم حاليًا — وسنساعدك على تحديد المسار الأقرب لبناء طبقة ذكاء اصطناعي فوق نظامك الحالي.',
      button_en: 'Share Your Business Challenge',
      button_ar: 'شارك تحدي عملك',
    },
  },
  {
    id: '8',
    slug: 'elnemr-group-real-estate-growth-strategy',
    is_published: true,
    sort_order: 7,
    published_at: '2026-07-19T00:00:00.000Z',
    updated_at: '2026-07-19T00:00:00.000Z',

    title_en: 'How we helped ElNemr Group build a digital presence and turn a real estate launch into sales within one week',
    title_ar: 'كيف ساعدنا النمر جروب على بناء حضور رقمي وتحويل مشروع عقاري إلى مبيعات خلال أسبوع؟',
    sector_en: 'Egypt, Real Estate Development|Digital Identity + Growth Strategy|Marketing & Growth',
    sector_ar: 'مصر، التطوير العقاري|هوية رقمية + استراتيجية نمو|التسويق والنمو',
    card_problem_en: 'No clear digital presence',
    card_problem_ar: 'غياب حضور رقمي واضح',
    card_solution_en: 'Digital identity + growth strategy',
    card_solution_ar: 'هوية رقمية + استراتيجية نمو',
    card_impact_en: 'Villas project sold out in 1 week',
    card_impact_ar: 'بيع مشروع الفيلات خلال أسبوع',
    outcome_en: 'We worked with ElNemr Group to build a clearer digital identity, establish a marketing and growth strategy, analyze the market and target customers, and support the business development team; helping the company launch a villas project and sell it out within one week.',
    outcome_ar: 'عملنا مع النمر جروب على بناء هوية رقمية أوضح، تأسيس استراتيجية تسويق ونمو، تحليل السوق والعملاء، ودعم فريق تطوير الأعمال؛ مما ساعد الشركة على طرح مشروع فيلات وتحقيق بيع كامل خلال أسبوع من الإطلاق.',
    image_url: null,
    gallery_images: [],
    demo_url: null,
    badge_en: 'Real Estate Strategy & Growth',
    badge_ar: 'استراتيجية ونمو عقاري',

    snapshot: [
      { label_en: 'Client', label_ar: 'العميل', value_en: 'ElNemr Group', value_ar: 'النمر جروب' },
      { label_en: 'Country', label_ar: 'الدولة', value_en: 'Egypt', value_ar: 'مصر' },
      { label_en: 'Industry', label_ar: 'القطاع', value_en: 'Real Estate Development', value_ar: 'التطوير العقاري' },
      { label_en: 'Solution Type', label_ar: 'نوع الحل', value_en: 'Digital Identity + Marketing & Growth Strategy + Market Research + Business Development Support', value_ar: 'هوية رقمية + استراتيجية تسويق ونمو + أبحاث سوق + دعم تطوير الأعمال' },
      { label_en: 'Result', label_ar: 'النتيجة', value_en: 'Villas project sold out within 1 week of launch', value_ar: 'بيع مشروع فيلات كامل خلال أسبوع من الإطلاق' },
      { label_en: 'Goal', label_ar: 'الهدف', value_en: 'Build a clear digital presence and growth strategy that turns a real estate project into sales.', value_ar: 'بناء حضور رقمي واستراتيجية نمو تحوّل مشروعًا عقاريًا إلى مبيعات.' },
    ],

    situation_en: 'ElNemr Group, a real estate company in Egypt, needed a more professional digital presence and a clearer way to understand the market, target the right customers, shape the message, and turn interest into actual sales. The challenge was not advertising alone. It was about building a complete path: from digital identity, to market and customer analysis, to sales-focused messaging, to business development support, and finally launching the project in a way that helped customers understand, trust, and decide faster.',
    situation_ar: 'النمر جروب شركة عقارية في مصر كانت تحتاج إلى تأسيس حضور رقمي أكثر احترافية، وبناء طريقة واضحة لفهم السوق، استهداف العملاء، صياغة الرسائل، وتحويل الاهتمام إلى مبيعات فعلية. التحدي لم يكن في الإعلان فقط، بل في بناء مسار كامل: من الهوية الرقمية، إلى تحليل السوق والعميل، إلى تجهيز الرسائل، إلى دعم فريق تطوير الأعمال، ثم طرح المشروع بطريقة تساعد العميل على الفهم والثقة واتخاذ القرار.',

    challengeIntro_en: 'Without strategy, real estate marketing becomes visibility without growth.',
    challengeIntro_ar: 'غياب الاستراتيجية يجعل التسويق العقاري مجرد ظهور… وليس نموًا.',
    challengeItems_en: [
      'The company needed a clearer and more professional digital identity.',
      'There was a need to connect marketing, inquiries, and the sales team into one clear path.',
      'The target market and customer motivations needed deeper analysis.',
      'The project needed messaging that built value and trust.',
      'The business development team needed support in handling leads and opportunities.',
    ],
    challengeItems_ar: [
      'احتياج الشركة إلى هوية رقمية أوضح وأكثر احترافية.',
      'غياب مسار منظم يربط بين التسويق، الاستفسارات، وفريق المبيعات.',
      'الحاجة إلى فهم أعمق للسوق والعملاء المستهدفين.',
      'ضرورة صياغة رسائل تبرز قيمة المشروع وتدعم الثقة.',
      'الحاجة إلى دعم فريق تطوير الأعمال في التعامل مع العملاء والفرص.',
    ],

    builtIntro_en: 'We built a complete growth path before the project launch, connecting digital identity, market research, messaging, and business development into one clear strategy.',
    builtIntro_ar: 'بنينا مسار نمو متكامل قبل طرح المشروع، يربط الهوية الرقمية، أبحاث السوق، الرسائل، ودعم تطوير الأعمال في استراتيجية واحدة واضحة.',
    builtSections: [
      {
        title_en: '1. Digital Identity & Growth Strategy',
        title_ar: '1. الهوية الرقمية واستراتيجية النمو',
        lead_en: 'We worked on the strategic and marketing foundation of the company, not just content or campaigns. We started by understanding the market and customers, then shaped the digital presence, prepared sales-supporting messages, and helped the team handle opportunities with more clarity.',
        lead_ar: 'عملنا على تأسيس المسار الاستراتيجي والتسويقي للشركة، وليس مجرد إدارة محتوى أو حملات. بدأنا من فهم السوق والعملاء، ثم صياغة التواجد الرقمي، وتجهيز الرسائل التي تدعم المبيعات، ومساعدة الفريق في التعامل مع الفرص بشكل أكثر وضوحًا.',
        items_en: [
          'Built and developed the company’s digital identity.',
          'Established a marketing and growth strategy for the project.',
          'Conducted market research to understand competition and opportunities.',
          'Analyzed target customers and buying motivations.',
          'Created marketing messages and content that explained the project value.',
          'Supported the business development team in handling potential customers.',
          'Organized the way the project was presented and connected marketing to sales.',
        ],
        items_ar: [
          'بناء وتطوير الهوية الرقمية للشركة.',
          'تأسيس استراتيجية تسويق ونمو للمشروع.',
          'أبحاث سوق لفهم المنافسة والفرص.',
          'تحليل العملاء المستهدفين ودوافع الشراء.',
          'صياغة رسائل تسويقية ومحتوى يوضح قيمة المشروع.',
          'دعم فريق تطوير الأعمال في التعامل مع العملاء المحتملين.',
          'تنظيم طريقة عرض المشروع وربط التسويق بالمبيعات.',
        ],
      },
      {
        title_en: '2. Ensdim’s Approach: Understanding the Buying Decision',
        title_ar: '2. طريقة إنسديم: فهم قرار الشراء',
        lead_en: 'We did not start with ads. We started with the buying decision. In real estate, customers do not buy just because they see an ad. The decision requires clarity, trust, value, and confidence that the project fits their purpose: living, investment, or protecting the value of money.',
        lead_ar: 'لم نبدأ من الإعلان… بدأنا من فهم قرار الشراء. في المشاريع العقارية، العميل لا يشتري بمجرد رؤية إعلان. القرار يحتاج وضوحًا، ثقة، فهمًا للقيمة، وإحساسًا بأن المشروع مناسب للهدف: السكن، الاستثمار، أو الحفاظ على قيمة المال.',
        items_en: [
          'Clarified the offer before increasing ad spend.',
          'Built digital trust before pushing customers to contact.',
          'Connected content to real customer needs.',
          'Supported the sales team with clearer messaging and conversation angles.',
          'Turned the project from "units for sale" into a clear opportunity for the customer.',
        ],
        items_ar: [
          'وضوح العرض قبل زيادة الإنفاق الإعلاني.',
          'بناء ثقة رقمية قبل دفع العميل للتواصل.',
          'ربط المحتوى باحتياجات العميل الحقيقية.',
          'دعم فريق المبيعات برسائل ومداخل حوار أوضح.',
          'تحويل المشروع من "وحدات للبيع" إلى فرصة مفهومة للعميل.',
        ],
        closing_en: 'That is why we focused on understanding the customer journey before building the messaging: what attracts attention, what creates hesitation, what questions need answers, and what helps the sales team convert interest into decisions.',
        closing_ar: 'لذلك ركزنا على فهم رحلة العميل قبل بناء الرسائل: ما الذي يجذب انتباهه؟ ما الذي يجعله يتردد؟ ما الأسئلة التي يحتاج إجابة عليها؟ وما الذي يجعل فريق المبيعات قادرًا على تحويل الاهتمام إلى قرار؟',
      },
    ],

    impactIntro_en: 'After building the strategic and marketing path and supporting the business development team, ElNemr Group achieved a strong result by selling a full villas project within one week of launch.',
    impactIntro_ar: 'بعد بناء المسار الاستراتيجي والتسويقي ودعم فريق تطوير الأعمال، استطاعت النمر جروب تحقيق نتيجة قوية ببيع مشروع فيلات كامل خلال أسبوع من طرحه.',
    impactItems_en: [
      'Established a clearer digital presence for the company.',
      'Improved the quality of project messaging.',
      'Improved targeting of the right customers.',
      'Supported the business development team in handling opportunities.',
      'Accelerated the sales cycle from interest to decision.',
      'Helped sell the full project within one week of launch.',
    ],
    impactItems_ar: [
      'تأسيس حضور رقمي أوضح للشركة.',
      'رفع جودة الرسائل التسويقية للمشروع.',
      'تحسين استهداف العملاء المناسبين.',
      'دعم فريق تطوير الأعمال في التعامل مع الفرص.',
      'تسريع دورة البيع من الاهتمام إلى القرار.',
      'تحقيق بيع كامل للمشروع خلال أسبوع من الإطلاق.',
    ],

    whyMatters_en: 'If your project is strong, it needs a clear path so customers can see it, understand it, and trust it. This case shows that selling in real estate does not depend on advertising alone. You may have a strong project, but without clear positioning, understandable messaging, accurate targeting, and a team that knows how to handle opportunities, marketing can become visibility without results. What made the difference here was building the path before selling: understanding the market, defining the right customer, shaping the offer, organizing the message, and supporting the commercial team so the project became clearer and easier to decide on.',
    whyMatters_ar: 'إذا كان مشروعك جيدًا، فهو يحتاج مسارًا واضحًا حتى يراه العميل ويثق به. هذه الحالة توضّح أن البيع في السوق العقاري لا يعتمد على الإعلان وحده. قد يكون لديك مشروع قوي، لكن بدون تموضع واضح، رسالة مفهومة، استهداف صحيح، وفريق يعرف كيف يتعامل مع الفرص، قد يتحول التسويق إلى ظهور بدون نتيجة. ما صنع الفارق هنا هو بناء المسار قبل البيع: فهم السوق، تحديد العميل المناسب، صياغة العرض، تنظيم الرسائل، ودعم الفريق التجاري حتى يصبح المشروع أوضح وأسهل في اتخاذ القرار.',

    relatedSolutions: [
      { title_en: 'Marketing & Growth Strategy', title_ar: 'استراتيجيات التسويق والنمو', desc_en: 'Building a strategy that connects the market, customer, messaging, and sales.', desc_ar: 'بناء استراتيجية تربط بين السوق، العميل، الرسائل، والمبيعات.', href: '/services/growth-marketing-systems' },
      { title_en: 'UX & Conversion', title_ar: 'تجربة المستخدم والتحويل', desc_en: 'Improving the way value is presented and guiding the customer toward the next step.', desc_ar: 'تحسين طريقة عرض القيمة ودفع العميل للخطوة التالية.', href: '/services/ux-conversion-development' },
      { title_en: 'Data & Dashboards', title_ar: 'البيانات ولوحات المتابعة', desc_en: 'Reading inquiries, opportunities, and performance indicators more clearly.', desc_ar: 'قراءة الاستفسارات والفرص ومؤشرات الأداء بشكل أوضح.', href: '/services/data-dashboards' },
      { title_en: 'Growth Solutions', title_ar: 'حلول النمو', desc_en: 'For companies and projects that want to turn expansion into a structured path.', desc_ar: 'للمشاريع والشركات التي تريد تحويل التوسع إلى مسار منظم.', href: '/solutions/growth' },
    ],

    cta: {
      title_en: 'Do you want to turn your real estate project into a clearer growth path?',
      title_ar: 'هل تريد تحويل مشروعك العقاري إلى مسار نمو أوضح؟',
      desc_en: 'If you have a real estate project or company that needs a digital presence, marketing strategy, better customer understanding, or sales team support, we can help you build a clearer path from visibility to sales.',
      desc_ar: 'إذا كان لديك مشروع عقاري أو شركة تحتاج إلى حضور رقمي، استراتيجية تسويق، فهم أفضل للعملاء، أو دعم لفريق المبيعات، يمكننا مساعدتك على بناء مسار أوضح من الظهور إلى البيع.',
      button_en: 'Share your project challenge',
      button_ar: 'شارك تحدي مشروعك',
    },
  },
  {
    id: '9',
    slug: 'security-review-user-data-protection',
    is_published: true,
    sort_order: 8,
    published_at: '2026-07-19T00:00:00.000Z',
    updated_at: '2026-07-19T00:00:00.000Z',

    title_en: 'Security Review: Protecting Accounts and User Data',
    title_ar: 'مراجعة أمنية لحماية الحسابات وبيانات المستخدمين',
    sector_en: 'Web Application, Account & Data Protection|Security / Systems / Technical Review|Security',
    sector_ar: 'تطبيق ويب، حماية الحسابات والبيانات|مراجعة أمنية / أنظمة / مراجعة تقنية|الأمان',
    card_problem_en: 'Unsafe handling of user input',
    card_problem_ar: 'تعامل غير آمن مع مدخلات المستخدم',
    card_solution_en: 'Full security review & remediation',
    card_solution_ar: 'مراجعة أمنية شاملة ومعالجة',
    card_impact_en: 'Protected accounts, higher trust',
    card_impact_ar: 'حماية للحسابات وثقة أعلى',
    outcome_en: 'This case study shows how a simple field inside a system can become a risk to accounts and user data when it is not handled securely, and how early security review helps protect user trust and operational stability.',
    outcome_ar: 'تعرض هذه الدراسة كيف يمكن لحقل بسيط داخل النظام أن يصبح نقطة خطر على الحسابات والبيانات إذا لم تتم معالجته أمنيًا بشكل صحيح، وكيف تساعد المراجعة الأمنية المبكرة على حماية ثقة المستخدمين واستقرار التشغيل.',
    image_url: '/case-studies/security-review/security-review-xss.jpg',
    gallery_images: [],
    demo_url: null,
    badge_en: 'Security Case Study',
    badge_ar: 'دراسة حالة أمنية',
    report_url: 'https://drive.google.com/file/d/1NQHi8F2QBH3fSu-O1psDvIUztuLJuwe1/view?usp=sharing',

    snapshot: [
      { label_en: 'Case Type', label_ar: 'نوع الحالة', value_en: 'Security Review', value_ar: 'مراجعة أمنية' },
      { label_en: 'Focus Area', label_ar: 'مجال التركيز', value_en: 'Account and user data protection', value_ar: 'حماية الحسابات وبيانات المستخدمين' },
      { label_en: 'Finding Severity', label_ar: 'مستوى الخطورة', value_en: 'High-severity issue', value_ar: 'ثغرة عالية الخطورة' },
      { label_en: 'Deliverable', label_ar: 'المخرجات', value_en: 'Downloadable technical report', value_ar: 'تقرير تقني قابل للتحميل' },
    ],

    situation_en: 'The issue was not only in the interface. It was in how user data was handled. This case analyzes a high-severity security issue related to how user-submitted data is accepted, stored, and rendered inside a system. The business risk is that content entered by a standard user may later be displayed to other users or to an internal admin team in an unsafe way.',
    situation_ar: 'المشكلة لم تكن في واجهة المستخدم فقط… بل في طريقة التعامل مع البيانات. في هذه الحالة، تم تحليل ثغرة أمنية عالية الخطورة مرتبطة بطريقة إدخال وعرض بيانات المستخدم داخل النظام. الخطر هنا أن البيانات التي يكتبها مستخدم عادي قد تُعرض لاحقًا لمستخدمين آخرين أو لفريق الإدارة بطريقة غير آمنة.',

    challengeIntro_en: 'How do we prevent user input from becoming a risk to the system? Any product that allows users to enter free text needs clear controls: what is accepted, how it is stored, how it is rendered, and who can view it. Without those controls, normal fields such as bios, comments, messages, filenames, or support tickets can become security risk points.',
    challengeIntro_ar: 'كيف نمنع مدخلات المستخدم من التحول إلى خطر على النظام؟ أي نظام يسمح للمستخدم بإدخال بيانات يحتاج إلى ضوابط واضحة: ماذا يتم قبوله؟ كيف يتم تخزينه؟ كيف يتم عرضه؟ ومن يستطيع رؤيته؟ غياب هذه الضوابط قد يجعل حقولًا عادية مثل النبذة، التعليقات، الرسائل، أسماء الملفات، أو طلبات الدعم مصدرًا لمخاطر أمنية.',
    challengeItems_en: [
      'Higher risk of account compromise or session misuse.',
      'Possible exposure of customer or admin-side data.',
      'Higher remediation cost if discovered after launch.',
      'Lower user and enterprise customer trust in the system.',
      'Harder scalability if the same pattern exists across multiple fields or modules.',
    ],
    challengeItems_ar: [
      'ارتفاع احتمالية اختراق الحسابات أو استغلال جلسات المستخدم.',
      'تعريض بيانات العملاء أو الإدارة للخطر.',
      'زيادة تكلفة الإصلاح إذا تم اكتشاف المشكلة بعد الإطلاق.',
      'ضعف الثقة في النظام عند المستخدمين أو العملاء الأكبر.',
      'صعوبة التوسع إذا كانت نفس المشكلة متكررة في أكثر من جزء داخل المنتج.',
    ],

    builtIntro_en: 'We review security inside the user journey, not as a separate after-build checklist. At ENSDIM, security review is connected to user experience and operations. We do not only look for where the code fails. We look at how data moves across the product: from input, to storage, to display inside the user interface or the admin console.',
    builtIntro_ar: 'نراجع الأمان من داخل رحلة الاستخدام، لا كفحص منفصل بعد البناء. في إنسديم، نربط المراجعة الأمنية بتجربة الاستخدام والتشغيل. لا نبحث فقط عن مكان الخطأ في الكود، بل نفهم كيف تتحرك البيانات داخل النظام: من لحظة إدخالها، إلى تخزينها، إلى ظهورها في واجهة المستخدم أو لوحة الإدارة.',
    builtSections: [
      {
        title_en: '1. What We Review',
        title_ar: '1. ما نراجعه في هذا النوع من الحالات',
        lead_en: 'We map the full path data takes through the system before deciding where controls are needed.',
        lead_ar: 'نرسم المسار الكامل الذي تسلكه البيانات داخل النظام قبل تحديد أين تلزم الضوابط.',
        items_en: [
          'User input points across the system.',
          'How user-generated content is stored and rendered.',
          'Permissions and who can view the affected data.',
          'Impact on standard users, support teams, and admins.',
          'Security controls required before product growth.',
          'Whether the same pattern appears in other fields or pages.',
        ],
        items_ar: [
          'نقاط إدخال البيانات داخل النظام.',
          'طريقة تخزين وعرض محتوى المستخدم.',
          'الصلاحيات ومن يمكنه رؤية البيانات.',
          'أثر الخطر على المستخدم العادي وفريق الإدارة.',
          'الضوابط المطلوبة لحماية النظام قبل التوسع.',
          'هل المشكلة نمط متكرر في أكثر من حقل أو صفحة؟',
        ],
        closing_en: 'Strong security protects the experience through more than one layer. Handling this type of risk should not depend on a single fix — the stronger approach combines safe frontend rendering, controlled backend data handling, and platform-level safeguards that reduce the impact of future mistakes.',
        closing_ar: 'الحل الأمني الجيد يحمي التجربة من أكثر من طبقة. التعامل مع هذا النوع من المخاطر لا يعتمد على تعديل واحد فقط، بل يجمع بين حماية الواجهة، معالجة البيانات قبل تخزينها، وضوابط تقلل أثر أي خطأ مستقبلي.',
      },
      {
        title_en: '2. Safe Data Rendering',
        title_ar: '2. عرض آمن للبيانات',
        lead_en: 'User input is treated as safe text, not as executable content inside the page.',
        lead_ar: 'يتم التعامل مع مدخلات المستخدم كنص آمن، وليس كمحتوى قابل للتنفيذ داخل الصفحة.',
        items_en: [],
        items_ar: [],
      },
      {
        title_en: '3. Input Handling Before Storage',
        title_ar: '3. معالجة البيانات قبل التخزين',
        lead_en: 'Sensitive or free-text input is cleaned or restricted before storage, so the issue does not travel into admin panels, mobile apps, or other interfaces.',
        lead_ar: 'يتم تنظيف أو تقييد المدخلات الحساسة قبل حفظها، حتى لا تنتقل المشكلة إلى لوحات الإدارة أو التطبيقات أو أي واجهات أخرى.',
        items_en: [],
        items_ar: [],
      },
      {
        title_en: '4. Additional Protection Policies',
        title_ar: '4. سياسات حماية إضافية',
        lead_en: 'Browser and system-level safeguards are added to reduce the impact of similar vulnerabilities in the future.',
        lead_ar: 'إضافة طبقات حماية على مستوى المتصفح والنظام لتقليل أثر أي ثغرة مشابهة في المستقبل.',
        items_en: [],
        items_ar: [],
      },
      {
        title_en: '5. Review of Similar Fields',
        title_ar: '5. مراجعة الحقول المشابهة',
        lead_en: 'The affected field is not treated as an isolated issue. Similar free-text fields are reviewed to prevent the same pattern from recurring.',
        lead_ar: 'لا يتم علاج الحقل المتأثر فقط، بل يتم فحص الحقول الحرة المشابهة داخل النظام لمنع تكرار نفس النمط.',
        items_en: [],
        items_ar: [],
      },
      {
        title_en: '6. Regression Tests',
        title_ar: '6. اختبارات تمنع تكرار المشكلة',
        lead_en: 'The finding is converted into a test or review rule that helps the team prevent the same issue during development.',
        lead_ar: 'يتم تحويل الاكتشاف إلى اختبار أو قاعدة مراجعة تساعد الفريق على منع ظهور نفس المشكلة مرة أخرى أثناء التطوير.',
        items_en: [],
        items_ar: [],
      },
    ],

    impactIntro_en: "Security protects business return because it protects trust and continuity. Security review does not only add technical value. It protects the system's ability to operate and scale. When a system is safer, it becomes easier to rely on across sales, customer service, management, and daily operations.",
    impactIntro_ar: 'الأمان يحمي العائد لأنه يحمي الثقة والتشغيل. المراجعة الأمنية لا تضيف قيمة تقنية فقط، بل تحمي قدرة النظام على الاستمرار والنمو. كلما كان النظام أكثر أمانًا، أصبح أسهل في الاعتماد عليه داخل عمليات البيع، خدمة العملاء، الإدارة، أو التشغيل اليومي.',
    impactItems_en: [
      'Lower risk of account compromise or session abuse.',
      'Better protection for customer and admin-side data.',
      'Higher user trust in the platform or system.',
      'Lower cost of urgent post-launch fixes.',
      'Better readiness for scale or larger client requirements.',
      'A stronger product image around quality and data protection.',
    ],
    impactItems_ar: [
      'تقليل احتمالية اختراق الحسابات أو إساءة استخدام الجلسات.',
      'حماية بيانات العملاء وفريق الإدارة.',
      'رفع ثقة المستخدمين في المنصة أو النظام.',
      'تقليل تكاليف الإصلاحات العاجلة بعد الإطلاق.',
      'تحسين جاهزية النظام للتوسع أو التعامل مع عملاء أكبر.',
      'بناء صورة أكثر احترافية حول جودة المنتج وحماية البيانات.',
    ],

    whyMatters_en: 'From a business perspective, this is not only a technical issue. It is a trust and operations issue. If user sessions, accounts, or admin views can be exposed, the whole system becomes harder to rely on, especially in products that handle customer data, permissions, or internal workflows. For specialists who want the details, the full technical report includes the technical classification, impact details, and remediation recommendations, while keeping sensitive exploit details out of this public page.',
    whyMatters_ar: 'من منظور البزنس، هذه ليست مشكلة تقنية فقط. هي مشكلة ثقة وتشغيل: إذا كانت الحسابات أو جلسات المستخدمين أو لوحات الإدارة معرضة للخطر، فإن النظام كله يصبح أقل قابلية للاعتماد، خصوصًا في المنتجات التي تتعامل مع بيانات عملاء، صلاحيات، أو عمليات داخلية. لمن يريد التفاصيل التقنية: التقرير الكامل يتضمن التصنيف الفني، تفاصيل الأثر، والتوصيات التقنية المقترحة للمعالجة، مع مراعاة عدم عرض التفاصيل الحساسة داخل صفحة الموقع العامة.',

    relatedSolutions: [
      { title_en: 'Internal Systems & Operations', title_ar: 'الأنظمة الداخلية وإدارة التشغيل', desc_en: 'When a system includes users, permissions, and operational data, protection becomes part of operational quality.', desc_ar: 'عندما يحتوي النظام على مستخدمين وصلاحيات وبيانات تشغيلية، تصبح الحماية جزءًا من جودة التشغيل.', href: '/services/internal-systems-operations' },
      { title_en: 'Data & Dashboards', title_ar: 'البيانات ولوحات المتابعة', desc_en: 'Useful data needs more than display. It needs structure, permissions, and protection.', desc_ar: 'البيانات لا تحتاج عرضًا فقط، بل تحتاج تنظيمًا وصلاحيات وحماية.', href: '/services/data-dashboards' },
      { title_en: 'AI Chatbots & Automation', title_ar: 'روبوتات الدردشة والأتمتة', desc_en: 'Any automation layer that handles data or conversations should be designed securely and responsibly.', desc_ar: 'أي أتمتة تتعامل مع بيانات أو محادثات يجب أن تُبنى بطريقة آمنة ومنضبطة.', href: '/services/ai-chatbots-automation' },
    ],

    cta: {
      title_en: 'Does your system contain data or permissions that need review?',
      title_ar: 'هل يحتوي نظامك على بيانات أو صلاحيات تحتاج مراجعة؟',
      desc_en: 'Share what is happening inside your system, and we will help you understand risk points, priorities, and the closest path to protecting operations and customer trust.',
      desc_ar: 'شاركنا ما يحدث داخل نظامك، وسنساعدك على فهم نقاط الخطر، تحديد الأولويات، واختيار المسار الأقرب لحماية التشغيل وثقة العملاء.',
      button_en: 'Start Reviewing Your System',
      button_ar: 'ابدأ بمراجعة نظامك',
    },
  },
];

export function getPublishedCaseStudiesLocal(): CaseStudy[] {
  return caseStudies
    .filter((c) => c.is_published)
    .sort((a, b) => a.sort_order - b.sort_order);
}

export function getCaseStudyBySlugLocal(slug: string): CaseStudy | null {
  return caseStudies.find((c) => c.slug === slug && c.is_published) ?? null;
}
