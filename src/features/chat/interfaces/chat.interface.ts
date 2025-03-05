import { ChatModeType, AttachedFileType } from '../types';
import { ImageType, FileType } from '@/src/types';

export interface ChatInterface {
  messages: MessageInterface[];
  onSend: (
    message: string,
    selectedFiles: FileType[],
    selectedImages: ImageType[],
    messageId?: string,
  ) => void;
  mode: ChatModeType;
  isTyping: boolean;
  editingMessage: MessageInterface | null;
  onEditCancel: () => void;
  onEditMessage: (message: MessageInterface | null) => void;
  handleNextPage?: () => void;
  isFetchingNextPage?: boolean;
}

export interface MessageFile {
  path: string;
  type: AttachedFileType;
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
    selectedFiles: FileType[],
    selectedImages: ImageType[],
    messageId?: string,
  ) => void;
  onEditCancel: () => void;
  editingMessage: MessageInterface | null;
}
