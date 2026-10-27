// ============================================================
// COMPANY CONFIGURATION — SRINIVAS NAYAK AND CONSTRUCTION PVT. LTD.
// Authoritative client-supplied business information & configuration
// ============================================================

export const COMPANY = {
  name: "SRINIVAS NAYAK AND CONSTRUCTION PVT. LTD.",
  legalName: "Srinivas Nayak and Construction Private Limited",
  shortName: "SNC Construction",
  welcomeMessage: "Welcome to the SRINIVAS NAYAK AND CONSTRUCTION PVT. LTD. family.",
  businessCategory: "Service and Manufacturing Consultancy",
  tagline: "Public Service for God Service",

  // === STATUTORY & REGISTRATION DETAILS (Client-Supplied) ===
  cin: "U41001OD2023PTC044544",
  msmeRegistrations: [
    "UDYAM-OD-30-0025620",
    "UDYAM-OD-30-0004690",
  ],
  gstin: "21BPSPN6368E1ZL",

  // === LEADERSHIP ===
  director: "Er. Srinivas Nayak",
  leadership: [
    {
      name: "Er. Srinivas Nayak",
      role: "Director / CEO",
      qualification: "Consult on Engineer",
    },
    {
      name: "Mr. Indra Kishan",
      role: "Relationship Manager",
      qualification: "Client Relations & Project Coordination",
    },
  ],

  // === POSITIONING & SPECIALIZATION ===
  positioning: "A construction company focused on quality, quantity, reliable service, and work aligned with applicable CPWD guidelines.",
  specialization: "Building palaces and premium buildings",
  coreBusiness: "Construction, engineering services, building development, structural steelwork, fabrication, installation, and associated building services.",

  // === CERTIFICATIONS (Client-Stated) ===
  // Note: Client states company is ISO certified. Presented with transparent disclaimer.
  certifications: [
    { title: "ISO 9001:2015", scope: "Quality Management System" },
    { title: "ISO 14001:2015", scope: "Environmental Management" },
    { title: "ISO 45001:2018", scope: "Occupational Health & Safety" },
  ],
  accreditations: ["SMRC", "RBS"],

  // === CONTACT DETAILS ===
  phones: ["+91 70080 87497", "+91 70772 13963", "+91 90408 46265"],
  whatsappPrimary: "917008087497",
  whatsappSecondary: "917077213963",
  email: "srinivasnayak314@gmail.com",
  website: "https://srinivasconstruction.in/",

  // === PHYSICAL ADDRESS ===
  address: {
    complex: "Mohanty Complex",
    highway: "NH-143",
    postOffice: "P.O. Jalda 'C' Block",
    city: "Rourkela",
    pin: "769043",
    district: "Sundargarh",
    state: "Odisha",
    country: "India",
    full: "NH-143, Mohanty Complex, P.O. Jalda 'C' Block, Rourkela – 769 043, Dist. Sundargarh, Odisha, India",
  },

  // === SOCIAL ===
  facebook: "https://www.facebook.com/SRINIVASNAYAKANDCONSTRUCTION",

  // === THE 14 CLIENT-PROVIDED SERVICES ===
  services: [
    {
      id: "drawing-approval",
      category: "Planning & Approvals",
      title: "Drawing Approval Assistance",
      shortDesc: "Assisting clients with architectural drafting reviews, structural submissions, and coordination for local municipal drawing approvals.",
      deliverables: ["Architectural floor plans", "Structural layout coordination", "Authority submission assistance", "Compliance alignment"],
    },
    {
      id: "land-development",
      category: "Civil Works",
      title: "Land Development",
      shortDesc: "Comprehensive site preparation, leveling, plot boundary demarcation, soil assessment coordination, and access road infrastructure.",
      deliverables: ["Site grading & clearing", "Soil stabilization prep", "Access pathways & drainage", "Boundary demarcation"],
    },
    {
      id: "building-construction",
      category: "Civil Works",
      title: "House and Building Construction",
      shortDesc: "Full-scope turnkey RCC framed structures, masonry, foundation work, and structural construction for residential and commercial buildings.",
      deliverables: ["Excavation & deep foundations", "RCC columns, beams & slabs", "Brick & block masonry", "Superstructure execution"],
    },
    {
      id: "structural-steelwork",
      category: "Fabrication & Structural",
      title: "Structural Steelwork",
      shortDesc: "Precision engineering, assembly, and erection of structural steel columns, beams, girders, and industrial heavy frameworks.",
      deliverables: ["Heavy structural steel erection", "I-beam & channel framing", "Load-bearing metal joints", "Industrial shed framing"],
    },
    {
      id: "metal-fabrication",
      category: "Fabrication & Structural",
      title: "Metal Fabrication",
      shortDesc: "Custom architectural metalwork, MS & SS gates, decorative railings, safety grilles, staircases, and specialized metal enclosures.",
      deliverables: ["Mild & Stainless Steel fabrication", "Custom security gates & grilles", "Staircase stringers & handrails", "Custom architectural metal"],
    },
    {
      id: "truss-roofing",
      category: "Fabrication & Structural",
      title: "Truss and Roofing Installation",
      shortDesc: "Engineered steel roof trusses, tubular frameworks, corrugated industrial color-coated sheets, and insulated roofing solutions.",
      deliverables: ["Tubular & angle truss fabrication", "Profile sheet installation", "Rainwater guttering & flashing", "Insulated roofing panels"],
    },
    {
      id: "doors-windows",
      category: "Interiors & Joinery",
      title: "Aluminium and PVC Sliding Doors & Windows",
      shortDesc: "Modern anodized and powder-coated aluminium sections, UPVC soundproof sliding window systems, and durable weather-sealed glazing.",
      deliverables: ["Heavy-duty sliding window tracks", "Toughened glass installations", "UPVC multi-chamber profiles", "Weatherproof silicone sealing"],
    },
    {
      id: "woodwork-carpentry",
      category: "Interiors & Joinery",
      title: "Woodwork and Carpentry",
      shortDesc: "Bespoke hardwood door frames, solid wood flush doors, modular kitchen cabinetry, wardrobe construction, and architectural trim.",
      deliverables: ["Hardwood frames & shutters", "Modular kitchen woodwork", "Custom veneer & laminate work", "Architectural mouldings"],
    },
    {
      id: "electrical-work",
      category: "MEP & Utilities",
      title: "Electrical Work",
      shortDesc: "Concealed conduit piping, premium copper wiring, distribution boards, MCB protection systems, inverter wiring, and designer lighting layout.",
      deliverables: ["Concealed conduit routing", "Distribution board & switchgear", "Phase balancing & earthing", "Interior & exterior illumination"],
    },
    {
      id: "plumbing-sanitary",
      category: "MEP & Utilities",
      title: "Plumbing and Sanitary Work",
      shortDesc: "Complete hot and cold water distribution networks, CPVC/UPVC piping, sanitary ware fitting, drainage line laying, and septic connections.",
      deliverables: ["Concealed pipe installations", "Sanitary fixture fitting", "Sewage & soil waste piping", "Overhead tank connections"],
    },
    {
      id: "painting-work",
      category: "Finishing Works",
      title: "Painting Work",
      shortDesc: "Interior wall putty application, premium emulsion coats, weatherproof exterior silicone paints, texture finishes, and enamel coatings.",
      deliverables: ["Double-coat wall putty prep", "Anti-fungal primer coats", "Premium emulsion finishing", "Weather-resistant exterior paint"],
    },
    {
      id: "tile-installation",
      category: "Finishing Works",
      title: "Tile Installation",
      shortDesc: "Vitrified floor tiling, ceramic wall tiles, anti-skid bathroom tiling, granite counter slab polishing, and precision edge beveling.",
      deliverables: ["Laser-level tile alignment", "Granite & marble countertops", "Vitrified large-format slabs", "Epoxy grouting & sealing"],
    },
    {
      id: "false-ceiling",
      category: "Finishing Works",
      title: "False Ceiling Installation",
      shortDesc: "Gypsum board false ceilings, perimeter cove lighting channels, POP decorative moldings, and grid ceiling panels for offices.",
      deliverables: ["GI metal framework framing", "Moisture-resistant gypsum boards", "LED cove lighting channels", "Acoustic ceiling grids"],
    },
    {
      id: "related-building-services",
      category: "Specialized Services",
      title: "Other Related Building Services",
      shortDesc: "Comprehensive turnkey coordination, waterproofing solutions, compound wall construction, paver block walkways, and site management.",
      deliverables: ["Terrace & basement waterproofing", "Interlocking paver walkways", "Boundary walls & retaining walls", "Turnkey site supervision"],
    },
  ],

  // === 5-STEP WORKING PROCESS ===
  processSteps: [
    {
      step: "01",
      title: "Initial Consultation",
      desc: "Understand the client's vision, site dimensions, functional needs, scope of work, and targeted project budget.",
    },
    {
      step: "02",
      title: "Planning and Coordination",
      desc: "Review architectural drawings, structural layouts, material specifications, and applicable municipal approval requirements.",
    },
    {
      step: "03",
      title: "Construction and Execution",
      desc: "Mobilize engineering supervisors, skilled labor, quality materials, and structural fabrication aligned with agreed milestones.",
    },
    {
      step: "04",
      title: "Finishing and Quality Checks",
      desc: "Conduct thorough inspection of civil works, MEP installations, surface finishes, and adherence to agreed standards and CPWD guidelines.",
    },
    {
      step: "05",
      title: "Handover & Documentation",
      desc: "Complete the formal walk-through, deliver final project documentation, warranties, and officially hand over the completed building.",
    },
  ],

  // === QUALITY & CPWD-ALIGNED COMMITMENT ===
  standardsCommitment: {
    headline: "Quality in Every Detail. Precision in Every Project.",
    subheadline: "Work aligned with applicable CPWD guidelines, structural rigor, and quality workmanship.",
    pillars: [
      {
        title: "Quality-Conscious Execution",
        desc: "Strict adherence to approved engineering drawings, structural mix ratios, and methodical construction techniques.",
      },
      {
        title: "Material & Workmanship Checks",
        desc: "Regular inspection of incoming cement, TMT steel grades, aggregate quality, and skilled finishing craftsmanship.",
      },
      {
        title: "Project Coordination",
        desc: "Seamless synchronization between civil, electrical, plumbing, metal fabrication, and interior joinery teams.",
      },
      {
        title: "Applicable Engineering Requirements",
        desc: "Benchmarking execution against recognized civil engineering principles and applicable CPWD technical guidelines.",
      },
    ],
  },
};

// ============================================================
// WHATSAPP HELPER
// ============================================================
export function buildWhatsAppURL(phone, message = "") {
  const cleanPhone = phone.replace(/[^\d]/g, "");
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}${encoded ? `?text=${encoded}` : ""}`;
}

export function getWhatsAppURL(message = "") {
  return buildWhatsAppURL(COMPANY.whatsappPrimary, message);
}
