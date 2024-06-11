import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import React from "react";
import { SeasonAnimeMock } from "@/mocks/SeasonAnimesMock";

export default function AnimeList() {
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={SeasonAnimeMock.data}
      numColumns={2}
      keyExtractor={(item) => item.mal_id.toString()}
      renderItem={({ item }) => (
        <View style={styles.animeCard}>
          <Image
            style={styles.animeImage}
            source={{ uri: item.images.jpg.image_url }}
          />
          <Text style={styles.animeTitle}>{item.title.slice(0, 15)}</Text>
        </View>
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
