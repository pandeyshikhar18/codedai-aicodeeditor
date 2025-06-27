import React, { useState, useEffect } from 'react';
import CodeEditor from './components/CodeEditor';
import VoiceToCode from './components/VoiceToCode';
import ChatPane from './components/ChatPane';
import './App.css';
import './index.css';

const App: React.FC = () => {
  const [code, setCode] = useState<string>(
    `// Start coding...\nconsole.log("Hello from CodAIED!");`
  );
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleVoice = (spokenCode: string) => {
    setCode((prev) => prev + `\n${spokenCode}`);
  };

  const handleRunCode = () => {
    try {
      const result = eval(code);
      alert(`✅ Output: ${result}`);
    } catch (error: any) {
      alert(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-title">CodAIED</div>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </header>

      {/* 🟡 Instruction Bar */}
      <div className="app-alert">
        ⚠️ This is a <strong>Beta Version</strong>. Currently, only <strong>JavaScript</strong> is supported for execution.
        Voice-to-code works best in <strong>Google Chrome</strong>.
      </div>

      <div className="main-content">
        <div className="editor-pane">
          <CodeEditor value={code} onChange={setCode} onRun={handleRunCode} />
        </div>

        <div className="chat-pane">
          <ChatPane />
        </div>
      </div>

      {/* 🎤 Floating VoiceToCode Button */}
      <VoiceToCode onTranscript={handleVoice} />
    </div>
  );
};

export default App;
