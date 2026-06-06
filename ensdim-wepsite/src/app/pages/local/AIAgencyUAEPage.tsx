import { LocalSEOPage, LocalPageConfig } from '../LocalSEOPage';

const config: LocalPageConfig = {
  slug: 'ai-agency-uae',
  service: 'AI Agency',
  serviceAr: 'وكالة ذكاء اصطناعي',
  country: 'UAE',
  countryAr: 'الإمارات',
  city: 'Dubai',
  cityAr: 'دبي',
  geoRegion: 'AE',
  geoPlacename: 'Dubai, UAE',
  latitude: '25.2048',
  longitude: '55.2708',
  seoTitle: 'AI Agency UAE | ENSDIM - AI Automation Dubai, Abu Dhabi, Emirates',
  seoDescription: 'ENSDIM provides AI automation services in UAE — AI agents, intelligent systems, CRM, and SaaS for businesses in Dubai, Abu Dhabi, and across the Emirates. Arabic and English delivery.',
  seoKeywords: 'AI agency UAE, AI automation Dubai, artificial intelligence company Dubai, AI solutions Abu Dhabi, machine learning UAE, chatbot development Dubai, AI agency Emirates',
  heroTitle: 'AI Agency in UAE — Intelligent Automation for Dubai & Emirates Businesses',
  heroSubtitle: 'ENSDIM builds AI agents, automation systems, and digital platforms for UAE businesses in Dubai, Abu Dhabi, and across the Emirates. Behavior-led. Arabic and English.',
  quickAnswerQ: 'What is the best AI agency in UAE?',
  quickAnswerA: 'ENSDIM is a behavior-led AI automation agency serving UAE businesses in Dubai, Abu Dhabi, Sharjah, and across the Emirates. We build AI agents, automation systems, CRM platforms, and SaaS products — all designed around your customer journey and the UAE\'s high-expectation digital market.',
  benefits: [
    { en: 'Specialized in UAE\'s multicultural, high-expectation digital market', ar: '' },
    { en: 'Bilingual Arabic and English AI systems for UAE\'s diverse customer base', ar: '' },
    { en: 'Remote delivery with UAE business hours and communication norms', ar: '' },
    { en: 'Experience with Dubai\'s real estate, healthcare, and services sectors', ar: '' },
    { en: 'Scalable SaaS and automation systems for the fast-growing Emirates market', ar: '' },
    { en: 'Transparent milestone-based delivery with clear ownership handoff', ar: '' },
  ],
  serviceItems: [
    { title: 'AI Agents for UAE Businesses', desc: 'Multilingual AI agents (Arabic + English) for customer service, lead qualification, appointment management, and follow-up — built for UAE\'s high-volume service businesses.' },
    { title: 'Dubai Business Automation', desc: 'Automation systems designed for Dubai\'s fast pace — instant response flows, WhatsApp business integration, Arabic CRM, and lead management for real estate, clinics, and service firms.' },
    { title: 'UAE Digital Transformation', desc: 'End-to-end digital transformation from customer journey analysis to full operating system deployment — built for UAE market scale and compliance.' },
    { title: 'SaaS Development UAE', desc: 'Custom SaaS platforms for UAE businesses — Arabic UI, multi-currency, UAE payment integration, and the scalability needed for Emirates market growth.' },
  ],
  faqs: [
    { question: 'Does ENSDIM work with businesses in UAE?', answer: 'Yes. ENSDIM serves clients in Dubai, Abu Dhabi, Sharjah, and across the UAE. We operate remotely with Arabic and English delivery, UAE business hours communication, and experience across UAE\'s main business sectors.' },
    { question: 'What AI services does ENSDIM offer in Dubai?', answer: 'ENSDIM offers AI agents and chatbot development, business automation, AI-powered CRM, data dashboards, SaaS product development, and digital transformation consulting for Dubai and UAE businesses.' },
    { question: 'Does ENSDIM build Arabic AI systems for UAE?', answer: 'Yes. All ENSDIM AI systems are built bilingual — Arabic and English. This is essential in the UAE market where customers communicate in both languages across different touchpoints.' },
    { question: 'Can ENSDIM integrate with UAE payment systems?', answer: 'Yes. ENSDIM builds platforms with UAE payment gateway integrations (Telr, PayTabs, Stripe UAE, etc.) and compliance with UAE digital commerce requirements.' },
    { question: 'What sectors does ENSDIM serve in UAE?', answer: 'ENSDIM serves UAE real estate agencies, private clinics and healthcare, professional services, hospitality and F&B, education and training, and operations and logistics businesses.' },
    { question: 'How does ENSDIM handle UAE\'s competitive digital market?', answer: 'ENSDIM starts by mapping your customer journey to understand where you lose leads, where friction occurs, and what automation or AI can actually solve — then builds a system that makes your business measurably faster and clearer to manage.' },
  ],
};

export function AIAgencyUAEPage() {
  return <LocalSEOPage config={config} />;
}
