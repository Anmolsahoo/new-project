import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Building2,
  HardHat,
  Hammer,
  Warehouse,
  Paintbrush,
  Layers,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { getWhatsAppURL } from '../config/company';

const EXPERTISE_PILLARS = [
  {
    id: 'building-construction',
    icon: Building2,
    title: 'Building Construction',
    eyebrow: 'Civil & Turnkey Execution',
    headline: 'Engineered Foundation to Superstructure',
    desc: 'Turnkey execution of residential houses, luxury duplexes, multi-tier commercial facilities, and institutional structures. Every column, beam, and slab is poured with rigorous quality checks, aggregate inspection, and adherence to structural drawings.',
    keyPoints: [
      'Site preparation, soil testing coordination & deep foundations',
      'RCC columns, plinth beams, and seismic framing design',
      'Fly-ash & red clay brick masonry with precision curing',
      'Structural safety inspection aligned with CPWD standards',
    ],
    image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'structural-steelwork',
    icon: HardHat,
    title: 'Structural Steelwork',
    eyebrow: 'Industrial & Heavy Frameworks',
    headline: 'High-Tensile Steel Fabrication & Erection',
    desc: 'Heavy structural steel framing designed for industrial sheds, warehouses, commercial canopies, and mezzanine floors. Our fabrication process encompasses certified welding, bolt connection torque checks, and zinc chromate corrosion protection.',
    keyPoints: [
      'ISMB / ISMC / H-beam column and rafter fabrication',
      'High-strength anchor bolt grouting & base plate setting',
      'Heavy-duty industrial gantry and crane girder frames',
      'Certified welding inspection & anti-corrosion primer coating',
    ],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'metal-fabrication',
    icon: Hammer,
    title: 'Metal Fabrication',
    eyebrow: 'Architectural & Security Metalwork',
    headline: 'Custom Mild Steel & Stainless Steel Craftsmanship',
    desc: 'Custom architectural metal fabrication supporting building development. From monumental motorized gates and exterior security grilles to polished stainless steel handrails and structural staircase stringers.',
    keyPoints: [
      'Motorized & manual heavy entrance gates with ornate design',
      'Mild Steel & Stainless Steel laser-cut railings and banisters',
      'High-security window grilles and balcony safety screens',
      'Custom fabricated utility racks, canopies, and access ladders',
    ],
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'roofing-truss',
    icon: Warehouse,
    title: 'Roofing & Truss Installation',
    eyebrow: 'Large-Span Structural Roofs',
    headline: 'Engineered Tubular Trusses & Weatherproof Cladding',
    desc: 'Turnkey installation of tubular and angular steel roof trusses designed to withstand high wind velocity and heavy monsoons. Integrated with pre-painted profile sheets, insulation barriers, and industrial gutter systems.',
    keyPoints: [
      'Clear-span tubular truss design for warehouses and halls',
      'Corrugated Galvalume & color-coated roofing sheets',
      'Heavy-duty rainwater downspouts, flashing, and ridge caps',
      'Thermal insulation layer installation for climate control',
    ],
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'interior-finishing',
    icon: Paintbrush,
    title: 'Interior & Finishing Work',
    eyebrow: 'Aesthetic Refinement & Carpentry',
    headline: 'Woodwork, False Ceilings, Tiling & Painting',
    desc: 'High-end interior refinement bringing architectural spaces to life. Our finishing tradesmen execute laser-leveled vitrified tile laying, designer gypsum false ceilings, hardwood door framing, and multi-coat weatherproof paint systems.',
    keyPoints: [
      'Laser-aligned Italian marble and vitrified floor tiling',
      'Gypsum false ceiling installations with LED cove profiles',
      'Hardwood door frames, modular joinery, and wardrobe carpentry',
      'Interior emulsion putty coats and silicone exterior texture paints',
    ],
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'integrated-services',
    icon: Layers,
    title: 'Integrated Building Services',
    eyebrow: 'Turnkey MEP & Project Management',
    headline: 'Seamless Electrical, Plumbing & Site Coordination',
    desc: 'End-to-end integration of essential building utilities ensuring trouble-free occupancy. We coordinate concealed conduit wiring, three-phase power distribution, sanitary drainage systems, and site land development.',
    keyPoints: [
      'Concealed copper electrical wiring with MCB & earthing grid',
      'CPVC/UPVC water distribution and sanitary waste lines',
      'Drawing approval coordination and statutory guidance',
      'Turnkey site management and unified engineering accountability',
    ],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=85',
  },
];

export default function ExpertiseSection() {
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-70px' });

  const activePillar = EXPERTISE_PILLARS[activeTab];

  return (
    <section id="expertise" className="section section--white expertise" ref={ref} aria-label="Engineering Expertise">
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <span className="section-eyebrow">Technical Mastery</span>
          <h2 className="heading-xl">Construction &amp; Engineering Expertise</h2>
          <span className="section-divider" />
          <p style={{ color: 'var(--text-muted)', maxWidth: '650px', fontSize: '1.02rem', lineHeight: 1.7 }}>
            Balancing technical engineering discipline with premium architectural execution across 6 specialized core domains.
          </p>
        </div>

        {/* Tab Navigation Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1px',
            background: 'rgba(53, 64, 82, 0.1)',
            border: '1px solid rgba(53, 64, 82, 0.1)',
            marginBottom: '3rem',
          }}
          role="tablist"
        >
          {EXPERTISE_PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            const isSelected = activeTab === index;
            return (
              <button
                key={pillar.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveTab(index)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '1.15rem 1rem',
                  background: isSelected ? 'var(--navy)' : '#fff',
                  color: isSelected ? '#fff' : 'var(--text-dark)',
                  fontWeight: 700,
                  fontSize: '0.84rem',
                  textAlign: 'left',
                  transition: 'var(--transition)',
                  borderBottom: isSelected ? '3px solid var(--gold)' : '3px solid transparent',
                  cursor: 'pointer',
                }}
              >
                <Icon
                  size={18}
                  style={{
                    color: isSelected ? 'var(--gold)' : 'var(--navy-mid)',
                    flexShrink: 0,
                  }}
                />
                <span>{pillar.title}</span>
              </button>
            );
          })}
        </div>

        {/* Split Screen Display */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
            background: 'var(--warm-white)',
            border: '1px solid var(--border-light)',
            padding: 'clamp(1.5rem, 4vw, 3rem)',
          }}
        >
          {/* Content Left */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePillar.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
            >
              <span
                style={{
                  display: 'inline-block',
                  color: 'var(--gold-dark)',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem',
                }}
              >
                {activePillar.eyebrow}
              </span>

              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.4rem, 2.5vw, 2.1rem)',
                  fontWeight: 800,
                  color: 'var(--navy)',
                  lineHeight: 1.25,
                  marginBottom: '1rem',
                }}
              >
                {activePillar.headline}
              </h3>

              <p
                style={{
                  color: 'var(--text-dark)',
                  fontSize: '0.96rem',
                  lineHeight: 1.7,
                  marginBottom: '1.75rem',
                }}
              >
                {activePillar.desc}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '2rem' }}>
                {activePillar.keyPoints.map((point, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.6rem',
                      fontSize: '0.88rem',
                      color: 'var(--text-dark)',
                      fontWeight: 500,
                    }}
                  >
                    <CheckCircle2 size={16} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '3px' }} />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <a
                href={getWhatsAppURL(`Hello Srinivas Nayak & Construction, I would like to inquire about your engineering expertise in: "${activePillar.title}".`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-navy"
              >
                Inquire About {activePillar.title}
                <ArrowRight size={16} />
              </a>
            </motion.div>
          </AnimatePresence>

          {/* Image Right */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePillar.id + '-img'}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45 }}
              style={{
                position: 'relative',
                aspectRatio: '16/11',
                overflow: 'hidden',
                borderRadius: 'var(--radius-sm)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <img
                src={activePillar.image}
                alt={activePillar.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(16, 42, 67, 0.75) 0%, transparent 60%)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '1.5rem',
                  right: '1.5rem',
                  color: '#fff',
                }}
              >
                <div style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-light)' }}>
                  SNC Engineering Discipline
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 700 }}>
                  {activePillar.title}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
