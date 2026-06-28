import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from '../components/ScrollReveal';
import { ServiceRequestForm } from '../components/ServiceRequestForm';
import { SEO } from '../components/SEO';
import { FAQSection } from '../components/FAQSection';
import { getPublishedCaseStudies, type CaseStudy } from '../../lib/supabase';

interface ServiceDetail {
  title: string;
  tags: string;
  heroDesc: string;
  snapshot: string[];
  whenNeeded: string[];
  whatWeBuild: string[];
  howWeExecute: string[];
  deliverables: string[];
  relatedSolutions: { title: string; slug: string }[];
  faqs: { question: string; answer: string }[];
  needsLabel: string;
  needsOptions: string[];
  stageLabel: string;
  stageOptions: string[];
  freeTextPrompt: string;
}

export const serviceData: Record<string, { en: ServiceDetail; ar: ServiceDetail }> = {
  'ux-conversion-development': {
    en: {
      title: 'UX & Conversion Development',
      tags: 'Customer Journey · Friction Points · Higher Conversion',
      heroDesc: 'We study how customers understand your offer, where they hesitate, and what stops them from taking action. Then we improve the structure, messaging, and flow so the experience becomes easier to use and more likely to convert.',
      snapshot: [
        'Best for websites, platforms, or systems that have users but do not produce enough action.',
        'We deliver journey maps, UX improvements, clearer forms, and conversion priorities.',
        'Business value: better understanding of user behavior, stronger design decisions, and fewer drop-off points before action.',
      ],
      whenNeeded: [
        'Your website or platform works technically, but users do not complete the request.',
        'You want to improve an existing experience without rebuilding randomly.',
        'You need to know where customers hesitate before deciding.',
        'Your team has many opinions about design, but no clear user journey map.',
      ],
      whatWeBuild: [
        'User journey analysis from entry to action.',
        'Friction point mapping across pages and screens.',
        'Improved messaging, CTAs, forms, and decision paths.',
        'Wireframes or UX recommendations ready for execution.',
        'Mobile experience simplification and step reduction.',
        'Measurement points for requests, clicks, and form completion.',
      ],
      howWeExecute: [
        'We start with user behavior, not screen decoration.',
        'Every UX change is linked to a measurable business objective.',
        'We balance user clarity with realistic technical execution.',
        'We give the client a clear view of what to improve now and what can wait.',
      ],
      deliverables: [
        'UX review and friction report.',
        'Customer or user journey map.',
        'Improved structure for key pages or screens.',
        'Prioritized improvement list based on expected impact.',
        'Measurement recommendations after launch.',
      ],
      relatedSolutions: [
        { title: 'Visits that turn into clear requests', slug: 'digital-experiences' },
        { title: 'Follow-up that prevents lost opportunities', slug: 'follow-up-systems' },
        { title: 'Smart visibility that reveals opportunities early', slug: 'ai-practical-decisions' },
      ],
      faqs: [
        { question: 'Do I need UX before design?', answer: 'Yes if the issue is understanding, hesitation, or weak conversion. UX clarifies what should be designed before focusing on visual style.' },
        { question: 'Does this mean a full redesign?', answer: 'Not always. Sometimes the best improvement is in messaging, structure, forms, and decision flow. Other cases need deeper redesign.' },
        { question: 'How do we measure success?', answer: 'We define indicators such as form completion, CTA clicks, user flow completion, or increase in trackable requests.' },
      ],
      needsLabel: 'What do you want to improve in the user experience?',
      needsOptions: ['Weak conversion', 'Users do not complete the request', 'The offer is not understood quickly', 'Pages feel crowded or unclear', 'Mobile experience issues', 'Forms do not collect useful data', 'Review an existing website or system experience', 'Not sure yet'],
      stageLabel: 'Do you have an existing website or product?',
      stageOptions: ['Yes', 'No', 'Still at idea stage'],
      freeTextPrompt: 'Tell us where users seem to stop or hesitate, and whether you have an existing website or system you want to improve.',
    },
    ar: {
      title: 'تطوير تجربة المستخدم والتحويل',
      tags: 'رحلة العميل · نقاط التردد · تحويل أعلى',
      heroDesc: 'نحلل كيف يفهم العميل العرض، أين يتردد، وما الذي يمنعه من إكمال الطلب أو الحجز؛ ثم نعيد ترتيب التجربة والرسائل والشاشات حتى تصبح أسهل في الاستخدام وأقرب للتحويل.',
      snapshot: [
        'مناسبة للمواقع أو المنصات التي لديها زيارات أو مستخدمون لكن النتائج أقل من المتوقع.',
        'نبني خرائط رحلة، تحسينات تجربة، نماذج أوضح، وأولويات لتحسين التحويل.',
        'القيمة: فهم أفضل لسلوك العميل، قرارات تصميم أقوى، وتجربة تقلل الاحتكاك قبل الطلب.',
      ],
      whenNeeded: [
        'لديك موقع أو نظام يعمل، لكن المستخدمين لا يكملون الطلب أو الحجز.',
        'تريد تطوير واجهة موجودة دون إعادة بناء عشوائية.',
        'تحتاج معرفة أين يتوقف العميل قبل اتخاذ القرار.',
        'الفريق لديه آراء كثيرة حول التصميم، لكن لا توجد خريطة واضحة للتجربة.',
      ],
      whatWeBuild: [
        'تحليل رحلة المستخدم من أول زيارة حتى الإجراء المطلوب.',
        'تحديد نقاط التردد داخل الصفحات أو الشاشات.',
        'إعادة ترتيب الرسائل، الأزرار، النماذج، ومسارات القرار.',
        'Wireframes أو توصيات UX قابلة للتنفيذ.',
        'تحسين تجربة الموبايل واختصار الخطوات غير الضرورية.',
        'مؤشرات لقياس التحسن مثل الطلبات، النقرات، ومعدل إكمال النماذج.',
      ],
      howWeExecute: [
        'نبدأ من سلوك العميل لا من شكل الشاشة.',
        'نربط كل تعديل بهدف تجاري يمكن قياسه.',
        'نوازن بين وضوح التجربة وقابلية التنفيذ التقني.',
        'نترك للعميل خريطة واضحة لما يجب تحسينه الآن وما يمكن تأجيله.',
      ],
      deliverables: [
        'تقرير تجربة المستخدم ونقاط الاحتكاك.',
        'خريطة رحلة العميل أو المستخدم.',
        'تصور محسّن للصفحات أو الشاشات الأساسية.',
        'قائمة أولويات للتحسين حسب الأثر المتوقع.',
        'مقترحات قياس ومتابعة بعد الإطلاق.',
      ],
      relatedSolutions: [
        { title: 'زيارات تتحول إلى طلبات', slug: 'digital-experiences' },
        { title: 'متابعة تمنع ضياع الفرص', slug: 'follow-up-systems' },
        { title: 'رؤية ذكية تكشف الفرص مبكرًا', slug: 'ai-practical-decisions' },
      ],
      faqs: [
        { question: 'هل أحتاج UX قبل التصميم؟', answer: 'نعم إذا كانت المشكلة في الفهم أو التردد أو ضعف التحويل. UX يحدد ما يجب تصميمه قبل التفكير في الشكل النهائي.' },
        { question: 'هل الخدمة تعني إعادة تصميم كامل؟', answer: 'ليس دائمًا. أحيانًا نحتاج تعديل الرسائل والمسارات والنماذج فقط، وأحيانًا نوصي بإعادة بناء أجزاء أساسية.' },
        { question: 'كيف نقيس نجاح التحسين؟', answer: 'نحدد مؤشرات مثل إكمال النموذج، النقر على CTA، مدة التفاعل، أو زيادة الطلبات القابلة للمتابعة.' },
      ],
      needsLabel: 'ما الذي تريد تحسينه في تجربة المستخدم؟',
      needsOptions: ['ضعف التحويل', 'الزائر لا يكمل الطلب', 'العميل لا يفهم العرض بسرعة', 'صفحات مزدحمة أو غير واضحة', 'مشكلة في تجربة الموبايل', 'نموذج الطلب لا يجمع بيانات مناسبة', 'نريد مراجعة تجربة النظام أو الموقع', 'غير متأكد بعد'],
      stageLabel: 'هل لديك موقع أو منتج قائم؟',
      stageOptions: ['نعم', 'لا', 'ما زال في مرحلة الفكرة'],
      freeTextPrompt: 'صف لنا أين تشعر أن المستخدم يتوقف أو يتردد، وهل لديك موقع أو نظام قائم تريد تحسينه؟',
    },
  },
  'web-design-digital-experience': {
    en: {
      title: 'Web Design & Development',
      tags: 'Professional Websites · Conversion Pages · Performance & Tracking',
      heroDesc: 'We build websites that do more than present a company. They help visitors understand the offer, trust the business, and submit a clear request your team can follow up and measure.',
      snapshot: [
        'Best for businesses that need a new website or an existing website that does not generate clear requests.',
        'We build service pages, landing pages, forms, client portals, and analytics setup.',
        'Business value: stronger digital presence, faster trust, and requests that can be tracked instead of traffic without action.',
      ],
      whenNeeded: [
        'You need a website that explains your B2B service clearly.',
        'Your campaigns drive traffic but landing pages do not convert.',
        'Your current website looks acceptable but does not guide visitors to the next step.',
        'You need digital flows connected to booking, inquiries, or sales follow-up.',
      ],
      whatWeBuild: [
        'Website structure based on the customer journey.',
        'Responsive web and mobile-first layouts.',
        'Service pages and landing pages built around conversion.',
        'Custom inquiry or booking forms.',
        'Connection to WhatsApp, CRM, or follow-up dashboards when needed.',
        'Basic analytics and tracking for traffic sources and conversion.',
      ],
      howWeExecute: [
        'We build pages around customer decisions, not just page sections.',
        'Speed and mobile experience are treated as trust and conversion factors.',
        'We keep the website ready for future CRM, automation, and dashboard integrations.',
        'We treat the website as part of sales and operations, not just a digital brochure.',
      ],
      deliverables: [
        'Website or landing page design and development.',
        'Responsive mobile experience.',
        'Contact, request, or booking forms.',
        'SEO-friendly content structure.',
        'Tracking or analytics setup based on scope.',
      ],
      relatedSolutions: [
        { title: 'Visits that turn into clear requests', slug: 'digital-experiences' },
        { title: 'Follow-up that prevents lost opportunities', slug: 'follow-up-systems' },
        { title: 'Faster decisions instead of guessing', slug: 'visibility-insights' },
      ],
      faqs: [
        { question: 'Does the website include content writing?', answer: 'It can, depending on scope. Strong content should explain value and guide the customer journey, not just introduce the company.' },
        { question: 'Can the website connect with WhatsApp or CRM?', answer: 'Yes. Forms and requests can be connected to follow-up paths so leads do not stay only in email.' },
        { question: 'Do you build landing pages for campaigns?', answer: 'Yes. We build them around clear goals such as quote requests, bookings, registration, or trackable inquiries.' },
      ],
      needsLabel: 'What type of website or page do you need?',
      needsOptions: ['Company website', 'Campaign landing page', 'Service pages', 'Website with request form', 'Website with booking or inquiry flow', 'Simple client portal', 'Redesign of an existing website', 'Not sure yet'],
      stageLabel: 'Primary website goal',
      stageOptions: ['Present the company', 'Receive requests', 'Book appointments', 'Support campaigns', 'Build trust', 'Not sure yet'],
      freeTextPrompt: 'Tell us about your business, the goal of the website, and whether you already have a website or prepared content.',
    },
    ar: {
      title: 'تصميم وتطوير المواقع',
      tags: 'مواقع احترافية · صفحات تحويل · أداء وقياس',
      heroDesc: 'نبني مواقع لا تكتفي بتقديم الشركة بشكل جميل، بل تساعد الزائر على فهم العرض، اتخاذ قرار، وترك طلب يمكن لفريقك متابعته وقياس مصدره.',
      snapshot: [
        'مناسبة للشركات التي تحتاج موقعًا جديدًا أو تطوير موقع حالي لا يحقق طلبات واضحة.',
        'نبني صفحات تعريف، صفحات خدمات، صفحات هبوط، نماذج، وربط تحليلات.',
        'القيمة: حضور رقمي أوضح، ثقة أسرع، وطلبات يمكن تتبعها بدل زيارات بلا نتيجة.',
      ],
      whenNeeded: [
        'تحتاج إطلاق موقع يشرح خدمتك بوضوح أمام عملاء B2B.',
        'لديك حملات إعلانية لكن صفحات الهبوط لا تحول جيدًا.',
        'موقعك الحالي شكله مقبول لكنه لا يقود العميل للخطوة التالية.',
        'تحتاج بوابة أو صفحات مرتبطة بعملية الحجز أو الاستفسار.',
      ],
      whatWeBuild: [
        'هيكل صفحات مبني على رحلة العميل.',
        'تصميم واجهات متجاوبة للموبايل والويب.',
        'صفحات خدمة أو هبوط موجهة للتحويل.',
        'نماذج طلب أو حجز مخصصة حسب نوع الخدمة.',
        'ربط الطلبات بالواتساب أو CRM أو لوحة متابعة عند الحاجة.',
        'إعدادات تتبع وتحليلات أساسية لمصادر الطلبات والتحويل.',
      ],
      howWeExecute: [
        'نكتب ونصمم الصفحة حول قرار العميل، لا حول ملء المساحات.',
        'نهتم بسرعة الموقع وتجربة الموبايل لأنها تؤثر على الثقة والتحويل.',
        'نبني الموقع ليقبل الربط لاحقًا مع CRM أو أتمتة أو Dashboard.',
        'نعامل الموقع كقناة مبيعات وتشغيل، وليس كملف تعريفي فقط.',
      ],
      deliverables: [
        'تصميم وتطوير صفحات الموقع أو صفحات الهبوط.',
        'نسخة موبايل واضحة وسريعة.',
        'نماذج تواصل أو طلب مرتبطة بالهدف.',
        'أساسيات SEO وتقسيم محتوى مناسب.',
        'ربط تتبع أو تحليلات حسب نطاق المشروع.',
      ],
      relatedSolutions: [
        { title: 'زيارات تتحول إلى طلبات', slug: 'digital-experiences' },
        { title: 'متابعة تمنع ضياع الفرص', slug: 'follow-up-systems' },
        { title: 'قرار أسرع بدل التخمين', slug: 'visibility-insights' },
      ],
      faqs: [
        { question: 'هل الموقع يشمل كتابة المحتوى؟', answer: 'يمكن أن يشمل ذلك حسب نطاق المشروع، والأفضل أن يكتب المحتوى حول عرض الخدمة ورحلة العميل وليس كتعريف عام فقط.' },
        { question: 'هل يمكن ربط الموقع بالواتساب أو CRM؟', answer: 'نعم، يمكن ربط النماذج ومصادر الطلبات بمسار متابعة حتى لا تبقى البيانات داخل البريد فقط.' },
        { question: 'هل تنفذون صفحات هبوط للحملات؟', answer: 'نعم، ونبنيها حول هدف واضح مثل طلب عرض، حجز، تسجيل، أو استفسار قابل للمتابعة.' },
      ],
      needsLabel: 'ما نوع الموقع أو الصفحة التي تحتاجها؟',
      needsOptions: ['موقع شركة', 'صفحة هبوط لحملة', 'صفحات خدمات', 'موقع مع نموذج طلب', 'موقع مع حجز أو استفسار', 'بوابة عميل بسيطة', 'إعادة تصميم موقع قائم', 'غير متأكد بعد'],
      stageLabel: 'ما الهدف الأساسي من الموقع؟',
      stageOptions: ['تعريف الشركة', 'استقبال طلبات', 'حجز مواعيد', 'دعم الحملات', 'بناء ثقة', 'غير متأكد'],
      freeTextPrompt: 'اكتب نوع نشاطك، الهدف من الموقع، وهل لديك موقع حالي أو محتوى جاهز؟',
    },
  },
  'mobile-web-applications': {
    en: {
      title: 'Mobile Applications',
      tags: 'Continuous Experience · Easier Access · Field Operations',
      heroDesc: 'We develop customer and team mobile apps for booking, orders, follow-up, field operations, or continuous service experiences that need more than a standard web page.',
      snapshot: [
        'Best for businesses that need an ongoing digital channel for customers or teams.',
        'We build customer apps, supervisor apps, operational apps, or MVPs ready for iteration.',
        'Business value: easier access, recurring use, and less dependence on scattered conversations.',
      ],
      whenNeeded: [
        'The service continues after the first contact.',
        'You have field teams or supervisors who need mobile data entry.',
        'Customers need to view requests, visits, payments, files, or updates.',
        'You want a product MVP that can be tested before full expansion.',
      ],
      whatWeBuild: [
        'App experience designed around the main customer or team task.',
        'Login and permissions by user role.',
        'Screens for booking, orders, tracking, profiles, or field tasks.',
        'Notifications and reminders when needed.',
        'Admin panel connected to app activity.',
        'Integrations with payment, maps, WhatsApp, or internal systems when required.',
      ],
      howWeExecute: [
        'We do not recommend an app just to have one; we define why the phone is the right channel.',
        'We separate customer and team experiences when roles differ.',
        'We design for future users, permissions, and data growth.',
        'We connect the app to operations so it does not become isolated from management.',
      ],
      deliverables: [
        'iOS/Android or cross-platform app based on scope.',
        'User interfaces for each role.',
        'Admin panel or API when needed.',
        'Testing of core features before launch.',
        'Next-stage feature roadmap after real usage.',
      ],
      relatedSolutions: [
        { title: 'Operations built to scale', slug: 'customer-journey-systems' },
        { title: 'Lower cost and less operational pressure', slug: 'automation-layers' },
        { title: 'Follow-up that prevents lost opportunities', slug: 'follow-up-systems' },
      ],
      faqs: [
        { question: 'Do I need an app or is a responsive website enough?', answer: 'If the experience is temporary or informational, a website may be enough. If it is repeated, permission-based, or notification-driven, an app is often a better fit.' },
        { question: 'Can we start with a small first version?', answer: 'Yes. We prefer defining the most important user journey first, then expanding based on real usage.' },
        { question: 'Does the app include an admin panel?', answer: 'In most cases yes, because the app needs a place to manage users, orders, content, or operations.' },
      ],
      needsLabel: 'What type of app are you thinking of building?',
      needsOptions: ['Customer app', 'Internal team app', 'Booking or order app', 'Field service app', 'Subscription or contract follow-up app', 'Store or product app', 'MVP for a new idea', 'Not sure yet'],
      stageLabel: 'Current project stage',
      stageOptions: ['Idea only', 'Initial design', 'Existing app needs improvement', 'We want to build a first version'],
      freeTextPrompt: 'Describe the app idea, who will use it, and the top 3 things the app must do.',
    },
    ar: {
      title: 'تطبيقات الموبايل',
      tags: 'تجربة مستمرة · وصول أسهل · خدمة أقرب',
      heroDesc: 'نطوّر تطبيقات موبايل للعميل أو الفريق تساعد على الحجز، الطلب، المتابعة، التشغيل الميداني، أو إدارة تجربة مستمرة لا تكفيها صفحة ويب عادية.',
      snapshot: [
        'مناسبة للأعمال التي تحتاج قناة مستمرة مع العملاء أو فرق العمل.',
        'نبني تطبيقات للعميل، المشرفين، فرق التشغيل، أو نماذج MVP قابلة للتطوير.',
        'القيمة: وصول أسهل، استخدام متكرر، وتقليل الاعتماد على المحادثات المتفرقة.',
      ],
      whenNeeded: [
        'الخدمة تحتاج متابعة مستمرة بعد أول تواصل.',
        'لديك فريق ميداني أو مشرفون يحتاجون إدخال بيانات من الهاتف.',
        'العميل يحتاج رؤية طلبه، مواعيده، مدفوعاته، أو ملفه.',
        'تريد إطلاق منتج رقمي يبدأ بنسخة قابلة للاختبار.',
      ],
      whatWeBuild: [
        'تجربة مستخدم للتطبيق مبنية على أهم مهام العميل أو الفريق.',
        'تسجيل دخول وصلاحيات حسب نوع المستخدم.',
        'شاشات للحجز، الطلبات، المتابعة، أو الملفات.',
        'إشعارات وتنبيهات عند الحاجة.',
        'لوحة إدارة مرتبطة بالتطبيق.',
        'تكامل مع الدفع، الخرائط، واتساب، أو أنظمة داخلية حسب المشروع.',
      ],
      howWeExecute: [
        'لا نبدأ بتطبيق لمجرد وجود تطبيق؛ نحدد أولًا لماذا يحتاج المستخدم الهاتف تحديدًا.',
        'نفصل بين تجربة العميل وتجربة الفريق إذا اختلفت الأدوار.',
        'نبني قابلية للتوسع بإضافة صلاحيات ومستخدمين وبيانات لاحقًا.',
        'نربط التطبيق بالتشغيل حتى لا يصبح قناة منفصلة عن الإدارة.',
      ],
      deliverables: [
        'تطبيق iOS/Android أو نسخة هجينة حسب الاتفاق.',
        'واجهات استخدام مصممة حسب دور المستخدم.',
        'لوحة إدارة أو API عند الحاجة.',
        'اختبار الوظائف الأساسية قبل الإطلاق.',
        'خطة خصائص للمرحلة التالية بعد أول استخدام فعلي.',
      ],
      relatedSolutions: [
        { title: 'تشغيل قابل للتوسع', slug: 'customer-journey-systems' },
        { title: 'تكلفة أقل وضغط أقل', slug: 'automation-layers' },
        { title: 'متابعة تمنع ضياع الفرص', slug: 'follow-up-systems' },
      ],
      faqs: [
        { question: 'هل أحتاج تطبيقًا أم موقعًا متجاوبًا يكفي؟', answer: 'إذا كانت التجربة مؤقتة أو تعريفية فقد يكفي الموقع. أما إذا كانت متكررة وتحتاج إشعارات أو متابعة أو صلاحيات، فالتطبيق يصبح أكثر مناسبة.' },
        { question: 'هل يمكن البدء بنسخة أولى صغيرة؟', answer: 'نعم. نفضل تحديد أهم رحلة استخدام أولًا ثم تطوير التطبيق بناءً على البيانات والاستخدام الحقيقي.' },
        { question: 'هل يتضمن التطبيق لوحة إدارة؟', answer: 'في أغلب المشاريع نعم، لأن التطبيق يحتاج مكانًا لإدارة المستخدمين والطلبات والمحتوى أو التشغيل.' },
      ],
      needsLabel: 'ما نوع التطبيق الذي تفكر في بنائه؟',
      needsOptions: ['تطبيق للعملاء', 'تطبيق للفريق الداخلي', 'تطبيق للحجز أو الطلبات', 'تطبيق خدمة ميدانية', 'تطبيق متابعة اشتراكات أو عقود', 'تطبيق متجر أو منتجات', 'تطبيق MVP لفكرة جديدة', 'غير متأكد بعد'],
      stageLabel: 'مرحلة المشروع الحالية',
      stageOptions: ['فكرة فقط', 'تصميم مبدئي', 'تطبيق قائم يحتاج تطوير', 'نريد بناء نسخة أولى'],
      freeTextPrompt: 'صف فكرة التطبيق، من سيستخدمه، وما أهم 3 أشياء يجب أن يفعلها التطبيق؟',
    },
  },
  'crm-internal-systems': {
    en: {
      title: 'CRM & Follow-up Systems',
      tags: 'Customer Management · Opportunity Follow-up · Sales Pipeline',
      heroDesc: 'We build CRM systems that organize customer intake, sources, statuses, and follow-up from first contact to closing, so opportunities are not lost between WhatsApp, calls, forms, and spreadsheets.',
      snapshot: [
        'Best for companies that receive leads from multiple channels but cannot clearly see each opportunity status.',
        'We build lead stages, reminders, assignments, sales reports, and lead source tracking.',
        'Business value: faster follow-up, fewer lost opportunities, and clearer visibility for sales and management.',
      ],
      whenNeeded: [
        'Leads come from several channels and are not collected in one place.',
        'You do not know who followed up with each customer or what should happen next.',
        'Sales depends on team memory or scattered files.',
        'You need to measure lead sources and follow-up team performance.',
      ],
      whatWeBuild: [
        'Unified customer and opportunity database.',
        'Clear stages for each lead or opportunity.',
        'Task and responsibility assignment for team members.',
        'Follow-up reminders and alerts.',
        'Lead source tracking by channel or campaign.',
        'Dashboards and reports for conversion and team performance.',
      ],
      howWeExecute: [
        'We design CRM around your real sales process, not around a generic template.',
        'We reduce manual entry where possible so the team actually uses the system.',
        'We connect CRM with website forms, WhatsApp, or other channels when needed.',
        'We consider what management needs to see, not only what sales reps need to enter.',
      ],
      deliverables: [
        'Custom or lightweight CRM depending on stage.',
        'Follow-up stages, roles, and permissions.',
        'Reminders or alerts by customer status.',
        'Reports for sources, conversion, and team performance.',
        'Integration setup based on available channels.',
      ],
      relatedSolutions: [
        { title: 'Follow-up that prevents lost opportunities', slug: 'follow-up-systems' },
        { title: 'Lower cost and less operational pressure', slug: 'automation-layers' },
        { title: 'Operations built to scale', slug: 'customer-journey-systems' },
      ],
      faqs: [
        { question: 'Is a ready-made CRM enough?', answer: 'For simple sales flows it may be enough. If your follow-up depends on your workflow, channels, and team roles, customization can create much clearer control.' },
        { question: 'Can CRM connect with the website?', answer: 'Yes. Requests from forms and landing pages can enter the follow-up pipeline directly.' },
        { question: 'Does CRM help management?', answer: 'Yes, if designed well. It shows opportunity count, status, source, and conversion by stage instead of relying on manual updates.' },
      ],
      needsLabel: 'What is happening now in customer follow-up?',
      needsOptions: ['Leads are lost between WhatsApp and calls', 'We cannot see each opportunity status', 'There is no clear sales pipeline', 'Follow-up depends on team memory', 'We need reminders and alerts', 'We need to assign leads to the team', 'We need management reports', 'We have a CRM but it does not fit'],
      stageLabel: 'Current lead sources',
      stageOptions: ['WhatsApp', 'Calls', 'Website', 'Advertising campaigns', 'Social media', 'Referrals', 'Multiple sources'],
      freeTextPrompt: 'How do you receive customers now? Who follows up with them? Where do leads usually get lost or delayed?',
    },
    ar: {
      title: 'أنظمة CRM والمتابعة',
      tags: 'إدارة العملاء · متابعة الفرص · قمع مبيعات',
      heroDesc: 'نبني أنظمة CRM تنظّم استقبال العملاء، مصادرهم، حالاتهم، ومسار المتابعة من أول تواصل حتى الإغلاق، حتى لا تضيع الفرص بين واتساب والمكالمات والملفات.',
      snapshot: [
        'مناسبة للشركات التي تستقبل عملاء من قنوات متعددة ولا ترى حالة كل فرصة بوضوح.',
        'نبني مراحل العميل، التذكيرات، توزيع المهام، تقارير المبيعات، ومصادر العملاء.',
        'القيمة: متابعة أسرع، فرص أقل ضياعًا، ورؤية أوضح لفريق الإدارة والمبيعات.',
      ],
      whenNeeded: [
        'العملاء يصلون من أكثر من قناة ولا يتم جمعهم في مكان واحد.',
        'لا تعرف من تابع كل عميل وما الخطوة التالية.',
        'المبيعات تعتمد على ذاكرة الفريق أو ملفات متفرقة.',
        'تحتاج قياس مصادر العملاء وأداء فريق المتابعة.',
      ],
      whatWeBuild: [
        'قاعدة عملاء وفرص موحدة.',
        'مراحل واضحة لحالة العميل أو الفرصة.',
        'توزيع مسؤوليات ومهام على أعضاء الفريق.',
        'تذكيرات وتنبيهات للمتابعة.',
        'تسجيل مصدر العميل والحملة أو القناة.',
        'لوحات وتقارير للإدارة عن التحويل والأداء.',
      ],
      howWeExecute: [
        'نصمم CRM حول طريقة البيع الفعلية لا حول قالب جاهز.',
        'نقلل الإدخال اليدوي بقدر الإمكان حتى يستخدمه الفريق يوميًا.',
        'نربط CRM بالموقع أو النماذج أو الواتساب حسب الحاجة.',
        'نهتم بما تحتاج الإدارة رؤيته وليس فقط ما يحتاجه موظف المبيعات.',
      ],
      deliverables: [
        'CRM مخصص أو خفيف حسب المرحلة.',
        'مراحل متابعة وأدوار وصلاحيات.',
        'تنبيهات أو تذكيرات حسب حالة العميل.',
        'تقارير عن المصادر والتحويل وأداء الفريق.',
        'إعدادات ربط بالقنوات المتاحة حسب المشروع.',
      ],
      relatedSolutions: [
        { title: 'متابعة تمنع ضياع الفرص', slug: 'follow-up-systems' },
        { title: 'تكلفة أقل وضغط أقل', slug: 'automation-layers' },
        { title: 'تشغيل قابل للتوسع', slug: 'customer-journey-systems' },
      ],
      faqs: [
        { question: 'هل CRM الجاهز يكفي أم نحتاج نظامًا مخصصًا؟', answer: 'إذا كانت عملية البيع بسيطة فقد يكفي نظام جاهز. أما إذا كانت المتابعة مرتبطة بسياق عملك وفريقك وقنواتك، فالتخصيص يعطي وضوحًا أكبر.' },
        { question: 'هل يمكن ربط CRM بالموقع؟', answer: 'نعم، يمكن إدخال الطلبات مباشرة من النماذج أو صفحات الهبوط إلى مسار المتابعة.' },
        { question: 'هل يساعد CRM الإدارة؟', answer: 'نعم، إذا صُمم جيدًا سيعرض عدد الفرص، حالتها، مصادرها، وتحويل كل مرحلة بدل الاعتماد على تحديثات يدوية.' },
      ],
      needsLabel: 'ما الذي يحدث الآن في متابعة العملاء؟',
      needsOptions: ['العملاء يضيعون بين واتساب والمكالمات', 'لا نعرف حالة كل فرصة', 'لا يوجد مسار مبيعات واضح', 'المتابعة تعتمد على ذاكرة الفريق', 'نحتاج تذكيرات وتنبيهات', 'نحتاج توزيع العملاء على الفريق', 'نحتاج تقارير للإدارة', 'لدينا CRM لكنه غير مناسب'],
      stageLabel: 'مصادر العملاء الحالية',
      stageOptions: ['واتساب', 'مكالمات', 'موقع', 'حملات إعلانية', 'سوشيال ميديا', 'ترشيحات', 'أكثر من مصدر'],
      freeTextPrompt: 'كيف تستقبلون العملاء الآن؟ ومن يتابعهم؟ وما أكثر نقطة يحدث فيها ضياع أو تأخير؟',
    },
  },
  'internal-systems-operations': {
    en: {
      title: 'Internal Systems & Operations',
      tags: 'Organized Operations · Workflows · Management Control',
      heroDesc: 'We build systems that organize tasks, requests, approvals, employees, inventory, branches, operational accounts, or any repeated workflow that consumes the team when managed manually.',
      snapshot: [
        'Best for businesses that have grown beyond scattered messages, files, and team memory.',
        'We build admin panels, permissions, operating stages, logs, and status tracking.',
        'Business value: fewer errors, clearer responsibilities, and stronger ability to scale without chaos.',
      ],
      whenNeeded: [
        'The same tasks repeat every day and are hard to track.',
        'Management needs to ask the team to know task or request status.',
        'Work depends on one person or one file that creates bottlenecks.',
        'You manage branches, teams, visits, contracts, inventory, or approvals that need structure.',
      ],
      whatWeBuild: [
        'Workflow analysis and pressure point identification.',
        'Work stages and team responsibility design.',
        'Admin dashboard for requests, tasks, and users.',
        'Role-based permissions.',
        'Operation logs and status updates.',
        'Reports that help management monitor operations.',
      ],
      howWeExecute: [
        'We turn operations into a clear flow before building the system.',
        'We design around how the team actually works, not around unnecessary complexity.',
        'We plan for future branches, users, and permissions.',
        'We connect operations with data so management can see the picture instead of chasing details.',
      ],
      deliverables: [
        'Custom internal system or operating panel.',
        'Roles, permissions, stages, and workflows.',
        'Data entry forms and tracking logs.',
        'Reports and status dashboards as needed.',
        'Testing and usage explanation for the team.',
      ],
      relatedSolutions: [
        { title: 'Operations built to scale', slug: 'customer-journey-systems' },
        { title: 'Lower cost and less operational pressure', slug: 'automation-layers' },
        { title: 'Faster decisions instead of guessing', slug: 'visibility-insights' },
      ],
      faqs: [
        { question: 'Is this like an ERP?', answer: 'It can be lighter than an ERP or close to one in certain functions. The goal is to build what your operations actually need without unnecessary complexity.' },
        { question: 'Can we start with one part such as tasks or inventory?', answer: 'Yes. Starting with the highest-pressure area is often the best way to create fast value.' },
        { question: 'Will the team need training?', answer: 'Yes. We design clear interfaces and explain the main roles and actions according to project scope.' },
      ],
      needsLabel: 'Which internal process do you want to organize?',
      needsOptions: ['Requests management', 'Task management', 'Internal approvals', 'Employee management', 'Inventory management', 'Branch management', 'Contracts or visits management', 'Payments or operational accounts', 'Field operations', 'Not sure yet'],
      stageLabel: 'How is the process currently managed?',
      stageOptions: ['WhatsApp', 'Excel', 'Paper', 'An existing system', 'Multiple tools', 'Fully manual'],
      freeTextPrompt: 'Explain how this process works today, and what consumes the most team time or causes errors.',
    },
    ar: {
      title: 'الأنظمة الداخلية وإدارة التشغيل',
      tags: 'تشغيل منظم · تدفقات عمل · تحكم إداري',
      heroDesc: 'نبني أنظمة تنظم المهام، الطلبات، الموافقات، الموظفين، المخزون، الفروع، الحسابات التشغيلية، أو أي تدفق يومي يستهلك وقت الفريق عندما يدار يدويًا.',
      snapshot: [
        'مناسبة للأعمال التي كبرت وأصبحت العمليات اليومية تتوزع بين رسائل وملفات وذاكرة فريق.',
        'نبني لوحات إدارة، صلاحيات، مراحل تشغيل، سجلات، ومتابعة حالات.',
        'القيمة: تقليل الأخطاء، وضوح المسؤوليات، وقدرة أعلى على التوسع بدون فوضى.',
      ],
      whenNeeded: [
        'تتكرر نفس المهام يوميًا ويصعب متابعتها.',
        'الإدارة تحتاج سؤال الفريق لمعرفة حالة الطلب أو المهمة.',
        'العمل يعتمد على شخص أو ملف واحد يسبب اختناقًا.',
        'لديك فروع، فرق، زيارات، عقود، مخزون، أو موافقات تحتاج تنظيمًا.',
      ],
      whatWeBuild: [
        'تحليل تدفقات العمل الحالية وتحديد نقاط الضغط.',
        'تصميم حالات العمل ومسؤوليات الفريق.',
        'لوحة إدارة للطلبات والمهام والمستخدمين.',
        'صلاحيات حسب الأدوار.',
        'سجلات للعمليات والتحديثات.',
        'تقارير تشغيلية تساعد الإدارة على المتابعة.',
      ],
      howWeExecute: [
        'نحوّل التشغيل إلى مسار واضح قبل أن نكتب النظام.',
        'نصمم النظام ليناسب طريقة عمل الفريق لا ليجبره على تعقيد جديد.',
        'نراعي التوسع بإضافة فروع أو مستخدمين أو صلاحيات لاحقًا.',
        'نربط التشغيل بالبيانات حتى يرى صاحب القرار الصورة بدل مطاردة التفاصيل.',
      ],
      deliverables: [
        'نظام داخلي مخصص أو لوحة تشغيل.',
        'صلاحيات ومراحل وإجراءات واضحة.',
        'نماذج إدخال بيانات وسجلات متابعة.',
        'تقارير ولوحات حالة حسب الحاجة.',
        'اختبار وتدريب على استخدام النظام.',
      ],
      relatedSolutions: [
        { title: 'تشغيل قابل للتوسع', slug: 'customer-journey-systems' },
        { title: 'تكلفة أقل وضغط أقل', slug: 'automation-layers' },
        { title: 'قرار أسرع بدل التخمين', slug: 'visibility-insights' },
      ],
      faqs: [
        { question: 'هل النظام الداخلي يشبه ERP؟', answer: 'قد يكون أبسط من ERP أو قريبًا منه في بعض الوظائف. الفكرة أن نبني ما يحتاجه تشغيلك فعلًا بدون تعقيد زائد.' },
        { question: 'هل يمكن البدء بجزء واحد مثل المهام أو المخزون؟', answer: 'نعم، الأفضل غالبًا البدء بأكثر جزء يسبب ضغطًا ثم توسيع النظام تدريجيًا.' },
        { question: 'هل يحتاج الفريق تدريبًا؟', answer: 'نعم، نعتمد على واجهات واضحة ونقدم شرحًا لاستخدام الأدوار الأساسية حسب نطاق المشروع.' },
      ],
      needsLabel: 'ما العملية الداخلية التي تريد تنظيمها؟',
      needsOptions: ['إدارة الطلبات', 'إدارة المهام', 'الموافقات الداخلية', 'إدارة الموظفين', 'إدارة المخزون', 'إدارة الفروع', 'إدارة العقود أو الزيارات', 'إدارة المدفوعات أو الحسابات التشغيلية', 'تشغيل ميداني', 'غير متأكد بعد'],
      stageLabel: 'كيف تدار العملية حاليًا؟',
      stageOptions: ['واتساب', 'Excel', 'ورق', 'نظام قائم', 'أكثر من أداة', 'بشكل يدوي بالكامل'],
      freeTextPrompt: 'اشرح لنا كيف تتم هذه العملية الآن، وما أكثر شيء يستهلك وقت الفريق أو يسبب أخطاء؟',
    },
  },
  'data-dashboards': {
    en: {
      title: 'Data & Dashboards',
      tags: 'KPIs · Management Visibility · Faster Decisions',
      heroDesc: 'We turn scattered data from sales, marketing, operations, branches, or systems into focused visibility that helps management understand what is happening and what needs action.',
      snapshot: [
        'Best for companies that have data but receive it late, scattered, or without clear meaning.',
        'We build KPIs, filters, reports, comparisons, and alerts based on available data sources.',
        'Business value: less reporting time, faster performance visibility, and clearer decisions.',
      ],
      whenNeeded: [
        'Recurring reports take too much time to prepare.',
        'Data lives across files and disconnected systems.',
        'You need to compare branches, channels, or team performance.',
        'Management needs daily or weekly visibility without waiting for manual reports.',
      ],
      whatWeBuild: [
        'Define business-critical KPIs.',
        'Collect and organize available data sources.',
        'Dashboards with filters by date, branch, channel, or service.',
        'Management summaries and reports.',
        'Alerts for significant changes when needed.',
        'Optional data assistant or intelligence layer in later stages.',
      ],
      howWeExecute: [
        'We do not show many numbers without meaning; we focus on what supports decisions.',
        'We design dashboards around management questions.',
        'We value readability over visual complexity.',
        'We connect data to operations, marketing, or sales depending on project goals.',
      ],
      deliverables: [
        'Dashboard for management or teams.',
        'Clear definition of important indicators.',
        'Organized or connected data sources.',
        'Reports, filters, or alerts depending on scope.',
        'Recommendations for the next analytics stage.',
      ],
      relatedSolutions: [
        { title: 'Faster decisions instead of guessing', slug: 'visibility-insights' },
        { title: 'Smart visibility that reveals opportunities early', slug: 'ai-practical-decisions' },
        { title: 'Operations built to scale', slug: 'customer-journey-systems' },
      ],
      faqs: [
        { question: 'Does the data need to be organized first?', answer: 'Not always, but clear data sources make implementation faster. Data organization can be the first stage.' },
        { question: 'Can the dashboard be real-time?', answer: 'It depends on the data source and integration method. It can be real-time or periodically updated based on need and cost.' },
        { question: 'Can AI be added?', answer: 'Yes if the data is sufficient and the goal is clear, such as summarizing performance or detecting drops.' },
      ],
      needsLabel: 'Which numbers do you need to see more clearly?',
      needsOptions: ['Sales', 'Lead sources', 'Campaign performance', 'Branch performance', 'Team performance', 'Requests and bookings', 'Inventory or operations', 'Financial indicators', 'Customer data', 'Not sure yet'],
      stageLabel: 'Current data sources',
      stageOptions: ['Excel', 'CRM', 'Website', 'Ads', 'Internal system', 'Multiple sources', 'No organized data yet'],
      freeTextPrompt: 'Where is your data now, and what decision do you need to make faster?',
    },
    ar: {
      title: 'البيانات ولوحات المتابعة',
      tags: 'مؤشرات أداء · رؤية إدارية · قرار أسرع',
      heroDesc: 'نحوّل البيانات المتفرقة من المبيعات، التسويق، التشغيل، الفروع، أو الأنظمة إلى رؤية مختصرة تساعد الإدارة على معرفة ما يحدث وما يحتاج تدخلًا.',
      snapshot: [
        'مناسبة للشركات التي لديها بيانات لكنها تصل متأخرة أو متفرقة أو غير مفهومة.',
        'نبني KPIs، فلاتر، تقارير، مقارنات، وتنبيهات حسب مصادر البيانات المتاحة.',
        'القيمة: تقليل وقت التقارير، رؤية الأداء بسرعة، وتحسين القرار بناءً على أرقام واضحة.',
      ],
      whenNeeded: [
        'تحتاج تقارير متكررة تستغرق وقتًا كبيرًا.',
        'البيانات موجودة في ملفات وأنظمة مختلفة.',
        'تريد مقارنة الفروع أو القنوات أو أداء الفرق.',
        'الإدارة تحتاج رؤية يومية أو أسبوعية بدون انتظار تقارير يدوية.',
      ],
      whatWeBuild: [
        'تحديد مؤشرات الأداء المهمة لنشاطك.',
        'تجميع وتنظيم مصادر البيانات المتاحة.',
        'لوحات متابعة بفلترة حسب التاريخ، الفرع، القناة، أو الخدمة.',
        'تقارير ملخصة للإدارة.',
        'تنبيهات عند تغيرات مهمة عند الحاجة.',
        'إمكانية إضافة مساعد بيانات أو طبقة تحليل ذكية لاحقًا.',
      ],
      howWeExecute: [
        'لا نعرض أرقامًا كثيرة بلا معنى؛ نركز على ما يساعد القرار.',
        'نصمم اللوحات حسب أسئلة الإدارة اليومية.',
        'نراعي سهولة القراءة لا التعقيد البصري.',
        'نربط البيانات بالتشغيل أو التسويق أو المبيعات حسب هدف المشروع.',
      ],
      deliverables: [
        'Dashboard للإدارة أو الفريق.',
        'تعريف واضح للمؤشرات المهمة.',
        'مصادر بيانات منظمة أو مرتبطة.',
        'تقارير أو فلاتر أو تنبيهات حسب الحاجة.',
        'توصيات للمرحلة التالية من التحليل.',
      ],
      relatedSolutions: [
        { title: 'قرار أسرع بدل التخمين', slug: 'visibility-insights' },
        { title: 'رؤية ذكية تكشف الفرص مبكرًا', slug: 'ai-practical-decisions' },
        { title: 'تشغيل قابل للتوسع', slug: 'customer-journey-systems' },
      ],
      faqs: [
        { question: 'هل يجب أن تكون البيانات منظمة قبل البدء؟', answer: 'ليس دائمًا، لكن كلما كانت المصادر واضحة كان التنفيذ أسرع. يمكن أن نبدأ بتنظيم البيانات كمرحلة أولى.' },
        { question: 'هل الداشبورد يعمل لحظيًا؟', answer: 'يعتمد ذلك على مصدر البيانات وطريقة الربط. يمكن أن يكون لحظيًا أو بتحديث دوري حسب الحاجة والتكلفة.' },
        { question: 'هل يمكن إضافة ذكاء اصطناعي؟', answer: 'نعم إذا كانت البيانات كافية وكان الهدف واضحًا، مثل تلخيص الأداء أو اكتشاف الانخفاضات أو الإجابة على أسئلة الإدارة.' },
      ],
      needsLabel: 'ما الأرقام التي تحتاج أن تراها بوضوح؟',
      needsOptions: ['المبيعات', 'مصادر العملاء', 'أداء الحملات', 'أداء الفروع', 'أداء الفريق', 'الطلبات والحجوزات', 'المخزون أو التشغيل', 'مؤشرات مالية', 'بيانات العملاء', 'غير متأكد بعد'],
      stageLabel: 'مصادر البيانات الحالية',
      stageOptions: ['Excel', 'CRM', 'موقع', 'إعلانات', 'نظام داخلي', 'أكثر من مصدر', 'لا توجد بيانات منظمة'],
      freeTextPrompt: 'أين توجد بياناتك الآن؟ وما القرار الذي تحتاج أن تتخذه بشكل أسرع؟',
    },
  },
  'ai-chatbots-automation': {
    en: {
      title: 'AI Chatbots & Automation',
      tags: 'Faster Response · Smarter Follow-up · Less Manual Work',
      heroDesc: 'We build chatbots and automation flows for replies, classification, reminders, follow-up, and data collection, while keeping them connected to the team workflow instead of isolated automated messages.',
      snapshot: [
        'Best for businesses with repeated inquiries, high follow-up volume, or fast request classification needs.',
        'We build chatbots, follow-up messages, alerts, workflows, and CRM/Dashboard connections.',
        'Business value: shorter response time, less team pressure, and a more consistent customer experience.',
      ],
      whenNeeded: [
        'Customers wait for replies to repeated questions.',
        'The team sends the same messages or reminders daily.',
        'You need to classify customers before sending them to the right person.',
        'You want replies and follow-up connected to the system, not only to chats.',
      ],
      whatWeBuild: [
        'Conversation scenarios based on customer intent.',
        'Light data collection inside the chat flow.',
        'Inquiry classification by service or stage.',
        'Automated reminders and follow-up messages.',
        'Team alerts for important opportunities.',
        'Connections with WhatsApp, website, CRM, or dashboards when possible.',
      ],
      howWeExecute: [
        'We do not add bots for show; we add them when they reduce pressure or improve service.',
        'We write flows that feel understandable, not robotic.',
        'We keep room for team intervention when the conversation matters.',
        'We connect automation with data so its effect can be measured.',
      ],
      deliverables: [
        'Chatbot or automation flow based on selected channel.',
        'Conversation scenarios and follow-up messages.',
        'Classification or routing rules.',
        'Connection with forms, CRM, or teams when needed.',
        'Usage or request reports depending on scope.',
      ],
      relatedSolutions: [
        { title: 'Lower cost and less operational pressure', slug: 'automation-layers' },
        { title: 'Follow-up that prevents lost opportunities', slug: 'follow-up-systems' },
        { title: 'Smart visibility that reveals opportunities early', slug: 'ai-practical-decisions' },
      ],
      faqs: [
        { question: 'Does a chatbot replace customer service?', answer: 'Not necessarily. It usually handles repeated questions, classification, and follow-up, while the team handles important cases.' },
        { question: 'Can it work on WhatsApp?', answer: 'Yes depending on provider and setup, and it can be connected to follow-up or CRM when needed.' },
        { question: 'Does every automation need AI?', answer: 'No. Some flows only need clear rules. We use AI when understanding, summarizing, or classification adds value.' },
      ],
      needsLabel: 'What do you want to automate or respond to faster?',
      needsOptions: ['Repeated questions', 'Lead intake', 'Lead qualification before human contact', 'Reminders', 'Automatic customer follow-up', 'Request classification', 'Conversation summaries', 'Connect WhatsApp or website to the system', 'Reduce repeated manual tasks', 'Not sure yet'],
      stageLabel: 'Primary channel',
      stageOptions: ['Website', 'WhatsApp', 'CRM', 'Email', 'Internal system', 'Multiple channels'],
      freeTextPrompt: 'Which channel do you want to automate, and what repeated daily task consumes the team\'s time?',
    },
    ar: {
      title: 'روبوتات الدردشة والأتمتة',
      tags: 'رد أسرع · متابعة أذكى · مهام أقل',
      heroDesc: 'نبني روبوتات دردشة وتدفقات أتمتة للرد، التصنيف، التذكير، المتابعة، وتجميع البيانات، مع ربطها بعمل الفريق بدل أن تكون ردودًا آلية منعزلة.',
      snapshot: [
        'مناسبة للأعمال التي تستقبل أسئلة متكررة أو تحتاج متابعة كثيرة أو تصنيف طلبات بسرعة.',
        'نبني Chatbots، رسائل متابعة، تنبيهات، تدفقات عمل، وربط CRM أو Dashboard.',
        'القيمة: وقت رد أقل، ضغط أقل على الفريق، وتجربة أكثر انتظامًا للعميل.',
      ],
      whenNeeded: [
        'العملاء ينتظرون الرد على أسئلة متكررة.',
        'الفريق يكرر نفس الرسائل أو التذكيرات يوميًا.',
        'تحتاج تصنيف العملاء قبل تحويلهم لموظف مناسب.',
        'تريد ربط الرد والمتابعة بالنظام بدل الاعتماد على المحادثات فقط.',
      ],
      whatWeBuild: [
        'سيناريوهات رد مبنية على نية العميل.',
        'تجميع بيانات العميل أو الطلب بطريقة خفيفة.',
        'تصنيف الاستفسارات حسب الخدمة أو المرحلة.',
        'تذكيرات ومتابعات تلقائية.',
        'تنبيهات للفريق عند وجود فرصة مهمة.',
        'ربط بالواتساب، الموقع، CRM، أو لوحة متابعة حسب الإمكانية.',
      ],
      howWeExecute: [
        'لا نضيف Bot للاستعراض؛ نحدده عندما يقلل ضغطًا أو يسرع خدمة.',
        'نكتب تدفقات المحادثة بطريقة مفهومة لا تشعر العميل بالجمود.',
        'نترك مساحة لتدخل الفريق في اللحظات المهمة.',
        'نربط الأتمتة بالبيانات حتى يمكن قياس أثرها.',
      ],
      deliverables: [
        'Chatbot أو تدفق أتمتة حسب القناة.',
        'سيناريوهات محادثة ورسائل متابعة.',
        'قواعد تصنيف أو تحويل للعميل.',
        'ربط بالنماذج أو CRM أو الفريق عند الحاجة.',
        'تقارير عن الاستخدام أو الطلبات حسب النطاق.',
      ],
      relatedSolutions: [
        { title: 'تكلفة أقل وضغط أقل', slug: 'automation-layers' },
        { title: 'متابعة تمنع ضياع الفرص', slug: 'follow-up-systems' },
        { title: 'رؤية ذكية تكشف الفرص مبكرًا', slug: 'ai-practical-decisions' },
      ],
      faqs: [
        { question: 'هل الشات بوت يستبدل فريق خدمة العملاء؟', answer: 'لا بالضرورة. غالبًا يساعد في الأسئلة المتكررة والتصنيف والمتابعة، بينما يتدخل الفريق في الحالات المهمة.' },
        { question: 'هل يمكن استخدامه على واتساب؟', answer: 'نعم حسب مزود الخدمة والإعدادات المتاحة، ويمكن ربطه بعمليات متابعة أو CRM عند الحاجة.' },
        { question: 'هل كل أتمتة تحتاج AI؟', answer: 'لا. بعض التدفقات تحتاج قواعد واضحة فقط، ونستخدم AI عندما يكون الفهم أو التلخيص أو التصنيف الذكي مفيدًا.' },
      ],
      needsLabel: 'ما الذي تريد أتمتته أو تسريع الرد عليه؟',
      needsOptions: ['الرد على الأسئلة المتكررة', 'استقبال العملاء المحتملين', 'تأهيل العملاء قبل التواصل', 'إرسال تذكيرات', 'متابعة العملاء تلقائيًا', 'تصنيف الطلبات', 'تلخيص المحادثات', 'ربط واتساب أو الموقع بالنظام', 'تقليل المهام اليدوية المتكررة', 'غير متأكد بعد'],
      stageLabel: 'القناة الأساسية',
      stageOptions: ['موقع', 'واتساب', 'CRM', 'بريد إلكتروني', 'نظام داخلي', 'أكثر من قناة'],
      freeTextPrompt: 'ما القناة التي تريد الأتمتة عليها؟ وما أكثر مهمة تتكرر يوميًا وتستهلك وقت الفريق؟',
    },
  },
  'growth-marketing-systems': {
    en: {
      title: 'Marketing & Growth Strategy',
      tags: 'Research · Marketing Plans · Growth Campaigns',
      heroDesc: 'We help build clearer marketing direction through market research, audience understanding, messaging, content planning, advertising campaigns, and a follow-up path that can be measured.',
      snapshot: [
        'Best for businesses that want better opportunities, not just more visibility.',
        'We build research, messaging, content direction, campaign paths, and conversion measurement.',
        'Business value: clearer targeting, decision-focused content, and campaigns connected to follow-up and outcomes.',
      ],
      whenNeeded: [
        'You spend on marketing but cannot see which efforts create real opportunities.',
        'Content exists but does not explain the value or push customers to act.',
        'You need a clear plan before campaigns or service launch.',
        'You want marketing connected with website, CRM, and tracking instead of isolated activity.',
      ],
      whatWeBuild: [
        'Market and audience research.',
        'Core messaging and value proposition.',
        'Content direction based on customer journey.',
        'Landing page or campaign funnel recommendations.',
        'Advertising campaign planning or improvement.',
        'Result tracking connected to requests and follow-up when needed.',
      ],
      howWeExecute: [
        'We treat marketing as a growth path, not a posting calendar only.',
        'We connect messaging to the real offer and customer experience.',
        'We care about what happens after the customer arrives, not just getting traffic.',
        'We use data to improve direction instead of relying on impressions.',
      ],
      deliverables: [
        'Market and audience research summary.',
        'Marketing messaging and content direction.',
        'Growth or campaign plan depending on stage.',
        'Landing page or funnel direction when needed.',
        'Measurement indicators and follow-up connection.',
      ],
      relatedSolutions: [
        { title: 'Visits that turn into clear requests', slug: 'digital-experiences' },
        { title: 'Follow-up that prevents lost opportunities', slug: 'follow-up-systems' },
        { title: 'Smart visibility that reveals opportunities early', slug: 'ai-practical-decisions' },
      ],
      faqs: [
        { question: 'Do you manage daily social media posting?', answer: 'Our core focus is not posting alone. We focus on research, planning, messaging, campaigns, and connecting marketing with conversion and follow-up.' },
        { question: 'Does this include advertising campaigns?', answer: 'It can include planning, execution, or improvement depending on scope, but campaigns are always tied to pages, tracking, and follow-up.' },
        { question: 'Do I need a website before marketing?', answer: 'Not always, but a clear landing page or request path makes marketing measurable and reduces lost opportunities.' },
      ],
      needsLabel: 'What do you need now in marketing and growth?',
      needsOptions: ['Market research', 'Target audience analysis', 'Marketing plan', 'Messaging and content direction', 'Advertising campaign planning', 'Landing page improvement', 'Connecting marketing with CRM and follow-up', 'Measurement and performance analysis', 'Launching a new service or product', 'Not sure yet'],
      stageLabel: 'Do you have existing marketing channels or campaigns?',
      stageOptions: ['Yes', 'No', 'Starting from zero', 'We have channels but they are not organized'],
      freeTextPrompt: 'Describe your current marketing situation and the closest goal: more requests, better lead quality, launching a service, or organizing growth.',
    },
    ar: {
      title: 'استراتيجيات التسويق والنمو',
      tags: 'أبحاث · خطط تسويقية · حملات نمو',
      heroDesc: 'نساعدك على بناء اتجاه تسويقي أوضح من خلال أبحاث السوق، فهم الجمهور، صياغة الرسائل، تخطيط المحتوى، الحملات الإعلانية، وربط التسويق بمسار متابعة يمكن قياسه.',
      snapshot: [
        'مناسبة للأعمال التي تريد جذب فرص أفضل وليس مجرد ظهور أكثر.',
        'نبني بحثًا، رسائل، خطة محتوى، مسارات حملات، وقياسًا مرتبطًا بالتحويل.',
        'القيمة: وضوح في الاستهداف، محتوى أقرب للقرار، وحملات مرتبطة بمتابعة ونتائج.',
      ],
      whenNeeded: [
        'تنفق على التسويق لكن لا تعرف ما الذي يحقق فرصًا حقيقية.',
        'المحتوى موجود لكنه لا يشرح القيمة ولا يدفع للطلب.',
        'تحتاج خطة واضحة قبل الحملات أو إطلاق خدمة جديدة.',
        'تريد ربط التسويق بالموقع وCRM والتتبع بدل أن يبقى منفصلًا.',
      ],
      whatWeBuild: [
        'بحث سوق ومراجعة الجمهور المستهدف.',
        'تحديد الرسائل الأساسية وعرض القيمة.',
        'خطة محتوى مرتبطة برحلة العميل.',
        'تصور صفحات هبوط أو نماذج للحملات.',
        'إعداد أو تحسين مسارات الحملات الإعلانية.',
        'تتبع النتائج وربطها بالطلبات والمتابعة عند الحاجة.',
      ],
      howWeExecute: [
        'نتعامل مع التسويق كمسار نمو لا كمنشورات فقط.',
        'نربط الرسائل بالعرض الفعلي وتجربة العميل.',
        'نهتم بما يحدث بعد وصول العميل، لا بمجرد الحصول على زيارة.',
        'نستخدم البيانات لتحسين الخطة بدل الاعتماد على الانطباع.',
      ],
      deliverables: [
        'بحث مختصر للسوق والجمهور.',
        'رسائل تسويقية واتجاه محتوى.',
        'خطة حملات أو نمو حسب المرحلة.',
        'تصور Landing Pages أو Funnel عند الحاجة.',
        'مؤشرات قياس وربط بالمتابعة.',
      ],
      relatedSolutions: [
        { title: 'زيارات تتحول إلى طلبات', slug: 'digital-experiences' },
        { title: 'متابعة تمنع ضياع الفرص', slug: 'follow-up-systems' },
        { title: 'رؤية ذكية تكشف الفرص مبكرًا', slug: 'ai-practical-decisions' },
      ],
      faqs: [
        { question: 'هل تقدمون إدارة سوشيال ميديا يومية؟', answer: 'تركيزنا الأساسي ليس نشر بوستات فقط، بل البحث والخطة والرسائل والحملات وربط التسويق بالتحويل والمتابعة.' },
        { question: 'هل تشمل الخدمة الإعلانات؟', answer: 'يمكن أن تشمل تخطيط الحملات أو تنفيذها أو تحسينها حسب نطاق المشروع، لكننا نربطها دائمًا بالصفحات والتتبع والمتابعة.' },
        { question: 'هل أحتاج موقعًا قبل التسويق؟', answer: 'ليس دائمًا، لكن وجود صفحة هبوط أو مسار طلب واضح يجعل التسويق قابلًا للقياس ويقلل ضياع الفرص.' },
      ],
      needsLabel: 'ما الذي تحتاجه في التسويق والنمو الآن؟',
      needsOptions: ['أبحاث سوق', 'تحليل الجمهور المستهدف', 'خطة تسويقية', 'تطوير الرسائل والمحتوى', 'تخطيط حملات إعلانية', 'تحسين صفحات الهبوط', 'ربط التسويق بالمتابعة وCRM', 'قياس وتحليل النتائج', 'إطلاق خدمة أو منتج جديد', 'غير متأكد بعد'],
      stageLabel: 'هل لديك حملات أو قنوات تسويق قائمة؟',
      stageOptions: ['نعم', 'لا', 'نبدأ من الصفر', 'لدينا قنوات لكنها غير منظمة'],
      freeTextPrompt: 'صف لنا وضع التسويق الحالي، وما الهدف الأقرب: زيادة الطلبات، تحسين جودة العملاء، إطلاق خدمة، أو تنظيم النمو؟',
    },
  },
};

function RelatedCaseStudies({ solutionSlugs, ar }: { solutionSlugs: string[]; ar: boolean }) {
  const [studies, setStudies] = useState<CaseStudy[]>([]);

  useEffect(() => {
    getPublishedCaseStudies()
      .then((all) => setStudies(all.filter((s) => solutionSlugs.includes(s.solution_slug)).slice(0, 2)))
      .catch(() => setStudies([]));
  }, [solutionSlugs]);

  if (studies.length === 0) return null;

  return (
    <ScrollReveal delay={0.34}>
      <h2 className="text-xl font-bold text-[#101418] mb-4">{ar ? 'دراسات حالة مرتبطة' : 'Related case studies'}</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {studies.map((s) => (
          <Link
            key={s.slug}
            to={`/case-studies/${s.slug}`}
            className="group block border border-[#E5E5E5] rounded-2xl p-5 bg-[#FAFAFA] hover:border-[#6D5DF6] hover:shadow-md active:scale-[0.98] active:border-[#6D5DF6] transition-all duration-200"
          >
            <span className="text-[10px] px-2.5 py-1 bg-[#EEEAFE] text-[#6D5DF6] rounded-full font-semibold mb-3 inline-block">
              {ar ? s.sector_ar : s.sector_en}
            </span>
            <h3 className="text-sm font-bold text-[#101418] mb-2">{ar ? s.title_ar : s.title_en}</h3>
            <span className="inline-flex items-center gap-1.5 text-xs text-[#6D5DF6] font-medium group-hover:gap-2.5 transition-all">
              {ar ? 'عرض دراسة الحالة' : 'View case study'} <ArrowRight size={12} />
            </span>
          </Link>
        ))}
      </div>
    </ScrollReveal>
  );
}

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const ar = language === 'ar';
  const data = serviceData[slug || ''];
  const d = data ? (ar ? data.ar : data.en) : null;

  if (!d) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#101418] mb-4">{ar ? 'الخدمة غير موجودة' : 'Service not found'}</h1>
          <Link to="/services" className="text-[#6D5DF6] hover:underline">{ar ? 'عرض جميع الخدمات' : 'View all services'}</Link>
        </div>
      </div>
    );
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <SEO
        title={`${d.title} | ENSDIM Services`}
        description={d.heroDesc}
        keywords={`${d.title} Egypt, ${d.title} Saudi Arabia, ${d.title} UAE, ENSDIM services`}
        canonical={`/services/${slug}`}
        lang={ar ? 'ar' : 'en'}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: d.title,
          description: d.heroDesc,
          provider: { '@type': 'Organization', name: 'ENSDIM', url: 'https://ensdim.com' },
          areaServed: ['Egypt', 'Saudi Arabia', 'United Arab Emirates'],
          url: `https://ensdim.com/services/${slug}`,
        }}
      />
      <section className="pt-24 pb-14 sm:pt-32 sm:pb-20 relative overflow-hidden bg-[#0f0d19] text-white">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 30% 50%, rgba(59,42,120,0.22) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-6 text-xs text-white/50 flex items-center gap-1">
            <Link to="/" className="hover:text-white/80 transition-colors">{ar ? 'الرئيسية' : 'Home'}</Link>
            <span className="opacity-40">/</span>
            <Link to="/services" className="hover:text-white/80 transition-colors">{ar ? 'الخدمات' : 'Services'}</Link>
            <span className="opacity-40">/</span>
            <span className="text-white/70 font-medium">{d.title}</span>
          </div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5 uppercase tracking-wider bg-[#6D5DF6]/15 border border-[#6D5DF6]/20 text-[#EEEAFE]/80">
            {ar ? 'خدمات إنسديم' : 'ENSDIM Services'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight text-white">{d.title}</h1>
          <p className="text-base sm:text-lg max-w-2xl leading-relaxed mb-6 text-[#EEEAFE]/75">{d.heroDesc}</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {d.tags.split('·').map((tag: string, i: number) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-[#EEEAFE]/70"
              >
                <span className="w-1 h-1 rounded-full bg-[#6D5DF6]" />
                {tag.trim()}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => scrollTo('service-request-form')}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
            >
              {ar ? 'اكتشف أنسب طريقة لتنفيذ هذه الخدمة' : 'Find the Best Way to Implement This Service'} <ArrowRight size={15} />
            </button>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-white/20 text-white/80 hover:border-white/40 hover:text-white active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
            >
              {ar ? 'عرض كل الخدمات' : 'View All Services'}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">

          <ScrollReveal>
            <h2 className="text-xl font-bold text-[#101418] mb-4">{ar ? 'نظرة سريعة على الخدمة' : 'Service Snapshot'}</h2>
            <ul className="space-y-2.5">
              {d.snapshot.map((s, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#4F555E]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6D5DF6] mt-1.5 flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <h2 className="text-xl font-bold text-[#101418] mb-4">{ar ? 'متى تحتاج هذه الخدمة؟' : 'When This Service Becomes Important'}</h2>
            <ul className="space-y-2.5">
              {d.whenNeeded.map((w, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#4F555E]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D63A3A] mt-1.5 flex-shrink-0" />
                  {w}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="text-xl font-bold text-[#101418] mb-5">{ar ? 'ماذا نبني داخل هذه الخدمة؟' : 'What We Build Inside This Service'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {d.whatWeBuild.map((m, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl">
                  <CheckCircle2 size={15} className="text-[#6D5DF6] flex-shrink-0" />
                  <span className="text-sm text-[#101418]">{m}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.14}>
            <h2 className="text-xl font-bold text-[#101418] mb-4">{ar ? 'كيف تنفذها إنسديم؟' : 'How ENSDIM Executes It'}</h2>
            <ul className="space-y-2.5">
              {d.howWeExecute.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#4F555E]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6D5DF6] mt-1.5 flex-shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.18}>
            <h2 className="text-xl font-bold text-[#101418] mb-4">{ar ? 'المخرجات التي تحصل عليها' : 'Deliverables You Receive'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {d.deliverables.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-[#6D5DF6] flex-shrink-0" />
                  <span className="text-sm text-[#101418]">{item}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.22}>
            <h2 className="text-xl font-bold text-[#101418] mb-4">{ar ? 'حلول مرتبطة بهذه الخدمة' : 'Related Solutions'}</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {d.relatedSolutions.map((s, i) => (
                <Link
                  key={i}
                  to={`/solutions/${s.slug}`}
                  className="group flex items-center justify-between gap-3 px-5 py-4 bg-white border border-[#E5E5E5] rounded-xl hover:border-[#6D5DF6] hover:shadow-md active:scale-[0.98] active:border-[#6D5DF6] transition-all duration-200"
                >
                  <span className="text-sm font-semibold text-[#101418]">{s.title}</span>
                  <ArrowRight size={14} className="text-[#6D5DF6] flex-shrink-0 group-hover:translate-x-0.5 group-active:translate-x-0.5 transition-transform" />
                </Link>
              ))}
            </div>
          </ScrollReveal>

          <RelatedCaseStudies solutionSlugs={d.relatedSolutions.map((s) => s.slug)} ar={ar} />

          <ScrollReveal delay={0.3}>
            <div id="client-workspace" className="scroll-mt-24 bg-[#0f0d19] rounded-2xl p-8 text-white">
              <h2 className="text-lg font-bold mb-2">
                {ar ? 'مساحة العميل' : 'Client Workspace'}
              </h2>
              <p className="text-sm text-[#EEEAFE]/75 leading-relaxed mb-5">
                {ar
                  ? 'بعد اعتماد المشروع، يستطيع العميل متابعة تقدم الخدمة، الملفات، الملاحظات، المدفوعات، وطلبات التعديل من مساحة عميل واضحة بدل التشتت في الرسائل.'
                  : 'After project approval, the client can track progress, files, comments, payments, and change requests from a clear client workspace instead of scattered messages.'}
              </p>
              <a
                href="https://app.ensdim.com/login"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6D5DF6] text-white rounded-xl hover:bg-[#5d4de6] transition-colors text-sm font-semibold"
              >
                {ar ? 'دخول مساحة العميل' : 'Client Workspace Login'} <ArrowRight size={14} />
              </a>
            </div>
          </ScrollReveal>

        </div>
      </section>

      <FAQSection
        title={ar ? 'أسئلة شائعة خاصة بالخدمة' : 'Service FAQs'}
        faqs={d.faqs}
      />

      <section id="service-request-form" className="py-16 bg-[#FAFAFA] scroll-mt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <ServiceRequestForm
              needsLabel={d.needsLabel}
              needsOptions={d.needsOptions}
              stageLabel={d.stageLabel}
              stageOptions={d.stageOptions}
              freeTextPrompt={d.freeTextPrompt}
              hiddenFields={{
                source_page: `/services/${slug}`,
                clicked_service: d.title,
                interest_type: 'service',
              }}
            />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
