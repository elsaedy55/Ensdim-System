import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';
import { submitInquiry } from '../../lib/supabase';

/**
 * "/company/about" in the approved content brief doesn't exist as a route —
 * the about page lives at /about. Linked there instead to avoid a 404.
 */

const interestOptions = [
  { en: 'Improve customer experience', ar: 'تحسين تجربة العميل' },
  { en: 'Build a website or digital product', ar: 'بناء موقع أو منتج رقمي' },
  { en: 'Organize customer follow-up', ar: 'تنظيم متابعة العملاء' },
  { en: 'Improve internal operations', ar: 'تحسين التشغيل الداخلي' },
  { en: 'Data and dashboards', ar: 'البيانات ولوحات المتابعة' },
  { en: 'Automation or an intelligence layer', ar: 'الأتمتة أو طبقة ذكاء' },
  { en: 'Not sure yet', ar: 'غير متأكد بعد' },
];

const afterSteps = [
  { en: { title: 'We review your message', desc: 'We read the business context, the current challenge, and the area you want to improve.' }, ar: { title: 'نراجع رسالتك', desc: 'نقرأ سياق العمل، التحدي الحالي، والجانب الذي تريد تحسينه.' } },
  { en: { title: 'We identify the closest path', desc: 'We determine whether your need is closer to a specific service, a broader solution, a consultation, or a discovery call.' }, ar: { title: 'نحدد المسار الأقرب', desc: 'نقترح هل احتياجك أقرب إلى خدمة محددة، حل متكامل، استشارة، أو جلسة اكتشاف.' } },
  { en: { title: 'We reply with the next step', desc: 'If there is a fit, we will guide you to the most suitable conversation, scope, or meeting.' }, ar: { title: 'نرد عليك بالخطوة التالية', desc: 'إذا كان هناك توافق، سنوجهك إلى المحادثة أو النطاق أو الاجتماع الأنسب.' } },
];

export function ContactPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    setSubmitting(true);

    const data = new FormData(e.currentTarget);
    try {
      await submitInquiry({
        type: 'contact',
        name: String(data.get('name') ?? ''),
        whatsapp: String(data.get('whatsapp') ?? ''),
        email: String(data.get('email') ?? '') || undefined,
        company: String(data.get('company') ?? '') || undefined,
        country: String(data.get('country') ?? '') || undefined,
        challenge: String(data.get('challenge') ?? '') || undefined,
        interest_type: String(data.get('interest_type') ?? '') || undefined,
        source_page: '/contact',
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
    <>
      <SEO
        title={ar ? 'تواصل مع إنسديم' : 'Contact ENSDIM'}
        description={ar
          ? 'شاركنا فكرتك أو التحدي الذي تواجهه الآن داخل عملك، وسنساعدك على فهم أول خطوة واضحة.'
          : 'Share the idea or challenge your business is facing now, and we’ll help you identify the first clear digital step.'}
        canonical="/contact"
        lang={ar ? 'ar' : 'en'}
      />

      {/* Hero */}
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-16 relative overflow-hidden bg-[#0f0d19] text-white">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 30% 50%, rgba(59,42,120,0.22) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-6 text-xs text-white/50 flex items-center gap-1">
            <Link to="/" className="hover:text-white/80 transition-colors">{ar ? 'الرئيسية' : 'Home'}</Link>
            <span className="opacity-40">/</span>
            <span className="text-white/70 font-medium">{ar ? 'تواصل معنا' : 'Contact'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight text-white">
            {ar ? 'تواصل مع إنسديم.' : 'Talk to ENSDIM.'}
          </h1>
          <p className="text-base sm:text-lg max-w-2xl leading-relaxed mb-3 text-[#EEEAFE]/75">
            {ar
              ? 'شاركنا فكرتك أو التحدي الذي تواجهه الآن داخل عملك، وسنساعدك على فهم أول خطوة واضحة يمكن أن تحوّل هذا التحدي إلى مسار رقمي يخدم العائد.'
              : 'Share the idea or challenge your business is facing now, and we’ll help you identify the first clear digital step that can turn it into a path with measurable business value.'}
          </p>
          <p className="text-sm text-[#EEEAFE]/55 mb-3">
            {ar ? 'ابدأ بما يحدث الآن:' : 'Start with what is happening today:'}
          </p>
          <div className="flex flex-wrap gap-2">
            {(ar
              ? ['عميل يضيع', 'متابعة تتأخر', 'تشغيل مرهق', 'بيانات غير واضحة', 'فرصة نمو تحتاج تنظيمًا']
              : ['Lost leads', 'Delayed follow-up', 'Operational pressure', 'Unclear data', 'A growth opportunity that needs structure']
            ).map((tag, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-[#EEEAFE]/70"
              >
                <span className="w-1 h-1 rounded-full bg-[#6D5DF6]" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Start the conversation */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-xl sm:text-2xl font-bold text-[#101418] mb-3 leading-tight">
              {ar ? 'لا تحتاج أن تعرف الحل قبل أن تتواصل معنا.' : 'You do not need to know the solution before you contact us.'}
            </h2>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-3">
              {ar
                ? 'أخبرنا أين يحتاج عملك إلى وضوح أكبر: تجربة العميل، المتابعة، التشغيل، البيانات، الأتمتة، أو النمو. سنراجع رسالتك ونساعدك على تحديد ما إذا كانت الخطوة الأقرب هي خدمة محددة، حل متكامل، استشارة أولية، أو جلسة اكتشاف أعمق.'
                : 'Tell us where your business needs more clarity: customer experience, follow-up, operations, data, automation, or growth. We’ll review your message and help you understand whether the next step is a specific service, a broader solution, an initial consultation, or a deeper discovery call.'}
            </p>
            <p className="text-sm text-[#4F555E]/70 italic">
              {ar ? 'كل ما نحتاجه في البداية هو وصف صادق لما يحدث داخل العمل الآن.' : 'At the beginning, all we need is an honest description of what is happening inside the business.'}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact details + form */}
      <section className="py-12 bg-[#FAFAFA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact info */}
            <ScrollReveal>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-[#101418] mb-1">{ar ? 'البريد الإلكتروني' : 'Email'}</h3>
                  <a href="mailto:info@ensdim.com" className="text-sm text-[#6D5DF6] hover:underline">info@ensdim.com</a>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#101418] mb-1">{ar ? 'واتساب' : 'WhatsApp'}</h3>
                  <p className="text-sm text-[#4F555E]">{ar ? 'متاح للاستفسارات الجادة والمشاريع المناسبة' : 'Available for serious business inquiries and suitable projects'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#101418] mb-1">{ar ? 'الموقع' : 'Location'}</h3>
                  <p className="text-sm text-[#4F555E]">{ar ? 'نعمل من مصر ونخدم عملاء في الخليج ومنطقة الشرق الأوسط وشمال أفريقيا' : 'Based in Egypt, serving clients across the Gulf, Middle East, and North Africa'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#101418] mb-1">{ar ? 'وقت الرد' : 'Response Time'}</h3>
                  <p className="text-sm text-[#4F555E]">{ar ? 'نرد غالبًا خلال يوم عمل واحد.' : 'We usually respond within one business day.'}</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Form */}
            <ScrollReveal delay={0.1}>
              {submitted ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg viewBox="0 0 20 20" fill="none" className="w-6 h-6 text-green-600 no-mirror">
                        <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <p className="text-base font-bold text-[#101418] mb-1">{ar ? 'تم استلام رسالتك بنجاح.' : 'Your message has been received successfully.'}</p>
                    <p className="text-sm text-[#4F555E] mb-5 max-w-xs mx-auto leading-relaxed">
                      {ar
                        ? 'شكرًا لتواصلك مع إنسديم. سنراجع التحدي الذي أرسلته ونعود إليك بالخطوة الأنسب.'
                        : 'Thank you for contacting ENSDIM. We will review the challenge you shared and get back to you with the most suitable next step.'}
                    </p>
                    <p className="text-xs font-semibold text-[#101418] mb-3">
                      {ar ? 'يمكنك التعرف على إنسديم أكثر من خلال الروابط التالية:' : 'You can learn more about ENSDIM through the following links:'}
                    </p>
                    <div className="flex flex-col items-center gap-2 text-sm font-medium">
                      <Link to="/about" className="text-[#6D5DF6] hover:underline">{ar ? 'تعرّف على إنسديم ←' : 'Learn About ENSDIM →'}</Link>
                      <Link to="/solutions" className="text-[#6D5DF6] hover:underline">{ar ? 'استكشف الحلول ←' : 'Explore Solutions →'}</Link>
                      <Link to="/case-studies" className="text-[#6D5DF6] hover:underline">{ar ? 'شاهد مشاريعنا ←' : 'View Case Studies →'}</Link>
                      <Link to="/services" className="text-[#6D5DF6] hover:underline">{ar ? 'استكشف خدماتنا ←' : 'Explore Services →'}</Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-lg font-bold text-[#101418] mb-1.5">{ar ? 'شارك تحدي عملك' : 'Share Your Business Challenge'}</h2>
                  <p className="text-xs text-[#4F555E] leading-relaxed mb-5">
                    {ar
                      ? 'اكتب لنا باختصار ما الذي تريد تحسينه، وما الذي يحدث الآن داخل عملك. كلما كان السياق أوضح، استطعنا توجيهك إلى خطوة أدق.'
                      : 'Briefly tell us what you want to improve and what is currently happening inside your business. The clearer the context, the more accurately we can guide you.'}
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                      { name: 'name', label: ar ? 'الاسم' : 'Name', placeholder: ar ? 'اكتب اسمك' : 'Your name', type: 'text', required: true },
                      { name: 'whatsapp', label: ar ? 'واتساب' : 'WhatsApp', placeholder: ar ? 'رقم واتساب' : 'WhatsApp number', type: 'tel', required: true },
                      { name: 'company', label: ar ? 'الشركة' : 'Company', placeholder: ar ? 'اسم الشركة' : 'Company name', type: 'text' },
                      { name: 'email', label: ar ? 'البريد الإلكتروني' : 'Email', placeholder: ar ? 'البريد الإلكتروني للعمل' : 'Business email', type: 'email' },
                      { name: 'country', label: ar ? 'الدولة' : 'Country', placeholder: ar ? 'الدولة' : 'Country', type: 'text' },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="block text-xs font-semibold text-[#101418] mb-1.5">
                          {field.label}{field.required && <span className="text-[#D63A3A]"> *</span>}
                        </label>
                        <input
                          type={field.type}
                          name={field.name}
                          required={field.required}
                          className="w-full px-4 py-2.5 border border-[#E5E5E5] rounded-xl text-sm text-[#101418] focus:outline-none focus:border-[#6D5DF6] transition-colors"
                          placeholder={field.placeholder}
                        />
                      </div>
                    ))}

                    <div>
                      <label className="block text-xs font-semibold text-[#101418] mb-1.5">
                        {ar ? 'بماذا تحتاج المساعدة؟' : 'What do you need help with?'}<span className="text-[#D63A3A]"> *</span>
                      </label>
                      <textarea
                        name="challenge"
                        required
                        rows={3}
                        className="w-full px-4 py-2.5 border border-[#E5E5E5] rounded-xl text-sm text-[#101418] focus:outline-none focus:border-[#6D5DF6] transition-colors resize-none"
                        placeholder={ar ? 'صف لنا التحدي الحالي باختصار…' : 'Briefly describe your current challenge…'}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#101418] mb-1.5">
                        {ar ? 'مجال الاهتمام' : 'Area of Interest'}
                      </label>
                      <select
                        name="interest_type"
                        defaultValue=""
                        className="w-full px-4 py-2.5 border border-[#E5E5E5] rounded-xl text-sm text-[#101418] focus:outline-none focus:border-[#6D5DF6] transition-colors bg-white"
                      >
                        <option value="" disabled>{ar ? 'اختر مجال الاهتمام' : 'Select area of interest'}</option>
                        {interestOptions.map((opt) => (
                          <option key={opt.en} value={opt.en}>{ar ? opt.ar : opt.en}</option>
                        ))}
                      </select>
                    </div>

                    {error && (
                      <p className="text-xs text-[#D63A3A]">
                        {ar ? 'حدث خطأ أثناء الإرسال. حاول مرة أخرى.' : 'Something went wrong while sending. Please try again.'}
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 bg-[#D63A3A] text-white rounded-xl text-sm font-semibold hover:bg-[#c23030] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? (ar ? 'جارٍ الإرسال...' : 'Sending...') : (
                        <>
                          {ar ? 'إرسال الطلب' : 'Send Request'} <ArrowRight size={15} />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* What happens after */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#101418]">
              {ar ? 'ماذا يحدث بعد أن ترسل رسالتك؟' : 'What happens after you send your message?'}
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-5">
            {afterSteps.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="p-5 border border-[#E5E5E5] rounded-2xl h-full">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#EEEAFE] text-[#6D5DF6] text-xs font-bold mb-3">{i + 1}</span>
                  <h3 className="text-sm font-bold text-[#101418] mb-2">{ar ? step.ar.title : step.en.title}</h3>
                  <p className="text-xs text-[#4F555E] leading-relaxed">{ar ? step.ar.desc : step.en.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
