// ============================================================
// ALL 30 DISTRICTS OF ODISHA — DATA CONFIGURATION
// Matching JSW One Homes style city/district selector
// ============================================================

export const ODISHA_DISTRICTS = [
  { id: "sundargarh", name: "Sundargarh (Rourkela)", shortName: "Rourkela / Sundargarh", isHQ: true, popular: true, zone: "Western Odisha" },
  { id: "khordha", name: "Khordha (Bhubaneswar)", shortName: "Bhubaneswar / Khordha", isCapital: true, popular: true, zone: "Coastal Odisha" },
  { id: "cuttack", name: "Cuttack", shortName: "Cuttack", popular: true, zone: "Coastal Odisha" },
  { id: "sambalpur", name: "Sambalpur", shortName: "Sambalpur", popular: true, zone: "Western Odisha" },
  { id: "jharsuguda", name: "Jharsuguda", shortName: "Jharsuguda", popular: true, zone: "Western Odisha" },
  { id: "balasore", name: "Balasore (Baleswar)", shortName: "Balasore", popular: true, zone: "Northern Odisha" },
  { id: "ganjam", name: "Ganjam (Berhampur)", shortName: "Berhampur / Ganjam", popular: true, zone: "Southern Odisha" },
  { id: "angul", name: "Angul", shortName: "Angul", popular: true, zone: "Central Odisha" },
  { id: "puri", name: "Puri", shortName: "Puri", popular: true, zone: "Coastal Odisha" },
  { id: "jajpur", name: "Jajpur", shortName: "Jajpur", popular: true, zone: "Coastal Odisha" },
  { id: "bargarh", name: "Bargarh", shortName: "Bargarh", popular: false, zone: "Western Odisha" },
  { id: "bhadrak", name: "Bhadrak", shortName: "Bhadrak", popular: false, zone: "Coastal Odisha" },
  { id: "balangir", name: "Balangir (Bolangir)", shortName: "Balangir", popular: false, zone: "Western Odisha" },
  { id: "mayurbhanj", name: "Mayurbhanj (Baripada)", shortName: "Baripada / Mayurbhanj", popular: false, zone: "Northern Odisha" },
  { id: "kendujhar", name: "Kendujhar (Keonjhar)", shortName: "Keonjhar", popular: false, zone: "Northern Odisha" },
  { id: "dhenkanal", name: "Dhenkanal", shortName: "Dhenkanal", popular: false, zone: "Central Odisha" },
  { id: "jagatsinghpur", name: "Jagatsinghpur (Paradeep)", shortName: "Jagatsinghpur / Paradeep", popular: false, zone: "Coastal Odisha" },
  { id: "kendrapara", name: "Kendrapara", shortName: "Kendrapara", popular: false, zone: "Coastal Odisha" },
  { id: "kalahandi", name: "Kalahandi (Bhawanipatna)", shortName: "Bhawanipatna / Kalahandi", popular: false, zone: "South-Western Odisha" },
  { id: "rayagada", name: "Rayagada", shortName: "Rayagada", popular: false, zone: "Southern Odisha" },
  { id: "koraput", name: "Koraput (Jeypore)", shortName: "Jeypore / Koraput", popular: false, zone: "Southern Odisha" },
  { id: "nayagarh", name: "Nayagarh", shortName: "Nayagarh", popular: false, zone: "Central Odisha" },
  { id: "nuapada", name: "Nuapada", shortName: "Nuapada", popular: false, zone: "Western Odisha" },
  { id: "deogarh", name: "Deogarh (Debagarh)", shortName: "Deogarh", popular: false, zone: "Western Odisha" },
  { id: "subarnapur", name: "Subarnapur (Sonepur)", shortName: "Sonepur", popular: false, zone: "Western Odisha" },
  { id: "nabarangpur", name: "Nabarangpur", shortName: "Nabarangpur", popular: false, zone: "Southern Odisha" },
  { id: "boudh", name: "Boudh", shortName: "Boudh", popular: false, zone: "Central Odisha" },
  { id: "gajapati", name: "Gajapati (Paralakhemundi)", shortName: "Paralakhemundi", popular: false, zone: "Southern Odisha" },
  { id: "kandhamal", name: "Kandhamal (Phulbani)", shortName: "Phulbani / Kandhamal", popular: false, zone: "Central Odisha" },
  { id: "malkangiri", name: "Malkangiri", shortName: "Malkangiri", popular: false, zone: "Southern Odisha" },
  { id: "other", name: "Other Locations in Odisha", shortName: "Pan-Odisha", popular: false, zone: "All Odisha" }
];

export const RESIDENTIAL_PACKAGES = [
  {
    id: "classic",
    name: "Classic Home Package",
    tagline: "High Quality Turnkey Living",
    ratePerSqFt: 1650,
    popular: false,
    color: "#173F67",
    highlights: [
      "Fe 550D TMT Reinforcement Steel",
      "Grade 53 Branded Cement (UltraTech/ACC)",
      "First-Class Red Clay Bricks / AAC Blocks",
      "Vitrified Tile Flooring (2x2 ft)",
      "Anchor / Havells Concealed Wiring",
      "Branded CPVC/UPVC Plumbing (Supreme/Ashirvad)",
      "Waterproofing & Weather-coat Exterior Paint",
      "5-Year Structural Construction Warranty"
    ],
    features: {
      structure: "Standard CPWD-aligned RCC frame, isolated footing",
      steel: "Fe 550D TMT primary reinforcement",
      walls: "9\" exterior walls, 4.5\" partition brickwork",
      doors: "Teak finish engineered main door, flush internal doors",
      flooring: "Glossy vitrified tiles across living & bed chambers",
      paint: "Interior tractor emulsion, exterior weatherproof",
      kitchen: "Polished black granite slab with stainless steel sink",
      bathroom: "Cera / Hindware sanitaryware & chrome fittings"
    }
  },
  {
    id: "premium",
    name: "Premium Villa Package",
    tagline: "Our Most Popular Choice for Modern Homes",
    ratePerSqFt: 2050,
    popular: true,
    color: "#C6A15B",
    highlights: [
      "Heavy-Duty Seismic Resilient RCC Framing",
      "Soundproof UPVC Windows with Toughened Glass",
      "Designer Gypsum False Ceiling with LED Grooves",
      "Large-Format 4x2 ft Glazed Vitrified Tiles",
      "Granite Kitchen Platform & Modular Provisions",
      "Jaquar / Kohler Luxury Bath Fittings",
      "Asian Paints Royale Luxury Interior Finish",
      "10-Year Comprehensive Structural Warranty"
    ],
    features: {
      structure: "Seismic-resistant RCC column and plinth design",
      steel: "Tata Tiscon / Jindal Panther Fe 550D TMT",
      walls: "Solid masonry with double-coat smooth plaster",
      doors: "Solid wood entrance door with digital biometric lock",
      flooring: "Italian-look 1200x600 mm glazed vitrified tiles",
      paint: "Asian Paints Royale Luxury Interior + Apex Ultima Exterior",
      kitchen: "Premium granite platform, stainless double bowl sink",
      bathroom: "Concealed diverters, wall-hung WC, designer vanity"
    }
  },
  {
    id: "royal-palace",
    name: "Royal Palace & Luxury Package",
    tagline: "Er. Srinivas Nayak Signature Specialization",
    ratePerSqFt: 2750,
    popular: false,
    color: "#102A43",
    highlights: [
      "Monumental Palace Elevation & Ornate Porticos",
      "Heavy Structural Steel Trusses & Architectural Metalwork",
      "Imported Italian Marble & Designer Granite Flooring",
      "Handcrafted Teakwood Double Doors & Carved Facades",
      "Toughened Glass Balustrades with SS 304 Railings",
      "Smart Home Automation Conduits & EV Charging Point",
      "Exterior Landscape Paving & Compound Gate Design",
      "15-Year Executive Structural Warranty"
    ],
    features: {
      structure: "Monumental column architecture, heavy slab load bearing",
      steel: "Heavy ISMB / ISMC structural steel & Fe 550D primary bars",
      walls: "Architectural moulding, stone cladding & damp-proof treatment",
      doors: "Custom carved Burma teak main entrance door",
      flooring: "Italian marble in living, wooden laminate in master suites",
      paint: "PU finish woodwork, luxury Venetian plaster accents",
      kitchen: "Island counter layout with granite & quartz provisions",
      bathroom: "Grohe / Kohler premium fixtures with glass shower partitions"
    }
  }
];

export const RESIDENTIAL_DESIGNS = [
  {
    id: "snc-des-01",
    title: "The Regal Duplex Villa",
    type: "Modern Duplex",
    bhk: "4 BHK",
    floors: "G+1",
    minPlot: "30 x 50 ft (1,500 sq.ft)",
    builtUp: "2,400 sq.ft",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=85",
    features: ["Double Height Living", "Covered Car Porch", "Master Bedroom Terrace", "Open Kitchen"]
  },
  {
    id: "snc-des-02",
    title: "Grand Palace Heritage Residence",
    type: "Palace Style",
    bhk: "5 BHK + Study",
    floors: "G+2",
    minPlot: "40 x 60 ft (2,400 sq.ft)",
    builtUp: "4,600 sq.ft",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=85",
    features: ["Classical Roman Portico", "Stone Clad Facades", "Expansive Rooftop Gazebo", "Home Theatre Room"]
  },
  {
    id: "snc-des-03",
    title: "The Contemporary Glass Villa",
    type: "Luxury Villa",
    bhk: "3 BHK",
    floors: "G+1",
    minPlot: "30 x 40 ft (1,200 sq.ft)",
    builtUp: "1,950 sq.ft",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85",
    features: ["Floor-to-Ceiling Windows", "Minimalist Modern Lines", "Skylight Stairwell", "Terrace Garden"]
  },
  {
    id: "snc-des-04",
    title: "Urban Horizon Family Home",
    type: "Modern Duplex",
    bhk: "3 BHK",
    floors: "G+1",
    minPlot: "25 x 45 ft (1,125 sq.ft)",
    builtUp: "1,750 sq.ft",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=85",
    features: ["Space Optimized Plan", "Vastu Compliant", "Independent Covered Parking", "Utility Balcony"]
  }
];

export const TURNKEY_STEPS = [
  {
    step: "01",
    title: "Soil Test & Digital Survey",
    desc: "Comprehensive geotechnical soil investigation and laser topographical plot survey to determine structural footing depth."
  },
  {
    step: "02",
    title: "Architectural 2D & 3D Design",
    desc: "Custom architectural floor plans, 3D exterior elevations, Vastu alignment, and structural engineering beam drawings."
  },
  {
    step: "03",
    title: "Approvals & Fixed Agreement",
    desc: "Municipal drawing approval assistance and signing a clear contract with milestone-linked billing and zero hidden surprises."
  },
  {
    step: "04",
    title: "RCC Superstructure & Civil Work",
    desc: "Earthwork excavation, anti-termite treatment, seismic column casting, brick masonry, and high-tensile slab casting."
  },
  {
    step: "05",
    title: "Finishing, MEP & Carpentry",
    desc: "Concealed electrical and plumbing lines, vitrified tiling, UPVC windows, false ceilings, and premium paint application."
  },
  {
    step: "06",
    title: "300+ Quality Audit & Handover",
    desc: "Multi-point inspection, thorough cleaning, and ceremonial key handover with structural warranty documents."
  }
];
