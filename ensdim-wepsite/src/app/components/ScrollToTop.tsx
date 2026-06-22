import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router';

const STORAGE_KEY = 'ensdim_scroll_positions';

function getPositions(): Record<string, number> {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function savePosition(key: string, y: number) {
  const positions = getPositions();
  positions[key] = y;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
}

export function ScrollToTop() {
  const location = useLocation();
  const navigationType = useNavigationType();
  // True only once the SPA has actually performed an in-app navigation.
  // React Router reports 'POP' for the very first mount too (there's no
  // other type to assign yet), so without this flag a stale sessionStorage
  // entry under the reused "default" key could get restored on a brand new
  // page load that was never actually "popped" from history.
  const hasNavigatedRef = useRef(false);

  useEffect(() => {
    const key = location.key;
    const isGenuinePop = navigationType === 'POP' && hasNavigatedRef.current;
    hasNavigatedRef.current = true;

    // Read the saved position for this history entry BEFORE attaching the
    // scroll listener below — the listener's first natural scroll event
    // (e.g. from the browser clamping scrollY while a shorter destination
    // page mounts) would otherwise overwrite the value we need to restore.
    const saved = getPositions()[key];

    if (isGenuinePop && typeof saved === 'number') {
      // Pages with async-loaded data (case studies, blog, research, etc.)
      // are shorter than their final height right after mount, so a single
      // scrollTo can silently clamp short and layout can keep shifting as
      // content streams in. Re-assert the saved position for a short
      // window, but back off the moment the user scrolls on their own so
      // we never fight their input.
      let attempts = 0;
      let cancelled = false;
      const maxAttempts = 30; // ~1.5s at 50ms intervals
      const cancelRetry = () => { cancelled = true; };
      window.addEventListener('wheel', cancelRetry, { once: true, passive: true });
      window.addEventListener('touchmove', cancelRetry, { once: true, passive: true });
      const tryRestore = () => {
        if (cancelled) return;
        window.scrollTo({ top: saved, behavior: 'instant' as ScrollBehavior });
        attempts += 1;
        if (attempts < maxAttempts) setTimeout(tryRestore, 50);
      };
      tryRestore();

      const onScroll = () => savePosition(key, window.scrollY);
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => {
        window.removeEventListener('wheel', cancelRetry);
        window.removeEventListener('touchmove', cancelRetry);
        window.removeEventListener('scroll', onScroll);
      };
    }

    if (location.hash) {
      // Give the destination page a moment to mount before locating the
      // target element — it may not exist in the DOM on the very first tick.
      let attempts = 0;
      const maxAttempts = 20; // ~1s at 50ms intervals
      const tryScrollToHash = () => {
        const target = document.getElementById(location.hash.slice(1));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
        attempts += 1;
        if (attempts < maxAttempts) setTimeout(tryScrollToHash, 50);
      };
      tryScrollToHash();
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
    const onScroll = () => savePosition(key, window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.key, navigationType, location.hash]);

  return null;
}
