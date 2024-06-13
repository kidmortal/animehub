import AsyncStorage from "@react-native-async-storage/async-storage";
import { JikanAnimeData } from "../JikanMoe/types/season";
import { JikanAnimeCharacters } from "../JikanMoe/types/characters";

export type LocalStorageAnimes = {
  updatedAt: string;
  animesData: JikanAnimeData[];
};

export async function getLocalStorageAnimes(): Promise<LocalStorageAnimes | null> {
  const cachedData = await AsyncStorage.getItem("animesData");
  if (!cachedData) return null;
  const data: LocalStorageAnimes = JSON.parse(cachedData);
  if (!data.updatedAt) return null;
  const updatedAt = new Date(data.updatedAt);
  if (updatedAt.getTime() + 1000 * 60 * 60 * 24 * 7 < Date.now()) return null;
  return data;
}

export function setLocalStorageAnimes(data: LocalStorageAnimes) {
  AsyncStorage.setItem("animesData", JSON.stringify(data));
}

export function clearLocalStorageAnimes() {
  AsyncStorage.removeItem("animesData");
}

export async function getLocalStorageAnimeCharacters(
  animeId: number
): Promise<JikanAnimeCharacters | null> {
  const cachedData = await AsyncStorage.getItem(`anime-characters-${animeId}`);
  if (!cachedData) return null;
  const data: JikanAnimeCharacters = JSON.parse(cachedData);
  return data;
}

export function setLocalStorageAnimeCharacters(
  animeId: number,
  data: JikanAnimeCharacters
) {
  AsyncStorage.setItem(`anime-characters-${animeId}`, JSON.stringify(data));
}
