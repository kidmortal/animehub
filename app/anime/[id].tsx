import { View, Text, StyleSheet, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { JikanAnimeData } from "@/services/JikanMoe/types";
import { AnimesContext } from "@/context/animes";

export default function AnimeInfoScreen() {
  const context = useContext(AnimesContext);
  const [anime, setAnime] = useState<JikanAnimeData | undefined>(undefined);
  const { id } = useLocalSearchParams();

  useEffect(() => {
    const selectedAnime = context.getAnimeId(Number(id));
    setAnime(selectedAnime);
  }, []);

  return (
    <View>
      <Text style={styles.text}>{anime?.title}</Text>
      <Image
        style={styles.imageBanner}
        source={{ uri: anime?.images.jpg.image_url }}
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
  imageBanner: {
    width: "100%",
    height: 300,
  },
});
