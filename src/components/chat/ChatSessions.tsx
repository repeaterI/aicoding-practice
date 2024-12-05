import React from 'react';
import { MessageSquare, Clock, Trash2 } from 'lucide-react';
import { ChatSession } from './types';

interface ChatSessionsProps {
  sessions: ChatSession[];
  currentSessionId: string;
  onSelectSession: (sessionId: string) => void;
  onDeleteSession: (sessionId: string) => void;
  onClose: () => void;
}

const ChatSessions: React.FC<ChatSessionsProps> = ({
  sessions,
  currentSessionId,
  onSelectSession,
  onDeleteSession,
  onClose,
}) => {
  return (
    <div className="absolute left-0 top-0 w-64 h-full bg-gray-900 shadow-lg z-50 transform transition-transform">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-100">Chat History</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300"
          >
            ×
          </button>
        </div>
      </div>
      <div className="overflow-y-auto h-[calc(100%-4rem)]">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={`p-3 hover:bg-gray-800 cursor-pointer group ${
              session.id === currentSessionId ? 'bg-gray-800' : ''
            }`}
            onClick={() => onSelectSession(session.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-4 h-4 text-gray-400" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-200 truncate">
                    {session.title}
                  </h4>
                  <p className="text-xs text-gray-400 flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>
                      {new Date(session.createdAt).toLocaleDateString()}
                    </span>
                  </p>
                </div>
              </div>
              {session.id !== currentSessionId && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteSession(session.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSessions;