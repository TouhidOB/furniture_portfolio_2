import React, { useState, useRef, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Button } from '../../components/ui/Button';
import { InquiryModal } from '../../components/ui/InquiryModal';
import { ArrowRight } from 'lucide-react';
import { animateFinalMonument } from '../../utils/animation';

export function FinalInvitationSection() {
  const { getSection } = useCMS();
  const data = getSection('final_invitation');
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = animateFinalMonument(containerRef);
    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-44 bg-obsidian text-ivory overflow-hidden"
    >
      {/* Background Architectural Atmosphere */}
      <div className="absolute inset-0 z-0">
        <img
          src={data.image_url || "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1600&q=85"}
          alt="Maison Noir Final Architectural Space"
          className="w-full h-full object-cover opacity-20 brightness-50 animate-final-bg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/90 to-obsidian" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8 animate-final-content">
        <span className="eyebrow inline-block border border-champagne/40 px-4 py-1 text-champagne">
          {data.eyebrow || "MAISON NOIR • PRIVATE COMMISSIONS"}
        </span>

        <h2 className="text-fluid-section font-serif font-light text-ivory leading-tight">
          {data.headline || "Begin Your Architectural Dialogue."}
        </h2>

        <p className="text-base md:text-xl text-stone max-w-2xl mx-auto font-sans leading-relaxed">
          {data.body_text || "Our design studio collaborates with private clients and architects worldwide on bespoke furniture commissions and landmark residential spaces."}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
          <Button
            onClick={() => setInquiryOpen(true)}
            variant="champagne"
            size="lg"
            icon={ArrowRight}
          >
            {data.primary_cta_label || "Initiate Private Inquiry"}
          </Button>

          <Button
            to="/collections"
            variant="obsidian"
            size="lg"
          >
            Browse Permanent Collection
          </Button>
        </div>

        <div className="pt-12 text-xs text-stone tracking-widest uppercase flex items-center justify-center space-x-6">
          <span>Kyoto Atelier</span>
          <span>•</span>
          <span>Copenhagen Studio</span>
          <span>•</span>
          <span>New York Gallery</span>
        </div>
      </div>

      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
      />
    </section>
  );
}
