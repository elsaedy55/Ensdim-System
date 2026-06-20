import { MessageCircle } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const footerObserverRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    // Observe footer
    footerObserverRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsFooterVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    const footerElement = document.querySelector('footer');
    if (footerElement && footerObserverRef.current) {
      footerObserverRef.current.observe(footerElement);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (footerObserverRef.current) {
        footerObserverRef.current.disconnect();
      }
    };
  }, []);

  // Hide button when footer is visible or when not scrolled enough
  if (!isVisible || isFooterVisible) return null;

  return (
    <a
      href="https://wa.me/"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 sm:bottom-9 sm:right-9 z-50 w-12 h-12 md:w-14 md:h-14 bg-[#101418] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-200 group"
      style={{
        boxShadow: '0 0 0 4px rgba(109, 93, 246, 0.3), 0 10px 30px rgba(0, 0, 0, 0.3)'
      }}
      aria-label="Talk to ENSDIM"
    >
      <div className="absolute inset-0 rounded-full bg-[#6D5DF6] opacity-0 group-hover:opacity-20 transition-opacity"></div>
      <MessageCircle className="text-white w-6 h-6 md:w-7 md:h-7" />

      {/* Tooltip on hover (desktop only) */}
      <span className="hidden lg:block absolute bottom-full mb-2 right-0 bg-[#101418] text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Talk to ENSDIM
      </span>

      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full animate-ping bg-[#6D5DF6] opacity-20"></span>
    </a>
  );
}
