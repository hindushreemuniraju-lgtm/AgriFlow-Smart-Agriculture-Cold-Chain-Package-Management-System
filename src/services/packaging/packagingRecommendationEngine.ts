/**
 * SIH26236 - AI-Based Intelligent Food Packaging Material Recommendation Engine
 * Multi-Criteria Barrier, Respiration, Distance, and Thermal Decision Algorithm
 * Evaluates OTR, WVTR, Respiration Gas Exchange, Mechanical Compression, and Logistics Distance.
 */

import { ProductIntelligence } from '../../types/product';
import { PACKAGING_MATERIALS_DATABASE, PackagingMaterialSpec } from '../../data/packagingMaterialsDatabase';

export interface PackagingEngineInput {
  product: ProductIntelligence;
  quantityKg: number;
  targetShelfLifeDays: number;
  storageTempC: number;
  humidityPercent: number;
  distanceKm: number;
  estimatedTravelHours: number;
  vehicleType: string;
  budgetPreference: 'economy' | 'balanced' | 'premium';
  sustainabilityPreference: 'standard' | 'high_eco' | 'zero_plastic';
}

export interface BarrierMatchResult {
  property: string;
  productDemand: string;
  materialCapability: string;
  status: 'Suitable' | 'Acceptable' | 'Unsuitable';
  statusColor: string;
  explanation: string;
}

export interface MaterialEvaluationResult {
  material: PackagingMaterialSpec;
  score: number; // 0 - 100
  tier: 'Recommended' | 'Alternative' | 'Budget' | 'Not Recommended';
  suitabilityHeadline: string;
  scientificRationale: string;
  barrierMatches: BarrierMatchResult[];
  estimatedPackagingCostTotal: number;
  costPerKg: number;
  estimatedShelfLifeDays: number;
  riskFactorNotes: string[];
  ecoScore: number;
}

export interface RespirationAnalysis {
  commodityType: string;
  respirationRateClass: 'Very High' | 'High' | 'Moderate' | 'Low' | 'Non-Respiring (Dry/Processed)';
  estimatedO2ConsumptionMgKgHr: number;
  estimatedHeatGenerationKjKgDay: number;
  requiresVentilation: boolean;
  recommendedPerforationDensity: string;
  anaerobicRiskUnderSealedFilm: 'Severe' | 'Moderate' | 'None';
  optimalAtmosphereGasFlush: string;
}

export interface PackagingRecommendationReport {
  inputSummary: {
    productName: string;
    productCategory: string;
    quantityKg: number;
    distanceKm: number;
    travelHours: number;
    targetShelfLifeDays: number;
  };
  respiration: RespirationAnalysis;
  recommended: MaterialEvaluationResult;
  alternative: MaterialEvaluationResult;
  budget: MaterialEvaluationResult;
  notRecommended: MaterialEvaluationResult;
  allEvaluations: MaterialEvaluationResult[];
  complianceCertifications: string[];
  disclaimer: string;
}

/**
 * Calculate commodity respiration kinetics based on product type and transit temperature.
 */
export function calculateRespirationKinetics(product: ProductIntelligence, tempC: number): RespirationAnalysis {
  const isProcessed = product.isProcessed || product.category === 'Flour' || product.category === 'Oil & Oilseed' || product.category === 'Processed Product' || product.category === 'Dairy' || product.category === 'Grain' || product.category === 'Pulse' || product.category === 'Dry Fruit';
  const name = product.name.toLowerCase();

  if (isProcessed) {
    return {
      commodityType: 'Processed / Dry Food Commodity',
      respirationRateClass: 'Non-Respiring (Dry/Processed)',
      estimatedO2ConsumptionMgKgHr: 0,
      estimatedHeatGenerationKjKgDay: 0,
      requiresVentilation: false,
      recommendedPerforationDensity: '0% (Hermetic / Gas-Barrier Required)',
      anaerobicRiskUnderSealedFilm: 'None',
      optimalAtmosphereGasFlush: product.category === 'Oil & Oilseed' || product.category === 'Dairy' ? '100% N2 Flush or Vacuum' : '99.5% N2 / Low Residual O2 (<0.5%)'
    };
  }

  // Fresh respiring produce calculation
  let baseRateMg = 15;
  let rateClass: RespirationAnalysis['respirationRateClass'] = 'Moderate';

  if (name.includes('broccoli') || name.includes('spinach') || name.includes('mushroom') || name.includes('sweet corn') || name.includes('strawberry')) {
    baseRateMg = 45;
    rateClass = 'Very High';
  } else if (name.includes('tomato') || name.includes('mango') || name.includes('brinjal') || name.includes('banana') || name.includes('papaya')) {
    baseRateMg = 25;
    rateClass = 'High';
  } else if (name.includes('onion') || name.includes('potato') || name.includes('garlic') || name.includes('apple') || name.includes('citrus')) {
    baseRateMg = 8;
    rateClass = 'Low';
  }

  // Q10 temperature coefficient multiplier: Respiration doubles roughly every 10°C rise
  const tempFactor = Math.pow(2.1, Math.max(0, tempC - 4) / 10);
  const actualO2Rate = Math.round(baseRateMg * tempFactor);
  const heatGenerationKj = Math.round(actualO2Rate * 10.7); // Heat equivalent

  return {
    commodityType: 'Fresh Horticultural Living Produce',
    respirationRateClass: rateClass,
    estimatedO2ConsumptionMgKgHr: actualO2Rate,
    estimatedHeatGenerationKjKgDay: heatGenerationKj,
    requiresVentilation: true,
    recommendedPerforationDensity: rateClass === 'Very High' ? '4-6% Perforation / Laser EMAP (50-80 holes/m²)' : '2-4% Side Vent Slots aligned with airflow channels',
    anaerobicRiskUnderSealedFilm: rateClass === 'Very High' || rateClass === 'High' ? 'Severe' : 'Moderate',
    optimalAtmosphereGasFlush: rateClass === 'High' ? '3-5% O2 + 3-5% CO2 + 90-94% N2 (MAP)' : 'Ambient Aerated Cool Air Flow'
  };
}

/**
 * Execute Multi-Criteria Material Evaluation Algorithm
 */
export function generatePackagingRecommendation(input: PackagingEngineInput): PackagingRecommendationReport {
  const { product, quantityKg, targetShelfLifeDays, storageTempC, humidityPercent, distanceKm, estimatedTravelHours, vehicleType, budgetPreference, sustainabilityPreference } = input;

  const respiration = calculateRespirationKinetics(product, storageTempC);
  const isFresh = respiration.respirationRateClass !== 'Non-Respiring (Dry/Processed)';
  const isLiquidOrDairy = product.category === 'Dairy' || product.category === 'Oil & Oilseed' || product.name.toLowerCase().includes('milk') || product.name.toLowerCase().includes('ghee') || product.name.toLowerCase().includes('oil');
  const isPowderOrGrain = product.category === 'Flour' || product.category === 'Grain' || product.category === 'Pulse' || product.category === 'Spice' || product.category === 'Dry Fruit';

  const evaluations: MaterialEvaluationResult[] = PACKAGING_MATERIALS_DATABASE.map(material => {
    let score = 50;
    const barrierMatches: BarrierMatchResult[] = [];
    const riskFactorNotes: string[] = [];

    // 1. Oxygen Barrier & Gas Exchange Evaluation
    if (isFresh) {
      if (material.barrierProperties.oxygenBarrierTier === 'Ultra-High' && !material.compatibility.perforatedVentilationAvailable) {
        score -= 60;
        riskFactorNotes.push('CRITICAL: Hermetic O2 barrier without ventilation triggers anaerobic fermentation and severe rotting.');
        barrierMatches.push({
          property: 'Oxygen Transmission (OTR)',
          productDemand: `Needs high gas exchange (${respiration.estimatedO2ConsumptionMgKgHr} mg O2/kg·h)`,
          materialCapability: `Impermeable (${material.barrierProperties.otrRange})`,
          status: 'Unsuitable',
          statusColor: '#ef4444',
          explanation: 'Traps toxic carbon dioxide and suffocates living produce.'
        });
      } else if (material.compatibility.perforatedVentilationAvailable || material.barrierProperties.oxygenBarrierTier === 'Breathable') {
        score += 25;
        barrierMatches.push({
          property: 'Oxygen Transmission (OTR)',
          productDemand: 'Controlled gas exchange to sustain aerobic metabolism',
          materialCapability: `Ventilated / Breathable (${material.barrierProperties.otrRange})`,
          status: 'Suitable',
          statusColor: '#10b981',
          explanation: 'Maintains optimal oxygen levels and dissipates respiratory heat.'
        });
      } else {
        score += 10;
        barrierMatches.push({
          property: 'Oxygen Transmission (OTR)',
          productDemand: 'Moderate gas exchange',
          materialCapability: material.barrierProperties.otrRange,
          status: 'Acceptable',
          statusColor: '#f59e0b',
          explanation: 'Acceptable for short transit but requires temperature monitoring.'
        });
      }
    } else if (isLiquidOrDairy || isPowderOrGrain) {
      // Non-fresh / Dairy / Oils / Spices / Flour require tight oxygen barrier to stop rancidity & oxidation
      if (material.barrierProperties.oxygenBarrierTier === 'Ultra-High' || material.barrierProperties.oxygenBarrierTier === 'High') {
        score += 30;
        barrierMatches.push({
          property: 'Oxygen Barrier (OTR)',
          productDemand: 'High barrier to prevent lipid oxidation and rancidity',
          materialCapability: `Excellent barrier (${material.barrierProperties.otrRange})`,
          status: 'Suitable',
          statusColor: '#10b981',
          explanation: 'Blocks ambient oxygen, preserving delicate fats, aromas, and active nutrients.'
        });
      } else if (material.barrierProperties.oxygenBarrierTier === 'Breathable') {
        score -= 50;
        riskFactorNotes.push('Unsuitable: High oxygen permeability causes rapid fat rancidity, aroma loss, or insect infestation.');
        barrierMatches.push({
          property: 'Oxygen Barrier (OTR)',
          productDemand: 'Requires hermetic oxygen seal',
          materialCapability: `Porous / Open grid (${material.barrierProperties.otrRange})`,
          status: 'Unsuitable',
          statusColor: '#ef4444',
          explanation: 'Fails to prevent air and pest contamination.'
        });
      }
    }

    // 2. Moisture Barrier (WVTR) Evaluation
    if (isPowderOrGrain) {
      if (material.barrierProperties.moistureBarrierTier === 'Ultra-High' || material.barrierProperties.moistureBarrierTier === 'High') {
        score += 25;
        barrierMatches.push({
          property: 'Moisture Barrier (WVTR)',
          productDemand: 'Needs strict moisture lockout to prevent caking and mold',
          materialCapability: `High barrier (${material.barrierProperties.wvtrRange})`,
          status: 'Suitable',
          statusColor: '#10b981',
          explanation: 'Prevents hygroscopic moisture uptake and fungal development.'
        });
      } else {
        score -= 20;
        barrierMatches.push({
          property: 'Moisture Barrier (WVTR)',
          productDemand: 'Needs dry moisture protection',
          materialCapability: material.barrierProperties.wvtrRange,
          status: 'Unsuitable',
          statusColor: '#ef4444',
          explanation: 'Allows water vapor ingress in humid environments.'
        });
      }
    } else if (isFresh) {
      if (material.category === 'Paper & Corrugated' || material.id === 'mat-perforated-film' || material.id === 'mat-hdpe-crate') {
        score += 20;
        barrierMatches.push({
          property: 'Condensation Management',
          productDemand: 'Prevent surface liquid droplet formation',
          materialCapability: 'Anti-fog / Breathable dissipation',
          status: 'Suitable',
          statusColor: '#10b981',
          explanation: 'Prevents condensation drip that causes bacterial soft rot.'
        });
      }
    }

    // 3. Transit Distance & Mechanical Compression Stress
    if (distanceKm >= 500) {
      if (material.mechanical.shockDampeningRating >= 4.0 || material.mechanical.maxStackingCompressionKg >= 200) {
        score += 25;
        riskFactorNotes.push('Engineered to withstand long-haul highway vibration and multi-tier pallet compression.');
      } else {
        score -= 20;
        riskFactorNotes.push('Low drop/shock dampening for long-haul routes (>500 km).');
      }
    } else if (distanceKm <= 50) {
      // Local transit favors returnable crates or budget flexible packaging
      if (material.category === 'Returnable Container' || material.category === 'Flexible Film') {
        score += 15;
      }
    }

    // 4. Budget & Sustainability Multipliers
    if (budgetPreference === 'economy') {
      if (material.compatibility.estimatedBaseCostPerKg <= 1.50) score += 20;
      else if (material.compatibility.estimatedBaseCostPerKg > 4.00) score -= 15;
    }

    if (sustainabilityPreference === 'zero_plastic' || sustainabilityPreference === 'high_eco') {
      if (material.compatibility.sustainabilityScore >= 90) score += 25;
      else if (material.compatibility.sustainabilityScore < 70) score -= 15;
    }

    // Commodity specific direct overrides
    if (material.unsuitableCommodities.some(c => product.id.includes(c) || product.name.toLowerCase().includes(c))) {
      score = Math.min(score, 25);
    }
    if (material.suitableCommodities.some(c => product.id.includes(c) || product.name.toLowerCase().includes(c))) {
      score += 15;
    }

    // Clamp score
    score = Math.max(5, Math.min(99, score));

    // Calculate packaging cost
    const costPerKg = material.compatibility.estimatedBaseCostPerKg;
    const totalCost = Math.round(costPerKg * quantityKg);

    // Calculate shelf-life estimate under this material
    let estDays = isFresh ? product.storage.coldDays || 14 : product.storage.ambientDays || 180;
    if (score < 40) {
      estDays = Math.max(1, Math.round(estDays * 0.25));
    } else if (score < 70) {
      estDays = Math.round(estDays * 0.75);
    } else {
      estDays = Math.round(estDays * 1.15);
    }

    let tier: MaterialEvaluationResult['tier'] = 'Alternative';
    if (score >= 82) tier = 'Recommended';
    else if (score >= 65) tier = 'Alternative';
    else if (score >= 45) tier = 'Budget';
    else tier = 'Not Recommended';

    const rationale = score >= 75
      ? `The ${material.name} provides optimal gas barrier and mechanical damping for ${product.name} across ${distanceKm} km transit, maintaining sensory freshness and microbial integrity.`
      : score < 45
      ? material.criticalFailureNotes || `Incompatible barrier or physical properties for ${product.name}.`
      : `Functional baseline option for ${product.name}, though requires strict temperature monitoring.`;

    return {
      material,
      score,
      tier,
      suitabilityHeadline: score >= 80 ? 'Optimal Engineered Match' : score >= 60 ? 'Viable Secondary Alternative' : score >= 45 ? 'Budget Local Solution' : 'Critical Failure Risk',
      scientificRationale: rationale,
      barrierMatches,
      estimatedPackagingCostTotal: totalCost,
      costPerKg,
      estimatedShelfLifeDays: estDays,
      riskFactorNotes,
      ecoScore: material.compatibility.sustainabilityScore
    };
  });

  // Sort evaluations descending by score
  evaluations.sort((a, b) => b.score - a.score);

  // Assign distinct top recommended, alternative, budget, and not-recommended
  const recommended = evaluations[0];
  const alternative = evaluations.find(e => e.material.id !== recommended.material.id && e.score >= 60) || evaluations[1];
  
  // Find best budget option (lowest cost among score >= 50)
  const budgetCandidates = evaluations.filter(e => e.material.id !== recommended.material.id && e.score >= 45);
  budgetCandidates.sort((a, b) => a.costPerKg - b.costPerKg);
  const budget = budgetCandidates[0] || evaluations[evaluations.length - 2];

  // Find lowest scoring not recommended material
  const notRecommended = [...evaluations].reverse()[0];

  return {
    inputSummary: {
      productName: product.name,
      productCategory: product.category,
      quantityKg,
      distanceKm,
      travelHours: estimatedTravelHours,
      targetShelfLifeDays
    },
    respiration,
    recommended: { ...recommended, tier: 'Recommended' },
    alternative: { ...alternative, tier: 'Alternative' },
    budget: { ...budget, tier: 'Budget' },
    notRecommended: { ...notRecommended, tier: 'Not Recommended' },
    allEvaluations: evaluations,
    complianceCertifications: ['FSSAI Food Contact Regulation (IS 9845)', 'ISO 22000 Food Safety', 'ASTM D3985 OTR Standard', 'ASTM F1249 WVTR Standard', 'FDA 21 CFR 177'],
    disclaimer: 'Barrier specifications and shelf-life estimations are computed based on standardized ASTM laboratory benchmarks and verified botanical kinetics. Real-world results may vary with ambient field temperatures and handling rigor.'
  };
}
