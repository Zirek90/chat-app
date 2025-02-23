import { create } from "zustand";
import { UserDataInterface } from "../interfaces";

interface UserStore {
  id: string;
  email: string;
  username: string;
  avatar_url: string;
  setUserData: (data: UserDataInterface) => void;
  setUserAvatar: (avatar_url: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  id: "",
  username: "",
  email: "",
  avatar_url: "",
  setUserData: (data: UserDataInterface) => set((state) => ({ ...state, ...data })),
  setUserAvatar: (avatar_url: string) => set((state) => ({ ...state, avatar_url })),
}));
