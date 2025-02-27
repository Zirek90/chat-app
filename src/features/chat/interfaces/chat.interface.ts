import { ChatModeType, FileType } from '../types';
import { ImageType, FileType as FileItemType } from '@/src/types';

export interface ChatInterface {
  messages: MessageInterface[];
  onSend: (
    message: string,
    selectedFiles: FileItemType[],
    selectedImages: ImageType[],
    messageId?: string,
  ) => void;
  mode: ChatModeType;
  isTyping: boolean;
  editingMessage: MessageInterface | null;
  onEditCancel: () => void;
  onEditMessage: (message: MessageInterface | null) => void;
}

export interface MessageFile {
  path: string;
  type: FileType;
  url?: string;
}

export interface MessageInterface {
  id: string;
  chatroom_id?: string;
  sender_id: string;
  sender_name: string;
  content: string;
  edited: boolean;
  files: MessageFile[];
  timestamp: string;
  avatar?: string;
}

export interface MessageFormInterface {
  onSend: (
    message: string,
    selectedFiles: FileItemType[],
    selectedImages: ImageType[],
    messageId?: string,
  ) => void;
  onEditCancel: () => void;
  editingMessage: MessageInterface | null;
}
