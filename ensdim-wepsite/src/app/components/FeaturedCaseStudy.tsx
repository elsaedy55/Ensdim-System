import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from './ScrollReveal';
import { getPublishedCaseStudies, type CaseStudy } from '../../lib/supabase';

export function FeaturedCaseStudy() {
  const { t, language } = useLanguage();
  const ar = language === 'ar';
  const navigate = useNavigate();

  const [study, setStudy]     = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublishedCaseStudies()
      .then((studies) => {
        const sorted = [...studies].sort((a, b) =>
          (b.published_at ?? '').localeCompare(a.published_at ?? '')
        );
        setStudy(sorted[0] ?? null);
      })
      .catch(() => setStudy(null))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && !study) return null;

  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <ScrollReveal className="mb-8">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#101418] mb-2">
            {t('caseStudy.sectionTitle')}
          </h2>
          <p className="text-sm text-[#4F555E]">{t('caseStudy.sectionSubtitle')}</p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
        <div
          onClick={() => study && navigate(`/case-studies/${study.slug}`)}
          className={`group bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden hover:border-[#6D5DF6] hover:shadow-2xl active:scale-[0.99] active:border-[#6D5DF6] transition-all duration-300 ${study ? 'cursor-pointer' : ''}`}
        >
          <div className="grid md:grid-cols-2">
            {/* Left: content */}
            <div className="p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
              {loading || !study ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-5 w-24 bg-[#EEEAFE] rounded" />
                  <div className="h-7 w-3/4 bg-gray-200 rounded" />
                  <div className="h-4 w-full bg-gray-100 rounded" />
                  <div className="h-4 w-2/3 bg-gray-100 rounded" />
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <span className="px-2 py-1 bg-[#EEEAFE] rounded text-[#6D5DF6] text-xs font-semibold">
                      {ar ? study.sector_ar : study.sector_en}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#101418] mb-4 leading-tight">
                    {ar ? study.title_ar : study.title_en}
                  </h3>

                  <p className="text-[#4F555E] text-sm leading-relaxed mb-6">
                    {ar ? study.outcome_ar : study.outcome_en}
                  </p>

                  <div className="grid grid-cols-3 gap-3 mb-6 pb-6 border-b border-[#E5E5E5]">
                    <div>
                      <p className="text-[10px] text-[#4F555E] mb-1 uppercase tracking-wide">
                        {t('caseStudy.problemLabel')}
                      </p>
                      <p className="text-sm text-[#101418] font-semibold">{ar ? study.card_problem_ar : study.card_problem_en}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#4F555E] mb-1 uppercase tracking-wide">
                        {t('caseStudy.solutionLabel')}
                      </p>
                      <p className="text-sm text-[#101418] font-semibold">{ar ? study.card_solution_ar : study.card_solution_en}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#4F555E] mb-1 uppercase tracking-wide">
                        {t('caseStudy.impactLabel')}
                      </p>
                      <p className="text-sm text-[#101418] font-semibold">{ar ? study.card_impact_ar : study.card_impact_en}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#E5E5E5] text-[#101418] rounded-xl group-hover:border-[#6D5DF6] group-hover:text-[#6D5DF6] transition-colors text-sm font-medium">
                      {t('caseStudy.cta')}
                      <ArrowRight size={16} />
                    </span>
                    <Link
                      to="/case-studies"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[#6D5DF6] text-sm hover:underline self-center"
                    >
                      {t('caseStudy.ctaAll')}
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Right: cover image (falls back to before/after visual) */}
            {study?.image_url ? (
              <div className="relative order-1 md:order-2 min-h-[320px] overflow-hidden">
                <img
                  src={study.image_url}
                  alt={ar ? study.title_ar : study.title_en}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="relative bg-gradient-to-br from-[#0d0b17] to-[#1a1030] p-6 flex items-center justify-center order-1 md:order-2 min-h-[320px] overflow-hidden">
                <div className="absolute inset-0 opacity-15">
                  <div className="absolute top-0 right-0 w-56 h-56 bg-[#6D5DF6] rounded-full blur-[70px]" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#D63A3A] rounded-full blur-[50px]" />
                </div>

                <div className="relative z-10 w-full max-w-[280px] space-y-2">
                  {/* Before */}
                  <div className="bg-white/4 border border-[#D63A3A]/25 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D63A3A]" />
                      <p className="text-[#D63A3A]/80 text-[10px] uppercase tracking-wider font-semibold">Before</p>
                    </div>
                    <div className="space-y-1.5">
                      {[
                        'Manual follow-up via WhatsApp',
                        'Customer data scattered across sheets',
                        'No visibility on lead status',
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-[#D63A3A]/50 text-[10px] mt-px flex-shrink-0">✕</span>
                          <p className="text-white/40 text-[10px] leading-snug">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center justify-center py-0.5">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 2v12M3 9l5 5 5-5" stroke="#6D5DF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  {/* After */}
                  <div className="bg-white/5 border border-[#22c55e]/25 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                      <p className="text-[#22c55e]/80 text-[10px] uppercase tracking-wider font-semibold">After</p>
                    </div>
                    <div className="space-y-1.5">
                      {[
                        'CRM with automated follow-up triggers',
                        'Unified customer view in one dashboard',
                        'Real-time pipeline + conversion tracking',
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-[#22c55e]/70 text-[10px] mt-px flex-shrink-0">✓</span>
                          <p className="text-white/65 text-[10px] leading-snug">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Result metric */}
                  <div className="bg-[#6D5DF6]/15 border border-[#6D5DF6]/25 rounded-xl px-3 py-2 flex items-center justify-between">
                    <p className="text-white/50 text-[10px]">Conversion uplift</p>
                    <p className="text-[#EEEAFE] text-sm font-bold">+29%</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
