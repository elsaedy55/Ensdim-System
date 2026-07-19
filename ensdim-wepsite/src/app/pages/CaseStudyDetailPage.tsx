import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowRight, ArrowLeft, ExternalLink, CheckCircle2, ChevronDown, Download } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from '../components/ScrollReveal';
import { ConsultationForm } from '../components/ConsultationForm';
import { SEO } from '../components/SEO';
import { useCaseStudy } from '../../hooks/useContent';

export function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const ar = language === 'ar';

  const { data: study, isLoading: loading, isError } = useCaseStudy(slug);
  const notFound = isError || (!loading && !study);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [dragPx, setDragPx] = useState(0);
  const [animateTrack, setAnimateTrack] = useState(false);
  const [openBuiltIndex, setOpenBuiltIndex] = useState<number | null>(null);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartTime = useRef(0);
  const containerWidthRef = useRef(0);
  const draggingRef = useRef(false);
  const animatingRef = useRef(false);

  useEffect(() => {
    setMediaIndex(0);
  }, [slug]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const SLIDE_DURATION = 280;

  const commitSlide = (direction: 1 | -1, count: number) => {
    if (animatingRef.current || count < 2) return;
    animatingRef.current = true;
    const width = containerWidthRef.current || viewportRef.current?.clientWidth || 0;
    setAnimateTrack(true);
    setDragPx(direction === 1 ? -width : width);
    window.setTimeout(() => {
      setMediaIndex((i) => (direction === 1 ? (i + 1) % count : (i - 1 + count) % count));
      setAnimateTrack(false);
      setDragPx(0);
      animatingRef.current = false;
    }, SLIDE_DURATION);
  };

  const springBack = () => {
    setAnimateTrack(true);
    setDragPx(0);
    window.setTimeout(() => setAnimateTrack(false), SLIDE_DURATION);
  };

  const handleTouchStart = (e: React.TouchEvent, count: number) => {
    if (animatingRef.current || count < 2) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartTime.current = Date.now();
    containerWidthRef.current = viewportRef.current?.clientWidth || 0;
    draggingRef.current = true;
    setAnimateTrack(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!draggingRef.current || touchStartX.current === null) return;
    const width = containerWidthRef.current || 1;
    const rawDelta = e.touches[0].clientX - touchStartX.current;
    const clamped = Math.max(-width, Math.min(width, rawDelta));
    setDragPx(clamped);
  };

  const handleTouchEnd = (e: React.TouchEvent, count: number) => {
    if (!draggingRef.current || touchStartX.current === null) return;
    const width = containerWidthRef.current || viewportRef.current?.clientWidth || 1;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    const elapsed = Date.now() - touchStartTime.current;
    const velocity = Math.abs(delta) / Math.max(elapsed, 1);
    touchStartX.current = null;
    draggingRef.current = false;

    const DISTANCE_THRESHOLD = width * 0.2;
    const FLICK_VELOCITY = 0.5;
    const swiped = Math.abs(delta) > DISTANCE_THRESHOLD || velocity > FLICK_VELOCITY;

    if (swiped && delta < 0) {
      commitSlide(1, count);
    } else if (swiped && delta > 0) {
      commitSlide(-1, count);
    } else {
      springBack();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-logo-black pt-24 pb-14">
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

  const title           = ar ? study.title_ar : study.title_en;
  const outcome         = ar ? study.outcome_ar : study.outcome_en;
  const situation       = ar ? study.situation_ar : study.situation_en;
  const challengeIntro  = ar ? study.challengeIntro_ar : study.challengeIntro_en;
  const challengeItems  = ar ? study.challengeItems_ar : study.challengeItems_en;
  const builtIntro      = ar ? study.builtIntro_ar : study.builtIntro_en;
  const impactIntro     = ar ? study.impactIntro_ar : study.impactIntro_en;
  const impactItems     = ar ? study.impactItems_ar : study.impactItems_en;
  const whyMatters      = ar ? study.whyMatters_ar : study.whyMatters_en;
  const mediaItems      = [study.image_url, ...(study.gallery_images || [])].filter((src): src is string => Boolean(src));

  return (
    <>
      <SEO
        title={`${title} | Ensdim Case Study`}
        description={`${outcome} ${situation}`}
        keywords="AI automation case study Egypt, business transformation Middle East, CRM implementation results"
        canonical={`/case-studies/${slug}`}
        ogType="article"
      />

      <section className="pt-24 pb-14 sm:pt-32 sm:pb-20 relative overflow-hidden bg-logo-black text-white">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-6 text-xs text-white/50 flex items-center gap-1">
            <Link to="/" className="hover:text-white/80 transition-colors">{ar ? 'الرئيسية' : 'Home'}</Link>
            <span className="opacity-40">/</span>
            <Link to="/case-studies" className="hover:text-white/80 transition-colors">{ar ? 'دراسات الحالة' : 'Case Studies'}</Link>
            <span className="opacity-40">/</span>
            <span className="text-white/70 font-medium">{title}</span>
          </div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5 uppercase tracking-wider bg-[#6D5DF6]/15 border border-[#6D5DF6]/20 text-[#EEEAFE]/80">
            {(ar ? study.badge_ar : study.badge_en) || (ar ? 'دراسة حالة' : 'Case Study')}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight text-white">{title}</h1>
          <p className="text-base sm:text-lg max-w-2xl leading-relaxed mb-8 text-[#EEEAFE]/75">{outcome}</p>
          <div className="flex flex-wrap gap-3">
            {study.report_url ? (
              <a
                href={study.report_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
              >
                {ar ? 'تحميل التقرير التقني الكامل' : 'Download the full technical report'} <Download size={15} />
              </a>
            ) : (
              <button
                type="button"
                onClick={() => scrollTo('case-study-form')}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
              >
                {ar ? 'ابنِ حلًا مشابهًا' : 'Build a similar solution'} <ArrowRight size={15} />
              </button>
            )}
            {study.report_url ? (
              <button
                type="button"
                onClick={() => scrollTo('case-study-form')}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-white/20 text-white/80 hover:border-white/40 hover:text-white active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
              >
                {ar ? 'تواصل معنا لمراجعة نظامك' : 'Talk to us about reviewing your system'}
              </button>
            ) : (
              <Link
                to="/case-studies"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-white/20 text-white/80 hover:border-white/40 hover:text-white active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
              >
                {ar ? 'عرض كل دراسات الحالة' : 'View all case studies'}
              </Link>
            )}
          </div>
        </div>
      </section>

      {study.snapshot.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
          <ScrollReveal>
            <div className="border border-[#E5E5E5] rounded-2xl p-6 sm:p-8 bg-[#FAFAFA]">
              <h2 className="text-sm font-bold text-[#101418] mb-5">{ar ? 'نظرة سريعة على المشروع' : 'Project Snapshot'}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {study.snapshot.map((item, i) => (
                  <div key={i} className="flex justify-between gap-4 sm:block">
                    <p className="text-xs text-[#4F555E] uppercase tracking-wide mb-0 sm:mb-1">{ar ? item.label_ar : item.label_en}</p>
                    <p className="text-sm font-semibold text-[#101418] text-end sm:text-start">{ar ? item.value_ar : item.value_en}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      )}

      {mediaItems.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
          <div className="relative group">
            <div
              ref={viewportRef}
              dir="ltr"
              className="w-full aspect-[16/9] bg-[#F4F2FF] rounded-2xl shadow-xl border border-[#E5E5E5] overflow-hidden touch-pan-y select-none"
              onTouchStart={mediaItems.length > 1 ? (e) => handleTouchStart(e, mediaItems.length) : undefined}
              onTouchMove={mediaItems.length > 1 ? handleTouchMove : undefined}
              onTouchEnd={mediaItems.length > 1 ? (e) => handleTouchEnd(e, mediaItems.length) : undefined}
            >
              {mediaItems.length > 1 ? (
                <div
                  className={`flex h-full w-[300%] ${animateTrack ? 'transition-transform ease-out' : ''}`}
                  style={{
                    transitionDuration: animateTrack ? `${SLIDE_DURATION}ms` : undefined,
                    transform: `translate3d(calc(-33.3333% + ${dragPx}px), 0, 0)`,
                  }}
                >
                  {[
                    (mediaIndex - 1 + mediaItems.length) % mediaItems.length,
                    mediaIndex,
                    (mediaIndex + 1) % mediaItems.length,
                  ].map((idx, slot) => (
                    <div key={slot} className="w-1/3 h-full">
                      <img
                        src={mediaItems[idx]}
                        alt={`${title} - ${idx + 1}`}
                        loading={slot === 1 ? 'eager' : 'lazy'}
                        decoding="async"
                        className="w-full h-full object-cover pointer-events-none"
                        draggable={false}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full h-full">
                  <img
                    src={mediaItems[0]}
                    alt={title}
                    decoding="async"
                    className="w-full h-full object-cover pointer-events-none"
                    draggable={false}
                  />
                </div>
              )}
            </div>
            {mediaItems.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => commitSlide(-1, mediaItems.length)}
                  aria-label={ar ? 'الصورة السابقة' : 'Previous image'}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center text-[#101418] hover:bg-white active:scale-95 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all"
                >
                  <ArrowLeft size={16} className="no-mirror" />
                </button>
                <button
                  type="button"
                  onClick={() => commitSlide(1, mediaItems.length)}
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
                      onClick={() => {
                        if (animatingRef.current) return;
                        setAnimateTrack(false);
                        setDragPx(0);
                        setMediaIndex(i);
                      }}
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
            <p className="text-sm text-[#4F555E] leading-relaxed mb-4">{challengeIntro}</p>
            <ul className="space-y-2">
              {challengeItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-[#4F555E] leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D63A3A]/60 flex-shrink-0 mt-1.5" />
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="text-xl font-bold text-[#101418] mb-3">{ar ? 'ماذا بنت إنسديم' : 'What Ensdim Built'}</h2>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-6">{builtIntro}</p>
            <div className="space-y-6">
              {study.builtSections.map((section, i) => {
                const items = ar ? section.items_ar : section.items_en;
                const closing = ar ? section.closing_ar : section.closing_en;
                const isOpen = openBuiltIndex === i;
                return (
                  <div key={i} className="border border-[#E5E5E5] rounded-2xl bg-[#FAFAFA] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenBuiltIndex(isOpen ? null : i)}
                      className="w-full flex items-start gap-3 p-5 sm:p-6 text-start lg:pointer-events-none"
                    >
                      <div className="flex-1">
                        <h3 className="text-base font-bold text-[#101418] mb-2">{ar ? section.title_ar : section.title_en}</h3>
                        <p className="text-sm text-[#4F555E] leading-relaxed">{ar ? section.lead_ar : section.lead_en}</p>
                      </div>
                      <ChevronDown
                        size={18}
                        className={`lg:hidden text-[#6D5DF6] flex-shrink-0 mt-1 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <div className={`${isOpen ? 'block' : 'hidden'} lg:block px-5 sm:px-6 pb-5 sm:pb-6`}>
                      {items.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                          {items.map((item, j) => (
                            <div key={j} className="flex items-start gap-2.5 p-3 bg-white border border-[#E5E5E5] rounded-lg">
                              <CheckCircle2 size={14} className="text-[#6D5DF6] flex-shrink-0 mt-0.5" />
                              <span className="text-xs text-[#101418] leading-relaxed">{item}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {closing && <p className="text-sm text-[#4F555E] leading-relaxed italic">{closing}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.14}>
            <h2 className="text-xl font-bold text-[#101418] mb-3">{ar ? 'الأثر على العمل' : 'Business Impact'}</h2>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-5">{impactIntro}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {impactItems.map((o, i) => (
                <div key={i} className="p-4 bg-[#EEEAFE] rounded-xl">
                  <p className="text-sm font-medium text-[#101418]">{o}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {study.demo_url && (
            <ScrollReveal delay={0.16}>
              <a
                href={study.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#3B2A78] text-white text-sm font-semibold rounded-xl hover:bg-[#4a3690] active:scale-[0.98] transition-all duration-200"
              >
                {ar ? 'عرض الديمو' : 'View Demo'} <ExternalLink size={15} />
              </a>
            </ScrollReveal>
          )}

          {study.report_url && (
            <ScrollReveal delay={0.16}>
              <div className="border border-[#E5E5E5] rounded-2xl p-6 sm:p-8 bg-[#FAFAFA]">
                <h2 className="text-sm font-bold text-[#101418] mb-2">
                  {ar ? 'التقرير التقني الكامل' : 'Full Technical Report'}
                </h2>
                <p className="text-sm text-[#4F555E] leading-relaxed mb-5">
                  {ar
                    ? 'هذه الصفحة تعرض الحالة من زاوية البزنس. التقرير الكامل يتضمن التصنيف الفني، تفاصيل الأثر، والتوصيات التقنية المقترحة للمعالجة.'
                    : 'This page presents the case from a business perspective. The full report includes technical classification, impact details, and remediation recommendations.'}
                </p>
                <a
                  href={study.report_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#D63A3A] text-white text-sm font-semibold rounded-xl hover:bg-[#c23030] active:scale-[0.98] transition-all duration-200"
                >
                  {ar ? 'تحميل التقرير التقني الكامل' : 'Download the full technical report'} <Download size={15} />
                </a>
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal delay={0.18}>
            <h2 className="text-xl font-bold text-[#101418] mb-3">{ar ? 'لماذا كانت هذه الدراسة مهمة؟' : 'Why This Case Matters'}</h2>
            <p className="text-sm text-[#4F555E] leading-relaxed">{whyMatters}</p>
          </ScrollReveal>

          {study.relatedSolutions.length > 0 && (
            <ScrollReveal delay={0.22}>
              <h2 className="text-xl font-bold text-[#101418] mb-4">{ar ? 'الحلول المرتبطة' : 'Related Solutions'}</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {study.relatedSolutions.map((solution, i) => {
                  const solutionTitle = ar ? solution.title_ar : solution.title_en;
                  const solutionDesc = ar ? solution.desc_ar : solution.desc_en;
                  const content = (
                    <>
                      <div>
                        <span className="text-sm font-semibold text-[#101418] block mb-1">{solutionTitle}</span>
                        <span className="text-xs text-[#4F555E] leading-relaxed">{solutionDesc}</span>
                      </div>
                      {solution.href && (
                        <ArrowRight size={14} className="text-[#6D5DF6] flex-shrink-0 group-hover:translate-x-0.5 group-active:translate-x-0.5 transition-transform mt-1" />
                      )}
                    </>
                  );
                  return solution.href ? (
                    <Link
                      key={i}
                      to={solution.href}
                      className="group flex items-start justify-between gap-3 px-5 py-4 bg-white border border-[#E5E5E5] rounded-xl hover:border-[#6D5DF6] hover:shadow-md active:scale-[0.98] active:border-[#6D5DF6] transition-all duration-200"
                    >
                      {content}
                    </Link>
                  ) : (
                    <div key={i} className="flex items-start justify-between gap-3 px-5 py-4 bg-white border border-[#E5E5E5] rounded-xl">
                      {content}
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal delay={0.26}>
            <div className="bg-logo-black rounded-2xl p-8 text-white">
              <h2 className="text-lg font-bold mb-2">{ar ? 'مساحة العميل' : 'Client Workspace'}</h2>
              <p className="text-sm text-[#EEEAFE]/75 leading-relaxed mb-5">
                {ar
                  ? 'بعد اعتماد المشروع، يستطيع العميل متابعة تقدم العمل، الملفات، الملاحظات، المدفوعات، وطلبات التعديل من مساحة عميل واضحة بدل التشتت في الرسائل.'
                  : 'After project approval, the client can track progress, files, comments, payments, and change requests from a clear client workspace instead of scattered messages.'}
              </p>
              <a
                href="https://app.ensdim.com/login"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#3B2A78] text-white rounded-xl hover:bg-[#4a3690] active:scale-[0.97] transition-all duration-200 text-sm font-semibold"
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
            <p className="text-sm text-[#4F555E] leading-relaxed text-center mb-6">
              {ar ? study.cta.desc_ar : study.cta.desc_en}
            </p>
            <ConsultationForm
              title={ar ? study.cta.title_ar : study.cta.title_en}
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
