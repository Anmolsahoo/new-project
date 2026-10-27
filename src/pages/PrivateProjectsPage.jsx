import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Phone,
  Calculator,
  RotateCcw,
  ShieldCheck,
  Send,
  Building,
} from 'lucide-react';
import { RAW_MATERIALS } from '../data/rawMaterials';
import { COMPANY, getWhatsAppURL } from '../config/company';
import '../styles/projects.css';

const INR = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export default function PrivateProjectsPage() {
  // State for quantities of each raw material
  const [quantities, setQuantities] = useState(() =>
    RAW_MATERIALS.reduce((acc, item) => {
      acc[item.id] = item.defaultQty;
      return acc;
    }, {})
  );

  const [deliveryLocation, setDeliveryLocation] = useState('Rourkela / Sundargarh');
  const [clientNote, setClientNote] = useState('');

  const handleQtyChange = (id, val) => {
    const num = Math.max(0, parseInt(val) || 0);
    setQuantities((prev) => ({ ...prev, [id]: num }));
  };

  const handleReset = () => {
    setQuantities(
      RAW_MATERIALS.reduce((acc, item) => {
        acc[item.id] = item.defaultQty;
        return acc;
      }, {})
    );
  };

  // Calculation of line amounts and total
  const calculatedItems = useMemo(() => {
    return RAW_MATERIALS.map((item) => {
      const qty = quantities[item.id] || 0;
      const amount = qty * item.unitPrice;
      return {
        ...item,
        qty,
        amount,
      };
    });
  }, [quantities]);

  const totalAmount = useMemo(() => {
    return calculatedItems.reduce((sum, item) => sum + item.amount, 0);
  }, [calculatedItems]);

  const activeItems = calculatedItems.filter((item) => item.qty > 0);

  // Generate the formatted WhatsApp message for direct ordering
  const generateWhatsAppMessage = () => {
    let msg = `🏛️ *PRIVATE MATERIAL ORDER / QUOTE REQUEST*\n`;
    msg += `*To:* Srinivas Nayak & Construction Pvt. Ltd.\n`;
    msg += `*Location:* ${deliveryLocation}\n`;
    msg += `--------------------------------------\n`;
    msg += `*SELECTED RAW MATERIALS & QUANTITIES:*\n`;

    activeItems.forEach((item, index) => {
      msg += `${index + 1}. *${item.name}*\n`;
      msg += `   • Qty: ${item.qty} ${item.unit}\n`;
      msg += `   • Rate: ₹${item.unitPrice} per ${item.unit}\n`;
      msg += `   • Amount: ₹${item.amount.toLocaleString('en-IN')}\n`;
    });

    msg += `--------------------------------------\n`;
    msg += `*TOTAL ESTIMATE:* ₹${totalAmount.toLocaleString('en-IN')}\n`;
    if (clientNote.trim()) {
      msg += `*Client Note:* ${clientNote.trim()}\n`;
    }
    msg += `--------------------------------------\n`;
    msg += `Please confirm current stock availability, transportation charges, and final delivery schedule. Thank you!`;

    return msg;
  };

  const handleSendWhatsApp = () => {
    const message = generateWhatsAppMessage();
    const url = getWhatsAppURL(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="private-materials-page" style={{ paddingTop: 'var(--header-h)' }}>
      {/* Page Header */}
      <section
        style={{
          background: 'var(--navy-darkest)',
          padding: 'clamp(3.5rem, 6vw, 5rem) 0',
          borderBottom: '1px solid var(--border-gold)',
          position: 'relative',
        }}
      >
        <div className="container">
          <span className="section-eyebrow">Private Projects &bull; Raw Material Supply</span>
          <h1 className="heading-hero" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', marginBottom: '1.25rem' }}>
            Building Raw Materials, <span style={{ color: 'var(--gold)' }}>Pricing &amp; Direct WhatsApp Ordering</span>
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.75)', maxWidth: '760px', fontSize: '1.02rem', lineHeight: 1.7 }}>
            For private homeowners, residential builders, and commercial developers in Rourkela and across Odisha.
            Inspect our available construction raw materials, adjust quantities to estimate total expenditure, and directly message your bill of materials to our team via WhatsApp on <strong>+91 7008087497</strong>.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="section section--warm">
        <div className="container">
          <div className="private-materials-grid">
            {/* Left: Materials Table & Inventory */}
            <div>
              {/* How it Works / Instructions Box */}
              <div
                style={{
                  background: '#fff',
                  border: '1px solid var(--border-light)',
                  borderLeft: '4px solid var(--gold)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1.5rem',
                  marginBottom: '2rem',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
                  <Calculator size={20} style={{ color: 'var(--gold-dark)' }} />
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--navy)' }}>
                    How to Direct Order via WhatsApp
                  </h3>
                </div>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-dark)', lineHeight: 1.6 }}>
                  1. Check the available raw materials below and enter your desired quantity.<br />
                  2. Review the calculated line amount and the live total estimate.<br />
                  3. Click the green <strong>&ldquo;Send Order on WhatsApp&rdquo;</strong> button to directly dispatch your structured requirement to <strong>Er. Srinivas Nayak &amp; Team</strong>.
                </p>
              </div>

              {/* Table of Available Raw Materials */}
              <div
                style={{
                  background: '#fff',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-light)',
                  boxShadow: 'var(--shadow-sm)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    padding: '1.25rem 1.75rem',
                    background: 'var(--navy)',
                    color: '#fff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <Package size={18} style={{ color: 'var(--gold)' }} />
                    <span style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '0.04em' }}>
                      Available Construction Raw Materials Catalog
                    </span>
                  </div>
                  <button
                    onClick={handleReset}
                    className="btn btn-outline-white btn-sm"
                    style={{ fontSize: '0.72rem', padding: '0.4rem 0.8rem' }}
                  >
                    <RotateCcw size={12} /> Reset Defaults
                  </button>
                </div>

                {/* Responsive Materials Table */}
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                    <thead>
                      <tr style={{ background: 'rgba(16, 42, 67, 0.04)', borderBottom: '1px solid var(--border-light)' }}>
                        <th style={{ padding: '0.9rem 1.25rem', fontWeight: 800, color: 'var(--navy)' }}>Material &amp; Specification</th>
                        <th style={{ padding: '0.9rem 1rem', fontWeight: 800, color: 'var(--navy)' }}>Unit</th>
                        <th style={{ padding: '0.9rem 1rem', fontWeight: 800, color: 'var(--navy)' }}>Unit Price (₹)</th>
                        <th style={{ padding: '0.9rem 1rem', fontWeight: 800, color: 'var(--navy)', width: '130px' }}>Quantity</th>
                        <th style={{ padding: '0.9rem 1.25rem', fontWeight: 800, color: 'var(--navy)', textAlign: 'right' }}>Amount (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {calculatedItems.map((item) => (
                        <tr
                          key={item.id}
                          style={{
                            borderBottom: '1px solid rgba(0,0,0,0.05)',
                            transition: 'background 0.2s',
                          }}
                        >
                          {/* Material Name & Grade */}
                          <td style={{ padding: '1rem 1.25rem' }}>
                            <div style={{ fontWeight: 700, color: 'var(--navy)' }}>{item.name}</div>
                            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                              {item.brand} &bull; <span style={{ color: item.inStock ? '#25D366' : '#E53E3E', fontWeight: 600 }}>{item.inStock ? 'In Stock' : 'Out of Stock'}</span>
                            </div>
                          </td>

                          {/* Unit */}
                          <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{item.unit}</td>

                          {/* Unit Price */}
                          <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--navy)' }}>
                            ₹{item.unitPrice}
                          </td>

                          {/* Editable Quantity */}
                          <td style={{ padding: '1rem' }}>
                            <input
                              type="number"
                              min="0"
                              step="10"
                              value={item.qty}
                              onChange={(e) => handleQtyChange(item.id, e.target.value)}
                              style={{
                                width: '100%',
                                padding: '0.45rem 0.65rem',
                                border: '1.5px solid var(--border-light)',
                                borderRadius: 'var(--radius-sm)',
                                fontWeight: 700,
                                textAlign: 'right',
                                color: 'var(--navy)',
                                fontSize: '0.88rem',
                              }}
                              aria-label={`Quantity for ${item.name}`}
                            />
                          </td>

                          {/* Calculated Line Amount */}
                          <td style={{ padding: '1rem 1.25rem', textAlign: 'right', fontWeight: 800, color: 'var(--navy)' }}>
                            {INR.format(item.amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Footer Disclaimer */}
                <div style={{ padding: '1rem 1.25rem', background: 'rgba(16, 42, 67, 0.02)', borderTop: '1px solid var(--border-light)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  * Unit rates are based on current regional construction supply benchmarks in Odisha. Final rates subject to total quantity, loading, unloading, and site delivery transportation distance.
                </div>
              </div>
            </div>

            {/* Right: Live Summary & Direct WhatsApp Order Sidebar */}
            <div
              style={{
                background: '#fff',
                border: '1.5px solid var(--gold)',
                borderRadius: 'var(--radius-sm)',
                boxShadow: 'var(--shadow-md)',
                overflow: 'hidden',
                position: 'sticky',
                top: 'calc(var(--header-h) + 1.5rem)',
              }}
            >
              <div
                style={{
                  background: 'var(--navy)',
                  padding: '1.25rem 1.5rem',
                  color: '#fff',
                  borderBottom: '1px solid var(--border-gold)',
                }}
              >
                <div style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-light)', fontWeight: 800 }}>
                  Order Estimation Summary
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, marginTop: '2px' }}>
                  Material Bill Summary
                </h3>
              </div>

              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Active Items Count */}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <span>Selected Line Items:</span>
                  <strong style={{ color: 'var(--navy)' }}>{activeItems.length} Materials</strong>
                </div>

                {/* Delivery Location Input */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.35rem' }}>
                    Delivery Site Location:
                  </label>
                  <input
                    type="text"
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    placeholder="e.g. Jalda, Civil Township, Rourkela"
                    style={{
                      width: '100%',
                      padding: '0.5rem 0.75rem',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.85rem',
                      color: 'var(--navy)',
                    }}
                  />
                </div>

                {/* Optional Note */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.35rem' }}>
                    Special Requirements (Optional):
                  </label>
                  <textarea
                    rows={2}
                    value={clientNote}
                    onChange={(e) => setClientNote(e.target.value)}
                    placeholder="e.g. Unloading labor required, specific delivery date..."
                    style={{
                      width: '100%',
                      padding: '0.5rem 0.75rem',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.82rem',
                      resize: 'none',
                    }}
                  />
                </div>

                {/* Total Calculated Estimate Box */}
                <div
                  style={{
                    background: 'var(--warm-white)',
                    border: '1.5px solid var(--border-gold)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '1.15rem',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Estimated Material Total
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.9rem',
                      fontWeight: 900,
                      color: 'var(--navy)',
                    }}
                  >
                    {INR.format(totalAmount)}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--gold-dark)', fontWeight: 600, marginTop: '2px' }}>
                    Exclusive of transportation &amp; GST
                  </div>
                </div>

                {/* Direct WhatsApp Ordering Button */}
                <button
                  onClick={handleSendWhatsApp}
                  disabled={activeItems.length === 0}
                  className="btn btn-whatsapp"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    cursor: activeItems.length === 0 ? 'not-allowed' : 'pointer',
                    opacity: activeItems.length === 0 ? 0.6 : 1,
                  }}
                >
                  <MessageCircle size={18} />
                  Send Order via WhatsApp
                </button>

                {/* Direct Phone Lines */}
                <div style={{ textAlign: 'center', paddingTop: '0.5rem', borderTop: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                    Or call our dispatch office directly:
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '0.85rem' }}>
                    <a
                      href={`tel:${COMPANY.phones[0].replace(/[^\d+]/g, '')}`}
                      style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--navy)' }}
                    >
                      <Phone size={13} style={{ display: 'inline', marginRight: 3 }} />
                      7008087497
                    </a>
                    <span style={{ color: 'var(--border-light)' }}>|</span>
                    <a
                      href={`tel:${COMPANY.phones[1].replace(/[^\d+]/g, '')}`}
                      style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--navy)' }}
                    >
                      7077213963
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
