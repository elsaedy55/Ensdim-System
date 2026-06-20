import { Hero } from '../components/Hero';
import { ProblemsSection } from '../components/ProblemsSection';
import { WhoIsSection } from '../components/WhoIsSection';
import { SolutionsSection } from '../components/SolutionsSection';
import { SectorsSection } from '../components/SectorsSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { TechnologyEcosystem } from '../components/TechnologyEcosystem';
import { MaturitySection } from '../components/MaturitySection';
import { MethodologySection } from '../components/MethodologySection';
import { ClientPortalFeature } from '../components/ClientPortalFeature';
import { FeaturedResearch } from '../components/FeaturedResearch';
import { FeaturedCaseStudy } from '../components/FeaturedCaseStudy';
import { FinalCTA } from '../components/FinalCTA';
import { CareersPreview } from '../components/CareersPreview';
import { BookConsultationCTA } from '../components/BookConsultationCTA';
import { SEO } from '../components/SEO';

const homeFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is ENSDIM?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ENSDIM is an AI automation agency that builds behavior-led digital systems for businesses in Egypt, Saudi Arabia, UAE, and the Gulf region. We build AI agents, automation systems, CRM platforms, SaaS products, and digital transformation solutions.',
      },
    },
    {
      '@type': 'Question',
      name: 'What services does ENSDIM provide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ENSDIM provides AI automation development, AI agent development, CRM development, SaaS development, web design, data dashboards, and digital transformation consulting for businesses across Egypt, Saudi Arabia, and UAE.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who is ENSDIM for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ENSDIM works with service businesses, clinics, real estate companies, education providers, and construction firms in Egypt, Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, and Oman that need clearer operations, better customer follow-up, and AI-powered growth.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why choose ENSDIM over other agencies?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ENSDIM starts with diagnosing your operations and customer behavior before building technology. This behavior-first approach means the systems we build actually solve the real problem — not just automate the wrong process.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does ENSDIM work with businesses outside Egypt?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. ENSDIM serves clients in Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, Oman, and Egypt, and works with international clients remotely.',
      },
    },
  ],
};

export function HomePage() {
  return (
    <>
      <SEO
        title="ENSDIM | Human-Centered Digital Solutions"
        description="ENSDIM builds AI automation systems, CRM platforms, SaaS products, and behavior-led digital experiences for businesses in Egypt, Saudi Arabia, and UAE. Strategy first. Technology around people."
        keywords="AI automation agency Egypt, AI agents Saudi Arabia, SaaS development UAE, CRM development Middle East, digital transformation, AI agency Cairo, automation agency Dubai, وكالة ذكاء اصطناعي مصر, أتمتة الأعمال"
        canonical="/"
        jsonLd={homeFaqSchema}
      />
      <Hero />
      <ProblemsSection />
      <BookConsultationCTA variant="compact" />
      <WhoIsSection />
      <SolutionsSection />
      <SectorsSection />
      <TestimonialsSection />
      <TechnologyEcosystem />
      <MaturitySection />
      <BookConsultationCTA />
      <MethodologySection />
      <ClientPortalFeature />
      <FeaturedResearch />
      <FeaturedCaseStudy />
      <FinalCTA />
      <CareersPreview />
    </>
  );
}
