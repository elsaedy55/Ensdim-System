import { useState } from 'react';
import { Link } from 'react-router';
import { useLanguage } from '../../contexts/LanguageContext';
import { submitInquiry } from '../../lib/supabase';
import { SuccessModal } from './SuccessModal';
import { PhoneNumberField, isValidPhoneNumber } from './PhoneNumberField';

const budgets = [
  { en: 'Under $5,000', ar: 'أقل من $5,000' },
  { en: '$5,000 – $15,000', ar: '$5,000 – $15,000' },
  { en: '$15,000 – $50,000', ar: '$15,000 – $50,000' },
  { en: '$50,000+', ar: '$50,000+' },
  { en: 'Not sure yet', ar: 'لم أحدد بعد' },
];

interface ServiceRequestFormProps {
  needsLabel: string;
  needsOptions: string[];
  stageLabel: string;
  stageOptions: string[];
  freeTextPrompt: string;
  hiddenFields: Record<string, string>;
}

export function ServiceRequestForm({ needsLabel, needsOptions, stageLabel, stageOptions, freeTextPrompt, hiddenFields }: ServiceRequestFormProps) {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const [selectedNeed, setSelectedNeed] = useState('');
  const [selectedStage, setSelectedStage] = useState('');
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
    const freeText = String(data.get('details') ?? '');
    const detailsParts = [
      selectedStage && `${stageLabel}: ${selectedStage}`,
      freeText,
    ].filter(Boolean);

    try {
      await submitInquiry({
        type: 'consultation',
        name: String(data.get('name') ?? ''),
        whatsapp: phone,
        email: String(data.get('email') ?? '') || undefined,
        company: String(data.get('company') ?? '') || undefined,
        role: String(data.get('role') ?? '') || undefined,
        country: String(data.get('country') ?? '') || undefined,
        challenge: selectedNeed || undefined,
        budget: selectedBudget || undefined,
        details: detailsParts.join('\n\n') || undefined,
        source_page: hiddenFields.source_page,
        interest_type: hiddenFields.interest_type,
        clicked_item: hiddenFields.clicked_service,
        language,
      });
      setSubmitted(true);
      form.reset();
      setSelectedNeed('');
      setSelectedStage('');
      setSelectedBudget('');
      setPhone(undefined);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

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
          <h2 className="text-xl sm:text-2xl font-bold text-[#101418] mb-2">
            {ar ? 'ابدأ خطوة واضحة لتنفيذ هذه الخدمة.' : 'Start with a clear step for this service.'}
          </h2>
          <p className="text-sm text-[#4F555E] mb-6">
            {ar
              ? 'أرسل لنا بياناتك وملخص احتياجك، وسنراجع الطلب ونقترح عليك أقرب طريقة لتنفيذ الخدمة بما يناسب وضع عملك الحالي.'
              : 'Send us your details and a short summary of your need. We will review the request and suggest the closest implementation approach for your current business situation.'}
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            {Object.entries(hiddenFields).map(([key, value]) => (
              <input key={key} type="hidden" name={key} value={value} />
            ))}
            <input type="hidden" name="language" value={language} />

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { name: 'name', label: ar ? 'الاسم' : 'Name', required: true },
                { name: 'company', label: ar ? 'الشركة' : 'Company' },
                { name: 'role', label: ar ? 'الدور الوظيفي' : 'Role' },
                { name: 'email', label: ar ? 'البريد الإلكتروني' : 'Email', type: 'email' },
                { name: 'country', label: ar ? 'الدولة' : 'Country' },
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

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
              <div>
                <label htmlFor="needs" className="block text-xs font-semibold text-[#101418] mb-1.5">{needsLabel}</label>
                <select
                  id="needs"
                  value={selectedNeed}
                  onChange={(e) => setSelectedNeed(e.target.value)}
                  className="w-full px-4 py-2.5 border border-[#E5E5E5] rounded-xl text-sm text-[#101418] focus:outline-none focus:border-[#6D5DF6] transition-colors bg-white"
                >
                  <option value="">{ar ? 'اختر...' : 'Select...'}</option>
                  {needsOptions.map((need) => (
                    <option key={need} value={need}>{need}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="stage" className="block text-xs font-semibold text-[#101418] mb-1.5">{stageLabel}</label>
                <select
                  id="stage"
                  value={selectedStage}
                  onChange={(e) => setSelectedStage(e.target.value)}
                  className="w-full px-4 py-2.5 border border-[#E5E5E5] rounded-xl text-sm text-[#101418] focus:outline-none focus:border-[#6D5DF6] transition-colors bg-white"
                >
                  <option value="">{ar ? 'اختر...' : 'Select...'}</option>
                  {stageOptions.map((stage) => (
                    <option key={stage} value={stage}>{stage}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="budget" className="block text-xs font-semibold text-[#101418] mb-1.5">
                  {ar ? 'الميزانية المتوقعة، إن وجدت' : 'Expected budget, if available'}
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
              </div>
            </div>

            <div>
              <label htmlFor="details" className="block text-xs font-semibold text-[#101418] mb-1.5">
                {ar ? 'اكتب لنا أكثر' : 'Tell us more'}
              </label>
              <textarea
                id="details"
                name="details"
                rows={4}
                className="w-full px-4 py-2.5 border border-[#E5E5E5] rounded-xl text-sm text-[#101418] focus:outline-none focus:border-[#6D5DF6] transition-colors resize-none"
                placeholder={freeTextPrompt}
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
              className="w-full py-3 bg-[#6D5DF6] text-white rounded-xl hover:bg-[#5d4de6] active:scale-[0.98] transition-all duration-200 text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {submitting ? (ar ? 'جارٍ الإرسال...' : 'Sending...') : (ar ? 'إرسال الطلب' : 'Send Request')}
            </button>
          </form>
      </>
    </div>
  );
}
