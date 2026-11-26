import React, { useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { ArrowRight, Compass, ShieldCheck, Feather } from 'lucide-react';

export function OurStoryPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-obsidian text-ivory pt-32 pb-24 border-b border-graphite-border">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Hero */}
        <div className="max-w-3xl mb-16">
          <span className="eyebrow block mb-3">HERITAGE & MANIFESTO</span>
          <h1 className="text-fluid-section font-serif font-light text-ivory mb-6">
            Objects of Desire. Spaces of Meaning.
          </h1>
          <p className="text-lg md:text-xl text-stone leading-relaxed font-sans">
            Maison Noir was founded on a singular architectural conviction: true luxury does not shout; it anchors space with quiet permanence and tactile honesty.
          </p>
        </div>

        {/* Cinematic Split Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative h-[440px] md:h-[580px] overflow-hidden border border-graphite-border">
            <img
              src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=85"
              alt="Maison Noir Master Woodturner"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <span className="eyebrow text-champagne">DUAL HERITAGE</span>
            <h2 className="font-serif text-3xl md:text-4xl text-ivory">
              Where Scandinavian Calm Meets Japanese Precision
            </h2>
            <p className="text-sm text-stone leading-relaxed font-sans">
              Born from a collaboration between Danish architects and Japanese generational woodturners, Maison Noir bridges two of the world's most disciplined design cultures.
            </p>
            <p className="text-sm text-stone leading-relaxed font-sans">
              From our Kyoto timber workshop, we inherited the reverence for wood grain, the practice of Shou Sugi Ban fire treatment, and blind mortise-and-tenon joinery. From Copenhagen, we drew clean spatial proportions, acoustic mindfulness, and ergonomic restraint.
            </p>
            <div className="pt-4">
              <Button to="/collections" variant="champagne" icon={ArrowRight}>
                Explore the Collection
              </Button>
            </div>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-graphite-border">
          <div className="bg-graphite border border-graphite-border p-8 space-y-4">
            <Feather className="w-8 h-8 text-champagne" />
            <h3 className="font-serif text-2xl text-ivory">Acoustic Stillness</h3>
            <p className="text-xs text-stone leading-relaxed">
              Every piece is engineered to absorb domestic reverberations, bringing cathedral-like calm into contemporary high-ceiling residences.
            </p>
          </div>
          <div className="bg-graphite border border-graphite-border p-8 space-y-4">
            <ShieldCheck className="w-8 h-8 text-champagne" />
            <h3 className="font-serif text-2xl text-ivory">Single-Origin Materials</h3>
            <p className="text-xs text-stone leading-relaxed">
              We never use composite wood veneers or synthetic finishes. Solid French oak, Spanish Nero Marquina, and Tuscan full-grain cowhides only.
            </p>
          </div>
          <div className="bg-graphite border border-graphite-border p-8 space-y-4">
            <Compass className="w-8 h-8 text-champagne" />
            <h3 className="font-serif text-2xl text-ivory">Architectural Trade</h3>
            <p className="text-xs text-stone leading-relaxed">
              We collaborate directly with world-leading interior design studios and architects, offering full custom dimensional modifications and 3D CAD files.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
