import { ChatModeType } from '../types';
import { Json } from '@/src/types';

export interface ChatInterface {
  messages: MessageInterface[];
  onSend: (message: string) => void;
  mode: ChatModeType;
  isTyping: boolean;
  editingMessage: MessageInterface | null;
  onEditCancel: () => void;
  onEditMessage: (message: MessageInterface | null) => void;
}

// interface FileInterface {
//   url: string;
//   type: string;
//   name: string;
//   size: number;
// }

export interface MessageInterface {
  id: string;
  chatroom_id?: string;
  sender_id: string;
  sender_name: string;
  content: string;
  edited: boolean;
  files: Json;
  timestamp: string;
  avatar?: string;
}

export interface MessageFormInterface {
  onSend: (message: string, updatedContent?: string) => void;
  onEditCancel: () => void;
  editingMessage: MessageInterface | null;
}
