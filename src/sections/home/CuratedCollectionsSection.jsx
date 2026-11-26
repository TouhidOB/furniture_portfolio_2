import React, { useRef, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { COLLECTIONS } from '../../data/collections';
import { Button } from '../../components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { animateCollectionParallax } from '../../utils/animation';

export function CuratedCollectionsSection() {
  const { getSection } = useCMS();
  const data = getSection('curated_collections');
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = animateCollectionParallax(containerRef);
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
            <span className="eyebrow block mb-3 animate-section-eyebrow">{data.eyebrow || "SERIES EXPLORATION"}</span>
            <h2 className="text-fluid-section font-serif font-light text-ivory mb-4 animate-section-title">
              {data.headline || "Cohesive Design Universes."}
            </h2>
            <p className="text-sm md:text-base text-stone font-sans leading-relaxed animate-section-body">
              {data.body_text || "From brutalist solid oak to organic steam-bent walnut and minimalist nighttime sanctuaries."}
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <Button to="/collections" variant="outline" icon={ArrowRight}>
              {data.primary_cta_label || "Explore All Series"}
            </Button>
          </div>
        </div>

        {/* Asymmetrical 4-Collection Layout (Diagonal Parallax) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {COLLECTIONS.map((col, idx) => (
            <Link
              key={col.id}
              to={`/collections/${col.slug}`}
              className="group relative h-[420px] md:h-[500px] overflow-hidden border border-graphite-border bg-graphite flex flex-col justify-end p-8 md:p-12 transition-all hover:border-champagne/60 animate-collection-card"
            >
              <img
                src={col.heroImage}
                alt={col.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 brightness-75 group-hover:brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />

              <div className="relative z-10 space-y-3">
                <span className="eyebrow text-champagne">SERIES 0{idx + 1}</span>
                <h3 className="font-serif text-3xl md:text-4xl text-ivory group-hover:text-champagne transition-colors">
                  {col.name}
                </h3>
                <p className="text-xs text-stone max-w-md leading-relaxed font-sans">
                  {col.tagline}
                </p>
                <div className="pt-2 flex items-center space-x-2 text-xs uppercase tracking-widest text-champagne font-semibold">
                  <span>Enter Collection</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
