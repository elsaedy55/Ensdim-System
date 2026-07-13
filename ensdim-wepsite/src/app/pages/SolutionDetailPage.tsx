import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHero } from '../components/PageHero';
import { ScrollReveal } from '../components/ScrollReveal';
import { ConsultationForm } from '../components/ConsultationForm';
import { SEO } from '../components/SEO';
import { parseSector } from '../../lib/caseStudySector';
import { useCaseStudies } from '../../hooks/useContent';

/**
 * Related problems only link to problem pages that already exist.
 * Two problems referenced in the approved content brief ("Visitors are not
 * turning into clear requests" and "The data exists, but it is not helping
 * you make decisions") have no page yet and are intentionally omitted.
 * Related case studies are fetched from Supabase by solution_slug — not
 * hardcoded — per the content brief's instruction that new case studies
 * are added to the database, not the codebase.
 */

interface Outcome { outcome: string; explanation: string }
interface ProblemLink { label: string; slug: string }

interface SolutionDetail {
  title: string;
  shortDesc: string;
  whatItSolves: string;
  whenNeeded: string[];
  howItWorks: string;
  whatWeBuild: string[];
  roi: string[];
  outcomes: Outcome[];
  relatedProblems: ProblemLink[];
  ctaHeading: string;
  ctaBody: string;
}

const solutionData: Record<string, { en: SolutionDetail; ar: SolutionDetail }> = {
  'follow-up-systems': {
    en: {
      title: 'Follow-up that prevents lost opportunities',
      shortDesc: 'We help you turn scattered messages, calls, and forms into a clear follow-up path, so your team knows who contacted you, who replied, who needs follow-up, and who is close to buying.',
      whatItSolves: 'Businesses do not always lose customers because demand is low. Sometimes they lose them because follow-up is not organized. A WhatsApp message is not logged, a call outcome is unknown, a website form is missed, or a warm opportunity is forgotten during a busy day. This solution turns follow-up from a memory-based effort into a clear operating path that connects the customer, the employee, the stage, and the next action.',
      whenNeeded: [
        'You still rely on WhatsApp, Excel, or employee memory to record customers and follow up opportunities.',
        'Customers come from several channels and are not collected in one place.',
        'You do not know exactly who followed up with each customer and what happened.',
        'Interested customers are not contacted again at the right time.',
        'Sales or reception teams are busy, but results are not clear.',
        'You do not know which channels bring real customers and which waste budget.',
      ],
      howItWorks: 'We build a clear path for every potential customer. Each opportunity is logged, classified, and linked to a clear stage. Each team member knows the next action, and management can see the situation without chasing daily updates manually.',
      whatWeBuild: [
        'A unified lead inbox from the website, WhatsApp, forms, or campaigns.',
        'Source tracking for every opportunity.',
        'Clear stages such as new, replied, needs follow-up, interested, closed, or lost.',
        'Follow-up reminders and alerts.',
        'Response and follow-up templates for faster communication.',
        'Customer classification by interest or readiness.',
        'A management dashboard showing opportunities, stages, and conversion rates.',
        'Reports showing where opportunities are lost and why.',
      ],
      roi: [
        'Fewer lost customers caused by weak follow-up.',
        'Higher conversion from inquiry to booking or request.',
        'Faster response and follow-up.',
        'Less dependence on employee memory.',
        'Clearer visibility for management.',
        'Less wasted advertising budget.',
        'Better customer experience from the first interaction.',
      ],
      outcomes: [
        { outcome: 'Better conversion', explanation: 'Every opportunity moves through a clear path.' },
        { outcome: 'Faster response', explanation: 'The team knows who needs a reply or follow-up.' },
        { outcome: 'Clearer visibility', explanation: 'Management sees opportunity status instead of guessing.' },
        { outcome: 'Easier management', explanation: 'Follow-up becomes organized and assigned.' },
        { outcome: 'Less manual work', explanation: 'Reminders, stages, and alerts reduce random follow-up.' },
      ],
      relatedProblems: [
        { label: 'Customers and opportunities are lost before they turn into sales', slug: 'leads-get-lost' },
        { label: 'Slow response reduces trust and loses ready-to-buy customers', slug: 'slow-response' },
      ],
      ctaHeading: 'Do you know where your opportunities are being lost?',
      ctaBody: 'Tell us how you currently receive customers, who follows up with them, and how you track each opportunity. We will help you identify the closest follow-up system for your business.',
    },
    ar: {
      title: 'متابعة تمنع ضياع الفرص',
      shortDesc: 'نساعدك على تحويل العملاء المحتملين من رسائل ومكالمات ونماذج متفرقة إلى مسار متابعة واضح، بحيث يعرف فريقك من تواصل، من رد، من يحتاج متابعة، ومن اقترب من قرار الشراء.',
      whatItSolves: 'الأعمال لا تخسر العملاء دائمًا بسبب ضعف الخدمة أو قلة الطلبات. أحيانًا تخسرهم لأن المتابعة غير منظمة، فعميل يرسل على واتساب ولا يتم تسجيله، مكالمة لا يعرف أحد نتيجتها، نموذج يصل من الموقع ولا تتم مراجعته في الوقت المناسب، أو فرصة مهتمة تُنسى وسط ضغط اليوم. هذا الحل يحول المتابعة من مجهود يدوي يعتمد على ذاكرة الفريق إلى نظام واضح يربط بين العميل، الموظف، المرحلة، والخطوة التالية.',
      whenNeeded: [
        'ما زلت تعتمد على واتساب أو Excel أو ذاكرة الموظفين في تسجيل العملاء ومتابعة الفرص.',
        'العملاء يصلون من أكثر من قناة ولا يتم جمعهم في مكان واحد.',
        'لا تعرف بدقة من تابع كل عميل وماذا حدث معه.',
        'بعض العملاء المهتمين لا يتم التواصل معهم مرة أخرى.',
        'فريق المبيعات أو الاستقبال يعمل كثيرًا لكن النتائج غير واضحة.',
        'لا تعرف أي قناة تجلب عملاء حقيقيين وأي قناة تستهلك الميزانية.',
      ],
      howItWorks: 'بدل أن تكون المتابعة موزعة بين الموظفين والقنوات المختلفة، نبني لك مسارًا واضحًا لكل عميل محتمل. كل فرصة تدخل إلى النظام يتم تسجيلها، تصنيفها، وربطها بحالة واضحة. كل موظف يعرف ما المطلوب منه، وكل عميل له مرحلة وخطوة تالية، والإدارة ترى الصورة بدل الاعتماد على الأسئلة اليومية والمتابعة اليدوية.',
      whatWeBuild: [
        'صندوق موحد لاستقبال العملاء المحتملين من الموقع، واتساب، النماذج، أو الحملات.',
        'تسجيل مصدر كل فرصة لمعرفة القنوات الأكثر فاعلية.',
        'مراحل واضحة لحالة العميل مثل جديد، تم الرد، يحتاج متابعة، مهتم، تم الإغلاق، أو لم يكتمل.',
        'تذكيرات وتنبيهات حتى لا تُنسى الفرص.',
        'قوالب ردود ومتابعة تساعد الفريق على التواصل بشكل أسرع وأكثر تنظيمًا.',
        'تصنيف العملاء حسب درجة الاهتمام أو الجاهزية.',
        'لوحة متابعة للإدارة تعرض عدد الفرص، حالتها، ومعدلات التحويل.',
        'تقارير تساعدك على معرفة أين تضيع الفرص ولماذا.',
      ],
      roi: [
        'تقليل عدد العملاء الذين يضيعون بسبب ضعف المتابعة.',
        'زيادة فرص التحويل من استفسار إلى حجز أو طلب.',
        'تحسين سرعة الرد والمتابعة.',
        'تقليل الاعتماد على ذاكرة الموظفين.',
        'وضوح أكبر للإدارة حول أداء الفريق.',
        'تقليل الهدر في ميزانية الإعلانات.',
        'تحسين تجربة العميل من أول تواصل.',
      ],
      outcomes: [
        { outcome: 'تحويل أفضل', explanation: 'كل فرصة تدخل في مسار واضح بدل أن تضيع بين القنوات.' },
        { outcome: 'استجابة أسرع', explanation: 'الفريق يعرف من يحتاج ردًا أو متابعة.' },
        { outcome: 'رؤية أوضح', explanation: 'الإدارة ترى حالة العملاء والفرص بدل الاعتماد على التخمين.' },
        { outcome: 'إدارة أسهل', explanation: 'المتابعة تصبح منظمة وموزعة بوضوح.' },
        { outcome: 'عمل يدوي أقل', explanation: 'التذكيرات، الحالات، والتنبيهات تقلل المتابعة العشوائية.' },
      ],
      relatedProblems: [
        { label: 'العملاء والفرص تضيع قبل ما تتحول لمبيعات', slug: 'leads-get-lost' },
        { label: 'الرد المتأخر يقلل الثقة ويخسر عملاء جاهزين', slug: 'slow-response' },
      ],
      ctaHeading: 'هل تريد أن تعرف أين تضيع فرصك؟',
      ctaBody: 'شاركنا كيف تستقبل العملاء الآن، ومن يتابعهم، وكيف تعرف حالة كل فرصة — وسنساعدك على تحديد أقرب نظام متابعة مناسب لطبيعة نشاطك.',
    },
  },
  'digital-experiences': {
    en: {
      title: 'Visits that turn into clear requests',
      shortDesc: 'We help turn website visits, landing pages, and paid campaigns into clear requests, bookings, inquiries, or opportunities that can be measured and followed up.',
      whatItSolves: 'You may have a good website or campaigns that bring traffic, but visitors leave before taking action. The issue is not always traffic volume; it may be an unclear conversion journey, with weak messaging, long forms, unclear buttons, or an experience that does not build trust quickly.',
      whenNeeded: [
        'Your website gets visits but few requests.',
        'You spend on ads but do not know why visitors are not converting.',
        'Visitors do not see a clear next step.',
        'Forms are too long or too generic.',
        'Pages provide information but do not lead to action.',
        'There is no clear connection between the page, WhatsApp, booking, or CRM.',
      ],
      howItWorks: 'We review the visitor journey from entry to request. We improve messaging, CTA placement, forms, trust signals, and connection to follow-up. The goal is not only a beautiful page, but a page that makes the visitor understand, trust, and take action.',
      whatWeBuild: [
        'Conversion-focused landing pages or service pages.',
        'Clear value messaging without technical complexity.',
        'Custom request forms based on the service and sector.',
        'Connection to WhatsApp, CRM, or follow-up dashboards.',
        'Clear CTA buttons based on visitor intent.',
        'Fast and simple mobile experience.',
        'Analytics to understand drop-off and conversion points.',
        'Testing and iteration to improve conversion over time.',
      ],
      roi: [
        'More requests from the same traffic.',
        'Better return on advertising spend.',
        'Fewer lost interested visitors.',
        'Better data for the sales team.',
        'Stronger trust from the first impression.',
        'Clear understanding of which pages and channels convert best.',
      ],
      outcomes: [
        { outcome: 'Higher conversion', explanation: 'A visit turns into a request, booking, or inquiry.' },
        { outcome: 'More efficient budget', explanation: 'The same spend can generate more qualified requests.' },
        { outcome: 'Clearer journey', explanation: 'Visitors understand what to do next.' },
        { outcome: 'Better data', explanation: 'The team receives clearer requests.' },
        { outcome: 'Continuous improvement', explanation: 'Analytics show where to improve the experience.' },
      ],
      relatedProblems: [
        { label: 'Customers and opportunities are lost before they turn into sales', slug: 'leads-get-lost' },
        { label: 'Slow response reduces trust and loses ready-to-buy customers', slug: 'slow-response' },
      ],
      ctaHeading: 'Are your visits turning into enough requests?',
      ctaBody: 'Share your website or current request flow, and we will help you identify the conversion leaks in your customer journey.',
    },
    ar: {
      title: 'زيارات تتحول إلى طلبات',
      shortDesc: 'نساعدك على تحويل الموقع أو صفحات الهبوط أو حملاتك الإعلانية من مجرد زيارات ومشاهدات إلى طلبات واضحة يمكن قياسها ومتابعتها وتحسينها.',
      whatItSolves: 'قد يكون لديك موقع جيد أو حملات تجلب زيارات، لكن الزائر لا يعرف الخطوة التالية أو يخرج قبل أن يترك بياناته. المشكلة ليست دائمًا في عدد الزوار، بل في أن رحلة التحويل غير واضحة، برسالة غير دقيقة، نموذج طويل، زر غير مقنع، أو تجربة لا تبني الثقة بسرعة.',
      whenNeeded: [
        'لديك زيارات على الموقع لكن الطلبات قليلة.',
        'تنفق على الإعلانات ولا تعرف لماذا لا يتحول الزائر إلى عميل.',
        'الزائر لا يجد خطوة واضحة بعد قراءة الخدمة.',
        'النماذج طويلة أو عامة ولا تجمع البيانات المهمة للبيع.',
        'صفحاتك تعرض معلومات كثيرة لكنها لا تقود لقرار.',
        'لا يوجد ربط واضح بين الصفحة والواتساب أو الحجز أو CRM.',
      ],
      howItWorks: 'نراجع رحلة الزائر من أول دخوله حتى خطوة الطلب. نعيد ترتيب الرسائل، الأزرار، النماذج، الثقة البصرية، وربط الصفحة بمسار متابعة واضح. الهدف ليس بناء صفحة جميلة فقط، بل بناء تجربة تجعل الزائر يفهم العرض بسرعة، يشعر بالثقة، ويترك طلبًا يمكن لفريقك التعامل معه.',
      whatWeBuild: [
        'صفحات هبوط أو صفحات خدمة مركزة على التحويل.',
        'رسائل واضحة تشرح القيمة بدون تعقيد تقني.',
        'نماذج طلب مخصصة حسب الخدمة والقطاع.',
        'ربط الطلبات بالواتساب أو CRM أو لوحة المتابعة.',
        'أزرار CTA واضحة وموزعة حسب نية الزائر.',
        'تجربة موبايل سريعة وبسيطة.',
        'تحليلات لمعرفة أين يخرج الزوار وأين يتحولون.',
        'نسخ وتجارب مختلفة لتحسين التحويل مع الوقت.',
      ],
      roi: [
        'زيادة الطلبات من نفس عدد الزيارات.',
        'رفع العائد من ميزانية الإعلانات.',
        'تقليل ضياع الزوار المهتمين.',
        'جمع بيانات أفضل تساعد فريق المبيعات.',
        'تحسين ثقة العميل من أول انطباع.',
        'معرفة الصفحات والقنوات التي تحقق أفضل تحويل.',
      ],
      outcomes: [
        { outcome: 'تحويل أعلى', explanation: 'الزيارة تصبح خطوة فعلية مثل طلب أو حجز أو استفسار.' },
        { outcome: 'ميزانية أكثر كفاءة', explanation: 'نفس الإنفاق يمكن أن يحقق طلبات أكثر.' },
        { outcome: 'رحلة أوضح', explanation: 'الزائر يفهم ماذا يفعل بعد قراءة العرض.' },
        { outcome: 'بيانات أفضل', explanation: 'الفريق يستلم طلبًا واضحًا بدل رسالة عامة.' },
        { outcome: 'تحسين مستمر', explanation: 'التحليلات توضّح أين نحتاج تعديل التجربة.' },
      ],
      relatedProblems: [
        { label: 'العملاء والفرص تضيع قبل ما تتحول لمبيعات', slug: 'leads-get-lost' },
        { label: 'الرد المتأخر يقلل الثقة ويخسر عملاء جاهزين', slug: 'slow-response' },
      ],
      ctaHeading: 'هل زياراتك تتحول إلى طلبات كفاية؟',
      ctaBody: 'شاركنا رابط موقعك أو طريقة استقبال الطلبات الحالية، وسنساعدك على تحديد نقاط التسرب في رحلة العميل.',
    },
  },
  'visibility-insights': {
    en: {
      title: 'Faster decisions instead of guessing',
      shortDesc: 'We help management see business numbers clearly instead of waiting for delayed reports or relying on gut feeling across marketing, sales, operations, and branches.',
      whatItSolves: "When numbers are scattered across Excel, WhatsApp, separate systems, and team conversations, management decisions become slow and uncertain. You may know there is a problem, but not whether it's the marketing channel, sales team, branch, service, or product. This solution collects the important data and presents it in a way that supports faster decisions.",
      whenNeeded: [
        'Reports take too long to prepare.',
        'You do not know which marketing channel delivers the best return.',
        'Data exists but is scattered across files and systems.',
        'Management needs to ask the team for simple numbers.',
        'There is no clear comparison between branches, campaigns, or services.',
        'Drops are discovered after they have already affected revenue.',
      ],
      howItWorks: 'We define the numbers that actually affect decisions, collect them from their sources, and present them in a clear dashboard. You can see sales, requests, lead sources, branch performance, campaigns, services, and performance changes over time.',
      whatWeBuild: [
        'Define the KPIs that matter for your business.',
        'Collect data from website, CRM, sales, campaigns, or files.',
        'Management dashboard with key numbers.',
        'Filters by date, branch, service, product, or lead source.',
        'Automated daily, weekly, or monthly summaries.',
        'Comparisons between branches, campaigns, or sources.',
        'Alerts when performance changes significantly.',
        'Optional WhatsApp assistant for management questions.',
      ],
      roi: [
        'Less manual reporting time.',
        'Faster decisions based on clear numbers.',
        'Better understanding of revenue sources.',
        'Early discovery of performance drops.',
        'Better budget and effort allocation.',
        'Less dependence on one person to extract reports.',
      ],
      outcomes: [
        { outcome: 'Faster decisions', explanation: 'Key numbers are visible without long waiting.' },
        { outcome: 'Clearer control', explanation: 'Management sees performance in one view.' },
        { outcome: 'Smarter marketing', explanation: 'You know where to invest and where to stop.' },
        { outcome: 'Better operations', explanation: 'Weak branches or teams appear faster.' },
        { outcome: 'Higher confidence', explanation: 'Decisions are based on data, not impressions.' },
      ],
      relatedProblems: [
        { label: 'Management cannot see the full picture in time', slug: 'no-visibility' },
      ],
      ctaHeading: 'Are your decisions delayed because numbers are not ready?',
      ctaBody: 'Share your current data sources, and we will help you identify the closest management visibility layer for your business.',
    },
    ar: {
      title: 'قرار أسرع بدل التخمين',
      shortDesc: 'نساعد الإدارة على رؤية أرقام العمل بوضوح بدل انتظار التقارير المتأخرة أو الاعتماد على الإحساس الشخصي في قرارات التسويق، المبيعات، التشغيل، والفروع.',
      whatItSolves: 'عندما تكون الأرقام موزعة بين Excel، واتساب، أنظمة مختلفة، ومحادثات الفريق، تصبح قرارات الإدارة بطيئة وغير دقيقة. قد تعرف أن هناك مشكلة، لكن لا تعرف بالضبط إن كانت في قناة التسويق، فريق المبيعات، فرع معين، أو خدمة معينة. هذا الحل يجمع البيانات المهمة ويعرضها بطريقة تساعدك على اتخاذ قرار أسرع وأكثر ثقة.',
      whenNeeded: [
        'تحتاج تقارير يومية أو شهرية لكن إعدادها يأخذ وقتًا.',
        'لا تعرف بدقة أي قناة تسويقية تحقق أفضل عائد.',
        'الأرقام موجودة لكنها موزعة بين أكثر من ملف أو نظام.',
        'الإدارة تسأل كثيرًا للحصول على رقم بسيط.',
        'لا توجد مقارنة واضحة بين الفروع أو الحملات أو الخدمات.',
        'تكتشف الانخفاضات متأخرًا بعد أن تؤثر على الإيرادات.',
      ],
      howItWorks: 'نحدد الأرقام التي تؤثر فعلاً على القرار، ثم نجمعها من مصادرها ونحولها إلى لوحة واضحة. يمكن أن ترى المبيعات، الطلبات، مصادر العملاء، أداء الفروع، الحملات، المنتجات أو الخدمات، وتغيرات الأداء عبر الوقت.',
      whatWeBuild: [
        'تحديد مؤشرات الأداء المهمة لنشاطك.',
        'جمع البيانات من الموقع، CRM، المبيعات، الحملات، أو الملفات.',
        'لوحة تحكم للإدارة تعرض الأرقام الأساسية بوضوح.',
        'فلاتر حسب التاريخ، الفرع، الخدمة، المنتج، أو مصدر العميل.',
        'تقارير تلقائية يومية أو أسبوعية أو شهرية.',
        'مقارنات بين الفروع أو الحملات أو مصادر العملاء.',
        'تنبيهات عند وجود انخفاض أو تغير مهم.',
        'إمكانية ربط مساعد واتساب لأسئلة الإدارة عن الأرقام.',
      ],
      roi: [
        'تقليل وقت إعداد التقارير اليدوية.',
        'قرارات أسرع بناءً على أرقام واضحة.',
        'معرفة مصادر الإيراد الأفضل.',
        'اكتشاف الانخفاضات قبل أن تكبر.',
        'تحسين توزيع الميزانية والجهد.',
        'تقليل الاعتماد على شخص واحد لاستخراج الأرقام.',
      ],
      outcomes: [
        { outcome: 'سرعة قرار', explanation: 'الأرقام الأساسية تظهر دون انتظار طويل.' },
        { outcome: 'تحكم أوضح', explanation: 'الإدارة ترى الأداء من زاوية واحدة.' },
        { outcome: 'تسويق أذكى', explanation: 'تعرف أين تنفق وأين تقلل.' },
        { outcome: 'تشغيل أفضل', explanation: 'الفروع أو الفرق الضعيفة تظهر بسرعة.' },
        { outcome: 'ثقة أعلى', explanation: 'القرار يصبح مبنيًا على بيانات لا انطباعات.' },
      ],
      relatedProblems: [
        { label: 'الإدارة لا ترى الصورة كاملة في الوقت المناسب', slug: 'no-visibility' },
      ],
      ctaHeading: 'هل قراراتك تتأخر لأن الأرقام غير جاهزة؟',
      ctaBody: 'شاركنا مصادر بياناتك الحالية، وسنساعدك على تحديد أقرب لوحة رؤية لإدارة نشاطك بشكل أسرع.',
    },
  },
  'automation-layers': {
    en: {
      title: 'Lower cost and less operational pressure',
      shortDesc: 'We help reduce repetitive manual tasks that drain the team and increase costs by organizing workflows and automating steps that do not require human input every time.',
      whatItSolves: 'As the business grows without operational structure, the team spends long hours on repetitive work, from reminders and data entry to status follow-up, moving information between files, or answering the same questions. These small daily tasks become fixed cost and pressure.',
      whenNeeded: [
        'Your team repeats the same tasks every day.',
        'You need more hiring with every increase in customers.',
        'Manual follow-up causes errors or delays.',
        'Work is scattered across WhatsApp, Excel, and calls.',
        'You want to reduce pressure without lowering service quality.',
        'Some processes could be automated but are not connected.',
      ],
      howItWorks: 'We analyze repeated operational steps and identify what should be organized or automated. Then we build workflows where data is entered once, reminders and alerts run automatically, statuses update clearly, and the team focuses on decisions and high-value communication.',
      whatWeBuild: [
        'Analyze repetitive manual operations.',
        'Build clear workflows for teams and tasks.',
        'Automate reminders, alerts, and repeated messages.',
        'Data entry forms that reduce mistakes.',
        'Connect website, CRM, team, and customer where needed.',
        'Automated follow-up reports.',
        'Remove unnecessary steps from the workflow.',
        'Improve task distribution across the team.',
      ],
      roi: [
        'Fewer manual working hours.',
        'Less pressure on the current team.',
        'Reduced need for extra hiring.',
        'Fewer errors from manual data transfer.',
        'Faster service and follow-up.',
        'Ability to serve more customers with the same team.',
      ],
      outcomes: [
        { outcome: 'Less time', explanation: 'Repetitive tasks do not drain the team every day.' },
        { outcome: 'Fewer errors', explanation: 'Data moves through a structured process.' },
        { outcome: 'Less pressure', explanation: 'The team focuses on customers, not admin work.' },
        { outcome: 'Better cost', explanation: 'Growth does not immediately require more hiring.' },
        { outcome: 'Faster service', explanation: 'Reminders and alerts do not wait for a person to send them.' },
      ],
      relatedProblems: [
        { label: 'Manual operations drain the team and increase costs', slug: 'repeated-work' },
        { label: 'Slow response reduces trust and loses ready-to-buy customers', slug: 'slow-response' },
      ],
      ctaHeading: 'What task does your team repeat every day?',
      ctaBody: 'Share your daily workflow, and we will help identify what can be organized or automated to reduce cost and pressure.',
    },
    ar: {
      title: 'تكلفة أقل وضغط أقل',
      shortDesc: 'نساعدك على تقليل المهام اليدوية المتكررة التي تستهلك وقت الفريق وترفع التكلفة، من خلال تنظيم العمل وأتمتة الخطوات التي لا تحتاج تدخلًا بشريًا كل مرة.',
      whatItSolves: 'عندما يكبر النشاط بدون تنظيم، يبدأ الفريق في قضاء وقت طويل على أعمال متكررة، من إرسال التذكيرات وتسجيل البيانات إلى متابعة الحالات، نقل المعلومات بين الملفات، أو الرد على نفس الأسئلة. هذه الأعمال تبدو صغيرة يوميًا، لكنها تتحول إلى تكلفة ثابتة وضغط على الفريق.',
      whenNeeded: [
        'الفريق يكرر نفس المهام يوميًا.',
        'تحتاج توظيفًا إضافيًا مع كل زيادة في العملاء.',
        'المتابعة اليدوية تسبب أخطاء أو تأخير.',
        'العمل موزع بين واتساب وExcel ومكالمات.',
        'تريد تقليل الضغط بدون التأثير على جودة الخدمة.',
        'بعض العمليات يمكن تنفيذها تلقائيًا لكن لا يوجد نظام يربطها.',
      ],
      howItWorks: 'نحلل خطوات العمل المتكررة ونحدد ما يجب تنظيمه وما يمكن أتمتته. ثم نبني تدفقات عمل واضحة، حيث تدخل البيانات مرة واحدة، تعمل الإشعارات والتذكيرات تلقائيًا، تتحدث الحالات، ويركز الفريق على القرارات والتواصل المهم بدل الأعمال الإدارية المتكررة.',
      whatWeBuild: [
        'تحليل العمليات اليدوية المتكررة داخل نشاطك.',
        'بناء تدفقات عمل واضحة للفريق.',
        'أتمتة التذكيرات والتنبيهات والرسائل المتكررة.',
        'نماذج إدخال بيانات تقلل الأخطاء.',
        'ربط بين الموقع، CRM، الفريق، والعميل حسب الحاجة.',
        'تقارير متابعة تلقائية بدل إعداد يدوي.',
        'تقليل الخطوات غير الضرورية داخل رحلة العمل.',
        'تحسين توزيع المهام بين الفريق.',
      ],
      roi: [
        'تقليل ساعات العمل اليدوي.',
        'تخفيف الضغط على الفريق الحالي.',
        'تقليل الحاجة للتوظيف الزائد.',
        'تقليل الأخطاء الناتجة عن النقل اليدوي للبيانات.',
        'تحسين سرعة الخدمة والمتابعة.',
        'رفع قدرة النشاط على استقبال عملاء أكثر بنفس الفريق.',
      ],
      outcomes: [
        { outcome: 'وقت أقل', explanation: 'المهام المتكررة لا تستهلك الفريق كل يوم.' },
        { outcome: 'أخطاء أقل', explanation: 'البيانات تنتقل بشكل منظم بدل النسخ اليدوي.' },
        { outcome: 'ضغط أقل', explanation: 'الفريق يركز على العميل لا على الأعمال الإدارية.' },
        { outcome: 'تكلفة أفضل', explanation: 'النمو لا يعني بالضرورة توظيفًا أكبر فورًا.' },
        { outcome: 'خدمة أسرع', explanation: 'الإشعارات والتذكيرات لا تنتظر شخصًا ليرسلها.' },
      ],
      relatedProblems: [
        { label: 'التشغيل اليدوي يستهلك الفريق ويرفع التكلفة', slug: 'repeated-work' },
        { label: 'الرد المتأخر يقلل الثقة ويخسر عملاء جاهزين', slug: 'slow-response' },
      ],
      ctaHeading: 'ما أكثر مهمة يكررها فريقك كل يوم؟',
      ctaBody: 'شاركنا خطوات التشغيل اليومية، وسنساعدك على تحديد ما يمكن تنظيمه أو أتمتته لتقليل الضغط والتكلفة.',
    },
  },
  'customer-journey-systems': {
    en: {
      title: 'Operations built to scale',
      shortDesc: 'We help growing companies turn operations from people-dependent effort into a clear system that can handle more customers, orders, branches, or teams.',
      whatItSolves: 'Growth is not always comfortable. Sometimes more demand creates more pressure, errors, and delays. The operating method that worked in the beginning may not support the new size. This solution creates an operating layer that makes growth easier to manage instead of turning into chaos and rising cost.',
      whenNeeded: [
        'More customers have made operations harder.',
        'You have several teams, branches, or service lines and need one view.',
        'Work depends on specific people and is difficult to repeat.',
        'Management spends too much time tracking daily details.',
        'Errors increase as the business grows.',
        'You want to expand without losing control or service quality.',
      ],
      howItWorks: 'We map how your business operates from customer intake to service delivery and follow-up. Then we turn it into an operating system with clear roles, statuses, tasks, responsibilities, follow-up, reports, and connections between management, team, and customer.',
      whatWeBuild: [
        'Analyze your current operations and pressure points.',
        'Design clear workflows for teams and tasks.',
        'Dashboards for management and team members.',
        'Manage customers, requests, contracts, or visits depending on the business.',
        'Assign responsibilities and tasks inside the system.',
        'Track work status from start to finish.',
        'Customer-facing updates when needed.',
        'Reports that help management control growth.',
      ],
      roi: [
        'Serve more customers without losing clarity.',
        'Reduce errors caused by random growth.',
        'Clearer team responsibilities.',
        'Maintain service quality at higher volume.',
        'Reduce dependence on specific people.',
        'Support expansion into new branches or services.',
      ],
      outcomes: [
        { outcome: 'Calmer growth', explanation: 'More demand does not automatically create chaos.' },
        { outcome: 'More control', explanation: 'Management sees operations from one view.' },
        { outcome: 'Clearer team', explanation: 'Every person knows the role and next step.' },
        { outcome: 'Repeatable process', explanation: 'The workflow can be moved to a new team or branch.' },
        { outcome: 'Consistent quality', explanation: 'Service does not depend only on memory.' },
      ],
      relatedProblems: [
        { label: 'Manual operations drain the team and increase costs', slug: 'repeated-work' },
        { label: 'Management cannot see the full picture in time', slug: 'no-visibility' },
      ],
      ctaHeading: 'Has growth started to create pressure inside your business?',
      ctaBody: 'Share how your team currently works, and we will help identify the closest operating structure for scalable growth.',
    },
    ar: {
      title: 'تشغيل قابل للتوسع',
      shortDesc: 'نساعد الشركات التي بدأت تكبر على تحويل التشغيل من مجهود يعتمد على الأشخاص فقط إلى نظام واضح يستطيع تحمل زيادة العملاء، الطلبات، الفروع، أو الفريق.',
      whatItSolves: 'النمو لا يكون دائمًا مريحًا. أحيانًا كلما زادت الطلبات، زاد الضغط والأخطاء والتأخير. السبب أن طريقة التشغيل التي كانت مناسبة في البداية لا تتحمل الحجم الجديد. هذا الحل يساعدك على بناء طبقة تشغيل واضحة تجعل النمو أكثر قابلية للإدارة بدل أن يتحول إلى فوضى وتكلفة متزايدة.',
      whenNeeded: [
        'زاد عدد العملاء لكن التشغيل أصبح أصعب.',
        'لديك أكثر من فريق أو فرع أو خط خدمة وتحتاج رؤية موحدة.',
        'العمل يعتمد على أشخاص بعينهم ولا يسهل نقله أو تكراره.',
        'الإدارة تقضي وقتًا كبيرًا في متابعة التفاصيل اليومية.',
        'الأخطاء تزيد مع زيادة الحجم.',
        'تريد التوسع بدون أن تفقد السيطرة أو جودة الخدمة.',
      ],
      howItWorks: 'نرسم طريقة عمل النشاط من استقبال العميل حتى تقديم الخدمة وما بعدها. ثم نحولها إلى نظام تشغيل بأدوار واضحة، حالات، مهام، مسؤوليات، متابعة، تقارير، وربط بين الإدارة والفريق والعميل. الهدف أن يصبح النمو مدعومًا بنظام، لا فقط بمجهود إضافي من الأشخاص.',
      whatWeBuild: [
        'تحليل رحلة التشغيل الحالية واكتشاف نقاط الضغط.',
        'تصميم Workflow واضح للفرق والمهام.',
        'لوحات تحكم للإدارة والفريق.',
        'إدارة العملاء، الطلبات، العقود، أو الزيارات حسب نشاطك.',
        'توزيع مسؤوليات ومهام داخل النظام.',
        'متابعة حالات العمل من البداية للنهاية.',
        'ربط العميل بتحديثات واضحة عند الحاجة.',
        'تقارير تساعد الإدارة على التحكم في النمو.',
      ],
      roi: [
        'زيادة قدرة النشاط على استقبال عملاء أكثر.',
        'تقليل الأخطاء الناتجة عن التوسع العشوائي.',
        'وضوح أكبر في مسؤوليات الفريق.',
        'تحسين جودة الخدمة مع زيادة الحجم.',
        'تقليل اعتماد التشغيل على أشخاص محددين.',
        'دعم التوسع في فروع أو خدمات جديدة.',
      ],
      outcomes: [
        { outcome: 'نمو أكثر هدوءًا', explanation: 'زيادة الطلبات لا تتحول تلقائيًا إلى فوضى.' },
        { outcome: 'سيطرة أعلى', explanation: 'الإدارة ترى التشغيل من زاوية موحدة.' },
        { outcome: 'فريق أوضح', explanation: 'كل شخص يعرف دوره والخطوة التالية.' },
        { outcome: 'قابلية تكرار', explanation: 'يمكن نقل طريقة العمل لفريق أو فرع جديد.' },
        { outcome: 'جودة ثابتة', explanation: 'الخدمة لا تعتمد فقط على ذاكرة الأشخاص.' },
      ],
      relatedProblems: [
        { label: 'التشغيل اليدوي يستهلك الفريق ويرفع التكلفة', slug: 'repeated-work' },
        { label: 'الإدارة لا ترى الصورة كاملة في الوقت المناسب', slug: 'no-visibility' },
      ],
      ctaHeading: 'هل بدأ النمو يزيد الضغط داخل عملك؟',
      ctaBody: 'شاركنا كيف يعمل فريقك الآن، وسنساعدك على تحديد الهيكل الأقرب لبناء تشغيل قابل للتوسع.',
    },
  },
  'ai-practical-decisions': {
    en: {
      title: 'Smart visibility that reveals opportunities early',
      shortDesc: 'We help you use data, analytics, and a practical AI layer to discover drops, opportunities, important customers, and improvement points before they become losses or missed opportunities.',
      whatItSolves: 'Many companies have data but do not see it in time or understand what it means. Sales may drop in a branch, campaign conversion may weaken, a product or service may show growth potential, or customer behavior may change without management noticing. This solution does not only display numbers; it helps read the signals inside the business.',
      whenNeeded: [
        'You have data, but it does not turn into clear decisions.',
        'You want to identify drops or opportunities before the end of the month.',
        'You do not know which customers, services, or channels deserve more focus.',
        'You need practical recommendations, not only numbers.',
        'You want a practical AI layer without complexity.',
        'You want to understand customer or performance patterns over time.',
      ],
      howItWorks: 'We identify the important signals in your data, such as lead sources, conversion, sales, repeat behavior, branches, services, or user behavior. Then we design how to display, analyze, and translate them into actionable notes through alerts, intelligent summaries, and management-facing insights.',
      whatWeBuild: [
        'Analyze current data sources and key signals.',
        'Visibility dashboard showing trends, drops, and opportunities.',
        'Alerts when important performance changes happen.',
        'Intelligent summaries that explain what is happening.',
        'Customer or opportunity prioritization.',
        'A smart assistant for management data questions.',
        'Improvement recommendations based on performance patterns.',
        'Connect visibility to sales, marketing, or operations.',
      ],
      roi: [
        'Discover opportunities before they are missed.',
        'React faster when performance drops.',
        'Focus effort and budget on higher-return areas.',
        'Improve retention or conversion.',
        'Reduce decisions based only on impressions.',
        'Turn data into a daily growth tool.',
      ],
      outcomes: [
        { outcome: 'Early opportunities', explanation: 'The system highlights what deserves attention.' },
        { outcome: 'Lower risk', explanation: 'Drops appear before they become bigger.' },
        { outcome: 'Practical intelligence', explanation: 'AI supports decisions, not showmanship.' },
        { outcome: 'Better focus', explanation: 'You know where to put effort and budget.' },
        { outcome: 'Continuous growth', explanation: 'Each data cycle helps improve performance.' },
      ],
      relatedProblems: [
        { label: 'Management cannot see the full picture in time', slug: 'no-visibility' },
      ],
      ctaHeading: 'Can you see the important signals inside your data?',
      ctaBody: 'Share what data you currently have, and we will help identify how to turn it into visibility that reveals opportunities and drops early.',
    },
    ar: {
      title: 'رؤية ذكية تكشف الفرص مبكرًا',
      shortDesc: 'نساعدك على استخدام البيانات والتحليلات وطبقة ذكاء عملية لاكتشاف الانخفاضات، الفرص، العملاء المهمين، ونقاط التحسين قبل أن تتحول إلى خسائر أو فرص ضائعة.',
      whatItSolves: 'كثير من الشركات لديها بيانات لكنها لا تراها في الوقت المناسب ولا تعرف ماذا تعني. قد تنخفض المبيعات في فرع، تقل جودة التحويل في حملة، يظهر منتج أو خدمة بفرصة نمو، أو يتغير سلوك العملاء دون أن تنتبه الإدارة. هذا الحل لا يكتفي بعرض الأرقام، بل يساعدك على قراءة الإشارات المهمة داخل العمل.',
      whenNeeded: [
        'لديك بيانات لكن لا تتحول إلى قرارات واضحة.',
        'تريد معرفة الانخفاضات أو الفرص قبل نهاية الشهر.',
        'لا تعرف أي العملاء أو الخدمات أو القنوات تستحق تركيزًا أكبر.',
        'تحتاج توصيات عملية وليس أرقامًا فقط.',
        'تريد طبقة AI عملية تساعد الإدارة دون تعقيد.',
        'تريد فهم أنماط العملاء أو الأداء عبر الوقت.',
      ],
      howItWorks: 'نحدد الإشارات المهمة داخل بياناتك، مثل مصادر العملاء، التحويل، المبيعات، التكرار، الفروع، الخدمات، أو سلوك المستخدمين. ثم نبني طريقة لعرضها وتحليلها واستخراج ملاحظات قابلة للتصرف. يمكن إضافة مساعد ذكي أو تنبيهات أو ملخصات دورية تساعد الإدارة على معرفة ما يستحق الانتباه الآن.',
      whatWeBuild: [
        'تحليل مصادر البيانات الحالية وتحديد الإشارات المهمة.',
        'لوحة رؤية تعرض الاتجاهات والانخفاضات والفرص.',
        'تنبيهات عند حدوث تغير مهم في الأداء.',
        'تقارير ذكية تشرح ماذا يحدث لا الأرقام فقط.',
        'تصنيف العملاء أو الفرص حسب الأولوية.',
        'مساعد ذكي للإجابة على أسئلة الإدارة عن البيانات.',
        'اقتراحات تحسين مبنية على نمط الأداء.',
        'ربط الرؤية الذكية بالمبيعات، التسويق، أو التشغيل.',
      ],
      roi: [
        'اكتشاف الفرص قبل المنافسين أو قبل فوات الوقت.',
        'التحرك أسرع عند انخفاض الأداء.',
        'تركيز الجهد والميزانية على ما يحقق عائدًا أعلى.',
        'تحسين الاحتفاظ بالعملاء أو رفع التحويل.',
        'تقليل القرارات القائمة على الانطباع فقط.',
        'تحويل البيانات إلى أداة نمو يومية.',
      ],
      outcomes: [
        { outcome: 'فرص مبكرة', explanation: 'النظام يلفت انتباهك قبل أن تصبح الفرصة ضائعة.' },
        { outcome: 'مخاطر أقل', explanation: 'الانخفاضات تظهر بسرعة قبل أن تكبر.' },
        { outcome: 'ذكاء عملي', explanation: 'AI يظهر كأداة قرار لا كاستعراض تقني.' },
        { outcome: 'تركيز أفضل', explanation: 'تعرف أين تضع الجهد والميزانية.' },
        { outcome: 'نمو مستمر', explanation: 'كل دورة بيانات تساعد على تحسين الأداء.' },
      ],
      relatedProblems: [
        { label: 'الإدارة لا ترى الصورة كاملة في الوقت المناسب', slug: 'no-visibility' },
      ],
      ctaHeading: 'هل ترى الإشارات المهمة داخل بياناتك؟',
      ctaBody: 'شاركنا نوع البيانات المتاحة لديك، وسنساعدك على تحديد كيف يمكن تحويلها إلى رؤية تكشف الفرص والانخفاضات مبكرًا.',
    },
  },
};

function RelatedCaseStudy({ solutionSlug, ar }: { solutionSlug: string; ar: boolean }) {
  const { data: allStudies = [] } = useCaseStudies();
  const study = allStudies.find((s) => s.solution_slug === solutionSlug) ?? null;

  if (!study) return null;

  return (
    <ScrollReveal delay={0.32}>
      <h2 className="text-xl font-bold text-[#101418] mb-4">{ar ? 'دراسة حالة مرتبطة' : 'Related case study'}</h2>
      <Link
        to={`/case-studies/${study.slug}`}
        className="block border border-[#E5E5E5] rounded-2xl p-6 bg-[#FAFAFA] hover:border-[#6D5DF6] hover:shadow-md active:scale-[0.99] active:border-[#6D5DF6] transition-all duration-200"
      >
        <span className="text-[10px] px-2.5 py-1 bg-[#EEEAFE] text-[#6D5DF6] rounded-full font-semibold mb-3 inline-block">
          {parseSector(ar ? study.sector_ar : study.sector_en).tags}
        </span>
        <h3 className="text-base font-bold text-[#101418] mb-2">{ar ? study.title_ar : study.title_en}</h3>
        <p className="text-sm text-[#4F555E] mb-3">{ar ? study.outcome_ar : study.outcome_en}</p>
        <span className="inline-flex items-center gap-1.5 text-sm text-[#6D5DF6] font-semibold">
          {ar ? 'عرض دراسة الحالة' : 'View case study'} <ArrowRight size={13} />
        </span>
      </Link>
    </ScrollReveal>
  );
}

export function SolutionDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const ar = language === 'ar';
  const [formOpen, setFormOpen] = useState(false);
  const data = solutionData[slug || ''];
  const d = data ? (ar ? data.ar : data.en) : null;

  if (!d) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#101418] mb-4">{ar ? 'الصفحة غير موجودة' : 'Solution not found'}</h1>
          <Link to="/solutions" className="text-[#6D5DF6] hover:underline">{ar ? 'عرض جميع الحلول' : 'View all solutions'}</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${d.title} | Ensdim`}
        description={d.shortDesc}
        canonical={`/solutions/${slug}`}
        lang={ar ? 'ar' : 'en'}
      />
      <PageHero
        eyebrow={ar ? 'حلول إنسديم' : 'Ensdim Solutions'}
        title={d.title}
        subtitle={d.shortDesc}
        primaryCTA={{ label: ar ? 'احجز استشارة' : 'Book a consultation', href: '/book-consultation' }}
        secondaryCTA={{ label: ar ? 'عرض جميع الحلول' : 'View all solutions', href: '/solutions' }}
        breadcrumbs={[
          { label: 'Solutions', labelAr: 'الحلول', href: '/solutions' },
          { label: d.title, href: `/solutions/${slug}` },
        ]}
        lang={ar ? 'ar' : 'en'}
      />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-14">

          <ScrollReveal>
            <h2 className="text-xl font-bold text-[#101418] mb-3">{ar ? 'ما الذي يحله هذا الحل؟' : 'What does this solution solve?'}</h2>
            <p className="text-[#4F555E] text-sm leading-relaxed">{d.whatItSolves}</p>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <h2 className="text-xl font-bold text-[#101418] mb-4">{ar ? 'متى تحتاج هذا الحل؟' : 'When do you need this solution?'}</h2>
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
            <h2 className="text-xl font-bold text-[#101418] mb-3">{ar ? 'كيف يعمل الحل داخل عملك؟' : 'How does it work inside your business?'}</h2>
            <p className="text-[#4F555E] text-sm leading-relaxed">{d.howItWorks}</p>
          </ScrollReveal>

          <ScrollReveal delay={0.14}>
            <h2 className="text-xl font-bold text-[#101418] mb-5">{ar ? 'ماذا يمكن أن نقدمه لك؟' : 'What can we build for you?'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {d.whatWeBuild.map((m, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl">
                  <CheckCircle2 size={16} className="text-[#6D5DF6] flex-shrink-0" />
                  <span className="text-sm text-[#101418]">{m}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.18}>
            <h2 className="text-xl font-bold text-[#101418] mb-4">{ar ? 'العائد على البزنس' : 'Business ROI'}</h2>
            <ul className="space-y-2.5">
              {d.roi.map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#4F555E]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6D5DF6] mt-1.5 flex-shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.22}>
            <h2 className="text-xl font-bold text-[#101418] mb-4">{ar ? 'نتائج الأعمال' : 'Business outcomes'}</h2>
            <div className="border border-[#E5E5E5] rounded-2xl overflow-hidden divide-y divide-[#E5E5E5]">
              {d.outcomes.map((o, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 p-4 bg-[#FAFAFA]">
                  <span className="text-sm font-bold text-[#101418] sm:w-44 flex-shrink-0">{o.outcome}</span>
                  <span className="text-sm text-[#4F555E]">{o.explanation}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {d.relatedProblems.length > 0 && (
            <ScrollReveal delay={0.26}>
              <h2 className="text-xl font-bold text-[#101418] mb-4">{ar ? 'المشاكل المرتبطة بهذا الحل' : 'Related problems'}</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {d.relatedProblems.map((p, i) => (
                  <Link
                    key={i}
                    to={`/problems/${p.slug}`}
                    className="group flex items-center justify-between gap-3 px-5 py-4 bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl hover:border-[#6D5DF6] hover:shadow-md active:scale-[0.98] active:border-[#6D5DF6] transition-all duration-200"
                  >
                    <span className="text-sm font-medium text-[#101418]">{p.label}</span>
                    <ArrowRight size={14} className="text-[#6D5DF6] flex-shrink-0 group-hover:translate-x-0.5 group-active:translate-x-0.5 transition-transform" />
                  </Link>
                ))}
              </div>
            </ScrollReveal>
          )}

          <RelatedCaseStudy solutionSlug={slug || ''} ar={ar} />

        </div>
      </section>

      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-8">
            <h2 className="text-xl font-bold text-[#101418] mb-2">{d.ctaHeading}</h2>
            <p className="text-sm text-[#4F555E]">{d.ctaBody}</p>
          </ScrollReveal>
          <ScrollReveal>
            {formOpen ? (
              <ConsultationForm
                title={ar ? 'احجز استشارة لنشاطك.' : 'Book a consultation for your business.'}
                hiddenFields={{
                  source_page: `/solutions/${slug}`,
                  clicked_solution: d?.title || '',
                  interest_type: 'solution',
                }}
              />
            ) : (
              <div className="text-center bg-white rounded-2xl border border-[#E5E5E5] p-8 sm:p-10">
                <button
                  type="button"
                  onClick={() => setFormOpen(true)}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
                >
                  {ar ? 'احجز استشارة لنشاطك' : 'Book a consultation'}
                  <ArrowRight size={15} />
                </button>
              </div>
            )}
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
