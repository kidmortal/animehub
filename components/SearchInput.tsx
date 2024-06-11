import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function SearchInput() {
  return (
    <View>
      <Text style={styles.text}>SearchInput</Text>
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
