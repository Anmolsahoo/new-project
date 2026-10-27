import { motion } from 'framer-motion';
import ContactSection from '../components/ContactSection';
import { COMPANY } from '../config/company';

export default function ContactPage() {
  return (
    <div className="contact-page" style={{ paddingTop: 'var(--header-h)' }}>
      {/* Header */}
      <section
        style={{
          background: 'var(--navy-darkest)',
          padding: 'clamp(3.5rem, 6vw, 5.5rem) 0',
          borderBottom: '1px solid var(--border-gold)',
          position: 'relative',
        }}
      >
        <div className="container">
          <span className="section-eyebrow">The Company &bull; Communication</span>
          <h1 className="heading-hero" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', marginBottom: '1.25rem' }}>
            Contact &amp; <span style={{ color: 'var(--gold)' }}>Consultation Office</span>
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.78)', maxWidth: '760px', fontSize: '1.05rem', lineHeight: 1.75 }}>
            Connect directly with Director Er. Srinivas Nayak and our project coordination team for drawing reviews,
            site consultations, raw material supply, and formal quotation requests.
          </p>
        </div>
      </section>

      {/* Embedded Contact Component */}
      <ContactSection />
    </div>
  );
}
