import React, { useState, useEffect } from 'react';
import { SHOWROOMS } from '../data/articles';
import { Button } from '../components/ui/Button';
import { BookingModal } from '../components/ui/BookingModal';
import { MapPin, Phone, Mail, Clock, Calendar } from 'lucide-react';

export function ShowroomPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-obsidian text-ivory pt-32 pb-24 border-b border-graphite-border">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="eyebrow block mb-3">GLOBAL SANCTUARIES</span>
          <h1 className="text-fluid-section font-serif font-light text-ivory mb-6">
            Flagship Showrooms.
          </h1>
          <p className="text-base md:text-lg text-stone leading-relaxed font-sans">
            Step into our architectural ateliers. Experience the tactile weight of European oak, the cool finish of Basque marble, and test our modular configurations in person.
          </p>
        </div>

        {/* 3 Showrooms List */}
        <div className="space-y-16">
          {SHOWROOMS.map((s, idx) => (
            <div
              key={s.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-graphite border border-graphite-border overflow-hidden"
            >
              <div className="lg:col-span-7 h-[360px] md:h-[460px] relative">
                <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
              </div>
              <div className="lg:col-span-5 p-8 md:p-12 space-y-6">
                <div>
                  <span className="eyebrow text-champagne">SANCTUARY 0{idx + 1} • {s.city}</span>
                  <h2 className="font-serif text-3xl md:text-4xl text-ivory mt-1 mb-3">{s.name}</h2>
                  <p className="text-xs text-stone leading-relaxed">{s.description}</p>
                </div>

                <div className="space-y-3 pt-2 text-xs text-stone">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                    <span>{s.address}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 text-champagne shrink-0" />
                    <span>{s.hours}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-champagne shrink-0" />
                    <span>{s.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-champagne shrink-0" />
                    <span>{s.email}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-graphite-border">
                  <Button
                    onClick={() => setBookingOpen(true)}
                    variant="champagne"
                    size="md"
                    className="w-full"
                    icon={Calendar}
                  >
                    Schedule Private Viewing
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </main>
  );
}
