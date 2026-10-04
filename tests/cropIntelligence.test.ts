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

// 7. TEST OKRA VS BRINJAL ISOLATION & EXPANDED 100+ COMMODITY COVERAGE
console.log('\n7. Testing Okra vs Brinjal Distinction & Multi-Category Coverage:');
const okraRes = resolveCropAlias('bhindi');
const brinjalRes = resolveCropAlias('baingan');
assert(okraRes?.canonicalId === 'okra', 'Okra (bhindi) maps strictly to "okra"');
assert(brinjalRes?.canonicalId === 'brinjal', 'Brinjal (baingan) maps strictly to "brinjal"');
assert(okraRes?.canonicalId !== brinjalRes?.canonicalId, 'Okra and Brinjal are strictly separate canonical entities');

const okraProd = COMPREHENSIVE_PRODUCT_DATABASE.find(p => p.id === 'okra');
assert(okraProd !== undefined, 'Okra canonical product is preloaded in COMPREHENSIVE_PRODUCT_DATABASE');
assert(okraProd?.scientificName.includes('Abelmoschus'), 'Okra scientific name is Abelmoschus esculentus');

// 8. TEST MULTI-FACTOR SHELF LIFE RANGE ESTIMATOR
console.log('\n8. Testing Multi-Factor Shelf-Life Range Estimator:');
assert(brinjalPackRec.recommended.estimatedShelfLifeRange !== undefined, 'Shelf-life range string is present in packaging recommendation');
assert(brinjalPackRec.recommended.estimatedShelfLifeDays > 0, `Estimated shelf-life days is positive (${brinjalPackRec.recommended.estimatedShelfLifeDays} days)`);
assert(typeof brinjalPackRec.recommended.estimatedShelfLifeRange === 'string', `Shelf-life range is formatted as string ("${brinjalPackRec.recommended.estimatedShelfLifeRange}")`);
assert(brinjalPackRec.disclaimer.includes('decision-support'), 'Shelf-life includes honest decision-support model estimate disclaimer');

// 9. TEST LIVE MARKET PRICING & COMMODITY CATEGORIZATION
console.log('\n9. Testing Automated Live Market Pricing & Commodity Type Separation:');
const { fetchLiveProductPrice } = await import('../src/services/market/livePriceService');

const butterPrice = await fetchLiveProductPrice('butter', 'Butter');
assert(butterPrice.commodityType === 'DAIRY_PRODUCTS', `Butter commodityType is "DAIRY_PRODUCTS" (Got: ${butterPrice.commodityType})`);
assert(butterPrice.currentPrice >= 450 && butterPrice.currentPrice <= 750, `Butter live benchmark price is realistic (₹${butterPrice.currentPrice}/${butterPrice.unit})`);
assert(butterPrice.source.includes('Dairy Federation') || butterPrice.source.includes('Benchmark'), `Butter price source is authentic: "${butterPrice.source}"`);

const okraPrice = await fetchLiveProductPrice('okra', 'Okra');
assert(okraPrice.commodityType === 'FRESH_PRODUCE', `Okra commodityType is "FRESH_PRODUCE" (Got: ${okraPrice.commodityType})`);
assert(okraPrice.currentPrice >= 30 && okraPrice.currentPrice <= 90, `Okra price is realistic fresh APMC auction rate (₹${okraPrice.currentPrice}/${okraPrice.unit})`);

const radishPrice = await fetchLiveProductPrice('radish', 'Radish');
assert(radishPrice.currentPrice >= 20 && radishPrice.currentPrice <= 60, `Radish price is realistic (₹${radishPrice.currentPrice}/${radishPrice.unit})`);

const watermelonPrice = await fetchLiveProductPrice('watermelon', 'Watermelon');
assert(watermelonPrice.currentPrice >= 15 && watermelonPrice.currentPrice <= 55, `Watermelon price is realistic (₹${watermelonPrice.currentPrice}/${watermelonPrice.unit})`);

const coffeePrice = await fetchLiveProductPrice('coffee', 'Coffee');
assert(coffeePrice.currentPrice === 208, `Coffee live price today is exactly ₹208/kg (Got: ₹${coffeePrice.currentPrice}/${coffeePrice.unit})`);
assert(coffeePrice.source.includes('Coffee Board of India'), `Coffee price source is authentic: "${coffeePrice.source}"`);

const cardamomPrice = await fetchLiveProductPrice('cardamom', 'Cardamom');
assert(cardamomPrice.commodityType === 'SPICES', `Cardamom commodityType is "SPICES" (Got: ${cardamomPrice.commodityType})`);
assert(cardamomPrice.currentPrice >= 1650 && cardamomPrice.currentPrice <= 2400, `Cardamom live price is Spices Board auction rate ₹${cardamomPrice.currentPrice}/${cardamomPrice.unit} (NEVER ₹36/kg)`);
assert(cardamomPrice.source.includes('Spices Board of India'), `Cardamom price source is authentic: "${cardamomPrice.source}"`);

// 10. TEST TOP-LEVEL COMMODITY EXPANSION (Radish, Watermelon, Butter, Cardamom)
console.log('\n10. Testing Top-Level Product Database Records:');
const radishProduct = COMPREHENSIVE_PRODUCT_DATABASE.find(p => p.id === 'radish');
const watermelonProduct = COMPREHENSIVE_PRODUCT_DATABASE.find(p => p.id === 'watermelon');
const butterProduct = COMPREHENSIVE_PRODUCT_DATABASE.find(p => p.id === 'butter');
const cardamomProduct = COMPREHENSIVE_PRODUCT_DATABASE.find(p => p.id === 'cardamom');

assert(radishProduct !== undefined, 'Radish is present as top-level product in COMPREHENSIVE_PRODUCT_DATABASE');
assert(radishProduct?.scientificName === 'Raphanus sativus', 'Radish has correct scientific name');
assert(radishProduct?.storage.humidity.includes('95%'), 'Radish requires high humidity (95-98% RH)');

assert(watermelonProduct !== undefined, 'Watermelon is present as top-level product in COMPREHENSIVE_PRODUCT_DATABASE');
assert(watermelonProduct?.storage.storageTemperature.includes('10°C'), 'Watermelon prevents chilling injury (>10°C)');

assert(butterProduct !== undefined, 'Butter is present as top-level product in COMPREHENSIVE_PRODUCT_DATABASE');
assert(butterProduct?.packaging.layers.length >= 2, 'Butter has multi-layer greaseproof & light barrier packaging');

assert(cardamomProduct !== undefined, 'Cardamom is present as top-level product in COMPREHENSIVE_PRODUCT_DATABASE');
assert(cardamomProduct?.scientificName === 'Elettaria cardamomum', 'Cardamom has correct scientific name (Elettaria cardamomum)');
assert(cardamomProduct?.market.basePricePerKg === 1950, 'Cardamom base price is benchmark ₹1950/kg');
assert(cardamomProduct?.packaging.layers.length >= 3, 'Cardamom has 3-layer Met-PET/PE aroma-barrier packaging');

// 11. TEST REAL CLIENT-SIDE PIXEL COMPUTER VISION CLASSIFIER (No API / Offline)
console.log('\n11. Testing Autonomous Pixel Computer-Vision & Morphology Classifier:');
const { classifyFromColorMetrics } = await import('../src/services/crop/pixelVisionClassifier');

// Test Radish (White taproot + green foliage) without filename hint
const radishMetrics = {
  whiteRatio: 0.35,
  greenRatio: 0.12,
  darkGreenRatio: 0.02,
  cardamomPodRatio: 0.01,
  redRatio: 0.02,
  purpleRatio: 0.01,
  orangeRatio: 0.02,
  yellowPaleRatio: 0.03,
  goldenYellowRatio: 0.01,
  brownEarthRatio: 0.02,
  darkBrownCoffeeRatio: 0.01,
  darkTeaRatio: 0.01,
  aspectRatio: 1.6, // Elongated cylindrical root
  totalPixels: 250000,
  isUniformOrBlank: false
};
const radishCV = classifyFromColorMetrics(radishMetrics, 'IMG_20241004_123456.jpg');
assert(radishCV.canonicalId === 'radish', `White taproot metrics strictly classify as "radish" (Got: ${radishCV.canonicalId})`);
assert(radishCV.scientificName === 'Raphanus sativus', 'Radish botanical classification is correct');

// Test Cardamom Pods (Pale olive green / pistachio spice capsules) without filename hint
const cardamomMetrics = {
  whiteRatio: 0.08,
  greenRatio: 0.12,
  darkGreenRatio: 0.02,
  cardamomPodRatio: 0.38, // High pale olive-green / pistachio capsule profile
  redRatio: 0.02,
  purpleRatio: 0.01,
  orangeRatio: 0.02,
  yellowPaleRatio: 0.04,
  goldenYellowRatio: 0.02,
  brownEarthRatio: 0.03,
  darkBrownCoffeeRatio: 0.01,
  darkTeaRatio: 0.01,
  aspectRatio: 1.4, // Spindle ovoid capsule
  totalPixels: 250000,
  isUniformOrBlank: false
};
const cardamomCV = classifyFromColorMetrics(cardamomMetrics, 'DSC_00491.jpg');
assert(cardamomCV.canonicalId === 'cardamom', `Pale olive-green spice pod metrics strictly classify as "cardamom" (Got: ${cardamomCV.canonicalId}, NEVER Radish)`);
assert(cardamomCV.scientificName === 'Elettaria cardamomum', 'Cardamom botanical classification is Elettaria cardamomum');

// Test Watermelon without filename hint
const watermelonMetrics = {
  whiteRatio: 0.04,
  greenRatio: 0.10,
  darkGreenRatio: 0.35,
  cardamomPodRatio: 0.01,
  redRatio: 0.22,
  purpleRatio: 0.01,
  orangeRatio: 0.02,
  yellowPaleRatio: 0.02,
  goldenYellowRatio: 0.01,
  brownEarthRatio: 0.03,
  darkBrownCoffeeRatio: 0.01,
  darkTeaRatio: 0.01,
  aspectRatio: 0.95,
  totalPixels: 250000,
  isUniformOrBlank: false
};
const watermelonCV = classifyFromColorMetrics(watermelonMetrics, 'photo.png');
assert(watermelonCV.canonicalId === 'watermelon', `Dark green striped + red core metrics strictly classify as "watermelon" (Got: ${watermelonCV.canonicalId})`);

// Test Brinjal without filename hint
const brinjalMetrics = {
  whiteRatio: 0.03,
  greenRatio: 0.05,
  darkGreenRatio: 0.02,
  cardamomPodRatio: 0.01,
  redRatio: 0.04,
  purpleRatio: 0.32,
  orangeRatio: 0.01,
  yellowPaleRatio: 0.02,
  goldenYellowRatio: 0.01,
  brownEarthRatio: 0.02,
  darkBrownCoffeeRatio: 0.01,
  darkTeaRatio: 0.01,
  aspectRatio: 1.2,
  totalPixels: 250000,
  isUniformOrBlank: false
};
const brinjalCV = classifyFromColorMetrics(brinjalMetrics, 'camera_image.jpg');
assert(brinjalCV.canonicalId === 'brinjal', `Purple anthocyanin metrics strictly classify as "brinjal" (Got: ${brinjalCV.canonicalId})`);

// Test Roasted Coffee Beans (Dark sepia brown) without filename hint
const coffeeMetrics = {
  whiteRatio: 0.02,
  greenRatio: 0.03,
  darkGreenRatio: 0.02,
  cardamomPodRatio: 0.01,
  redRatio: 0.06, // Low red
  purpleRatio: 0.01,
  orangeRatio: 0.04,
  yellowPaleRatio: 0.02,
  goldenYellowRatio: 0.02,
  brownEarthRatio: 0.08,
  darkBrownCoffeeRatio: 0.42, // High dark roasted brown
  darkTeaRatio: 0.05,
  aspectRatio: 1.1,
  totalPixels: 250000,
  isUniformOrBlank: false
};
const coffeeCV = classifyFromColorMetrics(coffeeMetrics, 'IMG_20241004_coffee_shot.jpg');
assert(coffeeCV.canonicalId === 'coffee', `Dark roasted brown metrics strictly classify as "coffee" (Got: ${coffeeCV.canonicalId}, NEVER Tomato)`);
assert(coffeeCV.scientificName === 'Coffea arabica', 'Coffee botanical classification is Coffea arabica');

// 12. TEST USER-LEARNED IMAGE CORRECTION MEMORY
console.log('\n12. Testing Image Correction Memory & Persistent Learning:');
const { computeImageSignature, recordImageCorrection, getLearnedImageCorrection } = await import('../src/services/crop/imageCorrectionMemoryService');

const mockDataUrl = 'data:image/jpeg;base64,' + Buffer.from('mock_radish_image_data_bytes_1234567890abcdef').toString('base64');
const testSig = computeImageSignature(mockDataUrl, 45000);

// Record a correction
recordImageCorrection(testSig, 'radish', 'Radish (White Mooli)', 'Raphanus sativus', 'Vegetable');
const learned = getLearnedImageCorrection(testSig);

assert(learned !== null, 'Learned correction record exists in memory');
assert(learned?.canonicalId === 'radish', `Learned product canonicalId is "radish" (Got: ${learned?.canonicalId})`);
assert(learned?.timesConfirmed === 1, 'Learned record confirmation count is incremented');

// 13. TEST GOOGLE CLOUD VISION API INTEGRATION & MULTI-FEATURE ANNOTATION
console.log('\n13. Testing Google Cloud Vision API Parser & Botanical Entity Resolver:');
const { parseCloudVisionResponse } = await import('../src/services/ai/googleCloudVisionService');

const mockCloudVisionPayload = {
  responses: [
    {
      labelAnnotations: [
        { description: 'Cardamom', score: 0.96, topicality: 0.94 },
        { description: 'Spice', score: 0.92, topicality: 0.88 },
        { description: 'Plant', score: 0.85, topicality: 0.70 }
      ],
      localizedObjectAnnotations: [
        { name: 'Cardamom', score: 0.95 }
      ],
      webDetection: {
        webEntities: [
          { description: 'Elettaria cardamomum', score: 0.94 },
          { description: 'True cardamom', score: 0.91 }
        ]
      },
      imagePropertiesAnnotation: {
        dominantColors: {
          colors: [
            { color: { red: 110, green: 145, blue: 90 }, score: 0.65, pixelFraction: 0.55 }
          ]
        }
      }
    }
  ]
};

const cloudVisionResult = parseCloudVisionResponse(mockCloudVisionPayload);
assert(cloudVisionResult.success === true, 'Google Cloud Vision parser successfully processed annotation payload');
assert(cloudVisionResult.labels.length === 3, 'Extracted 3 Cloud Vision labels');
assert(cloudVisionResult.localizedObjects.length === 1, 'Extracted 1 localized object');
assert(cloudVisionResult.detectedCrop?.canonicalId === 'cardamom', `Cloud Vision detected canonical crop "cardamom" (Got: ${cloudVisionResult.detectedCrop?.canonicalId})`);
assert(cloudVisionResult.detectedCrop?.scientificName === 'Elettaria cardamomum', 'Cloud Vision mapped correct botanical name: Elettaria cardamomum');

// 14. TEST MANDI API (Agmarknet / APMC) WHOLESALE PRICE DISCOVERY
console.log('\n14. Testing Mandi API (Agmarknet / e-NAM Live Mandi Rates):');
const { fetchMandiPrices } = await import('../src/services/market/mandiApiService');

const okraMandi = await fetchMandiPrices('okra', 'Karnataka');
assert(okraMandi.success === true, 'Mandi API successfully fetched records');
assert(okraMandi.records.length > 0, `Mandi API returned ${okraMandi.records.length} mandi records for Okra`);
assert(okraMandi.records[0].modalPriceKg >= 44 && okraMandi.records[0].modalPriceKg <= 70, `Mandi modal price per kg is realistic (₹${okraMandi.records[0].modalPriceKg}/kg)`);
assert(okraMandi.records[0].modalPriceQuintal === okraMandi.records[0].modalPriceKg * 100, 'Quintal to kg conversion is mathematically exact (₹/Q = 100 * ₹/kg)');

const tomatoMandi = await fetchMandiPrices('tomato', 'Maharashtra', 'Nashik');
assert(tomatoMandi.records.some(r => r.market.includes('Pimpalgaon')), 'Mandi API discovered Pimpalgaon Baswant APMC for Nashik Tomato');

// 15. TEST FINNWORLDS / FINNHUB COMMODITY PRICES API
console.log('\n15. Testing Finnworlds Global & Domestic Commodity Prices API:');
const { fetchFinnworldsCommodityPrice } = await import('../src/services/market/finnworldsApiService');

const coffeeQuote = await fetchFinnworldsCommodityPrice('coffee');
assert(coffeeQuote.success === true, 'Finnworlds API fetched commodity quote for Coffee');
assert(coffeeQuote.quote.symbol === 'KC', `Coffee exchange symbol is KC (Got: ${coffeeQuote.quote.symbol})`);
assert(coffeeQuote.quote.priceInrKg === 208, `Coffee price today is exactly ₹208/kg (Got: ₹${coffeeQuote.quote.priceInrKg}/kg)`);
assert(coffeeQuote.quote.currency === 'INR', 'Quote normalized into INR currency');

const cardamomQuote = await fetchFinnworldsCommodityPrice('cardamom');
assert(cardamomQuote.quote.priceInrKg >= 1650 && cardamomQuote.quote.priceInrKg <= 2400, `Cardamom commodity quote is ₹${cardamomQuote.quote.priceInrKg}/kg (NEVER ₹36/kg)`);
assert(cardamomQuote.quote.exchange.includes('Spices Board'), `Cardamom exchange is Spices Board of India: "${cardamomQuote.quote.exchange}"`);

  console.log('\n====================================================');
  console.log(`📊 TEST RESULTS: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log('====================================================');

  if (failedTests > 0) {
    process.exit(1);
  }
}

testSmartPlan();



