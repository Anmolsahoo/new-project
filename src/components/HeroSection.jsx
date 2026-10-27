import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, MessageCircle, ChevronDown, ShieldCheck, Building, Sparkles } from 'lucide-react';
import { COMPANY, getWhatsAppURL } from '../config/company';
import '../styles/hero.css';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function HeroSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const scrollToServices = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero hero--loaded" ref={ref}>
      {/* Top Gold Subtle Accent */}
      <div className="hero__accent-line" />

      {/* Cinematic Full-Width Background */}
      <div className="hero__bg">
        <img
          src="/images/hero-bg.jpg"
          alt="Srinivas Nayak and Construction Architectural Engineering"
          loading="eager"
          fetchpriority="high"
          onError={(e) => {
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85';
          }}
        />
      </div>

      {/* Fine Architectural Grid Texture */}
      <div className="hero__grid-lines" aria-hidden="true" />

      {/* Main Content Area */}
      <div className="hero__content">
        <div className="container">
          <div className="hero__text">
            {/* Eyebrow / Pre-label */}
            <motion.div
              className="hero__pre-label"
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={0.1}
              variants={fadeUp}
            >
              <span className="hero__pre-label-line" />
              <span className="hero__pre-label-text">
                {COMPANY.businessCategory} &bull; CIN: {COMPANY.cin}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              className="hero__title heading-hero"
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={0.25}
              variants={fadeUp}
            >
              Building Excellence.
              <span className="highlight">Creating Landmarks.</span>
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              className="hero__subtitle"
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={0.4}
              variants={fadeUp}
            >
              From architectural planning to construction and finishing, we deliver
              comprehensive building solutions with a focus on quality, craftsmanship,
              and engineering excellence. Aligned with applicable CPWD guidelines.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="hero__ctas"
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={0.55}
              variants={fadeUp}
            >
              <button
                onClick={scrollToServices}
                className="btn btn-primary btn-lg"
              >
                Explore Our Services
                <ArrowRight size={17} />
              </button>

              <button
                onClick={scrollToContact}
                className="btn btn-outline-white btn-lg"
              >
                Discuss Your Project
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <button
        className="hero__scroll-indicator"
        onClick={scrollToServices}
        aria-label="Scroll to services"
      >
        <span className="hero__scroll-text">Scroll</span>
        <div className="hero__scroll-track">
          <div className="hero__scroll-thumb" />
        </div>
      </button>

      {/* Bottom Authority & Credentials Strip */}
      <div className="hero__bottom-strip">
        <div className="hero__bottom-strip-inner">
          <div className="hero__strip-item">
            <Building size={20} className="hero__strip-icon" />
            <div>
              <div className="hero__strip-label">Building Palaces &amp; Premium Structures</div>
              <div className="hero__strip-sub">Client Stated Specialization</div>
            </div>
          </div>

          <div className="hero__strip-item">
            <ShieldCheck size={20} className="hero__strip-icon" />
            <div>
              <div className="hero__strip-label">CPWD Guidelines Alignment</div>
              <div className="hero__strip-sub">Quality &amp; Technical Execution</div>
            </div>
          </div>

          <div className="hero__strip-item">
            <Sparkles size={20} className="hero__strip-icon" />
            <div>
              <div className="hero__strip-label">MSME Registered</div>
              <div className="hero__strip-sub">{COMPANY.msmeRegistrations[0]}</div>
            </div>
          </div>

          <div className="hero__strip-item">
            <div>
              <div className="hero__strip-label">Er. Srinivas Nayak</div>
              <div className="hero__strip-sub">Director / CEO &bull; {COMPANY.address.city}, Odisha</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
