import React from 'react';
import { ProductIntelligence } from '../../types/product';
import { Sprout, Sun, Droplets, Thermometer, Layers, Bug, CheckCircle2, TrendingUp, Award, Cog, Sparkles } from 'lucide-react';

interface ProductGrowingGuideProps {
  product: ProductIntelligence;
}

export const ProductGrowingGuide: React.FC<ProductGrowingGuideProps> = ({ product }) => {
  const { growing } = product;

  // Determine category-specific labels
  const isFruit = product.category === 'Fruit';
  const isGrain = product.category === 'Grain';
  const isTreeNut = product.category === 'Dry Fruit';
  const isSpice = product.category === 'Spice';
  const isProcessed = product.isProcessed;

  const plantingMethodTitle = isFruit || isTreeNut 
    ? 'Orchard Establishment & Planting'
    : isGrain 
    ? 'Sowing & Field Preparation'
    : 'Planting & Sowing Protocol';

  const seedOrSaplingLabel = isFruit || isTreeNut
    ? 'Sapling / Graft Density'
    : isGrain || isSpice
    ? 'Seed Rate / Density'
    : 'Seed / Seedling Requirement';

  return (
    <div className="space-y-6">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-purple-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span>{isProcessed ? 'Processing & Production Intelligence' : 'Cultivation & Growing Guide'}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                {product.name} Specific
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              {isProcessed 
                ? `Extraction and value-addition protocols for ${product.name}`
                : `Agronomic protocols tailored for ${product.variety}`}
            </p>
          </div>
        </div>

        {/* Growth Progress Indicator */}
        <div className="bg-slate-900/90 border border-purple-500/30 rounded-xl px-4 py-2 flex items-center gap-3">
          <div className="text-right">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Maturity Progress</div>
            <div className="text-sm font-bold text-emerald-400 font-mono">{growing.currentMaturityStage}% Stage</div>
          </div>
          <div className="w-14 bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-sky-400 rounded-full"
              style={{ width: `${growing.currentMaturityStage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Interactive Yield & Quality Improvement Cards (Direct Answer to Prompt) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Card 1: How can I increase yield? */}
        <div className="rounded-3xl bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-500/40 p-5 shadow-lg space-y-3">
          <div className="flex items-center gap-2 text-emerald-400">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300/80 font-bold block">
                Farmer Advisory Question #1
              </span>
              <h4 className="text-sm font-bold text-white">How can I increase yield for {product.name}?</h4>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-200">
            {product.yieldImprovementTips && product.yieldImprovementTips.length > 0 ? (
              product.yieldImprovementTips.map((tip, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/20 flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold mt-0.5">✦</span>
                  <span className="leading-relaxed">{tip}</span>
                </div>
              ))
            ) : (
              <>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/20 flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold mt-0.5">✦</span>
                  <span className="leading-relaxed">Implement precision drip fertigation with balanced NPK + Zinc foliar nutrition at flower/pod initiation stage.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/20 flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold mt-0.5">✦</span>
                  <span className="leading-relaxed">Maintain optimum plant canopy spacing ({growing.spacing}) to maximize photosynthetic solar interception.</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Card 2: How can I improve product quality? */}
        <div className="rounded-3xl bg-gradient-to-br from-purple-950/60 to-slate-900 border border-purple-500/40 p-5 shadow-lg space-y-3">
          <div className="flex items-center gap-2 text-purple-400">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Award className="w-4 h-4 text-purple-300" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300/80 font-bold block">
                Farmer Advisory Question #2
              </span>
              <h4 className="text-sm font-bold text-white">How can I improve product quality & Grade-A price?</h4>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-200">
            {product.qualityImprovementTips && product.qualityImprovementTips.length > 0 ? (
              product.qualityImprovementTips.map((tip, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-purple-500/20 flex items-start gap-2.5">
                  <span className="text-purple-400 font-bold mt-0.5">★</span>
                  <span className="leading-relaxed">{tip}</span>
                </div>
              ))
            ) : (
              <>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-purple-500/20 flex items-start gap-2.5">
                  <span className="text-purple-400 font-bold mt-0.5">★</span>
                  <span className="leading-relaxed">Execute pre-cooling within 3 hours of harvest to remove field heat and preserve cellular turgidity.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-purple-500/20 flex items-start gap-2.5">
                  <span className="text-purple-400 font-bold mt-0.5">★</span>
                  <span className="leading-relaxed">Grade into uniform size/maturity classes and pack in cushioned ventilated containers to prevent transit scuffing.</span>
                </div>
              </>
            )}
          </div>
        </div>

      </div>

      {/* Derivative / Value-Addition Tree (if Processed or Raw with derivatives) */}
      {product.derivedProducts && product.derivedProducts.length > 0 && (
        <div className="rounded-3xl bg-slate-900 border border-amber-500/30 p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
              <Cog className="w-4 h-4" />
              <span>Value-Added Product Processing Pathways for {product.name}</span>
            </h4>
            <span className="text-[10px] text-amber-300 font-mono">Higher Farm Realization</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {product.derivedProducts.map((der) => (
              <div key={der.id} className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{der.icon}</span>
                  <div>
                    <h5 className="font-bold text-white">{der.name}</h5>
                    <span className="text-[10px] text-slate-400 font-mono">Yield: ~{der.yieldPercent}%</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  +35% Value
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4 Core Agronomic Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Climate */}
        <div className="glass-panel p-4 rounded-2xl border border-purple-500/20 space-y-2 bg-slate-900/80">
          <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <Sun className="w-4 h-4" />
            <span>Climate & Atmosphere</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-medium">
            {growing.climate}
          </p>
        </div>

        {/* Soil & pH */}
        <div className="glass-panel p-4 rounded-2xl border border-purple-500/20 space-y-2 bg-slate-900/80">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>Soil & Ideal pH</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-medium">
            {growing.soil}
          </p>
          <div className="text-[11px] font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-md inline-block">
            Target pH: {growing.idealSoilPh}
          </div>
        </div>

        {/* Temperature Range */}
        <div className="glass-panel p-4 rounded-2xl border border-purple-500/20 space-y-2 bg-slate-900/80">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
            <Thermometer className="w-4 h-4" />
            <span>Optimum Temperature</span>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">
            {growing.temperatureRange[0]}°C - {growing.temperatureRange[1]}°C
          </div>
          <p className="text-[11px] text-slate-400">
            Thermal threshold for maximum cellular yield.
          </p>
        </div>

        {/* Rainfall & Water */}
        <div className="glass-panel p-4 rounded-2xl border border-purple-500/20 space-y-2 bg-slate-900/80">
          <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Droplets className="w-4 h-4" />
            <span>Rainfall / Moisture</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-medium">
            {growing.rainfallRequirement}
          </p>
        </div>

      </div>

      {/* Planting / Sowing Parameters */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 bg-slate-900/90 space-y-4">
        <h4 className="text-sm font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2">
          <Sprout className="w-4 h-4" />
          <span>{plantingMethodTitle}</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Sowing / Planting Season</div>
            <div className="text-xs font-bold text-white mt-1">{growing.sowingSeason}</div>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase font-mono">{seedOrSaplingLabel}</div>
            <div className="text-xs font-bold text-emerald-400 mt-1 font-mono">{growing.seedRequirement}</div>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Recommended Spacing</div>
            <div className="text-xs font-bold text-sky-400 mt-1 font-mono">{growing.spacing}</div>
          </div>
        </div>

        {/* Method Description */}
        <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-slate-200 leading-relaxed">
          <strong className="text-purple-300">Methodology: </strong>
          {growing.sowingMethod}
        </div>

        {/* Irrigation Protocol */}
        <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/20 text-xs text-slate-200 leading-relaxed flex items-start gap-2.5">
          <Droplets className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-blue-300">Irrigation Scheduling: </strong>
            {growing.irrigation}
          </div>
        </div>
      </div>

      {/* Multi-Stage Fertilizer Guidance */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 bg-slate-900/90 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span>Fertilizer & Nutrition Schedule for {product.name}</span>
          </h4>
          <span className="text-[10px] text-slate-400 font-mono">Stage-Gated Nutrition</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {growing.fertilizerGuidance.map((stage, idx) => (
            <div 
              key={idx} 
              className="p-4 rounded-2xl bg-slate-950/70 border border-purple-500/20 flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                    {stage.stage}
                  </span>
                  <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase font-mono ${
                    stage.urgency === 'Immediate' 
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : stage.urgency === 'Scheduled'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {stage.urgency}
                  </span>
                </div>

                <p className="text-xs text-slate-200 mt-2 font-medium leading-relaxed">
                  {stage.recommendation}
                </p>
              </div>

              <div className="text-[11px] text-emerald-400 bg-emerald-950/40 p-2 rounded-lg border border-emerald-500/20">
                <strong>Impact:</strong> {stage.impact}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pests, Diseases & Critical Care Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Pests & Diseases */}
        <div className="glass-panel p-5 rounded-2xl border border-rose-500/20 bg-slate-900/90 space-y-3">
          <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
            <Bug className="w-4 h-4" />
            <span>Target Pests & Pathogen Threats</span>
          </h4>

          <div className="space-y-2">
            <div className="text-xs text-slate-300">
              <strong className="text-white">Common Pests:</strong>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {growing.commonPests.map((pest, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 text-[11px] border border-rose-500/20">
                    {pest}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-xs text-slate-300 pt-2 border-t border-slate-800">
              <strong className="text-white">Disease Risks:</strong>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {growing.diseaseRisks.map((dis, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 text-[11px] border border-amber-500/20">
                    {dis}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Critical Care Tips */}
        <div className="glass-panel p-5 rounded-2xl border border-emerald-500/20 bg-slate-900/90 space-y-3">
          <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Critical Agronomic Care Rules</span>
          </h4>

          <ul className="space-y-2">
            {growing.criticalCareTips.map((tip, i) => (
              <li key={i} className="text-xs text-slate-200 flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
};
