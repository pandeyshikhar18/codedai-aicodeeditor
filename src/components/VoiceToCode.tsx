import React, { useState } from 'react';
import { voiceToCode } from '../utils/api';

interface VoiceToCodeProps {
  onTranscript: (codeBlock: string) => void;
}

const VoiceToCode: React.FC<VoiceToCodeProps> = ({ onTranscript }) => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startListening = () => {
    const SpeechRecognition =
      (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;

    if (!SpeechRecognition) {
      setError("❌ Voice recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (e: any) => {
      console.error("Speech recognition error:", e);
      setError(`🎤 Voice error: ${e.error}`);
      setIsListening(false);
    };

    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;
      console.log("🎙️ Voice input:", transcript);

      if (!transcript.trim()) {
        setError("⚠️ No speech detected. Try again.");
        return;
      }

      try {
        const code = await voiceToCode(transcript);
        onTranscript(code);
      } catch (err) {
        console.error("❌ AI error:", err);
        setError("❌ Failed to generate code from voice.");
      }
    };

    recognition.start();
  };

  return (
    <>
      <button
        className="theme-button"
        onClick={startListening}
        disabled={isListening}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          zIndex: 1000,
        }}
      >
        {isListening ? '🎙️ Listening...' : '🎤 Start Voice to Code'}
      </button>
      {error && (
        <div
          style={{
            position: 'fixed',
            bottom: '60px',
            left: '20px',
            color: 'red',
            background: '#fff0f0',
            padding: '6px 12px',
            borderRadius: '6px',
            zIndex: 1000,
          }}
        >
          {error}
        </div>
      )}
    </>
  );
};

export default VoiceToCode;
