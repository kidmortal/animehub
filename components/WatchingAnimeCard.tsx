import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

type Props = {
  id: number;
  title: string;
  image: string;
};

export default function WatchingAnimeCard(props: Props) {
  return (
    <View style={styles.animeCard}>
      <Image style={styles.animeImage} source={{ uri: props.image }} />
      <Text style={styles.animeTitle}>{props.title.slice(0, 15)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  animeCard: {
    flex: 1,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
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
