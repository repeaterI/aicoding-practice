import React, { useState, useRef } from 'react';
import { Send, Plus } from 'lucide-react';
import CitationSuggestions from './CitationSuggestions';
import { CitationOption, CitationPosition, CitationState } from './types';
import HighlightedTextarea from './HighlightedTextarea';

interface ChatInputProps {
  onSend: (message: string) => void;
  onNewChat: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, onNewChat }) => {
  const [message, setMessage] = useState('');
  const [citationState, setCitationState] = useState<CitationState>({
    showCitations: false,
    position: { x: 0, y: 0 }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSend(message);
    setMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === '@') {
      const rect = e.currentTarget.getBoundingClientRect();
      const caretPosition = e.currentTarget.selectionStart || 0;
      const textBeforeCaret = message.substring(0, caretPosition);
      const lines = textBeforeCaret.split('\n');
      const currentLineNumber = lines.length - 1;
      
      const lineHeight = 20;
      const charWidth = 8;
      const paddingLeft = 16;
      const currentLineStart = lines[currentLineNumber].length * charWidth;
      
      setCitationState({
        showCitations: true,
        position: {
          x: currentLineStart + paddingLeft,
          y: 0
        }
      });
    } else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    } else if (e.key === 'Escape') {
      setCitationState(prev => ({ ...prev, showCitations: false }));
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const caretPosition = e.currentTarget.selectionStart || 0;
    const textBeforeCaret = message.substring(0, caretPosition);
    if (!textBeforeCaret.endsWith('@')) {
      setCitationState(prev => ({ ...prev, showCitations: false }));
    }
  };

  const handleCitationSelect = (option: CitationOption) => {
    setMessage(prev => {
      const caretPosition = document.activeElement instanceof HTMLTextAreaElement 
        ? document.activeElement.selectionStart 
        : prev.length;
      const before = prev.substring(0, caretPosition);
      const after = prev.substring(caretPosition);
      return `${before}${option.id} ${after}`;
    });
    setCitationState(prev => ({ ...prev, showCitations: false }));
  };

  const handleCloseCitations = () => {
    setCitationState(prev => ({ ...prev, showCitations: false }));
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-700 p-4">
      <div className="flex items-end space-x-2">
        <button
          type="button"
          onClick={onNewChat}
          className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700 rounded-md"
          title="New Chat"
        >
          <Plus className="w-5 h-5" />
        </button>
        <div className="flex-1 relative bg-gray-700 rounded-lg">
          <HighlightedTextarea
            value={message}
            onChange={setMessage}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            placeholder="Type @ to cite sources..."
          />
          <button
            type="submit"
            className="absolute right-2 bottom-2 p-1 text-gray-300 hover:text-white"
          >
            <Send className="w-5 h-5" />
          </button>
          {citationState.showCitations && (
            <CitationSuggestions
              position={citationState.position}
              onSelect={handleCitationSelect}
              onClose={handleCloseCitations}
            />
          )}
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        Press @ to cite sources, Enter to send, Shift + Enter for new line
      </div>
    </form>
  );
};

export default ChatInput;