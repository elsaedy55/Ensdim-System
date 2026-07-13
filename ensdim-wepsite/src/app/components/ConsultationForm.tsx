import { useState } from 'react';
import { Link } from 'react-router';
import { useLanguage } from '../../contexts/LanguageContext';
import { submitInquiry } from '../../lib/supabase';
import { SuccessModal } from './SuccessModal';
import { PhoneNumberField, isValidPhoneNumber } from './PhoneNumberField';

export const challenges = [
  { en: 'Losing leads', ar: 'ضياع العملاء المحتملين' },
  { en: 'Weak follow-up', ar: 'متابعة ضعيفة' },
  { en: 'Slow response', ar: 'بطء في الرد' },
  { en: 'No visibility', ar: 'غياب الرؤية' },
  { en: 'Manual operations', ar: 'عمليات يدوية' },
  { en: 'Need a website / system', ar: 'أحتاج موقعاً أو نظاماً' },
  { en: 'Need automation', ar: 'أحتاج أتمتة' },
  { en: 'Need AI layer', ar: 'أحتاج طبقة ذكاء اصطناعي' },
];

const budgets = [
  { en: 'Under $5,000', ar: 'أقل من $5,000' },
  { en: '$5,000 – $15,000', ar: '$5,000 – $15,000' },
  { en: '$15,000 – $50,000', ar: '$15,000 – $50,000' },
  { en: '$50,000+', ar: '$50,000+' },
  { en: 'Not sure yet', ar: 'لم أحدد بعد' },
];

interface ConsultationFormProps {
  title?: string;
  hiddenFields?: Record<string, string>;
}

export function ConsultationForm({ title, hiddenFields = {} }: ConsultationFormProps) {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const [selectedChallenge, setSelectedChallenge] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [phone, setPhone] = useState<string | undefined>();
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
        type:          'consultation',
        name:          String(data.get('name') ?? ''),
        whatsapp:      phone,
        email:         String(data.get('email') ?? '') || undefined,
        company:       String(data.get('company') ?? '') || undefined,
        role:          String(data.get('role') ?? '') || undefined,
        country:       String(data.get('country') ?? '') || undefined,
        challenge:     selectedChallenge || undefined,
        budget:        selectedBudget || undefined,
        details:       String(data.get('details') ?? '') || undefined,
        source_page:   hiddenFields.source_page,
        interest_type: hiddenFields.interest_type,
        clicked_item:  hiddenFields.clicked_service ?? hiddenFields.clicked_product ?? hiddenFields.clicked_solution ?? hiddenFields.clicked_case_study ?? hiddenFields.clicked_problem,
        language,
      });
      setSubmitted(true);
      form.reset();
      setSelectedChallenge('');
      setSelectedBudget('');
      setPhone(undefined);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const formTitle = title || (ar ? 'احجز استشارة.' : 'Book a consultation.');

  return (
    <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 sm:p-8">
      <SuccessModal
        open={submitted}
        onClose={() => setSubmitted(false)}
        title={ar ? 'تم إرسال طلبك' : 'Request sent'}
        message={ar ? 'سنتواصل معك خلال يوم عمل.' : 'We will be in touch within one business day.'}
      >
        <div className="flex items-center justify-center gap-4 text-sm font-medium mt-5">
          <Link to="/case-studies" className="text-[#6D5DF6] hover:underline">{ar ? 'دراسات الحالة' : 'Case studies'}</Link>
          <span className="text-[#E5E5E5]">•</span>
          <Link to="/research" className="text-[#6D5DF6] hover:underline">{ar ? 'الأبحاث' : 'Research'}</Link>
        </div>
      </SuccessModal>

      <>
          <h2 className="text-xl sm:text-2xl font-bold text-[#101418] mb-6">{formTitle}</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Hidden fields for tracking */}
            {Object.entries(hiddenFields).map(([key, value]) => (
              <input key={key} type="hidden" name={key} value={value} />
            ))}
            <input type="hidden" name="language" value={language} />

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { name: 'name', label: ar ? 'الاسم' : 'Name', required: true },
                { name: 'company', label: ar ? 'الشركة' : 'Company' },
                { name: 'role', label: ar ? 'المسمى الوظيفي' : 'Role' },
                { name: 'email', label: ar ? 'البريد الإلكتروني' : 'Email', type: 'email' },
                { name: 'country', label: ar ? 'البلد' : 'Country' },
              ].map((f) => (
                <div key={f.name}>
                  <label className="block text-xs font-semibold text-[#101418] mb-1.5">
                    {f.label}{f.required && <span className="text-[#D63A3A]"> *</span>}
                  </label>
                  <input
                    type={f.type || 'text'}
                    name={f.name}
                    required={f.required}
                    className="w-full px-4 py-2.5 border border-[#E5E5E5] rounded-xl text-sm text-[#101418] focus:outline-none focus:border-[#6D5DF6] transition-colors"
                    placeholder={f.label}
                  />
                </div>
              ))}
              <PhoneNumberField
                name="whatsapp"
                label={ar ? 'واتساب' : 'WhatsApp'}
                required
                ar={ar}
                value={phone}
                onChange={(v) => { setPhone(v); if (phoneError) setPhoneError(false); }}
                error={phoneError}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="challenge" className="block text-xs font-semibold text-[#101418] mb-1.5">
                  {ar ? 'أكبر تحدٍّ تواجهه' : 'Your biggest challenge'}
                </label>
                <select
                  id="challenge"
                  value={selectedChallenge}
                  onChange={(e) => setSelectedChallenge(e.target.value)}
                  className="w-full px-4 py-2.5 border border-[#E5E5E5] rounded-xl text-sm text-[#101418] focus:outline-none focus:border-[#6D5DF6] transition-colors bg-white"
                >
                  <option value="">{ar ? 'اختر...' : 'Select...'}</option>
                  {challenges.map((c) => {
                    const label = ar ? c.ar : c.en;
                    return <option key={label} value={label}>{label}</option>;
                  })}
                </select>
                <input type="hidden" name="challenge" value={selectedChallenge} />
              </div>

              <div>
                <label htmlFor="budget" className="block text-xs font-semibold text-[#101418] mb-1.5">
                  {ar ? 'الميزانية المتوقعة' : 'Expected budget'}
                </label>
                <select
                  id="budget"
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="w-full px-4 py-2.5 border border-[#E5E5E5] rounded-xl text-sm text-[#101418] focus:outline-none focus:border-[#6D5DF6] transition-colors bg-white"
                >
                  <option value="">{ar ? 'اختر...' : 'Select...'}</option>
                  {budgets.map((b) => {
                    const label = ar ? b.ar : b.en;
                    return <option key={label} value={label}>{label}</option>;
                  })}
                </select>
                <input type="hidden" name="budget" value={selectedBudget} />
              </div>
            </div>

            <div>
              <label htmlFor="details" className="block text-xs font-semibold text-[#101418] mb-1.5">
                {ar ? 'أخبرنا المزيد' : 'Tell us more'}
              </label>
              <textarea
                id="details"
                name="details"
                rows={4}
                className="w-full px-4 py-2.5 border border-[#E5E5E5] rounded-xl text-sm text-[#101418] focus:outline-none focus:border-[#6D5DF6] transition-colors resize-none"
                placeholder={ar ? 'اشرح موقفك بإيجاز...' : 'Briefly describe your situation...'}
              />
            </div>

            {error && (
              <p className="text-xs text-[#D63A3A]">
                {ar ? 'حدث خطأ أثناء الإرسال. حاول مرة أخرى.' : 'Something went wrong while sending. Please try again.'}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-[#6D5DF6] text-white rounded-xl hover:bg-[#5d4de6] transition-colors text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (ar ? 'جارٍ الإرسال...' : 'Sending...') : (ar ? 'إرسال الطلب' : 'Send Request')}
            </button>
          </form>
      </>
    </div>
  );
}
