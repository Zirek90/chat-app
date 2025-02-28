import { useMutation } from '@tanstack/react-query';
import { API } from '../api';
import { MUTATION_KEYS } from './keys';

export function useUploadFileMutation() {
  return useMutation({
    mutationKey: [MUTATION_KEYS.UPLOAD_FILE],
    mutationFn: async ({
      bucket,
      filePath,
      base64,
      contentType,
    }: {
      bucket: string;
      filePath: string;
      base64: string;
      contentType: string;
    }) => await API.storage.uploadFile(bucket, filePath, base64, contentType),
  });
}
