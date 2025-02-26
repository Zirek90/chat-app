import { useState, useEffect } from 'react';
import { API } from '../api';

interface userProfile {
  id: string;
  username: string;
  avatar: string;
}

export function useGetProfileWithAvatar(userId: string | null) {
  const [userProfile, setUserProfile] = useState<userProfile | null>(null);

  useEffect(() => {
    if (!userId) return;

    async function fetchProfile() {
      const userProfile = await API.user.getUserProfile(userId!);
      if (userProfile) {
        setUserProfile({
          id: userProfile?.id || '',
          username: userProfile?.username || '',
          avatar: userProfile?.avatar || '',
        });
      }
    }
    fetchProfile();
  }, [userId]);

  return userProfile;
}
