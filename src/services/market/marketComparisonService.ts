/**
 * Deterministic Market Realization & Cost Comparison Engine
 * Computes exact Gross Revenue, Transport, Packaging, Handling, Expected Loss, and Net Realization.
 */

import { DiscoveredMandi } from './mandiDiscoveryService';

export interface MarketNetRealizationBreakdown {
  mandi: DiscoveredMandi;
  quantityKg: number;
  grossRevenue: number;
  transportCost: number;
  packagingCost: number;
  handlingCost: number;
  expectedLossPercent: number;
  expectedLossValue: number;
  totalDeductions: number;
  netRealization: number;
  netRatePerKg: number;
  profitMarginPercent: number;
  isHighestNetRealization: boolean;
  isClosest: boolean;
}

/**
 * Compute deterministic net realization breakdown for a list of mandis
 */
export function calculateMarketRealizations(
  mandis: DiscoveredMandi[],
  quantityKg: number,
  packagingCostPerKg: number = 1.20,
  isPerishable: boolean = true
): MarketNetRealizationBreakdown[] {
  const safeQty = Math.max(10, quantityKg);

  const results: MarketNetRealizationBreakdown[] = mandis.map(mandi => {
    const rawPricePerKg = mandi.modalPricePerKg;
    const grossRevenue = Math.round(safeQty * rawPricePerKg);

    // Deterministic Transport Cost Formula:
    // Base hook charge (₹300) + Distance * ₹14/km * weight multiplier
    const weightTons = safeQty / 1000;
    const tonnageFactor = Math.max(0.6, Math.min(3.0, weightTons));
    const transportCost = Math.round(300 + (mandi.distanceKm * 14.5 * tonnageFactor));

    // Packaging Cost
    const packagingCost = Math.round(safeQty * packagingCostPerKg);

    // Mandi Loading / Unloading / Weighment Cess (₹0.30 per kg)
    const handlingCost = Math.round(safeQty * 0.30);

    // Expected Transit Spoilage / Physical Bruising Loss %:
    // 0.8% base + 0.02% per km for perishables (damped with packaging)
    const lossPct = isPerishable 
      ? Math.min(8.0, parseFloat((0.8 + (mandi.distanceKm * 0.025)).toFixed(1)))
      : Math.min(2.5, parseFloat((0.3 + (mandi.distanceKm * 0.008)).toFixed(1)));
    
    const expectedLossValue = Math.round(grossRevenue * (lossPct / 100));

    const totalDeductions = transportCost + packagingCost + handlingCost + expectedLossValue;
    const netRealization = Math.max(0, grossRevenue - totalDeductions);
    const netRatePerKg = parseFloat((netRealization / safeQty).toFixed(2));
    const profitMargin = grossRevenue > 0 ? parseFloat(((netRealization / grossRevenue) * 100).toFixed(1)) : 0;

    return {
      mandi,
      quantityKg: safeQty,
      grossRevenue,
      transportCost,
      packagingCost,
      handlingCost,
      expectedLossPercent: lossPct,
      expectedLossValue,
      totalDeductions,
      netRealization,
      netRatePerKg,
      profitMarginPercent: profitMargin,
      isHighestNetRealization: false,
      isClosest: false
    };
  });

  // Identify highest net realization and closest
  if (results.length > 0) {
    let highestIdx = 0;
    let closestIdx = 0;
    let maxNet = -Infinity;
    let minDist = Infinity;

    results.forEach((r, idx) => {
      if (r.netRealization > maxNet) {
        maxNet = r.netRealization;
        highestIdx = idx;
      }
      if (r.mandi.distanceKm < minDist) {
        minDist = r.mandi.distanceKm;
        closestIdx = idx;
      }
    });

    results[highestIdx].isHighestNetRealization = true;
    results[closestIdx].isClosest = true;
  }

  // Sort descending by Net Realization
  return results.sort((a, b) => b.netRealization - a.netRealization);
}
