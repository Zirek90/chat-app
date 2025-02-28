import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API } from '../api';
import { MUTATION_KEYS } from './keys';
import { QUERY_KEYS } from '../queries';

export function useUploadAvatarMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MUTATION_KEYS.UPLOAD_AVATAR],
    mutationFn: async ({
      filePath,
      base64,
      contentType,
    }: {
      filePath: string;
      base64: string;
      contentType: string;
    }) => await API.storage.uploadAvatar(filePath, base64, contentType),
    onSettled: async (_, error) => {
      if (error) {
        console.error('🚀 ~ useUploadAvatarMutation: ~ error:', error.message);
      } else {
        await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROFILE] });
      }
    },
  });
}
