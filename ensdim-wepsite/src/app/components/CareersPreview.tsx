import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from './ScrollReveal';

export function CareersPreview() {
  const { t, language } = useLanguage();
  const ar = language === 'ar';

  const roles = [
    // Research
    { slug: 'ux-researcher', label: ar ? 'باحث تجربة المستخدم' : 'UX Researcher', type: ar ? 'البحث' : 'Research' },
    { slug: 'behavioral-psychology-researcher', label: ar ? 'باحث في علم النفس السلوكي' : 'Behavioral Psychology Researcher', type: ar ? 'البحث' : 'Research' },
    { slug: 'market-researcher', label: ar ? 'باحث سوق' : 'Market Researcher', type: ar ? 'البحث' : 'Research' },
    // Growth
    { slug: 'business-developer', label: ar ? 'مطور أعمال' : 'Business Developer', type: ar ? 'النمو' : 'Growth' },
    { slug: 'sales-specialist', label: ar ? 'متخصص مبيعات' : 'Sales Specialist', type: ar ? 'النمو' : 'Growth' },
    // Engineering
    { slug: 'backend-developer', label: ar ? 'مطور واجهات خلفية' : 'Backend Developer', type: ar ? 'الهندسة' : 'Engineering' },
    { slug: 'frontend-developer', label: ar ? 'مطور واجهات أمامية' : 'Frontend Developer', type: ar ? 'الهندسة' : 'Engineering' },
    { slug: 'ai-engineer', label: ar ? 'مهندس ذكاء اصطناعي' : 'AI Engineer', type: ar ? 'الهندسة' : 'Engineering' },
  ];

  return (
    <section className="py-20 sm:py-24 bg-white border-t border-[#E5E5E5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#101418] mb-2">
                {ar ? 'الوظائف' : 'Careers'}
              </h2>
              <p className="text-sm text-[#69717D] max-w-2xl">
                {ar ? 'انضم إلى إنسديم وساهم في بناء أنظمة أعمال أذكى حول الإنسان، السلوك، والتشغيل.' : 'Join ENSDIM and help build smarter business systems around people, behavior, and operations.'}
              </p>
            </div>
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#101418] text-white rounded-xl hover:bg-[#1e232b] transition-colors text-sm font-medium flex-shrink-0 self-start sm:self-auto"
            >
              {ar ? 'عرض الوظائف المتاحة' : 'View Open Roles'}
              <ArrowRight size={15} />
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 items-start">
            {/* Left: description */}
            <div className="sm:max-w-[280px] flex-shrink-0">
              <p className="text-sm text-[#69717D] leading-relaxed mb-4">
                {ar ? 'نبني فريقًا مرنًا يجمع بين المنتج، الهندسة، البحث، التصميم، البيانات، النمو، واستراتيجية الأعمال.' : 'We are building a flexible team across product, engineering, research, design, data, growth, and business strategy.'}
              </p>
              <Link
                to="/careers/general-application"
                className="inline-flex items-center gap-2 text-sm text-[#6D5DF6] hover:text-[#5d4de6] font-medium transition-colors"
              >
                {ar ? 'أرسل ملفك التعريفي' : 'Send us your profile'}
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Right: roles */}
            <div className="flex-1">
              <p className="text-[11px] text-[#69717D] mb-3 uppercase tracking-widest font-semibold">
                {ar ? 'الوظائف المتاحة' : 'AVAILABLE ROLES'}
              </p>
              <div className="flex flex-wrap gap-2">
                {roles.map((role, index) => (
                  <Link
                    key={index}
                    to={`/careers/${role.slug}`}
                    className="group flex items-center gap-2 px-3.5 py-2 bg-[#F8F8FF] border border-[#E5E5E5] rounded-xl hover:border-[#6D5DF6]/50 hover:bg-[#EEEAFE] hover:shadow-[0_2px_12px_rgba(109,93,246,0.1)] transition-all duration-200"
                  >
                    <span className="text-xs font-medium text-[#101418] group-hover:text-[#3B2A78] transition-colors">
                      {role.label}
                    </span>
                    <span className="text-[10px] text-[#69717D]/60 bg-[#E5E5E5] group-hover:bg-[#6D5DF6]/15 group-hover:text-[#6D5DF6] px-1.5 py-0.5 rounded-full transition-colors">
                      {role.type}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
