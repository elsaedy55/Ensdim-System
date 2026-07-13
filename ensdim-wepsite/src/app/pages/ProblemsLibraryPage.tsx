import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHero } from '../components/PageHero';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';

const problems = [
  {
    slug: 'leads-get-lost',
    en: { title: 'Customers and opportunities are lost before they turn into sales', desc: 'Inquiries come in from multiple channels with no central system to track or follow up.' },
    ar: { title: 'العملاء والفرص تضيع قبل ما تتحول لمبيعات', desc: 'تأتي الاستفسارات من قنوات متعددة دون نظام مركزي للتتبع أو المتابعة.' },
  },
  {
    slug: 'visitors-not-converting',
    en: { title: 'Visitors are not turning into clear requests', desc: 'Website or campaign traffic arrives, but most visitors leave without submitting a clear inquiry or request.' },
    ar: { title: 'الزوار لا يتحولون إلى طلبات واضحة', desc: 'تصل زيارات الموقع أو الحملات، لكن معظم الزوار يرحلون دون ترك استفسار أو طلب واضح.' },
  },
  {
    slug: 'repeated-work',
    en: { title: 'Manual operations drain the team and increase costs', desc: 'Manual data entry, repeated messages, and duplicated tasks waste time that should go to customers.' },
    ar: { title: 'التشغيل اليدوي يستهلك الفريق ويرفع التكلفة', desc: 'إدخال البيانات اليدوي، والرسائل المتكررة، والمهام المكررة تضيع وقتاً يجب أن يذهب للعملاء.' },
  },
  {
    slug: 'slow-response',
    en: { title: 'Slow response reduces trust and loses ready-to-buy customers', desc: 'Slow response to inquiries frustrates potential customers and pushes them to competitors.' },
    ar: { title: 'الرد المتأخر يقلل الثقة ويخسر عملاء جاهزين', desc: 'بطء الرد على الاستفسارات يحبط العملاء المحتملين ويدفعهم للمنافسين.' },
  },
  {
    slug: 'no-visibility',
    en: { title: 'Management cannot see the full picture in time', desc: 'No clear view of leads, operations, or performance. Decisions are made without data.' },
    ar: { title: 'الإدارة لا ترى الصورة كاملة في الوقت المناسب', desc: 'لا رؤية واضحة للعملاء المحتملين أو التشغيل أو الأداء. القرارات تُتخذ بدون بيانات.' },
  },
  {
    slug: 'data-not-helping-decisions',
    en: { title: 'The data exists, but it is not helping you make decisions', desc: 'Numbers are collected, but management still decides on instinct rather than evidence.' },
    ar: { title: 'البيانات موجودة… لكنها لا تساعدك على القرار', desc: 'الأرقام موجودة، لكن الإدارة ما زالت تقرر بالحدس لا بالدليل.' },
  },
];

export function ProblemsLibraryPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  return (
    <>
      <SEO
        title={ar ? 'مشكلات نحلها | إنسديم' : 'Problems we solve | Ensdim'}
        description={ar ? 'مشكلات تشغيلية حقيقية تجعل الأعمال تخسر عملاء محتملين، وقتًا، وضوحًا، وفرص نمو.' : 'Real operating problems that make businesses lose leads, time, visibility, and growth.'}
        canonical="/solutions/problems"
        lang={ar ? 'ar' : 'en'}
      />
      <PageHero
        eyebrow={ar ? 'مكتبة المشكلات' : 'Problems Library'}
        title={ar ? 'مشكلات نحلها' : 'Problems we solve'}
        subtitle={ar ? 'مشكلات تشغيلية حقيقية تجعل الأعمال تخسر عملاء محتملين، وقتًا، وضوحًا، وفرص نمو.' : 'Real operating problems that make businesses lose leads, time, visibility, and growth.'}
        variant="light"
      />

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {problems.map((p, i) => {
              const d = ar ? p.ar : p.en;
              return (
                <ScrollReveal key={p.slug} delay={i * 0.06}>
                  <Link
                    to={`/problems/${p.slug}`}
                    className="group h-full flex flex-col p-5 sm:p-6 bg-white border border-[#E5E5E5] rounded-2xl hover:border-[#6D5DF6] hover:shadow-lg active:scale-[0.98] active:border-[#6D5DF6] active:shadow-md transition-all duration-200"
                  >
                    <h3 className="text-base font-bold text-[#101418] mb-2">{d.title}</h3>
                    <p className="text-sm text-[#4F555E] leading-relaxed flex-1 mb-4">{d.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm text-[#6D5DF6] font-medium group-hover:gap-2.5 group-active:gap-2.5 transition-all">
                      {ar ? 'اعرف المشكلة والحل' : 'See problem and solution'} <ArrowRight size={13} />
                    </span>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
