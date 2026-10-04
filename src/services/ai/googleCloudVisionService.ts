/**
 * AgriFlow Google Cloud Vision API Service
 * Integrates Google Cloud Vision (Label Detection, Object Localization, Image Properties & Web Detection)
 * for enterprise-grade computer vision recognition of agricultural crops and food commodities.
 */

import { resolveCropAlias } from '../crop/cropAliasService';

export interface CloudVisionLabel {
  description: string;
  score: number;
  topicality: number;
}

export interface CloudVisionLocalizedObject {
  name: string;
  score: number;
  boundingPoly?: {
    normalizedVertices: Array<{ x: number; y: number }>;
  };
}

export interface CloudVisionWebEntity {
  entityId?: string;
  score: number;
  description: string;
}

export interface CloudVisionColorInfo {
  color: {
    red: number;
    green: number;
    blue: number;
  };
  score: number;
  pixelFraction: number;
}

export interface CloudVisionAnalysisResult {
  success: boolean;
  source: string;
  labels: CloudVisionLabel[];
  localizedObjects: CloudVisionLocalizedObject[];
  webEntities: CloudVisionWebEntity[];
  dominantColors: CloudVisionColorInfo[];
  detectedCrop?: {
    canonicalId: string;
    name: string;
    scientificName: string;
    category: string;
    confidence: number;
    matchedFeature: string;
  };
  rawResponse?: any;
}

// Map Google Cloud Vision Labels & Web Entities to AgriFlow Canonical Products
const VISION_LABEL_MAP: Record<string, string> = {
  // Spices
  'cardamom': 'cardamom',
  'green cardamom': 'cardamom',
  'elettaria': 'cardamom',
  'elettaria cardamomum': 'cardamom',
  'true cardamom': 'cardamom',
  'black cardamom': 'cardamom',
  'spice': 'cardamom',
  'black pepper': 'black-pepper',
  'peppercorn': 'black-pepper',
  'piper nigrum': 'black-pepper',
  'turmeric': 'turmeric',
  'curcuma longa': 'turmeric',
  'ginger': 'ginger',

  // Coffee & Tea
  'coffee': 'coffee',
  'coffee bean': 'coffee',
  'coffea': 'coffee',
  'roasted coffee bean': 'coffee',
  'arabica coffee': 'coffee',
  'robusta coffee': 'coffee',
  'tea': 'tea',
  'tea leaf': 'tea',
  'black tea': 'tea',
  'green tea': 'tea',
  'camellia sinensis': 'tea',

  // Vegetables
  'okra': 'okra',
  'lady finger': 'okra',
  'gumbo': 'okra',
  'abelmoschus esculentus': 'okra',
  'radish': 'radish',
  'daikon': 'radish',
  'raphanus': 'radish',
  'mooli': 'radish',
  'white radish': 'radish',
  'eggplant': 'brinjal',
  'aubergine': 'brinjal',
  'brinjal': 'brinjal',
  'solanum melongena': 'brinjal',
  'tomato': 'tomato',
  'solanum lycopersicum': 'tomato',
  'cucumber': 'cucumber',
  'cucumis sativus': 'cucumber',
  'carrot': 'carrot',
  'daucus carota': 'carrot',
  'potato': 'potato',
  'solanum tuberosum': 'potato',
  'onion': 'onion',
  'allium cepa': 'onion',
  'red onion': 'onion',
  'capsicum': 'capsicum',
  'bell pepper': 'capsicum',
  'chili pepper': 'green-chilli',
  'green bean': 'green-beans',
  'french bean': 'green-beans',
  'cauliflower': 'cauliflower',
  'cabbage': 'cabbage',
  'pumpkin': 'pumpkin',

  // Fruits
  'watermelon': 'watermelon',
  'citrullus lanatus': 'watermelon',
  'mango': 'mango',
  'mangifera indica': 'mango',
  'apple': 'apple',
  'banana': 'banana',
  'papaya': 'papaya',
  'pomegranate': 'pomegranate',

  // Dairy
  'butter': 'butter',
  'ghee': 'ghee',
  'clarified butter': 'ghee',
  'milk': 'milk',
  'dairy product': 'butter',
  'cheese': 'paneer',
  'cottage cheese': 'paneer',

  // Grains & Nuts
  'almond': 'almond',
  'peanut': 'groundnut',
  'groundnut': 'groundnut',
  'wheat': 'wheat',
  'rice': 'rice',
  'chickpea': 'chickpea'
};

/**
 * Parses Google Cloud Vision Annotations and extracts canonical crop match
 */
export function parseCloudVisionResponse(data: any): CloudVisionAnalysisResult {
  const annotation = data?.responses?.[0] || data;
  const labels: CloudVisionLabel[] = (annotation.labelAnnotations || []).map((l: any) => ({
    description: l.description,
    score: l.score || 0,
    topicality: l.topicality || 0
  }));

  const localizedObjects: CloudVisionLocalizedObject[] = (annotation.localizedObjectAnnotations || []).map((o: any) => ({
    name: o.name,
    score: o.score || 0,
    boundingPoly: o.boundingPoly
  }));

  const webEntities: CloudVisionWebEntity[] = (annotation.webDetection?.webEntities || []).map((w: any) => ({
    entityId: w.entityId,
    score: w.score || 0,
    description: w.description || ''
  }));

  const dominantColors: CloudVisionColorInfo[] = (annotation.imagePropertiesAnnotation?.dominantColors?.colors || []).map((c: any) => ({
    color: c.color || { red: 0, green: 0, blue: 0 },
    score: c.score || 0,
    pixelFraction: c.pixelFraction || 0
  }));

  // Identify highest confidence crop match from vision features
  let bestMatch: { canonicalId: string; name: string; scientificName: string; category: string; confidence: number; matchedFeature: string } | undefined;

  // 1. Check Localized Objects first (highest specificity)
  for (const obj of localizedObjects) {
    const key = obj.name.toLowerCase().trim();
    if (VISION_LABEL_MAP[key]) {
      const canonId = VISION_LABEL_MAP[key];
      const resolved = resolveCropAlias(canonId);
      if (resolved) {
        bestMatch = {
          canonicalId: resolved.canonicalId,
          name: resolved.name,
          scientificName: resolved.scientificName,
          category: resolved.category,
          confidence: Math.max(0.92, obj.score),
          matchedFeature: `Object Localization: "${obj.name}" (${(obj.score * 100).toFixed(1)}%)`
        };
        break;
      }
    }
  }

  // 2. Check Web Entities
  if (!bestMatch) {
    for (const web of webEntities) {
      const desc = (web.description || '').toLowerCase().trim();
      for (const [key, canonId] of Object.entries(VISION_LABEL_MAP)) {
        if (desc === key || desc.includes(key)) {
          const resolved = resolveCropAlias(canonId);
          if (resolved) {
            bestMatch = {
              canonicalId: resolved.canonicalId,
              name: resolved.name,
              scientificName: resolved.scientificName,
              category: resolved.category,
              confidence: Math.min(0.96, Math.max(0.85, web.score)),
              matchedFeature: `Google Web Knowledge Entity: "${web.description}"`
            };
            break;
          }
        }
      }
      if (bestMatch) break;
    }
  }

  // 3. Check Labels
  if (!bestMatch) {
    for (const label of labels) {
      const desc = label.description.toLowerCase().trim();
      for (const [key, canonId] of Object.entries(VISION_LABEL_MAP)) {
        if (desc === key || desc.includes(key)) {
          const resolved = resolveCropAlias(canonId);
          if (resolved) {
            bestMatch = {
              canonicalId: resolved.canonicalId,
              name: resolved.name,
              scientificName: resolved.scientificName,
              category: resolved.category,
              confidence: Math.max(0.88, label.score),
              matchedFeature: `Vision Label Annotation: "${label.description}" (${(label.score * 100).toFixed(1)}%)`
            };
            break;
          }
        }
      }
      if (bestMatch) break;
    }
  }

  return {
    success: true,
    source: 'Google Cloud Vision API v1 (Enterprise Multi-Feature)',
    labels,
    localizedObjects,
    webEntities,
    dominantColors,
    detectedCrop: bestMatch,
    rawResponse: data
  };
}

/**
 * Execute direct Google Cloud Vision REST API call
 */
export async function analyzeImageWithCloudVision(
  imageBase64: string,
  apiKey?: string
): Promise<CloudVisionAnalysisResult> {
  const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
  const key = apiKey || (typeof process !== 'undefined' ? process.env?.GOOGLE_CLOUD_VISION_API_KEY || process.env?.GEMINI_API_KEY : '');

  if (!key || key === 'your_cloud_vision_api_key_here') {
    // If running in browser or no key, pass through to server endpoint
    if (typeof window !== 'undefined') {
      const res = await fetch('/api/ai/cloud-vision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: cleanBase64 })
      });
      if (res.ok) {
        const payload = await res.json();
        return payload;
      }
    }
    throw new Error('Google Cloud Vision API Key is not configured.');
  }

  const endpoint = `https://vision.googleapis.com/v1/images:annotate?key=${encodeURIComponent(key)}`;
  const requestBody = {
    requests: [
      {
        image: {
          content: cleanBase64
        },
        features: [
          { type: 'LABEL_DETECTION', maxResults: 15 },
          { type: 'OBJECT_LOCALIZATION', maxResults: 10 },
          { type: 'IMAGE_PROPERTIES', maxResults: 10 },
          { type: 'WEB_DETECTION', maxResults: 10 }
        ]
      }
    ]
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Google Cloud Vision API error (${response.status}): ${errText}`);
  }

  const json = await response.json();
  return parseCloudVisionResponse(json);
}
