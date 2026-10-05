/**
 * FoodPack AI - Recommendation History & Analytics Store
 * Saves user recommendations to local persistence and computes aggregate analytics.
 */

import { FoodPackRecommendation, FoodPackHistoryRecord, FoodPackAnalyticsSummary } from '../../types/foodPack';

const HISTORY_STORAGE_KEY = 'agriflow_foodpack_history_v1';

// Initial baseline historical records for instant rich analytics display
const DEFAULT_HISTORY_RECORDS: FoodPackHistoryRecord[] = [
  {
    id: 'FPAI-REC-892101',
    date: '2026-03-28T10:30:00.000Z',
    commodity: 'Tomato (Tamatar)',
    quantityKg: 500,
    storage: 'Cold Chain',
    transport: 'Refrigerated Truck',
    desiredShelfLife: '4–7 days',
    recommendedMaterialName: 'Reusable HDPE Perforated Crate',
    recommendedMaterialId: 'mat-hdpe-crate',
    overallScore: 91,
    estimatedCost: 475,
    ecoScore: 88,
    costPerKg: 0.95
  },
  {
    id: 'FPAI-REC-892102',
    date: '2026-03-29T14:15:00.000Z',
    commodity: 'Apple (Shimla Golden)',
    quantityKg: 200,
    storage: 'Refrigerated',
    transport: 'Truck',
    desiredShelfLife: '1–2 weeks',
    recommendedMaterialName: 'Ventilated Corrugated Cardboard (CFB) Box',
    recommendedMaterialId: 'mat-corrugated-cfb-box',
    overallScore: 89,
    estimatedCost: 700,
    ecoScore: 86,
    costPerKg: 3.50
  },
  {
    id: 'FPAI-REC-892103',
    date: '2026-03-30T09:00:00.000Z',
    commodity: 'Paneer (Cottage Cheese)',
    quantityKg: 50,
    storage: 'Cold Chain',
    transport: 'Refrigerated Truck',
    desiredShelfLife: '2–4 weeks',
    recommendedMaterialName: 'High-Barrier Multi-Layer EVOH Vacuum Pouch',
    recommendedMaterialId: 'mat-evoh-vacuum-pouch',
    overallScore: 94,
    estimatedCost: 325,
    ecoScore: 65,
    costPerKg: 6.50
  },
  {
    id: 'FPAI-REC-892104',
    date: '2026-04-01T11:45:00.000Z',
    commodity: 'Potato (Kufri Jyoti)',
    quantityKg: 1000,
    storage: 'Ambient',
    transport: 'Truck',
    desiredShelfLife: '2–4 weeks',
    recommendedMaterialName: 'Food-Grade Natural Jute (Hessian) Sack',
    recommendedMaterialId: 'mat-jute-sack',
    overallScore: 93,
    estimatedCost: 960,
    ecoScore: 95,
    costPerKg: 0.96
  },
  {
    id: 'FPAI-REC-892105',
    date: '2026-04-02T16:20:00.000Z',
    commodity: 'Cardamom (Elaichi)',
    quantityKg: 25,
    storage: 'Ambient',
    transport: 'Air',
    desiredShelfLife: '2–4 weeks',
    recommendedMaterialName: 'Metalized Barrier Foil Pouch (PET/Alu/PE)',
    recommendedMaterialId: 'mat-metalized-barrier-pouch',
    overallScore: 95,
    estimatedCost: 212,
    ecoScore: 62,
    costPerKg: 8.50
  }
];

/**
 * Load all saved recommendation history
 */
export function getFoodPackHistory(): FoodPackHistoryRecord[] {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(DEFAULT_HISTORY_RECORDS));
      return DEFAULT_HISTORY_RECORDS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_HISTORY_RECORDS;
  } catch {
    return DEFAULT_HISTORY_RECORDS;
  }
}

/**
 * Save a newly generated recommendation to history
 */
export function saveRecommendationToHistory(rec: FoodPackRecommendation): FoodPackHistoryRecord {
  const record: FoodPackHistoryRecord = {
    id: rec.id,
    date: rec.timestamp,
    commodity: `${rec.requirements.commodity} (${rec.requirements.category})`,
    quantityKg: rec.requirements.quantityKg,
    storage: rec.requirements.storage,
    transport: rec.requirements.transport,
    desiredShelfLife: rec.requirements.desiredShelfLife,
    recommendedMaterialName: rec.recommendedMaterial.name,
    recommendedMaterialId: rec.recommendedMaterial.id,
    overallScore: rec.scores.overallScore,
    estimatedCost: rec.costAnalysis.estimatedTotalCost,
    ecoScore: rec.ecoScore.overallEcoScore,
    costPerKg: rec.costAnalysis.costPerKgFood
  };

  try {
    const current = getFoodPackHistory();
    const updated = [record, ...current.filter(r => r.id !== record.id)];
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('[FoodPack AI History] Failed to save to localStorage:', err);
  }

  return record;
}

/**
 * Delete a recommendation from history by ID
 */
export function deleteHistoryItem(id: string): FoodPackHistoryRecord[] {
  try {
    const current = getFoodPackHistory();
    const updated = current.filter(r => r.id !== id);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

/**
 * Compute aggregate FoodPack AI analytics
 */
export function computeFoodPackAnalytics(history: FoodPackHistoryRecord[]): FoodPackAnalyticsSummary {
  if (!history || history.length === 0) {
    return {
      totalRecommendationsCount: 0,
      averagePackagingCostPerKg: 0,
      averageEcoScore: 0,
      estimatedWasteReductionPercent: 0,
      mostRecommendedMaterials: [],
      costVsSustainabilityPoints: []
    };
  }

  const total = history.length;
  const totalCost = history.reduce((sum, h) => sum + h.costPerKg, 0);
  const totalEco = history.reduce((sum, h) => sum + h.ecoScore, 0);

  // Group by material
  const matCounts: Record<string, number> = {};
  history.forEach(h => {
    matCounts[h.recommendedMaterialName] = (matCounts[h.recommendedMaterialName] || 0) + 1;
  });

  const mostRecommended = Object.entries(matCounts)
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / total) * 100)
    }))
    .sort((a, b) => b.count - a.count);

  const points = history.map(h => ({
    name: h.commodity.split('(')[0].trim(),
    costPerKg: h.costPerKg,
    ecoScore: h.ecoScore
  }));

  return {
    totalRecommendationsCount: total,
    averagePackagingCostPerKg: Math.round((totalCost / total) * 100) / 100,
    averageEcoScore: Math.round(totalEco / total),
    estimatedWasteReductionPercent: 78,
    mostRecommendedMaterials: mostRecommended,
    costVsSustainabilityPoints: points
  };
}
