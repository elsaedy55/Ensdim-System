import { createClient } from '@supabase/supabase-js';
import { caseStudies } from '../src/data/caseStudies.ts';

const SITE_URL = 'https://ensdim.com';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

// Every static (non-CMS) page on the site, keyed by its English path.
// Each entry is expanded into an English (`/path`) and Arabic (`/ar/path`)
// pair with reciprocal hreflang alternates. Dynamic content is appended
// below: case studies from src/data/caseStudies.ts, blog posts and
// research articles from Supabase.
const STATIC_PAGES = [
  {
    path: '/',
    lastmod: '2026-06-01',
    changefreq: 'weekly',
    priority: '1.0',
    image: { loc: `${SITE_URL}/og-image.png`, title: 'ENSDIM - AI Automation Agency' },
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

function formatDate(value) {
  if (!value) return '2026-06-01';
  return new Date(value).toISOString().slice(0, 10);
}

async function fetchPublishedSlugs(supabase, table) {
  const { data, error } = await supabase
    .from(table)
    .select('slug, updated_at, published_at')
    .eq('is_published', true);

  if (error) {
    console.error(`Failed to fetch ${table} for sitemap:`, error.message);
    return [];
  }
  return data ?? [];
}

function pathToUrl(prefix, path) {
  if (!path || path === '/') return `${SITE_URL}${prefix}/`;
  return `${SITE_URL}${prefix}${path}`;
}

// Expands a single page definition into an English + Arabic URL pair with
// reciprocal hreflang alternates.
function urlPairsForPage(page) {
  const enLoc = pathToUrl('', page.path);
  const arLoc = pathToUrl('/ar', page.path);

  const hreflang = [
    { lang: 'en', href: enLoc },
    { lang: 'ar', href: arLoc },
    { lang: 'x-default', href: enLoc },
  ];

  const common = {
    lastmod: page.lastmod,
    changefreq: page.changefreq,
    priority: page.priority,
  };

  return [
    { loc: enLoc, ...common, hreflang, image: page.image },
    { loc: arLoc, ...common, hreflang },
  ];
}

function urlToXml(url) {
  let xml = '  <url>\n';
  xml += `    <loc>${url.loc}</loc>\n`;
  xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
  xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
  xml += `    <priority>${url.priority}</priority>\n`;

  if (url.hreflang) {
    for (const { lang, href } of url.hreflang) {
      xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${href}"/>\n`;
    }
  }

  if (url.image) {
    xml += '    <image:image>\n';
    xml += `      <image:loc>${url.image.loc}</image:loc>\n`;
    xml += `      <image:title>${url.image.title}</image:title>\n`;
    xml += '    </image:image>\n';
  }

  xml += '  </url>';
  return xml;
}

export default async function handler(req, res) {
  // Case studies are static content shipped with the site (src/data/caseStudies.ts),
  // not Supabase-backed, so they don't need credentials to appear in the sitemap.
  let dynamicPages = caseStudies
    .filter((study) => study.is_published)
    .map((study) => ({
      path: `/case-studies/${study.slug}`,
      lastmod: formatDate(study.updated_at || study.published_at),
      changefreq: 'monthly',
      priority: '0.6',
    }));

  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey);

    const [blogPosts, researchArticles] = await Promise.all([
      fetchPublishedSlugs(supabase, 'blog_posts'),
      fetchPublishedSlugs(supabase, 'research_articles'),
    ]);

    dynamicPages = [
      ...dynamicPages,
      ...blogPosts.map((post) => ({
        path: `/blog/${post.slug}`,
        lastmod: formatDate(post.updated_at || post.published_at),
        changefreq: 'monthly',
        priority: '0.6',
      })),
      ...researchArticles.map((article) => ({
        path: `/research/${article.slug}`,
        lastmod: formatDate(article.updated_at || article.published_at),
        changefreq: 'monthly',
        priority: '0.6',
      })),
    ];
  } else {
    console.error('Missing Supabase credentials for sitemap generation');
  }

  const allUrls = [...STATIC_PAGES, ...dynamicPages].flatMap(urlPairsForPage);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>

${allUrls.map(urlToXml).join('\n\n')}

</urlset>
`;

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.status(200).send(xml);
}
