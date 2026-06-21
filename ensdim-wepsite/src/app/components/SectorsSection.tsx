import { Stethoscope, Building2, Briefcase, GraduationCap, HardHat, Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from './ScrollReveal';

export function SectorsSection() {
  const { t, language } = useLanguage();
  const ar = language === 'ar';

  // Desktop sectors (unchanged)
  const desktopSectors = [
    {
      icon: Stethoscope,
      title: t('sectors.sector1Title'),
      description: t('sectors.sector1Desc'),
      caseStudy: '/case-studies/clearer-visibility'
    },
    {
      icon: Building2,
      title: t('sectors.sector2Title'),
      description: t('sectors.sector2Desc'),
      caseStudy: '/case-studies/scattered-follow-up'
    },
    {
      icon: Briefcase,
      title: t('sectors.sector3Title'),
      description: t('sectors.sector3Desc'),
      caseStudy: '/case-studies/reduced-manual-work'
    },
    {
      icon: GraduationCap,
      title: t('sectors.sector4Title'),
      description: t('sectors.sector4Desc'),
      caseStudy: '/case-studies/scaling-with-control'
    },
    {
      icon: HardHat,
      title: t('sectors.sector5Title'),
      description: t('sectors.sector5Desc'),
      caseStudy: '/case-studies/faster-response'
    }
  ];

  // Mobile sectors (6 priority Gulf-focused sectors)
  const mobileSectors = [
    {
      icon: Stethoscope,
      title: ar ? 'العيادات والمراكز الطبية' : 'Clinics & Healthcare',
      description: ar ? 'حجوزات أوضح، متابعة أفضل، وتجربة مريض أكثر تنظيمًا.' : 'Better bookings, follow-up, and patient experience.',
      caseStudy: '/case-studies/clearer-visibility'
    },
    {
      icon: Sparkles,
      title: ar ? 'التجميل والعناية' : 'Beauty & Wellness',
      description: ar ? 'تنظيم الحجوزات، الباقات، التذكيرات، وعودة العملاء بشكل أفضل.' : 'Organize bookings, packages, reminders, and returning customers.',
      caseStudy: '/case-studies/clearer-visibility'
    },
    {
      icon: Building2,
      title: ar ? 'العقارات وخدمات إدارة العقار' : 'Real Estate & Property Services',
      description: ar ? 'حوّل استفسارات العملاء إلى فرص بيع منظمة وواضحة.' : 'Turn property inquiries into organized sales opportunities.',
      caseStudy: '/case-studies/scattered-follow-up'
    },
    {
      icon: Briefcase,
      title: ar ? 'شركات الخدمات والتشغيل' : 'Service Operations',
      description: ar ? 'إدارة أوضح للطلبات، الفرق، المتابعة، والتشغيل اليومي.' : 'Manage requests, teams, follow-up, and daily operations.',
      caseStudy: '/case-studies/reduced-manual-work'
    },
    {
      icon: HardHat,
      title: ar ? 'المقاولات والتشغيل الميداني' : 'Construction & Field Operations',
      description: ar ? 'متابعة أوضح للطلبات، المشاريع، الفرق، وتحديثات العملاء.' : 'Track requests, projects, teams, and client updates clearly.',
      caseStudy: '/case-studies/faster-response'
    },
    {
      icon: GraduationCap,
      title: ar ? 'التعليم والتدريب' : 'Education & Training',
      description: ar ? 'تسجيل أسهل، متابعة أفضل للطلاب، ورحلات تعليمية أوضح.' : 'Smarter registration, student follow-up, and learning journeys.',
      caseStudy: '/case-studies/scaling-with-control'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#101418] text-white">
      <style>{`
        @keyframes sector-icon-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-3px) rotate(-3deg); }
          50% { transform: translateY(-6px) rotate(3deg); }
          75% { transform: translateY(-3px) rotate(-2deg); }
        }
        @keyframes sector-glow {
          0%, 100% { box-shadow: 0 0 0 rgba(109, 93, 246, 0); }
          50% { box-shadow: 0 0 30px rgba(109, 93, 246, 0.5), 0 0 60px rgba(109, 93, 246, 0.2); }
        }
        @keyframes sector-border-pulse {
          0%, 100% { border-color: rgba(109, 93, 246, 0.7); }
          50% { border-color: rgba(109, 93, 246, 1); }
        }
        .sector-card:hover .sector-icon {
          animation: sector-icon-float 0.8s ease-in-out infinite;
        }
        .sector-card:hover {
          animation: sector-glow 2s ease-in-out infinite, sector-border-pulse 1.5s ease-in-out infinite;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ScrollReveal className="text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4 text-white">
            {/* Mobile title */}
            <span className="sm:hidden">
              {ar ? 'أين تناسب أنظمتنا أكثر؟' : 'Where our systems fit best'}
            </span>
            {/* Desktop title */}
            <span className="hidden sm:inline">
              {t('sectors.title')}
            </span>
          </h2>
          <p className="text-sm sm:text-xl text-[#EEEAFE]/85 max-w-3xl mx-auto">
            {/* Mobile subtitle */}
            <span className="sm:hidden">
              {ar ? 'للأعمال التي يؤثر فيها تنظيم تجربة العميل، المتابعة، الطلبات، والتشغيل اليومي على النمو مباشرة.' : 'For businesses where customer experience, follow-up, requests, and daily operations directly affect growth.'}
            </span>
            {/* Desktop subtitle */}
            <span className="hidden sm:inline">
              {t('sectors.subtitle')}
            </span>
          </p>
        </ScrollReveal>

        {/* Mobile: 6 sectors in 2 columns */}
        <div className="grid grid-cols-2 gap-3 sm:hidden">
          {mobileSectors.map((sector, index) => (
            <ScrollReveal key={index} delay={Math.min(index * 0.05, 0.2)}>
            <Link
              to={sector.caseStudy}
              className="sector-card group relative p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-[#6D5DF6]/70 hover:bg-white/[0.1] hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#6D5DF6]/0 via-[#6D5DF6]/0 to-[#6D5DF6]/0 group-hover:from-[#6D5DF6]/10 group-hover:via-[#6D5DF6]/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />

              <div className="relative">
                <div className="sector-icon w-9 h-9 bg-[#6D5DF6]/15 rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#6D5DF6] group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#6D5DF6]/50 transition-all duration-300">
                  <sector.icon className="text-[#6D5DF6] group-hover:text-white transition-colors duration-300 w-4 h-4" strokeWidth={2.5} />
                </div>
                <h3 className="text-xs font-semibold mb-1.5 text-white leading-snug group-hover:text-[#6D5DF6] transition-colors duration-300">
                  {sector.title}
                </h3>
                <p className="text-[10px] text-[#EEEAFE]/70 group-hover:text-[#EEEAFE]/90 leading-relaxed transition-colors duration-300">
                  {sector.description}
                </p>
              </div>
            </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Desktop: 5 sectors in 5 columns */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {desktopSectors.map((sector, index) => (
            <ScrollReveal key={index} delay={Math.min(index * 0.06, 0.24)}>
            <Link
              to={sector.caseStudy}
              className="sector-card group relative p-6 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-[#6D5DF6]/70 hover:bg-white/[0.1] hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#6D5DF6]/0 via-[#6D5DF6]/0 to-[#6D5DF6]/0 group-hover:from-[#6D5DF6]/10 group-hover:via-[#6D5DF6]/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />

              <div className="relative">
                <div className="sector-icon w-11 h-11 bg-[#6D5DF6]/15 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#6D5DF6] group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#6D5DF6]/50 transition-all duration-300">
                  <sector.icon className="text-[#6D5DF6] group-hover:text-white transition-colors duration-300 w-5 h-5" strokeWidth={2.5} />
                </div>
                <h3 className="text-sm font-semibold mb-2 text-white leading-snug group-hover:text-[#6D5DF6] transition-colors duration-300">
                  {sector.title}
                </h3>
                <p className="text-xs text-[#EEEAFE]/70 group-hover:text-[#EEEAFE]/90 leading-relaxed transition-colors duration-300">
                  {sector.description}
                </p>
              </div>
            </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile note */}
        <div className="sm:hidden mt-6 text-center">
          <p className="text-[10px] text-[#EEEAFE]/55 leading-relaxed px-4">
            {ar ? 'مناسبة أيضًا لـ: الضيافة، مراكز صيانة السيارات، اللوجستيات، ومكاتب الاستشارات.' : 'Also suitable for: Hospitality, Automotive Service Centers, Logistics, Consulting Firms.'}
          </p>
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <p className="text-[#EEEAFE]/65 text-xs sm:text-sm mb-2">
            {t('sectors.question')}
          </p>
          <Link to="/book-consultation" className="text-sm sm:text-base text-[#6D5DF6] hover:text-[#8B7BF7] transition-colors font-medium">
            {t('sectors.cta')}
          </Link>
        </div>
      </div>
    </section>
  );
}
