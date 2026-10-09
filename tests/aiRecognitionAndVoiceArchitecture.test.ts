/**
 * Architectural Verification Test Suite for AgriFlow AI Food Recognition,
 * Centralized Multilingual Catalog Normalization, and Regional Voice Assistant.
 */

import { 
  matchProduct, 
  resolveProduct, 
  normalizeProductName, 
  CENTRAL_PRODUCT_CATALOG 
} from '../src/services/catalog/productNormalizationService';
import { 
  resolveProductAlias, 
  getProductIntelligence 
} from '../src/data/productsDatabase';
import { resolveCropAlias } from '../src/services/crop/cropAliasService';

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`  ✓ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${testName} ${detail ? `(${detail})` : ''}`);
    failed++;
  }
}

console.log('====================================================');
console.log('🚀 RUNNING ARCHITECTURAL AI RECOGNITION & VOICE TESTS');
console.log('====================================================\n');

// 1. APPLE RESOLUTION (Previously bugged to Mango)
console.log('1. Testing Apple Resolution:');
const appleQueries = ['apple', 'Apple', 'apples', 'Apples', 'royal delicious', 'fresh apple', 'सेब', 'ಸೇಬು', 'ఆపిల్', 'ஆப்பிள்'];
appleQueries.forEach(q => {
  const res = resolveProduct(q);
  assert(res !== null && res.id === 'apple', `Query "${q}" resolves to canonical "apple"`, `Got: ${res?.id}`);
  
  const dbAlias = resolveProductAlias(q);
  assert(dbAlias === 'apple', `Database alias for "${q}" returns "apple"`, `Got: ${dbAlias}`);
});

const appleIntel = getProductIntelligence('apple');
assert(appleIntel.id === 'apple' && appleIntel.name.includes('Apple'), 'Apple intelligence is authentic and not Mango');
assert(appleIntel.scientificName === 'Malus domestica', 'Apple scientific name is Malus domestica');
assert(appleIntel.icon === '🍎', 'Apple icon is 🍎');

// 2. ORANGE RESOLUTION (Previously bugged to Mango)
console.log('\n2. Testing Orange Resolution:');
const orangeQueries = ['orange', 'Orange', 'oranges', 'nagpur orange', 'santra', 'santre', 'संतरा', 'ಕಿತ್ತಳೆ', 'నారింజ', 'ஆரஞ்சு'];
orangeQueries.forEach(q => {
  const res = resolveProduct(q);
  assert(res !== null && res.id === 'orange', `Query "${q}" resolves to canonical "orange"`, `Got: ${res?.id}`);
  
  const dbAlias = resolveProductAlias(q);
  assert(dbAlias === 'orange', `Database alias for "${q}" returns "orange"`, `Got: ${dbAlias}`);
});

const orangeIntel = getProductIntelligence('orange');
assert(orangeIntel.id === 'orange' && orangeIntel.name.includes('Orange'), 'Orange intelligence is authentic and not Mango');
assert(orangeIntel.scientificName.includes('Citrus reticulata'), 'Orange scientific name contains Citrus reticulata');
assert(orangeIntel.icon === '🍊', 'Orange icon is 🍊');

// 3. BUTTER VS BUTTER FRUIT STRICT DISCRIMINATION (Anti-Collision Architecture)
console.log('\n3. Testing Butter vs Butter Fruit Anti-Collision Discrimination:');
const dairyButterQueries = ['butter', 'Butter', 'makkhan', 'makkan', 'मक्खन', 'ಬೆಣ್ಣೆ', 'వెన్న', 'வெண்ணெய்'];
dairyButterQueries.forEach(q => {
  const res = resolveProduct(q);
  assert(res !== null && res.id === 'butter', `Dairy query "${q}" resolves to "butter" (Dairy)`, `Got: ${res?.id}`);
  assert(res?.category === 'dairy', `Category for "${q}" is "dairy"`, `Got: ${res?.category}`);
  
  const dbAlias = resolveProductAlias(q);
  assert(dbAlias === 'butter', `Database alias for "${q}" returns "butter"`, `Got: ${dbAlias}`);
});

const butterFruitQueries = ['butter fruit', 'butterfruit', 'Butter Fruit', 'avocado', 'persea americana', 'ಬೆಣ್ಣೆ ಹಣ್ಣು', 'बटर फ्रूट'];
butterFruitQueries.forEach(q => {
  const res = resolveProduct(q);
  assert(res !== null && res.id === 'butter-fruit', `Avocado query "${q}" resolves to "butter-fruit" (Fruit)`, `Got: ${res?.id}`);
  assert(res?.category === 'fruit', `Category for "${q}" is "fruit"`, `Got: ${res?.category}`);
  
  const dbAlias = resolveProductAlias(q);
  assert(dbAlias === 'butter-fruit', `Database alias for "${q}" returns "butter-fruit"`, `Got: ${dbAlias}`);
});

// 4. KANNADA VOICE & INDIC SCRIPT PROCESSING (Previously returned Hindi Tamatar)
console.log('\n4. Testing Kannada & Indic Script Recognition:');
const kannadaTomato = resolveProduct('ಟೊಮೇಟೊ');
assert(kannadaTomato !== null && kannadaTomato.id === 'tomato', 'Kannada script "ಟೊಮೇಟೊ" resolves to canonical "tomato"', `Got: ${kannadaTomato?.id}`);
assert(kannadaTomato?.multilingual.kn === 'ಟೊಮೇಟೊ', 'Kannada display string is "ಟೊಮೇಟೊ" (not Hindi Tamatar)');
assert(kannadaTomato?.multilingual.hi === 'टमाटर', 'Hindi display string is "टमाटर"');

const kannadaSentenceMatch = matchProduct('ಟೊಮೇಟೊ ಬೆಲೆ ಎಷ್ಟು');
assert(kannadaSentenceMatch.matched && kannadaSentenceMatch.product?.id === 'tomato', 'Kannada sentence "ಟೊಮೇಟೊ ಬೆಲೆ ಎಷ್ಟು" matches Tomato via word boundary', `Got: ${kannadaSentenceMatch.product?.id}`);

const hindiSentenceMatch = matchProduct('टमाटर का भाव क्या है');
assert(hindiSentenceMatch.matched && hindiSentenceMatch.product?.id === 'tomato', 'Hindi sentence "टमाटर का भाव क्या है" matches Tomato via word boundary', `Got: ${hindiSentenceMatch.product?.id}`);

// 5. HONEST REJECTION (No false fallback to Onion/Mango/Coffee)
console.log('\n5. Testing Honest Uncertainty & Non-Food Rejection:');
const nonFoodQueries = ['Laptop Computer', 'Random Non Food Item 12345', 'Plastic Chair', 'Smartphone'];
nonFoodQueries.forEach(q => {
  const res = matchProduct(q);
  assert(!res.matched && res.product === null, `Non-food query "${q}" returns matched=false (never defaults to Onion/Mango)`, `Got: ${res.product?.id}`);
  assert(res.matchType === 'NONE', `Match type is NONE`);
});

// 6. CROP ALIAS SERVICE INTEGRATION WITH NEW ARCHITECTURE
console.log('\n6. Testing CropAliasService Integration:');
const cropAliasApple = resolveCropAlias('Apple');
assert(cropAliasApple !== null && cropAliasApple.canonicalId === 'apple', 'CropAliasService maps "Apple" to "apple"', `Got: ${cropAliasApple?.canonicalId}`);

const cropAliasOrange = resolveCropAlias('Orange');
assert(cropAliasOrange !== null && cropAliasOrange.canonicalId === 'orange', 'CropAliasService maps "Orange" to "orange"', `Got: ${cropAliasOrange?.canonicalId}`);

const cropAliasButter = resolveCropAlias('Butter');
assert(cropAliasButter !== null && cropAliasButter.canonicalId === 'butter', 'CropAliasService maps "Butter" to "butter"', `Got: ${cropAliasButter?.canonicalId}`);

const cropAliasButterFruit = resolveCropAlias('Butter Fruit');
assert(cropAliasButterFruit !== null && cropAliasButterFruit.canonicalId === 'butter-fruit', 'CropAliasService maps "Butter Fruit" to "butter-fruit"', `Got: ${cropAliasButterFruit?.canonicalId}`);

const cropAliasKannadaTomato = resolveCropAlias('ಟೊಮೇಟೊ');
assert(cropAliasKannadaTomato !== null && cropAliasKannadaTomato.canonicalId === 'tomato', 'CropAliasService maps "ಟೊಮೇಟೊ" to "tomato"', `Got: ${cropAliasKannadaTomato?.canonicalId}`);

console.log('\n====================================================');
console.log(`📊 ARCHITECTURAL TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log('====================================================');

if (failed > 0) {
  process.exit(1);
}
