import AnimeList from "@/components/AnimeList";
import Categories from "@/components/Categories";
import SearchInput from "@/components/SearchInput";
import { StyleSheet, ScrollView, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.pageContainer}>
      <Text style={styles.pageTitle}>Find Movies, Tv series, and more..</Text>
      <View style={{ height: 20 }} />
      <SearchInput />
      <View style={{ height: 24 }} />
      <Categories />
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
