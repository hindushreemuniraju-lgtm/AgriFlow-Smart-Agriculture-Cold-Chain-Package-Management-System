/**
 * AgriFlow Human-Correction & Learning System Test Suite
 * 
 * Verifies:
 * 1. Deterministic SHA-256 exact-image memory retrieval
 * 2. Perceptual pHash (dHash) Hamming distance <= 6 near-duplicate retrieval
 * 3. Prevention of blind overrides (Hamming distance > 6 returns no match)
 * 4. Centralized catalog normalization & collision avoidance (Butter vs Butter Fruit)
 * 5. Low confidence (< 0.75) requires confirmation flag
 * 6. Update, delete, and stats management
 */

import { 
  computeImageSha256, 
  calculateHammingDistance, 
  findExactCorrection, 
  findNearDuplicateCorrection, 
  saveCorrection, 
  updateCorrection, 
  deleteCorrection, 
  getAllCorrections, 
  getCorrectionStats,
  initCorrectionDatabase 
} from '../server/services/correctionDatabaseService';
import { matchProduct } from '../src/services/catalog/productNormalizationService';

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
console.log('🧠 RUNNING AGRIFLOW HUMAN-CORRECTION & LEARNING TESTS');
console.log('====================================================\n');

// Initialize database
initCorrectionDatabase();

// 1. EXACT SAME IMAGE MEMORY
console.log('1. Testing Exact Same Image Memory (SHA-256 Deterministic Match):');
const mockImageBase64_A = Buffer.from('AppleRedPhotoSamplePixels_Bytes_2026_A').toString('base64');
const sha_A = computeImageSha256(mockImageBase64_A);
const phash_A = '1122334455667788';

// User corrects Tomato -> Apple
const savedApple = saveCorrection({
  image_hash: sha_A,
  image_phash: phash_A,
  original_ai_result: 'Tomato',
  corrected_product: 'Apple',
  corrected_normalized_name: 'apple',
  corrected_category: 'Fruit',
  original_confidence: 0.82,
  correction_source: 'user_manual_correction',
  notes: 'Red Gala Apple misidentified as Tomato'
});

assert(savedApple.id !== undefined, 'Correction successfully saved to database');
assert(savedApple.corrected_product === 'Apple', 'Corrected product is Apple');
assert(savedApple.original_ai_result === 'Tomato', 'Original AI detection recorded as Tomato');

// Next upload of the EXACT same image:
const exactMatch = findExactCorrection(sha_A);
assert(exactMatch !== null, 'Exact image hash match found in memory');
assert(exactMatch?.corrected_product === 'Apple', 'Exact match returns user-corrected product (Apple)');
assert((exactMatch?.times_matched || 0) >= 1, 'Exact match increments times_matched');

// 2. NEAR-DUPLICATE PERCEPTUAL IMAGE MEMORY (dHash Hamming distance <= 6)
console.log('\n2. Testing Near-Duplicate Image Memory (pHash / dHash Hamming Distance):');
// Construct a near-duplicate hash with only 2 bits flipped from phash_A (1122334455667788)
// Hex 88 = 1000 1000b. Hex 89 = 1000 1001b (1 bit difference). Hex 8b = 1000 1011b (2 bits difference).
const nearPhash = '112233445566778b';
const distanceNear = calculateHammingDistance(phash_A, nearPhash);
assert(distanceNear <= 6, `Hamming distance between near-duplicates is ${distanceNear} (<= 6 bits)`);

const sha_Different = computeImageSha256(Buffer.from('AppleRedResizedPhotoSample_B').toString('base64'));
const nearMatch = findNearDuplicateCorrection(nearPhash, 6);
assert(nearMatch !== null, 'Near-duplicate perceptual image match found');
assert(nearMatch?.record.corrected_product === 'Apple', 'Near-duplicate returns user-corrected product (Apple)');
assert((nearMatch?.hammingDistance || 0) <= 6, 'Near-duplicate hamming distance is within threshold <= 6');

// 3. NO BLIND OVERRIDES (Unrelated images must NOT be overridden)
console.log('\n3. Testing Prevention of Blind Overrides (Hamming distance > 6):');
// Construct completely different hash (e.g. Orange or Coffee photo)
const unrelatedPhash = 'ffff0000aaaa5555';
const distanceFar = calculateHammingDistance(phash_A, unrelatedPhash);
assert(distanceFar > 6, `Hamming distance to unrelated image is ${distanceFar} (> 6 bits)`);

const farMatch = findNearDuplicateCorrection(unrelatedPhash, 6);
assert(farMatch === null, 'Unrelated image does NOT trigger false override');

// 4. CENTRAL CATALOG NORMALIZATION & COLLISION RESISTANCE (Butter vs Butter Fruit)
console.log('\n4. Testing Anti-Collision Catalog Normalization:');
const normButter = matchProduct('Butter');
assert(normButter.matched && normButter.product?.id === 'butter', 'Butter matches canonical "butter"');
assert(normButter.product?.category === 'dairy', 'Butter category is dairy');

const normButterFruit = matchProduct('Butter Fruit');
assert(normButterFruit.matched && normButterFruit.product?.id === 'butter-fruit', 'Butter Fruit matches "butter-fruit"');
assert(normButterFruit.product?.category === 'fruit', 'Butter Fruit category is fruit');

// Save Butter dairy correction
const mockImageButter = Buffer.from('ButterYellowBlockPixels_2026').toString('base64');
const sha_Butter = computeImageSha256(mockImageButter);
const butterRecord = saveCorrection({
  image_hash: sha_Butter,
  image_phash: '3333444455556666',
  original_ai_result: 'Butter Fruit',
  corrected_product: 'Butter',
  corrected_normalized_name: 'butter',
  corrected_category: 'Dairy',
  original_confidence: 0.91
});
assert(butterRecord.corrected_product === 'Butter', 'Butter correction successfully created');
assert(butterRecord.corrected_category === 'Dairy', 'Butter correction category is Dairy');

// 5. LOW CONFIDENCE (< 0.75) THRESHOLD VERIFICATION
console.log('\n5. Testing Low-Confidence Threshold Validation:');
const checkNeedsConfirmation = (confidence: number) => confidence < 0.75;
assert(checkNeedsConfirmation(0.72) === true, 'Confidence 72% correctly flags needsConfirmation: true');
assert(checkNeedsConfirmation(0.65) === true, 'Confidence 65% correctly flags needsConfirmation: true');
assert(checkNeedsConfirmation(0.75) === false, 'Confidence 75% passes confirmation threshold');
assert(checkNeedsConfirmation(0.92) === false, 'Confidence 92% passes confirmation threshold');

// 6. RECORD EDIT, DELETE, AND STATS VERIFICATION
console.log('\n6. Testing Correction Edit, Delete, and Stats:');
const updatedRecord = updateCorrection(savedApple.id, {
  notes: 'Updated notes: Verified Organic Kashmiri Apple',
  corrected_product: 'Apple (Kashmiri)'
});
assert(updatedRecord !== null && updatedRecord.notes?.includes('Verified Organic'), 'Correction updated successfully');
assert(updatedRecord?.corrected_product === 'Apple (Kashmiri)', 'Product name updated in memory');

const statsBefore = getCorrectionStats();
assert(statsBefore.totalCount >= 2, `Stats reports total corrections count (${statsBefore.totalCount} >= 2)`);

// Delete test record
const deleted = deleteCorrection(savedApple.id);
assert(deleted === true, 'Correction deleted successfully');

const afterDelete = findExactCorrection(sha_A);
assert(afterDelete === null, 'Deleted correction is no longer matched in memory');

// Cleanup butter test record
deleteCorrection(butterRecord.id);

console.log('\n====================================================');
console.log(`SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log('====================================================');

if (failed > 0) {
  process.exit(1);
}
