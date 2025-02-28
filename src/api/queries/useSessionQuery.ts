import { useQuery } from '@tanstack/react-query';
import { API } from '../api';
import { QUERY_KEYS } from './keys';

export function useSessionQuery() {
  return useQuery({
    queryKey: [QUERY_KEYS.SESSION],
    queryFn: API.auth.getSession,
  });
}
