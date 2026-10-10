import React, { useState, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { 
  Search, 
  Camera, 
  Sparkles, 
  X, 
  Check, 
  AlertCircle, 
  RefreshCw, 
  Layers, 
  CheckCircle2, 
  ChevronRight, 
  HelpCircle, 
  Mic, 
  Edit3, 
  Brain 
} from 'lucide-react';
import { SarvamVoiceAssistantModal } from '../voice/SarvamVoiceAssistantModal';
import { AiCorrectionsHistoryModal } from '../common/AiCorrectionsHistoryModal';
import { searchUniversalCrop, searchCropByImage } from '../../services/crop/cropSearchService';
import { IdentificationResult } from '../../services/crop/cropIdentificationService';
import { getEnrichedCropKnowledge, EnrichedProductIntelligence } from '../../services/crop/cropKnowledgeService';
import { recordImageCorrection } from '../../services/crop/imageCorrectionMemoryService';
import { saveUserCorrection } from '../../services/crop/aiCorrectionClientService';
import { CENTRAL_PRODUCT_CATALOG, isAmbiguousPepperQuery, PEPPER_COMMODITY_OPTIONS } from '../../services/catalog/productNormalizationService';
import { formatCurrency, formatNumber, formatTime } from '../../utils/formatters';
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
  const [isVoiceAssistantOpen, setIsVoiceAssistantOpen] = useState<boolean>(false);
  const [isCorrectionsHistoryOpen, setIsCorrectionsHistoryOpen] = useState<boolean>(false);
  const [isPepperDisambiguationOpen, setIsPepperDisambiguationOpen] = useState<boolean>(false);

  // Human Correction Form States
  const [isCorrectingResult, setIsCorrectingResult] = useState<boolean>(false);
  const [correctedProductText, setCorrectedProductText] = useState<string>('');
  const [correctedCategory, setCorrectedCategory] = useState<string>('Fruit');
  const [correctionNotes, setCorrectionNotes] = useState<string>('');
  const [isSavingCorrection, setIsSavingCorrection] = useState<boolean>(false);
  const [correctionSuccessBanner, setCorrectionSuccessBanner] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    if (isAmbiguousPepperQuery(searchTerm)) {
      setIsPepperDisambiguationOpen(true);
      return;
    }
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
    setIsCorrectingResult(false);
    setCorrectionSuccessBanner(null);
    try {
      const res = await searchCropByImage(file);
      setImageModalResult({
        result: res.identification,
        product: res.product
      });
      // Prepopulate correction form default with product category or fruit
      setCorrectedCategory((res.product?.category as any) || 'Fruit');
      setCorrectedProductText('');
      setCorrectionNotes('');

      // If matched from AI Learned Memory, immediately display the corrected product across the dashboard
      if (res.identification.isLearnedCorrection) {
        onSelectCrop(res.product);
      }
    } catch (err: any) {
      console.error('[CropIdentificationBar] Image search failed:', err);
      const fallbackName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') || 'Uploaded Produce';
      const fallbackProduct = getEnrichedCropKnowledge('Produce');
      setImageModalResult({
        result: {
          identified: false,
          canonicalId: 'produce',
          name: fallbackName,
          scientificName: 'Botanical taxon',
          category: 'Vegetable',
          confidence: 0.35,
          confidenceLabel: 'LOW',
          needsConfirmation: true,
          visualEvidence: ['Image uploaded for manual or automated identification'],
          condition: 'Processing image',
          qualityObservations: [],
          multipleProductsDetected: false,
          detectedProducts: [],
          isNonFoodOrBlurry: true,
          rejectionReason: 'Unable to confidently identify this product. Please upload a clearer image or select the product manually below.',
          candidates: [],
          isRealAi: false,
          isDemoFallback: true,
          source: 'AgriFlow Edge Classifier',
          timestamp: new Date().toISOString()
        },
        product: fallbackProduct
      });
      setCorrectedCategory('Fruit');
      setCorrectedProductText('');
      setCorrectionNotes('');
    } finally {
      setIsAnalyzingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const confirmProductSelection = (canonicalId: string) => {
    const targetId = canonicalId || 'produce';
    searchUniversalCrop(targetId).then((res) => {
      // Record user confirmation / correction into persistent memory
      if (imageModalResult?.result.imageSignature) {
        recordImageCorrection(
          imageModalResult.result.imageSignature,
          res.product.id,
          res.product.name,
          res.product.scientificName,
          res.product.category
        );
      }
      onSelectCrop(res.product);
      setImageModalResult(null);
      setManualSelectionOpen(false);
      setIsCorrectingResult(false);
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    }).catch(err => {
      console.error('[CropIdentificationBar] Confirmation error:', err);
      const fallback = getEnrichedCropKnowledge(targetId);
      onSelectCrop(fallback);
      setImageModalResult(null);
      setManualSelectionOpen(false);
      setIsCorrectingResult(false);
    });
  };

  const handleSaveCorrection = async () => {
    if (!correctedProductText.trim() || !imageModalResult) return;
    setIsSavingCorrection(true);
    try {
      const prodName = correctedProductText.trim();
      const normId = prodName.toLowerCase().replace(/[^a-z0-9]/g, '-');
      
      await saveUserCorrection({
        imageHash: imageModalResult.result.imageHash || imageModalResult.result.imageSignature || `hash_${Date.now()}`,
        rawFileHash: imageModalResult.result.rawFileHash,
        imagePhash: imageModalResult.result.imagePhash || '0'.repeat(16),
        imageThumbnail: imageModalResult.result.imageThumbnail || imageModalResult.result.uploadedPhotoPreviewUrl,
        originalAiResult: imageModalResult.result.name,
        correctedProduct: prodName,
        correctedNormalizedName: normId,
        correctedCategory: correctedCategory,
        originalConfidence: imageModalResult.result.confidence,
        notes: correctionNotes.trim() || undefined
      });

      setCorrectionSuccessBanner('Correction saved. AgriFlow will use this correction for future recognition.');

      // Immediately switch product & trigger downstream workflows
      searchUniversalCrop(normId).then((res) => {
        onSelectCrop(res.product);
        confetti({ particleCount: 75, spread: 75, origin: { y: 0.6 } });
        setTimeout(() => {
          setImageModalResult(null);
          setIsCorrectingResult(false);
          setCorrectionSuccessBanner(null);
        }, 1600);
      });
    } catch (err) {
      console.error('Failed to save correction:', err);
    } finally {
      setIsSavingCorrection(false);
    }
  };

  const filteredCatalogItems = useMemo(() => {
    const q = correctedProductText.toLowerCase().trim();
    if (!q) {
      return CENTRAL_PRODUCT_CATALOG.slice(0, 12);
    }
    return CENTRAL_PRODUCT_CATALOG.filter(c => 
      c.displayName.toLowerCase().includes(q) ||
      c.aliases.some(a => a.toLowerCase().includes(q))
    ).slice(0, 12);
  }, [correctedProductText]);

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

          {/* Sarvam AI Voice Search Button */}
          <button
            type="button"
            onClick={() => setIsVoiceAssistantOpen(true)}
            title="Search crop or ask question via Sarvam Voice AI (Hindi, Kannada, Tamil, etc.)"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600/30 to-teal-600/30 hover:from-emerald-600/50 hover:to-teal-600/50 border border-emerald-400/40 text-emerald-200 text-xs font-semibold transition-all cursor-pointer shadow-sm"
          >
            <Mic className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">Sarvam Voice</span>
          </button>

          {/* AI Learned Memory Button */}
          <button
            type="button"
            onClick={() => setIsCorrectionsHistoryOpen(true)}
            title="View & manage AI learned corrections memory"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-900/30 hover:bg-purple-900/50 border border-purple-500/30 text-purple-300 text-xs font-semibold transition-all cursor-pointer shadow-sm"
          >
            <Brain className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">AI Memory</span>
          </button>

          <button
            type="button"
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

      {/* Image Analysis Progress Modal / Overlay */}
      {isAnalyzingImage && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-purple-500/40 p-6 shadow-2xl space-y-4 text-center">
            <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-purple-500/20 animate-ping"></div>
              <div className="w-14 h-14 rounded-2xl bg-purple-600/30 border border-purple-400/40 flex items-center justify-center text-2xl">
                🧠
              </div>
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-white">Gemini Multimodal Vision Analysis</h3>
              <p className="text-xs text-purple-300">
                Analyzing morphological geometry, surface texture & fetching live market benchmark...
              </p>
            </div>
            <div className="space-y-2 pt-2 text-left text-xs text-slate-300">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Extracting visual features & geometry</span>
              </div>
              <div className="flex items-center gap-2 text-sky-400">
                <RefreshCw className="w-4 h-4 shrink-0 animate-spin" />
                <span>Running Gemini botanical classification</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <div className="w-4 h-4 rounded-full border border-slate-600 shrink-0"></div>
                <span>Discovering live APMC / Federation market pricing</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <div className="w-4 h-4 rounded-full border border-slate-600 shrink-0"></div>
                <span>Building product passport & packaging specs</span>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Conversational AI Vision Review Card Modal */}
      {imageModalResult && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-purple-500/40 p-6 shadow-2xl space-y-5 text-left max-h-[90vh] overflow-y-auto">
            
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
                    {(imageModalResult.result.source || '').includes('Learned') ? (
                      <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold border border-cyan-500/30">
                        🧠 User-Learned Memory
                      </span>
                    ) : imageModalResult.result.isRealAi ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                        🧠 Gemini Vision AI
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-500/30">
                        📊 Autonomous CV
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-white">
                    Visual Recognition & Market Discovery
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
                
                {/* Uploaded Photograph Thumbnail + Botanical Identification Box */}
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-purple-500/30 space-y-3">
                  
                  <div className="flex items-start gap-3.5">
                    {/* User's Uploaded Photo Thumbnail */}
                    {imageModalResult.result.uploadedPhotoPreviewUrl ? (
                      <div className="relative shrink-0">
                        <img
                          src={imageModalResult.result.uploadedPhotoPreviewUrl}
                          alt={imageModalResult.result.name}
                          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl border-2 border-purple-400/40 shadow-md bg-slate-800"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-purple-600 text-white p-1 rounded-lg text-[9px] font-bold shadow">
                          Photo
                        </div>
                      </div>
                    ) : null}

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between flex-wrap gap-1">
                        <span className="text-xs text-slate-400">Identified Commodity:</span>
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-bold border ${
                          imageModalResult.result.confidenceLabel === 'HIGH' 
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            : imageModalResult.result.confidenceLabel === 'MEDIUM'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                            : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                        }`}>
                          {imageModalResult.result.confidenceLabel === 'HIGH' ? 'High' : imageModalResult.result.confidenceLabel === 'MEDIUM' ? 'Moderate' : 'Low'} ({Math.round(imageModalResult.result.confidence * 100)}%)
                        </span>
                      </div>
                      
                      <h4 className="text-lg font-extrabold text-purple-200">
                        {imageModalResult.result.name}
                      </h4>
                      <p className="text-xs text-slate-400 font-mono italic">
                        Scientific: <span className="text-sky-300 not-italic">{imageModalResult.result.scientificName}</span>
                      </p>
                      <div className="text-xs text-slate-400 pt-0.5">
                        Condition: <span className="text-emerald-300 font-semibold">{imageModalResult.result.condition}</span>
                      </div>
                    </div>
                  </div>

                  {/* Morphological / Visual Evidence */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                    <div className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Visual Identification Evidence:
                    </div>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {(imageModalResult.result.visualEvidence || []).map((ev, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-purple-400">•</span>
                          <span>{ev}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Live Real-Time Market Price Card */}
                {imageModalResult.result.price && imageModalResult.result.price.currentPrice != null && (
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/60 border border-indigo-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase tracking-wider text-indigo-300 font-bold">
                          Market Price Discovery
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          imageModalResult.result.price.status === 'LIVE'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        }`}>
                          {imageModalResult.result.price.status === 'LIVE' ? '🟢 Live APMC Rate' : '🟡 Market Benchmark'}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        {imageModalResult.result.price.commodityType || 'COMMODITY'}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between pt-1">
                      <div>
                        <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                          {formatCurrency(imageModalResult.result.price.currentPrice)}
                          <span className="text-xs font-normal text-slate-400 ml-1">/{imageModalResult.result.price.unit || 'kg'}</span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Modal Mandi Band: {formatCurrency(imageModalResult.result.price?.priceRange?.min ?? imageModalResult.result.price?.modalRange?.min ?? (imageModalResult.result.price.currentPrice * 0.85))} – {formatCurrency(imageModalResult.result.price?.priceRange?.max ?? imageModalResult.result.price?.modalRange?.max ?? (imageModalResult.result.price.currentPrice * 1.15))}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className={`inline-block px-2 py-1 rounded-lg text-xs font-mono font-bold ${
                          (imageModalResult.result.price.change24h ?? 0) >= 0 
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                        }`}>
                          {(imageModalResult.result.price.change24h ?? 0) >= 0 ? '+' : ''}{imageModalResult.result.price.change24h ?? 0}% (24h)
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-indigo-900/40 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="truncate max-w-[200px]" title={imageModalResult.result.price.source || 'Market Data'}>
                        Source: <strong className="text-indigo-200">{imageModalResult.result.price.source || 'Verified Market Baseline'}</strong>
                      </span>
                      <span>
                        Updated: <strong className="text-slate-300">{formatTime(imageModalResult.result.price.timestamp)}</strong>
                      </span>
                    </div>
                  </div>
                )}

                {/* Multiple Products Detected Notification */}
                {imageModalResult.result.multipleProductsDetected && (imageModalResult.result.detectedProducts || []).length > 0 && (
                  <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-2">
                    <div className="text-xs font-bold text-amber-300">
                      Multiple products detected in image. Select one to analyze:
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {(imageModalResult.result.detectedProducts || []).map((p, idx) => (
                        <button
                          key={idx}
                          onClick={() => confirmProductSelection(p.canonicalId)}
                          className="p-2 rounded-lg bg-slate-900 hover:bg-purple-900/50 border border-slate-700 text-left text-xs font-semibold text-white flex items-center justify-between cursor-pointer"
                        >
                          <span>{p.name}</span>
                          <span className="text-[10px] text-amber-400 font-mono">{Math.round(p.confidence * 100)}%</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Low Confidence Warning (confidence < 0.75) */}
                {(imageModalResult.result.confidence < 0.75 || imageModalResult.result.needsConfirmation) && (
                  <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-500/40 flex items-start gap-2.5 text-amber-200 text-xs">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Moderate / Low AI Confidence ({Math.round(imageModalResult.result.confidence * 100)}%):</span>
                      <p className="text-amber-300/80 mt-0.5 leading-relaxed">
                        AgriFlow detected "{imageModalResult.result.name}". Please confirm if this is correct or use <strong>[✎ Correct Result]</strong> to train AgriFlow with the right product.
                      </p>
                    </div>
                  </div>
                )}

                {/* Learned Memory Banner */}
                {imageModalResult.result.isLearnedCorrection && (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-teal-950/50 to-cyan-950/60 border-2 border-emerald-500/50 flex items-start gap-3 text-emerald-200 text-xs shadow-lg shadow-emerald-950/40">
                    <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 shrink-0 mt-0.5">
                      <Brain className="w-5 h-5 text-emerald-300" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-white text-sm">AI Learned Memory Match</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/30 text-emerald-200 border border-emerald-400/40">
                          Verified Correction
                        </span>
                      </div>
                      <p className="text-emerald-300/90 leading-relaxed">
                        AgriFlow recognized this image from your previous correction and is displaying <strong className="text-white underline decoration-emerald-400">{imageModalResult.result.name}</strong>. Real-time market rates and packaging guidelines have been updated automatically.
                      </p>
                    </div>
                  </div>
                )}

                {/* Success Confirmation Toast */}
                {correctionSuccessBanner && (
                  <div className="p-3.5 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs font-semibold flex items-center gap-2.5 animate-fade-in shadow-lg">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>{correctionSuccessBanner}</span>
                  </div>
                )}

                {/* Action Buttons: [✓ Correct] & [✎ Correct Result] */}
                {!isCorrectingResult && (
                  <div className="space-y-2 pt-2">
                    <div className="flex flex-col sm:flex-row items-center gap-2.5">
                      <button
                        onClick={() => confirmProductSelection(imageModalResult.result.canonicalId || imageModalResult.result.name || 'produce')}
                        className="w-full sm:flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-950/50 cursor-pointer transition-all hover:scale-[1.01]"
                      >
                        <Check className="w-4 h-4" />
                        <span>✓ Correct — Proceed with {imageModalResult.result.name}</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsCorrectingResult(true);
                          setCorrectionSuccessBanner(null);
                        }}
                        className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-3 rounded-2xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-200 text-xs sm:text-sm font-bold transition-all cursor-pointer"
                      >
                        <Edit3 className="w-4 h-4 text-purple-300" />
                        <span>✎ Correct Result</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-1">
                      <span>Wrong product? Train the AI with your correction.</span>
                      <button
                        onClick={() => setManualSelectionOpen(!manualSelectionOpen)}
                        className="text-purple-300 hover:text-white underline cursor-pointer"
                      >
                        Quick catalog picker
                      </button>
                    </div>
                  </div>
                )}

                {/* Human-Correction & Learning Interactive Drawer */}
                {isCorrectingResult && (
                  <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/40 space-y-3.5 animate-fade-in shadow-xl">
                    <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
                      <div className="flex items-center gap-2">
                        <Edit3 className="w-4 h-4 text-purple-400" />
                        <span className="text-xs font-bold text-white">
                          Teach AgriFlow: Human Correction
                        </span>
                      </div>
                      <button
                        onClick={() => setIsCorrectingResult(false)}
                        className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* AI Detected Pill */}
                    <div className="flex items-center justify-between text-xs bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-slate-400">AI Detected:</span>
                      <span className="font-semibold text-rose-300 line-through">
                        {imageModalResult.result.name} ({Math.round(imageModalResult.result.confidence * 100)}%)
                      </span>
                    </div>

                    {/* Correction Input & Category */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-purple-200 block">
                        Correct Product Name:
                      </label>
                      <input
                        type="text"
                        value={correctedProductText}
                        onChange={(e) => setCorrectedProductText(e.target.value)}
                        placeholder="Type correct product (e.g. Apple, Butter, Orange, Milk)..."
                        className="w-full bg-slate-900 border border-purple-500/40 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-purple-300"
                      />

                      {/* Autocomplete Suggestions from Central Product Catalog */}
                      {filteredCatalogItems.length > 0 && (
                        <div className="space-y-1 pt-1">
                          <span className="text-[10px] text-slate-400 font-mono">Suggested Products:</span>
                          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                            {filteredCatalogItems.map((item) => (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => {
                                  setCorrectedProductText(item.displayName);
                                  setCorrectedCategory(item.category.charAt(0).toUpperCase() + item.category.slice(1));
                                }}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border flex items-center gap-1 transition-all cursor-pointer ${
                                  correctedProductText.toLowerCase() === item.displayName.toLowerCase()
                                    ? 'bg-purple-600 text-white border-purple-400 font-bold'
                                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-purple-400'
                                }`}
                              >
                                <span>{item.icon}</span>
                                <span>{item.displayName}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Category Selector & Notes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      <div>
                        <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                          Category:
                        </label>
                        <select
                          value={correctedCategory}
                          onChange={(e) => setCorrectedCategory(e.target.value)}
                          className="w-full bg-slate-900 border border-purple-500/30 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-purple-400 cursor-pointer"
                        >
                          <option value="Fruit">Fruit</option>
                          <option value="Vegetable">Vegetable</option>
                          <option value="Dairy">Dairy</option>
                          <option value="Dry Fruit">Dry Fruit</option>
                          <option value="Grain">Grain</option>
                          <option value="Pulse">Pulse</option>
                          <option value="Spice">Spice</option>
                          <option value="Oil">Oil</option>
                          <option value="Flour">Flour</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] text-slate-300 font-semibold block mb-1">
                          Notes (Optional):
                        </label>
                        <input
                          type="text"
                          value={correctionNotes}
                          onChange={(e) => setCorrectionNotes(e.target.value)}
                          placeholder="e.g. Red Shimla Apple"
                          className="w-full bg-slate-900 border border-purple-500/30 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-purple-400"
                        />
                      </div>
                    </div>

                    {/* Save Correction Button */}
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-purple-500/20">
                      <button
                        type="button"
                        onClick={() => setIsCorrectingResult(false)}
                        className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold"
                      >
                        Cancel
                      </button>

                      <button
                        type="button"
                        onClick={handleSaveCorrection}
                        disabled={isSavingCorrection || !correctedProductText.trim()}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-purple-950/50 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isSavingCorrection ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Check className="w-3.5 h-3.5" />
                        )}
                        <span>Save Correction & Proceed</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Manual Alternative Selector Dropdown */}
                {manualSelectionOpen && (
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 animate-fade-in max-h-48 overflow-y-auto">
                    <div className="text-[11px] font-bold text-slate-400">
                      Select alternative product from catalog:
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { id: 'apple', name: "Apple (Seb)", icon: '🍎' },
                        { id: 'orange', name: "Orange (Santra)", icon: '🍊' },
                        { id: 'tomato', name: "Tomato (Tamatar)", icon: '🍅' },
                        { id: 'okra', name: "Okra (Bhindi)", icon: '🟢' },
                        { id: 'radish', name: 'Radish (Mooli)', icon: '🌱' },
                        { id: 'watermelon', name: 'Watermelon (Tarbooz)', icon: '🍉' },
                        { id: 'brinjal', name: 'Brinjal (Eggplant)', icon: '🍆' },
                        { id: 'potato', name: 'Potato (Aloo)', icon: '🥔' },
                        { id: 'onion', name: 'Onion (Pyaz)', icon: '🧅' },
                        { id: 'mango', name: 'Mango (Aam)', icon: '🥭' },
                        { id: 'milk', name: 'Fresh Milk', icon: '🥛' },
                        { id: 'butter', name: 'Pasteurized Butter', icon: '🧈' },
                        { id: 'ghee', name: 'Desi Ghee', icon: '🫙' },
                        { id: 'rice', name: 'Basmati Rice', icon: '🌾' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => confirmProductSelection(item.id)}
                          className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 hover:bg-purple-900/50 border border-slate-800 text-left text-xs text-white cursor-pointer"
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
        </div>,
        document.body
      )}

      {/* Pepper Disambiguation Modal */}
      {isPepperDisambiguationOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-purple-500/40 p-6 shadow-2xl space-y-4 text-left max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsPepperDisambiguationOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300 font-bold">
                  Commodity Disambiguation
                </span>
                <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold">
                  Multiple Varieties Found
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-white">
                Which pepper commodity are you looking for?
              </h3>
              <p className="text-xs text-slate-400">
                "Pepper" can refer to spices (Black, White, Green peppercorns) or fresh vegetables (Bell Pepper / Capsicum, Chilli). Please select your exact commodity:
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              {PEPPER_COMMODITY_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setIsPepperDisambiguationOpen(false);
                    setQuery('');
                    searchUniversalCrop(opt.id).then((res) => {
                      onSelectCrop(res.product);
                      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
                    });
                  }}
                  className="w-full p-3.5 rounded-2xl bg-slate-950/80 hover:bg-purple-950/40 border border-purple-500/20 hover:border-purple-400/60 flex items-center justify-between text-left transition-all cursor-pointer group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl p-2 rounded-xl bg-slate-900 border border-slate-800 group-hover:scale-110 transition-transform">
                      {opt.icon}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                          {opt.name}
                        </h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                          {opt.category}
                        </span>
                      </div>
                      <div className="text-[11px] text-purple-300/80 font-mono">
                        {opt.scientificName} • {opt.indicName}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {opt.description}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0 pl-3">
                    <span className="text-xs font-bold text-emerald-400 font-mono block">
                      ~₹{opt.approxRateKg}/kg
                    </span>
                    <span className="text-[10px] text-slate-500">Benchmark</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Sarvam AI Indic Voice Assistant Modal */}
      <SarvamVoiceAssistantModal
        isOpen={isVoiceAssistantOpen}
        onClose={() => setIsVoiceAssistantOpen(false)}
        onSelectCropFromVoice={(cropName) => {
          setQuery(cropName);
          handleSearch(cropName);
        }}
      />

      {/* AI Learned Memory & Corrections History Modal */}
      <AiCorrectionsHistoryModal
        isOpen={isCorrectionsHistoryOpen}
        onClose={() => setIsCorrectionsHistoryOpen(false)}
        onSelectCorrection={(cropName) => {
          setQuery(cropName);
          handleSearch(cropName);
        }}
      />

    </div>
  );
};
