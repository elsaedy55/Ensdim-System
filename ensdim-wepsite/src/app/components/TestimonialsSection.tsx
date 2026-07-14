import { useState } from 'react';
import { Link } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const testimonialsEn = [
  {
    quote: "We sincerely thank the Ensdim team for their efforts in designing and developing the Bustan Amari application. We experienced professionalism, cooperation, commitment to the project's success, fast delivery, and quality work from the first step to the last. We are proud to have worked with such a distinguished team and wish them continued success.",
    name: "Haitham Al-Nemr",
    company: "CEO · Bustan Amari, Kuwait",
    result: "Professionalism & fast delivery",
    caseStudy: "/case-studies/bustan-amari-operations-system",
    avatar: "/testimonials/haitham.png",
  },
  {
    quote: "Before Ensdim, bookings and follow-ups were taking a lot of our team's time, and some details could get lost between calls and WhatsApp. What I appreciated most was that they understood how our clinic works and created an easier experience for us and for our visitors from the first contact. After adding website booking, the chatbot, and the AI-supported dashboard, follow-up became clearer, files were more organized, and WhatsApp communication became calmer and easier.",
    name: "Emirates Cosmetic Clinic",
    company: "Aesthetic Clinic · UAE",
    result: "Easier booking & happier visitors",
    caseStudy: "/case-studies/lemera-clinic-booking-crm",
    avatar: null,
  },
  {
    quote: "They were partners in shaping the idea from the beginning, not just a technical execution team. They helped us study the concept, organize the user journey, and build a dashboard and booking app until we reached our first market-ready trial version. Having them with us from early thinking to the trial launch gave us more clarity and confidence in the project direction.",
    name: "Eng. Ahmed Ali",
    company: "CEO · Triboo, Egypt",
    result: "From idea to first market trial",
    caseStudy: "/case-studies/triboo-travel-mvp",
    avatar: "/testimonials/ahmed.png",
  },
  {
    quote: "Ensdim helped us build our digital presence on clear foundations, starting with research and understanding our needs, through strategic planning, all the way to execution. We felt genuine attention to every detail, real commitment to follow-up, and a constant drive to deliver the best result.",
    name: "Eng. Ibrahim",
    company: "CEO · Real Estate Development",
    result: "A clear digital foundation from research to execution",
    caseStudy: "/case-studies/real-estate-sales-crm-saudi",
    avatar: "/testimonials/ibrahem.jpeg",
  },
];

const testimonialsAr = [
  {
    quote: "نتقدم بخالص الشكر والتقدير لفريق إنسديم على جهودهم في تصميم وتطوير تطبيق بستان أماري. لمسنا منهم الاحترافية، التعاون، الحرص على إنجاح المشروع، سرعة الإنجاز، وجودة العمل من أول خطوة إلى آخر خطوة. نفخر بالتعامل مع فريق متميز مثلهم، ونتمنى لهم دوام التوفيق والنجاح.",
    name: "هيثم النمر",
    company: "المدير التنفيذي · شركة بستان أماري، الكويت",
    result: "احترافية وسرعة إنجاز",
    caseStudy: "/case-studies/bustan-amari-operations-system",
    avatar: "/testimonials/haitham.png",
  },
  {
    quote: "قبل إنسديم، كان الحجز والمتابعة ياخذون وقت كبير من الفريق، وبعض التفاصيل كانت تضيع بين المكالمات والواتساب. أكثر شيء عجبني أنهم فهموا طبيعة شغل العيادة، وسوّوا لنا تجربة أسهل لنا وللزائرات من أول تواصل. بعد ما أضفنا الحجز من الموقع والتشات بوت، والداشبورد المدعوم بالذكاء الاصطناعي، صارت المتابعة أوضح، والملفات أكثر ترتيبًا، والتواصل على الواتساب أهدأ وأسهل.",
    name: "عيادة تجميل الإمارات",
    company: "عيادة تجميل · الإمارات",
    result: "حجز أسهل وزوار أكثر رضا",
    caseStudy: "/case-studies/lemera-clinic-booking-crm",
    avatar: null,
  },
  {
    quote: "كانوا شركاء في بناء الفكرة من البداية، وليس مجرد فريق تنفيذ تقني. ساعدونا في دراسة الفكرة، ترتيب رحلة المستخدم، وبناء داشبورد وتطبيق حجز حتى وصلنا لأول نسخة تجريبية جاهزة للسوق. وجودهم معنا من مرحلة التفكير حتى الإطلاق التجريبي أعطانا وضوحًا وثقة أكبر في اتجاه المشروع.",
    name: "م. أحمد علي",
    company: "المدير التنفيذي · ترايبوو، مصر",
    result: "من الفكرة إلى أول نسخة تجريبية",
    caseStudy: "/case-studies/triboo-travel-mvp",
    avatar: "/testimonials/ahmed.png",
  },
  {
    quote: "ساعدتنا شركة إنسديم على تأسيس حضورنا الرقمي على أسس واضحة، بدايةً من البحث وفهم احتياجاتنا، مرورًا بالتخطيط الاستراتيجي، وصولًا إلى التنفيذ. لمسنا منهم اهتمامًا حقيقيًا بكل التفاصيل، والتزامًا في المتابعة، وحرصًا مستمرًا على تقديم أفضل نتيجة.",
    name: "م. إبراهيم",
    company: "المدير التنفيذي · تطوير عقاري",
    result: "أساس رقمي واضح من البحث إلى التنفيذ",
    caseStudy: "/case-studies/real-estate-sales-crm-saudi",
    avatar: "/testimonials/ibrahem.jpeg",
  },
];

export function TestimonialsSection() {
  const { t, language } = useLanguage();
  const testimonials = language === 'ar' ? testimonialsAr : testimonialsEn;
  const isAr = language === 'ar';
  const [index, setIndex] = useState(0);
  const current = testimonials[index];

  const goTo = (i: number) => setIndex((i + testimonials.length) % testimonials.length);

  return (
    <section className="py-20 sm:py-24 bg-[#F4F2FF]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <ScrollReveal className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#101418] mb-2">
            {t('testimonials.title')}
          </h2>
          <p className="text-sm sm:text-base text-[#4F555E] max-w-xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </ScrollReveal>

        {/* Desktop: single card with fade transition + side arrows */}
        <div className="hidden sm:flex relative items-center gap-6">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label={isAr ? 'الشهادة السابقة' : 'Previous testimonial'}
            className="flex flex-shrink-0 w-11 h-11 rounded-full bg-white border border-[#E5E5E5] items-center justify-center text-[#101418] hover:border-[#6D5DF6]/40 hover:text-[#6D5DF6] transition-colors duration-200"
          >
            {isAr ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
          </button>

          <div className="flex-1 overflow-hidden min-h-[320px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isAr ? -24 : 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isAr ? 24 : -24 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-3xl p-10 border border-[#E5E5E5] relative overflow-hidden"
              >
                <Quote className="absolute top-6 ltr:right-6 rtl:left-6 text-[#6D5DF6]/10" size={88} strokeWidth={1} />
                <p className="relative text-[#101418] text-base leading-relaxed font-medium mb-8">
                  "{current.quote}"
                </p>
                <div className="relative flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#F0F0F0]">
                  <div className="flex items-center gap-3">
                    {current.avatar ? (
                      <img
                        src={current.avatar}
                        alt={current.name}
                        className="w-11 h-11 rounded-full object-cover flex-shrink-0 ring-2 ring-[#EEEAFE]"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full flex-shrink-0 ring-2 ring-[#EEEAFE] bg-[#EEEAFE] flex items-center justify-center text-[#6D5DF6] font-semibold text-sm">
                        {current.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-[#101418]">{current.name}</p>
                      <p className="text-xs text-[#4F555E]">{current.company}</p>
                    </div>
                  </div>
                  <Link
                    to={current.caseStudy}
                    className="inline-flex items-center gap-1.5 text-xs text-[#6D5DF6] font-medium hover:gap-2 transition-all duration-200"
                  >
                    {isAr ? 'عرض قصة النجاح' : 'View Success Story'}
                    <ArrowRight size={11} className="rtl:rotate-180" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label={isAr ? 'الشهادة التالية' : 'Next testimonial'}
            className="flex flex-shrink-0 w-11 h-11 rounded-full bg-white border border-[#E5E5E5] items-center justify-center text-[#101418] hover:border-[#6D5DF6]/40 hover:text-[#6D5DF6] transition-colors duration-200"
          >
            {isAr ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
          </button>
        </div>

        <div className="hidden sm:flex items-center justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${isAr ? 'الذهاب إلى الشهادة' : 'Go to testimonial'} ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? 'w-7 bg-[#6D5DF6]' : 'w-2 bg-[#D9D4F5] hover:bg-[#6D5DF6]/50'
              }`}
            />
          ))}
        </div>

        {/* Mobile: swipeable strip, no buttons */}
        <div
          className="sm:hidden -mx-4 px-4 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          dir={isAr ? 'rtl' : 'ltr'}
        >
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="snap-center shrink-0 w-[85vw] bg-white rounded-3xl p-7 border border-[#E5E5E5] relative overflow-hidden"
            >
              <Quote className="absolute top-6 ltr:right-6 rtl:left-6 text-[#6D5DF6]/10" size={88} strokeWidth={1} />
              <p className="relative text-[#101418] text-sm leading-relaxed font-medium mb-8">
                "{item.quote}"
              </p>
              <div className="relative flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#F0F0F0]">
                <div className="flex items-center gap-3">
                  {item.avatar ? (
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-11 h-11 rounded-full object-cover flex-shrink-0 ring-2 ring-[#EEEAFE]"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full flex-shrink-0 ring-2 ring-[#EEEAFE] bg-[#EEEAFE] flex items-center justify-center text-[#6D5DF6] font-semibold text-sm">
                      {item.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-[#101418]">{item.name}</p>
                    <p className="text-xs text-[#4F555E]">{item.company}</p>
                  </div>
                </div>
                <Link
                  to={item.caseStudy}
                  className="inline-flex items-center gap-1.5 text-xs text-[#6D5DF6] font-medium"
                >
                  {isAr ? 'عرض قصة النجاح' : 'View Success Story'}
                  <ArrowRight size={11} className="rtl:rotate-180" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
