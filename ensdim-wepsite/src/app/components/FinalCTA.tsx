import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from './ScrollReveal';
import { submitInquiry } from '../../lib/supabase';
import { challenges } from './ConsultationForm';

export function FinalCTA() {
  const { t, language } = useLanguage();
  const ar = language === 'ar';
  const [submitted, setSubmitted]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    setSubmitting(true);

    const data = new FormData(e.currentTarget);
    try {
      await submitInquiry({
        type:        'contact',
        name:        String(data.get('name') ?? ''),
        whatsapp:    String(data.get('phone') ?? ''),
        company:     String(data.get('company') ?? '') || undefined,
        challenge:   String(data.get('challenge') ?? '') || undefined,
        source_page: 'home',
        language,
      });
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-20 sm:py-24 bg-[#0c0a14] text-white relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[300px] bg-[#3B2A78] rounded-full blur-[100px] opacity-25" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[250px] bg-[#6D5DF6] rounded-full blur-[90px] opacity-15" />
      </div>
      {/* Subtle top border accent */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#6D5DF6]/40 to-transparent" />

      <ScrollReveal className="relative max-w-xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#6D5DF6]/10 border border-[#6D5DF6]/25 rounded-full text-[#EEEAFE]/80 text-xs mb-7">
          <div className="w-1.5 h-1.5 bg-[#6D5DF6] rounded-full animate-pulse" />
          <span>{t('finalCTA.badge')}</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-bold mb-4 leading-snug text-white">
          {t('finalCTA.title')}
        </h2>

        <p className="text-sm sm:text-[15px] text-[#EEEAFE]/70 mb-9 max-w-xl mx-auto leading-[1.75]">
          {t('finalCTA.subtitle')}
        </p>

        <div className="bg-white rounded-2xl p-6 sm:p-7 text-start">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg viewBox="0 0 20 20" fill="none" className="w-7 h-7 text-green-600 no-mirror">
                  <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-[#101418] font-semibold mb-1">{ar ? 'تم إرسال طلبك' : 'Request sent'}</p>
              <p className="text-sm text-[#4F555E] mb-5">{ar ? 'سنتواصل معك قريباً.' : 'We will be in touch soon.'}</p>
              <div className="flex items-center justify-center gap-4 text-sm font-medium">
                <Link to="/case-studies" className="text-[#6D5DF6] hover:underline">{ar ? 'دراسات الحالة' : 'Case studies'}</Link>
                <span className="text-[#E5E5E5]">•</span>
                <Link to="/research" className="text-[#6D5DF6] hover:underline">{ar ? 'الأبحاث' : 'Research'}</Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid sm:grid-cols-2 gap-3.5">
                <input
                  type="text" name="name" required placeholder={ar ? 'الاسم' : 'Name'}
                  className="w-full px-4 py-2.5 border border-[#E5E5E5] rounded-xl text-sm text-[#101418] focus:outline-none focus:border-[#6D5DF6] transition-colors"
                />
                <input
                  type="tel" name="phone" required placeholder={ar ? 'رقم الهاتف' : 'Phone number'}
                  className="w-full px-4 py-2.5 border border-[#E5E5E5] rounded-xl text-sm text-[#101418] focus:outline-none focus:border-[#6D5DF6] transition-colors"
                />
              </div>
              <input
                type="text" name="company" placeholder={ar ? 'اسم الشركة' : 'Company name'}
                className="w-full px-4 py-2.5 border border-[#E5E5E5] rounded-xl text-sm text-[#101418] focus:outline-none focus:border-[#6D5DF6] transition-colors"
              />
              <select
                name="challenge" defaultValue=""
                className="w-full px-4 py-2.5 border border-[#E5E5E5] rounded-xl text-sm text-[#101418] focus:outline-none focus:border-[#6D5DF6] transition-colors bg-white"
              >
                <option value="">{ar ? 'ما هو التحدي الذي تواجهه؟ (اختياري)' : 'What challenge are you facing? (optional)'}</option>
                {challenges.map((c) => (
                  <option key={c.en} value={ar ? c.ar : c.en}>{ar ? c.ar : c.en}</option>
                ))}
              </select>
              {error && (
                <p className="text-xs text-[#D63A3A]">
                  {ar ? 'حدث خطأ أثناء الإرسال. حاول مرة أخرى.' : 'Something went wrong. Please try again.'}
                </p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-[#D63A3A] text-white rounded-xl text-sm font-semibold hover:bg-[#c23030] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 inline-flex items-center justify-center gap-2"
              >
                {submitting ? (ar ? 'جارٍ الإرسال...' : 'Sending...') : t('finalCTA.primaryCTA')}
                {!submitting && <ArrowRight size={15} />}
              </button>
            </form>
          )}
        </div>

        <Link to="/contact" className="inline-block mt-5 text-sm font-medium text-[#EEEAFE]/70 hover:text-[#EEEAFE]/90 active:scale-95 transition-all">
          {t('finalCTA.secondaryCTA')}
        </Link>
      </ScrollReveal>
    </section>
  );
}
