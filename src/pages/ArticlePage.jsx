import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ARTICLES } from '../data/articles';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Clock, Share2 } from 'lucide-react';

export function ArticlePage() {
  const { slug } = useParams();
  const article = ARTICLES.find(a => a.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <main className="min-h-screen bg-obsidian text-ivory flex items-center justify-center pt-32 pb-24">
        <div className="text-center">
          <h2 className="font-serif text-3xl mb-4">Article Not Found</h2>
          <Button to="/journal" variant="champagne" icon={ArrowLeft}>
            Back to Journal
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-obsidian text-ivory pt-32 pb-24 border-b border-graphite-border">
      <article className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Breadcrumb */}
        <Link
          to="/journal"
          className="inline-flex items-center space-x-2 text-xs text-stone hover:text-champagne uppercase tracking-widest transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Journal</span>
        </Link>

        {/* Header */}
        <div className="space-y-4 mb-10">
          <div className="flex items-center space-x-3 text-xs text-stone">
            <span className="eyebrow text-champagne">{article.category}</span>
            <span>•</span>
            <div className="flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </div>
            <span>•</span>
            <span>{article.date}</span>
          </div>

          <h1 className="text-fluid-section font-serif font-light text-ivory leading-tight">
            {article.title}
          </h1>

          <p className="text-base md:text-xl text-stone italic font-serif leading-relaxed pt-2">
            "{article.excerpt}"
          </p>
        </div>

        {/* Hero Image */}
        <div className="w-full h-[400px] md:h-[540px] overflow-hidden border border-graphite-border mb-12">
          <img
            src={article.heroImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Essay Content */}
        <div className="prose prose-invert max-w-none text-stone font-sans text-sm md:text-base leading-relaxed space-y-6">
          {article.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="first-letter:font-serif first-letter:text-4xl first-letter:float-left first-letter:mr-3 first-letter:text-champagne first-letter:font-normal">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Article Footer & Navigation */}
        <div className="pt-12 mt-12 border-t border-graphite-border flex items-center justify-between">
          <Button to="/journal" variant="outline" size="sm" icon={ArrowLeft}>
            All Articles
          </Button>
          <Button to="/collections" variant="champagne" size="sm">
            Explore Furniture Pieces
          </Button>
        </div>
      </article>
    </main>
  );
}
