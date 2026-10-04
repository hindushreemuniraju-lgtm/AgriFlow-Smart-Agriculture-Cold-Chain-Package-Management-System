import React, { useState, useRef } from 'react';
import { Search, Camera, Upload, Mic, Sparkles, X, Check, AlertCircle, RefreshCw } from 'lucide-react';
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
      if (!res.identification.needsConfirmation) {
        onSelectCrop(res.product);
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      }
    } finally {
      setIsAnalyzingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const confirmImageCandidate = (canonicalId: string) => {
    if (!imageModalResult) return;
    searchUniversalCrop(canonicalId).then((res) => {
      onSelectCrop(res.product);
      setImageModalResult(null);
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
          placeholder="Enter any crop, regional name (Brinjal, Baingan, Aloo, Pyaz, Chikoo), or botanical sp..."
          className="w-full bg-slate-900/90 border border-purple-500/30 rounded-2xl pl-12 pr-32 py-3.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-purple-400 shadow-inner backdrop-blur-md"
        />

        {/* Right Action Icons: Clear, Upload Image, Camera */}
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
            title="Upload Crop / Plant Photograph"
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/30 text-purple-200 text-xs font-semibold transition-all cursor-pointer"
          >
            {isAnalyzingImage ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-sky-400" />
            ) : (
              <Camera className="w-3.5 h-3.5 text-sky-400" />
            )}
            <span className="hidden sm:inline">Photo AI</span>
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

      {/* Image Botanical Classification Confirmation Modal */}
      {imageModalResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-purple-500/40 p-6 shadow-2xl space-y-5">
            
            <button
              onClick={() => setImageModalResult(null)}
              className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center text-2xl border border-purple-500/30">
                🌱
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase text-emerald-400 font-bold">
                  AI Plant Vision Model
                </div>
                <h3 className="text-lg font-bold text-white">
                  Crop Identification Result
                </h3>
              </div>
            </div>

            {/* Top Match Result */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-purple-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-base font-extrabold text-white">
                  {imageModalResult.result.name}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30">
                  {Math.round(imageModalResult.result.confidence * 100)}% Confidence
                </span>
              </div>
              <div className="text-xs text-slate-400 font-mono italic">
                Scientific: <strong className="text-purple-300">{imageModalResult.result.scientificName}</strong>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                Source: {imageModalResult.result.source}
              </p>
            </div>

            {/* Candidate Alternatives */}
            {imageModalResult.result.candidates.length > 1 && (
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-300 font-mono">
                  Possible Candidates / Select to Confirm:
                </div>
                <div className="space-y-1.5">
                  {imageModalResult.result.candidates.map((cand, i) => (
                    <button
                      key={i}
                      onClick={() => confirmImageCandidate(cand.canonicalId)}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-950/60 hover:bg-purple-900/40 border border-slate-800 hover:border-purple-500/30 text-left transition-all cursor-pointer"
                    >
                      <div>
                        <div className="text-xs font-bold text-white">{cand.name}</div>
                        <div className="text-[10px] text-slate-400 italic">{cand.scientificName}</div>
                      </div>
                      <div className="text-xs font-mono font-bold text-sky-400">
                        {Math.round(cand.confidence * 100)}% Match
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setImageModalResult(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmImageCandidate(imageModalResult.result.canonicalId)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Confirm {imageModalResult.result.name}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
