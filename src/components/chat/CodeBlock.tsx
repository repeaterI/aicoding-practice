import React from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/themes/prism-tomorrow.css';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'javascript' }) => {
  return (
    <div className="rounded-lg overflow-hidden">
      <Editor
        value={code}
        onValueChange={() => {}}
        highlight={(code) => Prism.highlight(code, Prism.languages[language], language)}
        padding={16}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 14,
          backgroundColor: '#1e1e1e',
          minHeight: '100%',
        }}
        className="min-h-full"
        readOnly
      />
    </div>
  );
};

export default CodeBlock;