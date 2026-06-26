import { useEffect } from 'react';
import { useLocation } from 'react-router';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function Analytics() {
  const location = useLocation();

  useEffect(() => {
    if (!window.gtag) return;
    window.gtag('event', 'page_view', {
      page_path: location.pathname + location.search + location.hash,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location.pathname, location.search, location.hash]);

  return null;
}
