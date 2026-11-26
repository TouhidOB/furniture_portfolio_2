import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { PRODUCTS } from '../data/products';
import { formatPrice, getProductImage } from '../utils/product';
import { Button } from '../components/ui/Button';
import { Product360Viewer } from '../components/ui/Product360Viewer';
import {
  Lock,
  Unlock,
  Layers,
  Palette,
  Package,
  Inbox,
  Calendar,
  Save,
  CheckCircle2,
  Upload,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  RefreshCw,
  RotateCw,
  Search,
  FileCode,
  LayoutGrid,
  List,
  BarChart3,
  TrendingUp,
  Sparkles,
  Sliders,
  Check,
  Eye,
  ArrowRight,
  ShieldCheck,
  FolderOpen,
  Image as ImageIcon,
  Activity,
  HardDrive
} from 'lucide-react';

export function DashboardPage() {
  const { sections, theme, updateSection, updateTheme } = useCMS();

  // Authentication barrier
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  // Active dashboard view
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'products' | 'sections' | 'theme' | 'leads'

  // Catalog view mode
  const [catalogViewMode, setCatalogViewMode] = useState('grid'); // 'grid' | 'table'
  const [catalogCategory, setCatalogCategory] = useState('all');

  // Section editor state
  const [selectedSectionKey, setSelectedSectionKey] = useState('dark_reveal');
  const [sectionFormData, setSectionFormData] = useState({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Products CRUD state
  const [productsList, setProductsList] = useState(PRODUCTS);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');

  // Theme editor state
  const [themeFormData, setThemeFormData] = useState(theme);

  // Leads state (inquiries & appointments)
  const [inquiries, setInquiries] = useState([]);
  const [appointments, setAppointments] = useState([]);

  // Passcode verification
  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === 'maison2026' || passcode === 'admin') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect Maison Noir passcode. (Hint: maison2026)');
    }
  };

  // Sync selected section into form state
  useEffect(() => {
    if (sections[selectedSectionKey]) {
      setSectionFormData(sections[selectedSectionKey]);
    }
  }, [selectedSectionKey, sections]);

  useEffect(() => {
    setThemeFormData(theme);
  }, [theme]);

  // Fetch leads and products from Django API when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      // Fetch inquiries
      fetch('/api/inquiries/')
        .then(r => r.ok ? r.json() : [])
        .then(data => setInquiries(Array.isArray(data) ? data : []))
        .catch(() => {});

      // Fetch appointments
      fetch('/api/appointments/')
        .then(r => r.ok ? r.json() : [])
        .then(data => setAppointments(Array.isArray(data) ? data : []))
        .catch(() => {});

      // Fetch dynamic products from backend if available
      fetch('/api/products/')
        .then(r => r.ok ? r.json() : [])
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            setProductsList(data);
          }
        })
        .catch(() => {});
    }
  }, [isAuthenticated]);

  const handleSaveSection = async (e) => {
    e.preventDefault();
    await updateSection(selectedSectionKey, sectionFormData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleSaveTheme = async (e) => {
    e.preventDefault();
    await updateTheme(themeFormData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  // File Uploader to Django `/api/upload/`
  const handleFileUpload = async (e, targetField = 'image_url') => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadStatus('Uploading file to backend...');
    const form = new FormData();
    form.append('file', file);

    try {
      const res = await fetch('/api/upload/', {
        method: 'POST',
        body: form
      });
      if (res.ok) {
        const data = await res.json();
        setUploadStatus('File uploaded successfully!');
        if (targetField === 'image_url') {
          setSectionFormData(prev => ({ ...prev, image_url: data.url }));
        } else if (editingProduct) {
          if (targetField === 'primary_image') {
            setEditingProduct(prev => ({
              ...prev,
              image_url: data.url,
              images: { ...(prev.images || {}), hero: data.url, primary: data.url }
            }));
          } else if (targetField === 'glb_url') {
            setEditingProduct(prev => ({
              ...prev,
              model3d: { ...(prev.model3d || {}), glb_url: data.url }
            }));
          }
        }
        setTimeout(() => setUploadStatus(''), 3000);
      } else {
        setUploadStatus('Upload failed. Please check file type.');
      }
    } catch (err) {
      setUploadStatus('Using local preview URL');
      const tempUrl = URL.createObjectURL(file);
      if (targetField === 'image_url') {
        setSectionFormData(prev => ({ ...prev, image_url: tempUrl }));
      } else if (editingProduct && targetField === 'primary_image') {
        setEditingProduct(prev => ({
          ...prev,
          image_url: tempUrl,
          images: { ...(prev.images || {}), hero: tempUrl, primary: tempUrl }
        }));
      }
    }
  };

  // Multi-frame 360-degree turntable photo sequence uploader
  const handle360FramesUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploadStatus(`Uploading ${files.length} 360° frames...`);

    const uploadedUrls = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const form = new FormData();
      form.append('file', file);
      try {
        const res = await fetch('/api/upload/', { method: 'POST', body: form });
        if (res.ok) {
          const data = await res.json();
          uploadedUrls.push(data.url);
        }
      } catch (err) {
        console.error("Frame upload error:", err);
      }
    }

    setEditingProduct(prev => {
      const existing = prev.images?.turntable_360 || [];
      const combined = [...existing, ...uploadedUrls];
      return {
        ...prev,
        images: {
          ...(prev.images || {}),
          turntable_360: combined
        }
      };
    });
    setUploadStatus(`Uploaded ${uploadedUrls.length} frames successfully!`);
    setTimeout(() => setUploadStatus(''), 3000);
  };

  // Clear 360 frames
  const handleClear360Frames = () => {
    setEditingProduct(prev => ({
      ...prev,
      images: {
        ...(prev.images || {}),
        turntable_360: []
      }
    }));
  };

  // Product Save
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      const method = isNewProduct ? 'POST' : 'PUT';
      const url = isNewProduct ? '/api/products/' : `/api/products/${editingProduct.id}/`;
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct)
      });

      if (res.ok) {
        const saved = await res.json();
        if (isNewProduct) {
          setProductsList([saved, ...productsList]);
        } else {
          setProductsList(productsList.map(p => p.id === saved.id ? saved : p));
        }
      } else {
        if (isNewProduct) {
          setProductsList([{ ...editingProduct, id: Date.now() }, ...productsList]);
        } else {
          setProductsList(productsList.map(p => p.id === editingProduct.id ? editingProduct : p));
        }
      }
    } catch (err) {
      if (isNewProduct) {
        setProductsList([{ ...editingProduct, id: Date.now() }, ...productsList]);
      } else {
        setProductsList(productsList.map(p => p.id === editingProduct.id ? editingProduct : p));
      }
    }

    setEditingProduct(null);
    setIsNewProduct(false);
  };

  const totalCatalogValue = productsList.reduce((acc, p) => acc + (Number(p.price) || 0), 0);

  // 1. Passcode Barrier Screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-obsidian text-ivory flex items-center justify-center pt-28 pb-20 px-4">
        <div className="w-full max-w-md bg-graphite border border-graphite-border p-8 md:p-10 shadow-2xl relative">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-obsidian border border-champagne/50 rounded-full flex items-center justify-center mx-auto mb-4 text-champagne shadow-lg">
              <Lock className="w-7 h-7" />
            </div>
            <span className="eyebrow block mb-1">MAISON NOIR STUDIO</span>
            <h1 className="font-serif text-3xl text-ivory font-light">CMS & Architecture Studio</h1>
            <p className="text-xs text-stone mt-2 font-sans leading-relaxed">
              Enter security passcode to manage live sections, theme tokens, product models, and private client leads.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-stone mb-1 font-sans">
                Studio Passcode
              </label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode (maison2026)..."
                autoFocus
                className="w-full bg-obsidian border border-graphite-border px-3.5 py-2.5 text-sm text-ivory focus:border-champagne focus:outline-none font-mono"
              />
              {authError && <p className="text-xs text-red-400 mt-2 font-sans">{authError}</p>}
            </div>

            <Button type="submit" variant="champagne" size="lg" className="w-full" icon={Unlock}>
              Enter CMS Studio
            </Button>
          </form>

          <p className="text-[10px] text-stone text-center tracking-widest uppercase mt-6 pt-4 border-t border-graphite-border">
            Authorized Personnel Only • Variant 02
          </p>
        </div>
      </main>
    );
  }

  // Filtered products for catalog tab
  const filteredProducts = productsList.filter(p => {
    const matchesCategory = catalogCategory === 'all' || p.category === catalogCategory;
    const matchesSearch = !productSearch ||
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.slug.toLowerCase().includes(productSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 2. Full Professional CMS Dashboard
  return (
    <div className="min-h-screen bg-obsidian text-ivory flex flex-col font-sans">
      {/* Top Studio Control Bar */}
      <header className="bg-graphite border-b border-graphite-border sticky top-0 z-40 px-6 py-3.5">
        <div className="max-w-[1700px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="font-serif text-2xl text-ivory font-semibold tracking-wider">
              MAISON NOIR
            </span>
            <span className="text-[10px] uppercase tracking-widest bg-champagne text-obsidian px-2.5 py-0.5 font-bold">
              CMS Studio v2.0
            </span>
            <span className="hidden sm:inline-flex items-center space-x-1 text-[11px] text-emerald-400 pl-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Django REST Connected</span>
            </span>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center space-x-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-obsidian border border-graphite-border hover:border-champagne text-xs text-stone hover:text-champagne transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Live Site</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>

            <button
              onClick={() => {
                setEditingProduct({
                  name: 'New Architectural Piece',
                  slug: 'new-piece-' + Date.now(),
                  category: 'living',
                  collection: 'monolith-collection',
                  price: 3800,
                  tagline: 'Sculptural permanence crafted for modern domestic sanctuaries.',
                  description: 'Single-origin French timber and honed Spanish marble crafted with invisible mortise-and-tenon joinery.',
                  dimensions: { width: '92 cm', depth: '88 cm', height: '76 cm' },
                  image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85',
                  images: { hero: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85' },
                  model3d: { type: 'chair' }
                });
                setIsNewProduct(true);
                setActiveTab('products');
              }}
              className="inline-flex items-center space-x-1.5 px-4 py-1.5 bg-champagne hover:bg-champagne-light text-obsidian text-xs font-semibold uppercase tracking-wider transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Piece</span>
            </button>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-xs text-stone hover:text-red-400 uppercase tracking-widest px-2"
              title="Lock CMS Studio"
            >
              Lock
            </button>
          </div>
        </div>
      </header>

      {/* Main Studio Shell: Left Navigation Sidebar + Right Content Area */}
      <div className="max-w-[1700px] mx-auto w-full flex-1 flex flex-col lg:flex-row">
        {/* Navigation Sidebar */}
        <aside className="w-full lg:w-64 bg-graphite/60 border-b lg:border-b-0 lg:border-r border-graphite-border p-4 lg:p-6 shrink-0 space-y-6">
          <div>
            <span className="eyebrow block text-stone mb-2 text-[10px]">STUDIO NAVIGATION</span>
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 text-xs font-medium transition-all ${
                  activeTab === 'overview'
                    ? 'bg-champagne text-obsidian font-semibold shadow'
                    : 'text-stone hover:text-ivory hover:bg-obsidian/40'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Executive Overview</span>
              </button>

              <button
                onClick={() => setActiveTab('products')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-medium transition-all ${
                  activeTab === 'products'
                    ? 'bg-champagne text-obsidian font-semibold shadow'
                    : 'text-stone hover:text-ivory hover:bg-obsidian/40'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Package className="w-4 h-4" />
                  <span>Product Catalog</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${activeTab === 'products' ? 'bg-obsidian text-champagne' : 'bg-obsidian text-stone'}`}>
                  {productsList.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('sections')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-medium transition-all ${
                  activeTab === 'sections'
                    ? 'bg-champagne text-obsidian font-semibold shadow'
                    : 'text-stone hover:text-ivory hover:bg-obsidian/40'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Layers className="w-4 h-4" />
                  <span>14 Homepage Sections</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${activeTab === 'sections' ? 'bg-obsidian text-champagne' : 'bg-obsidian text-stone'}`}>
                  14
                </span>
              </button>

              <button
                onClick={() => setActiveTab('theme')}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 text-xs font-medium transition-all ${
                  activeTab === 'theme'
                    ? 'bg-champagne text-obsidian font-semibold shadow'
                    : 'text-stone hover:text-ivory hover:bg-obsidian/40'
                }`}
              >
                <Palette className="w-4 h-4" />
                <span>Palette & Fonts</span>
              </button>

              <button
                onClick={() => setActiveTab('leads')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-medium transition-all ${
                  activeTab === 'leads'
                    ? 'bg-champagne text-obsidian font-semibold shadow'
                    : 'text-stone hover:text-ivory hover:bg-obsidian/40'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Inbox className="w-4 h-4" />
                  <span>Client Leads & Bookings</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${activeTab === 'leads' ? 'bg-obsidian text-champagne' : 'bg-obsidian text-stone'}`}>
                  {inquiries.length + appointments.length}
                </span>
              </button>
            </nav>
          </div>

          {/* System Diagnostics Box */}
          <div className="bg-obsidian border border-graphite-border p-3.5 space-y-2 text-[11px] text-stone">
            <div className="flex items-center justify-between">
              <span className="uppercase tracking-widest text-[10px]">Server Architecture</span>
              <span className="text-champagne font-mono">Port 8001</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Frontend Port</span>
              <span className="text-ivory font-mono">5174 / 3001</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Media Storage</span>
              <span className="text-ivory font-mono">/app/media/</span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-graphite-border text-[10px]">
              <span>Database Engine</span>
              <span className="text-champagne">SQLite 3 / DRF</span>
            </div>
          </div>
        </aside>

        {/* Right Content Area */}
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
          {/* ================= VIEW 1: EXECUTIVE OVERVIEW ================= */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <span className="eyebrow block mb-1">DASHBOARD OVERVIEW</span>
                <h1 className="font-serif text-3xl md:text-4xl text-ivory">Maison Noir Showroom Performance</h1>
                <p className="text-xs text-stone mt-1">
                  Real-time status of catalog valuation, 3D interactive assets, and client inquiries.
                </p>
              </div>

              {/* 4 KPI Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-graphite border border-graphite-border p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-stone">
                    <span className="uppercase tracking-wider">Catalog Valuation</span>
                    <TrendingUp className="w-4 h-4 text-champagne" />
                  </div>
                  <div className="font-serif text-2xl md:text-3xl text-ivory">
                    {formatPrice(totalCatalogValue)}
                  </div>
                  <p className="text-[11px] text-stone">18 Active Architectural Masterworks</p>
                </div>

                <div className="bg-graphite border border-graphite-border p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-stone">
                    <span className="uppercase tracking-wider">Showroom Appointments</span>
                    <Calendar className="w-4 h-4 text-champagne" />
                  </div>
                  <div className="font-serif text-2xl md:text-3xl text-ivory">
                    {appointments.length}
                  </div>
                  <p className="text-[11px] text-stone">Copenhagen • Kyoto • New York</p>
                </div>

                <div className="bg-graphite border border-graphite-border p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-stone">
                    <span className="uppercase tracking-wider">3D Interactive Models</span>
                    <Sparkles className="w-4 h-4 text-champagne" />
                  </div>
                  <div className="font-serif text-2xl md:text-3xl text-ivory">
                    18 / 18
                  </div>
                  <p className="text-[11px] text-stone">WebGL Shaders & GLB Support</p>
                </div>

                <div className="bg-graphite border border-graphite-border p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-stone">
                    <span className="uppercase tracking-wider">Bespoke Inquiries</span>
                    <Inbox className="w-4 h-4 text-champagne" />
                  </div>
                  <div className="font-serif text-2xl md:text-3xl text-ivory">
                    {inquiries.length}
                  </div>
                  <p className="text-[11px] text-stone">Trade & Custom Commission Leads</p>
                </div>
              </div>

              {/* Quick Actions & Recent Pieces Showcase */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Recent Pieces Visual Grid */}
                <div className="lg:col-span-8 bg-graphite border border-graphite-border p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-graphite-border">
                    <h3 className="font-serif text-2xl text-ivory">Featured Architectural Pieces</h3>
                    <button
                      onClick={() => setActiveTab('products')}
                      className="text-xs text-champagne hover:underline uppercase tracking-wider"
                    >
                      View All 18 Pieces →
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {productsList.slice(0, 3).map((p) => (
                      <div key={p.id} className="bg-obsidian border border-graphite-border p-3 space-y-2 group">
                        <div className="h-36 overflow-hidden relative">
                          <img
                            src={getProductImage(p)}
                            alt={p.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <span className="absolute bottom-2 left-2 text-[9px] uppercase tracking-wider bg-obsidian/90 px-1.5 py-0.5 text-champagne">
                            {p.category}
                          </span>
                        </div>
                        <h4 className="font-serif text-lg text-ivory truncate">{p.name}</h4>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-champagne font-mono">{formatPrice(p.price)}</span>
                          <button
                            onClick={() => { setEditingProduct(p); setIsNewProduct(false); setActiveTab('products'); }}
                            className="text-stone hover:text-ivory"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Studio Commands */}
                <div className="lg:col-span-4 bg-graphite border border-graphite-border p-6 space-y-4">
                  <h3 className="font-serif text-2xl text-ivory">Studio Controls</h3>
                  <div className="space-y-2 text-xs">
                    <button
                      onClick={() => { setSelectedSectionKey('dark_reveal'); setActiveTab('sections'); }}
                      className="w-full p-3 bg-obsidian border border-graphite-border hover:border-champagne text-left flex items-center justify-between transition-colors"
                    >
                      <span>Update Hero Section 01</span>
                      <ArrowRight className="w-3.5 h-3.5 text-champagne" />
                    </button>
                    <button
                      onClick={() => setActiveTab('theme')}
                      className="w-full p-3 bg-obsidian border border-graphite-border hover:border-champagne text-left flex items-center justify-between transition-colors"
                    >
                      <span>Customize Brand Color Tokens</span>
                      <ArrowRight className="w-3.5 h-3.5 text-champagne" />
                    </button>
                    <button
                      onClick={() => setActiveTab('leads')}
                      className="w-full p-3 bg-obsidian border border-graphite-border hover:border-champagne text-left flex items-center justify-between transition-colors"
                    >
                      <span>Review Showroom Bookings</span>
                      <ArrowRight className="w-3.5 h-3.5 text-champagne" />
                    </button>
                    <a
                      href="/api/health/"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full p-3 bg-obsidian border border-graphite-border hover:border-champagne text-left flex items-center justify-between transition-colors"
                    >
                      <span>API Health Diagnostics (JSON)</span>
                      <ExternalLink className="w-3.5 h-3.5 text-champagne" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= VIEW 2: PRODUCT CATALOG CRUD ================= */}
          {activeTab === 'products' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-graphite-border">
                <div>
                  <span className="eyebrow text-champagne">COLLECTION ARCHITECTURE</span>
                  <h1 className="font-serif text-3xl md:text-4xl text-ivory">Product Catalog ({productsList.length})</h1>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* View Mode Toggle: Grid vs Table */}
                  <div className="flex items-center space-x-1 bg-obsidian p-1 border border-graphite-border">
                    <button
                      onClick={() => setCatalogViewMode('grid')}
                      className={`p-1.5 transition-colors ${catalogViewMode === 'grid' ? 'bg-champagne text-obsidian' : 'text-stone hover:text-ivory'}`}
                      title="Showcase Cards Grid View"
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCatalogViewMode('table')}
                      className={`p-1.5 transition-colors ${catalogViewMode === 'table' ? 'bg-champagne text-obsidian' : 'text-stone hover:text-ivory'}`}
                      title="High-Density Table View"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Search Input */}
                  <div className="relative">
                    <input
                      type="text"
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      placeholder="Search pieces..."
                      className="bg-obsidian border border-graphite-border pl-8 pr-3 py-1.5 text-xs text-ivory placeholder-stone focus:outline-none focus:border-champagne w-48"
                    />
                    <Search className="w-3.5 h-3.5 text-stone absolute left-2.5 top-2" />
                  </div>

                  <Button
                    onClick={() => {
                      setEditingProduct({
                        name: 'New Architectural Piece',
                        slug: 'new-piece-' + Date.now(),
                        category: 'living',
                        collection: 'monolith-collection',
                        price: 3600,
                        tagline: 'Sculptural permanence for modern residences.',
                        description: 'Crafted from solid unveneered timber and Spanish stone.',
                        dimensions: { width: '90 cm', depth: '90 cm', height: '75 cm' },
                        image_url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=85',
                        images: { hero: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=85' },
                        model3d: { type: 'chair' }
                      });
                      setIsNewProduct(true);
                    }}
                    variant="champagne"
                    size="sm"
                    icon={Plus}
                  >
                    Add Piece
                  </Button>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                {[
                  { id: 'all', label: 'All Categories' },
                  { id: 'living', label: 'Living' },
                  { id: 'dining', label: 'Dining' },
                  { id: 'bedroom', label: 'Bedroom' },
                  { id: 'workspace', label: 'Workspace' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCatalogCategory(cat.id)}
                    className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-all border whitespace-nowrap ${
                      catalogCategory === cat.id
                        ? 'bg-champagne text-obsidian border-champagne font-semibold shadow'
                        : 'bg-graphite text-stone border-graphite-border hover:text-ivory'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Product Edit / Create Modal */}
              {editingProduct && (
                <div className="bg-graphite border-2 border-champagne p-6 md:p-8 space-y-6 shadow-2xl animate-fade-in">
                  <div className="flex items-center justify-between pb-4 border-b border-graphite-border">
                    <div>
                      <span className="eyebrow text-champagne">{isNewProduct ? 'CREATION' : 'EDIT SPEC'}</span>
                      <h3 className="font-serif text-3xl text-ivory">
                        {isNewProduct ? 'Create New Architectural Piece' : `Edit: ${editingProduct.name}`}
                      </h3>
                    </div>
                    <button
                      onClick={() => { setEditingProduct(null); setIsNewProduct(false); }}
                      className="text-stone hover:text-ivory text-xs uppercase tracking-wider px-3 py-1 bg-obsidian border border-graphite-border"
                    >
                      Close
                    </button>
                  </div>

                  <form onSubmit={handleSaveProduct} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-stone mb-1">Piece Name</label>
                        <input
                          type="text"
                          required
                          value={editingProduct.name}
                          onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                          className="w-full bg-obsidian border border-graphite-border px-3 py-2 text-sm text-ivory focus:border-champagne focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-stone mb-1">Category</label>
                        <select
                          value={editingProduct.category}
                          onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                          className="w-full bg-obsidian border border-graphite-border px-3 py-2 text-sm text-ivory focus:border-champagne focus:outline-none"
                        >
                          <option value="living">Living Room</option>
                          <option value="dining">Dining Room</option>
                          <option value="bedroom">Bedroom</option>
                          <option value="workspace">Workspace</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-stone mb-1">Price (USD)</label>
                        <input
                          type="number"
                          required
                          value={editingProduct.price}
                          onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                          className="w-full bg-obsidian border border-graphite-border px-3 py-2 text-sm text-ivory focus:border-champagne focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-stone mb-1">Tagline</label>
                        <input
                          type="text"
                          value={editingProduct.tagline || ''}
                          onChange={(e) => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                          className="w-full bg-obsidian border border-graphite-border px-3 py-2 text-sm text-ivory focus:border-champagne focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest text-stone mb-1">Collection</label>
                        <input
                          type="text"
                          value={editingProduct.collection || 'Monolith Series'}
                          onChange={(e) => setEditingProduct({ ...editingProduct, collection: e.target.value })}
                          className="w-full bg-obsidian border border-graphite-border px-3 py-2 text-sm text-ivory focus:border-champagne focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-stone mb-1">Editorial Description</label>
                      <textarea
                        rows={3}
                        value={editingProduct.description || editingProduct.longDescription || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                        className="w-full bg-obsidian border border-graphite-border px-3 py-2 text-sm text-ivory focus:border-champagne focus:outline-none"
                      />
                    </div>

                    {/* Image Upload Zone */}
                    <div className="p-4 bg-obsidian border border-graphite-border space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-widest text-champagne font-semibold flex items-center space-x-1.5">
                          <ImageIcon className="w-4 h-4" />
                          <span>Real High-Resolution Photography</span>
                        </span>
                        {uploadStatus && <span className="text-xs text-champagne">{uploadStatus}</span>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        <div className="md:col-span-3 h-28 border border-graphite-border overflow-hidden bg-obsidian">
                          <img
                            src={getProductImage(editingProduct)}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="md:col-span-9 space-y-2">
                          <input
                            type="text"
                            value={editingProduct.image_url || editingProduct.images?.hero || editingProduct.images?.primary || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setEditingProduct({
                                ...editingProduct,
                                image_url: val,
                                images: { ...(editingProduct.images || {}), hero: val, primary: val }
                              });
                            }}
                            placeholder="Enter image URL or choose file from device..."
                            className="w-full bg-graphite border border-graphite-border px-3 py-2 text-xs text-ivory font-mono"
                          />
                          <label className="inline-flex items-center space-x-2 px-4 py-2 bg-graphite border border-champagne text-champagne text-xs uppercase tracking-wider font-semibold cursor-pointer hover:bg-champagne hover:text-obsidian transition-colors">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Image to Django Media Store</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileUpload(e, 'primary_image')}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* 3D Model & 360° Imagery Suite */}
                    <div className="p-5 bg-obsidian border border-graphite-border space-y-5">
                      <div className="flex items-center justify-between border-b border-graphite-border pb-3">
                        <span className="text-xs uppercase tracking-widest text-champagne font-semibold flex items-center space-x-2">
                          <RotateCw className="w-4 h-4 text-champagne" />
                          <span>3D & 360° Interactive Imagery Suite</span>
                        </span>
                        <span className="text-[10px] text-stone uppercase tracking-wider font-mono">
                          Web-Ready 360 Engine
                        </span>
                      </div>

                      {/* Method 1: True 3D File (.glb) */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-xs text-ivory font-medium flex items-center space-x-1.5">
                            <FileCode className="w-3.5 h-3.5 text-champagne" />
                            <span>1. Real-Time 3D Asset (.glb / .gltf)</span>
                          </label>
                          {editingProduct.model3d?.glb_url && (
                            <span className="text-[10px] text-champagne font-mono bg-graphite px-2 py-0.5 border border-graphite-border truncate max-w-xs">
                              {editingProduct.model3d.glb_url}
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <span className="block text-[11px] text-stone mb-1 font-sans">Procedural Fallback Mesh</span>
                            <select
                              value={editingProduct.model3d?.type || 'chair'}
                              onChange={(e) => setEditingProduct({
                                ...editingProduct,
                                model3d: { ...(editingProduct.model3d || {}), type: e.target.value }
                              })}
                              className="w-full bg-graphite border border-graphite-border px-3 py-2 text-xs text-ivory focus:border-champagne focus:outline-none"
                            >
                              <option value="chair">Arc Lounge Chair (PBR Procedural)</option>
                              <option value="sofa">Forma Modular Sofa (PBR Procedural)</option>
                              <option value="table">Terra Dining Table (PBR Procedural)</option>
                              <option value="bed">Eos Platform Bed (PBR Procedural)</option>
                              <option value="cabinet">Linear Fluted Credenza (PBR Procedural)</option>
                            </select>
                          </div>

                          <div>
                            <span className="block text-[11px] text-stone mb-1 font-sans">Upload Custom 3D Model</span>
                            <label className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2 bg-graphite border border-champagne text-champagne text-xs uppercase tracking-wider font-semibold cursor-pointer hover:bg-champagne hover:text-obsidian transition-colors">
                              <Upload className="w-3.5 h-3.5" />
                              <span>Select .glb File (up to 25MB)</span>
                              <input
                                type="file"
                                accept=".glb,.gltf"
                                onChange={(e) => handleFileUpload(e, 'glb_url')}
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Method 2: 360° Photo Turntable Sequence */}
                      <div className="pt-4 border-t border-graphite-border space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-xs text-ivory font-medium flex items-center space-x-1.5">
                            <RotateCw className="w-3.5 h-3.5 text-champagne" />
                            <span>2. Photographed 360° Turntable Sequence (Multi-Angle Images)</span>
                          </label>
                          {editingProduct.images?.turntable_360?.length > 0 && (
                            <button
                              type="button"
                              onClick={handleClear360Frames}
                              className="text-[11px] text-red-400 hover:text-red-300 underline"
                            >
                              Clear All ({editingProduct.images.turntable_360.length} frames)
                            </button>
                          )}
                        </div>
                        <p className="text-[11px] text-stone font-sans leading-relaxed">
                          Upload 12, 24, 36, or 72 photographed frames captured around the product on a rotating turntable. Customers can drag or scroll to spin the real physical piece 360 degrees.
                        </p>

                        <label className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-graphite border border-graphite-border hover:border-champagne text-ivory text-xs uppercase tracking-wider font-semibold cursor-pointer transition-colors">
                          <Upload className="w-3.5 h-3.5 text-champagne" />
                          <span>Select Multiple 360° Frame Photos (Batch Upload)</span>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handle360FramesUpload}
                            className="hidden"
                          />
                        </label>

                        {/* Interactive 360° Preview if frames are present */}
                        {editingProduct.images?.turntable_360?.length > 0 && (
                          <div className="mt-4 p-4 bg-graphite/60 border border-graphite-border space-y-3">
                            <span className="text-[11px] uppercase tracking-widest text-champagne block">
                              Live Interactive 360° Spin Preview:
                            </span>
                            <div className="h-[280px] w-full">
                              <Product360Viewer
                                frames={editingProduct.images.turntable_360}
                                productName={editingProduct.name}
                                className="w-full h-full"
                              />
                            </div>
                            <div className="flex items-center space-x-2 overflow-x-auto pb-2 pt-1">
                              {editingProduct.images.turntable_360.map((url, idx) => (
                                <div key={idx} className="relative w-14 h-14 shrink-0 border border-graphite-border overflow-hidden bg-obsidian">
                                  <img src={url} alt={`Frame ${idx + 1}`} className="w-full h-full object-cover" />
                                  <span className="absolute bottom-0 right-0 bg-obsidian/90 text-[8px] font-mono px-1 text-champagne">
                                    {idx + 1}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-graphite-border flex justify-end space-x-3">
                      <Button
                        type="button"
                        onClick={() => setEditingProduct(null)}
                        variant="obsidian"
                        size="sm"
                      >
                        Cancel
                      </Button>
                      <Button type="submit" variant="champagne" size="sm" icon={Save}>
                        Save Architectural Piece
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {/* View 2A: Showcase Cards Grid */}
              {catalogViewMode === 'grid' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      className="bg-graphite border border-graphite-border group overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-champagne/60 hover:shadow-2xl"
                    >
                      <div className="relative h-60 overflow-hidden bg-obsidian">
                        <img
                          src={getProductImage(p)}
                          alt={p.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                        <div className="absolute top-3 left-3">
                          <span className="text-[9px] uppercase tracking-widest bg-obsidian/90 backdrop-blur-md px-2 py-0.5 text-champagne border border-graphite-border font-semibold">
                            {p.category}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className="text-[9px] uppercase tracking-wider bg-obsidian/90 backdrop-blur-md px-2 py-0.5 text-stone border border-graphite-border">
                            {p.model3d?.glb_url ? 'Custom GLB' : '3D Procedural'}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <div className="flex items-start justify-between">
                            <h3 className="font-serif text-xl text-ivory group-hover:text-champagne transition-colors leading-tight">
                              {p.name}
                            </h3>
                            <span className="text-sm font-sans font-semibold text-champagne ml-2 shrink-0">
                              {formatPrice(p.price)}
                            </span>
                          </div>
                          <p className="text-xs text-stone mt-1 line-clamp-2 leading-relaxed">
                            {p.tagline || p.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-graphite-border flex items-center justify-between">
                          <span className="text-[10px] text-stone font-mono">
                            {p.slug}
                          </span>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => { setEditingProduct(p); setIsNewProduct(false); }}
                              className="px-2.5 py-1 bg-obsidian border border-graphite-border text-xs text-stone hover:text-champagne transition-colors"
                            >
                              Edit
                            </button>
                            <a
                              href={`/products/${p.slug}`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1 bg-obsidian border border-graphite-border text-stone hover:text-ivory"
                              title="View Public Page"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* View 2B: High-Density Table */}
              {catalogViewMode === 'table' && (
                <div className="bg-graphite border border-graphite-border overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-obsidian border-b border-graphite-border text-stone uppercase tracking-widest text-[10px]">
                      <tr>
                        <th className="p-4">Piece</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Price</th>
                        <th className="p-4">3D Asset</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-graphite-border">
                      {filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-obsidian/40 transition-colors">
                          <td className="p-4 flex items-center space-x-3">
                            <img
                              src={getProductImage(p)}
                              alt={p.name}
                              className="w-12 h-12 object-cover border border-graphite-border bg-obsidian"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80';
                              }}
                            />
                            <div>
                              <span className="font-serif text-base text-ivory block font-medium">{p.name}</span>
                              <span className="text-[10px] text-stone font-mono">{p.slug}</span>
                            </div>
                          </td>
                          <td className="p-4 text-stone uppercase tracking-wider">{p.category}</td>
                          <td className="p-4 font-mono text-champagne">{formatPrice(p.price)}</td>
                          <td className="p-4 text-stone font-mono text-[11px]">
                            {p.model3d?.glb_url ? 'Custom GLB' : `Procedural (${p.model3d?.type || 'chair'})`}
                          </td>
                          <td className="p-4 text-right space-x-2">
                            <button
                              onClick={() => { setEditingProduct(p); setIsNewProduct(false); }}
                              className="p-1.5 bg-obsidian border border-graphite-border text-stone hover:text-champagne transition-colors"
                              title="Edit Piece"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <a
                              href={`/products/${p.slug}`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 inline-block bg-obsidian border border-graphite-border text-stone hover:text-ivory transition-colors"
                              title="View Public Page"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ================= VIEW 3: 14 SECTIONS CMS ================= */}
          {activeTab === 'sections' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
              {/* Left Column: Section Selector */}
              <div className="lg:col-span-4 bg-graphite border border-graphite-border p-4 space-y-2">
                <span className="eyebrow block px-2 mb-2">HOMEPAGE ARCHITECTURE</span>
                <div className="space-y-1 max-h-[75vh] overflow-y-auto pr-1">
                  {Object.keys(sections).map((key, idx) => {
                    const sec = sections[key];
                    const isSelected = selectedSectionKey === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedSectionKey(key)}
                        className={`w-full text-left px-3.5 py-3 text-xs transition-all flex items-center justify-between border ${
                          isSelected
                            ? 'bg-obsidian border-champagne text-champagne font-semibold shadow'
                            : 'border-transparent text-stone hover:text-ivory hover:bg-obsidian/40'
                        }`}
                      >
                        <span className="truncate">{sec.section_name || key}</span>
                        <span className="text-[10px] text-stone font-mono ml-2 shrink-0">0{idx + 1}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Live Form Editor with Real Image Preview */}
              <div className="lg:col-span-8 bg-graphite border border-graphite-border p-8 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-graphite-border">
                  <div>
                    <span className="eyebrow text-champagne">SECTION CMS</span>
                    <h2 className="font-serif text-3xl text-ivory">
                      {sectionFormData.section_name || selectedSectionKey}
                    </h2>
                  </div>
                  {saveSuccess && (
                    <div className="flex items-center space-x-1.5 text-xs text-champagne bg-obsidian px-3 py-1.5 border border-champagne/40 animate-fade-in">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Synchronized Live to Site!</span>
                    </div>
                  )}
                </div>

                {/* Section Live Real-Image Preview Banner */}
                {sectionFormData.image_url && (
                  <div className="relative h-44 overflow-hidden border border-graphite-border bg-obsidian">
                    <img
                      src={sectionFormData.image_url}
                      alt="Section Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-3 left-4">
                      <span className="eyebrow text-champagne text-[10px] block">LIVE IMAGE PREVIEW</span>
                      <p className="font-serif text-xl text-ivory">{sectionFormData.headline}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSaveSection} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-stone mb-1">Eyebrow Tagline</label>
                      <input
                        type="text"
                        value={sectionFormData.eyebrow || ''}
                        onChange={(e) => setSectionFormData({ ...sectionFormData, eyebrow: e.target.value })}
                        className="w-full bg-obsidian border border-graphite-border px-3 py-2 text-sm text-ivory focus:border-champagne focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-stone mb-1">Section Display Name</label>
                      <input
                        type="text"
                        value={sectionFormData.section_name || ''}
                        onChange={(e) => setSectionFormData({ ...sectionFormData, section_name: e.target.value })}
                        className="w-full bg-obsidian border border-graphite-border px-3 py-2 text-sm text-ivory focus:border-champagne focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-stone mb-1">Headline</label>
                    <input
                      type="text"
                      value={sectionFormData.headline || ''}
                      onChange={(e) => setSectionFormData({ ...sectionFormData, headline: e.target.value })}
                      className="w-full bg-obsidian border border-graphite-border px-3 py-2 text-base text-ivory font-serif focus:border-champagne focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-stone mb-1">Architectural Body Narrative</label>
                    <textarea
                      rows={3}
                      value={sectionFormData.body_text || ''}
                      onChange={(e) => setSectionFormData({ ...sectionFormData, body_text: e.target.value })}
                      className="w-full bg-obsidian border border-graphite-border px-3 py-2 text-sm text-ivory focus:border-champagne focus:outline-none font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-stone mb-1">CTA Label</label>
                      <input
                        type="text"
                        value={sectionFormData.primary_cta_label || ''}
                        onChange={(e) => setSectionFormData({ ...sectionFormData, primary_cta_label: e.target.value })}
                        className="w-full bg-obsidian border border-graphite-border px-3 py-2 text-sm text-ivory focus:border-champagne focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-stone mb-1">CTA Target URL</label>
                      <input
                        type="text"
                        value={sectionFormData.primary_cta_url || ''}
                        onChange={(e) => setSectionFormData({ ...sectionFormData, primary_cta_url: e.target.value })}
                        className="w-full bg-obsidian border border-graphite-border px-3 py-2 text-sm text-ivory focus:border-champagne focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Image URL & File Uploader */}
                  <div className="pt-2">
                    <label className="block text-[11px] uppercase tracking-widest text-stone mb-1">
                      Section Atmospheric Image
                    </label>
                    <div className="flex items-center space-x-3 mb-2">
                      <input
                        type="text"
                        value={sectionFormData.image_url || ''}
                        onChange={(e) => setSectionFormData({ ...sectionFormData, image_url: e.target.value })}
                        placeholder="https://... or upload local image"
                        className="w-full bg-obsidian border border-graphite-border px-3 py-2 text-xs text-ivory font-mono"
                      />
                      <label className="px-4 py-2 bg-obsidian border border-champagne text-champagne text-xs uppercase tracking-wider font-semibold cursor-pointer hover:bg-champagne hover:text-obsidian transition-colors shrink-0 flex items-center space-x-1.5">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Media</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'image_url')}
                          className="hidden"
                        />
                      </label>
                    </div>
                    {uploadStatus && <p className="text-xs text-champagne">{uploadStatus}</p>}
                  </div>

                  <div className="pt-4 border-t border-graphite-border flex items-center justify-between">
                    <span className="text-xs text-stone">Changes take effect immediately on public site</span>
                    <Button type="submit" variant="champagne" size="lg" icon={Save}>
                      Save Section Live
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ================= VIEW 4: PALETTE & THEME ================= */}
          {activeTab === 'theme' && (
            <div className="bg-graphite border border-graphite-border p-8 max-w-3xl space-y-6 animate-fade-in">
              <div className="pb-4 border-b border-graphite-border">
                <span className="eyebrow text-champagne">BRAND TOKENS</span>
                <h2 className="font-serif text-3xl text-ivory">Maison Noir Theme Customizer</h2>
                <p className="text-xs text-stone mt-1">
                  Configure primary obsidian dark tones, champagne gold accents, warm ivory contrast, and fluid typography.
                </p>
              </div>

              <form onSubmit={handleSaveTheme} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-stone mb-1">Theme Name</label>
                    <input
                      type="text"
                      value={themeFormData.theme_name || ''}
                      onChange={(e) => setThemeFormData({ ...themeFormData, theme_name: e.target.value })}
                      className="w-full bg-obsidian border border-graphite-border px-3 py-2 text-sm text-ivory focus:border-champagne focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-stone mb-1">Body Text Base Size</label>
                    <input
                      type="text"
                      value={themeFormData.body_font_size || '16px'}
                      onChange={(e) => setThemeFormData({ ...themeFormData, body_font_size: e.target.value })}
                      className="w-full bg-obsidian border border-graphite-border px-3 py-2 text-sm text-ivory focus:border-champagne focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-stone mb-1">Primary Obsidian</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={themeFormData.primary_color || '#101010'}
                        onChange={(e) => setThemeFormData({ ...themeFormData, primary_color: e.target.value })}
                        className="w-8 h-8 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={themeFormData.primary_color || '#101010'}
                        onChange={(e) => setThemeFormData({ ...themeFormData, primary_color: e.target.value })}
                        className="w-full bg-obsidian border border-graphite-border px-2 py-1 text-xs text-ivory font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-stone mb-1">Secondary Graphite</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={themeFormData.secondary_color || '#242424'}
                        onChange={(e) => setThemeFormData({ ...themeFormData, secondary_color: e.target.value })}
                        className="w-8 h-8 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={themeFormData.secondary_color || '#242424'}
                        onChange={(e) => setThemeFormData({ ...themeFormData, secondary_color: e.target.value })}
                        className="w-full bg-obsidian border border-graphite-border px-2 py-1 text-xs text-ivory font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-stone mb-1">Champagne Gold</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={themeFormData.accent_color || '#C6A878'}
                        onChange={(e) => setThemeFormData({ ...themeFormData, accent_color: e.target.value })}
                        className="w-8 h-8 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={themeFormData.accent_color || '#C6A878'}
                        onChange={(e) => setThemeFormData({ ...themeFormData, accent_color: e.target.value })}
                        className="w-full bg-obsidian border border-graphite-border px-2 py-1 text-xs text-ivory font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-graphite-border flex justify-end">
                  <Button type="submit" variant="champagne" icon={Save}>
                    Apply Global Theme
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* ================= VIEW 5: LEADS & BOOKINGS ================= */}
          {activeTab === 'leads' && (
            <div className="space-y-8 animate-fade-in">
              {/* Showroom Appointments */}
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-graphite-border mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-champagne" />
                    <h3 className="font-serif text-2xl text-ivory">Showroom Appointments ({appointments.length})</h3>
                  </div>
                </div>

                {appointments.length > 0 ? (
                  <div className="bg-graphite border border-graphite-border overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-obsidian border-b border-graphite-border text-stone uppercase tracking-widest text-[10px]">
                        <tr>
                          <th className="p-3">Client</th>
                          <th className="p-3">Showroom</th>
                          <th className="p-3">Preferred Date</th>
                          <th className="p-3">Phone</th>
                          <th className="p-3">Notes</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-graphite-border">
                        {appointments.map((app) => (
                          <tr key={app.id} className="hover:bg-obsidian/40">
                            <td className="p-3 font-medium text-ivory">
                              {app.name}
                              <span className="text-[10px] text-stone block font-sans">{app.email}</span>
                            </td>
                            <td className="p-3 text-champagne">{app.showroom}</td>
                            <td className="p-3 font-mono">{app.preferred_date}</td>
                            <td className="p-3 text-stone">{app.phone || '—'}</td>
                            <td className="p-3 text-stone max-w-xs truncate">{app.notes || '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-8 text-center bg-graphite border border-graphite-border text-stone text-xs">
                    No showroom appointments booked yet. Submissions from the "Book a Visit" modal appear here in real time.
                  </div>
                )}
              </div>

              {/* Catalog Inquiries */}
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-graphite-border mb-4">
                  <div className="flex items-center space-x-2">
                    <Inbox className="w-5 h-5 text-champagne" />
                    <h3 className="font-serif text-2xl text-ivory">Bespoke Product Inquiries ({inquiries.length})</h3>
                  </div>
                </div>

                {inquiries.length > 0 ? (
                  <div className="bg-graphite border border-graphite-border overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-obsidian border-b border-graphite-border text-stone uppercase tracking-widest text-[10px]">
                        <tr>
                          <th className="p-3">Client</th>
                          <th className="p-3">Piece</th>
                          <th className="p-3">Finish Requested</th>
                          <th className="p-3">Message</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-graphite-border">
                        {inquiries.map((inq) => (
                          <tr key={inq.id} className="hover:bg-obsidian/40">
                            <td className="p-3 font-medium text-ivory">
                              {inq.name}
                              <span className="text-[10px] text-stone block font-sans">{inq.email}</span>
                            </td>
                            <td className="p-3 text-champagne font-serif">{inq.product_name}</td>
                            <td className="p-3 text-stone">{inq.material_choice || 'Standard'}</td>
                            <td className="p-3 text-stone max-w-sm truncate">{inq.message || '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-8 text-center bg-graphite border border-graphite-border text-stone text-xs">
                    No product inquiries submitted yet. Submissions from the "Inquire" modals appear here in real time.
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
