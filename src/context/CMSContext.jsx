import React, { createContext, useContext, useState, useEffect } from 'react';

const CMSContext = createContext(null);

const DEFAULT_SECTIONS = {
  dark_reveal: {
    section_name: "The Dark Reveal",
    eyebrow: "MAISON NOIR — COLLECTION 2026",
    headline: "A New Perspective on Living.",
    subheadline: "Objects of Desire. Spaces of Meaning.",
    body_text: "Discover a world where architectural discipline and artisanal soul transform the spaces we inhabit.",
    primary_cta_label: "Enter the Collection",
    primary_cta_url: "/collections",
    secondary_cta_label: "Explore Our Philosophy",
    secondary_cta_url: "/our-story",
    background_color: "#101010",
    text_color: "#EEE8DD",
    accent_color: "#C6A878",
    image_url: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1600&q=85",
    is_active: true
  },
  enter_maison: {
    section_name: "Enter the Maison",
    eyebrow: "ARCHITECTURAL PASSAGE",
    headline: "Cross the Threshold.",
    subheadline: "A sanctuary carved from silence and shadow.",
    body_text: "Step through a rhythmic sequence of smoked glass, brushed brass portals, and monolithic timber. Every corner is designed to decelerate the senses.",
    primary_cta_label: "Walk the Corridor",
    primary_cta_url: "/collections",
    background_color: "#141414",
    text_color: "#EEE8DD",
    accent_color: "#C6A878",
    image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    is_active: true
  },
  living_experience: {
    section_name: "The Living Experience",
    eyebrow: "CURATED RESIDENCE",
    headline: "The Grand Salon.",
    subheadline: "Interactive architectural living.",
    body_text: "Explore our signature living collection in situ. Touch any glowing hotspot to inspect materials, joinery details, and dimensions.",
    primary_cta_label: "View Living Collection",
    primary_cta_url: "/collections?category=living",
    background_color: "#101010",
    text_color: "#EEE8DD",
    accent_color: "#C6A878",
    image_url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=85",
    is_active: true
  },
  signature_sofa: {
    section_name: "Signature Sofa Spotlight",
    eyebrow: "SCULPTURAL ANCHOR",
    headline: "Forma Modular Sofa.",
    subheadline: "Monolithic proportions in Belgian raw linen.",
    body_text: "Engineered with interlocking modules, a recessed smoked oak plinth, and dual-density down channeling. Built to anchor the conversation in landmark homes.",
    primary_cta_label: "Discover Forma",
    primary_cta_url: "/products/forma-modular-sofa",
    background_color: "#121212",
    text_color: "#EEE8DD",
    accent_color: "#C6A878",
    image_url: "https://images.unsplash.com/photo-1493663284041-c5138276e5a3?auto=format&fit=crop&w=1600&q=85",
    is_active: true
  },
  dining_gallery: {
    section_name: "The Dining Gallery",
    eyebrow: "SHARED RITUAL",
    headline: "Gathering Around Substance.",
    subheadline: "The Terra Table & Aura Cantilever Chairs.",
    body_text: "Solid Bourgogne white oak timber resting on twin cylinder monoliths. A dining setting engineered for memorable hours of human connection.",
    primary_cta_label: "Explore Dining Pieces",
    primary_cta_url: "/collections?category=dining",
    background_color: "#161616",
    text_color: "#EEE8DD",
    accent_color: "#C6A878",
    image_url: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=85",
    is_active: true
  },
  material_intelligence: {
    section_name: "Material Intelligence",
    eyebrow: "TACTILE RIGOR",
    headline: "Honesty in Every Grain.",
    subheadline: "Nothing artificial. Nothing concealed.",
    body_text: "Inspect our palette of Nero Marquina marble, charred Shou Sugi Ban ash, Belgian flax linen, and Tuscan semi-aniline leather.",
    primary_cta_label: "Order Material Samples",
    primary_cta_url: "/materials",
    background_color: "#101010",
    text_color: "#EEE8DD",
    accent_color: "#C6A878",
    image_url: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1600&q=85",
    is_active: true
  },
  private_sanctuary: {
    section_name: "The Private Sanctuary",
    eyebrow: "BEDROOM SUITE",
    headline: "Rest, Reimagined.",
    subheadline: "The Eos Floating Platform Bed.",
    body_text: "Stillness begins where clutter ends. A low floating timber bed crafted in raw ash with an integrated perimeter shadowline.",
    primary_cta_label: "Enter Sanctuary",
    primary_cta_url: "/products/eos-floating-bed",
    background_color: "#141414",
    text_color: "#EEE8DD",
    accent_color: "#C6A878",
    image_url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=85",
    is_active: true
  },
  icon_collection: {
    section_name: "The Icon Collection",
    eyebrow: "PERMANENT ARCHIVE",
    headline: "Pieces That Defy Trend.",
    subheadline: "Six signature archetypes of modern design.",
    body_text: "Explore the masterworks defining Maison Noir across living, dining, and workspace environments.",
    primary_cta_label: "Browse Archive",
    primary_cta_url: "/collections",
    background_color: "#101010",
    text_color: "#EEE8DD",
    accent_color: "#C6A878",
    image_url: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1600&q=85",
    is_active: true
  },
  material_atelier: {
    section_name: "The Material Atelier",
    eyebrow: "CUSTOM ATELIER",
    headline: "Configure in Real Time.",
    subheadline: "Tailored to your architectural palette.",
    body_text: "Select bespoke finishes, examine live 3D surface reflections, and visualize custom upholstery choices in photorealistic detail.",
    primary_cta_label: "Launch Configurator",
    primary_cta_url: "/products/arc-lounge-chair",
    background_color: "#181818",
    text_color: "#EEE8DD",
    accent_color: "#C6A878",
    image_url: "https://images.unsplash.com/photo-1580481077195-c3c2f06b12a2?auto=format&fit=crop&w=1600&q=85",
    is_active: true
  },
  craftsmanship_film: {
    section_name: "Craftsmanship & Heritage",
    eyebrow: "DOCUMENTARY",
    headline: "The Art of Slow Making.",
    subheadline: "Human hands, enduring materials.",
    body_text: "Witness our artisans in Kyoto and Copenhagen shaping solid timber, hand-buffing saddle leather, and honing Spanish marble.",
    primary_cta_label: "Watch Film",
    primary_cta_url: "/our-story",
    background_color: "#101010",
    text_color: "#EEE8DD",
    accent_color: "#C6A878",
    image_url: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1600&q=85",
    is_active: true
  },
  curated_collections: {
    section_name: "Curated Collections",
    eyebrow: "SERIES EXPLORATION",
    headline: "Cohesive Design Universes.",
    subheadline: "Four distinct aesthetic philosophies.",
    body_text: "From brutalist solid oak to organic steam-bent walnut and minimalist nighttime sanctuaries.",
    primary_cta_label: "Explore All Series",
    primary_cta_url: "/collections",
    background_color: "#141414",
    text_color: "#EEE8DD",
    accent_color: "#C6A878",
    image_url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=85",
    is_active: true
  },
  visit_gallery: {
    section_name: "Visit Our Showrooms",
    eyebrow: "FLAGSHIP SANCTUARIES",
    headline: "Experience in Person.",
    subheadline: "Copenhagen • Kyoto • New York",
    body_text: "Book a private 1-on-1 consultation with our senior architectural interior specialists.",
    primary_cta_label: "Schedule Private Viewing",
    primary_cta_url: "/showroom",
    background_color: "#101010",
    text_color: "#EEE8DD",
    accent_color: "#C6A878",
    image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    is_active: true
  },
  journal: {
    section_name: "Maison Journal",
    eyebrow: "EDITORIAL VOICES",
    headline: "The Journal.",
    subheadline: "Essays on space, silence, and form.",
    body_text: "Thoughtful dialogues with leading architects, material histories, and interior philosophy.",
    primary_cta_label: "Read All Articles",
    primary_cta_url: "/journal",
    background_color: "#141414",
    text_color: "#EEE8DD",
    accent_color: "#C6A878",
    image_url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=85",
    is_active: true
  },
  final_invitation: {
    section_name: "Final Architectural Invitation",
    eyebrow: "MAISON NOIR",
    headline: "Begin Your Architectural Dialogue.",
    subheadline: "Bespoke commissions and residential consultation.",
    body_text: "Our design studio collaborates with private clients and architects worldwide on bespoke furniture commissions.",
    primary_cta_label: "Initiate Private Inquiry",
    primary_cta_url: "/contact",
    background_color: "#101010",
    text_color: "#EEE8DD",
    accent_color: "#C6A878",
    image_url: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1600&q=85",
    is_active: true
  }
};

export const CMSProvider = ({ children }) => {
  const [sections, setSections] = useState(DEFAULT_SECTIONS);
  const [theme, setTheme] = useState({
    theme_name: "Maison Obsidian Luxury",
    primary_color: "#101010",
    secondary_color: "#242424",
    accent_color: "#C6A878",
    text_color: "#EEE8DD",
    hero_headline_font_size: "clamp(48px, 9vw, 136px)",
    body_font_size: "16px"
  });
  const [loading, setLoading] = useState(true);

  // Fetch sections and theme from Django API
  useEffect(() => {
    async function loadCMSData() {
      try {
        const secRes = await fetch('/api/cms/sections/');
        if (secRes.ok) {
          const secData = await secRes.json();
          if (Array.isArray(secData) && secData.length > 0) {
            const mapped = { ...DEFAULT_SECTIONS };
            secData.forEach(item => {
              mapped[item.section_key] = item;
            });
            setSections(mapped);
          }
        }
      } catch (err) {
        console.warn('Backend sections not reachable, using luxury defaults:', err);
      }

      try {
        const themeRes = await fetch('/api/cms/theme/');
        if (themeRes.ok) {
          const themeData = await themeRes.json();
          if (themeData && themeData.primary_color) {
            setTheme(themeData);
          }
        }
      } catch (err) {
        console.warn('Backend theme not reachable, using default theme');
      } finally {
        setLoading(false);
      }
    }
    loadCMSData();
  }, []);

  const getSection = (key) => {
    return sections[key] || DEFAULT_SECTIONS[key] || {};
  };

  const updateSection = async (key, updatedFields) => {
    // Optimistic UI update
    setSections(prev => ({
      ...prev,
      [key]: {
        ...(prev[key] || DEFAULT_SECTIONS[key]),
        ...updatedFields
      }
    }));

    // Send PUT / PATCH to Django backend
    try {
      const target = sections[key];
      const method = target && target.id ? 'PUT' : 'POST';
      const url = target && target.id ? `/api/cms/sections/${target.id}/` : '/api/cms/sections/';
      
      const payload = {
        section_key: key,
        section_name: updatedFields.section_name || target?.section_name || key,
        ...updatedFields
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const saved = await res.json();
        setSections(prev => ({ ...prev, [key]: saved }));
        return true;
      }
    } catch (e) {
      console.error('Failed to sync section update to backend:', e);
    }
    return false;
  };

  const updateTheme = async (updatedTheme) => {
    setTheme(prev => ({ ...prev, ...updatedTheme }));
    try {
      const res = await fetch('/api/cms/theme/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTheme)
      });
      return res.ok;
    } catch (e) {
      console.error('Failed to sync theme update to backend:', e);
      return false;
    }
  };

  return (
    <CMSContext.Provider value={{ sections, theme, getSection, updateSection, updateTheme, loading }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
