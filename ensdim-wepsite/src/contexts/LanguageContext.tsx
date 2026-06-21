import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface Country {
  name: string;
  nameAr: string;
  flag: string;
}

interface LanguageContextType {
  language: Language;
  country: string;
  setLanguage: (lang: Language) => void;
  setCountry: (country: string) => void;
  t: (key: string) => string;
}

const countries: Record<string, Country> = {
  SA: { name: 'Saudi Arabia', nameAr: 'السعودية', flag: '🇸🇦' },
  AE: { name: 'United Arab Emirates', nameAr: 'الإمارات', flag: '🇦🇪' },
  KW: { name: 'Kuwait', nameAr: 'الكويت', flag: '🇰🇼' },
  QA: { name: 'Qatar', nameAr: 'قطر', flag: '🇶🇦' },
  BH: { name: 'Bahrain', nameAr: 'البحرين', flag: '🇧🇭' },
  OM: { name: 'Oman', nameAr: 'عمان', flag: '🇴🇲' },
  EG: { name: 'Egypt', nameAr: 'مصر', flag: '🇪🇬' },
};

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
    countries: {
      SA: 'Saudi Arabia',
      AE: 'United Arab Emirates',
      KW: 'Kuwait',
      QA: 'Qatar',
      BH: 'Bahrain',
      OM: 'Oman',
      EG: 'Egypt',
      arabic: 'Arabic',
      english: 'English',
      selectCountry: 'Select Country & Language',
    },
    hero: {
      tag1: 'Behavior-led Business Systems',
      tag2: 'Automation',
      tag3: 'Digital Experiences',
      headline: 'Build around customer behavior.',
      subheadline: 'ENSDIM helps businesses improve conversion, customer experience, and operational clarity through behavior-led digital systems.',
      primaryCTA: 'Book a Consultation',
      secondaryCTA: 'Explore Solutions',
      trustLine: 'Strategy first. Technology around people.',
    },
    who: {
      label: 'Why ENSDIM?',
      title: 'Better systems start with better understanding.',
      description: 'We study how customers think, hesitate, decide, and convert—then build the right digital experiences and systems around that behavior.',
      cta: 'Learn more about ENSDIM',
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
      problem1Title: 'Leads are lost between team members',
      problem1Desc: 'Customer inquiries are scattered across WhatsApp, calls, and personal follow-up.',
      problem2Title: 'Follow-up depends on memory',
      problem2Desc: 'Teams rely on manual reminders instead of a clear system.',
      problem3Title: 'Customers wait too long for a response',
      problem3Desc: 'Slow replies reduce trust and conversion.',
      problem4Title: 'Management cannot see what is really happening',
      problem4Desc: 'There is no clear view of leads, follow-up status, or performance.',
      problem5Title: 'Teams repeat work and waste time',
      problem5Desc: 'Customer information and tasks are duplicated across people and tools.',
      problem6Title: 'Growth creates more chaos, not more control',
      problem6Desc: 'As demand increases, operations become harder to manage.',
      cta: 'See how ENSDIM solves it',
    },
    solutions: {
      title: 'Solutions built from behavior, not just features.',
      subtitle: 'We design around how customers think, ask, decide, and return — then build the systems that make growth easier to manage.',
      solution1Title: 'Scalable operations',
      solution1Desc: 'Turns operations from people-dependent effort into clear flows that can handle more customers, teams, and branches.',
      solution1Includes: ['Journey mapping', 'Friction analysis', 'Conversion flows', 'Touchpoints'],
      solution1CTA: 'Explore this solution',
      solution2Title: 'Visits that turn into clear requests',
      solution2Desc: 'Turns website visits and campaign traffic into clear requests, bookings, or trackable opportunities.',
      solution2Includes: ['Website & landing pages', 'Booking flows', 'Client portals', 'UX design'],
      solution2CTA: 'Explore this solution',
      solution3Title: 'Follow-up that prevents lost opportunities',
      solution3Desc: 'Organizes lead capture, follow-up, and opportunity status so customers do not get lost between WhatsApp, calls, and forms.',
      solution3Includes: ['CRM', 'Automation', 'Reminders', 'Customer data'],
      solution3CTA: 'Explore this solution',
      solution4Title: 'Faster decisions instead of guessing',
      solution4Desc: 'Brings important business data into a clear view so management can understand performance and make faster decisions.',
      solution4Includes: ['Dashboards', 'Analytics', 'AI insights', 'Growth tracking'],
      solution4CTA: 'Explore this solution',
      solution5Title: 'Lower cost and less pressure',
      solution5Desc: 'Reduces repeated manual work and team pressure by organizing or automating routine tasks.',
      solution5CTA: 'Explore this solution',
      solution6Title: 'Smart visibility that detects opportunities early',
      solution6Desc: 'Uses data and operational signals to reveal drops, opportunities, and improvement points before it is too late.',
      solution6CTA: 'Explore this solution',
      includes: 'INCLUDES',
    },
    sectors: {
      title: 'Built for service-driven businesses',
      subtitle: 'Our systems fit businesses where customer experience, follow-up, and daily operations matter.',
      sector1Title: 'Clinics & Healthcare',
      sector1Desc: 'Booking, patient follow-up, reminders, and operational visibility.',
      sector2Title: 'Real Estate & Property Services',
      sector2Desc: 'Lead management, CRM, property tracking, and sales follow-up.',
      sector3Title: 'Service Businesses',
      sector3Desc: 'Requests, scheduling, team follow-up, and customer operations.',
      sector4Title: 'Education & Training',
      sector4Desc: 'Registration, student follow-up, communication flows, and dashboards.',
      sector5Title: 'Construction & Operations',
      sector5Desc: 'Requests, quotations, project follow-up, and operational workflows.',
      question: 'Have a different business model?',
      cta: "Let's analyze your operations",
    },
    clientPortal: {
      sectionLabel: 'Client Workspace',
      title: 'Your project, visible at every stage.',
      description: 'Track project progress, documents, payments, and updates from one organized space.',
      feature1Title: 'Project Progress',
      feature1Desc: 'Track completion percentage and current project stage.',
      feature2Title: 'Proposals & Contracts',
      feature2Desc: 'Access your proposal, contract, and approved documents anytime.',
      feature3Title: 'Payments & Costs',
      feature3Desc: 'View project cost, payment status, and saved invoices.',
      feature4Title: 'Comments & Change Requests',
      feature4Desc: 'Request updates, leave comments, and keep communication organized.',
      feature5Title: 'Multi-Project View',
      feature5Desc: 'Manage one project or multiple projects from the same account.',
      primaryCTA: 'Client Login',
      secondaryCTA: 'Create Client Account',
      note: 'Available for active clients and approved projects.',
    },
    technology: {
      title: 'Built with trusted global technologies',
      description: 'Technologies we use to build reliable, scalable digital systems.',
    },
    testimonials: {
      title: 'What clients say',
      subtitle: 'Real feedback from businesses that needed clearer systems and better follow-up.',
    },
    maturity: {
      title: 'Where is your business now?',
      subtitle: 'We build around your current stage, whether you are starting, organizing, or scaling.',
      stage1: 'Build',
      stage1Title: 'Digital Foundation',
      stage1Desc: 'For new ideas and startups that need digital infrastructure.',
      stage1BestFor: ['New businesses', 'MVPs', 'First websites & apps', 'Core systems'],
      stage1CTA: 'Start Building',
      stage2: 'Start',
      stage2Title: 'Organization & Automation',
      stage2Desc: 'For existing businesses that need organization and automation.',
      stage2BestFor: ['Companies with customers', 'Manual work', 'WhatsApp chaos', 'Weak follow-up'],
      stage2CTA: 'Organize Operations',
      stage3: 'Growth',
      stage3Title: 'Intelligence & Scaling',
      stage3Desc: 'For companies ready to scale with dashboards, data, and AI.',
      stage3BestFor: ['Mature businesses', 'Data-driven teams', 'Repeated operations', 'Growth goals'],
      stage3CTA: 'Scale Smarter',
      bestFor: 'Best for',
    },
    methodology: {
      title: 'We diagnose before we build.',
      subtitle: 'We understand operations first, then design the right system, automation, or AI layer.',
      step1Title: 'Diagnose',
      step1Desc: 'Understand current operations, customers, and internal workflows.',
      step2Title: 'Map',
      step2Desc: 'Map customer journeys and operational gaps.',
      step3Title: 'Design',
      step3Desc: 'Design the right system structure and experience.',
      step4Title: 'Build',
      step4Desc: 'Develop the system, website, dashboard, automation, or AI layer.',
      step5Title: 'Automate',
      step5Desc: 'Reduce manual work through smart workflows and notifications.',
      step6Title: 'Improve',
      step6Desc: 'Measure, optimize, and improve after launch.',
    },
    research: {
      sectionTitle: 'Research',
      sectionSubtitle: 'Practical insights on customer behavior, operations, and conversion.',
      badge: 'Research',
      readTime: 'min read',
      title: 'Why businesses lose leads even when demand exists',
      description: 'A practical breakdown of how weak follow-up and scattered workflows reduce conversion.',
      cta: 'Read Research',
      ctaAll: 'View all research',
    },
    caseStudy: {
      sectionTitle: 'Case Study',
      sectionSubtitle: 'Examples of how better systems improve business performance.',
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
      sectionSubtitle: 'Join ENSDIM and help build smarter business systems.',
      title: 'Build intelligent business systems with us.',
      subtitle: 'We are building a flexible team across product, engineering, design, data, and growth.',
      availableRoles: 'Available roles:',
      cta: 'View Open Roles',
      question: 'Do not see your role?',
      ctaLink: 'Send us your profile',
    },
    finalCTA: {
      badge: 'Ready to Grow',
      title: 'Ready to improve how your business converts and operates?',
      subtitle: 'Tell us where follow-up breaks, where operations slow down, or where visibility is missing.',
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
      copyright: '© 2026 ENSDIM. All rights reserved.',
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
    countries: {
      SA: 'السعودية',
      AE: 'الإمارات',
      KW: 'الكويت',
      QA: 'قطر',
      BH: 'البحرين',
      OM: 'عُمان',
      EG: 'مصر',
      arabic: 'العربية',
      english: 'English',
      selectCountry: 'اختر الدولة واللغة',
    },
    hero: {
      tag1: 'أنظمة أعمال مبنية على السلوك',
      tag2: 'أتمتة',
      tag3: 'تجارب رقمية',
      headline: 'نبني حول سلوك العميل.',
      subheadline: 'تساعد إنسديم الأعمال على تحسين التحويل، تجربة العميل، ووضوح التشغيل — من خلال أنظمة رقمية مبنية على فهم السلوك.',
      primaryCTA: 'احجز استشارة',
      secondaryCTA: 'استكشف الحلول',
      trustLine: 'الاستراتيجية أولاً. والتقنية حول الإنسان.',
    },
    who: {
      label: 'لماذا إنسديم؟',
      title: 'الأنظمة الأفضل تبدأ بفهم أعمق.',
      description: 'ندرس كيف يفكر العملاء، أين يترددون، وكيف يقررون — ثم نبني الأنظمة والتجارب الرقمية المناسبة حول هذا السلوك.',
      card1Title: 'تحويل أعلى',
      card1Desc: 'نقلل الاحتكاك في رحلة العميل ونساعده على اتخاذ الخطوة التالية.',
      card2Title: 'تجربة عميل أفضل',
      card2Desc: 'رحلة أوضح، استجابة أسرع، وخدمة أكثر سلاسة.',
      card3Title: 'فرص مبيعات أكثر',
      card3Desc: 'نحوّل المتابعات المتفرقة والطلبات الضائعة إلى فرص نمو قابلة للقياس.',
      card4Title: 'إدارة أسهل',
      card4Desc: 'مسارات العمل، البيانات، المدفوعات، والتحديثات — كلها في طبقة تشغيل واحدة.',
      cta: 'تعرف على إنسديم',
    },
    problems: {
      title: 'عندما تتعطل المتابعة، يصبح النمو أصعب.',
      subtitle: 'عندما تتفرق الطلبات بين الواتساب والفريق والبيانات، تخسر الأعمال مبيعات ووقتاً وتحكماً.',
      problem1Title: 'الفرص تضيع بين أفراد الفريق',
      problem1Desc: 'الاستفسارات موزعة بين الواتساب والمكالمات والمتابعة الشخصية دون نظام.',
      problem2Title: 'المتابعة تعتمد على الذاكرة',
      problem2Desc: 'الفريق يذكّر نفسه يدوياً بدلاً من نظام يُدير المتابعة تلقائياً.',
      problem3Title: 'الردود تأتي متأخرة',
      problem3Desc: 'بطء الاستجابة يضعف الثقة ويقلل فرص التحويل.',
      problem4Title: 'لا رؤية واضحة لما يحدث',
      problem4Desc: 'لا توجد صورة واضحة لحالة العملاء أو المتابعة أو الأداء.',
      problem5Title: 'مهام تتكرر ووقت يُهدر',
      problem5Desc: 'البيانات والمهام تتضاعف بين أفراد الفريق والأدوات المختلفة.',
      problem6Title: 'النمو يزيد الفوضى بدلاً من التحكم',
      problem6Desc: 'كلما زاد الطلب، أصبح التشغيل أصعب وأكثر تعقيداً.',
      cta: 'اكتشف كيف تحلها إنسديم',
    },
    solutions: {
      title: 'حلول مبنية حول السلوك والتشغيل والنمو.',
      subtitle: 'نربط رحلة العميل، المتابعة، البيانات، والأتمتة — داخل أنظمة تجعل إدارة العمل أوضح وأسهل.',
      solution1Title: 'تشغيل قابل للتوسع',
      solution1Desc: 'تحول التشغيل من اعتماد كامل على الأشخاص إلى مسارات واضحة تستطيع تحمل زيادة العملاء والفريق والفروع.',
      solution1Includes: ['رسم رحلة العميل', 'تحليل نقاط الاحتكاك', 'مسارات التحويل', 'نقاط التواصل'],
      solution1CTA: 'اعرف الحل',
      solution2Title: 'زيارات تتحول إلى طلبات',
      solution2Desc: 'تحول الزيارات القادمة من الموقع أو الحملات إلى طلبات واضحة، حجوزات، أو فرص قابلة للمتابعة.',
      solution2Includes: ['موقع وصفحات هبوط', 'أنظمة حجز', 'بوابات عملاء', 'تصميم تجربة المستخدم'],
      solution2CTA: 'اعرف الحل',
      solution3Title: 'متابعة تمنع ضياع الفرص',
      solution3Desc: 'تنظم استقبال العملاء المحتملين، متابعة كل فرصة، ومعرفة حالتها حتى لا تضيع بين واتساب والمكالمات والنماذج.',
      solution3Includes: ['CRM', 'أتمتة', 'تذكيرات', 'بيانات العملاء'],
      solution3CTA: 'اعرف الحل',
      solution4Title: 'قرار أسرع بدل التخمين',
      solution4Desc: 'تجمع البيانات المهمة في رؤية واضحة تساعد الإدارة على فهم الأداء واتخاذ قرارات أسرع.',
      solution4Includes: ['لوحات تحكم', 'تحليلات', 'مؤشرات ذكية', 'تتبع النمو'],
      solution4CTA: 'اعرف الحل',
      solution5Title: 'تكلفة أقل وضغط أقل',
      solution5Desc: 'تقلل العمل اليدوي المتكرر وتخفف ضغط الفريق من خلال تنظيم أو أتمتة المهام المتكررة.',
      solution5CTA: 'اعرف الحل',
      solution6Title: 'رؤية ذكية تكشف الفرص مبكرًا',
      solution6Desc: 'تستخدم البيانات والإشارات العملية لاكتشاف الانخفاضات، الفرص، ونقاط التحسين قبل فوات الوقت.',
      solution6CTA: 'اعرف الحل',
      includes: 'يشمل',
    },
    sectors: {
      title: 'لكل عمل يعتمد على تجربة العميل',
      subtitle: 'أنظمتنا مبنية للشركات التي تهتم بالمتابعة وتجربة العميل والعمليات اليومية.',
      sector1Title: 'العيادات والرعاية الصحية',
      sector1Desc: 'الحجز ومتابعة المرضى والتذكيرات ووضوح العمليات.',
      sector2Title: 'العقارات وخدمات الممتلكات',
      sector2Desc: 'إدارة العملاء المحتملين وCRM وتتبع العقارات ومتابعة المبيعات.',
      sector3Title: 'شركات الخدمات',
      sector3Desc: 'الطلبات والجدولة ومتابعة الفريق وعمليات الخدمة.',
      sector4Title: 'التعليم والتدريب',
      sector4Desc: 'التسجيل ومتابعة الطلاب وإدارة التواصل ولوحات الأداء.',
      sector5Title: 'المقاولات والتشغيل',
      sector5Desc: 'الطلبات وعروض الأسعار ومتابعة المشاريع وسير العمليات.',
      question: 'نموذج عملك مختلف؟',
      cta: 'دعنا نحلل عملياتك',
    },
    clientPortal: {
      sectionLabel: 'مساحة العميل',
      title: 'مشروعك أمامك بوضوح في كل مرحلة.',
      description: 'تابع تقدم المشروع، العروض، العقود، المدفوعات، والتحديثات من مكان واحد منظم.',
      feature1Title: 'تقدم المشروع',
      feature1Desc: 'تتبع نسبة الإنجاز والمرحلة الحالية للمشروع.',
      feature2Title: 'العروض والعقود',
      feature2Desc: 'اطّلع على العرض والعقد والمستندات المعتمدة في أي وقت.',
      feature3Title: 'المدفوعات والفواتير',
      feature3Desc: 'تتبع تكلفة المشروع وحالة الدفع والفواتير المحفوظة.',
      feature4Title: 'التعليقات وطلبات التعديل',
      feature4Desc: 'اطلب تحديثات واترك تعليقات وحافظ على التواصل منظماً.',
      feature5Title: 'إدارة أكثر من مشروع',
      feature5Desc: 'أدر مشروعاً واحداً أو عدة مشاريع من نفس الحساب.',
      primaryCTA: 'دخول العملاء',
      secondaryCTA: 'إنشاء حساب',
      note: 'للعملاء الحاليين والمشاريع المعتمدة فقط.',
    },
    technology: {
      title: 'منظومة التقنيات الاستراتيجية',
      description: 'نستخدم منظومة تقنية عالمية موثوقة لبناء حلول قابلة للتوسع، آمنة، ومتصلة بأدوات العمل التي تستخدمها الشركات يوميًا.',
    },
    testimonials: {
      title: 'ماذا يقول عملاؤنا',
      subtitle: 'آراء حقيقية من أعمال أرادت أنظمة أوضح ومتابعة أفضل.',
    },
    maturity: {
      title: 'أين عملك الآن؟',
      subtitle: 'نبني حول مرحلتك الحالية — سواء كنت تبدأ، أو تنظم، أو تتوسع.',
      stage1: 'بناء',
      stage1Title: 'الأساس الرقمي',
      stage1Desc: 'للشركات الجديدة والأفكار الناشئة التي تحتاج أساساً رقمياً قوياً.',
      stage1BestFor: ['الشركات الجديدة', 'المنتجات الأولى', 'المواقع والتطبيقات', 'الأنظمة الأساسية'],
      stage1CTA: 'ابدأ البناء',
      stage2: 'انطلاق',
      stage2Title: 'التنظيم والأتمتة',
      stage2Desc: 'للشركات القائمة التي تحتاج تنظيم عملياتها وتقليل العمل اليدوي.',
      stage2BestFor: ['شركات لديها عملاء', 'عمل يدوي متكرر', 'تشتت في الواتساب', 'متابعة غير منتظمة'],
      stage2CTA: 'نظّم عملياتك',
      stage3: 'نمو',
      stage3Title: 'الذكاء والتوسع',
      stage3Desc: 'للشركات الجاهزة للتوسع باستخدام البيانات ولوحات التحكم والذكاء.',
      stage3BestFor: ['شركات ناضجة', 'فرق تعتمد على البيانات', 'عمليات متكررة', 'أهداف توسع'],
      stage3CTA: 'توسّع بذكاء',
      bestFor: 'مناسب لـ',
    },
    methodology: {
      title: 'نشخّص قبل أن نبني.',
      subtitle: 'نفهم العمليات أولاً، ثم نصمم النظام أو الأتمتة أو الحل الأنسب.',
      step1Title: 'تشخيص',
      step1Desc: 'فهم العمليات الحالية والعملاء وسير العمل الداخلي.',
      step2Title: 'رسم',
      step2Desc: 'رسم رحلات العملاء والفجوات التشغيلية.',
      step3Title: 'تصميم',
      step3Desc: 'تصميم البنية الصحيحة للنظام والتجربة.',
      step4Title: 'بناء',
      step4Desc: 'تطوير النظام أو الموقع أو لوحة التحكم أو الأتمتة.',
      step5Title: 'أتمتة',
      step5Desc: 'تقليل العمل اليدوي عبر مسارات عمل ذكية وإشعارات.',
      step6Title: 'تحسين',
      step6Desc: 'قياس النتائج وتحسين الأداء بعد الإطلاق.',
    },
    research: {
      sectionTitle: 'الأبحاث',
      sectionSubtitle: 'رؤى عملية حول سلوك العملاء، التشغيل، والتحويل.',
      badge: 'بحث',
      readTime: 'دقيقة قراءة',
      title: 'لماذا تخسر بعض الأعمال عملاء محتملين رغم وجود الطلب',
      description: 'تحليل عملي لكيفية تأثير المتابعة الضعيفة وتشتت سير العمل على معدلات التحويل.',
      cta: 'اقرأ البحث',
      ctaAll: 'عرض جميع الأبحاث',
    },
    caseStudy: {
      sectionTitle: 'دراسة حالة',
      sectionSubtitle: 'أمثلة حقيقية لتحسين الأداء من خلال أنظمة أوضح.',
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
      badge: 'جاهزون للنمو',
      title: 'جاهز لتحسين التحويل والتشغيل داخل عملك؟',
      subtitle: 'أخبرنا أين تتعطل المتابعة، وأين يتباطأ التشغيل، وأين تحتاج وضوحاً أكبر.',
      primaryCTA: 'احجز استشارة',
      secondaryCTA: 'أخبرنا بتحدي عملك',
    },
    footer: {
      tagline: 'نستمع للبيانات. نفهم الأعمال. نبني الحلول.',
      company: 'الشركة',
      solutions: 'الحلول',
      services: 'الخدمات',
      resources: 'الموارد',
      careers: 'الوظائف',
      copyright: '© 2026 ENSDIM. جميع الحقوق محفوظة.',
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

function isArabicPath(pathname: string): boolean {
  return pathname === '/ar' || pathname.startsWith('/ar/');
}

function detectInitialLanguage(): Language {
  return isArabicPath(window.location.pathname) ? 'ar' : 'en';
}

function detectInitialCountry(): string {
  return localStorage.getItem('ensdim_country') || 'AE';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(detectInitialLanguage);
  const [country, setCountryState] = useState<string>(detectInitialCountry);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const setLanguage = (lang: Language) => {
    if (lang === language) return;

    const path = window.location.pathname;
    const isAr = isArabicPath(path);
    let newPath: string;

    if (lang === 'ar' && !isAr) {
      newPath = path === '/' ? '/ar' : `/ar${path}`;
    } else if (lang === 'en' && isAr) {
      newPath = path === '/ar' ? '/' : path.slice('/ar'.length);
    } else {
      return;
    }

    window.location.href = `${newPath}${window.location.search}${window.location.hash}`;
  };

  const setCountry = (countryCode: string) => {
    setCountryState(countryCode);
    localStorage.setItem('ensdim_country', countryCode);
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
    <LanguageContext.Provider value={{ language, country, setLanguage, setCountry, t }}>
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

export { countries };
