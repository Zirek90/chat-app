import * as FileSystem from 'expo-file-system';
import { StorageAPI } from '../api/storage';

export async function getCachedFile(path: string, type: 'chat-images' | 'chat-files') {
  const localUri = `${FileSystem.cacheDirectory}${path}`;

  const fileInfo = await FileSystem.getInfoAsync(localUri);
  if (fileInfo.exists) {
    return localUri; // Return cached uri
  }

  const signedUrl = await StorageAPI.getFileUrl(type, path);
  const downloadedFile = await FileSystem.downloadAsync(signedUrl, localUri);

  return downloadedFile.uri; // Return local cached path
}
