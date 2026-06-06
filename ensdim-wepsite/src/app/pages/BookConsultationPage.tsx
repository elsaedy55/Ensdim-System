import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHero } from '../components/PageHero';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';

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

export function BookConsultationPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const [selectedChallenge, setSelectedChallenge] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <SEO
        title="Book a Consultation | ENSDIM - AI & Automation Strategy Session"
        description="Book a free strategy consultation with ENSDIM. We'll analyze your business operations, customer journey, and identify where AI automation, CRM, or digital systems can drive real results."
        keywords="book AI consultation Egypt, automation strategy session, free business consultation Middle East, ENSDIM consultation"
        canonical="/book-consultation"
      />
      <PageHero
        title={ar ? 'احجز استشارة.' : 'Book a consultation.'}
        subtitle={ar
          ? 'جلسة مركزة لفهم عملك، رحلة عميلك، والفجوات التشغيلية لديك.'
          : 'A focused session to understand your business, customer journey, and operating gaps.'}
      />

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {submitted ? (
            <ScrollReveal className="text-center py-16">
              <div className="w-14 h-14 bg-[#EEEAFE] rounded-full flex items-center justify-center mx-auto mb-5">
                <svg viewBox="0 0 20 20" fill="none" className="w-7 h-7 text-[#6D5DF6]">
                  <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="text-xl font-bold text-[#101418] mb-2">{ar ? 'تم حجز استشارتك' : 'Consultation request sent'}</h2>
              <p className="text-sm text-[#69717D]">{ar ? 'سنتواصل معك خلال يوم عمل.' : 'We will be in touch within one business day.'}</p>
            </ScrollReveal>
          ) : (
            <ScrollReveal>
              <form onSubmit={handleSubmit} className="space-y-5">
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
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#101418] mb-1.5">
                    {ar ? 'نطاق الميزانية' : 'Budget range'}
                  </label>
                  <select className="w-full px-4 py-2.5 border border-[#E5E5E5] rounded-xl text-sm text-[#101418] focus:outline-none focus:border-[#6D5DF6] transition-colors bg-white">
                    <option value="">{ar ? 'اختر...' : 'Select...'}</option>
                    {budgets.map((b) => (
                      <option key={b.en} value={b.en}>{ar ? b.ar : b.en}</option>
                    ))}
                  </select>
                </div>

                <div className="pt-2">
                  <p className="text-xs text-[#69717D] mb-4 leading-relaxed">
                    {ar
                      ? 'لا نبدأ بالتقنية، بل نبدأ بفهم مشكلة العمل.'
                      : 'We do not start with technology. We start by understanding the business problem.'}
                  </p>
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#D63A3A] text-white rounded-xl text-sm font-semibold hover:bg-[#c23030] transition-colors"
                  >
                    {ar ? 'احجز الاستشارة' : 'Book Consultation'}
                  </button>
                </div>
              </form>
            </ScrollReveal>
          )}
        </div>
      </section>
    </>
  );
}
