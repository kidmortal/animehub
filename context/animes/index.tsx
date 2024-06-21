import { JikanAnimeData } from "@/services/JikanMoe/types/season";
import { UserProfile } from "@/services/Supabase";
import { User } from "@supabase/supabase-js";
import { createContext, useState } from "react";

export type AnimesContextType = {
  animesData: JikanAnimeData[];
  user: User | null;
  userProfile: UserProfile | null;
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
  setProfileAvatarUrl: () => {},
  setUser: () => {},
  setUserProfile: () => {},
  setAnimesData: () => {},
  getAnimeId: () => undefined,
};

export const AnimesContext =
  createContext<AnimesContextType>(AnimesContextStore);

type AnimesContextProviderProp = {
  children: React.ReactNode;
};

export function AnimesContextProvider(props: AnimesContextProviderProp) {
  const [animesData, setAnimesData] = useState<JikanAnimeData[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  function getAnimeId(id: number) {
    return animesData.find((anime) => anime.mal_id === id);
  }

  function setProfileAvatarUrl(url: string) {
    if (userProfile) {
      setUserProfile({ ...userProfile, avatar_url: url });
    }
  }

  return (
    <AnimesContext.Provider
      value={{
        animesData,
        user,
        userProfile,
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
