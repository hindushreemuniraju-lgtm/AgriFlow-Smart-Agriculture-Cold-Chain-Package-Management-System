import React, { useState, useEffect } from 'react';
import { RefreshCw, ExternalLink, AlertCircle, CheckCircle2, TrendingUp, Building2, Calendar } from 'lucide-react';
import { fetchOfficialCommodityPrice, OfficialPriceResult } from '../../services/market/officialPriceService';
import { formatCurrency, formatNumber, formatDate } from '../../utils/formatters';

interface OfficialPriceWidgetProps {
  commodityName: string;
  marketLocation?: string;
}

export const OfficialPriceWidget: React.FC<OfficialPriceWidgetProps> = ({
  commodityName,
  marketLocation = 'Bengaluru'
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [priceData, setPriceData] = useState<OfficialPriceResult | null>(null);

  const loadPrice = async () => {
    if (!commodityName) return;
    setLoading(true);
    try {
      const res = await fetchOfficialCommodityPrice(commodityName, marketLocation);
      setPriceData(res);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrice();
  }, [commodityName, marketLocation]);

  return (
    <div className="rounded-3xl bg-slate-900/90 border border-purple-500/30 p-5 space-y-4 text-left shadow-xl">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center text-sm font-bold border border-purple-500/30">
            🏛️
          </div>
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-purple-300 font-bold">
              Current Official Commodity Price
            </h4>
            <p className="text-[11px] text-slate-400">
              Government of India • data.gov.in • e-NAM • Agmarknet
            </p>
          </div>
        </div>

        <button
          onClick={loadPrice}
          disabled={loading}
          title="Refresh official price"
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer border border-slate-700"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-purple-400' : ''}`} />
        </button>
      </div>

      {loading ? (
        <div className="py-6 flex items-center justify-center gap-2.5 text-xs text-purple-300">
          <RefreshCw className="w-4 h-4 animate-spin text-purple-400" />
          <span>Querying Official Price Networks (data.gov.in, e-NAM, Agmarknet)...</span>
        </div>
      ) : priceData?.isAvailable ? (
        <div className="space-y-3">
          
          {/* Fallback Multi-Network Badge if secondary network engaged */}
          {priceData.fallbackNotice && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-950/50 border border-purple-500/30 text-[11px] text-purple-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="truncate">{priceData.fallbackNotice}</span>
            </div>
          )}

          {/* Main Price Display */}
          <div className="flex items-baseline justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <div>
              <span className="text-[11px] text-slate-400 block font-mono">
                Modal Auction Price ({priceData.commodity})
              </span>
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {formatCurrency(priceData.modalPriceKg)}
                <span className="text-xs font-normal text-slate-400 ml-1">/kg</span>
              </div>
              <span className="text-[10px] font-mono text-purple-300">
                ₹{formatNumber(priceData.modalPriceQuintal)} / Quintal
              </span>
            </div>

            <div className="text-right space-y-1">
              <span className="text-[10px] font-mono text-slate-400 block">Daily Mandi Band</span>
              <div className="text-xs font-mono font-bold text-slate-200">
                Min: <span className="text-sky-300">{formatCurrency(priceData.minPriceKg)}</span>
              </div>
              <div className="text-xs font-mono font-bold text-slate-200">
                Max: <span className="text-emerald-300">{formatCurrency(priceData.maxPriceKg)}</span>
              </div>
            </div>
          </div>

          {/* Metadata Cards */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-0.5">
              <span className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-1">
                <Building2 className="w-3 h-3 text-purple-400" /> Market Yard
              </span>
              <div className="font-bold text-white truncate">{priceData.market}</div>
              <div className="text-[10px] text-slate-400">{priceData.state || 'India'}</div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-0.5">
              <span className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-1">
                <Calendar className="w-3 h-3 text-sky-400" /> Arrival Date
              </span>
              <div className="font-bold text-white font-mono">{priceData.arrivalDate || formatDate(priceData.updatedAt)}</div>
              <div className="text-[10px] text-emerald-400 font-bold">🟢 Official Arrival</div>
            </div>
          </div>

          {/* Source Attribution */}
          <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
            <span className="truncate pr-2">
              Source: <strong className="text-purple-300">{priceData.source}</strong>
            </span>
            <a
              href={priceData.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 underline shrink-0"
            >
              <span>Verify</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Current official price data unavailable.</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            No live auction record returned for <strong>{commodityName}</strong> from active Mandi terminals today.
          </p>
          <div className="pt-1 flex items-center justify-between text-[10px] text-slate-500">
            <span>Source: Agmarknet / e-NAM</span>
            <button
              onClick={loadPrice}
              className="text-purple-400 hover:text-purple-300 underline cursor-pointer font-bold"
            >
              Retry Multi-Network Query
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
