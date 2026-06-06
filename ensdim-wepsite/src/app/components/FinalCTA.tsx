import { Link } from 'react-router';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export function FinalCTA() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-[#0c0a14] text-white relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[300px] bg-[#3B2A78] rounded-full blur-[100px] opacity-25" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[250px] bg-[#6D5DF6] rounded-full blur-[90px] opacity-15" />
      </div>
      {/* Subtle top border accent */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#6D5DF6]/40 to-transparent" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#6D5DF6]/10 border border-[#6D5DF6]/25 rounded-full text-[#EEEAFE]/65 text-xs mb-7">
          <div className="w-1.5 h-1.5 bg-[#6D5DF6] rounded-full animate-pulse" />
          <span>{t('finalCTA.badge')}</span>
        </div>

        <h2 className="text-2xl sm:text-[2rem] font-bold mb-4 leading-snug text-white">
          {t('finalCTA.title')}
        </h2>

        <p className="text-sm sm:text-[15px] text-[#EEEAFE]/55 mb-9 max-w-xl mx-auto leading-[1.75]">
          {t('finalCTA.subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link to="/book-consultation" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] active:scale-[0.98] transition-all duration-200 text-sm font-semibold shadow-lg shadow-[#D63A3A]/25">
            {t('finalCTA.primaryCTA')}
            <ArrowRight size={15} />
          </Link>
          <Link to="/contact" className="px-7 py-3.5 bg-transparent text-[#EEEAFE]/75 border border-white/15 hover:bg-white/[0.05] hover:border-white/25 rounded-xl transition-all duration-200 text-sm font-medium inline-flex items-center justify-center gap-2">
            {t('finalCTA.secondaryCTA')}
            <MessageSquare size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
