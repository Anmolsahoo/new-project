import { motion } from 'framer-motion';
import { UserCheck, Phone, Mail, MessageCircle, ShieldCheck, HardHat, Award } from 'lucide-react';
import { COMPANY, getWhatsAppURL } from '../config/company';

export default function LeadershipPage() {
  return (
    <div className="leadership-page" style={{ paddingTop: 'var(--header-h)' }}>
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
          <span className="section-eyebrow">The Company &bull; Governance</span>
          <h1 className="heading-hero" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', marginBottom: '1.25rem' }}>
            Executive Leadership &amp; <span style={{ color: 'var(--gold)' }}>Engineering Authority</span>
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.78)', maxWidth: '760px', fontSize: '1.05rem', lineHeight: 1.75 }}>
            Led by experienced engineering practitioners dedicated to structured project delivery,
            transparent client communication, and strict adherence to structural safety standards.
          </p>
        </div>
      </section>

      {/* Leadership Profiles */}
      <section className="section section--warm">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: '2.5rem',
              marginBottom: '4rem',
            }}
          >
            {/* Er. Srinivas Nayak Profile */}
            <div
              style={{
                background: '#fff',
                border: '2px solid var(--gold)',
                borderRadius: 'var(--radius-sm)',
                boxShadow: 'var(--shadow-md)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  background: 'var(--navy)',
                  padding: '2.5rem 2rem',
                  color: '#fff',
                  borderBottom: '1px solid var(--border-gold)',
                  position: 'relative',
                }}
              >
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--navy-darkest)', marginBottom: '1.25rem' }}>
                  <HardHat size={32} />
                </div>
                <span style={{ fontSize: '0.74rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold-light)' }}>
                  Director &bull; Chief Executive Officer
                </span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginTop: '4px' }}>
                  Er. Srinivas Nayak
                </h2>
                <div style={{ fontSize: '0.85rem', color: 'var(--gold)', fontWeight: 700, marginTop: '2px' }}>
                  &ldquo;Consult on Engineer&rdquo;
                </div>
              </div>

              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <p style={{ color: 'var(--text-dark)', fontSize: '0.94rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                  As Director and Chief Executive of Srinivas Nayak and Construction Pvt. Ltd., Er. Srinivas Nayak
                  provides primary technical and operational direction for all civil, structural steel, and turnkey building
                  projects. His philosophy emphasizes strict alignment with approved architectural plans, verified material
                  mix ratios, and applicable CPWD guidelines.
                </p>

                <div style={{ marginTop: 'auto', paddingTop: '1.25rem', borderTop: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.86rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--navy)' }}>
                      <Phone size={15} style={{ color: 'var(--gold-dark)' }} />
                      <a href={`tel:${COMPANY.phones[0].replace(/[^\d+]/g, '')}`} style={{ fontWeight: 700 }}>
                        {COMPANY.phones[0]}
                      </a>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--navy)' }}>
                      <Mail size={15} style={{ color: 'var(--gold-dark)' }} />
                      <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
                    </div>
                  </div>

                  <div style={{ marginTop: '1.5rem' }}>
                    <a
                      href={getWhatsAppURL('Hello Er. Srinivas Nayak, I would like to schedule a project consultation with you.')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{ width: '100%' }}
                    >
                      <MessageCircle size={16} /> Consult Directly on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Mr. Indra Kishan Profile */}
            <div
              style={{
                background: '#fff',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-sm)',
                boxShadow: 'var(--shadow-sm)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  background: 'var(--navy-mid)',
                  padding: '2.5rem 2rem',
                  color: '#fff',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  position: 'relative',
                }}
              >
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-light)', marginBottom: '1.25rem' }}>
                  <UserCheck size={32} />
                </div>
                <span style={{ fontSize: '0.74rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold-light)' }}>
                  Executive Management
                </span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginTop: '4px' }}>
                  Mr. Indra Kishan
                </h2>
                <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.75)', fontWeight: 600, marginTop: '2px' }}>
                  Relationship Manager
                </div>
              </div>

              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <p style={{ color: 'var(--text-dark)', fontSize: '0.94rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                  Mr. Indra Kishan heads client relations, schedule coordination, and raw material procurement logistics.
                  He serves as the primary liaison between property owners, commercial clients, and site engineering supervisors,
                  ensuring smooth milestone deliveries and transparent account billing.
                </p>

                <div style={{ marginTop: 'auto', paddingTop: '1.25rem', borderTop: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.86rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--navy)' }}>
                      <Phone size={15} style={{ color: 'var(--gold-dark)' }} />
                      <a href={`tel:${COMPANY.phones[2].replace(/[^\d+]/g, '')}`} style={{ fontWeight: 700 }}>
                        {COMPANY.phones[2]}
                      </a>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--navy)' }}>
                      <Mail size={15} style={{ color: 'var(--gold-dark)' }} />
                      <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
                    </div>
                  </div>

                  <div style={{ marginTop: '1.5rem' }}>
                    <a
                      href={getWhatsAppURL('Hello Mr. Indra Kishan, I would like to inquire about project coordination and billing.')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-navy"
                      style={{ width: '100%' }}
                    >
                      <MessageCircle size={16} /> Contact Relationship Desk
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
