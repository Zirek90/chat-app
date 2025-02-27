import * as FileSystem from 'expo-file-system';
import { API } from '@/src/api/api';
import { FileType, ImageType } from '@/src/types';

export async function processAttachments(
  bucket: string,
  attachments: FileType[] | ImageType[],
  defaultMimeType: string,
): Promise<{ type: string; path: string }[]> {
  const uploadedFiles: { type: string; path: string }[] = [];

  for (const attachment of attachments) {
    try {
      const filePath =
        (attachment as FileType)?.name ||
        (attachment as ImageType)?.fileName ||
        `${Date.now()}.bin`;

      const base64 = await FileSystem.readAsStringAsync(attachment.uri, { encoding: 'base64' });

      await API.storage.uploadFile(
        bucket,
        filePath,
        base64,
        attachment.mimeType || defaultMimeType,
      );

      uploadedFiles.push({
        type: bucket.includes('image') ? 'image' : 'file',
        path: filePath,
      });
    } catch (error) {
      console.error(`Error uploading ${attachment.uri}:`, error);
    }
  }

  return uploadedFiles;
}
