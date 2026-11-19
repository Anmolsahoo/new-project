import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, MapPin, Check, Sparkles } from 'lucide-react';
import { ODISHA_DISTRICTS } from '../data/odishaDistricts';

export default function DistrictModal({ isOpen, onClose, selectedDistrict, onSelectDistrict }) {
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      document.body.style.overflow = '';
      setSearchQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredDistricts = ODISHA_DISTRICTS.filter((d) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      d.name.toLowerCase().includes(q) ||
      d.shortName.toLowerCase().includes(q) ||
      d.zone.toLowerCase().includes(q)
    );
  });

  const handleSelect = (district) => {
    onSelectDistrict(district);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="district-modal-backdrop" onClick={onClose}>
        <motion.div
          className="district-modal-card"
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="district-modal-title"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="district-modal-close"
            aria-label="Close district selection modal"
          >
            <X size={20} />
          </button>

          {/* Modal Header (Matching JSW One Homes Screenshot) */}
          <div className="district-modal-header">
            <h2 id="district-modal-title" className="district-modal-title">
              Welcome to Srinivas Homes
            </h2>
            <p className="district-modal-subtitle">
              Select your city to get started
            </p>
          </div>

          {/* Search Bar */}
          <div className="district-modal-search-wrap">
            <Search size={18} className="district-modal-search-icon" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search your district or city in Odisha (e.g. Rourkela, Bhubaneswar, Cuttack)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="district-modal-search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="district-modal-search-clear"
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Popular Quick Filter Pills */}
          {!searchQuery && (
            <div className="district-modal-popular-strip">
              <span className="district-modal-popular-label">
                <Sparkles size={13} style={{ color: 'var(--gold)' }} />
                Major Hubs:
              </span>
              <div className="district-modal-popular-tags">
                {ODISHA_DISTRICTS.filter((d) => d.popular).slice(0, 5).map((d) => (
                  <button
                    key={d.id}
                    onClick={() => handleSelect(d)}
                    className={`district-popular-tag ${selectedDistrict?.id === d.id ? 'district-popular-tag--active' : ''}`}
                  >
                    {d.shortName}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* All 30 Odisha Districts Grid with Scrollbar (Matches Screenshot Style) */}
          <div className="district-modal-grid-container">
            {filteredDistricts.length > 0 ? (
              <div className="district-modal-grid">
                {filteredDistricts.map((district) => {
                  const isSelected = selectedDistrict?.id === district.id;
                  return (
                    <button
                      key={district.id}
                      onClick={() => handleSelect(district)}
                      className={`district-pill-btn ${isSelected ? 'district-pill-btn--selected' : ''}`}
                      title={`Select ${district.name}`}
                    >
                      <span className="district-pill-name">{district.name}</span>
                      {isSelected && (
                        <Check size={16} className="district-pill-check" />
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="district-modal-empty">
                <MapPin size={28} style={{ color: 'var(--gold)', marginBottom: '0.5rem' }} />
                <p>No district found matching &ldquo;{searchQuery}&rdquo;</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="btn btn-outline-gold btn-sm"
                  style={{ marginTop: '0.75rem' }}
                >
                  View All Odisha Districts
                </button>
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="district-modal-footer">
            <span className="district-modal-footer-text">
              Turnkey residential construction, structural drawings &amp; approvals across all 30 districts of Odisha.
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
