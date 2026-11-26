import React, { useState, useRef, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Button } from '../../components/ui/Button';
import { Plus, X, ArrowRight } from 'lucide-react';
import { animateSalonCurtain } from '../../utils/animation';

export function LivingExperienceSection() {
  const { getSection } = useCMS();
  const data = getSection('living_experience');
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = animateSalonCurtain(containerRef);
    return () => ctx?.revert();
  }, []);

  const hotspots = [
    {
      id: 'sofa',
      name: 'Forma Modular Sofa',
      slug: 'forma-modular-sofa',
      price: '$8,400',
      material: 'Belgian Bouclé & Smoked Oak Base',
      x: '38%',
      y: '68%',
      description: 'Monolithic low-slung architecture offering flexible configurations for expansive salons.'
    },
    {
      id: 'chair',
      name: 'Arc Lounge Chair',
      slug: 'arc-lounge-chair',
      price: '$3,850',
      material: 'Steam-Bent Walnut & Raven Leather',
      x: '76%',
      y: '58%',
      description: 'Continuous ribbon curve cradling deep channel cushions with 360-degree precision swivel.'
    },
    {
      id: 'table',
      name: 'Monolith Coffee Table',
      slug: 'monolith-coffee-table',
      price: '$3,400',
      material: 'Honed Nero Marquina Marble',
      x: '52%',
      y: '78%',
      description: 'Solid Spanish black marble with natural calcite lightning veins and chamfered edges.'
    },
    {
      id: 'credenza',
      name: 'Linear Fluted Credenza',
      slug: 'linear-fluted-credenza',
      price: '$4,950',
      material: 'Solid Walnut & Marble Top',
      x: '18%',
      y: '42%',
      description: 'Rhythmic tambour acoustic doors concealing high-fidelity entertainment storage.'
    }
  ];

  const [activeHotspot, setActiveHotspot] = useState(hotspots[0]);

  return (
    <section
      ref={containerRef}
      className="relative py-28 md:py-36 bg-obsidian text-ivory border-b border-graphite-border overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Section Header with Staggered Entrance */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 animate-section-header">
          <div>
            <span className="eyebrow block mb-3 animate-section-eyebrow">
              {data.eyebrow || "CURATED RESIDENCE"}
            </span>
            <h2 className="text-fluid-section font-serif font-light text-ivory animate-section-title">
              {data.headline || "The Grand Salon."}
            </h2>
          </div>
          <p className="text-sm text-stone max-w-md mt-4 md:mt-0 font-sans animate-section-body">
            {data.body_text || "Explore our signature living collection in situ. Touch any glowing hotspot to inspect materials, joinery details, and dimensions."}
          </p>
        </div>

        {/* Interactive Room Canvas with Clickable Hotspots */}
        <div className="relative w-full h-[520px] md:h-[700px] overflow-hidden border border-graphite-border bg-graphite animate-salon-canvas">
          <img
            src={data.image_url || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=85"}
            alt="Maison Noir Grand Living Room Sanctuary"
            className="w-full h-full object-cover brightness-[0.88]"
          />

          {/* Hotspot Indicators */}
          {hotspots.map((spot) => {
            const isSelected = activeHotspot?.id === spot.id;
            return (
              <button
                key={spot.id}
                onClick={() => setActiveHotspot(spot)}
                style={{ top: spot.y, left: spot.x }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 group focus:outline-none animate-hotspot-beacon"
                aria-label={`Inspect ${spot.name}`}
              >
                <span className={`relative flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                  isSelected ? 'bg-champagne text-obsidian scale-125' : 'bg-obsidian/80 text-champagne border border-champagne/60 hover:scale-110'
                }`}>
                  <span className="absolute inline-flex h-full w-full rounded-full bg-champagne/30 animate-ping" />
                  {isSelected ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>
            );
          })}

          {/* Floating Architectural Detail Card for Selected Hotspot */}
          {activeHotspot && (
            <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-8 md:bottom-8 md:max-w-sm glass-obsidian p-6 border border-champagne/40 z-30 shadow-2xl animate-fade-in">
              <div className="flex items-start justify-between mb-3">
                <span className="eyebrow">IN SITU SPECIFICATION</span>
                <span className="text-sm font-serif text-champagne">{activeHotspot.price}</span>
              </div>
              <h3 className="font-serif text-2xl text-ivory mb-1">{activeHotspot.name}</h3>
              <p className="text-xs text-champagne/90 mb-3 font-sans">{activeHotspot.material}</p>
              <p className="text-xs text-stone mb-4 font-sans leading-relaxed">
                {activeHotspot.description}
              </p>
              <Button to={`/products/${activeHotspot.slug}`} variant="champagne" size="sm" icon={ArrowRight}>
                View Product Details
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
