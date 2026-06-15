import { ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 w-12 h-12 md:w-14 md:h-14 bg-white border border-[#E5E5E5] rounded-full flex items-center justify-center shadow-xl hover:scale-110 hover:border-[#6D5DF6]/40 transition-all duration-200"
      aria-label="Back to top"
    >
      <ArrowUp className="text-[#101418] w-5 h-5 md:w-6 md:h-6" />
    </button>
  );
}
