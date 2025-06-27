import React, { useState, useEffect, useRef } from "react";
import { getCompletion } from "../utils/api";

type Message = {
  type: "user" | "ai";
  text: string;
};

const ChatPane: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const send = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage: Message = { type: "user", text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const reply = await getCompletion(trimmed);
      setMessages((prev) => [...prev, { type: "ai", text: reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { type: "ai", text: "❌ Error from AI." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") send();
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <div ref={containerRef} className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={`chat-bubble ${m.type}`}>
            <strong>{m.type === "user" ? "You" : "AI"}:</strong> {m.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask your AI assistant..."
        />
        <button onClick={send} disabled={loading}>
          {loading ? "..." : "Send"}
        </button>
      </div>

      <div className="chat-footer">
        Developed by <strong>Shikhar</strong>
      </div>
    </div>
  );
};

export default ChatPane;
