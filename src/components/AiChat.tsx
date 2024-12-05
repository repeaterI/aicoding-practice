import React, { useState, useCallback } from 'react';
import ChatHeader from './chat/ChatHeader';
import Message from './chat/Message';
import ChatInput from './chat/ChatInput';
import ChatSessions from './chat/ChatSessions';
import { useAIResponse } from './chat/useAIResponse';
import { ChatMessage, ChatSession } from './chat/types';

const AiChat = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([{
    id: 'default',
    title: 'New Chat',
    createdAt: Date.now(),
    messages: []
  }]);
  const [currentSessionId, setCurrentSessionId] = useState('default');
  const [showSessions, setShowSessions] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [isWebSearching, setIsWebSearching] = useState(false);

  const { generateResponse, isGenerating } = useAIResponse();
  const currentSession = sessions.find(s => s.id === currentSessionId)!;

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'New Chat',
      createdAt: Date.now(),
      messages: []
    };
    setSessions([...sessions, newSession]);
    setCurrentSessionId(newSession.id);
  };

  const deleteSession = (sessionId: string) => {
    setSessions(sessions.filter(s => s.id !== sessionId));
    if (sessionId === currentSessionId) {
      setCurrentSessionId(sessions[0].id);
    }
  };

  const handleSend = useCallback(async (content: string) => {
    const isWebSearch = content.trim().startsWith('@web');
    setIsWebSearching(isWebSearch);

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      type: 'text',
      versions: [{
        id: Date.now().toString(),
        content,
        timestamp: Date.now()
      }]
    };

    setSessions(prev => prev.map(session => {
      if (session.id !== currentSessionId) return session;

      const updatedMessages = [...session.messages, userMessage];
      return {
        ...session,
        messages: updatedMessages,
        title: session.messages.length === 0 ? content.substring(0, 30) + '...' : session.title
      };
    }));

    const aiResponses = await generateResponse(content);
    
    setSessions(prev => prev.map(session => {
      if (session.id !== currentSessionId) return session;
      return {
        ...session,
        messages: [...session.messages, ...aiResponses]
      };
    }));

    setIsWebSearching(false);
  }, [currentSessionId, generateResponse]);

  const handleEdit = useCallback(async (id: string, newContent: string) => {
    setSessions(prev => prev.map(session => {
      if (session.id !== currentSessionId) return session;

      const messageIndex = session.messages.findIndex(msg => msg.id === id);
      if (messageIndex === -1) return session;

      const updatedMessages = [...session.messages];
      updatedMessages[messageIndex] = {
        ...updatedMessages[messageIndex],
        content: newContent,
        versions: [
          {
            id: Date.now().toString(),
            content: newContent,
            timestamp: Date.now()
          },
          ...updatedMessages[messageIndex].versions
        ]
      };

      // If edited message is from user, regenerate AI responses
      if (updatedMessages[messageIndex].role === 'user') {
        // Remove all messages after the edited message
        const messagesBeforeEdit = updatedMessages.slice(0, messageIndex + 1);
        
        // Regenerate AI response
        generateResponse(newContent).then(aiResponses => {
          setSessions(prev => prev.map(s => {
            if (s.id !== currentSessionId) return s;
            return {
              ...s,
              messages: [...messagesBeforeEdit, ...aiResponses]
            };
          }));
        });

        return {
          ...session,
          messages: messagesBeforeEdit
        };
      }

      return {
        ...session,
        messages: updatedMessages
      };
    }));
  }, [currentSessionId, generateResponse]);

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] rounded-lg shadow-md text-gray-100 relative">
      {showSessions && (
        <ChatSessions
          sessions={sessions}
          currentSessionId={currentSessionId}
          onSelectSession={(id) => {
            setCurrentSessionId(id);
            setShowSessions(false);
          }}
          onDeleteSession={deleteSession}
          onClose={() => setShowSessions(false)}
        />
      )}
      
      <ChatHeader
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        onShowHistory={() => setShowSessions(true)}
      />

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {currentSession.messages.map((msg) => (
          <Message
            key={msg.id}
            message={msg}
            onEdit={handleEdit}
          />
        ))}
        {isGenerating && !isWebSearching && (
          <div className="text-gray-400 animate-pulse">AI is generating a response...</div>
        )}
        {isWebSearching && (
          <div className="text-gray-400 animate-pulse">AI is searching on web...</div>
        )}
      </div>

      <ChatInput
        onSend={handleSend}
        onNewChat={createNewSession}
      />
    </div>
  );
};

export default AiChat;