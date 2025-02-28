import { useMutation } from '@tanstack/react-query';
import { API } from '../api';
import { MUTATION_KEYS } from './keys';

export function useUpdateProfileMutation() {
  return useMutation({
    mutationKey: [MUTATION_KEYS.UPDATE_PROFILE],
    mutationFn: API.user.updateProfile,
  });
}
