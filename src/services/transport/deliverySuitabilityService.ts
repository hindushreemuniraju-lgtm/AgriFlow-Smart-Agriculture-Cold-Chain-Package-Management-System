/**
 * Distance + Delivery & Transport Suitability Engine
 * Evaluates transit viability across 20km, 100km, 500km, and 1000+km distances.
 * Anti-hallucinatory: Rejects unviable journeys (e.g. raw milk or ripe berries over 500km in open ambient trucks).
 */

import { ProductIntelligence } from '../../types/product';

export interface JourneyEvaluation {
  distanceKm: number;
  label: 'Local (20 km)' | 'Regional (100 km)' | 'Inter-District (500 km)' | 'National Highway (1,000 km)' | 'Custom Distance';
  estimatedTransitHours: number;
  loadingUnloadingBufferHours: number;
  totalDeliveryHours: number;
  recommendedVehicle: string;
  isRefrigerationMandatory: boolean;
  targetTempC: string;
  viabilityStatus: 'Approved' | 'Conditional' | 'Critical Risk';
  viabilityColor: string;
  spoilageRiskPercent: number;
  estimatedFreightCost: number;
  estimatedTransitLossCost: number;
  answers: {
    canTransportFar: string;
    deliveryTimeframe: string;
    packagingRequirement: string;
    refrigerationVerdict: string;
    journeySuitabilityVerdict: string;
  };
  criticalWarnings: string[];
}

export interface DeliverySuitabilityReport {
  product: ProductIntelligence;
  quantityKg: number;
  basePricePerKg: number;
  standardEvaluations: JourneyEvaluation[];
  customEvaluation: JourneyEvaluation;
}

export function evaluateJourneySuitability(
  product: ProductIntelligence,
  quantityKg: number,
  customDistanceKm: number = 250,
  selectedVehicleType: string = 'Ventilated LCV'
): DeliverySuitabilityReport {
  const isFreshPerishable = product.category === 'Vegetable' || product.category === 'Fruit' || product.category === 'Dairy';
  const isRawMilk = product.id.includes('milk') && !product.id.includes('powder') && !product.id.includes('uht');
  const isProcessedDry = product.category === 'Grain' || product.category === 'Pulse' || product.category === 'Dry Fruit' || product.category === 'Spice' || product.category === 'Flour';
  const isFatOil = product.category === 'Oil & Oilseed' || product.id.includes('ghee') || product.id.includes('oil');

  const basePrice = product.market.basePricePerKg || 40;
  const grossValue = quantityKg * basePrice;

  const distances: { dist: number; label: JourneyEvaluation['label'] }[] = [
    { dist: 20, label: 'Local (20 km)' },
    { dist: 100, label: 'Regional (100 km)' },
    { dist: 500, label: 'Inter-District (500 km)' },
    { dist: 1000, label: 'National Highway (1,000 km)' }
  ];

  function evaluateSingleDistance(dist: number, label: JourneyEvaluation['label'], vehicle: string): JourneyEvaluation {
    const avgSpeed = dist <= 50 ? 25 : dist <= 200 ? 40 : 50; // Indian road speeds
    const transitHours = Math.round((dist / avgSpeed) * 10) / 10;
    const bufferHours = dist <= 50 ? 1.0 : dist <= 200 ? 2.0 : 3.5;
    const totalHours = Math.round((transitHours + bufferHours) * 10) / 10;

    let isReeferNeeded = false;
    let recVehicle = 'Ventilated LCV (Tata 407)';
    let tempTarget = 'Ambient (18°C - 24°C)';
    let status: JourneyEvaluation['viabilityStatus'] = 'Approved';
    let color = '#10b981';
    let spoilageLoss = 1.0; // 1%
    const warnings: string[] = [];

    // Base Freight calculation: base rate + (km * ratePerKm)
    let ratePerKm = 18;
    if (dist >= 500) ratePerKm = 24;

    if (isRawMilk) {
      isReeferNeeded = true;
      recVehicle = 'Insulated Milk Tanker (4°C)';
      tempTarget = '4°C ± 0.5°C';

      if (dist > 300) {
        status = 'Critical Risk';
        color = '#ef4444';
        spoilageLoss = 28;
        warnings.push('CRITICAL BACTERIAL SOURING: Raw untreated milk has maximum 4-6 hour safe transit window without processing. Convert to UHT, Paneer, or Ghee for long distance (>300km).');
      } else if (dist > 100) {
        status = 'Conditional';
        color = '#f59e0b';
        spoilageLoss = 8;
        warnings.push('Active chilling tanker mandatory. Maintain unbroken 4°C cold chain.');
      } else {
        status = 'Approved';
        color = '#10b981';
        spoilageLoss = 1.5;
      }
    } else if (isFreshPerishable) {
      if (dist >= 500) {
        isReeferNeeded = true;
        recVehicle = 'Temperature-Controlled Reefer Truck (12°C - 14°C)';
        tempTarget = product.storage.storageTemperature || '12°C - 14°C';
        ratePerKm = 28;

        if (vehicle.toLowerCase().includes('open') || vehicle.toLowerCase().includes('ambient')) {
          status = 'Critical Risk';
          color = '#ef4444';
          spoilageLoss = 32;
          warnings.push(`UNSUITABLE VEHICLE: Transporting fresh ${product.name} over ${dist} km without refrigeration in ambient open truck causes 30%+ heat rotting and shrinkage.`);
        } else {
          status = 'Conditional';
          color = '#f59e0b';
          spoilageLoss = 5.5;
          warnings.push('Reefer transit approved. Pre-cooling to 12°C mandatory before dispatch.');
        }
      } else if (dist >= 100) {
        recVehicle = 'Ventilated LCV with Soft Cushioning';
        tempTarget = '15°C - 18°C (Shade)';
        spoilageLoss = 3.0;
        status = 'Approved';
        color = '#10b981';
      } else {
        recVehicle = 'Tata Ace (Chhota Hathi) / Returnable Crates';
        spoilageLoss = 1.2;
        status = 'Approved';
        color = '#10b981';
      }
    } else if (isProcessedDry || isFatOil) {
      recVehicle = 'Covered Waterproof Dry Container Truck';
      tempTarget = 'Ambient Dry (<25°C)';
      ratePerKm = 16;
      spoilageLoss = dist >= 500 ? 0.8 : 0.3;
      status = 'Approved';
      color = '#10b981';

      if (isFatOil && dist >= 500) {
        warnings.push('Protect containers from direct solar exposure on open highways to prevent lipid thermal oxidation.');
      }
    }

    const freightCost = Math.round(1200 + (dist * ratePerKm * (quantityKg / 1000)));
    const transitLossCost = Math.round((spoilageLoss / 100) * grossValue);

    return {
      distanceKm: dist,
      label,
      estimatedTransitHours: transitHours,
      loadingUnloadingBufferHours: bufferHours,
      totalDeliveryHours: totalHours,
      recommendedVehicle: recVehicle,
      isRefrigerationMandatory: isReeferNeeded,
      targetTempC: tempTarget,
      viabilityStatus: status,
      viabilityColor: color,
      spoilageRiskPercent: spoilageLoss,
      estimatedFreightCost: freightCost,
      estimatedTransitLossCost: transitLossCost,
      answers: {
        canTransportFar: status === 'Critical Risk' 
          ? `❌ NO: Journey of ${dist} km is NOT viable for ${product.name} under current parameters without severe spoilage.`
          : status === 'Conditional' 
          ? `⚠️ YES (WITH CAUTION): Viable ONLY if ${recVehicle} and pre-cooling protocols are enforced.`
          : `✅ YES: Journey of ${dist} km is fully viable and within safe shelf-life tolerance.`,
        deliveryTimeframe: `Estimated delivery window: ${totalHours} hours (Transit: ${transitHours}h + Logistics Buffer: ${bufferHours}h).`,
        packagingRequirement: isFreshPerishable 
          ? 'Ventilated CFB Corrugated Cartons with cell dividers or Returnable Plastic Crates (RPC).'
          : 'Moisture-barrier multi-layer BOPP / HDPE sacks or hermetic foil pouches.',
        refrigerationVerdict: isReeferNeeded 
          ? `MANDATORY: Requires continuous refrigerated cold chain (${tempTarget}).` 
          : `Not required: Ambient protected dry transit (${tempTarget}) is sufficient.`,
        journeySuitabilityVerdict: status === 'Critical Risk'
          ? 'Route Rejected: High risk of commercial rejection at destination APMC.'
          : status === 'Conditional'
          ? 'Route Approved conditionally upon temperature verification at pickup.'
          : 'Route Fully Approved with optimal net commercial realization.'
      },
      criticalWarnings: warnings
    };
  }

  const standardEvaluations = distances.map(d => evaluateSingleDistance(d.dist, d.label, selectedVehicleType));
  const customEvaluation = evaluateSingleDistance(customDistanceKm, 'Custom Distance', selectedVehicleType);

  return {
    product,
    quantityKg,
    basePricePerKg: basePrice,
    standardEvaluations,
    customEvaluation
  };
}
