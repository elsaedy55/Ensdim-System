import { Link } from 'react-router';
import { ArrowRight, CheckCircle2, MapPin, Phone, Mail } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { SEO } from '../components/SEO';
import { FAQSection } from '../components/FAQSection';
import { QuickAnswer } from '../components/QuickAnswer';
import { ScrollReveal } from '../components/ScrollReveal';

export interface LocalPageConfig {
  slug: string;
  service: 'AI Agency' | 'CRM Development' | 'SaaS Development';
  serviceAr: string;
  country: 'Egypt' | 'Saudi Arabia' | 'UAE';
  countryAr: string;
  city: string;
  cityAr: string;
  geoRegion: string; // e.g., "EG", "SA", "AE"
  geoPlacename: string;
  latitude: string;
  longitude: string;
  phoneLocal?: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  heroTitle: string;
  heroSubtitle: string;
  quickAnswerQ: string;
  quickAnswerA: string;
  benefits: Array<{ en: string; ar: string }>;
  faqs: Array<{ question: string; answer: string }>;
  serviceItems: Array<{ title: string; desc: string }>;
}

const localBusinessSchema = (config: LocalPageConfig) => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `https://ensdim.com/${config.slug}#localbusiness`,
  name: `ENSDIM - ${config.service} ${config.country}`,
  description: config.seoDescription,
  url: `https://ensdim.com/${config.slug}`,
  telephone: config.phoneLocal || '+201000000000',
  email: 'hello@ensdim.com',
  address: {
    '@type': 'PostalAddress',
    addressCountry: config.geoRegion,
    addressRegion: config.geoPlacename,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: config.latitude,
    longitude: config.longitude,
  },
  areaServed: {
    '@type': 'Country',
    name: config.country,
  },
  parentOrganization: { '@id': 'https://ensdim.com/#organization' },
});

export function LocalSEOPage({ config }: { config: LocalPageConfig }) {
  return (
    <>
      <SEO
        title={config.seoTitle}
        description={config.seoDescription}
        keywords={config.seoKeywords}
        canonical={`/${config.slug}`}
        jsonLd={localBusinessSchema(config)}
      />

      {/* Geo meta injected via SEO component canonical; additional geo tags below */}
      <PageHero
        title={config.heroTitle}
        subtitle={config.heroSubtitle}
        primaryCTA={{ label: 'Book a Free Consultation', href: '/book-consultation' }}
        secondaryCTA={{ label: 'View Services', href: '/services' }}
        breadcrumbs={[
          { label: config.service, href: '/services' },
          { label: config.country, href: `/${config.slug}` },
        ]}
        lang="en"
      />

      <QuickAnswer
        question={config.quickAnswerQ}
        answer={config.quickAnswerA}
      />

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-[#101418] mb-8">
              Why Choose ENSDIM for {config.service} in {config.country}?
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {config.benefits.map((b, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="flex items-start gap-3 p-4 rounded-xl border border-[#E5E5E5] bg-[#FAFAFA]">
                  <CheckCircle2 size={16} className="text-[#6D5DF6] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[#3a3a4a] leading-relaxed">{b.en}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services for this market */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-[#101418] mb-2">
              {config.service} Services in {config.country}
            </h2>
            <p className="text-sm text-[#4F555E] mb-8 max-w-2xl">
              Built around how {config.country} businesses operate — bilingual, market-aware, and results-focused.
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {config.serviceItems.map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="bg-white rounded-xl border border-[#E5E5E5] p-5">
                  <h3 className="text-base font-bold text-[#101418] mb-2">{s.title}</h3>
                  <p className="text-sm text-[#4F555E] leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Local contact / trust */}
      <section className="py-14 bg-white border-y border-[#E5E5E5]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-xl font-bold text-[#101418] mb-6">
              Working with Businesses in {config.country}
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-[#6D5DF6] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-[#101418] mb-0.5">Location</p>
                <p className="text-xs text-[#4F555E]">{config.geoPlacename}, {config.country}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail size={16} className="text-[#6D5DF6] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-[#101418] mb-0.5">Email</p>
                <p className="text-xs text-[#4F555E]">hello@ensdim.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={16} className="text-[#6D5DF6] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-[#101418] mb-0.5">Languages</p>
                <p className="text-xs text-[#4F555E]">English & Arabic</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        title={`Frequently Asked Questions — ${config.service} in ${config.country}`}
        faqs={config.faqs}
      />

      {/* CTA */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-[#EEEAFE] border border-[#DDD8FB] rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl font-bold text-[#101418] mb-3">
            Ready to start your {config.service} project in {config.country}?
          </h2>
          <p className="text-sm text-[#4F555E] mb-6 max-w-xl mx-auto">
            Book a free consultation. We&apos;ll understand your business first, then build the right system around it.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/book-consultation"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
            >
              Book Free Consultation
              <ArrowRight size={15} />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-[#6D5DF6]/30 text-[#3B2A78] rounded-xl hover:border-[#6D5DF6] hover:bg-white active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
            >
              View All Services
            </Link>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
