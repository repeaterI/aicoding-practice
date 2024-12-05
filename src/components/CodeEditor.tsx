import React, { useState } from 'react';
import { Code, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';

const initialCode = `class Solution {
    public int removeElement(int[] nums, int val) {
        // Write your code here
        
    }
}`;

const CodeEditor = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(initialCode);
  const [language, setLanguage] = useState('java');

  const handleSubmit = () => {
    navigate('/comparison');
  };

  const getLineNumbers = (code: string) => {
    const lines = code.split('\n');
    return lines.map((_, i) => i + 1).join('\n');
  };

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] rounded-lg shadow-md">
      <div className="flex items-center justify-between p-2 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Code className="w-5 h-5 text-gray-400" />
          <select 
            className="bg-[#2d2d2d] text-gray-300 rounded px-2 py-1 text-sm"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
          </select>
        </div>
        <button 
          onClick={handleSubmit}
          className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 flex items-center space-x-1"
        >
          <Send className="w-4 h-4" />
          <span>Submit</span>
        </button>
      </div>
      <div className="flex-1 overflow-auto relative">
        <div className="absolute left-0 top-0 bottom-0 p-4 text-gray-500 select-none w-[40px] text-right bg-[#1e1e1e] border-r border-gray-700 font-mono text-sm">
          {getLineNumbers(code)}
        </div>
        <div className="pl-[40px]">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={code => Prism.highlight(code, Prism.languages[language], language)}
            padding={16}
            style={{
              fontFamily: 'monospace',
              fontSize: '14px',
              backgroundColor: '#1e1e1e',
              minHeight: '100%'
            }}
            className="min-h-full text-gray-300"
          />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;