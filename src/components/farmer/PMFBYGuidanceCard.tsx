import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  ExternalLink, 
  HelpCircle, 
  PhoneCall, 
  FileText, 
  Calculator, 
  AlertCircle,
  Percent,
  CheckCircle2
} from 'lucide-react';

interface PMFBYGuidanceCardProps {
  cropName?: string;
}

export const PMFBYGuidanceCard: React.FC<PMFBYGuidanceCardProps> = ({ cropName = 'Horticultural Produce' }) => {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-indigo-500/30 p-5 sm:p-6 shadow-xl space-y-5 text-left">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-indigo-900/40">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-xl border border-indigo-500/30 shrink-0 shadow-md">
            🛡️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-300 font-bold">
                Government of India Official Scheme
              </span>
              <span className="px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                Active Scheme
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white mt-0.5">
              Pradhan Mantri Fasal Bima Yojana (PMFBY)
            </h3>
          </div>
        </div>

        <a
          href="https://pmfby.gov.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-200 text-xs font-bold transition-all shrink-0 hover:scale-[1.02]"
        >
          <span>Official Portal: pmfby.gov.in</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Critical Highlight: Post-Harvest Loss Protection (14 Days) */}
      <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
          <Clock className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Crucial Post-Harvest Loss Coverage: Up to 14 Days</span>
        </div>
        <p className="text-xs text-amber-100/90 leading-relaxed">
          Under official PMFBY guidelines, crops harvested and kept in <strong>"cut and spread"</strong> condition in the field for drying are covered against damage caused by <strong>cyclone, cyclonic rains, or unseasonal rains</strong> for up to a maximum period of <strong>14 days</strong> from harvesting.
        </p>
      </div>

      {/* Mandatory 72-Hour Claim Reporting Mandate */}
      <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>Mandatory Claim Intimation Window: Within 72 Hours</span>
        </div>
        <p className="text-xs text-rose-100/90 leading-relaxed">
          Any localized post-harvest loss or weather calamity must be reported within <strong>72 hours of the event</strong>. Failure to intimate within 72 hours can jeopardize insurance surveyor assessment and claim eligibility.
        </p>
      </div>

      {/* Premium Structure Breakdown */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-300 block">
          Farmer Premium Contribution Caps (Balance Subsidized by Central & State Gov):
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
            <span className="text-[11px] text-slate-400 block">Kharif Crops</span>
            <div className="text-lg font-black text-emerald-400 font-mono">Max 2.0%</div>
            <span className="text-[10px] text-slate-500 block">of Sum Insured</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
            <span className="text-[11px] text-slate-400 block">Rabi Crops</span>
            <div className="text-lg font-black text-sky-400 font-mono">Max 1.5%</div>
            <span className="text-[10px] text-slate-500 block">of Sum Insured</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
            <span className="text-[11px] text-slate-400 block">Horticultural & Annual</span>
            <div className="text-lg font-black text-purple-400 font-mono">Max 5.0%</div>
            <span className="text-[10px] text-slate-500 block">Commercial crops</span>
          </div>
        </div>
      </div>

      {/* Quick Action Links to Official Tools */}
      <div className="pt-2 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
        <a
          href="https://pmfby.gov.in/premiumCalculator"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white flex items-center justify-between transition-colors"
        >
          <span className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-indigo-400" />
            <span>Premium Calculator</span>
          </span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
        </a>

        <a
          href="https://pmfby.gov.in/farmerCorner"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white flex items-center justify-between transition-colors"
        >
          <span className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Farmer Corner & Claim</span>
          </span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
        </a>

        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-amber-400" />
            <span>Toll-Free Helpline: <strong>14447</strong></span>
          </span>
          <span className="text-[10px] font-mono text-emerald-400">24/7 Call</span>
        </div>
      </div>

    </div>
  );
};
