import { useState, useMemo } from 'react';
import { Calculator, Check, ArrowRight, MessageCircle, Phone, Sparkles, Building, Layers, Info } from 'lucide-react';
import { RESIDENTIAL_PACKAGES } from '../data/odishaDistricts';
import { COMPANY, getWhatsAppURL } from '../config/company';

const AREA_PRESETS = [1000, 1500, 2000, 2500, 3500];

const FLOOR_OPTIONS = [
  { id: 1, label: 'Ground Floor (G)', multiplier: 1, desc: 'Single-storey home' },
  { id: 2, label: 'Duplex (G+1)', multiplier: 2, desc: 'Two-storey family duplex' },
  { id: 3, label: 'Triplex (G+2)', multiplier: 3, desc: 'Three-storey residence' },
  { id: 4, label: 'Four Floors (G+3)', multiplier: 4, desc: 'Multi-family residential' },
];

export default function ResidentialCostCalculator({ selectedDistrict }) {
  const [plotArea, setPlotArea] = useState(1200);
  const [selectedFloor, setSelectedFloor] = useState(2); // Duplex G+1 by default
  const [selectedPackageId, setSelectedPackageId] = useState('premium');

  const selectedPackage = useMemo(() => {
    return RESIDENTIAL_PACKAGES.find((p) => p.id === selectedPackageId) || RESIDENTIAL_PACKAGES[1];
  }, [selectedPackageId]);

  const floorObj = useMemo(() => {
    return FLOOR_OPTIONS.find((f) => f.id === selectedFloor) || FLOOR_OPTIONS[1];
  }, [selectedFloor]);

  // Total built up area = footprint * floors
  const totalBuiltUpArea = useMemo(() => {
    return plotArea * floorObj.multiplier;
  }, [plotArea, floorObj]);

  // Total estimated cost
  const totalEstimatedCost = useMemo(() => {
    return totalBuiltUpArea * selectedPackage.ratePerSqFt;
  }, [totalBuiltUpArea, selectedPackage]);

  const costInLakhs = (totalEstimatedCost / 100000).toFixed(2);

  // Breakdown percentages
  const breakdown = useMemo(() => {
    return [
      { name: 'Foundation & Earthwork', pct: 15, amount: Math.round(totalEstimatedCost * 0.15) },
      { name: 'RCC Frame & Structural Steel', pct: 25, amount: Math.round(totalEstimatedCost * 0.25) },
      { name: 'Brickwork & Double Plastering', pct: 18, amount: Math.round(totalEstimatedCost * 0.18) },
      { name: 'Flooring & Tiling Work', pct: 14, amount: Math.round(totalEstimatedCost * 0.14) },
      { name: 'Electrical & Sanitary Plumbing', pct: 13, amount: Math.round(totalEstimatedCost * 0.13) },
      { name: 'Doors, Windows & Painting', pct: 15, amount: Math.round(totalEstimatedCost * 0.15) },
    ];
  }, [totalEstimatedCost]);

  const districtName = selectedDistrict?.name || 'Odisha';

  const handleWhatsAppQuote = () => {
    const msg = `🏛️ *RESIDENTIAL HOME CONSTRUCTION ESTIMATE REQUEST*
*To:* Srinivas Nayak & Construction Pvt. Ltd.
*Target Location:* ${districtName}
--------------------------------------
*PROJECT SPECIFICATIONS:*
• *Ground Footprint:* ${plotArea.toLocaleString('en-IN')} sq.ft
• *Floor Structure:* ${floorObj.label}
• *Total Built-up Area:* ${totalBuiltUpArea.toLocaleString('en-IN')} sq.ft
• *Selected Package:* ${selectedPackage.name}
• *Base Rate:* ₹${selectedPackage.ratePerSqFt.toLocaleString('en-IN')} per sq.ft
--------------------------------------
*ESTIMATED TURNKEY BUDGET:* ₹${costInLakhs} Lakhs (Approx. ₹${totalEstimatedCost.toLocaleString('en-IN')})
--------------------------------------
Kindly share standard architectural 2D/3D elevations, structural sample drawings, and scheduled milestone breakdown for ${districtName}. Thank you!`;

    const url = getWhatsAppURL(msg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="cost-calculator" className="res-calc-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem auto' }}>
          <span className="section-eyebrow" style={{ justifyContent: 'center' }}>
            <Calculator size={15} style={{ marginRight: 6 }} />
            Turnkey Cost Estimator
          </span>
          <h2 className="heading-xl">
            Estimate Your Home Construction Cost in <span style={{ color: 'var(--gold)' }}>{districtName}</span>
          </h2>
          <span className="section-divider" style={{ margin: '1rem auto 1.25rem auto' }} />
          <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.7 }}>
            Plan your home with complete budget transparency. Adjust your plot area, select your floor requirement,
            and choose an engineered construction package to calculate your instant turnkey estimate.
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="res-calc-card">
          <div className="res-calc-grid">
            {/* Left Column: Configuration Controls */}
            <div className="res-calc-controls">
              {/* Step 1: Footprint / Plot Area */}
              <div className="res-calc-group">
                <div className="res-calc-group-header">
                  <label htmlFor="res-area-input" className="res-calc-label">
                    <span className="res-calc-step-num">1</span>
                    Plot Ground Footprint / Built-up Area (Sq.Ft)
                  </label>
                  <span className="res-calc-badge-val">{plotArea.toLocaleString('en-IN')} sq.ft</span>
                </div>

                <div className="res-calc-slider-wrap">
                  <input
                    id="res-area-input"
                    type="range"
                    min="600"
                    max="6000"
                    step="50"
                    value={plotArea}
                    onChange={(e) => setPlotArea(Number(e.target.value))}
                    className="res-calc-slider"
                  />
                  <div className="res-calc-slider-bounds">
                    <span>600 sq.ft</span>
                    <span>3,000 sq.ft</span>
                    <span>6,000 sq.ft</span>
                  </div>
                </div>

                {/* Preset Chips */}
                <div className="res-calc-presets">
                  <span className="res-calc-presets-label">Common Plot Sizes:</span>
                  {AREA_PRESETS.map((p) => (
                    <button
                      key={p}
                      onClick={() => setPlotArea(p)}
                      className={`res-calc-preset-btn ${plotArea === p ? 'res-calc-preset-btn--active' : ''}`}
                    >
                      {p.toLocaleString('en-IN')} sq.ft
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Floor Structure */}
              <div className="res-calc-group">
                <div className="res-calc-group-header">
                  <span className="res-calc-label">
                    <span className="res-calc-step-num">2</span>
                    Select Number of Floors
                  </span>
                </div>

                <div className="res-calc-floors-grid">
                  {FLOOR_OPTIONS.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFloor(f.id)}
                      className={`res-calc-floor-card ${selectedFloor === f.id ? 'res-calc-floor-card--active' : ''}`}
                    >
                      <Layers size={20} className="res-calc-floor-icon" />
                      <div className="res-calc-floor-title">{f.label}</div>
                      <div className="res-calc-floor-desc">{f.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Construction Package Tier */}
              <div className="res-calc-group">
                <div className="res-calc-group-header">
                  <span className="res-calc-label">
                    <span className="res-calc-step-num">3</span>
                    Choose Your Construction Package
                  </span>
                </div>

                <div className="res-calc-packages-list">
                  {RESIDENTIAL_PACKAGES.map((pkg) => {
                    const isSelected = selectedPackageId === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackageId(pkg.id)}
                        className={`res-calc-pkg-item ${isSelected ? 'res-calc-pkg-item--selected' : ''}`}
                      >
                        <div className="res-calc-pkg-radio">
                          {isSelected && <div className="res-calc-pkg-radio-inner" />}
                        </div>
                        <div className="res-calc-pkg-info">
                          <div className="res-calc-pkg-top-row">
                            <span className="res-calc-pkg-name">{pkg.name}</span>
                            {pkg.popular && <span className="res-calc-pkg-popular-pill">Most Popular</span>}
                            {pkg.id === 'royal-palace' && (
                              <span className="res-calc-pkg-palace-pill">SNC Specialization</span>
                            )}
                          </div>
                          <div className="res-calc-pkg-tagline">{pkg.tagline}</div>
                        </div>
                        <div className="res-calc-pkg-price">
                          <span className="res-calc-pkg-rate">₹{pkg.ratePerSqFt.toLocaleString('en-IN')}</span>
                          <span className="res-calc-pkg-unit">/ sq.ft</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Output & Quote Dispatch */}
            <div className="res-calc-summary-panel">
              <div className="res-calc-summary-header">
                <span className="res-calc-summary-eyebrow">Estimated Turnkey Budget</span>
                <div className="res-calc-total-cost">
                  ₹{costInLakhs} <span className="res-calc-lakh-label">Lakhs</span>
                </div>
                <div className="res-calc-total-exact">
                  Approx. ₹{totalEstimatedCost.toLocaleString('en-IN')} (Inclusive of materials &amp; labour)
                </div>

                <div className="res-calc-specs-strip">
                  <div className="res-calc-spec-pill">
                    <span>Total Built-up:</span>
                    <strong>{totalBuiltUpArea.toLocaleString('en-IN')} sq.ft</strong>
                  </div>
                  <div className="res-calc-spec-pill">
                    <span>Rate:</span>
                    <strong>₹{selectedPackage.ratePerSqFt}/sq.ft</strong>
                  </div>
                  <div className="res-calc-spec-pill">
                    <span>Location:</span>
                    <strong>{districtName}</strong>
                  </div>
                </div>
              </div>

              {/* Stage-wise Cost Breakdown */}
              <div className="res-calc-breakdown-box">
                <h4 className="res-calc-breakdown-title">
                  <Info size={14} style={{ color: 'var(--gold)', marginRight: 5 }} />
                  Stage-wise Budget Distribution
                </h4>
                <div className="res-calc-breakdown-list">
                  {breakdown.map((item) => (
                    <div key={item.name} className="res-calc-breakdown-row">
                      <div className="res-calc-breakdown-info">
                        <span className="res-calc-breakdown-name">{item.name}</span>
                        <span className="res-calc-breakdown-pct">{item.pct}%</span>
                      </div>
                      <div className="res-calc-progress-track">
                        <div
                          className="res-calc-progress-fill"
                          style={{ width: `${item.pct * 2.5}%` }}
                        />
                      </div>
                      <div className="res-calc-breakdown-val">₹{(item.amount / 100000).toFixed(2)} Lakhs</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Package Highlights Checklist */}
              <div className="res-calc-highlights-box">
                <h4 className="res-calc-highlights-title">What&apos;s Included in {selectedPackage.name}:</h4>
                <ul className="res-calc-highlights-list">
                  {selectedPackage.highlights.slice(0, 5).map((h) => (
                    <li key={h} className="res-calc-highlight-item">
                      <Check size={14} className="res-calc-check-icon" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="res-calc-actions">
                <button onClick={handleWhatsAppQuote} className="btn btn-whatsapp res-calc-cta-btn">
                  <MessageCircle size={18} />
                  <span>Get Detailed Estimate for {districtName} on WhatsApp</span>
                </button>

                <div className="res-calc-direct-call">
                  <span>Speak with our Odisha residential engineer directly:</span>
                  <a href={`tel:${COMPANY.phones[0].replace(/[^\d+]/g, '')}`} className="res-calc-call-link">
                    <Phone size={14} />
                    <span>{COMPANY.phones[0]} (Er. Srinivas Nayak)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
