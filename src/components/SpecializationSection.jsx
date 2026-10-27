import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Crown, Sparkles, ArrowRight, MessageCircle, Shield } from 'lucide-react';
import { COMPANY, getWhatsAppURL } from '../config/company';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function SpecializationSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="specialization"
      className="section specialization"
      ref={ref}
      aria-label="Client Specialization"
      style={{
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        background: 'var(--navy-darkest)',
        overflow: 'hidden',
        padding: 'clamp(5rem, 9vw, 8rem) 0',
      }}
    >
      {/* Background Architectural Palace Photo */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=2000&q=85"
          alt="Palace and Premium Architectural Construction Benchmark"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'brightness(0.7)',
          }}
        />
        {/* Navy to Void Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, rgba(6, 19, 36, 0.94) 0%, rgba(10, 29, 51, 0.85) 60%, rgba(16, 42, 67, 0.88) 100%)',
          }}
        />
      </div>

      {/* Decorative Gold Radial Glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(198, 161, 91, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '820px' }}>
          {/* Eyebrow */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={0.1}
            variants={fadeUp}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.4rem 1rem',
              background: 'rgba(198, 161, 91, 0.15)',
              border: '1px solid rgba(198, 161, 91, 0.35)',
              color: 'var(--gold-light)',
              fontSize: '0.74rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: '1.75rem',
            }}
          >
            <Crown size={15} style={{ color: 'var(--gold)' }} />
            Client-Stated Specialization &bull; Palace &amp; Premium Buildings
          </motion.div>

          {/* Headline */}
          <motion.h2
            className="heading-hero"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={0.25}
            variants={fadeUp}
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 4.4rem)',
              lineHeight: 1.1,
              marginBottom: '1.5rem',
            }}
          >
            Crafting Exceptional Spaces.
            <span style={{ color: 'var(--gold)', display: 'block' }}>
              Building Lasting Legacies.
            </span>
          </motion.h2>

          {/* Supporting Copy */}
          <motion.p
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={0.4}
            variants={fadeUp}
            style={{
              color: 'rgba(255, 255, 255, 0.78)',
              fontSize: 'clamp(1rem, 1.6vw, 1.15rem)',
              lineHeight: 1.75,
              marginBottom: '2.5rem',
              maxWidth: '680px',
            }}
          >
            From distinctive residences to premium building projects, our focus is on
            thoughtful execution, detailed craftsmanship, and quality-conscious construction.
            We integrate intricate classical facades, heavy RCC framing, and bespoke interior woodwork
            into unified architectural statements.
          </motion.p>

          {/* Key Specialization Highlights */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={0.5}
            variants={fadeUp}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.25rem',
              marginBottom: '3rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(198, 161, 91, 0.25)',
            }}
          >
            <div>
              <h4 style={{ color: 'var(--gold)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                Ornate Facades &amp; Columns
              </h4>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.82rem', lineHeight: 1.5 }}>
                Custom stone cladding, monumental porticos, and grand architectural elevations.
              </p>
            </div>

            <div>
              <h4 style={{ color: 'var(--gold)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                CPWD Guidelines Aligned
              </h4>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.82rem', lineHeight: 1.5 }}>
                Quality assurance, standard mix ratios, and structural safety protocols.
              </p>
            </div>

            <div>
              <h4 style={{ color: 'var(--gold)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                Turnkey Luxury Finishes
              </h4>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.82rem', lineHeight: 1.5 }}>
                Hardwood joinery, designer false ceilings, vitrified tiling, and custom metal grilles.
              </p>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={0.6}
            variants={fadeUp}
            style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}
          >
            <button onClick={scrollToContact} className="btn btn-primary btn-lg">
              Discuss Your Building Project
              <ArrowRight size={17} />
            </button>

            <a
              href={getWhatsAppURL('Hello Srinivas Nayak & Construction, I would like to consult with you regarding a premium building or palace-style residential project.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-white btn-lg"
            >
              <MessageCircle size={18} style={{ color: '#25D366' }} />
              WhatsApp Consultation
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
