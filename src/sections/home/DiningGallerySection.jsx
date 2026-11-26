import React, { useState, useRef, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { SceneCanvas } from '../../components/three/SceneCanvas';
import { Button } from '../../components/ui/Button';
import { ArrowRight, Box, Eye } from 'lucide-react';
import { animateDiningAsymmetry } from '../../utils/animation';

export function DiningGallerySection() {
  const { getSection } = useCMS();
  const data = getSection('dining_gallery');
  const [tableFinish, setTableFinish] = useState({ name: 'Wire-Brushed French Oak', hex: '#B89B77' });
  const [viewMode, setViewMode] = useState('3d');
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = animateDiningAsymmetry(containerRef);
    return () => ctx?.revert();
  }, []);

  const finishes = [
    { name: 'Wire-Brushed French Oak', hex: '#B89B77' },
    { name: 'Charred Shou Sugi Ban Ash', hex: '#1E1E1E' },
    { name: 'Oiled American Walnut', hex: '#5E3E2B' },
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
            <span className="eyebrow block mb-3 animate-section-eyebrow">{data.eyebrow || "SHARED RITUAL"}</span>
            <h2 className="text-fluid-section font-serif font-light text-ivory mb-4 animate-section-title">
              {data.headline || "Gathering Around Substance."}
            </h2>
            <p className="text-sm md:text-base text-stone font-sans leading-relaxed animate-section-body">
              {data.body_text || "Solid Bourgogne white oak timber resting on twin cylinder monoliths. A dining setting engineered for memorable hours of human connection."}
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
              <span>3D Table Stage</span>
            </button>
            <button
              onClick={() => setViewMode('photo')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs transition-all ${
                viewMode === 'photo' ? 'bg-champagne text-obsidian font-semibold' : 'text-stone hover:text-ivory'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Dining Shoot</span>
            </button>
          </div>
        </div>

        {/* 2-Column Dining Ensemble Showcase (Asymmetric Split) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Card 1: Terra Table (3D Interactive Stage / Photo) */}
          <div className="lg:col-span-7 bg-graphite/30 border border-graphite-border p-6 md:p-8 flex flex-col justify-between animate-dining-left">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="eyebrow">MONOLITHIC STATEMENT</span>
                <span className="text-sm font-serif text-champagne">$6,200</span>
              </div>
              <h3 className="font-serif text-3xl text-ivory mb-2">Terra Solid Oak Dining Table</h3>
              <p className="text-xs text-stone font-sans mb-6">
                Ten-seat expanse crafted from sustainably forested 60mm solid white oak, chamfered edge profiling, and internal brass torsion stabilizers.
              </p>
            </div>

            {viewMode === '3d' ? (
              <div className="h-[360px] md:h-[420px] w-full relative">
                <SceneCanvas
                  type="table"
                  materialColor={tableFinish.hex}
                  autoRotate={false}
                  enableZoom={false}
                  enableOrbit={true}
                  cameraPosition={[0, 1.2, 4.4]}
                  fallbackImage={data.image_url}
                />
              </div>
            ) : (
              <div className="relative h-[360px] md:h-[420px] w-full overflow-hidden border border-graphite-border">
                <img
                  src={data.image_url || "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=85"}
                  alt="Terra Dining Table Studio Photography"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Finish Selector */}
            <div className="pt-6 border-t border-graphite-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs text-stone">Selected Finish: <strong className="text-ivory">{tableFinish.name}</strong></span>
              <div className="flex items-center space-x-2">
                {finishes.map((f) => (
                  <button
                    key={f.hex}
                    onClick={() => setTableFinish(f)}
                    className={`px-3 py-1 text-xs border transition-all ${
                      tableFinish.hex === f.hex
                        ? 'bg-champagne text-obsidian border-champagne font-semibold'
                        : 'bg-obsidian text-stone border-graphite-border hover:border-stone'
                    }`}
                  >
                    {f.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Companion Cantilever Chair & Dimension Story */}
          <div className="lg:col-span-5 bg-obsidian-950 border border-graphite-border p-6 md:p-8 flex flex-col justify-between animate-dining-right">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="eyebrow">SEATING PARTNER</span>
                <span className="text-sm font-serif text-champagne">$1,850</span>
              </div>
              <h3 className="font-serif text-3xl text-ivory mb-2">Aura Cantilever Dining Chair</h3>
              <p className="text-xs text-stone font-sans mb-6">
                Floating tubular bronze frame carrying hand-stitched Tuscan saddle leather. Subtle flex responds to the diner's posture.
              </p>
            </div>

            <div className="relative h-[280px] md:h-[320px] overflow-hidden border border-graphite-border my-4">
              <img
                src="https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=85"
                alt="Aura Cantilever Chair in Saddle Leather"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 glass-obsidian px-3 py-1 text-[11px] text-ivory/80">
                Tuscan Tan Saddle Leather
              </div>
            </div>

            <div className="pt-4 border-t border-graphite-border flex items-center justify-between">
              <div className="text-xs text-stone">
                Dimensions: <span className="text-ivory font-mono">54W × 58D × 82H cm</span>
              </div>
              <Button to="/products/terra-dining-table" variant="champagne" size="sm" icon={ArrowRight}>
                Inquire Ensemble
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
