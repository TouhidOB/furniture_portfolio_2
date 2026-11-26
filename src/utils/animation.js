import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

// Helper to check for reduced motion
export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Universal Section Header Animation
 * Elegantly reveals eyebrow, title, and body description on scroll
 */
export function animateSectionHeader(el, triggerEl = null) {
  if (!el || prefersReducedMotion()) return;
  const targetTrigger = triggerEl || el;

  const headerItems = el.querySelectorAll(
    '.animate-section-eyebrow, .animate-section-title, .animate-section-body, .animate-section-header > *'
  );

  if (headerItems.length > 0) {
    gsap.fromTo(
      headerItems,
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: targetTrigger,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  }
}

// -------------------------------------------------------------
// 14 DISTINCT ANIMATION TRANSITIONS FOR EVERY HOMEPAGE SECTION
// -------------------------------------------------------------

/**
 * Section 01: The Dark Reveal (Scroll-Pinned 3D Sequence)
 * Pins the hero so scrolling drives the 3D rotation across 360°,
 * then unpins and smoothly scrolls down to the next content.
 */
export function animateDarkReveal(containerRef, onScrollProgress) {
  if (!containerRef.current || prefersReducedMotion()) return null;
  const el = containerRef.current;
  const ctx = gsap.context(() => {
    // 1. Initial atmospheric reveal of text and UI elements
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      el.querySelectorAll('.animate-hero-eyebrow, .animate-hero-title'),
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: 1.1, stagger: 0.14 }
    )
      .fromTo(
        el.querySelector('.animate-hero-body'),
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.9 },
        '-=0.7'
      )
      .fromTo(
        el.querySelector('.animate-hero-stage'),
        { opacity: 0, scale: 0.94 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' },
        '-=0.8'
      )
      .fromTo(
        el.querySelectorAll('.animate-hero-cta, .animate-hero-swatch, .animate-hero-hud'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
        '-=0.7'
      );

    // 2. Scroll-Pinned 3D Rotation Sequence:
    // Pinned across 140vh so mouse wheel / trackpad scroll rotates the 3D model,
    // and once completed (100%), scrolling continues down to Section 02!
    ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: '+=130%',
      pin: true,
      pinSpacing: true,
      scrub: 1.2,
      onUpdate: (self) => {
        if (typeof onScrollProgress === 'function') {
          onScrollProgress(self.progress);
        }
      }
    });
  }, el);
  return ctx;
}

/**
 * Section 02: Enter the Maison
 * Architectural Corridor Scale-In & 3 Foundation Pillars Staggered 3D Tilt
 */
export function animateCorridorEntrance(containerRef) {
  if (!containerRef.current || prefersReducedMotion()) return null;
  const el = containerRef.current;
  const ctx = gsap.context(() => {
    animateSectionHeader(el);

    // Zoom & sharpen the architectural corridor image
    gsap.fromTo(
      el.querySelector('.animate-corridor-img'),
      { scale: 1.14, filter: 'blur(6px)' },
      {
        scale: 1.0,
        filter: 'blur(0px)',
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el.querySelector('.animate-corridor-wrap') || el,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );

    // Portal caption slide-in
    gsap.fromTo(
      el.querySelector('.animate-portal-caption'),
      { opacity: 0, x: -40 },
      {
        opacity: 1,
        x: 0,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el.querySelector('.animate-corridor-wrap') || el,
          start: 'top 75%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );

    // Stagger in the 3 Foundation pillars with 3D perspective tilt
    gsap.fromTo(
      el.querySelectorAll('.animate-pillar-card'),
      { opacity: 0, y: 45, rotateX: 14 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.0,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el.querySelector('.animate-pillars-wrap') || el,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  }, el);
  return ctx;
}

/**
 * Section 03: The Living Experience
 * Horizontal Curtain Wipe & Pulsing Hotspot Beacons Pop
 */
export function animateSalonCurtain(containerRef) {
  if (!containerRef.current || prefersReducedMotion()) return null;
  const el = containerRef.current;
  const ctx = gsap.context(() => {
    animateSectionHeader(el);

    // Room canvas curtain wipe from obsidian
    gsap.fromTo(
      el.querySelector('.animate-salon-canvas'),
      { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
      {
        opacity: 1,
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.4,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: el.querySelector('.animate-salon-canvas') || el,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );

    // Hotspot ping beacons pop with elastic bounce
    gsap.fromTo(
      el.querySelectorAll('.animate-hotspot-beacon'),
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.85,
        stagger: 0.14,
        ease: 'back.out(2.0)',
        scrollTrigger: {
          trigger: el.querySelector('.animate-salon-canvas') || el,
          start: 'top 70%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  }, el);
  return ctx;
}

/**
 * Section 04: Signature Sofa Spotlight
 * 3D Turntable Glide from Left & 4-Stage Anatomy Cascade from Right
 */
export function animateSofaAnatomy(containerRef) {
  if (!containerRef.current || prefersReducedMotion()) return null;
  const el = containerRef.current;
  const ctx = gsap.context(() => {
    animateSectionHeader(el);

    // 3D stage glides from left
    gsap.fromTo(
      el.querySelector('.animate-sofa-stage'),
      { opacity: 0, x: -75 },
      {
        opacity: 1,
        x: 0,
        duration: 1.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el.querySelector('.animate-sofa-stage') || el,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );

    // 4 anatomy cards cascade from right
    gsap.fromTo(
      el.querySelectorAll('.animate-anatomy-card'),
      { opacity: 0, x: 60 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el.querySelector('.animate-anatomy-wrap') || el,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  }, el);
  return ctx;
}

/**
 * Section 05: The Dining Gallery
 * Asymmetric Split Convergence: Table from Left, Companion Chair from Right
 */
export function animateDiningAsymmetry(containerRef) {
  if (!containerRef.current || prefersReducedMotion()) return null;
  const el = containerRef.current;
  const ctx = gsap.context(() => {
    animateSectionHeader(el);

    gsap.fromTo(
      el.querySelector('.animate-dining-left'),
      { opacity: 0, x: -75 },
      {
        opacity: 1,
        x: 0,
        duration: 1.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el.querySelector('.animate-dining-left') || el,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );

    gsap.fromTo(
      el.querySelector('.animate-dining-right'),
      { opacity: 0, x: 75 },
      {
        opacity: 1,
        x: 0,
        duration: 1.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el.querySelector('.animate-dining-right') || el,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  }, el);
  return ctx;
}

/**
 * Section 06: Material Intelligence
 * 3D Y-Axis Swatch Flip & Deep Dive Elevation
 */
export function animateMaterialFlip(containerRef) {
  if (!containerRef.current || prefersReducedMotion()) return null;
  const el = containerRef.current;
  const ctx = gsap.context(() => {
    animateSectionHeader(el);

    // 6 material buttons flip in with 3D rotation
    gsap.fromTo(
      el.querySelectorAll('.animate-material-swatch'),
      { opacity: 0, rotateY: -45, scale: 0.88 },
      {
        opacity: 1,
        rotateY: 0,
        scale: 1,
        duration: 0.85,
        stagger: 0.1,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: el.querySelector('.animate-material-swatch') || el,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );

    // Deep dive card smooth elevation
    gsap.fromTo(
      el.querySelector('.animate-material-preview'),
      { opacity: 0, y: 45, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el.querySelector('.animate-material-preview') || el,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  }, el);
  return ctx;
}

/**
 * Section 07: The Private Sanctuary
 * Moonlit Blur-to-Sharp Dissolve & Gentle Levitation Float
 */
export function animateSanctuaryDissolve(containerRef) {
  if (!containerRef.current || prefersReducedMotion()) return null;
  const el = containerRef.current;
  const ctx = gsap.context(() => {
    animateSectionHeader(el);

    // Floating bed plinth ascends smoothly
    gsap.fromTo(
      el.querySelector('.animate-sanctuary-stage'),
      { opacity: 0, y: 65, filter: 'blur(8px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el.querySelector('.animate-sanctuary-stage') || el,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );

    // Poetic quote fades in
    gsap.fromTo(
      el.querySelector('.animate-sanctuary-quote'),
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el.querySelector('.animate-sanctuary-quote') || el,
          start: 'top 75%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  }, el);
  return ctx;
}

/**
 * Section 08: The Icon Collection
 * Staggered 3D Matrix Entrance
 */
export function animateIconArchive(containerRef) {
  if (!containerRef.current || prefersReducedMotion()) return null;
  const el = containerRef.current;
  const ctx = gsap.context(() => {
    animateSectionHeader(el);

    gsap.fromTo(
      el.querySelectorAll('.animate-icon-card'),
      { opacity: 0, y: 55, scale: 0.94 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.95,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el.querySelector('.animate-icon-grid') || el,
          start: 'top 82%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  }, el);
  return ctx;
}

/**
 * Section 09: The Material Atelier
 * Studio Aperture Expand & Customizer Panel Slide
 */
export function animateAtelierAperture(containerRef) {
  if (!containerRef.current || prefersReducedMotion()) return null;
  const el = containerRef.current;
  const ctx = gsap.context(() => {
    animateSectionHeader(el);

    gsap.fromTo(
      el.querySelector('.animate-atelier-stage'),
      { opacity: 0, scale: 0.92 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el.querySelector('.animate-atelier-stage') || el,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );

    gsap.fromTo(
      el.querySelector('.animate-atelier-panel'),
      { opacity: 0, x: 65 },
      {
        opacity: 1,
        x: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el.querySelector('.animate-atelier-panel') || el,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  }, el);
  return ctx;
}

/**
 * Section 10: Craftsmanship Film
 * 16:9 Cinematic Expand from Center Letterbox
 */
export function animateCinematicLetterbox(containerRef) {
  if (!containerRef.current || prefersReducedMotion()) return null;
  const el = containerRef.current;
  const ctx = gsap.context(() => {
    animateSectionHeader(el);

    gsap.fromTo(
      el.querySelector('.animate-film-canvas'),
      { opacity: 0, scaleY: 0.7 },
      {
        opacity: 1,
        scaleY: 1.0,
        duration: 1.3,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el.querySelector('.animate-film-canvas') || el,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );

    gsap.fromTo(
      el.querySelectorAll('.animate-chapter-card'),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el.querySelector('.animate-chapters-grid') || el,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  }, el);
  return ctx;
}

/**
 * Section 11: Curated Collections
 * Asymmetric Diagonal Parallax Slide-In
 */
export function animateCollectionParallax(containerRef) {
  if (!containerRef.current || prefersReducedMotion()) return null;
  const el = containerRef.current;
  const ctx = gsap.context(() => {
    animateSectionHeader(el);

    const cards = el.querySelectorAll('.animate-collection-card');
    cards.forEach((card, idx) => {
      const isEven = idx % 2 === 0;
      gsap.fromTo(
        card,
        { opacity: 0, x: isEven ? -45 : 45, y: 35 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      );
    });
  }, el);
  return ctx;
}

/**
 * Section 12: Visit Showrooms
 * Flagship Gate Unfold & Atmospheric Reveal
 */
export function animateShowroomPortal(containerRef) {
  if (!containerRef.current || prefersReducedMotion()) return null;
  const el = containerRef.current;
  const ctx = gsap.context(() => {
    animateSectionHeader(el);

    gsap.fromTo(
      el.querySelector('.animate-showroom-tabs'),
      { opacity: 0, x: -35 },
      {
        opacity: 1,
        x: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el.querySelector('.animate-showroom-tabs') || el,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );

    gsap.fromTo(
      el.querySelector('.animate-showroom-card'),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el.querySelector('.animate-showroom-card') || el,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  }, el);
  return ctx;
}

/**
 * Section 13: Maison Journal
 * Magazine Stagger with Editorial Text Rise
 */
export function animateJournalEditorial(containerRef) {
  if (!containerRef.current || prefersReducedMotion()) return null;
  const el = containerRef.current;
  const ctx = gsap.context(() => {
    animateSectionHeader(el);

    gsap.fromTo(
      el.querySelectorAll('.animate-journal-card'),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el.querySelector('.animate-journal-grid') || el,
          start: 'top 82%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  }, el);
  return ctx;
}

/**
 * Section 14: Final Architectural Invitation
 * Monumental Scale-Down & Champagne Luminescence
 */
export function animateFinalMonument(containerRef) {
  if (!containerRef.current || prefersReducedMotion()) return null;
  const el = containerRef.current;
  const ctx = gsap.context(() => {
    gsap.fromTo(
      el.querySelector('.animate-final-bg'),
      { scale: 1.12 },
      {
        scale: 1.0,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );

    gsap.fromTo(
      el.querySelector('.animate-final-content'),
      { opacity: 0, y: 45 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  }, el);
  return ctx;
}
