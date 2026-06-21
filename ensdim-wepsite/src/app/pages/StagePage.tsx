import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Breadcrumb } from '../components/Breadcrumb';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';
import { getPublishedCaseStudies, type CaseStudy } from '../../lib/supabase';

/**
 * Solution/problem labels below use the new naming from the content brief.
 * They link to the closest existing solution/problem page until the
 * official solutions/problems content (with matching slugs) is delivered.
 * Two referenced problems ("Visitors are not turning into clear requests"
 * and "The data exists, but it is not helping you make decisions") have no
 * page yet and are intentionally omitted here to avoid broken links.
 */

interface LinkItem {
  label: string;
  slug: string;
}

interface StageContent {
  badge: string;
  breadcrumbLabel: string;
  title: string;
  subtitle: string;
  whoFor: string;
  whatHappens: string[];
  realProblem: string;
  whatWeBuild: string[];
  solutions: LinkItem[];
  roi: string[];
  problems: LinkItem[];
  ctaHeading: string;
  ctaBody: string;
  ctaButton: string;
}

const stageData: Record<'build' | 'start' | 'growth', { en: StageContent; ar: StageContent }> = {
  build: {
    en: {
      badge: 'Your Stage Now: Build',
      breadcrumbLabel: 'Build',
      title: 'Turn your idea into a scalable digital product',
      subtitle: 'This stage is for new businesses or projects starting from zero and needing a clear digital presence, understandable user experience, and an initial system that can receive customers, measure demand, and grow over time.',
      whoFor: 'The Build stage is right when you are launching a new project, introducing a service or product for the first time, or turning an unstructured idea into a digital experience that can be tested and measured. A beautiful website is not enough; the important question is whether the user understands, trusts, and takes the next step.',
      whatHappens: [
        'The idea is clear, but the digital customer experience is not yet structured.',
        'There is no website or landing page that explains the offer and captures requests clearly.',
        'Early requests arrive through WhatsApp or social media without clear tracking.',
        'You do not yet know which message or channel brings the most interested customers.',
        'You want to build something scalable instead of launching a temporary interface that will need rebuilding later.',
      ],
      realProblem: 'The real challenge in the Build stage is not simply whether you need a website. The real question is whether what you build will turn attention into trackable requests. A strong digital foundation combines clarity, conversion, tracking, and a user experience that moves people from understanding to action.',
      whatWeBuild: [
        'A website or landing page that explains the value and drives a clear next step.',
        'Clear messaging that explains what you offer and why customers should choose you.',
        'Request, booking, or inquiry forms that fit your service model.',
        'An initial lead capture path so early opportunities do not get lost in messages.',
        'Source tracking to understand which channels bring real opportunities.',
        'An initial CRM layer to organize requests and customer data from day one.',
        'Basic analytics to understand traffic, conversions, and drop-off points.',
      ],
      solutions: [
        { label: 'Visits that turn into clear requests', slug: 'digital-experiences' },
        { label: 'Follow-up that prevents lost opportunities', slug: 'follow-up-systems' },
        { label: 'Faster decisions instead of guessing', slug: 'visibility-insights' },
      ],
      roi: [
        'A more professional and trusted launch.',
        'Better conversion from visits into requests or bookings.',
        'Less complete dependence on WhatsApp from the beginning.',
        'Clearer visibility into customer sources before increasing marketing spend.',
        'A scalable foundation instead of rebuilding later.',
      ],
      problems: [
        { label: 'Customers and opportunities are lost before they turn into sales', slug: 'leads-get-lost' },
      ],
      ctaHeading: 'Do you have an idea and want to turn it into a scalable digital experience?',
      ctaBody: 'Tell us about your idea, how customers should reach you, and what action you want them to take. We will help you define the right digital foundation before building something that does not support growth.',
      ctaButton: 'Book a consultation to build the right foundation',
    },
    ar: {
      badge: 'مرحلتك الآن: بناء',
      breadcrumbLabel: 'بناء',
      title: 'حوّل فكرتك إلى منتج رقمي قابل للتوسع',
      subtitle: 'هذه المرحلة مناسبة للأعمال الجديدة أو المشاريع التي تبدأ من الصفر وتحتاج إلى حضور رقمي واضح، تجربة استخدام مفهومة، ونظام أولي يساعد على استقبال العملاء، قياس الطلب، وبناء أساس يمكن تطويره مع النمو.',
      whoFor: 'مرحلة بناء مناسبة إذا كنت تبدأ مشروعًا جديدًا، تطلق منتجًا أو خدمة لأول مرة، أو تريد تحويل فكرة غير منظمة إلى تجربة رقمية يمكن اختبارها وقياسها. في هذه المرحلة، لا يكفي أن تمتلك موقعًا جميلًا؛ الأهم أن يعرف العميل ماذا تقدم، لماذا يثق بك، وما الخطوة التالية التي يجب أن يأخذها.',
      whatHappens: [
        'الفكرة واضحة لديك، لكن تجربة العميل الرقمية لم تتشكل بعد.',
        'لا يوجد موقع أو صفحة هبوط تشرح العرض وتستقبل الطلبات بشكل منظم.',
        'الطلبات الأولى تصل من واتساب أو السوشيال بدون تسجيل أو متابعة واضحة.',
        'لا تعرف بعد أي رسالة أو قناة تجلب العملاء الأكثر اهتمامًا.',
        'تريد بناء شيء قابل للتطوير بدل إطلاق واجهة مؤقتة تضطر لإعادة بنائها لاحقًا.',
      ],
      realProblem: 'المشكلة الحقيقية في مرحلة بناء ليست "هل نحتاج موقعًا؟" بل: هل ما سنبنيه سيحوّل الاهتمام إلى طلبات قابلة للمتابعة؟ الأساس الرقمي الصحيح يجب أن يجمع بين الوضوح، التحويل، التتبع، وتجربة مستخدم تجعل العميل ينتقل من الفهم إلى الفعل.',
      whatWeBuild: [
        'موقع أو صفحة هبوط توضّح القيمة وتدفع العميل إلى خطوة محددة.',
        'رسالة واضحة تشرح ما تقدمه ولماذا يختارك العميل.',
        'نماذج طلب أو حجز أو استفسار مناسبة لطبيعة الخدمة.',
        'مسار أولي لتجميع العملاء المحتملين بدل ضياعهم في الرسائل.',
        'تتبع مصادر العملاء لمعرفة أي قناة تجلب فرصًا حقيقية.',
        'طبقة CRM أولية لتنظيم الطلبات والبيانات منذ البداية.',
        'تحليلات أساسية لمعرفة الزيارات والتحويلات ونقاط التوقف.',
      ],
      solutions: [
        { label: 'زيارات تتحول إلى طلبات', slug: 'digital-experiences' },
        { label: 'متابعة تمنع ضياع الفرص', slug: 'follow-up-systems' },
        { label: 'قرار أسرع بدل التخمين', slug: 'visibility-insights' },
      ],
      roi: [
        'إطلاق أكثر احترافًا وثقة أمام العملاء.',
        'تحويل أفضل من الزيارات إلى طلبات أو حجوزات.',
        'تقليل الاعتماد الكامل على واتساب منذ البداية.',
        'فهم أوضح لمصادر العملاء قبل زيادة الإنفاق التسويقي.',
        'بناء أساس قابل للتوسع بدل إعادة البناء لاحقًا.',
      ],
      problems: [
        { label: 'العملاء والفرص تضيع قبل ما تتحول لمبيعات', slug: 'leads-get-lost' },
      ],
      ctaHeading: 'هل لديك فكرة وتريد تحويلها إلى تجربة رقمية قابلة للنمو؟',
      ctaBody: 'شاركنا فكرة عملك، كيف تريد أن يصل العميل إليك، وما الخطوة التي تريد أن يأخذها. سنساعدك على تحديد الأساس الرقمي الأنسب قبل أن تبدأ في بناء شيء لا يخدم النمو.',
      ctaButton: 'احجز استشارة لبناء الأساس الصحيح',
    },
  },
  start: {
    en: {
      badge: 'Your Stage Now: Start',
      breadcrumbLabel: 'Start',
      title: 'Your digital presence is your opportunity to grow and scale',
      subtitle: 'This stage is for businesses that already exist and have customers, but need to turn that presence into an organized system for receiving customers, improving the digital experience, following up on opportunities, and building operational solutions that can evolve.',
      whoFor: 'The Start stage is right when your business is no longer just an idea. You have customers, social pages, possibly a website or campaigns, and a team handling daily inquiries. But you now feel that the next stage of growth requires more structure than replying to messages and managing requests manually.',
      whatHappens: [
        'You have customers and requests, but follow-up is spread across WhatsApp, Excel-like sheets, and calls.',
        'Your digital presence exists, but it does not turn interest into a clear path toward purchase or booking.',
        'The customer experience in communication, booking, or follow-up needs improvement.',
        'The team is busy, but management cannot easily see the status of each customer or opportunity.',
        'You want to digitize gradually without building a large, complex system from the start.',
      ],
      realProblem: 'The real challenge in the Start stage is that the business has proven its presence, but the operating method is no longer enough for the next stage. As customers and channels increase, opportunities can be lost, responses can slow down, customer experience can become inconsistent, and team pressure can rise. You need a system that turns your digital presence into an organized growth channel.',
      whatWeBuild: [
        'Improve the website or landing pages so they lead customers to clear requests.',
        'A system for capturing and organizing leads from different channels.',
        'A simple or custom CRM that shows the status of each customer and opportunity.',
        'Structured follow-up paths instead of relying on memory and scattered messages.',
        'Reminders and alerts for follow-up, booking, payment, or next steps.',
        'Connection between forms, WhatsApp, campaigns, or communication tools when needed.',
        'A management dashboard showing customer, request, and team status.',
        'Automation for repeated tasks to reduce manual pressure.',
        'Initial analytics to see where customers come from and where they stop.',
      ],
      solutions: [
        { label: 'Follow-up that prevents lost opportunities', slug: 'follow-up-systems' },
        { label: 'Visits that turn into clear requests', slug: 'digital-experiences' },
        { label: 'Lower cost and less pressure', slug: 'automation-layers' },
        { label: 'Scalable operations', slug: 'customer-journey-systems' },
      ],
      roi: [
        'Turn digital presence into a clear growth channel, not just a surface presence.',
        'Reduce lost customers and opportunities caused by scattered follow-up.',
        'Increase conversion from inquiry to booking or request.',
        'Improve customer experience across communication, booking, and follow-up.',
        'Reduce the pressure caused by manual follow-up.',
        'Build a system that can evolve later instead of starting again from zero.',
      ],
      problems: [
        { label: 'Customers and opportunities are lost before they turn into sales', slug: 'leads-get-lost' },
        { label: 'Follow-up is unclear, and opportunities get forgotten under pressure', slug: 'follow-up-memory' },
        { label: 'Slow response reduces trust and loses ready-to-buy customers', slug: 'slow-response' },
        { label: 'Manual operations drain the team and increase costs', slug: 'repeated-work' },
      ],
      ctaHeading: 'Do you already have digital presence but growth still feels unorganized?',
      ctaBody: 'Tell us how your business receives customers today and where opportunities or time are getting lost. We will help you identify the first digital path or system worth building at this stage.',
      ctaButton: 'Book a consultation to organize your growth path',
    },
    ar: {
      badge: 'مرحلتك الآن: انطلاق',
      breadcrumbLabel: 'انطلاق',
      title: 'وجودك الرقمي هو فرصتك للنمو والتوسع',
      subtitle: 'هذه المرحلة مناسبة للأعمال التي لديها وجود فعلي وعملاء بالفعل، لكنها تحتاج إلى تحويل هذا الوجود إلى نظام منظم يساعد على استقبال العملاء، تحسين التجربة الرقمية، متابعة الفرص، وبناء حلول تشغيل قابلة للتطوير.',
      whoFor: 'مرحلة انطلاق مناسبة للشركات التي تجاوزت فكرة البداية وأصبحت تعمل بالفعل: لديك عملاء، صفحات سوشيال، ربما موقع أو حملات، وفريق يتعامل مع الاستفسارات يوميًا. لكنك تشعر أن النمو القادم يحتاج تنظيمًا أكبر من مجرد الرد على الرسائل أو إدارة الطلبات يدويًا.',
      whatHappens: [
        'لديك عملاء وطلبات، لكن المتابعة ما زالت موزعة بين واتساب، اكسيل، والمكالمات.',
        'وجودك الرقمي موجود، لكنه لا يحوّل الاهتمام إلى مسار واضح للشراء أو الحجز.',
        'تجربة العميل في التواصل أو الحجز أو المتابعة تحتاج تحسينًا.',
        'الفريق يعمل كثيرًا، لكن الإدارة لا ترى حالة كل عميل أو كل فرصة بسهولة.',
        'تريد التحول الرقمي تدريجيًا بدون بناء نظام ضخم أو معقد من البداية.',
      ],
      realProblem: 'المشكلة الحقيقية في مرحلة الانطلاق أن العمل أثبت وجوده، لكن طريقة التشغيل لم تعد كافية للمرحلة التالية. كلما زاد عدد العملاء والقنوات، زادت احتمالية ضياع الفرص، تأخر الرد، اختلاف تجربة العميل، وارتفاع الضغط على الفريق. هنا تحتاج إلى نظام يحوّل وجودك الرقمي إلى قناة نمو منظمة.',
      whatWeBuild: [
        'تحسين الموقع أو صفحات الهبوط حتى تقود العميل إلى طلب واضح.',
        'نظام استقبال وتجميع للعملاء المحتملين من القنوات المختلفة.',
        'CRM بسيط أو مخصص يوضح حالة كل عميل وفرصة.',
        'مسارات متابعة منظمة بدل الاعتماد على الذاكرة والرسائل المتفرقة.',
        'تذكيرات وتنبيهات للمتابعة، الحجز، الدفع، أو الخطوة التالية.',
        'ربط النماذج، واتساب، الحملات، أو أدوات التواصل بنظام متابعة واحد عند الحاجة.',
        'لوحة متابعة للإدارة تعرض حالة العملاء، الطلبات، والفريق.',
        'أتمتة بعض المهام المتكررة لتقليل الضغط والعمل اليدوي.',
        'تحليلات أولية لمعرفة أين يأتي العملاء وأين يتوقفون.',
      ],
      solutions: [
        { label: 'متابعة تمنع ضياع الفرص', slug: 'follow-up-systems' },
        { label: 'زيارات تتحول إلى طلبات', slug: 'digital-experiences' },
        { label: 'تكلفة أقل وضغط أقل', slug: 'automation-layers' },
        { label: 'تشغيل قابل للتوسع', slug: 'customer-journey-systems' },
      ],
      roi: [
        'تحويل الوجود الرقمي إلى قناة واضحة للنمو بدل مجرد واجهة.',
        'تقليل ضياع العملاء والفرص بسبب التشتت.',
        'رفع التحويل من الاستفسار إلى حجز أو طلب.',
        'تحسين تجربة العميل في التواصل والحجز والمتابعة.',
        'تقليل الضغط على الفريق الناتج عن المتابعة اليدوية.',
        'بناء نظام يمكن تطويره لاحقًا بدل البدء من الصفر عند التوسع.',
      ],
      problems: [
        { label: 'العملاء والفرص تضيع قبل ما تتحول لمبيعات', slug: 'leads-get-lost' },
        { label: 'المتابعة غير واضحة… والفرص تُنسى وسط الضغط', slug: 'follow-up-memory' },
        { label: 'الرد المتأخر يقلل الثقة ويخسر عملاء جاهزين', slug: 'slow-response' },
        { label: 'التشغيل اليدوي يستهلك الفريق ويرفع التكلفة', slug: 'repeated-work' },
      ],
      ctaHeading: 'هل لديك وجود رقمي لكن النمو ما زال غير منظم؟',
      ctaBody: 'شاركنا كيف يستقبل عملك العملاء الآن، وأين تشعر أن الفرص أو الوقت يضيع. سنساعدك على تحديد أول نظام أو مسار رقمي يستحق البناء في هذه المرحلة.',
      ctaButton: 'احجز استشارة لتنظيم الانطلاق',
    },
  },
  growth: {
    en: {
      badge: 'Your Stage Now: Growth',
      breadcrumbLabel: 'Growth',
      title: 'Turn growth from cost and pressure into control and profitability',
      subtitle: 'This stage is for businesses with real customers and active operations, but growth is starting to create more pressure, scattered data, and slower decisions. We help you build data layers, automation, practical intelligence, and operational security that make scaling easier to manage.',
      whoFor: 'The Growth stage is right when the business has become bigger than manual follow-up. You have customers, data, a team, repeated operations, and possibly multiple channels, branches, or services. The question is no longer how to start, but how to scale without multiplying chaos and cost at the same speed.',
      whatHappens: [
        'Data exists in more than one place, but management cannot see the full picture quickly.',
        'Reports take time and effort, and sometimes arrive after the decision window has passed.',
        'Repeated operations consume the team instead of being automated.',
        'Growth increases dependence on people instead of strengthening the system.',
        'Opportunities and drops are discovered only after they have already affected results.',
        'Permissions and data protection become more important as the team and work expand.',
      ],
      realProblem: 'The real challenge in the Growth stage is not that you need more technology. You need higher operational capability. You need to see numbers faster, automate what repeats, use intelligence to detect opportunities and risks, and protect your data and team permissions so expansion does not become a larger form of chaos.',
      whatWeBuild: [
        'Management dashboards for performance, sales, customers, channels, and branches.',
        'Data organization and source connection instead of scattered website, campaign, sheet, sales, and operations data.',
        'Automation for repeated processes such as follow-up, alerts, reports, escalation, or task distribution.',
        'Practical AI layers for conversation summaries, opportunity detection, customer classification, or operational recommendations.',
        'Performance monitoring systems that reveal where conversion drops or pressure accumulates.',
        'Internal permissions and security to protect data and organize team access.',
        'Recurring reports and alerts that help detect problems and opportunities before they become losses.',
      ],
      solutions: [
        { label: 'Faster decisions instead of guessing', slug: 'visibility-insights' },
        { label: 'Lower cost and less pressure', slug: 'automation-layers' },
        { label: 'Scalable operations', slug: 'customer-journey-systems' },
        { label: 'Smart visibility that detects opportunities early', slug: 'ai-practical-decisions' },
        { label: 'Follow-up that prevents lost opportunities', slug: 'follow-up-systems' },
      ],
      roi: [
        'Faster decisions based on data instead of guesswork.',
        'Less time wasted on manual reports and follow-up.',
        'Earlier detection of drops and opportunities before losses build up.',
        'Less pressure on the team as work volume increases.',
        'More consistent customer experience while scaling.',
        'Better data protection and permission control as the company grows.',
        'A foundation ready for more advanced intelligence and operations layers later.',
      ],
      problems: [
        { label: 'Management cannot see the full picture in time', slug: 'no-visibility' },
        { label: 'Manual operations drain the team and increase costs', slug: 'repeated-work' },
        { label: 'Growth has become pressure instead of higher profit', slug: 'growth-pressure' },
        { label: 'Follow-up is unclear, and opportunities get forgotten under pressure', slug: 'follow-up-memory' },
      ],
      ctaHeading: 'Do you want to scale without losing operational control?',
      ctaBody: 'Tell us where your data lives now, which process consumes the most team time, and which decision you need to see faster. We will help you define the right growth layer: data, automation, intelligence, security, or scalable operations.',
      ctaButton: 'Book a consultation to scale smarter',
    },
    ar: {
      badge: 'مرحلتك الآن: نمو',
      breadcrumbLabel: 'نمو',
      title: 'حوّل النمو من تكلفة وضغط إلى سيطرة وربح',
      subtitle: 'هذه المرحلة مناسبة للأعمال التي لديها عملاء وتشغيل قائم، لكنها بدأت تشعر أن النمو يزيد الضغط، يشتّت البيانات، ويجعل القرارات أبطأ. نساعدك على بناء طبقات بيانات، أتمتة، ذكاء عملي، وأمان تشغيلي تجعل التوسع أكثر قابلية للإدارة.',
      whoFor: 'مرحلة نمو مناسبة للأعمال التي أصبحت أكبر من قدرة المتابعة اليدوية: لديك عملاء، بيانات، فريق، عمليات متكررة، وربما أكثر من قناة أو فرع أو خدمة. هنا لا يكون السؤال كيف نبدأ، بل كيف نكبر بدون أن تتضاعف الفوضى والتكلفة بنفس سرعة النمو.',
      whatHappens: [
        'البيانات موجودة في أكثر من مكان، لكن الإدارة لا ترى الصورة الكاملة بسرعة.',
        'التقارير تحتاج وقتًا وجهدًا، وأحيانًا تصل بعد فوات وقت القرار.',
        'العمليات المتكررة تستهلك الفريق بدل أن يتم أتمتتها.',
        'النمو يزيد الاعتماد على الأشخاص بدل أن يزيد قوة النظام.',
        'الفرص والانخفاضات لا تُكتشف مبكرًا إلا بعد ظهور أثرها في النتائج.',
        'الصلاحيات وحماية البيانات أصبحت أكثر أهمية مع توسع الفريق والعمل.',
      ],
      realProblem: 'المشكلة الحقيقية في مرحلة النمو ليست أنك تحتاج تكنولوجيا أكثر، بل أنك تحتاج قدرة تشغيلية أعلى. تحتاج أن ترى الأرقام بسرعة، تؤتمت ما يتكرر، تستخدم الذكاء في اكتشاف الفرص والمخاطر، وتحمي بياناتك وصلاحيات فريقك حتى لا يتحول التوسع إلى فوضى أكبر.',
      whatWeBuild: [
        'لوحات تحكم للإدارة تعرض الأداء، المبيعات، العملاء، القنوات، والفروع.',
        'تنظيم البيانات وربط مصادرها بدل تشتتها بين الموقع، الحملات، اكسيل، أنظمة المبيعات، أو أدوات التشغيل.',
        'أتمتة العمليات المتكررة مثل المتابعة، التنبيهات، التقارير، التصعيد، أو توزيع المهام.',
        'طبقات ذكاء اصطناعي عملية لتلخيص المحادثات، اكتشاف الفرص، تصنيف العملاء، أو تقديم توصيات تشغيلية.',
        'أنظمة متابعة وتحسين للأداء تكشف أين ينخفض التحويل أو يتراكم الضغط.',
        'صلاحيات وأمان داخلي لحماية البيانات وتنظيم وصول الفريق إليها.',
        'تقارير دورية وتنبيهات تساعد على اكتشاف المشاكل والفرص قبل أن تتحول إلى خسارة.',
      ],
      solutions: [
        { label: 'قرار أسرع بدل التخمين', slug: 'visibility-insights' },
        { label: 'تكلفة أقل وضغط أقل', slug: 'automation-layers' },
        { label: 'تشغيل قابل للتوسع', slug: 'customer-journey-systems' },
        { label: 'رؤية ذكية تكشف الفرص مبكرًا', slug: 'ai-practical-decisions' },
        { label: 'متابعة تمنع ضياع الفرص', slug: 'follow-up-systems' },
      ],
      roi: [
        'قرارات أسرع مبنية على بيانات بدل التخمين.',
        'تقليل الوقت الضائع في التقارير والمتابعة اليدوية.',
        'اكتشاف مبكر للانخفاضات والفرص قبل أن تتراكم الخسارة.',
        'تقليل الضغط على الفريق مع زيادة حجم العمل.',
        'تجربة عميل أكثر ثباتًا مع التوسع.',
        'حماية أفضل للبيانات والصلاحيات مع نمو الشركة.',
        'بناء بنية قابلة لإضافة طبقات ذكاء وتشغيل أكثر تقدمًا لاحقًا.',
      ],
      problems: [
        { label: 'الإدارة لا ترى الصورة كاملة في الوقت المناسب', slug: 'no-visibility' },
        { label: 'التشغيل اليدوي يستهلك الفريق ويرفع التكلفة', slug: 'repeated-work' },
        { label: 'النمو أصبح ضغطًا بدل أن يزيد الأرباح', slug: 'growth-pressure' },
        { label: 'المتابعة غير واضحة… والفرص تُنسى وسط الضغط', slug: 'follow-up-memory' },
      ],
      ctaHeading: 'هل تريد التوسع بدون أن تفقد السيطرة على التشغيل؟',
      ctaBody: 'شاركنا أين تتجمع بياناتك الآن، ما أكثر عملية تستهلك وقت فريقك، وما القرار الذي تحتاج أن تراه بشكل أسرع. سنساعدك على تحديد طبقة النمو المناسبة: بيانات، أتمتة، ذكاء، أمان، أو تشغيل قابل للتوسع.',
      ctaButton: 'احجز استشارة لتوسيع عملك بذكاء',
    },
  },
};

interface StagePageProps {
  stage: 'build' | 'start' | 'growth';
}

function RelatedCaseStudies({ solutionSlugs, ar }: { solutionSlugs: string[]; ar: boolean }) {
  const [studies, setStudies] = useState<CaseStudy[]>([]);

  useEffect(() => {
    getPublishedCaseStudies()
      .then((all) => setStudies(all.filter((s) => solutionSlugs.includes(s.solution_slug)).slice(0, 3)))
      .catch(() => setStudies([]));
  }, [solutionSlugs]);

  if (studies.length === 0) return null;

  return (
    <ScrollReveal delay={0.28}>
      <h2 className="text-xl font-bold text-white mb-4">{ar ? 'دراسات حالة مرتبطة' : 'Related case studies'}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {studies.map((s) => (
          <Link
            key={s.slug}
            to={`/case-studies/${s.slug}`}
            className="block border border-white/10 rounded-2xl p-5 hover:border-[#6D5DF6]/50 hover:bg-white/5 active:scale-[0.99] transition-all duration-200"
          >
            <span className="text-[10px] px-2.5 py-1 bg-[#6D5DF6]/15 text-[#EEEAFE] rounded-full font-semibold mb-3 inline-block">
              {ar ? s.sector_ar : s.sector_en}
            </span>
            <h3 className="text-sm font-bold text-white mb-2 leading-snug">{ar ? s.title_ar : s.title_en}</h3>
            <span className="inline-flex items-center gap-1.5 text-xs text-[#6D5DF6] font-medium">
              {ar ? 'عرض دراسة الحالة' : 'View case study'} <ArrowRight size={12} />
            </span>
          </Link>
        ))}
      </div>
    </ScrollReveal>
  );
}

export function StagePage({ stage }: StagePageProps) {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const d = ar ? stageData[stage].ar : stageData[stage].en;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <SEO
        title={`${d.title} | ENSDIM`}
        description={d.subtitle}
        canonical={`/solutions/${stage}`}
        lang={ar ? 'ar' : 'en'}
      />
      <section className="pt-24 pb-14 sm:pt-32 sm:pb-20 relative overflow-hidden bg-[#0f0d19] text-white">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 30% 50%, rgba(59,42,120,0.22) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: 'Solutions', labelAr: 'الحلول', href: '/solutions' },
                { label: 'Where Your Business Is Now', labelAr: 'أين عملك الآن', href: '/solutions#where-now' },
                { label: d.breadcrumbLabel, href: `/solutions/${stage}` },
              ]}
              lang={ar ? 'ar' : 'en'}
            />
          </div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5 uppercase tracking-wider bg-[#6D5DF6]/15 border border-[#6D5DF6]/20 text-[#EEEAFE]/80">
            {d.badge}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight text-white">{d.title}</h1>
          <p className="text-base sm:text-lg max-w-2xl leading-relaxed mb-8 text-[#EEEAFE]/75">{d.subtitle}</p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => scrollTo('stage-solutions')}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] transition-colors text-sm font-semibold"
            >
              {ar ? 'اكتشف الحلول المناسبة لهذه المرحلة' : 'Discover the right solutions for this stage'}
              <ArrowRight size={15} />
            </button>
            <button
              type="button"
              onClick={() => scrollTo('stage-cta')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-white/20 text-white/80 hover:border-white/40 hover:text-white transition-colors text-sm font-semibold"
            >
              {ar ? 'احجز استشارة' : 'Book a consultation'}
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
          <ScrollReveal>
            <h2 className="text-xl font-bold text-[#101418] mb-3">{ar ? 'لمن هذه المرحلة؟' : 'Who is this stage for?'}</h2>
            <p className="text-sm text-[#4F555E] leading-relaxed">{d.whoFor}</p>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <h2 className="text-xl font-bold text-[#101418] mb-4">{ar ? 'ما الذي يحدث غالبًا في هذه المرحلة؟' : 'What usually happens at this stage?'}</h2>
            <ul className="space-y-2.5">
              {d.whatHappens.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#4F555E]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D63A3A] mt-1.5 flex-shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="bg-[#EEEAFE] rounded-2xl p-6">
              <p className="text-xs font-semibold text-[#6D5DF6] uppercase tracking-wider mb-2">
                {ar ? 'المشكلة الحقيقية في هذه المرحلة' : 'The real challenge at this stage'}
              </p>
              <p className="text-sm text-[#101418] leading-relaxed">{d.realProblem}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.14}>
            <h2 className="text-xl font-bold text-[#101418] mb-4">{ar ? 'ماذا يمكن أن نبني لك؟' : 'What can we build for you?'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {d.whatWeBuild.map((m, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-[#6D5DF6] flex-shrink-0" />
                  <span className="text-sm text-[#101418]">{m}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.18}>
            <div id="stage-solutions" className="scroll-mt-24">
              <h2 className="text-xl font-bold text-[#101418] mb-4">{ar ? 'الحلول المناسبة لهذه المرحلة' : 'Recommended solutions for this stage'}</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {d.solutions.map((s, i) => (
                  <Link
                    key={i}
                    to={`/solutions/${s.slug}`}
                    className="group flex items-center justify-between gap-3 px-5 py-4 bg-white border border-[#E5E5E5] rounded-xl hover:border-[#6D5DF6] hover:shadow-md active:scale-[0.98] active:border-[#6D5DF6] transition-all duration-200"
                  >
                    <span className="text-sm font-semibold text-[#101418]">{s.label}</span>
                    <ArrowRight size={14} className="text-[#6D5DF6] flex-shrink-0 group-hover:translate-x-0.5 group-active:translate-x-0.5 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.22}>
            <h2 className="text-xl font-bold text-[#101418] mb-4">{ar ? 'ما العائد على البزنس؟' : 'Business ROI'}</h2>
            <ul className="space-y-2.5">
              {d.roi.map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#4F555E]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6D5DF6] mt-1.5 flex-shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {d.problems.length > 0 && (
            <ScrollReveal delay={0.26}>
              <h2 className="text-xl font-bold text-[#101418] mb-4">{ar ? 'المشكلات المرتبطة بهذه المرحلة' : 'Related problems for this stage'}</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {d.problems.map((p, i) => (
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
        </div>
      </section>

      <section className="py-16 bg-[#0f0d19]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <RelatedCaseStudies solutionSlugs={d.solutions.map((s) => s.slug)} ar={ar} />

          <div id="stage-cta" className="scroll-mt-24 mt-12 bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-3">{d.ctaHeading}</h2>
            <p className="text-[#EEEAFE]/75 text-sm mb-5 max-w-xl mx-auto">{d.ctaBody}</p>
            <Link
              to="/book-consultation"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#6D5DF6] text-white rounded-xl hover:bg-[#5d4de6] transition-colors text-sm font-semibold"
            >
              {d.ctaButton} <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
