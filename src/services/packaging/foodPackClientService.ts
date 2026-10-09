/**
 * FoodPack AI - Client-Side API & Knowledge Orchestrator Service
 * Connects frontend views to backend endpoints with automatic offline/cached fallback.
 */

import { 
  FoodPackRequirements, 
  FoodPackRecommendation, 
  FoodPackagingMaterial, 
  FoodDetectionResult,
  FssaiRegulationDoc,
  FoodPackHistoryRecord,
  FoodPackAnalyticsSummary
} from '../../types/foodPack';
import { generateFoodPackRecommendation } from './foodPackRecommendationEngine';
import { getAllPackagingMaterials, getPackagingMaterialById } from '../../data/packagingMaterialsDatabase';
import { FSSAI_REGULATION_DATABASE } from '../../data/fssaiComplianceDatabase';
import { 
  getFoodPackHistory, 
  saveRecommendationToHistory, 
  deleteHistoryItem, 
  computeFoodPackAnalytics 
} from './foodPackHistoryService';

/**
 * 1. Request FoodPack AI Packaging Recommendation
 */
export async function fetchFoodPackRecommendation(req: FoodPackRequirements): Promise<FoodPackRecommendation> {
  try {
    const res = await fetch('/api/packaging/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req)
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.recommendation) {
        return data.recommendation;
      }
    }
  } catch (err) {
    console.warn('[FoodPack AI Client] Backend API unreachable, generating client-side recommendation:', err);
  }

  // Fallback to local verified deterministic scoring engine
  return generateFoodPackRecommendation(req);
}

/**
 * 2. Analyze Food Image with Backend Vision Pipeline
 */
export async function identifyFoodFromImage(
  file: File, 
  marketLocation: string = 'Bengaluru'
): Promise<FoodDetectionResult> {
  const now = new Date().toISOString();
  
  // Convert to base64
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  try {
    const res = await fetch('/api/vision/identify-food', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageBase64: base64,
        mimeType: file.type || 'image/jpeg',
        fileName: file.name,
        market: marketLocation
      })
    });

    if (res.ok) {
      const data: FoodDetectionResult = await res.json();
      if (data.success) {
        return data;
      }
    }
  } catch (err) {
    console.warn('[FoodPack AI Client] Vision backend API unreachable, using local fallback:', err);
  }

  // Offline or unreachable fallback: Never invent Beetroot or fake commodities
  return {
    success: true,
    isFood: false,
    items: [],
    primaryItem: null,
    overallConfidence: 0.35,
    needsConfirmation: true,
    isNonFoodOrBlurry: true,
    rejectionReason: 'Unable to confidently identify this product. Please ensure a clear, well-lit photo or select manually.',
    visualEvidence: ['Offline client cannot perform deep multimodal pixel recognition without server connectivity'],
    source: 'FoodPack AI Client-Side Offline Validator',
    timestamp: now
  };
}

/**
 * 3. Fetch All Packaging Materials
 */
export async function fetchAllMaterials(): Promise<FoodPackagingMaterial[]> {
  try {
    const res = await fetch('/api/packaging/materials');
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.materials)) {
        return data.materials;
      }
    }
  } catch {
    // ignore
  }
  return getAllPackagingMaterials();
}

/**
 * 4. Fetch FSSAI Compliance Database
 */
export async function fetchFssaiComplianceDocs(): Promise<FssaiRegulationDoc[]> {
  try {
    const res = await fetch('/api/packaging/compliance');
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.regulations)) {
        return data.regulations;
      }
    }
  } catch {
    // ignore
  }
  return FSSAI_REGULATION_DATABASE;
}

/**
 * 5. Fetch Recommendation History
 */
export async function fetchRecommendationHistory(): Promise<FoodPackHistoryRecord[]> {
  try {
    const res = await fetch('/api/packaging/history');
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.history)) {
        return data.history;
      }
    }
  } catch {
    // ignore
  }
  return getFoodPackHistory();
}

/**
 * 6. Save Recommendation
 */
export function saveRecommendation(rec: FoodPackRecommendation): FoodPackHistoryRecord {
  return saveRecommendationToHistory(rec);
}

/**
 * 7. Delete Recommendation
 */
export function removeRecommendation(id: string): FoodPackHistoryRecord[] {
  return deleteHistoryItem(id);
}

/**
 * 8. Fetch Aggregate Analytics
 */
export async function fetchFoodPackAnalytics(): Promise<FoodPackAnalyticsSummary> {
  const history = await fetchRecommendationHistory();
  return computeFoodPackAnalytics(history);
}
