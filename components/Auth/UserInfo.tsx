import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { UserProfile } from "@/services/Supabase";

type Props = {
  userProfile: UserProfile | null;
};

export default function UserInfo(props: Props) {
  return (
    <View>
      <Text style={styles.title}>User Info</Text>
      <Image
        style={styles.avatar}
        source={{ uri: props.userProfile?.avatar_url }}
      />
      <Text style={styles.text}>Email: {props.userProfile?.email}</Text>
      <Text style={styles.text}>Coins: {props.userProfile?.coins}</Text>
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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
