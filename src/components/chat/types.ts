export interface MessageVersion {
  id: string;
  content: string;
  timestamp: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  type?: 'text' | 'code';
  versions: MessageVersion[];
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: number;
  messages: ChatMessage[];
}

export interface CitationState {
  showCitations: boolean;
  position: CitationPosition;
}

export interface MessageHistoryProps {
  versions: MessageVersion[];
  onClose: () => void;
  onRestore: (version: MessageVersion) => void;
}

export interface CitationOption {
  id: string;
  label: string;
  description: string;
  icon: string;
}

export interface CitationPosition {
  x: number;
  y: number;
}