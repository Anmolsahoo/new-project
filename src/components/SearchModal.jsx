import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Building, Wrench, Package, FileText, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { COMPANY } from '../config/company';
import { PROJECTS } from '../data/projects';
import { RAW_MATERIALS } from '../data/rawMaterials';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search through services, projects, raw materials, and pages
  const serviceMatches = q
    ? COMPANY.services.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.shortDesc.toLowerCase().includes(q)
      )
    : [];

  const projectMatches = q
    ? PROJECTS.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    : [];

  const materialMatches = q
    ? RAW_MATERIALS.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.category.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q)
      )
    : [];

  const handleSelect = (url) => {
    onClose();
    navigate(url);
  };

  const totalResults = serviceMatches.length + projectMatches.length + materialMatches.length;

  return (
    <AnimatePresence>
      <div className="search-modal" role="dialog" aria-modal="true" aria-label="Search website">
        <motion.div
          className="search-modal__backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        <motion.div
          className="search-modal__container"
          initial={{ opacity: 0, y: -25, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -25, scale: 0.98 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Search Header Bar */}
          <div className="search-modal__input-wrap">
            <Search size={22} className="search-modal__icon" />
            <input
              ref={inputRef}
              type="text"
              className="search-modal__input"
              placeholder="Search services, raw materials, commercial, residential, private projects..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                className="search-modal__clear"
                onClick={() => setQuery('')}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
            <button className="search-modal__close-btn" onClick={onClose} aria-label="Close search">
              ESC
            </button>
          </div>

          {/* Quick Suggestions / Results */}
          <div className="search-modal__body">
            {!q ? (
              <div className="search-modal__quick-links">
                <span className="search-modal__section-title">Popular Searches</span>
                <div className="search-modal__pills">
                  {['Palaces', 'Structural Steel', 'Cement OPC 53', 'TMT Steel Fe 550D', 'Drawing Approvals', 'Villas', 'Roofing Trusses'].map((term) => (
                    <button
                      key={term}
                      className="search-modal__pill"
                      onClick={() => setQuery(term)}
                    >
                      {term}
                    </button>
                  ))}
                </div>

                <div className="search-modal__nav-quick">
                  <span className="search-modal__section-title">Direct Page Links</span>
                  <div className="search-modal__nav-grid">
                    <button onClick={() => handleSelect('/about')} className="search-modal__nav-item">
                      <FileText size={16} /> <span>About The Company</span> <ChevronRight size={14} />
                    </button>
                    <button onClick={() => handleSelect('/leadership')} className="search-modal__nav-item">
                      <Building size={16} /> <span>Executive Leadership</span> <ChevronRight size={14} />
                    </button>
                    <button onClick={() => handleSelect('/expertise')} className="search-modal__nav-item">
                      <Wrench size={16} /> <span>Engineering Expertise</span> <ChevronRight size={14} />
                    </button>
                    <button onClick={() => handleSelect('/projects/private')} className="search-modal__nav-item">
                      <Package size={16} /> <span>Raw Materials &amp; Prices</span> <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ) : totalResults === 0 ? (
              <div className="search-modal__empty">
                <p>No results found for &ldquo;{query}&rdquo;.</p>
                <span>Try searching for cement, steel, palace, commercial, residential, or approvals.</span>
              </div>
            ) : (
              <div className="search-modal__results">
                {/* Services */}
                {serviceMatches.length > 0 && (
                  <div className="search-modal__group">
                    <span className="search-modal__group-title">Services ({serviceMatches.length})</span>
                    {serviceMatches.map((s) => (
                      <div
                        key={s.id}
                        className="search-modal__result-item"
                        onClick={() => handleSelect(`/expertise#${s.id}`)}
                      >
                        <div className="search-modal__result-icon">
                          <Wrench size={16} />
                        </div>
                        <div className="search-modal__result-text">
                          <div className="search-modal__result-title">{s.title}</div>
                          <div className="search-modal__result-desc">{s.shortDesc}</div>
                        </div>
                        <ArrowRight size={14} className="search-modal__result-arrow" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Projects */}
                {projectMatches.length > 0 && (
                  <div className="search-modal__group">
                    <span className="search-modal__group-title">Projects ({projectMatches.length})</span>
                    {projectMatches.map((p) => (
                      <div
                        key={p.id}
                        className="search-modal__result-item"
                        onClick={() => handleSelect(`/projects?project=${p.id}`)}
                      >
                        <div className="search-modal__result-icon">
                          <Building size={16} />
                        </div>
                        <div className="search-modal__result-text">
                          <div className="search-modal__result-title">{p.title}</div>
                          <div className="search-modal__result-desc">{p.categoryLabel} &bull; {p.location}</div>
                        </div>
                        <ArrowRight size={14} className="search-modal__result-arrow" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Raw Materials */}
                {materialMatches.length > 0 && (
                  <div className="search-modal__group">
                    <span className="search-modal__group-title">Raw Materials &amp; Pricing ({materialMatches.length})</span>
                    {materialMatches.map((m) => (
                      <div
                        key={m.id}
                        className="search-modal__result-item"
                        onClick={() => handleSelect(`/projects/private#${m.id}`)}
                      >
                        <div className="search-modal__result-icon">
                          <Package size={16} />
                        </div>
                        <div className="search-modal__result-text">
                          <div className="search-modal__result-title">{m.name}</div>
                          <div className="search-modal__result-desc">₹{m.unitPrice} per {m.unit} &bull; {m.brand}</div>
                        </div>
                        <ArrowRight size={14} className="search-modal__result-arrow" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
