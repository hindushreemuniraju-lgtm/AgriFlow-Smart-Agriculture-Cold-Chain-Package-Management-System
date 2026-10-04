/**
 * Automated Verification Test Suite for AgriFlow Universal Crop Intelligence System & SIH26236 Food Packaging Module
 */

import { resolveCropAlias, calculateSimilarity, getDidYouMeanSuggestions } from '../src/services/crop/cropAliasService';
import { getVerifiedCropVisual } from '../src/services/crop/cropImageService';
import { identifyCropFromText } from '../src/services/crop/cropIdentificationService';
import { getEnrichedCropKnowledge } from '../src/services/crop/cropKnowledgeService';
import { discoverNearbyMandis } from '../src/services/market/mandiDiscoveryService';
import { calculateMarketRealizations } from '../src/services/market/marketComparisonService';
import { getPriceHistoryAnalytics } from '../src/services/market/priceHistoryService';
import { generateSmartMarketRecommendation } from '../src/services/market/marketRecommendationService';
import { generateUniversalSmartPlan } from '../src/services/ai/smartPlanService';
import { INDIAN_AGRI_DISTRICTS } from '../src/services/location/geocodingService';
import { generatePackagingRecommendation, calculateRespirationKinetics } from '../src/services/packaging/packagingRecommendationEngine';
import { evaluateJourneySuitability } from '../src/services/transport/deliverySuitabilityService';
import { COMPREHENSIVE_PRODUCT_DATABASE } from '../src/data/productsDatabase';

let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string) {
  if (condition) {
    console.log(`  ✓ PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`  ✗ FAIL: ${testName}`);
    failedTests++;
  }
}

console.log('====================================================');
console.log('🚀 RUNNING AGRIFLOW UNIVERSAL CROP & SIH26236 PACKAGING TESTS');
console.log('====================================================\n');

// 1. TEST ALIAS & CANONICAL MAPPING
console.log('1. Testing Alias & Canonical Name Resolution:');
const brinjalAliases = ['brinjal', 'eggplant', 'aubergine', 'baingan', 'baigan', 'Solanum melongena', 'vangi'];
brinjalAliases.forEach(alias => {
  const res = resolveCropAlias(alias);
  assert(res !== null && res.canonicalId === 'brinjal', `Alias "${alias}" maps to canonical "brinjal" (Got: ${res?.canonicalId})`);
});

const okraAliases = ['lady finger', 'okra', 'bhindi', 'bendakaya'];
okraAliases.forEach(alias => {
  const res = resolveCropAlias(alias);
  assert(res !== null && res.canonicalId === 'okra', `Alias "${alias}" maps to canonical "okra" (Got: ${res?.canonicalId})`);
});

const otherAliases = [
  { q: 'capsicum', expected: 'capsicum' },
  { q: 'bell pepper', expected: 'capsicum' },
  { q: 'chikoo', expected: 'sapota' },
  { q: 'sapota', expected: 'sapota' },
  { q: 'groundnut', expected: 'groundnut' },
  { q: 'peanut', expected: 'groundnut' },
  { q: 'groundnut oil', expected: 'groundnut-oil' },
  { q: 'milk', expected: 'milk' },
  { q: 'cow milk', expected: 'milk' },
  { q: 'ghee', expected: 'ghee' },
  { q: 'desi ghee', expected: 'ghee' },
  { q: 'wheat flour', expected: 'wheat-flour' },
  { q: 'atta', expected: 'wheat-flour' },
  { q: 'tea', expected: 'tea' },
  { q: 'coffee', expected: 'coffee' },
  { q: 'turmeric', expected: 'turmeric' },
  { q: 'haldi', expected: 'turmeric' },
  { q: 'potato', expected: 'potato' },
  { q: 'aloo', expected: 'potato' },
  { q: 'onion', expected: 'onion' },
  { q: 'pyaz', expected: 'onion' },
  { q: 'tomato', expected: 'tomato' },
  { q: 'tamatar', expected: 'tomato' }
];

otherAliases.forEach(({ q, expected }) => {
  const res = resolveCropAlias(q);
  assert(res !== null && res.canonicalId === expected, `Query "${q}" maps to canonical "${expected}"`);
});

// 2. TEST CROP SWITCHING & ZERO DATA LEAKAGE ACROSS AGRICULTURAL & PROCESSED GOODS
console.log('\n2. Testing Product Switching & Isolation Across Crops & Processed Foods:');
const switchSequence = ['brinjal', 'tomato', 'groundnut', 'groundnut-oil', 'milk', 'ghee', 'wheat-flour', 'tea', 'coffee'];
const switchExpected = [
  { name: 'Brinjal', scientific: 'Solanum melongena', emoji: '🍆' },
  { name: 'Tomato', scientific: 'Solanum lycopersicum', emoji: '🍅' },
  { name: 'Groundnut', scientific: 'Arachis hypogaea', emoji: '🥜' },
  { name: 'Groundnut Oil', scientific: 'Oleum Arachis', emoji: '🛢️' },
  { name: 'Cow Milk', scientific: 'Lac Vaccinum', emoji: '🥛' },
  { name: 'Ghee', scientific: 'Butyrum Purificatum', emoji: '🫙' },
  { name: 'Whole Wheat Flour', scientific: 'Triticum aestivum', emoji: '🌾' },
  { name: 'Tea', scientific: 'Camellia sinensis', emoji: '🍵' },
  { name: 'Coffee', scientific: 'Coffea arabica', emoji: '☕' }
];

switchSequence.forEach((cropId, idx) => {
  const knowledge = getEnrichedCropKnowledge(cropId);
  const visual = getVerifiedCropVisual(knowledge.id, knowledge.name);
  const expected = switchExpected[idx];

  assert(knowledge.name.includes(expected.name), `Step ${idx + 1}: ${cropId} name matches "${expected.name}"`);
  assert(knowledge.scientificName.includes(expected.scientific) || expected.scientific.includes(knowledge.scientificName), `Step ${idx + 1}: ${cropId} scientific name matches "${expected.scientific}"`);
  assert(visual.emoji === expected.emoji, `Step ${idx + 1}: ${cropId} visual icon is "${expected.emoji}" (Never generic/wrong substitute)`);
});

// 3. TEST DETERMINISTIC NET REALIZATION & MANDI RECOMMENDATION
console.log('\n3. Testing Deterministic Financial Calculations & Market Recommendation:');
const farmerLat = INDIAN_AGRI_DISTRICTS['nashik'].lat;
const farmerLng = INDIAN_AGRI_DISTRICTS['nashik'].lng;
const mandis = discoverNearbyMandis(farmerLat, farmerLng, 'brinjal', 'Brinjal', 200);

assert(mandis.mandis.length >= 2, `Progressive mandi discovery found ${mandis.mandis.length} mandis near Nashik`);

const qty = 500; // 500 kg
const realizations = calculateMarketRealizations(mandis.mandis, qty, 1.20, true);
assert(realizations.length > 0, `Calculated net realization for ${realizations.length} mandis`);

const best = realizations[0];
assert(best.grossRevenue === qty * best.mandi.modalPricePerKg, `Gross revenue correctly equals qty * raw price (₹${best.grossRevenue})`);
assert(best.netRealization === best.grossRevenue - best.totalDeductions, `Net realization strictly equals Gross - Deductions (₹${best.netRealization})`);
assert(best.netRatePerKg === parseFloat((best.netRealization / qty).toFixed(2)), `Net rate per kg is correctly computed (₹${best.netRatePerKg}/kg)`);

const trend = getPriceHistoryAnalytics('brinjal', best.mandi.modalPrice);
const rec = generateSmartMarketRecommendation('Brinjal', 'Nashik, Maharashtra', realizations, trend);
assert(rec !== null, 'Generated valid smart market recommendation');
assert(rec?.bestMarket.mandi.market === best.mandi.market, `Recommended best market is "${best.mandi.market}"`);

// 4. TEST SIH26236 PACKAGING RECOMMENDATION & RESPIRATION KINETICS
console.log('\n4. Testing SIH26236 Food Packaging Recommendation Engine:');
const brinjalProduct = COMPREHENSIVE_PRODUCT_DATABASE.find(p => p.id === 'brinjal')!;
const milkProduct = COMPREHENSIVE_PRODUCT_DATABASE.find(p => p.id === 'milk')!;
const coffeeProduct = COMPREHENSIVE_PRODUCT_DATABASE.find(p => p.id === 'coffee')!;

// 4.1 Test fresh respiring produce (Brinjal)
const brinjalRespiration = calculateRespirationKinetics(brinjalProduct, 13);
assert(brinjalRespiration.requiresVentilation === true, 'Fresh brinjal flagged as requiring ventilation');
assert(brinjalRespiration.estimatedO2ConsumptionMgKgHr > 0, `Calculated realistic O2 consumption: ${brinjalRespiration.estimatedO2ConsumptionMgKgHr} mg/kg·h`);

const brinjalPackRec = generatePackagingRecommendation({
  product: brinjalProduct,
  quantityKg: 500,
  targetShelfLifeDays: 14,
  storageTempC: 13,
  humidityPercent: 85,
  distanceKm: 200,
  estimatedTravelHours: 5,
  vehicleType: 'Ventilated LCV',
  budgetPreference: 'balanced',
  sustainabilityPreference: 'standard'
});

assert(brinjalPackRec.recommended.material.category === 'Paper & Corrugated' || brinjalPackRec.recommended.material.category === 'Returnable Container' || brinjalPackRec.recommended.material.compatibility.perforatedVentilationAvailable, 'Recommended breathable/ventilated packaging for fresh brinjal');
assert(brinjalPackRec.notRecommended.material.barrierProperties.oxygenBarrierTier === 'Ultra-High', 'Flagged non-ventilated ultra-high barrier foil as Not Recommended for fresh respiring produce (anaerobic risk)');

// 4.2 Test processed dry/fat commodity (Coffee)
const coffeePackRec = generatePackagingRecommendation({
  product: coffeeProduct,
  quantityKg: 100,
  targetShelfLifeDays: 365,
  storageTempC: 20,
  humidityPercent: 50,
  distanceKm: 1000,
  estimatedTravelHours: 24,
  vehicleType: 'Covered Dry Container',
  budgetPreference: 'balanced',
  sustainabilityPreference: 'standard'
});

assert(coffeePackRec.recommended.material.barrierProperties.oxygenBarrierTier === 'Ultra-High' || coffeePackRec.recommended.material.barrierProperties.oxygenBarrierTier === 'High', 'Recommended high oxygen & light barrier for roasted coffee');

// 5. TEST DISTANCE & DELIVERY SUITABILITY ENGINE
console.log('\n5. Testing Distance & Delivery Transport Suitability:');
const milkJourney = evaluateJourneySuitability(milkProduct, 500, 500, 'Tata Ace (Open Ambient)');
const localMilkJourney = milkJourney.standardEvaluations.find(e => e.distanceKm === 20)!;
const longMilkJourney = milkJourney.standardEvaluations.find(e => e.distanceKm === 500)!;

assert(localMilkJourney.viabilityStatus === 'Approved', 'Local 20 km raw milk delivery is Approved');
assert(longMilkJourney.viabilityStatus === 'Critical Risk' || longMilkJourney.viabilityStatus === 'Conditional', 'Long-haul 500 km raw milk journey flagged with Critical / Spoilage warning');
assert(longMilkJourney.isRefrigerationMandatory === true, 'Refrigeration (4°C) strictly mandatory for milk transit');

// 6. TEST UNIVERSAL SMART PLAN GENERATION
console.log('\n6. Testing End-to-End Universal Smart Plan Synthesis:');
async function testSmartPlan() {
  const plan = await generateUniversalSmartPlan('brinjal', {
    formattedAddress: 'Nashik District, Maharashtra',
    city: 'Nashik',
    district: 'Nashik',
    state: 'Maharashtra',
    country: 'India',
    latitude: farmerLat,
    longitude: farmerLng,
    source: 'offline-directory'
  }, 1000);

  assert(plan.crop.name.includes('Brinjal'), 'Smart plan contains verified Brinjal crop');
  assert(plan.weather.temperatureC > -50, 'Smart plan contains real weather temperature');
  assert(plan.packagingSpec.totalUnitsRequired > 0, 'Smart plan contains calculated packaging unit count');
  assert(plan.transportGuidance.estimatedFreightCost > 0, 'Smart plan contains deterministic transport cost');
  assert(plan.realizations.length > 0, 'Smart plan contains complete mandi realizations breakdown');
  assert(plan.provenanceBatchHash.startsWith('0X'), 'Smart plan generated cryptographic provenance hash');

  console.log('\n====================================================');
  console.log(`📊 TEST RESULTS: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log('====================================================');

  if (failedTests > 0) {
    process.exit(1);
  }
}

testSmartPlan();
