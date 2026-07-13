import { Link, useParams } from 'react-router';
import { useLanguage } from '../../contexts/LanguageContext';
import { ArrowRight, ArrowLeft, Clock, FileText } from 'lucide-react';
import { SEO } from '../components/SEO';
import { useBlogPost } from '../../hooks/useContent';

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

export function BlogArticlePage() {
  const { slug }                = useParams<{ slug: string }>();
  const { language }            = useLanguage();
  const ar                      = language === 'ar';

  const { data: post, isLoading: loading, isError } = useBlogPost(slug);
  const notFound = isError || (!loading && !post);

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

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
        <FileText size={48} className="text-[#E5E5E5] mb-4" />
        <h1 className="text-2xl font-bold text-[#101418] mb-2">
          {ar ? 'المقال غير موجود' : 'Article not found'}
        </h1>
        <p className="text-sm text-[#4F555E] mb-6">
          {ar ? 'هذا المقال غير متاح أو تم حذفه.' : 'This article is not available or has been removed.'}
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6D5DF6] text-white rounded-xl text-sm font-medium hover:bg-[#5d4de6] transition-colors"
        >
          <ArrowLeft size={14} />
          {ar ? 'العودة إلى المدونة' : 'Back to Blog'}
        </Link>
      </div>
    );
  }

  const title   = ar ? post.title_ar       : post.title_en;
  const desc    = ar ? post.description_ar : post.description_en;
  const content = ar ? post.content_ar     : post.content_en;
  const cat     = ar ? post.category_ar    : post.category_en;

  return (
    <>
      <SEO
        title={`${title} | Ensdim Blog`}
        description={desc}
        keywords={`AI automation blog Egypt, ${cat.toLowerCase()}, ${post.slug.replace(/-/g, ' ')}`}
        canonical={`/blog/${post.slug}`}
        ogType="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: title,
          description: desc,
          author: { '@type': 'Organization', name: 'Ensdim' },
          publisher: { '@type': 'Organization', name: 'Ensdim', logo: { '@type': 'ImageObject', url: 'https://ensdim.com/ensdim-logo.png' } },
          url: `https://ensdim.com/blog/${post.slug}`,
          inLanguage: ar ? 'ar' : 'en',
        }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#0f0d1a] via-[#1a1030] to-[#101418] pt-24 pb-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[#EEEAFE]/75 hover:text-[#EEEAFE] text-sm mb-8 transition-colors"
            >
              <ArrowLeft size={14} />
              {ar ? 'العودة إلى المدونة' : 'Back to Blog'}
            </Link>

            <div className="flex items-center gap-3 mb-5">
              <span className="px-2.5 py-1 bg-[#6D5DF6]/20 text-[#EEEAFE]/90 text-xs font-semibold rounded-full">
                {cat}
              </span>
              <div className="flex items-center gap-1.5 text-[#EEEAFE]/65 text-sm">
                <Clock size={13} />
                <span>{post.read_time} {ar ? 'دقائق قراءة' : 'min read'}</span>
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
        {post.image_url && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10">
            <img
              src={post.image_url}
              alt={title}
              decoding="async"
              className="w-full aspect-[16/9] object-cover rounded-2xl shadow-xl"
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
