import { AiAPI } from "./ai";
import { AuthAPI } from "./auth";
import { UserAPI } from "./user";

export const API = {
  auth: AuthAPI,
  user: UserAPI,
  ai: AiAPI,
};
