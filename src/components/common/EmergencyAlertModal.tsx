import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  AlertOctagon, 
  AlertTriangle, 
  CheckCircle2, 
  Volume2, 
  Bell, 
  X, 
  ShieldAlert, 
  ArrowRight,
  ExternalLink,
  MapPin
} from 'lucide-react';
import { 
  PostHarvestAlert, 
  playEmergencyAlarmTone, 
  triggerDeviceVibration, 
  requestBrowserNotificationPermission,
  dispatchBrowserNotification 
} from '../../services/weather/postHarvestAlertService';

interface EmergencyAlertModalProps {
  alert: PostHarvestAlert;
  onDismiss: () => void;
}

export const EmergencyAlertModal: React.FC<EmergencyAlertModalProps> = ({ alert, onDismiss }) => {
  const [notificationStatus, setNotificationStatus] = useState<'default' | 'granted' | 'denied' | 'unsupported'>('default');

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setNotificationStatus(Notification.permission);
    } else {
      setNotificationStatus('unsupported');
    }

    if (alert.level === 'EMERGENCY') {
      // Auto-trigger audio & vibration
      playEmergencyAlarmTone();
      triggerDeviceVibration();
      dispatchBrowserNotification(alert.title, `${alert.crop}: ${alert.risk}`);
    }
  }, [alert]);

  const handleRequestPush = async () => {
    const res = await requestBrowserNotificationPermission();
    setNotificationStatus(res);
    if (res === 'granted') {
      dispatchBrowserNotification(alert.title, `${alert.crop}: ${alert.risk}`);
    }
  };

  if (alert.level !== 'EMERGENCY') return null;

  return typeof document !== 'undefined' ? createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-red-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl rounded-3xl bg-slate-900 border-2 border-rose-500 shadow-[0_0_50px_rgba(244,63,94,0.45)] p-6 sm:p-7 space-y-5 text-left animate-scale-in">
        
        {/* Close Button */}
        <button
          onClick={onDismiss}
          className="absolute top-5 right-5 p-2 rounded-xl text-rose-300 hover:text-white bg-rose-950/60 hover:bg-rose-900/80 border border-rose-500/40 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Pulsing Emergency Badge */}
        <div className="flex items-center gap-3.5 pr-8">
          <div className="w-12 h-12 rounded-2xl bg-rose-600/30 text-rose-300 flex items-center justify-center text-2xl border border-rose-500/50 shrink-0 shadow-lg animate-pulse">
            <AlertOctagon className="w-7 h-7 text-rose-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500 text-white text-[11px] font-black uppercase tracking-wider animate-pulse">
                🔴 EMERGENCY ALERT
              </span>
              <span className="text-[11px] font-mono text-rose-300 font-bold">
                {alert.urgency}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white mt-1 leading-tight">
              Post-Harvest Weather Hazard
            </h3>
          </div>
        </div>

        {/* Location & Commodity Chip */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="px-3 py-1 rounded-xl bg-slate-950 border border-rose-500/30 text-rose-200 font-bold flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            Location: {alert.locationName}
          </span>
          <span className="px-3 py-1 rounded-xl bg-slate-950 border border-rose-500/30 text-rose-200 font-bold">
            Target Crop: <strong className="text-white">{alert.crop}</strong>
          </span>
        </div>

        {/* Risk Assessment Box */}
        <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-rose-300 font-bold flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            Specific Spoilage Threat
          </div>
          <p className="text-xs sm:text-sm text-rose-100 font-medium leading-relaxed">
            {alert.risk}
          </p>
        </div>

        {/* Recommended Immediate Action */}
        <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-300 font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Recommended Immediate Action
          </div>
          <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
            {alert.recommendedAction}
          </p>
        </div>

        {/* Supporting Meteorological Evidence */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
            Observed Meteorological Telemetry:
          </span>
          <div className="flex flex-wrap gap-2">
            {alert.evidence.map((ev, idx) => (
              <span key={idx} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                • {ev}
              </span>
            ))}
          </div>
        </div>

        {/* Actions & Permissions Bar */}
        <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playEmergencyAlarmTone();
                triggerDeviceVibration();
              }}
              title="Test Warning Siren"
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-slate-700"
            >
              <Volume2 className="w-3.5 h-3.5 text-rose-400" />
              <span>Siren Tone</span>
            </button>

            {notificationStatus !== 'granted' && notificationStatus !== 'unsupported' && (
              <button
                onClick={handleRequestPush}
                className="px-3 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-rose-500/40"
              >
                <Bell className="w-3.5 h-3.5 text-rose-400" />
                <span>Enable Browser Alerts</span>
              </button>
            )}
          </div>

          <button
            onClick={onDismiss}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-rose-950/50 cursor-pointer transition-all hover:scale-[1.02]"
          >
            I Acknowledge & Take Action
          </button>
        </div>

      </div>
    </div>,
    document.body
  ) : null;
};
