/**
 * Reverse Geocoding & Manual Location Resolution Service
 */

export interface GeocodedAddress {
  formattedAddress: string;
  city: string;
  district: string;
  state: string;
  pincode?: string;
  country: string;
  latitude: number;
  longitude: number;
  source: 'osm' | 'offline-directory' | 'manual-input';
}

// Built-in directory of major agricultural production clusters across India
export const INDIAN_AGRI_DISTRICTS: Record<string, { city: string; district: string; state: string; lat: number; lng: number }> = {
  'nashik': { city: 'Nashik', district: 'Nashik', state: 'Maharashtra', lat: 19.9975, lng: 73.7898 },
  'tumakuru': { city: 'Tumakuru', district: 'Tumakuru', state: 'Karnataka', lat: 13.3379, lng: 77.1173 },
  'tumkur': { city: 'Tumakuru', district: 'Tumakuru', state: 'Karnataka', lat: 13.3379, lng: 77.1173 },
  'pune': { city: 'Pune', district: 'Pune', state: 'Maharashtra', lat: 18.5204, lng: 73.8567 },
  'kolar': { city: 'Kolar', district: 'Kolar', state: 'Karnataka', lat: 13.1367, lng: 78.1291 },
  'mandya': { city: 'Mandya', district: 'Mandya', state: 'Karnataka', lat: 12.5218, lng: 76.8951 },
  'belagavi': { city: 'Belagavi', district: 'Belagavi', state: 'Karnataka', lat: 15.8497, lng: 74.4977 },
  'bengaluru': { city: 'Bengaluru', district: 'Bengaluru Urban', state: 'Karnataka', lat: 12.9716, lng: 77.5946 },
  'mumbai': { city: 'Navi Mumbai', district: 'Thane', state: 'Maharashtra', lat: 19.0330, lng: 73.0297 },
  'nagpur': { city: 'Nagpur', district: 'Nagpur', state: 'Maharashtra', lat: 21.1458, lng: 79.0882 },
  'guntur': { city: 'Guntur', district: 'Guntur', state: 'Andhra Pradesh', lat: 16.3067, lng: 80.4365 },
  'idukki': { city: 'Thodupuzha', district: 'Idukki', state: 'Kerala', lat: 9.8967, lng: 76.7119 },
  'agra': { city: 'Agra', district: 'Agra', state: 'Uttar Pradesh', lat: 27.1767, lng: 78.0081 },
  'jaipur': { city: 'Jaipur', district: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lng: 75.7873 },
  'delhi': { city: 'Azadpur', district: 'North Delhi', state: 'Delhi', lat: 28.7041, lng: 77.1025 },
  'varanasi': { city: 'Varanasi', district: 'Varanasi', state: 'Uttar Pradesh', lat: 25.3176, lng: 82.9739 },
  'karnal': { city: 'Karnal', district: 'Karnal', state: 'Haryana', lat: 29.6857, lng: 76.9905 },
  'salem': { city: 'Salem', district: 'Salem', state: 'Tamil Nadu', lat: 11.6643, lng: 78.1460 },
  'shimla': { city: 'Shimla', district: 'Shimla', state: 'Himachal Pradesh', lat: 31.1048, lng: 77.1734 },
  'hyderabad': { city: 'Hyderabad', district: 'Rangareddy', state: 'Telangana', lat: 17.3850, lng: 78.4867 },
  'chennai': { city: 'Koyambedu', district: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707 }
};

/**
 * Reverse geocode latitude and longitude to administrative district
 */
export async function reverseGeocodeLocation(lat: number, lng: number): Promise<GeocodedAddress> {
  // 1. Try OpenStreetMap Nominatim with a fast timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'AgriFlow-SmartAgri/2.0' },
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const addr = data.address || {};
      const district = addr.county || addr.state_district || addr.district || addr.city || 'Regional District';
      const city = addr.city || addr.town || addr.village || addr.suburb || district;
      const state = addr.state || 'Agricultural Belt';
      const pincode = addr.postcode;

      return {
        formattedAddress: `${city}, ${district}, ${state}`,
        city,
        district,
        state,
        pincode,
        country: addr.country || 'India',
        latitude: lat,
        longitude: lng,
        source: 'osm'
      };
    }
  } catch {
    // Fallback to closest offline district
  }

  // 2. Offline nearest neighbor lookup
  let closestKey = 'nashik';
  let minDistance = Infinity;

  for (const [key, d] of Object.entries(INDIAN_AGRI_DISTRICTS)) {
    const dist = Math.hypot(lat - d.lat, lng - d.lng);
    if (dist < minDistance) {
      minDistance = dist;
      closestKey = key;
    }
  }

  const match = INDIAN_AGRI_DISTRICTS[closestKey];
  return {
    formattedAddress: `${match.city}, ${match.district}, ${match.state}`,
    city: match.city,
    district: match.district,
    state: match.state,
    country: 'India',
    latitude: lat,
    longitude: lng,
    source: 'offline-directory'
  };
}

/**
 * Resolve manual text location input (e.g. "Tumakuru", "Nashik", "Kolar", "Agra", "560001")
 */
export async function resolveManualLocation(input: string): Promise<GeocodedAddress> {
  const clean = input.toLowerCase().trim();

  // Check in built-in district database
  for (const [key, d] of Object.entries(INDIAN_AGRI_DISTRICTS)) {
    if (clean.includes(key) || key.includes(clean)) {
      return {
        formattedAddress: `${d.city}, ${d.district}, ${d.state}`,
        city: d.city,
        district: d.district,
        state: d.state,
        country: 'India',
        latitude: d.lat,
        longitude: d.lng,
        source: 'offline-directory'
      };
    }
  }

  // Try OSM Geocoding
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}&countrycodes=in&limit=1`;
    const res = await fetch(url, { headers: { 'User-Agent': 'AgriFlow-SmartAgri/2.0' } });
    if (res.ok) {
      const results = await res.json();
      if (results && results.length > 0) {
        const item = results[0];
        const lat = parseFloat(item.lat);
        const lon = parseFloat(item.lon);
        return reverseGeocodeLocation(lat, lon);
      }
    }
  } catch {
    // Fallback
  }

  // Safe fallback default (Nashik Cluster)
  const fallback = INDIAN_AGRI_DISTRICTS['nashik'];
  return {
    formattedAddress: input.includes(',') ? input : `${input}, Nashik District, Maharashtra`,
    city: input,
    district: 'Agricultural Cluster',
    state: 'Maharashtra',
    country: 'India',
    latitude: fallback.lat,
    longitude: fallback.lng,
    source: 'manual-input'
  };
}
