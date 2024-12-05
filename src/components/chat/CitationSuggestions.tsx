import React, { useEffect, useRef } from 'react';
import { Globe, Code, FileText, Folder, Database } from 'lucide-react';
import { CitationOption, CitationPosition } from './types';

interface CitationSuggestionsProps {
  position: CitationPosition;
  onSelect: (option: CitationOption) => void;
  onClose: () => void;
}

const citationOptions: CitationOption[] = [
  {
    id: 'web',
    label: 'Web',
    description: 'Search on the web',
    icon: 'web'
  },
  {
    id: 'code',
    label: 'Code',
    description: 'Reference code snippets',
    icon: 'code'
  },
  {
    id: 'docs',
    label: 'Docs',
    description: 'Search documentation',
    icon: 'docs'
  },
  {
    id: 'file',
    label: 'File',
    description: 'Reference project files',
    icon: 'file'
  }
];

const CitationSuggestions: React.FC<CitationSuggestionsProps> = ({
  position,
  onSelect,
  onClose
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'web':
        return <Globe className="w-4 h-4" />;
      case 'code':
        return <Code className="w-4 h-4" />;
      case 'docs':
        return <FileText className="w-4 h-4" />;
      case 'file':
        return <Folder className="w-4 h-4" />;
      default:
        return <Database className="w-4 h-4" />;
    }
  };

  return (
    <div
      ref={ref}
      className="absolute z-50 bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700"
       
      style={{ 
        bottom: '100%', // 将悬浮窗口定位在父元素的上方
        left: position.x,
        marginBottom: '10px' // 添加一些间距
      }}
    >
      <div className="py-1">
        {citationOptions.map((option) => (
          <button
            key={option.id}
            className="w-full px-4 py-2 text-left hover:bg-gray-700 flex items-center space-x-3"
            onClick={() => onSelect(option)}
          >
            <span className="text-gray-400">{getIcon(option.icon)}</span>
            <div>
              <div className="text-sm font-medium text-gray-200">{option.label}</div>
              <div className="text-xs text-gray-400">{option.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CitationSuggestions;
