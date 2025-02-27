import { useQuery } from '@tanstack/react-query';
import { API } from '../api';
import { QUERY_KEYS } from './keys';

export function useUserQuery() {
  return useQuery({
    queryKey: [QUERY_KEYS.USER],
    queryFn: API.user.getUser,
  });
}
