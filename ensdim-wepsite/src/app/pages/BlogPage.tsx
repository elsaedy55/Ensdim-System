import { Link } from 'react-router';
import { useLanguage } from '../../contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { SEO } from '../components/SEO';
import { FAQSection } from '../components/FAQSection';
import { QuickAnswer } from '../components/QuickAnswer';

const blogPostsEn = [
  { slug: 'lose-leads-after-first-message', title: 'How service businesses lose leads after the first message', category: 'Follow-Up', read: '5 min' },
  { slug: 'whatsapp-alone-not-enough', title: 'Why WhatsApp alone is not enough to manage customers', category: 'Operations', read: '4 min' },
  { slug: 'crm-vs-manual-follow-up', title: 'CRM vs manual follow-up: what growing businesses should know', category: 'CRM', read: '6 min' },
  { slug: 'automation-response-time', title: 'How automation improves customer response time', category: 'Automation', read: '4 min' },
  { slug: 'dashboards-reveal-operations', title: 'What dashboards reveal about your daily operations', category: 'Visibility', read: '5 min' },
  { slug: 'ai-management-decisions', title: 'How AI can support management decisions without replacing people', category: 'AI', read: '6 min' },
  { slug: 'clinics-reduce-missed-appointments', title: 'How clinics can reduce missed appointments with better systems', category: 'Healthcare', read: '5 min' },
  { slug: 'real-estate-leads-disappear', title: 'Why real estate leads disappear after ads', category: 'Real Estate', read: '4 min' },
  { slug: 'website-vs-conversion-system', title: 'The difference between a website and a conversion system', category: 'Digital', read: '5 min' },
  { slug: 'does-your-business-need-automation', title: 'How to know if your business needs automation', category: 'Operations', read: '4 min' },
];

const blogPostsAr = [
  { slug: 'lose-leads-after-first-message', title: 'كيف تخسر شركات الخدمات العملاء المحتملين بعد أول رسالة', category: 'المتابعة', read: '5 دقائق' },
  { slug: 'whatsapp-alone-not-enough', title: 'لماذا الواتساب وحده لا يكفي لإدارة العملاء', category: 'التشغيل', read: '4 دقائق' },
  { slug: 'crm-vs-manual-follow-up', title: 'CRM مقابل المتابعة اليدوية: ما تحتاج معرفته كشركة نامية', category: 'CRM', read: '6 دقائق' },
  { slug: 'automation-response-time', title: 'كيف تحسّن الأتمتة وقت الاستجابة للعملاء', category: 'الأتمتة', read: '4 دقائق' },
  { slug: 'dashboards-reveal-operations', title: 'ما الذي تكشفه لوحات التحكم عن عملياتك اليومية', category: 'الرؤية', read: '5 دقائق' },
  { slug: 'ai-management-decisions', title: 'كيف يدعم الذكاء الاصطناعي قرارات الإدارة دون أن يحل محل الناس', category: 'الذكاء الاصطناعي', read: '6 دقائق' },
  { slug: 'clinics-reduce-missed-appointments', title: 'كيف تقلل العيادات من المواعيد الفائتة بأنظمة أفضل', category: 'الرعاية الصحية', read: '5 دقائق' },
  { slug: 'real-estate-leads-disappear', title: 'لماذا تختفي العملاء المحتملين في العقارات بعد الإعلانات', category: 'العقارات', read: '4 دقائق' },
  { slug: 'website-vs-conversion-system', title: 'الفرق بين موقع ويب ونظام تحويل', category: 'الرقمي', read: '5 دقائق' },
  { slug: 'does-your-business-need-automation', title: 'كيف تعرف إذا كان عملك يحتاج إلى أتمتة', category: 'التشغيل', read: '4 دقائق' },
];

export function BlogPage() {
  const { language } = useLanguage();
  const posts = language === 'ar' ? blogPostsAr : blogPostsEn;

  return (
    <>
      <SEO
        title="Blog | ENSDIM - AI, Automation & Business Operations Insights"
        description="ENSDIM blog: practical articles on AI automation, CRM, customer behavior, business operations, and digital growth for companies in Egypt, Saudi Arabia, and UAE."
        keywords="AI automation blog Egypt, business automation articles, CRM tips Middle East, AI for business blog Arabic, digital transformation insights"
        canonical="/blog"
        ogType="website"
      />
      <PageHero
        eyebrow={language === 'ar' ? 'المدونة' : 'Blog'}
        title={language === 'ar' ? 'المدونة' : 'Blog'}
        subtitle={
          language === 'ar'
            ? 'مقالات عملية حول التشغيل، سلوك العملاء، الأتمتة، الذكاء الاصطناعي، والنمو الرقمي.'
            : 'Practical articles on operations, customer behavior, automation, AI, and digital growth.'
        }
        breadcrumbs={[{ label: 'Blog', labelAr: 'المدونة', href: '/blog' }]}
        lang={language === 'ar' ? 'ar' : 'en'}
      />

      <QuickAnswer
        question={language === 'ar' ? 'ما موضوعات مدونة إنسديم؟' : 'What topics does the ENSDIM blog cover?'}
        answer={language === 'ar'
          ? 'مدونة إنسديم تغطي: أتمتة الأعمال، إدارة علاقات العملاء، سلوك العميل ورحلته، الذكاء الاصطناعي التطبيقي، التشغيل الرقمي، والنمو. كل مقال يقدم رؤى عملية للأعمال في مصر والسعودية والإمارات.'
          : 'The ENSDIM blog covers: business automation, CRM, customer behavior and journey, applied AI, digital operations, and growth. Every article provides practical insights for businesses in Egypt, Saudi Arabia, and UAE.'}
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group flex flex-col p-6 rounded-2xl border border-[#E5E5E5] hover:border-[#6D5DF6] hover:shadow-xl transition-all duration-300 bg-white"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2.5 py-1 bg-[#EEEAFE] text-[#6D5DF6] text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-[#69717D]">{post.read}</span>
                </div>
                <h3 className="text-base font-semibold text-[#101418] leading-snug mb-4 flex-1 group-hover:text-[#6D5DF6] transition-colors">
                  {post.title}
                </h3>
                <span className="inline-flex items-center gap-1.5 text-sm text-[#6D5DF6] font-medium mt-auto">
                  {language === 'ar' ? 'اقرأ المقال' : 'Read article'} <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQSection
        title={language === 'ar' ? 'أسئلة شائعة حول مدونة إنسديم' : 'Frequently Asked Questions About the ENSDIM Blog'}
        faqs={language === 'ar' ? [
          { question: 'هل مقالات مدونة إنسديم باللغتين العربية والإنجليزية؟', answer: 'نعم. مدونة إنسديم تتوفر باللغتين العربية والإنجليزية لخدمة الشركات في مصر والسعودية والإمارات والأسواق الناطقة بالعربية والإنجليزية.' },
          { question: 'ما الموضوعات التي تغطيها المدونة؟', answer: 'تغطي المدونة: أتمتة الأعمال، CRM وإدارة العملاء، سلوك العميل، الذكاء الاصطناعي التطبيقي، الرؤية التشغيلية، النمو الرقمي، وتجربة العميل — مع تركيز على الأسواق العربية.' },
          { question: 'هل يمكنني تطبيق نصائح المدونة على عملي مباشرة؟', answer: 'نعم. كل مقال في مدونة إنسديم يتضمن رؤى عملية قابلة للتطبيق. إذا أردت تطبيقًا مخصصًا لنشاطك، احجز استشارة مع فريق إنسديم.' },
        ] : [
          { question: 'Is the ENSDIM blog available in Arabic and English?', answer: 'Yes. The ENSDIM blog is available in both Arabic and English to serve businesses in Egypt, Saudi Arabia, UAE, and English-speaking markets.' },
          { question: 'What topics does the blog cover?', answer: 'The blog covers business automation, CRM and customer management, customer behavior, applied AI, operational visibility, digital growth, and customer experience — with a focus on Arab markets.' },
          { question: 'Are the blog articles practical or theoretical?', answer: 'All ENSDIM blog articles are practical and grounded in real business operations. They draw from actual client work and are written for business owners and managers, not just technical readers.' },
          { question: 'How often does ENSDIM publish new blog content?', answer: 'ENSDIM publishes regularly on topics relevant to businesses in Egypt, Saudi Arabia, and UAE. Subscribe or bookmark the blog to stay updated on AI automation, CRM, and digital operations insights.' },
        ]}
      />

      <section className="py-16 bg-[#EEEAFE]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-[#101418] mb-4">
            {language === 'ar' ? 'هل تواجه تحدياً في عملك؟' : 'Facing a challenge in your business?'}
          </h2>
          <p className="text-[#69717D] mb-6">
            {language === 'ar'
              ? 'تحدث مع إنسديم واكتشف كيف يمكننا مساعدتك.'
              : 'Talk to ENSDIM and discover how we can help.'}
          </p>
          <Link
            to="/book-consultation"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#6D5DF6] text-white rounded-xl hover:bg-[#5d4de6] transition-colors font-medium"
          >
            {language === 'ar' ? 'احجز استشارة' : 'Book Consultation'}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
