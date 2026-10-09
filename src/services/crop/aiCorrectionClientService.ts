/**
 * AgriFlow Frontend AI Correction Client Service
 * 
 * Provides:
 * 1. Client-side SHA-256 and 64-bit dHash generation from canvas
 * 2. Thumbnail generator for correction history
 * 3. Synchronization with backend Correction Database (/api/ai/corrections)
 * 4. LocalStorage resilient offline fallback
 */

export interface AiCorrectionClientRecord {
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

export interface CheckCorrectionResponse {
  matched: boolean;
  matchType?: 'exact' | 'near_duplicate';
  record?: AiCorrectionClientRecord;
  hammingDistance?: number;
  confidence?: number;
  explanation?: string;
}

const LOCAL_STORAGE_KEY = 'agriflow_ai_corrections_cache_v2';

/**
 * Compute SHA-256 of Data URL string
 */
export async function computeDataUrlSha256(dataUrl: string): Promise<string> {
  try {
    const clean = dataUrl.replace(/^data:image\/\w+;base64,/, '');
    const binaryString = atob(clean);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const hashBuffer = await crypto.subtle.digest('SHA-256', bytes);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch {
    // Basic deterministic fallback
    let hash = 0;
    for (let i = 0; i < dataUrl.length; i++) {
      hash = ((hash << 5) - hash) + dataUrl.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(16).padStart(16, '0');
  }
}

/**
 * Compute 64-bit perceptual difference hash (dHash) from HTMLCanvasElement
 */
export function computeCanvasDHash(canvas: HTMLCanvasElement): string {
  try {
    const thumb = document.createElement('canvas');
    thumb.width = 9;
    thumb.height = 8;
    const ctx = thumb.getContext('2d');
    if (!ctx) return '0'.repeat(16);

    ctx.drawImage(canvas, 0, 0, 9, 8);
    const imgData = ctx.getImageData(0, 0, 9, 8).data;

    const grays: number[] = [];
    for (let i = 0; i < imgData.length; i += 4) {
      const r = imgData[i];
      const g = imgData[i + 1];
      const b = imgData[i + 2];
      grays.push(Math.round(0.299 * r + 0.587 * g + 0.114 * b));
    }

    let hex = '';
    for (let y = 0; y < 8; y++) {
      let byte = 0;
      for (let x = 0; x < 8; x++) {
        const left = grays[y * 9 + x];
        const right = grays[y * 9 + x + 1];
        if (left > right) {
          byte |= (1 << (7 - x));
        }
      }
      hex += byte.toString(16).padStart(2, '0');
    }

    return hex.padStart(16, '0').substring(0, 16);
  } catch {
    return '0'.repeat(16);
  }
}

/**
 * Create compressed 64x64 JPEG thumbnail from HTMLCanvasElement
 */
export function createThumbnailDataUrl(canvas: HTMLCanvasElement, maxDim: number = 72): string {
  try {
    const thumb = document.createElement('canvas');
    let w = canvas.width;
    let h = canvas.height;
    if (w > h) {
      h = Math.round((h * maxDim) / Math.max(1, w));
      w = maxDim;
    } else {
      w = Math.round((w * maxDim) / Math.max(1, h));
      h = maxDim;
    }
    thumb.width = Math.max(1, w);
    thumb.height = Math.max(1, h);
    const ctx = thumb.getContext('2d');
    if (!ctx) return '';
    ctx.drawImage(canvas, 0, 0, w, h);
    return thumb.toDataURL('image/jpeg', 0.7);
  } catch {
    return '';
  }
}

/**
 * Check if image has an exact or near-duplicate correction on backend
 */
export async function checkCorrectionOnBackend(
  imageHash: string,
  imagePhash?: string
): Promise<CheckCorrectionResponse> {
  try {
    const res = await fetch('/api/ai/corrections/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageHash, imagePhash })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.match) {
        return data.match;
      }
    }
  } catch (err) {
    console.warn('[AgriFlow Correction Client] Backend check failed, checking local cache:', err);
  }

  // Fallback check in local storage cache
  return checkCorrectionInLocalCache(imageHash, imagePhash);
}

/**
 * Save user correction to backend database and sync local cache
 */
export async function saveUserCorrection(params: {
  imageHash: string;
  imagePhash: string;
  imageThumbnail?: string;
  originalAiResult: string;
  correctedProduct: string;
  correctedNormalizedName: string;
  correctedCategory: string;
  originalConfidence?: number;
  userId?: string;
  notes?: string;
}): Promise<AiCorrectionClientRecord> {
  const payload = {
    image_hash: params.imageHash,
    image_phash: params.imagePhash,
    image_thumbnail: params.imageThumbnail,
    original_ai_result: params.originalAiResult,
    corrected_product: params.correctedProduct,
    corrected_normalized_name: params.correctedNormalizedName,
    corrected_category: params.correctedCategory,
    original_confidence: params.originalConfidence ?? 0.82,
    correction_source: 'user_manual_correction',
    user_id: params.userId || 'farmer_user_default',
    notes: params.notes
  };

  try {
    const res = await fetch('/api/ai/corrections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.record) {
        saveRecordToLocalCache(data.record);
        return data.record;
      }
    }
  } catch (err) {
    console.warn('[AgriFlow Correction Client] Backend save failed, storing in local cache:', err);
  }

  // Fallback offline record
  const fallbackRecord: AiCorrectionClientRecord = {
    id: `corr_local_${Date.now()}`,
    image_hash: params.imageHash,
    image_phash: params.imagePhash,
    image_thumbnail: params.imageThumbnail,
    original_ai_result: params.originalAiResult,
    corrected_product: params.correctedProduct,
    corrected_normalized_name: params.correctedNormalizedName,
    corrected_category: params.correctedCategory,
    original_confidence: params.originalConfidence ?? 0.82,
    correction_source: 'user_manual_correction',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    times_matched: 0,
    verified: 'user_corrected',
    user_id: params.userId || 'farmer_user_default',
    notes: params.notes
  };
  saveRecordToLocalCache(fallbackRecord);
  return fallbackRecord;
}

/**
 * Fetch all corrections for the history management panel
 */
export async function fetchAllCorrections(): Promise<AiCorrectionClientRecord[]> {
  try {
    const res = await fetch('/api/ai/corrections');
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.corrections)) {
        if (typeof window !== 'undefined') {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.corrections));
        }
        return data.corrections;
      }
    }
  } catch (err) {
    console.warn('[AgriFlow Correction Client] Failed to fetch corrections from backend, using local:', err);
  }

  return getRecordsFromLocalCache();
}

/**
 * Delete a correction from backend and local cache
 */
export async function deleteCorrection(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/ai/corrections/${id}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      deleteRecordFromLocalCache(id);
      return true;
    }
  } catch (err) {
    console.warn('[AgriFlow Correction Client] Backend delete failed:', err);
  }

  deleteRecordFromLocalCache(id);
  return true;
}

/**
 * Update an existing correction
 */
export async function updateCorrection(
  id: string,
  updates: Partial<Pick<AiCorrectionClientRecord, 'corrected_product' | 'corrected_normalized_name' | 'corrected_category' | 'verified' | 'notes'>>
): Promise<AiCorrectionClientRecord | null> {
  try {
    const res = await fetch(`/api/ai/corrections/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.record) {
        saveRecordToLocalCache(data.record);
        return data.record;
      }
    }
  } catch (err) {
    console.warn('[AgriFlow Correction Client] Backend update failed:', err);
  }

  return null;
}

// ----------------- LOCAL CACHE HELPERS -----------------

function getRecordsFromLocalCache(): AiCorrectionClientRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveRecordToLocalCache(record: AiCorrectionClientRecord): void {
  if (typeof window === 'undefined') return;
  try {
    const records = getRecordsFromLocalCache();
    const idx = records.findIndex(r => r.id === record.id || r.image_hash === record.image_hash);
    if (idx >= 0) {
      records[idx] = record;
    } else {
      records.unshift(record);
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
  } catch {
    // ignore
  }
}

function deleteRecordFromLocalCache(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const records = getRecordsFromLocalCache().filter(r => r.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
  } catch {
    // ignore
  }
}

function checkCorrectionInLocalCache(
  imageHash: string,
  imagePhash?: string
): CheckCorrectionResponse {
  const records = getRecordsFromLocalCache();
  const exact = records.find(r => r.image_hash === imageHash && r.verified !== 'disputed');
  if (exact) {
    return {
      matched: true,
      matchType: 'exact',
      record: exact,
      confidence: 0.99,
      explanation: 'Learned from your previous correction (Exact image byte match)'
    };
  }

  if (imagePhash && imagePhash.length >= 16) {
    for (const r of records) {
      if (r.verified === 'disputed' || !r.image_phash) continue;
      const dist = calculateClientHammingDistance(imagePhash, r.image_phash);
      if (dist <= 6) {
        return {
          matched: true,
          matchType: 'near_duplicate',
          record: r,
          hammingDistance: dist,
          confidence: Math.max(0.92, +(1 - dist / 64).toFixed(3)),
          explanation: `Recognized from verified similar visual example (Perceptual similarity: ${Math.round((1 - dist / 64) * 100)}%)`
        };
      }
    }
  }

  return { matched: false };
}

function calculateClientHammingDistance(h1: string, h2: string): number {
  if (!h1 || !h2 || h1.length !== h2.length) return 64;
  try {
    let xor = BigInt('0x' + h1) ^ BigInt('0x' + h2);
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
