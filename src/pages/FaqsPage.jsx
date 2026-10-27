import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircle, Phone } from 'lucide-react';
import { FAQS_DATA } from '../data/faqs';
import { COMPANY, getWhatsAppURL } from '../config/company';

export default function FaqsPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="faqs-page" style={{ paddingTop: 'var(--header-h)' }}>
      {/* Header */}
      <section
        style={{
          background: 'var(--navy-darkest)',
          padding: 'clamp(3.5rem, 6vw, 5.5rem) 0',
          borderBottom: '1px solid var(--border-gold)',
          position: 'relative',
        }}
      >
        <div className="container">
          <span className="section-eyebrow">The Company &bull; Knowledge Base</span>
          <h1 className="heading-hero" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', marginBottom: '1.25rem' }}>
            Frequently Asked <span style={{ color: 'var(--gold)' }}>Questions</span>
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.78)', maxWidth: '760px', fontSize: '1.05rem', lineHeight: 1.75 }}>
            Answers to common questions regarding drawing approval assistance, CPWD alignment,
            private raw material procurement, structural steelwork, and palace architecture execution.
          </p>
        </div>
      </section>

      {/* FAQs List */}
      <section className="section section--warm">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '4rem' }}>
            {FAQS_DATA.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  style={{
                    background: '#fff',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    boxShadow: isOpen ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                    transition: 'var(--transition)',
                  }}
                >
                  <button
                    onClick={() => toggle(index)}
                    style={{
                      width: '100%',
                      padding: '1.5rem 1.75rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '1rem',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    aria-expanded={isOpen}
                  >
                    <div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-dark)', display: 'block', marginBottom: '4px' }}>
                        {faq.category}
                      </span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy)' }}>
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown
                      size={20}
                      style={{
                        color: 'var(--gold-dark)',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                        flexShrink: 0,
                      }}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div
                          style={{
                            padding: '0 1.75rem 1.5rem 1.75rem',
                            color: 'var(--text-dark)',
                            fontSize: '0.94rem',
                            lineHeight: 1.75,
                            borderTop: '1px solid rgba(0,0,0,0.05)',
                            paddingTop: '1rem',
                          }}
                        >
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Need Further Clarification Box */}
          <div
            style={{
              background: 'var(--navy)',
              border: '1px solid var(--border-gold)',
              borderRadius: 'var(--radius-sm)',
              padding: '2.5rem',
              color: '#fff',
              textAlign: 'center',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Have a Specific Technical Question for Your Site?
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.72)', fontSize: '0.92rem', marginBottom: '1.75rem', maxWidth: '600px', margin: '0 auto 1.75rem auto' }}>
              Reach out directly to our engineering management desk via WhatsApp or phone call.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href={getWhatsAppURL('Hello Srinivas Nayak & Construction, I have a specific technical question regarding a project.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <MessageCircle size={16} /> WhatsApp Inquiry
              </a>
              <a
                href={`tel:${COMPANY.phones[0].replace(/[^\d+]/g, '')}`}
                className="btn btn-outline-white"
              >
                <Phone size={16} /> Call: {COMPANY.phones[0]}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
