import { useQuery } from '@tanstack/react-query';
import { API } from '../api';
import { QUERY_KEYS } from './keys';

export function useUserProfileQuery(userId: string | null) {
  return useQuery({
    queryKey: [QUERY_KEYS.PROFILE, userId],
    queryFn: async () => API.user.getParticipantProfile(userId!),
    enabled: Boolean(userId),
  });
}
