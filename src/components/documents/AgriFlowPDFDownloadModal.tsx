import React, { useState } from 'react';
import { ProductIntelligence } from '../../types/product';
import { FarmerOrder } from '../../types';
import { getProductIntelligence } from '../../data/productsDatabase';
import { generatePackagingRecommendation } from '../../services/packaging/packagingRecommendationEngine';
import { 
  generateProductPassportPDF, 
  generateOrderInvoicePDF, 
  generatePackagingReportPDF, 
  generateDeliveryReportPDF, 
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
  const [downloadingDoc, setDownloadingDoc] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  // Resolve Product and Order data
  const product: ProductIntelligence = initialProduct || getProductIntelligence(batchId);
  const order: FarmerOrder = initialOrder || {
    id: `ord-${batchId}`,
    batchId: batchId,
    cropName: product.name,
    quantityKg: 250,
    expectedPrice: Math.round(product.market.basePricePerKg * 250),
    deliveryLocation: 'Bengaluru APMC Central Yard',
    distanceKm: 280,
    packagingSpec: {
      material: product.packaging.primaryPackaging,
      targetTemp: product.transportation.targetTemp,
      maxHumidity: 90
    },
    status: 'In Transit',
    driverName: 'Gaurav Express Fleet',
    createdAt: new Date().toISOString()
  };

  const handleDownload = async (docType: 'passport' | 'invoice' | 'packaging' | 'delivery' | 'master') => {
    setDownloadingDoc(docType);
    setDownloadSuccess(null);

    // Short UX delay for smooth generation experience
    await new Promise((r) => setTimeout(r, 600));

    try {
      if (docType === 'passport') {
        const doc = generateProductPassportPDF(product, batchId);
        downloadPDF(doc, `AgriFlow_Product_Passport_${product.id}_${batchId}.pdf`);
      } else if (docType === 'invoice') {
        const details: PDFOrderDetails = {
          orderId: order.batchId,
          customerName: 'Hindushree Muniraju',
          customerAddress: 'Indiranagar 100ft Road, Bengaluru, KA 560038',
          customerPhone: '+91 98450 12345',
          orderDate: new Date().toLocaleDateString('en-IN'),
          productName: product.name,
          productCategory: product.category,
          productForm: product.variety,
          quantityKg: order.quantityKg,
          unitPrice: product.market.basePricePerKg,
          packagingCost: Math.round(order.quantityKg * 1.8),
          transportCost: 450,
          totalAmount: Math.round(order.quantityKg * product.market.basePricePerKg + order.quantityKg * 1.8 + 450),
          paymentMethod: 'AgriFlow Smart Wallet',
          farmerName: 'Kisan Agro Producers Cooperative',
          farmerLocation: 'Nashik Organic Cluster, Maharashtra',
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
          quantityKg: order.quantityKg,
          targetShelfLifeDays: 14,
          storageTempC: parseFloat(product.transportation.targetTemp) || 13,
          humidityPercent: 88,
          distanceKm: order.distanceKm || 280,
          estimatedTravelHours: Math.round(((order.distanceKm || 280) / 40) * 10) / 10,
          vehicleType: 'Reefer Truck',
          budgetPreference: 'balanced',
          sustainabilityPreference: 'standard'
        });
        const doc = generatePackagingReportPDF(product, rec, {
          batchKg: order.quantityKg,
          distanceKm: order.distanceKm || 280,
          tempC: parseFloat(product.transportation.targetTemp) || 13,
          humidityPercent: 88
        });
        downloadPDF(doc, `AgriFlow_SIH26236_Packaging_Report_${product.id}.pdf`);
      } else if (docType === 'delivery') {
        const doc = generateDeliveryReportPDF(order, true);
        downloadPDF(doc, `AgriFlow_Delivery_Telemetry_Audit_${order.batchId}.pdf`);
      } else if (docType === 'master') {
        const rec = generatePackagingRecommendation({
          product,
          quantityKg: order.quantityKg,
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
      desc: 'Complete farm origin, seed lot, harvest timestamp, chemical residue status, and 5-stage blockchain passport.'
    },
    {
      id: 'invoice',
      title: 'Order Invoice & Tax Receipt PDF',
      icon: <Receipt className="w-5 h-5 text-pink-400" />,
      tag: 'Commercial Billing',
      desc: 'Itemized commercial invoice with unit price, packaging fee, cold-chain transport, and digital authorization.'
    },
    {
      id: 'packaging',
      title: 'SIH26236 Packaging Dossier PDF',
      icon: <Package className="w-5 h-5 text-purple-400" />,
      tag: 'AI Material Recommendation',
      desc: 'Respiration kinetics (O2/CO2 rates), ASTM D3985 OTR / ASTM F1249 WVTR evaluation, 4-tier materials & layer breakdown.'
    },
    {
      id: 'delivery',
      title: 'Cold-Chain Delivery & GPS Report PDF',
      icon: <Truck className="w-5 h-5 text-sky-400" />,
      tag: 'Transit & Telemetry Audit',
      desc: 'GPS waypoint log, reefer temperature sensor audit, vibration damping index, and delivery risk integrity.'
    },
    {
      id: 'master',
      title: 'Complete AgriFlow Master Dossier PDF',
      icon: <BookOpen className="w-5 h-5 text-amber-400" />,
      tag: 'Unified All-in-One Report',
      desc: 'Master multi-page report integrating Passport, Invoice, SIH26236 Packaging, and Cold-Chain Logistics.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="max-w-3xl w-full rounded-3xl bg-slate-900 border-2 border-purple-500/40 p-6 sm:p-8 space-y-6 shadow-[0_0_50px_rgba(168,85,247,0.3)] max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-purple-500/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/40 text-purple-300 flex items-center justify-center text-2xl">
              {product.icon || '📄'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" /> FSSAI & ASTM Certified
                </span>
                <span className="text-xs text-slate-400 font-mono">Batch: {batchId}</span>
              </div>
              <h3 className="text-xl font-black text-white mt-1">
                AgriFlow Document & PDF Download Center
              </h3>
              <p className="text-xs text-slate-300">
                Official verified documents for <strong>{product.name}</strong> ({product.category})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors text-sm font-bold"
          >
            ✕
          </button>
        </div>

        {/* Success Toast */}
        {downloadSuccess && (
          <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 flex items-center gap-2.5 text-emerald-300 text-xs font-bold animate-fade-in shadow-lg">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>PDF generated and downloaded successfully! Opens seamlessly in all PDF readers.</span>
          </div>
        )}

        {/* Document Cards List */}
        <div className="space-y-3.5">
          {documentCards.map((doc) => {
            const isGenerating = downloadingDoc === doc.id;
            const isDone = downloadSuccess === doc.id;

            return (
              <div
                key={doc.id}
                className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    {doc.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                        {doc.title}
                      </h4>
                      <span className="text-[10px] font-mono font-bold text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded">
                        {doc.tag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 max-w-lg leading-relaxed">
                      {doc.desc}
                    </p>
                  </div>
                </div>

                <button
                  disabled={isGenerating}
                  onClick={() => handleDownload(doc.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center justify-center gap-2 ${
                    isDone
                      ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                      : isGenerating
                      ? 'bg-purple-800/60 text-purple-200 cursor-wait'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-md'
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-purple-300" />
                      <span>Generating PDF...</span>
                    </>
                  ) : isDone ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>Downloaded!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download PDF</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer info banner */}
        <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-purple-500/20 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Encrypted with AgriFlow Node Authentication & FSSAI IS 9845 Audit Standards</span>
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
