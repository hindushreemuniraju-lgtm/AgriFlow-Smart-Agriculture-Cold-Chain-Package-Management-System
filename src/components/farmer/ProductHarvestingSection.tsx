import React from 'react';
import { ProductIntelligence } from '../../types/product';
import { Wheat, Clock, CheckCircle, Scissors, Wind, Gauge, ShieldAlert, Sparkles } from 'lucide-react';

interface ProductHarvestingSectionProps {
  product: ProductIntelligence;
}

export const ProductHarvestingSection: React.FC<ProductHarvestingSectionProps> = ({ product }) => {
  const { harvesting, storage } = product;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-purple-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Wheat className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span>Harvesting & Post-Harvest Operations</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                {product.name}
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Optimal harvest maturity indicators, timing, and curing protocols
            </p>
          </div>
        </div>

        {/* Days Countdown */}
        <div className="bg-slate-900/90 border border-purple-500/30 rounded-xl px-4 py-2 flex items-center gap-3">
          <Clock className="w-4 h-4 text-sky-400 animate-pulse" />
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-mono">Harvest Window</div>
            <div className="text-sm font-bold text-sky-300 font-mono">
              In ~{harvesting.harvestingDays} Days
            </div>
          </div>
        </div>
      </div>

      {/* Harvest Window & Target Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Recommended Window */}
        <div className="glass-panel p-4 rounded-2xl border border-purple-500/20 bg-slate-900/80 space-y-1.5">
          <div className="text-[10px] text-slate-400 uppercase font-mono flex items-center gap-1.5 text-purple-300">
            <Clock className="w-3.5 h-3.5" />
            Recommended Window
          </div>
          <div className="text-xs sm:text-sm font-bold text-white leading-snug">
            {harvesting.recommendedWindow}
          </div>
          <div className="text-[11px] text-slate-400">
            Best time: <span className="text-amber-300 font-medium">{harvesting.bestHarvestTime}</span>
          </div>
        </div>

        {/* Sugar Brix Target */}
        <div className="glass-panel p-4 rounded-2xl border border-purple-500/20 bg-slate-900/80 space-y-1.5">
          <div className="text-[10px] text-slate-400 uppercase font-mono flex items-center gap-1.5 text-sky-400">
            <Gauge className="w-3.5 h-3.5" />
            Sugar Brix / Internal Quality
          </div>
          <div className="text-base sm:text-lg font-bold text-sky-300 font-mono">
            {harvesting.sugarBrixTarget || 'Starch / Dry Matter Benchmark'}
          </div>
          <div className="text-[11px] text-slate-400">
            Verified optical refractometer benchmark.
          </div>
        </div>

        {/* Firmness / Physical Metric */}
        <div className="glass-panel p-4 rounded-2xl border border-purple-500/20 bg-slate-900/80 space-y-1.5">
          <div className="text-[10px] text-slate-400 uppercase font-mono flex items-center gap-1.5 text-emerald-400">
            <Gauge className="w-3.5 h-3.5" />
            Skin & Pulp Firmness
          </div>
          <div className="text-base sm:text-lg font-bold text-emerald-300 font-mono">
            {harvesting.firmnessTarget || 'Firm intact epidermis'}
          </div>
          <div className="text-[11px] text-slate-400">
            Resistance to transport bruising.
          </div>
        </div>

      </div>

      {/* Maturity Indicators Checklist */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 bg-slate-900/90 space-y-4">
        <h4 className="text-sm font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>Product-Specific Maturity Indicators for {product.name}</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {harvesting.maturityIndicators.map((indicator, idx) => (
            <div 
              key={idx}
              className="p-3.5 rounded-xl bg-slate-950/60 border border-emerald-500/20 flex items-start gap-3"
            >
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                ✓
              </div>
              <span className="text-xs text-slate-200 font-medium leading-relaxed">
                {indicator}
              </span>
            </div>
          ))}
        </div>

        {/* Method */}
        <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/20 text-xs text-slate-200 leading-relaxed flex items-start gap-2.5 mt-2">
          <Scissors className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-300">Harvesting Technique: </strong>
            {harvesting.harvestingMethod}
          </div>
        </div>
      </div>

      {/* Curing & Post-Harvest Operations */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 bg-slate-900/90 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-sky-300 uppercase tracking-wider flex items-center gap-2">
            <Wind className="w-4 h-4" />
            <span>Post-Harvest Handling & Curing Protocol</span>
          </h4>
          {storage.curingRequired && (
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
              Mandatory Curing Crop
            </span>
          )}
        </div>

        {storage.curingRequired && storage.curingInstructions && (
          <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 space-y-1.5">
            <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Curing & Drying Directives:
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              {storage.curingInstructions}
            </p>
          </div>
        )}

        <div className="space-y-2.5">
          {harvesting.postHarvestHandling.map((step, idx) => (
            <div 
              key={idx}
              className="p-3.5 rounded-xl bg-slate-950/70 border border-purple-500/20 flex items-start gap-3"
            >
              <span className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-300 font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">
                {idx + 1}
              </span>
              <span className="text-xs text-slate-200 font-medium leading-relaxed">
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
