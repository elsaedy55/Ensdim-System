import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from './ScrollReveal';

function IconScatteredLeads() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2.5" />
      <circle cx="4" cy="5" r="2" opacity="0.6" />
      <circle cx="20" cy="5" r="2" opacity="0.6" />
      <circle cx="4" cy="19" r="2" opacity="0.4" />
      <path d="M6 6.5l4.5 4" strokeDasharray="2 1.5" opacity="0.5" />
      <path d="M18 6.5l-4.5 4" strokeDasharray="2 1.5" opacity="0.5" />
      <path d="M6 17.5l4.5-4" strokeDasharray="2 1.5" opacity="0.35" />
    </svg>
  );
}
function IconVisitorsNotConverting() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 3l3 7-3 7-3-7 3-7z" opacity="0.5" />
      <path d="M13 10l7 3" />
      <circle cx="20" cy="13" r="1.5" />
    </svg>
  );
}
function IconSlowResponse() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6v6l3 3" />
    </svg>
  );
}
function IconNoVisibility() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 10v3M12 8v5M16 11v2" opacity="0.25" strokeDasharray="1.5 1.5" />
      <path d="M9.5 17.5l-2 3M14.5 17.5l2 3M7 20.5h10" opacity="0.4" />
    </svg>
  );
}
function IconDuplicatedWork() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="6" width="10" height="13" rx="1.5" />
      <rect x="5" y="3" width="10" height="13" rx="1.5" opacity="0.4" />
      <path d="M10 10h5M10 13h3" opacity="0.6" />
    </svg>
  );
}
function IconDataNotHelping() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 20h18" opacity="0.4" />
      <path d="M6 20v-6M11 20v-9M16 20v-4" />
      <circle cx="19" cy="6" r="2.5" />
      <path d="M19 5v.01" strokeWidth="2" />
    </svg>
  );
}

const problemSlugs = [
  'leads-get-lost',
  'visitors-not-converting',
  'repeated-work',
  'slow-response',
  'no-visibility',
  'data-not-helping-decisions',
];

export function ProblemsSection() {
  const { t } = useLanguage();

  const problems = [
    { Icon: IconScatteredLeads,         title: t('problems.problem1Title'), description: t('problems.problem1Desc') },
    { Icon: IconVisitorsNotConverting,  title: t('problems.problem2Title'), description: t('problems.problem2Desc') },
    { Icon: IconDuplicatedWork,         title: t('problems.problem5Title'), description: t('problems.problem5Desc') },
    { Icon: IconSlowResponse,           title: t('problems.problem3Title'), description: t('problems.problem3Desc') },
    { Icon: IconNoVisibility,           title: t('problems.problem4Title'), description: t('problems.problem4Desc') },
    { Icon: IconDataNotHelping,         title: t('problems.problem6Title'), description: t('problems.problem6Desc') },
  ];

  return (
    <section className="py-20 sm:py-24 bg-white" id="problems">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ScrollReveal className="text-center mb-14">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#101418] mb-4 max-w-3xl mx-auto leading-tight">
            {t('problems.title')}
          </h2>
          <p className="text-base sm:text-lg text-[#4F555E] max-w-2xl mx-auto leading-relaxed">
            {t('problems.subtitle')}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {problems.map(({ Icon, title, description }, index) => (
            <ScrollReveal key={index} delay={Math.min(index * 0.06, 0.24)}>
            <Link
              to={`/problems/${problemSlugs[index]}`}
              className="group flex flex-col p-5 sm:p-6 rounded-2xl border border-[#EBEBEB] hover:border-[#6D5DF6]/50 hover:shadow-[0_8px_32px_rgba(109,93,246,0.09)] active:scale-[0.98] active:border-[#6D5DF6]/50 active:shadow-[0_4px_16px_rgba(109,93,246,0.12)] transition-all duration-200 bg-white h-full"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 bg-[#F4F2FF] rounded-xl flex items-center justify-center group-hover:bg-[#6D5DF6] group-active:bg-[#6D5DF6] transition-colors duration-300 flex-shrink-0">
                  <div className="text-[#6D5DF6] group-hover:text-white group-active:text-white transition-colors duration-300 [&>svg]:w-[18px] [&>svg]:h-[18px]">
                    <Icon />
                  </div>
                </div>
                <h3 className="text-base font-semibold text-[#101418] leading-snug">
                  {title}
                </h3>
              </div>
              <p className="text-[#4F555E] text-sm leading-relaxed flex-1">
                {description}
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-[#6D5DF6] font-medium group-hover:gap-2.5 group-active:gap-2.5 transition-all duration-200">
                <span>{t('problems.seeSolution')}</span>
                <ArrowRight size={11} />
              </div>
            </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mt-10">
          <Link
            to="/solutions"
            className="inline-flex items-center gap-2 px-6 py-2.5 border border-[#E5E5E5] text-[#4F555E] rounded-xl hover:border-[#6D5DF6] hover:text-[#6D5DF6] transition-all duration-200 text-sm font-medium"
          >
            {t('problems.cta')}
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
