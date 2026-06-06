import { Outlet } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsAppFloat } from './WhatsAppFloat';
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
    </div>
  );
}
