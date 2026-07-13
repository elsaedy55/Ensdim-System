import { LocalSEOPage, LocalPageConfig } from '../LocalSEOPage';

const config: LocalPageConfig = {
  slug: 'crm-development-saudi-arabia',
  service: 'CRM Development',
  serviceAr: 'تطوير نظام CRM',
  country: 'Saudi Arabia',
  countryAr: 'المملكة العربية السعودية',
  city: 'Riyadh',
  cityAr: 'الرياض',
  geoRegion: 'SA',
  geoPlacename: 'Riyadh, Saudi Arabia',
  latitude: '24.7136',
  longitude: '46.6753',
  seoTitle: 'CRM Development Saudi Arabia | Ensdim - Custom CRM Riyadh, Jeddah KSA',
  seoDescription: 'Ensdim builds custom CRM systems for Saudi businesses in Riyadh, Jeddah, and KSA — lead management, sales pipelines, customer follow-up, and Arabic-first workflows for Vision 2030 digital goals.',
  seoKeywords: 'CRM development Saudi Arabia, custom CRM Riyadh, CRM system Saudi Arabia, customer management KSA, Arabic CRM Riyadh, CRM agency Saudi Arabia, Jeddah CRM development',
  heroTitle: 'Custom CRM Development in Saudi Arabia — Arabic-First, Built for KSA Businesses',
  heroSubtitle: 'Ensdim builds custom CRM systems for Saudi businesses in Riyadh, Jeddah, and across KSA — designed around your actual customer management process, not generic CRM templates.',
  quickAnswerQ: 'Who builds the best custom CRM systems in Saudi Arabia?',
  quickAnswerA: 'Ensdim builds custom CRM systems for Saudi businesses in Riyadh, Jeddah, and across KSA. Our systems are Arabic-first, WhatsApp-integrated, and built after studying how your Saudi business actually manages leads, follows up with clients, and operates internally — not generic software installed with no customization.',
  benefits: [
    { en: 'Arabic-first CRM interface aligned with Saudi business communication culture', ar: '' },
    { en: 'WhatsApp Business API integration for Saudi customer communication preferences', ar: '' },
    { en: 'Designed for Saudi real estate, healthcare, and professional services sectors', ar: '' },
    { en: 'Vision 2030 digital transformation alignment for Saudi private sector businesses', ar: '' },
    { en: 'Built after diagnosing your actual workflows — no unnecessary features', ar: '' },
    { en: 'Remote delivery with Riyadh and Jeddah business hours support', ar: '' },
  ],
  serviceItems: [
    { title: 'Saudi Real Estate CRM', desc: 'Lead tracking, property management, client follow-up, and commission workflows built for Saudi real estate agencies in Riyadh, Jeddah, and across KSA.' },
    { title: 'Healthcare CRM Saudi Arabia', desc: 'Patient management, appointment follow-up, referral tracking, and Arabic-language interface for Saudi private clinics and medical centers.' },
    { title: 'Sales Pipeline KSA', desc: 'Custom sales pipeline systems built around how Saudi B2B and B2C businesses manage proposals, follow-up, and client relationships.' },
    { title: 'Operations & Internal CRM', desc: 'Internal workflow systems for Saudi contracting, professional services, and operations businesses — task management, client records, and performance tracking.' },
  ],
  faqs: [
    { question: 'Does Ensdim build CRM systems for businesses in Saudi Arabia?', answer: 'Yes. Ensdim builds custom CRM systems for Saudi businesses in Riyadh, Jeddah, Dammam, and across KSA — remotely delivered with Arabic-first design and WhatsApp integration.' },
    { question: 'Is the CRM system available in Arabic for Saudi clients?', answer: 'Yes. All Ensdim CRM systems are built Arabic-first with English as a secondary option. Saudi-specific communication patterns, right-to-left design, and local date formats are all handled natively.' },
    { question: 'Can the CRM integrate with WhatsApp for Saudi customer communication?', answer: 'Yes. Ensdim integrates CRM systems with WhatsApp Business API — the primary communication channel for Saudi customers and businesses.' },
    { question: 'What Saudi sectors does Ensdim build CRM systems for?', answer: 'Ensdim builds CRM systems for Saudi real estate agencies, private medical clinics, professional services firms, education and training companies, and construction and operations businesses.' },
    { question: 'Is this aligned with Vision 2030 digital transformation?', answer: 'Yes. Ensdim\'s CRM and digital systems directly support Saudi Vision 2030 private sector digitization goals — replacing manual processes with intelligent, data-driven customer management systems.' },
  ],
};

export function CRMSaudiPage() {
  return <LocalSEOPage config={config} />;
}
