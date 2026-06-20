import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowRight, ArrowLeft, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHero } from '../components/PageHero';
import { ScrollReveal } from '../components/ScrollReveal';
import { ConsultationForm } from '../components/ConsultationForm';
import { SEO } from '../components/SEO';
import { getCaseStudyBySlug, type CaseStudy } from '../../lib/supabase';

export function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const ar = language === 'ar';

  const [study, setStudy]       = useState<CaseStudy | null>(null);
  const [loading, setLoading]   = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [mediaIndex, setMediaIndex] = useState(0);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setNotFound(false);
    setMediaIndex(0);
    getCaseStudyBySlug(slug)
      .then((data) => {
        if (!data) {
          setNotFound(true);
        } else {
          setStudy(data);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

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

  if (notFound || !study) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#101418] mb-4">{ar ? 'دراسة الحالة غير موجودة' : 'Case study not found'}</h1>
          <Link to="/case-studies" className="text-[#6D5DF6] hover:underline">{ar ? 'عرض جميع دراسات الحالة' : 'View all case studies'}</Link>
        </div>
      </div>
    );
  }

  const title         = ar ? study.title_ar : study.title_en;
  const outcome       = ar ? study.outcome_ar : study.outcome_en;
  const situation     = ar ? study.situation_ar : study.situation_en;
  const problem       = ar ? study.problem_ar : study.problem_en;
  const built         = ar ? study.built_ar : study.built_en;
  const outcomes      = ar ? study.outcomes_ar : study.outcomes_en;
  const solutionTitle = ar ? study.solution_title_ar : study.solution_title_en;
  const problemTitle  = ar ? study.problem_page_title_ar : study.problem_page_title_en;
  const mediaItems    = [study.image_url, ...(study.gallery_images || [])].filter((src): src is string => Boolean(src));

  return (
    <>
      <SEO
        title={`${title} | ENSDIM Case Study`}
        description={`${outcome} ${situation}`}
        keywords="AI automation case study Egypt, business transformation Middle East, CRM implementation results"
        canonical={`/case-studies/${slug}`}
        ogType="article"
      />
      <PageHero
        eyebrow={ar ? 'دراسة حالة' : 'Case Study'}
        title={title}
        subtitle={outcome}
        primaryCTA={{ label: ar ? 'ابنِ نظاماً مشابهاً' : 'Build a similar system', href: '/book-consultation' }}
        secondaryCTA={{ label: ar ? 'عرض جميع دراسات الحالة' : 'View all case studies', href: '/case-studies' }}
        breadcrumbs={[
          { label: 'Case Studies', labelAr: 'دراسات الحالة', href: '/case-studies' },
          { label: title, href: `/case-studies/${slug}` },
        ]}
        lang={ar ? 'ar' : 'en'}
      />

      {mediaItems.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
          <div className="relative group">
            <img
              src={mediaItems[mediaIndex]}
              alt={`${title} - ${mediaIndex + 1}`}
              className="w-full aspect-[16/9] object-cover rounded-2xl shadow-xl border border-[#E5E5E5]"
            />
            {mediaItems.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setMediaIndex((i) => (i - 1 + mediaItems.length) % mediaItems.length)}
                  aria-label={ar ? 'الصورة السابقة' : 'Previous image'}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center text-[#101418] hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ArrowLeft size={16} className="no-mirror" />
                </button>
                <button
                  type="button"
                  onClick={() => setMediaIndex((i) => (i + 1) % mediaItems.length)}
                  aria-label={ar ? 'الصورة التالية' : 'Next image'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center text-[#101418] hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ArrowRight size={16} className="no-mirror" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                  {mediaItems.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setMediaIndex(i)}
                      aria-label={`${ar ? 'الصورة' : 'Image'} ${i + 1}`}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${i === mediaIndex ? 'bg-white w-4' : 'bg-white/50'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
          <ScrollReveal>
            <h2 className="text-xl font-bold text-[#101418] mb-3">{ar ? 'الوضع' : 'Situation'}</h2>
            <p className="text-sm text-[#4F555E] leading-relaxed">{situation}</p>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <h2 className="text-xl font-bold text-[#101418] mb-3">{ar ? 'المشكلة' : 'Problem'}</h2>
            <p className="text-sm text-[#4F555E] leading-relaxed">{problem}</p>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <h2 className="text-xl font-bold text-[#101418] mb-4">{ar ? 'ماذا بنت إنسديم' : 'What ENSDIM built'}</h2>
            <ul className="space-y-2">
              {built.map((b, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-[#4F555E]">
                  <div className="w-2 h-2 rounded-full bg-[#6D5DF6] flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.16}>
            <h2 className="text-xl font-bold text-[#101418] mb-4">{ar ? 'النتيجة' : 'Outcome'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {outcomes.map((o, i) => (
                <div key={i} className="p-4 bg-[#EEEAFE] rounded-xl">
                  <p className="text-sm font-medium text-[#101418]">{o}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {study.demo_url && (
            <ScrollReveal delay={0.18}>
              <a
                href={study.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#6D5DF6] text-white text-sm font-semibold rounded-xl hover:bg-[#5b4de0] transition-colors"
              >
                {ar ? 'عرض الديمو' : 'View Demo'} <ExternalLink size={15} />
              </a>
            </ScrollReveal>
          )}

          {(study.solution_slug || study.problem_page_slug) && (
            <ScrollReveal delay={0.2}>
              <div className="grid sm:grid-cols-2 gap-4">
                {study.solution_slug && (
                  <div className="p-5 border border-[#E5E5E5] rounded-2xl">
                    <p className="text-xs text-[#4F555E] uppercase tracking-wider mb-2">{ar ? 'الحل المرتبط' : 'Related solution'}</p>
                    <p className="text-sm font-bold text-[#101418] mb-3">{solutionTitle}</p>
                    <Link to={`/solutions/${study.solution_slug}`} className="inline-flex items-center gap-1.5 text-sm text-[#6D5DF6] hover:underline">
                      {ar ? 'استكشف الحل' : 'Explore solution'} <ArrowRight size={13} />
                    </Link>
                  </div>
                )}
                {study.problem_page_slug && (
                  <div className="p-5 border border-[#E5E5E5] rounded-2xl">
                    <p className="text-xs text-[#4F555E] uppercase tracking-wider mb-2">{ar ? 'المشكلة المرتبطة' : 'Related problem'}</p>
                    <p className="text-sm font-bold text-[#101418] mb-3">{problemTitle}</p>
                    <Link to={`/problems/${study.problem_page_slug}`} className="inline-flex items-center gap-1.5 text-sm text-[#6D5DF6] hover:underline">
                      {ar ? 'اعرف المشكلة' : 'Explore problem'} <ArrowRight size={13} />
                    </Link>
                  </div>
                )}
              </div>
            </ScrollReveal>
          )}

        </div>
      </section>

      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <ConsultationForm
              title={ar ? 'هل تريد نتيجة مشابهة؟' : 'Want a similar result?'}
              hiddenFields={{
                source_page: `/case-studies/${slug}`,
                clicked_case_study: title,
                interest_type: 'case_study',
              }}
            />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
