import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

export function SiteFooter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-obsidian border-t border-graphite-border pt-20 pb-12 text-ivory">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-graphite-border">
          {/* Brand & Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-3xl tracking-widest text-ivory font-semibold hover:text-champagne transition-colors">
                MAISON NOIR
              </span>
            </Link>
            <p className="eyebrow block">THE LIVING GALLERY</p>
            <p className="text-sm text-stone max-w-sm leading-relaxed">
              Objects of Desire. Spaces of Meaning. We create architectural furniture at the intersection of Scandinavian calm and Japanese mastery.
            </p>
            <div className="pt-2">
              <p className="text-xs uppercase tracking-widest text-champagne">
                Flagship Ateliers: Copenhagen • Kyoto • New York
              </p>
            </div>
          </div>

          {/* Catalog Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-champagne font-semibold mb-6">Collections</h4>
            <ul className="space-y-3 text-sm text-stone">
              <li>
                <Link to="/collections?category=living" className="hover:text-ivory transition-colors">Living Salon</Link>
              </li>
              <li>
                <Link to="/collections?category=dining" className="hover:text-ivory transition-colors">Dining Series</Link>
              </li>
              <li>
                <Link to="/collections?category=bedroom" className="hover:text-ivory transition-colors">Private Bedroom</Link>
              </li>
              <li>
                <Link to="/collections?category=workspace" className="hover:text-ivory transition-colors">Architectural Workspace</Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-ivory transition-colors">Complete Catalog</Link>
              </li>
            </ul>
          </div>

          {/* Brand & Editorial */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-champagne font-semibold mb-6">Discovery</h4>
            <ul className="space-y-3 text-sm text-stone">
              <li>
                <Link to="/our-story" className="hover:text-ivory transition-colors">Our Story & Heritage</Link>
              </li>
              <li>
                <Link to="/materials" className="hover:text-ivory transition-colors">Materials & Tactility</Link>
              </li>
              <li>
                <Link to="/journal" className="hover:text-ivory transition-colors">Maison Journal</Link>
              </li>
              <li>
                <Link to="/showroom" className="hover:text-ivory transition-colors">Showroom Appointments</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-champagne hover:underline transition-colors">CMS Studio (Admin)</Link>
              </li>
            </ul>
          </div>

          {/* Private Newsletter */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-champagne font-semibold mb-4">Private Dispatch</h4>
            <p className="text-xs text-stone mb-4 leading-relaxed">
              Receive private invitations to seasonal limited editions and architectural essays.
            </p>
            {subscribed ? (
              <div className="flex items-center space-x-2 text-xs text-champagne py-2">
                <Check className="w-4 h-4" />
                <span>You are on our private guest list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="architect@domain.com"
                    className="w-full bg-graphite border border-graphite-border px-3 py-2.5 text-xs text-ivory placeholder-stone focus:outline-none focus:border-champagne"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 p-1 text-champagne hover:text-white transition-colors"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Sub-Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} MAISON NOIR. All rights reserved. Architectural Variant 02.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-ivory cursor-pointer">Privacy Policy</span>
            <span className="hover:text-ivory cursor-pointer">Terms of Commission</span>
            <span className="hover:text-ivory cursor-pointer">Trade Concierge</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
