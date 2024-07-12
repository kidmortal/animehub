import AsyncStorage from '@react-native-async-storage/async-storage';
import { JikanAnimeData } from '../JikanMoe/types/season';
import { JikanAnimeCharacters } from '../JikanMoe/types/characters';
import { UserProfile } from '../Supabase';
import dayjs from 'dayjs';
import { JikanMoeSeason, JikanMoeSeasonsList } from '../JikanMoe/types/seasons';
import { SeasonYearName } from '@/context/animes';

export type LocalStorageAnimes = {
  updatedAt: string;
  animesData: JikanAnimeData[];
};

export type CacheKeyInfo = {
  key: string;
  cachedAt: string;
};

type CachedItem = {
  item: any;
  cachedAt: string;
};

export type LocalStorageCacheExpirationSettings = {
  seasonAnimeExpirationHours: number;
  animeCharactersExpirationHours: number;
  userProfileExpirationHours: number;
  seasonListExpirationHours: number;
};

class AnimeHubLocalStorageServiceClass {
  async getLocalStorageSeasonAnimes(season: SeasonYearName): Promise<JikanAnimeData[] | null> {
    const cachedData = await this._getCachedItem(`season-animes-${season.year}-${season.season}`);
    // not cached
    if (!cachedData) return null;
    // no cache timestap
    if (!cachedData.cachedAt) {
      return null;
    }
    const expirationSettings = await this.getExpirationSettings();
    // cache expired
    if (dayjs(cachedData.cachedAt).add(expirationSettings.seasonAnimeExpirationHours, 'hours').isBefore(dayjs())) {
      return null;
    }
    const data: JikanAnimeData[] = cachedData.item;
    return data;
  }
  async setLocalStorageSeasonAnimes(season: SeasonYearName, data: JikanAnimeData[]) {
    this._cacheItem(`season-animes-${season.year}-${season.season}`, data);
  }
  async setLocalStorageUserProfile(data: UserProfile) {
    this._cacheItem(`user-profile`, data);
  }

  async getLocalStorageUserProfile(): Promise<UserProfile | null> {
    const cachedData = await this._getCachedItem(`user-profile`);
    if (!cachedData) return null;
    const expirationSettings = await this.getExpirationSettings();
    if (!cachedData.cachedAt) {
      return null;
    }
    if (dayjs(cachedData.cachedAt).add(expirationSettings.userProfileExpirationHours, 'hours').isBefore(dayjs())) {
      return null;
    }
    const data: UserProfile = cachedData.item;
    return data;
  }

  async getLocalStorageAnimeCharacters(animeId: number): Promise<JikanAnimeCharacters | null> {
    const cachedData = await AsyncStorage.getItem(`anime-characters-${animeId}`);
    if (!cachedData) return null;
    const data: JikanAnimeCharacters = JSON.parse(cachedData);
    return data;
  }

  setLocalStorageAnimeCharacters(animeId: number, data: JikanAnimeCharacters) {
    AsyncStorage.setItem(`anime-characters-${animeId}`, JSON.stringify(data));
  }

  async getLocalStorageSeasonsList(): Promise<JikanMoeSeason[] | null> {
    const cachedData = await this._getCachedItem(`season-list`);
    // not cached
    if (!cachedData) return null;
    const expirationSettings = await this.getExpirationSettings();
    // no cache
    if (!cachedData.cachedAt) return null;
    // cache expired
    if (dayjs(cachedData.cachedAt).add(expirationSettings.seasonListExpirationHours, 'hours').isBefore(dayjs())) {
      return null;
    }
    const data: JikanMoeSeason[] = cachedData.item;
    return data;
  }

  async setLocalStorageSeasonsList(data: JikanMoeSeason[]) {
    this._cacheItem(`season-list`, data);
  }

  clearLocalStorage() {
    AsyncStorage.clear();
  }

  async getExpirationSettings(): Promise<LocalStorageCacheExpirationSettings> {
    const expirationSettings = await this._getCachedItem('cache-expiration-settings');
    if (!expirationSettings) {
      const newSettings: LocalStorageCacheExpirationSettings = {
        seasonAnimeExpirationHours: 24,
        animeCharactersExpirationHours: 24,
        userProfileExpirationHours: 24,
        seasonListExpirationHours: 24,
      };
      this._cacheItem('cache-expiration-settings', newSettings);
      return newSettings;
    }
    return expirationSettings.item;
  }

  async getAllCachedDataInfo() {
    const cachedDataList: CacheKeyInfo[] = [];
    const allKeys = await AsyncStorage.getAllKeys();
    for await (const key of allKeys) {
      const cachedData = await this._getCachedItem(key);
      if (cachedData?.cachedAt) {
        cachedDataList.push({
          key: key ?? 'N/A',
          cachedAt: cachedData?.cachedAt ?? 'N/A',
        });
      }
    }

    return cachedDataList;
  }

  private async _getCachedItem(key: string): Promise<CachedItem | null> {
    const cachedData = await AsyncStorage.getItem(key);
    if (!cachedData) return null;
    const data: CachedItem = JSON.parse(cachedData);
    return data;
  }
  private async _cacheItem(key: string, data: any) {
    const cachedData: CachedItem = {
      item: data,
      cachedAt: dayjs().toISOString(),
    };
    AsyncStorage.setItem(key, JSON.stringify(cachedData));
  }
}

export const AnimeHubLocalStorageService = new AnimeHubLocalStorageServiceClass();
