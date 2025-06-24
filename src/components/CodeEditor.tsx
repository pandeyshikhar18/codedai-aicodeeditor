import Editor from '@monaco-editor/react';
import React, { useState, useEffect } from 'react';

const librarySnippets: { [key: string]: string } = {
  javascript: `// Importing common libraries
import React from 'react';
import axios from 'axios';

// Start coding...
`,
  python: `# Importing common libraries
import numpy as np
import pandas as pd
import requests

# Start coding...
`,
  typescript: `// Importing common libraries
import axios from 'axios';
import type { FC } from 'react';

// Start coding...
`,
  cpp: `// Common C++ includes
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    // Start coding...
    return 0;
}
`,
  c: `// Common C includes
#include <stdio.h>
#include <stdlib.h>

int main() {
    // Start coding...
    return 0;
}
`,
  java: `// Common Java imports
import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) {
        // Start coding...
    }
}
`,
};

const CodeEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) => {
  const [language, setLanguage] = useState('javascript');

  // Insert snippet on language change
  useEffect(() => {
    if (librarySnippets[language]) {
      onChange(librarySnippets[language]);
    }
  }, [language]);

  return (
    <div>
      <div style={{ marginBottom: '8px' }}>
        <label htmlFor="lang">Select Language: </label>
        <select
          id="lang"
          onChange={(e) => setLanguage(e.target.value)}
          value={language}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="typescript">TypeScript</option>
          <option value="cpp">C++</option>
          <option value="c">C</option>
          <option value="java">Java</option>
        </select>
      </div>

      <Editor
        height="75vh"
        language={language}
        value={value}
        onChange={(v) => onChange(v ?? '')}
        theme="vs-dark"
      />
    </div>
  );
};

export default CodeEditor;
