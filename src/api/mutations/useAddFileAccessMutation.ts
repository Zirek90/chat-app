import { useMutation } from '@tanstack/react-query';
import { API } from '../api';
import { MUTATION_KEYS } from './keys';

export function useAddFileAccessMutation() {
  return useMutation({
    mutationKey: [MUTATION_KEYS.ADD_FILE_ACCESS],
    mutationFn: async ({
      chatroomId,
      files,
      participants,
    }: {
      chatroomId: string;
      files: { path: string }[];
      participants: string[];
    }) => await API.storage.addFileAccess(chatroomId, files, participants),
  });
}
