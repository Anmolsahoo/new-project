import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Image as ImageIcon,
  Video as VideoIcon,
  FileText,
  Search,
  Download,
  ExternalLink,
  Play,
  ZoomIn,
  X,
  MessageCircle,
  Calendar,
  User,
  ShieldCheck,
  PlusCircle,
  Lock,
  Layers,
  Sparkles,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { getGalleryItems, GALLERY_UPDATE_EVENT } from '../data/galleryService';
import { COMPANY, getWhatsAppURL } from '../config/company';
import '../styles/gallery.css';

export default function GalleryPage() {
  const [items, setItems] = useState(() => getGalleryItems());
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'image' | 'video' | 'document'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [activeImage, setActiveImage] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  // Subscribe to real-time updates from Admin Panel
  useEffect(() => {
    const handleUpdate = (e) => {
      if (e.detail) {
        setItems(e.detail);
      } else {
        setItems(getGalleryItems());
      }
    };
    window.addEventListener(GALLERY_UPDATE_EVENT, handleUpdate);
    return () => window.removeEventListener(GALLERY_UPDATE_EVENT, handleUpdate);
  }, []);

  // Handle escape key to close modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveImage(null);
        setActiveVideo(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Compute counts
  const counts = useMemo(() => {
    return {
      all: items.length,
      image: items.filter((i) => i.type === 'image').length,
      video: items.filter((i) => i.type === 'video').length,
      document: items.filter((i) => i.type === 'document').length,
    };
  }, [items]);

  // Compute categories available
  const availableCategories = useMemo(() => {
    const cats = new Set();
    items.forEach((i) => {
      if (i.category) cats.add(i.category);
    });
    return ['all', ...Array.from(cats)];
  }, [items]);

  // Filtered items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Tab filter
      if (activeTab !== 'all' && item.type !== activeTab) return false;
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = (item.title || '').toLowerCase().includes(q);
        const inCaption = (item.caption || '').toLowerCase().includes(q);
        const inCategory = (item.category || '').toLowerCase().includes(q);
        const inAuthor = (item.author || '').toLowerCase().includes(q);
        if (!inTitle && !inCaption && !inCategory && !inAuthor) return false;
      }
      return true;
    });
  }, [items, activeTab, selectedCategory, searchQuery]);

  // Simulated Document Download handler
  const handleDownloadDoc = (doc) => {
    // If it is an uploaded file (Data URL), download the real file directly
    if (doc.url && doc.url.startsWith('data:')) {
      const link = document.createElement('a');
      link.href = doc.url;
      const ext = (doc.fileType || 'pdf').toLowerCase().replace(/[^a-z0-9]/g, '');
      link.download = `${(doc.title || 'document').replace(/[^a-zA-Z0-9]/g, '_')}_SNC.${ext}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // If it is a real HTTP/HTTPS link, open in new tab
    if (doc.url && doc.url.startsWith('http')) {
      window.open(doc.url, '_blank');
      return;
    }

    // Fallback: Generate formatted official document manifest
    const content = `SRINIVAS NAYAK & CONSTRUCTION PVT. LTD.\nOfficial Document Vault\n=========================================\nTitle: ${doc.title}\nCategory: ${doc.category}\nFormat: ${doc.fileType || 'PDF'}\nSize: ${doc.fileSize || 'N/A'}\nDate: ${doc.date}\nAuthor: ${doc.author}\n\nTechnical Caption:\n${doc.caption}\n\n=========================================\nCompany CIN: ${COMPANY.cin}\nGSTIN: ${COMPANY.gstin}\nDirector: Er. Srinivas Nayak\nHeadquarters: Rourkela, Sundargarh, Odisha\nFor verified master blueprint / CAD drawings, please contact the engineering office directly.`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${doc.title.replace(/[^a-zA-Z0-9]/g, '_')}_SNC.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="gallery-page">
      {/* ============================================================
          SECTION 1: ARCHITECTURAL VAULT HERO
          ============================================================ */}
      <section className="gallery-hero" aria-label="Project Media Gallery">
        <div className="gallery-hero__bg" />
        <div className="container">
          <div className="gallery-hero__content">
            <span className="gallery-badge">
              <Layers size={13} />
              SNC Media Vault &bull; Live Visual &amp; Technical Archive
            </span>

            <h1 className="gallery-hero__title">
              Project <span>Gallery</span> &amp; Technical Vault
            </h1>

            <p className="gallery-hero__desc">
              Explore high-resolution structural steel fabrication photography, 3D architectural palace walkthroughs,
              on-site PEB erection videos, and official CPWD compliance engineering documentations.
            </p>

            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
              <Link to="/admin" className="btn btn-outline-white btn-sm" style={{ borderColor: 'var(--gold)', color: 'var(--gold-light)' }}>
                <Lock size={14} />
                Admin Portal Upload
              </Link>

              <a
                href={getWhatsAppURL('Hello Er. Srinivas Nayak, I am reviewing your project media gallery and would like to request technical specifications.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-sm"
              >
                <MessageCircle size={15} />
                Direct WhatsApp Inquiry
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2: STICKY CONTROLS (TABS & SEARCH)
          ============================================================ */}
      <div className="gallery-controls-bar">
        <div className="container">
          <div className="gallery-controls-inner">
            {/* Media Type Tabs */}
            <div className="gallery-tabs" role="tablist">
              <button
                className={`gallery-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                <Layers size={15} />
                <span>All Media</span>
                <span className="gallery-tab-count">{counts.all}</span>
              </button>

              <button
                className={`gallery-tab-btn ${activeTab === 'image' ? 'active' : ''}`}
                onClick={() => setActiveTab('image')}
              >
                <ImageIcon size={15} />
                <span>Photos</span>
                <span className="gallery-tab-count">{counts.image}</span>
              </button>

              <button
                className={`gallery-tab-btn ${activeTab === 'video' ? 'active' : ''}`}
                onClick={() => setActiveTab('video')}
              >
                <VideoIcon size={15} />
                <span>Videos</span>
                <span className="gallery-tab-count">{counts.video}</span>
              </button>

              <button
                className={`gallery-tab-btn ${activeTab === 'document' ? 'active' : ''}`}
                onClick={() => setActiveTab('document')}
              >
                <FileText size={15} />
                <span>Documents</span>
                <span className="gallery-tab-count">{counts.document}</span>
              </button>
            </div>

            {/* Live Keyword Search */}
            <div className="gallery-search-box">
              <Search size={16} style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search photos, videos, specifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="gallery-search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          SECTION 3: MAIN GALLERY SHOWCASE
          ============================================================ */}
      <div className="container">
        {/* Category Pills Filter */}
        <div className="gallery-pills-wrap">
          <span style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.08em', marginRight: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Filter size={13} /> Filter:
          </span>
          {availableCategories.map((cat) => (
            <button
              key={cat}
              className={`gallery-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === 'all' ? 'All Categories' : cat}
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 ? (
          <div className="gallery-empty">
            <div className="gallery-empty-icon">
              <Search size={28} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.5rem' }}>
              No Media Found
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '480px', margin: '0 auto 1.5rem auto' }}>
              We could not find any media matching &ldquo;{searchQuery}&rdquo;. Try clearing filters or use the Admin Portal to upload new media.
            </p>
            <button
              onClick={() => {
                setActiveTab('all');
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="btn btn-outline-gold btn-sm"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          /* Media Cards Grid */
          <div className="gallery-grid">
            {filteredItems.map((item) => {
              // ── 1. RENDER IMAGE CARD ──
              if (item.type === 'image') {
                return (
                  <motion.div
                    key={item.id}
                    className="gallery-item-image"
                    onClick={() => setActiveImage(item)}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="gallery-image-media">
                      <img
                        src={item.url}
                        alt={item.title}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      <span className="gallery-item-badge">{item.category}</span>
                      <div className="gallery-image-overlay-btn">
                        <span className="gallery-zoom-pill">
                          <ZoomIn size={14} /> Click to Inspect
                        </span>
                      </div>
                    </div>

                    <div className="gallery-item-body">
                      <h3 className="gallery-item-title">{item.title}</h3>
                      <p className="gallery-item-caption">{item.caption}</p>

                      <div className="gallery-item-meta">
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <Calendar size={13} /> {item.date}
                        </span>
                        <span style={{ color: 'var(--gold-dark)', fontWeight: 700 }}>Photo</span>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              // ── 2. RENDER VIDEO CARD ──
              if (item.type === 'video') {
                const isDirect = isDirectVideoFile(item.url);
                const ytId = getYouTubeId(item.url);
                const ytThumb = ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null;
                const thumbSrc = item.thumbnail || ytThumb;

                return (
                  <motion.div
                    key={item.id}
                    className="gallery-item-video"
                    onClick={() => setActiveVideo(item)}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="gallery-video-media">
                      {thumbSrc ? (
                        <img
                          src={thumbSrc}
                          alt={item.caption || item.title}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : isDirect ? (
                        <video
                          src={item.url}
                          preload="metadata"
                          muted
                          playsInline
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #061324 0%, #102A43 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <VideoIcon size={36} style={{ color: 'var(--gold)' }} />
                        </div>
                      )}

                      <div className="gallery-play-btn">
                        <div className="gallery-play-icon">
                          <Play size={24} style={{ marginLeft: 3 }} />
                        </div>
                      </div>

                      {item.duration && (
                        <div className="gallery-video-duration">
                          {item.duration}
                        </div>
                      )}
                    </div>

                    <div className="gallery-item-body">
                      <p className="gallery-item-caption" style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '0.92rem', marginBottom: '0.75rem', lineHeight: 1.5 }}>
                        {item.caption || item.title}
                      </p>

                      <div className="gallery-item-meta">
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <Calendar size={13} /> {item.date}
                        </span>
                        <span style={{ color: 'var(--gold-dark)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Play size={12} /> Watch Video
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              // ── 3. RENDER DOCUMENT CARD ──
              if (item.type === 'document') {
                return (
                  <motion.div
                    key={item.id}
                    className="gallery-item-doc"
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="gallery-doc-top">
                      <span className="gallery-doc-badge">
                        <FileText size={14} />
                        {item.fileType || 'PDF'}
                      </span>
                      <span className="gallery-doc-size">{item.fileSize || 'Standard PDF'}</span>
                    </div>

                    <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-dark)', fontWeight: 800, marginBottom: '0.35rem' }}>
                      {item.category}
                    </div>

                    <h3 className="gallery-item-title" style={{ fontSize: '1.15rem' }}>
                      {item.title}
                    </h3>

                    <p className="gallery-item-caption">{item.caption}</p>

                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Calendar size={13} /> Published: {item.date} &bull; <User size={13} /> {item.author || 'Er. Srinivas Nayak'}
                    </div>

                    <div className="gallery-doc-actions">
                      <button
                        onClick={() => handleDownloadDoc(item)}
                        className="btn btn-navy btn-sm"
                        style={{ flex: 1, padding: '0.6rem 0.9rem' }}
                      >
                        <Download size={14} />
                        Download {item.fileType || 'PDF'}
                      </button>

                      <a
                        href={getWhatsAppURL(`Hello Er. Srinivas Nayak, I would like to inquire about the technical document: "${item.title}".`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-whatsapp btn-sm"
                        title="Inquire on WhatsApp"
                        style={{ padding: '0.6rem 0.85rem' }}
                      >
                        <MessageCircle size={15} />
                      </a>
                    </div>
                  </motion.div>
                );
              }

              return null;
            })}
          </div>
        )}
      </div>

      {/* ============================================================
          SECTION 4: IMAGE LIGHTBOX MODAL
          ============================================================ */}
      <AnimatePresence>
        {activeImage && (
          <div className="gallery-lightbox-overlay" onClick={() => setActiveImage(null)}>
            <motion.div
              className="gallery-lightbox-card"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25 }}
            >
              <button
                className="gallery-lightbox-close"
                onClick={() => setActiveImage(null)}
                aria-label="Close image lightbox"
              >
                <X size={20} />
              </button>

              <div className="gallery-lightbox-img-wrap">
                <img
                  src={activeImage.url}
                  alt={activeImage.title}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
              </div>

              <div className="gallery-lightbox-footer">
                <div style={{ maxWidth: '680px' }}>
                  <span className="demo-badge" style={{ marginBottom: '0.5rem', background: 'var(--navy-mid)' }}>
                    {activeImage.category}
                  </span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '0.35rem' }}>
                    {activeImage.title}
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.5 }}>
                    {activeImage.caption}
                  </p>
                  <div style={{ fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.5)', marginTop: '0.5rem' }}>
                    Logged on {activeImage.date} &bull; Documented by {activeImage.author || 'Er. Srinivas Nayak'}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <a
                    href={activeImage.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-white btn-sm"
                  >
                    <ExternalLink size={14} /> Full Resolution
                  </a>
                  <a
                    href={getWhatsAppURL(`Hello Er. Srinivas Nayak, I saw this project photo in your gallery: "${activeImage.title}". Can you share more details?`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-sm"
                  >
                    <MessageCircle size={15} /> Inquire
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================
          SECTION 5: VIDEO PLAYER MODAL
          ============================================================ */}
      <AnimatePresence>
        {activeVideo && (
          <div className="gallery-lightbox-overlay" onClick={() => setActiveVideo(null)}>
            <motion.div
              className="gallery-video-modal-card"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25 }}
            >
              <button
                className="gallery-lightbox-close"
                onClick={() => setActiveVideo(null)}
                aria-label="Close video player"
              >
                <X size={20} />
              </button>

              <div className="gallery-video-iframe-wrap">
                {isDirectVideoFile(activeVideo.url) ? (
                  <video
                    key={activeVideo.id || activeVideo.url}
                    src={activeVideo.url}
                    controls
                    autoPlay
                    playsInline
                    preload="auto"
                    style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000' }}
                  />
                ) : (
                  <iframe
                    key={activeVideo.id || activeVideo.url}
                    src={formatVideoEmbed(activeVideo.url)}
                    title={activeVideo.caption || activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>

              <div className="gallery-lightbox-footer">
                <div style={{ maxWidth: '680px' }}>
                  <span className="demo-badge" style={{ marginBottom: '0.5rem', background: 'var(--navy-mid)' }}>
                    {activeVideo.category}
                  </span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '0.35rem' }}>
                    {activeVideo.title}
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.5 }}>
                    {activeVideo.caption}
                  </p>
                </div>

                <a
                  href={getWhatsAppURL(`Hello Er. Srinivas Nayak, I watched your project video: "${activeVideo.title}". I would like to consult with your engineering team.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-sm"
                >
                  <MessageCircle size={15} /> Discuss Project
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================
          SECTION 6: DIRECT ACTION CTA
          ============================================================ */}
      <section style={{ background: 'var(--navy-darkest)', padding: '3.5rem 0', borderTop: '2px solid var(--gold)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
            <div>
              <div className="gallery-badge" style={{ marginBottom: '0.5rem' }}>
                Corporate Repository
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 800, color: '#fff', marginBottom: '0.4rem' }}>
                Need Customized Architectural Blueprints or Structural Drawings?
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.92rem', maxWidth: '680px' }}>
                Our in-house design office prepares structural layouts, CAD blueprints, and CPWD-compliant BOQ schedules for commercial, residential, and industrial clients across Odisha.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-primary">
                Request Drawings <ArrowRight size={15} />
              </Link>
              <Link to="/admin" className="btn btn-outline-white">
                <Lock size={14} /> Staff Admin Portal
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
