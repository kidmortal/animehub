import { JikanAnimeData } from "@/services/JikanMoe/types";
import { createContext, useState } from "react";

export type AnimesContextType = {
  animesData: JikanAnimeData[];
  setAnimesData: (data: JikanAnimeData[]) => void;
  getAnimeId: (id: number) => JikanAnimeData | undefined;
};

export const AnimesContextStore: AnimesContextType = {
  animesData: [],
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

  function getAnimeId(id: number) {
    return animesData.find((anime) => anime.mal_id === id);
  }

  return (
    <AnimesContext.Provider value={{ animesData, setAnimesData, getAnimeId }}>
      {props.children}
    </AnimesContext.Provider>
  );
}
