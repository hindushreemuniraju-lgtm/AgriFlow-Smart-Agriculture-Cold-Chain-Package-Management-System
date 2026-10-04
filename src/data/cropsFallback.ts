import { CropInfo } from '../types';

export const CROPS_DATA: CropInfo[] = [
  {
    id: 'crop-onion',
    name: 'Nashik Red Onion',
    scientificName: 'Allium cepa',
    category: 'Vegetable',
    icon: '🧅',
    color: '#fb923c',
    variety: 'Bhima Super / Nashik Red',
    basePricePerKg: 28.5,
    optimalTempRange: [0, 2],
    optimalHumidityRange: [65, 70],
    ripenessDays: 14,
    currentMaturityStage: 85,
    ethyleneSensitivity: 'Low',
    respirationRate: 'Low',
    qualityTechniques: [
      {
        title: 'Shade Curing & Neck Tightening',
        description: 'Cure harvested bulbs in well-ventilated shade structures for 10-14 days until neck moisture drops below 12%.',
        impact: 'Prevents 95% fungal neck rot and extends storage to 6 months',
        urgency: 'Immediate'
      },
      {
        title: 'Withhold Pre-Harvest Irrigation',
        description: 'Stop irrigation 15 days prior to harvest when 50% neck fall is observed.',
        impact: 'Dries outer scale layers and prevents thick neck spongy bulbs',
        urgency: 'Scheduled'
      }
    ],
    harvestingGuidance: {
      daysRemaining: 14,
      recommendedWindow: 'October 10 - October 16',
      sugarBrixTarget: '11.0 - 13.5 °Bx',
      firmnessKgCm2: '4.8 - 5.2 kg/cm²',
      idealTimeOfDay: '06:00 AM - 10:00 AM (Dry morning)',
      fieldPrecautions: [
        'Harvest when 50-70% foliage has naturally fallen over at pseudostem neck',
        'Trim foliage leaving 2.5 cm neck to seal off fungal spore entry',
        'Never pack fresh un-cured bulbs into airtight non-ventilated bags'
      ]
    },
    packagingPresets: {
      recommendedMaterial: 'High-Density Polyethylene Open-Weave Leno Mesh Bags (25kg / 50kg)',
      coldChainTier: 'Ventilated Dry Logistics (20°C - 26°C Ambient with 35% airflow)',
      idealStorageTemp: '0°C - 2°C (Cold) or 25°C (Ventilated Chawl)',
      humidityTarget: '65% - 70% RH',
      shockDampeningRating: 3.2,
      ventilationType: 'Open weave mesh matrix with minimum 35% air permeability',
      ethyleneControl: 'Isolate from high ethylene fruit emitters',
      cushioningSpecs: 'Non-abrasive Leno knit yarn',
      estimatedCostPerKg: 1.2
    },
    nutrition: {
      calories: 40,
      vitaminC_mg: 7.4,
      vitaminA_IU: 2,
      dietaryFiber_g: 1.7,
      potassium_mg: 146,
      antioxidantIndex: 88,
      glycemicIndex: 15,
      highlights: ['Rich in Quercetin bioflavonoid', 'Prebiotic inulin for gut microbiota', 'Sulfur compounds promote heart wellness']
    },
    shelfLife: {
      ambientDays: 120,
      recommendedColdDays: 240,
      optimalPreservationSteps: [
        'Store in cool, dry, dark and well-ventilated wire baskets or mesh racks',
        'Maintain relative humidity strictly below 70% to stop eye sprouting',
        'Never store in sealed plastic bags which trap moisture and induce rot'
      ],
      spoilageIndicators: ['Sprouting green shoot from neck', 'Watery soft rot in basal plate', 'Black powdery mold (Aspergillus)']
    },
    recipes: [
      {
        title: 'Caramelized Onion & Herb Lentil Broth',
        prepTime: '25 mins',
        healthBenefit: 'High quercetin bioavailability and gut prebiotic nourishment',
        ingredients: ['3 Large Nasik Onions', '1 cup Toor/Moong dal', '1 tsp Cumin', '2 Garlic cloves', '1 tbsp Ghee'],
        steps: [
          'Gently caramelize sliced onions in ghee until golden brown',
          'Add crushed garlic and cumin seeds',
          'Pour in boiled dal broth and simmer 10 mins'
        ]
      }
    ]
  },
  {
    id: 'crop-tomatoes',
    name: 'Vine-Ripened Roma Tomatoes',
    scientificName: 'Solanum lycopersicum',
    category: 'Vegetable',
    icon: '🍅',
    color: '#ef4444',
    variety: 'San Marzano / Roma Hybrid',
    basePricePerKg: 38,
    optimalTempRange: [12, 16],
    optimalHumidityRange: [85, 92],
    ripenessDays: 14,
    currentMaturityStage: 88,
    ethyleneSensitivity: 'High',
    respirationRate: 'Moderate',
    qualityTechniques: [
      {
        title: 'Potassium Nitrate Fertigation Boost',
        description: 'Apply soluble potassium (0:0:50) at 3.5 kg/acre to maximize fruit wall firmness and lycopene density.',
        impact: '+18% firmness, deep crimson color',
        urgency: 'Immediate'
      },
      {
        title: 'Tension-Regulated Drip Scheduling',
        description: 'Taper irrigation 36 hours prior to harvest to prevent epidermal cracking and sugar dilution.',
        impact: 'Prevents 12% split losses',
        urgency: 'Scheduled'
      },
      {
        title: 'Organic Silica Foliar Spray',
        description: 'Spray orthosilicic acid (2 ml/L) during sunrise to strengthen outer cuticular wax against transport bruising.',
        impact: 'Extends post-harvest transit shelf-life by 4 days',
        urgency: 'Monitoring'
      }
    ],
    harvestingGuidance: {
      daysRemaining: 2,
      recommendedWindow: 'October 5 - October 7',
      sugarBrixTarget: '5.2 - 6.0 °Bx',
      firmnessKgCm2: '3.8 - 4.2 kg/cm²',
      idealTimeOfDay: '06:00 AM - 09:30 AM (cool ambient)',
      fieldPrecautions: [
        'Cut with short calyx intact using sanitized shears to avoid stem puncture',
        'Stack plastic field crates maximum 3 layers deep under shaded canopy',
        'Pre-cool field crates to 15°C within 3 hours of picking'
      ]
    },
    packagingPresets: {
      recommendedMaterial: '5-Ply Kraft Corrugated Telescopic Box with ventilated side-slots',
      coldChainTier: 'Chilled Air Logistics (12°C - 14°C) - Avoid chilling injury',
      idealStorageTemp: '12°C - 14°C',
      humidityTarget: '90% RH',
      shockDampeningRating: 4.6,
      ventilationType: 'Dual-die cut 45mm cross-ventilation holes (6% box surface)',
      ethyleneControl: 'Potassium permanganate (KMnO4) sachet insert (ethylene scavenger)',
      cushioningSpecs: 'Food-grade moulded recycled pulp tray divider',
      estimatedCostPerKg: 2.4
    },
    nutrition: {
      calories: 22,
      vitaminC_mg: 19.5,
      vitaminA_IU: 1025,
      dietaryFiber_g: 1.8,
      potassium_mg: 292,
      antioxidantIndex: 94,
      glycemicIndex: 15,
      highlights: ['Ultra-rich in bioavailable Lycopene', 'Cardiovascular support', 'High natural L-glutamate umami']
    },
    shelfLife: {
      ambientDays: 5,
      recommendedColdDays: 14,
      optimalPreservationSteps: [
        'Store stem-end down on a shallow breathable dish at 13°C - 16°C pantry',
        'Never refrigerate below 10°C as low temps destroy aroma enzymes (Z-3-hexenal)',
        'Keep isolated from climacteric fruits like ripe bananas or cantaloupes',
        'If cut, drizzle light extra-virgin olive oil over cut surface and store in airtight glass container'
      ],
      spoilageIndicators: ['Soft watery shoulder depressions', 'Dull wrinkled pericarp', 'Off-vinegar odor around stem scar']
    },
    recipes: [
      {
        title: 'Slow-Confit Roma Tomato & Rosemary Medley',
        prepTime: '45 mins',
        healthBenefit: 'Olive oil heat-activates cis-lycopene for 400% higher absorption into bloodstream',
        ingredients: ['8 ripe Roma tomatoes', '4 garlic cloves', 'Fresh rosemary sprigs', 'Cold-pressed extra virgin olive oil', 'Sea salt crystals'],
        steps: [
          'Halve tomatoes lengthwise and arrange cut side up in a cast iron skillet',
          'Tuck crushed garlic and rosemary sprigs between tomatoes',
          'Submerge halfway in cold-pressed olive oil, season with coarse sea salt',
          'Simmer at gentle 110°C for 40 mins until caramelized and velvety tender'
        ]
      },
      {
        title: 'Chilled Tuscan Gazpacho Elixir',
        prepTime: '15 mins',
        healthBenefit: 'Raw bioactive Vitamin C preserved without oxidative heat destruction',
        ingredients: ['6 vine tomatoes', '1 cucumber', '1/2 red bell pepper', '1 tbsp apple cider vinegar', 'Cold water', 'Himalayan pink salt'],
        steps: [
          'Roughly chop tomatoes, peeled cucumber, and red bell pepper',
          'Blend on high with apple cider vinegar, a splash of ice water, and pink salt',
          'Strain lightly for velvety consistency and chill 1 hour before serving'
        ]
      }
    ]
  },
  {
    id: 'crop-mangoes',
    name: 'Ratnagiri Alphonso (Hapus) Mangoes',
    scientificName: 'Mangifera indica',
    category: 'Fruit',
    icon: '🥭',
    color: '#f59e0b',
    variety: 'GI-Tagged Ratnagiri Hapus Grade-A',
    basePricePerKg: 180,
    optimalTempRange: [13, 15],
    optimalHumidityRange: [85, 90],
    ripenessDays: 10,
    currentMaturityStage: 92,
    ethyleneSensitivity: 'High',
    respirationRate: 'High',
    qualityTechniques: [
      {
        title: 'Vapor Heat Treatment (VHT) Protocol',
        description: 'Execute mandatory 48°C / 20 min VHT chamber run to sterilize fruit fly larvae without damaging pulp sweetness.',
        impact: 'Meets APEDA EU/US export certification standard',
        urgency: 'Scheduled'
      },
      {
        title: 'Natural Sponge Cushioning Matrix',
        description: 'Individual foam mesh sleeves combined with paddy straw bedding to curb sap burn (stem exudate).',
        impact: 'Zero skin blackening, 99.4% premium retail grade preservation',
        urgency: 'Immediate'
      },
      {
        title: 'Brix Sugar Refractometer Spot-Check',
        description: 'Conduct optical refractometer sampling across 5 randomized trees to ensure minimum 17.5° Brix.',
        impact: 'Guarantees quintessential Alphonso honey-sweetness',
        urgency: 'Monitoring'
      }
    ],
    harvestingGuidance: {
      daysRemaining: 1,
      recommendedWindow: 'October 4 - October 6',
      sugarBrixTarget: '17.5 - 20.0 °Bx',
      firmnessKgCm2: '5.0 - 5.5 kg/cm²',
      idealTimeOfDay: '05:30 AM - 08:30 AM',
      fieldPrecautions: [
        'Harvest with specialized clipper poles leaving 10mm stalk to prevent caustic sap release',
        'Invert fruit on desapping tables for 4 hours to drain latex away from fruit skin',
        'Wrap individual fruits in unbleached greaseproof butter paper'
      ]
    },
    packagingPresets: {
      recommendedMaterial: 'Double-walled export-grade micro-fluted carton (Box of 12 / 24)',
      coldChainTier: 'Precise Reefer 13°C (Do NOT drop below 11°C to avoid chilling injury discoloration)',
      idealStorageTemp: '13°C',
      humidityTarget: '88% RH',
      shockDampeningRating: 4.9,
      ventilationType: 'Circular 30mm precision perforations on 4 sides',
      ethyleneControl: 'Slow-release 1-MCP (1-Methylcyclopropene) freshness strip',
      cushioningSpecs: 'Biodegradable soft foam netting jacket per individual mango',
      estimatedCostPerKg: 5.5
    },
    nutrition: {
      calories: 60,
      vitaminC_mg: 36.4,
      vitaminA_IU: 1082,
      dietaryFiber_g: 1.6,
      potassium_mg: 168,
      antioxidantIndex: 98,
      glycemicIndex: 51,
      highlights: ['Enormous Beta-Carotene & Zeaxanthin density', 'Digestive enzymes (amylases)', 'Immune-fortifying Vitamin C']
    },
    shelfLife: {
      ambientDays: 6,
      recommendedColdDays: 16,
      optimalPreservationSteps: [
        'Allow unripened fruit to mature at room temperature (22°C - 26°C) in hay or brown paper bag',
        'Once aromatic and golden, transfer to 12°C - 14°C chiller drawer for up to 16 days',
        'Never soak in cold ice water immediately after direct sun exposure'
      ],
      spoilageIndicators: ['Spongy tissue internal breakdown', 'Black sunken anthracnose spots', 'Fermented alcohol aroma']
    },
    recipes: [
      {
        title: 'Raw Alphonso Mango & Coconut Chia Pudding',
        prepTime: '10 mins + chill',
        healthBenefit: 'Medium-chain triglycerides from coconut milk boost bioavailability of mango fat-soluble carotenoids',
        ingredients: ['1 ripe Alphonso mango pureed', '3 tbsp organic chia seeds', '200ml coconut milk', 'Cardamom powder', 'Pistachio slivers'],
        steps: [
          'Whisk chia seeds into coconut milk with a pinch of freshly ground cardamom',
          'Refrigerate 3 hours or overnight until a rich pudding texture forms',
          'Layer luscious Alphonso mango puree generously over the chia base and top with crushed pistachios'
        ]
      }
    ]
  },
  {
    id: 'crop-strawberries',
    name: 'Mahabaleshwar Winter Dawn Strawberries',
    scientificName: 'Fragaria × ananassa',
    category: 'Fruit',
    icon: '🍓',
    color: '#e11d48',
    variety: 'Winter Dawn / Sweet Charlie',
    basePricePerKg: 220,
    optimalTempRange: [1, 4],
    optimalHumidityRange: [90, 95],
    ripenessDays: 5,
    currentMaturityStage: 95,
    ethyleneSensitivity: 'Low',
    respirationRate: 'High',
    qualityTechniques: [
      {
        title: 'Rapid Forced-Air Pre-Cooling to 2°C',
        description: 'Run blast tunnel forced-air cooling within 90 minutes of picking to remove field heat and stabilize cell walls.',
        impact: 'Halves decay velocity, preserving 98% crunch',
        urgency: 'Immediate'
      },
      {
        title: 'CO2 Enriched Modified Atmosphere Packaging',
        description: 'Flush 12-15% CO2 into sealed punnets to inhibit Botrytis cinerea (gray mold) without off-flavors.',
        impact: 'Prevents fungal spores, triples retail shelf life',
        urgency: 'Immediate'
      }
    ],
    harvestingGuidance: {
      daysRemaining: 1,
      recommendedWindow: 'October 4 - October 5',
      sugarBrixTarget: '9.0 - 11.5 °Bx',
      firmnessKgCm2: '2.5 - 3.0 kg/cm²',
      idealTimeOfDay: '05:00 AM - 07:30 AM',
      fieldPrecautions: [
        'Grasp stem 1 cm above calyx and twist gently; do not touch ripe berry flesh with bare fingers',
        'Harvest directly into final retail punnets to eliminate secondary re-handling bruising'
      ]
    },
    packagingPresets: {
      recommendedMaterial: 'Vented rPET Clear Clamshell Punnet with micro-porous moisture absorbent bottom pad',
      coldChainTier: 'Strict Cold Chain 0°C to 2°C continuous cold supply',
      idealStorageTemp: '2°C',
      humidityTarget: '92% RH',
      shockDampeningRating: 4.9,
      ventilationType: 'Laser micro-perforations for MAP equilibrium',
      ethyleneControl: 'Anti-fog antimicrobial coated film with active moisture sponge',
      cushioningSpecs: 'Embossed food-safe air-bubble bottom cushion',
      estimatedCostPerKg: 6.8
    },
    nutrition: {
      calories: 32,
      vitaminC_mg: 58.8,
      vitaminA_IU: 12,
      dietaryFiber_g: 2.0,
      potassium_mg: 153,
      antioxidantIndex: 96,
      glycemicIndex: 40,
      highlights: ['Ellagic acid & anthocyanins', 'Massive Vitamin C per serving', 'Low glycemic load']
    },
    shelfLife: {
      ambientDays: 2,
      recommendedColdDays: 8,
      optimalPreservationSteps: [
        'Do not wash strawberries until right before consuming',
        'Store in a single layer with a dry paper towel in a ventilated container at 2°C - 4°C',
        'Dip in 50°C hot water for 30 seconds upon home arrival to shock mold spores (thermotherapy)'
      ],
      spoilageIndicators: ['Fuzzy gray mycelium mold spots', 'Mushy fluid leakage', 'Loss of vibrant gloss']
    },
    recipes: [
      {
        title: 'Antioxidant Berry Glow Smoothie Bowl',
        prepTime: '5 mins',
        healthBenefit: 'Anthocyanins protect cellular DNA and enhance vascular microcirculation',
        ingredients: ['1 cup chilled strawberries', '1/2 frozen banana', '1/2 cup Greek yogurt', '1 tbsp hemp seeds', 'Raw forest honey'],
        steps: [
          'Blend chilled strawberries, banana, and Greek yogurt until thick and creamy',
          'Pour into a chilled coconut bowl, garnish with strawberry slices and toasted hemp seeds'
        ]
      }
    ]
  },
  {
    id: 'crop-bellpeppers',
    name: 'Tri-Color Greenhouse Bell Peppers',
    scientificName: 'Capsicum annuum',
    category: 'Vegetable',
    icon: '🫑',
    color: '#10b981',
    variety: 'Inspiration Red & Kanchan Yellow',
    basePricePerKg: 75,
    optimalTempRange: [7, 10],
    optimalHumidityRange: [90, 95],
    ripenessDays: 12,
    currentMaturityStage: 85,
    ethyleneSensitivity: 'Low',
    respirationRate: 'Moderate',
    qualityTechniques: [
      {
        title: 'Calcium Chloride Post-Harvest Dip',
        description: 'Dip freshly harvested peppers in 1% CaCl2 solution for 2 minutes to preserve epidermal tensile strength.',
        impact: 'Zero flaccidity, sustains crunchy bite',
        urgency: 'Scheduled'
      }
    ],
    harvestingGuidance: {
      daysRemaining: 3,
      recommendedWindow: 'October 6 - October 9',
      sugarBrixTarget: '6.5 - 8.0 °Bx',
      firmnessKgCm2: '6.0 - 7.0 kg/cm²',
      idealTimeOfDay: '07:00 AM - 10:00 AM',
      fieldPrecautions: [
        'Use sterile bypass pruners cutting 2.5cm above fruit shoulder',
        'Sanitize collection trays with ozone water rinse'
      ]
    },
    packagingPresets: {
      recommendedMaterial: 'Micro-perforated Polyolefin Shrink Film Wrap with solid carton master cases',
      coldChainTier: 'Cool Logistics 8°C - 10°C (Protect against chill pitting below 7°C)',
      idealStorageTemp: '8°C',
      humidityTarget: '95% RH',
      shockDampeningRating: 4.4,
      ventilationType: 'Biaxially oriented anti-condensation perforations',
      ethyleneControl: 'Not required (low ethylene generator)',
      cushioningSpecs: 'Corrugated inner cell dividers',
      estimatedCostPerKg: 3.2
    },
    nutrition: {
      calories: 31,
      vitaminC_mg: 127.7,
      vitaminA_IU: 3131,
      dietaryFiber_g: 2.1,
      potassium_mg: 211,
      antioxidantIndex: 91,
      glycemicIndex: 15,
      highlights: ['Contains 200%+ daily recommended Vitamin C', 'Lutein & Capsanthin for optical retina protection']
    },
    shelfLife: {
      ambientDays: 6,
      recommendedColdDays: 21,
      optimalPreservationSteps: [
        'Store dry in vegetable crisper at 8°C in perforated zip pouch',
        'Keep green calyx intact to retain fruit moisture pressure'
      ],
      spoilageIndicators: ['Soft sunken pitted skin craters', 'Water-soaked stem base', 'Wrinkled outer epidermis']
    },
    recipes: [
      {
        title: 'Charred Mediterranean Bell Pepper & Walnut Dip (Muhammara)',
        prepTime: '20 mins',
        healthBenefit: 'Capsanthin carotenoids paired with walnut polyunsaturated fats for peak neuro-cellular support',
        ingredients: ['3 roasted bell peppers', '1/2 cup walnuts', '1 tbsp pomegranate molasses', 'Cumin', 'Cold pressed olive oil'],
        steps: [
          'Char peppers over open flame until black, steam in a bowl for 10 mins, and slip skins off',
          'Pulse roasted pepper flesh with walnuts, pomegranate molasses, cumin, and olive oil into a coarse dip'
        ]
      }
    ]
  },
  {
    id: 'crop-grapes',
    name: 'Nashik Export Thompson Seedless Grapes',
    scientificName: 'Vitis vinifera',
    category: 'Fruit',
    icon: '🍇',
    color: '#8b5cf6',
    variety: 'Thompson Seedless Clone 2A',
    basePricePerKg: 95,
    optimalTempRange: [-0.5, 1],
    optimalHumidityRange: [90, 95],
    ripenessDays: 18,
    currentMaturityStage: 90,
    ethyleneSensitivity: 'Low',
    respirationRate: 'Low',
    qualityTechniques: [
      {
        title: 'Dual-Stage SO2 Fumigation Sheet Placement',
        description: 'Insert slow-release sodium metabisulfite generator pad over bunch packs to eliminate Botrytis rot during transit.',
        impact: '45-day sea-freight export preservation stability',
        urgency: 'Immediate'
      }
    ],
    harvestingGuidance: {
      daysRemaining: 4,
      recommendedWindow: 'October 7 - October 11',
      sugarBrixTarget: '18.0 - 21.0 °Bx',
      firmnessKgCm2: '3.0 - 3.5 kg/cm²',
      idealTimeOfDay: '06:00 AM - 09:00 AM',
      fieldPrecautions: [
        'Clip bunches only by main peduncle; avoid rubbing natural waxy bloom off the grape skins',
        'Discard water berries or loose pedicels during field pack'
      ]
    },
    packagingPresets: {
      recommendedMaterial: '5kg Telescopic Corrugated master carton with SO2 generator liner bag and bubble pad',
      coldChainTier: 'Sub-Zero Cold Chain 0°C to 0.5°C',
      idealStorageTemp: '0°C',
      humidityTarget: '95% RH',
      shockDampeningRating: 4.8,
      ventilationType: 'High ventilation area with vented inner pouch bags',
      ethyleneControl: 'Sulfur dioxide generator sheet active for 60 days',
      cushioningSpecs: 'Embossed bubble wrap pad top and bottom',
      estimatedCostPerKg: 4.8
    },
    nutrition: {
      calories: 69,
      vitaminC_mg: 10.8,
      vitaminA_IU: 66,
      dietaryFiber_g: 0.9,
      potassium_mg: 191,
      antioxidantIndex: 88,
      glycemicIndex: 53,
      highlights: ['Concentrated Resveratrol', 'Oligomeric proanthocyanidins (OPCs)', 'Hydration electrolytes']
    },
    shelfLife: {
      ambientDays: 3,
      recommendedColdDays: 35,
      optimalPreservationSteps: [
        'Keep unwashed bunches inside the original breathable pouch in cold chiller at 0°C - 2°C',
        'Rinse thoroughly with cold running water only immediately prior to serving'
      ],
      spoilageIndicators: ['Bleached berry skin around pedicel', 'Stem browning and shriveling', 'Loose berry shatter']
    },
    recipes: [
      {
        title: 'Frozen Resveratrol Grape Sorbet Bites',
        prepTime: '5 mins + freeze',
        healthBenefit: 'Freezing preserves resveratrol polyphenol rings intact without thermal degradation',
        ingredients: ['2 cups seedless grapes', '1 tsp lime juice', 'Mint leaves'],
        steps: [
          'Wash and pat grapes thoroughly dry',
          'Toss with fresh lime juice and freeze flat on a parchment tray for 3 hours',
          'Enjoy as crisp frozen electrolyte pearls'
        ]
      }
    ]
  },
  {
    id: 'crop-spinach',
    name: 'Hydroponic Baby Spinach & Greens',
    scientificName: 'Spinacia oleracea',
    category: 'Greens',
    icon: '🥬',
    color: '#059669',
    variety: 'Baby Bloomsdale / Tyee',
    basePricePerKg: 60,
    optimalTempRange: [1, 3],
    optimalHumidityRange: [95, 98],
    ripenessDays: 8,
    currentMaturityStage: 80,
    ethyleneSensitivity: 'High',
    respirationRate: 'High',
    qualityTechniques: [
      {
        title: 'Electrolyzed Ozone Water Rinse',
        description: 'Wash cut tender leaves in 1.5 ppm ozonated chilled water to reduce microbial count to 0 without chlorine residues.',
        impact: 'Clean certificate, 100% pesticide-free audit',
        urgency: 'Immediate'
      }
    ],
    harvestingGuidance: {
      daysRemaining: 2,
      recommendedWindow: 'October 5 - October 7',
      sugarBrixTarget: '4.0 - 5.5 °Bx',
      firmnessKgCm2: 'N/A (Tender Leaf)',
      idealTimeOfDay: '05:00 AM - 07:00 AM',
      fieldPrecautions: [
        'Harvest before direct sunshine breaks morning dew',
        'Handle by stems to avoid bruising the tender photosynthetic lamina'
      ]
    },
    packagingPresets: {
      recommendedMaterial: 'Sealed PLA Bio-Film Pillow Pack with nitrogen gas flush (N2 MAP)',
      coldChainTier: 'Strict Cold Chain 1°C - 3°C',
      idealStorageTemp: '2°C',
      humidityTarget: '98% RH',
      shockDampeningRating: 4.2,
      ventilationType: 'Hermetically heat-sealed with anti-fog respiration balancing membrane',
      ethyleneControl: 'Potassium permanganate filter sachet',
      cushioningSpecs: 'Cushioned air pillow packaging geometry',
      estimatedCostPerKg: 3.5
    },
    nutrition: {
      calories: 23,
      vitaminC_mg: 28.1,
      vitaminA_IU: 9377,
      dietaryFiber_g: 2.2,
      potassium_mg: 558,
      antioxidantIndex: 95,
      glycemicIndex: 15,
      highlights: ['Huge plant Iron & Folate content', 'Lutein for eye health', 'Nitrates that support vascular oxygenation']
    },
    shelfLife: {
      ambientDays: 2,
      recommendedColdDays: 12,
      optimalPreservationSteps: [
        'Keep unopened in nitrogen gas bag in the coldest refrigerator drawer',
        'Line storage box with paper towel to absorb excess condensation'
      ],
      spoilageIndicators: ['Dark slimy leaf liquefaction', 'Ammonia odor', 'Yellowing of cotyledons']
    },
    recipes: [
      {
        title: 'Nutrient-Surge Green Micro-Elixir',
        prepTime: '8 mins',
        healthBenefit: 'Ascorbic acid from lemon quadruples non-heme iron absorption from spinach',
        ingredients: ['2 cups baby spinach', '1 green apple', '1/2 inch ginger root', 'Juice of 1 fresh lemon', '1 cup tender coconut water'],
        steps: [
          'Blend baby spinach, diced green apple, and fresh peeled ginger with coconut water',
          'Stir in fresh lemon juice right before drinking to prevent iron oxidation'
        ]
      }
    ]
  },
  {
    id: 'crop-basmati',
    name: 'Dehradun Aged Basmati Rice (Paddy)',
    scientificName: 'Oryza sativa var. Basmati',
    category: 'Grain',
    icon: '🌾',
    color: '#fbbf24',
    variety: 'Pusa 1121 Extra Long Grain (2-Yr Aged)',
    basePricePerKg: 110,
    optimalTempRange: [15, 22],
    optimalHumidityRange: [40, 50],
    ripenessDays: 30,
    currentMaturityStage: 94,
    ethyleneSensitivity: 'Low',
    respirationRate: 'Low',
    qualityTechniques: [
      {
        title: 'Grain Moisture Equilibrium Desiccation',
        description: 'Maintain paddy moisture between 12.0% and 13.5% using indirect solar drying tunnels to prevent chalky grain fissures.',
        impact: 'Achieves 8.4mm cooked elongation ratio',
        urgency: 'Immediate'
      },
      {
        title: 'Aroma-Sealing Silo Nitrogen Blanketing',
        description: 'Purge silos with 98% nitrogen to preserve 2-acetyl-1-pyrroline (natural basmati fragrance compound).',
        impact: 'Preserves fragrant pandan aroma for 36 months',
        urgency: 'Scheduled'
      }
    ],
    harvestingGuidance: {
      daysRemaining: 3,
      recommendedWindow: 'October 6 - October 10',
      sugarBrixTarget: 'N/A (Starch Maturity 13% Moisture)',
      firmnessKgCm2: '7.8 kg/cm²',
      idealTimeOfDay: '10:00 AM - 04:00 PM (Low Ambient Moisture)',
      fieldPrecautions: [
        'Harvest using combine with rubber-coated beaters to prevent micro-cracking',
        'Store in food-grade hermetic poly-woven bags'
      ]
    },
    packagingPresets: {
      recommendedMaterial: 'Multi-Wall Moisture-Barrier Kraft Bags with Food-Grade HDPE Hermetic Inner Liner',
      coldChainTier: 'Dry Ambient Pest-Protected Logistics (18°C - 22°C)',
      idealStorageTemp: '20°C',
      humidityTarget: '45% RH',
      shockDampeningRating: 4.5,
      ventilationType: 'Hermetically Sealed (Zero Air Permeation)',
      ethyleneControl: 'Not required (non-climacteric grain)',
      cushioningSpecs: 'Reinforced palletized shrink-wrap with corrugated base sheets',
      estimatedCostPerKg: 1.8
    },
    nutrition: {
      calories: 130,
      vitaminC_mg: 0,
      vitaminA_IU: 0,
      dietaryFiber_g: 1.4,
      potassium_mg: 35,
      antioxidantIndex: 42,
      glycemicIndex: 52,
      highlights: ['Naturally gluten-free', 'Low glycemic response', 'Zero saturated fats']
    },
    shelfLife: {
      ambientDays: 730,
      recommendedColdDays: 1095,
      optimalPreservationSteps: [
        'Store in airtight container with dried bay leaves or cloves to deter weevils',
        'Keep in cool, dark pantry away from damp walls and direct heat sources'
      ],
      spoilageIndicators: ['Musty mold odor', 'Clumped webbed grains', 'Weevil larval activity']
    },
    recipes: [
      {
        title: 'Royal Saffron Infused Basmati Pilaf',
        prepTime: '30 mins',
        healthBenefit: 'Saffron crocin antioxidants enhance neuro-cognitive clarity and digestive assimilation',
        ingredients: ['1 cup aged Basmati rice', 'A pinch of Kashmiri saffron', '1 cinnamon stick', '2 green cardamoms', 'Cold-pressed ghee'],
        steps: [
          'Wash rice gently until water runs crystal clear; soak for 30 minutes',
          'Blooms saffron threads in 2 tablespoons warm water for 15 minutes',
          'Sauté whole spices in ghee, add drained rice, and simmer covered for 12 minutes on low heat'
        ]
      }
    ]
  },
  {
    id: 'crop-almonds',
    name: 'Kashmiri Organic Mamra Almonds',
    scientificName: 'Prunus dulcis',
    category: 'Dry Fruit',
    icon: '🥜',
    color: '#d97706',
    variety: 'Kashmiri Mamra Grade-1 (Zero Oil Extraction)',
    basePricePerKg: 1450,
    optimalTempRange: [10, 15],
    optimalHumidityRange: [50, 60],
    ripenessDays: 20,
    currentMaturityStage: 98,
    ethyleneSensitivity: 'Low',
    respirationRate: 'Low',
    qualityTechniques: [
      {
        title: 'Zero Heat Natural Shade Drying',
        description: 'Dehusked almonds dried in shaded alpine ventilated lofts to retain 100% natural monosaturated oils (50% oil content).',
        impact: 'Maintains 50% natural almond oil content without rancidity',
        urgency: 'Immediate'
      }
    ],
    harvestingGuidance: {
      daysRemaining: 1,
      recommendedWindow: 'October 4 - October 6',
      sugarBrixTarget: 'N/A (Kernel Moisture < 5%)',
      firmnessKgCm2: '8.5 kg/cm²',
      idealTimeOfDay: '08:00 AM - 12:00 PM',
      fieldPrecautions: [
        'Shake trees using padded boughs onto sanitized tarpaulins',
        'De-hull within 24 hours of orchard pickup'
      ]
    },
    packagingPresets: {
      recommendedMaterial: 'Nitrogen-Flushed Vacuum Sealed Aluminum Foil Standup Pouch in Master Rigid Carton',
      coldChainTier: 'Cool Dry Logistics (12°C - 15°C) to prevent oil rancidification',
      idealStorageTemp: '12°C',
      humidityTarget: '55% RH',
      shockDampeningRating: 4.8,
      ventilationType: 'Vacuum sealed (Oxygen Barrier < 0.5 cc/m²/day)',
      ethyleneControl: 'Oxygen absorber packet (Ageless O2 Scavenger)',
      cushioningSpecs: 'Triple-wall carton with micro-foam sheet separators',
      estimatedCostPerKg: 12.0
    },
    nutrition: {
      calories: 579,
      vitaminC_mg: 0,
      vitaminA_IU: 2,
      dietaryFiber_g: 12.5,
      potassium_mg: 733,
      antioxidantIndex: 97,
      glycemicIndex: 15,
      highlights: ['Massive Vitamin E (Alpha-tocopherol)', 'Brain-boosting riboflavin & L-carnitine', '50% Oleic acid healthy fats']
    },
    shelfLife: {
      ambientDays: 180,
      recommendedColdDays: 365,
      optimalPreservationSteps: [
        'Store in airtight glass jar in the refrigerator or cool dark cupboard',
        'Soak overnight and peel skin to deactivate enzyme inhibitors (phytic acid)'
      ],
      spoilageIndicators: ['Bitter sour rancid oil taste', 'Shrunken rubbery kernel', 'Dark spotty fungal discoloration']
    },
    recipes: [
      {
        title: 'Activated Mamra Almond & Medjool Date Tonic',
        prepTime: '10 mins + soak',
        healthBenefit: 'Overnight soaking deactivates phytic acid for 200% higher zinc and magnesium absorption',
        ingredients: ['10 Kashmiri Mamra almonds', '2 soft dates', '1 cup warm oat or cow milk', 'Pinch of ground nutmeg'],
        steps: [
          'Soak Mamra almonds overnight (8 hours) in filtered water and peel outer skins',
          'Blend soaked almonds, pitted dates, and warm milk until frothy and velvety smooth'
        ]
      }
    ]
  },
  {
    id: 'crop-walnuts',
    name: 'Royal Himalayan In-Shell Walnuts',
    scientificName: 'Juglans regia',
    category: 'Dry Fruit',
    icon: '🌰',
    color: '#92400e',
    variety: 'Kashmir Kagzi Thin-Shell Grade-A',
    basePricePerKg: 680,
    optimalTempRange: [8, 14],
    optimalHumidityRange: [50, 60],
    ripenessDays: 15,
    currentMaturityStage: 96,
    ethyleneSensitivity: 'Low',
    respirationRate: 'Low',
    qualityTechniques: [
      {
        title: 'Gentle Mechanical Hull Removal & Ozone Wash',
        description: 'Strip green hulls immediately to prevent tannin penetration into the ivory kernel.',
        impact: 'Maintains extra-light ivory kernel grading',
        urgency: 'Immediate'
      }
    ],
    harvestingGuidance: {
      daysRemaining: 2,
      recommendedWindow: 'October 5 - October 8',
      sugarBrixTarget: 'N/A (Kernel Moisture 4.5%)',
      firmnessKgCm2: 'Hard Shell',
      idealTimeOfDay: '07:00 AM - 11:00 AM',
      fieldPrecautions: [
        'Harvest when green hulls split open naturally',
        'Dry to 4.5% kernel moisture within 48 hours'
      ]
    },
    packagingPresets: {
      recommendedMaterial: 'Double-Walled Heavy Corrugated Master Box with breathable woven polypropylene bags',
      coldChainTier: 'Cool Dry Supply (10°C - 14°C)',
      idealStorageTemp: '12°C',
      humidityTarget: '55% RH',
      shockDampeningRating: 4.6,
      ventilationType: 'Breathable woven mesh',
      ethyleneControl: 'Dessicant pouch to prevent mold',
      cushioningSpecs: 'Corrugated perimeter cushion',
      estimatedCostPerKg: 5.5
    },
    nutrition: {
      calories: 654,
      vitaminC_mg: 1.3,
      vitaminA_IU: 20,
      dietaryFiber_g: 6.7,
      potassium_mg: 441,
      antioxidantIndex: 99,
      glycemicIndex: 15,
      highlights: ['Highest plant-based Omega-3 ALA of any nut', 'Neuro-protective polyphenols', 'Melatonin for deep circadian sleep']
    },
    shelfLife: {
      ambientDays: 150,
      recommendedColdDays: 365,
      optimalPreservationSteps: [
        'Store in-shell in cool dry burlap sack away from pungent spices',
        'Once cracked, keep kernels in sealed glass jar in refrigerator'
      ],
      spoilageIndicators: ['Oil rancidity odor (paint-like scent)', 'Dark blackened kernel', 'Dry shriveled meat']
    },
    recipes: [
      {
        title: 'Cognitive Boost Walnut & Raw Honey Crunch',
        prepTime: '5 mins',
        healthBenefit: 'Alpha-linolenic acid (ALA) supports cellular brain membrane integrity',
        ingredients: ['1/2 cup raw walnuts', '2 tbsp raw wildflower honey', 'Pinch of Ceylon cinnamon'],
        steps: [
          'Lightly crush walnut halves with a rolling pin',
          'Drizzle raw wildflower honey and dust with Ceylon cinnamon for immediate bioavailable energy'
        ]
      }
    ]
  },
  {
    id: 'crop-cashews',
    name: 'Mangalore Gold Cashew Kernels (W180/W210)',
    scientificName: 'Anacardium occidentale',
    category: 'Dry Fruit',
    icon: '🥜',
    color: '#fde047',
    variety: 'King Size Jumbo White Wholes (W180)',
    basePricePerKg: 920,
    optimalTempRange: [15, 20],
    optimalHumidityRange: [50, 60],
    ripenessDays: 12,
    currentMaturityStage: 95,
    ethyleneSensitivity: 'Low',
    respirationRate: 'Low',
    qualityTechniques: [
      {
        title: 'Precision Steam Roasting & Kernel Peeling',
        description: 'Superheated steam shelling process ensuring whole unblemished white kernels without scorching.',
        impact: 'Achieves 98% King Size W180 grade retention',
        urgency: 'Scheduled'
      }
    ],
    harvestingGuidance: {
      daysRemaining: 2,
      recommendedWindow: 'October 5 - October 8',
      sugarBrixTarget: 'N/A (Kernel Moisture 5%)',
      firmnessKgCm2: '7.5 kg/cm²',
      idealTimeOfDay: '08:00 AM - 11:30 AM',
      fieldPrecautions: [
        'Separate cashew nut from apple immediately upon tree fall',
        'Sun dry raw nuts on concrete yard for 3 days before shelling'
      ]
    },
    packagingPresets: {
      recommendedMaterial: 'CO2/Nitrogen Flush Vacuum Sealed Metal Tin (Vita-Pack) or Multi-Layer High-Barrier Pouches',
      coldChainTier: 'Dry Ambient Logistics (18°C - 22°C)',
      idealStorageTemp: '20°C',
      humidityTarget: '55% RH',
      shockDampeningRating: 4.7,
      ventilationType: 'Hermetically Sealed (Zero Gas Exchange)',
      ethyleneControl: 'Oxygen scavenger sachet',
      cushioningSpecs: 'Carton with inner paper fluting',
      estimatedCostPerKg: 6.5
    },
    nutrition: {
      calories: 553,
      vitaminC_mg: 0.5,
      vitaminA_IU: 0,
      dietaryFiber_g: 3.3,
      potassium_mg: 660,
      antioxidantIndex: 82,
      glycemicIndex: 25,
      highlights: ['Rich in Magnesium & Copper for collagen synthesis', 'Heart-healthy monounsaturated fats', 'Zinc for immune defense']
    },
    shelfLife: {
      ambientDays: 180,
      recommendedColdDays: 365,
      optimalPreservationSteps: [
        'Keep in vacuum-sealed container in dry pantry away from light',
        'Do not expose to open humid air as cashews absorb moisture readily'
      ],
      spoilageIndicators: ['Soft stale chewiness', 'Rancid oil taste', 'Yellow-brown oxidation spots']
    },
    recipes: [
      {
        title: 'Creamy Probiotic Cashew Ferment & Herb Spread',
        prepTime: '15 mins + ferment',
        healthBenefit: 'Fermentation pre-digests plant proteins and introduces live beneficial gut flora',
        ingredients: ['1 cup raw cashews soaked', '1 probiotic capsule', '2 tbsp lemon juice', 'Fresh dill', 'Garlic powder'],
        steps: [
          'Soak cashews in hot water for 20 mins and blend completely smooth with lemon juice',
          'Empty probiotic powder into cashew cream, stir gently, and let sit at room temp for 12 hours to culture'
        ]
      }
    ]
  },
  {
    id: 'crop-apples',
    name: 'Kashmiri Royal Delicious Apples',
    scientificName: 'Malus domestica',
    category: 'Fruit',
    icon: '🍎',
    color: '#dc2626',
    variety: 'Royal Delicious High-Altitude Heirloom',
    basePricePerKg: 130,
    optimalTempRange: [0, 2],
    optimalHumidityRange: [90, 95],
    ripenessDays: 15,
    currentMaturityStage: 90,
    ethyleneSensitivity: 'High',
    respirationRate: 'Moderate',
    qualityTechniques: [
      {
        title: 'Pre-Harvest Calcium Spray Protocol',
        description: 'Apply calcium chloride foliar spray 2 weeks prior to harvest to prevent bitter pit and sustain crisp cellular turgor.',
        impact: 'Prevents 15% internal breakdown',
        urgency: 'Immediate'
      }
    ],
    harvestingGuidance: {
      daysRemaining: 3,
      recommendedWindow: 'October 6 - October 10',
      sugarBrixTarget: '13.5 - 15.0 °Bx',
      firmnessKgCm2: '7.5 - 8.2 kg/cm²',
      idealTimeOfDay: '07:00 AM - 10:30 AM',
      fieldPrecautions: [
        'Pick with thumb on stem and lift upward to avoid spur damage',
        'Pre-cool to 4°C within 12 hours of harvest'
      ]
    },
    packagingPresets: {
      recommendedMaterial: '5-Ply Kraft Master Telescopic Carton with Molded Pulp Cell Trays (Layer of 20)',
      coldChainTier: 'Cold Chain Controlled Atmosphere (0.5°C - 2°C)',
      idealStorageTemp: '1°C',
      humidityTarget: '92% RH',
      shockDampeningRating: 4.8,
      ventilationType: 'Vented side slots with micro-perforated liner',
      ethyleneControl: '1-MCP Freshness strip to halt ethylene ripening',
      cushioningSpecs: 'Individual cell pulp pocket divider',
      estimatedCostPerKg: 3.8
    },
    nutrition: {
      calories: 52,
      vitaminC_mg: 4.6,
      vitaminA_IU: 54,
      dietaryFiber_g: 2.4,
      potassium_mg: 107,
      antioxidantIndex: 89,
      glycemicIndex: 36,
      highlights: ['Pectin prebiotic soluble fiber', 'Quercetin antioxidant for lung & heart support', 'Hydrating electrolyte water']
    },
    shelfLife: {
      ambientDays: 10,
      recommendedColdDays: 60,
      optimalPreservationSteps: [
        'Store in the coldest crisper section of your refrigerator in perforated bag',
        'Keep isolated from leafy greens as apples emit ethylene gas'
      ],
      spoilageIndicators: ['Soft spongy core', 'Bruised brown skin depressions', 'Mealy dry texture']
    },
    recipes: [
      {
        title: 'Warm Spiced Royal Apple & Cinnamon Compote',
        prepTime: '15 mins',
        healthBenefit: 'Gentle stewing releases soluble pectin to coat and heal the gastrointestinal mucosal lining',
        ingredients: ['2 crisp Royal apples diced', '1 cinnamon stick', '2 whole cloves', '1 tbsp raw honey', 'Splash of lemon juice'],
        steps: [
          'Combine diced apples with whole cinnamon, cloves, and 2 tbsp water in small saucepan',
          'Simmer covered on low for 12 minutes until tender but holding shape; stir in raw honey'
        ]
      }
    ]
  },
  {
    id: 'crop-wheat',
    name: 'Madhya Pradesh Sharbati Golden Wheat',
    scientificName: 'Triticum aestivum var. Sharbati',
    category: 'Grain',
    icon: '🌾',
    color: '#eab308',
    variety: 'Sehore Sharbati Heritage Grain',
    basePricePerKg: 46,
    optimalTempRange: [18, 24],
    optimalHumidityRange: [40, 50],
    ripenessDays: 25,
    currentMaturityStage: 96,
    ethyleneSensitivity: 'Low',
    respirationRate: 'Low',
    qualityTechniques: [
      {
        title: 'Black Soil Natural Maturation Protocol',
        description: 'Allow wheat spikes to desiccate fully under sun until grain moisture drops below 11.5% for rot-free storage.',
        impact: 'Heavy luster, high protein (13.5%)',
        urgency: 'Immediate'
      }
    ],
    harvestingGuidance: {
      daysRemaining: 4,
      recommendedWindow: 'October 7 - October 12',
      sugarBrixTarget: 'N/A (Moisture < 11.5%)',
      firmnessKgCm2: '8.2 kg/cm²',
      idealTimeOfDay: '10:00 AM - 04:00 PM',
      fieldPrecautions: [
        'Thresh at optimal drum speed to prevent internal embryo cracking',
        'Store on raised wooden pallets off ground'
      ]
    },
    packagingPresets: {
      recommendedMaterial: 'Multi-layer BOPP Laminated Moisture-Proof Grain Bags',
      coldChainTier: 'Dry Ambient Pest-Protected Storage (20°C - 24°C)',
      idealStorageTemp: '22°C',
      humidityTarget: '45% RH',
      shockDampeningRating: 4.3,
      ventilationType: 'Hermetically Sealed with Gas Barrier',
      ethyleneControl: 'Not required',
      cushioningSpecs: 'BOPP outer ply with heavy woven PP structure',
      estimatedCostPerKg: 1.2
    },
    nutrition: {
      calories: 340,
      vitaminC_mg: 0,
      vitaminA_IU: 0,
      dietaryFiber_g: 10.7,
      potassium_mg: 363,
      antioxidantIndex: 56,
      glycemicIndex: 45,
      highlights: ['High natural plant protein (13.5%)', 'Complex carbohydrates for sustained energy', 'Rich in B-vitamins and magnesium']
    },
    shelfLife: {
      ambientDays: 365,
      recommendedColdDays: 730,
      optimalPreservationSteps: [
        'Store in airtight stainless steel container in cool dry pantry',
        'Add dried neem leaves or boric grain tablets to preserve freshness'
      ],
      spoilageIndicators: ['Musty mold dampness', 'Grain weevil infestation', 'Clumped flour dust']
    },
    recipes: [
      {
        title: 'Stone-Ground Sharbati Sourdough Flatbread',
        prepTime: '25 mins',
        healthBenefit: 'Slow natural fermentation breaks down gluten proteins for easy digestive assimilation',
        ingredients: ['2 cups stone-ground Sharbati flour', '1/2 cup warm water', 'Pinch of rock salt', 'Cold-pressed sesame oil'],
        steps: [
          'Knead flour with warm water and sea salt into a soft elastic dough; rest 20 mins',
          'Roll thin and toast on a hot cast iron skillet until puffed and golden brown'
        ]
      }
    ]
  }
];

// Universal Dynamic Crop Generator for Fallback
export function generateDynamicCrop(query: string, preferredCategory?: 'Fruit' | 'Vegetable' | 'Grain' | 'Greens' | 'Dry Fruit'): CropInfo {
  const name = query.trim().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
  const lower = name.toLowerCase();

  let category: 'Fruit' | 'Vegetable' | 'Grain' | 'Greens' | 'Dry Fruit' = preferredCategory || 'Fruit';
  let icon = '🌱';
  let tempRange: [number, number] = [10, 15];
  let humidityRange: [number, number] = [80, 90];
  let price = 65;
  let calories = 55;
  let shelfAmbient = 6;
  let shelfCold = 18;

  if (lower.includes('almond') || lower.includes('walnut') || lower.includes('cashew') || lower.includes('pista') || lower.includes('date') || lower.includes('nut') || lower.includes('raisin') || lower.includes('fig') || lower.includes('apricot') || lower.includes('kaju') || lower.includes('badam') || lower.includes('akhrot')) {
    category = 'Dry Fruit';
    icon = '🥜';
    tempRange = [12, 18];
    humidityRange = [45, 55];
    price = 750;
    calories = 580;
    shelfAmbient = 180;
    shelfCold = 365;
  } else if (lower.includes('rice') || lower.includes('wheat') || lower.includes('millet') || lower.includes('ragi') || lower.includes('jowar') || lower.includes('bajra') || lower.includes('oat') || lower.includes('barley') || lower.includes('grain') || lower.includes('corn') || lower.includes('maize') || lower.includes('chickpea') || lower.includes('dal') || lower.includes('lentil')) {
    category = 'Grain';
    icon = '🌾';
    tempRange = [18, 24];
    humidityRange = [40, 50];
    price = 85;
    calories = 340;
    shelfAmbient = 365;
    shelfCold = 730;
  } else if (lower.includes('spinach') || lower.includes('lettuce') || lower.includes('kale') || lower.includes('methi') || lower.includes('herb') || lower.includes('coriander') || lower.includes('mint') || lower.includes('green')) {
    category = 'Greens';
    icon = '🥬';
    tempRange = [2, 5];
    humidityRange = [92, 98];
    price = 45;
    calories = 25;
    shelfAmbient = 2;
    shelfCold = 10;
  } else if (lower.includes('potato') || lower.includes('onion') || lower.includes('carrot') || lower.includes('garlic') || lower.includes('ginger') || lower.includes('cabbage') || lower.includes('cauliflower') || lower.includes('pepper') || lower.includes('tomato') || lower.includes('brinjal') || lower.includes('eggplant')) {
    category = 'Vegetable';
    icon = '🥦';
    tempRange = [8, 12];
    humidityRange = [85, 92];
    price = 48;
    calories = 40;
    shelfAmbient = 8;
    shelfCold = 24;
  } else {
    category = 'Fruit';
    icon = '🍎';
    tempRange = [4, 10];
    humidityRange = [88, 94];
    price = 95;
    calories = 65;
    shelfAmbient = 5;
    shelfCold = 18;
  }

  const id = `crop-${lower.replace(/[^a-z0-9]/g, '-')}`;

  return {
    id,
    name: `${name} (Certified Pure)`,
    scientificName: `${name} spp.`,
    category,
    icon,
    color: '#8b5cf6',
    variety: 'Premium Native Heirloom Cultivar',
    basePricePerKg: price,
    optimalTempRange: tempRange,
    optimalHumidityRange: humidityRange,
    ripenessDays: 14,
    currentMaturityStage: 90,
    ethyleneSensitivity: category === 'Fruit' ? 'High' : 'Low',
    respirationRate: category === 'Greens' || category === 'Fruit' ? 'High' : 'Low',
    qualityTechniques: [
      {
        title: `Organic Precision Nutrition for ${name}`,
        description: `Apply targeted micro-nutrients and regulate soil moisture to maximize bio-density and grade-A market specification.`,
        impact: '+22% Grade-A Export Yield',
        urgency: 'Immediate'
      },
      {
        title: 'Microclimate Harvest Optimization',
        description: 'Execute dawn harvest to prevent heat respiration spike and preserve cell wall turgor.',
        impact: 'Zero shrinkage loss',
        urgency: 'Scheduled'
      }
    ],
    harvestingGuidance: {
      daysRemaining: 2,
      recommendedWindow: 'Current Harvest Window',
      sugarBrixTarget: category === 'Fruit' ? '12.0 - 15.0 °Bx' : 'Optimal Maturity',
      firmnessKgCm2: '5.5 - 6.5 kg/cm²',
      idealTimeOfDay: '06:00 AM - 09:00 AM',
      fieldPrecautions: [
        `Handle ${name.toLowerCase()} with food-safe gloves to preserve natural cuticular bloom`,
        'Store in shaded pre-cooling transit crates'
      ]
    },
    packagingPresets: {
      recommendedMaterial: category === 'Dry Fruit' || category === 'Grain'
        ? 'High-Barrier Multi-Ply Vacuum Pack with Hermetic Outer Master Carton'
        : '5-Ply Kraft Corrugated Box with precision ventilation slots and pulp tray',
      coldChainTier: category === 'Dry Fruit' || category === 'Grain'
        ? 'Dry Ambient Pest-Protected Storage (18°C - 22°C)'
        : `Active Cold Logistics (${tempRange[0]}°C - ${tempRange[1]}°C)`,
      idealStorageTemp: `${tempRange[0]}°C`,
      humidityTarget: `${humidityRange[0]}% RH`,
      shockDampeningRating: 4.8,
      ventilationType: 'Calibrated Micro-Perforations',
      ethyleneControl: 'Active Respiration Scavenger Insert',
      cushioningSpecs: 'Food-grade protective honeycomb liners',
      estimatedCostPerKg: 3.2
    },
    nutrition: {
      calories,
      vitaminC_mg: category === 'Fruit' || category === 'Vegetable' ? 32 : 2,
      vitaminA_IU: category === 'Greens' ? 4500 : 350,
      dietaryFiber_g: category === 'Dry Fruit' || category === 'Grain' ? 8.5 : 2.5,
      potassium_mg: 320,
      antioxidantIndex: 91,
      glycemicIndex: category === 'Fruit' ? 38 : 22,
      highlights: [`High bioavailable micronutrients in ${name}`, 'Pure certified heirloom provenance', 'Free from chemical residues']
    },
    shelfLife: {
      ambientDays: shelfAmbient,
      recommendedColdDays: shelfCold,
      optimalPreservationSteps: [
        `Store ${name.toLowerCase()} in a clean, ventilated container at recommended temperature`,
        'Keep away from strong ambient odors and direct sun radiation'
      ],
      spoilageIndicators: ['Soft tissue breakdown', 'Dull discolored exterior', 'Off-odor']
    },
    recipes: [
      {
        title: `Chef's Artisan ${name} Nutrient Elixir`,
        prepTime: '15 mins',
        healthBenefit: `Maximizes bioavailability of essential vitamins and minerals native to ${name.toLowerCase()}`,
        ingredients: [`Fresh ${name.toLowerCase()}`, 'Cold-pressed virgin olive oil or ghee', 'Himalayan pink salt', 'Fresh aromatics'],
        steps: [
          `Prepare ${name.toLowerCase()} gently to preserve natural enzymes`,
          'Combine with complementary healthy fats to enhance nutrient assimilation into the bloodstream'
        ]
      }
    ]
  };
}

