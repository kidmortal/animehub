import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";

export default function Categories() {
  return (
    <View>
      <FlatList
        data={[
          { id: 1, name: "Action" },
          { id: 2, name: "Adventure" },
          { id: 3, name: "Comedy" },
          { id: 4, name: "Drama" },
          { id: 5, name: "Fantasy" },
        ]}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
        renderItem={({ item }) => <Text style={styles.text}>{item.name}</Text>}
        horizontal
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
});
