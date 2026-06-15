import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { useLanguage } from '../../contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const testimonialsEn = [
  {
    quote: "We moved from scattered WhatsApp follow-ups to a system that tracks every customer. Visibility improved completely.",
    name: "Ahmed Al-Mansouri",
    company: "Healthcare Clinic · Kuwait",
    result: "Better visibility",
    photo: "https://images.unsplash.com/photo-1591818873794-ba8279c7da8a?crop=faces&cs=tinysrgb&fit=crop&fm=jpg&h=96&w=96&q=80",
    caseStudy: "/case-studies/clearer-visibility",
  },
  {
    quote: "Leads were falling through the gaps between ads and WhatsApp. ENSDIM built a system that captures and organizes everything automatically.",
    name: "Sara Al-Dosari",
    company: "Real Estate Services · Saudi Arabia",
    result: "Higher conversion",
    photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=faces&cs=tinysrgb&fit=crop&fm=jpg&h=96&w=96&q=80",
    caseStudy: "/case-studies/scattered-follow-up",
  },
  {
    quote: "Manual booking and daily reminders were draining the team. The automation ENSDIM built saved hours and improved our response time.",
    name: "Mohammed Al-Khatib",
    company: "Service Business · UAE",
    result: "Faster response",
    photo: "https://images.unsplash.com/photo-1580411415491-a672219c801b?crop=faces&cs=tinysrgb&fit=crop&fm=jpg&h=96&w=96&q=80",
    caseStudy: "/case-studies/faster-response",
  },
  {
    quote: "The team was repeating the same manual tasks every day. ENSDIM automated the workflow and freed up hours we now use for actual client work.",
    name: "Khalid Al-Rashidi",
    company: "Operations Company · Qatar",
    result: "Less manual work",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=faces&cs=tinysrgb&fit=crop&fm=jpg&h=96&w=96&q=80",
    caseStudy: "/case-studies/reduced-manual-work",
  },
  {
    quote: "We were growing but the chaos was growing faster. ENSDIM gave us dashboards and systems that made scaling actually manageable.",
    name: "Noura Al-Farsi",
    company: "Growing Company · Oman",
    result: "Controlled growth",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=faces&cs=tinysrgb&fit=crop&fm=jpg&h=96&w=96&q=80",
    caseStudy: "/case-studies/scaling-with-control",
  },
];

const testimonialsAr = [
  {
    quote: "انتقلنا من متابعة مشتتة على الواتساب إلى نظام يتتبع كل عميل بوضوح. الرؤية والتحكم تحسّنا بشكل ملحوظ.",
    name: "أحمد المنصوري",
    company: "عيادة طبية · الكويت",
    result: "رؤية أوضح",
    photo: "https://images.unsplash.com/photo-1591818873794-ba8279c7da8a?crop=faces&cs=tinysrgb&fit=crop&fm=jpg&h=96&w=96&q=80",
    caseStudy: "/case-studies/clearer-visibility",
  },
  {
    quote: "كانت الفرص تضيع بين الإعلانات والواتساب. إنسديم بنت لنا نظاماً يجمع كل الطلبات وينظمها تلقائياً.",
    name: "سارة الدوسري",
    company: "خدمات عقارية · السعودية",
    result: "تحويل أعلى",
    photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=faces&cs=tinysrgb&fit=crop&fm=jpg&h=96&w=96&q=80",
    caseStudy: "/case-studies/scattered-follow-up",
  },
  {
    quote: "الحجز اليدوي والتذكيرات كانت تستنزف الفريق. الأتمتة التي بنتها إنسديم وفّرت ساعات يومية وحسّنت وقت الاستجابة.",
    name: "محمد الخطيب",
    company: "شركة خدمات · الإمارات",
    result: "استجابة أسرع",
    photo: "https://images.unsplash.com/photo-1580411415491-a672219c801b?crop=faces&cs=tinysrgb&fit=crop&fm=jpg&h=96&w=96&q=80",
    caseStudy: "/case-studies/faster-response",
  },
  {
    quote: "الفريق كان يكرر نفس المهام كل يوم. إنسديم أتمتت سير العمل وحرّرت وقتاً نستثمره الآن في خدمة العملاء فعلياً.",
    name: "خالد الراشدي",
    company: "شركة تشغيل · قطر",
    result: "عمل يدوي أقل",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=faces&cs=tinysrgb&fit=crop&fm=jpg&h=96&w=96&q=80",
    caseStudy: "/case-studies/reduced-manual-work",
  },
  {
    quote: "كنا ننمو لكن الفوضى تنمو معنا. إنسديم أعطتنا لوحات تحكم وأنظمة جعلت التوسع قابلاً للإدارة والقياس.",
    name: "نورا الفارسي",
    company: "شركة نامية · عُمان",
    result: "نمو منضبط",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=faces&cs=tinysrgb&fit=crop&fm=jpg&h=96&w=96&q=80",
    caseStudy: "/case-studies/scaling-with-control",
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
            {language === 'ar' ? 'ماذا يقول عملاؤنا' : 'What clients say'}
          </h2>
          <p className="text-sm sm:text-base text-[#69717D] max-w-xl mx-auto">
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
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0 ring-2 ring-[#EEEAFE]"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#101418] truncate">{testimonial.name}</p>
                    <p className="text-xs text-[#69717D] truncate">{testimonial.company}</p>
                  </div>
                  <span className="flex-shrink-0 px-2.5 py-1 bg-[#EEEAFE] text-[#6D5DF6] text-[10px] font-semibold rounded-full whitespace-nowrap">
                    {testimonial.result}
                  </span>
                </div>
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
