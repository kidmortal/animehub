import { JikanMoeService } from '@/services/JikanMoe';
import { JikanAnimeData } from '@/services/JikanMoe/types/season';
import { AnimeHubLocalStorageService } from '@/services/LocalStorageData';
import { SupaBaseService, UserProfile } from '@/services/Supabase';
import { ParserUtils } from '@/utils/parsers';
import { TimeUtils } from '@/utils/time';
import { User } from '@supabase/supabase-js';
import { createContext, useEffect, useState } from 'react';

export type WatchingAnime = {
  mal_id: number;
  name: string;
  url: string;
};

export type SeasonYearName = {
  year: number;
  season: string;
};

export type AnimesContextType = {
  animesData: JikanAnimeData[];
  user: User | null;
  userProfile: UserProfile | null;
  watchingAnimes: WatchingAnime[];
  seasons: SeasonYearName[];
  selectedSeasonIndex: number;
  setSelectedSeasonIndex: (index: number) => void;
  setSeasons: (seasons: SeasonYearName[]) => void;
  loadSeasons: () => void;
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
  seasons: [],
  selectedSeasonIndex: 0,
  setSelectedSeasonIndex: () => {},
  setSeasons: () => {},
  loadSeasons: () => {},
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
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState<number>(0);
  const [seasons, setSeasons] = useState<SeasonYearName[]>([]);
  const [watchingAnimes, setWatchingAnimes] = useState<WatchingAnime[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  async function loadSeasons() {
    const cachedData = await AnimeHubLocalStorageService.getLocalStorageSeasonsList();
    if (cachedData) {
      setSeasons(ParserUtils.parseJikanSeasonsToSeasonYearName(cachedData));
    } else {
      const fetchedSeasons = await JikanMoeService.getSeasonsList();
      if (fetchedSeasons.data) {
        AnimeHubLocalStorageService.setLocalStorageSeasonsList(fetchedSeasons.data);
        setSeasons(ParserUtils.parseJikanSeasonsToSeasonYearName(fetchedSeasons.data));
      }
    }
  }

  async function selectCurrentSeason() {
    const currentSeason = TimeUtils.getCurrentSeasonYearName();
    const seasonIndex = seasons.findIndex(
      (season) => season.year === currentSeason.year && season.season === currentSeason.season,
    );
    setSelectedSeasonIndex(seasonIndex);
  }

  function getAnimeId(id: number) {
    return animesData.find((anime) => anime.mal_id === id);
  }

  async function loadUserInfo() {
    const response = await SupaBaseService.getUser();
    if (response?.data?.user) {
      setUser(response.data.user);
    }
  }

  async function loadUserProfile() {
    if (!user) return;
    const cachedProfileData = await AnimeHubLocalStorageService.getLocalStorageUserProfile();
    if (!cachedProfileData) {
      const getProfile = await SupaBaseService.getUserProfile(user);
      const profileUrl = SupaBaseService.getUserAvatarUrl(user.id);
      if (getProfile) {
        const fetchedProfile = { ...getProfile, avatar_url: profileUrl ?? '' };
        setUserProfile(fetchedProfile);
        AnimeHubLocalStorageService.setLocalStorageUserProfile(fetchedProfile);
      }
    } else {
      setUserProfile(cachedProfileData);
    }
  }

  async function loadSeasonAnimes() {
    const selectedSeason = seasons[selectedSeasonIndex];
    if (!selectedSeason) return;

    const cachedData = await AnimeHubLocalStorageService.getLocalStorageSeasonAnimes(selectedSeason);
    if (cachedData) return setAnimesData(cachedData);

    const fetchedAnimeData = await JikanMoeService.getAnimesFromSeason(seasons[selectedSeasonIndex]);
    if (fetchedAnimeData.data) {
      AnimeHubLocalStorageService.setLocalStorageSeasonAnimes(selectedSeason, fetchedAnimeData.data);
      setAnimesData(fetchedAnimeData.data);
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
    if (animesData.length === 0) loadSeasonAnimes();
    if (!user) loadUserInfo();
    if (seasons.length === 0) loadSeasons();
  }, []);

  useEffect(() => {
    if (seasons.length > 0) loadSeasonAnimes();
  }, [selectedSeasonIndex]);

  useEffect(() => {
    selectCurrentSeason();
  }, [seasons]);

  useEffect(() => {
    if (user) {
      fetchUserWatchingAnimes();
      loadUserProfile();
    }
  }, [user]);

  return (
    <AnimesContext.Provider
      value={{
        animesData,
        user,
        userProfile,
        watchingAnimes,
        seasons,
        selectedSeasonIndex,
        setSelectedSeasonIndex,
        setSeasons,
        loadSeasons,
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
