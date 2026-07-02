import { Link, useParams } from 'react-router';
import { useLanguage } from '../../contexts/LanguageContext';
import { ArrowRight, ArrowLeft, Clock, BookOpen } from 'lucide-react';
import { SEO } from '../components/SEO';
import { useResearchArticle } from '../../hooks/useContent';

// Render simple markdown-like content: ## Heading, paragraphs separated by blank lines
function ArticleContent({ content }: { content: string }) {
  const blocks = content.split(/\n\n+/);
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        if (!trimmed) return null;
        if (trimmed.startsWith('## ')) {
          return (
            <h2 key={i} className="text-xl font-bold text-[#101418]">
              {trimmed.slice(3)}
            </h2>
          );
        }
        if (trimmed.startsWith('# ')) {
          return (
            <h2 key={i} className="text-2xl font-bold text-[#101418]">
              {trimmed.slice(2)}
            </h2>
          );
        }
        // Check if it's a list (lines starting with - or *)
        if (trimmed.split('\n').every((l) => /^[-*•]\s/.test(l.trim()))) {
          return (
            <ul key={i} className="space-y-2">
              {trimmed.split('\n').map((line, j) => (
                <li key={j} className="flex gap-3">
                  <span className="w-2 h-2 bg-[#6D5DF6] rounded-full mt-2 flex-shrink-0" />
                  <p className="text-[#4F555E] leading-relaxed">{line.replace(/^[-*•]\s/, '')}</p>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="text-[#4F555E] leading-relaxed">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}

export function ResearchArticlePage() {
  const { slug }                = useParams<{ slug: string }>();
  const { language }            = useLanguage();
  const ar                      = language === 'ar';

  const { data: article, isLoading: loading, isError } = useResearchArticle(slug);
  const notFound = isError || (!loading && !article);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-gradient-to-br from-[#0f0d1a] via-[#1a1030] to-[#101418] pt-24 pb-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="h-8 w-48 bg-white/10 rounded animate-pulse mb-8" />
            <div className="h-10 w-3/4 bg-white/20 rounded animate-pulse mb-4" />
            <div className="h-5 w-1/2 bg-white/10 rounded animate-pulse" />
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-4 bg-gray-100 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (notFound || !article) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
        <BookOpen size={48} className="text-[#E5E5E5] mb-4" />
        <h1 className="text-2xl font-bold text-[#101418] mb-2">
          {ar ? 'البحث غير موجود' : 'Article not found'}
        </h1>
        <p className="text-sm text-[#4F555E] mb-6">
          {ar ? 'هذا البحث غير متاح أو تم حذفه.' : 'This article is not available or has been removed.'}
        </p>
        <Link
          to="/research"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6D5DF6] text-white rounded-xl text-sm font-medium hover:bg-[#5d4de6] transition-colors"
        >
          <ArrowLeft size={14} />
          {ar ? 'العودة إلى الأبحاث' : 'Back to Research'}
        </Link>
      </div>
    );
  }

  const title   = ar ? article.title_ar       : article.title_en;
  const desc    = ar ? article.description_ar : article.description_en;
  const content = ar ? article.content_ar     : article.content_en;
  const cat     = ar ? article.category_ar    : article.category_en;

  return (
    <>
      <SEO
        title={`${title} | ENSDIM Research`}
        description={desc}
        keywords={`ENSDIM research, ${cat.toLowerCase()}, ${article.slug.replace(/-/g, ' ')}`}
        canonical={`/research/${article.slug}`}
      />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#0f0d1a] via-[#1a1030] to-[#101418] pt-24 pb-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <Link
              to="/research"
              className="inline-flex items-center gap-2 text-[#EEEAFE]/75 hover:text-[#EEEAFE] text-sm mb-8 transition-colors"
            >
              <ArrowLeft size={14} />
              {ar ? 'العودة إلى الأبحاث' : 'Back to Research'}
            </Link>

            <div className="flex items-center gap-3 mb-5">
              <span className="px-2.5 py-1 bg-[#6D5DF6]/20 text-[#EEEAFE]/90 text-xs font-semibold rounded-full">
                {cat}
              </span>
              <div className="flex items-center gap-1.5 text-[#EEEAFE]/65 text-sm">
                <Clock size={13} />
                <span>{article.read_time} {ar ? 'دقائق قراءة' : 'min read'}</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold text-white leading-tight mb-4" dir={ar ? 'rtl' : 'ltr'}>
              {title}
            </h1>
            <p className="text-[#EEEAFE]/75 text-base" dir={ar ? 'rtl' : 'ltr'}>
              {desc}
            </p>
          </div>
        </div>

        {/* Cover image */}
        {article.image_url && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-8">
            <img
              src={article.image_url}
              alt={title}
              decoding="async"
              className="w-full h-56 sm:h-72 object-cover rounded-2xl shadow-lg"
            />
          </div>
        )}

        {/* Content */}
        <div
          className="max-w-3xl mx-auto px-4 sm:px-6 py-12"
          dir={ar ? 'rtl' : 'ltr'}
        >
          {content ? (
            <ArticleContent content={content} />
          ) : (
            <p className="text-[#4F555E]">{desc}</p>
          )}

          {/* CTA */}
          <div className="text-center pt-12">
            <Link
              to="/book-consultation"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#6D5DF6] text-white rounded-xl hover:bg-[#5d4de6] transition-colors font-medium"
            >
              {ar ? 'احجز استشارة' : 'Book Consultation'}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
