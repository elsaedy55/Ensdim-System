import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const challenges = [
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const formTitle = title || (ar ? 'احجز استشارة.' : 'Book a consultation.');

  return (
    <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 sm:p-8">
      {submitted ? (
        <div className="text-center py-12">
          <div className="w-14 h-14 bg-[#EEEAFE] rounded-full flex items-center justify-center mx-auto mb-5">
            <svg viewBox="0 0 20 20" fill="none" className="w-7 h-7 text-[#6D5DF6]">
              <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-[#101418] mb-2">{ar ? 'تم إرسال طلبك' : 'Request sent'}</h2>
          <p className="text-sm text-[#69717D]">{ar ? 'سنتواصل معك خلال يوم عمل.' : 'We will be in touch within one business day.'}</p>
        </div>
      ) : (
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
                { name: 'name', label: ar ? 'الاسم' : 'Name' },
                { name: 'company', label: ar ? 'الشركة' : 'Company' },
                { name: 'role', label: ar ? 'المسمى الوظيفي' : 'Role' },
                { name: 'email', label: ar ? 'البريد الإلكتروني' : 'Email', type: 'email' },
                { name: 'whatsapp', label: ar ? 'واتساب' : 'WhatsApp', type: 'tel' },
                { name: 'country', label: ar ? 'البلد' : 'Country' },
              ].map((f) => (
                <div key={f.name}>
                  <label className="block text-xs font-semibold text-[#101418] mb-1.5">{f.label}</label>
                  <input
                    type={f.type || 'text'}
                    name={f.name}
                    required
                    className="w-full px-4 py-2.5 border border-[#E5E5E5] rounded-xl text-sm text-[#101418] focus:outline-none focus:border-[#6D5DF6] transition-colors"
                    placeholder={f.label}
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#101418] mb-2">
                {ar ? 'أكبر تحدٍّ تواجهه' : 'Your biggest challenge'}
              </label>
              <div className="flex flex-wrap gap-2">
                {challenges.map((c) => {
                  const label = ar ? c.ar : c.en;
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setSelectedChallenge(label)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                        selectedChallenge === label
                          ? 'bg-[#6D5DF6] text-white border-[#6D5DF6]'
                          : 'bg-white text-[#101418] border-[#E5E5E5] hover:border-[#6D5DF6]'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              <input type="hidden" name="challenge" value={selectedChallenge} />
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

            <div>
              <label className="block text-xs font-semibold text-[#101418] mb-2">
                {ar ? 'الميزانية المتوقعة' : 'Expected budget'}
              </label>
              <div className="flex flex-wrap gap-2">
                {budgets.map((b) => {
                  const label = ar ? b.ar : b.en;
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setSelectedBudget(label)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                        selectedBudget === label
                          ? 'bg-[#6D5DF6] text-white border-[#6D5DF6]'
                          : 'bg-white text-[#101418] border-[#E5E5E5] hover:border-[#6D5DF6]'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              <input type="hidden" name="budget" value={selectedBudget} />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#6D5DF6] text-white rounded-xl hover:bg-[#5d4de6] transition-colors text-sm font-semibold"
            >
              {ar ? 'إرسال الطلب' : 'Send Request'}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
