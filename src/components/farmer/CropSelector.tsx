import React from 'react';
import { CropInfo } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, Check, ChevronRight } from 'lucide-react';

interface CropSelectorProps {
  crops: CropInfo[];
  selectedCrop: CropInfo;
  onSelectCrop: (crop: CropInfo) => void;
}

export const CropSelector: React.FC<CropSelectorProps> = ({ crops, selectedCrop, onSelectCrop }) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>{t.farmer.selectCrop}</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {crops.length} Catalog Presets
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Choose your current crop to trigger dynamic agronomic insights, ripening countdown, and packaging guidelines.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {crops.map((crop) => {
          const isSelected = crop.id === selectedCrop.id;
          return (
            <div
              key={crop.id}
              onClick={() => onSelectCrop(crop)}
              className={`group relative cursor-pointer p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-b from-purple-900/60 to-slate-900 border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.35)] ring-1 ring-purple-400/60 scale-[1.03]'
                  : 'bg-slate-900/70 border-purple-500/20 hover:border-purple-400/50 hover:bg-slate-850/80 hover:-translate-y-1'
              }`}
            >
              {/* Category pill */}
              <div className="flex items-center justify-between w-full mb-3">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {crop.category}
                </span>
                {isSelected && (
                  <span className="w-5 h-5 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs shadow-md">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}
              </div>

              {/* Crop Icon & Name */}
              <div className="text-center space-y-2 py-1">
                <div className="text-4xl sm:text-5xl transform group-hover:scale-110 transition-transform duration-300">
                  {crop.icon}
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                  {crop.name}
                </h3>
                <p className="text-[10px] text-slate-400 italic line-clamp-1 font-mono">
                  {crop.scientificName}
                </p>
              </div>

              {/* Maturity & Price stats */}
              <div className="mt-3 pt-2.5 border-t border-purple-500/20 text-center space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Maturity:</span>
                  <span className="font-bold text-sky-400 font-mono">{crop.currentMaturityStage}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-sky-400 h-full rounded-full"
                    style={{ width: `${crop.currentMaturityStage}%` }}
                  />
                </div>
                <div className="text-[10px] text-emerald-400 font-bold font-mono text-right">
                  ₹{crop.basePricePerKg}/kg
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
