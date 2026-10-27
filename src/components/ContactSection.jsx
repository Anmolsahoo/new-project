import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageCircle, Phone, Mail, MapPin, Send, CheckCircle, FileText } from 'lucide-react';
import { COMPANY, getWhatsAppURL } from '../config/company';
import '../styles/contact-footer.css';

const CATEGORIES = [
  'Palaces & Premium Buildings',
  'House & Building Construction',
  'Structural Steelwork & Metal Fabrication',
  'Truss & Roofing Installation',
  'Interior & Joinery (Doors/Windows/Woodwork)',
  'Finishing (Painting/Tiles/False Ceiling)',
  'Land Development & Drawing Approvals',
  'Other Specialized Services',
];

const EMPTY = {
  name: '',
  phone: '',
  category: '',
  location: '',
  materials: '',
  budget: '',
  message: '',
};

const REQUIRED = ['name', 'phone', 'category', 'message'];

function validate(form) {
  const errs = {};
  REQUIRED.forEach((k) => {
    if (!form[k].trim()) errs[k] = 'This field is required';
  });
  if (form.phone && !/^[\d\s\+\-]{7,15}$/.test(form.phone)) {
    errs.phone = 'Enter a valid phone number';
  }
  return errs;
}

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((e) => { const n = { ...e }; delete n[name]; return n; });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 500));

    const msg = [
      `🏛️ *Project Consultation Request — SNC Website*`,
      ``,
      `👤 *Name:* ${form.name}`,
      `📞 *Phone:* ${form.phone}`,
      `🏗️ *Project Scope:* ${form.category}`,
      form.location ? `📍 *Location:* ${form.location}` : '',
      form.materials ? `🧱 *Requested Services/Materials:* ${form.materials}` : '',
      form.budget ? `💰 *Estimated Budget:* ${form.budget}` : '',
      ``,
      `💬 *Project Details:*`,
      `${form.message}`,
    ].filter(Boolean).join('\n');

    const url = getWhatsAppURL(msg);
    window.open(url, '_blank', 'noopener,noreferrer');

    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section contact" ref={ref} aria-label="Contact and Consultation Request">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-eyebrow">Direct Engineering Channel</span>
          <h2 className="heading-xl" style={{ color: '#fff', marginBottom: '0.5rem' }}>
            Request an Official Project Consultation
          </h2>
          <span className="section-divider" style={{ marginBottom: '2.5rem' }} />
        </motion.div>

        <div className="contact__grid">
          {/* Contact Details & Corporate Credentials */}
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="contact__item">
              <div className="contact__item-icon"><Phone size={18} /></div>
              <div>
                <div className="contact__item-label">Direct Telephony Lines</div>
                <div className="contact__item-value">
                  {COMPANY.phones.map((phone, i) => (
                    <div key={i}>
                      <a href={`tel:${phone.replace(/[^\d+]/g, '')}`}>{phone}</a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="contact__item">
              <div className="contact__item-icon"><Mail size={18} /></div>
              <div>
                <div className="contact__item-label">Corporate Email</div>
                <div className="contact__item-value">
                  <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
                </div>
              </div>
            </div>

            <div className="contact__item">
              <div className="contact__item-icon"><MapPin size={18} /></div>
              <div>
                <div className="contact__item-label">Head Office Address</div>
                <div className="contact__item-value">{COMPANY.address.full}</div>
              </div>
            </div>

            {/* Instant WhatsApp Action */}
            <a
              href={getWhatsAppURL('Hello Srinivas Nayak & Construction, I would like to schedule a project consultation.')}
              target="_blank"
              rel="noopener noreferrer"
              className="contact__wa-cta"
            >
              <MessageCircle size={22} />
              Chat on WhatsApp Directly
            </a>

            {/* Client-Supplied Registration Credentials */}
            <div
              style={{
                marginTop: '1.25rem',
                padding: '1.25rem',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-gold)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                <FileText size={15} />
                Client-Supplied Statutory Details
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.75)' }}>
                <div><strong>CIN:</strong> {COMPANY.cin}</div>
                <div><strong>MSME 1:</strong> {COMPANY.msmeRegistrations[0]}</div>
                <div><strong>MSME 2:</strong> {COMPANY.msmeRegistrations[1]}</div>
                <div><strong>GSTIN:</strong> {COMPANY.gstin}</div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="contact__form-wrap"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            {submitted ? (
              <div className="form__success">
                <div className="form__success-icon"><CheckCircle size={28} /></div>
                <div className="form__success-title">Consultation Prepared!</div>
                <div className="form__success-text">
                  Your project requirements have been structured and forwarded to our official WhatsApp channel.
                  Director Er. Srinivas Nayak and our coordination team respond promptly.
                </div>
                <button
                  className="btn btn-outline-gold"
                  onClick={() => { setSubmitted(false); setForm(EMPTY); }}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <>
                <h3 className="contact__form-title">Consultation &amp; Quotation Form</h3>
                <p className="contact__form-sub">
                  Fill in your project details to initiate an engineering consultation.
                </p>

                <form className="contact__form" onSubmit={handleSubmit} noValidate>
                  <div className="form-row">
                    <FormField
                      label="Full Name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      error={errors.name}
                      required
                    />
                    <FormField
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 70080 87497"
                      error={errors.phone}
                      required
                    />
                  </div>

                  <div className="form-row">
                    <FormSelect
                      label="Project Category"
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      options={CATEGORIES}
                      error={errors.category}
                      required
                    />
                    <FormField
                      label="Project Location"
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      placeholder="City, District (e.g. Rourkela)"
                    />
                  </div>

                  <FormField
                    label="Required Services / Scope"
                    name="materials"
                    value={form.materials}
                    onChange={handleChange}
                    placeholder="e.g. Turnkey Civil Construction, Structural Steel, Roofing..."
                  />

                  <FormField
                    label="Estimated Budget (Optional)"
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    placeholder="e.g. ₹25 Lakhs – ₹1 Crore"
                  />

                  <div className="form-group">
                    <label htmlFor="message">
                      Project Description <span className="required">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your land area, timeline, architectural preferences, or specific fabrication needs..."
                      className={errors.message ? 'error' : ''}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-err' : undefined}
                    />
                    {errors.message && <span className="error-msg" id="message-err">{errors.message}</span>}
                  </div>

                  <button type="submit" className="form__submit" disabled={submitting}>
                    {submitting ? 'Preparing WhatsApp Dispatch…' : (<><Send size={16} /> Submit &amp; Open in WhatsApp</>)}
                  </button>

                  <p className="form__notice">
                    Direct communication with official management via WhatsApp. No third-party data tracking.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FormField({ label, name, type = 'text', value, onChange, placeholder, error, required }) {
  const id = `field-${name}`;
  return (
    <div className="form-group">
      <label htmlFor={id}>
        {label}{required && <span className="required">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={error ? 'error' : ''}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        required={required}
      />
      {error && <span className="error-msg" id={`${id}-err`}>{error}</span>}
    </div>
  );
}

function FormSelect({ label, name, value, onChange, options, error, required }) {
  const id = `field-${name}`;
  return (
    <div className="form-group">
      <label htmlFor={id}>
        {label}{required && <span className="required">*</span>}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={error ? 'error' : ''}
        aria-invalid={!!error}
        required={required}
      >
        <option value="">Select scope of work…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {error && <span className="error-msg" id={`${id}-err`}>{error}</span>}
    </div>
  );
}
