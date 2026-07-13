import { BrowserRouter, Routes, Route } from 'react-router';
import { LanguageProvider } from '../contexts/LanguageContext';
import { Layout } from './components/Layout';
import { ScrollToTop } from './components/ScrollToTop';
import { Analytics } from './components/Analytics';
import { HomePage } from './pages/HomePage';
import { SolutionsPage } from './pages/SolutionsPage';
import { SolutionDetailPage } from './pages/SolutionDetailPage';
import { StagePage } from './pages/StagePage';
import { ProblemsLibraryPage } from './pages/ProblemsLibraryPage';
import { ProblemDetailPage } from './pages/ProblemDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ManagementChatbotPage } from './pages/ManagementChatbotPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductFindFitPage } from './pages/ProductFindFitPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ResearchPage } from './pages/ResearchPage';
import { ResearchArticlePage } from './pages/ResearchArticlePage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { CaseStudyDetailPage } from './pages/CaseStudyDetailPage';
import { CompanyPage } from './pages/CompanyPage';
import { AboutPage } from './pages/AboutPage';
import { TeamPage } from './pages/TeamPage';
import { PartnersPage } from './pages/PartnersPage';
import { ContactPage } from './pages/ContactPage';
import { ClientWorkspacePage } from './pages/ClientWorkspacePage';
import { BookConsultationPage } from './pages/BookConsultationPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { CareersPage } from './pages/CareersPage';
import { CareerApplyPage } from './pages/CareerApplyPage';
import { BlogPage } from './pages/BlogPage';
import { BlogArticlePage } from './pages/BlogArticlePage';
import { AIAgencyEgyptPage } from './pages/local/AIAgencyEgyptPage';
import { AIAgencySaudiPage } from './pages/local/AIAgencySaudiPage';
import { AIAgencyUAEPage } from './pages/local/AIAgencyUAEPage';
import { CRMEgyptPage } from './pages/local/CRMEgyptPage';
import { CRMSaudiPage } from './pages/local/CRMSaudiPage';
import { CRMUAEPage } from './pages/local/CRMUAEPage';
import { SaaSEgyptPage } from './pages/local/SaaSEgyptPage';
import { SaaSSaudiPage } from './pages/local/SaaSSaudiPage';
import { SaaSUAEPage } from './pages/local/SaaSUAEPage';

const basename =
  window.location.pathname === '/en' || window.location.pathname.startsWith('/en/')
    ? '/en'
    : '/';

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter basename={basename}>
        <ScrollToTop />
        <Analytics />
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />

            {/* Solutions */}
            <Route path="solutions" element={<SolutionsPage />} />
            <Route path="solutions/problems" element={<ProblemsLibraryPage />} />
            <Route path="solutions/build" element={<StagePage stage="build" />} />
            <Route path="solutions/start" element={<StagePage stage="start" />} />
            <Route path="solutions/growth" element={<StagePage stage="growth" />} />
            <Route path="solutions/:slug" element={<SolutionDetailPage />} />

            {/* Problems */}
            <Route path="problems/:slug" element={<ProblemDetailPage />} />

            {/* Services */}
            <Route path="services" element={<ServicesPage />} />
            <Route path="services/management-data-chatbot" element={<ManagementChatbotPage />} />
            <Route path="services/:slug" element={<ServiceDetailPage />} />

            {/* Products */}
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/find-fit" element={<ProductFindFitPage />} />
            <Route path="products/:slug" element={<ProductDetailPage />} />

            {/* Resources */}
            <Route path="resources" element={<ResourcesPage />} />
            <Route path="research" element={<ResearchPage />} />
            <Route path="research/:slug" element={<ResearchArticlePage />} />
            <Route path="case-studies" element={<CaseStudiesPage />} />
            <Route path="case-studies/:slug" element={<CaseStudyDetailPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<BlogArticlePage />} />

            {/* Company */}
            <Route path="company" element={<CompanyPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="team" element={<TeamPage />} />
            <Route path="partners" element={<PartnersPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="client-workspace" element={<ClientWorkspacePage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="terms-of-service" element={<TermsPage />} />

            {/* Careers */}
            <Route path="careers" element={<CareersPage />} />
            <Route path="careers/apply" element={<CareerApplyPage />} />

            {/* Actions */}
            <Route path="book-consultation" element={<BookConsultationPage />} />

            {/* Local SEO Landing Pages */}
            <Route path="ai-agency-egypt" element={<AIAgencyEgyptPage />} />
            <Route path="ai-agency-saudi-arabia" element={<AIAgencySaudiPage />} />
            <Route path="ai-agency-uae" element={<AIAgencyUAEPage />} />
            <Route path="crm-development-egypt" element={<CRMEgyptPage />} />
            <Route path="crm-development-saudi-arabia" element={<CRMSaudiPage />} />
            <Route path="crm-development-uae" element={<CRMUAEPage />} />
            <Route path="saas-development-egypt" element={<SaaSEgyptPage />} />
            <Route path="saas-development-saudi-arabia" element={<SaaSSaudiPage />} />
            <Route path="saas-development-uae" element={<SaaSUAEPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
