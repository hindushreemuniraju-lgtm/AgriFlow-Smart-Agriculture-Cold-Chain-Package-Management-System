/**
 * Smart Market Selling Recommendation Service
 * Evaluates real net realizations to provide transparent, anti-hallucinatory commercial advice.
 */

import { MarketNetRealizationBreakdown } from './marketComparisonService';
import { PriceTrendAnalytics } from './priceHistoryService';
import { formatCurrency } from '../../utils/formatters';

export interface SmartSellingRecommendation {
  cropName: string;
  farmerLocation: string;
  quantityKg: number;
  bestMarket: MarketNetRealizationBreakdown;
  alternativeMarket?: MarketNetRealizationBreakdown;
  priceTrend: PriceTrendAnalytics['trendDirection'];
  priceTrendIcon: string;
  recommendationHeadline: string;
  reasoning: string;
  isCloseMarketBetterThanHighRawPrice: boolean;
  actionSummary: string[];
}

/**
 * Generate transparent smart selling recommendation based on net realization
 */
export function generateSmartMarketRecommendation(
  cropName: string,
  farmerLocation: string,
  realizations: MarketNetRealizationBreakdown[],
  trendAnalytics: PriceTrendAnalytics
): SmartSellingRecommendation | null {
  if (!realizations || realizations.length === 0) return null;

  const best = realizations[0]; // Already sorted descending by netRealization
  const alternative = realizations.length > 1 ? realizations[1] : undefined;

  // Find if there is a distant market with higher raw price but lower net realization
  let distantHigherRawMarket: MarketNetRealizationBreakdown | undefined = undefined;
  for (const r of realizations) {
    if (r.mandi.modalPricePerKg > best.mandi.modalPricePerKg && r.netRealization < best.netRealization) {
      distantHigherRawMarket = r;
      break;
    }
  }

  const isCloseMarketBetter = !!distantHigherRawMarket;

  let reasoning = `Based on available market auction data for ${best.quantityKg} kg of ${cropName}, ${best.mandi.market} offers the highest estimated net realization of ${formatCurrency(best.netRealization)} (₹${best.netRatePerKg}/kg net in pocket).`;
  
  if (isCloseMarketBetter && distantHigherRawMarket) {
    const rawDiff = Math.round((distantHigherRawMarket.mandi.modalPricePerKg - best.mandi.modalPricePerKg) * 100);
    const transportSaving = distantHigherRawMarket.transportCost - best.transportCost;
    reasoning = `Although ${distantHigherRawMarket.mandi.market} posts a higher raw auction price (+₹${rawDiff}/qtl), ${best.mandi.market} provides ${formatCurrency(best.netRealization - distantHigherRawMarket.netRealization)} higher net earnings because it is ${distantHigherRawMarket.mandi.distanceKm - best.mandi.distanceKm} km closer, saving ${formatCurrency(transportSaving)} in freight and ${((distantHigherRawMarket.expectedLossPercent - best.expectedLossPercent)).toFixed(1)}% in transit handling loss.`;
  }

  const actionSummary = [
    `Target ${best.mandi.market} (${best.mandi.distanceKm} km) for maximum net realization.`,
    `Expected modal raw rate: ₹${best.mandi.modalPrice}/qtl (₹${best.mandi.modalPricePerKg}/kg).`,
    `Budgeted transit logistics outlay: ${formatCurrency(best.transportCost)}.`,
    `Estimated net profit in hand: ${formatCurrency(best.netRealization)} (${best.profitMarginPercent}% realization efficiency).`
  ];

  return {
    cropName,
    farmerLocation,
    quantityKg: best.quantityKg,
    bestMarket: best,
    alternativeMarket: alternative,
    priceTrend: trendAnalytics.trendDirection,
    priceTrendIcon: trendAnalytics.trendIcon,
    recommendationHeadline: `Deliver to ${best.mandi.market} for Optimal Net Realization`,
    reasoning,
    isCloseMarketBetterThanHighRawPrice: isCloseMarketBetter,
    actionSummary
  };
}
