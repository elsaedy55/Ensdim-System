import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useLanguage } from '../../contexts/LanguageContext';
import { ArrowRight, Clock, FileText } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';
import { FAQSection } from '../components/FAQSection';
import { QuickAnswer } from '../components/QuickAnswer';
import { getPublishedBlogPosts, type BlogPost } from '../../lib/supabase';

export function BlogPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  const [posts, setPosts]   = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    getPublishedBlogPosts()
      .then(setPosts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

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
        eyebrow={ar ? 'المدونة' : 'Blog'}
        title={ar ? 'المدونة' : 'Blog'}
        subtitle={
          ar
            ? 'مقالات عملية حول التشغيل، سلوك العملاء، الأتمتة، الذكاء الاصطناعي، والنمو الرقمي.'
            : 'Practical articles on operations, customer behavior, automation, AI, and digital growth.'
        }
        breadcrumbs={[{ label: 'Blog', labelAr: 'المدونة', href: '/blog' }]}
        lang={ar ? 'ar' : 'en'}
      />

      <QuickAnswer
        question={ar ? 'ما موضوعات مدونة إنسديم؟' : 'What topics does the ENSDIM blog cover?'}
        answer={ar
          ? 'مدونة إنسديم تغطي: أتمتة الأعمال، إدارة علاقات العملاء، سلوك العميل ورحلته، الذكاء الاصطناعي التطبيقي، التشغيل الرقمي، والنمو. كل مقال يقدم رؤى عملية للأعمال في مصر والسعودية والإمارات.'
          : 'The ENSDIM blog covers: business automation, CRM, customer behavior and journey, applied AI, digital operations, and growth. Every article provides practical insights for businesses in Egypt, Saudi Arabia, and UAE.'}
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-[#E5E5E5] p-6 animate-pulse">
                  <div className="h-5 w-20 bg-[#EEEAFE] rounded-full mb-4" />
                  <div className="h-5 w-3/4 bg-gray-200 rounded-lg mb-2" />
                  <div className="h-4 w-full bg-gray-100 rounded mb-1" />
                  <div className="h-4 w-2/3 bg-gray-100 rounded" />
                </div>
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="text-center py-16">
              <FileText size={40} className="mx-auto text-[#E5E5E5] mb-3" />
              <p className="text-sm text-[#69717D]">
                {ar ? 'تعذر تحميل المقالات. حاول مجدداً لاحقاً.' : 'Could not load blog posts. Please try again later.'}
              </p>
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="text-center py-16">
              <FileText size={40} className="mx-auto text-[#E5E5E5] mb-3" />
              <p className="text-sm text-[#69717D]">
                {ar ? 'لا توجد مقالات منشورة بعد.' : 'No blog posts published yet.'}
              </p>
            </div>
          )}

          {!loading && !error && posts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <ScrollReveal key={post.id} delay={i * 0.07}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group flex flex-col h-full rounded-2xl border border-[#E5E5E5] hover:border-[#6D5DF6] hover:shadow-xl transition-all duration-300 bg-white overflow-hidden"
                  >
                    {post.image_url && (
                      <img
                        src={post.image_url}
                        alt={ar ? post.title_ar : post.title_en}
                        className="w-full h-40 object-cover"
                      />
                    )}
                    <div className="flex flex-col flex-1 p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-2.5 py-1 bg-[#EEEAFE] text-[#6D5DF6] text-xs font-semibold rounded-full">
                          {ar ? post.category_ar : post.category_en}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-[#69717D]">
                          <Clock size={11} />
                          {post.read_time} {ar ? 'دقائق قراءة' : 'min read'}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-[#101418] leading-snug mb-2 flex-1 group-hover:text-[#6D5DF6] transition-colors">
                        {ar ? post.title_ar : post.title_en}
                      </h3>
                      {(ar ? post.description_ar : post.description_en) && (
                        <p className="text-sm text-[#69717D] leading-relaxed mb-4 line-clamp-2">
                          {ar ? post.description_ar : post.description_en}
                        </p>
                      )}
                      <span className="inline-flex items-center gap-1.5 text-sm text-[#6D5DF6] font-medium mt-auto">
                        {ar ? 'اقرأ المقال' : 'Read article'} <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <FAQSection
        title={ar ? 'أسئلة شائعة حول مدونة إنسديم' : 'Frequently Asked Questions About the ENSDIM Blog'}
        faqs={ar ? [
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
            {ar ? 'هل تواجه تحدياً في عملك؟' : 'Facing a challenge in your business?'}
          </h2>
          <p className="text-[#69717D] mb-6">
            {ar
              ? 'تحدث مع إنسديم واكتشف كيف يمكننا مساعدتك.'
              : 'Talk to ENSDIM and discover how we can help.'}
          </p>
          <Link
            to="/book-consultation"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#6D5DF6] text-white rounded-xl hover:bg-[#5d4de6] transition-colors font-medium"
          >
            {ar ? 'احجز استشارة' : 'Book Consultation'}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
