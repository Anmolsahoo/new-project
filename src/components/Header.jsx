import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, MessageCircle, Phone, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { COMPANY, getWhatsAppURL } from '../config/company';
import SearchModal from './SearchModal';
import '../styles/header.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll detection for header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mega menu on route change
  useEffect(() => {
    setMegaMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Lock body scroll when mega menu is open
  useEffect(() => {
    if (megaMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [megaMenuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMegaMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (path) => {
    setMegaMenuOpen(false);
    navigate(path);
  };

  return (
    <>
      <header className={`header ${scrolled ? 'header--solid' : 'header--transparent'}`}>
        <div className="container">
          <div className="header__inner">
            {/* Logo + "EST. 2023" Badge (Matching ECC 50 YEARS Style) */}
            <Link to="/" className="header__brand" aria-label="Srinivas Nayak and Construction Homepage">
              <img
                src="/snc-logo.png"
                alt="SNC Official Logo"
                className="header__brand-logo-img"
              />
              <div className="header__logo-text-wrap">
                <div className="header__logo-mark">
                  <span className="header__logo-snc">SNC</span>
                  <span className="header__logo-sub">CONSTRUCTION</span>
                </div>
                <div className="header__est-badge">
                  <span className="header__est-year">EST.</span>
                  <span className="header__est-bold">2023</span>
                </div>
              </div>
            </Link>

            {/* Right Controls: Search Icon & Three-Bar Menu (Image 1 Style) */}
            <div className="header__controls">
              {/* Search Button */}
              <button
                className="header__search-trigger"
                onClick={() => setSearchOpen(true)}
                aria-label="Open search bar"
                title="Search services, projects, materials"
              >
                <Search size={21} />
              </button>

              {/* Three-Bar Hamburger Menu Button */}
              <button
                className="header__menu-trigger"
                onClick={() => setMegaMenuOpen(true)}
                aria-label="Open full navigation menu"
                aria-expanded={megaMenuOpen}
              >
                <span className="header__bar" />
                <span className="header__bar" />
                <span className="header__bar" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Full-Screen Mega Menu Overlay (Matching Image 2) */}
      <AnimatePresence>
        {megaMenuOpen && (
          <motion.div
            className="mega-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Site Navigation"
          >
            {/* Mega Menu Top Bar */}
            <div className="container">
              <div className="mega-menu__header">
                {/* Brand Logo & EST Badge */}
                <Link to="/" onClick={() => setMegaMenuOpen(false)} className="header__brand">
                  <img
                    src="/snc-logo.png"
                    alt="SNC Official Logo"
                    className="header__brand-logo-img"
                  />
                  <div className="header__logo-text-wrap">
                    <div className="header__logo-mark">
                      <span className="header__logo-snc">SNC</span>
                      <span className="header__logo-sub">CONSTRUCTION</span>
                    </div>
                    <div className="header__est-badge">
                      <span className="header__est-year">EST.</span>
                      <span className="header__est-bold">2023</span>
                    </div>
                  </div>
                </Link>

                {/* Top Right Actions: Social Links & Close Button (Image 2) */}
                <div className="mega-menu__top-actions">
                  <a
                    href={getWhatsAppURL('Hello Srinivas Nayak & Construction, I am browsing your website.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mega-menu__social-link"
                    title="Direct WhatsApp"
                  >
                    <MessageCircle size={18} />
                  </a>
                  <a
                    href={`tel:${COMPANY.phones[0].replace(/[^\d+]/g, '')}`}
                    className="mega-menu__social-link"
                    title="Call Now"
                  >
                    <Phone size={18} />
                  </a>
                  <a
                    href={COMPANY.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mega-menu__social-link"
                    title="Facebook Page"
                    aria-label="Facebook Page"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>

                  {/* Close 'X' Button */}
                  <button
                    className="mega-menu__close-btn"
                    onClick={() => setMegaMenuOpen(false)}
                    aria-label="Close navigation menu"
                  >
                    <X size={28} />
                  </button>
                </div>
              </div>

              {/* 3 Columns Mega Menu Grid (Image 2) */}
              <div className="mega-menu__grid">
                {/* Column 1: The Company */}
                <div className="mega-menu__col">
                  <h3 className="mega-menu__col-title">The Company</h3>
                  <ul className="mega-menu__list">
                    <li>
                      <button onClick={() => handleNavClick('/about')} className="mega-menu__item-link">
                        About Us
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleNavClick('/leadership')} className="mega-menu__item-link">
                        Leadership
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleNavClick('/faqs')} className="mega-menu__item-link">
                        FAQs
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleNavClick('/contact')} className="mega-menu__item-link">
                        Contact
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Column 2: Expertise */}
                <div className="mega-menu__col">
                  <h3 className="mega-menu__col-title">Expertise</h3>
                  <ul className="mega-menu__list">
                    <li>
                      <button onClick={() => handleNavClick('/expertise#civil')} className="mega-menu__item-link">
                        Civil Design &amp; Construction
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleNavClick('/expertise#palaces')} className="mega-menu__item-link">
                        Building Palaces &amp; Premium Buildings
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleNavClick('/expertise#steel')} className="mega-menu__item-link">
                        Structural Steelwork &amp; Metal Fabrication
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleNavClick('/expertise#roofing')} className="mega-menu__item-link">
                        Truss &amp; Roofing Installation
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleNavClick('/expertise#interiors')} className="mega-menu__item-link">
                        Interior &amp; Exterior Finishing
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleNavClick('/expertise#approvals')} className="mega-menu__item-link">
                        Drawing Approval Assistance
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Column 3: Projects */}
                <div className="mega-menu__col">
                  <h3 className="mega-menu__col-title">Projects</h3>
                  <ul className="mega-menu__list">
                    <li>
                      <button onClick={() => handleNavClick('/projects/commercial')} className="mega-menu__item-link">
                        Commercial
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleNavClick('/projects/residential')} className="mega-menu__item-link">
                        Residential
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleNavClick('/projects/private')} className="mega-menu__item-link mega-menu__item-link--highlight">
                        Private &bull; Raw Materials &amp; Prices
                        <ArrowUpRight size={15} style={{ marginLeft: 6, display: 'inline' }} />
                      </button>
                    </li>
                  </ul>

                  {/* Direct Contact & Statutory Summary */}
                  <div className="mega-menu__footer-info">
                    <div className="mega-menu__phone-block">
                      <span className="mega-menu__phone-label">Direct Lines:</span>
                      <a href={`tel:${COMPANY.phones[0].replace(/[^\d+]/g, '')}`} className="mega-menu__phone-val">
                        {COMPANY.phones[0]}
                      </a>
                      <a href={`tel:${COMPANY.phones[1].replace(/[^\d+]/g, '')}`} className="mega-menu__phone-val">
                        {COMPANY.phones[1]}
                      </a>
                    </div>
                    <div className="mega-menu__statutory">
                      <span>CIN: {COMPANY.cin}</span>
                      <span>MSME: {COMPANY.msmeRegistrations[0]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
