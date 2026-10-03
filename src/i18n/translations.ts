import { LanguageCode } from '../types';

export const LANGUAGES: { code: LanguageCode; label: string; native: string; flag: string }[] = [
  { code: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
  { code: 'mr', label: 'Marathi', native: 'मराठी', flag: '🇮🇳' },
  { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
];

export interface TranslationStrings {
  appName: string;
  tagline: string;
  roles: {
    farmer: string;
    logistics: string;
    customer: string;
  };
  farmer: {
    selectCrop: string;
    cropCatalog: string;
    smartInsights: string;
    smartPackaging: string;
    transportOrder: string;
    currentStage: string;
    marketPrice: string;
    weatherForecast: string;
    soilHealth: string;
    optimalHarvest: string;
    daysRemaining: string;
    sugarTarget: string;
    firmness: string;
    idealPickingTime: string;
    qualityTechniques: string;
    packagingGuidance: string;
    transportDistance: string;
    targetMarket: string;
    shockAbsorption: string;
    thermalTier: string;
    ethyleneAbsorption: string;
    ecoRating: string;
    blueprintTitle: string;
    requestTransportBtn: string;
    orderSuccessMsg: string;
    pickupLocation: string;
    orderWeight: string;
    pickupWindow: string;
    fairPriceEstimate: string;
  };
  logistics: {
    title: string;
    subtitle: string;
    marketplaceTab: string;
    batchOptimizerTab: string;
    liveTrackingTab: string;
    activeOrders: string;
    verifiedDrivers: string;
    fairPriceFormula: string;
    acceptOrder: string;
    placeBid: string;
    bundleOrders: string;
    bundleButton: string;
    capacityUtilization: string;
    distanceSaved: string;
    fuelSaved: string;
    co2Reduction: string;
    bundleDriverPayout: string;
    farmerDiscount: string;
    multiStopItinerary: string;
    telemetryHeading: string;
    reeferTemp: string;
    targetTemp: string;
    humidity: string;
    vehicleSpeed: string;
    etaMinutes: string;
    doorStatus: string;
  };
  customer: {
    title: string;
    subtitle: string;
    scanQrBtn: string;
    quickScanPreset: string;
    passportTitle: string;
    verifiedProvenance: string;
    farmOrigin: string;
    farmer: string;
    soilScore: string;
    chemicalStatus: string;
    coldChainAudit: string;
    freshnessLife: string;
    daysAmbient: string;
    daysReefer: string;
    preservationTips: string;
    nutritionalProfile: string;
    recipesTitle: string;
    prepTime: string;
    healthBenefit: string;
    tipFarmerBtn: string;
    tipModalTitle: string;
    sendTip: string;
  };
}

export const TRANSLATIONS: Record<LanguageCode, TranslationStrings> = {
  en: {
    appName: 'AgriFlow',
    tagline: 'Smart Agriculture & Cold-Chain Package Management System',
    roles: {
      farmer: 'Farmer Interface',
      logistics: 'Logistics & Fleet',
      customer: 'Customer & Passport'
    },
    farmer: {
      selectCrop: 'Select Crop & Variety',
      cropCatalog: 'Produce Catalog',
      smartInsights: 'Smart Agro Insights',
      smartPackaging: 'Smart Packaging Guidance',
      transportOrder: 'Request Transport Order',
      currentStage: 'Maturity Stage',
      marketPrice: 'Base Mandi Price',
      weatherForecast: 'Microclimate & Weather',
      soilHealth: 'Real-time Soil Telemetry',
      optimalHarvest: 'Optimal Harvesting Timeline',
      daysRemaining: 'Days to Peak Harvest',
      sugarTarget: 'Sugar Brix Target',
      firmness: 'Firmness Index',
      idealPickingTime: 'Optimal Picking Window',
      qualityTechniques: 'Quality Improvement Interventions',
      packagingGuidance: 'Dynamic Multi-Layer Packaging Architecture',
      transportDistance: 'Transport Distance (km)',
      targetMarket: 'Target Destination Market',
      shockAbsorption: 'Shock & Vibration Dampening',
      thermalTier: 'Cold Chain Protocol',
      ethyleneAbsorption: 'Ethylene & Gas Scavenger',
      ecoRating: 'Eco & Recyclability Grade',
      blueprintTitle: '5-Step Standard Packing Blueprint (SOP)',
      requestTransportBtn: 'Dispatch Transport Request',
      orderSuccessMsg: 'Transport Order Successfully Posted with QR Batch Tag!',
      pickupLocation: 'Farm Pickup Location',
      orderWeight: 'Total Produce Weight (kg)',
      pickupWindow: 'Preferred Pickup Window',
      fairPriceEstimate: 'Fair-Price Benchmark'
    },
    logistics: {
      title: 'Logistics, Route Batching & Fleet Control',
      subtitle: 'Transparent fair pricing, multi-order route bundling, and continuous cold-chain IoT telemetry',
      marketplaceTab: 'Fair-Price Marketplace',
      batchOptimizerTab: 'Route & Batch Optimizer',
      liveTrackingTab: 'Live Telemetry & GPS',
      activeOrders: 'Farmer Transport Demands',
      verifiedDrivers: 'Available Fleet Partners',
      fairPriceFormula: 'Distance-Based Transparent Pricing Model',
      acceptOrder: 'Accept at Fair Benchmark',
      placeBid: 'Submit Fleet Quote',
      bundleOrders: 'Select 2+ Farmer Orders to Bundle into One Route',
      bundleButton: 'Calculate Optimized Multi-Stop Route',
      capacityUtilization: 'Vehicle Capacity Fill Rate',
      distanceSaved: 'Transit Miles Saved',
      fuelSaved: 'Diesel Fuel Conserved',
      co2Reduction: 'CO2e Emissions Prevented',
      bundleDriverPayout: 'Combined Driver Payout',
      farmerDiscount: 'Combined Farmer Savings',
      multiStopItinerary: 'Optimized Multi-Stop Waypoint Itinerary',
      telemetryHeading: 'Real-Time Cold Reefer Telemetry',
      reeferTemp: 'Reefer Cargo Temperature',
      targetTemp: 'Calibrated Setpoint',
      humidity: 'Relative Humidity',
      vehicleSpeed: 'Highway Speed',
      etaMinutes: 'Estimated Time to Destination',
      doorStatus: 'Container Door & Security'
    },
    customer: {
      title: 'Digital Product Passport & QR Provenance',
      subtitle: 'Scan your package QR code to inspect farm-to-fork origin, harvest logs, and preservation guides',
      scanQrBtn: 'Scan Package QR Code',
      quickScanPreset: 'Or Select a Verified Batch to Inspect:',
      passportTitle: 'Cryptographic Product Passport',
      verifiedProvenance: '100% Verified Farm-to-Fork Provenance',
      farmOrigin: 'Cultivation & Farm Origin',
      farmer: 'Grown By',
      soilScore: 'Soil Health Score',
      chemicalStatus: 'Residue & Chemical Test',
      coldChainAudit: 'Chronological Cold-Chain Audit Log',
      freshnessLife: 'Dynamic Freshness & Real-Time Shelf Life',
      daysAmbient: 'Days at Ambient Room Temp',
      daysReefer: 'Days in Chilled Crisper Drawer',
      preservationTips: 'Home Preservation & Storage Techniques',
      nutritionalProfile: 'Clinical Nutritional Breakdown',
      recipesTitle: 'Optimal Bioavailability Recipes',
      prepTime: 'Prep Time',
      healthBenefit: 'Bioactive Health Impact',
      tipFarmerBtn: 'Send Gratitude Tip to Farmer',
      tipModalTitle: 'Direct Farmer Appreciation & Tip',
      sendTip: 'Send Tip with Thank You Note'
    }
  },
  hi: {
    appName: 'एग्रीफ्लो (AgriFlow)',
    tagline: 'स्मार्ट कृषि एवं पैकेजिंग प्रबंधन प्रणाली',
    roles: {
      farmer: 'किसान इंटरफेस',
      logistics: 'लॉजिस्टिक्स एवं परिवहन',
      customer: 'उपभोक्ता एवं क्यूआर पासपोर्ट'
    },
    farmer: {
      selectCrop: 'फसल और किस्म चुनें',
      cropCatalog: 'कृषि उपज सूची',
      smartInsights: 'स्मार्ट कृषि अंतर्दृष्टि',
      smartPackaging: 'स्मार्ट पैकेजिंग मार्गदर्शन',
      transportOrder: 'परिवहन ऑर्डर अनुरोध',
      currentStage: 'परिपक्वता चरण',
      marketPrice: 'मंडी आधार मूल्य',
      weatherForecast: 'मौसम और सूक्ष्म जलवायु',
      soilHealth: 'मृदा स्वास्थ्य डेटा',
      optimalHarvest: 'कटाई समयरेखा एवं उलटी गिनती',
      daysRemaining: 'सर्वश्रेष्ठ कटाई में शेष दिन',
      sugarTarget: 'मिठास ब्रिक्स लक्ष्य',
      firmness: 'कठोरता सूचकांक',
      idealPickingTime: 'तुड़ाई का सर्वोत्तम समय',
      qualityTechniques: 'गुणवत्ता सुधार तकनीकें',
      packagingGuidance: 'मल्टी-लेयर स्मार्ट पैकेजिंग सुझाव',
      transportDistance: 'परिवहन दूरी (किमी)',
      targetMarket: 'लक्षित गंतव्य मंडी',
      shockAbsorption: 'झटका और कंपन अवशोषण',
      thermalTier: 'कोल्ड चेन तापमान श्रेणी',
      ethyleneAbsorption: 'एथिलीन अवशोषक पैड',
      ecoRating: 'पर्यावरण एवं पुनर्चक्रण रेटिंग',
      blueprintTitle: '5-चरणीय मानक पैकिंग ब्लूप्रिंट',
      requestTransportBtn: 'परिवहन अनुरोध भेजें',
      orderSuccessMsg: 'परिवहन अनुरोध क्यूआर बैच टैग के साथ सफलतापूर्वक दर्ज हुआ!',
      pickupLocation: 'खेत का पिकअप पता',
      orderWeight: 'कुल उपज वजन (किग्रा)',
      pickupWindow: 'पसंदीदा पिकअप समय',
      fairPriceEstimate: 'उचित मूल्य बेंचमार्क'
    },
    logistics: {
      title: 'लॉजिस्टिक्स, रूट बंडलिंग एवं फ्लीट नियंत्रण',
      subtitle: 'पारदर्शी मूल्य निर्धारण, बहु-ऑर्डर रूट अनुकूलन और निरंतर कोल्ड-चेन टेलीमेट्री',
      marketplaceTab: 'उचित-मूल्य मार्केटप्लेस',
      batchOptimizerTab: 'रूट एवं बैच ऑप्टिमाइज़र',
      liveTrackingTab: 'लाइव टेलीमेट्री एवं जीपीएस',
      activeOrders: 'सक्रिय किसान परिवहन मांगें',
      verifiedDrivers: 'सत्यापित वाहन भागीदार',
      fairPriceFormula: 'दूरी-आधारित पारदर्शी मूल्य मॉडल',
      acceptOrder: 'उचित मूल्य पर तुरंत स्वीकार करें',
      placeBid: 'अपनी दर दर्ज करें',
      bundleOrders: 'एक ही मार्ग में 2 या अधिक ऑर्डर बंडल करें',
      bundleButton: 'अनुकूलित बहु-स्टॉप मार्ग की गणना करें',
      capacityUtilization: 'वाहन क्षमता उपयोग दर',
      distanceSaved: 'बचत की गई यात्रा दूरी',
      fuelSaved: 'बचत हुआ डीजल ईंधन',
      co2Reduction: 'रोका गया कार्बन उत्सर्जन',
      bundleDriverPayout: 'संयुक्त चालक भुगतान',
      farmerDiscount: 'किसानों की कुल बचत',
      multiStopItinerary: 'अनुकूलित बहु-स्टॉप मार्ग योजना',
      telemetryHeading: 'रीफर कोल्ड कंटेनर लाइव टेलीमेट्री',
      reeferTemp: 'कार्गो कंटेनर तापमान',
      targetTemp: 'लक्ष्य तापमान',
      humidity: 'सापेक्ष आर्द्रता',
      vehicleSpeed: 'वाहन गति',
      etaMinutes: 'अनुमानित आगमन समय',
      doorStatus: 'कंटेनर दरवाजा एवं सील सुरक्षा'
    },
    customer: {
      title: 'डिजिटल उत्पाद पासपोर्ट एवं क्यूआर उत्पत्ति',
      subtitle: 'खेत से थाली तक की यात्रा, कटाई समय और ताजगी संरक्षण देखने के लिए क्यूआर कोड स्कैन करें',
      scanQrBtn: 'पैकेज क्यूआर कोड स्कैन करें',
      quickScanPreset: 'या इनमें से कोई सत्यापित बैच चुनें:',
      passportTitle: 'क्रिप्टोग्राफिक उत्पाद पासपोर्ट',
      verifiedProvenance: '100% सत्यापित खेत से थाली तक की प्रामाणिकता',
      farmOrigin: 'खेती और मूल स्थान',
      farmer: 'उत्पादक किसान',
      soilScore: 'मृदा स्वास्थ्य स्कोर',
      chemicalStatus: 'कीटनाशक अवशेष परीक्षण',
      coldChainAudit: 'कोल्ड-चेन तापमान इतिहास लॉग',
      freshnessLife: 'वास्तविक समय ताजगी एवं शेल्फ लाइफ',
      daysAmbient: 'सामान्य कमरे के तापमान पर दिन',
      daysReefer: 'फ्रिज में सुरक्षित दिन',
      preservationTips: 'घरेलू संरक्षण एवं भंडारण तकनीकें',
      nutritionalProfile: 'विस्तृत पोषण विश्लेषण',
      recipesTitle: 'अधिकतम पोषण लाभ देने वाली रेसिपी',
      prepTime: 'तैयारी का समय',
      healthBenefit: 'स्वास्थ्य लाभ',
      tipFarmerBtn: 'किसान को आभार एवं टिप भेजें',
      tipModalTitle: 'किसान के प्रति आभार व्यक्त करें',
      sendTip: 'टिप एवं धन्यवाद संदेश भेजें'
    }
  },
  kn: {
    appName: 'ಅಗ್ರಿಫ್ಲೋ (AgriFlow)',
    tagline: 'ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಮತ್ತು ಪ್ಯಾಕೇಜಿಂಗ್ ನಿರ್ವಹಣಾ ವ್ಯವಸ್ಥೆ',
    roles: {
      farmer: 'ರೈತ ಇಂಟರ್‌ಫೇಸ್',
      logistics: 'ಸಾರಿಗೆ ಮತ್ತು ಲಾಜಿಸ್ಟಿಕ್ಸ್',
      customer: 'ಗ್ರಾಹಕ ಮತ್ತು ಕ್ಯೂಆರ್ ಪಾಸ್‌ಪೋರ್ಟ್'
    },
    farmer: {
      selectCrop: 'ಬೆಳೆ ಮತ್ತು ತಳಿ ಆಯ್ಕೆಮಾಡಿ',
      cropCatalog: 'ಬೆಳೆಗಳ ಪಟ್ಟಿ',
      smartInsights: 'ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಸಲಹೆಗಳು',
      smartPackaging: 'ಸ್ಮಾರ್ಟ್ ಪ್ಯಾಕೇಜಿಂಗ್ ಮಾರ್ಗದರ್ಶನ',
      transportOrder: 'ಸಾರಿಗೆ ಆದೇಶ ವಿನಂತಿ',
      currentStage: 'ಪಕ್ವತೆಯ ಹಂತ',
      marketPrice: 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆ',
      weatherForecast: 'ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ',
      soilHealth: 'ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಮಾಹಿತಿ',
      optimalHarvest: 'ಸೂಕ್ತ ಕೊಯ್ಲು ಸಮಯ',
      daysRemaining: 'ಕೊಯ್ಲಿಗೆ ಉಳಿದ ದಿನಗಳು',
      sugarTarget: 'ಸಕ್ಕರೆ ಪ್ರಮಾಣ (ಬ್ರಿಕ್ಸ್)',
      firmness: 'ದೃಢತೆಯ ಸೂಚ್ಯಂಕ',
      idealPickingTime: 'ಕೊಯ್ಲಿಗೆ ಉತ್ತಮ ಸಮಯ',
      qualityTechniques: 'ಗುಣಮಟ್ಟ ಸುಧಾರಣಾ ವಿಧಾನಗಳು',
      packagingGuidance: 'ಸುಧಾರಿತ ಪ್ಯಾಕೇಜಿಂಗ್ ವ್ಯವಸ್ಥೆ',
      transportDistance: 'ಸಾರಿಗೆ ದೂರ (ಕಿಮೀ)',
      targetMarket: 'ಗುರಿ ಮಾರುಕಟ್ಟೆ',
      shockAbsorption: 'ಆಘಾತ ಹೀರಿಕೊಳ್ಳುವ ಸಾಮರ್ಥ್ಯ',
      thermalTier: 'ಶೀತಲ ಸರಪಳಿ ವ್ಯವಸ್ಥೆ',
      ethyleneAbsorption: 'ಎಥಿಲೀನ್ ಹೀರಿಕೊಳ್ಳುವಿಕೆ',
      ecoRating: 'ಪರಿಸರ ಸ್ನೇಹಿ ರೇಟಿಂಗ್',
      blueprintTitle: '5-ಹಂತದ ಪ್ಯಾಕಿಂಗ್ ನಿಯಮಾವಳಿ',
      requestTransportBtn: 'ಸಾರಿಗೆ ವಿನಂತಿ ಸಲ್ಲಿಸಿ',
      orderSuccessMsg: 'ಕ್ಯೂಆರ್ ಟ್ಯಾಗ್ ಜೊತೆ ಸಾರಿಗೆ ಆದೇಶ ಯಶಸ್ವಿಯಾಗಿ ನೋಂದಣಿಯಾಗಿದೆ!',
      pickupLocation: 'ತೋಟದ ಸ್ಥಳ',
      orderWeight: 'ಒಟ್ಟು ತೂಕ (ಕೆಜಿ)',
      pickupWindow: 'ಪಿಕಪ್ ಸಮಯ',
      fairPriceEstimate: 'ನ್ಯಾಯಯುತ ಸಾರಿಗೆ ದರ'
    },
    logistics: {
      title: 'ಲಾಜಿಸ್ಟಿಕ್ಸ್ ಮತ್ತು ವಾಹನ ನಿಯಂತ್ರಣ',
      subtitle: 'ಪಾರದರ್ಶಕ ಬೆಲೆಗಳು, ಬಹು-ಆದೇಶಗಳ ಮಾರ್ಗ ಸಂಯೋಜನೆ ಮತ್ತು ಐಒಟಿ ಶೀತಲ ಕಣ್ಗಾವಲು',
      marketplaceTab: 'ಮಾರುಕಟ್ಟೆ ಆದೇಶಗಳು',
      batchOptimizerTab: 'ಮಾರ್ಗ ಸಂಯೋಜಕ (ರೂಟ್ ಆಪ್ಟಿಮೈಸರ್)',
      liveTrackingTab: 'ಲೈವ್ ಟ್ರ್ಯಾಕಿಂಗ್',
      activeOrders: 'ರೈತರ ಸಾರಿಗೆ ಬೇಡಿಕೆಗಳು',
      verifiedDrivers: 'ಲಭ್ಯವಿರುವ ಚಾಲಕರು',
      fairPriceFormula: 'ದೂರ ಆಧಾರಿತ ಪಾರದರ್ಶಕ ಬೆಲೆ ಮಾದರಿ',
      acceptOrder: 'ನ್ಯಾಯಯುತ ದರದಲ್ಲಿ ಒಪ್ಪಿಕೊಳ್ಳಿ',
      placeBid: 'ದರ ನಮೂದಿಸಿ',
      bundleOrders: 'ಒಂದೇ ಮಾರ್ಗದಲ್ಲಿ 2+ ಆದೇಶಗಳನ್ನು ಜೋಡಿಸಿ',
      bundleButton: 'ಆಪ್ಟಿಮೈಸ್ಡ್ ಮಾರ್ಗ ಲೆಕ್ಕಾಚಾರ',
      capacityUtilization: 'ವಾಹನದ ಸಾಮರ್ಥ್ಯ ಬಳಕೆ',
      distanceSaved: 'ಉಳಿತಾಯವಾದ ದೂರ',
      fuelSaved: 'ಉಳಿಸಿದ ಡೀಸೆಲ್',
      co2Reduction: 'ತಡೆದ ಇಂಗಾಲದ ಹೊರಸೂಸುವಿಕೆ',
      bundleDriverPayout: 'ಚಾಲಕನ ಒಟ್ಟು ಗಳಿಕೆ',
      farmerDiscount: 'ರೈತರ ಒಟ್ಟು ಉಳಿತಾಯ',
      multiStopItinerary: 'ಬಹು-ನಿಲುಗಡೆ ಮಾರ್ಗಸೂಚಿ',
      telemetryHeading: 'ಶೀತಲೀಕರಣ ವಾಹನದ ನೇರ ಮಾಹಿತಿ',
      reeferTemp: 'ತಾಪಮಾನ',
      targetTemp: 'ಗುರಿ ತಾಪಮಾನ',
      humidity: 'ಆರ್ದ್ರತೆ',
      vehicleSpeed: 'ವಾಹನದ ವೇಗ',
      etaMinutes: 'ತಲುಪುವ ಅಂದಾಜು ಸಮಯ',
      doorStatus: 'ಬಾಗಿಲಿನ ಭದ್ರತಾ ಸ್ಥಿತಿ'
    },
    customer: {
      title: 'ಡಿಜಿಟಲ್ ಉತ್ಪನ್ನ ಪಾಸ್‌ಪೋರ್ಟ್',
      subtitle: 'ಉತ್ಪನ್ನದ ಮೂಲ, ಕೊಯ್ಲು ದಿನಾಂಕ ಮತ್ತು ತಾಜಾತನ ತಿಳಿಯಲು ಕ್ಯೂಆರ್ ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ',
      scanQrBtn: 'ಕ್ಯೂಆರ್ ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ',
      quickScanPreset: 'ಅಥವಾ ಪರಿಶೀಲಿಸಿದ ಬ್ಯಾಚ್ ಆಯ್ಕೆಮಾಡಿ:',
      passportTitle: 'ಪ್ರಾಮಾಣಿಕ ಡಿಜಿಟಲ್ ಪಾಸ್‌ಪೋರ್ಟ್',
      verifiedProvenance: '100% ದೃಢೀಕೃತ ಮೂಲ',
      farmOrigin: 'ಕೃಷಿ ಮೂಲ ವಿವರ',
      farmer: 'ಬೆಳೆದ ರೈತರು',
      soilScore: 'ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಸ್ಕೋರ್',
      chemicalStatus: 'ರಾಸಾಯನಿಕ ಪರೀಕ್ಷೆ ವರದಿ',
      coldChainAudit: 'ಶೀತಲ ಸರಪಳಿ ಇತಿಹಾಸ',
      freshnessLife: 'ತಾಜಾತನ ಮತ್ತು ಜೀವಿತಾವಧಿ',
      daysAmbient: 'ಸಾಮಾನ್ಯ ತಾಪಮಾನದಲ್ಲಿ ಉಳಿಯುವ ದಿನಗಳು',
      daysReefer: 'ಫ್ರಿಜ್‌ನಲ್ಲಿ ಉಳಿಯುವ ದಿನಗಳು',
      preservationTips: 'ಮನೆಯಲ್ಲಿ ಶೇಖರಣಾ ವಿಧಾನಗಳು',
      nutritionalProfile: 'ಪೋಷಕಾಂಶಗಳ ಸಮಗ್ರ ಮಾಹಿತಿ',
      recipesTitle: 'ಆರೋಗ್ಯಕರ ಅಡುಗೆ ವಿಧಾನಗಳು',
      prepTime: 'ತಯಾರಿ ಸಮಯ',
      healthBenefit: 'ಆರೋಗ್ಯ ಪ್ರಯೋಜನ',
      tipFarmerBtn: 'ರೈತರಿಗೆ ಧನ್ಯವಾದ ಮತ್ತು ಟಿಪ್ ನೀಡಿ',
      tipModalTitle: 'ರೈತರಿಗೆ ಪ್ರೋತ್ಸಾಹಕ ಧನ',
      sendTip: 'ಟಿಪ್ ಮತ್ತು ಸಂದೇಶ ಕಳುಹಿಸಿ'
    }
  },
  te: {
    appName: 'అగ్రిఫ్లో (AgriFlow)',
    tagline: 'స్మార్ట్ వ్యవసాయం మరియు కోల్డ్-చైన్ ప్యాకేజింగ్ నిర్వహణ వ్యవస్థ',
    roles: {
      farmer: 'రైతు ఇంటర్‌ఫేస్',
      logistics: 'రవాణా & లాజిస్టిక్స్',
      customer: 'వినియోగదారు & పాస్‌పోర్ట్'
    },
    farmer: {
      selectCrop: 'పంట మరియు రకాన్ని ఎంచుకోండి',
      cropCatalog: 'పంటల జాబితా',
      smartInsights: 'స్మార్ట్ వ్యవసాయ సూచనలు',
      smartPackaging: 'స్మార్ట్ ప్యాకేజింగ్ గైడెన్స్',
      transportOrder: 'రవాణా ఆర్డర్ అభ్యర్థన',
      currentStage: 'పరిపక్వత దశ',
      marketPrice: 'మార్కెట్ ధర',
      weatherForecast: 'వాతావరణ నివేదిక',
      soilHealth: 'నేల ఆరోగ్యం',
      optimalHarvest: 'సరైన కోత సమయం',
      daysRemaining: 'కోతకు మిగిలిన రోజులు',
      sugarTarget: 'చక్కెర స్థాయి (బ్రిక్స్)',
      firmness: 'గట్టిదనం సూచిక',
      idealPickingTime: 'కోతకు ఉత్తమ సమయం',
      qualityTechniques: 'నాణ్యత మెరుగుదల పద్ధతులు',
      packagingGuidance: 'ప్యాకేజింగ్ నిర్మాణ నమూనా',
      transportDistance: 'రవాణా దూరం (కిమీ)',
      targetMarket: 'గమ్యస్థాన మార్కెట్',
      shockAbsorption: 'షాక్ & వైబ్రేషన్ నియంత్రణ',
      thermalTier: 'కోల్డ్ చైన్ స్థాయి',
      ethyleneAbsorption: 'ఇథిలీన్ శోషకం',
      ecoRating: 'పర్యావరణ రేటింగ్',
      blueprintTitle: '5-దశల ప్యాకింగ్ బ్లూప్రింట్',
      requestTransportBtn: 'రవాణా అభ్యర్థన పంపండి',
      orderSuccessMsg: 'క్యూఆర్ ట్యాగ్‌తో రవాణా ఆర్డర్ విజయవంతంగా నమోదు చేయబడింది!',
      pickupLocation: 'పొలం పికప్ చిరునామా',
      orderWeight: 'మొత్తం బరువు (కేజీలు)',
      pickupWindow: 'పికప్ సమయం',
      fairPriceEstimate: 'సరసమైన రవాణా ధర'
    },
    logistics: {
      title: 'లాజిస్టిక్స్ & మార్గాల అనుసంధానం',
      subtitle: 'పారదర్శక ధరలు, మల్టీ-ఆర్డర్ రూట్ బండ్లింగ్ మరియు ఐఓటీ కోల్డ్-చైన్ నిఘా',
      marketplaceTab: 'మార్కెట్‌ప్లేస్ ఆర్డర్లు',
      batchOptimizerTab: 'రూట్ ఆప్టిమైజర్',
      liveTrackingTab: 'లైవ్ ట్రాకింగ్',
      activeOrders: 'రైతుల రవాణా డిమాండ్లు',
      verifiedDrivers: 'అందుబాటులో ఉన్న వాహనాలు',
      fairPriceFormula: 'దూరం ఆధారిత పారదర్శక ధర విధానం',
      acceptOrder: 'సరసమైన ధరకు ఆమోదించండి',
      placeBid: 'రేటు నమోదు చేయండి',
      bundleOrders: 'ఒకే మార్గంలో 2+ ఆర్డర్లను బండిల్ చేయండి',
      bundleButton: 'ఆప్టిమైజ్ చేసిన మార్గం లెక్కించండి',
      capacityUtilization: 'వాహన సామర్థ్యం వినియోగం',
      distanceSaved: 'ఆదా అయిన దూరం',
      fuelSaved: 'ఆదా అయిన డీజిల్',
      co2Reduction: 'నివారించిన కర్బన ఉద్గారాలు',
      bundleDriverPayout: 'డ్రైవర్ మొత్తం సంపాదన',
      farmerDiscount: 'రైతులకు మొత్తం ఆదా',
      multiStopItinerary: 'రూట్ ప్రయాణ ప్రణాళిక',
      telemetryHeading: 'లైవ్ కోల్డ్ రీఫర్ సమాచారం',
      reeferTemp: 'కంటైనర్ ఉష్ణోగ్రత',
      targetTemp: 'లక్ష్య ఉష్ణోగ్రత',
      humidity: 'తేమ శాతం',
      vehicleSpeed: 'వాహనం వేగం',
      etaMinutes: 'చేరుకునే సమయం',
      doorStatus: 'డోర్ లాక్ భద్రతా స్థితి'
    },
    customer: {
      title: 'డిజిటల్ ఉత్పత్తి పాస్‌పోర్ట్',
      subtitle: 'పంట మూలం, కోత వివరాలు మరియు తాజాదనం తెలుసుకోవడానికి క్యూఆర్ కోడ్ స్కాన్ చేయండి',
      scanQrBtn: 'క్యూఆర్ కోడ్ స్కాన్ చేయండి',
      quickScanPreset: 'లేదా ధృవీకరించిన బ్యాచ్ ఎంచుకోండి:',
      passportTitle: 'ప్రామాణిక డిజిటల్ పాస్‌పోర్ట్',
      verifiedProvenance: '100% ధృవీకరించబడిన మూలం',
      farmOrigin: 'పొలం మరియు సాగు వివరాలు',
      farmer: 'పండించిన రైతు',
      soilScore: 'నేల ఆరోగ్య స్కోర్',
      chemicalStatus: 'రసాయన రహిత సర్టిఫికేట్',
      coldChainAudit: 'కోల్డ్ చైన్ చరిత్ర లాగ్',
      freshnessLife: 'తాజాదనం మరియు షెల్ఫ్ లైఫ్',
      daysAmbient: 'గది ఉష్ణోగ్రత వద్ద నిల్వ రోజులు',
      daysReefer: 'ఫ్రిజ్‌లో నిల్వ రోజులు',
      preservationTips: 'ఇంటి వద్ద నిల్వ పద్ధతులు',
      nutritionalProfile: 'సమగ్ర పోషకాల వివరాలు',
      recipesTitle: 'ఆరోగ్యకరమైన వంటకాలు',
      prepTime: 'తయారీ సమయం',
      healthBenefit: 'ఆరోగ్య ప్రయోజనం',
      tipFarmerBtn: 'రైతుకు కృతజ్ఞత & టిప్ పంపండి',
      tipModalTitle: 'రైతుకు ఆర్థిక ప్రోత్సాహం',
      sendTip: 'టిప్ మరియు ధన్యవాద సందేశం పంపండి'
    }
  },
  ta: {
    appName: 'அக்ரிஃப்ளோ (AgriFlow)',
    tagline: 'ஸ்மார்ட் விவசாயம் மற்றும் பேக்கேஜிங் மேலாண்மை அமைப்பு',
    roles: {
      farmer: 'விவசாயி இடைமுகம்',
      logistics: 'போக்குவரத்து & லாஜிஸ்டிக்ஸ்',
      customer: 'வாடிக்கையாளர் & பாஸ்போர்ட்'
    },
    farmer: {
      selectCrop: 'பயிர் மற்றும் ரகத்தைத் தேர்ந்தெடுக்கவும்',
      cropCatalog: 'பயிர்களின் பட்டியல்',
      smartInsights: 'ஸ்மார்ட் வேளாண் ஆலோசனைகள்',
      smartPackaging: 'ஸ்மார்ட் பேக்கேஜிங் வழிகாட்டல்',
      transportOrder: 'போக்குவரத்து ஆர்டர் கோரிக்கை',
      currentStage: 'முதிர்ச்சி நிலை',
      marketPrice: 'சந்தை விலை',
      weatherForecast: 'வானிலை முன்னறிவிப்பு',
      soilHealth: 'மண் வளம்',
      optimalHarvest: 'சரியான அறுவடை நேரம்',
      daysRemaining: 'அறுவடைக்கு மீதமுள்ள நாட்கள்',
      sugarTarget: 'சர்க்கரை அளவு (பிரிக்ஸ்)',
      firmness: 'உறுதித்தன்மை குறியீடு',
      idealPickingTime: 'அறுவடைக்கான சிறந்த நேரம்',
      qualityTechniques: 'தரம் மேம்பாட்டு உத்திகள்',
      packagingGuidance: 'மேம்பட்ட பேக்கேஜிங் கட்டமைப்பு',
      transportDistance: 'போக்குவரத்து தூரம் (கிமீ)',
      targetMarket: 'இலக்கு சந்தை',
      shockAbsorption: 'அதிர்வு தாங்கும் திறன்',
      thermalTier: 'குளிர் சங்கிலி நிலை',
      ethyleneAbsorption: 'எத்திலீன் உறிஞ்சும் வசதி',
      ecoRating: 'சுற்றுச்சூழல் தரம்',
      blueprintTitle: '5-படி பேக்கிங் திட்டம்',
      requestTransportBtn: 'போக்குவரத்து கோரிக்கையை சமர்ப்பிக்கவும்',
      orderSuccessMsg: 'QR குறியீட்டுடன் போக்குவரத்து ஆர்டர் வெற்றிகரமாக பதிவு செய்யப்பட்டது!',
      pickupLocation: 'பண்ணை எடுக்கும் இடம்',
      orderWeight: 'மொத்த எடை (கிலோ)',
      pickupWindow: 'பிக்கப் நேரம்',
      fairPriceEstimate: 'நியாயமான கட்டண மதிப்பீடு'
    },
    logistics: {
      title: 'லாஜிஸ்டிக்ஸ் மற்றும் வாகன கட்டுப்பாடு',
      subtitle: 'வெளிப்படையான கட்டணங்கள், கூட்டு வழித்தட அமைப்பு மற்றும் ஐஓடி குளிர் சங்கிலி கண்காணிப்பு',
      marketplaceTab: 'சந்தை ஆர்டர்கள்',
      batchOptimizerTab: 'ரூட் ஆப்டிமைசர்',
      liveTrackingTab: 'நேரலை கண்காணிப்பு',
      activeOrders: 'விவசாயிகளின் போக்குவரத்து தேவைகள்',
      verifiedDrivers: 'கிடைக்கக்கூடிய ஓட்டுநர்கள்',
      fairPriceFormula: 'தூரம் சார்ந்த வெளிப்படையான கட்டண மாதிரி',
      acceptOrder: 'நியாய விலையில் ஏற்கவும்',
      placeBid: 'கட்டணத்தை குறிப்பிடவும்',
      bundleOrders: 'ஒரே வழியில் 2+ ஆர்டர்களை இணைக்கவும்',
      bundleButton: 'சிறந்த வழியைக் கணக்கிடுக',
      capacityUtilization: 'வாகன கொள்ளளவு பயன்பாடு',
      distanceSaved: 'சேமிக்கப்பட்ட தூரம்',
      fuelSaved: 'சேமிக்கப்பட்ட டீசல்',
      co2Reduction: 'குறைக்கப்பட்ட கார்பன் உமிழ்வு',
      bundleDriverPayout: 'ஓட்டுநர் மொத்த வருவாய்',
      farmerDiscount: 'விவசாயிகளுக்கு மொத்த சேமிப்பு',
      multiStopItinerary: 'பல நிறுத்த வழித்தட திட்டம்',
      telemetryHeading: 'குளிர்சாதன வாகன நேரலை விவரங்கள்',
      reeferTemp: 'சரக்கு வெப்பநிலை',
      targetTemp: 'இலக்கு வெப்பநிலை',
      humidity: 'ஈரப்பதம்',
      vehicleSpeed: 'வாகன வேகம்',
      etaMinutes: 'சென்றடையும் நேரம்',
      doorStatus: 'கதவு பூட்டு பாதுகாப்பு'
    },
    customer: {
      title: 'டிஜிட்டல் தயாரிப்பு பாஸ்போர்ட்',
      subtitle: 'விளைச்சல் தோட்டம், அறுவடை தேதி மற்றும் புத்துணர்ச்சியை அறிய QR குறியீட்டை ஸ்கேன் செய்யவும்',
      scanQrBtn: 'QR குறியீட்டை ஸ்கேன் செய்க',
      quickScanPreset: 'அல்லது சரிபார்க்கப்பட்ட தொகுப்பைத் தேர்ந்தெடுக்கவும்:',
      passportTitle: 'டிஜிட்டல் தயாரிப்பு பாஸ்போர்ட்',
      verifiedProvenance: '100% சரிபார்க்கப்பட்ட நம்பகத்தன்மை',
      farmOrigin: 'பண்ணை உற்பத்தி விபரம்',
      farmer: 'பயிரிட்ட விவசாயி',
      soilScore: 'மண் வள மதிப்பீடு',
      chemicalStatus: 'பூச்சிக்கொல்லி இல்லாத சான்றிதழ்',
      coldChainAudit: 'குளிர் சங்கிலி வரலாறு',
      freshnessLife: 'புத்துணர்ச்சி மற்றும் ஆயுட்காலம்',
      daysAmbient: 'சாதாரண வெப்பநிலையில் இருப்பு நாட்கள்',
      daysReefer: 'பிரிட்ஜில் இருப்பு நாட்கள்',
      preservationTips: 'வீட்டில் சேமிக்கும் முறைகள்',
      nutritionalProfile: 'ஊட்டச்சத்து தகவல்கள்',
      recipesTitle: 'ஆரோக்கிய சமையல் குறிப்புகள்',
      prepTime: 'தயாரிப்பு நேரம்',
      healthBenefit: 'மருத்துவ நன்மைகள்',
      tipFarmerBtn: 'விவசாயிக்கு நன்றி மற்றும் உதவித்தொகை அனுப்புங்கள்',
      tipModalTitle: 'விவசாயிக்கு நிதி ஆதரவு',
      sendTip: 'பரிசு மற்றும் நன்றி செய்தி அனுப்புங்கள்'
    }
  },
  mr: {
    appName: 'अ‍ॅग्रीफ्लो (AgriFlow)',
    tagline: 'स्मार्ट कृषी आणि पॅकेजिंग व्यवस्थापन प्रणाली',
    roles: {
      farmer: 'शेतकरी इंटरफेस',
      logistics: 'लॉजिस्टिक्स व वाहतूक',
      customer: 'ग्राहक व क्यूआर पासपोर्ट'
    },
    farmer: {
      selectCrop: 'पीक आणि वाण निवडा',
      cropCatalog: 'कृषी उत्पादने यादी',
      smartInsights: 'स्मार्ट कृषी सल्ले',
      smartPackaging: 'स्मार्ट पॅकेजिंग मार्गदर्शन',
      transportOrder: 'वाहतूक मागणी नोंदवा',
      currentStage: 'पक्वता टप्पा',
      marketPrice: 'बाजारभाव (प्रति किलो)',
      weatherForecast: 'हवामान अंदाज',
      soilHealth: 'माती आरोग्य डेटा',
      optimalHarvest: 'योग्य काढणी वेळ व काउंटडाउन',
      daysRemaining: 'काढणीसाठी शिल्लक दिवस',
      sugarTarget: 'साखर ब्रिक्स लक्ष्य',
      firmness: 'फळाचा घट्टपणा',
      idealPickingTime: 'काढणीची सर्वोत्तम वेळ',
      qualityTechniques: 'गुणवत्ता सुधारणा उपाय',
      packagingGuidance: 'मल्टी-लेयर स्मार्ट पॅकेजिंग रचना',
      transportDistance: 'वाहतूक अंतर (किमी)',
      targetMarket: 'लक्ष्य बाजारपेठ',
      shockAbsorption: 'धक्के व कंपने शोषून घेण्याची क्षमता',
      thermalTier: 'कोल्ड चेन तापमान श्रेणी',
      ethyleneAbsorption: 'इथिलीन वायू नियंत्रक',
      ecoRating: 'पर्यावरण व पुनर्वापर मानांकन',
      blueprintTitle: '५-टप्प्यांची मानक पॅकिंग मार्गदर्शिका',
      requestTransportBtn: 'वाहतूक मागणी पाठवा',
      orderSuccessMsg: 'वाहतूक मागणी क्यूआर बॅच टॅगसह यशस्वीरित्या नोंदवली गेली!',
      pickupLocation: 'शेताचा पत्ता',
      orderWeight: 'एकूण वजन (किग्रॅ)',
      pickupWindow: 'पिकअप वेळ',
      fairPriceEstimate: 'रास्त भावाचा अंदाज'
    },
    logistics: {
      title: 'लॉजिस्टिक्स, मार्ग एकत्रीकरण आणि वाहन नियंत्रण',
      subtitle: 'पारदर्शक रास्त दर, मल्टि-ऑर्डर रूट बंडलिंग आणि सतत कोल्ड-चेन आयओटी सेन्सर',
      marketplaceTab: 'रास्त भाव मार्केटप्लेस',
      batchOptimizerTab: 'रूट व बॅच ऑप्टिमायझर',
      liveTrackingTab: 'थेट ट्रॅकिंग व जीपीएस',
      activeOrders: 'शेतकऱ्यांच्या वाहतूक मागण्या',
      verifiedDrivers: 'सत्यापित वाहन चालक',
      fairPriceFormula: 'अंतर-आधारित पारदर्शक दर पद्धत',
      acceptOrder: 'रास्त दरात लगेच स्वीकारा',
      placeBid: 'आपला दर सांगा',
      bundleOrders: 'एकाच मार्गावर २ किंवा अधिक ऑर्डर्स एकत्र करा',
      bundleButton: 'एकत्रित सर्वोत्तम मार्गाची गणना करा',
      capacityUtilization: 'वाहन क्षमता वापर टक्केवारी',
      distanceSaved: 'वाचलेले अंतर (किमी)',
      fuelSaved: 'वाचलेले डिझेल (लिटर)',
      co2Reduction: 'कमी झालेले कार्बन उत्सर्जन',
      bundleDriverPayout: 'चालकाची एकूण कमाई',
      farmerDiscount: 'शेतकऱ्यांची एकूण बचत',
      multiStopItinerary: 'अनुकूलित बहु-थांबा मार्ग नियोजन',
      telemetryHeading: 'रीफर व्हॅन थेट तापमान माहिती',
      reeferTemp: 'कंटेनर तापमान',
      targetTemp: 'लक्ष्य तापमान',
      humidity: 'आर्द्रता',
      vehicleSpeed: 'गाडीचा वेग',
      etaMinutes: 'पोहोचण्याची अंदाजे वेळ',
      doorStatus: 'दरवाजा व सील सुरक्षा'
    },
    customer: {
      title: 'डिजिटल उत्पादन पासपोर्ट व क्यूआर मूळ माहिती',
      subtitle: 'शेतापासून ताटापर्यंतचा प्रवास, काढणी वेळ आणि ताजेपणा तपासण्यासाठी क्यूआर कोड स्कॅन करा',
      scanQrBtn: 'पॅकेज क्यूआर कोड स्कॅन करा',
      quickScanPreset: 'किंवा पडताळलेली बॅच निवडा:',
      passportTitle: 'डिजिटल उत्पादन पासपोर्ट',
      verifiedProvenance: '१००% पडताळलेली शेतकरी उत्पादकता',
      farmOrigin: 'शेती व मूळ ठिकाण',
      farmer: 'उत्पादक शेतकरी',
      soilScore: 'माती आरोग्य स्कोअर',
      chemicalStatus: 'रासायनिक अवशेष चाचणी',
      coldChainAudit: 'कोल्ड-चेन तापमान नोंदवही',
      freshnessLife: 'ताजेपणा व टिकण्याची क्षमता',
      daysAmbient: 'खोलीच्या तापमानावर टिकणारे दिवस',
      daysReefer: 'फ्रिजमध्ये टिकणारे दिवस',
      preservationTips: 'घरगुती साठवणूक व टिकवण्याच्या पद्धती',
      nutritionalProfile: 'तपशीलवार पोषणमूल्य माहिती',
      recipesTitle: 'पौष्टिक पाककृती',
      prepTime: 'तयारीचा वेळ',
      healthBenefit: 'आरोग्यदायी फायदे',
      tipFarmerBtn: 'शेतकऱ्याला कृतज्ञता टिप पाठवा',
      tipModalTitle: 'शेतकऱ्याप्रती कृतज्ञता व्यक्त करा',
      sendTip: 'टिप आणि धन्यवाद संदेश पाठवा'
    }
  },
  pa: {
    appName: 'ਐਗਰੀਫਲੋ (AgriFlow)',
    tagline: 'ਸਮਾਰਟ ਖੇਤੀਬਾੜੀ ਅਤੇ ਕੋਲਡ-ਚੇਨ ਪੈਕੇਜਿੰਗ ਪ੍ਰਬੰਧਨ ਪ੍ਰਣਾਲੀ',
    roles: {
      farmer: 'ਕਿਸਾਨ ਇੰਟਰਫੇਸ',
      logistics: 'ਲੌਜਿਸਟਿਕਸ ਅਤੇ ਵਾਹਨ',
      customer: 'ਗਾਹਕ ਅਤੇ ਪਾਸਪੋਰਟ'
    },
    farmer: {
      selectCrop: 'ਫ਼ਸਲ ਅਤੇ ਕਿਸਮ ਚੁਣੋ',
      cropCatalog: 'ਫ਼ਸਲਾਂ ਦੀ ਸੂਚੀ',
      smartInsights: 'ਸਮਾਰਟ ਖੇਤੀ ਸੁਝਾਅ',
      smartPackaging: 'ਸਮਾਰਟ ਪੈਕੇਜਿੰਗ ਮਾਰਗਦਰਸ਼ਨ',
      transportOrder: 'ਟ੍ਰਾਂਸਪੋਰਟ ਆਰਡਰ ਬੇਨਤੀ',
      currentStage: 'ਪੱਕਣ ਦਾ ਪੜਾਅ',
      marketPrice: 'ਮੰਡੀ ਕੀਮਤ',
      weatherForecast: 'ਮੌਸਮ ਜਾਣਕਾਰੀ',
      soilHealth: 'ਮਿੱਟੀ ਦੀ ਸਿਹਤ',
      optimalHarvest: 'ਸਹੀ ਕਟਾਈ ਸਮਾਂ-ਰੇਖਾ',
      daysRemaining: 'ਕਟਾਈ ਲਈ ਬਾਕੀ ਦਿਨ',
      sugarTarget: 'ਮਿਠਾਸ ਬ੍ਰਿਕਸ ਟੀਚਾ',
      firmness: 'ਮਜ਼ਬੂਤੀ ਸੂਚਕਾਂਕ',
      idealPickingTime: 'ਕਟਾਈ ਦਾ ਵਧੀਆ ਸਮਾਂ',
      qualityTechniques: 'ਗੁਣਵੱਤਾ ਸੁਧਾਰ ਤਕਨੀਕਾਂ',
      packagingGuidance: 'ਮਲਟੀ-ਲੇਅਰ ਪੈਕੇਜਿੰਗ ਸਿਸਟਮ',
      transportDistance: 'ਟ੍ਰਾਂਸਪੋਰਟ ਦੂਰੀ (ਕਿ.ਮੀ.)',
      targetMarket: 'ਟੀਚਾ ਮੰਡੀ',
      shockAbsorption: 'ਝਟਕਾ ਰੋਕੂ ਸਮਰੱਥਾ',
      thermalTier: 'ਕੋਲਡ ਚੇਨ ਦਰਜਾ',
      ethyleneAbsorption: 'ਐਥੀਲੀਨ ਕੰਟਰੋਲ',
      ecoRating: 'ਵਾਤਾਵਰਣ ਅਨੁਕੂਲ ਦਰਜਾ',
      blueprintTitle: '5-ਪੜਾਵੀ ਮਿਆਰੀ ਪੈਕਿੰਗ ਯੋਜਨਾ',
      requestTransportBtn: 'ਟ੍ਰਾਂਸਪੋਰਟ ਬੇਨਤੀ ਭੇਜੋ',
      orderSuccessMsg: 'ਕਿਊਆਰ ਟੈਗ ਸਮੇਤ ਟ੍ਰਾਂਸਪੋਰਟ ਆਰਡਰ ਸਫਲਤਾਪੂਰਵਕ ਦਰਜ ਹੋ ਗਿਆ!',
      pickupLocation: 'ਖੇਤ ਦਾ ਪਤਾ',
      orderWeight: 'ਕੁੱਲ ਵਜ਼ਨ (ਕਿਲੋ)',
      pickupWindow: 'ਪਿਕਅੱਪ ਸਮਾਂ',
      fairPriceEstimate: 'ਵਾਜਬ ਕੀਮਤ ਅੰਦਾਜ਼ਾ'
    },
    logistics: {
      title: 'ਲੌਜਿਸਟਿਕਸ ਅਤੇ ਵਾਹਨ ਕੰਟਰੋਲ',
      subtitle: 'ਪਾਰਦਰਸ਼ੀ ਵਾਜਬ ਰੇਟ, ਮਲਟੀ-ਆਰਡਰ ਰੂਟ ਬੰਡਲਿੰਗ ਅਤੇ ਲਗਾਤਾਰ ਕੋਲਡ-ਚੇਨ ਸੈਂਸਰ ਨਿਗਰਾਨੀ',
      marketplaceTab: 'ਮਾਰਕੀਟਪਲੇਸ ਆਰਡਰ',
      batchOptimizerTab: 'ਰੂਟ ਆਪਟੀਮਾਈਜ਼ਰ',
      liveTrackingTab: 'ਲਾਈਵ ਟਰੈਕਿੰਗ',
      activeOrders: 'ਕਿਸਾਨਾਂ ਦੀਆਂ ਟ੍ਰਾਂਸਪੋਰਟ ਮੰਗਾਂ',
      verifiedDrivers: 'ਉਪਲਬਧ ਡਰਾਈਵਰ ਸਾਥੀ',
      fairPriceFormula: 'ਦੂਰੀ-ਅਧਾਰਤ ਪਾਰਦਰਸ਼ੀ ਕੀਮਤ ਮਾਡਲ',
      acceptOrder: 'ਵਾਜਬ ਰੇਟ ਤੇ ਤੁਰੰਤ ਮਨਜ਼ੂਰ ਕਰੋ',
      placeBid: 'ਰੇਟ ਦਰਜ ਕਰੋ',
      bundleOrders: 'ਇੱਕੋ ਰੂਟ ਵਿੱਚ 2+ ਆਰਡਰ ਇਕੱਠੇ ਕਰੋ',
      bundleButton: 'ਆਪਟੀਮਾਈਜ਼ਡ ਰੂਟ ਦਾ ਹਿਸਾਬ ਲਗਾਓ',
      capacityUtilization: 'ਵਾਹਨ ਸਮਰੱਥਾ ਵਰਤੋਂ',
      distanceSaved: 'ਬਚਾਈ ਗਈ ਦੂਰੀ',
      fuelSaved: 'ਬਚਾਇਆ ਗਿਆ ਡੀਜ਼ਲ',
      co2Reduction: 'ਘਟਾਇਆ ਗਿਆ ਕਾਰਬਨ ਨਿਕਾਸ',
      bundleDriverPayout: 'ਡਰਾਈਵਰ ਦੀ ਕੁੱਲ ਕਮਾਈ',
      farmerDiscount: 'ਕਿਸਾਨਾਂ ਦੀ ਕੁੱਲ ਬੱਚਤ',
      multiStopItinerary: 'ਮਲਟੀ-ਸਟਾਪ ਰੂਟ ਯੋਜਨਾ',
      telemetryHeading: 'ਕੋਲਡ ਰੀਫ਼ਰ ਲਾਈਵ ਡੇਟਾ',
      reeferTemp: 'ਕੰਟੇਨਰ ਤਾਪਮਾਨ',
      targetTemp: 'ਟੀਚਾ ਤਾਪਮਾਨ',
      humidity: 'ਨਮੀ',
      vehicleSpeed: 'ਗੱਡੀ ਦੀ ਰਫ਼ਤਾਰ',
      etaMinutes: 'ਪਹੁੰਚਣ ਦਾ ਅੰਦਾਜ਼ਨ ਸਮਾਂ',
      doorStatus: 'ਦਰਵਾਜ਼ਾ ਅਤੇ ਸੀਲ ਸੁਰੱਖਿਆ'
    },
    customer: {
      title: 'ਡਿਜੀਟਲ ਉਤਪਾਦ ਪਾਸਪੋਰਟ',
      subtitle: 'ਖੇਤ ਤੋਂ ਲੈ ਕੇ ਥਾਲੀ ਤੱਕ ਦਾ ਸਫ਼ਰ ਅਤੇ ਤਾਜ਼ਗੀ ਦੇਖਣ ਲਈ ਕਿਊਆਰ ਕੋਡ ਸਕੈਨ ਕਰੋ',
      scanQrBtn: 'ਕਿਊਆਰ ਕੋਡ ਸਕੈਨ ਕਰੋ',
      quickScanPreset: 'ਜਾਂ ਜਾਂਚਿਆ ਬੈਚ ਚੁਣੋ:',
      passportTitle: 'ਪ੍ਰਮਾਣਿਤ ਡਿਜੀਟਲ ਪਾਸਪੋਰਟ',
      verifiedProvenance: '100% ਪ੍ਰਮਾਣਿਤ ਖੇਤਰੀ ਮੂਲ',
      farmOrigin: 'ਖੇਤ ਅਤੇ ਫ਼ਸਲ ਮੂਲ',
      farmer: 'ਉਤਪਾਦਕ ਕਿਸਾਨ',
      soilScore: 'ਮਿੱਟੀ ਸਿਹਤ ਸਕੋਰ',
      chemicalStatus: 'ਕੀਟਨਾਸ਼ਕ ਮੁਕਤ ਟੈਸਟ',
      coldChainAudit: 'ਕੋਲਡ ਚੇਨ ਇਤਿਹਾਸ',
      freshnessLife: 'ਤਾਜ਼ਗੀ ਅਤੇ ਸ਼ੈਲਫ ਲਾਈਫ਼',
      daysAmbient: 'ਕਮਰੇ ਦੇ ਤਾਪਮਾਨ ਤੇ ਬਚੇ ਦਿਨ',
      daysReefer: 'ਫਰਿੱਜ ਵਿੱਚ ਬਚੇ ਦਿਨ',
      preservationTips: 'ਘਰੇਲੂ ਸਾਂਭ-ਸੰਭਾਲ ਦੇ ਤਰੀਕੇ',
      nutritionalProfile: 'ਪੂਰਾ ਪੌਸ਼ਟਿਕ ਵਿਸ਼ਲੇਸ਼ਣ',
      recipesTitle: 'ਸਿਹਤਮੰਦ ਪਕਵਾਨ',
      prepTime: 'ਤਿਆਰੀ ਸਮਾਂ',
      healthBenefit: 'ਸਿਹਤ ਲਾਭ',
      tipFarmerBtn: 'ਕਿਸਾਨ ਨੂੰ ਸ਼ੁਕਰੀਆ ਅਤੇ ਟਿਪ ਭੇਜੋ',
      tipModalTitle: 'ਕਿਸਾਨ ਪ੍ਰਤੀ ਧੰਨਵਾਦ',
      sendTip: 'ਟਿਪ ਅਤੇ ਧੰਨਵਾਦ ਸੁਨੇਹਾ ਭੇਜੋ'
    }
  }
};
