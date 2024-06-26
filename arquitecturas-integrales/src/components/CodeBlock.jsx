// CodeBlock.js
import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Importing dark theme
import copy from 'copy-to-clipboard';

const CodeBlock = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copy(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ position: 'relative', maxWidth: '100%', maxHeight: '400px', overflow: 'auto', border: '1px solid #333', borderRadius: '8px', background: '#1a202c', maxHeight: '400px' }}>
      <button
        onClick={handleCopy}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: copied ? '#38a169' : '#4a5568',
          color: 'white',
          border: 'none',
          padding: '5px 10px',
          borderRadius: '5px',
          cursor: 'pointer',
          zIndex: 1,
        }}
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <SyntaxHighlighter
        language={language}
        style={atomDark          
        } // Using dark theme style
        wrapLines={true} // Enable line wrapping
        showLineNumbers={true} // Show line numbers
        lineNumberContainerStyle={{ minWidth: '2em', paddingRight: '1em', userSelect: 'none' }} // Style for line numbers container
        customStyle={{ margin: '0', padding: '1em', overflowX: 'auto' }} // Custom style for syntax highlighter
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;


