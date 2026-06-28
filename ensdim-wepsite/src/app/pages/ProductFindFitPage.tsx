import { useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';
import { SuccessModal } from '../components/SuccessModal';
import { submitInquiry } from '../../lib/supabase';

const businessFields = [
  { en: 'Maintenance / Field Services', ar: 'صيانة / خدمات ميدانية' },
  { en: 'Agricultural Contracting / Garden Maintenance', ar: 'مقاولات زراعية / صيانة حدائق' },
  { en: 'Real Estate / Property Development', ar: 'عقارات / تطوير عقاري' },
  { en: 'Clinic / Medical Center', ar: 'عيادة / مركز طبي' },
  { en: 'Education / Training', ar: 'تعليم / تدريب' },
  { en: 'Other Services', ar: 'خدمات أخرى' },
  { en: 'Other', ar: 'غير ذلك' },
];

const challenges = [
  { en: 'Customer follow-up', ar: 'متابعة العملاء' },
  { en: 'Daily operations', ar: 'تنظيم التشغيل اليومي' },
  { en: 'Contracts, visits, or bookings management', ar: 'إدارة العقود أو الزيارات أو الحجوزات' },
  { en: 'Reducing manual work', ar: 'تقليل العمل اليدوي' },
  { en: 'Improving reports and management visibility', ar: 'تحسين التقارير ورؤية الإدارة' },
  { en: 'Improving customer experience', ar: 'تحسين تجربة العميل' },
  { en: 'Increasing conversion or sales', ar: 'زيادة التحويل أو المبيعات' },
  { en: 'Other', ar: 'غير ذلك' },
];

export function ProductFindFitPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const [searchParams] = useSearchParams();
  const productInterest = searchParams.get('product') || '';

  const [selectedField, setSelectedField] = useState('');
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const toggleChallenge = (label: string) => {
    setSelectedChallenges((prev) =>
      prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    setSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      await submitInquiry({
        type: 'consultation',
        name: String(data.get('name') ?? ''),
        whatsapp: String(data.get('whatsapp') ?? ''),
        email: String(data.get('email') ?? '') || undefined,
        company: String(data.get('company') ?? '') || undefined,
        country: String(data.get('country') ?? '') || undefined,
        role: selectedField || undefined,
        challenge: selectedChallenges.join(', ') || undefined,
        details: String(data.get('details') ?? '') || undefined,
        source_page: '/products/find-fit',
        interest_type: 'product_fit',
        clicked_item: productInterest || undefined,
        language,
      });
      setSubmitted(true);
      form.reset();
      setSelectedField('');
      setSelectedChallenges([]);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title={ar ? 'دعنا نرشح لك المنتج الأقرب لاحتياج شركتك | إنسديم' : 'Let Us Recommend the Closest Product to Your Needs | ENSDIM'}
        description={ar
          ? 'شاركنا بيانات بسيطة عن شركتك ومجال عملك، وسنراجع احتياجك لنقترح المنتج الأقرب لطريقة تشغيلك.'
          : 'Share a few simple details about your company and business field. We will review your need and recommend the closest product to your operations.'}
        canonical="/products/find-fit"
        lang={ar ? 'ar' : 'en'}
        noIndex
      />

      <section className="pt-24 pb-14 sm:pt-32 sm:pb-20 relative overflow-hidden bg-[#0f0d19] text-white">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 30% 50%, rgba(59,42,120,0.22) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-6 text-xs text-white/50 flex items-center gap-1">
            <Link to="/" className="hover:text-white/80 transition-colors">{ar ? 'الرئيسية' : 'Home'}</Link>
            <span className="opacity-40">/</span>
            <Link to="/products" className="hover:text-white/80 transition-colors">{ar ? 'المنتجات' : 'Products'}</Link>
            <span className="opacity-40">/</span>
            <span className="text-white/70 font-medium">{ar ? 'ترشيح المنتج' : 'Find Your Fit'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight text-white">
            {ar ? 'دعنا نرشح لك المنتج الأقرب لاحتياج شركتك' : 'Let us recommend the closest product to your business needs'}
          </h1>
          <p className="text-base sm:text-lg max-w-2xl leading-relaxed text-[#EEEAFE]/75">
            {ar
              ? 'شاركنا بيانات بسيطة عن شركتك ومجال عملك، وسنراجع احتياجك لنقترح المنتج الأقرب لطريقة تشغيلك أو نوضح إن كان الحل المخصص هو الأنسب.'
              : 'Share a few simple details about your company and business field. We will review your need and recommend the closest product to your operations, or clarify whether a custom solution is the better fit.'}
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 sm:p-8">
              <SuccessModal
                open={submitted}
                onClose={() => setSubmitted(false)}
                title={ar ? 'تم استلام طلبك' : 'Request received'}
                message={ar
                  ? 'سنراجع مجال شركتك والتحدي الذي شاركته، ثم نعود إليك بتوصية واضحة حول المنتج الأقرب لاحتياجك، أو نوضح إن كان الحل المخصص هو الأنسب.'
                  : 'We will review your business field and the challenge you shared, then get back to you with a clear recommendation on the closest product to your needs, or clarify whether a custom solution is the better fit.'}
              />

              <form onSubmit={handleSubmit} className="space-y-5">
                <input type="hidden" name="product_interest" value={productInterest} />

                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { name: 'name', label: ar ? 'الاسم' : 'Name', required: true },
                    { name: 'company', label: ar ? 'اسم الشركة' : 'Company Name', required: true },
                    { name: 'whatsapp', label: ar ? 'رقم واتساب' : 'WhatsApp Number', type: 'tel', required: true },
                    { name: 'email', label: ar ? 'البريد الإلكتروني' : 'Email', type: 'email' },
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
                </div>

                <div>
                  <label htmlFor="country" className="block text-xs font-semibold text-[#101418] mb-1.5">
                    {ar ? 'الدولة' : 'Country'}
                  </label>
                  <select
                    id="country"
                    name="country"
                    className="w-full px-4 py-2.5 border border-[#E5E5E5] rounded-xl text-sm text-[#101418] focus:outline-none focus:border-[#6D5DF6] transition-colors bg-white"
                    defaultValue=""
                  >
                    <option value="">{ar ? 'اختر الدولة' : 'Select country'}</option>
                    {['Egypt', 'Saudi Arabia', 'United Arab Emirates', 'Kuwait', 'Qatar', 'Bahrain', 'Oman', 'Other'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#101418] mb-2.5">{ar ? 'مجال الشركة' : 'Company Field'}</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {businessFields.map((f) => {
                      const label = ar ? f.ar : f.en;
                      return (
                        <label
                          key={label}
                          className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-sm cursor-pointer transition-colors ${
                            selectedField === label ? 'border-[#6D5DF6] bg-[#EEEAFE]/50 text-[#101418]' : 'border-[#E5E5E5] text-[#4F555E]'
                          }`}
                        >
                          <input
                            type="radio"
                            name="business_field"
                            value={label}
                            checked={selectedField === label}
                            onChange={() => setSelectedField(label)}
                            className="accent-[#6D5DF6]"
                          />
                          {label}
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#101418] mb-2.5">
                    {ar ? 'ما أكثر تحدٍ تريد تنظيمه داخل شركتك؟' : 'What is the main challenge you want to organize inside your company?'}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {challenges.map((c) => {
                      const label = ar ? c.ar : c.en;
                      const checked = selectedChallenges.includes(label);
                      return (
                        <label
                          key={label}
                          className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-sm cursor-pointer transition-colors ${
                            checked ? 'border-[#6D5DF6] bg-[#EEEAFE]/50 text-[#101418]' : 'border-[#E5E5E5] text-[#4F555E]'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleChallenge(label)}
                            className="accent-[#6D5DF6]"
                          />
                          {label}
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label htmlFor="details" className="block text-xs font-semibold text-[#101418] mb-1.5">
                    {ar ? 'اشرح احتياجك باختصار' : 'Briefly explain your need'}
                  </label>
                  <textarea
                    id="details"
                    name="details"
                    rows={4}
                    className="w-full px-4 py-2.5 border border-[#E5E5E5] rounded-xl text-sm text-[#101418] focus:outline-none focus:border-[#6D5DF6] transition-colors resize-none"
                    placeholder={ar ? 'اكتب ما يحدث داخل شركتك الآن، وما الذي تريد تحسينه.' : 'Write what is happening inside your company now, and what you want to improve.'}
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
                  className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] active:scale-[0.98] transition-all duration-200 text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting
                    ? (ar ? 'جارٍ الإرسال...' : 'Sending...')
                    : (ar ? 'أرسل احتياجي لترشيح المنتج المناسب' : 'Submit my need to recommend the right product')}
                  {!submitting && <ArrowRight size={15} />}
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
