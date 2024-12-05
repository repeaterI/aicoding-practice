import { useState, useCallback } from 'react';
import { ChatMessage } from './types';

export const useAIResponse = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateResponse = useCallback(async (prompt: string): Promise<ChatMessage[]> => {
    setIsGenerating(true);
    
    // Simulate AI response generation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const responses: ChatMessage[] = [
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Based on your request, here\'s a solution:',
        type: 'text',
        versions: [{
          id: Date.now().toString(),
          content: 'Based on your request, here\'s a solution:',
          timestamp: Date.now()
        }]
      },
      {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `function improvedExample() {\n  // Enhanced implementation based on: ${prompt}\n  console.log("Generated response");\n}`,
        type: 'code',
        versions: [{
          id: Date.now().toString(),
          content: `function improvedExample() {\n  // Enhanced implementation based on: ${prompt}\n  console.log("Generated response");\n}`,
          timestamp: Date.now()
        }]
      }
    ];

    setIsGenerating(false);
    return responses;
  }, []);

  return {
    generateResponse,
    isGenerating
  };
};