import { supabase } from "@/src/libs/supabase";
import { UserUpdateInterface } from "@/src/interfaces";

export const UserAPI = {
  getUser: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  },
  updateProfile: async (updates: UserUpdateInterface) => {
    const { data, error } = await supabase.auth.updateUser({ data: updates });
    if (error) throw error;
    return data;
  },
};
