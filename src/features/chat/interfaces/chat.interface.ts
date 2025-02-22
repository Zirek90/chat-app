import { ChatModeType, SenderType } from "../types";

export interface ChatInterface {
  messages: MessageInterface[];
  onSend: (message: string) => void;
  mode: ChatModeType;
  isTyping: boolean;
}

export interface MessageInterface {
  id: string;
  senderType: SenderType;
  senderName: string;
  text: string;
  timestamp: number;
  avatar?: string;
}

export interface MessageFormInterface {
  onSend: (message: string) => void;
}
