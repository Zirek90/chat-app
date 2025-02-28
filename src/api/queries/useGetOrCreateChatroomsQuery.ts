import { useQuery } from '@tanstack/react-query';
import { API } from '../api';
import { QUERY_KEYS } from './keys';

export function useGetOrCreateChatroomQuery(currentUserId: string, userId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_OR_CREATE_CHATROOMS, currentUserId, userId],
    queryFn: async () => API.chat.getOrCreateChatroom(currentUserId, userId),
  });
}
