import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type Props = {
  id: number;
  title: string;
  image: string;
  score: number;
};

export default function AnimeCard(props: Props) {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.animeCard}
      onPress={() => router.push(`/anime/${props.id}`)}
    >
      <Image style={styles.animeImage} source={{ uri: props.image }} />
      <Text style={styles.animeTitle}>{props.title.slice(0, 15)}</Text>
      <View style={styles.scoreContainer}>
        <Ionicons size={16} name="star" color="gold" />
        <View style={{ width: 4 }} />
        <Text style={styles.animeTitle}>{props.score}</Text>
      </View>
    </TouchableOpacity>
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
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
