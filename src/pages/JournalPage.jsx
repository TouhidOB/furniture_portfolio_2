import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ARTICLES } from '../data/articles';
import { Clock, ArrowRight } from 'lucide-react';

export function JournalPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-obsidian text-ivory pt-32 pb-24 border-b border-graphite-border">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="eyebrow block mb-3">EDITORIAL ARCHIVE</span>
          <h1 className="text-fluid-section font-serif font-light text-ivory mb-6">
            The Maison Journal.
          </h1>
          <p className="text-base md:text-lg text-stone leading-relaxed font-sans">
            Essays on architectural silence, material histories, and intimate interviews with practitioners defining modern domestic spaces.
          </p>
        </div>

        {/* 4 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {ARTICLES.map((art) => (
            <Link
              key={art.id}
              to={`/journal/${art.slug}`}
              className="group bg-graphite border border-graphite-border overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-champagne/60 hover:shadow-2xl"
            >
              <div className="relative h-80 overflow-hidden bg-obsidian">
                <img
                  src={art.heroImage}
                  alt={art.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] uppercase tracking-widest bg-obsidian/85 backdrop-blur-md px-3 py-1 text-champagne border border-graphite-border">
                    {art.category}
                  </span>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center space-x-2 text-xs text-stone mb-2">
                    <Clock className="w-3.5 h-3.5 text-champagne" />
                    <span>{art.readTime}</span>
                    <span>•</span>
                    <span>{art.date}</span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-ivory group-hover:text-champagne transition-colors leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs md:text-sm text-stone mt-3 leading-relaxed font-sans line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-graphite-border flex items-center justify-between text-xs text-champagne uppercase tracking-widest font-semibold">
                  <span>Read Full Essay</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
