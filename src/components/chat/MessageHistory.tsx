import React from 'react';
import { Clock, RotateCcw } from 'lucide-react';
import { MessageVersion } from './types';

interface MessageHistoryProps {
  versions: MessageVersion[];
  onClose: () => void;
  onRestore: (version: MessageVersion) => void;
}

const MessageHistory: React.FC<MessageHistoryProps> = ({ versions, onClose, onRestore }) => {
  return (
    <div className="absolute top-0 right-0 w-64 bg-gray-800 rounded-lg shadow-lg p-4 z-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <h3 className="text-sm font-medium">Version History</h3>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-300"
        >
          ×
        </button>
      </div>
      <div className="space-y-3">
        {versions.map((version, index) => (
          <div
            key={version.id}
            className="bg-gray-700 rounded p-2 text-sm relative group"
          >
            <div className="mb-1 text-xs text-gray-400">
              {new Date(version.timestamp).toLocaleString()}
            </div>
            <div className="text-gray-200 break-words">
              {version.content}
            </div>
            {index !== 0 && (
              <button
                onClick={() => onRestore(version)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Restore this version"
              >
                <RotateCcw className="w-4 h-4 text-blue-400 hover:text-blue-300" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MessageHistory;