import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { AnimesContext } from "@/context/animes";
import { JikanAnimeData } from "@/services/JikanMoe/types/season";
import {
  getLocalStorageAnimeCharacters,
  setLocalStorageAnimeCharacters,
} from "@/services/LocalStorageData";
import { JikanAnimeCharacter } from "@/services/JikanMoe/types/characters";
import { JikanMoeService } from "@/services/JikanMoe";
import CharacterList from "@/components/CharacterList";

export default function AnimeInfoScreen() {
  const context = useContext(AnimesContext);
  const [animeCharacters, setAnimeCharacters] = useState<JikanAnimeCharacter[]>(
    []
  );
  const [anime, setAnime] = useState<JikanAnimeData | undefined>(undefined);
  const { id } = useLocalSearchParams();

  async function loadAnimeCharacters() {
    const cachedCharacters = await getLocalStorageAnimeCharacters(Number(id));
    if (cachedCharacters) {
      setAnimeCharacters(cachedCharacters.data);
    } else {
      const characters = await JikanMoeService.getCharactersFromAnimeId(
        Number(id)
      );
      if (characters) {
        setLocalStorageAnimeCharacters(Number(id), characters);
        setAnimeCharacters(characters.data);
      }
    }
  }

  useEffect(() => {
    const selectedAnime = context.getAnimeId(Number(id));
    setAnime(selectedAnime);
    loadAnimeCharacters();
  }, []);

  return (
    <View>
      <Text style={styles.text}>{anime?.title}</Text>
      <Image
        style={styles.imageBanner}
        source={{ uri: anime?.images.jpg.image_url }}
      />
      <View style={{ height: 24 }} />
      <CharacterList characters={animeCharacters} />
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
  characterImage: {
    width: 100,
    height: 150,
  },
});
