import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from './ScrollReveal';

export function CareersPreview() {
  const { t, language } = useLanguage();
  const ar = language === 'ar';

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
          <div className="max-w-2xl">
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
        </ScrollReveal>
      </div>
    </section>
  );
}
