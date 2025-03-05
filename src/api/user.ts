import {
  getUserFromDb,
  getUserFromParticipantsFromDb,
  insertOrUpdateParticipantInDb,
  insertOrUpdateUserInDb,
  updateUserAvatarInDb,
} from '../db';
import { getCachedAvatar, isDataExpired } from '../utils';
import { UserUpdateInterface } from '@/src/interfaces';
import { supabase } from '@/src/libs/supabase';

export const UserAPI = {
  getUser: async () => {
    const localUser = await getUserFromDb();
    if (localUser) return localUser;

    const { data, error } = await supabase.auth.getUser();

    if (error) throw error;

    const user = {
      id: data.user.id,
      email: data.user.email || '',
      username: data.user.user_metadata?.username || '',
      avatar: data.user.user_metadata?.avatar || null,
    };

    await insertOrUpdateUserInDb(user);
    return user;
  },
  getParticipantProfile: async (userId: string) => {
    const localUser = await getUserFromParticipantsFromDb(userId);
    if (localUser && !isDataExpired(localUser.last_updated, 168)) return localUser; // Refresh data every week

    const { data, error } = await supabase
      .from('profiles')
      .select('id, username, avatar')
      .eq('id', userId)
      .single();

    if (error) throw error;

    const cachedAvatar = data.avatar ? await getCachedAvatar(data.avatar) : null;

    const user = { id: data.id, username: data.username || '', avatar: cachedAvatar };

    await insertOrUpdateParticipantInDb(user);

    return user;
  },
  updateProfile: async (updates: UserUpdateInterface) => {
    const { data, error } = await supabase.auth.updateUser({ data: updates });

    if (error) throw error;

    await updateUserAvatarInDb(data.user.id, updates.avatar);
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
