import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  X, 
  Key, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Send, 
  ArrowRight,
  Radio,
  Sliders,
  Play,
  Square
} from 'lucide-react';
import { 
  SARVAM_SUPPORTED_LANGUAGES, 
  SarvamLanguage, 
  AudioRecorder, 
  transcribeAudioWithSarvam, 
  speakTextWithSarvam, 
  querySarvamVoiceAssistant, 
  getStoredSarvamApiKey, 
  setStoredSarvamApiKey,
  AssistantAnswerResponse
} from '../../services/voice/sarvamVoiceService';
import confetti from 'canvas-confetti';

interface SarvamVoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCropFromVoice?: (cropName: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  cropDetected?: string;
  mandiPrice?: number;
  packagingRecommendation?: string;
  audioBase64?: string;
}

function getLocalizedWelcome(code: string): string {
  if (code.startsWith('kn')) return 'ನಮಸ್ಕಾರ! ನಾನು ಅಗ್ರಿಫ್ಲೋ ಸರ್ವಮ್ AI ಧ್ವನಿ ಮಿತ್ರ. ನಿಮ್ಮ ಮಾತೃಭಾಷೆಯಲ್ಲಿ ಯಾವುದೇ ಬೆಳೆ, ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಅಥವಾ ಪ್ಯಾಕೇಜಿಂಗ್ ಬಗ್ಗೆ ಕೇಳಬಹುದು.';
  if (code.startsWith('te')) return 'నమస్కారం! నేను అగ్రిఫ్లో సర్వం AI వాయిస్ మిత్రుడిని. మీ మాతృభాషలో పంటలు, మార్కెట్ ధరలు లేదా ప్యాకేజింగ్ గురించి అడగవచ్చు.';
  if (code.startsWith('ta')) return 'வணக்கம்! நான் அக்ரிஃப்ளோ சர்வம் AI குரல் உதவியாளர். உங்கள் தாய்மொழியில் பயிர்கள், சந்தை விலை அல்லது பேக்கேஜிங் பற்றி கேட்கலாம்.';
  if (code.startsWith('en')) return 'Hello! I am AgriFlow Sarvam AI Voice Assistant. Ask me in your regional language about any crop, live APMC price, or certified packaging.';
  return 'नमस्ते! मैं एग्रीफ्लो का सर्वम AI वॉयस मित्र हूँ। आप अपनी भाषा में किसी भी फसल, मंडी भाव या पैकेजिंग के बारे में पूछ सकते हैं।';
}

function getLocalizedErrorMessage(code: string): string {
  if (code.startsWith('kn')) return 'ಕ್ಷಮಿಸಿ, ಧ್ವನಿ ಗುರುತಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ಸ್ಪಷ್ಟವಾಗಿ ಮಾತನಾಡಿ ಅಥವಾ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ.';
  if (code.startsWith('te')) return 'క్షమించండి, వాయిస్ అర్థం కాలేదు. దయచేసి మళ్లీ మాట్లాడండి లేదా టైప్ చేయండి.';
  if (code.startsWith('ta')) return 'மன்னிக்கவும், குரல் புரியவில்லை. தயவுசெய்து மீண்டும் பேசவும் அல்லது தட்டச்சு செய்யவும்.';
  if (code.startsWith('en')) return 'Sorry, could not process the voice audio. Please speak again clearly or type your question below.';
  return 'माफ़ कीजिए, आवाज़ समझ नहीं आई। कृपया दोबारा बोलें या टेक्स्ट लिखें।';
}

export const SarvamVoiceAssistantModal: React.FC<SarvamVoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  onSelectCropFromVoice
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<SarvamLanguage>(SARVAM_SUPPORTED_LANGUAGES[0]);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [textQuery, setTextQuery] = useState<string>('');
  const [apiKeyInput, setApiKeyInput] = useState<string>('');
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [apiKeySavedStatus, setApiKeySavedStatus] = useState<boolean>(false);
  const [currentlyPlayingAudio, setCurrentlyPlayingAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: 'नमस्ते! मैं एग्रीफ्लो का सर्वम AI वॉयस मित्र हूँ। आप अपनी भाषा में किसी भी फसल, मंडी भाव या पैकेजिंग के बारे में पूछ सकते हैं।',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const recorderRef = useRef<AudioRecorder | null>(null);
  const timerRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setApiKeyInput(getStoredSarvamApiKey());
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  if (!isOpen) return null;

  const handleStartRecording = async () => {
    try {
      if (!recorderRef.current) {
        recorderRef.current = new AudioRecorder();
      }
      await recorderRef.current.start();
      setIsRecording(true);
      setRecordingSeconds(0);

      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err: any) {
      console.error('Recording start error:', err);
      alert('Microphone permission error: ' + (err.message || 'Please enable microphone access.'));
    }
  };

  const handleStopRecordingAndProcess = async () => {
    if (!recorderRef.current || !isRecording) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRecording(false);
    setIsProcessing(true);

    try {
      const audioBlob = await recorderRef.current.stop();
      // 1. Transcribe audio with Sarvam Saaras model
      const transcription = await transcribeAudioWithSarvam(audioBlob, selectedLanguage.code);
      const queryText = transcription.transcript.trim();

      if (!queryText) {
        setIsProcessing(false);
        return;
      }

      await handleExecuteQuery(queryText);
    } catch (err: any) {
      console.error('Audio processing failed:', err);
      const errMsg = getLocalizedErrorMessage(selectedLanguage.code);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: errMsg,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExecuteQuery = async (queryText: string) => {
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsProcessing(true);

    try {
      // 2. Query Sarvam Assistant
      const result: AssistantAnswerResponse = await querySarvamVoiceAssistant(
        queryText,
        selectedLanguage.code
      );

      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: result.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        cropDetected: result.cropDetected,
        mandiPrice: result.mandiPrice,
        packagingRecommendation: result.packagingRecommendation,
        audioBase64: result.audioBase64
      };

      setMessages((prev) => [...prev, assistantMsg]);

      // If audio returned, play it
      if (result.audioBase64) {
        handlePlayAudio(result.audioBase64);
      } else {
        // Fallback to speech synthesis
        speakTextWithSarvam(result.answer, selectedLanguage.code, selectedLanguage.defaultSpeaker);
      }

      if (result.cropDetected) {
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
      }
    } catch (err: any) {
      console.error('Query execution error:', err);
    } finally {
      setIsProcessing(false);
      setTextQuery('');
    }
  };

  const handlePlayAudio = (audioBase64: string) => {
    if (currentlyPlayingAudio) {
      currentlyPlayingAudio.pause();
    }
    const audio = new Audio(`data:audio/wav;base64,${audioBase64}`);
    setCurrentlyPlayingAudio(audio);
    setIsPlayingAudio(true);
    audio.play();
    audio.onended = () => {
      setIsPlayingAudio(false);
      setCurrentlyPlayingAudio(null);
    };
  };

  const handleStopAudio = () => {
    if (currentlyPlayingAudio) {
      currentlyPlayingAudio.pause();
      setCurrentlyPlayingAudio(null);
      setIsPlayingAudio(false);
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const handleSaveApiKey = () => {
    setStoredSarvamApiKey(apiKeyInput);
    setApiKeySavedStatus(true);
    setTimeout(() => setApiKeySavedStatus(false), 3000);
  };

  return typeof document !== 'undefined' ? createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-purple-500/40 rounded-3xl shadow-[0_0_60px_rgba(168,85,247,0.35)] flex flex-col max-h-[92vh] overflow-hidden text-slate-100">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-purple-500/20 bg-slate-950/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-700 via-indigo-600 to-sky-400 p-[1.5px] shadow-lg">
              <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center text-xl">
                🎙️
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300">
                  Sarvam AI Indic Voice Assistant
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                  Saaras v2 STT • Bulbul TTS
                </span>
              </div>
              <h3 className="text-base font-bold text-white">
                Kisan Sarvam Voice Mitra (किसान वॉयस मित्र)
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-xl text-xs font-medium border transition-colors ${
                showSettings 
                  ? 'bg-purple-600/30 border-purple-400 text-purple-200' 
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
              }`}
              title="Configure Sarvam AI API Key"
            >
              <Key className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* API Settings Drawer */}
        {showSettings && (
          <div className="p-4 bg-slate-950 border-b border-purple-500/30 space-y-3 animate-fade-in text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-300 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-sky-400" />
                Connect Your Sarvam AI API Key
              </span>
              <a
                href="https://dashboard.sarvam.ai"
                target="_blank"
                rel="noreferrer"
                className="text-sky-400 hover:text-sky-300 flex items-center gap-1 font-semibold underline text-[11px]"
              >
                <span>Get API Key from dashboard.sarvam.ai</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-slate-400 text-[11px]">
              Paste your key below to unlock low-latency Indic speech recognition and neural voice synthesis. If left blank, AgriFlow automatically falls back to browser voice recognition.
            </p>
            <div className="flex gap-2">
              <input
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="Enter SARVAM_API_KEY (e.g. 78a94b-xxxx-xxxx)"
                className="flex-1 bg-slate-900 border border-purple-500/30 rounded-xl px-3 py-2 text-white font-mono text-xs outline-none focus:border-purple-400"
              />
              <button
                onClick={handleSaveApiKey}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow cursor-pointer hover:scale-[1.02] transition-all"
              >
                {apiKeySavedStatus ? 'Saved ✓' : 'Save Key'}
              </button>
            </div>
          </div>
        )}

        {/* Indic Language Picker Carousel */}
        <div className="px-4 py-2.5 bg-slate-950/40 border-b border-purple-500/10 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-mono text-slate-400 shrink-0 flex items-center gap-1">
            <Radio className="w-3 h-3 text-purple-400" /> Language:
          </span>
          {SARVAM_SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setSelectedLanguage(lang);
                setMessages((prev) => {
                  if (prev.length <= 1) {
                    return [{
                      id: `welcome-${Date.now()}`,
                      sender: 'assistant',
                      text: getLocalizedWelcome(lang.code),
                      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    }];
                  }
                  return prev;
                });
              }}
              className={`px-2.5 py-1 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedLanguage.code === lang.code
                  ? 'bg-purple-600 text-white shadow-md scale-105 border border-purple-400'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.nativeName}</span>
              <span className="text-[10px] opacity-70">({lang.name})</span>
            </button>
          ))}
        </div>

        {/* Conversational Message Thread */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 space-y-2.5 ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-purple-700 to-indigo-700 text-white rounded-br-none shadow-md'
                    : 'bg-slate-950/80 border border-purple-500/30 text-slate-200 rounded-bl-none shadow-md'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-purple-300 font-mono">
                  <span>{msg.sender === 'user' ? '👨‍🌾 Farmer Voice' : '🤖 Sarvam Voice Mitra'}</span>
                  <span>{msg.timestamp}</span>
                </div>
                
                <p className="text-xs sm:text-sm leading-relaxed">{msg.text}</p>

                {/* Structured Agricultural Metadata Box */}
                {msg.cropDetected && (
                  <div className="mt-2 p-3 rounded-xl bg-slate-900 border border-purple-500/25 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300 font-bold">Detected: {msg.cropDetected}</span>
                      {msg.mandiPrice && (
                        <span className="font-mono text-emerald-400 font-bold">₹{msg.mandiPrice}/kg Mandi</span>
                      )}
                    </div>
                    {msg.packagingRecommendation && (
                      <div className="text-[11px] text-slate-300">
                        📦 <b>Packaging:</b> {msg.packagingRecommendation}
                      </div>
                    )}
                    {onSelectCropFromVoice && (
                      <button
                        onClick={() => {
                          onSelectCropFromVoice(msg.cropDetected!);
                          onClose();
                        }}
                        className="w-full mt-1 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-200 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>Open {msg.cropDetected} Smart Blueprint</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}

                {/* Speech Playback Controls */}
                {msg.sender === 'assistant' && (
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => {
                        if (msg.audioBase64) {
                          handlePlayAudio(msg.audioBase64);
                        } else {
                          speakTextWithSarvam(msg.text, selectedLanguage.code, selectedLanguage.defaultSpeaker);
                        }
                      }}
                      className="px-2.5 py-1 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 text-[11px] font-bold flex items-center gap-1.5 border border-purple-500/30 transition-colors"
                    >
                      <Volume2 className="w-3 h-3 text-sky-400" />
                      <span>Speak Answer</span>
                    </button>
                    {isPlayingAudio && (
                      <button
                        onClick={handleStopAudio}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold flex items-center gap-1 transition-colors"
                      >
                        <Square className="w-3 h-3 text-rose-400" />
                        <span>Stop</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isProcessing && (
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-950/60 border border-purple-500/30 text-xs text-purple-300 animate-pulse">
              <RefreshCw className="w-4 h-4 animate-spin text-sky-400" />
              <span>Analyzing speech with Sarvam AI Saaras model & fetching live APMC packaging benchmark...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 border-t border-purple-500/10 bg-slate-950/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] text-slate-500 font-mono shrink-0">Try asking:</span>
          {[
            'टमाटर के लिए पैकेजिंग क्या है?',
            'What is mandi price for Onion?',
            'ಬೆಂಡೆಕಾಯಿ ಶೀತಲ ಶೇಖರಣೆ',
            'Alphonso Mango packaging specs',
            'Potato storage temperature'
          ].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleExecuteQuery(prompt)}
              disabled={isProcessing || isRecording}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-purple-900/40 text-slate-300 hover:text-purple-200 text-[11px] whitespace-nowrap border border-slate-700 transition-colors cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Microphone Recording & Text Input Bottom Bar */}
        <div className="p-4 sm:p-5 border-t border-purple-500/20 bg-slate-950/80 space-y-3">
          
          {/* Active Voice Recording Status Bar */}
          {isRecording && (
            <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-900/50 via-slate-900 to-indigo-900/50 border border-purple-400/40 flex items-center justify-between animate-pulse">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-rose-500"></span>
                </span>
                <span className="text-xs font-bold text-white">
                  Listening in {selectedLanguage.nativeName} ({selectedLanguage.name})... Speak now!
                </span>
              </div>
              <span className="text-xs font-mono text-purple-300 font-bold">
                00:{recordingSeconds < 10 ? `0${recordingSeconds}` : recordingSeconds}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2.5">
            {/* Primary Sarvam Microphone Button */}
            <button
              onClick={isRecording ? handleStopRecordingAndProcess : handleStartRecording}
              disabled={isProcessing}
              className={`p-3.5 rounded-2xl flex items-center justify-center transition-all cursor-pointer shadow-lg ${
                isRecording
                  ? 'bg-rose-600 hover:bg-rose-500 text-white animate-bounce shadow-rose-950/50'
                  : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 hover:from-purple-500 hover:to-sky-500 text-white shadow-purple-950/50 hover:scale-105'
              }`}
              title={isRecording ? 'Stop & Process Voice' : `Click to speak in ${selectedLanguage.name}`}
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Manual Text Input Bar */}
            <div className="flex-1 relative flex items-center">
              <input
                type="text"
                value={textQuery}
                onChange={(e) => setTextQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && textQuery.trim() && !isProcessing) {
                    handleExecuteQuery(textQuery);
                  }
                }}
                disabled={isProcessing || isRecording}
                placeholder={`Ask in ${selectedLanguage.name} (${selectedLanguage.nativeName}) e.g. "टमाटर का भाव और पैकेजिंग"...`}
                className="w-full bg-slate-900 border border-purple-500/30 rounded-2xl pl-4 pr-12 py-3 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-purple-400 shadow-inner"
              />
              <button
                onClick={() => {
                  if (textQuery.trim() && !isProcessing) {
                    handleExecuteQuery(textQuery);
                  }
                }}
                disabled={!textQuery.trim() || isProcessing}
                className="absolute right-2 p-2 rounded-xl bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white disabled:opacity-30 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-500 px-1 font-mono">
            <span>Powered by Sarvam AI Foundation Models (Bengaluru, India)</span>
            <span>10+ Indic Languages • Offline Fallback Enabled</span>
          </div>

        </div>

      </div>
    </div>,
    document.body
  ) : null;
};
