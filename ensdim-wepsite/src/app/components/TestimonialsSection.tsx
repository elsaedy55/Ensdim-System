import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { useLanguage } from '../../contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const testimonialsEn = [
  {
    quote: "We sincerely thank the ENSDIM team for their efforts in designing and developing the Bustan Amari application. We experienced professionalism, cooperation, commitment to the project's success, fast delivery, and quality work from the first step to the last. We are proud to have worked with such a distinguished team and wish them continued success.",
    name: "Haitham Al-Nemr",
    company: "CEO · Bustan Amari, Kuwait",
    result: "Professionalism & fast delivery",
    caseStudy: "/case-studies/bustan-amari-operations-system",
  },
  {
    quote: "Before ENSDIM, bookings and follow-ups were taking a lot of our team's time, and some details could get lost between calls and WhatsApp. What I appreciated most was that they understood how our clinic works and created an easier experience for us and for our visitors from the first contact. After adding website booking, the chatbot, and the AI-supported dashboard, follow-up became clearer, files were more organized, and WhatsApp communication became calmer and easier.",
    name: "Dr. Shamma Khalifa",
    company: "Founder & Medical Director · Limera Aesthetic Clinic, UAE",
    result: "Easier booking & happier visitors",
    caseStudy: "/case-studies/lemera-clinic-booking-crm",
  },
  {
    quote: "They were partners in shaping the idea from the beginning, not just a technical execution team. They helped us study the concept, organize the user journey, and build a dashboard and booking app until we reached our first market-ready trial version. Having them with us from early thinking to the trial launch gave us more clarity and confidence in the project direction.",
    name: "Eng. Ahmed Ali",
    company: "CEO · Triboo, Egypt",
    result: "From idea to first market trial",
    caseStudy: "/case-studies/triboo-travel-mvp",
  },
  {
    quote: "We used to work in a traditional way, and following up with clients and quotation requests was exhausting for the team. Relying on Excel and WhatsApp made the picture unclear and made it harder to know the status of each client or request at the right time. After organizing follow-up and building a clear dashboard for clients and quotation requests, we gained better visibility, faster follow-up, and easier decision-making for management.",
    name: "Eng. Fahad Al Otaibi",
    company: "Operations Manager · Contracting & Real Estate Development, Saudi Arabia",
    result: "Clearer follow-up & faster decisions",
    caseStudy: "/case-studies/real-estate-sales-crm-saudi",
  },
];

const testimonialsAr = [
  {
    quote: "نتقدم بخالص الشكر والتقدير لفريق إنسديم على جهودهم في تصميم وتطوير تطبيق بستان أماري. لمسنا منهم الاحترافية، التعاون، الحرص على إنجاح المشروع، سرعة الإنجاز، وجودة العمل من أول خطوة إلى آخر خطوة. نفخر بالتعامل مع فريق متميز مثلهم، ونتمنى لهم دوام التوفيق والنجاح.",
    name: "هيثم النمر",
    company: "المدير التنفيذي · شركة بستان أماري، الكويت",
    result: "احترافية وسرعة إنجاز",
    caseStudy: "/case-studies/bustan-amari-operations-system",
  },
  {
    quote: "قبل إنسديم، كان الحجز والمتابعة ياخذون وقت كبير من الفريق، وبعض التفاصيل كانت تضيع بين المكالمات والواتساب. أكثر شيء عجبني أنهم فهموا طبيعة شغل العيادة، وسوّوا لنا تجربة أسهل لنا وللزائرات من أول تواصل. بعد ما أضفنا الحجز من الموقع والتشات بوت، والداشبورد المدعوم بالذكاء الاصطناعي، صارت المتابعة أوضح، والملفات أكثر ترتيبًا، والتواصل على الواتساب أهدأ وأسهل.",
    name: "د. شماء خليفة",
    company: "المؤسسة والمديرة الطبية · عيادة ليميرا للتجميل، الإمارات",
    result: "حجز أسهل وزوار أكثر رضا",
    caseStudy: "/case-studies/lemera-clinic-booking-crm",
  },
  {
    quote: "كانوا شركاء في بناء الفكرة من البداية، وليس مجرد فريق تنفيذ تقني. ساعدونا في دراسة الفكرة، ترتيب رحلة المستخدم، وبناء داشبورد وتطبيق حجز حتى وصلنا لأول نسخة تجريبية جاهزة للسوق. وجودهم معنا من مرحلة التفكير حتى الإطلاق التجريبي أعطانا وضوحًا وثقة أكبر في اتجاه المشروع.",
    name: "م. أحمد علي",
    company: "المدير التنفيذي · ترايبوو، مصر",
    result: "من الفكرة إلى أول نسخة تجريبية",
    caseStudy: "/case-studies/triboo-travel-mvp",
  },
  {
    quote: "كنا نشتغل بالطريقة التقليدية، والمتابعة وإرسال طلبات الأسعار كانت مرهقة على الفريق. الاعتماد على الإكسيل والواتساب كان يخلّي الصورة غير واضحة، ويصعّب علينا معرفة حالة كل عميل أو طلب في الوقت المناسب. بعد تنظيم المتابعة وبناء لوحة واضحة للعملاء وطلبات الأسعار، صار عندنا وضوح أكبر، ومتابعة أسرع، وقرار أسهل داخل الإدارة.",
    name: "م. فهد العتيبي",
    company: "مدير العمليات · شركة مقاولات وتطوير عقاري، السعودية",
    result: "متابعة أوضح وقرار أسرع",
    caseStudy: "/case-studies/real-estate-sales-crm-saudi",
  },
];

export function TestimonialsSection() {
  const { t, language } = useLanguage();
  const testimonials = language === 'ar' ? testimonialsAr : testimonialsEn;
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const quadrupled = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-20 sm:py-24 bg-[#F4F2FF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10 sm:mb-12">
        <ScrollReveal className="text-center">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#101418] mb-2">
            {t('testimonials.title')}
          </h2>
          <p className="text-sm sm:text-base text-[#4F555E] max-w-xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </ScrollReveal>
      </div>

      <div
        className="relative"
        dir="ltr"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* fade edges */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#F4F2FF] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#F4F2FF] to-transparent z-10 pointer-events-none" />

        <div
          ref={trackRef}
          className="flex gap-4"
          style={{
            animation: `testimonial-scroll 72s linear infinite`,
            animationPlayState: isPaused ? 'paused' : 'running',
            width: 'max-content',
            direction: 'ltr',
          }}
        >
          {quadrupled.map((testimonial, index) => (
            <div
              key={index}
              dir={language === 'ar' ? 'rtl' : 'ltr'}
              className="w-[320px] flex-shrink-0 bg-white rounded-2xl p-6 border border-[#E5E5E5] hover:border-[#6D5DF6]/40 hover:shadow-[0_8px_28px_rgba(109,93,246,0.09)] transition-all duration-300 flex flex-col"
            >
              <div className="flex-1 mb-4">
                <p className="text-[#2a2d34] text-sm leading-[1.7]">
                  "{testimonial.quote}"
                </p>
              </div>

              <div className="border-t border-[#F0F0F0] pt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#6D5DF6] flex items-center justify-center flex-shrink-0 ring-2 ring-[#EEEAFE] text-white text-sm font-semibold">
                    {testimonial.name.trim().charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#101418] truncate">{testimonial.name}</p>
                    <p className="text-xs text-[#4F555E] truncate">{testimonial.company}</p>
                  </div>
                </div>
                <span className="inline-block px-2.5 py-1 bg-[#EEEAFE] text-[#6D5DF6] text-[10px] font-semibold rounded-full whitespace-nowrap w-fit">
                  {testimonial.result}
                </span>
                <Link
                  to={testimonial.caseStudy}
                  className="inline-flex items-center gap-1.5 text-xs text-[#6D5DF6] font-medium hover:gap-2 transition-all duration-200"
                >
                  {language === 'ar' ? 'عرض قصة النجاح' : 'View Success Story'}
                  <ArrowRight size={11} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes testimonial-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
      `}</style>
    </section>
  );
}
