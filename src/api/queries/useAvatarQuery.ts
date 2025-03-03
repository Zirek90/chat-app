import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from './keys';
import { AVATAR_CACHE_TIME } from '@/src/constants';
import { getCachedAvatar } from '@/src/utils';

export function useAvatarQuery(name: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.AVATAR, name],
    queryFn: () => getCachedAvatar(name),
    enabled: Boolean(name),
    staleTime: AVATAR_CACHE_TIME,
  });
}
