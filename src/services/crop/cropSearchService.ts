/**
 * Universal Crop Search & Orchestration Service
 */

import { ProductIntelligence } from '../../types/product';
import { COMPREHENSIVE_PRODUCT_DATABASE } from '../../data/productsDatabase';
import { resolveCropAlias, getDidYouMeanSuggestions, CANONICAL_CROP_ALIASES } from './cropAliasService';
import { identifyCropFromText, identifyCropFromImage, IdentificationResult } from './cropIdentificationService';
import { getEnrichedCropKnowledge, EnrichedProductIntelligence } from './cropKnowledgeService';

export interface CropSearchResult {
  product: EnrichedProductIntelligence;
  identification: IdentificationResult;
  didYouMean: { name: string; canonicalId: string; confidence: number }[];
}

/**
 * Execute search for a crop query
 */
export async function searchUniversalCrop(query: string): Promise<CropSearchResult> {
  const identification = identifyCropFromText(query);
  const didYouMean = getDidYouMeanSuggestions(query, 3);
  const product = getEnrichedCropKnowledge(identification.canonicalId !== 'unknown' ? identification.canonicalId : query);

  return {
    product,
    identification,
    didYouMean
  };
}

/**
 * Execute image-based identification & knowledge retrieval
 */
export async function searchCropByImage(file: File): Promise<CropSearchResult> {
  const identification = await identifyCropFromImage(file);
  const didYouMean = identification.candidates.map(c => ({
    name: c.name,
    canonicalId: c.canonicalId,
    confidence: c.confidence
  }));
  const product = getEnrichedCropKnowledge(identification.canonicalId);

  return {
    product,
    identification,
    didYouMean
  };
}

/**
 * Get all available preloaded crops with canonical mappings
 */
export function getAllAvailableCrops(): ProductIntelligence[] {
  return COMPREHENSIVE_PRODUCT_DATABASE;
}
