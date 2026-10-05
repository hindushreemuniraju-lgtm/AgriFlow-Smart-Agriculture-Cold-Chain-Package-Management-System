import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { ProductPassport } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { QRCodeSVG } from 'qrcode.react';
import { 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Heart, 
  Sparkles, 
  ThermometerSnowflake, 
  Clock, 
  Apple, 
  Utensils, 
  Printer, 
  CheckCircle2, 
  Info,
  ChevronRight,
  Flame,
  Award,
  Download
} from 'lucide-react';
import { AgriFlowPDFDownloadModal } from '../documents/AgriFlowPDFDownloadModal';
import { getProductIntelligence } from '../../data/productsDatabase';

interface DigitalPassportCardProps {
  passport: ProductPassport;
  onOpenTipModal: () => void;
}

export const DigitalPassportCard: React.FC<DigitalPassportCardProps> = ({ passport, onOpenTipModal }) => {
  const { t } = useLanguage();
  const [activeRecipeIndex, setActiveRecipeIndex] = useState<number>(0);
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState<boolean>(false);

  const activeRecipe = passport.optimalConsumption.recipes[activeRecipeIndex] || passport.optimalConsumption.recipes[0];
  const currentProd = getProductIntelligence(passport.batchId);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Cryptographic Passport Header Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-purple-950/60 to-slate-900 border-2 border-purple-400/40 shadow-[0_0_40px_rgba(168,85,247,0.25)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-purple-600/30 to-sky-500/20 border border-purple-400/40 flex items-center justify-center text-4xl sm:text-5xl shadow-inner shrink-0">
              {passport.crop.icon}
            </div>
            
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {passport.verifiedBadge}
                </span>
                <span className="text-xs font-mono text-purple-300 bg-purple-500/20 px-2.5 py-0.5 rounded-lg border border-purple-500/30">
                  Batch: {passport.batchId}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {passport.crop.name}
              </h2>
              <p className="text-xs text-slate-300 italic font-mono">
                {passport.crop.scientificName} • {passport.crop.variety}
              </p>
            </div>
          </div>

          {/* Quick Actions & Scannable QR Code */}
          <div className="flex items-center gap-4 bg-slate-950/90 p-4 rounded-2xl border border-purple-500/30">
            <div className="bg-white p-2 rounded-xl shadow-lg shrink-0">
              <QRCodeSVG
                value={`AGRIFLOW-PASSPORT:${passport.batchId}:${passport.verificationHash}`}
                size={70}
                level="M"
              />
            </div>
            <div className="space-y-2">
              <div className="text-[10px] text-slate-400 font-mono">Document Integrity Hash</div>
              <div className="text-[10px] text-sky-400 font-mono truncate max-w-[150px]">
                {passport.verificationHash}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPdfModalOpen(true)}
                  className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-[11px] font-semibold text-white shadow transition-all flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  <span>Download PDFs</span>
                </button>
                <button
                  onClick={() => setShowCertificateModal(true)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-purple-300 border border-purple-500/30 transition-all flex items-center gap-1"
                >
                  <Printer className="w-3 h-3" />
                  <span>Certificate</span>
                </button>
                <button
                  onClick={onOpenTipModal}
                  className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-[11px] font-bold text-white shadow-md transition-all flex items-center gap-1"
                >
                  <Heart className="w-3 h-3 fill-white" />
                  <span>Tip Farmer</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Grid: Farm Origin Profile (Left) & Real-Time Freshness & Shelf-Life (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Farm & Harvest Origin Profile */}
        <div className="lg:col-span-6 glass-panel rounded-3xl p-6 sm:p-7 border border-purple-500/25 space-y-5">
          <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-4 h-4" />
            <span>{t.customer.farmOrigin}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-purple-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono text-slate-400">{t.customer.farmer}</span>
                <div className="text-base font-extrabold text-white">{passport.origin.farmerName}</div>
                <div className="text-xs text-slate-400">{passport.origin.farmerPhone}</div>
              </div>
              <span className="text-3xl">👨‍🌾</span>
            </div>

            <div className="pt-2 border-t border-slate-800 text-xs space-y-1">
              <span className="text-slate-400">Territory & Farm Location:</span>
              <div className="font-semibold text-purple-200">{passport.origin.farmLocation}</div>
            </div>

            <div className="pt-2 border-t border-slate-800 text-xs space-y-1">
              <span className="text-slate-400">Verified Harvest Timestamp:</span>
              <div className="font-mono font-bold text-emerald-400">{passport.origin.harvestTimestamp}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] text-slate-400">{t.customer.soilScore}</span>
              <div className="text-sm font-bold text-sky-300 mt-0.5">{passport.origin.soilHealthScore}</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] text-slate-400">{t.customer.chemicalStatus}</span>
              <div className="text-sm font-bold text-emerald-400 mt-0.5">{passport.origin.chemicalResidueStatus}</div>
            </div>
          </div>
        </div>

        {/* Real-Time Freshness & Dynamic Shelf-Life Bar */}
        <div className="lg:col-span-6 glass-panel rounded-3xl p-6 sm:p-7 border border-purple-500/25 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>{t.customer.freshnessLife}</span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                Freshness Index: {passport.shelfLifeStatus.freshnessIndexPercent}%
              </span>
            </div>

            {/* Freshness animated bar */}
            <div className="space-y-1.5">
              <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden p-0.5 border border-purple-500/30">
                <div 
                  className="bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400 h-full rounded-full shadow-[0_0_15px_rgba(52,211,153,0.7)]"
                  style={{ width: `${passport.shelfLifeStatus.freshnessIndexPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>Harvested 03-Oct</span>
                <span className="text-emerald-400 font-bold">Peak Bioactive Window</span>
                <span>Gradual Decline</span>
              </div>
            </div>

            {/* Ambient vs Reefer Days Comparison */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                <div className="text-[10px] uppercase font-mono text-slate-400">{t.customer.daysAmbient}</div>
                <div className="text-2xl font-black text-amber-400 font-mono mt-1">
                  {passport.shelfLifeStatus.ambientDaysRemaining} Days
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">At 22°C - 25°C</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 via-sky-950/40 to-slate-950 border border-sky-500/30 text-center">
                <div className="text-[10px] uppercase font-mono text-sky-400">{t.customer.daysReefer}</div>
                <div className="text-2xl font-black text-sky-300 font-mono mt-1">
                  {passport.shelfLifeStatus.refrigeratedDaysRemaining} Days
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">At 12°C - 14°C Chiller</div>
              </div>
            </div>
          </div>

          {/* Home Preservation Tips */}
          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-purple-500/20 space-y-2">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-sky-400" />
              <span>{t.customer.preservationTips}:</span>
            </span>
            <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
              {passport.shelfLifeStatus.homePreservationSteps.slice(0, 3).map((step, i) => (
                <li key={i} className="leading-relaxed">{step}</li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      {/* Chronological Cold-Chain Transportation History Timeline */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-purple-500/25 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ThermometerSnowflake className="w-5 h-5 text-sky-400" />
            <h3 className="text-base sm:text-lg font-extrabold text-white">
              {t.customer.coldChainAudit}
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            IoT Temperature Logged ✓
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {passport.coldChainLog.map((log, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-900/80 border border-purple-500/20 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
                  Step 0{idx + 1}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">{log.temperature}</span>
              </div>
              <h4 className="text-xs font-bold text-white">{log.stage}</h4>
              <p className="text-[11px] text-slate-400 leading-snug">{log.status}</p>
              <div className="text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-800">
                {log.timestamp}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clinical Nutritional Breakdown (Interactive Meters) */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-purple-500/25 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Apple className="w-5 h-5 text-pink-400" />
            <h3 className="text-base sm:text-lg font-extrabold text-white">
              {t.customer.nutritionalProfile}
            </h3>
          </div>
          <span className="text-xs text-slate-400">Standard 100g Reference Portion</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-[10px] uppercase font-mono text-slate-400">Calories</div>
            <div className="text-xl font-black text-white font-mono mt-1">{passport.nutritionalBreakdown.calories} kcal</div>
            <div className="text-[10px] text-emerald-400 mt-0.5">Low Calorie</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-[10px] uppercase font-mono text-slate-400">Vitamin C</div>
            <div className="text-xl font-black text-amber-300 font-mono mt-1">{passport.nutritionalBreakdown.vitaminC_mg} mg</div>
            <div className="text-[10px] text-amber-400 mt-0.5">Immune Support</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-[10px] uppercase font-mono text-slate-400">Vitamin A</div>
            <div className="text-xl font-black text-sky-300 font-mono mt-1">{passport.nutritionalBreakdown.vitaminA_IU} IU</div>
            <div className="text-[10px] text-sky-400 mt-0.5">Vision Protection</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-[10px] uppercase font-mono text-slate-400">Dietary Fiber</div>
            <div className="text-xl font-black text-purple-300 font-mono mt-1">{passport.nutritionalBreakdown.dietaryFiber_g} g</div>
            <div className="text-[10px] text-purple-400 mt-0.5">Gut Microbiome</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-[10px] uppercase font-mono text-slate-400">Antioxidant Index</div>
            <div className="text-xl font-black text-pink-300 font-mono mt-1">{passport.nutritionalBreakdown.antioxidantIndex}/100</div>
            <div className="text-[10px] text-pink-400 mt-0.5">Cellular Defense</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-[10px] uppercase font-mono text-slate-400">Glycemic Index</div>
            <div className="text-xl font-black text-emerald-400 font-mono mt-1">GI {passport.nutritionalBreakdown.glycemicIndex}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Low Glycemic</div>
          </div>
        </div>

        {/* Nutritional Highlights */}
        <div className="flex flex-wrap gap-2 pt-2">
          {passport.nutritionalBreakdown.highlights.map((item, i) => (
            <span
              key={i}
              className="text-xs px-3 py-1 rounded-xl bg-purple-500/15 text-purple-200 border border-purple-500/25 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Optimal Consumption Guide & Chef Recipes */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-purple-500/25 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Utensils className="w-5 h-5 text-amber-400" />
              <h3 className="text-base sm:text-lg font-extrabold text-white">
                {t.customer.recipesTitle}
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Chef-curated preparation methods engineered to preserve and enhance bioactive nutrients
            </p>
          </div>

          {/* Recipe selector tabs */}
          {passport.optimalConsumption.recipes.length > 1 && (
            <div className="flex items-center gap-2">
              {passport.optimalConsumption.recipes.map((r, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveRecipeIndex(idx)}
                  className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                    activeRecipeIndex === idx
                      ? 'bg-purple-600 text-white border-purple-400 font-bold'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  Recipe {idx + 1}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Bioavailability Tip Banner */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-200 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white">Bioavailability Maximizer: </strong>
            <span>{passport.optimalConsumption.bioavailabilityTip}</span>
          </div>
        </div>

        {/* Selected Recipe Card */}
        {activeRecipe && (
          <div className="p-6 rounded-2xl bg-slate-950/70 border border-purple-500/20 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-500/15 pb-3">
              <div>
                <h4 className="text-base font-extrabold text-white">{activeRecipe.title}</h4>
                <span className="text-xs text-emerald-400 font-semibold">{activeRecipe.healthBenefit}</span>
              </div>
              <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-xl border border-slate-800">
                ⏱ {activeRecipe.prepTime}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Fresh Ingredients:</span>
                <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
                  {activeRecipe.ingredients.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Step-by-Step Culinary Method:</span>
                <ol className="text-xs text-slate-400 space-y-2">
                  {activeRecipe.steps.map((st, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold font-mono">0{i + 1}.</span>
                      <span className="leading-relaxed">{st}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Certificate Modal */}
      {showCertificateModal && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="max-w-2xl w-full rounded-3xl bg-slate-900 border border-purple-500/40 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl">
                  📜
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Cryptographic Certificate of Provenance</h3>
                  <p className="text-xs text-slate-400">Batch Ref: {passport.batchId}</p>
                </div>
              </div>
              <button
                onClick={() => setShowCertificateModal(false)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-purple-500/20 text-xs font-mono text-slate-300 space-y-3">
              <div className="text-center font-bold text-purple-300 text-sm border-b border-slate-800 pb-2">
                AGRIFLOW VERIFIED PRODUCE PASSPORT
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>Produce: {passport.crop.name}</div>
                <div>Variety: {passport.crop.variety}</div>
                <div>Origin: {passport.origin.farmLocation}</div>
                <div>Farmer: {passport.origin.farmerName}</div>
                <div>Harvest Date: {passport.origin.harvestTimestamp}</div>
                <div>Hash: {passport.verificationHash}</div>
                <div>Cold Chain: Temperature Monitored & Compliant</div>
                <div>Residue: 0% Detected (Reference Baseline)</div>
              </div>
              <div className="text-[10px] text-slate-500 pt-2 border-t border-slate-800">
                This digital passport record is generated from AgriFlow IoT Cold-Chain Monitoring and verified agronomic protocols.
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Certificate</span>
              </button>
              <button
                onClick={() => setShowCertificateModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 font-semibold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* AgriFlow Official PDF Download Modal */}
      <AgriFlowPDFDownloadModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        product={currentProd}
        batchId={passport.batchId}
      />

    </div>
  );
};
