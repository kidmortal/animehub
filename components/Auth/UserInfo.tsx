import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SupaBaseService, UserProfile } from "@/services/Supabase";

export default function UserInfo() {
  const [profile, setProfile] = useState<UserProfile>();

  async function getUserData() {
    const user = await SupaBaseService.getUser();
    if (user.data.user) {
      const supabaseProfile = await SupaBaseService.getUserProfile(
        user.data.user
      );
      if (supabaseProfile) {
        setProfile(supabaseProfile);
      }
    }
  }
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View>
      <Text style={styles.title}>User Info</Text>
      <Text style={styles.text}>Email: {profile?.email}</Text>
      <Text style={styles.text}>Coins: {profile?.coins}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  text: {
    color: "#fff",
  },
});
