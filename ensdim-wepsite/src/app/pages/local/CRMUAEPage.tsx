import { LocalSEOPage, LocalPageConfig } from '../LocalSEOPage';

const config: LocalPageConfig = {
  slug: 'crm-development-uae',
  service: 'CRM Development',
  serviceAr: 'تطوير نظام CRM',
  country: 'UAE',
  countryAr: 'الإمارات',
  city: 'Dubai',
  cityAr: 'دبي',
  geoRegion: 'AE',
  geoPlacename: 'Dubai, UAE',
  latitude: '25.2048',
  longitude: '55.2708',
  seoTitle: 'CRM Development UAE | ENSDIM - Custom CRM Systems Dubai, Abu Dhabi',
  seoDescription: 'ENSDIM builds custom CRM systems for UAE businesses in Dubai, Abu Dhabi, and the Emirates — lead management, sales pipelines, customer follow-up, and multilingual Arabic/English workflows.',
  seoKeywords: 'CRM development UAE, custom CRM Dubai, CRM system Dubai, customer management software UAE, Arabic CRM Dubai, CRM agency Dubai, Abu Dhabi CRM development',
  heroTitle: 'Custom CRM Development in UAE — Built for Dubai\'s Fast-Paced Business Environment',
  heroSubtitle: 'ENSDIM builds custom CRM systems for UAE businesses in Dubai, Abu Dhabi, and across the Emirates — multilingual, WhatsApp-integrated, and designed around your actual customer management needs.',
  quickAnswerQ: 'Who builds the best custom CRM systems in UAE?',
  quickAnswerA: 'ENSDIM builds custom CRM systems for UAE businesses in Dubai, Abu Dhabi, Sharjah, and across the Emirates. Our systems handle Arabic and English, integrate with WhatsApp Business, and are built after studying how your Dubai or UAE business actually manages leads, clients, and operations — not generic software.',
  benefits: [
    { en: 'Multilingual CRM (Arabic + English) for UAE\'s diverse business environment', ar: '' },
    { en: 'WhatsApp Business API integration for UAE customer communication', ar: '' },
    { en: 'Built for Dubai\'s high-velocity real estate, healthcare, and services sectors', ar: '' },
    { en: 'UAE-compliant data handling and security standards', ar: '' },
    { en: 'Scalable architecture for UAE market growth and multi-branch operations', ar: '' },
    { en: 'Remote delivery with Dubai business hours and timezone alignment', ar: '' },
  ],
  serviceItems: [
    { title: 'Dubai Real Estate CRM', desc: 'Lead management, property tracking, broker performance, and client follow-up workflows built for Dubai\'s competitive and high-volume real estate market.' },
    { title: 'UAE Healthcare CRM', desc: 'Patient management, multilingual appointment systems, referral tracking, and clinical workflow management for Dubai and Abu Dhabi private healthcare providers.' },
    { title: 'Multi-Branch CRM UAE', desc: 'CRM systems designed for UAE businesses with multiple branches or locations — consolidated reporting, unified lead management, and cross-location visibility.' },
    { title: 'Professional Services CRM', desc: 'Client relationship management for Dubai legal, consulting, finance, and professional services firms — proposal tracking, billing integration, and client portals.' },
  ],
  faqs: [
    { question: 'Does ENSDIM build CRM systems for businesses in UAE?', answer: 'Yes. ENSDIM builds custom CRM systems for UAE businesses in Dubai, Abu Dhabi, Sharjah, and across the Emirates — delivered remotely with Arabic and English support.' },
    { question: 'Does the CRM support both Arabic and English for UAE clients?', answer: 'Yes. All ENSDIM CRM systems are built multilingual — Arabic and English — to serve UAE\'s diverse customer base and multicultural team environments.' },
    { question: 'Can ENSDIM integrate the CRM with WhatsApp Business for UAE?', answer: 'Yes. WhatsApp Business API integration is a standard feature in ENSDIM CRM systems — essential for UAE\'s WhatsApp-first customer communication culture.' },
    { question: 'What Dubai sectors does ENSDIM build CRM systems for?', answer: 'ENSDIM builds CRM systems for Dubai real estate agencies, private clinics and hospitals, professional services firms, hospitality businesses, education providers, and operations companies.' },
    { question: 'How long does it take to build a custom CRM for a UAE business?', answer: 'A focused CRM for one workflow (e.g., lead management for a Dubai real estate agency) typically takes 4-8 weeks. A full-scale CRM with multiple modules and UAE integrations takes 8-14 weeks.' },
  ],
};

export function CRMUAEPage() {
  return <LocalSEOPage config={config} />;
}
