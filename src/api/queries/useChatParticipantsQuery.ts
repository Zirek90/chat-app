import { useQuery } from '@tanstack/react-query';
import { API } from '../api';
import { QUERY_KEYS } from './keys';

export function useChatParticipantsQuery(chatId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.CHAT_PARTICIPANTS],
    queryFn: async () => API.chat.getChatParticipants(chatId),
  });
}
