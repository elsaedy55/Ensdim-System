import { useState } from 'react';
import { Link } from 'react-router';
import { ChevronDown } from 'lucide-react';
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
        { label: ar ? 'تصميم الويب والتجارب الرقمية' : 'Web Design & Digital Experience', href: '/services/web-design-digital-experience' },
        { label: ar ? 'المحادثات الذكية والأتمتة' : 'AI Chatbots & Automation', href: '/services/ai-chatbots-automation' },
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
        { label: ar ? 'تسجيل الدخول' : 'Client Login', href: '/client-login' },
        { label: ar ? 'إنشاء حساب' : 'Create Account', href: '/client-login' },
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
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:opacity-80 transition-opacity flex-shrink-0">
              <EnsdimWordmark variant="light" className="text-3xl" />
            </Link>
            <div className="w-px h-10 bg-white/15" />
            <p className="text-[#EEEAFE]/50 text-sm leading-relaxed max-w-md">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Mobile: Logo and Client Login on same line */}
          <div className="sm:hidden flex items-center justify-between gap-3 mb-3">
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:opacity-80 transition-opacity flex-shrink-0 no-mirror">
              <EnsdimWordmark variant="light" className="text-2xl" />
            </Link>
            <Link to="/client-login" className="text-sm px-5 py-2.5 border border-white/20 text-white/80 rounded-lg hover:bg-white/5 hover:border-white/30 transition-colors font-medium whitespace-nowrap">
              {ar ? 'دخول العميل' : 'Client Login'}
            </Link>
          </div>

          {/* Mobile: Tagline below */}
          <p className="sm:hidden text-[#EEEAFE]/50 text-xs leading-relaxed max-w-[220px] no-mirror">
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
                    <Link to={link.href} className="text-[#EEEAFE]/50 text-xs hover:text-[#6D5DF6] transition-colors leading-relaxed">
                      {link.label}
                    </Link>
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
                  className="w-full flex items-center justify-between py-3.5 text-left"
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
                      <Link
                        key={link.label + link.href}
                        to={link.href}
                        className="block text-sm text-[#EEEAFE]/45 hover:text-[#6D5DF6] transition-colors ps-1"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[#EEEAFE]/30 text-xs">
            {t('footer.copyright')}
          </p>
          <div className="flex gap-5">
            <Link to="/privacy" className="text-[#EEEAFE]/30 hover:text-[#6D5DF6] text-xs transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms-of-service" className="text-[#EEEAFE]/30 hover:text-[#6D5DF6] text-xs transition-colors">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
