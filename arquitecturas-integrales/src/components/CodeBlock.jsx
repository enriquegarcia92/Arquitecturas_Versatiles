import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Importing dark theme
import copy from 'copy-to-clipboard';

const CodeBlock = ({ code1, language1, code2, language2, code3, language3 }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('tab1');

  const handleCopy = () => {
    const code = activeTab === 'tab1' ? code1 : activeTab === 'tab2' ? code2 : code3;
    copy(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative max-w-full max-h-[400px] overflow-auto border border-gray-800 rounded-md bg-gray-900">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-700 rounded-t-md">
        <div>
          <button
            onClick={() => setActiveTab('tab1')}
            className={`px-3 py-1 rounded-t-md text-white ${activeTab === 'tab1' ? 'bg-gray-800' : 'bg-gray-700'}`}
          >
            {language1}
          </button>
          {code2 && language2 && (
            <button
              onClick={() => setActiveTab('tab2')}
              className={`ml-2 px-3 py-1 rounded-t-md text-white ${activeTab === 'tab2' ? 'bg-gray-800' : 'bg-gray-700'}`}
            >
              {language2}
            </button>
          )}
          {code3 && language3 && (
            <button
              onClick={() => setActiveTab('tab3')}
              className={`ml-2 px-3 py-1 rounded-t-md text-white ${activeTab === 'tab3' ? 'bg-gray-800' : 'bg-gray-700'}`}
            >
              {language3}
            </button>
          )}
        </div>
        <button
          onClick={handleCopy}
          className={`px-3 py-1 rounded-md text-white ${copied ? 'bg-green-600' : 'bg-gray-800'} transition-colors`}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="max-h-[350px] overflow-auto p-4">
        <SyntaxHighlighter
          language={activeTab === 'tab1' ? language1 : activeTab === 'tab2' ? language2 : language3}
          style={atomDark}
          wrapLines={true} // Enable line wrapping
          showLineNumbers={true} // Show line numbers
          lineNumberContainerStyle={{ minWidth: '2em', paddingRight: '1em', userSelect: 'none' }} // Style for line numbers container
          customStyle={{ margin: '0', padding: '1em', overflowX: 'auto' }} // Custom style for syntax highlighter
        >
          {activeTab === 'tab1' ? code1 : activeTab === 'tab2' ? code2 : code3}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;
