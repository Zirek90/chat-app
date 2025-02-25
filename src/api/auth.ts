import { Session } from '@supabase/supabase-js';
import { LoginCredentialsInterface, SignUpCredentialsInterface } from '@/src/interfaces';
import { supabase } from '@/src/libs/supabase';

export const AuthAPI = {
  getSession: async () => {
    const { data } = await supabase.auth.getSession();
    return data.session;
  },
  subscribeToAuthChanges: (callback: (session: Session | null) => void) => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      callback(session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      callback(session);
    });
    return () => authListener.subscription.unsubscribe();
  },
  login: async ({ email, password }: LoginCredentialsInterface) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data.session;
  },
  signup: async ({ email, password, username }: SignUpCredentialsInterface) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username, avatar: '' } },
    });
    if (error) throw error;
    return data.session;
  },
  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
};
