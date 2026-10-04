import React, { useState, useMemo } from 'react';
import { CropInfo, PackagingRecommendation, FarmerOrder } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { CropIdentificationBar } from './CropIdentificationBar';
import { LocationWeatherBar } from './LocationWeatherBar';
import { ProductHeroBanner } from './ProductHeroBanner';
import { MarketRadarSection } from './MarketRadarSection';
import { ProductGrowingGuide } from './ProductGrowingGuide';
import { ProductHarvestingSection } from './ProductHarvestingSection';
import { ProductPackagingSection } from './ProductPackagingSection';
import { ProductConsumptionSection } from './ProductConsumptionSection';
import { ProductRiskAnalysis } from './ProductRiskAnalysis';
import { UniversalSmartPlanModal } from './UniversalSmartPlanModal';
import { TransportOrderForm } from './TransportOrderForm';
import { getEnrichedCropKnowledge, EnrichedProductIntelligence } from '../../services/crop/cropKnowledgeService';
import { GeocodedAddress, INDIAN_AGRI_DISTRICTS } from '../../services/location/geocodingService';
import { WeatherTelemetry } from '../../services/weather/weatherService';
import { DiscoveredMandi } from '../../services/market/mandiDiscoveryService';
import { Box, Sprout, Wheat, HeartPulse, ShieldAlert, Truck, Sparkles, BarChart3 } from 'lucide-react';

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
  const [activeSubTab, setActiveSubTab] = useState<'market' | 'packaging' | 'growing' | 'harvesting' | 'consumption' | 'risks' | 'transport'>('market');
  const [activePackagingSpec, setActivePackagingSpec] = useState<PackagingRecommendation | null>(null);
  const [isSmartPlanOpen, setIsSmartPlanOpen] = useState<boolean>(false);
  const [quantityKg, setQuantityKg] = useState<number>(500);

  // Dynamic Location State (Defaults to Nashik Cluster, auto-updates with GPS)
  const [currentAddress, setCurrentAddress] = useState<GeocodedAddress>({
    formattedAddress: 'Nashik Agricultural Belt, Maharashtra',
    city: 'Nashik',
    district: 'Nashik',
    state: 'Maharashtra',
    country: 'India',
    latitude: INDIAN_AGRI_DISTRICTS['nashik'].lat,
    longitude: INDIAN_AGRI_DISTRICTS['nashik'].lng,
    source: 'offline-directory'
  });

  const [weather, setWeather] = useState<WeatherTelemetry | null>(null);

  // Retrieve 100% verified EnrichedProductIntelligence for selected produce (zero data leak guarantee)
  const productIntelligence: EnrichedProductIntelligence = useMemo(() => {
    return getEnrichedCropKnowledge(selectedCrop.name || selectedCrop.id);
  }, [selectedCrop]);

  const handleOpenTransportOrder = () => {
    setActiveSubTab('transport');
  };

  const handleExecuteSmartPlan = () => {
    setIsSmartPlanOpen(false);
    setActiveSubTab('transport');
  };

  const handleSelectCropFromIdentification = (enrichedCrop: EnrichedProductIntelligence) => {
    onSelectCrop({
      id: `crop-${enrichedCrop.id}`,
      name: enrichedCrop.name,
      scientificName: enrichedCrop.scientificName,
      category: enrichedCrop.category as any,
      icon: enrichedCrop.icon,
      color: enrichedCrop.color,
      variety: enrichedCrop.variety,
      basePricePerKg: enrichedCrop.market.basePricePerKg,
      optimalTempRange: enrichedCrop.growing.temperatureRange,
      optimalHumidityRange: [65, 85],
      ripenessDays: enrichedCrop.harvesting.harvestingDays,
      currentMaturityStage: enrichedCrop.growing.currentMaturityStage,
      ethyleneSensitivity: enrichedCrop.packaging.ethyleneSensitivity,
      respirationRate: 'Moderate',
      qualityTechniques: enrichedCrop.growing.fertilizerGuidance.map(f => ({
        title: `${f.stage} Nutrition`,
        description: f.recommendation,
        impact: f.impact,
        urgency: f.urgency
      })),
      harvestingGuidance: {
        daysRemaining: enrichedCrop.harvesting.harvestingDays,
        recommendedWindow: enrichedCrop.harvesting.recommendedWindow,
        sugarBrixTarget: enrichedCrop.harvesting.sugarBrixTarget || 'Starch Optimum',
        firmnessKgCm2: enrichedCrop.harvesting.firmnessTarget || 'Firm',
        idealTimeOfDay: enrichedCrop.harvesting.bestHarvestTime,
        fieldPrecautions: enrichedCrop.harvesting.postHarvestHandling
      },
      packagingPresets: {
        recommendedMaterial: enrichedCrop.packaging.primaryPackaging,
        coldChainTier: enrichedCrop.transportation.targetTemp,
        idealStorageTemp: enrichedCrop.storage.storageTemperature,
        humidityTarget: enrichedCrop.storage.humidity,
        shockDampeningRating: enrichedCrop.packaging.shockRating,
        ventilationType: enrichedCrop.packaging.ventilationSpec,
        ethyleneControl: enrichedCrop.packaging.ethyleneControl,
        cushioningSpecs: enrichedCrop.packaging.cushioningSpecs,
        estimatedCostPerKg: enrichedCrop.packaging.estimatedPackagingCostPerKg
      },
      nutrition: enrichedCrop.consumption.nutritionalProfile,
      shelfLife: {
        ambientDays: enrichedCrop.storage.ambientDays,
        recommendedColdDays: enrichedCrop.storage.coldDays,
        optimalPreservationSteps: enrichedCrop.storage.preservationSteps,
        spoilageIndicators: enrichedCrop.storage.spoilageIndicators
      },
      recipes: enrichedCrop.consumption.recipes
    });
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      
      {/* 1. Universal Crop Search, Voice & Photo Upload Bar */}
      <section className="glass-panel rounded-3xl p-4 sm:p-6 border border-purple-500/30">
        <CropIdentificationBar
          activeCropName={productIntelligence.name}
          onSelectCrop={handleSelectCropFromIdentification}
        />
      </section>

      {/* 2. GPS Location & Live Microclimate Weather Bar */}
      <section>
        <LocationWeatherBar
          currentAddress={currentAddress}
          onLocationChanged={setCurrentAddress}
          weather={weather}
          onWeatherUpdated={setWeather}
        />
      </section>

      {/* 3. Verified Product Hero Banner with Live Mandi Price & Smart Plan CTA */}
      <section>
        <ProductHeroBanner
          product={productIntelligence}
          onOpenSmartPlan={() => setIsSmartPlanOpen(true)}
        />
      </section>

      {/* 4. Sub-Tab Navigation Bar */}
      <div className="flex justify-center overflow-x-auto py-1">
        <div className="inline-flex items-center p-1.5 rounded-2xl bg-slate-900/90 border border-purple-500/25 shadow-[0_0_25px_rgba(0,0,0,0.5)] gap-1">
          
          {/* APMC Mandi Radar */}
          <button
            onClick={() => setActiveSubTab('market')}
            className={`flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
              activeSubTab === 'market'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-purple-400/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <span>Mandi Radar & Prices</span>
          </button>

          {/* Packaging Architecture */}
          <button
            onClick={() => setActiveSubTab('packaging')}
            className={`flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
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
            className={`flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
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
            className={`flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
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
            className={`flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
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
            className={`flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
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
            className={`flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
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

      {/* 5. Active Tab Component Render */}
      <div>
        {activeSubTab === 'market' && (
          <MarketRadarSection
            product={productIntelligence}
            location={currentAddress}
            quantityKg={quantityKg}
            onQuantityChange={setQuantityKg}
          />
        )}

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

      {/* 6. Universal Smart Plan Modal */}
      <UniversalSmartPlanModal
        crop={productIntelligence}
        location={currentAddress}
        quantityKg={quantityKg}
        isOpen={isSmartPlanOpen}
        onClose={() => setIsSmartPlanOpen(false)}
        onExecutePlan={handleExecuteSmartPlan}
      />

    </div>
  );
};
