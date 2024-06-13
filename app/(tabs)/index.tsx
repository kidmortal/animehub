import AnimeList from "@/components/AnimeList";
import AppLogo from "@/components/AppLogo";
import { AnimesContext } from "@/context/animes";
import { SeasonAnimeMock } from "@/mocks/SeasonAnimesMock";
import { JikanMoeService } from "@/services/JikanMoe";
import {
  getLocalStorageAnimes,
  setLocalStorageAnimes,
} from "@/services/LocalStorageData";
import { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const animeContext = useContext(AnimesContext);

  async function loadAnimes() {
    const cachedData = await getLocalStorageAnimes();
    if (cachedData) {
      animeContext.setAnimesData(cachedData.animesData);
    } else {
      const fetchedAnimeData = await JikanMoeService.getCurrentSeasonAnimes();
      if (fetchedAnimeData.data) {
        setLocalStorageAnimes({
          updatedAt: new Date().toISOString(),
          animesData: fetchedAnimeData.data,
        });
        animeContext.setAnimesData(fetchedAnimeData.data);
      }
    }
  }

  useEffect(() => {
    loadAnimes();
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
