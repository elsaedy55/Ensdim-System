import { Outlet } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsAppFloat } from './WhatsAppFloat';
import { BackToTop } from './BackToTop';
import { GlobalSchemas } from './GlobalSchemas';

export function Layout() {
  return (
    <div className="min-h-screen bg-white">
      <GlobalSchemas />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
      <BackToTop />
    </div>
  );
}
