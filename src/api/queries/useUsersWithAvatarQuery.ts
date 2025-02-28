import { useQuery } from '@tanstack/react-query';
import { API } from '../api';
import { QUERY_KEYS } from './keys';

export function useUsersWithAvatarsQuery(currentUserId: string | null) {
  return useQuery({
    queryKey: [QUERY_KEYS.ALL_USERS_WITH_AVATAR, currentUserId],
    queryFn: async () => {
      const users = await API.user.getAllUsers(currentUserId!);
      return Promise.all(
        users.map(async (user) => {
          const avatar = user.avatar ? await API.storage.getAvatar(user.avatar) : null;
          return { ...user, avatar };
        }),
      );
    },
    enabled: Boolean(currentUserId),
  });
}
