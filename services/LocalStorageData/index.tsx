import AsyncStorage from '@react-native-async-storage/async-storage';
import { JikanAnimeData } from '../JikanMoe/types/season';
import { JikanAnimeCharacters } from '../JikanMoe/types/characters';
import { UserProfile } from '../Supabase';
import dayjs from 'dayjs';
import { JikanMoeSeason, JikanMoeSeasonsList } from '../JikanMoe/types/seasons';

export type LocalStorageAnimes = {
  updatedAt: string;
  animesData: JikanAnimeData[];
};

export type LocalStorageCacheExpirationSettings = {
  seasonAnimeExpirationHours: number;
  animeCharactersExpirationHours: number;
  userProfileExpirationHours: number;
  seasonListExpirationHours: number;
};

export type LocalStorageCacheExpirationTimestamps = {
  seasonAnimesUpdatedAt: string;
  animeCharactersUpdatedAt: string;
  userProfileUpdatedAt: string;
  seasonListUpdatedAt: string;
};

class AnimeHubLocalStorageServiceClass {
  async getLocalStorageAnimes(): Promise<JikanAnimeData[] | null> {
    const cachedData = await AsyncStorage.getItem('animesData');
    // not cached
    if (!cachedData) return null;
    const cachedDataTimestamps = await this.getExpirationTimestamps();
    const expirationSettings = await this.getExpirationSettings();
    // no cache timestap
    if (!cachedDataTimestamps.seasonAnimesUpdatedAt) {
      return null;
    }
    // cache expired
    if (
      dayjs(cachedDataTimestamps.seasonAnimesUpdatedAt)
        .add(expirationSettings.seasonAnimeExpirationHours, 'hours')
        .isBefore(dayjs())
    ) {
      return null;
    }
    const data: JikanAnimeData[] = JSON.parse(cachedData);
    return data;
  }
  async setLocalStorageAnimes(data: JikanAnimeData[]) {
    AsyncStorage.setItem('animesData', JSON.stringify(data));
    const cachedDataTimestamps = await this.getExpirationTimestamps();
    cachedDataTimestamps.seasonAnimesUpdatedAt = dayjs().toISOString();
    this._setExpirationTimestamps(cachedDataTimestamps);
  }
  async setLocalStorageUserProfile(data: UserProfile) {
    AsyncStorage.setItem('userProfile', JSON.stringify(data));
    const cachedDataTimestamps = await this.getExpirationTimestamps();
    cachedDataTimestamps.userProfileUpdatedAt = dayjs().toISOString();
    this._setExpirationTimestamps(cachedDataTimestamps);
  }

  async getLocalStorageUserProfile(): Promise<UserProfile | null> {
    const cachedData = await AsyncStorage.getItem('userProfile');
    if (!cachedData) return null;
    const cachedDataTimestamps = await this.getExpirationTimestamps();
    const expirationSettings = await this.getExpirationSettings();
    if (!cachedDataTimestamps.userProfileUpdatedAt) {
      return null;
    }
    if (
      dayjs(cachedDataTimestamps.userProfileUpdatedAt)
        .add(expirationSettings.userProfileExpirationHours, 'hours')
        .isBefore(dayjs())
    ) {
      return null;
    }
    const data: UserProfile = JSON.parse(cachedData);
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
    const cachedData = await AsyncStorage.getItem('seasonsList');
    // not cached
    if (!cachedData) return null;
    const cachedDataTimestamps = await this.getExpirationTimestamps();
    const expirationSettings = await this.getExpirationSettings();
    // no cache
    if (!cachedDataTimestamps.seasonListUpdatedAt) return null;
    // cache expired
    if (
      dayjs(cachedDataTimestamps.seasonListUpdatedAt)
        .add(expirationSettings.seasonListExpirationHours, 'hours')
        .isBefore(dayjs())
    ) {
      return null;
    }
    const data: JikanMoeSeason[] = JSON.parse(cachedData);
    return data;
  }

  async setLocalStorageSeasonsList(data: JikanMoeSeason[]) {
    AsyncStorage.setItem('seasonsList', JSON.stringify(data));
    const cachedDataTimestamps = await this.getExpirationTimestamps();
    cachedDataTimestamps.seasonListUpdatedAt = dayjs().toISOString();
    this._setExpirationTimestamps(cachedDataTimestamps);
  }

  clearLocalStorage() {
    AsyncStorage.clear();
  }

  async getExpirationSettings(): Promise<LocalStorageCacheExpirationSettings> {
    const expirationSettings = await AsyncStorage.getItem('cacheExpirationSettings');
    if (!expirationSettings) {
      const newSettings: LocalStorageCacheExpirationSettings = {
        seasonAnimeExpirationHours: 24,
        animeCharactersExpirationHours: 24,
        userProfileExpirationHours: 24,
        seasonListExpirationHours: 24,
      };
      AsyncStorage.setItem('cacheExpirationSettings', JSON.stringify(newSettings));
      return newSettings;
    }
    return JSON.parse(expirationSettings);
  }
  async getExpirationTimestamps(): Promise<LocalStorageCacheExpirationTimestamps> {
    const timestamps = await AsyncStorage.getItem('cacheExpirationTimestamps');
    if (!timestamps) {
      const newTimestamps: LocalStorageCacheExpirationTimestamps = {
        seasonAnimesUpdatedAt: '',
        animeCharactersUpdatedAt: '',
        userProfileUpdatedAt: '',
        seasonListUpdatedAt: '',
      };
      this._setExpirationTimestamps(newTimestamps);
      return newTimestamps;
    }
    return JSON.parse(timestamps);
  }
  private _setExpirationTimestamps(timestamps: LocalStorageCacheExpirationTimestamps) {
    AsyncStorage.setItem('cacheExpirationTimestamps', JSON.stringify(timestamps));
  }
}

export const AnimeHubLocalStorageService = new AnimeHubLocalStorageServiceClass();
