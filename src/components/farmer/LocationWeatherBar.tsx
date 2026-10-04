import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, CloudSun, Droplets, Wind, AlertTriangle, Edit3, X, Check, RefreshCw } from 'lucide-react';
import { getCurrentGpsPosition, GpsLocation } from '../../services/location/gpsService';
import { reverseGeocodeLocation, resolveManualLocation, GeocodedAddress } from '../../services/location/geocodingService';
import { getAgroWeather, WeatherTelemetry } from '../../services/weather/weatherService';

interface LocationWeatherBarProps {
  currentAddress: GeocodedAddress;
  onLocationChanged: (address: GeocodedAddress) => void;
  weather: WeatherTelemetry | null;
  onWeatherUpdated: (weather: WeatherTelemetry) => void;
}

export const LocationWeatherBar: React.FC<LocationWeatherBarProps> = ({
  currentAddress,
  onLocationChanged,
  weather,
  onWeatherUpdated
}) => {
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [isManualModalOpen, setIsManualModalOpen] = useState<boolean>(false);
  const [manualInput, setManualInput] = useState<string>('');

  useEffect(() => {
    // Initial fetch of weather when address is available
    if (currentAddress) {
      getAgroWeather(currentAddress.latitude, currentAddress.longitude).then(onWeatherUpdated);
    }
  }, [currentAddress.latitude, currentAddress.longitude]);

  const handleAcquireGps = async () => {
    setIsLocating(true);
    setGpsError(null);
    try {
      const pos = await getCurrentGpsPosition();
      const addr = await reverseGeocodeLocation(pos.latitude, pos.longitude);
      onLocationChanged(addr);
      const w = await getAgroWeather(pos.latitude, pos.longitude);
      onWeatherUpdated(w);
    } catch (err: any) {
      setGpsError(err.message || 'Location permission denied.');
    } finally {
      setIsLocating(false);
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualInput.trim()) return;
    setIsLocating(true);
    try {
      const resolved = await resolveManualLocation(manualInput);
      onLocationChanged(resolved);
      const w = await getAgroWeather(resolved.latitude, resolved.longitude);
      onWeatherUpdated(w);
      setIsManualModalOpen(false);
      setManualInput('');
    } finally {
      setIsLocating(false);
    }
  };

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-purple-500/25 p-4 shadow-lg backdrop-blur-md flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      
      {/* Left: Location Banner & Selector */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center text-lg border border-purple-500/30 flex-shrink-0">
          <MapPin className="w-5 h-5 text-sky-400" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
              Farmer Origin Location
            </span>
            <span className="px-1.5 py-0.2 text-[9px] font-mono rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {currentAddress.source === 'gps' ? 'Live GPS' : 'Verified District'}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-0.5">
            <h4 className="text-xs sm:text-sm font-bold text-white">
              {currentAddress.formattedAddress}
            </h4>
            
            <button
              onClick={() => setIsManualModalOpen(true)}
              title="Change Location Manually"
              className="p-1 rounded-lg text-slate-400 hover:text-purple-300 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* GPS Acquire Button */}
        <button
          onClick={handleAcquireGps}
          disabled={isLocating}
          className="ml-auto lg:ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all cursor-pointer whitespace-nowrap"
        >
          {isLocating ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-sky-400" />
          ) : (
            <Navigation className="w-3.5 h-3.5 text-sky-400" />
          )}
          <span className="hidden sm:inline">Use GPS</span>
        </button>
      </div>

      {/* GPS Error Alert if Denied */}
      {gpsError && (
        <div className="text-[11px] text-amber-300 bg-amber-950/40 px-3 py-1.5 rounded-xl border border-amber-500/30 flex items-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>{gpsError}</span>
        </div>
      )}

      {/* Right: Live Weather Telemetry */}
      {weather && (
        <div className="flex items-center gap-4 text-xs pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xl select-none">{weather.conditionIcon}</span>
            <div>
              <div className="font-extrabold text-white font-mono text-sm">
                {weather.temperatureC}°C
              </div>
              <div className="text-[10px] text-slate-400 line-clamp-1">
                {weather.condition}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-mono border-l border-slate-800 pl-3">
            <div className="text-slate-300 flex items-center gap-1">
              <Droplets className="w-3.5 h-3.5 text-blue-400" />
              <span>{weather.humidityPercent}% RH</span>
            </div>

            <div className={`flex items-center gap-1 font-bold ${weather.isRainThreat ? 'text-amber-400' : 'text-emerald-400'}`}>
              <CloudSun className="w-3.5 h-3.5" />
              <span>{weather.rainProbabilityPercent}% Rain</span>
            </div>
          </div>
        </div>
      )}

      {/* Manual Location Dialog Modal */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-purple-500/40 p-6 shadow-2xl space-y-4">
            
            <button
              onClick={() => setIsManualModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center text-lg border border-purple-500/30">
                <MapPin className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Enter Location Manually</h3>
                <p className="text-xs text-slate-400">Specify your village, town, district, or PIN code</p>
              </div>
            </div>

            <form onSubmit={handleManualSubmit} className="space-y-4">
              <input
                type="text"
                autoFocus
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                placeholder="e.g. Tumakuru, Nashik, Kolar, Mandya, Agra..."
                className="w-full bg-slate-950 border border-purple-500/30 text-white rounded-xl px-4 py-3 text-xs sm:text-sm outline-none focus:border-purple-400"
              />

              <div className="flex flex-wrap gap-1.5 text-[11px]">
                <span className="text-slate-500">Quick suggestions:</span>
                {['Nashik', 'Tumakuru', 'Pune', 'Kolar', 'Mandya', 'Belagavi', 'Agra', 'Nagpur'].map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => setManualInput(city)}
                    className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-purple-300 cursor-pointer"
                  >
                    {city}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsManualModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!manualInput.trim() || isLocating}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Set Location</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
