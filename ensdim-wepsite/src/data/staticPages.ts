export interface StaticPageImage {
  loc: string;
  title: string;
}

export interface StaticPage {
  path: string;
  lastmod: string;
  changefreq: string;
  priority: string;
  image?: StaticPageImage;
}

const SITE_URL = 'https://ensdim.com';

// Every static (non-CMS) page on the site, keyed by its English path.
// Shared between api/sitemap.js (sitemap.xml generation) and
// scripts/prerender.ts (build-time HTML snapshotting) so the two never
// drift apart. Dynamic content (case studies, blog posts, research
// articles) is enumerated separately by each consumer.
export const STATIC_PAGES: StaticPage[] = [
  {
    path: '/',
    lastmod: '2026-06-01',
    changefreq: 'weekly',
    priority: '1.0',
    image: { loc: `${SITE_URL}/og-image.png`, title: 'Ensdim - AI Automation Agency' },
  },
  { path: '/about', lastmod: '2026-06-01', changefreq: 'monthly', priority: '0.8' },
  { path: '/company', lastmod: '2026-06-01', changefreq: 'monthly', priority: '0.7' },
  { path: '/contact', lastmod: '2026-06-01', changefreq: 'monthly', priority: '0.9' },
  { path: '/book-consultation', lastmod: '2026-06-01', changefreq: 'monthly', priority: '0.9' },
  { path: '/team', lastmod: '2026-06-01', changefreq: 'monthly', priority: '0.6' },
  { path: '/partners', lastmod: '2026-06-01', changefreq: 'monthly', priority: '0.5' },

  // Solutions
  { path: '/solutions', lastmod: '2026-06-01', changefreq: 'monthly', priority: '0.9' },
  { path: '/solutions/customer-journey-systems', lastmod: '2026-06-01', changefreq: 'monthly', priority: '0.8' },
  { path: '/solutions/digital-experiences', lastmod: '2026-06-01', changefreq: 'monthly', priority: '0.8' },
  { path: '/solutions/follow-up-systems', lastmod: '2026-06-01', changefreq: 'monthly', priority: '0.8' },
  { path: '/solutions/visibility-insights', lastmod: '2026-06-01', changefreq: 'monthly', priority: '0.8' },
  { path: '/solutions/automation-layers', lastmod: '2026-06-01', changefreq: 'monthly', priority: '0.8' },
  { path: '/solutions/ai-practical-decisions', lastmod: '2026-06-01', changefreq: 'monthly', priority: '0.8' },
  { path: '/solutions/build', lastmod: '2026-06-01', changefreq: 'monthly', priority: '0.7' },
  { path: '/solutions/start', lastmod: '2026-06-01', changefreq: 'monthly', priority: '0.7' },
  { path: '/solutions/growth', lastmod: '2026-06-01', changefreq: 'monthly', priority: '0.7' },
  { path: '/solutions/problems', lastmod: '2026-06-01', changefreq: 'monthly', priority: '0.6' },

  // Services
  { path: '/services', lastmod: '2026-06-01', changefreq: 'monthly', priority: '0.9' },
  { path: '/services/web-design-digital-experience', lastmod: '2026-06-01', changefreq: 'monthly', priority: '0.8' },
  { path: '/services/crm-internal-systems', lastmod: '2026-06-01', changefreq: 'monthly', priority: '0.8' },
  { path: '/services/ai-chatbots-automation', lastmod: '2026-06-01', changefreq: 'monthly', priority: '0.8' },
  { path: '/services/data-dashboards', lastmod: '2026-06-01', changefreq: 'monthly', priority: '0.8' },
  { path: '/services/mobile-web-applications', lastmod: '2026-06-01', changefreq: 'monthly', priority: '0.8' },
  { path: '/services/growth-marketing-systems', lastmod: '2026-06-01', changefreq: 'monthly', priority: '0.8' },
  { path: '/services/management-data-chatbot', lastmod: '2026-06-01', changefreq: 'monthly', priority: '0.7' },

  // Products
  { path: '/products', lastmod: '2026-06-01', changefreq: 'monthly', priority: '0.8' },
  { path: '/products/clinics-workspace', lastmod: '2026-06-01', changefreq: 'monthly', priority: '0.7' },
  { path: '/products/real-estate-flow', lastmod: '2026-06-01', changefreq: 'monthly', priority: '0.7' },
  { path: '/products/operations-workspace', lastmod: '2026-06-01', changefreq: 'monthly', priority: '0.7' },

  // Resources
  { path: '/resources', lastmod: '2026-06-01', changefreq: 'weekly', priority: '0.7' },
  { path: '/research', lastmod: '2026-06-01', changefreq: 'monthly', priority: '0.7' },
  { path: '/case-studies', lastmod: '2026-06-01', changefreq: 'monthly', priority: '0.8' },
  { path: '/blog', lastmod: '2026-06-01', changefreq: 'weekly', priority: '0.8' },

  // Careers
  { path: '/careers', lastmod: '2026-06-01', changefreq: 'weekly', priority: '0.6' },

  // Legal
  { path: '/privacy', lastmod: '2026-01-01', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms-of-service', lastmod: '2026-01-01', changefreq: 'yearly', priority: '0.3' },

  // Local SEO landing pages
  { path: '/ai-agency-egypt', lastmod: '2026-06-06', changefreq: 'monthly', priority: '0.9' },
  { path: '/ai-agency-saudi-arabia', lastmod: '2026-06-06', changefreq: 'monthly', priority: '0.9' },
  { path: '/ai-agency-uae', lastmod: '2026-06-06', changefreq: 'monthly', priority: '0.9' },
  { path: '/crm-development-egypt', lastmod: '2026-06-06', changefreq: 'monthly', priority: '0.9' },
  { path: '/crm-development-saudi-arabia', lastmod: '2026-06-06', changefreq: 'monthly', priority: '0.9' },
  { path: '/crm-development-uae', lastmod: '2026-06-06', changefreq: 'monthly', priority: '0.9' },
  { path: '/saas-development-egypt', lastmod: '2026-06-06', changefreq: 'monthly', priority: '0.9' },
  { path: '/saas-development-saudi-arabia', lastmod: '2026-06-06', changefreq: 'monthly', priority: '0.9' },
  { path: '/saas-development-uae', lastmod: '2026-06-06', changefreq: 'monthly', priority: '0.9' },
];
