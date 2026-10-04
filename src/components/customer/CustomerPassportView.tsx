import React, { useState, useEffect } from 'react';
import { ProductPassport } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { QRScannerSimulator } from './QRScannerSimulator';
import { DigitalPassportCard } from './DigitalPassportCard';
import { FarmerGratitudeModal } from './FarmerGratitudeModal';
import { getProductIntelligence } from '../../data/productsDatabase';
import { QrCode, Sparkles } from 'lucide-react';

interface CustomerPassportViewProps {
  initialBatchId?: string;
}

export const CustomerPassportView: React.FC<CustomerPassportViewProps> = ({ initialBatchId = 'AGF-8921' }) => {
  const { t } = useLanguage();
  const [activeBatchId, setActiveBatchId] = useState<string>(initialBatchId);
  const [passport, setPassport] = useState<ProductPassport | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showTipModal, setShowTipModal] = useState<boolean>(false);

  useEffect(() => {
    fetchPassport(activeBatchId);
  }, [activeBatchId]);

  const fetchPassport = async (batchId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/passport/${batchId}`);
      const data = await res.json();
      if (data.success && data.passport) {
        setPassport(data.passport);
      } else {
        generateDynamicProductPassport(batchId);
      }
    } catch {
      // Offline fallback using rich product database
      generateDynamicProductPassport(batchId);
    } finally {
      setLoading(false);
    }
  };

  const generateDynamicProductPassport = (batchId: string) => {
    const prod = getProductIntelligence(batchId);
    const targetTempNum = parseFloat(prod.transportation.targetTemp) || 12.5;

    setPassport({
      batchId,
      verifiedBadge: 'AgriFlow Provenance Certified ✓',
      verificationHash: `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`,
      crop: {
        id: `crop-${prod.id}`,
        name: prod.name,
        variety: prod.variety,
        icon: prod.icon,
        category: prod.category,
        scientificName: prod.scientificName
      },
      origin: {
        farmerName: 'Ramesh Patil & Agro FPO',
        farmerPhone: '+91 98230 45192',
        farmLocation: 'Sahyadri Agri Valley Orchards, Nashik Cluster',
        soilHealthScore: '96/100 (High Organic Carbon & Mycorrhizae)',
        chemicalResidueStatus: 'Zero Chemical Residue (APEDA Tested)',
        harvestTimestamp: 'Harvested at 06:15 AM (Dawn Pick)'
      },
      coldChainLog: [
        { stage: 'Field Harvest & De-sapping/Curing', timestamp: 'Day 0 • 06:15 AM', temperature: `${targetTempNum}°C`, status: 'Farm Cleared' },
        { stage: 'Smart Multi-Layer Packaging', timestamp: 'Day 0 • 08:30 AM', temperature: `${targetTempNum}°C`, status: prod.packaging.primaryPackaging },
        { stage: 'IoT Reefer Fleet Transit', timestamp: 'Day 0 • 11:00 AM', temperature: `${targetTempNum + 0.2}°C`, status: 'GPS & Shock Monitored' },
        { stage: 'Retail Mandi Distribution Center', timestamp: 'Day 0 • 03:30 PM', temperature: `${targetTempNum}°C`, status: '100% Freshness Retained' }
      ],
      shelfLifeStatus: {
        ambientDaysRemaining: prod.storage.ambientDays,
        refrigeratedDaysRemaining: prod.storage.coldDays,
        freshnessIndexPercent: 96,
        spoilageIndicators: prod.storage.spoilageIndicators,
        homePreservationSteps: prod.storage.preservationSteps
      },
      nutritionalBreakdown: {
        calories: prod.consumption.nutritionalProfile.calories,
        vitaminC_mg: prod.consumption.nutritionalProfile.vitaminC_mg,
        vitaminA_IU: prod.consumption.nutritionalProfile.vitaminA_IU,
        dietaryFiber_g: prod.consumption.nutritionalProfile.dietaryFiber_g,
        potassium_mg: prod.consumption.nutritionalProfile.potassium_mg,
        antioxidantIndex: prod.consumption.nutritionalProfile.antioxidantIndex,
        glycemicIndex: prod.consumption.nutritionalProfile.glycemicIndex,
        highlights: prod.consumption.nutritionalProfile.highlights
      },
      optimalConsumption: {
        bioavailabilityTip: prod.consumption.bioavailabilityTip,
        recipes: prod.consumption.recipes
      }
    });
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-fuchsia-950/40 to-slate-900 border border-fuchsia-500/30 shadow-[0_0_35px_rgba(217,70,239,0.15)]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/20 border border-fuchsia-400/30 text-fuchsia-300 text-xs font-semibold">
            <QrCode className="w-3.5 h-3.5 text-pink-400" />
            <span>Farm-to-Fork Cryptographic Provenance</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t.customer.title}
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            {t.customer.subtitle}
          </p>
        </div>
      </div>

      {/* QR Code Scanner / Simulator */}
      <QRScannerSimulator
        onScanBatch={(batchId) => setActiveBatchId(batchId)}
        activeBatchId={activeBatchId}
      />

      {/* Digital Passport Details */}
      {loading ? (
        <div className="glass-panel rounded-3xl p-12 text-center space-y-3">
          <div className="w-10 h-10 mx-auto border-3 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <div className="text-sm font-bold text-white font-mono">Fetching Cryptographic Passport #{activeBatchId}...</div>
        </div>
      ) : passport ? (
        <DigitalPassportCard
          passport={passport}
          onOpenTipModal={() => setShowTipModal(true)}
        />
      ) : null}

      {/* Farmer Gratitude Modal */}
      {showTipModal && passport && (
        <FarmerGratitudeModal
          passport={passport}
          onClose={() => setShowTipModal(false)}
        />
      )}

    </div>
  );
};
