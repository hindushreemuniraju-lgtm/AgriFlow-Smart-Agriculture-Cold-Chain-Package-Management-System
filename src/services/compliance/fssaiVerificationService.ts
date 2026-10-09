import { 
  FssaiVerificationResult, 
  FssaiVerifiedDetails, 
  FssaiVerificationStatus 
} from '../../types/foodPack';

/**
 * Official FSSAI State Code Registry (FSSAI / FoSCoS Mapping)
 */
export const FSSAI_STATE_CODES: Record<string, string> = {
  '00': 'Central Licensing Authority (FSSAI HQ)',
  '01': 'Jammu & Kashmir',
  '02': 'Himachal Pradesh',
  '03': 'Punjab',
  '04': 'Chandigarh',
  '05': 'Uttarakhand',
  '06': 'Haryana',
  '07': 'Delhi (NCT)',
  '08': 'Rajasthan',
  '09': 'Uttar Pradesh',
  '10': 'Bihar',
  '11': 'Sikkim',
  '12': 'Arunachal Pradesh',
  '13': 'Nagaland',
  '14': 'Manipur',
  '15': 'Mizoram',
  '16': 'Tripura',
  '17': 'Meghalaya',
  '18': 'Assam',
  '19': 'West Bengal',
  '20': 'Jharkhand',
  '21': 'Odisha',
  '22': 'Chhattisgarh',
  '23': 'Madhya Pradesh',
  '24': 'Gujarat',
  '25': 'Daman & Diu',
  '26': 'Dadra & Nagar Haveli',
  '27': 'Maharashtra',
  '28': 'Andhra Pradesh',
  '29': 'Karnataka',
  '30': 'Goa',
  '31': 'Lakshadweep',
  '32': 'Kerala',
  '33': 'Tamil Nadu',
  '34': 'Puducherry',
  '35': 'Andaman & Nicobar Islands',
  '36': 'Telangana',
  '37': 'Ladakh'
};

/**
 * Decodes structural metadata from a 14-digit FSSAI number without external calls
 */
export function decodeFssaiMetadata(fssaiNumber: string): {
  isValidFormat: boolean;
  licenseType: 'Central License' | 'State License' | 'Registration (Basic)';
  stateCode: string;
  stateName: string;
  enrollmentYear: number;
  serialNumber: string;
} | null {
  const clean = (fssaiNumber || '').replace(/\D/g, '');
  if (clean.length !== 14) return null;

  const digit1 = clean.charAt(0);
  const stateCode = clean.substring(1, 3);
  const yearDigits = parseInt(clean.substring(3, 5), 10);
  const enrollmentYear = 2000 + (isNaN(yearDigits) ? 24 : yearDigits);
  const serialNumber = clean.substring(8);

  const stateName = FSSAI_STATE_CODES[stateCode] || 'State / UT Food Safety Authority';

  let licenseType: 'Central License' | 'State License' | 'Registration (Basic)' = 'Registration (Basic)';
  if (digit1 === '1') {
    licenseType = stateCode === '00' ? 'Central License' : 'State License';
  } else if (digit1 === '2') {
    licenseType = 'Registration (Basic)';
  }

  return {
    isValidFormat: true,
    licenseType,
    stateCode,
    stateName,
    enrollmentYear,
    serialNumber
  };
}

/**
 * Checks whether the selected commodity is covered under the FBO's verified food categories
 */
export function isCommodityCoveredByFssaiCategories(
  commodity: string,
  categories: string[] = []
): { isCovered: boolean; matchedCategory?: string } {
  if (!commodity || !categories || categories.length === 0) {
    return { isCovered: true }; // Neutral if no categories specified
  }

  const clean = commodity.toLowerCase();

  // Fresh Vegetables & Fruits -> Category 04 (Fruits & vegetables)
  const isProduce = ['beetroot', 'tomato', 'potato', 'onion', 'okra', 'radish', 'carrot', 'cabbage', 
    'cauliflower', 'cucumber', 'pumpkin', 'beans', 'watermelon', 'apple', 'banana', 'mango', 
    'papaya', 'pomegranate', 'chilli', 'spinach', 'leafy'].some(c => clean.includes(c));

  // Dairy -> Category 01 (Dairy products)
  const isDairy = ['milk', 'butter', 'ghee', 'paneer', 'cheese', 'curd', 'dahi', 'yogurt'].some(c => clean.includes(c));

  // Grains / Pulses -> Category 06
  const isGrain = ['rice', 'wheat', 'atta', 'chickpea', 'pulse', 'dal', 'grain', 'maize', 'barley'].some(c => clean.includes(c));

  // Spices / Coffee / Tea -> Category 12 or 14
  const isSpicesBeverages = ['coffee', 'tea', 'cardamom', 'turmeric', 'pepper', 'spice'].some(c => clean.includes(c));

  for (const cat of categories) {
    const cLower = cat.toLowerCase();
    if (isProduce && (cLower.includes('04') || cLower.includes('fruit') || cLower.includes('vegetable') || cLower.includes('horticulture'))) {
      return { isCovered: true, matchedCategory: cat };
    }
    if (isDairy && (cLower.includes('01') || cLower.includes('dairy') || cLower.includes('milk'))) {
      return { isCovered: true, matchedCategory: cat };
    }
    if (isGrain && (cLower.includes('06') || cLower.includes('cereal') || cLower.includes('pulse') || cLower.includes('grain'))) {
      return { isCovered: true, matchedCategory: cat };
    }
    if (isSpicesBeverages && (cLower.includes('12') || cLower.includes('14') || cLower.includes('spice') || cLower.includes('beverage'))) {
      return { isCovered: true, matchedCategory: cat };
    }
  }

  return { isCovered: false };
}

const getApiBase = () => (typeof window !== 'undefined' ? '' : 'http://localhost:5000');

/**
 * Public Official FSSAI / FoSCoS Number Verification
 * Queries backend endpoint which connects to official FoSCoS source.
 */
export async function verifyFssaiNumber(
  fssaiNumber: string,
  activeCommodity?: string
): Promise<FssaiVerificationResult> {
  const clean = (fssaiNumber || '').replace(/\D/g, '').trim();
  const now = new Date().toISOString();

  // 1. Format Validation
  if (!clean || clean.length !== 14) {
    return {
      success: false,
      status: 'INVALID_FORMAT',
      fssaiNumber: clean || fssaiNumber,
      message: 'Invalid FSSAI format: License/Registration number must be exactly 14 numeric digits.',
      timestamp: now
    };
  }

  // 2. Query backend official verification endpoint
  try {
    const url = `${getApiBase()}/api/fssai/verify?number=${encodeURIComponent(clean)}`;
    const res = await fetch(url);
    if (res.ok) {
      const result: FssaiVerificationResult = await res.json();
      
      // If verified and active commodity provided, attach compliance validation
      if (result.status === 'VERIFIED' && result.data) {
        if (activeCommodity) {
          const matchCheck = isCommodityCoveredByFssaiCategories(activeCommodity, result.data.foodCategories);
          result.data.isCompliantWithCommodity = matchCheck.isCovered;
          result.data.complianceNotes = matchCheck.isCovered
            ? `Active produce (${activeCommodity}) matches declared FSSAI product category.`
            : `Produce (${activeCommodity}) is outside FBO declared food categories. Verify endorsement.`;
        }
      }

      return result;
    }
  } catch (err: any) {
    console.warn('[FSSAI Verification Service] Network call failed:', err?.message || err);
  }

  // 3. Fallback when official source or backend is unreachable
  return {
    success: false,
    status: 'UNABLE_TO_VERIFY',
    fssaiNumber: clean,
    message: 'FSSAI number could not be verified from the official source.',
    timestamp: now
  };
}
