import { create } from 'zustand';
import { ThemeEnum } from '../enums';

interface ThemeStore {
  theme: ThemeEnum;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: ThemeEnum.GRAYSCALE,
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === ThemeEnum.GRAYSCALE ? ThemeEnum.COLORFUL : ThemeEnum.GRAYSCALE,
    })),
}));
