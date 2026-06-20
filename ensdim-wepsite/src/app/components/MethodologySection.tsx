import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from './ScrollReveal';
import {
  IconDiagnose,
  IconMap,
  IconDesign,
  IconBuild,
  IconAutomate,
  IconImprove,
} from './EnsdimIcons';

export function MethodologySection() {
  const { t } = useLanguage();

  const steps = [
    { Icon: IconDiagnose, title: t('methodology.step1Title'), description: t('methodology.step1Desc') },
    { Icon: IconMap, title: t('methodology.step2Title'), description: t('methodology.step2Desc') },
    { Icon: IconDesign, title: t('methodology.step3Title'), description: t('methodology.step3Desc') },
    { Icon: IconBuild, title: t('methodology.step4Title'), description: t('methodology.step4Desc') },
    { Icon: IconAutomate, title: t('methodology.step5Title'), description: t('methodology.step5Desc') },
    { Icon: IconImprove, title: t('methodology.step6Title'), description: t('methodology.step6Desc') },
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#EEEAFE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#101418] mb-4">
            {t('methodology.title')}
          </h2>
          <p className="text-base sm:text-xl text-[#4F555E] max-w-3xl mx-auto">
            {t('methodology.subtitle')}
          </p>
        </ScrollReveal>

        {/* Desktop timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            <div className="absolute top-[44px] left-[8.33%] right-[8.33%] h-px bg-gradient-to-r from-transparent via-[#6D5DF6]/30 to-transparent" />
            <div className="grid grid-cols-6 gap-3">
              {steps.map((step, index) => (
                <ScrollReveal key={index} delay={Math.min(index * 0.06, 0.3)} className="flex flex-col items-center text-center group">
                  <div className="relative z-10 w-[88px] h-[88px] bg-white rounded-full border border-[#E5E5E5] group-hover:border-[#6D5DF6]/60 group-hover:shadow-[0_4px_20px_rgba(109,93,246,0.12)] flex items-center justify-center mb-4 transition-all duration-300">
                    <step.Icon
                      size={30}
                      className="text-[#6D5DF6] group-hover:text-[#3B2A78] transition-colors duration-300"
                    />
                    <span className="absolute -top-1 -end-1 w-5 h-5 bg-[#3B2A78] text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-[#101418] mb-1 leading-snug">{step.title}</h3>
                  <p className="text-[11px] text-[#4F555E] leading-relaxed">{step.description}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile list */}
        <div className="lg:hidden space-y-0">
          {steps.map((step, index) => (
            <ScrollReveal key={index} delay={Math.min(index * 0.05, 0.2)} className="flex gap-4">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-12 h-12 bg-white rounded-full border border-[#6D5DF6]/25 flex items-center justify-center shadow-sm relative">
                  <step.Icon size={20} className="text-[#6D5DF6]" />
                  <span className="absolute -top-1 -end-1 w-4 h-4 bg-[#3B2A78] text-white rounded-full flex items-center justify-center text-[9px] font-bold">
                    {index + 1}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-px flex-1 my-2 bg-gradient-to-b from-[#6D5DF6]/25 to-transparent min-h-[24px]" />
                )}
              </div>
              <div className="pb-7 pt-1">
                <h3 className="text-sm font-bold text-[#101418] mb-1">{step.title}</h3>
                <p className="text-sm text-[#4F555E] leading-relaxed">{step.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
