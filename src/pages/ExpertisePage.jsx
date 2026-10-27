import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HardHat,
  Crown,
  Hammer,
  Warehouse,
  Paintbrush,
  FileCheck,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Building,
} from 'lucide-react';
import { COMPANY, getWhatsAppURL } from '../config/company';
import ServicesSection from '../components/ServicesSection';
import ExpertiseSection from '../components/ExpertiseSection';
import SpecializationSection from '../components/SpecializationSection';

export default function ExpertisePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 150);
      }
    }
  }, [location.hash]);

  return (
    <div className="expertise-page" style={{ paddingTop: 'var(--header-h)' }}>
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
          <span className="section-eyebrow">Expertise &bull; 14 Client Services</span>
          <h1 className="heading-hero" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', marginBottom: '1.25rem' }}>
            Comprehensive Engineering &amp; <span style={{ color: 'var(--gold)' }}>Construction Expertise</span>
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.78)', maxWidth: '780px', fontSize: '1.05rem', lineHeight: 1.75 }}>
            From statutory drawing approvals and land development to heavy structural steelwork,
            luxury palace craftsmanship, and turnkey MEP installations under licensed supervision.
          </p>
        </div>
      </section>

      {/* Anchor targets for direct navigation */}
      <div id="palaces">
        <SpecializationSection />
      </div>

      <div id="civil">
        <ExpertiseSection />
      </div>

      <div id="services">
        <ServicesSection />
      </div>
    </div>
  );
}
