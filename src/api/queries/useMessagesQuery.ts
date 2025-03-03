import { useInfiniteQuery } from '@tanstack/react-query';
import { API } from '../api';
import { QUERY_KEYS } from './keys';

export function useMessagesQuery(chatId: string) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.MESSAGES, chatId],
    queryFn: ({ pageParam = 0 }) => API.chat.getMessages(chatId, pageParam),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 20 ? allPages.length * 20 : undefined,
    initialPageParam: 0,
  });
}
