import { useState, useEffect } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Package, Building, Home, MapPin, MessageCircle, AlertCircle } from 'lucide-react';
import { PROJECTS, PROJECT_CATEGORIES } from '../data/projects';
import ProjectDetails from '../components/ProjectDetails';
import { getWhatsAppURL } from '../config/company';

export default function ProjectsPage() {
  const { sector } = useParams();
  const location = useLocation();

  // Determine active category from route or query params
  const [activeCategory, setActiveCategory] = useState(() => {
    if (sector === 'commercial') return 'commercial';
    if (sector === 'residential') return 'residential';
    return 'all';
  });

  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (sector === 'commercial') setActiveCategory('commercial');
    else if (sector === 'residential') setActiveCategory('residential');
  }, [sector]);

  // Handle direct query param ?project=...
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pid = params.get('project');
    if (pid) {
      const match = PROJECTS.find((p) => p.id === pid);
      if (match) setSelectedProject(match);
    }
  }, [location.search]);

  const filtered = activeCategory === 'all'
    ? PROJECTS.filter((p) => p.category !== 'private')
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div className="projects-page" style={{ paddingTop: 'var(--header-h)' }}>
      <AnimatePresence mode="wait">
        {selectedProject ? (
          <ProjectDetails
            key="details"
            project={selectedProject}
            onBack={() => setSelectedProject(null)}
          />
        ) : (
          <div key="list">
            {/* Page Header */}
            <section
              style={{
                background: 'var(--navy-darkest)',
                padding: 'clamp(3.5rem, 6vw, 5.5rem) 0',
                borderBottom: '1px solid var(--border-gold)',
                position: 'relative',
              }}
            >
              <div className="container">
                <span className="section-eyebrow">Project Portfolio &bull; Architectural Showcase</span>
                <h1 className="heading-hero" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', marginBottom: '1.25rem' }}>
                  Commercial &amp; <span style={{ color: 'var(--gold)' }}>Residential Works</span>
                </h1>
                <p style={{ color: 'rgba(255, 255, 255, 0.78)', maxWidth: '780px', fontSize: '1.05rem', lineHeight: 1.75 }}>
                  Discover our portfolio of corporate office complexes, warehouses, residential apartments,
                  and luxury family residences built across Odisha.
                </p>
              </div>
            </section>

            {/* Content Section */}
            <section className="section section--warm">
              <div className="container">
                {/* Sector Switch Tabs */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    marginBottom: '2.5rem',
                    borderBottom: '1px solid var(--border-light)',
                    paddingBottom: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button
                      className={`btn btn-sm ${activeCategory === 'all' ? 'btn-navy' : 'btn-outline-gold'}`}
                      onClick={() => setActiveCategory('all')}
                    >
                      All Works
                    </button>
                    <button
                      className={`btn btn-sm ${activeCategory === 'commercial' ? 'btn-navy' : 'btn-outline-gold'}`}
                      onClick={() => setActiveCategory('commercial')}
                    >
                      Commercial
                    </button>
                    <button
                      className={`btn btn-sm ${activeCategory === 'residential' ? 'btn-navy' : 'btn-outline-gold'}`}
                      onClick={() => setActiveCategory('residential')}
                    >
                      Residential
                    </button>
                    <button
                      className={`btn btn-sm ${activeCategory === 'premium-buildings' ? 'btn-navy' : 'btn-outline-gold'}`}
                      onClick={() => setActiveCategory('premium-buildings')}
                    >
                      Palaces &amp; Premium
                    </button>
                  </div>

                  {/* Private & Raw Materials CTA banner link */}
                  <Link
                    to="/projects/private"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.65rem 1.25rem',
                      background: 'var(--gold)',
                      color: 'var(--navy-darkest)',
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      borderRadius: 'var(--radius-sm)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}
                  >
                    <Package size={16} />
                    <span>Private: View Raw Materials &amp; Prices</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>

                {/* Demonstration Alert Banner */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.85rem 1.25rem',
                    background: 'rgba(198, 161, 91, 0.08)',
                    borderLeft: '3px solid var(--gold)',
                    borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                    marginBottom: '2.5rem',
                    fontSize: '0.84rem',
                    color: 'var(--text-dark)',
                  }}
                >
                  <AlertCircle size={16} style={{ color: 'var(--gold-dark)', flexShrink: 0 }} />
                  <span>
                    <strong>Demonstration Benchmarks:</strong> All project entries below showcase our civil and fabrication capabilities. Authorized photographs of completed client developments will replace these prototypes.
                  </span>
                </div>

                {/* Projects Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
                    gap: '2rem',
                  }}
                >
                  {filtered.map((project) => (
                    <div
                      key={project.id}
                      className="project-card"
                      onClick={() => setSelectedProject(project)}
                      style={{ cursor: 'pointer', background: '#fff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}
                    >
                      <div className="project-card__image" style={{ height: '240px', position: 'relative' }}>
                        <img
                          src={project.image}
                          alt={project.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <span className="project-card__category">
                          {project.categoryLabel}
                        </span>
                        <span
                          style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            padding: '0.2rem 0.6rem',
                            background: 'rgba(6, 19, 36, 0.85)',
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

                      <div className="project-card__body" style={{ padding: '1.75rem' }}>
                        <h3 className="project-card__title" style={{ color: 'var(--navy)', fontSize: '1.2rem', fontWeight: 800 }}>
                          {project.title}
                        </h3>
                        <p className="project-card__subtitle" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                          {project.subtitle}
                        </p>

                        <div className="project-card__location" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-dark)', fontSize: '0.82rem', marginBottom: '1.25rem' }}>
                          <MapPin size={14} style={{ color: 'var(--gold-dark)' }} />
                          <span>{project.location}</span>
                        </div>

                        <div style={{ display: 'flex', gap: '0.65rem' }}>
                          <button
                            className="btn btn-navy btn-sm"
                            style={{ flex: 1 }}
                            onClick={() => setSelectedProject(project)}
                          >
                            View Materials &amp; Specs
                          </button>
                          <a
                            href={getWhatsAppURL(`Hello Srinivas Nayak & Construction, I would like to enquire about: "${project.title}".`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-whatsapp btn-sm"
                            onClick={(e) => e.stopPropagation()}
                            title="Enquire on WhatsApp"
                          >
                            <MessageCircle size={15} />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
