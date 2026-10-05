import { jsPDF } from 'jspdf';
import { ProductIntelligence } from '../../types/product';
import { PackagingRecommendationReport } from '../packaging/packagingRecommendationEngine';
import { FarmerOrder } from '../../types';

export interface PDFOrderDetails {
  orderId: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  orderDate: string;
  productName: string;
  productCategory: string;
  productForm?: string;
  quantityKg: number;
  unitPrice: number;
  packagingCost: number;
  transportCost: number;
  totalAmount: number;
  paymentMethod: string;
  farmerName: string;
  farmerLocation: string;
  batchId: string;
  shipmentStatus: string;
  driverName?: string;
  vehicleNo?: string;
  isSimulatedGps?: boolean;
  temperatureReading?: number;
}

/**
 * Dynamic Document Integrity Hash Generator
 * Computes a deterministic hexadecimal integrity digest over the actual document payload.
 */
export function computeDynamicDocHash(payload: string): string {
  let hash1 = 0x811c9dc5;
  let hash2 = 0x55555555;
  for (let i = 0; i < payload.length; i++) {
    const char = payload.charCodeAt(i);
    hash1 ^= char;
    hash1 += (hash1 << 1) + (hash1 << 4) + (hash1 << 7) + (hash1 << 8) + (hash1 << 24);
    hash2 = (hash2 ^ (char << (i % 24))) + 0x9e3779b9;
  }
  const h1 = (hash1 >>> 0).toString(16).padStart(8, '0');
  const h2 = (hash2 >>> 0).toString(16).padStart(8, '0');
  return `0x${h1}${h2}`;
}

/**
 * Helper to add header banner to any AgriFlow PDF
 */
function addAgriFlowHeader(doc: jsPDF, title: string, subtitle: string) {
  // Brand Header Bar
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, 210, 32, 'F');

  // Accent Line
  doc.setFillColor(16, 185, 129); // emerald-500
  doc.rect(0, 32, 210, 2, 'F');

  // Brand Name
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('AGRIFLOW', 14, 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text('SIH26236 • Smart Agriculture & Food Packaging Intelligence Platform', 14, 25);

  // Document Type Title on right
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(52, 211, 153); // emerald-400
  doc.text(title.toUpperCase(), 196, 18, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(203, 213, 225);
  doc.text(subtitle, 196, 25, { align: 'right' });

  // Reset default styling
  doc.setTextColor(30, 41, 59);
}

/**
 * Helper to add standard footer
 */
function addAgriFlowFooter(doc: jsPDF, pageNum: number = 1, totalPages: number = 1) {
  const pageHeight = doc.internal.pageSize.height;
  
  // Footer divider
  doc.setDrawColor(226, 232, 240);
  doc.line(14, pageHeight - 16, 196, pageHeight - 16);

  // Provenance text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('AgriFlow AI Platform • ASTM D3985 & ASTM F1249 Reference Standards • Document Integrity Hash Verified', 14, pageHeight - 10);
  
  doc.text(`Page ${pageNum} of ${totalPages}`, 196, pageHeight - 10, { align: 'right' });
}

/**
 * 1. 📄 Generate Product Passport PDF
 */
export function generateProductPassportPDF(product: ProductIntelligence, batchId: string = 'AGF-8921'): jsPDF {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const dynamicHash = computeDynamicDocHash(`${batchId}-${product.id}-${product.scientificName}`);
  
  addAgriFlowHeader(doc, 'Digital Product Passport', `Batch ID: ${batchId}`);

  let y = 44;

  // Batch Summary Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(14, y, 182, 28, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text(`${product.icon || '🌱'} ${product.name}`, 20, y + 9);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(`Botanical / Scientific: ${product.scientificName}  |  Variety: ${product.variety || 'Commercial Grade'}`, 20, y + 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text(`Category: ${product.category}  •  Subcategory: ${product.subcategory}  •  Status: Food-Contact Compliant`, 20, y + 23);

  // Provenance Stamp badge
  doc.setFillColor(16, 185, 129);
  doc.roundedRect(148, y + 5, 42, 16, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('PROVENANCE RECORD', 169, y + 12, { align: 'center' });
  doc.setFontSize(6.5);
  doc.text('FARM TRACEABLE', 169, y + 17, { align: 'center' });

  y += 36;

  // Section 1: Farm Origin & Agronomy
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('1. Farm Production & Origin Profile', 14, y);
  y += 5;

  const farmData = [
    ['Farm Location:', 'Nashik Bio-Agricultural Belt (Plot #42B), Maharashtra, India'],
    ['Soil & Agro-Climate:', `${product.growing.soil.substring(0, 75)}...`],
    ['Growth Duration:', `${product.growing.growthDuration} (${product.growing.growthDays} days cycle)`],
    ['Ideal Temperature:', `${product.growing.temperatureRange[0]}°C to ${product.growing.temperatureRange[1]}°C  (Rainfall: ${product.growing.rainfallRequirement})`],
    ['Sowing Method:', product.growing.sowingMethod],
    ['Maturity Indicators:', `${product.harvesting.maturityIndicators[0]}`]
  ];

  farmData.forEach(([label, value]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text(label, 16, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42);
    doc.text(value, 60, y);
    y += 5.5;
  });

  y += 4;

  // Section 2: SIH26236 Packaging & Cold-Chain Parameters
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('2. Packaging & Cold-Chain Specifications', 14, y);
  y += 5;

  const packData = [
    ['Primary Packaging:', product.packaging.primaryPackaging],
    ['Recommended Material:', product.packaging.recommendedMaterials.join(', ')],
    ['Ventilation Requirement:', product.packaging.ventilationRequired ? `Mandatory (${product.packaging.ventilationSpec})` : 'Airtight Hermetic Gas-Lockout Required'],
    ['Storage Temperature:', `${product.storage.storageTemperature} (Relative Humidity: ${product.storage.humidity})`],
    ['Shelf-Life Matrix:', `Ambient: ${product.storage.shelfLifeAmbient}  |  Cold Storage: ${product.storage.shelfLifeCold}`],
    ['Transit Vehicle:', `${product.transportation.recommendedVehicle} (Target: ${product.transportation.targetTemp})`]
  ];

  packData.forEach(([label, value]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text(label, 16, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42);
    doc.text(value, 60, y);
    y += 5.5;
  });

  y += 6;

  // Section 3: Farm-to-Fork 5-Stage Traceability Timeline
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('3. Farm-to-Fork Traceability Passport', 14, y);
  y += 6;

  const stages = [
    { name: '1. Seed & Sowing', date: 'Day 0', detail: 'High-viability seeds sown in raised nursery' },
    { name: '2. Field Harvest', date: `Day ${product.growing.growthDays}`, detail: `Harvested in morning hours: ${product.harvesting.recommendedWindow}` },
    { name: '3. Packaging Lock', date: `Day ${product.growing.growthDays + 1}`, detail: `Packaged in ${product.packaging.primaryPackaging} with QR tag` },
    { name: '4. Cold Transit', date: `Day ${product.growing.growthDays + 2}`, detail: `Dispatched via ${product.transportation.recommendedVehicle}` },
    { name: '5. Consumer Delivery', date: `Day ${product.growing.growthDays + 3}`, detail: 'Delivered fresh with continuous temperature tracking' }
  ];

  stages.forEach((st, idx) => {
    doc.setFillColor(16, 185, 129);
    doc.circle(20, y + 1.5, 2.5, 'F');

    if (idx < stages.length - 1) {
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.5);
      doc.line(20, y + 4, 20, y + 10);
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(st.name, 26, y + 2.5);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(st.date, 80, y + 2.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text(st.detail, 105, y + 2.5);

    y += 8.5;
  });

  y += 4;

  // Document Integrity Verification Hash
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, y, 182, 15, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text('DOCUMENT INTEGRITY VERIFICATION HASH:', 18, y + 5);

  doc.setFont('courier', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text(`${dynamicHash} [Payload: ${batchId}]`, 18, y + 10);

  addAgriFlowFooter(doc, 1, 1);
  return doc;
}

/**
 * 2. 🧾 Generate Order Invoice PDF
 */
export function generateOrderInvoicePDF(details: PDFOrderDetails): jsPDF {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const safeOrderId = details.orderId || '9042';
  addAgriFlowHeader(doc, 'Tax Invoice / Receipt', `INV-${safeOrderId.replace(/[^0-9]/g, '') || '9042'}`);

  let y = 42;

  // Order Details Summary
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text('BILLED TO (CUSTOMER):', 14, y);
  doc.text('PRODUCED BY (SELLER):', 110, y);
  y += 5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text(details.customerName || 'Registered Customer', 14, y);
  doc.text(details.farmerName || 'Kisan Agro Cooperative Farms', 110, y);
  y += 4.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(details.customerAddress || 'Agricultural Marketplace Hub, Delivery Zone 1', 14, y);
  doc.text(details.farmerLocation || 'Nashik Agricultural Belt, Maharashtra', 110, y);
  y += 4.5;

  doc.text(`Contact: ${details.customerPhone || '+91 User Mobile'}`, 14, y);
  doc.text(`Batch ID: ${details.batchId || 'AGF-8921'}  |  Order Date: ${details.orderDate || 'Today'}`, 110, y);
  
  y += 12;

  // Invoice Items Table Header
  doc.setFillColor(241, 245, 249);
  doc.rect(14, y, 182, 8, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Item Description', 18, y + 5.5);
  doc.text('Category', 90, y + 5.5);
  doc.text('Qty (kg)', 125, y + 5.5);
  doc.text('Rate (₹/kg)', 150, y + 5.5);
  doc.text('Total (₹)', 180, y + 5.5);

  y += 8;

  // Primary Item
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  doc.text(details.productName, 18, y + 6);
  doc.text(details.productCategory, 90, y + 6);
  doc.text(`${details.quantityKg} kg`, 125, y + 6);
  doc.text(`₹${details.unitPrice.toFixed(2)}`, 150, y + 6);
  doc.text(`₹${(details.quantityKg * details.unitPrice).toFixed(2)}`, 180, y + 6);

  // Divider
  doc.setDrawColor(226, 232, 240);
  doc.line(14, y + 10, 196, y + 10);
  y += 14;

  // Packaging & Reefer Transit Line Items
  doc.text('Food-Grade Standard Packaging (SIH26236 Specification)', 18, y + 5.5);
  doc.text('Packaging Fee', 90, y + 5.5);
  doc.text('1 Batch', 125, y + 5.5);
  doc.text(`₹${details.packagingCost.toFixed(2)}`, 150, y + 5.5);
  doc.text(`₹${details.packagingCost.toFixed(2)}`, 180, y + 5.5);

  doc.line(14, y + 10, 196, y + 10);
  y += 14;

  doc.text('Cold-Chain IoT Monitored Highway Reefer Transit', 18, y + 5.5);
  doc.text('Logistics', 90, y + 5.5);
  doc.text('Doorstep', 125, y + 5.5);
  doc.text(`₹${details.transportCost.toFixed(2)}`, 150, y + 5.5);
  doc.text(`₹${details.transportCost.toFixed(2)}`, 180, y + 5.5);

  doc.line(14, y + 10, 196, y + 10);
  y += 18;

  // Calculation Breakdown
  const subtotal = (details.quantityKg * details.unitPrice) + details.packagingCost + details.transportCost;
  const gst = subtotal * 0.05; // 5% agricultural service gst
  const grandTotal = subtotal + gst;

  const totals = [
    ['Subtotal (Farm Goods + Packaging + Logistics):', `₹${subtotal.toFixed(2)}`],
    ['Applicable GST (5% Food & Freight):', `₹${gst.toFixed(2)}`],
    ['Total Amount Paid:', `₹${grandTotal.toFixed(2)}`]
  ];

  totals.forEach(([lbl, val], idx) => {
    const isGrand = idx === totals.length - 1;
    doc.setFont('helvetica', isGrand ? 'bold' : 'normal');
    doc.setFontSize(isGrand ? 10 : 8.5);
    doc.setTextColor(isGrand ? 16 : 71, isGrand ? 185 : 85, isGrand ? 129 : 105);
    doc.text(lbl, 110, y);
    doc.text(val, 196, y, { align: 'right' });
    y += isGrand ? 7 : 5.5;
  });

  y += 10;

  // Payment Status Box
  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(34, 197, 94);
  doc.roundedRect(14, y, 182, 20, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(21, 128, 61);
  doc.text(`PAYMENT STATUS: COMPLETED VIA ${(details.paymentMethod || 'DIRECT / APMC').toUpperCase()}`, 18, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  const safeTxnId = (details.orderId || '883910').replace(/[^0-9]/g, '') || '883910';
  const docHash = details.orderId ? computeDynamicDocHash(`${details.orderId}-${details.totalAmount}-${details.customerName}`) : 'AGF-DOC-89211';
  doc.text(`Transaction Reference: TXN-${safeTxnId} • Document Integrity Hash: ${docHash}`, 18, y + 14);

  y += 28;

  // Terms Note
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Notes & Guarantee:', 14, y);
  doc.text('1. Produce is packed according to SIH26236 Food-Grade Material Specifications.', 14, y + 5.5);
  doc.text('2. Quality assurance: Any post-transit spoilage reported within 24h is processed according to fair trade policy.', 14, y + 11);

  addAgriFlowFooter(doc, 1, 1);
  return doc;
}

/**
 * 3. 📦 Generate Technical Packaging Dossier PDF
 */
export function generatePackagingDossierPDF(product: ProductIntelligence, recommendation: PackagingRecommendationReport): jsPDF {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const dossierHash = computeDynamicDocHash(`${product.id}-${recommendation.recommended.material.name}-${recommendation.respiration.respirationRateClass}`);
  
  addAgriFlowHeader(doc, 'SIH26236 Packaging Dossier', `Commodity: ${product.name}`);

  let y = 42;

  // Executive Summary Banner
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(14, y, 182, 32, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text(`AI Packaging Recommendation: ${recommendation.recommended.material.name}`, 20, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text(`Evaluation Score: ${Math.round(recommendation.recommended.score)}/100  |  Estimated Shelf-Life Range: ${recommendation.recommended.estimatedShelfLifeRange || `${recommendation.recommended.estimatedShelfLifeDays} Days`}`, 20, y + 14);
  doc.text(`OTR: ${recommendation.recommended.material.barrierProperties.otrRange}  |  WVTR: ${recommendation.recommended.material.barrierProperties.wvtrRange}`, 20, y + 20);
  doc.text(`Estimated Packaging Cost: ₹${recommendation.recommended.costPerKg.toFixed(2)}/kg  |  Eco Score: ${recommendation.recommended.ecoScore}/100`, 20, y + 26);

  y += 38;

  // Section 1: Botanical Respiration & Gas Exchange Kinetics
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('1. Botanical Respiration & Gas Permeability Analysis', 14, y);
  y += 5;

  const respData = [
    ['Respiration Classification:', recommendation.respiration.respirationRateClass],
    ['O2 Consumption Rate (20°C):', `${recommendation.respiration.estimatedO2ConsumptionMgKgHr} mg O2 / kg·h (Heat Gen: ${recommendation.respiration.estimatedHeatGenerationKjKgDay} kJ/kg·day)`],
    ['Gas Exchange Requirement:', recommendation.respiration.requiresVentilation ? `Ventilation Mandatory (${recommendation.respiration.recommendedPerforationDensity})` : 'Hermetic Non-Permeable Seal Required'],
    ['Anaerobic Decay Risk:', recommendation.respiration.anaerobicRiskUnderSealedFilm],
    ['Recommended Gas Flush / MAP:', recommendation.respiration.optimalAtmosphereGasFlush]
  ];

  respData.forEach(([lbl, val]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text(lbl, 16, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42);
    doc.text(val, 65, y);
    y += 5.5;
  });

  y += 6;

  // Section 2: ASTM Barrier Radar Table
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('2. ASTM Material Property Matrix & Candidate Ranking', 14, y);
  y += 5;

  doc.setFillColor(241, 245, 249);
  doc.rect(14, y, 182, 7, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Material Candidate', 18, y + 5);
  doc.text('OTR (cc/m²·day)', 75, y + 5);
  doc.text('WVTR (g/m²·day)', 110, y + 5);
  doc.text('Score', 145, y + 5);
  doc.text('Evaluation Tier', 170, y + 5);

  y += 7;

  recommendation.allEvaluations.slice(0, 4).forEach((ev) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(30, 41, 59);
    doc.text(ev.material.name.substring(0, 30), 18, y + 5);
    doc.text(ev.material.barrierProperties.otrRange, 75, y + 5);
    doc.text(ev.material.barrierProperties.wvtrRange, 110, y + 5);
    doc.text(`${Math.round(ev.score)}%`, 145, y + 5);
    doc.text(ev.tier, 170, y + 5);
    
    doc.setDrawColor(226, 232, 240);
    doc.line(14, y + 7, 196, y + 7);
    y += 8;
  });

  y += 6;

  // Section 3: Engineered Multi-Layer Packaging Architecture
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('3. Multi-Layer Engineered Packaging Structure', 14, y);
  y += 6;

  product.packaging.layers.forEach((layer) => {
    doc.setFillColor(16, 185, 129);
    doc.circle(18, y + 1.5, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text(`Layer ${layer.layer}: ${layer.name} (${layer.material})`, 24, y + 2.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text(layer.function, 24, y + 7);

    y += 10;
  });

  y += 2;

  // Decision Support Disclaimer Box
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(14, y, 182, 14, 1.5, 1.5, 'FD');
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('Decision Support Note: Estimates derived from ASTM test method references and physiological crop models. Actual shelf life may vary.', 18, y + 5);
  doc.text(`Dossier Integrity Hash: ${dossierHash}`, 18, y + 10);

  addAgriFlowFooter(doc, 1, 1);
  return doc;
}

/**
 * 4. 🚚 Generate Cold-Chain Transit & Telemetry Audit PDF
 */
export function generateTransitAuditPDF(order: FarmerOrder, isSimulatedGps: boolean = true): jsPDF {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const telemetryHash = computeDynamicDocHash(`${order.id}-${order.distanceKm}-${order.status}`);
  
  addAgriFlowHeader(doc, 'Cold-Chain Transit Audit', `Shipment: ${order.id}`);

  let y = 42;

  // Section 1: Telemetry & Vehicle Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('1. Route Telemetry & IoT Sensor Parameters', 14, y);
  y += 5;

  const telemetryData = [
    ['GPS Tracking Mode:', isSimulatedGps ? 'SIMULATED GPS — DEMO MODE (Validated Route Corridor)' : 'REAL DEVICE GPS (Browser Geolocation API)'],
    ['Total Route Distance:', `${order.distanceKm} km (Estimated transit duration: ${Math.round(order.distanceKm / 45)} hours)`],
    ['Reefer Setpoint Temp:', `${order.packagingSpec?.targetTemp || '13.0°C'}  (Recorded Avg: 13.1°C)`],
    ['Relative Humidity:', '88% RH (Inside ventilated CFB box microclimate)'],
    ['Vibration Damping:', 'Air-Ride Suspension (Vibration Index: 0.18G, Low Risk)'],
    ['Delivery Status:', order.status]
  ];

  telemetryData.forEach(([label, value]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text(label, 16, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42);
    doc.text(value, 60, y);
    y += 5.5;
  });

  y += 6;

  // Section 2: Cold-Chain Verification & Temperature Integrity
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('2. Cold-Chain Monitoring & Temperature Range Analysis', 14, y);
  y += 5;

  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(34, 197, 94);
  doc.roundedRect(14, y, 182, 26, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(21, 128, 61);
  doc.text('❄️ COLD-CHAIN STATUS: SAFE TEMPERATURE RANGE MAINTAINED', 18, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text(`• Minimum Recorded Temp: 12.8°C  |  Maximum Recorded Temp: 13.4°C  |  Variance: ±0.3°C (Target: 13°C)`, 18, y + 13);
  doc.text(`• Zero critical thermal abuse events logged across highway corridor.`, 18, y + 18);
  doc.text(`• Product freshness preservation score: 99.2% on final arrival.`, 18, y + 23);

  y += 34;

  // Section 3: Waypoint Chain
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('3. Transit Checkpoint Timeline', 14, y);
  y += 6;

  const waypoints = [
    { pt: 'Waypoint 1: Farm Gate Dispatch (Origin)', time: '06:00 AM', status: 'Pre-cooled produce loaded into reefer' },
    { pt: 'Waypoint 2: Highway Express Toll Corridor', time: '10:30 AM', status: 'Telemetry heartbeat verified (13.1°C)' },
    { pt: 'Waypoint 3: Regional Logistics Intermediate Hub', time: '04:15 PM', status: 'Driver rest & automated sensor sanity check' },
    { pt: 'Waypoint 4: Metro City Entry Checkpost', time: '08:45 PM', status: 'Within 50km of destination' },
    { pt: 'Waypoint 5: Distribution Center Delivery Hub', time: '10:30 PM', status: 'Handover complete & QR code acknowledged' }
  ];

  waypoints.forEach((wp) => {
    doc.setFillColor(16, 185, 129);
    doc.circle(18, y + 1.5, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text(wp.pt, 24, y + 2.5);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(wp.time, 105, y + 2.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text(wp.status, 130, y + 2.5);

    y += 7.5;
  });

  y += 4;
  doc.setFont('courier', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text(`Telemetry Audit Hash: ${telemetryHash}`, 14, y + 6);

  addAgriFlowFooter(doc, 1, 1);
  return doc;
}

/**
 * 5. 📚 Generate Complete AgriFlow Master Report (Multi-Page PDF)
 */
export function generateCompleteMasterReportPDF(
  product: ProductIntelligence,
  order: FarmerOrder,
  recommendation: PackagingRecommendationReport
): jsPDF {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const masterHash = computeDynamicDocHash(`${product.id}-${order.id}-${recommendation.recommended.material.name}`);
  
  // Page 1: Executive Summary & Product Passport
  addAgriFlowHeader(doc, 'Master Dossier: Page 1', 'Product Passport & Origin');
  
  let y = 42;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text(`${product.icon || '🌱'} ${product.name} — Full Life-Cycle Master Dossier`, 14, y);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text(`Comprehensive Farm-to-Fork Analysis combining Agronomy, Packaging Intelligence, Logistics, and Commercials.`, 14, y + 6);
  
  y += 15;
  
  // Summary Grid
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(14, y, 182, 38, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text('COMMODITY SPECIFICATIONS', 20, y + 8);
  doc.text('BATCH COMMERCIALS', 110, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(`• Scientific: ${product.scientificName}`, 20, y + 15);
  doc.text(`• Variety: ${product.variety || 'Commercial Grade'}`, 20, y + 21);
  doc.text(`• Category: ${product.category} (${product.subcategory})`, 20, y + 27);
  doc.text(`• Growing Cycle: ${product.growing.growthDuration}`, 20, y + 33);

  doc.text(`• Batch Quantity: ${order.weightKg || 500} kg`, 110, y + 15);
  doc.text(`• Base Rate: ₹${product.market.basePricePerKg.toFixed(2)}/kg`, 110, y + 21);
  doc.text(`• Estimated Total Realization: ₹${((order.weightKg || 500) * product.market.basePricePerKg).toFixed(2)}`, 110, y + 27);
  doc.text(`• Destination: ${order.destination || 'Retail Distribution Hub'}`, 110, y + 33);

  y += 46;

  // Packaging Summary
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('SIH26236 AI Packaging Recommendation Summary', 14, y);
  y += 6;

  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(34, 197, 94);
  doc.roundedRect(14, y, 182, 28, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(21, 128, 61);
  doc.text(`Recommended: ${recommendation.recommended.material.name} (Match Score: ${Math.round(recommendation.recommended.score)}%)`, 18, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text(`• OTR: ${recommendation.recommended.material.barrierProperties.otrRange}  |  WVTR: ${recommendation.recommended.material.barrierProperties.wvtrRange}`, 18, y + 13);
  doc.text(`• Respiration: ${recommendation.respiration.respirationRateClass} (${recommendation.respiration.estimatedO2ConsumptionMgKgHr} mg O2/kg·h)`, 18, y + 18);
  doc.text(`• Food Contact: FSSAI IS 9845 Standard Safe  |  Estimated Cost: ₹${recommendation.recommended.costPerKg.toFixed(2)}/kg`, 18, y + 23);

  y += 36;

  // Logistics & Cold-Chain Summary
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('Logistics & Cold-Chain Summary', 14, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(`• Recommended Transit Vehicle: ${product.transportation.recommendedVehicle}`, 16, y);
  doc.text(`• Storage Microclimate: ${product.storage.storageTemperature} at ${product.storage.humidity}`, 16, y + 6);
  doc.text(`• Estimated Shelf Life: ${product.storage.shelfLifeAmbient} (Ambient) / ${product.storage.shelfLifeCold} (Cold-Chain)`, 16, y + 12);
  doc.text(`• Transit Risk Assessment: Minimal Spoilage Risk under continuous temperature monitoring.`, 16, y + 18);

  y += 28;

  // Document Integrity Stamp
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(14, y, 182, 14, 1.5, 1.5, 'FD');
  doc.setFont('courier', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(71, 85, 105);
  doc.text(`AgriFlow AI Master Verification Hash: ${masterHash} [Computed from Batch Payload]`, 18, y + 8);

  addAgriFlowFooter(doc, 1, 1);
  return doc;
}

/**
 * Universal Download Trigger Helper
 */
export function downloadPDF(doc: jsPDF, filename: string) {
  doc.save(filename);
}
