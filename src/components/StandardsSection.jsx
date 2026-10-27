import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, Ruler, CheckCircle2, ClipboardCheck, Scale } from 'lucide-react';
import { COMPANY } from '../config/company';

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function StandardsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-70px' });

  const { headline, subheadline, pillars } = COMPANY.standardsCommitment;

  const ICONS = [ShieldCheck, Ruler, ClipboardCheck, Scale];

  return (
    <section id="standards" className="section section--darkest standards" ref={ref} aria-label="Quality and Engineering Standards">
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '820px', marginBottom: '3.5rem' }}>
          <span className="section-eyebrow">Engineering Rigor</span>
          <h2 className="heading-xl">{headline}</h2>
          <span className="section-divider" />
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.05rem', lineHeight: 1.7 }}>
            {subheadline} We approach every residential home, commercial structure, and fabrication task
            with systematic material inspection, precision dimensional verification, and engineering oversight.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}
        >
          {pillars.map((pillar, index) => {
            const Icon = ICONS[index] || ShieldCheck;
            return (
              <motion.div
                key={pillar.title}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                custom={index * 0.1}
                variants={fadeUp}
                style={{
                  background: 'var(--navy-deep)',
                  border: '1px solid rgba(198, 161, 91, 0.22)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '2.25rem 1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  transition: 'var(--transition)',
                }}
                whileHover={{ y: -6, borderColor: 'var(--gold)' }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(198, 161, 91, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold)',
                  }}
                >
                  <Icon size={22} />
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: '#fff',
                    lineHeight: 1.3,
                  }}
                >
                  {pillar.title}
                </h3>

                <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.88rem', lineHeight: 1.65 }}>
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Factual Integrity & CPWD Alignment Transparency Notice */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: 'var(--radius-sm)',
            padding: '1.5rem 2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ color: 'var(--gold)', flexShrink: 0 }}>
            <Scale size={24} />
          </div>
          <div style={{ flex: 1, minWidth: '260px' }}>
            <div style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.2rem' }}>
              Standard Compliance Statement
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.8rem', lineHeight: 1.5 }}>
              Srinivas Nayak and Construction Pvt. Ltd. benchmarks workmanship against applicable CPWD technical guidelines
              and recognized engineering practices. This reflects an operational commitment to quality construction standards.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
