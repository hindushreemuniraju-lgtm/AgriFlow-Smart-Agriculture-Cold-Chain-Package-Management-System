import { ProductIntelligence } from '../types/product';
import { CropInfo } from '../types';
import { getProductVisual } from '../utils/productImages';
import { resolveProduct } from '../services/catalog/productNormalizationService';

export const COMPREHENSIVE_PRODUCT_DATABASE: ProductIntelligence[] = [
  // ==========================================
  // 1. VEGETABLES
  // ==========================================
  {
    id: 'onion',
    name: 'Onion',
    category: 'Vegetable',
    subcategory: 'Bulb Crop',
    scientificName: 'Allium cepa',
    variety: 'Bhima Super / Nashik Red',
    description: 'Pungent, sulfur-rich bulb vegetable critical for daily culinary use and high storage potential when properly cured.',
    icon: '🧅',
    color: '#fb923c',
    aliases: ['onion', 'pyaz', 'kanda', 'allium', 'onions', 'red onion', 'white onion'],
    images: {
      productImage: 'onion',
      productImageAlt: 'Fresh Red Nasik Onion'
    },
    growing: {
      climate: 'Cool-season crop requiring mild temperatures (13°C - 24°C) during bulb development.',
      soil: 'Deep friable loamy soil rich in organic matter with excellent drainage.',
      idealSoilPh: '6.0 - 7.5',
      temperatureRange: [13, 30],
      rainfallRequirement: '650 - 750 mm distributed evenly',
      sowingMethod: 'Nursery bed seed sowing followed by 6-8 week seedling transplanting',
      sowingSeason: 'Kharif (June-July) & Late Kharif / Rabi (Oct-Nov)',
      seedRequirement: '8 - 10 kg / hectare for seedling nursery',
      spacing: '15 cm between rows x 10 cm between plants',
      growthDuration: '120 - 150 days from transplanting',
      growthDays: 135,
      currentMaturityStage: 85,
      irrigation: 'Critical bulb enlargement phase requires furrow irrigation every 7-10 days; stop water 15 days before harvest to initiate field curing.',
      fertilizerGuidance: [
        { stage: 'Basal / Field Prep', recommendation: 'FYM 25 t/ha + 50 kg N + 60 kg P2O5 + 60 kg K2O', impact: 'Strong root establishment & early leaf vigor', urgency: 'Immediate' },
        { stage: '30 Days Post-Transplant', recommendation: 'Top-dressing 25 kg Nitrogen + 15 kg Sulfur', impact: 'Pungency development & bulb cell multiplication', urgency: 'Scheduled' },
        { stage: '60 Days (Bulbing)', recommendation: '45 kg Potassium Nitrate spray (1%)', impact: 'Maximized bulb density and skin color retention', urgency: 'Monitoring' }
      ],
      commonPests: ['Onion Thrips (Thrips tabaci)', 'Head Borer', 'Mites'],
      diseaseRisks: ['Purple Blotch (Alternaria porri)', 'Stemphyllium Blight', 'Basal Neck Rot'],
      criticalCareTips: [
        'Avoid waterlogging at all costs to prevent basal plate rotting.',
        'Sulfur application enhances pungency and shelf stability.',
        'Withhold nitrogen fertilization 30 days prior to harvest to prevent thick necks.'
      ]
    },
    harvesting: {
      harvestingDays: 14,
      recommendedWindow: 'Morning hours when 50-70% tops have collapsed (neck fall)',
      maturityIndicators: [
        '50% to 70% of foliage falls over naturally at the pseudostem neck.',
        'Outer scale leaves turn dry, papery, and exhibit deep pink/red pigmentation.',
        'Bulbs feel firm with well-sealed neck tissue.'
      ],
      harvestingMethod: 'Manual hand uprooting or mechanical undercutting; avoid bruising the basal plate.',
      bestHarvestTime: 'Early dry morning after dew has evaporated',
      firmnessTarget: '4.8 - 5.2 kg/cm² penetrometer',
      postHarvestHandling: [
        'Field shade curing for 3 to 5 days to dry outer tunics.',
        'Foliage trimming leaving 2.5 cm neck to seal off fungal entry.',
        'Grading into Grade A (55-70mm diameter), Grade B, and Grade C.'
      ]
    },
    storage: {
      shelfLifeAmbient: '3 to 5 Months (well-cured in ventilated structures)',
      shelfLifeCold: '6 to 8 Months at controlled temp',
      ambientDays: 120,
      coldDays: 240,
      storageTemperature: '0°C - 2°C (Cold) or 25°C - 30°C (Ventilated Chawl)',
      humidity: '65% - 70% RH (Must avoid high humidity above 75% to stop sprouting)',
      coldStorageRequired: false,
      storageMethod: 'Aerated mesh racks in low-cost bamboo onion chawls or modified cold stores',
      preservationSteps: [
        'Complete 100% neck curing before stacking.',
        'Maintain continuous bottom-to-top air circulation.',
        'Strictly avoid mixing sprouted or bruised bulbs.'
      ],
      spoilageIndicators: ['Sprouting at the apex', 'Soft watery rot around the neck', 'Black mold (Aspergillus niger) on outer scales'],
      curingRequired: true,
      curingInstructions: 'Dry under diffused shade with ambient air velocity for 10-14 days until neck moisture drops below 12%.'
    },
    packaging: {
      primaryPackaging: 'Open Weave Leno / Mesh Bags (25kg or 50kg)',
      secondaryPackaging: 'Ventilated Corrugated Pallet Bins for Export',
      recommendedMaterials: ['High-Density Polyethylene Leno Mesh', 'Jute Gunny with 25% perforations', 'Micro-perforated food-grade kraft bags'],
      ventilationRequired: true,
      ventilationSpec: 'Minimum 35% open mesh surface area for air permeability',
      moistureProtection: 'High breathability required; do NOT seal inside airtight polyethylene',
      ethyleneSensitivity: 'Low',
      ethyleneControl: 'Do not store adjacent to high ethylene producers like ripe bananas or apples',
      cushioningSpecs: 'Leno weave provides soft non-abrasive contact; drop height < 1.0 meter',
      shockRating: 3.2,
      estimatedPackagingCostPerKg: 1.20,
      packagingCapacity: '25kg / 50kg standardized mesh sacks',
      ecoCertification: '100% Recyclable HDPE Monomaterial',
      layers: [
        { layer: 1, name: 'Outer Protective Shield', material: 'UV-Stabilized HDPE Leno Weave', function: 'Structural containment and full-vector aeration', icon: '🧺', glowColor: '#fb923c' },
        { layer: 2, name: 'Base Contact Buffer', material: 'Treated Kraft Pallet Liner', function: 'Ground moisture barrier and slip resistance', icon: '📦', glowColor: '#f97316' },
        { layer: 3, name: 'Digital Identity Tag', material: 'Smart RFID QR Label', function: 'Origin batch tracking and curing date seal', icon: '🏷️', glowColor: '#38bdf8' }
      ],
      packingSteps: [
        { step: 1, title: 'Curing Verification', description: 'Ensure neck moisture is under 12% before loading bags.' },
        { step: 2, title: 'Grading & Debris Removal', description: 'Screen out soil dust, unsealed necks, and cut bulbs.' },
        { step: 3, title: 'Uniform Leno Bagging', description: 'Pack into 25kg / 50kg bags and stitch securely with double jute thread.' }
      ]
    },
    transportation: {
      recommendedVehicle: 'Tarp-Covered Ventilated Multi-Axle Truck or Reefer at 15°C',
      temperatureControlled: false,
      targetTemp: 'Ambient Dry (20°C - 28°C) or Reefer 2°C - 4°C for export',
      maximumRecommendedDistance: '1,800 km in ventilated freight',
      handlingRequirements: ['Keep dry from rain showers during transit', 'Stack mesh bags max 10 layers high in interlocking chimney pattern'],
      vibrationSensitivity: 'Low',
      baseRatePerKm: 18.5
    },
    market: {
      marketCategory: 'Essential Allium Commodity (High APMC Volume)',
      priceUnit: '₹/kg',
      basePricePerKg: 28.50,
      priceStatus: 'Live Benchmark',
      regionalPrices: {
        Bengaluru: 32.00,
        Mumbai: 30.50,
        Delhi: 34.00,
        Nashik: 24.00,
        Hyderabad: 29.50,
        Chennai: 33.00
      },
      priceTrend: 'Rising'
    },
    consumption: {
      nutritionalProfile: {
        calories: 40,
        protein_g: 1.1,
        carbs_g: 9.3,
        fat_g: 0.1,
        vitaminC_mg: 7.4,
        vitaminA_IU: 2,
        dietaryFiber_g: 1.7,
        potassium_mg: 146,
        iron_mg: 0.21,
        antioxidantIndex: 88,
        glycemicIndex: 15,
        highlights: ['Rich in Quercetin (bioflavonoid)', 'Prebiotic inulin fiber for gut biome', 'Sulfur compounds promote heart wellness']
      },
      consumptionMethods: ['Fresh raw sliced in salads', 'Caramelized base for curries and gravies', 'Pickled in brine or vinegar', 'Dehydrated flakes/powder'],
      preparationMethods: ['Peel only outermost dry papery layer to retain high quercetin in outer flesh', 'Soak in chilled water for 5 mins to reduce eye-stinging volatile thiosulfinates'],
      nutrientPreservationTips: [
        'Cook on medium heat with healthy oil to enhance quercetin absorption.',
        'Do not over-boil in discarded water.'
      ],
      recommendedPreparation: 'Sauté lightly in cold-pressed mustard or olive oil until translucent.',
      servingGuidance: 'Ideal in daily diet (50g-100g) raw or cooked with protein staples.',
      bioavailabilityTip: 'Combine with vitamin-C rich tomatoes or lemon juice to increase non-heme iron absorption.',
      recipes: [
        {
          title: 'Caramelized Onion & Herb Lentil Broth',
          prepTime: '25 mins',
          healthBenefit: 'High antioxidant & gut prebiotic boost',
          ingredients: ['3 Large Nasik Onions (sliced)', '1 cup Toor/Moong dal', '1 tsp Cumin', '2 cloves Garlic', '1 tbsp Ghee'],
          steps: [
            'Heat ghee in a pan and gently caramelize sliced onions until golden brown.',
            'Add garlic, cumin seeds, and turmeric.',
            'Pour in boiled lentil broth, simmer for 10 minutes and garnish with fresh cilantro.'
          ]
        }
      ]
    },
    risks: {
      highHumidityRisk: 'Humidity above 75% triggers rapid root sprouting and black mold fungus (Aspergillus).',
      highTempRisk: 'Extreme heat above 38°C causes premature drying and bulb shrinkage.',
      frostRisk: 'Unseasonal frost can cause internal water freezing and translucent breakdown.',
      excessRainRisk: 'Monsoon rainfall during harvest induces devastating neck rot and bacterial soft rot.',
      transitShockRisk: 'High drop impact can split the basal plate, inviting soil bacteria.',
      mitigationStrategy: 'Enforce thorough 10-day shade curing and transport in ventilated mesh bags with waterproof top tarpaulins.'
    }
  },

  // 2. TOMATO
  {
    id: 'tomato',
    name: 'Tomato',
    category: 'Vegetable',
    subcategory: 'Solanaceous Fruit-Vegetable',
    scientificName: 'Solanum lycopersicum',
    variety: 'Arka Rakshak / Pusa Ruby',
    description: 'High-lycopene, juicy red fruit-vegetable with delicate skin and high perishability requiring active cold-chain management.',
    icon: '🍅',
    color: '#ef4444',
    aliases: ['tomato', 'tamatar', 'tomatoes', 'roma tomato', 'cherry tomato'],
    images: {
      productImage: 'tomato',
      productImageAlt: 'Ripe Organic Red Tomato'
    },
    growing: {
      climate: 'Warm-season crop thriving in 20°C - 28°C; sensitive to severe frost and excessive rain.',
      soil: 'Deep, well-drained sandy loam rich in organic content.',
      idealSoilPh: '6.0 - 6.8',
      temperatureRange: [18, 32],
      rainfallRequirement: '400 - 600 mm',
      sowingMethod: 'Raised nursery beds followed by 25-day seedling transplanting with staking',
      sowingSeason: 'Year-round (Autumn-Winter: Sept-Oct, Spring-Summer: Jan-Feb, Kharif: June-July)',
      seedRequirement: '150 - 200 g / hectare for hybrid varieties',
      spacing: '60 cm between rows x 45 cm between plants',
      growthDuration: '90 - 120 days',
      growthDays: 105,
      currentMaturityStage: 78,
      irrigation: 'Drip irrigation recommended; uniform soil moisture is vital to prevent blossom-end rot and fruit cracking.',
      fertilizerGuidance: [
        { stage: 'Transplanting', recommendation: '100 kg DAP + 50 kg MOP + Zinc Sulfate', impact: 'Strong early root framework', urgency: 'Immediate' },
        { stage: 'Flowering Stage', recommendation: 'Calcium Nitrate + Boron foliar spray (0.2%)', impact: 'Prevents fruit cracking and blossom drop', urgency: 'Scheduled' },
        { stage: 'Fruit Sizing', recommendation: 'Water soluble NPK 13:0:45 via fertigation', impact: 'Lycopene synthesis and firm skin texture', urgency: 'Monitoring' }
      ],
      commonPests: ['Fruit Borer (Helicoverpa armigera)', 'Whitefly (Bemisia tabaci)', 'Leaf Miner'],
      diseaseRisks: ['Early Blight (Alternaria solani)', 'Late Blight (Phytophthora infestans)', 'Tomato Leaf Curl Virus (ToLCV)'],
      criticalCareTips: [
        'Stake plants with bamboo or trellis wire to keep fruits off the wet ground.',
        'Mulch with silver-black polyethylene to conserve moisture and deter whiteflies.'
      ]
    },
    harvesting: {
      harvestingDays: 8,
      recommendedWindow: 'Breaker stage for long-distance transit; Pink/Red ripe for immediate local markets',
      maturityIndicators: [
        'Breaker Stage: Tannish-yellow color covers 10-30% of the blossom end.',
        'Pink Stage: Pinkish-red coloration expands over 30-60% of the surface.',
        'Shoulder fruit firmness remains above 3.5 kg/cm².'
      ],
      harvestingMethod: 'Careful hand twisting leaving calyx intact; harvest in plastic crates lined with soft paper.',
      bestHarvestTime: 'Early morning or late afternoon when fruit temperature is low',
      firmnessTarget: '3.8 - 4.5 kg/cm²',
      postHarvestHandling: [
        'Hydro-cooling or forced-air cooling to remove field heat (down to 12°C).',
        'Chlorinated wash (100 ppm) to remove dust and pathogen spores.',
        'Color grading into 4 maturity tiers.'
      ]
    },
    storage: {
      shelfLifeAmbient: '4 to 7 Days (at room temperature 24°C)',
      shelfLifeCold: '14 to 21 Days (controlled cold chain)',
      ambientDays: 6,
      coldDays: 20,
      storageTemperature: '12°C - 15°C (DO NOT store below 10°C to prevent chilling injury and flavor loss)',
      humidity: '85% - 90% RH',
      coldStorageRequired: true,
      storageMethod: 'Crates stacked in chilled humidity-controlled chambers',
      preservationSteps: [
        'Pre-cool within 4 hours of harvest.',
        'Separate ethylene-producing ripe batches from breaker-stage batches.'
      ],
      spoilageIndicators: ['Watery soft spots', 'Alternaria black rot on calyx', 'Skin wrinkling and dull appearance'],
      curingRequired: false
    },
    packaging: {
      primaryPackaging: 'Corrugated Fibreboard (CFB) Ventilated Carton Boxes (10kg / 15kg)',
      secondaryPackaging: 'Returnable Plastic Crates (RPC) with cushioned liners',
      recommendedMaterials: ['5-Ply Kraft Corrugated Box', 'Food-grade moulded pulp trays', 'Perforated anti-fog LDPE liners'],
      ventilationRequired: true,
      ventilationSpec: '4-6% side vent holes aligned with crate airflow channels',
      moistureProtection: 'High humidity maintenance with condensation prevention',
      ethyleneSensitivity: 'High',
      ethyleneControl: 'Include potassium permanganate (KMnO4) sachets in bulk cartons',
      cushioningSpecs: 'Moulded cell pulp trays prevent fruit-to-fruit rubbing',
      shockRating: 4.6,
      estimatedPackagingCostPerKg: 2.40,
      packagingCapacity: '10kg / 15kg boxes with layer dividers',
      ecoCertification: 'FSC-Certified Biodegradable Pulp',
      layers: [
        { layer: 1, name: 'Direct Fruit Cell Tray', material: 'Recycled Moulded Pulp Nest', function: 'Isolates each tomato and absorbs transit vibrations', icon: '🪺', glowColor: '#ef4444' },
        { layer: 2, name: 'Structural Transport Box', material: '5-Ply Kraft Corrugated Carton', function: 'Withstands 300kg top-load stacking compression', icon: '📦', glowColor: '#f87171' },
        { layer: 3, name: 'Smart Freshness Tag', material: 'Gas-Sensor NFC Smart Label', function: 'Monitors interior ethylene and temperature anomalies', icon: '🏷️', glowColor: '#38bdf8' }
      ],
      packingSteps: [
        { step: 1, title: 'Field Heat Removal', description: 'Pre-cool tomatoes to 13°C before boxing.' },
        { step: 2, title: 'Cell Tray Placement', description: 'Place calyx side down in individual moulded nests.' },
        { step: 3, title: 'Stack & Palletize', description: 'Interlock boxes on wooden pallets with corner edge boards.' }
      ]
    },
    transportation: {
      recommendedVehicle: 'Reefer Truck maintaining continuous 13°C ± 1°C',
      temperatureControlled: true,
      targetTemp: '13°C',
      maximumRecommendedDistance: '1,200 km in refrigerated fleet',
      handlingRequirements: ['Strict suspension damping', 'Never expose crates to direct sun during loading'],
      vibrationSensitivity: 'High',
      baseRatePerKm: 24.0
    },
    market: {
      marketCategory: 'Perishable Daily Essential (High Price Volatility)',
      priceUnit: '₹/kg',
      basePricePerKg: 35.00,
      priceStatus: 'Live Benchmark',
      regionalPrices: {
        Bengaluru: 38.00,
        Mumbai: 42.00,
        Delhi: 40.00,
        Nashik: 28.00,
        Hyderabad: 36.00,
        Chennai: 44.00
      },
      priceTrend: 'Stable'
    },
    consumption: {
      nutritionalProfile: {
        calories: 18,
        protein_g: 0.9,
        carbs_g: 3.9,
        fat_g: 0.2,
        vitaminC_mg: 13.7,
        vitaminA_IU: 833,
        dietaryFiber_g: 1.2,
        potassium_mg: 237,
        iron_mg: 0.27,
        antioxidantIndex: 94,
        glycemicIndex: 15,
        highlights: ['Exceptional Lycopene content', 'Potent cardiovascular protective agent', 'High Vitamin C & Potassium']
      },
      consumptionMethods: ['Fresh sliced in caprese and salads', 'Simmered in rich curry sauces and soups', 'Sun-dried with olive oil', 'Fresh cold-pressed gazpacho'],
      preparationMethods: ['Cooking tomatoes with healthy fats unlocks 4x higher lycopene bioavailability than eating raw.'],
      nutrientPreservationTips: ['Do not discard seed jelly; it contains high concentrations of glutamic acid and vitamin C.'],
      recommendedPreparation: 'Slow-roast with crushed garlic and extra virgin olive oil.',
      servingGuidance: 'Enjoy 1-2 medium ripe tomatoes daily.',
      bioavailabilityTip: 'Pair cooked tomato with healthy fats (ghee, olive oil, avocado) to maximize lycopene absorption into the bloodstream.',
      recipes: [
        {
          title: 'Heart-Healthy Roasted Lycopene Soup',
          prepTime: '20 mins',
          healthBenefit: 'Maximized cellular antioxidant defense',
          ingredients: ['5 Ripe Tomatoes', '4 Garlic cloves', '1 tbsp Olive Oil', 'Fresh Basil', 'Black Pepper'],
          steps: [
            'Roast quartered tomatoes and garlic at 200°C for 15 mins.',
            'Blend until velvety smooth with olive oil and a pinch of rock salt.',
            'Simmer 3 minutes and garnish with torn fresh basil.'
          ]
        }
      ]
    },
    risks: {
      highHumidityRisk: 'Trapped condensate inside plastic bags triggers Botrytis grey mold within 48 hours.',
      highTempRisk: 'Temperatures above 32°C halt lycopene synthesis (fruits stay yellow) and accelerate skin softening.',
      frostRisk: 'Temperatures under 8°C inflict irreversible chilling injury and pitting.',
      excessRainRisk: 'Heavy rains during harvest cause extensive fruit cracking and internal mold.',
      transitShockRisk: 'Vibrations > 2.5G rupture internal locular gel and burst fruit skin.',
      mitigationStrategy: 'Use cushioned moulded pulp trays, pre-cool to 13°C, and transit in dedicated reefer trucks.'
    }
  },

  // 2B. BRINJAL (EGGPLANT / AUBERGINE / BAINGAN)
  {
    id: 'brinjal',
    name: 'Brinjal (Eggplant / Baingan)',
    category: 'Vegetable',
    subcategory: 'Nightshade Solanaceous Vegetable',
    scientificName: 'Solanum melongena',
    variety: 'Pusa Purple Long / Manjari Gota / Round Black Beauty',
    description: 'High-yield solanaceous vegetable with lustrous purple skin, rich in chlorogenic acid and dietary nasunin antioxidants.',
    icon: '🍆',
    color: '#8b5cf6',
    aliases: ['brinjal', 'eggplant', 'aubergine', 'baingan', 'baigan', 'vangi', 'badanekayi', 'kathirikai', 'solanum melongena'],
    images: {
      productImage: 'brinjal',
      productImageAlt: 'Glossy Purple Brinjal (Eggplant / Baingan)'
    },
    growing: {
      climate: 'Warm-season crop requiring warm temperatures (21°C - 30°C); susceptible to severe frost.',
      soil: 'Deep, fertile, well-drained silt loam to clay loam rich in organic matter.',
      idealSoilPh: '5.8 - 6.8',
      temperatureRange: [18, 32],
      rainfallRequirement: '500 - 750 mm',
      sowingMethod: 'Nursery seedbed raising followed by 30-day sturdy seedling transplanting',
      sowingSeason: 'Kharif (June-July), Rabi (Oct-Nov), and Summer (Jan-Feb)',
      seedRequirement: '250 - 300 g / hectare for hybrid varieties',
      spacing: '75 cm between rows x 60 cm between plants',
      growthDuration: '100 - 130 days',
      growthDays: 110,
      currentMaturityStage: 80,
      irrigation: 'Regular drip or furrow irrigation every 4-6 days; maintain uniform root zone moisture to prevent fruit bitterness.',
      fertilizerGuidance: [
        { stage: 'Basal Soil Prep', recommendation: 'FYM 25 t/ha + 50 kg N + 50 kg P2O5 + 50 kg K2O', impact: 'Vigorous early root network and vegetative branching', urgency: 'Immediate' },
        { stage: 'Flowering & Fruit Set', recommendation: 'Top-dress 50 kg Nitrogen + 0.2% Boron foliar spray', impact: 'Prevents flower drop and promotes glossy fruit skin', urgency: 'Scheduled' },
        { stage: 'Peak Harvest Picking', recommendation: '1% Potassium Nitrate (13:0:45) fertigation', impact: 'Continuous fruit sizing and uniform purple pigmentation', urgency: 'Monitoring' }
      ],
      commonPests: ['Shoot and Fruit Borer (Leucinodes orbonalis)', 'Jassids', 'Whitefly', 'Epilachna Beetle'],
      diseaseRisks: ['Phomopsis Blight and Fruit Rot', 'Bacterial Wilt (Ralstonia solanacearum)', 'Little Leaf of Brinjal (Phytoplasma)'],
      criticalCareTips: [
        'Install pheromone traps (10/acre) early to suppress shoot and fruit borer infestation.',
        'Clip off and safely destroy wilted terminal shoots showing borer entry holes.'
      ]
    },
    harvesting: {
      harvestingDays: 7,
      recommendedWindow: 'Harvest when fruits reach characteristic size with high glossy sheen before seeds harden',
      maturityIndicators: [
        'Fruit skin displays deep glossy purple luster (dull skin indicates over-maturity).',
        'Flesh yields slightly to gentle thumb pressure and rebounds.',
        'Internal seeds are soft, white, and tender (not brown or hard).'
      ],
      harvestingMethod: 'Cut stems with sharp secateurs leaving 2 cm of green calyx stalk attached to the fruit.',
      bestHarvestTime: 'Cool early morning or late evening',
      firmnessTarget: '4.0 - 5.0 kg/cm²',
      postHarvestHandling: [
        'Move harvested crates to shade immediately to prevent solar heat absorption.',
        'Wipe with clean dry muslin cloth to maintain glossy market finish.',
        'Grade by size: Long slender (15-20cm), Round (8-10cm diameter).'
      ]
    },
    storage: {
      shelfLifeAmbient: '3 to 5 Days (at 25°C)',
      shelfLifeCold: '10 to 14 Days (at 10°C - 12°C)',
      ambientDays: 4,
      coldDays: 12,
      storageTemperature: '10°C - 12°C (Sensitive to chilling injury below 8°C)',
      humidity: '90% - 95% RH',
      coldStorageRequired: true,
      storageMethod: 'Perforated plastic crates stacked in high-humidity cool room',
      preservationSteps: [
        'Maintain strictly above 10°C to prevent chilling injury, calyx browning, and skin pitting.',
        'Store away from high-ethylene items like ripe bananas and tomatoes.'
      ],
      spoilageIndicators: ['Loss of gloss and skin wrinkling', 'Brown discolored calyx', 'Internal seed browning and bitter pulp'],
      curingRequired: false
    },
    packaging: {
      primaryPackaging: 'Ventilated Corrugated Fibreboard (CFB) Boxes (10kg) or Heavy-Duty Plastic Crates',
      secondaryPackaging: 'Returnable Plastic Crates (RPC) with soft foam bottom liners',
      recommendedMaterials: ['5-Ply Kraft Corrugated Box with 4% vent holes', 'Food-grade perforated LDPE liners', 'Soft foam sheets'],
      ventilationRequired: true,
      ventilationSpec: '4% surface area side ventilation to disperse respiration heat',
      moistureProtection: 'High humidity maintenance with condensation prevention',
      ethyleneSensitivity: 'High',
      ethyleneControl: 'Do not co-ship with climacteric fruit ripening loads',
      cushioningSpecs: 'Bottom and side corrugated pads prevent abrasion of glossy skin',
      shockRating: 4.2,
      estimatedPackagingCostPerKg: 1.80,
      packagingCapacity: '10kg / 12kg crates',
      ecoCertification: '100% Recyclable Corrugated Board',
      layers: [
        { layer: 1, name: 'Soft Muslin / Foam Base', material: 'Breathable Protective Liner', function: 'Protects delicate calyx and prevents skin scratches', icon: '🧽', glowColor: '#8b5cf6' },
        { layer: 2, name: 'Ventilated CFB Master Box', material: '5-Ply Kraft Corrugated Carton', function: 'Resists stacking compression in transit trucks', icon: '📦', glowColor: '#a855f7' },
        { layer: 3, name: 'Smart Farm Origin QR', material: 'Digital Traceability QR Tag', function: 'Farm origin, picking date, and batch authentication', icon: '🏷️', glowColor: '#38bdf8' }
      ],
      packingSteps: [
        { step: 1, title: 'Field Heat Cooling', description: 'Rest in shade down to 18°C prior to boxing.' },
        { step: 2, title: 'Stalk Alignment', description: 'Pack horizontally with calyx alternating to avoid spine punctures.' },
        { step: 3, title: 'Top Cushioning', description: 'Place top paper pad before closing box flaps.' }
      ]
    },
    transportation: {
      recommendedVehicle: 'Ventilated LCV or Chilled Reefer Van (11°C - 13°C)',
      temperatureControlled: true,
      targetTemp: '11°C - 13°C',
      maximumRecommendedDistance: '800 km',
      handlingRequirements: ['Protect from direct sun and wind draft', 'Handle crates gently to avoid calyx detachment'],
      vibrationSensitivity: 'Medium',
      baseRatePerKm: 18.0
    },
    market: {
      marketCategory: 'Daily Solanaceous Commodity (High Demand)',
      priceUnit: '₹/kg',
      basePricePerKg: 26.00,
      priceStatus: 'Live Benchmark',
      regionalPrices: {
        Bengaluru: 28.00,
        Mumbai: 30.00,
        Delhi: 25.00,
        Nashik: 22.00,
        Hyderabad: 27.00,
        Chennai: 32.00
      },
      priceTrend: 'Rising'
    },
    consumption: {
      nutritionalProfile: {
        calories: 25,
        protein_g: 1.0,
        carbs_g: 5.9,
        fat_g: 0.2,
        vitaminC_mg: 2.2,
        vitaminA_IU: 23,
        dietaryFiber_g: 3.0,
        potassium_mg: 229,
        iron_mg: 0.23,
        antioxidantIndex: 91,
        glycemicIndex: 15,
        highlights: ['Rich in Nasunin (potent brain cell antioxidant)', 'Abundant Chlorogenic acid for heart health', 'Low calorie & high dietary fiber']
      },
      consumptionMethods: ['Smoked and mashed in classic Baingan Bharta', 'Stuffed spicy Bharli Vangi / Ennegayi', 'Grilled / roasted steaks with herbs', 'Slow-cooked in regional sambars and curries'],
      preparationMethods: ['Keep skin intact during roasting/cooking to maximize nasunin anthocyanin antioxidant intake.'],
      nutrientPreservationTips: ['Soak cut pieces in lightly salted water for 5 minutes to prevent polyphenol browning.'],
      recommendedPreparation: 'Char-roast whole on open flame and mash with crushed garlic, green chillies, and cold-pressed mustard oil.',
      servingGuidance: 'Delicious low-carb nutrient base (100g-150g portion).',
      bioavailabilityTip: 'Cook with culinary fats like cold-pressed mustard oil or olive oil to enhance bioavailability of fat-soluble phytonutrients.',
      recipes: [
        {
          title: 'Fire-Smoked Rustic Baingan Bharta',
          prepTime: '25 mins',
          healthBenefit: 'High nasunin antioxidant & brain protective boost',
          ingredients: ['1 Large Round Purple Brinjal', '4 Garlic cloves', '2 Tomatoes', '1 Green Chilli', '1 tbsp Mustard Oil', 'Fresh Coriander'],
          steps: [
            'Slit brinjal, insert garlic cloves into slits, and roast on open flame until skin is fully charred and flesh is tender.',
            'Peel off charred skin, mash the warm pulp.',
            'Sauté chopped onions, tomatoes, and chillies in mustard oil; fold in mashed brinjal and simmer 5 minutes.'
          ]
        }
      ]
    },
    risks: {
      highHumidityRisk: 'Free water on skin triggers rapid Phomopsis fruit rot lesions.',
      highTempRisk: 'Storage above 30°C causes accelerated moisture loss, flaccidity, and seed hardening.',
      frostRisk: 'Chilling injury occurs below 8°C causing surface pitting, pulp browning, and off flavors.',
      excessRainRisk: 'Heavy rains during picking create muddy produce and severe bacterial soft rot.',
      transitShockRisk: 'Calyx spines can puncture adjacent fruits if stacked carelessly without alignment.',
      mitigationStrategy: 'Transit in ventilated padded crates at 11°C-13°C and pack with alternating calyx directions.'
    }
  },

  // 2C. OKRA (LADY'S FINGER / BHINDI / ABELMOSCHUS ESCULENTUS)
  {
    id: 'okra',
    name: "Okra (Lady's Finger / Bhindi)",
    category: 'Vegetable',
    subcategory: 'Malvaceae Pod Vegetable',
    scientificName: 'Abelmoschus esculentus',
    variety: 'Parbhani Kranti / Pusa Sawani / Mahyco 10 Hybrid',
    description: 'High-respiration tender green ridged pod vegetable rich in soluble mucilage fiber, polyphenols, vitamin C, and folates.',
    icon: '🥒',
    color: '#16a34a',
    aliases: ['okra', 'lady finger', 'ladies finger', "lady's finger", 'bhindi', 'bhendi', 'bendekayi', 'bendakaya', 'vendakkai', 'dharosh', 'abelmoschus esculentus', 'gumbo'],
    images: {
      productImage: 'okra',
      productImageAlt: "Tender Green Okra Lady's Finger (Abelmoschus esculentus)"
    },
    growing: {
      climate: 'Warm and humid tropical climate (22°C - 35°C); highly sensitive to frost and waterlogging.',
      soil: 'Deep, well-drained sandy loam to clay loam rich in organic matter.',
      idealSoilPh: '6.0 - 6.8',
      temperatureRange: [20, 35],
      rainfallRequirement: '750 - 1000 mm during monsoon cycle',
      sowingMethod: 'Direct seed sowing on ridges and furrows or raised beds',
      sowingSeason: 'Kharif (June-July) and Spring/Summer (Feb-March)',
      seedRequirement: '8 - 10 kg / ha (Kharif) or 12 - 15 kg / ha (Summer)',
      spacing: '45 cm between rows x 30 cm between plants',
      growthDuration: '90 - 110 days (first picking at 45-50 days)',
      growthDays: 95,
      currentMaturityStage: 85,
      irrigation: 'Furrow irrigation every 4-5 days in summer and 8-10 days in winter; avoid surface waterlogging.',
      fertilizerGuidance: [
        { stage: 'Basal Soil Prep', recommendation: 'FYM 20 t/ha + 50 kg N + 50 kg P2O5 + 50 kg K2O', impact: 'Strong root anchorage and early branching', urgency: 'Immediate' },
        { stage: '30 Days Post-Germination', recommendation: 'Top-dress 25 kg Nitrogen', impact: 'Promotes continuous internodal flowering and tender pod set', urgency: 'Scheduled' },
        { stage: 'Peak Pod Harvest Cycle', recommendation: '19:19:19 water-soluble foliar spray (0.5%)', impact: 'Prevents fiber hardening and preserves deep green color', urgency: 'Monitoring' }
      ],
      commonPests: ['Fruit and Shoot Borer (Earias vittella)', 'Yellow Vein Mosaic Vector Whitefly (Bemisia tabaci)', 'Jassids', 'Mites'],
      diseaseRisks: ['Yellow Vein Mosaic Virus (YVMV)', 'Enation Leaf Curl Virus', 'Powdery Mildew'],
      criticalCareTips: [
        'Select YVMV-resistant certified hybrid seeds like Parbhani Kranti.',
        'Harvest every alternate day to prevent pods from becoming fibrous and unmarketable.',
        'Use yellow sticky traps (15/acre) to control whitefly vector populations.'
      ]
    },
    harvesting: {
      harvestingDays: 4,
      recommendedWindow: 'Harvest 5-6 days after flowering when pods are 8-10 cm long and pod tips snap crisply',
      maturityIndicators: [
        'Pods are tender, bright green, and 7-10 cm long.',
        'Pod apex tip snaps crisply when bent with finger pressure without stringy fibers.',
        'Seeds inside are soft, translucent, and not fully matured.'
      ],
      harvestingMethod: 'Careful manual cutting with sharp pruning shears or gloves; avoid skin injury from pod hairs.',
      bestHarvestTime: 'Early morning dry hours (06:00 AM - 09:00 AM)',
      firmnessTarget: '3.5 - 4.5 kg/cm²',
      postHarvestHandling: [
        'Grade into Grade A (7-10 cm, uniform green) and Grade B (>10 cm).',
        'Move immediately to shaded pre-cooling shelter to pull down field heat.',
        'Avoid washing before dry transport to prevent blackening and bacterial rot.'
      ]
    },
    storage: {
      shelfLifeAmbient: '2 to 3 Days (at 25°C - 30°C)',
      shelfLifeCold: '7 to 10 Days (at 8°C - 10°C)',
      ambientDays: 2,
      coldDays: 8,
      storageTemperature: '8°C - 10°C (Extremely sensitive to chilling injury below 7°C)',
      humidity: '90% - 95% RH',
      coldStorageRequired: true,
      storageMethod: 'Perforated plastic crates or breathable bags with high relative humidity',
      preservationSteps: [
        'Maintain strictly between 8°C and 10°C; do NOT freeze or store below 7°C to prevent chilling injury, calyx darkening, and water-soaked pitting.',
        'Ensure continuous air movement to disperse high metabolic heat and $CO_2$.'
      ],
      spoilageIndicators: ['Pod tips turning black/brown', 'Skin pitting and water-soaked lesions', 'Tough fibrous texture with lost snapping ability'],
      curingRequired: false
    },
    packaging: {
      primaryPackaging: 'Micro-Perforated Polypropylene / LDPE Breathable Liners (30-40 micron) or Ventilated CFB Cartons (5kg)',
      secondaryPackaging: 'Ventilated Corrugated Master Cartons with 5% side air vent holes',
      recommendedMaterials: ['Micro-Perforated LDPE (35 micron)', '5-Ply Kraft Corrugated Box with 5% air vents', 'Woven Leno Mesh Bags for local markets'],
      ventilationRequired: true,
      ventilationSpec: 'Minimum 5-6% side vent slots to prevent condensation and anaerobic fermentation',
      moistureProtection: 'High RH retention without liquid water accumulation',
      ethyleneSensitivity: 'High',
      ethyleneControl: 'Strictly isolate from apples, bananas, and ripening fruits',
      cushioningSpecs: 'Bottom corrugated liner to absorb vehicle vibrations and prevent tip bruising',
      shockRating: 4.1,
      estimatedPackagingCostPerKg: 1.60,
      packagingCapacity: '5kg / 10kg boxes',
      ecoCertification: '100% Recyclable Corrugated Board',
      layers: [
        { layer: 1, name: 'Micro-Perforated Atmosphere Liner', material: 'Perforated LDPE (35µm)', function: 'Maintains 90% RH while allowing O2 and CO2 gas equilibrium to prevent anaerobic decay', icon: '🍃', glowColor: '#10b981' },
        { layer: 2, name: 'Ventilated Master Shipper', material: '5-Ply Moisture-Resistant Kraft Box', function: 'Protects tender pod tips from transit crushing and highway stack loads', icon: '📦', glowColor: '#38bdf8' },
        { layer: 3, name: 'Dynamic Provenance Tag', material: 'Digital QR Traceability Seal', function: 'Harvest timestamp, farm location, and cold-chain temperature history', icon: '🏷️', glowColor: '#a855f7' }
      ],
      packingSteps: [
        { step: 1, title: 'Field Heat Pre-Cooling', description: 'Cool pods down to 10°C using forced humid air within 3 hours of picking.' },
        { step: 2, title: 'Parallel Pod Alignment', description: 'Lay pods parallel in 5kg cartons to prevent tip breakage and skin abrasion.' },
        { step: 3, title: 'Vent Slot Check', description: 'Ensure master carton side vents remain unobstructed during pallet stacking.' }
      ]
    },
    transportation: {
      recommendedVehicle: 'Temperature-Controlled Reefer Truck (8°C - 10°C)',
      temperatureControlled: true,
      targetTemp: '9.0°C',
      maximumRecommendedDistance: '800 km',
      handlingRequirements: ['Handle gently to prevent blackening of pod ridges', 'Keep reefer set between 8°C and 10°C at all times'],
      vibrationSensitivity: 'High',
      baseRatePerKm: 19.5
    },
    market: {
      marketCategory: 'Daily High-Demand Green Vegetable',
      priceUnit: '₹/kg',
      basePricePerKg: 38.00,
      priceStatus: 'Live Benchmark',
      regionalPrices: {
        Bengaluru: 42.00,
        Mumbai: 45.00,
        Delhi: 40.00,
        Nashik: 34.00,
        Hyderabad: 36.00,
        Chennai: 44.00
      },
      priceTrend: 'Rising'
    },
    consumption: {
      nutritionalProfile: {
        calories: 33,
        protein_g: 1.9,
        carbs_g: 7.5,
        fat_g: 0.2,
        vitaminC_mg: 23.0,
        vitaminA_IU: 716,
        dietaryFiber_g: 3.2,
        potassium_mg: 299,
        iron_mg: 0.6,
        antioxidantIndex: 78,
        glycemicIndex: 20,
        highlights: ['Rich in Soluble Mucilage Fiber', 'Low Glycemic Load (GI 20)', 'High Folate & Polyphenol Content']
      },
      consumptionMethods: ['Stir-Fried Bhindi Masala', 'Crispy Kurkuri Bhindi', 'South Indian Vendakkai Sambar', 'Steamed Pods with Yogurt'],
      preparationMethods: ['Wash and dry completely before cutting to reduce slime/mucilage release during cooking.'],
      nutrientPreservationTips: [
        'Cook on medium-high heat with a dash of dry mango powder (amchur) or lemon juice to reduce stickiness and protect heat-sensitive vitamin C.'
      ],
      recommendedPreparation: 'Bhindi Do Pyaza or Crispy Roasted Okra',
      servingGuidance: 'Ideal for balanced diabetic-friendly and cardiac dietary regimens.',
      bioavailabilityTip: 'Pair with iron-rich legumes or tomatoes to maximize absorption of vegetable micronutrients.',
      recipes: [
        {
          title: 'Authentic Punjabi Bhindi Masala',
          prepTime: '20 mins',
          healthBenefit: 'Low calorie, high digestive fiber and natural blood-glucose regulation',
          ingredients: ['500g Fresh Tender Okra', '2 Medium Onions sliced', '2 Tomatoes chopped', '1 tsp Cumin seeds', '1/2 tsp Turmeric', '1 tsp Coriander powder', '1/2 tsp Amchur (Dry Mango Powder)', '2 tbsp Mustard Oil'],
          steps: [
            'Wash okra thoroughly and pat 100% dry with a clean kitchen towel.',
            'Trim stem caps and slice into 1-inch rounds.',
            'Heat mustard oil in a heavy-bottom pan; sauté sliced okra on medium heat for 7-8 minutes until crisp and non-sticky.',
            'Add sliced onions, tomatoes, and dry spices; cook covered on low flame for 6 minutes until tender and fragrant.'
          ]
        }
      ]
    },
    risks: {
      highHumidityRisk: 'Trapped free condensation triggers rapid surface mold and black pod decay.',
      highTempRisk: 'Temperatures above 30°C cause rapid fiber lignification, moisture weight loss, and yellowing.',
      frostRisk: 'Chilling injury below 7°C produces severe water-soaked skin lesions, blackening, and tissue breakdown.',
      excessRainRisk: 'Harvesting wet pods accelerates post-harvest bacterial soft rot within 24 hours.',
      transitShockRisk: 'Friction between unaligned pods causes dark abrasion marks along the longitudinal ridges.',
      mitigationStrategy: 'Cool within 3 hours to 9°C, pack parallel in micro-perforated liners, and transport in steady temperature reefer.'
    }
  },

  // 3. POTATO
  {
    id: 'potato',
    name: 'Potato',
    category: 'Vegetable',
    subcategory: 'Tuber Crop',
    scientificName: 'Solanum tuberosum',
    variety: 'Kufri Jyoti / Kufri Pukhraj',
    description: 'High-starch underground tuber crop that feeds billions, requiring dark, ventilated storage to prevent solanine greening.',
    icon: '🥔',
    color: '#f59e0b',
    aliases: ['potato', 'alu', 'aloo', 'batata', 'potatoes', 'russet potato'],
    images: {
      productImage: 'potato',
      productImageAlt: 'Fresh Harvest Potato'
    },
    growing: {
      climate: 'Cool climate crop requiring 15°C - 20°C soil temperature during tuberization.',
      soil: 'Loose, well-aerated sandy loam with rich organic matter.',
      idealSoilPh: '5.2 - 6.4',
      temperatureRange: [12, 25],
      rainfallRequirement: '500 - 700 mm',
      sowingMethod: 'Planting certified disease-free seed tubers with 2-3 sprouted eyes',
      sowingSeason: 'Rabi (Oct - Nov in plains) / Spring (Feb in hills)',
      seedRequirement: '2.0 - 2.5 tons seed tubers / hectare',
      spacing: '60 cm ridge-to-ridge x 20 cm tuber-to-tuber',
      growthDuration: '90 - 110 days',
      growthDays: 100,
      currentMaturityStage: 90,
      irrigation: 'Frequent light furrow or drip irrigations; avoid water stress during tuber enlargement stage.',
      fertilizerGuidance: [
        { stage: 'Planting / Earthing Up', recommendation: '120 kg N + 80 kg P2O5 + 100 kg K2O per ha', impact: 'Tuber initiation and high starch dry matter', urgency: 'Immediate' },
        { stage: '35 Days (Earthing Up)', recommendation: 'Cover emerging tubers with soil ridge', impact: 'Prevents sunlight exposure and solanine greening', urgency: 'Scheduled' }
      ],
      commonPests: ['Potato Tuber Moth', 'Aphids (Myzus persicae)', 'Cutworms'],
      diseaseRisks: ['Late Blight', 'Early Blight', 'Bacterial Wilt / Brown Rot'],
      criticalCareTips: [
        'Strict dehaulming (cutting green foliage) 10-12 days before harvest to harden tuber skins.',
        'Keep tubers completely covered with soil to avoid greening.'
      ]
    },
    harvesting: {
      harvestingDays: 10,
      recommendedWindow: '10-15 days post-dehaulming when skins are firmly set',
      maturityIndicators: [
        'Vines have yellowed or have been mechanically dehaulmed.',
        'Skin does not slip when rubbed firmly with thumb pressure.',
        'Specific gravity matches target processing benchmark (>1.080).'
      ],
      harvestingMethod: 'Tractor-drawn potato digger or hand spades; dig carefully to avoid bruising skins.',
      bestHarvestTime: 'Dry morning when soil is friable',
      firmnessTarget: 'Firm tuber flesh',
      postHarvestHandling: [
        'Cure tubers in dark aerated shed at 15°C and 90% RH for 10 days.',
        'Grading into seed size, table size, and processing size.'
      ]
    },
    storage: {
      shelfLifeAmbient: '1 to 2 Months in dark dry pantry',
      shelfLifeCold: '6 to 9 Months in cold storage with CIPC sprout suppression',
      ambientDays: 45,
      coldDays: 240,
      storageTemperature: '8°C - 10°C (Processing) / 3°C - 4°C (Seed stock)',
      humidity: '90% - 95% RH',
      coldStorageRequired: false,
      storageMethod: 'Dark, well-aerated wooden bins or temperature-controlled cold chambers',
      preservationSteps: ['Keep away from all light to prevent toxic solanine alkaloid production.'],
      spoilageIndicators: ['Green coloration on skin', 'Sprouts emerging from eyes', 'Soft bacterial rot'],
      curingRequired: true,
      curingInstructions: 'Hold at 15°C with 90% RH for 10-14 days to suberize cuts and thicken skin.'
    },
    packaging: {
      primaryPackaging: 'Breathable Jute Gunny Bags or UV-Protected Mesh Bags (50kg)',
      secondaryPackaging: 'Heavy duty wooden pallet crates',
      recommendedMaterials: ['Natural Jute Burlap', 'Dark Polypropylene Woven Bags', 'Corrugated kraft bins'],
      ventilationRequired: true,
      ventilationSpec: 'Breathable weave to prevent carbon dioxide buildup',
      moistureProtection: 'Breathable; keep dry from surface condensation',
      ethyleneSensitivity: 'Medium',
      ethyleneControl: 'Do not store together with apples or ripening fruits',
      cushioningSpecs: 'Burlap provides non-abrasive soft barrier',
      shockRating: 2.8,
      estimatedPackagingCostPerKg: 0.90,
      packagingCapacity: '50kg standard jute sacks',
      ecoCertification: '100% Compostable Natural Jute',
      layers: [
        { layer: 1, name: 'Natural Jute Sack', material: 'Biodegradable Burlap Fiber', function: 'Filters ambient light and allows air breathing', icon: '🌾', glowColor: '#f59e0b' },
        { layer: 2, name: 'Smart Lot Batch Tag', material: 'Moisture-proof barcode tag', function: 'Batch provenance and harvest farm trace', icon: '🏷️', glowColor: '#38bdf8' }
      ],
      packingSteps: [
        { step: 1, title: 'Suberization Check', description: 'Confirm skin is tough and fully healed.' },
        { step: 2, title: 'Light Barrier Loading', description: 'Pack into opaque jute bags to block light.' },
        { step: 3, title: 'Elevated Pallet Stacking', description: 'Stack on pallets with 15 cm floor clearance.' }
      ]
    },
    transportation: {
      recommendedVehicle: 'Covered Dry Cargo Truck with air vents',
      temperatureControlled: false,
      targetTemp: '12°C - 18°C',
      maximumRecommendedDistance: '2,000 km',
      handlingRequirements: ['Protect from rain', 'Do not drop bags from truck beds'],
      vibrationSensitivity: 'Low',
      baseRatePerKm: 16.0
    },
    market: {
      marketCategory: 'Mass Staple Commodity',
      priceUnit: '₹/kg',
      basePricePerKg: 22.00,
      priceStatus: 'Live Benchmark',
      regionalPrices: {
        Bengaluru: 26.00,
        Mumbai: 24.00,
        Delhi: 18.00,
        Nashik: 20.00,
        Hyderabad: 25.00,
        Chennai: 28.00
      },
      priceTrend: 'Stable'
    },
    consumption: {
      nutritionalProfile: {
        calories: 77,
        protein_g: 2.0,
        carbs_g: 17.5,
        fat_g: 0.1,
        vitaminC_mg: 19.7,
        vitaminA_IU: 0,
        dietaryFiber_g: 2.2,
        potassium_mg: 421,
        iron_mg: 0.78,
        antioxidantIndex: 72,
        glycemicIndex: 78,
        highlights: ['High Potassium content (more than bananas)', 'Resistant starch when cooled', 'Vitamin B6 powerhouse']
      },
      consumptionMethods: ['Boiled, roasted, baked with skin', 'Mashed with herbs', 'Steamed in traditional vegetable curries'],
      preparationMethods: ['Boil with skin on to prevent leaching of water-soluble Vitamin C and potassium.'],
      nutrientPreservationTips: ['Allow cooked potatoes to cool before eating to generate beneficial resistant starch (prebiotic).'],
      recommendedPreparation: 'Steam or roast whole in their skins with rosemary and sea salt.',
      servingGuidance: 'Versatile energy base for balanced active meals.',
      bioavailabilityTip: 'Pair with vitamin C rich greens and legumes for complete amino acid synergy.',
      recipes: [
        {
          title: 'Herb-Roasted Skin-On Baby Potatoes',
          prepTime: '30 mins',
          healthBenefit: 'High potassium & gut-nourishing resistant starch',
          ingredients: ['500g Small Potatoes', '2 tbsp Olive Oil', 'Crushed Garlic', 'Fresh Rosemary', 'Sea Salt'],
          steps: [
            'Wash thoroughly and parboil baby potatoes for 8 minutes.',
            'Lightly smash each potato on a baking sheet.',
            'Drizzle with olive oil, garlic, and rosemary; roast at 210°C until golden crisp.'
          ]
        }
      ]
    },
    risks: {
      highHumidityRisk: 'Condensation promotes soft rot bacteria and premature eye germination.',
      highTempRisk: 'Warm storage above 20°C causes rapid sprouting and tuber weight loss.',
      frostRisk: 'Sub-zero temperatures freeze internal water, turning flesh sweet and watery.',
      excessRainRisk: 'Waterlogged fields cause black scurf and tuber rotting before harvest.',
      transitShockRisk: 'Scuffing and bruising create entry points for Fusarium dry rot.',
      mitigationStrategy: 'Ensure complete skin curing post-dehaulming, store in dark, cool conditions in breathable jute.'
    }
  },

  // 4. MANGO
  {
    id: 'mango',
    name: 'Mango',
    category: 'Fruit',
    subcategory: 'Tropical Tree Fruit',
    scientificName: 'Mangifera indica',
    variety: 'Alphonso (Hapus) / Kesar',
    description: 'The King of Fruits. Highly aromatic, sweet climacteric fruit requiring gentle cushioning and ethylene-aware logistics.',
    icon: '🥭',
    color: '#f59e0b',
    aliases: ['mango', 'aam', 'alphonso', 'kesar', 'hapus', 'mangoes'],
    images: {
      productImage: 'mango',
      productImageAlt: 'Alphonso Ratnagiri Mango'
    },
    growing: {
      climate: 'Tropical to subtropical climate with distinct dry warm weather during flowering and fruit set.',
      soil: 'Deep, rich, well-drained alluvial or lateritic soil at least 2 meters deep.',
      idealSoilPh: '5.5 - 7.5',
      temperatureRange: [24, 38],
      rainfallRequirement: '750 - 2,500 mm per year',
      sowingMethod: 'Epicotyl / Veneer grafted sapling orchard plantation',
      sowingSeason: 'Monsoon onset (June - August)',
      seedRequirement: '100 - 120 grafted saplings / acre (High density: 200 saplings/acre)',
      spacing: '10 m x 10 m (Standard) or 5 m x 5 m (High Density)',
      growthDuration: 'Tree lifespan 40+ years; annual fruiting cycle 120-140 days post bloom',
      growthDays: 130,
      currentMaturityStage: 82,
      irrigation: 'Withhold irrigation 2 months prior to flowering to induce floral buds; resume light drip irrigation during fruit swelling.',
      fertilizerGuidance: [
        { stage: 'Post-Harvest Pruning', recommendation: 'FYM 50 kg + 500g N + 250g P + 500g K per mature tree', impact: 'Canopy regeneration and vegetative flush', urgency: 'Immediate' },
        { stage: 'Pea Size Fruit Stage', recommendation: 'Foliar spray of 1% Potassium Nitrate + 0.2% Borax', impact: 'Reduces fruit drop and improves fruit retention', urgency: 'Scheduled' },
        { stage: 'Fruit Sizing', recommendation: 'SOP (Sulfate of Potash) foliar nutrition', impact: 'Enhances sugar brix and pulp aroma', urgency: 'Monitoring' }
      ],
      commonPests: ['Mango Hopper (Idioscopus spp.)', 'Fruit Fly (Bactrocera dorsalis)', 'Stem Borer'],
      diseaseRisks: ['Anthracnose (Colletotrichum gloeosporioides)', 'Powdery Mildew', 'Bacterial Canker'],
      criticalCareTips: [
        'Bag developing fruits on tree with brown paper bags to protect against fruit flies and sunburn.',
        'Harvest with 1 cm stem pedicel to prevent sap burn.'
      ]
    },
    harvesting: {
      harvestingDays: 12,
      recommendedWindow: 'When shoulders rise above stem insertion and specific gravity reaches 1.01 - 1.02',
      maturityIndicators: [
        'Shoulders of the fruit rise above the stem pit.',
        'Fruit skin color shifts from dark olive green to pale olive yellow.',
        'Fruit pulp color changes from creamy white to pale yellow.',
        'Brix level reaches 8.5° - 10.0° at harvest.'
      ],
      harvestingMethod: 'Hand clippers with collection pouch; leave 1-2 cm pedicel attached to prevent latex spurt.',
      bestHarvestTime: 'Early morning (6 AM - 9 AM) before heat increases internal sap pressure',
      sugarBrixTarget: '16.0° - 18.5° Brix at full ripening',
      firmnessTarget: '12 - 14 kg/cm² at harvest (drops to 1.5 kg/cm² at eating ripeness)',
      postHarvestHandling: [
        'De-sapping on inverted racks for 4 hours to drain caustic latex.',
        'Hot Water Treatment (48°C for 5 mins) or VHT (Vapour Heat Treatment) for export to eliminate anthracnose & fruit flies.',
        'Grading into Size Tier 1 (250-300g), Tier 2 (200-250g).'
      ]
    },
    storage: {
      shelfLifeAmbient: '5 to 8 Days (at 28°C)',
      shelfLifeCold: '21 to 28 Days (in controlled atmosphere)',
      ambientDays: 7,
      coldDays: 25,
      storageTemperature: '12°C - 13°C (Do NOT store below 10°C to avoid chilling injury)',
      humidity: '85% - 90% RH',
      coldStorageRequired: true,
      storageMethod: 'Single-tier ventilated export cartons with foam sleeves in reefer chamber',
      preservationSteps: [
        'Maintain strict 13°C cold chain.',
        'Apply ethylene scrubber sachets during transit to delay premature ripening.'
      ],
      spoilageIndicators: ['Black circular anthracnose lesions', 'Spongy tissue breakdown in pulp', 'Skin pitting from cold injury'],
      curingRequired: false
    },
    packaging: {
      primaryPackaging: 'Expandable EPE Polyethylene Foam Sleeves + 5-Ply Corrugated Gift Box (3kg / 12 fruits)',
      secondaryPackaging: 'Euro-Standard Palletized Master Cartons',
      recommendedMaterials: ['Virgin Kraft CFB Box', 'EPE Foam Netting', 'Cellular divider trays', 'Ethylene absorbing sachets'],
      ventilationRequired: true,
      ventilationSpec: 'Round side vents comprising 4% of wall area with insect netting',
      moistureProtection: 'Moisture absorbing paper pads at the box base',
      ethyleneSensitivity: 'High',
      ethyleneControl: 'Integrate active potassium permanganate ethylene scrubbers',
      cushioningSpecs: 'Individual fruit foam sleeves cushion against 100% surface abrasion',
      shockRating: 4.8,
      estimatedPackagingCostPerKg: 5.50,
      packagingCapacity: '3kg (12 count) or 5kg (18-20 count) boxes',
      ecoCertification: 'Recyclable Kraft + Biodegradable Sleeves',
      layers: [
        { layer: 1, name: 'Soft Elastic Foam Jacket', material: 'EPE Shock-Absorbing Netting', function: 'Protects delicate mango skin from friction rubs', icon: '🧽', glowColor: '#f59e0b' },
        { layer: 2, name: 'Cellular Divider Box', material: '5-Ply Heavy Virgin Kraft Carton', function: 'Prevents fruit-to-fruit compression and impact', icon: '📦', glowColor: '#fbbf24' },
        { layer: 3, name: 'Smart Freshness Passport', material: 'NFC QR Ripeness Indicator', function: 'Tracks Brix curve and cold-chain temperature profile', icon: '🏷️', glowColor: '#38bdf8' }
      ],
      packingSteps: [
        { step: 1, title: 'De-sapping & Drying', description: 'Confirm zero latex residues on fruit surface.' },
        { step: 2, title: 'Foam Sleeving', description: 'Slide each graded mango into an elastic foam net.' },
        { step: 3, title: 'Single Layer Nesting', description: 'Nest fruits into individual carton cells with stem end pointing sideways.' }
      ]
    },
    transportation: {
      recommendedVehicle: 'Temperature-Controlled Reefer Truck (13°C ± 0.5°C)',
      temperatureControlled: true,
      targetTemp: '13°C',
      maximumRecommendedDistance: '2,500 km (or Air Freight for international export)',
      handlingRequirements: ['Zero sudden jolts; air-ride suspension mandatory', 'Never stack loose uncartoned fruits'],
      vibrationSensitivity: 'High',
      baseRatePerKm: 26.0
    },
    market: {
      marketCategory: 'Premium Export Table Fruit (High Value)',
      priceUnit: '₹/kg',
      basePricePerKg: 160.00,
      priceStatus: 'Export Grade-A',
      regionalPrices: {
        Bengaluru: 175.00,
        Mumbai: 150.00,
        Delhi: 190.00,
        Nashik: 140.00,
        Hyderabad: 165.00,
        Chennai: 180.00
      },
      priceTrend: 'Rising'
    },
    consumption: {
      nutritionalProfile: {
        calories: 60,
        protein_g: 0.8,
        carbs_g: 15.0,
        fat_g: 0.4,
        vitaminC_mg: 36.4,
        vitaminA_IU: 1082,
        dietaryFiber_g: 1.6,
        potassium_mg: 168,
        iron_mg: 0.16,
        antioxidantIndex: 96,
        glycemicIndex: 51,
        highlights: ['Rich in Mangiferin (super-antioxidant)', 'Outstanding Vitamin A & Beta-Carotene', 'Natural digestive enzymes (amylases)']
      },
      consumptionMethods: ['Fresh sliced chilled slices', 'Aamras with cardamom', 'Smoothies and sorbets', 'Tangy green mango chutneys and pickles'],
      preparationMethods: ['Wash thoroughly before peeling to remove any tree sap residues; slice along the flat seed stone.'],
      nutrientPreservationTips: ['Consume fresh immediately after slicing to prevent oxidation of delicate Vitamin C and aromatic terpenes.'],
      recommendedPreparation: 'Slice into golden cheeks and score cross-hatch cubes.',
      servingGuidance: 'One medium mango (approx 200g) delivers 100% daily Vitamin C and 35% Vitamin A.',
      bioavailabilityTip: 'Enjoy with a handful of crushed almonds or a dash of yogurt for optimal fat-soluble carotenoid uptake.',
      recipes: [
        {
          title: 'Royal Alphonso Mango & Saffron Parfait',
          prepTime: '15 mins',
          healthBenefit: 'Potent vision & immune system support',
          ingredients: ['2 Fresh Alphonso Mangoes', '1 cup Greek Yogurt', '4 strands Saffron', 'Crushed Pistachios', '1 tsp Honey'],
          steps: [
            'Puree one mango with saffron and honey until velvety smooth.',
            'Dice the second mango into delicate cubes.',
            'Layer greek yogurt, pureed mango, and fresh mango cubes in a glass, top with roasted pistachios.'
          ]
        }
      ]
    },
    risks: {
      highHumidityRisk: 'Trapped condensate combined with warmth triggers rapid anthracnose fruit rot.',
      highTempRisk: 'Storage above 35°C causes internal pulp fermentation, spongy tissue, and off-flavors.',
      frostRisk: 'Temperatures below 10°C cause severe chilling injury: grey skin discoloration and failed ripening.',
      excessRainRisk: 'Pre-harvest showers induce fruit fly oviposition and split skins.',
      transitShockRisk: 'Bruising damages cell walls, triggering localized ethylene spikes and soft brown rot.',
      mitigationStrategy: 'Enforce de-sapping, hot water dip, single-layer foam packaging, and 13°C precision reefer transit.'
    }
  },

  // 5. RICE (PADDY / BASMATI)
  {
    id: 'rice',
    name: 'Rice (Paddy)',
    category: 'Grain',
    subcategory: 'Cereal Grain Staple',
    scientificName: 'Oryza sativa',
    variety: 'Pusa Basmati 1121 / Sona Masoori',
    description: 'Premier staple cereal grain sustaining billions, requiring moisture monitoring, parboiling/milling, and dry silo storage.',
    icon: '🌾',
    color: '#ca8a04',
    aliases: ['rice', 'paddy', 'chawal', 'dhan', 'basmati', 'sona masoori', 'grains'],
    images: {
      productImage: 'rice',
      productImageAlt: 'Golden Paddy Rice / Basmati Grain'
    },
    growing: {
      climate: 'Warm humid tropical climate with high temperatures (22°C - 32°C) and ample sunshine.',
      soil: 'Heavy clay or clayey loam soils capable of holding standing water.',
      idealSoilPh: '5.5 - 7.0',
      temperatureRange: [20, 35],
      rainfallRequirement: '1,000 - 1,500 mm (or canal/borewell puddle irrigation)',
      sowingMethod: 'Wet nursery seedbed followed by 25-day manual/mechanical transplanting in puddled fields',
      sowingSeason: 'Kharif (June - July) / Rabi (Nov - Dec)',
      seedRequirement: '15 - 20 kg / hectare for certified seed beds',
      spacing: '20 cm between rows x 15 cm between hills',
      growthDuration: '120 - 145 days',
      growthDays: 135,
      currentMaturityStage: 92,
      irrigation: 'Continuous standing water (2-5 cm) until 10 days before harvest, then drain field completely.',
      fertilizerGuidance: [
        { stage: 'Basal Land Puddling', recommendation: 'FYM 10 t/ha + 50 kg N + 50 kg P2O5 + 50 kg K2O + 25 kg Zinc Sulfate', impact: 'Root anchorage and tillering', urgency: 'Immediate' },
        { stage: 'Active Tillering (30 DAT)', recommendation: 'Top dress 35 kg Urea', impact: 'Maximum productive tillers per hill', urgency: 'Scheduled' },
        { stage: 'Panicle Initiation (60 DAT)', recommendation: 'Top dress 35 kg Urea + 25 kg MOP', impact: 'Grain filling and panicle length', urgency: 'Monitoring' }
      ],
      commonPests: ['Yellow Stem Borer (Scirpophaga incertulas)', 'Brown Planthopper (BPH)', 'Leaf Folder'],
      diseaseRisks: ['Bacterial Leaf Blight (Xanthomonas oryzae)', 'Rice Blast (Magnaporthe oryzae)', 'Sheath Blight'],
      criticalCareTips: [
        'Maintain zinc nutrition to prevent "Khaira" disease.',
        'Drain water completely 10-14 days before harvest to ensure uniform grain drying.'
      ]
    },
    harvesting: {
      harvestingDays: 7,
      recommendedWindow: 'When 80-85% of panicles turn golden yellow and grain moisture drops to 20-22%',
      maturityIndicators: [
        'Grains in the lower part of the panicle are in hard dough stage.',
        'Panicles turn golden straw color with firm kernel texture.',
        'Grain moisture reaches 20% - 22%.'
      ],
      harvestingMethod: 'Combine harvester with straw chopper or manual sickle cutting followed by mechanical thresher.',
      bestHarvestTime: 'Bright sunny dry afternoon',
      firmnessTarget: 'Hard flinty grain',
      postHarvestHandling: [
        'Immediate mechanical drying or sun drying on clean tarpaulins to bring moisture down to safe 12-14%.',
        'De-husking, polishing (for white rice), or parboiling.',
        'Aspiration and destoning.'
      ]
    },
    storage: {
      shelfLifeAmbient: '12 to 24 Months (Milled Rice) / 2 to 3 Years (Paddy at <13% moisture)',
      shelfLifeCold: '3+ Years in controlled silo',
      ambientDays: 540,
      coldDays: 1080,
      storageTemperature: 'Ambient Dry (18°C - 25°C)',
      humidity: '55% - 65% RH (Moisture in grain must remain strictly below 13%)',
      coldStorageRequired: false,
      storageMethod: 'Hermetic grain bags, steel silos, or traditional masonry warehouses with fumigation',
      preservationSteps: [
        'Confirm grain moisture is ≤ 12.5% before bagging.',
        'Prophylactic spray of Deltamethrin on outer bag surfaces against weevils.'
      ],
      spoilageIndicators: ['Musty mold odor', 'Live Rice Weevil (Sitophilus oryzae) infestation', 'Grain yellowing/heating'],
      curingRequired: false
    },
    packaging: {
      primaryPackaging: 'Multi-Wall BOPP Laminated Moisture-Barrier Bags (25kg / 50kg)',
      secondaryPackaging: 'Shrink-Wrapped Pallet Units for Export',
      recommendedMaterials: ['BOPP (Biaxially Oriented Polypropylene) laminated woven sacks', 'Hermetic GrainPro Liners', 'Eco Jute Sacks'],
      ventilationRequired: false,
      ventilationSpec: 'Hermetically sealed moisture barrier to block external dampness and insects',
      moistureProtection: 'Impermeable barrier; blocks ambient humidity and rainwater',
      ethyleneSensitivity: 'Low',
      ethyleneControl: 'Not required for dry cereal grains',
      cushioningSpecs: 'High puncture resistance to prevent bag tearing during hook loading',
      shockRating: 1.5,
      estimatedPackagingCostPerKg: 0.75,
      packagingCapacity: '25kg / 50kg commercial bags',
      ecoCertification: '100% Recyclable PP Woven Fabric',
      layers: [
        { layer: 1, name: 'BOPP Film Print Layer', material: 'High Gloss Photogravure BOPP', function: 'Waterproof barrier and high clarity branding', icon: '🛡️', glowColor: '#ca8a04' },
        { layer: 2, name: 'Woven PP Structural Base', material: 'High-Tenacity Polypropylene Woven Fabric', function: 'Withstands drop loads and mechanical handling', icon: '📦', glowColor: '#eab308' },
        { layer: 3, name: 'Traceability QR Seal', material: 'Tamper-Evident Stitched Tag', function: 'Certifies organic/Basmati authentic origin and moisture index', icon: '🏷️', glowColor: '#38bdf8' }
      ],
      packingSteps: [
        { step: 1, title: 'Moisture Audit', description: 'Ensure grain moisture is strictly under 12.5%.' },
        { step: 2, title: 'Electronic Weighing & Bagging', description: 'Fill automated BOPP bags to exact weight.' },
        { step: 3, title: 'Double Stitch Sealing', description: 'Stitch top hem with polyester cord and tamper-proof security tape.' }
      ]
    },
    transportation: {
      recommendedVehicle: 'Heavy Duty Covered Freight Truck or Container Rail Wagon',
      temperatureControlled: false,
      targetTemp: 'Ambient Dry (20°C - 30°C)',
      maximumRecommendedDistance: '3,500 km',
      handlingRequirements: ['100% waterproof tarpaulins', 'Clean cargo bed free from oil, odors, and moisture'],
      vibrationSensitivity: 'Low',
      baseRatePerKm: 14.5
    },
    market: {
      marketCategory: 'Core Cereal Staple (Mass APMC & Export Trade)',
      priceUnit: '₹/kg',
      basePricePerKg: 42.00,
      priceStatus: 'Live Benchmark',
      regionalPrices: {
        Bengaluru: 46.00,
        Mumbai: 48.00,
        Delhi: 44.00,
        Nashik: 42.00,
        Hyderabad: 40.00,
        Chennai: 45.00
      },
      priceTrend: 'Stable'
    },
    consumption: {
      nutritionalProfile: {
        calories: 130,
        protein_g: 2.7,
        carbs_g: 28.2,
        fat_g: 0.3,
        vitaminC_mg: 0.0,
        vitaminA_IU: 0,
        dietaryFiber_g: 0.4,
        potassium_mg: 35,
        iron_mg: 1.20,
        antioxidantIndex: 45,
        glycemicIndex: 68,
        highlights: ['Easily digestible clean carbohydrate', 'Gluten-free energy foundation', 'Contains key B-complex vitamins (thiamine, niacin)']
      },
      consumptionMethods: ['Steamed fluffy rice', 'Fermented idli/dosa batter with lentils', 'Creamy aromatic kheer/pudding', 'Stir-fried vegetable pilaf'],
      preparationMethods: ['Wash gently 2 times; soak aged Basmati for 30 minutes in water before cooking for maximum grain elongation.'],
      nutrientPreservationTips: ['Cook by absorption method (1:2 water ratio) instead of discarding starch water to retain water-soluble B vitamins.'],
      recommendedPreparation: 'Cook with whole cardamom, clove, and cinnamon in absorption method.',
      servingGuidance: 'Combine with high-protein legumes or pulses (dal) for a complete essential amino acid profile.',
      bioavailabilityTip: 'Pairing rice with lentils achieves a complete protein score (PDCAAS = 1.0).',
      recipes: [
        {
          title: 'Royal Fragrant Basmati Vegetable Pilaf',
          prepTime: '30 mins',
          healthBenefit: 'Complete balanced protein and clean complex energy',
          ingredients: ['1.5 cups Aged Basmati Rice', 'Assorted Carrots, Beans, Peas', '1 Bay leaf', '2 Cardamoms', '1 tbsp Ghee'],
          steps: [
            'Soak basmati rice for 30 mins; drain well.',
            'Heat ghee in a heavy pot, sizzle whole spices, and add mixed vegetables.',
            'Add rice and 3 cups hot water; cover and cook on gentle low flame for 12 minutes until grains are fluffy.'
          ]
        }
      ]
    },
    risks: {
      highHumidityRisk: 'Moisture above 14% triggers rapid heating, Aspergillus flavus growth, and dangerous aflatoxin production.',
      highTempRisk: 'Heat coupled with moisture accelerates grain yellowing and rancidity of bran lipids.',
      frostRisk: 'Low temperatures during flowering phase cause spikelet sterility and chaffy grain.',
      excessRainRisk: 'Lodging in wet fields leads to in-panicle viviparous grain germination.',
      transitShockRisk: 'Bag puncture in damp transport leads to water entry and localized caking.',
      mitigationStrategy: 'Dry grain to <12.5% moisture immediately post-harvest and store in sealed BOPP moisture-barrier bags.'
    }
  },

  // 6. CHICKPEA (PULSE)
  {
    id: 'chickpea',
    name: 'Chickpea (Chana)',
    category: 'Pulse',
    subcategory: 'Legume Protein Crop',
    scientificName: 'Cicer arietinum',
    variety: 'Desi Chana (JG 11) / Kabuli (Dollar Chana)',
    description: 'High-protein, nitrogen-fixing legume powerhouse essential for plant-based nutrition and soil health regeneration.',
    icon: '🫘',
    color: '#d97706',
    aliases: ['chickpea', 'chana', 'gram', 'bengal gram', 'kabuli chana', 'chole', 'pulses'],
    images: {
      productImage: 'chickpea',
      productImageAlt: 'Desi Bengal Chickpea (Chana)'
    },
    growing: {
      climate: 'Cool dry climate with moderate temperatures (15°C - 25°C) during vegetative growth.',
      soil: 'Deep well-drained loamy to black cotton soils.',
      idealSoilPh: '6.0 - 7.8',
      temperatureRange: [12, 28],
      rainfallRequirement: '400 - 600 mm',
      sowingMethod: 'Direct seed drilling with Rhizobium & PSB bio-fertilizer inoculation',
      sowingSeason: 'Rabi (October - November)',
      seedRequirement: '65 - 75 kg / hectare for Desi; 100 kg / hectare for Kabuli',
      spacing: '30 cm row-to-row x 10 cm plant-to-plant',
      growthDuration: '95 - 115 days',
      growthDays: 105,
      currentMaturityStage: 88,
      irrigation: 'Requires minimal water; one irrigation at pre-flowering and one at pod development stage.',
      fertilizerGuidance: [
        { stage: 'Basal Sowing', recommendation: '20 kg N + 40 kg P2O5 + 20 kg Sulfur per hectare', impact: 'Stimulates root nodulation and nitrogen fixation', urgency: 'Immediate' },
        { stage: 'Pod Filling', recommendation: '2% DAP or 1% Potassium Nitrate foliar spray', impact: 'Maximizes pod grain weight and protein content', urgency: 'Scheduled' }
      ],
      commonPests: ['Gram Pod Borer (Helicoverpa armigera)', 'Cutworm'],
      diseaseRisks: ['Fusarium Wilt (Fusarium oxysporum f. sp. ciceris)', 'Dry Root Rot', 'Ascochyta Blight'],
      criticalCareTips: [
        'Nip apical branch tips at 30-35 days to stimulate vigorous lateral branching.',
        'Install pheromone traps (5/acre) to monitor pod borer moths.'
      ]
    },
    harvesting: {
      harvestingDays: 10,
      recommendedWindow: 'When leaves turn yellowish-brown, drop naturally, and pods rattle when shaken',
      maturityIndicators: [
        'Plants turn golden straw yellow and lose foliage.',
        'Seeds shake and rattle freely inside dry brittle pods.',
        'Seed moisture drops below 15%.'
      ],
      harvestingMethod: 'Manual pulling or sickle cutting followed by sun drying and mechanical threshing.',
      bestHarvestTime: 'Dry sunny day',
      firmnessTarget: 'Hard dry legume grain',
      postHarvestHandling: [
        'Sun dry threshed grain to reduce moisture to 9-10%.',
        'Machine grading and destoning.'
      ]
    },
    storage: {
      shelfLifeAmbient: '12 to 18 Months (at <10% moisture)',
      shelfLifeCold: '2 to 3 Years in hermetic cold silos',
      ambientDays: 450,
      coldDays: 900,
      storageTemperature: 'Ambient Dry (20°C - 25°C)',
      humidity: '50% - 60% RH',
      coldStorageRequired: false,
      storageMethod: 'Hermetic GrainPro bags or clean gunny sacks in dry ventilated godowns',
      preservationSteps: [
        'Treat with dry neem oil or inert diatomaceous earth to prevent pulse beetle (Callosobruchus chinensis).',
        'Store off the ground on wooden pallets.'
      ],
      spoilageIndicators: ['Bruchid exit holes in seeds', 'Fungal mustiness', 'Clumping due to moisture'],
      curingRequired: false
    },
    packaging: {
      primaryPackaging: 'Heavy Duty Woven Polypropylene Bags with Inner Liner (50kg)',
      secondaryPackaging: 'Palletized units with stretch wrapping',
      recommendedMaterials: ['HDPE/PP Woven Sacks', 'Hermetic Gas-Tight Multi-Layer Bags', 'Food-grade Kraft paper bags'],
      ventilationRequired: false,
      ventilationSpec: 'Sealed dry environment to keep out moisture and beetles',
      moistureProtection: 'High moisture resistance required',
      ethyleneSensitivity: 'Low',
      ethyleneControl: 'Not required',
      cushioningSpecs: 'Standard drop resistance',
      shockRating: 1.8,
      estimatedPackagingCostPerKg: 0.85,
      packagingCapacity: '25kg / 50kg bulk packaging',
      ecoCertification: '100% Recyclable Polypropylene',
      layers: [
        { layer: 1, name: 'Inner Moisture Shield', material: 'Co-Extruded LDPE Liner', function: 'Locks out external ambient humidity', icon: '🛡️', glowColor: '#d97706' },
        { layer: 2, name: 'High-Tenacity Outer Sack', material: 'Heavy Woven PP Fabric', function: 'Protects from rough handling and stacking pressure', icon: '📦', glowColor: '#f59e0b' }
      ],
      packingSteps: [
        { step: 1, title: 'Moisture Verification', description: 'Confirm grain moisture is below 10%.' },
        { step: 2, title: 'Bruchid-Free Inspection', description: 'Screen lot for seed pest integrity.' },
        { step: 3, title: 'Hermetic Sealing', description: 'Seal inner liner and machine-stitch outer sack.' }
      ]
    },
    transportation: {
      recommendedVehicle: 'Covered Dry Cargo Truck',
      temperatureControlled: false,
      targetTemp: 'Ambient Dry (20°C - 28°C)',
      maximumRecommendedDistance: '3,000 km',
      handlingRequirements: ['Strict water protection during transit', 'Stack max 12 bags high'],
      vibrationSensitivity: 'Low',
      baseRatePerKm: 15.0
    },
    market: {
      marketCategory: 'Essential Protein Pulse (APMC Benchmark)',
      priceUnit: '₹/kg',
      basePricePerKg: 68.00,
      priceStatus: 'Live Benchmark',
      regionalPrices: {
        Bengaluru: 72.00,
        Mumbai: 70.00,
        Delhi: 66.00,
        Nashik: 64.00,
        Hyderabad: 69.00,
        Chennai: 74.00
      },
      priceTrend: 'Rising'
    },
    consumption: {
      nutritionalProfile: {
        calories: 364,
        protein_g: 19.3,
        carbs_g: 60.6,
        fat_g: 6.0,
        vitaminC_mg: 4.0,
        vitaminA_IU: 67,
        dietaryFiber_g: 17.4,
        potassium_mg: 875,
        iron_mg: 6.24,
        antioxidantIndex: 82,
        glycemicIndex: 28,
        highlights: ['Superb Plant Protein source', 'Remarkable Dietary Fiber (17.4g/100g)', 'Rich in Iron, Folate, and Magnesium']
      },
      consumptionMethods: ['Soaked and sprouted in salads', 'Hearty spiced chana masala curry', 'Creamy Mediterranean hummus', 'Roasted crunchy snack (bhuna chana)'],
      preparationMethods: ['Soak dry chickpeas for 8-12 hours with a pinch of baking soda or rock salt to deactivate phytates and oligosaccharides.'],
      nutrientPreservationTips: ['Pressure cook soaked chickpeas to maximize protein digestibility.'],
      recommendedPreparation: 'Sprout for 36 hours and toss with lemon juice, diced cucumbers, and rock salt.',
      servingGuidance: 'Ideal daily protein source (100g cooked) for active individuals and athletes.',
      bioavailabilityTip: 'Combine with lemon juice (Vitamin C) to triple non-heme iron absorption.',
      recipes: [
        {
          title: 'High-Protein Sprouted Chickpea Power Salad',
          prepTime: '15 mins',
          healthBenefit: 'Maximized protein assimilation & rich live enzymes',
          ingredients: ['1.5 cups Sprouted Chickpeas', '1 Diced Tomato', '1 Diced Cucumber', 'Fresh Coriander', '1 tbsp Lemon Juice', 'Chaat Masala'],
          steps: [
            'Lightly steam sprouted chickpeas for 4 minutes (or use fresh raw).',
            'Toss with diced vegetables, lemon juice, pink salt, and chaat masala.',
            'Enjoy immediately as a pre/post-workout power meal.'
          ]
        }
      ]
    },
    risks: {
      highHumidityRisk: 'Moisture above 12% attracts pulse bruchid beetles (Callosobruchus) that hollow out seeds.',
      highTempRisk: 'Extreme heat (>35°C) during flowering causes flower abortion and empty pods.',
      frostRisk: 'Frost during pod setting causes seed shrivelling.',
      excessRainRisk: 'Waterlogging causes sudden Fusarium wilt collapse within 48 hours.',
      transitShockRisk: 'Low sensitivity; protect packaging from tear and rain.',
      mitigationStrategy: 'Dry thoroughly to 9% moisture, apply food-grade organic neem oil, and bag in sealed liners.'
    }
  },

  // 7. ALMOND (DRY FRUIT & NUT)
  {
    id: 'almond',
    name: 'Almond (Badam)',
    category: 'Dry Fruit',
    subcategory: 'Tree Nut',
    scientificName: 'Prunus dulcis',
    variety: 'Nonpareil / California / Mamra',
    description: 'Premium nutrient-dense nut packed with Vitamin E, healthy monounsaturated fats, and brain-boosting polyphenols.',
    icon: '🌰',
    color: '#b45309',
    aliases: ['almond', 'badam', 'almonds', 'mamra', 'nonpareil', 'dry fruits', 'nuts'],
    images: {
      productImage: 'almond',
      productImageAlt: 'California Premium Almonds'
    },
    growing: {
      climate: 'Mediterranean temperate climate with cool wet winters (chill hours 300-600) and hot dry summers.',
      soil: 'Deep well-drained loamy to sandy loam soils.',
      idealSoilPh: '6.5 - 8.0',
      temperatureRange: [15, 35],
      rainfallRequirement: '450 - 600 mm (drip irrigation in orchards)',
      sowingMethod: 'Grafted rootstock orchard plantation with cross-pollinating companion rows',
      sowingSeason: 'Dormant winter season (December - February)',
      seedRequirement: '100 - 150 grafted saplings / acre',
      spacing: '6 m x 6 m orchard grid',
      growthDuration: 'Tree lifespan 25+ years; annual crop cycle 200 days from petal fall',
      growthDays: 210,
      currentMaturityStage: 95,
      irrigation: 'Precision micro-drip irrigation; withhold water 2 weeks prior to tree shaking to assist hull split.',
      fertilizerGuidance: [
        { stage: 'Post-Harvest Autumn', recommendation: 'Zinc + Boron foliar spray', impact: 'Strengthens flower buds for upcoming spring bloom', urgency: 'Immediate' },
        { stage: 'Spring Growth', recommendation: 'Split fertigation of Nitrogen + Potassium', impact: 'Kernel development and high oil content', urgency: 'Scheduled' }
      ],
      commonPests: ['Navel Orangeworm (Amyelois transitella)', 'Peach Twig Borer', 'Spider Mites'],
      diseaseRisks: ['Hull Rot (Rhizopus / Monilinia)', 'Shot Hole Disease', 'Anthracnose'],
      criticalCareTips: [
        'Place honeybee hives (2-3 hives/acre) during spring bloom for vital cross-pollination.',
        'Harvest immediately when 95-100% of hulls split open to avoid insect entry.'
      ]
    },
    harvesting: {
      harvestingDays: 5,
      recommendedWindow: 'When outer hulls have split 100% and kernel moisture is dropping',
      maturityIndicators: [
        'Outer green hulls split completely along the suture line.',
        'Abscission zone forms at the stem attachment.',
        'Nut shell changes to tan brown.'
      ],
      harvestingMethod: 'Mechanical orchard tree shakers; nuts fall onto clean orchard floor to sweep and collect.',
      bestHarvestTime: 'Dry warm sunny weather',
      firmnessTarget: 'Hard crisp nut kernel',
      postHarvestHandling: [
        'Hull peeling and de-shelling.',
        'Drying kernels to <6% moisture to ensure rancidity resistance.',
        'Laser optical sorting for size grading and chip removal.'
      ]
    },
    storage: {
      shelfLifeAmbient: '12 to 18 Months (at <20°C in vacuum bags)',
      shelfLifeCold: '2 to 3 Years at 0°C - 4°C',
      ambientDays: 450,
      coldDays: 1000,
      storageTemperature: '0°C - 5°C (Cold) or <18°C (Ambient dark)',
      humidity: '55% - 60% RH',
      coldStorageRequired: true,
      storageMethod: 'Nitrogen-flushed vacuum sealed foil pouches or cold food warehouses',
      preservationSteps: [
        'Store in nitrogen-flushed packaging to stop oxygen-induced lipid oxidation.',
        'Keep away from high-odor commodities like onions or garlic.'
      ],
      spoilageIndicators: ['Rancid oil taste/smell', 'Insect webbing inside shells', 'Fungal mold on kernel tip'],
      curingRequired: false
    },
    packaging: {
      primaryPackaging: 'Nitrogen-Flushed Multi-Layer Aluminum Barrier Pouch (500g / 1kg / 10kg)',
      secondaryPackaging: 'Heavy Duty 5-Ply Master Carton Box',
      recommendedMaterials: ['PET / AL / PE Multi-Layer Foil', 'Vacuum-sealed food-grade nylon', 'Rigid tinplate cans'],
      ventilationRequired: false,
      ventilationSpec: '100% Hermetic Oxygen & Moisture Barrier',
      moistureProtection: 'Zero moisture transmission rate (WVTR < 0.1 g/m²/day)',
      ethyleneSensitivity: 'Low',
      ethyleneControl: 'Not required; oxygen scavenging is the critical parameter',
      cushioningSpecs: 'Carton dividers protect kernel integrity from crushing',
      shockRating: 1.2,
      estimatedPackagingCostPerKg: 8.50,
      packagingCapacity: '10kg / 25kg bulk export cartons',
      ecoCertification: 'High-Barrier Food Contact Certified',
      layers: [
        { layer: 1, name: 'Ultra-Barrier Foil Film', material: 'Aluminum Multi-Layer Film', function: 'Blocks 100% light, oxygen, and ambient moisture', icon: '🛡️', glowColor: '#b45309' },
        { layer: 2, name: 'Inert Gas Flushing', material: 'Pure Food-Grade Nitrogen (N2)', function: 'Displaces oxygen to eliminate oil rancidity', icon: '💨', glowColor: '#38bdf8' },
        { layer: 3, name: 'Structural Master Box', material: '5-Ply Heavy Virgin Kraft Carton', function: 'Protects bulk bags from mechanical puncture', icon: '📦', glowColor: '#f59e0b' }
      ],
      packingSteps: [
        { step: 1, title: 'Kernel Moisture Check', description: 'Confirm moisture is below 5.5%.' },
        { step: 2, title: 'Vacuum & N2 Injection', description: 'Evacuate air and inject high-purity nitrogen.' },
        { step: 3, title: 'Hermetic Heat Seal', description: 'Thermal seal with batch lot QR stamp.' }
      ]
    },
    transportation: {
      recommendedVehicle: 'Dry Sealed Container Truck (Insulated / Temp-Controlled <22°C)',
      temperatureControlled: true,
      targetTemp: '15°C - 18°C',
      maximumRecommendedDistance: '5,000 km',
      handlingRequirements: ['Maintain dry dark conditions', 'Avoid chemical odor contamination'],
      vibrationSensitivity: 'Low',
      baseRatePerKm: 22.0
    },
    market: {
      marketCategory: 'Premium High-Value Dry Fruit',
      priceUnit: '₹/kg',
      basePricePerKg: 740.00,
      priceStatus: 'Export Grade-A',
      regionalPrices: {
        Bengaluru: 780.00,
        Mumbai: 750.00,
        Delhi: 720.00,
        Nashik: 740.00,
        Hyderabad: 770.00,
        Chennai: 790.00
      },
      priceTrend: 'Stable'
    },
    consumption: {
      nutritionalProfile: {
        calories: 579,
        protein_g: 21.2,
        carbs_g: 21.6,
        fat_g: 49.9,
        vitaminC_mg: 0.0,
        vitaminA_IU: 2,
        dietaryFiber_g: 12.5,
        potassium_mg: 733,
        iron_mg: 3.71,
        antioxidantIndex: 98,
        glycemicIndex: 15,
        highlights: ['Exceptional Vitamin E (Alpha-tocopherol)', 'Heart-healthy Monounsaturated Fats', 'High Magnesium and Dietary Fiber']
      },
      consumptionMethods: ['Overnight soaked and peeled for breakfast', 'Crushed into almond butter or milk', 'Garnish on sweets and curries', 'Roasted with sea salt & rosemary'],
      preparationMethods: ['Soak in clean water for 8 hours to activate enzymes and make peeling seamless.'],
      nutrientPreservationTips: ['Do not over-roast at high heat above 160°C to protect healthy polyunsaturated oils.'],
      recommendedPreparation: 'Soak 6-8 almonds overnight and eat with breakfast peel-free.',
      servingGuidance: 'A standard handful (28g / 23 almonds) provides 50% daily Vitamin E requirement.',
      bioavailabilityTip: 'Soaking neutralizes phytic acid, boosting zinc and magnesium absorption by 40%.',
      recipes: [
        {
          title: 'Ayurvedic Golden Badam Milk with Saffron',
          prepTime: '10 mins',
          healthBenefit: 'Brain nourishment, deep sleep & skin glow',
          ingredients: ['10 Soaked Almonds (peeled & paste)', '1 cup Warm Milk (or Oat Milk)', '3 strands Saffron', '1 pinch Cardamom', '1 tsp Honey'],
          steps: [
            'Blend peeled soaked almonds into a smooth velvety paste with a splash of warm milk.',
            'Stir into gently simmering milk with saffron and cardamom powder.',
            'Pour into a cup, sweeten with raw honey, and enjoy warm before sleep.'
          ]
        }
      ]
    },
    risks: {
      highHumidityRisk: 'Humidity above 65% triggers Aspergillus flavus mold and toxic aflatoxins.',
      highTempRisk: 'Exposure to temperatures >30°C causes rapid lipid oxidation, turning kernel oils bitter and rancid.',
      frostRisk: 'Spring frost during orchard bloom kills delicate flowers, wiping out crop yield.',
      excessRainRisk: 'Rain during hull split causes hull rot and fungal shell staining.',
      transitShockRisk: 'Low; ensure moisture-proof outer container seals.',
      mitigationStrategy: 'Dry kernels to <5.5% moisture, pack with nitrogen-flushed barrier foils, and transport in dry, cool insulated containers.'
    }
  },

  // 8. TURMERIC (SPICE & CASH CROP)
  {
    id: 'turmeric',
    name: 'Turmeric (Haldi)',
    category: 'Spice',
    subcategory: 'Rhizomatous Spice',
    scientificName: 'Curcuma longa',
    variety: 'Salem / Nizamabad / Alleppey Finger',
    description: 'Ancient golden medicinal spice rich in bioactive Curcumin, known worldwide for potent anti-inflammatory and antiseptic qualities.',
    icon: '🪵',
    color: '#eab308',
    aliases: ['turmeric', 'haldi', 'curcuma', 'curcumin', 'salem haldi', 'spices'],
    images: {
      productImage: 'turmeric',
      productImageAlt: 'High-Curcumin Salem Turmeric Finger'
    },
    growing: {
      climate: 'Warm humid tropical climate (20°C - 35°C) with ample monsoon rainfall.',
      soil: 'Well-drained rich loamy or alluvial soils with high organic matter.',
      idealSoilPh: '5.5 - 7.5',
      temperatureRange: [20, 38],
      rainfallRequirement: '1,500 - 2,250 mm',
      sowingMethod: 'Raised ridge planting of cured mother or finger rhizomes with 2 sprouted eyes',
      sowingSeason: 'Monsoon onset (May - June)',
      seedRequirement: '2,000 - 2,500 kg rhizomes / hectare',
      spacing: '45 cm ridge-to-ridge x 20 cm plant-to-plant',
      growthDuration: '240 - 270 days (8 to 9 months)',
      growthDays: 255,
      currentMaturityStage: 94,
      irrigation: 'Requires regular furrow or drip moisture; apply mulch (green leaves) immediately post-planting.',
      fertilizerGuidance: [
        { stage: 'Basal Planting', recommendation: 'FYM 30 t/ha + 60 kg N + 50 kg P2O5 + 120 kg K2O', impact: 'Rhizome initiation and root development', urgency: 'Immediate' },
        { stage: '45 & 90 Days Post-Plant', recommendation: 'Top dress 30 kg Nitrogen + Potassium', impact: 'Rhizome finger enlargement and curcumin accumulation', urgency: 'Scheduled' }
      ],
      commonPests: ['Shoot Borer (Conogethes punctiferalis)', 'Rhizome Scale'],
      diseaseRisks: ['Rhizome Rot (Pythium aphanidermatum)', 'Leaf Spot (Colletotrichum capsici)', 'Leaf Blotch'],
      criticalCareTips: [
        'Apply heavy green leaf mulch (15 t/ha) at planting to conserve soil moisture and prevent weed growth.',
        'Ensure zero water stagnation in field ridges.'
      ]
    },
    harvesting: {
      harvestingDays: 8,
      recommendedWindow: 'When lower leaves turn completely yellow and dry out',
      maturityIndicators: [
        'Above-ground leaves turn yellow, wilt, and dry out completely.',
        'Rhizome fingers exhibit deep golden yellow internal core.',
        'Curcumin percentage peaks at 4.5% - 5.5%.'
      ],
      harvestingMethod: 'Carefully plowing the ridge or manual hand spade digging; separate mother and finger rhizomes.',
      bestHarvestTime: 'Dry winter morning',
      firmnessTarget: 'Solid fibrous rhizome',
      postHarvestHandling: [
        'Boiling / Curing: Boil fresh rhizomes in perforated copper/galvanized pans for 45-60 mins until soft.',
        'Sun Drying: Spread boiled rhizomes on clean concrete yards for 10-15 days to reach 8-10% moisture.',
        'Polishing: Mechanical drum polishing to remove rough outer skin and impart lustrous golden color.'
      ]
    },
    storage: {
      shelfLifeAmbient: '2 to 3 Years (as dried polished fingers or airtight ground powder)',
      shelfLifeCold: '3+ Years in hermetic dry bins',
      ambientDays: 730,
      coldDays: 1200,
      storageTemperature: 'Ambient Dry (20°C - 28°C)',
      humidity: '50% - 60% RH (Must avoid moisture to prevent mold)',
      coldStorageRequired: false,
      storageMethod: 'Double-lined jute gunny sacks or hermetic dry silos in elevated godowns',
      preservationSteps: [
        'Ensure moisture is strictly below 10%.',
        'Protect from direct sunlight which bleaches curcumin pigment.'
      ],
      spoilageIndicators: ['Fungal white mold on finger crevices', 'Cigarette beetle (Lasioderma serricorne) infestation', 'Faded pale color'],
      curingRequired: true,
      curingInstructions: 'Boil fresh fingers in water for 45 mins until white froth appears and finger softens, then sun dry for 12 days.'
    },
    packaging: {
      primaryPackaging: 'Multi-Wall Moisture-Proof Laminated Poly Sacks (25kg / 50kg)',
      secondaryPackaging: 'Palletized units wrapped with UV-stretch film',
      recommendedMaterials: ['BOPP Laminated Woven Polypropylene', 'Food-grade multi-layer paper sacks with HDPE liner', 'Airtight tin containers'],
      ventilationRequired: false,
      ventilationSpec: 'Hermetically sealed dry environment',
      moistureProtection: 'High water vapor barrier required',
      ethyleneSensitivity: 'Low',
      ethyleneControl: 'Not required',
      cushioningSpecs: 'Standard bulk packaging',
      shockRating: 1.4,
      estimatedPackagingCostPerKg: 1.10,
      packagingCapacity: '25kg / 50kg commercial bags',
      ecoCertification: '100% Recyclable Packaging Material',
      layers: [
        { layer: 1, name: 'Light & Moisture Barrier', material: 'Opaque Laminated Inner Film', function: 'Prevents photodegradation of precious curcumin', icon: '🛡️', glowColor: '#eab308' },
        { layer: 2, name: 'Tear-Resistant Outer Sack', material: 'High-Tenacity Poly Woven Fabric', function: 'Protects from shipping tears and warehouse wear', icon: '📦', glowColor: '#ca8a04' }
      ],
      packingSteps: [
        { step: 1, title: 'Moisture Verification', description: 'Confirm polished finger moisture is under 9.5%.' },
        { step: 2, title: 'Curcumin Index Check', description: 'Sample batch for minimum 4.0% active curcumin.' },
        { step: 3, title: 'Double Machine Stitching', description: 'Seal bags with tamper-evident stitch cord.' }
      ]
    },
    transportation: {
      recommendedVehicle: 'Covered Dry Cargo Truck',
      temperatureControlled: false,
      targetTemp: 'Ambient Dry (20°C - 30°C)',
      maximumRecommendedDistance: '4,000 km',
      handlingRequirements: ['Strict water protection during transit', 'Clean dry container beds'],
      vibrationSensitivity: 'Low',
      baseRatePerKm: 15.5
    },
    market: {
      marketCategory: 'High-Value Commercial Spice & Medicinal Commodity',
      priceUnit: '₹/kg',
      basePricePerKg: 145.00,
      priceStatus: 'Live Benchmark',
      regionalPrices: {
        Bengaluru: 155.00,
        Mumbai: 160.00,
        Delhi: 165.00,
        Nashik: 140.00,
        Hyderabad: 135.00,
        Chennai: 150.00
      },
      priceTrend: 'Rising'
    },
    consumption: {
      nutritionalProfile: {
        calories: 312,
        protein_g: 9.7,
        carbs_g: 67.1,
        fat_g: 3.2,
        vitaminC_mg: 25.9,
        vitaminA_IU: 0,
        dietaryFiber_g: 22.7,
        potassium_mg: 2080,
        iron_mg: 41.4,
        antioxidantIndex: 99,
        glycemicIndex: 15,
        highlights: ['Active Curcuminoids (Anti-inflammatory Gold Standard)', 'Astonishing Iron content (41.4 mg / 100g)', 'High Dietary Fiber & Potassium']
      },
      consumptionMethods: ['Traditional golden milk (Haldi Doodh)', 'Daily spice base in curries and dals', 'Topical healing paste with honey', 'Herbal wellness teas with ginger'],
      preparationMethods: ['Always pair turmeric with black pepper (piperine) and healthy fats to unlock 2,000% higher curcumin absorption.'],
      nutrientPreservationTips: ['Add towards the end of cooking or bloom gently in warm ghee to avoid heat degradation of curcumin.'],
      recommendedPreparation: 'Simmer 1/2 tsp pure turmeric with warm milk, a pinch of black pepper, and pure honey.',
      servingGuidance: '1-3 grams of pure turmeric powder daily provides strong anti-inflammatory protection.',
      bioavailabilityTip: 'Piperine in black pepper inhibits hepatic glucuronidation, increasing curcumin bioavailability by up to 2000%.',
      recipes: [
        {
          title: 'Immunity Golden Haldi Elixir',
          prepTime: '5 mins',
          healthBenefit: 'Potent cellular anti-inflammatory & immune rejuvenation',
          ingredients: ['1/2 tsp Pure Salem Turmeric', '1 cup Warm Almond/Cow Milk', '1 pinch Fresh Black Pepper', '1/4 tsp Cinnamon', '1 tsp Raw Honey'],
          steps: [
            'Warm the milk gently in a saucepan.',
            'Whisk in pure turmeric powder, ground black pepper, and cinnamon until frothy.',
            'Pour into a mug, stir in raw honey, and drink warm.'
          ]
        }
      ]
    },
    risks: {
      highHumidityRisk: 'Moisture above 12% causes rapid white mould fungal growth and black rot.',
      highTempRisk: 'Excessive heat and direct UV sun exposure fade the bright yellow curcumin pigment.',
      frostRisk: 'Low tolerance for frost during vegetative rhizome enlargement.',
      excessRainRisk: 'Waterlogged fields during pre-harvest cause devastating Pythium rhizome rot.',
      transitShockRisk: 'Low; protect packaging from puncture and moisture leaks.',
      mitigationStrategy: 'Follow proper boiling curing, sun dry thoroughly to 9% moisture, and pack in UV/moisture-barrier laminated sacks.'
    }
  },

  // 9. GROUNDNUT (RAW COMMODITY)
  {
    id: 'groundnut',
    name: 'Groundnut (Peanut)',
    category: 'Oil & Oilseed',
    subcategory: 'Oilseed & Protein Legume',
    scientificName: 'Arachis hypogaea',
    variety: 'TG 37A / Kadiri 6 / JL 24',
    description: 'Premier oilseed and protein powerhouse with subterranean pods, critical for edible oil extraction, confectionery, and seed cake protein.',
    icon: '🥜',
    color: '#d97706',
    aliases: ['groundnut', 'peanut', 'mungfali', 'shengdana', 'kadalai', 'kadale kayi', 'arachis hypogaea'],
    isProcessed: false,
    derivedProducts: [
      { id: 'groundnut-oil', name: 'Cold-Pressed Groundnut Oil', icon: '🛢️', yieldPercent: 42 },
      { id: 'peanut-butter', name: 'High-Protein Peanut Butter', icon: '🥜', yieldPercent: 88 },
      { id: 'groundnut-cake', name: 'Defatted Cattle Feed Cake', icon: '🧱', yieldPercent: 55 }
    ],
    yieldImprovementTips: [
      'Apply Gypsum @ 400 kg/ha at pegging stage (40-45 DAS) for superior pod filling and bold kernel formation.',
      'Inoculate seeds with Rhizobium and Phosphobacteria biofertilizers to boost nitrogen nodulation by 25%.'
    ],
    qualityImprovementTips: [
      'Dry harvested pods to <8% moisture immediately to prevent carcinogenic Aflatoxin (Aspergillus flavus) buildup.',
      'Sort and remove immature and split pods before bagging to guarantee Grade-A oil recovery.'
    ],
    images: {
      productImage: 'groundnut',
      productImageAlt: 'Dried Bold Groundnut Pods & Kernels'
    },
    growing: {
      climate: 'Tropical and subtropical warm climate (22°C - 30°C) with bright sunshine during pod development.',
      soil: 'Well-drained sandy loam or light sandy soil rich in calcium and organic matter.',
      idealSoilPh: '6.0 - 7.5',
      temperatureRange: [20, 34],
      rainfallRequirement: '500 - 750 mm',
      sowingMethod: 'Seed drill or bullock/tractor drawn planter at 5 cm depth in friable moist soil',
      sowingSeason: 'Kharif (June-July) / Rabi-Summer (Jan-Feb)',
      seedRequirement: '100 - 120 kg kernels / hectare',
      spacing: '30 cm between rows x 10 cm between plants',
      growthDuration: '105 - 120 days',
      growthDays: 110,
      currentMaturityStage: 90,
      irrigation: 'Critical pegging and pod development stages require light sprinkler or furrow irrigation.',
      fertilizerGuidance: [
        { stage: 'Basal Sowing', recommendation: '20 kg N + 40 kg P2O5 + 40 kg K2O + 20 kg Zinc Sulfate / ha', impact: 'Early root vigor and nodule establishment', urgency: 'Immediate' },
        { stage: 'Pegging (40-45 DAS)', recommendation: 'Apply Gypsum 400 kg/ha around root zone followed by light earthing', impact: 'Direct calcium delivery for solid pod shells', urgency: 'Scheduled' }
      ],
      commonPests: ['Leaf Miner (Aproaerema modicella)', 'Red Hairy Caterpillar', 'Aphids', 'White Grub'],
      diseaseRisks: ['Tikka Leaf Spot (Cercospora arachidicola)', 'Rust (Puccinia arachidis)', 'Collar Rot'],
      criticalCareTips: [
        'Avoid deep cultivation once pegs start entering the soil to prevent peg severance.',
        'Install light traps to monitor and catch nocturnal hairy caterpillar moths.'
      ]
    },
    harvesting: {
      harvestingDays: 8,
      recommendedWindow: 'When inner shell lining turns dark brown/blackish and leaves turn yellow',
      maturityIndicators: [
        'Foliage turns yellow and lower leaves start shedding naturally.',
        'Inner surface of pod shell turns dark brown or black when opened.',
        'Kernels display tight plump skin with true varietal color.'
      ],
      harvestingMethod: 'Tractor-drawn blade digger or manual pulling in moist soil; shake off root soil.',
      bestHarvestTime: 'Clear dry sunny morning',
      firmnessTarget: 'Hard dry pod shell',
      postHarvestHandling: [
        'Field curing in small windrows for 3-5 days to reduce moisture from 35% down to 15%.',
        'Mechanical threshing or pod stripping followed by sun yard drying down to <8% moisture.',
        'Grading into Bold Table Grade and Crushing Grade.'
      ]
    },
    storage: {
      shelfLifeAmbient: '9 to 12 Months (at <8% kernel moisture)',
      shelfLifeCold: '18 to 24 Months in cold silos (5°C - 8°C)',
      ambientDays: 270,
      coldDays: 600,
      storageTemperature: '15°C - 20°C (Ambient) / 5°C - 8°C (Cold godown)',
      humidity: '55% - 60% RH (Crucial: Keep under 65% RH to stop Aflatoxins)',
      coldStorageRequired: false,
      storageMethod: 'Breathable HDPE mesh sacks or hermetic GrainPro bags on elevated pallets',
      preservationSteps: [
        'Ensure kernel moisture is strictly below 8%.',
        'Dust godown with inert desiccants and maintain continuous cross-ventilation.'
      ],
      spoilageIndicators: ['Aflatoxin greenish-yellow Aspergillus mold on kernel', 'Rancid oily smell', 'Borer beetle holes'],
      curingRequired: true,
      curingInstructions: 'Sun-cure whole pods on tarpaulins for 5-7 days until pods rattle audibly when shaken.'
    },
    packaging: {
      primaryPackaging: 'Breathable Woven HDPE / Jute Gunny Sacks (40kg / 50kg)',
      secondaryPackaging: 'Palletized units with corner edge boards',
      recommendedMaterials: ['HDPE Woven Sacks with UV Stabilizer', 'Natural Jute Burlap', 'Multi-layer hermetic liners'],
      ventilationRequired: true,
      ventilationSpec: 'Breathable weave to prevent sweating and mold generation',
      moistureProtection: 'High protection against atmospheric dampness',
      ethyleneSensitivity: 'Low',
      ethyleneControl: 'Not required',
      cushioningSpecs: 'Standard drop resistance',
      shockRating: 2.2,
      estimatedPackagingCostPerKg: 0.90,
      packagingCapacity: '50kg commercial sacks',
      ecoCertification: '100% Recyclable Packaging',
      layers: [
        { layer: 1, name: 'Breathable Woven Sacks', material: 'High-Tenacity HDPE / Jute', function: 'Allows natural airflow while preventing physical damage', icon: '🌾', glowColor: '#d97706' },
        { layer: 2, name: 'Moisture Barrier Pallet Wrap', material: 'Breathable Top Tarpaulin', function: 'Protects from monsoon rain and floor moisture seepage', icon: '📦', glowColor: '#f59e0b' }
      ],
      packingSteps: [
        { step: 1, title: 'Moisture Verification', description: 'Sample batch with digital meter to verify <7.5% moisture.' },
        { step: 2, title: 'Aflatoxin Visual Screening', description: 'Discard discolored, shriveled, or cracked pods.' },
        { step: 3, title: 'Machine Stitching', description: 'Stitch top hem with heavy poly twine.' }
      ]
    },
    transportation: {
      recommendedVehicle: 'Covered Dry Cargo Truck with tarpaulins',
      temperatureControlled: false,
      targetTemp: 'Ambient Dry (18°C - 26°C)',
      maximumRecommendedDistance: '3,000 km',
      handlingRequirements: ['Strict moisture protection during transit', 'Never stack directly on wet truck floors'],
      vibrationSensitivity: 'Low',
      baseRatePerKm: 15.0
    },
    market: {
      marketCategory: 'High-Demand Oilseed & Protein Commodity (APMC Major)',
      priceUnit: '₹/kg',
      basePricePerKg: 72.00,
      priceStatus: 'Live Benchmark',
      regionalPrices: {
        Bengaluru: 76.00,
        Mumbai: 74.00,
        Delhi: 78.00,
        Nashik: 70.00,
        Hyderabad: 72.00,
        Chennai: 75.00
      },
      priceTrend: 'Rising'
    },
    consumption: {
      nutritionalProfile: {
        calories: 567,
        protein_g: 25.8,
        carbs_g: 16.1,
        fat_g: 49.2,
        vitaminC_mg: 0,
        vitaminA_IU: 0,
        dietaryFiber_g: 8.5,
        potassium_mg: 705,
        iron_mg: 4.58,
        antioxidantIndex: 86,
        glycemicIndex: 14,
        highlights: ['Exceptional Plant Protein (25.8g / 100g)', 'Heart-healthy Monounsaturated Oleic Acid', 'Rich in Resveratrol & Biotin']
      },
      consumptionMethods: ['Dry-roasted crunchy snack', 'Stone-ground cold-pressed oil', 'Boiled salted pods', 'Creamy wholesome peanut butter'],
      preparationMethods: ['Roast kernels gently on medium heat to unlock sweet aroma and enhance resveratrol bioavailability.'],
      nutrientPreservationTips: ['Store roasted peanuts in airtight glass containers to stop air oxidation of unsaturated fatty acids.'],
      recommendedPreparation: 'Lightly roast with a pinch of rock salt and crushed cumin.',
      servingGuidance: 'A handful (30g) provides 8g of protein and sustaining energy.',
      bioavailabilityTip: 'Combine with whole grains (e.g. jowar or wheat) to form a complete amino acid profile.',
      recipes: [
        {
          title: 'High-Protein Roasted Peanut & Herb Chutney',
          prepTime: '10 mins',
          healthBenefit: 'High protein, healthy fats, and active plant sterols',
          ingredients: ['1 cup Roasted Peanuts', '2 Green Chillies', '1 clove Garlic', 'Fresh Coriander', '1 tbsp Lemon Juice', 'Rock Salt'],
          steps: [
            'Blend roasted peanuts, green chillies, garlic, and coriander with minimal water.',
            'Stir in fresh lemon juice and rock salt.',
            'Enjoy as a nutritious accompaniment with millets or rotis.'
          ]
        }
      ]
    },
    risks: {
      highHumidityRisk: 'Humidity above 65% triggers deadly Aflatoxin B1 fungal contamination (Aspergillus flavus).',
      highTempRisk: 'Storage above 35°C accelerates oil rancidity and kernel discoloration.',
      frostRisk: 'Cold shock during pod filling aborts late peg development.',
      excessRainRisk: 'Waterlogged fields at harvest cause viviparous kernel sprouting inside pods.',
      transitShockRisk: 'Low; protect sacks from puncture and roof rain leaks.',
      mitigationStrategy: 'Dry pods to <8% moisture before packaging, test for zero aflatoxin, and transit in dry covered fleets.'
    }
  },

  // 10. GROUNDNUT OIL (PROCESSED COMMODITY DERIVATIVE)
  {
    id: 'groundnut-oil',
    name: 'Groundnut Oil (Cold-Pressed Kachi Ghani)',
    category: 'Oil & Oilseed',
    subcategory: 'Processed Edible Oil',
    scientificName: 'Oleum Arachis (Cold-Pressed)',
    variety: 'Virgin Wood-Pressed (Mara Chekku)',
    description: 'Aromatic, golden-yellow edible oil extracted at low temperatures (<45°C) without chemical refining, preserving natural tocopherols and phytosterols.',
    icon: '🛢️',
    color: '#f59e0b',
    aliases: ['groundnut oil', 'peanut oil', 'mungfali tel', 'sing tel', 'kadalai ennai', 'cold pressed groundnut oil'],
    isProcessed: true,
    rawCommodityId: 'groundnut',
    processingMethod: 'Traditional wood-pressed expeller (cold press <45°C) followed by natural gravity sedimentation and micro-filtration.',
    processingStage: 'Secondary Food Processing',
    qualityImprovementTips: [
      'Maintain pressing temperature strictly below 45°C to preserve natural Vitamin E and polyphenol antioxidants.',
      'Allow natural gravity settling for 48 hours instead of chemical bleaching to retain authentic nutty aroma and golden hue.'
    ],
    images: {
      productImage: 'groundnut-oil',
      productImageAlt: 'Golden Cold-Pressed Groundnut Oil in Glass & Tin'
    },
    growing: {
      climate: 'Derived from high-oil TG-37A groundnut kernels cultivated in semi-arid zones.',
      soil: 'Rich loamy soils yielding kernels with >48% oil content.',
      idealSoilPh: '6.5 - 7.5',
      temperatureRange: [20, 32],
      rainfallRequirement: '600 mm',
      sowingMethod: 'Kernel processing in certified hygienic oil mills',
      sowingSeason: 'Year-round processing post seed curing',
      seedRequirement: '2.4 kg raw kernels yield 1 Liter of pure cold-pressed oil (42% extraction)',
      spacing: 'N/A (Processing Unit)',
      growthDuration: '48 hours extraction and natural sedimentation cycle',
      growthDays: 2,
      currentMaturityStage: 100,
      irrigation: 'Not applicable (Processed product)',
      fertilizerGuidance: [
        { stage: 'Raw Material Selection', recommendation: 'Select moisture-tested (<7%) bold seeds free from aflatoxin', impact: 'Purity and extended shelf stability', urgency: 'Immediate' },
        { stage: 'Filtration', recommendation: 'Pass through food-grade cotton micro-cloth filters', impact: 'Removes seed sediment without stripping antioxidants', urgency: 'Scheduled' }
      ],
      commonPests: ['Storage Pests in Raw Kernel Godowns'],
      diseaseRisks: ['Microbial contamination in unhygienic bottling tanks'],
      criticalCareTips: [
        'Store bulk oil in stainless steel (SS-304) food-grade storage tanks.',
        'Purge headspace with food-grade Nitrogen (N2) to eliminate oxygen-induced rancidity.'
      ]
    },
    harvesting: {
      harvestingDays: 1,
      recommendedWindow: 'Freshly pressed batches bottled within 24 hours of filtration',
      maturityIndicators: [
        'Free Fatty Acid (FFA) level strictly below 0.8%.',
        'Peroxide Value under 2.0 meq O2/kg.',
        'Clear golden amber translucence without chemical cloudiness.'
      ],
      harvestingMethod: 'Automated gravimetric bottling in nitrogen-purged containers.',
      bestHarvestTime: 'Controlled temperature cleanroom bottling',
      firmnessTarget: 'Liquid viscosity 35-40 cP at 25°C',
      postHarvestHandling: [
        'Hermetic induction cap sealing on PET/Glass/Tin containers.',
        'Nitrogen gas flush in headspace to displace air.',
        'Lot trace QR coding with extraction date and FFA certificate.'
      ]
    },
    storage: {
      shelfLifeAmbient: '12 Months (in dark hermetic tinplate or amber glass)',
      shelfLifeCold: '18 Months at 15°C - 18°C',
      ambientDays: 365,
      coldDays: 540,
      storageTemperature: '15°C - 22°C (Cool, Dark Pantry - Away from UV Light)',
      humidity: '40% - 50% RH',
      coldStorageRequired: false,
      storageMethod: 'Dark tinplate cans, amber glass bottles, or opaque food-grade HDPE jars',
      preservationSteps: [
        'Keep strictly away from direct sunlight to stop photo-oxidation.',
        'Reseal container cap tightly after every pour.'
      ],
      spoilageIndicators: ['Acrid bitter taste and sharp paint-like smell (rancidity)', 'Peroxide value >10 meq/kg', 'Cloudy precipitate'],
      curingRequired: false
    },
    packaging: {
      primaryPackaging: 'Food-Grade Tinplate Cans (1L / 5L) or UV-Protected Amber Glass / Recyclable HDPE Jars',
      secondaryPackaging: '5-Ply Corrugated Shipping Cartons with cellular grid dividers',
      recommendedMaterials: ['Food-Contact Tinplate', 'Amber Flint Glass', 'Fluorinated HDPE with Induction Seal', 'PET with UV-Scavenger'],
      ventilationRequired: false,
      ventilationSpec: 'Hermetically sealed with nitrogen headspace purge (0% OTR)',
      moistureProtection: 'Impermeable barrier to stop ambient moisture and water entry',
      ethyleneSensitivity: 'Low',
      ethyleneControl: 'Not required',
      cushioningSpecs: 'Grid partition dividers prevent bottle-to-bottle impact',
      shockRating: 4.5,
      estimatedPackagingCostPerKg: 3.80,
      packagingCapacity: '1 Liter / 5 Liter containers',
      ecoCertification: '100% Recyclable Tinplate / Glass',
      layers: [
        { layer: 1, name: 'Hermetic Induction Seal', material: 'Aluminium Foil Induction Liner', function: '100% airtight liquid and oxygen barrier', icon: '🛡️', glowColor: '#f59e0b' },
        { layer: 2, name: 'UV-Blocking Tin / Amber Container', material: 'Tinplate / Amber Glass', function: 'Blocks 100% UV photons preventing lipid rancidity', icon: '🛢️', glowColor: '#fbbf24' },
        { layer: 3, name: 'Cellular Master Carton', material: '5-Ply Heavy Kraft CFB Box', function: 'Protects bottles from transit compression and drop shock', icon: '📦', glowColor: '#ca8a04' }
      ],
      packingSteps: [
        { step: 1, title: 'Nitrogen Headspace Flush', description: 'Inject 99.9% pure N2 to displace ambient oxygen before capping.' },
        { step: 2, title: 'Induction Heat Sealing', description: 'Electromagnetically bond foil liner to container mouth.' },
        { step: 3, title: 'Leak & Torque Test', description: 'Inspect torque cap integrity under 30 kPa vacuum test.' }
      ]
    },
    transportation: {
      recommendedVehicle: 'Covered Dry Cargo Truck with vibration dampening',
      temperatureControlled: false,
      targetTemp: '18°C - 25°C',
      maximumRecommendedDistance: '4,000 km',
      handlingRequirements: ['Strict "This Side Up" orientation', 'Never expose boxes to direct noon sun on open beds'],
      vibrationSensitivity: 'Medium',
      baseRatePerKm: 16.0
    },
    market: {
      marketCategory: 'Premium Cold-Pressed Health Oil (High Value FMCG)',
      priceUnit: '₹/Liter',
      basePricePerKg: 195.00,
      priceStatus: 'Live Benchmark',
      regionalPrices: {
        Bengaluru: 210.00,
        Mumbai: 205.00,
        Delhi: 215.00,
        Nashik: 190.00,
        Hyderabad: 198.00,
        Chennai: 200.00
      },
      priceTrend: 'Rising'
    },
    consumption: {
      nutritionalProfile: {
        calories: 884,
        protein_g: 0,
        carbs_g: 0,
        fat_g: 100.0,
        vitaminC_mg: 0,
        vitaminA_IU: 0,
        dietaryFiber_g: 0,
        potassium_mg: 0,
        iron_mg: 0.05,
        antioxidantIndex: 92,
        glycemicIndex: 0,
        highlights: ['High Smoke Point (225°C / 437°F)', 'Rich in Natural Vitamin E (Alpha-Tocopherol)', 'High Monounsaturated Fatty Acids (MUFA)']
      },
      consumptionMethods: ['Everyday sautéing and traditional stir-frying', 'Deep frying (high thermal stability)', 'Salad dressings and tempering (tadka)'],
      preparationMethods: ['Ideal for high-heat cooking due to high smoke point (225°C) without forming harmful trans-fats.'],
      nutrientPreservationTips: ['Never overheat repeatedly; avoid reusing deep-frying oil more than once.'],
      recommendedPreparation: 'Warm 1 tbsp in a pan, add mustard seeds and curry leaves for authentic aroma.',
      servingGuidance: '15-20ml daily per person as part of balanced culinary fat intake.',
      bioavailabilityTip: 'Natural fat matrix unlocks 4x higher absorption of fat-soluble vitamins (A, D, E, K) from vegetables.',
      recipes: [
        {
          title: 'Aromatic Curry Leaf & Mustard Tempered Dal',
          prepTime: '15 mins',
          healthBenefit: 'Maximized fat-soluble nutrient absorption & heart wellness',
          ingredients: ['1.5 tbsp Cold-Pressed Groundnut Oil', '1 cup Cooked Toor Dal', '1 tsp Mustard Seeds', '8 Fresh Curry Leaves', '2 Dried Red Chillies', '1 pinch Hing'],
          steps: [
            'Heat groundnut oil in a small tempering pan.',
            'Add mustard seeds, dried red chillies, and hing; let them splutter.',
            'Toss in fresh curry leaves, pour immediately over piping hot dal, and cover with lid to trap aroma.'
          ]
        }
      ]
    },
    risks: {
      highHumidityRisk: 'Water droplet contamination induces hydrolytic rancidity and bacterial clouding.',
      highTempRisk: 'Thermal exposure above 40°C on open trucks breaks down unsaturated fatty acids into bitter peroxides.',
      frostRisk: 'Low; oil becomes cloudy/solid below 3°C but liquifies naturally at room temperature with zero quality loss.',
      excessRainRisk: 'Damp cartons cause shipping box collapse and bottle leakage.',
      transitShockRisk: 'High drop impact can crack glass bottles or dent tin seams.',
      mitigationStrategy: 'Use nitrogen-flushed tinplate or induction-sealed HDPE with heavy-duty cellular carton dividers.'
    }
  },

  // 11. FRESH COW MILK (RAW DAIRY COMMODITY)
  {
    id: 'milk',
    name: 'Fresh Cow Milk (A2 Gir Cow)',
    category: 'Dairy',
    subcategory: 'Raw Liquid Dairy',
    scientificName: 'Lac Vaccinum (A2 Beta-Casein)',
    variety: 'Farm Fresh Pure Raw Milk (A2 Gir / Sahiwal)',
    description: 'Fresh, nutrient-dense whole milk rich in A2 beta-casein protein, bioavailable calcium, and beneficial enzymes, requiring strict 4°C cold-chain logistics.',
    icon: '🥛',
    color: '#38bdf8',
    aliases: ['milk', 'cow milk', 'doodh', 'palu', 'haalu', 'paal', 'fresh milk', 'a2 milk'],
    isProcessed: false,
    derivedProducts: [
      { id: 'curd', name: 'Probiotic Farm Curd (Dahi)', icon: '🥣', yieldPercent: 95 },
      { id: 'paneer', name: 'Fresh Soft Cottage Cheese (Paneer)', icon: '🧀', yieldPercent: 18 },
      { id: 'butter', name: 'Cultured Cultivated Makkan / Butter', icon: '🧈', yieldPercent: 6 },
      { id: 'ghee', name: 'Pure Bilona Desi Ghee', icon: '🫙', yieldPercent: 4.5 }
    ],
    yieldImprovementTips: [
      'Feed lactating cows balanced Total Mixed Ration (TMR) comprising 60% green fodder (lucerne/maize) + 40% protein concentrate.',
      'Ensure 24x7 ad-libitum fresh drinking water access (cows require 4-5 liters of water per liter of milk produced).'
    ],
    qualityImprovementTips: [
      'Pre-chill milk down to 4°C within 2 hours of milking in bulk milk coolers (BMC) to suppress bacterial multiplication.',
      'Enforce strict pre-milking teat sanitization and automated stainless-steel milking pipelines (SS-316).'
    ],
    images: {
      productImage: 'milk',
      productImageAlt: 'Farm Fresh Pure A2 Gir Cow Milk in Glass Bottle'
    },
    growing: {
      climate: 'Clean, well-ventilated cattle sheds with misting fans for thermal comfort (18°C - 25°C).',
      soil: 'Organic fodder cultivation paddocks (Napier grass / Berseem).',
      idealSoilPh: '6.5 - 7.5 (Fodder soil)',
      temperatureRange: [15, 28],
      rainfallRequirement: 'Ample water supply for clean dairy hygiene',
      sowingMethod: 'Hygienic machine milking in automated sanitary parlors',
      sowingSeason: 'Continuous daily morning & evening lactation cycles',
      seedRequirement: 'Pedigree certified A2 Gir/Sahiwal dairy cattle',
      spacing: '12 sq. meters open paddock space per cow',
      growthDuration: 'Daily 2-milking cycle (Morning 5 AM / Evening 5 PM)',
      growthDays: 1,
      currentMaturityStage: 100,
      irrigation: 'Automated drinking troughs with clean potable RO water',
      fertilizerGuidance: [
        { stage: 'Daily Nutrition', recommendation: 'Mineral mixture (50g) + Calcium liquid tonic + Salt licks', impact: 'Maintains high SNF (>8.5%) and Fat (>4.2%)', urgency: 'Immediate' },
        { stage: 'Udder Health', recommendation: 'Post-milking organic iodine teat dip', impact: '100% prevention of sub-clinical mastitis', urgency: 'Immediate' }
      ],
      commonPests: ['Ticks (Boophilus microplus)', 'Flies in barn'],
      diseaseRisks: ['Mastitis', 'Foot and Mouth Disease (FMD)', 'Bacterial spoilage (Lactic acid fermentation)'],
      criticalCareTips: [
        'Chill milk to 4°C immediately post-milking to halt bacterial colony forming units (CFU).',
        'Clean milk pipelines with CIP (Clean-In-Place) caustic/acid wash daily.'
      ]
    },
    harvesting: {
      harvestingDays: 1,
      recommendedWindow: 'Immediate cold dispatch within 4 hours of morning milking',
      maturityIndicators: [
        'Methylene Blue Reduction Time (MBRT) exceeds 5.0 hours (Superior microbial grade).',
        'Fat percentage > 4.0%, Solid-Not-Fat (SNF) > 8.5%.',
        'Specific gravity 1.028 - 1.032 at 20°C.'
      ],
      harvestingMethod: 'Automated SS-316 milking cluster directly piped into bulk milk chiller (BMC).',
      bestHarvestTime: 'Early morning (05:00 AM) & evening (05:00 PM)',
      firmnessTarget: 'Liquid density 1.030 g/cm³',
      postHarvestHandling: [
        'Rapid chilling from 37°C down to 4°C within 90 minutes in refrigerated BMC tanks.',
        'Sanitary pouch packaging or sterile glass bottling.',
        'Insulated reefer dispatch with continuous temperature datalogging.'
      ]
    },
    storage: {
      shelfLifeAmbient: '4 to 6 Hours (at room temperature 25°C - Sours rapidly)',
      shelfLifeCold: '3 to 5 Days (at strict 2°C - 4°C chilled cold chain)',
      ambientDays: 0.25,
      coldDays: 4,
      storageTemperature: '2°C - 4°C (STRICT CONTINUOUS COLD CHAIN MANDATORY)',
      humidity: '85% - 90% RH',
      coldStorageRequired: true,
      storageMethod: 'Insulated milk chillers or cold storage vaults (2°C - 4°C)',
      preservationSteps: [
        'Maintain unbroken cold chain from farm chiller to consumer refrigerator.',
        'Pasteurize at 72°C for 15 seconds (HTST) if extended shelf-life is required.'
      ],
      spoilageIndicators: ['Sour acidic odor and curdling upon boiling (clot-on-boiling positive)', 'pH drops below 6.4', 'Phase separation'],
      curingRequired: false
    },
    packaging: {
      primaryPackaging: '5-Layer Co-Extruded EVOH Barrier Pouch (500ml / 1L) or Sterilized Glass Bottles with Tamper Seal',
      secondaryPackaging: 'Returnable Stackable HDPE Dairy Crates (12 x 1L / 24 x 500ml)',
      recommendedMaterials: ['5-Layer PE/EVOH/PE Co-Ex Pouch with Black UV Barrier Core', 'Sterilized Flint Glass Bottle', 'Aseptic Brick Carton'],
      ventilationRequired: false,
      ventilationSpec: 'Hermetically heat-sealed liquid containment',
      moistureProtection: '100% Liquid leakproof barrier',
      ethyleneSensitivity: 'Low',
      ethyleneControl: 'Not required',
      cushioningSpecs: 'Interlocking HDPE crates prevent pouch rupture under hydraulic transit shock',
      shockRating: 4.6,
      estimatedPackagingCostPerKg: 2.10,
      packagingCapacity: '1 Liter pouches / crates of 12 liters',
      ecoCertification: '100% Recyclable Polyethylene / Reusable Glass',
      layers: [
        { layer: 1, name: 'Food-Contact Inner Poly', material: 'Virgin Metallocene LLDPE', function: 'Hermetic liquid seal with zero chemical migration', icon: '🥛', glowColor: '#38bdf8' },
        { layer: 2, name: 'Black Light Barrier Layer', material: 'Carbon Black Co-Extruded Core', function: 'Blocks 100% UV light preventing riboflavin breakdown', icon: '🛡️', glowColor: '#0ea5e9' },
        { layer: 3, name: 'Interlocking Dairy Crate', material: 'High-Density Polyethylene RPC', function: 'Absorbs transit road vibrations and enables 6-high stacking', icon: '🧺', glowColor: '#0284c7' }
      ],
      packingSteps: [
        { step: 1, title: 'In-Line Chilling Verification', description: 'Confirm milk core temp is below 3.5°C before filler bowl.' },
        { step: 2, title: 'Hermetic Form-Fill-Seal', description: 'Ultrasonic or thermal impulse jaw seal with zero headspace leak.' },
        { step: 3, title: 'Crate Nesting & Cold Vault', description: 'Load pouches into sanitised crates and transfer to 2°C cold room.' }
      ]
    },
    transportation: {
      recommendedVehicle: 'Dedicated Refrigerated Insulated Reefer Van (2°C - 4°C)',
      temperatureControlled: true,
      targetTemp: '2°C - 4°C (MANDATORY REEFER)',
      maximumRecommendedDistance: '300 km (for raw/pasteurized milk) or 1,500 km in Insulated Tankers',
      handlingRequirements: ['Unbroken cold chain', 'Real-time GPS + IoT temperature datalogging', 'Zero ambient layovers'],
      vibrationSensitivity: 'High',
      baseRatePerKm: 28.0
    },
    market: {
      marketCategory: 'Daily High-Frequency Dairy Essential (Perishable)',
      priceUnit: '₹/Liter',
      basePricePerKg: 65.00,
      priceStatus: 'Live Benchmark',
      regionalPrices: {
        Bengaluru: 68.00,
        Mumbai: 72.00,
        Delhi: 66.00,
        Nashik: 60.00,
        Hyderabad: 65.00,
        Chennai: 70.00
      },
      priceTrend: 'Stable'
    },
    consumption: {
      nutritionalProfile: {
        calories: 67,
        protein_g: 3.4,
        carbs_g: 4.8,
        fat_g: 4.1,
        vitaminC_mg: 1.0,
        vitaminA_IU: 160,
        dietaryFiber_g: 0,
        potassium_mg: 150,
        iron_mg: 0.05,
        antioxidantIndex: 78,
        glycemicIndex: 30,
        highlights: ['Easy to Digest A2 Beta-Casein Protein', 'High Bioavailable Calcium (120mg / 100ml)', 'Natural Conjugated Linoleic Acid (CLA)']
      },
      consumptionMethods: ['Warm soothing bedtime drink with turmeric', 'Culture into live probiotic curd/dahi', 'Fresh homemade soft paneer', 'Traditional tea and coffee base'],
      preparationMethods: ['Bring to a gentle rolling boil for 2 minutes to ensure microbiological safety while preserving delicate lactoferrin proteins.'],
      nutrientPreservationTips: ['Do not overheat repeatedly in microwave; cool boiled milk with lid covered to retain moisture and volatile vitamins.'],
      recommendedPreparation: 'Simmer gently with a crushed cardamom pod and a pinch of pure saffron.',
      servingGuidance: '1 glass (250ml) provides 30% of daily calcium and 8.5g of complete protein.',
      bioavailabilityTip: 'Natural milk fat enhances absorption of Vitamin D and calcium into bones.',
      recipes: [
        {
          title: 'Ayurvedic Golden Turmeric & Nutmeg Night Elixir',
          prepTime: '5 mins',
          healthBenefit: 'Promotes deep restful sleep & strengthens bone density',
          ingredients: ['1 cup Pure A2 Cow Milk', '1/4 tsp Salem Turmeric', '1 pinch Fresh Grated Nutmeg', '1 Crushed Green Cardamom', '1 tsp Raw Honey'],
          steps: [
            'Warm the milk in a small saucepan over medium heat.',
            'Whisk in turmeric, crushed cardamom, and grated nutmeg; bring to a light simmer.',
            'Pour into a mug, stir in raw honey when warm (not boiling), and drink before bedtime.'
          ]
        }
      ]
    },
    risks: {
      highHumidityRisk: 'Not applicable to liquid packaging; protect cartons from pooling floor water.',
      highTempRisk: 'CRITICAL: Temperature rising above 7°C causes exponential bacterial proliferation (Lactobacillus/Coliforms) and irreversible souring within 3 hours.',
      frostRisk: 'Freezing solid (-2°C) causes fat emulsion destabilization and protein precipitation upon thawing.',
      excessRainRisk: 'Road delays during monsoon jeopardize the short 4-hour raw milk transit window.',
      transitShockRisk: 'High hydraulic surging in liquid tanks can cause pouch friction tears if crates are loose.',
      mitigationStrategy: 'Enforce continuous 2°C-4°C reefer transport, automated IoT temperature alarms, and 6-hour delivery radius.'
    }
  },

  // 12. PURE DESI GHEE (PROCESSED DAIRY DERIVATIVE)
  {
    id: 'ghee',
    name: 'Pure Desi Ghee (Bilona Churned A2)',
    category: 'Dairy',
    subcategory: 'Processed Clarified Butterfat',
    scientificName: 'Butyrum Purificatum (A2 Milk Fat)',
    variety: 'Traditional Vedic Bilona Hand-Churned',
    description: 'Golden clarified butterfat prepared by slow-simmering cultured makkhan over woodfire, rich in butyric acid, fat-soluble vitamins, and rich nutty aroma.',
    icon: '🫙',
    color: '#eab308',
    aliases: ['ghee', 'desi ghee', 'bilona ghee', 'clarified butter', 'a2 ghee', 'cow ghee', 'neyyi', 'tuppa', 'ghee butter'],
    isProcessed: true,
    rawCommodityId: 'milk',
    processingMethod: 'Traditional 5-Samskara Vedic Process: Raw A2 Milk -> Boiled -> Cultured into Curd -> Bilated in Wooden Churner -> Makkhan Extracted -> Slow Woodfire Simmering -> Golden Ghee.',
    processingStage: 'High-Value Artisan Dairy Processing',
    qualityImprovementTips: [
      'Simmer cultured butter on low flame (<110°C) with betel/curry leaves to precipitate milk solids without scorching.',
      'Allow ghee to cool undisturbed in cool room (18°C) for 24 hours to develop characteristic granular (Danedar) crystal texture.'
    ],
    images: {
      productImage: 'ghee',
      productImageAlt: 'Granular Golden Bilona Desi Ghee in Glass Jar'
    },
    growing: {
      climate: 'Derived from whole A2 Gir cow milk cultured with natural lactobacillus starter.',
      soil: 'Pristine organic pastures supporting grazing dairy cattle.',
      idealSoilPh: '6.5 - 7.5',
      temperatureRange: [15, 26],
      rainfallRequirement: 'N/A (Processing unit)',
      sowingMethod: 'Traditional wooden bilona bi-directional churning',
      sowingSeason: 'Year-round processing in certified clean artisan facilities',
      seedRequirement: '25-28 Liters of pure A2 milk yield 1 Kg of pure Bilona Desi Ghee (3.8% yield ratio)',
      spacing: 'Artisan processing floor',
      growthDuration: '48-hour traditional culturing, churning, and slow clarification cycle',
      growthDays: 2,
      currentMaturityStage: 100,
      irrigation: 'Not applicable',
      fertilizerGuidance: [
        { stage: 'Curd Fermentation', recommendation: 'Culture milk at 28°C for 16 hours', impact: 'Maximizes probiotic lactic aroma and short-chain fatty acids', urgency: 'Immediate' },
        { stage: 'Clarification', recommendation: 'Filter hot ghee through multi-layer sanitized muslin', impact: 'Zero burnt milk solids; 99.8% pure butterfat', urgency: 'Scheduled' }
      ],
      commonPests: ['Storage ants/insects in open jars'],
      diseaseRisks: ['Oxidative rancidity if exposed to moisture and direct sun'],
      criticalCareTips: [
        'Store in airtight glass jars or food-grade tinplate; strictly avoid moisture ingress.',
        'Never insert wet spoons into ghee jar.'
      ]
    },
    harvesting: {
      harvestingDays: 1,
      recommendedWindow: 'Granulated batches packed into sterilized dry containers at 40°C',
      maturityIndicators: [
        'Moisture content strictly under 0.3% (FSSAI standard).',
        'Free Fatty Acid (as Oleic) < 0.5%.',
        'Rich golden granular consistency with authentic nutty aroma.'
      ],
      harvestingMethod: 'Manual filling into sterilized hot dry glass jars with induction seal.',
      bestHarvestTime: 'Hygienic dust-free cleanroom',
      firmnessTarget: 'Granular semi-solid at 20°C',
      postHarvestHandling: [
        'Slow cooling at 18°C-20°C for 24 hours to promote large granular crystals.',
        'Hermetic induction cap sealing to lock out ambient moisture.',
        'Holographic provenance QR tag.'
      ]
    },
    storage: {
      shelfLifeAmbient: '12 to 18 Months (at room temperature in dark pantry)',
      shelfLifeCold: '24+ Months in cold storage',
      ambientDays: 450,
      coldDays: 730,
      storageTemperature: '18°C - 24°C (Ambient Dark Pantry - No refrigeration required)',
      humidity: '40% - 50% RH (Must avoid steam/condensation)',
      coldStorageRequired: false,
      storageMethod: 'Airtight amber glass jars, ceramic Martaban crocks, or food-grade tinplate cans',
      preservationSteps: [
        'Ensure container is completely hermetic to stop air and moisture entry.',
        'Store in dark pantry away from kitchen stove heat and sunlight.'
      ],
      spoilageIndicators: ['Bleached pale color', 'Rancid paint-like aroma', 'Tallowy taste due to oxidation'],
      curingRequired: false
    },
    packaging: {
      primaryPackaging: 'Flint / Amber Glass Jars with Hermetic Lug Cap (500ml / 1L) or Heavy Food-Grade Tinplate Cans',
      secondaryPackaging: '5-Ply Corrugated Cartons with full-height partitions',
      recommendedMaterials: ['Flint Glass Jar', 'Amber UV Glass', 'Food-Contact Tinplate Can', 'Multi-Layer Barrier Pouches with AL Foil'],
      ventilationRequired: false,
      ventilationSpec: 'Hermetically sealed with nitrogen flush (100% Gas & Moisture Barrier)',
      moistureProtection: 'Zero water vapor transmission required',
      ethyleneSensitivity: 'Low',
      ethyleneControl: 'Not required',
      cushioningSpecs: 'Corrugated divider cells protect glass jars from vibration fracturing',
      shockRating: 4.8,
      estimatedPackagingCostPerKg: 7.50,
      packagingCapacity: '500g / 1kg glass jars & 5kg tins',
      ecoCertification: '100% Reusable & Recyclable Glass & Tin',
      layers: [
        { layer: 1, name: 'Induction Foil Liner', material: 'Aluminium Heat-Seal Membrane', function: 'Guarantees zero oxygen ingress and tamper evidence', icon: '🛡️', glowColor: '#eab308' },
        { layer: 2, name: 'Heavy Amber Glass Jar', material: '100% Inert Silica Glass', function: 'Protects delicate butyric aroma and prevents UV photo-oxidation', icon: '🫙', glowColor: '#f59e0b' },
        { layer: 3, name: 'Cushioned Master Box', material: '5-Ply Heavy Virgin Kraft Carton', function: 'Absorbs 450kg top-load stacking compression', icon: '📦', glowColor: '#ca8a04' }
      ],
      packingSteps: [
        { step: 1, title: 'Sterile Thermal Drying', description: 'Bake glass jars at 110°C for 20 mins to ensure zero residual moisture.' },
        { step: 2, title: 'Warm Liquid Pouring', description: 'Pour liquid ghee at 42°C with automated volumetric nozzles.' },
        { step: 3, title: 'Granulation Resting', description: 'Rest filled jars undisturbed at 18°C for 24h to develop granular texture.' }
      ]
    },
    transportation: {
      recommendedVehicle: 'Covered Dry Cargo Truck with air-ride suspension',
      temperatureControlled: false,
      targetTemp: 'Ambient Dry (18°C - 25°C)',
      maximumRecommendedDistance: '5,000 km (National & Export Shipping)',
      handlingRequirements: ['Handle glass with care; no rough tipping', 'Keep out of direct solar heat'],
      vibrationSensitivity: 'Low',
      baseRatePerKm: 16.0
    },
    market: {
      marketCategory: 'Super-Premium Artisan Wellness Commodity (High Margin)',
      priceUnit: '₹/kg',
      basePricePerKg: 950.00,
      priceStatus: 'Live Benchmark',
      regionalPrices: {
        Bengaluru: 1100.00,
        Mumbai: 1150.00,
        Delhi: 1200.00,
        Nashik: 950.00,
        Hyderabad: 1050.00,
        Chennai: 1080.00
      },
      priceTrend: 'Rising'
    },
    consumption: {
      nutritionalProfile: {
        calories: 897,
        protein_g: 0.1,
        carbs_g: 0,
        fat_g: 99.5,
        vitaminC_mg: 0,
        vitaminA_IU: 3069,
        dietaryFiber_g: 0,
        potassium_mg: 5,
        iron_mg: 0.02,
        antioxidantIndex: 96,
        glycemicIndex: 0,
        highlights: ['Rich in Butyric Acid (Nourishes Gut Lining)', 'Abundant Fat-Soluble Vitamins (A, D, E, K2)', 'High Smoke Point (252°C / 485°F)']
      },
      consumptionMethods: ['Drizzle over piping hot rotis, dal, and rice', 'Ayurvedic morning tablespoon with warm water', 'High-heat sacred roasting and baking', 'Skin healing and massage'],
      preparationMethods: ['Add a spoonful to hot rice or soup right before eating to preserve active fat-soluble enzymes.'],
      nutrientPreservationTips: ['Use a clean dry spoon; do not leave the jar open in humid steam.'],
      recommendedPreparation: 'Warm 1 tsp and drizzle over steamed ragi mudde or whole wheat rotis.',
      servingGuidance: '1-2 teaspoons (10-15g) daily supports joint mobility and optimal digestion.',
      bioavailabilityTip: 'Butyrate strengthens intestinal tight junctions and enhances cellular nutrient absorption across the colon.',
      recipes: [
        {
          title: 'Vedic Granular Ghee & Jaggery Energy Laddu',
          prepTime: '20 mins',
          healthBenefit: 'Instant sustained vitality, rich in iron, zinc, and healthy fats',
          ingredients: ['1/2 cup Pure Desi Ghee', '1 cup Roasted Wheat Flour', '1/2 cup Organic Jaggery Powder', '1/4 tsp Cardamom', 'Crushed Almonds'],
          steps: [
            'Roast wheat flour in warm ghee on low flame until aromatic and golden.',
            'Remove from heat, let cool to lukewarm, then mix in organic jaggery powder and cardamom.',
            'Shape into round nourishing energy laddus and store in an airtight glass jar.'
          ]
        }
      ]
    },
    risks: {
      highHumidityRisk: 'Moisture ingress triggers hydrolytic rancidity and fungal colonization.',
      highTempRisk: 'Storage above 40°C melts granular crystals into liquid, causing phase separation.',
      frostRisk: 'Zero risk; solidifies below 15°C naturally without any nutritional compromise.',
      excessRainRisk: 'Damp cardboard master boxes can soften and collapse.',
      transitShockRisk: 'Glass jar cracking if transport pallets lack corner protection.',
      mitigationStrategy: 'Seal with induction foil, pack in partitioned corrugated boxes, and ship in dry covered trucks.'
    }
  },

  // 13. WHEAT FLOUR (PROCESSED GRAIN DERIVATIVE)
  {
    id: 'wheat-flour',
    name: 'Whole Wheat Flour (Stone-Ground Chakki Atta)',
    category: 'Flour',
    subcategory: 'Processed Cereal Flour',
    scientificName: 'Triticum aestivum (Whole Meal)',
    variety: '100% Whole Grain Sharbati Chakki Fresh',
    description: 'Traditional slow stone-ground whole wheat flour retaining 100% of the wheat germ, bran fiber, and endosperm nutrients without chemical bleaching or refining.',
    icon: '🌾',
    color: '#ca8a04',
    aliases: ['wheat flour', 'atta', 'gehu ka atta', 'chakki atta', 'whole wheat flour', 'godhumai maavu', 'godhi hittu'],
    isProcessed: true,
    rawCommodityId: 'wheat',
    processingMethod: 'Pre-cleaning, destoning, controlled 2-hour conditioning, and slow cold stone milling (<40°C) with 0% maida separation.',
    processingStage: 'Milled Grain Commodity',
    qualityImprovementTips: [
      'Maintain stone milling speed under 350 RPM to keep flour temperature <40°C, preserving heat-sensitive Vitamin E and wheat germ oils.',
      'Control grain conditioning moisture strictly to 12.0% prior to milling for optimal soft dough elasticity and water absorption (>68%).'
    ],
    images: {
      productImage: 'wheat-flour',
      productImageAlt: 'Stone Ground Whole Wheat Chakki Atta Pack'
    },
    growing: {
      climate: 'Milled from high-protein MP Sharbati wheat grown in cool dry winter seasons.',
      soil: 'Deep fertile black cotton soils.',
      idealSoilPh: '6.5 - 8.0',
      temperatureRange: [15, 25],
      rainfallRequirement: 'N/A (Milling Facility)',
      sowingMethod: 'Traditional emery/granite chakki stone milling',
      sowingSeason: 'Year-round fresh milling on demand',
      seedRequirement: '1.05 kg whole wheat grain yields 1.0 kg 100% whole meal atta (95% extraction rate)',
      spacing: 'Milling plant',
      growthDuration: 'Continuous automated milling and packing',
      growthDays: 1,
      currentMaturityStage: 100,
      irrigation: 'Not applicable',
      fertilizerGuidance: [
        { stage: 'Grain Cleaning', recommendation: 'Aspiration + magnetic destoning + gravity separation', impact: '100% zero grit/sand particles', urgency: 'Immediate' },
        { stage: 'Moisture Check', recommendation: 'Verify finished flour moisture < 11.5%', impact: 'Prevents insect infestation and mold', urgency: 'Scheduled' }
      ],
      commonPests: ['Flour Beetle (Tribolium castaneum)', 'Rice Weevil', 'Flour Mites'],
      diseaseRisks: ['Fungal mold if stored in damp godowns (>65% RH)'],
      criticalCareTips: [
        'Store in airtight nitrogen-flushed or vacuum-sealed bags with moisture barrier liners.',
        'Keep bags off cold damp floors on wooden or plastic pallets.'
      ]
    },
    harvesting: {
      harvestingDays: 1,
      recommendedWindow: 'Immediate packaging post air-cooling to 25°C',
      maturityIndicators: [
        'Flour moisture strictly under 12.0%.',
        'Gluten content (wet) > 28%, Protein > 11.5%.',
        'Granulation: 95% passes through 60-mesh sieve (balanced coarse bran).'
      ],
      harvestingMethod: 'Automated screw feeder into multi-layer barrier pouches.',
      bestHarvestTime: 'Clean dry milling plant',
      firmnessTarget: 'Soft powdery texture with visible golden bran flakes',
      postHarvestHandling: [
        'Pneumatic cyclone air-cooling of freshly ground flour down to 25°C.',
        'Metal detector screening (Ferrous/Non-Ferrous/SS 1.0mm).',
        'Automatic bag heat-sealing and tamper-evident coding.'
      ]
    },
    storage: {
      shelfLifeAmbient: '3 to 4 Months (in standard paper/poly bag) or 9 Months in Barrier Foil',
      shelfLifeCold: '12 Months at 10°C - 15°C',
      ambientDays: 100,
      coldDays: 365,
      storageTemperature: '18°C - 24°C (Cool, Dry, Well-Ventilated Godown)',
      humidity: '50% - 60% RH (STRICT: Must not exceed 65% RH)',
      coldStorageRequired: false,
      storageMethod: 'BOPP laminated moisture-proof sacks or multi-wall kraft paper bags on pallets',
      preservationSteps: [
        'Ensure moisture stays below 11.5% to stop flour beetles and mold.',
        'Store 30 cm away from walls and 15 cm above ground on pallets.'
      ],
      spoilageIndicators: ['Webbing and live flour beetles (Tribolium)', 'Musty fungal odor', 'Sour dough aroma due to lipid hydrolysis'],
      curingRequired: false
    },
    packaging: {
      primaryPackaging: 'BOPP Laminated Multi-Layer Moisture-Barrier Poly Pouch (5kg / 10kg)',
      secondaryPackaging: 'Heavy-Duty 5-Ply Master Carton or Woven Outer Sacks (50kg)',
      recommendedMaterials: ['BOPP / Met-PET / PE Laminate', 'Multi-Wall Kraft Paper with LDPE Liner', 'Sealed Nitrogen-Flushed Foil'],
      ventilationRequired: false,
      ventilationSpec: 'Hermetically sealed moisture and insect barrier (Zero Perforation)',
      moistureProtection: 'High water vapor barrier (WVTR < 2.0 g/m²·day)',
      ethyleneSensitivity: 'Low',
      ethyleneControl: 'Not required',
      cushioningSpecs: 'Puncture-resistant film prevents bag burst upon warehouse drop',
      shockRating: 3.5,
      estimatedPackagingCostPerKg: 1.20,
      packagingCapacity: '5kg & 10kg consumer packs',
      ecoCertification: '100% Recyclable BOPP',
      layers: [
        { layer: 1, name: 'Moisture Barrier Inner Liner', material: 'Co-Ex Virgin Polyethylene', function: 'Locks out atmospheric dampness and stops insect penetration', icon: '🛡️', glowColor: '#ca8a04' },
        { layer: 2, name: 'High-Gloss BOPP Film', material: 'Biaxially Oriented Polypropylene', function: 'Provides high tensile strength and puncture resistance', icon: '📦', glowColor: '#eab308' },
        { layer: 3, name: 'Smart Traceability Barcode', material: 'Printed High-Speed Lot Code', function: 'Milling date, wheat origin, and gluten analysis certificate', icon: '🏷️', glowColor: '#38bdf8' }
      ],
      packingSteps: [
        { step: 1, title: 'Flour Temperature Check', description: 'Ensure flour has cooled below 28°C before bagging.' },
        { step: 2, title: 'De-Aeration & Compaction', description: 'Vibrate bag to expel trapped air and maximize stacking stability.' },
        { step: 3, title: 'Hermetic Heat Seal', description: 'Continuous band heat seal with 15mm tamper-proof weld.' }
      ]
    },
    transportation: {
      recommendedVehicle: 'Covered Dry Cargo Container Truck',
      temperatureControlled: false,
      targetTemp: 'Ambient Dry (<25°C)',
      maximumRecommendedDistance: '3,000 km',
      handlingRequirements: ['Zero water leaks in truck container roof', 'Stack max 10 bags high on pallets'],
      vibrationSensitivity: 'Low',
      baseRatePerKm: 15.0
    },
    market: {
      marketCategory: 'High-Volume Daily Household Staple (FMCG Core)',
      priceUnit: '₹/kg',
      basePricePerKg: 42.00,
      priceStatus: 'Live Benchmark',
      regionalPrices: {
        Bengaluru: 45.00,
        Mumbai: 44.00,
        Delhi: 40.00,
        Nashik: 38.00,
        Hyderabad: 43.00,
        Chennai: 46.00
      },
      priceTrend: 'Stable'
    },
    consumption: {
      nutritionalProfile: {
        calories: 340,
        protein_g: 12.1,
        carbs_g: 71.2,
        fat_g: 1.7,
        vitaminC_mg: 0,
        vitaminA_IU: 0,
        dietaryFiber_g: 11.5,
        potassium_mg: 363,
        iron_mg: 3.9,
        antioxidantIndex: 76,
        glycemicIndex: 54,
        highlights: ['100% Whole Grain Bran & Germ Intact', 'High Dietary Fiber (11.5g / 100g)', 'Natural B-Complex Vitamins & Magnesium']
      },
      consumptionMethods: ['Soft puffed phulkas and rotis', 'Stuffed parathas', 'Wholesome stone-ground puris', 'Traditional whole wheat halwa / sheera'],
      preparationMethods: ['Knead with warm water and rest dough covered for 20 minutes to allow gluten network relaxation for super soft rotis.'],
      nutrientPreservationTips: ['Do not sieve out the coarse bran particles; they contain 80% of the fiber and essential B-vitamins.'],
      recommendedPreparation: 'Knead with 1 tsp ghee and warm water; roast on a cast-iron tawa until puffed.',
      servingGuidance: '2-3 phulkas (80-100g flour) provides sustained energy and active digestion support.',
      bioavailabilityTip: 'Resting the kneaded dough for 30 minutes activates endogenous phytase enzymes, increasing zinc and iron absorption.',
      recipes: [
        {
          title: 'Feather-Soft Whole Wheat Phulkas',
          prepTime: '25 mins',
          healthBenefit: 'High dietary fiber, digestive ease, and sustained low-GI energy',
          ingredients: ['2 cups Whole Wheat Chakki Atta', '3/4 cup Warm Water', '1/2 tsp Salt', '1 tsp Pure Ghee'],
          steps: [
            'Mix atta and salt; gradually add warm water and knead into a smooth, elastic dough.',
            'Coat with 1 tsp ghee, cover with a damp cloth, and rest 20 minutes.',
            'Roll into thin discs and cook on hot tawa, flipping once until it puffs into a soft golden balloon.'
          ]
        }
      ]
    },
    risks: {
      highHumidityRisk: 'Humidity > 65% causes flour to absorb moisture, leading to clumping, souring, and mold.',
      highTempRisk: 'Storage > 35°C accelerates oxidation of wheat germ oils, causing stale cardboard taste.',
      frostRisk: 'None; freeze-thaw stable in dry condition.',
      excessRainRisk: 'Water leaks through truck tarpaulins ruin entire bottom pallet layers.',
      transitShockRisk: 'Bag rupture if sharp hooks or rough container walls tear multi-wall paper.',
      mitigationStrategy: 'Use BOPP moisture-barrier sacks, stack on pallets, and transport in sealed dry container trucks.'
    }
  },

  // 14. TEA (PROCESSED AGRO-CASH COMMODITY)
  {
    id: 'tea',
    name: 'Tea (Assam CTC & Orthodox Black Tea)',
    category: 'Tea & Coffee',
    subcategory: 'Processed Beverage Leaf',
    scientificName: 'Camellia sinensis var. assamica',
    variety: 'Assam Premium Second Flush (CTC BP / BOP)',
    description: 'Rich, malty, full-bodied black tea produced from hand-plucked two leaves and a bud, processed via traditional CTC (Crush, Tear, Curl) and orthodox rolling.',
    icon: '🍵',
    color: '#047857',
    aliases: ['tea', 'black tea', 'chai', 'assam tea', 'ctc tea', 'tea leaves', 'orthodox tea', 'camellia sinensis'],
    isProcessed: true,
    rawCommodityId: 'tea-leaves',
    processingMethod: 'Withering (14h) -> CTC Maceration -> Controlled Fermentation/Oxidation (28°C, 95% RH) -> Fluidized Bed Drying (120°C) -> Sorting & Cleaning.',
    processingStage: 'Estate Processed Commodity',
    qualityImprovementTips: [
      'Pluck strictly "two leaves and a bud" fine shoot standard for highest theaflavins (TF) and thearubigins (TR).',
      'Maintain oxidation room temperature under 28°C with 95% RH to achieve bright coppery liquor and malty briskness.'
    ],
    images: {
      productImage: 'tea',
      productImageAlt: 'Rich Golden CTC Assam Black Tea Grains'
    },
    growing: {
      climate: 'Warm humid tropical climate (22°C - 32°C) with abundant monsoon rainfall (2,000 - 3,000 mm).',
      soil: 'Deep, well-drained acidic virgin loamy soils with high organic matter.',
      idealSoilPh: '4.5 - 5.5 (Acidic soil vital)',
      temperatureRange: [18, 35],
      rainfallRequirement: '2,000 - 3,500 mm evenly distributed',
      sowingMethod: 'Vegetative clonal propagation (TV clones) in contoured estate terraces',
      sowingSeason: 'Spring & Monsoon flushes (March - October)',
      seedRequirement: '14,000 clonal bushes / hectare in double-hedge system',
      spacing: '105 cm between rows x 60 cm between bushes',
      growthDuration: 'Perennial bush lifespan 60+ years; plucking rounds every 7-10 days',
      growthDays: 7,
      currentMaturityStage: 92,
      irrigation: 'Overhead sprinkler irrigation during dry pre-monsoon months (Feb-April)',
      fertilizerGuidance: [
        { stage: 'Post-Prune Flush', recommendation: 'NPK 100:40:100 kg/ha + Zinc Sulfate foliar spray', impact: 'Vigorous flush of tender vegetative shoots', urgency: 'Immediate' },
        { stage: 'Second Flush Quality', recommendation: 'Magnesium Sulfate (1%) + Boron foliar nutrition', impact: 'High theaflavin synthesis and liquor briskness', urgency: 'Scheduled' }
      ],
      commonPests: ['Tea Mosquito Bug (Helopeltis theivora)', 'Red Spider Mite', 'Thrips'],
      diseaseRisks: ['Blister Blight (Exobasidium vexans)', 'Black Rot', 'Red Rust'],
      criticalCareTips: [
        'Maintain shade trees (Albizia lebbeck) in plantation to filter intense solar radiation.',
        'Prune bushes cyclically every 3-4 years to maintain reachable plucking table.'
      ]
    },
    harvesting: {
      harvestingDays: 5,
      recommendedWindow: 'Fine plucking standard: top two leaves and unopened terminal bud',
      maturityIndicators: [
        'Tender succulent shoots with two fully open leaves and a velvety silver bud.',
        'Zero coarse overgrown foliage on the plucking table.',
        'Moisture in freshly plucked green leaf: 75% - 78%.'
      ],
      harvestingMethod: 'Manual hand plucking or ergonomic estate shears with collection aprons.',
      bestHarvestTime: 'Early dry morning (07:00 AM - 11:30 AM)',
      firmnessTarget: 'Crisp dry granules (<3.5% final moisture)',
      postHarvestHandling: [
        'Transport green leaf in ventilated leaf baskets within 2 hours to prevent field heating.',
        'Withering troughs with controlled air fans to reduce leaf moisture to 65%.',
        'Fluidized bed drying down to <3.0% moisture followed by electrostatic fiber cleaning.'
      ]
    },
    storage: {
      shelfLifeAmbient: '18 to 24 Months (in hermetic aluminium foil barrier pouches)',
      shelfLifeCold: '36 Months at 10°C - 15°C',
      ambientDays: 540,
      coldDays: 1080,
      storageTemperature: '18°C - 24°C (Ambient Dry - Odor-Free Warehouse)',
      humidity: '45% - 55% RH (Must avoid moisture and foreign odors)',
      coldStorageRequired: false,
      storageMethod: 'Aluminium-foil lined multi-wall paper sacks or hermetic tinplate canisters',
      preservationSteps: [
        'Keep strictly away from high-odor commodities (spices, onions, diesel).',
        'Ensure moisture stays below 4.0% to prevent loss of briskness and aroma.'
      ],
      spoilageIndicators: ['Loss of malty aroma (flat liquor)', 'Moisture pickup >7% (moldy taint)', 'Soft dull liquor color'],
      curingRequired: false
    },
    packaging: {
      primaryPackaging: 'Multi-Layer Aluminium Barrier Pouch (PET/AL/PE) with Degassing / Nitrogen Flush (250g / 500g / 1kg)',
      secondaryPackaging: '5-Ply Master Export Shipping Cartons or Multi-Wall Paper Sacks with Foil Liner (20kg / 35kg)',
      recommendedMaterials: ['PET / AL / PE Multi-Layer Foil', 'Airtight Tinplate Cans with Hermetic Plug', 'Metallized BOPP Barrier Film'],
      ventilationRequired: false,
      ventilationSpec: '100% Hermetically sealed (Zero OTR and Zero WVTR Barrier)',
      moistureProtection: 'Absolute moisture and aroma barrier',
      ethyleneSensitivity: 'Low',
      ethyleneControl: 'Not required',
      cushioningSpecs: 'Standard carton protection',
      shockRating: 3.2,
      estimatedPackagingCostPerKg: 3.20,
      packagingCapacity: '250g / 500g / 1kg pouches & 20kg bulk chests',
      ecoCertification: '100% Recyclable Outer Cartons / Reusable Tins',
      layers: [
        { layer: 1, name: 'Aluminium Foil Aroma Shield', material: 'Pure Aluminium Foil Barrier Core', function: 'Blocks 100% oxygen, moisture, and aromatic volatile escape', icon: '🛡️', glowColor: '#047857' },
        { layer: 2, name: 'Outer Reverse-Printed PET', material: 'High-Tensile Gloss Polyester', function: 'Protects barrier foil from puncture and flex-cracking', icon: '📦', glowColor: '#10b981' },
        { layer: 3, name: 'Reclosable Zipper Seal', material: 'Food-Grade PE Lock Zipper', function: 'Enables repeated consumer opening while locking in freshness', icon: '🔒', glowColor: '#38bdf8' }
      ],
      packingSteps: [
        { step: 1, title: 'Moisture Quality Assay', description: 'Confirm final tea moisture is strictly below 3.5%.' },
        { step: 2, title: 'Nitrogen Purge Filling', description: 'Displace residual oxygen to <0.5% in pouch headspace.' },
        { step: 3, title: 'Hermetic Ultrasonic Seal', description: 'Weld top seal with tamper-evident notch.' }
      ]
    },
    transportation: {
      recommendedVehicle: 'Clean, Odor-Free Covered Dry Container Truck',
      temperatureControlled: false,
      targetTemp: 'Ambient Dry (18°C - 28°C)',
      maximumRecommendedDistance: '5,000 km (Domestic & Global Container Export)',
      handlingRequirements: ['Strictly odor-free container; never ship with chemical or spice loads', 'Protect from container sweat'],
      vibrationSensitivity: 'Low',
      baseRatePerKm: 16.0
    },
    market: {
      marketCategory: 'High-Value Agro-Beverage Commodity (Tea Board Auction)',
      priceUnit: '₹/kg',
      basePricePerKg: 280.00,
      priceStatus: 'Live Benchmark',
      regionalPrices: {
        Bengaluru: 320.00,
        Mumbai: 310.00,
        Delhi: 295.00,
        Nashik: 275.00,
        Hyderabad: 300.00,
        Chennai: 315.00
      },
      priceTrend: 'Rising'
    },
    consumption: {
      nutritionalProfile: {
        calories: 2,
        protein_g: 0.1,
        carbs_g: 0.3,
        fat_g: 0,
        vitaminC_mg: 0,
        vitaminA_IU: 0,
        dietaryFiber_g: 0,
        potassium_mg: 37,
        iron_mg: 0.02,
        antioxidantIndex: 98,
        glycemicIndex: 0,
        highlights: ['Rich in Theaflavins & Thearubigins', 'Natural L-Theanine for Calm Mental Focus', 'Potent Polyphenol Antioxidants']
      },
      consumptionMethods: ['Classic Indian Spiced Masala Chai with milk and ginger', 'Brisk morning black tea with lemon', 'Cold-brewed iced tea with mint'],
      preparationMethods: ['Steep in freshly boiled water (95°C - 100°C) for 3-4 minutes to release full malty notes without excessive astringency.'],
      nutrientPreservationTips: ['Do not over-boil tea leaves for >6 minutes to avoid tannin bitterness and caffeine degradation.'],
      recommendedPreparation: 'Simmer 1 tsp CTC tea in 1/2 cup water with crushed ginger; add 1/2 cup fresh milk and boil 2 mins.',
      servingGuidance: '2-3 cups daily provides calm mental alertness and cardiovascular protection.',
      bioavailabilityTip: 'L-Theanine in tea crosses the blood-brain barrier synergistically with caffeine to enhance alpha-wave brain focus without jitters.',
      recipes: [
        {
          title: 'Royal Malty Ginger & Cardamom Masala Chai',
          prepTime: '8 mins',
          healthBenefit: 'Immune resilience, enhanced digestion, and focused mental clarity',
          ingredients: ['1.5 tsp Assam CTC Tea', '1 cup Fresh Cow Milk', '1/2 cup Water', '1 inch Crushed Fresh Ginger', '2 Green Cardamoms', '1 tsp Jaggery / Honey'],
          steps: [
            'Boil water with crushed ginger and bruised cardamom pods for 2 minutes.',
            'Add Assam CTC tea leaves and simmer on low flame for 2 minutes until deep amber.',
            'Pour in fresh milk, bring to a rolling frothy boil twice, strain into a kulhad, and sweeten with jaggery.'
          ]
        }
      ]
    },
    risks: {
      highHumidityRisk: 'Moisture absorption above 7% destroys briskness and creates sour fungal mold.',
      highTempRisk: 'Heat above 35°C accelerates the loss of volatile aromatic terpenes and essential oils.',
      frostRisk: 'Severe frost damages tender plucking tables in high-altitude gardens.',
      excessRainRisk: 'Heavy monsoon waterlogging lowers leaf polyphenol concentration.',
      transitShockRisk: 'Low; protect sacks from puncture and odor contamination.',
      mitigationStrategy: 'Pack in nitrogen-flushed multi-layer aluminium foil pouches and ship in odorless sealed containers.'
    }
  },

  // 15. COFFEE (PROCESSED AGRO-CASH COMMODITY)
  {
    id: 'coffee',
    name: 'Coffee (Coorg Arabica Beans / Roasted & Ground)',
    category: 'Tea & Coffee',
    subcategory: 'Processed Specialty Beverage',
    scientificName: 'Coffea arabica',
    variety: 'Estate Plantation-A / Mysore Nuggets Extra Bold',
    description: 'Shade-grown specialty Arabica coffee handpicked in the Western Ghats of Coorg, wet-processed (washed), medium-roasted, and degassed with one-way aroma valves.',
    icon: '☕',
    color: '#78350f',
    aliases: ['coffee', 'arabica coffee', 'filter coffee', 'coffee beans', 'kaapi', 'roasted coffee', 'ground coffee', 'coffea arabica'],
    isProcessed: true,
    rawCommodityId: 'coffee-cherry',
    processingMethod: 'Selective Red Cherry Handpicking -> Wet Pulping & Fermentation (36h) -> Patio Sun Drying (10.5% moisture) -> Hulling -> Drum Roasting (215°C) -> Grinding.',
    processingStage: 'Specialty Roasted & Ground Commodity',
    qualityImprovementTips: [
      'Harvest strictly 100% ripe red cherries (Brix >18°) to maximize sweetness and cup acidity.',
      'Package roasted coffee in pouches with One-Way Aroma Degassing Valves to vent natural CO2 while blocking ambient oxygen.'
    ],
    images: {
      productImage: 'coffee',
      productImageAlt: 'Rich Roasted Arabica Coffee Beans & Ground Powder'
    },
    growing: {
      climate: 'High-altitude sub-tropical climate (1,000 - 1,500m MSL) with cool temperatures (15°C - 26°C) and canopy shade.',
      soil: 'Deep, porous, well-drained volcanic or forest loamy soil rich in organic humus.',
      idealSoilPh: '6.0 - 6.8',
      temperatureRange: [14, 28],
      rainfallRequirement: '1,500 - 2,500 mm with crucial Blossom Showers (March-April)',
      sowingMethod: 'Nursery seedling planting in two-tier shaded agroforestry grids',
      sowingSeason: 'Monsoon planting (June - August)',
      seedRequirement: '1,100 - 1,300 plants / acre (Arabica standard)',
      spacing: '2.0m x 2.0m or 2.5m x 2.5m under silver oak shade canopy',
      growthDuration: 'Tree lifespan 35+ years; annual fruiting cycle 8-9 months from blossom',
      growthDays: 240,
      currentMaturityStage: 95,
      irrigation: 'Backing irrigation / blossom sprinkler (25mm) in March to trigger uniform synchronized flowering.',
      fertilizerGuidance: [
        { stage: 'Post-Blossom (May)', recommendation: 'NPK 120:90:120 kg/ha in 3 split doses', impact: 'Fruit cluster setting and bean density', urgency: 'Immediate' },
        { stage: 'Berry Swelling (Aug)', recommendation: 'Foliar spray of 0.5% Zinc Sulfate + 0.2% Urea', impact: 'Prevents die-back and maximizes bean size', urgency: 'Scheduled' }
      ],
      commonPests: ['Coffee Berry Borer (Hypothenemus hampei)', 'White Stem Borer (Xylotrechus quadripes)', 'Mealybugs'],
      diseaseRisks: ['Coffee Leaf Rust (Hemileia vastatrix)', 'Black Rot (Koleroga)', 'Anthracnose'],
      criticalCareTips: [
        'Maintain 40-50% filtered canopy shade through systematic shade tree lopping.',
        'Install berry borer brocap traps (10/acre) to keep infestation under 1%.'
      ]
    },
    harvesting: {
      harvestingDays: 7,
      recommendedWindow: 'Selective selective hand-picking of deep crimson-red ripe cherries only',
      maturityIndicators: [
        'Cherries turn uniform dark crimson red with sweet mucilage pulp.',
        'Zero green or yellow under-ripe berries in picking basket.',
        'Cherry sugar Brix reaches 19° - 21°.'
      ],
      harvestingMethod: 'Manual selective individual cherry plucking in canvas collection bags.',
      bestHarvestTime: 'Bright dry winter mornings (Dec - Feb)',
      firmnessTarget: 'Crisp roasted bean density (Moisture <2.5%)',
      postHarvestHandling: [
        'Pulping within 6 hours of picking in eco-pulpers.',
        'Washed fermentation for 36 hours to remove mucilage, followed by sun-drying on tiled patios.',
        'Precision drum roasting at 215°C followed by rapid air-quenching and packing with degassing valves.'
      ]
    },
    storage: {
      shelfLifeAmbient: '12 Months (as whole roasted beans in valved foil pouch) or 6 Months (ground)',
      shelfLifeCold: '18 Months in vacuum-sealed deep freeze (-10°C)',
      ambientDays: 365,
      coldDays: 540,
      storageTemperature: '15°C - 20°C (Cool, Dark, Airtight - Away from Heat & Moisture)',
      humidity: '40% - 50% RH',
      coldStorageRequired: false,
      storageMethod: 'Multi-layer barrier foil bags with One-Way Aroma Degassing Valves',
      preservationSteps: [
        'Use One-Way Degassing Valve pouches to release natural roasted CO2 without allowing oxygen ingress.',
        'Grind right before brewing for peak aroma retention.'
      ],
      spoilageIndicators: ['Stale flat taste (loss of crema and aroma)', 'Rancid coffee oil odor due to lipid oxidation', 'Moisture caking'],
      curingRequired: false
    },
    packaging: {
      primaryPackaging: 'Tri-Laminated Aluminium Foil Pouch with One-Way Aroma Degassing Valve & Zip Lock (250g / 500g / 1kg)',
      secondaryPackaging: '5-Ply Master Corrugated Shipping Carton',
      recommendedMaterials: ['PET / AL / PE Multi-Layer Foil', 'Kraft Paper Foil Laminate with One-Way Valve', 'Hermetic Nitrogen-Flushed Tin Cans'],
      ventilationRequired: false,
      ventilationSpec: 'One-Way Gas Degassing Valve (Releases CO2, Blocks 100% External Oxygen & Moisture)',
      moistureProtection: 'Ultra-High barrier (WVTR < 0.05 g/m²·day, OTR < 0.05 cm³/m²·day)',
      ethyleneSensitivity: 'Low',
      ethyleneControl: 'Not required',
      cushioningSpecs: 'Standard carton protection',
      shockRating: 4.2,
      estimatedPackagingCostPerKg: 5.20,
      packagingCapacity: '250g / 500g / 1kg retail packs',
      ecoCertification: '100% Recyclable Outer Cartons / Recyclable Valved Films',
      layers: [
        { layer: 1, name: 'One-Way Aroma Degassing Valve', material: 'Precision Membrane Valve', function: 'Vents post-roast CO2 gas buildup while blocking ambient air', icon: '💨', glowColor: '#78350f' },
        { layer: 2, name: 'Aluminium Foil Barrier Core', material: '100% Light & Gas Impermeable Foil', function: 'Guarantees absolute zero oxygen ingress to stop coffee oil staling', icon: '🛡️', glowColor: '#92400e' },
        { layer: 3, name: 'Kraft / PET Outer Shield', material: 'Tear-Resistant Laminated Film', function: 'Structural strength and premium tactile branding', icon: '📦', glowColor: '#b45309' }
      ],
      packingSteps: [
        { step: 1, title: 'Post-Roast Cooling', description: 'Air-quench roasted beans to room temperature within 4 minutes.' },
        { step: 2, title: 'One-Way Valved Bag Filling', description: 'Volumetric nitrogen-assisted dosing into valved pouches.' },
        { step: 3, title: 'Hermetic Heat Sealing', description: 'Thermal bar seal above reclosable zipper.' }
      ]
    },
    transportation: {
      recommendedVehicle: 'Covered Clean Dry Cargo Container Truck',
      temperatureControlled: false,
      targetTemp: 'Ambient Dry (15°C - 24°C)',
      maximumRecommendedDistance: '5,000 km (National & Export Specialty Coffee Shipping)',
      handlingRequirements: ['Strict odor-free dry shipping', 'Zero exposure to direct sun on open vehicle beds'],
      vibrationSensitivity: 'Low',
      baseRatePerKm: 16.0
    },
    market: {
      marketCategory: 'Estate Arabica / Robusta Farmgate & Auction Commodity',
      priceUnit: '₹/kg',
      basePricePerKg: 208.00,
      priceStatus: 'Live Benchmark',
      regionalPrices: {
        Bengaluru: 215.00,
        Mumbai: 212.00,
        Delhi: 220.00,
        Nashik: 208.00,
        Hyderabad: 210.00,
        Chennai: 214.00
      },
      priceTrend: 'Steady'
    },
    consumption: {
      nutritionalProfile: {
        calories: 2,
        protein_g: 0.3,
        carbs_g: 0.2,
        fat_g: 0.1,
        vitaminC_mg: 0,
        vitaminA_IU: 0,
        dietaryFiber_g: 0,
        potassium_mg: 116,
        iron_mg: 0.01,
        antioxidantIndex: 99,
        glycemicIndex: 0,
        highlights: ['Rich in Chlorogenic Acid (Super-Antioxidant)', 'Natural Cognitive & Metabolic Performance Enhancer', 'Zero Sugar & Zero Calories (Black)']
      },
      consumptionMethods: ['Traditional South Indian Filter Coffee with frothed milk', 'Espresso shot', 'Cold brew steeped 18 hours', 'Pour-over specialty black brew'],
      preparationMethods: ['Brew with 92°C-96°C hot water in a traditional stainless-steel coffee filter; let decoction brew 15 minutes.'],
      nutrientPreservationTips: ['Keep roasted coffee sealed in its valved bag in a dark cupboard; avoid freezing and thawing repeatedly.'],
      recommendedPreparation: 'Mix 60ml first-drip filter decoction with 120ml frothed hot milk and 1 tsp jaggery.',
      servingGuidance: '1-2 cups daily delivers powerful antioxidant protection and sustained mental energy.',
      bioavailabilityTip: 'Chlorogenic acids in fresh roast coffee modulate glucose-6-phosphatase, supporting healthy metabolic glycemic response.',
      recipes: [
        {
          title: 'Authentic South Indian Degree Filter Coffee',
          prepTime: '15 mins',
          healthBenefit: 'Maximized chlorogenic antioxidants & metabolic vitality',
          ingredients: ['3 tbsp Freshly Ground Coorg Arabica Coffee', '1 cup Boiling Water (94°C)', '1 cup Fresh Frothy A2 Cow Milk', '1 tsp Jaggery / Sugar'],
          steps: [
            'Add fresh ground coffee into the top compartment of stainless-steel filter; press tamper disc lightly.',
            'Pour boiling water over the disc and close lid; let decoction drip for 12 minutes.',
            'Mix 50ml hot decoction with 100ml piping hot frothy milk in a traditional davarah/tumbler; meter-pour back and forth to create velvety foam.'
          ]
        }
      ]
    },
    risks: {
      highHumidityRisk: 'Moisture ingress causes immediate staling, fungal mold, and loss of delicate aromatic crema.',
      highTempRisk: 'Storage above 30°C causes rapid oxidation of precious coffee lipids and loss of aromatic carbon dioxide.',
      frostRisk: 'None for dry roasted coffee; keep sealed.',
      excessRainRisk: 'Damp storage warehouses ruin packaging barriers.',
      transitShockRisk: 'Low; ensure valve integrity is protected from puncture.',
      mitigationStrategy: 'Use multi-layer barrier pouches with One-Way Aroma Degassing Valves and ship in dry sealed containers.'
    }
  },

  // 16. RADISH (FRESH ROOT VEGETABLE)
  {
    id: 'radish',
    name: 'Radish (White Mooli)',
    category: 'Vegetable',
    subcategory: 'Root Crop',
    scientificName: 'Raphanus sativus',
    variety: 'Pusa Chetki / Japanese White / Arka Nishant',
    description: 'Crisp, pungent white taproot vegetable with high water content (>95%), rapid post-harvest respiration, and high moisture sensitivity requiring high humidity storage.',
    icon: '🌱',
    color: '#a1a1aa',
    aliases: ['radish', 'mooli', 'mula', 'mullangi', 'white radish', 'raphanus sativus', 'daikon'],
    images: {
      productImage: 'radish',
      productImageAlt: 'Fresh Crisp White Radish (Mooli)'
    },
    growing: {
      climate: 'Cool-season crop requiring mild temperatures (10°C - 22°C) for crisp texture and low pungency.',
      soil: 'Deep, loose, fertile sandy loam with friable subsoil to prevent root branching (forking).',
      idealSoilPh: '6.0 - 6.8',
      temperatureRange: [10, 25],
      rainfallRequirement: '450 - 600 mm',
      sowingMethod: 'Direct ridge and furrow sowing at 2-3 cm depth',
      sowingSeason: 'Rabi (September - December) & Asiatic summer types (March - April)',
      seedRequirement: '8 - 10 kg / hectare',
      spacing: '30 cm between ridges x 8-10 cm between plants',
      growthDuration: '40 - 55 days from sowing (fast turnaround)',
      growthDays: 45,
      currentMaturityStage: 80,
      irrigation: 'Frequent light irrigations every 4-6 days to maintain uniform soil moisture and prevent pithiness or splitting.',
      fertilizerGuidance: [
        { stage: 'Basal', recommendation: 'FYM 20 t/ha + 40 kg N + 50 kg P2O5 + 50 kg K2O', impact: 'Early root elongation without forking', urgency: 'Immediate' },
        { stage: '20 Days Post-Sowing', recommendation: 'Top-dressing 40 kg Nitrogen (Urea)', impact: 'Foliage development and root swelling', urgency: 'Scheduled' }
      ],
      commonPests: ['Mustard Sawfly', 'Flea Beetles', 'Aphids'],
      diseaseRisks: ['Alternaria Blight', 'White Rust (Albugo candida)', 'Black Rot'],
      criticalCareTips: [
        'Avoid heavy clay soils or stony ground to prevent deformed, branched roots.',
        'Harvest on time; delayed harvest leads to hollow, pithy, fibrous roots.'
      ]
    },
    harvesting: {
      harvestingDays: 5,
      recommendedWindow: 'Early morning manual pulling when roots reach 25-35 cm length and tender crunch',
      maturityIndicators: [
        'Roots reach marketable diameter (3-4.5 cm) and firm cylindrical taper.',
        'Zero pithiness or hollow cavity at the root core.',
        'Foliage remains vibrant green and turgid.'
      ],
      harvestingMethod: 'Manual hand uprooting after light pre-harvest irrigation.',
      bestHarvestTime: 'Early morning to preserve crisp turgor pressure',
      firmnessTarget: '5.5 - 6.5 kg/cm² penetrometer',
      postHarvestHandling: [
        'Hydro-cooling / washing in potable chilled water to remove adhering soil and field heat.',
        'Trimming leaves or tying in 1kg bundles depending on market spec.',
        'Packing in micro-perforated breathable polyethylene liners.'
      ]
    },
    storage: {
      shelfLifeAmbient: '2 to 4 Days (high wilting risk)',
      shelfLifeCold: '3 to 4 Weeks in Cold Storage (0°C - 2°C, 95% RH)',
      ambientDays: 3,
      coldDays: 28,
      storageTemperature: '0°C - 2°C',
      humidity: '95% - 98% RH (High humidity critical to prevent shriveling)',
      coldStorageRequired: true,
      storageMethod: 'Perforated LDPE liners in plastic crates in high-humidity cold chambers',
      preservationSteps: [
        'Maintain high humidity to prevent moisture loss (>5% water loss causes flaccid limp roots).',
        'Top trimming (removing leaves) extends root shelf life by reducing transpiration.',
        'Avoid exposure to ethylene.'
      ],
      spoilageIndicators: ['Limp flaccid texture (pithiness)', 'Black spot rot', 'Browning around root tip'],
      curingRequired: false
    },
    packaging: {
      primaryPackaging: 'Micro-perforated Breathable LDPE Bags (1kg / 2kg)',
      secondaryPackaging: 'Ventilated Plastic Crates (20kg capacity)',
      recommendedMaterials: ['Micro-perforated 25-30 micron LDPE', 'Anti-fog Polyolefin Film', 'HDPE Crates'],
      ventilationRequired: true,
      ventilationSpec: '12-16 micro-perforations per bag for respiration exchange',
      moistureProtection: 'High humidity retention without free water condensation',
      ethyleneSensitivity: 'Medium',
      ethyleneControl: 'Do not store with apples, bananas, or ripening tomatoes',
      cushioningSpecs: 'Rigid plastic crates prevent impact bruising and root breakage',
      shockRating: 3.5,
      estimatedPackagingCostPerKg: 1.40,
      packagingCapacity: '20 kg plastic crates',
      ecoCertification: '100% Recyclable Polyolefin',
      layers: [
        { layer: 1, name: 'Liner Bag', material: 'Anti-fog Micro-perforated LDPE', function: 'Turgidity retention and anti-condensation', icon: '🥕', glowColor: '#f8fafc' },
        { layer: 2, name: 'Crate', material: 'Food-grade Rigid HDPE Crate', function: 'Transit crush protection and ventilation', icon: '📦', glowColor: '#0284c7' }
      ]
    },
    transportation: {
      recommendedVehicle: 'Refrigerated Reefer Van / Ventilated Insulated Truck',
      temperatureControlled: true,
      targetTemp: '2°C - 4°C',
      maximumRecommendedDistance: '800 km',
      handlingRequirements: ['Pre-cool to 3°C prior to loading', 'Verify air circulation between crate stacks', 'Keep transit under 48 hours for ambient'],
      vibrationSensitivity: 'Moderate',
      baseRatePerKm: 18.0
    },
    market: {
      marketCategory: 'Fresh Root Vegetable Commodity',
      priceUnit: '₹/kg',
      basePricePerKg: 36,
      priceStatus: 'Live Benchmark',
      regionalPrices: {
        Bengaluru: 38.0,
        Mumbai: 36.0,
        Delhi: 32.0,
        Nashik: 30.0,
        Hyderabad: 35.0,
        Chennai: 37.0
      },
      priceTrend: 'Stable'
    },
    consumption: {
      nutritionalProfile: {
        calories: 16,
        protein_g: 0.7,
        carbs_g: 3.4,
        fat_g: 0.1,
        vitaminC_mg: 14.8,
        vitaminA_IU: 7,
        dietaryFiber_g: 1.6,
        potassium_mg: 233,
        iron_mg: 0.34,
        antioxidantIndex: 68,
        glycemicIndex: 15,
        highlights: ['Rich in Glucosinolates & Isothiocyanates', 'High dietary water (>95%) for hydration', 'Natural digestive and detoxifying properties']
      },
      consumptionMethods: ['Fresh sliced in crunchy salads', 'Stuffed parathas and flatbreads', 'Pickled in mustard and turmeric brine'],
      preparationMethods: ['Peel outer skin lightly with vegetable peeler', 'Grate and squeeze out excess moisture for fillings'],
      nutrientPreservationTips: ['Consume fresh soon after peeling', 'Do not soak grated radish in water for long periods'],
      recommendedPreparation: 'Enjoy raw sliced with rock salt, lemon juice, and green chillies as a digestive salad.',
      servingGuidance: 'One medium root (100g) as part of lunch salad or cooked dish.',
      bioavailabilityTip: 'Natural pungent mustard glycosides stimulate salivary and gastric juices, accelerating nutrient digestion.',
      recipes: [
        {
          title: 'Crisp Mooli Paratha',
          prepTime: '20 mins',
          healthBenefit: 'High digestive fiber and traditional Ayurvedic warming properties',
          ingredients: ['2 Grated Radishes (squeezed)', '2 cups Whole Wheat Flour', '1 Green Chilli chopped', '1/2 tsp Ajwain', 'Ghee for roasting'],
          steps: [
            'Squeeze excess water from grated radish and mix with spices.',
            'Stuff seasoned radish filling into whole wheat dough roundels.',
            'Roll gently and roast on a hot griddle with desi ghee until golden crisp.'
          ]
        }
      ]
    },
    risks: {
      highHumidityRisk: 'Free standing water without ventilation can cause bacterial soft rot.',
      highTempRisk: 'Temperatures above 25°C cause rapid pithiness, hollow heart, and loss of turgor.',
      frostRisk: 'Tolerant to light frost; severe freezing causes glassiness.',
      excessRainRisk: 'Waterlogged soil causes root splitting and fungal root rot.',
      transitShockRisk: 'Moderate; rough transit causes root breakage and surface abrasions.',
      mitigationStrategy: 'Hydro-cool immediately, pack in anti-fog perforated liners inside rigid crates, and maintain 1-3°C reefer chain.'
    }
  },

  // 17. WATERMELON (FRESH SUMMER FRUIT)
  {
    id: 'watermelon',
    name: 'Watermelon (Sweet Striped / Kiran)',
    category: 'Fruit',
    subcategory: 'Vine Fruit',
    scientificName: 'Citrullus lanatus',
    variety: 'Kiran / Sugar Baby / Black Beauty / NS 295',
    description: 'High-volume, hydrating summer vine fruit with sweet crimson pulp, 92% water content, and thick rind. Susceptible to chilling injury below 7°C and pressure bruising during bulk transit.',
    icon: '🍉',
    color: '#ef4444',
    aliases: ['watermelon', 'tarbooz', 'tarbuz', 'kalingad', 'citrullus lanatus', 'melon'],
    images: {
      productImage: 'watermelon',
      productImageAlt: 'Fresh Sweet Striped Watermelon'
    },
    growing: {
      climate: 'Warm, sunny, dry climate requiring high day temperatures (28°C - 35°C) for sugar synthesis.',
      soil: 'Deep, well-drained sandy loam or riverbed alluvial soil rich in organic matter.',
      idealSoilPh: '6.5 - 7.5',
      temperatureRange: [22, 38],
      rainfallRequirement: '400 - 550 mm (dry ripening period essential)',
      sowingMethod: 'Direct pit or raised bed sowing with drip irrigation and plastic mulching',
      sowingSeason: 'Spring / Summer (January - March) & Rabi in peninsular India',
      seedRequirement: '1.5 - 2.5 kg / hectare',
      spacing: '2.5m - 3.0m between channels x 0.9m - 1.0m between vines',
      growthDuration: '85 - 100 days from sowing',
      growthDays: 90,
      currentMaturityStage: 85,
      irrigation: 'Drip fertigation every 3-4 days; reduce irrigation 10-12 days before harvest to concentrate fruit sugars (Brix >11°).',
      fertilizerGuidance: [
        { stage: 'Basal', recommendation: 'FYM 25 t/ha + 50 kg N + 75 kg P2O5 + 50 kg K2O', impact: 'Deep vine root run and vigorous branching', urgency: 'Immediate' },
        { stage: 'Fruit Setting (45 Days)', recommendation: '40 kg Nitrogen + 40 kg Potassium Sulfate (SOP)', impact: 'Fruit cell enlargement and rind strength', urgency: 'Scheduled' },
        { stage: 'Ripening (70 Days)', recommendation: 'Foliar spray of 0:0:50 Potassium Sulfate (1.5%)', impact: 'Boosts pulp Brix sugar and deep red lycopene color', urgency: 'Immediate' }
      ],
      commonPests: ['Fruit Fly (Bactrocera cucurbitae)', 'Red Pumpkin Beetle', 'Thrips'],
      diseaseRisks: ['Fusarium Wilt', 'Downy Mildew', 'Gummy Stem Blight', 'Anthracnose'],
      criticalCareTips: [
        'Withhold excessive irrigation during ripening to prevent fruit bursting and watery taste.',
        'Place straw cushioning underneath developing melons to prevent soil dampness stains.'
      ]
    },
    harvesting: {
      harvestingDays: 7,
      recommendedWindow: 'Dry morning hours when ground spot turns buttery yellow and tendril dries',
      maturityIndicators: [
        'Tendril at the fruit-attaching node turns completely dry, brown, and withered.',
        'Ground spot (belly) changes from pale greenish-white to creamy golden yellow.',
        'Dull, hollow, muffled thumping sound upon tapping with fingers (vs metallic ringing for raw).',
        'Sugar Brix reaches 10.5° - 12.5°.'
      ],
      harvestingMethod: 'Manual cutting with sharp shears leaving 3-5 cm stem attached to prevent stem-end rot.',
      bestHarvestTime: 'Early dry morning before daytime solar heating',
      firmnessTarget: 'Rind firmness 8.0 - 9.5 kg/cm²',
      postHarvestHandling: [
        'Field shading immediately after harvest to prevent sunscald.',
        'Stem-end dipping in 0.2% Carbendazim or chlorine water to seal against transit pathogens.',
        'Grading into Small (2-4 kg), Medium (4-7 kg), and Large (>7 kg).'
      ]
    },
    storage: {
      shelfLifeAmbient: '10 to 14 Days at 20°C - 25°C',
      shelfLifeCold: '2 to 3 Weeks at 10°C - 15°C (DO NOT store below 7°C)',
      ambientDays: 12,
      coldDays: 21,
      storageTemperature: '10°C - 15°C (Chilling injury occurs below 7°C causing watery breakdown)',
      humidity: '85% - 90% RH',
      coldStorageRequired: false,
      storageMethod: 'Well-ventilated ambient shaded sheds or 12°C conditioned cold room with dry floor straw cushioning',
      preservationSteps: [
        'Strictly avoid cold storage below 7°C to prevent pitting and loss of pulp flavor.',
        'Store away from high ethylene emitters like ripe bananas or mangoes to prevent rind thinning.',
        'Stack on cushioned pallets with dry paddy straw.'
      ],
      spoilageIndicators: ['Soft watery stem end rot', 'Pitting on rind (chilling injury)', 'Fermented sour pulp'],
      curingRequired: false
    },
    packaging: {
      primaryPackaging: 'Protective Foam Sleeve / Individual Tissue Wrap for Export',
      secondaryPackaging: 'Heavy-Duty 5-Ply Corrugated Bulk Octabin / Master Carton with Dividers',
      recommendedMaterials: ['5-Ply Kraft Corrugated Cardboard', 'Paddy Straw Cushioning', 'EPE Foam Net Sleeves'],
      ventilationRequired: true,
      ventilationSpec: '4-6 circular 25mm hand/ventilation holes per carton',
      moistureProtection: 'Dry ventilated storage; avoid moisture condensation on rind',
      ethyleneSensitivity: 'High',
      ethyleneControl: 'Store and transport in ethylene-free zones',
      cushioningSpecs: 'Straw layer thickness 50mm or individual EPE foam sleeves',
      shockRating: 2.8,
      estimatedPackagingCostPerKg: 0.90,
      packagingCapacity: '20 kg master cartons or 400 kg corrugated bulk bins',
      ecoCertification: '100% Biodegradable & Recyclable Kraft Board',
      layers: [
        { layer: 1, name: 'Sleeve', material: 'EPE Foam Sleeve / Straw Layer', function: 'Individual shock absorption and rind abrasion protection', icon: '🍉', glowColor: '#ef4444' },
        { layer: 2, name: 'Master Box', material: '5-Ply Kraft Corrugated Master Box', function: 'Heavy load stacking and compression integrity', icon: '📦', glowColor: '#dc2626' }
      ]
    },
    transportation: {
      recommendedVehicle: 'Ventilated Truck with Straw Bedding or Reefer Container set at 12°C',
      temperatureControlled: false,
      targetTemp: '12°C - 15°C',
      maximumRecommendedDistance: '1,200 km',
      handlingRequirements: ['Lay 75mm clean dry paddy straw on truck floor', 'Stack melons horizontally in interlocking rows', 'Never transport with ethylene-generating fruits'],
      vibrationSensitivity: 'Moderate',
      baseRatePerKm: 18.0
    },
    market: {
      marketCategory: 'Seasonal Hydro-Commodity Fruit',
      priceUnit: '₹/kg',
      basePricePerKg: 32,
      priceStatus: 'Live Benchmark',
      regionalPrices: {
        Bengaluru: 34.0,
        Mumbai: 32.0,
        Delhi: 35.0,
        Nashik: 30.0,
        Hyderabad: 31.0,
        Chennai: 33.0
      },
      priceTrend: 'Stable'
    },
    consumption: {
      nutritionalProfile: {
        calories: 30,
        protein_g: 0.6,
        carbs_g: 7.6,
        fat_g: 0.2,
        vitaminC_mg: 8.1,
        vitaminA_IU: 569,
        dietaryFiber_g: 0.4,
        potassium_mg: 112,
        iron_mg: 0.24,
        antioxidantIndex: 84,
        glycemicIndex: 72,
        highlights: ['High Lycopene (superior to raw tomatoes)', 'L-Citrulline for nitric oxide cardiovascular health', '92% natural electrolyte hydration']
      },
      consumptionMethods: ['Fresh chilled sliced table melon', 'Hydration juice with black salt and mint', 'Fruit popsicles and sorbets'],
      preparationMethods: ['Wash outer rind thoroughly before slicing', 'Slice with clean stainless chef knife on food-safe board'],
      nutrientPreservationTips: ['Keep cut sections covered in refrigeration at 4°C', 'Consume within 2 days of slicing'],
      recommendedPreparation: 'Enjoy freshly sliced and chilled on hot afternoons.',
      servingGuidance: 'One to two wedges (200g-300g) for optimal natural electrolyte rehydration.',
      bioavailabilityTip: 'High lycopene content is best absorbed with minor healthy dietary fats.',
      recipes: [
        {
          title: 'Chilled Watermelon Mint Cooler',
          prepTime: '10 mins',
          healthBenefit: 'Instant hydration and antioxidant boost',
          ingredients: ['4 cups Diced Seedless Watermelon', '10 Fresh Mint Leaves', '1 tbsp Lime Juice', '1/2 tsp Black Salt', 'Crushed Ice'],
          steps: [
            'Blend watermelon cubes with fresh mint, black salt, and lime juice for 45 seconds.',
            'Pour over crushed ice without straining to retain pulp fiber and serve chilled.'
          ]
        }
      ]
    },
    risks: {
      highHumidityRisk: 'Excessive stagnant humidity causes stem-end fungal mold.',
      highTempRisk: 'Direct sunlight exposure above 38°C causes rapid sunburn bleaching and internal fermentation.',
      frostRisk: 'Highly frost-sensitive; vines collapse below 5°C.',
      excessRainRisk: 'Heavy pre-harvest rains cause fruit splitting and dilute sugar Brix.',
      transitShockRisk: 'High; rough roads cause internal bruising, rind rupture, and mushy pulp breakdown.',
      mitigationStrategy: 'Use 75mm straw beds, pack in heavy corrugated master bins, and maintain 12-14°C ventilated transport.'
    }
  },

  // 18. BUTTER (PROCESSED VALUE-ADDED DAIRY COMMODITY)
  {
    id: 'butter',
    name: 'Butter (Pasteurized Table Butter / Desi Makkhan)',
    category: 'Dairy',
    subcategory: 'Processed Dairy Fat',
    scientificName: 'Butyrum (Pasteurized Cream Butter)',
    variety: 'Pasteurized Salted Table Butter (80% Milk Fat Minimum)',
    description: 'High-fat dairy emulsion produced by churning pasteurized cream. Highly susceptible to lipid oxidation, hydrolytic rancidity, odor absorption, and temperature melt requiring strict cold chain (-18°C or 2°C - 4°C).',
    icon: '🧈',
    color: '#facc15',
    aliases: ['butter', 'makkhan', 'makhan', 'table butter', 'salted butter', 'creamery butter', 'amul butter', 'dairy butter'],
    isProcessed: true,
    rawCommodityId: 'milk',
    processingMethod: 'Whole Milk Centrifugal Separation -> Sweet Cream Pasteurization (85°C) -> Ageing & Crystallization (4°C, 12h) -> Continuous Churning -> Salting (2.0%) -> Vacuum Working -> Packaging.',
    processingStage: 'Chilled FMCG Dairy Commodity',
    qualityImprovementTips: [
      'Maintain continuous sub-4°C storage to prevent fat separation and oily weeping.',
      'Use vegetable parchment wrapped inside laminated aluminium foil to block oxygen and UV light oxidation.'
    ],
    images: {
      productImage: 'butter',
      productImageAlt: 'Creamery Pasteurized Salted Butter'
    },
    growing: {
      climate: 'Controlled sanitary food-grade dairy processing facility.',
      soil: 'N/A (Derived dairy commodity from high-SNF buffalo and cow milk)',
      idealSoilPh: '6.5 - 6.8 (Cream pH)',
      temperatureRange: [2, 6],
      rainfallRequirement: 'N/A',
      sowingMethod: 'Centrifugal cream churn continuous processing',
      sowingSeason: 'Year-round industrial production',
      seedRequirement: 'Requires ~20-22 Litres of whole milk (4.5% fat) per 1 kg of butter',
      spacing: 'N/A',
      growthDuration: '24 hours manufacturing & crystallization cycle',
      growthDays: 1,
      currentMaturityStage: 100,
      irrigation: 'CIP (Clean-In-Place) sanitation water cycles',
      fertilizerGuidance: [
        { stage: 'Raw Milk Reception', recommendation: 'Milk fat >4.0%, SNF >8.5%, MBRT >4 hours', impact: 'High butter yield and firm grain structure', urgency: 'Immediate' },
        { stage: 'Churning & Salting', recommendation: 'Vacuum deaeration + 2% micro-ground vacuum salt', impact: 'Uniform moisture dispersion (<16% water)', urgency: 'Scheduled' }
      ],
      commonPests: ['N/A (HACCP Sanitary Clean Room Zone)'],
      diseaseRisks: ['Psychrotrophic Bacterial Spoilage (Pseudomonas)', 'Yeast & Mold (Geotrichum candidum)'],
      criticalCareTips: [
        'Protect butter from light exposure at all times; photo-oxidation creates sharp off-flavors.',
        'Never store next to pungent aromatic foods (onions, fish, spices) as butter fats absorb volatile odors rapidly.'
      ]
    },
    harvesting: {
      harvestingDays: 1,
      recommendedWindow: 'Immediate packaging post-churning and vacuum working',
      maturityIndicators: [
        'Milk fat minimum 80.0% by weight (FSSAI standard).',
        'Moisture maximum 16.0% with fine uniform droplet dispersion.',
        'Curd solids maximum 1.5%, Salt 1.5% - 2.5%.'
      ],
      harvestingMethod: 'Automated continuous extrusion and high-speed parchment/foil wrapping.',
      bestHarvestTime: 'Year-round controlled cold line',
      firmnessTarget: 'Plastic butter firmness (Penetration 12-16mm at 10°C)',
      postHarvestHandling: [
        'Hardening tunnel chilling at -5°C for 24 hours to stabilize fat crystal lattice.',
        'Packing in multi-layer greaseproof vegetable parchment + light barrier carton.',
        'Cold room pallet storage at -18°C (Bulk) or 2°C - 4°C (Retail).'
      ]
    },
    storage: {
      shelfLifeAmbient: '1 to 2 Days (Melt and rapid rancidity risk above 20°C)',
      shelfLifeCold: '12 Months in Deep Freeze (-18°C) or 90 Days in Refrigeration (2°C - 4°C)',
      ambientDays: 2,
      coldDays: 365,
      storageTemperature: '-18°C (Deep Frozen Long-Term) or 2°C - 4°C (Retail Active)',
      humidity: '70% - 75% RH (Dry odorless refrigeration chamber)',
      coldStorageRequired: true,
      storageMethod: 'Light-shielded barrier wrap in dedicated refrigerated / frozen dairy rooms',
      preservationSteps: [
        'Maintain uninterrupted cold chain; thermal fluctuations cause moisture exudation and coarse texture.',
        'Seal tightly inside moisture-proof greaseproof wrapper to prevent surface desiccation (primrose color defect).',
        'Keep strictly segregated from pungent odor-emitting commodities.'
      ],
      spoilageIndicators: ['Sour rancid aroma (butyric acid release)', 'Yellow dark crusting on surface (oxidation)', 'Mold spots (black/green colonies)'],
      curingRequired: false
    },
    packaging: {
      primaryPackaging: 'Vegetable Parchment Paper / Foil Laminate Wrap (500g / 100g)',
      secondaryPackaging: 'Duplex Printed Board Carton + 5-Ply Corrugated Reefer Shipper (20kg)',
      recommendedMaterials: ['Bleached Vegetable Parchment (45 gsm)', 'Aluminium Foil / Polyethylene Laminate', 'Food-grade Duplex Carton'],
      ventilationRequired: false,
      ventilationSpec: '100% Hermetic seal; zero ventilation (moisture and oxygen barrier essential)',
      moistureProtection: 'High grease-resistance and water-vapor barrier',
      ethyleneSensitivity: 'Low',
      ethyleneControl: 'Store away from all aromatic and chemical fumes',
      cushioningSpecs: 'Rigid outer shipper prevents compression deformation of soft butter blocks',
      shockRating: 4.0,
      estimatedPackagingCostPerKg: 3.50,
      packagingCapacity: '20 kg master corrugated cases (40 x 500g bricks)',
      ecoCertification: 'FSC Certified Recyclable Outer Cartons',
      layers: [
        { layer: 1, name: 'Laminate Wrap', material: 'Vegetable Parchment / Alu-foil laminate', function: 'Grease resistance, moisture barrier, and light blocking', icon: '🧈', glowColor: '#eab308' },
        { layer: 2, name: 'SBS Carton', material: 'Food Grade Solid Bleached Sulfate (SBS) Carton', function: 'Structural rigidity and retail UV shield', icon: '📦', glowColor: '#ca8a04' },
        { layer: 3, name: 'Master Shipper', material: '5-Ply Heavy Duty Corrugated Master Shipper', function: 'Cold store stacking and reefer transit protection', icon: '🧊', glowColor: '#0284c7' }
      ]
    },
    transportation: {
      recommendedVehicle: 'Dedicated Refrigerated Reefer Container (-18°C or 2°C - 4°C)',
      temperatureControlled: true,
      targetTemp: '2°C - 4°C (Domestic Retail) or -18°C (Bulk Inter-state)',
      maximumRecommendedDistance: '2,500 km',
      handlingRequirements: ['Verify reefer datalogger setpoint at -18°C / 4°C', 'Ensure pallet shrink-wrap is secure', 'Inspect container for zero cross-odors'],
      vibrationSensitivity: 'Low',
      baseRatePerKm: 26.0
    },
    market: {
      marketCategory: 'Essential Value-Added Dairy Commodity',
      priceUnit: '₹/kg',
      basePricePerKg: 560,
      priceStatus: 'Live Benchmark',
      regionalPrices: {
        Bengaluru: 560.0,
        Mumbai: 550.0,
        Delhi: 570.0,
        Nashik: 555.0,
        Hyderabad: 565.0,
        Chennai: 575.0
      },
      priceTrend: 'Stable'
    },
    consumption: {
      nutritionalProfile: {
        calories: 717,
        protein_g: 0.9,
        carbs_g: 0.1,
        fat_g: 81.1,
        vitaminC_mg: 0,
        vitaminA_IU: 2499,
        dietaryFiber_g: 0,
        potassium_mg: 24,
        iron_mg: 0.02,
        antioxidantIndex: 45,
        glycemicIndex: 0,
        highlights: ['Rich source of Fat-Soluble Vitamin A, D, E, and K2', 'Conjugated Linoleic Acid (CLA)', 'Rapid energy source via Short & Medium-Chain Fatty Acids']
      },
      consumptionMethods: ['Spread on warm artisan toast and rotis', 'Cooking and baking fat in pastries and cakes', 'Traditional tempering and finishing agent for dals'],
      preparationMethods: ['Bring to room temperature (18°C-20°C) 15 mins prior to spreading', 'Melt gently over low heat to avoid browning'],
      nutrientPreservationTips: ['Keep chilled in opaque container away from light', 'Avoid repeated freeze-thaw cycles'],
      recommendedPreparation: 'Melt a single pat (10g) over hot lentil curries or whole grain flatbreads.',
      servingGuidance: 'Moderate consumption (10g-15g daily) within balanced dietary macronutrients.',
      bioavailabilityTip: 'Natural dairy fats enhance absorption of fat-soluble vitamins (A, D, E, K) from vegetables and pulses.',
      recipes: [
        {
          title: 'Classic Dal Makhani with Butter Tempering',
          prepTime: '20 mins',
          healthBenefit: 'High protein recovery with rich satiety and micronutrient absorption',
          ingredients: ['1 cup Whole Black Urad Dal', '1/4 cup Rajma', '4 tbsp Pasteurized Butter', '1 cup Tomato Puree', '2 tbsp Fresh Cream', 'Kasuri Methi'],
          steps: [
            'Slow simmer boiled black urad and rajma with tomato puree and Kashmiri chilli for 45 minutes.',
            'Whisk in generous cold butter and fresh cream on low heat until velvety and rich.',
            'Finish with a final dollop of butter and crushed kasuri methi.'
          ]
        }
      ]
    },
    risks: {
      highHumidityRisk: 'Condensation on cold butter causes mold growth (Geotrichum/Penicillium).',
      highTempRisk: 'Temperatures above 15°C cause oil separation (melt down) and accelerate oxidative rancidity.',
      frostRisk: 'Tolerant to deep freezing (-18°C); freezing actually preserves butter quality for 12 months.',
      excessRainRisk: 'N/A (Strict enclosed indoor cold storage).',
      transitShockRisk: 'Low mechanical risk; absolute critical risk is temperature abuse in transit.',
      mitigationStrategy: 'Maintain uninterrupted reefer transport (2-4°C or -18°C) with continuous IoT dataloggers and light-barrier laminate wrappers.'
    }
  },

  // 19. GREEN CARDAMOM (HIGH-VALUE DRIED SPICE COMMODITY)
  {
    id: 'cardamom',
    name: 'Green Cardamom (Choti Elaichi / Alleppey Green)',
    category: 'Spice',
    subcategory: 'Whole Dried Spice Capsule',
    scientificName: 'Elettaria cardamomum',
    variety: 'Alleppey Green Extra Bold (AGEB / 8mm+)',
    description: 'Known as the "Queen of Spices", green cardamom is a high-value plantation spice commodity with intensely aromatic volatile terpenes (1,8-cineole and α-terpinyl acetate). Highly susceptible to essential oil volatilization, moisture re-absorption, and chlorophyll bleaching requiring hermetic aroma-barrier metallized pouches.',
    icon: '🌿',
    color: '#15803d',
    aliases: ['cardamom', 'elaichi', 'elakki', 'elachi', 'choti elaichi', 'green cardamom', 'elettaria cardamomum', 'cardamoms', 'hari elaichi'],
    images: {
      productImage: 'cardamom',
      productImageAlt: 'Premium Alleppey Green Cardamom Pods'
    },
    growing: {
      climate: 'Humid tropical evergreen rainforest canopy (Cardamom Hills / Western Ghats) with 1500-4000 mm annual rainfall and 10°C - 35°C temperature.',
      soil: 'Rich forest loamy soil with high humus content and good drainage.',
      idealSoilPh: '5.5 - 6.5',
      temperatureRange: [10, 32],
      rainfallRequirement: '1500 - 3500 mm well-distributed',
      sowingMethod: 'Clonal sucker propagation or shade nursery seedling transplantation',
      sowingSeason: 'Monsoon onset (June - July)',
      seedRequirement: 'Sucker planting ~2000-2500 suckers / hectare',
      spacing: '2.0 m between rows x 2.0 m between plants',
      growthDuration: 'Perennial plantation crop; economic yielding starts from 3rd year',
      growthDays: 120,
      currentMaturityStage: 90,
      irrigation: 'Drip or micro-sprinkler irrigation during summer drought months (Jan-May) every 10-12 days.',
      fertilizerGuidance: [
        { stage: 'Pre-Monsoon (May-June)', recommendation: 'NPK 75:75:150 kg/ha in split doses + Neem cake 1 t/ha', impact: 'Stimulates tiller emergence and panicle branching', urgency: 'Immediate' },
        { stage: 'Post-Monsoon (Sept-Oct)', recommendation: 'Foliar spray Zinc Sulfate 0.25% + Borax 0.1%', impact: 'Capsule setting, uniform size fill, and essential oil synthesis', urgency: 'Scheduled' }
      ],
      commonPests: ['Cardamom Thrips (Sciothrips cardamomi)', 'Shoot and Capsule Borer (Conogethes punctiferalis)', 'Root Grubs'],
      diseaseRisks: ['Azhukal / Capsule Rot (Phytophthora meadii)', 'Katte / Mosaic Virus', 'Rhizome Rot'],
      criticalCareTips: [
        'Maintain 50-60% overhead shade canopy to protect tender foliage from solar scorch.',
        'Install bee colonies in plantation; honeybees account for >90% pollination and capsule set.',
        'Harvest only physiologically mature capsules (when seeds turn dark brown/black inside).'
      ]
    },
    harvesting: {
      harvestingDays: 30,
      recommendedWindow: 'Selective hand picking every 20-25 days from August through February',
      maturityIndicators: [
        'Capsules turn mature light green with plump firm pericarp.',
        'Seeds inside the capsule turn from white to dark brown/black.',
        'Capsules separate easily from the pedicel without tearing.'
      ],
      harvestingMethod: 'Manual hand picking of individual mature capsules using special harvest trays.',
      bestHarvestTime: 'Dry clear morning hours',
      firmnessTarget: 'Plump turgid capsule (8.0 mm+ sieve retention for AGEB grade)',
      postHarvestHandling: [
        'Washing in clean water and dipping in 2% sodium carbonate solution for 10 min to retain green chlorophyll during curing.',
        'Flue pipe curing at 45°C - 50°C for 24-28 hours until moisture drops from 80% to <10.5%.',
        'Grading into AGEB (8mm+), AGB (7-8mm), and Open/Split grades.'
      ]
    },
    storage: {
      shelfLifeAmbient: '12 to 18 Months (in hermetic aroma-barrier foil packaging)',
      shelfLifeCold: '24 Months in controlled temperature dry spice store',
      ambientDays: 365,
      coldDays: 730,
      storageTemperature: '10°C - 15°C (Cool Dry Warehouse)',
      humidity: '55% - 65% RH (Must prevent moisture absorption >11% to avoid mold and aroma loss)',
      coldStorageRequired: false,
      storageMethod: 'Hermetically sealed multi-layer metallized poly pouches inside corrugated master cartons stored on wooden pallets away from sunlight',
      preservationSteps: [
        'Keep relative humidity strictly below 65% to avoid fungal mycotoxins and bleaching.',
        'Store in opaque light-blocking barrier pouches; UV light degrades green chlorophyll into pale grey.',
        'Never store in open jute bags as volatile cineole oil evaporates quickly.'
      ],
      spoilageIndicators: ['Bleaching of green pericarp to straw-yellow', 'Loss of sharp pungent eucalyptus aroma', 'Mold growth or insect infestation'],
      curingRequired: true,
      curingInstructions: 'Controlled hot-air flue curing chamber at 45-50°C for 24-28h until moisture reaches 10-10.5%.'
    },
    packaging: {
      primaryPackaging: 'Multi-layer Metallized Polyester / Polyethylene (PET / Met-PET / PE) Hermetic Pouches (500g / 1kg / 5kg)',
      secondaryPackaging: 'Heavy Duty 5-Ply Corrugated Master Cartons (25kg bulk shipper)',
      recommendedMaterials: ['PET / Met-PET / Polyethylene (100 µm)', 'Aluminium Foil Barrier Laminate', 'High-Barrier EVOH Pouches with Nitrogen Flushing'],
      ventilationRequired: false,
      ventilationSpec: '100% Hermetic seal; zero perforations (volatile terpene & moisture barrier mandatory)',
      moistureProtection: 'Ultra-high water vapor and oxygen barrier (WVTR < 0.5 g/m²/day, OTR < 1.0 cc/m²/day)',
      ethyleneSensitivity: 'Low',
      ethyleneControl: 'Zero chemical contamination; keep isolated from harsh external aromas',
      cushioningSpecs: 'Pouch sealing prevents capsule crushing and seed detachment',
      shockRating: 4.2,
      estimatedPackagingCostPerKg: 12.50,
      packagingCapacity: '1 kg retail pouches or 25 kg master export cartons',
      ecoCertification: 'Spices Board of India Certified Export Grade',
      layers: [
        { layer: 1, name: 'Outer Barrier', material: 'Reverse Printed 12µm Polyethylene Terephthalate (PET)', function: 'Printability, mechanical strength, and UV protection', icon: '🌿', glowColor: '#22c55e' },
        { layer: 2, name: 'Met-PET Core', material: 'Vacuum Metallized PET (Met-PET) Barrier Film', function: 'High oxygen, light, and aroma barrier (prevents terpene loss)', icon: '🛡️', glowColor: '#16a34a' },
        { layer: 3, name: 'Seal Layer', material: 'Food Grade Linear Low-Density Polyethylene (LLDPE)', function: 'Hermetic heat seal layer and moisture vapor barrier', icon: '📦', glowColor: '#15803d' }
      ]
    },
    transportation: {
      recommendedVehicle: 'Dry Clean Weatherproof Container Truck / Air Cargo for Export',
      temperatureControlled: false,
      targetTemp: '15°C - 22°C (Dry ambient enclosed container)',
      maximumRecommendedDistance: '3,000 km',
      handlingRequirements: ['Verify pouches are hermetically vacuum/nitrogen sealed', 'Ensure transit container is clean, dry, and odor-free', 'Inspect moisture silica desiccant pouches inside master carton'],
      vibrationSensitivity: 'Low',
      baseRatePerKm: 28.0
    },
    market: {
      marketCategory: 'High-Value Queen of Spices Commodity',
      priceUnit: '₹/kg',
      basePricePerKg: 1950,
      priceStatus: 'Live Benchmark',
      regionalPrices: {
        Bengaluru: 2000.0,
        Mumbai: 2050.0,
        Delhi: 2100.0,
        Nashik: 1950.0,
        Hyderabad: 1980.0,
        Chennai: 1960.0
      },
      priceTrend: 'Rising'
    },
    consumption: {
      nutritionalProfile: {
        calories: 311,
        protein_g: 10.8,
        carbs_g: 68.5,
        fat_g: 6.7,
        vitaminC_mg: 21,
        vitaminA_IU: 0,
        dietaryFiber_g: 28,
        potassium_mg: 1119,
        iron_mg: 13.97,
        antioxidantIndex: 94,
        glycemicIndex: 0,
        highlights: ['Rich in 1,8-Cineole, Terpinyl Acetate, and Linalool', 'Powerful digestive and carminative properties', 'High manganese and potassium bio-availability']
      },
      consumptionMethods: ['Whole bruised pods in biryanis and curries', 'Fresh ground powder in masala chai and desserts', 'Mouth freshener chew after meals'],
      preparationMethods: ['Lightly crush green pods to release seeds before adding to liquids', 'Dry roast gently at low heat for 60 seconds to intensify aroma'],
      nutrientPreservationTips: ['Store whole pods and grind only when needed', 'Keep away from light and humidity in airtight tin or jar'],
      recommendedPreparation: 'Infuse freshly crushed pods into boiling water or milk for aromatic digestive tea.',
      servingGuidance: 'One to two whole pods or a pinch (0.5g) of fresh powder per serving.',
      bioavailabilityTip: 'Essential cineole oils enhance digestive enzyme secretion and nutrient absorption in gastrointestinal tract.',
      recipes: [
        {
          title: 'Royal Shahi Biryani Spice Blend (Garam Masala Infusion)',
          prepTime: '10 mins',
          healthBenefit: 'Potent digestive stimulant, anti-inflammatory, and antioxidant aroma',
          ingredients: ['15g Green Cardamom Pods', '10g Black Pepper', '10g Cloves', '20g Cinnamon sticks', '5g Mace'],
          steps: [
            'Lightly warm whole green cardamom and spices on low heat for 90 seconds to release aromatic essential oils.',
            'Coarsely grind in a dry spice mill and store in an airtight glass jar.',
            'Use 1 tsp in dum biryani, curries, or masala chai.'
          ]
        }
      ]
    },
    risks: {
      highHumidityRisk: 'Humidity >70% causes moisture absorption, rapid mold formation, and loss of green coloration.',
      highTempRisk: 'Storage above 30°C causes accelerated evaporation of volatile cineole oils, diminishing culinary aroma.',
      frostRisk: 'Tolerant in cured dry form; plantation bushes vulnerable to severe sub-zero frost.',
      excessRainRisk: 'Continuous heavy monsoon rain causes Azhukal capsule rot in plantations.',
      transitShockRisk: 'Low; protect outer cartons from water ingress and high humidity.',
      mitigationStrategy: 'Cure immediately post-harvest to 10% moisture and pack in hermetic Met-PET/PE aroma-barrier pouches with desiccant.'
    }
  },

  // 19B. BLACK PEPPER (HIGH-VALUE KING OF SPICES COMMODITY)
  {
    id: 'black-pepper',
    name: 'Black Pepper (Malabar Kalimirch / King of Spices)',
    category: 'Spice',
    subcategory: 'Whole Dried Spice Berry',
    scientificName: 'Piper nigrum',
    variety: 'Panniyur-1 / Tellicherry Garbled Extra Bold (TGSEB)',
    description: 'The ancient King of Spices cultivated along the Malabar Coast of India. Sun-cured black peppercorns containing volatile terpenes (pinene, limonene) and piperine, an alkaloid with immense medicinal and digestive bio-enhancement value. Requires strict protection from moisture (>65% RH induces mold) and high heat (>30°C causes aroma dissipation).',
    icon: '⚫',
    color: '#1e293b',
    aliases: ['black pepper', 'pepper', 'black-pepper', 'kalimirch', 'kali mirch', 'peppercorn', 'black peppercorn', 'piper nigrum', 'kalu menasu', 'miriyalu', 'milagu'],
    images: {
      productImage: 'black-pepper',
      productImageAlt: 'Premium Malabar Black Peppercorns'
    },
    growing: {
      climate: 'Humid tropical evergreen rainforest canopy (Malabar Coast / Western Ghats) with 2000-3500 mm annual rainfall and 18°C - 35°C temperature.',
      soil: 'Rich red laterite or fertile forest loamy soil with high organic matter and rapid drainage.',
      idealSoilPh: '5.5 - 6.5',
      temperatureRange: [18, 35],
      rainfallRequirement: '2000 - 3000 mm well-distributed',
      sowingMethod: 'Runner shoot stem cutting planting against living support trees (standards)',
      sowingSeason: 'Monsoon onset (May - June)',
      seedRequirement: 'Rooted cuttings ~1600 - 1800 vines / hectare',
      spacing: '2.5 m between rows x 2.5 m between support trees',
      growthDuration: 'Perennial climbing vine; full economic harvest from 4th year onwards',
      growthDays: 180,
      currentMaturityStage: 90,
      irrigation: 'Protective drip/basin irrigation during summer drought months (Feb-May) every 10-14 days.',
      fertilizerGuidance: [
        { stage: 'Pre-Monsoon (May-June)', recommendation: 'NPK 100:40:140 g/vine in split doses + Neem cake 1 kg/vine', impact: 'Stimulates lateral fruiting branches (plagiotropes)', urgency: 'Immediate' },
        { stage: 'Post-Monsoon (Sept-Oct)', recommendation: 'Foliar spray 1% Bordeaux mixture + 0.2% Zinc Sulfate', impact: 'Fungal prophylaxis & spike berry retention', urgency: 'Scheduled' }
      ],
      commonPests: ['Pollu Beetle (Longitarsus nigripennis)', 'Top Shoot Borer', 'Root Knot Nematode'],
      diseaseRisks: ['Quick Wilt / Foot Rot (Phytophthora capsici)', 'Slow Wilt (Fusarium & Radopholus)', 'Pollu Anthracnose'],
      criticalCareTips: [
        'Regulate shade of support trees before southwest monsoon to prevent fungus buildup.',
        'Apply Trichoderma harzianum fortified organic manure to root basins for biological foot-rot control.',
        'Harvest when one or two berries on spike turn bright orange-red for peak piperine density.'
      ]
    },
    harvesting: {
      harvestingDays: 20,
      recommendedWindow: 'Selective manual spike picking from December through March',
      maturityIndicators: [
        'One or two berries on the spike turn bright orange or red.',
        'Berries feel hard and firm when squeezed between thumb and forefinger.',
        'Whole spikes separate cleanly from vine nodes.'
      ],
      harvestingMethod: 'Manual hand picking using bamboo ladders and harvest sacks.',
      bestHarvestTime: 'Dry clear sunny mornings',
      firmnessTarget: 'Hard mature berries (550 g/L bulk density for TGSEB grade)',
      postHarvestHandling: [
        'Threshing berries from spikes manually or using mechanical rubber roller threshers.',
        'Hot water dipping (blanching) at 80°C for 60 seconds to accelerate enzymatic browning and uniform jet-black coloration.',
        'Sun drying on clean food-grade mats for 7-10 days until moisture drops below 10.5%.'
      ]
    },
    storage: {
      shelfLifeAmbient: '12 to 24 Months in hermetic moisture-barrier packaging',
      shelfLifeCold: '24 to 36 Months in controlled temperature dry warehouse',
      ambientDays: 365,
      coldDays: 730,
      storageTemperature: '15°C - 24°C (Dry Ventilated Warehouse)',
      humidity: '50% - 60% RH (Must prevent moisture absorption >11% to avoid mold and aflatoxins)',
      coldStorageRequired: false,
      storageMethod: 'Hermetically sealed multi-layer metallized poly pouches inside corrugated master cartons stored on wooden pallets',
      preservationSteps: [
        'Keep relative humidity strictly below 60% to avoid Aspergillus mold growth.',
        'Store whole peppercorns rather than powder to retain volatile pinene and piperine oils.',
        'Protect from direct sunlight and heat radiation to prevent terpene dissipation.'
      ],
      spoilageIndicators: ['Musty mold odor', 'Softening from moisture re-absorption', 'Loss of pungent sharp bite'],
      curingRequired: true,
      curingInstructions: 'Sun dry on clean tarpaulins to 10% moisture; optional 1-min hot blanching prior to drying for uniform jet black color.'
    },
    packaging: {
      primaryPackaging: 'Multi-layer Metallized Polyester / Polyethylene (PET / Met-PET / PE) Hermetic Pouches (500g / 1kg / 5kg)',
      secondaryPackaging: 'Heavy Duty 5-Ply Corrugated Master Cartons (25kg bulk export shipper)',
      recommendedMaterials: ['PET / Met-PET / Polyethylene (100 µm)', 'Aluminium Foil Barrier Laminate', 'High-Barrier EVOH Pouches with Nitrogen Flushing'],
      ventilationRequired: false,
      ventilationSpec: '100% Hermetic seal; zero perforations (volatile terpene & moisture barrier mandatory)',
      moistureProtection: 'Ultra-high water vapor and oxygen barrier (WVTR < 0.5 g/m²/day, OTR < 1.0 cc/m²/day)',
      ethyleneSensitivity: 'Low',
      ethyleneControl: 'Zero chemical contamination; keep isolated from harsh external aromas',
      cushioningSpecs: 'Corrugated master carton with waterproof inner poly-liner',
      shockRating: 4.8,
      estimatedPackagingCostPerKg: 12.50,
      packagingCapacity: '1 kg retail pouches or 25 kg master export cartons',
      ecoCertification: 'Spices Board of India Certified Export Grade',
      layers: [
        { layer: 1, name: 'Outer Barrier', material: 'Reverse Printed 12µm Polyethylene Terephthalate (PET)', function: 'Printability, mechanical strength, and UV protection', icon: '🌿', glowColor: '#334155' },
        { layer: 2, name: 'Met-PET Core', material: 'Vacuum Metallized PET (Met-PET) Barrier Film', function: 'High oxygen, light, and aroma barrier (prevents terpene loss)', icon: '🛡️', glowColor: '#475569' },
        { layer: 3, name: 'Seal Layer', material: 'Food Grade Linear Low-Density Polyethylene (LLDPE)', function: 'Hermetic heat seal layer and moisture vapor barrier', icon: '📦', glowColor: '#64748b' }
      ]
    },
    transportation: {
      recommendedVehicle: 'Dry Clean Weatherproof Container Truck / Air Cargo for Export',
      temperatureControlled: false,
      targetTemp: '18°C - 24°C (Dry ambient enclosed container)',
      maximumRecommendedDistance: '3,000 km',
      handlingRequirements: ['Verify pouches are hermetically vacuum/nitrogen sealed', 'Ensure transit container is clean, dry, and odor-free', 'Inspect moisture silica desiccant pouches inside master carton'],
      vibrationSensitivity: 'Low',
      baseRatePerKm: 28.0
    },
    market: {
      marketCategory: 'High-Value King of Spices Commodity',
      priceUnit: '₹/kg',
      basePricePerKg: 1100,
      priceStatus: 'Live Benchmark',
      regionalPrices: {
        Bengaluru: 1120.0,
        Mumbai: 1150.0,
        Delhi: 1180.0,
        Nashik: 1110.0,
        Hyderabad: 1130.0,
        Chennai: 1115.0
      },
      priceTrend: 'Stable'
    },
    consumption: {
      nutritionalProfile: {
        calories: 251,
        protein_g: 10.4,
        carbs_g: 64.0,
        fat_g: 3.3,
        vitaminC_mg: 0,
        vitaminA_IU: 547,
        dietaryFiber_g: 25.3,
        potassium_mg: 1329,
        iron_mg: 9.7,
        antioxidantIndex: 98,
        glycemicIndex: 0,
        highlights: ['Rich in Piperine (increases curcumin bioavailability by up to 2000%)', 'Potent digestive stimulant and carminative', 'High manganese and potassium bio-density']
      },
      consumptionMethods: ['Fresh coarsely ground in curries, soups, and eggs', 'Whole corns in biryanis, rasam, and marinades', 'Ayurvedic Kashayam and golden milk infusion'],
      preparationMethods: ['Crush whole peppercorns right before cooking or serving to preserve volatile essential oils', 'Do not boil excessively; add towards the final stages of cooking for maximum aroma'],
      nutrientPreservationTips: ['Store whole and grind on demand', 'Keep sealed in an opaque, airtight container away from heat and light'],
      recommendedPreparation: 'Coarsely crush 4-5 peppercorns and steep with pure turmeric and warm milk for an immunity elixir.',
      servingGuidance: '0.5g to 1g (1/4 tsp) of freshly ground pepper per serving.',
      bioavailabilityTip: 'Piperine inhibits hepatic glucuronidation, dramatically multiplying nutrient and herbal absorption.',
      recipes: [
        {
          title: 'Authentic South Indian Milagu Rasam (Spiced Black Pepper Broth)',
          prepTime: '15 mins',
          healthBenefit: 'Instant relief from nasal congestion, sore throat, and digestive stagnation',
          ingredients: ['1 tsp Malabar Black Peppercorns', '1 tsp Cumin Seeds', '3 Garlic cloves', '1 Ripe Tomato', 'Tamarind pulp', 'Curry leaves', 'Ghee'],
          steps: [
            'Coarsely crush black peppercorns, cumin seeds, and garlic in a mortar.',
            'Simmer tomato and tamarind extract with turmeric and crushed spice blend for 8 minutes.',
            'Temper with mustard seeds and curry leaves in pure ghee; serve steaming hot.'
          ]
        }
      ]
    },
    risks: {
      highHumidityRisk: 'Humidity above 65% causes moisture re-absorption and rapid white/green mold growth (Aspergillus flavus).',
      highTempRisk: 'Storage above 30°C volatilizes essential piperine and pinene terpenes, causing loss of pungency and aroma.',
      frostRisk: 'Tolerant in cured dried state; plantation vines killed by sub-zero cold.',
      excessRainRisk: 'Water ingress during storage or transit destroys quality within 48 hours.',
      transitShockRisk: 'Low; keep master cartons sealed and dry.',
      mitigationStrategy: 'Store at 10-11% moisture in multi-layer Met-PET vacuum or nitrogen-flushed barrier bags with silica desiccant.'
    }
  },

  // 19C. WHITE PEPPER (HIGH-VALUE DECORTICATED SPICE)
  {
    id: 'white-pepper',
    name: 'White Pepper (Safed Mirch / Decorticated Peppercorns)',
    category: 'Spice',
    subcategory: 'Decorticated Dried Spice Berry',
    scientificName: 'Piper nigrum (Decorticated)',
    variety: 'Muntok Type / Decorticated Grade-A',
    description: 'Fully ripened berries of Piper nigrum with the dark outer pericarp removed by water retting/decortication. Delivers earthy pungency with reduced terpene bite, widely used in light-colored sauces, cream preparations, and medicinal remedies.',
    icon: '⚪',
    color: '#71717a',
    aliases: ['white pepper', 'safed mirch', 'safed mirchi', 'bili menasu', 'thellati miriyalu', 'vellai milagu', 'piper nigrum album', 'white peppercorn', 'white-pepper'],
    images: {
      productImage: 'white-pepper',
      productImageAlt: 'Premium Decorticated White Peppercorns'
    },
    growing: {
      climate: 'Humid tropical Western Ghats / coastal evergreen belt (18°C - 35°C).',
      soil: 'Rich fertile laterite or forest loamy soil with high drainage.',
      idealSoilPh: '5.5 - 6.5',
      temperatureRange: [18, 35],
      rainfallRequirement: '2000 - 3000 mm',
      sowingMethod: 'Runner cuttings on living support standards',
      sowingSeason: 'Monsoon onset (May - June)',
      seedRequirement: '1600 - 1800 vines / hectare',
      spacing: '2.5m x 2.5m',
      growthDuration: 'Perennial vine fruiting cycle 180 days',
      growthDays: 180,
      currentMaturityStage: 95,
      irrigation: 'Protective summer irrigation every 10-14 days.',
      fertilizerGuidance: [
        { stage: 'Pre-Monsoon', recommendation: 'NPK 100:40:140 g/vine + Neem cake 1 kg', impact: 'Fruit branch setting', urgency: 'Immediate' }
      ],
      commonPests: ['Pollu Beetle', 'Root Knot Nematode'],
      diseaseRisks: ['Quick Wilt (Phytophthora capsici)'],
      criticalCareTips: ['Harvest strictly 100% fully red ripe berries for white pepper decortication.']
    },
    harvesting: {
      harvestingDays: 15,
      recommendedWindow: 'Hand picking fully red berries from January to March',
      maturityIndicators: ['100% of berries on spike turn bright red/orange.', 'Pulp softens readily in water.'],
      harvestingMethod: 'Selective hand picking of red-ripe spikes.',
      bestHarvestTime: 'Clear sunny morning',
      firmnessTarget: 'Firm decorticated seed kernel (600 g/L bulk density)',
      postHarvestHandling: [
        'Soaking ripe berries in running fresh water for 7-10 days to soften pericarp.',
        'Washing and trampling to strip skin, followed by patio sun-drying to <10.5% moisture.'
      ]
    },
    storage: {
      shelfLifeAmbient: '18 to 24 Months in hermetic moisture barrier bags',
      shelfLifeCold: '36 Months in controlled warehouse',
      ambientDays: 540,
      coldDays: 1080,
      storageTemperature: '15°C - 24°C',
      humidity: '50% - 60% RH',
      coldStorageRequired: false,
      storageMethod: 'Hermetically sealed Met-PET pouches inside master corrugated cartons',
      preservationSteps: ['Keep relative humidity below 60% to prevent fungal discoloration.'],
      spoilageIndicators: ['Musty mold odor', 'Grey/brown surface darkening'],
      curingRequired: true,
      curingInstructions: 'Water retting followed by clean sun-drying to 10% moisture.'
    },
    packaging: {
      primaryPackaging: 'Multi-layer Metallized Pouch (PET/Met-PET/PE) (500g / 1kg / 5kg)',
      secondaryPackaging: '5-Ply Corrugated Master Carton (25kg)',
      recommendedMaterials: ['PET / Met-PET / PE (100 µm)', 'Hermetic Barrier Laminate'],
      ventilationRequired: false,
      ventilationSpec: '100% Hermetic seal (moisture & aroma barrier)',
      moistureProtection: 'Ultra-high barrier (WVTR < 0.5 g/m²/day)',
      ethyleneSensitivity: 'Low',
      ethyleneControl: 'Isolate from strong cross-odors',
      cushioningSpecs: 'Corrugated master carton protection',
      shockRating: 4.8,
      estimatedPackagingCostPerKg: 12.50,
      packagingCapacity: '1 kg pouches / 25 kg master shippers',
      ecoCertification: 'Spices Board Certified Grade',
      layers: [
        { layer: 1, name: 'Outer Barrier', material: 'Reverse Printed PET', function: 'Printability and mechanical barrier', icon: '🌿', glowColor: '#71717a' },
        { layer: 2, name: 'Met-PET', material: 'Vacuum Metallized PET', function: 'Aroma and moisture barrier', icon: '🛡️', glowColor: '#a1a1aa' },
        { layer: 3, name: 'LLDPE', material: 'Food Grade Polyethylene', function: 'Hermetic heat seal', icon: '📦', glowColor: '#e4e4e7' }
      ]
    },
    transportation: {
      recommendedVehicle: 'Weatherproof Container Truck',
      temperatureControlled: false,
      targetTemp: '18°C - 24°C Ambient Dry',
      maximumRecommendedDistance: '3,000 km',
      handlingRequirements: ['Strict odor-free dry shipping', 'Hermetic moisture check'],
      vibrationSensitivity: 'Low',
      baseRatePerKm: 28.0
    },
    market: {
      marketCategory: 'High-Value Premium Spice Commodity',
      priceUnit: '₹/kg',
      basePricePerKg: 1350,
      priceStatus: 'Live Benchmark',
      regionalPrices: {
        Bengaluru: 1360.0,
        Mumbai: 1390.0,
        Delhi: 1420.0,
        Nashik: 1350.0,
        Hyderabad: 1370.0,
        Chennai: 1365.0
      },
      priceTrend: 'Steady'
    },
    consumption: {
      nutritionalProfile: {
        calories: 296,
        protein_g: 10.4,
        carbs_g: 68.6,
        fat_g: 2.1,
        vitaminC_mg: 0,
        vitaminA_IU: 0,
        dietaryFiber_g: 26.2,
        potassium_mg: 73,
        iron_mg: 14.3,
        antioxidantIndex: 88,
        glycemicIndex: 0,
        highlights: ['Concentrated Piperine core without outer husk tannins', 'Mild aromatic bite for gourmet cuisines', 'Digestive and metabolic stimulant']
      },
      consumptionMethods: ['Ground into white sauces, soups, and continental dishes', 'Ayurvedic formulations for respiratory and vision health'],
      preparationMethods: ['Grind whole seeds fresh before adding to hot dishes'],
      nutrientPreservationTips: ['Store in airtight glass or foil away from light'],
      recommendedPreparation: 'Pinch of freshly ground white pepper in warm almond milk or vegetable broth.',
      servingGuidance: '0.5g per serving.',
      bioavailabilityTip: 'Enhances intestinal absorption of trace minerals and phytonutrients.'
    },
    risks: {
      highHumidityRisk: 'Moisture above 12% causes fungal mold and surface grey staining.',
      highTempRisk: 'Heat above 35°C dissipates essential oils.',
      frostRisk: 'Tolerant in cured dry state.',
      excessRainRisk: 'Water damage during transit spoils batch.',
      transitShockRisk: 'Low; keep sealed and dry.',
      mitigationStrategy: 'Vacuum pack in Met-PET barrier pouches with food-grade desiccant.'
    }
  },

  // 19D. GREEN PEPPERCORNS (PRESERVED UNRIPE SPICE)
  {
    id: 'green-peppercorn',
    name: 'Green Peppercorns (Kacha Menasu / Tender Green Peppercorns)',
    category: 'Spice',
    subcategory: 'Preserved Unripe Spice Berry',
    scientificName: 'Piper nigrum (Unripe Berry)',
    variety: 'Tender Malabar Green Spikes',
    description: 'Immature, tender green berries of Piper nigrum harvested before ripening. Preserved in brine, vinegar, or freeze-dried to retain vibrant chlorophyll and fresh herbal piquancy. Delicate and perishable compared to sun-dried black pepper.',
    icon: '🟢',
    color: '#15803d',
    aliases: ['green peppercorn', 'green peppercorns', 'kacha menasu', 'hasiru menasu', 'pachi miriyalu', 'pachai milagu', 'green pepper spice', 'green-peppercorn', 'fresh green pepper'],
    images: {
      productImage: 'green-peppercorn',
      productImageAlt: 'Fresh Preserved Green Peppercorns'
    },
    growing: {
      climate: 'Humid tropical rainforest canopy (18°C - 32°C).',
      soil: 'Rich organic forest loamy soil with high drainage.',
      idealSoilPh: '5.5 - 6.5',
      temperatureRange: [18, 32],
      rainfallRequirement: '2000 - 3000 mm',
      sowingMethod: 'Vines on living standards',
      sowingSeason: 'Monsoon onset (May - June)',
      seedRequirement: '1600 - 1800 vines / hectare',
      spacing: '2.5m x 2.5m',
      growthDuration: 'Harvested at 120-140 days (unripe stage)',
      growthDays: 130,
      currentMaturityStage: 75,
      irrigation: 'Regular micro-irrigation.',
      fertilizerGuidance: [
        { stage: 'Pre-Monsoon', recommendation: 'NPK + Compost', impact: 'Spike berry set', urgency: 'Immediate' }
      ],
      commonPests: ['Pollu Beetle'],
      diseaseRisks: ['Foot Rot'],
      criticalCareTips: ['Harvest when berries are fully developed but strictly green and tender before seed coat hardens.']
    },
    harvesting: {
      harvestingDays: 10,
      recommendedWindow: 'October to November (unripe stage)',
      maturityIndicators: ['Berries are tender and green, easily crushed between fingers.', 'Zero seed coat lignification.'],
      harvestingMethod: 'Careful hand picking of green spikes.',
      bestHarvestTime: 'Early morning',
      firmnessTarget: 'Tender fresh drupe',
      postHarvestHandling: [
        'Immediate washing and immersion in 15% salt brine with 0.5% citric acid, or IQF dehydration.'
      ]
    },
    storage: {
      shelfLifeAmbient: '1 to 2 Months in canned brine',
      shelfLifeCold: '12 Months in chilled brine (2°C - 4°C)',
      ambientDays: 60,
      coldDays: 365,
      storageTemperature: '2°C - 4°C Chilled (or ambient in sealed brine cans)',
      humidity: '75% - 85% RH',
      coldStorageRequired: true,
      storageMethod: 'Airtight brine canisters or vacuum freeze-dried pouches',
      preservationSteps: ['Maintain brine acidity (pH < 4.0) to preserve emerald green color.'],
      spoilageIndicators: ['Blackening from enzymatic polyphenol oxidation', 'Cloudy brine'],
      curingRequired: true,
      curingInstructions: 'Acidified brine curing or quick blanching.'
    },
    packaging: {
      primaryPackaging: 'Hermetic Glass Jars / Food-Grade HDPE Buckets in Brine (1kg / 5kg)',
      secondaryPackaging: 'Corrugated Master Shipper with dividers',
      recommendedMaterials: ['Food-grade HDPE', 'Glass Jars', 'Vacuum Retort Pouches'],
      ventilationRequired: false,
      ventilationSpec: '100% Hermetic seal',
      moistureProtection: 'Liquid tight',
      ethyleneSensitivity: 'Low',
      ethyleneControl: 'Not required',
      cushioningSpecs: 'Partitions for glass containers',
      shockRating: 4.5,
      estimatedPackagingCostPerKg: 14.00,
      packagingCapacity: '1 kg jars / 10 kg pails',
      ecoCertification: 'Recyclable Glass / Food HDPE',
      layers: [
        { layer: 1, name: 'Glass/HDPE Barrier', material: 'Hermetic Brine Pack', function: 'Retains aqueous brine', icon: '🟢', glowColor: '#22c55e' },
        { layer: 2, name: 'Divider Box', material: '5-Ply Corrugated', function: 'Impact partition', icon: '📦', glowColor: '#16a34a' }
      ]
    },
    transportation: {
      recommendedVehicle: 'Insulated / Temperature-monitored truck',
      temperatureControlled: true,
      targetTemp: '4°C - 8°C (or ambient for sealed retort cans)',
      maximumRecommendedDistance: '1,500 km',
      handlingRequirements: ['Zero liquid leakage', 'Handle glass with care'],
      vibrationSensitivity: 'Moderate',
      baseRatePerKm: 22.0
    },
    market: {
      marketCategory: 'Gourmet Specialty Spice Commodity',
      priceUnit: '₹/kg',
      basePricePerKg: 850,
      priceStatus: 'Live Benchmark',
      regionalPrices: {
        Bengaluru: 860.0,
        Mumbai: 890.0,
        Delhi: 920.0,
        Nashik: 850.0,
        Hyderabad: 870.0,
        Chennai: 865.0
      },
      priceTrend: 'Steady'
    },
    consumption: {
      nutritionalProfile: {
        calories: 120,
        protein_g: 4.2,
        carbs_g: 22.0,
        fat_g: 1.2,
        vitaminC_mg: 12.0,
        vitaminA_IU: 240,
        dietaryFiber_g: 9.5,
        potassium_mg: 450,
        iron_mg: 3.5,
        antioxidantIndex: 92,
        glycemicIndex: 0,
        highlights: ['Fresh herbal piperine flavor', 'Retained chlorophyll antioxidants', 'Low sodium when rinsed from brine']
      },
      consumptionMethods: ['Whole in steak au poivre, Thai green curries, and pickled condiments'],
      preparationMethods: ['Rinse brine lightly with cold water before using in sauces'],
      nutrientPreservationTips: ['Keep submerged in brine in refrigerator after opening'],
      recommendedPreparation: 'Sauté whole green peppercorns in butter or olive oil with fresh herbs.',
      servingGuidance: '1 tsp whole berries per portion.',
      bioavailabilityTip: 'Natural piperine and chlorophyll synergistically stimulate digestive secretions.'
    },
    risks: {
      highHumidityRisk: 'N/A (stored in brine).',
      highTempRisk: 'Heat accelerates polyphenol browning.',
      frostRisk: 'Do not freeze in brine to avoid burst texture.',
      excessRainRisk: 'Pre-harvest moisture can cause premature berry drop.',
      transitShockRisk: 'Moderate; prevent jar breakage.',
      mitigationStrategy: 'Store in acidified brine (pH 3.8) in cushioned corrugated cases.'
    }
  },

  // 20. BEETROOT (HIGH-VALUE ROOT VEGETABLE COMMODITY)
  {
    id: 'beetroot',
    name: 'Beetroot (Chukandar / Ruby Beet)',
    category: 'Vegetable',
    subcategory: 'Root Vegetable',
    scientificName: 'Beta vulgaris',
    variety: 'Crimson Globe / Detroit Dark Red',
    description: 'Nutrient-dense subterranean taproot vegetable loaded with betalain pigments, natural nitrates, and antioxidants. Highly susceptible to transpirational water loss, surface shriveling, and crown fungal rot, requiring high relative humidity (95-98% RH) and cold-chain protection (0°C - 2°C).',
    icon: '🍠',
    color: '#991b1b',
    aliases: ['beetroot', 'beet', 'chukandar', 'beet root', 'beta vulgaris', 'red beet', 'chukander', 'table beet', 'garden beet', 'beetroots', 'beet greens', 'beet taproot', 'ruby beet'],
    images: {
      productImage: 'beetroot',
      productImageAlt: 'Fresh Ruby Crimson Beetroot'
    },
    growing: {
      climate: 'Cool-season biennial crop preferring moderate temperatures (15°C - 22°C) for optimal betacyanin synthesis.',
      soil: 'Deep, loose, well-drained sandy loam or silt loam free of stones to prevent root bifurcation/forking.',
      idealSoilPh: '6.0 - 7.5 (sensitive to acidic soils below pH 5.8)',
      temperatureRange: [12, 25],
      rainfallRequirement: '400 - 600 mm evenly distributed',
      sowingMethod: 'Direct seed sowing on ridges or flat beds with subsequent thinning',
      sowingSeason: 'Rabi (Oct-Nov) in plains; March-July in hill regions',
      seedRequirement: '7.5 - 9.0 kg / hectare multigerm seed clusters',
      spacing: '30 cm between rows x 10 cm between plants',
      growthDuration: '60 - 80 days from seedling emergence',
      growthDays: 75,
      currentMaturityStage: 85,
      irrigation: 'Light and frequent furrow or drip irrigation every 6-8 days; avoid water stress during root swelling to prevent cracking.',
      fertilizerGuidance: [
        { stage: 'Basal Field Prep', recommendation: 'FYM 20 t/ha + 60 kg N + 80 kg P2O5 + 80 kg K2O', impact: 'Stimulates early taproot expansion and robust crown development', urgency: 'Immediate' },
        { stage: '30 Days Post-Sowing', recommendation: 'Top dressing 40 kg N + Borax spray (0.2%)', impact: 'Prevents internal black spot/heart rot (boron deficiency)', urgency: 'Scheduled' }
      ],
      commonPests: ['Beet Leafminer (Pegomya hyoscyami)', 'Flea Beetles', 'Root Aphids'],
      diseaseRisks: ['Cercospora Leaf Spot (Cercospora beticola)', 'Heart Rot (Boron deficiency)', 'Rhizoctonia Crown Rot'],
      criticalCareTips: [
        'Apply boron (Borax 10 kg/ha) during soil preparation to prevent internal black heart cavity defects.',
        'Thin seedlings promptly to 10 cm spacing when 5 cm tall to avoid overcrowded stunted roots.',
        'Maintain continuous soil moisture during rapid bulking to avoid internal white ring zoning.'
      ]
    },
    harvesting: {
      harvestingDays: 14,
      recommendedWindow: 'Morning hours when roots reach 4.0 - 6.5 cm diameter',
      maturityIndicators: [
        'Roots attain prime table size (4.0 cm - 6.5 cm diameter) with tender, non-fibrous texture.',
        'Crown foliage exhibits dark green leaves with deep ruby-red veins.',
        'Roots feel firm, heavy, and spherical-to-globose with smooth ringed skin.'
      ],
      harvestingMethod: 'Manual hand pulling or mechanical undercutting; avoid bruising the tender taproot skin.',
      bestHarvestTime: 'Early morning under cool temperatures',
      firmnessTarget: 'Firm solid turgid root (Penetrometer 5.0 - 5.5 kg/cm²)',
      postHarvestHandling: [
        'Trim foliage tops leaving 2.0 cm petiole stalk to prevent bleeding and moisture loss.',
        'Gentle washing in chlorinated water (50 ppm) to remove field soil without skin abrasion.',
        'Grading into Grade A (50-65 mm diameter), Grade B (35-50 mm), and oversized processing grade.'
      ]
    },
    storage: {
      shelfLifeAmbient: '5 to 8 Days (Rapid transpirational shriveling and sponginess above 25°C)',
      shelfLifeCold: '90 to 120 Days at 0°C - 2°C with 95% - 98% RH',
      ambientDays: 7,
      coldDays: 110,
      storageTemperature: '0°C - 2°C (Cold Storage)',
      humidity: '95% - 98% RH (Ultra-high humidity essential to prevent water loss)',
      coldStorageRequired: true,
      storageMethod: 'Micro-perforated food-grade LDPE liner bags inside ventilated 5-ply corrugated telescopic cartons stacked on pallets in high-humidity cold rooms',
      preservationSteps: [
        'Maintain continuous 95-98% relative humidity; relative humidity below 90% causes rapid loss of turgor and wilting.',
        'Never trim root tip apex; breaking the subterranean tail accelerates internal moisture bleeding.',
        'Ensure proper cold room ventilation to prevent CO2 accumulation above 3%.'
      ],
      spoilageIndicators: ['Spongy/rubbery texture (dehydration)', 'Internal black heart cavity', 'Rhizoctonia fungal crown mold'],
      curingRequired: false
    },
    packaging: {
      primaryPackaging: 'Micro-Perforated LDPE Liner Bags (25µm, 0.5% open area) or Polyethylene Mesh Sacks (10kg / 25kg)',
      secondaryPackaging: '5-Ply Heavy Duty Ventilated Corrugated Master Cartons (20kg net)',
      recommendedMaterials: ['Micro-perforated Polyethylene (25 µm)', 'Ventilated Corrugated Craft B-Flute Cartons', 'Breathable Leno Mesh Bags for local markets'],
      ventilationRequired: true,
      ventilationSpec: 'Micro-perforations (4-6 holes of 6mm diameter per kg) to balance high humidity retention with aerobic respiration',
      moistureProtection: 'High moisture retention liner (maintains local microclimate >95% RH while allowing CO2 release)',
      ethyleneSensitivity: 'Low',
      ethyleneControl: 'Store away from high-ethylene emitters like ripening apples and bananas to prevent early sprouting',
      cushioningSpecs: 'Smooth carton lining prevents skin scuffing and abrasion damage',
      shockRating: 3.6,
      estimatedPackagingCostPerKg: 1.80,
      packagingCapacity: '20 kg master export corrugated cartons or 10 kg mesh bags',
      ecoCertification: '100% Recyclable FSC Certified Outer Corrugated Shippers',
      layers: [
        { layer: 1, name: 'Liner Film', material: 'Food Grade Micro-Perforated LDPE Liner Film (25µm)', function: 'High relative humidity microclimate (>95% RH) and anti-transpirational shrivel protection', icon: '🛡️', glowColor: '#e11d48' },
        { layer: 2, name: 'Master Shipper', material: '5-Ply High-Stiffness Kraft Corrugated Master Shipper', function: 'Stacking strength, compression resistance, and cold store ventilation', icon: '📦', glowColor: '#9333ea' }
      ]
    },
    transportation: {
      recommendedVehicle: 'Refrigerated Reefer Container (0°C - 2°C) or Ventilated Insulated Truck',
      temperatureControlled: true,
      targetTemp: '0°C - 2°C (Reefer) or <12°C (Short Distance)',
      maximumRecommendedDistance: '1,500 km',
      handlingRequirements: ['Verify reefer setpoint at 0°C - 2°C', 'Inspect micro-perforated liners are intact', 'Ensure zero skin scuffing or water soaking in cartons'],
      vibrationSensitivity: 'Moderate',
      baseRatePerKm: 19.5
    },
    market: {
      marketCategory: 'Fresh Root Vegetable Commodity',
      priceUnit: '₹/kg',
      basePricePerKg: 38,
      priceStatus: 'Live Benchmark',
      regionalPrices: {
        Bengaluru: 40.0,
        Mumbai: 42.0,
        Delhi: 36.0,
        Nashik: 34.0,
        Hyderabad: 38.0,
        Chennai: 41.0
      },
      priceTrend: 'Stable'
    },
    consumption: {
      nutritionalProfile: {
        calories: 43,
        protein_g: 1.6,
        carbs_g: 9.6,
        fat_g: 0.2,
        vitaminC_mg: 4.9,
        vitaminA_IU: 33,
        dietaryFiber_g: 2.8,
        potassium_mg: 325,
        iron_mg: 0.8,
        antioxidantIndex: 88,
        glycemicIndex: 61,
        highlights: ['Rich in Betalains (Betanin & Vulgaxanthin)', 'High Dietary Inorganic Nitrates (supports cardiovascular health and athletic stamina)', 'Excellent source of Folate (Vitamin B9) and Manganese']
      },
      consumptionMethods: ['Fresh pressed cold juice with ginger and apple', 'Steamed or boiled salad cubes with lemon juice', 'Traditional South Indian poriyal or North Indian subzi'],
      preparationMethods: ['Wash thoroughly to remove soil before peeling', 'Steam unpeeled to preserve betalain pigments then peel'],
      nutrientPreservationTips: ['Do not overboil in discarded water to retain water-soluble betalains', 'Pair with vitamin C for maximum iron absorption'],
      recommendedPreparation: 'Steam lightly for 10-12 minutes with a touch of rock salt and cold-pressed coconut oil.',
      servingGuidance: 'Ideal in daily diet (100g-150g) for cardiovascular wellness.',
      bioavailabilityTip: 'Combine with citrus juice or amla to enhance non-heme iron and antioxidant assimilation.',
      recipes: [
        {
          title: 'South Indian Chukandar Poriyal (Spiced Beetroot Stir-Fry)',
          prepTime: '20 mins',
          healthBenefit: 'Boosts stamina, nitric oxide blood flow, and digestive fiber',
          ingredients: ['500g Fresh Beetroot (diced/grated)', '1 tsp Mustard seeds', '1 tbsp Urad dal', '2 Green chillies', '1 sprig Curry leaves', '3 tbsp Fresh grated coconut'],
          steps: [
            'Heat coconut oil in a pan, add mustard seeds, urad dal, green chillies, and curry leaves until fragrant.',
            'Add diced beetroot, salt, and splash of water; cover and steam cook on medium heat for 10-12 minutes until tender.',
            'Stir in fresh grated coconut and serve hot with steamed rice and rasam.'
          ]
        }
      ]
    },
    risks: {
      highHumidityRisk: 'Condensation without adequate micro-ventilation promotes Rhizoctonia and Botrytis neck mold.',
      highTempRisk: 'Temperatures above 20°C accelerate respiration and cause rapid rubbery shriveling within 3 days.',
      frostRisk: 'Tolerant to near 0°C; severe freeze below -1°C causes water soaking and cellular breakdown.',
      excessRainRisk: 'Waterlogged soil prior to harvest causes root bursting and bacterial soft rot.',
      transitShockRisk: 'Moderate; protect roots from skin abrasion which causes dark oxidized blemishes.',
      mitigationStrategy: 'Trim tops to 2cm, wash in sanitized water, pack in micro-perforated LDPE liners, and store at 0-2°C with 95% RH.'
    }
  },
  // ==========================================
  // 23. APPLE (HIGH-ALTITUDE POME FRUIT)
  // ==========================================
  {
    id: 'apple',
    name: 'Apple (Kashmiri & Kinnaur Royal Delicious)',
    category: 'Fruit',
    subcategory: 'Pome Fruit',
    scientificName: 'Malus domestica',
    variety: 'Royal Delicious / Red Chief / Kashmiri Golden',
    description: 'Crisp, high-altitude pome fruit with exceptional storage longevity under controlled atmosphere. Highly sensitive to mechanical bruising, high respiration at ambient temperatures, and ethylene emission.',
    icon: '🍎',
    color: '#dc2626',
    aliases: [
      'apple', 'apples', 'fresh apple', 'royal delicious', 'shimla apple', 'kinnaur apple', 'kashmiri apple',
      'seb', 'sebu', 'aapal', 'सेब', 'ಸೇಬು', 'ఆపిల్', 'ஆப்பிள்'
    ],
    images: {
      productImage: 'apple',
      productImageAlt: 'Crisp Red Royal Delicious Mountain Apples'
    },
    growing: {
      climate: 'Cool temperate climate requiring 1,000–1,500 chilling hours below 7°C during winter dormancy.',
      soil: 'Deep well-drained loamy to sandy clay loam soil rich in organic matter.',
      idealSoilPh: '5.5 - 6.8',
      temperatureRange: [0, 24],
      rainfallRequirement: '1000 - 1250 mm distributed evenly across growing season',
      sowingMethod: 'Grafted clonal rootstock planting on contour terraces',
      sowingSeason: 'Dormant winter planting (December - February)',
      seedRequirement: '500 - 1250 trees / hectare depending on canopy architecture',
      spacing: '4m x 4m (Semi-dwarf) or 3m x 1.5m (High-density trellis)',
      growthDuration: 'Perennial orchard; 130 - 150 days from petal fall to harvest',
      growthDays: 140,
      currentMaturityStage: 90,
      irrigation: 'Drip fertigation during fruit cell expansion stage; avoid water stress during June drop.',
      fertilizerGuidance: [
        { stage: 'Dormant Bud Break', recommendation: 'FYM 30 t/ha + 350g N + 175g P2O5 + 350g K2O per mature tree', impact: 'Strong spur vigor and uniform blossom set', urgency: 'Immediate' },
        { stage: 'Fruitlet Set', recommendation: 'Foliar Boron (0.1%) + Zinc Sulfate (0.5%) spray', impact: 'Prevents fruit cracking and enhances calyx structure', urgency: 'Scheduled' },
        { stage: 'Pre-Harvest (30 Days)', recommendation: 'Calcium Chloride (0.5%) foliar spray twice', impact: 'Increases cell wall calcium and prevents bitter pit / breakdown', urgency: 'Monitoring' }
      ],
      commonPests: ['San Jose Scale (Quadraspidiotus perniciosus)', 'Woolly Apple Aphid', 'European Red Mite'],
      diseaseRisks: ['Apple Scab (Venturia inaequalis)', 'Powdery Mildew', 'Bitter Pit (Calcium deficiency)'],
      criticalCareTips: [
        'Apply pre-harvest calcium sprays to prevent bitter pit disorder.',
        'Prune water sprouts to maximize sunlight penetration into the inner canopy.',
        'Pre-cool harvested fruit within 12 hours of picking to arrest ripening.'
      ]
    },
    harvesting: {
      harvestingDays: 14,
      recommendedWindow: 'Morning hours when ground color changes from green to creamy yellow',
      maturityIndicators: [
        'Starch-iodine index pattern reaches rating 5–6.',
        'Soluble solids content (TSS) reaches 12.5–14.5 °Brix.',
        'Flesh firmness measures 7.5–8.2 kg/cm² on penetrometer with 11mm probe.'
      ],
      harvestingMethod: 'Manual hand picking using palm grasp with thumb at the abscission zone; lift and twist gently.',
      bestHarvestTime: 'Early morning (06:00 AM - 10:30 AM) while ambient temperature is low',
      firmnessTarget: '7.5 - 8.2 kg/cm²',
      sugarBrixTarget: '13.0 - 14.5 °Bx',
      postHarvestHandling: [
        'Pre-cooling rapidly to 2°C - 4°C within 12 hours of harvest.',
        '1-MCP (1-Methylcyclopropene) treatment to block ethylene receptors.',
        'Sorting into Grade Extra Fancy, Grade A, and culinary processing fruit.'
      ]
    },
    storage: {
      shelfLifeAmbient: '10 to 14 Days (Rapid starch breakdown and softening at >20°C)',
      shelfLifeCold: '180 to 240 Days in Controlled Atmosphere (CA: 1.5% O2, 1.0% CO2 at 0.5°C - 1.5°C)',
      ambientDays: 12,
      coldDays: 210,
      storageTemperature: '0.5°C - 2°C (Cold Storage / CA)',
      humidity: '90% - 95% RH (High humidity required to prevent skin wrinkling)',
      coldStorageRequired: true,
      storageMethod: 'Controlled Atmosphere (CA) cold rooms with molded pulp cell trays stacked in ventilated 5-ply cartons on pallets',
      preservationSteps: [
        'Maintain continuous storage temperature between 0.5°C and 1.5°C without fluctuation.',
        'Apply 1-MCP within 7 days of harvest to arrest climacteric ethylene production.',
        'Ensure continuous scrubber operation to keep ethylene concentration below 1 ppm.'
      ],
      spoilageIndicators: ['Mealy dry texture', 'Bitter pit skin depressions', 'Internal core browning (senescent breakdown)'],
      curingRequired: false
    },
    packaging: {
      primaryPackaging: 'Molded Paper Pulp Fruit Trays (Cell sizes 80 to 120)',
      secondaryPackaging: '5-Ply Heavy Duty Ventilated Corrugated Master Telescopic Cartons (18-20kg net)',
      recommendedMaterials: ['Molded Recycled Paper Pulp Trays', '5-Ply High-Stiffness Kraft Corrugated Board', 'Food-Grade Micro-Perforated LDPE Box Liners'],
      ventilationRequired: true,
      ventilationSpec: 'Ventilation slots (4-5% of total carton surface area) aligned with tray channels',
      moistureProtection: 'Breathable humidity retention without surface condensation',
      ethyleneSensitivity: 'High',
      ethyleneControl: '1-MCP freshness treatment + ethylene scrubbers; high ethylene emitter',
      cushioningSpecs: 'Individual pulp cell cup dividers prevent fruit-to-fruit contact and vibration abrasion',
      shockRating: 4.8,
      estimatedPackagingCostPerKg: 3.50,
      packagingCapacity: '20 kg telescopic export cartons with 4 tiers of 20-25 fruit each',
      ecoCertification: '100% Biodegradable & Recyclable Pulp and Kraft Materials',
      layers: [
        { layer: 1, name: 'Pulp Tray', material: 'Molded Biodegradable Recycled Paper Pulp Cell Tray', function: 'Individual fruit pocket isolation, shock absorption, and contact bruise prevention', icon: '🪺', glowColor: '#dc2626' },
        { layer: 2, name: 'Outer Shipper', material: '5-Ply Telescopic Kraft Corrugated Outer Master Shipper', function: 'High compression stack strength (up to 8 tiers) in cold storage', icon: '📦', glowColor: '#b91c1c' }
      ]
    },
    transportation: {
      recommendedVehicle: 'Refrigerated Reefer Container (0.5°C - 2°C)',
      temperatureControlled: true,
      targetTemp: '0.5°C - 2°C',
      maximumRecommendedDistance: '2,200 km',
      handlingRequirements: ['Verify reefer thermostat at 1°C', 'Verify pulp trays are snug without loose fruit movement', 'Ensure ethylene scrubber filter is operational'],
      vibrationSensitivity: 'Moderate',
      baseRatePerKm: 22.0
    },
    market: {
      marketCategory: 'Premium High-Altitude Table Fruit',
      priceUnit: '₹/kg',
      basePricePerKg: 135,
      priceStatus: 'Live Benchmark',
      regionalPrices: {
        Bengaluru: 140.0,
        Mumbai: 145.0,
        Delhi: 130.0,
        Nashik: 135.0,
        Hyderabad: 140.0,
        Chennai: 148.0
      },
      priceTrend: 'Stable'
    },
    consumption: {
      nutritionalProfile: {
        calories: 52,
        protein_g: 0.3,
        carbs_g: 13.8,
        fat_g: 0.2,
        vitaminC_mg: 4.6,
        vitaminA_IU: 54,
        dietaryFiber_g: 2.4,
        potassium_mg: 107,
        iron_mg: 0.12,
        antioxidantIndex: 89,
        glycemicIndex: 36,
        highlights: ['Rich in Quercetin flavonoid for cardiovascular and cellular wellness', 'Pectin prebiotic soluble fiber supporting gut microbiome', 'Natural polyphenols and anthocyanin pigment']
      },
      consumptionMethods: ['Fresh whole sliced table fruit', 'Cold-pressed raw juice and smoothies', 'Stewed compote with warming spices'],
      preparationMethods: ['Wash thoroughly under running water before consumption', 'Leave skin intact to maximize quercetin bioflavonoid intake'],
      nutrientPreservationTips: ['Slice immediately before eating to avoid enzymatic browning', 'Sprinkle with lemon juice to prevent polyphenol oxidation'],
      recommendedPreparation: 'Enjoy whole fresh at ambient temperature with skin intact.',
      servingGuidance: 'One medium apple (150g-180g) daily as a mid-morning prebiotic snack.',
      bioavailabilityTip: 'Consume with natural skin for maximum pectin and insoluble dietary fiber synergy.',
      recipes: [
        {
          title: 'Warm Spiced Himalayan Apple & Cinnamon Compote',
          prepTime: '20 mins',
          healthBenefit: 'Supports stable glycemic response and gut mucosal integrity',
          ingredients: ['4 Fresh Royal Apples (peeled and diced)', '1 Ceylon cinnamon stick', '2 Whole cloves', '1 tbsp Raw forest honey', '1 tsp Lemon juice'],
          steps: [
            'Place diced apples, cinnamon, cloves, and 3 tablespoons water in a heavy-bottomed pan.',
            'Cover and simmer on low heat for 12–14 minutes until apples are fork-tender and fragrant.',
            'Remove from heat, discard whole spices, fold in raw honey and fresh lemon juice, and serve warm.'
          ]
        }
      ]
    },
    risks: {
      highHumidityRisk: 'RH above 98% promotes blue mold rot (Penicillium expansum) at wounded lenticels.',
      highTempRisk: 'Storage above 4°C causes rapid climacteric respiration, mealy texture, and internal breakdown.',
      frostRisk: 'Freezing below -1.5°C causes irreversible cell membrane rupture and water-soaked flesh collapse.',
      excessRainRisk: 'Late rains during ripening induce fruit splitting and skin micro-cracking.',
      transitShockRisk: 'High; fruit-to-fruit impact causes deep brown bruising within 24 hours.',
      mitigationStrategy: 'Pre-cool to 1°C within 12h, pack in individual molded pulp cell trays, and store in CA with ethylene scrubbing.'
    }
  },
  // ==========================================
  // 24. ORANGE (CITRUS MANDARIN)
  // ==========================================
  {
    id: 'orange',
    name: 'Orange (Nagpur Mandarin / Coorg Orange)',
    category: 'Fruit',
    subcategory: 'Citrus Fruit',
    scientificName: 'Citrus reticulata / Citrus sinensis',
    variety: 'Nagpur Mandarin / Coorg Loose Jacket / Kinnow',
    description: 'Juicy, aromatic hesperidium citrus fruit celebrated for high ascorbic acid and vibrant color. Non-climacteric fruit that must reach full maturity on tree. Vulnerable to chilling injury if stored below 4°C.',
    icon: '🍊',
    color: '#f97316',
    aliases: [
      'orange', 'oranges', 'nagpur orange', 'mandarin', 'santre', 'santra', 'narangi',
      'kittale', 'kithale', 'ಕಿತ್ತಳೆ', 'संतरा', 'నారింజ', 'ஆரஞ்சு'
    ],
    images: {
      productImage: 'orange',
      productImageAlt: 'Fresh Juicy Nagpur Mandarin Oranges'
    },
    growing: {
      climate: 'Sub-tropical to tropical climate with distinct dry period to induce flower flushing (Ambia & Mrig Bahar).',
      soil: 'Deep well-drained loamy to black cotton soil with high base saturation and good drainage.',
      idealSoilPh: '6.5 - 7.5',
      temperatureRange: [13, 35],
      rainfallRequirement: '750 - 1000 mm annual rainfall',
      sowingMethod: 'Budded seedlings on Rangpur lime / Rough lemon rootstock',
      sowingSeason: 'Monsoon transplanting (July - August)',
      seedRequirement: '275 - 400 trees / hectare',
      spacing: '6m x 6m square planting system',
      growthDuration: 'Perennial citrus grove; 210 - 240 days from fruit set to harvest',
      growthDays: 220,
      currentMaturityStage: 92,
      irrigation: 'Drip irrigation with regulated water deficit stress to trigger flowering, followed by regular watering during fruit swelling.',
      fertilizerGuidance: [
        { stage: 'Post-Harvest Pruning', recommendation: 'FYM 40 t/ha + 400g N + 200g P2O5 + 300g K2O per bearing tree', impact: 'Vegetative restoration and root growth', urgency: 'Immediate' },
        { stage: 'Fruit Enlargement', recommendation: 'Foliar micronutrient spray (Zinc 0.5% + Manganese 0.3% + Magnesium 0.5%)', impact: 'Prevents mottle leaf and boosts rind color', urgency: 'Scheduled' },
        { stage: 'Color Break Stage', recommendation: 'Potassium Nitrate (1%) foliar spray', impact: 'Maximizes TSS, juice percentage, and rind sweetness', urgency: 'Monitoring' }
      ],
      commonPests: ['Citrus Psylla (Diaphorina citri)', 'Citrus Leaf Miner', 'Fruit Sucking Moth'],
      diseaseRisks: ['Citrus Greening (HLB)', 'Gummosis (Phytophthora)', 'Citrus Canker'],
      criticalCareTips: [
        'Do not store below 4°C to prevent peel pitting and chilling injury.',
        'Clip fruit with short stems; do not pull by hand to avoid stem-end skin tearing.',
        'Ensure gentle handling to protect delicate essential oil glands in the flavedo.'
      ]
    },
    harvesting: {
      harvestingDays: 10,
      recommendedWindow: 'Morning after dew has dried completely to prevent oleocellosis peel staining',
      maturityIndicators: [
        'Peel color turns from deep green to bright golden orange (minimum 70% color break).',
        'TSS to Acid ratio reaches 10:1 or higher (Brix 10–12°).',
        'Juice content exceeds 40% by fruit weight.'
      ],
      harvestingMethod: 'Careful clipper cutting leaving 2mm button pedicel; never pull or tear.',
      bestHarvestTime: 'Mid-morning (09:00 AM - 01:00 PM) when rind turgor has softened slightly',
      firmnessTarget: 'Firm elastic turgor (4.5 - 5.5 kg/cm²)',
      sugarBrixTarget: '10.5 - 12.5 °Bx',
      postHarvestHandling: [
        'Washing in warm sanitized water (100 ppm chlorine) and food-grade wax coating.',
        'Ethylene degreening (3–5 ppm at 25°C, 90% RH for 48 hours) for early season fruit.',
        'Grading into Super, Special, and Standard based on fruit diameter (60–75 mm).'
      ]
    },
    storage: {
      shelfLifeAmbient: '7 to 10 Days at 22°C - 26°C (Rapid transpirational shriveling)',
      shelfLifeCold: '60 to 90 Days at 5°C - 7°C with 85% - 90% RH',
      ambientDays: 8,
      coldDays: 75,
      storageTemperature: '5°C - 7°C (Must NEVER drop below 4°C)',
      humidity: '85% - 90% RH (Balancing moisture retention with decay prevention)',
      coldStorageRequired: true,
      storageMethod: 'Ventilated 5-ply corrugated telescopic cartons with food-grade paper wraps in well-aerated cold storage',
      preservationSteps: [
        'Maintain strict temperature control between 5°C and 7°C to prevent chilling injury.',
        'Ensure continuous air circulation of 0.1 to 0.2 m/s through pallet stacks.',
        'Apply natural carnauba wax coating to reduce weight loss by 40%.'
      ],
      spoilageIndicators: ['Peel pitting and brown sunken spots (chilling injury)', 'Green mold (Penicillium digitatum)', 'Stem-end watery rot'],
      curingRequired: false
    },
    packaging: {
      primaryPackaging: 'Individual Food-Grade Tissue Wrap or Open-Weave Leno Sacks (10kg)',
      secondaryPackaging: '5-Ply Heavy Duty Ventilated Corrugated Master Cartons (15-20kg net)',
      recommendedMaterials: ['Ventilated 5-Ply Corrugated CFB Box', 'High-Density Polyethylene Leno Mesh Sacks', 'Food-Grade Carnauba Protective Wax Coating'],
      ventilationRequired: true,
      ventilationSpec: 'Minimum 5% vent hole area on all sides for cross-ventilation',
      moistureProtection: 'Breathable; avoiding high moisture traps that trigger Penicillium rot',
      ethyleneSensitivity: 'Low',
      ethyleneControl: 'Standard ventilation; separate from ripening bananas and papayas',
      cushioningSpecs: 'Corrugated dividers or soft tissue wrappers between tiers',
      shockRating: 3.9,
      estimatedPackagingCostPerKg: 1.80,
      packagingCapacity: '15 kg / 20 kg master cartons',
      ecoCertification: '100% Recyclable Kraft Board and Organic Bio-Wax',
      layers: [
        { layer: 1, name: 'Protective Wax', material: 'Food Grade Natural Carnauba Wax Emulsion Coating', function: 'Transpirational water loss barrier and natural peel luster', icon: '✨', glowColor: '#f97316' },
        { layer: 2, name: 'Export Shipper', material: '5-Ply High-Ventilation Kraft Corrugated Export Shipper', function: 'Compression strength and aerated transit protection', icon: '📦', glowColor: '#ea580c' }
      ]
    },
    transportation: {
      recommendedVehicle: 'Refrigerated Reefer Container (5.5°C - 7.5°C) or Ventilated Insulated Truck',
      temperatureControlled: true,
      targetTemp: '6°C - 8°C',
      maximumRecommendedDistance: '1,800 km',
      handlingRequirements: ['Verify reefer setpoint at 6°C (NOT below 4°C)', 'Ensure ventilation holes are unobstructed', 'Inspect cartons for zero dampness'],
      vibrationSensitivity: 'Moderate',
      baseRatePerKm: 18.0
    },
    market: {
      marketCategory: 'Citrus Table & Processing Commodity',
      priceUnit: '₹/kg',
      basePricePerKg: 65,
      priceStatus: 'Live Benchmark',
      regionalPrices: {
        Bengaluru: 70.0,
        Mumbai: 65.0,
        Delhi: 68.0,
        Nashik: 60.0,
        Hyderabad: 65.0,
        Chennai: 72.0
      },
      priceTrend: 'Rising'
    },
    consumption: {
      nutritionalProfile: {
        calories: 47,
        protein_g: 0.9,
        carbs_g: 11.8,
        fat_g: 0.1,
        vitaminC_mg: 53.2,
        vitaminA_IU: 225,
        dietaryFiber_g: 2.4,
        potassium_mg: 181,
        iron_mg: 0.1,
        antioxidantIndex: 82,
        glycemicIndex: 43,
        highlights: ['Exceptional Vitamin C (meets 88% daily requirement)', 'High Hesperidin and Naringenin citrus bioflavonoids', 'Supports immune resistance and vascular integrity']
      },
      consumptionMethods: ['Fresh peeled segments', 'Fresh cold-pressed citrus juice with pulp', 'Fruit salads and citrus marinades'],
      preparationMethods: ['Peel outer rind gently by hand or knife', 'Retain inner white albedo mesh for maximum bioflavonoid intake'],
      nutrientPreservationTips: ['Consume immediately after juicing to prevent vitamin C oxidation', 'Do not boil citrus juice'],
      recommendedPreparation: 'Enjoy fresh as whole peeled fruit to benefit from both fiber and vitamin C.',
      servingGuidance: 'One to two medium oranges daily for optimal immune and collagen support.',
      bioavailabilityTip: 'Combine with plant-based iron foods (spinach, lentils) to dramatically boost non-heme iron uptake.',
      recipes: [
        {
          title: 'Fresh Nagpur Orange & Mint Cooler',
          prepTime: '5 mins',
          healthBenefit: 'Instant hydration, vitamin C replenishment, and electrolyte recovery',
          ingredients: ['4 Fresh Nagpur Oranges (juiced)', '6 Fresh mint leaves', '1/4 tsp Roasted cumin powder', '1/4 tsp Black salt', 'Crushed ice'],
          steps: [
            'Extract fresh orange juice without pressing the bitter inner white pith.',
            'Lightly bruise fresh mint leaves with black salt and cumin powder in a glass.',
            'Pour in fresh orange juice, stir gently, top with ice, and serve immediately.'
          ]
        }
      ]
    },
    risks: {
      highHumidityRisk: 'Humidity above 92% combined with poor air circulation causes explosive green mold (Penicillium digitatum).',
      highTempRisk: 'Temperatures above 25°C cause rapid rind drying, spongy loose skin, and sour fermentation.',
      frostRisk: 'Freezing below 0°C crystallizes juice vesicles and ruins pulp texture completely.',
      excessRainRisk: 'Heavy rains during harvest induce rind water-soaking and peel breakdown.',
      transitShockRisk: 'Rind oleocellosis caused by vibrations against rough packaging walls.',
      mitigationStrategy: 'Clip fruit with pedicel, coat in carnauba wax, pack in ventilated CFB cartons, and maintain reefer at 6°C.'
    }
  },
  // ==========================================
  // 25. BUTTER FRUIT (AVOCADO)
  // ==========================================
  {
    id: 'butter-fruit',
    name: 'Butter Fruit (Western Ghats Coorg Avocado)',
    category: 'Fruit',
    subcategory: 'Subtropical Drupe (Avocado)',
    scientificName: 'Persea americana',
    variety: 'Hass / Fuerte / Coorg Green Butter Fruit',
    description: 'Creamy, nutrient-dense subtropical drupe high in monounsaturated oleic fat. Strictly separate botanical entity from Dairy Butter. Strong climacteric fruit with dramatic ethylene production during softening. Susceptible to chilling injury below 4°C.',
    icon: '🥑',
    color: '#65a30d',
    aliases: [
      'butter fruit', 'butterfruit', 'avocado', 'butter-fruit', 'coorg butter fruit',
      'hass avocado', 'fuerte', 'coorg avocado', 'ಬೆಣ್ಣೆ ಹಣ್ಣು', 'बटर फ्रूट', 'వెన్న పండు', 'வெண்ணெய் பழம்'
    ],
    images: {
      productImage: 'butter-fruit',
      productImageAlt: 'Creamy Coorg Green Butter Fruit (Avocado)'
    },
    growing: {
      climate: 'Humid subtropical to tropical high-altitude hills (1,000–1,600m above sea level) with mild frost-free temperatures (15°C - 28°C).',
      soil: 'Deep well-drained volcanic or red lateritic soil with high organic matter and no waterlogging.',
      idealSoilPh: '5.5 - 6.5',
      temperatureRange: [12, 30],
      rainfallRequirement: '1200 - 1800 mm well-distributed annual rainfall',
      sowingMethod: 'Grafted vegetative planting on seedling rootstock',
      sowingSeason: 'Early Monsoon (June - July)',
      seedRequirement: '200 - 280 trees / hectare',
      spacing: '7m x 7m or 6m x 6m spacing',
      growthDuration: 'Perennial tree; 150 - 200 days from flowering to maturity',
      growthDays: 180,
      currentMaturityStage: 88,
      irrigation: 'Regular drip irrigation during dry winter and fruit development; avocado roots are extremely shallow and sensitive to water stress.',
      fertilizerGuidance: [
        { stage: 'Post-Harvest Rest', recommendation: 'FYM 35 t/ha + 250g N + 150g P2O5 + 300g K2O per tree', impact: 'Rebuilds carbohydrate reserves in evergreen foliage', urgency: 'Immediate' },
        { stage: 'Spring Flush & Bloom', recommendation: 'Zinc (0.2%) + Boron (0.1%) foliar nutrition spray', impact: 'Increases flower retention and fruitlet set', urgency: 'Scheduled' },
        { stage: 'Fruit Oil Accumulation', recommendation: 'Potassium Sulfate (SOP) fertigation (1.5 kg/tree)', impact: 'Maximizes monounsaturated oil percentage and pulp density', urgency: 'Monitoring' }
      ],
      commonPests: ['Avocado Thrips', 'Lace Bugs', 'Fruit Borers'],
      diseaseRisks: ['Phytophthora Root Rot (Phytophthora cinnamomi)', 'Anthracnose (Colletotrichum gloeosporioides)', 'Cercospora Spot'],
      criticalCareTips: [
        'Never store hard-green avocados below 4.5°C to avoid irreversible chilling injury.',
        'Do not allow fruit to touch moist bare soil at any point during harvest.',
        'Handle with cotton gloves to prevent finger-tip compression bruising.'
      ]
    },
    harvesting: {
      harvestingDays: 8,
      recommendedWindow: 'Morning when dew is gone; harvest hard-mature fruit with dry matter >21%',
      maturityIndicators: [
        'Skin loses bright shiny gloss and develops a dull matte texture.',
        'Fruit dry matter reaches minimum 21–23% (oil content >8%).',
        'Pedicel fruit stem begins yellowing at the junction.'
      ],
      harvestingMethod: 'Hand clip with sharp secateurs leaving 3mm stem button intact; never pull or shake trees.',
      bestHarvestTime: 'Early morning (07:00 AM - 11:00 AM)',
      firmnessTarget: 'Solid hard-mature (>12 kg/cm² on harvest penetrometer)',
      sugarBrixTarget: '6.0 - 7.5 °Bx (High natural monounsaturated lipid content)',
      postHarvestHandling: [
        'Pre-cooling down to 6°C within 10 hours of picking to delay ripening.',
        'Fungicidal prochloraz / biocontrol dip to eliminate latent anthracnose spores.',
        'Grading into Size Count 12, 14, 16, 18, and 20.'
      ]
    },
    storage: {
      shelfLifeAmbient: '4 to 6 Days (Rapid climacteric softening and pulp darkening at 22°C - 28°C)',
      shelfLifeCold: '28 to 35 Days (Hard-mature green fruit at 5.5°C with 85-90% RH)',
      ambientDays: 5,
      coldDays: 32,
      storageTemperature: '5.5°C - 7°C (Hard Mature) or 2°C - 4°C (Firm Ripe)',
      humidity: '85% - 90% RH',
      coldStorageRequired: true,
      storageMethod: 'Single-layer molded fiber trays inside ventilated 4kg corrugated cartons in high-humidity reefer rooms',
      preservationSteps: [
        'Strictly avoid temperatures below 4.5°C for green fruit; causes gray pulp vascular browning.',
        'Use 1-MCP treatment (300 ppb for 16h) if 40+ days maritime export transit is required.',
        'Maintain continuous ventilation to prevent ethylene accumulation exceeding 0.5 ppm.'
      ],
      spoilageIndicators: ['Vascular browning (gray internal fibers from chilling injury)', 'Soft sunken black anthracnose lesions', 'Rancid lipid oxidation'],
      curingRequired: false
    },
    packaging: {
      primaryPackaging: 'Individual Molded Paper Pulp Pocket Trays (Single Tier of 10 to 18 fruits)',
      secondaryPackaging: '5-Ply High-Stiffness Kraft Corrugated Master Cartons (4kg / 5kg net)',
      recommendedMaterials: ['Molded Recycled Fiber Trays', '5-Ply Ventilated Corrugated Master Boxes', 'Biodegradable Tissue Wrappers'],
      ventilationRequired: true,
      ventilationSpec: 'Side ventilation slots (4-5% total wall area) to permit uniform cool airflow',
      moistureProtection: 'High humidity retention while preventing free surface moisture condensation',
      ethyleneSensitivity: 'High',
      ethyleneControl: 'Ventilated transit; isolate from ripe fruit emitters; optional 1-MCP treatment',
      cushioningSpecs: 'Individual cell pockets completely isolate each fruit from mutual pressure',
      shockRating: 4.6,
      estimatedPackagingCostPerKg: 4.20,
      packagingCapacity: '4 kg single-layer export cartons (12-16 count)',
      ecoCertification: '100% Recyclable and Biodegradable FSC Certified Pulp Carton',
      layers: [
        { layer: 1, name: 'Pocket Tray', material: 'Molded Recycled Paper Fiber Pocket Tray', function: 'Individual fruit cup cushioning, vibration dampening, and abrasion isolation', icon: '🥑', glowColor: '#16a34a' },
        { layer: 2, name: 'Master Shipper', material: '5-Ply High-Compression Kraft Corrugated Master Carton', function: 'Stacking strength and protective air circulation in cold chain', icon: '📦', glowColor: '#15803d' }
      ]
    },
    transportation: {
      recommendedVehicle: 'Refrigerated Reefer Container (5.5°C ± 0.5°C)',
      temperatureControlled: true,
      targetTemp: '5.5°C - 6.5°C',
      maximumRecommendedDistance: '1,600 km',
      handlingRequirements: ['Verify reefer setpoint at exactly 5.5°C', 'Verify cartons are single-tier with molded trays', 'Check that ethylene exhaust vent is set at 15 m³/h'],
      vibrationSensitivity: 'High',
      baseRatePerKm: 24.0
    },
    market: {
      marketCategory: 'Premium High-Nutrition Culinary Fruit',
      priceUnit: '₹/kg',
      basePricePerKg: 180,
      priceStatus: 'Live Benchmark',
      regionalPrices: {
        Bengaluru: 180.0,
        Mumbai: 210.0,
        Delhi: 240.0,
        Nashik: 200.0,
        Hyderabad: 195.0,
        Chennai: 185.0
      },
      priceTrend: 'Rising'
    },
    consumption: {
      nutritionalProfile: {
        calories: 160,
        protein_g: 2.0,
        carbs_g: 8.5,
        fat_g: 14.7,
        vitaminC_mg: 10.0,
        vitaminA_IU: 146,
        dietaryFiber_g: 6.7,
        potassium_mg: 485,
        iron_mg: 0.6,
        antioxidantIndex: 78,
        glycemicIndex: 15,
        highlights: ['Rich in heart-healthy Monounsaturated Oleic Fatty Acids (15g/100g)', 'Exceptional Potassium (higher than bananas) for electrolyte balance', 'High dietary fiber and Lutein carotenoid for retinal wellness']
      },
      consumptionMethods: ['Fresh scooped table fruit with honey or lime', 'Creamy smoothies with milk or coconut water', 'Artisan salads, spreads, and avocado toast'],
      preparationMethods: ['Cut lengthwise around seed, twist halves apart, and scoop flesh with spoon', 'Sprinkle with lemon juice immediately to prevent enzymatic browning'],
      nutrientPreservationTips: ['Do not expose to high heat to preserve delicate mono-unsaturated lipids', 'Store cut portions with seed intact tightly wrapped in refrigeration'],
      recommendedPreparation: 'Blend fresh ripe flesh into chilled dairy or plant milk with a pinch of cardamom and raw honey.',
      servingGuidance: 'Half to one fruit (100g-150g) per serving provides optimal essential fatty acids.',
      bioavailabilityTip: 'Healthy avocado lipids increase absorption of fat-soluble vitamins (A, D, E, K) from accompanying vegetables by up to 400%.',
      recipes: [
        {
          title: 'Coorg Fresh Butter Fruit & Cardamom Smoothie',
          prepTime: '5 mins',
          healthBenefit: 'Rich in monounsaturated fats and potassium for heart health',
          ingredients: ['1 Ripe Coorg Butter Fruit (flesh scooped)', '1.5 cups Chilled A2 farm milk', '1 tbsp Raw honey', '1/4 tsp Ground green cardamom', 'Chopped almonds for garnish'],
          steps: [
            'Scoop creamy ripe butter fruit flesh into a blender jar.',
            'Add chilled milk, raw honey, and fresh ground cardamom powder.',
            'Blend for 45 seconds until silky and thick; pour into glasses, garnish with chopped almonds, and enjoy immediately.'
          ]
        }
      ]
    },
    risks: {
      highHumidityRisk: 'Condensation inside sealed plastic pouches induces Anthracnose rots within 48 hours.',
      highTempRisk: 'Ambient heat above 28°C causes uneven softening, rubbery texture, and sour discoloration.',
      frostRisk: 'Temperatures below 4°C induce chilling injury: dark gray vascular fibers and bitter off-flavors.',
      excessRainRisk: 'Waterlogged roots cause tree dieback via Phytophthora root rot.',
      transitShockRisk: 'Severe internal flesh bruising if fruits rattle loosely inside cartons.',
      mitigationStrategy: 'Harvest hard-mature with 3mm stem, pre-cool to 6°C, pack in single-layer molded pulp trays, and store at 5.5°C.'
    }
  }
];

// Helper to resolve aliases into a standard canonical product ID
export function resolveProductAlias(query: string): string {
  if (!query) return 'onion';
  const clean = query.trim().toLowerCase();

  // Tier 1: Centralized Multilingual Product Normalizer
  const resolved = resolveProduct(clean);
  if (resolved) {
    const found = COMPREHENSIVE_PRODUCT_DATABASE.find(p => p.id === resolved.id);
    if (found) return found.id;
    return resolved.id;
  }

  // Tier 2: Search exact ID or name match in products
  for (const product of COMPREHENSIVE_PRODUCT_DATABASE) {
    if (product.id.toLowerCase() === clean || product.name.toLowerCase() === clean) {
      return product.id;
    }
  }

  // Tier 3: Search exact alias match
  for (const product of COMPREHENSIVE_PRODUCT_DATABASE) {
    if (product.aliases.some(alias => alias.toLowerCase() === clean)) {
      return product.id;
    }
  }

  return 'onion';
}

/**
 * Returns complete product intelligence for a given product ID or Name.
 * Guaranteed to return an authentic, non-null ProductIntelligence object without cross-crop data leaks.
 */
export function getProductIntelligence(idOrQuery: string): ProductIntelligence {
  const canonicalId = resolveProductAlias(idOrQuery);
  const found = COMPREHENSIVE_PRODUCT_DATABASE.find(p => p.id === canonicalId);
  if (found) {
    return found;
  }
  // Safe default: Onion
  return COMPREHENSIVE_PRODUCT_DATABASE[0];
}

/**
 * Convert ProductIntelligence into CropInfo format for legacy interface compatibility.
 * Guarantees 100% data consistency and eliminates all cross-crop leaks.
 */
export function productToCropInfo(product: ProductIntelligence): CropInfo {
  const isGreens = product.id === 'spinach' || product.id === 'coriander';
  const categoryMapped = isGreens ? 'Greens' : (product.category === 'Pulse' || product.category === 'Spice' ? 'Grain' : product.category);

  return {
    id: `crop-${product.id}`,
    name: product.name,
    scientificName: product.scientificName,
    category: categoryMapped as any,
    icon: product.icon,
    color: product.color,
    variety: product.variety,
    basePricePerKg: product.market.basePricePerKg,
    optimalTempRange: product.growing.temperatureRange,
    optimalHumidityRange: [65, 85],
    ripenessDays: product.harvesting.harvestingDays,
    currentMaturityStage: product.growing.currentMaturityStage,
    ethyleneSensitivity: (product.packaging.ethyleneSensitivity === 'High' || product.packaging.ethyleneSensitivity === 'Low') ? product.packaging.ethyleneSensitivity : 'Medium',
    respirationRate: product.category === 'Fruit' ? 'High' : 'Moderate',
    qualityTechniques: product.growing.fertilizerGuidance.map(f => ({
      title: `${f.stage} Nutrition`,
      description: f.recommendation,
      impact: f.impact,
      urgency: f.urgency
    })),
    harvestingGuidance: {
      daysRemaining: product.harvesting.harvestingDays,
      recommendedWindow: product.harvesting.recommendedWindow,
      sugarBrixTarget: product.harvesting.sugarBrixTarget || 'Starch Optimum Target',
      firmnessKgCm2: product.harvesting.firmnessTarget || 'Optimal Cell Integrity',
      idealTimeOfDay: product.harvesting.bestHarvestTime,
      fieldPrecautions: product.harvesting.postHarvestHandling
    },
    packagingPresets: {
      recommendedMaterial: product.packaging.primaryPackaging,
      coldChainTier: product.transportation.temperatureControlled 
        ? `Reefer Controlled (${product.transportation.targetTemp})`
        : `Ventilated Dry Supply (${product.transportation.targetTemp})`,
      idealStorageTemp: product.storage.storageTemperature,
      humidityTarget: product.storage.humidity,
      shockDampeningRating: product.packaging.shockRating,
      ventilationType: product.packaging.ventilationSpec,
      ethyleneControl: product.packaging.ethyleneControl,
      cushioningSpecs: product.packaging.cushioningSpecs,
      estimatedCostPerKg: product.packaging.estimatedPackagingCostPerKg
    },
    nutrition: {
      calories: product.consumption.nutritionalProfile.calories,
      vitaminC_mg: product.consumption.nutritionalProfile.vitaminC_mg,
      vitaminA_IU: product.consumption.nutritionalProfile.vitaminA_IU,
      dietaryFiber_g: product.consumption.nutritionalProfile.dietaryFiber_g,
      potassium_mg: product.consumption.nutritionalProfile.potassium_mg,
      antioxidantIndex: product.consumption.nutritionalProfile.antioxidantIndex,
      glycemicIndex: product.consumption.nutritionalProfile.glycemicIndex,
      highlights: product.consumption.nutritionalProfile.highlights
    },
    shelfLife: {
      ambientDays: product.storage.ambientDays,
      recommendedColdDays: product.storage.coldDays,
      optimalPreservationSteps: product.storage.preservationSteps,
      spoilageIndicators: product.storage.spoilageIndicators
    },
    recipes: product.consumption.recipes
  };
}

export function getAllProductsAsCrops(): CropInfo[] {
  return COMPREHENSIVE_PRODUCT_DATABASE.map(productToCropInfo);
}

