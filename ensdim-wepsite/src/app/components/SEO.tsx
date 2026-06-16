import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../../contexts/LanguageContext';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
  lang?: 'en' | 'ar';
  noIndex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SITE_URL = 'https://ensdim.com';
const SITE_NAME = 'ENSDIM';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
const TWITTER_HANDLE = '@ensdim';

function buildUrl(prefix: string, path: string): string {
  if (!path || path === '/') return `${SITE_URL}${prefix}/`;
  return `${SITE_URL}${prefix}${path}`;
}

export function SEO({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  lang,
  noIndex = false,
  jsonLd,
}: SEOProps) {
  const { language } = useLanguage();
  const resolvedLang = lang ?? language;
  const path = canonical || '/';

  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const resolvedCanonical = buildUrl(resolvedLang === 'ar' ? '/ar' : '', path);
  const enUrl = buildUrl('', path);
  const arUrl = buildUrl('/ar', path);
  const resolvedOgTitle = ogTitle || title;
  const resolvedOgDescription = ogDescription || description;

  const schemas = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  return (
    <Helmet>
      <html lang={resolvedLang} dir={resolvedLang === 'ar' ? 'rtl' : 'ltr'} />

      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta
        name="robots"
        content={
          noIndex
            ? 'noindex, nofollow'
            : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
        }
      />
      <link rel="canonical" href={resolvedCanonical} />

      {/* hreflang */}
      <link rel="alternate" hreflang="en" href={enUrl} />
      <link rel="alternate" hreflang="ar" href={arUrl} />
      <link rel="alternate" hreflang="x-default" href={enUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={resolvedOgTitle} />
      <meta property="og:description" content={resolvedOgDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={resolvedOgTitle} />
      <meta property="og:url" content={resolvedCanonical} />
      <meta property="og:locale" content={resolvedLang === 'ar' ? 'ar_SA' : 'en_US'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={resolvedOgTitle} />
      <meta name="twitter:description" content={resolvedOgDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={resolvedOgTitle} />

      {/* JSON-LD Structured Data */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
