/**
 * SIH26236 - AI-Based Intelligent Food Packaging Material Knowledge Base
 * Verified Barrier, Mechanical, and Thermal Properties for Food Packaging Materials
 * Compliant with FSSAI, ISO 22000, ASTM D3985 (OTR), ASTM F1249 (WVTR), and FDA 21 CFR standards.
 */

export interface PackagingMaterialSpec {
  id: string;
  name: string;
  code: string;
  category: 'Flexible Film' | 'Rigid Polymer' | 'Laminate & Barrier Foil' | 'Paper & Corrugated' | 'Glass' | 'Bio-Compostable' | 'Returnable Container';
  icon: string;
  color: string;
  description: string;
  barrierProperties: {
    otrRange: string; // cm3/m2·24h·0.1MPa at 23°C, 0% RH
    otrAvg: number; // numeric value for algorithmic ranking (lower = tighter O2 barrier)
    wvtrRange: string; // g/m2·24h at 38°C, 90% RH
    wvtrAvg: number; // numeric value for ranking (lower = tighter moisture barrier)
    co2ToO2Ratio: number; // CO2 / O2 permeability ratio
    oxygenBarrierTier: 'Ultra-High' | 'High' | 'Medium' | 'Low' | 'Breathable';
    moistureBarrierTier: 'Ultra-High' | 'High' | 'Medium' | 'Low' | 'Porous';
    lightBarrier: '100% Opaque UV-Block' | 'High UV-Absorbing' | 'Moderate Amber' | 'Transparent Clear';
  };
  mechanical: {
    thicknessMicrons: number;
    tensileStrengthMpa: number;
    punctureResistanceJoules: number;
    sealStrengthNper15mm: number;
    shockDampeningRating: number; // 1 to 5
    maxStackingCompressionKg: number;
  };
  thermal: {
    minTempC: number;
    maxTempC: number;
    hotFillCapable: boolean;
    freezerSafe: boolean;
  };
  compatibility: {
    mapGasFlushSuitable: boolean;
    vacuumPackCapable: boolean;
    perforatedVentilationAvailable: boolean;
    foodContactCertifications: string[]; // FSSAI, FDA, EU
    sustainabilityScore: number; // 1 to 100
    recyclabilityClass: '100% Recyclable' | 'Industrial Compostable' | 'Multi-Material Composite (Challenging)' | 'Reusable';
    recyclingSymbol: string;
    estimatedBaseCostPerKg: number; // in INR
  };
  suitableCommodities: string[];
  unsuitableCommodities: string[];
  criticalFailureNotes: string;
}

export const PACKAGING_MATERIALS_DATABASE: PackagingMaterialSpec[] = [
  // 1. LDPE (Low Density Polyethylene)
  {
    id: 'mat-ldpe-film',
    name: 'Low-Density Polyethylene (LDPE) Film',
    code: 'LDPE-04',
    category: 'Flexible Film',
    icon: '🛍️',
    color: '#38bdf8',
    description: 'Flexible, high-clarity thermoplastic polymer with excellent heat sealability, moisture barrier, and flexibility in chilled cold rooms.',
    barrierProperties: {
      otrRange: '2,500 - 5,000 cm³/m²·day',
      otrAvg: 3500,
      wvtrRange: '10 - 18 g/m²·day',
      wvtrAvg: 14,
      co2ToO2Ratio: 4.2,
      oxygenBarrierTier: 'Low',
      moistureBarrierTier: 'Medium',
      lightBarrier: 'Transparent Clear'
    },
    mechanical: {
      thicknessMicrons: 45,
      tensileStrengthMpa: 22,
      punctureResistanceJoules: 1.8,
      sealStrengthNper15mm: 18,
      shockDampeningRating: 3.2,
      maxStackingCompressionKg: 15
    },
    thermal: {
      minTempC: -40,
      maxTempC: 80,
      hotFillCapable: false,
      freezerSafe: true
    },
    compatibility: {
      mapGasFlushSuitable: true,
      vacuumPackCapable: false,
      perforatedVentilationAvailable: true,
      foodContactCertifications: ['FSSAI IS 2508', 'FDA 21 CFR 177.1520', 'EU 10/2011'],
      sustainabilityScore: 78,
      recyclabilityClass: '100% Recyclable',
      recyclingSymbol: '♶ LDPE 04',
      estimatedBaseCostPerKg: 1.40
    },
    suitableCommodities: ['tomato', 'brinjal', 'capsicum', 'carrot', 'beans', 'cucumber', 'leafy-greens'],
    unsuitableCommodities: ['roasted-coffee', 'ghee', 'groundnut-oil', 'turmeric'],
    criticalFailureNotes: 'High oxygen permeability allows lipid oxidation, aroma loss, and rancidity in fatty oils, ghee, or coffee.'
  },

  // 2. HDPE (High Density Polyethylene)
  {
    id: 'mat-hdpe-woven',
    name: 'High-Density Polyethylene (HDPE) Woven Sacks & Mesh',
    code: 'HDPE-02',
    category: 'Flexible Film',
    icon: '🌾',
    color: '#ca8a04',
    description: 'Tough, tensile-resistant woven fabric offering excellent breathability, tear resistance, and moisture protection for dry commodities.',
    barrierProperties: {
      otrRange: '1,000 - 2,200 cm³/m²·day (Film) / Open Mesh (Vented)',
      otrAvg: 1600,
      wvtrRange: '3 - 8 g/m²·day',
      wvtrAvg: 5.5,
      co2ToO2Ratio: 3.5,
      oxygenBarrierTier: 'Medium',
      moistureBarrierTier: 'High',
      lightBarrier: 'High UV-Absorbing'
    },
    mechanical: {
      thicknessMicrons: 110,
      tensileStrengthMpa: 45,
      punctureResistanceJoules: 4.5,
      sealStrengthNper15mm: 30,
      shockDampeningRating: 3.8,
      maxStackingCompressionKg: 120
    },
    thermal: {
      minTempC: -30,
      maxTempC: 110,
      hotFillCapable: true,
      freezerSafe: true
    },
    compatibility: {
      mapGasFlushSuitable: false,
      vacuumPackCapable: false,
      perforatedVentilationAvailable: true,
      foodContactCertifications: ['FSSAI IS 10146', 'FDA 21 CFR 177.1520'],
      sustainabilityScore: 82,
      recyclabilityClass: '100% Recyclable',
      recyclingSymbol: '♴ HDPE 02',
      estimatedBaseCostPerKg: 0.95
    },
    suitableCommodities: ['onion', 'potato', 'garlic', 'rice', 'wheat', 'chickpea', 'groundnut'],
    unsuitableCommodities: ['fresh-milk', 'paneer', 'refined-oils'],
    criticalFailureNotes: 'Porous weave cannot retain liquid or prevent microbial ingress in dairy products.'
  },

  // 3. Aluminium Foil Multi-Layer High Barrier Laminate (PET/Al/PE)
  {
    id: 'mat-alu-laminate',
    name: 'Aluminium Foil Barrier Laminate (PET / AL / PE)',
    code: 'ALU-LAM-07',
    category: 'Laminate & Barrier Foil',
    icon: '🛡️',
    color: '#f59e0b',
    description: 'Gold-standard hermetic multi-layer laminate providing absolute 100% barrier against oxygen, water vapor, UV radiation, and aromatic volatiles.',
    barrierProperties: {
      otrRange: '< 0.05 cm³/m²·day (Impermeable)',
      otrAvg: 0.01,
      wvtrRange: '< 0.05 g/m²·day (Impermeable)',
      wvtrAvg: 0.01,
      co2ToO2Ratio: 1.0,
      oxygenBarrierTier: 'Ultra-High',
      moistureBarrierTier: 'Ultra-High',
      lightBarrier: '100% Opaque UV-Block'
    },
    mechanical: {
      thicknessMicrons: 105,
      tensileStrengthMpa: 65,
      punctureResistanceJoules: 5.2,
      sealStrengthNper15mm: 45,
      shockDampeningRating: 4.4,
      maxStackingCompressionKg: 85
    },
    thermal: {
      minTempC: -25,
      maxTempC: 130,
      hotFillCapable: true,
      freezerSafe: true
    },
    compatibility: {
      mapGasFlushSuitable: true,
      vacuumPackCapable: true,
      perforatedVentilationAvailable: false,
      foodContactCertifications: ['FSSAI IS 9845', 'FDA 21 CFR 175.300', 'EU 1935/2004'],
      sustainabilityScore: 62,
      recyclabilityClass: 'Multi-Material Composite (Challenging)',
      recyclingSymbol: '♹ OTHER 07',
      estimatedBaseCostPerKg: 4.80
    },
    suitableCommodities: ['almond', 'cashew', 'walnut', 'roasted-coffee', 'tea', 'turmeric', 'spices', 'ghee', 'milk-powder'],
    unsuitableCommodities: ['fresh-tomato', 'brinjal', 'mango', 'broccoli'],
    criticalFailureNotes: 'Hermetic zero-oxygen seal causes anaerobic suffocation, rapid alcohol fermentation, and decay in respiring fresh fruits and vegetables.'
  },

  // 4. Metallized BOPP / PET Film (Met-PET/PE)
  {
    id: 'mat-met-bopp',
    name: 'Metallized BOPP / Poly Barrier Film (Met-BOPP / PE)',
    code: 'MET-BOPP',
    category: 'Laminate & Barrier Foil',
    icon: '✨',
    color: '#eab308',
    description: 'High-gloss vacuum-metallized barrier film with excellent light reflection, moderate gas barrier, and cost-efficient pouch formation.',
    barrierProperties: {
      otrRange: '15 - 50 cm³/m²·day',
      otrAvg: 30,
      wvtrRange: '0.8 - 2.5 g/m²·day',
      wvtrAvg: 1.5,
      co2ToO2Ratio: 2.8,
      oxygenBarrierTier: 'High',
      moistureBarrierTier: 'High',
      lightBarrier: 'High UV-Absorbing'
    },
    mechanical: {
      thicknessMicrons: 60,
      tensileStrengthMpa: 48,
      punctureResistanceJoules: 3.2,
      sealStrengthNper15mm: 28,
      shockDampeningRating: 3.6,
      maxStackingCompressionKg: 40
    },
    thermal: {
      minTempC: -20,
      maxTempC: 100,
      hotFillCapable: false,
      freezerSafe: true
    },
    compatibility: {
      mapGasFlushSuitable: true,
      vacuumPackCapable: true,
      perforatedVentilationAvailable: false,
      foodContactCertifications: ['FSSAI IS 9845', 'FDA 21 CFR 177.1630'],
      sustainabilityScore: 72,
      recyclabilityClass: '100% Recyclable',
      recyclingSymbol: '♷ PP 05',
      estimatedBaseCostPerKg: 2.90
    },
    suitableCommodities: ['wheat-flour', 'besan', 'ragi-flour', 'raisins', 'dates', 'tea', 'cardamom', 'coriander'],
    unsuitableCommodities: ['fresh-tomato', 'onion', 'fresh-milk'],
    criticalFailureNotes: 'Cannot handle wet perishables without refrigeration and causes sweating inside bag.'
  },

  // 5. Corrugated Fibreboard (CFB 5-Ply / 7-Ply)
  {
    id: 'mat-cfb-carton',
    name: '5-Ply Kraft Corrugated Fibreboard (CFB) Ventilated Box',
    code: 'CFB-5PLY',
    category: 'Paper & Corrugated',
    icon: '📦',
    color: '#ea580c',
    description: 'Heavy-duty virgin kraft paper carton engineered with fluted shock-absorbing corrugation and side ventilation slots for fresh produce transit.',
    barrierProperties: {
      otrRange: 'Porous / High Gas Permeability',
      otrAvg: 10000,
      wvtrRange: 'High (Requires liner in wet conditions)',
      wvtrAvg: 120,
      co2ToO2Ratio: 1.0,
      oxygenBarrierTier: 'Breathable',
      moistureBarrierTier: 'Porous',
      lightBarrier: '100% Opaque UV-Block'
    },
    mechanical: {
      thicknessMicrons: 4200,
      tensileStrengthMpa: 85,
      punctureResistanceJoules: 14.5,
      sealStrengthNper15mm: 50,
      shockDampeningRating: 4.9,
      maxStackingCompressionKg: 350
    },
    thermal: {
      minTempC: -10,
      maxTempC: 60,
      hotFillCapable: false,
      freezerSafe: false
    },
    compatibility: {
      mapGasFlushSuitable: false,
      vacuumPackCapable: false,
      perforatedVentilationAvailable: true,
      foodContactCertifications: ['FSC Certified', 'IS 2771 Part 1', 'FDA Compliant'],
      sustainabilityScore: 96,
      recyclabilityClass: '100% Recyclable',
      recyclingSymbol: '♺ PAP 20',
      estimatedBaseCostPerKg: 2.20
    },
    suitableCommodities: ['mango', 'apple', 'tomato', 'brinjal', 'pomegranate', 'grapes', 'papaya'],
    unsuitableCommodities: ['fresh-milk', 'groundnut-oil', 'ghee'],
    criticalFailureNotes: 'Direct contact with liquids causes carton softening and catastrophic stacking collapse.'
  },

  // 6. Food-Grade Returnable Plastic Crates (HDPE RPC)
  {
    id: 'mat-hdpe-crate',
    name: 'Food-Grade Returnable Plastic Crate (HDPE RPC)',
    code: 'RPC-HDPE',
    category: 'Returnable Container',
    icon: '🧺',
    color: '#10b981',
    description: 'Multi-use heavy-duty perforated crate offering unmatched rigid stackability, hygienic washability, and zero box collapse during cold transit.',
    barrierProperties: {
      otrRange: 'Open Aerated Grid',
      otrAvg: 20000,
      wvtrRange: 'Open Aerated Grid',
      wvtrAvg: 200,
      co2ToO2Ratio: 1.0,
      oxygenBarrierTier: 'Breathable',
      moistureBarrierTier: 'Porous',
      lightBarrier: 'Transparent Clear'
    },
    mechanical: {
      thicknessMicrons: 3500,
      tensileStrengthMpa: 120,
      punctureResistanceJoules: 25.0,
      sealStrengthNper15mm: 0,
      shockDampeningRating: 4.8,
      maxStackingCompressionKg: 600
    },
    thermal: {
      minTempC: -30,
      maxTempC: 95,
      hotFillCapable: true,
      freezerSafe: true
    },
    compatibility: {
      mapGasFlushSuitable: false,
      vacuumPackCapable: false,
      perforatedVentilationAvailable: true,
      foodContactCertifications: ['FSSAI IS 9833', 'EU Food Contact 10/2011', 'FDA 21 CFR'],
      sustainabilityScore: 98,
      recyclabilityClass: 'Reusable',
      recyclingSymbol: '♴ HDPE 02 (1000+ Reuses)',
      estimatedBaseCostPerKg: 0.45 // amortized per use
    },
    suitableCommodities: ['tomato', 'brinjal', 'cabbage', 'cauliflower', 'mango', 'banana', 'guava'],
    unsuitableCommodities: ['flour', 'spices', 'oils', 'tea', 'milk'],
    criticalFailureNotes: 'Open grid allows powder leakage, dust contamination, and cannot contain fluids.'
  },

  // 7. Glass Containers (Flint / Amber Glass)
  {
    id: 'mat-glass-jar',
    name: 'Flint & Amber Glass Jars / Bottles with Hermetic Lug Cap',
    code: 'GL-70',
    category: 'Glass',
    icon: '🫙',
    color: '#06b6d4',
    description: '100% chemically inert, completely impermeable non-porous glass container providing infinite barrier life and premium sensory preservation.',
    barrierProperties: {
      otrRange: '0.00 cm³/m²·day (Total Zero Permeability)',
      otrAvg: 0.00,
      wvtrRange: '0.00 g/m²·day (Total Zero Permeability)',
      wvtrAvg: 0.00,
      co2ToO2Ratio: 1.0,
      oxygenBarrierTier: 'Ultra-High',
      moistureBarrierTier: 'Ultra-High',
      lightBarrier: 'Moderate Amber'
    },
    mechanical: {
      thicknessMicrons: 2500,
      tensileStrengthMpa: 70,
      punctureResistanceJoules: 3.5,
      sealStrengthNper15mm: 60,
      shockDampeningRating: 1.5,
      maxStackingCompressionKg: 500
    },
    thermal: {
      minTempC: -20,
      maxTempC: 150,
      hotFillCapable: true,
      freezerSafe: true
    },
    compatibility: {
      mapGasFlushSuitable: true,
      vacuumPackCapable: true,
      perforatedVentilationAvailable: false,
      foodContactCertifications: ['FSSAI Glass Standard', 'FDA GRAS', 'EU 1935/2004'],
      sustainabilityScore: 92,
      recyclabilityClass: '100% Recyclable',
      recyclingSymbol: '♺ GL 70',
      estimatedBaseCostPerKg: 6.50
    },
    suitableCommodities: ['pure-ghee', 'raw-honey', 'mango-pickle', 'cold-pressed-oils'],
    unsuitableCommodities: ['fresh-vegetables', 'bulk-grains', 'fresh-fruits'],
    criticalFailureNotes: 'Heavy transit tare weight and high shatter vulnerability make it uneconomical for bulk fresh crops.'
  },

  // 8. Multi-Layer Poly Co-Ex Pouch (EVOH / LDPE) for Dairy & Liquids
  {
    id: 'mat-evoh-pouch',
    name: '5-Layer Co-Extruded EVOH High-Barrier Pouch',
    code: 'COEX-EVOH',
    category: 'Flexible Film',
    icon: '🥛',
    color: '#ec4899',
    description: 'Specialized 5-layer co-extruded film with EVOH oxygen barrier core and black light-blocking tie layer designed for liquid dairy and aseptics.',
    barrierProperties: {
      otrRange: '1.0 - 5.0 cm³/m²·day',
      otrAvg: 2.5,
      wvtrRange: '2.0 - 4.5 g/m²·day',
      wvtrAvg: 3.0,
      co2ToO2Ratio: 2.0,
      oxygenBarrierTier: 'Ultra-High',
      moistureBarrierTier: 'High',
      lightBarrier: 'High UV-Absorbing'
    },
    mechanical: {
      thicknessMicrons: 75,
      tensileStrengthMpa: 42,
      punctureResistanceJoules: 4.8,
      sealStrengthNper15mm: 40,
      shockDampeningRating: 3.8,
      maxStackingCompressionKg: 30
    },
    thermal: {
      minTempC: -15,
      maxTempC: 90,
      hotFillCapable: true,
      freezerSafe: true
    },
    compatibility: {
      mapGasFlushSuitable: true,
      vacuumPackCapable: true,
      perforatedVentilationAvailable: false,
      foodContactCertifications: ['FSSAI Dairy IS 11805', 'FDA 21 CFR 177.1360'],
      sustainabilityScore: 70,
      recyclabilityClass: '100% Recyclable',
      recyclingSymbol: '♹ OTHER 07',
      estimatedBaseCostPerKg: 3.20
    },
    suitableCommodities: ['fresh-milk', 'curd', 'paneer', 'butter', 'groundnut-oil'],
    unsuitableCommodities: ['fresh-onion', 'potato', 'mango'],
    criticalFailureNotes: 'Airtight barrier traps moisture and heat in respiring crops, causing rapid condensation and fungal rot.'
  },

  // 9. Breathable Micro-Perforated Laser-Tuned Film (Anti-Fog LDPE/BOPP)
  {
    id: 'mat-perforated-film',
    name: 'Laser Micro-Perforated Equilibrium Modified Atmosphere (EMAP) Anti-Fog Film',
    code: 'EMAP-AF',
    category: 'Flexible Film',
    icon: '💨',
    color: '#8b5cf6',
    description: 'Precision laser-perforated film calibrated to match crop respiration rate, preventing anaerobic fermentation while suppressing moisture condensation.',
    barrierProperties: {
      otrRange: '15,000 - 45,000 cm³/m²·day (Calibrated)',
      otrAvg: 25000,
      wvtrRange: '25 - 50 g/m²·day (Anti-Fog)',
      wvtrAvg: 35,
      co2ToO2Ratio: 1.2,
      oxygenBarrierTier: 'Breathable',
      moistureBarrierTier: 'Medium',
      lightBarrier: 'Transparent Clear'
    },
    mechanical: {
      thicknessMicrons: 30,
      tensileStrengthMpa: 28,
      punctureResistanceJoules: 2.2,
      sealStrengthNper15mm: 20,
      shockDampeningRating: 3.0,
      maxStackingCompressionKg: 10
    },
    thermal: {
      minTempC: -20,
      maxTempC: 75,
      hotFillCapable: false,
      freezerSafe: true
    },
    compatibility: {
      mapGasFlushSuitable: true,
      vacuumPackCapable: false,
      perforatedVentilationAvailable: true,
      foodContactCertifications: ['FSSAI Approved', 'FDA 21 CFR 177.1520', 'EU 10/2011'],
      sustainabilityScore: 84,
      recyclabilityClass: '100% Recyclable',
      recyclingSymbol: '♶ LDPE 04',
      estimatedBaseCostPerKg: 2.10
    },
    suitableCommodities: ['strawberry', 'broccoli', 'spinach', 'sweet-corn', 'mushrooms', 'green-chilli'],
    unsuitableCommodities: ['flour', 'milk', 'ghee', 'dry-fruits'],
    criticalFailureNotes: 'Micro-holes permit moisture ingress and insect entry for dry stored foods.'
  },

  // 10. Biodegradable / Compostable Polylactic Acid (PLA) / PBAT Bio-Film
  {
    id: 'mat-pla-biofilm',
    name: 'Certified Compostable Bio-Polymer Film (PLA / PBAT Blend)',
    code: 'BIO-PLA',
    category: 'Bio-Compostable',
    icon: '🌱',
    color: '#22c55e',
    description: 'Corn-starch derived biodegradable film that decomposes into natural humus within 180 days in industrial compost, leaving zero microplastic residues.',
    barrierProperties: {
      otrRange: '450 - 900 cm³/m²·day',
      otrAvg: 650,
      wvtrRange: '180 - 250 g/m²·day',
      wvtrAvg: 210,
      co2ToO2Ratio: 3.8,
      oxygenBarrierTier: 'Medium',
      moistureBarrierTier: 'Low',
      lightBarrier: 'Transparent Clear'
    },
    mechanical: {
      thicknessMicrons: 35,
      tensileStrengthMpa: 30,
      punctureResistanceJoules: 2.0,
      sealStrengthNper15mm: 16,
      shockDampeningRating: 3.2,
      maxStackingCompressionKg: 12
    },
    thermal: {
      minTempC: -10,
      maxTempC: 55,
      hotFillCapable: false,
      freezerSafe: false
    },
    compatibility: {
      mapGasFlushSuitable: true,
      vacuumPackCapable: false,
      perforatedVentilationAvailable: true,
      foodContactCertifications: ['IS/ISO 17088 (India)', 'EN 13432 (EU)', 'ASTM D6400 (USA)'],
      sustainabilityScore: 99,
      recyclabilityClass: 'Industrial Compostable',
      recyclingSymbol: '♹ PLA 07 (Compostable)',
      estimatedBaseCostPerKg: 3.60
    },
    suitableCommodities: ['organic-vegetables', 'herbs', 'beans', 'bell-pepper', 'organic-apples'],
    unsuitableCommodities: ['long-term-grains', 'ghee', 'oils', 'water-soaked-items'],
    criticalFailureNotes: 'High water-vapor transmission causes rapid moisture loss in long-term dry pantry storage (>3 months).'
  }
];
