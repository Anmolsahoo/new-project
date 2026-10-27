import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  MessageCircle,
  Building,
  Home,
  Package,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Phone,
  Ruler,
  Crown,
} from 'lucide-react';
import { COMPANY, getWhatsAppURL } from '../config/company';
import '../styles/hero.css';

// Carousel slides matching Image 1 format
const HERO_SLIDES = [
  {
    id: 1,
    counter: '01 / 03',
    headline: 'Delivering Quality Engineering Structures Across Odisha',
    subtitle: 'From civil design and structural steelwork to turnkey building development aligned with applicable CPWD guidelines.',
    link: '/about',
    ctaText: 'Read more',
    image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=2000&q=85',
  },
  {
    id: 2,
    counter: '02 / 03',
    headline: 'Specialized in Building Palaces & Premium Residences',
    subtitle: 'Client-stated specialization in distinctive palace-style architecture, ornate facades, monumental columns, and luxury interior joinery.',
    link: '/expertise',
    ctaText: 'Explore Specialization',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=2000&q=85',
  },
  {
    id: 3,
    counter: '03 / 03',
    headline: 'Structural Steelwork, Metal Fabrication & Roofing Trusses',
    subtitle: 'High-tensile industrial steel framing, certified welding, heavy gantry girders, and clear-span tubular roof solutions.',
    link: '/projects/commercial',
    ctaText: 'View Steel & Fabrication',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=85',
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Auto advance slides every 6.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="home-page">
      {/* ============================================================
          SECTION 1: HERO CAROUSEL (MATCHING ECC IMAGE 1)
          ============================================================ */}
      <section className="hero hero--carousel" aria-label="Hero Showcase">
        {/* Background Image with Cinematic Overlay */}
        <div className="hero__bg">
          <AnimatePresence mode="wait">
            <motion.img
              key={slide.id}
              src={slide.image}
              alt={slide.headline}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              loading="eager"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=85';
              }}
            />
          </AnimatePresence>
        </div>

        {/* Hero Content (Left-Aligned, Image 1 Style) */}
        <div className="hero__content">
          <div className="container">
            <div className="hero__text">
              {/* Pre-label */}
              <div className="hero__pre-label">
                <span className="hero__pre-label-line" />
                <span className="hero__pre-label-text">
                  CIN: {COMPANY.cin} &bull; {COMPANY.businessCategory}
                </span>
              </div>

              {/* Headline */}
              <AnimatePresence mode="wait">
                <motion.h1
                  key={slide.id + '-title'}
                  className="hero__title heading-hero"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  {slide.headline}
                </motion.h1>
              </AnimatePresence>

              {/* Subtitle */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={slide.id + '-sub'}
                  className="hero__subtitle"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {slide.subtitle}
                </motion.p>
              </AnimatePresence>

              {/* Action Buttons (Image 1 "Read more >" Pill + WhatsApp) */}
              <div className="hero__ctas">
                <Link to={slide.link} className="hero__pill-btn">
                  <span>{slide.ctaText}</span>
                  <ChevronRight size={16} />
                </Link>

                <a
                  href={getWhatsAppURL('Hello Srinivas Nayak & Construction, I would like to consult with your engineering team.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero__cta-secondary"
                >
                  <MessageCircle size={16} style={{ color: '#25D366' }} />
                  <span>WhatsApp Quote</span>
                </a>
              </div>

              {/* Slide Counter on Bottom-Left (Matching Image 1: "03 / 03") */}
              <div className="hero__slide-controls">
                <span className="hero__counter">{slide.counter}</span>
                <div className="hero__slide-arrows">
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
                    className="hero__arrow-btn"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
                    className="hero__arrow-btn"
                    aria-label="Next slide"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Horizontal Bar */}
        <div className="hero__bottom-strip">
          <div className="hero__bottom-strip-inner">
            <div className="hero__strip-item">
              <Crown size={18} className="hero__strip-icon" />
              <div>
                <div className="hero__strip-label">Building Palaces &amp; Premium Structures</div>
                <div className="hero__strip-sub">Client Stated Specialization</div>
              </div>
            </div>

            <div className="hero__strip-item">
              <ShieldCheck size={18} className="hero__strip-icon" />
              <div>
                <div className="hero__strip-label">CPWD Guidelines Alignment</div>
                <div className="hero__strip-sub">Quality &amp; Technical Execution</div>
              </div>
            </div>

            <div className="hero__strip-item">
              <Sparkles size={18} className="hero__strip-icon" />
              <div>
                <div className="hero__strip-label">MSME Registered Enterprise</div>
                <div className="hero__strip-sub">{COMPANY.msmeRegistrations[0]}</div>
              </div>
            </div>

            <div className="hero__strip-item">
              <div>
                <div className="hero__strip-label">Director Er. Srinivas Nayak</div>
                <div className="hero__strip-sub">Rourkela, Sundargarh, Odisha</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2: CORE SECTORS SHOWCASE (COMMERCIAL, RESIDENTIAL, PRIVATE)
          ============================================================ */}
      <section className="section section--warm" aria-label="Project Sectors">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
            <span className="section-eyebrow" style={{ justifyContent: 'center' }}>Portfolio Sectors</span>
            <h2 className="heading-xl">Core Divisions &amp; Work Domains</h2>
            <span className="section-divider" style={{ margin: '1rem auto 1.5rem auto' }} />
            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.7 }}>
              Explore our structured operations spanning commercial projects, residential homes, and direct raw material supply for private developments.
            </p>
          </div>

          {/* 3 Sector Cards (Animated) */}
          <div className="sector-home-cards-grid">
            {/* Card 1: Commercial Projects */}
            <motion.div
              className="sector-home-card"
              whileHover={{ y: -8, boxShadow: 'var(--shadow-lg)' }}
              transition={{ duration: 0.3 }}
              style={{
                background: '#fff',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ position: 'relative', height: '230px', overflow: 'hidden' }}>
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
                  alt="Commercial Construction by SNC"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <span className="sector-home-card__badge">Commercial Sector</span>
              </div>
              <div style={{ padding: '2rem 1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.65rem' }}>
                  Commercial Projects
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                  Multi-storey office complexes, warehouses, industrial heavy steel framing, and commercial drawing approval coordination.
                </p>
                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <Link to="/projects/commercial" className="btn btn-navy btn-sm">
                    View Commercial <ArrowRight size={14} />
                  </Link>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold-dark)' }}>Turnkey Civil</span>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Residential Projects */}
            <motion.div
              className="sector-home-card"
              whileHover={{ y: -8, boxShadow: 'var(--shadow-lg)' }}
              transition={{ duration: 0.3 }}
              style={{
                background: '#fff',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ position: 'relative', height: '230px', overflow: 'hidden' }}>
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
                  alt="Residential Construction by SNC"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <span className="sector-home-card__badge">Residential Sector</span>
              </div>
              <div style={{ padding: '2rem 1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.65rem' }}>
                  Residential Projects
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                  Custom duplex residences, luxury family villas, modern apartments, false ceilings, UPVC windows, and architectural woodwork.
                </p>
                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <Link to="/projects/residential" className="btn btn-navy btn-sm">
                    View Residential <ArrowRight size={14} />
                  </Link>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold-dark)' }}>Villa Specialist</span>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Private Projects & Raw Materials */}
            <motion.div
              className="sector-home-card"
              whileHover={{ y: -8, boxShadow: 'var(--shadow-lg)' }}
              transition={{ duration: 0.3 }}
              style={{
                background: '#fff',
                border: '2px solid var(--gold)',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              <div style={{ position: 'relative', height: '230px', overflow: 'hidden' }}>
                <img
                  src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80"
                  alt="Raw Materials Supply and Pricing"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <span
                  className="sector-home-card__badge"
                  style={{ background: 'var(--gold)', color: 'var(--navy-darkest)' }}
                >
                  Private &bull; Materials &amp; Prices
                </span>
              </div>
              <div style={{ padding: '2rem 1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.65rem' }}>
                  Private &amp; Raw Materials
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                  Check available construction raw materials (cement, TMT steel, bricks, sand, granite, tiles), compute live amounts, and send an instant order directly via WhatsApp.
                </p>
                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <Link to="/projects/private" className="btn btn-primary btn-sm">
                    View Materials &amp; Rates <ArrowRight size={14} />
                  </Link>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#25D366' }}>WhatsApp Order</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 3: PALACE SPECIALIZATION HIGHLIGHT
          ============================================================ */}
      <section
        style={{
          background: 'var(--navy-darkest)',
          padding: 'clamp(4rem, 7vw, 6rem) 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container">
          <div className="palace-feature-grid">
            <div>
              <span className="section-eyebrow">Client-Stated Specialization</span>
              <h2 className="heading-xl" style={{ color: '#fff', marginBottom: '1.25rem' }}>
                Crafting Exceptional Palaces &amp; Premium Buildings
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.72)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '2rem' }}>
                From distinctive residences to monumental palace architectures, we combine heavy structural RCC engineering with classical porticos, carved stone facades, and luxury interior joinery.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/expertise" className="btn btn-primary">
                  Explore Palace Specialization <ArrowRight size={16} />
                </Link>
                <Link to="/contact" className="btn btn-outline-white">
                  Consult Er. Srinivas Nayak
                </Link>
              </div>
            </div>

            <div style={{ position: 'relative', borderRadius: 'var(--radius-sm)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
              <img
                src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=85"
                alt="Palace Architecture by SNC"
                style={{ width: '100%', height: '360px', objectFit: 'cover' }}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85';
                }}
              />
              <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', padding: '0.6rem 1rem', background: 'rgba(6, 19, 36, 0.88)', borderLeft: '3px solid var(--gold)', color: '#fff', fontSize: '0.8rem', fontWeight: 700 }}>
                High-End Architectural Benchmark
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 4: QUICK DIRECT ACTION STRIP
          ============================================================ */}
      <section style={{ background: 'var(--navy)', padding: '2.5rem 0', borderTop: '1px solid var(--border-gold)' }}>
        <div className="container">
          <div className="home-action-strip">
            <div>
              <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.25rem' }}>
                Ready to Initiate Your Project or Order Raw Materials?
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.88rem' }}>
                Contact our engineering office in Rourkela, Sundargarh directly via phone or WhatsApp.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
              <a
                href={getWhatsAppURL('Hello Srinivas Nayak & Construction, I would like to discuss a project.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <MessageCircle size={18} />
                WhatsApp: 7008087497
              </a>
              <a
                href={`tel:${COMPANY.phones[0].replace(/[^\d+]/g, '')}`}
                className="btn btn-outline-white"
              >
                <Phone size={16} />
                Call Office
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
