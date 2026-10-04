/**
 * AgriFlow Image Correction & User-Learning Memory Service
 * Computes perceptual image signatures/fingerprints and persists user corrections.
 * If a user manually corrects an image identification (e.g. Okra -> Radish),
 * AgriFlow permanently remembers the signature so re-uploading the same picture
 * instantly resolves to the verified corrected product.
 */

export interface ImageCorrectionRecord {
  signature: string;
  canonicalId: string;
  name: string;
  scientificName: string;
  category: string;
  timestamp: string;
  timesConfirmed: number;
}

const STORAGE_KEY = 'agriflow_learned_product_corrections_v1';

// In-memory lookup map for quick access
const memoryCache = new Map<string, ImageCorrectionRecord>();

// Load from localStorage on initialization
function initMemory(): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: Record<string, ImageCorrectionRecord> = JSON.parse(raw);
      Object.entries(parsed).forEach(([sig, rec]) => {
        memoryCache.set(sig, rec);
      });
    }
  } catch (err) {
    console.warn('[AgriFlow Memory] Failed to load learned image corrections from storage:', err);
  }
}

// Save in-memory cache to localStorage
function persistMemory(): void {
  if (typeof window === 'undefined') return;
  try {
    const obj: Record<string, ImageCorrectionRecord> = {};
    memoryCache.forEach((v, k) => {
      obj[k] = v;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
  } catch (err) {
    console.warn('[AgriFlow Memory] Failed to persist image corrections to storage:', err);
  }
}

// Compute a deterministic visual perceptual signature of an image Data URL / Canvas
export function computeImageSignature(dataUrl: string, fileSizeBytes: number = 0): string {
  if (!dataUrl) return '';

  // Use sampled chunks from base64 string + length + file size
  const clean = dataUrl.replace(/^data:image\/\w+;base64,/, '');
  const len = clean.length;
  if (len < 50) return `img_len_${len}`;

  // Sample characters across 16 equidistant positions for fast perceptual fingerprint
  const samples: string[] = [];
  const step = Math.floor(len / 16);
  for (let i = 0; i < 16; i++) {
    const idx = Math.min(len - 1, i * step);
    samples.push(clean.substring(idx, idx + 4));
  }

  const sampleHash = samples.join('_');
  return `sig_${len}_${fileSizeBytes}_${sampleHash.substring(0, 32)}`;
}

/**
 * Check if the uploaded image has a user-corrected learned profile.
 */
export function getLearnedImageCorrection(signature: string): ImageCorrectionRecord | null {
  if (!signature) return null;
  if (memoryCache.size === 0) {
    initMemory();
  }
  return memoryCache.get(signature) || null;
}

/**
 * Record a user correction for an image.
 */
export function recordImageCorrection(
  signature: string,
  canonicalId: string,
  name: string,
  scientificName: string,
  category: string
): ImageCorrectionRecord {
  if (memoryCache.size === 0) {
    initMemory();
  }

  const existing = memoryCache.get(signature);
  const record: ImageCorrectionRecord = {
    signature,
    canonicalId,
    name,
    scientificName,
    category,
    timestamp: new Date().toISOString(),
    timesConfirmed: (existing?.timesConfirmed || 0) + 1
  };

  memoryCache.set(signature, record);
  persistMemory();

  return record;
}

/**
 * Clear all learned image corrections (for test/reset purposes).
 */
export function clearImageCorrectionMemory(): void {
  memoryCache.clear();
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }
}
