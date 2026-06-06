import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHero } from '../components/PageHero';
import { ScrollReveal } from '../components/ScrollReveal';

const problems = [
  {
    slug: 'leads-get-lost',
    en: { title: 'Leads get lost', desc: 'Inquiries come in from multiple channels with no central system to track or follow up.' },
    ar: { title: 'العملاء المحتملون يضيعون', desc: 'تأتي الاستفسارات من قنوات متعددة دون نظام مركزي للتتبع أو المتابعة.' },
  },
  {
    slug: 'follow-up-memory',
    en: { title: 'Follow-up depends on memory', desc: 'There\'s no structured reminder system. Follow-up happens when someone remembers, not when it should.' },
    ar: { title: 'المتابعة تعتمد على الذاكرة', desc: 'لا يوجد نظام تذكير منظم. المتابعة تحدث عندما يتذكر أحد، لا عندما يجب.' },
  },
  {
    slug: 'slow-response',
    en: { title: 'Customers wait too long', desc: 'Slow response to inquiries frustrates potential customers and pushes them to competitors.' },
    ar: { title: 'العملاء ينتظرون طويلاً', desc: 'بطء الرد على الاستفسارات يحبط العملاء المحتملين ويدفعهم للمنافسين.' },
  },
  {
    slug: 'no-visibility',
    en: { title: 'Management lacks visibility', desc: 'No clear view of leads, operations, or performance. Decisions are made without data.' },
    ar: { title: 'الإدارة تفتقر للرؤية', desc: 'لا رؤية واضحة للعملاء المحتملين أو التشغيل أو الأداء. القرارات تُتخذ بدون بيانات.' },
  },
  {
    slug: 'repeated-work',
    en: { title: 'Teams repeat the same work', desc: 'Manual data entry, repeated messages, and duplicated tasks waste time that should go to customers.' },
    ar: { title: 'الفرق تكرر نفس العمل', desc: 'إدخال البيانات اليدوي، والرسائل المتكررة، والمهام المكررة تضيع وقتاً يجب أن يذهب للعملاء.' },
  },
  {
    slug: 'growth-pressure',
    en: { title: 'Growth creates pressure', desc: 'When the business grows, operations become harder to manage. The system doesn\'t scale.' },
    ar: { title: 'النمو يخلق ضغطاً', desc: 'عندما تنمو الأعمال، تصبح العمليات أصعب في الإدارة. النظام لا يتوسع.' },
  },
];

export function ProblemsLibraryPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  return (
    <>
      <PageHero
        eyebrow={ar ? 'مكتبة المشكلات' : 'Problems Library'}
        title={ar ? 'مشكلات نحلها' : 'Problems we solve'}
        subtitle={ar ? 'مشكلات تشغيلية حقيقية تجعل الأعمال تخسر عملاء محتملين، وقتًا، وضوحًا، وفرص نمو.' : 'Real operating problems that make businesses lose leads, time, visibility, and growth.'}
        variant="light"
      />

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {problems.map((p, i) => {
              const d = ar ? p.ar : p.en;
              return (
                <ScrollReveal key={p.slug} delay={i * 0.06}>
                  <div className="h-full flex flex-col p-6 bg-white border border-[#E5E5E5] rounded-2xl hover:border-[#6D5DF6] hover:shadow-lg transition-all duration-300">
                    <h3 className="text-base font-bold text-[#101418] mb-2">{d.title}</h3>
                    <p className="text-sm text-[#69717D] leading-relaxed flex-1 mb-4">{d.desc}</p>
                    <Link to={`/problems/${p.slug}`} className="inline-flex items-center gap-1.5 text-sm text-[#6D5DF6] font-medium hover:gap-2.5 transition-all">
                      {ar ? 'اعرف المشكلة والحل' : 'See problem and solution'} <ArrowRight size={13} />
                    </Link>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
