import { useState } from 'react';
import { Link } from 'react-router';
import { ChevronDown, ArrowUp } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { EnsdimWordmark } from './EnsdimWordmark';

export function Footer() {
  const { t, language } = useLanguage();
  const ar = language === 'ar';
  const [openSection, setOpenSection] = useState<string | null>(null);

  const footerSections = [
    {
      title: ar ? 'الشركة' : 'Company',
      links: [
        { label: ar ? 'عن إنسديم' : 'About', href: '/about' },
        { label: ar ? 'الفريق' : 'Team', href: '/team' },
        { label: ar ? 'تواصل معنا' : 'Contact', href: '/contact' },
      ],
    },
    {
      title: ar ? 'الحلول' : 'Solutions',
      links: [
        { label: ar ? 'البناء' : 'Build', href: '/solutions/build' },
        { label: ar ? 'الانطلاق' : 'Start', href: '/solutions/start' },
        { label: ar ? 'النمو' : 'Growth', href: '/solutions/growth' },
      ],
    },
    {
      title: ar ? 'الخدمات' : 'Services',
      links: [
        { label: ar ? 'تصميم وتطوير المواقع' : 'Web Design & Development', href: '/services/web-design-digital-experience' },
        { label: ar ? 'روبوتات الدردشة والأتمتة' : 'AI Chatbots & Automation', href: '/services/ai-chatbots-automation' },
        { label: ar ? 'البيانات ولوحات المتابعة' : 'Data & Dashboards', href: '/services/data-dashboards' },
      ],
    },
    {
      title: ar ? 'المنتجات' : 'Products',
      links: [
        { label: ar ? 'مساحة العمل للعيادات' : 'Clinics Workspace', href: '/products/clinics-workspace' },
        { label: ar ? 'نظام العقارات' : 'Real Estate Flow', href: '/products/real-estate-flow' },
        { label: ar ? 'مساحة التشغيل' : 'Operations Workspace', href: '/products/operations-workspace' },
      ],
    },
    {
      title: ar ? 'الموارد' : 'Resources',
      links: [
        { label: ar ? 'الأبحاث' : 'Research', href: '/research' },
        { label: ar ? 'دراسات الحالة' : 'Case Studies', href: '/case-studies' },
        { label: ar ? 'الوظائف' : 'Careers', href: '/careers' },
        { label: ar ? 'المدونة' : 'Blog', href: '/blog' },
      ],
    },
    {
      title: ar ? 'مساحة العميل' : 'Client Workspace',
      links: [
        { label: ar ? 'تسجيل الدخول' : 'Client Login', href: 'https://app.ensdim.com/login', external: true },
        { label: ar ? 'إنشاء حساب' : 'Create Account', href: 'https://app.ensdim.com/register', external: true },
      ],
    },
  ];

  return (
    <footer className="bg-[#101418] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-10 sm:py-16">

        {/* Brand row — always visible */}
        <div className="mb-8 sm:mb-12">
          {/* Desktop: Logo and tagline side by side */}
          <div className="hidden sm:flex items-center gap-4 no-mirror">
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:opacity-80 active:scale-95 transition-all flex-shrink-0">
              <EnsdimWordmark variant="light" className="text-3xl" />
            </Link>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label={ar ? 'العودة لأعلى الصفحة' : 'Back to top'}
              className="flex-shrink-0 w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 active:scale-90 transition-all"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
            <div className="w-px h-10 bg-white/15" />
            <p className="text-[#EEEAFE]/65 text-sm leading-relaxed max-w-md">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Mobile: Logo and Client Login on same line */}
          <div className="sm:hidden flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 no-mirror">
              <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:opacity-80 active:scale-95 transition-all flex-shrink-0">
                <EnsdimWordmark variant="light" className="text-2xl" />
              </Link>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label={ar ? 'العودة لأعلى الصفحة' : 'Back to top'}
                className="flex-shrink-0 w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 active:scale-90 transition-all"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
            <a href="https://app.ensdim.com/login" className="text-sm px-5 py-2.5 border border-white/20 text-white/80 rounded-lg hover:bg-white/5 hover:border-white/30 active:scale-95 transition-all font-medium whitespace-nowrap">
              {ar ? 'دخول العميل' : 'Client Login'}
            </a>
          </div>

          {/* Mobile: Tagline below */}
          <p className="sm:hidden text-[#EEEAFE]/65 text-xs leading-relaxed max-w-[220px] no-mirror">
            {t('footer.tagline')}
          </p>
        </div>

        {/* Desktop grid */}
        <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-3 text-white text-xs uppercase tracking-wider opacity-50">{section.title}</h4>
              <ul className="space-y-1.5">
                {section.links.map((link) => (
                  <li key={link.label + link.href}>
                    {link.external ? (
                      <a href={link.href} className="inline-block text-[#EEEAFE]/65 text-xs hover:text-[#6D5DF6] active:scale-95 transition-all leading-relaxed">
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.href} className="inline-block text-[#EEEAFE]/65 text-xs hover:text-[#6D5DF6] active:scale-95 transition-all leading-relaxed">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile accordion */}
        <div className="sm:hidden border-t border-white/10">
          {footerSections.map((section) => {
            const isOpen = openSection === section.title;
            return (
              <div key={section.title} className="border-b border-white/[0.07]">
                <button
                  onClick={() => setOpenSection(isOpen ? null : section.title)}
                  className="w-full flex items-center justify-between py-3.5 text-left active:opacity-60 transition-opacity"
                >
                  <span className="text-sm font-medium text-white/80">{section.title}</span>
                  <ChevronDown
                    size={14}
                    className={`text-white/30 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="pb-3 space-y-2.5">
                    {section.links.map((link) => (
                      link.external ? (
                        <a
                          key={link.label + link.href}
                          href={link.href}
                          className="block text-sm text-[#EEEAFE]/60 hover:text-[#6D5DF6] active:scale-[0.97] transition-all ps-1"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          key={link.label + link.href}
                          to={link.href}
                          className="block text-sm text-[#EEEAFE]/60 hover:text-[#6D5DF6] active:scale-[0.97] transition-all ps-1"
                        >
                          {link.label}
                        </Link>
                      )
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[#EEEAFE]/45 text-xs">
            {t('footer.copyright')}
          </p>
          <div className="flex gap-5">
            <Link to="/privacy" className="inline-block text-[#EEEAFE]/45 hover:text-[#6D5DF6] active:scale-95 text-xs transition-all">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms-of-service" className="inline-block text-[#EEEAFE]/45 hover:text-[#6D5DF6] active:scale-95 text-xs transition-all">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
