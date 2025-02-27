import { useQuery } from '@tanstack/react-query';
import { API } from '../api';
import { QUERY_KEYS } from './keys';

export function useAvatarQuery(currentUserId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.AVATAR],
    queryFn: async () => API.storage.getAvatar(currentUserId),
    staleTime: 60 * 60 * 1000,
  });
}
