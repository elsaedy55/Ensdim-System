import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowRight, ArrowLeft, ExternalLink, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
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
  const touchStartX = useRef<number | null>(null);

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

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent, count: number) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    const SWIPE_THRESHOLD = 40;
    if (delta > SWIPE_THRESHOLD) {
      setMediaIndex((i) => (i - 1 + count) % count);
    } else if (delta < -SWIPE_THRESHOLD) {
      setMediaIndex((i) => (i + 1) % count);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-gradient-to-br from-[#0f0d1a] via-[#1a1030] to-[#101418] pt-24 pb-14">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="h-8 w-48 bg-white/10 rounded animate-pulse mb-8" />
            <div className="h-10 w-3/4 bg-white/20 rounded animate-pulse mb-4" />
            <div className="h-5 w-1/2 bg-white/10 rounded animate-pulse" />
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-4">
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
  const sector        = ar ? study.sector_ar : study.sector_en;
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

      <section className="pt-24 pb-14 sm:pt-32 sm:pb-20 relative overflow-hidden bg-[#0f0d19] text-white">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 30% 50%, rgba(59,42,120,0.22) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-6 text-xs text-white/50 flex items-center gap-1">
            <Link to="/" className="hover:text-white/80 transition-colors">{ar ? 'الرئيسية' : 'Home'}</Link>
            <span className="opacity-40">/</span>
            <Link to="/case-studies" className="hover:text-white/80 transition-colors">{ar ? 'دراسات الحالة' : 'Case Studies'}</Link>
            <span className="opacity-40">/</span>
            <span className="text-white/70 font-medium">{title}</span>
          </div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5 uppercase tracking-wider bg-[#6D5DF6]/15 border border-[#6D5DF6]/20 text-[#EEEAFE]/80">
            {ar ? 'دراسة حالة' : 'Case Study'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight text-white">{title}</h1>
          <p className="text-base sm:text-lg max-w-2xl leading-relaxed mb-8 text-[#EEEAFE]/75">{outcome}</p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => scrollTo('case-study-form')}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
            >
              {ar ? 'ابنِ حلًا مشابهًا' : 'Build a similar solution'} <ArrowRight size={15} />
            </button>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-white/20 text-white/80 hover:border-white/40 hover:text-white active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
            >
              {ar ? 'عرض كل دراسات الحالة' : 'View all case studies'}
            </Link>
          </div>
        </div>
      </section>

      <div className="bg-[#FAFAFA] border-b border-[#E5E5E5] py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-semibold text-[#6D5DF6] uppercase tracking-wider">{sector}</p>
        </div>
      </div>

      {mediaItems.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
          <div className="relative group">
            <div
              className="w-full aspect-[16/9] bg-[#F4F2FF] rounded-2xl shadow-xl border border-[#E5E5E5] flex items-center justify-center p-4 sm:p-6 touch-pan-y select-none"
              onTouchStart={mediaItems.length > 1 ? handleTouchStart : undefined}
              onTouchEnd={mediaItems.length > 1 ? (e) => handleTouchEnd(e, mediaItems.length) : undefined}
            >
              <img
                src={mediaItems[mediaIndex]}
                alt={`${title} - ${mediaIndex + 1}`}
                className="w-full h-full object-contain rounded-lg pointer-events-none"
                draggable={false}
              />
            </div>
            {mediaItems.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setMediaIndex((i) => (i - 1 + mediaItems.length) % mediaItems.length)}
                  aria-label={ar ? 'الصورة السابقة' : 'Previous image'}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center text-[#101418] hover:bg-white active:scale-95 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all"
                >
                  <ArrowLeft size={16} className="no-mirror" />
                </button>
                <button
                  type="button"
                  onClick={() => setMediaIndex((i) => (i + 1) % mediaItems.length)}
                  aria-label={ar ? 'الصورة التالية' : 'Next image'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center text-[#101418] hover:bg-white active:scale-95 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all"
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
            <h2 className="text-xl font-bold text-[#101418] mb-3">{ar ? 'الوضع قبل الحل' : 'Situation'}</h2>
            <p className="text-sm text-[#4F555E] leading-relaxed">{situation}</p>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <h2 className="text-xl font-bold text-[#101418] mb-3">{ar ? 'التحدي الحقيقي' : 'Challenge'}</h2>
            <p className="text-sm text-[#4F555E] leading-relaxed">{problem}</p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="text-xl font-bold text-[#101418] mb-5">{ar ? 'ماذا بنت إنسديم' : 'What ENSDIM Built'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {built.map((b, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl">
                  <CheckCircle2 size={15} className="text-[#6D5DF6] flex-shrink-0" />
                  <span className="text-sm text-[#101418]">{b}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.14}>
            <h2 className="text-xl font-bold text-[#101418] mb-5">{ar ? 'الأثر على العمل' : 'Business Impact'}</h2>
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
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#6D5DF6] text-white text-sm font-semibold rounded-xl hover:bg-[#5b4de0] active:scale-[0.98] transition-all duration-200"
              >
                {ar ? 'عرض الديمو' : 'View Demo'} <ExternalLink size={15} />
              </a>
            </ScrollReveal>
          )}

          {(study.solution_slug || study.problem_page_slug) && (
            <ScrollReveal delay={0.22}>
              <h2 className="text-xl font-bold text-[#101418] mb-4">{ar ? 'الحلول المرتبطة' : 'Related Solutions'}</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {study.solution_slug && (
                  <Link
                    to={`/solutions/${study.solution_slug}`}
                    className="group flex items-center justify-between gap-3 px-5 py-4 bg-white border border-[#E5E5E5] rounded-xl hover:border-[#6D5DF6] hover:shadow-md active:scale-[0.98] active:border-[#6D5DF6] transition-all duration-200"
                  >
                    <span className="text-sm font-semibold text-[#101418]">{solutionTitle}</span>
                    <ArrowRight size={14} className="text-[#6D5DF6] flex-shrink-0 group-hover:translate-x-0.5 group-active:translate-x-0.5 transition-transform" />
                  </Link>
                )}
                {study.problem_page_slug && (
                  <Link
                    to={`/problems/${study.problem_page_slug}`}
                    className="group flex items-center justify-between gap-3 px-5 py-4 bg-white border border-[#E5E5E5] rounded-xl hover:border-[#6D5DF6] hover:shadow-md active:scale-[0.98] active:border-[#6D5DF6] transition-all duration-200"
                  >
                    <span className="text-sm font-semibold text-[#101418]">{problemTitle}</span>
                    <ArrowRight size={14} className="text-[#6D5DF6] flex-shrink-0 group-hover:translate-x-0.5 group-active:translate-x-0.5 transition-transform" />
                  </Link>
                )}
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal delay={0.26}>
            <div className="bg-[#0f0d19] rounded-2xl p-8 text-white">
              <h2 className="text-lg font-bold mb-2">{ar ? 'مساحة العميل' : 'Client Workspace'}</h2>
              <p className="text-sm text-[#EEEAFE]/75 leading-relaxed mb-5">
                {ar
                  ? 'بعد اعتماد المشروع، يستطيع العميل متابعة تقدم العمل، الملفات، الملاحظات، المدفوعات، وطلبات التعديل من مساحة عميل واضحة بدل التشتت في الرسائل.'
                  : 'After project approval, the client can track progress, files, comments, payments, and change requests from a clear client workspace instead of scattered messages.'}
              </p>
              <a
                href="https://app.ensdim.com/login"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6D5DF6] text-white rounded-xl hover:bg-[#5d4de6] active:scale-[0.97] transition-all duration-200 text-sm font-semibold"
              >
                {ar ? 'دخول مساحة العميل' : 'Client Workspace Login'} <ArrowRight size={14} />
              </a>
            </div>
          </ScrollReveal>

        </div>
      </section>

      <section id="case-study-form" className="py-16 bg-[#FAFAFA] scroll-mt-20">
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
