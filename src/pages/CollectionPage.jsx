import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { COLLECTIONS } from '../data/collections';
import { PRODUCTS } from '../data/products';
import { formatPrice, getProductImage } from '../utils/product';
import { Button } from '../components/ui/Button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function CollectionPage() {
  const { slug } = useParams();
  const collection = COLLECTIONS.find(c => c.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!collection) {
    return (
      <main className="min-h-screen bg-obsidian text-ivory flex items-center justify-center pt-32 pb-24">
        <div className="text-center">
          <h2 className="font-serif text-3xl mb-4">Collection Not Found</h2>
          <Button to="/collections" variant="champagne" icon={ArrowLeft}>
            Return to All Collections
          </Button>
        </div>
      </main>
    );
  }

  const collectionProducts = PRODUCTS.filter(p => collection.productSlugs.includes(p.slug));

  return (
    <main className="min-h-screen bg-obsidian text-ivory pt-28 pb-24 border-b border-graphite-border">
      {/* Hero Banner */}
      <div className="relative h-[480px] md:h-[600px] overflow-hidden border-b border-graphite-border mb-16">
        <img
          src={collection.heroImage}
          alt={collection.name}
          className="w-full h-full object-cover brightness-[0.75]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
        <div className="absolute bottom-12 left-6 md:left-12 max-w-3xl space-y-4">
          <Link
            to="/collections"
            className="inline-flex items-center space-x-1.5 text-xs text-stone hover:text-champagne uppercase tracking-widest transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Collections</span>
          </Link>
          <span className="eyebrow block text-champagne">CURATED SERIES</span>
          <h1 className="text-fluid-section font-serif font-light text-ivory leading-tight">
            {collection.name}
          </h1>
          <p className="text-base md:text-lg text-stone font-sans max-w-xl leading-relaxed">
            {collection.description}
          </p>
        </div>
      </div>

      {/* Collection Pieces Grid */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="mb-10">
          <span className="eyebrow block">ARCHITECTURAL SUITE</span>
          <h2 className="font-serif text-3xl text-ivory">Included Pieces ({collectionProducts.length})</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collectionProducts.map((product) => (
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
      </div>
    </main>
  );
}
