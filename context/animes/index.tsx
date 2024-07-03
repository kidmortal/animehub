import { JikanMoeService } from '@/services/JikanMoe';
import { JikanAnimeData } from '@/services/JikanMoe/types/season';
import { AnimeHubLocalStorageService } from '@/services/LocalStorageData';
import { SupaBaseService, UserProfile } from '@/services/Supabase';
import { User } from '@supabase/supabase-js';
import { createContext, useEffect, useState } from 'react';

export type WatchingAnime = {
  mal_id: number;
  name: string;
  url: string;
};

export type AnimesContextType = {
  animesData: JikanAnimeData[];
  user: User | null;
  userProfile: UserProfile | null;
  watchingAnimes: WatchingAnime[];
  loadUserInfo: () => void;
  loadSeasonAnimes: () => void;
  fetchUserWatchingAnimes: () => void;
  setWatchingAnimes: (animes: WatchingAnime[]) => void;
  setProfileAvatarUrl: (url: string) => void;
  setAnimesData: (data: JikanAnimeData[]) => void;
  getAnimeId: (id: number) => JikanAnimeData | undefined;
  setUser: (user: User) => void;
  setUserProfile: (profile: UserProfile) => void;
};

export const AnimesContextStore: AnimesContextType = {
  animesData: [],
  user: null,
  userProfile: null,
  watchingAnimes: [],
  loadUserInfo: () => {},
  loadSeasonAnimes: () => {},
  fetchUserWatchingAnimes: () => {},
  setWatchingAnimes: () => {},
  setProfileAvatarUrl: () => {},
  setUser: () => {},
  setUserProfile: () => {},
  setAnimesData: () => {},
  getAnimeId: () => undefined,
};

export const AnimesContext = createContext<AnimesContextType>(AnimesContextStore);

type AnimesContextProviderProp = {
  children: React.ReactNode;
};

export function AnimesContextProvider(props: AnimesContextProviderProp) {
  const [animesData, setAnimesData] = useState<JikanAnimeData[]>([]);
  const [watchingAnimes, setWatchingAnimes] = useState<WatchingAnime[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  function getAnimeId(id: number) {
    return animesData.find((anime) => anime.mal_id === id);
  }

  async function loadUserInfo() {
    const cachedData = await AnimeHubLocalStorageService.getLocalStorageUserProfile();
    if (cachedData) {
      setUserProfile(cachedData);
    } else {
      const response = await SupaBaseService.getUser();
      if (response?.data?.user) {
        setUser(response.data.user);
        const getProfile = await SupaBaseService.getUserProfile(response.data.user);
        const profileUrl = SupaBaseService.getUserAvatarUrl(response.data.user.id);
        if (getProfile) {
          const fetchedProfile = { ...getProfile, avatar_url: profileUrl ?? '' };
          setUserProfile(fetchedProfile);
          AnimeHubLocalStorageService.setLocalStorageUserProfile(fetchedProfile);
        }
      }
    }
  }

  async function loadSeasonAnimes() {
    const cachedData = await AnimeHubLocalStorageService.getLocalStorageAnimes();
    if (cachedData) {
      setAnimesData(cachedData);
    } else {
      const fetchedAnimeData = await JikanMoeService.getCurrentSeasonAnimes();
      if (fetchedAnimeData.data) {
        AnimeHubLocalStorageService.setLocalStorageAnimes(fetchedAnimeData.data);
        setAnimesData(fetchedAnimeData.data);
      }
    }
  }

  function setProfileAvatarUrl(url: string) {
    if (userProfile) {
      setUserProfile({ ...userProfile, avatar_url: url });
    }
  }

  async function fetchUserWatchingAnimes() {
    if (!user) return;
    const response = await SupaBaseService.getUserWatchingAnimeList(user);
    if (response) setWatchingAnimes(response);
  }

  useEffect(() => {
    if (animesData.length === 0) {
      loadSeasonAnimes();
    }
    if (!userProfile) loadUserInfo();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserWatchingAnimes();
    }
  }, [user]);

  return (
    <AnimesContext.Provider
      value={{
        animesData,
        user,
        userProfile,
        watchingAnimes,
        loadUserInfo,
        loadSeasonAnimes,
        fetchUserWatchingAnimes,
        setWatchingAnimes,
        setAnimesData,
        getAnimeId,
        setUser,
        setUserProfile,
        setProfileAvatarUrl,
      }}
    >
      {props.children}
    </AnimesContext.Provider>
  );
}
