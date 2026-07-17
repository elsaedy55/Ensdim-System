import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from './ScrollReveal';
import ensdimLogo from '../../imports/Asset_6__1_.png';
import {
  IconProjectProgress,
  IconDocuments,
  IconPayments,
  IconComments,
  IconMultiProject,
} from './EnsdimIcons';

export function ClientPortalFeature() {
  const { t, language } = useLanguage();

  const features = [
    { Icon: IconProjectProgress, title: t('clientPortal.feature1Title'), description: t('clientPortal.feature1Desc') },
    { Icon: IconDocuments,       title: t('clientPortal.feature2Title'), description: t('clientPortal.feature2Desc') },
    { Icon: IconPayments,        title: t('clientPortal.feature3Title'), description: t('clientPortal.feature3Desc') },
    { Icon: IconComments,        title: t('clientPortal.feature4Title'), description: t('clientPortal.feature4Desc') },
    { Icon: IconMultiProject,    title: t('clientPortal.feature5Title'), description: t('clientPortal.feature5Desc') },
  ];

  return (
    <section id="client-portal" className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ScrollReveal className="mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#101418] mb-2">
            {t('clientPortal.sectionLabel')}
          </h2>
          <p className="text-sm text-[#4F555E] mb-3 max-w-2xl">
            {t('clientPortal.title')}
          </p>
          <p className="text-sm text-[#4F555E]/70 max-w-2xl">
            {t('clientPortal.description')}
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Features list */}
          <div className="space-y-3">
            {features.map((feature, index) => (
              <ScrollReveal
                key={index}
                delay={Math.min(index * 0.06, 0.24)}
                className="flex gap-4 p-4 rounded-xl"
              >
                <div className="flex-shrink-0 w-11 h-11 bg-[#EEEAFE] rounded-xl flex items-center justify-center">
                  <feature.Icon
                    size={20}
                    className="text-[#6D5DF6]"
                  />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#101418] mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#4F555E] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Dashboard mockup */}
          <ScrollReveal delay={0.15} className="relative overflow-hidden bg-gradient-to-br from-[#F4F2FF] via-[#EEEAFE]/60 to-white rounded-2xl border border-[#DDD8FB] p-5 sm:p-7 shadow-[0_8px_40px_rgba(109,93,246,0.08)]">
            {/* Soft glow behind card */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#6D5DF6] rounded-full blur-[48px] opacity-10 pointer-events-none" />

            <div className="bg-white rounded-xl shadow-[0_4px_24px_rgba(109,93,246,0.1)] overflow-hidden border border-[#E8E4FF]">
              {/* Portal top bar */}
              <div className="bg-logo-black px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold tracking-tight leading-none">
                    <span style={{ color: '#D63A3A' }}>EN</span>
                    <span style={{ color: '#fff' }}>SDIM</span>
                  </span>
                  <span className="text-white/20 text-[10px]">/</span>
                  <span className="text-white/40 text-[10px]">Client Workspace</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                  <span className="text-white/40 text-[10px]">Live</span>
                </div>
              </div>

              <div className="p-4 space-y-3.5">
                {/* Project header row */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] text-[#4F555E] mb-0.5">Active Project</p>
                    <h4 className="text-sm font-bold text-[#101418]">CRM Implementation</h4>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-[#6D5DF6]">67%</p>
                    <p className="text-[10px] text-[#4F555E]">Complete</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-[10px] mb-1.5">
                    <span className="text-[#4F555E]">Phase 3 of 4 — Build</span>
                    <span className="text-[#6D5DF6] font-semibold">In Progress</span>
                  </div>
                  <div className="h-1.5 bg-[#E5E5E5] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#6D5DF6] to-[#3B2A78] rounded-full" style={{ width: '67%' }} />
                  </div>
                </div>

                {/* Phase chips */}
                <div className="flex gap-1.5 flex-wrap">
                  {[
                    { label: 'Discovery', done: true },
                    { label: 'Design', done: true },
                    { label: 'Build', active: true },
                    { label: 'Launch', done: false },
                  ].map((p, i) => (
                    <span
                      key={i}
                      className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium ${
                        p.done
                          ? 'bg-[#6D5DF6]/10 text-[#6D5DF6]'
                          : p.active
                          ? 'bg-[#3B2A78] text-white'
                          : 'bg-[#F0F0F0] text-[#4F555E]'
                      }`}
                    >
                      {p.done ? `${p.label} ✓` : p.active ? `${p.label} →` : p.label}
                    </span>
                  ))}
                </div>

                {/* Status grid */}
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Proposal',      value: 'Approved',  dot: '#22c55e' },
                    { label: 'Contract',      value: 'Signed',    dot: '#22c55e' },
                    { label: 'Payments',      value: '2 / 3 Paid', dot: '#F59E0B' },
                    { label: 'Change Req.',   value: '1 Pending', dot: '#6D5DF6' },
                  ].map((s, i) => (
                    <div key={i} className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg p-2.5">
                      <p className="text-[10px] text-[#4F555E] mb-1">{s.label}</p>
                      <p className="text-xs font-semibold text-[#101418] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.dot }} />
                        {s.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Comment preview */}
                <div className="bg-[#F8F8FF] border border-[#E8E4FF] rounded-lg px-3 py-2 flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#6D5DF6]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-[8px] font-bold text-[#6D5DF6]">E</span>
                  </div>
                  <p className="text-[10px] text-[#4F555E]">
                    <span className="text-[#101418] font-semibold">Ensdim Team: </span>
                    Phase 3 build started — tracker updated.
                  </p>
                </div>

                <a
                  href="https://app.ensdim.com/login"
                  className="block w-full py-2.5 bg-[#3B2A78] hover:bg-[#4a3690] text-white rounded-lg text-xs font-semibold hover:shadow-[0_4px_16px_rgba(59,42,120,0.35)] active:scale-[0.97] transition-all duration-200 text-center"
                >
                  {language === 'ar' ? 'ادخل إلى مساحة العميل' : 'Access Your Workspace'}
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <a
            href="https://app.ensdim.com/login"
            className="px-8 py-3 bg-[#3B2A78] text-white rounded-xl hover:bg-[#4a3690] active:scale-[0.97] transition-all duration-200 font-medium inline-flex items-center justify-center gap-2"
          >
            {t('clientPortal.primaryCTA')}
          </a>
          <a
            href="https://app.ensdim.com/register"
            className="px-8 py-3 rounded-xl transition-all duration-200 font-medium inline-flex items-center justify-center gap-2 active:scale-[0.97] bg-transparent text-[#101418] border border-[#E5E5E5] hover:border-[#6D5DF6] hover:text-[#6D5DF6]"
          >
            {t('clientPortal.secondaryCTA')}
          </a>
        </div>
        <p className="text-center text-sm text-[#4F555E] mt-4">
          {t('clientPortal.note')}
        </p>
      </div>
    </section>
  );
}
