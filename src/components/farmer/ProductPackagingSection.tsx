import React from 'react';
import { ProductIntelligence } from '../../types/product';
import { Box, Layers, ShieldCheck, Wind, Droplets, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

interface ProductPackagingSectionProps {
  product: ProductIntelligence;
  onOpenTransportOrder?: () => void;
}

export const ProductPackagingSection: React.FC<ProductPackagingSectionProps> = ({ 
  product, 
  onOpenTransportOrder 
}) => {
  const { packaging, storage } = product;

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
              <span>Smart Packaging Architecture</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono">
                {product.name} Custom
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Zero-damage packaging matrix engineered for {product.name} transit & shelf-stability
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
            <div className="text-xs font-bold text-emerald-400 font-mono">100% Certified</div>
          </div>
        </div>
      </div>

      {/* Primary & Secondary Material Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Primary Packaging */}
        <div className="glass-panel p-4 rounded-2xl border border-purple-500/20 bg-slate-900/80 space-y-1.5">
          <div className="text-[10px] text-slate-400 uppercase font-mono flex items-center gap-1.5 text-purple-300">
            <Box className="w-3.5 h-3.5" />
            Primary Packaging
          </div>
          <div className="text-xs sm:text-sm font-bold text-white leading-snug">
            {packaging.primaryPackaging}
          </div>
          <div className="text-[11px] text-emerald-400 font-mono">
            Est. Cost: ₹{packaging.estimatedPackagingCostPerKg.toFixed(2)}/kg
          </div>
        </div>

        {/* Secondary Packaging */}
        <div className="glass-panel p-4 rounded-2xl border border-purple-500/20 bg-slate-900/80 space-y-1.5">
          <div className="text-[10px] text-slate-400 uppercase font-mono flex items-center gap-1.5 text-sky-400">
            <Layers className="w-3.5 h-3.5" />
            Secondary / Bulk Containment
          </div>
          <div className="text-xs sm:text-sm font-bold text-white leading-snug">
            {packaging.secondaryPackaging}
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Capacity: {packaging.packagingCapacity}
          </div>
        </div>

        {/* Cold / Storage Requirement */}
        <div className="glass-panel p-4 rounded-2xl border border-purple-500/20 bg-slate-900/80 space-y-1.5">
          <div className="text-[10px] text-slate-400 uppercase font-mono flex items-center gap-1.5 text-amber-400">
            <Wind className="w-3.5 h-3.5" />
            Storage Environment
          </div>
          <div className="text-xs sm:text-sm font-bold text-amber-300 font-mono leading-snug">
            {storage.storageTemperature}
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Humidity: {storage.humidity}
          </div>
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

      {/* Atmospheric & Ethylene Management */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Ventilation & Moisture */}
        <div className="glass-panel p-5 rounded-2xl border border-sky-500/20 bg-slate-900/90 space-y-3">
          <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
            <Wind className="w-4 h-4" />
            <span>Ventilation & Moisture Dynamics</span>
          </h4>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <strong className="text-slate-300">Ventilation Directive:</strong>
              <p className="text-slate-200 mt-1">{packaging.ventilationSpec}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <strong className="text-slate-300">Moisture & Humidity Barrier:</strong>
              <p className="text-slate-200 mt-1">{packaging.moistureProtection}</p>
            </div>
          </div>
        </div>

        {/* Ethylene & Cushioning */}
        <div className="glass-panel p-5 rounded-2xl border border-amber-500/20 bg-slate-900/90 space-y-3">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <Droplets className="w-4 h-4" />
            <span>Ethylene & Cushioning Specs</span>
          </h4>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center justify-between">
                <strong className="text-slate-300">Ethylene Sensitivity:</strong>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                  packaging.ethyleneSensitivity === 'High' 
                    ? 'bg-rose-500/20 text-rose-300' 
                    : packaging.ethyleneSensitivity === 'Medium'
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'bg-emerald-500/20 text-emerald-300'
                }`}>
                  {packaging.ethyleneSensitivity} Sensitivity
                </span>
              </div>
              <p className="text-slate-200 mt-1">{packaging.ethyleneControl}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <strong className="text-slate-300">Vibration Cushioning:</strong>
              <p className="text-slate-200 mt-1">{packaging.cushioningSpecs}</p>
            </div>
          </div>
        </div>

      </div>

      {/* Step-by-Step Packing Guide */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 bg-slate-900/90 space-y-4">
        <h4 className="text-sm font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>Standard Operating Packing Procedure for {product.name}</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {packaging.packingSteps.map((step) => (
            <div 
              key={step.step}
              className="p-4 rounded-2xl bg-slate-950/60 border border-purple-500/20 space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center font-mono">
                    {step.step}
                  </span>
                  <h5 className="text-xs font-bold text-white">
                    {step.title}
                  </h5>
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {step.description}
                </p>
              </div>
              <div className="text-[10px] text-slate-500 font-mono pt-2 border-t border-slate-800">
                Phase {step.step} Checklist
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
