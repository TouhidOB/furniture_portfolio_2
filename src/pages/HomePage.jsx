import React, { useEffect } from 'react';
import { ScrollTrigger } from '../utils/animation';
import { DarkRevealHero } from '../sections/home/DarkRevealHero';
import { EnterMaisonSection } from '../sections/home/EnterMaisonSection';
import { LivingExperienceSection } from '../sections/home/LivingExperienceSection';
import { SignatureSofaSection } from '../sections/home/SignatureSofaSection';
import { DiningGallerySection } from '../sections/home/DiningGallerySection';
import { MaterialIntelligenceSection } from '../sections/home/MaterialIntelligenceSection';
import { PrivateSanctuarySection } from '../sections/home/PrivateSanctuarySection';
import { IconCollectionSection } from '../sections/home/IconCollectionSection';
import { MaterialAtelierSection } from '../sections/home/MaterialAtelierSection';
import { CraftsmanshipFilmSection } from '../sections/home/CraftsmanshipFilmSection';
import { CuratedCollectionsSection } from '../sections/home/CuratedCollectionsSection';
import { VisitGallerySection } from '../sections/home/VisitGallerySection';
import { JournalSection } from '../sections/home/JournalSection';
import { FinalInvitationSection } from '../sections/home/FinalInvitationSection';

export function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    // Refresh ScrollTrigger calculations after initial DOM mount
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="bg-obsidian text-ivory">
      {/* 01: The Dark Reveal (Scroll-Pinned 3D Turntable) */}
      <DarkRevealHero />

      {/* 02: Enter the Maison */}
      <EnterMaisonSection />

      {/* 03: The Living Experience */}
      <LivingExperienceSection />

      {/* 04: Signature Sofa Spotlight */}
      <SignatureSofaSection />

      {/* 05: The Dining Gallery */}
      <DiningGallerySection />

      {/* 06: Material Intelligence */}
      <MaterialIntelligenceSection />

      {/* 07: The Private Sanctuary */}
      <PrivateSanctuarySection />

      {/* 08: The Icon Collection */}
      <IconCollectionSection />

      {/* 09: The Material Atelier */}
      <MaterialAtelierSection />

      {/* 10: Craftsmanship & Heritage */}
      <CraftsmanshipFilmSection />

      {/* 11: Curated Collections */}
      <CuratedCollectionsSection />

      {/* 12: Visit Our Showrooms */}
      <VisitGallerySection />

      {/* 13: Maison Journal */}
      <JournalSection />

      {/* 14: Final Architectural Invitation */}
      <FinalInvitationSection />
    </main>
  );
}
