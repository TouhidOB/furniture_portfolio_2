import React, { useState, useRef, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { SceneCanvas } from '../../components/three/SceneCanvas';
import { Button } from '../../components/ui/Button';
import { InquiryModal } from '../../components/ui/InquiryModal';
import { getProductBySlug, formatPrice } from '../../utils/product';
import { Sliders, Check, ArrowRight } from 'lucide-react';
import { animateAtelierAperture } from '../../utils/animation';

export function MaterialAtelierSection() {
  const { getSection } = useCMS();
  const data = getSection('material_atelier');
  const baseProduct = getProductBySlug('arc-lounge-chair');
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = animateAtelierAperture(containerRef);
    return () => ctx?.revert();
  }, []);

  const [selectedLeather, setSelectedLeather] = useState({
    id: 'raven',
    name: 'Raven Semi-Aniline Leather',
    hex: '#1C1B1A',
    roughness: 0.70,
    metalness: 0.05,
    priceDelta: 0
  });

  const [selectedBase, setSelectedBase] = useState('matte-black');
  const [inquiryOpen, setInquiryOpen] = useState(false);

  const leatherOptions = [
    { id: 'raven', name: 'Raven Semi-Aniline Leather', hex: '#1C1B1A', roughness: 0.70, metalness: 0.05, priceDelta: 0, origin: 'Tuscany, Italy' },
    { id: 'cognac', name: 'Vintage Cognac Hide', hex: '#683E26', roughness: 0.65, metalness: 0.05, priceDelta: 150, origin: 'Veneto, Italy' },
    { id: 'boucle', name: 'Warm Ivory Bouclé', hex: '#EDE7DC', roughness: 0.95, metalness: 0.0, priceDelta: -100, origin: 'Flanders, Belgium' },
  ];

  const currentPrice = (baseProduct?.price || 3850) + selectedLeather.priceDelta;

  return (
    <section
      ref={containerRef}
      className="relative py-28 md:py-36 bg-obsidian-950 text-ivory border-b border-graphite-border overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Section Header with Staggered Entrance */}
        <div className="max-w-2xl mb-12 animate-section-header">
          <span className="eyebrow block mb-3 animate-section-eyebrow">{data.eyebrow || "CUSTOM ATELIER"}</span>
          <h2 className="text-fluid-section font-serif font-light text-ivory mb-4 animate-section-title">
            {data.headline || "Configure in Real Time."}
          </h2>
          <p className="text-sm md:text-base text-stone font-sans leading-relaxed animate-section-body">
            {data.body_text || "Select bespoke finishes, examine live 3D surface reflections, and visualize custom upholstery choices in photorealistic detail."}
          </p>
        </div>

        {/* 3D Configurator Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left: 3D Stage (Aperture Expand) */}
          <div className="lg:col-span-8 bg-graphite/40 border border-graphite-border p-8 md:p-12 relative flex flex-col justify-between animate-atelier-stage">
            <div className="flex items-center justify-between pb-4 border-b border-graphite-border">
              <div>
                <span className="eyebrow text-champagne">PIECE IN FOCUS</span>
                <h3 className="font-serif text-2xl text-ivory">Arc Lounge Chair</h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-widest text-stone block">Configured Price</span>
                <span className="text-xl font-serif text-champagne font-semibold">{formatPrice(currentPrice)}</span>
              </div>
            </div>

            <div className="h-[420px] md:h-[500px] w-full my-4">
              <SceneCanvas
                type="chair"
                materialColor={selectedLeather.hex}
                roughness={selectedLeather.roughness}
                metalness={selectedLeather.metalness}
                cameraPosition={[0, 0.6, 3.2]}
                autoRotate={false}
                enableZoom={false}
                enableOrbit={true}
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-graphite-border text-xs text-stone">
              <span>Interactive PBR Shader Engine</span>
              <span>Made to Order in Kyoto • 6–8 Weeks</span>
            </div>
          </div>

          {/* Right: Customization Controls (Slide in) */}
          <div className="lg:col-span-4 bg-graphite border border-graphite-border p-8 flex flex-col justify-between space-y-6 animate-atelier-panel">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-champagne text-xs uppercase tracking-widest">
                <Sliders className="w-4 h-4" />
                <span>Customization Panel</span>
              </div>

              {/* Upholstery Selection */}
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-stone mb-3">
                  Selected Upholstery
                </label>
                <div className="space-y-2.5">
                  {leatherOptions.map((opt) => {
                    const isSelected = selectedLeather.id === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setSelectedLeather(opt)}
                        className={`w-full p-3 border text-left flex items-center justify-between transition-all ${
                          isSelected
                            ? 'border-champagne bg-obsidian text-ivory shadow-md'
                            : 'border-graphite-border bg-graphite-input text-stone hover:text-ivory'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span
                            className="w-5 h-5 rounded-full border border-stone/40"
                            style={{ backgroundColor: opt.hex }}
                          />
                          <div>
                            <span className="text-xs font-medium block">{opt.name}</span>
                            <span className="text-[10px] text-stone">{opt.origin}</span>
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-champagne" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Base Swivel Finish */}
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-stone mb-3">
                  4-Star Swivel Base
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedBase('matte-black')}
                    className={`p-3 border text-left text-xs transition-all ${
                      selectedBase === 'matte-black'
                        ? 'border-champagne bg-obsidian text-ivory'
                        : 'border-graphite-border bg-graphite-input text-stone hover:text-ivory'
                    }`}
                  >
                    <span className="block font-medium">Matte Obsidian</span>
                    <span className="text-[10px] text-stone">Powder-coated</span>
                  </button>
                  <button
                    onClick={() => setSelectedBase('champagne-brass')}
                    className={`p-3 border text-left text-xs transition-all ${
                      selectedBase === 'champagne-brass'
                        ? 'border-champagne bg-obsidian text-ivory'
                        : 'border-graphite-border bg-graphite-input text-stone hover:text-ivory'
                    }`}
                  >
                    <span className="block font-medium">Forged Brass</span>
                    <span className="text-[10px] text-stone">Hand-brushed</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-graphite-border space-y-3">
              <Button
                variant="champagne"
                size="lg"
                className="w-full"
                icon={ArrowRight}
                onClick={() => setInquiryOpen(true)}
              >
                Inquire Configured Piece
              </Button>
              <p className="text-[11px] text-center text-stone">
                Includes complimentary white-glove architectural delivery.
              </p>
            </div>
          </div>
        </div>
      </div>

      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        productName={`${baseProduct?.name || 'Arc Lounge Chair'} (${selectedLeather.name})`}
      />
    </section>
  );
}
