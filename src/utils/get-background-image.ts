import { ThemeEnum } from '../enums';

const backgroundImages = {
  grayscale: {
    login: require('@/assets/app-images/grayscale/background-login.jpg'),
    signup: require('@/assets/app-images/grayscale/background-signup.jpg'),
    chat: require('@/assets/app-images/grayscale/background-chat.jpg'),
    chat_dashboard: require('@/assets/app-images/grayscale/background-chat-dashboard.jpg'),
    ai_assistant: require('@/assets/app-images/grayscale/background-ai-assistant.jpg'),
    settings: require('@/assets/app-images/grayscale/background-settings.jpg'),
    find_people: require('@/assets/app-images/grayscale/background-find-people.jpg'),
    battleship: require('@/assets/app-images/grayscale/background-battleship.jpg'),
  },
  colorful: {
    login: require('@/assets/app-images/colorful/background-login.jpg'),
    signup: require('@/assets/app-images/colorful/background-signup.jpg'),
    chat: require('@/assets/app-images/colorful/background-chat.jpg'),
    chat_dashboard: require('@/assets/app-images/colorful/background-chat-dashboard.jpg'),
    ai_assistant: require('@/assets/app-images/colorful/background-ai-assistant.jpg'),
    settings: require('@/assets/app-images/colorful/background-settings.jpg'),
    find_people: require('@/assets/app-images/colorful/background-find-people.jpg'),
    battleship: require('@/assets/app-images/colorful/background-battleship.jpg'),
  },
};

export function getBackgroundImage(
  theme: ThemeEnum,
  page: keyof typeof backgroundImages.grayscale,
) {
  return theme === ThemeEnum.GRAYSCALE
    ? backgroundImages.grayscale[page]
    : backgroundImages.colorful[page];
}
