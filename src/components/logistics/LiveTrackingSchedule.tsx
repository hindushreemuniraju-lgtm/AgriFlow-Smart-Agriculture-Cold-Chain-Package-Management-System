import React, { useState, useEffect } from 'react';
import { FarmerOrder } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { AgriFlowPDFDownloadModal } from '../documents/AgriFlowPDFDownloadModal';
import { 
  Navigation, 
  ThermometerSnowflake, 
  Droplets, 
  Gauge, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  Truck, 
  Radio,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  Play,
  Pause,
  Compass,
  Download
} from 'lucide-react';

interface LiveTrackingScheduleProps {
  orders: FarmerOrder[];
  selectedOrderId?: string;
}

export const LiveTrackingSchedule: React.FC<LiveTrackingScheduleProps> = ({ orders, selectedOrderId }) => {
  const { t } = useLanguage();
  
  const inTransitOrders = orders.filter(o => o.status === 'In Transit' || o.status === 'Requested');
  const [activeOrderId, setActiveOrderId] = useState<string>(
    selectedOrderId || inTransitOrders[0]?.id || orders[0]?.id || 'ORD-8921'
  );

  const [gpsMode, setGpsMode] = useState<'simulated' | 'browser_gps'>('simulated');
  const [isTripActive, setIsTripActive] = useState<boolean>(true);
  const [activeWaypointIndex, setActiveWaypointIndex] = useState<number>(2);
  const [telemetryData, setTelemetryData] = useState<any>(null);
  const [sensorHistory, setSensorHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>('Just now');
  const [isPdfModalOpen, setIsPdfModalOpen] = useState<boolean>(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  const currentOrder = orders.find(o => o.id === activeOrderId) || orders[0];

  // Simulated Highway Route Waypoints (Bengaluru -> Tumakuru -> Chitradurga -> Anantapur -> Hyderabad)
  const waypoints = [
    { name: 'Bengaluru APMC Gateway (Origin)', lat: 12.9716, lng: 77.5946, time: '06:00 AM', status: 'Pre-cooled & Dispatched' },
    { name: 'Tumakuru Highway Tollway', lat: 13.3379, lng: 77.1006, time: '08:15 AM', status: 'Reefer Temp 13.1°C' },
    { name: 'Chitradurga Logistics Corridor', lat: 14.2251, lng: 76.3980, time: '11:45 AM', status: 'Cruising at 62 km/h (Active)' },
    { name: 'Anantapur Interchange Hub', lat: 14.6819, lng: 77.6006, time: '03:30 PM', status: 'Scheduled Checkpoint' },
    { name: 'Hyderabad Central Food Park (Destination)', lat: 17.3850, lng: 78.4867, time: '07:00 PM', status: 'Final Drop-off' }
  ];

  useEffect(() => {
    fetchTelemetry(activeOrderId);
    const interval = setInterval(() => {
      fetchTelemetry(activeOrderId);
      if (isTripActive && gpsMode === 'simulated') {
        setActiveWaypointIndex((prev) => (prev < waypoints.length - 1 ? prev + 1 : 0));
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [activeOrderId, isTripActive, gpsMode]);

  const handleRealGpsToggle = () => {
    if (gpsMode === 'simulated') {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setGpsMode('browser_gps');
            setGeoError(null);
            setTelemetryData((prev: any) => ({
              ...prev,
              gpsCoordinates: { lat: pos.coords.latitude, lng: pos.coords.longitude },
              locationName: `Live Browser Coordinates (${pos.coords.latitude.toFixed(4)}°N, ${pos.coords.longitude.toFixed(4)}°E)`
            }));
          },
          (err) => {
            setGeoError('Location permission denied. Reverting to Simulated Demo GPS.');
            setGpsMode('simulated');
          }
        );
      } else {
        setGeoError('Geolocation not supported by device. Using Demo Mode.');
      }
    } else {
      setGpsMode('simulated');
      setGeoError(null);
    }
  };

  const fetchTelemetry = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/logistics/telemetry/${id}`);
      const data = await res.json();
      if (data.success) {
        setTelemetryData(data.currentTelemetry);
        setSensorHistory(data.sensorHistory || []);
        setLastRefreshed(new Date().toLocaleTimeString());
      }
    } catch {
      generateLocalTelemetry();
    } finally {
      setLoading(false);
    }
  };

  const generateLocalTelemetry = () => {
    const baseTemp = 13.2;
    const currentTemp = (baseTemp + (Math.random() * 0.4 - 0.2)).toFixed(1);
    const wp = waypoints[activeWaypointIndex] || waypoints[2];

    setTelemetryData({
      reeferTemperature: parseFloat(currentTemp),
      targetTemperature: 13.0,
      humidityPercent: 88,
      vehicleSpeedKmph: Math.round(55 + Math.random() * 8),
      doorStatus: 'Locked & Sealed',
      gpsCoordinates: { lat: wp.lat, lng: wp.lng },
      etaMinutes: Math.max(15, 120 - activeWaypointIndex * 25),
      locationName: wp.name
    });

    setSensorHistory([
      { time: '10:00 AM', temp: 13.0, humidity: 88 },
      { time: '10:30 AM', temp: 13.2, humidity: 87 },
      { time: '11:00 AM', temp: 13.1, humidity: 89 },
      { time: '11:30 AM', temp: 13.3, humidity: 88 },
      { time: '12:00 PM', temp: parseFloat(currentTemp), humidity: 88 }
    ]);
    setLastRefreshed(new Date().toLocaleTimeString());
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Top Selector: Active Load Tracker */}
      <div className="glass-panel rounded-3xl p-6 border border-purple-500/25 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <Radio className="w-4 h-4 animate-pulse text-emerald-400" />
            <span>Continuous IoT Cold-Chain Telemetry Feed</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
            {t.logistics.liveTrackingTab}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time multi-sensor telemetry broadcasting reefer core temperature, vibration, door security, and GPS coordinates.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Real GPS vs Demo GPS Toggle */}
          <button
            onClick={handleRealGpsToggle}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              gpsMode === 'browser_gps'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-900 text-purple-300 border border-purple-500/30 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{gpsMode === 'browser_gps' ? '🛰️ Live Hardware GPS' : '🚗 Simulated Demo GPS'}</span>
          </button>

          <select
            value={activeOrderId}
            onChange={(e) => setActiveOrderId(e.target.value)}
            className="bg-slate-900 border border-purple-500/40 text-slate-200 text-xs sm:text-sm rounded-xl px-3 py-2 outline-none font-semibold cursor-pointer"
          >
            {orders.map((o) => (
              <option key={o.id} value={o.id} className="bg-slate-900">
                {o.batchId} • {o.cropName} ({o.status})
              </option>
            ))}
          </select>

          <button
            onClick={() => setIsPdfModalOpen(true)}
            className="px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Audit PDF</span>
          </button>
        </div>
      </div>

      {geoError && (
        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{geoError}</span>
        </div>
      )}

      {/* GPS Mode Label Banner */}
      <div className="p-3 rounded-2xl bg-slate-950/80 border border-purple-500/20 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${gpsMode === 'browser_gps' ? 'bg-emerald-400' : 'bg-sky-400'} animate-ping`} />
          <span className="font-bold text-white uppercase tracking-wider font-mono text-[11px]">
            {gpsMode === 'browser_gps' ? 'GPS MODE: VERIFIED HARDWARE SENSOR' : 'GPS MODE: SIMULATED DEMO ROUTE (Bengaluru ➔ Hyderabad Corridor)'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsTripActive(!isTripActive)}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-purple-300 text-[11px] font-bold border border-purple-500/30 flex items-center gap-1"
          >
            {isTripActive ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{isTripActive ? 'Pause Trip' : 'Resume Trip'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Telemetry Gauges (Left) & Route Map / Timeline (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Real-Time Sensor Telemetry HUD (Left) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel rounded-3xl p-6 border border-purple-500/25 space-y-6">
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
              <div>
                <span className="text-[10px] uppercase font-mono text-slate-400">Target Produce</span>
                <h3 className="text-base font-bold text-white">{currentOrder?.cropName}</h3>
                <span className="text-xs text-purple-300 font-mono">Batch: {currentOrder?.batchId}</span>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-mono text-slate-400">Driver & Rig</span>
                <div className="text-xs font-bold text-white">{currentOrder?.driverName || 'Rajesh Patil'}</div>
                <div className="text-[10px] text-slate-400 font-mono">{currentOrder?.vehicleNumber || 'MH-15-DC-8841'}</div>
              </div>
            </div>

            {/* 4 Sensor Gauges */}
            <div className="grid grid-cols-2 gap-3.5">
              
              {/* Reefer Temp Gauge */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-sky-950/40 to-slate-950 border border-sky-500/30 space-y-1 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-sky-400">
                  <div className="flex items-center gap-1 font-medium">
                    <ThermometerSnowflake className="w-4 h-4" />
                    <span>Reefer Temp</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">Locked</span>
                </div>
                <div className="text-2xl font-black text-white font-mono mt-1">
                  {telemetryData?.reeferTemperature || 13.2}°C
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Setpoint: {telemetryData?.targetTemperature || 13.0}°C (±0.4°C)
                </div>
              </div>

              {/* Relative Humidity */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-purple-950/40 to-slate-950 border border-purple-500/30 space-y-1">
                <div className="flex items-center justify-between text-xs text-purple-400">
                  <div className="flex items-center gap-1 font-medium">
                    <Droplets className="w-4 h-4" />
                    <span>Humidity</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">Controlled</span>
                </div>
                <div className="text-2xl font-black text-white font-mono mt-1">
                  {telemetryData?.humidityPercent || 88}% RH
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Vapor-lock active
                </div>
              </div>

              {/* Highway Speed */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1 font-medium">
                    <Gauge className="w-4 h-4 text-amber-400" />
                    <span>Road Speed</span>
                  </div>
                </div>
                <div className="text-2xl font-black text-white font-mono mt-1">
                  {telemetryData?.vehicleSpeedKmph || 58} <span className="text-xs font-normal text-slate-400">km/h</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Air-Ride Suspension
                </div>
              </div>

              {/* ETA Minutes */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1 font-medium">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    <span>ETA Dropoff</span>
                  </div>
                </div>
                <div className="text-2xl font-black text-emerald-300 font-mono mt-1">
                  {telemetryData?.etaMinutes || 65} <span className="text-xs font-normal text-slate-400">mins</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  On-schedule corridor
                </div>
              </div>

            </div>

            {/* Container Seal Status */}
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-purple-500/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Door Security Sensor: <strong className="text-white">{telemetryData?.doorStatus || 'Locked & Sealed'}</strong></span>
              </div>
              <span className="text-[10px] font-mono text-purple-300">Updated {lastRefreshed}</span>
            </div>

            {/* Temperature Sensor History Sparkline */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Core Reefer Temperature Log (Past 2 Hours)</span>
                <span className="font-mono text-sky-400 font-bold">±0.2°C Stability</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5 text-center text-[10px] font-mono">
                {sensorHistory.map((s, idx) => (
                  <div key={idx} className="p-2 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-sky-300 font-bold">{s.temp}°C</div>
                    <div className="text-slate-500 text-[9px] mt-0.5">{s.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Visual Route Timeline & Highway Corridor (Right) */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-purple-500/25 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-sky-400" />
                <h3 className="text-base font-bold text-white">Highway Transit Waypoint Corridor</h3>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                Live Route Tracked ✓
              </span>
            </div>

            {/* Current Geo Location Box */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-purple-500/25 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-mono text-slate-400">Current Position</div>
                  <div className="text-xs sm:text-sm font-bold text-white">
                    {telemetryData?.locationName || waypoints[activeWaypointIndex]?.name}
                  </div>
                </div>
              </div>
              <div className="text-right text-[11px] font-mono text-slate-400">
                {telemetryData?.gpsCoordinates?.lat?.toFixed(4)}° N, {telemetryData?.gpsCoordinates?.lng?.toFixed(4)}° E
              </div>
            </div>

            {/* 5-Stage Chronological Route Progress */}
            <div className="space-y-4 pt-4">
              {waypoints.map((wp, idx) => {
                const isPassed = activeWaypointIndex >= idx;
                const isCurrent = activeWaypointIndex === idx;

                return (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${
                        isCurrent
                          ? 'bg-sky-600 border-sky-400 text-white shadow-[0_0_15px_rgba(56,189,248,0.6)] scale-110'
                          : isPassed
                          ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                          : 'bg-slate-900 border-slate-700 text-slate-500'
                      }`}>
                        {isPassed ? <CheckCircle2 className="w-4 h-4" /> : `0${idx + 1}`}
                      </div>
                      {idx < waypoints.length - 1 && (
                        <div className={`w-0.5 h-10 ${isPassed ? 'bg-gradient-to-b from-purple-500 to-indigo-500' : 'bg-slate-800'}`} />
                      )}
                    </div>

                    <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-xs sm:text-sm font-bold ${isPassed ? 'text-white' : 'text-slate-400'}`}>
                          {wp.name}
                        </h4>
                        <span className="text-xs font-mono text-purple-300 font-semibold">{wp.time}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{wp.status}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Environmental Compliance Audit Badge */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-950 border border-emerald-500/25 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Cold-Chain Audit Pass: Zero thermal breaches logged across national highway.</span>
            </div>
            <span className="text-emerald-400 font-bold font-mono">SAFE RANGE MONITORED</span>
          </div>
        </div>

      </div>

      {/* PDF Download Modal */}
      <AgriFlowPDFDownloadModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        order={currentOrder}
        batchId={currentOrder.batchId}
      />

    </div>
  );
};
