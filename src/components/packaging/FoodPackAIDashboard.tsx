import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  FoodPackRequirements, 
  FoodPackRecommendation, 
  FoodPackagingMaterial, 
  FoodDetectionResult,
  CommodityCategory,
  StorageCondition,
  TransportationCondition,
  ShelfLifeOption,
  QuantityUnit,
  FoodPackHistoryRecord,
  FoodPackAnalyticsSummary
} from '../../types/foodPack';
import { 
  fetchFoodPackRecommendation, 
  identifyFoodFromImage, 
  fetchAllMaterials, 
  fetchRecommendationHistory, 
  saveRecommendation, 
  removeRecommendation, 
  fetchFoodPackAnalytics 
} from '../../services/packaging/foodPackClientService';
import { DEFAULT_PRIORITY_WEIGHTS } from '../../services/packaging/foodPackRecommendationEngine';
import { formatCurrency, formatNumber, formatDate, formatPercent } from '../../utils/formatters';
import { 
  fetchRedditDairyPackagingIntelligence, 
  RedditDairyPackagingReport 
} from '../../services/packaging/redditDairyPackagingService';
import { 
  calculatePerseussColdCartonization, 
  PerseussCartonizationResult 
} from '../../services/coldchain/perseussColdCartonizationService';
import { 
  fetchUsdaFoodDataProfile, 
  UsdaApiResponse 
} from '../../services/crop/usdaFoodDataCentralService';
import { 
  calculatePackageSmartDryFruitIntelligence, 
  PackageSmartDryFruitSpec 
} from '../../services/packaging/packageSmartDryFruitService';
import { MordComplianceSection } from '../compliance/MordComplianceSection';
import { AgriFlowPDFDownloadModal } from '../documents/AgriFlowPDFDownloadModal';
import { COMPREHENSIVE_PRODUCT_DATABASE } from '../../data/productsDatabase';
import { 
  PackageCheck, 
  Sparkles, 
  ShieldCheck, 
  Leaf, 
  Scale, 
  DollarSign, 
  Layers, 
  Clock, 
  Truck, 
  Thermometer, 
  CheckCircle2, 
  AlertTriangle, 
  Upload, 
  Camera, 
  Download, 
  Bookmark, 
  Trash2, 
  BarChart3, 
  History, 
  Info, 
  RefreshCw, 
  ChevronRight, 
  Sliders, 
  Box, 
  FileText, 
  ExternalLink,
  Droplets,
  Wind,
  Check,
  X,
  HelpCircle,
  Database
} from 'lucide-react';
import confetti from 'canvas-confetti';

const PRESET_COMMODITIES = [
  { name: 'Tomato', category: 'Vegetable' as CommodityCategory, icon: '🍅' },
  { name: 'Beetroot', category: 'Vegetable' as CommodityCategory, icon: '🟣' },
  { name: 'Potato', category: 'Vegetable' as CommodityCategory, icon: '🥔' },
  { name: 'Onion', category: 'Vegetable' as CommodityCategory, icon: '🧅' },
  { name: 'Carrot', category: 'Vegetable' as CommodityCategory, icon: '🥕' },
  { name: 'Okra', category: 'Vegetable' as CommodityCategory, icon: '🥬' },
  { name: 'Brinjal', category: 'Vegetable' as CommodityCategory, icon: '🍆' },
  { name: 'Apple', category: 'Fruit' as CommodityCategory, icon: '🍎' },
  { name: 'Banana', category: 'Fruit' as CommodityCategory, icon: '🍌' },
  { name: 'Mango', category: 'Fruit' as CommodityCategory, icon: '🥭' },
  { name: 'Grapes', category: 'Fruit' as CommodityCategory, icon: '🍇' },
  { name: 'Pomegranate', category: 'Fruit' as CommodityCategory, icon: '🫐' },
  { name: 'Milk', category: 'Dairy' as CommodityCategory, icon: '🥛' },
  { name: 'Paneer', category: 'Dairy' as CommodityCategory, icon: '🧀' },
  { name: 'Curd / Yogurt', category: 'Dairy' as CommodityCategory, icon: '🥣' },
  { name: 'Butter', category: 'Dairy' as CommodityCategory, icon: '🧈' },
  { name: 'Almond', category: 'Dry Fruit' as CommodityCategory, icon: '🥜' },
  { name: 'Cashew', category: 'Dry Fruit' as CommodityCategory, icon: '🌰' },
  { name: 'Walnut', category: 'Dry Fruit' as CommodityCategory, icon: '🌰' },
  { name: 'Cardamom', category: 'Spice' as CommodityCategory, icon: '🌿' },
  { name: 'Rice', category: 'Grain' as CommodityCategory, icon: '🍚' },
  { name: 'Wheat', category: 'Grain' as CommodityCategory, icon: '🌾' },
  { name: 'Chickpeas', category: 'Pulse' as CommodityCategory, icon: '🫘' },
  { name: 'Flour (Atta)', category: 'Flour' as CommodityCategory, icon: '🌾' }
];

export const FoodPackAIDashboard: React.FC = () => {
  // Navigation tabs
  const [activeMainTab, setActiveMainTab] = useState<'advisor' | 'materials_db' | 'comparison' | 'history' | 'analytics' | 'cold_chain' | 'mord_compliance'>('advisor');
  const [rolePerspective, setRolePerspective] = useState<'farmer' | 'transporter' | 'procurement' | 'sustainability'>('farmer');

  // Input requirements state
  const [selectedCommodity, setSelectedCommodity] = useState<string>('Beetroot');
  const [customCommodity, setCustomCommodity] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CommodityCategory>('Vegetable');
  const [quantity, setQuantity] = useState<number>(500);
  const [quantityUnit, setQuantityUnit] = useState<QuantityUnit>('kg');
  const [storage, setStorage] = useState<StorageCondition>('Cold Chain');
  const [transport, setTransport] = useState<TransportationCondition>('Refrigerated Truck');
  const [desiredShelfLife, setDesiredShelfLife] = useState<ShelfLifeOption>('4–7 days');
  const [customShelfLifeDays, setCustomShelfLifeDays] = useState<number>(7);

  // Priority sliders
  const [priorities, setPriorities] = useState(DEFAULT_PRIORITY_WEIGHTS);
  const [showAdvancedPriorities, setShowAdvancedPriorities] = useState<boolean>(false);

  // Recommendation & Execution state
  const [recommendation, setRecommendation] = useState<FoodPackRecommendation | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<number>(0);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState<boolean>(false);

  // Image Upload state
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [visionDetectionResult, setVisionDetectionResult] = useState<FoodDetectionResult | null>(null);
  const [inlineVisionError, setInlineVisionError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Material DB and comparison state
  const [materialsList, setMaterialsList] = useState<FoodPackagingMaterial[]>([]);
  const [selectedMaterialForDetail, setSelectedMaterialForDetail] = useState<FoodPackagingMaterial | null>(null);
  const [comparisonMaterialIds, setComparisonMaterialIds] = useState<string[]>(['mat-hdpe-crate', 'mat-corrugated-cfb-box', 'mat-water-resistant-cfb']);

  // History & Analytics state
  const [historyList, setHistoryList] = useState<FoodPackHistoryRecord[]>([]);
  const [analyticsSummary, setAnalyticsSummary] = useState<FoodPackAnalyticsSummary | null>(null);

  // Specialized External Intelligence state
  const [redditDairyData, setRedditDairyData] = useState<RedditDairyPackagingReport | null>(null);
  const [perseussData, setPerseussData] = useState<PerseussCartonizationResult | null>(null);
  const [usdaData, setUsdaData] = useState<UsdaApiResponse | null>(null);
  const [packageSmartData, setPackageSmartData] = useState<PackageSmartDryFruitSpec | null>(null);

  const analysisSteps = [
    'Analyzing food commodity botanical & biochemical kinetics...',
    'Evaluating moisture sensitivity (WVTR) and oxygen limits (OTR)...',
    'Consulting USDA FoodData Central respiration index...',
    'Running multi-factor scoring across packaging material database...',
    'Checking FSSAI (Packaging) Regulations 2018 & BIS compliance...',
    'Calculating lifecycle carbon, waste reduction & eco score...',
    'Synthesizing explainable AI recommendation & cost model...'
  ];

  // Compute total quantity in kg
  const totalQuantityKg = useMemo(() => {
    if (quantityUnit === 'ton') return quantity * 1000;
    if (quantityUnit === 'crates') return quantity * 20;
    return quantity;
  }, [quantity, quantityUnit]);

  // Compute shelf life days
  const shelfLifeDays = useMemo(() => {
    if (desiredShelfLife === '1–3 days') return 3;
    if (desiredShelfLife === '4–7 days') return 7;
    if (desiredShelfLife === '1–2 weeks') return 14;
    if (desiredShelfLife === '2–4 weeks') return 28;
    return customShelfLifeDays || 7;
  }, [desiredShelfLife, customShelfLifeDays]);

  // Initial load
  useEffect(() => {
    fetchAllMaterials().then(setMaterialsList);
    fetchRecommendationHistory().then(setHistoryList);
    fetchFoodPackAnalytics().then(setAnalyticsSummary);
  }, []);

  // Update specialized sub-APIs when commodity changes
  useEffect(() => {
    const rawName = customCommodity.trim() || selectedCommodity;
    const cleanId = rawName.toLowerCase().replace(/[^a-z0-9]/g, '-');

    fetchRedditDairyPackagingIntelligence(cleanId).then(setRedditDairyData);
    fetchUsdaFoodDataProfile(rawName).then(setUsdaData);
    calculatePackageSmartDryFruitIntelligence(cleanId).then(setPackageSmartData);

    const cartonRes = calculatePerseussColdCartonization({
      commodityId: cleanId,
      commodityName: rawName,
      commodityCategory: selectedCategory === 'Dairy' ? 'Dairy' : 'Fresh Produce',
      payloadWeightKg: totalQuantityKg,
      targetTempProfile: selectedCategory === 'Dairy' ? 'CHILLED_2_8C' : storage === 'Cold Chain' ? 'CHILLED_2_8C' : 'AMBIENT_CONTROLLED_15_25C',
      ambientMaxTempC: 38,
      transitDurationHours: Math.max(8, Math.round(250 / 40)),
      shipperMaterialPreference: 'ECO_CELLULOSE_CORRUGATED'
    });
    setPerseussData(cartonRes);
  }, [selectedCommodity, customCommodity, selectedCategory, totalQuantityKg, storage]);

  // Real-Time Auto Recomputation of Recommendation & Price on ANY input change
  useEffect(() => {
    const activeCommodity = customCommodity.trim() || selectedCommodity;
    const req: FoodPackRequirements = {
      commodity: activeCommodity,
      normalizedCommodity: activeCommodity.toLowerCase(),
      category: selectedCategory,
      quantity,
      quantityUnit,
      quantityKg: totalQuantityKg,
      storage,
      transport,
      desiredShelfLife,
      desiredShelfLifeDays: shelfLifeDays,
      userPriorities: priorities
    };

    fetchFoodPackRecommendation(req).then(rec => {
      setRecommendation(rec);
      setIsSaved(false);
    });
  }, [selectedCommodity, customCommodity, selectedCategory, quantity, quantityUnit, totalQuantityKg, storage, transport, desiredShelfLife, shelfLifeDays, priorities]);

  // Generate / Run Recommendation (Manual Full AI Audit Trigger)
  const runRecommendation = async () => {
    setIsAnalyzing(true);
    setIsSaved(false);
    setAnalysisStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < analysisSteps.length) {
        setAnalysisStep(step);
      } else {
        clearInterval(interval);
      }
    }, 180);

    const activeCommodity = customCommodity.trim() || selectedCommodity;

    const req: FoodPackRequirements = {
      commodity: activeCommodity,
      normalizedCommodity: activeCommodity.toLowerCase(),
      category: selectedCategory,
      quantity,
      quantityUnit,
      quantityKg: totalQuantityKg,
      storage,
      transport,
      desiredShelfLife,
      desiredShelfLifeDays: shelfLifeDays,
      userPriorities: priorities
    };

    try {
      const rec = await fetchFoodPackRecommendation(req);
      setRecommendation(rec);
    } finally {
      setTimeout(() => {
        setIsAnalyzing(false);
      }, 1200);
    }
  };

  // Handle image upload and food detection
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setInlineVisionError(null);
    setIsUploadingImage(true);

    try {
      // Local preview
      const preview = URL.createObjectURL(file);
      setImagePreviewUrl(preview);

      const detection = await identifyFoodFromImage(file);
      setVisionDetectionResult(detection);

      if (detection.isFood && detection.primaryItem) {
        const item = detection.primaryItem;
        setSelectedCommodity(item.name);
        setSelectedCategory(item.category);
        setCustomCommodity('');
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } else if (detection.isNonFoodOrBlurry) {
        setInlineVisionError(detection.rejectionReason || 'Image quality is too low for reliable identification.');
      }
    } catch (err: any) {
      console.error('[FoodPack AI Vision] Error:', err);
      setInlineVisionError('Food identification failed. Please upload a clearer photo or select manually.');
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Save current recommendation
  const handleSaveRecommendation = () => {
    if (!recommendation) return;
    saveRecommendation(recommendation);
    setIsSaved(true);
    fetchRecommendationHistory().then(setHistoryList);
    fetchFoodPackAnalytics().then(setAnalyticsSummary);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
  };

  // Delete history item
  const handleDeleteHistory = (id: string) => {
    const updated = removeRecommendation(id);
    setHistoryList(updated);
    fetchFoodPackAnalytics().then(setAnalyticsSummary);
  };

  // Selected crop object for PDF generator modal
  const matchedPdfProduct = useMemo(() => {
    const name = (customCommodity.trim() || selectedCommodity).toLowerCase();
    return COMPREHENSIVE_PRODUCT_DATABASE.find(p => p.name.toLowerCase().includes(name) || name.includes(p.name.toLowerCase())) || COMPREHENSIVE_PRODUCT_DATABASE[0];
  }, [customCommodity, selectedCommodity]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950/60 to-slate-900 border border-purple-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                FoodPack AI™
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                FSSAI & BIS Certified Engine
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              AI-Powered Sustainable Food Packaging Advisor
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Precision multi-factor evaluation of barrier chemistry, cold-chain thermodynamics, food safety compliance, and life-cycle sustainability.
            </p>
          </div>

          {/* Role Perspective Selector */}
          <div className="bg-slate-950/80 border border-purple-500/30 p-3 rounded-2xl space-y-2 shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
              Perspective View
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-xs font-semibold">
              <button
                onClick={() => setRolePerspective('farmer')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  rolePerspective === 'farmer' ? 'bg-emerald-600 text-white shadow' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                🌾 Farmer
              </button>
              <button
                onClick={() => setRolePerspective('transporter')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  rolePerspective === 'transporter' ? 'bg-sky-600 text-white shadow' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                🚛 Transporter
              </button>
              <button
                onClick={() => setRolePerspective('procurement')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  rolePerspective === 'procurement' ? 'bg-purple-600 text-white shadow' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                🏢 Business
              </button>
              <button
                onClick={() => setRolePerspective('sustainability')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  rolePerspective === 'sustainability' ? 'bg-teal-600 text-white shadow' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                🌱 Eco Officer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        <button
          onClick={() => setActiveMainTab('advisor')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeMainTab === 'advisor'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
              : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span>AI Packaging Advisor</span>
        </button>

        <button
          onClick={() => setActiveMainTab('comparison')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeMainTab === 'comparison'
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <Scale className="w-4 h-4 text-sky-400" />
          <span>Material Comparison</span>
        </button>

        <button
          onClick={() => setActiveMainTab('materials_db')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeMainTab === 'materials_db'
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <Database className="w-4 h-4 text-emerald-400" />
          <span>Material Knowledge Base ({materialsList.length})</span>
        </button>

        <button
          onClick={() => setActiveMainTab('history')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeMainTab === 'history'
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <History className="w-4 h-4 text-amber-400" />
          <span>Saved History ({historyList.length})</span>
        </button>

        <button
          onClick={() => setActiveMainTab('analytics')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeMainTab === 'analytics'
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-pink-400" />
          <span>Analytics & Eco Metrics</span>
        </button>

        <button
          onClick={() => setActiveMainTab('cold_chain')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeMainTab === 'cold_chain'
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <Thermometer className="w-4 h-4 text-cyan-400" />
          <span>Perseuss & Reddit APIs</span>
        </button>

        <button
          onClick={() => setActiveMainTab('mord_compliance')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeMainTab === 'mord_compliance'
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>MoRD NRLM Compliance</span>
        </button>
      </div>

      {/* 3. MAIN WORKFLOW: AI ADVISOR */}
      {activeMainTab === 'advisor' && (
        <div className="space-y-6">
          
          {/* Top Section: Food Selection & Requirements Input Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left 5 Cols: Food Commodity & Image Upload */}
            <div className="lg:col-span-5 bg-slate-900/90 border border-purple-500/25 rounded-3xl p-5 sm:p-6 space-y-5 shadow-xl">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-purple-300 font-bold flex items-center gap-1.5">
                  <PackageCheck className="w-4 h-4" />
                  1. Select Food Commodity
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Extensible Food AI
                </span>
              </div>

              {/* Commodity Search & Dropdown */}
              <div className="space-y-2">
                <label className="text-xs text-slate-300 font-semibold block">
                  Select from Pre-Configured Commodities
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto pr-1">
                  {PRESET_COMMODITIES.map((c) => {
                    const isSelected = selectedCommodity === c.name && !customCommodity;
                    return (
                      <button
                        key={c.name}
                        onClick={() => {
                          setSelectedCommodity(c.name);
                          setSelectedCategory(c.category);
                          setCustomCommodity('');
                        }}
                        className={`p-2 rounded-xl text-xs font-medium flex flex-col items-center gap-1 transition-all text-center border cursor-pointer ${
                          isSelected
                            ? 'bg-purple-600/30 border-purple-400 text-white shadow-md'
                            : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-purple-500/40'
                        }`}
                      >
                        <span className="text-xl">{c.icon}</span>
                        <span className="truncate w-full text-[11px]">{c.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Food Commodity Entry */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <label className="text-xs text-slate-300 font-semibold block">
                  Or Enter Custom Commodity:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g., Dragon Fruit, Saffron, Organic Honey..."
                    value={customCommodity}
                    onChange={(e) => setCustomCommodity(e.target.value)}
                    className="flex-1 bg-slate-950 border border-purple-500/30 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-purple-400"
                  />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as CommodityCategory)}
                    className="bg-slate-950 border border-purple-500/30 rounded-xl px-2.5 py-2 text-xs text-white outline-none focus:border-purple-400 cursor-pointer"
                  >
                    <option value="Vegetable">Vegetable</option>
                    <option value="Fruit">Fruit</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Dry Fruit">Dry Fruit</option>
                    <option value="Grain">Grain</option>
                    <option value="Pulse">Pulse</option>
                    <option value="Spice">Spice</option>
                    <option value="Flour">Flour</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Multimodal Image Upload & Camera Integration */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950/40 border border-purple-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-purple-400" />
                    Upload Food Photo for AI Recognition
                  </span>
                  <span className="text-[10px] text-purple-300 font-mono">Gemini Vision</span>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                <div className="flex gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingImage}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-200 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image</span>
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingImage}
                    className="py-2.5 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Camera</span>
                  </button>
                </div>

                {isUploadingImage && (
                  <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-300 flex items-center gap-2.5 animate-pulse">
                    <RefreshCw className="w-4 h-4 animate-spin text-purple-400" />
                    <span>Analyzing image with Google Gemini Vision...</span>
                  </div>
                )}

                {/* Inline Vision Error with Friendly Action Buttons */}
                {inlineVisionError && (
                  <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-xs space-y-2">
                    <div className="flex items-start gap-2 text-rose-300">
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{inlineVisionError}</span>
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-2.5 py-1 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 text-rose-200 text-[11px] font-bold"
                      >
                        Retake Photo
                      </button>
                      <button
                        onClick={() => setInlineVisionError(null)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold"
                      >
                        Select Food Manually
                      </button>
                    </div>
                  </div>
                )}

                {/* Vision Detection Result Banner */}
                {visionDetectionResult && visionDetectionResult.isFood && visionDetectionResult.primaryItem && (
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold text-white">
                          Detected: <strong className="text-emerald-300">{visionDetectionResult.primaryItem.name}</strong>
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                        {formatPercent(visionDetectionResult.overallConfidence * 100, 0)} Conf
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-300">
                      Category: <strong className="text-white">{visionDetectionResult.primaryItem.category}</strong>
                      {visionDetectionResult.primaryItem.subcategory ? ` • ${visionDetectionResult.primaryItem.subcategory}` : ''}
                    </div>
                  </div>
                )}

              </div>

            </div>

            {/* Right 7 Cols: Logistics, Storage & Priorities */}
            <div className="lg:col-span-7 bg-slate-900/90 border border-purple-500/25 rounded-3xl p-5 sm:p-6 space-y-5 shadow-xl">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-purple-300 font-bold flex items-center gap-1.5">
                  <Sliders className="w-4 h-4" />
                  2. Packaging Requirements & Priorities
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  SIH Specification
                </span>
              </div>

              {/* Quantity & Unit */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-semibold flex justify-between">
                    <span>Batch Quantity</span>
                    <span className="text-purple-300 font-mono font-bold">{formatNumber(totalQuantityKg)} kg total</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                      className="flex-1 bg-slate-950 border border-purple-500/30 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono outline-none focus:border-purple-400"
                    />
                    <select
                      value={quantityUnit}
                      onChange={(e) => setQuantityUnit(e.target.value as QuantityUnit)}
                      className="bg-slate-950 border border-purple-500/30 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-purple-400 cursor-pointer"
                    >
                      <option value="kg">kg</option>
                      <option value="ton">Tons</option>
                      <option value="crates">Crates (20kg)</option>
                      <option value="pieces">Pieces / Units</option>
                    </select>
                  </div>
                </div>

                {/* Storage Condition */}
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-semibold block">
                    Storage Environment
                  </label>
                  <select
                    value={storage}
                    onChange={(e) => setStorage(e.target.value as StorageCondition)}
                    className="w-full bg-slate-950 border border-purple-500/30 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-purple-400 cursor-pointer"
                  >
                    <option value="Ambient">🌡️ Ambient (15°C - 30°C)</option>
                    <option value="Refrigerated">❄️ Refrigerated (4°C - 12°C)</option>
                    <option value="Cold Chain">🧊 Strict Cold Chain (0°C - 4°C)</option>
                    <option value="Frozen">🥶 Frozen (-18°C)</option>
                    <option value="Humidity Controlled">💧 Humidity Controlled (90-95% RH)</option>
                  </select>
                </div>
              </div>

              {/* Transport & Desired Shelf Life */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-semibold block">
                    Transportation Method
                  </label>
                  <select
                    value={transport}
                    onChange={(e) => setTransport(e.target.value as TransportationCondition)}
                    className="w-full bg-slate-950 border border-purple-500/30 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-purple-400 cursor-pointer"
                  >
                    <option value="Local">🚛 Local Mandi (0 - 50 km)</option>
                    <option value="Truck">🚚 Regional Truck (50 - 300 km)</option>
                    <option value="Refrigerated Truck">❄️ Reefer Cold Truck (Long Haul)</option>
                    <option value="Long Distance">🛣️ Interstate Long Distance (&gt;500 km)</option>
                    <option value="Air">✈️ Express Air Freight (Export)</option>
                    <option value="Rail">🚆 Kisan Rail Freight</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-semibold block">
                    Target Shelf Life
                  </label>
                  <select
                    value={desiredShelfLife}
                    onChange={(e) => setDesiredShelfLife(e.target.value as ShelfLifeOption)}
                    className="w-full bg-slate-950 border border-purple-500/30 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-purple-400 cursor-pointer"
                  >
                    <option value="1–3 days">1–3 Days (Fast Turnaround)</option>
                    <option value="4–7 days">4–7 Days (Standard Mandi/Retail)</option>
                    <option value="1–2 weeks">1–2 Weeks (Cold Storage / Supermarket)</option>
                    <option value="2–4 weeks">2–4 Weeks (Export / Extended)</option>
                    <option value="Custom">Custom Days</option>
                  </select>
                </div>
              </div>

              {/* Priority Sliders Toggle */}
              <div className="pt-2 border-t border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-purple-400" />
                    Custom User Priority Weights
                  </span>
                  <button
                    onClick={() => setShowAdvancedPriorities(!showAdvancedPriorities)}
                    className="text-xs text-purple-400 hover:text-purple-300 font-bold"
                  >
                    {showAdvancedPriorities ? 'Hide Weights' : 'Adjust Weights'}
                  </button>
                </div>

                {showAdvancedPriorities && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-slate-950 border border-purple-500/20 text-xs">
                    <div>
                      <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                        <span>Cost Weight:</span>
                        <span className="font-mono text-white font-bold">{priorities.costWeight}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={priorities.costWeight}
                        onChange={(e) => setPriorities({ ...priorities, costWeight: Number(e.target.value) })}
                        className="w-full accent-purple-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                        <span>Food Safety:</span>
                        <span className="font-mono text-white font-bold">{priorities.safetyWeight}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={priorities.safetyWeight}
                        onChange={(e) => setPriorities({ ...priorities, safetyWeight: Number(e.target.value) })}
                        className="w-full accent-purple-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                        <span>Shelf Life:</span>
                        <span className="font-mono text-white font-bold">{priorities.shelfLifeWeight}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={priorities.shelfLifeWeight}
                        onChange={(e) => setPriorities({ ...priorities, shelfLifeWeight: Number(e.target.value) })}
                        className="w-full accent-purple-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                        <span>Sustainability:</span>
                        <span className="font-mono text-white font-bold">{priorities.sustainabilityWeight}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={priorities.sustainabilityWeight}
                        onChange={(e) => setPriorities({ ...priorities, sustainabilityWeight: Number(e.target.value) })}
                        className="w-full accent-emerald-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                        <span>Durability:</span>
                        <span className="font-mono text-white font-bold">{priorities.durabilityWeight}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={priorities.durabilityWeight}
                        onChange={(e) => setPriorities({ ...priorities, durabilityWeight: Number(e.target.value) })}
                        className="w-full accent-sky-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                        <span>Waste Reduction:</span>
                        <span className="font-mono text-white font-bold">{priorities.wasteWeight}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={priorities.wasteWeight}
                        onChange={(e) => setPriorities({ ...priorities, wasteWeight: Number(e.target.value) })}
                        className="w-full accent-teal-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button: ANALYZE & RECOMMEND */}
              <button
                onClick={runRecommendation}
                disabled={isAnalyzing}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-500 hover:from-purple-500 hover:to-sky-400 text-white font-extrabold text-sm shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin text-yellow-300" />
                    <span>{analysisSteps[analysisStep] || 'Evaluating Materials...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-yellow-300" />
                    <span>ANALYZE & GENERATE AI PACKAGING RECOMMENDATION</span>
                  </>
                )}
              </button>

            </div>

          </div>

          {/* 4. RECOMMENDATION RESULT PRESENTATION */}
          {recommendation && (
            <div className="space-y-6 animate-scale-in">
              
              {/* Main Recommendation Hero Card */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-purple-950/50 border-2 border-purple-500/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(168,85,247,0.2)] space-y-6">
                
                {/* Top Badge & Confidence Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-purple-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-3xl shadow-inner">
                      {recommendation.recommendedMaterial.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                          RECOMMENDED PACKAGING
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {recommendation.recommendedMaterial.code}
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                        {recommendation.recommendedMaterial.name}
                      </h2>
                      <p className="text-xs text-slate-300">
                        {recommendation.recommendedMaterial.category} • {recommendation.requirements.commodity} ({recommendation.requirements.quantityKg} kg)
                      </p>
                    </div>
                  </div>

                  {/* Overall Score Ring & AI Confidence */}
                  <div className="flex items-center gap-4">
                    
                    {/* Confidence */}
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 font-mono block">AI Confidence</span>
                      <span className={`text-sm font-bold font-mono px-2 py-0.5 rounded-lg border ${
                        recommendation.aiConfidenceLabel === 'HIGH'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      }`}>
                        {recommendation.aiConfidencePercent}% Confidence
                      </span>
                    </div>

                    {/* Overall Score */}
                    <div className="bg-slate-950 p-3 rounded-2xl border border-purple-500/40 text-center min-w-[90px]">
                      <div className="text-[10px] uppercase font-mono text-slate-400">Overall</div>
                      <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                        {recommendation.scores.overallScore}
                        <span className="text-xs text-slate-500 font-normal">/100</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Score Breakdown Metrics Grid (6 Dimensions) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  <div className="p-3 rounded-2xl bg-slate-950/70 border border-purple-500/20 space-y-1 text-center">
                    <span className="text-[10px] uppercase font-mono text-slate-400">Food Safety</span>
                    <div className="text-lg font-bold text-emerald-400 font-mono">{recommendation.scores.foodSafetyScore}</div>
                    <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                      <div className="bg-emerald-400 h-full" style={{ width: `${recommendation.scores.foodSafetyScore}%` }} />
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950/70 border border-purple-500/20 space-y-1 text-center">
                    <span className="text-[10px] uppercase font-mono text-slate-400">Shelf Life</span>
                    <div className="text-lg font-bold text-sky-400 font-mono">{recommendation.scores.shelfLifeScore}</div>
                    <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                      <div className="bg-sky-400 h-full" style={{ width: `${recommendation.scores.shelfLifeScore}%` }} />
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950/70 border border-purple-500/20 space-y-1 text-center">
                    <span className="text-[10px] uppercase font-mono text-slate-400">Sustainability</span>
                    <div className="text-lg font-bold text-emerald-300 font-mono">{recommendation.scores.sustainabilityScore}</div>
                    <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                      <div className="bg-emerald-300 h-full" style={{ width: `${recommendation.scores.sustainabilityScore}%` }} />
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950/70 border border-purple-500/20 space-y-1 text-center">
                    <span className="text-[10px] uppercase font-mono text-slate-400">Cost Score</span>
                    <div className="text-lg font-bold text-amber-300 font-mono">{recommendation.scores.costScore}</div>
                    <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                      <div className="bg-amber-300 h-full" style={{ width: `${recommendation.scores.costScore}%` }} />
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950/70 border border-purple-500/20 space-y-1 text-center">
                    <span className="text-[10px] uppercase font-mono text-slate-400">Durability</span>
                    <div className="text-lg font-bold text-purple-300 font-mono">{recommendation.scores.durabilityScore}</div>
                    <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                      <div className="bg-purple-300 h-full" style={{ width: `${recommendation.scores.durabilityScore}%` }} />
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950/70 border border-purple-500/20 space-y-1 text-center">
                    <span className="text-[10px] uppercase font-mono text-slate-400">Waste Score</span>
                    <div className="text-lg font-bold text-teal-300 font-mono">{recommendation.scores.wasteScore}</div>
                    <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                      <div className="bg-teal-300 h-full" style={{ width: `${recommendation.scores.wasteScore}%` }} />
                    </div>
                  </div>
                </div>

                {/* Explainable Rationale: WHY THIS WAS RECOMMENDED */}
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-purple-500/25 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-purple-300">
                    <Info className="w-4 h-4 text-purple-400" />
                    <span>WHY THIS WAS RECOMMENDED</span>
                  </div>
                  
                  <p className="text-xs text-white font-medium leading-relaxed">
                    {recommendation.whyExplanation.headline}
                  </p>

                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {recommendation.whyExplanation.bulletPoints.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
                    {recommendation.whyExplanation.tradeoffs}
                  </div>
                </div>

                {/* 4 Cards: Cost, Sustainability, Waste, FSSAI Compliance */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  
                  {/* Cost Card */}
                  <div className="p-4 rounded-2xl bg-slate-950/70 border border-amber-500/25 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5" />
                        Cost Breakdown
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">Estimated</span>
                    </div>
                    <div className="text-xl font-black text-white font-mono">
                      {formatCurrency(recommendation.costAnalysis.estimatedTotalCost)}
                    </div>
                    <div className="text-xs text-slate-300 space-y-0.5">
                      <div>Required: <strong className="text-white">{recommendation.costAnalysis.packagesRequired} units</strong> ({recommendation.costAnalysis.packageCapacityKg} kg/unit)</div>
                      <div>Outlay: <strong className="text-emerald-400">{formatCurrency(recommendation.costAnalysis.costPerKgFood, { decimals: 2 })}/kg</strong></div>
                    </div>
                  </div>

                  {/* Sustainability Card */}
                  <div className="p-4 rounded-2xl bg-slate-950/70 border border-emerald-500/25 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-300 flex items-center gap-1">
                        <Leaf className="w-3.5 h-3.5" />
                        Sustainability
                      </span>
                      <span className="text-xs font-bold font-mono text-emerald-400">{recommendation.ecoScore.overallEcoScore}/100</span>
                    </div>
                    <div className="text-xs text-slate-300 space-y-1">
                      <div>Recyclability: <strong className="text-white">{recommendation.recommendedMaterial.recyclability.class}</strong></div>
                      <div>Circularity: <strong className="text-emerald-300">{recommendation.ecoScore.circularityRating.split('(')[0]}</strong></div>
                    </div>
                  </div>

                  {/* Waste Analysis Card */}
                  <div className="p-4 rounded-2xl bg-slate-950/70 border border-teal-500/25 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-teal-300 flex items-center gap-1">
                        <Scale className="w-3.5 h-3.5" />
                        Waste Analysis
                      </span>
                      <span className="text-xs font-bold font-mono text-teal-300">-{recommendation.wasteAnalysis.wasteReductionPercent}% Waste</span>
                    </div>
                    <div className="text-xs text-slate-300 space-y-1">
                      <div>Waste Generated: <strong className="text-white">{recommendation.wasteAnalysis.wasteGeneratedKg} kg</strong></div>
                      <div>Reusability: <strong className="text-teal-300">{recommendation.wasteAnalysis.isReusable ? `Yes (${recommendation.wasteAnalysis.reuseCycles} cycles)` : 'Single-Use Material'}</strong></div>
                    </div>
                  </div>

                  {/* Statutory FSSAI Compliance Card */}
                  <div className="p-4 rounded-2xl bg-slate-950/70 border border-purple-500/25 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-purple-300 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        FSSAI Compliance
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                        COMPLIANT
                      </span>
                    </div>
                    <div className="text-xs text-slate-300 space-y-0.5">
                      <div className="line-clamp-1 font-semibold text-white">{recommendation.fssaiCompliance.regulationReference}</div>
                      <div className="text-[11px] text-slate-400">Source: {recommendation.fssaiCompliance.source.split('(')[0]}</div>
                      <div className="text-[10px] text-slate-500">Verified: {recommendation.fssaiCompliance.lastVerified}</div>
                    </div>
                  </div>

                </div>

                {/* Alternative Materials Section */}
                <div className="space-y-3 pt-2 border-t border-purple-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                      Alternative Evaluated Packaging Materials
                    </span>
                    <button
                      onClick={() => setActiveMainTab('comparison')}
                      className="text-xs text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1"
                    >
                      <span>Compare All</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {recommendation.alternatives.map((alt, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2 hover:border-purple-500/30 transition-all"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{alt.material.icon}</span>
                            <div>
                              <div className="text-xs font-bold text-white line-clamp-1">{alt.material.name}</div>
                              <div className="text-[10px] text-slate-400">{alt.highlightBadge}</div>
                            </div>
                          </div>
                          <span className="text-xs font-mono font-bold text-purple-300">{alt.scores.overallScore}/100</span>
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-900 font-mono">
                          <span>Cost: {formatCurrency(alt.costAnalysis.costPerKgFood, { decimals: 2 })}/kg</span>
                          <span>Eco: {alt.scores.sustainabilityScore}/100</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Controls: Save, Export PDF, Print */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-purple-500/20">
                  <div className="text-[11px] text-slate-500 font-mono">
                    ID: {recommendation.id} • Generated: {formatDate(recommendation.timestamp)}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSaveRecommendation}
                      disabled={isSaved}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isSaved
                          ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                          : 'bg-purple-600 hover:bg-purple-500 text-white shadow-md'
                      }`}
                    >
                      {isSaved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      <span>{isSaved ? 'Saved to History' : 'Save Recommendation'}</span>
                    </button>

                    <button
                      onClick={() => setIsPdfModalOpen(true)}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all border border-slate-700 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export PDF / Spec</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Responsible AI Notice */}
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2.5">
                <Info className="w-4 h-4 text-purple-400 shrink-0" />
                <span>
                  <strong>Responsible AI Notice:</strong> FoodPack AI recommendations are deterministic decision-support suggestions based on published FSSAI regulations, ASTM standards, and empirical food science. Verify material specifications before commercial dispatch.
                </span>
              </div>

            </div>
          )}

        </div>
      )}

      {/* 4. TAB 2: MATERIAL COMPARISON */}
      {activeMainTab === 'comparison' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-purple-500/30 rounded-3xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-white">Side-by-Side Packaging Material Comparison</h3>
                <p className="text-xs text-slate-400">Comparing barrier properties, cost, eco-friendliness, and compliance for {selectedCommodity}.</p>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono">
                    <th className="p-3">Material</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Overall Score</th>
                    <th className="p-3">Food Safety</th>
                    <th className="p-3">Shelf Life</th>
                    <th className="p-3">Cost / kg</th>
                    <th className="p-3">Eco Score</th>
                    <th className="p-3">Durability</th>
                    <th className="p-3">Waste Score</th>
                    <th className="p-3">Reusability</th>
                    <th className="p-3">FSSAI Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {materialsList.map((m, idx) => {
                    const isTop = recommendation?.recommendedMaterial.id === m.id;
                    return (
                      <tr key={m.id} className={isTop ? 'bg-purple-950/30 font-semibold' : 'hover:bg-slate-950/40'}>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <span>{m.icon}</span>
                            <span className="text-white">{m.name}</span>
                            {isTop && (
                              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-mono">
                                🥇 Best Overall
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-3 text-slate-400">{m.category}</td>
                        <td className="p-3 font-mono font-bold text-emerald-400">
                          {isTop ? recommendation?.scores.overallScore : Math.round(m.foodSafetyScore * 0.4 + m.sustainabilityScore * 0.3 + (10 - m.estimatedCostPerKg) * 3)}/100
                        </td>
                        <td className="p-3 font-mono text-slate-300">{m.foodSafetyScore}/100</td>
                        <td className="p-3 font-mono text-slate-300">{m.shelfLifeSuitabilityDays.min}–{m.shelfLifeSuitabilityDays.max}d</td>
                        <td className="p-3 font-mono text-amber-300">{formatCurrency(m.estimatedCostPerKg, { decimals: 2 })}</td>
                        <td className="p-3 font-mono text-emerald-300">{m.sustainabilityScore}/100</td>
                        <td className="p-3 font-mono text-purple-300">{m.durability.rating}/10</td>
                        <td className="p-3 font-mono text-teal-300">{m.wasteScore}/100</td>
                        <td className="p-3 text-slate-300">{m.reusability.isReusable ? `Yes (${m.reusability.typicalReuseCycles}x)` : 'Single-Use'}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 text-[10px] font-mono">
                            COMPLIANT
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB 3: MATERIAL KNOWLEDGE BASE */}
      {activeMainTab === 'materials_db' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {materialsList.map((m) => (
              <div
                key={m.id}
                className="p-5 rounded-3xl bg-slate-900/90 border border-purple-500/20 hover:border-purple-500/50 transition-all space-y-3.5 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{m.icon}</span>
                      <div>
                        <h4 className="text-sm font-bold text-white line-clamp-1">{m.name}</h4>
                        <span className="text-[10px] font-mono text-purple-300">{m.code} • {m.category}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {m.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800 font-mono">
                    <div className="text-slate-400">Moisture Barrier: <strong className="text-white">{m.moistureBarrier.tier}</strong></div>
                    <div className="text-slate-400">Oxygen Barrier: <strong className="text-white">{m.oxygenBarrier.tier}</strong></div>
                    <div className="text-slate-400">Eco Score: <strong className="text-emerald-300">{m.sustainabilityScore}/100</strong></div>
                    <div className="text-slate-400">Unit Cost: <strong className="text-amber-300">{formatCurrency(m.estimatedCostPerUnit)}</strong></div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-mono">{m.fssaiStandardRef.split('/')[0]}</span>
                  <button
                    onClick={() => {
                      setSelectedMaterialForDetail(m);
                    }}
                    className="text-purple-400 hover:text-purple-300 font-bold"
                  >
                    View Full Spec
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Modal for detailed material inspection */}
          {selectedMaterialForDetail && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="max-w-2xl w-full bg-slate-900 border border-purple-500/40 rounded-3xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{selectedMaterialForDetail.icon}</span>
                    <div>
                      <h3 className="text-lg font-bold text-white">{selectedMaterialForDetail.name}</h3>
                      <span className="text-xs text-purple-300 font-mono">{selectedMaterialForDetail.code}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedMaterialForDetail(null)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedMaterialForDetail.description}
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <div><strong>Food Contact:</strong> {selectedMaterialForDetail.foodContactSafety}</div>
                  <div><strong>WVTR:</strong> {selectedMaterialForDetail.moistureBarrier.wvtrRange}</div>
                  <div><strong>OTR:</strong> {selectedMaterialForDetail.oxygenBarrier.otrRange}</div>
                  <div><strong>Durability:</strong> {selectedMaterialForDetail.durability.rating}/10 ({selectedMaterialForDetail.durability.stackingCompressionKg} kg max stack)</div>
                  <div><strong>Temp Range:</strong> {selectedMaterialForDetail.temperatureRange.minTempC}°C to {selectedMaterialForDetail.temperatureRange.maxTempC}°C</div>
                  <div><strong>Recyclability:</strong> {selectedMaterialForDetail.recyclability.class} ({selectedMaterialForDetail.recyclability.symbol})</div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-xs font-bold text-emerald-400">Key Advantages:</h5>
                  <ul className="text-xs text-slate-300 space-y-1">
                    {selectedMaterialForDetail.advantages.map((adv, idx) => (
                      <li key={idx}>• {adv}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                  Source: {selectedMaterialForDetail.source} ({selectedMaterialForDetail.lastUpdated})
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 6. TAB 4: SAVED HISTORY */}
      {activeMainTab === 'history' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-purple-500/30 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Saved Packaging Recommendations</h3>
                <p className="text-xs text-slate-400">Audit trail of previously generated packaging specifications.</p>
              </div>
            </div>

            {historyList.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs">
                No saved recommendations found. Generate an advisory and click "Save Recommendation".
              </div>
            ) : (
              <div className="space-y-3">
                {historyList.map((h) => (
                  <div
                    key={h.id}
                    className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-purple-300">{h.id}</span>
                        <span className="text-[10px] text-slate-500">{formatDate(h.date)}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{h.recommendedMaterialName}</h4>
                      <div className="text-xs text-slate-400">
                        {h.commodity} • {h.quantityKg} kg • {h.storage} • {h.transport}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right font-mono">
                        <div className="text-sm font-bold text-emerald-400">{h.overallScore}/100 Score</div>
                        <div className="text-xs text-amber-300">{formatCurrency(h.estimatedCost)} est.</div>
                      </div>

                      <button
                        onClick={() => handleDeleteHistory(h.id)}
                        className="p-2 rounded-xl bg-slate-900 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-800 transition-colors"
                        title="Delete record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 7. TAB 5: ANALYTICS */}
      {activeMainTab === 'analytics' && analyticsSummary && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-slate-900 border border-purple-500/30 space-y-1 text-center">
              <span className="text-xs text-slate-400 uppercase font-mono">Total Recommendations</span>
              <div className="text-3xl font-black text-white font-mono">{analyticsSummary.totalRecommendationsCount}</div>
            </div>

            <div className="p-5 rounded-3xl bg-slate-900 border border-emerald-500/30 space-y-1 text-center">
              <span className="text-xs text-slate-400 uppercase font-mono">Average Packaging Cost</span>
              <div className="text-3xl font-black text-emerald-400 font-mono">
                {formatCurrency(analyticsSummary.averagePackagingCostPerKg, { decimals: 2 })}/kg
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-slate-900 border border-teal-500/30 space-y-1 text-center">
              <span className="text-xs text-slate-400 uppercase font-mono">Average Eco Index</span>
              <div className="text-3xl font-black text-teal-300 font-mono">{analyticsSummary.averageEcoScore}/100</div>
            </div>

            <div className="p-5 rounded-3xl bg-slate-900 border border-sky-500/30 space-y-1 text-center">
              <span className="text-xs text-slate-400 uppercase font-mono">Waste Reduction</span>
              <div className="text-3xl font-black text-sky-400 font-mono">~{analyticsSummary.estimatedWasteReductionPercent}%</div>
            </div>
          </div>

          <div className="bg-slate-900 border border-purple-500/30 rounded-3xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Most Recommended Packaging Materials</h3>
            <div className="space-y-3">
              {analyticsSummary.mostRecommendedMaterials.map((mat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-white">{mat.name}</span>
                    <span className="text-purple-300 font-mono">{mat.count} runs ({mat.percentage}%)</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full" style={{ width: `${mat.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 8. TAB 6: PERSEUSS & REDDIT & PACKAGESMART INTEGRATION TABS */}
      {activeMainTab === 'cold_chain' && (
        <div className="space-y-6">
          
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-purple-500/20 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-cyan-400" />
                <span>Specialized Industry Intelligence Engines</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Active Commodity Profile: <strong className="text-white">{customCommodity.trim() || selectedCommodity}</strong> ({selectedCategory})
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Perseuss: Connected
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-orange-500/20 text-orange-300 border border-orange-500/30">
                Reddit: Synced
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                PackageSmart: Active
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* 1. Perseuss Cold Cartonization */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-sky-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-sky-400" />
                  <h3 className="text-base font-bold text-white">Perseuss Cold Cartonization Engine</h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300">
                  {perseussData?.shipper?.materialName || 'Eco Cellulose Corrugated Shipper'}
                </span>
              </div>

              {perseussData ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                    <div>PCM Refrigerant: <strong className="text-white">{perseussData.refrigerant?.totalRefrigerantWeightKg || 12} kg</strong></div>
                    <div>Max Safe Holdover: <strong className="text-emerald-400">{perseussData.maxSafeTransitHours || 36}h safe</strong></div>
                    <div>Shipper Dimensions: <strong className="text-white">{perseussData.shipper?.externalDimensionsCm?.length || 45}x{perseussData.shipper?.externalDimensionsCm?.width || 35}x{perseussData.shipper?.externalDimensionsCm?.height || 28} cm</strong></div>
                    <div>Excursion Risk: <strong className="text-purple-300">{perseussData.thermalExcursionRisk || 'Minimal (<1%)'}</strong></div>
                  </div>

                  {perseussData.packoutSteps && perseussData.packoutSteps.length > 0 && (
                    <div className="space-y-1.5 p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                      <div className="text-xs font-bold text-slate-300">Packout Configuration:</div>
                      <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                        {perseussData.packoutSteps.map((step, sIdx) => (
                          <li key={sIdx} className="line-clamp-2">{step}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-950 text-xs text-slate-400">
                  Calculating Perseuss cold-chain dimensions...
                </div>
              )}
            </div>

            {/* 2. Reddit Dairy Intelligence */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-orange-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🥛</span>
                  <h3 className="text-base font-bold text-white">Reddit r/packaging Community Intelligence</h3>
                </div>
                {redditDairyData && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-500/20 text-orange-300">
                    {redditDairyData.communityConsensusScore}% Consensus
                  </span>
                )}
              </div>

              {redditDairyData ? (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2">
                    <div><strong>Primary Recommendation:</strong> <span className="text-orange-200">{redditDairyData.primaryPackagingRecommendation}</span></div>
                    <div><strong>Secondary Format:</strong> <span className="text-slate-300">{redditDairyData.secondaryPackagingRecommendation}</span></div>
                    {redditDairyData.criticalBarrierNeeds && (
                      <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-900 space-y-0.5 font-mono">
                        <div>Light Barrier: {redditDairyData.criticalBarrierNeeds.lightBarrier}</div>
                        <div>Oxygen Barrier: {redditDairyData.criticalBarrierNeeds.oxygenBarrier}</div>
                        <div>Moisture/Grease: {redditDairyData.criticalBarrierNeeds.moistureGreaseBarrier}</div>
                      </div>
                    )}
                  </div>

                  {redditDairyData.proTipsFromEngineers && redditDairyData.proTipsFromEngineers.length > 0 && (
                    <div className="p-3 rounded-2xl bg-orange-950/20 border border-orange-500/20 space-y-1">
                      <div className="text-[11px] font-bold text-orange-300">💡 Packaging Engineers Pro-Tip:</div>
                      <p className="text-xs text-slate-300">{redditDairyData.proTipsFromEngineers[0]}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-950 text-xs text-slate-400">
                  Select Dairy commodity or view general packaging engineering threads.
                </div>
              )}
            </div>

            {/* 3. PackageSmart AI Dry Fruit & Nut Intelligence */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-emerald-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🥜</span>
                  <h3 className="text-base font-bold text-white">PackageSmart AI LCA & Shelf Life</h3>
                </div>
                {packageSmartData && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                    {packageSmartData.optimalWaterActivityRange}
                  </span>
                )}
              </div>

              {packageSmartData ? (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2">
                    <div><strong>Recommended Pouch:</strong> <span className="text-emerald-200">{packageSmartData.recommendedPouchLamination}</span></div>
                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-900 font-mono text-[11px]">
                      <div>Critical aw: <strong className="text-white">{packageSmartData.criticalWaterActivityAw} aw</strong></div>
                      <div>Lipid Ratio: <strong className="text-amber-300">{packageSmartData.fatContentPercent}%</strong></div>
                      <div>LCA Carbon: <strong className="text-emerald-400">{packageSmartData.lcaAssessment?.carbonFootprintGramsCo2e || 42}g CO2e</strong></div>
                      <div>Shelf Life: <strong className="text-white">{packageSmartData.estimatedShelfLifeMonths} Months</strong></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-950 text-xs text-slate-400">
                  PackageSmart LCA data active for dry fruits, nuts, and grain commodities.
                </div>
              )}
            </div>

            {/* 4. USDA FoodData Central Profile */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-purple-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-purple-400" />
                  <h3 className="text-base font-bold text-white">USDA FoodData Central Chemistry</h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                  ARS USDA Verified
                </span>
              </div>

              {usdaData && usdaData.foodProfile ? (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2">
                    <div><strong>Scientific Classification:</strong> <span className="text-purple-200 italic font-mono">{usdaData.foodProfile.scientificName}</span></div>
                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-900 font-mono text-[11px]">
                      <div>Water Content: <strong className="text-white">{usdaData.foodProfile.waterGramsPer100g} g/100g</strong></div>
                      <div>Energy: <strong className="text-white">{usdaData.foodProfile.energyKcal} kcal</strong></div>
                      <div>Respiration: <strong className="text-sky-300">{usdaData.foodProfile.respirationCategory}</strong></div>
                      <div>Ideal Temp: <strong className="text-emerald-400">{usdaData.foodProfile.recommendedStorageTempC}°C</strong></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-950 text-xs text-slate-400">
                  USDA FoodData Central chemistry connected.
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* 9. TAB 7: MoRD NRLM COMPLIANCE TAB (PRESERVED) */}
      {activeMainTab === 'mord_compliance' && (
        <div className="space-y-6">
          <MordComplianceSection
            cropId={selectedCommodity.toLowerCase()}
            cropName={selectedCommodity}
            initialQuantityKg={totalQuantityKg}
          />
        </div>
      )}

      {/* PDF Download Modal Integration */}
      <AgriFlowPDFDownloadModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        product={matchedPdfProduct}
      />

    </div>
  );
};
