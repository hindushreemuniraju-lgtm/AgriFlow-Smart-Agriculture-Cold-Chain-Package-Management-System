/**
 * FoodPack AI - Unified TypeScript Data Models & Contracts
 * AI-Powered Sustainable Food Packaging Recommendation System
 */

export type CommodityCategory = 'Vegetable' | 'Fruit' | 'Dairy' | 'Dry Fruit' | 'Grain' | 'Pulse' | 'Spice' | 'Flour' | 'Other';

export type StorageCondition = 'Ambient' | 'Refrigerated' | 'Cold Chain' | 'Frozen' | 'Humidity Controlled';

export type TransportationCondition = 'Local' | 'Truck' | 'Refrigerated Truck' | 'Long Distance' | 'Air' | 'Rail';

export type ShelfLifeOption = '1–3 days' | '4–7 days' | '1–2 weeks' | '2–4 weeks' | 'Custom';

export type QuantityUnit = 'kg' | 'ton' | 'pieces' | 'crates';

export type ComplianceStatus = 'COMPLIANT_DATA_AVAILABLE' | 'REVIEW_REQUIRED' | 'INSUFFICIENT_DATA' | 'NOT_RECOMMENDED';

export type VerificationStatus = 'VERIFIED_OFFICIAL_STANDARD' | 'ESTIMATED_TECHNICAL_DATA' | 'REVIEW_PENDING';

export interface UserPriorityWeights {
  costWeight: number; // 0 - 100
  safetyWeight: number; // 0 - 100
  shelfLifeWeight: number; // 0 - 100
  sustainabilityWeight: number; // 0 - 100
  durabilityWeight: number; // 0 - 100
  wasteWeight: number; // 0 - 100
}

export interface FoodPackRequirements {
  commodity: string;
  normalizedCommodity: string;
  category: CommodityCategory;
  quantity: number;
  quantityUnit: QuantityUnit;
  quantityKg: number;
  storage: StorageCondition;
  transport: TransportationCondition;
  desiredShelfLife: ShelfLifeOption;
  desiredShelfLifeDays: number;
  userPriorities: UserPriorityWeights;
  fssaiVerifiedFbo?: FssaiVerifiedDetails;
  customCommodity?: string;
  shelfLife?: string;
  unit?: string;
}

export interface FoodPackagingMaterial {
  id: string;
  name: string;
  code: string;
  category: string;
  icon: string;
  color: string;
  description: string;
  suitableCommodities: string[];
  unsuitableCommodities: string[];
  foodContactSafety: string;
  moistureBarrier: {
    wvtrRange: string;
    wvtrAvg: number; // g/m2/day (lower is tighter)
    tier: 'Ultra-High' | 'High' | 'Medium' | 'Low' | 'Porous';
  };
  oxygenBarrier: {
    otrRange: string;
    otrAvg: number; // cm3/m2/day (lower is tighter)
    tier: 'Ultra-High' | 'High' | 'Medium' | 'Low' | 'Breathable';
  };
  durability: {
    rating: number; // 1 to 10
    punctureResistanceJoules: number;
    tensileStrengthMpa: number;
    stackingCompressionKg: number;
  };
  temperatureRange: {
    minTempC: number;
    maxTempC: number;
  };
  shelfLifeSuitabilityDays: {
    min: number;
    max: number;
  };
  unitCapacityKg: number;
  estimatedCostPerUnit: number; // in INR
  estimatedCostPerKg: number; // in INR per kg of food packed
  recyclability: {
    isRecyclable: boolean;
    recyclabilityScore: number; // 0-100
    class: string;
    symbol: string;
  };
  biodegradability: {
    isBiodegradable: boolean;
    degradationTimeDays?: number;
    standard?: string;
  };
  reusability: {
    isReusable: boolean;
    typicalReuseCycles: number;
  };
  compostability: {
    isCompostable: boolean;
    tier?: 'Home Compostable' | 'Industrial Compostable' | 'Not Compostable';
    certification?: string;
  };
  wasteScore: number; // 0 to 100 (100 = least waste)
  sustainabilityScore: number; // 0 to 100 (100 = most eco-friendly)
  foodSafetyScore: number; // 0 to 100
  complianceStatus: ComplianceStatus;
  transportSuitability: TransportationCondition[];
  storageSuitability: StorageCondition[];
  advantages: string[];
  disadvantages: string[];
  criticalFailureNotes?: string;
  fssaiStandardRef: string;
  source: string;
  sourceUrl: string;
  lastUpdated: string;
  verificationStatus: VerificationStatus;
}

export interface MaterialScoreBreakdown {
  materialId: string;
  materialName: string;
  overallScore: number; // 0 - 100
  foodSafetyScore: number; // 0 - 100
  shelfLifeScore: number; // 0 - 100
  sustainabilityScore: number; // 0 - 100
  costScore: number; // 0 - 100
  durabilityScore: number; // 0 - 100
  wasteScore: number; // 0 - 100
  confidenceScore: number; // 0 - 100
  suitabilityFlags: {
    commodityMatched: boolean;
    storageMatched: boolean;
    transportMatched: boolean;
    shelfLifeSufficient: boolean;
    temperatureSafe: boolean;
  };
}

export interface CostCalculationResult {
  totalQuantityKg: number;
  packageCapacityKg: number;
  packagesRequired: number;
  costPerPackage: number;
  estimatedTotalCost: number;
  costPerKgFood: number;
  isLiveMarketPrice: boolean;
  priceNote: string;
  totalCostInr?: number;
  unitsRequired?: number;
  costPerKgProduct?: number;
}

export interface WasteAnalysisResult {
  wasteGeneratedKg: number;
  wasteReductionPercent: number;
  isReusable: boolean;
  reuseCycles: number;
  isRecyclable: boolean;
  isBiodegradable: boolean;
  isCompostable: boolean;
  circularityPotential: string;
  carbonFootprintEstimateGCo2ePerKg: number;
  totalWasteKg?: number;
  circularityRating?: string;
}

export interface FssaiRegulationDoc {
  id: string;
  regulationReference: string;
  materialCategory: string;
  requirement: string;
  restriction: string;
  applicability: string;
  complianceStatus: ComplianceStatus;
  source: string;
  sourceUrl: string;
  publicationDate: string;
  lastVerified: string;
  verificationStatus: VerificationStatus;
}

export interface FoodPackRecommendation {
  id: string;
  requirements: FoodPackRequirements;
  recommendedMaterial: FoodPackagingMaterial;
  topRecommendation?: {
    material: FoodPackagingMaterial;
    scores: MaterialScoreBreakdown;
    scoreBreakdown: {
      overallScore: number;
      safetyScore: number;
      shelfLifeScore: number;
      sustainabilityScore: number;
      costScore: number;
      durabilityScore: number;
      wasteScore: number;
    };
    overallScore: number;
    costAnalysis: CostCalculationResult;
  };
  rankedMaterials?: Array<{
    material: FoodPackagingMaterial;
    scores: MaterialScoreBreakdown;
    overallScore: number;
    costAnalysis: CostCalculationResult;
    rank: number;
  }>;
  scores: MaterialScoreBreakdown;
  whyExplanation: {
    headline: string;
    bulletPoints: string[];
    technicalRationale: string;
    tradeoffs: string;
  } | string;
  aiConfidencePercent: number;
  aiConfidenceLabel: 'HIGH' | 'GOOD' | 'NEEDS_CONFIRMATION' | 'UNCERTAIN';
  aiConfidence?: {
    score: number;
    label: string;
    factors: any;
  };
  confidenceFactors: {
    inputCompleteness: number; // 0-100
    materialDataQuality: number; // 0-100
    complianceAvailability: number; // 0-100
    compatibilityAgreement: number; // 0-100
    calculationFormula: string;
  };
  costAnalysis: CostCalculationResult;
  wasteAnalysis: WasteAnalysisResult;
  ecoScore: {
    overallEcoScore: number;
    recyclabilityIndex: number;
    reusabilityIndex: number;
    biodegradabilityIndex: number;
    plasticReductionPercent: number;
    circularityRating: string;
  };
  alternatives: {
    material: FoodPackagingMaterial;
    scores: MaterialScoreBreakdown;
    costAnalysis: CostCalculationResult;
    highlightBadge?: string;
  }[];
  fssaiCompliance: {
    status: ComplianceStatus;
    regulationReference: string;
    requirement: string;
    source: string;
    sourceUrl: string;
    lastVerified: string;
  } | any;
  sources: {
    name: string;
    type: 'GOVERNMENT' | 'REGULATORY' | 'INTERNATIONAL' | 'STANDARDS';
    url: string;
    lastUpdated: string;
  }[];
  timestamp: string;
}

export interface FoodDetectionItem {
  name: string;
  normalizedName: string;
  category: CommodityCategory;
  subcategory?: string;
  confidence: number;
  quantityEstimate?: string | null;
  freshness?: 'Fresh-looking' | 'Possibly ripe' | 'Possibly overripe' | 'Visible damage' | 'Unknown';
  quality?: string;
  bbox?: [number, number, number, number] | null; // [ymin, xmin, ymax, xmax]
}

export interface FoodDetectionResult {
  success: boolean;
  isFood: boolean;
  items: FoodDetectionItem[];
  primaryItem: FoodDetectionItem | null;
  overallConfidence: number;
  needsConfirmation: boolean;
  isNonFoodOrBlurry: boolean;
  rejectionReason: string | null;
  visualEvidence: string[];
  source: string;
  timestamp: string;
  imageHash?: string;
  imagePhash?: string;
  imageThumbnail?: string;
  isLearnedCorrection?: boolean;
  usdaEnrichment?: {
    fdcId?: number;
    description?: string;
    waterContentPercent?: number;
    proteinG?: number;
    carbsG?: number;
    sugarsG?: number;
    respirationCategory?: string;
  };
  error?: string;
}

export interface FoodPackHistoryRecord {
  id: string;
  date: string;
  commodity: string;
  quantityKg: number;
  storage: StorageCondition;
  transport: TransportationCondition;
  desiredShelfLife: string;
  recommendedMaterialName: string;
  recommendedMaterialId: string;
  overallScore: number;
  estimatedCost: number;
  ecoScore: number;
  costPerKg: number;
}

export interface FoodPackAnalyticsSummary {
  totalRecommendationsCount: number;
  averagePackagingCostPerKg: number;
  averageEcoScore: number;
  estimatedWasteReductionPercent: number;
  mostRecommendedMaterials: { name: string; count: number; percentage: number }[];
  costVsSustainabilityPoints: { name: string; costPerKg: number; ecoScore: number }[];
}

export type FssaiVerificationStatus = 'VERIFIED' | 'NOT_FOUND' | 'UNABLE_TO_VERIFY' | 'INVALID_FORMAT';

export interface FssaiVerifiedDetails {
  fssaiNumber: string;
  fboName: string;
  kindOfBusiness: string;
  licenseType: 'Central License' | 'State License' | 'Registration (Basic)';
  stateCode: string;
  stateName: string;
  issueDate: string;
  expiryDate?: string;
  validityStatus: 'ACTIVE' | 'INACTIVE' | 'EXPIRED' | 'SUSPENDED';
  validityLabel: string;
  foodCategories: string[];
  premisesAddress?: string;
  district?: string;
  certificateRef?: string;
  source: 'Official FSSAI FoSCoS';
  sourceUrl: string;
  officialRecordUrl: string;
  verificationTimestamp: string;
  isCompliantWithCommodity?: boolean;
  complianceNotes?: string;
}

export interface FssaiVerificationResult {
  success: boolean;
  status: FssaiVerificationStatus;
  fssaiNumber: string;
  message: string;
  data?: FssaiVerifiedDetails;
  timestamp: string;
  cached?: boolean;
}

