import React, { useState, useRef, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { PRODUCTS } from '../../data/products';
import { Button } from '../../components/ui/Button';
import { formatPrice, getProductImage } from '../../utils/product';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { animateIconArchive } from '../../utils/animation';

export function IconCollectionSection() {
  const { getSection } = useCMS();
  const data = getSection('icon_collection');
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = animateIconArchive(containerRef);
    return () => ctx?.revert();
  }, []);

  // Filter 6 key icons
  const iconProducts = PRODUCTS.slice(0, 6);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Icons' },
    { id: 'living', label: 'Living' },
    { id: 'dining', label: 'Dining' },
    { id: 'bedroom', label: 'Bedroom' },
  ];

  const filtered = activeCategory === 'all'
    ? iconProducts
    : iconProducts.filter(p => p.category === activeCategory);

  return (
    <section
      ref={containerRef}
      className="relative py-28 md:py-36 bg-obsidian text-ivory border-b border-graphite-border overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Section Header with Staggered Entrance */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 animate-section-header">
          <div>
            <span className="eyebrow block mb-3 animate-section-eyebrow">{data.eyebrow || "PERMANENT ARCHIVE"}</span>
            <h2 className="text-fluid-section font-serif font-light text-ivory animate-section-title">
              {data.headline || "Pieces That Defy Trend."}
            </h2>
          </div>
          <div className="flex items-center space-x-2 mt-6 md:mt-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs uppercase tracking-widest transition-all ${
                  activeCategory === cat.id
                    ? 'bg-champagne text-obsidian font-semibold'
                    : 'bg-graphite text-stone hover:text-ivory'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Icons Grid with 3D Matrix Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-icon-grid">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="bg-graphite border border-graphite-border group flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-champagne/60 hover:shadow-2xl animate-icon-card"
            >
              <div className="relative h-72 md:h-80 overflow-hidden bg-obsidian">
                <img
                  src={getProductImage(product)}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] uppercase tracking-widest bg-obsidian/85 backdrop-blur-md px-2.5 py-1 text-champagne border border-graphite-border">
                    {product.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-start justify-between">
                    <h3 className="font-serif text-2xl text-ivory group-hover:text-champagne transition-colors">
                      {product.name}
                    </h3>
                    <span className="text-sm font-sans font-semibold text-ivory">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                  <p className="text-xs text-stone mt-2 line-clamp-2 leading-relaxed">
                    {product.tagline}
                  </p>
                </div>

                <div className="pt-4 border-t border-graphite-border/70 flex items-center justify-between">
                  <span className="text-[11px] text-stone">
                    {product.materials?.[0]?.name || "Solid Timber & Brass"}
                  </span>
                  <Link
                    to={`/products/${product.slug}`}
                    className="flex items-center space-x-1 text-xs text-champagne font-medium hover:text-ivory transition-colors"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
