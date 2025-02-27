import { useQuery } from '@tanstack/react-query';
import { API } from '../api';
import { QUERY_KEYS } from './keys';

export function useProfileQuery(userId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.PROFILE],
    queryFn: async () => API.user.getUserProfile(userId),
    staleTime: 60 * 60 * 1000,
  });
}
