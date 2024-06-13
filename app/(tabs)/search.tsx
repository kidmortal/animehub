import AnimeList from "@/components/AnimeList";
import AppLogo from "@/components/AppLogo";
import Categories from "@/components/Categories";
import SearchInput from "@/components/SearchInput";
import { AnimesContext } from "@/context/animes";
import { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SearchScreen() {
  const [searchString, setSearchString] = useState("");
  const animeContext = useContext(AnimesContext);
  const filteredAnimes = animeContext.animesData.filter((anime) => {
    return anime.title.toLowerCase().includes(searchString.toLowerCase());
  });

  return (
    <View style={styles.pageContainer}>
      <AppLogo />
      <View style={{ height: 12 }} />
      <Text style={styles.pageTitle}>
        Find animes, movies, characters, and more...
      </Text>
      <View style={{ height: 20 }} />
      <SearchInput placeholder="One piece" onChangeText={setSearchString} />
      <View style={{ height: 24 }} />
      <Categories />
      <View style={{ height: 24 }} />
      <AnimeList animes={filteredAnimes} />
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
