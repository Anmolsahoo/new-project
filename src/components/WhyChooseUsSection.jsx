import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  PackageCheck,
  Hammer,
  Eye,
  GitMerge,
  MessageSquare,
  Award,
} from 'lucide-react';

const COMMITMENTS = [
  {
    icon: PackageCheck,
    title: 'Comprehensive Service Offering',
    desc: 'From initial drawing approval coordination to roofing, plumbing, electrical, and turnkey tiling — covering the complete project lifecycle.',
  },
  {
    icon: Hammer,
    title: 'Integrated Construction & Fabrication',
    desc: 'In-house capabilities spanning both civil RCC masonry and heavy structural steel metalwork, reducing multi-contractor delays.',
  },
  {
    icon: Eye,
    title: 'Meticulous Attention to Detail',
    desc: 'Focus on precision alignment, proper concrete curing periods, joint sealing, and flawless architectural finishing.',
  },
  {
    icon: GitMerge,
    title: 'Coordinated Building Solutions',
    desc: 'Unified project scheduling ensuring civil, MEP, joinery, and painting trades work in synchronized sequence.',
  },
  {
    icon: MessageSquare,
    title: 'Clear, Transparent Communication',
    desc: 'Regular milestone updates, transparent material quantity breakdowns, and direct accessibility to project leadership.',
  },
  {
    icon: Award,
    title: 'Quality-Focused Workmanship',
    desc: 'Committed to delivering reliable, durable construction aligned with applicable engineering principles and CPWD guidelines.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function WhyChooseUsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-70px' });

  return (
    <section className="section section--warm why-choose" ref={ref} aria-label="Why Choose Our Company">
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '780px', marginBottom: '3.5rem' }}>
          <span className="section-eyebrow">Service Commitments</span>
          <h2 className="heading-xl">Why Partner with Srinivas Nayak &amp; Construction</h2>
          <span className="section-divider" />
          <p style={{ color: 'var(--text-muted)', fontSize: '1.02rem', lineHeight: 1.7 }}>
            Our business capabilities are built around technical engineering discipline,
            multi-trade synergy, and client-centric reliability.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {COMMITMENTS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                custom={index * 0.08}
                variants={fadeUp}
                style={{
                  background: '#fff',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '2.25rem 2rem',
                  display: 'flex',
                  gap: '1.25rem',
                  alignItems: 'flex-start',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'var(--transition)',
                }}
                whileHover={{ y: -5, boxShadow: 'var(--shadow-md)', borderColor: 'var(--gold)' }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(16, 42, 67, 0.06)',
                    color: 'var(--navy)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={22} style={{ color: 'var(--navy-mid)' }} />
                </div>

                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: 'var(--navy)',
                      marginBottom: '0.5rem',
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.65 }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
