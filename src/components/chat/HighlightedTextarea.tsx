import React, { useRef, useEffect } from 'react';

interface HighlightedTextareaProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onKeyUp: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

const HighlightedTextarea: React.FC<HighlightedTextareaProps> = ({
  value,
  onChange,
  onKeyDown,
  onKeyUp,
  placeholder
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const highlightText = (text: string) => {
    const citations = ['@web', '@code', '@docs', '@file'];
    let highlightedText = text;
    
    citations.forEach(citation => {
      const regex = new RegExp(`(${citation})`, 'g');
      highlightedText = highlightedText.replace(regex, `<span class="text-blue-400">$1</span>`);
    });
    
    return highlightedText;
  };

  return (
    <div className="relative">
      <div
        ref={highlightRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none whitespace-pre-wrap break-words p-3 text-transparent"
        dangerouslySetInnerHTML={{ __html: highlightText(value) }}
        style={{
          fontFamily: 'inherit',
          fontSize: 'inherit',
          lineHeight: 'inherit'
        }}
      />
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        placeholder={placeholder}
        className="w-full resize-none bg-transparent text-gray-100 rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{
          minHeight: '2.5rem',
          caretColor: 'white'
        }}
      />
    </div>
  );
};

export default HighlightedTextarea;