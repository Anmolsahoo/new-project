import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { COMPANY } from '../config/company';

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function ProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-70px' });

  return (
    <section id="process" className="section section--warm process" ref={ref} aria-label="Our Working Process">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 4rem auto' }}>
          <span className="section-eyebrow" style={{ justifyContent: 'center' }}>Structured Methodology</span>
          <h2 className="heading-xl">Our Working Process</h2>
          <span className="section-divider" style={{ margin: '1rem auto 1.5rem auto' }} />
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7 }}>
            A disciplined 5-stage engineering lifecycle guiding projects from conceptual consultation
            through construction, quality checks, and formal handover.
          </p>
        </div>

        {/* 5-Step Process Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            position: 'relative',
          }}
        >
          {COMPANY.processSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={index * 0.1}
              variants={fadeUp}
              style={{
                background: '#fff',
                padding: '2.25rem 1.75rem',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-sm)',
                boxShadow: 'var(--shadow-sm)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                transition: 'var(--transition)',
              }}
              whileHover={{ y: -6, boxShadow: 'var(--shadow-md)' }}
            >
              {/* Step Number */}
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2.5rem',
                  fontWeight: 900,
                  color: 'var(--gold)',
                  lineHeight: 1,
                  marginBottom: '1rem',
                  opacity: 0.9,
                }}
              >
                {step.step}
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: 'var(--navy)',
                  marginBottom: '0.75rem',
                  lineHeight: 1.3,
                }}
              >
                {step.title}
              </h3>

              <p
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.88rem',
                  lineHeight: 1.65,
                  marginTop: 'auto',
                }}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Technical Regulatory Transparency Note */}
        <div
          style={{
            marginTop: '3rem',
            padding: '1.25rem 1.75rem',
            background: 'rgba(16, 42, 67, 0.04)',
            borderLeft: '3px solid var(--gold)',
            borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
          }}
        >
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--navy)' }}>Regulatory Notice:</strong> Statutory approvals, municipal permissions,
            and technical certifications depend on the applicable government authorities, local urban bodies, and specific project requirements.
            SNC assists clients with coordination, documentation, and drawing submission processes.
          </p>
        </div>
      </div>
    </section>
  );
}
