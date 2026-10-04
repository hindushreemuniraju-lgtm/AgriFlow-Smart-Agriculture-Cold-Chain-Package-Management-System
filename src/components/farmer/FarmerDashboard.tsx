import React, { useState, useMemo } from 'react';
import { CropInfo, PackagingRecommendation, FarmerOrder } from '../../types';
import { ProductIntelligence } from '../../types/product';
import { useLanguage } from '../../context/LanguageContext';
import { CropSelector } from './CropSelector';
import { ProductHeroBanner } from './ProductHeroBanner';
import { ProductGrowingGuide } from './ProductGrowingGuide';
import { ProductHarvestingSection } from './ProductHarvestingSection';
import { ProductPackagingSection } from './ProductPackagingSection';
import { ProductConsumptionSection } from './ProductConsumptionSection';
import { ProductRiskAnalysis } from './ProductRiskAnalysis';
import { ProductSmartPlanModal } from './ProductSmartPlanModal';
import { TransportOrderForm } from './TransportOrderForm';
import { getProductIntelligence } from '../../data/productsDatabase';
import { Box, Sprout, Wheat, HeartPulse, ShieldAlert, Truck, Sparkles } from 'lucide-react';

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
  const [activeSubTab, setActiveSubTab] = useState<'packaging' | 'growing' | 'harvesting' | 'consumption' | 'risks' | 'transport'>('packaging');
  const [activePackagingSpec, setActivePackagingSpec] = useState<PackagingRecommendation | null>(null);
  const [isSmartPlanOpen, setIsSmartPlanOpen] = useState<boolean>(false);

  // Retrieve 100% verified ProductIntelligence object for selected produce (zero data leak guarantee)
  const productIntelligence: ProductIntelligence = useMemo(() => {
    return getProductIntelligence(selectedCrop.name || selectedCrop.id);
  }, [selectedCrop]);

  const handleOpenTransportOrder = () => {
    setActiveSubTab('transport');
  };

  const handleExecuteSmartPlan = (planData: any) => {
    setIsSmartPlanOpen(false);
    setActiveSubTab('transport');
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      
      {/* 1. Verified Product Hero Banner with Live APMC Pricing & Generate Smart Plan CTA */}
      <section>
        <ProductHeroBanner
          product={productIntelligence}
          onOpenSmartPlan={() => setIsSmartPlanOpen(true)}
        />
      </section>

      {/* 2. Crop Selector Matrix across all 6 agricultural categories */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-purple-500/25">
        <CropSelector
          crops={crops}
          selectedCrop={selectedCrop}
          onSelectCrop={onSelectCrop}
        />
      </section>

      {/* 3. Sub-Tab Navigation Bar */}
      <div className="flex justify-center overflow-x-auto py-2">
        <div className="inline-flex items-center p-1.5 rounded-2xl bg-slate-900/90 border border-purple-500/25 shadow-[0_0_25px_rgba(0,0,0,0.5)] gap-1">
          
          {/* Packaging Architecture */}
          <button
            onClick={() => setActiveSubTab('packaging')}
            className={`flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
              activeSubTab === 'packaging'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-purple-400/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Box className="w-4 h-4 text-purple-400" />
            <span>Smart Packaging</span>
          </button>

          {/* Cultivation Guide */}
          <button
            onClick={() => setActiveSubTab('growing')}
            className={`flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
              activeSubTab === 'growing'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-purple-400/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Sprout className="w-4 h-4 text-emerald-400" />
            <span>Growing & Soil</span>
          </button>

          {/* Harvesting & Curing */}
          <button
            onClick={() => setActiveSubTab('harvesting')}
            className={`flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
              activeSubTab === 'harvesting'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-purple-400/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Wheat className="w-4 h-4 text-amber-400" />
            <span>Harvest & Curing</span>
          </button>

          {/* Nutrition & Culinary */}
          <button
            onClick={() => setActiveSubTab('consumption')}
            className={`flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
              activeSubTab === 'consumption'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-purple-400/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <HeartPulse className="w-4 h-4 text-rose-400" />
            <span>Nutrition & Recipes</span>
          </button>

          {/* Risks & Mitigation */}
          <button
            onClick={() => setActiveSubTab('risks')}
            className={`flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
              activeSubTab === 'risks'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-purple-400/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-sky-400" />
            <span>Risk Matrix</span>
          </button>

          {/* Transport Order */}
          <button
            onClick={() => setActiveSubTab('transport')}
            className={`flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
              activeSubTab === 'transport'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-purple-400/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Truck className="w-4 h-4 text-yellow-400" />
            <span>Cold Logistics</span>
          </button>

        </div>
      </div>

      {/* 4. Active Tab Component Render */}
      <div>
        {activeSubTab === 'packaging' && (
          <ProductPackagingSection
            product={productIntelligence}
            onOpenTransportOrder={handleOpenTransportOrder}
          />
        )}

        {activeSubTab === 'growing' && (
          <ProductGrowingGuide
            product={productIntelligence}
          />
        )}

        {activeSubTab === 'harvesting' && (
          <ProductHarvestingSection
            product={productIntelligence}
          />
        )}

        {activeSubTab === 'consumption' && (
          <ProductConsumptionSection
            product={productIntelligence}
          />
        )}

        {activeSubTab === 'risks' && (
          <ProductRiskAnalysis
            product={productIntelligence}
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

      {/* 5. Interactive Smart Plan Modal */}
      <ProductSmartPlanModal
        product={productIntelligence}
        isOpen={isSmartPlanOpen}
        onClose={() => setIsSmartPlanOpen(false)}
        onExecutePlan={handleExecuteSmartPlan}
      />

    </div>
  );
};
