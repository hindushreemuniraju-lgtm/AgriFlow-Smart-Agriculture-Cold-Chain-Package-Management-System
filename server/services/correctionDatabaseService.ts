/**
 * AgriFlow AI Human-Correction & Learning Database Service
 * 
 * Provides:
 * 1. Persistent storage of user corrections in server/data/corrections.json
 * 2. Deterministic exact image matching via SHA-256 hash
 * 3. Near-duplicate visual similarity matching via 64-bit perceptual hash (dHash/pHash) & Hamming distance
 * 4. Verification state management: 'user_corrected' | 'verified_example' | 'disputed'
 * 5. Conflict detection when contradictory corrections are submitted
 * 6. Full CRUD API for correction history (View, Edit, Delete, Stats)
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

export interface AiCorrectionRecord {
  id: string;
  image_hash: string;
  image_phash: string;
  image_thumbnail?: string;
  original_ai_result: string;
  corrected_product: string;
  corrected_normalized_name: string;
  corrected_category: string;
  original_confidence: number;
  correction_source: string;
  created_at: string;
  updated_at: string;
  times_matched: number;
  verified: 'user_corrected' | 'verified_example' | 'disputed';
  user_id: string;
  notes?: string;
}

export interface CorrectionMatchResult {
  matched: boolean;
  matchType?: 'exact' | 'near_duplicate';
  record?: AiCorrectionRecord;
  hammingDistance?: number;
  confidence?: number;
  explanation?: string;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data');
const DB_FILE = path.join(DATA_DIR, 'corrections.json');

// In-memory cache for ultra-fast matching
let memoryRecords: AiCorrectionRecord[] = [];
let isInitialized = false;

/**
 * Compute SHA-256 hash from a clean base64 image or Buffer
 */
export function computeImageSha256(data: string | Buffer): string {
  if (typeof data === 'string') {
    const clean = data.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(clean, 'base64');
    return crypto.createHash('sha256').update(buffer).digest('hex');
  }
  return crypto.createHash('sha256').update(data).digest('hex');
}

/**
 * Calculate Hamming distance between two 64-bit hexadecimal hashes (16 hex chars)
 * Returns the number of differing bits (0 to 64).
 */
export function calculateHammingDistance(phash1: string, phash2: string): number {
  if (!phash1 || !phash2) return 64;
  const clean1 = phash1.trim().toLowerCase();
  const clean2 = phash2.trim().toLowerCase();
  if (clean1.length !== clean2.length || clean1.length === 0) return 64;

  try {
    let xor = BigInt('0x' + clean1) ^ BigInt('0x' + clean2);
    let count = 0;
    while (xor > 0n) {
      count += Number(xor & 1n);
      xor >>= 1n;
    }
    return count;
  } catch {
    return 64;
  }
}

/**
 * Server-side fallback perceptual hash generator for raw base64 data
 * Extracts 64-bit luminosity grid distribution.
 */
export function computeFallbackPhash(base64Data: string): string {
  try {
    const clean = base64Data.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(clean, 'base64');
    const len = buffer.length;
    if (len < 64) return '0'.repeat(16);

    // Sample 64 points across the buffer
    const step = Math.floor(len / 64);
    let sum = 0;
    const samples: number[] = [];
    for (let i = 0; i < 64; i++) {
      const byte = buffer[Math.min(len - 1, i * step)];
      samples.push(byte);
      sum += byte;
    }
    const mean = sum / 64;

    // Build 64-bit binary string (1 if >= mean, 0 otherwise)
    let hexResult = '';
    for (let i = 0; i < 64; i += 4) {
      let nibble = 0;
      for (let b = 0; b < 4; b++) {
        if (samples[i + b] >= mean) {
          nibble |= (1 << (3 - b));
        }
      }
      hexResult += nibble.toString(16);
    }
    return hexResult.padStart(16, '0').substring(0, 16);
  } catch {
    return '0'.repeat(16);
  }
}

/**
 * Initialize correction database and ensure filesystem persistence
 */
export function initCorrectionDatabase(): void {
  if (isInitialized) return;

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      memoryRecords = JSON.parse(raw);
      if (!Array.isArray(memoryRecords)) {
        memoryRecords = [];
      }
    } else {
      memoryRecords = [];
      persistDatabase();
    }
    isInitialized = true;
    console.log(`[AgriFlow Correction DB] Loaded ${memoryRecords.length} learned image correction records.`);
  } catch (err: any) {
    console.error('[AgriFlow Correction DB] Error loading database:', err.message);
    memoryRecords = [];
    isInitialized = true;
  }
}

/**
 * Persist in-memory records to disk atomically
 */
function persistDatabase(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const tempFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(memoryRecords, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
  } catch (err: any) {
    console.error('[AgriFlow Correction DB] Failed to save database to disk:', err.message);
  }
}

/**
 * STEP 1: Search for an exact same image match via SHA-256
 */
export function findExactCorrection(imageSha256: string): AiCorrectionRecord | null {
  initCorrectionDatabase();
  if (!imageSha256) return null;

  const match = memoryRecords.find(r => r.image_hash === imageSha256 && r.verified !== 'disputed');
  if (match) {
    match.times_matched = (match.times_matched || 0) + 1;
    match.updated_at = new Date().toISOString();
    persistDatabase();
    return match;
  }
  return null;
}

/**
 * STEP 2: Search for a near-duplicate image match via perceptual hash (Hamming distance <= maxDistance)
 */
export function findNearDuplicateCorrection(
  imagePhash: string,
  maxDistance: number = 6
): { record: AiCorrectionRecord; distance: number } | null {
  initCorrectionDatabase();
  if (!imagePhash || imagePhash.length < 16) return null;

  let bestMatch: AiCorrectionRecord | null = null;
  let minDistance = 65;

  for (const record of memoryRecords) {
    if (record.verified === 'disputed') continue;
    if (!record.image_phash || record.image_phash.length < 16) continue;

    const dist = calculateHammingDistance(imagePhash, record.image_phash);
    if (dist <= maxDistance && dist < minDistance) {
      minDistance = dist;
      bestMatch = record;
    }
  }

  if (bestMatch && minDistance <= maxDistance) {
    bestMatch.times_matched = (bestMatch.times_matched || 0) + 1;
    bestMatch.updated_at = new Date().toISOString();
    persistDatabase();
    return { record: bestMatch, distance: minDistance };
  }

  return null;
}

/**
 * Evaluate image against correction memory (Exact then Near-Duplicate)
 */
export function matchImageAgainstCorrections(
  imageSha256: string,
  imagePhash?: string
): CorrectionMatchResult {
  initCorrectionDatabase();

  // 1. Exact match check
  const exact = findExactCorrection(imageSha256);
  if (exact) {
    return {
      matched: true,
      matchType: 'exact',
      record: exact,
      hammingDistance: 0,
      confidence: 0.99,
      explanation: 'Learned from your previous correction (Exact image byte match)'
    };
  }

  // 2. Near-duplicate check
  if (imagePhash) {
    const near = findNearDuplicateCorrection(imagePhash, 6);
    if (near) {
      const conf = Math.max(0.92, +(1 - (near.distance / 64)).toFixed(3));
      return {
        matched: true,
        matchType: 'near_duplicate',
        record: near.record,
        hammingDistance: near.distance,
        confidence: conf,
        explanation: `Recognized from verified similar visual example (Perceptual similarity: ${Math.round((1 - near.distance / 64) * 100)}%)`
      };
    }
  }

  return { matched: false };
}

/**
 * Save or update a user correction
 */
export function saveCorrection(params: {
  image_hash: string;
  image_phash: string;
  image_thumbnail?: string;
  original_ai_result: string;
  corrected_product: string;
  corrected_normalized_name: string;
  corrected_category: string;
  original_confidence?: number;
  correction_source?: string;
  user_id?: string;
  notes?: string;
}): AiCorrectionRecord {
  initCorrectionDatabase();
  const now = new Date().toISOString();

  // Check if an existing record has this exact image hash
  const existingIndex = memoryRecords.findIndex(r => r.image_hash === params.image_hash);

  if (existingIndex >= 0) {
    const existing = memoryRecords[existingIndex];

    // Conflict detection: if someone changes it to a completely different commodity
    if (existing.corrected_normalized_name !== params.corrected_normalized_name && existing.times_matched > 1) {
      existing.verified = 'disputed';
      existing.notes = `Disputed correction: previously "${existing.corrected_product}", now corrected to "${params.corrected_product}".`;
    } else {
      existing.corrected_product = params.corrected_product;
      existing.corrected_normalized_name = params.corrected_normalized_name;
      existing.corrected_category = params.corrected_category;
      existing.verified = 'user_corrected';
    }

    if (params.image_thumbnail) existing.image_thumbnail = params.image_thumbnail;
    if (params.image_phash) existing.image_phash = params.image_phash;
    existing.original_ai_result = params.original_ai_result;
    existing.original_confidence = params.original_confidence ?? existing.original_confidence;
    existing.updated_at = now;
    existing.times_matched = (existing.times_matched || 0) + 1;

    persistDatabase();
    return existing;
  }

  const newRecord: AiCorrectionRecord = {
    id: `corr_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`,
    image_hash: params.image_hash,
    image_phash: params.image_phash || computeFallbackPhash(''),
    image_thumbnail: params.image_thumbnail,
    original_ai_result: params.original_ai_result,
    corrected_product: params.corrected_product,
    corrected_normalized_name: params.corrected_normalized_name,
    corrected_category: params.corrected_category,
    original_confidence: params.original_confidence ?? 0.80,
    correction_source: params.correction_source || 'user_manual_correction',
    created_at: now,
    updated_at: now,
    times_matched: 0,
    verified: 'user_corrected',
    user_id: params.user_id || 'farmer_user_default',
    notes: params.notes
  };

  memoryRecords.unshift(newRecord);
  persistDatabase();
  return newRecord;
}

/**
 * Update an existing correction by ID
 */
export function updateCorrection(
  id: string,
  updates: Partial<Pick<AiCorrectionRecord, 'corrected_product' | 'corrected_normalized_name' | 'corrected_category' | 'verified' | 'notes'>>
): AiCorrectionRecord | null {
  initCorrectionDatabase();
  const rec = memoryRecords.find(r => r.id === id);
  if (!rec) return null;

  if (updates.corrected_product !== undefined) rec.corrected_product = updates.corrected_product;
  if (updates.corrected_normalized_name !== undefined) rec.corrected_normalized_name = updates.corrected_normalized_name;
  if (updates.corrected_category !== undefined) rec.corrected_category = updates.corrected_category;
  if (updates.verified !== undefined) rec.verified = updates.verified;
  if (updates.notes !== undefined) rec.notes = updates.notes;
  rec.updated_at = new Date().toISOString();

  persistDatabase();
  return rec;
}

/**
 * Delete a correction by ID
 */
export function deleteCorrection(id: string): boolean {
  initCorrectionDatabase();
  const initialLength = memoryRecords.length;
  memoryRecords = memoryRecords.filter(r => r.id !== id);
  if (memoryRecords.length < initialLength) {
    persistDatabase();
    return true;
  }
  return false;
}

/**
 * Get a single correction by ID
 */
export function getCorrectionById(id: string): AiCorrectionRecord | null {
  initCorrectionDatabase();
  return memoryRecords.find(r => r.id === id) || null;
}

/**
 * Get all correction records
 */
export function getAllCorrections(filters?: { category?: string; verified?: string }): AiCorrectionRecord[] {
  initCorrectionDatabase();
  let list = [...memoryRecords];
  if (filters?.category) {
    list = list.filter(r => r.corrected_category.toLowerCase() === filters.category!.toLowerCase());
  }
  if (filters?.verified) {
    list = list.filter(r => r.verified === filters.verified);
  }
  return list;
}

/**
 * Get statistical metrics of the correction database
 */
export function getCorrectionStats(): {
  total: number;
  totalCount: number;
  verifiedExamples: number;
  userCorrected: number;
  disputed: number;
  totalTimesMatched: number;
} {
  initCorrectionDatabase();
  return {
    total: memoryRecords.length,
    totalCount: memoryRecords.length,
    verifiedExamples: memoryRecords.filter(r => r.verified === 'verified_example').length,
    userCorrected: memoryRecords.filter(r => r.verified === 'user_corrected').length,
    disputed: memoryRecords.filter(r => r.verified === 'disputed').length,
    totalTimesMatched: memoryRecords.reduce((acc, curr) => acc + (curr.times_matched || 0), 0)
  };
}

/**
 * Clear all corrections (primarily for automated test teardown)
 */
export function clearAllCorrections(): void {
  memoryRecords = [];
  persistDatabase();
}
