import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Building2,
  Factory,
  Warehouse,
  Wrench,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  FileText,
  Layers,
  HardHat,
  Ruler,
  Phone,
  Clock,
  Coins,
  Award,
  ChevronRight,
  Truck,
  Sparkles,
  Zap,
} from 'lucide-react';
import { COMPANY, getWhatsAppURL } from '../config/company';
import '../styles/commercial.css';

// Facility Types for Commercial RFQ Estimator
const FACILITY_TYPES = [
  {
    id: 'peb-shed',
    name: 'Industrial Factory Shed (PEB)',
    category: 'Pre-Engineered Building',
    baseRate: 1650, // ₹ per sq.ft
    steelPerSqFt: 0.032, // metric tonnes per sq.ft
    timeFactor: 0.000045,
    icon: Factory,
  },
  {
    id: 'mfg-plant',
    name: 'Heavy Manufacturing Unit',
    category: 'Heavy Industrial Plant',
    baseRate: 2200,
    steelPerSqFt: 0.045,
    timeFactor: 0.00006,
    icon: HardHat,
  },
  {
    id: 'warehouse',
    name: 'High-Bay Logistics Warehouse',
    category: 'Supply Chain & Storage',
    baseRate: 1450,
    steelPerSqFt: 0.028,
    timeFactor: 0.00004,
    icon: Warehouse,
  },
  {
    id: 'office-tower',
    name: 'Commercial Office Complex',
    category: 'Corporate & Retail Building',
    baseRate: 2750,
    steelPerSqFt: 0.038,
    timeFactor: 0.000075,
    icon: Building2,
  },
  {
    id: 'gantry-bay',
    name: 'Gantry Crane & Fabrication Bay',
    category: 'Heavy Material Handling',
    baseRate: 1950,
    steelPerSqFt: 0.048,
    timeFactor: 0.00005,
    icon: Wrench,
  },
];

const CLEAR_SPANS = [
  { id: '18m', label: '18m (60 ft) Clear Span', multiplier: 1.0 },
  { id: '24m', label: '24m (80 ft) Clear Span', multiplier: 1.08 },
  { id: '30m', label: '30m (100 ft) Clear Span', multiplier: 1.18 },
  { id: '36m', label: '36m+ (120ft+) Heavy Truss', multiplier: 1.30 },
];

const CRANE_CAPACITIES = [
  { id: 'none', label: 'No Gantry Crane', addRate: 0, addSteelMT: 0 },
  { id: '5t', label: '5 Ton EOT Crane', addRate: 80, addSteelMT: 8 },
  { id: '10t', label: '10 Ton EOT Crane', addRate: 150, addSteelMT: 16 },
  { id: '20t', label: '20 Ton Heavy Crane', addRate: 260, addSteelMT: 28 },
  { id: '35t', label: '35T+ High-Capacity Gantry', addRate: 420, addSteelMT: 45 },
];

const EAVES_HEIGHTS = [
  { id: '6m', label: '6m (20 ft) Standard', multiplier: 1.0 },
  { id: '8.5m', label: '8.5m (28 ft) High Clearance', multiplier: 1.06 },
  { id: '11m', label: '11m (36 ft) Heavy Bay', multiplier: 1.14 },
  { id: '14m', label: '14m (46 ft) Multi-Level', multiplier: 1.22 },
];

// 6 Core Commercial Capabilities
const CAPABILITIES = [
  {
    id: 'peb',
    title: 'Pre-Engineered Buildings (PEB) & Factory Sheds',
    badge: 'Industrial PEB Specialist',
    desc: 'High-speed engineering and erection of clear-span industrial sheds, manufacturing plants, and assembly hangars with zero interior obstruction.',
    image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80',
    specs: [
      'Tapered built-up portal frames (SAW welded)',
      'Galvalume 0.5mm AZ150 high-tensile roof sheeting',
      'Continuous ridge ventilators & polycarbonate skylights',
      'Cold-formed high-strength Z & C purlins',
    ],
  },
  {
    id: 'steel',
    title: 'Heavy Structural Steelwork & Fabrication Yard',
    badge: 'Fabrication Yard Capacity',
    desc: 'Dedicated structural fabrication yard handling ISMB/ISMC standard sections, heavy plate girders, and gantry crane runway beams.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    specs: [
      'High-tensile Fe 550D / Fe 500D structural steel',
      'Automated CNC plasma cutting & beveling',
      'Full-penetration welding inspected to AWS D1.1',
      'Shot blasting to Sa 2.5 & dual-coat epoxy primer',
    ],
  },
  {
    id: 'manufacturing',
    title: 'Advanced Manufacturing Units & Heavy Machine Plants',
    badge: 'Turnkey Industrial Plants',
    desc: 'End-to-end civil, structural, and utility infrastructure designed specifically for manufacturing lines, machinery foundations, and production cells.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    specs: [
      'Heavy machine vibration isolation concrete pads',
      'Vacuum Dewatered (VDF / Tremix) industrial flooring',
      'Integrated gantry crane bays up to 50 Metric Tonnes',
      'Internal utility trenches, drainage & fire barriers',
    ],
  },
  {
    id: 'commercial-towers',
    title: 'Commercial Office Complexes & IT Parks',
    badge: 'Corporate Infrastructure',
    desc: 'Multi-storey corporate headquarters, business centers, and institutional facilities engineered with modern architectural aesthetics and durability.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    specs: [
      'Composite steel-concrete framed construction',
      'Post-tensioned RCC slabs for maximum floor spans',
      'High-efficiency structural glazing & facade engineering',
      'Integrated basement parking & MEP riser coordination',
    ],
  },
  {
    id: 'warehousing',
    title: 'High-Bay Logistics Hubs & Warehouses',
    badge: 'Supply Chain Infrastructure',
    desc: 'State-of-the-art warehousing infrastructure for logistics operators, cross-dock distribution, and industrial inventory management.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    specs: [
      'Super-flat FM2 category floor for high-reach forklifts',
      'Hydraulic automated dock levellers & insulated doors',
      'Wide 32m turning radius concrete aprons for trailers',
      'Dedicated fire hydrant ring mains & smoke detectors',
    ],
  },
  {
    id: 'earthwork-piling',
    title: 'Heavy Earthworks, Piling & Statutory Clearances',
    badge: 'Foundations & Clearances',
    desc: 'Comprehensive site preparation, deep bored piling, soil stabilization, and statutory drawing liaisoning across Odisha.',
    image: 'https://images.unsplash.com/photo-1579847188804-ecba0e2ea330?auto=format&fit=crop&w=1200&q=80',
    specs: [
      'Hydraulic excavator fleet for heavy mass earthwork',
      'Bored cast-in-situ concrete piles with load testing',
      'BDA, IDCO & municipal building plan approval liaison',
      'Factory Inspectorate & Fire NOC advisory alignment',
    ],
  },
];

// Industrial Benchmark Projects
const BENCHMARK_PROJECTS = [
  {
    id: 'proj-1',
    title: 'Heavy PEB Industrial Production Shed',
    category: 'Manufacturing Plant',
    area: '48,000 Sq.Ft',
    steel: '165 MT Structural Steel',
    span: '30m Clear Span',
    image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'proj-2',
    title: 'Heavy Fabrication & Gantry Crane Facility',
    category: 'Structural Steelwork',
    area: '32,000 Sq.Ft',
    steel: '220 MT Heavy Plate Girders',
    span: '20T EOT Crane Runways',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'proj-3',
    title: 'Automated Industrial Assembly Unit',
    category: 'Turnkey Industrial Facility',
    area: '65,000 Sq.Ft',
    steel: 'High-Tensile Framing',
    span: 'VDF Heavy Flooring',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'proj-4',
    title: 'Commercial Corporate Complex & IT Tower',
    category: 'Commercial High-Rise',
    area: '85,000 Sq.Ft',
    steel: 'Composite Steel-RCC',
    span: 'G+6 Commercial Floors',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'proj-5',
    title: 'High-Bay Distribution Warehouse',
    category: 'Logistics Infrastructure',
    area: '72,000 Sq.Ft',
    steel: 'Galvalume Sheeting',
    span: 'FM2 Floor Flatness',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'proj-6',
    title: 'Industrial Plant Infrastructure & Deep Piling',
    category: 'Heavy Civil Works',
    area: '100,000 Sq.Ft Campus',
    steel: 'Reinforced Foundations',
    span: 'Machine Vibration Blocks',
    image: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=1200&q=80',
  },
];

// Quality Standards Matrix (Tata Projects Style)
const QUALITY_STANDARDS = [
  {
    parameter: 'Structural Steel Material & Grade',
    sncStandard: 'Primary producers (SAIL, Tata Tiscon, JSW) Fe 550D & IS 2062 Grade E250/E350.',
    testingNorm: '100% Mill Test Certificates (MTC) verified with chemical & tensile test audits.',
    isCode: 'IS 2062 / IS 800:2007',
  },
  {
    parameter: 'Welding & Joint Quality Assurance',
    sncStandard: 'Automated Submerged Arc Welding (SAW) & MIG with certified 6G welders.',
    testingNorm: '100% Visual Inspection, Dye Penetrant Testing (DPT), and Ultrasonic Testing (UT).',
    isCode: 'AWS D1.1 / IS 816',
  },
  {
    parameter: 'Corrosion Protection & Surface Coating',
    sncStandard: 'Automatic shot-blasting to Swedish Sa 2.5, Zinc Phosphate epoxy primer (60μ DFT) + Polyurethane finish.',
    testingNorm: 'Digital Elcometer DFT dry-film thickness audit across all structural members.',
    isCode: 'IS 1477 / ISO 12944',
  },
  {
    parameter: 'Concrete Mix & Machine Foundation Design',
    sncStandard: 'M25 to M40 design mix using computerized weigh-batching and slump testing.',
    testingNorm: '7-day & 28-day compressive cube testing with third-party NABL lab certification.',
    isCode: 'IS 456:2000 / IS 2974',
  },
  {
    parameter: 'Wind & Cyclone Resilient Engineering',
    sncStandard: 'Engineered specifically for Odisha coastal & inland wind zones (cyclone velocity up to 200 km/h).',
    testingNorm: '3D Tekla & STAAD Pro computer wind simulation on rafters, purlins & sag rods.',
    isCode: 'IS 875 (Part 3) / CPWD',
  },
];

export default function CommercialPage() {
  // RFQ Estimator State
  const [selectedFacility, setSelectedFacility] = useState(FACILITY_TYPES[0]);
  const [builtUpArea, setBuiltUpArea] = useState(25000); // 25,000 sq.ft default
  const [selectedSpan, setSelectedSpan] = useState(CLEAR_SPANS[1]); // 24m
  const [selectedCrane, setSelectedCrane] = useState(CRANE_CAPACITIES[1]); // 5 Ton
  const [selectedHeight, setSelectedHeight] = useState(EAVES_HEIGHTS[1]); // 8.5m

  // Live Cost & Steel Calculations
  const calculation = useMemo(() => {
    const baseSqFtRate = selectedFacility.baseRate;
    const adjustedRate = (baseSqFtRate * selectedSpan.multiplier * selectedHeight.multiplier) + selectedCrane.addRate;
    const totalCost = Math.round(builtUpArea * adjustedRate);

    // Structural steel calculation in Metric Tonnes (MT)
    const baseSteelMT = builtUpArea * selectedFacility.steelPerSqFt * selectedSpan.multiplier;
    const totalSteelMT = Math.round(baseSteelMT + selectedCrane.addSteelMT);

    // Execution time in months
    const baseMonths = 3.5;
    const timeAdd = Math.round(builtUpArea * selectedFacility.timeFactor * 10) / 10;
    const totalMonths = Math.min(18, Math.max(3.5, baseMonths + timeAdd));

    // Stage breakdown percentages
    const stages = [
      { name: 'Site Excavation & Deep RCC Foundations', pct: 22, amount: Math.round(totalCost * 0.22) },
      { name: 'Structural Steelwork Fabrication & PEB Erection', pct: 38, amount: Math.round(totalCost * 0.38) },
      { name: 'Galvalume Sheeting, Cladding & Ventilation', pct: 16, amount: Math.round(totalCost * 0.16) },
      { name: 'Industrial VDF Concrete Flooring & Plinth', pct: 14, amount: Math.round(totalCost * 0.14) },
      { name: 'Electrical, Stormwater & Commissioning', pct: 10, amount: Math.round(totalCost * 0.10) },
    ];

    return {
      ratePerSqFt: Math.round(adjustedRate),
      totalCost,
      totalSteelMT,
      totalMonths,
      stages,
    };
  }, [selectedFacility, builtUpArea, selectedSpan, selectedCrane, selectedHeight]);

  // Format currency in Indian Lakhs / Crores
  const formatINR = (val) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Crores`;
    }
    return `₹${(val / 100000).toFixed(2)} Lakhs`;
  };

  // Generate WhatsApp RFQ message prefilled for Er. Srinivas Nayak
  const handleSendRFQ = () => {
    let msg = `🏭 *COMMERCIAL & INDUSTRIAL RFQ / PROJECT ESTIMATE*\n`;
    msg += `*To:* Srinivas Nayak & Construction Pvt. Ltd.\n`;
    msg += `*Attention:* Director Er. Srinivas Nayak\n`;
    msg += `-------------------------------------------\n`;
    msg += `*PROJECT PARAMETERS:*\n`;
    msg += `• *Facility Type:* ${selectedFacility.name} (${selectedFacility.category})\n`;
    msg += `• *Built-Up Area:* ${builtUpArea.toLocaleString('en-IN')} Sq.Ft\n`;
    msg += `• *Clear-Span:* ${selectedSpan.label}\n`;
    msg += `• *Crane Capacity:* ${selectedCrane.label}\n`;
    msg += `• *Eaves Height:* ${selectedHeight.label}\n`;
    msg += `-------------------------------------------\n`;
    msg += `*ESTIMATED SCOPE:* \n`;
    msg += `• *Structural Steel Weight:* ~${calculation.totalSteelMT} Metric Tonnes (MT)\n`;
    msg += `• *Estimated Budget:* ${formatINR(calculation.totalCost)} (₹${calculation.ratePerSqFt}/sq.ft)\n`;
    msg += `• *Execution Schedule:* ~${calculation.totalMonths} Months\n`;
    msg += `-------------------------------------------\n`;
    msg += `Please review and provide a formal engineering quotation, structural design proposal, and site inspection schedule. Thank you!`;

    const url = getWhatsAppURL(msg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const scrollToEstimator = () => {
    document.getElementById('commercial-estimator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="commercial-page">
      {/* ============================================================
          SECTION 1: TATA PROJECTS STYLE HEAVY EPC HERO
          ============================================================ */}
      <section className="comm-hero" aria-label="Commercial & Industrial Infrastructure">
        <div className="comm-hero__bg">
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=85"
            alt="Commercial Structural Steel Infrastructure by SNC"
            loading="eager"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=2000&q=85';
            }}
          />
          <div className="comm-hero__overlay" />
        </div>

        <div className="container">
          <div className="comm-hero__content">
            <span className="comm-badge">
              <Factory size={13} />
              SNC Commercial &bull; Industrial Infrastructure &bull; Turnkey EPC
            </span>

            <h1 className="comm-hero__title">
              Advanced <span>Manufacturing Units</span>, Heavy PEBs &amp; Commercial Infrastructure
            </h1>

            <p className="comm-hero__desc">
              From heavy structural steel fabrication and high-bay pre-engineered factory sheds to corporate office towers,
              Srinivas Nayak &amp; Construction delivers industrial-grade engineering aligned with IS 800, IS 456, and CPWD guidelines.
            </p>

            <div className="comm-hero__actions">
              <button onClick={scrollToEstimator} className="btn btn-primary">
                Configure Commercial RFQ <ArrowRight size={16} />
              </button>

              <a
                href={getWhatsAppURL('Hello Er. Srinivas Nayak, I would like to discuss an industrial manufacturing shed / commercial infrastructure project.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <MessageCircle size={18} />
                WhatsApp Director: 7008087497
              </a>

              <a
                href={`tel:${COMPANY.phones[0].replace(/[^\d+]/g, '')}`}
                className="btn btn-outline-white"
              >
                <Phone size={16} />
                Call Engineering Office
              </a>
            </div>

            {/* Technical Stat Pills */}
            <div className="comm-hero__stat-pills">
              <div className="comm-stat-pill">
                <CheckCircle2 size={14} />
                <span>Fe 550D / Fe 500D Structural Steel</span>
              </div>
              <div className="comm-stat-pill">
                <CheckCircle2 size={14} />
                <span>Up to 45m Clear Spans</span>
              </div>
              <div className="comm-stat-pill">
                <CheckCircle2 size={14} />
                <span>5T to 50T Gantry Crane Bay Systems</span>
              </div>
              <div className="comm-stat-pill">
                <CheckCircle2 size={14} />
                <span>CPWD Guidelines &amp; IS Code Adherence</span>
              </div>
              <div className="comm-stat-pill">
                <CheckCircle2 size={14} />
                <span>CIN: {COMPANY.cin}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2: TATA PROJECTS STYLE METRICS & CAPABILITIES BAND
          ============================================================ */}
      <section className="comm-metrics-band" aria-label="Key Infrastructure Metrics">
        <div className="container">
          <div className="comm-metrics-grid">
            <div className="comm-metric-card">
              <div className="comm-metric-card__val">Rourkela <span>Yard</span></div>
              <div className="comm-metric-card__label">Structural Steel Fabrication</div>
              <div className="comm-metric-card__sub">Heavy ISMB/ISMC, plate girders &amp; automated SAW welding</div>
            </div>

            <div className="comm-metric-card">
              <div className="comm-metric-card__val">45 <span>Meters</span></div>
              <div className="comm-metric-card__label">Maximum Clear Span</div>
              <div className="comm-metric-card__sub">Column-free factory floors for optimal plant layout</div>
            </div>

            <div className="comm-metric-card">
              <div className="comm-metric-card__val">50 <span>Tons</span></div>
              <div className="comm-metric-card__label">EOT Crane Capacity</div>
              <div className="comm-metric-card__sub">Heavy crane runways designed for machine assembly &amp; logistics</div>
            </div>

            <div className="comm-metric-card">
              <div className="comm-metric-card__val">100% <span>CPWD</span></div>
              <div className="comm-metric-card__label">Technical Compliance</div>
              <div className="comm-metric-card__sub">Rigorous quality control, ultrasonic weld QA &amp; M35 concrete</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 3: CORE CAPABILITIES & INDUSTRIAL SECTOR SOLUTIONS
          ============================================================ */}
      <section className="section section--warm" aria-label="Commercial & Industrial Capabilities">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem auto' }}>
            <span className="section-eyebrow" style={{ justifyContent: 'center' }}>Industrial Capabilities</span>
            <h2 className="heading-xl">Engineered for Heavy Manufacturing &amp; Scale</h2>
            <span className="section-divider" style={{ margin: '1rem auto 1.5rem auto' }} />
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7 }}>
              SNC delivers specialized industrial civil and structural engineering solutions tailored for factory owners,
              logistics operators, and commercial developers across Odisha and Eastern India.
            </p>
          </div>

          <div className="comm-caps-grid">
            {CAPABILITIES.map((cap) => (
              <motion.div
                key={cap.id}
                className="comm-cap-card"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <div className="comm-cap-card__media">
                  <img
                    src={cap.image}
                    alt={cap.title}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <span className="comm-cap-card__badge">{cap.badge}</span>
                </div>

                <div className="comm-cap-card__body">
                  <h3 className="comm-cap-card__title">{cap.title}</h3>
                  <p className="comm-cap-card__desc">{cap.desc}</p>

                  <div className="comm-cap-card__specs-list">
                    {cap.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="comm-cap-spec-item">
                        <CheckCircle2 size={13} />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 4: INTERACTIVE COMMERCIAL RFQ & COST ESTIMATOR
          ============================================================ */}
      <section id="commercial-estimator" className="section section--white" aria-label="Commercial RFQ Estimator">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem auto' }}>
            <span className="section-eyebrow" style={{ justifyContent: 'center' }}>Interactive RFQ Portal</span>
            <h2 className="heading-xl">Commercial &amp; Industrial Project Estimator</h2>
            <span className="section-divider" style={{ margin: '1rem auto 1.5rem auto' }} />
            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.7 }}>
              Select your facility type, built-up area, clear-span width, and crane requirements to generate an instant
              structural steel tonnage estimate, cost bracket, and timeline. Send directly to Director Er. Srinivas Nayak via WhatsApp.
            </p>
          </div>

          <div className="comm-estimator-box">
            <div className="comm-estimator-header">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', marginBottom: '0.25rem' }}>
                    Turnkey Engineering Specification Generator
                  </h3>
                  <div style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                    Factual estimates calculated based on CPWD guidelines and current steel/fabrication rates in Odisha.
                  </div>
                </div>
                <div className="comm-badge" style={{ margin: 0 }}>
                  Live B2B Pricing Calculator
                </div>
              </div>
            </div>

            <div className="comm-estimator-grid">
              {/* Left Column: Interactive Controls */}
              <div className="comm-estimator-inputs">
                {/* 1. Facility Type Selection */}
                <div className="comm-est-field">
                  <div className="comm-est-label">
                    <span>1. Select Facility Type</span>
                    <span className="highlight">{selectedFacility.category}</span>
                  </div>
                  <div className="comm-est-options-grid">
                    {FACILITY_TYPES.map((fac) => {
                      const Icon = fac.icon;
                      return (
                        <button
                          key={fac.id}
                          className={`comm-est-btn-choice ${selectedFacility.id === fac.id ? 'active' : ''}`}
                          onClick={() => setSelectedFacility(fac)}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Icon size={16} />
                            <span>{fac.name}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Built-Up Area Slider */}
                <div className="comm-est-field">
                  <div className="comm-est-label">
                    <span>2. Built-Up Floor Area</span>
                    <span className="highlight">{builtUpArea.toLocaleString('en-IN')} Sq.Ft</span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="120000"
                    step="2500"
                    value={builtUpArea}
                    onChange={(e) => setBuiltUpArea(parseInt(e.target.value))}
                    className="comm-est-slider"
                    aria-label="Built up area in square feet"
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                    <span>5,000 sq.ft (Small Shed)</span>
                    <span>50,000 sq.ft</span>
                    <span>1,20,000 sq.ft (Mega Plant)</span>
                  </div>
                </div>

                {/* 3. Clear-Span Width */}
                <div className="comm-est-field">
                  <div className="comm-est-label">
                    <span>3. Clear-Span Portal Width</span>
                    <span className="highlight">{selectedSpan.label.split(' ')[0]}</span>
                  </div>
                  <div className="comm-est-options-grid">
                    {CLEAR_SPANS.map((span) => (
                      <button
                        key={span.id}
                        className={`comm-est-btn-choice ${selectedSpan.id === span.id ? 'active' : ''}`}
                        onClick={() => setSelectedSpan(span)}
                      >
                        <span>{span.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. EOT Crane Capacity */}
                <div className="comm-est-field">
                  <div className="comm-est-label">
                    <span>4. Material Handling &amp; Crane Runway</span>
                    <span className="highlight">{selectedCrane.label.split(' ')[0]}</span>
                  </div>
                  <div className="comm-est-options-grid">
                    {CRANE_CAPACITIES.map((crane) => (
                      <button
                        key={crane.id}
                        className={`comm-est-btn-choice ${selectedCrane.id === crane.id ? 'active' : ''}`}
                        onClick={() => setSelectedCrane(crane)}
                      >
                        <span>{crane.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Eaves Clearance Height */}
                <div className="comm-est-field" style={{ marginBottom: 0 }}>
                  <div className="comm-est-label">
                    <span>5. Eaves Clearance Height</span>
                    <span className="highlight">{selectedHeight.label.split(' ')[0]}</span>
                  </div>
                  <div className="comm-est-options-grid">
                    {EAVES_HEIGHTS.map((height) => (
                      <button
                        key={height.id}
                        className={`comm-est-btn-choice ${selectedHeight.id === height.id ? 'active' : ''}`}
                        onClick={() => setSelectedHeight(height)}
                      >
                        <span>{height.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Live Summary & Direct WhatsApp Dispatch */}
              <div className="comm-estimator-summary">
                <div className="comm-est-summary-card">
                  <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gold)' }}>
                    Estimated Turnkey Budget
                  </div>
                  <div className="comm-est-price-tag">{formatINR(calculation.totalCost)}</div>
                  <div style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.75)' }}>
                    Approx. ₹{calculation.ratePerSqFt} per Sq.Ft (Civil, Steel, Sheeting &amp; Flooring)
                  </div>

                  <div className="comm-est-sub-meta">
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.55)', textTransform: 'uppercase' }}>
                        Structural Steel
                      </div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff' }}>
                        ~{calculation.totalSteelMT} MT
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.55)', textTransform: 'uppercase' }}>
                        Execution Schedule
                      </div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff' }}>
                        ~{calculation.totalMonths} Months
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stage Breakdown List */}
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Stage-Wise Cost Breakdown
                </div>
                <div className="comm-est-breakdown-list">
                  {calculation.stages.map((stg, idx) => (
                    <div key={idx} className="comm-est-stage-item">
                      <div className="comm-est-stage-name">
                        <span style={{ color: 'var(--gold-dark)', fontWeight: 800 }}>{stg.pct}%</span>
                        <span>{stg.name}</span>
                      </div>
                      <div className="comm-est-stage-val">{formatINR(stg.amount)}</div>
                    </div>
                  ))}
                </div>

                {/* Dispatch Button to WhatsApp */}
                <button onClick={handleSendRFQ} className="btn btn-whatsapp btn-lg" style={{ width: '100%' }}>
                  <MessageCircle size={20} />
                  Submit RFQ to Director via WhatsApp
                </button>

                <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.5 }}>
                  Direct line to <strong>Er. Srinivas Nayak</strong> (+91 7008087497). We provide customized CAD/Tekla designs, steel schedules, and turnkey tenders upon inquiry.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 5: QUALITY ASSURANCE & STANDARDS MATRIX (TATA PROJECTS RIGOR)
          ============================================================ */}
      <section className="section section--warm" aria-label="Technical Quality Standards">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem auto' }}>
            <span className="section-eyebrow" style={{ justifyContent: 'center' }}>Engineering Governance</span>
            <h2 className="heading-xl">Technical Standards &amp; Quality Matrix</h2>
            <span className="section-divider" style={{ margin: '1rem auto 1.5rem auto' }} />
            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.7 }}>
              Every industrial structure executed by Srinivas Nayak &amp; Construction complies with mandatory
              Bureau of Indian Standards (BIS) specifications and CPWD construction guidelines.
            </p>
          </div>

          <div className="comm-standards-table-wrap">
            <table className="comm-standards-table">
              <thead>
                <tr>
                  <th style={{ width: '25%' }}>Engineering Domain</th>
                  <th style={{ width: '35%' }}>SNC Execution Standard</th>
                  <th style={{ width: '25%' }}>Quality Testing Norm</th>
                  <th style={{ width: '15%' }}>Applicable Code</th>
                </tr>
              </thead>
              <tbody>
                {QUALITY_STANDARDS.map((std, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 800, color: 'var(--navy)' }}>{std.parameter}</td>
                    <td>{std.sncStandard}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{std.testingNorm}</td>
                    <td>
                      <span className="demo-badge" style={{ fontSize: '0.72rem', background: 'var(--navy)', color: 'var(--gold-light)' }}>
                        {std.isCode}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 6: INDUSTRIAL BENCHMARK PROJECTS SHOWCASE
          ============================================================ */}
      <section className="section section--white" aria-label="Commercial Benchmark Projects">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem auto' }}>
            <span className="section-eyebrow" style={{ justifyContent: 'center' }}>Project Portfolio</span>
            <h2 className="heading-xl">Industrial &amp; Commercial Reference Benchmarks</h2>
            <span className="section-divider" style={{ margin: '1rem auto 1.5rem auto' }} />
            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.7 }}>
              Demonstration architectural benchmarks illustrating structural steel framing, pre-engineered building envelopes,
              gantry crane bays, and multi-storey commercial complexes.
            </p>
          </div>

          <div className="comm-projects-grid">
            {BENCHMARK_PROJECTS.map((proj) => (
              <div key={proj.id} className="comm-proj-card">
                <img
                  src={proj.image}
                  alt={proj.title}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="comm-proj-card__info">
                  <div className="comm-proj-card__tag">{proj.category}</div>
                  <h3 className="comm-proj-card__title">{proj.title}</h3>
                  <div className="comm-proj-card__meta">
                    <span>{proj.area}</span>
                    <span>&bull;</span>
                    <span>{proj.steel}</span>
                    <span>&bull;</span>
                    <span>{proj.span}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 7: 6-STEP INDUSTRIAL EPC METHODOLOGY
          ============================================================ */}
      <section className="section section--darkest" aria-label="Turnkey EPC Methodology">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem auto' }}>
            <span className="section-eyebrow" style={{ justifyContent: 'center' }}>Turnkey Delivery Flow</span>
            <h2 className="heading-xl" style={{ color: '#fff' }}>6-Step Turnkey EPC Methodology</h2>
            <span className="section-divider" style={{ margin: '1rem auto 1.5rem auto' }} />
            <p style={{ color: 'rgba(255, 255, 255, 0.72)', fontSize: '0.98rem', lineHeight: 1.7 }}>
              From conceptual design and statutory clearances to steel fabrication, rapid site erection, and final handover.
            </p>
          </div>

          <div className="comm-journey-grid">
            <div className="comm-journey-card">
              <div className="comm-journey-step">01</div>
              <h3 className="comm-journey-title">Concept &amp; Soil Investigation</h3>
              <p className="comm-journey-desc">
                Topographical surveys, borehole geotechnical soil investigation, and safe bearing capacity (SBC) determination for foundations.
              </p>
            </div>

            <div className="comm-journey-card">
              <div className="comm-journey-step">02</div>
              <h3 className="comm-journey-title">Statutory Clearances &amp; Approvals</h3>
              <p className="comm-journey-desc">
                Preparation and liaisoning of architectural master plans for municipal BDA/IDCO clearances, Factory Inspectorate, and Fire NOC.
              </p>
            </div>

            <div className="comm-journey-card">
              <div className="comm-journey-step">03</div>
              <h3 className="comm-journey-title">Tekla 3D Detailing &amp; Design</h3>
              <p className="comm-journey-desc">
                Complete computer-aided structural design, STAAD Pro wind/seismic simulations, and 3D Tekla shop fabrication drawing generation.
              </p>
            </div>

            <div className="comm-journey-card">
              <div className="comm-journey-step">04</div>
              <h3 className="comm-journey-title">Steel Fabrication with NDT Audits</h3>
              <p className="comm-journey-desc">
                Automated submerged arc welding, shot blasting to Sa 2.5, anti-corrosive epoxy primer application, and ultrasonic weld quality tests.
              </p>
            </div>

            <div className="comm-journey-card">
              <div className="comm-journey-step">05</div>
              <h3 className="comm-journey-title">Rapid On-Site PEB Erection</h3>
              <p className="comm-journey-desc">
                Fast-track erection using heavy mobile hydraulic cranes, high-strength torque-tightened anchor bolts, and Galvalume sheeting.
              </p>
            </div>

            <div className="comm-journey-card">
              <div className="comm-journey-step">06</div>
              <h3 className="comm-journey-title">VDF Flooring, MEP &amp; Handover</h3>
              <p className="comm-journey-desc">
                Laser-levelled Vacuum Dewatered Concrete (VDF) flooring, industrial lighting, stormwater drainage, and operational handover.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 8: DIRECT B2B TENDER & INQUIRY ACTION BANNER
          ============================================================ */}
      <section style={{ background: 'var(--navy)', padding: '3.5rem 0', borderTop: '2px solid var(--gold)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
            <div style={{ maxWidth: '640px' }}>
              <div className="comm-badge">Direct Line to Leadership</div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, color: '#fff', marginBottom: '0.65rem' }}>
                Initiate Your Commercial or Industrial Project Today
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.78)', fontSize: '0.95rem', lineHeight: 1.65 }}>
                Speak directly with <strong>Director Er. Srinivas Nayak</strong> to discuss site feasibility, structural steel schedules, and turnkey EPC pricing for projects across Odisha.
              </p>
              <div style={{ marginTop: '1rem', fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.55)', display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                <span><strong>CIN:</strong> {COMPANY.cin}</span>
                <span><strong>GSTIN:</strong> {COMPANY.gstin}</span>
                <span><strong>MSME:</strong> {COMPANY.msmeRegistrations[0]}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', minWidth: '280px' }}>
              <a
                href={getWhatsAppURL('Hello Er. Srinivas Nayak, I would like to schedule a site consultation for a commercial/industrial building project.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                <MessageCircle size={20} />
                WhatsApp: 7008087497
              </a>

              <a
                href={`tel:${COMPANY.phones[0].replace(/[^\d+]/g, '')}`}
                className="btn btn-outline-white btn-lg"
              >
                <Phone size={18} />
                Call: {COMPANY.phones[0]}
              </a>

              <Link to="/contact" className="btn btn-primary btn-sm" style={{ textAlign: 'center' }}>
                Visit Rourkela Head Office <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
