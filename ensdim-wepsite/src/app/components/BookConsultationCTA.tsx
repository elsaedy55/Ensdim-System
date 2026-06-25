import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface BookConsultationCTAProps {
  variant?: 'default' | 'compact' | 'inline';
  message?: string;
  messageAr?: string;
}

export function BookConsultationCTA({ variant = 'default', message, messageAr }: BookConsultationCTAProps) {
  const { language } = useLanguage();
  const ar = language === 'ar';

  const defaultMessage = ar
    ? 'هل تواجه مشكلة مشابهة في عملك؟'
    : 'Facing a similar challenge in your business?';

  const ctaText = ar ? 'احجز استشارة مجانية' : 'Book a Free Consultation';

  if (variant === 'compact') {
    return (
      <div className="py-12 bg-gradient-to-br from-[#F4F2FF] to-[#EEEAFE] border-y border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm text-[#3B2A78] mb-4 font-medium">
            {message || messageAr || defaultMessage}
          </p>
          <Link
            to="/book-consultation"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] active:scale-[0.98] transition-all duration-200 text-sm font-semibold shadow-lg shadow-[#D63A3A]/25"
          >
            {ctaText} <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <p className="text-sm text-[#4F555E] font-medium">
          {message || messageAr || defaultMessage}
        </p>
        <Link
          to="/book-consultation"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] active:scale-[0.97] transition-all duration-200 text-sm font-semibold"
        >
          {ctaText} <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gradient-to-br from-[#F4F2FF] via-white to-[#EEEAFE] border-y border-[#E5E5E5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#6D5DF6]/10 border border-[#6D5DF6]/20 rounded-full mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D63A3A] animate-pulse" />
          <span className="text-[10px] text-[#3B2A78] font-semibold uppercase tracking-wider">
            {ar ? 'استشارة مجانية' : 'Free Consultation'}
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-[#101418] mb-3">
          {message || (ar
            ? 'دعنا نحلل عملياتك ونقترح الحل المناسب'
            : "Let's analyze your operations and suggest the right solution"
          )}
        </h3>
        <p className="text-sm text-[#4F555E] mb-6 max-w-xl mx-auto leading-relaxed">
          {ar
            ? 'احجز استشارة مجانية مدتها 30 دقيقة لمناقشة التحديات التي تواجهها والحلول المتاحة.'
            : 'Book a free 30-minute consultation to discuss your challenges and available solutions.'}
        </p>
        <Link
          to="/book-consultation"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] active:scale-[0.98] transition-all duration-200 text-sm font-semibold shadow-xl shadow-[#D63A3A]/30"
        >
          {ctaText} <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
