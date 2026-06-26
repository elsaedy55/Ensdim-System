import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from './ScrollReveal';

export function CareersPreview() {
  const { t, language } = useLanguage();
  const ar = language === 'ar';

  const roles = [
    // Research
    { slug: 'ux-researcher', label: 'UX Researcher', type: ar ? 'البحث' : 'Research' },
    { slug: 'behavioral-psychology-researcher', label: 'Behavioral Psychology Researcher', type: ar ? 'البحث' : 'Research' },
    { slug: 'market-researcher', label: 'Market Researcher', type: ar ? 'البحث' : 'Research' },
    // Growth
    { slug: 'business-developer', label: 'Business Developer', type: ar ? 'النمو' : 'Growth' },
    { slug: 'sales-specialist', label: 'Sales Specialist', type: ar ? 'النمو' : 'Growth' },
    { slug: 'content-strategist', label: 'Content Strategist', type: ar ? 'النمو' : 'Growth' },
    // Engineering
    { slug: 'backend-developer', label: 'Backend Developer', type: ar ? 'الهندسة' : 'Engineering' },
    { slug: 'frontend-developer', label: 'Frontend Developer', type: ar ? 'الهندسة' : 'Engineering' },
    { slug: 'ai-engineer', label: 'AI Engineer', type: ar ? 'الهندسة' : 'Engineering' },
    { slug: 'data-analyst', label: 'Data Analyst', type: ar ? 'الهندسة' : 'Engineering' },
    // Product
    { slug: 'ui-ux-designer', label: 'UI/UX Designer', type: ar ? 'المنتج' : 'Product' },
    // Strategy
    { slug: 'technical-project-manager', label: 'Technical Project Manager', type: ar ? 'الاستراتيجية' : 'Strategy' },
  ];

  return (
    <section className="py-20 sm:py-24 bg-white border-t border-[#E5E5E5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#101418] mb-2">
                {ar ? 'مكان لمن يريد أن يبني شيئًا أكبر من وظيفة.' : 'A place for people who want to build more than a job.'}
              </h2>
              <p className="text-sm text-[#4F555E] max-w-2xl">
                {ar
                  ? 'في إنسديم، لا نبحث عن منفذين فقط. نبحث عن أشخاص لديهم فضول، تفكير عميق، ورغبة حقيقية في التطور من خلال العمل على مشاريع تجمع بين التقنية، السلوك، التصميم، والنمو.'
                  : 'At ENSDIM, we are not looking for executors only. We look for curious people with deep thinking and a real desire to grow through projects that connect technology, behavior, design, and business growth.'}
              </p>
            </div>
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#101418] text-white rounded-xl hover:bg-[#1e232b] active:scale-[0.97] transition-all duration-200 text-sm font-medium flex-shrink-0 self-start sm:self-auto"
            >
              {ar ? 'استعرض الوظائف المتاحة' : 'View Open Roles'}
              <ArrowRight size={15} />
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 items-start">
            {/* Left: description */}
            <div className="sm:max-w-[280px] flex-shrink-0">
              <p className="text-sm text-[#4F555E] leading-relaxed mb-4">
                {ar
                  ? 'هنا ستعمل مع فرق مرنة، تتعلم بسرعة، تتحمل مسؤولية حقيقية، وتشارك في بناء حلول لشركات تواجه تحديات فعلية في التشغيل، المتابعة، تجربة العميل، واتخاذ القرار.'
                  : 'Here, you will work with flexible teams, learn fast, take real responsibility, and help build solutions for companies facing real challenges in operations, follow-up, customer experience, and decision-making.'}
              </p>
              <Link
                to="/careers/general-application"
                className="inline-flex items-center gap-2 text-sm text-[#6D5DF6] hover:text-[#5d4de6] active:scale-95 font-medium transition-all"
              >
                {ar ? 'أرسل ملفك التعريفي' : 'Send us your profile'}
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Right: roles */}
            <div className="flex-1">
              <p className="text-[11px] text-[#4F555E] mb-3 uppercase tracking-widest font-semibold">
                {ar ? 'الأدوار المطلوبة' : 'AVAILABLE ROLES'}
              </p>
              <div className="flex flex-wrap gap-2">
                {roles.map((role, index) => (
                  <Link
                    key={index}
                    to={`/careers/${role.slug}`}
                    className="group flex items-center gap-2 px-3.5 py-2 bg-[#F8F8FF] border border-[#E5E5E5] rounded-xl hover:border-[#6D5DF6]/50 hover:bg-[#EEEAFE] hover:shadow-[0_2px_12px_rgba(109,93,246,0.1)] active:scale-[0.96] transition-all duration-200"
                  >
                    <span className="text-xs font-medium text-[#101418] group-hover:text-[#3B2A78] transition-colors">
                      {role.label}
                    </span>
                    <span className="text-[10px] text-[#4F555E]/60 bg-[#E5E5E5] group-hover:bg-[#6D5DF6]/15 group-hover:text-[#6D5DF6] px-1.5 py-0.5 rounded-full transition-colors">
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
