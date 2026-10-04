/**
 * Smart Packaging Architecture & Cost Engine
 * Separate from culinary consumption; computes exact packages needed & cost that flows into net realization.
 */

export interface PackagingSpecification {
  cropId: string;
  cropName: string;
  recommendedPackageType: string;
  alternativePackageType: string;
  notRecommendedPackageType: string;
  capacityPerPackageKg: number;
  totalUnitsRequired: number;
  costPerUnit: number;
  totalPackagingCost: number;
  shockAbsorptionRating: number;
  ventilationRequirement: string;
  moistureProtection: string;
  ethyleneManagement: string;
  ecoCertification: string;
}

/**
 * Compute smart packaging specification based on crop, quantity, and transit distance
 */
export function computePackagingSpec(
  cropId: string,
  cropName: string,
  quantityKg: number,
  distanceKm: number = 100
): PackagingSpecification {
  const cleanId = (cropId || '').toLowerCase();
  const safeQty = Math.max(10, quantityKg);

  let recommended = 'Ventilated Food-Grade Plastic Agri-Crates (RPC)';
  let alternative = '5-Ply Heavy Kraft Corrugated Box with side air vents';
  let notRecommended = 'Airtight unventilated polyethylene sacks (traps moisture and heat)';
  let capacityPerUnit = 10;
  let unitCost = 22;
  let shock = 4.6;
  let ventilation = '6% Die-cut precision side slots for cross-vector aeration';
  let moisture = 'Equilibrium relative humidity barrier with bottom absorbent pad';
  let ethylene = 'Potassium permanganate (KMnO4) slow-release sachet insert';
  let eco = '100% Recyclable / Multi-Trip Reusable';

  if (cleanId === 'onion' || cleanId === 'garlic') {
    recommended = 'High-Density Polyethylene Open-Weave Leno Mesh Bags (25kg / 50kg)';
    alternative = 'Jute Gunny Sacks with 25% perforation';
    notRecommended = 'Sealed polythene bags (causes rapid fungal neck rot & sprouting)';
    capacityPerUnit = 25;
    unitCost = 30; // ₹30 per 25kg bag (~₹1.20/kg)
    shock = 3.2;
    ventilation = 'Minimum 35% open mesh matrix for continuous airflow';
    moisture = 'Breathable; keep dry from external rainfall';
    ethylene = 'Isolate from high ethylene fruit emitters';
    eco = '100% Recyclable HDPE Monomaterial';
  } else if (cleanId === 'potato' || cleanId === 'sweet-potato') {
    recommended = 'Breathable Natural Jute Gunny Bags (50kg)';
    alternative = 'Heavy-Duty UV-Protected Polypropylene Woven Bags';
    notRecommended = 'Clear transparent plastic bags (sunlight triggers toxic solanine greening)';
    capacityPerUnit = 50;
    unitCost = 45; // ₹45 per 50kg sack (~₹0.90/kg)
    shock = 2.8;
    ventilation = 'Breathable burlap weave';
    moisture = 'Breathable; keep away from ground condensation';
    ethylene = 'Do not store adjacent to ripening apples';
    eco = '100% Biodegradable Natural Jute';
  } else if (cleanId === 'mango' || cleanId === 'apple' || cleanId === 'pomegranate') {
    recommended = '5-Ply Corrugated Telescopic Gift Carton with Individual EPE Foam Net Sleeves';
    alternative = 'Moulded Recycled Pulp Cell Nest Trays in master carton';
    notRecommended = 'Loose bulk packing without cushioning (causes skin abrasions & sap burn)';
    capacityPerUnit = 5; // 5kg box (12-16 fruits)
    unitCost = 28; // ₹28 per 5kg box (~₹5.60/kg)
    shock = 4.9;
    ventilation = 'Circular 30mm precision perforations with insect screen';
    moisture = 'Moisture-absorbing cellulose bottom liner';
    ethylene = 'Active dual-action 1-MCP ethylene blocker strip';
    eco = 'FSC-Certified Recycled Kraft & Biodegradable Sleeves';
  } else if (cleanId === 'rice' || cleanId === 'wheat' || cleanId === 'maize' || cleanId === 'ragi' || cleanId === 'chickpea') {
    recommended = 'Multi-Wall Moisture-Barrier BOPP Laminated Woven Poly Sacks (25kg / 50kg)';
    alternative = 'Hermetic Gas-Tight Multi-Layer GrainPro Storage Liners';
    notRecommended = 'Damp non-lined jute bags in humid godowns (causes weevil attack & mold)';
    capacityPerUnit = 50;
    unitCost = 42; // ₹42 per 50kg sack (~₹0.84/kg)
    shock = 1.8;
    ventilation = 'Hermetically sealed moisture barrier';
    moisture = '100% Impermeable water vapor barrier (WVTR < 0.5 g/m²/day)';
    ethylene = 'Not required (dry grain)';
    eco = '100% Recyclable Polypropylene Woven Fabric';
  } else if (cleanId === 'almond' || cleanId === 'cashew' || cleanId === 'walnut') {
    recommended = 'Nitrogen-Flushed Vacuum-Sealed Multi-Layer Aluminum Barrier Pouches (1kg / 10kg)';
    alternative = 'Airtight Food-Grade Tinplate Cans (Vita-Pack)';
    notRecommended = 'Open breathable bags exposed to air & light (causes rapid oil rancidity)';
    capacityPerUnit = 10; // 10kg master pack
    unitCost = 85; // ₹85 per 10kg vacuum pack (~₹8.50/kg)
    shock = 1.4;
    ventilation = 'Zero gas exchange (Hermetic vacuum sealed)';
    moisture = 'Zero moisture penetration';
    ethylene = 'Ageless Oxygen Scavenger packet';
    eco = 'High-Barrier Certified Food Contact Packaging';
  }

  const unitsCount = Math.ceil(safeQty / capacityPerUnit);
  const totalCost = unitsCount * unitCost;

  return {
    cropId: cleanId,
    cropName,
    recommendedPackageType: recommended,
    alternativePackageType: alternative,
    notRecommendedPackageType: notRecommended,
    capacityPerPackageKg: capacityPerUnit,
    totalUnitsRequired: unitsCount,
    costPerUnit: unitCost,
    totalPackagingCost: totalCost,
    shockAbsorptionRating: shock,
    ventilationRequirement: ventilation,
    moistureProtection: moisture,
    ethyleneManagement: ethylene,
    ecoCertification: eco
  };
}
