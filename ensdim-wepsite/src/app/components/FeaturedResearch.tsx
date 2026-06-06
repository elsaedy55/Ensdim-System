import { Link } from 'react-router';
import { ArrowRight, Clock } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from './ScrollReveal';

export function FeaturedResearch() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-[#EEEAFE]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <ScrollReveal className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-2">
            {t('research.sectionTitle')}
          </h2>
          <p className="text-sm text-[#69717D]">{t('research.sectionSubtitle')}</p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
        <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden hover:border-[#6D5DF6] hover:shadow-2xl transition-all duration-300">
          <div className="grid md:grid-cols-2">
            {/* Left: editorial research visual */}
            <div className="relative bg-gradient-to-br from-[#0f0d1a] via-[#1a1030] to-[#101418] p-10 flex items-center justify-center min-h-[280px] overflow-hidden">
              {/* Background glow */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-4 left-4 w-48 h-48 bg-[#6D5DF6] rounded-full blur-[60px]" />
                <div className="absolute bottom-4 right-4 w-32 h-32 bg-[#3B2A78] rounded-full blur-[40px]" />
              </div>

              <div className="relative z-10 w-full max-w-[240px] space-y-3">
                {/* Chart bars */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-white/40 text-[10px] mb-3 uppercase tracking-wider">Lead Conversion Rate</p>
                  <div className="flex items-end gap-1.5 h-12">
                    {[35, 52, 41, 67, 48, 58, 72].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm"
                        style={{
                          height: `${h}%`,
                          background:
                            i === 6
                              ? 'linear-gradient(to top, #6D5DF6, #8B7BF7)'
                              : 'rgba(109,93,246,0.25)',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Insight pill */}
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#D63A3A] flex-shrink-0" />
                  <p className="text-white/70 text-xs leading-tight">
                    68% of leads lost after first contact
                  </p>
                </div>

                {/* Research tag */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="px-2 py-0.5 bg-[#6D5DF6]/20 text-[#EEEAFE]/70 text-[10px] rounded-full font-medium no-mirror">
                    <span style={{ color: '#D63A3A' }}>EN</span>SDIM Research
                  </span>
                  <span className="text-white/30 text-[10px]">2025</span>
                </div>
              </div>
            </div>

            {/* Right: content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4 text-sm text-[#69717D]">
                <span className="px-2 py-1 bg-[#EEEAFE] rounded text-xs font-semibold text-[#6D5DF6]">
                  {t('research.badge')}
                </span>
                <div className="flex items-center gap-1">
                  <Clock size={13} />
                  <span>6 {t('research.readTime')}</span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#101418] mb-4 leading-tight">
                {t('research.title')}
              </h3>

              <p className="text-[#69717D] text-sm leading-relaxed mb-6">
                {t('research.description')}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/research/why-businesses-lose-leads" className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#E5E5E5] text-[#101418] rounded-xl hover:border-[#6D5DF6] hover:text-[#6D5DF6] transition-colors text-sm font-medium">
                  {t('research.cta')}
                  <ArrowRight size={16} />
                </Link>
                <Link to="/research" className="text-[#6D5DF6] text-sm hover:underline self-center">
                  {t('research.ctaAll')}
                </Link>
              </div>
            </div>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
