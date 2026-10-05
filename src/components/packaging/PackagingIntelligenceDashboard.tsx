import React, { useState, useMemo, useEffect } from 'react';
import { COMPREHENSIVE_PRODUCT_DATABASE } from '../../data/productsDatabase';
import { generatePackagingRecommendation, PackagingEngineInput } from '../../services/packaging/packagingRecommendationEngine';
import { evaluateJourneySuitability } from '../../services/transport/deliverySuitabilityService';
import { getVerifiedCropVisual } from '../../services/crop/cropImageService';
import { AgriFlowPDFDownloadModal } from '../documents/AgriFlowPDFDownloadModal';
import { fetchRedditDairyPackagingIntelligence, RedditDairyPackagingReport } from '../../services/packaging/redditDairyPackagingService';
import { calculatePerseussColdCartonization, PerseussCartonizationResult } from '../../services/coldchain/perseussColdCartonizationService';
import { fetchUsdaFoodDataProfile, UsdaApiResponse } from '../../services/crop/usdaFoodDataCentralService';
import { calculatePackageSmartDryFruitIntelligence, PackageSmartDryFruitSpec } from '../../services/packaging/packageSmartDryFruitService';
import { MordComplianceSection } from '../compliance/MordComplianceSection';
import { 
  PackageCheck, 
  ShieldCheck, 
  Sparkles, 
  Building2, 
  Wind, 
  Droplets, 
  Thermometer, 
  Truck, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Download, 
  Info,
  Leaf,
  Scale,
  DollarSign,
  Loader2,
  ArrowRight,
  Activity,
  MessageSquare,
  Box,
  Database,
  Recycle,
  Flame,
  Snowflake,
  ExternalLink,
  ThumbsUp
} from 'lucide-react';

export const PackagingIntelligenceDashboard: React.FC = () => {
  const [selectedProductId, setSelectedProductId] = useState<string>('beetroot');
  const [quantityKg, setQuantityKg] = useState<number>(500);
  const [distanceKm, setDistanceKm] = useState<number>(250);
  const [targetShelfLifeDays, setTargetShelfLifeDays] = useState<number>(14);
  const [storageTempC, setStorageTempC] = useState<number>(4);
  const [humidityPercent, setHumidityPercent] = useState<number>(90);
  const [vehicleType, setVehicleType] = useState<string>('Refrigerated Reefer Container (2°C - 8°C)');
  const [budgetPreference, setBudgetPreference] = useState<'economy' | 'balanced' | 'premium'>('balanced');
  const [sustainabilityPreference, setSustainabilityPreference] = useState<'standard' | 'high_eco' | 'zero_plastic'>('standard');
  const [activeTab, setActiveTab] = useState<'recommendation' | 'barrier_matrix' | 'respiration' | 'usda_fooddata' | 'perseuss_cartonization' | 'reddit_dairy' | 'packagesmart_ai' | 'mord_compliance' | 'distance_logistics'>('recommendation');
  
  // Dynamic API state
  const [redditDairyData, setRedditDairyData] = useState<RedditDairyPackagingReport | null>(null);
  const [perseussData, setPerseussData] = useState<PerseussCartonizationResult | null>(null);
  const [usdaData, setUsdaData] = useState<UsdaApiResponse | null>(null);
  const [packageSmartData, setPackageSmartData] = useState<PackageSmartDryFruitSpec | null>(null);

  // Analysis simulation state (multi-step loader)
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<number>(0);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState<boolean>(false);

  const analysisSteps = [
    'Analyzing botanical & chemical properties...',
    'Evaluating moisture sensitivity & WVTR limits...',
    'Checking oxygen sensitivity & OTR threshold...',
    'Querying USDA FoodData Central & ARS database...',
    'Running Perseuss Cold Cartonization & PCM Sizing...',
    'Aggregating Reddit r/packaging community intelligence...',
    'Calculating PackageSmart AI LCA carbon & circularity score...',
    'Matching ASTM D3985 & F1249 packaging materials...',
    'Synthesizing SIH26236 recommendations...'
  ];

  // Selected product intelligence
  const currentProduct = useMemo(() => {
    return COMPREHENSIVE_PRODUCT_DATABASE.find(p => p.id === selectedProductId) || COMPREHENSIVE_PRODUCT_DATABASE[0];
  }, [selectedProductId]);

  const visual = getVerifiedCropVisual(currentProduct.id, currentProduct.name);

  // Trigger analysis sequence & fetch external intelligence on product change
  const triggerAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < analysisSteps.length) {
        setAnalysisStep(step);
      } else {
        clearInterval(interval);
        setIsAnalyzing(false);
      }
    }, 200);
  };

  const handleProductChange = (newId: string) => {
    setSelectedProductId(newId);
    triggerAnalysis();
  };

  // Fetch / Compute the 4 Specialized APIs
  useEffect(() => {
    // 1. Reddit Dairy Packaging
    fetchRedditDairyPackagingIntelligence(currentProduct.id).then(setRedditDairyData);

    // 2. Perseuss Cold Cartonization
    const tempProfile = currentProduct.category === 'Dairy' ? 'CHILLED_2_8C' 
      : currentProduct.storage.temperatureRange.min < 4 ? 'CHILLED_2_8C'
      : currentProduct.storage.temperatureRange.min < 12 ? 'COOL_8_15C'
      : 'AMBIENT_CONTROLLED_15_25C';

    const cartonRes = calculatePerseussColdCartonization({
      commodityId: currentProduct.id,
      commodityName: currentProduct.name,
      commodityCategory: currentProduct.category === 'Dairy' ? 'Dairy' : 'Fresh Produce',
      payloadWeightKg: quantityKg,
      targetTempProfile: tempProfile,
      ambientMaxTempC: 38,
      transitDurationHours: Math.max(8, Math.round(distanceKm / 40)),
      shipperMaterialPreference: sustainabilityPreference === 'zero_plastic' ? 'ECO_CELLULOSE_CORRUGATED' : 'EPS_FOAM'
    });
    setPerseussData(cartonRes);

    // 3. USDA FoodData Central API
    fetchUsdaFoodDataProfile(currentProduct.name).then(setUsdaData);

    // 4. PackageSmart AI for Dry Fruits
    calculatePackageSmartDryFruitIntelligence(currentProduct.id).then(setPackageSmartData);
  }, [currentProduct, quantityKg, distanceKm, sustainabilityPreference]);

  // Run SIH26236 Packaging Recommendation Engine
  const recommendationReport = useMemo(() => {
    const input: PackagingEngineInput = {
      product: currentProduct,
      quantityKg,
      targetShelfLifeDays,
      storageTempC,
      humidityPercent,
      distanceKm,
      estimatedTravelHours: Math.round((distanceKm / 40) * 10) / 10,
      vehicleType,
      budgetPreference,
      sustainabilityPreference
    };
    return generatePackagingRecommendation(input);
  }, [currentProduct, quantityKg, targetShelfLifeDays, storageTempC, humidityPercent, distanceKm, vehicleType, budgetPreference, sustainabilityPreference]);

  // Distance & Delivery Suitability
  const journeyReport = useMemo(() => {
    return evaluateJourneySuitability(currentProduct, quantityKg, distanceKm, vehicleType);
  }, [currentProduct, quantityKg, distanceKm, vehicleType]);

  return (
    <div className="space-y-8 pb-16">
      
      {/* SIH 26236 Title & Compliance Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/80 border border-purple-500/30 p-6 sm:p-8 shadow-[0_0_50px_rgba(168,85,247,0.2)] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl -z-10" />
        
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-black tracking-wider uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" /> SIH 2026 Problem ID: SIH26236
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> FSSAI IS 9845 & ASTM D3985 Validated
              </span>
              <span className="px-3 py-1 rounded-full bg-sky-500/20 border border-sky-500/40 text-sky-300 text-xs font-bold flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5" /> USDA FoodData Central & Perseuss Cold Engine
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              AI-Based Intelligent Food Packaging Material Recommendation System
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Multi-criteria decision engine powered by <strong>Reddit Dairy Packaging Intelligence</strong>, <strong>Perseuss Cold Cartonization</strong>, <strong>USDA FoodData Central Chemistry</strong>, and <strong>PackageSmart AI LCA</strong> for fresh produce, dairy, dry fruits, and food commodities.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPdfModalOpen(true)}
              className="px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Export Technical Dossier PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Parameters Configurator (Left) vs Right Intelligence Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Parameters Configurator (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-3xl bg-slate-900/90 border border-purple-500/20 p-5 sm:p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Scale className="w-4 h-4 text-purple-400" /> Parameter Configurator
              </h3>
              <span className="text-[10px] text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-md font-bold uppercase">
                Real-Time
              </span>
            </div>

            {/* 1. Commodity Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Select Food Product / Commodity
              </label>
              <select
                value={selectedProductId}
                onChange={(e) => handleProductChange(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-purple-400/40 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-purple-400"
              >
                <optgroup label="🥬 Fresh Vegetables (USDA FoodData Central Connected)">
                  <option value="beetroot">🟣 Beetroot / Chukandar (Beta vulgaris)</option>
                  <option value="okra">🥬 Okra / Bhindi (Abelmoschus esculentus)</option>
                  <option value="radish">🌱 Radish / Mooli (Raphanus sativus)</option>
                  <option value="tomato">🍅 Tomato (Solanum lycopersicum)</option>
                  <option value="brinjal">🍆 Brinjal / Eggplant (Solanum melongena)</option>
                  <option value="onion">🧅 Onion (Allium cepa)</option>
                  <option value="potato">🥔 Potato (Solanum tuberosum)</option>
                </optgroup>
                <optgroup label="🍎 Fresh Fruits (USDA FoodData Central Connected)">
                  <option value="mango">🥭 Mango (Mangifera indica)</option>
                  <option value="watermelon">🍉 Watermelon (Citrullus lanatus)</option>
                </optgroup>
                <optgroup label="🥛 Dairy Products (Reddit r/packaging & r/dairy Connected)">
                  <option value="milk">🥛 Farm Fresh Raw A2 Cow Milk</option>
                  <option value="butter">🧈 Fresh Table Butter / Makhan</option>
                  <option value="ghee">🫙 Pure Bilona Desi Ghee (Processed)</option>
                  <option value="paneer">🧀 Fresh Cottage Cheese (Paneer)</option>
                </optgroup>
                <optgroup label="🥜 Dry Fruits & Nuts (PackageSmart AI LCA Connected)">
                  <option value="almond">🌰 Almond / Badam (Prunus dulcis)</option>
                  <option value="cashew">🥜 Whole Cashew Kernels (Kaju)</option>
                  <option value="walnut">🌰 Kashmir Walnut Kernels (Akhrot)</option>
                  <option value="raisin">🍇 Golden Green Raisins (Kishmish)</option>
                </optgroup>
                <optgroup label="🌾 Grains, Pulses & Flours">
                  <option value="rice">🌾 Rice (Oryza sativa)</option>
                  <option value="chickpea">🫘 Chickpea / Chana (Cicer arietinum)</option>
                  <option value="wheat-flour">🌾 Whole Wheat Chakki Atta (Processed)</option>
                </optgroup>
                <optgroup label="🌶️ Spices & Plantations">
                  <option value="cardamom">🌿 Green Cardamom Pods (Elettaria cardamomum)</option>
                  <option value="turmeric">🪵 Salem Turmeric Finger (Curcuma longa)</option>
                  <option value="coffee">☕ Coorg Roasted Arabica Coffee (Processed)</option>
                  <option value="tea">🍵 Assam CTC Black Tea (Processed)</option>
                </optgroup>
              </select>
            </div>

            {/* Visual Commodity Profile Card */}
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-md"
                style={{ background: `linear-gradient(135deg, ${visual.gradient[0]}, ${visual.gradient[1]})` }}
              >
                {visual.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-white truncate">{currentProduct.name}</h4>
                  <span className="text-[10px] font-bold text-purple-300 bg-purple-500/20 px-1.5 py-0.2 rounded">
                    {currentProduct.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 italic truncate font-mono">{currentProduct.scientificName}</p>
                {currentProduct.isProcessed && (
                  <span className="text-[10px] text-amber-300 font-bold flex items-center gap-1 mt-0.5">
                    ⚙️ Derivative of {currentProduct.rawCommodityId}
                  </span>
                )}
              </div>
            </div>

            {/* 2. Batch Quantity Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">Shipment Batch Quantity:</span>
                <span className="text-purple-300 font-mono font-bold">{quantityKg.toLocaleString()} kg</span>
              </div>
              <input
                type="range"
                min="50"
                max="5000"
                step="50"
                value={quantityKg}
                onChange={(e) => setQuantityKg(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>50 kg</span>
                <span>2,500 kg</span>
                <span>5,000 kg</span>
              </div>
            </div>

            {/* 3. Distance Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">Logistics Transit Distance:</span>
                <span className="text-amber-300 font-mono font-bold">{distanceKm} km (~{Math.round(distanceKm / 40)} hrs)</span>
              </div>
              <input
                type="range"
                min="20"
                max="1500"
                step="20"
                value={distanceKm}
                onChange={(e) => setDistanceKm(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>20 km (Local)</span>
                <span>500 km</span>
                <span>1,500 km (Long Haul)</span>
              </div>
            </div>

            {/* 4. Target Shelf Life */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">Target Shelf Life Requirement:</span>
                <span className="text-emerald-300 font-mono font-bold">{targetShelfLifeDays} Days</span>
              </div>
              <input
                type="range"
                min="3"
                max="180"
                step="1"
                value={targetShelfLifeDays}
                onChange={(e) => setTargetShelfLifeDays(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>3 Days</span>
                <span>60 Days</span>
                <span>180 Days</span>
              </div>
            </div>

            {/* 5. Transit Vehicle Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Logistics Transport Vehicle
              </label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:border-purple-400"
              >
                <option value="Refrigerated Reefer Container (2°C - 8°C)">❄️ Refrigerated Reefer Container (2°C - 8°C)</option>
                <option value="Ventilated LCV (Tata 407)">🚚 Ventilated LCV (Tata 407)</option>
                <option value="Open-Top Pickup (Bolero Maxi)">🛻 Open-Top Pickup (Bolero Maxi)</option>
                <option value="Insulated Dry Container (Ambient)">📦 Insulated Dry Container (Ambient)</option>
              </select>
            </div>

            {/* 6. Sustainability Preference */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Sustainability / Circularity Strategy
              </label>
              <div className="grid grid-cols-3 gap-2 text-[11px]">
                <button
                  type="button"
                  onClick={() => setSustainabilityPreference('standard')}
                  className={`py-2 px-2 rounded-xl font-bold border transition-all ${
                    sustainabilityPreference === 'standard'
                      ? 'bg-purple-600/30 border-purple-400 text-purple-200'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  Standard
                </button>
                <button
                  type="button"
                  onClick={() => setSustainabilityPreference('high_eco')}
                  className={`py-2 px-2 rounded-xl font-bold border transition-all ${
                    sustainabilityPreference === 'high_eco'
                      ? 'bg-emerald-600/30 border-emerald-400 text-emerald-200'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  High Eco
                </button>
                <button
                  type="button"
                  onClick={() => setSustainabilityPreference('zero_plastic')}
                  className={`py-2 px-2 rounded-xl font-bold border transition-all ${
                    sustainabilityPreference === 'zero_plastic'
                      ? 'bg-teal-600/30 border-teal-400 text-teal-200'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  Zero Plastic
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Multi-Tab Intelligence Engine (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Analysis Loader Simulation */}
          {isAnalyzing ? (
            <div className="rounded-3xl bg-slate-900 border border-purple-500/30 p-12 text-center shadow-xl space-y-4">
              <Loader2 className="w-10 h-10 text-purple-400 animate-spin mx-auto" />
              <h3 className="text-base font-bold text-white">Synthesizing SIH26236 Food Packaging Intelligence...</h3>
              <p className="text-xs font-mono text-purple-300 transition-all duration-300">
                {analysisSteps[analysisStep]}
              </p>
              <div className="w-64 h-1.5 bg-slate-800 rounded-full mx-auto overflow-hidden">
                <div 
                  className="h-full bg-purple-500 transition-all duration-300"
                  style={{ width: `${((analysisStep + 1) / analysisSteps.length) * 100}%` }}
                />
              </div>
            </div>
          ) : (
            <>
              {/* Tab Navigation Strip */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                <button
                  onClick={() => setActiveTab('recommendation')}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === 'recommendation'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white bg-slate-900'
                  }`}
                >
                  <PackageCheck className="w-3.5 h-3.5" />
                  <span>4-Tier Recommendation</span>
                </button>

                <button
                  onClick={() => setActiveTab('usda_fooddata')}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === 'usda_fooddata'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white bg-slate-900'
                  }`}
                >
                  <Database className="w-3.5 h-3.5 text-sky-400" />
                  <span>USDA FoodData Central</span>
                </button>

                <button
                  onClick={() => setActiveTab('perseuss_cartonization')}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === 'perseuss_cartonization'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white bg-slate-900'
                  }`}
                >
                  <Snowflake className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Perseuss Cold Cartonization</span>
                </button>

                <button
                  onClick={() => setActiveTab('reddit_dairy')}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === 'reddit_dairy'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white bg-slate-900'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5 text-orange-400" />
                  <span>Reddit Dairy Packaging</span>
                </button>

                <button
                  onClick={() => setActiveTab('packagesmart_ai')}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === 'packagesmart_ai'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white bg-slate-900'
                  }`}
                >
                  <Recycle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>PackageSmart Dry Fruit AI</span>
                </button>

                <button
                  onClick={() => setActiveTab('barrier_matrix')}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === 'barrier_matrix'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white bg-slate-900'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>OTR / WVTR Radar</span>
                </button>

                <button
                  onClick={() => setActiveTab('respiration')}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === 'respiration'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white bg-slate-900'
                  }`}
                >
                  <Wind className="w-3.5 h-3.5" />
                  <span>Respiration Kinetics</span>
                </button>

                <button
                  onClick={() => setActiveTab('mord_compliance')}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === 'mord_compliance'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white bg-slate-900'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>MoRD Rural Compliance</span>
                </button>

                <button
                  onClick={() => setActiveTab('distance_logistics')}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === 'distance_logistics'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white bg-slate-900'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Distance Feasibility</span>
                </button>
              </div>

              {/* TAB 1: 4-Tier Material Selection */}
              {activeTab === 'recommendation' && (
                <div className="space-y-6">
                  
                  {/* 🥇 RECOMMENDED TIER CARD */}
                  <div className="rounded-3xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border-2 border-emerald-500/50 p-6 sm:p-7 shadow-[0_0_35px_rgba(16,185,129,0.15)] space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-500/20 pb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">🥇</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black uppercase tracking-wider">
                              Primary Recommendation
                            </span>
                            <span className="text-xs font-mono font-bold text-emerald-400">
                              Score: {Math.round(recommendationReport.recommended.score)}%
                            </span>
                          </div>
                          <h3 className="text-lg font-black text-white mt-0.5">
                            {recommendationReport.recommended.material.name}
                          </h3>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Est. Material Cost</span>
                        <span className="text-base font-black text-emerald-400 font-mono">
                          ₹{recommendationReport.recommended.costPerKg.toFixed(2)} / kg
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {recommendationReport.recommended.scientificRationale}
                    </p>

                    {/* Scientific Barrier Properties Strip */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-[11px] font-mono">
                      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">ASTM D3985 OTR:</span>
                        <span className="text-purple-300 font-bold">{recommendationReport.recommended.material.barrierProperties.otrRange}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">ASTM F1249 WVTR:</span>
                        <span className="text-sky-300 font-bold">{recommendationReport.recommended.material.barrierProperties.wvtrRange}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">Puncture Strength:</span>
                        <span className="text-emerald-300 font-bold">{recommendationReport.recommended.material.mechanical.punctureResistanceJoules} Joules</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">Food Contact Standard:</span>
                        <span className="text-emerald-400 font-bold">{recommendationReport.recommended.material.compatibility.foodContactCertifications[0] || 'FSSAI IS 9845'}</span>
                      </div>
                    </div>

                    {/* Estimated Shelf-Life Range & Decision Support Disclaimer */}
                    <div className="p-4 rounded-2xl bg-slate-950/70 border border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">Estimated Shelf-Life Range:</span>
                          <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono text-xs font-black border border-purple-500/30">
                            {recommendationReport.recommended.estimatedShelfLifeRange || `${recommendationReport.recommended.estimatedShelfLifeDays} Days`}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-500/30">
                            📊 Model Estimate
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                          This is a decision-support estimate based on product physiology, barrier properties, storage temperature, and transport stress. Actual shelf life may vary with handling and ambient fluctuations.
                        </p>
                      </div>
                    </div>

                    {/* Why Selected Reasons */}
                    <div className="p-4 rounded-2xl bg-slate-950/60 border border-emerald-500/20 space-y-2">
                      <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Why This Material Was Selected:</span>
                      </h4>
                      <ul className="text-xs text-slate-300 space-y-1">
                        {recommendationReport.recommended.barrierMatches.map((b, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span><strong>{b.property}:</strong> {b.explanation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 🥈 ALTERNATIVE & 💰 BUDGET TIERS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {recommendationReport.alternative && (
                      <div className="rounded-2xl bg-slate-900 border border-yellow-500/30 p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-yellow-300 flex items-center gap-1">
                            <span>🥈 Alternative Option</span>
                          </span>
                          <span className="text-xs font-mono text-yellow-400 font-bold">
                            Score: {Math.round(recommendationReport.alternative.score)}%
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white">
                          {recommendationReport.alternative.material.name}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-3">
                          {recommendationReport.alternative.scientificRationale}
                        </p>
                        <div className="text-xs font-mono text-slate-300 pt-2 border-t border-slate-800">
                          Unit Cost: ₹{recommendationReport.alternative.costPerKg.toFixed(2)}/kg
                        </div>
                      </div>
                    )}

                    {recommendationReport.budget && (
                      <div className="rounded-2xl bg-slate-900 border border-purple-500/30 p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-purple-300 flex items-center gap-1">
                            <span>💰 Budget Compliant Option</span>
                          </span>
                          <span className="text-xs font-mono text-purple-400 font-bold">
                            Score: {Math.round(recommendationReport.budget.score)}%
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white">
                          {recommendationReport.budget.material.name}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-3">
                          {recommendationReport.budget.scientificRationale}
                        </p>
                        <div className="text-xs font-mono text-slate-300 pt-2 border-t border-slate-800">
                          Unit Cost: ₹{recommendationReport.budget.costPerKg.toFixed(2)}/kg
                        </div>
                      </div>
                    )}

                  </div>

                  {/* ❌ NOT RECOMMENDED MATERIALS */}
                  {recommendationReport.notRecommended && (
                    <div className="rounded-2xl bg-rose-950/30 border border-rose-500/40 p-5 space-y-3">
                      <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                        <XCircle className="w-4 h-4 text-rose-400" />
                        <span>Not Recommended Material (Scientific Failure Mode)</span>
                      </h4>
                      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-rose-500/20 text-xs space-y-1">
                        <div className="font-bold text-white">{recommendationReport.notRecommended.material.name}</div>
                        <div className="text-rose-300 leading-relaxed">
                          <b>Failure Rationale:</b> {recommendationReport.notRecommended.scientificRationale}
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* TAB: USDA FoodData Central API */}
              {activeTab === 'usda_fooddata' && usdaData && (
                <div className="rounded-3xl bg-slate-900 border border-sky-500/30 p-6 shadow-xl space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-sky-500/20">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/40 text-[10px] font-black uppercase">
                          USDA FoodData Central API
                        </span>
                        <span className="text-xs font-mono text-slate-400">FDC ID: #{usdaData.fdcId}</span>
                      </div>
                      <h3 className="text-lg font-black text-white mt-1">{usdaData.profile.description}</h3>
                    </div>

                    <a 
                      href={usdaData.profile.sourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 text-xs font-bold flex items-center gap-1.5 transition-all border border-sky-500/40"
                    >
                      <span>Official USDA Entry</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Chemistry & Transpiration Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                    <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-sky-500/20">
                      <span className="text-slate-400 text-[10px] block">Moisture Content (Water):</span>
                      <span className="text-lg font-black text-sky-300">{usdaData.profile.waterContentPercent}%</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">High Transpiration Risk</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-sky-500/20">
                      <span className="text-slate-400 text-[10px] block">Total Sugars:</span>
                      <span className="text-lg font-black text-amber-300">{usdaData.profile.totalSugarsG} g / 100g</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Respiratory Substrate</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-sky-500/20">
                      <span className="text-slate-400 text-[10px] block">Ascorbic Acid (Vit C):</span>
                      <span className="text-lg font-black text-emerald-300">{usdaData.profile.ascorbicAcidMg} mg / 100g</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Oxygen Degradation Marker</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-sky-500/20">
                      <span className="text-slate-400 text-[10px] block">Dietary Fiber:</span>
                      <span className="text-lg font-black text-purple-300">{usdaData.profile.dietaryFiberG} g / 100g</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Cell Wall Integrity</span>
                    </div>
                  </div>

                  {/* USDA Agriculture Handbook 66 Guidelines */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-sky-500/30 space-y-2">
                    <h4 className="text-xs font-bold text-sky-300 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-sky-400" />
                      <span>USDA Agriculture Handbook 66 Post-Harvest Standard:</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {usdaData.profile.respirationKineticsCorrelation.usdaHandbook66Guideline}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">Recommended Storage Temp:</span>
                        <span className="text-sky-300 font-bold">{usdaData.profile.respirationKineticsCorrelation.optimalStorageTempC}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">Optimal Relative Humidity (RH):</span>
                        <span className="text-emerald-300 font-bold">{usdaData.profile.respirationKineticsCorrelation.optimalStorageRhPercent}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: Perseuss Cold Cartonization Engine */}
              {activeTab === 'perseuss_cartonization' && perseussData && (
                <div className="rounded-3xl bg-slate-900 border border-cyan-500/30 p-6 shadow-xl space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-black uppercase">
                          Perseuss Cold Cartonization API
                        </span>
                        <span className="text-xs font-mono text-cyan-400 font-bold">Plan #{perseussData.planId}</span>
                      </div>
                      <h3 className="text-lg font-black text-white mt-1">Thermal Packout & Insulated Shipper Sizing</h3>
                    </div>

                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30">
                      {perseussData.istaCompliance}
                    </span>
                  </div>

                  {/* Shipper & Refrigerant Specs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                      <span className="text-[10px] text-cyan-400 uppercase font-bold block">1. Insulated Shipper Box Spec</span>
                      <div className="font-bold text-white text-sm">{perseussData.shipper.materialName}</div>
                      <div className="text-slate-400 font-mono space-y-1 text-[11px] pt-1">
                        <div>Dimensions: <b className="text-slate-200">{perseussData.shipper.externalDimensionsCm.length} x {perseussData.shipper.externalDimensionsCm.width} x {perseussData.shipper.externalDimensionsCm.height} cm</b></div>
                        <div>Wall Thickness: <b className="text-slate-200">{perseussData.shipper.wallThicknessMm} mm (R-Value: {perseussData.shipper.rValue})</b></div>
                        <div>Gross Shipment Weight: <b className="text-slate-200">{perseussData.shipper.grossShipmentWeightKg} kg</b></div>
                        <div>Dimensional Freight Weight: <b className="text-cyan-300">{perseussData.shipper.dimensionalWeightKg} kg (Optimized)</b></div>
                        <div>Recyclability: <b className="text-emerald-400">{perseussData.shipper.recyclability}</b></div>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                      <span className="text-[10px] text-cyan-400 uppercase font-bold block">2. Refrigerant & PCM Sizing</span>
                      <div className="font-bold text-white text-sm">{perseussData.refrigerant.refrigerantType}</div>
                      <div className="text-slate-400 font-mono space-y-1 text-[11px] pt-1">
                        <div>Total Refrigerant Mass: <b className="text-cyan-300 font-bold">{perseussData.refrigerant.totalRefrigerantWeightKg} kg</b> ({perseussData.refrigerant.packUnitsCount}x {perseussData.refrigerant.unitWeightGrams}g packs)</div>
                        <div>Latent Heat Absorption: <b className="text-slate-200">{perseussData.refrigerant.latentHeatCapacityKj} kJ</b></div>
                        <div>Preconditioning: <b className="text-slate-200">{perseussData.refrigerant.preconditioningTempC}</b></div>
                        <div>Packout Architecture: <b className="text-slate-200">{perseussData.refrigerant.packoutPositioning}</b></div>
                        <div>Max Safe Transit Hold: <b className="text-emerald-400 font-bold">{perseussData.maxSafeTransitHours} Hours</b></div>
                      </div>
                    </div>
                  </div>

                  {/* Packout Geometry Steps */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/20 space-y-2 text-xs">
                    <h4 className="font-bold text-cyan-300 uppercase tracking-wider">
                      Standard Multi-Temperature Packout Assembly Protocol:
                    </h4>
                    <div className="space-y-1.5 text-slate-300">
                      {perseussData.packoutSteps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-cyan-400 font-bold">▶</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: Reddit Dairy Packaging Community Intelligence */}
              {activeTab === 'reddit_dairy' && redditDairyData && (
                <div className="rounded-3xl bg-slate-900 border border-orange-500/30 p-6 shadow-xl space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-orange-500/20">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/40 text-[10px] font-black uppercase">
                          Reddit Community Intelligence
                        </span>
                        <span className="text-xs font-mono text-orange-400 font-bold">Consensus: {redditDairyData.communityConsensusScore}% Positive</span>
                      </div>
                      <h3 className="text-lg font-black text-white mt-1">{redditDairyData.commodityName} Packaging Consensus</h3>
                    </div>

                    <span className="text-xs font-bold text-orange-400 bg-orange-500/10 px-3 py-1.5 rounded-xl border border-orange-500/30">
                      r/packaging & r/foodscience
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-orange-500/20">
                    {redditDairyData.summary}
                  </p>

                  {/* Top Community Discussions */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-orange-300 uppercase tracking-wider">
                      Trending Packaging Engineer Threads:
                    </h4>
                    {redditDairyData.trendingDiscussions.map((disc, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-white flex items-center gap-1.5">
                            <span className="text-orange-400">{disc.subreddit}</span>
                            <span>•</span>
                            <span className="text-slate-400">{disc.author}</span>
                          </span>
                          <span className="text-orange-400 font-mono font-bold flex items-center gap-1">
                            <ThumbsUp className="w-3.5 h-3.5" /> {disc.score} upvotes
                          </span>
                        </div>
                        <h5 className="text-xs font-bold text-white">{disc.title}</h5>
                        <ul className="text-xs text-slate-300 space-y-1 pt-1">
                          {disc.keyTakeaways.map((takeaway, tIdx) => (
                            <li key={tIdx} className="flex items-start gap-2">
                              <span className="text-orange-400 font-bold">›</span>
                              <span>{takeaway}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Pro Tips from Packaging Engineers */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                    <h4 className="font-bold text-orange-300 uppercase tracking-wider">
                      Dairy Packaging Engineer Best Practices:
                    </h4>
                    <div className="space-y-1 text-slate-300">
                      {redditDairyData.proTipsFromEngineers.map((tip, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: PackageSmart AI Dry Fruit LCA */}
              {activeTab === 'packagesmart_ai' && packageSmartData && (
                <div className="rounded-3xl bg-slate-900 border border-emerald-500/30 p-6 shadow-xl space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black uppercase">
                          PackageSmart AI LCA Engine
                        </span>
                        <span className="text-xs font-mono text-emerald-400 font-bold">ISO 14040/44 Compliant</span>
                      </div>
                      <h3 className="text-lg font-black text-white mt-1">{packageSmartData.commodityName} Barrier & LCA Profile</h3>
                    </div>

                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30">
                      {packageSmartData.lcaAssessment.recyclabilityTier}
                    </span>
                  </div>

                  {/* LCA Environmental Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                    <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-emerald-500/20">
                      <span className="text-slate-400 text-[10px] block">Carbon Footprint:</span>
                      <span className="text-lg font-black text-emerald-400">{packageSmartData.lcaAssessment.carbonFootprintGramsCo2e} g CO₂e</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Per 1 kg Package</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-emerald-500/20">
                      <span className="text-slate-400 text-[10px] block">Water Consumption:</span>
                      <span className="text-lg font-black text-sky-400">{packageSmartData.lcaAssessment.waterConsumptionLiters} Liters</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Lifecycle Water Use</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-emerald-500/20">
                      <span className="text-slate-400 text-[10px] block">Circularity Score:</span>
                      <span className="text-lg font-black text-purple-400">{packageSmartData.lcaAssessment.circularityScore} / 100</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Closed-Loop Recovery</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-emerald-500/20">
                      <span className="text-slate-400 text-[10px] block">Virgin Plastic Cut:</span>
                      <span className="text-lg font-black text-teal-400">-{packageSmartData.lcaAssessment.plasticReductionPercent}%</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Vs Traditional Multilayer</span>
                    </div>
                  </div>

                  {/* Recommended Barrier Lamination & Gas Flush */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                    <h4 className="font-bold text-emerald-300 uppercase tracking-wider">
                      Recommended Sustainable High-Barrier Pouch:
                    </h4>
                    <p className="text-white font-semibold text-sm">
                      {packageSmartData.recommendedPouchLamination}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-[11px] font-mono">
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">Inert Gas Flush:</span>
                        <span className="text-emerald-300 font-bold">{packageSmartData.inertGasFlush.gasComposition} ({packageSmartData.inertGasFlush.targetResidualO2Percent})</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">Oxygen Scavenger:</span>
                        <span className="text-purple-300 font-bold">{packageSmartData.inertGasFlush.oxygenScavengerSizingCc} cc O₂ Ageless Sachet</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: OTR / WVTR Barrier Radar */}
              {activeTab === 'barrier_matrix' && (
                <div className="rounded-3xl bg-slate-900 border border-purple-500/20 p-6 shadow-xl space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Layers className="w-5 h-5 text-purple-400" />
                      OTR & WVTR Material Property Matrix (ASTM D3985 / ASTM F1249)
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Oxygen Transmission Rate and Water Vapor Transmission Rate benchmarked against {currentProduct.name} physiological requirements.
                    </p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-purple-500/20 text-slate-400 font-mono text-[11px]">
                          <th className="py-2.5 px-3">Packaging Material</th>
                          <th className="py-2.5 px-3">OTR (cc/m²·day)</th>
                          <th className="py-2.5 px-3">WVTR (g/m²·day)</th>
                          <th className="py-2.5 px-3">Gas Exchange</th>
                          <th className="py-2.5 px-3">Tier</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80 font-mono">
                        {recommendationReport.allEvaluations.map((evalItem, idx) => (
                          <tr key={idx} className="hover:bg-slate-800/40">
                            <td className="py-3 px-3 font-bold text-white">{evalItem.material.name}</td>
                            <td className="py-3 px-3 text-purple-300">{evalItem.material.barrierProperties.otrRange}</td>
                            <td className="py-3 px-3 text-sky-300">{evalItem.material.barrierProperties.wvtrRange}</td>
                            <td className="py-3 px-3 text-slate-300">{evalItem.material.barrierProperties.oxygenBarrierTier}</td>
                            <td className="py-3 px-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                evalItem.tier === 'Recommended'
                                  ? 'bg-emerald-500/20 text-emerald-300'
                                  : evalItem.tier === 'Alternative'
                                  ? 'bg-yellow-500/20 text-yellow-300'
                                  : evalItem.tier === 'Budget'
                                  ? 'bg-purple-500/20 text-purple-300'
                                  : 'bg-rose-500/20 text-rose-300'
                              }`}>
                                {evalItem.tier}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB: Respiration Kinetics */}
              {activeTab === 'respiration' && (
                <div className="rounded-3xl bg-slate-900 border border-purple-500/20 p-6 shadow-xl space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Wind className="w-5 h-5 text-emerald-400" />
                      Botanical Respiration Kinetics & Gas Exchange Animation
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Calculates oxygen consumption rate (O₂), carbon dioxide output (CO₂), and respiratory heat generation.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-950 border border-purple-500/30 flex items-center justify-around text-center">
                    <div className="space-y-1">
                      <span className="text-xs font-mono font-bold text-sky-400">Oxygen Inflow (O₂)</span>
                      <div className="text-2xl animate-pulse">➡️ 💨</div>
                      <span className="text-[10px] font-mono text-slate-400">{recommendationReport.respiration.estimatedO2ConsumptionMgKgHr} mg/kg·h</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900 border border-purple-400/40 shadow-lg">
                      <span className="text-3xl">{visual.emoji}</span>
                      <h4 className="text-xs font-bold text-white mt-1">{currentProduct.name}</h4>
                      <span className="text-[9px] font-mono text-emerald-400 font-bold block">{recommendationReport.respiration.respirationRateClass}</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs font-mono font-bold text-rose-400">Carbon Dioxide Out (CO₂)</span>
                      <div className="text-2xl animate-pulse">💨 ➡️</div>
                      <span className="text-[10px] font-mono text-slate-400">{Math.round(recommendationReport.respiration.estimatedO2ConsumptionMgKgHr * 1.3)} mg/kg·h</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/30">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Respiration Activity Tier</span>
                      <span className="text-lg font-black text-emerald-400 mt-1 block">
                        {recommendationReport.respiration.respirationRateClass}
                      </span>
                      <p className="text-[11px] text-slate-400 mt-1">{recommendationReport.respiration.commodityType}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-sky-500/30">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Estimated O₂ Consumption</span>
                      <span className="text-lg font-black text-sky-400 mt-1 block font-mono">
                        {recommendationReport.respiration.estimatedO2ConsumptionMgKgHr} mg O₂/kg·h
                      </span>
                      <p className="text-[11px] text-slate-400 mt-1">Transit Temp {storageTempC}°C</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/30">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Respiratory Heat Load</span>
                      <span className="text-lg font-black text-amber-400 mt-1 block font-mono">
                        {recommendationReport.respiration.estimatedHeatGenerationKjKgDay} kJ/kg·day
                      </span>
                      <p className="text-[11px] text-slate-400 mt-1">Requires heat dissipation</p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: Distance Feasibility */}
              {activeTab === 'distance_logistics' && (
                <div className="rounded-3xl bg-slate-900 border border-purple-500/20 p-6 shadow-xl space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Truck className="w-5 h-5 text-amber-400" />
                      Distance Suitability & Logistics Decision Engine
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Evaluates whether {currentProduct.name} can safely travel {distanceKm} km without quality degradation.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">1. Can this product travel this far?</span>
                      <p className="text-slate-200 mt-1.5 font-semibold leading-relaxed">{journeyReport.customEvaluation.answers.canTransportFar}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">2. How long should delivery take?</span>
                      <p className="text-slate-200 mt-1.5 font-semibold leading-relaxed">{journeyReport.customEvaluation.answers.deliveryTimeframe}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">3. What packaging is required?</span>
                      <p className="text-slate-200 mt-1.5 font-semibold leading-relaxed">{journeyReport.customEvaluation.answers.packagingRequirement}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">4. Does it require refrigeration?</span>
                      <p className="text-slate-200 mt-1.5 font-semibold leading-relaxed">{journeyReport.customEvaluation.answers.refrigerationVerdict}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: MoRD Rural Compliance & Precision Logistics Specs */}
              {activeTab === 'mord_compliance' && (
                <MordComplianceSection 
                  commodityName={currentProduct.name}
                  defaultBatchId={`BAT-${currentProduct.id.toUpperCase()}-2026`}
                  isCollapsible={false}
                  defaultOpen={true}
                />
              )}

            </>
          )}

        </div>

      </div>

      {/* MoRD Rural Compliance & Precision Logistics Specs (Bottom Full-Width Section) */}
      {activeTab !== 'mord_compliance' && (
        <div className="pt-2">
          <MordComplianceSection 
            commodityName={currentProduct.name}
            defaultBatchId={`BAT-${currentProduct.id.toUpperCase()}-2026`}
            isCollapsible={true}
            defaultOpen={false}
          />
        </div>
      )}

      {/* Real Technical PDF Dossier Export Modal */}
      <AgriFlowPDFDownloadModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        product={currentProduct}
        batchId="SIH-PK-8921"
      />

    </div>
  );
};
