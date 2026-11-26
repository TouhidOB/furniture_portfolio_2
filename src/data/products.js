export const PRODUCTS = [
  {
    id: 1,
    name: "Arc Lounge Chair",
    slug: "arc-lounge-chair",
    category: "living",
    collection: "arc-sanctuary",
    price: 3850,
    currency: "USD",
    tagline: "Sculptural poise meets ergonomic calm.",
    description: "A continuous steam-bent American walnut shell cradling deep raven aniline leather channel cushions. Hand-finished with architectural joinery and an oiled matte sheen.",
    editorialDescription: "The Arc Lounge Chair exists at the intersection of Japanese organic minimalism and Scandinavian craft discipline. Designed to be viewed from 360 degrees in open architectural spaces, its silhouette commands the room with effortless poise.",
    inStock: true,
    leadTime: "6 to 8 weeks",
    materials: [
      { id: "raven-leather", name: "Raven Semi-Aniline Leather", colorHex: "#1C1B1A", roughness: 0.72, metalness: 0.05 },
      { id: "cognac-leather", name: "Vintage Cognac Hide", colorHex: "#683E26", roughness: 0.65, metalness: 0.05 },
      { id: "ivory-boucle", name: "Warm Ivory Bouclé", colorHex: "#EDE7DC", roughness: 0.95, metalness: 0.0 }
    ],
    dimensions: {
      width: "88 cm",
      depth: "92 cm",
      height: "76 cm",
      seatHeight: "41 cm",
      seatDepth: "58 cm",
      weight: "32 kg"
    },
    features: [
      "Steam-bent sustainably harvested American black walnut frame",
      "Full-grain semi-aniline upholstery with water-resistant micro-finish",
      "Precision-milled matte black aluminum 360-degree swivel bearing",
      "Dual-density high-resilience foam core with duck-feather wrap"
    ],
    specifications: {
      origin: "Handcrafted in Kyoto, Japan",
      frame: "Solid American Walnut, FSC Certified",
      hardware: "Matte Black Anodized Aluminum",
      certifications: "GREENGUARD Gold Certified"
    },
    images: {
      primary: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1580481077195-c3c2f06b12a2?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=85"
      ],
      turntable_360: [
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1580481077195-c3c2f06b12a2?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=1200&q=85"
      ]
    },
    model3d: {
      type: "chair",
      initialRotation: [0, 0.4, 0],
      cameraPosition: [0, 0.5, 3.2]
    }
  },
  {
    id: 2,
    name: "Forma Modular Sofa",
    slug: "forma-modular-sofa",
    category: "living",
    collection: "monolith-collection",
    price: 8400,
    currency: "USD",
    tagline: "Expansive landscape for architectural living rooms.",
    description: "Monolithic proportions cushioned in Belgian linen and bouclé with a hidden smoked oak recessed base. Configurable in over 16 seating layouts.",
    editorialDescription: "The Forma Modular Sofa is grounded by clean rectilinear geometry and subterranean warmth. Each module locks invisibly into place, offering infinite freedom to shape the conversation in grand residential salons.",
    inStock: true,
    leadTime: "8 to 10 weeks",
    materials: [
      { id: "ivory-boucle", name: "Warm Ivory Bouclé", colorHex: "#EDE8DD", roughness: 0.95, metalness: 0.0 },
      { id: "charcoal-linen", name: "Charcoal Raw Linen", colorHex: "#222224", roughness: 0.88, metalness: 0.0 },
      { id: "walnut-leather", name: "Oiled Saddle Leather", colorHex: "#543826", roughness: 0.68, metalness: 0.05 }
    ],
    dimensions: {
      width: "320 cm",
      depth: "180 cm",
      height: "68 cm",
      seatHeight: "39 cm",
      seatDepth: "72 cm",
      weight: "115 kg"
    },
    features: [
      "Interlocking modular elements with heavy-gauge concealed steel brackets",
      "Pocket-coil spring core with organic latex and duck-feather topper",
      "FSC-certified kiln-dried Scandinavian birch internal timber structure",
      "Fully removable tailored upholstery covers for dry maintenance"
    ],
    specifications: {
      origin: "Crafted in Copenhagen, Denmark",
      frame: "Solid Kiln-Dried European Birch & Smoked Oak Base",
      upholstery: "Heavyweight Flemish Bouclé (800g/m²)",
      fireRating: "CAL 117-2013 / BS 5852"
    },
    images: {
      primary: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1493663284041-c5138276e5a3?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85"
      ],
      turntable_360: [
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1493663284041-c5138276e5a3?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85"
      ]
    },
    model3d: {
      type: "sofa",
      initialRotation: [0, -0.3, 0],
      cameraPosition: [0, 0.8, 4.2]
    }
  },
  {
    id: 3,
    name: "Terra Dining Table",
    slug: "terra-dining-table",
    category: "dining",
    collection: "brutalist-craft",
    price: 6200,
    currency: "USD",
    tagline: "Solid French oak gathered around shared ritual.",
    description: "Centuries-old oak timber resting upon twin monolithic cylindrical bases. Wire-brushed and sealed with an organic matte wax for tactile depth.",
    editorialDescription: "A gathering piece of unapologetic scale. The Terra table celebrates every cleft, knot, and growth ring of ancient European timber, contrasting raw wood density with sculptural precision.",
    inStock: true,
    leadTime: "6 to 8 weeks",
    materials: [
      { id: "natural-oak", name: "Wire-Brushed Natural Oak", colorHex: "#B89B77", roughness: 0.82, metalness: 0.0 },
      { id: "charred-ash", name: "Charred Shou Sugi Ban Ash", colorHex: "#1E1E1E", roughness: 0.78, metalness: 0.0 },
      { id: "smoked-walnut", name: "Oiled American Walnut", colorHex: "#5E3E2B", roughness: 0.75, metalness: 0.0 }
    ],
    dimensions: {
      width: "280 cm",
      depth: "110 cm",
      height: "75 cm",
      clearance: "71 cm",
      weight: "140 kg"
    },
    features: [
      "Single-origin solid French oak top with soft pillowed edge profile",
      "Dual hollow-core architectural timber cylinder bases for maximum leg freedom",
      "Thermal expansion relief channels engineered into underside",
      "Seats 10 guests with generous elbow spacing"
    ],
    specifications: {
      origin: "Crafted in Bourgogne, France",
      top: "45mm Solid Quarter-Sawn French White Oak",
      finish: "Organic Zero-VOC Matte Hardwax Oil",
      capacity: "10 to 12 seats"
    },
    images: {
      primary: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1200&q=85"
      ]
    },
    model3d: {
      type: "table",
      initialRotation: [0, 0.5, 0],
      cameraPosition: [0, 1.2, 4.0]
    }
  },
  {
    id: 4,
    name: "Aura Dining Chair",
    slug: "aura-dining-chair",
    category: "dining",
    collection: "arc-sanctuary",
    price: 1450,
    currency: "USD",
    tagline: "Weightless cantilever in patinated brass and bridle leather.",
    description: "An airy architectural silhouette featuring a curved steam-bent backrest, saddle-stitched hide seat, and champagne brass structural joinery.",
    editorialDescription: "Lightness achieved through rigorous engineering. The Aura chair supports prolonged dinner dialogues with intuitive lumbar poise and silent elegance.",
    inStock: true,
    leadTime: "4 to 6 weeks",
    materials: [
      { id: "raven-leather", name: "Raven Bridle Leather", colorHex: "#161616", roughness: 0.65, metalness: 0.05 },
      { id: "sand-linen", name: "Natural Flax Linen", colorHex: "#D8CEBE", roughness: 0.90, metalness: 0.0 },
      { id: "cognac-leather", name: "Chestnut Bridle Hide", colorHex: "#5E3924", roughness: 0.65, metalness: 0.05 }
    ],
    dimensions: {
      width: "56 cm",
      depth: "54 cm",
      height: "78 cm",
      seatHeight: "46 cm",
      weight: "9.5 kg"
    },
    features: [
      "Steam-curved solid ash backrest hand-shaped by master woodturners",
      "Vegetable-tanned full-grain saddle leather seat with contrast edge paint",
      "Brushed champagne brass cross-stretchers with hidden mechanical locking",
      "Stackable up to 4 chairs with included protective felt sleeves"
    ],
    specifications: {
      origin: "Crafted in Brianza, Italy",
      frame: "Solid Ash and Solid Champagne Brass",
      leather: "Tuscan Vegetable-Tanned Full Grain",
      weightLimit: "160 kg"
    },
    images: {
      primary: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1580481077195-c3c2f06b12a2?auto=format&fit=crop&w=1200&q=85"
      ]
    },
    model3d: {
      type: "chair",
      initialRotation: [0, -0.6, 0],
      cameraPosition: [0, 0.4, 2.5]
    }
  },
  {
    id: 5,
    name: "Eos Floating Platform Bed",
    slug: "eos-floating-bed",
    category: "bedroom",
    collection: "nocturne-edition",
    price: 5900,
    currency: "USD",
    tagline: "Stillness begins where clutter ends.",
    description: "A low floating platform bed crafted in charred ash timber and Belgian raw linen, engineered with recessed cantilever plinth and integrated ambient night ledges.",
    editorialDescription: "The Eos Bed transforms sleep into sanctuary. Levitating subtly above the floor plane, its extended perimeter ledge eliminates bedside clutter while inviting contemplative calm.",
    inStock: true,
    leadTime: "6 to 8 weeks",
    materials: [
      { id: "charred-ash", name: "Charred Shou Sugi Ban Ash", colorHex: "#1C1C1D", roughness: 0.85, metalness: 0.0 },
      { id: "natural-oak", name: "Bleached Scandinavian Oak", colorHex: "#CFBEA5", roughness: 0.80, metalness: 0.0 },
      { id: "smoked-walnut", name: "Smoked American Walnut", colorHex: "#523624", roughness: 0.72, metalness: 0.0 }
    ],
    dimensions: {
      width: "220 cm",
      depth: "235 cm",
      height: "82 cm",
      platformHeight: "26 cm",
      weight: "128 kg"
    },
    features: [
      "Recessed plinth base creating effortless 80mm levitation effect",
      "Flexible multi-zone sprung beechwood European slat foundation",
      "Removable cushioned raw linen headboard with double-stitched perimeter",
      "Integrated side wings accommodating wireless charging and hidden conduits"
    ],
    specifications: {
      origin: "Crafted in Kyoto, Japan",
      timber: "Kiln-Dried Ash & Solid Beech Slats",
      headboard: "Natural Belgian Flax Linen",
      mattressFit: "Standard King (193 x 203 cm) & Cal King"
    },
    images: {
      primary: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1540518614846-7ede433c4ef5?auto=format&fit=crop&w=1200&q=85"
      ]
    },
    model3d: {
      type: "bed",
      initialRotation: [0, 0.4, 0],
      cameraPosition: [0, 1.2, 4.5]
    }
  },
  {
    id: 6,
    name: "Linear Fluted Credenza",
    slug: "linear-fluted-credenza",
    category: "living",
    collection: "brutalist-craft",
    price: 4950,
    currency: "USD",
    tagline: "Rhythmic fluting concealing high-fidelity storage.",
    description: "CNC-milled solid walnut tambour doors sliding seamlessly along solid brass tracks. Nero Marquina marble top and soft-close acoustic interior drawers.",
    editorialDescription: "Shadow creates depth along the credenza's rhythmic vertical ridges. As daylight shifts across the room, the surface dances between obsidian shade and warm timber glow.",
    inStock: true,
    leadTime: "6 to 7 weeks",
    materials: [
      { id: "oiled-walnut", name: "American Black Walnut", colorHex: "#543725", roughness: 0.74, metalness: 0.0 },
      { id: "ebonized-oak", name: "Ebonized European Oak", colorHex: "#1F1F1F", roughness: 0.82, metalness: 0.0 }
    ],
    dimensions: {
      width: "210 cm",
      depth: "48 cm",
      height: "72 cm",
      weight: "98 kg"
    },
    features: [
      "Continuous fluted tambour doors with silent magnetic catches",
      "Solid 20mm honed Nero Marquina Spanish marble top slab",
      "Integrated audio cable chases and passive thermal ventilation slots",
      "Velvet-lined soft-close dovetail drawer boxes"
    ],
    specifications: {
      origin: "Crafted in Porto, Portugal",
      timber: "American Walnut & Nero Marquina Marble",
      hardware: "Blum Motion Undermount Glides",
      finish: "Hand-Applied Organic Matte Oil"
    },
    images: {
      primary: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=85"
      ]
    },
    model3d: {
      type: "cabinet",
      initialRotation: [0, 0.2, 0],
      cameraPosition: [0, 0.6, 3.5]
    }
  },
  {
    id: 7,
    name: "Monolith Coffee Table",
    slug: "monolith-coffee-table",
    category: "living",
    collection: "monolith-collection",
    price: 3400,
    currency: "USD",
    tagline: "Solid sculpted Nero Marquina marble.",
    description: "Chiseled from a single block of Spanish marble with honed matte finish, chamfered edge details, and recessed shadowline base.",
    editorialDescription: "A monument of tectonic serenity. The dramatic white veining of Spanish Nero Marquina creates an organic canvas at the center of the living room.",
    inStock: true,
    leadTime: "4 to 6 weeks",
    materials: [
      { id: "nero-marquina", name: "Honed Nero Marquina Marble", colorHex: "#1A1A1A", roughness: 0.35, metalness: 0.1 },
      { id: "sand-travertine", name: "Roman Sand Travertine", colorHex: "#CCC0A8", roughness: 0.65, metalness: 0.0 }
    ],
    dimensions: {
      width: "140 cm",
      depth: "80 cm",
      height: "32 cm",
      weight: "110 kg"
    },
    features: [
      "Honed matte seal preserving natural stone coolness without synthetic gloss",
      "Hand-chamfered 45-degree edge detailing",
      "Reinforced composite core reducing overall weight while ensuring structural rigidity",
      "Felt glider pads to protect hardwood floors"
    ],
    specifications: {
      origin: "Quarried and milled in Basque Country, Spain",
      material: "Spanish Nero Marquina Marble",
      finish: "Deep Penetrating Matte Oleophobic Sealant",
      maintenance: "pH-neutral natural stone cleanser"
    },
    images: {
      primary: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=85"
      ]
    },
    model3d: {
      type: "table",
      initialRotation: [0, -0.4, 0],
      cameraPosition: [0, 0.8, 2.8]
    }
  },
  {
    id: 8,
    name: "Kyoto Cantilever Desk",
    slug: "kyoto-cantilever-desk",
    category: "workspace",
    collection: "brutalist-craft",
    price: 5200,
    currency: "USD",
    tagline: "Clarity of thought carved into monolithic timber.",
    description: "An architectural workspace featuring an asymmetrical cantilevered writing slab, hidden magnetic wire conduits, and saddle leather blotter inlay.",
    editorialDescription: "Designed for the focused creator. Uncluttered lines, concealed cable management, and tactile leather bring intentional calm to the executive study.",
    inStock: true,
    leadTime: "6 to 8 weeks",
    materials: [
      { id: "charred-ash", name: "Charred Shou Sugi Ban Ash", colorHex: "#1E1E1F", roughness: 0.82, metalness: 0.0 },
      { id: "american-walnut", name: "American Walnut", colorHex: "#5A3D2A", roughness: 0.74, metalness: 0.0 }
    ],
    dimensions: {
      width: "190 cm",
      depth: "85 cm",
      height: "75 cm",
      weight: "86 kg"
    },
    features: [
      "Precision counterweighted structural cantilever tested up to 200 kg load",
      "Full-width recessed Italian bridle leather writing pad inlay",
      "CNC-routed internal cable conduits with magnetic wooden access hatch",
      "Dual hidden shallow felt-lined organizer drawers"
    ],
    specifications: {
      origin: "Handcrafted in Kyoto, Japan",
      timber: "FSC Certified Ash & Solid Champagne Brass Trim",
      inlay: "Top-Grain Italian Tuscan Hide",
      warranty: "10-Year Structural Guarantee"
    },
    images: {
      primary: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=85"
      ]
    },
    model3d: {
      type: "table",
      initialRotation: [0, 0.3, 0],
      cameraPosition: [0, 0.8, 3.4]
    }
  },
  {
    id: 9,
    name: "Soma Ergonomic Task Chair",
    slug: "soma-task-chair",
    category: "workspace",
    collection: "arc-sanctuary",
    price: 2650,
    currency: "USD",
    tagline: "Active ergonomic poise draped in understated luxury.",
    description: "Weight-activated synchron mechanism housed within a sculpted walnut armature and breathable perforated semi-aniline leather cushions.",
    editorialDescription: "Unlike technical plastic office seating, the Soma integrates seamlessly into residential architecture without sacrificing clinical orthopedic support.",
    inStock: true,
    leadTime: "3 to 4 weeks",
    materials: [
      { id: "raven-leather", name: "Perforated Raven Leather", colorHex: "#181818", roughness: 0.65, metalness: 0.05 },
      { id: "cognac-leather", name: "Perforated Cognac Leather", colorHex: "#6B4228", roughness: 0.65, metalness: 0.05 }
    ],
    dimensions: {
      width: "66 cm",
      depth: "66 cm",
      height: "98-108 cm",
      seatHeight: "44-54 cm",
      weight: "24 kg"
    },
    features: [
      "Patented auto-balancing synchro-tilt mechanism requiring no clunky knobs",
      "Continuous lumbar curve sculpted from 12-ply molded walnut",
      "Soft-tread urethane casters safe for natural hardwoods and stone",
      "Breathable dot-perforated natural leather seat pad"
    ],
    specifications: {
      origin: "Assembled in Stuttgart, Germany",
      mechanism: "Italian Donati Self-Weighing Synchro",
      base: "Die-Cast Matte Black Powder-Coated Aluminum",
      certifications: "BIFMA X5.1 / EN 1335"
    },
    images: {
      primary: "https://images.unsplash.com/photo-1580481077195-c3c2f06b12a2?auto=format&fit=crop&w=1200&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=85"
      ]
    },
    model3d: {
      type: "chair",
      initialRotation: [0, -0.4, 0],
      cameraPosition: [0, 0.5, 2.8]
    }
  },
  {
    id: 10,
    name: "Vesper Nightstand Pair",
    slug: "vesper-nightstand",
    category: "bedroom",
    collection: "nocturne-edition",
    price: 2400,
    currency: "USD",
    tagline: "Silent bedside companions in smoked walnut and brass.",
    description: "Sold as an asymmetrical mirrored pair. Soft-close drawers lined with suede, integrated touch dimming, and travertine top inset.",
    editorialDescription: "The Vesper Nightstands frame the bed with refined symmetry, keeping evening essentials concealed in silent luxury.",
    inStock: true,
    leadTime: "4 to 5 weeks",
    materials: [
      { id: "smoked-walnut", name: "Smoked American Walnut", colorHex: "#523624", roughness: 0.72, metalness: 0.0 },
      { id: "charred-ash", name: "Charred Ash", colorHex: "#1B1B1C", roughness: 0.82, metalness: 0.0 }
    ],
    dimensions: {
      width: "55 cm",
      depth: "45 cm",
      height: "48 cm",
      weight: "22 kg (each)"
    },
    features: [
      "Honed Roman Travertine top tray flush with timber rim",
      "Hidden cable port for wireless charger pads",
      "Italian push-to-open soft closing undermount glides",
      "Sold as a coordinated left and right pair"
    ],
    specifications: {
      origin: "Crafted in Porto, Portugal",
      timber: "Smoked American Walnut Veneer on Birch Ply Core",
      top: "15mm Roman Travertine Inset",
      includes: "Set of 2 nightstands"
    },
    images: {
      primary: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef5?auto=format&fit=crop&w=1200&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85"
      ]
    },
    model3d: {
      type: "cabinet",
      initialRotation: [0, 0.4, 0],
      cameraPosition: [0, 0.4, 2.2]
    }
  },
  {
    id: 11,
    name: "Solstice Dining Bench",
    slug: "solstice-dining-bench",
    category: "dining",
    collection: "brutalist-craft",
    price: 2850,
    currency: "USD",
    tagline: "Solid oak monolithic bench with bridle leather cushion.",
    description: "Pairs seamlessly with the Terra Dining Table. Quarter-sawn oak construction with removable pinned leather bolster roll.",
    editorialDescription: "Bringing communal warmth to formal dining. The Solstice bench invites intimate informal seating without interrupting architectural sightlines.",
    inStock: true,
    leadTime: "4 to 6 weeks",
    materials: [
      { id: "natural-oak", name: "Wire-Brushed White Oak", colorHex: "#B89B77", roughness: 0.82, metalness: 0.0 },
      { id: "charred-ash", name: "Charred Shou Sugi Ban Ash", colorHex: "#1E1E1E", roughness: 0.78, metalness: 0.0 }
    ],
    dimensions: {
      width: "220 cm",
      depth: "42 cm",
      height: "46 cm",
      weight: "46 kg"
    },
    features: [
      "Single-span solid French oak slab with through-tenon joint accents",
      "Removable full-grain leather cushion secured by brass anchor pins",
      "Seats 3 to 4 adults comfortably",
      "Tuck under table design for space optimization"
    ],
    specifications: {
      origin: "Crafted in Bourgogne, France",
      timber: "Quarter-Sawn European White Oak",
      hardware: "Turned Champagne Brass Pins",
      weightCapacity: "380 kg"
    },
    images: {
      primary: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1200&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=85"
      ]
    },
    model3d: {
      type: "table",
      initialRotation: [0, 0.2, 0],
      cameraPosition: [0, 0.5, 3.0]
    }
  },
  {
    id: 12,
    name: "Onyx Lounge Daybed",
    slug: "onyx-lounge-daybed",
    category: "living",
    collection: "nocturne-edition",
    price: 4600,
    currency: "USD",
    tagline: "A low-slung architectural respite.",
    description: "Saddled bridle straps holding a single tailored cushion over an ebonized ash frame with brushed brass cylindrical feet.",
    editorialDescription: "Placed before floor-to-ceiling glass or defining the center of an art gallery, the Onyx Daybed invites pause and horizontal contemplation.",
    inStock: true,
    leadTime: "6 to 8 weeks",
    materials: [
      { id: "raven-leather", name: "Raven Semi-Aniline Leather", colorHex: "#1B1A19", roughness: 0.70, metalness: 0.05 },
      { id: "ivory-boucle", name: "Warm Ivory Bouclé", colorHex: "#ECE6DB", roughness: 0.94, metalness: 0.0 }
    ],
    dimensions: {
      width: "205 cm",
      depth: "85 cm",
      height: "42 cm",
      weight: "58 kg"
    },
    features: [
      "Hand-woven full-grain leather lattice suspension underframe",
      "Removable head roll bolster with counterweighted brass pendulum",
      "Solid ash timber finished in black vegetable ink and bees wax",
      "Precision-machined solid brass feet with protective felt inserts"
    ],
    specifications: {
      origin: "Crafted in Copenhagen, Denmark",
      frame: "Solid European Ash & Solid Brass",
      leather: "Swedish Elmo Leather",
      cushion: "Natural Latex & Down Cluster Blend"
    },
    images: {
      primary: "https://images.unsplash.com/photo-1493663284041-c5138276e5a3?auto=format&fit=crop&w=1200&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85"
      ]
    },
    model3d: {
      type: "bed",
      initialRotation: [0, 0.3, 0],
      cameraPosition: [0, 0.7, 3.6]
    }
  }
];

export const CATEGORIES = [
  { id: "all", name: "All Pieces", count: 18 },
  { id: "living", name: "Living Room", count: 6 },
  { id: "dining", name: "Dining Room", count: 4 },
  { id: "bedroom", name: "Bedroom", count: 4 },
  { id: "workspace", name: "Workspace", count: 4 },
];
