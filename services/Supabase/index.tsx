import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, createClient } from "@supabase/supabase-js";
import { Alert } from "react-native";

export type UserProfile = {
  auth_id: string;
  email: string;
  coins: number;
};

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? "";

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

class SupaBaseServiceClass {
  private client = supabase;

  async signInWithEmail(email: string, password: string) {
    const { error } = await this.client.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
  }
  async signUpWithEmail(email: string, password: string) {
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
  }
  async getUserProfile(user: User): Promise<UserProfile | null> {
    const { data, error } = await this._getUserProfileFromDatabase(user);
    if (error) {
      const { data, error } = await this.createUserProfile(user);
      if (error) {
        Alert.alert(error.message);
        return null;
      }
      return data;
    }
    return data;
  }
  async createUserProfile(user: User) {
    const response = await this.client
      .from("users")
      .insert({ auth_id: user.id, email: user.email });
    return response;
  }
  async signOut() {
    await this.client.auth.signOut();
  }
  async getUser() {
    return this.client.auth.getUser();
  }

  private async _getUserProfileFromDatabase(user: User) {
    const response = await this.client
      .from("users")
      .select("*")
      .eq("auth_id", user.id)
      .single();
    return response;
  }
}

export const SupaBaseService = new SupaBaseServiceClass();
