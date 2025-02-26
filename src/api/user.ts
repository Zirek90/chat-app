import { StorageAPI } from './storage';
import { UserUpdateInterface } from '@/src/interfaces';
import { supabase } from '@/src/libs/supabase';

export const UserAPI = {
  getUser: async () => {
    const { data, error } = await supabase.auth.getUser();

    if (error) throw error;
    return data.user;
  },
  getUserProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, username, avatar')
      .eq('id', userId)
      .single();

    if (error) throw error;

    let avatar = null;
    if (data.avatar) {
      avatar = await StorageAPI.getAvatar('avatars', data.avatar);
    }
    return { ...data, avatar };
  },
  updateProfile: async (updates: UserUpdateInterface) => {
    const { data, error } = await supabase.auth.updateUser({ data: updates });

    if (error) throw error;
    return data;
  },
  getAllUsers: async (currentUserId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, username, avatar')
      .neq('id', currentUserId);

    if (error) throw error;
    return data;
  },
};
