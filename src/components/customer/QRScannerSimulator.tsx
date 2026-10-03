import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { QrCode, Sparkles, Camera, CheckCircle2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QRScannerSimulatorProps {
  onScanBatch: (batchId: string) => void;
  activeBatchId: string;
}

const PRESET_BATCHES = [
  { batchId: 'AGF-8921', crop: 'Vine-Ripened Roma Tomatoes', origin: 'Dindori Valley, Nashik', icon: '🍅' },
  { batchId: 'AGF-4412', crop: 'Ratnagiri Alphonso Mangoes', origin: 'Pawas Coast, Ratnagiri', icon: '🥭' },
  { batchId: 'AGF-7734', crop: 'Winter Dawn Strawberries', origin: 'Bhilare Terraces, Mahabaleshwar', icon: '🍓' },
  { batchId: 'AGF-3390', crop: 'Greenhouse Bell Peppers', origin: 'Sinnar Agro Polyhouse, Nashik', icon: '🫑' },
  { batchId: 'AGF-5501', crop: 'Thompson Seedless Grapes', origin: 'Pimpalgaon Grape Valley', icon: '🍇' },
];

export const QRScannerSimulator: React.FC<QRScannerSimulatorProps> = ({ onScanBatch, activeBatchId }) => {
  const { t } = useLanguage();
  const [customInput, setCustomInput] = useState<string>('');
  const [scanningEffect, setScanningEffect] = useState<boolean>(false);

  const triggerScan = (batchId: string) => {
    setScanningEffect(true);
    setTimeout(() => {
      setScanningEffect(false);
      onScanBatch(batchId);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#38bdf8', '#10b981']
      });
    }, 600);
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-purple-500/30 space-y-6 shadow-[0_0_35px_rgba(168,85,247,0.15)]">
      
      {/* Scanner Visual HUD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Animated Camera / Scanner Simulation Box (Left) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950/80 border border-purple-500/25 relative overflow-hidden">
          
          {/* Laser scanning beam */}
          <div className="relative w-56 h-56 rounded-2xl border-2 border-dashed border-purple-400/40 flex items-center justify-center bg-slate-900/50 shadow-inner">
            {/* 4 Corner Markers */}
            <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-sky-400" />
            <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-sky-400" />
            <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-sky-400" />
            <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-sky-400" />

            {/* Glowing Laser Scan Bar */}
            <div 
              className={`absolute left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-purple-400 to-pink-400 shadow-[0_0_15px_rgba(56,189,248,0.9)] transition-all duration-700 pointer-events-none ${
                scanningEffect ? 'top-3/4 opacity-100' : 'top-1/4 opacity-60'
              }`}
              style={{
                animation: 'pulseGlow 2s infinite ease-in-out'
              }}
            />

            <div className="text-center space-y-2 z-10">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-600/20 border border-purple-400/30 flex items-center justify-center text-3xl text-purple-300">
                <QrCode className="w-9 h-9 animate-pulse" />
              </div>
              <div className="text-[11px] font-mono text-purple-200 font-bold uppercase tracking-wider">
                {scanningEffect ? 'Decoding Cryptographic Provenance...' : 'Align Package QR Tag'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 mt-4">
            <Camera className="w-3.5 h-3.5 text-sky-400" />
            <span>Simulated Sensor Resolution: 4K HDR Optical Tag Reader</span>
          </div>
        </div>

        {/* Quick-Scan Preset Batches & Manual Input (Right) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
              {t.customer.quickScanPreset}
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-white">
              Instant 1-Click Package Passport Scanner
            </h3>
            <p className="text-xs text-slate-400">
              Click any verified batch below to immediately decode its harvest timestamp, cold-chain reefer logs, and clinical nutrition metrics:
            </p>
          </div>

          {/* Preset Buttons Grid */}
          <div className="space-y-2.5">
            {PRESET_BATCHES.map((preset) => {
              const isActive = activeBatchId === preset.batchId;
              return (
                <button
                  key={preset.batchId}
                  onClick={() => triggerScan(preset.batchId)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-950/70 to-indigo-950/70 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)] ring-1 ring-purple-400/50'
                      : 'bg-slate-900/60 border-purple-500/20 hover:border-purple-400/50 hover:bg-slate-850/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{preset.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-sky-300">{preset.batchId}</span>
                        <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3" /> Verified
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white mt-0.5">{preset.crop}</h4>
                      <p className="text-[11px] text-slate-400">{preset.origin}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-bold text-purple-300 group-hover:text-white">
                    <span>Inspect Passport</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Custom QR Code Input */}
          <div className="pt-2 flex items-center gap-2">
            <input
              type="text"
              placeholder="Or enter any custom batch code (e.g. AGF-8921)..."
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value.toUpperCase())}
              className="flex-1 bg-slate-900/90 border border-purple-500/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 font-mono outline-none focus:border-purple-400"
            />
            <button
              onClick={() => customInput && triggerScan(customInput)}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md"
            >
              Scan Tag
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
