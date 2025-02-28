import { useMutation } from '@tanstack/react-query';
import * as FileSystem from 'expo-file-system';
import { MUTATION_KEYS } from './keys';
import { useUploadFileMutation } from './useUploadFileMutation';
import { FileType, ImageType } from '@/src/types';

export function useProcessAttachmentsMutation() {
  const uploadFileMutation = useUploadFileMutation();

  return useMutation({
    mutationKey: [MUTATION_KEYS.PROCESS_ATTACHMENTS],
    mutationFn: async ({
      bucket,
      attachments,
      defaultMimeType,
    }: {
      bucket: string;
      attachments: FileType[] | ImageType[];
      defaultMimeType: string;
    }) => {
      const uploadedFiles: { type: string; path: string }[] = [];

      await Promise.all(
        attachments.map(async (attachment) => {
          try {
            const filePath =
              (attachment as FileType)?.name ||
              (attachment as ImageType)?.fileName ||
              `${Date.now()}.bin`;

            const base64 = await FileSystem.readAsStringAsync(attachment.uri, {
              encoding: 'base64',
            });

            await uploadFileMutation.mutateAsync({
              bucket,
              filePath,
              base64,
              contentType: attachment.mimeType || defaultMimeType,
            });

            uploadedFiles.push({
              type: bucket.includes('image') ? 'image' : 'file',
              path: filePath,
            });
          } catch (error) {
            console.error(`Error uploading ${attachment.uri}:`, error);
          }
        }),
      );

      return uploadedFiles;
    },
  });
}
