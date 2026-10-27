import { motion } from 'framer-motion';
import { ShieldCheck, FileCheck, Award, Building, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY, getWhatsAppURL } from '../config/company';

export default function AboutPage() {
  return (
    <div className="about-page" style={{ paddingTop: 'var(--header-h)' }}>
      {/* Hero Header */}
      <section
        style={{
          background: 'var(--navy-darkest)',
          padding: 'clamp(3.5rem, 6vw, 5.5rem) 0',
          borderBottom: '1px solid var(--border-gold)',
          position: 'relative',
        }}
      >
        <div className="container">
          <span className="section-eyebrow">The Company &bull; Corporate Profile</span>
          <h1 className="heading-hero" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', marginBottom: '1.25rem' }}>
            Engineering Trust. <span style={{ color: 'var(--gold)' }}>Building the Future.</span>
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.78)', maxWidth: '780px', fontSize: '1.05rem', lineHeight: 1.75 }}>
            {COMPANY.welcomeMessage} We operate as an integrated {COMPANY.businessCategory} based in Rourkela,
            Sundargarh, Odisha, dedicated to quality, quantity, reliable execution, and work aligned with applicable CPWD guidelines.
          </p>
        </div>
      </section>

      {/* Main Profile & Statutory Records */}
      <section className="section section--warm">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '3rem',
              alignItems: 'center',
              marginBottom: '4rem',
            }}
          >
            <div>
              <span className="section-eyebrow">Our Foundation</span>
              <h2 className="heading-xl" style={{ marginBottom: '1.25rem' }}>
                Corporate Background &amp; Engineering Philosophy
              </h2>
              <p style={{ color: 'var(--text-dark)', fontSize: '0.96rem', lineHeight: 1.75, marginBottom: '1.25rem' }}>
                Incorporated in 2023 under Corporate Identity Number (CIN) <strong>{COMPANY.cin}</strong>,
                Srinivas Nayak and Construction Private Limited was founded under the directorship of <strong>Er. Srinivas Nayak</strong>.
                Our guiding motto, <em>&ldquo;{COMPANY.tagline}&rdquo;</em>, reflects our commitment to principled business conduct,
                safety, and technical thoroughness.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                We bring together civil engineering, structural steel fabrication, roofing systems, and fine interior carpentry
                under a single accountability framework. Our stated specialization lies in <strong>{COMPANY.specialization}</strong>,
                delivering classical and modern structures built to endure generations.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/leadership" className="btn btn-navy">
                  View Leadership Team <ArrowRight size={15} />
                </Link>
                <Link to="/contact" className="btn btn-outline-gold">
                  Contact Our Office
                </Link>
              </div>
            </div>

            {/* Corporate Registration Box */}
            <div
              style={{
                background: '#fff',
                border: '1.5px solid var(--border-light)',
                borderRadius: 'var(--radius-sm)',
                padding: '2.5rem',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '1.5rem', borderBottom: '2px solid var(--gold)', paddingBottom: '0.65rem' }}>
                Statutory Identifiers &amp; Registration
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-dark)' }}>
                    Corporate Identity Number (CIN)
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--navy)', marginTop: '2px' }}>
                    {COMPANY.cin}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-dark)' }}>
                    MSME UDYAM Registration (Primary)
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginTop: '2px' }}>
                    {COMPANY.msmeRegistrations[0]}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-dark)' }}>
                    MSME UDYAM Registration (Secondary)
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginTop: '2px' }}>
                    {COMPANY.msmeRegistrations[1]}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-dark)' }}>
                    GST Identification Number (GSTIN)
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginTop: '2px' }}>
                    {COMPANY.gstin}
                  </div>
                </div>

                <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-light)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Registered Office: {COMPANY.address.full}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ISO Quality Accreditations (Client-Reported) */}
      <section className="section section--darkest">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem auto' }}>
            <span className="section-eyebrow" style={{ justifyContent: 'center' }}>Management Systems</span>
            <h2 className="heading-xl">Quality &amp; Standards Alignment</h2>
            <span className="section-divider" style={{ margin: '1rem auto 1.5rem auto' }} />
            <p style={{ color: 'rgba(255, 255, 255, 0.72)', fontSize: '0.98rem', lineHeight: 1.7 }}>
              Workmanship executed in accordance with applicable CPWD technical guidelines and recognized management systems.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: '1.5rem',
            }}
          >
            {COMPANY.certifications.map((cert) => (
              <div
                key={cert.title}
                style={{
                  background: 'var(--navy-deep)',
                  border: '1px solid var(--border-gold)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '2.25rem 1.75rem',
                  textAlign: 'center',
                }}
              >
                <div style={{ width: '48px', height: '48px', margin: '0 auto 1rem auto', borderRadius: '50%', background: 'rgba(198, 161, 91, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)' }}>
                  <ShieldCheck size={24} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '0.35rem' }}>
                  {cert.title}
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.85rem' }}>
                  {cert.scope}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
