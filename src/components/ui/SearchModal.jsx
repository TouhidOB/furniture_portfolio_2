import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';
import { formatPrice } from '../../utils/product';

export function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
    setResults(filtered);
  }, [query]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-obsidian/90 backdrop-blur-md transition-all">
      <div className="w-full max-w-2xl bg-graphite border border-graphite-border shadow-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-stone hover:text-ivory transition-colors"
          aria-label="Close search"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 border-b border-graphite-border pb-4 mb-6">
          <Search className="w-5 h-5 text-champagne" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by piece, category, or material (e.g. Sofa, Marble, Arc)..."
            autoFocus
            className="w-full bg-transparent text-ivory placeholder-stone focus:outline-none font-sans text-sm"
          />
        </div>

        {results.length > 0 ? (
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
            {results.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.slug}`}
                onClick={onClose}
                className="flex items-center justify-between p-3 hover:bg-obsidian transition-colors border border-transparent hover:border-graphite-border group"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={product.images.primary}
                    alt={product.name}
                    className="w-12 h-12 object-cover"
                  />
                  <div>
                    <h4 className="font-serif text-lg text-ivory group-hover:text-champagne transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs text-stone uppercase tracking-widest">{product.category}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-right">
                  <span className="text-sm font-sans text-champagne">{formatPrice(product.price)}</span>
                  <ArrowRight className="w-4 h-4 text-stone group-hover:text-champagne group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        ) : query.trim() ? (
          <div className="text-center py-10 text-stone text-sm">
            No architectural pieces found matching "{query}".
          </div>
        ) : (
          <div className="py-6">
            <p className="text-xs uppercase tracking-widest text-stone mb-3">Popular Searches</p>
            <div className="flex flex-wrap gap-2">
              {['Arc Lounge Chair', 'Forma Modular Sofa', 'Terra Dining Table', 'Eos Floating Bed', 'Nero Marquina'].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3 py-1.5 bg-obsidian hover:bg-obsidian-50 border border-graphite-border text-xs text-ivory/80 hover:text-champagne transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
