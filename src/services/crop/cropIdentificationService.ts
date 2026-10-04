/**
 * Universal Crop & Food Commodity Identification Service
 * Connects frontend image uploads securely to server-side Google Gemini Multimodal Vision API
 * with automatic real-time market price discovery and high-fidelity visual rendering.
 */

import { resolveCropAlias, getDidYouMeanSuggestions, CANONICAL_CROP_ALIASES } from './cropAliasService';
import { fetchLiveProductPrice, LiveMarketPriceRecord } from '../market/livePriceService';
import { computeImageSignature, getLearnedImageCorrection } from './imageCorrectionMemoryService';
import { extractCanvasColorMetrics, classifyFromColorMetrics, ColorMetrics } from './pixelVisionClassifier';

export interface CandidateCrop {
  canonicalId: string;
  name: string;
  scientificName: string;
  category: string;
  confidence: number;
  matchedTrait?: string;
}

export interface IdentificationResult {
  identified: boolean;
  canonicalId: string;
  name: string;
  scientificName: string;
  category: string;
  form?: string;
  confidence: number;
  confidenceLabel: 'HIGH' | 'MEDIUM' | 'LOW';
  needsConfirmation: boolean;
  visualEvidence: string[];
  condition: string;
  qualityObservations: string[];
  multipleProductsDetected: boolean;
  detectedProducts: { canonicalId: string; name: string; confidence: number }[];
  isNonFoodOrBlurry: boolean;
  rejectionReason: string | null;
  candidates: CandidateCrop[];
  isRealAi: boolean;
  isDemoFallback: boolean;
  source: string;
  timestamp: string;
  uploadedPhotoPreviewUrl?: string;
  imageSignature?: string;
  price?: LiveMarketPriceRecord;
}

/**
 * Identify crop from typed text or voice transcript
 */
export function identifyCropFromText(query: string): IdentificationResult {
  const resolved = resolveCropAlias(query);
  const now = new Date().toISOString();

  if (resolved && resolved.confidence >= 0.70) {
    const candidates: CandidateCrop[] = [
      {
        canonicalId: resolved.canonicalId,
        name: resolved.name,
        scientificName: resolved.scientificName,
        category: resolved.category,
        confidence: resolved.confidence,
        matchedTrait: `Matched alias: "${resolved.matchedTerm}"`
      }
    ];

    const suggestions = getDidYouMeanSuggestions(query, 2);
    suggestions.forEach(s => {
      if (s.canonicalId !== resolved.canonicalId) {
        const full = CANONICAL_CROP_ALIASES.find(c => c.canonicalId === s.canonicalId);
        if (full) {
          candidates.push({
            canonicalId: full.canonicalId,
            name: full.name,
            scientificName: full.scientificName,
            category: full.category,
            confidence: s.confidence,
            matchedTrait: 'Fuzzy similarity'
          });
        }
      }
    });

    const confLabel = resolved.confidence >= 0.85 ? 'HIGH' : resolved.confidence >= 0.60 ? 'MEDIUM' : 'LOW';

    return {
      identified: true,
      canonicalId: resolved.canonicalId,
      name: resolved.name,
      scientificName: resolved.scientificName,
      category: resolved.category,
      form: 'Fresh',
      confidence: resolved.confidence,
      confidenceLabel: confLabel,
      needsConfirmation: resolved.confidence < 0.85,
      visualEvidence: [`Matched terminology in canonical registry: ${resolved.matchedTerm}`],
      condition: 'Standard quality baseline',
      qualityObservations: ['Canonical name resolved from verified agricultural dictionary'],
      multipleProductsDetected: false,
      detectedProducts: [],
      isNonFoodOrBlurry: false,
      rejectionReason: null,
      candidates,
      isRealAi: false,
      isDemoFallback: false,
      source: 'AgriFlow Multi-Lingual Canonical Alias Engine',
      timestamp: now
    };
  }

  const suggestions = getDidYouMeanSuggestions(query, 3);
  const candidates: CandidateCrop[] = suggestions.map(s => {
    const full = CANONICAL_CROP_ALIASES.find(c => c.canonicalId === s.canonicalId);
    return {
      canonicalId: s.canonicalId,
      name: s.name,
      scientificName: full?.scientificName || 'Botanical sp.',
      category: full?.category || 'Vegetable',
      confidence: s.confidence,
      matchedTrait: 'Partial phonetic match'
    };
  });

  return {
    identified: candidates.length > 0,
    canonicalId: candidates[0]?.canonicalId || 'unknown',
    name: candidates[0]?.name || query,
    scientificName: candidates[0]?.scientificName || 'Unclassified agricultural commodity',
    category: candidates[0]?.category || 'Vegetable',
    form: 'Fresh',
    confidence: candidates[0]?.confidence || 0.40,
    confidenceLabel: 'LOW',
    needsConfirmation: true,
    visualEvidence: ['Dynamic fuzzy string analysis'],
    condition: 'Unverified input',
    qualityObservations: ['Manual verification requested'],
    multipleProductsDetected: false,
    detectedProducts: [],
    isNonFoodOrBlurry: false,
    rejectionReason: null,
    candidates,
    isRealAi: false,
    isDemoFallback: false,
    source: 'AgriFlow Dynamic Knowledge Discovery',
    timestamp: now
  };
}

/**
 * Compress / resize image and extract canvas color metrics
 */
async function processImageCanvas(file: File, maxDimension: number = 1024): Promise<{ dataUrl: string; metrics: ColorMetrics }> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, width);
        canvas.height = Math.max(1, height);
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const metrics = extractCanvasColorMetrics(canvas, ctx);
          resolve({
            dataUrl: canvas.toDataURL('image/jpeg', 0.85),
            metrics
          });
        } else {
          resolve({
            dataUrl: e.target?.result as string,
            metrics: {
              whiteRatio: 0.1,
              greenRatio: 0.2,
              darkGreenRatio: 0.1,
              redRatio: 0.1,
              purpleRatio: 0.1,
              orangeRatio: 0.1,
              yellowPaleRatio: 0.1,
              goldenYellowRatio: 0.1,
              brownEarthRatio: 0.1,
              aspectRatio: height / Math.max(1, width),
              totalPixels: width * height,
              isUniformOrBlank: false
            }
          });
        }
      };
      img.onerror = () => resolve({
        dataUrl: e.target?.result as string,
        metrics: {
          whiteRatio: 0.1,
          greenRatio: 0.2,
          darkGreenRatio: 0.1,
          redRatio: 0.1,
          purpleRatio: 0.1,
          orangeRatio: 0.1,
          yellowPaleRatio: 0.1,
          goldenYellowRatio: 0.1,
          brownEarthRatio: 0.1,
          aspectRatio: 1.0,
          totalPixels: 1000,
          isUniformOrBlank: false
        }
      });
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Identify crop from uploaded image file (JPG, PNG, WebP)
 * Multi-layer architecture:
 * 1. User-Learned Image Memory (checks if user previously verified this exact photo)
 * 2. Real Gemini Multimodal Vision API (if online/available)
 * 3. Client-Side & Offline Pixel Computer Vision Classifier (chromatic spectrum + geometry analysis)
 * 4. Automated Live Price Sync
 */
export async function identifyCropFromImage(file: File, marketLocation: string = 'Bengaluru'): Promise<IdentificationResult> {
  const fileName = (file.name || '').toLowerCase();
  const now = new Date().toISOString();
  let uploadedPreviewUrl = '';
  let imageSignature = '';
  let colorMetrics: ColorMetrics | null = null;

  try {
    const { dataUrl, metrics } = await processImageCanvas(file, 1024);
    uploadedPreviewUrl = dataUrl;
    colorMetrics = metrics;
    imageSignature = computeImageSignature(dataUrl, file.size);

    // LAYER 1: Check User-Learned Memory Cache first
    const learnedCorrection = getLearnedImageCorrection(imageSignature);
    if (learnedCorrection) {
      const livePrice = await fetchLiveProductPrice(learnedCorrection.canonicalId, marketLocation);
      return {
        identified: true,
        canonicalId: learnedCorrection.canonicalId,
        name: learnedCorrection.name,
        scientificName: learnedCorrection.scientificName,
        category: learnedCorrection.category,
        form: 'Fresh',
        confidence: 0.99,
        confidenceLabel: 'HIGH',
        needsConfirmation: false,
        visualEvidence: [
          `Learned user-verified identification: User confirmed this exact image as ${learnedCorrection.name}`,
          'Perceptual fingerprint matched in persistent memory',
          'Verified botanical classification stored'
        ],
        condition: 'User verified sample',
        qualityObservations: ['Saved to personal memory database'],
        multipleProductsDetected: false,
        detectedProducts: [],
        isNonFoodOrBlurry: false,
        rejectionReason: null,
        candidates: [
          {
            canonicalId: learnedCorrection.canonicalId,
            name: learnedCorrection.name,
            scientificName: learnedCorrection.scientificName,
            category: learnedCorrection.category,
            confidence: 0.99,
            matchedTrait: 'User-Verified Learned Identification'
          }
        ],
        isRealAi: true,
        isDemoFallback: false,
        source: 'AgriFlow Learned User Memory Engine',
        timestamp: now,
        uploadedPhotoPreviewUrl: uploadedPreviewUrl,
        imageSignature,
        price: livePrice
      };
    }

    // LAYER 2: Connect to Server-Side Gemini Multimodal Vision API
    const res = await fetch('/api/ai/identify-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        imageBase64: dataUrl,
        mimeType: file.type || 'image/jpeg',
        fileName: file.name,
        market: marketLocation
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.result) {
        const r = data.result;
        const candidates: CandidateCrop[] = [
          {
            canonicalId: r.canonicalId,
            name: r.name,
            scientificName: r.scientificName,
            category: r.category,
            confidence: r.confidence,
            matchedTrait: 'Primary visual identification match'
          }
        ];

        if (Array.isArray(r.alternatives)) {
          r.alternatives.forEach((alt: any) => {
            candidates.push({
              canonicalId: alt.canonicalId,
              name: alt.name,
              scientificName: alt.scientificName,
              category: r.category,
              confidence: alt.confidence || 0.05,
              matchedTrait: 'Visual alternative candidate'
            });
          });
        }

        let livePrice = r.price;
        if (!livePrice && r.canonicalId && !r.isNonFoodOrBlurry) {
          livePrice = await fetchLiveProductPrice(r.canonicalId, marketLocation);
        }

        return {
          identified: r.identified !== false,
          canonicalId: r.canonicalId,
          name: r.name,
          scientificName: r.scientificName,
          category: r.category,
          form: r.form || 'Fresh',
          confidence: r.confidence,
          confidenceLabel: r.confidenceLabel || (r.confidence >= 0.85 ? 'HIGH' : r.confidence >= 0.60 ? 'MEDIUM' : 'LOW'),
          needsConfirmation: r.confidence < 0.85 || Boolean(r.multipleProductsDetected) || Boolean(r.isNonFoodOrBlurry),
          visualEvidence: r.visualEvidence || ['Distinct morphological structure recognized'],
          condition: r.condition || 'Appears fresh',
          qualityObservations: r.qualityObservations || [],
          multipleProductsDetected: Boolean(r.multipleProductsDetected),
          detectedProducts: r.detectedProducts || [],
          isNonFoodOrBlurry: Boolean(r.isNonFoodOrBlurry),
          rejectionReason: r.rejectionReason || null,
          candidates,
          isRealAi: Boolean(data.isRealAi),
          isDemoFallback: Boolean(data.isDemoFallback),
          source: r.source || (data.isRealAi ? 'Google Gemini Multimodal Vision AI' : 'AgriFlow Verified Botanical Vision Engine'),
          timestamp: now,
          uploadedPhotoPreviewUrl: uploadedPreviewUrl,
          imageSignature,
          price: livePrice
        };
      }
    }
  } catch (err) {
    console.warn('[AgriFlow Frontend Vision] Server API unreachable, using client pixel computer-vision classifier:', err);
  }

  // LAYER 3: Client-Side Pixel Computer Vision & Morphological Classifier
  // Runs if server API is offline, key is missing, or network fails.
  const fallbackMetrics: ColorMetrics = colorMetrics || {
    whiteRatio: 0.1,
    greenRatio: 0.2,
    darkGreenRatio: 0.1,
    redRatio: 0.1,
    purpleRatio: 0.1,
    orangeRatio: 0.1,
    yellowPaleRatio: 0.1,
    goldenYellowRatio: 0.1,
    brownEarthRatio: 0.1,
    aspectRatio: 1.0,
    totalPixels: 1000,
    isUniformOrBlank: false
  };

  const pixelClassification = classifyFromColorMetrics(fallbackMetrics, file.name);
  const fallbackPrice = await fetchLiveProductPrice(pixelClassification.canonicalId, marketLocation);

  return {
    identified: !pixelClassification.isNonFoodOrBlurry,
    canonicalId: pixelClassification.canonicalId,
    name: pixelClassification.name,
    scientificName: pixelClassification.scientificName,
    category: pixelClassification.category,
    form: pixelClassification.form,
    confidence: pixelClassification.confidence,
    confidenceLabel: pixelClassification.confidenceLabel,
    needsConfirmation: pixelClassification.confidence < 0.85,
    visualEvidence: pixelClassification.visualEvidence,
    condition: pixelClassification.condition,
    qualityObservations: pixelClassification.qualityObservations,
    multipleProductsDetected: false,
    detectedProducts: [],
    isNonFoodOrBlurry: pixelClassification.isNonFoodOrBlurry,
    rejectionReason: pixelClassification.rejectionReason,
    candidates: [
      {
        canonicalId: pixelClassification.canonicalId,
        name: pixelClassification.name,
        scientificName: pixelClassification.scientificName,
        category: pixelClassification.category,
        confidence: pixelClassification.confidence,
        matchedTrait: 'Computer-Vision Chromatic & Morphology Spectrum'
      },
      ...pixelClassification.alternatives.map(a => ({
        canonicalId: a.canonicalId,
        name: a.name,
        scientificName: 'Botanical taxon',
        category: pixelClassification.category,
        confidence: a.confidence,
        matchedTrait: 'Alternative candidate'
      }))
    ],
    isRealAi: false,
    isDemoFallback: true,
    source: 'AgriFlow Edge Computer-Vision Classifier (Autonomous Mode)',
    timestamp: now,
    uploadedPhotoPreviewUrl: uploadedPreviewUrl,
    imageSignature,
    price: fallbackPrice
  };
}

