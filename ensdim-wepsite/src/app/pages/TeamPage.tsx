import { Link } from 'react-router';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHero } from '../components/PageHero';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';

const departments = [
  { en: 'Leadership & Strategy', ar: 'القيادة والاستراتيجية', count: 2 },
  { en: 'Product & UX', ar: 'المنتج وتجربة المستخدم', count: 3 },
  { en: 'Engineering', ar: 'الهندسة', count: 4 },
  { en: 'Data & AI', ar: 'البيانات والذكاء الاصطناعي', count: 2 },
  { en: 'Growth & Business', ar: 'النمو والأعمال', count: 3 },
];

const placeholders = [
  { initials: 'AK', name: { en: 'A. Khalil', ar: 'أ. خليل' }, role: { en: 'Strategy & Operations', ar: 'استراتيجية وتشغيل' } },
  { initials: 'MH', name: { en: 'M. Hassan', ar: 'م. حسن' }, role: { en: 'Product Lead', ar: 'قيادة المنتج' } },
  { initials: 'SA', name: { en: 'S. Al-Amin', ar: 'س. الأمين' }, role: { en: 'UX Design', ar: 'تصميم تجربة المستخدم' } },
  { initials: 'YR', name: { en: 'Y. Rashid', ar: 'ي. راشد' }, role: { en: 'Engineering', ar: 'هندسة' } },
  { initials: 'LF', name: { en: 'L. Farouk', ar: 'ل. فاروق' }, role: { en: 'Data & AI', ar: 'بيانات وذكاء اصطناعي' } },
  { initials: 'TA', name: { en: 'T. Al-Nasser', ar: 'ت. الناصر' }, role: { en: 'Growth', ar: 'النمو' } },
];

export function TeamPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  return (
    <>
      <SEO
        title="Team | ENSDIM - The People Behind Our AI Automation Systems"
        description="Meet the ENSDIM team: product strategists, engineers, UX designers, data scientists, and AI specialists building behavior-led business systems across Egypt, Saudi Arabia, and UAE."
        keywords="ENSDIM team, AI team Egypt, automation engineers, UX designers Egypt, AI specialists Middle East"
        canonical="/team"
      />
      <PageHero
        title={ar ? 'الفريق وراء إنسديم.' : 'The team behind ENSDIM.'}
        subtitle={ar
          ? 'فريق يعمل عن بُعد يجمع بين المنتج، الهندسة، التصميم، البيانات، التشغيل، والنمو.'
          : 'A remote-first team combining product, engineering, design, data, operations, and growth.'}
      />

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Departments */}
          <ScrollReveal className="mb-12">
            <div className="flex flex-wrap gap-3">
              {departments.map((d, i) => (
                <div key={i} className="px-4 py-2 bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl text-sm text-[#101418] font-medium">
                  {ar ? d.ar : d.en}
                  <span className="ms-2 text-[#69717D] text-xs">({d.count})</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Placeholder team members */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {placeholders.map((member, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="border border-[#E5E5E5] rounded-2xl p-5 flex items-center gap-4 hover:border-[#6D5DF6] transition-colors">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6D5DF6] to-[#3B2A78] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {member.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#101418]">{ar ? member.name.ar : member.name.en}</p>
                    <p className="text-xs text-[#69717D]">{ar ? member.role.ar : member.role.en}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4} className="mt-10 text-center">
            <p className="text-sm text-[#69717D]">
              {ar ? 'هل تريد الانضمام إلى الفريق؟' : 'Want to join the team?'}
              {' '}
              <Link to="/careers" className="text-[#6D5DF6] hover:underline font-medium">
                {ar ? 'اعرض الوظائف المتاحة' : 'View open roles'}
              </Link>
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
