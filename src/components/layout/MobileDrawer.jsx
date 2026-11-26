import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Calendar, Settings, ArrowRight } from 'lucide-react';

export function MobileDrawer({ isOpen, onClose, navLinks, onOpenBooking }) {
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
    <div className="fixed inset-0 z-50 flex justify-end bg-obsidian/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-sm h-full bg-graphite border-l border-graphite-border p-8 flex flex-col justify-between overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-graphite-border mb-8">
            <span className="font-serif text-2xl tracking-widest text-ivory font-semibold">
              MAISON NOIR
            </span>
            <button
              onClick={onClose}
              className="p-2 text-stone hover:text-ivory transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav List */}
          <nav className="space-y-5">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={onClose}
                className="flex items-center justify-between font-serif text-2xl text-ivory/90 hover:text-champagne transition-colors group"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 text-stone group-hover:text-champagne group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
            <Link
              to="/materials"
              onClick={onClose}
              className="flex items-center justify-between font-serif text-2xl text-ivory/90 hover:text-champagne transition-colors group"
            >
              <span>Materials Atelier</span>
              <ArrowRight className="w-4 h-4 text-stone group-hover:text-champagne group-hover:translate-x-1 transition-all" />
            </Link>
            <Link
              to="/journal"
              onClick={onClose}
              className="flex items-center justify-between font-serif text-2xl text-ivory/90 hover:text-champagne transition-colors group"
            >
              <span>Journal</span>
              <ArrowRight className="w-4 h-4 text-stone group-hover:text-champagne group-hover:translate-x-1 transition-all" />
            </Link>
            <Link
              to="/showroom"
              onClick={onClose}
              className="flex items-center justify-between font-serif text-2xl text-ivory/90 hover:text-champagne transition-colors group"
            >
              <span>Showrooms</span>
              <ArrowRight className="w-4 h-4 text-stone group-hover:text-champagne group-hover:translate-x-1 transition-all" />
            </Link>
          </nav>
        </div>

        {/* Footer CTAs */}
        <div className="pt-8 border-t border-graphite-border space-y-4">
          <button
            onClick={onOpenBooking}
            className="w-full flex items-center justify-center space-x-2 py-3.5 bg-champagne text-obsidian text-xs font-semibold uppercase tracking-wider"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Showroom Viewing</span>
          </button>

          <Link
            to="/dashboard"
            onClick={onClose}
            className="w-full flex items-center justify-center space-x-2 py-3 bg-obsidian border border-graphite-border text-xs text-stone hover:text-champagne uppercase tracking-wider"
          >
            <Settings className="w-4 h-4 text-champagne" />
            <span>CMS Studio</span>
          </Link>

          <p className="text-[11px] text-stone text-center tracking-widest uppercase">
            Copenhagen • Kyoto • New York
          </p>
        </div>
      </div>
    </div>
  );
}
