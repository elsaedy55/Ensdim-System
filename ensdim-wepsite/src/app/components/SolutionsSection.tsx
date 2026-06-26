import { Link } from 'react-router';
import { useLanguage } from '../../contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

function IconJourney() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="4" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="20" cy="12" r="2" />
      <path d="M6 12h4M14 12h4" />
      <path d="M4 10V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v3" opacity="0.35" />
      <path d="M4 14v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" opacity="0.35" />
    </svg>
  );
}
function IconConversionExp() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M3 21h18" opacity="0.3" />
      <path d="M8 12l3 3 5-6" />
    </svg>
  );
}
function IconFollowUp() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3" />
      <path d="M5 20a7 7 0 0 1 14 0" opacity="0.3" />
      <path d="M15 14l4 4M19 14l-4 4" opacity="0.6" />
    </svg>
  );
}
function IconVisibility() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 20h18" />
      <path d="M5 20V14l3-4 3 3 4-7 4 4V20" />
    </svg>
  );
}
function IconAutomation() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}
function IconAI() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2a2.5 2.5 0 0 1 5 0v.5" /><path d="M9 21.5h6" />
      <rect x="5" y="6" width="14" height="12" rx="2" />
      <path d="M9 11h1.5M13.5 11H15M9 14h6" opacity="0.6" />
    </svg>
  );
}

const solutionIcons = [IconJourney, IconConversionExp, IconFollowUp, IconVisibility, IconAutomation, IconAI];
const solutionSlugs = [
  'customer-journey-systems',
  'digital-experiences',
  'follow-up-systems',
  'visibility-insights',
  'automation-layers',
  'ai-practical-decisions',
];

export function SolutionsSection() {
  const { t } = useLanguage();

  const solutions = [
    { title: t('solutions.solution1Title'), description: t('solutions.solution1Desc'), impact: t('solutions.solution1Impact'), includes: t('solutions.solution1Includes') },
    { title: t('solutions.solution2Title'), description: t('solutions.solution2Desc'), impact: t('solutions.solution2Impact'), includes: t('solutions.solution2Includes') },
    { title: t('solutions.solution3Title'), description: t('solutions.solution3Desc'), impact: t('solutions.solution3Impact'), includes: t('solutions.solution3Includes') },
    { title: t('solutions.solution4Title'), description: t('solutions.solution4Desc'), impact: t('solutions.solution4Impact'), includes: t('solutions.solution4Includes') },
    { title: t('solutions.solution5Title'), description: t('solutions.solution5Desc'), impact: t('solutions.solution5Impact'), includes: t('solutions.solution5Includes') },
    { title: t('solutions.solution6Title'), description: t('solutions.solution6Desc'), impact: t('solutions.solution6Impact'), includes: t('solutions.solution6Includes') },
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#EEEAFE]" id="solutions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#101418] mb-4 max-w-3xl mx-auto leading-tight">
            {t('solutions.title')}
          </h2>
          <p className="text-base sm:text-lg text-[#4F555E] max-w-2xl mx-auto">
            {t('solutions.subtitle')}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {solutions.map((solution, index) => {
            const Icon = solutionIcons[index];
            return (
              <ScrollReveal key={index} delay={Math.min(index * 0.06, 0.24)}>
              <Link
                to={`/solutions/${solutionSlugs[index]}`}
                className="group bg-white rounded-2xl p-7 border border-[#EBEBEB] hover:border-[#6D5DF6]/50 hover:shadow-[0_12px_40px_rgba(109,93,246,0.09)] active:scale-[0.98] active:border-[#6D5DF6]/50 transition-all duration-200 flex flex-col h-full"
              >
                <div className="w-13 h-13 min-w-[52px] min-h-[52px] bg-[#F4F2FF] rounded-xl flex items-center justify-center mb-5 flex-shrink-0 group-hover:bg-[#6D5DF6]/15 transition-colors duration-300">
                  <div className="text-[#6D5DF6]"><Icon /></div>
                </div>
                <h3 className="text-base font-bold text-[#101418] mb-2.5 leading-snug">{solution.title}</h3>
                <p className="text-[#4F555E] text-sm leading-relaxed mb-4">{solution.description}</p>
                {Array.isArray(solution.impact) && solution.impact.length > 0 && (
                  <div className="mb-5 flex-1">
                    <p className="text-[10px] font-semibold text-[#4F555E] uppercase tracking-wider mb-2.5">{t('solutions.impactLabel')}</p>
                    <ul className="space-y-1.5">
                      {solution.impact.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-[#101418]">
                          <span className="w-1 h-1 rounded-full bg-[#6D5DF6] mt-1.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {Array.isArray(solution.includes) && solution.includes.length > 0 && (
                  <div className="mb-5">
                    <p className="text-[10px] font-semibold text-[#4F555E] uppercase tracking-wider mb-2.5">{t('solutions.includes')}</p>
                    <div className="flex flex-wrap gap-2">
                      {solution.includes.map((item: string, i: number) => (
                        <span key={i} className="px-2.5 py-1 bg-[#EEEAFE] text-xs text-[#6D5DF6] font-medium rounded-full">{item}</span>
                      ))}
                    </div>
                  </div>
                )}
                <span className="inline-flex items-center gap-1.5 text-sm text-[#6D5DF6] font-medium mt-auto group-hover:gap-2.5 group-active:gap-2.5 transition-all duration-200">
                  {t(`solutions.solution${index + 1}CTA`) || 'Explore solution'} <ArrowRight size={13} />
                </span>
              </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
