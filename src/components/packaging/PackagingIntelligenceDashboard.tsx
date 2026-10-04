import React, { useState, useMemo } from 'react';
import { COMPREHENSIVE_PRODUCT_DATABASE } from '../../data/productsDatabase';
import { generatePackagingRecommendation, PackagingEngineInput } from '../../services/packaging/packagingRecommendationEngine';
import { evaluateJourneySuitability } from '../../services/transport/deliverySuitabilityService';
import { getVerifiedCropVisual } from '../../services/crop/cropImageService';
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
  DollarSign
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

  // Selected product intelligence
  const currentProduct = useMemo(() => {
    return COMPREHENSIVE_PRODUCT_DATABASE.find(p => p.id === selectedProductId) || COMPREHENSIVE_PRODUCT_DATABASE[0];
  }, [selectedProductId]);

  const visual = getVerifiedCropVisual(currentProduct.id, currentProduct.name);

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
              onClick={() => {
                alert(`Technical Packaging Dossier for ${currentProduct.name} generated successfully! Includes ASTM OTR/WVTR test certificates and FSSAI food contact compliance.`);
              }}
              className="px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Export Technical Dossier</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Controls (Commodity & Logistics Parameters) vs Right Intelligence Engine */}
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
                onChange={(e) => setSelectedProductId(e.target.value)}
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

            {/* 5. Logistics Fleet Class */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Logistics Vehicle Fleet
              </label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:border-purple-400"
              >
                <option value="Tata Ace (Open Ambient)">Tata Ace (Open Ambient Bed)</option>
                <option value="Ventilated LCV (Tata 407)">Ventilated LCV (Tata 407)</option>
                <option value="Temperature-Controlled Reefer Truck (12°C - 14°C)">Temperature-Controlled Reefer Truck (12°C - 14°C)</option>
                <option value="Insulated Milk Tanker (4°C)">Insulated Milk Tanker / Reefer (4°C)</option>
                <option value="Covered Dry Container Truck">Covered Dry Container Truck</option>
              </select>
            </div>

            {/* 6. Optimization Weights */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">Budget Weight</label>
                <select
                  value={budgetPreference}
                  onChange={(e) => setBudgetPreference(e.target.value as any)}
                  className="w-full px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200"
                >
                  <option value="economy">💰 Economy First</option>
                  <option value="balanced">⚖️ Balanced</option>
                  <option value="premium">💎 Maximum Protection</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">Sustainability</label>
                <select
                  value={sustainabilityPreference}
                  onChange={(e) => setSustainabilityPreference(e.target.value as any)}
                  className="w-full px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200"
                >
                  <option value="standard">Standard</option>
                  <option value="high_eco">🌿 High Recyclability</option>
                  <option value="zero_plastic">🌱 100% Bio-Compostable</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Technical Output Tabs (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Module Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-purple-500/20">
            <button
              onClick={() => setActiveTab('recommendation')}
              className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'recommendation'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <PackageCheck className="w-4 h-4 text-purple-300" />
              <span>Material Decision</span>
            </button>

            <button
              onClick={() => setActiveTab('barrier_matrix')}
              className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'barrier_matrix'
                  ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Layers className="w-4 h-4 text-sky-300" />
              <span>OTR / WVTR Matrix</span>
            </button>

            <button
              onClick={() => setActiveTab('respiration')}
              className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'respiration'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Wind className="w-4 h-4 text-emerald-300" />
              <span>Respiration Kinetics</span>
            </button>

            <button
              onClick={() => setActiveTab('distance_logistics')}
              className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'distance_logistics'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Truck className="w-4 h-4 text-amber-300" />
              <span>Distance Suitability</span>
            </button>
          </div>

          {/* TAB 1: Material Decision (🥇 Recommended, 🥈 Alternative, 💰 Budget, ❌ Not Recommended) */}
          {activeTab === 'recommendation' && (
            <div className="space-y-6">
              
              {/* 🥇 Top Recommended Card */}
              <div className="relative rounded-3xl bg-slate-900 border-2 border-emerald-500/50 p-6 shadow-[0_0_40px_rgba(16,185,129,0.2)] overflow-hidden">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🥇</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black uppercase tracking-widest">
                          Top Recommended Match (Score: {recommendationReport.recommended.score}/100)
                        </span>
                      </div>
                      <h3 className="text-lg font-black text-white mt-1">
                        {recommendationReport.recommended.material.name}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono">Code: {recommendationReport.recommended.material.code} • {recommendationReport.recommended.material.category}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-black text-emerald-400 font-mono">
                      ₹{recommendationReport.recommended.estimatedPackagingCostTotal.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-slate-400">₹{recommendationReport.recommended.costPerKg.toFixed(2)} / kg produce</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs leading-relaxed text-slate-200 mb-4">
                  <b className="text-emerald-300">Engineering Rationale: </b>
                  {recommendationReport.recommended.scientificRationale}
                </div>

                {/* Key Technical Highlights Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Oxygen Barrier</span>
                    <span className="font-bold text-white">{recommendationReport.recommended.material.barrierProperties.oxygenBarrierTier}</span>
                    <span className="text-[10px] text-slate-500 block truncate">{recommendationReport.recommended.material.barrierProperties.otrRange}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Moisture Barrier</span>
                    <span className="font-bold text-white">{recommendationReport.recommended.material.barrierProperties.moistureBarrierTier}</span>
                    <span className="text-[10px] text-slate-500 block truncate">{recommendationReport.recommended.material.barrierProperties.wvtrRange}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Estimated Shelf-Life</span>
                    <span className="font-bold text-emerald-400">~{recommendationReport.recommended.estimatedShelfLifeDays} Days</span>
                    <span className="text-[10px] text-slate-500 block">At {storageTempC}°C Cold Chain</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Eco Sustainability</span>
                    <span className="font-bold text-teal-300">{recommendationReport.recommended.material.compatibility.sustainabilityScore}/100</span>
                    <span className="text-[10px] text-slate-500 block">{recommendationReport.recommended.material.compatibility.recyclingSymbol}</span>
                  </div>
                </div>
              </div>

              {/* Secondary Alternatives Grid: 🥈 Alternative, 💰 Budget, ❌ Not Recommended */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* 🥈 Alternative Card */}
                <div className="rounded-3xl bg-slate-900/90 border border-indigo-500/30 p-5 shadow-lg flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xl">🥈</span>
                      <span className="text-[10px] font-bold text-indigo-300 uppercase bg-indigo-500/20 px-2 py-0.5 rounded">
                        Alternative ({recommendationReport.alternative.score}/100)
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      {recommendationReport.alternative.material.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3 mb-3">
                      {recommendationReport.alternative.scientificRationale}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Est. Outlay:</span>
                    <span className="font-bold text-indigo-300 font-mono">₹{recommendationReport.alternative.estimatedPackagingCostTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* 💰 Budget Option */}
                <div className="rounded-3xl bg-slate-900/90 border border-amber-500/30 p-5 shadow-lg flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xl">💰</span>
                      <span className="text-[10px] font-bold text-amber-300 uppercase bg-amber-500/20 px-2 py-0.5 rounded">
                        Budget Choice ({recommendationReport.budget.score}/100)
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      {recommendationReport.budget.material.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3 mb-3">
                      {recommendationReport.budget.scientificRationale}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Lowest Outlay:</span>
                    <span className="font-bold text-amber-400 font-mono">₹{recommendationReport.budget.estimatedPackagingCostTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* ❌ Not Recommended Alert */}
                <div className="rounded-3xl bg-slate-900/90 border border-rose-500/40 p-5 shadow-lg flex flex-col justify-between bg-rose-950/10">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xl">❌</span>
                      <span className="text-[10px] font-bold text-rose-300 uppercase bg-rose-500/20 px-2 py-0.5 rounded">
                        Not Recommended ({recommendationReport.notRecommended.score}/100)
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      {recommendationReport.notRecommended.material.name}
                    </h4>
                    <p className="text-[11px] text-rose-200 leading-relaxed line-clamp-3 mb-3">
                      {recommendationReport.notRecommended.scientificRationale}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-rose-900/50 text-[10px] text-rose-300 flex items-center gap-1 font-bold">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>Incompatible with {currentProduct.name}</span>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: OTR & WVTR Barrier Matching Matrix */}
          {activeTab === 'barrier_matrix' && (
            <div className="rounded-3xl bg-slate-900 border border-purple-500/20 p-6 shadow-xl space-y-5">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-sky-400" />
                  Product Requirement vs Material Capability Matrix
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  ASTM D3985 Oxygen Transmission Rate (OTR) and ASTM F1249 Water Vapor Transmission Rate (WVTR) property compatibility.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-purple-500/20 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-3">Barrier Property</th>
                      <th className="py-3 px-3">Commodity Demand ({currentProduct.name})</th>
                      <th className="py-3 px-3">Top Material Capability</th>
                      <th className="py-3 px-3">Compatibility</th>
                      <th className="py-3 px-3">Scientific Explanation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-medium">
                    {recommendationReport.recommended.barrierMatches.map((match, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-3 font-bold text-white">{match.property}</td>
                        <td className="py-3 px-3 text-slate-300">{match.productDemand}</td>
                        <td className="py-3 px-3 text-purple-300 font-mono">{match.materialCapability}</td>
                        <td className="py-3 px-3">
                          <span 
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
                            style={{ backgroundColor: `${match.statusColor}20`, color: match.statusColor }}
                          >
                            {match.status === 'Suitable' ? <CheckCircle2 className="w-3 h-3" /> : match.status === 'Acceptable' ? <Info className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                            {match.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-400 text-[11px] leading-snug">{match.explanation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Multi-Layer Structural Assembly View */}
              <div className="pt-4 border-t border-slate-800">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                  Engineered 3-Tier Packaging Layer Architecture
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

          {/* TAB 3: Respiration Kinetics & Gas Exchange */}
          {activeTab === 'respiration' && (
            <div className="rounded-3xl bg-slate-900 border border-purple-500/20 p-6 shadow-xl space-y-6">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Wind className="w-5 h-5 text-emerald-400" />
                  Botanical Respiration Kinetics & Gas Exchange Analysis
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Calculates oxygen consumption rate ($O_2$), carbon dioxide output ($CO_2$), and respiratory heat generation at {storageTempC}°C.
                </p>
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

              {/* Critical Gas Exchange Warning & Recommendation */}
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

        </div>

      </div>

    </div>
  );
};
