import { decode } from 'base64-arraybuffer';
import { supabase } from '../libs/supabase';

export const StorageAPI = {
  uploadFile: async (bucket: string, filePath: string, base64: string, contentType: string) => {
    await supabase.storage.from(bucket).upload(filePath, decode(base64), { contentType });
  },
  getFile: async (bucket: string, id: string) => {
    const { data, error } = await supabase.storage.from(bucket).list(id);

    if (error) throw error;
    return data;
  },
  getFileUrl: async (bucket: string, filePath: string) => {
    const { data, error } = await supabase.storage.from(bucket).createSignedUrl(filePath, 3600);
    if (error) throw error;
    return data.signedUrl;
  },
  removeFile: async (bucket: string, name: string) => {
    await supabase.storage.from(bucket).remove([name]);
  },
  uploadAvatar: async (filePath: string, base64: string, contentType: string) => {
    await supabase.storage
      .from('avatars')
      .upload(filePath, decode(base64), { contentType, upsert: true });
  },
  getAvatar: async (name: string) => {
    const { data, error } = await supabase.storage.from('avatars').createSignedUrl(name, 3600); //* 1h
    if (error) throw error;

    return data.signedUrl;
  },
  addFileAccess: async (chatroomId: string, files: { path: string }[], participants: string[]) => {
    const accessRecords = participants
      .map((userId) =>
        files.map((file) => ({
          chatroom_id: chatroomId,
          file_path: file.path,
          user_id: userId,
        })),
      )
      .flat();

    const { error } = await supabase.from('file_access').insert(accessRecords);
    if (error) console.error('Error adding file access:', error);
  },
};
