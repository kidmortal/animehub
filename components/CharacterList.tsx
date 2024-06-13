import { StyleSheet, FlatList, View, Image, Text } from "react-native";
import React from "react";
import { JikanAnimeCharacter } from "@/services/JikanMoe/types/characters";

type Props = {
  characters: JikanAnimeCharacter[];
};

export default function CharacterList(props: Props) {
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={props.characters}
      keyExtractor={(item) => item.character.mal_id.toString()}
      numColumns={3}
      renderItem={({ item }) => (
        <View style={styles.characterCard}>
          <Image
            style={styles.characterImage}
            source={{ uri: item.character.images.jpg.image_url }}
          />
          <Text style={styles.characterName}>{item.character.name}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: "100%",
  },
  characterCard: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  characterImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
  },
  characterName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
