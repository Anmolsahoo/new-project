import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import CookieConsent from './components/CookieConsent';

// Separate Page Modules
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LeadershipPage from './pages/LeadershipPage';
import FaqsPage from './pages/FaqsPage';
import ExpertisePage from './pages/ExpertisePage';
import ProjectsPage from './pages/ProjectsPage';
import PrivateProjectsPage from './pages/PrivateProjectsPage';
import ContactPage from './pages/ContactPage';

import './styles/global.css';

// Automatically scroll to top on page change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-shell">
        {/* Navigation Bar with Search and Mega-Menu */}
        <Header />

        {/* Multi-Page Routes */}
        <main id="main-content" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/leadership" element={<LeadershipPage />} />
            <Route path="/faqs" element={<FaqsPage />} />
            <Route path="/expertise" element={<ExpertisePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/private" element={<PrivateProjectsPage />} />
            <Route path="/projects/:sector" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Fallback */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        {/* Corporate Footer */}
        <Footer />

        {/* Persistent Floating Conversion Actions */}
        <WhatsAppFloat />
        <CookieConsent />
      </div>
    </BrowserRouter>
  );
}
