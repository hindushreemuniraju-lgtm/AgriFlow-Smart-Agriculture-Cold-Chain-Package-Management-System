import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { QrCode, Search, Camera, CheckCircle2, ArrowRight, X, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QRScannerSimulatorProps {
  onScanBatch: (batchId: string) => void;
  activeBatchId: string;
}

const PRESET_BATCHES = [
  { batchId: 'AGF-8921', crop: 'Vine-Ripened Roma Tomatoes', category: 'Vegetable', origin: 'Dindori Valley, Nashik', icon: '🍅' },
  { batchId: 'AGF-4412', crop: 'Ratnagiri Alphonso Mangoes', category: 'Fruit', origin: 'Pawas Coast, Ratnagiri', icon: '🥭' },
  { batchId: 'AGF-7734', crop: 'Winter Dawn Strawberries', category: 'Fruit', origin: 'Bhilare Terraces, Mahabaleshwar', icon: '🍓' },
  { batchId: 'AGF-9021', crop: 'Dehradun Aged Basmati Rice', category: 'Grain', origin: 'Doon Valley Organic Belt', icon: '🌾' },
  { batchId: 'AGF-1145', crop: 'Kashmiri Organic Mamra Almonds', category: 'Dry Fruit', origin: 'Pulwama Orchard Terraces', icon: '🥜' },
  { batchId: 'AGF-2289', crop: 'Royal Himalayan Walnuts', category: 'Dry Fruit', origin: 'Kashmir Kagzi Orchards', icon: '🌰' },
  { batchId: 'AGF-3390', crop: 'Greenhouse Bell Peppers', category: 'Vegetable', origin: 'Sinnar Agro Polyhouse, Nashik', icon: '🫑' },
  { batchId: 'AGF-5501', crop: 'Thompson Seedless Grapes', category: 'Fruit', origin: 'Pimpalgaon Grape Valley', icon: '🍇' },
];

export const QRScannerSimulator: React.FC<QRScannerSimulatorProps> = ({ onScanBatch, activeBatchId }) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');
  const [scanningEffect, setScanningEffect] = useState<boolean>(false);

  const triggerScan = (batchIdOrName: string) => {
    setScanningEffect(true);
    setTimeout(() => {
      setScanningEffect(false);
      onScanBatch(batchIdOrName);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#38bdf8', '#10b981']
      });
    }, 500);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    triggerScan(searchQuery.trim());
  };

  const filteredPresets = PRESET_BATCHES.filter(p => {
    const matchesCat = activeCategoryFilter === 'All' || p.category === activeCategoryFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery = !q || 
      p.crop.toLowerCase().includes(q) || 
      p.batchId.toLowerCase().includes(q) ||
      p.origin.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-purple-500/30 space-y-6 shadow-[0_0_35px_rgba(168,85,247,0.15)]">
      
      {/* Search Header Banner for Customers */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
              <Search className="w-4 h-4" />
              <span>Universal Produce & Batch Search Engine</span>
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
              Search Any Grain, Fruit, Vegetable, Dry Fruit, or Batch Code
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {['All', 'Fruit', 'Vegetable', 'Grain', 'Dry Fruit'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategoryFilter(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                  activeCategoryFilter === cat
                    ? 'bg-purple-600 text-white shadow-md border border-purple-400'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {cat === 'All' ? 'All' : cat === 'Fruit' ? '🍎 Fruits' : cat === 'Vegetable' ? '🥦 Veggies' : cat === 'Grain' ? '🌾 Grains' : '🥜 Dry Fruits'}
              </button>
            ))}
          </div>
        </div>

        {/* Live Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-purple-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by produce name (Almonds, Basmati Rice, Walnuts, Mangoes, Strawberries, Cashews, Apples, Spinach) or QR Batch ID..."
              className="w-full bg-slate-900/90 border border-purple-500/30 rounded-2xl pl-12 pr-10 py-3 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-purple-400 font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold shadow-md transition-all whitespace-nowrap flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-sky-300" />
            <span>Search & Open Passport</span>
          </button>
        </form>
      </div>

      {/* Scanner Visual HUD and Presets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
        
        {/* Animated Camera / Scanner Simulation Box (Left) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950/80 border border-purple-500/25 relative overflow-hidden">
          
          {/* Laser scanning beam */}
          <div className="relative w-56 h-56 rounded-2xl border-2 border-dashed border-purple-400/40 flex items-center justify-center bg-slate-900/50 shadow-inner">
            {/* 4 Corner Markers */}
            <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-sky-400" />
            <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-sky-400" />
            <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-sky-400" />
            <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-sky-400" />

            {/* Glowing Laser Scan Bar */}
            <div 
              className={`absolute left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-purple-400 to-pink-400 shadow-[0_0_15px_rgba(56,189,248,0.9)] transition-all duration-700 pointer-events-none ${
                scanningEffect ? 'top-3/4 opacity-100' : 'top-1/4 opacity-60'
              }`}
              style={{
                animation: 'pulseGlow 2s infinite ease-in-out'
              }}
            />

            <div className="text-center space-y-2 z-10">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-600/20 border border-purple-400/30 flex items-center justify-center text-3xl text-purple-300">
                <QrCode className="w-9 h-9 animate-pulse" />
              </div>
              <div className="text-[11px] font-mono text-purple-200 font-bold uppercase tracking-wider">
                {scanningEffect ? 'Decoding Cryptographic Provenance...' : 'Align Package QR Tag or Search Above'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 mt-4">
            <Camera className="w-3.5 h-3.5 text-sky-400" />
            <span>Simulated Sensor Resolution: 4K HDR Tag Reader</span>
          </div>
        </div>

        {/* Quick-Scan Preset Batches Grid (Right) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
              {t.customer.quickScanPreset}
            </span>
            <span className="text-xs text-slate-400">
              {filteredPresets.length} Verified Batches Found
            </span>
          </div>

          {/* Preset Buttons Grid */}
          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {filteredPresets.length === 0 ? (
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
                <div className="text-2xl">🌱</div>
                <div className="text-xs font-bold text-white">No pre-set batch matching "{searchQuery}"</div>
                <p className="text-[11px] text-slate-400">
                  Hit <strong className="text-purple-300">"Search & Open Passport"</strong> to generate a verified passport for "{searchQuery}" on the fly!
                </p>
                <button
                  onClick={() => triggerScan(searchQuery)}
                  className="mt-2 px-4 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-bold shadow"
                >
                  Generate Passport for "{searchQuery}"
                </button>
              </div>
            ) : (
              filteredPresets.map((preset) => {
                const isActive = activeBatchId === preset.batchId || activeBatchId.toLowerCase() === preset.crop.toLowerCase();
                return (
                  <button
                    key={preset.batchId}
                    onClick={() => triggerScan(preset.batchId)}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl border text-left transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-950/70 to-indigo-950/70 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)] ring-1 ring-purple-400/50'
                        : 'bg-slate-900/60 border-purple-500/20 hover:border-purple-400/50 hover:bg-slate-850/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{preset.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-sky-300">{preset.batchId}</span>
                          <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                            {preset.category}
                          </span>
                          <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3" /> Verified
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-white mt-0.5">{preset.crop}</h4>
                        <p className="text-[11px] text-slate-400">{preset.origin}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-bold text-purple-300 group-hover:text-white">
                      <span>Inspect Passport</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
