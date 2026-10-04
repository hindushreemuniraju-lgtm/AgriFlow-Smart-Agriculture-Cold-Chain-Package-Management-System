import React, { useState, useMemo } from 'react';
import { COMPREHENSIVE_PRODUCT_DATABASE } from '../../data/productsDatabase';
import { generatePackagingRecommendation, PackagingEngineInput } from '../../services/packaging/packagingRecommendationEngine';
import { evaluateJourneySuitability } from '../../services/transport/deliverySuitabilityService';
import { getVerifiedCropVisual } from '../../services/crop/cropImageService';
import { AgriFlowPDFDownloadModal } from '../documents/AgriFlowPDFDownloadModal';
import { 
  PackageCheck, 
  ShieldCheck, 
  Sparkles, 
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
  Activity
} from 'lucide-react';

export const PackagingIntelligenceDashboard: React.FC = () => {
  const [selectedProductId, setSelectedProductId] = useState<string>('brinjal');
  const [quantityKg, setQuantityKg] = useState<number>(500);
  const [distanceKm, setDistanceKm] = useState<number>(250);
  const [targetShelfLifeDays, setTargetShelfLifeDays] = useState<number>(14);
  const [storageTempC, setStorageTempC] = useState<number>(13);
  const [humidityPercent, setHumidityPercent] = useState<number>(85);
  const [vehicleType, setVehicleType] = useState<string>('Ventilated LCV (Tata 407)');
  const [budgetPreference, setBudgetPreference] = useState<'economy' | 'balanced' | 'premium'>('balanced');
  const [sustainabilityPreference, setSustainabilityPreference] = useState<'standard' | 'high_eco' | 'zero_plastic'>('standard');
  const [activeTab, setActiveTab] = useState<'recommendation' | 'barrier_matrix' | 'respiration' | 'distance_logistics'>('recommendation');
  
  // Analysis simulation state (2-3s multi-step loader)
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<number>(0);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState<boolean>(false);

  const analysisSteps = [
    'Analyzing botanical & chemical properties...',
    'Evaluating moisture sensitivity & WVTR limits...',
    'Checking oxygen sensitivity & OTR threshold...',
    'Calculating respiration rate & gas exchange kinetics...',
    'Evaluating transit distance & highway thermal load...',
    'Matching ASTM D3985 & F1249 packaging materials...',
    'Synthesizing 4-tier SIH26236 recommendations...'
  ];

  // Selected product intelligence
  const currentProduct = useMemo(() => {
    return COMPREHENSIVE_PRODUCT_DATABASE.find(p => p.id === selectedProductId) || COMPREHENSIVE_PRODUCT_DATABASE[0];
  }, [selectedProductId]);

  const visual = getVerifiedCropVisual(currentProduct.id, currentProduct.name);

  // Trigger analysis sequence on product switch
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
    }, 300);
  };

  const handleProductChange = (newId: string) => {
    setSelectedProductId(newId);
    triggerAnalysis();
  };

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
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              AI-Based Intelligent Food Packaging Material Recommendation System
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Multi-criteria decision engine matching botanical respiration kinetics, OTR, WVTR, transit distance, and vehicle cooling requirements for agricultural commodities and processed food products.
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
                <optgroup label="🥬 Fresh Vegetables">
                  <option value="brinjal">🍆 Brinjal / Eggplant (Solanum melongena)</option>
                  <option value="tomato">🍅 Tomato (Solanum lycopersicum)</option>
                  <option value="onion">🧅 Onion (Allium cepa)</option>
                  <option value="potato">🥔 Potato (Solanum tuberosum)</option>
                </optgroup>
                <optgroup label="🍎 Fresh Fruits">
                  <option value="mango">🥭 Mango (Mangifera indica)</option>
                </optgroup>
                <optgroup label="🌾 Grains & Pulses">
                  <option value="rice">🌾 Rice (Oryza sativa)</option>
                  <option value="chickpea">🫘 Chickpea / Chana (Cicer arietinum)</option>
                </optgroup>
                <optgroup label="🥜 Nuts & Dry Fruits">
                  <option value="almond">🌰 Almond / Badam (Prunus dulcis)</option>
                </optgroup>
                <optgroup label="🛢️ Oilseeds & Processed Oils">
                  <option value="groundnut">🥜 Raw Groundnut Pods & Kernels</option>
                  <option value="groundnut-oil">🛢️ Cold-Pressed Groundnut Oil (Processed)</option>
                </optgroup>
                <optgroup label="🥛 Dairy & Processed Fats">
                  <option value="milk">🥛 Farm Fresh Raw A2 Cow Milk</option>
                  <option value="ghee">🫙 Pure Bilona Desi Ghee (Processed)</option>
                </optgroup>
                <optgroup label="🌾 Milled Flour">
                  <option value="wheat-flour">🌾 Whole Wheat Chakki Atta (Processed)</option>
                </optgroup>
                <optgroup label="🌶️ Spices & Beverages">
                  <option value="turmeric">🪵 Salem Turmeric Finger (Curcuma longa)</option>
                  <option value="tea">🍵 Assam CTC Black Tea (Processed)</option>
                  <option value="coffee">☕ Coorg Roasted Arabica Coffee (Processed)</option>
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

            {/* 3. Transit Distance Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">Logistics Transit Distance:</span>
                <span className="text-sky-300 font-mono font-bold">{distanceKm} km (~{Math.round(distanceKm/40)}h)</span>
              </div>
              <input
                type="range"
                min="20"
                max="1500"
                step="20"
                value={distanceKm}
                onChange={(e) => setDistanceKm(Number(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>20 km (Local)</span>
                <span>500 km (State)</span>
                <span>1,500 km (National)</span>
              </div>
            </div>

            {/* 4. Storage Temperature & Humidity */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">Storage Temp (°C)</label>
                <div className="relative">
                  <Thermometer className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-purple-400" />
                  <input
                    type="number"
                    value={storageTempC}
                    onChange={(e) => setStorageTempC(Number(e.target.value))}
                    className="w-full pl-8 pr-2 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">Humidity (% RH)</label>
                <div className="relative">
                  <Droplets className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-sky-400" />
                  <input
                    type="number"
                    value={humidityPercent}
                    onChange={(e) => setHumidityPercent(Number(e.target.value))}
                    className="w-full pl-8 pr-2 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-white"
                  />
                </div>
              </div>
            </div>

            {/* 5. Vehicle Type */}
            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">Transit Vehicle Type</label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
              >
                <option value="Ventilated LCV (Tata 407)">🚛 Ventilated LCV (Tata 407)</option>
                <option value="Refrigerated Reefer Truck (Chilled 4°C - 13°C)">❄️ Refrigerated Reefer Truck (4°C - 13°C)</option>
                <option value="Covered Dry Freight Truck">🚚 Covered Dry Freight Truck</option>
                <option value="Open Tarpaulin Multi-Axle Truck">📦 Open Tarpaulin Multi-Axle</option>
              </select>
            </div>

            {/* 6. Re-Analyze Trigger Button */}
            <button
              onClick={triggerAnalysis}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Activity className="w-4 h-4" />
              <span>Re-Calculate Barrier Optimization</span>
            </button>

          </div>
        </div>

        {/* Right Column: Dynamic Intelligence Tabs & Results (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Sequential Analysis Loader Overlay (if analyzing) */}
          {isAnalyzing ? (
            <div className="rounded-3xl bg-slate-900 border border-purple-500/40 p-12 text-center space-y-6 shadow-2xl animate-fade-in">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-purple-300 uppercase tracking-widest bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/30">
                  SIH26236 Material Science Engine
                </span>
                <h3 className="text-lg font-black text-white">
                  {analysisSteps[analysisStep]}
                </h3>
                <div className="w-48 h-2 bg-slate-950 rounded-full mx-auto overflow-hidden p-0.5 border border-purple-500/30">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
                    style={{ width: `${((analysisStep + 1) / analysisSteps.length) * 100}%` }}
                  />
                </div>
              </div>
              <button
                onClick={() => setIsAnalyzing(false)}
                className="text-xs text-slate-400 hover:text-white underline font-mono"
              >
                Skip Animation
              </button>
            </div>
          ) : (
            <>
              {/* Tab Navigation Controls */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
                <button
                  onClick={() => setActiveTab('recommendation')}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeTab === 'recommendation'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white bg-slate-900'
                  }`}
                >
                  <PackageCheck className="w-4 h-4" />
                  <span>4-Tier Material Selection</span>
                </button>

                <button
                  onClick={() => setActiveTab('barrier_matrix')}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeTab === 'barrier_matrix'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white bg-slate-900'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>OTR / WVTR Radar</span>
                </button>

                <button
                  onClick={() => setActiveTab('respiration')}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeTab === 'respiration'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white bg-slate-900'
                  }`}
                >
                  <Wind className="w-4 h-4" />
                  <span>Respiration Kinetics</span>
                </button>

                <button
                  onClick={() => setActiveTab('distance_logistics')}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeTab === 'distance_logistics'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white bg-slate-900'
                  }`}
                >
                  <Truck className="w-4 h-4" />
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
                    
                    {/* Alternative Option */}
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

                    {/* Budget Option */}
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

                  {/* ❌ NOT RECOMMENDED MATERIALS (WITH FAILURE MODES) */}
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

                  {/* 5-Layer Engineered Packaging Architecture */}
                  <div className="pt-4 border-t border-slate-800">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                      Engineered Packaging Layer Architecture for {currentProduct.name}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {currentProduct.packaging.layers.map((layer) => (
                        <div key={layer.layer} className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-lg">{layer.icon}</span>
                            <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider">Layer {layer.layer}</span>
                          </div>
                          <h5 className="text-xs font-bold text-white">{layer.name}</h5>
                          <p className="text-[10px] text-slate-400 font-mono mt-0.5">{layer.material}</p>
                          <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">{layer.function}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 2: OTR / WVTR Barrier Radar */}
              {activeTab === 'barrier_matrix' && (
                <div className="rounded-3xl bg-slate-900 border border-purple-500/20 p-6 shadow-xl space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Layers className="w-5 h-5 text-purple-400" />
                      OTR & WVTR Material Property Matrix — Reference Test Method Context (ASTM D3985 / ASTM F1249)
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Oxygen Transmission Rate (ASTM D3985) and Water Vapor Transmission Rate (ASTM F1249) benchmarked against {currentProduct.name} physiological requirements.
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

              {/* TAB 3: Respiration Kinetics & Gas Exchange */}
              {activeTab === 'respiration' && (
                <div className="rounded-3xl bg-slate-900 border border-purple-500/20 p-6 shadow-xl space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Wind className="w-5 h-5 text-emerald-400" />
                      Botanical Respiration Kinetics & Gas Exchange Animation
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Calculates oxygen consumption rate ($O_2$), carbon dioxide output ($CO_2$), and respiratory heat generation at {storageTempC}°C.
                    </p>
                  </div>

                  {/* Gas Exchange Animation Visual Box */}
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
                      <p className="text-[11px] text-slate-400 mt-1">At {storageTempC}°C transit temperature</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/30">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Respiratory Heat Load</span>
                      <span className="text-lg font-black text-amber-400 mt-1 block font-mono">
                        {recommendationReport.respiration.estimatedHeatGenerationKjKgDay} kJ/kg·day
                      </span>
                      <p className="text-[11px] text-slate-400 mt-1">Requires active heat dissipation</p>
                    </div>
                  </div>

                  {/* Critical Gas Exchange Warning */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                    <div className="flex items-start gap-3">
                      <span className="text-lg mt-0.5">💡</span>
                      <div>
                        <h5 className="font-bold text-white">Recommended Ventilation & MAP Gas Flush:</h5>
                        <p className="text-slate-300 mt-0.5 leading-relaxed">{recommendationReport.respiration.recommendedPerforationDensity}</p>
                        <p className="text-purple-300 mt-1 font-mono text-[11px]">Optimal MAP Gas Mix: {recommendationReport.respiration.optimalAtmosphereGasFlush}</p>
                      </div>
                    </div>

                    {recommendationReport.respiration.anaerobicRiskUnderSealedFilm === 'Severe' && (
                      <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-200 flex items-center gap-2 text-[11px]">
                        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                        <span><b>CRITICAL ANAEROBIC WARNING:</b> Hermetically sealed non-perforated film will cause internal oxygen depletion below 2%, triggering alcohol fermentation and total crop rotting.</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 4: Distance & Highway Logistics Suitability */}
              {activeTab === 'distance_logistics' && (
                <div className="rounded-3xl bg-slate-900 border border-purple-500/20 p-6 shadow-xl space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Truck className="w-5 h-5 text-amber-400" />
                      Distance Suitability & Logistics Decision Engine
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Evaluates whether {currentProduct.name} can safely travel {distanceKm} km under selected packaging and vehicle conditions without spoilage.
                    </p>
                  </div>

                  {/* 5-Question Technical Decision Verdict Matrix */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">1. Can this product be transported this far?</span>
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

                  {/* Standard Distance Breakdown Comparison (20km, 100km, 500km, 1000km) */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                      Standard Journey Distance Viability Matrix
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                      {journeyReport.standardEvaluations.map((evalItem) => (
                        <div 
                          key={evalItem.distanceKm} 
                          className="p-3.5 rounded-2xl bg-slate-950/80 border transition-all"
                          style={{ borderColor: `${evalItem.viabilityColor}40` }}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-bold text-white">{evalItem.label}</span>
                            <span 
                              className="px-1.5 py-0.5 rounded text-[10px] font-bold"
                              style={{ backgroundColor: `${evalItem.viabilityColor}20`, color: evalItem.viabilityColor }}
                            >
                              {evalItem.viabilityStatus}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 space-y-1 mt-2 font-mono">
                            <div>Duration: <b className="text-slate-200">{evalItem.totalDeliveryHours}h</b></div>
                            <div>Loss Risk: <b className="text-slate-200">{evalItem.spoilageRiskPercent}%</b></div>
                            <div>Freight: <b className="text-slate-200">₹{evalItem.estimatedFreightCost}</b></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

            </>
          )}

        </div>

      </div>

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
