/**
 * Universal Crop Alias & Fuzzy Recognition Service
 * Maps regional names, synonyms, botanical names, and misspellings to canonical crop IDs.
 */

export interface CropAliasMapping {
  canonicalId: string;
  name: string;
  scientificName: string;
  category: 'Vegetable' | 'Fruit' | 'Grain' | 'Pulse' | 'Dry Fruit' | 'Spice';
  aliases: string[];
}

export const CANONICAL_CROP_ALIASES: CropAliasMapping[] = [
  // VEGETABLES
  {
    canonicalId: 'brinjal',
    name: 'Brinjal',
    scientificName: 'Solanum melongena',
    category: 'Vegetable',
    aliases: [
      'brinjal', 'eggplant', 'aubergine', 'baingan', 'baigan', 'vangi', 'badanekayi', 
      'vankaya', 'kathirikai', 'begun', 'bataon', 'melongena', 'solanum melongena',
      'purple brinjal', 'green brinjal', 'round brinjal', 'bhanta'
    ]
  },
  {
    canonicalId: 'onion',
    name: 'Onion',
    scientificName: 'Allium cepa',
    category: 'Vegetable',
    aliases: [
      'onion', 'pyaz', 'pyaaz', 'kanda', 'eerulli', 'ullipaya', 'vengayam', 'piaj', 
      'allium cepa', 'red onion', 'white onion', 'shallot', 'dungri', 'gandhana'
    ]
  },
  {
    canonicalId: 'potato',
    name: 'Potato',
    scientificName: 'Solanum tuberosum',
    category: 'Vegetable',
    aliases: [
      'potato', 'alu', 'aloo', 'batata', 'alugadde', 'bangaladumpa', 'urulaikizhangu', 
      'solanum tuberosum', 'russet potato', 'pahadi aloo'
    ]
  },
  {
    canonicalId: 'tomato',
    name: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    category: 'Vegetable',
    aliases: [
      'tomato', 'tamatar', 'tomaato', 'tameta', 'tamate', 'ramamulaga', 'thakkali', 
      'solanum lycopersicum', 'lycopersicon', 'cherry tomato', 'roma tomato'
    ]
  },
  {
    canonicalId: 'okra',
    name: 'Okra (Lady Finger)',
    scientificName: 'Abelmoschus esculentus',
    category: 'Vegetable',
    aliases: [
      'okra', 'lady finger', 'ladies finger', 'bhindi', 'bhendi', 'bendekayi', 
      'bendakaya', 'vendakkai', 'dharosh', 'abelmoschus esculentus', 'gumbo'
    ]
  },
  {
    canonicalId: 'capsicum',
    name: 'Capsicum (Bell Pepper)',
    scientificName: 'Capsicum annuum',
    category: 'Vegetable',
    aliases: [
      'capsicum', 'bell pepper', 'shimla mirch', 'simla mirch', 'donne menasinakayi', 
      'bengaluru mirapa', 'kuda milagai', 'sweet pepper', 'capsicum annuum', 'paprika'
    ]
  },
  {
    canonicalId: 'carrot',
    name: 'Carrot',
    scientificName: 'Daucus carota',
    category: 'Vegetable',
    aliases: [
      'carrot', 'gajar', 'gaajar', 'gajjari', 'carrotu', 'manjal mullangi', 
      'daucus carota', 'red carrot', 'orange carrot'
    ]
  },
  {
    canonicalId: 'cabbage',
    name: 'Cabbage',
    scientificName: 'Brassica oleracea var. capitata',
    category: 'Vegetable',
    aliases: [
      'cabbage', 'patta gobhi', 'band gobhi', 'kobi', 'yelekosu', 'kosu', 
      'patta gopi', 'muttaikose', 'brassica oleracea'
    ]
  },
  {
    canonicalId: 'cauliflower',
    name: 'Cauliflower',
    scientificName: 'Brassica oleracea var. botrytis',
    category: 'Vegetable',
    aliases: [
      'cauliflower', 'phool gobhi', 'phool gobi', 'huvukosu', 'gobi flower', 
      'cauliflowers', 'puvvu gopi', 'kallipu'
    ]
  },
  {
    canonicalId: 'broccoli',
    name: 'Broccoli',
    scientificName: 'Brassica oleracea var. italica',
    category: 'Vegetable',
    aliases: [
      'broccoli', 'brocoli', 'green cauliflower', 'hari gobhi', 'green gobi', 
      'brassica italica'
    ]
  },
  {
    canonicalId: 'spinach',
    name: 'Spinach',
    scientificName: 'Spinacia oleracea',
    category: 'Vegetable',
    aliases: [
      'spinach', 'palak', 'paalak', 'palakura', 'pasalai', 'spinacia oleracea', 
      'palak soppu', 'spinach leaves'
    ]
  },
  {
    canonicalId: 'cucumber',
    name: 'Cucumber',
    scientificName: 'Cucumis sativus',
    category: 'Vegetable',
    aliases: [
      'cucumber', 'kheera', 'kakdi', 'southekayi', 'dosakaya', 'vellarikkai', 
      'cucumis sativus', 'salad cucumber'
    ]
  },
  {
    canonicalId: 'garlic',
    name: 'Garlic',
    scientificName: 'Allium sativum',
    category: 'Vegetable',
    aliases: [
      'garlic', 'lahsun', 'lehsun', 'lasun', 'bellulli', 'vellulli', 'poondu', 
      'allium sativum', 'garlic bulb'
    ]
  },
  {
    canonicalId: 'ginger',
    name: 'Ginger',
    scientificName: 'Zingiber officinale',
    category: 'Vegetable',
    aliases: [
      'ginger', 'adrak', 'aale', 'shunti', 'alla', 'inji', 'zingiber officinale', 
      'fresh ginger'
    ]
  },
  {
    canonicalId: 'drumstick',
    name: 'Drumstick (Moringa)',
    scientificName: 'Moringa oleifera',
    category: 'Vegetable',
    aliases: [
      'drumstick', 'moringa', 'sahjan', 'shevaga', 'nuggekayi', 'munagakaya', 
      'murungakkai', 'moringa oleifera'
    ]
  },
  {
    canonicalId: 'bitter-gourd',
    name: 'Bitter Gourd',
    scientificName: 'Momordica charantia',
    category: 'Vegetable',
    aliases: [
      'bitter gourd', 'karela', 'karle', 'hagalakayi', 'kakarakaya', 'pavakkai', 
      'momordica charantia', 'bitter melon'
    ]
  },
  {
    canonicalId: 'bottle-gourd',
    name: 'Bottle Gourd',
    scientificName: 'Lagenaria siceraria',
    category: 'Vegetable',
    aliases: [
      'bottle gourd', 'lauki', 'doodhi', 'dudhi', 'sorakayi', 'sorakaya', 
      'suraikkai', 'lagenaria siceraria', 'calabash'
    ]
  },

  // GRAINS & CEREALS
  {
    canonicalId: 'rice',
    name: 'Rice (Paddy)',
    scientificName: 'Oryza sativa',
    category: 'Grain',
    aliases: [
      'rice', 'paddy', 'chawal', 'dhan', 'bhat', 'akki', 'vari', 'arisi', 
      'basmati', 'sona masoori', 'oryza sativa', 'boiled rice', 'raw rice'
    ]
  },
  {
    canonicalId: 'wheat',
    name: 'Wheat',
    scientificName: 'Triticum aestivum',
    category: 'Grain',
    aliases: [
      'wheat', 'gehu', 'gehun', 'gahu', 'godhi', 'godhumalu', 'godhumai', 
      'triticum aestivum', 'sharbati wheat', 'durum wheat'
    ]
  },
  {
    canonicalId: 'maize',
    name: 'Maize (Corn)',
    scientificName: 'Zea mays',
    category: 'Grain',
    aliases: [
      'maize', 'corn', 'makka', 'makai', 'musukina jola', 'mokka jonna', 
      'makka cholam', 'zea mays', 'sweet corn', 'bhutta'
    ]
  },
  {
    canonicalId: 'ragi',
    name: 'Ragi (Finger Millet)',
    scientificName: 'Eleusine coracana',
    category: 'Grain',
    aliases: [
      'ragi', 'finger millet', 'nachni', 'mandua', 'ragulu', 'kezhvaragu', 
      'eleusine coracana', 'red millet'
    ]
  },

  // PULSES & LEGUMES
  {
    canonicalId: 'chickpea',
    name: 'Chickpea (Chana)',
    scientificName: 'Cicer arietinum',
    category: 'Pulse',
    aliases: [
      'chickpea', 'chana', 'bengal gram', 'kadale', 'sanagalu', 'kondakadalai', 
      'kabuli chana', 'desi chana', 'chole', 'cicer arietinum', 'gram'
    ]
  },
  {
    canonicalId: 'green-gram',
    name: 'Green Gram (Moong)',
    scientificName: 'Vigna radiata',
    category: 'Pulse',
    aliases: [
      'green gram', 'moong', 'mung', 'hesarukalu', 'pesalu', 'paasi payaru', 
      'vigna radiata', 'mung bean', 'moong dal'
    ]
  },
  {
    canonicalId: 'black-gram',
    name: 'Black Gram (Urad)',
    scientificName: 'Vigna mungo',
    category: 'Pulse',
    aliases: [
      'black gram', 'urad', 'udad', 'uddina kalu', 'minumulu', 'ulundhu', 
      'vigna mungo', 'urad dal', 'mash kalai'
    ]
  },
  {
    canonicalId: 'red-gram',
    name: 'Red Gram (Toor / Arhar)',
    scientificName: 'Cajanus cajan',
    category: 'Pulse',
    aliases: [
      'red gram', 'toor', 'tur', 'arhar', 'togari bele', 'kandulu', 'tuvaram paruppu', 
      'pigeon pea', 'cajanus cajan', 'toor dal'
    ]
  },
  {
    canonicalId: 'groundnut',
    name: 'Groundnut (Peanut)',
    scientificName: 'Arachis hypogaea',
    category: 'Pulse',
    aliases: [
      'groundnut', 'peanut', 'mungfali', 'moongphali', 'shengdana', 'shenga', 
      'verukadalai', 'pallilu', 'arachis hypogaea', 'monkey nut'
    ]
  },

  // FRUITS
  {
    canonicalId: 'mango',
    name: 'Mango',
    scientificName: 'Mangifera indica',
    category: 'Fruit',
    aliases: [
      'mango', 'aam', 'alphonso', 'hapus', 'kesar', 'mavina hannu', 'mamidi pandu', 
      'manga', 'mangifera indica', 'totapuri', 'dasheri', 'banganapalli'
    ]
  },
  {
    canonicalId: 'banana',
    name: 'Banana',
    scientificName: 'Musa acuminata',
    category: 'Fruit',
    aliases: [
      'banana', 'kela', 'kele', 'bale hannu', 'ariti pandu', 'vazhaipazham', 
      'musa acuminata', 'robusta banana', 'yelakki banana', 'plantain'
    ]
  },
  {
    canonicalId: 'apple',
    name: 'Apple',
    scientificName: 'Malus domestica',
    category: 'Fruit',
    aliases: [
      'apple', 'seb', 'seba', 'sebu', 'aapil', 'malus domestica', 'shimla apple', 
      'kashmiri apple', 'royal delicious'
    ]
  },
  {
    canonicalId: 'pomegranate',
    name: 'Pomegranate',
    scientificName: 'Punica granatum',
    category: 'Fruit',
    aliases: [
      'pomegranate', 'anar', 'dalimb', 'dalimbe', 'danimma', 'madhulampazham', 
      'punica granatum', 'bhagwa anar'
    ]
  },
  {
    canonicalId: 'grapes',
    name: 'Grapes',
    scientificName: 'Vitis vinifera',
    category: 'Fruit',
    aliases: [
      'grapes', 'angoor', 'draksh', 'drakshi', 'dhraksha', 'thiratchai', 
      'vitis vinifera', 'thompson seedless', 'black grapes', 'green grapes'
    ]
  },
  {
    canonicalId: 'sapota',
    name: 'Sapota (Chikoo)',
    scientificName: 'Manilkara zapota',
    category: 'Fruit',
    aliases: [
      'sapota', 'chikoo', 'chiku', 'chikuu', 'sapodilla', 'sapota pandu', 
      'sapota pazham', 'manilkara zapota'
    ]
  },
  {
    canonicalId: 'coconut',
    name: 'Coconut',
    scientificName: 'Cocos nucifera',
    category: 'Fruit',
    aliases: [
      'coconut', 'nariyal', 'naral', 'tenginakayi', 'kobbari', 'thengai', 
      'tender coconut', 'cocos nucifera', 'copra'
    ]
  },

  // DRY FRUITS & NUTS
  {
    canonicalId: 'almond',
    name: 'Almond (Badam)',
    scientificName: 'Prunus dulcis',
    category: 'Dry Fruit',
    aliases: [
      'almond', 'badam', 'baadam', 'mamra', 'nonpareil', 'prunus dulcis', 
      'california almond', 'kashmiri badam'
    ]
  },
  {
    canonicalId: 'cashew',
    name: 'Cashew (Kaju)',
    scientificName: 'Anacardium occidentale',
    category: 'Dry Fruit',
    aliases: [
      'cashew', 'kaju', 'kaaju', 'geru beeja', 'jeedipappu', 'mundhiri', 
      'anacardium occidentale', 'cashew nut'
    ]
  },
  {
    canonicalId: 'walnut',
    name: 'Walnut (Akhrot)',
    scientificName: 'Juglans regia',
    category: 'Dry Fruit',
    aliases: [
      'walnut', 'akhrot', 'akrot', 'akrotu', 'juglans regia', 'kashmiri akhrot', 
      'walnut kernel'
    ]
  },

  // SPICES & CASH CROPS
  {
    canonicalId: 'turmeric',
    name: 'Turmeric (Haldi)',
    scientificName: 'Curcuma longa',
    category: 'Spice',
    aliases: [
      'turmeric', 'haldi', 'pasupu', 'arishina', 'manjal', 'curcuma longa', 
      'curcumin', 'salem turmeric', 'turmeric finger'
    ]
  },
  {
    canonicalId: 'black-pepper',
    name: 'Black Pepper',
    scientificName: 'Piper nigrum',
    category: 'Spice',
    aliases: [
      'black pepper', 'kali mirch', 'miri', 'kare menasu', 'miriyalu', 
      'milagu', 'piper nigrum', 'black peppercorn'
    ]
  },
  {
    canonicalId: 'cardamom',
    name: 'Cardamom (Elaichi)',
    scientificName: 'Elettaria cardamomum',
    category: 'Spice',
    aliases: [
      'cardamom', 'elaichi', 'elachi', 'yelakki', 'elakulu', 'elakkai', 
      'elettaria cardamomum', 'green cardamom'
    ]
  },
  {
    canonicalId: 'coriander',
    name: 'Coriander (Dhania)',
    scientificName: 'Coriandrum sativum',
    category: 'Spice',
    aliases: [
      'coriander', 'dhania', 'dhanya', 'kothambari', 'dhaniyalu', 'kothamalli', 
      'coriandrum sativum', 'cilantro'
    ]
  }
];

/**
 * Standard Levenshtein distance calculation for fuzzy matching
 */
function levenshteinDistance(a: string, b: string): number {
  const an = a ? a.length : 0;
  const bn = b ? b.length : 0;
  if (an === 0) return bn;
  if (bn === 0) return an;
  const matrix = Array.from({ length: bn + 1 }, () => new Array(an + 1).fill(0));
  for (let i = 0; i <= an; i++) matrix[0][i] = i;
  for (let j = 0; j <= bn; j++) matrix[j][0] = j;

  for (let j = 1; j <= bn; j++) {
    for (let i = 1; i <= an; i++) {
      if (b[j - 1] === a[i - 1]) {
        matrix[j][i] = matrix[j - 1][i - 1];
      } else {
        matrix[j][i] = Math.min(
          matrix[j - 1][i] + 1,      // deletion
          matrix[j][i - 1] + 1,      // insertion
          matrix[j - 1][i - 1] + 1   // substitution
        );
      }
    }
  }
  return matrix[bn][an];
}

/**
 * Compute string similarity score (0.0 to 1.0)
 */
export function calculateSimilarity(query: string, target: string): number {
  const q = query.toLowerCase().trim();
  const t = target.toLowerCase().trim();
  if (q === t) return 1.0;
  if (t.includes(q) || q.includes(t)) {
    const ratio = Math.min(q.length, t.length) / Math.max(q.length, t.length);
    return Math.max(0.85, ratio);
  }
  const maxLen = Math.max(q.length, t.length);
  if (maxLen === 0) return 1.0;
  const dist = levenshteinDistance(q, t);
  return Math.max(0, 1.0 - (dist / maxLen));
}

export interface AliasMatchResult {
  canonicalId: string;
  name: string;
  scientificName: string;
  category: string;
  matchedTerm: string;
  confidence: number;
  isExact: boolean;
}

/**
 * Resolve any query to a canonical crop mapping with confidence metrics
 */
export function resolveCropAlias(query: string): AliasMatchResult | null {
  if (!query || !query.trim()) return null;
  const clean = query.toLowerCase().trim();

  // 1. Direct Exact Match
  for (const crop of CANONICAL_CROP_ALIASES) {
    if (crop.canonicalId === clean || crop.name.toLowerCase() === clean || crop.scientificName.toLowerCase() === clean) {
      return {
        canonicalId: crop.canonicalId,
        name: crop.name,
        scientificName: crop.scientificName,
        category: crop.category,
        matchedTerm: crop.name,
        confidence: 1.0,
        isExact: true
      };
    }
    for (const alias of crop.aliases) {
      if (alias.toLowerCase() === clean) {
        return {
          canonicalId: crop.canonicalId,
          name: crop.name,
          scientificName: crop.scientificName,
          category: crop.category,
          matchedTerm: alias,
          confidence: 0.98,
          isExact: true
        };
      }
    }
  }

  // 2. Substring & Token matching
  for (const crop of CANONICAL_CROP_ALIASES) {
    for (const alias of crop.aliases) {
      if (clean.includes(alias.toLowerCase()) || alias.toLowerCase().includes(clean)) {
        return {
          canonicalId: crop.canonicalId,
          name: crop.name,
          scientificName: crop.scientificName,
          category: crop.category,
          matchedTerm: alias,
          confidence: 0.90,
          isExact: false
        };
      }
    }
  }

  // 3. Fuzzy Levenshtein Search (threshold >= 0.70)
  let bestMatch: AliasMatchResult | null = null;
  let maxScore = 0;

  for (const crop of CANONICAL_CROP_ALIASES) {
    for (const alias of [crop.name, crop.scientificName, ...crop.aliases]) {
      const score = calculateSimilarity(clean, alias);
      if (score > maxScore && score >= 0.70) {
        maxScore = score;
        bestMatch = {
          canonicalId: crop.canonicalId,
          name: crop.name,
          scientificName: crop.scientificName,
          category: crop.category,
          matchedTerm: alias,
          confidence: parseFloat(score.toFixed(2)),
          isExact: false
        };
      }
    }
  }

  return bestMatch;
}

/**
 * Find "Did you mean?" suggestions for a user query
 */
export function getDidYouMeanSuggestions(query: string, limit: number = 3): { name: string; canonicalId: string; confidence: number }[] {
  if (!query) return [];
  const clean = query.toLowerCase().trim();
  const suggestions: { name: string; canonicalId: string; confidence: number }[] = [];

  for (const crop of CANONICAL_CROP_ALIASES) {
    let highestCropScore = 0;
    for (const alias of [crop.name, ...crop.aliases]) {
      const score = calculateSimilarity(clean, alias);
      if (score > highestCropScore) {
        highestCropScore = score;
      }
    }
    if (highestCropScore >= 0.50 && highestCropScore < 1.0) {
      suggestions.push({
        name: crop.name,
        canonicalId: crop.canonicalId,
        confidence: parseFloat(highestCropScore.toFixed(2))
      });
    }
  }

  return suggestions
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, limit);
}
