export type LanguageCode = 'en' | 'hi' | 'kn' | 'te' | 'ta' | 'mr' | 'pa';

export type UserRole = 'farmer' | 'logistics' | 'customer';

export interface CropInfo {
  id: string;
  name: string;
  scientificName: string;
  category: 'Fruit' | 'Vegetable' | 'Grain' | 'Greens' | 'Dry Fruit';
  icon: string;
  color: string;
  variety: string;
  basePricePerKg: number;
  optimalTempRange: [number, number];
  optimalHumidityRange: [number, number];
  ripenessDays: number;
  currentMaturityStage: number;
  ethyleneSensitivity: 'High' | 'Medium' | 'Low';
  respirationRate: 'High' | 'Moderate' | 'Low';
  qualityTechniques: {
    title: string;
    description: string;
    impact: string;
    urgency: 'Immediate' | 'Scheduled' | 'Monitoring';
  }[];
  harvestingGuidance: {
    daysRemaining: number;
    recommendedWindow: string;
    sugarBrixTarget: string;
    firmnessKgCm2: string;
    idealTimeOfDay: string;
    fieldPrecautions: string[];
  };
  packagingPresets: {
    recommendedMaterial: string;
    coldChainTier: string;
    idealStorageTemp: string;
    humidityTarget: string;
    shockDampeningRating: number;
    ventilationType: string;
    ethyleneControl: string;
    cushioningSpecs: string;
    estimatedCostPerKg: number;
  };
  nutrition: {
    calories: number;
    vitaminC_mg: number;
    vitaminA_IU: number;
    dietaryFiber_g: number;
    potassium_mg: number;
    antioxidantIndex: number;
    glycemicIndex: number;
    highlights: string[];
  };
  shelfLife: {
    ambientDays: number;
    recommendedColdDays: number;
    optimalPreservationSteps: string[];
    spoilageIndicators: string[];
  };
  recipes: {
    title: string;
    prepTime: string;
    healthBenefit: string;
    ingredients: string[];
    steps: string[];
  }[];
}

export interface PackagingRecommendation {
  cropId: string;
  cropName: string;
  targetMarket: string;
  distanceKm: number;
  estimatedTransitHours: number;
  packagingMaterial: string;
  cushioningSystem: string;
  coldChainTier: string;
  idealTempRange: string;
  idealHumidity: string;
  shockAbsorptionRating: number;
  ventilationSpec: string;
  ethyleneManagement: string;
  ecoCertification: string;
  costBreakdown: {
    perKg: string;
    perBox: string;
    spoilagePreventionSavings: string;
  };
  layers: {
    layer: number;
    name: string;
    material: string;
    function: string;
    icon: string;
    glowColor: string;
  }[];
  packingSteps: {
    step: number;
    title: string;
    description: string;
  }[];
}

export interface FarmerOrder {
  id: string;
  batchId: string;
  cropId: string;
  cropName: string;
  variety: string;
  icon: string;
  farmerName: string;
  farmerPhone: string;
  farmLocation: string;
  destination: string;
  distanceKm: number;
  weightKg: number;
  boxesCount: number;
  targetMarket: 'Local Mandi' | 'Supermarket Chain' | 'Export' | 'Processing Plant';
  pickupWindow: string;
  specialHandling: string[];
  harvestDate: string;
  status: 'Requested' | 'Assigned' | 'In Transit' | 'Delivered';
  driverId?: string;
  driverName?: string;
  driverPhone?: string;
  vehicleType?: string;
  vehicleNumber?: string;
  fairPriceEstimated: number;
  actualPrice?: number;
  packagingSpec: {
    material: string;
    temperatureTier: string;
    targetTemp: string;
    shockRating: number;
    ventilation: string;
    ethyleneAbsorption: string;
    ecoScore: string;
    costPerUnit: number;
  };
  telemetry?: {
    currentLat: number;
    currentLng: number;
    reeferTemp: number;
    humidity: number;
    speedKmph: number;
    etaMinutes: number;
    currentStage: string;
  };
}

export interface DriverPartner {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  rating: number;
  totalTrips: number;
  vehicleType: string;
  vehicleNumber: string;
  capacityKg: number;
  currentLoadKg: number;
  tempControlled: boolean;
  reeferRange: string;
  baseRatePerKm: number;
  currentLocation: string;
  status: 'Available' | 'On Route' | 'Resting';
  badges: string[];
}

export interface ProductPassport {
  batchId: string;
  verifiedBadge: string;
  verificationHash: string;
  crop: {
    id: string;
    name: string;
    variety: string;
    icon: string;
    category: string;
    scientificName: string;
  };
  origin: {
    farmerName: string;
    farmerPhone: string;
    farmLocation: string;
    soilHealthScore: string;
    chemicalResidueStatus: string;
    harvestTimestamp: string;
  };
  coldChainLog: {
    stage: string;
    timestamp: string;
    temperature: string;
    status: string;
  }[];
  shelfLifeStatus: {
    ambientDaysRemaining: number;
    refrigeratedDaysRemaining: number;
    freshnessIndexPercent: number;
    spoilageIndicators: string[];
    homePreservationSteps: string[];
  };
  nutritionalBreakdown: {
    calories: number;
    vitaminC_mg: number;
    vitaminA_IU: number;
    dietaryFiber_g: number;
    potassium_mg: number;
    antioxidantIndex: number;
    glycemicIndex: number;
    highlights: string[];
  };
  optimalConsumption: {
    bioavailabilityTip: string;
    recipes: {
      title: string;
      prepTime: string;
      healthBenefit: string;
      ingredients: string[];
      steps: string[];
    }[];
  };
}
