import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHero } from '../components/PageHero';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';
import { FAQSection } from '../components/FAQSection';
import { QuickAnswer } from '../components/QuickAnswer';

const roles = [
  // Product & Research
  { slug: 'ux-researcher', en: { title: 'UX Researcher', dept: 'Product & Research', type: 'Remote' }, ar: { title: 'باحث تجربة المستخدم', dept: 'البحث والمنتج', type: 'عن بُعد' } },
  { slug: 'user-behavior-researcher', en: { title: 'User Behavior Researcher', dept: 'Product & Research', type: 'Remote' }, ar: { title: 'باحث سلوك المستخدم', dept: 'البحث والمنتج', type: 'عن بُعد' } },
  { slug: 'behavioral-psychology-researcher', en: { title: 'Behavioral Psychology Researcher', dept: 'Product & Research', type: 'Remote' }, ar: { title: 'باحث في علم النفس السلوكي', dept: 'البحث والمنتج', type: 'عن بُعد' } },
  { slug: 'market-researcher', en: { title: 'Market Researcher', dept: 'Product & Research', type: 'Remote' }, ar: { title: 'باحث سوق', dept: 'البحث والمنتج', type: 'عن بُعد' } },
  // Strategy & Growth
  { slug: 'marketing-strategist', en: { title: 'Marketing Strategist', dept: 'Strategy & Growth', type: 'Remote' }, ar: { title: 'استراتيجي تسويق', dept: 'الاستراتيجية والنمو', type: 'عن بُعد' } },
  { slug: 'market-research-specialist', en: { title: 'Market Research Specialist', dept: 'Strategy & Growth', type: 'Remote' }, ar: { title: 'متخصص أبحاث سوق', dept: 'الاستراتيجية والنمو', type: 'عن بُعد' } },
  { slug: 'public-relations-specialist', en: { title: 'Public Relations Specialist', dept: 'Strategy & Growth', type: 'Remote' }, ar: { title: 'متخصص علاقات عامة', dept: 'الاستراتيجية والنمو', type: 'عن بُعد' } },
  { slug: 'sales-specialist', en: { title: 'Sales Specialist', dept: 'Strategy & Growth', type: 'Remote' }, ar: { title: 'متخصص مبيعات', dept: 'الاستراتيجية والنمو', type: 'عن بُعد' } },
  { slug: 'business-developer', en: { title: 'Business Developer', dept: 'Strategy & Growth', type: 'Remote' }, ar: { title: 'مطور أعمال', dept: 'الاستراتيجية والنمو', type: 'عن بُعد' } },
  { slug: 'behavioral-economics-consultant', en: { title: 'Behavioral Economics Consultant', dept: 'Strategy & Growth', type: 'Remote' }, ar: { title: 'استشاري اقتصاد سلوكي', dept: 'الاستراتيجية والنمو', type: 'عن بُعد' } },
  // Design & Product
  { slug: 'ui-ux-designer', en: { title: 'UI/UX Designer', dept: 'Design & Product', type: 'Remote' }, ar: { title: 'مصمم UI/UX', dept: 'التصميم والمنتج', type: 'عن بُعد' } },
  { slug: 'product-designer', en: { title: 'Product Designer', dept: 'Design & Product', type: 'Remote' }, ar: { title: 'مصمم منتج', dept: 'التصميم والمنتج', type: 'عن بُعد' } },
  // Engineering
  { slug: 'frontend-developer', en: { title: 'Frontend Developer', dept: 'Engineering', type: 'Remote' }, ar: { title: 'مطور واجهات أمامية', dept: 'الهندسة', type: 'عن بُعد' } },
  { slug: 'backend-developer', en: { title: 'Backend Developer', dept: 'Engineering', type: 'Remote' }, ar: { title: 'مطور واجهات خلفية', dept: 'الهندسة', type: 'عن بُعد' } },
  { slug: 'devops-engineer', en: { title: 'DevOps Engineer', dept: 'Engineering', type: 'Remote' }, ar: { title: 'مهندس DevOps', dept: 'الهندسة', type: 'عن بُعد' } },
  { slug: 'security-engineer', en: { title: 'Security Engineer', dept: 'Engineering', type: 'Remote' }, ar: { title: 'مهندس أمن معلومات', dept: 'الهندسة', type: 'عن بُعد' } },
  { slug: 'ai-engineer', en: { title: 'AI Engineer', dept: 'Engineering', type: 'Remote' }, ar: { title: 'مهندس ذكاء اصطناعي', dept: 'الهندسة', type: 'عن بُعد' } },
  { slug: 'data-analyst', en: { title: 'Data Analyst', dept: 'Engineering', type: 'Remote' }, ar: { title: 'محلل بيانات', dept: 'الهندسة', type: 'عن بُعد' } },
];

const values = ar => ar ? [
  { title: 'عمل عن بُعد', body: 'نعمل بمرونة من أي مكان.' },
  { title: 'تواصل واضح', body: 'الوضوح يسبق السرعة دائماً.' },
  { title: 'التركيز على النتائج', body: 'نقيس بالتأثير الحقيقي، لا بالساعات.' },
  { title: 'التعلم المستمر', body: 'كل مشكلة عمل فرصة لفهم أعمق.' },
] : [
  { title: 'Remote-first', body: 'We work flexibly from wherever you are.' },
  { title: 'Clear communication', body: 'Clarity always comes before speed.' },
  { title: 'Outcome-focused', body: 'We measure by real impact, not hours.' },
  { title: 'Learning-driven', body: 'Every business problem is a chance for deeper understanding.' },
];

export function CareersPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  return (
    <>
      <SEO
        title="Careers at ENSDIM | Remote AI & Tech Roles - Egypt & Gulf"
        description="Join ENSDIM's remote-first team. We're hiring UX researchers, AI engineers, developers, marketers, and strategists to build behavior-led business systems across Egypt, Saudi Arabia, and UAE."
        keywords="ENSDIM careers, AI agency jobs Egypt, remote tech jobs Middle East, automation engineer jobs, UX researcher jobs Egypt"
        canonical="/careers"
      />
      <PageHero
        title={ar ? 'الوظائف' : 'Careers'}
        subtitle={ar
          ? 'انضم إلى إنسديم وساهم في بناء أنظمة أعمال أذكى حول الإنسان، السلوك، والتشغيل.'
          : 'Join ENSDIM and help build smarter business systems around people, behavior, and operations.'}
        breadcrumbs={[{ label: 'Careers', labelAr: 'الوظائف', href: '/careers' }]}
        lang={ar ? 'ar' : 'en'}
      />

      <QuickAnswer
        question={ar ? 'كيف أنضم إلى فريق إنسديم؟' : 'How do I join the ENSDIM team?'}
        answer={ar
          ? 'إنسديم فريق عمل عن بُعد يبحث عن مطورين، مصممين، باحثين، واستراتيجيين. تصفح الوظائف المتاحة أدناه وأرسل طلبك. لا يوجد دور مناسب؟ أرسل ملفك التعريفي العام وسنتواصل معك عند توفر فرصة.'
          : 'ENSDIM is a remote-first team looking for developers, designers, researchers, and strategists. Browse open roles below and apply. No matching role? Send a general application and we will reach out when a relevant opportunity opens.'}
      />

      {/* Why work here */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="mb-10">
            <h2 className="text-2xl font-bold text-[#101418] mb-2">{ar ? 'لماذا إنسديم؟' : 'Why ENSDIM?'}</h2>
            <p className="text-sm text-[#69717D]">
              {ar ? 'نبني فريقًا مرنًا يجمع بين المنتج، الهندسة، البحث، التصميم، البيانات، النمو، واستراتيجية الأعمال.' : 'We are building a flexible team across product, engineering, research, design, data, growth, and business strategy.'}
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {values(ar).map((v, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="p-5 border border-[#E5E5E5] rounded-2xl hover:border-[#6D5DF6] transition-colors h-full">
                  <h3 className="text-sm font-bold text-[#101418] mb-2">{v.title}</h3>
                  <p className="text-xs text-[#69717D] leading-relaxed">{v.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Open roles by category */}
          <ScrollReveal className="mb-6">
            <h2 className="text-2xl font-bold text-[#101418] mb-2">{ar ? 'الوظائف المتاحة' : 'Open Roles'}</h2>
          </ScrollReveal>

          {/* Product & Research */}
          <div className="mb-10">
            <h3 className="text-base font-bold text-[#101418] mb-4 pb-2 border-b border-[#E5E5E5]">
              {ar ? 'البحث والمنتج' : 'Product & Research'}
            </h3>
            <div className="space-y-3">
              {roles.filter(r => (ar ? r.ar.dept : r.en.dept) === (ar ? 'البحث والمنتج' : 'Product & Research')).map((role, i) => (
                <ScrollReveal key={role.slug} delay={i * 0.05}>
                  <Link
                    to={`/careers/${role.slug}`}
                    className="flex items-center justify-between p-5 border border-[#E5E5E5] rounded-2xl hover:border-[#6D5DF6] hover:shadow-sm transition-all duration-200 group"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#101418] mb-0.5">
                        {ar ? role.ar.title : role.en.title}
                      </p>
                      <p className="text-xs text-[#69717D]">
                        {ar ? role.ar.type : role.en.type}
                      </p>
                    </div>
                    <ArrowRight size={16} className="text-[#6D5DF6] group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Strategy & Growth */}
          <div className="mb-10">
            <h3 className="text-base font-bold text-[#101418] mb-4 pb-2 border-b border-[#E5E5E5]">
              {ar ? 'الاستراتيجية والنمو' : 'Strategy & Growth'}
            </h3>
            <div className="space-y-3">
              {roles.filter(r => (ar ? r.ar.dept : r.en.dept) === (ar ? 'الاستراتيجية والنمو' : 'Strategy & Growth')).map((role, i) => (
                <ScrollReveal key={role.slug} delay={i * 0.05}>
                  <Link
                    to={`/careers/${role.slug}`}
                    className="flex items-center justify-between p-5 border border-[#E5E5E5] rounded-2xl hover:border-[#6D5DF6] hover:shadow-sm transition-all duration-200 group"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#101418] mb-0.5">
                        {ar ? role.ar.title : role.en.title}
                      </p>
                      <p className="text-xs text-[#69717D]">
                        {ar ? role.ar.type : role.en.type}
                      </p>
                    </div>
                    <ArrowRight size={16} className="text-[#6D5DF6] group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Design & Product */}
          <div className="mb-10">
            <h3 className="text-base font-bold text-[#101418] mb-4 pb-2 border-b border-[#E5E5E5]">
              {ar ? 'التصميم والمنتج' : 'Design & Product'}
            </h3>
            <div className="space-y-3">
              {roles.filter(r => (ar ? r.ar.dept : r.en.dept) === (ar ? 'التصميم والمنتج' : 'Design & Product')).map((role, i) => (
                <ScrollReveal key={role.slug} delay={i * 0.05}>
                  <Link
                    to={`/careers/${role.slug}`}
                    className="flex items-center justify-between p-5 border border-[#E5E5E5] rounded-2xl hover:border-[#6D5DF6] hover:shadow-sm transition-all duration-200 group"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#101418] mb-0.5">
                        {ar ? role.ar.title : role.en.title}
                      </p>
                      <p className="text-xs text-[#69717D]">
                        {ar ? role.ar.type : role.en.type}
                      </p>
                    </div>
                    <ArrowRight size={16} className="text-[#6D5DF6] group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Engineering */}
          <div className="mb-10">
            <h3 className="text-base font-bold text-[#101418] mb-4 pb-2 border-b border-[#E5E5E5]">
              {ar ? 'الهندسة' : 'Engineering'}
            </h3>
            <div className="space-y-3">
              {roles.filter(r => (ar ? r.ar.dept : r.en.dept) === (ar ? 'الهندسة' : 'Engineering')).map((role, i) => (
                <ScrollReveal key={role.slug} delay={i * 0.05}>
                  <Link
                    to={`/careers/${role.slug}`}
                    className="flex items-center justify-between p-5 border border-[#E5E5E5] rounded-2xl hover:border-[#6D5DF6] hover:shadow-sm transition-all duration-200 group"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#101418] mb-0.5">
                        {ar ? role.ar.title : role.en.title}
                      </p>
                      <p className="text-xs text-[#69717D]">
                        {ar ? role.ar.type : role.en.type}
                      </p>
                    </div>
                    <ArrowRight size={16} className="text-[#6D5DF6] group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <ScrollReveal delay={0.4} className="mt-10 text-center">
            <p className="text-sm text-[#69717D]">
              {ar ? 'لا تجد دوراً مناسباً؟ ' : "Don't see a matching role? "}
              <Link to="/careers/general-application" className="text-[#6D5DF6] hover:underline font-medium">
                {ar ? 'أرسل لنا ملفك التعريفي' : 'Send us your profile'}
              </Link>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <FAQSection
        title={ar ? 'أسئلة شائعة حول الوظائف في إنسديم' : 'Frequently Asked Questions — Careers at ENSDIM'}
        faqs={ar ? [
          { question: 'هل جميع وظائف إنسديم عن بُعد؟', answer: 'نعم. إنسديم فريق عمل عن بُعد بالكامل. جميع الأدوار يمكن العمل فيها من مصر أو السعودية أو الإمارات أو أي مكان في المنطقة.' },
          { question: 'ما المهارات التي تبحث عنها إنسديم؟', answer: 'إنسديم تبحث عن أشخاص يهتمون بفهم كيف يفكر الناس ويتصرفون. بالإضافة إلى المهارات التقنية (البرمجة، التصميم، البحث)، نقدّر الفضول التحليلي والقدرة على حل مشكلات حقيقية معقدة.' },
          { question: 'كيف أتقدم للوظائف في إنسديم؟', answer: 'اضغط على الوظيفة المناسبة في الصفحة واملأ نموذج التقديم. إذا لم تجد دوراً مناسباً، أرسل ملفك التعريفي العام من خلال رابط "أرسل لنا ملفك التعريفي" أدناه.' },
          { question: 'هل تقبل إنسديم متدربين أو حديثي التخرج؟', answer: 'نعم في بعض الأدوار. إنسديم تقدّر الإمكانيات والفضول أكثر من عدد سنوات الخبرة في أدوار البحث والتصميم. للأدوار التقنية نبحث عن خبرة عملية حقيقية.' },
        ] : [
          { question: 'Are all ENSDIM jobs remote?', answer: 'Yes. ENSDIM is a fully remote-first team. All roles can be performed from Egypt, Saudi Arabia, UAE, or anywhere in the region.' },
          { question: 'What skills does ENSDIM look for?', answer: 'ENSDIM looks for people who care about understanding how people think and behave. Beyond technical skills (coding, design, research), we value analytical curiosity and the ability to solve complex real business problems.' },
          { question: 'How do I apply for a role at ENSDIM?', answer: 'Click the relevant role on this page and complete the application form. If you do not see a matching role, send a general application using the link at the bottom of the page.' },
          { question: 'Does ENSDIM hire fresh graduates or junior candidates?', answer: 'Yes, in some roles. ENSDIM values potential and curiosity over years of experience in research and design roles. For engineering and strategy roles, we look for demonstrated practical experience.' },
          { question: 'What is the hiring process at ENSDIM?', answer: 'Applications are reviewed within one week. Shortlisted candidates are invited to a focused conversation about their thinking and past work. For technical roles there may be a practical task. We move quickly and communicate clearly throughout.' },
        ]}
      />
    </>
  );
}
