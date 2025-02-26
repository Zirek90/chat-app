import { create } from 'zustand';
import { MessageInterface } from '../features';

interface ChatState {
  messages: MessageInterface[];
  editingMessage: MessageInterface | null;
  isTyping: boolean;
  setMessages: (message: MessageInterface[]) => void;
  addMessage: (message: MessageInterface) => void;
  updateMessage: (message: MessageInterface) => void;
  setEditingMessage: (message: MessageInterface | null) => void;
  setTyping: (typing: boolean) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  editingMessage: null,
  isTyping: false,
  setMessages: (messages: MessageInterface[]) => set({ messages }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  updateMessage: (updatedMessage: MessageInterface) =>
    set((state) => ({
      messages: state.messages.map((msg) => (msg.id === updatedMessage.id ? updatedMessage : msg)),
    })),
  setEditingMessage: (editingMessage: MessageInterface | null) => set({ editingMessage }),
  setTyping: (isTyping: boolean) => set({ isTyping }),
}));
