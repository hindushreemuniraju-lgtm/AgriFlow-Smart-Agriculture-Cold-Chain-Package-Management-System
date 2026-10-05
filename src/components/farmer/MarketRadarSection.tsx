import React, { useState, useMemo } from 'react';
import { EnrichedProductIntelligence } from '../../services/crop/cropKnowledgeService';
import { GeocodedAddress } from '../../services/location/geocodingService';
import { discoverNearbyMandis, DiscoveredMandi } from '../../services/market/mandiDiscoveryService';
import { calculateMarketRealizations, MarketNetRealizationBreakdown } from '../../services/market/marketComparisonService';
import { getPriceHistoryAnalytics, PriceTrendAnalytics } from '../../services/market/priceHistoryService';
import { generateSmartMarketRecommendation, SmartSellingRecommendation } from '../../services/market/marketRecommendationService';
import { BarChart3, TrendingUp, TrendingDown, MapPin, Sparkles, AlertCircle, ShieldCheck, Scale, Truck, Box, ArrowRight, CheckCircle2, DollarSign } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface MarketRadarSectionProps {
  product: EnrichedProductIntelligence;
  location: GeocodedAddress;
  quantityKg: number;
  onQuantityChange: (qty: number) => void;
  onSelectBestMarket?: (mandi: DiscoveredMandi) => void;
}

export const MarketRadarSection: React.FC<MarketRadarSectionProps> = ({
  product,
  location,
  quantityKg,
  onQuantityChange,
  onSelectBestMarket
}) => {
  const [activeTab, setActiveTab] = useState<'comparison' | 'history' | 'recommendation'>('comparison');

  // Discover mandis progressively around the farmer's location
  const discoveryResult = useMemo(() => {
    return discoverNearbyMandis(
      location.latitude,
      location.longitude,
      product.id,
      product.name,
      250
    );
  }, [location.latitude, location.longitude, product.id, product.name]);

  // Compute deterministic net realization across all discovered mandis
  const realizations: MarketNetRealizationBreakdown[] = useMemo(() => {
    const isPerishable = !['rice', 'wheat', 'maize', 'ragi', 'chickpea', 'almond', 'cashew', 'walnut', 'turmeric'].includes(product.id);
    return calculateMarketRealizations(
      discoveryResult.mandis,
      quantityKg,
      product.packaging.estimatedPackagingCostPerKg,
      isPerishable
    );
  }, [discoveryResult.mandis, quantityKg, product.id, product.packaging.estimatedPackagingCostPerKg]);

  const bestMandiPrice = realizations[0]?.mandi.modalPrice || product.market.basePricePerKg * 100;

  // Price Trend Analytics
  const trendAnalytics: PriceTrendAnalytics = useMemo(() => {
    return getPriceHistoryAnalytics(product.id, bestMandiPrice);
  }, [product.id, bestMandiPrice]);

  // Smart Selling Recommendation
  const smartRecommendation: SmartSellingRecommendation | null = useMemo(() => {
    return generateSmartMarketRecommendation(
      product.name,
      location.formattedAddress,
      realizations,
      trendAnalytics
    );
  }, [product.name, location.formattedAddress, realizations, trendAnalytics]);

  const presetQuantities = [100, 500, 1000, 2500, 5000];

  return (
    <div className="space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-purple-500/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
              Live Mandi Price Radar & Net Realization Engine
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-0.5">
            APMC Market Intelligence: {product.name}
          </h3>
          <p className="text-xs text-slate-400">
            Real APMC auctions, progressive mandi discovery, and true net realization in your pocket.
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 bg-slate-900/90 border border-purple-500/30 p-1.5 rounded-2xl">
          <span className="text-xs font-mono text-slate-400 pl-2">Batch Weight:</span>
          <div className="flex items-center gap-1">
            {presetQuantities.map((q) => (
              <button
                key={q}
                onClick={() => onQuantityChange(q)}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                  quantityKg === q
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {q >= 1000 ? `${q / 1000}T` : `${q}kg`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Radius Expansion Notification if search was broadened */}
      {discoveryResult.radiusExpansionNote && (
        <div className="p-3.5 rounded-2xl bg-sky-950/40 border border-sky-500/30 flex items-center gap-2.5 text-xs text-sky-200">
          <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
          <span>{discoveryResult.radiusExpansionNote}</span>
        </div>
      )}

      {/* 1. Smart Selling Recommendation Banner */}
      {smartRecommendation && (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-purple-950/50 border border-emerald-500/40 p-6 shadow-2xl space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl border border-emerald-500/40">
                🌾
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                  SMART SELLING RECOMMENDATION
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  {smartRecommendation.recommendationHeadline}
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-slate-950/80 px-3.5 py-1.5 rounded-xl border border-emerald-500/30 text-right">
                <div className="text-[10px] text-slate-400 font-mono">Net In Pocket</div>
                <div className="text-base sm:text-lg font-extrabold text-emerald-400 font-mono">
                  {formatCurrency(smartRecommendation.bestMarket.netRealization)}
                </div>
              </div>
              <div className="bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800 text-right">
                <div className="text-[10px] text-slate-400 font-mono">Realization Rate</div>
                <div className="text-xs sm:text-sm font-bold text-sky-300 font-mono">
                  ₹{smartRecommendation.bestMarket.netRatePerKg}/kg
                </div>
              </div>
            </div>
          </div>

          {/* Reasoning */}
          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-200 leading-relaxed font-medium">
            <strong className="text-emerald-300">Commercial Rationale: </strong>
            {smartRecommendation.reasoning}
          </div>

          {/* 4 Action Bullets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
            {smartRecommendation.actionSummary.map((item, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-950/50 border border-purple-500/15 text-[11px] text-slate-300 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* 2. Sub-Tabs: Mandi Comparison vs Price History Trend */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('comparison')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'comparison'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>Mandi Net Realization Table ({realizations.length} Mandis)</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'history'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Price History & Trend ({trendAnalytics.percentageChange7d > 0 ? '+' : ''}{trendAnalytics.percentageChange7d}%)</span>
        </button>
      </div>

      {/* Tab 1: Deterministic Mandi Comparison Cards & Table */}
      {activeTab === 'comparison' && (
        <div className="space-y-4">
          
          {/* Responsive Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {realizations.map((item, idx) => {
              const isBest = item.isHighestNetRealization;
              return (
                <div
                  key={idx}
                  className={`relative p-5 rounded-3xl border transition-all duration-300 space-y-3.5 ${
                    isBest
                      ? 'bg-gradient-to-b from-purple-900/40 via-slate-900 to-slate-950 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)] ring-1 ring-emerald-400/50'
                      : 'bg-slate-900/80 border-purple-500/20 hover:border-purple-500/40'
                  }`}
                >
                  {/* Top Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {item.mandi.state}
                        </span>
                        {isBest && (
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                            ★ Highest Net
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-white mt-1">
                        {item.mandi.market}
                      </h4>
                      <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-sky-400" />
                        <span>{item.mandi.distanceKm} km away ({item.mandi.searchRadiusTier})</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-slate-400 font-mono">Raw Rate</div>
                      <div className="text-sm font-bold text-white font-mono">
                        ₹{item.mandi.modalPrice}/qtl
                      </div>
                      <div className="text-[10px] text-slate-500">₹{item.mandi.modalPricePerKg}/kg</div>
                    </div>
                  </div>

                  {/* Financial Breakdown Matrix */}
                  <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2 text-xs">
                    
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Gross Crop Realization:</span>
                      <span className="font-mono text-white">{formatCurrency(item.grossRevenue)}</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span className="flex items-center gap-1">
                        <Truck className="w-3 h-3 text-amber-400" />
                        Freight Transport ({item.mandi.distanceKm}km):
                      </span>
                      <span className="font-mono text-amber-300">- {formatCurrency(item.transportCost)}</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span className="flex items-center gap-1">
                        <Box className="w-3 h-3 text-purple-400" />
                        Packaging & Labelling:
                      </span>
                      <span className="font-mono text-purple-300">- {formatCurrency(item.packagingCost)}</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span>Handling & Transit Loss ({item.expectedLossPercent}%):</span>
                      <span className="font-mono text-rose-400">- {formatCurrency(item.handlingCost + item.expectedLossValue)}</span>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between font-bold">
                      <span className="text-emerald-400">Net Take-Home Cash:</span>
                      <span className="text-base font-mono text-emerald-400">{formatCurrency(item.netRealization)}</span>
                    </div>
                  </div>

                  {/* Mandi Data Source & Freshness */}
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {item.mandi.freshnessStatus}
                    </span>
                    <span className="truncate max-w-[150px]">{item.mandi.source}</span>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* Tab 2: Price History & Trends */}
      {activeTab === 'history' && (
        <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 bg-slate-900/90 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg">{trendAnalytics.trendIcon}</span>
                <h4 className="text-base font-bold text-white">
                  30-Day Historical Price Trajectory ({product.name})
                </h4>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {trendAnalytics.advisoryNote}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-slate-950 p-3 rounded-xl border border-purple-500/20 text-center">
                <div className="text-[10px] text-slate-400 font-mono uppercase">7-Day Change</div>
                <div className={`text-sm font-bold font-mono ${trendAnalytics.percentageChange7d >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {trendAnalytics.percentageChange7d > 0 ? '+' : ''}{trendAnalytics.percentageChange7d}%
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-purple-500/20 text-center">
                <div className="text-[10px] text-slate-400 font-mono uppercase">Market Volatility</div>
                <div className="text-sm font-bold text-amber-300 font-mono">
                  {trendAnalytics.volatilityRating}
                </div>
              </div>
            </div>
          </div>

          {/* History Timeline Points */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {trendAnalytics.historyPoints.map((pt, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-center space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-mono">{pt.label}</div>
                <div className="text-[11px] text-slate-500">{pt.date}</div>
                <div className="text-base font-bold text-white font-mono pt-1">
                  ₹{pt.modalPrice}/qtl
                </div>
                <div className="text-[11px] text-emerald-400 font-mono">₹{pt.modalPricePerKg}/kg</div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
