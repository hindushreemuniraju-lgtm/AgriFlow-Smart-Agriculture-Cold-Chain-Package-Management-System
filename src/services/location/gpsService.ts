/**
 * GPS & Device Geolocation Service
 */

export interface GpsLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: string;
  source: 'gps' | 'manual' | 'ip';
}

export interface GpsStatus {
  hasPermission: boolean;
  isLocating: boolean;
  error?: string;
}

/**
 * Acquire device geolocation coordinates from browser
 */
export function getCurrentGpsPosition(): Promise<GpsLocation> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: parseFloat(position.coords.latitude.toFixed(4)),
          longitude: parseFloat(position.coords.longitude.toFixed(4)),
          accuracy: Math.round(position.coords.accuracy),
          timestamp: new Date().toISOString(),
          source: 'gps'
        });
      },
      (error) => {
        let msg = 'Location permission denied or unavailable.';
        if (error.code === error.PERMISSION_DENIED) {
          msg = 'Location permission denied. Please enter your location manually.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = 'Location information is currently unavailable.';
        } else if (error.code === error.TIMEOUT) {
          msg = 'Location request timed out.';
        }
        reject(new Error(msg));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  });
}
