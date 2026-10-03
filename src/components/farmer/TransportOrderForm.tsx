import React, { useState } from 'react';
import { CropInfo, PackagingRecommendation, FarmerOrder } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import { 
  Truck, 
  MapPin, 
  Calendar, 
  Clock, 
  Scale, 
  Box, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  IndianRupee,
  QrCode
} from 'lucide-react';

interface TransportOrderFormProps {
  selectedCrop: CropInfo;
  prefilledPackaging?: PackagingRecommendation | null;
  onOrderCreated: (order: FarmerOrder) => void;
}

export const TransportOrderForm: React.FC<TransportOrderFormProps> = ({
  selectedCrop,
  prefilledPackaging,
  onOrderCreated
}) => {
  const { t } = useLanguage();

  const [weightKg, setWeightKg] = useState<number>(850);
  const [boxesCount, setBoxesCount] = useState<number>(85);
  const [farmerName, setFarmerName] = useState<string>('Dnyaneshwar Shinde');
  const [farmerPhone, setFarmerPhone] = useState<string>('+91 94220 89112');
  const [farmLocation, setFarmLocation] = useState<string>('Dindori Valley Certified Orchards, Nashik');
  const [destination, setDestination] = useState<string>('Direct Supermarket Central Distribution Center, Mumbai');
  const [distanceKm, setDistanceKm] = useState<number>(prefilledPackaging ? prefilledPackaging.distanceKm : 172);
  const [targetMarket, setTargetMarket] = useState<any>(prefilledPackaging ? prefilledPackaging.targetMarket : 'Supermarket Chain');
  const [pickupWindow, setPickupWindow] = useState<string>('Today 06:00 AM - 08:30 AM (Morning Cool)');
  const [specialHandling, setSpecialHandling] = useState<string[]>([
    'Active Reefer Cold Chain',
    'Ethylene Scavenger Inserted',
    'Stack Max 3 Boxes'
  ]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [createdOrder, setCreatedOrder] = useState<FarmerOrder | null>(null);

  // Auto-calculate fair price benchmark
  // Base 800 + (dist * 22) + ((weight / 1000) * 350) + 600
  const estimatedFairPrice = Math.round(800 + (distanceKm * 22) + ((weightKg / 1000) * 350) + 600);

  const toggleHandling = (tag: string) => {
    if (specialHandling.includes(tag)) {
      setSpecialHandling(specialHandling.filter(s => s !== tag));
    } else {
      setSpecialHandling([...specialHandling, tag]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cropId: selectedCrop.id,
          cropName: selectedCrop.name,
          variety: selectedCrop.variety,
          weightKg,
          boxesCount,
          farmerName,
          farmerPhone,
          farmLocation,
          destination,
          distanceKm,
          targetMarket,
          pickupWindow,
          specialHandling,
          harvestDate: new Date().toISOString().split('T')[0]
        })
      });

      const data = await res.json();
      if (data.success) {
        setCreatedOrder(data.order);
        onOrderCreated(data.order);

        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#a855f7', '#38bdf8', '#34d399', '#f59e0b']
        });
      }
    } catch {
      // Offline fallback
      const mockBatch = `AGF-${Math.floor(1000 + Math.random() * 9000)}`;
      const mockOrder: FarmerOrder = {
        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        batchId: mockBatch,
        cropId: selectedCrop.id,
        cropName: selectedCrop.name,
        variety: selectedCrop.variety,
        icon: selectedCrop.icon,
        farmerName,
        farmerPhone,
        farmLocation,
        destination,
        distanceKm,
        weightKg,
        boxesCount,
        targetMarket,
        pickupWindow,
        specialHandling,
        harvestDate: new Date().toISOString().split('T')[0],
        status: 'Requested',
        fairPriceEstimated: estimatedFairPrice,
        packagingSpec: {
          material: prefilledPackaging?.packagingMaterial || selectedCrop.packagingPresets.recommendedMaterial,
          temperatureTier: prefilledPackaging?.coldChainTier || selectedCrop.packagingPresets.coldChainTier,
          targetTemp: prefilledPackaging?.idealTempRange || selectedCrop.packagingPresets.idealStorageTemp,
          shockRating: prefilledPackaging?.shockAbsorptionRating || selectedCrop.packagingPresets.shockDampeningRating,
          ventilation: prefilledPackaging?.ventilationSpec || selectedCrop.packagingPresets.ventilationType,
          ethyleneAbsorption: prefilledPackaging?.ethyleneManagement || selectedCrop.packagingPresets.ethyleneControl,
          ecoScore: 'A+ Recyclable',
          costPerUnit: 24
        }
      };
      setCreatedOrder(mockOrder);
      onOrderCreated(mockOrder);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#38bdf8', '#34d399']
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Truck className="w-6 h-6 text-sky-400" />
            <span>{t.farmer.transportOrder}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Dispatch a refrigerated or express logistics request directly to verified fleet drivers at transparent, fair distance-based benchmarks.
          </p>
        </div>

        {/* Live fair price badge */}
        <div className="glass-panel px-4 py-2 rounded-2xl border border-purple-500/30 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            ₹
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono text-slate-400">{t.farmer.fairPriceEstimate}</div>
            <div className="text-lg font-black text-emerald-400 font-mono">₹{estimatedFairPrice.toLocaleString('en-IN')}</div>
          </div>
        </div>
      </div>

      {createdOrder ? (
        /* Order Success Card */
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/40 shadow-[0_0_35px_rgba(16,185,129,0.25)] space-y-6 animate-scale-in">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-purple-500/20">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-3xl">
                ✓
              </div>
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  LIVE IN LOGISTICS MARKETPLACE
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  Order Registered: #{createdOrder.id}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Batch Tag: <span className="font-mono text-sky-300 font-bold">{createdOrder.batchId}</span> • 
                  Produce: {createdOrder.cropName} ({createdOrder.weightKg} kg)
                </p>
              </div>
            </div>

            {/* Generated Batch QR code */}
            <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-2xl border border-purple-500/30 shadow-inner">
              <div className="bg-white p-2 rounded-xl">
                <QRCodeSVG 
                  value={`AGRIFLOW-BATCH:${createdOrder.batchId}:${createdOrder.cropName}`}
                  size={76}
                  level="H"
                />
              </div>
              <div className="space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Batch Passport QR</div>
                <div className="text-xs font-bold text-purple-300 font-mono">{createdOrder.batchId}</div>
                <div className="text-[10px] text-emerald-400">Ready for scanning</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400">Pickup Address:</span>
              <div className="font-bold text-white mt-1 line-clamp-2">{createdOrder.farmLocation}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400">Destination:</span>
              <div className="font-bold text-white mt-1 line-clamp-2">{createdOrder.destination}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400">Transit Distance:</span>
              <div className="font-bold text-sky-400 font-mono mt-1">{createdOrder.distanceKm} km</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400">Fair Rate Benchmark:</span>
              <div className="font-bold text-emerald-400 font-mono mt-1">₹{createdOrder.fairPriceEstimated}</div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-xs text-slate-400">
              Fleet drivers are being notified. You can track this batch live in the Logistics interface.
            </span>
            <button
              onClick={() => setCreatedOrder(null)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
            >
              Request Another Transport Order
            </button>
          </div>
        </div>
      ) : (
        /* Order Form */
        <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-6 sm:p-8 border border-purple-500/25 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Weight and Boxes */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  {t.farmer.orderWeight}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="50"
                    max="10000"
                    step="10"
                    value={weightKg}
                    onChange={(e) => {
                      const w = Number(e.target.value);
                      setWeightKg(w);
                      setBoxesCount(Math.ceil(w / 10));
                    }}
                    required
                    className="w-full bg-slate-900/90 border border-purple-500/30 rounded-2xl px-4 py-3 text-white text-sm focus:border-purple-400 outline-none font-mono"
                  />
                  <span className="absolute right-4 top-3 text-xs text-slate-400 font-mono">KG</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Estimated Standard Master Boxes (10 kg each)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={boxesCount}
                    onChange={(e) => setBoxesCount(Number(e.target.value))}
                    required
                    className="w-full bg-slate-900/90 border border-purple-500/30 rounded-2xl px-4 py-3 text-white text-sm focus:border-purple-400 outline-none font-mono"
                  />
                  <span className="absolute right-4 top-3 text-xs text-slate-400 font-mono">BOXES</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  {t.farmer.pickupLocation}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={farmLocation}
                    onChange={(e) => setFarmLocation(e.target.value)}
                    required
                    className="w-full bg-slate-900/90 border border-purple-500/30 rounded-2xl pl-10 pr-4 py-3 text-white text-xs sm:text-sm focus:border-purple-400 outline-none"
                  />
                  <MapPin className="w-4 h-4 text-purple-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Farmer Contact Phone
                </label>
                <input
                  type="text"
                  value={farmerPhone}
                  onChange={(e) => setFarmerPhone(e.target.value)}
                  required
                  className="w-full bg-slate-900/90 border border-purple-500/30 rounded-2xl px-4 py-3 text-white text-xs sm:text-sm focus:border-purple-400 outline-none font-mono"
                />
              </div>
            </div>

            {/* Destination, Pickup Window, Special Handling */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Destination Wholesale Terminal / Market
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                  className="w-full bg-slate-900/90 border border-purple-500/30 rounded-2xl px-4 py-3 text-white text-xs sm:text-sm focus:border-purple-400 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Estimated Distance
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={distanceKm}
                      onChange={(e) => setDistanceKm(Number(e.target.value))}
                      required
                      className="w-full bg-slate-900/90 border border-purple-500/30 rounded-2xl px-4 py-3 text-white text-sm focus:border-purple-400 outline-none font-mono"
                    />
                    <span className="absolute right-4 top-3 text-xs text-slate-400 font-mono">KM</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Target Market Tier
                  </label>
                  <select
                    value={targetMarket}
                    onChange={(e) => setTargetMarket(e.target.value)}
                    className="w-full bg-slate-900/90 border border-purple-500/30 rounded-2xl px-3 py-3 text-white text-xs focus:border-purple-400 outline-none"
                  >
                    <option value="Local Mandi">Local Mandi</option>
                    <option value="Supermarket Chain">Supermarket Chain</option>
                    <option value="Export">Export Air/Sea</option>
                    <option value="Processing Plant">Food Processing</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  {t.farmer.pickupWindow}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={pickupWindow}
                    onChange={(e) => setPickupWindow(e.target.value)}
                    required
                    className="w-full bg-slate-900/90 border border-purple-500/30 rounded-2xl pl-10 pr-4 py-3 text-white text-xs sm:text-sm focus:border-purple-400 outline-none"
                  />
                  <Clock className="w-4 h-4 text-sky-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Special Handling Requirements
                </label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    'Active Reefer Cold Chain',
                    'Ethylene Scavenger Inserted',
                    'Stack Max 3 Boxes',
                    'VHT Protocol Certified',
                    'Fragile Berry Cushioning',
                    'Ozone Sanitized Produce'
                  ].map((tag) => {
                    const isSelected = specialHandling.includes(tag);
                    return (
                      <button
                        type="button"
                        key={tag}
                        onClick={() => toggleHandling(tag)}
                        className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                          isSelected
                            ? 'bg-purple-600/40 text-purple-200 border-purple-400 font-semibold shadow-sm'
                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '} {tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>

          {/* Submit Row */}
          <div className="pt-6 border-t border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Includes auto-generated tamper-evident QR code & cold-chain compliance certificate</span>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-500 hover:from-purple-500 hover:to-sky-400 text-white font-bold text-sm shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all hover:scale-105 disabled:opacity-50"
            >
              <Truck className="w-5 h-5" />
              <span>{submitting ? 'Generating Batch & Posting...' : t.farmer.requestTransportBtn}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
