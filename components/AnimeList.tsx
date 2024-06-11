import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import ForEach from "./shared/ForEach";
import { SeasonAnimeMock } from "@/mocks/SeasonAnimesMock";

export default function AnimeList() {
  return (
    <View>
      <Text style={styles.text}>Anime list</Text>
      <ForEach
        items={SeasonAnimeMock.data}
        render={(item) => (
          <View>
            <Text style={styles.animeTitle}>{item.title}</Text>
            <Image
              style={styles.animeImage}
              source={{ uri: item.images.jpg.image_url }}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  animeTitle: {
    fontSize: 18,
    color: "#fff",
  },
  animeImage: {
    width: 100,
    height: 100,
  },
});
