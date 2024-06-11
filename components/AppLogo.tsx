import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

export default function AppLogo() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("@/assets/images/animehublogo.png")}
      />
      <View style={{ width: 12 }} />
      <Text style={styles.title}>Anime Hub</Text>
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
});
