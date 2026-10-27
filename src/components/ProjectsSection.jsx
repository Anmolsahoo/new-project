import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, MessageCircle, AlertCircle } from 'lucide-react';
import { PROJECTS, PROJECT_CATEGORIES } from '../data/projects';
import { getWhatsAppURL } from '../config/company';
import '../styles/projects.css';

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function ProjectsSection({ onSelectProject }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="section projects" aria-label="Our Work and Project Portfolio">
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: '2rem' }}>
          <span className="section-eyebrow">Portfolio Showcase</span>
          <h2 className="heading-xl">Our Work &amp; Project Capabilities</h2>
          <span className="section-divider" />
          <p style={{ marginTop: '0.75rem', maxWidth: '680px', color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7 }}>
            Showcasing architectural and engineering prototypes spanning palaces, luxury residences,
            commercial complexes, heavy structural steel frameworks, and interior finishes.
          </p>
        </div>

        {/* Factual Integrity Demonstration Banner */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            padding: '1rem 1.5rem',
            background: 'rgba(198, 161, 91, 0.08)',
            borderLeft: '3px solid var(--gold)',
            borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
            marginBottom: '2.5rem',
          }}
        >
          <AlertCircle size={18} style={{ color: 'var(--gold-dark)', flexShrink: 0 }} />
          <p style={{ fontSize: '0.82rem', color: 'var(--text-dark)', lineHeight: 1.5 }}>
            <strong>Demonstration Benchmarks:</strong> The architectural showcases below illustrate SNC's
            stated capabilities across our 14 service areas. Verified photographs of client projects will replace
            these demonstration benchmarks upon authorized provision.
          </p>
        </div>

        {/* Filters */}
        <div className="projects__filters" role="group" aria-label="Filter projects by sector">
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`projects__filter-btn ${activeFilter === cat.id ? 'projects__filter-btn--active' : ''}`}
              onClick={() => setActiveFilter(cat.id)}
              aria-pressed={activeFilter === cat.id}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="projects__grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onSelect={() => onSelectProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, onSelect }) {
  const waMsg = `Hello Srinivas Nayak & Construction, I would like to inquire about the project benchmark: "${project.title}" (${project.categoryLabel || project.category}). Please share structural specifications and an estimate.`;

  return (
    <motion.article
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.95 }}
      custom={index}
      className="project-card"
      onClick={onSelect}
      style={{ cursor: 'pointer' }}
    >
      {/* Cover Image */}
      <div className="project-card__image">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <span className="project-card__category">
          {project.categoryLabel || project.category}
        </span>

        {/* Demonstration badge */}
        <span
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            zIndex: 3,
            padding: '0.25rem 0.65rem',
            background: 'rgba(16, 42, 67, 0.88)',
            border: '1px solid var(--gold)',
            color: 'var(--gold-light)',
            fontSize: '0.62rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          Demonstration
        </span>
      </div>

      {/* Body */}
      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__subtitle">{project.subtitle}</p>

        {project.location && (
          <p className="project-card__location">
            <MapPin size={13} />
            {project.location}
          </p>
        )}

        <div className="project-card__highlights">
          {project.highlights.slice(0, 3).map((h) => (
            <span key={h} className="project-card__tag">
              {h}
            </span>
          ))}
        </div>
      </div>

      {/* Footer (Reveals on Hover) */}
      <div className="project-card__footer" onClick={(e) => e.stopPropagation()}>
        <button
          className="btn btn-navy btn-sm"
          onClick={onSelect}
          aria-label={`View details and materials for ${project.title}`}
        >
          <ArrowRight size={14} />
          View Details &amp; Estimate
        </button>
        <a
          href={getWhatsAppURL(waMsg)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp btn-sm"
          aria-label={`Enquire on WhatsApp about ${project.title}`}
        >
          <MessageCircle size={14} />
          Enquire
        </a>
      </div>
    </motion.article>
  );
}
