import { StyleSheet, FlatList } from "react-native";
import React from "react";
import AnimeCard from "./AnimeCard";
import { JikanAnimeData } from "@/services/JikanMoe/types/season";

type Props = {
  animes: JikanAnimeData[];
};

export default function AnimeList(props: Props) {
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={props.animes}
      numColumns={2}
      keyExtractor={(item) => item.mal_id.toString()}
      renderItem={({ item }) => (
        <AnimeCard
          id={item.mal_id}
          image={item.images.jpg.image_url}
          title={item.title}
          score={item.score}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  animeCard: {
    flex: 1,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  animeTitle: {
    fontSize: 16,
    color: "#fff",
  },
  animeImage: {
    width: 100,
    height: 150,
  },
});
