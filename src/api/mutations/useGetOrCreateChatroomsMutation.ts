import { useMutation } from '@tanstack/react-query';
import { API } from '../api';
import { MUTATION_KEYS } from './keys';

export function useGetOrCreateChatroomMutation() {
  return useMutation({
    mutationKey: [MUTATION_KEYS.GET_OR_CREATE_CHATROOMS],
    mutationFn: async ({
      currentUserId,
      participantId,
    }: {
      currentUserId: string;
      participantId: string;
    }) => API.chat.getOrCreateChatroom(currentUserId, participantId),
  });
}
