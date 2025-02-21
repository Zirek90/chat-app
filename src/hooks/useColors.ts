import { ThemeEnum } from "../enums";
import { useThemeStore } from "../store";

//* Hook for storing the colors differences between themes
//* Each differences in colors should be added here and used from here
export function useColors() {
  const { theme } = useThemeStore();
  const isGrayscale = theme === ThemeEnum.GRAYSCALE;

  const avatarFallbackColor = isGrayscale ? "#6A6A6A" : "#F3E08D";
  const textColor = isGrayscale ? "#fff" : "#1E1E1E";
  const buttonColor = isGrayscale ? "#FF6F61" : "#333";
  const buttonTextColor = isGrayscale ? "#fff" : "#F3E08D";

  return { avatarFallbackColor, textColor, buttonColor, buttonTextColor };
}
