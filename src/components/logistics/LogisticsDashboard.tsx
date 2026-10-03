import React, { useState } from 'react';
import { FarmerOrder, DriverPartner } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { MarketplaceBidding } from './MarketplaceBidding';
import { RouteBatchOptimizer } from './RouteBatchOptimizer';
import { LiveTrackingSchedule } from './LiveTrackingSchedule';
import { ShoppingBag, GitMerge, Radio, Truck } from 'lucide-react';

interface LogisticsDashboardProps {
  orders: FarmerOrder[];
  drivers: DriverPartner[];
  onOrderAccepted: (orderId: string, driverId: string, price: number) => void;
  onBatchDispatched: (orderIds: string[]) => void;
}

export const LogisticsDashboard: React.FC<LogisticsDashboardProps> = ({
  orders,
  drivers,
  onOrderAccepted,
  onBatchDispatched
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'marketplace' | 'optimizer' | 'tracking'>('marketplace');
  const [selectedTrackingOrderId, setSelectedTrackingOrderId] = useState<string | undefined>(undefined);

  const handleNavigateToTracking = (orderId: string) => {
    setSelectedTrackingOrderId(orderId);
    setActiveTab('tracking');
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-sky-500/30 shadow-[0_0_35px_rgba(56,189,248,0.15)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-semibold">
              <Truck className="w-3.5 h-3.5 text-sky-400" />
              <span>Smart Cold-Chain Logistics & Dispatch Control</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.logistics.title}
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              {t.logistics.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex items-center p-1.5 rounded-2xl bg-slate-900/90 border border-purple-500/25 shadow-[0_0_25px_rgba(0,0,0,0.5)]">
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
              activeTab === 'marketplace'
                ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-[0_0_20px_rgba(56,189,248,0.4)] border border-sky-400/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-emerald-300" />
            <span>{t.logistics.marketplaceTab}</span>
          </button>

          <button
            onClick={() => setActiveTab('optimizer')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
              activeTab === 'optimizer'
                ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-[0_0_20px_rgba(56,189,248,0.4)] border border-sky-400/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <GitMerge className="w-4 h-4 text-purple-300" />
            <span>{t.logistics.batchOptimizerTab}</span>
          </button>

          <button
            onClick={() => setActiveTab('tracking')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
              activeTab === 'tracking'
                ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-[0_0_20px_rgba(56,189,248,0.4)] border border-sky-400/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Radio className="w-4 h-4 text-pink-300" />
            <span>{t.logistics.liveTrackingTab}</span>
          </button>
        </div>
      </div>

      {/* Active Tab View */}
      <div>
        {activeTab === 'marketplace' && (
          <MarketplaceBidding
            orders={orders}
            drivers={drivers}
            onOrderAccepted={onOrderAccepted}
            onNavigateToTracking={handleNavigateToTracking}
          />
        )}

        {activeTab === 'optimizer' && (
          <RouteBatchOptimizer
            orders={orders}
            onBatchDispatched={onBatchDispatched}
          />
        )}

        {activeTab === 'tracking' && (
          <LiveTrackingSchedule
            orders={orders}
            selectedOrderId={selectedTrackingOrderId}
          />
        )}
      </div>

    </div>
  );
};
