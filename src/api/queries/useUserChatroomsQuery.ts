import { useQuery } from '@tanstack/react-query';
import { API } from '../api';
import { QUERY_KEYS } from './keys';

export function useUserChatroomsQuery(userId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.USER_CHATROOMS],
    queryFn: async () => API.chat.getUserChatrooms(userId),
  });
}
