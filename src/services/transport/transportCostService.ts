/**
 * Transportation & Freight Logistics Cost Engine
 * Computes deterministic transport rates, recommended fleet vehicles, and handling requirements.
 */

export interface TransportGuidance {
  cropId: string;
  cropName: string;
  distanceKm: number;
  quantityKg: number;
  recommendedVehicle: string;
  vehicleCapacityKg: number;
  temperatureControlledRequired: boolean;
  targetTemperature: string;
  estimatedTransitHours: number;
  estimatedFreightCost: number;
  ratePerKm: number;
  handlingInstructions: string[];
  maxRecommendedDistanceKm: number;
}

export function computeTransportGuidance(
  cropId: string,
  cropName: string,
  quantityKg: number,
  distanceKm: number
): TransportGuidance {
  const cleanId = (cropId || '').toLowerCase().replace(/^crop-/, '').trim();
  const cleanName = (cropName || '').toLowerCase();
  const safeQty = Math.max(10, quantityKg || 10);
  const safeDist = Math.max(5, distanceKm || 5);

  const isPerishable = ['tomato', 'mango', 'grapes', 'strawberry', 'spinach', 'capsicum', 'brinjal', 'apple'].includes(cleanId) ||
    cleanName.includes('tomato') || cleanName.includes('capsicum') || cleanName.includes('berry');
  const isGrain = ['rice', 'wheat', 'maize', 'ragi', 'chickpea'].includes(cleanId);
  const isSpice = ['black-pepper', 'pepper', 'white-pepper', 'green-peppercorn', 'cardamom', 'clove', 'cinnamon', 'nutmeg'].includes(cleanId) ||
    cleanName.includes('pepper') || cleanName.includes('cardamom') || cleanName.includes('clove');

  let vehicle = 'Tata 407 LCV (Ventilated Agri-Cover)';
  let capacity = 2500;
  let baseRateKm = 16.5;
  let targetTemp = 'Ambient Cool (20°C - 26°C)';
  let tempControlled = false;
  let maxDist = 1200;

  if (isSpice) {
    // High-value spices require moisture-impervious, tamper-evident containerized transport
    if (safeQty > 2000) {
      vehicle = 'Heavy Sealed Container Freight (GPS Tracked & Climate Monitored)';
      capacity = 10000;
      baseRateKm = 24.0;
      targetTemp = 'Dry Climate Controlled (18°C - 22°C, RH < 60%)';
      tempControlled = true;
      maxDist = 3000;
    } else {
      vehicle = 'Containerized High-Security Cargo Van (Moisture & Aroma Lockout)';
      capacity = 2500;
      baseRateKm = 19.5;
      targetTemp = 'Moisture-Locked Ambient (18°C - 22°C, RH < 60%)';
      tempControlled = true;
      maxDist = 2000;
    }
  } else if (safeQty > 3000) {
    if (isPerishable) {
      vehicle = 'Heavy Reefer Truck (3.5T - 10T Cold-Chain Fleet)';
      capacity = 10000;
      baseRateKm = 26.0;
      targetTemp = '12°C - 13°C Continuous Chiller';
      tempControlled = true;
      maxDist = 2500;
    } else {
      vehicle = 'Heavy Multi-Axle Covered Container Freight (10T - 16T)';
      capacity = 16000;
      baseRateKm = 22.0;
      targetTemp = 'Dry Ambient (22°C - 28°C)';
      tempControlled = false;
      maxDist = 3500;
    }
  } else if (safeQty <= 800) {
    if (isPerishable && safeDist > 80) {
      vehicle = 'Mini Reefer Van (1.0T IoT Controlled)';
      capacity = 1000;
      baseRateKm = 18.0;
      targetTemp = '12°C - 14°C Controlled';
      tempControlled = true;
      maxDist = 800;
    } else {
      vehicle = 'Mahindra Bolero / Tata Ace Maxi Truck';
      capacity = 1000;
      baseRateKm = 12.5;
      targetTemp = 'Ambient Covered';
      tempControlled = false;
      maxDist = 500;
    }
  } else {
    if (isPerishable) {
      vehicle = 'Eicher Pro Reefer 14-ft (2.5T Dedicated Chiller)';
      capacity = 2500;
      baseRateKm = 22.5;
      targetTemp = '12°C - 14°C';
      tempControlled = true;
      maxDist = 1800;
    } else {
      vehicle = 'Eicher 14-ft Covered Cargo Truck (3.0T)';
      capacity = 3000;
      baseRateKm = 16.0;
      targetTemp = 'Dry Ambient';
      tempControlled = false;
      maxDist = 2000;
    }
  }

  // Deterministic Freight Calculation: Base Call-Out Fee + Distance * Rate
  const baseCallOut = 350;
  const estimatedCost = Math.round(baseCallOut + (safeDist * baseRateKm));
  const estimatedHours = parseFloat((safeDist / 42).toFixed(1)); // 42 km/h average speed including highway toll stops

  const handling = [
    'Ensure clean, dry cargo bed free of chemical contaminants or chemical odors.',
    isSpice 
      ? 'Airtight moisture-barrier sealing mandatory to prevent humidity absorption and volatile essential oil degradation.'
      : isPerishable 
        ? 'Stack crates maximum 4 layers high with interlocking corner guides.' 
        : 'Stack bags in interlocking chimney pattern maximum 10 layers.',
    isSpice
      ? 'High-value consignment: Apply tamper-evident electronic lock and maintain zero cross-odor exposure.'
      : 'Fasten cargo with elastic tension straps to minimize highway transit vibration and drop shock.',
    'Driver must maintain continuous sealed cargo compartment without unauthorized stops.'
  ];

  return {
    cropId: cleanId,
    cropName,
    distanceKm: safeDist,
    quantityKg: safeQty,
    recommendedVehicle: vehicle,
    vehicleCapacityKg: capacity,
    temperatureControlledRequired: tempControlled,
    targetTemperature: targetTemp,
    estimatedTransitHours: estimatedHours,
    estimatedFreightCost: estimatedCost,
    ratePerKm: baseRateKm,
    handlingInstructions: handling,
    maxRecommendedDistanceKm: maxDist
  };
}
