import React, { useState } from 'react';
import { EnrichedProductIntelligence } from '../../services/crop/cropKnowledgeService';
import { getVerifiedCropVisual } from '../../services/crop/cropImageService';
import { Sparkles, MapPin, TrendingUp, ShieldCheck, Award, RefreshCw, BarChart2, CheckCircle2 } from 'lucide-react';

interface ProductHeroBannerProps {
  product: EnrichedProductIntelligence;
  onOpenSmartPlan: () => void;
}

export const ProductHeroBanner: React.FC<ProductHeroBannerProps> = ({ product, onOpenSmartPlan }) => {
  const [selectedCity, setSelectedCity] = useState<keyof typeof product.market.regionalPrices>('Bengaluru');
  const visual = getVerifiedCropVisual(product.id, product.name);

  const currentRegionalPrice = product.market?.regionalPrices?.[selectedCity] ?? product.market?.basePricePerKg ?? 30;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/30 p-6 sm:p-8 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
      
      {/* Glow aura */}
      <div 
        className="absolute -right-16 -top-16 w-80 h-80 rounded-full blur-3xl opacity-25 pointer-events-none"
        style={{ background: visual.accentColor }}
      />
      <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full blur-3xl opacity-20 bg-purple-600 pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Left: Product Visual + Identity */}
        <div className="flex items-start sm:items-center gap-5 sm:gap-6">
          
          {/* Verified Product Badge with Alt Tag */}
          <div 
            className="relative flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-3xl p-1 shadow-2xl flex items-center justify-center border transition-transform duration-500 hover:scale-105"
            style={{ 
              background: `linear-gradient(135deg, ${visual.gradient[0]}, ${visual.gradient[1]})`,
              borderColor: visual.accentColor
            }}
            title={visual.altText}
          >
            <div className="w-full h-full rounded-[22px] bg-slate-950/40 backdrop-blur-sm flex flex-col items-center justify-center p-2">
              <span className="text-4xl sm:text-5xl drop-shadow-md select-none">
                {visual.emoji}
              </span>
              <span className="text-[10px] font-bold text-white/90 tracking-wide mt-1 uppercase text-center line-clamp-1">
                {product.name}
              </span>
            </div>

            {/* Live verified active indicator */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-900"></span>
            </span>
          </div>

          {/* Product Titles & Tags */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {product.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-300 border border-sky-500/20">
                {product.subcategory}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                {visual.verificationStatus === 'verified' ? 'Verified Botanical Match' : 'Identified Produce'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>{product.name}</span>
              <span className="text-sm sm:text-base font-normal text-purple-300/80">
                ({product.variety})
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {product.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono pt-0.5">
              <span>Scientific: <strong className="text-white italic">{product.scientificName}</strong></span>
              <span>•</span>
              <span>Growth Cycle: <strong className="text-purple-300">{product.growing.growthDuration}</strong></span>
              <span>•</span>
              <span className="text-[10px] text-slate-500 truncate max-w-[200px]">Src: {product.knowledgeMeta?.source || visual.source}</span>
            </div>
          </div>
        </div>

        {/* Right: Price Matrix & Generate Smart Plan CTA */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-4">
          
          {/* APMC Regional Price Widget */}
          <div className="bg-slate-950/80 border border-purple-500/30 rounded-2xl p-4 min-w-[260px] shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 font-semibold text-purple-300">
                <BarChart2 className="w-3.5 h-3.5 text-purple-400" />
                APMC Benchmark Price
              </span>
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <TrendingUp className="w-3 h-3" />
                {product.market.priceTrend}
              </span>
            </div>

            <div className="flex items-baseline justify-between gap-2">
              <div className="text-3xl font-extrabold text-emerald-400 font-mono">
                ₹{currentRegionalPrice.toFixed(2)}
                <span className="text-xs font-normal text-slate-400 ml-1">/{product.market.priceUnit.replace('₹/', '')}</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">
                {product.market.priceStatus}
              </span>
            </div>

            {/* City selector pills */}
            <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between gap-1">
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-sky-400" />
                Mandi:
              </span>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value as any)}
                className="bg-slate-900 border border-purple-500/30 text-white text-[11px] rounded-lg px-2 py-1 outline-none focus:border-purple-400 font-mono cursor-pointer"
              >
                {Object.keys(product.market.regionalPrices).map((city) => (
                  <option key={city} value={city}>
                    {city} Mandi (₹{product.market.regionalPrices[city as keyof typeof product.market.regionalPrices]}/kg)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* GENERATE UNIVERSAL SMART PLAN Button */}
          <button
            onClick={onOpenSmartPlan}
            className="group relative flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-500 hover:from-purple-500 hover:to-sky-400 text-white font-extrabold text-sm shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-300 transform hover:scale-105 active:scale-95 border border-purple-300/40 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
            <span>GENERATE SMART PLAN</span>
            <span className="px-1.5 py-0.5 rounded-md bg-white/20 text-[10px] uppercase font-mono tracking-wider">
              Decision AI
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};
