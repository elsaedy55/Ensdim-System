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
import { SEO } from '../components/SEO';

const homeFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Ensdim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ensdim is an AI automation agency that builds behavior-led digital systems for businesses in Egypt, Saudi Arabia, UAE, and the Gulf region. We build AI agents, automation systems, CRM platforms, SaaS products, and digital transformation solutions.',
      },
    },
    {
      '@type': 'Question',
      name: 'What services does Ensdim provide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ensdim provides AI automation development, AI agent development, CRM development, SaaS development, web design, data dashboards, and digital transformation consulting for businesses across Egypt, Saudi Arabia, and UAE.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who is Ensdim for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ensdim works with service businesses, clinics, real estate companies, education providers, and construction firms in Egypt, Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, and Oman that need clearer operations, better customer follow-up, and AI-powered growth.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why choose Ensdim over other agencies?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ensdim starts with diagnosing your operations and customer behavior before building technology. This behavior-first approach means the systems we build actually solve the real problem — not just automate the wrong process.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Ensdim work with businesses outside Egypt?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Ensdim serves clients in Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, Oman, and Egypt, and works with international clients remotely.',
      },
    },
  ],
};

export function HomePage() {
  return (
    <>
      <SEO
        title="Ensdim | Human-Centered Digital Solutions"
        description="We build intelligent digital solutions that understand customer behavior and solve real business challenges. Ensdim helps businesses improve conversion, customer experience, and operational clarity through intelligent digital solutions built around customer behavior and real business challenges."
        keywords="AI automation agency Egypt, AI agents Saudi Arabia, SaaS development UAE, CRM development Middle East, digital transformation, AI agency Cairo, automation agency Dubai, وكالة ذكاء اصطناعي مصر, أتمتة الأعمال"
        canonical="/"
        jsonLd={homeFaqSchema}
      />
      <Hero />
      <ProblemsSection />
      <WhoIsSection />
      <MaturitySection />
      <SolutionsSection />
      <SectorsSection />
      <MethodologySection />
      <TechnologyEcosystem />
      <ClientPortalFeature />
      <TestimonialsSection />
      <FeaturedResearch />
      <FeaturedCaseStudy />
      <FinalCTA />
      <CareersPreview />
    </>
  );
}
