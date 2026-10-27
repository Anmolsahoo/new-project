import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';
import '../styles/contact-footer.css';

const STORAGE_KEY = 'snc-cookie-consent';

function getStoredConsent() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); }
  catch { return null; }
}

function storeConsent(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, timestamp: Date.now() })); }
  catch {}
}

const DEFAULT_PREFS = {
  essential: true,   // always true, read-only
  analytics: false,
  marketing: false,
};

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [prefs, setPrefs] = useState(DEFAULT_PREFS);

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) {
      // Show after short delay
      const t = setTimeout(() => setVisible(true), 1800);
      return () => clearTimeout(t);
    }
  }, []);

  const acceptAll = () => {
    const data = { essential: true, analytics: true, marketing: true, choice: 'all' };
    storeConsent(data);
    setVisible(false);
    setShowModal(false);
  };

  const rejectOptional = () => {
    const data = { essential: true, analytics: false, marketing: false, choice: 'essential' };
    storeConsent(data);
    setVisible(false);
    setShowModal(false);
  };

  const savePreferences = () => {
    storeConsent({ ...prefs, choice: 'custom' });
    setVisible(false);
    setShowModal(false);
  };

  const togglePref = (key) => {
    setPrefs(p => ({ ...p, [key]: !p[key] }));
  };

  return (
    <>
      {/* Banner */}
      <AnimatePresence>
        {visible && (
          <motion.div
            className="cookie-banner cookie-banner--visible"
            role="region"
            aria-label="Cookie consent"
            aria-live="polite"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
          >
            <div className="cookie-banner__inner">
              <div className="cookie-banner__text">
                <div className="cookie-banner__title">
                  <Cookie size={14} style={{ display: 'inline', marginRight: 6 }} />
                  We use cookies
                </div>
                <div className="cookie-banner__desc">
                  We use essential cookies to make our site work. We&apos;d also like to set optional analytics cookies to understand how you use it.
                  See our <a href="#privacy">Privacy Policy</a>.
                </div>
              </div>
              <div className="cookie-banner__actions">
                <button className="cookie-banner__btn cookie-banner__btn--accept" onClick={acceptAll}>
                  Accept All
                </button>
                <button className="cookie-banner__btn cookie-banner__btn--reject" onClick={rejectOptional}>
                  Reject Optional
                </button>
                <button className="cookie-banner__btn cookie-banner__btn--manage" onClick={() => setShowModal(true)}>
                  Manage Preferences
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="cookie-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Cookie preferences"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="cookie-modal__box"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            >
              <h2 className="cookie-modal__title">Cookie Preferences</h2>
              <p className="cookie-modal__subtitle">
                Manage your cookie preferences below. Essential cookies are always active as they are required for the website to function.
              </p>

              {/* Essential */}
              <div className="cookie-modal__item">
                <div className="cookie-modal__item-info">
                  <div className="cookie-modal__item-name">Essential Cookies</div>
                  <div className="cookie-modal__item-desc">Required for the website to function. Cannot be disabled.</div>
                </div>
                <label className="toggle">
                  <input type="checkbox" checked={true} disabled readOnly />
                  <span className="toggle__track" />
                </label>
              </div>

              {/* Analytics */}
              <div className="cookie-modal__item">
                <div className="cookie-modal__item-info">
                  <div className="cookie-modal__item-name">Analytics Cookies</div>
                  <div className="cookie-modal__item-desc">Help us understand how visitors interact with our website to improve user experience.</div>
                </div>
                <label className="toggle">
                  <input type="checkbox" checked={prefs.analytics} onChange={() => togglePref('analytics')} />
                  <span className="toggle__track" />
                </label>
              </div>

              {/* Marketing */}
              <div className="cookie-modal__item">
                <div className="cookie-modal__item-info">
                  <div className="cookie-modal__item-name">Marketing Cookies</div>
                  <div className="cookie-modal__item-desc">Used to personalise advertisements and measure their effectiveness.</div>
                </div>
                <label className="toggle">
                  <input type="checkbox" checked={prefs.marketing} onChange={() => togglePref('marketing')} />
                  <span className="toggle__track" />
                </label>
              </div>

              <div className="cookie-modal__actions">
                <button className="cookie-banner__btn cookie-banner__btn--reject" onClick={rejectOptional}>
                  Reject Optional
                </button>
                <button className="cookie-banner__btn cookie-banner__btn--accept" onClick={savePreferences}>
                  Save Preferences
                </button>
                <button className="cookie-banner__btn cookie-banner__btn--accept" onClick={acceptAll}>
                  Accept All
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
