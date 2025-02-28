import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API } from '../api';
import { MUTATION_KEYS } from './keys';
import { QUERY_KEYS } from '../queries';

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MUTATION_KEYS.LOGOUT],
    mutationFn: API.auth.logout,
    onSettled: async (_, error) => {
      if (error) {
        console.error('🚀 ~ useLogoutMutation: ~ error:', error.message);
      } else {
        await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SESSION] });
      }
    },
  });
}
