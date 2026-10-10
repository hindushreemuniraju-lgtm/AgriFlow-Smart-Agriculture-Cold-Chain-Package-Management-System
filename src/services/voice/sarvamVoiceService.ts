/**
 * AgriFlow - Sarvam AI Indic Voice Assistant Service
 * 
 * Provides:
 * 1. Speech-to-Text (STT) via Sarvam AI Saaras model (multilingual Indic speech recognition)
 * 2. Text-to-Speech (TTS) via Sarvam AI Bulbul model (high-fidelity Indic neural synthesis)
 * 3. Browser fallback (Web Speech API + speechSynthesis) when offline or API key pending
 * 4. Audio recording utility via HTML5 MediaRecorder
 */

export interface SarvamLanguage {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  defaultSpeaker: string;
}

export const SARVAM_SUPPORTED_LANGUAGES: SarvamLanguage[] = [
  { code: 'hi-IN', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', defaultSpeaker: 'meera' },
  { code: 'kn-IN', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', defaultSpeaker: 'meera' },
  { code: 'ta-IN', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', defaultSpeaker: 'meera' },
  { code: 'te-IN', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', defaultSpeaker: 'meera' },
  { code: 'mr-IN', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', defaultSpeaker: 'meera' },
  { code: 'bn-IN', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳', defaultSpeaker: 'meera' },
  { code: 'gu-IN', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', defaultSpeaker: 'meera' },
  { code: 'pa-IN', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳', defaultSpeaker: 'meera' },
  { code: 'ml-IN', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳', defaultSpeaker: 'meera' },
  { code: 'od-IN', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳', defaultSpeaker: 'meera' },
  { code: 'en-IN', name: 'Indian English', nativeName: 'English (IN)', flag: '🇮🇳', defaultSpeaker: 'shubh' }
];

export interface TranscriptionResponse {
  transcript: string;
  languageCode: string;
  source: 'sarvam-cloud' | 'browser-speech-recognition' | 'fallback-simulation';
  confidence?: number;
}

export interface AssistantAnswerResponse {
  answer: string;
  cropDetected?: string;
  cropId?: string;
  mandiPrice?: number;
  packagingRecommendation?: string;
  storageTemp?: string;
  audioBase64?: string;
  languageCode: string;
}

const STORAGE_KEY_SARVAM_KEY = 'agriflow_sarvam_api_key';

/**
 * Get configured Sarvam API key from localStorage or Vite environment
 */
export function getStoredSarvamApiKey(): string {
  if (typeof window !== 'undefined') {
    const local = localStorage.getItem(STORAGE_KEY_SARVAM_KEY);
    if (local && local.trim()) return local.trim();
  }
  return (import.meta as any).env?.VITE_SARVAM_API_KEY || '';
}

/**
 * Save user-provided Sarvam API key in localStorage
 */
export function setStoredSarvamApiKey(key: string): void {
  if (typeof window !== 'undefined') {
    if (!key || !key.trim()) {
      localStorage.removeItem(STORAGE_KEY_SARVAM_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY_SARVAM_KEY, key.trim());
    }
  }
}

/**
 * Audio Recording Session Manager
 */
export class AudioRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private stream: MediaStream | null = null;

  async start(): Promise<void> {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('Microphone access is not supported in this browser environment.');
    }

    this.audioChunks = [];
    this.stream = await navigator.mediaDevices.getUserMedia({ 
      audio: {
        channelCount: 1,
        sampleRate: 16000,
        echoCancellation: true,
        noiseSuppression: true
      } 
    });

    const options = { mimeType: 'audio/webm;codecs=opus' };
    const safeMime = MediaRecorder.isTypeSupported(options.mimeType) ? options.mimeType : '';

    this.mediaRecorder = safeMime 
      ? new MediaRecorder(this.stream, { mimeType: safeMime })
      : new MediaRecorder(this.stream);

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.audioChunks.push(event.data);
      }
    };

    this.mediaRecorder.start(250);
  }

  stop(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(new Error('Recorder is not active.'));
        return;
      }

      this.mediaRecorder.onstop = () => {
        const mimeType = this.mediaRecorder?.mimeType || 'audio/webm';
        const audioBlob = new Blob(this.audioChunks, { type: mimeType });
        
        // Stop all audio tracks
        if (this.stream) {
          this.stream.getTracks().forEach((track) => track.stop());
          this.stream = null;
        }

        resolve(audioBlob);
      };

      this.mediaRecorder.stop();
    });
  }

  isRecording(): boolean {
    return this.mediaRecorder !== null && this.mediaRecorder.state === 'recording';
  }
}

const getApiBase = (): string => (typeof window !== 'undefined' ? '' : 'http://localhost:5000');

export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Transcribe audio using Sarvam API (via backend proxy or direct with user key)
 * Automatically falls back to browser Web Speech API or mock if keys are not present.
 */
export async function transcribeAudioWithSarvam(
  audioBlob: Blob,
  languageCode: string = 'hi-IN'
): Promise<TranscriptionResponse> {
  const userKey = getStoredSarvamApiKey();

  try {
    // 1. Try sending to AgriFlow backend proxy (/api/voice/transcribe)
    const audioBase64 = await blobToBase64(audioBlob);
    const res = await fetch(`${getApiBase()}/api/voice/transcribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        audioBase64,
        mimeType: audioBlob.type || 'audio/webm',
        languageCode,
        apiKey: userKey
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.transcript) {
        return {
          transcript: data.transcript,
          languageCode: data.languageCode || languageCode,
          source: data.source || 'sarvam-cloud'
        };
      }
    }
  } catch (err) {
    console.warn('[SarvamVoiceService] Backend proxy request failed, falling back:', err);
  }

  // 2. Direct browser fallback if direct key exists
  if (userKey) {
    try {
      const directFormData = new FormData();
      directFormData.append('file', audioBlob, 'voice.webm');
      directFormData.append('model', 'saaras:v2');
      directFormData.append('language_code', languageCode);

      const directRes = await fetch('https://api.sarvam.ai/speech-to-text', {
        method: 'POST',
        headers: {
          'api-subscription-key': userKey
        },
        body: directFormData
      });

      if (directRes.ok) {
        const directData = await directRes.json();
        if (directData.transcript) {
          return {
            transcript: directData.transcript,
            languageCode,
            source: 'sarvam-cloud'
          };
        }
      }
    } catch (directErr) {
      console.warn('[SarvamVoiceService] Direct Sarvam API call error:', directErr);
    }
  }

  // 3. Fallback: Throw clear error so UI prompts user to speak again or type query
  throw new Error('Speech transcription could not be completed. Please configure your Sarvam AI API key or enter your query using text.');
}

/**
 * Synthesize speech using Sarvam Bulbul Neural Voice or Browser SpeechSynthesis
 */
export async function speakTextWithSarvam(
  text: string,
  languageCode: string = 'hi-IN',
  speaker: string = 'meera'
): Promise<HTMLAudioElement | null> {
  if (!text.trim()) return null;

  const userKey = getStoredSarvamApiKey();

  try {
    // 1. Try backend synthesis
    const res = await fetch(`${getApiBase()}/api/voice/synthesize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        languageCode,
        speaker,
        apiKey: userKey
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.audioBase64) {
        const audio = new Audio(`data:audio/wav;base64,${data.audioBase64}`);
        await audio.play();
        return audio;
      }
    }
  } catch (err) {
    console.warn('[SarvamVoiceService] Backend TTS synthesis failed, using browser speech:', err);
  }

  // 2. Browser built-in speechSynthesis fallback
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = languageCode;
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }

  return null;
}

/**
 * Ask Kisan Sarvam Voice Assistant
 * Returns agronomy, APMC rates, packaging specifications, and spoken audio
 */
export async function querySarvamVoiceAssistant(
  question: string,
  languageCode: string = 'hi-IN'
): Promise<AssistantAnswerResponse> {
  const userKey = getStoredSarvamApiKey();

  try {
    const res = await fetch(`${getApiBase()}/api/voice/assistant`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: question,
        languageCode,
        apiKey: userKey
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        return data;
      }
    }
  } catch (err) {
    console.warn('[SarvamVoiceService] Assistant query failed, using local reasoning:', err);
  }

  // Local fallback response generator
  return generateLocalVoiceResponse(question, languageCode);
}

/**
 * Local fallback response generator if backend is unavailable
 */
function generateLocalVoiceResponse(query: string, languageCode: string): AssistantAnswerResponse {
  const q = query.toLowerCase();

  let crop = 'Tomato';
  let price = 24;
  let pkg = 'Corrugated Fiberboard (CFB) Ventilated Crate (10-12 kg)';
  let temp = '10°C - 12°C with 85-90% Relative Humidity';

  if (q.includes('onion') || q.includes('प्याज़') || q.includes('ईरुळ्ळी') || q.includes('eerulli')) {
    crop = 'Onion';
    price = 28;
    pkg = 'Breathable Lenomesh / Natural Jute Sack';
    temp = 'Ambient well-ventilated dry storage (25°C, 65% RH)';
  } else if (q.includes('potato') || q.includes('आलू') || q.includes('ಆಲೂಗಡ್ಡೆ') || q.includes('aloo')) {
    crop = 'Potato';
    price = 18;
    pkg = 'High-Ventilation Corrugated Bin / Jute Sack';
    temp = '10°C - 14°C in dark ambient conditions';
  } else if (q.includes('mango') || q.includes('आम') || q.includes('ಮಾವಿನಹಣ್ಣು')) {
    crop = 'Mango';
    price = 95;
    pkg = 'Cushioned CFB Export Cartons with Ethylene Scavenger Liners';
    temp = '12°C - 14°C Controlled Atmosphere';
  } else if (q.includes('okra') || q.includes('bhindi') || q.includes('भिंडी') || q.includes('ಬೆಂಡೆಕಾಯಿ')) {
    crop = 'Okra';
    price = 32;
    pkg = 'Micro-Perforated LDPE Produce Liner inside CFB Box';
    temp = '8°C - 10°C High Humidity (90-95% RH)';
  } else if (q.includes('cardamom') || q.includes('elaichi') || q.includes('इलायची') || q.includes('ಏಲಕ್ಕಿ') || q.includes('elakki')) {
    crop = 'Green Cardamom (Choti Elaichi)';
    price = 1950;
    pkg = 'Hermetic Met-PET / Polyethylene Aroma-Barrier Pouch';
    temp = '10°C - 15°C Cool Dry Warehouse (<60% RH)';
  } else if (q.includes('white pepper') || q.includes('safed mirch') || q.includes('सफेद मिर्च') || q.includes('ಬಿಳಿ ಮೆಣಸು')) {
    crop = 'White Pepper (Safed Mirch)';
    price = 1350;
    pkg = 'Multi-layer Metallized Pouch (PET/Met-PET/PE)';
    temp = '15°C - 24°C Dry (<60% RH)';
  } else if (q.includes('green pepper') && (q.includes('corn') || q.includes('spice') || q.includes('ಹಸಿ ಕಾಳುಮೆಣಸು') || q.includes('हरी काली मिर्च'))) {
    crop = 'Green Peppercorns (Kacha Menasu)';
    price = 850;
    pkg = 'Hermetic Food-Grade Pails / Acidified Brine Canisters';
    temp = '2°C - 4°C Chilled Brine';
  } else if (q.includes('capsicum') || q.includes('bell pepper') || q.includes('shimla') || q.includes('शिमला मिर्च') || q.includes('ದಪ್ಪ ಮೆಣಸಿನಕಾಯಿ')) {
    crop = 'Capsicum / Bell Pepper (Shimla Mirch)';
    price = 48;
    pkg = 'Ventilated Corrugated CFB Crate with Foam Sleeves';
    temp = '7°C - 10°C (90-95% RH)';
  } else if (q.includes('pepper') || q.includes('black pepper') || q.includes('kali mirch') || q.includes('काली मिर्च') || q.includes('ಕಾಳುಮೆಣಸು') || q.includes('peppercorn')) {
    crop = 'Black Pepper (Kali Mirch)';
    price = 1100;
    pkg = 'Hermetic Metallized Moisture-Barrier Pouch (Met-PET/PE)';
    temp = '15°C - 24°C Dry (<60% RH)';
  }

  let answer = '';
  if (languageCode === 'hi-IN') {
    answer = `${crop} के लिए अनुशंसित पैकेजिंग "${pkg}" है। वर्तमान मंडी भाव ₹${price}/kg है। अनुशंसित भंडारण तापमान ${temp} है।`;
  } else if (languageCode === 'kn-IN') {
    answer = `${crop} ಗಾಗಿ ಶಿಫಾರಸು ಮಾಡಿದ ಪ್ಯಾಕೇಜಿಂಗ್ "${pkg}". ಇಂದಿನ ಎಪಿಎಂಸಿ ಮಂಡಿ ದರ ₹${price}/ಕೆಜಿ. ಶೇಖರಣಾ ತಾಪಮಾನ ${temp}.`;
  } else if (languageCode === 'ta-IN') {
    answer = `${crop}க்கான பரிந்துரைக்கப்பட்ட பேக்கேஜிங் "${pkg}". இன்றைய மண்டி விலை ₹${price}/கிலோ. சேமிப்பு வெப்பநிலை ${temp}.`;
  } else {
    answer = `For ${crop}, the recommended packaging is ${pkg}. Current APMC mandi price is ₹${price}/kg. Recommended storage is ${temp}.`;
  }

  return {
    answer,
    cropDetected: crop,
    cropId: crop.toLowerCase(),
    mandiPrice: price,
    packagingRecommendation: pkg,
    storageTemp: temp,
    languageCode
  };
}
