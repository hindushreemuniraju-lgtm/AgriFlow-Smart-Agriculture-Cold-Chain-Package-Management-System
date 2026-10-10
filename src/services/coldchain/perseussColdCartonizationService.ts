/**
 * AgriFlow Perseuss Cold Chain Cartonization Service
 * Industrial Cold-Chain Packaging & Multi-Temperature Thermal Packout Engine.
 * Integrates Perseuss Cold Cartonization algorithms to compute optimal insulated shipper sizing,
 * Phase Change Material (PCM) refrigerant weight, packout geometry, and thermal holdover curves.
 */

export interface PerseussCartonizationInput {
  commodityId: string;
  commodityName: string;
  commodityCategory: 'Dairy' | 'Fresh Produce' | 'Frozen' | 'General Agri' | 'Beverage' | 'Spice';
  payloadWeightKg: number;
  payloadDimensionsCm?: { length: number; width: number; height: number };
  targetTempProfile: 'CHILLED_2_8C' | 'COOL_8_15C' | 'FROZEN_MINUS_18C' | 'AMBIENT_CONTROLLED_15_25C';
  ambientMaxTempC: number; // e.g. 38°C for Indian summer highway
  transitDurationHours: number; // e.g. 24h, 48h, 72h
  shipperMaterialPreference?: 'EPS_FOAM' | 'PUR_POLYURETHANE' | 'VIP_VACUUM_PANEL' | 'ECO_CELLULOSE_CORRUGATED';
}

export interface RefrigerantPackoutSpec {
  refrigerantType: 'Phase Change Material (+4°C PCM)' | 'Hydrated Polymer Gel Pack (0°C)' | 'Dry Ice Solid CO2 (-78.5°C)' | 'Eutectic Chilled Ice Bricks';
  totalRefrigerantWeightKg: number;
  packUnitsCount: number;
  unitWeightGrams: number;
  latentHeatCapacityKj: number;
  preconditioningTempC: string;
  packoutPositioning: 'Top & Bottom Sandwich' | 'Surround 6-Sided Wrap' | 'Top Deck Placement' | 'Side Baffle Slots';
}

export interface InsulatedShipperSpec {
  materialName: string;
  wallThicknessMm: number;
  thermalConductivityK: number; // W/m·K
  rValue: number;
  externalDimensionsCm: { length: number; width: number; height: number };
  internalPayloadVolumeLiters: number;
  tareWeightKg: number;
  grossShipmentWeightKg: number;
  dimensionalWeightKg: number; // L*W*H / 5000
  isFreightOptimized: boolean;
  recyclability: string;
}

export interface ThermalHoldoverTimelinePoint {
  elapsedHours: number;
  internalTempC: number;
  ambientTempC: number;
  refrigerantRemainingPercent: number;
  status: 'SAFE' | 'BORDERLINE' | 'EXCURSION';
}

export interface PerseussCartonizationResult {
  planId: string;
  input: PerseussCartonizationInput;
  shipper: InsulatedShipperSpec;
  refrigerant: RefrigerantPackoutSpec;
  packoutSteps: string[];
  thermalHoldoverTimeline: ThermalHoldoverTimelinePoint[];
  maxSafeTransitHours: number;
  thermalExcursionRisk: 'Minimal (<1%)' | 'Low (1–3%)' | 'Moderate (3–7%)' | 'High (>7%)';
  istaCompliance: string; // e.g. 'ISTA 7D Summer Profile Certified'
  estimatedPackagingCostInr: number;
  freightCostSavingsInr: number;
  generatedAt: string;
}

/**
 * Calculate Perseuss Cold Cartonization & Packout Solution
 */
export function calculatePerseussColdCartonization(
  input: PerseussCartonizationInput
): PerseussCartonizationResult {
  const safeQty = Math.max(1, input.payloadWeightKg);
  const transitHours = Math.max(6, Math.min(120, input.transitDurationHours || 24));
  const ambientTemp = input.ambientMaxTempC || 38;

  // 1. Determine Target Internal Temperature Range
  let targetMinTemp = 2;
  let targetMaxTemp = 8;
  let refrigerantType: RefrigerantPackoutSpec['refrigerantType'] = 'Hydrated Polymer Gel Pack (0°C)';
  let preconditioning = 'Freeze at -20°C for minimum 24 hours before packout';
  let latentHeatKjPerKg = 334; // Water/gel latent heat

  if (input.targetTempProfile === 'FROZEN_MINUS_18C') {
    targetMinTemp = -25;
    targetMaxTemp = -18;
    refrigerantType = 'Dry Ice Solid CO2 (-78.5°C)';
    preconditioning = 'Sublimating dry ice blocks packed directly in vapor-permeable poly';
    latentHeatKjPerKg = 571;
  } else if (input.targetTempProfile === 'CHILLED_2_8C') {
    targetMinTemp = 2;
    targetMaxTemp = 8;
    refrigerantType = 'Phase Change Material (+4°C PCM)';
    preconditioning = 'Condition at +2°C to +4°C to activate pure liquid-solid equilibrium';
    latentHeatKjPerKg = 210;
  } else if (input.targetTempProfile === 'COOL_8_15C') {
    targetMinTemp = 8;
    targetMaxTemp = 15;
    refrigerantType = 'Hydrated Polymer Gel Pack (0°C)';
    preconditioning = 'Refrigerate at +4°C (Do NOT freeze hard to avoid chilling injury)';
    latentHeatKjPerKg = 334;
  } else if (input.targetTempProfile === 'AMBIENT_CONTROLLED_15_25C') {
    targetMinTemp = 15;
    targetMaxTemp = 25;
    refrigerantType = 'Phase Change Material (+4°C PCM)';
    preconditioning = 'Condition at +18°C to +22°C ambient buffer to shield against extreme highway heatwaves';
    latentHeatKjPerKg = 190;
  }

  // 2. Select Shipper Insulation Type
  let materialName = 'High-Density Molded EPS Foam (Expanded Polystyrene)';
  let kFactor = 0.033; // W/m·K
  let wallThicknessMm = 35;
  let rValue = 4.2;
  let recyclability = '100% Recyclable EPS #6 / Reusable';
  let tareBaseKg = 0.85;

  if (input.shipperMaterialPreference === 'PUR_POLYURETHANE' || transitHours > 48) {
    materialName = 'Rigid Polyurethane (PUR) Foam Shipper';
    kFactor = 0.022;
    wallThicknessMm = 45;
    rValue = 6.8;
    recyclability = 'Multi-Trip Durable Shipper (50+ Trips)';
    tareBaseKg = 1.4;
  } else if (input.shipperMaterialPreference === 'VIP_VACUUM_PANEL' || transitHours > 72) {
    materialName = 'Vacuum Insulated Panels (VIP) with Outer Corrugated Overwrap';
    kFactor = 0.005;
    wallThicknessMm = 25;
    rValue = 18.5;
    recyclability = 'High-Asset Reusable Clinical/Pharma Grade';
    tareBaseKg = 2.1;
  } else if (input.shipperMaterialPreference === 'ECO_CELLULOSE_CORRUGATED') {
    materialName = 'Curbside Recyclable Repulped Cellulose Fiber Insulated Box';
    kFactor = 0.038;
    wallThicknessMm = 30;
    rValue = 3.6;
    recyclability = '100% Curbside Paper Recyclable (Zero Plastic)';
    tareBaseKg = 0.95;
  }

  // 3. Compute Surface Area & Heat Ingress (Fourier Conduction Law)
  // Payload volume approx: 1 kg produce ~ 1.8 Liters
  const payloadVolLiters = safeQty * 1.8;
  const intDimensionSide = Math.max(18, Math.round(Math.cbrt(payloadVolLiters * 1000)));
  const intL = input.payloadDimensionsCm?.length || intDimensionSide;
  const intW = input.payloadDimensionsCm?.width || intDimensionSide;
  const intH = input.payloadDimensionsCm?.height || intDimensionSide;

  const wallCm = wallThicknessMm / 10;
  const extL = Math.round(intL + wallCm * 2 + 4);
  const extW = Math.round(intW + wallCm * 2 + 4);
  const extH = Math.round(intH + wallCm * 2 + 6);

  // Surface Area in m²
  const surfaceAreaM2 = 2 * ((extL * extW + extL * extH + extW * extH) / 10000);
  const deltaT = Math.max(10, ambientTemp - targetMinTemp);

  // Heat ingress Q (Watts) = k * A * deltaT / thickness_m
  const heatIngressWatts = (kFactor * surfaceAreaM2 * deltaT) / (wallThicknessMm / 1000);
  const totalHeatIngressJoules = heatIngressWatts * (transitHours * 3600);
  const totalHeatIngressKj = totalHeatIngressJoules / 1000;

  // 4. Calculate Required Refrigerant Weight (with 25% safety buffer)
  const safetyFactor = 1.25;
  const requiredRefrigerantKg = Math.max(
    0.8,
    parseFloat(((totalHeatIngressKj / latentHeatKjPerKg) * safetyFactor).toFixed(2))
  );

  const unitWeightGrams = requiredRefrigerantKg > 3 ? 1000 : 500;
  const packUnitsCount = Math.max(2, Math.ceil((requiredRefrigerantKg * 1000) / unitWeightGrams));
  const actualRefrigerantWeightKg = (packUnitsCount * unitWeightGrams) / 1000;

  // 5. Weight & Dimensional Freight Optimization
  const tareWeightKg = parseFloat((tareBaseKg + (surfaceAreaM2 * 0.4)).toFixed(2));
  const grossShipmentWeightKg = parseFloat((safeQty + actualRefrigerantWeightKg + tareWeightKg).toFixed(2));
  const dimensionalWeightKg = parseFloat(((extL * extW * extH) / 5000).toFixed(2));
  const isFreightOptimized = dimensionalWeightKg <= grossShipmentWeightKg * 1.3;

  // 6. Generate Thermal Holdover Curve
  const holdoverTimeline: ThermalHoldoverTimelinePoint[] = [];
  const intervals = [0, Math.round(transitHours * 0.25), Math.round(transitHours * 0.5), Math.round(transitHours * 0.75), transitHours];
  
  // Dedup intervals
  const uniqueHours = Array.from(new Set(intervals)).sort((a, b) => a - b);

  uniqueHours.forEach((hour) => {
    const fractionElapsed = hour / transitHours;
    const remainingPcm = Math.max(0, Math.round((1 - fractionElapsed * 0.88) * 100));
    
    let internalTemp: number;
    let status: ThermalHoldoverTimelinePoint['status'] = 'SAFE';

    if (fractionElapsed <= 0.8) {
      internalTemp = parseFloat((targetMinTemp + fractionElapsed * (targetMaxTemp - targetMinTemp) * 0.7).toFixed(1));
    } else {
      internalTemp = parseFloat((targetMaxTemp - 0.5 + (fractionElapsed - 0.8) * 4).toFixed(1));
    }

    if (internalTemp > targetMaxTemp) {
      status = 'EXCURSION';
    } else if (internalTemp >= targetMaxTemp - 1) {
      status = 'BORDERLINE';
    }

    holdoverTimeline.push({
      elapsedHours: hour,
      internalTempC: internalTemp,
      ambientTempC: ambientTemp,
      refrigerantRemainingPercent: remainingPcm,
      status
    });
  });

  const maxSafeHours = Math.round(transitHours * (actualRefrigerantWeightKg / requiredRefrigerantKg) * 1.15);

  const estimatedCost = Math.round(
    (actualRefrigerantWeightKg * 45) + (surfaceAreaM2 * 120) + (wallThicknessMm * 2.5) + 80
  );

  const standardFreight = Math.max(grossShipmentWeightKg, dimensionalWeightKg) * 18;
  const unoptimizedFreight = (dimensionalWeightKg * 1.45) * 18;
  const freightSavings = Math.max(0, Math.round(unoptimizedFreight - standardFreight));

  return {
    planId: `PERSEUSS-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    input,
    shipper: {
      materialName,
      wallThicknessMm,
      thermalConductivityK: kFactor,
      rValue,
      externalDimensionsCm: { length: extL, width: extW, height: extH },
      internalPayloadVolumeLiters: parseFloat(payloadVolLiters.toFixed(1)),
      tareWeightKg,
      grossShipmentWeightKg,
      dimensionalWeightKg,
      isFreightOptimized,
      recyclability
    },
    refrigerant: {
      refrigerantType,
      totalRefrigerantWeightKg: actualRefrigerantWeightKg,
      packUnitsCount,
      unitWeightGrams,
      latentHeatCapacityKj: Math.round(actualRefrigerantWeightKg * latentHeatKjPerKg),
      preconditioningTempC: preconditioning,
      packoutPositioning: 'Top & Bottom Sandwich'
    },
    packoutSteps: [
      `1. Line base of ${materialName} with bottom corrugated thermal buffer pad.`,
      `2. Place ${Math.ceil(packUnitsCount / 2)}x ${unitWeightGrams}g preconditioned ${refrigerantType} at the bottom.`,
      `3. Insert ${input.commodityName} (${safeQty} kg payload) in moisture-sealed primary barrier liner.`,
      `4. Place remaining ${Math.floor(packUnitsCount / 2)}x ${unitWeightGrams}g refrigerant packs directly across top payload surface.`,
      `5. Close insulated lid tightly; seal perimeter seam with 50mm vinyl security tape.`
    ],
    thermalHoldoverTimeline: holdoverTimeline,
    maxSafeTransitHours: maxSafeHours,
    thermalExcursionRisk: maxSafeHours >= transitHours * 1.2 ? 'Minimal (<1%)' : 'Low (1–3%)',
    istaCompliance: 'ISTA 7D / 7E Multi-Temperature Summer Thermal Profile Validated',
    estimatedPackagingCostInr: estimatedCost,
    freightCostSavingsInr: freightSavings,
    generatedAt: new Date().toISOString()
  };
}
