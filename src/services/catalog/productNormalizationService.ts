/**
 * AgriFlow Centralized Multilingual Product Normalization & Catalog Architecture
 * Single source of truth for:
 * - Image Recognition
 * - Voice Assistant
 * - Manual Search / Selection
 * - Price Discovery
 * - Packaging Recommendations
 * - FSSAI Compliance
 * 
 * Strict Matching Hierarchy:
 * 1. Exact normalized match
 * 2. Exact alias match
 * 3. Exact word boundary match
 * 4. Category-aware match
 * 5. High-threshold fuzzy match
 * 6. NULL (NEVER false fallback to random crops)
 */

export type ProductCategory = 
  | 'fruit' 
  | 'vegetable' 
  | 'dairy' 
  | 'dry-fruit' 
  | 'grain' 
  | 'pulse' 
  | 'spice' 
  | 'oil' 
  | 'flour'
  | 'other';

export interface ProductCatalogEntry {
  id: string;
  canonicalName: string;
  displayName: string;
  category: ProductCategory;
  subcategory: string;
  scientificName?: string;
  icon: string;
  basePriceKg: number;
  multilingual: {
    en: string;
    kn: string; // Kannada
    hi: string; // Hindi
    te: string; // Telugu
    ta: string; // Tamil
  };
  aliases: string[]; // English, Indic script, and romanized transliterations
}

export const CENTRAL_PRODUCT_CATALOG: ProductCatalogEntry[] = [
  // ================= FRUITS =================
  {
    id: 'apple',
    canonicalName: 'apple',
    displayName: 'Apple',
    category: 'fruit',
    subcategory: 'pome fruit',
    scientificName: 'Malus domestica',
    icon: '🍎',
    basePriceKg: 140,
    multilingual: {
      en: 'Apple',
      kn: 'ಸೇಬು',
      hi: 'सेब',
      te: 'ఆపిల్',
      ta: 'ஆப்பிள்'
    },
    aliases: [
      'apple', 'apples', 'fresh apple', 'royal delicious', 'red delicious', 'shimla apple', 'kinnaur apple', 'kashmiri apple',
      'ಸೇಬು', 'ಸೇಬು ಹಣ್ಣು', 'ಆಪಲ್', 'ಆಪಿಲ್', 'sebu', 'aapal',
      'सेब', 'seb', 'saeb',
      'ఆపిల్', 'ఆపిల్స్', 'aapil',
      'ஆப்பிள்', 'appil'
    ]
  },
  {
    id: 'orange',
    canonicalName: 'orange',
    displayName: 'Orange',
    category: 'fruit',
    subcategory: 'citrus fruit',
    scientificName: 'Citrus sinensis',
    icon: '🍊',
    basePriceKg: 65,
    multilingual: {
      en: 'Orange',
      kn: 'ಕಿತ್ತಳೆ',
      hi: 'संतरा',
      te: 'నారింజ',
      ta: 'ஆரஞ்சு'
    },
    aliases: [
      'orange', 'oranges', 'nagpur orange', 'mandarin', 'santre',
      'ಕಿತ್ತಳೆ', 'ಕಿತ್ತಳೆ ಹಣ್ಣು', 'ಕಿತ್ತಲೆ', 'kittale', 'kithale',
      'संतरा', 'संतरे', 'santra', 'santre', 'narangi',
      'నారింజ', 'నారింజ పండు', 'naarinja',
      'ஆரஞ்சு', 'ஆரஞ்சு பழம்', 'aaranju'
    ]
  },
  {
    id: 'banana',
    canonicalName: 'banana',
    displayName: 'Banana',
    category: 'fruit',
    subcategory: 'tropical fruit',
    scientificName: 'Musa acuminata',
    icon: '🍌',
    basePriceKg: 35,
    multilingual: {
      en: 'Banana',
      kn: 'ಬಾಳೆಹಣ್ಣು',
      hi: 'केला',
      te: 'అరటిపండు',
      ta: 'வாழைப்பழம்'
    },
    aliases: [
      'banana', 'bananas', 'robusta banana', 'yelakki banana', 'cavendish',
      'ಬಾಳೆಹಣ್ಣು', 'ಬಾಳೆಕಾಯಿ', 'ಬಾಳೆ', 'balehannu', 'baale', 'balekayi',
      'केला', 'केले', 'kela', 'kele',
      'అరటిపండు', 'అరటికాయ', 'arati', 'aratipandu',
      'வாழைப்பழம்', 'வாழைக்காய்', 'vazhaipazham'
    ]
  },
  {
    id: 'mango',
    canonicalName: 'mango',
    displayName: 'Mango',
    category: 'fruit',
    subcategory: 'stone fruit',
    scientificName: 'Mangifera indica',
    icon: '🥭',
    basePriceKg: 120,
    multilingual: {
      en: 'Mango',
      kn: 'ಮಾವಿನಹಣ್ಣು',
      hi: 'आम',
      te: 'మామిడి',
      ta: 'மாம்பழம்'
    },
    aliases: [
      'mango', 'mangoes', 'alphonso', 'kesar', 'badami', 'dasheri',
      'ಮಾವಿನಹಣ್ಣು', 'ಮಾವಿನಕಾಯಿ', 'ಮಾವು', 'mavina hannu', 'maavu', 'mavinakayi',
      'आम', 'aam', 'aam papad',
      'మామిడి', 'మామిడికాయ', 'మామిడి పండు', 'mamidi',
      'மாம்பழம்', 'மாங்காய்', 'mambazham', 'manga'
    ]
  },
  {
    id: 'watermelon',
    canonicalName: 'watermelon',
    displayName: 'Watermelon',
    category: 'fruit',
    subcategory: 'cucurbit melon',
    scientificName: 'Citrullus lanatus',
    icon: '🍉',
    basePriceKg: 28,
    multilingual: {
      en: 'Watermelon',
      kn: 'ಕಲ್ಲಂಗಡಿ',
      hi: 'तरबूज',
      te: 'పుచ్చకాయ',
      ta: 'தர்பூசணி'
    },
    aliases: [
      'watermelon', 'water melon', 'tarbooj', 'kallangadi',
      'ಕಲ್ಲಂಗಡಿ', 'ಕಲ್ಲಂಗಡಿ ಹಣ್ಣು', 'kallangadi', 'kallangadi hannu',
      'तरबूज', 'tarbooj', 'tarbuj',
      'పుచ్చకాయ', 'పుచ్చ పండు', 'pucchakaya', 'puchakaya',
      'தர்பூசணி', 'தர்பூஸ்', 'dharboosani', 'tarboosani'
    ]
  },
  {
    id: 'papaya',
    canonicalName: 'papaya',
    displayName: 'Papaya',
    category: 'fruit',
    subcategory: 'tropical fruit',
    scientificName: 'Carica papaya',
    icon: '🍈',
    basePriceKg: 40,
    multilingual: {
      en: 'Papaya',
      kn: 'ಪಪ್ಪಾಯಿ',
      hi: 'पपीता',
      te: 'బొప్పాయి',
      ta: 'பப்பாளி'
    },
    aliases: [
      'papaya', 'papayas', 'red lady papaya',
      'ಪಪ್ಪಾಯಿ', 'ಪರಂಗಿ', 'pappayi', 'parangi',
      'पपीता', 'papita', 'papeeta',
      'బొప్పాయి', 'బొప్పాయి పండు', 'boppayi',
      'பப்பாளி', 'pappali'
    ]
  },
  {
    id: 'pomegranate',
    canonicalName: 'pomegranate',
    displayName: 'Pomegranate',
    category: 'fruit',
    subcategory: 'aril berry',
    scientificName: 'Punica granatum',
    icon: '🍇',
    basePriceKg: 160,
    multilingual: {
      en: 'Pomegranate',
      kn: 'ದಾಳಿಂಬೆ',
      hi: 'अनार',
      te: 'దానిమ్మ',
      ta: 'மாதுளை'
    },
    aliases: [
      'pomegranate', 'pomegranates', 'anar', 'bhagwa',
      'ದಾಳಿಂಬೆ', 'ದಾಳಿಂಬೆ ಹಣ್ಣು', 'dalimbe', 'dalimbi',
      'अनार', 'anar', 'anaar',
      'దానిమ్మ', 'దానిమ్మకాయ', 'danimma',
      'மாதுளை', 'மாதுளம்பழம்', 'madhulai'
    ]
  },
  {
    id: 'butter-fruit',
    canonicalName: 'butter-fruit',
    displayName: 'Butter Fruit (Avocado)',
    category: 'fruit',
    subcategory: 'tropical lipid fruit',
    scientificName: 'Persea americana',
    icon: '🥑',
    basePriceKg: 180,
    multilingual: {
      en: 'Butter Fruit (Avocado)',
      kn: 'ಬೆಣ್ಣೆ ಹಣ್ಣು',
      hi: 'बटर फ्रूट (एवोकाडो)',
      te: 'వెన్న పండు (అవోకాడో)',
      ta: 'வெண்ணெய் பழம் (அவகேடோ)'
    },
    aliases: [
      'butter fruit', 'butterfruit', 'butter-fruit', 'avocado', 'hass avocado', 'persea americana',
      'ಬೆಣ್ಣೆ ಹಣ್ಣು', 'ಬೆಣ್ಣೆಹಣ್ಣು', 'ಅವಕಾಡೊ', 'benne hannu', 'bennehannu', 'benne phala',
      'बटर फ्रूट', 'बटरफ्रूट', 'एवोकाडो', 'एवोकैडो', 'makhan phal', 'makkhan phal',
      'వెన్న పండు', 'వెన్నపండు', 'అవోకాడో', 'venna pandu', 'avokado',
      'வெண்ணெய் பழம்', 'வெண்ணெய்ப்பழம்', 'அவகேடோ', 'vennai pazham'
    ]
  },

  // ================= VEGETABLES =================
  {
    id: 'tomato',
    canonicalName: 'tomato',
    displayName: 'Tomato',
    category: 'vegetable',
    subcategory: 'solanaceous berry',
    scientificName: 'Solanum lycopersicum',
    icon: '🍅',
    basePriceKg: 42,
    multilingual: {
      en: 'Tomato',
      kn: 'ಟೊಮೇಟೊ',
      hi: 'टमाटर',
      te: 'టమాటా',
      ta: 'தக்காளி'
    },
    aliases: [
      'tomato', 'tomatoes', 'hybrid tomato', 'desi tomato',
      'ಟೊಮೇಟೊ', 'ಟೊಮ್ಯಾಟೊ', 'ಟೊಮಾಟೊ', 'ತೊಮೇಟೊ', 'tomato', 'tomatoo', 'tamato', 'thometo',
      'टमाटर', 'tamatar', 'tamatarr', 'tamater',
      'టమాటా', 'టొమాటో', 'టమోటా', 'tamata', 'tomato',
      'தக்காளி', 'thakkali', 'thakkalli'
    ]
  },
  {
    id: 'potato',
    canonicalName: 'potato',
    displayName: 'Potato',
    category: 'vegetable',
    subcategory: 'starchy tuber',
    scientificName: 'Solanum tuberosum',
    icon: '🥔',
    basePriceKg: 26,
    multilingual: {
      en: 'Potato',
      kn: 'ಆಲೂಗಡ್ಡೆ',
      hi: 'आलू',
      te: 'బంగాళాదుంప',
      ta: 'உருளைக்கிழங்கு'
    },
    aliases: [
      'potato', 'potatoes', 'kufri jyoti', 'chipsona',
      'ಆಲೂಗಡ್ಡೆ', 'ಆಲೂಗೆಡ್ಡೆ', 'ಆಲೂ', 'aalugadde', 'alugadde', 'aalu',
      'आलू', 'aloo', 'aalu',
      'బంగాళాదుంప', 'బంగాళదుంప', 'ఆలు', 'bangaladumpa', 'aalu',
      'உருளைக்கிழங்கு', 'உருளை', 'urulaikizhangu', 'urulai'
    ]
  },
  {
    id: 'onion',
    canonicalName: 'onion',
    displayName: 'Onion',
    category: 'vegetable',
    subcategory: 'alliaceous bulb',
    scientificName: 'Allium cepa',
    icon: '🧅',
    basePriceKg: 48,
    multilingual: {
      en: 'Onion',
      kn: 'ಈರುಳ್ಳಿ',
      hi: 'प्याज़',
      te: 'ఉల్లిపాయ',
      ta: 'வெங்காயம்'
    },
    aliases: [
      'onion', 'onions', 'red onion', 'nashik onion', 'shallot',
      'ಈರುಳ್ಳಿ', 'ಉಳ್ಳಾಗಡ್ಡಿ', 'eerulli', 'irulli', 'ullagaddi',
      'प्याज़', 'प्याज', 'कांदा', 'pyaz', 'pyaaz', 'kanda',
      'ఉల్లిపాయ', 'ఉల్లిగడ్డ', 'ullipaya', 'ulligadda',
      'வெங்காயம்', 'venkaayam', 'vengayam'
    ]
  },
  {
    id: 'beetroot',
    canonicalName: 'beetroot',
    displayName: 'Beetroot',
    category: 'vegetable',
    subcategory: 'taproot vegetable',
    scientificName: 'Beta vulgaris',
    icon: '🫐',
    basePriceKg: 36,
    multilingual: {
      en: 'Beetroot',
      kn: 'ಬೀಟ್ರೂಟ್',
      hi: 'चुकंदर',
      te: 'బీట్‌రూట్',
      ta: 'பீட்ரூட்'
    },
    aliases: [
      'beetroot', 'beet root', 'beet', 'beets', 'ruby beet',
      'ಬೀಟ್ರೂಟ್', 'ಬೀಟ್ ರೂಟ್', 'beetroot', 'beet root',
      'चुकंदर', 'चुकन्दर', 'chukandar', 'chukander',
      'బీట్‌రూట్', 'బీట్ రూట్', 'beetroot',
      'பீட்ரூட்', 'beetroot'
    ]
  },
  {
    id: 'carrot',
    canonicalName: 'carrot',
    displayName: 'Carrot',
    category: 'vegetable',
    subcategory: 'taproot vegetable',
    scientificName: 'Daucus carota',
    icon: '🥕',
    basePriceKg: 45,
    multilingual: {
      en: 'Carrot',
      kn: 'ಕ್ಯಾರೆಟ್',
      hi: 'गाजर',
      te: 'క్యారెట్',
      ta: 'கேரட்'
    },
    aliases: [
      'carrot', 'carrots', 'red carrot', 'orange carrot', 'desi gajar',
      'ಕ್ಯಾರೆಟ್', 'ಗಜ್ಜರಿ', 'ಗಜ್ಜರೆ', 'carrot', 'gajjari',
      'गाजर', 'gajar', 'gaajar',
      'క్యారెట్', 'క్యారట్', 'గజ్జర', 'carrot', 'gajjara',
      'கேரட்', 'carrot'
    ]
  },
  {
    id: 'okra',
    canonicalName: 'okra',
    displayName: "Okra (Lady's Finger)",
    category: 'vegetable',
    subcategory: 'malvaceous pod',
    scientificName: 'Abelmoschus esculentus',
    icon: '🥬',
    basePriceKg: 46,
    multilingual: {
      en: "Okra (Lady's Finger)",
      kn: 'ಬೆಂಡೆಕಾಯಿ',
      hi: 'भिंडी',
      te: 'బెండకాయ',
      ta: 'வெண்டைக்காய்'
    },
    aliases: [
      'okra', 'ladys finger', "lady's finger", 'bhindi', 'gumbo',
      'ಬೆಂಡೆಕಾಯಿ', 'ಬೆಂಡೆ', 'bendekayi', 'bende',
      'भिंडी', 'भेंडी', 'bhindi', 'bhendi',
      'బెండకాయ', 'బెండ', 'bendakaya', 'benda',
      'வெண்டைக்காய்', 'வெண்டை', 'vendaikkai', 'vendakkai'
    ]
  },
  {
    id: 'radish',
    canonicalName: 'radish',
    displayName: 'Radish (Mooli)',
    category: 'vegetable',
    subcategory: 'taproot crucifer',
    scientificName: 'Raphanus sativus',
    icon: '🌱',
    basePriceKg: 32,
    multilingual: {
      en: 'Radish',
      kn: 'ಮೂಲಂಗಿ',
      hi: 'मूली',
      te: 'ముల్లంగి',
      ta: 'முள்ளங்கி'
    },
    aliases: [
      'radish', 'radishes', 'mooli', 'daikon', 'white radish',
      'ಮೂಲಂಗಿ', 'ಮೂಲಂಗಿ ಗಡ್ಡೆ', 'moolangi', 'mulangi',
      'मूली', 'mooli', 'muli',
      'ముల్లంగి', 'mullangi',
      'முள்ளங்கி', 'mullangi'
    ]
  },
  {
    id: 'brinjal',
    canonicalName: 'brinjal',
    displayName: 'Brinjal (Eggplant)',
    category: 'vegetable',
    subcategory: 'solanaceous fruit',
    scientificName: 'Solanum melongena',
    icon: '🍆',
    basePriceKg: 38,
    multilingual: {
      en: 'Brinjal (Eggplant)',
      kn: 'ಬದನೆಕಾಯಿ',
      hi: 'बैंगन',
      te: 'వంకాయ',
      ta: 'கத்தரிக்காய்'
    },
    aliases: [
      'brinjal', 'eggplant', 'aubergine', 'baingan', 'vangi',
      'ಬದನೆಕಾಯಿ', 'ಬದನೆ', 'badanekayi', 'badane',
      'बैंगन', 'भाटा', 'baingan', 'bhanta',
      'వంకాయ', 'vankaya',
      'கத்தரிக்காய்', 'கத்தரி', 'katharikai'
    ]
  },
  {
    id: 'cabbage',
    canonicalName: 'cabbage',
    displayName: 'Cabbage',
    category: 'vegetable',
    subcategory: 'brassica head',
    scientificName: 'Brassica oleracea var. capitata',
    icon: '🥬',
    basePriceKg: 24,
    multilingual: {
      en: 'Cabbage',
      kn: 'ಎಲೆಕೋಸು',
      hi: 'पत्ता गोभी',
      te: 'క్యాబేజీ',
      ta: 'முட்டைக்கோஸ்'
    },
    aliases: [
      'cabbage', 'green cabbage', 'patta gobhi',
      'ಎಲೆಕೋಸು', 'ಕೋಸು', 'elekosu', 'kosu',
      'पत्ता गोभी', 'बंद गोभी', 'patta gobhi', 'bandh gobhi',
      'క్యాబేజీ', 'క్యాబేజ్', 'cabbage',
      'முட்டைக்கோஸ்', 'முட்டைக்கோசு', 'muttaikos'
    ]
  },
  {
    id: 'cauliflower',
    canonicalName: 'cauliflower',
    displayName: 'Cauliflower',
    category: 'vegetable',
    subcategory: 'brassica curd',
    scientificName: 'Brassica oleracea var. botrytis',
    icon: '🥦',
    basePriceKg: 40,
    multilingual: {
      en: 'Cauliflower',
      kn: 'ಹೂಕೋಸು',
      hi: 'फूल गोभी',
      te: 'కాలీఫ్లవర్',
      ta: 'காலிஃபிளவர்'
    },
    aliases: [
      'cauliflower', 'phool gobhi',
      'ಹೂಕೋಸು', 'hookosu',
      'फूल गोभी', 'phool gobhi', 'gobhi',
      'కాలీఫ్లవర్', 'కాలీఫ్లవరు', 'cauliflower',
      'காலிஃபிளவர்', 'காலிபிளவர்', 'cauliflower'
    ]
  },
  {
    id: 'cucumber',
    canonicalName: 'cucumber',
    displayName: 'Cucumber',
    category: 'vegetable',
    subcategory: 'cucurbit pepo',
    scientificName: 'Cucumis sativus',
    icon: '🥒',
    basePriceKg: 30,
    multilingual: {
      en: 'Cucumber',
      kn: 'ಸೌತೆಕಾಯಿ',
      hi: 'खीरा',
      te: 'దోసకాయ',
      ta: 'வெள்ளரிக்காய்'
    },
    aliases: [
      'cucumber', 'kheera', 'kakdi',
      'ಸೌತೆಕಾಯಿ', 'ಸೌತೆ', 'sauthekayi', 'soutekayi',
      'खीरा', 'ककड़ी', 'kheera', 'kakdi',
      'దోసకాయ', 'కీరదోస', 'dosakaya', 'keera',
      'வெள்ளரிக்காய்', 'வெள்ளரி', 'vellarikkai'
    ]
  },
  {
    id: 'green-chilli',
    canonicalName: 'green-chilli',
    displayName: 'Green Chilli',
    category: 'vegetable',
    subcategory: 'pungent capsicum pod',
    scientificName: 'Capsicum annuum',
    icon: '🌶️',
    basePriceKg: 75,
    multilingual: {
      en: 'Green Chilli',
      kn: 'ಹಸಿ ಮೆಣಸಿನಕಾಯಿ',
      hi: 'हरी मिर्च',
      te: 'పచ్చి మిరపకాయ',
      ta: 'பச்சை மிளகாய்'
    },
    aliases: [
      'green chilli', 'green chili', 'hari mirch', 'chilli', 'chili',
      'ಹಸಿ ಮೆಣಸಿನಕಾಯಿ', 'ಮೆಣಸಿನಕಾಯಿ', 'hasi menasinakayi', 'menasinakayi',
      'हरी मिर्च', 'मिर्च', 'hari mirch', 'mirchi',
      'పచ్చి మిరపకాయ', 'మిరపకాయ', 'pacchi mirapakaya', 'mirapakaya',
      'பச்சை மிளகாய்', 'மிளகாய்', 'pachai milagai', 'milagai'
    ]
  },
  {
    id: 'capsicum',
    canonicalName: 'capsicum',
    displayName: 'Capsicum / Bell Pepper',
    category: 'vegetable',
    subcategory: 'sweet pepper / capsicum',
    scientificName: 'Capsicum annuum var. grossum',
    icon: '🫑',
    basePriceKg: 48,
    multilingual: {
      en: 'Capsicum / Bell Pepper',
      kn: 'ದಪ್ಪ ಮೆಣಸಿನಕಾಯಿ',
      hi: 'शिमला मिर्च',
      te: 'బుంగ మిరప',
      ta: 'குடை மிளகாய்'
    },
    aliases: [
      'capsicum', 'bell pepper', 'bell peppers', 'sweet pepper', 'green capsicum', 'red capsicum', 'yellow capsicum', 'shimla mirch', 'shimlamirch',
      'ದಪ್ಪ ಮೆಣಸಿನಕಾಯಿ', 'ಕ್ಯಾಪ್ಸಿಕಂ', 'ಶಿಮ್ಲಾ ಮಿರ್ಚ್', 'dappa menasinakayi', 'capsicum',
      'शिमला मिर्च', 'शिमलामिर्च', 'shimla mirch', 'shimlamirch',
      'బుంగ మిరప', 'క్యాప్సికం', 'bunga mirapa',
      'குடை மிளகாய்', 'குடைமிளகாய்', 'kudai milagai'
    ]
  },

  // ================= DAIRY PRODUCTS =================
  {
    id: 'butter',
    canonicalName: 'butter',
    displayName: 'Butter',
    category: 'dairy',
    subcategory: 'dairy fat emulsion',
    scientificName: 'Bos taurus fat',
    icon: '🧈',
    basePriceKg: 540,
    multilingual: {
      en: 'Butter',
      kn: 'ಬೆಣ್ಣೆ',
      hi: 'मक्खन',
      te: 'వెన్న',
      ta: 'வெண்ணெய்'
    },
    aliases: [
      'butter', 'makkan', 'makkhan', 'table butter', 'cultured butter', 'white butter', 'dairy butter',
      'ಬೆಣ್ಣೆ', 'ಬೆನ್ನೆ', 'ಹಸುವಿನ ಬೆಣ್ಣೆ', 'benne', 'bennae',
      'मक्खन', 'माखन', 'makkhan', 'makhan', 'desi makkhan',
      'వెన్న', 'ఆవు వెన్న', 'venna', 'aavu venna',
      'வெண்ணெய்', 'vennai'
    ]
  },
  {
    id: 'milk',
    canonicalName: 'milk',
    displayName: 'Milk',
    category: 'dairy',
    subcategory: 'liquid emulsion',
    scientificName: 'Bos taurus lac',
    icon: '🥛',
    basePriceKg: 52,
    multilingual: {
      en: 'Milk',
      kn: 'ಹಾಲು',
      hi: 'दूध',
      te: 'పాలు',
      ta: 'பால்'
    },
    aliases: [
      'milk', 'cow milk', 'toned milk', 'whole milk', 'buffalo milk',
      'ಹಾಲು', 'ಹಸುವಿನ ಹಾಲು', 'haalu', 'kalanja haalu',
      'दूध', 'गाय का दूध', 'doodh', 'dudh',
      'పాలు', 'ఆవు పాలు', 'paalu',
      'பால்', 'பசுவின் பால்', 'paal'
    ]
  },
  {
    id: 'paneer',
    canonicalName: 'paneer',
    displayName: 'Paneer (Cottage Cheese)',
    category: 'dairy',
    subcategory: 'coagulated curd',
    icon: '🧀',
    basePriceKg: 380,
    multilingual: {
      en: 'Paneer',
      kn: 'ಪನೀರ್',
      hi: 'पनीर',
      te: 'పనీర్',
      ta: 'பன்னீர்'
    },
    aliases: [
      'paneer', 'cottage cheese', 'fresh paneer',
      'ಪನೀರ್', 'paneer',
      'पनीर', 'paneer',
      'పనీర్', 'paneer',
      'பன்னீர்', 'paneer'
    ]
  },
  {
    id: 'ghee',
    canonicalName: 'ghee',
    displayName: 'Ghee (Clarified Butter)',
    category: 'dairy',
    subcategory: 'clarified butterfat',
    icon: '🏺',
    basePriceKg: 680,
    multilingual: {
      en: 'Ghee',
      kn: 'ತುಪ್ಪ',
      hi: 'घी',
      te: 'నెయ్యి',
      ta: 'நெய்'
    },
    aliases: [
      'ghee', 'clarified butter', 'desi ghee', 'bilona ghee',
      'ತುಪ್ಪ', 'ಹಸುವಿನ ತುಪ್ಪ', 'thuppa', 'tuppa',
      'घी', 'देसी घी', 'ghee', 'desi ghee',
      'నెయ్యి', 'neyyi',
      'நெய்', 'ney'
    ]
  },
  {
    id: 'curd',
    canonicalName: 'curd',
    displayName: 'Curd (Dahi / Yogurt)',
    category: 'dairy',
    subcategory: 'fermented dairy',
    icon: '🥣',
    basePriceKg: 70,
    multilingual: {
      en: 'Curd',
      kn: 'ಮೊಸರು',
      hi: 'दही',
      te: 'పెరుగు',
      ta: 'தயிர்'
    },
    aliases: [
      'curd', 'dahi', 'yogurt', 'yoghurt',
      'ಮೊಸರು', 'mosaru',
      'दही', 'dahi',
      'పెరుగు', 'perugu',
      'தயிர்', 'thayir', 'tayir'
    ]
  },

  // ================= DRY FRUITS & NUTS =================
  {
    id: 'almond',
    canonicalName: 'almond',
    displayName: 'Almond',
    category: 'dry-fruit',
    subcategory: 'tree nut',
    scientificName: 'Prunus dulcis',
    icon: '🌰',
    basePriceKg: 850,
    multilingual: {
      en: 'Almond',
      kn: 'ಬಾದಾಮಿ',
      hi: 'बादाम',
      te: 'బాదం',
      ta: 'பாதாம்'
    },
    aliases: [
      'almond', 'almonds', 'badam', 'mamra almond',
      'ಬಾದಾಮಿ', 'ಬಾದಾಮ', 'badami', 'badam',
      'बादाम', 'badam', 'baadaam',
      'బాదం', 'బాదంపప్పు', 'badam',
      'பாதாம்', 'பாதாம்பருப்பு', 'paadhaam'
    ]
  },
  {
    id: 'cashew',
    canonicalName: 'cashew',
    displayName: 'Cashew',
    category: 'dry-fruit',
    subcategory: 'tree nut',
    scientificName: 'Anacardium occidentale',
    icon: '🥜',
    basePriceKg: 780,
    multilingual: {
      en: 'Cashew',
      kn: 'ಗೋಡಂಬಿ',
      hi: 'काजू',
      te: 'జీడిపప్పు',
      ta: 'முந்திரி'
    },
    aliases: [
      'cashew', 'cashews', 'kaju', 'cashew nut',
      'ಗೋಡಂಬಿ', 'godambi',
      'काजू', 'kaju',
      'జీడిపప్పు', 'jeedipappu',
      'முந்திரி', 'munthiri'
    ]
  },
  {
    id: 'walnut',
    canonicalName: 'walnut',
    displayName: 'Walnut',
    category: 'dry-fruit',
    subcategory: 'tree nut',
    scientificName: 'Juglans regia',
    icon: '🌰',
    basePriceKg: 950,
    multilingual: {
      en: 'Walnut',
      kn: 'ಅಕ್ರೋಟ',
      hi: 'अखरोट',
      te: 'అక్రోటు',
      ta: 'அக்ரூட்'
    },
    aliases: [
      'walnut', 'walnuts', 'akhrot',
      'ಅಕ್ರೋಟ', 'akrota',
      'अखरोट', 'akhrot',
      'అక్రోటు', 'akrotu',
      'அக்ரூட்', 'akroot'
    ]
  },

  // ================= GRAINS, PULSES & FLOURS =================
  {
    id: 'rice',
    canonicalName: 'rice',
    displayName: 'Rice',
    category: 'grain',
    subcategory: 'cereal grain',
    scientificName: 'Oryza sativa',
    icon: '🌾',
    basePriceKg: 54,
    multilingual: {
      en: 'Rice',
      kn: 'ಅಕ್ಕಿ',
      hi: 'चावल',
      te: 'బియ్యం',
      ta: 'அரிசி'
    },
    aliases: [
      'rice', 'paddy', 'basmati', 'sona masoori',
      'ಅಕ್ಕಿ', 'ಭತ್ತ', 'akki', 'bhatta',
      'चावल', 'धान', 'chawal', 'dhan',
      'బియ్యం', 'వరి', 'biyyam', 'vari',
      'அரிசி', 'நெல்', 'arisi', 'nel'
    ]
  },
  {
    id: 'wheat',
    canonicalName: 'wheat',
    displayName: 'Wheat',
    category: 'grain',
    subcategory: 'cereal grain',
    scientificName: 'Triticum aestivum',
    icon: '🌾',
    basePriceKg: 32,
    multilingual: {
      en: 'Wheat',
      kn: 'ಗೋಧಿ',
      hi: 'गेहूं',
      te: 'గోధుమలు',
      ta: 'கோதுமை'
    },
    aliases: [
      'wheat', 'milling wheat', 'sharbati wheat',
      'ಗೋಧಿ', 'godhi',
      'गेहूं', 'gehun', 'gehu',
      'గోధుమలు', 'godhumalu',
      'கோதுமை', 'godhumai'
    ]
  },
  {
    id: 'wheat-flour',
    canonicalName: 'wheat-flour',
    displayName: 'Wheat Flour (Atta)',
    category: 'flour',
    subcategory: 'cereal flour',
    icon: '🥡',
    basePriceKg: 42,
    multilingual: {
      en: 'Wheat Flour',
      kn: 'ಗೋಧಿ ಹಿಟ್ಟು',
      hi: 'आटा',
      te: 'గోధుమ పిండి',
      ta: 'கோதுமை மாவு'
    },
    aliases: [
      'wheat flour', 'atta', 'chakki atta', 'flour',
      'ಗೋಧಿ ಹಿಟ್ಟು', 'ಹಿಟ್ಟು', 'godhi hittu', 'hittu',
      'आटा', 'गेहूं का आटा', 'aata', 'atta',
      'గోధుమ పిండి', 'పిండి', 'godhuma pindi', 'pindi',
      'கோதுமை மாவு', 'மாவு', 'godhumai maavu', 'maavu'
    ]
  },
  {
    id: 'chickpea',
    canonicalName: 'chickpea',
    displayName: 'Chickpea (Chana)',
    category: 'pulse',
    subcategory: 'legume pulse',
    scientificName: 'Cicer arietinum',
    icon: '🫘',
    basePriceKg: 78,
    multilingual: {
      en: 'Chickpea',
      kn: 'ಕಡಲೆಕಾಳು',
      hi: 'चना',
      te: 'శనగలు',
      ta: 'கொண்டைக்கடலை'
    },
    aliases: [
      'chickpea', 'chana', 'bengal gram', 'garbanzo', 'kabuli chana',
      'ಕಡಲೆಕಾಳು', 'ಕಡಲೆ', 'kadale', 'kadalekalu',
      'चना', 'छोले', 'chana', 'chhole',
      'శనగలు', 'శనగ పప్పు', 'senagalu', 'chanagalu',
      'கொண்டைக்கடலை', 'kondaikadala'
    ]
  },

  // ================= SPICES & BEVERAGES =================
  {
    id: 'cardamom',
    canonicalName: 'cardamom',
    displayName: 'Cardamom (Elaichi)',
    category: 'spice',
    subcategory: 'aromatic pod',
    scientificName: 'Elettaria cardamomum',
    icon: '🌿',
    basePriceKg: 1950,
    multilingual: {
      en: 'Cardamom',
      kn: 'ಏಲಕ್ಕಿ',
      hi: 'इलायची',
      te: 'యాలకులు',
      ta: 'ஏலக்காய்'
    },
    aliases: [
      'cardamom', 'green cardamom', 'elaichi', 'chhoti elaichi',
      'ಏಲಕ್ಕಿ', 'ಯಾಲಕ್ಕಿ', 'elakki', 'yalakki',
      'इलायची', 'छोटी इलायची', 'elaichi', 'ilaychi',
      'యాలకులు', 'యాలకుల', 'yalukalu',
      'ஏலக்காய்', 'elakkai'
    ]
  },
  {
    id: 'coffee',
    canonicalName: 'coffee',
    displayName: 'Coffee Beans',
    category: 'spice',
    subcategory: 'beverage seed',
    scientificName: 'Coffea arabica',
    icon: '☕',
    basePriceKg: 215,
    multilingual: {
      en: 'Coffee',
      kn: 'ಕಾಫಿ ಬೀಜ',
      hi: 'कॉफ़ी',
      te: 'కాఫీ',
      ta: 'காபி'
    },
    aliases: [
      'coffee', 'coffee beans', 'arabica', 'robusta', 'filter coffee',
      'ಕಾಫಿ', 'ಕಾಫಿ ಬೀಜ', 'kaapi', 'kafi',
      'कॉफ़ी', 'कॉफी', 'coffee',
      'కాఫీ', 'కాఫీ గింజలు', 'coffee',
      'காபி', 'காபி கொட்டை', 'kaapi'
    ]
  },
  {
    id: 'tea',
    canonicalName: 'tea',
    displayName: 'Tea',
    category: 'spice',
    subcategory: 'beverage leaf',
    scientificName: 'Camellia sinensis',
    icon: '🍵',
    basePriceKg: 460,
    multilingual: {
      en: 'Tea',
      kn: 'ಚಹಾ',
      hi: 'चाय',
      te: 'టీ',
      ta: 'தேநீர்'
    },
    aliases: [
      'tea', 'black tea', 'ctc tea', 'green tea', 'chai',
      'ಚಹಾ', 'ಟೀ', 'chaha', 'tea',
      'चाय', 'चायपत्ती', 'chai', 'chaipatti',
      'టీ', 'తేయాకు', 'tea',
      'தேநீர்', 'தேயிலை', 'theneer'
    ]
  },
  {
    id: 'turmeric',
    canonicalName: 'turmeric',
    displayName: 'Turmeric',
    category: 'spice',
    subcategory: 'rhizome',
    scientificName: 'Curcuma longa',
    icon: '🟡',
    basePriceKg: 165,
    multilingual: {
      en: 'Turmeric',
      kn: 'ಅರಿಶಿನ',
      hi: 'हल्दी',
      te: 'పసుపు',
      ta: 'மஞ்சள்'
    },
    aliases: [
      'turmeric', 'haldi', 'curcuma',
      'ಅರಿಶಿನ', 'ಅರಶಿಣ', 'arishina', 'arashina',
      'हल्दी', 'haldi', 'haldee',
      'పసుపు', 'pasupu',
      'மஞ்சள்', 'manjal'
    ]
  },
  {
    id: 'black-pepper',
    canonicalName: 'black-pepper',
    displayName: 'Black Pepper (Kalimirch)',
    category: 'spice',
    subcategory: 'king of spices / peppercorn',
    scientificName: 'Piper nigrum',
    icon: '⚫',
    basePriceKg: 1100,
    multilingual: {
      en: 'Black Pepper',
      kn: 'ಕಾಳುಮೆಣಸು',
      hi: 'काली मिर्च',
      te: 'మిరియాలు',
      ta: 'மிளகு'
    },
    aliases: [
      'black pepper', 'pepper', 'black-pepper', 'kalimirch', 'kali mirch', 'peppercorn', 'black peppercorn', 'piper nigrum',
      'ಕಾಳುಮೆಣಸು', 'ಕಪ್ಪು ಮೆಣಸು', 'ಕಾಳು ಮೆಣಸು', 'kalu menasu', 'kalumenasu', 'kappu menasu',
      'काली मिर्च', 'कालीमिर्च', 'गोल मिर्च', 'kali mirch', 'kalimirch', 'gol mirch',
      'మిరియాలు', 'నల్ల మిరియాలు', 'miriyalu', 'nalla miriyalu',
      'மிளகு', 'கருப்பு மிளகு', 'milagu', 'karuppu milagu'
    ]
  },
  {
    id: 'white-pepper',
    canonicalName: 'white-pepper',
    displayName: 'White Pepper (Safed Mirch)',
    category: 'spice',
    subcategory: 'decorticated peppercorn',
    scientificName: 'Piper nigrum (Decorticated)',
    icon: '⚪',
    basePriceKg: 1350,
    multilingual: {
      en: 'White Pepper',
      kn: 'ಬಿಳಿ ಮೆಣಸು',
      hi: 'सफेद मिर्च',
      te: 'తెల్ల మిరియాలు',
      ta: 'வெள்ளை மிளகு'
    },
    aliases: [
      'white pepper', 'white peppercorn', 'safed mirch', 'safed mirchi', 'white-pepper',
      'ಬಿಳಿ ಮೆಣಸು', 'bili menasu', 'bili menasina kalu',
      'सफेद मिर्च', 'दखनी मिर्च', 'safed mirch', 'dakhni mirch',
      'తెల్ల మిరియాలు', 'thella miriyalu',
      'வெள்ளை மிளகு', 'vellai milagu'
    ]
  },
  {
    id: 'green-peppercorn',
    canonicalName: 'green-peppercorn',
    displayName: 'Green Peppercorns (Kacha Menasu)',
    category: 'spice',
    subcategory: 'unripe preserved peppercorn',
    scientificName: 'Piper nigrum (Unripe Berry)',
    icon: '🟢',
    basePriceKg: 850,
    multilingual: {
      en: 'Green Peppercorns',
      kn: 'ಹಸಿ ಕಾಳುಮೆಣಸು',
      hi: 'हरी काली मिर्च',
      te: 'పచ్చి మిరియాలు',
      ta: 'பச்சை மிளகு'
    },
    aliases: [
      'green peppercorn', 'green peppercorns', 'green pepper spice', 'green-peppercorn', 'fresh green pepper',
      'ಹಸಿ ಕಾಳುಮೆಣಸು', 'ಹಸಿ ಮೆಣಸು', 'hasi kalumenasu', 'kacha menasu',
      'हरी काली मिर्च', 'कच्ची काली मिर्च', 'hari kali mirch', 'kacchi kali mirch',
      'పచ్చి మిరియాలు', 'pachi miriyalu',
      'பச்சை மிளகு', 'pachai milagu'
    ]
  }
];

export interface ProductMatchResult {
  matched: boolean;
  product: ProductCatalogEntry | null;
  matchType: 'EXACT_CANONICAL' | 'EXACT_ALIAS' | 'WORD_BOUNDARY' | 'CATEGORY_AWARE' | 'FUZZY' | 'NONE';
  confidence: number;
}

/**
 * Clean and normalize a product name query
 */
export function normalizeProductName(input: string): string {
  if (!input) return '';
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '') // Keep letters (including Indic scripts), numbers, spaces, hyphens
    .replace(/\s+/g, ' ');
}

/**
 * Resolves any freeform user input (English, Kannada, Hindi, Telugu, Tamil, romanized)
 * to its exact authoritative ProductCatalogEntry.
 * Returns null if no authentic match exists.
 */
export function resolveProduct(
  input: string,
  preferredCategory?: ProductCategory
): ProductCatalogEntry | null {
  const result = matchProduct(input, preferredCategory);
  return result.matched ? result.product : null;
}

/**
 * Comprehensive match engine executing the strict 6-tier prioritization.
 * CRITICAL: "Butter" will NEVER match "Butter Fruit".
 * "Butter Fruit" will NEVER match "Butter".
 */
export function matchProduct(
  input: string,
  preferredCategory?: ProductCategory
): ProductMatchResult {
  const clean = normalizeProductName(input);
  if (!clean) {
    return { matched: false, product: null, matchType: 'NONE', confidence: 0 };
  }

  // TIER 1: Exact Normalized Canonical ID Match
  for (const entry of CENTRAL_PRODUCT_CATALOG) {
    if (clean === entry.id || clean === entry.canonicalName) {
      return {
        matched: true,
        product: entry,
        matchType: 'EXACT_CANONICAL',
        confidence: 1.0
      };
    }
  }

  // TIER 2: Exact Alias Match (Case-insensitive full string equality)
  for (const entry of CENTRAL_PRODUCT_CATALOG) {
    for (const alias of entry.aliases) {
      if (clean === normalizeProductName(alias)) {
        return {
          matched: true,
          product: entry,
          matchType: 'EXACT_ALIAS',
          confidence: 0.99
        };
      }
    }
  }

  // TIER 3: Exact Whole Word Boundary Match
  // Special discrimination guard: If query has 'fruit' and mentions butter, prioritize 'butter-fruit'.
  // If query does NOT have 'fruit', 'butter' MUST match 'butter' (dairy) and NEVER 'butter-fruit'.
  const words = clean.split(' ').filter(Boolean);
  const isButterFruitExplicit = clean.includes('butter fruit') || clean.includes('butterfruit') || clean.includes('avocado') || clean.includes('ಬೆಣ್ಣೆ ಹಣ್ಣು') || clean.includes('बटर फ्रूट');

  if (isButterFruitExplicit) {
    const bf = CENTRAL_PRODUCT_CATALOG.find(p => p.id === 'butter-fruit');
    if (bf) {
      return { matched: true, product: bf, matchType: 'EXACT_ALIAS', confidence: 0.98 };
    }
  }

  // If query is specifically about 'butter' without 'fruit'
  if (clean === 'butter' || clean === 'makkan' || clean === 'makkhan' || clean === 'ಬೆಣ್ಣೆ' || clean === 'मक्खन' || clean === 'வெண்ணெய்' || clean === 'వెన్న') {
    const butter = CENTRAL_PRODUCT_CATALOG.find(p => p.id === 'butter');
    if (butter) {
      return { matched: true, product: butter, matchType: 'EXACT_CANONICAL', confidence: 1.0 };
    }
  }

  // Special discrimination guard: Bell Pepper / Capsicum vs Black Pepper (Spice)
  const isBellPepperExplicit = clean.includes('bell pepper') || clean.includes('sweet pepper') || clean.includes('shimla mirch') || clean.includes('shimlamirch') || clean.includes('capsicum') || clean.includes('ದಪ್ಪ ಮೆಣಸಿನಕಾಯಿ');
  if (isBellPepperExplicit) {
    const cp = CENTRAL_PRODUCT_CATALOG.find(p => p.id === 'capsicum');
    if (cp) {
      return { matched: true, product: cp, matchType: 'EXACT_ALIAS', confidence: 0.99 };
    }
  }

  // White Pepper (Decorticated Piper nigrum)
  if (clean.includes('white pepper') || clean.includes('safed mirch') || clean.includes('safed mirchi') || clean.includes('bili menasu') || clean.includes('thella miriyalu') || clean.includes('vellai milagu')) {
    const wp = CENTRAL_PRODUCT_CATALOG.find(p => p.id === 'white-pepper');
    if (wp) {
      return { matched: true, product: wp, matchType: 'EXACT_ALIAS', confidence: 0.99 };
    }
  }

  // Green Peppercorns (Unripe preserved Piper nigrum)
  if (clean.includes('green peppercorn') || clean.includes('green pepper spice') || clean.includes('kacha menasu') || clean.includes('hasi kalumenasu') || clean.includes('hari kali mirch') || clean.includes('pachi miriyalu')) {
    const gp = CENTRAL_PRODUCT_CATALOG.find(p => p.id === 'green-peppercorn');
    if (gp) {
      return { matched: true, product: gp, matchType: 'EXACT_ALIAS', confidence: 0.99 };
    }
  }

  // If query is specifically about 'pepper' / 'black pepper' (Spice - Piper nigrum)
  if (clean === 'pepper' || clean === 'black pepper' || clean === 'black-pepper' || clean === 'kalimirch' || clean === 'kali mirch' || clean === 'peppercorn' || clean === 'ಕಾಳುಮೆಣಸು' || clean === 'ಕಪ್ಪು ಮೆಣಸು' || clean === 'काली मिर्च' || clean === 'మిరియాలు' || clean === 'மிளகு') {
    const bp = CENTRAL_PRODUCT_CATALOG.find(p => p.id === 'black-pepper');
    if (bp) {
      return { matched: true, product: bp, matchType: 'EXACT_CANONICAL', confidence: 1.0 };
    }
  }

  // Check whole-word boundary for aliases (longest aliases first)
  const sortedEntries = [...CENTRAL_PRODUCT_CATALOG];
  for (const entry of sortedEntries) {
    // If preferredCategory is specified, prefer matches in that category
    if (preferredCategory && entry.category !== preferredCategory) continue;

    for (const alias of entry.aliases) {
      const cleanAlias = normalizeProductName(alias);
      if (!cleanAlias) continue;

      // Exact phrase match
      if (clean === cleanAlias) {
        return { matched: true, product: entry, matchType: 'EXACT_ALIAS', confidence: 0.98 };
      }

      // If user input is multi-word like "tomato price", match "tomato" if whole word
      const regex = new RegExp(`(^|\\s)${escapeRegExp(cleanAlias)}(\\s|$)`, 'i');
      if (regex.test(clean)) {
        // Guard against false prefix/suffix matches (e.g. "butter" in "butter fruit")
        if (cleanAlias === 'butter' && clean.includes('fruit')) {
          continue; // Skip dairy butter if query explicitly says fruit
        }
        if (cleanAlias === 'pepper' && (clean.includes('bell') || clean.includes('sweet') || clean.includes('capsicum'))) {
          continue; // Skip black pepper if query explicitly says bell pepper
        }
        if (cleanAlias === 'capsicum' && clean.includes('black')) {
          continue; // Skip capsicum if query explicitly says black pepper
        }
        return { matched: true, product: entry, matchType: 'WORD_BOUNDARY', confidence: 0.95 };
      }
    }
  }

  // If preferredCategory was specified and not matched, retry without category filter
  if (preferredCategory) {
    return matchProduct(input, undefined);
  }

  // TIER 4: High-Threshold Fuzzy Match (Levenshtein distance <= 2 for words >= 5 chars)
  let bestMatch: ProductCatalogEntry | null = null;
  let bestScore = 0;

  for (const entry of CENTRAL_PRODUCT_CATALOG) {
    for (const alias of entry.aliases) {
      const cleanAlias = normalizeProductName(alias);
      // Only compare words of similar length
      if (Math.abs(clean.length - cleanAlias.length) <= 2) {
        const similarity = computeSimilarity(clean, cleanAlias);
        if (similarity > 0.82 && similarity > bestScore) {
          bestScore = similarity;
          bestMatch = entry;
        }
      }
    }
  }

  if (bestMatch && bestScore >= 0.82) {
    return {
      matched: true,
      product: bestMatch,
      matchType: 'FUZZY',
      confidence: parseFloat(bestScore.toFixed(2))
    };
  }

  // TIER 5: NONE (Never guess or default to Mango / Onion / Coffee!)
  return {
    matched: false,
    product: null,
    matchType: 'NONE',
    confidence: 0
  };
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function computeSimilarity(s1: string, s2: string): number {
  if (s1 === s2) return 1.0;
  if (!s1 || !s2) return 0;
  
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;
  const longerLength = longer.length;
  if (longerLength === 0) return 1.0;

  const distance = editDistance(longer, shorter);
  return (longerLength - distance) / longerLength;
}

function editDistance(s1: string, s2: string): number {
  const costs: number[] = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else if (j > 0) {
        let newValue = costs[j - 1];
        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

export interface PepperCommodityOption {
  id: string;
  name: string;
  scientificName: string;
  category: string;
  indicName: string;
  approxRateKg: number;
  icon: string;
  description: string;
}

export const PEPPER_COMMODITY_OPTIONS: PepperCommodityOption[] = [
  {
    id: 'black-pepper',
    name: 'Black Pepper (Kali Mirch)',
    scientificName: 'Piper nigrum',
    category: 'Spice',
    indicName: 'काली मिर्च / ಕಾಳುಮೆಣಸು',
    approxRateKg: 1100,
    icon: '⚫',
    description: 'Dried whole black peppercorns (King of Spices) with pungent piperine'
  },
  {
    id: 'capsicum',
    name: 'Bell Pepper / Capsicum (Shimla Mirch)',
    scientificName: 'Capsicum annuum var. grossum',
    category: 'Vegetable',
    indicName: 'शिमला मिर्च / ದಪ್ಪ ಮೆಣಸಿನಕಾಯಿ',
    approxRateKg: 48,
    icon: '🫑',
    description: 'Crisp, sweet, blocky bell pepper vegetable'
  },
  {
    id: 'white-pepper',
    name: 'White Pepper (Safed Mirch)',
    scientificName: 'Piper nigrum (Decorticated)',
    category: 'Spice',
    indicName: 'सफेद मिर्च / ಬಿಳಿ ಮೆಣಸು',
    approxRateKg: 1350,
    icon: '⚪',
    description: 'Fully ripened berry with outer pericarp removed'
  },
  {
    id: 'green-peppercorn',
    name: 'Green Peppercorns (Kacha Menasu)',
    scientificName: 'Piper nigrum (Unripe)',
    category: 'Spice',
    indicName: 'कच्ची काली मिर्च / ಹಸಿ ಕಾಳುಮೆಣಸು',
    approxRateKg: 850,
    icon: '🟢',
    description: 'Unripe green peppercorns preserved in brine or dehydrated'
  },
  {
    id: 'green-chilli',
    name: 'Chilli Pepper (Hari Mirch / Hot Chilli)',
    scientificName: 'Capsicum annuum',
    category: 'Vegetable',
    indicName: 'हरी मिर्च / ಹಸಿ ಮೆಣಸಿನಕಾಯಿ',
    approxRateKg: 78,
    icon: '🌶️',
    description: 'Hot pungent culinary chilli pepper'
  }
];

export function isAmbiguousPepperQuery(input: string): boolean {
  const clean = (input || '').toLowerCase().trim();
  return clean === 'pepper' || clean === 'peppers' || clean === 'pepper query';
}
