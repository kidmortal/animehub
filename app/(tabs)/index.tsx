import AnimeList from "@/components/AnimeList";
import Categories from "@/components/Categories";
import SearchInput from "@/components/SearchInput";
import { StyleSheet, ScrollView, Text } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.pageContainer}>
      <Text style={styles.pageTitle}>Find Movies, Tv series, and more..</Text>
      <SearchInput />
      <Categories />
      <AnimeList />
    </ScrollView>
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
