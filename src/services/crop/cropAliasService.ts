/**
 * Universal Crop & Commodity Alias & Fuzzy Recognition Service
 * Maps regional Indian names, synonyms, botanical names, and misspellings to canonical commodity IDs.
 * Aligned with SIH26236 Master Food Commodity Classification.
 */

import { matchProduct } from '../catalog/productNormalizationService';

export interface CropAliasMapping {
  canonicalId: string;
  name: string;
  scientificName: string;
  category: 
    | 'Vegetable' 
    | 'Fruit' 
    | 'Grain' 
    | 'Pulse' 
    | 'Dry Fruit' 
    | 'Oil & Oilseed' 
    | 'Dairy' 
    | 'Flour' 
    | 'Spice' 
    | 'Tea & Coffee' 
    | 'Processed Product'
    | 'Greens';
  aliases: string[];
}

export const CANONICAL_CROP_ALIASES: CropAliasMapping[] = [
  // ==========================================
  // 1. FRESH VEGETABLES
  // ==========================================
  {
    canonicalId: 'okra',
    name: "Okra (Lady's Finger)",
    scientificName: 'Abelmoschus esculentus',
    category: 'Vegetable',
    aliases: [
      'okra', 'lady finger', 'ladies finger', "lady's finger", 'bhindi', 'bhendi', 
      'bendekayi', 'bendakaya', 'vendakkai', 'dharosh', 'abelmoschus esculentus', 
      'gumbo', 'tender okra', 'green okra', 'bamia', 'bhinda'
    ]
  },
  {
    canonicalId: 'brinjal',
    name: 'Brinjal (Eggplant)',
    scientificName: 'Solanum melongena',
    category: 'Vegetable',
    aliases: [
      'brinjal', 'eggplant', 'aubergine', 'baingan', 'baigan', 'vangi', 'badanekayi', 
      'vankaya', 'kathirikai', 'begun', 'bataon', 'melongena', 'solanum melongena',
      'purple brinjal', 'green brinjal', 'round brinjal', 'bhanta', 'gulla'
    ]
  },
  {
    canonicalId: 'tomato',
    name: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    category: 'Vegetable',
    aliases: [
      'tomato', 'tamatar', 'tomaato', 'tameta', 'tamate', 'ramamulaga', 'thakkali', 
      'solanum lycopersicum', 'lycopersicon', 'cherry tomato', 'roma tomato', 'desi tomato'
    ]
  },
  {
    canonicalId: 'potato',
    name: 'Potato',
    scientificName: 'Solanum tuberosum',
    category: 'Vegetable',
    aliases: [
      'potato', 'alu', 'aloo', 'batata', 'alugadde', 'bangaladumpa', 'urulaikizhangu', 
      'solanum tuberosum', 'russet potato', 'pahadi aloo', 'jyoti potato', 'kufri aloo'
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
    canonicalId: 'garlic',
    name: 'Garlic',
    scientificName: 'Allium sativum',
    category: 'Vegetable',
    aliases: [
      'garlic', 'lahsun', 'lasun', 'bellulli', 'vellulli', 'poondu', 'rasuna', 
      'allium sativum', 'cured garlic', 'garlic bulbs', 'desi lahsun'
    ]
  },
  {
    canonicalId: 'ginger',
    name: 'Ginger',
    scientificName: 'Zingiber officinale',
    category: 'Vegetable',
    aliases: [
      'ginger', 'adrak', 'allam', 'shunti', 'inji', 'ada', 'zingiber officinale', 
      'fresh ginger', 'green ginger', 'rhizome'
    ]
  },
  {
    canonicalId: 'green-chilli',
    name: 'Green Chilli',
    scientificName: 'Capsicum frutescens',
    category: 'Vegetable',
    aliases: [
      'green chilli', 'hari mirch', 'hasiru menasinakayi', 'pachi mirapakaya', 
      'pachai milagai', 'kacha morich', 'capsicum frutescens', 'spicy green chilli', 'chilli'
    ]
  },
  {
    canonicalId: 'red-chilli',
    name: 'Red Chilli (Fresh/Whole)',
    scientificName: 'Capsicum annuum',
    category: 'Vegetable',
    aliases: [
      'red chilli', 'lal mirch', 'kempu menasinakayi', 'erra mirapakaya', 
      'sivappu milagai', 'lal morich', 'fresh red chilli', 'byadgi chilli', 'guntur chilli'
    ]
  },
  {
    canonicalId: 'capsicum',
    name: 'Capsicum (Bell Pepper)',
    scientificName: 'Capsicum annuum var. grossum',
    category: 'Vegetable',
    aliases: [
      'capsicum', 'bell pepper', 'shimla mirch', 'simla mirch', 'donne menasinakayi', 
      'bengaluru mirapa', 'kuda milagai', 'sweet pepper', 'green capsicum', 'yellow capsicum'
    ]
  },
  {
    canonicalId: 'cucumber',
    name: 'Cucumber',
    scientificName: 'Cucumis sativus',
    category: 'Vegetable',
    aliases: [
      'cucumber', 'kheera', 'kakdi', 'southekayi', 'dosakaya', 'vellarikkai', 
      'shosha', 'cucumis sativus', 'green cucumber', 'english cucumber'
    ]
  },
  {
    canonicalId: 'carrot',
    name: 'Carrot',
    scientificName: 'Daucus carota',
    category: 'Vegetable',
    aliases: [
      'carrot', 'gajar', 'gaajar', 'gajjari', 'carrotu', 'manjal mullangi', 
      'daucus carota', 'red carrot', 'orange carrot', 'desi gajar'
    ]
  },
  {
    canonicalId: 'radish',
    name: 'Radish',
    scientificName: 'Raphanus sativus',
    category: 'Vegetable',
    aliases: [
      'radish', 'mooli', 'mula', 'mullangi', 'mulangi', 'raphanus sativus', 
      'white radish', 'daikon'
    ]
  },
  {
    canonicalId: 'beetroot',
    name: 'Beetroot',
    scientificName: 'Beta vulgaris',
    category: 'Vegetable',
    aliases: [
      'beetroot', 'beet', 'chukandar', 'beet root', 'beta vulgaris', 'red beet'
    ]
  },
  {
    canonicalId: 'turnip',
    name: 'Turnip',
    scientificName: 'Brassica rapa subsp. rapa',
    category: 'Vegetable',
    aliases: [
      'turnip', 'shalgam', 'salgam', 'shalgum', 'brassica rapa', 'white turnip'
    ]
  },
  {
    canonicalId: 'sweet-potato',
    name: 'Sweet Potato',
    scientificName: 'Ipomoea batatas',
    category: 'Vegetable',
    aliases: [
      'sweet potato', 'shakarkand', 'genasu', 'chilagada dumpa', 'sakkaravalli kizhangu', 
      'ipomoea batatas', 'yams sweet'
    ]
  },
  {
    canonicalId: 'yam',
    name: 'Elephant Foot Yam (Suran)',
    scientificName: 'Amorphophallus paeoniifolius',
    category: 'Vegetable',
    aliases: [
      'yam', 'suran', 'jimikand', 'suvarnagadde', 'kanda gadda', 'senai kizhangu', 
      'elephant foot yam', 'amorphophallus'
    ]
  },
  {
    canonicalId: 'colocasia',
    name: 'Colocasia (Arbi / Taro)',
    scientificName: 'Colocasia esculenta',
    category: 'Vegetable',
    aliases: [
      'colocasia', 'arbi', 'arvi', 'taro', 'kachalu', 'chembu', 'kesavina gadde', 
      'chama dumpa', 'seppankizhangu', 'colocasia esculenta'
    ]
  },
  {
    canonicalId: 'bottle-gourd',
    name: 'Bottle Gourd (Lauki)',
    scientificName: 'Lagenaria siceraria',
    category: 'Vegetable',
    aliases: [
      'bottle gourd', 'lauki', 'doodhi', 'dudhi', 'sorekayi', 'anapakaya', 'sorakkai', 
      'lau', 'lagenaria siceraria', 'calabash'
    ]
  },
  {
    canonicalId: 'ridge-gourd',
    name: 'Ridge Gourd (Turai)',
    scientificName: 'Luffa acutangula',
    category: 'Vegetable',
    aliases: [
      'ridge gourd', 'turai', 'torai', 'tori', 'heerekayi', 'beerakaya', 'peerkangai', 
      'jhinga', 'luffa acutangula'
    ]
  },
  {
    canonicalId: 'snake-gourd',
    name: 'Snake Gourd (Chichinda)',
    scientificName: 'Trichosanthes cucumerina',
    category: 'Vegetable',
    aliases: [
      'snake gourd', 'chichinda', 'padwal', 'padavalakayi', 'potlakaya', 'pudalangai', 
      'chichinga', 'trichosanthes cucumerina'
    ]
  },
  {
    canonicalId: 'bitter-gourd',
    name: 'Bitter Gourd (Karela)',
    scientificName: 'Momordica charantia',
    category: 'Vegetable',
    aliases: [
      'bitter gourd', 'karela', 'karelaa', 'hagalakayi', 'kakarakaya', 'pavakkai', 
      'korola', 'momordica charantia', 'bitter melon'
    ]
  },
  {
    canonicalId: 'pumpkin',
    name: 'Pumpkin (Kaddu)',
    scientificName: 'Cucurbita moschata',
    category: 'Vegetable',
    aliases: [
      'pumpkin', 'kaddu', 'sitaphal pumpkin', 'kumbalakayi', 'gummadikaya', 'parangikai', 
      'kumro', 'cucurbita moschata', 'yellow pumpkin'
    ]
  },
  {
    canonicalId: 'ash-gourd',
    name: 'Ash Gourd (Petha)',
    scientificName: 'Benincasa hispida',
    category: 'Vegetable',
    aliases: [
      'ash gourd', 'petha', 'safed petha', 'boodukumbalakayi', 'boodida gummadikaya', 
      'neer poosanikai', 'chalkumro', 'benincasa hispida', 'wax gourd', 'white gourd'
    ]
  },
  {
    canonicalId: 'drumstick',
    name: 'Drumstick (Moringa)',
    scientificName: 'Moringa oleifera',
    category: 'Vegetable',
    aliases: [
      'drumstick', 'moringa', 'sahjan', 'shevaga', 'nuggekayi', 'munagakaya', 
      'murungakkai', 'sojne danta', 'moringa oleifera'
    ]
  },
  {
    canonicalId: 'green-beans',
    name: 'Green Beans (French Beans)',
    scientificName: 'Phaseolus vulgaris',
    category: 'Vegetable',
    aliases: [
      'green beans', 'french beans', 'beans', 'pharasbi', 'hurulikayi', 'beans kaya', 
      'beans french', 'phaseolus vulgaris'
    ]
  },
  {
    canonicalId: 'cluster-beans',
    name: 'Cluster Beans (Guar)',
    scientificName: 'Cyamopsis tetragonoloba',
    category: 'Vegetable',
    aliases: [
      'cluster beans', 'guar', 'gavar', 'goru chikkudu', 'gorikayi', 'kothavarangai', 
      'cyamopsis tetragonoloba'
    ]
  },
  {
    canonicalId: 'broad-beans',
    name: 'Broad Beans (Sem / Bakla)',
    scientificName: 'Vicia faba',
    category: 'Vegetable',
    aliases: [
      'broad beans', 'sem', 'bakla', 'chikkudukaya', 'avarekayi fresh', 'faba beans', 'vicia faba'
    ]
  },
  {
    canonicalId: 'peas',
    name: 'Green Peas (Matar)',
    scientificName: 'Pisum sativum',
    category: 'Vegetable',
    aliases: [
      'peas', 'green peas', 'matar', 'mattar', 'batani', 'batanilu', 'pattani', 
      'motorshuti', 'pisum sativum', 'fresh green peas'
    ]
  },
  {
    canonicalId: 'sweet-corn',
    name: 'Sweet Corn / Maize Cob',
    scientificName: 'Zea mays var. saccharata',
    category: 'Vegetable',
    aliases: [
      'sweet corn', 'corn', 'bhutta', 'makka', 'musukina jola', 'mokka jonnalu', 
      'solam', 'bhutta fresh', 'corn cob', 'zea mays'
    ]
  },
  {
    canonicalId: 'baby-corn',
    name: 'Baby Corn',
    scientificName: 'Zea mays',
    category: 'Vegetable',
    aliases: [
      'baby corn', 'babycorn', 'tender corn', 'chhota bhutta', 'baby zea mays'
    ]
  },
  {
    canonicalId: 'cabbage',
    name: 'Cabbage',
    scientificName: 'Brassica oleracea var. capitata',
    category: 'Vegetable',
    aliases: [
      'cabbage', 'patta gobhi', 'band gobhi', 'kobi', 'yelekosu', 'kosu', 
      'patta gopi', 'muttaikose', 'brassica oleracea', 'green cabbage'
    ]
  },
  {
    canonicalId: 'cauliflower',
    name: 'Cauliflower',
    scientificName: 'Brassica oleracea var. botrytis',
    category: 'Vegetable',
    aliases: [
      'cauliflower', 'phool gobhi', 'phool gobi', 'huvukosu', 'gobi flower', 
      'cauliflowers', 'puvvu gopi', 'kallipu', 'brassica botrytis'
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
    name: 'Spinach (Palak)',
    scientificName: 'Spinacia oleracea',
    category: 'Greens',
    aliases: [
      'spinach', 'palak', 'paalak', 'palak soppu', 'palakura', 'pasalai keerai', 
      'palong shak', 'spinacia oleracea', 'green spinach'
    ]
  },
  {
    canonicalId: 'coriander-leaves',
    name: 'Coriander Leaves (Dhaniya)',
    scientificName: 'Coriandrum sativum',
    category: 'Greens',
    aliases: [
      'coriander leaves', 'dhaniya patta', 'kothmir', 'kothambari soppu', 'kothimera', 
      'kothamalli keerai', 'dhane pata', 'cilantro', 'fresh coriander'
    ]
  },
  {
    canonicalId: 'mint',
    name: 'Mint (Pudina)',
    scientificName: 'Mentha spicata',
    category: 'Greens',
    aliases: [
      'mint', 'pudina', 'pudhina', 'pudina soppu', 'pudina aaku', 'pudhina keerai', 
      'mentha spicata', 'spearmint'
    ]
  },
  {
    canonicalId: 'curry-leaves',
    name: 'Curry Leaves (Kadi Patta)',
    scientificName: 'Murraya koenigii',
    category: 'Greens',
    aliases: [
      'curry leaves', 'kadi patta', 'karipatta', 'karibevu', 'karivepaku', 
      'karuveppilai', 'karipata', 'murraya koenigii'
    ]
  },
  {
    canonicalId: 'methi',
    name: 'Fenugreek Leaves (Methi)',
    scientificName: 'Trigonella foenum-graecum',
    category: 'Greens',
    aliases: [
      'methi', 'fenugreek leaves', 'methi patta', 'menthya soppu', 'menthi kura', 
      'venthiya keerai', 'methi shak', 'trigonella foenum-graecum'
    ]
  },
  {
    canonicalId: 'lettuce',
    name: 'Lettuce',
    scientificName: 'Lactuca sativa',
    category: 'Greens',
    aliases: [
      'lettuce', 'salad patta', 'iceberg lettuce', 'romaine lettuce', 'lactuca sativa', 'green lettuce'
    ]
  },
  {
    canonicalId: 'spring-onion',
    name: 'Spring Onion (Scallions)',
    scientificName: 'Allium fistulosum',
    category: 'Vegetable',
    aliases: [
      'spring onion', 'green onion', 'hara pyaz', 'pyaz ki patti', 'eerulli kaddi', 
      'vengaya thal', 'scallions', 'allium fistulosum'
    ]
  },
  {
    canonicalId: 'raw-banana',
    name: 'Raw Banana (Plantain / Kacha Kela)',
    scientificName: 'Musa paradisiaca',
    category: 'Vegetable',
    aliases: [
      'raw banana', 'kacha kela', 'balekayi', 'arattikaya', 'vazhaikkai', 
      'kancha kola', 'plantain', 'green banana', 'musa paradisiaca'
    ]
  },
  {
    canonicalId: 'raw-papaya',
    name: 'Raw Papaya (Kacha Papita)',
    scientificName: 'Carica papaya',
    category: 'Vegetable',
    aliases: [
      'raw papaya', 'kacha papita', 'hasi parangi', 'pacha boppayi', 'pachai pappali', 
      'kancha pepe', 'green papaya', 'carica papaya'
    ]
  },

  // ==========================================
  // 2. FRUITS
  // ==========================================
  {
    canonicalId: 'mango',
    name: 'Mango',
    scientificName: 'Mangifera indica',
    category: 'Fruit',
    aliases: [
      'mango', 'aam', 'alphonso', 'mavina hannu', 'mamidikaya', 'mambazham', 
      'aamra', 'mangifera indica', 'kesar mango', 'dasheri', 'totapuri', 'badami mango'
    ]
  },
  {
    canonicalId: 'banana',
    name: 'Banana (Ripe)',
    scientificName: 'Musa acuminata',
    category: 'Fruit',
    aliases: [
      'banana', 'kela', 'balehannu', 'aratipandu', 'vazhaipazham', 'kola', 
      'musa acuminata', 'robusta banana', 'yelakki banana', 'grand naine'
    ]
  },
  {
    canonicalId: 'apple',
    name: 'Apple',
    scientificName: 'Malus domestica',
    category: 'Fruit',
    aliases: [
      'apple', 'seb', 'sebu', 'aapil', 'malus domestica', 'kashmiri apple', 
      'shimla apple', 'royal gala', 'fuji apple'
    ]
  },
  {
    canonicalId: 'orange',
    name: 'Orange (Nagpur Santra)',
    scientificName: 'Citrus sinensis',
    category: 'Fruit',
    aliases: [
      'orange', 'santra', 'narangi', 'kittale', 'kamala pandu', 'aaranchu', 
      'citrus sinensis', 'nagpur orange', 'mandarin'
    ]
  },
  {
    canonicalId: 'sweet-lime',
    name: 'Sweet Lime (Mosambi)',
    scientificName: 'Citrus limetta',
    category: 'Fruit',
    aliases: [
      'sweet lime', 'mosambi', 'mousambi', 'musambi', 'battayi', 'sathukudi', 
      'citrus limetta'
    ]
  },
  {
    canonicalId: 'lemon',
    name: 'Lemon (Nimbu)',
    scientificName: 'Citrus limon',
    category: 'Fruit',
    aliases: [
      'lemon', 'nimbu', 'neembu', 'limbe', 'nimmakaya', 'elumichai', 'lebu', 
      'citrus limon', 'yellow lemon', 'sour lime'
    ]
  },
  {
    canonicalId: 'grapes',
    name: 'Grapes',
    scientificName: 'Vitis vinifera',
    category: 'Fruit',
    aliases: [
      'grapes', 'angoor', 'drakshi', 'drakshalu', 'thiratchai', 'angur', 
      'vitis vinifera', 'thompson seedless', 'black grapes', 'green grapes'
    ]
  },
  {
    canonicalId: 'guava',
    name: 'Guava (Amrood)',
    scientificName: 'Psidium guajava',
    category: 'Fruit',
    aliases: [
      'guava', 'amrood', 'peru', 'sebe hannu', 'jama pandu', 'koyyappazham', 
      'peara', 'psidium guajava', 'allahabad safeda'
    ]
  },
  {
    canonicalId: 'papaya',
    name: 'Papaya (Ripe)',
    scientificName: 'Carica papaya',
    category: 'Fruit',
    aliases: [
      'papaya', 'papita', 'parangipandu', 'boppayi pandu', 'pappali pazham', 
      'pepe ripe', 'red lady papaya', 'carica papaya'
    ]
  },
  {
    canonicalId: 'pineapple',
    name: 'Pineapple (Ananas)',
    scientificName: 'Ananas comosus',
    category: 'Fruit',
    aliases: [
      'pineapple', 'ananas', 'anannas', 'anasa pandu', 'annasi pazham', 
      'anarosh', 'ananas comosus', 'queen pineapple'
    ]
  },
  {
    canonicalId: 'watermelon',
    name: 'Watermelon (Tarbooj)',
    scientificName: 'Citrullus lanatus',
    category: 'Fruit',
    aliases: [
      'watermelon', 'tarbooj', 'tarbuj', 'kallangadi', 'puchakaya', 'tharboos', 
      'tormuj', 'citrullus lanatus'
    ]
  },
  {
    canonicalId: 'muskmelon',
    name: 'Muskmelon (Kharbooja)',
    scientificName: 'Cucumis melo',
    category: 'Fruit',
    aliases: [
      'muskmelon', 'kharbooja', 'kharbuja', 'chibuda', 'kharbuj', 'cucumis melo', 'cantaloupe'
    ]
  },
  {
    canonicalId: 'pomegranate',
    name: 'Pomegranate (Anar)',
    scientificName: 'Punica granatum',
    category: 'Fruit',
    aliases: [
      'pomegranate', 'anar', 'anaar', 'dalimbe', 'danimma pandu', 'madhulai', 
      'bedana', 'dalim', 'bhagwa anar', 'punica granatum'
    ]
  },
  {
    canonicalId: 'strawberry',
    name: 'Strawberry',
    scientificName: 'Fragaria × ananassa',
    category: 'Fruit',
    aliases: [
      'strawberry', 'strawberries', 'mahableshwar strawberry', 'fragaria ananassa', 'fresh strawberry'
    ]
  },
  {
    canonicalId: 'kiwi',
    name: 'Kiwi Fruit',
    scientificName: 'Actinidia deliciosa',
    category: 'Fruit',
    aliases: [
      'kiwi', 'kiwifruit', 'chinese gooseberry', 'actinidia deliciosa'
    ]
  },
  {
    canonicalId: 'pear',
    name: 'Pear (Nashpati)',
    scientificName: 'Pyrus communis',
    category: 'Fruit',
    aliases: [
      'pear', 'nashpati', 'nashpathi', 'pyrus communis', 'green pear'
    ]
  },
  {
    canonicalId: 'peach',
    name: 'Peach (Aadoo)',
    scientificName: 'Prunus persica',
    category: 'Fruit',
    aliases: [
      'peach', 'aadoo', 'aadu', 'prunus persica'
    ]
  },
  {
    canonicalId: 'plum',
    name: 'Plum (Aloo Bukhara)',
    scientificName: 'Prunus domestica',
    category: 'Fruit',
    aliases: [
      'plum', 'aloo bukhara', 'alubukhara', 'prunus domestica'
    ]
  },
  {
    canonicalId: 'sapota',
    name: 'Sapota (Chikoo)',
    scientificName: 'Manilkara zapota',
    category: 'Fruit',
    aliases: [
      'sapota', 'chikoo', 'chiku', 'sapota hannu', 'sapota pandu', 'chiku pazham', 
      'manilkara zapota', 'cricket ball chikoo'
    ]
  },
  {
    canonicalId: 'custard-apple',
    name: 'Custard Apple (Sitaphal / Sharifa)',
    scientificName: 'Annona squamosa',
    category: 'Fruit',
    aliases: [
      'custard apple', 'sitaphal', 'seethaphal', 'sharifa', 'seetha pazham', 
      'ata', 'annona squamosa', 'sugar apple'
    ]
  },
  {
    canonicalId: 'jackfruit',
    name: 'Jackfruit (Kathal)',
    scientificName: 'Artocarpus heterophyllus',
    category: 'Fruit',
    aliases: [
      'jackfruit', 'kathal', 'halasina hannu', 'panasa pandu', 'pala pazham', 
      'gachpatha', 'artocarpus heterophyllus'
    ]
  },
  {
    canonicalId: 'coconut',
    name: 'Mature Coconut (Nariyal)',
    scientificName: 'Cocos nucifera',
    category: 'Fruit',
    aliases: [
      'coconut', 'nariyal', 'thenginakayi', 'kobbari', 'thengai', 'narkel', 
      'cocos nucifera', 'copra'
    ]
  },
  {
    canonicalId: 'tender-coconut',
    name: 'Tender Coconut (Elaneer / Daab)',
    scientificName: 'Cocos nucifera',
    category: 'Fruit',
    aliases: [
      'tender coconut', 'elaneer', 'yelaneeru', 'daab', 'kacha nariyal', 
      'elani', 'tender water coconut'
    ]
  },
  {
    canonicalId: 'avocado',
    name: 'Avocado (Butter Fruit)',
    scientificName: 'Persea americana',
    category: 'Fruit',
    aliases: [
      'avocado', 'butter fruit', 'makhanfal', 'persea americana', 'hass avocado'
    ]
  },

  // ==========================================
  // 3. GRAINS & CEREALS
  // ==========================================
  {
    canonicalId: 'rice',
    name: 'Paddy Rice / Basmati',
    scientificName: 'Oryza sativa',
    category: 'Grain',
    aliases: [
      'rice', 'chawal', 'paddy', 'dhan', 'akki', 'biyyam', 'arisi', 'bhat', 
      'oryza sativa', 'basmati rice', 'sona masoori', 'kolam rice', 'white rice'
    ]
  },
  {
    canonicalId: 'brown-rice',
    name: 'Brown Rice',
    scientificName: 'Oryza sativa (Unpolished)',
    category: 'Grain',
    aliases: [
      'brown rice', 'unpolished rice', 'lal chawal', 'hand pound rice', 'brown basmati'
    ]
  },
  {
    canonicalId: 'wheat',
    name: 'Wheat Grain',
    scientificName: 'Triticum aestivum',
    category: 'Grain',
    aliases: [
      'wheat', 'gehu', 'gehun', 'godhi', 'godhumalu', 'godhumai', 'gom', 
      'triticum aestivum', 'sharbati wheat', 'lokwan wheat', 'durum wheat'
    ]
  },
  {
    canonicalId: 'maize',
    name: 'Maize Grain (Corn)',
    scientificName: 'Zea mays',
    category: 'Grain',
    aliases: [
      'maize', 'makka grain', 'makai', 'musukina jola grain', 'mokka jonna', 
      'makka dry', 'zea mays grain'
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
  {
    canonicalId: 'jowar',
    name: 'Jowar (Sorghum)',
    scientificName: 'Sorghum bicolor',
    category: 'Grain',
    aliases: [
      'jowar', 'sorghum', 'jwari', 'jola', 'jonnalu', 'cholam', 'jowari', 
      'sorghum bicolor', 'white millet'
    ]
  },
  {
    canonicalId: 'bajra',
    name: 'Bajra (Pearl Millet)',
    scientificName: 'Pennisetum glaucum',
    category: 'Grain',
    aliases: [
      'bajra', 'pearl millet', 'sajje', 'sajjalu', 'kambu', 'bajri', 
      'pennisetum glaucum'
    ]
  },
  {
    canonicalId: 'barley',
    name: 'Barley (Jau)',
    scientificName: 'Hordeum vulgare',
    category: 'Grain',
    aliases: [
      'barley', 'jau', 'java', 'barli', 'hordeum vulgare'
    ]
  },
  {
    canonicalId: 'oats',
    name: 'Oats Grain / Rolled Oats',
    scientificName: 'Avena sativa',
    category: 'Grain',
    aliases: [
      'oats', 'rolled oats', 'avena sativa', 'instant oats', 'steel cut oats'
    ]
  },
  {
    canonicalId: 'poha',
    name: 'Poha (Flattened Rice)',
    scientificName: 'Oryza sativa (Flaked)',
    category: 'Processed Product',
    aliases: [
      'poha', 'flattened rice', 'beaten rice', 'aval', 'avalakki', 'atukulu', 
      'chira', 'flaked rice', 'thick poha', 'thin poha'
    ]
  },
  {
    canonicalId: 'rava',
    name: 'Semolina (Rava / Sooji)',
    scientificName: 'Triticum durum (Granular Endosperm)',
    category: 'Flour',
    aliases: [
      'rava', 'sooji', 'suji', 'semolina', 'sombu', 'bansi rava', 'bombay rava', 'upma rava'
    ]
  },
  {
    canonicalId: 'dalia',
    name: 'Broken Wheat (Dalia / Lapsi)',
    scientificName: 'Triticum aestivum (Cracked)',
    category: 'Grain',
    aliases: [
      'dalia', 'broken wheat', 'cracked wheat', 'lapsi', 'godhi nucchu', 'fada'
    ]
  },
  {
    canonicalId: 'corn-flour',
    name: 'Corn Flour / Maize Starch',
    scientificName: 'Zea mays (Milled)',
    category: 'Flour',
    aliases: [
      'corn flour', 'makka atta', 'cornstarch', 'maize flour'
    ]
  },
  {
    canonicalId: 'rice-flour',
    name: 'Rice Flour (Chawal Ka Atta)',
    scientificName: 'Oryza sativa (Milled)',
    category: 'Flour',
    aliases: [
      'rice flour', 'chawal atta', 'akki hittu', 'biyyam pindi', 'arisi maavu', 'chalir gura'
    ]
  },
  {
    canonicalId: 'wheat-flour',
    name: 'Whole Wheat Flour (Chakki Atta)',
    scientificName: 'Triticum aestivum (Stone Ground)',
    category: 'Flour',
    aliases: [
      'wheat flour', 'atta', 'chakki atta', 'gehu ka atta', 'godhi hittu', 
      'godhuma pindi', 'godhumai maavu', 'flour', 'whole wheat flour'
    ]
  },
  {
    canonicalId: 'multigrain-flour',
    name: 'Multigrain Atta',
    scientificName: 'Composite Cereal & Millet Blend',
    category: 'Flour',
    aliases: [
      'multigrain flour', 'multigrain atta', 'mixed grain flour', 'diet atta'
    ]
  },

  // ==========================================
  // 4. PULSES & LEGUMES
  // ==========================================
  {
    canonicalId: 'chickpea',
    name: 'Desi Bengal Gram (Chana)',
    scientificName: 'Cicer arietinum',
    category: 'Pulse',
    aliases: [
      'chickpea', 'chana', 'bengal gram', 'kadale', 'senagalu', 'konda kadalai', 
      'chola', 'cicer arietinum', 'desi chana', 'black gram chickpea'
    ]
  },
  {
    canonicalId: 'kabuli-chana',
    name: 'Kabuli Chana (Garbanzo / White Chickpeas)',
    scientificName: 'Cicer arietinum var. macrospermum',
    category: 'Pulse',
    aliases: [
      'kabuli chana', 'white chickpea', 'garbanzo', 'safed chana', 'chole', 'bada chana'
    ]
  },
  {
    canonicalId: 'toor-dal',
    name: 'Toor Dal (Pigeon Pea / Arhar)',
    scientificName: 'Cajanus cajan',
    category: 'Pulse',
    aliases: [
      'toor dal', 'arhar dal', 'tuvar dal', 'togari bele', 'kandi pappu', 
      'thuvaram paruppu', 'cajanus cajan', 'yellow split pigeon peas'
    ]
  },
  {
    canonicalId: 'moong-dal',
    name: 'Moong Dal (Yellow Split Mung)',
    scientificName: 'Vigna radiata',
    category: 'Pulse',
    aliases: [
      'moong dal', 'mung dal', 'pesara pappu', 'hesaru bele', 'pasi paruppu', 
      'mung bean split', 'yellow moong', 'dhuli moong'
    ]
  },
  {
    canonicalId: 'urad-dal',
    name: 'Urad Dal (Split/Whole Black Gram)',
    scientificName: 'Vigna mungo',
    category: 'Pulse',
    aliases: [
      'urad dal', 'mash dal', 'uddin bele', 'minapa pappu', 'ulutham paruppu', 
      'vigna mungo', 'white urad', 'black urad'
    ]
  },
  {
    canonicalId: 'masoor-dal',
    name: 'Masoor Dal (Red Lentil)',
    scientificName: 'Lens culinaris',
    category: 'Pulse',
    aliases: [
      'masoor dal', 'red lentil', 'split red lentils', 'lens culinaris', 'malka masoor'
    ]
  },
  {
    canonicalId: 'chana-dal',
    name: 'Chana Dal (Split Bengal Gram)',
    scientificName: 'Cicer arietinum (Dehulled Split)',
    category: 'Pulse',
    aliases: [
      'chana dal', 'split bengal gram', 'kadale bele', 'senaga pappu', 'kadalai paruppu'
    ]
  },
  {
    canonicalId: 'green-gram',
    name: 'Whole Green Gram (Moong)',
    scientificName: 'Vigna radiata (Whole)',
    category: 'Pulse',
    aliases: [
      'green gram', 'whole moong', 'sabut moong', 'hesaru kalu', 'pesalu', 'pasi payaru'
    ]
  },
  {
    canonicalId: 'black-gram',
    name: 'Whole Black Gram (Sabut Urad)',
    scientificName: 'Vigna mungo (Whole)',
    category: 'Pulse',
    aliases: [
      'black gram', 'sabut urad', 'whole black gram', 'uddu whole', 'minumulu', 'ulundu'
    ]
  },
  {
    canonicalId: 'rajma',
    name: 'Kidney Beans (Rajma)',
    scientificName: 'Phaseolus vulgaris',
    category: 'Pulse',
    aliases: [
      'rajma', 'kidney beans', 'red kidney beans', 'chitra rajma', 'jammu rajma', 'phaseolus beans'
    ]
  },
  {
    canonicalId: 'kala-chana',
    name: 'Black Chickpeas (Kala Chana)',
    scientificName: 'Cicer arietinum (Black)',
    category: 'Pulse',
    aliases: [
      'kala chana', 'black chickpeas', 'brown chana', 'karuppu konda kadalai'
    ]
  },
  {
    canonicalId: 'field-beans',
    name: 'Field Beans (Avarekalu / Val)',
    scientificName: 'Lablab purpureus',
    category: 'Pulse',
    aliases: [
      'field beans', 'avarekalu', 'avare', 'val dal', 'hyacinth beans', 'lablab purpureus'
    ]
  },
  {
    canonicalId: 'soybean',
    name: 'Soybean',
    scientificName: 'Glycine max',
    category: 'Pulse',
    aliases: [
      'soybean', 'soya bean', 'soya', 'bhatma', 'glycine max', 'yellow soybean'
    ]
  },
  {
    canonicalId: 'groundnut',
    name: 'Groundnut (Peanut / Mungfali)',
    scientificName: 'Arachis hypogaea',
    category: 'Pulse',
    aliases: [
      'groundnut', 'peanut', 'peanuts', 'mungfali', 'shenga', 'kadale kayi', 
      'pallelu', 'verkkadalai', 'chinabadam', 'arachis hypogaea', 'raw peanuts'
    ]
  },

  // ==========================================
  // 5. SPICES & POWDERS
  // ==========================================
  {
    canonicalId: 'turmeric',
    name: 'Turmeric (Haldi)',
    scientificName: 'Curcuma longa',
    category: 'Spice',
    aliases: [
      'turmeric', 'haldi', 'pasupu', 'arishina', 'manjal', 'holud', 
      'curcuma longa', 'salem turmeric', 'curcumin'
    ]
  },
  {
    canonicalId: 'black-pepper',
    name: 'Black Pepper (Kali Mirch)',
    scientificName: 'Piper nigrum',
    category: 'Spice',
    aliases: [
      'black pepper', 'pepper', 'black-pepper', 'kali mirch', 'menasu', 'miriyalu', 'milagu', 'gol morich', 
      'piper nigrum', 'malabar pepper', 'black peppercorn', 'kalimirch', 'kappu menasu'
    ]
  },
  {
    canonicalId: 'white-pepper',
    name: 'White Pepper (Safed Mirch)',
    scientificName: 'Piper nigrum (Decorticated)',
    category: 'Spice',
    aliases: [
      'white pepper', 'safed mirch', 'safed mirchi', 'bili menasu', 'thellati miriyalu', 
      'vellai milagu', 'piper nigrum album', 'white peppercorn', 'white-pepper'
    ]
  },
  {
    canonicalId: 'green-peppercorn',
    name: 'Green Peppercorns (Kacha Menasu)',
    scientificName: 'Piper nigrum (Unripe Berry)',
    category: 'Spice',
    aliases: [
      'green peppercorn', 'green peppercorns', 'kacha menasu', 'hasiru menasu', 
      'pachi miriyalu', 'pachai milagu', 'green pepper spice', 'green-peppercorn'
    ]
  },
  {
    canonicalId: 'cardamom',
    name: 'Green Cardamom (Elaichi)',
    scientificName: 'Elettaria cardamomum',
    category: 'Spice',
    aliases: [
      'cardamom', 'elaichi', 'elakki', 'elakulu', 'elakkai', 'elachi', 
      'elettaria cardamomum', 'green cardamom'
    ]
  },
  {
    canonicalId: 'clove',
    name: 'Clove (Laung)',
    scientificName: 'Syzygium aromaticum',
    category: 'Spice',
    aliases: [
      'clove', 'laung', 'lavanga', 'lavangam', 'kirambu', 'lobongo', 'syzygium aromaticum'
    ]
  },
  {
    canonicalId: 'cinnamon',
    name: 'Cinnamon (Dalchini)',
    scientificName: 'Cinnamomum verum',
    category: 'Spice',
    aliases: [
      'cinnamon', 'dalchini', 'dalchini bark', 'chakke', 'dalchina chekka', 'pattai', 'cinnamomum'
    ]
  },
  {
    canonicalId: 'cumin',
    name: 'Cumin Seeds (Jeera)',
    scientificName: 'Cuminum cyminum',
    category: 'Spice',
    aliases: [
      'cumin', 'jeera', 'jira', 'jeerige', 'jeelakarra', 'seeragam', 'cuminum cyminum'
    ]
  },
  {
    canonicalId: 'coriander-seeds',
    name: 'Coriander Seeds (Sabut Dhaniya)',
    scientificName: 'Coriandrum sativum (Seed)',
    category: 'Spice',
    aliases: [
      'coriander seeds', 'sabut dhaniya', 'dhania seeds', 'havija', 'dhaniyalu', 'kothamalli vithai'
    ]
  },
  {
    canonicalId: 'fennel',
    name: 'Fennel Seeds (Saunf)',
    scientificName: 'Foeniculum vulgare',
    category: 'Spice',
    aliases: [
      'fennel', 'saunf', 'sompu', 'badishep', 'perunjeeragam', 'foeniculum vulgare'
    ]
  },
  {
    canonicalId: 'fenugreek-seeds',
    name: 'Fenugreek Seeds (Methi Dana)',
    scientificName: 'Trigonella foenum-graecum (Seed)',
    category: 'Spice',
    aliases: [
      'fenugreek seeds', 'methi seeds', 'methi dana', 'menthya', 'menthulu', 'venthiyam'
    ]
  },
  {
    canonicalId: 'mustard-seeds',
    name: 'Mustard Seeds (Rai / Sarson)',
    scientificName: 'Brassica nigra / juncea',
    category: 'Spice',
    aliases: [
      'mustard seeds', 'rai', 'sarson', 'sasive', 'aavalu', 'kadugu', 'shorshe'
    ]
  },
  {
    canonicalId: 'ajwain',
    name: 'Ajwain (Carom Seeds)',
    scientificName: 'Trachyspermum ammi',
    category: 'Spice',
    aliases: [
      'ajwain', 'carom seeds', 'ajwain seeds', 'omam', 'oma', 'vaamu', 'trachyspermum ammi'
    ]
  },
  {
    canonicalId: 'dry-red-chilli',
    name: 'Dry Red Chilli (Whole)',
    scientificName: 'Capsicum annuum (Dried)',
    category: 'Spice',
    aliases: [
      'dry red chilli', 'sukhi lal mirch', 'kempu menasu dry', 'enda mirapakayalu', 'kancha lanka'
    ]
  },
  {
    canonicalId: 'bay-leaf',
    name: 'Bay Leaf (Tejpatta)',
    scientificName: 'Laurus nobilis / Cinnamomum tamala',
    category: 'Spice',
    aliases: [
      'bay leaf', 'tejpatta', 'tej patta', 'biryani leaf', 'bay leaves'
    ]
  },
  {
    canonicalId: 'star-anise',
    name: 'Star Anise (Chakra Phool)',
    scientificName: 'Illicium verum',
    category: 'Spice',
    aliases: [
      'star anise', 'chakra phool', 'anasphal', 'badiyan', 'illicium verum'
    ]
  },
  {
    canonicalId: 'nutmeg',
    name: 'Nutmeg (Jaiphal)',
    scientificName: 'Myristica fragrans',
    category: 'Spice',
    aliases: [
      'nutmeg', 'jaiphal', 'jayfal', 'jathikai', 'jajikaya', 'myristica fragrans'
    ]
  },
  {
    canonicalId: 'mace',
    name: 'Mace (Javitri)',
    scientificName: 'Myristica fragrans (Aril)',
    category: 'Spice',
    aliases: [
      'mace', 'javitri', 'japatri', 'jathipathri'
    ]
  },
  {
    canonicalId: 'asafoetida',
    name: 'Asafoetida (Hing)',
    scientificName: 'Ferula foetida',
    category: 'Spice',
    aliases: [
      'asafoetida', 'hing', 'inguva', 'ingu', 'perungayam', 'ferula foetida'
    ]
  },
  {
    canonicalId: 'turmeric-powder',
    name: 'Turmeric Powder (Haldi Powder)',
    scientificName: 'Curcuma longa (Pulverized)',
    category: 'Spice',
    aliases: [
      'turmeric powder', 'haldi powder', 'pasupu podi', 'arishina pudi', 'manjal thool'
    ]
  },
  {
    canonicalId: 'chilli-powder',
    name: 'Red Chilli Powder (Lal Mirch Powder)',
    scientificName: 'Capsicum annuum (Ground)',
    category: 'Spice',
    aliases: [
      'chilli powder', 'red chilli powder', 'lal mirch powder', 'mirchi powder', 'milagai thool', 'kashmiri mirch powder'
    ]
  },
  {
    canonicalId: 'coriander-powder',
    name: 'Coriander Powder (Dhaniya Powder)',
    scientificName: 'Coriandrum sativum (Ground)',
    category: 'Spice',
    aliases: [
      'coriander powder', 'dhaniya powder', 'dhania powder', 'havija pudi', 'dhaniyala podi', 'malli thool'
    ]
  },
  {
    canonicalId: 'cumin-powder',
    name: 'Cumin Powder (Jeera Powder)',
    scientificName: 'Cuminum cyminum (Ground)',
    category: 'Spice',
    aliases: [
      'cumin powder', 'jeera powder', 'jira powder', 'jeerige pudi', 'seeraga thool'
    ]
  },
  {
    canonicalId: 'garam-masala',
    name: 'Garam Masala Blend',
    scientificName: 'Aromatic Spice Formulation',
    category: 'Spice',
    aliases: [
      'garam masala', 'garam masala powder', 'all spice blend', 'shahi garam masala'
    ]
  },
  {
    canonicalId: 'sambar-powder',
    name: 'Sambar Masala Powder',
    scientificName: 'Traditional Sambar Spice Blend',
    category: 'Spice',
    aliases: [
      'sambar powder', 'sambar masala', 'sambar podi', 'huli pudi'
    ]
  },
  {
    canonicalId: 'rasam-powder',
    name: 'Rasam Masala Powder',
    scientificName: 'Traditional Rasam Spice Blend',
    category: 'Spice',
    aliases: [
      'rasam powder', 'rasam podi', 'saarina pudi', 'rasam masala'
    ]
  },

  // ==========================================
  // 6. COOKING OILS & FATS
  // ==========================================
  {
    canonicalId: 'groundnut-oil',
    name: 'Cold-Pressed Groundnut Oil (Peanut Oil)',
    scientificName: 'Oleum Arachis',
    category: 'Oil & Oilseed',
    aliases: [
      'groundnut oil', 'peanut oil', 'mungfali tel', 'shenga tel', 'kadaleenne', 
      'verkkadalai ennai', 'pallela nune', 'cold pressed groundnut oil'
    ]
  },
  {
    canonicalId: 'sunflower-oil',
    name: 'Refined / Cold-Pressed Sunflower Oil',
    scientificName: 'Helianthus annuus (Oleum)',
    category: 'Oil & Oilseed',
    aliases: [
      'sunflower oil', 'surajmukhi tel', 'suryakanti enne', 'suriyakandhi ennai', 'sunflower cooking oil'
    ]
  },
  {
    canonicalId: 'coconut-oil',
    name: 'Virgin / Pure Coconut Oil',
    scientificName: 'Cocos nucifera (Oleum)',
    category: 'Oil & Oilseed',
    aliases: [
      'coconut oil', 'nariyal tel', 'thengina enne', 'thengai ennai', 'kobbari nune', 'virgin coconut oil'
    ]
  },
  {
    canonicalId: 'mustard-oil',
    name: 'Kachi Ghani Mustard Oil (Sarson Tel)',
    scientificName: 'Brassica nigra (Oleum)',
    category: 'Oil & Oilseed',
    aliases: [
      'mustard oil', 'sarson ka tel', 'sarson tel', 'kachi ghani', 'kadugu ennai', 'shorsher tel'
    ]
  },
  {
    canonicalId: 'sesame-oil',
    name: 'Cold-Pressed Sesame Oil (Gingelly / Til Tel)',
    scientificName: 'Sesamum indicum (Oleum)',
    category: 'Oil & Oilseed',
    aliases: [
      'sesame oil', 'gingelly oil', 'til tel', 'ellu enne', 'nallennai', 'nuvvula nune'
    ]
  },
  {
    canonicalId: 'rice-bran-oil',
    name: 'Refined Rice Bran Oil',
    scientificName: 'Oryza sativa (Bran Lipid Extract)',
    category: 'Oil & Oilseed',
    aliases: [
      'rice bran oil', 'ricebran oil', 'chawal bhusi tel', 'health oil'
    ]
  },
  {
    canonicalId: 'soybean-oil',
    name: 'Refined Soybean Oil',
    scientificName: 'Glycine max (Oleum)',
    category: 'Oil & Oilseed',
    aliases: [
      'soybean oil', 'soya oil', 'soya tel'
    ]
  },
  {
    canonicalId: 'olive-oil',
    name: 'Extra Virgin Olive Oil',
    scientificName: 'Olea europaea (Oleum)',
    category: 'Oil & Oilseed',
    aliases: [
      'olive oil', 'extra virgin olive oil', 'zaitoon tel', 'evoo'
    ]
  },
  {
    canonicalId: 'ghee',
    name: 'Pure Desi Ghee (Clarified Butter)',
    scientificName: 'Butyrum Purificatum',
    category: 'Dairy',
    aliases: [
      'ghee', 'desi ghee', 'bilona ghee', 'tuppa', 'neyyi', 'nei', 'ghrita', 
      'cow ghee', 'pure cow ghee', 'clarified butter'
    ]
  },
  {
    canonicalId: 'butter',
    name: 'Cultured Farm Butter (Makhan)',
    scientificName: 'Butyrum',
    category: 'Dairy',
    aliases: [
      'butter', 'makhan', 'makkhan', 'benne', 'vennai', 'makhan fresh', 'salted butter', 'unsalted butter'
    ]
  },
  {
    canonicalId: 'margarine',
    name: 'Margarine (Fat Spread)',
    scientificName: 'Emulsified Vegetable Lipid Spread',
    category: 'Processed Product',
    aliases: [
      'margarine', 'vegetable fat spread', 'table margarine'
    ]
  },

  // ==========================================
  // 7. DAIRY PRODUCTS
  // ==========================================
  {
    canonicalId: 'milk',
    name: 'Fresh Cow Milk (A2 Pasteurized)',
    scientificName: 'Lac Vaccinum',
    category: 'Dairy',
    aliases: [
      'milk', 'doodh', 'dudha', 'haalu', 'paalu', 'paal', 'dood', 
      'lac vaccinum', 'cow milk', 'fresh milk', 'buffalo milk', 'a2 milk'
    ]
  },
  {
    canonicalId: 'curd',
    name: 'Probiotic Farm Curd (Dahi / Yogurt)',
    scientificName: 'Lactobacillus Fermented Dairy',
    category: 'Dairy',
    aliases: [
      'curd', 'dahi', 'yogurt', 'mosaru', 'perugu', 'thayir', 'doi', 'fresh curd', 'dahi fresh'
    ]
  },
  {
    canonicalId: 'buttermilk',
    name: 'Cultured Buttermilk (Chaas / Mattha)',
    scientificName: 'Fermented Dairy Serum',
    category: 'Dairy',
    aliases: [
      'buttermilk', 'chaas', 'chach', 'majjige', 'majjiga', 'mor', 'mattha'
    ]
  },
  {
    canonicalId: 'paneer',
    name: 'Fresh Cottage Cheese (Paneer)',
    scientificName: 'Acid-Coagulated Dairy Protein',
    category: 'Dairy',
    aliases: [
      'paneer', 'cottage cheese', 'panir', 'fresh paneer', 'malai paneer'
    ]
  },
  {
    canonicalId: 'cheese',
    name: 'Processed / Cheddar Cheese',
    scientificName: 'Enzymatically Ripened Dairy Curd',
    category: 'Dairy',
    aliases: [
      'cheese', 'cheddar cheese', 'mozzarella', 'cheese block', 'cheese slices'
    ]
  },
  {
    canonicalId: 'cream',
    name: 'Fresh Dairy Cream (Malai)',
    scientificName: 'High-Fat Dairy Emulsion',
    category: 'Dairy',
    aliases: [
      'cream', 'malai', 'fresh cream', 'dairy cream', 'heavy cream'
    ]
  },
  {
    canonicalId: 'khoya',
    name: 'Khoya / Mawa (Desiccated Milk Solid)',
    scientificName: 'Heat-Coagulated Whole Milk Solids',
    category: 'Dairy',
    aliases: [
      'khoya', 'mawa', 'kova', 'khoa', 'sweet mawa'
    ]
  },
  {
    canonicalId: 'milk-powder',
    name: 'Skimmed / Whole Milk Powder',
    scientificName: 'Spray-Dried Dairy Powder',
    category: 'Dairy',
    aliases: [
      'milk powder', 'dairy whitener', 'smp', 'dry milk'
    ]
  },
  {
    canonicalId: 'condensed-milk',
    name: 'Sweetened Condensed Milk',
    scientificName: 'Concentrated Sweetened Dairy',
    category: 'Dairy',
    aliases: [
      'condensed milk', 'mithai mate', 'sweet milk paste'
    ]
  },

  // ==========================================
  // 8. TEA & COFFEE
  // ==========================================
  {
    canonicalId: 'tea',
    name: 'Assam / Darjeeling Orthodox Tea',
    scientificName: 'Camellia sinensis',
    category: 'Tea & Coffee',
    aliases: [
      'tea', 'chai', 'chaha', 'tea leaves', 'assam tea', 'darjeeling tea', 
      'camellia sinensis', 'black tea', 'tea powder', 'ctc tea'
    ]
  },
  {
    canonicalId: 'black-tea',
    name: 'Black CTC Tea (Granular / Leaf)',
    scientificName: 'Camellia sinensis (Fully Oxidized)',
    category: 'Tea & Coffee',
    aliases: [
      'black tea', 'ctc tea', 'kadak chai', 'black tea leaves'
    ]
  },
  {
    canonicalId: 'green-tea',
    name: 'Organic Green Tea (Unfermented)',
    scientificName: 'Camellia sinensis (Unoxidized)',
    category: 'Tea & Coffee',
    aliases: [
      'green tea', 'sencha', 'matcha leaves', 'organic green tea'
    ]
  },
  {
    canonicalId: 'tea-powder',
    name: 'Commercial Dust / Fannings Tea Powder',
    scientificName: 'Camellia sinensis (Milled Fannings)',
    category: 'Tea & Coffee',
    aliases: [
      'tea powder', 'chai patti', 'tea dust', 'hotel tea powder'
    ]
  },
  {
    canonicalId: 'coffee',
    name: 'Arabica & Robusta Coffee Beans',
    scientificName: 'Coffea arabica / canephora',
    category: 'Tea & Coffee',
    aliases: [
      'coffee', 'kafi', 'coffi', 'coffee beans', 'green coffee beans', 'coffea arabica'
    ]
  },
  {
    canonicalId: 'roasted-coffee-beans',
    name: 'Medium Dark Roasted Coffee Beans',
    scientificName: 'Coffea arabica (Thermal Roasted)',
    category: 'Tea & Coffee',
    aliases: [
      'roasted coffee beans', 'whole bean coffee', 'espresso beans', 'filter coffee beans'
    ]
  },
  {
    canonicalId: 'ground-coffee',
    name: 'Filter Ground Coffee (80:20 Chicory Blend)',
    scientificName: 'Ground Coffea Roast with Cichorium',
    category: 'Tea & Coffee',
    aliases: [
      'ground coffee', 'filter coffee powder', 'south indian filter coffee', 'brewed coffee powder'
    ]
  },
  {
    canonicalId: 'instant-coffee',
    name: 'Agglomerated Instant Coffee Powder',
    scientificName: 'Freeze-Dried / Spray-Dried Coffee Extract',
    category: 'Tea & Coffee',
    aliases: [
      'instant coffee', 'instant coffee powder', 'nescafe type', 'soluble coffee'
    ]
  },

  // ==========================================
  // 9. DRY FRUITS & NUTS
  // ==========================================
  {
    canonicalId: 'almond',
    name: 'California / Mamra Almonds',
    scientificName: 'Prunus dulcis',
    category: 'Dry Fruit',
    aliases: [
      'almond', 'badam', 'baadam', 'badamu', 'paadham', 'prunus dulcis', 
      'mamra badam', 'almonds'
    ]
  },
  {
    canonicalId: 'cashew',
    name: 'W180 / W240 Jumbo Cashew Kernels',
    scientificName: 'Anacardium occidentale',
    category: 'Dry Fruit',
    aliases: [
      'cashew', 'kaju', 'godambi', 'jeedipappu', 'mundhiri', 'kaju nuts', 'anacardium occidentale'
    ]
  },
  {
    canonicalId: 'walnut',
    name: 'Kashmir Inshell / Shelled Walnuts (Akhrot)',
    scientificName: 'Juglans regia',
    category: 'Dry Fruit',
    aliases: [
      'walnut', 'akhrot', 'akrot', 'akroot', 'juglans regia', 'walnuts'
    ]
  },
  {
    canonicalId: 'pistachio',
    name: 'Salted / Roasted Pistachios (Pista)',
    scientificName: 'Pistacia vera',
    category: 'Dry Fruit',
    aliases: [
      'pistachio', 'pista', 'pistachios', 'roasted pista', 'pistacia vera'
    ]
  },
  {
    canonicalId: 'raisins',
    name: 'Golden / Black Seedless Raisins (Kismis)',
    scientificName: 'Vitis vinifera (Dehydrated)',
    category: 'Dry Fruit',
    aliases: [
      'raisins', 'kismis', 'kishmish', 'ona drakshi', 'endudraksha', 'ular thiratchai', 'sultanas'
    ]
  },
  {
    canonicalId: 'dates',
    name: 'Medjool / Kimia Dates (Khajoor)',
    scientificName: 'Phoenix dactylifera',
    category: 'Dry Fruit',
    aliases: [
      'dates', 'khajoor', 'khajur', 'kharjoora', 'kharjooram', 'pericham pazham', 'phoenix dactylifera'
    ]
  },
  {
    canonicalId: 'figs',
    name: 'Dried Figs (Anjeer)',
    scientificName: 'Ficus carica',
    category: 'Dry Fruit',
    aliases: [
      'figs', 'anjeer', 'anjir', 'athi pazham', 'anjoor', 'ficus carica'
    ]
  },
  {
    canonicalId: 'apricots',
    name: 'Dried Turkish Apricots (Jardalu / Khubani)',
    scientificName: 'Prunus armeniaca',
    category: 'Dry Fruit',
    aliases: [
      'apricots', 'khubani', 'jardalu', 'dried apricots', 'prunus armeniaca'
    ]
  },
  {
    canonicalId: 'mixed-dry-fruits',
    name: 'Assorted Premium Dry Fruit Mix',
    scientificName: 'Composite Nut & Dried Fruit Selection',
    category: 'Dry Fruit',
    aliases: [
      'mixed dry fruits', 'dry fruit mix', 'trail mix', 'panchmeva', 'royal dry fruits'
    ]
  },

  // ==========================================
  // 10. COMMON EVERYDAY KITCHEN FOODS
  // ==========================================
  {
    canonicalId: 'sugar',
    name: 'Refined White Sugar Crystals (Chini)',
    scientificName: 'Saccharum officinarum (Sucrose)',
    category: 'Processed Product',
    aliases: [
      'sugar', 'cheeni', 'chini', 'sakre', 'panchadara', 'sarkarai', 'white sugar'
    ]
  },
  {
    canonicalId: 'salt',
    name: 'Vacuum-Evaporated Iodized Table Salt (Namak)',
    scientificName: 'Sodium Chloride (Iodized)',
    category: 'Processed Product',
    aliases: [
      'salt', 'namak', 'uppu', 'upp', 'laban', 'table salt', 'iodized salt', 'rock salt'
    ]
  },
  {
    canonicalId: 'jaggery',
    name: 'Organic Sugarcane Jaggery (Gur / Bella)',
    scientificName: 'Non-Centrifugal Cane Sugar',
    category: 'Processed Product',
    aliases: [
      'jaggery', 'gur', 'guda', 'bella', 'bellam', 'vellam', 'nattu sakkarai', 'cane jaggery'
    ]
  },
  {
    canonicalId: 'honey',
    name: 'Raw Forest Honey (Shahad)',
    scientificName: 'Apis dorsata / mellifera Nectar',
    category: 'Processed Product',
    aliases: [
      'honey', 'shahad', 'madhu', 'thone', 'then', 'forest honey', 'organic honey', 'wild honey'
    ]
  },
  {
    canonicalId: 'pickle',
    name: 'Traditional Mango / Lime Pickle (Achar)',
    scientificName: 'Oil & Salt Fermented Preserve',
    category: 'Processed Product',
    aliases: [
      'pickle', 'achar', 'aachar', 'uppinakayi', 'ooragaya', 'oorugai', 'mango pickle', 'mixed pickle'
    ]
  },
  {
    canonicalId: 'papad',
    name: 'Crispy Urad Dal Papad (Appalam / Poppadom)',
    scientificName: 'Sun-Dried Lentil Wafer',
    category: 'Processed Product',
    aliases: [
      'papad', 'papadam', 'appalam', 'happala', 'appadam', 'poppadom', 'urad papad'
    ]
  },
  {
    canonicalId: 'noodles',
    name: 'Instant Wheat / Hakka Noodles',
    scientificName: 'Extruded Wheat Dough Filament',
    category: 'Processed Product',
    aliases: [
      'noodles', 'instant noodles', 'maggi type', 'hakka noodles', 'ramen noodles'
    ]
  },
  {
    canonicalId: 'pasta',
    name: 'Durum Wheat Semolina Pasta (Macaroni / Fusilli)',
    scientificName: 'Extruded Durum Endosperm Pasta',
    category: 'Processed Product',
    aliases: [
      'pasta', 'macaroni', 'penne', 'fusilli', 'durum pasta', 'spaghetti'
    ]
  },
  {
    canonicalId: 'biscuits',
    name: 'Digestive / Glucose Baked Biscuits',
    scientificName: 'Baked Short-Dough Biscuit',
    category: 'Processed Product',
    aliases: [
      'biscuits', 'cookies', 'glucose biscuits', 'digestive biscuits', 'rusk', 'parle type'
    ]
  },
  {
    canonicalId: 'bread',
    name: 'Fresh Whole Wheat / Sandwich Bread',
    scientificName: 'Yeast-Leavened Baked Loaf',
    category: 'Processed Product',
    aliases: [
      'bread', 'brown bread', 'white bread', 'sandwich bread', 'pav', 'loaf'
    ]
  },
  {
    canonicalId: 'packaged-snacks',
    name: 'Savory Namkeen / Potato Chips',
    scientificName: 'Fried / Roasted Grain Snack',
    category: 'Processed Product',
    aliases: [
      'packaged snacks', 'namkeen', 'bhujia', 'potato chips', 'chips', 'mixture', 'sev'
    ]
  },
  {
    canonicalId: 'flour-mixes',
    name: 'Ready Flour Mix (Dosa / Idli / Rava Batter Mix)',
    scientificName: 'Premixed Multi-Pulse Flour Blend',
    category: 'Flour',
    aliases: [
      'flour mixes', 'dosa mix', 'idli mix', 'gulab jamun mix', 'instant mix flour'
    ]
  },
  {
    canonicalId: 'instant-food-mixes',
    name: 'Instant Meal / Upma / Poha Food Mix',
    scientificName: 'Dehydrated Instant Ready Meal',
    category: 'Processed Product',
    aliases: [
      'instant food mixes', 'upma mix', 'poha mix', 'ready mix meal', 'instant food'
    ]
  },
  {
    canonicalId: 'ready-to-cook',
    name: 'Ready-To-Cook Paneer Gravy / Curry Paste',
    scientificName: 'Retort Pouched Semi-Prepared Base',
    category: 'Processed Product',
    aliases: [
      'ready to cook', 'curry paste', 'gravy base', 'ready to eat', 'retort meal'
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

  // Tier 0: Centralized Multilingual Normalizer (Apple, Orange, Butter vs Butter Fruit, Indic Kannada/Hindi)
  const norm = matchProduct(clean);
  if (norm.matched && norm.product) {
    let cat: CropAliasMapping['category'] = 'Processed Product';
    if (norm.product.category === 'fruit') cat = 'Fruit';
    else if (norm.product.category === 'vegetable') cat = 'Vegetable';
    else if (norm.product.category === 'dairy') cat = 'Dairy';
    else if (norm.product.category === 'dry-fruit') cat = 'Dry Fruit';
    else if (norm.product.category === 'grain') cat = 'Grain';
    else if (norm.product.category === 'pulse') cat = 'Pulse';
    else if (norm.product.category === 'spice') cat = 'Spice';
    else if (norm.product.category === 'oil') cat = 'Oil & Oilseed';
    else if (norm.product.category === 'flour') cat = 'Flour';

    return {
      canonicalId: norm.product.id,
      name: norm.product.displayName,
      scientificName: norm.product.scientificName || norm.product.displayName,
      category: cat,
      matchedTerm: query,
      confidence: norm.confidence,
      isExact: norm.matchType === 'EXACT_CANONICAL' || norm.matchType === 'EXACT_ALIAS'
    };
  }

  // 1. Direct Exact Match on Canonical ID or Exact Name or Scientific Name
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

  // 2. Exact Whole Word Boundary matching (AVOID loose substring collision like 'butter' in 'butter fruit')
  for (const crop of CANONICAL_CROP_ALIASES) {
    for (const alias of crop.aliases) {
      const aliasLower = alias.toLowerCase();
      // Word boundary regex: ensure full word match
      const escaped = aliasLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(^|\\s)${escaped}(\\s|$)`, 'i');
      if (regex.test(clean)) {
        // Anti-collision: if searching 'butter' without 'fruit', do NOT match 'butter fruit'
        if (clean === 'butter' && aliasLower.includes('fruit')) continue;
        return {
          canonicalId: crop.canonicalId,
          name: crop.name,
          scientificName: crop.scientificName,
          category: crop.category,
          matchedTerm: alias,
          confidence: 0.95,
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
