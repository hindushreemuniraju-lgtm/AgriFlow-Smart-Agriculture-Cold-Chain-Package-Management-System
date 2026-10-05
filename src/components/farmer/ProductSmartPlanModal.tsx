import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { ProductIntelligence } from '../../types/product';
import { getProductVisual } from '../../utils/productImages';
import { X, Sparkles, MapPin, CheckCircle2, TrendingUp, Box, Truck, Calendar, ShieldCheck, Download, Share2 } from 'lucide-react';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import confetti from 'canvas-confetti';

interface ProductSmartPlanModalProps {
  product: ProductIntelligence;
  isOpen: boolean;
  onClose: () => void;
  onExecutePlan?: (planData: any) => void;
}

export const ProductSmartPlanModal: React.FC<ProductSmartPlanModalProps> = ({
  product,
  isOpen,
  onClose,
  onExecutePlan
}) => {
  if (!isOpen) return null;

  const visual = getProductVisual(product.id, product.name, product.category);
  const [acres, setAcres] = useState<number>(2.5);
  const [targetCity, setTargetCity] = useState<keyof ProductIntelligence['market']['regionalPrices']>('Bengaluru');
  const [marketTier, setMarketTier] = useState<'APMC Mandi' | 'Supermarket Chain' | 'Export Grade-A' | 'Processing'>('Supermarket Chain');
  const [copied, setCopied] = useState<boolean>(false);

  // Yield multiplier per acre based on category
  const baseYieldPerAcreKg = product.category === 'Vegetable' ? 8000
    : product.category === 'Fruit' ? 6000
    : product.category === 'Grain' ? 2200
    : product.category === 'Pulse' ? 900
    : product.category === 'Dry Fruit' ? 800
    : 1500;

  const totalYieldKg = Math.round(acres * baseYieldPerAcreKg);
  const regionalPrices = product.market?.regionalPrices || { Bengaluru: product.market?.basePricePerKg || 30 };
  const pricePerKg = regionalPrices[targetCity] ?? product.market?.basePricePerKg ?? 30;

  // Premium tier multiplier
  const tierMultiplier = marketTier === 'Export Grade-A' ? 1.35
    : marketTier === 'Supermarket Chain' ? 1.15
    : marketTier === 'Processing' ? 0.90
    : 1.0;

  const finalPricePerKg = Math.round(pricePerKg * tierMultiplier);
  const grossRevenue = Math.round(totalYieldKg * finalPricePerKg);
  const packagingCostTotal = Math.round(totalYieldKg * product.packaging.estimatedPackagingCostPerKg);
  const estimatedNetProfit = Math.round(grossRevenue * 0.72 - packagingCostTotal);

  const unitsCount = Math.ceil(totalYieldKg / (product.category === 'Vegetable' || product.category === 'Grain' ? 25 : 5));

  const handleShareOrCopy = () => {
    setCopied(true);
    confetti({
      particleCount: 60,
      spread: 50,
      origin: { y: 0.6 }
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return typeof document !== 'undefined' ? createPortal(
    <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl my-8 rounded-3xl bg-slate-900 border border-purple-500/40 p-6 sm:p-8 shadow-[0_0_60px_rgba(168,85,247,0.3)] space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
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
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono">
                {product.category} Roadmap
              </span>
              <span className="text-[10px] font-medium text-emerald-400 flex items-center gap-1 font-mono">
                <Sparkles className="w-3 h-3" />
                AI Smart Plan Generated
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-0.5">
              Smart Action Blueprint: {product.name}
            </h2>
            <p className="text-xs text-slate-400">
              End-to-end cultivation, curing, packaging, logistics, and revenue roadmap.
            </p>
          </div>
        </div>

        {/* User Configuration Controls */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-purple-500/25 grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Acreage Input */}
          <div className="space-y-1.5">
            <label className="text-[11px] text-slate-400 uppercase font-mono">Farm Plot Size (Acres)</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0.5"
                max="100"
                step="0.5"
                value={acres}
                onChange={(e) => setAcres(Math.max(0.5, parseFloat(e.target.value) || 1))}
                className="w-full bg-slate-900 border border-purple-500/30 text-white font-mono font-bold text-sm px-3 py-2 rounded-xl outline-none focus:border-purple-400"
              />
              <span className="text-xs text-slate-400 font-mono">Acres</span>
            </div>
          </div>

          {/* Mandi City Selector */}
          <div className="space-y-1.5">
            <label className="text-[11px] text-slate-400 uppercase font-mono">Target Mandi Destination</label>
            <select
              value={targetCity}
              onChange={(e) => setTargetCity(e.target.value as any)}
              className="w-full bg-slate-900 border border-purple-500/30 text-white font-mono text-xs px-3 py-2.5 rounded-xl outline-none focus:border-purple-400 cursor-pointer"
            >
              {Object.keys(regionalPrices).map((c) => (
                <option key={c} value={c}>
                  {c} Mandi (₹{regionalPrices[c]}/kg)
                </option>
              ))}
            </select>
          </div>

          {/* Market Tier */}
          <div className="space-y-1.5">
            <label className="text-[11px] text-slate-400 uppercase font-mono">Target Channel</label>
            <select
              value={marketTier}
              onChange={(e) => setMarketTier(e.target.value as any)}
              className="w-full bg-slate-900 border border-purple-500/30 text-white font-mono text-xs px-3 py-2.5 rounded-xl outline-none focus:border-purple-400 cursor-pointer"
            >
              <option value="Supermarket Chain">Direct Supermarket (+15%)</option>
              <option value="Export Grade-A">Export Grade-A (+35%)</option>
              <option value="APMC Mandi">Local APMC Mandi (Benchmark)</option>
              <option value="Processing">Food Processing Unit (-10%)</option>
            </select>
          </div>

        </div>

        {/* Projected Financial Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-purple-500/20 text-center space-y-1">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Est. Total Harvest</div>
            <div className="text-lg sm:text-xl font-extrabold text-sky-400 font-mono">
              {(totalYieldKg / 1000).toFixed(1)} Tons
            </div>
            <div className="text-[10px] text-slate-500 font-mono">{formatNumber(totalYieldKg)} kg total</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-purple-500/20 text-center space-y-1">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Realized Price</div>
            <div className="text-lg sm:text-xl font-extrabold text-emerald-400 font-mono">
              ₹{finalPricePerKg}/kg
            </div>
            <div className="text-[10px] text-emerald-500 font-mono">{marketTier}</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-purple-500/20 text-center space-y-1">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Gross Realization</div>
            <div className="text-lg sm:text-xl font-extrabold text-amber-300 font-mono">
              ₹{(grossRevenue / 100000).toFixed(2)} L
            </div>
            <div className="text-[10px] text-slate-500 font-mono">{formatCurrency(grossRevenue)}</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-1">
            <div className="text-[10px] text-emerald-300 uppercase font-mono">Est. Net Profit</div>
            <div className="text-lg sm:text-xl font-extrabold text-emerald-400 font-mono">
              ₹{(estimatedNetProfit / 100000).toFixed(2)} L
            </div>
            <div className="text-[10px] text-emerald-300 font-mono">72% Margin Index</div>
          </div>

        </div>

        {/* 4 Execution Pillars */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
            Key Execution Directives for {product.name}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            
            {/* Pillar 1: Sowing & Agronomy */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-purple-500/20 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-300">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span>1. Sowing & Fertilizer Calendar</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Plant during <strong className="text-white">{product.growing.sowingSeason}</strong> using <strong className="text-white">{product.growing.spacing}</strong> spacing. Apply {product.growing.fertilizerGuidance[0].recommendation}.
              </p>
            </div>

            {/* Pillar 2: Harvesting & Curing */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-purple-500/20 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>2. Harvesting & Curing Window</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Harvest in {product.harvesting.harvestingDays} days when {product.harvesting.maturityIndicators[0]}. {product.storage.curingRequired ? `Follow ${product.storage.curingInstructions || 'mandatory shade curing'}` : 'Pre-cool within 3 hours.'}
              </p>
            </div>

            {/* Pillar 3: Packaging Architecture */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-purple-500/20 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-sky-300">
                <Box className="w-4 h-4 text-sky-400" />
                <span>3. Packaging Bill of Materials</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pack into <strong className="text-white">{unitsCount} units</strong> of <strong className="text-white">{product.packaging.primaryPackaging}</strong>. Total estimated packaging outlay: <strong className="text-sky-300">{formatCurrency(packagingCostTotal)}</strong>.
              </p>
            </div>

            {/* Pillar 4: Cold-Chain Logistics */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-purple-500/20 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                <Truck className="w-4 h-4 text-emerald-400" />
                <span>4. Cold-Chain Dispatch Route</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Dispatch via <strong className="text-white">{product.transportation.recommendedVehicle}</strong> maintaining <strong className="text-emerald-300">{product.transportation.targetTemp}</strong>. Target APMC Mandi: <strong className="text-white">{targetCity}</strong>.
              </p>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-purple-500/20">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Batch Hash: <strong className="text-purple-300">AGRI-{product.id.toUpperCase()}-{Math.floor(Date.now() / 100000)}</strong></span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleShareOrCopy}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Plan Blueprint Copied!' : 'Export Blueprint'}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onExecutePlan?.({
                  product,
                  acres,
                  targetCity,
                  marketTier,
                  totalYieldKg,
                  grossRevenue
                });
              }}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-yellow-300" />
              <span>Adopt Blueprint & Order Logistics</span>
            </button>
          </div>
        </div>

      </div>
    </div>,
    document.body
  ) : null;
};
