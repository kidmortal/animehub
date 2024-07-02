import { View, Text, Image, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { AnimesContext } from "@/context/animes";

export default function AppLogo() {
  const animeContext = useContext(AnimesContext);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("@/assets/images/animehublogo.png")}
      />
      <View style={{ width: 12 }} />
      <Text style={styles.title}>Anime Hub</Text>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{ uri: animeContext.userProfile?.avatar_url }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  image: {
    width: 50,
    height: 50,
  },
  avatarContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 15,
  },
});
