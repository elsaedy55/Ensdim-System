import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from './ScrollReveal';

const chips = [
  { en: 'Higher Conversion', ar: 'تحويل أعلى' },
  { en: 'Better Satisfaction', ar: 'رضا أفضل' },
  { en: 'More Sales Opportunities', ar: 'فرص بيع أكثر' },
  { en: 'Easier Management', ar: 'إدارة أسهل' },
];

export function WhoIsSection() {
  const { t, language } = useLanguage();

  return (
    <section className="py-20 sm:py-24 bg-[#0f0d19] text-white relative overflow-hidden">
      {/* Very subtle violet glow behind content */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 30% 50%, rgba(59,42,120,0.18) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-20 gap-10">

          {/* Left: label + title + description */}
          <ScrollReveal className="lg:max-w-xl flex-shrink-0">
            <span className="inline-block px-3 py-1 bg-[#6D5DF6]/15 border border-[#6D5DF6]/20 text-[#EEEAFE]/80 text-xs font-semibold rounded-full mb-5 uppercase tracking-wider">
              {t('who.label')}
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4 leading-snug">
              {t('who.title')}
            </h2>
            <p className="text-sm sm:text-base text-[#EEEAFE]/70 leading-relaxed mb-6">
              {t('who.description')}
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-[#6D5DF6] hover:text-[#8B7BF7] active:scale-95 transition-all text-sm font-medium group"
            >
              {t('who.cta')}
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </ScrollReveal>

          {/* Right: behavior signal flow diagram */}
          <ScrollReveal className="flex-1" delay={0.15}>
            <div className="relative flex flex-col items-center gap-3 max-w-sm mx-auto lg:mx-0">

              {/* Row 1 — Behavior signals */}
              <div className="w-full">
                <p className="text-[10px] uppercase tracking-widest text-white/25 mb-2 text-center">Behavior Signals</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Missed Lead', color: '#D63A3A' },
                    { label: 'Slow Reply', color: '#F59E0B' },
                    { label: 'No Follow-Up', color: '#4F555E' },
                  ].map((s, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-1.5 bg-white/[0.04] border border-white/[0.08] rounded-xl px-2 py-3"
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                      <span className="text-[10px] text-white/45 text-center leading-tight">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow down */}
              <div className="flex flex-col items-center gap-0.5">
                <div className="w-px h-4 bg-gradient-to-b from-white/20 to-[#6D5DF6]/60" />
                <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
                  <path d="M1 1l4 5 4-5" stroke="#6D5DF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Row 2 — Understanding engine */}
              <div className="w-full bg-[#6D5DF6]/12 border border-[#6D5DF6]/30 rounded-xl px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#6D5DF6]/20 border border-[#6D5DF6]/30 flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="3" stroke="#6D5DF6" strokeWidth="1.2"/>
                    <path d="M7 1v2M7 11v2M1 7h2M11 7h2" stroke="#6D5DF6" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-white/80">Behavior Understanding</p>
                  <p className="text-[10px] text-white/35">Pattern recognition · Intent mapping</p>
                </div>
              </div>

              {/* Arrow down */}
              <div className="flex flex-col items-center gap-0.5">
                <div className="w-px h-4 bg-gradient-to-b from-[#6D5DF6]/60 to-white/20" />
                <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
                  <path d="M1 1l4 5 4-5" stroke="#EEEAFE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
                </svg>
              </div>

              {/* Row 3 — System response */}
              <div className="w-full">
                <p className="text-[10px] uppercase tracking-widest text-white/25 mb-2 text-center">System Response</p>
                <div className="grid grid-cols-2 gap-2">
                  {chips.map((chip, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.09] rounded-xl px-3 py-2.5 hover:border-[#6D5DF6]/40 hover:bg-white/[0.08] transition-all duration-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6D5DF6] flex-shrink-0" />
                      <span className="text-[11px] text-[#EEEAFE]/85 leading-tight">
                        {language === 'ar' ? chip.ar : chip.en}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
