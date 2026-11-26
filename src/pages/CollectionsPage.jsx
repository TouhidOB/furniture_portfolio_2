import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { formatPrice, getProductImage } from '../utils/product';
import { Button } from '../components/ui/Button';
import { ArrowRight, SlidersHorizontal, Search } from 'lucide-react';

export function CollectionsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';

  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setActiveCategory(categoryParam);
  }, [categoryParam]);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  // Filter products
  let filtered = PRODUCTS.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = !searchQuery.trim() ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  }

  return (
    <main className="min-h-screen bg-obsidian text-ivory pt-32 pb-24 border-b border-graphite-border">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <span className="eyebrow block mb-3">CATALOGUE RAISONNÉ</span>
          <h1 className="text-fluid-section font-serif font-light text-ivory mb-4">
            The Living Collection.
          </h1>
          <p className="text-sm md:text-base text-stone leading-relaxed font-sans">
            Architectural furniture designed for timeless spaces. Explore our permanent series across living, dining, bedroom, and workspace environments.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-graphite-border mb-12">
          {/* Categories */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-sans whitespace-nowrap transition-all border ${
                  activeCategory === cat.id
                    ? 'bg-champagne text-obsidian border-champagne font-semibold shadow'
                    : 'bg-graphite text-stone border-graphite-border hover:text-ivory'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search collection..."
                className="bg-graphite border border-graphite-border pl-8 pr-3 py-2 text-xs text-ivory placeholder-stone focus:outline-none focus:border-champagne w-48 sm:w-60"
              />
              <Search className="w-3.5 h-3.5 text-stone absolute left-2.5 top-2.5" />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-graphite border border-graphite-border px-3 py-2 text-xs text-ivory focus:outline-none focus:border-champagne"
            >
              <option value="featured">Sort: Curated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="bg-graphite border border-graphite-border group flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-champagne/60 hover:shadow-2xl"
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

                  <div className="pt-4 border-t border-graphite-border flex items-center justify-between">
                    <span className="text-[11px] text-stone">
                      {product.dimensions.width} × {product.dimensions.depth}
                    </span>
                    <Link
                      to={`/products/${product.slug}`}
                      className="inline-flex items-center text-xs uppercase tracking-wider text-champagne hover:text-white font-medium"
                    >
                      <span>Inspect</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <h3 className="font-serif text-2xl text-ivory mb-2">No Pieces Found</h3>
            <p className="text-sm text-stone mb-6">Try refining your search keyword or selected category filter.</p>
            <Button onClick={() => { setActiveCategory('all'); setSearchQuery(''); }} variant="champagne" size="sm">
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
