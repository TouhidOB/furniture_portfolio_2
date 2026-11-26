import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Calendar, Settings } from 'lucide-react';
import { SearchModal } from '../ui/SearchModal';
import { BookingModal } from '../ui/BookingModal';
import { MobileDrawer } from './MobileDrawer';

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Collections', path: '/collections' },
    { label: 'Living', path: '/collections?category=living' },
    { label: 'Dining', path: '/collections?category=dining' },
    { label: 'Bedroom', path: '/collections?category=bedroom' },
    { label: 'Workspace', path: '/collections?category=workspace' },
    { label: 'Our Story', path: '/our-story' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-obsidian/90 backdrop-blur-md border-b border-graphite-border py-4 shadow-xl'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Wordmark */}
          <Link to="/" className="flex items-center space-x-2.5 group">
            <span className="font-serif text-2xl md:text-3xl tracking-widest text-ivory font-semibold group-hover:text-champagne transition-colors">
              MAISON NOIR
            </span>
            <span className="hidden sm:inline-block text-[9px] uppercase tracking-[0.25em] text-champagne border border-champagne/40 px-1.5 py-0.5">
              ATELIER
            </span>
          </Link>

          {/* Desktop Center Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className="text-xs uppercase tracking-widest text-stone hover:text-ivory transition-colors font-sans py-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-stone hover:text-ivory transition-colors"
              aria-label="Search Catalog"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* CMS Studio Quick Access */}
            <Link
              to="/dashboard"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-graphite/70 border border-graphite-border hover:border-champagne/60 text-[11px] text-stone hover:text-champagne transition-all"
              title="Open CMS Studio & Catalog Manager"
            >
              <Settings className="w-3 h-3 text-champagne" />
              <span className="tracking-wider uppercase">CMS Studio</span>
            </Link>

            {/* Book a Visit CTA */}
            <button
              onClick={() => setBookingOpen(true)}
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-champagne hover:bg-champagne-light text-obsidian text-xs font-semibold uppercase tracking-wider transition-all active:scale-[0.98]"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book a Visit</span>
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-stone hover:text-ivory transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-ivory hover:text-champagne transition-colors"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Modals & Drawers */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
        onOpenBooking={() => {
          setMobileMenuOpen(false);
          setBookingOpen(true);
        }}
      />
    </>
  );
}
