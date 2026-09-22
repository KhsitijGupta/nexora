export const BRAND_DATA = {
  name: "NEXORA",
  tagline: "TIME, REIMAGINED.",
  label: "THE FUTURE OF TIME",
  heroHeading: "TIME, \nREIMAGINED.",
  heroDescription: "A precision-crafted timepiece where mechanical elegance meets modern technology. Engineered for collectors who shape the future.",
  heroStats: [
    { label: "FREQUENCY", value: "28,800 VPH" },
    { label: "RESERVE", value: "72 HOURS" },
    { label: "ACCURACY", value: "±2 SEC/DAY" },
  ]
};

export const NAV_LINKS = [
  { label: "Collection", href: "#collection" },
  { label: "Technology", href: "#technology" },
  { label: "Design", href: "#explorer" },
  { label: "Inside Out", href: "#components" },
  { label: "Customizer", href: "#customizer" },
  { label: "Specifications", href: "#specifications" },
];

export const STORY_STAGES = [
  {
    id: 1,
    title: "ENGINEERED FOR EVERY SECOND",
    subtitle: "PERFECTION IN MOTION",
    description: "Every curve, surface, and angle is sculpted through five-axis CNC machining, ensuring micron-level tolerances.",
    position: "center",
    cameraPos: [0, 0, 4.5],
    rotation: [0.15, 0.2, 0],
  },
  {
    id: 2,
    title: "PRECISION MOVEMENT",
    subtitle: "CALIBRE CN-01 TOURBILLON",
    description: "Engineered for exceptional accuracy and reliability. Over 280 hand-finished components synchronizing in harmonious equilibrium.",
    position: "right",
    cameraPos: [1.2, 0.2, 3.8],
    rotation: [0.2, 0.8, -0.1],
  },
  {
    id: 3,
    title: "SAPPHIRE CRYSTAL",
    subtitle: "DOUBLE ANTI-REFLECTIVE DOME",
    description: "Crystal clarity with exceptional scratch resistance. Diamond-like hardness rated 9 on the Mohs scale, protecting the delicate mechanics beneath.",
    position: "left",
    cameraPos: [-0.6, 0.1, 3.2],
    rotation: [-0.1, -0.6, 0.15],
  },
  {
    id: 4,
    title: "TITANIUM CASE",
    subtitle: "GRADE 5 AEROSPACE ALLOY",
    description: "Lightweight strength with a refined finish. 40% lighter than stainless steel yet exhibiting unprecedented tensile resilience against extreme environments.",
    position: "right",
    cameraPos: [1.0, -0.2, 3.6],
    rotation: [0.35, 1.4, -0.2],
  },
  {
    id: 5,
    title: "BUILT TO PERFORM",
    subtitle: "TIMELESS ENDURANCE",
    description: "Tested across cryogenic freezes and ocean depths. An architectural statement piece for visionaries who command their own destiny.",
    position: "center",
    cameraPos: [0, 0, 4.2],
    rotation: [0, 0, 0],
  }
];

export const FEATURES = [
  {
    number: "01",
    title: "PRECISION MOVEMENT",
    subtitle: "In-House Calibre CN-01",
    description: "Hand-assembled tourbillon escapement with 28,800 vph beating rhythm. Silicon balance spring impervious to electromagnetic fields.",
    stats: "28,800 VPH / 4Hz"
  },
  {
    number: "02",
    title: "TITANIUM CASE",
    subtitle: "Grade 5 Satin & Polish",
    description: "Forged aerospace Grade 5 titanium monobloc architecture. Ultra-lightweight on the wrist with thermal equilibrium and hypoallergenic comfort.",
    stats: "42mm Monobloc"
  },
  {
    number: "03",
    title: "SAPPHIRE CRYSTAL",
    subtitle: "Double AR Coated",
    description: "Curved synthetic corundum with 7-layer anti-reflective treatment on both inner and outer surfaces, delivering distortion-free visibility from all angles.",
    stats: "9 Mohs Hardness"
  },
  {
    number: "04",
    title: "100M WATER RESISTANCE",
    subtitle: "Deep Seal Architecture",
    description: "Triple-gasket screw-down crown and hermetically sealed display caseback withstand 10 bar of hydrostatic pressure without compromising aesthetics.",
    stats: "10 ATM / 100M"
  }
];

export const HOTSPOTS = [
  {
    id: "crystal",
    name: "Sapphire Crystal",
    tag: "OPTICAL CLARITY",
    description: "Domed sapphire crystal treated with double-sided anti-reflective multi-coating for pure optical clarity in all ambient conditions.",
    pos3d: [0, 0.25, 0.65],
    targetRotation: [0.3, 0.1, 0],
    screenOffset: { top: "35%", left: "45%" }
  },
  {
    id: "crown",
    name: "Precision Crown",
    tag: "TACTILE CONTROL",
    description: "Knurled titanium crown with ergonomic fluting and integrated dual O-ring moisture barrier. Engraved with the signature Chronova emblem.",
    pos3d: [1.35, 0.05, 0],
    targetRotation: [0.1, 1.35, 0],
    screenOffset: { top: "50%", left: "75%" }
  },
  {
    id: "bezel",
    name: "Ceramic Bezel",
    tag: "SURFACE INTEGRITY",
    description: "High-density micro-blasted ceramic bezel insert. Laser-etched countdown markers filled with liquid platinum.",
    pos3d: [0, 0.7, 0.55],
    targetRotation: [-0.4, 0, 0],
    screenOffset: { top: "25%", left: "55%" }
  },
  {
    id: "movement",
    name: "Mechanical Movement",
    tag: "TOURBILLON CORE",
    description: "Skeletonized dial revealing the oscillating balance wheel, ruthenium-plated bridges, and 33 synthetic ruby jewels.",
    pos3d: [0, -0.2, 0.45],
    targetRotation: [0.2, -0.3, 0],
    screenOffset: { top: "58%", left: "42%" }
  },
  {
    id: "strap",
    name: "Articulated Lugs & Strap",
    tag: "ERGONOMIC FIT",
    description: "Curved aerodynamic lugs seamlessly integrate into the strap profile with rapid quick-release spring mechanism.",
    pos3d: [0, -1.25, 0.3],
    targetRotation: [0.6, 0.2, 0],
    screenOffset: { top: "80%", left: "50%" }
  }
];

export const COMPONENT_LAYERS = [
  {
    id: "case",
    title: "THE EXTERIOR SHIELD",
    subtitle: "Grade 5 Titanium & Sapphire",
    description: "The exterior architecture balances robust structural defense with sculptural fluidity. Every edge features hand-polished chamfers contrast-cut against satin-brushed planes.",
    specs: ["Weight: 68 grams", "Thickness: 11.2mm", "Water Resistance: 10 ATM"],
    cameraOffset: [0, 0, 4.4],
    rotation: [0.2, 0.4, 0],
    explodeFactor: 0
  },
  {
    id: "movement",
    title: "CALIBRE CN-01 MOVEMENT",
    subtitle: "Synchronous Mechanical Engine",
    description: "The heart of Chronova. Driven by a bidirectional skeletonized rotor capturing kinetic energy from your daily cadence. Over 72 hours of uninterrupted autonomous power reserve.",
    specs: ["Jewels: 33 Rubies", "Frequency: 4Hz (28,800)", "Power Reserve: 72h"],
    cameraOffset: [0, 0.1, 3.2],
    rotation: [0.1, 0, 0],
    explodeFactor: 0.6
  },
  {
    id: "details",
    title: "METICULOUS DETAIL",
    subtitle: "Hand-Finished Complications",
    description: "Côtes de Genève striping across bridges, circular perlage on the baseplate, and diamond-polished sinks reflecting prismatic highlights at every wrist angle.",
    specs: ["Finishing: Hand Anglage", "Materials: Platinum / Silicon", "Certification: Master Chronometer"],
    cameraOffset: [0.3, -0.1, 2.7],
    rotation: [0.4, -0.3, 0.1],
    explodeFactor: 1.0
  }
];

export const CUSTOMIZER_OPTIONS = {
  cases: [
    {
      id: "titanium",
      name: "Satin Titanium",
      color: "#8E94A5",
      metalness: 0.85,
      roughness: 0.28,
      borderClass: "border-slate-400",
      description: "Aero-grade titanium with precision micro-satin finish"
    },
    {
      id: "black",
      name: "DLC Stealth Black",
      color: "#18191E",
      metalness: 0.92,
      roughness: 0.22,
      borderClass: "border-neutral-700",
      description: "Diamond-Like Carbon coating with extreme scratch resistance"
    },
    {
      id: "silver",
      name: "Polished Platinum",
      color: "#E2E8F0",
      metalness: 0.98,
      roughness: 0.15,
      borderClass: "border-white",
      description: "Mirror-polished platinum alloy with brilliant reflectivity"
    }
  ],
  straps: [
    {
      id: "black-leather",
      name: "Black Alligator",
      color: "#121214",
      textureType: "leather",
      roughness: 0.7,
      metalness: 0.1,
      swatchClass: "bg-neutral-900 border-neutral-700",
      description: "Full-grain Italian leather with hand-sewn tonal stitching"
    },
    {
      id: "brown-leather",
      name: "Cognac Saddle",
      color: "#6B3D1B",
      textureType: "leather",
      roughness: 0.65,
      metalness: 0.1,
      swatchClass: "bg-amber-900 border-amber-800",
      description: "Tuscan vegetable-tanned leather that patinas with time"
    },
    {
      id: "steel",
      name: "Articulated Steel",
      color: "#9EA5B4",
      textureType: "metal",
      roughness: 0.25,
      metalness: 0.9,
      swatchClass: "bg-slate-400 border-slate-300",
      description: "Custom multi-link bracelet with butterfly deployment clasp"
    },
    {
      id: "rubber",
      name: "Vulcanized Rubber",
      color: "#212429",
      textureType: "rubber",
      roughness: 0.85,
      metalness: 0.05,
      swatchClass: "bg-zinc-800 border-zinc-600",
      description: "High-performance FKM fluoroelastomer resistant to heat and saltwater"
    }
  ],
  dials: [
    {
      id: "black",
      name: "Onyx Black",
      color: "#0B0C10",
      accent: "#38BDF8",
      swatchClass: "bg-black border-neutral-700",
      description: "Deep obsidian sunburst dial with Super-LumiNova markers"
    },
    {
      id: "silver",
      name: "Meteorite Silver",
      color: "#CBD5E1",
      accent: "#0284C7",
      swatchClass: "bg-slate-300 border-white",
      description: "Fine sunray guilloché dial with rhodium-plated indices"
    },
    {
      id: "blue",
      name: "Deep Abyssal Blue",
      color: "#0F2645",
      accent: "#60A5FA",
      swatchClass: "bg-blue-950 border-blue-600",
      description: "Midnight gradient sunburst capturing oceanic light play"
    }
  ]
};

export const SPECIFICATIONS = [
  { category: "CASE", value: "42mm Grade 5 Titanium", detail: "11.2mm thickness, 49.5mm lug-to-lug, micro-beveled edges" },
  { category: "GLASS", value: "Double Curved Sapphire", detail: "Mohs scale 9 hardness, 7-layer dual AR coating" },
  { category: "MOVEMENT", value: "Calibre CN-01 Automatic", detail: "In-house mechanical tourbillon, 28,800 vph, 33 jewels" },
  { category: "POWER RESERVE", value: "72 Hours Autonomy", detail: "Twin spring barrels with tungsten-carbide ball bearing rotor" },
  { category: "WATER RESISTANCE", value: "100 Meters / 10 ATM", detail: "Screw-down dynamic crown with double Viton seals" },
  { category: "STRAP & CLASP", value: "Interchangeable Quick-Release", detail: "Deployant titanium buckle with micro-adjustment system" },
  { category: "LUMINESCENCE", value: "Grade X1 Super-LumiNova", detail: "Blue emission luminescence on hands and hour indices" },
  { category: "ACCURACY", value: "-2 / +2 Seconds Per Day", detail: "Certified chronometer under 5 positions and temperatures" }
];

