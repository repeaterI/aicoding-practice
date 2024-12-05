import React, { useState } from 'react';
import { Edit2, Copy, Check, Clock } from 'lucide-react';
import CodeBlock from './CodeBlock';
import MessageHistory from './MessageHistory';
import { ChatMessage, MessageVersion } from './types';

interface MessageProps {
  message: ChatMessage;
  onEdit: (id: string, content: string) => void;
}

const Message: React.FC<MessageProps> = ({ message, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(message.content);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    onEdit(message.id, editedContent);
    setIsEditing(false);
  };

  const handleRestore = (version: MessageVersion) => {
    onEdit(message.id, version.content);
    setShowHistory(false);
  };

  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] rounded-lg relative ${
          message.role === 'user'
            ? 'bg-blue-600 text-white'
            : 'bg-[#1e1e1e] text-gray-100'
        }`}
      >
        {message.type === 'code' ? (
          <div className="relative group">
            <CodeBlock code={message.content} />
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleCopy}
                className="p-1 hover:bg-gray-700 rounded"
                title={copied ? 'Copied!' : 'Copy code'}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-3 relative group">
            {isEditing ? (
              <div className="space-y-2">
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="w-full bg-transparent border rounded p-2 focus:outline-none focus:border-blue-400"
                  rows={3}
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-2 py-1 text-sm rounded hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-2 py-1 text-sm bg-blue-500 rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <>
                {message.content}
                {message.role === 'user' && (
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                    <button
                      onClick={() => setShowHistory(true)}
                      className="p-1 hover:bg-gray-700 rounded"
                      title="View history"
                    >
                      <Clock size={16} />
                    </button>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-1 hover:bg-gray-700 rounded"
                      title="Edit message"
                    >
                      <Edit2 size={16} />
                    </button>
                  </div>
                )}
              </>
            )}
            {showHistory && message.versions.length > 0 && (
              <MessageHistory
                versions={message.versions}
                onClose={() => setShowHistory(false)}
                onRestore={handleRestore}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;