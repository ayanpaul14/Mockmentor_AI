import { useState } from 'react';

export default function VoiceInput({ onTranscript }) {
  const [listening, setListening] = useState(false);
  const supported =
    typeof window !== 'undefined' &&
    ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);

  if (!supported) return null;

  const startListening = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const r = new SR();
    r.lang = 'en-IN';
    r.interimResults = false;
    r.maxAlternatives = 1;
    r.onstart  = () => setListening(true);
    r.onend    = () => setListening(false);
    r.onerror  = () => setListening(false);
    r.onresult = (e) => onTranscript(e.results[0][0].transcript);
    r.start();
  };

  return (
    <button
      type="button"
      onClick={startListening}
      disabled={listening}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
        listening
          ? 'bg-red-50 border-red-200 text-red-500 animate-pulse'
          : 'bg-white border-[#e0ddd8] text-[#666] hover:border-[#aaa]'
      }`}
    >
      <span>{listening ? '●' : '🎤'}</span>
      <span>{listening ? 'Listening…' : 'Voice'}</span>
    </button>
  );
}