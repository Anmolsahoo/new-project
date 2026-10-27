import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  FileCheck,
  Tractor,
  Building2,
  HardHat,
  Hammer,
  Warehouse,
  PanelRightClose,
  Trees,
  Zap,
  Droplet,
  Paintbrush,
  Grid,
  Maximize,
  Briefcase,
  ArrowRight,
  MessageCircle,
  X,
  CheckCircle2,
} from 'lucide-react';
import { COMPANY, getWhatsAppURL } from '../config/company';
import '../styles/stats-services.css';

const ICON_MAP = {
  'drawing-approval': FileCheck,
  'land-development': Tractor,
  'building-construction': Building2,
  'structural-steelwork': HardHat,
  'metal-fabrication': Hammer,
  'truss-roofing': Warehouse,
  'doors-windows': PanelRightClose,
  'woodwork-carpentry': Trees,
  'electrical-work': Zap,
  'plumbing-sanitary': Droplet,
  'painting-work': Paintbrush,
  'tile-installation': Grid,
  'false-ceiling': Maximize,
  'related-building-services': Briefcase,
};

const CATEGORIES = [
  'All',
  'Civil Works',
  'Fabrication & Structural',
  'MEP & Utilities',
  'Finishing Works',
  'Interiors & Joinery',
  'Planning & Approvals',
];

export default function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedService, setSelectedService] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const filteredServices = activeCategory === 'All'
    ? COMPANY.services
    : COMPANY.services.filter(s => s.category === activeCategory);

  return (
    <section id="services" className="section section--dark services" ref={ref} aria-label="Our Services">
      <div className="container">
        {/* Section Header */}
        <div className="services__header">
          <div>
            <span className="section-eyebrow">Comprehensive Capabilities</span>
            <h2 className="heading-xl">Our Specialized Services</h2>
            <span className="section-divider" />
          </div>
          <p className="services__intro">
            Providing 14 integrated construction, structural fabrication, MEP, and architectural finishing
            services under licensed engineering supervision. Work executed in accordance with applicable CPWD guidelines.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="services__filter-bar" role="tablist" aria-label="Filter services by category">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`services__filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              role="tab"
              aria-selected={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 14 Services Grid */}
        <motion.div layout className="services__grid-14">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => {
              const Icon = ICON_MAP[service.id] || Building2;
              return (
                <motion.div
                  layout
                  key={service.id}
                  className="service-card-14"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                  onClick={() => setSelectedService(service)}
                >
                  <div className="service-card-14__top">
                    <span className="service-card-14__category">{service.category}</span>
                    <div className="service-card-14__icon">
                      <Icon size={24} />
                    </div>
                  </div>

                  <h3 className="service-card-14__title">{service.title}</h3>
                  <p className="service-card-14__desc">{service.shortDesc}</p>

                  <div className="service-card-14__deliverables">
                    {service.deliverables.slice(0, 2).map((item, i) => (
                      <span key={i} className="service-card-14__tag">
                        <CheckCircle2 size={11} style={{ color: 'var(--gold)' }} />
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="service-card-14__footer">
                    <span className="service-card-14__link">
                      View Details <ArrowRight size={14} />
                    </span>
                    <a
                      href={getWhatsAppURL(`Hello Srinivas Nayak & Construction, I would like to inquire about your service: "${service.title}".`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="service-card-14__wa"
                      onClick={(e) => e.stopPropagation()}
                      title={`Enquire on WhatsApp about ${service.title}`}
                    >
                      <MessageCircle size={15} />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Call to Action */}
        <div className="services__bottom-cta">
          <div>
            <h4 style={{ color: '#fff', fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.35rem' }}>
              Need a Custom Construction or Fabrication Scope?
            </h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.88rem' }}>
              Our engineering team coordinates turnkey solutions across multiple service categories.
            </p>
          </div>
          <a
            href={getWhatsAppURL('Hello Srinivas Nayak & Construction, I need a custom consultation for my project.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <MessageCircle size={17} />
            Consult Our Engineering Team
          </a>
        </div>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div
            className="service-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
          >
            <motion.div
              className="service-modal__backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
            />
            <motion.div
              className="service-modal__panel"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            >
              <button
                className="service-modal__close"
                onClick={() => setSelectedService(null)}
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>

              <span className="section-eyebrow">{selectedService.category}</span>
              <h3 id="service-modal-title" className="heading-md" style={{ color: 'var(--navy)', marginBottom: '0.75rem' }}>
                {selectedService.title}
              </h3>
              <p style={{ color: 'var(--text-dark)', fontSize: '0.94rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                {selectedService.shortDesc}
              </p>

              <div style={{ marginBottom: '1.75rem' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '0.75rem' }}>
                  Key Execution Deliverables
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.65rem' }}>
                  {selectedService.deliverables.map((del, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.55rem 0.85rem',
                        background: 'var(--warm-white)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.84rem',
                        fontWeight: 600,
                        color: 'var(--navy)',
                      }}
                    >
                      <CheckCircle2 size={15} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                      {del}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
                <a
                  href={getWhatsAppURL(`Hello Srinivas Nayak & Construction, I would like to request an estimate and consultation for ${selectedService.title}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ flex: 1, minWidth: '200px' }}
                >
                  <MessageCircle size={16} />
                  Request WhatsApp Quote
                </a>
                <button
                  onClick={() => setSelectedService(null)}
                  className="btn btn-outline-gold"
                  style={{ padding: '0.75rem 1.5rem' }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
