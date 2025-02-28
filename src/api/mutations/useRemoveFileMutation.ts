import { useMutation } from '@tanstack/react-query';
import { API } from '../api';
import { MUTATION_KEYS } from './keys';

export function useRemoveFileMutation() {
  return useMutation({
    mutationKey: [MUTATION_KEYS.REMOVE_FILE],
    mutationFn: async ({ bucket, name }: { bucket: string; name: string }) =>
      await API.storage.removeFile(bucket, name),
  });
}
