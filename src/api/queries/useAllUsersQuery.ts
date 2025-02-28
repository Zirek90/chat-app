import { useQuery } from '@tanstack/react-query';
import { API } from '../api';
import { QUERY_KEYS } from './keys';

export function useAllUsersQuery(currentUserId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.ALL_USERS, currentUserId],
    queryFn: async () => API.user.getAllUsers(currentUserId),
  });
}
