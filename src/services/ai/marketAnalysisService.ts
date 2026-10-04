/**
 * AI Market Analysis & Advisory Service
 * Synthesizes structured data into contextual, anti-hallucinatory agronomic intelligence.
 */

import { EnrichedProductIntelligence } from '../crop/cropKnowledgeService';
import { DiscoveredMandi } from '../market/mandiDiscoveryService';
import { MarketNetRealizationBreakdown } from '../market/marketComparisonService';
import { PriceTrendAnalytics } from '../market/priceHistoryService';
import { WeatherTelemetry } from '../weather/weatherService';

export interface MarketAnalysisOutput {
  summary: string;
  bestMarketName: string;
  netRealizationExplanation: string;
  priceTrendInterpretation: string;
  weatherRiskContext: string;
  storageVsSellAdvice: string;
  strategicActionChecklist: string[];
}

/**
 * Generate natural-language analysis from structured deterministic data
 */
export function generateMarketAnalysis(
  crop: EnrichedProductIntelligence,
  farmerAddress: string,
  realizations: MarketNetRealizationBreakdown[],
  trend: PriceTrendAnalytics,
  weather: WeatherTelemetry
): MarketAnalysisOutput {
  const best = realizations[0];
  const second = realizations.length > 1 ? realizations[1] : undefined;

  let netExplanation = `Based on current available market data, ${best.mandi.market} yields the optimal net realization of ₹${best.netRealization.toLocaleString('en-IN')}.`;
  if (second) {
    const diff = best.netRealization - second.netRealization;
    netExplanation += ` This delivers ₹${diff.toLocaleString('en-IN')} higher net profit compared to ${second.mandi.market} after accounting for distance (${best.mandi.distanceKm} km vs ${second.mandi.distanceKm} km) and freight outlays.`;
  }

  let trendInterpretation = `Current 7-day trend shows price is ${trend.trendDirection.toLowerCase()} (${trend.percentageChange7d > 0 ? '+' : ''}${trend.percentageChange7d}%). ${trend.advisoryNote}`;

  let weatherContext = `Local ambient temperature is ${weather.temperatureC}°C with ${weather.humidityPercent}% RH. ${weather.harvestingAdvisory}`;
  if (weather.isRainThreat) {
    weatherContext += ' Rain precipitation threat detected; ensure immediate covered storage.';
  }

  const isPerishable = ['tomato', 'brinjal', 'mango', 'strawberry', 'spinach', 'capsicum', 'grapes'].includes(crop.id);
  let storageAdvice = `Given that ${crop.name} is a fresh horticultural crop, immediate direct dispatch to ${best.mandi.market} is strongly recommended over long storage to prevent moisture loss.`;
  if (!isPerishable || crop.category === 'Grain' || crop.category === 'Pulse') {
    storageAdvice = `Because ${crop.name} has long shelf-life stability, holding stock in dry silos for 15-30 days could yield higher realization if local prices are currently in a trough.`;
  }

  const checklist = [
    `Harvest during cool morning hours (${crop.harvesting.bestHarvestTime}).`,
    `Pack in certified ${crop.packaging.primaryPackaging}.`,
    `Dispatch via ${crop.transportation.recommendedVehicle} to ${best.mandi.market}.`,
    `Monitor transit temperature strictly at ${crop.transportation.targetTemp}.`
  ];

  return {
    summary: `Comprehensive commercial advisory for ${best.quantityKg} kg of ${crop.name} dispatched from ${farmerAddress}.`,
    bestMarketName: best.mandi.market,
    netRealizationExplanation: netExplanation,
    priceTrendInterpretation: trendInterpretation,
    weatherRiskContext: weatherContext,
    storageVsSellAdvice: storageAdvice,
    strategicActionChecklist: checklist
  };
}
