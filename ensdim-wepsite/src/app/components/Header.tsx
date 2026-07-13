import { Link } from 'react-router';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import ensdimLogo from '../../imports/Asset_6__1_.png';

type Language = 'en' | 'ar';

interface DropdownItem {
  label: string;
  labelAr: string;
  href: string;
  groupLabel?: string;
  groupLabelAr?: string;
}

interface NavItem {
  label: string;
  labelAr: string;
  href: string;
  dropdown?: DropdownItem[];
}

const navItems: NavItem[] = [
  {
    label: 'Solutions', labelAr: 'الحلول', href: '/solutions',
    dropdown: [
      { label: 'Build', labelAr: 'البناء', href: '/solutions/build' },
      { label: 'Start', labelAr: 'الانطلاق', href: '/solutions/start' },
      { label: 'Growth', labelAr: 'النمو', href: '/solutions/growth' },
      { label: 'Products', labelAr: 'المنتجات', href: '/products' },
    ],
  },
  {
    label: 'Services', labelAr: 'الخدمات', href: '/services',
    dropdown: [
      { label: 'UX & Conversion Development', labelAr: 'تطوير تجربة المستخدم والتحويل', href: '/services/ux-conversion-development' },
      { label: 'Web Design & Development', labelAr: 'تصميم وتطوير المواقع', href: '/services/web-design-digital-experience' },
      { label: 'Mobile Applications', labelAr: 'تطبيقات الموبايل', href: '/services/mobile-web-applications' },
      { label: 'CRM & Follow-up Systems', labelAr: 'أنظمة CRM والمتابعة', href: '/services/crm-internal-systems' },
      { label: 'Internal Systems & Operations', labelAr: 'الأنظمة الداخلية وإدارة التشغيل', href: '/services/internal-systems-operations' },
      { label: 'Data & Dashboards', labelAr: 'البيانات ولوحات المتابعة', href: '/services/data-dashboards' },
      { label: 'AI Chatbots & Automation', labelAr: 'روبوتات الدردشة والأتمتة', href: '/services/ai-chatbots-automation' },
      { label: 'Marketing & Growth Strategy', labelAr: 'استراتيجيات التسويق والنمو', href: '/services/growth-marketing-systems' },
    ],
  },
  {
    label: 'Case Studies', labelAr: 'دراسات الحالة', href: '/case-studies',
  },
  {
    label: 'Resources', labelAr: 'الموارد', href: '/resources',
    dropdown: [
      { label: 'Research', labelAr: 'الأبحاث', href: '/research' },
      { label: 'Knowledge Hub', labelAr: 'مركز المعلومات', href: '/blog' },
    ],
  },
  {
    label: 'Company', labelAr: 'الشركة', href: '/company',
    dropdown: [
      { label: 'About', labelAr: 'عن إنسديم', href: '/about' },
      { label: 'Team', labelAr: 'الفريق', href: '/team' },
      { label: 'Careers', labelAr: 'الوظائف', href: '/careers' },
      { label: 'Contact', labelAr: 'تواصل معنا', href: '/contact' },
    ],
  },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeMobileAccordion, setActiveMobileAccordion] = useState<string | null>(null);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isMobileLangOpen, setIsMobileLangOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const langDesktopRef = useRef<HTMLDivElement>(null);
  const langMobileRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { language, country, setLanguage, t } = useLanguage();
  const ar = language === 'ar';


  const openDropdown = useCallback((label: string) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setActiveDropdown(label);
  }, []);

  const scheduleCloseDropdown = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setActiveDropdown(null), 300);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
        setIsMenuOpen(false);
        setActiveDropdown(null);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
        setIsMenuOpen(false);
        setIsLangDropdownOpen(false);
        setIsMobileLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsLangDropdownOpen(false);
    setIsMobileLangOpen(false);
    setIsMenuOpen(false);
  };

  const closeAll = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
    setActiveMobileAccordion(null);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 bg-white/97 backdrop-blur-md border-b border-[#E8E8E8] shadow-sm transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className={`flex items-center justify-between gap-2 ${ar ? 'max-lg:flex-row-reverse' : ''}`}>

          {/* Logo: forced to the left on mobile even in Arabic (RTL flips flex order otherwise) */}
          <Link to="/" onClick={closeAll} className="cursor-pointer hover:opacity-80 active:scale-95 transition-all flex-shrink-0 no-mirror">
            <img src={ensdimLogo} alt="Ensdim" className="w-auto object-contain h-[22px] sm:h-[28px]" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => openDropdown(item.label)}
                onMouseLeave={scheduleCloseDropdown}
              >
                <Link
                  to={item.href}
                  onClick={() => { setActiveDropdown(activeDropdown === item.label ? null : item.label); }}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-[#101418] hover:text-[#6D5DF6] active:scale-[0.96] transition-all whitespace-nowrap rounded-md hover:bg-[#EEEAFE]/50"
                >
                  {ar ? item.labelAr : item.label}
                  {item.dropdown && (
                    <ChevronDown size={13} className={`text-[#4F555E] transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                  )}
                </Link>

                {item.dropdown && activeDropdown === item.label && (
                  <div
                    className="absolute top-full mt-1 bg-white rounded-xl shadow-xl border border-[#E5E5E5] py-1.5 z-50 min-w-[220px]"
                    style={{ [ar ? 'right' : 'left']: 0 }}
                    onMouseEnter={() => openDropdown(item.label)}
                    onMouseLeave={scheduleCloseDropdown}
                  >
                    {item.dropdown.map((sub) => (
                      <div key={sub.href}>
                        {sub.groupLabel && (
                          <div className="mt-1.5 pt-1.5 mx-4 border-t border-[#F0F0F0] pb-1 text-[10px] font-semibold uppercase tracking-wider text-[#4F555E]">
                            {ar ? sub.groupLabelAr : sub.groupLabel}
                          </div>
                        )}
                        <Link
                          to={sub.href}
                          onClick={closeAll}
                          className="block px-4 py-2 text-sm text-[#101418] hover:text-[#6D5DF6] hover:bg-[#EEEAFE]/60 active:scale-[0.97] transition-all"
                        >
                          {ar ? sub.labelAr : sub.label}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop right actions */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <Link
              to="/book-consultation"
              onClick={closeAll}
              className="px-4 py-2 text-sm bg-[#3B2A78] text-white rounded-lg hover:bg-[#4a3690] active:scale-[0.97] transition-all font-medium whitespace-nowrap"
            >
              {t('header.bookConsultation')}
            </Link>

            {/* Language selector */}
            <div className="relative" ref={langDesktopRef}>
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 border border-[#E5E5E5] rounded-lg hover:border-[#6D5DF6] active:scale-[0.96] transition-all"
              >
                <img src={`https://flagcdn.com/24x18/${country.toLowerCase()}.png`} alt="" className="w-5 h-auto flex-shrink-0" />
                <span className="text-sm text-[#101418]">{ar ? 'AR' : 'EN'}</span>
                <ChevronDown size={14} className="text-[#4F555E]" />
              </button>
              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-[#E5E5E5] py-1.5 z-50">
                  <button onClick={() => handleLanguageChange('ar')} className={`block w-full text-start px-4 py-2 text-sm transition-all active:scale-[0.98] ${ar ? 'text-[#6D5DF6] font-semibold' : 'text-[#101418] hover:bg-[#F8F8FF]'}`}>{t('languageSwitch.arabic')}</button>
                  <button onClick={() => handleLanguageChange('en')} className={`block w-full text-start px-4 py-2 text-sm transition-all active:scale-[0.98] ${!ar ? 'text-[#6D5DF6] font-semibold' : 'text-[#101418] hover:bg-[#F8F8FF]'}`}>{t('languageSwitch.english')}</button>
                </div>
              )}
            </div>

            <a href="https://app.ensdim.com/login" className="text-sm text-[#101418] hover:text-[#6D5DF6] active:scale-95 transition-all px-2 py-2 whitespace-nowrap">
              {t('header.clientLogin')}
            </a>
          </div>

          {/* Mobile right: hamburger + lang */}
          <div className="lg:hidden flex items-center gap-2 flex-shrink-0">
            <button
              className="text-[#101418] p-1.5 active:scale-90 transition-transform"
              onClick={() => { setIsMenuOpen(!isMenuOpen); setIsMobileLangOpen(false); }}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <div className="relative" ref={langMobileRef}>
              <button
                onClick={() => { setIsMobileLangOpen(!isMobileLangOpen); setIsMenuOpen(false); }}
                className="flex items-center gap-1.5 px-2 py-1.5 border border-[#E5E5E5] rounded-lg hover:border-[#6D5DF6] active:scale-95 transition-all"
              >
                <img src={`https://flagcdn.com/24x18/${country.toLowerCase()}.png`} alt="" className="w-5 h-auto flex-shrink-0" />
                <span className="text-xs font-semibold text-[#101418]">{ar ? 'AR' : 'EN'}</span>
                <ChevronDown size={12} className="text-[#4F555E]" />
              </button>
              {isMobileLangOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-[#E5E5E5] py-1.5 z-50">
                  <button onClick={() => handleLanguageChange('ar')} className={`block w-full text-start px-3 py-2 text-xs transition-all active:scale-[0.98] ${ar ? 'text-[#6D5DF6] font-semibold' : 'text-[#101418] hover:bg-[#F8F8FF]'}`}>{t('languageSwitch.arabic')}</button>
                  <button onClick={() => handleLanguageChange('en')} className={`block w-full text-start px-3 py-2 text-xs transition-all active:scale-[0.98] ${!ar ? 'text-[#6D5DF6] font-semibold' : 'text-[#101418] hover:bg-[#F8F8FF]'}`}>{t('languageSwitch.english')}</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-3 pb-4 border-t border-[#E5E5E5] pt-4">
            <nav className="flex flex-col">
              {navItems.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center border-b border-[#F0F0F0]">
                    {item.dropdown ? (
                      /* Mobile: clicking label opens dropdown instead of navigating */
                      <button
                        onClick={() => setActiveMobileAccordion(activeMobileAccordion === item.label ? null : item.label)}
                        className="flex-1 py-3 text-sm font-medium text-[#101418] hover:text-[#6D5DF6] active:opacity-60 transition-all text-start flex items-center justify-between gap-2"
                      >
                        <span>{ar ? item.labelAr : item.label}</span>
                        <ChevronDown size={14} className={`text-[#4F555E] transition-transform duration-200 ${activeMobileAccordion === item.label ? 'rotate-180' : ''}`} />
                      </button>
                    ) : (
                      <Link
                        to={item.href}
                        onClick={closeAll}
                        className="flex-1 py-3 text-sm font-medium text-[#101418] hover:text-[#6D5DF6] active:opacity-60 transition-all text-start flex items-center justify-between gap-2"
                      >
                        <span>{ar ? item.labelAr : item.label}</span>
                        <ChevronRight size={14} className="text-[#4F555E]" />
                      </Link>
                    )}
                  </div>
                  {item.dropdown && activeMobileAccordion === item.label && (
                    <div className="bg-[#FAFAFA] border-b border-[#F0F0F0]">
                      {item.dropdown.map((sub) => (
                        <div key={sub.href}>
                          {sub.groupLabel && (
                            <div className="px-4 pt-2.5 pb-1 text-[10px] font-semibold uppercase tracking-wider text-[#4F555E]/80 border-t border-[#F0F0F0] mt-1">
                              {ar ? sub.groupLabelAr : sub.groupLabel}
                            </div>
                          )}
                          <Link
                            to={sub.href}
                            onClick={closeAll}
                            className="block px-4 py-2.5 text-sm text-[#4F555E] hover:text-[#6D5DF6] hover:bg-[#EEEAFE]/40 active:scale-[0.97] transition-all"
                          >
                            {ar ? sub.labelAr : sub.label}
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-4 mt-2 space-y-3">
                <Link to="/book-consultation" onClick={closeAll} className="block w-full px-4 py-3 bg-[#3B2A78] text-white rounded-lg hover:bg-[#4a3690] active:scale-[0.97] transition-all font-medium text-center text-sm">
                  {t('header.bookConsultation')}
                </Link>
                <a href="https://app.ensdim.com/login" className="block w-full px-4 py-3 border border-[#E5E5E5] text-[#101418] rounded-lg hover:border-[#6D5DF6] hover:text-[#6D5DF6] active:scale-[0.97] transition-all font-medium text-center text-sm">
                  {t('header.clientLogin')}
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
