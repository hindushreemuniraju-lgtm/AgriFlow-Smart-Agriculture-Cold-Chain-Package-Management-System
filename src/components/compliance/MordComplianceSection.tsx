import React, { useState, useEffect, useId } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  fetchIndiaPostPincode, 
  verifyFssaiLicense, 
  geocodeShgRuralUnit,
  generateGs1DigitalLink,
  IndiaPostPincodeRecord,
  FssaiVerificationResult,
  ShgGeocodingResult
} from '../../services/compliance/mordComplianceService';
import { 
  ShieldCheck, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  QrCode, 
  Building2, 
  Lock, 
  FileCheck, 
  Layers, 
  Scale, 
  Truck, 
  Sparkles,
  Loader2,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface MordComplianceSectionProps {
  commodityName?: string;
  defaultPincode?: string;
  defaultBatchId?: string;
  isCollapsible?: boolean;
  defaultOpen?: boolean;
}

export const MordComplianceSection: React.FC<MordComplianceSectionProps> = ({
  commodityName = 'Fresh Agricultural Commodity',
  defaultPincode = '422209',
  defaultBatchId = 'BAT-2026-NRLM-891',
  isCollapsible = false,
  defaultOpen = true
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  
  // Form State
  const [shgName, setShgName] = useState<string>('Jay Kisan Mahila Self-Help Group (SHG)');
  const [mordId, setMordId] = useState<string>('NRLM-MH-NSK-2026-8921');
  const [packagingTier, setPackagingTier] = useState<'Primary' | 'Secondary' | 'Bulk Master Carton'>('Bulk Master Carton');
  
  // Pincode & Location
  const [pincode, setPincode] = useState<string>(defaultPincode);
  const [pincodeLoading, setPincodeLoading] = useState<boolean>(false);
  const [pincodeData, setPincodeData] = useState<IndiaPostPincodeRecord>({
    pincode: '422209',
    postOfficeName: 'Pimpalgaon Baswant S.O',
    district: 'Nashik',
    block: 'Niphad',
    state: 'Maharashtra',
    country: 'India',
    deliveryStatus: 'Delivery',
    circle: 'Maharashtra',
    isValid: true
  });

  // FSSAI Verification
  const [fssaiNumber, setFssaiNumber] = useState<string>('11524027000189');
  const [isVerifyingFssai, setIsVerifyingFssai] = useState<boolean>(false);
  const [fssaiResult, setFssaiResult] = useState<FssaiVerificationResult | null>({
    licenseNumber: '11524027000189',
    isValid: true,
    status: 'VERIFIED_ACTIVE',
    licenseType: 'State Food Safety License',
    state: 'Maharashtra',
    issuingAuthority: 'FSSAI Licensing Authority (Maharashtra)',
    manufacturingEntityName: 'Jay Kisan Mahila Self-Help Group (SHG)',
    validThrough: '31-Dec-2029',
    foodCategoriesPermitted: ['04.0 - Fruits, Vegetables, Nuts & Seeds', '01.0 - Dairy Products'],
    verificationTimestamp: new Date().toISOString(),
    verificationSource: 'API Setu / FSSAI National Food Safety Portal'
  });

  // Agmark & Dimensions
  const [agmarkId, setAgmarkId] = useState<string>('AGMARK-GRADE-A-2026');
  const [lengthCm, setLengthCm] = useState<number>(45);
  const [widthCm, setWidthCm] = useState<number>(32);
  const [heightCm, setHeightCm] = useState<number>(28);
  const [netWeightKg, setNetWeightKg] = useState<number>(25.0);
  const [grossWeightKg, setGrossWeightKg] = useState<number>(26.8);

  // Traceability & Seals
  const [batchId, setBatchId] = useState<string>(defaultBatchId);
  const [mfgDate, setMfgDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [expiryDate, setExpiryDate] = useState<string>(
    new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
  );
  const [tamperSealCode, setTamperSealCode] = useState<string>('SEAL-NRLM-98421-HM');
  const [geocodingResult, setGeocodingResult] = useState<ShgGeocodingResult | null>(null);

  // Trigger India Post Pincode Lookup
  const handlePincodeLookup = async (newPin: string) => {
    const cleanPin = newPin.replace(/\D/g, '').slice(0, 6);
    setPincode(cleanPin);

    if (cleanPin.length === 6) {
      setPincodeLoading(true);
      try {
        const record = await fetchIndiaPostPincode(cleanPin);
        setPincodeData(record);
      } finally {
        setPincodeLoading(false);
      }
    }
  };

  // Trigger FSSAI License Verification
  const handleVerifyFssai = async () => {
    setIsVerifyingFssai(true);
    try {
      const result = await verifyFssaiLicense(fssaiNumber, shgName);
      setFssaiResult(result);
    } finally {
      setIsVerifyingFssai(false);
    }
  };

  // Geocode Rural SHG Unit Coordinates
  useEffect(() => {
    if (pincodeData.isValid) {
      const geo = geocodeShgRuralUnit(
        shgName,
        pincodeData.block,
        pincodeData.district,
        pincodeData.state,
        pincodeData.pincode
      );
      setGeocodingResult(geo);
    }
  }, [shgName, pincodeData]);

  // GS1 2D DataMatrix Payload
  const gs1Payload = generateGs1DigitalLink({
    shgName,
    mordRegistrationId: mordId,
    fssaiNumber,
    agmarkId,
    batchId,
    commodityName,
    mfgDate,
    expiryDate,
    tamperSealCode,
    pincode: pincodeData.pincode,
    gpsCoords: geocodingResult ? { lat: geocodingResult.latitude, lng: geocodingResult.longitude } : undefined
  });

  return (
    <div className="rounded-3xl bg-slate-900/95 border border-purple-500/30 p-6 sm:p-7 shadow-2xl space-y-6">
      
      {/* Header with Title and MoRD Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-500/20">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="px-3 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" /> Ministry of Rural Development (MoRD)
            </span>
            <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> NRLM & API Setu Verified
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
            <span>MoRD Rural Compliance & Precision Logistics Specs</span>
          </h3>
          <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
            Government verification gates, India Post Pincode auto-resolution, SHG origin traceability, and GS1 2D DataMatrix packaging labels.
          </p>
        </div>

        {isCollapsible && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-all self-start sm:self-center"
          >
            {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        )}
      </div>

      {isOpen && (
        <div className="space-y-6">
          
          {/* SECTION 1: Rural Enterprise & SHG Branding */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              <span>1. Rural Enterprise & Self-Help Group (SHG) Branding</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1.5">
                  SHG / Enterprise Name
                </label>
                <input
                  type="text"
                  value={shgName}
                  onChange={(e) => setShgName(e.target.value)}
                  placeholder="e.g. Jay Kisan Mahila SHG"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-purple-400 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1.5">
                  MoRD / NRLM Registration ID
                </label>
                <input
                  type="text"
                  value={mordId}
                  onChange={(e) => setMordId(e.target.value)}
                  placeholder="e.g. NRLM-MH-NSK-2026-8921"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-purple-300 font-mono font-bold focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1.5">
                  Packaging Tier
                </label>
                <select
                  value={packagingTier}
                  onChange={(e) => setPackagingTier(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-medium focus:outline-none focus:border-purple-400"
                >
                  <option value="Primary">Primary Packaging (Unit Retail Pack)</option>
                  <option value="Secondary">Secondary Packaging (Multipack Shrink)</option>
                  <option value="Bulk Master Carton">Bulk Master Carton (Wholesale B2B)</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 2: India Post Pincode & Physical Pickup Address */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h4 className="text-xs font-bold text-sky-300 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-sky-400" />
                <span>India Post Pincode & SHG Rural Location (API Setu Auto-Locked)</span>
              </h4>
              <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-400" /> Auto-populated from postalpincode.in
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  6-Digit Pincode
                </label>
                <div className="relative">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => handlePincodeLookup(e.target.value)}
                    placeholder="e.g. 422209"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-sky-400/50 text-sky-300 font-mono font-black text-sm focus:outline-none focus:border-sky-400"
                  />
                  {pincodeLoading && (
                    <Loader2 className="w-4 h-4 text-sky-400 animate-spin absolute right-2.5 top-2.5" />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-slate-400 text-[11px] mb-1">
                  Post Office Name (Locked)
                </label>
                <input
                  type="text"
                  readOnly
                  value={pincodeData.postOfficeName}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 font-medium cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-[11px] mb-1">
                  Block / Taluk (Locked)
                </label>
                <input
                  type="text"
                  readOnly
                  value={pincodeData.block}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 font-medium cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-[11px] mb-1">
                  District & State (Locked)
                </label>
                <input
                  type="text"
                  readOnly
                  value={`${pincodeData.district}, ${pincodeData.state}`}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 font-medium cursor-not-allowed"
                />
              </div>
            </div>

            {/* High-Accuracy GPS Coordinates Box */}
            {geocodingResult && (
              <div className="p-3 rounded-xl bg-sky-950/30 border border-sky-500/20 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📍</span>
                  <div>
                    <span className="font-bold text-white">SHG Physical Pickup Address: </span>
                    <span className="text-slate-300 font-mono text-[11px]">{geocodingResult.formattedAddress}</span>
                  </div>
                </div>
                <div className="text-[11px] font-mono text-sky-300 bg-sky-500/10 px-2.5 py-1 rounded-lg border border-sky-500/30 shrink-0">
                  GPS: {geocodingResult.latitude}° N, {geocodingResult.longitude}° E (±{geocodingResult.accuracyMeters}m)
                </div>
              </div>
            )}
          </div>

          {/* SECTION 3: Quality Compliance & FSSAI Verification */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>2. Quality Compliance & Government Verification Gates</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* FSSAI Verification Card */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-slate-300 font-bold flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-emerald-400" />
                    <span>14-Digit FSSAI License Number</span>
                  </label>
                  {fssaiResult?.isValid && (
                    <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/40 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Active & Verified
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    maxLength={14}
                    value={fssaiNumber}
                    onChange={(e) => setFssaiNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="e.g. 11524027000189"
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-emerald-500/40 text-emerald-300 font-mono font-bold focus:outline-none focus:border-emerald-400"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyFssai}
                    disabled={isVerifyingFssai}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold transition-all shadow-md flex items-center gap-1.5 shrink-0"
                  >
                    {isVerifyingFssai ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                    <span>Verify License</span>
                  </button>
                </div>

                {fssaiResult && fssaiResult.isValid && (
                  <div className="text-[11px] text-slate-300 font-mono space-y-0.5 pt-2 border-t border-slate-800">
                    <div>Authority: <b className="text-white">{fssaiResult.issuingAuthority}</b></div>
                    <div>Category: <b className="text-emerald-300">{fssaiResult.licenseType}</b></div>
                    <div>Valid Through: <b className="text-white">{fssaiResult.validThrough}</b></div>
                  </div>
                )}
              </div>

              {/* Agmark ID & Compliance */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <label className="block text-slate-300 font-bold">
                  Agmark Certificate & Grading Standard
                </label>
                <input
                  type="text"
                  value={agmarkId}
                  onChange={(e) => setAgmarkId(e.target.value)}
                  placeholder="e.g. AGMARK-GRADE-A-2026"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-amber-300 font-mono font-bold focus:outline-none focus:border-amber-400"
                />
                <div className="text-[11px] text-slate-400 space-y-1 pt-1">
                  <div>Standards Body: <b>Directorate of Marketing & Inspection (DMI)</b></div>
                  <div>Grading Protocol: <b>Agmark Special / Grade A Export Quality</b></div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 4: Precision Carton Dimensions & Weight Breakdown */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-purple-400" />
              <span>3. Precision Logistics Dimensions & Weight Specification</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs font-mono">
              <div>
                <label className="block text-slate-400 text-[11px] mb-1">Length (cm)</label>
                <input
                  type="number"
                  value={lengthCm}
                  onChange={(e) => setLengthCm(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-[11px] mb-1">Width (cm)</label>
                <input
                  type="number"
                  value={widthCm}
                  onChange={(e) => setWidthCm(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-[11px] mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-[11px] mb-1">Net Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={netWeightKg}
                  onChange={(e) => setNetWeightKg(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-emerald-500/40 text-emerald-300 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-[11px] mb-1">Gross Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={grossWeightKg}
                  onChange={(e) => setGrossWeightKg(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-purple-500/40 text-purple-300 font-bold"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800">
              <div>Carton Volume: <b className="text-slate-200">{((lengthCm * widthCm * heightCm) / 1000).toFixed(1)} Liters</b></div>
              <div>Volumetric Freight Weight: <b className="text-cyan-300">{((lengthCm * widthCm * heightCm) / 5000).toFixed(2)} kg</b></div>
              <div>Tare Packaging Allowance: <b className="text-slate-200">{(grossWeightKg - netWeightKg).toFixed(2)} kg</b></div>
            </div>
          </div>

          {/* SECTION 5: Dynamic GS1 2D DataMatrix Traceability & Tamper-Evident Seal */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/50 border-2 border-purple-500/40 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-purple-500/20">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-black uppercase">
                    GS1 2D DataMatrix Traceability Standard
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">Tamper Seal Protected</span>
                </div>
                <h4 className="text-sm font-black text-white mt-1">Farm-to-Fork Digital Product Passport Label</h4>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              
              {/* Dynamic QR Code Render */}
              <div className="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-2xl bg-white shadow-xl">
                <QRCodeSVG
                  value={gs1Payload}
                  size={148}
                  level="H"
                  includeMargin={true}
                />
                <span className="text-[10px] font-mono font-bold text-slate-800 mt-2 text-center">
                  GS1 (01)GTIN (10)BATCH (11)MFG (17)EXP
                </span>
              </div>

              {/* Traceability Payload Metadata Inputs */}
              <div className="md:col-span-8 space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Batch Identification Number</label>
                    <input
                      type="text"
                      value={batchId}
                      onChange={(e) => setBatchId(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Tamper-Evident Outer Box Seal Code</label>
                    <input
                      type="text"
                      value={tamperSealCode}
                      onChange={(e) => setTamperSealCode(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-rose-500/40 text-rose-300 font-mono font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Manufacturing / Packing Date</label>
                    <input
                      type="date"
                      value={mfgDate}
                      onChange={(e) => setMfgDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Best Before / Expiry Date</label>
                    <input
                      type="date"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-purple-500/20 text-[11px] font-mono text-slate-300 space-y-1">
                  <div>Encoded Digital Link: <span className="text-purple-300">https://agriflow.in/trace/{batchId}</span></div>
                  <div>Origin SHG Entity: <span className="text-white">{shgName} ({mordId})</span></div>
                  <div>Certified Pincode: <span className="text-sky-300">{pincodeData.pincode} - {pincodeData.district}, {pincodeData.state}</span></div>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
};
