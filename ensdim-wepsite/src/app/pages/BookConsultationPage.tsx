import { useLanguage } from '../../contexts/LanguageContext';
import { PageHero } from '../components/PageHero';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';
import { ConsultationForm } from '../components/ConsultationForm';

export function BookConsultationPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  return (
    <>
      <SEO
        title="Book a Consultation | ENSDIM - AI & Automation Strategy Session"
        description="Book a free strategy consultation with ENSDIM. We'll analyze your business operations, customer journey, and identify where AI automation, CRM, or digital systems can drive real results."
        keywords="book AI consultation Egypt, automation strategy session, free business consultation Middle East, ENSDIM consultation"
        canonical="/book-consultation"
      />
      <PageHero
        title={ar ? 'احجز استشارة.' : 'Book a consultation.'}
        subtitle={ar
          ? 'جلسة مركزة لفهم عملك، رحلة عميلك، والفجوات التشغيلية لديك.'
          : 'A focused session to understand your business, customer journey, and operating gaps.'}
      />

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <ConsultationForm
              title={ar ? 'احجز استشارة.' : 'Book a consultation.'}
              hiddenFields={{ source_page: '/book-consultation', interest_type: 'consultation' }}
            />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
