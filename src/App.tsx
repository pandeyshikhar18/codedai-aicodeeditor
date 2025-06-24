import React, { useState, useEffect } from 'react';
import CodeEditor from './components/CodeEditor';
import VoiceToCode from './components/VoiceToCode';
import ChatPane from './components/ChatPane';
import './App.css';
import './index.css';

const App = () => {
  const [code, setCode] = useState('// Start coding...');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleVoice = (codeBlock: string) => {
    setCode((prev) => prev + `\n${codeBlock}`);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-title">CodAIED</div>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </header>

      <div className="main-content">
        <div className="editor-pane">
          <CodeEditor value={code} onChange={setCode} />
          <div className="voice-to-code-wrapper">
            <VoiceToCode onTranscript={handleVoice} />
          </div>
        </div>
        <div className="chat-pane">
          <ChatPane />
        </div>
      </div>
    </div>
  );
};

export default App;
