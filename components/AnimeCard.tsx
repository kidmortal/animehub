import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import When from "./When";
import { SupaBaseService } from "@/services/Supabase";
import { AnimesContext } from "@/context/animes";

type Props = {
  id: number;
  title: string;
  image: string;
  score: number;
  watching: boolean;
};

export default function AnimeCard(props: Props) {
  const context = useContext(AnimesContext);
  const router = useRouter();

  async function handleAddAnimeToWatchingList() {
    if (!context.user) {
      Alert.alert("You must be logged in to add anime to watching list");
      return;
    }

    const response = await SupaBaseService.addAnimeToWatchingList({
      userId: context.user.id,
      animeId: props.id,
      animeName: props.title,
      animeUrl: props.image,
    });
    console.log(response);

    if (response) {
      Alert.alert("Anime added to watching list");
      context.fetchUserWatchingAnimes();
    }
  }

  return (
    <TouchableOpacity
      style={styles.animeCard}
      onPress={() => router.push(`/anime/${props.id}`)}
      onLongPress={handleAddAnimeToWatchingList}
    >
      <When value={props.watching}>
        <View style={styles.watchingTagContainer}>
          <Ionicons size={24} name="eye-outline" color="green" />
          <Text style={styles.watchingTagText}>Watching</Text>
        </View>
      </When>

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
  watchingTagContainer: {
    flexDirection: "row",
  },
  watchingTagText: {
    color: "white",
  },
});
