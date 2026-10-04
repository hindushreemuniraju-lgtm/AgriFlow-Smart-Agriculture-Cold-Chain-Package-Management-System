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

export interface ShelfLifeFactorBreakdown {
  factor: string;
  status: 'Positive' | 'Neutral' | 'Critical';
  weightPercent: number;
  impactDescription: string;
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
  estimatedShelfLifeRange: string; // e.g. "5–8 Days" or "12–18 Months"
  shelfLifeFactors: ShelfLifeFactorBreakdown[];
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
  const isProcessed = product.isProcessed || 
    product.category === 'Flour' || 
    product.category === 'Oil & Oilseed' || 
    product.category === 'Processed Product' || 
    product.category === 'Dairy' || 
    product.category === 'Grain' || 
    product.category === 'Pulse' || 
    product.category === 'Dry Fruit' ||
    product.category === 'Spice' ||
    product.category === 'Tea & Coffee';
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
      optimalAtmosphereGasFlush: product.category === 'Oil & Oilseed' || product.category === 'Dairy' 
        ? '100% N2 Flush or High-Vacuum Lockout' 
        : '99.5% N2 Flush / Low Residual O2 (<0.5%)'
    };
  }

  // Fresh respiring produce calculation
  let baseRateMg = 15;
  let rateClass: RespirationAnalysis['respirationRateClass'] = 'Moderate';

  if (name.includes('okra') || name.includes('lady finger') || name.includes('bhindi') || name.includes('spinach') || name.includes('broccoli') || name.includes('sweet corn') || name.includes('strawberry')) {
    baseRateMg = 42;
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
  const heatGenerationKj = Math.round(actualO2Rate * 10.7);

  return {
    commodityType: 'Fresh Horticultural Living Produce',
    respirationRateClass: rateClass,
    estimatedO2ConsumptionMgKgHr: actualO2Rate,
    estimatedHeatGenerationKjKgDay: heatGenerationKj,
    requiresVentilation: true,
    recommendedPerforationDensity: rateClass === 'Very High' ? '4% - 6% Precision Laser Micro-Perforated' : '2% - 4% Macro-Ventilated',
    anaerobicRiskUnderSealedFilm: rateClass === 'Very High' || rateClass === 'High' ? 'Severe' : 'Moderate',
    optimalAtmosphereGasFlush: 'Equilibrium Modified Atmosphere Packaging (EMAP: 3-5% O2, 5-8% CO2)'
  };
}

/**
 * Generate comprehensive AI-assisted packaging recommendations
 */
export function generatePackagingRecommendation(input: PackagingEngineInput): PackagingRecommendationReport {
  const {
    product,
    quantityKg,
    targetShelfLifeDays,
    storageTempC,
    humidityPercent,
    distanceKm,
    estimatedTravelHours,
    budgetPreference,
    sustainabilityPreference
  } = input;

  const respiration = calculateRespirationKinetics(product, storageTempC);
  const isFresh = respiration.requiresVentilation;
  const isOilOrFat = product.category === 'Oil & Oilseed' || product.id.includes('oil') || product.id.includes('ghee') || product.id.includes('butter');
  const isDairy = product.category === 'Dairy' && !product.id.includes('ghee');
  const isPowderOrGrain = product.category === 'Grain' || product.category === 'Flour' || product.category === 'Pulse' || product.category === 'Spice' || product.category === 'Tea & Coffee';

  const evaluations: MaterialEvaluationResult[] = PACKAGING_MATERIALS_DATABASE.map(material => {
    let score = 50;
    const barrierMatches: BarrierMatchResult[] = [];
    const riskFactorNotes: string[] = [];
    const shelfLifeFactors: ShelfLifeFactorBreakdown[] = [];

    // 1. Oxygen Barrier (OTR) & Gas Exchange Evaluation
    if (isFresh) {
      const allowsGasExchange = material.compatibility.perforatedVentilationAvailable || 
                                material.barrierProperties.oxygenBarrierTier === 'Breathable' || 
                                material.barrierProperties.oxygenBarrierTier === 'Low' ||
                                material.category === 'Paper & Corrugated' || 
                                material.category === 'Returnable Container';

      if (allowsGasExchange) {
        score += 30;
        barrierMatches.push({
          property: 'Oxygen Permeability & Gas Exchange',
          productDemand: `Needs high O2 exchange (~${respiration.estimatedO2ConsumptionMgKgHr} mg/kg·h) to avoid fermentation`,
          materialCapability: `Breathable / Perforated (${material.barrierProperties.otrRange})`,
          status: 'Suitable',
          statusColor: '#10b981',
          explanation: 'Allows natural respiratory gas diffusion, preventing off-flavors and anaerobic tissue decay.'
        });
        shelfLifeFactors.push({
          factor: 'Aerobic Gas Exchange',
          status: 'Positive',
          weightPercent: 30,
          impactDescription: 'Adequate ventilation prevents anaerobic fermentation and tissue breakdown.'
        });
      } else {
        score -= 40;
        barrierMatches.push({
          property: 'Oxygen Permeability & Gas Exchange',
          productDemand: 'Needs active gas ventilation',
          materialCapability: `Hermetic gas barrier (${material.barrierProperties.otrRange})`,
          status: 'Unsuitable',
          statusColor: '#ef4444',
          explanation: 'Trapped CO2 and zero O2 causes anaerobic fermentation, souring, and rapid tissue rot.'
        });
        riskFactorNotes.push('CRITICAL RISK: Zero ventilation creates an anaerobic chamber causing rapid rotting of living produce.');
        shelfLifeFactors.push({
          factor: 'Gas Lockout Hazard',
          status: 'Critical',
          weightPercent: 40,
          impactDescription: 'Severe lack of gas exchange reduces usable shelf life by up to 75%.'
        });
      }
    } else if (isOilOrFat || isDairy || isPowderOrGrain) {
      if (material.barrierProperties.oxygenBarrierTier === 'Ultra-High' || material.barrierProperties.oxygenBarrierTier === 'High') {
        score += 35;
        barrierMatches.push({
          property: 'Oxygen Transmission Rate (OTR)',
          productDemand: 'Needs hermetic oxygen barrier to stop lipid oxidation, rancidity, and flavor loss',
          materialCapability: `Ultra-low OTR (${material.barrierProperties.otrRange})`,
          status: 'Suitable',
          statusColor: '#10b981',
          explanation: 'Blocks oxygen permeation, preventing free-radical oxidation and rancidity.'
        });
        shelfLifeFactors.push({
          factor: 'Oxidative Barrier',
          status: 'Positive',
          weightPercent: 35,
          impactDescription: 'Hermetic OTR protection preserves volatile aromas and stops rancidity.'
        });
      } else {
        score -= 30;
        barrierMatches.push({
          property: 'Oxygen Transmission Rate (OTR)',
          productDemand: 'Needs high oxygen barrier',
          materialCapability: `High OTR (${material.barrierProperties.otrRange})`,
          status: 'Unsuitable',
          statusColor: '#ef4444',
          explanation: 'Oxygen ingress will cause rancidity, loss of aroma volatiles, and microbial spoilage.'
        });
        shelfLifeFactors.push({
          factor: 'Oxygen Permeation Risk',
          status: 'Critical',
          weightPercent: 30,
          impactDescription: 'High OTR exposure leads to accelerated oxidation and off-flavors.'
        });
      }
    }

    // 2. Moisture Barrier (WVTR) Evaluation
    if (isPowderOrGrain) {
      if (material.barrierProperties.moistureBarrierTier === 'Ultra-High' || material.barrierProperties.moistureBarrierTier === 'High') {
        score += 25;
        barrierMatches.push({
          property: 'Moisture Barrier (WVTR)',
          productDemand: 'Needs strict moisture lockout to prevent caking, clumping, and mold',
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
        shelfLifeFactors.push({
          factor: 'Transit Shock Protection',
          status: 'Positive',
          weightPercent: 20,
          impactDescription: 'Damped highway vibrations prevent internal bruising and cell leakage.'
        });
      } else {
        score -= 20;
        riskFactorNotes.push('Low drop/shock dampening for long-haul routes (>500 km).');
      }
    } else if (distanceKm <= 50) {
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

    // Commodity specific overrides
    if (material.unsuitableCommodities.some(c => product.id.includes(c) || product.name.toLowerCase().includes(c))) {
      score = Math.min(score, 25);
    }
    if (material.suitableCommodities.some(c => product.id.includes(c) || product.name.toLowerCase().includes(c))) {
      score += 15;
    }

    score = Math.max(5, Math.min(99, score));

    const costPerKg = material.compatibility.estimatedBaseCostPerKg;
    const totalCost = Math.round(costPerKg * quantityKg);

    // Multi-factor estimated shelf-life range calculation
    let baseMinDays = 3;
    let baseMaxDays = 5;

    if (isFresh) {
      baseMinDays = Math.max(2, Math.round((product.storage.coldDays || 10) * 0.7));
      baseMaxDays = product.storage.coldDays || 12;
      if (score < 40) {
        baseMinDays = 1;
        baseMaxDays = 3;
      } else if (score >= 80) {
        baseMinDays = Math.round(baseMinDays * 1.1);
        baseMaxDays = Math.round(baseMaxDays * 1.25);
      }
    } else if (isPowderOrGrain) {
      baseMinDays = 180;
      baseMaxDays = 365;
      if (score >= 80) {
        baseMinDays = 270;
        baseMaxDays = 540;
      }
    } else if (isOilOrFat) {
      baseMinDays = 120;
      baseMaxDays = 240;
      if (score >= 80) {
        baseMinDays = 180;
        baseMaxDays = 360;
      }
    } else if (isDairy) {
      baseMinDays = 4;
      baseMaxDays = 7;
      if (score >= 80) {
        baseMinDays = 6;
        baseMaxDays = 10;
      }
    }

    const estDays = Math.round((baseMinDays + baseMaxDays) / 2);
    const rangeStr = baseMaxDays > 60 
      ? `${Math.round(baseMinDays / 30)}–${Math.round(baseMaxDays / 30)} Months`
      : `${baseMinDays}–${baseMaxDays} Days`;

    let tier: MaterialEvaluationResult['tier'] = 'Alternative';
    if (score >= 82) tier = 'Recommended';
    else if (score >= 65) tier = 'Alternative';
    else if (score >= 45) tier = 'Budget';
    else tier = 'Not Recommended';

    const rationale = score >= 75
      ? `The ${material.name} provides optimal gas permeability and mechanical damping for ${product.name} across ${distanceKm} km transit, maintaining sensory freshness and structural integrity.`
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
      estimatedShelfLifeRange: rangeStr,
      shelfLifeFactors,
      riskFactorNotes,
      ecoScore: material.compatibility.sustainabilityScore
    };
  });

  evaluations.sort((a, b) => b.score - a.score);

  const recommended = evaluations[0];
  const alternative = evaluations.find(e => e.material.id !== recommended.material.id && e.score >= 60) || evaluations[1];
  
  const budgetCandidates = evaluations.filter(e => e.material.id !== recommended.material.id && e.score >= 45);
  budgetCandidates.sort((a, b) => a.costPerKg - b.costPerKg);
  const budget = budgetCandidates[0] || evaluations[evaluations.length - 2];

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
    complianceCertifications: [
      'FSSAI Food Contact Regulation (IS 9845 Context)',
      'ISO 22000 Food Safety Framework',
      'ASTM D3985 OTR Reference Standard',
      'ASTM F1249 WVTR Reference Standard',
      'FDA 21 CFR 177 Reference'
    ],
    disclaimer: 'This is a decision-support estimate based on product, packaging, temperature, humidity, storage and transport conditions. Actual shelf life may vary with field conditions and handling.'
  };
}
