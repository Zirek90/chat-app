import { useMutation } from '@tanstack/react-query';
import { API } from '../api';
import { MUTATION_KEYS } from './keys';

export function useLogoutMutation() {
  return useMutation({
    mutationKey: [MUTATION_KEYS.LOGOUT],
    mutationFn: API.auth.logout,
  });
}
