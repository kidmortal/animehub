import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SupaBaseService } from "@/services/Supabase";
import { User } from "@supabase/supabase-js";

export default function UserInfo() {
  const [user, setUser] = useState<User>();

  async function getUserData() {
    const user = await SupaBaseService.getUser();
    if (user.data.user) {
      setUser(user.data.user);
      console.log(user);
    }
  }
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View>
      <Text style={styles.title}>User Info</Text>
      <Text style={styles.text}>Email: {user?.email}</Text>
      <Text style={styles.text}>Created at: {user?.created_at}</Text>
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
