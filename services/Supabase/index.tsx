import AsyncStorage from '@react-native-async-storage/async-storage';
import { SupabaseClient, User, createClient } from '@supabase/supabase-js';
import { decode } from 'base64-arraybuffer';
import { Alert } from 'react-native';

export type UserProfile = {
  auth_id: string;
  email: string;
  coins: number;
  avatar_url?: string;
};

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';

function createSubapaseInstance() {
  if (!supabaseUrl || !supabaseAnonKey) {
    Alert.alert('Please provide Supabase URL and Anon Key in .env file');
    return null;
  }
  try {
    const client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    });
    return client;
  } catch (error) {
    Alert.alert(JSON.stringify(error));
    return null;
  }
}

class SupaBaseServiceClass {
  private client: SupabaseClient | null = null;

  constructor() {
    this.client = createSubapaseInstance();
  }

  async signInWithEmail(email: string, password: string) {
    const result = await this.client?.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (!result) return;

    if (result.error) Alert.alert(result.error.message);
  }
  async signUpWithEmail(email: string, password: string) {
    const result = await this.client?.auth.signUp({
      email: email,
      password: password,
    });
    if (!result) return;
    const {
      data: { session },
      error,
    } = result;

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert('Please check your inbox for email verification!');
  }
  async getUserProfile(user: User): Promise<UserProfile | null> {
    const result = await this._getUserProfileFromDatabase(user);
    if (!result) return null;
    const { data, error } = result;
    if (error) {
      const result = await this.createUserProfile(user);
      if (!result) return null;
      const { data, error } = result;
      if (error) {
        Alert.alert(error.message);
        return null;
      }
      return data;
    }
    return data;
  }
  async getUserWatchingAnimeList(user: User): Promise<any> {
    const result = await this._getUserWatchingAnimeListFromDatabase(user);
    if (!result) return null;
    const { data, error } = result;
    if (error) {
      Alert.alert(error.message);
      return null;
    }
    return data;
  }
  async createUserProfile(user: User) {
    const response = await this.client?.from('users').insert({ auth_id: user.id, email: user.email });
    return response;
  }
  async signOut() {
    await this.client?.auth.signOut();
  }
  async getUser() {
    try {
      const user = await this.client?.auth.getUser();
      return user;
    } catch (error) {
      Alert.alert(JSON.stringify(error));
      return null;
    }
  }

  async updateUserAvatar(userId: string, base64Filetring: string) {
    if (!this.client) return null;
    const { data, error } = await this.client?.storage
      .from('avatars')
      .update(`${userId}.png`, decode(base64Filetring), {
        contentType: 'image/png',
        upsert: true,
        cacheControl: '3600',
      });
    if (error) {
      Alert.alert(error.message);
      return null;
    }
    return data;
  }

  async addAnimeToWatchingList(args: { userId: string; animeId: number; animeName: string; animeUrl: string }) {
    if (!this.client) return null;
    const newAnime = {
      user_id: args.userId,
      mal_id: args.animeId,
      name: args.animeName,
      url: args.animeUrl,
    };
    const { data, error } = await this.client?.from('watching_anime').insert([newAnime]).select();
    if (error) {
      Alert.alert(error.message);
      return null;
    }
    return data;
  }

  getUserAvatarUrl(userId: string) {
    if (!this.client) return null;
    const {
      data: { publicUrl },
    } = this.client?.storage.from('avatars').getPublicUrl(`${userId}.png`);
    return publicUrl;
  }

  private async _getUserProfileFromDatabase(user: User) {
    const response = await this.client?.from('users').select('*').eq('auth_id', user.id).single();
    return response;
  }

  private async _getUserWatchingAnimeListFromDatabase(user: User) {
    const response = await this.client?.from('watching_anime').select('*').eq('user_id', user.id);
    return response;
  }
}

export const SupaBaseService = new SupaBaseServiceClass();
