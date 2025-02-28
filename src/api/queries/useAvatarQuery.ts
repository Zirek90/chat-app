import { useQuery } from '@tanstack/react-query';
import { API } from '../api';
import { QUERY_KEYS } from './keys';

export function useAvatarQuery(name: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.AVATAR, name],
    queryFn: async () => API.storage.getAvatar(name),
    enabled: Boolean(name),
  });
}
