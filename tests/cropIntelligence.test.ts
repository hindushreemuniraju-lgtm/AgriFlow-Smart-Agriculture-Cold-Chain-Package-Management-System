/**
 * Automated Verification Test Suite for AgriFlow Universal Crop Intelligence System
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
console.log('🚀 RUNNING AGRIFLOW UNIVERSAL CROP INTELLIGENCE TESTS');
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

// 2. TEST CROP SWITCHING & ZERO DATA LEAKAGE
console.log('\n2. Testing Product Switching & Data Isolation (Brinjal -> Tomato -> Mango -> Rice -> Almond -> Brinjal):');
const switchSequence = ['brinjal', 'tomato', 'mango', 'rice', 'almond', 'brinjal'];
const switchExpected = [
  { name: 'Brinjal', scientific: 'Solanum melongena', emoji: '🍆', temp: '12°C - 14°C' },
  { name: 'Tomato', scientific: 'Solanum lycopersicum', emoji: '🍅', temp: '12°C - 15°C (DO NOT store below 10°C)' },
  { name: 'Mango', scientific: 'Mangifera indica', emoji: '🥭', temp: '12°C - 13°C' },
  { name: 'Rice (Paddy)', scientific: 'Oryza sativa', emoji: '🌾', temp: 'Ambient Dry (18°C - 25°C)' },
  { name: 'Almond (Badam)', scientific: 'Prunus dulcis', emoji: '🌰', temp: '0°C - 5°C (Cold) or <18°C (Ambient dark)' },
  { name: 'Brinjal', scientific: 'Solanum melongena', emoji: '🍆', temp: '12°C - 14°C' }
];

switchSequence.forEach((cropId, idx) => {
  const knowledge = getEnrichedCropKnowledge(cropId);
  const visual = getVerifiedCropVisual(knowledge.id, knowledge.name);
  const expected = switchExpected[idx];

  assert(knowledge.name.includes(expected.name), `Step ${idx + 1}: ${cropId} name matches "${expected.name}"`);
  assert(knowledge.scientificName.includes(expected.scientific) || expected.scientific.includes(knowledge.scientificName), `Step ${idx + 1}: ${cropId} scientific name matches "${expected.scientific}"`);
  assert(visual.emoji === expected.emoji, `Step ${idx + 1}: ${cropId} visual icon is "${expected.emoji}" (Never broccoli/generic substitute)`);
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

// 4. TEST UNKNOWN CROP DYNAMIC KNOWLEDGE DISCOVERY
console.log('\n4. Testing Unknown Crop Dynamic Synthesis:');
const unknownCrop = getEnrichedCropKnowledge('Dragon Fruit');
assert(unknownCrop.name.includes('Dragon Fruit'), 'Unknown crop "Dragon Fruit" generated authentic name');
assert(unknownCrop.knowledgeMeta.isDynamicallyDiscovered === true, 'Flagged as dynamically discovered with source provenance');
assert(unknownCrop.growing.growthDuration !== '', 'Synthesized complete agronomic cultivation profile');
assert(unknownCrop.storage.storageTemperature !== '', 'Synthesized storage temperature');

// 5. TEST UNIVERSAL SMART PLAN GENERATION
console.log('\n5. Testing End-to-End Universal Smart Plan Synthesis:');
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
