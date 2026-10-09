/**
 * Agriculture & Post-Harvest Weather Risk & Emergency Alert Engine
 * Combines GPS Coordinates + Weather Telemetry + Commodity Characteristics
 * Evaluates Post-Harvest Risks: Heavy Rain, Extreme Heat, High Humidity, Storm Winds.
 * Dispatches: In-App Emergency Red Banners, Web Audio Alarm, Vibration, and Browser Push Notifications.
 */

import { WeatherTelemetry } from './weatherService';

export type AlertLevel = 'NORMAL' | 'WARNING' | 'EMERGENCY';

export interface PostHarvestAlert {
  level: AlertLevel;
  title: string;
  crop: string;
  risk: string;
  recommendedAction: string;
  evidence: string[];
  urgency: string;
  detectedAt: string;
  locationName: string;
}

/**
 * Synthesize alert tone using Web Audio API (Zero external media asset dependencies)
 */
export function playEmergencyAlarmTone() {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    // Two warning pulses: 880Hz (A5) -> 440Hz (A4)
    [0, 0.25].forEach((offset) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, now + offset);
      osc.frequency.exponentialRampToValueAtTime(440, now + offset + 0.18);

      gain.gain.setValueAtTime(0.15, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.01, now + offset + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + offset);
      osc.stop(now + offset + 0.22);
    });
  } catch (err) {
    console.warn('[Audio Alert Synth] AudioContext playback skipped:', err);
  }
}

/**
 * Trigger device haptic vibration where supported
 */
export function triggerDeviceVibration() {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate([200, 100, 200, 100, 400]);
    } catch {
      // ignore
    }
  }
}

/**
 * Request browser push notification permission
 */
export async function requestBrowserNotificationPermission(): Promise<'granted' | 'denied' | 'unsupported'> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }
  try {
    const perm = await Notification.requestPermission();
    return perm === 'granted' ? 'granted' : 'denied';
  } catch {
    return 'unsupported';
  }
}

/**
 * Dispatch system push notification if permission granted
 */
export function dispatchBrowserNotification(title: string, body: string) {
  if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(title, {
        body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: 'agriflow-emergency'
      });
    } catch {
      // ignore
    }
  }
}

/**
 * Evaluate Post-Harvest Weather Risks
 */
export function evaluatePostHarvestRisk(
  weather: WeatherTelemetry | null,
  commodityName: string,
  locationName: string = 'Your Location'
): PostHarvestAlert {
  const now = new Date().toISOString();
  const crop = (commodityName || 'Tomato').trim();
  const lowerCrop = crop.toLowerCase();

  if (!weather) {
    return {
      level: 'NORMAL',
      title: 'Agro-Climate Normal',
      crop,
      risk: 'None detected',
      recommendedAction: 'Standard harvesting and storage protocol applies.',
      evidence: ['Telemetry pending GPS sync'],
      urgency: 'Low',
      detectedAt: now,
      locationName
    };
  }

  const { temperatureC, humidityPercent, rainProbabilityPercent, rainfallMm, windSpeedKmph } = weather;

  // High moisture-sensitive commodities
  const isMoistureSensitive = 
    lowerCrop.includes('tomato') || 
    lowerCrop.includes('onion') || 
    lowerCrop.includes('beetroot') || 
    lowerCrop.includes('potato') || 
    lowerCrop.includes('strawberry') || 
    lowerCrop.includes('spinach') || 
    lowerCrop.includes('grapes') || 
    lowerCrop.includes('pulses') ||
    lowerCrop.includes('wheat') ||
    lowerCrop.includes('chickpea');

  // Perishable fresh commodities sensitive to heat spike
  const isHeatSensitive = 
    lowerCrop.includes('tomato') || 
    lowerCrop.includes('milk') || 
    lowerCrop.includes('paneer') || 
    lowerCrop.includes('curd') || 
    lowerCrop.includes('mango') || 
    lowerCrop.includes('apple') || 
    lowerCrop.includes('banana') || 
    lowerCrop.includes('okra');

  // 1. EMERGENCY LEVEL: Severe Rain Ingress Threat
  if ((rainfallMm >= 5.0 || rainProbabilityPercent >= 70) && isMoistureSensitive) {
    return {
      level: 'EMERGENCY',
      title: '🔴 EMERGENCY ALERT: Heavy Rainfall Spoilage Threat',
      crop,
      risk: `Severe post-harvest water ingress & fungal rots. Produce exposed to high moisture will suffer skin splitting, soft rot, and rapid bacterial deterioration.`,
      recommendedAction: `Move harvested produce to protected, covered, elevated storage immediately. Suspend open-field sun curing and apply water-resistant liners to transit crates.`,
      evidence: [
        `Precipitation probability: ${rainProbabilityPercent}%`,
        `Observed rainfall: ${rainfallMm} mm`,
        `High moisture vulnerability of ${crop}`
      ],
      urgency: 'Immediate (Within 1 Hour)',
      detectedAt: now,
      locationName
    };
  }

  // 2. EMERGENCY LEVEL: Extreme Heatwave Spike
  if (temperatureC >= 38.0 && isHeatSensitive) {
    return {
      level: 'EMERGENCY',
      title: '🔴 EMERGENCY ALERT: Extreme Heatwave Pulp Respiration Spike',
      crop,
      risk: `Extreme heat (${temperatureC}°C) triggers exponential transpirational moisture loss, accelerated senescence, and rapid pulp softening. Dairy items risk bacterial souring.`,
      recommendedAction: `Harvest strictly before 07:30 AM. Move produce to shaded pre-cooling cold storage (2°C - 8°C) or insulated reefer containers immediately.`,
      evidence: [
        `Ambient temperature: ${temperatureC}°C (Above safe threshold)`,
        `Relative humidity: ${humidityPercent}%`,
        `Accelerated pulp respiration vulnerability of ${crop}`
      ],
      urgency: 'Immediate (Within 2 Hours)',
      detectedAt: now,
      locationName
    };
  }

  // 3. WARNING LEVEL: Elevated Humidity
  if (humidityPercent >= 85 && (lowerCrop.includes('onion') || lowerCrop.includes('grain') || lowerCrop.includes('almond') || lowerCrop.includes('potato') || lowerCrop.includes('dry fruit'))) {
    return {
      level: 'WARNING',
      title: '⚠️ WARNING: High Relative Humidity Mold Risk',
      crop,
      risk: `Elevated atmospheric humidity (${humidityPercent}% RH) creates microclimate for black mold (Aspergillus niger) and premature subterranean sprouting.`,
      recommendedAction: `Ensure forced-air ventilation in godowns/storage sheds. Keep cartons/crates elevated on wooden pallets minimum 15 cm off damp floors.`,
      evidence: [
        `Relative humidity: ${humidityPercent}% RH`,
        `Storage vulnerability for ${crop}`
      ],
      urgency: 'Action within 6-12 Hours',
      detectedAt: now,
      locationName
    };
  }

  // 4. WARNING LEVEL: High Winds / Transit Danger
  if (windSpeedKmph >= 40.0) {
    return {
      level: 'WARNING',
      title: '⚠️ WARNING: High Wind Transit & Shed Alert',
      crop,
      risk: `Strong winds (${windSpeedKmph} km/h) can dislodge transit tarpaulins and compromise temporary sorting shed canvas barriers.`,
      recommendedAction: `Fasten double-tie cargo nets on transport trucks. Secure temporary field packing canopies.`,
      evidence: [
        `Wind gusts: ${windSpeedKmph} km/h`
      ],
      urgency: 'Caution during loading/transit',
      detectedAt: now,
      locationName
    };
  }

  // 5. NORMAL LEVEL: Favorable Agro-Climate
  return {
    level: 'NORMAL',
    title: '🟢 Optimal Post-Harvest Conditions',
    crop,
    risk: 'No immediate atmospheric hazards detected',
    recommendedAction: `Standard grading, sorting, and packaging protocols suitable for current weather (${temperatureC}°C, ${humidityPercent}% RH).`,
    evidence: [
      `Temperature: ${temperatureC}°C`,
      `Humidity: ${humidityPercent}% RH`,
      `Rain probability: ${rainProbabilityPercent}%`
    ],
    urgency: 'Normal Workflow',
    detectedAt: now,
    locationName
  };
}
