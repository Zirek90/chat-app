import { create } from 'zustand';
import { MessageInterface } from '../features';

interface AiChatState {
  messages: MessageInterface[];
  isTyping: boolean;
  addMessage: (message: MessageInterface) => void;
  setTyping: (typing: boolean) => void;
}

export const useAiChatStore = create<AiChatState>((set) => ({
  messages: [],
  isTyping: false,
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setTyping: (typing) => set({ isTyping: typing }),
}));
