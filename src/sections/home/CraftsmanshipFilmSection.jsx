import React, { useState, useRef, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Button } from '../../components/ui/Button';
import { Play, Pause, Volume2, ArrowRight } from 'lucide-react';
import { animateCinematicLetterbox } from '../../utils/animation';

export function CraftsmanshipFilmSection() {
  const { getSection } = useCMS();
  const data = getSection('craftsmanship_film');
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = animateCinematicLetterbox(containerRef);
    return () => ctx?.revert();
  }, []);

  const chapters = [
    {
      title: "Steam & Pressure",
      location: "Kyoto Workshop",
      time: "01:24",
      desc: "Subjecting 100-year-old American black walnut to calibrated steam chambers and hand-formed bending molds."
    },
    {
      title: "The Sound of Honing",
      location: "Basque Marble Quarry",
      time: "02:45",
      desc: "Water-lubricated diamond wire saws sculpting blocks of Nero Marquina into velvet-matte monoliths."
    },
    {
      title: "Wax & Awl",
      location: "Tuscan Tannery",
      time: "03:12",
      desc: "Generational saddle-makers applying vegetable wax and double-handed bridle stitching along heavy hides."
    },
    {
      title: "Architectural Caliber",
      location: "Copenhagen Atelier",
      time: "04:30",
      desc: "Final acoustic and balance inspection ensuring flawless silent operation before private crating."
    }
  ];

  return (
    <section
      ref={containerRef}
      className="relative py-28 md:py-36 bg-obsidian text-ivory border-b border-graphite-border overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Section Header with Staggered Entrance */}
        <div className="max-w-2xl mb-14 animate-section-header">
          <span className="eyebrow block mb-3 animate-section-eyebrow">{data.eyebrow || "DOCUMENTARY"}</span>
          <h2 className="text-fluid-section font-serif font-light text-ivory mb-4 animate-section-title">
            {data.headline || "The Art of Slow Making."}
          </h2>
          <p className="text-sm md:text-base text-stone font-sans leading-relaxed animate-section-body">
            {data.body_text || "Witness our artisans in Kyoto and Copenhagen shaping solid timber, hand-buffing saddle leather, and honing Spanish marble."}
          </p>
        </div>

        {/* Cinematic Film Canvas Banner (Letterbox Expand) */}
        <div className="relative w-full h-[480px] md:h-[650px] overflow-hidden border border-graphite-border group mb-14 animate-film-canvas">
          <img
            src={data.image_url || "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1600&q=85"}
            alt="Maison Noir Master Craftsperson in Workshop"
            className={`w-full h-full object-cover transition-all duration-1000 ${
              isPlaying ? 'scale-105 brightness-95' : 'brightness-75'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />

          {/* Film Controls Overlay */}
          <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-14">
            <div className="flex items-center justify-between">
              <span className="eyebrow text-champagne bg-obsidian/75 px-3 py-1 border border-graphite-border">
                {isPlaying ? 'NOW STREAMING • CHAPTER 01' : 'DOCUMENTARY ESSAY • 4K CINEMA'}
              </span>
              <div className="flex items-center space-x-2 glass-obsidian px-3 py-1.5 text-xs text-stone">
                <Volume2 className="w-4 h-4 text-champagne" />
                <span>Stereo Ambient Sound</span>
              </div>
            </div>

            {/* Play Button in Center */}
            <div className="flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-20 h-20 rounded-full bg-champagne text-obsidian flex items-center justify-center hover:scale-110 transition-transform shadow-2xl focus:outline-none"
                aria-label={isPlaying ? "Pause film" : "Play craftsmanship film"}
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </button>
            </div>

            {/* Bottom Film Info */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="eyebrow text-stone block">MAISON NOIR ARCHIVES</span>
                <h3 className="font-serif text-2xl md:text-3xl text-ivory">Acoustic Tectonics of Ash & Leather</h3>
              </div>
              <Button to="/our-story" variant="champagne" size="sm" icon={ArrowRight}>
                Read Atelier Essay
              </Button>
            </div>
          </div>
        </div>

        {/* 4 Documentary Chapters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-chapters-grid">
          {chapters.map((chap, idx) => (
            <div
              key={chap.title}
              className="bg-graphite/40 border border-graphite-border p-6 hover:border-champagne/50 transition-all animate-chapter-card"
            >
              <div className="flex items-center justify-between text-xs text-champagne mb-3">
                <span className="font-mono">0{idx + 1} // {chap.time}</span>
                <span className="text-[10px] text-stone uppercase tracking-wider">{chap.location}</span>
              </div>
              <h4 className="font-serif text-xl text-ivory mb-2">{chap.title}</h4>
              <p className="text-xs text-stone leading-relaxed font-sans">{chap.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
