import { useParams, Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHero } from '../components/PageHero';
import { ScrollReveal } from '../components/ScrollReveal';
import { JobApplicationForm } from '../components/JobApplicationForm';
import { SEO } from '../components/SEO';

const roleData: Record<string, {
  en: { title: string; subtitle: string; responsibilities?: string[]; requirements?: string[]; niceToHave?: string[]; isGeneralApplication?: boolean };
  ar: { title: string; subtitle: string; responsibilities?: string[]; requirements?: string[]; niceToHave?: string[]; isGeneralApplication?: boolean };
}> = {
  'general-application': {
    en: {
      title: 'Send us your profile',
      subtitle: 'If you believe your skills can help ENSDIM build smarter business systems, send your profile and tell us where you can contribute.',
      isGeneralApplication: true,
    },
    ar: {
      title: 'أرسل ملفك التعريفي',
      subtitle: 'إذا كنت ترى أن مهاراتك يمكن أن تساعد إنسديم في بناء أنظمة أعمال أذكى، أرسل ملفك التعريفي وأخبرنا أين يمكنك المساهمة.',
      isGeneralApplication: true,
    },
  },
  'ux-researcher': {
    en: {
      title: 'UX Researcher',
      subtitle: 'Help us understand how business users interact with systems and uncover insights to improve their experience.',
      responsibilities: ['Conduct user research for CRM and business systems', 'Analyze user behavior and identify pain points', 'Create research reports and actionable recommendations', 'Collaborate with product and design teams'],
      requirements: ['Experience in UX research methods', 'Strong analytical and communication skills', 'Understanding of business software contexts', 'Remote work discipline'],
      niceToHave: ['Experience with B2B or operations software', 'Gulf / MENA market context', 'Arabic language skills'],
    },
    ar: {
      title: 'باحث تجربة المستخدم',
      subtitle: 'ساعدنا على فهم كيفية تفاعل مستخدمي الأعمال مع الأنظمة واكتشاف رؤى لتحسين تجربتهم.',
      responsibilities: ['إجراء أبحاث المستخدم لأنظمة CRM والأعمال', 'تحليل سلوك المستخدم وتحديد نقاط الألم', 'إنشاء تقارير بحثية وتوصيات قابلة للتنفيذ', 'التعاون مع فرق المنتج والتصميم'],
      requirements: ['خبرة في أساليب بحث تجربة المستخدم', 'مهارات تحليلية وتواصل قوية', 'فهم سياقات برامج الأعمال', 'انضباط في العمل عن بُعد'],
      niceToHave: ['خبرة مع برامج B2B أو التشغيل', 'سياق سوق الخليج', 'مهارات اللغة العربية'],
    },
  },
  'user-behavior-researcher': {
    en: {
      title: 'User Behavior Researcher',
      subtitle: 'Investigate how users make decisions and behave within business systems to inform better product design.',
      responsibilities: ['Study user decision-making patterns', 'Analyze behavioral data and usage metrics', 'Design experiments and A/B tests', 'Provide behavioral insights to product teams'],
      requirements: ['Background in behavioral research or psychology', 'Data analysis and research methodology', 'Strong communication of insights', 'Comfortable with remote collaboration'],
      niceToHave: ['Experience with B2B SaaS products', 'Behavioral economics knowledge', 'Arabic market understanding'],
    },
    ar: {
      title: 'باحث سلوك المستخدم',
      subtitle: 'ابحث في كيفية اتخاذ المستخدمين للقرارات وسلوكهم داخل أنظمة الأعمال لتوجيه تصميم منتج أفضل.',
      responsibilities: ['دراسة أنماط اتخاذ قرارات المستخدم', 'تحليل البيانات السلوكية ومقاييس الاستخدام', 'تصميم التجارب واختبارات A/B', 'تقديم رؤى سلوكية لفرق المنتج'],
      requirements: ['خلفية في البحث السلوكي أو علم النفس', 'تحليل البيانات ومنهجية البحث', 'تواصل قوي للرؤى', 'راحة في التعاون عن بُعد'],
      niceToHave: ['خبرة مع منتجات B2B SaaS', 'معرفة الاقتصاد السلوكي', 'فهم السوق العربي'],
    },
  },
  'behavioral-psychology-researcher': {
    en: {
      title: 'Behavioral Psychology Researcher',
      subtitle: 'Apply behavioral psychology principles to improve how business systems influence user actions and outcomes.',
      responsibilities: ['Research behavioral patterns in business contexts', 'Design nudges and behavioral interventions', 'Analyze psychological factors affecting user engagement', 'Work with product teams to implement behavioral strategies'],
      requirements: ['Background in behavioral psychology', 'Research design and analysis skills', 'Clear communication of complex concepts', 'Remote-first mindset'],
      niceToHave: ['Applied behavioral science experience', 'Understanding of business operations', 'Arabic language proficiency'],
    },
    ar: {
      title: 'باحث في علم النفس السلوكي',
      subtitle: 'طبّق مبادئ علم النفس السلوكي لتحسين كيفية تأثير أنظمة الأعمال على إجراءات المستخدم ونتائجه.',
      responsibilities: ['بحث الأنماط السلوكية في سياقات الأعمال', 'تصميم التنبيهات والتدخلات السلوكية', 'تحليل العوامل النفسية المؤثرة على مشاركة المستخدم', 'العمل مع فرق المنتج لتنفيذ استراتيجيات سلوكية'],
      requirements: ['خلفية في علم النفس السلوكي', 'مهارات تصميم البحث والتحليل', 'توصيل واضح للمفاهيم المعقدة', 'عقلية العمل عن بُعد أولاً'],
      niceToHave: ['خبرة في العلوم السلوكية التطبيقية', 'فهم عمليات الأعمال', 'إتقان اللغة العربية'],
    },
  },
  'market-researcher': {
    en: {
      title: 'Market Researcher',
      subtitle: 'Conduct market research to understand customer needs, competitive landscape, and market opportunities.',
      responsibilities: ['Conduct market analysis and competitive research', 'Identify customer segments and needs', 'Gather insights on market trends and opportunities', 'Support strategy and product decisions with data'],
      requirements: ['Market research experience', 'Strong analytical and presentation skills', 'Comfortable with qualitative and quantitative methods', 'Remote work style'],
      niceToHave: ['Gulf / MENA market expertise', 'B2B SaaS research background', 'Arabic language skills'],
    },
    ar: {
      title: 'باحث سوق',
      subtitle: 'أجرِ أبحاث السوق لفهم احتياجات العملاء والمشهد التنافسي وفرص السوق.',
      responsibilities: ['إجراء تحليل السوق والبحث التنافسي', 'تحديد شرائح العملاء واحتياجاتهم', 'جمع رؤى حول اتجاهات السوق والفرص', 'دعم قرارات الاستراتيجية والمنتج بالبيانات'],
      requirements: ['خبرة في أبحاث السوق', 'مهارات تحليلية وعرض قوية', 'راحة مع الأساليب النوعية والكمية', 'أسلوب العمل عن بُعد'],
      niceToHave: ['خبرة في سوق الخليج', 'خلفية بحث B2B SaaS', 'مهارات اللغة العربية'],
    },
  },
  'marketing-strategist': {
    en: {
      title: 'Marketing Strategist',
      subtitle: 'Develop and execute marketing strategies to position ENSDIM and drive business growth.',
      responsibilities: ['Develop marketing strategies and campaigns', 'Position products and messaging for target markets', 'Analyze marketing performance and optimize', 'Collaborate with sales and product teams'],
      requirements: ['Marketing strategy experience', 'Strong communication and analytical skills', 'Understanding of B2B marketing', 'Remote collaboration skills'],
      niceToHave: ['Gulf / MENA market experience', 'SaaS or tech product marketing', 'Arabic content strategy experience'],
    },
    ar: {
      title: 'استراتيجي تسويق',
      subtitle: 'طوّر ونفّذ استراتيجيات التسويق لوضع إنسديم ودفع نمو الأعمال.',
      responsibilities: ['تطوير استراتيجيات وحملات التسويق', 'وضع المنتجات والرسائل للأسواق المستهدفة', 'تحليل أداء التسويق والتحسين', 'التعاون مع فرق المبيعات والمنتج'],
      requirements: ['خبرة استراتيجية تسويق', 'مهارات تواصل وتحليل قوية', 'فهم تسويق B2B', 'مهارات التعاون عن بُعد'],
      niceToHave: ['خبرة سوق الخليج', 'تسويق منتجات SaaS أو تقنية', 'خبرة استراتيجية محتوى عربي'],
    },
  },
  'market-research-specialist': {
    en: {
      title: 'Market Research Specialist',
      subtitle: 'Gather and analyze market data to support strategic and product decisions.',
      responsibilities: ['Conduct primary and secondary market research', 'Analyze customer feedback and market trends', 'Create research reports and presentations', 'Support go-to-market strategies with insights'],
      requirements: ['Market research and analysis experience', 'Strong reporting and communication skills', 'Familiarity with research tools and methods', 'Remote work discipline'],
      niceToHave: ['Gulf / MENA market knowledge', 'B2B research experience', 'Arabic research capabilities'],
    },
    ar: {
      title: 'متخصص أبحاث سوق',
      subtitle: 'اجمع وحلّل بيانات السوق لدعم القرارات الاستراتيجية والمنتج.',
      responsibilities: ['إجراء أبحاث سوق أولية وثانوية', 'تحليل ملاحظات العملاء واتجاهات السوق', 'إنشاء تقارير بحثية وعروض تقديمية', 'دعم استراتيجيات الدخول إلى السوق بالرؤى'],
      requirements: ['خبرة في أبحاث وتحليل السوق', 'مهارات تقارير وتواصل قوية', 'معرفة بأدوات وأساليب البحث', 'انضباط في العمل عن بُعد'],
      niceToHave: ['معرفة سوق الخليج', 'خبرة بحث B2B', 'قدرات بحث عربية'],
    },
  },
  'public-relations-specialist': {
    en: {
      title: 'Public Relations Specialist',
      subtitle: 'Build and manage ENSDIM\'s public image, media relations, and brand reputation.',
      responsibilities: ['Develop PR strategies and campaigns', 'Manage media relationships and press releases', 'Handle brand reputation and communication', 'Coordinate with marketing and leadership teams'],
      requirements: ['PR and communications experience', 'Strong writing and relationship skills', 'Media relations background', 'Remote collaboration ability'],
      niceToHave: ['Gulf / MENA media network', 'Tech or SaaS PR experience', 'Bilingual Arabic/English communication'],
    },
    ar: {
      title: 'متخصص علاقات عامة',
      subtitle: 'ابنِ وأدر صورة إنسديم العامة وعلاقات الإعلام وسمعة العلامة التجارية.',
      responsibilities: ['تطوير استراتيجيات وحملات العلاقات العامة', 'إدارة علاقات الإعلام والبيانات الصحفية', 'التعامل مع سمعة العلامة التجارية والاتصال', 'التنسيق مع فرق التسويق والقيادة'],
      requirements: ['خبرة في العلاقات العامة والاتصالات', 'مهارات كتابة وعلاقات قوية', 'خلفية علاقات إعلامية', 'قدرة التعاون عن بُعد'],
      niceToHave: ['شبكة إعلام الخليج', 'خبرة علاقات عامة للتقنية أو SaaS', 'اتصال ثنائي اللغة عربي/إنجليزي'],
    },
  },
  'sales-specialist': {
    en: {
      title: 'Sales Specialist',
      subtitle: 'Drive revenue by engaging prospects, closing deals, and building long-term client relationships.',
      responsibilities: ['Engage and qualify prospects', 'Conduct sales presentations and demos', 'Close deals and negotiate contracts', 'Maintain client relationships and upsell'],
      requirements: ['B2B sales experience', 'Strong communication and negotiation skills', 'Goal-oriented and self-driven', 'Remote sales capability'],
      niceToHave: ['Gulf / MENA market sales experience', 'SaaS or tech product sales', 'Arabic sales communication'],
    },
    ar: {
      title: 'متخصص مبيعات',
      subtitle: 'ادفع الإيرادات من خلال التواصل مع العملاء المحتملين وإغلاق الصفقات وبناء علاقات عملاء طويلة الأمد.',
      responsibilities: ['التواصل مع العملاء المحتملين وتأهيلهم', 'إجراء عروض مبيعات وعروض توضيحية', 'إغلاق الصفقات والتفاوض على العقود', 'الحفاظ على علاقات العملاء والبيع الإضافي'],
      requirements: ['خبرة مبيعات B2B', 'مهارات تواصل وتفاوض قوية', 'موجه نحو الهدف ومدفوع ذاتيًا', 'قدرة مبيعات عن بُعد'],
      niceToHave: ['خبرة مبيعات سوق الخليج', 'مبيعات منتجات SaaS أو تقنية', 'تواصل مبيعات عربي'],
    },
  },
  'business-developer': {
    en: {
      title: 'Business Developer',
      subtitle: 'Identify and develop new business opportunities, partnerships, and growth channels.',
      responsibilities: ['Identify new business opportunities', 'Build partnerships and strategic relationships', 'Support market expansion efforts', 'Collaborate with sales and product teams'],
      requirements: ['Business development experience', 'Strong networking and relationship skills', 'Strategic thinking and execution', 'Remote work comfort'],
      niceToHave: ['Gulf / MENA business network', 'Tech or SaaS business development', 'Arabic business communication'],
    },
    ar: {
      title: 'مطور أعمال',
      subtitle: 'حدّد وطوّر فرص أعمال جديدة وشراكات وقنوات نمو.',
      responsibilities: ['تحديد فرص أعمال جديدة', 'بناء شراكات وعلاقات استراتيجية', 'دعم جهود التوسع في السوق', 'التعاون مع فرق المبيعات والمنتج'],
      requirements: ['خبرة تطوير الأعمال', 'مهارات شبكات وعلاقات قوية', 'تفكير استراتيجي وتنفيذ', 'راحة في العمل عن بُعد'],
      niceToHave: ['شبكة أعمال الخليج', 'تطوير أعمال تقنية أو SaaS', 'تواصل أعمال عربي'],
    },
  },
  'behavioral-economics-consultant': {
    en: {
      title: 'Behavioral Economics Consultant',
      subtitle: 'Apply behavioral economics principles to improve business systems, decision-making, and customer outcomes.',
      responsibilities: ['Apply behavioral economics to product design', 'Design choice architecture and nudges', 'Analyze decision-making patterns', 'Advise on behavioral strategies'],
      requirements: ['Behavioral economics background', 'Analytical and strategic thinking', 'Clear communication of complex ideas', 'Remote consulting capability'],
      niceToHave: ['Applied behavioral economics experience', 'Business or operations context', 'Gulf market understanding'],
    },
    ar: {
      title: 'استشاري اقتصاد سلوكي',
      subtitle: 'طبّق مبادئ الاقتصاد السلوكي لتحسين أنظمة الأعمال واتخاذ القرارات ونتائج العملاء.',
      responsibilities: ['تطبيق الاقتصاد السلوكي على تصميم المنتج', 'تصميم هندسة الاختيار والتنبيهات', 'تحليل أنماط اتخاذ القرار', 'تقديم المشورة بشأن الاستراتيجيات السلوكية'],
      requirements: ['خلفية في الاقتصاد السلوكي', 'تفكير تحليلي واستراتيجي', 'توصيل واضح للأفكار المعقدة', 'قدرة استشارية عن بُعد'],
      niceToHave: ['خبرة اقتصاد سلوكي تطبيقي', 'سياق أعمال أو عمليات', 'فهم سوق الخليج'],
    },
  },
  'ui-ux-designer': {
    en: {
      title: 'UI/UX Designer',
      subtitle: 'Design intuitive and effective interfaces for business systems that users love to use.',
      responsibilities: ['Design user interfaces for web and mobile', 'Create wireframes, prototypes, and design systems', 'Conduct usability testing and iterate', 'Collaborate with product and engineering teams'],
      requirements: ['UI/UX design experience', 'Proficiency with design tools (Figma, etc.)', 'Understanding of user-centered design', 'Remote design workflow'],
      niceToHave: ['B2B or SaaS design experience', 'Design system building experience', 'Arabic UI/UX considerations'],
    },
    ar: {
      title: 'مصمم UI/UX',
      subtitle: 'صمّم واجهات بديهية وفعّالة لأنظمة الأعمال التي يحب المستخدمون استخدامها.',
      responsibilities: ['تصميم واجهات المستخدم للويب والموبايل', 'إنشاء إطارات سلكية ونماذج أولية وأنظمة تصميم', 'إجراء اختبارات قابلية الاستخدام والتكرار', 'التعاون مع فرق المنتج والهندسة'],
      requirements: ['خبرة تصميم UI/UX', 'إتقان أدوات التصميم (Figma، إلخ)', 'فهم التصميم المتمحور حول المستخدم', 'سير عمل تصميم عن بُعد'],
      niceToHave: ['خبرة تصميم B2B أو SaaS', 'خبرة بناء نظام التصميم', 'اعتبارات UI/UX العربية'],
    },
  },
  'product-designer': {
    en: {
      title: 'Product Designer',
      subtitle: 'Shape product experiences from concept to launch, balancing user needs with business goals.',
      responsibilities: ['Design end-to-end product experiences', 'Conduct user research and testing', 'Create prototypes and design specifications', 'Work closely with product and engineering'],
      requirements: ['Product design experience', 'Strong design and research skills', 'User-centered and business-aware', 'Remote collaboration comfort'],
      niceToHave: ['B2B product design experience', 'Design systems knowledge', 'Arabic product context understanding'],
    },
    ar: {
      title: 'مصمم منتج',
      subtitle: 'شكّل تجارب المنتج من المفهوم إلى الإطلاق، موازنة احتياجات المستخدم مع أهداف العمل.',
      responsibilities: ['تصميم تجارب منتج شاملة', 'إجراء أبحاث واختبار المستخدم', 'إنشاء نماذج أولية ومواصفات تصميم', 'العمل عن كثب مع المنتج والهندسة'],
      requirements: ['خبرة تصميم منتج', 'مهارات تصميم وبحث قوية', 'متمحور حول المستخدم وواعٍ بالأعمال', 'راحة في التعاون عن بُعد'],
      niceToHave: ['خبرة تصميم منتج B2B', 'معرفة أنظمة التصميم', 'فهم سياق المنتج العربي'],
    },
  },
  'frontend-developer': {
    en: {
      title: 'Frontend Developer',
      subtitle: 'Build fast, responsive, and user-friendly interfaces for business systems.',
      responsibilities: ['Build web interfaces with React, TypeScript, and modern tools', 'Implement designs with attention to detail', 'Ensure performance, accessibility, and responsiveness', 'Collaborate with design and backend teams'],
      requirements: ['Strong frontend development experience', 'Proficiency in React, TypeScript, and CSS', 'Understanding of UX and responsive design', 'Remote work style'],
      niceToHave: ['Experience with Next.js or similar frameworks', 'Design system implementation experience', 'Arabic/RTL interface development'],
    },
    ar: {
      title: 'مطور واجهات أمامية',
      subtitle: 'ابنِ واجهات سريعة ومستجيبة وسهلة الاستخدام لأنظمة الأعمال.',
      responsibilities: ['بناء واجهات ويب باستخدام React وTypeScript وأدوات حديثة', 'تنفيذ التصاميم مع الاهتمام بالتفاصيل', 'ضمان الأداء وإمكانية الوصول والاستجابة', 'التعاون مع فرق التصميم والباك إند'],
      requirements: ['خبرة قوية في تطوير الواجهات الأمامية', 'إتقان React وTypeScript وCSS', 'فهم UX والتصميم المستجيب', 'أسلوب العمل عن بُعد'],
      niceToHave: ['خبرة مع Next.js أو أطر مشابهة', 'خبرة تنفيذ نظام التصميم', 'تطوير واجهة عربية/RTL'],
    },
  },
  'devops-engineer': {
    en: {
      title: 'DevOps Engineer',
      subtitle: 'Build and maintain reliable infrastructure, deployment pipelines, and operational systems.',
      responsibilities: ['Set up and maintain CI/CD pipelines', 'Manage cloud infrastructure and deployments', 'Monitor system performance and reliability', 'Support development and production environments'],
      requirements: ['DevOps and infrastructure experience', 'Cloud platforms (AWS, GCP, etc.)', 'CI/CD and automation tools', 'Remote and async work style'],
      niceToHave: ['Experience with containerization and orchestration', 'Infrastructure as code (Terraform, etc.)', 'SaaS operations experience'],
    },
    ar: {
      title: 'مهندس DevOps',
      subtitle: 'ابنِ واحفظ بنية تحتية موثوقة وخطوط أنابيب نشر وأنظمة تشغيلية.',
      responsibilities: ['إعداد وصيانة خطوط أنابيب CI/CD', 'إدارة البنية التحتية السحابية والنشر', 'مراقبة أداء النظام وموثوقيته', 'دعم بيئات التطوير والإنتاج'],
      requirements: ['خبرة DevOps والبنية التحتية', 'منصات سحابية (AWS، GCP، إلخ)', 'أدوات CI/CD والأتمتة', 'أسلوب عمل عن بُعد وغير متزامن'],
      niceToHave: ['خبرة مع الحاويات والتنسيق', 'البنية التحتية كتعليمات برمجية (Terraform، إلخ)', 'خبرة عمليات SaaS'],
    },
  },
  'security-engineer': {
    en: {
      title: 'Security Engineer',
      subtitle: 'Protect systems, data, and users by building secure infrastructure and processes.',
      responsibilities: ['Implement security best practices and protocols', 'Conduct security audits and vulnerability assessments', 'Monitor and respond to security incidents', 'Work with engineering teams on secure development'],
      requirements: ['Security engineering experience', 'Understanding of common vulnerabilities and mitigation', 'Cloud and application security knowledge', 'Remote work capability'],
      niceToHave: ['SaaS or B2B security experience', 'Compliance and data protection knowledge', 'Gulf market security context'],
    },
    ar: {
      title: 'مهندس أمن معلومات',
      subtitle: 'احمِ الأنظمة والبيانات والمستخدمين من خلال بناء بنية تحتية وعمليات آمنة.',
      responsibilities: ['تنفيذ أفضل ممارسات وبروتوكولات الأمن', 'إجراء عمليات تدقيق أمني وتقييمات الثغرات', 'مراقبة والاستجابة لحوادث الأمن', 'العمل مع فرق الهندسة على التطوير الآمن'],
      requirements: ['خبرة هندسة الأمن', 'فهم الثغرات الشائعة والتخفيف', 'معرفة أمن السحابة والتطبيقات', 'قدرة العمل عن بُعد'],
      niceToHave: ['خبرة أمن SaaS أو B2B', 'معرفة الامتثال وحماية البيانات', 'سياق أمن سوق الخليج'],
    },
  },
  'data-analyst': {
    en: {
      title: 'Data Analyst',
      subtitle: 'Turn business data into insights that drive better decisions and outcomes.',
      responsibilities: ['Analyze business and product data', 'Create dashboards and reports', 'Identify trends and actionable insights', 'Support data-driven decision-making'],
      requirements: ['Data analysis and visualization experience', 'SQL and analytics tools proficiency', 'Strong communication of insights', 'Remote work discipline'],
      niceToHave: ['B2B or SaaS analytics experience', 'CRM or operations data background', 'Arabic data context understanding'],
    },
    ar: {
      title: 'محلل بيانات',
      subtitle: 'حوّل بيانات الأعمال إلى رؤى تدفع قرارات ونتائج أفضل.',
      responsibilities: ['تحليل بيانات الأعمال والمنتج', 'إنشاء لوحات معلومات وتقارير', 'تحديد الاتجاهات والرؤى القابلة للتنفيذ', 'دعم اتخاذ القرارات القائمة على البيانات'],
      requirements: ['خبرة تحليل وتصور البيانات', 'إتقان SQL وأدوات التحليل', 'تواصل قوي للرؤى', 'انضباط في العمل عن بُعد'],
      niceToHave: ['خبرة تحليل B2B أو SaaS', 'خلفية بيانات CRM أو التشغيل', 'فهم سياق البيانات العربية'],
    },
  },
  'ai-engineer': {
    en: {
      title: 'AI Engineer',
      subtitle: 'Help build AI layers that improve business follow-up, insights, and decision support.',
      responsibilities: ['Build and fine-tune AI/ML models for business use cases', 'Integrate AI into CRM and automation workflows', 'Design intelligent follow-up and scoring systems', 'Work with data pipelines and real-time processing'],
      requirements: ['Strong Python and ML experience', 'Experience with LLMs and AI APIs (OpenAI, etc.)', 'Understanding of CRM or business operations', 'Remote-first work style'],
      niceToHave: ['Experience with RAG systems', 'Gulf / MENA business context', 'Arabic language AI experience'],
    },
    ar: {
      title: 'مهندس ذكاء اصطناعي',
      subtitle: 'ساهم في بناء طبقات ذكاء اصطناعي تحسّن المتابعة التجارية والرؤى ودعم القرار.',
      responsibilities: ['بناء وضبط نماذج ذكاء اصطناعي لحالات الاستخدام التجاري', 'دمج الذكاء الاصطناعي في سير عمل CRM والأتمتة', 'تصميم أنظمة متابعة ذكية وتسجيل نقاط', 'العمل مع مسارات البيانات والمعالجة الفورية'],
      requirements: ['خبرة قوية في Python وتعلم الآلة', 'خبرة مع النماذج اللغوية الكبيرة وواجهات برمجة الذكاء الاصطناعي', 'فهم لعمليات CRM أو الأعمال', 'أسلوب عمل عن بُعد'],
      niceToHave: ['خبرة مع أنظمة RAG', 'سياق أعمال الخليج والمنطقة العربية', 'خبرة الذكاء الاصطناعي باللغة العربية'],
    },
  },
  'backend-developer': {
    en: {
      title: 'Backend Developer',
      subtitle: 'Help build reliable systems that support real business operations.',
      responsibilities: ['Build and maintain backend APIs and business logic', 'Design database schemas for CRM and workflow systems', 'Integrate third-party services and automation platforms', 'Ensure system reliability, performance, and security'],
      requirements: ['Strong experience in Node.js, Python, or similar', 'Database design and API architecture', 'Experience with automation and webhook integrations', 'Remote and async work style'],
      niceToHave: ['Experience with Supabase or Firebase', 'CRM or operations system background', 'Gulf / MENA market awareness'],
    },
    ar: {
      title: 'مطور واجهات خلفية',
      subtitle: 'ساعد في بناء أنظمة موثوقة تدعم العمليات التجارية الحقيقية.',
      responsibilities: ['بناء وصيانة واجهات برمجة التطبيقات والمنطق التجاري', 'تصميم مخططات قاعدة البيانات لأنظمة CRM والعمليات', 'دمج الخدمات الخارجية ومنصات الأتمتة', 'ضمان موثوقية النظام وأدائه وأمانه'],
      requirements: ['خبرة قوية في Node.js أو Python أو ما يماثلها', 'تصميم قواعد البيانات وبنية واجهات برمجة التطبيقات', 'خبرة في الأتمتة وتكاملات webhook', 'أسلوب عمل عن بُعد وغير متزامن'],
      niceToHave: ['خبرة مع Supabase أو Firebase', 'خلفية في أنظمة CRM أو التشغيل', 'وعي بسوق الخليج'],
    },
  },
};

const defaultRole = {
  en: {
    title: 'Open Role',
    subtitle: 'Help build smarter business systems at ENSDIM.',
    responsibilities: ['Collaborate with product, engineering, and design teams', 'Build solutions around real business problems', 'Contribute to system quality and user experience', 'Work in a remote-first, outcome-focused environment'],
    requirements: ['Relevant experience in your domain', 'Strong communication skills', 'Remote work discipline', 'Outcome-oriented mindset'],
    niceToHave: ['Gulf / MENA market awareness', 'Arabic language skills', 'Prior startup or agency experience'],
  },
  ar: {
    title: 'وظيفة مفتوحة',
    subtitle: 'ساهم في بناء أنظمة أعمال أذكى في إنسديم.',
    responsibilities: ['التعاون مع فرق المنتج والهندسة والتصميم', 'بناء حلول حول مشاكل أعمال حقيقية', 'المساهمة في جودة النظام وتجربة المستخدم', 'العمل في بيئة بعيدة ومركزة على النتائج'],
    requirements: ['خبرة ذات صلة في مجالك', 'مهارات تواصل قوية', 'انضباط في العمل عن بُعد', 'عقلية موجهة نحو النتائج'],
    niceToHave: ['وعي بسوق الخليج والمنطقة العربية', 'مهارات اللغة العربية', 'خبرة سابقة في الشركات الناشئة أو الوكالات'],
  },
};

export function CareerDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const ar = language === 'ar';
  const roleInfo = roleData[slug || ''] || defaultRole;
  const data = ar ? roleInfo.ar : roleInfo.en;
  const isGeneralApplication = data.isGeneralApplication || false;

  const hiddenFields = {
    source_page: `/careers/${slug}`,
    career_role: slug || '',
    interest_type: isGeneralApplication ? 'general_career_application' : 'career_application',
    language: language,
  };

  return (
    <>
      <SEO
        title={`${data.title} | ENSDIM Careers`}
        description={`${data.subtitle} Join ENSDIM's remote-first team building AI automation and business systems across Egypt, Saudi Arabia, and UAE.`}
        keywords={`${data.title} remote job, ENSDIM career, AI agency job Egypt, remote work Middle East`}
        canonical={`/careers/${slug}`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'JobPosting',
          title: data.title,
          description: data.subtitle,
          hiringOrganization: { '@type': 'Organization', name: 'ENSDIM', sameAs: 'https://ensdim.com' },
          jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressCountry: 'EG' } },
          employmentType: 'REMOTE',
          workHours: 'Flexible',
          url: `https://ensdim.com/careers/${slug}`,
        }}
      />
      <PageHero
        eyebrow={isGeneralApplication ? (ar ? 'طلب عام' : 'General Application') : (ar ? 'وظيفة مفتوحة' : 'Open Role')}
        title={data.title}
        subtitle={data.subtitle}
        secondaryCTA={{ label: ar ? 'عرض جميع الوظائف' : 'View all roles', href: '/careers' }}
        breadcrumbs={[
          { label: 'Careers', labelAr: 'الوظائف', href: '/careers' },
          { label: data.title, href: `/careers/${slug}` },
        ]}
        lang={ar ? 'ar' : 'en'}
      />

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-10">
          {!isGeneralApplication && data.responsibilities && data.requirements && data.niceToHave && (
            <>
              {[
                { title: ar ? 'المسؤوليات' : 'Responsibilities', items: data.responsibilities },
                { title: ar ? 'المتطلبات' : 'Requirements', items: data.requirements },
                { title: ar ? 'يُعدّ ميزة' : 'Nice to have', items: data.niceToHave },
              ].map((section, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <h2 className="text-lg font-bold text-[#101418] mb-4">{section.title}</h2>
                  <ul className="space-y-2">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-[#69717D]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#6D5DF6] mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </ScrollReveal>
              ))}

              <ScrollReveal delay={0.25}>
                <div className="border border-[#E5E5E5] rounded-2xl p-6 bg-[#FAFAFA]">
                  <h2 className="text-base font-bold text-[#101418] mb-2">{ar ? 'كيف نعمل' : 'How we work'}</h2>
                  <p className="text-sm text-[#69717D] leading-relaxed">
                    {ar
                      ? 'نعمل عن بُعد بالكامل مع تواصل واضح ونتائج قابلة للقياس. نؤمن بالتعلم المستمر والتركيز على التأثير الحقيقي.'
                      : 'We work fully remote with clear communication and measurable outcomes. We believe in continuous learning and focusing on real impact.'}
                  </p>
                </div>
              </ScrollReveal>
            </>
          )}

          <ScrollReveal delay={isGeneralApplication ? 0.1 : 0.3}>
            <JobApplicationForm
              roleTitle={data.title}
              formTitle={isGeneralApplication ? (ar ? 'أرسل ملفك التعريفي.' : 'Send us your profile.') : (ar ? 'قدّم على هذه الوظيفة.' : 'Apply for this role.')}
              hiddenFields={hiddenFields}
            />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
