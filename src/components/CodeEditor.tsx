import Editor from '@monaco-editor/react';
import React, { useState, useEffect } from 'react';

const librarySnippets: { [key: string]: string } = {
  javascript: `// Donot import any libraries fro now, this is just a beta version.

function greet(name) {
  return "Hello, " + name + "!";
}

greet("Shikhar");`,
  python: `# Importing common libraries
import numpy as np
import pandas as pd
import requests

# Start coding...`,
  typescript: `// Importing common libraries
import axios from 'axios';
import type { FC } from 'react';

// Start coding...`,
  cpp: `// Common C++ includes
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    // Start coding...
    return 0;
}`,
  c: `// Common C includes
#include <stdio.h>
#include <stdlib.h>

int main() {
    // Start coding...
    return 0;
}`,
  java: `// Common Java imports
import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) {
        // Start coding...
    }
}`
};

type Props = {
  value: string;
  onChange: (val: string) => void;
  onRun: () => void;
};

const CodeEditor: React.FC<Props> = ({ value, onChange, onRun }) => {
  const [language, setLanguage] = useState<string>('javascript');

  useEffect(() => {
    if (librarySnippets[language]) {
      onChange(librarySnippets[language]);
    }
  }, [language]);

  return (
    <div>
      <div
        style={{
          marginBottom: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div>
          <label htmlFor="lang">Select Language: </label>
          <select
            id="lang"
            onChange={(e) => setLanguage(e.target.value)}
            value={language}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python (read-only)</option>
            <option value="typescript">TypeScript (read-only)</option>
            <option value="cpp">C++ (read-only)</option>
            <option value="c">C (read-only)</option>
            <option value="java">Java (read-only)</option>
          </select>
        </div>

        <button
          onClick={() => {
            if (language !== 'javascript') {
              alert('⚠️ BETA Version: Only JavaScript is executable at the moment.');
              return;
            }
            onRun();
          }}
          className="run-button"
        >
          ▶ Run
        </button>
      </div>

      <Editor
        height="75vh"
        defaultLanguage={language}
        language={language}
        value={value}
        onChange={(v) => onChange(v ?? '')}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          wordWrap: 'on'
        }}
      />
    </div>
  );
};

export default CodeEditor;
