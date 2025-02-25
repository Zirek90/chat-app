import { create } from 'zustand';
import { MessageInterface } from '../features';

interface ChatState {
  messages: MessageInterface[];
  isTyping: boolean;
  setMessages: (message: MessageInterface[]) => void;
  addMessage: (message: MessageInterface) => void;
  setTyping: (typing: boolean) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isTyping: false,
  setMessages: (messages: MessageInterface[]) => set({ messages }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setTyping: (typing) => set({ isTyping: typing }),
}));
