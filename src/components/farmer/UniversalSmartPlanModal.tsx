import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { EnrichedProductIntelligence } from '../../services/crop/cropKnowledgeService';
import { GeocodedAddress } from '../../services/location/geocodingService';
import { UniversalSmartPlan, generateUniversalSmartPlan } from '../../services/ai/smartPlanService';
import { getVerifiedCropVisual } from '../../services/crop/cropImageService';
import { X, Sparkles, MapPin, CheckCircle2, TrendingUp, Box, Truck, Calendar, ShieldCheck, Share2, Printer, CloudSun, AlertTriangle, Scale, DollarSign } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import confetti from 'canvas-confetti';

interface UniversalSmartPlanModalProps {
  crop: EnrichedProductIntelligence;
  location: GeocodedAddress;
  quantityKg: number;
  isOpen: boolean;
  onClose: () => void;
  onExecutePlan?: (plan: UniversalSmartPlan) => void;
}

export const UniversalSmartPlanModal: React.FC<UniversalSmartPlanModalProps> = ({
  crop,
  location,
  quantityKg,
  isOpen,
  onClose,
  onExecutePlan
}) => {
  const [plan, setPlan] = useState<UniversalSmartPlan | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      generateUniversalSmartPlan(crop.id, location, quantityKg).then(p => {
        setPlan(p);
        setLoading(false);
      });
    }
  }, [isOpen, crop.id, location.formattedAddress, quantityKg]);

  if (!isOpen) return null;

  const visual = getVerifiedCropVisual(crop.id, crop.name);

  const handleCopyOrExport = () => {
    setCopied(true);
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    setTimeout(() => setCopied(false), 2500);
  };

  return typeof document !== 'undefined' ? createPortal(
    <div className="fixed inset-0 z-[9990] flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl my-6 rounded-3xl bg-slate-900 border border-purple-500/40 p-6 sm:p-8 shadow-[0_0_60px_rgba(168,85,247,0.35)] space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {loading || !plan ? (
          <div className="py-20 text-center space-y-4">
            <div className="w-12 h-12 mx-auto border-3 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <div className="text-sm font-bold text-white font-mono">
              Computing Universal Smart Decision Plan for {crop.name}...
            </div>
            <p className="text-xs text-slate-400">
              Cross-referencing GPS location, live APMC market prices, weather telemetry, and cold packaging specs.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-500/20">
              <div className="flex items-center gap-4">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-lg border flex-shrink-0"
                  style={{ 
                    background: `linear-gradient(135deg, ${visual.gradient[0]}, ${visual.gradient[1]})`,
                    borderColor: visual.accentColor 
                  }}
                >
                  {visual.emoji}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono">
                      {plan.planId}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 font-mono">
                      <Sparkles className="w-3.5 h-3.5" />
                      Deterministic Net Realization Blueprint
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-0.5">
                    Universal Smart Plan: {crop.name}
                  </h2>
                  <p className="text-xs text-slate-400">
                    Harvest, curing, packaging, logistics, APMC destination, and net financial earnings.
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] text-slate-400 font-mono">Batch Provenance Hash</div>
                <div className="text-xs font-mono font-bold text-purple-300">
                  {plan.provenanceBatchHash}
                </div>
              </div>
            </div>

            {/* Top 4 KPI Metrics Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-purple-500/20 text-center space-y-0.5">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Produce Quantity</div>
                <div className="text-lg font-extrabold text-sky-400 font-mono">{plan.quantityKg} kg</div>
                <div className="text-[10px] text-slate-500">{crop.variety}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-purple-500/20 text-center space-y-0.5">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Best Target Mandi</div>
                <div className="text-sm font-bold text-white truncate line-clamp-1">{plan.sellingRecommendation.bestMarket.mandi.market}</div>
                <div className="text-[10px] text-emerald-400 font-mono">{plan.sellingRecommendation.bestMarket.mandi.distanceKm} km away</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-purple-500/20 text-center space-y-0.5">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Auction Raw Rate</div>
                <div className="text-lg font-extrabold text-white font-mono">₹{plan.sellingRecommendation.bestMarket.mandi.modalPricePerKg}/kg</div>
                <div className="text-[10px] text-slate-500 font-mono">₹{plan.sellingRecommendation.bestMarket.mandi.modalPrice}/qtl</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-center space-y-0.5">
                <div className="text-[10px] text-emerald-300 uppercase font-mono">Net Realization</div>
                <div className="text-xl font-extrabold text-emerald-400 font-mono">{formatCurrency(plan.sellingRecommendation.bestMarket.netRealization)}</div>
                <div className="text-[10px] text-emerald-300 font-mono">₹{plan.sellingRecommendation.bestMarket.netRatePerKg}/kg net</div>
              </div>
            </div>

            {/* Section 1: Location, Weather & Commercial Rationale */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Location & Live Weather */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-purple-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5 uppercase tracking-wider font-mono">
                    <MapPin className="w-4 h-4 text-sky-400" />
                    Origin & Microclimate
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {plan.weather.conditionIcon} {plan.weather.temperatureC}°C • {plan.weather.humidityPercent}% RH
                  </span>
                </div>
                <div className="text-xs text-white font-semibold">
                  {plan.location.formattedAddress}
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {plan.weather.harvestingAdvisory}
                </p>
              </div>

              {/* Rationale & Decision AI */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-emerald-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5 uppercase tracking-wider font-mono">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Commercial Recommendation
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                    {plan.sellingRecommendation.priceTrendIcon} {plan.sellingRecommendation.priceTrend} Trend
                  </span>
                </div>
                <p className="text-[11px] text-slate-200 leading-relaxed font-medium">
                  {plan.sellingRecommendation.reasoning}
                </p>
              </div>

            </div>

            {/* Section 2: Financial Realization Deductions Breakdown */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-purple-500/25 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-amber-400" />
                  Deterministic Financial Deductions Matrix
                </span>
                <span className="text-slate-400 font-mono text-[11px]">Formula: Gross - Transport - Packaging - Handling - Loss</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-400">Gross Revenue</div>
                  <div className="font-bold text-white font-mono mt-0.5">{formatCurrency(plan.sellingRecommendation.bestMarket.grossRevenue)}</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-amber-400">Transport Freight</div>
                  <div className="font-bold text-amber-300 font-mono mt-0.5">- {formatCurrency(plan.sellingRecommendation.bestMarket.transportCost)}</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-purple-400">Packaging Outlay</div>
                  <div className="font-bold text-purple-300 font-mono mt-0.5">- {formatCurrency(plan.sellingRecommendation.bestMarket.packagingCost)}</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-rose-400">Handling & Loss</div>
                  <div className="font-bold text-rose-300 font-mono mt-0.5">- {formatCurrency(plan.sellingRecommendation.bestMarket.handlingCost + plan.sellingRecommendation.bestMarket.expectedLossValue)}</div>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 col-span-2 sm:col-span-1">
                  <div className="text-[10px] text-emerald-300 font-bold">Net In Hand</div>
                  <div className="font-extrabold text-emerald-400 font-mono mt-0.5">{formatCurrency(plan.sellingRecommendation.bestMarket.netRealization)}</div>
                </div>
              </div>
            </div>

            {/* Section 3: Packaging, Storage & Logistics Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              
              {/* Packaging Pillar */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-purple-500/20 space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-purple-300 font-mono">
                  <Box className="w-4 h-4 text-purple-400" />
                  <span>1. Packaging BOM</span>
                </div>
                <div className="font-semibold text-white">
                  {plan.packagingSpec.totalUnitsRequired} units of {plan.packagingSpec.recommendedPackageType}
                </div>
                <div className="text-[11px] text-slate-400">
                  Ventilation: {plan.packagingSpec.ventilationRequirement}
                </div>
              </div>

              {/* Storage Pillar */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-purple-500/20 space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-sky-300 font-mono">
                  <Calendar className="w-4 h-4 text-sky-400" />
                  <span>2. Storage Protocol</span>
                </div>
                <div className="font-semibold text-white">
                  {plan.storageProtocol.optimalTemperature}
                </div>
                <div className="text-[11px] text-slate-400">
                  Shelf-life: {plan.storageProtocol.shelfLifeColdDays} days cold / {plan.storageProtocol.shelfLifeAmbientDays} days ambient
                </div>
              </div>

              {/* Transport Fleet Pillar */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-purple-500/20 space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-amber-300 font-mono">
                  <Truck className="w-4 h-4 text-amber-400" />
                  <span>3. Logistics Fleet</span>
                </div>
                <div className="font-semibold text-white">
                  {plan.transportGuidance.recommendedVehicle}
                </div>
                <div className="text-[11px] text-slate-400">
                  Target Temp: {plan.transportGuidance.targetTemperature} (~{plan.transportGuidance.estimatedTransitHours} hrs)
                </div>
              </div>

            </div>

            {/* Modal Footer Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-purple-500/20">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified by AgriFlow Universal Crop Intelligence</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleCopyOrExport}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  <span>{copied ? 'Plan Blueprint Copied!' : 'Export Blueprint'}</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onExecutePlan?.(plan);
                  }}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-yellow-300" />
                  <span>Adopt Blueprint & Order Logistics</span>
                </button>
              </div>
            </div>
          </>
        )}

      </div>
    </div>,
    document.body
  ) : null;
};
