import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API } from '../api';
import { MUTATION_KEYS } from './keys';
import { QUERY_KEYS } from '../queries';

export function useSendMessageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MUTATION_KEYS.SEND_MESSAGE],
    mutationFn: async ({
      chatId,
      userId,
      username,
      content,
      attachments,
    }: {
      chatId: string;
      userId: string;
      username: string;
      content: string;
      attachments: { type: string; path: string }[];
    }) => API.chat.sendMessage(chatId, userId, username, content, attachments),
    onSettled: async (_, error) => {
      if (error) {
        console.error('🚀 ~ useLogoutMutation: ~ error:', error.message);
      } else {
        await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MESSAGES] });
      }
    },
  });
}
