import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Breadcrumb } from './Breadcrumb';

interface BreadcrumbItem {
  label: string;
  labelAr?: string;
  href: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  variant?: 'dark' | 'light';
  eyebrow?: string;
  breadcrumbs?: BreadcrumbItem[];
  lang?: 'en' | 'ar';
}

export function PageHero({
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  variant = 'dark',
  eyebrow,
  breadcrumbs,
  lang = 'en',
}: PageHeroProps) {
  const isDark = variant === 'dark';

  return (
    <section
      className={`pt-24 pb-14 sm:pt-32 sm:pb-20 relative overflow-hidden ${
        isDark ? 'bg-logo-black text-white' : 'bg-[#FAFAFA] text-[#101418]'
      }`}
    >
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-6">
            <Breadcrumb items={breadcrumbs} lang={lang} />
          </div>
        )}
        {eyebrow && (
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5 uppercase tracking-wider ${
              isDark
                ? 'bg-[#6D5DF6]/15 border border-[#6D5DF6]/20 text-[#EEEAFE]/80'
                : 'bg-[#6D5DF6]/10 text-[#6D5DF6]'
            }`}
          >
            {eyebrow}
          </span>
        )}
        <h1
          className={`text-2xl sm:text-3xl font-bold mb-4 leading-tight ${
            isDark ? 'text-white' : 'text-[#101418]'
          }`}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className={`text-base sm:text-lg max-w-2xl leading-relaxed mb-8 ${
              isDark ? 'text-[#EEEAFE]/75' : 'text-[#4F555E]'
            }`}
          >
            {subtitle}
          </p>
        )}
        {(primaryCTA || secondaryCTA) && (
          <div className="flex flex-wrap gap-3">
            {primaryCTA && (
              <Link
                to={primaryCTA.href}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] transition-colors text-sm font-semibold"
              >
                {primaryCTA.label}
                <ArrowRight size={15} />
              </Link>
            )}
            {secondaryCTA && (
              <Link
                to={secondaryCTA.href}
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border transition-colors text-sm font-semibold ${
                  isDark
                    ? 'border-white/20 text-white/80 hover:border-white/40 hover:text-white'
                    : 'border-[#E5E5E5] text-[#101418] hover:border-[#6D5DF6] hover:text-[#6D5DF6]'
                }`}
              >
                {secondaryCTA.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
