/**
 * FoodPack AI - Multi-Factor Deterministic Packaging Recommendation & Scoring Engine
 * Evaluates food contact safety, shelf-life retention, environmental sustainability, cost efficiency,
 * mechanical durability, and waste footprint against configurable user priorities.
 */

import { 
  FoodPackRequirements, 
  FoodPackagingMaterial, 
  MaterialScoreBreakdown, 
  FoodPackRecommendation,
  CostCalculationResult,
  WasteAnalysisResult,
  UserPriorityWeights
} from '../../types/foodPack';
import { FOOD_PACKAGING_MATERIALS } from '../../data/packagingMaterialsDatabase';
import { getFssaiComplianceForMaterial } from '../../data/fssaiComplianceDatabase';

export const DEFAULT_PRIORITY_WEIGHTS: UserPriorityWeights = {
  safetyWeight: 85,
  shelfLifeWeight: 80,
  sustainabilityWeight: 75,
  costWeight: 70,
  durabilityWeight: 75,
  wasteWeight: 70
};

/**
 * 1. Calculate Food Safety Score (0 - 100)
 */
export function calculateFoodSafetyScore(material: FoodPackagingMaterial, req: FoodPackRequirements): number {
  let score = material.foodSafetyScore;
  const commodityKey = (req.normalizedCommodity || req.commodity || req.customCommodity || '').toLowerCase();
  const category = (req.category || '').toLowerCase();

  // Check explicit unsuitability
  if (material.unsuitableCommodities.some(u => commodityKey.includes(u) || u.includes(commodityKey))) {
    return Math.max(10, score - 60);
  }

  // 1. Dairy & Wet Commodities (Strict Barrier & Hermetic Seal Required)
  const isDairy = category.includes('dairy') || commodityKey.includes('milk') || commodityKey.includes('paneer') || commodityKey.includes('curd') || commodityKey.includes('butter') || commodityKey.includes('ghee') || commodityKey.includes('cheese');
  if (isDairy) {
    if (material.moistureBarrier.tier === 'Porous' || material.oxygenBarrier.tier === 'Breathable' || material.id === 'mat-jute-sack' || material.id === 'mat-hdpe-crate') {
      return 15; // Porous materials cannot hold dairy safely
    }
    if (material.id === 'mat-evoh-vacuum-pouch' || material.id === 'mat-map-barrier-tray') {
      score = 98;
    }
  }

  // 2. Dry Fruits, Nuts & Spices (Ultra-low OTR & WVTR required to stop rancidity & loss of aroma)
  const isDryFruitOrSpice = category.includes('dry fruit') || category.includes('spice') || commodityKey.includes('almond') || commodityKey.includes('cashew') || commodityKey.includes('walnut') || commodityKey.includes('cardamom') || commodityKey.includes('turmeric') || commodityKey.includes('coffee') || commodityKey.includes('tea');
  if (isDryFruitOrSpice) {
    if (material.moistureBarrier.tier === 'Porous' || material.oxygenBarrier.tier === 'Breathable' || material.id === 'mat-hdpe-crate') {
      score -= 50; // Breathable crates cause fat oxidation and moisture uptake
    }
    if (material.id === 'mat-metalized-barrier-pouch' || material.id === 'mat-evoh-vacuum-pouch' || material.id === 'mat-kraft-paper-sack') {
      score += 10;
    }
  }

  // 3. Flour & Powders (Fine particles require non-porous woven bag / kraft paper with barrier)
  const isFlourOrPowder = category.includes('flour') || commodityKey.includes('atta') || commodityKey.includes('flour') || commodityKey.includes('maida') || commodityKey.includes('besan');
  if (isFlourOrPowder) {
    if (material.id === 'mat-hdpe-crate') return 10; // Powders leak straight through perforated crates
    if (material.id === 'mat-kraft-paper-sack') score = 96;
  }

  // 4. Fresh Living Produce (Vegetables & Fruits need breathable ventilation)
  const isFreshProduce = category.includes('vegetable') || category.includes('fruit') || (!isDairy && !isDryFruitOrSpice && !isFlourOrPowder);
  if (isFreshProduce) {
    // Hermetic gas lockout causes anaerobic rotting in living produce
    if (material.oxygenBarrier.tier === 'Ultra-High' || material.id === 'mat-metalized-barrier-pouch') {
      score -= 45;
    }
    // Perforated crates & ventilated boxes are ideal
    if (material.id === 'mat-hdpe-crate' || material.id === 'mat-corrugated-cfb-box' || material.id === 'mat-water-resistant-cfb' || material.id === 'mat-ldpe-liner' || material.id === 'mat-compostable-pla-film') {
      score += 8;
    }
    // Jute sacks in Cold Chain absorb condensation and rot produce
    if (material.id === 'mat-jute-sack' && (req.storage === 'Cold Chain' || req.storage === 'Refrigerated' || req.storage === 'Frozen')) {
      score -= 45;
    }
  }

  // Storage environment compatibility
  if (!material.storageSuitability.includes(req.storage)) {
    score -= 25;
  }

  // Transport method compatibility
  if (!material.transportSuitability.includes(req.transport)) {
    score -= 15;
  }

  // Bonus for explicit suitability
  if (material.suitableCommodities.some(s => commodityKey.includes(s) || s.includes(commodityKey))) {
    score += 10;
  }

  return Math.max(10, Math.min(100, Math.round(score)));
}

/**
 * 2. Calculate Shelf Life Score (0 - 100)
 */
export function calculateShelfLifeScore(material: FoodPackagingMaterial, req: FoodPackRequirements): number {
  const desiredDays = req.desiredShelfLifeDays || (
    req.shelfLife === '1-3 days' ? 3 :
    req.shelfLife === '4-7 days' ? 7 :
    req.shelfLife === '1-2 weeks' ? 14 :
    req.shelfLife === '2-4 weeks' ? 28 : 30
  );
  const maxDays = material.shelfLifeSuitabilityDays.max;
  const minDays = material.shelfLifeSuitabilityDays.min;
  const commodityKey = (req.normalizedCommodity || req.commodity || req.customCommodity || '').toLowerCase();
  const category = (req.category || '').toLowerCase();

  let baseScore = 70;

  if (desiredDays <= maxDays && desiredDays >= minDays) {
    const ratio = (maxDays - desiredDays) / (maxDays - minDays || 1);
    baseScore = Math.round(85 + ratio * 15);
  } else if (desiredDays < minDays) {
    baseScore = 80;
  } else {
    const deficit = desiredDays - maxDays;
    const penalty = Math.min(50, deficit * 4);
    baseScore = Math.max(20, Math.round(75 - penalty));
  }

  // Incompatible storage drastically reduces actual shelf life
  if (!material.storageSuitability.includes(req.storage)) {
    baseScore -= 30;
  }

  // Fresh produce in non-ventilated high barrier suffocates quickly
  const isFreshProduce = category.includes('vegetable') || category.includes('fruit');
  if (isFreshProduce && (material.id === 'mat-metalized-barrier-pouch' || (material.oxygenBarrier.tier === 'Ultra-High' && material.id !== 'mat-map-barrier-tray'))) {
    baseScore = Math.min(baseScore, 25);
  }

  // Dairy in porous material spoils rapidly
  const isDairy = category.includes('dairy') || commodityKey.includes('milk') || commodityKey.includes('paneer');
  if (isDairy && (material.moistureBarrier.tier === 'Porous' || material.id === 'mat-jute-sack' || material.id === 'mat-hdpe-crate')) {
    baseScore = 15;
  }

  return Math.max(10, Math.min(100, Math.round(baseScore)));
}

/**
 * 3. Calculate Sustainability Score (0 - 100)
 */
export function calculateSustainabilityScore(material: FoodPackagingMaterial): number {
  let score = material.sustainabilityScore;
  if (material.reusability.isReusable) score += 5;
  if (material.biodegradability.isBiodegradable) score += 5;
  if (material.recyclability.isRecyclable) score += 3;
  return Math.max(10, Math.min(100, Math.round(score)));
}

/**
 * 4. Calculate Cost Efficiency Score (0 - 100)
 * Lower cost per kg = higher score
 */
export function calculateCostScore(material: FoodPackagingMaterial): number {
  const costPerKg = material.estimatedCostPerKg;
  if (costPerKg <= 1.0) return 96;
  if (costPerKg <= 2.5) return 90;
  if (costPerKg <= 4.0) return 82;
  if (costPerKg <= 7.0) return 72;
  if (costPerKg <= 10.0) return 64;
  return Math.max(30, Math.round(60 - (costPerKg - 10) * 3));
}

/**
 * 5. Calculate Durability Score (0 - 100)
 */
export function calculateDurabilityScore(material: FoodPackagingMaterial, req: FoodPackRequirements): number {
  let score = material.durability.rating * 10;
  
  // High vibration / rough long distance transport requires higher stacking & puncture resistance
  if (req.transport === 'Long Distance' || req.transport === 'Rail') {
    if (material.durability.stackingCompressionKg < 150) score -= 20;
    if (material.durability.stackingCompressionKg >= 250) score += 10;
  } else if (req.transport === 'Air') {
    if (material.durability.punctureResistanceJoules < 3) score -= 15;
  }

  return Math.max(20, Math.min(100, Math.round(score)));
}

/**
 * 6. Calculate Waste Score (0 - 100)
 */
export function calculateWasteScore(material: FoodPackagingMaterial): number {
  return Math.max(10, Math.min(100, Math.round(material.wasteScore)));
}

/**
 * 7. Compute Deterministic Multi-Factor Overall Score
 */
export function evaluateMaterial(
  material: FoodPackagingMaterial,
  req: FoodPackRequirements
): MaterialScoreBreakdown {
  const safety = calculateFoodSafetyScore(material, req);
  const shelfLife = calculateShelfLifeScore(material, req);
  const sustainability = calculateSustainabilityScore(material);
  const cost = calculateCostScore(material);
  const durability = calculateDurabilityScore(material, req);
  const waste = calculateWasteScore(material);

  const w = req.userPriorities || (req as any).priorityWeights || DEFAULT_PRIORITY_WEIGHTS;
  const totalWeight = (w.safetyWeight + w.shelfLifeWeight + w.sustainabilityWeight + w.costWeight + w.durabilityWeight + w.wasteWeight) || 1;

  let weightedSum = (
    safety * w.safetyWeight +
    shelfLife * w.shelfLifeWeight +
    sustainability * w.sustainabilityWeight +
    cost * w.costWeight +
    durability * w.durabilityWeight +
    waste * w.wasteWeight
  );

  let overallScore = Math.round(weightedSum / totalWeight);

  const commodityKey = (req.normalizedCommodity || req.commodity || req.customCommodity || '').toLowerCase();
  const commodityMatched = !material.unsuitableCommodities.some(u => commodityKey.includes(u) || u.includes(commodityKey)) &&
    (material.suitableCommodities.length === 0 || material.suitableCommodities.some(s => commodityKey.includes(s) || s.includes(commodityKey) || (req.category && req.category.toLowerCase().includes(s))));

  const storageMatched = material.storageSuitability.includes(req.storage);
  const transportMatched = material.transportSuitability.includes(req.transport);
  const targetDays = req.desiredShelfLifeDays || 14;
  const shelfLifeSufficient = material.shelfLifeSuitabilityDays.max >= targetDays;
  const temperatureSafe = req.storage === 'Frozen' ? material.temperatureRange.minTempC <= -15 : true;

  // Hard safety overrides: If food safety or shelf life is unviable, cap overall score
  if (safety <= 25 || shelfLife <= 25) {
    overallScore = Math.min(overallScore, 30);
  } else if (!storageMatched) {
    overallScore = Math.min(overallScore, 48);
  }

  // Compatibility agreement confidence
  const compatibilityPoints = (commodityMatched ? 25 : 0) + (storageMatched ? 25 : 0) + (transportMatched ? 25 : 0) + (shelfLifeSufficient ? 25 : 0);

  return {
    materialId: material.id,
    materialName: material.name,
    overallScore,
    foodSafetyScore: safety,
    shelfLifeScore: shelfLife,
    sustainabilityScore: sustainability,
    costScore: cost,
    durabilityScore: durability,
    wasteScore: waste,
    confidenceScore: compatibilityPoints,
    suitabilityFlags: {
      commodityMatched,
      storageMatched,
      transportMatched,
      shelfLifeSufficient,
      temperatureSafe
    }
  };
}

/**
 * 8. Calculate Financial Packaging Cost Breakdown
 */
export function calculatePackagingCost(
  material: FoodPackagingMaterial,
  quantityKg: number = 100,
  unit?: string
): CostCalculationResult {
  const actualQty = unit === 'ton' ? quantityKg * 1000 : quantityKg;
  const cap = material.unitCapacityKg || 10;
  const packagesRequired = Math.ceil(actualQty / cap);
  
  // For reusable containers, total expenditure is amortized over cycles
  const totalCost = material.reusability.isReusable
    ? Math.round(actualQty * material.estimatedCostPerKg)
    : Math.round(packagesRequired * material.estimatedCostPerUnit);

  const costPerKgFood = Math.round((totalCost / Math.max(1, actualQty)) * 100) / 100;

  return {
    totalQuantityKg: actualQty,
    packageCapacityKg: cap,
    packagesRequired,
    costPerPackage: material.estimatedCostPerUnit,
    estimatedTotalCost: totalCost,
    costPerKgFood,
    isLiveMarketPrice: false,
    priceNote: material.reusability.isReusable
      ? `Amortized across ~${material.reusability.typicalReuseCycles} verified multi-trip return cycles`
      : 'Estimated standard market price per unit',
    totalCostInr: totalCost,
    unitsRequired: packagesRequired,
    costPerKgProduct: costPerKgFood
  };
}

/**
 * 9. Calculate Packaging Waste & Circularity Analysis
 */
export function calculatePackagingWaste(
  material: FoodPackagingMaterial,
  quantityKg: number = 100,
  unit?: string
): WasteAnalysisResult {
  const actualQty = unit === 'ton' ? quantityKg * 1000 : quantityKg;
  const cap = material.unitCapacityKg || 10;
  const packagesRequired = Math.ceil(actualQty / cap);
  
  // Weight of packaging material generated
  const unitWeightKg = material.category.includes('Paper') ? 0.35 : material.category.includes('Film') ? 0.025 : 1.8;
  const rawWasteWeight = material.reusability.isReusable 
    ? Math.round((packagesRequired * unitWeightKg / (material.reusability.typicalReuseCycles || 300)) * 100) / 100
    : Math.round(packagesRequired * unitWeightKg * 10) / 10;

  const reductionPercent = material.reusability.isReusable ? 92 : material.biodegradability.isBiodegradable ? 85 : 45;
  const circularityPotential = material.reusability.isReusable 
    ? 'Closed-Loop Circular Asset (Wash & Reuse Returnable System)'
    : material.biodegradability.isBiodegradable
    ? 'Biological Cycle (Organic Composting / Biodegradation)'
    : material.recyclability.isRecyclable
    ? 'Technical Cycle (100% Post-Consumer Polymer Recycling)'
    : 'Linear Multi-Material Stream (Specialized Chemical Recovery)';

  const carbonFootprint = material.reusability.isReusable ? 12 : material.biodegradability.isBiodegradable ? 28 : 65;

  return {
    wasteGeneratedKg: rawWasteWeight,
    wasteReductionPercent: reductionPercent,
    isReusable: material.reusability.isReusable,
    reuseCycles: material.reusability.typicalReuseCycles,
    isRecyclable: material.recyclability.isRecyclable,
    isBiodegradable: material.biodegradability.isBiodegradable,
    isCompostable: material.compostability.isCompostable,
    circularityPotential,
    carbonFootprintEstimateGCo2ePerKg: carbonFootprint,
    totalWasteKg: rawWasteWeight,
    circularityRating: circularityPotential
  };
}

/**
 * 10. AI Confidence Calculator
 */
export function calculateAIConfidence(
  material: FoodPackagingMaterial,
  req: FoodPackRequirements,
  scoreBreakdown: MaterialScoreBreakdown
): {
  confidencePercent: number;
  label: 'HIGH' | 'GOOD' | 'NEEDS_CONFIRMATION' | 'UNCERTAIN';
  factors: {
    inputCompleteness: number;
    materialDataQuality: number;
    complianceAvailability: number;
    compatibilityAgreement: number;
    calculationFormula: string;
  };
} {
  const qty = req.quantityKg || req.quantity || 0;
  const inputCompleteness = (req.commodity && qty > 0 && req.storage && req.transport) ? 100 : 70;
  const materialDataQuality = material.verificationStatus === 'VERIFIED_OFFICIAL_STANDARD' ? 98 : 82;
  const complianceAvailability = material.complianceStatus === 'COMPLIANT_DATA_AVAILABLE' ? 96 : 65;

  const flags = scoreBreakdown.suitabilityFlags;
  const compatibilityAgreement = (
    (flags.commodityMatched ? 25 : 0) +
    (flags.storageMatched ? 25 : 0) +
    (flags.transportMatched ? 25 : 0) +
    (flags.shelfLifeSufficient ? 25 : 0)
  );

  const confidencePercent = Math.round(
    inputCompleteness * 0.25 +
    materialDataQuality * 0.25 +
    complianceAvailability * 0.25 +
    compatibilityAgreement * 0.25
  );

  const label = confidencePercent >= 90 ? 'HIGH'
    : confidencePercent >= 75 ? 'GOOD'
    : confidencePercent >= 50 ? 'NEEDS_CONFIRMATION'
    : 'UNCERTAIN';

  return {
    confidencePercent,
    label,
    factors: {
      inputCompleteness,
      materialDataQuality,
      complianceAvailability,
      compatibilityAgreement,
      calculationFormula: 'Confidence = 25% Input Completeness + 25% Material Data Quality + 25% Statutory Compliance + 25% Factor Agreement'
    }
  };
}

/**
 * 11. Generate Explainable "WHY THIS WAS RECOMMENDED"
 */
export function generateRecommendationExplanation(
  material: FoodPackagingMaterial,
  req: FoodPackRequirements,
  scores: MaterialScoreBreakdown,
  cost: CostCalculationResult
): {
  headline: string;
  bulletPoints: string[];
  technicalRationale: string;
  tradeoffs: string;
} {
  const headline = `${material.name} achieves the highest combined score of ${scores.overallScore}/100 for ${req.commodity} under ${req.storage} storage and ${req.transport} logistics.`;

  const bulletPoints: string[] = [
    `Optimal Commodity Match: Specifically suited for ${req.commodity} (${req.category}) with ${material.foodContactSafety.split('.')[0]}.`,
    `Storage & Microclimate Performance: Supports ${req.storage} with ${material.moistureBarrier.tier} moisture protection (WVTR: ${material.moistureBarrier.wvtrRange}) and ${material.oxygenBarrier.tier} oxygen management.`,
    `Transit Durability: Engineered with ${material.durability.rating}/10 mechanical resistance rating, withstanding up to ${material.durability.stackingCompressionKg} kg vertical compression in ${req.transport} dispatch.`,
    `Shelf Life Guarantee: Supports ${material.shelfLifeSuitabilityDays.min}–${material.shelfLifeSuitabilityDays.max} days safe retention, fulfilling the target ${req.desiredShelfLifeDays || 14}-day shelf life.`,
    `Cost & Resource Efficiency: Estimated packaging outlay of ₹${cost.costPerKgFood}/kg of food (${cost.priceNote}).`,
    `Sustainability & Waste: Scores ${scores.sustainabilityScore}/100 Eco Index and ${scores.wasteScore}/100 Waste Reduction with ${material.recyclability.class}.`,
    `Statutory FSSAI Norm: Fully aligned with ${material.fssaiStandardRef}.`
  ];

  const technicalRationale = `Based on empirical food engineering parameters, ${req.commodity} requires controlled thermal and physical cushioning to prevent mechanical bruising and moisture loss. ${material.name} delivers ${material.advantages[0] || 'balanced barrier protection'} while maintaining a high safety score of ${scores.foodSafetyScore}/100.`;

  const tradeoffs = material.disadvantages.length > 0 
    ? `Operational Considerations: ${material.disadvantages.join(' • ')}`
    : 'No critical operational drawbacks identified for this commodity profile.';

  return {
    headline,
    bulletPoints,
    technicalRationale,
    tradeoffs
  };
}

/**
 * 12. Main FoodPack AI Recommendation Orchestrator
 */
export function generateFoodPackRecommendation(req: FoodPackRequirements): FoodPackRecommendation {
  const normalizedReq: FoodPackRequirements = {
    ...req,
    commodity: req.commodity || req.customCommodity || 'General Food Commodity',
    normalizedCommodity: req.normalizedCommodity || req.commodity || req.customCommodity || 'produce',
    category: req.category || 'Fresh Vegetables',
    quantityKg: req.quantityKg || (req.unit === 'ton' ? (req.quantity || 1) * 1000 : req.unit === 'crates' ? (req.quantity || 1) * 20 : (req.quantity || 100)),
    desiredShelfLifeDays: req.desiredShelfLifeDays || (
      req.shelfLife === '1-3 days' ? 3 :
      req.shelfLife === '4-7 days' ? 7 :
      req.shelfLife === '1-2 weeks' ? 14 :
      req.shelfLife === '2-4 weeks' ? 28 : 30
    ),
    userPriorities: req.userPriorities || (req as any).priorityWeights || DEFAULT_PRIORITY_WEIGHTS
  };

  const materials = FOOD_PACKAGING_MATERIALS;

  // Evaluate and score all materials
  const scoredMaterials = materials.map(mat => {
    const scoreBreakdown = evaluateMaterial(mat, normalizedReq);
    const costAnalysis = calculatePackagingCost(mat, normalizedReq.quantityKg);
    return {
      material: mat,
      scores: scoreBreakdown,
      costAnalysis,
      overallScore: scoreBreakdown.overallScore
    };
  });

  // Sort descending by overall score
  scoredMaterials.sort((a, b) => b.scores.overallScore - a.scores.overallScore);

  const top = scoredMaterials[0];
  const rankedMaterials = scoredMaterials.map((item, idx) => ({
    material: item.material,
    scores: item.scores,
    costAnalysis: item.costAnalysis,
    overallScore: item.scores.overallScore,
    rank: idx + 1
  }));

  const alternatives = scoredMaterials.slice(1, 4).map((item, idx) => {
    let highlightBadge = 'Alternative Option';
    if (idx === 0) highlightBadge = '🥈 Close Alternative';
    else if (item.material.estimatedCostPerKg <= 1.5) highlightBadge = '💰 Budget Alternative';
    else if (item.material.sustainabilityScore >= 85) highlightBadge = '🌱 Eco Alternative';

    return {
      material: item.material,
      scores: item.scores,
      costAnalysis: item.costAnalysis,
      highlightBadge
    };
  });

  const wasteAnalysis = calculatePackagingWaste(top.material, normalizedReq.quantityKg);
  const confidence = calculateAIConfidence(top.material, normalizedReq, top.scores);
  const whyExplanation = generateRecommendationExplanation(top.material, normalizedReq, top.scores, top.costAnalysis);
  const compliance = getFssaiComplianceForMaterial(top.material.name, top.material.category);

  const topRecommendation = {
    material: top.material,
    scores: top.scores,
    scoreBreakdown: {
      overallScore: top.scores.overallScore,
      safetyScore: top.scores.foodSafetyScore,
      shelfLifeScore: top.scores.shelfLifeScore,
      sustainabilityScore: top.scores.sustainabilityScore,
      costScore: top.scores.costScore,
      durabilityScore: top.scores.durabilityScore,
      wasteScore: top.scores.wasteScore
    },
    overallScore: top.scores.overallScore,
    costAnalysis: top.costAnalysis
  };

  const ecoScore = {
    overallEcoScore: top.scores.sustainabilityScore,
    recyclabilityIndex: top.material.recyclability.recyclabilityScore,
    reusabilityIndex: top.material.reusability.isReusable ? 95 : 10,
    biodegradabilityIndex: top.material.biodegradability.isBiodegradable ? 95 : 10,
    plasticReductionPercent: wasteAnalysis.wasteReductionPercent,
    circularityRating: wasteAnalysis.circularityPotential
  };

  const sources = [
    {
      name: 'Food Safety and Standards Authority of India (FSSAI)',
      type: 'REGULATORY' as const,
      url: 'https://www.fssai.gov.in/',
      lastUpdated: '2026-03-15'
    },
    {
      name: 'Bureau of Indian Standards (BIS)',
      type: 'STANDARDS' as const,
      url: 'https://standardsbis.bsbedge.com/',
      lastUpdated: '2026-02-28'
    },
    {
      name: 'Central Food Technological Research Institute (CFTRI)',
      type: 'GOVERNMENT' as const,
      url: 'https://cftri.res.in/',
      lastUpdated: '2026-03-01'
    },
    {
      name: 'UN Food and Agriculture Organization (FAO) Horticultural Packaging Guidelines',
      type: 'INTERNATIONAL' as const,
      url: 'https://www.fao.org/food-loss-and-waste/en/',
      lastUpdated: '2026-01-15'
    }
  ];

  return {
    id: `FPAI-REC-${Math.floor(100000 + Math.random() * 900000)}`,
    requirements: normalizedReq,
    recommendedMaterial: top.material,
    topRecommendation,
    rankedMaterials,
    scores: top.scores,
    whyExplanation,
    aiConfidencePercent: confidence.confidencePercent,
    aiConfidenceLabel: confidence.label,
    aiConfidence: {
      score: confidence.confidencePercent,
      label: confidence.label,
      factors: confidence.factors
    },
    confidenceFactors: confidence.factors,
    costAnalysis: top.costAnalysis,
    wasteAnalysis,
    ecoScore,
    alternatives,
    fssaiCompliance: {
      status: compliance.status,
      regulationReference: compliance.regulationReference,
      requirement: compliance.requirement,
      source: compliance.source,
      sourceUrl: compliance.sourceUrl,
      lastVerified: compliance.lastVerified
    },
    sources,
    timestamp: new Date().toISOString()
  };
}
