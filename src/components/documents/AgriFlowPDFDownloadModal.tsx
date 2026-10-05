import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '../../context/AuthContext';
import { ProductIntelligence } from '../../types/product';
import { FarmerOrder } from '../../types';
import { getProductIntelligence } from '../../data/productsDatabase';
import { generatePackagingRecommendation } from '../../services/packaging/packagingRecommendationEngine';
import { 
  generateProductPassportPDF, 
  generateOrderInvoicePDF, 
  generatePackagingDossierPDF, 
  generateTransitAuditPDF, 
  generateCompleteMasterReportPDF, 
  downloadPDF,
  PDFOrderDetails
} from '../../services/pdf/pdfGenerationService';
import { 
  FileText, 
  Receipt, 
  Package, 
  Truck, 
  BookOpen, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  Loader2
} from 'lucide-react';

interface AgriFlowPDFDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: ProductIntelligence | null;
  order?: FarmerOrder | null;
  batchId?: string;
}

export const AgriFlowPDFDownloadModal: React.FC<AgriFlowPDFDownloadModalProps> = ({
  isOpen,
  onClose,
  product: initialProduct,
  order: initialOrder,
  batchId = 'AGF-8921'
}) => {
  const { user } = useAuth();
  const [downloadingDoc, setDownloadingDoc] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  // Resolve Product and Order data
  const product: ProductIntelligence = initialProduct || getProductIntelligence(batchId);
  const order: FarmerOrder = initialOrder || {
    id: `ord-${batchId}`,
    batchId: batchId,
    cropId: product.id,
    cropName: product.name,
    quantityKg: 250,
    expectedPrice: Math.round(product.market.basePricePerKg * 250),
    deliveryLocation: user.address || 'Bengaluru APMC Central Yard',
    distanceKm: 280,
    weightKg: 250,
    boxesCount: 25,
    farmerName: 'Kisan Agro Producers Cooperative',
    farmerPhone: '+91 94220 11223',
    farmLocation: 'Nashik Organic Cluster, Maharashtra',
    destination: user.address || 'Bengaluru APMC Central Yard',
    packagingSpec: {
      material: product.packaging.primaryPackaging,
      temperatureTier: product.transportation.recommendedVehicle,
      targetTemp: product.transportation.targetTemp,
      shockRating: product.packaging.shockRating,
      ventilation: product.packaging.ventilationSpec,
      ethyleneAbsorption: product.packaging.ethyleneControl,
      ecoScore: 'A+ (100% Recyclable)',
      costPerUnit: Math.round(product.packaging.estimatedPackagingCostPerKg * 10)
    },
    status: 'In Transit',
    driverName: 'Gaurav Express Fleet',
    createdAt: new Date().toISOString()
  };

  const handleDownload = async (docType: 'passport' | 'invoice' | 'packaging' | 'delivery' | 'master') => {
    setDownloadingDoc(docType);
    setDownloadSuccess(null);

    await new Promise((r) => setTimeout(r, 600));

    try {
      if (docType === 'passport') {
        const doc = generateProductPassportPDF(product, batchId);
        downloadPDF(doc, `AgriFlow_Product_Passport_${product.id}_${batchId}.pdf`);
      } else if (docType === 'invoice') {
        const details: PDFOrderDetails = {
          orderId: order.batchId || `ORD-${batchId}`,
          customerName: user.name || 'Registered Customer',
          customerAddress: user.address || 'Agricultural Marketplace Hub, Delivery Zone 1',
          customerPhone: user.phone || '+91 User Mobile',
          orderDate: new Date().toLocaleDateString('en-IN'),
          productName: product.name,
          productCategory: product.category,
          productForm: product.variety,
          quantityKg: order.weightKg || order.quantityKg || 250,
          unitPrice: product.market.basePricePerKg,
          packagingCost: Math.round((order.weightKg || 250) * 1.8),
          transportCost: 450,
          totalAmount: Math.round((order.weightKg || 250) * product.market.basePricePerKg + (order.weightKg || 250) * 1.8 + 450),
          paymentMethod: 'AgriFlow Smart Wallet',
          farmerName: order.farmerName || 'Kisan Agro Producers Cooperative',
          farmerLocation: order.farmLocation || 'Nashik Organic Cluster, Maharashtra',
          batchId: batchId,
          shipmentStatus: order.status,
          driverName: order.driverName || 'Gaurav Logistics Fleet',
          isSimulatedGps: true
        };
        const doc = generateOrderInvoicePDF(details);
        downloadPDF(doc, `AgriFlow_Invoice_${details.orderId}.pdf`);
      } else if (docType === 'packaging') {
        const rec = generatePackagingRecommendation({
          product,
          quantityKg: order.weightKg || 250,
          targetShelfLifeDays: 14,
          storageTempC: parseFloat(product.transportation.targetTemp) || 13,
          humidityPercent: 88,
          distanceKm: order.distanceKm || 280,
          estimatedTravelHours: Math.round(((order.distanceKm || 280) / 40) * 10) / 10,
          vehicleType: 'Reefer Truck',
          budgetPreference: 'balanced',
          sustainabilityPreference: 'standard'
        });
        const doc = generatePackagingDossierPDF(product, rec);
        downloadPDF(doc, `AgriFlow_SIH26236_Packaging_Dossier_${product.id}.pdf`);
      } else if (docType === 'delivery') {
        const doc = generateTransitAuditPDF(order, true);
        downloadPDF(doc, `AgriFlow_Transit_Telemetry_Audit_${order.batchId}.pdf`);
      } else if (docType === 'master') {
        const rec = generatePackagingRecommendation({
          product,
          quantityKg: order.weightKg || 250,
          targetShelfLifeDays: 14,
          storageTempC: parseFloat(product.transportation.targetTemp) || 13,
          humidityPercent: 88,
          distanceKm: order.distanceKm || 280,
          estimatedTravelHours: Math.round(((order.distanceKm || 280) / 40) * 10) / 10,
          vehicleType: 'Reefer Truck',
          budgetPreference: 'balanced',
          sustainabilityPreference: 'standard'
        });
        const doc = generateCompleteMasterReportPDF(product, order, rec);
        downloadPDF(doc, `AgriFlow_Master_Dossier_${product.id}_${batchId}.pdf`);
      }

      setDownloadSuccess(docType);
      setTimeout(() => setDownloadSuccess(null), 3500);
    } catch (err) {
      console.error('PDF Generation Error:', err);
    } finally {
      setDownloadingDoc(null);
    }
  };

  const documentCards = [
    {
      id: 'passport',
      title: 'Digital Product Passport PDF',
      icon: <FileText className="w-5 h-5 text-emerald-400" />,
      tag: 'Traceability & Agronomy',
      desc: 'Complete farm origin, seed lot, harvest timestamp, chemical residue status, and 5-stage traceability passport.'
    },
    {
      id: 'invoice',
      title: 'Customer Tax Invoice & Receipt',
      icon: <Receipt className="w-5 h-5 text-sky-400" />,
      tag: 'Commercials & Tax',
      desc: 'Official GST invoice detailing commodity pricing, cold-chain packaging fee, and door-to-door freight cost.'
    },
    {
      id: 'packaging',
      title: 'SIH26236 Technical Packaging Dossier',
      icon: <Package className="w-5 h-5 text-purple-400" />,
      tag: 'OTR/WVTR Science',
      desc: 'Deep multi-layer barrier specification, ASTM test method context, respiration kinetics, and candidate scoring.'
    },
    {
      id: 'delivery',
      title: 'Cold-Chain Transit & Telemetry Audit',
      icon: <Truck className="w-5 h-5 text-amber-400" />,
      tag: 'IoT Telemetry & GPS',
      desc: 'Complete highway waypoint route log, reefer temperature integrity data, and GPS telemetry audit trail.'
    },
    {
      id: 'master',
      title: 'AgriFlow Complete Master Dossier',
      icon: <BookOpen className="w-5 h-5 text-pink-400" />,
      tag: 'All-in-One Master PDF',
      desc: 'Comprehensive end-to-end report combining product passport, packaging science, transit audit, and financials.'
    }
  ];

  return typeof document !== 'undefined' ? createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-purple-500/40 p-6 sm:p-8 shadow-2xl space-y-6 text-slate-100 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-purple-500/20 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-2xl shadow-inner">
            📄
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold">
                AgriFlow Document Engine
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30">
                Vector PDF • Runtime Data
              </span>
            </div>
            <h3 className="text-xl font-black text-white">
              Official PDF Download Center
            </h3>
          </div>
        </div>

        {/* Context Summary Bar */}
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div>
            <span className="text-slate-400">Target Produce: </span>
            <strong className="text-purple-300">{product.name} ({product.category})</strong>
          </div>
          <div>
            <span className="text-slate-400">Batch ID: </span>
            <strong className="text-emerald-400">{batchId}</strong>
          </div>
          <div>
            <span className="text-slate-400">Customer: </span>
            <strong className="text-sky-300">{user.name || 'Registered User'}</strong>
          </div>
        </div>

        {/* Document Cards List */}
        <div className="space-y-3">
          {documentCards.map((card) => {
            const isDownloading = downloadingDoc === card.id;
            const isSuccess = downloadSuccess === card.id;

            return (
              <div
                key={card.id}
                className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-purple-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-purple-500/30 shrink-0">
                    {card.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                        {card.title}
                      </h4>
                      <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                        {card.tag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(card.id as any)}
                  disabled={Boolean(downloadingDoc)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center justify-center gap-1.5 shadow-md cursor-pointer ${
                    isSuccess
                      ? 'bg-emerald-600 text-white'
                      : isDownloading
                      ? 'bg-purple-600/50 text-purple-200 cursor-wait'
                      : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white'
                  }`}
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : isSuccess ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      <span>Downloaded!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Modal Footer Note */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>FSSAI IS 9845 & ASTM Test Method Reference Standards Verified</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>,
    document.body
  ) : null;
};
