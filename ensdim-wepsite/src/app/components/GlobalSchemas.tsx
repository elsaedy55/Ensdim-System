import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://ensdim.com';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Ensdim',
  alternateName: ['إنسديم', 'Ensdim Agency'],
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/ensdim-logo.png`,
    width: 200,
    height: 60,
  },
  description:
    'Ensdim is an AI automation agency that builds AI agents, automation systems, CRM platforms, SaaS products, and digital transformation solutions for businesses in Egypt, Saudi Arabia, UAE, and the Gulf region.',
  foundingDate: '2026',
  founders: [{ '@type': 'Person', name: 'Ensdim Team' }],
  areaServed: [
    { '@type': 'Country', name: 'Egypt' },
    { '@type': 'Country', name: 'Saudi Arabia' },
    { '@type': 'Country', name: 'United Arab Emirates' },
    { '@type': 'Country', name: 'Kuwait' },
    { '@type': 'Country', name: 'Qatar' },
    { '@type': 'Country', name: 'Bahrain' },
    { '@type': 'Country', name: 'Oman' },
  ],
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: { '@type': 'GeoCoordinates', latitude: 26.82, longitude: 30.8 },
    geoRadius: '3000000',
  },
  knowsAbout: [
    'AI Automation',
    'Artificial Intelligence',
    'CRM Development',
    'SaaS Development',
    'Business Process Automation',
    'Digital Transformation',
    'AI Agents',
    'Customer Journey Optimization',
    'Behavior-Led Business Systems',
  ],
  sameAs: [
    'https://www.linkedin.com/company/ensdim',
    'https://twitter.com/ensdim',
    'https://www.instagram.com/ensdim',
    'https://www.facebook.com/ensdim',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English', 'Arabic'],
      url: `${SITE_URL}/contact`,
    },
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      availableLanguage: ['English', 'Arabic'],
      url: `${SITE_URL}/book-consultation`,
    },
  ],
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#localbusiness`,
  name: 'Ensdim',
  description:
    'AI automation agency specializing in AI agents, CRM systems, SaaS platforms, and business automation for companies in Egypt, Saudi Arabia, and UAE.',
  url: SITE_URL,
  logo: `${SITE_URL}/ensdim-logo.png`,
  image: `${SITE_URL}/og-image.png`,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'EG',
    addressRegion: 'Cairo',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 30.0444,
    longitude: 31.2357,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    opens: '09:00',
    closes: '18:00',
  },
  priceRange: '$$',
  currenciesAccepted: 'EGP, SAR, AED, USD',
  paymentAccepted: 'Bank Transfer, Credit Card',
  hasMap: 'https://maps.google.com/?q=Cairo,Egypt',
  serviceArea: [
    { '@type': 'Country', name: 'Egypt' },
    { '@type': 'Country', name: 'Saudi Arabia' },
    { '@type': 'Country', name: 'United Arab Emirates' },
    { '@type': 'Country', name: 'Kuwait' },
    { '@type': 'Country', name: 'Qatar' },
  ],
  makesOffer: [
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'AI Automation Development',
        description: 'Custom AI automation systems for business operations',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'CRM Development',
        description: 'Custom CRM platforms for lead management and customer follow-up',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'SaaS Development',
        description: 'Custom SaaS platforms and internal business tools',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'AI Agent Development',
        description: 'Intelligent AI agents for customer service and operations',
      },
    },
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'Ensdim',
  url: SITE_URL,
  description:
    'Ensdim - AI Automation Agency helping businesses in Egypt, Saudi Arabia, and UAE build AI agents, automation systems, CRM platforms, and digital transformation solutions.',
  inLanguage: ['en', 'ar'],
  publisher: { '@id': `${SITE_URL}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export function GlobalSchemas() {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
    </Helmet>
  );
}
