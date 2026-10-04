// Safe dynamic product image resolver and SVG illustration catalog

export interface ProductVisual {
  svgPath: string;
  gradient: [string, string];
  accentColor: string;
  emoji: string;
  alt: string;
}

// Built-in high fidelity SVG icon templates and palettes for all product categories
export const PRODUCT_IMAGE_REGISTRY: Record<string, {
  emoji: string;
  gradient: [string, string];
  accentColor: string;
  iconPath: string;
  alt: string;
}> = {
  // VEGETABLES
  'onion': {
    emoji: '🧅',
    gradient: ['#7c2d12', '#c2410c'],
    accentColor: '#fb923c',
    iconPath: 'M12 2C7.5 2 4 6 4 11c0 4.5 3.5 8.5 8 9 4.5-.5 8-4.5 8-9 0-5-3.5-9-8-9zm0 3c3 0 5 3 5 6s-2 6-5 6-5-3-5-6 2-6 5-6z',
    alt: 'Fresh Red Nasik Onion'
  },
  'potato': {
    emoji: '🥔',
    gradient: ['#78350f', '#b45309'],
    accentColor: '#f59e0b',
    iconPath: 'M6 8c-2 4-1 9 3 11 4 2 9 1 11-3 2-4 1-9-3-11-4-2-9-1-11 3z',
    alt: 'Fresh Harvest Potato'
  },
  'tomato': {
    emoji: '🍅',
    gradient: ['#991b1b', '#ef4444'],
    accentColor: '#f87171',
    iconPath: 'M12 3c-4.5 0-8 3.5-8 8 0 4.5 3.5 8 8 8s8-3.5 8-8c0-4.5-3.5-8-8-8zm0 2c1 1 2 2 3 2m-3-2c-1 1-2 2-3 2',
    alt: 'Ripe Organic Tomato'
  },
  'carrot': {
    emoji: '🥕',
    gradient: ['#9a3412', '#ea580c'],
    accentColor: '#fdba74',
    iconPath: 'M5 19L19 5l-2-2L3 17l2 2z',
    alt: 'Fresh Crisp Orange Carrot'
  },
  'beetroot': {
    emoji: '🪵',
    gradient: ['#701a75', '#a21caf'],
    accentColor: '#e879f9',
    iconPath: 'M12 4C7 4 4 8 4 13c0 4.5 3.5 8 8 8s8-3.5 8-8c0-5-3-9-8-9z',
    alt: 'Fresh Ruby Beetroot'
  },
  'radish': {
    emoji: '🌱',
    gradient: ['#3f3f46', '#e4e4e7'],
    accentColor: '#a1a1aa',
    iconPath: 'M12 2C8 2 5 7 5 12c0 5 3 9 7 9s7-4 7-9c0-5-3-10-7-10z',
    alt: 'Crisp White Radish (Mooli)'
  },
  'cabbage': {
    emoji: '🥬',
    gradient: ['#14532d', '#22c55e'],
    accentColor: '#86efac',
    iconPath: 'M12 3C7 3 3 7 3 12c0 5 4 9 9 9s9-4 9-9c0-5-4-9-9-9z',
    alt: 'Fresh Green Cabbage'
  },
  'cauliflower': {
    emoji: '🥦',
    gradient: ['#365314', '#84cc16'],
    accentColor: '#bef264',
    iconPath: 'M12 4a5 5 0 00-5 5 5 5 0 00-2 4 5 5 0 005 5h8a5 5 0 005-5 5 5 0 00-2-4 5 5 0 00-5-5z',
    alt: 'Crisp White Cauliflower'
  },
  'broccoli': {
    emoji: '🥦',
    gradient: ['#064e3b', '#10b981'],
    accentColor: '#6ee7b7',
    iconPath: 'M12 3a4 4 0 00-4 4 4 4 0 00-2 4 4 4 0 004 4h4a4 4 0 004-4 4 4 0 00-2-4 4 4 0 00-4-4zm-1 12h2v6h-2z',
    alt: 'Fresh Green Broccoli Florets'
  },
  'spinach': {
    emoji: '🌿',
    gradient: ['#065f46', '#059669'],
    accentColor: '#34d399',
    iconPath: 'M12 3C7.5 3 4 7 4 12c0 5 4 8 8 8 2 0 4-1 5-3L12 3z',
    alt: 'Fresh Tender Green Spinach'
  },
  'drumstick': {
    emoji: '🥢',
    gradient: ['#166534', '#15803d'],
    accentColor: '#4ade80',
    iconPath: 'M4 20L20 4M6 22L22 6',
    alt: 'Fresh Organic Drumstick (Moringa)'
  },
  'brinjal': {
    emoji: '🍆',
    gradient: ['#581c87', '#9333ea'],
    accentColor: '#c084fc',
    iconPath: 'M12 4c-3 0-6 4-6 9 0 4.5 2.5 8 6 8s6-3.5 6-8c0-5-3-9-6-9z',
    alt: 'Fresh Glossy Eggplant (Brinjal)'
  },
  'okra': {
    emoji: '🥒',
    gradient: ['#14532d', '#16a34a'],
    accentColor: '#86efac',
    iconPath: 'M5 19l14-14-3-3L2 16l3 3z',
    alt: 'Tender Green Okra (Lady Finger)'
  },
  'capsicum': {
    emoji: '🫑',
    gradient: ['#14532d', '#22c55e'],
    accentColor: '#4ade80',
    iconPath: 'M12 4c-4 0-7 3-7 8 0 4 3 8 7 8s7-4 7-8c0-5-3-8-7-8z',
    alt: 'Crisp Bell Pepper Capsicum'
  },
  'cucumber': {
    emoji: '🥒',
    gradient: ['#064e3b', '#10b981'],
    accentColor: '#6ee7b7',
    iconPath: 'M5 19C3 17 3 13 6 10l8-8c3-3 7-3 9 0s3 7 0 9l-8 8c-3 3-7 3-10 0z',
    alt: 'Hydrating Green Cucumber'
  },
  'garlic': {
    emoji: '🧄',
    gradient: ['#52525b', '#a1a1aa'],
    accentColor: '#e4e4e7',
    iconPath: 'M12 3C8 3 5 7 5 12c0 4 3 7 7 8 4-1 7-4 7-8 0-5-3-9-7-9z',
    alt: 'Aromatic Cured Garlic'
  },
  'ginger': {
    emoji: '🫚',
    gradient: ['#78350f', '#d97706'],
    accentColor: '#fcd34d',
    iconPath: 'M6 8c-2 3-1 7 2 9 3 2 7 1 9-2 2-3 1-7-2-9-3-2-7-1-9 2z',
    alt: 'Fresh Spicy Ginger Root'
  },
  'sweet potato': {
    emoji: '🍠',
    gradient: ['#831843', '#be185d'],
    accentColor: '#f472b6',
    iconPath: 'M4 18C2 15 3 10 7 7l10-4c4 1 5 6 3 9l-7 7c-3 2-6 2-9-1z',
    alt: 'Nutrient-Dense Sweet Potato'
  },

  // GRAINS & CEREALS
  'rice': {
    emoji: '🌾',
    gradient: ['#854d0e', '#ca8a04'],
    accentColor: '#fef08a',
    iconPath: 'M12 2v20M8 5c2 2 2 5 0 7m8-7c-2 2-2 5 0 7M8 13c2 2 2 5 0 7m8-7c-2 2-2 5 0 7',
    alt: 'Golden Paddy Rice / Basmati Grain'
  },
  'wheat': {
    emoji: '🌾',
    gradient: ['#92400e', '#d97706'],
    accentColor: '#fde68a',
    iconPath: 'M12 2v20M9 6c2 1 2 3 0 5m6-5c-2 1-2 3 0 5M9 12c2 1 2 3 0 5m6-5c-2 1-2 3 0 5',
    alt: 'Golden Sharbati Wheat'
  },
  'maize': {
    emoji: '🌽',
    gradient: ['#a16207', '#eab308'],
    accentColor: '#fef08a',
    iconPath: 'M12 2C9 2 7 5 7 9c0 6 3 11 5 13 2-2 5-7 5-13 0-4-2-7-5-7z',
    alt: 'Sun-Ripened Golden Maize Corn'
  },
  'ragi': {
    emoji: '🌾',
    gradient: ['#450a0a', '#991b1b'],
    accentColor: '#fca5a5',
    iconPath: 'M12 3v18M7 7c3 2 3 5 0 7m10-7c-3 2-3 5 0 7',
    alt: 'Nutritious Finger Millet (Ragi)'
  },
  'barley': {
    emoji: '🌾',
    gradient: ['#713f12', '#ca8a04'],
    accentColor: '#fef08a',
    iconPath: 'M12 2v20M8 7c3 1 3 3 0 5m8-5c-3 1-3 3 0 5',
    alt: 'High-Fiber Malting Barley'
  },
  'oats': {
    emoji: '🥣',
    gradient: ['#78350f', '#b45309'],
    accentColor: '#fde68a',
    iconPath: 'M12 4v16M8 8c2 2 2 4 0 6m8-6c-2 2-2 4 0 6',
    alt: 'Whole Grain Rolled Oats'
  },

  // PULSES & LEGUMES
  'chickpea': {
    emoji: '🫘',
    gradient: ['#854d0e', '#d97706'],
    accentColor: '#fde68a',
    iconPath: 'M12 4c-4 0-7 3-7 7 0 4 3 8 7 8s7-4 7-8c0-4-3-7-7-7z',
    alt: 'Desi Bengal Chickpea (Chana)'
  },
  'green gram': {
    emoji: '🫘',
    gradient: ['#14532d', '#16a34a'],
    accentColor: '#86efac',
    iconPath: 'M12 5c-3 0-6 3-6 7 0 3 3 6 6 6s6-3 6-6c0-4-3-7-6-7z',
    alt: 'Protein-Rich Green Gram (Moong)'
  },
  'black gram': {
    emoji: '🫘',
    gradient: ['#18181b', '#3f3f46'],
    accentColor: '#a1a1aa',
    iconPath: 'M12 5c-3 0-6 3-6 7 0 3 3 6 6 6s6-3 6-6c0-4-3-7-6-7z',
    alt: 'Whole Black Gram (Urad Dal)'
  },
  'red gram': {
    emoji: '🫘',
    gradient: ['#9a3412', '#ea580c'],
    accentColor: '#fed7aa',
    iconPath: 'M12 5c-3 0-6 3-6 7 0 3 3 6 6 6s6-3 6-6c0-4-3-7-6-7z',
    alt: 'Pigeon Pea Red Gram (Toor Dal)'
  },
  'soybean': {
    emoji: '🫘',
    gradient: ['#713f12', '#a16207'],
    accentColor: '#fef08a',
    iconPath: 'M12 5c-3 0-6 3-6 7 0 3 3 6 6 6s6-3 6-6c0-4-3-7-6-7z',
    alt: 'High-Protein Golden Soybean'
  },
  'groundnut': {
    emoji: '🥜',
    gradient: ['#78350f', '#d97706'],
    accentColor: '#fcd34d',
    iconPath: 'M8 6c-2 2-2 6 0 8 2 2 5 2 7 0s2-6 0-8c-2-2-5-2-7 0z',
    alt: 'Crunchy Groundnut / Peanut'
  },

  // FRUITS
  'mango': {
    emoji: '🥭',
    gradient: ['#9a3412', '#f59e0b'],
    accentColor: '#fde047',
    iconPath: 'M12 3C7 3 4 7 4 13c0 5 4 8 8 8 3 0 6-2 7-5 1-4-1-8-4-11-1-2-2-3-3-4-1 0-1 0-2 2z',
    alt: 'Alphonso Ratnagiri Mango'
  },
  'apple': {
    emoji: '🍎',
    gradient: ['#881337', '#e11d48'],
    accentColor: '#fb7185',
    iconPath: 'M12 4C9 4 6 6 6 11c0 5 3 9 6 9s6-4 6-9c0-5-3-7-6-7zm0-2c1 1 1 2 0 3',
    alt: 'Crisp Shimla Royal Apple'
  },
  'banana': {
    emoji: '🍌',
    gradient: ['#854d0e', '#eab308'],
    accentColor: '#fef08a',
    iconPath: 'M5 19C10 20 16 16 19 8c1-3 0-5-2-5-2 0-4 1-5 3-3 4-5 8-12 13z',
    alt: 'Fresh Robusta Golden Banana'
  },
  'orange': {
    emoji: '🍊',
    gradient: ['#9a3412', '#ea580c'],
    accentColor: '#fdba74',
    iconPath: 'M12 3C7 3 3 7 3 12c0 5 4 9 9 9s9-4 9-9c0-5-4-9-9-9z',
    alt: 'Juicy Nagpur Orange'
  },
  'grapes': {
    emoji: '🍇',
    gradient: ['#581c87', '#7c3aed'],
    accentColor: '#c4b5fd',
    iconPath: 'M12 4c-1 0-2 1-2 2 0 1 1 2 2 2s2-1 2-2c0-1-1-2-2-2zm-3 4c-1 0-2 1-2 2s1 2 2 2 2-1 2-2-1-2-2-2zm6 0c-1 0-2 1-2 2s1 2 2 2 2-1 2-2-1-2-2-2zm-3 4c-1 0-2 1-2 2s1 2 2 2 2-1 2-2-1-2-2-2z',
    alt: 'Sweet Thompson Seedless Grapes'
  },
  'pomegranate': {
    emoji: '🫐',
    gradient: ['#831843', '#be185d'],
    accentColor: '#f472b6',
    iconPath: 'M12 3c-4.5 0-8 3.5-8 8 0 4.5 3.5 8 8 8s8-3.5 8-8c0-4.5-3.5-8-8-8z',
    alt: 'Ruby Red Bhagwa Pomegranate'
  },
  'papaya': {
    emoji: '🍈',
    gradient: ['#9a3412', '#f97316'],
    accentColor: '#fdba74',
    iconPath: 'M12 3C8 3 5 7 5 13c0 5 3 8 7 8s7-3 7-8c0-6-3-10-7-10z',
    alt: 'Sweet Red Lady Papaya'
  },
  'guava': {
    emoji: '🍈',
    gradient: ['#14532d', '#22c55e'],
    accentColor: '#86efac',
    iconPath: 'M12 4C7.5 4 4 7.5 4 12c0 4.5 3.5 8 8 8s8-3.5 8-8c0-4.5-3.5-8-8-8z',
    alt: 'Crisp Allahabad Safeda Guava'
  },
  'strawberry': {
    emoji: '🍓',
    gradient: ['#9f1239', '#e11d48'],
    accentColor: '#fb7185',
    iconPath: 'M12 4C8 4 5 8 5 12c0 4 3 7 7 9 4-2 7-5 7-9 0-4-3-8-7-8z',
    alt: 'Sweet Mahabaleshwar Strawberry'
  },
  'coconut': {
    emoji: '🥥',
    gradient: ['#451a03', '#78350f'],
    accentColor: '#d97706',
    iconPath: 'M12 3C7 3 3 7 3 12c0 5 4 9 9 9s9-4 9-9c0-5-4-9-9-9z',
    alt: 'Fresh Pollachi Tender Coconut'
  },

  // DRY FRUITS & NUTS
  'almond': {
    emoji: '🌰',
    gradient: ['#78350f', '#b45309'],
    accentColor: '#fde68a',
    iconPath: 'M12 3C8 6 5 11 5 15c0 3 3 6 7 6s7-3 7-6c0-4-3-9-7-15z',
    alt: 'California Premium Almonds'
  },
  'cashew': {
    emoji: '🥜',
    gradient: ['#713f12', '#d97706'],
    accentColor: '#fef08a',
    iconPath: 'M10 5C7 6 5 9 5 13c0 4 3 7 7 7 3 0 6-2 7-5 0-3-2-5-4-5-2 0-3 1-4 2',
    alt: 'W320 Grade Whole Cashew Nuts'
  },
  'walnut': {
    emoji: '🌰',
    gradient: ['#451a03', '#92400e'],
    accentColor: '#fcd34d',
    iconPath: 'M12 4C8 4 5 7 5 12c0 4 2 7 5 8 1 0 2-1 2-3 0-2 1-3 2-3s2 1 2 3c0 2 1 3 2 3 3-1 5-4 5-8 0-5-3-8-7-8z',
    alt: 'Kashmiri Giri Walnut Halves'
  },
  'pistachio': {
    emoji: '🥜',
    gradient: ['#166534', '#65a30d'],
    accentColor: '#bef264',
    iconPath: 'M12 4C8 6 6 10 6 14c0 4 3 7 6 7s6-3 6-7c0-4-2-8-6-10z',
    alt: 'Salted Roasted Green Pistachios'
  },
  'raisin': {
    emoji: '🍇',
    gradient: ['#78350f', '#a16207'],
    accentColor: '#fde68a',
    iconPath: 'M8 6c-2 2-2 5 0 7 2 2 5 2 7 0s2-5 0-7c-2-2-5-2-7 0z',
    alt: 'Golden Sangli Dried Raisins'
  },
  'dates': {
    emoji: '🪵',
    gradient: ['#451a03', '#78350f'],
    accentColor: '#d97706',
    iconPath: 'M8 5C5 7 4 11 5 15c1 4 4 6 7 6s6-2 7-6c1-4 0-8-3-10-2-1-4-1-6 0z',
    alt: 'Soft Medjool Dates'
  },

  // SPICES & CASH CROPS
  'turmeric': {
    emoji: '🪵',
    gradient: ['#a16207', '#eab308'],
    accentColor: '#fef08a',
    iconPath: 'M6 8c-2 3-1 7 2 9 3 2 7 1 9-2 2-3 1-7-2-9-3-2-7-1-9 2z',
    alt: 'High-Curcumin Salem Turmeric Finger'
  },
  'black pepper': {
    emoji: '🫘',
    gradient: ['#18181b', '#27272a'],
    accentColor: '#71717a',
    iconPath: 'M12 5c-3 0-6 3-6 7 0 3 3 6 6 6s6-3 6-6c0-4-3-7-6-7z',
    alt: 'Malabar Black Pepper Corns'
  },
  'cardamom': {
    emoji: '🌿',
    gradient: ['#14532d', '#16a34a'],
    accentColor: '#86efac',
    iconPath: 'M12 4C9 6 7 10 7 14c0 4 2 7 5 7s5-3 5-7c0-4-2-8-5-10z',
    alt: 'Green Bold Idukki Cardamom'
  },
  'red chilli': {
    emoji: '🌶️',
    gradient: ['#991b1b', '#ef4444'],
    accentColor: '#f87171',
    iconPath: 'M5 19C10 20 16 16 19 8c1-3 0-5-2-5-2 0-4 1-5 3-3 4-5 8-12 13z',
    alt: 'Guntur Spicy Red Chilli'
  },
  'coffee': {
    emoji: '☕',
    gradient: ['#451a03', '#78350f'],
    accentColor: '#d97706',
    iconPath: 'M6 6c-2 2-2 6 0 9 2 3 5 3 8 1 2-2 2-6 0-9-2-3-6-3-8-1z',
    alt: 'Coorg Arabica Coffee Beans'
  },
  'tea': {
    emoji: '🍵',
    gradient: ['#064e3b', '#047857'],
    accentColor: '#34d399',
    iconPath: 'M12 3C7 4 4 8 4 13c0 5 4 8 8 8 3 0 6-2 7-5 1-4-1-8-4-11-1-2-2-3-3-4-1 0-1 0-2 2z',
    alt: 'Assam First Flush CTC Tea'
  },
  'sugarcane': {
    emoji: '🎋',
    gradient: ['#14532d', '#15803d'],
    accentColor: '#86efac',
    iconPath: 'M9 2v20M15 2v20M7 8h10M7 14h10',
    alt: 'Juicy Tropical Sugarcane Stalk'
  },
  'cotton': {
    emoji: '☁️',
    gradient: ['#3f3f46', '#e4e4e7'],
    accentColor: '#ffffff',
    iconPath: 'M12 4a5 5 0 00-5 5 5 5 0 00-2 4 5 5 0 005 5h8a5 5 0 005-5 5 5 0 00-2-4 5 5 0 00-5-5z',
    alt: 'Bt Long Staple Raw White Cotton'
  }
};

/**
 * Returns a guaranteed product-specific visual identity.
 * Fallback will construct a crisp category-appropriate SVG, never cross-contaminating product icons.
 */
export function getProductVisual(productId: string, productName: string, category: string): ProductVisual {
  const normKey = (productId || productName || '').toLowerCase().trim();
  
  // Check exact registry
  for (const [key, spec] of Object.entries(PRODUCT_IMAGE_REGISTRY)) {
    if (normKey === key || normKey.includes(key) || key.includes(normKey)) {
      return {
        emoji: spec.emoji,
        gradient: spec.gradient,
        accentColor: spec.accentColor,
        svgPath: spec.iconPath,
        alt: `Fresh ${productName || key}`
      };
    }
  }

  // Category based safe fallbacks (ensuring clear label and styling)
  switch (category) {
    case 'Vegetable':
      return {
        emoji: '🥬',
        gradient: ['#14532d', '#16a34a'],
        accentColor: '#86efac',
        svgPath: 'M12 3C7 3 3 7 3 12c0 5 4 9 9 9s9-4 9-9c0-5-4-9-9-9z',
        alt: `Fresh ${productName}`
      };
    case 'Fruit':
      return {
        emoji: '🍎',
        gradient: ['#881337', '#e11d48'],
        accentColor: '#fb7185',
        svgPath: 'M12 4C9 4 6 6 6 11c0 5 3 9 6 9s6-4 6-9c0-5-3-7-6-7zm0-2c1 1 1 2 0 3',
        alt: `Fresh Harvest ${productName}`
      };
    case 'Grain':
      return {
        emoji: '🌾',
        gradient: ['#854d0e', '#ca8a04'],
        accentColor: '#fef08a',
        svgPath: 'M12 2v20M8 5c2 2 2 5 0 7m8-7c-2 2-2 5 0 7',
        alt: `Premium ${productName} Grains`
      };
    case 'Pulse':
      return {
        emoji: '🫘',
        gradient: ['#78350f', '#d97706'],
        accentColor: '#fde68a',
        svgPath: 'M12 4c-4 0-7 3-7 7 0 4 3 8 7 8s7-4 7-8c0-4-3-7-7-7z',
        alt: `Quality ${productName} Pulses`
      };
    case 'Dry Fruit':
      return {
        emoji: '🌰',
        gradient: ['#78350f', '#b45309'],
        accentColor: '#fde68a',
        svgPath: 'M12 3C8 6 5 11 5 15c0 3 3 6 7 6s7-3 7-6c0-4-3-9-7-15z',
        alt: `Select ${productName} Dry Fruits`
      };
    case 'Spice':
    default:
      return {
        emoji: '🌿',
        gradient: ['#713f12', '#d97706'],
        accentColor: '#fcd34d',
        svgPath: 'M12 3C7 4 4 8 4 13c0 5 4 8 8 8 3 0 6-2 7-5 1-4-1-8-4-11-1-2-2-3-3-4-1 0-1 0-2 2z',
        alt: `Authentic ${productName}`
      };
  }
}
