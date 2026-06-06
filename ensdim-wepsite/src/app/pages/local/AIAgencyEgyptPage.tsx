import { LocalSEOPage, LocalPageConfig } from '../LocalSEOPage';

const config: LocalPageConfig = {
  slug: 'ai-agency-egypt',
  service: 'AI Agency',
  serviceAr: 'وكالة ذكاء اصطناعي',
  country: 'Egypt',
  countryAr: 'مصر',
  city: 'Cairo',
  cityAr: 'القاهرة',
  geoRegion: 'EG',
  geoPlacename: 'Cairo, Egypt',
  latitude: '30.0444',
  longitude: '31.2357',
  seoTitle: 'AI Agency Egypt | ENSDIM - AI Automation & Digital Transformation Cairo',
  seoDescription: 'ENSDIM is Egypt\'s leading AI automation agency. We build AI agents, automation systems, and digital transformation solutions for businesses in Cairo, Alexandria, and across Egypt.',
  seoKeywords: 'AI agency Egypt, AI automation Egypt, artificial intelligence agency Cairo, AI solutions Egypt, machine learning agency Egypt, chatbot development Egypt, AI company Cairo',
  heroTitle: 'AI Agency in Egypt — Behavior-Led Automation That Works',
  heroSubtitle: 'ENSDIM builds AI agents, automation systems, and digital transformation solutions for Egyptian businesses. Strategy first. Technology around how you actually operate.',
  quickAnswerQ: 'What is the best AI agency in Egypt?',
  quickAnswerA: 'ENSDIM is Egypt\'s behavior-led AI automation agency, headquartered in Cairo. We build AI agents, intelligent automation, CRM systems, and SaaS products for businesses in Egypt, Saudi Arabia, UAE, and the Gulf. Our approach: diagnose operations first, then build technology around real business behavior.',
  benefits: [
    { en: 'Headquartered in Egypt — Cairo-based team with deep local market knowledge', ar: '' },
    { en: 'Bilingual delivery in Arabic and English for Egyptian and Gulf clients', ar: '' },
    { en: 'Behavior-led approach: we study your operations before building any AI system', ar: '' },
    { en: 'Proven results for Egyptian clinics, real estate agencies, and service businesses', ar: '' },
    { en: 'Affordable AI solutions designed for Egypt\'s business scale and budget', ar: '' },
    { en: 'Full-cycle support: from diagnosis to deployment to ongoing improvement', ar: '' },
  ],
  serviceItems: [
    { title: 'AI Agents & Chatbots', desc: 'Intelligent agents that handle customer inquiries, qualify leads, and manage follow-up automatically — in Arabic and English.' },
    { title: 'Business Automation', desc: 'Automated workflows for lead management, appointment booking, reminders, and operational processes specific to Egyptian market patterns.' },
    { title: 'AI-Powered CRM', desc: 'Customer relationship systems with AI layers for follow-up, scoring, and decision support — built for how Egyptian service businesses operate.' },
    { title: 'Data Intelligence', desc: 'Real-time dashboards and AI-driven insights that give Egyptian business owners visibility into performance, pipeline, and customer behavior.' },
  ],
  faqs: [
    { question: 'Is ENSDIM based in Egypt?', answer: 'Yes. ENSDIM is headquartered in Egypt with a Cairo-based team. We serve clients across Egypt and remotely across Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, and Oman.' },
    { question: 'What AI services does ENSDIM provide in Egypt?', answer: 'ENSDIM provides AI agents and chatbot development, business automation, AI-powered CRM systems, data dashboards, SaaS product development, and digital transformation consulting for businesses across Egypt.' },
    { question: 'Does ENSDIM work in Arabic for Egyptian clients?', answer: 'Yes. All ENSDIM systems are built bilingual — Arabic and English. Our Cairo team communicates and delivers in Arabic, and all customer-facing systems support Arabic by default.' },
    { question: 'How much does AI automation cost in Egypt?', answer: 'AI automation project costs vary based on scope. ENSDIM starts with a free consultation to understand your operations, then provides a transparent proposal. We build for Egyptian market scale — not enterprise pricing.' },
    { question: 'What types of Egyptian businesses does ENSDIM work with?', answer: 'ENSDIM works with Egyptian clinics and healthcare centers, real estate agencies, professional services, education and training companies, retail businesses, and operations and contracting firms.' },
    { question: 'How do I get started with ENSDIM in Egypt?', answer: 'Book a free consultation at ensdim.com/book-consultation. Our Cairo team will schedule a focused session to understand your business, identify the right AI solution, and propose a clear plan.' },
  ],
};

export function AIAgencyEgyptPage() {
  return <LocalSEOPage config={config} />;
}
