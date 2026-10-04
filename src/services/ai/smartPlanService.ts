/**
 * Universal Smart Plan Synthesis Engine
 * Combines all intelligence engines into a unified, actionable digital decision roadmap.
 */

import { EnrichedProductIntelligence, getEnrichedCropKnowledge } from '../crop/cropKnowledgeService';
import { GeocodedAddress } from '../location/geocodingService';
import { WeatherTelemetry, getAgroWeather } from '../weather/weatherService';
import { discoverNearbyMandis, MandiDiscoveryResult } from '../market/mandiDiscoveryService';
import { calculateMarketRealizations, MarketNetRealizationBreakdown } from '../market/marketComparisonService';
import { getPriceHistoryAnalytics, PriceTrendAnalytics } from '../market/priceHistoryService';
import { generateSmartMarketRecommendation, SmartSellingRecommendation } from '../market/marketRecommendationService';
import { computePackagingSpec, PackagingSpecification } from '../packaging/packagingService';
import { getStorageProtocol, StorageProtocol } from '../storage/storageService';
import { computeTransportGuidance, TransportGuidance } from '../transport/transportCostService';
import { generateMarketAnalysis, MarketAnalysisOutput } from './marketAnalysisService';

export interface UniversalSmartPlan {
  planId: string;
  generatedAt: string;
  crop: EnrichedProductIntelligence;
  location: GeocodedAddress;
  quantityKg: number;
  weather: WeatherTelemetry;
  mandiDiscovery: MandiDiscoveryResult;
  realizations: MarketNetRealizationBreakdown[];
  priceTrend: PriceTrendAnalytics;
  sellingRecommendation: SmartSellingRecommendation;
  packagingSpec: PackagingSpecification;
  storageProtocol: StorageProtocol;
  transportGuidance: TransportGuidance;
  aiAnalysis: MarketAnalysisOutput;
  provenanceBatchHash: string;
}

/**
 * Generate Universal Smart Plan from live inputs
 */
export async function generateUniversalSmartPlan(
  cropQuery: string,
  location: GeocodedAddress,
  quantityKg: number = 500
): Promise<UniversalSmartPlan> {
  const crop = getEnrichedCropKnowledge(cropQuery);
  const weather = await getAgroWeather(location.latitude, location.longitude);
  
  const mandiDiscovery = discoverNearbyMandis(
    location.latitude,
    location.longitude,
    crop.id,
    crop.name,
    250
  );

  const packagingSpec = computePackagingSpec(
    crop.id,
    crop.name,
    quantityKg,
    mandiDiscovery.mandis[0]?.distanceKm || 50
  );

  const isPerishable = !['rice', 'wheat', 'maize', 'ragi', 'chickpea', 'almond', 'cashew', 'walnut', 'turmeric'].includes(crop.id);
  const realizations = calculateMarketRealizations(
    mandiDiscovery.mandis,
    quantityKg,
    crop.packaging.estimatedPackagingCostPerKg,
    isPerishable
  );

  const bestMandiPrice = realizations[0]?.mandi.modalPrice || crop.market.basePricePerKg * 100;
  const priceTrend = getPriceHistoryAnalytics(crop.id, bestMandiPrice);

  const sellingRecommendation = generateSmartMarketRecommendation(
    crop.name,
    location.formattedAddress,
    realizations,
    priceTrend
  )!;

  const storageProtocol = getStorageProtocol(crop.id, crop.name);

  const transportGuidance = computeTransportGuidance(
    crop.id,
    crop.name,
    quantityKg,
    realizations[0]?.mandi.distanceKm || 45
  );

  const aiAnalysis = generateMarketAnalysis(
    crop,
    location.formattedAddress,
    realizations,
    priceTrend,
    weather
  );

  const planId = `PLAN-${crop.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const provenanceBatchHash = `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`.toUpperCase();

  return {
    planId,
    generatedAt: new Date().toISOString(),
    crop,
    location,
    quantityKg,
    weather,
    mandiDiscovery,
    realizations,
    priceTrend,
    sellingRecommendation,
    packagingSpec,
    storageProtocol,
    transportGuidance,
    aiAnalysis,
    provenanceBatchHash
  };
}
