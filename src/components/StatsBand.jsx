import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building, Wrench, Layers, ShieldCheck } from 'lucide-react';
import '../styles/stats-services.css';

const HIGHLIGHTS = [
  {
    icon: Building,
    title: "Comprehensive Construction",
    subtitle: "Turnkey Civil, Residential & Commercial",
  },
  {
    icon: Wrench,
    title: "Structural Steel & Fabrication",
    subtitle: "Precision Trusses, Columns & Metalwork",
  },
  {
    icon: Layers,
    title: "Integrated Building Solutions",
    subtitle: "MEP, Joinery, Roofing & Fine Finishing",
  },
  {
    icon: ShieldCheck,
    title: "Quality-Focused Execution",
    subtitle: "Work Aligned with Applicable CPWD Guidelines",
  },
];

export default function StatsBand() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="stats-band" aria-label="Company core highlights" ref={ref}>
      <div className="stats-band__grid">
        {HIGHLIGHTS.map((item, i) => (
          <motion.div
            key={i}
            className="stats-band__item"
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="stats-band__icon">
              <item.icon size={26} />
            </div>
            <h3 className="stats-band__title">
              {item.title}
            </h3>
            <p className="stats-band__label">
              {item.subtitle}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
