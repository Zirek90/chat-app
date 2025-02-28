import { useMutation } from '@tanstack/react-query';
import { API } from '../api';
import { MUTATION_KEYS } from './keys';

export function useUploadAvatarMutation() {
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
  });
}
