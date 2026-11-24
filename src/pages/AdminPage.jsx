import { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  Unlock,
  Key,
  ShieldCheck,
  Image as ImageIcon,
  Video as VideoIcon,
  FileText,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Download,
  Upload,
  Eye,
  LogOut,
  Layers,
  Sparkles,
  Calendar,
  X,
} from 'lucide-react';
import {
  getGalleryItems,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  resetGalleryDefaults,
  readFileAsDataURL,
  GALLERY_UPDATE_EVENT,
} from '../data/galleryService';
import {
  isAuthenticated,
  adminLogin,
  adminLogout,
} from '../config/adminAuth';
import { COMPANY } from '../config/company';
import '../styles/admin.css';

// Predefined Categories
const IMAGE_CATEGORIES = [
  'Structural Steel',
  'Palaces & Luxury',
  'Residential',
  'Industrial PEB',
  'Commercial',
  'Civil & Earthwork',
  'Roofing & Trusses',
];

const VIDEO_CATEGORIES = [
  'Fabrication Yard',
  'Palaces & Luxury',
  'Industrial PEB',
  'Residential',
  'Commercial',
  'Civil & Earthwork',
  'Drone Walkthrough',
];

const DOCUMENT_CATEGORIES = [
  'Corporate Overview',
  'Quality Standards',
  'Technical Specifications',
  'Approvals & Liaison',
  'BOQ & Cost Sheets',
  'Structural Calculations',
];

export default function AdminPage() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(() => isAuthenticated());
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active section tab: 'images' | 'videos' | 'documents'
  const [activeTab, setActiveTab] = useState('images');

  // Items from gallery service
  const [items, setItems] = useState(() => getGalleryItems());
  const [toastMessage, setToastMessage] = useState('');

  // Form states
  // 1. Image Form
  const [imgTitle, setImgTitle] = useState('');
  const [imgCategory, setImgCategory] = useState(IMAGE_CATEGORIES[0]);
  const [imgUrl, setImgUrl] = useState('');
  const [imgCaption, setImgCaption] = useState('');
  const [imgFeatured, setImgFeatured] = useState(false);
  const [imgDate, setImgDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [imgFileLoading, setImgFileLoading] = useState(false);
  const [editingImgId, setEditingImgId] = useState(null);

  // 2. Video Form
  const [vidTitle, setVidTitle] = useState('');
  const [vidCategory, setVidCategory] = useState(VIDEO_CATEGORIES[0]);
  const [vidUrl, setVidUrl] = useState('');
  const [vidThumbnail, setVidThumbnail] = useState('');
  const [vidDuration, setVidDuration] = useState('03:30');
  const [vidCaption, setVidCaption] = useState('');
  const [vidDate, setVidDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [editingVidId, setEditingVidId] = useState(null);

  // 3. Document Form
  const [docTitle, setDocTitle] = useState('');
  const [docCategory, setDocCategory] = useState(DOCUMENT_CATEGORIES[0]);
  const [docFileType, setDocFileType] = useState('PDF');
  const [docFileSize, setDocFileSize] = useState('3.5 MB');
  const [docUrl, setDocUrl] = useState('');
  const [docCaption, setDocCaption] = useState('');
  const [docDate, setDocDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [editingDocId, setEditingDocId] = useState(null);

  // File input refs
  const imgFileInputRef = useRef(null);
  const vidThumbInputRef = useRef(null);
  const docFileInputRef = useRef(null);

  // Sync with service updates
  useEffect(() => {
    const handleSync = (e) => {
      setItems(e.detail || getGalleryItems());
    };
    window.addEventListener(GALLERY_UPDATE_EVENT, handleSync);
    return () => window.removeEventListener(GALLERY_UPDATE_EVENT, handleSync);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // ── Authentication Handlers ──
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    const res = adminLogin(loginUser, loginPass);
    if (res.success) {
      setAuthed(true);
      showToast('Welcome to SNC Admin Portal');
    } else {
      setLoginError(res.message);
    }
  };

  const handleLogout = () => {
    adminLogout();
    setAuthed(false);
    showToast('Logged out of Admin Portal');
  };

  // Convert standard YouTube watch link to embed format
  const formatVideoEmbed = (url) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      const vidId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${vidId}`;
    }
    if (url.includes('youtu.be/')) {
      const vidId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${vidId}`;
    }
    return url;
  };

  // ── 1. Image Handlers ──
  const handleImgFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setImgFileLoading(true);
      const dataUrl = await readFileAsDataURL(file);
      setImgUrl(dataUrl);
      if (!imgTitle) {
        setImgTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
      }
      showToast('Image file loaded successfully');
    } catch {
      showToast('Error reading image file');
    } finally {
      setImgFileLoading(false);
    }
  };

  const handleSaveImage = (e) => {
    e.preventDefault();
    if (!imgTitle.trim() || !imgUrl.trim()) {
      showToast('Please enter an image title and provide a valid URL or file.');
      return;
    }

    if (editingImgId) {
      updateGalleryItem(editingImgId, {
        title: imgTitle.trim(),
        category: imgCategory,
        url: imgUrl.trim(),
        caption: imgCaption.trim() || imgTitle.trim(),
        featured: imgFeatured,
        date: imgDate,
      });
      showToast(`Image "${imgTitle}" updated successfully.`);
      setEditingImgId(null);
    } else {
      addGalleryItem({
        type: 'image',
        title: imgTitle.trim(),
        category: imgCategory,
        url: imgUrl.trim(),
        caption: imgCaption.trim() || imgTitle.trim(),
        featured: imgFeatured,
        date: imgDate,
        author: 'Admin / Er. Srinivas Nayak',
      });
      showToast(`New image "${imgTitle}" published to frontend gallery.`);
    }

    // Reset form
    setImgTitle('');
    setImgUrl('');
    setImgCaption('');
    setImgFeatured(false);
  };

  const handleEditImage = (img) => {
    setEditingImgId(img.id);
    setImgTitle(img.title);
    setImgCategory(img.category || IMAGE_CATEGORIES[0]);
    setImgUrl(img.url);
    setImgCaption(img.caption || '');
    setImgFeatured(Boolean(img.featured));
    setImgDate(img.date || new Date().toISOString().split('T')[0]);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // ── 2. Video Handlers ──
  const handleSaveVideo = (e) => {
    e.preventDefault();
    if (!vidTitle.trim() || !vidUrl.trim()) {
      showToast('Please enter a video title and provide a valid URL.');
      return;
    }

    const embedUrl = formatVideoEmbed(vidUrl.trim());

    if (editingVidId) {
      updateGalleryItem(editingVidId, {
        title: vidTitle.trim(),
        category: vidCategory,
        url: embedUrl,
        thumbnail: vidThumbnail.trim() || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
        duration: vidDuration.trim(),
        caption: vidCaption.trim() || vidTitle.trim(),
        date: vidDate,
      });
      showToast(`Video "${vidTitle}" updated successfully.`);
      setEditingVidId(null);
    } else {
      addGalleryItem({
        type: 'video',
        title: vidTitle.trim(),
        category: vidCategory,
        url: embedUrl,
        thumbnail: vidThumbnail.trim() || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
        duration: vidDuration.trim(),
        caption: vidCaption.trim() || vidTitle.trim(),
        date: vidDate,
        author: 'Admin / Er. Srinivas Nayak',
      });
      showToast(`New video "${vidTitle}" published to frontend gallery.`);
    }

    setVidTitle('');
    setVidUrl('');
    setVidThumbnail('');
    setVidCaption('');
  };

  const handleEditVideo = (vid) => {
    setEditingVidId(vid.id);
    setVidTitle(vid.title);
    setVidCategory(vid.category || VIDEO_CATEGORIES[0]);
    setVidUrl(vid.url);
    setVidThumbnail(vid.thumbnail || '');
    setVidDuration(vid.duration || '03:30');
    setVidCaption(vid.caption || '');
    setVidDate(vid.date || new Date().toISOString().split('T')[0]);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // ── 3. Document Handlers ──
  const handleDocFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await readFileAsDataURL(file);
      setDocUrl(dataUrl);
      if (!docTitle) {
        setDocTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
      }
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
      setDocFileSize(sizeMB);
      const ext = file.name.split('.').pop()?.toUpperCase() || 'PDF';
      setDocFileType(ext);
      showToast(`Document "${file.name}" loaded (${sizeMB}).`);
    } catch {
      showToast('Error reading document file.');
    }
  };

  const handleSaveDocument = (e) => {
    e.preventDefault();
    if (!docTitle.trim()) {
      showToast('Please enter a document title.');
      return;
    }

    if (editingDocId) {
      updateGalleryItem(editingDocId, {
        title: docTitle.trim(),
        category: docCategory,
        fileType: docFileType.trim().toUpperCase(),
        fileSize: docFileSize.trim(),
        url: docUrl.trim() || '#snc-doc-download',
        caption: docCaption.trim() || docTitle.trim(),
        date: docDate,
      });
      showToast(`Document "${docTitle}" updated successfully.`);
      setEditingDocId(null);
    } else {
      addGalleryItem({
        type: 'document',
        title: docTitle.trim(),
        category: docCategory,
        fileType: docFileType.trim().toUpperCase(),
        fileSize: docFileSize.trim(),
        url: docUrl.trim() || '#snc-doc-download',
        caption: docCaption.trim() || docTitle.trim(),
        date: docDate,
        author: 'Er. Srinivas Nayak',
      });
      showToast(`New document "${docTitle}" published to frontend gallery.`);
    }

    setDocTitle('');
    setDocUrl('');
    setDocCaption('');
  };

  const handleEditDocument = (doc) => {
    setEditingDocId(doc.id);
    setDocTitle(doc.title);
    setDocCategory(doc.category || DOCUMENT_CATEGORIES[0]);
    setDocFileType(doc.fileType || 'PDF');
    setDocFileSize(doc.fileSize || '2.5 MB');
    setDocUrl(doc.url || '');
    setDocCaption(doc.caption || '');
    setDocDate(doc.date || new Date().toISOString().split('T')[0]);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // ── Delete Handler ──
  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to remove "${title}"? It will immediately disappear from the frontend.`)) {
      deleteGalleryItem(id);
      showToast(`Removed "${title}" from gallery.`);
    }
  };

  // ── Reset Defaults Handler ──
  const handleResetDefaults = () => {
    if (window.confirm('Reset all gallery media back to initial demonstration records? Any custom uploads will be replaced.')) {
      resetGalleryDefaults();
      showToast('Gallery reset to verified corporate defaults.');
    }
  };

  // ── Export Backup JSON ──
  const handleExportBackup = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(items, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `SNC_Gallery_Backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
    showToast('Gallery backup JSON downloaded.');
  };

  // Derived filtered lists for the 3 tabs
  const imageItems = useMemo(() => items.filter((i) => i.type === 'image'), [items]);
  const videoItems = useMemo(() => items.filter((i) => i.type === 'video'), [items]);
  const documentItems = useMemo(() => items.filter((i) => i.type === 'document'), [items]);

  // ── If Not Authenticated, Show Login Screen ──
  if (!authed) {
    return (
      <div className="admin-page">
        <div className="admin-login-wrap">
          <motion.div
            className="admin-login-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="admin-login-icon">
              <Lock size={26} />
            </div>

            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.35rem' }}>
                SNC Staff Admin Portal
              </h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Authorized management console for {COMPANY.name}
              </p>
            </div>

            {loginError && (
              <div style={{ padding: '0.75rem 1rem', background: '#fff5f5', border: '1px solid #fed7d7', borderRadius: 'var(--radius-sm)', color: '#c53030', fontSize: '0.82rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={16} />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit}>
              <div className="admin-form-group">
                <label className="admin-form-label">Username</label>
                <input
                  type="text"
                  required
                  value={loginUser}
                  onChange={(e) => setLoginUser(e.target.value)}
                  placeholder="admin"
                  className="admin-form-input"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Password</label>
                <input
                  type="password"
                  required
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  placeholder="••••••••••••"
                  className="admin-form-input"
                />
              </div>

              <button type="submit" className="btn btn-navy" style={{ width: '100%', padding: '0.9rem' }}>
                <Key size={16} /> Secure Sign In
              </button>
            </form>

            <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-light)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                Default Demonstration Credentials:
              </div>
              <code style={{ background: 'var(--warm-white)', padding: '0.3rem 0.6rem', borderRadius: '3px', fontSize: '0.76rem', color: 'var(--navy)' }}>
                User: admin &bull; Pass: snc@admin2024
              </code>
              <div style={{ marginTop: '1rem' }}>
                <Link to="/" style={{ fontSize: '0.78rem', color: 'var(--navy-royal)', fontWeight: 600 }}>
                  &larr; Return to Public Website
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ── Authenticated Admin Dashboard ──
  return (
    <div className="admin-page">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            className="admin-toast"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
          >
            <CheckCircle2 size={18} style={{ color: 'var(--gold)' }} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header Bar */}
      <div className="admin-header-bar">
        <div className="container">
          <div className="admin-header-inner">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                <span className="demo-badge" style={{ background: 'var(--navy)', color: 'var(--gold-light)' }}>
                  Internal Portal
                </span>
                <span style={{ fontSize: '0.76rem', color: '#25D366', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  &bull; Live Frontend Sync Active
                </span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 900, color: 'var(--navy)' }}>
                SNC Admin Console
              </h1>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                CIN: {COMPANY.cin} &bull; Director: Er. Srinivas Nayak
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link to="/gallery" target="_blank" className="btn btn-outline-gold btn-sm">
                <Eye size={14} /> View Live Gallery
              </Link>

              <button onClick={handleExportBackup} className="btn btn-outline-white btn-sm" style={{ color: 'var(--navy)', borderColor: 'var(--border-light)' }} title="Export JSON">
                <Download size={14} /> Backup
              </button>

              <button onClick={handleResetDefaults} className="btn btn-outline-white btn-sm" style={{ color: 'var(--navy)', borderColor: 'var(--border-light)' }} title="Reset to Defaults">
                <RotateCcw size={14} /> Reset
              </button>

              <button onClick={handleLogout} className="btn btn-navy btn-sm">
                <LogOut size={14} /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container admin-dashboard">
        {/* KPI Stats Overview */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <div>
              <div className="admin-stat-val">{items.length}</div>
              <div className="admin-stat-label">Total Media Items</div>
            </div>
            <Layers size={24} style={{ color: 'var(--gold)' }} />
          </div>

          <div className="admin-stat-card" style={{ borderLeftColor: 'var(--navy-royal)' }}>
            <div>
              <div className="admin-stat-val">{imageItems.length}</div>
              <div className="admin-stat-label">Published Photos</div>
            </div>
            <ImageIcon size={24} style={{ color: 'var(--navy-royal)' }} />
          </div>

          <div className="admin-stat-card" style={{ borderLeftColor: '#e53e3e' }}>
            <div>
              <div className="admin-stat-val">{videoItems.length}</div>
              <div className="admin-stat-label">Video Walkthroughs</div>
            </div>
            <VideoIcon size={24} style={{ color: '#e53e3e' }} />
          </div>

          <div className="admin-stat-card" style={{ borderLeftColor: '#319795' }}>
            <div>
              <div className="admin-stat-val">{documentItems.length}</div>
              <div className="admin-stat-label">Technical Documents</div>
            </div>
            <FileText size={24} style={{ color: '#319795' }} />
          </div>
        </div>

        {/* 3 Dedicated Management Section Tabs */}
        <div className="admin-nav-tabs">
          <button
            className={`admin-nav-tab-btn ${activeTab === 'images' ? 'active' : ''}`}
            onClick={() => setActiveTab('images')}
          >
            <ImageIcon size={18} />
            <span>1. Photos &amp; Site Images ({imageItems.length})</span>
          </button>

          <button
            className={`admin-nav-tab-btn ${activeTab === 'videos' ? 'active' : ''}`}
            onClick={() => setActiveTab('videos')}
          >
            <VideoIcon size={18} />
            <span>2. Videos &amp; Walkthroughs ({videoItems.length})</span>
          </button>

          <button
            className={`admin-nav-tab-btn ${activeTab === 'documents' ? 'active' : ''}`}
            onClick={() => setActiveTab('documents')}
          >
            <FileText size={18} />
            <span>3. Technical Documents &amp; BOQs ({documentItems.length})</span>
          </button>
        </div>

        {/* ============================================================
            SECTION 1: IMAGES MANAGER (POST & EDIT)
            ============================================================ */}
        {activeTab === 'images' && (
          <div className="admin-section-card">
            <div className="admin-section-header">
              <div>
                <h2 className="admin-section-title">
                  {editingImgId ? 'Edit Construction Image' : 'Post New Construction Image'}
                </h2>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Posts directly appear in the public Media Gallery under Photos.
                </div>
              </div>
              {editingImgId && (
                <button
                  onClick={() => {
                    setEditingImgId(null);
                    setImgTitle('');
                    setImgUrl('');
                    setImgCaption('');
                  }}
                  className="btn btn-outline-white btn-sm"
                  style={{ color: 'var(--navy)' }}
                >
                  <X size={14} /> Cancel Editing
                </button>
              )}
            </div>

            {/* Image Creation Form */}
            <form onSubmit={handleSaveImage} className="admin-form-container">
              <div className="admin-form-grid">
                <div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Image Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Heavy Gantry Girder Erection at Rourkela Yard"
                      value={imgTitle}
                      onChange={(e) => setImgTitle(e.target.value)}
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Sector / Category</label>
                    <select
                      value={imgCategory}
                      onChange={(e) => setImgCategory(e.target.value)}
                      className="admin-form-select"
                    >
                      {IMAGE_CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Image URL or Web Link</label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={imgUrl.startsWith('data:') ? '[Uploaded Local File]' : imgUrl}
                      onChange={(e) => setImgUrl(e.target.value)}
                      className="admin-form-input"
                    />
                  </div>

                  {/* Or Upload File */}
                  <div className="admin-form-group">
                    <label className="admin-form-label">Or Upload Local Photo File</label>
                    <div
                      className="admin-file-dropzone"
                      onClick={() => imgFileInputRef.current?.click()}
                    >
                      <Upload size={20} style={{ color: 'var(--gold-dark)', marginBottom: 4 }} />
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy)' }}>
                        Click to select image from computer
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        JPG, PNG, WebP supported
                      </div>
                      <input
                        ref={imgFileInputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleImgFileUpload}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Detailed Caption / Engineering Description *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Describe structural steel grades, welding quality, clear spans, or interior finishes..."
                      value={imgCaption}
                      onChange={(e) => setImgCaption(e.target.value)}
                      className="admin-form-textarea"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Publication Date</label>
                    <input
                      type="date"
                      value={imgDate}
                      onChange={(e) => setImgDate(e.target.value)}
                      className="admin-form-input"
                    />
                  </div>

                  {/* Preview Thumbnail */}
                  {imgUrl && (
                    <div style={{ marginBottom: '1.25rem' }}>
                      <label className="admin-form-label">Live Preview</label>
                      <div style={{ height: '140px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border-light)' }}>
                        <img
                          src={imgUrl}
                          alt="Preview"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80';
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-navy"
                    style={{ width: '100%', padding: '0.9rem' }}
                    disabled={imgFileLoading}
                  >
                    <Plus size={16} />
                    {editingImgId ? 'Update Image in Gallery' : 'Publish Image to Live Gallery'}
                  </button>
                </div>
              </div>
            </form>

            {/* Existing Images Table */}
            <div className="admin-items-table-wrap">
              <table className="admin-items-table">
                <thead>
                  <tr>
                    <th style={{ width: '80px' }}>Thumbnail</th>
                    <th>Title &amp; Caption</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th style={{ textAlign: 'right', width: '120px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {imageItems.map((img) => (
                    <tr key={img.id}>
                      <td>
                        <img
                          src={img.url}
                          alt={img.title}
                          className="admin-thumb-preview"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=120&q=80';
                          }}
                        />
                      </td>
                      <td>
                        <div style={{ fontWeight: 800, color: 'var(--navy)' }}>{img.title}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px', maxWidth: '450px' }}>
                          {img.caption}
                        </div>
                      </td>
                      <td>
                        <span className="demo-badge" style={{ background: 'var(--navy-mid)' }}>
                          {img.category}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{img.date}</td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                          <button
                            onClick={() => handleEditImage(img)}
                            className="admin-action-btn"
                            title="Edit Image"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(img.id, img.title)}
                            className="admin-action-btn delete"
                            title="Delete Image"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================================
            SECTION 2: VIDEOS MANAGER (POST & EDIT)
            ============================================================ */}
        {activeTab === 'videos' && (
          <div className="admin-section-card">
            <div className="admin-section-header">
              <div>
                <h2 className="admin-section-title">
                  {editingVidId ? 'Edit Project Video' : 'Post New Project Video Walkthrough'}
                </h2>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Support YouTube embeds, Vimeo, or direct MP4 links with duration and caption.
                </div>
              </div>
              {editingVidId && (
                <button
                  onClick={() => {
                    setEditingVidId(null);
                    setVidTitle('');
                    setVidUrl('');
                    setVidCaption('');
                  }}
                  className="btn btn-outline-white btn-sm"
                  style={{ color: 'var(--navy)' }}
                >
                  <X size={14} /> Cancel Editing
                </button>
              )}
            </div>

            <form onSubmit={handleSaveVideo} className="admin-form-container">
              <div className="admin-form-grid">
                <div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Video Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 3D Architectural Palace Walkthrough"
                      value={vidTitle}
                      onChange={(e) => setVidTitle(e.target.value)}
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Sector / Category</label>
                    <select
                      value={vidCategory}
                      onChange={(e) => setVidCategory(e.target.value)}
                      className="admin-form-select"
                    >
                      {VIDEO_CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Video URL (YouTube Watch or Embed Link) *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://www.youtube.com/watch?v=... or embed URL"
                      value={vidUrl}
                      onChange={(e) => setVidUrl(e.target.value)}
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Video Duration</label>
                    <input
                      type="text"
                      placeholder="e.g. 04:15"
                      value={vidDuration}
                      onChange={(e) => setVidDuration(e.target.value)}
                      className="admin-form-input"
                    />
                  </div>
                </div>

                <div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Thumbnail Image URL</label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={vidThumbnail}
                      onChange={(e) => setVidThumbnail(e.target.value)}
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Detailed Video Caption *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Describe what is being showcased in this site or fabrication walkthrough..."
                      value={vidCaption}
                      onChange={(e) => setVidCaption(e.target.value)}
                      className="admin-form-textarea"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Date</label>
                    <input
                      type="date"
                      value={vidDate}
                      onChange={(e) => setVidDate(e.target.value)}
                      className="admin-form-input"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-navy"
                    style={{ width: '100%', padding: '0.9rem' }}
                  >
                    <Plus size={16} />
                    {editingVidId ? 'Update Video in Gallery' : 'Publish Video to Live Gallery'}
                  </button>
                </div>
              </div>
            </form>

            {/* Existing Videos Table */}
            <div className="admin-items-table-wrap">
              <table className="admin-items-table">
                <thead>
                  <tr>
                    <th style={{ width: '80px' }}>Thumbnail</th>
                    <th>Title &amp; Caption</th>
                    <th>Category</th>
                    <th>Duration</th>
                    <th>Date</th>
                    <th style={{ textAlign: 'right', width: '120px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {videoItems.map((vid) => (
                    <tr key={vid.id}>
                      <td>
                        <img
                          src={vid.thumbnail || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=120&q=80'}
                          alt={vid.title}
                          className="admin-thumb-preview"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=120&q=80';
                          }}
                        />
                      </td>
                      <td>
                        <div style={{ fontWeight: 800, color: 'var(--navy)' }}>{vid.title}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px', maxWidth: '420px' }}>
                          {vid.caption}
                        </div>
                      </td>
                      <td>
                        <span className="demo-badge" style={{ background: '#742a2a' }}>
                          {vid.category}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.8rem', fontWeight: 700 }}>{vid.duration || '03:00'}</td>
                      <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{vid.date}</td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                          <button
                            onClick={() => handleEditVideo(vid)}
                            className="admin-action-btn"
                            title="Edit Video"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(vid.id, vid.title)}
                            className="admin-action-btn delete"
                            title="Delete Video"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================================
            SECTION 3: TECHNICAL DOCUMENTS MANAGER (POST & EDIT)
            ============================================================ */}
        {activeTab === 'documents' && (
          <div className="admin-section-card">
            <div className="admin-section-header">
              <div>
                <h2 className="admin-section-title">
                  {editingDocId ? 'Edit Technical Document' : 'Post Technical Document or Blueprint'}
                </h2>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Upload or link company capability profiles, CPWD compliance sheets, PEB load calculations, or BOQs.
                </div>
              </div>
              {editingDocId && (
                <button
                  onClick={() => {
                    setEditingDocId(null);
                    setDocTitle('');
                    setDocCaption('');
                  }}
                  className="btn btn-outline-white btn-sm"
                  style={{ color: 'var(--navy)' }}
                >
                  <X size={14} /> Cancel Editing
                </button>
              )}
            </div>

            <form onSubmit={handleSaveDocument} className="admin-form-container">
              <div className="admin-form-grid">
                <div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Document Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. CPWD Material Specifications & Quality Assurance Manual"
                      value={docTitle}
                      onChange={(e) => setDocTitle(e.target.value)}
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Document Category</label>
                    <select
                      value={docCategory}
                      onChange={(e) => setDocCategory(e.target.value)}
                      className="admin-form-select"
                    >
                      {DOCUMENT_CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">File Type</label>
                    <select
                      value={docFileType}
                      onChange={(e) => setDocFileType(e.target.value)}
                      className="admin-form-select"
                    >
                      <option value="PDF">PDF Document (.pdf)</option>
                      <option value="DOCX">Word Document (.docx)</option>
                      <option value="DWG">AutoCAD Blueprint (.dwg)</option>
                      <option value="XLSX">Excel BOQ Sheet (.xlsx)</option>
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">File Size</label>
                    <input
                      type="text"
                      placeholder="e.g. 3.2 MB"
                      value={docFileSize}
                      onChange={(e) => setDocFileSize(e.target.value)}
                      className="admin-form-input"
                    />
                  </div>
                </div>

                <div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Upload Local Document File</label>
                    <div
                      className="admin-file-dropzone"
                      onClick={() => docFileInputRef.current?.click()}
                    >
                      <Upload size={20} style={{ color: 'var(--gold-dark)', marginBottom: 4 }} />
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy)' }}>
                        Click to select document from computer
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        PDF, DOCX, TXT, CAD files supported
                      </div>
                      <input
                        ref={docFileInputRef}
                        type="file"
                        accept=".pdf,.docx,.doc,.txt,.dwg,.xlsx"
                        style={{ display: 'none' }}
                        onChange={handleDocFileUpload}
                      />
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Document Caption / Summary *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Provide a clear technical abstract explaining standards, codes, and coverage..."
                      value={docCaption}
                      onChange={(e) => setDocCaption(e.target.value)}
                      className="admin-form-textarea"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Date</label>
                    <input
                      type="date"
                      value={docDate}
                      onChange={(e) => setDocDate(e.target.value)}
                      className="admin-form-input"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-navy"
                    style={{ width: '100%', padding: '0.9rem' }}
                  >
                    <Plus size={16} />
                    {editingDocId ? 'Update Document in Gallery' : 'Publish Document to Live Gallery'}
                  </button>
                </div>
              </div>
            </form>

            {/* Existing Documents Table */}
            <div className="admin-items-table-wrap">
              <table className="admin-items-table">
                <thead>
                  <tr>
                    <th style={{ width: '70px' }}>Type</th>
                    <th>Title &amp; Summary</th>
                    <th>Category</th>
                    <th>Size</th>
                    <th>Date</th>
                    <th style={{ textAlign: 'right', width: '120px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {documentItems.map((doc) => (
                    <tr key={doc.id}>
                      <td>
                        <span className="demo-badge" style={{ background: '#2c7a7b' }}>
                          {doc.fileType || 'PDF'}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontWeight: 800, color: 'var(--navy)' }}>{doc.title}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px', maxWidth: '420px' }}>
                          {doc.caption}
                        </div>
                      </td>
                      <td>
                        <span className="demo-badge" style={{ background: 'var(--navy-mid)' }}>
                          {doc.category}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{doc.fileSize || '2.0 MB'}</td>
                      <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{doc.date}</td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                          <button
                            onClick={() => handleEditDocument(doc)}
                            className="admin-action-btn"
                            title="Edit Document"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(doc.id, doc.title)}
                            className="admin-action-btn delete"
                            title="Delete Document"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
