import React, { useState, useEffect } from 'react';
import { ProductPassport } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { QRScannerSimulator } from './QRScannerSimulator';
import { DigitalPassportCard } from './DigitalPassportCard';
import { FarmerGratitudeModal } from './FarmerGratitudeModal';
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
      if (data.success) {
        setPassport(data.passport);
      }
    } catch {
      // Local fallback
      generateFallbackPassport(batchId);
    } finally {
      setLoading(false);
    }
  };

  const generateFallbackPassport = (batchId: string) => {
    setPassport({
      batchId,
      verifiedBadge: 'AgriFlow Provenance Certified ✓',
      verificationHash: '0x8f2a93b41c098e7d2358891aa38914',
      crop: {
        id: 'crop-tomatoes',
        name: 'Vine-Ripened Roma Tomatoes',
        variety: 'San Marzano Hybrid',
        icon: '🍅',
        category: 'Vegetable',
        scientificName: 'Solanum lycopersicum'
      },
      origin: {
        farmerName: 'Dnyaneshwar Shinde',
        farmerPhone: '+91 94220 89112',
        farmLocation: 'Dindori Valley Certified Orchards, Nashik',
        soilHealthScore: '96/100 (Rich Organic Microbial Density)',
        chemicalResidueStatus: 'Zero Detected (APEDA / FSSAI Tested)',
        harvestTimestamp: '2026-10-03 at 06:15 AM (Dawn Harvest)'
      },
      coldChainLog: [
        { stage: 'Farm Pre-Cooling', timestamp: '03-Oct 07:30 AM', temperature: '13°C', status: 'Pre-cooled' },
        { stage: 'Smart Packaging', timestamp: '03-Oct 08:45 AM', temperature: '13.2°C', status: '5-Ply Kraft + KMnO4' },
        { stage: 'IoT Reefer Transit', timestamp: '03-Oct 10:15 AM', temperature: '13.4°C', status: 'Vibration & GPS Logged' },
        { stage: 'Supermarket Display', timestamp: '03-Oct 02:00 PM', temperature: '13.0°C', status: 'Delivered Fresh' }
      ],
      shelfLifeStatus: {
        ambientDaysRemaining: 5,
        refrigeratedDaysRemaining: 14,
        freshnessIndexPercent: 94,
        spoilageIndicators: ['Soft watery shoulder depressions', 'Wrinkled outer skin', 'Off-odor'],
        homePreservationSteps: [
          'Store stem-end down on a shallow breathable dish at 13°C - 16°C pantry',
          'Avoid storing near bananas or ethylene emitters',
          'Never refrigerate below 10°C to preserve aroma enzymes'
        ]
      },
      nutritionalBreakdown: {
        calories: 22,
        vitaminC_mg: 19.5,
        vitaminA_IU: 1025,
        dietaryFiber_g: 1.8,
        potassium_mg: 292,
        antioxidantIndex: 94,
        glycemicIndex: 15,
        highlights: ['Ultra-rich in bioavailable Lycopene', 'Cardiovascular support', 'Natural L-glutamate umami']
      },
      optimalConsumption: {
        bioavailabilityTip: 'Pair with cold-pressed olive oil to increase lycopene absorption by up to 400%.',
        recipes: [
          {
            title: 'Slow-Confit Roma Tomato & Rosemary Medley',
            prepTime: '45 mins',
            healthBenefit: 'Heat-activates cis-lycopene for higher bloodstream bioavailability',
            ingredients: ['8 ripe Roma tomatoes', '4 garlic cloves', 'Fresh rosemary', 'Extra virgin olive oil', 'Sea salt'],
            steps: [
              'Halve tomatoes and arrange in skillet',
              'Add crushed garlic and rosemary sprigs',
              'Submerge in olive oil and simmer at 110°C for 40 mins'
            ]
          }
        ]
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
