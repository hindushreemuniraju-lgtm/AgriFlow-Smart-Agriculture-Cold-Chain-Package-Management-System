import React, { useState } from 'react';
import { FarmerOrder } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { 
  GitMerge, 
  Check, 
  Truck, 
  MapPin, 
  TrendingDown, 
  Fuel, 
  Leaf, 
  Calendar, 
  ShieldCheck, 
  IndianRupee,
  Navigation,
  ArrowRight,
  Layers,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface RouteBatchOptimizerProps {
  orders: FarmerOrder[];
  onBatchDispatched: (orderIds: string[]) => void;
}

export const RouteBatchOptimizer: React.FC<RouteBatchOptimizerProps> = ({ orders, onBatchDispatched }) => {
  const { t } = useLanguage();
  
  // Available orders for bundling
  const availableOrders = orders.filter(o => o.status === 'Requested' || o.status === 'In Transit');
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>(
    availableOrders.slice(0, 2).map(o => o.id)
  );
  const [vehicleCapacityKg, setVehicleCapacityKg] = useState<number>(3500);
  const [optimizationResult, setOptimizationResult] = useState<any>(null);
  const [calculating, setCalculating] = useState<boolean>(false);

  const toggleSelectOrder = (id: string) => {
    if (selectedOrderIds.includes(id)) {
      setSelectedOrderIds(selectedOrderIds.filter(item => item !== id));
    } else {
      setSelectedOrderIds([...selectedOrderIds, id]);
    }
  };

  const handleCalculateOptimization = async () => {
    if (selectedOrderIds.length < 2) return;
    setCalculating(true);

    try {
      const res = await fetch('/api/logistics/batch-optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderIds: selectedOrderIds,
          vehicleCapacityKg
        })
      });
      const data = await res.json();
      if (data.success) {
        setOptimizationResult(data.bundleSummary);
      }
    } catch {
      // Local fallback calculation
      computeLocalOptimization();
    } finally {
      setCalculating(false);
    }
  };

  const computeLocalOptimization = () => {
    const selected = availableOrders.filter(o => selectedOrderIds.includes(o.id));
    const totalWeight = selected.reduce((sum, o) => sum + o.weightKg, 0);
    const separateDist = selected.reduce((sum, o) => sum + o.distanceKm, 0);
    const optimizedDist = Math.round(separateDist * 0.65);
    const savedDist = separateDist - optimizedDist;
    const fuelSaved = (savedDist * 0.28).toFixed(1);
    const co2Saved = (savedDist * 0.74).toFixed(1);
    const totalFare = selected.reduce((sum, o) => sum + o.fairPriceEstimated, 0);

    setOptimizationResult({
      orderCount: selected.length,
      totalWeightKg: totalWeight,
      capacityLimitKg: vehicleCapacityKg,
      capacityUtilizationPercent: Math.min(100, Math.round((totalWeight / vehicleCapacityKg) * 100)),
      separateDistanceKm: separateDist,
      optimizedDistanceKm: optimizedDist,
      distanceSavedKm: savedDist,
      fuelSavedLiters: Number(fuelSaved),
      co2SavedKg: Number(co2Saved),
      totalSeparateFare: totalFare,
      bundledDriverPayout: Math.round(totalFare * 0.88),
      farmerDiscountTotal: Math.round(totalFare * 0.12),
      routeTimeline: [
        {
          stopIndex: 1,
          type: 'Pickup 1',
          location: selected[0]?.farmLocation || 'Farm Origin 1',
          crop: selected[0]?.cropName || 'Produce 1',
          weightKg: selected[0]?.weightKg || 800,
          timeSlot: '06:00 AM - 06:45 AM',
          reeferStatus: 'Chamber pre-cooled'
        },
        {
          stopIndex: 2,
          type: 'Pickup 2',
          location: selected[1]?.farmLocation || 'Farm Origin 2',
          crop: selected[1]?.cropName || 'Produce 2',
          weightKg: selected[1]?.weightKg || 600,
          timeSlot: '07:30 AM - 08:15 AM',
          reeferStatus: 'Bundled cargo locked'
        },
        {
          stopIndex: 3,
          type: 'Central Delivery Terminal',
          location: 'Vashi APMC / Hypermarket Logistics Hub, Mumbai',
          crop: `${selected.length} Farmer Batches Combined`,
          weightKg: totalWeight,
          timeSlot: '12:30 PM - 02:00 PM',
          reeferStatus: 'Cold-chain verification delivered'
        }
      ]
    });
  };

  const handleDispatchBatch = () => {
    onBatchDispatched(selectedOrderIds);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#a855f7', '#10b981', '#f59e0b']
    });
  };

  // Run on mount or when selection changes
  React.useEffect(() => {
    if (selectedOrderIds.length >= 2) {
      handleCalculateOptimization();
    }
  }, [selectedOrderIds.length]);

  const selectedOrdersData = availableOrders.filter(o => selectedOrderIds.includes(o.id));
  const totalSelectedWeight = selectedOrdersData.reduce((sum, o) => sum + o.weightKg, 0);
  const capacityPercent = Math.min(100, Math.round((totalSelectedWeight / vehicleCapacityKg) * 100));

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-purple-500/25 space-y-2">
        <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
          <GitMerge className="w-4 h-4" />
          <span>Multi-Order Dynamic Route Bundling</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white">
          {t.logistics.batchOptimizerTab}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
          Select multiple farmer pickup requests along overlapping transit corridors to bundle them onto a single refrigerated route. Drastically reduce fuel burn, increase driver earnings, and pass bundling discounts back to farmers.
        </p>
      </div>

      {/* Grid: Order Selection (Left) & Live Vehicle Capacity Gauge (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Order Multi-Selector */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 border border-purple-500/25 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>{t.logistics.bundleOrders}</span>
              <span className="text-xs font-mono text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-full border border-purple-500/30">
                {selectedOrderIds.length} Selected
              </span>
            </h3>
            <span className="text-xs text-slate-400">Min 2 loads required</span>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {availableOrders.map((order) => {
              const isSelected = selectedOrderIds.includes(order.id);
              return (
                <div
                  key={order.id}
                  onClick={() => toggleSelectOrder(order.id)}
                  className={`cursor-pointer p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-950/60 to-slate-900 border-purple-400/80 shadow-[0_0_20px_rgba(168,85,247,0.25)]'
                      : 'bg-slate-900/60 border-slate-800 hover:border-purple-500/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                      isSelected ? 'bg-purple-600 border-purple-400 text-white' : 'border-slate-700 bg-slate-800'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span className="text-2xl">{order.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-sky-400">{order.batchId}</span>
                        <span className="text-[10px] text-slate-400 font-mono">({order.distanceKm} km)</span>
                      </div>
                      <h4 className="text-sm font-bold text-white mt-0.5">{order.cropName}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{order.farmLocation}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-black text-white font-mono">{order.weightKg} kg</span>
                    <div className="text-[11px] text-emerald-400 font-mono font-bold">₹{order.fairPriceEstimated}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vehicle Capacity Fill Gauge & Corridor Controls */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-purple-500/25 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-sky-400" />
                <h3 className="text-sm font-bold text-white">{t.logistics.capacityUtilization}</h3>
              </div>
              <span className="text-xs font-mono font-bold text-sky-400">
                {totalSelectedWeight} / {vehicleCapacityKg} kg
              </span>
            </div>

            {/* Capacity Progress Bar */}
            <div className="space-y-1.5">
              <div className="w-full bg-slate-900 h-4 rounded-full overflow-hidden p-0.5 border border-purple-500/30">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    capacityPercent > 100
                      ? 'bg-red-500'
                      : capacityPercent > 75
                      ? 'bg-gradient-to-r from-emerald-500 to-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.7)]'
                      : 'bg-gradient-to-r from-purple-500 to-indigo-400'
                  }`}
                  style={{ width: `${Math.min(100, capacityPercent)}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>0%</span>
                <span className={`font-bold ${capacityPercent > 100 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {capacityPercent}% Vehicle Fill Rate
                </span>
                <span>Max {vehicleCapacityKg} kg</span>
              </div>
            </div>

            {/* Vehicle Fleet Selector */}
            <div className="space-y-2 pt-2">
              <label className="text-xs text-slate-400 font-medium">Reefer Truck Capacity Model:</label>
              <select
                value={vehicleCapacityKg}
                onChange={(e) => setVehicleCapacityKg(Number(e.target.value))}
                className="w-full bg-slate-900 border border-purple-500/30 text-slate-200 text-xs rounded-xl px-3 py-2.5 outline-none font-semibold"
              >
                <option value={1500}>Mahindra EV Reefer (1,500 kg capacity)</option>
                <option value={2500}>Eicher Pro Insulated Canter (2,500 kg capacity)</option>
                <option value={3500}>Tata Ultra Refrigerated Reefer (3,500 kg capacity)</option>
                <option value={8000}>Ashok Leyland Multi-Axle Reefer (8,000 kg capacity)</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleCalculateOptimization}
            disabled={selectedOrderIds.length < 2 || calculating}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-500 hover:from-purple-500 hover:to-sky-400 text-white font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all disabled:opacity-40"
          >
            {calculating ? 'Analyzing Geographic Routes...' : t.logistics.bundleButton}
          </button>
        </div>
      </div>

      {/* Optimization Results Card */}
      {optimizationResult && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-sky-500/30 space-y-6 shadow-[0_0_35px_rgba(56,189,248,0.15)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-500/20 pb-5">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                BUNDLE OPTIMIZATION COMPUTED
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                Optimized Consolidated Multi-Stop Route
              </h3>
            </div>

            <button
              onClick={handleDispatchBatch}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all flex items-center gap-2"
            >
              <Truck className="w-4 h-4" />
              <span>Dispatch Consolidated Route</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 4 Green & Efficiency Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                <TrendingDown className="w-3.5 h-3.5 text-sky-400" />
                <span>{t.logistics.distanceSaved}</span>
              </div>
              <div className="text-xl font-black text-sky-300 font-mono">
                {optimizationResult.distanceSavedKm} km
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                {optimizationResult.separateDistanceKm} km ➔ {optimizationResult.optimizedDistanceKm} km
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                <Fuel className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.logistics.fuelSaved}</span>
              </div>
              <div className="text-xl font-black text-amber-300 font-mono">
                {optimizationResult.fuelSavedLiters} Liters
              </div>
              <div className="text-[10px] text-slate-500">Consolidated haul efficiency</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.logistics.co2Reduction}</span>
              </div>
              <div className="text-xl font-black text-emerald-400 font-mono">
                {optimizationResult.co2SavedKg} kg CO2e
              </div>
              <div className="text-[10px] text-slate-500">Green Logistics Credited</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                <IndianRupee className="w-3.5 h-3.5 text-purple-400" />
                <span>{t.logistics.bundleDriverPayout}</span>
              </div>
              <div className="text-xl font-black text-purple-300 font-mono">
                ₹{optimizationResult.bundledDriverPayout.toLocaleString('en-IN')}
              </div>
              <div className="text-[10px] text-emerald-400 font-mono">
                +₹{optimizationResult.farmerDiscountTotal} passed to farmers
              </div>
            </div>
          </div>

          {/* Multi-Stop Visual Itinerary */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-purple-500/20 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Navigation className="w-4 h-4 text-purple-400" />
              <span>{t.logistics.multiStopItinerary}</span>
            </h4>

            <div className="space-y-3">
              {optimizationResult.routeTimeline.map((leg: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800"
                >
                  <div className="w-7 h-7 rounded-full bg-purple-600/30 border border-purple-500/40 text-purple-300 text-xs font-bold font-mono flex items-center justify-center shrink-0 mt-0.5">
                    0{leg.stopIndex}
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">{leg.type}: {leg.crop}</span>
                      <span className="text-[11px] font-mono text-amber-300">{leg.timeSlot}</span>
                    </div>
                    <div className="text-xs text-slate-400">{leg.location}</div>
                    <div className="text-[11px] text-sky-400 font-mono flex items-center gap-2 pt-0.5">
                      <span>Cargo: {leg.weightKg} kg</span>
                      <span>•</span>
                      <span>{leg.reeferStatus}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
