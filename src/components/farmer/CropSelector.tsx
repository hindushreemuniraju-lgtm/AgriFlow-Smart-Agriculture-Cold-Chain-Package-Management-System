import React, { useState, useMemo } from 'react';
import { CropInfo } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { Search, Sparkles, Check, X, PlusCircle, Filter } from 'lucide-react';
import { generateDynamicCrop } from '../../data/cropsFallback';
import confetti from 'canvas-confetti';

interface CropSelectorProps {
  crops: CropInfo[];
  selectedCrop: CropInfo;
  onSelectCrop: (crop: CropInfo) => void;
}

export const CropSelector: React.FC<CropSelectorProps> = ({ crops, selectedCrop, onSelectCrop }) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [customCropsList, setCustomCropsList] = useState<CropInfo[]>([]);

  // Combined crops catalog including custom-added ones
  const allAvailableCrops = useMemo(() => {
    const map = new Map<string, CropInfo>();
    crops.forEach(c => map.set(c.id, c));
    customCropsList.forEach(c => map.set(c.id, c));
    return Array.from(map.values());
  }, [crops, customCropsList]);

  // Filtered by search and category
  const filteredCrops = useMemo(() => {
    return allAvailableCrops.filter(crop => {
      const matchesCategory = selectedCategory === 'All' || 
        (selectedCategory === 'Fruit' && crop.category === 'Fruit') ||
        (selectedCategory === 'Vegetable' && (crop.category === 'Vegetable' || crop.category === 'Greens')) ||
        (selectedCategory === 'Grain' && crop.category === 'Grain') ||
        (selectedCategory === 'Dry Fruit' && crop.category === 'Dry Fruit');

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        crop.name.toLowerCase().includes(q) ||
        crop.scientificName.toLowerCase().includes(q) ||
        crop.variety.toLowerCase().includes(q) ||
        crop.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [allAvailableCrops, selectedCategory, searchQuery]);

  const handleCreateCustomCrop = () => {
    if (!searchQuery.trim()) return;
    const cat = selectedCategory !== 'All' ? selectedCategory as any : undefined;
    const newCrop = generateDynamicCrop(searchQuery, cat);
    setCustomCropsList(prev => [newCrop, ...prev]);
    onSelectCrop(newCrop);
    setSearchQuery('');
    
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#a855f7', '#38bdf8', '#10b981', '#f59e0b']
    });
  };

  const categories = [
    { id: 'All', label: 'All Catalog', icon: '🌱' },
    { id: 'Fruit', label: 'Fruits', icon: '🍎' },
    { id: 'Vegetable', label: 'Vegetables & Greens', icon: '🥦' },
    { id: 'Grain', label: 'Grains & Millets', icon: '🌾' },
    { id: 'Dry Fruit', label: 'Dry Fruits & Nuts', icon: '🥜' }
  ];

  return (
    <div className="space-y-6">
      {/* Title & Tagline */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>{t.farmer.selectCrop}</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {allAvailableCrops.length} Produce Varieties
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Search or select any fruit, vegetable, grain, or dry fruit to generate live agronomic telemetry, ripening timelines, and smart packaging architecture.
          </p>
        </div>

        <div className="text-xs font-mono text-purple-300 bg-slate-900/90 px-3.5 py-1.5 rounded-2xl border border-purple-500/30 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Active: <strong className="text-white">{selectedCrop.name}</strong></span>
        </div>
      </div>

      {/* Universal Search Bar & Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-5 h-5 text-purple-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search any crop, grain (Basmati, Wheat, Ragi), fruit (Mango, Apple, Grapes), vegetable (Tomato, Peppers), or dry fruit (Almonds, Walnuts, Cashews, Pista)..."
            className="w-full bg-slate-900/90 border border-purple-500/30 rounded-2xl pl-12 pr-10 py-3 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-purple-400 shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md border border-purple-400/50 scale-105'
                    : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:border-purple-500/30 hover:text-slate-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Crop Creation Prompt if search yields few/no results */}
      {searchQuery.trim().length > 1 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/50 via-slate-900 to-sky-950/40 border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-scale-in">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center text-lg">
              ✨
            </div>
            <div>
              <div className="text-xs font-bold text-white">
                Looking for <span className="text-sky-300 font-mono">"{searchQuery}"</span>?
              </div>
              <p className="text-[11px] text-slate-400">
                Instantly compute smart agronomy, optimal harvesting, and cold-chain packaging specs for this produce.
              </p>
            </div>
          </div>

          <button
            onClick={handleCreateCustomCrop}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-sky-500 hover:from-purple-500 hover:to-sky-400 text-white text-xs font-bold shadow-md transition-all whitespace-nowrap"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Generate & Analyze "{searchQuery}"</span>
          </button>
        </div>
      )}

      {/* Crops Grid */}
      {filteredCrops.length === 0 ? (
        <div className="text-center py-8 space-y-3">
          <div className="text-4xl">🔍</div>
          <div className="text-sm font-bold text-white">No exact match found in pre-loaded catalog for "{searchQuery}"</div>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Click the <strong className="text-purple-300">"Generate & Analyze"</strong> button above to have AgriFlow's AI engine generate custom agronomy and packaging specs for <span className="text-sky-300">"{searchQuery}"</span>!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {filteredCrops.map((crop) => {
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
                <div className="text-center space-y-1.5 py-1">
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
      )}
    </div>
  );
};
