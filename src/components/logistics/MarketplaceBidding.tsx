import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { FarmerOrder, DriverPartner } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { formatCurrency } from '../../utils/formatters';
import { 
  Truck, 
  MapPin, 
  Scale, 
  Calendar, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  AlertCircle,
  IndianRupee,
  Navigation,
  Star,
  Zap,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MarketplaceBiddingProps {
  orders: FarmerOrder[];
  drivers: DriverPartner[];
  onOrderAccepted: (orderId: string, driverId: string, price: number) => void;
  onNavigateToTracking: (orderId: string) => void;
}

export const MarketplaceBidding: React.FC<MarketplaceBiddingProps> = ({
  orders,
  drivers,
  onOrderAccepted,
  onNavigateToTracking
}) => {
  const { t } = useLanguage();
  const [selectedDriverId, setSelectedDriverId] = useState<string>(drivers[0]?.id || 'drv-01');
  const [bidModalOrder, setBidModalOrder] = useState<FarmerOrder | null>(null);
  const [customBidAmount, setCustomBidAmount] = useState<number>(4500);

  const pendingOrders = orders.filter(o => o.status === 'Requested');
  const activeOrders = orders.filter(o => o.status === 'In Transit');

  const selectedDriver = drivers.find(d => d.id === selectedDriverId) || drivers[0];

  const handleInstantAccept = (order: FarmerOrder) => {
    onOrderAccepted(order.id, selectedDriver.id, order.fairPriceEstimated);
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#38bdf8', '#a855f7', '#10b981']
    });
  };

  const handleSubmitCustomBid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bidModalOrder) return;
    onOrderAccepted(bidModalOrder.id, selectedDriver.id, customBidAmount);
    setBidModalOrder(null);
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#38bdf8', '#a855f7', '#10b981']
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Fleet Driver Selector / Persona Bar */}
      <div className="glass-panel rounded-3xl p-6 border border-purple-500/25 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
              <Truck className="w-4 h-4" />
              <span>Active Transporter Persona: {selectedDriver?.name}</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-0.5">
              Select Fleet Vehicle to Bid or Accept Loads
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Operating Vehicle:</span>
            <select
              value={selectedDriverId}
              onChange={(e) => setSelectedDriverId(e.target.value)}
              className="bg-slate-900 border border-purple-500/30 text-slate-200 text-xs rounded-xl px-3 py-2 outline-none font-semibold cursor-pointer"
            >
              {drivers.map((d) => (
                <option key={d.id} value={d.id} className="bg-slate-900 text-slate-200">
                  {d.name} • {d.vehicleType} ({d.capacityKg} kg capacity)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Selected Driver Profile Badge */}
        {selectedDriver && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-950/70 border border-purple-500/20 text-xs">
            <div>
              <span className="text-slate-400">Vehicle Number:</span>
              <div className="font-bold text-white font-mono mt-0.5">{selectedDriver.vehicleNumber}</div>
            </div>
            <div>
              <span className="text-slate-400">Cold Chain Reefer:</span>
              <div className="font-bold text-sky-400 font-mono mt-0.5">{selectedDriver.reeferRange}</div>
            </div>
            <div>
              <span className="text-slate-400">Driver Rating:</span>
              <div className="font-bold text-amber-400 flex items-center gap-1 mt-0.5">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{selectedDriver.rating} ({selectedDriver.totalTrips} Trips)</span>
              </div>
            </div>
            <div>
              <span className="text-slate-400">Base Distance Benchmark:</span>
              <div className="font-bold text-emerald-400 font-mono mt-0.5">₹{selectedDriver.baseRatePerKm}/km</div>
            </div>
          </div>
        )}
      </div>

      {/* Transparent Fair-Price Formula Explainer Card */}
      <div className="glass-panel-subtle rounded-3xl p-5 sm:p-6 border border-sky-500/25 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400 font-bold text-lg">
              ⚖️
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">{t.logistics.fairPriceFormula}</h4>
              <p className="text-xs text-slate-300">
                Formula: <span className="font-mono text-purple-300">Base (₹800) + (Distance × ₹22/km) + (Weight × ₹0.35/kg) + IoT Cold Chain Guarantee (₹600)</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>Eliminates Middlemen Markups & Arbitrary Pricing</span>
          </div>
        </div>
      </div>

      {/* Available Farmer Loads List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2">
            <span>{t.logistics.activeOrders}</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 font-mono">
              {pendingOrders.length} Available Loads
            </span>
          </h3>
          <span className="text-xs text-slate-400">
            Real-time demand matching farmer harvest schedules
          </span>
        </div>

        {pendingOrders.length === 0 ? (
          <div className="glass-panel rounded-3xl p-8 text-center space-y-3">
            <div className="text-4xl">🚚</div>
            <h4 className="text-base font-bold text-white">All Farmer Loads Are Currently Dispatched!</h4>
            <p className="text-xs text-slate-400">
              Create a new transport order from the Farmer interface to see it listed here in real-time.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {pendingOrders.map((order) => (
              <div
                key={order.id}
                className="glass-panel-interactive rounded-3xl p-6 border border-purple-500/25 flex flex-col justify-between space-y-5"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-2xl">
                      {order.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-sky-400">{order.batchId}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-purple-300 border border-slate-700">
                          {order.targetMarket}
                        </span>
                      </div>
                      <h4 className="text-base font-extrabold text-white mt-0.5">{order.cropName}</h4>
                      <p className="text-xs text-slate-400">Farmer: {order.farmerName}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase font-mono text-slate-400">Fair Price</span>
                    <div className="text-xl font-black text-emerald-400 font-mono">
                      {formatCurrency(order.fairPriceEstimated)}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">Benchmark</span>
                  </div>
                </div>

                {/* Route Details */}
                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-purple-500/15 space-y-2 text-xs">
                  <div className="flex items-start gap-2 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-1"><strong className="text-slate-400">Pickup:</strong> {order.farmLocation}</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-300">
                    <Navigation className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-1"><strong className="text-slate-400">Drop:</strong> {order.destination}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[11px] text-slate-400">
                    <span>Distance: <strong className="text-sky-300 font-mono">{order.distanceKm} km</strong></span>
                    <span>Weight: <strong className="text-white font-mono">{order.weightKg} kg</strong> ({order.boxesCount} boxes)</span>
                    <span>Window: <strong className="text-amber-300">{order.pickupWindow ? order.pickupWindow.split('(')[0] : 'Flexible'}</strong></span>
                  </div>
                </div>

                {/* Packaging and Handling Specs */}
                <div className="space-y-1.5">
                  <div className="text-[11px] text-slate-400 font-medium">Packaging & Handling Protocol:</div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[10px] px-2 py-0.5 rounded-lg bg-sky-500/15 text-sky-300 border border-sky-500/25">
                      ❄️ {order.packagingSpec?.temperatureTier || 'Reefer'}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-lg bg-purple-500/15 text-purple-300 border border-purple-500/25">
                      🛡️ Shock {order.packagingSpec?.shockRating || 4.8}/5
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/25">
                      🍃 {order.packagingSpec?.ethyleneAbsorption || 'Ethylene Guard'}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => handleInstantAccept(order)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs shadow-md hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>{t.logistics.acceptOrder} (₹{order.fairPriceEstimated})</span>
                  </button>

                  <button
                    onClick={() => {
                      setBidModalOrder(order);
                      setCustomBidAmount(order.fairPriceEstimated);
                    }}
                    className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 border border-purple-500/30 text-purple-300 hover:text-white font-semibold text-xs transition-all"
                  >
                    {t.logistics.placeBid}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Active In-Transit Orders Section */}
      {activeOrders.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-purple-500/20">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Active Dispatches In-Transit ({activeOrders.length})</span>
            </h3>
            <span className="text-xs text-slate-400">
              Click any load to inspect continuous temperature & GPS telemetry
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeOrders.map((order) => (
              <div
                key={order.id}
                onClick={() => onNavigateToTracking(order.id)}
                className="cursor-pointer glass-panel-interactive rounded-2xl p-5 border border-sky-500/30 hover:border-sky-400 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-sky-400">{order.batchId}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    ● In Transit
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-2xl">{order.icon}</div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{order.cropName}</h4>
                    <p className="text-xs text-slate-400">Driver: {order.driverName || 'Rajesh Patil'}</p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] flex justify-between text-slate-300 font-mono">
                  <span>Reefer: <strong className="text-sky-300">{order.telemetry?.reeferTemp || 13.2}°C</strong></span>
                  <span>Speed: <strong className="text-white">{order.telemetry?.speedKmph || 58} km/h</strong></span>
                  <span>ETA: <strong className="text-amber-300">{order.telemetry?.etaMinutes || 65} min</strong></span>
                </div>

                <div className="text-[11px] text-sky-400 font-semibold flex items-center justify-end gap-1">
                  <span>Open Live Telemetry</span>
                  <Navigation className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Bid Modal */}
      {bidModalOrder && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <form onSubmit={handleSubmitCustomBid} className="max-w-md w-full rounded-3xl bg-slate-900 border border-purple-500/40 p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">Place Fleet Bid</h3>
                <p className="text-xs text-slate-400">Batch {bidModalOrder.batchId} • {bidModalOrder.cropName}</p>
              </div>
              <button
                type="button"
                onClick={() => setBidModalOrder(null)}
                className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-950 text-xs space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Standard Fair Price:</span>
                  <span className="font-mono text-emerald-400 font-bold">₹{bidModalOrder.fairPriceEstimated}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Transit Distance:</span>
                  <span className="font-mono text-white">{bidModalOrder.distanceKm} km</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Cargo Weight:</span>
                  <span className="font-mono text-white">{bidModalOrder.weightKg} kg</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Your Proposed Fleet Quote (₹)
                </label>
                <input
                  type="number"
                  min="500"
                  max="50000"
                  step="50"
                  value={customBidAmount}
                  onChange={(e) => setCustomBidAmount(Number(e.target.value))}
                  required
                  className="w-full bg-slate-950 border border-purple-500/40 rounded-xl px-4 py-2.5 text-white font-mono text-base outline-none focus:border-purple-400"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setBidModalOrder(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md"
              >
                Submit Fleet Quote
              </button>
            </div>
          </form>
        </div>,
        document.body
      )}

    </div>
  );
};
