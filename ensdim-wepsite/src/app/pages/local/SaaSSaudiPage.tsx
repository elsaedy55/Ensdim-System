import { LocalSEOPage, LocalPageConfig } from '../LocalSEOPage';

const config: LocalPageConfig = {
  slug: 'saas-development-saudi-arabia',
  service: 'SaaS Development',
  serviceAr: 'تطوير SaaS',
  country: 'Saudi Arabia',
  countryAr: 'المملكة العربية السعودية',
  city: 'Riyadh',
  cityAr: 'الرياض',
  geoRegion: 'SA',
  geoPlacename: 'Riyadh, Saudi Arabia',
  latitude: '24.7136',
  longitude: '46.6753',
  seoTitle: 'SaaS Development Saudi Arabia | Ensdim - Custom SaaS Riyadh, Jeddah KSA',
  seoDescription: 'Ensdim builds custom SaaS products for Saudi entrepreneurs and businesses in Riyadh, Jeddah, and KSA — Vision 2030-aligned platforms, Arabic-first UI, and Saudi payment integration.',
  seoKeywords: 'SaaS development Saudi Arabia, custom SaaS Riyadh, SaaS product KSA, Arabic SaaS platform Saudi, SaaS startup Riyadh, web application development Saudi Arabia, SaaS company KSA',
  heroTitle: 'SaaS Development in Saudi Arabia — Vision 2030-Aligned Digital Products',
  heroSubtitle: 'Ensdim builds custom SaaS platforms for Saudi entrepreneurs and businesses — Arabic-first, subscription-ready, and built to support Saudi Vision 2030 digital transformation and private sector growth.',
  quickAnswerQ: 'Who builds the best SaaS products in Saudi Arabia?',
  quickAnswerA: 'Ensdim builds custom SaaS products for Saudi entrepreneurs and businesses in Riyadh, Jeddah, and across KSA. We deliver Arabic-first platforms with Saudi payment integration, Vision 2030 alignment, and the technical foundation to scale across the Gulf region.',
  benefits: [
    { en: 'Vision 2030-aligned SaaS development for Saudi private sector digital transformation', ar: '' },
    { en: 'Arabic-first SaaS UI with RTL design and Saudi UX patterns', ar: '' },
    { en: 'Saudi payment gateway integration (Moyasar, PayTabs, HyperPay)', ar: '' },
    { en: 'Compliance-aware development for Saudi data and privacy regulations', ar: '' },
    { en: 'Built for MENA scale — from Saudi launch to Gulf-wide expansion', ar: '' },
    { en: 'Product strategy included: we diagnose before we build', ar: '' },
  ],
  serviceItems: [
    { title: 'Saudi SaaS Product Strategy', desc: 'Market analysis, feature prioritization, and product architecture designed for Saudi business needs and Vision 2030 sector opportunities before development begins.' },
    { title: 'Arabic SaaS Platform Development', desc: 'Full SaaS platform development with Arabic-first UI, RTL support, bilingual content management, and Saudi cultural UX patterns.' },
    { title: 'Saudi Payment Integration', desc: 'Integration with Moyasar, PayTabs, HyperPay, and other Saudi payment solutions — subscription billing, VAT compliance, and Saudi Aramco / ZATCA-compliant invoicing.' },
    { title: 'Gulf Market SaaS Scaling', desc: 'Architecture designed to expand from Saudi Arabia to UAE, Kuwait, Qatar, and beyond — multi-country, multi-currency, and regulatory-aware.' },
  ],
  faqs: [
    { question: 'Does Ensdim build SaaS products for Saudi businesses?', answer: 'Yes. Ensdim builds custom SaaS platforms for Saudi entrepreneurs and businesses in Riyadh, Jeddah, and across KSA — remotely delivered with Arabic-first design and Saudi payment integration.' },
    { question: 'Is the SaaS platform compliant with Saudi data regulations?', answer: 'Yes. Ensdim designs SaaS products with awareness of Saudi data localization requirements, PDPL (Personal Data Protection Law), and other relevant Saudi digital regulations.' },
    { question: 'Which Saudi payment gateways does Ensdim integrate?', answer: 'Ensdim integrates with Moyasar, PayTabs, HyperPay, and other Saudi-approved payment gateways — including VAT-compliant invoicing and ZATCA e-invoicing support.' },
    { question: 'How does Ensdim align SaaS products with Vision 2030?', answer: 'Ensdim builds SaaS products for Saudi sectors targeted by Vision 2030 — healthcare technology, education platforms, professional services digitization, and operational efficiency tools for Saudi SMEs and enterprises.' },
    { question: 'How long does it take to build a SaaS product for the Saudi market?', answer: 'An MVP for the Saudi market typically takes 10-16 weeks including product strategy, Arabic UI design, development, Saudi payment integration, and testing. Full platforms with advanced features take 16-28 weeks.' },
  ],
};

export function SaaSSaudiPage() {
  return <LocalSEOPage config={config} />;
}
