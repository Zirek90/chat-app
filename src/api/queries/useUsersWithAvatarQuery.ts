import { useQuery } from '@tanstack/react-query';
import { API } from '../api';
import { QUERY_KEYS } from './keys';
import { AVATAR_CACHE_TIME } from '@/src/constants';
import { getCachedAvatar } from '@/src/utils';

export function useUsersWithAvatarsQuery(currentUserId: string | null) {
  return useQuery({
    queryKey: [QUERY_KEYS.ALL_USERS_WITH_AVATAR, currentUserId],
    queryFn: async () => {
      const users = await API.user.getAllUsers(currentUserId!);
      return Promise.all(
        users.map(async (user) => {
          const avatar = user.avatar ? await getCachedAvatar(user.avatar) : null;
          return { ...user, avatar };
        }),
      );
    },
    enabled: Boolean(currentUserId),
    staleTime: AVATAR_CACHE_TIME,
  });
}
