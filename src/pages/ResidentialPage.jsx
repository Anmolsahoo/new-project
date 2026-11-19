import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Sparkles,
  ShieldCheck,
  Building,
  CheckCircle2,
  ArrowRight,
  Phone,
  MessageCircle,
  Home,
  Crown,
  Layers,
  ChevronRight,
  Clock,
  Award,
  FileCheck,
  Check,
  HelpCircle,
} from 'lucide-react';
import DistrictModal from '../components/DistrictModal';
import ResidentialCostCalculator from '../components/ResidentialCostCalculator';
import { ODISHA_DISTRICTS, RESIDENTIAL_PACKAGES, RESIDENTIAL_DESIGNS, TURNKEY_STEPS } from '../data/odishaDistricts';
import { COMPANY, getWhatsAppURL } from '../config/company';
import '../styles/residential.css';

export default function ResidentialPage() {
  // District state: check localStorage or default to Sundargarh (Rourkela HQ)
  const [selectedDistrict, setSelectedDistrict] = useState(() => {
    const saved = localStorage.getItem('snc_residential_district');
    if (saved) {
      const match = ODISHA_DISTRICTS.find((d) => d.name === saved || d.id === saved);
      if (match) return match;
    }
    return ODISHA_DISTRICTS[0]; // Sundargarh (Rourkela) as primary HQ
  });

  // Modal open state: opens on first visit if no saved district, or on user request
  const [isModalOpen, setIsModalOpen] = useState(() => {
    return !localStorage.getItem('snc_residential_district');
  });

  const [activeDesignFilter, setActiveDesignFilter] = useState('All');
  const [consultationName, setConsultationName] = useState('');
  const [consultationPhone, setConsultationPhone] = useState('');
  const [consultationPlot, setConsultationPlot] = useState('');
  const [consultationMsg, setConsultationMsg] = useState('');

  const districtName = selectedDistrict?.name || 'Sundargarh (Rourkela)';

  const handleSelectDistrict = (district) => {
    setSelectedDistrict(district);
    localStorage.setItem('snc_residential_district', district.name);
  };

  const filteredDesigns = activeDesignFilter === 'All'
    ? RESIDENTIAL_DESIGNS
    : RESIDENTIAL_DESIGNS.filter((d) => d.type === activeDesignFilter);

  const handleBookConsultation = (e) => {
    e.preventDefault();
    const msg = `🏛️ *NEW RESIDENTIAL CONSULTATION BOOKING*
*To:* Srinivas Nayak & Construction Pvt. Ltd.
*Location:* ${districtName}
--------------------------------------
*Client Name:* ${consultationName || 'Prospective Homeowner'}
*Phone Number:* ${consultationPhone || 'Not provided'}
*Plot Size / Built-up Area:* ${consultationPlot || 'Standard Residential Plot'}
*Requirements / Message:* ${consultationMsg || 'Interested in turnkey home construction in ' + districtName}
--------------------------------------
Kindly schedule a preliminary architectural discussion and site assessment.`;

    const url = getWhatsAppURL(msg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="res-page">
      {/* ============================================================
          JSW ONE HOMES STYLE DISTRICT POP-UP MODAL
          ============================================================ */}
      <DistrictModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDistrict={selectedDistrict}
        onSelectDistrict={handleSelectDistrict}
      />

      {/* ============================================================
          TOP LOCATION & ADVISORY BANNER
          ============================================================ */}
      <div className="res-location-bar">
        <div className="container res-location-bar-inner">
          <div className="res-location-info">
            <span className="res-location-indicator">
              <span className="res-location-dot" />
              Serving Homeowners in
            </span>
            <div className="res-location-selected-wrap">
              <MapPin size={16} className="res-location-pin" />
              <strong className="res-location-name">{districtName}, Odisha</strong>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="res-location-change-btn"
              title="Select another district or city in Odisha"
            >
              [Change District]
            </button>
          </div>

          <div className="res-location-call-wrap">
            <span className="res-location-call-label">Direct Residential Helpline:</span>
            <a href={`tel:${COMPANY.phones[0].replace(/[^\d+]/g, '')}`} className="res-location-phone">
              <Phone size={14} />
              <span>{COMPANY.phones[0]}</span>
            </a>
          </div>
        </div>
      </div>

      {/* ============================================================
          HERO SECTION — TURNKEY HOME CONSTRUCTION IN ODISHA
          ============================================================ */}
      <section className="res-hero">
        <div className="res-hero-bg">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85"
            alt="Turnkey Residential Villa Construction in Odisha"
            loading="eager"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85';
            }}
          />
        </div>

        <div className="container res-hero-content">
          <div className="res-hero-text">
            {/* Pill Eyebrow with District Badge */}
            <div className="res-hero-eyebrow">
              <span className="res-hero-eyebrow-line" />
              <span className="res-hero-eyebrow-text">
                Turnkey Home Construction &bull; {districtName}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="heading-hero res-hero-title">
              Building Your Dream Home in <span className="res-gold-gradient">{districtName}</span> Made Hassle-Free
            </h1>

            {/* Subtitle */}
            <p className="res-hero-subtitle">
              From architectural 2D floor plans, 3D exterior elevations, and municipal drawing approvals to heavy seismic RCC foundation and turnkey interior key handover. Aligned with applicable CPWD technical guidelines.
            </p>

            {/* CTAs */}
            <div className="res-hero-ctas">
              <a href="#cost-calculator" className="btn btn-primary res-hero-calc-btn">
                <span>Calculate Construction Cost</span>
                <ChevronRight size={16} />
              </a>

              <a
                href={getWhatsAppURL(`Hello Srinivas Nayak & Construction, I would like to build a home in ${districtName}. Please share your turnkey packages.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-white"
              >
                <MessageCircle size={17} style={{ color: '#25D366' }} />
                <span>WhatsApp Consultation</span>
              </a>
            </div>

            {/* Quick Location Switcher Chip */}
            <div className="res-hero-location-chip" onClick={() => setIsModalOpen(true)}>
              <MapPin size={15} style={{ color: 'var(--gold)' }} />
              <span>Planning to build outside {districtName}?</span>
              <strong style={{ color: 'var(--gold-light)', textDecoration: 'underline' }}>Select Another District</strong>
            </div>
          </div>
        </div>

        {/* 4 Value Pillars Strip (JSW One Homes style) */}
        <div className="res-hero-trust-strip">
          <div className="container">
            <div className="res-hero-trust-grid">
              <div className="res-hero-trust-item">
                <div className="res-hero-trust-icon-wrap">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <div className="res-hero-trust-title">300+ Quality Inspections</div>
                  <div className="res-hero-trust-desc">Soil testing to aggregate &amp; structural curing audits</div>
                </div>
              </div>

              <div className="res-hero-trust-item">
                <div className="res-hero-trust-icon-wrap">
                  <Building size={22} />
                </div>
                <div>
                  <div className="res-hero-trust-title">100% Branded Tested Materials</div>
                  <div className="res-hero-trust-desc">Tata/Jindal Fe 550D TMT &amp; Grade 53 UltraTech cement</div>
                </div>
              </div>

              <div className="res-hero-trust-item">
                <div className="res-hero-trust-icon-wrap">
                  <Award size={22} />
                </div>
                <div>
                  <div className="res-hero-trust-title">Zero Cost Escalation</div>
                  <div className="res-hero-trust-desc">Fixed milestone-based agreements with zero hidden fees</div>
                </div>
              </div>

              <div className="res-hero-trust-item">
                <div className="res-hero-trust-icon-wrap">
                  <Clock size={22} />
                </div>
                <div>
                  <div className="res-hero-trust-title">Guaranteed On-Time Possession</div>
                  <div className="res-hero-trust-desc">Dedicated project manager &amp; structured delivery timeline</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          INTERACTIVE COST ESTIMATOR (JSW ONE HOMES HALLMARK)
          ============================================================ */}
      <ResidentialCostCalculator selectedDistrict={selectedDistrict} />

      {/* ============================================================
          CONSTRUCTION PACKAGES COMPARISON (CLASSIC, PREMIUM, PALACE)
          ============================================================ */}
      <section className="section section--warm" id="packages">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem auto' }}>
            <span className="section-eyebrow" style={{ justifyContent: 'center' }}>
              <Layers size={14} style={{ marginRight: 6 }} />
              Turnkey Packages
            </span>
            <h2 className="heading-xl">Engineered Construction Tiers for Every Vision</h2>
            <span className="section-divider" style={{ margin: '1rem auto 1.5rem auto' }} />
            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.7 }}>
              Transparent all-inclusive rates covering architectural design, foundation, structural RCC framing, masonry, electrical, plumbing, tiling, and painting.
            </p>
          </div>

          <div className="res-packages-grid">
            {RESIDENTIAL_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`res-package-card ${pkg.popular ? 'res-package-card--popular' : ''} ${pkg.id === 'royal-palace' ? 'res-package-card--palace' : ''}`}
              >
                {pkg.popular && (
                  <div className="res-package-popular-banner">
                    <Sparkles size={13} /> Most Popular for Modern Homes
                  </div>
                )}
                {pkg.id === 'royal-palace' && (
                  <div className="res-package-palace-banner">
                    <Crown size={13} /> Er. Srinivas Nayak Specialization
                  </div>
                )}

                <div className="res-package-header">
                  <h3 className="res-package-title">{pkg.name}</h3>
                  <p className="res-package-tagline">{pkg.tagline}</p>
                  <div className="res-package-price-wrap">
                    <span className="res-package-currency">₹</span>
                    <span className="res-package-amount">{pkg.ratePerSqFt.toLocaleString('en-IN')}</span>
                    <span className="res-package-unit">/ sq.ft (Built-up)</span>
                  </div>
                </div>

                <div className="res-package-body">
                  <div className="res-package-specs-title">Key Specifications:</div>
                  <ul className="res-package-specs-list">
                    {pkg.highlights.map((h) => (
                      <li key={h} className="res-package-spec-item">
                        <CheckCircle2 size={16} className="res-package-check" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="res-package-actions">
                    <a
                      href={getWhatsAppURL(`Hello Srinivas Nayak & Construction, I want to discuss the *${pkg.name}* (₹${pkg.ratePerSqFt}/sq.ft) for my home in ${districtName}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn ${pkg.popular ? 'btn-primary' : 'btn-navy'} btn-block`}
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      <span>Choose {pkg.name.split(' ')[0]} Package</span>
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          POPULAR HOME ELEVATIONS & 3D DESIGNS GALLERY
          ============================================================ */}
      <section className="section section--white" id="designs">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem auto' }}>
            <span className="section-eyebrow" style={{ justifyContent: 'center' }}>
              <Home size={14} style={{ marginRight: 6 }} />
              Architectural Elevations
            </span>
            <h2 className="heading-xl">Curated Home Designs for Odisha Plots</h2>
            <span className="section-divider" style={{ margin: '1rem auto 1.5rem auto' }} />
            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.7 }}>
              Browse modern duplexes, contemporary villas, and luxury palace residences optimized for typical 30x40, 30x50, 40x60, and custom plots across Odisha.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="res-designs-filter-strip">
            {['All', 'Modern Duplex', 'Luxury Villa', 'Palace Style'].map((f) => (
              <button
                key={f}
                onClick={() => setActiveDesignFilter(f)}
                className={`res-designs-filter-btn ${activeDesignFilter === f ? 'res-designs-filter-btn--active' : ''}`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Design Cards Grid */}
          <div className="res-designs-grid">
            {filteredDesigns.map((des) => (
              <div key={des.id} className="res-design-card">
                <div className="res-design-img-wrap">
                  <img
                    src={des.image}
                    alt={des.title}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85';
                    }}
                  />
                  <div className="res-design-badge">{des.type}</div>
                  <div className="res-design-bhk-tag">{des.bhk}</div>
                </div>

                <div className="res-design-content">
                  <h3 className="res-design-title">{des.title}</h3>

                  <div className="res-design-meta-grid">
                    <div className="res-design-meta-item">
                      <span className="res-design-meta-label">Min. Plot Size</span>
                      <strong className="res-design-meta-val">{des.minPlot}</strong>
                    </div>
                    <div className="res-design-meta-item">
                      <span className="res-design-meta-label">Total Built-up</span>
                      <strong className="res-design-meta-val">{des.builtUp}</strong>
                    </div>
                  </div>

                  <div className="res-design-features-list">
                    {des.features.map((feat) => (
                      <span key={feat} className="res-design-feature-pill">
                        &bull; {feat}
                      </span>
                    ))}
                  </div>

                  <div className="res-design-footer">
                    <a
                      href={getWhatsAppURL(`Hello SNC Homes, I am interested in the "${des.title}" (${des.bhk}, ${des.builtUp}) design for my plot in ${districtName}. Please share floor plans.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-navy btn-sm"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      <MessageCircle size={14} /> Request 2D Floor Plan &amp; Specs
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          THE 6-STEP TURNKEY JOURNEY (JSW ONE HOMES STYLE)
          ============================================================ */}
      <section className="section section--darkest" id="journey">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 4rem auto' }}>
            <span className="section-eyebrow" style={{ justifyContent: 'center' }}>
              <FileCheck size={14} style={{ marginRight: 6 }} />
              The Construction Journey
            </span>
            <h2 className="heading-xl" style={{ color: '#fff' }}>
              How We Build Your Home — From Plot to Key Handover
            </h2>
            <span className="section-divider" style={{ margin: '1rem auto 1.5rem auto' }} />
            <p style={{ color: 'rgba(255, 255, 255, 0.72)', fontSize: '0.98rem', lineHeight: 1.7 }}>
              Our proven 6-step project delivery framework guarantees predictable quality, transparent milestone payments, and zero construction headaches.
            </p>
          </div>

          <div className="res-journey-grid">
            {TURNKEY_STEPS.map((s, index) => (
              <div key={s.step} className="res-journey-card">
                <div className="res-journey-num-badge">{s.step}</div>
                <h3 className="res-journey-title">{s.title}</h3>
                <p className="res-journey-desc">{s.desc}</p>
                {index < TURNKEY_STEPS.length - 1 && (
                  <div className="res-journey-connector" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          TRANSPARENCY: SRINIVAS HOMES VS LOCAL CONTRACTORS
          ============================================================ */}
      <section className="section section--warm" id="comparison">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem auto' }}>
            <span className="section-eyebrow" style={{ justifyContent: 'center' }}>
              <HelpCircle size={14} style={{ marginRight: 6 }} />
              Why Build Turnkey
            </span>
            <h2 className="heading-xl">Srinivas Homes vs. Traditional Local Contractors</h2>
            <span className="section-divider" style={{ margin: '1rem auto 1.5rem auto' }} />
            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.7 }}>
              Building an independent home is a lifetime investment. See how our corporate engineering accountability protects you from common contractor risks.
            </p>
          </div>

          <div className="res-comparison-table-wrap">
            <table className="res-comparison-table">
              <thead>
                <tr>
                  <th>Parameters</th>
                  <th className="res-th-snc">
                    <span>Srinivas Nayak &amp; Construction</span>
                    <span className="res-th-badge">Recommended</span>
                  </th>
                  <th className="res-th-local">Traditional Local Masons &amp; Labor Contractors</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Project Scope</strong></td>
                  <td className="res-td-snc">
                    <Check size={16} className="res-check-icon" />
                    Complete turnkey: Architectural 2D/3D design, civil RCC, MEP, woodwork &amp; painting under one roof.
                  </td>
                  <td className="res-td-local">
                    Piece-meal fragmentation. Owner must coordinate between mason, plumber, electrician, and painter.
                  </td>
                </tr>
                <tr>
                  <td><strong>Pricing &amp; Cost Certainty</strong></td>
                  <td className="res-td-snc">
                    <Check size={16} className="res-check-icon" />
                    <strong>100% Fixed Milestone Agreement</strong> with zero unapproved price escalations.
                  </td>
                  <td className="res-td-local">
                    Frequent cost overruns (typically 20% to 40% higher than initial oral quotes).
                  </td>
                </tr>
                <tr>
                  <td><strong>Material Quality</strong></td>
                  <td className="res-td-snc">
                    <Check size={16} className="res-check-icon" />
                    Tested Tata/Jindal Fe 550D TMT, Grade 53 cement, river sand, certified concrete mix ratios.
                  </td>
                  <td className="res-td-local">
                    Unverified local sourcing, risk of counterfeit steel bars, sub-standard aggregate mixing.
                  </td>
                </tr>
                <tr>
                  <td><strong>Engineering Oversight</strong></td>
                  <td className="res-td-snc">
                    <Check size={16} className="res-check-icon" />
                    Headed by <strong>Director Er. Srinivas Nayak</strong>. Work aligned with applicable CPWD structural standards.
                  </td>
                  <td className="res-td-local">
                    Thumb-rule guessing without structural load calculations or seismic safety considerations.
                  </td>
                </tr>
                <tr>
                  <td><strong>Timeline &amp; Handover</strong></td>
                  <td className="res-td-snc">
                    <Check size={16} className="res-check-icon" />
                    Agreed penalty-backed project completion schedule with regular WhatsApp video progress reports.
                  </td>
                  <td className="res-td-local">
                    Unpredictable labor strikes, festival absences, frequent multi-month delays.
                  </td>
                </tr>
                <tr>
                  <td><strong>Post-Handover Warranty</strong></td>
                  <td className="res-td-snc">
                    <Check size={16} className="res-check-icon" />
                    <strong>Up to 10 to 15 Years Structural Warranty</strong> with comprehensive handover documents.
                  </td>
                  <td className="res-td-local">
                    Zero accountability. Masons disappear once final payments are settled.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============================================================
          FULL ODISHA 30 DISTRICTS COVERAGE SHOWCASE
          ============================================================ */}
      <section className="section section--white" id="districts-coverage">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 2.5rem auto' }}>
            <span className="section-eyebrow" style={{ justifyContent: 'center' }}>
              <MapPin size={14} style={{ marginRight: 6 }} />
              State-Wide Footprint
            </span>
            <h2 className="heading-xl">Active Turnkey Home Construction Across All 30 Odisha Districts</h2>
            <span className="section-divider" style={{ margin: '1rem auto 1.25rem auto' }} />
            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.7 }}>
              Select your district below to customize your residential package or connect with our regional project engineers.
            </p>
          </div>

          <div className="res-all-districts-grid">
            {ODISHA_DISTRICTS.map((d) => {
              const isSelected = selectedDistrict?.id === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => handleSelectDistrict(d)}
                  className={`res-district-badge-btn ${isSelected ? 'res-district-badge-btn--active' : ''}`}
                >
                  <MapPin size={13} className="res-district-badge-pin" />
                  <span className="res-district-badge-text">{d.name}</span>
                  {d.isHQ && <span className="res-district-hq-tag">HQ</span>}
                  {isSelected && <Check size={13} style={{ color: 'var(--gold)' }} />}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          BOOK FREE RESIDENTIAL CONSULTATION FORM
          ============================================================ */}
      <section className="section section--dark" id="consultation">
        <div className="container">
          <div className="res-consultation-grid">
            <div className="res-consultation-intro">
              <span className="section-eyebrow" style={{ color: 'var(--gold-light)' }}>
                Personal Advisory
              </span>
              <h2 className="heading-xl" style={{ color: '#fff', marginBottom: '1.25rem' }}>
                Book a Free Architectural &amp; Cost Consultation in <span style={{ color: 'var(--gold)' }}>{districtName}</span>
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.78)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '2rem' }}>
                Meet Director Er. Srinivas Nayak and our technical team. Bring your plot dimensions or municipal layout, and we will formulate a personalized 2D architectural concept and budget estimation tailored to your family&apos;s lifestyle.
              </p>

              <div className="res-consultation-checklist">
                <div className="res-consultation-check-item">
                  <CheckCircle2 size={18} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                  <span>Free Vastu-compliant 2D preliminary floor plan recommendation</span>
                </div>
                <div className="res-consultation-check-item">
                  <CheckCircle2 size={18} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                  <span>Itemized structural material cost sheet for {districtName}</span>
                </div>
                <div className="res-consultation-check-item">
                  <CheckCircle2 size={18} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                  <span>Guidance on municipal drawing approval process in Odisha</span>
                </div>
              </div>

              <div className="res-consultation-contact-info">
                <div style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.85rem' }}>
                  Registered Office:
                </div>
                <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem', marginTop: 2 }}>
                  {COMPANY.address.full}
                </div>
                <div style={{ color: 'var(--gold-light)', fontSize: '0.82rem', marginTop: 4 }}>
                  Direct Phone: {COMPANY.phones[0]} | {COMPANY.phones[1]}
                </div>
              </div>
            </div>

            {/* Consultation Form Card */}
            <div className="res-consultation-form-card">
              <h3 className="res-consultation-form-title">
                Schedule Your Site Consultation
              </h3>
              <p className="res-consultation-form-desc">
                Fill the brief details below to dispatch your inquiry directly to our engineering desk.
              </p>

              <form onSubmit={handleBookConsultation} className="res-form">
                <div className="res-form-group">
                  <label className="res-form-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={consultationName}
                    onChange={(e) => setConsultationName(e.target.value)}
                    className="res-form-input"
                  />
                </div>

                <div className="res-form-group">
                  <label className="res-form-label">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={consultationPhone}
                    onChange={(e) => setConsultationPhone(e.target.value)}
                    className="res-form-input"
                  />
                </div>

                <div className="res-form-row">
                  <div className="res-form-group">
                    <label className="res-form-label">Construction District</label>
                    <select
                      value={selectedDistrict?.id}
                      onChange={(e) => {
                        const found = ODISHA_DISTRICTS.find((d) => d.id === e.target.value);
                        if (found) handleSelectDistrict(found);
                      }}
                      className="res-form-input"
                    >
                      {ODISHA_DISTRICTS.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="res-form-group">
                    <label className="res-form-label">Plot Dimensions / Built-up Area</label>
                    <input
                      type="text"
                      placeholder="e.g. 30x40 (1200 sq.ft) Duplex"
                      value={consultationPlot}
                      onChange={(e) => setConsultationPlot(e.target.value)}
                      className="res-form-input"
                    />
                  </div>
                </div>

                <div className="res-form-group">
                  <label className="res-form-label">Project Details / Special Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="Mention floors (e.g. G+1), preferred package, or palace/villa elevation preferences..."
                    value={consultationMsg}
                    onChange={(e) => setConsultationMsg(e.target.value)}
                    className="res-form-input"
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <button type="submit" className="btn btn-whatsapp btn-block" style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}>
                  <MessageCircle size={18} />
                  <span>Book Consultation via WhatsApp</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
