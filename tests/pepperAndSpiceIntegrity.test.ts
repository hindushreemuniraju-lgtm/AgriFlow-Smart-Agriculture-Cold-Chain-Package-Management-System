import { matchProduct, isAmbiguousPepperQuery, PEPPER_COMMODITY_OPTIONS } from '../src/services/catalog/productNormalizationService';
import { getMandiRecordsForCrop, SPICE_TERMINAL_CATALOG } from '../src/services/market/marketDataService';
import { discoverNearbyMandis } from '../src/services/market/mandiDiscoveryService';
import { getProductIntelligence } from '../src/data/productsDatabase';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  }
  console.log(`  ✓ PASS: ${message}`);
}

console.log('\n====================================================');
console.log('🌶️ RUNNING PEPPER & SPICE INTEGRITY VERIFICATION');
console.log('====================================================\n');

// 1. Pepper Disambiguation Check
console.log('1. Testing Pepper Disambiguation Logic:');
assert(isAmbiguousPepperQuery('pepper') === true, 'Ambiguous "pepper" triggers disambiguation');
assert(isAmbiguousPepperQuery('Pepper') === true, 'Ambiguous "Pepper" (capitalized) triggers disambiguation');
assert(isAmbiguousPepperQuery('peppers') === true, 'Ambiguous "peppers" triggers disambiguation');
assert(isAmbiguousPepperQuery('black pepper') === false, 'Specific "black pepper" does NOT trigger disambiguation modal');
assert(isAmbiguousPepperQuery('white pepper') === false, 'Specific "white pepper" does NOT trigger disambiguation modal');
assert(isAmbiguousPepperQuery('bell pepper') === false, 'Specific "bell pepper" does NOT trigger disambiguation modal');
assert(isAmbiguousPepperQuery('chilli pepper') === false, 'Specific "chilli pepper" does NOT trigger disambiguation modal');
assert(PEPPER_COMMODITY_OPTIONS.length === 5, '5 distinct pepper commodity choices provided');

// 2. Canonical Matching & Anti-Collision
console.log('\n2. Testing Canonical Catalog Matching & Anti-Collision:');
const blackPepper = matchProduct('black pepper');
assert(blackPepper.matched && blackPepper.product?.id === 'black-pepper', 'Black pepper resolves to black-pepper');
assert(blackPepper.product?.category === 'spice', 'Black pepper category is spice');
assert(blackPepper.product?.basePriceKg === 1100, 'Black pepper benchmark rate is ₹1100/kg');

const whitePepper = matchProduct('white pepper');
assert(whitePepper.matched && whitePepper.product?.id === 'white-pepper', 'White pepper resolves to white-pepper');
assert(whitePepper.product?.category === 'spice', 'White pepper category is spice');
assert(whitePepper.product?.basePriceKg === 1350, 'White pepper benchmark rate is ₹1350/kg');

const greenPeppercorn = matchProduct('green peppercorn');
assert(greenPeppercorn.matched && greenPeppercorn.product?.id === 'green-peppercorn', 'Green peppercorn resolves to green-peppercorn');
assert(greenPeppercorn.product?.basePriceKg === 850, 'Green peppercorn benchmark rate is ₹850/kg');

const capsicum = matchProduct('capsicum');
assert(capsicum.matched && capsicum.product?.id === 'capsicum', 'Capsicum resolves to capsicum');
assert(capsicum.product?.category === 'vegetable', 'Capsicum category is vegetable');
assert(capsicum.product?.basePriceKg === 48, 'Capsicum benchmark rate is ₹48/kg');

const cardamom = matchProduct('cardamom');
assert(cardamom.matched && cardamom.product?.id === 'cardamom', 'Cardamom resolves to cardamom');
assert(cardamom.product?.category === 'spice', 'Cardamom category is spice');
assert(cardamom.product?.basePriceKg === 1950, 'Cardamom benchmark rate is ₹1950/kg');

// 3. Database Integrity
console.log('\n3. Testing Database Entries:');
const dbCardamom = getProductIntelligence('cardamom');
assert(dbCardamom.id === 'cardamom', 'Cardamom exists in productsDatabase');
assert(dbCardamom.images.productImage === 'cardamom', 'Cardamom product image points to cardamom');

const dbBlackPepper = getProductIntelligence('black-pepper');
assert(dbBlackPepper.id === 'black-pepper', 'Black Pepper exists in productsDatabase');
assert(dbBlackPepper.images.productImage === 'black-pepper', 'Black Pepper product image points to black-pepper (NOT cardamom)');

const dbWhitePepper = getProductIntelligence('white-pepper');
assert(dbWhitePepper.id === 'white-pepper', 'White Pepper exists in productsDatabase');
assert(dbWhitePepper.scientificName.includes('Piper nigrum'), 'White Pepper botanical is Piper nigrum');

// 4. Cardamom & Pepper Price & Realization Math
console.log('\n4. Testing Mandi Price & Realization Math (500 kg batch):');
const cardamomMandis = getMandiRecordsForCrop('cardamom', 'spices');
assert(cardamomMandis.length > 0, 'Cardamom mandis retrieved');
const cardamomFirst = cardamomMandis[0];
// modalPrice should be in the ₹1,70,000 - ₹2,30,000 range per quintal, NOT ₹3,000!
assert(cardamomFirst.modalPrice >= 170000, `Cardamom modalPrice (${cardamomFirst.modalPrice}) is realistic spice rate (>= 170,000)`);
const cardamomRatePerKg = cardamomFirst.modalPricePerKg;
assert(cardamomRatePerKg >= 1700, `Cardamom ratePerKg is >= ₹1700/kg (got ₹${cardamomRatePerKg})`);
const cardamom500KgGross = 500 * cardamomRatePerKg;
assert(cardamom500KgGross >= 850000, `Cardamom 500kg gross realization is >= ₹8,50,000 (got ₹${cardamom500KgGross}) - NOT ₹15,000!`);

const pepperMandis = getMandiRecordsForCrop('black-pepper', 'spices');
assert(pepperMandis.length > 0, 'Black pepper mandis retrieved');
const pepperFirst = pepperMandis[0];
assert(pepperFirst.modalPrice >= 100000, `Black pepper modalPrice (${pepperFirst.modalPrice}) is >= ₹1,00,000 (₹1000+/kg)`);
const pepperRatePerKg = pepperFirst.modalPricePerKg;
assert(pepperRatePerKg >= 1000, `Black pepper ratePerKg is >= ₹1000/kg (got ₹${pepperRatePerKg})`);

// 5. Dynamic Mandi Routing
console.log('\n5. Testing Dynamic Spice Mandi Routing:');
const cardamomDiscovery = discoverNearbyMandis(19.9975, 73.7898, 'cardamom', 'Cardamom', 250, 'spices');
assert(cardamomDiscovery.mandis.length > 0, 'Spice discovery returned auction mandis');
const isSpiceHubPresent = cardamomDiscovery.mandis.some(m => 
  m.market.includes('Bodinayakanur') || m.market.includes('Vandanmedu') || m.market.includes('Spices') || m.market.includes('Kochi') || m.market.includes('Sakleshpur')
);
// 6. Task 3: Seamless End-to-End State Propagation & Anti-NaN
console.log('\n6. Testing End-to-End Transport, Cold Cartonization & Anti-NaN Integrity:');
const { computeTransportGuidance } = await import('../src/services/transport/transportCostService');
const { calculatePerseussColdCartonization } = await import('../src/services/coldchain/perseussColdCartonizationService');
const { calculateMarketRealizations } = await import('../src/services/market/marketComparisonService');

// Transport guidance for Pepper
const pepperTransport = computeTransportGuidance('crop-black-pepper', 'Black Pepper', 500, 350);
assert(!isNaN(pepperTransport.estimatedFreightCost), 'Freight cost is a valid number (no NaN)');
assert(pepperTransport.estimatedFreightCost > 0, 'Freight cost is positive');
assert(pepperTransport.temperatureControlledRequired === true, 'High-value spice requires climate/moisture monitoring');
assert(pepperTransport.recommendedVehicle.includes('Containerized') || pepperTransport.recommendedVehicle.includes('Sealed'), 'Spice routed to secure containerized vehicle');
assert(pepperTransport.handlingInstructions.some(h => h.includes('moisture-barrier') || h.includes('moisture')), 'Spice has moisture-barrier handling instructions');

// Cold cartonization for Spice with ambient-controlled profile
const spiceCartonization = calculatePerseussColdCartonization({
  commodityId: 'black-pepper',
  commodityName: 'Black Pepper',
  commodityCategory: 'Spice',
  payloadWeightKg: 100,
  targetTempProfile: 'AMBIENT_CONTROLLED_15_25C',
  ambientMaxTempC: 38,
  transitDurationHours: 48
});
assert(!isNaN(spiceCartonization.shipper.grossShipmentWeightKg), 'Shipper gross weight is valid number');
assert(!isNaN(spiceCartonization.estimatedPackagingCostInr), 'Packaging cost is valid number');
assert(spiceCartonization.thermalHoldoverTimeline.length > 0, 'Thermal holdover curve generated');
assert(!spiceCartonization.thermalHoldoverTimeline.some(p => isNaN(p.internalTempC)), 'Internal temp points contain no NaN');

// Market realization anti-NaN test
const realizationResults = calculateMarketRealizations(cardamomDiscovery.mandis, 500, 1.5, false);
assert(realizationResults.length > 0, 'Realization computed for spice mandis');
realizationResults.forEach(r => {
  assert(!isNaN(r.grossRevenue) && r.grossRevenue > 0, `Gross revenue (${r.grossRevenue}) is valid positive number`);
  assert(!isNaN(r.netRealization) && r.netRealization > 0, `Net realization (${r.netRealization}) is valid positive number`);
  assert(!isNaN(r.netRatePerKg) && r.netRatePerKg > 0, `Net rate per kg (${r.netRatePerKg}) is valid positive number`);
  assert(!isNaN(r.profitMarginPercent), `Profit margin percent is valid number`);
});

console.log('\n====================================================');
console.log('✅ ALL PEPPER & SPICE INTEGRITY CHECKS PASSED!');
console.log('====================================================\n');
