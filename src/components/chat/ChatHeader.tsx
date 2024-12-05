import React from 'react';
import { Bot, History } from 'lucide-react';

interface ChatHeaderProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
  onShowHistory: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ selectedModel, onModelChange, onShowHistory }) => {
  return (
    <div className="border-b border-gray-700 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-blue-400" />
          <h3 className="font-semibold">AI Assistant</h3>
        </div>
        <button
          onClick={onShowHistory}
          className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700 rounded-md"
          title="View Chat History"
        >
          <History className="w-5 h-5" />
        </button>
      </div>
      <div className="mt-3">
        <select
          value={selectedModel}
          onChange={(e) => onModelChange(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-sm"
        >
          <option value="gpt-4">GPT-4</option>
          <option value="gpt-3.5">GPT-3.5</option>
          <option value="claude">Claude</option>
        </select>
      </div>
    </div>
  );
};

export default ChatHeader;