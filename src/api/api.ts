import { AiAPI } from './ai';
import { AuthAPI } from './auth';
import { ChatAPI } from './chat';
import { GameAPI } from './game';
import { StorageAPI } from './storage';
import { UserAPI } from './user';

export const API = {
  auth: AuthAPI,
  user: UserAPI,
  ai: AiAPI,
  chat: ChatAPI,
  storage: StorageAPI,
  game: GameAPI,
};
