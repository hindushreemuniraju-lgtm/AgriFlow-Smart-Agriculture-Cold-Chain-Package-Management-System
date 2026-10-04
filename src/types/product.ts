export type ProductCategory = 'Vegetable' | 'Fruit' | 'Grain' | 'Pulse' | 'Dry Fruit' | 'Spice';

export interface FertilizerStage {
  stage: string;
  recommendation: string;
  impact: string;
  urgency: 'Immediate' | 'Scheduled' | 'Monitoring';
}

export interface PackagingLayerSpec {
  layer: number;
  name: string;
  material: string;
  function: string;
  icon: string;
  glowColor: string;
}

export interface PackingStepSpec {
  step: number;
  title: string;
  description: string;
}

export interface RecipeSpec {
  title: string;
  prepTime: string;
  healthBenefit: string;
  ingredients: string[];
  steps: string[];
}

export interface ProductIntelligence {
  // 1. Basic Product Info
  id: string;
  name: string;
  category: ProductCategory;
  subcategory: string;
  scientificName: string;
  variety: string;
  description: string;
  icon: string;
  color: string;
  aliases: string[]; // e.g. ["onion", "pyaz", "kanda", "allium cepa"]

  // Images
  images: {
    productImage: string;
    productImageAlt: string;
    growingImage?: string;
    harvestingImage?: string;
    packagingImage?: string;
    consumptionImage?: string;
  };

  // 2. Growing / Cultivation Guide
  growing: {
    climate: string;
    soil: string;
    idealSoilPh: string;
    temperatureRange: [number, number]; // [min, max] in Celsius
    rainfallRequirement: string;
    sowingMethod: string; // e.g. "Direct Sowing" / "Nursery Transplanting" / "Grafted Sapling Orchard"
    sowingSeason: string; // e.g. "Kharif (June-July) & Rabi (Oct-Nov)"
    seedRequirement: string; // e.g. "8-10 kg/hectare for seeds" or "100 grafted saplings/acre"
    spacing: string; // e.g. "15 cm x 10 cm" or "8m x 8m orchard grid"
    growthDuration: string; // e.g. "120 - 150 days from transplanting"
    growthDays: number;
    currentMaturityStage: number; // 0 - 100%
    irrigation: string;
    fertilizerGuidance: FertilizerStage[];
    commonPests: string[];
    diseaseRisks: string[];
    criticalCareTips: string[];
  };

  // 3. Harvesting & Maturity
  harvesting: {
    harvestingDays: number; // days remaining to harvest
    recommendedWindow: string;
    maturityIndicators: string[];
    harvestingMethod: string;
    bestHarvestTime: string;
    sugarBrixTarget?: string;
    firmnessTarget?: string;
    postHarvestHandling: string[];
  };

  // 4. Storage & Preservation
  storage: {
    shelfLifeAmbient: string;
    shelfLifeCold: string;
    ambientDays: number;
    coldDays: number;
    storageTemperature: string;
    humidity: string;
    coldStorageRequired: boolean;
    storageMethod: string;
    preservationSteps: string[];
    spoilageIndicators: string[];
    curingRequired: boolean;
    curingInstructions?: string;
  };

  // 5. Packaging Architecture
  packaging: {
    primaryPackaging: string;
    secondaryPackaging: string;
    recommendedMaterials: string[];
    ventilationRequired: boolean;
    ventilationSpec: string;
    moistureProtection: string;
    ethyleneSensitivity: 'High' | 'Medium' | 'Low';
    ethyleneControl: string;
    cushioningSpecs: string;
    shockRating: number; // 1.0 - 5.0
    estimatedPackagingCostPerKg: number;
    packagingCapacity: string;
    ecoCertification: string;
    layers: PackagingLayerSpec[];
    packingSteps: PackingStepSpec[];
  };

  // 6. Transportation & Cold-Chain
  transportation: {
    recommendedVehicle: string;
    temperatureControlled: boolean;
    targetTemp: string;
    maximumRecommendedDistance: string;
    handlingRequirements: string[];
    vibrationSensitivity: 'High' | 'Moderate' | 'Low';
    baseRatePerKm: number;
  };

  // 7. Market Intelligence & Pricing
  market: {
    marketCategory: string; // e.g. "Essential Allium Commodity" / "Premium Export Table Fruit"
    priceUnit: string; // e.g. "₹/kg" or "₹/quintal"
    basePricePerKg: number;
    priceStatus: 'Live Benchmark' | 'Estimated APMC' | 'Export Grade-A';
    regionalPrices: {
      Bengaluru: number;
      Mumbai: number;
      Delhi: number;
      Nashik: number;
      Hyderabad: number;
      Chennai: number;
    };
    priceTrend: 'Rising' | 'Stable' | 'Falling';
  };

  // 8. Consumption & Nutrition
  consumption: {
    nutritionalProfile: {
      calories: number;
      protein_g: number;
      carbs_g: number;
      fat_g: number;
      vitaminC_mg: number;
      vitaminA_IU: number;
      dietaryFiber_g: number;
      potassium_mg: number;
      iron_mg: number;
      antioxidantIndex: number;
      glycemicIndex: number;
      highlights: string[];
    };
    consumptionMethods: string[];
    preparationMethods: string[];
    nutrientPreservationTips: string[];
    recommendedPreparation: string;
    servingGuidance: string;
    bioavailabilityTip: string;
    recipes: RecipeSpec[];
  };

  // 9. Environmental Risk & Weather Analysis
  risks: {
    highHumidityRisk: string;
    highTempRisk: string;
    frostRisk: string;
    excessRainRisk: string;
    transitShockRisk: string;
    mitigationStrategy: string;
  };
}
