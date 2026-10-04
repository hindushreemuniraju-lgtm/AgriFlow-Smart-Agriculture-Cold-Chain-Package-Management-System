/**
 * Smart Storage Protocol & Shelf-Life Engine
 * Separate engine customized strictly per crop. Never confuses onion, potato, tomato, or mango protocols.
 */

export interface StorageProtocol {
  cropId: string;
  cropName: string;
  storageMethod: string;
  optimalTemperature: string;
  optimalHumidity: string;
  coldStorageRequired: boolean;
  shelfLifeAmbientDays: number;
  shelfLifeColdDays: number;
  curingRequired: boolean;
  curingDirective?: string;
  preservationRules: string[];
  spoilageIndicators: string[];
  keyRiskFactor: string;
}

export function getStorageProtocol(cropId: string, cropName: string): StorageProtocol {
  const cleanId = (cropId || '').toLowerCase();

  if (cleanId === 'onion' || cleanId === 'garlic') {
    return {
      cropId: cleanId,
      cropName,
      storageMethod: 'Low-cost bamboo ventilated chawl or cold chamber with continuous bottom-to-top air velocity',
      optimalTemperature: '0°C - 2°C (Cold Storage) or 25°C - 30°C (Ventilated Chawl)',
      optimalHumidity: '65% - 70% RH (Must avoid humidity >75% to prevent sprouting)',
      coldStorageRequired: false,
      shelfLifeAmbientDays: 120,
      shelfLifeColdDays: 240,
      curingRequired: true,
      curingDirective: 'Shade cure for 10-14 days until neck is fully dried and paper-thin (<12% moisture).',
      preservationRules: [
        'Complete 100% neck curing before long-term stacking.',
        'Never store in sealed plastic containers.',
        'Maintain continuous bottom-up air circulation.'
      ],
      spoilageIndicators: ['Sprouting from apical neck', 'Black powdery mold (Aspergillus niger)', 'Watery basal rot'],
      keyRiskFactor: 'High humidity (>75%) triggers instantaneous root emergence and neck rot fungus.'
    };
  }

  if (cleanId === 'potato') {
    return {
      cropId: cleanId,
      cropName,
      storageMethod: 'Dark, well-aerated wooden bin or temperature-controlled cold chamber (with CIPC sprout inhibitor)',
      optimalTemperature: '8°C - 10°C (Processing) / 3°C - 4°C (Seed stock)',
      optimalHumidity: '90% - 95% RH',
      coldStorageRequired: false,
      shelfLifeAmbientDays: 45,
      shelfLifeColdDays: 240,
      curingRequired: true,
      curingDirective: 'Hold at 15°C with 90% RH for 10-12 days post-dehaulming to thicken skin.',
      preservationRules: [
        'Keep in 100% dark space to prevent toxic solanine alkaloid greening.',
        'Ensure adequate ventilation to dissipate carbon dioxide respiration.'
      ],
      spoilageIndicators: ['Green coloration on skin', 'Sprouting eyes', 'Soft bacterial rot'],
      keyRiskFactor: 'Exposure to light causes greening and bitter, toxic solanine buildup.'
    };
  }

  if (cleanId === 'tomato') {
    return {
      cropId: cleanId,
      cropName,
      storageMethod: 'Single-tier ventilated crates in cooled chamber; never drop below 10°C to prevent chilling injury',
      optimalTemperature: '12°C - 15°C (DO NOT store below 10°C)',
      optimalHumidity: '85% - 90% RH',
      coldStorageRequired: true,
      shelfLifeAmbientDays: 6,
      shelfLifeColdDays: 20,
      curingRequired: false,
      preservationRules: [
        'Pre-cool to 13°C within 3 hours of picking.',
        'Store stem-end down to preserve pericarp pressure.'
      ],
      spoilageIndicators: ['Watery shoulder depressions', 'Sunken circular lesions', 'Skin wrinkling'],
      keyRiskFactor: 'Temperatures below 10°C permanently destroy flavor enzymes and induce chilling injury.'
    };
  }

  if (cleanId === 'mango') {
    return {
      cropId: cleanId,
      cropName,
      storageMethod: 'Cushioned single-layer foam trays in reefer chamber with ethylene scrubbers',
      optimalTemperature: '12°C - 13°C',
      optimalHumidity: '85% - 90% RH',
      coldStorageRequired: true,
      shelfLifeAmbientDays: 7,
      shelfLifeColdDays: 25,
      curingRequired: false,
      preservationRules: [
        'De-sap on inverted racks for 4 hours post-harvest.',
        'Include KMnO4 or 1-MCP strips to delay climacteric softening.'
      ],
      spoilageIndicators: ['Black anthracnose spots', 'Spongy tissue breakdown', 'Skin pitting'],
      keyRiskFactor: 'Temperatures below 10°C cause grey skin discoloration and failed ripening.'
    };
  }

  if (cleanId === 'rice' || cleanId === 'wheat' || cleanId === 'grain') {
    return {
      cropId: cleanId,
      cropName,
      storageMethod: 'Hermetic dry silos or elevated pallets in moisture-proof godowns',
      optimalTemperature: 'Ambient Dry (18°C - 25°C)',
      optimalHumidity: '50% - 60% RH (Grain moisture must remain strictly below 12.5%)',
      coldStorageRequired: false,
      shelfLifeAmbientDays: 540,
      shelfLifeColdDays: 1080,
      curingRequired: false,
      preservationRules: [
        'Confirm grain moisture is <12.5% before bagging.',
        'Keep bags 15 cm off the floor on wooden pallets.'
      ],
      spoilageIndicators: ['Musty mold odor', 'Live weevil activity', 'Grain clumping'],
      keyRiskFactor: 'Moisture above 14% triggers rapid heating, weevils, and aflatoxin fungus.'
    };
  }

  // Default Standard Horticultural Storage
  return {
    cropId: cleanId,
    cropName,
    storageMethod: 'Ventilated crates in shaded cool room or chilled storage chamber',
    optimalTemperature: '10°C - 14°C',
    optimalHumidity: '85% - 90% RH',
    coldStorageRequired: true,
    shelfLifeAmbientDays: 7,
    shelfLifeColdDays: 21,
    curingRequired: false,
    preservationRules: [
      'Pre-cool produce within 3 hours of harvest.',
      'Maintain continuous ventilation to prevent condensate pooling.'
    ],
    spoilageIndicators: ['Soft watery spots', 'Wrinkling', 'Fungal mold'],
    keyRiskFactor: 'Temperature spikes accelerate cellular respiration and rapid softening.'
  };
}
