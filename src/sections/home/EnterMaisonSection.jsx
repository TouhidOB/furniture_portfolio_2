import React, { useRef, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Button } from '../../components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { animateCorridorEntrance } from '../../utils/animation';

export function EnterMaisonSection() {
  const { getSection } = useCMS();
  const data = getSection('enter_maison');
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = animateCorridorEntrance(containerRef);
    return () => ctx?.revert();
  }, []);

  const principles = [
    { title: "Architectural Proportion", desc: "Every volume adheres to classical golden ratios calibrated for contemporary domestic sanctuaries." },
    { title: "Tectonic Permanence", desc: "Crafted exclusively from unveneered solid hardwoods, hand-honed Spanish marbles, and forged brass." },
    { title: "Acoustic Stillness", desc: "Dense materials and sound-absorptive upholstery engineered to bring restorative silence into the room." },
  ];

  return (
    <section
      id="enter-maison"
      ref={containerRef}
      className="relative py-28 md:py-36 bg-obsidian-950 text-ivory border-b border-graphite-border overflow-hidden"
    >
      {/* Decorative Architectural Grid Lines */}
      <div className="absolute inset-0 grid grid-cols-6 pointer-events-none opacity-10">
        <div className="border-r border-stone" />
        <div className="border-r border-stone" />
        <div className="border-r border-stone" />
        <div className="border-r border-stone" />
        <div className="border-r border-stone" />
        <div className="border-r border-stone" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Section Header with Staggered Entrance */}
        <div className="max-w-2xl mb-16 animate-section-header">
          <span className="eyebrow block mb-3 animate-section-eyebrow">
            {data.eyebrow || "ARCHITECTURAL PASSAGE"}
          </span>
          <h2 className="text-fluid-section font-serif font-light text-ivory mb-6 animate-section-title">
            {data.headline || "Cross the Threshold."}
          </h2>
          <p className="text-base md:text-lg text-stone font-sans leading-relaxed animate-section-body">
            {data.body_text || "Step through a rhythmic sequence of smoked glass, brushed brass portals, and monolithic timber. Every corner is designed to decelerate the senses."}
          </p>
        </div>

        {/* Dramatic Architectural Corridor Visual Banner */}
        <div className="relative w-full h-[450px] md:h-[620px] overflow-hidden border border-graphite-border mb-16 group animate-corridor-wrap">
          <img
            src={data.image_url || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"}
            alt="Maison Noir Architectural Corridor"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 animate-corridor-img"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian/90 via-obsidian/40 to-transparent" />
          
          <div className="absolute bottom-10 left-10 md:left-14 max-w-md space-y-4 animate-portal-caption">
            <span className="eyebrow text-champagne">PORTAL 01</span>
            <h3 className="font-serif text-3xl md:text-4xl text-ivory leading-tight">
              A sanctuary carved from silence and shadow.
            </h3>
            <p className="text-xs text-stone leading-relaxed">
              Where materials speak quietly and spaces breathe with deliberate intention.
            </p>
            <Button to="/collections" variant="champagne" size="sm" icon={ArrowRight}>
              Explore Living Spaces
            </Button>
          </div>
        </div>

        {/* 3 Architectural Principles Columns with Staggered Perspective */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-graphite-border animate-pillars-wrap">
          {principles.map((p, idx) => (
            <div key={p.title} className="space-y-3 animate-pillar-card">
              <span className="text-xs font-serif text-champagne tracking-widest block">
                0{idx + 1} / FOUNDATION
              </span>
              <h4 className="font-serif text-2xl text-ivory">{p.title}</h4>
              <p className="text-xs text-stone leading-relaxed font-sans">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
