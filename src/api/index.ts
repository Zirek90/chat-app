import { AiAPI } from "./ai";
import { AuthAPI } from "./auth";
import { StorageAPI } from "./storage";
import { UserAPI } from "./user";

export const API = {
  auth: AuthAPI,
  user: UserAPI,
  ai: AiAPI,
  storage: StorageAPI,
};
