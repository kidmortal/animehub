import AnimeList from "@/components/AnimeList";
import AppLogo from "@/components/AppLogo";
import { AnimesContext } from "@/context/animes";
import { SeasonAnimeMock } from "@/mocks/SeasonAnimesMock";
import { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const animeContext = useContext(AnimesContext);

  useEffect(() => {
    animeContext.setAnimesData(SeasonAnimeMock.data);
  }, []);

  return (
    <View style={styles.pageContainer}>
      <AppLogo />
      <View style={{ height: 12 }} />
      <Text style={styles.pageTitle}>Current season animes</Text>
      <View style={{ height: 24 }} />
      <AnimeList animes={animeContext.animesData} />
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
