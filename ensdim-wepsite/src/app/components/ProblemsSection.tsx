import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

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
function IconMemoryFollowUp() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="9" r="4" />
      <path d="M12 13v2" />
      <path d="M15 18h4" opacity="0.5" strokeDasharray="1.5 1.5" />
      <path d="M15 21h2" opacity="0.3" strokeDasharray="1.5 1.5" />
      <circle cx="13" cy="18" r="1" opacity="0.5" />
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
function IconGrowthChaos() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 20h18" opacity="0.4" />
      <path d="M6 20v-5M10 20v-9M14 20v-13M18 20V4" />
      <path d="M14 7l2-2M18 4l2.5-1.5" opacity="0.4" strokeDasharray="1.5 1.5" />
    </svg>
  );
}

const problemSlugs = [
  'leads-get-lost',
  'follow-up-memory',
  'slow-response',
  'no-visibility',
  'repeated-work',
  'growth-pressure',
];

export function ProblemsSection() {
  const { t } = useLanguage();

  const problems = [
    { Icon: IconScatteredLeads,  title: t('problems.problem1Title'), description: t('problems.problem1Desc') },
    { Icon: IconMemoryFollowUp,  title: t('problems.problem2Title'), description: t('problems.problem2Desc') },
    { Icon: IconSlowResponse,    title: t('problems.problem3Title'), description: t('problems.problem3Desc') },
    { Icon: IconNoVisibility,    title: t('problems.problem4Title'), description: t('problems.problem4Desc') },
    { Icon: IconDuplicatedWork,  title: t('problems.problem5Title'), description: t('problems.problem5Desc') },
    { Icon: IconGrowthChaos,     title: t('problems.problem6Title'), description: t('problems.problem6Desc') },
  ];

  return (
    <section className="pt-16 pb-24 sm:pt-20 sm:pb-28 bg-white" id="problems">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#101418] mb-4 max-w-3xl mx-auto leading-tight">
            {t('problems.title')}
          </h2>
          <p className="text-base sm:text-lg text-[#69717D] max-w-2xl mx-auto leading-relaxed">
            {t('problems.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map(({ Icon, title, description }, index) => (
            <Link
              key={index}
              to={`/problems/${problemSlugs[index]}`}
              className="group flex flex-col p-6 sm:p-7 rounded-2xl border border-[#EBEBEB] hover:border-[#6D5DF6]/50 hover:shadow-[0_8px_32px_rgba(109,93,246,0.09)] transition-all duration-300 bg-white"
            >
              <div className="w-12 h-12 bg-[#F4F2FF] rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#6D5DF6] transition-colors duration-300 flex-shrink-0">
                <div className="text-[#6D5DF6] group-hover:text-white transition-colors duration-300">
                  <Icon />
                </div>
              </div>
              <h3 className="text-base font-semibold text-[#101418] mb-2 leading-snug">
                {title}
              </h3>
              <p className="text-[#69717D] text-sm leading-relaxed flex-1">
                {description}
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-xs text-[#6D5DF6] font-medium opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200">
                <span>See solution</span>
                <ArrowRight size={11} />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/solutions/problems"
            className="inline-flex items-center gap-2 px-6 py-2.5 border border-[#E5E5E5] text-[#69717D] rounded-xl hover:border-[#6D5DF6] hover:text-[#6D5DF6] transition-all duration-200 text-sm font-medium"
          >
            {t('problems.cta')}
          </Link>
        </div>
      </div>
    </section>
  );
}
