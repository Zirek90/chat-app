import { decode } from "base64-arraybuffer";
import { supabase } from "../libs/supabase";

export const StorageAPI = {
  uploadFile: async (bucket: string, filePath: string, base64: string, contentType: string) => {
    await supabase.storage.from(bucket).upload(filePath, decode(base64), { contentType });
  },
  getFile: async (bucket: string, id: string) => {
    const { data, error } = await supabase.storage.from(bucket).list(id);

    if (error) throw error;
    return data;
  },
  uploadAvatar: async (filePath: string, base64: string, contentType: string) => {
    await supabase.storage.from("avatars").upload(filePath, decode(base64), { contentType, upsert: true });
  },
  getAvatar: async (bucket: string, name: string) => {
    const { data, error } = await supabase.storage.from(bucket).createSignedUrl(name, 3600); //* 1 hour of expiration
    if (error) throw error;

    return data.signedUrl;
  },
  removeFile: async (bucket: string, name: string) => {
    await supabase.storage.from(bucket).remove([name]);
  },
};
