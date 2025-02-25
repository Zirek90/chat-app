import { ChatModeType } from '../types';

export interface ChatInterface {
  messages: MessageInterface[];
  onSend: (message: string) => void;
  mode: ChatModeType;
  isTyping: boolean;
}

export interface MessageInterface {
  id: string;
  chatroom_id?: string;
  sender_id: string;
  sender_name: string;
  content: string;
  timestamp: string;
  avatar?: string;
}

export interface MessageFormInterface {
  onSend: (message: string) => void;
}
