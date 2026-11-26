import React, { useRef, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { ARTICLES } from '../../data/articles';
import { Button } from '../../components/ui/Button';
import { ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { animateJournalEditorial } from '../../utils/animation';

export function JournalSection() {
  const { getSection } = useCMS();
  const data = getSection('journal');
  const featuredArticles = ARTICLES.slice(0, 3);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = animateJournalEditorial(containerRef);
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
            <span className="eyebrow block mb-3 animate-section-eyebrow">{data.eyebrow || "EDITORIAL VOICES"}</span>
            <h2 className="text-fluid-section font-serif font-light text-ivory mb-4 animate-section-title">
              {data.headline || "The Journal."}
            </h2>
            <p className="text-sm md:text-base text-stone font-sans leading-relaxed animate-section-body">
              {data.body_text || "Essays on space, silence, and form. Thoughtful dialogues with leading architects, material histories, and interior philosophy."}
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <Button to="/journal" variant="outline" icon={ArrowRight}>
              {data.primary_cta_label || "Read All Articles"}
            </Button>
          </div>
        </div>

        {/* 3 Editorial Cards Grid with Upward Stagger */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-journal-grid">
          {featuredArticles.map((art) => (
            <Link
              key={art.id}
              to={`/journal/${art.slug}`}
              className="group bg-graphite border border-graphite-border flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-champagne/60 hover:shadow-2xl animate-journal-card"
            >
              <div className="relative h-64 overflow-hidden bg-obsidian">
                <img
                  src={art.heroImage}
                  alt={art.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] uppercase tracking-widest bg-obsidian/85 backdrop-blur-md px-2.5 py-1 text-champagne border border-graphite-border">
                    {art.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center space-x-2 text-[11px] text-stone mb-2">
                    <Clock className="w-3.5 h-3.5 text-champagne" />
                    <span>{art.readTime}</span>
                    <span>•</span>
                    <span>{art.date}</span>
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl text-ivory group-hover:text-champagne transition-colors leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-stone mt-3 line-clamp-3 leading-relaxed font-sans">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-graphite-border flex items-center justify-between text-xs text-champagne uppercase tracking-wider font-semibold">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
