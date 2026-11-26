import React, { useState, useRef, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { SceneCanvas } from '../../components/three/SceneCanvas';
import { Button } from '../../components/ui/Button';
import { ArrowRight, Box, Eye } from 'lucide-react';
import { animateSanctuaryDissolve } from '../../utils/animation';

export function PrivateSanctuarySection() {
  const { getSection } = useCMS();
  const data = getSection('private_sanctuary');
  const [bedFinish, setBedFinish] = useState({ name: 'Charred Shou Sugi Ban Ash', hex: '#1D1C1B' });
  const [viewMode, setViewMode] = useState('3d');
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = animateSanctuaryDissolve(containerRef);
    return () => ctx?.revert();
  }, []);

  const bedFinishes = [
    { name: 'Charred Shou Sugi Ban Ash', hex: '#1D1C1B' },
    { name: 'Natural Oiled White Oak', hex: '#A88E6D' },
    { name: 'Smoked American Walnut', hex: '#4B3322' },
  ];

  return (
    <section
      ref={containerRef}
      className="relative py-28 md:py-36 bg-obsidian text-ivory border-b border-graphite-border overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Section Header with Staggered Entrance */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 animate-section-header">
          <div className="max-w-2xl">
            <span className="eyebrow block mb-3 animate-section-eyebrow">{data.eyebrow || "INTIMATE RESTORATION"}</span>
            <h2 className="text-fluid-section font-serif font-light text-ivory mb-4 animate-section-title">
              {data.headline || "Rest, Reimagined."}
            </h2>
            <p className="text-sm md:text-base text-stone font-sans leading-relaxed animate-section-body">
              {data.body_text || "The bedroom as a contemplative void. Low-slung platform architecture crafted to quiet the mind and invite deep sensory recovery."}
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center space-x-2 bg-graphite/80 backdrop-blur-md p-1 border border-graphite-border">
            <button
              onClick={() => setViewMode('3d')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs transition-all ${
                viewMode === '3d' ? 'bg-champagne text-obsidian font-semibold' : 'text-stone hover:text-ivory'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>3D Platform View</span>
            </button>
            <button
              onClick={() => setViewMode('photo')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs transition-all ${
                viewMode === 'photo' ? 'bg-champagne text-obsidian font-semibold' : 'text-stone hover:text-ivory'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Sanctuary Shoot</span>
            </button>
          </div>
        </div>

        {/* 3D Model Stage / Editorial Bedroom Photo (Moonlit Dissolve) */}
        <div className="bg-graphite/30 border border-graphite-border p-6 md:p-12 mb-12 animate-sanctuary-stage">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* 3D Canvas / Photo */}
            <div className="lg:col-span-8 h-[380px] md:h-[480px] w-full relative">
              {viewMode === '3d' ? (
                <SceneCanvas
                  type="bed"
                  materialColor={bedFinish.hex}
                  autoRotate={false}
                  enableZoom={false}
                  enableOrbit={true}
                  cameraPosition={[0, 1.4, 4.4]}
                  fallbackImage={data.image_url}
                />
              ) : (
                <div className="relative h-full w-full overflow-hidden border border-graphite-border">
                  <img
                    src={data.image_url || "https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=1600&q=85"}
                    alt="Eos Platform Bed Sanctuary Shoot"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Platform Specifications & Controls */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <span className="eyebrow block mb-2">FEATURING PIECE</span>
                <h3 className="font-serif text-3xl text-ivory">Eos Platform Bed</h3>
                <p className="text-xs text-stone mt-2 font-sans leading-relaxed">
                  Low plinth elevation creates an unbroken shadowline, giving the impression that the solid timber platform floats 10cm above the floor plane.
                </p>
              </div>

              {/* Timber Finish Switches */}
              <div className="pt-2">
                <span className="text-[10px] uppercase tracking-widest text-stone block mb-2">Platform Timber</span>
                <div className="space-y-2">
                  {bedFinishes.map((f) => (
                    <button
                      key={f.hex}
                      onClick={() => setBedFinish(f)}
                      className={`w-full p-2.5 text-xs text-left border flex items-center justify-between transition-all ${
                        bedFinish.hex === f.hex
                          ? 'border-champagne bg-obsidian text-ivory'
                          : 'border-graphite-border bg-graphite/40 text-stone hover:text-ivory'
                      }`}
                    >
                      <span>{f.name}</span>
                      <span className="w-3.5 h-3.5 rounded-full border border-stone/50" style={{ backgroundColor: f.hex }} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Button to="/products/eos-platform-bed" variant="champagne" size="sm" icon={ArrowRight}>
                  Explore Eos Series
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Poetic Quote Banner (Fades in with letter spacing expansion) */}
        <div className="border-t border-graphite-border pt-10 text-center max-w-3xl mx-auto space-y-4 animate-sanctuary-quote">
          <blockquote className="font-serif italic text-2xl md:text-3xl text-ivory/90 leading-relaxed font-light">
            “Stillness begins where unnecessary mass ends. A bed is not merely furniture; it is the physical architecture of human renewal.”
          </blockquote>
          <span className="text-xs text-stone tracking-widest uppercase block font-sans">
            Maison Noir Architectural Studio • Kyoto Atelier
          </span>
        </div>
      </div>
    </section>
  );
}
