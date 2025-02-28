import { useMutation } from '@tanstack/react-query';
import { API } from '../api';
import { MUTATION_KEYS } from './keys';

export function useEditMessageMutation() {
  return useMutation({
    mutationKey: [MUTATION_KEYS.EDIT_MESSAGE],
    mutationFn: async ({ messageId, content }: { messageId: string; content: string }) =>
      API.chat.editMessage(messageId, content),
  });
}
