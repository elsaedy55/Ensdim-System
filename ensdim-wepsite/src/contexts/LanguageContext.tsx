import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  country: string;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, any> = {
  en: {
    header: {
      home: 'Home',
      solutions: 'Solutions',
      services: 'Services',
      products: 'Products',
      resources: 'Resources',
      company: 'Company',
      careers: 'Careers',
      bookConsultation: 'Book Consultation',
      clientLogin: 'Client Login',
    },
    languageSwitch: {
      arabic: 'Arabic',
      english: 'English',
      selectLanguage: 'Select Language',
    },
    hero: {
      tag1: 'Behavior-Led Business Solutions',
      tag2: 'Automation',
      tag3: 'Digital Experiences',
      headline: 'We build intelligent digital solutions that understand customer behavior and solve real business challenges.',
      shortHeadline: 'We build digital solutions around customer behavior.',
      subheadline: 'Ensdim helps businesses improve conversion, customer experience, and operational clarity through intelligent digital solutions built around customer behavior and real business challenges.',
      primaryCTA: 'Book a Business Consultation',
      secondaryCTA: 'Explore Solutions',
      trustLine: 'Strategy first. Technology around people.',
      card1: 'Leads Organized',
      card2: 'Follow-ups Tracked',
      card3: 'Conversion Improved',
    },
    who: {
      label: 'Why Ensdim?',
      title: 'We start by understanding people, then build what the business really needs.',
      description: 'At Ensdim, we do not start with tools or code. We start by understanding how customers think, where they hesitate, how teams actually work, and where opportunities and costs leak inside daily operations. Then we turn that understanding into digital solutions that are clearer, easier to use, and built to support growth.',
      cta: 'Learn how Ensdim works',
      card1Title: 'Higher Conversions',
      card1Desc: 'Reduce friction in the customer journey and help more leads take the next step.',
      card2Title: 'Better Customer Satisfaction',
      card2Desc: 'Build clearer journeys, faster responses, and smoother service experiences.',
      card3Title: 'More Sales Opportunities',
      card3Desc: 'Turn scattered follow-ups and missed requests into trackable growth opportunities.',
      card4Title: 'Easier Management',
      card4Desc: 'Organize workflows, data, payments, documents, and updates in one clearer operating layer.',
    },
    problems: {
      title: 'Where customer journeys break, sales opportunities disappear.',
      subtitle: 'When follow-up is scattered, customer behavior is unclear, and operations depend on manual effort, businesses lose leads, sales, and control.',
      problem1Title: 'Customers and opportunities are lost before they turn into sales',
      problem1Desc: 'Customer inquiries are scattered across WhatsApp, calls, and personal follow-up.',
      problem2Title: 'Visitors are not turning into clear requests',
      problem2Desc: 'Traffic arrives, but it rarely becomes a request your team can act on.',
      problem3Title: 'Slow response reduces trust and loses ready-to-buy customers',
      problem3Desc: 'Slow replies reduce trust and conversion.',
      problem4Title: 'Management cannot see the full picture in time',
      problem4Desc: 'There is no clear view of leads, follow-up status, or performance.',
      problem5Title: 'Manual operations drain the team and increase costs',
      problem5Desc: 'Customer information and tasks are duplicated across people and tools.',
      problem6Title: 'The data exists, but it is not helping you make decisions',
      problem6Desc: 'Numbers are collected, but management still decides on instinct.',
      cta: 'See how Ensdim solves it',
    },
    solutions: {
      title: 'Solutions that make operations clearer, follow-up faster, and growth less costly.',
      subtitle: 'We connect customer journeys, follow-up, data, and automation into practical solutions that help businesses reduce missed opportunities, improve conversion, make faster decisions, and grow without unnecessary increases in team size or operating cost.',
      solution1Title: 'Clearer journey. Higher conversion.',
      solution1Desc: 'We design the customer journey from first contact to purchase decision, reducing hesitation points that cause opportunities to drop.',
      solution1Impact: ['Conversion improvement may reach 15% – 30% depending on the case.', 'Fewer customers lost before purchase.', 'More trust and clearer next steps.'],
      solution1Includes: ['Customer journey design', 'Friction analysis', 'Conversion flow optimization', 'Touchpoint structuring'],
      solution1CTA: 'Explore this solution',
      solution2Title: 'Visits turned into trackable requests',
      solution2Desc: 'We turn websites and landing pages into clear experiences that guide customers to book, request, or contact instead of leaving.',
      solution2Impact: ['Campaign and traffic efficiency may improve by 20% – 35% depending on traffic quality.', 'Lower drop-off before action.', 'Clearer requests that are easier to follow up.'],
      solution2Includes: ['Conversion pages', 'Request forms', 'Booking flows', 'Client portals', 'UX improvements'],
      solution2CTA: 'Explore this solution',
      solution3Title: 'Follow-up that prevents lost opportunities',
      solution3Desc: 'We organize customer data and opportunity status into a clear follow-up flow instead of relying only on memory and WhatsApp.',
      solution3Impact: ['Lost opportunities may be reduced by 30% – 50% when follow-up is structured.', 'Faster replies and more consistent follow-up.', 'Better visibility between sales and management.'],
      solution3Includes: ['Lightweight CRM', 'Customer data organization', 'Reminders', 'Follow-up flows', 'Follow-up automation'],
      solution3CTA: 'Explore this solution',
      solution4Title: 'Faster decisions without guesswork',
      solution4Desc: 'We bring customer, sales, and follow-up data into a clear view so management can see what is happening and what needs action.',
      solution4Impact: ['Time spent searching for information and reports may be reduced by 40% – 70%.', 'Faster data-backed decisions.', 'Earlier visibility into waste and opportunities.'],
      solution4Includes: ['Dashboards', 'Sales reports', 'KPIs', 'Alerts', 'Conversion and growth tracking'],
      solution4CTA: 'Explore this solution',
      solution5Title: 'Lower cost and less team pressure',
      solution5Desc: 'We turn repetitive tasks and manual follow-up into organized, faster steps so the team can do more without unnecessary hiring.',
      solution5Impact: ['Repetitive task time may be reduced by 40% – 70% depending on the process.', 'Lower manual dependency.', 'More growth without team and cost overload.'],
      solution5Includes: ['Task automation', 'Operating workflows', 'Automated messages and alerts', 'Tool integrations', 'Less manual entry'],
      solution5CTA: 'Explore this solution',
      solution6Title: 'Intelligence that reveals opportunities early',
      solution6Desc: 'We add intelligence layers that help you understand customers, prioritize faster, and find improvement opportunities inside operations.',
      solution6Impact: ['Priority and opportunity detection speed may improve by 30% – 60% when enough data is available.', 'Better decisions based on behavior and data.', 'More efficient growth with less chaos.'],
      solution6Includes: ['Customer behavior analysis', 'Conversation summaries', 'Customer classification', 'Performance recommendations', 'AI-assisted insights'],
      solution6CTA: 'Explore this solution',
      includes: 'INCLUDES',
      impactLabel: 'BUSINESS IMPACT',
    },
    sectors: {
      title: 'Built for service-driven and operation-heavy businesses',
      subtitle: 'Our solutions fit businesses where customer experience, continuous follow-up, and daily operations matter — where every booking, request, inquiry, or delay can affect revenue and customer satisfaction.',
      sector1Title: 'Clinics & Medical Centers',
      sector1Desc: 'Bookings, patient follow-up, reminders, requests, and clearer daily operations.',
      sector2Title: 'Real Estate & Client Management',
      sector2Desc: 'Lead follow-up, inquiry organization, property tracking, and a smoother sales journey.',
      sector3Title: 'Service Businesses',
      sector3Desc: 'Requests, scheduling, execution teams, customer follow-up, and a more organized service experience.',
      sector4Title: 'Education & Training',
      sector4Desc: 'Registrations, student follow-up, organized communication, and management dashboards.',
      sector5Title: 'Construction & Field Operations',
      sector5Desc: 'Quotations, project follow-up, task distribution, and team coordination.',
      sector6Title: 'Restaurants & Hospitality',
      sector6Desc: 'Orders, reservations, inventory, customer service, and less chaotic daily operations.',
      question: 'Does your business work differently?',
      cta: "Let's understand your operations and suggest the right solution",
    },
    clientPortal: {
      sectionLabel: 'Client Workspace',
      title: 'A clear client workspace for every project stage.',
      description: 'Track project progress, contracts, payments, comments, and updates from one organized space — so you always know where we are and what comes next.',
      feature1Title: 'Project Progress',
      feature1Desc: 'Track completion percentage, current stage, and what has already been delivered.',
      feature2Title: 'Proposals & Contracts',
      feature2Desc: 'Access your proposal, contract, and approved documents in one place.',
      feature3Title: 'Payments & Costs',
      feature3Desc: 'View payment status, project cost, and saved invoices clearly.',
      feature4Title: 'Comments & Change Requests',
      feature4Desc: 'Leave comments and change requests in a clear thread tied to the right project stage and task.',
      feature5Title: 'Multi-Project View',
      feature5Desc: 'Manage one project or multiple projects from the same account.',
      primaryCTA: 'Client Login',
      secondaryCTA: 'Create Client Account',
      note: 'Available for active clients and approved projects.',
    },
    technology: {
      title: 'Our Building Partners',
      description: 'We work with global technology tools and platforms that help us build stronger, more stable, and more scalable projects — from cloud infrastructure and AI to automation, development, and deployment.',
      footerLine: 'We choose the technology that best fits your project, keeps it secure, and helps it scale.',
    },
    testimonials: {
      title: 'What clients say about working with us',
      subtitle: 'We do not measure project success only by delivery, but by clarity, communication quality, and the client’s confidence in the final outcome.',
    },
    maturity: {
      title: 'Where is your business now?',
      subtitle: 'We shape the right solution around your current stage, whether you are building your foundation, starting digital transformation, or preparing to scale smarter.',
      stage1: 'Build',
      stage1Title: 'Digital Foundation',
      stage1Desc: 'For new businesses and early ideas that need a clear digital foundation before launch.',
      stage1BestFor: ['New businesses', 'MVPs', 'First website or app', 'Clear customer experience foundation'],
      stage1CTA: 'Build Your Digital Foundation',
      stage2: 'Start',
      stage2Title: 'Digital Transformation',
      stage2Desc: 'For existing businesses that already have customers and requests, but still rely on WhatsApp, Excel, notebooks, and manual follow-up in daily operations.',
      stage2BestFor: ['Businesses with existing customers', 'WhatsApp and Excel dependency', 'Unclear follow-up', 'Manual team work', 'Lack of operational visibility'],
      stage2CTA: 'Start Your Digital Shift',
      stage3: 'Growth',
      stage3Title: 'Smart Growth & Scaling',
      stage3Desc: 'For companies ready to scale through task automation, AI layers, lower operating costs, and smarter ways to reach and serve more customers.',
      stage3BestFor: ['Companies ready to scale', 'Repeated tasks that can be automated', 'Teams that need less manual effort', 'Profit growth goals', 'Data and AI-driven growth'],
      stage3CTA: 'Scale Smarter',
      bestFor: 'Best for',
      ctaBadge: 'Free consultation',
      ctaTitle: 'Let’s define the right stage for your business and suggest the closest solution for your needs.',
      ctaDesc: 'Book a 30-minute consultation to discuss your challenges and find out which path fits your company’s current situation.',
      ctaButton: 'Discover your business path',
    },
    methodology: {
      title: 'We listen before we build.',
      subtitle: 'At Ensdim, we start by listening to what happens inside your business, from where follow-up breaks and how customers behave to what consumes your team’s time, then turn it into a clear map, thoughtful design, and a digital solution that supports growth.',
      step1Title: 'Listen & Understand',
      step1Desc: 'We listen to the problem and understand how requests, follow-up, teams, and customers work inside daily operations.',
      step2Title: 'Research & Plan',
      step2Desc: 'We review the customer journey and team workflow, then identify breakdown points, opportunities, and the right path for the solution.',
      step3Title: 'Design Solutions',
      step3Desc: 'We design the right solution for the problem, whether a digital experience, follow-up, management visibility, or practical intelligence layer.',
      step4Title: 'Build & Connect',
      step4Desc: 'We build the digital solution and connect it with the tools and channels your team already uses.',
      step5Title: 'Automate Tasks',
      step5Desc: 'We turn repeated tasks, reminders, and follow-ups into faster and more consistent steps, with an AI layer added where it creates real value.',
      step6Title: 'Improve',
      step6Desc: 'We measure performance after launch, then improve the experience and follow-up based on data.',
    },
    research: {
      sectionTitle: 'Research',
      sectionSubtitle: 'We analyze customer behavior and friction points across the buying journey and operations to understand where decisions slow down, why opportunities are lost, and how data and observation can turn into more precise solutions.',
      badge: 'Research',
      readTime: 'min read',
      title: 'Why businesses lose leads even when demand exists',
      description: 'A practical breakdown of how weak follow-up and scattered workflows reduce conversion.',
      cta: 'Read Research',
      ctaAll: 'View all research',
    },
    caseStudy: {
      sectionTitle: 'Case Study',
      sectionSubtitle: 'Practical examples of how we start from a real operational challenge, then reorganize follow-up, data, and customer experience to achieve clear results and profitable impact.',
      badge: 'Case Study',
      title: 'From scattered follow-up to a clearer operating system',
      description: 'How a business moved from manual tracking to a structured CRM and dashboard workflow.',
      problemLabel: 'Problem',
      problemText: 'Manual follow-up',
      solutionLabel: 'Solution',
      solutionText: 'CRM + Dashboard',
      impactLabel: 'Impact',
      impactText: 'Clearer visibility',
      cta: 'View Case Study',
      ctaAll: 'View all case studies',
    },
    careers: {
      sectionLabel: 'Careers',
      sectionSubtitle: 'Join Ensdim and help build smarter business systems.',
      title: 'Build intelligent business systems with us.',
      subtitle: 'We are building a flexible team across product, engineering, design, data, and growth.',
      availableRoles: 'Available roles:',
      cta: 'View Open Roles',
      question: 'Do not see your role?',
      ctaLink: 'Send us your profile',
    },
    finalCTA: {
      badge: 'Your next step is clearer now',
      title: 'If the problem is clear, let’s define the right solution for it.',
      subtitle: 'Follow-up may be unorganized, operations may be consuming your team’s time, or decisions may be delayed because visibility is missing. In a short call, we understand your business situation, review the challenge, and suggest the closest path before any commitment or execution.',
      primaryCTA: 'Book a Consultation',
      secondaryCTA: 'Share Your Business Challenge',
    },
    footer: {
      tagline: 'We listen to data. Understand business. Build solutions.',
      company: 'Company',
      solutions: 'Solutions',
      services: 'Services',
      resources: 'Resources',
      careers: 'Careers',
      copyright: '© 2026 Ensdim. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      aboutUs: 'About Us',
      team: 'Team',
      contact: 'Contact',
      solutionJourneys: 'Behavioral Customer Journeys',
      solutionDigital: 'Digital Experiences',
      solutionFollowUp: 'Intelligent Follow-Up',
      solutionVisibility: 'Operations Visibility',
      serviceWeb: 'Web Design & Digital Experience',
      serviceCRM: 'CRM & Internal Systems',
      serviceAI: 'AI Chatbots & Automation',
      serviceData: 'Data & Dashboards',
      researchLink: 'Research',
      caseStudies: 'Case Studies',
      openRoles: 'Open Roles',
    },
  },
  ar: {
    header: {
      home: 'الرئيسية',
      solutions: 'الحلول',
      services: 'الخدمات',
      products: 'المنتجات',
      resources: 'الموارد',
      company: 'الشركة',
      careers: 'الوظائف',
      bookConsultation: 'احجز استشارة',
      clientLogin: 'دخول العملاء',
    },
    languageSwitch: {
      arabic: 'العربية',
      english: 'English',
      selectLanguage: 'اختر اللغة',
    },
    hero: {
      tag1: 'حلول أعمال مبنية على فهم السلوك',
      tag2: 'أتمتة',
      tag3: 'تجارب رقمية',
      headline: 'نبني حلولًا رقمية ذكية تفهم سلوك العميل وتعالج مشاكل البزنس الحقيقية.',
      shortHeadline: 'نبني حلولًا رقمية حول سلوك العميل.',
      subheadline: 'تساعد إنسديم الأعمال على تحسين التحويل، تطوير تجربة العميل، وزيادة وضوح التشغيل من خلال حلول رقمية ذكية مبنية على فهم السلوك ومشاكل البزنس الحقيقية.',
      primaryCTA: 'احجز استشارة لنشاطك',
      secondaryCTA: 'استكشف الحلول',
      trustLine: 'الاستراتيجية أولًا. والتقنية حول الإنسان.',
      card1: 'عملاء منظّمون',
      card2: 'متابعات واضحة',
      card3: 'تحسّن التحويل',
    },
    who: {
      label: 'لماذا إنسديم؟',
      title: 'نبدأ من فهم الإنسان، ثم نبني الحل المناسب للبزنس.',
      description: 'في إنسديم، لا نبدأ بالأدوات أو الكود. نبدأ بفهم كيف يفكر العميل، أين يتردد، كيف يعمل الفريق، وأين تتسرب الفرص والتكلفة داخل التشغيل اليومي. ثم نحول هذا الفهم إلى حلول رقمية أوضح وأسهل في الاستخدام وأكثر قدرة على دعم النمو.',
      card1Title: 'تحويل أعلى',
      card1Desc: 'نقلل الاحتكاك في رحلة العميل ونساعده على اتخاذ الخطوة التالية.',
      card2Title: 'تجربة عميل أفضل',
      card2Desc: 'رحلة أوضح، استجابة أسرع، وخدمة أكثر سلاسة.',
      card3Title: 'فرص مبيعات أكثر',
      card3Desc: 'نحوّل المتابعات المتفرقة والطلبات الضائعة إلى فرص نمو قابلة للقياس.',
      card4Title: 'إدارة أسهل',
      card4Desc: 'مسارات العمل، البيانات، المدفوعات، والتحديثات — كلها في طبقة تشغيل واحدة.',
      cta: 'تعرّف على طريقة إنسديم',
    },
    problems: {
      title: 'عندما تتعطل المتابعة، يصبح النمو أصعب.',
      subtitle: 'عندما تتفرق الطلبات بين الواتساب والفريق والبيانات، تخسر الأعمال مبيعات ووقتاً وتحكماً.',
      problem1Title: 'العملاء والفرص تضيع قبل ما تتحول لمبيعات',
      problem1Desc: 'الاستفسارات موزعة بين الواتساب والمكالمات والمتابعة الشخصية دون نظام.',
      problem2Title: 'الزوار لا يتحولون إلى طلبات واضحة',
      problem2Desc: 'الزيارات تصل، لكنها نادرًا ما تتحول إلى طلب يستطيع فريقك التصرف بناءً عليه.',
      problem3Title: 'الرد المتأخر يقلل الثقة ويخسر عملاء جاهزين',
      problem3Desc: 'بطء الاستجابة يضعف الثقة ويقلل فرص التحويل.',
      problem4Title: 'الإدارة لا ترى الصورة كاملة في الوقت المناسب',
      problem4Desc: 'لا توجد صورة واضحة لحالة العملاء أو المتابعة أو الأداء.',
      problem5Title: 'التشغيل اليدوي يستهلك الفريق ويرفع التكلفة',
      problem5Desc: 'البيانات والمهام تتضاعف بين أفراد الفريق والأدوات المختلفة.',
      problem6Title: 'البيانات موجودة، لكنها لا تساعدك على القرار',
      problem6Desc: 'الأرقام موجودة، لكن الإدارة ما زالت تقرر بالحدس لا بالدليل.',
      cta: 'اكتشف كيف تحلها إنسديم',
    },
    solutions: {
      title: 'حلول تجعل التشغيل أوضح، والمتابعة أسرع، والنمو أقل تكلفة.',
      subtitle: 'نربط رحلة العميل، المتابعة، البيانات، والأتمتة في حلول عملية تساعد شركتك على تقليل ضياع الفرص، تحسين التحويل، تسريع القرار، والنمو دون زيادة عشوائية في الفريق والتكلفة.',
      solution1Title: 'رحلة أوضح، تحويل أعلى',
      solution1Desc: 'نصمم رحلة العميل من أول تواصل حتى قرار الشراء، ونقلل نقاط التردد التي تُضيع الفرص.',
      solution1Impact: ['تحسين التحويل بنسبة قد تصل إلى 15% – 30% بحسب الحالة.', 'تقليل فقدان العملاء قبل الشراء.', 'زيادة وضوح الخطوة التالية للعميل.'],
      solution1Includes: ['تصميم رحلة العميل', 'تحليل نقاط التعطّل', 'تحسين مسارات التحويل', 'تنظيم نقاط التواصل'],
      solution1CTA: 'اعرف الحل',
      solution2Title: 'زيارات تتحول إلى طلبات',
      solution2Desc: 'نحوّل الموقع أو صفحة الهبوط إلى تجربة واضحة تقود العميل للحجز أو الطلب أو التواصل.',
      solution2Impact: ['تحسين الاستفادة من الحملات بنسبة قد تصل إلى 20% – 35% بحسب جودة الترافيك.', 'تقليل الخروج قبل اتخاذ إجراء.', 'طلبات أوضح وأسهل في المتابعة.'],
      solution2Includes: ['صفحات تحويل', 'نماذج طلب', 'تدفقات حجز', 'بوابات عملاء', 'تحسين تجربة الاستخدام'],
      solution2CTA: 'اعرف الحل',
      solution3Title: 'متابعة تمنع ضياع الفرص',
      solution3Desc: 'ننظم بيانات العملاء وحالة كل فرصة في مسار متابعة واضح بدل الاعتماد على الذاكرة والواتساب.',
      solution3Impact: ['تقليل ضياع الفرص بنسبة قد تصل إلى 30% – 50% عند تنظيم المتابعة.', 'رد أسرع ومتابعة أكثر انتظامًا.', 'وضوح أكبر بين المبيعات والإدارة.'],
      solution3Includes: ['CRM مبسط', 'تنظيم بيانات العملاء', 'تذكيرات', 'مسارات متابعة', 'أتمتة مهام المتابعة'],
      solution3CTA: 'اعرف الحل',
      solution4Title: 'قرار أسرع بدل التخمين',
      solution4Desc: 'نجمع بيانات العملاء والمبيعات والمتابعة في رؤية واضحة لما يحدث وما يحتاج تدخلًا.',
      solution4Impact: ['تقليل وقت البحث عن المعلومة بنسبة قد تصل إلى 40% – 70%.', 'قرارات أسرع مبنية على بيانات.', 'كشف مبكر للهدر والفرص.'],
      solution4Includes: ['لوحات تحكم', 'تقارير مبيعات', 'مؤشرات أداء', 'تنبيهات', 'تتبع التحويل والنمو'],
      solution4CTA: 'اعرف الحل',
      solution5Title: 'تكلفة أقل وضغط أقل',
      solution5Desc: 'نحوّل المهام المتكررة والمتابعات اليدوية إلى خطوات منظمة تساعد الفريق ينجز أسرع.',
      solution5Impact: ['تقليل وقت المهام المتكررة بنسبة قد تصل إلى 40% – 70% بحسب نوع العمليات.', 'خفض الاعتماد على العمل اليدوي.', 'نمو أكبر بدون تضخم في الفريق والتكلفة.'],
      solution5Includes: ['أتمتة المهام', 'تدفقات تشغيل', 'رسائل وتنبيهات تلقائية', 'ربط الأدوات', 'تقليل الإدخال اليدوي'],
      solution5CTA: 'اعرف الحل',
      solution6Title: 'ذكاء يكشف الفرص مبكرًا',
      solution6Desc: 'نضيف طبقات ذكاء تساعدك تفهم العملاء، ترتب الأولويات، وتكتشف فرص التحسين.',
      solution6Impact: ['تحسين سرعة فهم الأولويات بنسبة قد تصل إلى 30% – 60% عند توفر بيانات كافية.', 'قرارات أدق مبنية على السلوك والبيانات.', 'نمو أكثر كفاءة بدون فوضى إضافية.'],
      solution6Includes: ['تحليل سلوك العملاء', 'تلخيص المحادثات', 'تصنيف العملاء', 'توصيات أداء', 'رؤى مدعومة بالذكاء الاصطناعي'],
      solution6CTA: 'اعرف الحل',
      includes: 'يشمل',
      impactLabel: 'العائد على البزنس',
    },
    sectors: {
      title: 'للأعمال التي تعتمد على الخدمة، المتابعة، والتشغيل اليومي',
      subtitle: 'حلولنا تناسب الشركات التي تعتمد على تجربة العميل، المتابعة المستمرة، وتنظيم العمليات اليومية — حيث كل حجز، طلب، استفسار، أو تأخير قد يؤثر على الإيرادات ورضا العملاء.',
      sector1Title: 'العيادات والمراكز الطبية',
      sector1Desc: 'حجوزات، متابعة مرضى، تذكيرات، طلبات، ورؤية أوضح للتشغيل اليومي.',
      sector2Title: 'العقارات وإدارة العملاء',
      sector2Desc: 'متابعة العملاء المحتملين، تنظيم الاستفسارات، إدارة الوحدات، وتحسين مسار البيع.',
      sector3Title: 'شركات الخدمات',
      sector3Desc: 'طلبات، مواعيد، فرق تنفيذ، متابعة عملاء، وتجربة خدمة أكثر تنظيمًا.',
      sector4Title: 'التعليم والتدريب',
      sector4Desc: 'تسجيلات، متابعة طلاب، تواصل منظم، ولوحات متابعة للإدارة.',
      sector5Title: 'المقاولات والتشغيل الميداني',
      sector5Desc: 'عروض أسعار، متابعة مشاريع، توزيع مهام، وتنسيق فرق العمل.',
      sector6Title: 'المطاعم والضيافة',
      sector6Desc: 'طلبات، حجوزات، مخزون، خدمة عملاء، وتشغيل يومي أقل فوضى.',
      question: 'هل تعمل بطريقة مختلفة؟',
      cta: 'دعنا نفهم عملياتك ونقترح الحل الأنسب',
    },
    clientPortal: {
      sectionLabel: 'مساحة العميل',
      title: 'مساحة عميل واضحة لكل مرحلة من مشروعك.',
      description: 'نمنحك رؤية منظمة لتقدم المشروع، العقود، المدفوعات، الملاحظات، والتحديثات — حتى تعرف دائمًا أين وصلنا وما الخطوة التالية.',
      feature1Title: 'تقدم المشروع',
      feature1Desc: 'تابع نسبة الإنجاز، المرحلة الحالية، وما تم تنفيذه حتى الآن.',
      feature2Title: 'العروض والعقود',
      feature2Desc: 'راجع العرض، العقد، والمستندات المعتمدة في مكان واحد.',
      feature3Title: 'المدفوعات والتكاليف',
      feature3Desc: 'اعرف حالة المدفوعات، التكلفة، والفواتير المحفوظة بوضوح.',
      feature4Title: 'الملاحظات وطلبات التعديل',
      feature4Desc: 'اترك ملاحظاتك وطلبات التغيير في مسار واضح مرتبط بمرحلة المشروع والمهمة المطلوبة.',
      feature5Title: 'إدارة أكثر من مشروع',
      feature5Desc: 'تابع مشروعًا واحدًا أو عدة مشاريع من نفس الحساب.',
      primaryCTA: 'دخول العميل',
      secondaryCTA: 'إنشاء حساب عميل',
      note: 'متاحة للعملاء النشطين والمشاريع المعتمدة.',
    },
    technology: {
      title: 'شركاؤنا في البناء',
      description: 'نتعاون مع أدوات ومنصات تقنية عالمية تساعدنا على بناء مشاريع أقوى، أكثر استقرارًا، وأسهل في التوسع — من البنية السحابية والذكاء الاصطناعي إلى الأتمتة والتطوير والنشر.',
      footerLine: 'نختار لمشروعك التقنية الأنسب، الأكثر أمانًا، والأقدر على النمو.',
    },
    testimonials: {
      title: 'ما يقوله عملاؤنا عن تجربة العمل معنا',
      subtitle: 'نحن لا نقيس نجاح المشروع فقط بتسليمه، بل بوضوح الرحلة، جودة التواصل، وسهولة الوصول إلى نتيجة يثق بها العميل.',
    },
    maturity: {
      title: 'أين يقف عملك الآن؟',
      subtitle: 'نحدد الحل المناسب حسب مرحلة عملك، سواء كنت تبدأ في البناء، تبدأ في التحول الرقمي، أو تستعد للنمو والتوسع بذكاء.',
      stage1: 'بناء',
      stage1Title: 'الأساس الرقمي',
      stage1Desc: 'للشركات الجديدة والأفكار الناشئة التي تحتاج إلى تأسيس رقمي واضح قبل الانطلاق.',
      stage1BestFor: ['الشركات الجديدة', 'المنتجات الأولية', 'أول موقع أو تطبيق', 'تأسيس تجربة عميل واضحة'],
      stage1CTA: 'ابدأ البناء',
      stage2: 'انطلاق',
      stage2Title: 'التحول الرقمي',
      stage2Desc: 'للشركات القائمة التي لديها عملاء وطلبات بالفعل، لكنها ما زالت تعتمد على الواتساب، الإكسيل، الدفاتر، والمتابعة اليدوية في التشغيل اليومي.',
      stage2BestFor: ['شركات لديها عملاء بالفعل', 'اعتماد على واتساب وإكسيل', 'متابعة غير واضحة', 'فريق يعمل يدويًا', 'غياب رؤية تشغيلية واضحة'],
      stage2CTA: 'ابدأ تحولك الرقمي',
      stage3: 'نمو',
      stage3Title: 'النمو الذكي والتوسع',
      stage3Desc: 'للشركات الجاهزة للتوسع، وتحتاج إلى أتمتة المهام، إضافة طبقات ذكاء اصطناعي، تقليل تكلفة التشغيل، والوصول إلى عملاء أكثر بكفاءة أعلى.',
      stage3BestFor: ['شركات جاهزة للتوسع', 'عمليات متكررة يمكن أتمتتها', 'فرق تحتاج تقليل الجهد اليدوي', 'رغبة في زيادة الأرباح', 'استخدام البيانات والذكاء الاصطناعي للنمو'],
      stage3CTA: 'توسّع بذكاء',
      bestFor: 'مناسب لـ',
      ctaBadge: 'استشارة مجانية',
      ctaTitle: 'دعنا نحدد المرحلة المناسبة لعملك ونقترح الحل الأقرب لاحتياجك.',
      ctaDesc: 'احجز استشارة لمدة 30 دقيقة لمناقشة تحدياتك، ومعرفة أي مسار يناسب وضع شركتك الحالي.',
      ctaButton: 'اكتشف مسار عملك',
    },
    methodology: {
      title: 'ننصت قبل أن نبني.',
      subtitle: 'في إنسديم، نبدأ بالإنصات لما يحدث داخل عملك، من أين تتعطل المتابعة وكيف يتصرف العملاء إلى ما يستهلك وقت الفريق، ثم نحوله إلى خريطة واضحة، تصميم مناسب، وحل رقمي يخدم النمو.',
      step1Title: 'الإنصات والفهم',
      step1Desc: 'نستمع للمشكلة ونفهم كيف تتحرك الطلبات، المتابعة، الفريق، والعملاء داخل التشغيل اليومي.',
      step2Title: 'البحث والتخطيط',
      step2Desc: 'نراجع رحلة العميل وطريقة عمل الفريق، ونحدد نقاط التعطل والفرص والمسار الأنسب للحل.',
      step3Title: 'تصميم الحلول',
      step3Desc: 'نصمم الحل المناسب للمشكلة، سواء كانت تجربة رقمية، متابعة، رؤية إدارية، أو طبقة ذكاء عملية.',
      step4Title: 'البناء والربط',
      step4Desc: 'نبني الحل الرقمي ونربطه بالأدوات والقنوات التي يستخدمها فريقك.',
      step5Title: 'أتمتة المهام',
      step5Desc: 'نحوّل المهام المتكررة، التذكيرات، والمتابعات إلى خطوات أسرع وأكثر انتظامًا، مع إضافة طبقة ذكاء اصطناعي عند الحاجة.',
      step6Title: 'التحسين',
      step6Desc: 'نقيس الأداء بعد الإطلاق، ثم نحسن التجربة والمتابعة بناءً على البيانات.',
    },
    research: {
      sectionTitle: 'الأبحاث',
      sectionSubtitle: 'نحلّل سلوك العميل ونقاط التعطل داخل رحلة الشراء والتشغيل، لنفهم أين تتباطأ القرارات، ولماذا تضيع الفرص، وكيف يمكن تحويل البيانات والملاحظة إلى حلول أكثر دقة.',
      badge: 'بحث',
      readTime: 'دقيقة قراءة',
      title: 'لماذا تخسر بعض الأعمال عملاء محتملين رغم وجود الطلب',
      description: 'تحليل عملي لكيفية تأثير المتابعة الضعيفة وتشتت سير العمل على معدلات التحويل.',
      cta: 'اقرأ البحث',
      ctaAll: 'عرض جميع الأبحاث',
    },
    caseStudy: {
      sectionTitle: 'دراسة حالة',
      sectionSubtitle: 'نماذج عملية توضّح كيف نبدأ من مشكلة تشغيل حقيقية، ثم نعيد تنظيم المتابعة والبيانات وتجربة العميل للوصول إلى نتائج واضحة وعائد مربح.',
      badge: 'دراسة حالة',
      title: 'من متابعة مشتتة إلى نظام تشغيل واضح',
      description: 'كيف انتقلت إحدى الشركات من المتابعة اليدوية إلى نظام CRM ولوحة تحكم منظمة.',
      problemLabel: 'المشكلة',
      problemText: 'متابعة يدوية',
      solutionLabel: 'الحل',
      solutionText: 'CRM + لوحة تحكم',
      impactLabel: 'الأثر',
      impactText: 'رؤية أوضح',
      cta: 'عرض دراسة الحالة',
      ctaAll: 'عرض جميع دراسات الحالة',
    },
    careers: {
      sectionLabel: 'الوظائف',
      sectionSubtitle: 'انضم إلى إنسديم وساهم في بناء أنظمة أعمال أكثر ذكاءً.',
      title: 'ابنِ معنا أنظمة وتجارب ذكية للأعمال.',
      subtitle: 'نبني فريقاً مرناً في مجالات المنتج، الهندسة، التصميم، البيانات، والنمو.',
      availableRoles: 'الأدوار المتاحة',
      cta: 'عرض الوظائف المتاحة',
      question: 'لم تجد دورك؟',
      ctaLink: 'أرسل لنا ملفك الشخصي',
    },
    finalCTA: {
      badge: 'الخطوة التالية أوضح الآن',
      title: 'لو المشكلة واضحة، خلّينا نحدد الحل المناسب لها.',
      subtitle: 'قد تكون المتابعة غير منظمة، أو التشغيل يستهلك وقت الفريق، أو القرار يتأخر بسبب نقص الرؤية. في مكالمة قصيرة، نفهم وضع عملك، نراجع التحدي، ونقترح المسار الأقرب قبل أي التزام أو تنفيذ.',
      primaryCTA: 'احجز استشارة',
      secondaryCTA: 'شارك تحدي عملك',
    },
    footer: {
      tagline: 'نستمع للبيانات. نفهم الأعمال. نبني الحلول.',
      company: 'الشركة',
      solutions: 'الحلول',
      services: 'الخدمات',
      resources: 'الموارد',
      careers: 'الوظائف',
      copyright: '© 2026 Ensdim. جميع الحقوق محفوظة.',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الخدمة',
      aboutUs: 'من نحن',
      team: 'الفريق',
      contact: 'تواصل معنا',
      solutionJourneys: 'رحلات العملاء السلوكية',
      solutionDigital: 'التجارب الرقمية',
      solutionFollowUp: 'أنظمة المتابعة الذكية',
      solutionVisibility: 'رؤية العمليات',
      serviceWeb: 'تصميم الويب والتجربة الرقمية',
      serviceCRM: 'CRM والأنظمة الداخلية',
      serviceAI: 'روبوتات الدردشة والأتمتة',
      serviceData: 'البيانات ولوحات التحكم',
      researchLink: 'الأبحاث',
      caseStudies: 'دراسات الحالة',
      openRoles: 'الوظائف المتاحة',
    },
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function isEnglishPath(pathname: string): boolean {
  return pathname === '/en' || pathname.startsWith('/en/');
}

function detectInitialLanguage(): Language {
  return isEnglishPath(window.location.pathname) ? 'en' : 'ar';
}

const FALLBACK_COUNTRY: Record<Language, string> = { ar: 'EG', en: 'US' };

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language] = useState<Language>(detectInitialLanguage);
  const [country, setCountry] = useState<string>(
    () => localStorage.getItem('ensdim_country') || FALLBACK_COUNTRY[language]
  );

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  // Auto-detect the visitor's country from their IP so the flag shown next
  // to the language toggle matches where they are browsing from — this is
  // purely decorative and does not affect which language is shown. Runs on
  // every load (not just once) so the flag self-corrects if the visitor's
  // location changes or an earlier lookup was wrong, instead of sticking
  // forever to a stale cached value.
  useEffect(() => {
    let cancelled = false;
    fetch('https://get.geojs.io/v1/ip/country.json')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data?.country) return;
        const code = String(data.country).toUpperCase();
        setCountry(code);
        localStorage.setItem('ensdim_country', code);
      })
      .catch(() => {
        // Network/geo-IP failure: silently keep the language-based fallback flag.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const setLanguage = (lang: Language) => {
    if (lang === language) return;

    const path = window.location.pathname;
    const isEn = isEnglishPath(path);
    let newPath: string;

    if (lang === 'en' && !isEn) {
      newPath = path === '/' ? '/en' : `/en${path}`;
    } else if (lang === 'ar' && isEn) {
      newPath = path === '/en' ? '/' : path.slice('/en'.length);
    } else {
      return;
    }

    window.location.href = `${newPath}${window.location.search}${window.location.hash}`;
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, country, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
