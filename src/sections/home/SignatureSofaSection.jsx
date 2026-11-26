import React, { useState, useRef, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { SceneCanvas } from '../../components/three/SceneCanvas';
import { Button } from '../../components/ui/Button';
import { Layers, CheckCircle2, ArrowRight, Box, Eye } from 'lucide-react';
import { animateSofaAnatomy } from '../../utils/animation';

export function SignatureSofaSection() {
  const { getSection } = useCMS();
  const data = getSection('signature_sofa');
  const [activeStage, setActiveStage] = useState(0);
  const [viewMode, setViewMode] = useState('3d'); // '3d' | 'photo'
  const [sofaFinish, setSofaFinish] = useState({ name: 'Warm Ivory Bouclé', hex: '#EDE8DD', roughness: 0.92 });

  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = animateSofaAnatomy(containerRef);
    return () => ctx?.revert();
  }, []);

  const finishes = [
    { name: 'Warm Ivory Bouclé', hex: '#EDE8DD', roughness: 0.92 },
    { name: 'Charcoal Raw Linen', hex: '#222224', roughness: 0.88 },
    { name: 'Oiled Saddle Leather', hex: '#543826', roughness: 0.68 },
  ];

  const stages = [
    {
      num: "01",
      title: "Monolithic Geometry",
      subtitle: "Subterranean Presence",
      desc: "Low-slung rectilinear massing anchored by an invisible smoked oak shadowline base, allowing the sofa to float effortlessly."
    },
    {
      num: "02",
      title: "Modular Freedom",
      subtitle: "Over 16 Architectural Configurations",
      desc: "Concealed heavy-gauge steel locking brackets allow modules to be rearranged from intimate reading chaises to expansive party salons."
    },
    {
      num: "03",
      title: "Tactile Flemish Bouclé",
      subtitle: "800g/m² Heavyweight Upholstery",
      desc: "Woven in Flanders using natural wool and linen fibers, creating a rich micro-pebbled surface that catches ambient light."
    },
    {
      num: "04",
      title: "Feather-Channel Suspension",
      subtitle: "High-Resilience Latex & Down",
      desc: "Multi-layered orthopedic foam cores encased in channel-quilted duck-down toppers for deep, sink-in restorative ergonomics."
    }
  ];

  return (
    <section
      ref={containerRef}
      className="relative py-28 md:py-36 bg-obsidian-900 text-ivory border-b border-graphite-border overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Section Header with Staggered Entrance */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 animate-section-header">
          <div className="max-w-2xl">
            <span className="eyebrow block mb-3 animate-section-eyebrow">
              {data.eyebrow || "SCULPTURAL ANCHOR"}
            </span>
            <h2 className="text-fluid-section font-serif font-light text-ivory mb-4 animate-section-title">
              {data.headline || "Forma Modular Sofa."}
            </h2>
            <p className="text-sm md:text-base text-stone font-sans leading-relaxed animate-section-body">
              {data.body_text || "Engineered with interlocking modules, a recessed smoked oak plinth, and dual-density down channeling. Built to anchor the conversation in landmark homes."}
            </p>
          </div>

          {/* 3D vs Photo Shoot Switcher */}
          <div className="mt-6 md:mt-0 flex items-center space-x-2 bg-graphite/80 backdrop-blur-md p-1 border border-graphite-border">
            <button
              onClick={() => setViewMode('3d')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs transition-all ${
                viewMode === '3d'
                  ? 'bg-champagne text-obsidian font-semibold'
                  : 'text-stone hover:text-ivory'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>3D Turntable</span>
            </button>
            <button
              onClick={() => setViewMode('photo')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs transition-all ${
                viewMode === 'photo'
                  ? 'bg-champagne text-obsidian font-semibold'
                  : 'text-stone hover:text-ivory'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Studio Photo Shoot</span>
            </button>
          </div>
        </div>

        {/* 3D Model Stage & Storytelling Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Interactive 3D Sofa Stage / Photo Shoot */}
          <div className="lg:col-span-7 bg-graphite/40 border border-graphite-border p-6 md:p-10 relative animate-sofa-stage">
            {viewMode === '3d' ? (
              <div className="h-[420px] md:h-[500px] w-full">
                <SceneCanvas
                  type="sofa"
                  materialColor={sofaFinish.hex}
                  roughness={sofaFinish.roughness}
                  autoRotate={false}
                  enableZoom={false}
                  enableOrbit={true}
                  cameraPosition={[0, 0.9, 4.2]}
                  fallbackImage={data.image_url}
                />
              </div>
            ) : (
              <div className="relative h-[420px] md:h-[500px] w-full overflow-hidden border border-graphite-border">
                <img
                  src={data.image_url || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=85"}
                  alt="Forma Modular Sofa Studio Shoot"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <span className="eyebrow block">ARCHITECTURAL RESIDENCE</span>
                    <h3 className="font-serif text-2xl text-ivory">Forma Sofa in Natural Bouclé</h3>
                  </div>
                </div>
              </div>
            )}

            {/* Material Switcher Pill */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-graphite-border">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-stone block">Active Upholstery</span>
                <span className="text-xs text-champagne font-medium">{sofaFinish.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                {finishes.map((f) => (
                  <button
                    key={f.hex}
                    onClick={() => setSofaFinish(f)}
                    className={`px-3 py-1.5 text-xs transition-all border ${
                      sofaFinish.hex === f.hex
                        ? 'bg-champagne text-obsidian border-champagne font-semibold'
                        : 'bg-obsidian text-stone border-graphite-border hover:text-ivory'
                    }`}
                  >
                    {f.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: 4-Stage Anatomy Cascade */}
          <div className="lg:col-span-5 space-y-4 animate-anatomy-wrap">
            <span className="eyebrow block mb-2">ANATOMY OF A MASTERPIECE</span>
            {stages.map((stage, idx) => {
              const isSelected = activeStage === idx;
              return (
                <div
                  key={stage.num}
                  onClick={() => setActiveStage(idx)}
                  className={`p-5 border transition-all cursor-pointer animate-anatomy-card ${
                    isSelected
                      ? 'border-champagne bg-graphite/60 shadow-lg'
                      : 'border-graphite-border hover:border-stone/40 bg-obsidian-950/60'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="font-serif text-sm text-champagne">{stage.num}</span>
                    <span className="text-[10px] tracking-widest uppercase text-stone">{stage.subtitle}</span>
                  </div>
                  <h4 className="font-serif text-xl text-ivory mt-1 mb-2">{stage.title}</h4>
                  <p className="text-xs text-stone leading-relaxed font-sans">{stage.desc}</p>
                </div>
              );
            })}

            <div className="pt-4">
              <Button to="/products/forma-modular-sofa" variant="champagne" size="md" icon={ArrowRight}>
                View Forma Specifications
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
