// ============================================================
// GALLERY DATA SERVICE & PERSISTENCE
// Srinivas Nayak and Construction Pvt. Ltd. (SNC)
// Manages Images, Videos, and Technical Documents with
// localStorage persistence and live synchronization.
// ============================================================

const STORAGE_KEY = 'snc_gallery_items_v2';
export const GALLERY_UPDATE_EVENT = 'snc_gallery_updated';

export const INITIAL_GALLERY_ITEMS = [
  // ── 1. IMAGES (Architectural, Steel, Residential, Palaces, PEB) ──
  {
    id: 'img-01',
    type: 'image',
    title: 'Heavy Structural Steel Framing & Gantry Runway',
    category: 'Structural Steel',
    url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    caption: 'High-tensile industrial steel framing with automated submerged arc welding (SAW) and 20T gantry crane runway girders executed at Rourkela fabrication yard.',
    date: '2026-03-15',
    author: 'Er. Srinivas Nayak',
    featured: true,
  },
  {
    id: 'img-02',
    type: 'image',
    title: 'The Royal Crest Palace Monumental Portico',
    category: 'Palaces & Luxury',
    url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    caption: 'Client-stated specialization in palace architecture: classical carved stone elevation columns, sweeping double-height portico, and structural RCC core.',
    date: '2026-02-28',
    author: 'Er. Srinivas Nayak',
    featured: true,
  },
  {
    id: 'img-03',
    type: 'image',
    title: 'Contemporary Turnkey Duplex Residence',
    category: 'Residential',
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    caption: 'G+1 luxury family residence featuring designer false ceilings, laser-aligned vitrified flooring, UPVC soundproof sliding windows, and exterior weather-shield texture.',
    date: '2026-02-10',
    author: 'Er. Srinivas Nayak',
    featured: false,
  },
  {
    id: 'img-04',
    type: 'image',
    title: 'High-Bay Pre-Engineered Building (PEB) Warehouse',
    category: 'Industrial PEB',
    url: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80',
    caption: '30m clear-span portal frame industrial warehouse with Galvalume AZ150 high-tensile roof sheeting, polycarbonate skylights, and laser-guided VDF flooring.',
    date: '2026-01-22',
    author: 'Er. Srinivas Nayak',
    featured: true,
  },
  {
    id: 'img-05',
    type: 'image',
    title: 'Multi-Storey Commercial Corporate Complex',
    category: 'Commercial',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    caption: 'Composite steel-concrete commercial complex with structural curtain glazing, BDA statutory drawing approval compliance, and energy-efficient MEP planning.',
    date: '2025-12-18',
    author: 'Er. Srinivas Nayak',
    featured: false,
  },
  {
    id: 'img-06',
    type: 'image',
    title: 'Heavy Civil Mass Earthwork & Deep Piling',
    category: 'Civil & Earthwork',
    url: 'https://images.unsplash.com/photo-1579847188804-ecba0e2ea330?auto=format&fit=crop&w=1200&q=80',
    caption: 'Hydraulic excavator fleet undertaking industrial site leveling, deep foundation excavation, and bored cast-in-situ concrete piles for heavy machinery blocks.',
    date: '2025-11-30',
    author: 'Er. Srinivas Nayak',
    featured: false,
  },

  // ── 2. VIDEOS (Walkthroughs, Erection Footage, Steel Fabrication) ──
  {
    id: 'vid-01',
    type: 'video',
    title: 'Industrial Steel Fabrication & Welding Tour',
    category: 'Fabrication Yard',
    url: 'https://www.youtube.com/embed/5qap5aO4i9A',
    thumbnail: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    duration: '04:15',
    caption: 'On-site engineering tour of structural steel plate girder cutting, automated SAW welding, and ultrasonic non-destructive joint testing (NDT).',
    date: '2026-03-02',
    author: 'Er. Srinivas Nayak',
    featured: true,
  },
  {
    id: 'vid-02',
    type: 'video',
    title: 'Palace Architecture & Elevation 3D Walkthrough',
    category: 'Palaces & Luxury',
    url: 'https://www.youtube.com/embed/0gNuxpG8w44',
    thumbnail: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
    duration: '03:40',
    caption: 'Virtual architectural walkthrough demonstrating exterior classical pediments, grand foyer layouts, and custom ornamental wrought-iron entrance gates.',
    date: '2026-02-14',
    author: 'Er. Srinivas Nayak',
    featured: true,
  },
  {
    id: 'vid-03',
    type: 'video',
    title: 'Pre-Engineered Building (PEB) Fast-Track Erection',
    category: 'Industrial PEB',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80',
    duration: '02:50',
    caption: 'Time-lapse documentation of portal frame column erection, rafter assembly, sag rod bracing, and cold-formed Z-purlin installation on site.',
    date: '2026-01-18',
    author: 'Er. Srinivas Nayak',
    featured: false,
  },
  {
    id: 'vid-04',
    type: 'video',
    title: 'Turnkey Residential Duplex Construction Journey',
    category: 'Residential',
    url: 'https://www.youtube.com/embed/0gNuxpG8w44',
    thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    duration: '05:10',
    caption: 'Step-by-step progress tracking from foundation excavation and RCC slab casting to electrical conduit wiring and modular woodwork handover.',
    date: '2025-12-05',
    author: 'Er. Srinivas Nayak',
    featured: false,
  },

  // ── 3. DOCUMENTS (Technical Specifications, BOQ, Approvals, Standards) ──
  {
    id: 'doc-01',
    type: 'document',
    title: 'SNC Corporate Profile & Engineering Capability Statement',
    category: 'Corporate Overview',
    fileType: 'PDF',
    fileSize: '4.8 MB',
    url: '#snc-profile-download',
    caption: 'Official corporate dossier containing CIN (U41001OD2023PTC044544), GSTIN (21BPSPN6368E1ZL), director credentials, machine fleet index, and turnkey project capabilities.',
    date: '2026-03-01',
    author: 'Director Er. Srinivas Nayak',
    featured: true,
  },
  {
    id: 'doc-02',
    type: 'document',
    title: 'CPWD-Aligned Material Specifications & Quality Assurance Manual',
    category: 'Quality Standards',
    fileType: 'PDF',
    fileSize: '3.2 MB',
    url: '#cpwd-quality-manual',
    caption: 'Comprehensive quality control protocols covering IS 800:2007 steel fabrication, IS 456:2000 concrete cube testing, and ultrasonic weld audit parameters.',
    date: '2026-02-20',
    author: 'Quality Audit Team',
    featured: true,
  },
  {
    id: 'doc-03',
    type: 'document',
    title: 'Pre-Engineered Building (PEB) Structural Design & Wind Load Matrix',
    category: 'Technical Specifications',
    fileType: 'PDF',
    fileSize: '5.1 MB',
    url: '#peb-structural-matrix',
    caption: 'Structural engineering load calculation sheets for clear-span portal frames designed for coastal Odisha cyclone wind speeds up to 200 km/h (IS 875 Part 3).',
    date: '2026-01-30',
    author: 'Er. Srinivas Nayak',
    featured: false,
  },
  {
    id: 'doc-04',
    type: 'document',
    title: 'Commercial & Residential Statutory Approval Roadmap',
    category: 'Approvals & Liaison',
    fileType: 'PDF',
    fileSize: '2.4 MB',
    url: '#statutory-approvals-roadmap',
    caption: 'Step-by-step flowchart for BDA, IDCO land development permissions, Fire Department NOC, and Factory Inspectorate building plan approvals.',
    date: '2025-12-15',
    author: 'Legal & Liaison Desk',
    featured: false,
  },
];

/**
 * Retrieve all gallery items from localStorage (or fallback to initial set)
 */
export function getGalleryItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_GALLERY_ITEMS));
      return INITIAL_GALLERY_ITEMS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_GALLERY_ITEMS));
      return INITIAL_GALLERY_ITEMS;
    }
    return parsed;
  } catch (err) {
    console.error('Failed to load gallery items from localStorage:', err);
    return INITIAL_GALLERY_ITEMS;
  }
}

/**
 * Save gallery items to localStorage and notify all listeners
 */
export function saveGalleryItems(items) {
  // Always asynchronously persist into IndexedDB (supports 100MB+ media files)
  saveItemsToDB(items);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.warn('LocalStorage quota reached, saving lightweight manifest');
    try {
      const lightItems = items.map((i) => ({
        ...i,
        url: i.url && i.url.length > 80000 ? '#stored_in_indexeddb' : i.url,
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lightItems));
    } catch {}
  }

  window.dispatchEvent(new CustomEvent(GALLERY_UPDATE_EVENT, { detail: items }));
  return true;
}

/**
 * Add a new item to the gallery
 */
export function addGalleryItem(item) {
  const current = getGalleryItems();
  const newItem = {
    ...item,
    id: item.id || `snc-${item.type}-${Date.now()}`,
    date: item.date || new Date().toISOString().split('T')[0],
    author: item.author || 'Admin / Er. Srinivas Nayak',
    featured: Boolean(item.featured),
  };
  const updated = [newItem, ...current];
  saveGalleryItems(updated);
  return newItem;
}

/**
 * Update an existing gallery item
 */
export function updateGalleryItem(id, updatedFields) {
  const current = getGalleryItems();
  const index = current.findIndex((i) => i.id === id);
  if (index === -1) return null;
  const updatedItem = { ...current[index], ...updatedFields };
  current[index] = updatedItem;
  saveGalleryItems([...current]);
  return updatedItem;
}

/**
 * Delete a gallery item by ID
 */
export function deleteGalleryItem(id) {
  const current = getGalleryItems();
  const updated = current.filter((i) => i.id !== id);
  saveGalleryItems(updated);
  return updated;
}

/**
 * Reset gallery items back to default demonstration records
 */
export function resetGalleryDefaults() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_GALLERY_ITEMS));
  window.dispatchEvent(new CustomEvent(GALLERY_UPDATE_EVENT, { detail: INITIAL_GALLERY_ITEMS }));
  return INITIAL_GALLERY_ITEMS;
}

/**
 * Convert an uploaded file into a Data URL for instant preview & storage
 */
export function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}


/**
 * Compress an image file to max dimension and JPEG quality before storing
 * Highly optimized for mobile phone camera and gallery uploads
 */
export function compressImage(file, maxWidth = 1920, quality = 0.84) {
  return new Promise((resolve) => {
    if (!file || !file.type.startsWith('image/')) {
      readFileAsDataURL(file).then(resolve).catch(() => resolve(''));
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => resolve(e.target.result);
      img.src = e.target.result;
    };
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
}

/**
 * Format seconds into mm:ss
 */
export function formatDuration(seconds) {
  if (!seconds || isNaN(seconds)) return '03:30';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

/**
 * Automatically capture a video thumbnail and duration from a video file / DataURL
 */
export function generateVideoThumbnail(videoSrc) {
  return new Promise((resolve) => {
    try {
      const video = document.createElement('video');
      video.crossOrigin = 'anonymous';
      video.muted = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.src = videoSrc;

      let timeout = setTimeout(() => {
        resolve(null);
      }, 5000);

      video.onloadedmetadata = () => {
        const targetTime = Math.min(1.0, (video.duration || 2) / 2);
        video.currentTime = targetTime;
      };

      video.onseeked = () => {
        clearTimeout(timeout);
        try {
          const canvas = document.createElement('canvas');
          canvas.width = Math.min(800, video.videoWidth || 640);
          canvas.height = Math.min(450, video.videoHeight || 360);
          const ctx = canvas.getContext('2d');
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const thumb = canvas.toDataURL('image/jpeg', 0.8);
          resolve({
            thumbnail: thumb,
            duration: formatDuration(video.duration),
          });
        } catch {
          resolve(null);
        }
      };

      video.onerror = () => {
        clearTimeout(timeout);
        resolve(null);
      };
    } catch {
      resolve(null);
    }
  });
}

// ── IndexedDB Cache for Robust Media Storage ──
const DB_NAME = 'snc_media_vault_db';
const STORE_NAME = 'gallery_items';

function initIndexedDB() {
  if (typeof window === 'undefined' || !window.indexedDB) return Promise.resolve(null);
  return new Promise((resolve) => {
    const req = window.indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => resolve(null);
  });
}

async function saveItemsToDB(items) {
  const db = await initIndexedDB();
  if (!db) return;
  try {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.clear();
    for (const item of items) {
      store.put(item);
    }
  } catch (err) {
    console.error('IndexedDB save error:', err);
  }
}

// Auto-hydrate from IndexedDB on startup
if (typeof window !== 'undefined') {
  initIndexedDB().then((db) => {
    if (!db) return;
    try {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => {
        if (Array.isArray(req.result) && req.result.length > 0) {
          window.dispatchEvent(new CustomEvent(GALLERY_UPDATE_EVENT, { detail: req.result }));
        }
      };
    } catch {}
  });
}
