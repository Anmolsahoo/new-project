import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, CheckCircle2, FileCheck2, Building2 } from 'lucide-react';
import { COMPANY } from '../config/company';
import '../styles/about.css';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function IntroSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const scrollToExpertise = () => {
    document.querySelector('#expertise')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="section section--warm about" ref={ref}>
      <div className="container">
        <div className="about__grid">
          {/* Left Column: Editorial Content */}
          <motion.div
            className="about__text-col"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={0.1}
            variants={fadeUp}
          >
            <div>
              <span className="section-eyebrow">About Our Company</span>
              <h2 className="heading-xl">
                Engineering Trust.<br />Building the Future.
              </h2>
              <span className="section-divider" />
            </div>

            {/* Welcome Quote Box */}
            <div className="intro__welcome-box">
              <p className="intro__welcome-text">
                &ldquo;{COMPANY.welcomeMessage}&rdquo;
              </p>
              <span className="intro__welcome-author">
                &mdash; {COMPANY.director}, Director / CEO
              </span>
            </div>

            <p className="about__intro">
              <strong>{COMPANY.name}</strong> operates as a dedicated{' '}
              <strong>{COMPANY.businessCategory}</strong> based in Rourkela, Sundargarh, Odisha.
              We provide a comprehensive range of construction, structural fabrication, and engineering
              services designed to support building projects from planning through execution and finishing.
            </p>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.7 }}>
              Our operations focus on quality, quantity, reliable service, and work aligned with applicable
              CPWD guidelines. From distinctive private residences and luxury palaces to heavy structural
              steel frameworks, we approach every project with engineering discipline and meticulous craftsmanship.
            </p>

            {/* Official Registration Badges */}
            <div className="intro__reg-grid">
              <div className="intro__reg-item">
                <FileCheck2 size={18} className="intro__reg-icon" />
                <div>
                  <span className="intro__reg-label">Corporate CIN</span>
                  <span className="intro__reg-value">{COMPANY.cin}</span>
                </div>
              </div>

              <div className="intro__reg-item">
                <Building2 size={18} className="intro__reg-icon" />
                <div>
                  <span className="intro__reg-label">MSME Registration</span>
                  <span className="intro__reg-value">{COMPANY.msmeRegistrations[0]}</span>
                </div>
              </div>

              <div className="intro__reg-item">
                <CheckCircle2 size={18} className="intro__reg-icon" />
                <div>
                  <span className="intro__reg-label">GSTIN</span>
                  <span className="intro__reg-value">{COMPANY.gstin}</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <button onClick={scrollToExpertise} className="btn btn-navy">
                Discover Our Capabilities
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>

          {/* Right Column: Architectural Photography */}
          <motion.div
            className="about__image-col"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={0.25}
            variants={fadeUp}
          >
            <div className="about__image-stack">
              <div className="about__corner" aria-hidden="true" />

              <div className="about__image-main">
                <img
                  src="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1000&q=85"
                  alt="Precision construction by Srinivas Nayak and Construction"
                  loading="lazy"
                />
              </div>

              <div className="about__image-accent">
                <img
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=85"
                  alt="Architectural structure inspection"
                  loading="lazy"
                />
              </div>

              {/* Specialization Floating Badge */}
              <div className="about__cert-panel">
                <div className="about__cert-title">Specialization</div>
                <div style={{ color: '#fff', fontSize: '0.86rem', fontWeight: 700, lineHeight: 1.4 }}>
                  {COMPANY.specialization}
                </div>
                <div style={{ color: 'var(--gold-light)', fontSize: '0.74rem', marginTop: '4px' }}>
                  CPWD Guidelines Alignment
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
