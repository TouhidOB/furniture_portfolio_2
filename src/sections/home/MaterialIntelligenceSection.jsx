import React, { useState, useRef, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { MATERIALS } from '../../data/articles';
import { Button } from '../../components/ui/Button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { animateMaterialFlip } from '../../utils/animation';

export function MaterialIntelligenceSection() {
  const { getSection } = useCMS();
  const data = getSection('material_intelligence');
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIALS[0]);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = animateMaterialFlip(containerRef);
    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-28 md:py-36 bg-obsidian-950 text-ivory border-b border-graphite-border overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Section Header with Staggered Entrance */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 animate-section-header">
          <div className="max-w-2xl">
            <span className="eyebrow block mb-3 animate-section-eyebrow">{data.eyebrow || "TACTILE RIGOR"}</span>
            <h2 className="text-fluid-section font-serif font-light text-ivory mb-4 animate-section-title">
              {data.headline || "Honesty in Every Grain."}
            </h2>
            <p className="text-sm md:text-base text-stone font-sans leading-relaxed animate-section-body">
              {data.body_text || "We reject faux surfaces and synthetic veneers. Explore the noble raw materials that age gracefully alongside their custodians."}
            </p>
          </div>
          <Button to="/materials" variant="champagne" size="sm" icon={ArrowRight} className="mt-6 md:mt-0">
            Explore All 14 Noble Materials
          </Button>
        </div>

        {/* 6 Tactile Material Swatches Grid (3D Flip Animation) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {MATERIALS.map((mat) => {
            const isSelected = selectedMaterial.id === mat.id;
            return (
              <button
                key={mat.id}
                onClick={() => setSelectedMaterial(mat)}
                className={`group relative p-4 border text-left transition-all overflow-hidden animate-material-swatch ${
                  isSelected
                    ? 'border-champagne bg-graphite shadow-xl scale-[1.03]'
                    : 'border-graphite-border bg-obsidian hover:border-stone/50'
                }`}
              >
                {/* Visual Swatch Texture Thumbnail */}
                <div className="h-28 w-full overflow-hidden mb-3 border border-graphite-border">
                  <img
                    src={mat.image}
                    alt={mat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <span className="text-[10px] tracking-widest uppercase text-champagne block mb-1">
                  {mat.category}
                </span>
                <h4 className="font-serif text-sm text-ivory leading-tight">{mat.name}</h4>
              </button>
            );
          })}
        </div>

        {/* Selected Material Deep Dive Panel (Smooth Elevation) */}
        <div className="bg-graphite/40 border border-graphite-border p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-material-preview">
          <div className="lg:col-span-5 h-[320px] md:h-[400px] overflow-hidden border border-graphite-border relative">
            <img
              src={selectedMaterial.image}
              alt={selectedMaterial.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 glass-obsidian px-3 py-1.5 text-xs text-champagne font-mono">
              Provenance: {selectedMaterial.origin}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="eyebrow block mb-2">{selectedMaterial.category} • SUSTAINABLE HARVEST</span>
              <h3 className="font-serif text-3xl md:text-4xl text-ivory">{selectedMaterial.name}</h3>
              <p className="text-sm md:text-base text-stone mt-3 font-sans leading-relaxed">
                {selectedMaterial.description}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-4 border-y border-graphite-border text-xs">
              <div>
                <span className="text-stone block mb-1 uppercase tracking-wider text-[10px]">Finish Texture</span>
                <span className="text-ivory font-medium">{selectedMaterial.finish}</span>
              </div>
              <div>
                <span className="text-stone block mb-1 uppercase tracking-wider text-[10px]">Patina Evolution</span>
                <span className="text-champagne font-medium">{selectedMaterial.patina}</span>
              </div>
              <div>
                <span className="text-stone block mb-1 uppercase tracking-wider text-[10px]">Tactility Index</span>
                <span className="text-ivory font-mono">9.8 / 10 Silk Friction</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 pt-2">
              <Button to="/materials" variant="champagne" size="sm" icon={ArrowRight}>
                Request Tactile Sample Box
              </Button>
              <span className="text-xs text-stone font-sans">Complimentary for verified architects.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
