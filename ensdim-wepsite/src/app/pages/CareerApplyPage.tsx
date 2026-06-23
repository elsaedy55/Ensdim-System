import { Link, useSearchParams } from 'react-router';
import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';
import { JobApplicationForm } from '../components/JobApplicationForm';

export function CareerApplyPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const [searchParams] = useSearchParams();
  const roleTitle = searchParams.get('role') || '';

  const hiddenFields = {
    source_page: '/careers/apply',
    career_role: roleTitle || 'general',
    interest_type: roleTitle ? 'career_application' : 'general_career_application',
    language,
  };

  return (
    <>
      <SEO
        title={roleTitle ? `${roleTitle} | ${ar ? 'التقديم على وظيفة في إنسديم' : 'Apply at ENSDIM'}` : (ar ? 'أرسل بياناتك | إنسديم' : 'Send Your Profile | ENSDIM')}
        description={ar
          ? 'قدّم على دور مفتوح في إنسديم أو أرسل بياناتك العامة.'
          : 'Apply for an open role at ENSDIM or send us your general profile.'}
        canonical="/careers/apply"
        lang={ar ? 'ar' : 'en'}
      />

      <section className="pt-24 pb-10 sm:pt-32 sm:pb-14 bg-[#0f0d19] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-6 text-xs text-white/50 flex items-center gap-1">
            <Link to="/" className="hover:text-white/80 transition-colors">{ar ? 'الرئيسية' : 'Home'}</Link>
            <span className="opacity-40">/</span>
            <Link to="/careers" className="hover:text-white/80 transition-colors">{ar ? 'الوظائف' : 'Careers'}</Link>
            <span className="opacity-40">/</span>
            <span className="text-white/70 font-medium">{ar ? 'التقديم' : 'Apply'}</span>
          </div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5 uppercase tracking-wider bg-[#6D5DF6]/15 border border-[#6D5DF6]/20 text-[#EEEAFE]/80">
            {roleTitle ? (ar ? 'وظيفة مفتوحة' : 'Open Role') : (ar ? 'طلب عام' : 'General Application')}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold mb-3 leading-tight text-white">
            {roleTitle || (ar ? 'أرسل ملفك التعريفي' : 'Send us your profile')}
          </h1>
          <p className="text-base text-[#EEEAFE]/75 max-w-2xl leading-relaxed">
            {roleTitle
              ? (ar ? `قدّم على دور ${roleTitle} من خلال النموذج أدناه.` : `Apply for the ${roleTitle} role using the form below.`)
              : (ar
                ? 'إذا كنت ترى أن مهاراتك يمكن أن تساعد إنسديم، أرسل ملفك التعريفي وأخبرنا أين يمكنك المساهمة.'
                : 'If you believe your skills can help ENSDIM, send your profile and tell us where you can contribute.')}
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <JobApplicationForm
              roleTitle={roleTitle}
              formTitle={roleTitle ? (ar ? 'قدّم على هذه الوظيفة.' : 'Apply for this role.') : (ar ? 'أرسل ملفك التعريفي.' : 'Send us your profile.')}
              hiddenFields={hiddenFields}
            />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
