import { ThemeEnum } from "../enums";

const backgroundImages = {
  grayscale: {
    login: require("@/assets/app-images/grayscale/background-login.jpg"),
    signup: require("@/assets/app-images/grayscale/background-signup.jpg"),
    chat: require("@/assets/app-images/grayscale/background-chat.jpg"),
    chat_dashboard: require("@/assets/app-images/grayscale/background-chat-dashboard.jpg"),
    ai_assistant: require("@/assets/app-images/grayscale/background-ai-assistant.jpg"),
    settings: require("@/assets/app-images/grayscale/background-settings.jpg"),
  },
  colorful: {
    login: require("@/assets/app-images/colorful/background-login.jpg"),
    signup: require("@/assets/app-images/colorful/background-signup.jpg"),
    chat: require("@/assets/app-images/colorful/background-chat.jpg"),
    chat_dashboard: require("@/assets/app-images/colorful/background-chat-dashboard.jpg"),
    ai_assistant: require("@/assets/app-images/colorful/background-ai-assistant.jpg"),
    settings: require("@/assets/app-images/colorful/background-settings.jpg"),
  },
};

export function getBackgroundImage(theme: ThemeEnum, page: keyof typeof backgroundImages.grayscale) {
  return theme === ThemeEnum.GRAYSCALE ? backgroundImages.grayscale[page] : backgroundImages.colorful[page];
}
