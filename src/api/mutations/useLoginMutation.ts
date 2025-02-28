import { useMutation } from '@tanstack/react-query';
import { API } from '../api';
import { MUTATION_KEYS } from './keys';

export function useLoginMutation() {
  return useMutation({
    mutationKey: [MUTATION_KEYS.LOGIN],
    mutationFn: API.auth.login,
  });
}
