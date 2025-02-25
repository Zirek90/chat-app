import { create } from 'zustand';
import { UserDataInterface } from '../interfaces';

interface UserStore {
  id: string;
  email: string;
  username: string;
  avatar?: string | null;
  loading: boolean;
  setUserData: (data: UserDataInterface) => void;
  setLoading: (data: boolean) => void;
  setUserAvatar: (avatar: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  id: '',
  username: '',
  email: '',
  avatar: '',
  loading: false,
  setUserData: (data: UserDataInterface) => set((state) => ({ ...state, ...data })),
  setLoading: (data: boolean) => set((state) => ({ ...state, loading: data })),
  setUserAvatar: (avatar: string) => set((state) => ({ ...state, avatar })),
}));
