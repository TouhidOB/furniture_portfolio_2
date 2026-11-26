import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { formatPrice, getRelatedProducts, getProductImage } from '../utils/product';
import { SceneCanvas } from '../components/three/SceneCanvas';
import { Button } from '../components/ui/Button';
import { InquiryModal } from '../components/ui/InquiryModal';
import { Product360Viewer } from '../components/ui/Product360Viewer';
import {
  ArrowLeft,
  ArrowRight,
  Printer,
  Check,
  Box,
  Eye,
  Shield,
  Truck,
  RotateCw
} from 'lucide-react';

export function ProductPage() {
  const { slug } = useParams();
  const product = PRODUCTS.find((p) => p.slug === slug);

  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [activeTab, setActiveTab] = useState('3d'); // '3d' | 'gallery'
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [inquiryOpen, setInquiryOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product && product.materials && product.materials.length > 0) {
      setSelectedMaterial(product.materials[0]);
    }
    if (product?.images?.turntable_360?.length > 0) {
      setActiveTab('360');
    }
  }, [slug, product]);

  if (!product) {
    return (
      <main className="min-h-screen bg-obsidian text-ivory flex items-center justify-center pt-32 pb-24">
        <div className="text-center">
          <h2 className="font-serif text-3xl mb-4">Piece Not Found</h2>
          <Button to="/collections" variant="champagne" icon={ArrowLeft}>
            Return to Catalogue
          </Button>
        </div>
      </main>
    );
  }

  const related = getRelatedProducts(product.slug, 3);
  const primaryImg = getProductImage(product);
  const allImages = [primaryImg, ...(product.images?.gallery || [])];

  const handlePrintSpecSheet = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-obsidian text-ivory pt-28 pb-24 border-b border-graphite-border">
      {/* Back to Catalog Link */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-6">
        <Link
          to={`/collections?category=${product.category}`}
          className="inline-flex items-center space-x-2 text-xs text-stone hover:text-champagne uppercase tracking-widest transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to {product.category} Collection</span>
        </Link>
      </div>

      {/* Main Product Presentation (Split 3D Canvas / Gallery & Details) */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
        {/* Left Column: 3D Stage / Editorial Gallery */}
        <div className="lg:col-span-7 bg-graphite/40 border border-graphite-border p-6 md:p-10 relative">
          {/* Mode Switcher */}
          <div className="flex items-center justify-between pb-4 border-b border-graphite-border mb-6">
            <span className="eyebrow text-champagne">INTERACTIVE STAGE</span>
            <div className="flex items-center space-x-2 bg-obsidian p-1 border border-graphite-border">
              <button
                onClick={() => setActiveTab('3d')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs transition-all ${
                  activeTab === '3d'
                    ? 'bg-champagne text-obsidian font-semibold'
                    : 'text-stone hover:text-ivory'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>3D View</span>
              </button>
              {product.images?.turntable_360?.length > 0 && (
                <button
                  onClick={() => setActiveTab('360')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs transition-all ${
                    activeTab === '360'
                      ? 'bg-champagne text-obsidian font-semibold'
                      : 'text-stone hover:text-ivory'
                  }`}
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>360° Photo Spin</span>
                </button>
              )}
              <button
                onClick={() => setActiveTab('gallery')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs transition-all ${
                  activeTab === 'gallery'
                    ? 'bg-champagne text-obsidian font-semibold'
                    : 'text-stone hover:text-ivory'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Photo Gallery</span>
              </button>
            </div>
          </div>

          {/* Active Viewer */}
          {activeTab === '3d' ? (
            <div className="h-[460px] md:h-[560px] w-full relative">
              <SceneCanvas
                type={product.model3d?.type || 'chair'}
                glbUrl={product.model3d?.glb_url}
                materialColor={selectedMaterial?.colorHex || '#1C1B1A'}
                roughness={selectedMaterial?.roughness || 0.7}
                metalness={selectedMaterial?.metalness || 0.05}
                cameraPosition={product.model3d?.cameraPosition || [0, 0.8, 3.8]}
                autoRotate={false}
                fallbackImage={product.images.primary}
              />
              <div className="absolute bottom-4 right-4 flex items-center space-x-2 text-[11px] text-stone glass-obsidian px-3 py-1.5">
                <RotateCw className="w-3.5 h-3.5 text-champagne animate-spin-slow" />
                <span>360° Orbit • Drag to Rotate</span>
              </div>
            </div>
          ) : activeTab === '360' ? (
            <div className="h-[460px] md:h-[560px] w-full relative">
              <Product360Viewer
                frames={product.images?.turntable_360 || []}
                productName={product.name}
                className="w-full h-full"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="h-[440px] md:h-[520px] w-full overflow-hidden border border-graphite-border">
                <img
                  src={allImages[activeGalleryIndex]}
                  alt={`${product.name} View ${activeGalleryIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveGalleryIndex(idx)}
                    className={`w-20 h-20 shrink-0 border-2 overflow-hidden transition-all ${
                      activeGalleryIndex === idx
                        ? 'border-champagne scale-105'
                        : 'border-graphite-border opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Piece Details, Customizer & Inquire */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="eyebrow text-champagne">{product.category}</span>
              <span className="text-stone">•</span>
              <span className="text-[11px] uppercase tracking-widest text-stone">{product.collection.replace('-', ' ')}</span>
            </div>
            <h1 className="text-fluid-product font-serif font-light text-ivory mb-3 leading-tight">
              {product.name}
            </h1>
            <p className="text-2xl font-serif text-ivory font-medium">
              {formatPrice(product.price)} <span className="text-xs text-stone font-sans font-normal uppercase">USD</span>
            </p>
          </div>

          <p className="text-sm text-stone leading-relaxed font-sans">
            {product.editorialDescription || product.description}
          </p>

          {/* Material Swatches */}
          {product.materials && product.materials.length > 0 && (
            <div className="pt-2 border-t border-graphite-border">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-widest text-stone">Selected Finish</span>
                <span className="text-xs text-champagne font-medium">{selectedMaterial?.name}</span>
              </div>
              <div className="flex items-center space-x-3">
                {product.materials.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMaterial(m)}
                    className={`p-1 rounded-full border-2 transition-all ${
                      selectedMaterial?.id === m.id
                        ? 'border-champagne scale-110 shadow-lg'
                        : 'border-graphite-border hover:border-stone'
                    }`}
                  >
                    <span
                      className="block w-7 h-7 rounded-full shadow-inner"
                      style={{ backgroundColor: m.colorHex }}
                      title={m.name}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Dimensions Overview */}
          <div className="bg-graphite border border-graphite-border p-5 space-y-3">
            <span className="text-[11px] uppercase tracking-widest text-stone block">Architectural Dimensions</span>
            <div className="grid grid-cols-3 gap-4 text-xs font-sans">
              <div>
                <span className="text-stone block">Width</span>
                <span className="text-ivory font-semibold">{product.dimensions.width}</span>
              </div>
              <div>
                <span className="text-stone block">Depth</span>
                <span className="text-ivory font-semibold">{product.dimensions.depth}</span>
              </div>
              <div>
                <span className="text-stone block">Height</span>
                <span className="text-ivory font-semibold">{product.dimensions.height}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            <Button
              onClick={() => setInquiryOpen(true)}
              variant="champagne"
              size="lg"
              className="w-full"
              icon={ArrowRight}
            >
              Acquire Piece / Request Trade Spec
            </Button>

            <button
              onClick={handlePrintSpecSheet}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-graphite border border-graphite-border text-xs text-stone hover:text-champagne uppercase tracking-wider transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Architectural Spec Sheet (PDF)</span>
            </button>
          </div>

          {/* Atelier Guarantees */}
          <div className="pt-4 border-t border-graphite-border grid grid-cols-2 gap-4 text-[11px] text-stone">
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4 text-champagne shrink-0" />
              <span>Lead Time: {product.leadTime || '6–8 weeks'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-champagne shrink-0" />
              <span>10-Year Structural Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Specifications & Craftsmanship Section */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 border-t border-graphite-border pt-16 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-4">
            <span className="eyebrow block">ARCHITECTURAL RIGOR</span>
            <h2 className="font-serif text-3xl md:text-4xl text-ivory">Crafted Without Compromise</h2>
            <p className="text-xs text-stone leading-relaxed font-sans">
              Every joint, stitch, and finish is subjected to rigorous mechanical and acoustic testing before receiving the Maison Noir engraved maker's stamp.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-champagne font-semibold mb-3">Signature Features</h3>
              <ul className="space-y-2">
                {product.features?.map((f, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs text-stone">
                    <Check className="w-3.5 h-3.5 text-champagne shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-graphite-border">
              <h3 className="text-xs uppercase tracking-widest text-champagne font-semibold mb-3">Atelier Specifications</h3>
              <div className="grid grid-cols-2 gap-4 text-xs">
                {Object.entries(product.specifications || {}).map(([key, val]) => (
                  <div key={key}>
                    <span className="text-[10px] uppercase tracking-widest text-stone block capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <span className="text-ivory font-medium">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Pieces */}
      {related.length > 0 && (
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 border-t border-graphite-border pt-16">
          <div className="flex items-center justify-between mb-8">
            <span className="eyebrow block">COMPLEMENTARY ARCHITECTURE</span>
            <Link to="/collections" className="text-xs text-champagne hover:underline uppercase tracking-wider">
              View All Pieces →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((rel) => (
              <Link
                key={rel.id}
                to={`/products/${rel.slug}`}
                className="group bg-graphite border border-graphite-border p-4 transition-all hover:border-champagne/60"
              >
                <div className="h-56 overflow-hidden mb-4 bg-obsidian">
                  <img
                    src={getProductImage(rel)}
                    alt={rel.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h4 className="font-serif text-xl text-ivory group-hover:text-champagne transition-colors">{rel.name}</h4>
                <p className="text-xs text-stone mt-1">{formatPrice(rel.price)}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        product={{
          ...product,
          material_choice: selectedMaterial?.name
        }}
      />
    </main>
  );
}
