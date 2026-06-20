import { useState } from 'react';
import { Link } from 'react-router';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHero } from '../components/PageHero';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';
import { FAQSection } from '../components/FAQSection';
import { QuickAnswer } from '../components/QuickAnswer';
import { submitInquiry } from '../../lib/supabase';

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
        type:        'contact',
        name:        String(data.get('name') ?? ''),
        whatsapp:    String(data.get('whatsapp') ?? ''),
        email:       String(data.get('email') ?? '') || undefined,
        company:     String(data.get('company') ?? '') || undefined,
        message:     String(data.get('message') ?? '') || undefined,
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
        title="Contact ENSDIM | AI Automation Agency - Egypt, Saudi Arabia, UAE"
        description="Contact ENSDIM to discuss your AI automation, CRM, SaaS, or digital transformation project. We serve businesses in Egypt, Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, and Oman."
        keywords="contact ENSDIM, AI agency contact Egypt, automation agency email, book AI consultation Middle East"
        canonical="/contact"
      />
      <PageHero
        title={ar ? 'تواصل مع إنسديم.' : 'Talk to ENSDIM.'}
        subtitle={ar
          ? 'أخبرنا أين يحتاج عملك إلى وضوح، تحكم، أو تحويل أفضل.'
          : 'Tell us where your business needs more clarity, control, or conversion.'}
        breadcrumbs={[{ label: 'Contact', labelAr: 'تواصل معنا', href: '/contact' }]}
        lang={ar ? 'ar' : 'en'}
      />

      <QuickAnswer
        question={ar ? 'كيف أتواصل مع إنسديم؟' : 'How do I contact ENSDIM?'}
        answer={ar
          ? 'تواصل مع إنسديم عبر البريد الإلكتروني hello@ensdim.com، أو احجز استشارة مجانية على ensdim.com/book-consultation. فريق إنسديم يرد خلال يوم عمل واحد.'
          : 'Contact ENSDIM via email at hello@ensdim.com, or book a free consultation at ensdim.com/book-consultation. The ENSDIM team responds within one business day.'}
      />

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact info */}
            <ScrollReveal>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-[#101418] mb-1">{ar ? 'البريد الإلكتروني' : 'Email'}</h3>
                  <p className="text-sm text-[#4F555E]">hello@ensdim.com</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#101418] mb-1">{ar ? 'واتساب' : 'WhatsApp'}</h3>
                  <p className="text-sm text-[#4F555E]">Available for qualified inquiries</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#101418] mb-1">{ar ? 'الموقع' : 'Location'}</h3>
                  <p className="text-sm text-[#4F555E]">{ar ? 'فريق بعيد، يخدم دول الخليج والمنطقة العربية' : 'Remote-first, serving Gulf & MENA'}</p>
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
                        <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-[#101418]">{ar ? 'تم إرسال طلبك' : 'Request sent'}</p>
                    <p className="text-xs text-[#4F555E] mt-1">{ar ? 'سنتواصل معك قريباً' : 'We will be in touch soon'}</p>
                    <div className="flex items-center justify-center gap-3 text-xs font-medium mt-4">
                      <Link to="/case-studies" className="text-[#6D5DF6] hover:underline">{ar ? 'دراسات الحالة' : 'Case studies'}</Link>
                      <span className="text-[#E5E5E5]">•</span>
                      <Link to="/research" className="text-[#6D5DF6] hover:underline">{ar ? 'الأبحاث' : 'Research'}</Link>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { name: 'name', label: ar ? 'الاسم' : 'Name', type: 'text', required: true },
                    { name: 'whatsapp', label: ar ? 'واتساب' : 'WhatsApp', type: 'tel', required: true },
                    { name: 'company', label: ar ? 'الشركة' : 'Company', type: 'text' },
                    { name: 'email', label: ar ? 'البريد الإلكتروني' : 'Email', type: 'email' },
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
                        placeholder={field.label}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-semibold text-[#101418] mb-1.5">
                      {ar ? 'ما الذي تحتاج مساعدة فيه؟' : 'What do you need help with?'}
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      className="w-full px-4 py-2.5 border border-[#E5E5E5] rounded-xl text-sm text-[#101418] focus:outline-none focus:border-[#6D5DF6] transition-colors resize-none"
                      placeholder={ar ? 'اشرح تحديك الحالي...' : 'Describe your current challenge...'}
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
                    className="w-full py-2.5 bg-[#D63A3A] text-white rounded-xl text-sm font-semibold hover:bg-[#c23030] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? (ar ? 'جارٍ الإرسال...' : 'Sending...') : (ar ? 'إرسال الطلب' : 'Send Request')}
                  </button>
                </form>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>

      <FAQSection
        title={ar ? 'أسئلة شائعة حول التواصل مع إنسديم' : 'Frequently Asked Questions — Contacting ENSDIM'}
        faqs={ar ? [
          { question: 'كيف أتواصل مع إنسديم؟', answer: 'عبر البريد الإلكتروني hello@ensdim.com أو من خلال نموذج التواصل في هذه الصفحة. كذلك يمكنك حجز استشارة مجانية مباشرة من صفحة /book-consultation.' },
          { question: 'كم يستغرق الرد على طلبي؟', answer: 'يرد فريق إنسديم خلال يوم عمل واحد على طلبات التواصل. الاستشارات المحجوزة مجدولة خلال 2-3 أيام عمل.' },
          { question: 'هل تعمل إنسديم مع عملاء خارج مصر؟', answer: 'نعم. إنسديم تعمل عن بُعد مع عملاء في السعودية والإمارات والكويت وقطر والبحرين وعُمان، وكذلك عملاء دوليين.' },
          { question: 'ماذا يجب أن أذكر في رسالتي؟', answer: 'اذكر نوع عملك، المشكلة أو التحدي الحالي الذي تواجهه، وما تتوقع تحقيقه. كلما كانت المعلومات أوضح، كلما استطعنا تقديم استجابة أكثر فائدة.' },
        ] : [
          { question: 'How do I contact ENSDIM?', answer: 'Via email at hello@ensdim.com or through the contact form on this page. You can also book a free consultation directly at ensdim.com/book-consultation.' },
          { question: 'How quickly does ENSDIM respond?', answer: 'The ENSDIM team responds to contact requests within one business day. Booked consultations are scheduled within 2-3 business days.' },
          { question: 'Does ENSDIM work with clients outside Egypt?', answer: 'Yes. ENSDIM operates remotely with clients in Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, Oman, and internationally.' },
          { question: 'What should I include in my message?', answer: 'Include your business type, the current problem or challenge you are facing, and what you want to achieve. The more specific, the more useful our response will be.' },
          { question: 'Can I contact ENSDIM via WhatsApp?', answer: 'WhatsApp contact is available for qualified project inquiries. The best starting point is the contact form or email — we will share direct contact details as the conversation progresses.' },
        ]}
      />
    </>
  );
}
