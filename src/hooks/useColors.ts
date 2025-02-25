import { COLORS } from '../constants';
import { ThemeEnum } from '../enums';
import { useThemeStore } from '../store';

//* Hook for storing the colors differences between themes
//* Each differences in colors should be added here and used from here
export function useColors() {
  const { theme } = useThemeStore();
  const isGrayscale = theme === ThemeEnum.GRAYSCALE;

  const avatarFallbackColor = isGrayscale ? COLORS.avatarFallback : COLORS.colorfullAvatarFallback;
  const textColor = isGrayscale ? COLORS.white : COLORS.buttonText;
  const buttonColor = isGrayscale ? COLORS.colorfullButtonText : COLORS.buttonText;
  const buttonTextColor = isGrayscale ? COLORS.white : COLORS.colorfullAvatarFallback;

  return { avatarFallbackColor, textColor, buttonColor, buttonTextColor };
}
