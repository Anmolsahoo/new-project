import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Phone, MessageCircle, Info, Package } from 'lucide-react';
import { COMPANY, getWhatsAppURL } from '../config/company';
import { PROJECT_CATEGORIES } from '../data/projects';
import '../styles/projects.css';

const INR = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

function formatINR(value) {
  return INR.format(value);
}

function validateQty(val) {
  const n = parseFloat(val);
  return !isNaN(n) && n >= 0;
}

export default function ProjectDetails({ project, onBack }) {
  // Editable quantities per material
  const [qtys, setQtys] = useState(
    () => Object.fromEntries(project.materials.map((m, i) => [i, m.qty]))
  );
  const [errors, setErrors] = useState({});

  const handleQtyChange = useCallback((idx, val) => {
    setQtys(prev => ({ ...prev, [idx]: val }));
    if (val === '' || !validateQty(val)) {
      setErrors(prev => ({ ...prev, [idx]: true }));
    } else {
      setErrors(prev => { const n = { ...prev }; delete n[idx]; return n; });
    }
  }, []);

  const lines = project.materials.map((m, i) => {
    const qty = parseFloat(qtys[i]);
    const valid = validateQty(qtys[i]) && qty >= 0;
    const amount = valid ? qty * m.unitPrice : null;
    return { ...m, editQty: qtys[i], valid, amount };
  });

  const total = lines.every(l => l.valid)
    ? lines.reduce((acc, l) => acc + (l.amount ?? 0), 0)
    : null;

  const categoryLabel = PROJECT_CATEGORIES.find(c => c.id === project.category)?.label ?? project.category;

  const buildWaMessage = () => {
    let msg = `Hello SNC!\n\nProject Enquiry: *${project.title}*\nCategory: ${categoryLabel}\n`;
    if (project.location) msg += `Location: ${project.location}\n`;
    msg += `\n*Estimated Materials:*\n`;
    lines.forEach(l => {
      const amt = l.valid ? `₹${(l.amount ?? 0).toLocaleString('en-IN')}` : '—';
      msg += `• ${l.name}: ${l.editQty} ${l.unit} × ₹${l.unitPrice} = ${amt}\n`;
    });
    if (total !== null) msg += `\n*Total Estimate: ₹${total.toLocaleString('en-IN')}*\n`;
    msg += `\nPlease share a detailed quotation. Thank you!`;
    return msg;
  };

  return (
    <motion.div
      className="project-details"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container">
        {/* Back */}
        <button className="project-details__back" onClick={onBack}>
          <ArrowLeft size={16} />
          Back to Projects
        </button>

        {/* Hero image */}
        <div className="project-details__hero">
          <img
            src={project.image}
            alt={project.title}
            onError={e => {
              e.currentTarget.src = `https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=80`;
            }}
          />
          <div className="project-details__hero-overlay">
            <h1 className="project-details__title">
              <span>{categoryLabel}</span>
              {project.title}
            </h1>
          </div>
        </div>

        {/* Body grid */}
        <div className="project-details__body">
          {/* Main column */}
          <div>
            {/* Overview */}
            <div className="project-details__overview">
              <h2 className="project-details__section-title">Project Overview</h2>

              <div className="project-details__meta">
                <div className="project-details__meta-item">
                  <span className="project-details__meta-label">Category</span>
                  <span className="project-details__meta-value">{categoryLabel}</span>
                </div>
                {project.location && (
                  <div className="project-details__meta-item">
                    <span className="project-details__meta-label">Location</span>
                    <span className="project-details__meta-value" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <MapPin size={13} style={{ color: 'var(--gold)' }} />
                      {project.location}
                    </span>
                  </div>
                )}
                {project.status && (
                  <div className="project-details__meta-item">
                    <span className="project-details__meta-label">Status</span>
                    <span className="project-details__meta-value">{project.status}</span>
                  </div>
                )}
                <div className="project-details__meta-item">
                  <span className="project-details__meta-label">Specialisation</span>
                  <span className="project-details__meta-value">{project.highlights.join(', ')}</span>
                </div>
              </div>

              <p style={{ color: 'var(--text-mid)', fontSize: '0.92rem', lineHeight: 1.7 }}>
                {project.description}
              </p>
            </div>

            {/* Materials table */}
            <div className="materials">
              <div className="materials__header">
                <div>
                  <div className="materials__header-title">
                    <Package size={16} style={{ display: 'inline', marginRight: 6 }} />
                    Estimated Materials
                  </div>
                </div>
                <div className="materials__disclaimer">Indicative estimate only</div>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="materials__table" aria-label="Material cost estimate">
                  <thead>
                    <tr>
                      <th>Material</th>
                      <th>Unit</th>
                      <th>Qty</th>
                      <th>Unit Price</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lines.map((m, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 500 }}>{m.name}</td>
                        <td style={{ color: 'var(--text-light)' }}>{m.unit}</td>
                        <td>
                          <input
                            type="number"
                            min="0"
                            step="1"
                            className={`materials__qty-input ${errors[i] ? 'materials__qty-input--error' : ''}`}
                            value={m.editQty}
                            onChange={e => handleQtyChange(i, e.target.value)}
                            aria-label={`Quantity for ${m.name}`}
                          />
                          {errors[i] && (
                            <div style={{ fontSize: '0.7rem', color: '#e53e3e', marginTop: 2 }}>
                              Invalid quantity
                            </div>
                          )}
                        </td>
                        <td style={{ color: 'var(--text-mid)' }}>{formatINR(m.unitPrice)}</td>
                        <td>{m.valid ? formatINR(m.amount) : <span style={{ color: 'var(--text-light)' }}>—</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="materials__footer">
                <div>
                  <div className="materials__total-label">Total Estimated Material Cost</div>
                  {project.note && (
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Info size={11} />
                      {project.note}
                    </div>
                  )}
                </div>
                <div className="materials__total-amount">
                  {total !== null ? formatINR(total) : <span style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>Enter valid quantities</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Enquiry sidebar */}
          <div>
            <div className="project-enquiry">
              <div className="project-enquiry__header">
                <div className="project-enquiry__title">Request a Quotation</div>
                <div className="project-enquiry__subtitle">
                  Get a detailed quote for this project directly via WhatsApp or call.
                </div>
              </div>
              <div className="project-enquiry__body">
                <a
                  href={getWhatsAppURL(buildWaMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-enquiry__wa-btn"
                >
                  <MessageCircle size={20} />
                  Send Enquiry on WhatsApp
                </a>

                <a href={`tel:${COMPANY.phones[0].replace(/[^\d+]/g, '')}`} className="project-enquiry__call-btn">
                  <Phone size={16} />
                  Call: {COMPANY.phones[0]}
                </a>

                <a href={`tel:${COMPANY.phones[1].replace(/[^\d+]/g, '')}`} className="project-enquiry__call-btn">
                  <Phone size={16} />
                  Call: {COMPANY.phones[1]}
                </a>

                <p className="project-enquiry__info">
                  Our team responds within 2–4 business hours.<br />
                  All quotes are free of charge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
