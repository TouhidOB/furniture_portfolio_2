import React, { useState, useRef, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { SceneCanvas } from '../../components/three/SceneCanvas';
import { Product360Viewer } from '../../components/ui/Product360Viewer';
import { Button } from '../../components/ui/Button';
import { Eye, Box, ArrowRight, RotateCw, ChevronDown, Sparkles } from 'lucide-react';
import { animateDarkReveal } from '../../utils/animation';

// Default High-Fidelity 360° Photographed Turntable Frames (Option B)
const DEFAULT_ARC_360_FRAMES = [
  "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1400&q=85", // 0° Front
  "https://images.unsplash.com/photo-1580481077195-c3c2f06b12a2?auto=format&fit=crop&w=1400&q=85", // 30°
  "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1400&q=85", // 60°
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1400&q=85", // 90° Profile
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1400&q=85", // 120°
  "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1400&q=85", // 150°
  "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1400&q=85", // 180° Back Shell
  "https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=1400&q=85", // 210°
  "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1400&q=85", // 240°
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1400&q=85", // 270° Other Profile
  "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1400&q=85", // 300°
  "https://images.unsplash.com/photo-1580481077195-c3c2f06b12a2?auto=format&fit=crop&w=1400&q=85", // 330°
];

export function DarkRevealHero() {
  const { getSection } = useCMS();
  const data = getSection('dark_reveal');
  
  // Option B: 360° Photographed Turntable is the primary mode!
  const [viewMode, setViewMode] = useState('360'); // '360' (Option B) | '3d' | 'photo'
  const [chairColor, setChairColor] = useState('#1C1B1A'); // Raven Semi-Aniline Leather
  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = animateDarkReveal(containerRef, (progress) => {
      setScrollProgress(progress);
    });
    return () => ctx?.revert();
  }, []);

  const finishes = [
    { name: 'Raven Semi-Aniline Leather', hex: '#1C1B1A' },
    { name: 'Vintage Cognac Hide', hex: '#683E26' },
    { name: 'Warm Ivory Bouclé', hex: '#EDE7DC' },
  ];

  const scrollToNextSection = () => {
    const el = document.getElementById('enter-maison');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Calculate dynamic 3D rotation driven by scroll (0 to 360 degrees)
  const dynamic3DRotation = [
    0.06 + scrollProgress * 0.08,
    -0.5 + scrollProgress * (Math.PI * 2),
    0
  ];

  // Active 360° turntable frames (uses uploaded frames from CMS if present)
  const arcFrames = data.turntable_frames && data.turntable_frames.length > 0
    ? data.turntable_frames
    : DEFAULT_ARC_360_FRAMES;

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-obsidian text-ivory flex flex-col justify-between pt-24 pb-10 overflow-hidden border-b border-graphite-border"
    >
      {/* Background Subtle Architectural Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(198,168,120,0.07)_0%,rgba(16,16,16,1)_75%)] pointer-events-none" />

      {/* Top Header Bar / Eyebrow & Switcher */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 w-full flex items-center justify-between">
        <div>
          <span className="eyebrow block mb-1 animate-hero-eyebrow">
            {data.eyebrow || "MAISON NOIR — COLLECTION 2026"}
          </span>
          <p className="text-xs text-stone tracking-wider font-sans animate-hero-eyebrow">
            SCULPTURAL SPOTLIGHT • ARC LOUNGE CHAIR
          </p>
        </div>

        {/* View Switcher Controls (Option B: 360° Photo Spin, 3D WebGL, Studio Shoot) */}
        <div className="flex items-center space-x-2 bg-graphite/80 backdrop-blur-md p-1 border border-graphite-border">
          <button
            onClick={() => setViewMode('360')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs transition-all ${
              viewMode === '360'
                ? 'bg-champagne text-obsidian font-semibold shadow-md'
                : 'text-stone hover:text-ivory'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>360° Photo Spin (Option B)</span>
          </button>
          <button
            onClick={() => setViewMode('3d')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs transition-all ${
              viewMode === '3d'
                ? 'bg-champagne text-obsidian font-semibold shadow-md'
                : 'text-stone hover:text-ivory'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>3D Engine</span>
          </button>
          <button
            onClick={() => setViewMode('photo')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs transition-all ${
              viewMode === 'photo'
                ? 'bg-champagne text-obsidian font-semibold shadow-md'
                : 'text-stone hover:text-ivory'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Studio Still</span>
          </button>
        </div>
      </div>

      {/* Centerpiece Stage: Option B (360° Photo Turntable) / 3D Canvas / Photo View */}
      <div className="relative z-10 flex-1 max-w-[1600px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-4">
        {/* Left Column: Editorial Headline, Copy & Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-graphite/60 border border-champagne/40 px-3 py-1 text-xs text-champagne">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Photographed 360° Turntable Active</span>
          </div>

          <h1 className="text-fluid-hero font-serif text-ivory font-light leading-none animate-hero-title">
            {data.headline || "A New Perspective on Living."}
          </h1>

          <p className="text-base md:text-lg text-stone max-w-lg font-sans leading-relaxed animate-hero-body">
            {data.body_text || "Discover a world where architectural discipline and artisanal soul transform the spaces we inhabit. Real physical materials captured across 360 degrees."}
          </p>

          {/* Quick Finish Swatches for the Hero Piece */}
          <div className="pt-2 animate-hero-swatch">
            <p className="text-[11px] uppercase tracking-widest text-stone mb-2">
              Finish: <span className="text-ivory">{finishes.find(f => f.hex === chairColor)?.name}</span>
            </p>
            <div className="flex items-center space-x-3">
              {finishes.map((f) => (
                <button
                  key={f.hex}
                  onClick={() => setChairColor(f.hex)}
                  className={`w-7 h-7 rounded-full border-2 transition-all ${
                    chairColor === f.hex ? 'border-champagne scale-110 shadow-lg' : 'border-graphite-border hover:border-stone'
                  }`}
                  style={{ backgroundColor: f.hex }}
                  title={f.name}
                  aria-label={f.name}
                />
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2 animate-hero-cta">
            <Button
              to={data.primary_cta_url || "/collections"}
              variant="champagne"
              size="lg"
              icon={ArrowRight}
            >
              {data.primary_cta_label || "Enter the Collection"}
            </Button>
            <Button
              to={data.secondary_cta_url || "/our-story"}
              variant="obsidian"
              size="lg"
            >
              {data.secondary_cta_label || "Explore Our Philosophy"}
            </Button>
          </div>
        </div>

        {/* Right Column: Active Viewer Stage */}
        <div className="lg:col-span-7 relative h-[480px] md:h-[580px] w-full flex items-center justify-center animate-hero-stage">
          {viewMode === '360' ? (
            /* OPTION B: 360° Photographed Turntable Sequence (Scroll & Drag Scrubbed) */
            <div className="w-full h-full relative">
              <Product360Viewer
                frames={arcFrames}
                fallbackImage={data.image_url}
                productName="Arc Lounge Chair"
                scrollProgress={scrollProgress}
                className="w-full h-full shadow-2xl"
                showControls={true}
              />

              {/* 360° Scroll Progress HUD Tracker */}
              <div className="absolute -bottom-3 left-4 right-4 glass-obsidian p-3 border border-graphite-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-hero-hud z-20">
                <div className="flex items-center space-x-3 w-full sm:w-auto">
                  <div className="w-2.5 h-2.5 rounded-full bg-champagne animate-pulse" />
                  <div className="text-xs">
                    <span className="text-stone block text-[10px] uppercase tracking-widest font-sans">
                      {scrollProgress < 0.96 ? "Option B: 360° Photo Scroll Sequence" : "360° Sequence Complete"}
                    </span>
                    <span className="font-mono text-ivory font-medium">
                      Turntable Angle: {Math.round(scrollProgress * 360)}° / 360° ({Math.round(scrollProgress * 100)}%)
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="w-28 md:w-36 h-1.5 bg-graphite rounded-full overflow-hidden">
                    <div
                      className="h-full bg-champagne transition-all duration-150"
                      style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                    />
                  </div>

                  <button
                    onClick={scrollToNextSection}
                    className="flex items-center space-x-1 text-xs text-champagne hover:text-ivory font-medium tracking-wide uppercase transition-colors"
                  >
                    <span>{scrollProgress >= 0.95 ? "Entering Living Spaces" : "Skip to Content"}</span>
                    <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
                  </button>
                </div>
              </div>
            </div>
          ) : viewMode === '3d' ? (
            /* 3D WebGL Canvas */
            <div className="w-full h-full relative">
              <SceneCanvas
                type="chair"
                materialColor={chairColor}
                rotation={dynamic3DRotation}
                autoRotate={false}
                enableZoom={false}
                enableOrbit={true}
                cameraPosition={[0, 0.7, 3.4]}
                isDark={true}
                fallbackImage={data.image_url}
              />
              <div className="absolute top-4 right-4 flex items-center space-x-2 text-[11px] text-stone glass-obsidian px-3 py-1.5 border border-graphite-border">
                <RotateCw className="w-3.5 h-3.5 text-champagne" />
                <span>Drag to Orbit • Scroll to Rotate 360°</span>
              </div>
            </div>
          ) : (
            /* Single High-Res Studio Still */
            <div className="relative w-full h-full overflow-hidden border border-graphite-border shadow-2xl">
              <img
                src={data.image_url || "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1600&q=85"}
                alt="Maison Noir Arc Lounge Chair Studio Shoot"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-85" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="eyebrow block">ARCHITECTURAL STILL</span>
                  <h3 className="font-serif text-2xl text-ivory">Arc Chair in Steam-Bent Walnut</h3>
                  <p className="text-xs text-stone mt-1">Raven semi-aniline leather cradled by continuous American walnut ply.</p>
                </div>
                <Button to="/products/arc-lounge-chair" variant="champagne" size="sm">
                  View Piece
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Sub-Bar: Cities & Scroll Prompt */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 w-full flex items-center justify-between text-xs text-stone border-t border-graphite-border/60 pt-4">
        <div className="flex items-center space-x-6 tracking-widest uppercase text-[11px]">
          <span>Copenhagen</span>
          <span>•</span>
          <span>Kyoto</span>
          <span>•</span>
          <span>New York</span>
        </div>
        <button
          onClick={scrollToNextSection}
          className="hidden sm:flex items-center space-x-2 tracking-widest uppercase text-champagne hover:text-ivory transition-colors cursor-pointer text-[11px]"
        >
          <span>{scrollProgress < 0.95 ? "Scroll to Complete 360° Turntable" : "Scroll to Enter the Maison"}</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
        <div className="tracking-widest uppercase text-ivory/60 text-[11px]">
          2026 Living Gallery
        </div>
      </div>
    </section>
  );
}
