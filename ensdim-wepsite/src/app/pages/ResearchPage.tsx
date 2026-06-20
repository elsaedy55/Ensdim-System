import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Clock, BookOpen } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHero } from '../components/PageHero';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';
import { getPublishedResearchArticles, type ResearchArticle } from '../../lib/supabase';

export function ResearchPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  const [articles, setArticles]   = useState<ResearchArticle[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);

  useEffect(() => {
    getPublishedResearchArticles()
      .then(setArticles)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SEO
        title="Research | ENSDIM - Customer Behavior & Business Operations Insights"
        description="ENSDIM research: data-driven insights on customer behavior, lead conversion, follow-up systems, and operational efficiency for service businesses in Egypt, Saudi Arabia, and UAE."
        keywords="customer behavior research Egypt, lead conversion insights, business operations research Middle East, AI automation research"
        canonical="/research"
      />
      <PageHero
        title={ar ? 'الأبحاث' : 'Research'}
        subtitle={ar
          ? 'رؤى عملية حول سلوك العملاء، التشغيل، والتحويل.'
          : 'Practical insights on customer behavior, operations, and conversion.'}
        breadcrumbs={[{ label: 'Research', labelAr: 'الأبحاث', href: '/research' }]}
        lang={ar ? 'ar' : 'en'}
        variant="light"
      />

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {loading && (
            <div className="space-y-5">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="border border-[#E5E5E5] rounded-2xl p-6 sm:p-8 animate-pulse">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-5 w-20 bg-[#EEEAFE] rounded-full" />
                    <div className="h-4 w-16 bg-gray-100 rounded-full" />
                  </div>
                  <div className="h-6 w-3/4 bg-gray-200 rounded-lg mb-2" />
                  <div className="h-4 w-full bg-gray-100 rounded mb-1" />
                  <div className="h-4 w-2/3 bg-gray-100 rounded" />
                </div>
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="text-center py-16">
              <BookOpen size={40} className="mx-auto text-[#E5E5E5] mb-3" />
              <p className="text-sm text-[#4F555E]">
                {ar ? 'تعذر تحميل الأبحاث. حاول مجدداً لاحقاً.' : 'Could not load articles. Please try again later.'}
              </p>
            </div>
          )}

          {!loading && !error && articles.length === 0 && (
            <div className="text-center py-16">
              <BookOpen size={40} className="mx-auto text-[#E5E5E5] mb-3" />
              <p className="text-sm text-[#4F555E]">
                {ar ? 'لا توجد أبحاث منشورة بعد.' : 'No research articles published yet.'}
              </p>
            </div>
          )}

          {!loading && !error && articles.length > 0 && (
            <div className="space-y-5">
              {articles.map((article, i) => (
                <ScrollReveal key={article.id} delay={i * 0.07}>
                  <Link
                    to={`/research/${article.slug}`}
                    className="block border border-[#E5E5E5] rounded-2xl overflow-hidden hover:border-[#6D5DF6] hover:shadow-md active:scale-[0.99] active:border-[#6D5DF6] transition-all duration-200"
                  >
                    {article.image_url && (
                      <img
                        src={article.image_url}
                        alt={ar ? article.title_ar : article.title_en}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6 sm:p-8">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[10px] px-2.5 py-1 bg-[#EEEAFE] text-[#6D5DF6] rounded-full font-semibold">
                          {ar ? article.category_ar : article.category_en}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-[#4F555E]">
                          <Clock size={11} />
                          {article.read_time} {ar ? 'دقائق قراءة' : 'min read'}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[#101418] mb-2 leading-snug">
                        {ar ? article.title_ar : article.title_en}
                      </h3>
                      <p className="text-sm text-[#4F555E] leading-relaxed mb-4">
                        {ar ? article.description_ar : article.description_en}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-[#6D5DF6] text-sm font-semibold">
                        {ar ? 'اقرأ البحث' : 'Read Research'}
                        <ArrowRight size={13} />
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
