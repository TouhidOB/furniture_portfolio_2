import React, { useState, useRef, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { SHOWROOMS } from '../../data/articles';
import { Button } from '../../components/ui/Button';
import { BookingModal } from '../../components/ui/BookingModal';
import { MapPin, Phone, Mail, Clock, Calendar } from 'lucide-react';
import { animateShowroomPortal } from '../../utils/animation';

export function VisitGallerySection() {
  const { getSection } = useCMS();
  const data = getSection('visit_gallery');
  const [selectedShowroom, setSelectedShowroom] = useState(SHOWROOMS[0]);
  const [bookingOpen, setBookingOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = animateShowroomPortal(containerRef);
    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-28 md:py-36 bg-obsidian text-ivory border-b border-graphite-border overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Section Header with Staggered Entrance */}
        <div className="max-w-2xl mb-14 animate-section-header">
          <span className="eyebrow block mb-3 animate-section-eyebrow">{data.eyebrow || "FLAGSHIP SANCTUARIES"}</span>
          <h2 className="text-fluid-section font-serif font-light text-ivory mb-4 animate-section-title">
            {data.headline || "Experience in Person."}
          </h2>
          <p className="text-sm md:text-base text-stone font-sans leading-relaxed animate-section-body">
            {data.body_text || "Book a private 1-on-1 consultation with our senior architectural interior specialists."}
          </p>
        </div>

        {/* 3 City Selector Tabs */}
        <div className="flex items-center space-x-3 mb-10 overflow-x-auto pb-2 animate-showroom-tabs">
          {SHOWROOMS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedShowroom(s)}
              className={`px-6 py-3 text-xs uppercase tracking-widest font-sans transition-all border whitespace-nowrap ${
                selectedShowroom.id === s.id
                  ? 'bg-champagne text-obsidian border-champagne font-semibold shadow-lg'
                  : 'bg-graphite text-stone border-graphite-border hover:text-ivory'
              }`}
            >
              {s.city} Atelier
            </button>
          ))}
        </div>

        {/* Selected Showroom Showcase Card (Unfold Entrance) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-graphite border border-graphite-border overflow-hidden animate-showroom-card">
          {/* Left: Atmospheric Photography */}
          <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[500px]">
            <img
              src={selectedShowroom.image}
              alt={selectedShowroom.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent lg:hidden" />
          </div>

          {/* Right: Atelier Details & Booking Action */}
          <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="eyebrow text-champagne">{selectedShowroom.city} SANCTUARY</span>
              <h3 className="font-serif text-3xl md:text-4xl text-ivory">
                {selectedShowroom.name}
              </h3>
              <p className="text-xs text-stone leading-relaxed font-sans">
                {selectedShowroom.description}
              </p>

              <div className="space-y-3 pt-2 text-xs text-stone">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                  <span>{selectedShowroom.address}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-champagne shrink-0" />
                  <span>{selectedShowroom.hours}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-champagne shrink-0" />
                  <span>{selectedShowroom.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-champagne shrink-0" />
                  <span>{selectedShowroom.email}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-graphite-border space-y-3">
              <Button
                onClick={() => setBookingOpen(true)}
                variant="champagne"
                size="lg"
                className="w-full"
                icon={Calendar}
              >
                Schedule Private Showroom Visit
              </Button>
              <p className="text-[11px] text-center text-stone">
                Private appointments include complimentary material sample curation.
              </p>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialShowroom={selectedShowroom.name}
      />
    </section>
  );
}
