import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from './ScrollReveal';
import { submitInquiry } from '../../lib/supabase';
import { challenges } from './ConsultationForm';
import { SuccessModal } from './SuccessModal';
import { PhoneNumberField, isValidPhoneNumber } from './PhoneNumberField';

export function FinalCTA() {
  const { t, language } = useLanguage();
  const ar = language === 'ar';
  const [submitted, setSubmitted]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState(false);
  const [phone, setPhone]           = useState<string | undefined>();
  const [phoneError, setPhoneError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);

    if (!phone || !isValidPhoneNumber(phone)) {
      setPhoneError(true);
      return;
    }
    setPhoneError(false);
    setSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      await submitInquiry({
        type:        'contact',
        name:        String(data.get('name') ?? ''),
        whatsapp:    phone,
        company:     String(data.get('company') ?? '') || undefined,
        challenge:   String(data.get('challenge') ?? '') || undefined,
        source_page: 'home',
        language,
      });
      setSubmitted(true);
      form.reset();
      setPhone(undefined);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-20 sm:py-24 bg-[#101418] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[300px] bg-[#6D5DF6] rounded-full blur-[120px] opacity-[0.18]" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[250px] bg-[#3B2A78] rounded-full blur-[100px] opacity-[0.16]" />
      </div>

      <ScrollReveal className="relative max-w-xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#6D5DF6]/15 border border-[#6D5DF6]/30 rounded-full text-[#B3A8FB] text-xs mb-7">
          <div className="w-1.5 h-1.5 bg-[#6D5DF6] rounded-full animate-pulse" />
          <span>{t('finalCTA.badge')}</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-bold mb-4 leading-snug text-white">
          {t('finalCTA.title')}
        </h2>

        <p className="text-sm sm:text-[15px] text-[#A4ABB5] mb-9 max-w-xl mx-auto leading-[1.75]">
          {t('finalCTA.subtitle')}
        </p>

        <div className="bg-[#181D24] border border-white/10 rounded-2xl p-6 sm:p-7 text-start shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
          <SuccessModal
            open={submitted}
            onClose={() => setSubmitted(false)}
            title={ar ? 'تم إرسال طلبك' : 'Request sent'}
            message={ar ? 'سنتواصل معك قريباً.' : 'We will be in touch soon.'}
          >
            <div className="flex flex-col gap-3 mt-6">
              <Link
                to="/case-studies"
                className="inline-flex items-center justify-center px-4 py-2.5 bg-[#3B2A78] text-white rounded-xl text-sm font-semibold hover:bg-[#4a3690] active:scale-[0.98] transition-all duration-200"
              >
                {ar ? 'استكشف قصص نجاح عملائنا' : 'See customer success stories'}
              </Link>
              <Link
                to="/research"
                className="inline-flex items-center justify-center px-4 py-2.5 border border-white/15 text-white rounded-xl text-sm font-semibold hover:bg-white/5 active:scale-[0.98] transition-all duration-200"
              >
                {ar ? 'اطّلع على أبحاثنا' : 'Explore our research'}
              </Link>
            </div>
          </SuccessModal>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid sm:grid-cols-2 gap-3.5">
                <input
                  type="text" name="name" required placeholder={ar ? 'الاسم' : 'Name'}
                  className="w-full px-4 py-2.5 bg-[#101418] border border-white/10 rounded-xl text-sm text-white placeholder:text-[#6B7280] focus:outline-none focus:border-[#6D5DF6] transition-colors"
                />
                <PhoneNumberField
                  name="phone"
                  label={ar ? 'رقم الهاتف' : 'Phone number'}
                  showLabel={false}
                  required
                  ar={ar}
                  value={phone}
                  onChange={(v) => { setPhone(v); if (phoneError) setPhoneError(false); }}
                  error={phoneError}
                  variant="dark"
                />
              </div>
              <input
                type="text" name="company" placeholder={ar ? 'اسم الشركة' : 'Company name'}
                className="w-full px-4 py-2.5 bg-[#101418] border border-white/10 rounded-xl text-sm text-white placeholder:text-[#6B7280] focus:outline-none focus:border-[#6D5DF6] transition-colors"
              />
              <select
                name="challenge" defaultValue=""
                className="w-full px-4 py-2.5 bg-[#101418] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#6D5DF6] transition-colors"
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
        </div>

        <Link to="/contact" className="inline-block mt-5 text-sm font-medium text-[#B3A8FB] hover:text-white active:scale-95 transition-all">
          {t('finalCTA.secondaryCTA')}
        </Link>
      </ScrollReveal>
    </section>
  );
}
