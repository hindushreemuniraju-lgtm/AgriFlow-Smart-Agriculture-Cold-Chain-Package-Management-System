import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ExternalLink, 
  AlertCircle, 
  CheckCircle2, 
  RefreshCw, 
  Building2, 
  Calendar, 
  Tag, 
  MapPin, 
  FileText,
  RotateCcw,
  Copy,
  Check
} from 'lucide-react';
import { 
  verifyFssaiNumber, 
  decodeFssaiMetadata 
} from '../../services/compliance/fssaiVerificationService';
import { 
  FssaiVerifiedDetails, 
  FssaiVerificationStatus 
} from '../../types/foodPack';

interface FssaiVerificationSectionProps {
  activeCommodity: string;
  onFssaiVerified?: (details: FssaiVerifiedDetails | null) => void;
  verifiedFbo?: FssaiVerifiedDetails | null;
}

export const FssaiVerificationSection: React.FC<FssaiVerificationSectionProps> = ({
  activeCommodity,
  onFssaiVerified,
  verifiedFbo
}) => {
  const [inputNumber, setInputNumber] = useState<string>(verifiedFbo?.fssaiNumber || '');
  const [loading, setLoading] = useState<boolean>(false);
  const [verificationStatus, setVerificationStatus] = useState<FssaiVerificationStatus | null>(
    verifiedFbo ? 'VERIFIED' : null
  );
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [details, setDetails] = useState<FssaiVerifiedDetails | null>(verifiedFbo || null);
  const [copied, setCopied] = useState<boolean>(false);

  // Live structural metadata decoding while typing
  const liveMetadata = decodeFssaiMetadata(inputNumber);

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = inputNumber.replace(/\D/g, '').trim();

    if (!clean || clean.length !== 14) {
      setVerificationStatus('INVALID_FORMAT');
      setStatusMessage('Invalid FSSAI format: License/Registration number must be exactly 14 numeric digits.');
      setDetails(null);
      if (onFssaiVerified) onFssaiVerified(null);
      return;
    }

    setLoading(true);
    setVerificationStatus(null);
    setStatusMessage('');

    try {
      const result = await verifyFssaiNumber(clean, activeCommodity);
      setVerificationStatus(result.status);
      setStatusMessage(result.message);

      if (result.status === 'VERIFIED' && result.data) {
        setDetails(result.data);
        if (onFssaiVerified) onFssaiVerified(result.data);
      } else {
        setDetails(null);
        if (onFssaiVerified) onFssaiVerified(null);
      }
    } catch {
      setVerificationStatus('UNABLE_TO_VERIFY');
      setStatusMessage('FSSAI number could not be verified from the official source.');
      setDetails(null);
      if (onFssaiVerified) onFssaiVerified(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setInputNumber('');
    setVerificationStatus(null);
    setStatusMessage('');
    setDetails(null);
    if (onFssaiVerified) onFssaiVerified(null);
  };

  const handleCopyNumber = () => {
    if (!details?.fssaiNumber) return;
    navigator.clipboard.writeText(details.fssaiNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl bg-slate-900/90 border border-purple-500/30 p-5 sm:p-6 space-y-5 text-left shadow-xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-base font-bold border border-emerald-500/30">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-purple-300 font-bold flex items-center gap-2">
              <span>FSSAI License / Registration Number</span>
              {details && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                  Verified FBO
                </span>
              )}
            </h4>
            <p className="text-[11px] text-slate-400">
              Official FoSCoS Public Verification & FBO Category Context
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://foscos.fssai.gov.in/fbo-search"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-purple-400 hover:text-purple-300 inline-flex items-center gap-1 underline"
            title="Open official FoSCoS portal"
          >
            <span>FoSCoS Portal</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Input Section */}
      <form onSubmit={handleVerify} className="space-y-2">
        <label className="text-xs text-slate-300 font-semibold flex justify-between">
          <span>Enter 14-Digit FSSAI Number:</span>
          <span className="text-[11px] font-mono text-slate-400">
            {inputNumber.replace(/\D/g, '').length} / 14 digits
          </span>
        </label>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              maxLength={14}
              placeholder="e.g. 10012021000071"
              value={inputNumber}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                setInputNumber(val);
                if (verificationStatus && val !== details?.fssaiNumber) {
                  setVerificationStatus(null);
                }
              }}
              className="w-full bg-slate-950 border border-purple-500/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 font-mono tracking-wider outline-none focus:border-purple-400"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading || !inputNumber.trim()}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
                  <span>Verifying FoSCoS...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verify FSSAI</span>
                </>
              )}
            </button>

            {(inputNumber || details) && (
              <button
                type="button"
                onClick={handleReset}
                title="Reset input"
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer border border-slate-700"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Live Structural Preview while typing */}
        {liveMetadata && !details && verificationStatus !== 'VERIFIED' && (
          <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2 rounded-xl border border-slate-800 flex flex-wrap items-center gap-2">
            <span className="text-purple-300 font-mono font-bold">
              Structural Decode:
            </span>
            <span>{liveMetadata.licenseType}</span>
            <span>•</span>
            <span>{liveMetadata.stateName}</span>
            <span>•</span>
            <span>Year: {liveMetadata.enrollmentYear}</span>
          </div>
        )}
      </form>

      {/* VERIFIED DETAILS CARD */}
      {verificationStatus === 'VERIFIED' && details && (
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-4 animate-fade-in">
          
          {/* Success Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-emerald-500/20">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs font-bold text-white">
                ✅ FSSAI information found
              </span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-2">
              <span>Source: <strong className="text-emerald-300">Official FSSAI FoSCoS</strong></span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-400 font-mono font-bold">
                {details.validityStatus === 'ACTIVE' ? '🟢 Active' : details.validityStatus}
              </span>
            </div>
          </div>

          {/* Business Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            
            {/* FBO Name & License */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-1">
                <Building2 className="w-3 h-3 text-purple-400" /> FBO / Company Name
              </span>
              <div className="font-bold text-white text-sm leading-snug">
                {details.fboName}
              </div>
              <div className="text-[11px] text-purple-300 font-mono flex items-center gap-1.5 pt-0.5">
                <span>#{details.fssaiNumber}</span>
                <button
                  type="button"
                  onClick={handleCopyNumber}
                  title="Copy FSSAI number"
                  className="text-slate-400 hover:text-white"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>

            {/* Kind of Business & License Type */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-1">
                <FileText className="w-3 h-3 text-sky-400" /> License Category
              </span>
              <div className="font-bold text-white text-xs">
                {details.licenseType}
              </div>
              <div className="text-[11px] text-slate-300 truncate">
                Kind of Business: <strong className="text-white">{details.kindOfBusiness}</strong>
              </div>
            </div>

            {/* Issue Date & Validity */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-1">
                <Calendar className="w-3 h-3 text-amber-400" /> Issue & Validity
              </span>
              <div className="font-bold text-white font-mono">
                Issued: {details.issueDate}
              </div>
              {details.expiryDate && (
                <div className="text-[11px] text-slate-400 font-mono">
                  Valid Thru: {details.expiryDate}
                </div>
              )}
            </div>

            {/* Premises & State Location */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-1">
                <MapPin className="w-3 h-3 text-rose-400" /> Registered Premises
              </span>
              <div className="font-bold text-white truncate">
                {details.premisesAddress || details.stateName}
              </div>
              <div className="text-[11px] text-slate-400">
                Jurisdiction: {details.stateName}
              </div>
            </div>

          </div>

          {/* Food/Product Categories Chips */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1">
              <Tag className="w-3 h-3 text-emerald-400" /> Approved FSSAI Food Categories:
            </span>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {details.foodCategories.map((cat, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] font-medium"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Commodity Alignment Notice */}
          {details.complianceNotes && (
            <div className="p-2.5 rounded-xl bg-purple-950/30 border border-purple-500/30 text-[11px] text-purple-200 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>{details.complianceNotes}</span>
            </div>
          )}

          {/* Verification Link CTA */}
          <div className="pt-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px]">
            <span className="text-slate-400">
              Verified against official FoSCoS regulatory database.
            </span>
            <a
              href={details.officialRecordUrl || "https://foscos.fssai.gov.in/fbo-search"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 hover:text-white font-bold transition-all cursor-pointer"
            >
              <span>View Official FSSAI Record</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>
      )}

      {/* NOT FOUND CARD */}
      {verificationStatus === 'NOT_FOUND' && (
        <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 space-y-2 animate-fade-in text-xs">
          <div className="flex items-center gap-2 text-amber-300 font-bold">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>FSSAI number could not be found in the official FoSCoS registry.</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            No active Food Business Operator was returned for <strong>#{inputNumber}</strong> from the official FSSAI FoSCoS portal. Check for typographical errors or search manually.
          </p>
          <div className="pt-2 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Source: Official FSSAI FoSCoS</span>
            <a
              href="https://foscos.fssai.gov.in/fbo-search"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 underline font-bold"
            >
              <span>View Official FSSAI Record</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* UNABLE TO VERIFY CARD */}
      {verificationStatus === 'UNABLE_TO_VERIFY' && (
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 animate-fade-in text-xs">
          <div className="flex items-center gap-2 text-rose-300 font-bold">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>FSSAI number could not be verified from the official source.</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            The official FoSCoS verification portal could not complete automated verification at this time. You can view or verify the official record directly on FoSCoS.
          </p>
          <div className="pt-2 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Source: Official FSSAI FoSCoS</span>
            <a
              href="https://foscos.fssai.gov.in/fbo-search"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 underline font-bold"
            >
              <span>View Official FSSAI Record</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* INVALID FORMAT CARD */}
      {verificationStatus === 'INVALID_FORMAT' && (
        <div className="p-3.5 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-1 text-xs">
          <div className="flex items-center gap-2 text-rose-300 font-bold">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{statusMessage || 'Invalid FSSAI format: License/Registration number must be exactly 14 numeric digits.'}</span>
          </div>
        </div>
      )}

    </div>
  );
};
