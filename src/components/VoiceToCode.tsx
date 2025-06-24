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

    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;
      console.log("🎙️ Voice input:", transcript);

      if (transcript.trim()) {
        try {
          const code = await voiceToCode(transcript);
          onTranscript(code); // Send real code back to App.tsx
        } catch (err) {
          console.error("AI error:", err);
          setError("❌ Failed to generate code from voice.");
        }
      } else {
        setError("⚠️ No speech detected. Try again.");
      }
    };

    recognition.onerror = (e: any) => {
      console.error("Speech recognition error:", e);
      setError(`Voice error: ${e.error}`);
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="voice-to-code-wrapper">
      <button className="theme-button" onClick={startListening} disabled={isListening}>
        {isListening ? "🎙️ Listening..." : "🎤 Start Voice to Code"}
      </button>
      {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}
    </div>
  );
};
export default VoiceToCode;
