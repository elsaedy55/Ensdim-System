import { useParams, Link } from 'react-router';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';

interface ProblemContent {
  title: string;
  badge: string;
  intro: string;
  whatHappeningIntro: string;
  whatHappeningPoints: string[];
  whyMatters: string[];
  impactAreas: { area: string; text: string }[];
  keyQuestion: string;
  keyQuestionFollowup: string;
  solution: { title: string; desc: string; slug: string };
  whatWeOfferIntro: string;
  whatWeOfferPoints: string[];
  expectedReturn: string[];
  caseStudy: { title: string; desc: string; slug: string };
  ctaHeading: string;
  ctaBody: string;
  ctaButton: string;
}

const problemData: Record<string, { en: ProblemContent; ar: ProblemContent }> = {
  'leads-get-lost': {
    en: {
      title: 'Customers and opportunities are lost before they turn into sales',
      badge: 'A common problem in service businesses',
      intro: 'The issue may not be a lack of demand. The real problem is that the people who reach you do not move through a clear follow-up journey. A WhatsApp message, a missed call, an unchecked form, or an interested customer who was not followed up with in time can all become marketing cost with no return.',
      whatHappeningIntro: 'Inquiries arrive from WhatsApp, calls, Instagram, website forms, ads, or referrals. Without a clear system, part of the sales pipeline is lost before real selling even starts.',
      whatHappeningPoints: ['A customer asks but is not recorded.', 'A team member replies, but nobody knows what happened next.', 'An interested customer waits for a follow-up that never arrives.', 'A hot opportunity becomes "we will get back to you" and disappears.', 'Management cannot see how many opportunities came in, who handled them, or which ones were lost.'],
      whyMatters: ['Ad spend increases without a real increase in sales.', 'The team replies a lot but without clear outcomes.', 'Interested customers do not turn into bookings or requests.', 'The business depends too much on employee memory.', 'It is difficult to know the source of each opportunity.', 'Opportunities that could have been closed are lost due to unstructured communication.'],
      impactAreas: [
        { area: 'Sales', text: 'Opportunities do not move through a clear path from first contact to closing.' },
        { area: 'Marketing', text: 'It becomes hard to know which channel brings real opportunities and which one wastes budget.' },
        { area: 'Customer service', text: 'Customers may repeat the same information because their context is not visible to the team.' },
        { area: 'Management', text: 'There is no clear view of new leads, opportunity stages, or conversion rates.' },
        { area: 'Growth', text: 'As the number of potential customers grows, the mess grows instead of sales.' },
      ],
      keyQuestion: 'Do you have a system that shows every opportunity from first contact to purchase decision?',
      keyQuestionFollowup: 'Without it, you are not fully managing sales; part of it is left to memory, speed, and chance.',
      solution: { title: 'Follow-up that prevents lost opportunities', desc: 'A system that gathers leads from different channels into a clear pipeline with organized follow-ups, reminders, lead statuses, and visibility across marketing, sales, and management.', slug: 'follow-up-systems' },
      whatWeOfferIntro: 'Instead of having opportunities scattered across WhatsApp, calls, forms, and employee memory, we help you build a clear follow-up system that connects marketing, sales, and management.',
      whatWeOfferPoints: ['Collect potential customers in one place.', 'Record the source of every opportunity: ad, WhatsApp, website, call, or referral.', 'Define each customer status: new, replied, needs follow-up, interested, closed, or lost.', 'Automatic follow-up reminders so opportunities are not forgotten.', 'Structured first response when needed.', 'Alerts for opportunities that have not been followed up.', 'Classify customers by readiness or level of interest.', 'A management view for opportunities and conversion rates.', 'Connect the system with your website, forms, WhatsApp, or ad campaigns.', 'Reports that show which channels bring real customers and which ones consume budget.'],
      expectedReturn: ['Fewer lost opportunities.', 'Faster response and follow-up.', 'Higher conversion from inquiry to booking or request.', 'Clearer understanding of the best customer sources.', 'Less dependence on memory and manual follow-up.', 'Less pressure on the team.', 'A better customer experience from the first touchpoint.', 'Clearer sales visibility for management.', 'Higher return from marketing spend.'],
      caseStudy: { title: 'From scattered opportunities to a clear sales pipeline', desc: 'How we helped a Saudi contracting and real estate development company organize lead intake, track each opportunity, and connect the website, replies, dashboard, sales team, and management.', slug: 'real-estate-sales-crm-saudi' },
      ctaHeading: 'Are you losing opportunities before they reach the sales stage?',
      ctaBody: 'Tell us how you receive customers now, who follows up with them, and how you track each opportunity. We will help you identify the closest path to clearer, higher-converting follow-up.',
      ctaButton: 'Book a consultation',
    },
    ar: {
      title: 'العملاء والفرص تضيع قبل ما تتحول لمبيعات',
      badge: 'مشكلة شائعة في الأعمال الخدمية',
      intro: 'قد تكون المشكلة ليست في قلة الطلبات، بل في أن العملاء الذين يصلون إليك لا يمرّون برحلة متابعة واضحة. رسالة على واتساب، مكالمة لم تُسجل، نموذج لم يُراجع، أو عميل مهتم لم يتابعه أحد في الوقت المناسب — وكل فرصة ضائعة تعني تكلفة تسويق بلا عائد.',
      whatHappeningIntro: 'تصل الاستفسارات من أكثر من قناة: واتساب، مكالمات، إنستغرام، نماذج الموقع، إعلانات، أو ترشيحات مباشرة. لكن بدون نظام واضح، يبدأ جزء من المبيعات في الضياع قبل أن يبدأ البيع الحقيقي.',
      whatHappeningPoints: ['العميل يسأل ولا يتم تسجيله.', 'موظف يرد ولا أحد يعرف ماذا حدث بعد ذلك.', 'عميل مهتم ينتظر متابعة ولا تصله.', 'فرصة ساخنة تتحول إلى "هنرجعلك" ثم تختفي.', 'الإدارة لا تعرف كم فرصة دخلت، من تابعها، ومن ضاعت.'],
      whyMatters: ['تكلفة إعلانات تزيد بدون زيادة حقيقية في المبيعات.', 'فريق يرد كثيرًا لكن بدون نتائج واضحة.', 'عملاء مهتمون لا يتحولون إلى حجوزات أو طلبات.', 'اعتماد زائد على ذاكرة الموظفين.', 'صعوبة معرفة مصدر كل فرصة.', 'فقدان فرص كان يمكن إغلاقها بتواصل منظم.'],
      impactAreas: [
        { area: 'المبيعات', text: 'الفرص لا تتحرك داخل مسار واضح من أول تواصل حتى الإغلاق.' },
        { area: 'التسويق', text: 'يصعب معرفة أي حملة أو قناة تجلب فرصًا حقيقية، وأيها يستهلك الميزانية فقط.' },
        { area: 'خدمة العملاء', text: 'العميل قد يكرر نفس الكلام أكثر من مرة لأن بياناته ومحادثته ليست واضحة للفريق.' },
        { area: 'الإدارة', text: 'لا توجد رؤية واضحة لعدد العملاء الجدد، حالة كل فرصة، ونسبة التحويل من الاهتمام إلى البيع.' },
        { area: 'النمو', text: 'كلما زاد عدد العملاء المحتملين، زادت الفوضى بدل أن تزيد المبيعات.' },
      ],
      keyQuestion: 'هل لديك نظام يوضح لك كل فرصة من لحظة دخولها حتى قرار الشراء؟',
      keyQuestionFollowup: 'إذا لم يكن لديك ذلك، فأنت لا تدير المبيعات بالكامل؛ أنت تترك جزءًا منها للذاكرة، السرعة، والصدفة.',
      solution: { title: 'متابعة تمنع ضياع الفرص', desc: 'نظام يساعدك على جمع العملاء المحتملين من القنوات المختلفة داخل مسار واضح، مع متابعة منظمة، تذكيرات، حالات لكل عميل، وربط بين التسويق والمبيعات والإدارة.', slug: 'follow-up-systems' },
      whatWeOfferIntro: 'بدل ما تظل الفرص موزعة بين واتساب، مكالمات، نماذج، وذاكرة الموظفين، نساعدك على بناء نظام متابعة واضح يربط بين التسويق، المبيعات، والإدارة.',
      whatWeOfferPoints: ['جمع العملاء المحتملين في مكان واحد.', 'تسجيل مصدر كل فرصة: إعلان، واتساب، موقع، مكالمة، أو ترشيح.', 'تحديد حالة كل عميل: جديد، تم الرد، يحتاج متابعة، مهتم، تم الإغلاق، أو ضاع.', 'تذكيرات تلقائية للمتابعة حتى لا تُنسى الفرص.', 'رد أولي منظم للعميل عند الحاجة.', 'تنبيهات للفرص التي لم يتابعها الفريق.', 'تصنيف العملاء حسب الجاهزية أو درجة الاهتمام.', 'لوحة متابعة للإدارة لمعرفة عدد الفرص ونسبة التحويل.', 'ربط النظام مع الموقع، النماذج، واتساب، أو الحملات الإعلانية.', 'تقارير تساعدك تعرف أي قناة تجلب عملاء حقيقيين وأي قناة تستهلك الميزانية.'],
      expectedReturn: ['تقليل فرص العملاء الضائعة.', 'تحسين سرعة الرد والمتابعة.', 'زيادة التحويل من الاستفسار إلى الحجز أو الطلب.', 'فهم أوضح لمصادر العملاء الأفضل.', 'تقليل الاعتماد على الذاكرة والمتابعة اليدوية.', 'تخفيف الضغط على الفريق.', 'تحسين تجربة العميل من أول تواصل.', 'رؤية أوضح للإدارة حول أداء المبيعات.', 'زيادة العائد من ميزانية التسويق.'],
      caseStudy: { title: 'من فرص مشتتة إلى مسار مبيعات واضح', desc: 'كيف ساعدنا شركة في قطاع المقاولات والتطوير العقاري في السعودية على تنظيم استقبال العملاء المحتملين، متابعة كل فرصة، وربط الموقع والردود ولوحة التحكم بفريق المبيعات والإدارة.', slug: 'real-estate-sales-crm-saudi' },
      ctaHeading: 'هل تضيع منك فرص قبل أن تصل لمرحلة البيع؟',
      ctaBody: 'شاركنا كيف تستقبل العملاء الآن، ومن يتابعهم، وكيف تعرف حالة كل فرصة — وسنساعدك على تحديد أقرب مسار لبناء متابعة أوضح وأكثر قابلية للتحويل.',
      ctaButton: 'احجز استشارة لنشاطك',
    },
  },
  'visitors-not-converting': {
    en: {
      title: 'Visitors are not turning into clear requests',
      badge: 'A conversion and customer journey problem',
      intro: 'Website visits and ad views do not automatically mean requests. The problem starts when people see your business but cannot find a clear path to ask, book, request, or leave their information.',
      whatHappeningIntro: 'You may have a website, social pages, or campaigns, but visitors enter and leave without a clear next step. The message is unclear, the form is generic, the CTA is weak, or visits are not connected to follow-up.',
      whatHappeningPoints: ['Visitors leave without submitting details.', 'Campaigns generate attention but few requests.', 'Customers do not quickly understand what you offer or why to choose you.', 'Forms are too generic to support follow-up.', 'There is no connection between the visit and the sales team.'],
      whyMatters: ['Visitors need to understand value quickly.', 'Every extra step reduces request probability.', 'An unclear next step causes delay.', 'Without tracking, management cannot know what works.', 'A weak website wastes part of the marketing spend.'],
      impactAreas: [
        { area: 'Marketing', text: 'Traffic grows but conversion does not.' },
        { area: 'Sales', text: 'The team receives incomplete or low-quality information.' },
        { area: 'Customer experience', text: 'The path from interest to request is not easy.' },
        { area: 'Management', text: 'It is hard to measure page or campaign quality.' },
        { area: 'ROI', text: 'Customer acquisition cost rises because visits do not convert.' },
      ],
      keyQuestion: 'Does every visit to your website have a clear chance to become a request?',
      keyQuestionFollowup: 'If visitors cannot understand the next step in seconds, you are not just losing a visit; you are losing purchase intent.',
      solution: { title: 'Visits that turn into requests', desc: 'We build pages and conversion journeys that help visitors understand value quickly, take a clear step, and leave information that can be followed up inside a clear system.', slug: 'digital-experiences' },
      whatWeOfferIntro: 'We help turn your website or landing page from a static profile into a practical path for requests, qualification, and follow-up.',
      whatWeOfferPoints: ['Clear message based on sector and customer need.', 'High-converting landing page or website section.', 'Customized request forms by service.', 'Clear calls to action.', 'Connect forms to a follow-up path.', 'Track sources of visits and requests.', 'Improve the mobile experience.', 'Identify points of hesitation.', 'Connect pages with campaigns and analytics.'],
      expectedReturn: ['More requests from the same traffic.', 'Less wasted ad spend.', 'Better lead information quality.', 'Easier sales follow-up.', 'Clearer visibility into best channels.', 'A smoother and more trustworthy customer experience.'],
      caseStudy: { title: 'From digital presence to a clear sales path', desc: 'How we helped a Saudi contracting and real estate development company turn its website and pages into a request-entry point connected to leads, sales, and management follow-up.', slug: 'real-estate-sales-crm-saudi' },
      ctaHeading: 'Does your website explain only, or does it convert visitors into requests?',
      ctaBody: 'Share the current customer journey from visit to request, and we will identify where friction can be reduced and conversion improved.',
      ctaButton: 'Book a consultation',
    },
    ar: {
      title: 'الزوار لا يتحولون إلى طلبات واضحة',
      badge: 'مشكلة تحويل وتجربة عميل',
      intro: 'وجود زوار على الموقع أو مشاهدات للإعلانات لا يعني وجود طلبات. المشكلة تبدأ عندما يرى العميل نشاطك، لكنه لا يجد رحلة واضحة تجعله يسأل، يحجز، يطلب، أو يترك بياناته بسهولة.',
      whatHappeningIntro: 'قد يكون لديك موقع، صفحات سوشيال، أو حملات إعلانية، لكن العميل يدخل ثم يخرج بدون خطوة واضحة. لا توجد رسالة مقنعة، لا نموذج مناسب، لا زر واضح، ولا ربط بين الزيارة والمتابعة.',
      whatHappeningPoints: ['زوار يدخلون الموقع ولا يتركون بيانات.', 'حملات تجلب اهتمامًا لكن الطلبات قليلة.', 'العميل لا يفهم بسرعة ماذا تقدمون ولماذا يختاركم.', 'النموذج عام ولا يجمع بيانات كافية للمتابعة.', 'لا يوجد ربط واضح بين الزيارة وفريق المبيعات.'],
      whyMatters: ['الزائر يحتاج أن يفهم القيمة بسرعة.', 'كل خطوة زائدة تقلل احتمالية الطلب.', 'عدم وضوح الدعوة التالية يجعل العميل يؤجل القرار.', 'غياب التتبع يجعل الإدارة لا تعرف ما الذي يعمل.', 'الموقع الضعيف يهدر جزءًا من الإنفاق التسويقي.'],
      impactAreas: [
        { area: 'التسويق', text: 'الزيارات تزيد لكن التحويل لا يتحسن.' },
        { area: 'المبيعات', text: 'الفريق يستقبل بيانات ناقصة أو غير مؤهلة.' },
        { area: 'تجربة العميل', text: 'العميل لا يجد مسارًا سهلًا من الاهتمام إلى الطلب.' },
        { area: 'الإدارة', text: 'يصعب قياس جودة الموقع أو الحملة.' },
        { area: 'العائد', text: 'تزيد تكلفة الحصول على العميل لأن جزءًا من الزيارات لا يتحول.' },
      ],
      keyQuestion: 'هل كل زيارة لموقعك لديها فرصة واضحة للتحول إلى طلب؟',
      keyQuestionFollowup: 'إذا كان الزائر لا يعرف الخطوة التالية خلال ثوانٍ، فأنت لا تخسر زيارة فقط؛ أنت تخسر نية شراء محتملة.',
      solution: { title: 'زيارات تتحول إلى طلبات', desc: 'نبني صفحات وتجارب تحويل تساعد الزائر على فهم القيمة بسرعة، اتخاذ خطوة واضحة، وترك بيانات يمكن متابعتها داخل نظام واضح.', slug: 'digital-experiences' },
      whatWeOfferIntro: 'نساعدك على تحويل الموقع أو صفحة الهبوط من واجهة تعريفية إلى مسار عملي لجمع الطلبات وتأهيل العملاء وربطهم بالفريق.',
      whatWeOfferPoints: ['صياغة رسالة واضحة حسب القطاع والعميل.', 'تصميم صفحة عالية التحويل.', 'نماذج طلب مخصصة حسب الخدمة.', 'أزرار دعوة لاتخاذ إجراء واضحة.', 'ربط النماذج بمسار متابعة.', 'تتبع مصدر الزيارات والطلبات.', 'تحسين تجربة الموبايل.', 'اختبار نقاط التردد داخل الصفحة.', 'ربط الصفحة بالحملات الإعلانية والتحليلات.'],
      expectedReturn: ['زيادة الطلبات من نفس حجم الزيارات.', 'تقليل هدر ميزانية الإعلانات.', 'تحسين جودة بيانات العملاء المحتملين.', 'تسهيل متابعة المبيعات.', 'وضوح أكبر حول القنوات الأفضل.', 'تجربة عميل أكثر ثقة وسهولة.'],
      caseStudy: { title: 'من ظهور رقمي إلى مسار مبيعات واضح', desc: 'كيف ساعدنا شركة في قطاع المقاولات والتطوير العقاري في السعودية على تحويل الموقع والصفحات إلى نقطة دخول للطلبات، مع ربط العملاء المحتملين بفريق المبيعات ولوحة المتابعة.', slug: 'real-estate-sales-crm-saudi' },
      ctaHeading: 'هل موقعك يشرح فقط أم يحوّل الزوار إلى طلبات؟',
      ctaBody: 'أرسل لنا شكل رحلة العميل الحالية من أول زيارة حتى الطلب، وسنقترح أين يمكن تقليل التردد وزيادة التحويل.',
      ctaButton: 'احجز استشارة لنشاطك',
    },
  },
  'repeated-work': {
    en: {
      title: 'Manual operations drain the team and increase costs',
      badge: 'A cost and efficiency problem',
      intro: 'Every repeated manual task consumes team time and adds hidden cost. Over time, growth starts to mean more hiring, more pressure, and more mistakes instead of better efficiency.',
      whatHappeningIntro: 'Many tasks are done the same way every day: entering data, following up messages, reminding customers, moving information between tools, preparing reports, or checking statuses. These tasks look simple, but repetition makes them expensive.',
      whatHappeningPoints: ['Employees repeat the same tasks every day.', 'Information moves manually between tools.', 'Mistakes happen because of copying or forgetting.', 'Management needs more staff as pressure increases.', 'Team time goes into operations instead of customer service or sales.'],
      whyMatters: ['Manual tasks grow as the business grows.', 'The cost is often hidden inside wasted time.', 'Small errors accumulate and affect the customer.', 'Repetitive work drains team energy and productivity.', 'Without automation, growth becomes slower and more expensive.'],
      impactAreas: [
        { area: 'Team', text: 'Too much time goes into tasks that could be organized or automated.' },
        { area: 'Cost', text: 'More work often means more people instead of better systems.' },
        { area: 'Quality', text: 'Manual errors affect data accuracy and customer experience.' },
        { area: 'Management', text: 'Daily checking and follow-up increase.' },
        { area: 'Growth', text: 'The business grows but efficiency does not improve at the same speed.' },
      ],
      keyQuestion: 'How many hours does your team spend weekly on repeated tasks?',
      keyQuestionFollowup: 'If you do not measure it, you may have a hidden operational cost affecting profit without appearing directly.',
      solution: { title: 'Lower cost and less pressure', desc: 'We help identify repeated tasks, organize their workflow, and automate what should be automated so the team works with better efficiency and less unnecessary pressure.', slug: 'automation-layers' },
      whatWeOfferIntro: 'The goal is not to automate everything. The goal is to choose the points that waste time or create errors, then make them clearer and more efficient.',
      whatWeOfferPoints: ['Analyze repeated operational tasks.', 'Identify points of waste and pressure.', 'Build internal workflows.', 'Automate reminders and alerts.', 'Connect data between tools instead of manual copying.', 'Clear data-entry forms.', 'Automatic reports instead of manual collection.', 'Task or status-based notifications.', 'A dashboard for recurring work.'],
      expectedReturn: ['Less time wasted on repeated tasks.', 'Less pressure on the team.', 'Fewer manual errors.', 'Faster execution.', 'Lower need for early extra hiring.', 'Better customer experience through organized operations.'],
      caseStudy: { title: 'Bustan Amari: Turning 6,000+ contracts into a clearer operating system', desc: 'How we helped a Kuwait-based garden and palm maintenance company organize contracts, supervisors, workers, visits, customers, and payments inside one system instead of paper and Excel.', slug: 'bustan-amari-operations-system' },
      ctaHeading: 'Does manual operation consume your team’s time?',
      ctaBody: 'Tell us the top three repeated tasks inside your business, and we will identify what can be organized or automated first for a clear return.',
      ctaButton: 'Book a consultation',
    },
    ar: {
      title: 'التشغيل اليدوي يستهلك الفريق ويرفع التكلفة',
      badge: 'مشكلة تكلفة وكفاءة',
      intro: 'كل مهمة يدوية تتكرر تستهلك وقت الفريق وتضيف تكلفة خفية. مع الوقت، يبدأ النمو يعني توظيفًا أكثر، وضغطًا أكبر، وأخطاء أكثر بدل كفاءة أفضل.',
      whatHappeningIntro: 'يتم تنفيذ كثير من الأعمال يوميًا بنفس الطريقة: إدخال بيانات، متابعة رسائل، تذكير عملاء، نقل معلومات من مكان لآخر، إعداد تقارير، أو مراجعة حالات. هذه الأعمال قد تبدو بسيطة، لكنها تصبح مكلفة مع التكرار.',
      whatHappeningPoints: ['الموظفون يكررون نفس المهام يوميًا.', 'المعلومات تنتقل يدويًا بين أدوات مختلفة.', 'الأخطاء تحدث بسبب النسخ أو النسيان.', 'الإدارة تحتاج موظفين أكثر مع زيادة الضغط.', 'وقت الفريق يضيع في التشغيل بدل خدمة العميل أو البيع.'],
      whyMatters: ['المهام اليدوية تكبر مع نمو العمل.', 'التكلفة لا تظهر دائمًا كبند واضح لكنها تظهر في الوقت الضائع.', 'الأخطاء الصغيرة تتراكم وتؤثر على العميل.', 'تكرار العمل يقلل طاقة الفريق وإنتاجيته.', 'غياب الأتمتة يجعل التوسع مكلفًا وبطيئًا.'],
      impactAreas: [
        { area: 'الفريق', text: 'وقت كبير يذهب لمهام كان يمكن تنظيمها أو أتمتتها.' },
        { area: 'التكلفة', text: 'زيادة العمل تعني غالبًا موظفين أكثر بدل نظام أفضل.' },
        { area: 'الجودة', text: 'الأخطاء اليدوية تؤثر على دقة البيانات وتجربة العميل.' },
        { area: 'الإدارة', text: 'تزداد الحاجة للمتابعة والمراجعة اليومية.' },
        { area: 'النمو', text: 'النشاط يكبر لكن الكفاءة لا تتحسن بنفس السرعة.' },
      ],
      keyQuestion: 'كم ساعة يستهلكها فريقك أسبوعيًا في مهام متكررة؟',
      keyQuestionFollowup: 'إذا لم تكن تقيس ذلك، قد تكون لديك تكلفة تشغيلية خفية تؤثر على الربح دون أن تظهر مباشرة.',
      solution: { title: 'تكلفة أقل وضغط أقل', desc: 'نساعدك على تحديد المهام المتكررة، تنظيم تدفقها، وأتمتة ما يمكن أتمتته حتى يعمل الفريق بكفاءة أعلى وبدون ضغط غير ضروري.', slug: 'automation-layers' },
      whatWeOfferIntro: 'ليس الهدف أتمتة كل شيء. الهدف هو اختيار النقاط التي تستهلك وقتًا وتسبب أخطاء، ثم تحويلها إلى خطوات أوضح وأكثر كفاءة.',
      whatWeOfferPoints: ['تحليل المهام المتكررة داخل العمل.', 'تحديد نقاط الهدر والضغط.', 'بناء تدفقات تشغيل داخلية.', 'أتمتة التذكيرات والتنبيهات.', 'ربط البيانات بين الأدوات بدل النقل اليدوي.', 'نماذج إدخال بيانات واضحة.', 'تقارير تلقائية بدل التجميع اليدوي.', 'توزيع مهام أو إشعارات حسب الحالة.', 'لوحة متابعة للأعمال المتكررة.'],
      expectedReturn: ['تقليل الوقت الضائع في الأعمال المتكررة.', 'خفض الضغط على الفريق.', 'تقليل الأخطاء اليدوية.', 'تحسين سرعة التنفيذ.', 'تقليل الحاجة لتوظيف إضافي مبكر.', 'تحسين تجربة العميل بسبب تنظيم التشغيل.'],
      caseStudy: { title: 'بستان أماري: تحويل 6,000+ عقد إلى منظومة إدارة واضحة', desc: 'كيف ساعدنا شركة كويتية في صيانة الحدائق والنخيل على تنظيم العقود، المشرفين، العمالة، الزيارات، العملاء، والمدفوعات داخل نظام واحد بدل الورق والإكسيل.', slug: 'bustan-amari-operations-system' },
      ctaHeading: 'هل يستهلك التشغيل اليدوي وقت فريقك؟',
      ctaBody: 'احكِ لنا أكثر ثلاث مهام تتكرر يوميًا داخل نشاطك، وسنحدد ما يمكن تنظيمه أو أتمتته أولًا لتحقيق عائد واضح.',
      ctaButton: 'احجز استشارة لنشاطك',
    },
  },
  'slow-response': {
    en: {
      title: 'Slow response reduces trust and loses ready-to-buy customers',
      badge: 'A trust and conversion problem',
      intro: 'Interested customers do not wait for long. In many service businesses, a fast and organized first response can be the difference between a new booking and a customer choosing a faster competitor.',
      whatHappeningIntro: 'Messages and calls come in at different times, and the team responds according to daily pressure. Some customers receive quick replies, others wait, and waiting reduces trust and buying intent.',
      whatHappeningPoints: ['WhatsApp messages wait for hours or days.', 'Missed calls are not followed up.', 'Website forms arrive but are not seen in time.', 'Customers ask through several channels and do not get a clear answer.', 'Ready-to-buy customers are not prioritized.'],
      whyMatters: ['First response time shapes the customer’s first impression.', 'Customers compare you with whoever replies faster.', 'Every delay lowers conversion probability.', 'Slow response increases customer acquisition cost.', 'The team jumps between channels instead of following a clear priority.'],
      impactAreas: [
        { area: 'Trust', text: 'Customers connect response speed with service professionalism.' },
        { area: 'Sales', text: 'Ready opportunities may go to a competitor before the conversation begins.' },
        { area: 'Marketing', text: 'Ads generate interest, but slow response burns part of the budget.' },
        { area: 'Team', text: 'Pressure increases as messages pile up.' },
        { area: 'Reputation', text: 'A slow first experience can stop customers from returning.' },
      ],
      keyQuestion: 'What is your average first response time?',
      keyQuestionFollowup: 'If you do not know it, you do not know how many opportunities are lost because of delay.',
      solution: { title: 'Faster response and follow-up without extra pressure on the team', desc: 'We help receive, classify, respond to, and alert the team about inquiries so customers do not wait too long.', slug: 'automation-layers' },
      whatWeOfferIntro: 'The goal is not always replacing the team. Often, the real need is organizing the first response, prioritizing the right customers, and creating a clear path for every inquiry.',
      whatWeOfferPoints: ['Collect inquiries from key channels.', 'Structured first response by request type.', 'Alerts for urgent or ready opportunities.', 'Consistent response templates aligned with your brand tone.', 'Follow-up reminders after the first reply.', 'Customer status after every interaction.', 'Reports on response time and conversion.', 'Optional smart assistant for repetitive questions.'],
      expectedReturn: ['Better first response time.', 'Higher customer trust from first contact.', 'More bookings and requests.', 'Fewer piled-up messages.', 'Better return from ad campaigns.', 'A more professional customer experience.'],
      caseStudy: { title: 'Lemera Clinic: From manual booking to clearer booking and follow-up', desc: 'How we connected the website, smart assistant, and reception dashboard for an aesthetics clinic to record customer data, show available appointments, send reminders, and follow up after visits.', slug: 'lemera-clinic-booking-crm' },
      ctaHeading: 'Do customers reach you then wait?',
      ctaBody: 'Share your communication channels and daily inquiries, and we will suggest a way to organize response and follow-up without adding pressure to the team.',
      ctaButton: 'Book a consultation',
    },
    ar: {
      title: 'الرد المتأخر يقلل الثقة ويخسر عملاء جاهزين',
      badge: 'مشكلة ثقة وتحويل',
      intro: 'العميل المهتم لا ينتظر طويلًا. في كثير من القطاعات الخدمية، أول رد سريع ومنظم قد يكون الفرق بين حجز جديد وفرصة ذهبت لمنافس يرد أسرع.',
      whatHappeningIntro: 'تدخل الرسائل والمكالمات في أوقات مختلفة، والفريق يرد حسب الضغط اليومي. بعض العملاء يحصلون على رد سريع، وآخرون ينتظرون، ومع الانتظار تقل الثقة وتضعف رغبة الشراء.',
      whatHappeningPoints: ['رسائل واتساب تنتظر ساعات أو أيام.', 'مكالمات فائتة لا يتم الرجوع إليها.', 'نموذج موقع يصل ولا يراه الفريق في الوقت المناسب.', 'العميل يسأل أكثر من مكان ولا يجد إجابة واضحة.', 'لا توجد أولوية للعميل الجاهز للحجز أو الشراء.'],
      whyMatters: ['وقت الرد الأول يصنع انطباعًا قويًا عن الشركة.', 'العميل يقارن بينك وبين من يرد أسرع.', 'كل تأخير يقلل احتمالية التحويل.', 'الرد المتأخر يرفع تكلفة الحصول على العميل.', 'الفريق يضيع وقته بين قنوات كثيرة بدل الرد بترتيب واضح.'],
      impactAreas: [
        { area: 'الثقة', text: 'العميل يربط سرعة الرد باحترافية الخدمة.' },
        { area: 'المبيعات', text: 'الفرص الجاهزة قد تذهب لمنافس قبل أن يبدأ الحوار.' },
        { area: 'التسويق', text: 'الإعلانات تجلب اهتمامًا لكن التأخير يحرق جزءًا من الميزانية.' },
        { area: 'الفريق', text: 'الضغط يزيد لأن الرسائل تتراكم بدل أن تدخل مسارًا واضحًا.' },
        { area: 'السمعة', text: 'تجربة أولى بطيئة قد تمنع العميل من الرجوع لاحقًا.' },
      ],
      keyQuestion: 'ما متوسط وقت الرد الأول على العميل داخل شركتك؟',
      keyQuestionFollowup: 'إذا لم تكن تعرفه بدقة، فأنت لا تعرف كم فرصة تخسر بسبب التأخير.',
      solution: { title: 'رد ومتابعة أسرع بدون ضغط إضافي على الفريق', desc: 'نساعدك على استقبال الاستفسارات وتصنيفها والرد الأولي عليها وتنبيه الفريق للفرص الجاهزة، حتى لا يبقى العميل في انتظار طويل.', slug: 'automation-layers' },
      whatWeOfferIntro: 'لا نحتاج دائمًا إلى استبدال الفريق. أحيانًا المطلوب هو تنظيم الرد الأول، ترتيب الأولويات، وتوفير مسار واضح لكل استفسار.',
      whatWeOfferPoints: ['تجميع الاستفسارات من القنوات المهمة.', 'رد أولي منظم حسب نوع الطلب.', 'تنبيه الفريق بالفرص العاجلة أو الجاهزة.', 'قوالب ردود واضحة ومتناسقة مع نبرة الشركة.', 'تذكيرات متابعة بعد الرد الأول.', 'تسجيل حالة العميل بعد كل تواصل.', 'تقارير عن وقت الرد والتحويل.', 'إمكانية إضافة مساعد ذكي عند الحاجة للرد على الأسئلة المتكررة.'],
      expectedReturn: ['تحسين وقت الرد الأول.', 'زيادة ثقة العميل من أول تواصل.', 'رفع فرص الحجز أو الطلب.', 'تقليل الرسائل المتراكمة على الفريق.', 'تحسين الاستفادة من الحملات الإعلانية.', 'تجربة عميل أكثر احترافية.'],
      caseStudy: { title: 'ليميرا: من حجز يدوي إلى تجربة حجز ومتابعة أوضح', desc: 'كيف ربطنا الموقع والمساعد الذكي ولوحة الاستقبال في عيادة تجميل، بحيث يتم تسجيل بيانات العميل، عرض المواعيد، إرسال التذكيرات، ومتابعة الحالة بعد الزيارة.', slug: 'lemera-clinic-booking-crm' },
      ctaHeading: 'هل يصل العميل إليك ثم ينتظر؟',
      ctaBody: 'شاركنا قنوات التواصل وعدد الاستفسارات اليومية، وسنقترح لك طريقة لتنظيم الرد والمتابعة بدون تحميل الفريق ضغطًا إضافيًا.',
      ctaButton: 'احجز استشارة لنشاطك',
    },
  },
  'no-visibility': {
    en: {
      title: 'Management cannot see the full picture in time',
      badge: 'A management and decision-making problem',
      intro: 'Management does not need more numbers only. It needs a clear picture at the right time. When reports arrive late or scattered, decisions are based on feeling instead of facts.',
      whatHappeningIntro: 'Data exists across sales, WhatsApp, website, ads, branches, employees, Excel files, or disconnected systems. But there is no single view that shows what is happening now.',
      whatHappeningPoints: ['Management waits for manual reports.', 'Numbers arrive late or incomplete.', 'Each team has a different version of the truth.', 'Daily or monthly performance is unclear.', 'Drops and opportunities are discovered too late.'],
      whyMatters: ['Late decisions can cost sales and opportunities.', 'Unclear numbers weaken internal accountability.', 'The team spends time preparing reports instead of improving performance.', 'Managers need to ask many people to reach one number.', 'Scattered data prevents seeing the full picture.'],
      impactAreas: [
        { area: 'Management', text: 'Daily decisions depend more on intuition than data.' },
        { area: 'Sales', text: 'It is difficult to understand why results rise or fall.' },
        { area: 'Marketing', text: 'Campaign quality appears after it is too late.' },
        { area: 'Operations', text: 'There is no real-time visibility into pressure or performance.' },
        { area: 'Growth', text: 'Expansion happens without a dashboard that measures results clearly.' },
      ],
      keyQuestion: 'Can you see your daily business numbers in one place?',
      keyQuestionFollowup: 'If you need to ask more than one person to understand today’s status, the issue is not data; it is how data appears to management.',
      solution: { title: 'Faster decisions instead of guesswork', desc: 'We connect your key data into a clear dashboard that helps management see performance, compare results, and detect drops or opportunities in time.', slug: 'visibility-insights' },
      whatWeOfferIntro: 'We help build a concise and useful management view, not long reports. The goal is to know what is happening, why it is happening, and what to do next.',
      whatWeOfferPoints: ['Collect key data sources.', 'Management dashboard.', 'Clear sales, operations, and marketing KPIs.', 'Filters by date, branch, source, team, or service.', 'Daily or weekly summaries.', 'Alerts for drops or important opportunities.', 'Connect data to campaigns, customers, or requests.', 'Optional WhatsApp assistant for asking business numbers.'],
      expectedReturn: ['Faster and clearer decisions.', 'Less manual reporting time.', 'Better daily and monthly performance visibility.', 'Early detection of issues and opportunities.', 'Better follow-up on teams and campaigns.', 'Less dependence on guesswork.'],
      caseStudy: { title: 'From scattered data to a smart dashboard that answers management questions', desc: 'How we transformed sales, orders, and campaign data into an interactive dashboard and a WhatsApp assistant that lets management ask about performance anytime.', slug: 'business-intelligence-dashboard-data-assistant' },
      ctaHeading: 'Do you know what is happening in your business right now?',
      ctaBody: 'Share your current data sources, and we will show how they can become a simpler, faster management view.',
      ctaButton: 'Book a consultation',
    },
    ar: {
      title: 'الإدارة لا ترى الصورة كاملة في الوقت المناسب',
      badge: 'مشكلة إدارة وقرار',
      intro: 'الإدارة لا تحتاج أرقامًا كثيرة فقط؛ تحتاج صورة واضحة في الوقت المناسب. عندما تصل التقارير متأخرة أو متفرقة، يصبح القرار مبنيًا على الإحساس بدل الحقيقة.',
      whatHappeningIntro: 'توجد بيانات في أكثر من مكان: مبيعات، واتساب، موقع، إعلانات، فروع، موظفين، ملفات إكسيل، أو أنظمة منفصلة. لكن لا توجد لوحة واحدة توضح ما يحدث الآن.',
      whatHappeningPoints: ['الإدارة تنتظر تقارير يدوية.', 'الأرقام تصل متأخرة أو ناقصة.', 'كل فريق لديه نسخة مختلفة من الحقيقة.', 'لا يوجد وضوح حول الأداء اليومي أو الشهري.', 'يصعب معرفة سبب الانخفاض أو الفرصة في الوقت المناسب.'],
      whyMatters: ['القرار المتأخر قد يكلف فرصًا ومبيعات.', 'عدم وضوح الأرقام يضعف المحاسبة الداخلية.', 'الفريق يضيع وقتًا في إعداد التقارير بدل تحسين الأداء.', 'المدير يحتاج أن يسأل كثيرًا ليصل لرقم واحد.', 'البيانات المتفرقة تمنع رؤية الصورة الكاملة.'],
      impactAreas: [
        { area: 'الإدارة', text: 'القرارات اليومية تعتمد على الحدس أكثر من البيانات.' },
        { area: 'المبيعات', text: 'يصعب معرفة أسباب الصعود أو الهبوط.' },
        { area: 'التسويق', text: 'لا تظهر جودة الحملات إلا بعد فوات الأوان.' },
        { area: 'التشغيل', text: 'لا توجد رؤية لحظية للضغط أو الأداء.' },
        { area: 'النمو', text: 'التوسع يحدث بدون لوحة تحكم واضحة تقيس النتائج.' },
      ],
      keyQuestion: 'هل ترى أرقام نشاطك اليومية في مكان واحد؟',
      keyQuestionFollowup: 'إذا كنت تحتاج أن تسأل أكثر من شخص لتعرف الوضع الحالي، فالمشكلة ليست في البيانات؛ المشكلة في طريقة ظهورها للإدارة.',
      solution: { title: 'قرار أسرع بدل التخمين', desc: 'نربط بياناتك المهمة داخل لوحة واضحة تساعد الإدارة على رؤية الأداء، مقارنة النتائج، واكتشاف الانخفاض أو الفرص في وقت مناسب.', slug: 'visibility-insights' },
      whatWeOfferIntro: 'نساعدك على بناء رؤية إدارية مختصرة ومفيدة، لا مجرد تقارير طويلة. الهدف أن تعرف ماذا يحدث، ولماذا، وما الخطوة التالية.',
      whatWeOfferPoints: ['تجميع مصادر البيانات المهمة.', 'لوحة تحكم للإدارة.', 'مؤشرات مبيعات وتشغيل وتسويق واضحة.', 'فلاتر حسب التاريخ، الفرع، المصدر، الفريق، أو الخدمة.', 'تقارير يومية أو أسبوعية مختصرة.', 'تنبيهات عند الانخفاض أو الفرص المهمة.', 'ربط البيانات بالحملات أو العملاء أو الطلبات.', 'إمكانية إضافة مساعد واتساب للإجابة عن أسئلة الإدارة حول الأرقام.'],
      expectedReturn: ['قرارات أسرع وأوضح.', 'تقليل وقت إعداد التقارير اليدوية.', 'رؤية أفضل للأداء اليومي والشهري.', 'اكتشاف مبكر للمشاكل والفرص.', 'تحسين متابعة الفرق والحملات.', 'تقليل الاعتماد على التخمين.'],
      caseStudy: { title: 'من بيانات متفرقة إلى داشبورد ذكي يجيب على أسئلة الإدارة', desc: 'كيف حولنا بيانات متفرقة من المبيعات والطلبات والحملات إلى لوحة تحكم تفاعلية ومساعد واتساب يسمح للإدارة بسؤال الأرقام ومتابعة الأداء في أي وقت.', slug: 'business-intelligence-dashboard-data-assistant' },
      ctaHeading: 'هل تعرف ما يحدث في نشاطك الآن؟',
      ctaBody: 'شاركنا مصادر بياناتك الحالية، وسنوضح لك كيف يمكن تحويلها إلى رؤية إدارية أبسط وأسرع.',
      ctaButton: 'احجز استشارة لنشاطك',
    },
  },
  'data-not-helping-decisions': {
    en: {
      title: 'The data exists, but it is not helping you make decisions',
      badge: 'A data and decision problem',
      intro: 'Having data is not enough. You may have sales, orders, customers, campaigns, and branches, but without a clear way to read the data, numbers exist without helping decisions.',
      whatHappeningIntro: 'Data exists in separate systems or files, but it does not turn into easy answers: What is working? What dropped? Which product performs best? Which channel brings higher-quality customers?',
      whatHappeningPoints: ['Many numbers but no clear meaning.', 'Reports are collected manually after the right decision time has passed.', 'It is difficult to compare branches, campaigns, or products.', 'There are no early signals for drops or opportunities.', 'Management asks the team instead of asking the system.'],
      whyMatters: ['Unstructured data does not create decisions.', 'Too many numbers can increase confusion instead of clarity.', 'Disconnected data hides the real reason behind performance changes.', 'Opportunities do not appear early without continuous reading.', 'Smart decisions need clear indicators, not just tables.'],
      impactAreas: [
        { area: 'Management', text: 'Decisions depend on general feeling instead of clear indicators.' },
        { area: 'Marketing', text: 'It is hard to know the most profitable channels.' },
        { area: 'Sales', text: 'Top products or high-value customers do not appear easily.' },
        { area: 'Operations', text: 'Recurring issues do not show early.' },
        { area: 'Growth', text: 'Performance improvement opportunities are lost because data does not become recommendations.' },
      ],
      keyQuestion: 'Does your data answer your daily business questions?',
      keyQuestionFollowup: 'If it takes a full day to get one number, the data exists but does not work for you fast enough.',
      solution: { title: 'Intelligence that reveals opportunities early', desc: 'We turn scattered data into dashboards, indicators, and simple questions that help you see performance, understand drops, and discover growth opportunities before they disappear.', slug: 'ai-practical-decisions' },
      whatWeOfferIntro: 'We help transform data from files and delayed reports into a daily decision tool that is easy to read and connected to what happens in the business.',
      whatWeOfferPoints: ['Collect and clean data sources.', 'Build an interactive dashboard.', 'Define KPIs based on the business model.', 'Analyze sales, orders, products, and customers.', 'Compare by branch, channel, or time period.', 'Alerts for important drops or changes.', 'Short management summaries.', 'Optional WhatsApp assistant or Q&A interface for numbers.', 'Data-based recommendations instead of guesswork.'],
      expectedReturn: ['Faster understanding of real performance.', 'Early discovery of issues and opportunities.', 'Better marketing and sales decisions.', 'Less manual reporting time.', 'Data becomes a daily management tool.', 'Management can act at the right time.'],
      caseStudy: { title: 'From scattered data to a smart dashboard that answers management questions', desc: 'How we connected multiple data sources into a clear dashboard and WhatsApp assistant so decision-makers can quickly see sales, performance, top products, and result drops.', slug: 'business-intelligence-dashboard-data-assistant' },
      ctaHeading: 'Is your data clear, or just scattered numbers?',
      ctaBody: 'Share where your data lives today, and we will suggest how to turn it into a practical decision dashboard that shows what is happening and what to do next.',
      ctaButton: 'Book a consultation',
    },
    ar: {
      title: 'البيانات موجودة… لكنها لا تساعدك على القرار',
      badge: 'مشكلة بيانات وقرار',
      intro: 'وجود البيانات لا يكفي. قد تكون لديك مبيعات، طلبات، عملاء، حملات، وفروع، لكن بدون طريقة واضحة لقراءة هذه البيانات ستبقى الأرقام موجودة دون أن تساعدك على القرار.',
      whatHappeningIntro: 'البيانات موجودة في أنظمة مختلفة أو ملفات متفرقة، لكنها لا تتحول إلى إجابات سهلة: ما الذي يعمل؟ ما الذي انخفض؟ أي منتج أفضل؟ أي قناة تجلب عملاء أعلى جودة؟',
      whatHappeningPoints: ['أرقام كثيرة لكن بدون معنى واضح.', 'تقارير تُجمع يدويًا بعد انتهاء الوقت المناسب للقرار.', 'صعوبة مقارنة الفروع أو الحملات أو المنتجات.', 'لا توجد إشارات مبكرة للهبوط أو الفرص.', 'الإدارة تسأل الفريق بدل أن تسأل النظام.'],
      whyMatters: ['البيانات غير المرتبة لا تصنع قرارًا.', 'كثرة الأرقام قد تزيد التشتت بدل الوضوح.', 'غياب الربط بين البيانات يمنع معرفة السبب الحقيقي.', 'الفرص لا تظهر مبكرًا إذا لم تكن هناك قراءة مستمرة.', 'القرار الذكي يحتاج مؤشرات واضحة لا جداول فقط.'],
      impactAreas: [
        { area: 'الإدارة', text: 'القرارات تعتمد على إحساس عام بدل مؤشرات واضحة.' },
        { area: 'التسويق', text: 'يصعب معرفة القنوات الأكثر ربحية.' },
        { area: 'المبيعات', text: 'لا تظهر المنتجات أو العملاء الأعلى قيمة بسهولة.' },
        { area: 'التشغيل', text: 'لا توجد إشارات مبكرة للمشاكل المتكررة.' },
        { area: 'النمو', text: 'تضيع فرص تحسين الأداء لأن البيانات لا تتحول إلى توصيات.' },
      ],
      keyQuestion: 'هل بياناتك تجيب على أسئلتك اليومية؟',
      keyQuestionFollowup: 'لو احتجت يومًا كاملًا لتعرف رقمًا واحدًا، فالبيانات موجودة لكنها لا تعمل لصالحك بالسرعة المطلوبة.',
      solution: { title: 'ذكاء يكشف الفرص مبكرًا', desc: 'نحوّل البيانات المتفرقة إلى لوحات ومؤشرات وأسئلة سهلة تساعدك على رؤية الأداء، فهم الانخفاضات، واكتشاف فرص النمو قبل أن تضيع.', slug: 'ai-practical-decisions' },
      whatWeOfferIntro: 'نساعدك على تحويل البيانات من ملفات وتقارير متأخرة إلى أداة يومية للقرار، يمكن قراءتها بسرعة وربطها بما يحدث في العمل.',
      whatWeOfferPoints: ['تجميع وتنظيف مصادر البيانات.', 'بناء لوحة تحكم تفاعلية.', 'مؤشرات أداء رئيسية حسب طبيعة النشاط.', 'تحليل المبيعات والطلبات والمنتجات والعملاء.', 'مقارنات حسب الفروع أو القنوات أو الفترات.', 'تنبيهات عند حدوث انخفاض أو تغير مهم.', 'تقارير مختصرة للإدارة.', 'مساعد واتساب أو واجهة سؤال وجواب للأرقام عند الحاجة.', 'توصيات مبنية على البيانات وليس التخمين.'],
      expectedReturn: ['فهم أسرع للأداء الحقيقي.', 'اكتشاف مبكر للمشاكل والفرص.', 'تحسين قرارات التسويق والمبيعات.', 'تقليل وقت التقارير اليدوية.', 'تحويل البيانات إلى أداة متابعة يومية.', 'زيادة قدرة الإدارة على التصرف في الوقت المناسب.'],
      caseStudy: { title: 'من بيانات متفرقة إلى داشبورد ذكي يجيب على أسئلة الإدارة', desc: 'كيف ربطنا مصادر بيانات متعددة داخل داشبورد واضح ومساعد واتساب، ليتمكن صاحب القرار من معرفة المبيعات، الأداء، أفضل المنتجات، وانخفاضات النتائج بسرعة.', slug: 'business-intelligence-dashboard-data-assistant' },
      ctaHeading: 'هل بياناتك واضحة أم مجرد أرقام متفرقة؟',
      ctaBody: 'شاركنا أين توجد بياناتك الآن، وسنقترح لك كيف يمكن تحويلها إلى لوحة قرار عملية تساعدك على رؤية ما يحدث واتخاذ الخطوة التالية.',
      ctaButton: 'احجز استشارة لنشاطك',
    },
  },
};

export function ProblemDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const ar = language === 'ar';
  const data = problemData[slug || ''];
  const d = data ? (ar ? data.ar : data.en) : null;

  if (!d) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#101418] mb-4">{ar ? 'الصفحة غير موجودة' : 'Problem not found'}</h1>
          <Link to="/solutions/problems" className="text-[#6D5DF6] hover:underline">{ar ? 'عرض جميع المشكلات' : 'View all problems'}</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${d.title} | ENSDIM`}
        description={d.intro}
        canonical={`/problems/${slug}`}
        lang={ar ? 'ar' : 'en'}
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
            <Link to="/solutions/problems" className="hover:text-white/80 transition-colors">{ar ? 'المشكلات' : 'Problems'}</Link>
            <span className="opacity-40">/</span>
            <span className="text-white/70 font-medium">{d.title}</span>
          </div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5 uppercase tracking-wider bg-[#6D5DF6]/15 border border-[#6D5DF6]/20 text-[#EEEAFE]/80">
            {d.badge}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight text-white">{d.title}</h1>
          <p className="text-base sm:text-lg max-w-2xl leading-relaxed mb-8 text-[#EEEAFE]/75">{d.intro}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              to={`/solutions/${d.solution.slug}`}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
            >
              {ar ? 'اعرض الحل الموصى به' : 'View the recommended solution'} <ArrowRight size={15} />
            </Link>
            <Link
              to="/book-consultation"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-white/20 text-white/80 hover:border-white/40 hover:text-white active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
            >
              {ar ? 'احجز استشارة' : 'Book a consultation'}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">

          <ScrollReveal>
            <h2 className="text-xl font-bold text-[#101418] mb-3">{ar ? 'ما الذي يحدث؟' : 'What is happening?'}</h2>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-4">{d.whatHappeningIntro}</p>
            <ul className="space-y-2.5">
              {d.whatHappeningPoints.map((w, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#4F555E]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6D5DF6] mt-1.5 flex-shrink-0" />
                  {w}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <h2 className="text-xl font-bold text-[#101418] mb-4">{ar ? 'لماذا هذه المشكلة مهمة؟' : 'Why this problem matters'}</h2>
            <ul className="space-y-2.5">
              {d.whyMatters.map((w, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#4F555E]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D63A3A] mt-1.5 flex-shrink-0" />
                  {w}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="text-xl font-bold text-[#101418] mb-4">{ar ? 'أين يظهر الأثر داخل البزنس؟' : 'Where the impact appears inside the business'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {d.impactAreas.map((item, i) => (
                <div key={i} className="p-4 bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl">
                  <p className="text-xs font-bold text-[#6D5DF6] uppercase tracking-wide mb-1">{item.area}</p>
                  <p className="text-sm text-[#101418]">{item.text}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.14}>
            <div className="bg-[#0f0d19] rounded-2xl p-6 sm:p-8 text-white">
              <p className="text-xs font-semibold text-[#6D5DF6] uppercase tracking-wider mb-3">{ar ? 'السؤال الأهم' : 'The key question'}</p>
              <h3 className="text-lg font-bold mb-2 leading-snug">{d.keyQuestion}</h3>
              <p className="text-sm text-[#EEEAFE]/75 leading-relaxed">{d.keyQuestionFollowup}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.18}>
            <div className="bg-[#EEEAFE] rounded-2xl p-6">
              <p className="text-xs font-semibold text-[#6D5DF6] uppercase tracking-wider mb-2">{ar ? 'الحل الموصى به' : 'Recommended solution'}</p>
              <h3 className="text-lg font-bold text-[#101418] mb-2">{d.solution.title}</h3>
              <p className="text-sm text-[#4F555E] leading-relaxed mb-3">{d.solution.desc}</p>
              <Link to={`/solutions/${d.solution.slug}`} className="inline-flex items-center gap-1.5 text-sm text-[#6D5DF6] font-medium hover:gap-2.5 transition-all">
                {ar ? 'اعرض هذا الحل' : 'View this solution'} <ArrowRight size={13} />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.22}>
            <h2 className="text-xl font-bold text-[#101418] mb-3">{ar ? 'ما الذي يمكن أن نقدمه لك لحل هذه المشكلة؟' : 'What can we provide to solve this problem?'}</h2>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-5">{d.whatWeOfferIntro}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {d.whatWeOfferPoints.map((m, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl">
                  <CheckCircle2 size={15} className="text-[#6D5DF6] flex-shrink-0" />
                  <span className="text-sm text-[#101418]">{m}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.26}>
            <h2 className="text-xl font-bold text-[#101418] mb-4">{ar ? 'العائد المتوقع من حل المشكلة' : 'Expected return from solving this problem'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {d.expectedReturn.map((o, i) => (
                <div key={i} className="p-4 bg-[#EEEAFE] rounded-xl">
                  <p className="text-sm font-medium text-[#101418]">{o}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="border border-[#E5E5E5] rounded-2xl p-6">
              <p className="text-xs text-[#4F555E] uppercase tracking-wider mb-2">{ar ? 'دراسة حالة مرتبطة' : 'Related case study'}</p>
              <h3 className="text-base font-bold text-[#101418] mb-2">{d.caseStudy.title}</h3>
              <p className="text-sm text-[#4F555E] leading-relaxed mb-3">{d.caseStudy.desc}</p>
              <Link to={`/case-studies/${d.caseStudy.slug}`} className="inline-flex items-center gap-1.5 text-sm text-[#6D5DF6] font-medium hover:gap-2.5 transition-all">
                {ar ? 'عرض دراسة الحالة' : 'View case study'} <ArrowRight size={13} />
              </Link>
            </div>
          </ScrollReveal>

        </div>
      </section>

      <section className="py-14 bg-[#0f0d19] text-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">{d.ctaHeading}</h2>
          <p className="text-sm text-[#EEEAFE]/75 leading-relaxed mb-6">{d.ctaBody}</p>
          <Link
            to="/book-consultation"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
          >
            {d.ctaButton} <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
