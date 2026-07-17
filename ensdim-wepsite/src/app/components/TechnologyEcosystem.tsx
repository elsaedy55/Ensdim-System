import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from './ScrollReveal';

interface TechPartner {
  name: string;
  logo: string;
  category: string;
  bgColor: string;
}

const techPartners: TechPartner[] = [
  { name: 'Microsoft Azure', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg', category: 'Cloud', bgColor: '#F4F9FF' },
  { name: 'AWS', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg', category: 'Cloud', bgColor: '#FFF9F0' },
  { name: 'Google Cloud', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg', category: 'Cloud', bgColor: '#F5F9FF' },
  { name: 'OpenAI', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg', category: 'AI', bgColor: '#F0FFF9' },
  { name: 'GitHub', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg', category: 'Dev', bgColor: '#FAFAFA' },
  { name: 'Cloudflare', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Cloudflare_Logo.png', category: 'Infrastructure', bgColor: '#FFF8F0' },
  { name: 'Vercel', logo: 'https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png', category: 'Deploy', bgColor: '#FAFAFA' },
  { name: 'Anthropic', logo: 'https://www.anthropic.com/images/icons/apple-touch-icon.png', category: 'AI', bgColor: '#FFF9F5' },
  { name: 'n8n', logo: 'https://n8n.io/favicon.ico', category: 'Automation', bgColor: '#FFF5F5' },
  { name: 'LangChain', logo: 'https://avatars.githubusercontent.com/u/126733545?s=200&v=4', category: 'AI', bgColor: '#F5F9F5' },
];

export function TechnologyEcosystem() {
  const { t } = useLanguage();
  const quadrupled = [...techPartners, ...techPartners, ...techPartners, ...techPartners];

  return (
    <section className="py-20 sm:py-24 bg-[#FAFAFA] overflow-hidden">
      <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-2">
          {t('technology.title')}
        </h2>
        <p className="text-sm text-[#4F555E] max-w-xl mx-auto">
          {t('technology.description')}
        </p>
      </ScrollReveal>

      <div className="relative" dir="ltr">
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div
          className="flex gap-4 items-center"
          style={{
            animation: 'tech-scroll 60s linear infinite',
            width: 'max-content',
            direction: 'ltr',
          }}
        >
          {quadrupled.map((partner, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center gap-3 px-5 py-3 rounded-xl border border-[#E5E5E5] hover:border-[#6D5DF6]/30 hover:shadow-md transition-all duration-300 group cursor-default"
              style={{ backgroundColor: partner.bgColor }}
            >
              <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 bg-white rounded-lg p-1">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback to text if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[#101418] whitespace-nowrap leading-tight">
                  {partner.name}
                </span>
                <span className="text-[10px] text-[#4F555E]/60 whitespace-nowrap leading-tight">
                  {partner.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 text-center">
        <p className="text-sm text-[#4F555E] mb-2">
          {t('technology.footerLine')}
        </p>
        <p className="text-xs text-[#4F555E]/40">
          Platforms and technologies we work with — not an official partnership or endorsement.
        </p>
      </div>

      <style>{`
        @keyframes tech-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-25%); }
        }
      `}</style>
    </section>
  );
}
