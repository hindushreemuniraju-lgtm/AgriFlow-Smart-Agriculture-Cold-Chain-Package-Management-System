import React from 'react';
import { ProductIntelligence } from '../../types/product';
import { 
  ShieldAlert, 
  CloudRain, 
  Flame, 
  Snowflake, 
  Waves, 
  Truck, 
  CheckCircle2, 
  Thermometer, 
  Droplets, 
  Warehouse, 
  Clock, 
  AlertTriangle,
  Layers
} from 'lucide-react';
import { PMFBYGuidanceCard } from './PMFBYGuidanceCard';

interface ProductRiskAnalysisProps {
  product: ProductIntelligence;
}

export const ProductRiskAnalysis: React.FC<ProductRiskAnalysisProps> = ({ product }) => {
  const { risks, storage, packaging } = product;

  const riskCards = [
    {
      title: 'High Humidity Threat',
      icon: <Waves className="w-5 h-5 text-sky-400" />,
      content: risks.highHumidityRisk,
      color: 'border-sky-500/30 bg-sky-950/20 text-sky-300'
    },
    {
      title: 'High Temperature Spike',
      icon: <Flame className="w-5 h-5 text-rose-400" />,
      content: risks.highTempRisk,
      color: 'border-rose-500/30 bg-rose-950/20 text-rose-300'
    },
    {
      title: 'Frost / Cold Shock',
      icon: <Snowflake className="w-5 h-5 text-indigo-400" />,
      content: risks.frostRisk,
      color: 'border-indigo-500/30 bg-indigo-950/20 text-indigo-300'
    },
    {
      title: 'Excess Rainfall & Waterlogging',
      icon: <CloudRain className="w-5 h-5 text-blue-400" />,
      content: risks.excessRainRisk,
      color: 'border-blue-500/30 bg-blue-950/20 text-blue-300'
    },
    {
      title: 'Transit Vibration & Drop Shock',
      icon: <Truck className="w-5 h-5 text-amber-400" />,
      content: risks.transitShockRisk,
      color: 'border-amber-500/30 bg-amber-950/20 text-amber-300'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-purple-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span>Storage Intelligence & Spoilage Prevention</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono">
                {product.name}
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Product-specific microclimate thresholds, storage protocols, and active mitigation
            </p>
          </div>
        </div>

        <div className="text-xs font-mono text-emerald-400 bg-slate-900/90 px-3.5 py-1.5 rounded-xl border border-emerald-500/30 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Cold-Chain Protection: <strong>{storage.coldStorageRequired ? 'Mandatory' : 'Ambient Safe'}</strong></span>
        </div>
      </div>

      {/* Product-Specific Storage Protocol Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Storage Temperature */}
        <div className="glass-panel p-4 rounded-2xl border border-purple-500/20 bg-slate-900/80 space-y-1.5">
          <div className="flex items-center gap-1.5 text-rose-400 text-[10px] font-mono uppercase">
            <Thermometer className="w-3.5 h-3.5" />
            Storage Temperature
          </div>
          <div className="text-xs sm:text-sm font-bold text-white leading-snug">
            {storage.storageTemperature}
          </div>
          <div className="text-[10px] text-purple-300">
            {storage.coldStorageRequired ? '❄️ Active Refrigeration' : '🌡️ Dry Ambient'}
          </div>
        </div>

        {/* Humidity Requirement */}
        <div className="glass-panel p-4 rounded-2xl border border-purple-500/20 bg-slate-900/80 space-y-1.5">
          <div className="flex items-center gap-1.5 text-sky-400 text-[10px] font-mono uppercase">
            <Droplets className="w-3.5 h-3.5" />
            Relative Humidity
          </div>
          <div className="text-xs sm:text-sm font-bold text-white leading-snug">
            {storage.humidity}
          </div>
          <div className="text-[10px] text-slate-400">
            Target Vapor Pressure Deficit
          </div>
        </div>

        {/* Storage Method & Type */}
        <div className="glass-panel p-4 rounded-2xl border border-purple-500/20 bg-slate-900/80 space-y-1.5">
          <div className="flex items-center gap-1.5 text-amber-400 text-[10px] font-mono uppercase">
            <Warehouse className="w-3.5 h-3.5" />
            Storage Method
          </div>
          <div className="text-xs sm:text-sm font-bold text-white leading-snug">
            {storage.storageMethod}
          </div>
          <div className="text-[10px] text-slate-400 font-mono truncate">
            Pack: {packaging.primaryPackaging}
          </div>
        </div>

        {/* Estimated Shelf Life */}
        <div className="glass-panel p-4 rounded-2xl border border-purple-500/20 bg-slate-900/80 space-y-1.5">
          <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-mono uppercase">
            <Clock className="w-3.5 h-3.5" />
            Estimated Shelf Life
          </div>
          <div className="text-xs sm:text-sm font-bold text-emerald-300 leading-snug font-mono">
            Cold: {storage.shelfLifeCold}
          </div>
          <div className="text-[10px] text-slate-400">
            Ambient: {storage.shelfLifeAmbient}
          </div>
        </div>

      </div>

      {/* Curing & Spoilage Indicators Warning Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Preservation & Curing Instructions */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-purple-500/30 space-y-2">
          <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            Preservation Protocols & Curing
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-200">
            {storage.preservationSteps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-purple-400 font-bold">•</span>
                <span>{step}</span>
              </li>
            ))}
            {storage.curingRequired && storage.curingInstructions && (
              <li className="mt-2 p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-200 font-medium text-[11px]">
                <b>Curing Protocol:</b> {storage.curingInstructions}
              </li>
            )}
          </ul>
        </div>

        {/* Spoilage Indicators */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-rose-500/30 space-y-2">
          <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            Critical Spoilage Indicators
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-200">
            {storage.spoilageIndicators.map((ind, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">⚠️</span>
                <span>{ind}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* 5-Threat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {riskCards.map((rc, idx) => (
          <div 
            key={idx}
            className={`p-4 rounded-2xl border ${rc.color} space-y-2 flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center gap-2">
                {rc.icon}
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  {rc.title}
                </h4>
              </div>
              <p className="text-xs text-slate-200 mt-2 font-medium leading-relaxed">
                {rc.content}
              </p>
            </div>
            <div className="text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-800">
              Threat Vector {idx + 1}
            </div>
          </div>
        ))}

        {/* Master Mitigation Protocol Card */}
        <div className="p-4 rounded-2xl border border-emerald-500/40 bg-emerald-950/40 space-y-2 flex flex-col justify-between lg:col-span-1">
          <div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                Integrated Mitigation Action
              </h4>
            </div>
            <p className="text-xs text-slate-100 mt-2 font-semibold leading-relaxed">
              {risks.mitigationStrategy}
            </p>
          </div>
          <div className="text-[10px] text-emerald-400 font-mono pt-2 border-t border-emerald-500/30">
            100% Zero-Leak Protocol
          </div>
        </div>
      </div>

      {/* Official Government of India PMFBY Crop Insurance & Post-Harvest Risk Protection */}
      <PMFBYGuidanceCard cropName={product.name} />

    </div>
  );
};
