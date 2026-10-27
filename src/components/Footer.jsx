import { MessageCircle, Phone, Mail, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';
import { COMPANY, getWhatsAppURL } from '../config/company';
import '../styles/contact-footer.css';

const QUICK_LINKS = [
  { label: 'Home',                  href: '#home' },
  { label: 'About Company',         href: '#about' },
  { label: '14 Core Services',       href: '#services' },
  { label: 'Palace Specialization', href: '#specialization' },
  { label: 'Engineering Expertise', href: '#expertise' },
  { label: 'Project Portfolio',     href: '#projects' },
  { label: 'Working Process',       href: '#process' },
  { label: 'Quality Standards',     href: '#standards' },
  { label: 'Contact Us',            href: '#contact' },
];

function scrollTo(href) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__top">
          {/* Brand & Statutory Credentials */}
          <div className="footer__brand">
            <div className="footer__logo">
              <img
                src="/snc-logo.png"
                alt="Srinivas Nayak & Construction (P) Limited Logo"
                className="footer__logo-img"
              />
              <div>
                <div className="footer__logo-name">
                  Srinivas Nayak &amp; Construction
                </div>
                <div className="footer__logo-tagline">
                  (P) Limited &bull; {COMPANY.tagline}
                </div>
              </div>
            </div>

            <p className="footer__about">
              {COMPANY.welcomeMessage} Providing professional construction, structural steelwork,
              fabrication, and integrated engineering solutions across Odisha.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.55)' }}>
              <div><strong style={{ color: 'var(--gold-light)' }}>CIN:</strong> {COMPANY.cin}</div>
              <div><strong style={{ color: 'var(--gold-light)' }}>MSME 1:</strong> {COMPANY.msmeRegistrations[0]}</div>
              <div><strong style={{ color: 'var(--gold-light)' }}>MSME 2:</strong> {COMPANY.msmeRegistrations[1]}</div>
              <div><strong style={{ color: 'var(--gold-light)' }}>GSTIN:</strong> {COMPANY.gstin}</div>
              <div><strong style={{ color: 'var(--gold-light)' }}>Category:</strong> {COMPANY.businessCategory}</div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <div className="footer__section-title">Navigation</div>
            <ul className="footer__links">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="footer__link"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Client-Supplied Services List */}
          <div>
            <div className="footer__section-title">Client Services</div>
            <ul className="footer__links" style={{ maxHeight: '360px', overflowY: 'auto', paddingRight: '0.5rem' }}>
              {COMPANY.services.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    className="footer__link"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo('#services');
                    }}
                    style={{ fontSize: '0.8rem' }}
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Corporate Office & Direct Contacts */}
          <div>
            <div className="footer__section-title">Contact &amp; Inquiries</div>

            <div className="footer__contact-item">
              <MapPin size={15} />
              <span>{COMPANY.address.full}</span>
            </div>

            <div className="footer__contact-item">
              <Phone size={15} />
              <div>
                {COMPANY.phones.map((phone, i) => (
                  <div key={i}>
                    <a href={`tel:${phone.replace(/[^\d+]/g, '')}`}>{phone}</a>
                  </div>
                ))}
              </div>
            </div>

            <div className="footer__contact-item">
              <Mail size={15} />
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            </div>

            <div className="footer__contact-item">
              <ExternalLink size={15} />
              <a href={COMPANY.facebook} target="_blank" rel="noopener noreferrer">
                Official Facebook Page
              </a>
            </div>

            <a
              href={getWhatsAppURL('Hello Srinivas Nayak & Construction, I would like to get in touch with your team.')}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__wa-btn"
            >
              <MessageCircle size={16} />
              WhatsApp Us Directly
            </a>
          </div>
        </div>

        <span className="gold-line" style={{ margin: '2.5rem 0 1.5rem 0' }} />

        {/* Regulatory Disclaimer & Copyright */}
        <div style={{ marginBottom: '1.5rem', fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.4)', lineHeight: 1.6 }}>
          <strong style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Factual Disclaimer:</strong> All registration numbers (CIN, MSME UDYAM, GSTIN) and ISO certification statements are published as provided by the client. Projects displayed during initial release represent demonstration architectural benchmarks. Technical execution is aligned with applicable CPWD guidelines.
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            &copy; {year} {COMPANY.name}. All rights reserved.
          </p>
          <nav className="footer__legal" aria-label="Legal & Privacy Links">
            <a href="#standards">Quality Commitment</a>
            <a href="#cookies">Cookie Preferences</a>
            <a href="#about">Corporate Registration</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
