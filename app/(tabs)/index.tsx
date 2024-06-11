import AnimeList from "@/components/AnimeList";
import AppLogo from "@/components/AppLogo";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.pageContainer}>
      <AppLogo />
      <View style={{ height: 12 }} />
      <Text style={styles.pageTitle}>Current season animes</Text>
      <View style={{ height: 24 }} />
      <AnimeList />
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    padding: 24,
    paddingTop: 36,
    backgroundColor: "#15141F",
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});
