import { useLanguage } from '../../contexts/LanguageContext';
import { PageHero } from '../components/PageHero';
import { ScrollReveal } from '../components/ScrollReveal';
import { TechnologyEcosystem } from '../components/TechnologyEcosystem';
import { SEO } from '../components/SEO';

export function PartnersPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  return (
    <>
      <SEO
        title="Technology Partners | ENSDIM - Trusted Global Tech Stack"
        description="ENSDIM uses trusted global technologies to build reliable, scalable digital systems. Our technology ecosystem supports AI automation, CRM, SaaS, and digital transformation projects."
        keywords="ENSDIM technology partners, AI tech stack, automation tools Egypt, SaaS technologies Middle East"
        canonical="/partners"
      />
      <PageHero
        title={ar ? 'منظومة تقنية استراتيجية' : 'Strategic Technology Ecosystem'}
        subtitle={ar
          ? 'تقنيات نستخدمها لبناء أنظمة رقمية موثوقة وقابلة للتوسع.'
          : 'Technologies we use to build reliable, scalable digital systems.'}
        variant="light"
      />

      <ScrollReveal>
        <TechnologyEcosystem />
      </ScrollReveal>

      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs text-[#4F555E]/50">
            {ar
              ? 'التقنيات المذكورة هي منصات نعمل معها. لا يُشير هذا إلى شراكة رسمية أو تأييد من قِبل هذه الشركات.'
              : 'Technologies listed are platforms we work with. This does not imply official partnership or endorsement by these companies.'}
          </p>
        </div>
      </section>
    </>
  );
}
