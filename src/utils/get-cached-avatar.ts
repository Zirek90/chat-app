import * as FileSystem from 'expo-file-system';
import { StorageAPI } from '../api/storage';
import { AVATAR_CACHE_TIME, AVATAR_DIR } from '../constants';

export async function getCachedAvatar(name: string) {
  if (!name) return null;

  const localUri = `${AVATAR_DIR}${name}`;
  const fileInfo = await FileSystem.getInfoAsync(localUri);

  if (fileInfo.exists && Date.now() - fileInfo.modificationTime! < AVATAR_CACHE_TIME) {
    return localUri; // Return cached avatar if fresh
  }

  // Otherwise fetch new one
  try {
    const signedUrl = await StorageAPI.getAvatar(name);
    if (!signedUrl) return null;

    await FileSystem.makeDirectoryAsync(AVATAR_DIR, { intermediates: true });

    const downloadedFile = await FileSystem.downloadAsync(signedUrl, localUri);
    return downloadedFile.uri;
  } catch (error) {
    console.error('Error fetching/downloading avatar:', error);
    return null;
  }
}
