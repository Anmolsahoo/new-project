import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Award, CheckCircle2, UserCheck, ArrowUpRight } from 'lucide-react';
import { COMPANY, getWhatsAppURL } from '../config/company';
import '../styles/about.css';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

const PILLARS = [
  {
    num: '01',
    title: 'Consult on Engineer Leadership',
    desc: 'Led by qualified Director Er. Srinivas Nayak, ensuring every structural layout and MEP blueprint meets strict safety and civil compliance standards.',
  },
  {
    num: '02',
    title: 'Exclusive Villa Specialist Expertise',
    desc: 'Dedicated architectural focus on custom luxury villas, bespoke duplex residences, and private turnkey developments with personalized interior & exterior finishes.',
  },
  {
    num: '03',
    title: 'Triple ISO Quality Certifications',
    desc: 'Certified to ISO 9001:2015 (Quality), ISO 14001:2015 (Environment), and ISO 45001:2018 (Occupational Health & Safety) with verified SMRC and RBS accreditations.',
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="section about" ref={ref}>
      <div className="container">
        <div className="about__grid">
          {/* Left Column: Architectural Imagery */}
          <motion.div
            className="about__image-col"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={0}
            variants={fadeUp}
          >
            <div className="about__image-stack">
              <div className="about__corner" aria-hidden="true" />

              <div className="about__image-main">
                <img
                  src="/images/about-main.jpg"
                  alt="SNC Construction engineering site inspection"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=900&q=80';
                  }}
                />
              </div>

              <div className="about__image-accent">
                <img
                  src="/images/about-accent.jpg"
                  alt="Precision construction inspection"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=700&q=80';
                  }}
                />
              </div>

              {/* Certified Quality Badge on Visual */}
              <div className="about__cert-panel">
                <div className="about__cert-title">Corporate Quality</div>
                <div className="about__cert-list">
                  {COMPANY.certifications.map((cert) => (
                    <div key={cert} className="about__cert-item">
                      <Shield size={13} />
                      {cert}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Corporate Profile & Pillars */}
          <motion.div
            className="about__text-col"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={0.2}
            variants={fadeUp}
          >
            <div>
              <span className="section-label">About The Company</span>
              <h2 className="heading-xl">
                Engineering Authority,<br />Uncompromising Standards
              </h2>
              <span className="section-divider" />
            </div>

            <p className="about__intro">
              <strong>{COMPANY.name}</strong> (CIN: {COMPANY.cin}) is an established corporate contracting 
              and civil engineering firm based in Rourkela, Sundargarh, Odisha. With a resolute motto of 
              <em> &quot;{COMPANY.tagline}&quot;</em>, we deliver full-scope turnkey construction, real estate 
              development, and MEP solutions for commercial and residential partners.
            </p>

            {/* Strategic Pillars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {PILLARS.map((p) => (
                <div
                  key={p.num}
                  style={{
                    display: 'flex',
                    gap: '1.25rem',
                    paddingBottom: '1.25rem',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.3rem',
                      fontWeight: 900,
                      color: 'var(--gold)',
                      lineHeight: 1,
                      minWidth: '32px',
                    }}
                  >
                    {p.num}
                  </span>
                  <div>
                    <h4
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: 'var(--navy-deep)',
                        marginBottom: '0.35rem',
                      }}
                    >
                      {p.title}
                    </h4>
                    <p style={{ fontSize: '0.86rem', color: 'var(--text-mid)', lineHeight: 1.6 }}>
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Leadership Section */}
            <div className="about__leadership">
              <h3 className="heading-md" style={{ marginBottom: '1rem', color: 'var(--navy-deep)' }}>
                Executive Leadership
              </h3>
              <div className="about__leader-cards">
                {COMPANY.leadership.map((leader) => (
                  <div key={leader.name} className="about__leader-card">
                    <div className="about__leader-avatar">
                      <UserCheck size={20} />
                    </div>
                    <div>
                      <div className="about__leader-name">{leader.name}</div>
                      <div className="about__leader-role">{leader.role}</div>
                      {leader.note && (
                        <div style={{ fontSize: '0.72rem', color: 'var(--gold)', marginTop: '2px' }}>
                          {leader.note}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp Direct Action */}
            <div style={{ marginTop: '0.5rem' }}>
              <a
                href={getWhatsAppURL('Hello! I would like to learn more about Srinivas Nayak & Construction and schedule a meeting.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-navy"
                style={{ borderRadius: 0, textTransform: 'uppercase', letterSpacing: '0.06em' }}
              >
                Schedule Engineering Consultation
                <ArrowUpRight size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
