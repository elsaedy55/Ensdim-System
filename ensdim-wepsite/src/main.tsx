import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { QueryProvider } from "./lib/queryClient.tsx";
import App from "./app/App.tsx";
import "./styles/index.css";

// A normal page refresh should always start at the top — SPA navigation
// (handled by ScrollToTop) controls scroll position for everything else.
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <QueryProvider>
      <App />
    </QueryProvider>
  </HelmetProvider>
);
