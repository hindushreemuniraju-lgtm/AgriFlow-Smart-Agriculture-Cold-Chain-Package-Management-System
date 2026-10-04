import React, { useState, useRef } from 'react';
import { Search, Camera, Sparkles, X, Check, AlertCircle, RefreshCw, Layers, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import { searchUniversalCrop, searchCropByImage } from '../../services/crop/cropSearchService';
import { IdentificationResult } from '../../services/crop/cropIdentificationService';
import { EnrichedProductIntelligence } from '../../services/crop/cropKnowledgeService';
import confetti from 'canvas-confetti';

interface CropIdentificationBarProps {
  onSelectCrop: (crop: EnrichedProductIntelligence) => void;
  activeCropName: string;
}

export const CropIdentificationBar: React.FC<CropIdentificationBarProps> = ({
  onSelectCrop,
  activeCropName
}) => {
  const [query, setQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [didYouMean, setDidYouMean] = useState<{ name: string; canonicalId: string; confidence: number }[]>([]);
  const [imageModalResult, setImageModalResult] = useState<{ result: IdentificationResult; product: EnrichedProductIntelligence } | null>(null);
  const [isAnalyzingImage, setIsAnalyzingImage] = useState<boolean>(false);
  const [manualSelectionOpen, setManualSelectionOpen] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    setIsSearching(true);
    try {
      const res = await searchUniversalCrop(searchTerm);
      onSelectCrop(res.product);
      setDidYouMean(res.didYouMean);
      if (res.identification.confidence >= 0.85) {
        setQuery('');
      }
    } finally {
      setIsSearching(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzingImage(true);
    try {
      const res = await searchCropByImage(file);
      setImageModalResult({
        result: res.identification,
        product: res.product
      });
    } finally {
      setIsAnalyzingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const confirmProductSelection = (canonicalId: string) => {
    searchUniversalCrop(canonicalId).then((res) => {
      onSelectCrop(res.product);
      setImageModalResult(null);
      setManualSelectionOpen(false);
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    });
  };

  return (
    <div className="space-y-3">
      
      {/* Search & Action Input Bar */}
      <div className="relative flex items-center">
        <Search className="w-5 h-5 text-purple-400 absolute left-4 pointer-events-none" />
        
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value.length > 2) {
              handleSearch(e.target.value);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch(query);
          }}
          placeholder="Search crop, regional alias (Okra, Bhindi, Brinjal, Baingan, Aloo, Ghee, Milk), or commodity..."
          className="w-full bg-slate-900/90 border border-purple-500/30 rounded-2xl pl-12 pr-32 py-3.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-purple-400 shadow-inner backdrop-blur-md"
        />

        {/* Right Action Icons */}
        <div className="absolute right-3 flex items-center gap-1.5">
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/png, image/jpeg, image/jpg, image/webp"
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isAnalyzingImage}
            title="Upload Crop / Plant Photograph for AI Multimodal Analysis"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/30 text-purple-200 text-xs font-semibold transition-all cursor-pointer shadow-sm"
          >
            {isAnalyzingImage ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-sky-400" />
            ) : (
              <Camera className="w-3.5 h-3.5 text-sky-400" />
            )}
            <span className="hidden sm:inline">
              {isAnalyzingImage ? 'Analyzing...' : 'Gemini AI Vision'}
            </span>
          </button>
        </div>
      </div>

      {/* Did You Mean Suggestions */}
      {didYouMean.length > 0 && query && (
        <div className="flex flex-wrap items-center gap-2 text-xs animate-fade-in">
          <span className="text-slate-400 flex items-center gap-1 font-mono text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            Did you mean:
          </span>
          {didYouMean.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                handleSearch(item.name);
                setQuery(item.name);
                setDidYouMean([]);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-purple-900/60 border border-purple-500/20 text-purple-300 font-medium transition-colors cursor-pointer"
            >
              {item.name} <span className="text-[10px] text-slate-500 font-mono">({Math.round(item.confidence * 100)}%)</span>
            </button>
          ))}
        </div>
      )}

      {/* ChatGPT-Style Conversational AI Vision Review Card Modal */}
      {imageModalResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-purple-500/40 p-6 shadow-2xl space-y-5 text-left">
            
            <button
              onClick={() => setImageModalResult(null)}
              className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header with Badges */}
            <div className="flex items-center justify-between pr-8">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center text-2xl border border-purple-500/30">
                  {imageModalResult.result.isNonFoodOrBlurry ? '⚠️' : '🧠'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300 font-bold">
                      AI Product Identification
                    </span>
                    {imageModalResult.result.isRealAi ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                        🧠 Gemini Vision AI
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-500/30">
                        📊 Model Estimate
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-white">
                    Visual Recognition Review
                  </h3>
                </div>
              </div>
            </div>

            {/* Blurry / Non-Food Rejection Card */}
            {imageModalResult.result.isNonFoodOrBlurry ? (
              <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 space-y-3">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-rose-200">Unclear or Non-Agricultural Image</h4>
                    <p className="text-xs text-rose-300/80 mt-1 leading-relaxed">
                      {imageModalResult.result.rejectionReason || "I can't confidently identify this product from the image. Please upload a clearer photograph or select a product manually."}
                    </p>
                  </div>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => setManualSelectionOpen(true)}
                    className="w-full py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-200 text-xs font-bold transition-colors cursor-pointer text-center"
                  >
                    Select Product Manually
                  </button>
                </div>
              </div>
            ) : (
              /* Conversational Identification Card */
              <div className="space-y-4">
                
                {/* ChatGPT-like Statement */}
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-purple-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-200">
                      I think this is <strong className="text-purple-300 text-base font-extrabold">{imageModalResult.result.name}</strong>
                    </p>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${
                      imageModalResult.result.confidenceLabel === 'HIGH' 
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : imageModalResult.result.confidenceLabel === 'MEDIUM'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                    }`}>
                      Confidence: {imageModalResult.result.confidenceLabel === 'HIGH' ? 'High' : imageModalResult.result.confidenceLabel === 'MEDIUM' ? 'Moderate' : 'Low'} ({Math.round(imageModalResult.result.confidence * 100)}%)
                    </span>
                  </div>

                  {/* Botanical Name */}
                  <div className="text-xs text-slate-400 font-mono italic">
                    Scientific: <strong className="text-sky-300 not-italic">{imageModalResult.result.scientificName}</strong>
                  </div>

                  {/* Why I identified it (Visual Evidence) */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                    <div className="text-xs font-bold text-purple-300">
                      Why I identified it:
                    </div>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {imageModalResult.result.visualEvidence.map((ev, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-purple-400">•</span>
                          <span>{ev}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Condition */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Condition:</span>
                    <span className="font-semibold text-emerald-300">{imageModalResult.result.condition}</span>
                  </div>
                </div>

                {/* Multiple Products Detected Notification */}
                {imageModalResult.result.multipleProductsDetected && imageModalResult.result.detectedProducts.length > 0 && (
                  <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-2">
                    <div className="text-xs font-bold text-amber-300">
                      Multiple products detected in image. Select one to analyze:
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {imageModalResult.result.detectedProducts.map((p, idx) => (
                        <button
                          key={idx}
                          onClick={() => confirmProductSelection(p.canonicalId)}
                          className="p-2 rounded-lg bg-slate-900 hover:bg-purple-900/50 border border-slate-700 text-left text-xs font-semibold text-white flex items-center justify-between"
                        >
                          <span>{p.name}</span>
                          <span className="text-[10px] text-amber-400 font-mono">{Math.round(p.confidence * 100)}%</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Question: Use for AgriFlow analysis? */}
                <div className="p-3 rounded-2xl bg-purple-950/30 border border-purple-500/20 text-xs text-slate-300">
                  Use <strong className="text-white">{imageModalResult.result.name}</strong> for packaging & cold-chain intelligence?
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => setManualSelectionOpen(!manualSelectionOpen)}
                    className="px-4 py-2.5 rounded-xl border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Choose Another
                  </button>
                  <button
                    onClick={() => confirmProductSelection(imageModalResult.result.canonicalId)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md cursor-pointer transition-all"
                  >
                    <Check className="w-4 h-4" />
                    <span>Confirm {imageModalResult.result.name}</span>
                  </button>
                </div>

                {/* Manual Alternative Selector Dropdown */}
                {manualSelectionOpen && (
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 animate-fade-in max-h-48 overflow-y-auto">
                    <div className="text-[11px] font-bold text-slate-400">
                      Select alternative product from catalog:
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { id: 'okra', name: "Okra (Lady's Finger)", icon: '🥒' },
                        { id: 'brinjal', name: 'Brinjal (Eggplant)', icon: '🍆' },
                        { id: 'tomato', name: 'Tomato', icon: '🍅' },
                        { id: 'potato', name: 'Potato', icon: '🥔' },
                        { id: 'onion', name: 'Onion', icon: '🧅' },
                        { id: 'mango', name: 'Mango', icon: '🥭' },
                        { id: 'milk', name: 'Cow Milk', icon: '🥛' },
                        { id: 'ghee', name: 'Desi Ghee', icon: '🫙' },
                        { id: 'butter', name: 'Butter', icon: '🧈' },
                        { id: 'coffee', name: 'Coffee', icon: '☕' },
                        { id: 'tea', name: 'Tea', icon: '🍵' },
                        { id: 'rice', name: 'Rice', icon: '🌾' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => confirmProductSelection(item.id)}
                          className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 hover:bg-purple-900/50 border border-slate-800 text-left text-xs text-white"
                        >
                          <span>{item.icon}</span>
                          <span className="truncate">{item.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
