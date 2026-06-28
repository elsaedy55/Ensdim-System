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
    <section className="py-20 sm:py-24 bg-white border-y border-[#EBEBEB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#101418] mb-4">
            {t('methodology.title')}
          </h2>
          <p className="text-base sm:text-xl text-[#4F555E] max-w-3xl mx-auto">
            {t('methodology.subtitle')}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {steps.map((step, index) => (
            <ScrollReveal key={index} delay={Math.min(index * 0.06, 0.3)}>
              <div className="group relative flex flex-col p-6 rounded-2xl border border-[#EBEBEB] bg-[#FAFAFC] hover:bg-white hover:border-[#6D5DF6]/50 hover:shadow-[0_8px_32px_rgba(109,93,246,0.09)] transition-all duration-300 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 bg-[#F4F2FF] rounded-xl flex items-center justify-center group-hover:bg-[#6D5DF6] transition-colors duration-300 flex-shrink-0">
                    <step.Icon size={22} className="text-[#6D5DF6] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-3xl font-bold text-[#6D5DF6]/15 group-hover:text-[#6D5DF6]/25 transition-colors duration-300 leading-none">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#101418] mb-2">{step.title}</h3>
                <p className="text-sm text-[#4F555E] leading-relaxed">{step.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
