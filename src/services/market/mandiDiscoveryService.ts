/**
 * Progressive Mandi Discovery Engine
 * Finds nearby APMC markets with progressive radius expansion (25km -> 50km -> 100km -> 200km -> state).
 */

import { MarketRecord, getMandiRecordsForCrop } from './marketDataService';
import { estimateRoadDistanceKm } from '../location/distanceService';

export interface DiscoveredMandi extends MarketRecord {
  distanceKm: number;
  searchRadiusTier: '25 km' | '50 km' | '100 km' | '200 km' | 'State / National Hub';
}

export interface MandiDiscoveryResult {
  mandis: DiscoveredMandi[];
  activeRadiusKm: number;
  radiusExpansionNote?: string;
  totalFound: number;
}

/**
 * Discover nearby mandis with progressive radius search
 */
export function discoverNearbyMandis(
  farmerLat: number,
  farmerLng: number,
  canonicalCropId: string,
  cropName: string,
  preferredMaxRadiusKm: number = 250,
  category?: string
): MandiDiscoveryResult {
  const cleanId = canonicalCropId.toLowerCase().trim();
  const isSpice = (category?.toLowerCase().includes('spice')) ||
    ['cardamom', 'black-pepper', 'pepper', 'white-pepper', 'green-peppercorn', 'clove', 'cinnamon', 'nutmeg', 'mace'].includes(cleanId);

  const allMandiRecords = getMandiRecordsForCrop(canonicalCropId, cropName, category);

  // Compute road distance to every mandi
  const mandisWithDistance: DiscoveredMandi[] = allMandiRecords.map(mandi => {
    const dist = estimateRoadDistanceKm(farmerLat, farmerLng, mandi.latitude, mandi.longitude);
    let radiusTier: DiscoveredMandi['searchRadiusTier'] = '25 km';
    if (dist <= 25) radiusTier = '25 km';
    else if (dist <= 50) radiusTier = '50 km';
    else if (dist <= 100) radiusTier = '100 km';
    else if (dist <= 200) radiusTier = '200 km';
    else radiusTier = 'State / National Hub';

    return {
      ...mandi,
      distanceKm: dist,
      searchRadiusTier: radiusTier
    };
  });

  // Sort ascending by distance
  mandisWithDistance.sort((a, b) => a.distanceKm - b.distanceKm);

  // For Spices: Route directly to dedicated Spices Board / Terminal auction hubs
  if (isSpice) {
    const matchedMandis = mandisWithDistance.slice(0, 6);
    const closestDist = matchedMandis[0]?.distanceKm || 0;
    
    // Prominent official notice if local perishable APMCs lack direct trading volume
    const expansionNote = closestDist > 75 
      ? `No active APMC trading volume in local radius for ${cropName}. Displaying benchmark terminal auction markets.`
      : `Trading via authorized Spices Board / Terminal auction center (${closestDist} km).`;

    return {
      mandis: matchedMandis,
      activeRadiusKm: Math.max(preferredMaxRadiusKm, closestDist),
      radiusExpansionNote: expansionNote,
      totalFound: matchedMandis.length
    };
  }

  // Progressive radius filter for general produce
  const tiers = [25, 50, 100, 200, preferredMaxRadiusKm, 2000];
  let activeRadius = 25;
  let matchedMandis: DiscoveredMandi[] = [];
  let expansionNote: string | undefined = undefined;

  for (const r of tiers) {
    const subset = mandisWithDistance.filter(m => m.distanceKm <= r);
    if (subset.length >= 3 || r >= preferredMaxRadiusKm) {
      activeRadius = r;
      matchedMandis = subset.slice(0, 6);
      if (r > 25) {
        expansionNote = `No sufficient mandi auctions found within 25 km. Expanded search radius to ${r} km to include ${matchedMandis.length} verified APMC markets.`;
      }
      break;
    }
  }

  if (matchedMandis.length === 0) {
    matchedMandis = mandisWithDistance.slice(0, 4);
    expansionNote = `Expanded to state-wide trading hubs (${matchedMandis[0]?.distanceKm} km away).`;
  }

  return {
    mandis: matchedMandis,
    activeRadiusKm: activeRadius,
    radiusExpansionNote: expansionNote,
    totalFound: matchedMandis.length
  };
}
