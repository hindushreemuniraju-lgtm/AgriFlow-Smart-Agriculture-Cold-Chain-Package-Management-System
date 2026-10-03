import React, { useState } from 'react';
import { CropInfo, PackagingRecommendation, FarmerOrder } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { CropSelector } from './CropSelector';
import { SmartInsightsEngine } from './SmartInsightsEngine';
import { SmartPackagingSection } from './SmartPackagingSection';
import { TransportOrderForm } from './TransportOrderForm';
import { Activity, Box, Truck, Sparkles } from 'lucide-react';

interface FarmerDashboardProps {
  crops: CropInfo[];
  selectedCrop: CropInfo;
  onSelectCrop: (crop: CropInfo) => void;
  onOrderCreated: (order: FarmerOrder) => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  crops,
  selectedCrop,
  onSelectCrop,
  onOrderCreated
}) => {
  const { t } = useLanguage();
  const [activeSubTab, setActiveSubTab] = useState<'insights' | 'packaging' | 'transport'>('packaging');
  const [activePackagingSpec, setActivePackagingSpec] = useState<PackagingRecommendation | null>(null);

  const handleOpenTransportOrder = (recommendation: PackagingRecommendation) => {
    setActivePackagingSpec(recommendation);
    setActiveSubTab('transport');
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      
      {/* Crop Selector Matrix */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-purple-500/25">
        <CropSelector
          crops={crops}
          selectedCrop={selectedCrop}
          onSelectCrop={onSelectCrop}
        />
      </section>

      {/* Sub-Tab Navigation: Insights | Packaging | Transport */}
      <div className="flex justify-center">
        <div className="inline-flex items-center p-1.5 rounded-2xl bg-slate-900/90 border border-purple-500/25 shadow-[0_0_25px_rgba(0,0,0,0.5)]">
          <button
            onClick={() => setActiveSubTab('packaging')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
              activeSubTab === 'packaging'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-purple-400/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Box className="w-4 h-4 text-sky-400" />
            <span>{t.farmer.smartPackaging}</span>
            <span className="px-1.5 py-0.2 text-[9px] uppercase tracking-wider bg-purple-500/30 text-purple-200 rounded-md">
              AI 4.0
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('insights')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
              activeSubTab === 'insights'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-purple-400/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>{t.farmer.smartInsights}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('transport')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
              activeSubTab === 'transport'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-purple-400/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Truck className="w-4 h-4 text-amber-400" />
            <span>{t.farmer.transportOrder}</span>
          </button>
        </div>
      </div>

      {/* Render Sub-Tab Component */}
      <div>
        {activeSubTab === 'packaging' && (
          <SmartPackagingSection
            selectedCrop={selectedCrop}
            onOpenTransportOrder={handleOpenTransportOrder}
          />
        )}

        {activeSubTab === 'insights' && (
          <SmartInsightsEngine
            selectedCrop={selectedCrop}
          />
        )}

        {activeSubTab === 'transport' && (
          <TransportOrderForm
            selectedCrop={selectedCrop}
            prefilledPackaging={activePackagingSpec}
            onOrderCreated={onOrderCreated}
          />
        )}
      </div>

    </div>
  );
};
