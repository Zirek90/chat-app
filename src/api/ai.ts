import { MessageInterface } from "../features";

export const AiAPI = {
  sendMessageToAiAssistant: async (messages: MessageInterface[]) => {
    try {
      const response = await fetch("http://localhost:1234/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama-3.2-3b-instruct",
          messages: messages.map((msg) => ({
            role: msg.senderName === "AI assistant" ? "assistant" : "user",
            content: msg.text,
          })),
          temperature: 0.7,
          max_tokens: 200,
        }),
      });

      const data = await response.json();

      if (data.choices && data.choices.length > 0) {
        return data.choices[0].message.content;
      }
      throw new Error("No response from AI");
    } catch (error) {
      console.error("Error communicating with AI:", error);
      return "Something went wrong with AI communication.";
    }
  },
};
