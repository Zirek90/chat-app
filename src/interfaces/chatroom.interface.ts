export interface ChatRoom {
  id: string;
  participants: string[] | null;
  messages: {
    content: string;
    sender_name: string;
    timestamp: string;
  }[];
}
