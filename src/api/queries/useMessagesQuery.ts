import { useQuery } from '@tanstack/react-query';
import { API } from '../api';
import { QUERY_KEYS } from './keys';

export function useMessagesQuery(chatId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.MESSAGES, chatId],
    queryFn: async () => API.chat.getMessages(chatId),
  });
}
