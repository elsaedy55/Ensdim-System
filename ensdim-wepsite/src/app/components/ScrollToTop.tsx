import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router';

export function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // Only force scroll-to-top when navigating to a NEW page (PUSH/REPLACE).
    // On browser Back/Forward (POP) we leave it alone so the browser can
    // restore the user's previous scroll position.
    if (navigationType === 'POP') return;
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, navigationType]);

  return null;
}
