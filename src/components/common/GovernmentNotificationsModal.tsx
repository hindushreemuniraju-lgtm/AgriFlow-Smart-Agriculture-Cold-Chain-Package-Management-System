import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Bell, ExternalLink, X, MapPin, Calendar, Building2, ShieldCheck, RefreshCw } from 'lucide-react';
import { fetchGovernmentNotifications, GovernmentNotification } from '../../services/government/governmentNotificationService';
import { formatDate } from '../../utils/formatters';

interface GovernmentNotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GovernmentNotificationsModal: React.FC<GovernmentNotificationsModalProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<GovernmentNotification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const data = await fetchGovernmentNotifications();
      setNotifications(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadNotifications();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return typeof document !== 'undefined' ? createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-purple-500/40 p-6 shadow-2xl space-y-5 text-left max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center text-lg border border-purple-500/30">
              🏛️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300 font-bold">
                  Official Open Data
                </span>
                <span className="px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                  Verified Circulars
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Government Agriculture Notifications
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadNotifications}
              disabled={loading}
              title="Refresh notices"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-purple-400' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {loading ? (
            <div className="py-12 flex items-center justify-center gap-2 text-xs text-purple-300">
              <RefreshCw className="w-4 h-4 animate-spin text-purple-400" />
              <span>Fetching official circulars from data.gov.in & Ministry portals...</span>
            </div>
          ) : notifications.length > 0 ? (
            notifications.map((notif) => (
              <div 
                key={notif.id}
                className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 transition-all space-y-2.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {notif.category}
                      </span>
                      {notif.locationRelevance && (
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-sky-400" />
                          {notif.locationRelevance}
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-white">
                      {notif.title}
                    </h4>
                  </div>

                  <span className="text-[10px] font-mono text-slate-500 shrink-0 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(notif.date)}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {notif.description}
                </p>

                <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="truncate max-w-[300px]" title={notif.source}>
                    Source: <strong className="text-slate-300">{notif.source}</strong>
                  </span>

                  <a
                    href={notif.officialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 font-bold transition-colors"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-xs text-slate-400">
              No government notices found at this time.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
          <span>Sources: data.gov.in • pmfby.gov.in • enam.gov.in • midh.gov.in</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>,
    document.body
  ) : null;
};
