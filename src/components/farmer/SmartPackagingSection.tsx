import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CropInfo, PackagingRecommendation } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Box, 
  ShieldCheck, 
  ThermometerSnowflake, 
  Wind, 
  Leaf, 
  QrCode, 
  Sliders, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  Printer, 
  Layers, 
  AlertCircle,
  Truck,
  ArrowRight,
  Info,
  Building2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MordComplianceSection } from '../compliance/MordComplianceSection';

interface SmartPackagingSectionProps {
  selectedCrop: CropInfo;
  onOpenTransportOrder: (recommendation: PackagingRecommendation) => void;
}

export const SmartPackagingSection: React.FC<SmartPackagingSectionProps> = ({
  selectedCrop,
  onOpenTransportOrder
}) => {
  const { t } = useLanguage();
  const [distanceKm, setDistanceKm] = useState<number>(185);
  const [targetMarket, setTargetMarket] = useState<'Local Mandi' | 'Supermarket Chain' | 'Export' | 'Processing Plant'>('Supermarket Chain');
  const [activeLayer, setActiveLayer] = useState<number>(1);
  const [recommendation, setRecommendation] = useState<PackagingRecommendation | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);
  const [showSpecModal, setShowSpecModal] = useState<boolean>(false);

  // Fetch or calculate dynamic recommendation
  useEffect(() => {
    fetchRecommendation();
  }, [selectedCrop.id, distanceKm, targetMarket]);

  const fetchRecommendation = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/packaging/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cropId: selectedCrop.id,
          distanceKm,
          transitHours: Math.max(1, Math.round(distanceKm / 45)),
          targetMarket
        })
      });
      const data = await res.json();
      if (data.success) {
        setRecommendation(data.recommendation);
      }
    } catch {
      // Fallback local computation if offline
      computeFallback();
    } finally {
      setLoading(false);
    }
  };

  const computeFallback = () => {
    const isExport = targetMarket === 'Export';
    const isLocal = targetMarket === 'Local Mandi';
    const rec: PackagingRecommendation = {
      cropId: selectedCrop.id,
      cropName: selectedCrop.name,
      targetMarket,
      distanceKm,
      estimatedTransitHours: Math.max(1, Math.round(distanceKm / 45)),
      packagingMaterial: isExport
        ? 'Double-Walled Heavy Export Fluted Master Carton (Moisture Barrier)'
        : isLocal
        ? 'Heavy-Duty Reusable Ventilated Agri-Crate (HDPE Food Grade)'
        : '5-Ply Heavy Kraft Corrugated Box with precision side slots',
      cushioningSystem: isExport
        ? 'Honeycomb Air-Chamber Inserts with Soft Spun-Bond Foam Sleeves'
        : 'Molded Recycled Pulp Tray Dividers',
      coldChainTier: isExport
        ? 'Precision IoT Cold Chain with Data Logger Probe (0°C - 13°C)'
        : 'Chilled Air Logistics (12°C - 14°C)',
      idealTempRange: `${selectedCrop.optimalTempRange[0]}°C - ${selectedCrop.optimalTempRange[1]}°C`,
      idealHumidity: `${selectedCrop.optimalHumidityRange[0]}% - ${selectedCrop.optimalHumidityRange[1]}% RH`,
      shockAbsorptionRating: isExport ? 4.95 : 4.6,
      ventilationSpec: '6% Die-Cut Precision Air Vents',
      ethyleneManagement: 'Potassium Permanganate (KMnO4) Freshness Pad',
      ecoCertification: isExport ? 'A+ Zero-Plastic Biodegradable' : 'A 100% Recyclable FSC Kraft',
      costBreakdown: {
        perKg: (selectedCrop.packagingPresets.estimatedCostPerKg).toFixed(2),
        perBox: (selectedCrop.packagingPresets.estimatedCostPerKg * 10).toFixed(0),
        spoilagePreventionSavings: `${(selectedCrop.packagingPresets.estimatedCostPerKg * 42).toFixed(0)} saved in reduced bruising`
      },
      layers: [
        {
          layer: 1,
          name: 'Outer Protective Armor',
          material: isExport ? 'Export Moisture-Resistant Fluted Kraft' : '5-Ply Kraft Corrugated Box',
          function: 'Withstands stack loads up to 450 kg without side-wall deflection; water-repellent coating',
          icon: '📦',
          glowColor: '#38bdf8'
        },
        {
          layer: 2,
          name: 'Impact & Vibration Dampener',
          material: isExport ? 'Honeycomb Air-Chambers + Spun Foam' : 'Molded Recycled Pulp Tray Dividers',
          function: 'Absorbs highway G-forces up to 3.8g; isolates each fruit from abrasion friction',
          icon: '🛡️',
          glowColor: '#a855f7'
        },
        {
          layer: 3,
          name: 'Thermal & Microclimate Barrier',
          material: 'Active Reefer Cold Logistics',
          function: `Maintains pulp core between ${selectedCrop.optimalTempRange[0]}°C and ${selectedCrop.optimalTempRange[1]}°C for 48+ hours`,
          icon: '❄️',
          glowColor: '#06b6d4'
        },
        {
          layer: 4,
          name: 'Active Respiration & Ethylene Scavenger',
          material: 'Potassium Permanganate (KMnO4) Freshness Pad',
          function: 'Scavenges volatile ethylene gas to halt over-ripening and decay',
          icon: '🍃',
          glowColor: '#10b981'
        },
        {
          layer: 5,
          name: 'Digital Tamper-Evident QR Smart Tag',
          material: 'Dynamic QR Code Batch Seal with Cryptographic Provenance',
          function: 'Instant customer passport access, harvest verification, and cold chain log',
          icon: '📱',
          glowColor: '#c084fc'
        }
      ],
      packingSteps: [
        { step: 1, title: 'Base Crate Inspection & Anti-Microbial Liner', description: 'Clean crate and place food-grade anti-microbial bottom moisture pad.' },
        { step: 2, title: 'Individual Produce Placement', description: 'Arrange produce onto molded pulp tray with stem/calyx oriented upward.' },
        { step: 3, title: 'Active Freshness Pouch Insertion', description: 'Position potassium permanganate ethylene scavenger in central airflow channel.' },
        { step: 4, title: 'Telescopic Lid Closure & Strapping', description: 'Lock corner interlocks and secure with eco-friendly tension strapping.' },
        { step: 5, title: 'AgriFlow QR Batch Passport Affixing', description: 'Affix tamper-evident cryptographic QR code to top-right outer face.' }
      ]
    };
    setRecommendation(rec);
  };

  const toggleStep = (stepNumber: number) => {
    if (completedSteps.includes(stepNumber)) {
      setCompletedSteps(completedSteps.filter(s => s !== stepNumber));
    } else {
      setCompletedSteps([...completedSteps, stepNumber]);
      if (completedSteps.length + 1 === 5) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#a855f7', '#38bdf8', '#10b981']
        });
      }
    }
  };

  const selectedLayerInfo = recommendation?.layers.find(l => l.layer === activeLayer) || recommendation?.layers[0];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/30 shadow-[0_0_35px_rgba(168,85,247,0.18)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-600/20 via-sky-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Smart Packaging AI Architecture 4.0</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.farmer.packagingGuidance}
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Automated packaging specifications calculated for <span className="font-semibold text-purple-300">{selectedCrop.name}</span> based on transit friction, ambient heat risk, and target market standards.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowSpecModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-purple-500/30 text-slate-200 text-xs sm:text-sm font-semibold transition-all shadow-md hover:shadow-[0_0_15px_rgba(168,85,247,0.25)]"
            >
              <Printer className="w-4 h-4 text-purple-400" />
              <span>Packaging Blueprint PDF</span>
            </button>
            <button
              onClick={() => recommendation && onOpenTransportOrder(recommendation)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-500 hover:from-purple-500 hover:to-sky-400 text-white text-xs sm:text-sm font-bold shadow-[0_0_25px_rgba(147,51,234,0.4)] transition-all hover:scale-105"
            >
              <Truck className="w-4 h-4" />
              <span>Request Transport with this Spec</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Controls: Distance Slider & Target Market Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Transit Distance Slider */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-purple-500/25 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{t.farmer.transportDistance}</h3>
                <p className="text-xs text-slate-400">Transit friction factor</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-sky-400 font-mono">{distanceKm}</span>
              <span className="text-xs text-slate-400 ml-1">km</span>
            </div>
          </div>

          <div className="space-y-2">
            <input
              type="range"
              min="20"
              max="1500"
              step="10"
              value={distanceKm}
              onChange={(e) => setDistanceKm(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400 hover:accent-purple-400 transition-all"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>Local Mandi (30 km)</span>
              <span>Regional (250 km)</span>
              <span>Long-Haul (1000+ km)</span>
            </div>
          </div>

          {/* Computed Transit Duration & Friction Tier */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="text-[11px] text-slate-400 font-medium">Estimated Transit Time</div>
              <div className="text-base font-bold text-purple-300 font-mono mt-0.5">
                ~{Math.max(1, Math.round(distanceKm / 45))} Hours
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="text-[11px] text-slate-400 font-medium">Vibration Exposure</div>
              <div className="text-base font-bold text-amber-300 font-mono mt-0.5">
                {distanceKm > 400 ? 'High (Rigid Partitions)' : distanceKm > 100 ? 'Moderate' : 'Low'}
              </div>
            </div>
          </div>
        </div>

        {/* Target Market Selector */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 border border-purple-500/25 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-400">
              <Box className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">{t.farmer.targetMarket}</h3>
              <p className="text-xs text-slate-400">Select distribution channel to align compliance specs</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'Local Mandi', label: 'Local Mandi', icon: '🏪', desc: 'Reusable open-vent crates' },
              { id: 'Supermarket Chain', label: 'Supermarket', icon: '🛒', desc: '5-ply Kraft + Ethylene Pad' },
              { id: 'Export', label: 'Air/Sea Export', icon: '✈️', desc: 'Export VHT + 1-MCP Strip' },
              { id: 'Processing Plant', label: 'Food Processing', icon: '🏭', desc: 'Bulk food-grade tote' },
            ].map((market) => (
              <button
                key={market.id}
                onClick={() => setTargetMarket(market.id as any)}
                className={`flex flex-col items-start p-3.5 rounded-2xl border text-left transition-all duration-300 ${
                  targetMarket === market.id
                    ? 'bg-gradient-to-br from-purple-900/50 to-indigo-950/60 border-purple-400/60 shadow-[0_0_20px_rgba(168,85,247,0.3)] ring-1 ring-purple-400/50'
                    : 'bg-slate-900/60 border-purple-500/15 hover:border-purple-400/40 hover:bg-slate-800/50 text-slate-300'
                }`}
              >
                <span className="text-2xl mb-1.5">{market.icon}</span>
                <span className="text-xs font-bold text-white leading-tight">{market.label}</span>
                <span className="text-[10px] text-slate-400 mt-1">{market.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SHOWSTOPPER: 3D-Styled Multi-Layer Cross-Section Package Architecture */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-purple-500/30 relative overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-purple-500/20 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-sky-400" />
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                Interactive Cross-Section: 5-Layer Precision Protection Matrix
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Click any layer to inspect microscopic barrier functions, engineering specs, and thermal ratings
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-purple-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Compliance: ISO 22000 & APEDA Packhouse Standard</span>
          </div>
        </div>

        {/* Visual Stack & Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          
          {/* Visual Layer Stack (Left Column) */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-3">
            {recommendation?.layers.map((layer) => {
              const isSelected = activeLayer === layer.layer;
              return (
                <div
                  key={layer.layer}
                  onClick={() => setActiveLayer(layer.layer)}
                  className={`group relative cursor-pointer p-4 rounded-2xl transition-all duration-300 transform ${
                    isSelected
                      ? 'scale-[1.02] bg-gradient-to-r from-purple-950/80 via-slate-900/90 to-indigo-950/80 border-2 border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.35)]'
                      : 'bg-slate-900/70 border border-purple-500/20 hover:border-purple-400/50 hover:bg-slate-850/80'
                  }`}
                  style={{
                    perspective: '1000px',
                    transform: isSelected ? 'translateZ(10px)' : 'none'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-inner border"
                        style={{
                          backgroundColor: `${layer.glowColor}20`,
                          borderColor: `${layer.glowColor}50`
                        }}
                      >
                        {layer.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                            Layer 0{layer.layer}
                          </span>
                          <span className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                            {layer.name}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                          {layer.material}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span 
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: layer.glowColor, boxShadow: `0 0 10px ${layer.glowColor}` }}
                      />
                      <ChevronRight isSelected={isSelected} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Layer Deep-Dive Card (Right Column) */}
          <div className="lg:col-span-6 flex flex-col justify-between rounded-2xl bg-gradient-to-br from-slate-900/90 via-purple-950/30 to-slate-950 p-6 sm:p-7 border border-purple-500/30 shadow-[0_0_25px_rgba(0,0,0,0.4)] relative">
            <div className="absolute top-4 right-4 text-4xl opacity-15 select-none pointer-events-none">
              {selectedLayerInfo?.icon}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-sky-400 bg-sky-500/20 px-2.5 py-1 rounded-lg border border-sky-400/30">
                  LAYER 0{selectedLayerInfo?.layer} SPECIFICATION
                </span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Active in Blueprint
                </span>
              </div>

              <h4 className="text-xl sm:text-2xl font-black text-white">
                {selectedLayerInfo?.name}
              </h4>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-purple-500/20">
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                  Engineered Material Composition
                </div>
                <div className="text-sm font-semibold text-purple-200">
                  {selectedLayerInfo?.material}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-purple-500/20">
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                  Primary Protection Function
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedLayerInfo?.function}
                </p>
              </div>

              {/* Dynamic Technical Specs according to layer */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/20">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Dampening / Barrier</div>
                  <div className="text-sm font-extrabold text-white mt-0.5">
                    {activeLayer === 1 ? 'Edge Crush: 8.5 kN/m' : activeLayer === 2 ? 'G-Force Max: 3.8g' : activeLayer === 3 ? 'Delta T: < 1.2°C' : activeLayer === 4 ? 'C2H4 Scrub: 99.4%' : 'NFC & QR ISO 18000'}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-sky-950/40 border border-sky-500/20">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Eco-Degradability</div>
                  <div className="text-sm font-extrabold text-sky-300 mt-0.5">
                    {activeLayer === 5 ? 'Recyclable Tag' : '100% Bio-Compostable'}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-purple-500/20 mt-6 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Integrated into AgriFlow Master Packing SOP
              </span>
              <button
                onClick={() => {
                  const next = activeLayer === 5 ? 1 : activeLayer + 1;
                  setActiveLayer(next);
                }}
                className="text-xs font-bold text-purple-300 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <span>Inspect Next Layer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Glowing Key Metrics Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Shock & Vibration */}
        <div className="glass-panel-interactive rounded-2xl p-5 border border-purple-500/25 space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Grade 4.9 / 5.0
            </span>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">{t.farmer.shockAbsorption}</div>
            <div className="text-2xl font-black text-white mt-1">98.2% Dampening</div>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-400 h-full rounded-full w-[98%] shadow-[0_0_10px_rgba(168,85,247,0.7)]" />
          </div>
          <div className="text-[11px] text-slate-400">
            Molded pulp cavities eliminate side impact friction
          </div>
        </div>

        {/* Metric 2: Thermal Shield */}
        <div className="glass-panel-interactive rounded-2xl p-5 border border-purple-500/25 space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
              <ThermometerSnowflake className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
              {recommendation?.idealTempRange || '12°C - 14°C'}
            </span>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">{t.farmer.thermalTier}</div>
            <div className="text-2xl font-black text-white mt-1">48h Thermal Lock</div>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-sky-500 to-cyan-300 h-full rounded-full w-[94%] shadow-[0_0_10px_rgba(56,189,248,0.7)]" />
          </div>
          <div className="text-[11px] text-slate-400">
            Micro-reflective thermal liner prevents chill injury
          </div>
        </div>

        {/* Metric 3: Ethylene & Respiration */}
        <div className="glass-panel-interactive rounded-2xl p-5 border border-purple-500/25 space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
              <Wind className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              KMnO4 + Carbon
            </span>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">{t.farmer.ethyleneAbsorption}</div>
            <div className="text-2xl font-black text-white mt-1">99.4% Gas Scrub</div>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-300 h-full rounded-full w-[99%] shadow-[0_0_10px_rgba(16,185,129,0.7)]" />
          </div>
          <div className="text-[11px] text-slate-400">
            Halts climacteric respiration and decay onset
          </div>
        </div>

        {/* Metric 4: Spoilage Prevention ROI */}
        <div className="glass-panel-interactive rounded-2xl p-5 border border-purple-500/25 space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              4.6x ROI
            </span>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Prevented Spoilage Value</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">
              ₹{recommendation?.costBreakdown.spoilagePreventionSavings || '140 saved/box'}
            </div>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full w-[92%] shadow-[0_0_10px_rgba(245,158,11,0.7)]" />
          </div>
          <div className="text-[11px] text-slate-400">
            Packing cost ₹{recommendation?.costBreakdown.perBox || '24'}/box vs ₹140 loss avoidance
          </div>
        </div>
      </div>

      {/* 5-Step Standard Packing Blueprint (SOP) with Interactive Checkbox Progress */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-purple-500/25 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                {t.farmer.blueprintTitle}
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Follow this verified packing workflow to ensure zero rejection at retail distribution hubs
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-purple-300 font-semibold">
              {completedSteps.length} of 5 Completed
            </span>
            <div className="w-28 bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${(completedSteps.length / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {recommendation?.packingSteps.map((s) => {
            const isDone = completedSteps.includes(s.step);
            return (
              <div
                key={s.step}
                onClick={() => toggleStep(s.step)}
                className={`cursor-pointer rounded-2xl p-4.5 border transition-all duration-300 flex flex-col justify-between ${
                  isDone
                    ? 'bg-purple-950/40 border-purple-400/50 shadow-[0_0_20px_rgba(168,85,247,0.2)]'
                    : 'bg-slate-900/60 border-slate-800 hover:border-purple-500/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-6 h-6 rounded-full bg-slate-800 text-xs font-mono font-bold flex items-center justify-center text-purple-300 border border-purple-500/30">
                      0{s.step}
                    </span>
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                      isDone ? 'bg-emerald-500 border-emerald-400 text-white' : 'border-slate-700 bg-slate-800'
                    }`}>
                      {isDone && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1.5 leading-snug">
                    {s.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {s.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-purple-500/15 text-[10px] font-mono text-purple-300">
                  {isDone ? '✓ Verified by Packhouse' : 'Click to mark complete'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Blueprint PDF Modal */}
      {showSpecModal && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="max-w-2xl w-full rounded-3xl bg-slate-900 border border-purple-500/40 p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-xl">
                  📜
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">AgriFlow Certified Packaging Certificate</h3>
                  <p className="text-xs text-slate-400">Spec Ref: PKG-{selectedCrop.id.toUpperCase()}-2026</p>
                </div>
              </div>
              <button
                onClick={() => setShowSpecModal(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300 font-mono bg-slate-950 p-5 rounded-2xl border border-purple-500/20 max-h-96 overflow-y-auto">
              <div className="text-sky-400 font-bold border-b border-slate-800 pb-2">
                AGRIFLOW COLD-CHAIN & PACKAGING SPECIFICATION SHEET
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>Crop: {selectedCrop.name}</div>
                <div>Target Market: {targetMarket}</div>
                <div>Transit Distance: {distanceKm} km</div>
                <div>Ideal Core Temp: {recommendation?.idealTempRange}</div>
                <div>Recommended Shell: {recommendation?.packagingMaterial}</div>
                <div>Cushioning: {recommendation?.cushioningSystem}</div>
                <div>Ethylene Scrubbing: {recommendation?.ethyleneManagement}</div>
                <div>Eco Certification: {recommendation?.ecoCertification}</div>
              </div>
              <div className="pt-2 text-slate-400 text-[11px] leading-relaxed border-t border-slate-800">
                This specification conforms with APEDA, Codex Alimentarius, and FSSAI standards for perishable produce logistics. Tamper-evident dynamic QR Code generated upon dispatch.
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Document</span>
              </button>
              <button
                onClick={() => setShowSpecModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* MoRD Rural Compliance & Precision Logistics Section */}
      <div className="pt-6">
        <MordComplianceSection 
          commodityName={selectedCrop.name}
          defaultBatchId={`BAT-${selectedCrop.id.toUpperCase()}-2026`}
          isCollapsible={true}
          defaultOpen={false}
        />
      </div>
    </div>
  );
};

const ChevronRight: React.FC<{ isSelected: boolean }> = ({ isSelected }) => (
  <svg 
    className={`w-4 h-4 text-purple-400 transition-transform duration-300 ${isSelected ? 'rotate-90 text-sky-400' : ''}`} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
  </svg>
);
