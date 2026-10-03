import React, { useState } from 'react';
import { CropInfo } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { 
  CloudSun, 
  Droplets, 
  Sun, 
  Wind, 
  MapPin, 
  Calendar, 
  Clock, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Flame, 
  Layers, 
  Zap,
  Activity
} from 'lucide-react';

interface SmartInsightsEngineProps {
  selectedCrop: CropInfo;
}

const REGIONS = [
  { id: 'nashik', name: 'Nashik Agro Corridor, Maharashtra', temp: 28.4, moisture: 68, ph: 6.6, climate: 'Semi-Arid Tropical' },
  { id: 'ratnagiri', name: 'Ratnagiri Coastal Belt, Maharashtra', temp: 31.2, moisture: 74, ph: 6.2, climate: 'Humid Maritime' },
  { id: 'mahabaleshwar', name: 'Mahabaleshwar Highlands, Maharashtra', temp: 19.8, moisture: 82, ph: 6.5, climate: 'Montane Sub-Tropical' },
  { id: 'bengaluru', name: 'Bengaluru Rural Agro-Zone, Karnataka', temp: 24.5, moisture: 65, ph: 6.8, climate: 'Temperate Plateau' },
  { id: 'shimla', name: 'Shimla Apple Valley, Himachal Pradesh', temp: 15.2, moisture: 70, ph: 6.4, climate: 'Highland Alpine' },
];

export const SmartInsightsEngine: React.FC<SmartInsightsEngineProps> = ({ selectedCrop }) => {
  const { t } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState(REGIONS[0]);

  // Dynamic urgency badge styling
  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'Immediate':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'Scheduled':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      default:
        return 'bg-sky-500/20 text-sky-300 border-sky-500/30';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Bar: Regional Location Switcher & Quick Climate Status */}
      <div className="glass-panel rounded-3xl p-5 sm:p-6 border border-purple-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Farm Location Simulation</div>
            <div className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span>{selectedRegion.name}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-sky-300 border border-slate-700">
                {selectedRegion.climate}
              </span>
            </div>
          </div>
        </div>

        {/* Region selector dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 whitespace-nowrap">Switch Terroir:</label>
          <select
            value={selectedRegion.id}
            onChange={(e) => {
              const reg = REGIONS.find(r => r.id === e.target.value);
              if (reg) setSelectedRegion(reg);
            }}
            className="bg-slate-900 border border-purple-500/30 text-slate-200 text-xs rounded-xl px-3 py-2 outline-none focus:border-purple-400 font-medium cursor-pointer"
          >
            {REGIONS.map((r) => (
              <option key={r.id} value={r.id} className="bg-slate-900 text-slate-200">
                {r.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid: Microclimate & Soil Telemetry */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Weather & Microclimate */}
        <div className="glass-panel rounded-3xl p-6 border border-purple-500/25 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CloudSun className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">{t.farmer.weatherForecast}</h3>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
              Live Satellite Feed
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-mono">Ambient Temp</div>
              <div className="text-xl font-black text-amber-300 font-mono mt-1">{selectedRegion.temp}°C</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Optimal: {selectedCrop.optimalTempRange[0]}-{selectedCrop.optimalTempRange[1]}°C</div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-mono">Humidity</div>
              <div className="text-xl font-black text-sky-300 font-mono mt-1">78% RH</div>
              <div className="text-[10px] text-slate-500 mt-0.5">High Morning Dew</div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-mono">Solar Index</div>
              <div className="text-xl font-black text-purple-300 font-mono mt-1">7.8 kWh</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Peak Photosynthesis</div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-mono">Rain Risk</div>
              <div className="text-xl font-black text-emerald-300 font-mono mt-1">12%</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Ideal Picking Sky</div>
            </div>
          </div>
        </div>

        {/* Soil Health Telemetry */}
        <div className="glass-panel rounded-3xl p-6 border border-purple-500/25 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Activity className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">{t.farmer.soilHealth}</h3>
            </div>
            <span className="text-xs font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20">
              IoT Soil Probe #08
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-mono">Soil Moisture</div>
              <div className="text-xl font-black text-sky-400 font-mono mt-1">{selectedRegion.moisture}%</div>
              <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">Optimal Zone</div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-mono">Soil pH</div>
              <div className="text-xl font-black text-purple-400 font-mono mt-1">{selectedRegion.ph}</div>
              <div className="text-[10px] text-purple-300 font-semibold mt-0.5">Neutral Balance</div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-mono">Nitrogen (N)</div>
              <div className="text-xl font-black text-emerald-400 font-mono mt-1">142</div>
              <div className="text-[10px] text-slate-500 mt-0.5">kg/ha (Sufficient)</div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-mono">Potassium (K)</div>
              <div className="text-xl font-black text-amber-400 font-mono mt-1">290</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Rich (Fruit Firmness)</div>
            </div>
          </div>
        </div>

      </div>

      {/* Optimal Harvesting Timeline & Countdown Box */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-purple-500/30 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-500/20 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              ⏳
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-white">{t.farmer.optimalHarvest}</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Peak Bio-Readiness
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Target harvesting window based on sugar-acid balance and transport shock tolerance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/90 px-4 py-2 rounded-2xl border border-purple-500/25">
            <div className="text-right">
              <div className="text-[10px] uppercase font-mono text-slate-400">Countdown</div>
              <div className="text-xl font-black text-sky-400 font-mono">
                {selectedCrop.harvestingGuidance.daysRemaining} {selectedCrop.harvestingGuidance.daysRemaining === 1 ? 'Day' : 'Days'} Left
              </div>
            </div>
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          </div>
        </div>

        {/* 4 Harvesting Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-purple-500/20 space-y-1">
            <div className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              <span>Recommended Window</span>
            </div>
            <div className="text-base font-extrabold text-white">
              {selectedCrop.harvestingGuidance.recommendedWindow}
            </div>
            <div className="text-[10px] text-slate-500">Early seasonal peak</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-purple-500/20 space-y-1">
            <div className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.farmer.sugarTarget}</span>
            </div>
            <div className="text-base font-extrabold text-amber-300 font-mono">
              {selectedCrop.harvestingGuidance.sugarBrixTarget}
            </div>
            <div className="text-[10px] text-slate-500">Refractometer calibrated</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-purple-500/20 space-y-1">
            <div className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              <span>{t.farmer.firmness}</span>
            </div>
            <div className="text-base font-extrabold text-sky-300 font-mono">
              {selectedCrop.harvestingGuidance.firmnessKgCm2}
            </div>
            <div className="text-[10px] text-slate-500">Penetrometer measure</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-purple-500/20 space-y-1">
            <div className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.farmer.idealPickingTime}</span>
            </div>
            <div className="text-base font-extrabold text-emerald-300">
              {selectedCrop.harvestingGuidance.idealTimeOfDay}
            </div>
            <div className="text-[10px] text-slate-500">Avoid midday field heat</div>
          </div>
        </div>

        {/* Field Precautions list */}
        <div className="p-4.5 rounded-2xl bg-slate-950/70 border border-purple-500/20 space-y-2">
          <div className="text-xs font-bold text-slate-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Field Picking Standard Protocol:</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            {selectedCrop.harvestingGuidance.fieldPrecautions.map((prec, i) => (
              <div key={i} className="text-xs text-slate-400 flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                <span className="text-purple-400 font-bold font-mono">0{i + 1}.</span>
                <span>{prec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quality Improvement Interventions Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-extrabold text-white">{t.farmer.qualityTechniques}</h3>
          </div>
          <span className="text-xs text-slate-400">
            Actionable agronomy to boost brix, firmness & export grading
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {selectedCrop.qualityTechniques.map((tech, i) => (
            <div
              key={i}
              className="glass-panel rounded-2xl p-5 border border-purple-500/20 hover:border-purple-400/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${getUrgencyBadge(tech.urgency)}`}>
                    {tech.urgency}
                  </span>
                  <span className="text-xs font-mono text-slate-500">Action #{i + 1}</span>
                </div>
                <h4 className="text-sm font-bold text-white">{tech.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{tech.description}</p>
              </div>

              <div className="pt-3 border-t border-purple-500/15 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Expected Result:</span>
                <span className="font-bold text-emerald-400 text-right">{tech.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
