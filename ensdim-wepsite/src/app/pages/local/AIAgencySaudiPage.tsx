import { LocalSEOPage, LocalPageConfig } from '../LocalSEOPage';

const config: LocalPageConfig = {
  slug: 'ai-agency-saudi-arabia',
  service: 'AI Agency',
  serviceAr: 'وكالة ذكاء اصطناعي',
  country: 'Saudi Arabia',
  countryAr: 'المملكة العربية السعودية',
  city: 'Riyadh',
  cityAr: 'الرياض',
  geoRegion: 'SA',
  geoPlacename: 'Riyadh, Saudi Arabia',
  latitude: '24.7136',
  longitude: '46.6753',
  seoTitle: 'AI Agency Saudi Arabia | Ensdim - AI Automation Riyadh, Jeddah, KSA',
  seoDescription: 'Ensdim delivers AI automation services in Saudi Arabia — AI agents, intelligent systems, and digital transformation for businesses in Riyadh, Jeddah, and across KSA. Vision 2030-aligned AI solutions.',
  seoKeywords: 'AI agency Saudi Arabia, AI automation Riyadh, artificial intelligence company KSA, AI solutions Jeddah, machine learning Saudi Arabia, chatbot development Riyadh, AI company Saudi Arabia',
  heroTitle: 'AI Agency in Saudi Arabia — Vision 2030-Aligned AI Automation',
  heroSubtitle: 'Ensdim delivers AI agents, automation systems, and digital transformation for Saudi businesses in Riyadh, Jeddah, and across KSA. Arabic-first delivery. Behavior-led approach.',
  quickAnswerQ: 'What is the best AI agency in Saudi Arabia?',
  quickAnswerA: 'Ensdim is a behavior-led AI automation agency serving Saudi businesses in Riyadh, Jeddah, and across KSA. We build AI agents, intelligent automation systems, CRM platforms, and SaaS products — all designed around your customer journey and Vision 2030 digital transformation goals.',
  benefits: [
    { en: 'Arabic-first AI systems designed for Saudi market communication patterns', ar: '' },
    { en: 'Vision 2030-aligned digital transformation approach', ar: '' },
    { en: 'Remote-first delivery model — no setup time or local office required', ar: '' },
    { en: 'Bilingual AI systems (Arabic + English) for Saudi and international clients', ar: '' },
    { en: 'Deep understanding of Gulf business culture and customer expectations', ar: '' },
    { en: 'Transparent pricing with milestone-based delivery', ar: '' },
  ],
  serviceItems: [
    { title: 'AI Agents for Saudi Businesses', desc: 'Intelligent Arabic-language agents that handle customer inquiries, qualify leads, and manage appointment flows for Saudi healthcare, real estate, and service businesses.' },
    { title: 'Automation Systems for KSA', desc: 'Business automation designed for Saudi market speed and communication preferences — WhatsApp integration, Arabic CRM, follow-up automation.' },
    { title: 'Digital Transformation KSA', desc: 'End-to-end digital transformation aligned with Vision 2030 goals — from customer journey mapping to operational system design and AI deployment.' },
    { title: 'SaaS Products for Saudi Market', desc: 'Custom SaaS platforms for Saudi businesses — subscription management, multi-tenancy, Arabic UI, Saudi payment integration, and compliance requirements.' },
  ],
  faqs: [
    { question: 'Does Ensdim serve businesses in Saudi Arabia?', answer: 'Yes. Ensdim serves clients across Saudi Arabia including Riyadh, Jeddah, Dammam, and other cities. We operate remotely with Arabic-first communication and delivery.' },
    { question: 'Does Ensdim understand Saudi business culture?', answer: 'Yes. Ensdim has experience working with Saudi healthcare, real estate, professional services, and operations businesses. Our systems are built bilingual (Arabic/English) and culturally aligned to Gulf market expectations.' },
    { question: 'How is Ensdim aligned with Vision 2030?', answer: 'Ensdim\'s core services — AI automation, digital transformation, SaaS development, and operational systems — directly support Saudi Vision 2030 digitization and economic diversification goals for private sector businesses.' },
    { question: 'Can Ensdim integrate with Saudi payment systems?', answer: 'Yes. Ensdim builds SaaS and digital platforms with Saudi payment gateway integrations (Moyasar, PayTabs, etc.) and can comply with Saudi regulatory requirements for digital platforms.' },
    { question: 'What sectors does Ensdim serve in Saudi Arabia?', answer: 'Ensdim serves Saudi clinics and private healthcare, real estate agencies, professional services firms, education and training companies, and operations and contracting businesses.' },
  ],
};

export function AIAgencySaudiPage() {
  return <LocalSEOPage config={config} />;
}
