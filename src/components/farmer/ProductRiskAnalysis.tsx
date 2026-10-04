import React from 'react';
import { ProductIntelligence } from '../../types/product';
import { ShieldAlert, CloudRain, Flame, Snowflake, Waves, Truck, CheckCircle2 } from 'lucide-react';

interface ProductRiskAnalysisProps {
  product: ProductIntelligence;
}

export const ProductRiskAnalysis: React.FC<ProductRiskAnalysisProps> = ({ product }) => {
  const { risks } = product;

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
              <span>Environmental Risk Matrix & Spoilage Prevention</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono">
                {product.name}
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Microclimate vulnerability indices and active mitigation protocols
            </p>
          </div>
        </div>

        <div className="text-xs font-mono text-emerald-400 bg-slate-900/90 px-3.5 py-1.5 rounded-xl border border-emerald-500/30 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Active Risk Mitigation: <strong>Active</strong></span>
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

    </div>
  );
};
