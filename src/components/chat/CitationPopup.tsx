import React, { useState, useEffect } from 'react';
import { ChatMessage } from './types';

interface CitationPopupProps {
  messages: ChatMessage[];
  searchText: string;
  position: { x: number; y: number };
  onSelect: (messageId: string, text: string) => void;
  onClose: () => void;
}

const CitationPopup: React.FC<CitationPopupProps> = ({
  messages,
  searchText,
  position,
  onSelect,
  onClose,
}) => {
  const [filteredMessages, setFilteredMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const filtered = messages.filter(
      (msg) =>
        msg.type === 'code' &&
        msg.content.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredMessages(filtered);
  }, [messages, searchText]);

  return (
    <div
      className="absolute z-50 bg-gray-800 rounded-lg shadow-lg p-2 min-w-[200px] max-w-[300px]"
      style={{ top: position.y, left: position.x }}
    >
      {filteredMessages.length > 0 ? (
        <div className="space-y-2">
          {filteredMessages.map((msg) => (
            <div
              key={msg.id}
              className="p-2 hover:bg-gray-700 rounded cursor-pointer"
              onClick={() => {
                onSelect(msg.id, msg.content);
                onClose();
              }}
            >
              <pre className="text-xs text-gray-300 overflow-hidden">
                {msg.content.substring(0, 100)}...
              </pre>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-sm text-gray-400 p-2">No matching code found</div>
      )}
    </div>
  );
}

export default CitationPopup;