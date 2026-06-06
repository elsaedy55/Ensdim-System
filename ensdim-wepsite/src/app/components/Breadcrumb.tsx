import { Link, useLocation } from 'react-router';
import { ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface BreadcrumbItem {
  label: string;
  labelAr?: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  lang?: 'en' | 'ar';
  className?: string;
}

const SITE_URL = 'https://ensdim.com';

export function Breadcrumb({ items, lang = 'en', className = '' }: BreadcrumbProps) {
  const ar = lang === 'ar';
  const allItems = [
    { label: 'Home', labelAr: 'الرئيسية', href: '/' },
    ...items,
  ];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: ar ? (item.labelAr || item.label) : item.label,
      item: `${SITE_URL}${item.href}`,
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center flex-wrap gap-1 text-xs text-white/50 ${className}`}
      >
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          const label = ar ? (item.labelAr || item.label) : item.label;

          return (
            <span key={item.href} className="flex items-center gap-1">
              {index > 0 && (
                <ChevronRight
                  size={11}
                  className={`opacity-40 flex-shrink-0 ${ar ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              )}
              {isLast ? (
                <span className="text-white/70 font-medium" aria-current="page">
                  {label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="hover:text-white/80 transition-colors"
                >
                  {label}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}
