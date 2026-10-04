import React, { useMemo } from 'react';
import { ProductIntelligence } from '../../types/product';
import { generatePackagingRecommendation } from '../../services/packaging/packagingRecommendationEngine';
import { 
  Box, 
  Layers, 
  ShieldCheck, 
  Wind, 
  Droplets, 
  Sparkles, 
  CheckCircle, 
  ArrowRight, 
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Scale
} from 'lucide-react';

interface ProductPackagingSectionProps {
  product: ProductIntelligence;
  onOpenTransportOrder?: () => void;
}

export const ProductPackagingSection: React.FC<ProductPackagingSectionProps> = ({ 
  product, 
  onOpenTransportOrder 
}) => {
  const { packaging, storage } = product;

  // Run SIH26236 recommendation engine for this product
  const packReport = useMemo(() => {
    return generatePackagingRecommendation({
      product,
      quantityKg: 500,
      targetShelfLifeDays: 14,
      storageTempC: 13,
      humidityPercent: 85,
      distanceKm: 250,
      estimatedTravelHours: 6,
      vehicleType: 'Ventilated LCV',
      budgetPreference: 'balanced',
      sustainabilityPreference: 'standard'
    });
  }, [product]);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-purple-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Box className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span>SIH26236 Smart Packaging Intelligence</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono">
                {product.name} Engineered
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              ASTM D3985 OTR / ASTM F1249 WVTR & gas exchange barrier engine for {product.name}
            </p>
          </div>
        </div>

        {/* Shock & Eco badge */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-900/90 border border-purple-500/30 rounded-xl px-3.5 py-1.5 text-right">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Shock Rating</div>
            <div className="text-xs font-bold text-sky-400 font-mono">★ {packaging.shockRating} / 5.0</div>
          </div>
          <div className="bg-slate-900/90 border border-purple-500/30 rounded-xl px-3.5 py-1.5 text-right">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Eco Score</div>
            <div className="text-xs font-bold text-emerald-400 font-mono">{packReport.recommended.ecoScore}/100</div>
          </div>
        </div>
      </div>

      {/* Top 4-Tier Decision Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* 🥇 Recommended */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border-2 border-emerald-500/50 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-lg">🥇</span>
              <span className="text-[9px] font-black uppercase text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded">
                Recommended ({packReport.recommended.score}/100)
              </span>
            </div>
            <h4 className="text-xs font-bold text-white mb-1">{packReport.recommended.material.name}</h4>
            <p className="text-[11px] text-slate-300 leading-snug line-clamp-3 mb-2">
              {packReport.recommended.scientificRationale}
            </p>
          </div>
          <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-emerald-400 font-bold">
            ₹{packReport.recommended.costPerKg.toFixed(2)} / kg
          </div>
        </div>

        {/* 🥈 Alternative */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-indigo-500/30 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-lg">🥈</span>
              <span className="text-[9px] font-black uppercase text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded">
                Alternative ({packReport.alternative.score}/100)
              </span>
            </div>
            <h4 className="text-xs font-bold text-white mb-1">{packReport.alternative.material.name}</h4>
            <p className="text-[11px] text-slate-400 leading-snug line-clamp-3 mb-2">
              {packReport.alternative.scientificRationale}
            </p>
          </div>
          <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-indigo-300 font-bold">
            ₹{packReport.alternative.costPerKg.toFixed(2)} / kg
          </div>
        </div>

        {/* 💰 Budget */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/30 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-lg">💰</span>
              <span className="text-[9px] font-black uppercase text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded">
                Budget ({packReport.budget.score}/100)
              </span>
            </div>
            <h4 className="text-xs font-bold text-white mb-1">{packReport.budget.material.name}</h4>
            <p className="text-[11px] text-slate-400 leading-snug line-clamp-3 mb-2">
              {packReport.budget.scientificRationale}
            </p>
          </div>
          <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-amber-400 font-bold">
            ₹{packReport.budget.costPerKg.toFixed(2)} / kg
          </div>
        </div>

        {/* ❌ Not Recommended */}
        <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/40 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-lg">❌</span>
              <span className="text-[9px] font-black uppercase text-rose-300 bg-rose-500/20 px-2 py-0.5 rounded">
                Not Recommended
              </span>
            </div>
            <h4 className="text-xs font-bold text-white mb-1">{packReport.notRecommended.material.name}</h4>
            <p className="text-[11px] text-rose-200 leading-snug line-clamp-3 mb-2">
              {packReport.notRecommended.scientificRationale}
            </p>
          </div>
          <div className="pt-2 border-t border-rose-900/50 text-[10px] text-rose-300 font-bold flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Incompatible
          </div>
        </div>

      </div>

      {/* OTR & WVTR Barrier Capability Matrix */}
      <div className="glass-panel p-5 rounded-3xl border border-purple-500/30 bg-slate-900/90 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span>Product Barrier Requirements vs Material Capability</span>
          </h4>
          <span className="text-[10px] text-slate-400 font-mono">ASTM Standards</span>
        </div>

        <div className="space-y-2">
          {packReport.recommended.barrierMatches.map((match, i) => (
            <div key={i} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3 text-xs">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <strong className="text-white">{match.property}:</strong>
                  <span className="text-slate-400">{match.productDemand}</span>
                </div>
                <p className="text-[11px] text-purple-300 mt-0.5 font-mono">{match.materialCapability} • {match.explanation}</p>
              </div>
              <span 
                className="px-2 py-0.5 rounded text-[10px] font-bold shrink-0"
                style={{ backgroundColor: `${match.statusColor}20`, color: match.statusColor }}
              >
                {match.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3D-Style Layer Stack Breakdown */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 bg-slate-900/90 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span>Layer-by-Layer Protection Architecture</span>
          </h4>
          <span className="text-[10px] text-slate-400 font-mono">{packaging.layers.length} Active Barriers</span>
        </div>

        <div className="space-y-3">
          {packaging.layers.map((layer) => (
            <div 
              key={layer.layer}
              className="p-4 rounded-2xl bg-slate-950/70 border transition-all duration-300 hover:scale-[1.01] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              style={{ borderColor: `${layer.glowColor}40` }}
            >
              <div className="flex items-start sm:items-center gap-3.5">
                <div 
                  className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl shadow-lg flex-shrink-0"
                  style={{ background: `${layer.glowColor}25`, border: `1px solid ${layer.glowColor}50` }}
                >
                  {layer.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      Layer {layer.layer}
                    </span>
                    <h5 className="text-xs sm:text-sm font-bold text-white">
                      {layer.name}
                    </h5>
                  </div>
                  <div className="text-xs text-purple-300/90 font-medium mt-0.5">
                    Material: <strong className="text-white font-mono">{layer.material}</strong>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {layer.function}
                  </p>
                </div>
              </div>

              <div className="flex-shrink-0 text-right">
                <span 
                  className="text-[10px] px-2.5 py-1 rounded-lg font-mono font-bold"
                  style={{ background: `${layer.glowColor}15`, color: layer.glowColor, border: `1px solid ${layer.glowColor}30` }}
                >
                  Verified Barrier
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
